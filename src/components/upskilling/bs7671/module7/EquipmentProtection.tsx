import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const EquipmentProtection = () => {
  return (
    <Card className="bg-gradient-to-r from-blue-900/20 to-elec-gray border-blue-600/30">
      <CardHeader>
        <CardTitle className="text-foreground">Equipment Protection Standards and Selection</CardTitle>
        <Badge variant="secondary" className="w-fit bg-blue-600 text-foreground">Protection Standards</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-4">
        <div className="bg-elec-dark p-3 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-2">IP Rating Requirements by Application:</h5>
          
          {/* Mobile-friendly cards */}
          <div className="grid gap-3 sm:hidden">
            <div className="bg-gray-800 p-3 rounded border-l-4 border-blue-400">
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-blue-400 text-sm">Outdoor general</h6>
                <span className="text-xs bg-blue-600 text-foreground px-2 py-1 rounded">IP54</span>
              </div>
              <p className="text-xs mb-1"><strong>Additional:</strong> UV resistance</p>
              <p className="text-xs"><strong>Equipment:</strong> Switches, isolators</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-green-400">
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-green-400 text-sm">Livestock areas</h6>
                <span className="text-xs bg-green-600 text-foreground px-2 py-1 rounded">IP65</span>
              </div>
              <p className="text-xs mb-1"><strong>Additional:</strong> Washdown capability</p>
              <p className="text-xs"><strong>Equipment:</strong> Luminaires, controls</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-yellow-400">
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-yellow-400 text-sm">Feed preparation</h6>
                <span className="text-xs bg-yellow-600 text-foreground px-2 py-1 rounded">IP66</span>
              </div>
              <p className="text-xs mb-1"><strong>Additional:</strong> Dust tight sealing</p>
              <p className="text-xs"><strong>Equipment:</strong> Motors, distribution</p>
            </div>
            
            <div className="bg-gray-800 p-3 rounded border-l-4 border-red-400">
              <div className="flex justify-between items-center mb-2">
                <h6 className="font-bold text-red-400 text-sm">Milking parlours</h6>
                <span className="text-xs bg-red-600 text-foreground px-2 py-1 rounded">IP67</span>
              </div>
              <p className="text-xs mb-1"><strong>Additional:</strong> Chemical resistance</p>
              <p className="text-xs"><strong>Equipment:</strong> All electrical equipment</p>
            </div>
          </div>
          
          {/* Desktop table - hidden on mobile */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left py-2 text-elec-yellow">Location</th>
                  <th className="text-left py-2 text-elec-yellow">Min IP Rating</th>
                  <th className="text-left py-2 text-elec-yellow">Additional Requirements</th>
                  <th className="text-left py-2 text-elec-yellow">Typical Equipment</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-700">
                  <td className="py-2">Outdoor general</td>
                  <td className="py-2">IP54</td>
                  <td className="py-2">UV resistance</td>
                  <td className="py-2">Switches, isolators</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2">Livestock areas</td>
                  <td className="py-2">IP65</td>
                  <td className="py-2">Washdown capability</td>
                  <td className="py-2">Luminaires, controls</td>
                </tr>
                <tr className="border-b border-gray-700">
                  <td className="py-2">Feed preparation</td>
                  <td className="py-2">IP66</td>
                  <td className="py-2">Dust tight sealing</td>
                  <td className="py-2">Motors, distribution</td>
                </tr>
                <tr>
                  <td className="py-2">Milking parlours</td>
                  <td className="py-2">IP67</td>
                  <td className="py-2">Chemical resistance</td>
                  <td className="py-2">All electrical equipment</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        
        <div className="bg-elec-dark p-3 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-2">Material Selection Guidelines:</h5>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Enclosure Materials:</h6>
              <ul className="text-sm space-y-1">
                <li>• Stainless steel 316L for corrosive environments</li>
                <li>• Galvanised steel with protective coating</li>
                <li>• UV-stabilised polycarbonate or ABS plastic</li>
                <li>• Aluminium with appropriate surface treatment</li>
                <li>• GRP (Glass Reinforced Plastic) for chemical resistance</li>
              </ul>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-2">Gasket and Seal Materials:</h6>
              <ul className="text-sm space-y-1">
                <li>• EPDM rubber for weather resistance</li>
                <li>• Neoprene for oil and chemical resistance</li>
                <li>• Silicone for temperature extremes</li>
                <li>• Viton for aggressive chemical environments</li>
                <li>• Regular inspection and replacement schedule</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark p-3 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-2">Impact Protection (IK Ratings):</h5>
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <h6 className="text-yellow-400 font-medium mb-1">IK08 (5 Joules):</h6>
              <p className="text-xs">Standard outdoor equipment, protected from normal handling</p>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-1">IK09 (10 Joules):</h6>
              <p className="text-xs">Agricultural machinery areas, vehicle traffic zones</p>
            </div>
            <div>
              <h6 className="text-yellow-400 font-medium mb-1">IK10 (20 Joules):</h6>
              <p className="text-xs">Heavy machinery areas, livestock contact zones</p>
            </div>
          </div>
        </div>
        
        <div className="bg-elec-dark p-3 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-2">Cable Protection and Installation:</h5>
          <ul className="text-sm space-y-1">
            <li>• Steel wire armoured (SWA) cable for direct burial</li>
            <li>• XLPE insulation for moisture resistance and longevity</li>
            <li>• Rodent-proof cable construction where required</li>
            <li>• Minimum burial depth: 600mm in agricultural areas</li>
            <li>• Warning tape installed 300mm above cable runs</li>
            <li>• Concrete or paving slab protection in vehicle areas</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default EquipmentProtection;