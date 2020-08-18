import React from "react";

// components
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";
import BookDetails from "./components/BookDetails";

function App() {
  return (
    <div>
      <h1>Ninja's Reading List</h1>
      <BookList />
      <AddBook />
      <BookDetails />
    </div>
  );
}

export default App;
