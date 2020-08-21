const { gql } = require("apollo-server");
const Author = require("../models/author");
const Book = require("../models/book");

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    age: Int!
  }

  type Book {
    id: ID!
    name: String!
    genre: String!
    authorId: ID!
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
  Query: {
    book: async (parent, args, context, info) => {
      return Book.findById(args.id);
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
      return await new Book({
        name: args.name,
        genre: args.genre,
        authorId: args.authorId,
      }).save();
    },
    createAuthor: async (parent, args) => {
      const author = new Author({
        name: args.name,
        age: args.age,
      });
      return await author.save();
    },
  },
};

module.exports = {
  typeDefs: typeDefs,
  resolvers: resolvers,
};
