import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Home, Smartphone } from 'lucide-react';

export const SmartHomeModule6Section1RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
          <MapPin className="h-7 w-7 text-elec-yellow" />
          Real World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Case Study Header */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <div className="flex items-center gap-3 mb-3">
            <Home className="h-6 w-6 text-blue-400" />
            <h4 className="font-semibold text-foreground">Case Study: Leeds Family Home Upgrade</h4>
          </div>
          <p className="text-foreground text-sm">
            An electrician was tasked with upgrading a family home in Leeds to resolve smart home management issues.
          </p>
        </div>

        {/* Initial Problem */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">The Challenge</h4>
          <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-4">
            <p className="text-foreground text-sm mb-3">
              The homeowners initially had <strong>three separate proprietary hubs</strong>:
            </p>
            <div className="grid md:grid-cols-3 gap-3">
              <div className="bg-red-800/20 rounded p-3">
                <h5 className="font-medium text-foreground text-sm">Philips Hue Bridge</h5>
                <p className="text-red-300 text-xs">For lighting control</p>
              </div>
              <div className="bg-red-800/20 rounded p-3">
                <h5 className="font-medium text-foreground text-sm">Hive Hub</h5>
                <p className="text-red-300 text-xs">For heating management</p>
              </div>
              <div className="bg-red-800/20 rounded p-3">
                <h5 className="font-medium text-foreground text-sm">Ring System</h5>
                <p className="text-red-300 text-xs">For security and doorbell</p>
              </div>
            </div>
          </div>

          {/* Problems Experienced */}
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
            <h5 className="font-semibold text-foreground mb-2">Problems Experienced:</h5>
            <ul className="space-y-1 text-foreground text-sm">
              <li>• Managing three separate mobile apps was frustrating</li>
              <li>• No unified automation between systems</li>
              <li>• Increased maintenance and troubleshooting calls</li>
              <li>• Family members confused by multiple interfaces</li>
              <li>• Inability to create cross-system scenes or routines</li>
            </ul>
          </div>
        </div>

        {/* The Solution */}
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">The Solution</h4>
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Smartphone className="h-5 w-5 text-green-400" />
              <h5 className="font-semibold text-foreground">SmartThings Hub Integration</h5>
            </div>
            <p className="text-foreground text-sm mb-3">
              The electrician migrated all systems to work through a single SmartThings hub:
            </p>
            <ul className="space-y-2 text-foreground text-sm">
              <li>• <strong>Philips Hue:</strong> Connected via SmartThings integration</li>
              <li>• <strong>Hive heating:</strong> Integrated through SmartThings app</li>
              <li>• <strong>Ring security:</strong> Linked via SmartThings partnership</li>
              <li>• <strong>New devices:</strong> Added directly to SmartThings ecosystem</li>
            </ul>
          </div>
        </div>

        {/* Results */}
        <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
          <h5 className="font-semibold text-foreground mb-3">Results Achieved:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="font-medium text-blue-300 mb-2">User Experience</h6>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• Single app for all control</li>
                <li>• Unified voice assistant integration</li>
                <li>• Cross-system automation possible</li>
                <li>• Simplified family training</li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium text-blue-300 mb-2">Maintenance Benefits</h6>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• Reduced support calls</li>
                <li>• Easier troubleshooting</li>
                <li>• Centralised system management</li>
                <li>• Future expansion flexibility</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Key Takeaways */}
        <div className="bg-elec-dark/50 border border-gray-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-3">Key Takeaways for Electricians:</h4>
          <ul className="space-y-2 text-foreground text-sm">
            <li>• <strong>Assess existing systems</strong> before recommending additional hubs</li>
            <li>• <strong>Prioritise integration capabilities</strong> when selecting hub platforms</li>
            <li>• <strong>Consider user experience</strong> - multiple apps create frustration</li>
            <li>• <strong>Plan for expansion</strong> - unified systems are easier to grow</li>
            <li>• <strong>Test integrations</strong> before final handover to client</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};