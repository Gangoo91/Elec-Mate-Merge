import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle, Lightbulb } from 'lucide-react';

const SmartHomeModule7Section3RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Lightbulb className="h-6 w-6 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Case Study: Rural Property Heating System</h4>
          
          <div className="bg-red-900/20 border border-red-600/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertTriangle className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-red-200 mb-2">The Problem</h5>
                <p className="text-red-100 text-sm mb-3">
                  A smart heating system in a rural property kept dropping offline, despite devices being properly wired and powered:
                </p>
                <ul className="space-y-1 text-red-100 text-sm ml-4">
                  <li>• Smart thermostats frequently showed as "offline"</li>
                  <li>• Temperature sensors lost connection intermittently</li>
                  <li>• Heating schedules failed to execute reliably</li>
                  <li>• Client couldn't control system remotely</li>
                  <li>• Multiple call-backs to "fix" the same issues</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
            <h5 className="font-semibold text-elec-yellow mb-2">Root Cause Analysis</h5>
            <p className="text-gray-300 text-sm mb-2">
              Signal strength testing revealed the issue wasn't the devices:
            </p>
            <ul className="space-y-1 text-gray-300 text-sm ml-4">
              <li>• Router positioned in corner behind thick stone wall</li>
              <li>• Wi-Fi signal strength at device locations: -85 to -90 dBm (poor)</li>
              <li>• Building materials blocking wireless signals</li>
              <li>• No mesh network or signal extenders installed</li>
            </ul>
          </div>

          <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <CheckCircle className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <h5 className="font-semibold text-green-200 mb-2">The Solution</h5>
                <p className="text-green-100 text-sm mb-3">
                  Network improvements resolved all connectivity issues:
                </p>
                <ul className="space-y-1 text-green-100 text-sm ml-4">
                  <li>• Relocated router to central position in the home</li>
                  <li>• Added Wi-Fi mesh extender in hallway</li>
                  <li>• Signal strength improved to -45 to -55 dBm (excellent)</li>
                  <li>• All devices connected reliably without faults</li>
                  <li>• System ran without issues thereafter</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
            <h5 className="font-semibold text-blue-400 mb-2">Key Lessons Learned</h5>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                Always test wireless signal strength before device placement
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                Building materials significantly affect signal propagation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                Router/hub placement is critical for system reliability
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                Mesh networks solve coverage problems in challenging properties
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SmartHomeModule7Section3RealWorld;