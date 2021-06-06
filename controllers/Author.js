const Author = require('../services/Author');

const getAll = async (_req, res) => {
  const authors = await Author.getAll();
  res.status(200).json(authors);
}

const findById = async (req, res) => {
  const { id } = req.params;
  const author = await Author.findById(id);
  
  if (!author) return res.status(404).json({ message: 'Author not found' });
  return res.status(200).json(author);
}

const create = async (req, res) => {
  const { firstName, middleName, lastName } = req.body;
  const author = await Author.create(firstName, middleName, lastName);
  if (!author) return res.status(404).json({ message: 'Invalid data'})
  res.status(201).json(author);
}

module.exports = {
  getAll,
  findById,
  create,
}