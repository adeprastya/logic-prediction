class Activation {
	sigmoid(x: number): number {
		return 1 / (1 + Math.exp(-x));
	}

	sigmoidDerivative(x: number): number {
		const sig = this.sigmoid(x);
		return sig * (1 - sig);
	}

	tanh(x: number): number {
		return Math.tanh(x);
	}

	tanhDerivative(x: number): number {
		return 1 - Math.pow(Math.tanh(x), 2);
	}

	relu(x: number): number {
		return Math.max(0, x);
	}

	reluDerivative(x: number): number {
		return x > 0 ? 1 : 0;
	}
}

type ActivationFunction = "sigmoid" | "tanh" | "relu";

export default class Neuron extends Activation {
	public weights: number[];
	public bias: number;
	public activation: ActivationFunction;

	constructor(numInputs: number, activation: ActivationFunction) {
		super();
		this.weights = Array.from({ length: numInputs }, () => Math.random() * 2 - 1);
		this.bias = Math.random() * 2 - 1;
		this.activation = activation;
	}

	activate(inputs: number[]): number {
		const sum = inputs.reduce((acc, input, i) => acc + input * this.weights[i], this.bias);

		switch (this.activation) {
			case "sigmoid":
				return this.sigmoid(sum);
			case "tanh":
				return this.tanh(sum);
			case "relu":
				return this.relu(sum);
			default:
				throw new Error(`Invalid activation function: ${this.activation}`);
		}
	}

	derivative(value: number): number {
		switch (this.activation) {
			case "sigmoid":
				return this.sigmoidDerivative(value);
			case "tanh":
				return this.tanhDerivative(value);
			case "relu":
				return this.reluDerivative(value);
			default:
				throw new Error(`Invalid activation function: ${this.activation}`);
		}
	}
}
