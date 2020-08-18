import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_AUTHORS, ADD_BOOK_MUTATION, GET_BOOKS } from "../queries";

function AuthorOptions() {
  const { loading, data } = useQuery(GET_AUTHORS);
  if (loading) return <option disabled>Loading Authors...</option>;
  return data.authors.map((author) => (
    <option key={author.id} value={author.id}>
      {author.name}
    </option>
  ));
}

function SubmitForm(e, name, genre, authorId, addBook) {
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
  const [addBook, { data }] = useMutation(ADD_BOOK_MUTATION);

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
      <div className="field" name="book">
        <label>Book name: </label>
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </div>
      <div className="field" name="genre">
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

export default AddBook;
