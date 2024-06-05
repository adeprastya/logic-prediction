import { useContext, ChangeEvent } from "react";
import { ModelsContext } from "@/context/ModelsContext";

interface Arch {
	numHidden?: number;
	numHidden2?: number;
	activation?: "sigmoid" | "tanh" | "relu";
}

const style = {
	form: "max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg",
	label: "block mb-2 font-medium text-gray-700",
	input: "w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500",
	select: "w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
};

export default function ArchForm(): JSX.Element {
	const { arch, setArch } = useContext<any>(ModelsContext);

	const handleNumberChange =
		(key: keyof Arch) =>
		(e: ChangeEvent<HTMLInputElement>): void => {
			setArch({ ...arch, [key]: Number.parseInt(e.target.value) });
		};

	const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>): void => {
		setArch({ ...arch, activation: e.target.value as Arch["activation"] });
	};

	return (
		<form className={style.form}>
			<h2 className="text-lg font-semibold mb-4">Multi Layer Perceptron</h2>

			<div>
				<label htmlFor="numHidden" className={style.label}>
					First Hidden
				</label>
				<input
					id="numHidden"
					type="number"
					onChange={handleNumberChange("numHidden")}
					placeholder="4"
					className={style.input}
				/>
			</div>

			<div>
				<label htmlFor="numHidden2" className={style.label}>
					Second Hidden
				</label>
				<input
					id="numHidden2"
					type="number"
					onChange={handleNumberChange("numHidden2")}
					placeholder="2"
					className={style.input}
				/>
			</div>

			<select name="activation" onChange={handleSelectChange} defaultValue="" className={style.select}>
				<option disabled value="">
					Select Activation
				</option>
				<option value="tanh">Tanh</option>
				<option value="sigmoid" disabled>
					Sigmoid
				</option>
				<option value="relu" disabled>
					ReLU
				</option>
			</select>
		</form>
	);
}
