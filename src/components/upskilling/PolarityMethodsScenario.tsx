import { AlertTriangle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const PolarityMethodsScenario = () => {
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
                You wire a lighting circuit, but skip polarity testing. After energising, the switch 
                works—but a user gets shocked changing a bulb. The switch was breaking the neutral, 
                not the line.
              </p>
              <h4 className="text-red-200 font-medium mb-2">The Investigation</h4>
              <p className="text-foreground text-sm leading-relaxed mb-3">
                Upon investigation, you discover that during the wiring process, the line and neutral 
                conductors were incorrectly identified. The switch was wired to interrupt the neutral 
                conductor instead of the line conductor.
              </p>
              <h4 className="text-red-200 font-medium mb-2">The Consequences</h4>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• User received electric shock from lampholder screw thread</li>
                <li>• Circuit remained live at 230V when 'switched off'</li>
                <li>• Serious safety breach and potential legal liability</li>
                <li>• Professional reputation damaged</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <h3 className="text-green-200 font-medium mb-3">How Proper Testing Prevents This</h3>
          <ul className="space-y-2 text-foreground text-sm">
            <li>• Polarity testing would have identified this. Never assume wiring is correct</li>
            <li>• Continuity test from DB line terminal to switch would show incorrect connection</li>
            <li>• Test would reveal switch was breaking neutral, not line</li>
            <li>• Fault would have been corrected before energisation</li>
            <li>• User safety would have been protected</li>
          </ul>
        </div>

        <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
          <h3 className="text-yellow-200 font-medium mb-3">Professional Lesson</h3>
          <p className="text-foreground text-sm leading-relaxed">
            This scenario demonstrates why polarity testing is non-negotiable. Even experienced 
            electricians can make wiring errors, and the consequences can be fatal. The test takes 
            minutes but prevents potentially deadly situations.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};