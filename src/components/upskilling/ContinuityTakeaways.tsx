
import { Lightbulb, Shield, AlertTriangle, CheckCircle, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const ContinuityTakeaways = () => {
  const takeaways = [
    {
      icon: Shield,
      title: "Life Safety Verification",
      description: "Continuity testing confirms that protective conductors are properly connected and effective",
      details: "Without continuity, fault current cannot return to the source to operate protective devices, leaving metalwork dangerously live."
    },
    {
      icon: Zap,
      title: "Fault Path Integrity", 
      description: "A safe disconnection during a fault depends on a complete CPC path",
      details: "The entire protective system relies on continuous conductors to carry fault current back to the supply and trigger automatic disconnection."
    },
    {
      icon: CheckCircle,
      title: "Testing Sequence Critical",
      description: "Always test continuity before moving on to insulation or polarity checks",
      details: "If continuity fails, there's no point in further testing. The installation isn't safe and must be corrected before proceeding."
    },
    {
      icon: AlertTriangle,
      title: "Never Skip This Test",
      description: "This is a life safety test, not just a formality",
      details: "Time pressure, neat appearance, or previous good results are never valid reasons to skip continuity testing. Lives depend on it."
    }
  ];

  const criticalPoints = [
    "Continuity testing is mandatory after visual inspection and before all other tests",
    "Test all CPCs, main bonding, supplementary bonding, and ring circuit conductors",
    "A failed continuity test stops all further testing until corrected",
    "BS 7671 requires continuity verification for all new and altered circuits",
    "Visual inspection cannot confirm electrical continuity—testing is essential",
    "Document all continuity measurements clearly in your test certificates"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          Key Takeaways
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {takeaways.map((takeaway, index) => {
            const IconComponent = takeaway.icon;
            return (
              <div key={index} className="bg-[#323232] rounded-lg p-4 border-l-4 border-elec-yellow/50">
                <div className="flex items-start gap-3 mb-3">
                  <IconComponent className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                  <div>
                    <h3 className="text-foreground font-semibold mb-1">{takeaway.title}</h3>
                    <p className="text-elec-yellow text-sm font-medium">{takeaway.description}</p>
                  </div>
                </div>
                <p className="text-foreground text-xs sm:text-sm leading-relaxed">{takeaway.details}</p>
              </div>
            );
          })}
        </div>

        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-6">
          <h3 className="text-blue-200 font-semibold text-lg mb-4">Critical Points to Remember</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
              {criticalPoints.map((point, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 bg-blue-600 text-foreground rounded-full flex items-center justify-center text-xs font-bold mt-0.5 flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-foreground text-xs sm:text-sm leading-relaxed">{point}</p>
                </div>
              ))}
            </div>
        </div>

        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <h3 className="text-red-200 font-medium mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Remember: This Is About Lives, Not Just Compliance
          </h3>
          <p className="text-foreground text-sm sm:text-base leading-relaxed">
            Every continuity test you perform could be the difference between someone going home safely or 
            suffering a fatal electric shock. Protective conductors are the last line of defence when something 
            goes wrong. Never compromise on this fundamental safety verification.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
