const mongoose = require("mongoose");
const BookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    publishedYear: {
      type: Number,
      required: true,
    },
    genre: [
      {
        type: String,
        enum: [
          "Fiction",
          "Non-Fiction",
          "Mystery",
          "Thriller",
          "Science Fiction",
          "Fantasy",
          "Romance",
          "Historical",
          "Biography",
          "Business",
          "Autobiography",
          "Self-help",
          "Other",
        ],
      },
    ],
    language: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      default: "United States",
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 10,
    },
    summary: {
      type: String,
    },
    coverImageUrl: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Book = mongoose.model("Book", BookSchema);
module.exports = Book;
