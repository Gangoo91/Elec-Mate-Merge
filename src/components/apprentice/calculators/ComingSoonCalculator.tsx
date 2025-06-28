
import { Card, CardContent } from "@/components/ui/card";
import { Wrench } from "lucide-react";

interface ComingSoonCalculatorProps {
  calculatorName: string;
}

const ComingSoonCalculator = ({ calculatorName }: ComingSoonCalculatorProps) => {
  return (
    <Card className="border-elec-yellow/20 bg-elec-gray min-h-[400px] flex items-center justify-center">
      <CardContent className="text-center p-6 w-full">
        <Wrench className="h-12 w-12 text-elec-yellow mx-auto mb-4" />
        <h3 className="text-xl font-medium mb-2">{calculatorName.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())} Calculator</h3>
        <p className="text-muted-foreground mb-4">Coming soon! This calculator is currently being developed.</p>
      </CardContent>
    </Card>
  );
};

export default ComingSoonCalculator;
