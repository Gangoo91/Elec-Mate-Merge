import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { Target } from "lucide-react";

const PricingStrategyCalculator = () => {
  const { toast } = useToast();
  const [calculated, setCalculated] = useState(false);

  const calculatePricing = () => {
    setCalculated(true);
    toast({
      title: "Pricing Strategy Calculated",
      description: "Your strategic pricing analysis has been updated.",
      variant: "success"
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <Target className="h-8 w-8 text-elec-yellow" />
          Pricing Strategy Calculator
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Develop optimal pricing strategies based on project complexity and market conditions.
        </p>
        <BackButton customUrl="/electrician/business-development/tools" label="Back to Calculators" />
      </div>

      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Target className="h-5 w-5 text-elec-yellow" />
            Strategic Pricing Analysis
            {calculated && <Badge variant="success" className="ml-auto">Calculated</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={calculatePricing} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            Calculate Pricing Strategy
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default PricingStrategyCalculator;