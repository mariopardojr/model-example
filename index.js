const express = require('express');
require('dotenv').config();
// const bodyParser = require('body-parser');
const app = express();
const PORT = process.env.PORT;


const Author = require('./controllers/Author');
const Book = require('./controllers/Book');
 
app.use(express.json());

app.get('/authors', Author.getAll);
app.get('/authors/:id', Author.findById);
app.post('/authors', Author.create);

app.get('/books', Book.getAll);
app.get('/books/:id', Book.findById);
app.post('/books', Book.create);

app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));