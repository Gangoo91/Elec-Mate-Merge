import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TestTube, CheckSquare, Calculator, FileText, Activity } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const CommissioningChecksPractical = () => {
  const [moduleVoc, setModuleVoc] = useState('');
  const [modulesInString, setModulesInString] = useState('');
  const [ambientTemp, setAmbientTemp] = useState('');
  const [measuredVoc, setMeasuredVoc] = useState('');
  const [irradiance, setIrradiance] = useState('');
  const [measuredIsc, setMeasuredIsc] = useState('');

  const calculateExpectedVoc = () => {
    const voc = parseFloat(moduleVoc) || 0;
    const modules = parseFloat(modulesInString) || 0;
    const temp = parseFloat(ambientTemp) || 25;
    
    if (voc > 0 && modules > 0) {
      // Cell temperature = ambient + 30°C (typical)
      const cellTemp = temp + 30;
      // Temperature coefficient typically -0.35%/°C
      const tempCoeff = -0.0035;
      const tempCorrectedVoc = voc * (1 + tempCoeff * (cellTemp - 25));
      const stringVoc = tempCorrectedVoc * modules;
      return stringVoc.toFixed(1);
    }
    return '0.0';
  };

  const calculateIscAt1000 = () => {
    const isc = parseFloat(measuredIsc) || 0;
    const irr = parseFloat(irradiance) || 1000;
    
    if (isc > 0 && irr > 0) {
      const iscAt1000 = isc * (1000 / irr);
      return iscAt1000.toFixed(2);
    }
    return '0.00';
  };

  const getVocCompliance = () => {
    const expected = parseFloat(calculateExpectedVoc());
    const measured = parseFloat(measuredVoc) || 0;
    
    if (expected > 0 && measured > 0) {
      const deviation = Math.abs((measured - expected) / expected) * 100;
      if (deviation <= 5) return { status: 'pass', text: 'Within ±5%' };
      if (deviation <= 10) return { status: 'warning', text: 'Investigate' };
      return { status: 'fail', text: 'Fault likely' };
    }
    return { status: 'unknown', text: 'Enter values' };
  };

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <TestTube className="h-6 w-6 text-elec-yellow" />
          Commissioning Tools & Test Procedures
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Pre-Energisation Checklist */}
        <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
          <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Pre-Energisation Safety Checklist
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h5 className="text-foreground font-medium">Installation Verification:</h5>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  All connections visually inspected and secure
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  Cable routes and support adequate
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  Labelling complete and legible
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  Earthing and bonding verified
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="text-foreground font-medium">Electrical Safety:</h5>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  Insulation resistance ≥1MΩ confirmed
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  Polarity correct on all circuits
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  Protection devices correctly rated
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  Test equipment calibrated and functional
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Voc Calculator */}
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
          <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Open Circuit Voltage Calculator & Validator
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-foreground text-sm font-medium mb-1">Module Voc (STC)</label>
                <input
                  type="number"
                  value={moduleVoc}
                  onChange={(e) => setModuleVoc(e.target.value)}
                  className="w-full p-2 bg-elec-dark border border-gray-600 rounded text-foreground"
                  placeholder="e.g., 40.5"
                />
              </div>
              <div>
                <label className="block text-foreground text-sm font-medium mb-1">Modules per String</label>
                <input
                  type="number"
                  value={modulesInString}
                  onChange={(e) => setModulesInString(e.target.value)}
                  className="w-full p-2 bg-elec-dark border border-gray-600 rounded text-foreground"
                  placeholder="e.g., 10"
                />
              </div>
              <div>
                <label className="block text-foreground text-sm font-medium mb-1">Ambient Temperature (°C)</label>
                <input
                  type="number"
                  value={ambientTemp}
                  onChange={(e) => setAmbientTemp(e.target.value)}
                  className="w-full p-2 bg-elec-dark border border-gray-600 rounded text-foreground"
                  placeholder="e.g., 15"
                />
              </div>
              <div>
                <label className="block text-foreground text-sm font-medium mb-1">Measured Voc</label>
                <input
                  type="number"
                  value={measuredVoc}
                  onChange={(e) => setMeasuredVoc(e.target.value)}
                  className="w-full p-2 bg-elec-dark border border-gray-600 rounded text-foreground"
                  placeholder="Actual measurement"
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-foreground font-medium">Expected Voc (temp corrected):</p>
                <p className="text-elec-yellow text-2xl font-bold">{calculateExpectedVoc()}V</p>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-foreground font-medium">Compliance Status:</p>
                <Badge 
                  variant={getVocCompliance().status === 'pass' ? "default" : 
                          getVocCompliance().status === 'warning' ? "secondary" : "destructive"}
                  className="text-sm"
                >
                  {getVocCompliance().text}
                </Badge>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600 text-xs">
                <p className="text-gray-400">
                  <strong>Note:</strong> Calculation assumes -0.35%/°C temperature coefficient 
                  and cell temperature = ambient + 30°C
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Isc Calculator */}
        <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
          <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Short Circuit Current Analyser
          </h4>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-foreground text-sm font-medium mb-1">Current Irradiance (W/m²)</label>
                <input
                  type="number"
                  value={irradiance}
                  onChange={(e) => setIrradiance(e.target.value)}
                  className="w-full p-2 bg-elec-dark border border-gray-600 rounded text-foreground"
                  placeholder="e.g., 800"
                />
              </div>
              <div>
                <label className="block text-foreground text-sm font-medium mb-1">Measured Isc (A)</label>
                <input
                  type="number"
                  value={measuredIsc}
                  onChange={(e) => setMeasuredIsc(e.target.value)}
                  className="w-full p-2 bg-elec-dark border border-gray-600 rounded text-foreground"
                  placeholder="Actual measurement"
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-foreground font-medium">Isc at 1000W/m²:</p>
                <p className="text-elec-yellow text-2xl font-bold">{calculateIscAt1000()}A</p>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600 text-xs">
                <p className="text-gray-400">
                  <strong>Requirements:</strong> Minimum 200W/m² irradiance for meaningful results. 
                  Measurements should be within ±10% of module specification.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Test Sequence Flowchart */}
        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
          <h4 className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Systematic Test Sequence
          </h4>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <h5 className="text-red-400 font-medium mb-2">Phase 1: Dead Tests</h5>
                <ol className="list-decimal list-inside text-gray-300 space-y-1">
                  <li>Visual inspection</li>
                  <li>Insulation resistance</li>
                  <li>Earth continuity</li>
                  <li>Polarity verification</li>
                  <li>Circuit protection check</li>
                </ol>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <h5 className="text-orange-400 font-medium mb-2">Phase 2: String Tests</h5>
                <ol className="list-decimal list-inside text-gray-300 space-y-1">
                  <li>Open circuit voltage</li>
                  <li>Short circuit current</li>
                  <li>String current balancing</li>
                  <li>Maximum power point test</li>
                  <li>I-V curve trace (if available)</li>
                </ol>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <h5 className="text-green-400 font-medium mb-2">Phase 3: System Tests</h5>
                <ol className="list-decimal list-inside text-gray-300 space-y-1">
                  <li>Inverter operation</li>
                  <li>Grid synchronisation</li>
                  <li>Power output verification</li>
                  <li>Protection device testing</li>
                  <li>Performance monitoring setup</li>
                </ol>
              </div>
            </div>
          </div>
        </div>

        {/* Documentation Template */}
        <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
          <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Commissioning Record Template
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-elec-dark p-3 rounded border border-gray-600">
              <h5 className="text-foreground font-medium mb-2">System Information:</h5>
              <ul className="text-gray-300 space-y-1">
                <li>• Installation address and postcode</li>
                <li>• System capacity (kWp) and configuration</li>
                <li>• Module make, model, and quantity</li>
                <li>• Inverter make, model, and serial number</li>
                <li>• Installation date and weather conditions</li>
              </ul>
            </div>
            <div className="bg-elec-dark p-3 rounded border border-gray-600">
              <h5 className="text-foreground font-medium mb-2">Test Results Required:</h5>
              <ul className="text-gray-300 space-y-1">
                <li>• Insulation resistance values (min 1MΩ)</li>
                <li>• Earth continuity measurements</li>
                <li>• String Voc and Isc readings</li>
                <li>• Power output at commissioning</li>
                <li>• Any deviations or non-conformities</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Common Fault Troubleshooting */}
        <div className="bg-orange-900/20 p-4 rounded-lg border border-orange-500/30">
          <h4 className="text-orange-400 font-semibold mb-3">Common Commissioning Faults & Solutions</h4>
          <div className="space-y-2 text-sm">
            <div className="bg-elec-dark p-3 rounded border border-gray-600">
              <h5 className="text-red-400 font-medium">Zero Voc Reading:</h5>
              <p className="text-gray-300">Check: Blown fuse → Open circuit → Loose MC4 connector → Failed isolator</p>
            </div>
            <div className="bg-elec-dark p-3 rounded border border-gray-600">
              <h5 className="text-orange-400 font-medium">Low Voc ({">"} 10% below expected):</h5>
              <p className="text-gray-300">Check: Partial shading → Module bypass diode failure → High resistance connection</p>
            </div>
            <div className="bg-elec-dark p-3 rounded border border-gray-600">
              <h5 className="text-yellow-400 font-medium">Inverter Won't Start:</h5>
              <p className="text-gray-300">Check: DC voltage too low → Reverse polarity → Grid voltage out of range → Earth fault</p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default CommissioningChecksPractical;