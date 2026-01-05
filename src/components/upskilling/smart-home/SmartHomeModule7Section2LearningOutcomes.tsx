import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

const SmartHomeModule7Section2LearningOutcomes = () => {
  const outcomes = [
    "Explain what commissioning means in smart home installations",
    "Describe the steps involved in pairing devices to hubs and apps", 
    "Test and verify device operation after setup",
    "Recognise common pairing issues and how to resolve them",
    "Document installation details for client handover",
    "Train clients on basic system operation and troubleshooting"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-6 w-6 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground">
        <p className="mb-4 text-gray-300">By the end of this section, you should be able to:</p>
        <ul className="space-y-3">
          {outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">{outcome}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section2LearningOutcomes;