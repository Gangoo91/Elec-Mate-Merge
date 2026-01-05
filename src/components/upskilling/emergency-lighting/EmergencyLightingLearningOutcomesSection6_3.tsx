import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const EmergencyLightingLearningOutcomesSection6_3 = () => {
  const outcomes = [
    "Explain the relationship between the fire risk assessment and emergency lighting design",
    "Identify the risk factors that influence system requirements",
    "Apply BS 5266-1 principles to adapt design according to building use, occupancy, and hazards",
    "Interpret how different risk categories (low, medium, high) affect lighting duration and coverage",
    "Recognise when a reassessment is required following alterations or occupancy changes"
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
