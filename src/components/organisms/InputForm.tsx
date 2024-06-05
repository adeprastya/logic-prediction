import { useContext, ChangeEvent } from "react";
import { ModelsContext } from "@/context/ModelsContext";

const style = {
	form: "max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg",
	label: "block mb-2 font-medium text-gray-700",
	input: "w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
};

export default function InputForm(): JSX.Element {
	const { input, setInput } = useContext<any>(ModelsContext);

	const handleChange =
		(key: keyof typeof input) =>
		(e: ChangeEvent<HTMLInputElement>): void => {
			setInput({ ...input, [key]: Number.parseInt(e.target.value) });
		};

	return (
		<form className={style.form}>
			<h2 className="text-lg font-semibold mb-4">Input</h2>

			<div>
				<label htmlFor="inputA" className={style.label}>
					Input A
				</label>
				<input
					id="inputA"
					type="number"
					min={0}
					max={1}
					step={1}
					onChange={handleChange("inputA")}
					className={style.input}
				/>
			</div>

			<div>
				<label htmlFor="inputB" className={style.label}>
					Input B
				</label>
				<input
					id="inputB"
					type="number"
					min={0}
					max={1}
					step={1}
					onChange={handleChange("inputB")}
					className={style.input}
				/>
			</div>
		</form>
	);
}
