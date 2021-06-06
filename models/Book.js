const connection = require('./connection');
const { ObjectId  } = require('mongodb')
const Author = require('./Author');

const getAll = async () => {
  return connection()
    .then((db) => db.collection('books').find().toArray())
    .then((books) => {
      return books.map(({ _id, title, author_id }) => {
        return {
          id: _id,
          title,
          authorId: author_id
        }
      })
    });
}

const getByAuthorId = async (id) => {
  return connection()
    .then((db) => db.collection('books').find({ author_id: Number(id)}).toArray())
    .then((books) => {
      return books.map(({ _id, title, author_id}) => {
        return { 
          id: _id,
          title,
          authorId: author_id,
        }
      })
    });
}

const findById = async (id) => {
  const bookData = await connection()
    .then((db) => db.collection('books').findOne(ObjectId(id)))
  if (!bookData) return null;
  const { title, author_id } = bookData
  return {
    id,
    title,
    authorId: author_id,
  }
}

const create = async (title, authorId) => await connection()
  .then((db) => db.collection('books').insertOne({ title, author_id: authorId }));

module.exports = {
  getAll,
  getByAuthorId,
  findById,
  create,
}