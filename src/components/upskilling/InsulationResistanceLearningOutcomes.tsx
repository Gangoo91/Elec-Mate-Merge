
import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const InsulationResistanceLearningOutcomes = () => {
  const outcomes = [
    "Understand the purpose of insulation resistance testing",
    "Explain what insulation resistance readings reveal about circuit condition",
    "Recognise when and why this test is essential under BS7671",
    "Know the minimum acceptable values for different system voltages",
    "Identify common faults detected by insulation resistance testing"
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
        <ul className="space-y-3">
          {outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-3 text-foreground">
              <span className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                {index + 1}
              </span>
              <span className="leading-relaxed">{outcome}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
