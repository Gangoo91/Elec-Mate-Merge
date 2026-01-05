import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle, XCircle, Shield } from 'lucide-react';

export const PolarityPurposeContent = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-foreground">
            <BookOpen className="h-5 w-5 text-elec-yellow" />
            Core Content
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">What is Polarity Testing?</h3>
            <p className="text-foreground leading-relaxed mb-4">
              Polarity testing verifies that line conductors are connected to the correct terminals at 
              all points in the installation. This ensures that switches, protective devices, and accessories 
              function as intended for safety.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle className="h-5 w-5 text-green-400" />
                <h4 className="text-green-200 font-medium">Correct Polarity</h4>
              </div>
              <ul className="space-y-2 text-foreground text-sm">
                <li>• Switch breaks the line conductor</li>
                <li>• Protective devices on line conductor</li>
                <li>• Socket terminals correctly wired</li>
                <li>• Lampholder centre contact is live</li>
              </ul>
            </div>

            <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <XCircle className="h-5 w-5 text-red-400" />
                <h4 className="text-red-200 font-medium">Incorrect Polarity</h4>
              </div>
              <ul className="space-y-2 text-foreground text-sm">
                <li>• Switch breaks neutral - circuit stays live</li>
                <li>• MCB on neutral - no protection</li>
                <li>• Reversed socket connections</li>
                <li>• Lampholder screw thread is live</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Regulatory Requirements</h3>
            <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Shield className="h-5 w-5 text-blue-400" />
                <h4 className="text-blue-200 font-medium">BS 7671 Requirements</h4>
              </div>
              <ul className="space-y-2 text-foreground text-sm">
                <li>• Section 612.6: Polarity testing requirements</li>
                <li>• All single-pole devices must be on line conductor</li>
                <li>• Edison screw lampholders centre contact must be line</li>
                <li>• Socket outlets must have correct terminal identification</li>
                <li>• Testing must be done before initial energisation</li>
              </ul>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-foreground mb-3">Critical Safety Points</h3>
            <p className="text-foreground leading-relaxed mb-3">
              When polarity is incorrect, several dangerous situations can occur:
            </p>
            <ul className="space-y-2 text-foreground">
              <li><strong>Live When Switched Off:</strong> If a switch is wired in the neutral, the circuit remains live even when the switch is off</li>
              <li><strong>Shock Risk at Accessories:</strong> Incorrect connections can make normally safe parts become live</li>
              <li><strong>Protection Failure:</strong> MCBs and RCDs on the wrong conductor may not provide proper protection</li>
              <li><strong>Equipment Damage:</strong> Some equipment relies on correct polarity for safe operation</li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};