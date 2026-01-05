import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const BMSModule5Section5LearningOutcomes = () => {
  const outcomes = [
    "Explain what a gateway is and why it is needed in BMS",
    "Describe how gateways enable interoperability between BACnet, Modbus, and KNX",
    "Identify common gateway applications in building systems",
    "Apply practical installation and documentation methods for gateways"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground mb-4">
          By the end of this section, you should be able to:
        </p>
        <div className="space-y-3">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">{outcome}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};