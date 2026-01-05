import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Droplets } from 'lucide-react';

export const BathroomZonesSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Droplets className="h-5 w-5 text-elec-yellow" />
          Bathroom Zone Requirements
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-blue-600 text-foreground">Section 701.32</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p>
          Bathroom installations require careful consideration of zone boundaries and equipment selection to ensure user safety whilst maintaining functionality.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-elec-yellow">Equipment Restrictions by Zone</h4>
            
            <div className="bg-elec-dark p-4 rounded border border-red-600">
              <h5 className="font-medium text-red-300 mb-3">Zone 0 & 1 Prohibitions</h5>
              <ul className="text-red-100 text-sm space-y-1">
                <li>• No socket outlets of any type</li>
                <li>• No light switches or control equipment</li>
                <li>• No junction boxes or connection points</li>
                <li>• No standard electrical accessories</li>
                <li>• No cord-operated switches in Zone 0</li>
              </ul>
            </div>

            <div className="bg-elec-dark p-4 rounded border border-yellow-600">
              <h5 className="font-medium text-yellow-300 mb-3">Zone 2 Permissions</h5>
              <ul className="text-yellow-100 text-sm space-y-1">
                <li>• Shaver socket outlets (BS EN 61558-2-5)</li>
                <li>• Towel rails and heating appliances (IPX4)</li>
                <li>• Ventilation fans with adequate IP rating</li>
                <li>• Luminaires suitable for the zone</li>
                <li>• Equipment fed from SELV circuits</li>
              </ul>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-elec-yellow">Practical Installation Guidelines</h4>
            
            <div className="bg-elec-dark p-4 rounded border border-blue-600">
              <h5 className="font-medium text-blue-300 mb-3">Cable Selection</h5>
              <ul className="text-blue-100 text-sm space-y-1">
                <li>• Use cables with adequate voltage rating</li>
                <li>• Consider temperature rise in heated areas</li>
                <li>• Select appropriate sheath materials</li>
                <li>• Avoid PVC in high-temperature locations</li>
                <li>• Use LSZH cables where required</li>
              </ul>
            </div>

            <div className="bg-elec-dark p-4 rounded border border-green-600">
              <h5 className="font-medium text-green-300 mb-3">Wiring Methods</h5>
              <ul className="text-green-100 text-sm space-y-1">
                <li>• Concealed wiring preferred in Zones 1 & 2</li>
                <li>• Adequate mechanical protection required</li>
                <li>• Avoid horizontal cable runs in partition walls</li>
                <li>• Use appropriate cable clips and supports</li>
                <li>• Consider thermal effects of underfloor heating</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4">
          <h5 className="text-orange-200 font-semibold mb-3">Common Installation Errors</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="font-medium text-foreground mb-2">Incorrect Zone Identification</h6>
              <ul className="text-orange-100 text-sm space-y-1">
                <li>• Measuring from wrong reference points</li>
                <li>• Ignoring door openings and extensions</li>
                <li>• Treating moveable screens as boundaries</li>
                <li>• Not accounting for future alterations</li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium text-foreground mb-2">Equipment Placement Issues</h6>
              <ul className="text-orange-100 text-sm space-y-1">
                <li>• Installing prohibited items in restricted zones</li>
                <li>• Using inadequate IP ratings</li>
                <li>• Poor cable routing and protection</li>
                <li>• Insufficient RCD protection coverage</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
          <h5 className="text-green-200 font-semibold mb-3">Best Practice Recommendations</h5>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h6 className="font-medium text-foreground mb-2">Planning Phase</h6>
              <ul className="text-green-100 text-sm space-y-1">
                <li>• Create detailed zone drawings</li>
                <li>• Plan cable routes early</li>
                <li>• Consider future equipment needs</li>
                <li>• Coordinate with other trades</li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium text-foreground mb-2">Installation Phase</h6>
              <ul className="text-green-100 text-sm space-y-1">
                <li>• Double-check zone measurements</li>
                <li>• Use appropriate test equipment</li>
                <li>• Document deviations clearly</li>
                <li>• Photograph complex installations</li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium text-foreground mb-2">Verification Phase</h6>
              <ul className="text-green-100 text-sm space-y-1">
                <li>• Verify RCD operation</li>
                <li>• Test all protection devices</li>
                <li>• Check IP ratings are maintained</li>
                <li>• Complete thorough inspection</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};