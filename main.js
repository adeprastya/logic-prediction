import { AND, NAND, OR, XOR } from "./data/data.js";
import Perceptron from "./model/Perceptron.js";
import MLP from "./model/MLP.js";

const architecture = document.getElementById("architecture");
const studyCase = architecture.querySelector("#studyCase");
const numInputs = architecture.querySelector("#numInputs");
const numHidden = architecture.querySelector("#numHidden");
const numHidden2 = architecture.querySelector("#numHidden2");
const numOutputs = architecture.querySelector("#numOutputs");
const activation = architecture.querySelector("#activation");
const create = architecture.querySelector("#create");

const parameters = document.getElementById("parameters");
const learningRate = parameters.querySelector("#learningRate");
const epochs = parameters.querySelector("#epoch");
const treshold = parameters.querySelector("#treshold");
const train = parameters.querySelector("#train");

const input = document.getElementById("input");
const input1 = input.querySelector("#input1");
const input2 = input.querySelector("#input2");
const predict = input.querySelector("#predict");

const output = document.getElementById("output");
const prediction = output.querySelector("#prediction");
const result = output.querySelector("#result");

let arch = null;
let param = null;
let model = null;
let isTrained = false;

studyCase.addEventListener("change", () => {
	model = null;
	isTrained = false;

	if (studyCase.value == "XOR") {
		numHidden.removeAttribute("disabled");
		numHidden2.removeAttribute("disabled");
	} else {
		numHidden.setAttribute("disabled", true);
		numHidden2.setAttribute("disabled", true);
	}
});

create.addEventListener("click", (e) => {
	e.preventDefault();

	arch = {
		numInputs: Number.parseInt(numInputs.value),
		numHidden: Number.parseInt(numHidden.value),
		numHidden2: Number.parseInt(numHidden2.value),
		numOutputs: Number.parseInt(numOutputs.value),
		activation: activation.value
	};

	if (studyCase.value == "XOR") {
		model = new MLP(arch);
	} else {
		model = new Perceptron(arch);
	}

	alert("Model created");
});

train.addEventListener("click", (e) => {
	if (!model) {
		return alert("Model not created");
	}

	e.preventDefault();

	param = {
		learningRate: Number.parseFloat(learningRate.value),
		epochs: Number.parseInt(epochs.value),
		treshold: Number.parseFloat(treshold.value)
	};

	switch (studyCase.value) {
		case "AND":
			model.train(AND, param);
			break;
		case "NAND":
			model.train(NAND, param);
			break;
		case "OR":
			model.train(OR, param);
			break;
		case "XOR":
			model.train(XOR, param);
			break;
	}

	isTrained = true;
	alert("Model trained");
});

predict.addEventListener("click", (e) => {
	if (!isTrained) {
		return alert("Model not trained");
	}

	e.preventDefault();

	const results = model.predict([input1.value, input2.value]);

	prediction.innerHTML = results[0];
	result.innerHTML = results[0] > param.treshold;
});
