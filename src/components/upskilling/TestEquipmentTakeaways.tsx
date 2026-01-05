import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export const TestEquipmentTakeaways = () => {
  const takeaways = [
    {
      title: "Always inspect and verify equipment before use",
      description: "Check calibration dates, lead condition, and test functionality on known sources"
    },
    {
      title: "Follow safe test methods and wear PPE where needed", 
      description: "Use appropriate personal protective equipment and maintain safe working practices"
    },
    {
      title: "GS38-compliant leads are mandatory",
      description: "Only use properly rated test leads with finger barriers and fused probes"
    },
    {
      title: "Use correct tester settings for each circuit type",
      description: "Select appropriate test modes, especially non-trip settings for RCD circuits"
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
          <p className="text-elec-yellow font-semibold mb-2">Remember:</p>
          <p className="text-foreground text-sm sm:text-base leading-relaxed">
            Your safety depends on using proper test equipment correctly. Never take shortcuts with safety equipment or procedures—no test result is worth risking your life.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};