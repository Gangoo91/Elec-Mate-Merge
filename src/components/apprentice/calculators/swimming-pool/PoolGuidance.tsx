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
    <div className="space-y-6">
      {/* Regulatory Overview */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg font-semibold text-white">Regulatory Requirements</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-elec-yellow mb-2 flex items-center gap-2">
              <Shield className="h-4 w-4" />
              BS 7671:2018 Section 702 - Swimming Pools
            </h4>
            <p className="text-sm text-white mb-3">
              The primary standard governing swimming pool electrical installations in the UK.
            </p>
            <ul className="space-y-1 text-xs text-white list-disc list-inside">
              <li>Zone classifications and IP rating requirements</li>
              <li>RCD protection mandatory for all circuits</li>
              <li>Supplementary equipotential bonding requirements</li>
              <li>SELV systems for underwater equipment</li>
              <li>Socket outlet placement restrictions</li>
              <li>Specific earthing arrangements for pool areas</li>
              <li>Emergency isolation requirements</li>
              <li>Special consideration for heating systems</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-blue-300 mb-2">IET Code of Practice for Electrical Installations</h4>
            <ul className="space-y-1 text-xs text-white list-disc list-inside">
              <li>Guidance on domestic swimming pool installations</li>
              <li>Risk assessment requirements and procedures</li>
              <li>Installation and testing procedures</li>
              <li>Maintenance recommendations and schedules</li>
              <li>Selection of appropriate equipment and materials</li>
              <li>Design considerations for different pool types</li>
              <li>Documentation and certification requirements</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-purple-300 mb-2">Building Regulations Part P</h4>
            <ul className="space-y-1 text-xs text-white list-disc list-inside">
              <li>Notification requirements for new pool installations</li>
              <li>Competent person scheme compliance</li>
              <li>Electrical installation certificates required</li>
              <li>Local authority building control involvement</li>
              <li>Third-party certification for non-registered installers</li>
              <li>Inspection and testing requirements</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Zone Classifications */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg font-semibold text-white">Zone Classifications Guide</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h4 className="font-medium text-red-300">Zone 0 - Highest Risk</h4>
              <Badge variant="outline" className="border-red-500/30 text-red-300 self-start sm:self-center">IPX8 Required</Badge>
            </div>
            <p className="text-sm text-white mb-2">Interior of pool, fountain, or water feature</p>
            <ul className="space-y-1 text-xs text-white list-disc list-inside">
              <li>Maximum 12V SELV only</li>
              <li>Safety isolating transformer required</li>
              <li>No socket outlets permitted</li>
              <li>Underwater lighting maximum 12V</li>
              <li>Equipment must be permanently fixed</li>
              <li>Cable entries must be waterproof</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h4 className="font-medium text-yellow-300">Zone 1 - Medium Risk</h4>
              <Badge variant="outline" className="border-yellow-500/30 text-yellow-300 self-start sm:self-center">IPX4 Minimum</Badge>
            </div>
            <p className="text-sm text-white mb-2">2m horizontally from pool edge, up to 2.5m height</p>
            <ul className="space-y-1 text-xs text-white list-disc list-inside">
              <li>12V SELV systems preferred</li>
              <li>Limited 230V with additional protection</li>
              <li>No socket outlets within 2m of pool</li>
              <li>RCD protection mandatory</li>
              <li>Fixed equipment only (no portable appliances)</li>
              <li>All metalwork must be bonded</li>
            </ul>
          </div>

          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <h4 className="font-medium text-green-300">Zone 2 - Lower Risk</h4>
              <Badge variant="outline" className="border-green-500/30 text-green-300 self-start sm:self-center">IPX2 Minimum</Badge>
            </div>
            <p className="text-sm text-white mb-2">1.5m beyond Zone 1, up to 2.5m height</p>
            <ul className="space-y-1 text-xs text-white list-disc list-inside">
              <li>230V equipment permitted with RCD</li>
              <li>Socket outlets allowed with RCD protection</li>
              <li>Standard wiring methods acceptable</li>
              <li>All circuits require 30mA RCD</li>
              <li>Standard electrical accessories permitted</li>
              <li>Normal installation methods apply</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Installation Steps */}
      {result && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Wrench className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-semibold text-white">Installation Procedure</h3>
          </div>
          
          <div className="space-y-3">
            {result.practicalGuidance.installationSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-elec-yellow text-elec-dark text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                <p className="text-sm text-white">{step}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Testing Requirements */}
      {result && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <TestTube className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-semibold text-white">Testing & Verification</h3>
          </div>
          
          <div className="space-y-3">
            {result.practicalGuidance.testingRequirements.map((test, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 text-white text-xs font-bold flex items-center justify-center">
                  {index + 1}
                </div>
                <p className="text-sm text-white">{test}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Maintenance */}
      {result && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Clock className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-semibold text-white">Ongoing Maintenance</h3>
          </div>
          
          <div className="space-y-2">
            {result.practicalGuidance.maintenancePoints.map((point, index) => (
              <div key={index} className="flex items-start gap-2">
                <Clock className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-white">{point}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Common Pitfalls */}
      {result && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 mb-4">
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
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg font-semibold text-white">Equipment Selection Guide</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-elec-yellow mb-2">Pool Pumps & Filtration</h4>
            <ul className="space-y-1 text-xs text-white list-disc list-inside">
              <li>Single-phase pumps up to 3kW, three-phase for larger installations</li>
              <li>Variable speed drives recommended for energy efficiency</li>
              <li>Motor protection against overload and earth fault required</li>
              <li>Emergency isolation within sight of equipment</li>
              <li>Weatherproof enclosures for outdoor installations</li>
              <li>Consider starting current when sizing supply cables</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-blue-300 mb-2">Pool Heating Systems</h4>
            <ul className="space-y-1 text-xs text-white list-disc list-inside">
              <li>Electric heaters: High load circuits, diversity factors apply</li>
              <li>Heat pumps: Consider defrost cycle loads and starting currents</li>
              <li>Gas heaters: Electrical supply for controls and fans only</li>
              <li>Solar controllers: Weather-resistant outdoor rated equipment</li>
              <li>Thermostats and sensors: Low voltage control circuits preferred</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-green-300 mb-2">Lighting Systems</h4>
            <ul className="space-y-1 text-xs text-white list-disc list-inside">
              <li>Underwater: 12V SELV only, IPX8 rated, safety isolating transformer</li>
              <li>Pool area: LED recommended, dimming controls permitted in Zone 2</li>
              <li>Emergency lighting: SELV systems preferred, battery backup required</li>
              <li>Control systems: Smart controls must maintain safety isolation</li>
              <li>Cable runs: Special pool cable types required for underwater feeds</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Design Considerations */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Lightbulb className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg font-semibold text-white">Design Considerations</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-elec-yellow mb-2">Load Calculations</h4>
            <ul className="space-y-1 text-xs text-white list-disc list-inside">
              <li>Apply diversity factors: Heating 75% (domestic), Pumps 100%, Lighting 80%</li>
              <li>Consider simultaneous operation patterns</li>
              <li>Include future load expansion requirements</li>
              <li>Motor starting current calculations essential</li>
              <li>Temperature derating for cable capacity in hot climates</li>
              <li>Voltage drop calculations critical for long cable runs</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-amber-300 mb-2">Cable Selection & Installation</h4>
            <ul className="space-y-1 text-xs text-white list-disc list-inside">
              <li>Underground: SWA armoured cables or XLPE in ducting</li>
              <li>Pool equipment: H07RN-F flexible cables for connections</li>
              <li>Underwater: Special pool cables with enhanced insulation</li>
              <li>Minimum burial depth: 600mm for cables, 450mm for ducting</li>
              <li>Cable route marking and warning tape essential</li>
              <li>Avoid cable routes under pool or decking where possible</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-purple-300 mb-2">Earthing & Bonding Strategy</h4>
            <ul className="space-y-1 text-xs text-white list-disc list-inside">
              <li>Main earth electrode (TT systems): Resistance ≤ 200Ω maximum</li>
              <li>Supplementary bonding: 4mm² minimum, all metalwork within 2m</li>
              <li>Pool structure bonding: Reinforcing steel, ladders, handrails</li>
              <li>Water system bonding: Inlet/outlet pipes, heating pipes</li>
              <li>Equipotential bonding conductor routing and protection</li>
              <li>Test points for ongoing verification of bonding integrity</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Advanced Topics */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg font-semibold text-white">Advanced Design Topics</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-red-300 mb-2">Commercial Pool Requirements</h4>
            <ul className="space-y-1 text-xs text-white list-disc list-inside">
              <li>Additional 10mA RCD protection for underwater equipment</li>
              <li>Emergency stop systems for all pool equipment</li>
              <li>Backup power supplies for essential safety systems</li>
              <li>Professional design certification and periodic inspection</li>
              <li>Enhanced IP ratings: IPX5 minimum in Zone 1</li>
              <li>Fire alarm system integration and emergency lighting</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-blue-300 mb-2">Smart Pool Systems</h4>
            <ul className="space-y-1 text-xs text-white list-disc list-inside">
              <li>Control systems must maintain safety isolation principles</li>
              <li>Remote monitoring: Secure communications, fail-safe operation</li>
              <li>Automation: Override capabilities for safety systems</li>
              <li>Integration with building management systems</li>
              <li>Cybersecurity considerations for connected equipment</li>
              <li>Backup manual controls for all automated functions</li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-green-300 mb-2">Energy Efficiency</h4>
            <ul className="space-y-1 text-xs text-white list-disc list-inside">
              <li>Variable speed pump drives: 30-70% energy savings possible</li>
              <li>LED lighting systems: Lower heat generation, longer life</li>
              <li>Smart heating controls: Optimised scheduling and zoning</li>
              <li>Power factor correction for large motor loads</li>
              <li>Energy monitoring systems for consumption analysis</li>
              <li>Solar integration: Grid-tie considerations and safety</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Documentation & Certification */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg font-semibold text-white">Documentation & Certification</h3>
        </div>
        
        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-elec-yellow mb-2">Required Documentation</h4>
            <ul className="space-y-1 text-xs text-white list-disc list-inside">
              <li>Electrical Installation Certificate (EIC) for new installations</li>
              <li>Minor Electrical Installation Works Certificate for additions</li>
              <li>Electrical Installation Condition Report (EICR) for existing systems</li>
              <li>Pool equipment operation and maintenance manuals</li>
              <li>Risk assessments and method statements</li>
              <li>Building control completion certificates</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-blue-300 mb-2">Testing Schedules</h4>
            <ul className="space-y-1 text-xs text-white list-disc list-inside">
              <li>Initial verification: Complete test schedule as per BS 7671</li>
              <li>Periodic inspection: Every 5 years (or as recommended)</li>
              <li>RCD testing: 6-monthly functional tests recommended</li>
              <li>PAT testing: Annual for portable pool equipment</li>
              <li>Earth electrode testing: Annual (TT systems)</li>
              <li>Emergency system testing: Monthly functional checks</li>
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