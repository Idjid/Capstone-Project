import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/main-page.css';

function MainBoard() {
    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const searchHandling = async () => {
        if (!search.trim()) return;
        setIsLoading(true);
        try {
            const res = await axios.get(`http://localhost:8080/api/books?search=${encodeURIComponent(search)}`);
            setBooks(res.data);
            setError('');
        } catch (error) {
            console.error('Error while downloading books:', error);
            setError('Error while downloading books. Please, try later');
        } finally {
            setIsLoading(false);
        }
    };


    const fetchRecommendations = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/books/recommendations');
            setRecommendations(res.data);
            } catch (error) {
                console.error('Error fetching recommendations:', error);
        }
    };

    
    useEffect(() => {
        fetchRecommendations();
    }, []);


    return (
        <div className='book-finder-container'>
            <h1>Book finder 3000</h1>
            <div className='search-bar'>
                <input
                    type='text'
                    placeholder='Enter book title...'
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && searchHandling()}
                />
                <button onClick={searchHandling}>Search</button>
                {error && <p className='error-message'>{error}</p>}
            </div>

            {isLoading ? (<p>Loading books...</p>) 
            : (<div className='book-list'>
                    {books.map((book, idx) => (
                        <div key={idx} className='book-card' style={{ cursor: "pointer"}} onClick={() => navigate(`/books${book.key}`)}>
                            {book.cover ? (
                                <img src={book.cover} alt={book.title} />
                            ) : (
                                <div className='no-cover'>No cover</div>
                            )}
                            <p>{book.title}</p>
                        </div>
                    ))}
                </div>
            )}

            <div>
                <div className='search-bar'>
                    <h1>Recommendations</h1>
                    <button onClick={fetchRecommendations}>Try again</button>
                </div>
                <div className="recommendation-list">
                    {recommendations.length === 0 ? (<p>No recommendations available</p>) 
                    : (recommendations.map((book, idx) => (
                            <div key={idx} className="book-card" style={{ cursor: "pointer" }} onClick={() => navigate(`/books${book.key}`)}>
                                {book.cover ? (
                                    <img src={book.cover} alt={book.title} />
                                    ) : (
                                    <div className="no-cover">No cover</div>
                                )}
                                <p>{book.title}</p>
                            </div>
                        ))
                    )}
                </div>
                
            </div>

        </div>
    );
}

export default MainBoard;
