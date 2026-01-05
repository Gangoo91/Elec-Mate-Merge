import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Shield, Cable, Tag, Users } from 'lucide-react';

export const BMSModule5Section6Practical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* For Electricians */}
          <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
            <div className="flex items-center gap-3 mb-4">
              <Wrench className="h-6 w-6 text-blue-400" />
              <h4 className="font-semibold text-blue-300 text-lg">For Electricians</h4>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                <p className="font-medium text-blue-200">Follow Protocol Limits</p>
                <p className="text-sm text-blue-100">Never exceed recommended device counts or cable lengths</p>
                <ul className="text-xs text-blue-100 mt-2 space-y-1">
                  <li>• Check manufacturer specifications</li>
                  <li>• Plan for future expansion</li>
                  <li>• Document device counts per segment</li>
                </ul>
              </div>
              
              <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                <p className="font-medium text-green-200">Use Correct Cabling</p>
                <p className="text-sm text-green-100">Shielded twisted pair for RS-485, Cat5e/6 for Ethernet</p>
                <ul className="text-xs text-green-100 mt-2 space-y-1">
                  <li>• 120Ω characteristic impedance for RS-485</li>
                  <li>• Proper termination at both ends</li>
                  <li>• No stubs or branches on RS-485</li>
                </ul>
              </div>
              
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded">
                <p className="font-medium text-purple-200">Maintain Segregation</p>
                <p className="text-sm text-purple-100">Keep comms cables separate from mains power</p>
                <ul className="text-xs text-purple-100 mt-2 space-y-1">
                  <li>• Minimum 300mm separation from power cables</li>
                  <li>• Extra care near VSDs and motors</li>
                  <li>• Use separate cable trays where possible</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Installation Best Practices */}
          <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
            <div className="flex items-center gap-3 mb-4">
              <Shield className="h-6 w-6 text-green-400" />
              <h4 className="font-semibold text-green-300 text-lg">Installation Best Practices</h4>
            </div>
            <div className="space-y-4">
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                <p className="font-medium text-yellow-200">Cable Management</p>
                <ul className="text-xs text-yellow-100 mt-2 space-y-1">
                  <li>• Avoid sharp bends (minimum bend radius)</li>
                  <li>• Secure cables every 1.5m</li>
                  <li>• Protect from mechanical damage</li>
                  <li>• Allow for thermal expansion</li>
                </ul>
              </div>
              
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded">
                <p className="font-medium text-red-200">Termination Quality</p>
                <ul className="text-xs text-red-100 mt-2 space-y-1">
                  <li>• Strip cables to exact specifications</li>
                  <li>• Use proper crimp tools and connectors</li>
                  <li>• Test continuity before energising</li>
                  <li>• Apply strain relief correctly</li>
                </ul>
              </div>
              
              <div className="p-3 bg-orange-500/10 border border-orange-500/20 rounded">
                <p className="font-medium text-orange-200">Environmental Protection</p>
                <ul className="text-xs text-orange-100 mt-2 space-y-1">
                  <li>• Use appropriate IP ratings</li>
                  <li>• Consider temperature extremes</li>
                  <li>• Protect from moisture ingress</li>
                  <li>• Plan for maintenance access</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Documentation */}
          <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
            <div className="flex items-center gap-3 mb-4">
              <Tag className="h-6 w-6 text-yellow-400" />
              <h4 className="font-semibold text-yellow-300 text-lg">Label Segments</h4>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-gray-300">Each network segment should be clearly identified in panels</p>
              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
                <p className="font-medium text-yellow-200">Labelling Requirements:</p>
                <ul className="text-xs text-yellow-100 mt-2 space-y-1">
                  <li>• Protocol type (BACnet MSTP, Modbus RTU, etc.)</li>
                  <li>• Segment number or name</li>
                  <li>• Device count and maximum capacity</li>
                  <li>• Cable length and routing information</li>
                </ul>
              </div>
            </div>
          </div>

          {/* IT Coordination */}
          <div className="bg-elec-dark p-5 rounded-lg border border-gray-600">
            <div className="flex items-center gap-3 mb-4">
              <Users className="h-6 w-6 text-purple-400" />
              <h4 className="font-semibold text-purple-300 text-lg">Support IT Engineers</h4>
            </div>
            <div className="space-y-3">
              <p className="text-sm text-gray-300">Provide accurate as-built documentation</p>
              <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded">
                <p className="font-medium text-purple-200">Documentation to Provide:</p>
                <ul className="text-xs text-purple-100 mt-2 space-y-1">
                  <li>• Network topology diagrams</li>
                  <li>• Device addresses and locations</li>
                  <li>• Cable routing and panel locations</li>
                  <li>• Switch and router connection points</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/20 border border-blue-600/40 rounded-lg p-6">
          <h4 className="font-semibold text-blue-200 mb-3">Commissioning Support</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
              <p className="font-medium text-blue-200">Testing Tools</p>
              <p className="text-sm text-blue-100">Use protocol analysers to confirm communication quality</p>
            </div>
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
              <p className="font-medium text-green-200">Response Times</p>
              <p className="text-sm text-green-100">Check device latency (should be under 1 second for most functions)</p>
            </div>
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded">
              <p className="font-medium text-yellow-200">Segment Testing</p>
              <p className="text-sm text-yellow-100">Verify isolation by disconnecting segments</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};