import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const AnnualTestQuickCheck = () => {
  return (
    <Card className="bg-blue-500/10 border border-blue-500/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-blue-400 text-sm sm:text-base">
              Quick Check: What does the annual duration test prove that the monthly test does not?
            </p>
            <p className="text-foreground text-sm sm:text-base">
              The annual test proves that batteries can sustain illumination for the full 3-hour rated period under realistic load conditions. Monthly tests only confirm switching and basic operation but don't verify whether batteries have sufficient capacity to maintain illumination throughout an extended power outage. The annual test also identifies weak batteries that may pass short tests but fail under prolonged operation.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
