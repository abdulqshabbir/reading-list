import React from "react";
import { useQuery, gql } from "@apollo/client";
import { Dimmer, Loader } from "semantic-ui-react";
import Book from "../../types/book";
import Author from "../../types/author";

function ShowBook({ id }: Props) {
  const { loading, error, data } = useQuery<TData, TVariables>(GET_BOOK, {
    variables: { id: id },
  });

  // const [
  //   getBooksByAuthor,
  //   { loading: authorLoading, data: authorData },
  // ] = useLazyQuery<TData2, TVariables>(GET_BOOKS_BY_AUTHOR);

  if (loading || error)
    return (
      <div id="book-details-container">
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      </div>
    );
  if (data) {
    const { book } = data;
    // getBooksByAuthor({ variables: { id: data.book.author.id } });

    return (
      <div id="book-details-container">
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>
          {book.author.books.map((b: Book) => (
            <li key={b.id}>{b.name}</li>
          ))}
        </p>
      </div>
    );
  } else {
    return <div>No book selected...</div>;
  }
}

interface Props {
  id: string;
}

interface TData {
  book: Book;
}

interface TData2 {
  author: Author;
}

interface TVariables {
  id: string;
}

const GET_BOOK = gql`
  query($id: String!) {
    book(id: $id) {
      id
      name
      genre
      author {
        id
        name
        books {
          id
          name
        }
      }
    }
  }
`;

// const GET_BOOKS_BY_AUTHOR = gql`
//   query($id: String!) {
//     author(id: $id) {
//       books {
//         name
//       }
//     }
//   }
// `;

export default ShowBook;
