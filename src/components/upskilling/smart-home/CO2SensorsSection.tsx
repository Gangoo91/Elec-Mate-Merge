import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud } from 'lucide-react';

export const CO2SensorsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Cloud className="h-5 w-5 text-elec-yellow" />
          CO₂ Sensors
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          CO₂ sensors measure carbon dioxide levels in parts per million (ppm), providing an excellent indicator of indoor air quality and ventilation effectiveness in occupied spaces.
        </p>
        
        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">CO₂ Level Guidelines</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="text-center p-3 bg-green-600/10 border border-green-600/30 rounded">
              <div className="text-xl font-bold text-green-400">&lt;800 ppm</div>
              <div className="text-xs text-green-200">Excellent</div>
            </div>
            <div className="text-center p-3 bg-yellow-600/10 border border-yellow-600/30 rounded">
              <div className="text-xl font-bold text-yellow-400">800-1000 ppm</div>
              <div className="text-xs text-yellow-200">Acceptable</div>
            </div>
            <div className="text-center p-3 bg-red-600/10 border border-red-600/30 rounded">
              <div className="text-xl font-bold text-red-400">&gt;1000 ppm</div>
              <div className="text-xs text-red-200">Poor - Action Needed</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-elec-gray border border-red-600 rounded-lg p-4">
            <h4 className="font-semibold text-red-200 mb-3">High CO₂ Effects (&gt;1000 ppm)</h4>
            <ul className="space-y-2 text-sm text-red-100">
              <li>• Reduced concentration and focus</li>
              <li>• Drowsiness and fatigue</li>
              <li>• Headaches and stuffiness</li>
              <li>• Decreased cognitive performance</li>
              <li>• Poor decision-making ability</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-blue-600 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-3">Automatic Response</h4>
            <ul className="space-y-2 text-sm text-blue-100">
              <li>• Increase fresh air ventilation</li>
              <li>• Boost mechanical ventilation rates</li>
              <li>• Open automated windows/vents</li>
              <li>• Trigger air quality alerts</li>
              <li>• Adjust HVAC operation schedules</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Common Applications</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-green-200 mb-2">Educational Buildings</h5>
              <ul className="space-y-1 text-gray-300">
                <li>• Classrooms and lecture halls</li>
                <li>• Libraries and study areas</li>
                <li>• Meeting and conference rooms</li>
                <li>• Examination halls</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-purple-200 mb-2">Commercial Spaces</h5>
              <ul className="space-y-1 text-gray-300">
                <li>• Open-plan offices</li>
                <li>• Boardrooms and meeting rooms</li>
                <li>• Retail environments</li>
                <li>• Healthcare facilities</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Integration Benefits</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-blue-200 mb-2">Demand-Controlled Ventilation</h5>
              <p className="text-gray-300">Automatically adjusts ventilation rates based on actual occupancy rather than fixed schedules.</p>
            </div>
            <div>
              <h5 className="font-medium text-green-200 mb-2">Energy Savings</h5>
              <p className="text-gray-300">Reduces over-ventilation during low occupancy periods, saving heating and cooling energy.</p>
            </div>
            <div>
              <h5 className="font-medium text-purple-200 mb-2">Occupant Wellbeing</h5>
              <p className="text-gray-300">Maintains optimal air quality for cognitive performance and general health.</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};