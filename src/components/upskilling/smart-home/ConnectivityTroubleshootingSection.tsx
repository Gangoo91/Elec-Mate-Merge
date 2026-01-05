import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Wifi, RefreshCw } from 'lucide-react';
import InterferenceCausesQuickCheck from '@/components/upskilling/smart-home/InterferenceCausesQuickCheck';

const ConnectivityTroubleshootingSection = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-elec-yellow" />
            Troubleshooting Connectivity Issues
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            Systematic troubleshooting approaches help identify and resolve wireless connectivity problems efficiently.
          </p>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Common Connectivity Problems</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wifi className="h-4 w-4 text-red-400" />
                  <span className="font-medium text-red-200">Device Offline</span>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-red-100 font-medium">Troubleshooting Steps:</p>
                  <ol className="text-red-100 space-y-1 ml-4">
                    <li>1. Check device power supply</li>
                    <li>2. Verify Wi-Fi signal strength</li>
                    <li>3. Test network connectivity</li>
                    <li>4. Restart device and router</li>
                    <li>5. Check for firmware updates</li>
                  </ol>
                </div>
              </div>

              <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="h-4 w-4 text-red-400" />
                  <span className="font-medium text-red-200">Intermittent Performance</span>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-red-100 font-medium">Common Causes:</p>
                  <ul className="text-red-100 space-y-1 ml-4">
                    <li>• RF interference from appliances</li>
                    <li>• Network congestion</li>
                    <li>• Overloaded router</li>
                    <li>• Neighbouring Wi-Fi overlap</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span className="font-medium text-red-200">Slow Response Times</span>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-red-100 font-medium">Potential Solutions:</p>
                  <ul className="text-red-100 space-y-1 ml-4">
                    <li>• Upgrade router capacity</li>
                    <li>• Reduce network traffic</li>
                    <li>• Optimise Wi-Fi channels</li>
                    <li>• Add mesh network nodes</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wifi className="h-4 w-4 text-red-400" />
                  <span className="font-medium text-red-200">Firmware Issues</span>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-red-100 font-medium">Best Practices:</p>
                  <ul className="text-red-100 space-y-1 ml-4">
                    <li>• Update hub firmware first</li>
                    <li>• Check device compatibility</li>
                    <li>• Force updates if needed</li>
                    <li>• Document version numbers</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Systematic Diagnostic Approach</h4>
            
            <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
              <h5 className="font-semibold text-elec-yellow mb-3">Step-by-Step Troubleshooting</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h6 className="font-medium text-foreground mb-2">Physical Layer</h6>
                  <ol className="space-y-1 text-gray-300 text-sm">
                    <li>1. Verify power connections</li>
                    <li>2. Check indicator lights/LEDs</li>
                    <li>3. Test with different power source</li>
                    <li>4. Examine cable connections</li>
                  </ol>
                </div>
                <div>
                  <h6 className="font-medium text-foreground mb-2">Network Layer</h6>
                  <ol className="space-y-1 text-gray-300 text-sm">
                    <li>1. Measure signal strength</li>
                    <li>2. Test router/hub connectivity</li>
                    <li>3. Check for interference</li>
                    <li>4. Verify network settings</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Advanced Diagnostics</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-2">Network Analysis Tools</h5>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Wi-Fi channel analysers</li>
                  <li>• Packet capture tools</li>
                  <li>• Bandwidth monitoring</li>
                  <li>• Latency measurement</li>
                </ul>
              </div>

              <div className="p-4 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-2">Professional Services</h5>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Site survey specialists</li>
                  <li>• RF interference analysis</li>
                  <li>• Network design consultants</li>
                  <li>• Manufacturer technical support</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
            <h4 className="font-semibold text-blue-400 mb-2">Prevention is Better Than Cure</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                Always confirm firmware updates — many improve wireless performance
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                Test signal strength before finalising device placement
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                Document network configuration for future troubleshooting
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400">•</span>
                Train clients on basic connectivity checks they can perform
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <InterferenceCausesQuickCheck />
    </div>
  );
};

export default ConnectivityTroubleshootingSection;