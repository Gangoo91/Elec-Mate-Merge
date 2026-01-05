import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const PolarityPurposeTakeaways = () => {
  const takeaways = [
    "Polarity testing is a mandatory safety requirement, not an optional check",
    "Incorrect polarity can be fatal - circuits may remain live when switched off",
    "All single-pole devices must be connected to the line conductor",
    "The test must be completed before any circuit is energised",
    "Professional liability and legal compliance depend on proper polarity verification"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <CheckCircle2 className="h-5 w-5 text-elec-yellow" />
          Key Takeaways
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {takeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start gap-3">
              <div className="w-2 h-2 bg-elec-yellow rounded-full mt-2 flex-shrink-0"></div>
              <p className="text-foreground leading-relaxed">{takeaway}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};