const mongoose = require("mongoose");

let Schema = mongoose.Schema;

//Schema Creation of book Details
const bookSchema = new Schema({
  bookname: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  isbn: {
    type: String,
    unique: true,
    required: true,
  },
  publicationYear: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ["Available", "Rented"],
    default: "Available",
  },
});

const bookModel = mongoose.model("books", bookSchema);

module.exports = bookModel;
