import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const EmergencyLightingPracticalSection4_5 = () => {
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
          <h3 className="text-lg font-semibold text-foreground">Recommending Remote Systems to Clients</h3>
          
          <div className="bg-green-900/20 border-l-4 border-green-500 p-4 rounded-r">
            <h4 className="font-semibold text-green-300 mb-3 flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              When to Recommend Remote Testing
            </h4>
            <div className="space-y-2 text-foreground text-sm">
              <p>
                <span className="font-medium text-green-200">High Compliance Risk:</span> Buildings with strict regulatory 
                oversight (hospitals, care homes, public venues) where failure to maintain records can result in enforcement 
                action or prosecution.
              </p>
              <p>
                <span className="font-medium text-green-200">Limited Maintenance Staff:</span> Sites where manual testing 
                takes maintenance personnel away from critical duties, or where staff turnover makes record-keeping inconsistent.
              </p>
              <p>
                <span className="font-medium text-green-200">Large or Complex Sites:</span> Multi-building campuses, 
                high-rise buildings, or facilities with difficult access areas where manual testing is time-consuming.
              </p>
              <p>
                <span className="font-medium text-green-200">Budget for Long-Term Savings:</span> Clients who understand 
                that higher upfront costs deliver significant operational savings over 5-10 year lifespan.
              </p>
              <p>
                <span className="font-medium text-green-200">Desire for Modern Infrastructure:</span> Forward-thinking 
                organisations investing in smart building systems and IoT integration.
              </p>
            </div>
          </div>

          <div className="bg-orange-900/20 border-l-4 border-orange-500 p-4 rounded-r">
            <h4 className="font-semibold text-orange-300 mb-3">Cost-Benefit Presentation for Clients</h4>
            <p className="text-foreground text-sm mb-3">
              When proposing remote testing systems, present a clear ROI calculation:
            </p>
            <div className="bg-elec-dark p-4 rounded border border-gray-600">
              <div className="space-y-2.5 text-sm sm:text-base">
                <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline">
                  <span className="text-foreground text-left">Manual Testing (200 luminaires):</span>
                  <span className="font-semibold text-foreground whitespace-nowrap text-right">4 hours/month</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline">
                  <span className="text-foreground text-left">Annual Labour Cost (£25/hour):</span>
                  <span className="font-semibold text-foreground whitespace-nowrap text-right">£1,200/year</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline pt-2 border-t border-gray-600">
                  <span className="text-green-300 text-left">Remote System Cost (installed):</span>
                  <span className="font-semibold text-green-300 whitespace-nowrap text-right">£8,000-£12,000</span>
                </div>
                <div className="grid grid-cols-[1fr_auto] gap-x-4 items-baseline">
                  <span className="text-green-300 text-left">Payback Period:</span>
                  <span className="font-semibold text-green-300 whitespace-nowrap text-right">7-10 years</span>
                </div>
                <div className="pt-2 border-t border-gray-600">
                  <div className="font-semibold text-elec-yellow mb-2">Additional Benefits (not costed):</div>
                  <div className="text-foreground pl-4 space-y-1 text-sm">
                    <div>• Reduced compliance risk</div>
                    <div>• Instant fault detection</div>
                    <div>• Improved audit readiness</div>
                    <div>• Better maintenance planning</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">System Compatibility and Selection</h3>
          
          <div className="bg-blue-900/20 border-l-4 border-blue-500 p-4 rounded-r">
            <h4 className="font-semibold text-blue-300 mb-3">Ensuring Compatibility</h4>
            <div className="space-y-3">
              <div className="bg-elec-dark/50 p-3 rounded border border-gray-600">
                <h5 className="font-medium text-foreground mb-1">Luminaire Compatibility</h5>
                <p className="text-foreground text-sm">
                  Verify that chosen remote testing system supports the specific luminaire brands and models being 
                  installed. Not all systems work with all luminaires — some use proprietary communication protocols.
                </p>
              </div>
              <div className="bg-elec-dark/50 p-3 rounded border border-gray-600">
                <h5 className="font-medium text-foreground mb-1">Battery Technology</h5>
                <p className="text-foreground text-sm">
                  Confirm system compatibility with battery types (NiCd, NiMH, Li-ion, LiFePO4). Different chemistries 
                  have different testing requirements and voltage profiles.
                </p>
              </div>
              <div className="bg-elec-dark/50 p-3 rounded border border-gray-600">
                <h5 className="font-medium text-foreground mb-1">Existing Infrastructure</h5>
                <p className="text-foreground text-sm">
                  For networked systems, check if existing BMS or IT network can accommodate additional devices. 
                  Coordinate with IT teams on IP addressing, VLANs, and network security.
                </p>
              </div>
              <div className="bg-elec-dark/50 p-3 rounded border border-gray-600">
                <h5 className="font-medium text-foreground mb-1">Software Requirements</h5>
                <p className="text-foreground text-sm">
                  Understand client's preference for local server vs cloud-based monitoring. Consider security policies 
                  for healthcare or government sites that may prohibit cloud storage of building data.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Training Building Managers</h3>
          
          <div className="bg-purple-900/20 border-l-4 border-purple-500 p-4 rounded-r">
            <h4 className="font-semibold text-purple-300 mb-3">Essential Training Topics</h4>
            <div className="space-y-2 text-foreground text-sm">
              <p>
                <span className="font-medium text-purple-200">Interpreting Reports:</span> How to read test logs, 
                identify failure patterns, and prioritise corrective actions.
              </p>
              <p>
                <span className="font-medium text-purple-200">Alert Management:</span> Setting up email/SMS notifications, 
                understanding alert severity levels, establishing response procedures.
              </p>
              <p>
                <span className="font-medium text-purple-200">Scheduling Tests:</span> How to manually trigger tests 
                when needed, adjust test schedules for building closures or maintenance windows.
              </p>
              <p>
                <span className="font-medium text-purple-200">Generating Compliance Reports:</span> Creating audit-ready 
                documentation for fire inspections or insurance reviews.
              </p>
              <p>
                <span className="font-medium text-purple-200">System Maintenance:</span> Basic troubleshooting, when 
                to call specialist support, software update procedures.
              </p>
            </div>
          </div>

          <div className="bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg p-4">
            <h4 className="font-semibold text-elec-yellow mb-2">Best Practice Tip</h4>
            <p className="text-foreground text-sm">
              Always provide a comprehensive handover document including system architecture diagrams, luminaire 
              location plans, login credentials, support contact details, and a troubleshooting quick-reference guide. 
              Schedule a follow-up visit 3-6 months after commissioning to ensure the client is using the system effectively.
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Visual Inspections Still Required</h3>
          
          <div className="bg-red-900/20 border-l-4 border-red-500 p-4 rounded-r">
            <h4 className="font-semibold text-red-300 mb-3 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Critical Limitation
            </h4>
            <p className="text-foreground text-sm mb-3">
              Remote testing systems <span className="font-bold text-red-300">do not replace</span> the need for 
              visual inspections. Electricians and building managers must still conduct regular checks for:
            </p>
            <div className="space-y-2 text-foreground text-sm">
              <div className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Physical damage to luminaires or signage</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Obstructions blocking light output or visibility</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Dirt or grime reducing illumination levels</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Changes to building layout affecting escape route marking</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-red-400">•</span>
                <span>Correct mounting and security of fittings</span>
              </div>
            </div>
            <p className="text-foreground text-sm mt-3 italic">
              BS 5266-1 requires routine visual inspections regardless of testing method. Remote systems automate 
              functional testing but cannot detect physical issues.
            </p>
          </div>
        </div>

        <div className="bg-elec-dark border border-gray-600 rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Implementation Checklist</h4>
          <div className="space-y-2 text-sm">
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Assess site suitability (luminaire count, risk level, budget)</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Verify system compatibility with luminaire types and batteries</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Coordinate with IT/BMS teams on network requirements</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Plan data cabling routes (networked systems) or wireless gateway locations</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Commission system and verify all luminaires reporting correctly</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Train building management team on system operation and reporting</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Provide comprehensive handover documentation</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Schedule follow-up visit for ongoing support</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <span className="text-foreground">Confirm visual inspection schedule remains in place</span>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
