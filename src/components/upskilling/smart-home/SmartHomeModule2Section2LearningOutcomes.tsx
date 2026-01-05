import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const SmartHomeModule2Section2LearningOutcomes = () => {
  const outcomes = [
    "Define what mesh networking is and why it matters",
    "Compare Zigbee and Z-Wave in terms of frequency, range, and power use",
    "Identify common devices that use each protocol",
    "Recognise compatibility issues between brands and ecosystems",
    "Decide which protocol to recommend for different installation scenarios",
    "Understand the advantages and limitations of each mesh protocol",
    "Evaluate network capacity and device limitations for each protocol"
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