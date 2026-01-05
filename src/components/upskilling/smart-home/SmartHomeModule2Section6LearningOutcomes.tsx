import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const SmartHomeModule2Section6LearningOutcomes = () => {
  const outcomes = [
    "Define compatibility in the context of smart home ecosystems",
    "Explain what a bridge is and why it's used",
    "Identify common bridges used in the market",
    "Apply compatibility mapping when designing smart home systems",
    "Troubleshoot common integration issues"
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
        <p className="mb-4">By the end of this section, learners will be able to:</p>
        <ul className="space-y-3">
          {outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};