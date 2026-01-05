import { Card, CardContent } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const HandoverPurposeQuickCheck = () => {
  return (
    <Card className="bg-blue-500/10 border border-blue-500/20">
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-5 w-5 text-blue-400 flex-shrink-0 mt-0.5" />
          <div className="space-y-2">
            <p className="font-semibold text-blue-400 text-sm sm:text-base">
              Quick Check: Why is a documented handover essential for both the contractor and the client?
            </p>
            <div className="text-foreground text-sm sm:text-base">
              <p className="mb-2"><strong>For the contractor:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Proves installation was completed to specification</li>
                <li>Transfers legal responsibility for maintenance to the client</li>
                <li>Protects against future liability claims</li>
              </ul>
              <p className="mb-2 mt-3"><strong>For the client:</strong></p>
              <ul className="list-disc list-inside space-y-1 ml-2">
                <li>Confirms they have all necessary documentation</li>
                <li>Establishes their legal obligations under Fire Safety Order 2005</li>
                <li>Provides evidence of compliance for insurance and fire authority inspections</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
