
import { CheckCircle, ClipboardCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ReadinessTakeaways = () => {
  const takeaways = [
    "Readiness for testing isn't just a formality—it's a safety-critical step",
    "Confirm all prior inspections and checks are complete",
    "Never test with unidentified circuits, live feeds, or connected sensitive equipment",
    "If something doesn't feel right—stop and recheck"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
          Key Takeaways
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {takeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-foreground">{takeaway}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
