import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const SmartHomeSection3LearningOutcomes = () => {
  const outcomes = [
    "Define and differentiate between sensors, actuators, and controllers",
    "Identify common types of sensors used in smart homes",
    "Explain how actuators translate digital commands into physical actions",
    "Describe how controllers coordinate devices in automation systems",
    "Recognise integration challenges and future trends in smart home components"
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