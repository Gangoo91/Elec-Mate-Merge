import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Wrench, Tag, Folder, Link, Users } from 'lucide-react';

export const EmergencyLightingModule5Section4Practical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Wrench className="h-5 w-5 text-elec-yellow" />
          Practical Guidance
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        
        {/* Labelling Best Practices */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Tag className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-semibold text-elec-yellow">Labelling Best Practices</h3>
          </div>
          <div className="bg-gray-800 p-4 rounded-md space-y-3">
            <p className="text-sm sm:text-base text-foreground">
              Professional labelling requires durable materials and consistent formatting to ensure long-term legibility and compliance.
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-foreground">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">✓</span>
                <span><strong className="text-foreground">Use engraved or printed labels</strong> rather than handwritten stickers — handwritten labels fade and are unacceptable to fire inspectors</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">✓</span>
                <span><strong className="text-foreground">Label makers:</strong> Brady, Dymo XTL, or Brother industrial label printers produce durable, professional results</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">✓</span>
                <span><strong className="text-foreground">Laminated labels:</strong> Protect against moisture, UV degradation, and mechanical damage</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">✓</span>
                <span><strong className="text-foreground">Consistent numbering:</strong> Use a logical system (e.g., Floor-Zone-Number: 1-A-01, 1-A-02) that matches drawings</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">✓</span>
                <span><strong className="text-foreground">High-contrast colours:</strong> Yellow on black or white on red for critical warnings</span>
              </li>
            </ul>
            <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-md mt-3">
              <p className="text-amber-400 font-semibold text-sm">⚠️ Tip:</p>
              <p className="text-sm text-foreground">
                Take photos of all labelled components during commissioning. This creates a visual reference for future maintenance and helps verify label condition during annual inspections.
              </p>
            </div>
          </div>
        </div>

        {/* Logbook Management */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Folder className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-semibold text-elec-yellow">Logbook Management</h3>
          </div>
          <div className="bg-gray-800 p-4 rounded-md space-y-3">
            <p className="text-sm sm:text-base text-foreground">
              The emergency lighting logbook is a legal document that must be maintained for the lifetime of the installation. Proper management ensures compliance and simplifies inspections.
            </p>
            <ul className="space-y-2 text-sm sm:text-base text-foreground">
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">✓</span>
                <span><strong className="text-foreground">Dedicated folder:</strong> Keep logbooks in a dedicated folder near the fire alarm panel or main electrical distribution board</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">✓</span>
                <span><strong className="text-foreground">Bound logbook:</strong> Use a bound book (not loose sheets) to prevent pages being removed or lost</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">✓</span>
                <span><strong className="text-foreground">Pen entries only:</strong> Never use pencil — entries must be permanent and tamper-evident</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">✓</span>
                <span><strong className="text-foreground">Corrections:</strong> If a mistake is made, draw a single line through the error and initial it — do not use correction fluid</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-elec-yellow mt-1">✓</span>
                <span><strong className="text-foreground">Regular reviews:</strong> The Responsible Person should review the logbook quarterly to check compliance</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Digital Record Systems */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Folder className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-semibold text-elec-yellow">Digital Record Systems</h3>
          </div>
          <div className="bg-gray-800 p-4 rounded-md space-y-3">
            <p className="text-sm sm:text-base text-foreground">
              For large sites with extensive emergency lighting installations, digital maintenance software reduces errors, automates reminders, and provides instant reporting for inspections.
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-3">
              <div className="bg-green-500/10 border border-green-500/30 p-3 rounded-md">
                <p className="font-semibold text-green-400 mb-2">✓ Advantages of Digital Systems:</p>
                <ul className="space-y-1 text-sm text-foreground">
                  <li>• Automated test reminders and scheduling</li>
                  <li>• Instant fault reporting and email alerts</li>
                  <li>• Cloud backup prevents data loss</li>
                  <li>• Mobile app access for on-site testing</li>
                  <li>• Automatic generation of compliance reports</li>
                  <li>• Integration with CAFM systems</li>
                </ul>
              </div>
              <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-md">
                <p className="font-semibold text-amber-400 mb-2">⚠️ Considerations:</p>
                <ul className="space-y-1 text-sm text-foreground">
                  <li>• Initial setup cost and staff training</li>
                  <li>• Requires reliable internet connectivity</li>
                  <li>• Subscription fees for cloud services</li>
                  <li>• Data security and GDPR compliance</li>
                  <li>• Paper backup still recommended</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-foreground mt-3">
              <strong className="text-foreground">Popular platforms:</strong> Fixflo, FaultFixers, Concerto, and Spacewell (formerly Eptura) offer emergency lighting maintenance modules suitable for large commercial and public sector sites.
            </p>
          </div>
        </div>

        {/* Cross-Referencing Procedures */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Link className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-semibold text-elec-yellow">Cross-Referencing Procedures</h3>
          </div>
          <div className="bg-gray-800 p-4 rounded-md space-y-3">
            <p className="text-sm sm:text-base text-foreground">
              Accurate cross-referencing between physical labels, drawings, and logbook entries is essential for efficient maintenance and fault-finding.
            </p>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-elec-yellow flex items-center justify-center text-elec-dark font-bold text-xs flex-shrink-0">
                  1
                </div>
                <div className="text-sm sm:text-base">
                  <p className="font-semibold text-foreground">Match luminaire numbers on drawings with logbook entries</p>
                  <p className="text-foreground">Every luminaire on the as-installed drawings should have a corresponding entry in the logbook index</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-elec-yellow flex items-center justify-center text-elec-dark font-bold text-xs flex-shrink-0">
                  2
                </div>
                <div className="text-sm sm:text-base">
                  <p className="font-semibold text-foreground">Update drawings after any modifications</p>
                  <p className="text-foreground">If luminaires are added, removed, or relocated, update drawings immediately and amend the logbook index</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-elec-yellow flex items-center justify-center text-elec-dark font-bold text-xs flex-shrink-0">
                  3
                </div>
                <div className="text-sm sm:text-base">
                  <p className="font-semibold text-foreground">Use consistent reference formats</p>
                  <p className="text-foreground">Ensure labels, drawings, and logbook all use identical luminaire references (e.g., "EL-01-A-05" not "EL1A5" or "Emergency Light 5")</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-elec-yellow flex items-center justify-center text-elec-dark font-bold text-xs flex-shrink-0">
                  4
                </div>
                <div className="text-sm sm:text-base">
                  <p className="font-semibold text-foreground">Create a site plan index</p>
                  <p className="text-foreground">Attach a simplified site plan to the front of the logbook showing zones and approximate luminaire locations</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Staff Training */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Users className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-semibold text-elec-yellow">Staff Training Requirements</h3>
          </div>
          <div className="bg-gray-800 p-4 rounded-md space-y-3">
            <p className="text-sm sm:text-base text-foreground">
              While annual duration tests should be carried out by competent persons (electricians or specialist contractors), site staff can be trained to perform monthly functional tests under supervision.
            </p>
            <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-md">
              <p className="font-semibold text-blue-400 mb-2">Training Requirements for Site Staff:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">1.</span>
                  <span><strong className="text-foreground">System overview:</strong> Understanding how emergency lighting works and why testing is critical</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">2.</span>
                  <span><strong className="text-foreground">Test procedures:</strong> Step-by-step instructions for monthly functional tests (typically key-switch operation)</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">3.</span>
                  <span><strong className="text-foreground">Logbook completion:</strong> How to accurately record test date, results, and any defects</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">4.</span>
                  <span><strong className="text-foreground">Fault identification:</strong> Recognising common faults (dim light, no light, flickering) and reporting procedures</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-400">5.</span>
                  <span><strong className="text-foreground">Escalation process:</strong> Who to contact if faults are found or tests cannot be completed</span>
                </li>
              </ul>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-md mt-3">
              <p className="text-amber-400 font-semibold text-sm">⚠️ Important:</p>
              <p className="text-sm text-foreground">
                Site staff conducting monthly tests must receive formal training and demonstrate competence. Training should be documented and refreshed annually. The Responsible Person remains legally accountable even when delegating routine testing.
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
