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



app.listen(PORT, () => {
    console.log(`The server is: http://localhost:${PORT}`);
});