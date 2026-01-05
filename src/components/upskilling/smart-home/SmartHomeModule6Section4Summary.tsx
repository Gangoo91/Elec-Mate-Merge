import { Card, CardContent } from '@/components/ui/card';
import { CheckCircle, Link2, AlertTriangle, Zap, Users } from 'lucide-react';

const SmartHomeModule6Section4Summary = () => {
  const summaryPoints = [
    {
      icon: Link2,
      title: "Bridging connects old and new systems",
      description: "Hardware and software solutions enable legacy devices to work with modern platforms"
    },
    {
      icon: Zap,
      title: "Multiple bridging methods available", 
      description: "Hardware bridges, software integrations, protocol converters, and smart relays offer different solutions"
    },
    {
      icon: AlertTriangle,
      title: "Limitations must be considered",
      description: "Reduced functionality, additional failure points, and complexity trade-offs require careful evaluation"
    },
    {
      icon: Users,
      title: "Balance client needs with practicality",
      description: "Electricians should survey systems, set clear expectations, and recommend gradual upgrade paths"
    }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardContent className="p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-foreground">Summary</h2>
        </div>
        
        <div className="space-y-4">
          {summaryPoints.map((point, index) => (
            <div key={index} className="bg-elec-dark/50 border border-elec-yellow/20 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <point.icon className="h-5 w-5 text-elec-yellow mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-1">{point.title}</h3>
                  <p className="text-foreground text-sm leading-relaxed">{point.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg">
          <h3 className="text-lg font-semibold text-elec-yellow mb-2">Key Takeaway</h3>
          <p className="text-foreground text-sm leading-relaxed">
            Successful bridging requires thorough assessment of existing systems, clear understanding of available solutions, 
            honest communication about limitations, and strategic planning for future upgrades. The goal is extending system 
            life while providing modern convenience, not necessarily achieving full smart home capabilities immediately.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule6Section4Summary;