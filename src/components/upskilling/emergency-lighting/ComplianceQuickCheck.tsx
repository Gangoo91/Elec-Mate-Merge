import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const ComplianceQuickCheck = () => {
  return (
    <Card className="bg-red-500/10 border border-red-500/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-red-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-red-400 text-sm sm:text-base">
              Quick Check: What is the legal consequence of failing to carry out regular testing?
            </p>
            <p className="text-foreground text-sm sm:text-base">
              Failure to carry out regular testing can result in invalid insurance coverage, enforcement notices from the Fire and Rescue Authority, unlimited fines, and criminal prosecution of the Responsible Person. In severe cases causing death or serious injury, imprisonment is possible. Additionally, the Responsible Person may face civil liability claims if system failure causes harm during an emergency.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
