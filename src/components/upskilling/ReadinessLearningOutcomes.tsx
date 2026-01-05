
import { Target, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ReadinessLearningOutcomes = () => {
  const outcomes = [
    "Identify the key conditions that must be met before testing",
    "Understand how to confirm circuits are safe to energise and test",
    "Recognise when testing should be delayed or stopped"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground">By the end of this section, you will be able to:</p>
        <ul className="space-y-3">
          {outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">{outcome}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
