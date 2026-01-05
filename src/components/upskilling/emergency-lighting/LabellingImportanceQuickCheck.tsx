import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const LabellingImportanceQuickCheck = () => {
  return (
    <Card className="bg-blue-500/10 border border-blue-500/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-blue-400 text-sm sm:text-base">
              Quick Check: Why must emergency lighting circuits be labelled separately from normal lighting circuits?
            </p>
            <p className="text-foreground text-sm sm:text-base">
              To ensure electricians and maintenance staff can quickly identify and isolate emergency circuits without accidentally disconnecting life-safety systems. Separate labelling prevents dangerous mistakes during maintenance and allows fire inspectors to verify dedicated protection and segregation.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
