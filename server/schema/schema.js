const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLID,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  buildSchema,
} = require("graphql");

const Book = require("../models/book");
const Author = require("../models/author");

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        const authorId = parent.authorId;
        const author = Author.findById(authorId);
        return author;
      },
    },
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    age: { type: GraphQLInt },
    name: { type: GraphQLString },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        // return books.filter((book) => book.authorId === parent.id);
        let books = await Book.find();
        books = books.filter((b) => b.authorId === parent.id);
        return books;
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      async resolve(parent, args) {
        const book = await Book.findById(args.id);
        return book;
      },
    },
    books: {
      type: new GraphQLList(BookType),
      async resolve(parent, args) {
        const books = await Book.find();
        return books;
      },
    },
    author: {
      type: AuthorType,
      args: {
        id: {
          type: GraphQLID,
        },
      },
      async resolve(parent, args) {
        const author = await Author.findById(args.id);
        return author;
      },
    },
    authors: {
      type: new GraphQLList(AuthorType),
      async resolve(parent, args) {
        const authors = await Author.find();
        return authors;
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addAuthor: {
      type: AuthorType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        age: { type: new GraphQLNonNull(GraphQLInt) },
      },
      async resolve(parent, args) {
        const author = new Author({
          name: args.name,
          age: args.age,
        });
        return await author.save();
      },
    },
    addBook: {
      type: BookType,
      args: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        genre: { type: new GraphQLNonNull(GraphQLString) },
        authorId: { type: new GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, args) {
        let book = new Book({
          name: args.name,
          genre: args.genre,
          authorId: args.authorId,
        });
        return await book.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
