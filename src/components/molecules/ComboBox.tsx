"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

import { ModelsContext } from "@/context/ModelsContext";

const activations = [
	{
		value: "sigmoid",
		label: "Sigmoid"
	},
	{
		value: "tanh",
		label: "Tanh"
	},
	{
		value: "relu",
		label: "ReLU"
	}
];

export default function ComboBox() {
	const [open, setOpen] = React.useState(false);
	const [value, setValue] = React.useState("");
	const { arch, setArch } = React.useContext<any>(ModelsContext);

	React.useEffect(() => {
		if (value) {
			setArch({ ...arch, activation: value });
		}
	}, [value]);

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="outline" role="combobox" aria-expanded={open} className="w-[200px] justify-between">
					{value ? activations.find((activation) => activation.value === value)?.label : "Select activation..."}

					<ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
				</Button>
			</PopoverTrigger>

			<PopoverContent className="w-[200px] p-0">
				<Command>
					{Array.isArray(activations) &&
						activations.map((activation) => (
							<button
								key={activation.value}
								value={activation.value}
								onClick={() => {
									setValue(activation.value === value ? "" : activation.value);
									setOpen(false);
								}}
							>
								<Check className={cn("mr-2 h-4 w-4", value === activation.value ? "opacity-100" : "opacity-0")} />
								{activation.label}
							</button>
						))}
				</Command>
			</PopoverContent>
		</Popover>
	);
}
