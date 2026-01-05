import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const EnvironmentalChallenges = () => {
  return (
    <Card className="bg-gradient-to-r from-orange-900/20 to-elec-gray border-orange-600/30">
      <CardHeader>
        <CardTitle className="text-foreground">Environmental Challenges in Agricultural Settings</CardTitle>
        <Badge variant="secondary" className="w-fit bg-orange-600 text-foreground">Harsh Conditions</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-elec-dark p-3 rounded-md border border-gray-600 mb-4">
          <h5 className="text-elec-yellow font-semibold mb-2">Code Reference: BS 7671 Section 705 - Agricultural Premises</h5>
          <p className="text-sm">Special requirements for electrical installations in agricultural and horticultural premises with livestock considerations</p>
        </div>
        
        <div className="bg-elec-dark p-3 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-2">Agricultural Environment Classifications:</h5>
          
          {/* Mobile-friendly environment cards */}
          <div className="grid gap-4 md:hidden">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-red-400">
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-red-400">Livestock Areas</h6>
                <span className="text-xs bg-red-600 text-foreground px-2 py-1 rounded">IP44 min</span>
              </div>
              <p className="text-sm mb-1"><strong>Risk:</strong> Very High</p>
              <p className="text-sm mb-1"><strong>Special:</strong> SELV or 25V limit</p>
              <p className="text-sm"><strong>Use:</strong> Milking parlours, stables</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-orange-400">
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-orange-400">Feed/Storage</h6>
                <span className="text-xs bg-orange-600 text-foreground px-2 py-1 rounded">IP54</span>
              </div>
              <p className="text-sm mb-1"><strong>Risk:</strong> High</p>
              <p className="text-sm mb-1"><strong>Special:</strong> Dust/moisture protection</p>
              <p className="text-sm"><strong>Use:</strong> Grain stores, feed mills</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-yellow-400">
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-yellow-400">Equipment Sheds</h6>
                <span className="text-xs bg-yellow-600 text-foreground px-2 py-1 rounded">IP44</span>
              </div>
              <p className="text-sm mb-1"><strong>Risk:</strong> Medium</p>
              <p className="text-sm mb-1"><strong>Special:</strong> Mechanical protection</p>
              <p className="text-sm"><strong>Use:</strong> Workshops, machinery</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-green-400">Office/Domestic</h6>
                <span className="text-xs bg-green-600 text-foreground px-2 py-1 rounded">IP20</span>
              </div>
              <p className="text-sm mb-1"><strong>Risk:</strong> Standard</p>
              <p className="text-sm mb-1"><strong>Special:</strong> Standard wiring rules</p>
              <p className="text-sm"><strong>Use:</strong> Farmhouse, offices</p>
            </div>
          </div>
          
          {/* Desktop table - hidden on mobile */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2 text-elec-yellow">Environment Type</th>
                  <th className="text-left py-2 text-elec-yellow">Risk Level</th>
                  <th className="text-left py-2 text-elec-yellow">IP Rating Required</th>
                  <th className="text-left py-2 text-elec-yellow">Special Measures</th>
                  <th className="text-left py-2 text-elec-yellow">Typical Applications</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-medium text-red-400">Livestock Areas</td>
                  <td className="py-2">Very High</td>
                  <td className="py-2">IP44 minimum</td>
                  <td className="py-2">SELV or 25V limit</td>
                  <td className="py-2">Milking parlours, stables</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-medium text-orange-400">Feed/Storage</td>
                  <td className="py-2">High</td>
                  <td className="py-2">IP54</td>
                  <td className="py-2">Dust/moisture protection</td>
                  <td className="py-2">Grain stores, feed mills</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2 font-medium text-yellow-400">Equipment Sheds</td>
                  <td className="py-2">Medium</td>
                  <td className="py-2">IP44</td>
                  <td className="py-2">Mechanical protection</td>
                  <td className="py-2">Workshops, machinery</td>
                </tr>
                <tr>
                  <td className="py-2 font-medium text-green-400">Office/Domestic</td>
                  <td className="py-2">Standard</td>
                  <td className="py-2">IP20</td>
                  <td className="py-2">Standard wiring rules</td>
                  <td className="py-2">Farmhouse, offices</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-elec-dark p-3 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-2">Livestock Contact Protection:</h5>
          <div className="space-y-4 lg:grid lg:grid-cols-2 lg:gap-4">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Critical Safety:</h6>
              <ul className="text-sm space-y-1">
                <li>• Body voltage: 25V AC/60V DC max</li>
                <li>• Enhanced bonding required</li>
                <li>• 30mA RCD all circuits</li>
                <li>• SELV in milking areas</li>
                <li>• Isolating transformers</li>
                <li>• Regular PAT testing</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Hazards:</h6>
              <ul className="text-sm space-y-1">
                <li>• Corrosive atmosphere</li>
                <li>• High humidity/condensation</li>
                <li>• Dust accumulation</li>
                <li>• Mechanical livestock damage</li>
                <li>• Temperature extremes</li>
                <li>• Vermin cable damage</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark p-3 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-2">Agricultural Equipment:</h5>
          <ul className="text-sm space-y-1">
            <li>• Milking: SELV + emergency stops</li>
            <li>• Feed mixers: Explosion-proof motors</li>
            <li>• Ventilation: Multiple supplies</li>
            <li>• Lighting: Emergency backup</li>
            <li>• Water heating: Enhanced protection</li>
            <li>• Feeding: System resilience</li>
          </ul>
        </div>
        
        <div className="bg-elec-dark p-3 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-2">Outdoor Protection:</h5>
          <ul className="text-sm space-y-1">
            <li>• Underground: 600mm min depth</li>
            <li>• Cable marking + protection</li>
            <li>• Overhead: 6m clearance</li>
            <li>• Lightning protection</li>
            <li>• SPDs at sub-distributions</li>
            <li>• Weatherproof maintenance</li>
          </ul>
        </div>
        
        <div className="space-y-4">
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <h4 className="text-elec-yellow font-semibold mb-2 break-words">Weather and Environmental Factors</h4>
            <ul className="text-sm space-y-1 break-words">
              <li>• Temperature extremes: -20°C to +60°C typical range</li>
              <li>• High humidity and condensation in livestock buildings</li>
              <li>• UV radiation degradation of plastics and cables</li>
              <li>• Wind loading on overhead installations</li>
              <li>• Freeze-thaw cycling affecting foundations</li>
              <li>• Seasonal flooding considerations</li>
            </ul>
          </div>
          
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <h4 className="text-elec-yellow font-semibold mb-2 break-words">Mechanical Damage Risks</h4>
            <ul className="text-sm space-y-1 break-words">
              <li>• Large machinery and vehicle impact</li>
              <li>• Animal contact and damage</li>
              <li>• High-pressure water jet cleaning</li>
              <li>• Vibration from heavy equipment</li>
              <li>• Forklift and handling equipment</li>
              <li>• Ground movement and settlement</li>
            </ul>
          </div>
          
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <h4 className="text-elec-yellow font-semibold mb-2 break-words">Chemical Hazards</h4>
            <ul className="text-sm space-y-1 break-words">
              <li>• Corrosive animal waste and ammonia</li>
              <li>• Fertiliser and pesticide exposure</li>
              <li>• Cleaning chemicals and disinfectants</li>
              <li>• Salt spray in coastal areas</li>
              <li>• Silage acids and organic compounds</li>
              <li>• pH variations affecting metalwork</li>
            </ul>
          </div>
          
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <h4 className="text-elec-yellow font-semibold mb-2 break-words">Dust and Particulate Issues</h4>
            <ul className="text-sm space-y-1 break-words">
              <li>• Grain dust and chaff accumulation</li>
              <li>• Fine particulate ingress into equipment</li>
              <li>• Combustible dust explosion risks</li>
              <li>• Electrical contact contamination</li>
              <li>• Ventilation system loading</li>
              <li>• Regular cleaning requirements</li>
            </ul>
          </div>
        </div>
        
        <div className="bg-elec-dark p-3 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-2">Livestock Electrical Sensitivity:</h5>
          <ul className="text-sm space-y-1">
            <li>• Cattle: Most sensitive to electrical potential differences</li>
            <li>• Touch voltage limit: 12V AC (vs 50V for humans)</li>
            <li>• Step voltage considerations in wet conditions</li>
            <li>• Contact current limits: 2mA (vs 5mA for humans)</li>
            <li>• Behavioural changes indicating electrical problems</li>
            <li>• Multiple animal simultaneous contact scenarios</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default EnvironmentalChallenges;