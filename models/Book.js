const connection = require('./connection');
const Author = require('./Author');

const serialize = (bookData) => ({
  title: bookData.title,
  authorID: bookData.author_id,
})

const getAll = async () => {
  const [books] = await connection
    .execute('SELECT * FROM model_example.books');
  return books.map(serialize);
}

const getByAuthorId = async (id) => {
  const [books] = await connection
    .execute(`SELECT * FROM model_example.books WHERE author_id = ${id}`);
  return books.map(serialize);
}

const findById = async (id) => {
  const [books] = await connection
    .execute('SELECT * FROM model_example.books WHERE id=?', [id]);
  return books.map(serialize)[0];
}

const isValid = async (title, authorId) => {
  if (!title || typeof title !== 'string' || title.length < 3) return false;
  if (!authorId || typeof authorId !== 'number' || !(await Author.findById(authorId))) return false;
  return true;
}

const create = async (title, authorId) => connection
  .execute(
    'INSERT INTO model_example.books (title, author_id) VALUES (?, ?)',
    [title, authorId]
  )

module.exports = {
  getAll,
  getByAuthorId,
  findById,
  isValid,
  create,
}