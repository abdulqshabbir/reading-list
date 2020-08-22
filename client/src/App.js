import React from "react";
import "semantic-ui-css/semantic.min.css";
import "./App.css";

// components
import BookList from "./components/BookList";
import AddBook from "./components/AddBook";

function App() {
  return (
    <div id="main-container">
      <h1>Abdul's Reading List</h1>
      <BookList />
      <AddBook />
    </div>
  );
}

export default App;
