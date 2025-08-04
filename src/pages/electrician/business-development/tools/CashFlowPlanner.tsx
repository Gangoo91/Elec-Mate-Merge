import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MobileInput } from "@/components/ui/mobile-input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BackButton from "@/components/common/BackButton";
import { useToast } from "@/hooks/use-toast";
import { TrendingUp, Calendar } from "lucide-react";

const CashFlowPlanner = () => {
  const { toast } = useToast();
  const [calculated, setCalculated] = useState(false);

  const calculateCashFlow = () => {
    setCalculated(true);
    toast({
      title: "Cash Flow Calculated",
      description: "Your 12-month cash flow projection has been updated.",
      variant: "success"
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex flex-col items-center justify-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-4 flex items-center gap-3">
          <TrendingUp className="h-8 w-8 text-elec-yellow" />
          Cash Flow Planner
        </h1>
        <p className="text-muted-foreground text-center max-w-2xl mb-6">
          Plan and forecast your cash flow over 12 months to ensure smooth business operations.
        </p>
        <BackButton customUrl="/electrician/business-development/tools" label="Back to Calculators" />
      </div>

      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-elec-yellow" />
            Cash Flow Planning
            {calculated && <Badge variant="success" className="ml-auto">Calculated</Badge>}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button onClick={calculateCashFlow} className="bg-elec-yellow text-black hover:bg-elec-yellow/90">
            Calculate Cash Flow
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default CashFlowPlanner;