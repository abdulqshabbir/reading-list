const Author = require("../models/author");
const Book = require("../models/book");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const resolvers = {
  Book: {
    author: async (parent, args) => {
      const authorId = parent.authorId;
      const author = await Author.findById(authorId);
      return author;
    },
  },
  Author: {
    books: async (parent, args) => {
      const author = parent;
      const books = await Book.find();
      return books.filter((book) => book.authorId === author.id);
    },
  },
  Query: {
    book: async (parent, args, context, info) => {
      return await Book.findById(args.id);
    },
    books: async () => {
      return await Book.find();
    },
    author: async (parent, args) => {
      return Author.findById(args.id);
    },
    authors: async () => {
      return await Author.find();
    },
  },
  Mutation: {
    createBook: async (parent, args) => {
      const book = await new Book({
        name: args.name,
        genre: args.genre,
        authorId: args.authorId,
      }).save();
      return book;
    },
    deleteBook: async (parent, args) => {
      const bookToDelete = await Book.findByIdAndDelete(args.id);
      return bookToDelete;
    },
    register: async (_, { email, password }, { req }) => {
      // check for user in database
      const user = await User.findOne({ email: email });

      // if no user, register user
      if (!user) {
        // hash user password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        // create & save user document
        const newUser = await new User({ email: email, password: hash }).save();
        return newUser;
      }

      // if user exists, return null
      return null;
    },
  },
};

module.exports = resolvers;
