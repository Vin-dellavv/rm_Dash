import React from "react";
import ReactDOM from "react-dom/client";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { routes } from "./routes";

import reportWebVitals from "./Utils/reportWebVitals";
import "./index.css";

// const proxy = "https://cors-anywhere.herokuapp.com/";

const client = new ApolloClient({
	uri: "https://rickandmortyapi.com/graphql",
	cache: new InMemoryCache()
});

const root = ReactDOM.createRoot(
	document.getElementById("root") as HTMLElement
);
root.render(
	<ApolloProvider client={client}>
		<React.StrictMode>
			<RouterProvider router={createBrowserRouter(routes)} />
		</React.StrictMode>
	</ApolloProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
