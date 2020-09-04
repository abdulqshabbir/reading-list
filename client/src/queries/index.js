import { gql } from "@apollo/client";

export const GET_AUTHORS = gql`
  query {
    authors {
      name
      id
    }
  }
`;

export const GET_BOOKS = gql`
  query {
    books {
      name
      id
    }
  }
`;

export const GET_BOOK = gql`
  query($id: String!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        age
        books {
          name
          id
        }
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
