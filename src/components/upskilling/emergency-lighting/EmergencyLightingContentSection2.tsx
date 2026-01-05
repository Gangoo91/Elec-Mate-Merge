import { MapPin, Building, Shield, AlertTriangle, CheckCircle, Eye, Navigation, DoorOpen } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingContentSection2 = () => {
  return (
    <div className="space-y-6">
      
      {/* BS5266 Requirements */}
      <Card className="bg-elec-gray border-gray-600 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Shield className="h-5 w-5 text-green-400" />
            BS5266 Location Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          
          <div className="p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
            <h4 className="text-green-400 font-semibold mb-3">Mandatory Emergency Lighting Locations</h4>
            <p className="text-sm mb-4">
              BS5266-1 specifies that emergency lighting must be provided in all areas where sudden loss 
              of normal lighting would present a hazard to occupants.
            </p>
            
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-foreground mb-2">Primary Locations:</h5>
                <ul className="space-y-1 text-gray-300">
                  <li>• All escape routes</li>
                  <li>• Exit doors and safety exits</li>
                  <li>• Stairways and level changes</li>
                  <li>• Corridor intersections</li>
                  <li>• Changes in direction &gt;45°</li>
                  <li>• Fire alarm call points</li>
                  <li>• Fire-fighting equipment locations</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-2">Additional Requirements:</h5>
                <ul className="space-y-1 text-gray-300">
                  <li>• Toilets exceeding 8m²</li>
                  <li>• Windowless areas</li>
                  <li>• Lift cars</li>
                  <li>• Moving walkways and escalators</li>
                  <li>• Plant rooms and switch rooms</li>
                  <li>• Motor generator and battery rooms</li>
                  <li>• Areas with high fire risk</li>
                </ul>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Escape Route Lighting */}
      <Card className="bg-elec-gray border-gray-600 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-400" />
            Escape Route Lighting Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-6">
          
          <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded-lg">
            <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
              <Navigation className="h-4 w-4" />
              Escape Route Categories
            </h4>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                
                <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded">
                  <h5 className="font-semibold text-blue-300 mb-2">Horizontal Routes</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Corridors and passageways</li>
                    <li>• Open areas forming escape routes</li>
                    <li>• Minimum 1 lux along centre line</li>
                    <li>• 0.5 lux minimum anywhere on route</li>
                    <li>• Maximum spacing: 3m apart</li>
                  </ul>
                </div>

                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded">
                  <h5 className="font-semibold text-green-300 mb-2">Vertical Routes</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Stairways and ramps</li>
                    <li>• Each flight and half-landing</li>
                    <li>• Minimum 1 lux on treads</li>
                    <li>• Light at top and bottom</li>
                    <li>• Maximum 2m vertical spacing</li>
                  </ul>
                </div>

                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded">
                  <h5 className="font-semibold text-amber-300 mb-2">Exit Points</h5>
                  <ul className="space-y-1 text-gray-300">
                    <li>• Final exit doors</li>
                    <li>• Outside immediate exit area</li>
                    <li>• Minimum 5 lux at exit</li>
                    <li>• External illumination required</li>
                    <li>• Within 2m of exit door</li>
                  </ul>
                </div>

              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            
            <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded-lg">
              <h5 className="font-semibold text-purple-400 mb-3 flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Visibility Requirements
              </h5>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Exit signs clearly visible from 20m</li>
                <li>• Safety signs illuminated to 5 lux</li>
                <li>• Uniform illumination - max:min ratio 40:1</li>
                <li>• Colour rendering sufficient for safety</li>
                <li>• No confusing shadows or glare</li>
              </ul>
            </div>

            <div className="p-4 bg-teal-600/10 border border-teal-600/30 rounded-lg">
              <h5 className="font-semibold text-teal-400 mb-3 flex items-center gap-2">
                <DoorOpen className="h-4 w-4" />
                Critical Decision Points
              </h5>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Changes in floor level</li>
                <li>• Direction changes &gt;45°</li>
                <li>• Junction of escape routes</li>
                <li>• Door positions and door handles</li>
                <li>• Fire door locations</li>
              </ul>
            </div>

          </div>

        </CardContent>
      </Card>

      {/* Building Type Specific Requirements */}
      <Card className="bg-elec-gray border-gray-600 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Building className="h-5 w-5 text-amber-400" />
            Building Type Specific Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            
            <div className="p-4 bg-red-600/10 border border-red-600/30 rounded-lg">
              <h5 className="font-semibold text-red-400 mb-3">Healthcare Facilities</h5>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Operating theatres - 3 hour duration</li>
                <li>• Patient treatment areas</li>
                <li>• Medicine preparation rooms</li>
                <li>• Critical care units</li>
                <li>• X-ray and diagnostic rooms</li>
                <li>• Sterile supply departments</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded-lg">
              <h5 className="font-semibold text-blue-400 mb-3">Educational Buildings</h5>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Assembly halls and gymnasiums</li>
                <li>• Laboratories and workshops</li>
                <li>• Library areas</li>
                <li>• Kitchen and food preparation</li>
                <li>• Boarding accommodation</li>
                <li>• Plant and service rooms</li>
              </ul>
            </div>

            <div className="p-4 bg-green-600/10 border border-green-600/30 rounded-lg">
              <h5 className="font-semibold text-green-400 mb-3">Commercial Premises</h5>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Open plan offices &gt;60m²</li>
                <li>• Reception and waiting areas</li>
                <li>• Conference and meeting rooms</li>
                <li>• Retail sales areas</li>
                <li>• Storage areas if occupied</li>
                <li>• Staff facilities</li>
              </ul>
            </div>

            <div className="p-4 bg-purple-600/10 border border-purple-600/30 rounded-lg">
              <h5 className="font-semibold text-purple-400 mb-3">Industrial Buildings</h5>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Production and process areas</li>
                <li>• Control rooms</li>
                <li>• Maintenance workshops</li>
                <li>• Chemical storage areas</li>
                <li>• Loading bays and docks</li>
                <li>• Hazardous substance areas</li>
              </ul>
            </div>

            <div className="p-4 bg-amber-600/10 border border-amber-600/30 rounded-lg">
              <h5 className="font-semibold text-amber-400 mb-3">Entertainment Venues</h5>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Stages and performance areas</li>
                <li>• Dressing rooms and backstage</li>
                <li>• Projection and control rooms</li>
                <li>• Bars and catering areas</li>
                <li>• Guest accommodation</li>
                <li>• Technical equipment rooms</li>
              </ul>
            </div>

            <div className="p-4 bg-teal-600/10 border border-teal-600/30 rounded-lg">
              <h5 className="font-semibold text-teal-400 mb-3">Residential Care</h5>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Sleeping accommodation</li>
                <li>• Common rooms and lounges</li>
                <li>• Dining areas</li>
                <li>• Therapy and treatment rooms</li>
                <li>• Staff accommodation</li>
                <li>• Laundry and service areas</li>
              </ul>
            </div>

          </div>

        </CardContent>
      </Card>

      {/* High Risk Areas */}
      <Card className="bg-elec-gray border-gray-600 shadow-lg">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            High Risk and Special Requirement Areas
          </CardTitle>
        </CardHeader>
        <CardContent className="text-gray-300 space-y-4">
          
          <div className="p-4 bg-red-600/10 border border-red-600/30 rounded-lg">
            <h4 className="text-red-400 font-semibold mb-3">Areas of Special Fire Risk</h4>
            <div className="grid md:grid-cols-2 gap-4 text-sm">
              <div>
                <h5 className="font-medium text-foreground mb-2">High Fire Load Areas:</h5>
                <ul className="space-y-1 text-gray-300">
                  <li>• Stores containing combustible materials</li>
                  <li>• Workshops with flammable substances</li>
                  <li>• Paint stores and spray booths</li>
                  <li>• Chemical storage areas</li>
                  <li>• Fuel storage and plant rooms</li>
                </ul>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-2">Additional Requirements:</h5>
                <ul className="space-y-1 text-gray-300">
                  <li>• Higher illumination levels required</li>
                  <li>• Explosion-proof luminaires</li>
                  <li>• Enhanced duration (often 3 hours)</li>
                  <li>• Additional escape route lighting</li>
                  <li>• Emergency action area lighting</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            
            <div className="p-4 bg-amber-600/10 border border-amber-600/30 rounded-lg">
              <h5 className="font-semibold text-amber-400 mb-3">Plant and Service Rooms</h5>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Electrical switch rooms and distribution</li>
                <li>• Heating and ventilation plant</li>
                <li>• Pump rooms and water treatment</li>
                <li>• Generator and UPS rooms</li>
                <li>• Lift motor rooms</li>
                <li>• Building management system rooms</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-600/10 border border-blue-600/30 rounded-lg">
              <h5 className="font-semibold text-blue-400 mb-3">Disabled Refuge Areas</h5>
              <ul className="space-y-1 text-sm text-gray-300">
                <li>• Enhanced illumination - minimum 5 lux</li>
                <li>• Communication point lighting</li>
                <li>• Clear visibility of instructions</li>
                <li>• Extended duration requirements</li>
                <li>• Visual and audible indicators</li>
                <li>• Easy maintenance access</li>
              </ul>
            </div>

          </div>

        </CardContent>
      </Card>

    </div>
  );
};