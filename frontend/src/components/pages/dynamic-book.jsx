import React from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import "../../styles/dynamic-book.css";

function BookPage() {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [author, setAuthor] = useState(null);

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
    }, [id]);

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
            {coverUrl && <img src={coverUrl} alt="Book cover" className="book-cover" />}

            <div className="book-info">
                <h1 className="book-title">{title}</h1>
                {author && <p className="book-author"><strong>Author:</strong> {author}</p>}
                <p className="book-year"><strong>First published:</strong> {publishDate}</p>
                <div className="book-description">
                    {description.split(/\n{1,2}/).map((para, idx) => (
                        <p key={idx}>{para}</p>
                    ))}
                </div>

            </div>
        </div>
    );
}

export default BookPage;
