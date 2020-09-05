import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_AUTHORS, CREATE_BOOK_MUTATION, GET_BOOKS } from "../queries";
import { Form, Button } from "semantic-ui-react";
import styles from "./createBookForm.module.css";
import Author from "../types/author";

type TData = any;
interface TVariables {
  name: string;
  genre: string;
  authorId: string;
}

function CreateBookForm() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [addBook] = useMutation<TData, TVariables>(CREATE_BOOK_MUTATION);

  return (
    <div className={styles.formContainer}>
      <Form
        className={styles.form}
        id="add-book"
        onSubmit={(e) => {
          e.preventDefault();
          if (authorId !== "" && name !== "" && genre !== "") {
            // SubmitForm(e, name, genre, authorId, addBook);
            addBook({
              variables: {
                name,
                genre,
                authorId,
              },
              refetchQueries: [{ query: GET_BOOKS }],
            });
            setGenre("");
            setAuthorId("");
            setName("");
          } else {
            // error in fields submitted
            if (name === "") {
              setErrorMessage("Please  input book name.");
            } else if (genre === "") {
              setErrorMessage("Please input book genre.");
            } else {
              setErrorMessage("Please select author.");
            }
          }
        }}
      >
        <Form.Field className={styles.formField}>
          <label>Book name: </label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Form.Field>
        <Form.Field className={styles.formField}>
          <label>Genre: </label>
          <input
            type="text"
            onChange={(e) => setGenre(e.target.value)}
            value={genre}
          />
        </Form.Field>
        <Form.Field className={styles.formField}>
          <label> Author: </label>
          <select name="author" onChange={(e) => setAuthorId(e.target.value)}>
            <option>Please choose an option</option>
            <AuthorOptions />
          </select>
        </Form.Field>
        <Form.Field className={styles.formField}>
          <p className={styles.formError}>{errorMessage}</p>
        </Form.Field>
        <Form.Field className={`${styles.buttonWrapper} ${styles.formField}}`}>
          <Button>Create Book</Button>
        </Form.Field>
      </Form>
    </div>
  );
}

interface TAuthors {
  authors: Author[];
}
function AuthorOptions() {
  const { loading, data } = useQuery<TAuthors>(GET_AUTHORS);

  if (loading) return <option disabled>Loading Authors...</option>;

  if (!data) return <option disabled>Error Fetching Authors...</option>;

  return (
    <React.Fragment>
      {data.authors.map((author) => (
        <option key={author.id} value={author.id}>
          {author.name}
        </option>
      ))}
    </React.Fragment>
  );
}

export default CreateBookForm;
