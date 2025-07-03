import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../../styles/dynamic-book.css";

function BookPage() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [author, setAuthor] = useState(null);
    const [comment, setComment] = useState('');
    const [rating, setRating] = useState(5);
    const [reviews, setReviews] = useState([]);
    const [averageRating, setAverageRating] = useState(0);
    const [showForm, setShowForm] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);


    useEffect(() => {
        const fetchBook = async () => {
            try {
                const res = await axios.get(`https://openlibrary.org/works/${id}.json`);
                const bookData = res.data;
                setBook(bookData);

                if (bookData.authors && bookData.authors.length > 0) {
                    const authorKey = bookData.authors[0].author.key;
                    const authorRes = await axios.get(`https://openlibrary.org${authorKey}.json`);
                    setAuthor(authorRes.data.name);
                }
            } catch (err) {
                console.error('Error while downloading books:', err);
            }
        };
        fetchBook();

        const fetchReviews = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/reviews/${id}/reviews`);
                setReviews(res.data);
            } catch (err) {
                console.error("Error while loading:", err);
            }
        };
        fetchReviews();

        const fetchAverageRating = async () => {
            try {
                const res = await axios.get(`http://localhost:8080/api/reviews/${id}/average-rating`);
                setAverageRating(res.data.averageRating || 0);
            } catch (err) {
                console.error("Error while loading average rating:", err);
            }
        };fetchAverageRating();

        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await axios.get("http://localhost:8080/api/user/me", {
                    headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setCurrentUser(res.data);
            } catch (err) {
            console.error("Error while loading user:", err);
            }
        };
        fetchUser();
    }, [id]);

    const submitReview = async () => {
        try {
            const token = localStorage.getItem('token');

            await axios.post(
                'http://localhost:8080/api/reviews',
                {
                    bookId: id,
                    comment,
                    rating
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setComment('');
            setRating(5);
            setShowForm(false);

            //Refresh reviews
            const resReviews = await axios.get(`http://localhost:8080/api/reviews/${id}/reviews`);
            setReviews(resReviews.data);

            //Refresh of average rating
            const resAvg = await axios.get(`http://localhost:8080/api/reviews/${id}/average-rating`);
            setAverageRating(resAvg.data.averageRating || 0);
        } catch (err) {
            console.error("Error while sending review:", err);
        }
    };

    const deleteReview = async (reviewId) => {
        const confirmed = window.confirm("Are you sure you want to delete this review?");
        if (!confirmed) return;

        try {
            const token = localStorage.getItem("token");
            await axios.delete(`http://localhost:8080/api/reviews/${reviewId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            //Refreshing list after deleting a review
            const resReviews = await axios.get(`http://localhost:8080/api/reviews/${id}/reviews`);
            setReviews(resReviews.data);

             //Refreshing of average rating
            const resAvg = await axios.get(`http://localhost:8080/api/reviews/${id}/average-rating`);
            setAverageRating(resAvg.data.averageRating || 0);
        } catch (err) {
            console.error("Error while deleting review:", err);
        }
    };


    if (!book) return <p>Loading...</p>;

    //Description
    const description = typeof book.description === 'string'
        ? book.description
        : book.description?.value || 'No description available';

    //Cover
    const coverId = book.covers?.[0];
    const coverUrl = coverId
        ? `https://covers.openlibrary.org/b/id/${coverId}-L.jpg`
        : null;

    //Book's name
    const title = book.title || 'No title';

    //Publishing date
    const publishDate = book.first_publish_date || book.created?.value?.slice(0, 10) || 'Unknown';

    
    return (
        <div className="book-container">
            <div>
                {coverUrl && <img src={coverUrl} alt="Book cover" className="book-cover" />}
                {/*Average rating under cover*/}
                <div style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '1.2rem', color: '#444' }}>
                    Average rating: {averageRating.toFixed(2)} ★
                </div>
            </div>

            <div className="book-info">
                <h1 className="book-title">{title}</h1>
                {author && <p className="book-author"><strong>Author:</strong> {author}</p>}
                <p className="book-year"><strong>First published:</strong> {publishDate}</p>
                <div className="book-description">
                    {description.split(/\n{1,2}/).map((para, idx) => (
                        <p key={idx}>{para}</p>
                    ))}
                </div>

                <div className="review-section">
                    <button onClick={() => setShowForm(!showForm)}>
                        {showForm ? 'Cancel' : 'Leave review'}
                    </button>

                    {showForm && (
                        <div className="review-form">
                            <textarea
                                value={comment}
                                onChange={(event) => setComment(event.target.value)}
                                placeholder="Your review:"
                            />
                            <select value={rating} onChange={(event) => setRating(Number(event.target.value))}>
                                {[1, 2, 3, 4, 5].map(nain => (
                                    <option key={nain} value={nain}>{nain} ★</option>
                                ))}
                            </select>
                            <button onClick={submitReview}>Send</button>
                        </div>
                    )}

                    <div className="review-list">
                        <h2>Reviews:</h2>
                        {reviews.length === 0 && <p>There is no reviews.</p>}
                        {reviews.map((rev, idx) => (
                            <div key={idx} className="review-item">
                                <p><strong>{rev.userName}</strong> — {rev.rating} ★</p>
                                <p>{rev.comment}</p>

                                {currentUser && (rev.userId === currentUser._id || currentUser.role === 'admin') && (
                                    <button className="delete-button" onClick={() => deleteReview(rev._id)}>
                                        Delete
                                    </button>
                                )}

                                <hr />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default BookPage;
