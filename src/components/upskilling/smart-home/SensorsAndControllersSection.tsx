import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gauge } from 'lucide-react';

export const SensorsAndControllersSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Gauge className="h-5 w-5 text-elec-yellow" />
          5. Sensors and Controllers in Integration
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p className="leading-relaxed">
          Sensors provide real-time data whilst controllers make intelligent decisions based on this information. 
          Together, they form the foundation of effective HVAC integration and interlock systems.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Key Sensors:</h4>
            
            <div className="space-y-3">
              <div className="bg-blue-950/30 border border-blue-600 rounded-lg p-3">
                <h5 className="font-medium text-blue-200 mb-2">Temperature Sensors</h5>
                <p className="text-sm text-blue-100">Monitor room and outdoor temperatures to determine heating/cooling needs.</p>
              </div>
              
              <div className="bg-green-950/30 border border-green-600 rounded-lg p-3">
                <h5 className="font-medium text-green-200 mb-2">Humidity Sensors</h5>
                <p className="text-sm text-green-100">Track moisture levels to control dehumidification and ventilation systems.</p>
              </div>
              
              <div className="bg-purple-950/30 border border-purple-600 rounded-lg p-3">
                <h5 className="font-medium text-purple-200 mb-2">CO₂ Sensors</h5>
                <p className="text-sm text-purple-100">Measure air quality to trigger ventilation when levels become unhealthy.</p>
              </div>
              
              <div className="bg-orange-950/30 border border-orange-600 rounded-lg p-3">
                <h5 className="font-medium text-orange-200 mb-2">Occupancy Sensors</h5>
                <p className="text-sm text-orange-100">Detect presence to enable energy-saving modes when rooms are unoccupied.</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Controller Functions:</h4>
            
            <div className="bg-[#1a1a1a] border border-gray-600 rounded-lg p-4 mb-4">
              <h5 className="font-medium text-foreground mb-3">Decision Logic Examples:</h5>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <code className="bg-red-950/50 text-red-200 px-2 py-1 rounded text-xs">IF</code>
                  <span className="text-gray-300">cooling active</span>
                  <code className="bg-red-950/50 text-red-200 px-2 py-1 rounded text-xs">THEN</code>
                  <span className="text-gray-300">disable heating</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="bg-blue-950/50 text-blue-200 px-2 py-1 rounded text-xs">IF</code>
                  <span className="text-gray-300">windows open</span>
                  <code className="bg-blue-950/50 text-blue-200 px-2 py-1 rounded text-xs">THEN</code>
                  <span className="text-gray-300">pause HVAC</span>
                </div>
                <div className="flex items-center gap-2">
                  <code className="bg-green-950/50 text-green-200 px-2 py-1 rounded text-xs">IF</code>
                  <span className="text-gray-300">CO₂ &gt; 1000ppm</span>
                  <code className="bg-green-950/50 text-green-200 px-2 py-1 rounded text-xs">THEN</code>
                  <span className="text-gray-300">increase ventilation</span>
                </div>
              </div>
            </div>

            <h5 className="font-medium text-foreground">Controller Types:</h5>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                <strong>BMS:</strong> Building Management Systems for commercial applications
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                <strong>Smart Hubs:</strong> Home Assistant, KNX, Crestron, Loxone for residential use
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                <strong>Smart Thermostats:</strong> Built-in interlock capabilities for basic integration
              </li>
              <li className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 bg-elec-yellow rounded-full mt-1.5 flex-shrink-0"></div>
                <strong>Dedicated HVAC Controllers:</strong> Purpose-built for complex HVAC coordination
              </li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};