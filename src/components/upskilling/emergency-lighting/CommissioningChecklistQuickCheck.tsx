import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export const CommissioningChecklistQuickCheck = () => {
  return (
    <Card className="bg-blue-500/10 border-blue-500/30">
      <CardHeader className="pb-3">
        <CardTitle className="text-blue-400 flex items-center gap-2 text-base sm:text-lg">
          <AlertCircle className="h-5 w-5" />
          ✅ Quick Check
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground font-semibold text-sm sm:text-base mb-2">
          Name three items that must be verified on a commissioning checklist.
        </p>
        <div className="space-y-2">
          <p className="text-foreground text-sm">
            Any three of the following are acceptable answers:
          </p>
          <ul className="list-disc list-inside text-foreground text-sm space-y-1 ml-2">
            <li>Correct luminaire types, positions, and orientations</li>
            <li>Battery capacity and autonomy verified (3-hour test)</li>
            <li>All exit signs conform to ISO 7010</li>
            <li>System labelling, segregation, and containment verified</li>
            <li>Documentation (drawings, logbook, test results) handed to client</li>
            <li>Installer, designer, and verifier signatures confirming compliance</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};
