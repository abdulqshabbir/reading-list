import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

// apollo client setup
const client = new ApolloClient({
  cache: new InMemoryCache(),
  // enable sending cookies over cross-origin requests
  credentials: "include",
  link,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
