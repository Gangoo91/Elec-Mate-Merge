import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Users, AlertTriangle } from 'lucide-react';

export const EmergencyLightingModule5Section2RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Users className="h-6 w-6 text-elec-yellow" />
          Real-World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        
        <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
          <h4 className="font-semibold text-blue-300 mb-3">Leeds Care Home Emergency Lighting Failure</h4>
          
          <div className="space-y-6">
            <div>
              <h5 className="font-medium text-foreground mb-2">The Project</h5>
              <p className="text-foreground text-sm">
                A residential care home in Leeds had a comprehensive emergency lighting system installed during refurbishment 7 years prior. The system included 85 luminaires (self-contained units with 3-hour battery capacity) covering all escape routes, corridors, stairwells, and communal areas.
              </p>
              <p className="text-foreground text-sm mt-2">
                Monthly functional tests were carried out diligently by maintenance staff using the test key switches on each fitting. All luminaires appeared to illuminate correctly during these short tests, and the logbook showed consistent pass results.
              </p>
            </div>
            
            <div>
              <h5 className="font-medium text-foreground mb-2">The Problem Discovered</h5>
              <p className="text-foreground text-sm mb-3">
                During a fire drill coordinated with the local fire service, emergency lighting was tested under realistic conditions. Mains power was isolated, and residents were evacuated following normal procedures.
              </p>
              <div className="space-y-2">
                <div className="bg-red-900/30 border border-red-500/30 rounded p-3">
                  <p className="text-red-300 font-medium text-sm">Critical Failure</p>
                  <p className="text-foreground text-xs mt-1">
                    After approximately 40 minutes, emergency lighting began failing across multiple corridors and stairwells. Within 60 minutes, over 60% of the luminaires had stopped working, leaving evacuation routes in near darkness.
                  </p>
                </div>
                <div className="bg-red-900/30 border border-red-500/30 rounded p-3">
                  <p className="text-red-300 font-medium text-sm">Safety Impact</p>
                  <p className="text-foreground text-xs mt-1">
                    Staff had to guide confused and vulnerable residents through darkened corridors using mobile phone torches. Several residents became distressed, and there was significant risk of trips and falls on stairways.
                  </p>
                </div>
              </div>
            </div>
            
            <div>
              <h5 className="font-medium text-red-300 mb-2">The Consequences</h5>
              <div className="space-y-3">
                <div>
                  <p className="text-foreground text-sm font-semibold mb-1">Immediate Risks</p>
                  <div className="bg-black/30 p-3 rounded text-sm space-y-1">
                    <div className="text-foreground">
                      <span className="font-medium">Resident Safety:</span> Vulnerable residents at serious risk during evacuation with inadequate lighting in critical escape areas
                    </div>
                    <div className="text-foreground">
                      <span className="font-medium">Staff Liability:</span> Care home staff exposed to potential negligence claims if evacuation had occurred during real emergency
                    </div>
                    <div className="text-foreground">
                      <span className="font-medium">Regulatory Action:</span> CQC (Care Quality Commission) notified and enforcement action threatened if system not immediately rectified
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-foreground text-sm font-semibold mb-1">Financial Impact</p>
                  <div className="bg-black/30 p-3 rounded text-sm space-y-1">
                    <div className="text-foreground">
                      <span className="font-medium">Emergency Battery Replacement:</span> £4,250 for 85 replacement battery packs (urgent procurement and installation)
                    </div>
                    <div className="text-foreground">
                      <span className="font-medium">Compliance Testing:</span> £850 for comprehensive 3-hour duration test and full system verification
                    </div>
                    <div className="text-foreground">
                      <span className="font-medium">Additional Precautions:</span> £1,500 for temporary battery-powered evacuation lighting during remedial works
                    </div>
                    <div className="text-elec-yellow font-semibold mt-2">
                      Total Cost: £6,600 (plus significant reputational damage)
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-foreground text-sm font-semibold mb-1">Timeline Impact</p>
                  <div className="bg-black/30 p-3 rounded text-sm space-y-1">
                    <div className="text-foreground">
                      <span className="font-medium">Remedial Works:</span> 5 working days to procure batteries and replace all affected units
                    </div>
                    <div className="text-foreground">
                      <span className="font-medium">Verification Testing:</span> 2 days for comprehensive 3-hour duration testing and certification
                    </div>
                    <div className="text-foreground">
                      <span className="font-medium">Regulatory Compliance:</span> 3 weeks to satisfy CQC that adequate systems and testing procedures now in place
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-green-300 mb-2">The Root Cause</h5>
              <p className="text-foreground text-sm mb-2">
                Investigation revealed that while monthly functional tests were being carried out correctly, annual 3-hour duration tests had never been performed. The batteries had aged beyond their design life (typically 3-5 years for NiCd batteries) and had lost significant capacity.
              </p>
              <div className="bg-amber-900/30 border border-amber-500/30 rounded p-3">
                <p className="text-amber-300 font-medium text-sm flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4" />
                  Why Short Tests Missed the Problem
                </p>
                <p className="text-foreground text-xs mt-2">
                  The monthly tests lasted only 30-60 seconds — just enough time to verify luminaires switched on. Degraded batteries had sufficient capacity for this brief test but couldn't sustain the load for the required 3-hour period. The problem remained hidden until the fire drill exposed the critical failure.
                </p>
              </div>
            </div>

            <div>
              <h5 className="font-medium text-green-300 mb-2">The Resolution</h5>
              <p className="text-foreground text-sm mb-2">
                Emergency battery replacement programme was completed across all 85 luminaires within 5 days. A comprehensive 3-hour duration test was then conducted, verifying all units maintained adequate illumination for the full period.
              </p>
              <div className="space-y-2">
                <div className="bg-green-900/20 p-3 rounded">
                  <p className="text-green-300 font-medium text-sm">New Testing Protocol</p>
                  <p className="text-foreground text-xs mt-1">
                    Care home implemented proper testing schedule: monthly functional tests (30-60 seconds) combined with annual 3-hour duration tests. Testing contract awarded to qualified emergency lighting specialist with calibrated equipment and comprehensive reporting.
                  </p>
                </div>
                <div className="bg-green-900/20 p-3 rounded">
                  <p className="text-green-300 font-medium text-sm">Preventative Maintenance</p>
                  <p className="text-foreground text-xs mt-1">
                    Battery replacement schedule established with proactive 5-year replacement cycle to prevent future capacity degradation. Annual testing results monitored to identify early signs of battery deterioration.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-red-500/20 border-l-4 border-red-500 p-4 rounded-r-lg mt-4">
              <p className="text-foreground text-sm sm:text-base font-semibold">
                Key Lessons Learned
              </p>
              <div className="text-foreground text-sm mt-3 space-y-2">
                <p>
                  <span className="font-medium">1. Short Monthly Tests Are Not Sufficient:</span> Monthly functional tests verify switching and charging but cannot detect batteries that have lost capacity over time. Annual 3-hour duration tests are mandatory to verify true battery performance.
                </p>
                <p>
                  <span className="font-medium">2. Battery Life Cycles Must Be Managed:</span> Emergency lighting batteries have finite service lives (typically 3-5 years). Proactive replacement prevents catastrophic failures and ensures compliance.
                </p>
                <p>
                  <span className="font-medium">3. High-Risk Premises Require Professional Testing:</span> Care homes, hospitals, and similar vulnerable occupancy buildings should use qualified emergency lighting specialists with proper equipment, not rely solely on in-house maintenance staff.
                </p>
                <p>
                  <span className="font-medium">4. Compliance is Life Safety, Not Box-Ticking:</span> BS 5266-1 requires annual duration tests for good reason — they detect failures that short tests cannot identify. This case demonstrates the real-world consequences of inadequate testing.
                </p>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
