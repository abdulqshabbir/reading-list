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
    author: async (parent: any) => {
      const authorId = parent.authorId;
      const author = await Author.findById(authorId);
      return author;
    },
  },
  Author: {
    books: async (parent: any) => {
      const author = parent;
      const books = await Book.find();
      return books.filter((book: any) => book.authorId === author.id);
    },
  },
  Query: {
    book: async (_: any, args: any) => {
      return await Book.findById(args.id);
    },
    books: async () => {
      return await Book.find();
    },
    author: async (_: any, args: any) => {
      return Author.findById(args.id);
    },
    authors: async () => {
      return await Author.find();
    },
    me: async (_: any, __: any, ctx: any) => {
      const req = ctx.req
      if (!req.session.userId) {
        // no user logged in
        return null;
      }
      const user = await User.findById(req.session.userId);
      return user;
    },
  },
  Mutation: {
    createBook: async (_: any, args: any) => {
      const book = await new Book({
        name: args.name,
        genre: args.genre,
        authorId: args.authorId,
      }).save();
      return book;
    },
    deleteBook: async (_: any, args: any) => {
      const bookToDelete = await Book.findByIdAndDelete(args.id);
      return bookToDelete;
    },
    logout: async (_: any, __: any, ctx: any) => {
      const req = ctx.req
      const res = ctx.res
      return new Promise((resolve) =>
        req.session.destroy((err: any) => {
          // if access-token is present, decode user
          const token = req["access-token"];

          if (token) {
            // clear cookies from browser
            res.clearCookie("access-token");
            res.clearCookie("refresh-token");
            res.clearCookie("qid");
          }
          if (err) {
            console.log(err);
            resolve(false);
            return;
          }
          resolve(true);
        })
      );
    },
    login: async (_: any, args: any, ctx: any) => {

      const email = args.email
      const password = args.password
      const req = ctx.req
      const res = ctx.res

      const token = req["access-token"];
      // user is already logged in with access-token
      if (token) {
        const decodedUser = jwt.verify(token, ACCESS_TOKEN_SECRET);
        const user = await User.findById(decodedUser.userId);
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

        req.session.userId = user.id;

        console.log(req.session);

        return user;
      } else {
        return null;
      }
    },
    register: async (_: any, args: any, ctx: any) => {
      const email = args.email
      const password = args.password

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
    }
  }
};

export default resolvers