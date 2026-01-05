import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Battery } from 'lucide-react';

export const BatteryStorageSection = () => {
  return (
    <Card className="bg-gradient-to-r from-orange-900/20 to-elec-gray border-orange-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Battery className="h-5 w-5 text-elec-yellow" />
          Battery Energy Storage Systems (BESS) Safety & Management
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-orange-600 text-foreground">Energy Storage</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Battery Technology Specifications:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-orange-400 font-medium mb-2">Lithium-Ion Technology:</h6>
              <ul className="text-sm space-y-1">
                <li>• <strong>Energy density:</strong> 150-250 Wh/kg</li>
                <li>• <strong>Cycle life:</strong> 5,000-10,000 cycles at 80% DoD</li>
                <li>• <strong>Round-trip efficiency:</strong> 90-95%</li>
                <li>• <strong>Operating temperature:</strong> -20°C to +60°C</li>
                <li>• <strong>Calendar life:</strong> 10-20 years</li>
                <li>• <strong>Self-discharge rate:</strong> &lt;3% per month</li>
              </ul>
            </div>
            <div>
              <h6 className="text-blue-400 font-medium mb-2">Alternative Technologies:</h6>
              <ul className="text-sm space-y-1">
                <li>• <strong>LiFePO₄:</strong> Enhanced safety, longer cycle life</li>
                <li>• <strong>Sodium-ion:</strong> Lower cost, abundant materials</li>
                <li>• <strong>Flow batteries:</strong> Long duration storage &gt;4h</li>
                <li>• <strong>Compressed air:</strong> Large-scale storage solutions</li>
                <li>• <strong>Gravity storage:</strong> Mechanical energy storage</li>
                <li>• <strong>Hydrogen:</strong> Seasonal storage applications</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Battery Management System (BMS) Requirements:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-green-400 font-medium mb-2">Core Monitoring Functions:</h6>
              <ul className="text-sm space-y-1">
                <li>• Cell voltage monitoring (±5mV accuracy)</li>
                <li>• Current measurement (±0.5% accuracy)</li>
                <li>• Temperature monitoring (multiple sensors)</li>
                <li>• State of charge (SoC) calculation</li>
                <li>• State of health (SoH) assessment</li>
                <li>• Insulation resistance monitoring</li>
              </ul>
            </div>
            <div>
              <h6 className="text-purple-400 font-medium mb-2">Protection & Control:</h6>
              <ul className="text-sm space-y-1">
                <li>• Overvoltage/undervoltage protection</li>
                <li>• Overcurrent/short circuit protection</li>
                <li>• Thermal management and cooling control</li>
                <li>• Cell balancing (active or passive)</li>
                <li>• Contactor control for isolation</li>
                <li>• Emergency shutdown capabilities</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Fire Safety & Thermal Management:</h5>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-red-400 font-medium mb-2">Thermal Runaway Prevention:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Multi-level temperature monitoring</li>
                  <li>• Active cooling systems (air/liquid)</li>
                  <li>• Thermal barriers between cell modules</li>
                  <li>• Early warning detection algorithms</li>
                  <li>• Automatic power limitation on overheating</li>
                  <li>• Emergency ventilation systems</li>
                </ul>
              </div>
              <div>
                <h6 className="text-yellow-400 font-medium mb-2">Fire Suppression Systems:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Water mist systems for lithium-ion batteries</li>
                  <li>• Inert gas flooding (argon/nitrogen)</li>
                  <li>• Aerosol suppression systems</li>
                  <li>• Smoke and gas detection systems</li>
                  <li>• Emergency exhaust ventilation</li>
                  <li>• Fire service notification protocols</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border border-gray-600">
              <h6 className="text-cyan-400 font-medium mb-2">Installation Safety Requirements:</h6>
              <div className="grid md:grid-cols-3 gap-3">
                <div>
                  <p className="text-xs text-gray-400 mb-1">Minimum Clearances</p>
                  <p className="text-sm">1m from combustible materials</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Ventilation</p>
                  <p className="text-sm">Natural or mechanical as required</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 mb-1">Access</p>
                  <p className="text-sm">1.5m working space minimum</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Performance Optimisation & Degradation Management:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-indigo-400 font-medium mb-2">Cycle Management:</h6>
              <ul className="text-sm space-y-1">
                <li>• Depth of discharge optimisation (80-90% typical)</li>
                <li>• Charge rate management for longevity</li>
                <li>• Temperature-compensated charging profiles</li>
                <li>• Calendar aging mitigation strategies</li>
                <li>• Seasonal storage conditioning protocols</li>
                <li>• End-of-life planning and recycling</li>
              </ul>
            </div>
            <div>
              <h6 className="text-teal-400 font-medium mb-2">Performance Analytics:</h6>
              <ul className="text-sm space-y-1">
                <li>• Real-time efficiency monitoring</li>
                <li>• Predictive maintenance algorithms</li>
                <li>• Capacity fade tracking and forecasting</li>
                <li>• Economic performance analysis</li>
                <li>• Warranty claim optimisation</li>
                <li>• Second-life application assessment</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Grid Services & Revenue Optimisation:</h5>
          <div className="space-y-3">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-lime-400 font-medium mb-2">Frequency Response Services:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Enhanced Frequency Response (EFR) - sub-second</li>
                  <li>• Primary Frequency Response (PFR) - 10 seconds</li>
                  <li>• Secondary Frequency Response (SFR) - 30 seconds</li>
                  <li>• High Frequency Response (HFR) - fast acting</li>
                </ul>
              </div>
              <div>
                <h6 className="text-emerald-400 font-medium mb-2">Additional Grid Services:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Capacity Market participation</li>
                  <li>• Demand Side Response (DSR) provision</li>
                  <li>• Reserve services (STOR replacement)</li>
                  <li>• Voltage support and reactive power</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded">
              <h6 className="text-yellow-400 font-medium mb-2">Revenue Stream Analysis:</h6>
              <div className="grid md:grid-cols-4 gap-3">
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Energy Arbitrage</p>
                  <p className="text-sm text-green-400">£50-150/MWh</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Frequency Response</p>
                  <p className="text-sm text-blue-400">£8-20/MW/h</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">Capacity Market</p>
                  <p className="text-sm text-purple-400">£15-75/kW/year</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400 mb-1">DSR Services</p>
                  <p className="text-sm text-orange-400">£100-500/MWh</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Installation & Commissioning Standards:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-rose-400 font-medium mb-2">Pre-Installation Requirements:</h6>
              <ul className="text-sm space-y-1">
                <li>• Structural assessment for weight loading</li>
                <li>• Environmental impact assessment</li>
                <li>• Planning permission considerations</li>
                <li>• Building regulations compliance</li>
                <li>• Insurance and liability assessment</li>
                <li>• Grid connection agreement</li>
              </ul>
            </div>
            <div>
              <h6 className="text-amber-400 font-medium mb-2">Commissioning Tests:</h6>
              <ul className="text-sm space-y-1">
                <li>• Insulation resistance testing</li>
                <li>• Earth fault loop impedance</li>
                <li>• Protection device coordination</li>
                <li>• BMS functionality verification</li>
                <li>• Charge/discharge performance tests</li>
                <li>• Safety system activation tests</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};