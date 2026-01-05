import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TreePine, Zap, Shield } from 'lucide-react';

export const AgriculturalInstallationsSection = () => {
  return (
    <Card className="bg-gradient-to-r from-amber-900/20 to-elec-gray border-amber-600/30">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <TreePine className="h-5 w-5 text-elec-yellow" />
          Agricultural Installation Requirements
        </CardTitle>
        <Badge variant="secondary" className="w-fit bg-amber-600 text-foreground">BS 7671 Section 705</Badge>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        <div className="bg-elec-dark p-3 rounded-md border border-gray-600">
          <h5 className="text-elec-yellow font-semibold mb-2">Code Reference: BS 7671:2018+A2:2022 Section 705</h5>
          <p className="text-sm">Agricultural and horticultural premises - Special requirements for livestock safety</p>
        </div>

        <div className="grid gap-6">
          {/* Livestock Safety */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="h-4 w-4 text-green-400" />
              <h5 className="text-green-400 font-semibold">Livestock Safety Requirements</h5>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">Animal Sensitivity Factors:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Lower body resistance due to wet conditions</li>
                  <li>• Four-point contact increasing current path</li>
                  <li>• Reduced ability to release from energised parts</li>
                  <li>• Stress-induced behavioural changes</li>
                  <li>• Herd effect amplifying incidents</li>
                </ul>
              </div>
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">Voltage Thresholds:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Cattle: 25V touch voltage limit</li>
                  <li>• Pigs: 12V touch voltage limit</li>
                  <li>• Sheep: 15V touch voltage limit</li>
                  <li>• Poultry: 12V touch voltage limit</li>
                  <li>• Step voltage: 10V maximum for all animals</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-green-900/20 border border-green-600/50 rounded">
              <p className="text-green-200 text-sm">
                <strong>Critical Requirement:</strong> All metallic structures accessible to livestock must be included in the equipotential bonding system.
              </p>
            </div>
          </div>

          {/* RCD Protection */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="h-4 w-4 text-yellow-400" />
              <h5 className="text-yellow-400 font-semibold">Enhanced RCD Protection</h5>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">Sensitivity Requirements:</h6>
                <ul className="text-sm space-y-1">
                  <li>• 30mA maximum for all socket outlet circuits</li>
                  <li>• 100mA for fixed equipment (where justified)</li>
                  <li>• 300mA for fire protection only</li>
                  <li>• Time-delayed coordination essential</li>
                  <li>• Type A or AC RCDs minimum</li>
                </ul>
              </div>
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">Installation Locations:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Main distribution boards</li>
                  <li>• Local equipment control panels</li>
                  <li>• Individual high-risk circuits</li>
                  <li>• Mobile equipment connections</li>
                  <li>• Outdoor socket outlet circuits</li>
                </ul>
              </div>
              <div>
                <h6 className="text-elec-yellow font-medium mb-2">Testing Requirements:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Monthly functional testing</li>
                  <li>• Annual calibration verification</li>
                  <li>• Environmental condition monitoring</li>
                  <li>• False tripping investigation</li>
                  <li>• Replacement after lightning strikes</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Equipotential Bonding */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <h5 className="text-elec-yellow font-semibold mb-3">Supplementary Equipotential Bonding</h5>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-blue-400 font-medium mb-2">Bonding Requirements:</h6>
                <ul className="text-sm space-y-1">
                  <li>• All metallic structures and pipework</li>
                  <li>• Reinforcing steel in concrete floors</li>
                  <li>• Metal framework of buildings</li>
                  <li>• Water and feed delivery systems</li>
                  <li>• Ventilation and heating equipment</li>
                  <li>• Fence posts within 3m of buildings</li>
                </ul>
              </div>
              <div>
                <h6 className="text-blue-400 font-medium mb-2">Conductor Sizing:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Minimum 4mm² copper conductor</li>
                  <li>• 6mm² for main equipotential connections</li>
                  <li>• Protective covering in accessible areas</li>
                  <li>• Corrosion-resistant connections</li>
                  <li>• Inspection and testing access points</li>
                  <li>• Documentation of all bonding points</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-900/20 border border-blue-600/50 rounded">
              <p className="text-blue-200 text-sm">
                <strong>Verification Testing:</strong> Equipotential bonding effectiveness must be verified by measuring resistance between all bonded metalwork (≤0.05Ω).
              </p>
            </div>
          </div>

          {/* Earth Electrode Systems */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <h5 className="text-elec-yellow font-semibold mb-3">Earth Electrode Design</h5>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h6 className="text-purple-400 font-medium mb-2">Electrode Types:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Ring electrodes around buildings</li>
                  <li>• Foundation earth electrodes</li>
                  <li>• Driven rod electrodes (minimum 2.4m)</li>
                  <li>• Horizontal strip electrodes</li>
                  <li>• Multiple parallel electrode systems</li>
                </ul>
              </div>
              <div>
                <h6 className="text-purple-400 font-medium mb-2">Performance Requirements:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Earth resistance ≤20Ω for TT systems</li>
                  <li>• Seasonal variation monitoring</li>
                  <li>• Soil resistivity measurements</li>
                  <li>• Lightning protection integration</li>
                  <li>• Corrosion protection measures</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Environmental Hazards */}
          <div className="bg-elec-dark p-4 rounded-md border border-gray-600">
            <h5 className="text-elec-yellow font-semibold mb-3">Agricultural Environmental Hazards</h5>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <h6 className="text-red-400 font-medium mb-2">Chemical Exposure:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Ammonia from livestock waste</li>
                  <li>• Chlorine-based disinfectants</li>
                  <li>• Fertiliser and pesticide sprays</li>
                  <li>• Salt-laden atmosphere</li>
                  <li>• Organic acid corrosion</li>
                </ul>
              </div>
              <div>
                <h6 className="text-red-400 font-medium mb-2">Mechanical Risks:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Vehicle and machinery impact</li>
                  <li>• Animal contact and rubbing</li>
                  <li>• High-pressure washing systems</li>
                  <li>• Vibration from equipment</li>
                  <li>• Loading and handling damage</li>
                </ul>
              </div>
              <div>
                <h6 className="text-red-400 font-medium mb-2">Protection Methods:</h6>
                <ul className="text-sm space-y-1">
                  <li>• Chemical-resistant enclosures</li>
                  <li>• Impact-protected cable routes</li>
                  <li>• Sealed connection systems</li>
                  <li>• Regular inspection schedules</li>
                  <li>• Preventive maintenance programs</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};