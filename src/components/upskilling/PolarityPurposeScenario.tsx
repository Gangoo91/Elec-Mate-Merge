import { AlertTriangle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const PolarityPurposeScenario = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          On-the-Job Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-red-200 font-medium mb-2">The Scenario</h3>
              <p className="text-foreground text-sm leading-relaxed mb-3">
                An electrician wires a new lighting circuit in a home office. Eager to demonstrate the 
                installation works, they skip the polarity test and energise the circuit immediately. 
                The lights operate normally when switched on and off.
              </p>
              <p className="text-foreground text-sm leading-relaxed mb-3">
                Three weeks later, the homeowner changes a bulb. Despite switching off the light, they 
                receive an electric shock when touching the metal screw thread of the lampholder.
              </p>
              <h4 className="text-red-200 font-medium mb-2">What Went Wrong?</h4>
              <p className="text-foreground text-sm leading-relaxed">
                The switch was incorrectly wired to break the neutral conductor instead of the line. 
                When 'switched off', the circuit remained live at 230V, making the lampholder screw 
                thread dangerous to touch.
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <h3 className="text-green-200 font-medium mb-3">How Polarity Testing Prevents This</h3>
          <ul className="space-y-2 text-foreground text-sm">
            <li>• Polarity testing would have identified the reversed connection</li>
            <li>• The fault would have been corrected before energisation</li>
            <li>• The homeowner would have been protected from shock</li>
            <li>• Compliance with BS 7671 would have been maintained</li>
            <li>• Legal liability would have been avoided</li>
          </ul>
        </div>

        <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
          <h3 className="text-yellow-200 font-medium mb-3">Key Learning Points</h3>
          <ul className="space-y-2 text-foreground text-sm">
            <li>• Never assume wiring is correct, even if it 'works'</li>
            <li>• Polarity testing is mandatory, not optional</li>
            <li>• The consequences of incorrect polarity can be fatal</li>
            <li>• Professional reputation and legal compliance depend on proper testing</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};