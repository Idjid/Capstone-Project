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



//Routes
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/favorites', require('./routes/favorite.routes'));
app.use('/api/reviews', require('./routes/reviews.routes'));
app.use('/api/books', require('./routes/request.books.routes'));


app.listen(PORT, () => {
    console.log(`The server is: http://localhost:${PORT}`);
});

//For future 
// app.use(cors({ origin: 'http://localhost:3000' }));
