import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Sun, Settings, Network, AlertTriangle } from 'lucide-react';

export const BMSModule4Section4Summary = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <p>
          This section explored the critical role of shading, blinds, and façade automation in modern building performance and their integration with Building Management Systems.
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg">
              <Sun className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Solar Control Systems</h4>
                <p className="text-sm text-gray-300">Shading systems reduce solar gain and glare while supporting optimal daylighting and comfort.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg">
              <Settings className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Automated Integration</h4>
                <p className="text-sm text-gray-300">BMS coordination ensures shading works with HVAC and lighting for maximum efficiency.</p>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg">
              <Network className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Professional Installation</h4>
                <p className="text-sm text-gray-300">Electricians must install motors, relays, and sensors with proper safety and labelling.</p>
              </div>
            </div>
            
            <div className="flex items-start gap-3 p-4 bg-gray-800 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-semibold mb-2">Commissioning Excellence</h4>
                <p className="text-sm text-gray-300">Correct commissioning and integration ensure energy savings without disrupting occupants.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Technology Summary */}
        <div className="space-y-4">
          <h4 className="text-xl font-semibold text-elec-yellow">Key Technologies Covered</h4>
          
          <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-blue-900/30 border border-blue-600/40 rounded-lg p-3">
              <h5 className="font-semibold mb-2 text-blue-300 text-sm">Motorised Blinds</h5>
              <p className="text-xs text-gray-300">Automated venetian blinds, roller shades, and vertical louvers</p>
            </div>
            
            <div className="bg-purple-900/30 border border-purple-600/40 rounded-lg p-3">
              <h5 className="font-semibold mb-2 text-purple-300 text-sm">Dynamic Façades</h5>
              <p className="text-xs text-gray-300">Kinetic architecture and responsive building envelopes</p>
            </div>
            
            <div className="bg-green-900/30 border border-green-600/40 rounded-lg p-3">
              <h5 className="font-semibold mb-2 text-green-300 text-sm">Smart Glass</h5>
              <p className="text-xs text-gray-300">Electrochromic and thermochromic glazing systems</p>
            </div>
            
            <div className="bg-orange-900/30 border border-orange-600/40 rounded-lg p-3">
              <h5 className="font-semibold mb-2 text-orange-300 text-sm">Solar Integration</h5>
              <p className="text-xs text-gray-300">PV-integrated shading and energy-generating louvers</p>
            </div>
          </div>
        </div>

        <div className="bg-elec-yellow/20 border border-elec-yellow/40 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-elec-yellow">Performance Impact</h4>
          <ul className="space-y-2 text-sm text-foreground">
            <li>• Energy savings of 15-30% through intelligent solar control</li>
            <li>• Cooling load reductions up to 25% during peak periods</li>
            <li>• Improved occupant comfort and productivity</li>
            <li>• Enhanced natural lighting while controlling glare</li>
            <li>• Coordinated building systems for optimal performance</li>
            <li>• Rapid payback through reduced operating costs</li>
          </ul>
        </div>

        <div className="bg-red-600/20 border border-red-600/40 rounded-lg p-4">
          <h4 className="font-semibold mb-2 text-red-400">Critical Installation Points</h4>
          <ul className="space-y-2 text-sm text-foreground">
            <li>• Proper sensor positioning is essential for accurate control</li>
            <li>• Cable segregation prevents interference and false signals</li>
            <li>• End-stop protection prevents motor and blind damage</li>
            <li>• Fire safety integration ensures emergency compliance</li>
            <li>• Weather protection systems prevent storm damage</li>
            <li>• Regular maintenance ensures long-term reliability</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};