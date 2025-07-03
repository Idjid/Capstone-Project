import React, { useState } from 'react';
import axios from 'axios';
import '../../styles/addBookFrom.css';

const AddBookForm = () => {
  const [form, setForm] = useState({
    key: '',
    price: '',
    bookQuality: 'like new',
    bookType: 'hardcover',
    location: {
      country: '',
      state: '',
      city: ''
    }
  });

  const [autoData, setAutoData] = useState({
    title: '',
    description: '',
    author: ''
  });

  const [search, setSearch] = useState('');
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name.startsWith('location.')) {
      const locField = name.split('.')[1];
      setForm((prev) => ({
        ...prev,
        location: { ...prev.location, [locField]: value }
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const searchHandling = async (reset = true) => {
    if (!search.trim()) return;
    setIsLoading(true);

    try {
      const nextPage = reset ? 1 : page + 1;
      const res = await axios.get(`https://openlibrary.org/search.json`, {
        params: {
          title: search,
          page: nextPage
        }
      });

      const docs = res.data.docs;
      const formatted = docs.map((doc) => ({
        key: doc.key,
        title: doc.title,
        author: doc.author_name?.[0] || '',
        cover: doc.cover_i
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
          : null
      }));

      if (reset) {
        setBooks(formatted);
        setPage(1);
      } else {
        setBooks((prev) => [...prev, ...formatted]);
        setPage(nextPage);
      }

      setHasMore(docs.length > 0);
      setError('');
    } catch (err) {
      console.error('Search error:', err);
      setError('Error while downloading books.');
    } finally {
      setIsLoading(false);
    }
  };

  const selectBook = async (bookKey) => {
    try {
      const workId = bookKey.replace('/works/', '');
      const res = await axios.get(`https://openlibrary.org/works/${workId}.json`);
      const bookData = res.data;

      const title = bookData.title || '';
      const description =
        typeof bookData.description === 'string'
          ? bookData.description
          : bookData.description?.value || '';

      let author = '';
      if (bookData.authors?.[0]?.author?.key) {
        const authorKey = bookData.authors[0].author.key;
        const authorRes = await axios.get(`https://openlibrary.org${authorKey}.json`);
        author = authorRes.data.name || '';
      }

      setForm((prev) => ({ ...prev, key: bookKey }));
      setAutoData({ title, description, author });

      setBooks([]);
      setSearch('');
    } catch (err) {
      console.error('Error fetching book info:', err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const finalData = {
      ...form,
      ...autoData
    };

    try {
      console.log('Final data:', finalData);

      await axios.post('http://localhost:8080/api/admin/books', finalData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setSubmitted(true);
    } catch (err) {
      console.error('Failed to submit book:', err);
    }
  };

  return (
    <div className="add-book-container">
      <h2 className="form-title">Add Book</h2>

      {/* Search */}
      <div className="search-section">
        <h3>Book Finder 3000</h3>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Enter book title..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            onKeyDown={(event) => event.key === 'Enter' && searchHandling(true)}
          />
          <button onClick={() => searchHandling(true)}>Search</button>
        </div>

        {error && <p className="error-message">{error}</p>}

        {isLoading ? (
          <p>Loading books...</p>
        ) : (
          <>
            <div className="book-list">
              {books.map((book, idx) => (
                <div key={idx} className="book-card small" onClick={() => selectBook(book.key)}>
                  {book.cover ? (
                    <img src={book.cover} alt={book.title} />
                  ) : (
                    <div className="no-cover">No Cover</div>
                  )}
                  <p className="book-title">{book.title}</p>
                  <p className="book-author">{book.author}</p>
                </div>
              ))}
            </div>

            {books.length > 0 && hasMore && (
              <div style={{ textAlign: 'center', marginTop: '1rem' }}>
                <button onClick={() => searchHandling(false)} className="submit-button">
                  Load More
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Filling the gaps */}
      <form onSubmit={handleSubmit} className="book-form">
        <div>
          <label>Book Key</label>
          <input
            type="text"
            name="key"
            value={form.key}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price ($)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Book Quality</label>
          <select name="bookQuality" value={form.bookQuality} onChange={handleChange}>
            <option value="like new">Like New</option>
            <option value="scratchy">Scratchy</option>
            <option value="some marks">Some Marks</option>
          </select>
        </div>

        <div>
          <label>Book Type</label>
          <select name="bookType" value={form.bookType} onChange={handleChange}>
            <option value="hardcover">Hardcover</option>
            <option value="paperback">Paperback</option>
          </select>
        </div>

        <div>
          <label>Country</label>
          <input
            type="text"
            name="location.country"
            value={form.location.country}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>State</label>
          <input
            type="text"
            name="location.state"
            value={form.location.state}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>City</label>
          <input
            type="text"
            name="location.city"
            value={form.location.city}
            onChange={handleChange}
          />
        </div>

        <button type="submit" className="submit-button">
          Submit Book
        </button>
      </form>

      {submitted && <p className="success-message">Book successfully submitted!</p>}
    </div>
  );
};

export default AddBookForm;
