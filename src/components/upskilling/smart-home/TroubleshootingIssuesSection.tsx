import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import CommonIssuesQuickCheck from '@/components/upskilling/smart-home/CommonIssuesQuickCheck';

const TroubleshootingIssuesSection = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-elec-yellow" />
            Troubleshooting Common Issues
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            Even with careful procedures, pairing issues can occur. Understanding common problems and their solutions saves time and prevents frustration.
          </p>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span className="font-medium text-red-200">Device Not Detected</span>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-red-100 font-medium">Possible Causes:</p>
                  <ul className="text-red-100 space-y-1 ml-4">
                    <li>• Power supply issue</li>
                    <li>• Weak signal strength</li>
                    <li>• Device not in pairing mode</li>
                    <li>• Hub at device limit</li>
                  </ul>
                  <p className="text-green-200 font-medium mt-2">Solutions:</p>
                  <ul className="text-green-100 space-y-1 ml-4">
                    <li>• Check power connections</li>
                    <li>• Move device closer to hub</li>
                    <li>• Reset device and retry</li>
                    <li>• Check hub capacity limits</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="h-4 w-4 text-red-400" />
                  <span className="font-medium text-red-200">Connection Drops</span>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-red-100 font-medium">Possible Causes:</p>
                  <ul className="text-red-100 space-y-1 ml-4">
                    <li>• Poor Wi-Fi coverage</li>
                    <li>• Network interference</li>
                    <li>• Router overload</li>
                    <li>• Distance from hub</li>
                  </ul>
                  <p className="text-green-200 font-medium mt-2">Solutions:</p>
                  <ul className="text-green-100 space-y-1 ml-4">
                    <li>• Improve Wi-Fi coverage</li>
                    <li>• Reposition hubs/repeaters</li>
                    <li>• Reduce network congestion</li>
                    <li>• Add mesh network nodes</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <span className="font-medium text-red-200">Duplicate Devices</span>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-red-100 font-medium">Possible Causes:</p>
                  <ul className="text-red-100 space-y-1 ml-4">
                    <li>• Multiple pairing attempts</li>
                    <li>• Network switching during setup</li>
                    <li>• App synchronisation issues</li>
                  </ul>
                  <p className="text-green-200 font-medium mt-2">Solutions:</p>
                  <ul className="text-green-100 space-y-1 ml-4">
                    <li>• Remove all instances</li>
                    <li>• Clear app cache</li>
                    <li>• Factory reset device</li>
                    <li>• Re-pair from scratch</li>
                  </ul>
                </div>
              </div>

              <div className="p-4 bg-red-900/20 border border-red-600/30 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <RefreshCw className="h-4 w-4 text-red-400" />
                  <span className="font-medium text-red-200">Firmware Mismatch</span>
                </div>
                <div className="space-y-2 text-sm">
                  <p className="text-red-100 font-medium">Possible Causes:</p>
                  <ul className="text-red-100 space-y-1 ml-4">
                    <li>• Outdated hub firmware</li>
                    <li>• Incompatible device version</li>
                    <li>• Failed update process</li>
                  </ul>
                  <p className="text-green-200 font-medium mt-2">Solutions:</p>
                  <ul className="text-green-100 space-y-1 ml-4">
                    <li>• Update hub software first</li>
                    <li>• Check compatibility lists</li>
                    <li>• Force firmware updates</li>
                    <li>• Contact manufacturer support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
            <h4 className="font-semibold text-elec-yellow mb-2">Systematic Troubleshooting Approach</h4>
            <ol className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">1.</span>
                Check power supply and physical connections
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">2.</span>
                Verify signal strength and range
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">3.</span>
                Reset device and clear any previous pairings
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">4.</span>
                Update firmware on both hub and device
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow font-bold">5.</span>
                Retry pairing following manufacturer instructions exactly
              </li>
            </ol>
          </div>
        </CardContent>
      </Card>

      <CommonIssuesQuickCheck />
    </div>
  );
};

export default TroubleshootingIssuesSection;