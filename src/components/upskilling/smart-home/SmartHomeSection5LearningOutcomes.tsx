import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const SmartHomeSection5LearningOutcomes = () => {
  const outcomes = [
    "Explain the difference between retrofit and new build smart home systems",
    "Identify the challenges of installing smart technology in existing homes",
    "Recognise the advantages of integrating smart systems at the design/build stage",
    "Compare costs, disruption, and scalability between retrofit and new build",
    "Advise clients on the best approach based on property type and user needs",
    "Evaluate practical examples of both installation approaches",
    "Understand future-proofing strategies for both contexts"
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