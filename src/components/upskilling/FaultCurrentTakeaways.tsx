import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const FaultCurrentTakeaways = () => {
  const takeaways = [
    {
      title: "PSC and PEFC show max current during a fault",
      description: "These values represent worst-case scenarios that protective devices must handle safely"
    },
    {
      title: "Must be tested at supply origin and DBs",
      description: "Test at points where protective devices are installed to verify their suitability"
    },
    {
      title: "Values must be within MCB breaking capacity",
      description: "Fault current must not exceed device ratings—typically 6kA or 10kA for domestic installations"
    },
    {
      title: "Usually performed automatically during loop testing",
      description: "Modern testers calculate and display prospective fault current during Zs measurements"
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
              <p className="text-foreground ml-8">{takeaway.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-elec-yellow/10 p-4 rounded-md border border-elec-yellow/30">
          <p className="text-elec-yellow font-semibold mb-2">Safety First:</p>
          <p className="text-foreground">
            Never assume protective device ratings are adequate. Always verify that fault current levels are within device capabilities. The consequences of inadequate breaking capacity can be catastrophic.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};