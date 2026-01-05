import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export const SmartHomeModule4Section1RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <MapPin className="h-5 w-5 text-elec-yellow" />
          Real-World Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <div className="p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600 rounded-lg">
          <h4 className="font-semibold text-foreground mb-4">The Overheating Bedroom Problem</h4>
          
          <div className="space-y-6">
            <div>
              <h5 className="font-medium text-red-200 mb-3">Initial Problem</h5>
              <p className="text-gray-300 mb-4">
                A homeowner installs a Nest thermostat controlling the whole house. They later complain that 
                bedrooms overheat while the living room is comfortable. The single thermostat location creates 
                uneven heating throughout the property, leading to discomfort and wasted energy.
              </p>
              <p className="text-gray-300 mb-4">
                The thermostat, located in the hallway near the living room, reads the temperature there and 
                assumes this represents the whole house. However, bedrooms on the upper floor receive more heat 
                due to rising warm air and different sun exposure, whilst the living room with large windows 
                loses heat quickly.
              </p>
              <p className="text-gray-300">
                This common scenario affects many UK homes where a single heating zone serves multiple rooms 
                with different thermal characteristics, orientation, and usage patterns.
              </p>
            </div>
            
            <div>
              <h5 className="font-medium text-green-200 mb-3">Zoning Solution Implementation</h5>
              <p className="text-gray-300 mb-4">
                The installer upgrades the system with smart TRVs on radiators, creating individual zones. 
                This allows each room to have independent temperature control based on its specific needs 
                and usage patterns.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <h6 className="font-medium text-foreground mb-2">Zone Configuration</h6>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Living room: 21°C during day, 18°C evening</li>
                    <li>• Main bedroom: 18°C day, 16°C night</li>
                    <li>• Children's rooms: 19°C day, 17°C night</li>
                    <li>• Spare room: 15°C or off when unused</li>
                    <li>• Hallway: 18°C during occupied hours</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-foreground mb-2">Smart Features Added</h6>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Individual room scheduling via app</li>
                    <li>• Presence detection for automatic control</li>
                    <li>• Window open detection</li>
                    <li>• Energy monitoring per zone</li>
                    <li>• Voice control integration</li>
                  </ul>
                </div>
              </div>
              
              <p className="text-gray-300">
                The system now responds to actual room conditions rather than a single point measurement, 
                providing personalised comfort while reducing energy waste in unoccupied spaces.
              </p>
            </div>
            
            <div>
              <h5 className="font-medium text-blue-200 mb-3">Results and Benefits</h5>
              <p className="text-gray-300 mb-4">
                After installation, the homeowner reported immediate improvements in comfort and a 25% 
                reduction in heating bills. The bedrooms no longer overheat, and the family can customise 
                temperatures for different activities and preferences.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="text-2xl font-bold text-green-400">25%</div>
                  <div className="text-xs text-green-200">Energy Savings</div>
                </div>
                <div className="text-center p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="text-2xl font-bold text-blue-400">6</div>
                  <div className="text-xs text-blue-200">Independent Zones</div>
                </div>
                <div className="text-center p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="text-2xl font-bold text-purple-400">100%</div>
                  <div className="text-xs text-purple-200">Comfort Satisfaction</div>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-orange-200 mb-3">Future Expansion Possibilities</h5>
              <p className="text-gray-300 mb-4">
                The zoning system provides a foundation for further smart home integration. Potential 
                additions include occupancy sensors, smart blinds for solar gain control, and integration 
                with renewable energy systems for optimised heating timing.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h6 className="font-medium text-foreground mb-2">Short-term Additions</h6>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• PIR sensors for presence detection</li>
                    <li>• Smart thermostatic radiator valves in remaining rooms</li>
                    <li>• Integration with existing smart lighting</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-foreground mb-2">Long-term Integration</h6>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Solar PV system coordination</li>
                    <li>• Heat pump upgrade compatibility</li>
                    <li>• Whole-house energy management</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-[#0f0f0f] border border-gray-600 rounded">
            <h5 className="font-medium text-elec-yellow mb-3">Discussion Questions:</h5>
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm">How did zoning solve the client's problem?</p>
                <p className="text-gray-400 text-xs mt-1">Consider the temperature control precision and energy efficiency improvements.</p>
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">What further improvements could be suggested?</p>
                <p className="text-gray-400 text-xs mt-1">Think about additional sensors, automation, and integration opportunities.</p>
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">How might this affect energy bills and comfort?</p>
                <p className="text-gray-400 text-xs mt-1">Analyse both immediate and long-term benefits for the homeowner.</p>
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">What installation challenges might arise in similar properties?</p>
                <p className="text-gray-400 text-xs mt-1">Consider different property types, heating systems, and retrofit complexities.</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};