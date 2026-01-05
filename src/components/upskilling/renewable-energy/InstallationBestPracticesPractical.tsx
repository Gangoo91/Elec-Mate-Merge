import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, CheckSquare, AlertTriangle, FileText, Calculator } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

const InstallationBestPracticesPractical = () => {
  const [cableLength, setCableLength] = useState('');
  const [cableCurrent, setCableCurrent] = useState('');
  const [voltageRating, setVoltageRating] = useState('');
  const [supportSpacing, setSupportSpacing] = useState('');

  const calculateSupports = () => {
    const length = parseFloat(cableLength) || 0;
    const spacing = parseFloat(supportSpacing) || 0.4; // Default 400mm
    if (length > 0 && spacing > 0) {
      const supports = Math.ceil(length / spacing) + 1; // +1 for end support
      return supports;
    }
    return 0;
  };

  const getVoltageDrop = () => {
    const current = parseFloat(cableCurrent) || 0;
    const length = parseFloat(cableLength) || 0;
    if (current > 0 && length > 0) {
      // Simplified calculation for 4mm² DC cable (7.41 mΩ/m)
      const resistance = 0.00741 * length;
      const voltageDrop = current * resistance;
      return voltageDrop.toFixed(2);
    }
    return '0.00';
  };

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-6 w-6 text-elec-yellow" />
          Practical Installation Tools & Guides
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Installation Checklist */}
        <div className="bg-green-900/20 p-4 rounded-lg border border-green-500/30">
          <h4 className="text-green-400 font-semibold mb-3 flex items-center gap-2">
            <CheckSquare className="h-5 w-5" />
            Pre-Installation Safety Checklist
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <h5 className="text-foreground font-medium">Site Assessment:</h5>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  Structural integrity verified
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  Wind loading calculations complete
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  Shading analysis conducted
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  Roof condition assessed
                </label>
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="text-foreground font-medium">Safety Preparation:</h5>
              <div className="space-y-1">
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  Fall protection systems installed
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  Weather conditions suitable
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  Emergency procedures briefed
                </label>
                <label className="flex items-center gap-2 text-gray-300">
                  <input type="checkbox" className="rounded bg-elec-dark border-gray-600" />
                  First aid provisions available
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Cable Support Calculator */}
        <div className="bg-blue-900/20 p-4 rounded-lg border border-blue-500/30">
          <h4 className="text-blue-400 font-semibold mb-3 flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Cable Support Calculator
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-foreground text-sm font-medium mb-1">Cable Run Length (m)</label>
                <input
                  type="number"
                  value={cableLength}
                  onChange={(e) => setCableLength(e.target.value)}
                  className="w-full p-2 bg-elec-dark border border-gray-600 rounded text-foreground"
                  placeholder="Enter length in metres"
                />
              </div>
              <div>
                <label className="block text-foreground text-sm font-medium mb-1">Support Spacing (m)</label>
                <select
                  value={supportSpacing}
                  onChange={(e) => setSupportSpacing(e.target.value)}
                  className="w-full p-2 bg-elec-dark border border-gray-600 rounded text-foreground"
                >
                  <option value="0.3">0.3m (Flexible cable)</option>
                  <option value="0.4">0.4m (Standard horizontal)</option>
                  <option value="0.3">0.3m (Vertical runs)</option>
                  <option value="0.2">0.2m (High wind areas)</option>
                </select>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-foreground font-medium">Required Supports:</p>
                <p className="text-elec-yellow text-2xl font-bold">{calculateSupports()}</p>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-foreground font-medium">Installation Notes:</p>
                <ul className="text-gray-300 text-xs space-y-1">
                  <li>• Include end supports in count</li>
                  <li>• Reduce spacing in high-stress areas</li>
                  <li>• Use appropriate fixings for substrate</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Voltage Drop Calculator */}
        <div className="bg-purple-900/20 p-4 rounded-lg border border-purple-500/30">
          <h4 className="text-purple-400 font-semibold mb-3 flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            DC Voltage Drop Calculator
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div>
                <label className="block text-foreground text-sm font-medium mb-1">Cable Current (A)</label>
                <input
                  type="number"
                  value={cableCurrent}
                  onChange={(e) => setCableCurrent(e.target.value)}
                  className="w-full p-2 bg-elec-dark border border-gray-600 rounded text-foreground"
                  placeholder="String current in amps"
                />
              </div>
              <div>
                <label className="block text-foreground text-sm font-medium mb-1">System Voltage (V)</label>
                <input
                  type="number"
                  value={voltageRating}
                  onChange={(e) => setVoltageRating(e.target.value)}
                  className="w-full p-2 bg-elec-dark border border-gray-600 rounded text-foreground"
                  placeholder="System voltage"
                />
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-foreground font-medium">Voltage Drop:</p>
                <p className="text-elec-yellow text-xl font-bold">{getVoltageDrop()}V</p>
                <p className="text-gray-400 text-xs">
                  Percentage: {voltageRating ? ((parseFloat(getVoltageDrop()) / parseFloat(voltageRating)) * 100).toFixed(2) : '0.00'}%
                </p>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <p className="text-foreground font-medium text-xs">Compliance Check:</p>
                <Badge 
                  variant={voltageRating && ((parseFloat(getVoltageDrop()) / parseFloat(voltageRating)) * 100) <= 3 ? "default" : "destructive"}
                  className="text-xs"
                >
                  {voltageRating && ((parseFloat(getVoltageDrop()) / parseFloat(voltageRating)) * 100) <= 3 ? "Within 3% limit" : "Exceeds 3% limit"}
                </Badge>
              </div>
            </div>
          </div>
        </div>

        {/* Safety Protocol Template */}
        <div className="bg-red-900/20 p-4 rounded-lg border border-red-500/30">
          <h4 className="text-red-400 font-semibold mb-3 flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            DC Safety Protocol Template
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="bg-elec-dark p-3 rounded border border-gray-600">
              <h5 className="text-foreground font-medium mb-2">Before Starting Work:</h5>
              <ol className="list-decimal list-inside text-gray-300 space-y-1">
                <li>Identify all energy sources</li>
                <li>Plan isolation sequence</li>
                <li>Brief all team members</li>
                <li>Check weather conditions</li>
                <li>Verify PPE availability</li>
                <li>Establish communication plan</li>
              </ol>
            </div>
            <div className="bg-elec-dark p-3 rounded border border-gray-600">
              <h5 className="text-foreground font-medium mb-2">During Installation:</h5>
              <ol className="list-decimal list-inside text-gray-300 space-y-1">
                <li>Maintain situational awareness</li>
                <li>Use buddy system for checks</li>
                <li>Test equipment regularly</li>
                <li>Document any deviations</li>
                <li>Report hazards immediately</li>
                <li>Keep work area organised</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Earthing System Design Guide */}
        <div className="bg-yellow-900/20 p-4 rounded-lg border border-yellow-500/30">
          <h4 className="text-yellow-400 font-semibold mb-3 flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Earthing System Design Guide
          </h4>
          <div className="space-y-3 text-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <h5 className="text-foreground font-medium mb-2">Equipment Earthing:</h5>
                <ul className="text-gray-300 space-y-1">
                  <li>• Minimum 6mm² earth conductor</li>
                  <li>• Bond all metallic structures</li>
                  <li>• Use star-point configuration</li>
                  <li>• Apply anti-corrosion treatment</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <h5 className="text-foreground font-medium mb-2">Earth Electrodes:</h5>
                <ul className="text-gray-300 space-y-1">
                  <li>• 1.2m minimum depth</li>
                  <li>• Target resistance ≤20Ω</li>
                  <li>• Multiple rods if required</li>
                  <li>• 3m minimum spacing</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-600">
                <h5 className="text-foreground font-medium mb-2">Testing Schedule:</h5>
                <ul className="text-gray-300 space-y-1">
                  <li>• Initial commissioning test</li>
                  <li>• Annual resistance checks</li>
                  <li>• After lightning strikes</li>
                  <li>• Following maintenance work</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default InstallationBestPracticesPractical;