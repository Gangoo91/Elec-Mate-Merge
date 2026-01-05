import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { HelpCircle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const EmergencyLightingModule5Section3FAQ = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <HelpCircle className="h-6 w-6 text-elec-yellow" />
          Frequently Asked Questions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <Accordion type="single" collapsible className="w-full space-y-2">
          <AccordionItem value="item-1" className="bg-elec-dark border border-gray-700 rounded-lg px-4">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow text-left text-sm sm:text-base py-4 hover:no-underline">
              Can monthly tests be skipped if an automated system is installed?
            </AccordionTrigger>
            <AccordionContent className="text-foreground text-sm sm:text-base pb-4 leading-relaxed">
              <p className="mb-3">
                No — even with automated self-test systems, visual inspection checks are still required to ensure luminaires aren't damaged, obstructed, or incorrectly oriented.
              </p>
              <p className="text-gray-300 text-sm mb-3">
                While self-test systems automatically verify electrical functionality and battery capacity, they cannot detect:
              </p>
              <ul className="space-y-1 text-gray-300 text-sm ml-4">
                <li>• Physical damage to luminaire housings or lenses</li>
                <li>• Exit signs with incorrect directional arrows</li>
                <li>• Obstructions blocking light output (furniture, signage, decorations)</li>
                <li>• Changes in building layout affecting escape route coverage</li>
                <li>• Vandalism or unauthorised modifications</li>
              </ul>
              <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3 mt-3">
                <p className="text-blue-400 font-semibold text-sm mb-1">Best Practice:</p>
                <p className="text-foreground text-xs">
                  Even with self-test systems, conduct monthly visual walk-throughs to verify physical condition and proper coverage. The automated system handles electrical testing, but human inspection remains essential for compliance.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="bg-elec-dark border border-gray-700 rounded-lg px-4">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow text-left text-sm sm:text-base py-4 hover:no-underline">
              What happens if a luminaire fails during the annual test?
            </AccordionTrigger>
            <AccordionContent className="text-foreground text-sm sm:text-base pb-4 leading-relaxed">
              <p className="mb-3">
                It must be repaired or replaced immediately, and a retest carried out to verify correct operation.
              </p>
              <p className="text-gray-300 text-sm mb-3">
                The remedial procedure is:
              </p>
              <ol className="space-y-2 text-foreground text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold flex-shrink-0">1.</span>
                  <span><strong>Document the Failure:</strong> Record luminaire location, nature of failure (battery depleted early, lamp failed, etc.), and time of failure in logbook</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold flex-shrink-0">2.</span>
                  <span><strong>Immediate Notification:</strong> Inform the Responsible Person that the system is non-compliant until repaired</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold flex-shrink-0">3.</span>
                  <span><strong>Urgent Repair:</strong> Replace failed battery, lamp, driver, or entire luminaire as needed. Do not delay — system is legally non-compliant</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold flex-shrink-0">4.</span>
                  <span><strong>Recharge and Retest:</strong> Allow 24-hour recharge period, then conduct full 3-hour duration test on repaired unit</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-elec-yellow font-bold flex-shrink-0">5.</span>
                  <span><strong>Update Documentation:</strong> Record repair details and successful retest in logbook</span>
                </li>
              </ol>
              <div className="bg-red-500/10 border border-red-500/30 rounded p-3 mt-3">
                <p className="text-red-400 font-semibold text-sm mb-1">Critical Escape Routes:</p>
                <p className="text-foreground text-xs">
                  If failure affects a critical escape route with no alternative lighting, consider temporary measures (battery-powered emergency lights) while repairs are arranged. The building must not remain occupied without adequate emergency lighting on escape routes.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="bg-elec-dark border border-gray-700 rounded-lg px-4">
            <AccordionTrigger className="text-foreground hover:text-elec-yellow text-left text-sm sm:text-base py-4 hover:no-underline">
              Do small premises need annual tests?
            </AccordionTrigger>
            <AccordionContent className="text-foreground text-sm sm:text-base pb-4 leading-relaxed">
              <p className="mb-3">
                Yes — testing requirements apply to all non-domestic buildings regardless of size, occupancy level, or business type.
              </p>
              <p className="text-gray-300 text-sm mb-3">
                The Regulatory Reform (Fire Safety) Order 2005 and BS 5266-8 make no exemptions based on building size. Whether you have 5 luminaires or 500, the testing regime remains the same:
              </p>
              <ul className="space-y-1 text-foreground text-sm ml-4 mb-3">
                <li>• <strong>Monthly functional tests:</strong> Every 30 days (short duration)</li>
                <li>• <strong>Annual duration tests:</strong> Every 12 months (full 3 hours)</li>
                <li>• <strong>Logbook documentation:</strong> All tests must be recorded</li>
              </ul>
              <div className="grid sm:grid-cols-2 gap-3 text-xs">
                <div className="bg-green-500/10 border border-green-500/30 rounded p-3">
                  <p className="text-green-400 font-semibold mb-1">Buildings Requiring Testing:</p>
                  <ul className="text-foreground space-y-0.5 ml-3">
                    <li>• All commercial premises</li>
                    <li>• Retail shops (any size)</li>
                    <li>• Offices and workplaces</li>
                    <li>• Industrial units</li>
                    <li>• Restaurants and cafes</li>
                    <li>• Hotels and guest houses</li>
                    <li>• Care homes and hospitals</li>
                    <li>• Schools and nurseries</li>
                    <li>• Community buildings</li>
                  </ul>
                </div>
                <div className="bg-blue-500/10 border border-blue-500/30 rounded p-3">
                  <p className="text-blue-400 font-semibold mb-1">Example: Small Shop</p>
                  <p className="text-foreground mb-2">
                    A 40m² retail shop with only 3 emergency luminaires still requires:
                  </p>
                  <ul className="text-foreground space-y-0.5 ml-3">
                    <li>✓ Monthly tests (12/year)</li>
                    <li>✓ Annual 3-hour test</li>
                    <li>✓ Complete logbook</li>
                    <li>✓ Fire authority access</li>
                  </ul>
                </div>
              </div>
              <div className="bg-amber-900/30 border border-amber-500/30 rounded p-3 mt-3">
                <p className="text-amber-300 font-semibold text-sm mb-1">Practical Tip for Small Premises:</p>
                <p className="text-foreground text-xs">
                  For small installations with few luminaires, testing is quick and inexpensive. A competent electrician can complete monthly tests in 10-15 minutes and annual tests in 3-4 hours. The logbook can be a simple paper record kept near the electrical intake. Don't assume your premises are "too small" to need compliance — size is not a factor in fire safety law.
                </p>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
};
