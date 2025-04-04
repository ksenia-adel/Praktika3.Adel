const models = require("../models");
const asyncHandler = require("express-async-handler");

const Book = models.Book;
const Author = models.Author;
const Category = models.Category;
const Comment = models.Comment;
const ActivityLog = models.ActivityLog;

// Admin: create a new book
exports.createBook = asyncHandler(async (req, res) => {
  const { title, publicationYear, authorNames, categoryNames } = req.body;

  if (!title || !publicationYear) {
    return res.status(400).json({ message: "Title and year are required" });
  }

  const book = await Book.create({ title, publicationYear });

  // link authors to the book
  if (authorNames && authorNames.length) {
    for (const name of authorNames) {
      const [author] = await Author.findOrCreate({ where: { name } });
      await book.addAuthor(author);
    }
  }

  // link categories to the book
  if (categoryNames && categoryNames.length) {
    for (const name of categoryNames) {
      const [category] = await Category.findOrCreate({ where: { name } });
      await book.addCategory(category);
    }
  }

  const authors = await book.getAuthors();
  const categories = await book.getCategories();

  await ActivityLog.create({
    action: `Book "${title}" created`,
    details: `Authors: ${authors.map(a => a.name).join(", ") || 'none'}, Categories: ${categories.map(c => c.name).join(", ") || 'none'}`,
    userId: req.userId
  });

  res.status(201).json({ book, authors, categories });
});

// All users: get all books
exports.getAllBooks = asyncHandler(async (req, res) => {
  const books = await Book.findAll({
    include: [
      { model: Author, through: { attributes: [] } },
      { model: Category, through: { attributes: [] } },
    ]
  });

  res.status(200).json({ books });
});

// Admin: update book by ID
exports.updateBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { title, publicationYear, authorNames, categoryNames } = req.body;

  const book = await Book.findByPk(id);
  if (!book) return res.status(404).json({ message: "Book not found" });

  if (title) book.title = title;
  if (publicationYear) book.publicationYear = publicationYear;

  await book.save();

  // replace authors
  if (authorNames && authorNames.length) {
    await book.setAuthors([]);
    for (const name of authorNames) {
      const [author] = await Author.findOrCreate({ where: { name } });
      await book.addAuthor(author);
    }
  }

  // replace categories
  if (categoryNames && categoryNames.length) {
    await book.setCategories([]);
    for (const name of categoryNames) {
      const [category] = await Category.findOrCreate({ where: { name } });
      await book.addCategory(category);
    }
  }

  const authors = await book.getAuthors();
  const categories = await book.getCategories();

  await ActivityLog.create({
    action: `Book "${book.title}" updated`,
    details: `Book ID: ${book.id}, Authors: ${authors.map(a => a.name).join(", ") || 'none'}, Categories: ${categories.map(c => c.name).join(", ") || 'none'}`,
    userId: req.userId
  });

  res.status(200).json({ book, authors, categories });
});

// Admin: delete book by ID
exports.deleteBook = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const book = await Book.findByPk(id);

  if (!book) return res.status(404).json({ message: "Book not found" });

  await book.destroy();

  await ActivityLog.create({
    action: `Book "${book.title}" deleted`,
    details: `Book ID: ${book.id}`,
    userId: req.userId
  });

  res.status(200).json({ message: "Book deleted" });
});
