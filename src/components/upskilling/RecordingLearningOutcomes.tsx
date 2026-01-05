
import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RecordingLearningOutcomes = () => {
  const outcomes = [
    "Record visual inspection findings in the appropriate certificates or reports",
    "Understand the importance of clarity, accuracy, and honesty in documentation", 
    "Know how to handle non-compliances and limitations during visual inspection",
    "Apply correct observation codes and classification systems",
    "Ensure documentation meets legal and professional standards"
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
