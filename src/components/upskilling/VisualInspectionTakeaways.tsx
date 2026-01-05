
import { CheckCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const VisualInspectionTakeaways = () => {
  const takeaways = [
    "Visual inspection is mandatory before testing",
    "It prevents energising unsafe systems",
    "You're checking for signs of damage, poor installation, or regulation breaches",
    "Always document your findings clearly—whether compliant or not"
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
