import React, { useState } from 'react';
import '../../styles/main-page.css'
import axios from 'axios';

function MainBoard() {
    const [search, setSearch] = useState('');
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');

    //sends requests to the server for list of books
    const searchHandling = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/books?search=${encodeURIComponent(search)}`);
            setBooks(res.data);
            setError('');
        } catch (error) {
            console.error('Error while downloading books:', error);
            setError('Error while downloading books. Please, try later');
        }
    };

    
    return (
        
        <div className='book-finder-container'>
            <h1>Book finder 3000</h1>
            <div className='search-bar'>
                <input type='text' placeholder='Enter book title...' value={search} onChange={(event) => setSearch(event.target.value)} onKeyDown={(e) => e.key === 'Enter' && searchHandling()} />
                <button onClick={searchHandling}>Search</button>

                {error && <p className="error-message">{error}</p>}
            </div>

            
            <div className="book-list"> 
                {books.map((book, idx) => (
                    <div key={idx} className="book-card"> 
                        {book.cover ? (
                            <img src={book.cover} alt={book.title} />
                        ) : (
                            <div className="no-cover">No cover</div>
                        )}
                        <p>{book.title}</p>
                    </div>
                ))}
            </div>
        </div>

    );
}

export default MainBoard