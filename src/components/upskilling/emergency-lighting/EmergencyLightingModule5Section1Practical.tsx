import { Wrench, CheckCircle2, Camera, Target, AlertTriangle, ClipboardCheck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const EmergencyLightingModule5Section1Practical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Inspection Methodology</h3>
          
          <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r">
            <h4 className="font-semibold text-green-300 mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Systematic Inspection Approach
            </h4>
            <div className="space-y-2 text-foreground text-sm">
              <p>
                <span className="font-medium text-green-200">Pre-Site Review:</span> Study approved design drawings, luminaire 
                schedules, and cable specifications before arriving on site to understand the intended system configuration
              </p>
              <p>
                <span className="font-medium text-green-200">Floor-by-Floor Walkthrough:</span> Systematically inspect each 
                floor level in sequence, ticking off luminaires against the design drawings as you verify each location
              </p>
              <p>
                <span className="font-medium text-green-200">Escape Route Tracing:</span> Walk every escape route from each 
                room/area to final exits, confirming continuous emergency lighting coverage throughout
              </p>
              <p>
                <span className="font-medium text-green-200">Distribution Board Verification:</span> Check all emergency 
                lighting distribution arrangements, circuit protection devices, and labelling meet specifications
              </p>
              <p>
                <span className="font-medium text-green-200">Defect Recording:</span> Document all defects immediately with 
                location references, photographs, and severity classification (Critical/Major/Minor)
              </p>
            </div>
          </div>

          <div className="bg-orange-900/20 border-l-4 border-orange-500 p-4 rounded-r">
            <h4 className="font-semibold text-orange-300 mb-3">Time Planning for Initial Inspection</h4>
            <p className="text-foreground text-sm mb-3">
              Typical inspection times for proper verification (will vary based on site complexity and access):
            </p>
            <div className="bg-elec-dark p-4 rounded border border-gray-600">
              <div className="space-y-2.5 text-sm sm:text-base">
                <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline">
                  <span className="text-foreground text-left">Small installation (20-50 luminaires):</span>
                  <span className="font-semibold text-foreground whitespace-nowrap text-right">2-4 hours</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline">
                  <span className="text-foreground text-left">Medium installation (50-150 luminaires):</span>
                  <span className="font-semibold text-foreground whitespace-nowrap text-right">4-8 hours</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline">
                  <span className="text-foreground text-left">Large installation (150-300 luminaires):</span>
                  <span className="font-semibold text-foreground whitespace-nowrap text-right">1-2 days</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline">
                  <span className="text-foreground text-left">Complex multi-building site (300+ luminaires):</span>
                  <span className="font-semibold text-foreground whitespace-nowrap text-right">2-5 days</span>
                </div>
                <div className="pt-2 border-t border-gray-600">
                  <div className="font-semibold text-elec-yellow mb-2">Additional Time Required For:</div>
                  <div className="text-foreground pl-4 space-y-1 text-sm">
                    <div>• Central battery systems (monitoring connections)</div>
                    <div>• Heritage buildings (access limitations)</div>
                    <div>• Remote/wireless systems (network commissioning)</div>
                    <div>• Sites with difficult access areas</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Documentation Requirements</h3>
          
          <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r">
            <h4 className="font-semibold text-blue-300 mb-3">Essential Inspection Records</h4>
            <div className="space-y-3">
              <div className="bg-elec-dark/50 p-3 rounded border border-gray-600">
                <h5 className="font-medium text-foreground mb-1">Inspection Checklist</h5>
                <p className="text-foreground text-sm">
                  Comprehensive checklist covering luminaire locations, types, mounting, wiring, circuit protection, 
                  labelling, and signage orientation. Tick off each item as verified with space for comments.
                </p>
              </div>
              <div className="bg-elec-dark/50 p-3 rounded border border-gray-600">
                <h5 className="font-medium text-foreground mb-1">Defect Register</h5>
                <p className="text-foreground text-sm">
                  Detailed log of all defects found including location, description, severity, and rectification status. 
                  Cross-reference to photographs and mark items as corrected and re-inspected before sign-off.
                </p>
              </div>
              <div className="bg-elec-dark/50 p-3 rounded border border-gray-600">
                <h5 className="font-medium text-foreground mb-1">Test Results Sheets</h5>
                <p className="text-foreground text-sm">
                  Record all electrical test results (continuity, insulation resistance, polarity, earth loop impedance) 
                  with date, time, instrument serial number, and tester signature.
                </p>
              </div>
              <div className="bg-elec-dark/50 p-3 rounded border border-gray-600">
                <h5 className="font-medium text-foreground mb-1">Photographic Evidence</h5>
                <p className="text-foreground text-sm">
                  Date-stamped photographs of completed installation, specific defects, cable routes, distribution boards, 
                  and any site-specific challenges or solutions implemented.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Common Inspection Failures</h3>
          
          <div className="bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded-r">
            <h4 className="font-semibold text-purple-300 mb-3">Typical Defects Found During Initial Inspection</h4>
            <div className="space-y-2 text-foreground text-sm">
              <p>
                <span className="font-medium text-purple-200">Wrong Luminaire Types:</span> Non-maintained luminaires 
                installed where maintained specified, or incorrect duration ratings (1hr vs 3hr)
              </p>
              <p>
                <span className="font-medium text-purple-200">Incorrect Exit Sign Orientation:</span> Signs pointing in 
                wrong evacuation direction or not visible from all approach angles
              </p>
              <p>
                <span className="font-medium text-purple-200">Plastic Cable Fixings:</span> Non-compliant plastic clips 
                or cable ties used on fire-rated cables (BS 7671 Reg. 521.10.202 violation)
              </p>
              <p>
                <span className="font-medium text-purple-200">Circuit Mixing:</span> Emergency and normal lighting circuits 
                not properly segregated, sharing neutrals, or incorrect distribution arrangements
              </p>
              <p>
                <span className="font-medium text-purple-200">Incomplete Labelling:</span> Distribution boards, circuits, 
                or individual luminaires not clearly identified with reference numbers
              </p>
              <p>
                <span className="font-medium text-purple-200">Coverage Gaps:</span> Luminaires missing at critical locations 
                (changes of direction, intersections, near fire equipment, disabled refuge points)
              </p>
              <p>
                <span className="font-medium text-purple-200">Wrong Cable Types:</span> Standard PVC cable used instead of 
                specified fire-rated or LSZH cables in fire compartment penetrations
              </p>
              <p>
                <span className="font-medium text-purple-200">Poor Mounting:</span> Luminaires insecurely fixed, mounted 
                on combustible surfaces, or positioned where vulnerable to damage
              </p>
            </div>
          </div>

          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
            <h4 className="font-semibold text-elec-yellow mb-2">Best Practice Tip</h4>
            <p className="text-foreground text-sm">
              Conduct a pre-inspection meeting with the installation team to review design requirements and common 
              defects. This proactive approach reduces inspection failures and prevents costly rework. Many defects 
              can be avoided if installers understand compliance requirements before work begins.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Client Communication</h3>
          
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r">
            <h4 className="font-semibold text-red-300 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Managing Client Expectations
            </h4>
            <p className="text-foreground text-sm mb-3">
              Clear communication with clients about inspection findings and timescales is essential for successful 
              project handover. Address these key points:
            </p>
            <div className="space-y-2 text-foreground text-sm">
              <div className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Explain that initial inspection is mandatory and cannot be bypassed — it's a regulatory requirement</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Provide realistic timescales for inspection, defect rectification, and re-inspection</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Present defect findings professionally with clear severity classifications and photographs</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Offer solutions for rectifying defects with cost and time implications where applicable</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Confirm that certification cannot be issued until all critical and major defects are corrected</span>
              </div>
            </div>
            <p className="text-foreground text-sm mt-3 italic">
              Document all client communications regarding defects and rectification timescales to protect all parties 
              if project delays occur due to inspection failures.
            </p>
          </div>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Initial Inspection Checklist Summary</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Review all design documentation and specifications before site arrival</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Verify luminaire types, positions, and mounting comply with design</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Confirm correct cable types and non-combustible fixings used</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Check circuit segregation, protection devices, and labelling</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Conduct all electrical verification tests with calibrated equipment</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Document all findings with photographs, test results, and defect registers</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Present findings professionally to client with rectification requirements</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Re-inspect all rectified defects before proceeding to commissioning</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Maintain comprehensive records for certification and handover</span>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};