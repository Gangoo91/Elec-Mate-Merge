import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle2 } from 'lucide-react';

export const EmergencyLightingLearningOutcomesSection6_4 = () => {
  const outcomes = [
    "Identify all documentation required for emergency lighting audits",
    "Understand what Fire Authorities and insurers look for during inspections",
    "Maintain records in accordance with BS 5266-1 and BS 5266-8",
    "Ensure certificates, test reports, and logbooks are up to date and accessible",
    "Demonstrate compliance effectively during regulatory audits"
  ];

  return (
    <Card className="bg-slate-800/50 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground mb-4">By completing this section, you will be able to:</p>
        <ul className="space-y-3">
          {outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-3 text-foreground">
              <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
