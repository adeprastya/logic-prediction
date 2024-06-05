import Layer from "./Layer";

interface MLPConfig {
	numInputs: number;
	numOutputs: number;
	numHidden: number;
	numHidden2: number;
	activation: "sigmoid" | "tanh" | "relu";
}

interface TrainingData {
	xData: number[][];
	yData: number[][];
}

interface TrainingConfig {
	learningRate: number;
	epochs: number;
	lossFunction: "mse" | "bce";
}

export default class MLP {
	private hiddenLayer: Layer;
	private hiddenLayer2: Layer;
	private outputLayer: Layer;

	constructor({ numInputs, numHidden, numHidden2, numOutputs, activation }: MLPConfig) {
		this.hiddenLayer = new Layer({ numNeurons: numHidden, numInputs, activation });
		this.hiddenLayer2 = new Layer({ numNeurons: numHidden2, numInputs: numHidden, activation });
		this.outputLayer = new Layer({ numNeurons: numOutputs, numInputs: numHidden2, activation });
	}

	train({ xData, yData }: TrainingData, { learningRate, epochs, lossFunction }: TrainingConfig): number[] {
		const losses: number[] = [];

		for (let epoch = 0; epoch < epochs; epoch++) {
			let totalLoss = 0;

			for (let i = 0; i < xData.length; i++) {
				const inputs = xData[i];
				const target = yData[i];

				// FORWARD PASS
				const hiddenOutputs = this.hiddenLayer.activate(inputs);
				const hiddenOutputs2 = this.hiddenLayer2.activate(hiddenOutputs);
				const outputs = this.outputLayer.activate(hiddenOutputs2);

				// Calculate loss (Mean Squared Error or Binary Cross Entropy)
				let loss: number;
				switch (lossFunction) {
					case "mse":
						loss = target.reduce((sum, t, j) => sum + Math.pow(t - outputs[j], 2), 0) / target.length;
						break;
					case "bce":
						loss =
							-target.reduce((sum, t, j) => {
								const epsilon = 1e-15;
								const clippedOutput = Math.max(epsilon, Math.min(1 - epsilon, outputs[j])); // Clip output to avoid log(0) or log(1)
								return sum + (t * Math.log(clippedOutput) + (1 - t) * Math.log(1 - clippedOutput));
							}, 0) / target.length;

						break;
					default:
						throw new Error(`Invalid loss function: ${lossFunction}`);
				}
				totalLoss += loss;

				// BACKWARD PASS (Backpropagation)
				// Calculate output errors and deltas
				const outputErrors = target.map((t, j) => t - outputs[j]);
				const outputDeltas = outputErrors.map((error, j) => error * this.outputLayer.neurons[j].derivative(outputs[j]));

				// Calculate second hidden layer errors and deltas
				const hiddenErrors2 = this.hiddenLayer2.neurons.map((_, j) =>
					outputDeltas.reduce((acc, delta, k) => acc + delta * this.outputLayer.neurons[k].weights[j], 0)
				);
				const hiddenDeltas2 = hiddenErrors2.map(
					(error, j) => error * this.hiddenLayer2.neurons[j].derivative(hiddenOutputs2[j])
				);

				// Calculate first hidden layer errors and deltas
				const hiddenErrors = this.hiddenLayer.neurons.map((_, j) =>
					hiddenDeltas2.reduce((acc, delta, k) => acc + delta * this.hiddenLayer2.neurons[k].weights[j], 0)
				);
				const hiddenDeltas = hiddenErrors.map(
					(error, j) => error * this.hiddenLayer.neurons[j].derivative(hiddenOutputs[j])
				);

				// UPDATE WEIGHTS AND BIASES
				// Update output layer weights and biases
				this.outputLayer.neurons.forEach((neuron, j) => {
					neuron.weights.forEach((_, k) => {
						neuron.weights[k] += learningRate * outputDeltas[j] * hiddenOutputs2[k];
					});
					neuron.bias += learningRate * outputDeltas[j];
				});

				// Update second hidden layer weights and biases
				this.hiddenLayer2.neurons.forEach((neuron, j) => {
					neuron.weights.forEach((_, k) => {
						neuron.weights[k] += learningRate * hiddenDeltas2[j] * hiddenOutputs[k];
					});
					neuron.bias += learningRate * hiddenDeltas2[j];
				});

				// Update first hidden layer weights and biases
				this.hiddenLayer.neurons.forEach((neuron, j) => {
					neuron.weights.forEach((_, k) => {
						neuron.weights[k] += learningRate * hiddenDeltas[j] * inputs[k];
					});
					neuron.bias += learningRate * hiddenDeltas[j];
				});
			}

			// Calculate average loss
			losses.push(totalLoss / xData.length);
		}

		return losses;
	}

	predict(inputs: number[]): number[] {
		const hiddenOutputs = this.hiddenLayer.activate(inputs);
		const hiddenOutputs2 = this.hiddenLayer2.activate(hiddenOutputs);
		return this.outputLayer.activate(hiddenOutputs2);
	}
}
