
import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const TestProceduresTakeaways = () => {
  const takeaways = [
    {
      title: "Use low-resistance settings and null leads for all continuity tests",
      description: "Proper equipment setup is essential for accurate readings. Lead resistance must be removed from measurements."
    },
    {
      title: "Record actual values—not estimates",
      description: "Document precise readings for proper assessment and future reference. Estimates or tick marks are not acceptable."
    },
    {
      title: "Compare against cable length and expected resistance",
      description: "Readings should make sense for the circuit length and conductor size. Unexpectedly high values require investigation."
    },
    {
      title: "Abnormal values indicate real risks—stop and resolve before proceeding",
      description: "Don't continue with further testing if continuity values are outside expected ranges. Safety depends on proper continuity."
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
            <strong>Remember:</strong> Proper test procedures and accurate recording are fundamental 
            to electrical safety. Taking shortcuts or accepting questionable readings can have 
            serious consequences for both installer and end user.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
