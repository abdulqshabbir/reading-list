import { gql } from "@apollo/client";

export const GET_BOOKS = gql`
  query {
    books {
      name
      id
    }
  }
`;

export const GET_BOOKS_BY_AUTHOR = gql`
  query($id: String!) {
    author(id: $id) {
      books {
        id
        name
        genre
      }
    }
  }
`;

export const GET_BOOK = gql`
  query($id: ID!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
      }
    }
  }
`;

export const CREATE_BOOK_MUTATION = gql`
  mutation($name: String!, $genre: String!, $authorId: String!) {
    createBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      id
    }
  }
`;

export const DELETE_BOOK_MUTATION = gql`
  mutation($id: String!) {
    deleteBook(id: $id) {
      name
      id
    }
  }
`;
