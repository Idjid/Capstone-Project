const axios = require('axios');

exports.mainPageRequest = async (req, res) => {
    const query = req.query.search;

    if (!query) {
        return res.status(400).json({ error: 'Required query search!' });
    }

    try {
        const resp = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(query)}`);

        const docs = resp.data.docs.slice(0, 10);

        //Getting extra data. Example:/works/:key.json
        const books = await Promise.all(
            docs.map(async (book) => {
                const key = book.key;

                let description = null;
                try {
                    const workResp = await axios.get(`https://openlibrary.org${key}.json`);
                    if (typeof workResp.data.description === 'string') {
                        description = workResp.data.description;
                    } else if (workResp.data.description?.value) {
                        description = workResp.data.description.value;
                    }
                } catch (err) {
                    console.warn(`No description found for ${key}`);
                }

                return {
                    title: book.title,
                    cover: book.cover_i
                        ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                        : null,
                    key: book.key || null,
                    author: book.author_name ? book.author_name[0] : 'Unknown',
                    first_publish_year: book.first_publish_year || 'N/A',
                    description: description || 'No description available.',
                };
            })
        );

        res.json(books);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch...' });
    }
};


exports.getRecommendations = async (req, res) => {
    try {
        const subjects = ['fantasy', 'science_fiction', 'romance', 'history', 'mystery'];
        const randomSubject = subjects[Math.floor(Math.random() * subjects.length)];

        const response = await axios.get(`https://openlibrary.org/subjects/${randomSubject}.json?limit=5`);
        const works = response.data.works;

        const recommendations = works.map((work) => ({
            title: work.title,
            cover: work.cover_id
                ? `https://covers.openlibrary.org/b/id/${work.cover_id}-M.jpg`
                : null,
            key: work.key || null
        }));

        res.json(recommendations);
    } catch (error) {
        console.error('Error fetching recommendations:', error.message);
        res.status(500).json({ error: 'Failed to fetch recommendations' });
    }
};