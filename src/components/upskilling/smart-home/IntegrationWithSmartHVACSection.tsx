import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Network } from 'lucide-react';

export const IntegrationWithSmartHVACSection = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Network className="h-5 w-5 text-elec-yellow" />
          Integration with Smart HVAC Systems
        </CardTitle>
      </CardHeader>
      <CardContent className="text-gray-300 space-y-4">
        <p>
          Environmental sensors feed real-time data to smart controllers, enabling HVAC systems to respond automatically to changing indoor conditions and maintain optimal environments whilst optimising energy consumption.
        </p>
        
        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Data Flow and Control Loop</h4>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div className="text-center p-3 bg-blue-600/10 border border-blue-600/30 rounded">
              <div className="text-sm font-bold text-blue-400">1. Sense</div>
              <div className="text-xs text-blue-200 mt-1">Continuous monitoring</div>
            </div>
            <div className="text-center p-3 bg-green-600/10 border border-green-600/30 rounded">
              <div className="text-sm font-bold text-green-400">2. Analyse</div>
              <div className="text-xs text-green-200 mt-1">Compare to setpoints</div>
            </div>
            <div className="text-center p-3 bg-purple-600/10 border border-purple-600/30 rounded">
              <div className="text-sm font-bold text-purple-400">3. Decide</div>
              <div className="text-xs text-purple-200 mt-1">Control algorithm</div>
            </div>
            <div className="text-center p-3 bg-orange-600/10 border border-orange-600/30 rounded">
              <div className="text-sm font-bold text-orange-400">4. Act</div>
              <div className="text-xs text-orange-200 mt-1">HVAC response</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="bg-elec-gray border border-blue-600 rounded-lg p-4">
            <h4 className="font-semibold text-blue-200 mb-3">Automatic HVAC Responses</h4>
            <div className="space-y-3 text-sm">
              <div>
                <h5 className="font-medium text-foreground mb-1">High CO₂ Detected</h5>
                <p className="text-gray-300">→ Increase fresh air supply rate</p>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-1">Low Humidity</h5>
                <p className="text-gray-300">→ Activate humidifier systems</p>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-1">High Particulates</h5>
                <p className="text-gray-300">→ Boost filtration and extract ventilation</p>
              </div>
              <div>
                <h5 className="font-medium text-foreground mb-1">VOC Spike</h5>
                <p className="text-gray-300">→ Increase ventilation, activate purifiers</p>
              </div>
            </div>
          </div>
          
          <div className="bg-elec-gray border border-green-600 rounded-lg p-4">
            <h4 className="font-semibold text-green-200 mb-3">Smart Control Strategies</h4>
            <ul className="space-y-2 text-sm text-green-100">
              <li>• Demand-controlled ventilation based on occupancy</li>
              <li>• Predictive control using weather data</li>
              <li>• Multi-zone coordination and balancing</li>
              <li>• Energy-optimised response timing</li>
              <li>• Fault detection and diagnostics</li>
              <li>• Adaptive setpoint adjustment</li>
            </ul>
          </div>
        </div>

        <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Building Management System (BMS) Integration</h4>
          <p className="text-sm text-gray-300 mb-3">
            BMS platforms use multiple sensors across different zones to provide comprehensive building-wide environmental control and monitoring.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-blue-200 mb-2">Zone Coordination</h5>
              <ul className="space-y-1 text-gray-300">
                <li>• Independent zone control</li>
                <li>• Cross-zone air balancing</li>
                <li>• Pressure differential management</li>
                <li>• Contamination containment</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-green-200 mb-2">Data Analytics</h5>
              <ul className="space-y-1 text-gray-300">
                <li>• Historical trending</li>
                <li>• Performance benchmarking</li>
                <li>• Energy usage analytics</li>
                <li>• Predictive maintenance</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-purple-200 mb-2">User Interface</h5>
              <ul className="space-y-1 text-gray-300">
                <li>• Real-time dashboards</li>
                <li>• Mobile app integration</li>
                <li>• Alert and notification systems</li>
                <li>• Occupant feedback systems</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-gray border border-yellow-600 rounded-lg p-4">
          <h4 className="font-semibold text-yellow-200 mb-3">Integration Protocols</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium text-foreground mb-2">Wireless Standards</h5>
              <ul className="space-y-1 text-gray-300">
                <li>• Zigbee 3.0 for mesh networking</li>
                <li>• LoRaWAN for long-range sensors</li>
                <li>• Wi-Fi for data-rich applications</li>
                <li>• Bluetooth for local connectivity</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium text-foreground mb-2">Wired Protocols</h5>
              <ul className="space-y-1 text-gray-300">
                <li>• BACnet for BMS integration</li>
                <li>• Modbus for industrial sensors</li>
                <li>• KNX for building automation</li>
                <li>• 4-20mA for analogue sensors</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};