import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const FunctionalTestQuickCheck = () => {
  return (
    <Card className="bg-blue-500/10 border border-blue-500/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-blue-400 text-sm sm:text-base">
              Quick Check: Why are monthly functional tests deliberately kept short?
            </p>
            <p className="text-foreground text-sm sm:text-base">
              To avoid draining the battery packs unnecessarily. A short test confirms the luminaires switch to emergency mode and batteries are charging, without reducing battery capacity before they're fully recharged.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
