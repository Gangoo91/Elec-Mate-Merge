import { BarChart3, Calculator, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const ReferenceChartsSection = () => {
  return (
    <Card className="bg-gradient-to-r from-purple-900/20 to-elec-gray border-purple-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BarChart3 className="h-6 w-6 text-elec-yellow" />
          Reference Charts and Design Tools
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-purple-600 text-foreground">Quick Reference</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Derating Factor Quick Reference:</h5>
          
          <div className="space-y-4">
            <div className="bg-gray-800 p-4 rounded border-l-4 border-red-400">
              <h6 className="font-bold text-red-400 mb-3 text-sm sm:text-base">Ambient Temperature Factors</h6>
              <div className="grid grid-cols-2 gap-2 text-sm sm:text-base">
                <div className="flex justify-between py-1 border-b border-gray-600"><span>15°C:</span><span className="font-mono">1.10</span></div>
                <div className="flex justify-between py-1 border-b border-gray-600"><span>20°C:</span><span className="font-mono">1.05</span></div>
                <div className="flex justify-between py-1 border-b border-gray-600"><span>25°C:</span><span className="font-mono">1.02</span></div>
                <div className="flex justify-between py-1 border-b border-gray-600"><span>30°C:</span><span className="font-mono">1.00</span></div>
                <div className="flex justify-between py-1 border-b border-gray-600"><span>35°C:</span><span className="font-mono">0.94</span></div>
                <div className="flex justify-between py-1 border-b border-gray-600"><span>40°C:</span><span className="font-mono">0.87</span></div>
                <div className="flex justify-between py-1 border-b border-gray-600"><span>45°C:</span><span className="font-mono">0.79</span></div>
                <div className="flex justify-between py-1 border-b border-gray-600"><span>50°C:</span><span className="font-mono">0.71</span></div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-4 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-3 text-sm sm:text-base">Grouping Factors (Circuits)</h6>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
                <div className="flex justify-between py-1 border-b border-gray-600"><span>1 circuit:</span><span className="font-mono">1.00</span></div>
                <div className="flex justify-between py-1 border-b border-gray-600"><span>2 circuits:</span><span className="font-mono">0.80</span></div>
                <div className="flex justify-between py-1 border-b border-gray-600"><span>3 circuits:</span><span className="font-mono">0.70</span></div>
                <div className="flex justify-between py-1 border-b border-gray-600"><span>4-5 circuits:</span><span className="font-mono">0.65</span></div>
                <div className="flex justify-between py-1 border-b border-gray-600"><span>6-8 circuits:</span><span className="font-mono">0.60</span></div>
                <div className="flex justify-between py-1 border-b border-gray-600"><span>9-11 circuits:</span><span className="font-mono">0.55</span></div>
                <div className="flex justify-between py-1"><span>12+ circuits:</span><span className="font-mono">0.50</span></div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-4 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-3 text-sm sm:text-base">Thermal Insulation Factors</h6>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm sm:text-base">
                <div className="flex justify-between py-1 border-b border-gray-600"><span>50mm insulation:</span><span className="font-mono">0.94</span></div>
                <div className="flex justify-between py-1 border-b border-gray-600"><span>100mm insulation:</span><span className="font-mono">0.88</span></div>
                <div className="flex justify-between py-1 border-b border-gray-600"><span>150mm insulation:</span><span className="font-mono">0.83</span></div>
                <div className="flex justify-between py-1 border-b border-gray-600"><span>200mm insulation:</span><span className="font-mono">0.78</span></div>
                <div className="flex justify-between py-1 border-b border-gray-600"><span>250mm insulation:</span><span className="font-mono">0.73</span></div>
                <div className="flex justify-between py-1 border-b border-gray-600"><span>300mm insulation:</span><span className="font-mono">0.70</span></div>
                <div className="flex justify-between py-1"><span>400mm+ insulation:</span><span className="font-mono">0.63</span></div>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block overflow-x-auto mt-6">
            <table className="w-full text-sm border border-gray-600">
              <thead>
                <tr className="border-b border-gray-600 bg-gray-800">
                  <th className="text-left py-3 px-4 text-elec-yellow">Factor Type</th>
                  <th className="text-left py-3 px-4 text-elec-yellow">Condition</th>
                  <th className="text-left py-3 px-4 text-elec-yellow">Multiplier</th>
                  <th className="text-left py-3 px-4 text-elec-yellow">Application Notes</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4">Ambient Temperature</td>
                  <td className="py-3 px-4">35°C / 40°C / 45°C</td>
                  <td className="py-3 px-4">0.94 / 0.87 / 0.79</td>
                  <td className="py-3 px-4">Most common UK conditions</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4">Circuit Grouping</td>
                  <td className="py-3 px-4">2-3 / 4-5 / 6+ circuits</td>
                  <td className="py-3 px-4">0.80-0.70 / 0.65 / 0.60-0.50</td>
                  <td className="py-3 px-4">Loaded simultaneously</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4">Thermal Insulation</td>
                  <td className="py-3 px-4">100mm / 200mm / 300mm</td>
                  <td className="py-3 px-4">0.88 / 0.78 / 0.70</td>
                  <td className="py-3 px-4">Touching or surrounded</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Semi-enclosed Fuse</td>
                  <td className="py-3 px-4">All ratings</td>
                  <td className="py-3 px-4">0.725</td>
                  <td className="py-3 px-4">Rewirable fuse protection</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Voltage Drop Quick Calculator:</h5>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gray-800 p-3 rounded">
              <Calculator className="h-5 w-5 text-elec-yellow mb-2" />
              <h6 className="font-bold text-foreground mb-2">Cable Size Selection</h6>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-gray-600 pb-1">
                  <span>1.5mm² T&E:</span><span>29 mV/A/m</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 pb-1">
                  <span>2.5mm² T&E:</span><span>18 mV/A/m</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 pb-1">
                  <span>4mm² T&E:</span><span>11 mV/A/m</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 pb-1">
                  <span>6mm² T&E:</span><span>7.3 mV/A/m</span>
                </div>
                <div className="flex justify-between">
                  <span>10mm² T&E:</span><span>4.4 mV/A/m</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded">
              <TrendingUp className="h-5 w-5 text-elec-yellow mb-2" />
              <h6 className="font-bold text-foreground mb-2">Maximum Circuit Lengths</h6>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between border-b border-gray-600 pb-1">
                  <span>6A lighting (1.5mm²):</span><span>66m</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 pb-1">
                  <span>16A radial (2.5mm²):</span><span>40m</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 pb-1">
                  <span>20A radial (4mm²):</span><span>25m</span>
                </div>
                <div className="flex justify-between border-b border-gray-600 pb-1">
                  <span>32A ring (2.5mm²):</span><span>106m total</span>
                </div>
                <div className="flex justify-between">
                  <span>40A shower (6mm²):</span><span>25m</span>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 p-3 rounded">
              <BarChart3 className="h-5 w-5 text-elec-yellow mb-2" />
              <h6 className="font-bold text-foreground mb-2">Common Applications</h6>
              <div className="space-y-2 text-xs">
                <div className="border-b border-gray-600 pb-1">
                  <span className="font-medium">Domestic lighting:</span>
                  <div>3% limit (6.9V at 230V)</div>
                </div>
                <div className="border-b border-gray-600 pb-1">
                  <span className="font-medium">Socket circuits:</span>
                  <div>5% limit (11.5V at 230V)</div>
                </div>
                <div className="border-b border-gray-600 pb-1">
                  <span className="font-medium">Motor circuits:</span>
                  <div>Consider starting current</div>
                </div>
                <div>
                  <span className="font-medium">Distribution:</span>
                  <div>Cumulative effect</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-4 text-base sm:text-lg">Installation Method Reference:</h5>
          
          <div className="space-y-4 lg:hidden">
            <div className="bg-gray-800 p-4 rounded border-l-4 border-blue-400">
              <div className="flex items-center justify-between mb-2">
                <h6 className="font-bold text-blue-400 text-lg">A1</h6>
                <Badge className="bg-yellow-600 text-foreground text-xs">Reduced</Badge>
              </div>
              <p className="text-sm sm:text-base mb-1 font-medium">Conduit in thermally insulated wall</p>
              <p className="text-xs text-gray-400">Modern cavity wall construction</p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded border-l-4 border-blue-400">
              <div className="flex items-center justify-between mb-2">
                <h6 className="font-bold text-blue-400 text-lg">A2</h6>
                <Badge className="bg-yellow-600 text-foreground text-xs">Reduced</Badge>
              </div>
              <p className="text-sm sm:text-base mb-1 font-medium">Cable in thermally insulated wall</p>
              <p className="text-xs text-gray-400">Direct burial in insulated wall</p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded border-l-4 border-green-400">
              <div className="flex items-center justify-between mb-2">
                <h6 className="font-bold text-green-400 text-lg">B1</h6>
                <Badge className="bg-green-600 text-foreground text-xs">Standard</Badge>
              </div>
              <p className="text-sm sm:text-base mb-1 font-medium">Conduit on wall or trunking</p>
              <p className="text-xs text-gray-400">Surface mounted systems</p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded border-l-4 border-green-400">
              <div className="flex items-center justify-between mb-2">
                <h6 className="font-bold text-green-400 text-lg">B2</h6>
                <Badge className="bg-green-600 text-foreground text-xs">Standard</Badge>
              </div>
              <p className="text-sm sm:text-base mb-1 font-medium">Cable tray, ladder, basket</p>
              <p className="text-xs text-gray-400">Industrial installations</p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded border-l-4 border-purple-400">
              <div className="flex items-center justify-between mb-2">
                <h6 className="font-bold text-purple-400 text-lg">C</h6>
                <Badge className="bg-blue-600 text-foreground text-xs">Enhanced</Badge>
              </div>
              <p className="text-sm sm:text-base mb-1 font-medium">Clipped direct or embedded</p>
              <p className="text-xs text-gray-400">T&E on joists, SWA buried</p>
            </div>
            
            <div className="bg-gray-800 p-4 rounded border-l-4 border-purple-400">
              <div className="flex items-center justify-between mb-2">
                <h6 className="font-bold text-purple-400 text-lg">E</h6>
                <Badge className="bg-blue-600 text-foreground text-xs">Maximum</Badge>
              </div>
              <p className="text-sm sm:text-base mb-1 font-medium">Free air installations</p>
              <p className="text-xs text-gray-400">Overhead lines, air cables</p>
            </div>
          </div>
          
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full text-sm border border-gray-600">
              <thead>
                <tr className="border-b border-gray-600 bg-gray-800">
                  <th className="text-left py-3 px-4 text-elec-yellow">Method</th>
                  <th className="text-left py-3 px-4 text-elec-yellow">Description</th>
                  <th className="text-left py-3 px-4 text-elec-yellow">Typical Application</th>
                  <th className="text-left py-3 px-4 text-elec-yellow">Capacity Factor</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4 font-bold">A1</td>
                  <td className="py-3 px-4">Conduit in thermally insulated wall</td>
                  <td className="py-3 px-4">Modern cavity wall construction</td>
                  <td className="py-3 px-4 text-yellow-400">Reduced</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4 font-bold">A2</td>
                  <td className="py-3 px-4">Cable in thermally insulated wall</td>
                  <td className="py-3 px-4">Direct burial in insulated wall</td>
                  <td className="py-3 px-4 text-yellow-400">Reduced</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4 font-bold">B1</td>
                  <td className="py-3 px-4">Conduit on wall or trunking</td>
                  <td className="py-3 px-4">Surface mounted systems</td>
                  <td className="py-3 px-4 text-green-400">Standard</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4 font-bold">B2</td>
                  <td className="py-3 px-4">Cable tray, ladder, basket</td>
                  <td className="py-3 px-4">Industrial installations</td>
                  <td className="py-3 px-4 text-green-400">Standard</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4 font-bold">C</td>
                  <td className="py-3 px-4">Clipped direct or embedded</td>
                  <td className="py-3 px-4">T&E on joists, SWA buried</td>
                  <td className="py-3 px-4 text-blue-400">Enhanced</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-bold">E</td>
                  <td className="py-3 px-4">Free air installations</td>
                  <td className="py-3 px-4">Overhead lines, air cables</td>
                  <td className="py-3 px-4 text-blue-400">Maximum</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Protective Device Characteristics:</h5>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">MCB Time-Current Characteristics:</h6>
              <div className="bg-gray-800 p-3 rounded">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-gray-600 pb-1">
                    <span><strong>Type B:</strong> 3-5 × In</span>
                    <span>General purpose</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-600 pb-1">
                    <span><strong>Type C:</strong> 5-10 × In</span>
                    <span>Motor loads</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-600 pb-1">
                    <span><strong>Type D:</strong> 10-20 × In</span>
                    <span>High inrush</span>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>Type K:</strong> 8-12 × In</span>
                    <span>Motor protection</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">RCD Operation Parameters:</h6>
              <div className="bg-gray-800 p-3 rounded">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between border-b border-gray-600 pb-1">
                    <span><strong>30mA RCD:</strong> ≤300ms</span>
                    <span>Additional protection</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-600 pb-1">
                    <span><strong>100mA RCD:</strong> ≤300ms</span>
                    <span>Fire protection</span>
                  </div>
                  <div className="flex justify-between border-b border-gray-600 pb-1">
                    <span><strong>300mA RCD:</strong> ≤300ms</span>
                    <span>Equipment protection</span>
                  </div>
                  <div className="flex justify-between">
                    <span><strong>Type AC/A/F/B:</strong> Waveform</span>
                    <span>Load dependent</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-3">Design Verification Flowchart:</h5>
          <div className="grid gap-3">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <h6 className="font-bold text-blue-400 mb-1">Step 1: Load Analysis</h6>
              <p className="text-sm">Calculate design current (Ib) → Select protective device (In ≥ Ib) → Determine maximum demand</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <h6 className="font-bold text-green-400 mb-1">Step 2: Cable Selection</h6>
              <p className="text-sm">Installation method → Correction factors → Required It → Select cable (Iz ≥ It)</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-yellow-400">
              <h6 className="font-bold text-yellow-400 mb-1">Step 3: Protection Verification</h6>
              <p className="text-sm">Calculate Zs → Compare with tables → Verify discrimination → Check voltage drop</p>
            </div>
            <div className="bg-gray-800 p-3 rounded border-l-4 border-purple-400">
              <h6 className="font-bold text-purple-400 mb-1">Step 4: Documentation</h6>
              <p className="text-sm">Complete schedules → Verify calculations → Prepare certificates → Test and commission</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReferenceChartsSection;