import MLP from "@/ANN/model/MLP.ts";
import { createContext, useEffect, useState } from "react";
export const ModelsContext = createContext({});

type Arch = {
	numInputs: number;
	numOutputs: number;
	numHidden: number | null;
	numHidden2: number | null;
	activation: string | null;
	isTrained: boolean;
};
type Param = {
	epochs: number | null;
	learningRate: number | null;
	threshold: number | null;
	lossFunction: string | null;
	studyCase: string | null;
};
type Input = {
	inputA: number | null;
	inputB: number | null;
};

const initArch = {
	numInputs: 2,
	numOutputs: 1,
	numHidden: null,
	numHidden2: null,
	activation: null,
	isTrained: false
} as Arch;
const initParam = {
	epochs: null,
	learningRate: null,
	threshold: null,
	lossFunction: null,
	studyCase: null
} as Param;
const initInput = {
	inputA: null,
	inputB: null
} as Input;

export default function ModelsContextProvider({ children }: { children: React.ReactNode }) {
	const [model, setModel] = useState(null);
	const [arch, setArch] = useState(initArch);
	const [param, setParam] = useState(initParam);
	const [input, setInput] = useState(initInput);
	const [result, setResult] = useState(null);

	useEffect(() => {
		if (arch.numHidden !== null && arch.numHidden2 !== null && arch.activation !== null) {
			setModel(new MLP(arch));
		}

		console.log(arch);
	}, [arch]);

	useEffect(() => {
		setArch((arch) => ({ ...arch, isTrained: false }));

		console.log(param);
	}, [param]);

	useEffect(() => {
		if (input.inputA !== null && input.inputB !== null) {
			const result = model.predict([input.inputA, input.inputB]);

			setResult(result);
		}
	}, [input]);

	return (
		<ModelsContext.Provider value={{ arch, setArch, model, setModel, param, setParam, input, setInput, result }}>
			{children}
		</ModelsContext.Provider>
	);
}
