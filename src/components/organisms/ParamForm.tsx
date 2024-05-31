import { useContext } from "react";
import { ModelsContext } from "@/context/ModelsContext";

export default function ParamForm() {
	const { param, setParam } = useContext<any>(ModelsContext);

	return (
		<form action="">
			<div>
				<label htmlFor="epoch">Epoch</label>
				<input
					id="epoch"
					type="number"
					onChange={(e) => setParam({ ...param, epochs: Number.parseFloat(e.target.value) })}
				/>
			</div>

			<div>
				<label htmlFor="learningRate">Learning Rate</label>
				<input
					id="learningRate"
					type="number"
					onChange={(e) => setParam({ ...param, learningRate: Number.parseFloat(e.target.value) })}
				/>
			</div>

			<div>
				<label htmlFor="treshold">Treshold</label>
				<input
					id="treshold"
					type="number"
					onChange={(e) => setParam({ ...param, treshold: Number.parseFloat(e.target.value) })}
				/>
			</div>

			<button
				onClick={(e) => {
					e.preventDefault();
					setParam({ ...param, train: true });
				}}
			>
				Train
			</button>
		</form>
	);
}
