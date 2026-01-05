import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle } from 'lucide-react';

export const BMSModule7Section5Summary = () => {
  const keyPoints = [
    "Pre-functional commissioning verifies power, wiring, I/O signals, and safety interlocks",
    "Functional commissioning tests full sequences, alarms, and integrated system behaviour",
    "Electricians play a key role in supporting engineers, correcting wiring, and verifying signals",
    "Proper commissioning ensures safe, efficient building operation and avoids long-term issues"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground">
        <p className="mb-4">Key points from this section:</p>
        <ul className="space-y-3">
          {keyPoints.map((point, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};