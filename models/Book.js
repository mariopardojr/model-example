const connection = require('./connection');
const { ObjectId  } = require('mongodb')
const Author = require('./Author');

const serialize = (bookData) => ({
  id: bookData._id,
  title: bookData.title,
  authorId: bookData.author_id,
})

const getAll = async () => {
  return connection()
    .then((db) => db.collection('books').find().toArray())
    .then((books) => books.map(serialize));
}

const getByAuthorId = async (id) => {
  return connection()
    .then((db) => db.collection('books').find({ author_id: Number(id)}).toArray())
    .then((books) => books.map(serialize));
}

const findById = async (id) => {
  return connection()
    .then((db) => db.collection('books').find({ _id: ObjectId(id) }).toArray())
    .then((books) => books.map(serialize)[0]);
}

const isValid = async (title, authorId) => {
  if (!title || typeof title !== 'string' || title.length < 3) return false;
  if (!authorId || typeof authorId !== 'string' || authorId.length !== 24 || !(await Author.findById(authorId))) return false;
  return true;
}

const create = async (title, authorId) => connection()
  .then((db) => db.collection('books').insertOne({
    title,
    authorId,
  }))
  

module.exports = {
  getAll,
  getByAuthorId,
  findById,
  isValid,
  create,
}