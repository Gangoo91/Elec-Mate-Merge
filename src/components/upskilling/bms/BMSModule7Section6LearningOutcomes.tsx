import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

const BMSModule7Section6LearningOutcomes = () => {
  const outcomes = [
    "Explain the purpose of a structured client handover",
    "Identify the documentation required at handover",
    "Recognise the electrician's responsibilities in preparing as-built records",
    "Apply best practices for client training and support",
    "Understand warranty obligations and aftercare procedures",
    "Create comprehensive handover documentation packages",
    "Demonstrate proper training techniques for building operators",
    "Establish professional client relationships through quality handover"
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

export { BMSModule7Section6LearningOutcomes };