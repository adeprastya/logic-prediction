import ArchForm from "@/components/organisms/ArchForm";
import ParamForm from "@/components/organisms/ParamForm";
import InputForm from "@/components/organisms/InputForm";

import { useContext } from "react";
import { ModelsContext } from "@/context/ModelsContext";

export default function App() {
	const { model, arch, result } = useContext<any>(ModelsContext);

	return (
		<>
			<ArchForm />

			{model ? <ParamForm /> : <p>Model is not created</p>}

			{arch.isTrained ? <InputForm /> : <p>Model is not trained</p>}

			{result && <p>Result: {result}</p>}
		</>
	);
}
