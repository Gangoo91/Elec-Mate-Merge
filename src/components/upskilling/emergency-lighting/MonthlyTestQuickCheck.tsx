import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const MonthlyTestQuickCheck = () => {
  return (
    <Card className="bg-green-500/10 border border-green-500/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-green-400 text-sm sm:text-base">
              Quick Check: Why is the monthly test deliberately short in duration?
            </p>
            <p className="text-foreground text-sm sm:text-base">
              To avoid draining batteries unnecessarily. Short tests confirm that luminaires switch to emergency mode and batteries are charging, without significantly reducing battery capacity before they've fully recharged. This prevents the need for a 24-hour recharge period and maintains system readiness.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
