import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Zap } from 'lucide-react';

export const EnergyManagementSection = () => {
  return (
    <Card className="bg-gradient-to-r from-purple-900/20 to-elec-gray border-purple-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Zap className="h-5 w-5 text-elec-yellow" />
          Energy Management Systems (EMS) & Smart Control
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-purple-600 text-foreground">Intelligent Control</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Advanced EMS Architecture:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Central Control Unit:</h6>
              <ul className="text-sm space-y-1">
                <li>• Real-time monitoring of all energy flows</li>
                <li>• Predictive algorithms for load and generation forecasting</li>
                <li>• Machine learning for performance optimisation</li>
                <li>• Integration with weather forecasting services</li>
                <li>• Historical data analysis and reporting</li>
                <li>• Remote monitoring and diagnostic capabilities</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Smart Inverter Functions:</h6>
              <ul className="text-sm space-y-1">
                <li>• Volt-VAR control for voltage regulation</li>
                <li>• Frequency-watt response for grid stability</li>
                <li>• Anti-islanding protection with fast detection</li>
                <li>• Power factor correction capabilities</li>
                <li>• Harmonic distortion minimisation</li>
                <li>• Grid service participation (FFR, DSR)</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Load Management Strategies:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-blue-400 font-medium mb-2">Dynamic Load Balancing:</h6>
              <ul className="text-sm space-y-1">
                <li>• Phase balancing to minimise neutral current</li>
                <li>• Load prioritisation based on criticality</li>
                <li>• Automatic load shedding during peak demand</li>
                <li>• Thermal load shifting to off-peak periods</li>
                <li>• EV charging scheduling optimisation</li>
                <li>• Heat pump operation coordination</li>
              </ul>
            </div>
            <div>
              <h6 className="text-green-400 font-medium mb-2">Demand Response Integration:</h6>
              <ul className="text-sm space-y-1">
                <li>• Participation in Capacity Market schemes</li>
                <li>• Automatic response to grid frequency signals</li>
                <li>• Time-of-use tariff optimisation</li>
                <li>• Peak demand reduction strategies</li>
                <li>• Carbon intensity-based load scheduling</li>
                <li>• Virtual power plant aggregation</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Energy Storage Optimisation:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-orange-400 font-medium mb-2">Battery Management:</h6>
              <ul className="text-sm space-y-1">
                <li>• State of charge (SoC) optimisation algorithms</li>
                <li>• Depth of discharge (DoD) management for longevity</li>
                <li>• Thermal management and cooling control</li>
                <li>• Cell balancing and health monitoring</li>
                <li>• Predictive maintenance scheduling</li>
                <li>• End-of-life performance degradation planning</li>
              </ul>
            </div>
            <div>
              <h6 className="text-purple-400 font-medium mb-2">Energy Arbitrage:</h6>
              <ul className="text-sm space-y-1">
                <li>• Time-shifting energy for economic benefit</li>
                <li>• Agile tariff tracking and response</li>
                <li>• Export opportunity maximisation</li>
                <li>• Grid services revenue optimisation</li>
                <li>• Seasonal energy storage strategies</li>
                <li>• Market price prediction algorithms</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Communication Protocols & Integration:</h5>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h6 className="text-cyan-400 font-medium mb-2">Device Level:</h6>
              <ul className="text-xs space-y-1">
                <li>• Modbus RTU/TCP for inverters</li>
                <li>• SunSpec for solar equipment</li>
                <li>• CAN Bus for battery systems</li>
                <li>• RS485 for legacy equipment</li>
                <li>• Ethernet for IP-based devices</li>
              </ul>
            </div>
            <div>
              <h6 className="text-cyan-400 font-medium mb-2">System Level:</h6>
              <ul className="text-xs space-y-1">
                <li>• IEC 61850 for power systems</li>
                <li>• MQTT for IoT integration</li>
                <li>• OCPP for EV charging</li>
                <li>• OpenADR for demand response</li>
                <li>• IEEE 2030.5 for smart energy</li>
              </ul>
            </div>
            <div>
              <h6 className="text-cyan-400 font-medium mb-2">Cloud Integration:</h6>
              <ul className="text-xs space-y-1">
                <li>• REST APIs for web services</li>
                <li>• GraphQL for efficient queries</li>
                <li>• WebSocket for real-time data</li>
                <li>• HTTPS for secure communication</li>
                <li>• OAuth 2.0 for authentication</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Performance Monitoring & Analytics:</h5>
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="text-yellow-400 font-medium mb-2">Key Performance Indicators (KPIs):</h6>
              <div className="grid md:grid-cols-2 gap-3">
                <ul className="text-sm space-y-1">
                  <li>• Self-consumption ratio: Target &gt;70%</li>
                  <li>• System efficiency: Overall &gt;85%</li>
                  <li>• Battery round-trip efficiency: &gt;90%</li>
                  <li>• Grid export utilisation: Maximise revenue</li>
                </ul>
                <ul className="text-sm space-y-1">
                  <li>• Demand charge reduction: Target 20%+ savings</li>
                  <li>• Carbon intensity tracking: g CO₂/kWh</li>
                  <li>• Financial return on investment (ROI)</li>
                  <li>• System availability: Target &gt;99%</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};