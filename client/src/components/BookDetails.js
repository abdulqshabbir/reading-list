import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../queries";

function BookDetails({ id }) {
  const { loading, error, data } = useQuery(GET_BOOK, {
    variables: {
      id: id,
    },
  });
  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;
  if (data) {
    return (
      <div>
        <h2>{data.book.name}</h2>
        <p>{data.book.genre}</p>
        <p>{data.book.author.name}</p>
        <p>All books by this author:</p>
        <ul className="other-books">
          {data.book.author.books.map((book) => (
            <li key={book.id}>{book.name}</li>
          ))}
        </ul>
      </div>
    );
  } else {
    return <div>No book selected...</div>;
  }
}

export default BookDetails;
