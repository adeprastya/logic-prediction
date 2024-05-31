import Neuron from "./Neuron.ts";

export default class Perceptron {
	constructor({ numInputs, numOutputs, activation }) {
		this.neurons = Array.from({ length: numOutputs }, () => new Neuron(numInputs, activation));
	}

	train({ xData, yData }, { learningRate, epochs }) {
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

	predict(input) {
		return this.neurons.map((neuron) => neuron.activate(input));
	}
}
