import React from "react";
import { useQuery, gql } from "@apollo/client";
import Author from "../../types/author";

export function AuthorOptions() {
  const { loading, data } = useQuery<TAuthors>(GET_AUTHORS);

  if (loading) return <option disabled>Loading Authors...</option>;

  if (!data) return <option disabled>Error Fetching Authors...</option>;

  return (
    <React.Fragment>
      {data.authors.map((author: Author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ))}
    </React.Fragment>
  );
}

const GET_AUTHORS = gql`
  query {
    authors {
      name
      id
    }
  }
`;

interface TAuthors {
  authors: Author[];
}
