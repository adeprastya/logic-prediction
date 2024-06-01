import { useContext } from "react";
import { ModelsContext } from "@/context/ModelsContext";

export default function InputForm() {
	const { input, setInput } = useContext<any>(ModelsContext);

	return (
		<form action="">
			<div>
				<label htmlFor="inputA">Input</label>
				<input
					id="inputA"
					type="number"
					min={0}
					max={1}
					step={1}
					onChange={(e) => setInput({ ...input, inputA: Number.parseInt(e.target.value) })}
				/>
			</div>

			<div>
				<label htmlFor="inputB">Input</label>
				<input
					id="inputB"
					type="number"
					min={0}
					max={1}
					step={1}
					onChange={(e) => setInput({ ...input, inputB: Number.parseInt(e.target.value) })}
				/>
			</div>
		</form>
	);
}
