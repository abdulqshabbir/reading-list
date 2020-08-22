import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_AUTHORS, ADD_BOOK_MUTATION, GET_BOOKS } from "../queries";
import Author from "../types/author";

function AuthorOptions() {
  const { loading, data } = useQuery<TAuthors>(GET_AUTHORS);

  if (loading) return <option disabled>Loading Authors...</option>;

  if (!data) return <option disabled>Error Fetching Authors...</option>;

  return (
    <React.Fragment>
      {data.authors.map((author) => (
        <option key={author.id}>{author.name}</option>
      ))}
    </React.Fragment>
  );
}

function SubmitForm(
  e: React.FormEvent<HTMLFormElement>,
  name: string,
  genre: string,
  authorId: string,
  addBook: any
) {
  e.preventDefault();
  addBook({
    variables: {
      name,
      genre,
      authorId,
    },
    refetchQueries: [{ query: GET_BOOKS }],
  });
}

function AddBook() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [addBook] = useMutation(ADD_BOOK_MUTATION);

  return (
    <form
      id="add-book"
      onSubmit={(e) => {
        SubmitForm(e, name, genre, authorId, addBook);
        setGenre("");
        setAuthorId("");
        setName("");
      }}
    >
      <div className="field">
        <label>Book name: </label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="field">
        <label>Genre: </label>
        <input
          type="text"
          onChange={(e) => setGenre(e.target.value)}
          value={genre}
        />
      </div>
      <div className="field">
        <label>Author: </label>
        <select
          name="author"
          onChange={(e) => setAuthorId(e.target.value)}
          value={authorId}
        >
          <option>Please choose an option</option>
          <AuthorOptions />
        </select>
      </div>
      <button>+</button>
    </form>
  );
}

interface TAuthors {
  authors: Author[];
}

export default AddBook;
