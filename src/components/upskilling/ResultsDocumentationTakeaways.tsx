import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ResultsDocumentationTakeaways = () => {
  const takeaways = [
    {
      title: "Record test values accurately—not general terms",
      description: "Always write actual numerical results with units, never subjective terms like 'OK' or 'Pass'"
    },
    {
      title: "Compare against BS7671 and manufacturer specs",
      description: "Check all results against applicable standards and device ratings before certification"
    },
    {
      title: "Document limitations and any test method variations",
      description: "Note any constraints or non-standard testing methods used during the inspection"
    },
    {
      title: "Do not issue certification if test results fall outside acceptable limits",
      description: "Never certify an installation that fails to meet safety requirements—investigate and correct first"
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Key Takeaways
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {takeaways.map((takeaway, index) => (
            <div key={index} className="bg-elec-dark p-4 rounded-md">
              <div className="flex items-start gap-3 mb-2">
                <Badge 
                  variant="secondary" 
                  className="bg-elec-yellow/20 text-elec-yellow text-xs mt-0.5"
                >
                  {index + 1}
                </Badge>
                <h4 className="text-elec-yellow font-semibold">{takeaway.title}</h4>
              </div>
              <p className="text-foreground ml-8 text-sm sm:text-base">{takeaway.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-elec-yellow/10 p-4 rounded-md border border-elec-yellow/30">
          <p className="text-elec-yellow font-semibold mb-2">Professional Responsibility:</p>
          <p className="text-foreground text-sm sm:text-base leading-relaxed">
            Accurate documentation is not just a regulatory requirement—it's your professional duty to ensure safety and protect yourself legally. Your signature on a certificate carries significant legal weight.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};