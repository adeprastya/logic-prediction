import Neuron from "./Neuron";

interface PerceptronConfig {
	numInputs: number;
	numOutputs: number;
	activation: "sigmoid" | "tanh" | "relu";
}

interface TrainingData {
	xData: number[][];
	yData: number[][];
}

interface TrainingConfig {
	learningRate: number;
	epochs: number;
}

export default class Perceptron {
	private neurons: Neuron[];

	constructor({ numInputs, numOutputs, activation }: PerceptronConfig) {
		this.neurons = Array.from({ length: numOutputs }, () => new Neuron(numInputs, activation));
	}

	train({ xData, yData }: TrainingData, { learningRate, epochs }: TrainingConfig): void {
		for (let epoch = 0; epoch < epochs; epoch++) {
			for (let i = 0; i < xData.length; i++) {
				const input = xData[i];
				const target = yData[i];

				this.neurons.forEach((neuron, index) => {
					const output = neuron.activate(input);
					const error = target[index] - output;

					for (let j = 0; j < input.length; j++) {
						neuron.weights[j] += learningRate * error * input[j];
					}

					neuron.bias += learningRate * error;
				});
			}
		}
	}

	predict(input: number[]): number[] {
		return this.neurons.map((neuron) => neuron.activate(input));
	}
}
