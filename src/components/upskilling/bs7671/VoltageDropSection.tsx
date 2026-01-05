import { TrendingDown, Gauge } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const VoltageDropSection = () => {
  return (
    <Card className="bg-gradient-to-r from-orange-900/20 to-elec-gray border-orange-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <TrendingDown className="h-6 w-6 text-elec-yellow" />
          Voltage Drop Calculations and Limits
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-orange-600 text-foreground">Performance Critical</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Voltage Drop Limits and Requirements:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Lighting Circuits:</h6>
              <div className="bg-gray-800 p-3 rounded">
                <ul className="text-sm space-y-1">
                  <li>• <strong>Maximum limit:</strong> 3% of nominal voltage</li>
                  <li>• <strong>At 230V:</strong> 6.9V maximum drop</li>
                  <li>• <strong>At 400V:</strong> 12V maximum drop (3-phase)</li>
                  <li>• <strong>Critical for:</strong> LED compatibility and dimming</li>
                  <li>• <strong>Emergency lighting:</strong> Enhanced requirements</li>
                </ul>
              </div>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Other Circuits:</h6>
              <div className="bg-gray-800 p-3 rounded">
                <ul className="text-sm space-y-1">
                  <li>• <strong>Maximum limit:</strong> 5% of nominal voltage</li>
                  <li>• <strong>At 230V:</strong> 11.5V maximum drop</li>
                  <li>• <strong>At 400V:</strong> 20V maximum drop (3-phase)</li>
                  <li>• <strong>Motor starting:</strong> Special considerations</li>
                  <li>• <strong>Combined circuits:</strong> Cumulative effects</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Calculation Methods and Formulae:</h5>
          
          <div className="grid gap-4 md:hidden">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-2">Single-Phase Circuits</h6>
              <div className="text-xs font-mono bg-gray-900 p-2 rounded mb-2">
                Vd = (mV/A/m) × Ib × L / 1000
              </div>
              <p className="text-sm">Where: mV/A/m from Appendix 12 tables, Ib = design current, L = circuit length in metres</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-2">Three-Phase Circuits</h6>
              <div className="text-xs font-mono bg-gray-900 p-2 rounded mb-2">
                Vd = √3 × (mV/A/m) × Ib × L / 1000
              </div>
              <p className="text-sm">Balanced load: Line-to-line voltage drop. Unbalanced: Consider worst-case phase loading</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-yellow-400">
              <h6 className="font-bold text-yellow-400 mb-2">Impedance Method</h6>
              <div className="text-xs font-mono bg-gray-900 p-2 rounded mb-2">
                Vd = Ib × √((R×L)² + (X×L)²)
              </div>
              <p className="text-sm">For reactive loads: R = resistance, X = reactance per metre, both from tables</p>
            </div>
          </div>
          
          <div className="hidden md:block">
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="font-bold text-blue-400 mb-2">Simplified Method</h6>
                <div className="text-xs font-mono bg-gray-900 p-2 rounded mb-2">
                  Vd = (mV/A/m) × Ib × L / 1000
                </div>
                <p className="text-xs">Use tabulated mV/A/m values from Appendix 12</p>
              </div>
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="font-bold text-green-400 mb-2">Three-Phase</h6>
                <div className="text-xs font-mono bg-gray-900 p-2 rounded mb-2">
                  Vd = √3 × (mV/A/m) × Ib × L / 1000
                </div>
                <p className="text-xs">Multiply single-phase by √3 for balanced loads</p>
              </div>
              <div className="bg-gray-800 p-3 rounded">
                <h6 className="font-bold text-yellow-400 mb-2">Precise Method</h6>
                <div className="text-xs font-mono bg-gray-900 p-2 rounded mb-2">
                  Vd = Ib × √((R×L)² + (X×L)²)
                </div>
                <p className="text-xs">For reactive loads using R and X values</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Practical Design Examples:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Example 1: Domestic Ring Circuit</h6>
              <div className="bg-gray-800 p-3 rounded text-sm">
                <p><strong>Circuit:</strong> 32A ring final, 2.5mm² T&E</p>
                <p><strong>Length:</strong> 50m total circuit length</p>
                <p><strong>Current:</strong> 20A design current</p>
                <p><strong>Cable data:</strong> 18 mV/A/m (from tables)</p>
                <p className="mt-2 text-elec-yellow">Calculation:</p>
                <p>Ring factor: Length/4 = 50/4 = 12.5m</p>
                <p>Vd = 18 × 20 × 12.5 / 1000 = 4.5V</p>
                <p><strong>Result:</strong> 4.5V &lt; 11.5V ✓ Compliant</p>
              </div>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Example 2: Industrial Motor Circuit</h6>
              <div className="bg-gray-800 p-3 rounded text-sm">
                <p><strong>Circuit:</strong> 15kW motor, 400V 3-phase</p>
                <p><strong>Cable:</strong> 4mm² SWA, 80m length</p>
                <p><strong>Current:</strong> 28A full load</p>
                <p><strong>Cable data:</strong> 11 mV/A/m (from tables)</p>
                <p className="mt-2 text-elec-yellow">Calculation:</p>
                <p>Vd = √3 × 11 × 28 × 80 / 1000 = 13.4V</p>
                <p><strong>Result:</strong> 13.4V &lt; 20V ✓ Compliant</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Special Considerations and Solutions:</h5>
          <div className="space-y-3">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-red-400">
              <h6 className="font-bold text-red-400 mb-2">Motor Starting</h6>
              <p className="text-sm mb-2">Starting currents can be 6-8 times full load current, causing temporary voltage dips:</p>
              <ul className="text-xs space-y-1">
                <li>• Consider soft-start devices or star-delta starters</li>
                <li>• Check supply authority requirements for large motors</li>
                <li>• Use higher-rated cables if starting voltage drop is critical</li>
                <li>• Consider power factor correction for reactive loads</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-2">LED Lighting Considerations</h6>
              <p className="text-sm mb-2">LED lights are sensitive to voltage variations and require special attention:</p>
              <ul className="text-xs space-y-1">
                <li>• Maintain voltage within ±10% for optimal performance</li>
                <li>• Consider dimming compatibility requirements</li>
                <li>• Account for inrush currents with large LED installations</li>
                <li>• Use appropriate cable sizes for long lighting circuits</li>
              </ul>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-2">Solutions for High Voltage Drop</h6>
              <p className="text-sm mb-2">When calculated voltage drop exceeds limits:</p>
              <ul className="text-xs space-y-1">
                <li>• Increase conductor cross-sectional area</li>
                <li>• Reduce circuit length by installing sub-distributions</li>
                <li>• Use higher supply voltage (400V instead of 230V)</li>
                <li>• Install voltage stabilization equipment where appropriate</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Quick Reference Table:</h5>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-gray-600">
              <thead>
                <tr className="border-b border-gray-600 bg-gray-800">
                  <th className="text-left py-2 px-3 text-elec-yellow">Cable Size</th>
                  <th className="text-left py-2 px-3 text-elec-yellow">PVC T&E (mV/A/m)</th>
                  <th className="text-left py-2 px-3 text-elec-yellow">XLPE SWA (mV/A/m)</th>
                  <th className="text-left py-2 px-3 text-elec-yellow">Max Length* (m)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-3">1.5mm²</td>
                  <td className="py-2 px-3">29</td>
                  <td className="py-2 px-3">26</td>
                  <td className="py-2 px-3">20-30</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-3">2.5mm²</td>
                  <td className="py-2 px-3">18</td>
                  <td className="py-2 px-3">16</td>
                  <td className="py-2 px-3">30-50</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 px-3">4mm²</td>
                  <td className="py-2 px-3">11</td>
                  <td className="py-2 px-3">9.5</td>
                  <td className="py-2 px-3">50-80</td>
                </tr>
                <tr>
                  <td className="py-2 px-3">6mm²</td>
                  <td className="py-2 px-3">7.3</td>
                  <td className="py-2 px-3">6.4</td>
                  <td className="py-2 px-3">80-120</td>
                </tr>
              </tbody>
            </table>
            <p className="text-xs mt-2 text-gray-400">*Approximate maximum length for typical loading to stay within 5% voltage drop</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VoltageDropSection;