import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { PoolCalculationResult } from "@/lib/swimming-pool";
import WhyThisMatters from "@/components/common/WhyThisMatters";
import { 
  BookOpen, 
  Wrench, 
  TestTube, 
  Clock, 
  AlertTriangle, 
  Shield,
  Lightbulb,
  CheckCircle,
  Eye
} from "lucide-react";

interface PoolGuidanceProps {
  result: PoolCalculationResult | null;
}

const PoolGuidance = ({ result }: PoolGuidanceProps) => {
  return (
    <div className="space-y-6 lg:space-y-8">
      {/* Regulatory Overview */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4 lg:mb-6">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-base lg:text-lg font-semibold text-white">Regulatory Requirements</h3>
        </div>
        
        <div className="space-y-4 lg:space-y-6">
          <div>
            <h4 className="font-medium text-elec-yellow mb-3 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              BS 7671:2018 Section 702 - Swimming Pools
            </h4>
            <p className="text-sm text-white mb-3 lg:mb-4 ml-6">
              The primary standard governing swimming pool electrical installations in the UK.
            </p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Zone classifications and IP rating requirements</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>RCD protection mandatory for all circuits</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Supplementary equipotential bonding requirements</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>SELV systems for underwater equipment</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Socket outlet placement restrictions</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Specific earthing arrangements for pool areas</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Emergency isolation requirements</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Special consideration for heating systems</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-blue-300 mb-3">IET Code of Practice for Electrical Installations</h4>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Guidance on domestic swimming pool installations</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Risk assessment requirements and procedures</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Installation and testing procedures</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Maintenance recommendations and schedules</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Selection of appropriate equipment and materials</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Design considerations for different pool types</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Documentation and certification requirements</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-purple-300 mb-3">Building Regulations Part P</h4>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Notification requirements for new pool installations</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Competent person scheme compliance</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Electrical installation certificates required</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Local authority building control involvement</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Third-party certification for non-registered installers</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Inspection and testing requirements</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Zone Classifications */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4 lg:mb-6">
          <Eye className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-base lg:text-lg font-semibold text-white">Zone Classifications Guide</h3>
        </div>
        
        <div className="space-y-4 lg:space-y-6">
          <div>
            <div className="flex flex-col gap-2 mb-3">
              <h4 className="font-medium text-red-300">Zone 0 - Highest Risk</h4>
              <Badge variant="outline" className="border-red-500/30 text-red-300 self-start text-xs">IPX8 Required</Badge>
            </div>
            <p className="text-sm text-white mb-3 lg:mb-4 ml-6">Interior of pool, fountain, or water feature</p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Maximum 12V SELV only</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Safety isolating transformer required</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>No socket outlets permitted</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Underwater lighting maximum 12V</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Equipment must be permanently fixed</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Cable entries must be waterproof</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <h4 className="font-medium text-yellow-300">Zone 1 - Medium Risk</h4>
              <Badge variant="outline" className="border-yellow-500/30 text-yellow-300 self-start sm:self-center">IPX4 Minimum</Badge>
            </div>
            <p className="text-sm text-white mb-4 ml-6">2m horizontally from pool edge, up to 2.5m height</p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>12V SELV systems preferred</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Limited 230V with additional protection</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>No socket outlets within 2m of pool</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>RCD protection mandatory</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Fixed equipment only (no portable appliances)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>All metalwork must be bonded</span>
              </li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
              <h4 className="font-medium text-green-300">Zone 2 - Lower Risk</h4>
              <Badge variant="outline" className="border-green-500/30 text-green-300 self-start sm:self-center">IPX2 Minimum</Badge>
            </div>
            <p className="text-sm text-white mb-4 ml-6">1.5m beyond Zone 1, up to 2.5m height</p>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>230V equipment permitted with RCD</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Socket outlets allowed with RCD protection</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Standard wiring methods acceptable</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>All circuits require 30mA RCD</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Standard electrical accessories permitted</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Normal installation methods apply</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Installation Steps */}
      {result && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <Wrench className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-semibold text-white">Installation Procedure</h3>
          </div>
          
          <div className="space-y-3 ml-6">
            {result.practicalGuidance.installationSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-elec-yellow mt-1">•</span>
                <p className="text-sm text-white">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testing Requirements */}
      {result && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <TestTube className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-semibold text-white">Testing & Verification</h3>
          </div>
          
          <div className="space-y-3 ml-6">
            {result.practicalGuidance.testingRequirements.map((test, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-elec-yellow mt-1">•</span>
                <p className="text-sm text-white">{test}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Maintenance */}
      {result && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <Clock className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-semibold text-white">Ongoing Maintenance</h3>
          </div>
          
          <div className="space-y-3 ml-6">
            {result.practicalGuidance.maintenancePoints.map((point, index) => (
              <div key={index} className="flex items-start gap-3">
                <span className="text-elec-yellow mt-1">•</span>
                <p className="text-sm text-white">{point}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Pitfalls */}
      {result && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-6">
            <AlertTriangle className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-semibold text-white">Common Pitfalls to Avoid</h3>
          </div>
          
          <div className="space-y-3">
            {result.practicalGuidance.commonPitfalls.map((pitfall, index) => (
              <Alert key={index} className="border-orange-500/20 bg-orange-500/10">
                <AlertTriangle className="h-4 w-4 text-orange-400" />
                <AlertDescription className="text-orange-200">
                  {pitfall}
                </AlertDescription>
              </Alert>
            ))}
          </div>
        </div>
      )}

      {/* Equipment Selection Guide */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg font-semibold text-white">Equipment Selection Guide</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-elec-yellow mb-3">Pool Pumps & Filtration</h4>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Single-phase pumps up to 3kW, three-phase for larger installations</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Variable speed drives recommended for energy efficiency</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Motor protection against overload and earth fault required</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Emergency isolation within sight of equipment</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Weatherproof enclosures for outdoor installations</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Consider starting current when sizing supply cables</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-blue-300 mb-3">Pool Heating Systems</h4>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Electric heaters: High load circuits, diversity factors apply</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Heat pumps: Consider defrost cycle loads and starting currents</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Gas heaters: Electrical supply for controls and fans only</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Solar controllers: Weather-resistant outdoor rated equipment</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Thermostats and sensors: Low voltage control circuits preferred</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-green-300 mb-3">Lighting Systems</h4>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Underwater: 12V SELV only, IPX8 rated, safety isolating transformer</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Pool area: LED recommended, dimming controls permitted in Zone 2</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Emergency lighting: SELV systems preferred, battery backup required</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Control systems: Smart controls must maintain safety isolation</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Cable runs: Special pool cable types required for underwater feeds</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Design Considerations */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg font-semibold text-white">Design Considerations</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-elec-yellow mb-3">Load Calculations</h4>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Apply diversity factors: Heating 75% (domestic), Pumps 100%, Lighting 80%</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Consider simultaneous operation patterns</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Include future load expansion requirements</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Motor starting current calculations essential</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Temperature derating for cable capacity in hot climates</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Voltage drop calculations critical for long cable runs</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-amber-300 mb-3">Cable Selection & Installation</h4>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Underground: SWA armoured cables or XLPE in ducting</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Pool equipment: H07RN-F flexible cables for connections</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Underwater: Special pool cables with enhanced insulation</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Minimum burial depth: 600mm for cables, 450mm for ducting</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Cable route marking and warning tape essential</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Avoid cable routes under pool or decking where possible</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-purple-300 mb-3">Earthing & Bonding Strategy</h4>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Main earth electrode (TT systems): Resistance ≤ 200Ω maximum</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Supplementary bonding: 4mm² minimum, all metalwork within 2m</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Pool structure bonding: Reinforcing steel, ladders, handrails</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Water system bonding: Inlet/outlet pipes, heating pipes</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Equipotential bonding conductor routing and protection</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Test points for ongoing verification of bonding integrity</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Advanced Topics */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <Shield className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg font-semibold text-white">Advanced Design Topics</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-red-300 mb-3">Commercial Pool Requirements</h4>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Additional 10mA RCD protection for underwater equipment</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Emergency stop systems for all pool equipment</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Backup power supplies for essential safety systems</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Professional design certification and periodic inspection</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Enhanced IP ratings: IPX5 minimum in Zone 1</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Fire alarm system integration and emergency lighting</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-blue-300 mb-3">Smart Pool Systems</h4>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Control systems must maintain safety isolation principles</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Remote monitoring: Secure communications, fail-safe operation</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Automation: Override capabilities for safety systems</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Integration with building management systems</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Cybersecurity considerations for connected equipment</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Backup manual controls for all automated functions</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-green-300 mb-3">Energy Efficiency</h4>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Variable speed pump drives: 30-70% energy savings possible</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>LED lighting systems: Lower heat generation, longer life</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Smart heating controls: Optimised scheduling and zoning</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Power factor correction for large motor loads</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Energy monitoring systems for consumption analysis</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Solar integration: Grid-tie considerations and safety</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Documentation & Certification */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-6">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg font-semibold text-white">Documentation & Certification</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-medium text-elec-yellow mb-3">Required Documentation</h4>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Electrical Installation Certificate (EIC) for new installations</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Minor Electrical Installation Works Certificate for additions</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Electrical Installation Condition Report (EICR) for existing systems</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Pool equipment operation and maintenance manuals</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Risk assessments and method statements</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Building control completion certificates</span>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-blue-300 mb-3">Testing Schedules</h4>
            <ul className="space-y-2 ml-6">
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Initial verification: Complete test schedule as per BS 7671</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Periodic inspection: Every 5 years (or as recommended)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>RCD testing: 6-monthly functional tests recommended</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>PAT testing: Annual for portable pool equipment</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Earth electrode testing: Annual (TT systems)</span>
              </li>
              <li className="flex items-start gap-3 text-sm text-white">
                <span className="text-elec-yellow mt-1">•</span>
                <span>Emergency system testing: Monthly functional checks</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Why This Matters */}
      <WhyThisMatters
        title="Why Swimming Pool Electrical Safety Matters"
        points={[
          "Water and electricity create extreme hazards - proper installation prevents electrocution",
          "Zone classifications ensure appropriate equipment for wet environments",
          "RCD protection provides rapid fault clearance in high-risk areas",
          "Supplementary bonding eliminates dangerous potential differences",
          "Regular testing ensures continued protection as equipment ages",
          "Compliance with BS 7671 Section 702 is legally required",
          "Professional installation protects users and reduces liability",
          "Proper earthing arrangements prevent shock and fire hazards"
        ]}
      />

      {/* Critical Safety Notice */}
      <Alert className="border-red-500/30 bg-red-500/10">
        <Shield className="h-4 w-4 text-red-400" />
        <AlertDescription className="text-red-200">
          <strong>Critical Safety Notice:</strong> Swimming pool electrical installations require specialist knowledge 
          and experience. Water and electricity create extreme hazards. Always engage qualified pool electrical 
          engineers for design and installation. Building control notification is required for new installations.
        </AlertDescription>
      </Alert>
    </div>
  );
};

export default PoolGuidance;