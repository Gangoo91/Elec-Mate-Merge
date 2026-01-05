
import { Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ProtectiveConductorTakeaways = () => {
  const takeaways = [
    {
      title: "CPC continuity ensures life-saving disconnection can occur in a fault",
      description: "Without proper CPC continuity, protective devices cannot operate correctly during fault conditions."
    },
    {
      title: "Use a low-resistance setting, and zero the leads",
      description: "Always zero your test leads before taking measurements to avoid false readings caused by lead resistance."
    },
    {
      title: "Acceptable resistance is low—record actual readings, don't estimate",
      description: "Document exact resistance values (typically below 1Ω) rather than just ticking boxes or estimating."
    },
    {
      title: "Bonding conductors must also be tested and documented",
      description: "Main and supplementary bonding conductors require the same rigorous continuity testing as CPCs."
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
        <div className="space-y-4 sm:space-y-6">
          {takeaways.map((takeaway, index) => (
            <div key={index} className="bg-[#323232] rounded-lg p-4 sm:p-5 border-l-4 border-elec-yellow/50">
              <h4 className="text-foreground font-medium mb-2 text-sm sm:text-base">{takeaway.title}</h4>
              <p className="text-foreground text-xs sm:text-sm leading-relaxed">{takeaway.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-6 bg-green-600/10 border border-green-600/20 rounded-lg p-4 sm:p-5">
          <p className="text-foreground text-xs sm:text-sm leading-relaxed">
            <strong>Remember:</strong> CPC continuity testing is not just a regulatory requirement—it's a 
            critical safety verification that ensures protective measures work when needed most.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
