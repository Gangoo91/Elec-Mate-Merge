import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Droplets } from 'lucide-react';

export const HumiditySensorsSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Droplets className="h-5 w-5 text-elec-yellow" />
          Humidity Sensors
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Humidity sensors measure relative humidity (RH %) in the air, providing critical data for maintaining comfortable and healthy indoor environments whilst protecting building fabric.
        </p>
        
        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Optimal Humidity Range</h4>
          <div className="text-center mb-4">
            <div className="text-3xl font-bold text-elec-yellow">40-60%</div>
            <div className="text-sm text-gray-400">Relative Humidity (RH)</div>
          </div>
          <p className="text-sm text-center">
            This range minimises health risks whilst protecting building materials and ensuring occupant comfort.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-elec-gray border border-red-600 rounded-lg p-4">
            <h4 className="font-semibold text-red-200 mb-3">Too Low (&lt;40%)</h4>
            <ul className="space-y-2 text-sm text-red-100">
              <li>• Dry air and respiratory irritation</li>
              <li>• Increased static electricity</li>
              <li>• Cracked skin and lips</li>
              <li>• Dry eyes and throat</li>
              <li>• Increased virus transmission</li>
            </ul>
          </div>
          
          <div className="bg-elec-gray border border-orange-600 rounded-lg p-4">
            <h4 className="font-semibold text-orange-200 mb-3">Too High (&gt;60%)</h4>
            <ul className="space-y-2 text-sm text-orange-100">
              <li>• Mould and mildew growth</li>
              <li>• Dust mite proliferation</li>
              <li>• Building fabric damage</li>
              <li>• Condensation problems</li>
              <li>• Musty odours</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Humidity Control Methods</h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-blue-200 mb-2">Humidification</h5>
              <ul className="space-y-1 text-gray-300">
                <li>• Steam humidifiers</li>
                <li>• Evaporative coolers</li>
                <li>• Ultrasonic humidifiers</li>
                <li>• HVAC integration</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-green-200 mb-2">Dehumidification</h5>
              <ul className="space-y-1 text-gray-300">
                <li>• Refrigerative dehumidifiers</li>
                <li>• Desiccant dehumidifiers</li>
                <li>• Ventilation systems</li>
                <li>• Heat recovery ventilators</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-purple-200 mb-2">Smart Integration</h5>
              <ul className="space-y-1 text-gray-300">
                <li>• Automatic humidity control</li>
                <li>• Weather compensation</li>
                <li>• Zone-based management</li>
                <li>• Energy optimisation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Sensor Types and Applications</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-yellow-200 mb-2">Capacitive Sensors</h5>
              <p className="text-gray-300 mb-2">Most common type, using polymer film that changes capacitance with humidity.</p>
              <p className="text-xs text-gray-400">Accurate, stable, moderate cost</p>
            </div>
            <div>
              <h5 className="font-medium text-cyan-200 mb-2">Resistive Sensors</h5>
              <p className="text-gray-300 mb-2">Use salt or polymer that changes resistance with moisture content.</p>
              <p className="text-xs text-gray-400">Lower cost, less accurate</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};