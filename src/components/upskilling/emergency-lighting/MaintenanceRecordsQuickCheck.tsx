import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const MaintenanceRecordsQuickCheck = () => {
  return (
    <Card className="bg-blue-500/10 border border-blue-500/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-blue-400 text-sm sm:text-base">
              Quick Check: What must always be recorded after a failed luminaire test?
            </p>
            <p className="text-foreground text-sm sm:text-base">
              The specific fault found, the luminaire reference number, the date of failure, the remedial action taken (e.g., battery replacement, luminaire repair), who carried out the work, and the re-test result confirming the fault has been rectified. This creates a complete audit trail for compliance.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
