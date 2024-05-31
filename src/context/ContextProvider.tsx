import ModelsContextProvider from "./ModelsContext";

export default function ContextProvider({ children }: { children: React.ReactNode }) {
	return <ModelsContextProvider>{children}</ModelsContextProvider>;
}
