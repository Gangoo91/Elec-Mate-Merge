import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Merge } from 'lucide-react';

export const HybridLightingSystemsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Merge className="h-5 w-5 text-elec-yellow" />
          Hybrid Lighting Systems
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Mix of wired backbones for reliability with wireless devices for flexibility - increasingly common in modern smart-ready homes.
        </p>
        
        <div className="space-y-4">
          <div className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
            <h5 className="font-semibold text-blue-200 mb-2">Typical Configuration</h5>
            <p className="text-sm text-blue-100 mb-2">
              <strong>Example:</strong> Wired KNX dimmers for main lighting circuits, but Zigbee wireless sensors for occupancy and daylight sensing.
            </p>
            <ul className="text-sm text-blue-100 space-y-1">
              <li>• Wired infrastructure for critical lighting control</li>
              <li>• Wireless sensors for flexibility and retrofitting</li>
              <li>• Central gateway bridges both systems</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
              <h5 className="font-semibold text-green-200 mb-2">Benefits</h5>
              <ul className="text-sm text-green-100 space-y-1">
                <li>• Core lighting always reliable (wired)</li>
                <li>• Easy to add sensors anywhere</li>
                <li>• Future-proof expansion</li>
                <li>• Best of both technologies</li>
              </ul>
            </div>
            <div className="p-3 bg-orange-600/10 border border-orange-600/20 rounded-lg">
              <h5 className="font-semibold text-orange-200 mb-2">Considerations</h5>
              <ul className="text-sm text-orange-100 space-y-1">
                <li>• More complex system design</li>
                <li>• Requires integration expertise</li>
                <li>• Higher overall cost</li>
                <li>• Multiple protocols to manage</li>
              </ul>
            </div>
          </div>

          <div className="p-3 bg-yellow-600/10 border border-yellow-600/20 rounded-lg">
            <h5 className="font-semibold text-yellow-200 mb-2">Modern Applications</h5>
            <p className="text-sm text-yellow-100">
              New builds where structured cabling is planned but wireless expansion is anticipated, or high-end retrofits where some disruption is acceptable for the wired backbone.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};