import Neuron from "./Neuron";

interface LayerConfig {
	numNeurons: number;
	numInputs: number;
	activation: "sigmoid" | "tanh" | "relu";
}

export default class Layer {
	public neurons: Neuron[];

	constructor({ numNeurons, numInputs, activation }: LayerConfig) {
		this.neurons = Array.from({ length: numNeurons }, () => new Neuron(numInputs, activation));
	}

	activate(inputs: number[]): number[] {
		return this.neurons.map((neuron) => neuron.activate(inputs));
	}
}
