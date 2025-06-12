const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.json());


app.get('/api', (req,res) => {
    res.send('It is working!');
});

app.get('/api/users', (req, res) => {
  res.json([{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]);
});






//Routes
app.use('/api/admin', require('./routes/admin.routes'));
app.use('/api/user', require('./routes/user.routes'));
app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/favorite', require('./routes/favorite.routes'));
app.use('/api/reviews', require('./routes/reviews.routes'));





app.listen(PORT, () => {
    console.log(`The server is: http://localhost:${PORT}`);
});