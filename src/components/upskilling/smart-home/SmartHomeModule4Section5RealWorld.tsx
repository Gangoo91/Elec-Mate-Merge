import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ArrowRight } from 'lucide-react';

export const SmartHomeModule4Section5RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Users className="h-5 w-5 text-elec-yellow" />
          Real-World Scenario
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p className="leading-relaxed">
          A client installs a new AC system alongside their existing boiler. Without integration, the AC runs while heating is on, 
          causing huge energy bills. An installer adds an interlock: when cooling is active, heating is disabled. Bills drop by 20%.
        </p>

        <div className="bg-gradient-to-br from-red-900/30 to-blue-900/30 border border-gray-600 rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-red-950/40 border border-red-500 rounded-lg p-4">
              <h4 className="font-semibold text-red-200 mb-3 flex items-center gap-2">
                Before Integration
              </h4>
              <div className="space-y-2 text-sm">
                <p><strong>Problem:</strong> AC and heating running simultaneously</p>
                <p><strong>Energy Waste:</strong> Systems working against each other</p>
                <p><strong>Bill Impact:</strong> £200+ monthly increase</p>
                <p className="text-red-200"><strong>Comfort:</strong> Inconsistent temperatures and drafts</p>
              </div>
            </div>

            <div className="bg-green-950/40 border border-green-500 rounded-lg p-4">
              <h4 className="font-semibold text-green-200 mb-3 flex items-center gap-2">
                After Interlock Installation
              </h4>
              <div className="space-y-2 text-sm">
                <p><strong>Solution:</strong> Smart thermostat with interlocks</p>
                <p><strong>Operation:</strong> Only one system active at a time</p>
                <p><strong>Savings:</strong> 20% reduction in energy bills</p>
                <p className="text-green-200"><strong>Comfort:</strong> Stable temperatures throughout</p>
              </div>
            </div>
          </div>

          <div className="mt-6 bg-blue-950/30 border border-blue-500 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <ArrowRight className="h-5 w-5 text-blue-400" />
              <h4 className="font-semibold text-blue-200">Additional Efficiency Opportunities</h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-blue-100 mb-2"><strong>Window Sensors:</strong></p>
                <p className="text-blue-200">Pause HVAC when windows are opened, preventing energy waste from conditioning outdoor air.</p>
              </div>
              <div>
                <p className="text-blue-100 mb-2"><strong>Occupancy Detection:</strong></p>
                <p className="text-blue-200">Reduce heating/cooling in unoccupied rooms using motion sensors and smart dampers.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-purple-950/30 border border-purple-500 rounded-lg p-4">
          <p className="font-semibold text-purple-200 mb-2">Learner Question:</p>
          <p className="text-purple-100 italic">
            "What additional interlocks could improve efficiency further in this scenario?"
          </p>
        </div>

        <div className="bg-[#1a1a1a] border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Potential Additional Interlocks:</h4>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></div>
              Smart blinds integration to reduce cooling load during hot days
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></div>
              CO₂ sensors to trigger ventilation instead of heating/cooling
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></div>
              Zone control with individual room thermostats and dampers
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></div>
              Time-of-use tariff integration for peak demand reduction
            </li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};