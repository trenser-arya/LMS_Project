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
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: String,
  available: {
    type: Boolean,
    default: true,
  },
  rented: {
    type: Boolean,
    default: false,
  },
  rentedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const bookModel = mongoose.model("books", bookSchema);

module.exports = bookModel;
