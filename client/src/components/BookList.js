import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries";
import BookDetails from "./BookDetails";
import { Dimmer, Loader } from "semantic-ui-react";

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [bookId, setBookId] = useState(null);

  if (loading)
    return (
      <div id="book-list-container">
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      </div>
    );

  if (error || data === undefined) return null;

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
          <li
            key={book.id}
            onClick={(e) => {
              setBookId(book.id);
            }}
          >
            {book.name}
          </li>
        ))}
      </ul>
      {bookId !== null ? <BookDetails id={bookId} /> : null}
    </div>
  );
}

export default BookList;
