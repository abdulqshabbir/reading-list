import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOKS } from "../queries";

function BookList() {
  const { loading, error, data } = useQuery(GET_BOOKS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  else {
    return (
      <div>
        <h3>My books:</h3>
        <ul id="book-list">
          {data.books.map((book) => (
            <li key={book.id}>{book.name}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default BookList;
