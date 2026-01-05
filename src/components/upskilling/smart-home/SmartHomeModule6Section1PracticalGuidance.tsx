import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Users, Shield, Clock } from 'lucide-react';

export const SmartHomeModule6Section1PracticalGuidance = () => {
  return (
    <Card className="bg-elec-gray border-elec-yellow/20">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-foreground flex items-center gap-3">
          <Wrench className="h-7 w-7 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <p className="text-foreground leading-relaxed">
          When advising clients on smart home hubs, consider these key factors to ensure the best solution for their needs:
        </p>

        <div className="grid gap-6">
          {/* Assessment */}
          <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Users className="h-6 w-6 text-blue-400" />
              <h4 className="font-semibold text-foreground">Assess Client Needs</h4>
            </div>
            <ul className="space-y-2 text-foreground text-sm">
              <li>• <strong>Technical skill level:</strong> Are they beginners, advanced users, or somewhere in between?</li>
              <li>• <strong>System complexity:</strong> Simple lighting control or comprehensive automation?</li>
              <li>• <strong>Device preferences:</strong> Specific brands or open to mixed ecosystems?</li>
              <li>• <strong>Budget constraints:</strong> Initial cost vs. long-term expansion plans</li>
            </ul>
          </div>

          {/* Compatibility */}
          <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="h-6 w-6 text-green-400" />
              <h4 className="font-semibold text-foreground">Check Compatibility</h4>
            </div>
            <ul className="space-y-2 text-foreground text-sm">
              <li>• <strong>Protocol support:</strong> Ensure all planned devices can communicate with the chosen hub</li>
              <li>• <strong>Device limits:</strong> Check maximum number of connected devices</li>
              <li>• <strong>Voice assistant integration:</strong> Confirm compatibility with preferred assistants</li>
              <li>• <strong>Third-party apps:</strong> Verify integration with existing home systems</li>
            </ul>
          </div>

          {/* Future-proofing */}
          <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <Clock className="h-6 w-6 text-purple-400" />
              <h4 className="font-semibold text-foreground">Future-Proofing</h4>
            </div>
            <ul className="space-y-2 text-foreground text-sm">
              <li>• <strong>Avoid multiple hubs:</strong> Unless necessary for specific requirements</li>
              <li>• <strong>Expandability:</strong> Choose systems that can grow with client needs</li>
              <li>• <strong>Standard protocols:</strong> Prefer Zigbee 3.0, Z-Wave Plus, or Thread/Matter</li>
              <li>• <strong>Update support:</strong> Ensure ongoing manufacturer updates and support</li>
            </ul>
          </div>

          {/* Support and Maintenance */}
          <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-3">Support and Maintenance Considerations</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h5 className="font-medium text-orange-300 mb-2">Proprietary Hubs</h5>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• Easier for clients to manage independently</li>
                  <li>• Professional customer support available</li>
                  <li>• Automatic updates and maintenance</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-orange-300 mb-2">Open-Source Hubs</h5>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• Require ongoing technical support</li>
                  <li>• Manual updates and configuration</li>
                  <li>• Higher maintenance involvement</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Decision Matrix */}
        <div className="bg-elec-dark/50 border border-gray-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-elec-yellow mb-3">Quick Decision Guide:</h4>
          <div className="space-y-2 text-foreground text-sm">
            <p><strong>Beginners:</strong> SmartThings or proprietary hubs (Hue, Hive)</p>
            <p><strong>Tech enthusiasts:</strong> Home Assistant or SmartThings</p>
            <p><strong>Mixed device brands:</strong> SmartThings or Home Assistant</p>
            <p><strong>Single-system focus:</strong> Proprietary hubs (Philips, Nest)</p>
            <p><strong>Privacy-conscious:</strong> Home Assistant (local control)</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};