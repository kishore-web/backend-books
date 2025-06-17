const { initializeDatabase } = require("./db/db.connect");
require("dotenv").config();
const cors = require("cors");
const Book = require("./models/book.model");
const express = require("express");
const app = express();
app.use(cors());
app.use(express.json());

initializeDatabase();

const PORT = process.env.PORT || 3000;
// 1. Create an API with route "/books" to create a new book data in the books Database. Make sure to do error handling. Test your API with Postman. Add the following book:
app.post("/books", async (req, res) => {
  try {
    const newBook = new Book(req.body);
    const savedBook = await newBook.save();
    if (savedBook) {
      return res
        .status(201)
        .json({ message: "Book saved successfully", book: savedBook });
    }
  } catch (error) {
    return res.status(400).json({ error: "Failed to save book data" });
  }
});

// 2. Run your API and create another book data in the db.

// 3. Create an API to get all the books in the database as response. Make sure to do error handling.
app.get("/books", async (req, res) => {
  try {
    const books = await Book.find();
    if (books.length === 0) {
      return res.status(404).json({ error: "No books found" });
    }
    return res
      .status(200)
      .json({ message: "Book data fetched successfully", books });
  } catch (error) {
    return res.status(500).json({ error: "Failed to save book data" });
  }
});
// 4. Create an API to get a book's detail by its title. Make sure to do error handling.
app.get("/books/:title", async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.title });
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res.status(200).json({ message: "Book found succesfully", book });
  } catch (error) {
    return res.status(500).json({ error: "Failed to get book data" });
  }
});
// 5. Create an API to get details of all the books by an author. Make sure to do error handling.
app.get("/books/author/:authorName", async (req, res) => {
  try {
    const book = await Book.find({ author: req.params.authorName });
    if (book.length === 0) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res.status(200).json({ message: "Book found succesfully", book });
  } catch (error) {
    return res.status(500).json({ error: "Failed to get book data" });
  }
});
// 6. Create an API to get all the books which are of "Business" genre.
app.get("/books/genre/:genreType", async (req, res) => {
  try {
    const books = await Book.find({ genre: req.params.genreType });
    if (books.length === 0) {
      return res.status(404).json({ error: "Books not found" });
    }
    return res.status(200).json({ message: "Books found successfully", books });
  } catch (error) {
    return res.status(500).json({ error: "Failed to get book data" });
  }
});
// 7. Create an API to get all the books which was released in the year 2012.
app.get("/books/year/:publishedYear", async (req, res) => {
  try {
    const books = await Book.find({ publishedYear: req.params.publishedYear });
    if (books.length === 0) {
      return res.status(404).json({ error: "Books not found" });
    }
    return res.status(200).json({ message: "Books found successfully", books });
  } catch (error) {
    return res.status(500).json({ error: "Failed to get book data" });
  }
});
// 8. Create an API to update a book's rating with the help of its id. Update the rating of the "Lean In" from 4.1 to 4.5. Send an error message "Book does not exist", in case that book is not found. Make sure to do error handling.

// Updated book rating: { "rating": 4.5 }
app.put("/books/:bookId", async (req, res) => {
  try {
    const updatedBook = await Book.findByIdAndUpdate(
      req.params.bookId,
      req.body,
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ error: "Book does not exist" });
    }
    return res
      .status(200)
      .json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update book data" });
  }
});

// 9. Create an API to update a book's rating with the help of its title. Update the details of the book "Shoe Dog". Use the query .findOneAndUpdate() for this. Send an error message "Book does not exist", in case that book is not found. Make sure to do error handling.
app.put("/books/title/:bookTitle", async (req, res) => {
  try {
    const updatedBook = await Book.findOneAndUpdate(
      { title: req.params.bookTitle },
      req.body,
      { new: true }
    );
    if (!updatedBook) {
      return res.status(404).json({ error: "Book does not exist" });
    }
    return res
      .status(200)
      .json({ message: "Book updated successfully", book: updatedBook });
  } catch (error) {
    return res.status(500).json({ error: "Failed to update book data" });
  }
});
// Updated book data: { "publishedYear": 2017, "rating": 4.2 }

// 10. Create an API to delete a book with the help of a book id, Send an error message "Book not found" in case the book does not exist. Make sure to do error handling.
app.delete("/books/:bookId", async (req, res) => {
  try {
    const deletedBook = await Book.findByIdAndDelete(req.params.bookId);
    if (!deletedBook) {
      return res.status(404).json({ error: "Book not found" });
    }
    return res
      .status(200)
      .json({ message: "Book deleted successfully", book: deletedBook });
  } catch (error) {
    return res.status(500).json({ error: "Failed to delete book" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on Port:", PORT);
});
