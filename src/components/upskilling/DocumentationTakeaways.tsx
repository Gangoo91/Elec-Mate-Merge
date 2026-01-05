
import { CheckCircle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const DocumentationTakeaways = () => {
  const takeaways = [
    "Proper documentation is essential for effective visual inspection",
    "Missing documents significantly increase inspection time and cost",
    "BS 7671 requires specific documentation to be available",
    "Document storage and management systems prevent future problems"
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
        <ul className="space-y-4">
          {takeaways.map((takeaway, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <span className="text-foreground text-base sm:text-lg leading-relaxed">{takeaway}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};
