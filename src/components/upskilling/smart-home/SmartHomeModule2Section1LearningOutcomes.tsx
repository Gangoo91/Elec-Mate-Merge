import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const SmartHomeModule2Section1LearningOutcomes = () => {
  const outcomes = [
    "Define what a communication protocol is in smart home systems",
    "Identify the most common wireless protocols used in smart homes",
    "Explain the differences in range, speed, and power consumption",
    "Recognise why protocols affect device compatibility",
    "Compare scenarios where different protocols are best applied",
    "Understand the role of mesh networking in smart home systems",
    "Evaluate the benefits and limitations of each protocol type"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300">
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