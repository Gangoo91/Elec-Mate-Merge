
import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const InsulationTestMethodsTakeaways = () => {
  const takeaways = [
    {
      title: "Use 500 V DC as standard test voltage unless limited by equipment",
      description: "This voltage is appropriate for most domestic and commercial installations up to 500V. Only use lower voltages when equipment limitations require it."
    },
    {
      title: "Test L–N, L–E, and N–E separately unless valid reason exists to combine",
      description: "Individual testing provides more detailed information about insulation condition. Combined testing is only acceptable when loads cannot be disconnected."
    },
    {
      title: "Readings must meet or exceed 1 MΩ",
      description: "This is the minimum acceptable value per BS7671. Higher readings indicate better insulation condition and provide greater safety margins."
    },
    {
      title: "Always document test conditions, values, and any limitations or variations",
      description: "Proper documentation is essential for compliance and future reference. Record actual values, not just pass/fail results."
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
            <strong>Remember:</strong> Proper IR testing methodology is crucial for electrical safety. 
            Follow the standard procedures, document everything properly, and never compromise on safety 
            by accepting sub-standard results.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
