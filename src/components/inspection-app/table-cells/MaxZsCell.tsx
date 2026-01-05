import { Input } from '@/components/ui/input';
import { TableCell } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Calculator } from 'lucide-react';
import { getZsLimitFromDeviceString, getDisconnectionTimeForCircuit } from '@/data/zsLimits';
import { useToast } from '@/hooks/use-toast';

interface MaxZsCellProps {
  value: string;
  onChange: (value: string) => void;
  protectiveDeviceType: string;
  protectiveDeviceRating: string;
  circuitDescription?: string;
}

export const MaxZsCell = ({ 
  value, 
  onChange, 
  protectiveDeviceType,
  protectiveDeviceRating,
  circuitDescription = ''
}: MaxZsCellProps) => {
  const { toast } = useToast();

  const handleAutoLookup = () => {
    const rating = parseInt(protectiveDeviceRating);
    if (isNaN(rating)) {
      toast({
        title: "Missing Device Rating",
        description: "Please enter the protective device rating first.",
        variant: "destructive"
      });
      return;
    }

    if (!protectiveDeviceType) {
      toast({
        title: "Missing Device Type",
        description: "Please select the protective device type first.",
        variant: "destructive"
      });
      return;
    }

    const result = getZsLimitFromDeviceString(protectiveDeviceType, rating, circuitDescription);
    
    if (result) {
      onChange(result.maxZs.toFixed(2));
      const disconnectionTime = getDisconnectionTimeForCircuit(circuitDescription);
      toast({
        title: "Max Zs Looked Up",
        description: `${result.maxZs.toFixed(2)}Ω (${disconnectionTime} disconnection) - ${result.source}`,
      });
    } else {
      toast({
        title: "Max Zs Not Found",
        description: `No Max Zs value found for ${protectiveDeviceType} at ${rating}A rating.`,
        variant: "destructive"
      });
    }
  };

  return (
    <TableCell className="text-center">
      <div className="flex items-center gap-1">
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
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
          onClick={handleAutoLookup}
          title="Lookup Max Zs from BS 7671 Tables 41.2/41.3/41.4"
        >
          <Calculator className="h-4 w-4" />
        </Button>
      </div>
    </TableCell>
  );
};
