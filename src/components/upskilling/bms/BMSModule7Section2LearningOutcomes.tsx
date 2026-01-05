import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const BMSModule7Section2LearningOutcomes = () => {
  const outcomes = [
    "Explain what function blocks are and how they're used in BMS programming",
    "Describe how Boolean logic creates decision-making in BMS",
    "Understand the basics of PID control loops and where they're applied",
    "Recognise the electrician's role in verifying programmed functions during commissioning"
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
        <p className="mb-4">By the end of this section, you should be able to:</p>
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