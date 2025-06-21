import React, { useEffect, useState } from 'react';

function BookList() {
    const [books, setBooks] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            setError('Token not found. GIVE ME MY TOKEN!');
            return;
        }

        fetch('http://localhost:8080/api/admin/books', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
            .then(async res => {
                if (!res.ok) {
                    const errorData = await res.json();
                    throw new Error(errorData.msg || 'Access denied');
                }
                return res.json()
            })
            .then(data => setBooks(data))
            .catch(err => setError(err.message));
    }, []);

    if (error) return <div style={{ color: 'red' }}>Error: {error}</div>;

    return (
        <div>
            <h2>Book list (Admin):</h2>
            <ul>
                {books.map((book, index) => (
                    <li key={index}>{book.title} - {book.author}</li>
                ))}
            </ul>
        </div>
    );
}

export default BookList;