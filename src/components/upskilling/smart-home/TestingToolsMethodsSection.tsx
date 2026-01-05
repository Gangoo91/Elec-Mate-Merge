import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Gauge, Smartphone, Cpu } from 'lucide-react';
import MinimumDbmQuickCheck from '@/components/upskilling/smart-home/MinimumDbmQuickCheck';

const TestingToolsMethodsSection = () => {
  return (
    <div className="space-y-6">
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Gauge className="h-6 w-6 text-elec-yellow" />
            Testing Tools and Methods
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-gray-300">
            Professional signal testing requires the right tools and understanding of signal strength measurements.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-[#1a1a1a] rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Smartphone className="h-5 w-5 text-blue-400" />
                <span className="font-medium text-foreground">Wi-Fi Analyser Apps</span>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">Free smartphone apps for basic testing:</p>
                <ul className="text-gray-300 space-y-1 ml-4">
                  <li>• WiFi Analyzer (Android)</li>
                  <li>• Network Analyzer (iOS)</li>
                  <li>• WiFi Explorer (iOS)</li>
                  <li>• inSSIDer (PC/Mac)</li>
                </ul>
              </div>
            </div>

            <div className="p-4 bg-[#1a1a1a] rounded-lg">
              <div className="flex items-center gap-2 mb-3">
                <Cpu className="h-5 w-5 text-green-400" />
                <span className="font-medium text-foreground">Professional Tools</span>
              </div>
              <div className="space-y-2 text-sm">
                <p className="text-gray-300">Advanced diagnostic equipment:</p>
                <ul className="text-gray-300 space-y-1 ml-4">
                  <li>• RF spectrum analysers</li>
                  <li>• Network cable testers</li>
                  <li>• Mesh network mapping tools</li>
                  <li>• Protocol-specific analysers</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Understanding Signal Strength (dBm)</h4>
            
            <div className="bg-blue-600/10 border border-blue-600/30 rounded-lg p-4">
              <p className="text-blue-100 text-sm mb-3">
                dBm (decibel-milliwatts) measures Wi-Fi signal strength. Values are always negative — higher numbers (closer to 0) indicate stronger signals.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <div className="p-3 bg-green-900/30 border border-green-600 rounded text-center">
                  <div className="font-bold text-green-200">-30 to -50 dBm</div>
                  <div className="text-green-100 text-xs mt-1">Excellent</div>
                </div>
                <div className="p-3 bg-blue-900/30 border border-blue-600 rounded text-center">
                  <div className="font-bold text-blue-200">-50 to -65 dBm</div>
                  <div className="text-blue-100 text-xs mt-1">Good</div>
                </div>
                <div className="p-3 bg-yellow-900/30 border border-yellow-600 rounded text-center">
                  <div className="font-bold text-yellow-200">-65 to -75 dBm</div>
                  <div className="text-yellow-100 text-xs mt-1">Fair</div>
                </div>
                <div className="p-3 bg-red-900/30 border border-red-600 rounded text-center">
                  <div className="font-bold text-red-200">-75+ dBm</div>
                  <div className="text-red-100 text-xs mt-1">Poor</div>
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Testing Methodology</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-2">Initial Survey</h5>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Map current Wi-Fi coverage</li>
                  <li>• Identify dead zones</li>
                  <li>• Note interference sources</li>
                  <li>• Test at device locations</li>
                </ul>
              </div>

              <div className="p-4 bg-[#1a1a1a] rounded-lg">
                <h5 className="font-medium text-foreground mb-2">Mesh Network Testing</h5>
                <ul className="space-y-1 text-gray-300 text-sm">
                  <li>• Add powered devices first</li>
                  <li>• Test coverage with multiple nodes</li>
                  <li>• Verify redundant pathways</li>
                  <li>• Check battery device connectivity</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
            <h4 className="font-semibold text-elec-yellow mb-2">Recommended Minimum Signal Levels</h4>
            <ul className="space-y-2 text-gray-300 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Wi-Fi devices:</strong> -65 dBm or stronger for reliable operation
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Critical devices:</strong> -50 dBm or stronger (security, safety systems)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow">•</span>
                <strong>Mesh networks:</strong> Good coverage improves with device density
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <MinimumDbmQuickCheck />
    </div>
  );
};

export default TestingToolsMethodsSection;