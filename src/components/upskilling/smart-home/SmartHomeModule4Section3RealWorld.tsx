import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export const SmartHomeModule4Section3RealWorld = () => {
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
          <h4 className="font-semibold text-foreground mb-4">The School Air Quality Transformation</h4>
          
          <div className="space-y-6">
            <div>
              <h5 className="font-medium text-blue-200 mb-3">The Initiative</h5>
              <p className="text-gray-300 mb-4">
                A primary school installs CO₂ sensors in all 20 classrooms as part of a health and productivity improvement programme. The sensors are connected to the building management system (BMS) to automatically control ventilation based on real-time air quality data.
              </p>
              <p className="text-gray-300">
                Previously, the school used fixed ventilation schedules that operated at maximum capacity during school hours, regardless of actual occupancy or air quality conditions.
              </p>
            </div>
            
            <div>
              <h5 className="font-medium text-green-200 mb-3">System Implementation</h5>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <h6 className="font-medium text-foreground mb-2">Sensor Network</h6>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• CO₂ sensors in each classroom</li>
                    <li>• BACnet integration with existing BMS</li>
                    <li>• Real-time monitoring dashboard</li>
                    <li>• Automatic ventilation control</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-foreground mb-2">Control Strategy</h6>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Target: &lt;1000 ppm CO₂</li>
                    <li>• Boost ventilation at 900 ppm</li>
                    <li>• Maximum increase at 1200 ppm</li>
                    <li>• Night setback when unoccupied</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-purple-200 mb-3">Immediate Results</h5>
              <p className="text-gray-300 mb-4">
                Within the first term of operation, teachers report significant improvements in classroom conditions. Student concentration appears better, and there are fewer complaints about stuffy air or headaches during afternoon lessons.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-green-600/10 border border-green-600/30 rounded">
                  <div className="text-2xl font-bold text-green-400">80%</div>
                  <div className="text-xs text-green-200">Reduction in drowsiness complaints</div>
                </div>
                <div className="text-center p-3 bg-blue-600/10 border border-blue-600/30 rounded">
                  <div className="text-2xl font-bold text-blue-400">25%</div>
                  <div className="text-xs text-blue-200">Energy savings from optimised ventilation</div>
                </div>
                <div className="text-center p-3 bg-purple-600/10 border border-purple-600/30 rounded">
                  <div className="text-2xl font-bold text-purple-400">95%</div>
                  <div className="text-xs text-purple-200">Time CO₂ levels below 1000 ppm</div>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-orange-200 mb-3">Maintenance Importance</h5>
              <p className="text-gray-300 mb-4">
                Six months after installation, some sensors begin showing unusual readings. Investigation reveals that several sensors have accumulated dust and require cleaning. One sensor in a particularly dusty classroom needs recalibration.
              </p>
              
              <div className="p-3 bg-red-600/10 border border-red-600/30 rounded">
                <h6 className="font-medium text-red-200 mb-2">What Happens Without Calibration?</h6>
                <ul className="text-sm text-red-100 space-y-1">
                  <li>• Sensors provide inaccurate readings</li>
                  <li>• Ventilation systems respond inappropriately</li>
                  <li>• Energy waste from over or under-ventilation</li>
                  <li>• Poor air quality may go undetected</li>
                  <li>• Loss of occupant confidence in the system</li>
                </ul>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-cyan-200 mb-3">Long-term Benefits</h5>
              <p className="text-gray-300 mb-4">
                After implementing a proper maintenance schedule including quarterly sensor cleaning and annual calibration, the system continues to deliver excellent results. The school reports improved attendance rates and better academic performance in monitored classrooms.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h6 className="font-medium text-foreground mb-2">Educational Benefits</h6>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• Improved student concentration</li>
                    <li>• Reduced afternoon fatigue</li>
                    <li>• Better test performance data</li>
                    <li>• Teaching staff satisfaction increase</li>
                  </ul>
                </div>
                <div>
                  <h6 className="font-medium text-foreground mb-2">Operational Benefits</h6>
                  <ul className="text-sm text-gray-300 space-y-1">
                    <li>• 25% reduction in HVAC energy costs</li>
                    <li>• Reduced maintenance complaints</li>
                    <li>• Compliance with health guidelines</li>
                    <li>• Data for future building improvements</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-[#0f0f0f] border border-gray-600 rounded">
            <h5 className="font-medium text-elec-yellow mb-3">Discussion Questions:</h5>
            <div className="space-y-3">
              <div>
                <p className="text-foreground font-medium text-sm">What would happen if sensors were not calibrated regularly?</p>
                <p className="text-gray-400 text-xs mt-1">Consider accuracy, system response, and long-term reliability implications.</p>
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">How does this system benefit both health and energy efficiency?</p>
                <p className="text-gray-400 text-xs mt-1">Think about demand-controlled ventilation and its dual benefits.</p>
              </div>
              <div>
                <p className="text-foreground font-medium text-sm">What other environmental sensors could enhance this installation?</p>
                <p className="text-gray-400 text-xs mt-1">Consider humidity, particulates, and temperature monitoring.</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};