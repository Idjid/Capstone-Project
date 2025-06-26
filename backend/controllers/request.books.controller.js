const axios = require('axios');

exports.mainPageRequest = async (req, res) => {
    const query = req.query.search;

    if (!query) {
        return res.status(400).json({ error: 'Required query search!' });
    }

    try {
        const resp = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);

        const books = resp.data.docs.slice(0, 10).map(book => ({
            title: book.title,
            cover: book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : null
        }));

        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch...' });
    }
};
