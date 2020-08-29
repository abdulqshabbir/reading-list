const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  // mongodb will automatically create id property for book
  email: String,
  password: String,
});

module.exports = mongoose.model("User", userSchema);
