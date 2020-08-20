import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../queries";
import Book from "../types/book";

interface Props {
  id: string;
}

interface QueryData {
  book: Book;
}

interface QueryVariables {
  id: string;
}

function BookDetails({ id }: Props) {
  const { loading, error, data } = useQuery<QueryData, QueryVariables>(
    GET_BOOK,
    {
      variables: {
        id: id,
      },
    }
  );
  if (loading) return "Loading...";
  if (error) return `Error: ${error.message}`;
  if (data) {
    const { book } = data;
    return (
      <div id="book-details">
        <h2>{book.name}</h2>
        <p>{book.genre}</p>
        <p>{book.author.name}</p>
        <p>All books by this author:</p>
        <ul className="other-books">
          {book.author.books.map((book) => (
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
