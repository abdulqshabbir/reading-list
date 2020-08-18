const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  // mongodb will automatically create id property for book
  name: String,
  genre: String,
  authorId: String,
});

module.exports = mongoose.model("Book", bookSchema);
