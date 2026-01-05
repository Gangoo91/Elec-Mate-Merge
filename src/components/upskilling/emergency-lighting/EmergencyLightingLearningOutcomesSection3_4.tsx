import { Target, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingLearningOutcomesSection3_4 = () => {
  const outcomes = [
    "Explain why risk assessment is essential in emergency lighting design",
    "Identify building-specific risks that influence lighting requirements",
    "Adjust lux levels, durations, or luminaire placement based on assessed risks",
    "Recognise when higher safety margins are needed beyond the minimum standards",
    "Apply BS 5266 principles in a risk-based design context"
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