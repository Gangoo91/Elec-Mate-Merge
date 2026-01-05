import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, AlertCircle, Lightbulb } from 'lucide-react';

export const EmergencyLightingRealWorldSection4_1 = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-elec-yellow" />
          Real-World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Case Study */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Case Study: London Shopping Centre Cable Failure</h3>
          <p className="text-foreground leading-relaxed">
            A shopping centre in London used standard PVC cables for part of its emergency lighting system during a 2018 refurbishment. The installation appeared compliant and passed initial electrical testing. However, during a routine fire inspection by London Fire Brigade in 2019, the installation failed compliance checks.
          </p>
        </div>

        {/* The Problem */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-red-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-red-300 font-semibold mb-2">The Problem Discovered</h4>
              <p className="text-foreground text-sm leading-relaxed mb-3">
                Fire safety engineers determined that the PVC cables would not survive long enough in high temperatures to maintain emergency lighting during evacuation. The cables were also supported using plastic clips in ceiling voids, which would melt and cause cable collapse within minutes of fire exposure.
              </p>
              <p className="text-foreground text-sm leading-relaxed">
                Temperature testing predicted cable failure within 8-12 minutes of fire exposure — far below the required 1-hour minimum. The plastic support clips would fail even sooner (2-3 minutes at 180°C).
              </p>
            </div>
          </div>
        </div>

        {/* The Solution */}
        <div className="space-y-3">
          <h4 className="text-foreground font-semibold">The Resolution</h4>
          <ul className="space-y-2 text-foreground text-sm">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Complete rewiring of 850 metres of emergency lighting circuits using enhanced fire-resistant LSZH cables (120-minute F1 rating)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Replacement of all plastic cable clips with metal saddle clips and steel cable trays</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Installation of fire-rated junction boxes at all connection points</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Comprehensive testing and documentation package for Building Control re-approval</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">•</span>
              <span>Project completion delayed by 8 weeks with significant additional costs</span>
            </li>
          </ul>
        </div>

        {/* Financial Impact */}
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
          <h4 className="text-orange-300 font-semibold mb-2">Financial and Operational Impact</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-foreground">
            <div>
              <p className="font-medium mb-1">Unplanned Costs:</p>
              <ul className="space-y-1">
                <li>• Cable replacement: £38,000</li>
                <li>• Support system upgrade: £12,500</li>
                <li>• Additional labour: £24,000</li>
                <li>• Testing & certification: £6,200</li>
                <li>• <strong>Total: £80,700</strong></li>
              </ul>
            </div>
            <div>
              <p className="font-medium mb-1">Business Impact:</p>
              <ul className="space-y-1">
                <li>• Delayed store openings: £95,000 lost revenue</li>
                <li>• Reputation damage with tenants</li>
                <li>• Additional project management costs</li>
                <li>• Fire certificate delay affecting insurance</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Root Cause Analysis */}
        <div className="bg-gray-800/50 rounded-lg p-5">
          <h4 className="text-foreground font-semibold mb-3">Root Cause Analysis</h4>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-2">
              <span className="text-red-400 font-bold">1.</span>
              <div>
                <p className="text-foreground font-medium">Specification Error</p>
                <p className="text-foreground">Original electrical specification did not clearly differentiate emergency lighting cable requirements from standard lighting circuits. Designer assumed standard T&E cables were adequate.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-400 font-bold">2.</span>
              <div>
                <p className="text-foreground font-medium">Installation Shortcuts</p>
                <p className="text-foreground">Contractor used existing plastic cable clip infrastructure to save time and cost, despite cables being specified as "fire-rated" in schedule. Support system not specified explicitly.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-400 font-bold">3.</span>
              <div>
                <p className="text-foreground font-medium">Inadequate Testing</p>
                <p className="text-foreground">Initial electrical testing focused on functionality (insulation resistance, continuity) but did not verify fire-resistance certification of installed cables or support method compliance.</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-red-400 font-bold">4.</span>
              <div>
                <p className="text-foreground font-medium">Missed Inspection</p>
                <p className="text-foreground">Building Control sign-off occurred before final fire safety inspection. Gap in coordination between electrical and fire safety approval processes.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Key Learning Points */}
        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Lightbulb className="h-5 w-5 text-green-400 mt-1 flex-shrink-0" />
            <div>
              <h4 className="text-green-300 font-semibold mb-2">Key Learning Points</h4>
              <p className="text-foreground text-sm leading-relaxed mb-3">
                This case demonstrates why cable specification cannot be an afterthought in emergency lighting design. Every element — from cable type to support method to junction box rating — must be explicitly specified and verified during installation.
              </p>
              <p className="text-foreground text-sm leading-relaxed">
                The contractor's assumption that "fire-rated cable" meant any cable with fire resistance markings highlights the need for specific product standards (BS 7629-1) and clear support method requirements (BS 7671 Reg 521.10.202) in specifications.
              </p>
            </div>
          </div>
        </div>

        {/* Best Practice */}
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <h4 className="text-blue-300 font-semibold mb-2">Best Practice Recommendations</h4>
          <ul className="space-y-2 text-foreground text-sm">
            <li className="flex items-start gap-2">
              <span className="text-blue-400">1.</span>
              <span>Specify cable type, fire rating category, and manufacturer certification explicitly in tender documents</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">2.</span>
              <span>Include support method requirements (metal fixings only, spacing intervals, containment types) in specifications</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">3.</span>
              <span>Conduct installation inspections before ceiling closures to verify cable routing and support compliance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">4.</span>
              <span>Request manufacturer certification documents for all fire-rated cables before acceptance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-400">5.</span>
              <span>Coordinate electrical sign-off with fire safety inspection to catch compliance issues before practical completion</span>
            </li>
          </ul>
        </div>

        {/* Cost Perspective */}
        <div className="bg-elec-yellow/10 border border-elec-yellow/20 rounded-lg p-4">
          <h4 className="text-elec-yellow font-semibold mb-2">The Cost of Getting It Right First Time</h4>
          <p className="text-foreground text-sm leading-relaxed">
            If the project had specified enhanced fire-resistant cables and metal support systems from the outset, the additional cost would have been approximately <strong>£18,000</strong> (850m × £21/m premium for F1 cable + metal fixings). 
          </p>
          <p className="text-foreground text-sm leading-relaxed mt-2">
            The rework cost <strong>£80,700</strong> plus <strong>£95,000</strong> in lost revenue — a total impact of <strong>£175,700</strong>. This represents a <strong>9.8× multiplier</strong> on the cost of doing it correctly initially.
          </p>
          <p className="text-foreground text-sm font-semibold mt-3">
            Specification quality pays for itself many times over.
          </p>
        </div>

      </CardContent>
    </Card>
  );
};
