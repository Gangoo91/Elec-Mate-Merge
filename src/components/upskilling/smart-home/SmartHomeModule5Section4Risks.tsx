import { AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule5Section4Risks = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <AlertTriangle className="h-6 w-6 text-red-500" />
          4. Risks and Challenges of Remote Access
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
          <h4 className="text-foreground font-semibold mb-3">Critical Risk Assessment</h4>
          <p className="text-sm mb-3">
            While remote access provides tremendous convenience, it introduces several risks that 
            must be carefully managed. Understanding these challenges is essential for electricians 
            to provide secure installations and educate customers about potential vulnerabilities.
          </p>
          <p className="text-sm">
            Dependence on stable internet connectivity, cybersecurity risks from weak passwords or 
            outdated firmware, and false alerts from poorly configured devices can all cause 
            significant problems if not properly addressed.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Technical and Connectivity Risks</h4>
            <div className="space-y-3">
              <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                <p className="text-red-400 font-semibold text-sm mb-1">Internet Dependency</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Loss of control during internet outages</li>
                  <li>• Reduced functionality with poor connectivity</li>
                  <li>• Delayed response times affecting security</li>
                  <li>• Cloud service downtime vulnerabilities</li>
                </ul>
              </div>
              <div className="bg-orange-600/20 p-3 rounded border border-orange-600/40">
                <p className="text-orange-400 font-semibold text-sm mb-1">Device Reliability Issues</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Firmware bugs causing system instability</li>
                  <li>• Battery failure in wireless devices</li>
                  <li>• Network congestion affecting performance</li>
                  <li>• Incompatibility between system updates</li>
                </ul>
              </div>
              <div className="bg-yellow-600/20 p-3 rounded border border-yellow-600/40">
                <p className="text-yellow-400 font-semibold text-sm mb-1">False Alert Problems</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Pet-triggered motion detection alerts</li>
                  <li>• Weather-related sensor activation</li>
                  <li>• Network glitches causing phantom alerts</li>
                  <li>• User fatigue from excessive notifications</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Security and Privacy Vulnerabilities</h4>
            <div className="space-y-3">
              <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                <p className="text-red-400 font-semibold text-sm mb-1">Cybersecurity Threats</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Weak passwords enabling unauthorised access</li>
                  <li>• Unencrypted data transmission interception</li>
                  <li>• Firmware vulnerabilities and exploits</li>
                  <li>• Man-in-the-middle attack risks</li>
                </ul>
              </div>
              <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                <p className="text-purple-400 font-semibold text-sm mb-1">Privacy Concerns</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Cloud storage of personal data</li>
                  <li>• Third-party data sharing policies</li>
                  <li>• Location tracking through mobile apps</li>
                  <li>• Camera and audio recording privacy</li>
                </ul>
              </div>
              <div className="bg-blue-600/20 p-3 rounded border border-blue-600/40">
                <p className="text-blue-400 font-semibold text-sm mb-1">Access Control Risks</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Stolen or lost mobile devices</li>
                  <li>• Inadequate user permission management</li>
                  <li>• Shared account credential compromise</li>
                  <li>• Temporary access not properly revoked</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-lg">
          <h4 className="text-elec-yellow font-semibold mb-3">Risk Mitigation Strategies</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Security Hardening:</p>
              <ul className="text-xs space-y-1">
                <li>• Strong, unique passwords for all devices</li>
                <li>• Regular firmware and software updates</li>
                <li>• Enable two-factor authentication</li>
                <li>• Network segmentation for IoT devices</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Connectivity Backup:</p>
              <ul className="text-xs space-y-1">
                <li>• Secondary internet connection options</li>
                <li>• Local hub functionality when offline</li>
                <li>• Battery backup for critical systems</li>
                <li>• Cellular backup for security systems</li>
              </ul>
            </div>
            <div>
              <p className="text-foreground font-semibold text-sm mb-2">Configuration Best Practices:</p>
              <ul className="text-xs space-y-1">
                <li>• Proper sensor placement and calibration</li>
                <li>• Intelligent alert filtering and grouping</li>
                <li>• Regular system testing and maintenance</li>
                <li>• User education on security practices</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};