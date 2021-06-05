const Book = require('../models/Book');
const Author = require('../models/Author');

const isValid = async (title, authorId) => {
  if (!title || typeof title !== 'string' || title.length < 3) return false;
  if (!authorId || typeof authorId !== 'string' || authorId.length !== 24 || !(await Author.findById(authorId))) return false;
  return true;
}

const getAll = async () => {
  const books = await Book.getAll();
  return books;
}

const getByAuthorId = async (id) => {
  const books = await Book.getByAuthorId(id);
  return books;
}

const findById = async (id) => {
  const book = await Book.findById(id);
  return book;
}

const create = async (title, authorId) => {
  const bookValid = await isValid(title, authorId);
  if (!bookValid) return false;
  const { insertedId } = await Book.create(title, authorId);
  return {
    id: insertedId,
    title,
    authorId
  }
}

module.exports = {
  getAll,
  getByAuthorId,
  findById,
  create
}