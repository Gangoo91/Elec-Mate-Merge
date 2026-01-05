import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Sun, Eye, Thermometer, Zap, Shield, Settings, Clock, Camera } from 'lucide-react';

export const BMSModule4Section4Content = () => {
  return (
    <div className="space-y-8">
      {/* Solar Management in BMS */}
      <Card className="bg-elec-gray border-gray-700">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Sun className="h-5 w-5 text-elec-yellow" />
            Solar Management and Shading Control Systems
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p>
            Façade automation and shading systems are sophisticated building components that manage solar heat gain, glare control, and daylight harvesting. When properly integrated with a Building Management System (BMS), these systems can reduce building energy consumption by 20-40% while significantly improving occupant comfort and workplace productivity.
          </p>

          <p>
            Modern intelligent façades respond to multiple environmental variables including solar irradiance, wind speed, external temperature, occupancy patterns, and even weather forecasts to optimise building performance throughout the day.
          </p>

          {/* Mobile-Friendly Integration Cards */}
          <div className="grid gap-4 sm:grid-cols-1 lg:grid-cols-2">
            <div className="bg-gradient-to-br from-yellow-900/30 to-yellow-800/20 border border-yellow-600/40 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Thermometer className="h-6 w-6 text-elec-yellow" />
                <h4 className="font-semibold text-elec-yellow">Solar Heat Gain Management</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Function:</strong> Automated shading reduces solar loads by up to 70%</p>
                <p><strong>Benefit:</strong> Significant reduction in cooling energy and HVAC load</p>
                <p><strong>Example:</strong> External blinds close when solar irradiance exceeds 300W/m²</p>
                <p><strong>Advanced Feature:</strong> Predictive control using weather forecast data</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-900/30 to-blue-800/20 border border-blue-600/40 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Eye className="h-6 w-6 text-blue-400" />
                <h4 className="font-semibold text-blue-300">Daylight Harvesting</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Function:</strong> Automated dimming based on natural light levels</p>
                <p><strong>Benefit:</strong> Reduces artificial lighting energy by 40-60%</p>
                <p><strong>Example:</strong> Light sensors adjust blinds to maintain 500 lux at desk height</p>
                <p><strong>Advanced Feature:</strong> Individual zone control based on occupancy detection</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-600/40 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Shield className="h-6 w-6 text-green-400" />
                <h4 className="font-semibold text-green-300">Glare Protection</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Function:</strong> Automatic adjustment to prevent visual discomfort</p>
                <p><strong>Benefit:</strong> Improved workplace productivity and occupant satisfaction</p>
                <p><strong>Example:</strong> Blinds adjust based on solar angle and workstation position</p>
                <p><strong>Advanced Feature:</strong> Individual user preference learning and adaptation</p>
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-purple-800/20 border border-purple-600/40 rounded-lg p-4">
              <div className="flex items-center gap-3 mb-3">
                <Settings className="h-6 w-6 text-purple-400" />
                <h4 className="font-semibold text-purple-300">Integrated Control</h4>
              </div>
              <div className="space-y-2 text-sm">
                <p><strong>Function:</strong> Coordination with HVAC, lighting, and security systems</p>
                <p><strong>Benefit:</strong> Holistic building performance optimisation</p>
                <p><strong>Example:</strong> Shading adjusts based on HVAC load predictions</p>
                <p><strong>Advanced Feature:</strong> Machine learning algorithms for performance optimisation</p>
              </div>
            </div>
          </div>

          <div className="bg-blue-600/20 border border-blue-600/40 rounded-lg p-4">
            <p className="text-blue-100">
              <strong>Real-world scenario:</strong> A commercial office uses intelligent electrochromic glass that automatically transitions from clear to tinted based on solar conditions. The system communicates with the BMS to pre-cool spaces before peak solar load, reducing chiller energy by 25% while maintaining optimal daylight levels for productivity.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};