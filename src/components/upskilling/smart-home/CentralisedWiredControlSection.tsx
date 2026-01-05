import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network } from 'lucide-react';

export const CentralisedWiredControlSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Network className="h-5 w-5 text-elec-yellow" />
          Centralised/Wired Control Systems
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Professional-grade systems where all devices are wired back to a central panel, controlled by a hub or Building Management System (BMS).
        </p>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold text-elec-yellow mb-2">Leading Systems</h4>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>KNX/EIB</strong> - European standard, highly reliable</li>
              <li><strong>Lutron</strong> - Premium dimming and shading control</li>
              <li><strong>Crestron</strong> - Integrated automation platform</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
              <h5 className="font-semibold text-green-200 mb-2">Advantages</h5>
              <ul className="text-sm text-green-100 space-y-1">
                <li>• Highly reliable - no wireless interference</li>
                <li>• Infinitely scalable</li>
                <li>• Professional-grade performance</li>
                <li>• Integrates with HVAC, security, AV</li>
                <li>• No battery maintenance</li>
              </ul>
            </div>
            <div className="p-3 bg-red-600/10 border border-red-600/20 rounded-lg">
              <h5 className="font-semibold text-red-200 mb-2">Disadvantages</h5>
              <ul className="text-sm text-red-100 space-y-1">
                <li>• Expensive initial cost</li>
                <li>• Requires structured cabling</li>
                <li>• Must be planned during construction</li>
                <li>• Needs specialist programming</li>
              </ul>
            </div>
          </div>

          <div className="p-3 bg-purple-600/10 border border-purple-600/20 rounded-lg">
            <h5 className="font-semibold text-purple-200 mb-2">Installation Requirements</h5>
            <ul className="text-sm text-purple-100 space-y-1">
              <li>• Dedicated bus cable (e.g., KNX bus)</li>
              <li>• Central control panel location</li>
              <li>• Power supply and distribution</li>
              <li>• Commissioning and programming</li>
            </ul>
          </div>

          <div className="p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
            <h5 className="font-semibold text-yellow-200 mb-2">Best Applications</h5>
            <p className="text-sm text-yellow-100">
              High-end homes, new builds, commercial buildings, and applications requiring ultimate reliability and integration with other building systems.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};