import { MapPin, AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingRealWorldSection3_4 = () => {
  return (
    <Card className="bg-slate-200/20 border-slate-600 shadow-lg">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow drop-shadow-md" />
          Real-World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="p-4 bg-gradient-to-br from-red-600/20 to-red-800/10 border border-red-500/40 rounded-lg">
          <h4 className="text-red-300 font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            The Challenge: Residential Care Home in Bristol
          </h4>
          <p className="text-foreground mb-3">
            A residential care home in Bristol initially had standard 1 lux escape route lighting installed throughout the building, meeting the basic BS 5266 requirements. However, this generic approach failed to consider the specific needs of the vulnerable residents.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-red-700/20 rounded border border-red-500/40">
              <h5 className="text-red-200 font-medium mb-2">Initial Installation Issues:</h5>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Standard 1 lux lighting in all corridors</li>
                <li>• 1-hour battery duration system</li>
                <li>• Basic luminaire placement following generic rules</li>
                <li>• No consideration of resident profiles</li>
              </ul>
            </div>
            
            <div className="p-3 bg-red-700/20 rounded border border-red-500/40">
              <h5 className="text-red-200 font-medium mb-2">Problems Identified:</h5>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Many residents had reduced eyesight</li>
                <li>• Mobility issues meant slower evacuation</li>
                <li>• Confusion and disorientation in dim lighting</li>
                <li>• Insufficient time for assisted evacuation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-blue-600/20 to-blue-800/10 border border-blue-500/40 rounded-lg">
          <h4 className="text-blue-300 font-semibold mb-3 flex items-center gap-2">
            <Lightbulb className="h-4 w-4 text-blue-400" />
            Risk Assessment Findings
          </h4>
          <p className="text-foreground mb-3">
            During inspection, the Fire Risk Assessment highlighted specific vulnerabilities that the generic lighting design had not addressed.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-blue-700/20 rounded border border-blue-500/40">
              <h5 className="text-blue-200 font-medium mb-2">Resident Profile Analysis:</h5>
              <ul className="text-foreground text-sm space-y-1">
                <li>• 70% of residents had some form of visual impairment</li>
                <li>• Average age 85+ with reduced mobility</li>
                <li>• Many residents used walking aids</li>
                <li>• Some had dementia affecting wayfinding</li>
              </ul>
            </div>
            
            <div className="p-3 bg-blue-700/20 rounded border border-blue-500/40">
              <h5 className="text-blue-200 font-medium mb-2">Evacuation Challenges:</h5>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Evacuation time estimated at 45+ minutes</li>
                <li>• Staff-assisted evacuation required</li>
                <li>• Refuge areas needed for staged evacuation</li>
                <li>• Emergency services access requirements</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-green-600/20 to-green-800/10 border border-green-500/40 rounded-lg">
          <h4 className="text-green-300 font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-400" />
            Risk-Based Design Solution
          </h4>
          <p className="text-foreground mb-3">
            The design was completely updated to address the specific risks and occupant needs identified in the assessment.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-green-700/20 rounded border border-green-500/40">
              <h5 className="text-green-200 font-medium mb-2">Enhanced Lighting Levels:</h5>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Increased to 5 lux in corridors and stairwells</li>
                <li>• 10 lux at decision points and exits</li>
                <li>• Additional luminaires at walking aid storage</li>
                <li>• Enhanced lighting at refuge points</li>
              </ul>
            </div>
            
            <div className="p-3 bg-green-700/20 rounded border border-green-500/40">
              <h5 className="text-green-200 font-medium mb-2">Extended Duration:</h5>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Extended battery duration to 3 hours</li>
                <li>• Allows for slower, assisted evacuation</li>
                <li>• Provides time for emergency service operations</li>
                <li>• Accounts for potential rescue delays</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="p-4 bg-gradient-to-br from-purple-600/20 to-purple-800/10 border border-purple-500/40 rounded-lg">
          <h4 className="text-purple-300 font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-purple-400" />
            Results and Benefits
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h5 className="text-purple-200 font-medium mb-2">Safety Improvements:</h5>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Residents reported increased confidence</li>
                <li>• Staff evacuation procedures improved</li>
                <li>• Drill times reduced by 30%</li>
                <li>• Full compliance achieved</li>
              </ul>
            </div>
            <div>
              <h5 className="text-purple-200 font-medium mb-2">Additional Benefits:</h5>
              <ul className="text-foreground text-sm space-y-1">
                <li>• Reduced insurance premiums</li>
                <li>• Improved CQC inspection ratings</li>
                <li>• Enhanced family confidence</li>
                <li>• Better staff recruitment/retention</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-elec-yellow" />
            <span className="text-elec-yellow font-semibold">Key Learning Points</span>
          </div>
          <p className="text-foreground text-sm">
            This example demonstrates that meeting minimum standards is not always sufficient for true safety. Risk-based design adjustments, though requiring higher initial investment, provide better protection for vulnerable occupants and can deliver broader business benefits through improved compliance, reduced liability, and enhanced reputation.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};