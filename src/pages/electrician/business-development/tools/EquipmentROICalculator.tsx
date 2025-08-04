import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { BarChart3 } from "lucide-react";

const EquipmentROICalculator = () => {
  const { toast } = useToast();
  const [calculated, setCalculated] = useState(false);

  const calculateROI = () => {
    setCalculated(true);
    toast({
      title: "ROI Calculated",
      description: "Your equipment investment analysis has been updated.",
      variant: "success"
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <BarChart3 className="h-8 w-8 text-elec-yellow" />
          Equipment ROI Calculator
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Analyse the return on investment for new equipment purchases.
        </p>
        <BackButton customUrl="/electrician/business-development/tools" label="Back to Calculators" />
      </div>

      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-elec-yellow" />
            ROI Analysis
            {calculated && <Badge variant="success" className="ml-auto">Calculated</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={calculateROI} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            Calculate ROI
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default EquipmentROICalculator;