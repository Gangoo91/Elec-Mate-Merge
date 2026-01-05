
import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const RingFinalTakeaways = () => {
  const takeaways = [
    {
      title: "Ring continuity must be tested on line, neutral, and CPC",
      description: "All three conductors must form complete loops for the circuit to operate safely and correctly."
    },
    {
      title: "Use cross-connections to confirm proper wiring and consistent resistance",
      description: "Cross-connection testing reveals wiring faults that end-to-end testing alone cannot detect."
    },
    {
      title: "Compare readings across all sockets—look for symmetry",
      description: "Consistent readings across outlets indicate correct wiring. Variations suggest faults requiring investigation."
    },
    {
      title: "Any irregularities must be resolved before proceeding with other tests",
      description: "Never continue testing or energise a circuit with continuity faults - resolve all issues first."
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
            <strong>Remember:</strong> Ring final circuit continuity testing is a critical safety verification 
            that ensures the circuit can handle design loads safely and that protective devices will operate 
            correctly during fault conditions.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
