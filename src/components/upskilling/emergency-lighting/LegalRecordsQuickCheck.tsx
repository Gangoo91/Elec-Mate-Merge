import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const LegalRecordsQuickCheck = () => {
  return (
    <Card className="bg-blue-500/10 border border-blue-500/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-blue-400 text-sm sm:text-base">
              Quick Check: What legal risk arises from not keeping maintenance records?
            </p>
            <p className="text-foreground text-sm sm:text-base">
              The Responsible Person can face enforcement notices, unlimited fines, criminal prosecution, and even imprisonment under the Regulatory Reform (Fire Safety) Order 2005. Insurance policies may become void, and civil liability increases significantly if fire-related injury or death occurs due to non-compliance.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
