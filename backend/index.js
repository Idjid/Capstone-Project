const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 8080;

const connectDB = require('./mongoDB');
connectDB();

//CORS allows from any domain (until I am working on it) (Needs to be changed +)
app.use(cors());
//Needs for express because it is not turn on by default D:
app.use(express.json());


app.get('/api/books', async (req, res) => {
    const query = req.query.search;

    if(!query) {
        return res.status(400).json({ error: 'Required query search!'});
    }

    try {
        const resp = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);

        const books = resp.data.docs.slice(0,10).map(book => ({
            title: book.title,
            cover: book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : null
        }));

        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch...'});
    }
})



//Routes
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/favorites', require('./routes/favorite.routes'));
app.use('/api/reviews', require('./routes/reviews.routes'));


app.listen(PORT, () => {
    console.log(`The server is: http://localhost:${PORT}`);
});

//For future 
// app.use(cors({ origin: 'http://localhost:3000' }));
