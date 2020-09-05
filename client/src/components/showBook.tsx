import React from "react";
import { useQuery } from "@apollo/client";
import { GET_BOOK } from "../queries";
import Book from "../types/book";
import { Dimmer, Loader } from "semantic-ui-react";

function BookDetails({ bookId }: Props) {
  const { loading, error, data } = useQuery<Book, BookVariables>(GET_BOOK, {
    variables: { id: bookId },
  });

  if (loading) {
    return (
      <div id="book-details-container">
        <Dimmer active>
          <Loader>Loading</Loader>
        </Dimmer>
      </div>
    );
  }
  if (error) {
    return (
      <div>
        <p>There was an error fetching data...</p>
      </div>
    );
  }
  if (data) {
    return (
      <div id="book-details-container">
        <h2>{data.name}</h2>
        <p>{data.genre}</p>
        <p>{data.author.name}</p>
        <p>All books by this author:</p>
      </div>
    );
  } else {
    return <div>No book selected...</div>;
  }
}

interface Props {
  bookId: string;
}

interface BookVariables {
  id: string;
}

export default BookDetails;
