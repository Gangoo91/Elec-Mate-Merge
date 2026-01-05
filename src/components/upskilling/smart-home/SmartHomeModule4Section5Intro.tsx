import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Settings, Zap, Shield } from 'lucide-react';

export const SmartHomeModule4Section5Intro = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Settings className="h-5 w-5 text-elec-yellow" />
          Introduction to HVAC Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-6">
        <p className="leading-relaxed">
          Heating, ventilation, and air conditioning (HVAC) systems often run simultaneously in homes and commercial buildings. 
          Without proper integration and interlocks, heating and cooling can work against each other, wasting energy and reducing comfort. 
          Smart controls ensure that HVAC systems operate in harmony, responding to sensors, schedules, and user demands.
        </p>

        {/* Key Concept Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
          <div className="bg-gradient-to-br from-blue-950/50 to-blue-900/30 border border-blue-600 rounded-lg p-4 hover:from-blue-900/60 hover:to-blue-800/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <Settings className="h-5 w-5 text-blue-400" />
              <h3 className="font-semibold text-blue-200">Integration</h3>
            </div>
            <p className="text-blue-100 text-sm">
              Connecting heating, cooling, and ventilation systems into one coordinated control network for optimal performance.
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-950/50 to-green-900/30 border border-green-600 rounded-lg p-4 hover:from-green-900/60 hover:to-green-800/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <Shield className="h-5 w-5 text-green-400" />
              <h3 className="font-semibold text-green-200">Interlocks</h3>
            </div>
            <p className="text-green-100 text-sm">
              Safety and efficiency features that prevent conflicting systems from operating simultaneously, reducing waste.
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-950/50 to-purple-900/30 border border-purple-600 rounded-lg p-4 hover:from-purple-900/60 hover:to-purple-800/40 transition-all duration-300">
            <div className="flex items-center gap-3 mb-3">
              <Zap className="h-5 w-5 text-purple-400" />
              <h3 className="font-semibold text-purple-200">Efficiency</h3>
            </div>
            <p className="text-purple-100 text-sm">
              Smart coordination prevents energy waste, extends equipment life, and maintains optimal comfort levels throughout the building.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};