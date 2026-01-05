import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Settings, Calendar, Zap, CheckCircle, FileText, Gauge } from 'lucide-react';

const TestEquipmentPractical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Practical Test Equipment Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Equipment Selection Guide */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Gauge className="h-5 w-5" />
            Equipment Selection Matrix
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full bg-elec-dark rounded-lg border border-gray-600">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-3 text-elec-yellow">Test Type</th>
                  <th className="text-left p-3 text-elec-yellow">Equipment</th>
                  <th className="text-left p-3 text-elec-yellow">Min. Specification</th>
                  <th className="text-left p-3 text-elec-yellow">Safety Category</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-300">
                <tr className="border-b border-gray-700">
                  <td className="p-3">DC Voltage</td>
                  <td className="p-3">Digital Multimeter</td>
                  <td className="p-3">1000V DC, 0.1V resolution</td>
                  <td className="p-3">CAT III 1000V</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3">DC Current</td>
                  <td className="p-3">Clamp Meter</td>
                  <td className="p-3">20A DC, 0.01A resolution</td>
                  <td className="p-3">CAT III 1000V</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3">Insulation</td>
                  <td className="p-3">Insulation Tester</td>
                  <td className="p-3">500V test, 2000MΩ range</td>
                  <td className="p-3">CAT III 600V</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3">I-V Curves</td>
                  <td className="p-3">PV Analyser</td>
                  <td className="p-3">1000V, 15A, curve tracing</td>
                  <td className="p-3">CAT III 1000V</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="p-3">Irradiance</td>
                  <td className="p-3">Irradiance Meter</td>
                  <td className="p-3">1500 W/m², ±5% accuracy</td>
                  <td className="p-3">N/A</td>
                </tr>
                <tr>
                  <td className="p-3">Earth Resistance</td>
                  <td className="p-3">Earth Tester</td>
                  <td className="p-3">0.01-2000Ω, 3-pole method</td>
                  <td className="p-3">CAT III 300V</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Calibration Schedule */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Equipment Calibration Schedule
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">Annual Calibration</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Digital multimeters</li>
                <li>• Insulation resistance testers</li>
                <li>• PV analysers</li>
                <li>• Irradiance meters</li>
                <li>• Earth resistance testers</li>
                <li>• Power quality analysers</li>
              </ul>
            </div>
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">6-Monthly Check</h4>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Clamp meters</li>
                <li>• Thermal imaging cameras</li>
                <li>• Oscilloscopes</li>
                <li>• Function generators</li>
                <li>• High-precision instruments</li>
                <li>• Reference standards</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Measurement Procedures */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Zap className="h-5 w-5" />
            Step-by-Step Measurement Procedures
          </h3>
          <div className="space-y-4">
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">I-V Curve Testing Procedure</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-blue-900/30 rounded">
                  <Badge variant="outline" className="bg-blue-500 text-foreground">1</Badge>
                  <span className="text-foreground text-sm">Ensure clear, sunny conditions ({'>'}800 W/m²)</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-blue-900/30 rounded">
                  <Badge variant="outline" className="bg-blue-500 text-foreground">2</Badge>
                  <span className="text-foreground text-sm">Isolate string at DC combiner or inverter</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-blue-900/30 rounded">
                  <Badge variant="outline" className="bg-blue-500 text-foreground">3</Badge>
                  <span className="text-foreground text-sm">Connect PV analyser with correct polarity</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-blue-900/30 rounded">
                  <Badge variant="outline" className="bg-blue-500 text-foreground">4</Badge>
                  <span className="text-foreground text-sm">Measure irradiance and cell temperature</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-blue-900/30 rounded">
                  <Badge variant="outline" className="bg-blue-500 text-foreground">5</Badge>
                  <span className="text-foreground text-sm">Initiate curve trace and record data</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-blue-900/30 rounded">
                  <Badge variant="outline" className="bg-blue-500 text-foreground">6</Badge>
                  <span className="text-foreground text-sm">Compare with manufacturer specifications</span>
                </div>
              </div>
            </div>

            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">Insulation Resistance Testing</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-3 p-2 bg-green-900/30 rounded">
                  <Badge variant="outline" className="bg-green-500 text-foreground">1</Badge>
                  <span className="text-foreground text-sm">Ensure all equipment is isolated</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-green-900/30 rounded">
                  <Badge variant="outline" className="bg-green-500 text-foreground">2</Badge>
                  <span className="text-foreground text-sm">Short DC+ and DC- together</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-green-900/30 rounded">
                  <Badge variant="outline" className="bg-green-500 text-foreground">3</Badge>
                  <span className="text-foreground text-sm">Test between DC and earth at 500V</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-green-900/30 rounded">
                  <Badge variant="outline" className="bg-green-500 text-foreground">4</Badge>
                  <span className="text-foreground text-sm">Record reading after 1 minute</span>
                </div>
                <div className="flex items-center gap-3 p-2 bg-green-900/30 rounded">
                  <Badge variant="outline" className="bg-green-500 text-foreground">5</Badge>
                  <span className="text-foreground text-sm">Verify reading ≥1MΩ (BS 7671)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Data Logging Templates */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Data Recording Templates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">String Performance Record</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="grid grid-cols-2 gap-2">
                  <span>Date/Time:</span>
                  <span className="text-elec-yellow">_______________</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span>String ID:</span>
                  <span className="text-elec-yellow">_______________</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span>Irradiance (W/m²):</span>
                  <span className="text-elec-yellow">_______________</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span>Cell Temp (°C):</span>
                  <span className="text-elec-yellow">_______________</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span>Voc (V):</span>
                  <span className="text-elec-yellow">_______________</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span>Isc (A):</span>
                  <span className="text-elec-yellow">_______________</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span>Vmp (V):</span>
                  <span className="text-elec-yellow">_______________</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span>Imp (A):</span>
                  <span className="text-elec-yellow">_______________</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span>Pmax (W):</span>
                  <span className="text-elec-yellow">_______________</span>
                </div>
              </div>
            </div>
            <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
              <h4 className="font-semibold text-elec-yellow mb-3">System Health Summary</h4>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="grid grid-cols-2 gap-2">
                  <span>System ID:</span>
                  <span className="text-elec-yellow">_______________</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span>Test Date:</span>
                  <span className="text-elec-yellow">_______________</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span>Total Strings:</span>
                  <span className="text-elec-yellow">_______________</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span>Strings Tested:</span>
                  <span className="text-elec-yellow">_______________</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span>Pass Rate (%):</span>
                  <span className="text-elec-yellow">_______________</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span>Performance Ratio:</span>
                  <span className="text-elec-yellow">_______________</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span>Issues Found:</span>
                  <span className="text-elec-yellow">_______________</span>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <span>Actions Required:</span>
                  <span className="text-elec-yellow">_______________</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Equipment Care Guide */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Equipment Care & Maintenance
          </h3>
          <div className="bg-elec-dark p-4 rounded-lg border border-gray-600">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <h4 className="font-semibold text-elec-yellow mb-2">Daily Care</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Clean probe tips after use</li>
                  <li>• Check battery levels</li>
                  <li>• Inspect cables for damage</li>
                  <li>• Store in protective cases</li>
                  <li>• Record any anomalies</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-elec-yellow mb-2">Weekly</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Verify known references</li>
                  <li>• Clean display screens</li>
                  <li>• Check probe insulation</li>
                  <li>• Update firmware if needed</li>
                  <li>• Backup stored data</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-elec-yellow mb-2">Monthly</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Full functional check</li>
                  <li>• Calibration verification</li>
                  <li>• Review measurement logs</li>
                  <li>• Update calibration records</li>
                  <li>• Schedule any repairs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestEquipmentPractical;