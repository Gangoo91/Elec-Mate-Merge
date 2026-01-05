import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin } from 'lucide-react';

export const ZoneClassificationSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Zone Classification System
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-elec-yellow text-elec-dark">BS 7671 Section 701</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p>
          The zone system provides a systematic approach to electrical safety in wet locations by defining areas based on the likelihood of water contact and the associated risk levels.
        </p>

        <div className="grid gap-4">
          <div className="bg-elec-dark p-4 rounded-lg border border-red-600">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-red-300">Zone 0</h4>
              <Badge className="bg-red-600 text-foreground">Highest Risk</Badge>
            </div>
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-foreground mb-2">Location:</h5>
                <p className="text-red-100 text-sm">Interior of bath tub or shower tray. Any area where water accumulates and people may be in direct contact with water.</p>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-2">Restrictions:</h5>
                <ul className="text-red-100 text-sm space-y-1">
                  <li>• No electrical equipment permitted except SELV ≤12V</li>
                  <li>• Only essential fittings directly related to bathing</li>
                  <li>• No switches, socket outlets, or accessories</li>
                  <li>• Special consideration for integral bath/shower controls</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-orange-600">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-orange-300">Zone 1</h4>
              <Badge className="bg-orange-600 text-foreground">High Risk</Badge>
            </div>
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-foreground mb-2">Location:</h5>
                <p className="text-orange-100 text-sm">Above Zone 0, up to 2.25m height. Limited by vertical surfaces of bath/shower enclosure or 0.6m from bath/shower edge if no enclosure.</p>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-2">Permitted Equipment:</h5>
                <ul className="text-orange-100 text-sm space-y-1">
                  <li>• Water heaters and pumps (if suitable for zone)</li>
                  <li>• Ventilation equipment with IPX4 minimum</li>
                  <li>• SELV circuits ≤25V with safety isolating transformer outside zones</li>
                  <li>• Fixed luminaires with appropriate IP rating</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-yellow-600">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-yellow-300">Zone 2</h4>
              <Badge className="bg-yellow-600 text-elec-dark">Medium Risk</Badge>
            </div>
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-foreground mb-2">Location:</h5>
                <p className="text-yellow-100 text-sm">0.6m horizontal distance from Zone 1 boundary, up to 2.25m height. Areas likely to be wet during normal use.</p>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-2">Permitted Equipment:</h5>
                <ul className="text-yellow-100 text-sm space-y-1">
                  <li>• All Zone 1 equipment plus additional items</li>
                  <li>• Luminaires, fans, heating appliances (with IPX4)</li>
                  <li>• Shaver socket outlets to BS EN 61558-2-5</li>
                  <li>• Equipment connected via SELV or Class II construction</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-elec-dark p-4 rounded-lg border border-green-600">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-green-300">Outside Zones</h4>
              <Badge className="bg-green-600 text-foreground">Standard Requirements</Badge>
            </div>
            <div className="space-y-3">
              <div>
                <h5 className="font-medium text-foreground mb-2">Location:</h5>
                <p className="text-green-100 text-sm">Beyond Zone 2 boundaries or above 2.25m height. Areas not expected to be subject to water splashing during normal use.</p>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-2">Requirements:</h5>
                <ul className="text-green-100 text-sm space-y-1">
                  <li>• Standard installation requirements apply</li>
                  <li>• RCD protection still required for socket outlets</li>
                  <li>• Normal IP ratings acceptable (typically IP20)</li>
                  <li>• Standard switches and accessories permitted</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
          <h5 className="text-blue-200 font-semibold mb-2">Zone Measurement Guidelines</h5>
          <p className="text-blue-100 text-sm mb-3">Accurate measurement is critical for compliance. Key principles:</p>
          <ul className="text-blue-100 text-sm space-y-1">
            <li>• Measure from finished floor level, not structural floor</li>
            <li>• Use the rim of bath/shower as horizontal reference point</li>
            <li>• Consider door openings - zones extend through permanent openings</li>
            <li>• Fixed partitions form zone boundaries if ≥2.25m high</li>
            <li>• Moveable partitions (shower curtains) do not form boundaries</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};