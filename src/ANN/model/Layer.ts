import Neuron from "./Neuron";

interface LayerConfig {
	numNeurons?: number;
	numInputs?: number;
	activation: "sigmoid" | "tanh" | "relu" | "none";
}

export default class Layer {
	public neurons: Neuron[];

	constructor({ numNeurons, numInputs, activation }: LayerConfig) {
		if (numNeurons === undefined || numInputs === undefined || activation === undefined) {
			throw new Error("Number of neurons is required");
		}
		this.neurons = Array.from({ length: numNeurons }, () => new Neuron(numInputs, activation));
	}

	activate(inputs: number[]): number[] {
		return this.neurons.map((neuron) => neuron.activate(inputs));
	}
}
