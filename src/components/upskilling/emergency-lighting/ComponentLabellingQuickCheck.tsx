import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const ComponentLabellingQuickCheck = () => {
  return (
    <Card className="bg-blue-500/10 border border-blue-500/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-blue-400 text-sm sm:text-base">
              Quick Check: Name three system components that must be labelled for compliance.
            </p>
            <p className="text-foreground text-sm sm:text-base">
              (1) Luminaires (with circuit references and maintained/non-maintained status), (2) Distribution boards (clearly marked as "Emergency Lighting Circuits Only"), and (3) Test points or key switches (identified for monthly functional checks). Additional labelling may include cabling and central battery systems.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
