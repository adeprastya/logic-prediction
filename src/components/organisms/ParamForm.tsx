import { AND, ANDNOT, OR, XOR } from "@/ANN/data/data";
import { useContext } from "react";
import { ModelsContext } from "@/context/ModelsContext";

export default function ParamForm() {
	const { param, setParam, model, setArch } = useContext<any>(ModelsContext);

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
				<label htmlFor="threshold">Treshold</label>
				<input
					id="threshold"
					type="number"
					onChange={(e) => setParam({ ...param, threshold: Number.parseFloat(e.target.value) })}
				/>
			</div>

			<select name="lossFunction" onChange={(e) => setParam({ ...param, lossFunction: e.target.value })}>
				<option selected disabled>
					Select Loss Function
				</option>
				<option value="bce">Binary Cross Entropy</option>
				<option value="mse">Mean Square Error</option>
			</select>

			<select name="studyCase" onChange={(e) => setParam({ ...param, studyCase: e.target.value })}>
				<option selected disabled>
					Select Study Case
				</option>
				<option value="and">AND</option>
				<option value="or">OR</option>
				<option value="andnot">ANDNOT</option>
				<option value="xor">XOR</option>
			</select>

			<button
				onClick={(e) => {
					e.preventDefault();

					console.log(model.hiddenLayer.neurons[0].bias);

					switch (param.studyCase) {
						case "and":
							model.train(AND, param);
							break;
						case "or":
							model.train(OR, param);
							break;
						case "andnot":
							model.train(ANDNOT, param);
							break;
						case "xor":
							model.train(XOR, param);
							break;
					}

					console.log(model.hiddenLayer.neurons[0].bias);

					setArch((arch: any) => ({ ...arch, isTrained: true }));
				}}
			>
				Train
			</button>
		</form>
	);
}
