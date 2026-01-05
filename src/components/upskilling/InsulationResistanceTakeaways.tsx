
import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const InsulationResistanceTakeaways = () => {
  const takeaways = [
    {
      title: "IR testing confirms the quality and integrity of cable insulation",
      description: "This test is fundamental to electrical safety—it reveals problems that could cause fire, shock, or equipment damage."
    },
    {
      title: "It must be done before energising and after continuity",
      description: "Follow the correct test sequence. Never energise circuits without confirming insulation integrity first."
    },
    {
      title: "Minimum readings are defined in BS7671—typically ≥1 MΩ",
      description: "Know the required values and don't accept readings below the minimum. Record actual values, not just pass/fail."
    },
    {
      title: "Never skip the test due to assumption or appearance",
      description: "Even new installations can have faults. Age, appearance, or reputation don't eliminate the need for proper testing."
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
            <div key={index} className="bg-[#323232] rounded-lg p-4 border-l-4 border-elec-yellow/50">
              <h4 className="text-foreground font-medium mb-2">{takeaway.title}</h4>
              <p className="text-foreground text-sm leading-relaxed">{takeaway.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <p className="text-foreground text-sm leading-relaxed">
            <strong>Remember:</strong> Insulation resistance testing is one of the most important 
            safety tests you'll perform. It protects both you and the end users from serious harm. 
            Take it seriously and do it properly every time.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
