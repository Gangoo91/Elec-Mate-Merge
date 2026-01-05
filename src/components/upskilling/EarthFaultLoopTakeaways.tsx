import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const EarthFaultLoopTakeaways = () => {
  const takeaways = [
    {
      title: "Zs = total earth loop impedance",
      description: "Includes both external impedance (Ze) and circuit conductor resistance (R1 + R2)"
    },
    {
      title: "It ensures fault current can trip protective devices fast enough",
      description: "Must allow automatic disconnection within required time limits for safety"
    },
    {
      title: "Always test at the furthest point",
      description: "This gives the worst-case scenario and ensures protection throughout the circuit"
    },
    {
      title: "Compare measured Zs to BS7671 maximums",
      description: "Use Appendix 3 tables to verify compliance with regulatory requirements"
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
        <div className="space-y-3 sm:space-y-4">
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
              <p className="text-foreground ml-6 sm:ml-8 text-sm sm:text-base leading-relaxed">{takeaway.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-elec-yellow/10 p-4 rounded-md border border-elec-yellow/30">
          <p className="text-elec-yellow font-semibold mb-2">Remember:</p>
          <p className="text-foreground text-sm sm:text-base leading-relaxed">
            Earth fault loop impedance testing is one of the most critical safety tests in electrical installation work. It directly affects whether people will be protected from electric shock in fault conditions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};