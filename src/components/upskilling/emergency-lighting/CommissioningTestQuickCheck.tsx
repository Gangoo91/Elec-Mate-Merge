import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const CommissioningTestQuickCheck = () => {
  return (
    <Card className="bg-blue-500/10 border border-blue-500/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-blue-400 text-sm sm:text-base">
              Quick Check: When must a full 3-hour test be carried out besides annual inspections?
            </p>
            <p className="text-foreground text-sm sm:text-base">
              At commissioning (before handover) and after any modifications to the emergency lighting system. This ensures the system is fully compliant before being put into service or after changes are made.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
