const Author = require("../models/author");
const Book = require("../models/book");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../config");
const ACCESS_TOKEN = "access-token";
const REFRESH_TOKEN = "refresh-token";

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
    logout: async (_, __, { req, res }) => {
      const accessToken = req["access-token"];

      // no user is logged in
      if (!accessToken) {
        return false;
      }

      // if cookie is present, verify user
      const decodedUser = jwt.verify(accessToken, ACCESS_TOKEN_SECRET);
      const user = await User.findById(decodedUser.userId);
      console.log("user", user);
      if (user) {
        res.clearCookie("access-token");
        res.clearCookie("refresh-token");
        return true;
      }
      return false;
    },
    login: async (_, { email, password }, { req, res }) => {
      const token = req["access-token"];
      console.log("token", token);
      // user is already logged in with access-token
      if (token) {
        const decodedUser = jwt.verify(token, ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedUser.userId);
        console.log("user", user);
        if (user) {
          return user;
        } else {
          return null;
        }
      }

      // user is not logged in, check for user in DB
      const user = await User.findOne({ email: email });
      if (user) {
        const isValidUser = await bcrypt.compare(password, user.password);
        // user password entered and hashed password do not match
        if (!isValidUser) {
          return null;
        }
        console.log("valid user", isValidUser);
        // user correctly logged in, so store userId as token
        const accessToken = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, {
          expiresIn: "15min",
        });
        const refreshToken = jwt.sign(
          { userId: user.id },
          REFRESH_TOKEN_SECRET,
          { expiresIn: "7d" }
        );

        res.cookie(ACCESS_TOKEN, accessToken, {
          expires: new Date(Date.now() + 60 * 60 * 15),
        });
        res.cookie(REFRESH_TOKEN, refreshToken, {
          expires: new Date(Date.now() + 60 * 60 * 24 * 7),
        });
        return user;
      } else {
        return null;
      }
    },
    register: async (_, { email, password }, { req }) => {
      // check for user in database
      const user = await User.findOne({ email: email });

      // if no user, register user
      if (!user) {
        // hash and salt user password
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
