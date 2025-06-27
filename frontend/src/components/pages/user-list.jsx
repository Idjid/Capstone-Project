import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../../styles/user-list.css';

function UserList() {
    const [users, setUsers] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [searchResult, setSearchResult] = useState(null);
    const [error, setError] = useState('');
    const [searchError, setSearchError] = useState('');

    const token = localStorage.getItem('token');

    //Downloads all users
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get('http://localhost:8080/api/admin/users', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setUsers(res.data);
            } catch (err) {
                console.error(err);
                setError('Error while downloading user list');
            }
        };
        fetchUsers();
    }, [token]);

    //Checks, does it match with database (MongoDB has 24 symbols)
    const isValidMongoId = (str) => /^[a-f\d]{24}$/i.test(str);

    const handleSearch = async (event) => {
        event.preventDefault();
        setSearchError('');
        setSearchResult(null);

        const idOrName = searchText.trim();

        if (!idOrName) {
            setSearchError('Please enter ID or name to search');
            return;
        }

        if (isValidMongoId(idOrName)) {
            //looks, is there any id in the backend
            try {
                const res = await axios.get(`http://localhost:8080/api/admin/users/${idOrName}`, {
                    headers: { Authorization: `Bearer ${token}` },
                });
                setSearchResult(res.data);
            } catch (err) {
                if (err.response && err.response.status === 404) {
                    setSearchError('User not found by ID');
                } else {
                    setSearchError('Error while searching user by ID');
                }
            }
        } else {
            //Search by name. Locally (in FrontEnd)
            const filtered = users.filter((event) =>
                event.name?.toLowerCase().includes(idOrName.toLowerCase())
            );
            if (filtered.length === 0) {
                setSearchError('No users found by name');
            } else {
                setUsers(filtered);
                setSearchResult(null);
            }
        }
    };

    //Reset button
    const handleResetSearch = () => {
        setSearchError('');
        setSearchResult(null);
        setSearchText('');

        //ReDownload all users
        const fetchUsers = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/admin/users', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setUsers(res.data);
        } catch (err) {
            console.error(err);
            setError('Error while downloading user list');
        }
        };
        fetchUsers();
    };

    return (
        <div className="user-list-container">
            <h2 className="user-list-title">List of users</h2>

            <form onSubmit={handleSearch} className="search-form">
                <input
                type="text"
                placeholder="Enter user ID or name"
                value={searchText}
                onChange={(event) => setSearchText(event.target.value)}
                className="search-input"/>

                <button type="submit" className="search-button">Search</button>
                <button type="button" onClick={handleResetSearch} className="reset-button">Reset</button>
            </form>

            {searchError && <p className="error-message">{searchError}</p>}

            {searchResult && (
                <div className="search-result">
                    <h3>Search result (by ID):</h3>
                    <table className="user-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Role</th>
                                <th>ID</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr key={searchResult._id}>
                                <td>
                                    <Link to={`/profile/${searchResult._id}`} className="user-link">
                                        {searchResult.name || 'No name'}
                                    </Link>
                                </td>
                                <td>{searchResult.email}</td>
                                <td>{searchResult.role}</td>
                                <td>{searchResult._id}</td>
                            </tr>
                        </tbody>
                </table>
                </div>
            )}

            {/*If it can't find anymore results, website publish what it already has */}
            {!searchResult && (
                <table className="user-table">
                    <thead>
                        <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((event) => (
                        <tr key={event._id}>
                            <td>
                            <Link to={`/profile/${event._id}`} className="user-link">
                                {event.name || 'No name'}
                            </Link>
                            </td>
                            <td>{event.email}</td>
                            <td>{event.role}</td>
                            <td>{event._id}</td>
                        </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}       

export default UserList;
