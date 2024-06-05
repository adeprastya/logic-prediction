import "@/assets/css/global.css";
import React from "react";
import ReactDOM from "react-dom/client";
import ContextProvider from "@/context/ContextProvider.tsx";
import App from "./App.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
	{
		path: "/logic-prediction",
		element: <App />
	}
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ContextProvider>
			<RouterProvider router={router} />
		</ContextProvider>
	</React.StrictMode>
);
