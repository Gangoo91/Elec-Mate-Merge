import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const EmergencyLightingLearningOutcomesSection3_1 = () => {
  const outcomes = [
    "State the minimum lux levels for different types of emergency lighting (escape routes, anti-panic areas, high-risk task areas)",
    "Explain the required operating durations and where longer times are necessary",
    "Apply lux and duration requirements to real design scenarios",
    "Recognise the impact of poor lighting levels or insufficient duration on occupant safety",
    "Ensure compliance with BS 5266 during system design and installation"
  ];

  return (
    <Card className="bg-slate-200/20 border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-6 w-6 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p className="text-lg text-foreground leading-relaxed">
          By completing this section, you will be able to:
        </p>
        
        <div className="space-y-3">
          {outcomes.map((outcome, index) => (
            <div key={index} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">{outcome}</span>
            </div>
          ))}
        </div>

        <div className="bg-elec-dark/40 p-4 rounded-lg border border-gray-600 mt-6">
          <h4 className="text-elec-yellow font-semibold mb-2">Assessment Focus</h4>
          <p className="text-sm text-foreground">
            This section forms a critical foundation for emergency lighting design. You'll be tested on 
            your ability to apply specific lux and duration requirements to practical scenarios, 
            demonstrating both technical knowledge and safety awareness.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};