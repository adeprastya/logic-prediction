import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ArchForm from "@/components/organisms/ArchForm";
import ParamForm from "@/components/organisms/ParamForm";

import { ModelsContext } from "@/context/ModelsContext";
import { useContext } from "react";

export default function App() {
	const { arch, setArch } = useContext<any>(ModelsContext);
	
	return (
		<>
			<Tabs onValueChange={(e) => setArch({ ...arch, studyCase: e })} defaultValue="and" className="w-[400px]">
				<TabsList>
					<TabsTrigger value="and">AND</TabsTrigger>
					<TabsTrigger value="or">OR</TabsTrigger>
					<TabsTrigger value="nand">NAND</TabsTrigger>
					<TabsTrigger value="xor">XOR</TabsTrigger>
				</TabsList>

				<TabsContent value="and">
					<ArchForm type="P" />
				</TabsContent>

				<TabsContent value="or">
					<ArchForm type="P" />
				</TabsContent>

				<TabsContent value="nand">
					<ArchForm type="P" />
				</TabsContent>

				<TabsContent value="xor">
					<ArchForm type="MLP" />
				</TabsContent>
			</Tabs>

			<ParamForm />
		</>
	);
}
