import { CheckCircle2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const PolarityMethodsTakeaways = () => {
  const takeaways = [
    "Polarity must be tested before energising using continuity (dead) testing methods",
    "Always confirm switches and protective devices are wired on the line conductor",
    "Sockets and accessories must be checked for correct terminal connections",
    "Use the distribution board outgoing terminals as reference points for testing",
    "Never assume wiring is correct - always verify through proper testing procedures"
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