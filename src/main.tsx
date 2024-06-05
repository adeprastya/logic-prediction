import "@/assets/css/global.css";
import React from "react";
import ReactDOM from "react-dom/client";
import ContextProvider from "@/context/ContextProvider.tsx";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<React.StrictMode>
		<ContextProvider>
			<App />
		</ContextProvider>
	</React.StrictMode>
);
