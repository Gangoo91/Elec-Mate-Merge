import { Target } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TopologiesLearningOutcomes = () => {
  const outcomes = [
    "Define network topology and explain its importance in cabling design",
    "Compare and contrast star, bus, ring, and mesh topologies",
    "Identify the advantages and disadvantages of each topology type", 
    "Understand how topology affects network performance and reliability",
    "Recognise when to use specific topologies in different scenarios",
    "Explain hybrid topologies and their practical applications"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Target className="h-5 w-5 text-elec-yellow" />
          Learning Outcomes
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-gray-300 mb-4">
          By the end of this section, you will be able to:
        </p>
        <ul className="space-y-3">
          {outcomes.map((outcome, index) => (
            <li key={index} className="flex items-start gap-3 text-gray-300">
              <span className="w-6 h-6 bg-elec-yellow text-elec-dark rounded-full flex items-center justify-center text-sm font-semibold mt-0.5 flex-shrink-0">
                {index + 1}
              </span>
              <span className="leading-relaxed">{outcome}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};