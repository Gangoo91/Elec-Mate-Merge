import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

export const EmergencyLightingModule5Section5LearningOutcomes = () => {
  const outcomes = [
    "Explain the purpose and legal significance of emergency lighting certification",
    "Identify the required certificates under BS 5266 and BS 7671",
    "Complete and verify commissioning checklists accurately",
    "Understand the relationship between testing, certification, and handover documentation",
    "Ensure compliance documentation is ready for client and fire authority review"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-foreground text-sm sm:text-base lg:text-lg">
          By completing this section, you will be able to:
        </p>
        <div className="space-y-3">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex items-start gap-3">
              <div className="w-7 h-7 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold flex-shrink-0 text-sm">
                {index + 1}
              </div>
              <span className="text-foreground text-sm sm:text-base lg:text-lg flex-1">{outcome}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
