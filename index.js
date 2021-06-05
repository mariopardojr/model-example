const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;


const Author = require('./services/Author');
const Book = require('./services/Book');
 
app.use(bodyParser.json());

app.get('/authors', async (_req, res) => {
  const authors = await Author.getAll();
  res.status(200).json(authors);
});

app.get('/authors/:id', async (req, res) => {
  const { id } = req.params;
  const author = await Author.findById(id);
  
  if (!author) return res.status(404).json({ message: 'Author not found' });
  return res.status(200).json(author);
});

app.post('/authors', async (req, res) => {
  const { firstName, middleName, lastName } = req.body;
  const author = await Author.create(firstName, middleName, lastName);
  if (!author) return res.status(404).json({ message: 'Invalid data'})
  res.status(201).json(author);
});

app.get('/books', async (req, res) => {
  const { id } = req.query;
  const books = await Book.getAll();

  if (!id) {
    res.status(200).json(books);
  } else {
    const booksById = await Book.getByAuthorId(id);
    res.status(200).json(booksById);
  }
});

app.get('/books/:id', async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  if (!id) return res.status(404).json({ message: 'Book not found' });
  return res.status(200).json(book);
});

app.post('/books', async (req, res) => {
  const { title, authorId } = req.body;
  const book = await Book.create(title, authorId);
  if (!book) return res.status(400).json({ message: 'Invalid data' });
  res.status(201).json({ message: 'Book successfully created'})
});

app.listen(PORT, () => console.log(`Ouvindo a porta ${PORT}`));