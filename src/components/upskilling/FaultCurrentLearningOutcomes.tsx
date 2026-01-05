import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const FaultCurrentLearningOutcomes = () => {
  const outcomes = [
    "Carry out PSC and PEFC tests",
    "Understand the difference between them",
    "Confirm that protective devices are suitably rated"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground mb-4">
          By the end of this section, you will be able to:
        </p>
        <div className="space-y-3">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex items-start gap-3">
              <Badge 
                variant="secondary" 
                className="bg-elec-yellow/20 text-elec-yellow mt-0.5 text-xs"
              >
                {index + 1}
              </Badge>
              <p className="text-foreground flex-1">{outcome}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};