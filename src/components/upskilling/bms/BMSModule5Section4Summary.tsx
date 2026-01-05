import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle } from 'lucide-react';

export const BMSModule5Section4Summary = () => {
  const summaryPoints = [
    "KNX is a distributed, vendor-neutral bus system designed specifically for building automation",
    "Bus topology supports up to 64 devices per line, with couplers enabling system expansion",
    "Devices include sensors (switches, detectors), actuators (dimmers, controllers), and system components (couplers, gateways)",
    "Correct wiring practices are critical: proper polarity, no loops, certified cables and power supplies",
    "Electricians play a key role in installation quality, even though programming is handled by specialists",
    "System stability and performance depend heavily on proper topology and installation techniques"
  ];

  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Section Summary
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-foreground">
            This section covered the fundamentals of KNX systems from an electrical installation perspective:
          </p>
          
          <div className="space-y-3">
            {summaryPoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                <span className="text-foreground text-sm">{point}</span>
              </div>
            ))}
          </div>

          <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-lg p-4 mt-6">
            <h4 className="text-foreground font-semibold mb-2">Key Takeaway for Electricians</h4>
            <p className="text-foreground text-sm">
              While KNX programming requires specialist knowledge, the foundation of any successful KNX system 
              is proper electrical installation. Understanding topology rules, device requirements, and 
              troubleshooting techniques ensures reliable system operation and reduces commissioning time.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};