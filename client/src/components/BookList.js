import React, { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries";
import BookDetails from "./BookDetails";

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  const [bookId, setBookId] = useState(null);

  if (loading || !data || error) return null;
  return (
    <div>
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
