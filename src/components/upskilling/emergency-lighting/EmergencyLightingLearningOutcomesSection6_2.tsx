import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle2 } from 'lucide-react';

export const EmergencyLightingLearningOutcomesSection6_2 = () => {
  const outcomes = [
    "Explain how emergency lighting fits within UK fire safety legislation and regulatory frameworks",
    "Identify the legal duties of the Responsible Person under the Regulatory Reform (Fire Safety) Order 2005",
    "Describe how emergency lighting interacts with fire alarm and detection systems",
    "Apply BS 5266 requirements in line with fire risk assessments and building evacuation strategies",
    "Recognise enforcement powers of fire authorities and the implications of non-compliance",
    "Understand documentation requirements for demonstrating integrated compliance",
    "Identify critical integration points between emergency lighting and other life-safety systems"
  ];

  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-foreground mb-4">By completing this section, you will be able to:</p>
        <ul className="space-y-3">
          {outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-3 text-foreground">
              <CheckCircle2 className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
