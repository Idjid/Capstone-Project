import React, { useEffect, useState } from 'react';
import '../../styles/main-page.css'
import axios from 'axios';

function MainBoard() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError('Token not found. GIVE ME MY TOKEN!');
            return;
        }

        axios.get('http://localhost:8080/api/admin/books', {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then( res => {
                setBooks(res.data);
            })
            .catch(err => {
                if (err.response && err.response.data && err.response.data.msg) {
                    setError(err.response.data.msg);
                } else {
                    setError(err.message || 'Error')
                }
            });
    }, []);

    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    return (
            <div className='main-text'>
                <h1>Welcome to the MainPage</h1>
                <h2>Book list (Admin):</h2>
                <ul>
                    {books.map((book, index) => (
                        <li key={index}>{book.title} - {book.author}</li>
                    ))}
                </ul>
            </div>
        
    );
}



export default MainBoard