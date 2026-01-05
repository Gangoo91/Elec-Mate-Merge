import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const LogbookQuickCheck = () => {
  return (
    <Card className="bg-purple-500/10 border border-purple-500/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-purple-400 text-sm sm:text-base">
              Quick Check: What five details must be recorded for each test in the logbook?
            </p>
            <div className="text-foreground text-sm sm:text-base space-y-1">
              <p><strong>1.</strong> Date of test</p>
              <p><strong>2.</strong> Type of test (monthly or annual)</p>
              <p><strong>3.</strong> Person carrying out the test</p>
              <p><strong>4.</strong> Results (pass/fail)</p>
              <p><strong>5.</strong> Any defects and remedial action taken</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
