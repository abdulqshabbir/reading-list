const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type Author {
    id: ID!
    name: String!
    age: Int!
    books: [Book]!
  }

  type Book {
    id: ID!
    name: String!
    genre: String!
    authorId: ID!
    author: Author
  }

  type User {
    id: ID
    email: String
    password: String
  }

  type Query {
    book(id: ID!): Book
    books: [Book]!
    author(id: ID!): Author
    authors: [Author]!
    user: User
  }
  type Mutation {
    # book mutations
    createBook(name: String!, genre: String!, authorId: ID!): Book
    deleteBook(id: ID!): Book

    # author mutations
    createAuthor(name: String!, age: Int!): Author

    # user login/register mutations
    register(email: String!, password: String!): User
    login(email: String!, password: String!): User
    # logout(): Boolean!
  }
`;

module.exports = typeDefs;
