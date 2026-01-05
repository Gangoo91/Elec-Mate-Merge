import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target, CheckCircle } from 'lucide-react';

export const BS7671Module7Section1LearningOutcomes = () => {
  const outcomes = [
    "Define and identify the different zones in bathrooms and shower rooms according to BS 7671 Section 701",
    "Explain the specific requirements for swimming pools and fountain installations under Section 702", 
    "Apply appropriate IP ratings for equipment installed in wet locations",
    "Determine correct RCD protection requirements for each zone classification",
    "Assess suitable cable types and installation methods for wet environments",
    "Identify prohibited equipment and restricted areas within each zone"
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
        <p className="mb-4">By the end of this section, learners will be able to:</p>
        <ul className="space-y-3">
          {outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span>{outcome}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};