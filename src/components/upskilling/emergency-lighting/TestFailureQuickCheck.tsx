import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const TestFailureQuickCheck = () => {
  return (
    <Card className="bg-blue-500/10 border border-blue-500/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-blue-400 text-sm sm:text-base">
              Quick Check: Why might a luminaire pass a monthly test but fail the annual duration test?
            </p>
            <p className="text-foreground text-sm sm:text-base">
              Ageing batteries may have enough capacity to illuminate for a short period but cannot sustain the load for 3 hours. This is common with batteries over 3-5 years old that have lost significant capacity.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
