import { AND, NAND, OR, XOR } from "@/ANN/data/data";
import Perceptron from "@/ANN/model/Perceptron";
import MLP from "@/ANN/model/MLP";
import { createContext, useEffect, useState } from "react";

export const ModelsContext = createContext({});

export default function ModelsContextProvider({ children }: { children: React.ReactNode }) {
	const [arch, setArch] = useState({ numOutputs: 1, studyCase: "and" });
	const [model, setModel] = useState(null);
	const [param, setParam] = useState({ train: false });

	useEffect(() => {
		if ("numInputs" in arch && "activation" in arch) {
			if ("numHidden" in arch && "numHidden2" in arch) {
				setModel(new MLP(arch));
			} else {
				setModel(new Perceptron(arch));
			}
		}

		switch (arch.studyCase) {
			case "and":
				param.data = { ...AND };
				break;
			case "or":
				param.data = OR;
				break;
			case "nand":
				param.data = NAND;
				break;
			case "xor":
				param.data = XOR;
				break;
		}

		console.log(arch);
	}, [arch]);

	useEffect(() => {
		console.log(model);
	}, [model]);

	useEffect(() => {
		if (param.train == true) {
			model.train(param.data, { ...param });
			param.train = false;
		}

		console.log(param);
	}, [param]);

	return (
		<ModelsContext.Provider value={{ arch, setArch, model, setModel, param, setParam }}>
			{children}
		</ModelsContext.Provider>
	);
}
