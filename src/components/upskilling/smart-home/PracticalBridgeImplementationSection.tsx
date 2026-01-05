import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, CheckCircle, AlertTriangle, Wifi, Search } from 'lucide-react';

export const PracticalBridgeImplementationSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Practical Implementation Guide
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        
        <div className="bg-blue-900/10 border border-blue-600/20 rounded-lg p-4">
          <h4 className="text-blue-200 font-semibold mb-3 flex items-center gap-2">
            <Search className="h-4 w-4" />
            Pre-Installation Assessment
          </h4>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <h5 className="text-blue-300 font-medium mb-1">Client Requirements</h5>
                <ul className="space-y-1 text-blue-100">
                  <li>• Preferred voice assistant</li>
                  <li>• Existing smart devices</li>
                  <li>• Control preferences</li>
                  <li>• Budget constraints</li>
                </ul>
              </div>
              <div>
                <h5 className="text-blue-300 font-medium mb-1">Technical Assessment</h5>
                <ul className="space-y-1 text-blue-100">
                  <li>• Network infrastructure</li>
                  <li>• Protocol requirements</li>
                  <li>• Integration complexity</li>
                  <li>• Future expansion plans</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="text-foreground font-semibold">Step-by-Step Bridge Setup</h4>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3 p-3 bg-gray-800/50 border border-gray-600/30 rounded-lg">
              <div className="bg-blue-600 text-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center mt-0.5">1</div>
              <div>
                <h5 className="text-foreground font-medium">Network Preparation</h5>
                <p className="text-gray-400 text-sm">Ensure stable Wi-Fi coverage, check bandwidth, configure guest networks if needed</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-gray-800/50 border border-gray-600/30 rounded-lg">
              <div className="bg-blue-600 text-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center mt-0.5">2</div>
              <div>
                <h5 className="text-foreground font-medium">Bridge Installation</h5>
                <p className="text-gray-400 text-sm">Connect bridge to router via Ethernet, power on, verify LED status indicators</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-gray-800/50 border border-gray-600/30 rounded-lg">
              <div className="bg-blue-600 text-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center mt-0.5">3</div>
              <div>
                <h5 className="text-foreground font-medium">Device Pairing</h5>
                <p className="text-gray-400 text-sm">Use manufacturer app to discover and pair target devices with the bridge</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-gray-800/50 border border-gray-600/30 rounded-lg">
              <div className="bg-blue-600 text-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center mt-0.5">4</div>
              <div>
                <h5 className="text-foreground font-medium">Ecosystem Integration</h5>
                <p className="text-gray-400 text-sm">Enable skills/integrations in voice assistant apps, test basic commands</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-3 bg-gray-800/50 border border-gray-600/30 rounded-lg">
              <div className="bg-blue-600 text-foreground text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center mt-0.5">5</div>
              <div>
                <h5 className="text-foreground font-medium">Testing & Validation</h5>
                <p className="text-gray-400 text-sm">Test all control methods, verify automation triggers, document any limitations</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-900/10 border border-amber-600/20 rounded-lg p-4">
          <h4 className="text-amber-200 font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" />
            Common Integration Issues
          </h4>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h5 className="text-amber-300 font-medium mb-2">Discovery Problems</h5>
                <ul className="space-y-1 text-amber-100">
                  <li>• Bridge not on same network</li>
                  <li>• Firewall blocking discovery</li>
                  <li>• UPnP disabled on router</li>
                  <li>• Bridge firmware outdated</li>
                </ul>
              </div>
              <div>
                <h5 className="text-amber-300 font-medium mb-2">Control Issues</h5>
                <ul className="space-y-1 text-amber-100">
                  <li>• Skills not properly enabled</li>
                  <li>• Account linking failures</li>
                  <li>• Device naming conflicts</li>
                  <li>• Cloud service outages</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-green-900/10 border border-green-600/20 rounded-lg p-4">
          <h4 className="text-green-200 font-semibold mb-3 flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            Best Practices
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="text-green-300 font-medium mb-2">Installation</h5>
              <ul className="space-y-1 text-green-100">
                <li>• Document bridge IP addresses</li>
                <li>• Use descriptive device names</li>
                <li>• Create network diagrams</li>
                <li>• Test before client handover</li>
              </ul>
            </div>
            <div>
              <h5 className="text-green-300 font-medium mb-2">Maintenance</h5>
              <ul className="space-y-1 text-green-100">
                <li>• Schedule firmware updates</li>
                <li>• Monitor bridge health</li>
                <li>• Backup configurations</li>
                <li>• Provide client documentation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-purple-900/10 border border-purple-600/20 rounded-lg p-4">
          <h4 className="text-purple-200 font-semibold mb-3 flex items-center gap-2">
            <Wifi className="h-4 w-4" />
            Troubleshooting Quick Reference
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between items-center p-2 bg-purple-900/20 rounded">
              <span className="text-purple-200">Bridge not discovered</span>
              <span className="text-purple-300">Check network, restart bridge, verify IP</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-purple-900/20 rounded">
              <span className="text-purple-200">Devices not responding</span>
              <span className="text-purple-300">Check power, re-pair devices, firmware update</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-purple-900/20 rounded">
              <span className="text-purple-200">Voice control failing</span>
              <span className="text-purple-300">Re-enable skills, check account linking</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-purple-900/20 rounded">
              <span className="text-purple-200">Slow response times</span>
              <span className="text-purple-300">Check network congestion, optimize placement</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};