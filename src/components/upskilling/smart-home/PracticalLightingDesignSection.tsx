import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ClipboardCheck } from 'lucide-react';

export const PracticalLightingDesignSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <ClipboardCheck className="h-5 w-5 text-elec-yellow" />
          Practical Design Checklist
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <p>
          Use this systematic approach to select the right lighting system for each project:
        </p>
        
        <div className="space-y-4">
          <div className="p-3 bg-blue-600/10 border border-blue-600/20 rounded-lg">
            <h4 className="font-semibold text-blue-200 mb-2">1. Assess Project Constraints</h4>
            <ul className="text-sm text-blue-100 space-y-1">
              <li>• <strong>Property type:</strong> Rental, owned, new build, listed building</li>
              <li>• <strong>Budget range:</strong> £100s (smart bulbs) vs £1000s+ (wired)</li>
              <li>• <strong>Disruption tolerance:</strong> Zero vs major works acceptable</li>
              <li>• <strong>Timeline:</strong> Immediate vs planned construction phases</li>
            </ul>
          </div>

          <div className="p-3 bg-green-600/10 border border-green-600/20 rounded-lg">
            <h4 className="font-semibold text-green-200 mb-2">2. Define Functional Requirements</h4>
            <ul className="text-sm text-green-100 space-y-1">
              <li>• <strong>Control granularity:</strong> Room-level vs individual bulb control</li>
              <li>• <strong>Colour requirements:</strong> White only vs full RGB capability</li>
              <li>• <strong>Integration needs:</strong> Standalone vs whole-home automation</li>
              <li>• <strong>Reliability priority:</strong> Convenience vs mission-critical</li>
            </ul>
          </div>

          <div className="p-3 bg-purple-600/10 border border-purple-600/20 rounded-lg">
            <h4 className="font-semibold text-purple-200 mb-2">3. Technical Feasibility Check</h4>
            <ul className="text-sm text-purple-100 space-y-1">
              <li>• <strong>Existing wiring:</strong> Neutral availability, circuit capacity</li>
              <li>• <strong>Wi-Fi coverage:</strong> Signal strength in all lighting locations</li>
              <li>• <strong>Structural access:</strong> Routes for new cables if needed</li>
              <li>• <strong>Hub placement:</strong> Central location for wireless systems</li>
            </ul>
          </div>

          <div className="p-3 bg-orange-600/10 border border-orange-600/20 rounded-lg">
            <h4 className="font-semibold text-orange-200 mb-2">4. Future-Proofing Considerations</h4>
            <ul className="text-sm text-orange-100 space-y-1">
              <li>• <strong>Expansion plans:</strong> Will more devices be added later?</li>
              <li>• <strong>Technology evolution:</strong> Matter compatibility for longevity</li>
              <li>• <strong>Maintenance access:</strong> How easy to service/upgrade?</li>
              <li>• <strong>Standard compliance:</strong> Will it meet future regulations?</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};