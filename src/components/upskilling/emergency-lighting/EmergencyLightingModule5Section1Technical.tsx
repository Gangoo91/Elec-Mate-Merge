import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, Search, Eye, Zap, Lightbulb, CheckCircle2 } from 'lucide-react';

export const EmergencyLightingModule5Section1Technical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Technical Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Section 1: Purpose of Initial Inspection */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-elec-yellow font-bold">1</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <Search className="h-5 w-5 text-green-400" />
                Purpose of Initial Inspection
              </h3>
            </div>
          </div>

          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground">
              Initial inspection and verification is the systematic process of confirming that an emergency 
              lighting installation has been completed in accordance with the approved design, complies with 
              all relevant standards (BS 5266-1 and BS 7671), and is ready for commissioning.
            </p>

            <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r">
              <h4 className="font-semibold text-green-300 mb-3">Critical Functions of Initial Inspection</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">Design Compliance:</span>
                    <span className="text-foreground"> Confirms installation matches approved drawings and specifications in all respects</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">Pre-Energisation Safety:</span>
                    <span className="text-foreground"> Identifies installation defects, cable damage, or incorrect connections before power is applied</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">System Integrity Verification:</span>
                    <span className="text-foreground"> Provides assurance that protective measures and safety features will function correctly</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">Certification Basis:</span>
                    <span className="text-foreground"> Forms the foundation for commissioning documentation and handover certification</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Quick Check
              </h4>
              <p className="text-foreground text-sm mb-2">Why must initial inspection be completed before energising the emergency lighting system?</p>
              <details className="text-foreground text-sm">
                <summary className="cursor-pointer text-elec-yellow hover:text-elec-yellow/80">Show Answer</summary>
                <p className="mt-2 pl-4 border-l-2 border-elec-yellow">
                  Initial inspection identifies installation faults, incorrect wiring, and non-compliant components before 
                  power is applied. Energising a faulty system can cause equipment damage, fire risk, or electric shock hazards. 
                  Detecting and correcting defects at this stage prevents dangerous conditions and costly rework after commissioning.
                </p>
              </details>
            </div>
          </div>
        </div>

        {/* Section 2: Pre-Installation Verification */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-elec-yellow font-bold">2</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <Eye className="h-5 w-5 text-blue-400" />
                Pre-Installation Document Review
              </h3>
            </div>
          </div>

          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground">
              Before commencing physical site inspection, thorough review of design documentation ensures 
              the inspector understands the intended system configuration, design criteria, and compliance requirements.
            </p>

            {/* Design Documentation */}
            <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r">
              <h4 className="font-semibold text-blue-300 mb-3">Essential Design Documents</h4>
              <div className="space-y-2 text-foreground text-sm">
                <p>
                  <span className="font-medium text-blue-200">Emergency Lighting Layout Drawings:</span> Floor plans 
                  showing luminaire locations, types, and coverage areas for all escape routes and open areas
                </p>
                <p>
                  <span className="font-medium text-blue-200">Luminaire Schedule:</span> Detailed list of all fittings 
                  including model numbers, ratings, mounting heights, and mode (maintained/non-maintained)
                </p>
                <p>
                  <span className="font-medium text-blue-200">Circuit Wiring Diagrams:</span> Single-line diagrams showing 
                  distribution arrangements, circuit protection, and cable routing
                </p>
                <p>
                  <span className="font-medium text-blue-200">Cable Specification:</span> Confirmation of cable types 
                  (standard, LSZH, fire-rated, MICC) and conductor sizes for each circuit
                </p>
                <p>
                  <span className="font-medium text-blue-200">Risk Assessment:</span> Designer's risk assessment identifying 
                  any special requirements (high-risk areas, disabled refuge points, anti-panic areas)
                </p>
              </div>
            </div>

            {/* Standards Review */}
            <div className="bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded-r">
              <h4 className="font-semibold text-purple-300 mb-3">Applicable Standards Verification</h4>
              <div className="space-y-2 text-foreground text-sm">
                <p>
                  <span className="font-medium text-purple-200">BS 5266-1:2016:</span> Emergency lighting code of practice 
                  for design, installation, commissioning, and maintenance
                </p>
                <p>
                  <span className="font-medium text-purple-200">BS 7671:2018+A2:2022:</span> Requirements for electrical 
                  installations (18th Edition IET Wiring Regulations)
                </p>
                <p>
                  <span className="font-medium text-purple-200">BS EN 1838:2013:</span> Lighting applications — emergency 
                  lighting photometric requirements
                </p>
                <p>
                  <span className="font-medium text-purple-200">BS EN 60598-2-22:</span> Particular requirements for emergency 
                  lighting luminaires
                </p>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Quick Check
              </h4>
              <p className="text-foreground text-sm mb-2">Which document tells you the exact cable type required for each emergency lighting circuit?</p>
              <details className="text-foreground text-sm">
                <summary className="cursor-pointer text-elec-yellow hover:text-elec-yellow/80">Show Answer</summary>
                <p className="mt-2 pl-4 border-l-2 border-elec-yellow">
                  The cable specification or circuit wiring diagrams provided by the system designer. These documents 
                  specify whether standard PVC, LSZH (Low Smoke Zero Halogen), fire-rated (FP200/FP600), or mineral-insulated 
                  copper clad (MICC) cables are required for each circuit, based on fire compartmentation and risk assessment.
                </p>
              </details>
            </div>
          </div>
        </div>

        {/* Section 3: Visual Inspection Procedures */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-elec-yellow font-bold">3</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <Eye className="h-5 w-5 text-yellow-400" />
                Visual and Physical Inspection
              </h3>
            </div>
          </div>

          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground">
              Visual inspection must be carried out systematically before any electrical testing. This identifies 
              obvious defects, non-compliances, and physical damage that could compromise system safety or functionality.
            </p>

            <div className="bg-yellow-900/20 border-l-4 border-yellow-500 p-4 rounded-r">
              <h4 className="font-semibold text-yellow-300 mb-3">Cable Installation Inspection</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">Cable Type Verification:</span>
                    <span className="text-foreground"> Confirm correct cable type installed as specified (check cable sheath markings)</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">Non-Combustible Supports:</span>
                    <span className="text-foreground"> BS 7671 Reg. 521.10.202 requires metal fixings — plastic clips/ties not permitted for fire-rated cables</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">Circuit Segregation:</span>
                    <span className="text-foreground"> Emergency circuits kept separate from normal lighting supply at all points</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">Physical Protection:</span>
                    <span className="text-foreground"> Cables protected from mechanical damage, properly contained within trunking or conduit where required</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Luminaire Installation */}
            <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r">
              <h4 className="font-semibold text-green-300 mb-3">Luminaire Positioning and Mounting</h4>
              <div className="space-y-2 text-foreground text-sm">
                <p>
                  <span className="font-medium text-green-200">Location Accuracy:</span> Luminaires positioned at all 
                  specified locations — exit doors, changes of direction, stairways, intersections, fire equipment
                </p>
                <p>
                  <span className="font-medium text-green-200">Mounting Security:</span> Fittings securely fixed to 
                  non-combustible surfaces with appropriate fixings for ceiling/wall type
                </p>
                <p>
                  <span className="font-medium text-green-200">Signage Orientation:</span> Exit signs face correct 
                  direction for evacuation routes and are visible from all approach angles
                </p>
                <p>
                  <span className="font-medium text-green-200">Height Compliance:</span> Exit signs typically mounted 
                  at 2m above floor level (BS 5266-1), escape route lighting clear of obstructions
                </p>
                <p>
                  <span className="font-medium text-green-200">ISO 7010 Compliance:</span> All signs use standardised 
                  green running man pictogram — old "EXIT" text signs do not meet current UK requirements
                </p>
              </div>
            </div>

            {/* Labelling */}
            <div className="bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded-r">
              <h4 className="font-semibold text-purple-300 mb-3">System Labelling Requirements</h4>
              <div className="space-y-2 text-foreground text-sm">
                <p>
                  <span className="font-medium text-purple-200">Distribution Board Marking:</span> Emergency lighting 
                  distribution boards clearly identified and labelled
                </p>
                <p>
                  <span className="font-medium text-purple-200">Circuit Identification:</span> All emergency circuits 
                  labelled at distribution board with circuit reference and area served
                </p>
                <p>
                  <span className="font-medium text-purple-200">Luminaire Numbering:</span> Each luminaire numbered or 
                  referenced to match design drawings and testing logs
                </p>
                <p>
                  <span className="font-medium text-purple-200">Warning Notices:</span> Appropriate warning notices 
                  displayed where emergency circuits share enclosures with other systems
                </p>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Quick Check
              </h4>
              <p className="text-foreground text-sm mb-2">Why does BS 7671 require non-combustible cable fixings for fire-rated emergency lighting cables?</p>
              <details className="text-foreground text-sm">
                <summary className="cursor-pointer text-elec-yellow hover:text-elec-yellow/80">Show Answer</summary>
                <p className="mt-2 pl-4 border-l-2 border-elec-yellow">
                  Plastic cable clips and ties would melt during a fire, causing fire-rated cables to drop from their 
                  supports. This could damage the cable, break conductors, or allow cables to come into contact with flames, 
                  defeating the purpose of using fire-rated cables. Metal fixings maintain support integrity throughout a 
                  fire, ensuring emergency lighting continues to operate during evacuation.
                </p>
              </details>
            </div>
          </div>
        </div>

        {/* Section 4: Electrical Verification Testing */}
        <div className="space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-elec-yellow/20 flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-elec-yellow font-bold">4</span>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-foreground mb-3 flex items-center gap-2">
                <Zap className="h-5 w-5 text-red-400" />
                Electrical Verification Testing
              </h3>
            </div>
          </div>

          <div className="ml-0 sm:ml-11 space-y-4">
            <p className="text-foreground">
              Electrical verification testing confirms that all circuits are correctly installed, properly connected, 
              and safe to energise. These tests must be performed using calibrated test instruments in accordance 
              with BS 7671 requirements before power is applied.
            </p>

            <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r">
              <h4 className="font-semibold text-red-300 mb-3">Mandatory Electrical Tests (BS 7671)</h4>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">Continuity of Protective Conductors:</span>
                    <span className="text-foreground"> Verify earthing continuity to all luminaires and metalwork. Record R1 + R2 values for each circuit.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">Insulation Resistance:</span>
                    <span className="text-foreground"> Test at 500V DC between live conductors and between conductors and earth. Minimum 1MΩ required.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">Polarity Verification:</span>
                    <span className="text-foreground"> Confirm correct polarity at every luminaire and connection point to prevent dangerous live-earth faults.</span>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-foreground font-medium">Earth Fault Loop Impedance (Zs):</span>
                    <span className="text-foreground"> Verify protective device will operate within required disconnection time. Test at distribution board and final circuits.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Test Equipment */}
            <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r">
              <h4 className="font-semibold text-blue-300 mb-3">Test Equipment Requirements</h4>
              <div className="space-y-2 text-foreground text-sm">
                <p>
                  <span className="font-medium text-blue-200">Multifunction Tester:</span> Calibrated instrument compliant 
                  with GS38 for continuity, insulation resistance, polarity, and earth loop impedance testing
                </p>
                <p>
                  <span className="font-medium text-blue-200">Calibration Certificate:</span> Valid calibration (typically 
                  annual) with certificate available for inspection and audit purposes
                </p>
                <p>
                  <span className="font-medium text-blue-200">Test Lead Condition:</span> Leads in good condition with no 
                  damage, correct fuse ratings, and appropriate probe guards
                </p>
                <p>
                  <span className="font-medium text-blue-200">Proving Unit:</span> Test instrument function verified before 
                  and after testing using a known voltage source (proving unit)
                </p>
              </div>
            </div>

            {/* Acceptance Criteria Table */}
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-600 text-sm">
                <thead className="bg-elec-dark">
                  <tr>
                    <th className="border border-gray-600 p-3 text-left text-foreground">Test</th>
                    <th className="border border-gray-600 p-3 text-left text-foreground">Purpose</th>
                    <th className="border border-gray-600 p-3 text-left text-foreground">Acceptance Criteria</th>
                  </tr>
                </thead>
                <tbody className="text-foreground">
                  <tr>
                    <td className="border border-gray-600 p-3 font-medium">Continuity</td>
                    <td className="border border-gray-600 p-3">Verify conductor connections intact</td>
                    <td className="border border-gray-600 p-3 text-green-300">Low resistance (&lt;1Ω typical)</td>
                  </tr>
                  <tr className="bg-elec-dark/50">
                    <td className="border border-gray-600 p-3 font-medium">Insulation</td>
                    <td className="border border-gray-600 p-3">Ensure adequate insulation</td>
                    <td className="border border-gray-600 p-3 text-green-300">Minimum 1MΩ @ 500V DC</td>
                  </tr>
                  <tr>
                    <td className="border border-gray-600 p-3 font-medium">Polarity</td>
                    <td className="border border-gray-600 p-3">Confirm correct connections</td>
                    <td className="border border-gray-600 p-3 text-green-300">Correct at all points</td>
                  </tr>
                  <tr className="bg-elec-dark/50">
                    <td className="border border-gray-600 p-3 font-medium">EFLI (Zs)</td>
                    <td className="border border-gray-600 p-3">Protective device operation</td>
                    <td className="border border-gray-600 p-3 text-green-300">Within BS 7671 limits</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <h4 className="font-semibold text-blue-300 mb-2 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Quick Check
              </h4>
              <p className="text-foreground text-sm mb-2">What is the minimum acceptable insulation resistance value for emergency lighting circuits?</p>
              <details className="text-foreground text-sm">
                <summary className="cursor-pointer text-elec-yellow hover:text-elec-yellow/80">Show Answer</summary>
                <p className="mt-2 pl-4 border-l-2 border-elec-yellow">
                  BS 7671 requires a minimum insulation resistance of 1 megaohm (1MΩ) when tested at 500V DC between 
                  live conductors and between conductors and earth. Lower values indicate insulation degradation, moisture 
                  ingress, or cable damage that must be investigated and rectified before the system is energised.
                </p>
              </details>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};