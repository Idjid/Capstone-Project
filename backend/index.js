const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
const connectDB = require('./mongoDB');
connectDB();

//CORS allows from any domain (until I am working on it) (Needs to be changed +)
app.use(cors());

app.use(express.json());


//Routes
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/favorites', require('./routes/favorite.routes'));
app.use('/api/reviews', require('./routes/reviews.routes'));


app.listen(PORT, () => {
    console.log(`The server is: http://localhost:${PORT}`);
});