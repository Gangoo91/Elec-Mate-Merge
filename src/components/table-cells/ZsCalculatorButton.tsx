import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ZsCalculatorButtonProps {
  r1r2: string;
  ze: string;
  onCalculate: (calculatedZs: string) => void;
}

export const ZsCalculatorButton = ({ r1r2, ze, onCalculate }: ZsCalculatorButtonProps) => {
  const { toast } = useToast();

  const handleCalculate = () => {
    const r1r2Val = parseFloat(r1r2);
    const zeVal = parseFloat(ze);

    if (isNaN(r1r2Val)) {
      toast({
        title: "Missing R1+R2",
        description: "Please enter the R1+R2 value first.",
        variant: "destructive"
      });
      return;
    }

    if (isNaN(zeVal)) {
      toast({
        title: "Missing Ze",
        description: "Ze (external earth fault loop impedance) is required. Please check the installation details.",
        variant: "destructive"
      });
      return;
    }

    // Calculate Zs = Ze + (R1+R2)
    const calculatedZs = zeVal + r1r2Val;
    onCalculate(calculatedZs.toFixed(2));
    
    toast({
      title: "Zs Calculated",
      description: `Zs = ${calculatedZs.toFixed(2)}Ω (Ze ${zeVal}Ω + R1+R2 ${r1r2Val}Ω)`,
    });
  };

  return (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      className="h-8 w-8 shrink-0"
      onClick={handleCalculate}
      title="Calculate Zs from Ze + R1+R2"
    >
      <Calculator className="h-4 w-4" />
    </Button>
  );
};
