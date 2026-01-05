import { Monitor } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule5Section4Monitoring = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Monitor className="h-6 w-6 text-purple-500" />
          3. Monitoring and Control from Anywhere
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-purple-600/10 p-4 rounded-lg border border-purple-600/30">
          <h4 className="text-foreground font-semibold mb-3">Comprehensive Remote Control</h4>
          <p className="text-sm mb-3">
            Apps allow users to check camera feeds, adjust thermostats, or lock doors remotely. 
            Cloud-based dashboards display energy usage, temperature trends, and security logs, 
            providing comprehensive oversight of the entire home ecosystem.
          </p>
          <p className="text-sm">
            Integration with voice assistants (Alexa, Google Assistant) extends control options, 
            enabling voice commands even when away from home through phone-based voice apps.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Remote Control Capabilities</h4>
            <div className="space-y-3">
              <div className="bg-blue-600/20 p-3 rounded border border-blue-600/40">
                <p className="text-blue-400 font-semibold text-sm mb-1">Security Systems</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Arm/disarm alarm systems</li>
                  <li>• View live and recorded camera feeds</li>
                  <li>• Control smart locks and door access</li>
                  <li>• Adjust motion sensor sensitivity</li>
                </ul>
              </div>
              <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                <p className="text-green-400 font-semibold text-sm mb-1">Climate Control</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Adjust heating and cooling settings</li>
                  <li>• Program temperature schedules</li>
                  <li>• Control smart vents and dampers</li>
                  <li>• Monitor indoor air quality</li>
                </ul>
              </div>
              <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                <p className="text-orange-400 font-semibold text-sm mb-1">Lighting & Electrical</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Turn lights on/off and adjust brightness</li>
                  <li>• Control smart switches and outlets</li>
                  <li>• Manage automated lighting scenes</li>
                  <li>• Monitor energy consumption</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Monitoring Dashboard Features</h4>
            <div className="space-y-3">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-cyan-400 font-semibold text-sm mb-1">Real-Time Data</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Live device status updates</li>
                  <li>• Current temperature and humidity</li>
                  <li>• Energy usage statistics</li>
                  <li>• Network connectivity status</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-yellow-400 font-semibold text-sm mb-1">Historical Analytics</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Energy consumption trends</li>
                  <li>• Device usage patterns</li>
                  <li>• Environmental condition logs</li>
                  <li>• Security event history</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-red-400 font-semibold text-sm mb-1">Alerts & Reports</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• System health notifications</li>
                  <li>• Performance anomaly detection</li>
                  <li>• Maintenance schedule reminders</li>
                  <li>• Custom reporting capabilities</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-lg">
          <h4 className="text-elec-yellow font-semibold mb-3">Advanced Monitoring Features</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Geofencing Integration:</p>
              <ul className="text-xs space-y-1">
                <li>• Automatic actions based on location</li>
                <li>• Arrival and departure detection</li>
                <li>• Context-aware energy management</li>
                <li>• Security mode adjustments</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">AI-Powered Insights:</p>
              <ul className="text-xs space-y-1">
                <li>• Usage pattern recognition</li>
                <li>• Predictive maintenance alerts</li>
                <li>• Energy optimisation suggestions</li>
                <li>• Anomaly detection algorithms</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Multi-User Access:</p>
              <ul className="text-xs space-y-1">
                <li>• Family member permissions</li>
                <li>• Guest access controls</li>
                <li>• Activity logging by user</li>
                <li>• Role-based feature access</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};