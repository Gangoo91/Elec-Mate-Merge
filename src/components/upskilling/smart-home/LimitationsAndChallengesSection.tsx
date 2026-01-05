import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle } from 'lucide-react';

export const LimitationsAndChallengesSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-elec-yellow" />
          Limitations and Challenges
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Understanding potential issues helps installers design more robust systems and set realistic client expectations.
        </p>
        
        <div className="space-y-4">
          <div className="p-3 bg-red-600/10 border border-red-600/20 rounded-lg">
            <h5 className="font-semibold text-red-200 mb-2">Schedule Conflicts</h5>
            <ul className="text-sm text-red-100 space-y-1">
              <li>• <strong>Overlapping automations:</strong> Two schedules trying to control same lights</li>
              <li>• <strong>Priority confusion:</strong> System doesn't know which rule takes precedence</li>
              <li>• <strong>Rapid switching:</strong> Lights turning on/off repeatedly due to competing triggers</li>
              <li>• <strong>Solution:</strong> Clear hierarchy and conflict detection in programming</li>
            </ul>
          </div>

          <div className="p-3 bg-orange-600/10 border border-orange-600/20 rounded-lg">
            <h5 className="font-semibold text-orange-200 mb-2">Device Reliability Issues</h5>
            <ul className="text-sm text-orange-100 space-y-1">
              <li>• <strong>Devices dropping offline:</strong> Wi-Fi bulbs losing connection</li>
              <li>• <strong>Mesh network gaps:</strong> Zigbee/Z-Wave coverage holes</li>
              <li>• <strong>Battery sensor failures:</strong> Motion detectors stopping working</li>
              <li>• <strong>Solution:</strong> Regular system monitoring and device health checks</li>
            </ul>
          </div>

          <div className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
            <h5 className="font-semibold text-blue-200 mb-2">Internet Dependency</h5>
            <ul className="text-sm text-blue-100 space-y-1">
              <li>• <strong>Cloud-based schedules fail:</strong> No internet = no automation</li>
              <li>• <strong>Voice control offline:</strong> Alexa/Google need internet connection</li>
              <li>• <strong>Remote access lost:</strong> Can't control lights when away</li>
              <li>• <strong>Solution:</strong> Local hubs and offline-capable automation rules</li>
            </ul>
          </div>

          <div className="p-3 bg-purple-600/10 border border-purple-600/20 rounded-lg">
            <h5 className="font-semibold text-purple-200 mb-2">Over-Automation Pitfalls</h5>
            <ul className="text-sm text-purple-100 space-y-1">
              <li>• <strong>Unexpected behaviour:</strong> Lights turning on when not wanted</li>
              <li>• <strong>User frustration:</strong> Fighting with automation to get desired lighting</li>
              <li>• <strong>Complex troubleshooting:</strong> Hard to identify which rule caused a problem</li>
              <li>• <strong>Guest confusion:</strong> Visitors don't understand the system</li>
            </ul>
          </div>

          <div className="p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
            <h5 className="font-semibold text-yellow-200 mb-2">Mitigation Strategies</h5>
            <div className="grid md:grid-cols-2 gap-3 mt-2">
              <div>
                <h6 className="font-medium text-yellow-100 mb-1">Design Phase:</h6>
                <ul className="text-sm text-yellow-100 space-y-1">
                  <li>• Document all automation rules</li>
                  <li>• Plan manual override methods</li>
                  <li>• Test edge cases thoroughly</li>
                  <li>• Keep backup configurations</li>
                </ul>
              </div>
              <div>
                <h6 className="font-medium text-yellow-100 mb-1">Ongoing Support:</h6>
                <ul className="text-sm text-yellow-100 space-y-1">
                  <li>• Regular system health checks</li>
                  <li>• User training and documentation</li>
                  <li>• Gradual complexity introduction</li>
                  <li>• Clear troubleshooting procedures</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};