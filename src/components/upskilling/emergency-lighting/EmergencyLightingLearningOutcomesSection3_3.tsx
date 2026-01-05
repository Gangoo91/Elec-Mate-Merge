import { Target, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingLearningOutcomesSection3_3 = () => {
  const outcomes = [
    "Explain how mounting height affects light distribution and lux levels",
    "Identify common photometric terms and data relevant to emergency lighting design",
    "Use manufacturer spacing tables and polar diagrams for correct placement",
    "Recognise the risks of poor installation height or beam selection",
    "Apply photometric principles to real-world emergency lighting installations"
  ];

  return (
    <Card className="bg-gradient-to-br from-blue-600/20 to-blue-800/10 border border-blue-500/40 shadow-lg">
      <CardHeader>
        <CardTitle className="text-blue-300 flex items-center gap-2">
          <Target className="h-5 w-5 text-blue-400 drop-shadow-md" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-blue-200 mb-4">By completing this section, you will be able to:</p>
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