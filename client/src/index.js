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
  credentials: "include",
});

// apollo client setup
const client = new ApolloClient({
  cache: new InMemoryCache(),
  // enable sending cookies over cross-origin requests
  link,
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
