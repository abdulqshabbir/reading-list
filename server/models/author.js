const mongoose = require("mongoose");

const authorSchema = new mongoose.Schema({
  // mongodb will automatically create id property for book
  name: String,
  age: Number,
});

module.exports = mongoose.model("Author", authorSchema);
