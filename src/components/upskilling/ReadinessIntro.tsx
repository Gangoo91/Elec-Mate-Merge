
import { ClipboardCheck, Shield } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ReadinessIntro = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
          Introduction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground leading-relaxed">
          Once visual inspections are complete and documentation is reviewed, you need to make sure the installation is fully ready for electrical testing. This section outlines the final checks and decisions before applying test equipment.
        </p>
        <p className="text-foreground leading-relaxed">
          Jumping into testing too early—without proper verification—can lead to unsafe conditions, inaccurate results, or even equipment damage. Confirming readiness is the final safety gate before any test is run.
        </p>
        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <p className="text-red-200 font-medium flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Critical: You are legally responsible for decisions made at this stage.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
