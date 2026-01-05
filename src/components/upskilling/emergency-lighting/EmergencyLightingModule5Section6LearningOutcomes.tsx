import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const EmergencyLightingModule5Section6LearningOutcomes = () => {
  const outcomes = [
    "Explain the purpose and importance of a structured client handover",
    "Identify all documentation and records to be provided at handover",
    "Demonstrate system operation and testing procedures to the client",
    "Train the client or Responsible Person in inspection, testing, and logbook maintenance",
    "Understand legal responsibilities transferred to the client after handover"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p className="text-sm sm:text-base lg:text-lg">By completing this section, you will be able to:</p>
        
        <div className="space-y-3">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex items-start gap-4">
              <Badge className="w-7 h-7 rounded-full flex items-center justify-center bg-elec-yellow text-elec-dark flex-shrink-0 text-sm font-bold">
                {index + 1}
              </Badge>
              <p className="text-sm sm:text-base lg:text-lg pt-0.5">{outcome}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
