import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const BS7671Module7Section2LearningOutcomes = () => {
  const outcomes = [
    "Identify the four charging modes and their respective power levels and safety requirements",
    "Apply appropriate supply arrangements and earthing systems for EV charging installations",
    "Explain PME considerations and PEN conductor protection measures for EV charging",
    "Select correct RCD types and ratings for different charging modes and applications",
    "Determine SPD requirements and installation positions for EV charging circuits",
    "Assess cable selection criteria including current-carrying capacity and temperature ratings",
    "Apply smart charging and load management system requirements"
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
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};