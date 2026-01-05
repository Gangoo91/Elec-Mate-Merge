
import { Wrench, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const AccessibilityScenario = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          On-the-Job Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <p className="text-blue-200 font-medium mb-2">Scenario:</p>
          <p className="text-foreground leading-relaxed text-base sm:text-lg">
            You open a distribution board and find the MCBs aren't labelled. You spend 45 minutes identifying circuits manually—and still aren't confident. The client wants you to "just guess" for the certificate.
          </p>
        </div>
        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <p className="text-green-200 font-medium mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Correct Approach:
          </p>
          <p className="text-foreground leading-relaxed text-base sm:text-lg">
            <strong className="text-foreground">You can't.</strong> Clearly state it as a limitation and do not issue a certificate with assumptions. Proper labelling is a compliance requirement, not a convenience.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
