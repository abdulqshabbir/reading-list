import React from "react";

// components
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

function App() {
  return (
    <div>
      <h1>Ninja's Reading List</h1>
      <BookList />
      <AddBook />
    </div>
  );
}

export default App;
