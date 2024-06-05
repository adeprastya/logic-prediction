import { useContext, ChangeEvent, MouseEvent } from "react";
import { ModelsContext } from "@/context/ModelsContext";
import { AND, ANDNOT, OR, XOR } from "@/ANN/data/data";

const style = {
	form: "max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg",
	label: "block mb-2 font-medium text-gray-700",
	input: "w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500",
	select: "w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500",
	button: "w-full py-2 mt-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
};

export default function ParamForm(): JSX.Element {
	const { param, setParam, model, setIsTrained } = useContext<any>(ModelsContext);

	const handleNumberChange =
		(key: keyof typeof param) =>
		(e: ChangeEvent<HTMLInputElement>): void => {
			setParam({ ...param, [key]: Number.parseFloat(e.target.value) });
		};

	const handleSelectChange =
		(key: keyof typeof param) =>
		(e: ChangeEvent<HTMLSelectElement>): void => {
			setParam({ ...param, [key]: e.target.value });
		};

	const handleTrainClick = (e: MouseEvent<HTMLButtonElement>): void => {
		e.preventDefault();

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

		setIsTrained(true);
	};

	return (
		<form className={style.form}>
			<h2 className="text-lg font-semibold mb-4">Parameters</h2>

			<div>
				<label htmlFor="epoch" className={style.label}>
					Epoch
				</label>
				<input
					id="epoch"
					type="number"
					onChange={handleNumberChange("epochs")}
					placeholder="500"
					className={style.input}
				/>
			</div>

			<div>
				<label htmlFor="learningRate" className={style.label}>
					Learning Rate
				</label>
				<input
					id="learningRate"
					type="number"
					onChange={handleNumberChange("learningRate")}
					placeholder="0.1"
					className={style.input}
				/>
			</div>

			<div>
				<label htmlFor="threshold" className={style.label}>
					Threshold
				</label>
				<input
					id="threshold"
					type="number"
					onChange={handleNumberChange("threshold")}
					placeholder="0.5"
					className={style.input}
				/>
			</div>

			<select
				name="lossFunction"
				onChange={handleSelectChange("lossFunction")}
				defaultValue=""
				className={style.select}
			>
				<option disabled value="">
					Select Loss Function
				</option>
				<option value="bce">Binary Cross Entropy</option>
				<option value="mse" disabled>
					Mean Square Error
				</option>
			</select>

			<select name="studyCase" onChange={handleSelectChange("studyCase")} defaultValue="" className={style.select}>
				<option disabled value="">
					Select Study Case
				</option>
				<option value="and">AND</option>
				<option value="or">OR</option>
				<option value="andnot">ANDNOT</option>
				<option value="xor">XOR</option>
			</select>

			<button onClick={handleTrainClick} className={style.button}>
				Train
			</button>
		</form>
	);
}
