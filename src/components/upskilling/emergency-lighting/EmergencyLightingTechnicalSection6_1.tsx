import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle, FileText, Lightbulb, BookMarked } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

export const EmergencyLightingTechnicalSection6_1 = () => {
  const [openChecks, setOpenChecks] = useState<number[]>([]);

  const toggleCheck = (index: number) => {
    setOpenChecks(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <Card className="bg-slate-200/20 border-slate-600">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Content / Learning
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        
        {/* BS 5266-1 Overview */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <FileText className="h-5 w-5" />
            1. Overview of BS 5266-1
          </h3>
          
            <div className="space-y-3">
            <p className="leading-relaxed">
              <strong>BS 5266-1: Emergency Lighting – Part 1: Code of practice for the emergency 
              lighting of premises</strong> sets out the overall framework for life safety lighting systems. This standard has been 
              developed over decades and represents best practice based on fire safety research, incident analysis, and practical experience 
              from thousands of installations across the UK.
            </p>

            <p className="text-sm leading-relaxed">
              The standard applies to virtually all non-domestic premises and covers new installations, alterations, and maintenance 
              of existing systems. It is referenced in Building Regulations Approved Document B (Fire Safety) and is considered the 
              benchmark for demonstrating compliance with the Fire Safety Order 2005.
            </p>
            
            <div className="p-4 bg-elec-dark rounded-lg border border-elec-yellow/30">
              <p className="font-semibold text-elec-yellow mb-2">Key Principle:</p>
              <p className="text-sm">
                Emergency lighting must provide illumination of sufficient intensity and duration to enable 
                occupants to reach a place of safety in the event of failure of the normal supply.
              </p>
            </div>

            <p className="font-semibold">It covers:</p>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">System design and application</span>
                  <p className="text-sm text-gray-300 mt-1">Defines three main categories: escape route lighting (to guide occupants to exits), 
                  open area (anti-panic) lighting (for spaces &gt;60m²), and high-risk task area lighting (where hazardous operations must be safely shut down).</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Installation standards</span>
                  <p className="text-sm text-gray-300 mt-1">Specifies cable types (fire-resistant where required), circuit protection methods, 
                  switching arrangements (preventing accidental disconnection), and fire integrity requirements for critical circuits.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Inspection and testing procedures</span>
                  <p className="text-sm text-gray-300 mt-1">References BS 5266-8 (EN 50172) for detailed testing intervals: daily automated tests, 
                  monthly functional tests, and annual full-duration discharge tests with comprehensive record-keeping.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Documentation requirements</span>
                  <p className="text-sm text-gray-300 mt-1">Mandates comprehensive documentation including design calculations, as-built drawings, 
                  photometric reports, test certificates, logbooks for ongoing maintenance, and handover documentation to the building owner.</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                <div>
                  <span className="font-semibold">Responsibilities</span>
                  <p className="text-sm text-gray-300 mt-1">Clearly defines duties of the designer (competent person who specifies the system), 
                  installer (competent contractor who implements the design), and the Responsible Person (building owner/manager who maintains the system).</p>
                </div>
              </li>
            </ul>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(0)}
              >
                ✅ Quick Check: What is the primary purpose of emergency lighting according to BS 5266-1?
              </Button>
              {openChecks.includes(0) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> Emergency lighting must provide illumination of sufficient intensity and duration to 
                    enable occupants to reach a place of safety in the event of failure of the normal supply. This ensures safe 
                    evacuation during power outages or emergency situations.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* EN 1838 Overview */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <Lightbulb className="h-5 w-5" />
            2. Overview of BS EN 1838
          </h3>
          
          <div className="space-y-3">
            <p className="leading-relaxed">
              EN 1838 defines the <strong>performance requirements</strong> for emergency lighting — 
              the measurable technical criteria that systems must achieve. This European standard ensures consistency across member states 
              and is based on human factors research, including studies on visual perception, panic behaviour, and safe evacuation times.
            </p>

            <p className="text-sm leading-relaxed">
              The standard establishes minimum performance levels that have been scientifically validated to enable safe evacuation. 
              These are not arbitrary figures — they represent the lowest acceptable levels that still allow the human eye to adapt 
              and navigate safely in emergency conditions.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-900/20 border border-blue-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-300 mb-2">Illuminance Requirements:</h4>
                <ul className="text-sm space-y-2">
                  <li>
                    • Escape routes: <strong>1 lux minimum</strong> along the centre line
                    <p className="text-xs text-gray-300 mt-1 ml-4">Measured at floor level along the entire escape route, including corridors, 
                    stairways, and final exits. Half the required illuminance must be achieved across at least 50% of the route width.</p>
                  </li>
                  <li>
                    • Open areas: <strong>0.5 lux minimum</strong> on floor area
                    <p className="text-xs text-gray-300 mt-1 ml-4">For anti-panic lighting in spaces exceeding 60m². Prevents mass panic by 
                    ensuring occupants can identify escape routes and obstacles.</p>
                  </li>
                  <li>
                    • High-risk areas: <strong>15 lux minimum</strong> or 10% of normal lighting
                    <p className="text-xs text-gray-300 mt-1 ml-4">Where potentially dangerous processes or machinery require safe shutdown, 
                    or where there are significant level changes.</p>
                  </li>
                </ul>
              </div>
              <div className="bg-green-900/20 border border-green-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-2">Duration Requirements:</h4>
                <ul className="text-sm space-y-2">
                  <li>
                    • Standard duration: <strong>1 hour minimum</strong>
                    <p className="text-xs text-gray-300 mt-1 ml-4">Sufficient for most commercial and industrial premises where immediate evacuation is possible.</p>
                  </li>
                  <li>
                    • Extended duration: <strong>3 hours</strong>
                    <p className="text-xs text-gray-300 mt-1 ml-4">Required for premises where immediate evacuation is not possible (sleeping accommodation, 
                    entertainment venues, large public buildings, premises without external fire service access).</p>
                  </li>
                  <li>
                    • Special cases: <strong>Risk assessment determines</strong>
                    <p className="text-xs text-gray-300 mt-1 ml-4">Hospitals, care homes, and high-rise buildings may require longer durations based on evacuation strategy.</p>
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-purple-900/20 border border-purple-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-purple-300 mb-2">Uniformity Ratio:</h4>
                <p className="text-sm leading-relaxed mb-2">
                  Maximum to minimum illuminance ratio must not exceed <strong>40:1</strong>
                </p>
                <p className="text-xs text-gray-300">
                  This prevents dangerous "pools of darkness" that can cause trips, falls, or disorientation. The human eye struggles 
                  to adapt when moving rapidly between very bright and very dark areas, particularly under stress.
                </p>
              </div>
              <div className="bg-orange-900/20 border border-orange-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-orange-300 mb-2">Direction & Visibility:</h4>
                <p className="text-sm leading-relaxed mb-2">
                  Exit signs must be clearly visible and conform to <strong>ISO 7010</strong> pictograms
                </p>
                <p className="text-xs text-gray-300">
                  Minimum luminance: 2 cd/m² (internally illuminated) or 15 cd/m² (externally illuminated). Signs must be visible from 
                  any point along the escape route and placed at every change of direction, exit point, and decision point.
                </p>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-600/30 p-4 rounded-lg mt-4">
              <h4 className="font-semibold text-yellow-300 mb-2">Colour Rendering Index (CRI)</h4>
              <p className="text-sm leading-relaxed">
                Emergency lighting must have a colour rendering index (Ra) of at least <strong>40</strong>. This ensures that safety signs, 
                hazard markings, and other colour-coded information remain recognisable during emergency operation.
              </p>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(1)}
              >
                ✅ Quick Check: What is the minimum illuminance requirement for open areas under EN 1838?
              </Button>
              {openChecks.includes(1) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> Open areas (anti-panic lighting) require a minimum of <strong>0.5 lux</strong> on the 
                    floor area. This ensures occupants can move safely through larger spaces without panic during emergencies, with 
                    a uniformity ratio not exceeding 40:1 (max/min).
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Key Clauses */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <BookMarked className="h-5 w-5" />
            3. Key Cross-Referenced Clauses
          </h3>
          
          <div className="space-y-3">
            <p>
              Some of the most critical BS 5266-1 clauses electricians must understand include:
            </p>
            
            <div className="grid gap-3">
              <div className="p-3 bg-elec-dark rounded-lg border border-white/10">
                <p><strong className="text-elec-yellow">Clause 4:</strong> Classification of systems (escape route, open area, high-risk task)</p>
              </div>
              <div className="p-3 bg-elec-dark rounded-lg border border-white/10">
                <p><strong className="text-elec-yellow">Clause 5:</strong> Risk assessment and building type consideration</p>
              </div>
              <div className="p-3 bg-elec-dark rounded-lg border border-white/10">
                <p><strong className="text-elec-yellow">Clause 6:</strong> System design factors – mounting heights, luminaire types, photometric data</p>
              </div>
              <div className="p-3 bg-elec-dark rounded-lg border border-white/10">
                <p><strong className="text-elec-yellow">Clause 7:</strong> Power supply design (self-contained or central battery)</p>
              </div>
              <div className="p-3 bg-elec-dark rounded-lg border border-white/10">
                <p><strong className="text-elec-yellow">Clause 8:</strong> Wiring systems – fire resistance and circuit segregation</p>
              </div>
              <div className="p-3 bg-elec-dark rounded-lg border border-white/10">
                <p><strong className="text-elec-yellow">Clause 10:</strong> Inspection, testing, and maintenance regime (linked to BS 5266-8)</p>
              </div>
              <div className="p-3 bg-elec-dark rounded-lg border border-white/10">
                <p><strong className="text-elec-yellow">Clause 11:</strong> Documentation – certification, logbooks, and handover</p>
              </div>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(2)}
              >
                ✅ Quick Check: Which clause of BS 5266-1 deals with system inspection and testing?
              </Button>
              {openChecks.includes(2) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> <strong>Clause 10</strong> covers inspection, testing, and maintenance regime, with 
                    direct reference to BS 5266-8 (EN 50172). This clause defines the testing intervals, procedures, and 
                    documentation requirements essential for ongoing compliance and system reliability.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Documentation Requirements */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-elec-yellow flex items-center gap-2">
            <FileText className="h-5 w-5" />
            4. Design and Documentation Requirements
          </h3>
          
          <div className="space-y-3">
            <p>
              Both BS 5266-1 and EN 1838 emphasise documentation and proof of compliance:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-green-900/20 border border-green-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-green-300 mb-2">Required Documentation:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Design calculations and lux verification</li>
                  <li>• Risk-based design statement</li>
                  <li>• As-built drawings and circuit layouts</li>
                  <li>• Maintenance instructions</li>
                </ul>
              </div>
              <div className="bg-blue-900/20 border border-blue-600/30 p-4 rounded-lg">
                <h4 className="font-semibold text-blue-300 mb-2">Certification:</h4>
                <ul className="text-sm space-y-1">
                  <li>• Designer certification</li>
                  <li>• Installer certification</li>
                  <li>• Verifier sign-off</li>
                  <li>• Testing schedules</li>
                </ul>
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-600/30 p-4 rounded-lg">
              <p className="text-red-300 font-medium">
                ⚠️ Without these records, the system is deemed non-compliant — even if it functions correctly.
              </p>
            </div>

            <div className="bg-elec-gray border border-gray-600 rounded-lg p-4">
              <Button 
                variant="ghost" 
                className="text-elec-yellow hover:bg-elec-yellow/10 w-full justify-start p-0 h-auto"
                onClick={() => toggleCheck(3)}
              >
                ✅ Quick Check: What documentation must accompany every completed emergency lighting system?
              </Button>
              {openChecks.includes(3) && (
                <div className="mt-3 p-3 bg-green-900/20 border border-green-600/30 rounded">
                  <p className="text-green-300">
                    <strong>Answer:</strong> Essential documentation includes: lighting design calculations and lux verification, 
                    risk-based design statement, as-built drawings and circuit layouts, maintenance instructions and testing schedules, 
                    and signed certificates from designer, installer, and verifier. Without these records, the system is deemed 
                    non-compliant — even if it functions correctly.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
