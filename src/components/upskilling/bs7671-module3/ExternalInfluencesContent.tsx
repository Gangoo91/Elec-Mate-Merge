import { AlertTriangle, Shield, Thermometer, Droplets, Zap, Eye, Info, CheckCircle, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export const ExternalInfluencesContent = () => {
  return (
    <div className="space-y-8">
      {/* Comprehensive Environmental Classification Guide */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Thermometer className="h-6 w-6 text-elec-yellow" />
            Complete Environmental Classification System
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-base leading-relaxed">
            BS 7671 uses a systematic approach to categorise environmental conditions that affect electrical installations. 
            Each classification code helps determine appropriate material selection, installation methods, and protection requirements.
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Temperature Classifications */}
            <div className="bg-elec-dark p-4 rounded-lg border border-red-600/30">
              <h4 className="text-red-300 font-semibold text-lg mb-3 flex items-center gap-2">
                <Thermometer className="h-5 w-5" />
                Temperature (AA Classifications)
              </h4>
              <div className="space-y-3">
                <div className="bg-red-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">AA1: -60°C to +5°C</p>
                  <p className="text-xs text-foreground">Cold storage facilities, refrigerated warehouses</p>
                  <p className="text-xs text-red-300">Special low-temperature cables required</p>
                </div>
                <div className="bg-red-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">AA4: -5°C to +40°C</p>
                  <p className="text-xs text-foreground">Normal indoor environments (most common)</p>
                  <p className="text-xs text-green-300">Standard PVC cables suitable</p>
                </div>
                <div className="bg-red-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">AA6: +5°C to +60°C</p>
                  <p className="text-xs text-foreground">Boiler rooms, foundries, hot climates</p>
                  <p className="text-xs text-red-300">XLPE or heat-resistant cables essential</p>
                </div>
              </div>
            </div>

            {/* Water and Moisture Classifications */}
            <div className="bg-elec-dark p-4 rounded-lg border border-blue-600/30">
              <h4 className="text-blue-300 font-semibold text-lg mb-3 flex items-center gap-2">
                <Droplets className="h-5 w-5" />
                Water Presence (AD/AE Classifications)
              </h4>
              <div className="space-y-3">
                <div className="bg-blue-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">AD1/AE1: Dry locations</p>
                  <p className="text-xs text-foreground">Office buildings, living areas</p>
                  <p className="text-xs text-green-300">IP20 protection sufficient</p>
                </div>
                <div className="bg-blue-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">AD4/AE4: Water splashing</p>
                  <p className="text-xs text-foreground">Kitchens, wash areas, light rain</p>
                  <p className="text-xs text-blue-300">IP44 minimum required</p>
                </div>
                <div className="bg-blue-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">AD7/AE7: Temporary immersion</p>
                  <p className="text-xs text-foreground">Areas subject to flooding</p>
                  <p className="text-xs text-blue-300">IP67 protection essential</p>
                </div>
              </div>
            </div>

            {/* Chemical Influences */}
            <div className="bg-elec-dark p-4 rounded-lg border border-yellow-600/30">
              <h4 className="text-yellow-300 font-semibold text-lg mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Chemical Influences (AF Classifications)
              </h4>
              <div className="space-y-3">
                <div className="bg-yellow-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">AF1: Negligible</p>
                  <p className="text-xs text-foreground">Normal indoor environments</p>
                  <p className="text-xs text-green-300">Standard materials suitable</p>
                </div>
                <div className="bg-yellow-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">AF2: Significant</p>
                  <p className="text-xs text-foreground">Swimming pools, coastal areas</p>
                  <p className="text-xs text-yellow-300">Corrosion-resistant materials needed</p>
                </div>
                <div className="bg-yellow-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">AF3: High</p>
                  <p className="text-xs text-foreground">Chemical plants, marine environments</p>
                  <p className="text-xs text-red-300">Specialist cables and enclosures essential</p>
                </div>
              </div>
            </div>

            {/* Mechanical Influences */}
            <div className="bg-elec-dark p-4 rounded-lg border border-green-600/30">
              <h4 className="text-green-300 font-semibold text-lg mb-3 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Mechanical Influences (BE Classifications)
              </h4>
              <div className="space-y-3">
                <div className="bg-green-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">BE1: Low impact risk</p>
                  <p className="text-xs text-foreground">Offices, domestic areas</p>
                  <p className="text-xs text-green-300">Basic cable protection adequate</p>
                </div>
                <div className="bg-green-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">BE2: Medium impact risk</p>
                  <p className="text-xs text-foreground">Workshops, garages</p>
                  <p className="text-xs text-yellow-300">Enhanced protection recommended</p>
                </div>
                <div className="bg-green-900/20 p-3 rounded">
                  <p className="text-foreground font-semibold text-sm">BE3: High impact risk</p>
                  <p className="text-xs text-foreground">Industrial areas, construction sites</p>
                  <p className="text-xs text-red-300">Armoured cables or conduit essential</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Material Selection Matrix */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Star className="h-6 w-6 text-elec-yellow" />
            Material Selection Matrix
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-base leading-relaxed">
            Systematic approach to matching environmental conditions with appropriate materials and installation methods.
          </p>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-3 px-4 text-elec-yellow">Environment Type</th>
                  <th className="text-left py-3 px-4 text-elec-yellow">Influence Codes</th>
                  <th className="text-left py-3 px-4 text-elec-yellow">Cable Type</th>
                  <th className="text-left py-3 px-4 text-elec-yellow">Protection Method</th>
                  <th className="text-left py-3 px-4 text-elec-yellow">IP Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="py-3 px-4 font-medium">Domestic/Office</td>
                  <td className="py-3 px-4">AA4, AD1, AF1, BE1</td>
                  <td className="py-3 px-4">PVC/PVC</td>
                  <td className="py-3 px-4">Plastic trunking/conduit</td>
                  <td className="py-3 px-4">IP20</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Kitchen/Bathroom</td>
                  <td className="py-3 px-4">AA4, AD4, AF1, BE1</td>
                  <td className="py-3 px-4">PVC/PVC</td>
                  <td className="py-3 px-4">IP-rated accessories</td>
                  <td className="py-3 px-4">IP44</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Workshop/Garage</td>
                  <td className="py-3 px-4">AA4, AD2, AF1, BE2</td>
                  <td className="py-3 px-4">PVC/PVC or SWA</td>
                  <td className="py-3 px-4">Steel conduit/trunking</td>
                  <td className="py-3 px-4">IP54</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Outdoor/External</td>
                  <td className="py-3 px-4">AA5, AD4-6, AF2, BE2</td>
                  <td className="py-3 px-4">XLPE/PVC or SWA</td>
                  <td className="py-3 px-4">UV-resistant conduit</td>
                  <td className="py-3 px-4">IP65</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Industrial/Chemical</td>
                  <td className="py-3 px-4">AA6, AD4, AF3, BE3</td>
                  <td className="py-3 px-4">XLPE/XLPE or MI</td>
                  <td className="py-3 px-4">Stainless steel systems</td>
                  <td className="py-3 px-4">IP66/IP67</td>
                </tr>
                <tr>
                  <td className="py-3 px-4 font-medium">Underground</td>
                  <td className="py-3 px-4">AA3, AD7, AF2, BE3</td>
                  <td className="py-3 px-4">XLPE/XLPE SWA</td>
                  <td className="py-3 px-4">Ducting/direct burial</td>
                  <td className="py-3 px-4">IP68</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Considerations */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <Eye className="h-6 w-6 text-blue-500" />
            Advanced Environmental Considerations
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="bg-blue-600/10 p-4 rounded-lg border border-blue-600/30">
                <h4 className="text-blue-300 font-semibold mb-3">Thermal Considerations</h4>
                <ul className="text-sm space-y-2">
                  <li>• Derating factors for grouped cables in high temperatures</li>
                  <li>• Thermal cycling effects on cable life</li>
                  <li>• Heat sources (lighting, machinery) affecting cable routes</li>
                  <li>• Thermal insulation effects on current-carrying capacity</li>
                  <li>• Solar heating of external installations</li>
                </ul>
              </div>

              <div className="bg-yellow-600/10 p-4 rounded-lg border border-yellow-600/30">
                <h4 className="text-yellow-300 font-semibold mb-3">UV and Weather Protection</h4>
                <ul className="text-sm space-y-2">
                  <li>• UV stabilised cable sheaths for outdoor installations</li>
                  <li>• Weatherproof glands and entries</li>
                  <li>• Drainage provisions in external enclosures</li>
                  <li>• Expansion joints for temperature variation</li>
                  <li>• Wind loading considerations for overhead systems</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-green-600/10 p-4 rounded-lg border border-green-600/30">
                <h4 className="text-green-300 font-semibold mb-3">Chemical and Biological Factors</h4>
                <ul className="text-sm space-y-2">
                  <li>• Rodent protection in agricultural/rural areas</li>
                  <li>• Fungal growth prevention in damp conditions</li>
                  <li>• Saltwater corrosion in coastal installations</li>
                  <li>• Chemical compatibility of materials</li>
                  <li>• Cleaning agent resistance requirements</li>
                </ul>
              </div>

              <div className="bg-red-600/10 p-4 rounded-lg border border-red-600/30">
                <h4 className="text-red-300 font-semibold mb-3">Special Location Requirements</h4>
                <ul className="text-sm space-y-2">
                  <li>• Swimming pools and fountains (Section 702)</li>
                  <li>• Medical locations (Section 710)</li>
                  <li>• Agricultural and horticultural premises (Section 705)</li>
                  <li>• Construction sites (Section 704)</li>
                  <li>• Caravans and motor caravans (Section 721)</li>
                </ul>
              </div>
            </div>
          </div>

          <Alert className="border-orange-600/30 bg-orange-900/20">
            <AlertTriangle className="h-4 w-4 text-orange-400" />
            <AlertDescription className="text-foreground">
              <strong className="text-orange-300">Critical Assessment Point:</strong> Multiple environmental factors often combine in real installations. 
              Always assess the most severe condition from each category and design accordingly. When in doubt, upgrade to the next protection level.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Professional Assessment Workflow */}
      <Card className="bg-elec-gray border-transparent">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-green-500" />
            Professional Assessment Workflow
          </CardTitle>
        </CardHeader>
        <CardContent className="text-foreground space-y-6">
          <p className="text-base leading-relaxed">
            Systematic approach to environmental assessment ensures comprehensive evaluation and appropriate material selection.
          </p>

          <div className="space-y-4">
            {[
              {
                step: 1,
                title: "Site Survey and Documentation",
                content: "Visit the installation location during different conditions (day/night, seasons if possible). Document all environmental factors, existing infrastructure, and operational requirements. Take photographs and measurements.",
                color: "blue"
              },
              {
                step: 2,
                title: "Environmental Classification",
                content: "Apply BS 7671 influence codes systematically. Assess temperature ranges, water/moisture exposure, chemical presence, mechanical risks, and biological factors. Consider future changes in building use.",
                color: "yellow"
              },
              {
                step: 3,
                title: "Risk Analysis and Mitigation",
                content: "Identify the most severe conditions from each category. Consider combined effects and worst-case scenarios. Develop mitigation strategies for identified risks.",
                color: "orange"
              },
              {
                step: 4,
                title: "Material and Method Selection",
                content: "Choose cables, protection methods, and installation techniques based on environmental assessment. Ensure compatibility between all system components and future expansion needs.",
                color: "green"
              },
              {
                step: 5,
                title: "Validation and Documentation",
                content: "Verify all selections meet or exceed requirements. Document decisions with justification for compliance and future reference. Consider maintenance accessibility.",
                color: "purple"
              }
            ].map((item, index) => (
              <div key={index} className="flex gap-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
                  item.color === 'blue' ? 'bg-blue-500 text-foreground' :
                  item.color === 'yellow' ? 'bg-yellow-500 text-black' :
                  item.color === 'orange' ? 'bg-orange-500 text-foreground' :
                  item.color === 'green' ? 'bg-green-500 text-foreground' :
                  'bg-purple-500 text-foreground'
                }`}>
                  {item.step}
                </div>
                <div className="flex-1">
                  <h5 className="text-foreground font-semibold text-sm mb-2">{item.title}</h5>
                  <p className="text-xs text-foreground leading-relaxed">{item.content}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};