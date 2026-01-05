import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench } from 'lucide-react';

export const EmergencyLightingPracticalSection2_6 = () => {
  const practicalPoints = [
    "Always carry out functional tests at times that minimise disruption (e.g. after hours)",
    "After an annual full-duration test, recharge batteries immediately to restore system readiness",
    "Keep logbooks up to date and stored in an accessible location near the fire panel or site office",
    "If multiple electricians are working on-site, agree a system for consistent record keeping",
    "Consider recommending automated testing systems in large buildings for reliability and efficiency"
  ];

  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-6 w-6 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <ul className="space-y-3">
          {practicalPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <span className="text-elec-yellow font-bold mt-1">•</span>
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};