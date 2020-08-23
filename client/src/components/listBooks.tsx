import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_BOOKS, DELETE_BOOK_MUTATION } from "../queries";
import BookDetails from "./showBook";
import { Loader } from "semantic-ui-react";
import Book from "../types/book";

function BookList() {
  const { loading, error, data } = useQuery<TQueryData>(GET_BOOKS);
  const [deleteBook] = useMutation<TMutationData, TMutationVariables>(
    DELETE_BOOK_MUTATION
  );
  const [bookId, setBookId] = useState<string | null>(null);

  if (loading)
    return (
      <div id="book-list-container">
        <Loader active inline>
          Loading
        </Loader>
      </div>
    );

  if (error || data === undefined)
    return "Sorry your books could not be found.";

  if (data.books.length === 0)
    return (
      <div id="book-list-container">
        <h2>"Add some books to your reading list!"</h2>
      </div>
    );

  return (
    <div id="book-list-container">
      <h3>My books:</h3>
      <ul id="book-list">
        {data.books.map((book) => (
          <div className="book-list-element" key={book.id}>
            <li
              key={book.id}
              onClick={(e) => {
                setBookId(book.id);
              }}
            >
              {book.name}
            </li>
            <button
              onClick={(e) =>
                deleteBook({
                  variables: {
                    id: book.id,
                  },
                  refetchQueries: [{ query: GET_BOOKS }],
                })
              }
            >
              x
            </button>
          </div>
        ))}
      </ul>
      {bookId !== null ? <BookDetails id={bookId} /> : null}
    </div>
  );
}

interface TQueryData {
  books: Book[];
}

interface TMutationData {
  book: Book;
}

interface TMutationVariables {
  id: string;
}

export default BookList;
