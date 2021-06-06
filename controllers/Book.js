const Book = require('../services/Book');

const getAll = async (req, res) => {
  const { id } = req.query;
  const books = await Book.getAll();

  if (!id) {
    res.status(200).json(books);
  } else {
    const booksById = await Book.getByAuthorId(id);
    res.status(200).json(booksById);
  }
}

const findById = async (req, res) => {
  const { id } = req.params;
  const book = await Book.findById(id);

  if (!id) return res.status(404).json({ message: 'Book not found' });
  return res.status(200).json(book);
}

const create = async (req, res) => {
  const { title, authorId } = req.body;
  const book = await Book.create(title, authorId);
  if (!book) return res.status(400).json({ message: 'Invalid data' });
  res.status(201).json({ message: 'Book successfully created'})
}

module.exports = {
  getAll,
  findById,
  create,
}