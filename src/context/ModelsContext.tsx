import { AND, NAND, OR, XOR } from "@/ANN/data/data";
import Perceptron from "@/ANN/model/Perceptron";
import MLP from "@/ANN/model/MLP";
import { createContext, useEffect, useState, useCallback } from "react";

export const ModelsContext = createContext({});

export default function ModelsContextProvider({ children }: { children: React.ReactNode }) {
  const [arch, setArch] = useState({ numInputs: 2, numOutputs: 1, studyCase: "and" });
  const [model, setModel] = useState(null);
  const [param, setParam] = useState({ data: {}, train: false });
  const [input, setInput] = useState({});

  const initializeModel = useCallback(() => {
    const { numInputs, activation, numHidden, numHidden2 } = arch;
    if (numInputs && activation) {
      if (numHidden && numHidden2) {
        setModel(new MLP(arch));
      } else {
        setModel(new Perceptron(arch));
      }
    }
  }, [arch]);

  const loadData = useCallback(() => {
    const { studyCase } = arch;
    let data;
    switch (studyCase) {
      case "and":
        data = AND;
        break;
      case "or":
        data = OR;
        break;
      case "nand":
        data = NAND;
        break;
      case "xor":
        data = XOR;
        break;
      default:
        data = {};
    }
    setParam((prev) => ({ ...prev, data }));
  }, [arch]);

  useEffect(() => {
    initializeModel();
    loadData();
    console.log("arch", arch);
  }, [arch, initializeModel, loadData]);

  useEffect(() => {
    console.log("model", model);
  }, [model]);

  useEffect(() => {
    if (param.train && model) {
      model.train(param.data, { ...param });
      setParam((prev) => ({ ...prev, train: false }));
    }
    console.log("param", param);
  }, [param, model]);

  useEffect(() => {
    const { inputA, inputB } = input;
    if (inputA !== undefined && inputB !== undefined) {
      console.log(model.predict([inputA, inputB]));
      console.log("ok");
    }
    console.log("input", input);
  }, [input, model]);

  return (
    <ModelsContext.Provider value={{ arch, setArch, model, setModel, param, setParam, input, setInput }}>
      {children}
    </ModelsContext.Provider>
  );
}
