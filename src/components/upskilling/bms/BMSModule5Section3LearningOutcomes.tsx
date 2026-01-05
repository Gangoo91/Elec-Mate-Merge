import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const BMSModule5Section3LearningOutcomes = () => {
  const outcomes = [
    "Explain what Modbus is and why it is still widely used",
    "Describe the differences between Modbus RTU (serial) and Modbus TCP/IP (Ethernet)",
    "Identify typical devices that use Modbus in a BMS",
    "Apply best-practice wiring and testing for reliable Modbus communication"
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