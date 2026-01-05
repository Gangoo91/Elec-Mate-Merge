import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const ZsTestingTakeaways = () => {
  const takeaways = [
    {
      title: "Zs testing confirms protective disconnection performance",
      description: "Verifies that protective devices will operate within required time limits during earth faults"
    },
    {
      title: "Must be done on live circuits with safety precautions",
      description: "Requires energised circuits for accurate measurement but demands strict safety protocols"
    },
    {
      title: "Test at remote ends of each circuit",
      description: "The furthest point gives worst-case impedance values—critical for safety verification"
    },
    {
      title: "Use non-trip mode if RCDs are present",
      description: "Prevents unwanted disconnection during testing while maintaining measurement accuracy"
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
          <p className="text-elec-yellow font-semibold mb-2">Professional Tip:</p>
          <p className="text-foreground text-sm sm:text-base leading-relaxed">
            Create a systematic testing plan before starting. Mark test points on your circuit diagrams and always work methodically from distribution board to circuit extremities. This ensures no critical test points are missed.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};