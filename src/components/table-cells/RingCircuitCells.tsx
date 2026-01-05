import { Input } from '@/components/ui/input';
import { TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface RingCircuitCellsProps {
  r1: string;
  rn: string;
  r2: string;
  onR1Change: (value: string) => void;
  onRnChange: (value: string) => void;
  onR2Change: (value: string) => void;
  onCalculateR1R2: () => void;
}

export const RingCircuitCells = ({
  r1,
  rn,
  r2,
  onR1Change,
  onRnChange,
  onR2Change,
  onCalculateR1R2
}: RingCircuitCellsProps) => {
  const { toast } = useToast();

  const handleCalculate = () => {
    const r1Val = parseFloat(r1);
    const rnVal = parseFloat(rn);
    const r2Val = parseFloat(r2);

    if (isNaN(r1Val) || isNaN(rnVal) || isNaN(r2Val)) {
      toast({
        title: "Missing Ring Values",
        description: "Please enter all ring circuit test values (r1, rn, r2).",
        variant: "destructive"
      });
      return;
    }

    // Calculate R1+R2 from ring values using BS 7671 formula
    // R1+R2 = (r1 + r2) / 4
    const calculatedR1R2 = (r1Val + r2Val) / 4;
    
    onCalculateR1R2();
    
    toast({
      title: "R1+R2 Calculated",
      description: `R1+R2 = ${calculatedR1R2.toFixed(3)}Ω from ring values`,
    });
  };

  return (
    <>
      <TableCell className="text-center">
        <Input
          value={r1}
          onChange={(e) => onR1Change(e.target.value)}
          className="w-20 text-center"
          placeholder="0.00"
          step="0.01"
          type="number"
        />
      </TableCell>
      <TableCell className="text-center">
        <Input
          value={rn}
          onChange={(e) => onRnChange(e.target.value)}
          className="w-20 text-center"
          placeholder="0.00"
          step="0.01"
          type="number"
        />
      </TableCell>
      <TableCell className="text-center">
        <div className="flex items-center gap-1">
          <Input
            value={r2}
            onChange={(e) => onR2Change(e.target.value)}
            className="w-20 text-center"
            placeholder="0.00"
            step="0.01"
            type="number"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={handleCalculate}
            title="Calculate R1+R2 from ring values"
          >
            <Calculator className="h-4 w-4" />
          </Button>
        </div>
      </TableCell>
    </>
  );
};
