import { useContext } from "react";
import ArchForm from "@/components/organisms/ArchForm";
import ParamForm from "@/components/organisms/ParamForm";
import InputForm from "@/components/organisms/InputForm";
import { ModelsContext } from "@/context/ModelsContext";

const style = {
	container: "max-w-4xl mx-auto px-4 py-20",
	message: "m-10 text-slate-500 text-center font-bold text-2xl",
	result: "m-10 text-sky-500 text-center text-3xl capitalize font-bold"
};

export default function App() {
	const { model, isTrained, result, param } = useContext<any>(ModelsContext);

	return (
		<div className={style.container}>
			<ArchForm />

			{model ? <ParamForm /> : <p className={style.message}>Model is not created</p>}

			{isTrained ? <InputForm /> : <p className={style.message}>Model is not trained</p>}

			{result && (
				<>
					<p className={style.result}>Prediction: {result}</p>
					<p className={style.result}>Result: {result > param.threshold ? "True" : "False"}</p>
				</>
			)}
		</div>
	);
}
