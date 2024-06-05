import MLP from "@/ANN/model/MLP";
import React, { createContext, useEffect, useState, ReactNode, ReactElement } from "react";

interface Arch {
	numInputs: number;
	numOutputs: number;
	numHidden?: number;
	numHidden2?: number;
	activation?: string;
}

interface Param {
	epochs?: number;
	learningRate?: number;
	threshold?: number;
	lossFunction?: string;
	studyCase?: string;
}

interface Input {
	inputA?: number;
	inputB?: number;
}

interface ModelsContextType {
	arch: Arch;
	setArch: React.Dispatch<React.SetStateAction<Arch>>;
	model: MLP | undefined;
	setModel: React.Dispatch<React.SetStateAction<MLP | undefined>>;
	param: Param;
	setParam: React.Dispatch<React.SetStateAction<Param>>;
	input: Input;
	setInput: React.Dispatch<React.SetStateAction<Input>>;
	result: number[] | undefined;
}

const initArch: Arch = {
	numInputs: 2,
	numOutputs: 1,
	numHidden: undefined,
	numHidden2: undefined,
	activation: undefined
};

const initParam: Param = {
	epochs: undefined,
	learningRate: undefined,
	threshold: undefined,
	lossFunction: undefined,
	studyCase: undefined
};

const initInput: Input = {
	inputA: undefined,
	inputB: undefined
};

export const ModelsContext = createContext<ModelsContextType | undefined>(undefined);

export default function ModelsContextProvider({ children }: { children: ReactNode }): ReactElement {
	const [model, setModel] = useState<MLP | undefined>(undefined);
	const [arch, setArch] = useState<Arch>(initArch);
	const [param, setParam] = useState<Param>(initParam);
	const [input, setInput] = useState<Input>(initInput);
	const [result, setResult] = useState<number[] | undefined>(undefined);
	const [isTrained, setIsTrained] = useState(false);

	useEffect(() => {
		if (arch.numHidden !== undefined && arch.numHidden2 !== undefined && arch.activation !== undefined) {
			setModel(new MLP(arch));
		}

		setResult(undefined);
	}, [arch]);

	useEffect(() => {
		if (
			input.inputA !== undefined &&
			!isNaN(input.inputA) &&
			input.inputB !== undefined &&
			!isNaN(input.inputB) &&
			model
		) {
			setResult(model.predict([input.inputA, input.inputB]));
		} else {
			setResult(undefined);
		}
	}, [input]);

	useEffect(() => {
		setIsTrained(false);
		setResult(undefined);
	}, [model, param]);

	return (
		<ModelsContext.Provider
			value={{ arch, setArch, model, setModel, param, setParam, input, setInput, result, isTrained, setIsTrained }}
		>
			{children}
		</ModelsContext.Provider>
	);
}
