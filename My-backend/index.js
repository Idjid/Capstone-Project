const express = require('express');
const app = express();
const PORT = 8080;
const connectDB = require('./mongoDB');
connectDB();


app.use(express.json());







//Routes
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/favorite', require('./routes/favorite.routes'));
app.use('/api/reviews', require('./routes/reviews.routes'));





app.listen(PORT, () => {
    console.log(`The server is: http://localhost:${PORT}`);
});