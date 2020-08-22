const { gql } = require("apollo-server");
const Author = require("../models/author");
const Book = require("../models/book");

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    age: Int!
    books: [Book] # add resolvers for this field
  }

  type Book {
    id: ID!
    name: String!
    genre: String!
    authorId: ID!
    author: Author # add resolver for this field
  }
  type Query {
    book(id: ID!): Book
    books: [Book]
    author(id: ID!): Author
    authors: [Author] #resolver
  }
  type Mutation {
    createBook(name: String!, genre: String!, authorId: ID!): Book
    createAuthor(name: String!, age: Int!): Author
  }
`;

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
  },
};

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers,
};
