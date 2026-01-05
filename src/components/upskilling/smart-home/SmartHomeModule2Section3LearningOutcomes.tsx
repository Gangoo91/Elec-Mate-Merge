import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const SmartHomeModule2Section3LearningOutcomes = () => {
  const outcomes = [
    "Describe the role of Wi-Fi and Bluetooth in smart home devices",
    "Explain the strengths and weaknesses of Wi-Fi for smart home use",
    "Recognise where Bluetooth and BLE (Bluetooth Low Energy) are typically applied",
    "Define what Thread is and why it matters for IoT devices",
    "Explain how Matter aims to solve compatibility issues across ecosystems",
    "Compare modern protocols and select appropriate solutions for different scenarios"
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
        <p className="mb-4 text-foreground">By the end of this section, learners will be able to:</p>
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