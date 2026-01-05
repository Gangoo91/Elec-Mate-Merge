import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const CableShieldingTakeaways = () => {
  const takeaways = [
    {
      title: "Choose Cable Type Based on Environment",
      description: "UTP for clean environments, FTP for moderate EMI, STP for high-interference industrial settings."
    },
    {
      title: "Grounding is Critical for Shielded Cables",
      description: "Improperly grounded shielded cables perform worse than UTP. Single-point grounding and 360° termination are essential."
    },
    {
      title: "Cost vs Benefit Analysis Matters",
      description: "Don't pay for shielding you don't need. Assess EMI levels first, then select appropriate cable type."
    },
    {
      title: "Installation Complexity Increases with Shielding", 
      description: "STP requires specialist knowledge. Poor shielded installation is worse than good UTP installation."
    },
    {
      title: "System-Wide Approach Required",
      description: "All components must match - cables, connectors, patch panels. Mixing shielded and unshielded negates benefits."
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
        <div className="grid gap-4">
          {takeaways.map((takeaway, index) => (
            <div key={index} className="rounded-md border bg-background p-4">
              <h3 className="font-semibold">{takeaway.title}</h3>
              <p className="text-muted-foreground">{takeaway.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 rounded-md border bg-background p-4">
          <h3 className="font-semibold">Remember</h3>
          <p className="text-sm text-muted-foreground">
            Cable shielding is about matching the solution to the environment. Assess EMI levels, 
            understand grounding requirements, and ensure proper installation. The right cable 
            type properly installed will provide years of reliable service.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};