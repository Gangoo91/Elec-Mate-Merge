
import { CheckCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CommonDefectsTakeaways = () => {
  const takeaways = [
    "Always inspect terminals, cabling, DBs, and isolation points",
    "Visual defects often indicate deeper issues—don't ignore them",
    "Labelling, bonding, IP ratings, and cable protection are non-negotiables",
    "Failing to catch a visual defect could make you legally liable"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <FileText className="h-5 w-5 text-elec-yellow" />
          Key Takeaways
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <ul className="space-y-3">
          {takeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-gray-300">{takeaway}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
