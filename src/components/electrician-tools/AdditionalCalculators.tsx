
import { Card, CardContent } from "@/components/ui/card";
import { Calculator } from "lucide-react";

const calculatorTypes = ["Power Factor", "Conduit Fill", "Ohm's Law", "Transformer Sizing"];

const AdditionalCalculators = () => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {calculatorTypes.map((calc, i) => (
        <Card key={i} className="border-elec-yellow/20 bg-elec-gray">
          <CardContent className="p-4 flex flex-col items-center justify-center text-center">
            <Calculator className="h-6 w-6 text-elec-yellow mb-2" />
            <h3 className="font-medium text-sm">{calc}</h3>
            <p className="text-xs text-muted-foreground mt-1">Calculator</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AdditionalCalculators;
