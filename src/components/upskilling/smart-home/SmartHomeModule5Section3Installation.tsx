import { Settings, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const SmartHomeModule5Section3Installation = () => {
  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-6 w-6 text-orange-500" />
          Installation & Limitations
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Installation Best Practices</h4>
            <div className="space-y-3">
              <div className="bg-green-600/20 p-3 rounded border border-green-600/40">
                <p className="text-green-400 font-semibold text-sm mb-1">Contact Sensor Alignment</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Maximum 15mm gap when closed</li>
                  <li>• Secure mounting prevents tampering</li>
                  <li>• Consider door/window movement</li>
                  <li>• Test operation through full range</li>
                </ul>
              </div>
              <div className="bg-blue-600/20 p-3 rounded border border-blue-600/40">
                <p className="text-blue-400 font-semibold text-sm mb-1">PIR Positioning</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• 2.4-3m mounting height optimal</li>
                  <li>• Avoid direct heat sources</li>
                  <li>• Test coverage patterns</li>
                  <li>• Consider pet movements</li>
                </ul>
              </div>
              <div className="bg-purple-600/20 p-3 rounded border border-purple-600/40">
                <p className="text-purple-400 font-semibold text-sm mb-1">Network Considerations</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Signal strength testing</li>
                  <li>• Battery monitoring setup</li>
                  <li>• Hub proximity planning</li>
                  <li>• Mesh network optimization</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-semibold text-lg mb-4">Limitations & Challenges</h4>
            <div className="space-y-3">
              <div className="bg-red-600/20 p-3 rounded border border-red-600/40">
                <p className="text-red-400 font-semibold text-sm mb-1">Battery Dependencies</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Regular battery replacement needed</li>
                  <li>• Low battery affects reliability</li>
                  <li>• Monitoring systems essential</li>
                  <li>• Backup power considerations</li>
                </ul>
              </div>
              <div className="bg-yellow-600/20 p-3 rounded border border-yellow-600/40">
                <p className="text-yellow-400 font-semibold text-sm mb-1">Environmental Factors</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Temperature extremes affect operation</li>
                  <li>• Humidity can cause issues</li>
                  <li>• UV exposure degrades components</li>
                  <li>• Wind affects outdoor sensors</li>
                </ul>
              </div>
              <div className="bg-gray-600/20 p-3 rounded border border-gray-600/40">
                <p className="text-foreground font-semibold text-sm mb-1">Technical Limitations</p>
                <ul className="text-xs text-foreground space-y-1">
                  <li>• Range limitations with wireless</li>
                  <li>• Interference from other devices</li>
                  <li>• Physical obstruction issues</li>
                  <li>• Maintenance access requirements</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-orange-600/10 p-4 rounded-lg border border-orange-600/30">
          <div className="flex items-start gap-3">
            <AlertTriangle className="h-5 w-5 text-orange-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="text-foreground font-semibold mb-2">Critical Considerations</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-orange-400 font-semibold text-sm mb-1">False Alarm Management</p>
                  <ul className="text-xs text-foreground space-y-1">
                    <li>• Proper sensor sensitivity settings</li>
                    <li>• Pet-immune configurations</li>
                    <li>• Environmental compensation</li>
                  </ul>
                </div>
                <div>
                  <p className="text-orange-400 font-semibold text-sm mb-1">Security Bypass Risks</p>
                  <ul className="text-xs text-foreground space-y-1">
                    <li>• Alternative entry methods</li>
                    <li>• System jamming vulnerabilities</li>
                    <li>• Physical sensor tampering</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};