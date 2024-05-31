import ComboBox from "../molecules/ComboBox.tsx";
import { useContext } from "react";
import { ModelsContext } from "@/context/ModelsContext.tsx";

export default function ArchForm({ type }: { type: "P" | "MLP" }) {
	const { arch, setArch } = useContext<any>(ModelsContext);

	return (
		<form action="">
			<h2>{type === "P" ? "Perceptron" : "MLP"}</h2>

			<div>
				<label htmlFor="numInput">Input</label>
				<input
					id="numInput"
					type="number"
					onChange={(e) => setArch({ ...arch, numInputs: Number.parseInt(e.target.value) })}
				/>
			</div>

			{type === "MLP" && (
				<>
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
				</>
			)}

			<ComboBox />
		</form>
	);
}
