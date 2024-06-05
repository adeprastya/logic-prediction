import { useContext } from "react";
import { ModelsContext } from "@/context/ModelsContext.tsx";

export default function ArchForm() {
	const { arch, setArch } = useContext<any>(ModelsContext);

	return (
		<form action="">
			<h2>Multi Layer Perceptron</h2>

			<div>
				<label htmlFor="numHidden">First Hidden</label>
				<input
					id="numHidden"
					type="number"
					onChange={(e) => setArch({ ...arch, numHidden: Number.parseInt(e.target.value) })}
				/>
			</div>

			<div>
				<label htmlFor="numHidden2">Second Hidden</label>
				<input
					id="numHidden2"
					type="number"
					onChange={(e) => setArch({ ...arch, numHidden2: Number.parseInt(e.target.value) })}
				/>
			</div>

			<select name="activation " onChange={(e) => setArch({ ...arch, activation: e.target.value })}>
				<option disabled selected>
					Select Activation
				</option>
				<option value="sigmoid">Sigmoid</option>
				<option value="tanh">Tanh</option>
				<option value="relu">ReLU</option>
			</select>
		</form>
	);
}
