import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Award, Zap, Shield, Users } from 'lucide-react';

export const BenefitsOfGroupingLinkingMotionSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Award className="h-6 w-6 text-elec-yellow" />
          Benefits of Grouping, Linking, and Motion
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground">
          Combining grouping, system linking, and motion logic creates comprehensive automation that delivers 
          tangible benefits across multiple aspects of home management and daily living.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Convenience</h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• One command controls multiple lights</li>
              <li>• Automatic operation reduces manual switching</li>
              <li>• Voice and app control from anywhere</li>
              <li>• Simplified daily routines and habits</li>
            </ul>
          </div>

          <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Energy Efficiency</h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Lights only used when needed</li>
              <li>• Automatic switch-off prevents waste</li>
              <li>• Coordinated dimming for optimal use</li>
              <li>• Reduced energy bills over time</li>
            </ul>
          </div>

          <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Security</h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Deterrence through automated responses</li>
              <li>• Immediate perimeter lighting activation</li>
              <li>• Occupancy simulation when away</li>
              <li>• Integration with alarm systems</li>
            </ul>
          </div>

          <div className="bg-elec-gray p-4 rounded-lg border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Users className="h-5 w-5 text-elec-yellow" />
              <h4 className="text-foreground font-semibold">Accessibility</h4>
            </div>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Tailored control for elderly users</li>
              <li>• Voice control for mobility limitations</li>
              <li>• Visual alerts for hearing impairment</li>
              <li>• Automatic pathway lighting for safety</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-gray p-5 rounded-lg border border-gray-600">
          <h4 className="text-foreground font-semibold mb-3">Real-World Impact Examples</h4>
          <div className="grid gap-3 md:grid-cols-2">
            <div>
              <h5 className="text-gray-300 font-semibold text-sm mb-2">Energy Savings</h5>
              <p className="text-gray-300 text-xs">Motion sensors in offices can reduce lighting energy consumption by 30-50% compared to manual switching.</p>
            </div>
            <div>
              <h5 className="text-gray-300 font-semibold text-sm mb-2">Security Enhancement</h5>
              <p className="text-gray-300 text-xs">Automated security lighting can reduce break-in attempts by creating the impression of occupancy.</p>
            </div>
            <div>
              <h5 className="text-gray-300 font-semibold text-sm mb-2">Daily Convenience</h5>
              <p className="text-gray-300 text-xs">Grouping allows "goodnight" scenes that turn off all lights except essential pathway lighting.</p>
            </div>
            <div>
              <h5 className="text-gray-300 font-semibold text-sm mb-2">Accessibility Support</h5>
              <p className="text-gray-300 text-xs">Motion-activated corridor lighting prevents falls for elderly residents during night-time movement.</p>
            </div>
          </div>
        </div>

        <div className="bg-green-900/20 border border-green-600/50 p-4 rounded-lg">
          <p className="text-green-200 text-sm">
            <strong>Combined Effect:</strong> When grouping, linking, and motion logic work together, the benefits 
            multiply, creating a lighting system that anticipates needs and enhances quality of life.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};