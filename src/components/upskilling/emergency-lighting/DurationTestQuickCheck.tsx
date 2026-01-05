import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const DurationTestQuickCheck = () => {
  return (
    <Card className="bg-blue-500/10 border border-blue-500/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-blue-400 text-sm sm:text-base">
              Quick Check: What is the main difference between a functional test and a 3-hour duration test?
            </p>
            <p className="text-foreground text-sm sm:text-base">
              A functional test is short and only confirms that luminaires switch to emergency mode. A 3-hour duration test runs the entire rated period to verify battery capacity and ensure the system can sustain illumination throughout a full evacuation.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
