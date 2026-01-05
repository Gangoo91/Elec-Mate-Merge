import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const EmergencyLightingLearningOutcomesSection3_6 = () => {
  const outcomes = [
    "Recognise the role of software tools in emergency lighting design",
    "Identify common design programs used in the industry",
    "Use software outputs (lux plots, polar diagrams, spacing tables) to verify compliance",
    "Explain how software supports documentation and client handover",
    "Understand the limitations of software and the need for on-site verification"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground mb-4">
          By completing this section, you will be able to:
        </p>
        <div className="space-y-3">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">{outcome}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};