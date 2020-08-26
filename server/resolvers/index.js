const Author = require("../models/author");
const Book = require("../models/book");
const User = require("../models/user");

const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } = require("../config");
const ACCESS_TOKEN = "access-token";

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
    // logout: (_, __, { req, res }) => {
    //   // destroy cookie which authenticates user
    //   const accessToken = req["access-token"];
    //   const refreshToken = req["refresh-token"];

    //   res.cookie(ACCESS_TOKEN, accessToken, { expires: new Date.now() });
    //   res.cookie(REFRESH_TOKEN, refreshToken, { expires: new Date.now() });

    //   if (accessToken && refreshToken) {
    //     return true;
    //   }
    //   return false;
    // },
    login: async (_, { email, password }, { req, res }) => {
      // if user is already logged in, return the current user
      const token = req["access-token"];

      if (req["access-token"]) {
        const decodedUser = jwt.verify(token, ACCESS_TOKEN_SECRET);

        if (decodedUser) {
          return decodedUser;
        }
      }

      // otherwise, check for user in database
      const user = await User.findOne({ email: email });
      if (user) {
        const validUser = await bcrypt.compare(password, user.password);
        // user password entered and hashed password do not match
        if (!validUser) {
          return null;
        }
        // user correctly logged in, so store userId as token
        const accessToken = await jwt.sign(
          { userId: user.id },
          ACCESS_TOKEN_SECRET,
          { expiresIn: "15min" }
        );
        const refreshToken = await jwt.sign(
          { userId: user.id },
          REFRESH_TOKEN_SECRET,
          { expiresIn: "7d" }
        );

        res.cookie(ACCESS_TOKEN, accessToken, {
          expires: new Date(Date.now() + 60 * 60 * 15),
        });
        res.cookie("refresh-token", refreshToken, {
          expires: new Date(Date.now() + 60 * 60 * 24 * 7),
        });

        return validUser;
      } else {
        return null;
      }
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
