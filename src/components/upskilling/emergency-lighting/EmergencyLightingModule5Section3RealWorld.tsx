import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

export const EmergencyLightingModule5Section3RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Building2 className="h-6 w-6 text-elec-yellow" />
          Real-World Example
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Case Study Header */}
        <div className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-l-4 border-red-500 p-4 rounded-r-lg">
          <h4 className="text-xl font-bold text-foreground mb-2">
            Birmingham Retail Park: Missing Test Records
          </h4>
          <p className="text-gray-300 text-sm">
            A comprehensive retail development discovered the costly consequences of failing to maintain proper emergency lighting test documentation
          </p>
        </div>

        {/* The Project */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground">The Project</h4>
          <div className="space-y-3">
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              A retail park in Birmingham with 12 individual stores, shared corridors, service areas, and car parks. The emergency lighting system comprised approximately 280 luminaires covering escape routes, stairwells, fire exits, and open areas.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="bg-elec-dark p-4 rounded-lg border border-gray-700">
                <p className="text-elec-yellow font-semibold text-sm mb-2">Site Details:</p>
                <ul className="space-y-1 text-foreground text-xs">
                  <li>• <strong>Type:</strong> Multi-unit retail park</li>
                  <li>• <strong>Size:</strong> 12 retail units + shared areas</li>
                  <li>• <strong>Luminaires:</strong> 280 emergency fittings</li>
                  <li>• <strong>Occupancy:</strong> Up to 2,000 daily visitors</li>
                </ul>
              </div>
              <div className="bg-elec-dark p-4 rounded-lg border border-gray-700">
                <p className="text-elec-yellow font-semibold text-sm mb-2">System Specification:</p>
                <ul className="space-y-1 text-foreground text-xs">
                  <li>• <strong>Type:</strong> Self-contained 3-hour systems</li>
                  <li>• <strong>Installation Date:</strong> 2021</li>
                  <li>• <strong>Coverage:</strong> All escape routes and exits</li>
                  <li>• <strong>Responsibility:</strong> Landlord maintenance</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Problem Discovered */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground">Problem Discovered</h4>
          <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 space-y-3">
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              During a routine fire safety inspection by West Midlands Fire Service in March 2024, the duty officer requested the emergency lighting logbook. Although the facilities manager confirmed monthly tests were being conducted, no documented records could be produced.
            </p>
            <div className="bg-elec-dark p-3 rounded border border-gray-700">
              <p className="text-red-400 font-semibold text-sm mb-2">Inspection Findings:</p>
              <ul className="space-y-1 text-foreground text-xs">
                <li>✗ No logbook entries for monthly tests (required every 30 days)</li>
                <li>✗ No evidence of annual 3-hour duration tests since commissioning</li>
                <li>✗ No records of who conducted tests or results</li>
                <li>✗ No documentation of defects or remedial actions</li>
                <li>✓ Emergency lighting system functioned correctly when visually tested</li>
              </ul>
            </div>
            <p className="text-gray-300 text-xs italic">
              The facilities manager admitted that while tests were "probably done," no formal records had been kept. The previous contractor had not provided logbook documentation.
            </p>
          </div>
        </div>

        {/* Consequences */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground">Legal and Financial Consequences</h4>
          <div className="space-y-3">
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              The absence of test records constituted a breach of the Regulatory Reform (Fire Safety) Order 2005. West Midlands Fire Service issued an enforcement notice requiring immediate remedial action.
            </p>
            <div className="bg-amber-900/30 border border-amber-500/30 rounded-lg p-4">
              <p className="text-amber-300 font-semibold text-sm mb-3">Financial Impact:</p>
              <div className="space-y-2 text-foreground text-xs">
                <div className="flex justify-between p-2 bg-elec-dark rounded">
                  <span>Emergency full-system duration test (out of hours)</span>
                  <span className="font-semibold">£1,850</span>
                </div>
                <div className="flex justify-between p-2 bg-elec-dark rounded">
                  <span>Complete logbook documentation and rectification</span>
                  <span className="font-semibold">£450</span>
                </div>
                <div className="flex justify-between p-2 bg-elec-dark rounded">
                  <span>Battery replacements identified during testing</span>
                  <span className="font-semibold">£2,100</span>
                </div>
                <div className="flex justify-between p-2 bg-elec-dark rounded">
                  <span>Legal consultation fees</span>
                  <span className="font-semibold">£750</span>
                </div>
                <div className="flex justify-between p-2 bg-red-900/30 rounded border-t-2 border-red-500 font-bold">
                  <span>Total Remedial Cost:</span>
                  <span className="text-red-400">£5,150</span>
                </div>
              </div>
            </div>
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-red-400 font-semibold text-sm mb-2">Additional Risks:</p>
              <ul className="space-y-1 text-foreground text-xs">
                <li>• Insurance validity questioned — policy renewal premium increased by 18%</li>
                <li>• Enforcement notice placed on public record</li>
                <li>• Responsible Person faced potential prosecution if not rectified</li>
                <li>• Tenant relationships strained due to disruption during remedial works</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Resolution */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground">Resolution</h4>
          <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-4 space-y-3">
            <p className="text-foreground text-sm sm:text-base leading-relaxed">
              The landlord appointed a compliant electrical contractor to carry out immediate remedial testing and establish ongoing compliance procedures.
            </p>
            <div className="space-y-2 text-foreground text-sm">
              <div className="flex items-start gap-2">
                <span className="text-green-400 flex-shrink-0 font-bold">✓</span>
                <span>Complete 3-hour duration test conducted across all 280 luminaires (identified 17 battery failures)</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 flex-shrink-0 font-bold">✓</span>
                <span>Failed batteries replaced and retested within 7 days</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 flex-shrink-0 font-bold">✓</span>
                <span>Comprehensive logbook created with backdated commissioning data</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 flex-shrink-0 font-bold">✓</span>
                <span>Monthly maintenance contract established with documented procedures</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 flex-shrink-0 font-bold">✓</span>
                <span>Digital logbook system implemented with automatic test reminders</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-400 flex-shrink-0 font-bold">✓</span>
                <span>Enforcement notice lifted after 6-week compliance verification period</span>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons Learned */}
        <div className="space-y-3">
          <h4 className="text-lg font-semibold text-foreground">Lessons Learned for Electricians</h4>
          <div className="bg-blue-500/10 border border-blue-500/30 rounded-lg p-4 space-y-3">
            <div className="space-y-3 text-foreground text-sm">
              <div className="bg-elec-dark p-3 rounded border border-gray-700">
                <p className="text-blue-400 font-semibold mb-2">Key Takeaway #1: Documentation is Mandatory</p>
                <p className="text-gray-300 text-xs">
                  Testing without proper records is legally worthless. Even if tests are conducted correctly, absence of documentation is a compliance breach. Always maintain complete logbook entries.
                </p>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-700">
                <p className="text-blue-400 font-semibold mb-2">Key Takeaway #2: Educate Clients</p>
                <p className="text-gray-300 text-xs">
                  Many Responsible Persons don't understand their legal obligations. As an electrician, you must clearly explain testing requirements and consequences of non-compliance to clients.
                </p>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-700">
                <p className="text-blue-400 font-semibold mb-2">Key Takeaway #3: Digital Systems Reduce Risk</p>
                <p className="text-gray-300 text-xs">
                  Self-test systems with automatic documentation significantly reduce compliance risk and labour costs. Recommend these for clients with large or complex installations.
                </p>
              </div>
              <div className="bg-elec-dark p-3 rounded border border-gray-700">
                <p className="text-blue-400 font-semibold mb-2">Key Takeaway #4: Backdated Records Don't Work</p>
                <p className="text-gray-300 text-xs">
                  Fire inspectors can identify backdated or falsified records. If tests weren't conducted, admit it and establish proper procedures immediately rather than attempting to fabricate documentation.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final Summary */}
        <div className="bg-gradient-to-r from-elec-yellow/20 to-amber-500/20 border-l-4 border-elec-yellow p-4 rounded-r-lg">
          <p className="text-foreground text-sm font-semibold mb-2">
            Cost of Compliance vs Non-Compliance:
          </p>
          <div className="grid sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-green-900/30 p-3 rounded border border-green-500/30">
              <p className="text-green-400 font-semibold mb-1">Proactive Compliance:</p>
              <p className="text-foreground">Annual testing + records = £600-£900/year</p>
            </div>
            <div className="bg-red-900/30 p-3 rounded border border-red-500/30">
              <p className="text-red-400 font-semibold mb-1">Enforcement Remediation:</p>
              <p className="text-foreground">Emergency rectification = £5,150 + insurance increase</p>
            </div>
          </div>
          <p className="text-gray-300 text-xs mt-3 italic">
            This case highlights that testing without proper records is legally worthless and can result in significant enforcement costs.
          </p>
        </div>

      </CardContent>
    </Card>
  );
};
