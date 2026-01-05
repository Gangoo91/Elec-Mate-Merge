import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const SmartHomeModule3Section5LearningOutcomes = () => {
  const outcomes = [
    "Define grouping and explain why it's used in smart lighting",
    "Describe how linking lighting with other systems improves functionality",
    "Explain motion-based logic and its benefits",
    "Recognise potential issues with grouping and automation",
    "Create example setups that combine grouping, linking, and motion logic"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground">
        <p className="mb-4 text-foreground">By the end of this section, learners will be able to:</p>
        <ul className="space-y-3">
          {outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">{outcome}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};