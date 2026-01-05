import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2, AlertTriangle, FileX, Lightbulb, CheckCircle2, GraduationCap } from 'lucide-react';

export const EmergencyLightingModule5Section4RealWorld = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <Building2 className="h-5 w-5 text-elec-yellow" />
          Real-World Example: London Leisure Centre Compliance Failure
        </CardTitle>
      </CardHeader>
      <CardContent className="text-foreground space-y-6">
        
        {/* Project Context */}
        <div className="bg-gray-800 p-4 rounded-md border-l-4 border-blue-500">
          <div className="flex items-center gap-2 mb-3">
            <Building2 className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-blue-400">Project Context</h3>
          </div>
          <p className="text-sm sm:text-base text-foreground leading-relaxed">
            A large leisure centre in London had a fully functional emergency lighting system with over 300 luminaires across multiple floors, including a swimming pool, gym, sports halls, and changing facilities. The system was installed 6 years prior and had been routinely tested by facilities staff.
          </p>
          <div className="mt-3 bg-blue-500/10 p-3 rounded-md">
            <p className="text-sm text-foreground">
              <strong className="text-foreground">System Details:</strong> Mixed maintained and non-maintained luminaires, central battery system for pool areas, self-contained units elsewhere. Total installation value: ~£45,000.
            </p>
          </div>
        </div>

        {/* The Problem */}
        <div className="bg-gray-800 p-4 rounded-md border-l-4 border-red-500">
          <div className="flex items-center gap-2 mb-3">
            <AlertTriangle className="h-5 w-5 text-red-400" />
            <h3 className="text-lg font-semibold text-red-400">The Problem</h3>
          </div>
          <p className="text-sm sm:text-base text-foreground leading-relaxed mb-3">
            During a routine fire safety inspection by the London Fire Brigade, the fire inspector requested maintenance records and discovered serious compliance failures:
          </p>
          <ul className="space-y-2 text-sm sm:text-base text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">✗</span>
              <span><strong className="text-foreground">No circuit labelling:</strong> None of the emergency lighting circuits were labelled at the distribution boards</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">✗</span>
              <span><strong className="text-foreground">Unlabelled luminaires:</strong> Individual luminaires had no reference numbers matching drawings or logbooks</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">✗</span>
              <span><strong className="text-foreground">Incomplete logbook:</strong> Monthly tests were recorded sporadically with gaps of 3-6 months</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">✗</span>
              <span><strong className="text-foreground">Missing commissioning records:</strong> No evidence of the original commissioning or initial 3-hour test</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-400 font-bold">✗</span>
              <span><strong className="text-foreground">No remedial action records:</strong> Failed luminaires were mentioned but no proof of repairs</span>
            </li>
          </ul>
        </div>

        {/* Consequences */}
        <div className="bg-gray-800 p-4 rounded-md border-l-4 border-amber-500">
          <div className="flex items-center gap-2 mb-3">
            <FileX className="h-5 w-5 text-amber-400" />
            <h3 className="text-lg font-semibold text-amber-400">Consequences</h3>
          </div>
          <p className="text-sm sm:text-base text-foreground leading-relaxed mb-3">
            Despite the physical system working correctly, the lack of documentation resulted in severe consequences:
          </p>
          <div className="space-y-3">
            <div className="bg-red-500/10 border border-red-500/30 p-3 rounded-md">
              <p className="font-semibold text-red-400 mb-1">Legal Action</p>
              <p className="text-sm text-foreground">
                The site was served with an <strong className="text-foreground">Enforcement Notice</strong> under Article 29 of the Regulatory Reform (Fire Safety) Order 2005, requiring immediate action to bring the system into compliance.
              </p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/30 p-3 rounded-md">
              <p className="font-semibold text-amber-400 mb-1">Remedial Work Required</p>
              <p className="text-sm text-foreground">
                Full relabelling of all circuits, distribution boards, and 300+ luminaires. Production of new as-installed drawings with cross-referenced luminaire schedules. Complete re-commissioning including initial 3-hour duration test.
              </p>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/30 p-3 rounded-md">
              <p className="font-semibold text-blue-400 mb-1">Financial Impact</p>
              <p className="text-sm text-foreground">
                <strong className="text-foreground">Estimated cost: £12,000–£15,000</strong> for relabelling, re-commissioning, updated drawings, and specialist contractor time. Additional loss of revenue due to restricted opening hours during remedial work.
              </p>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/30 p-3 rounded-md">
              <p className="font-semibold text-purple-400 mb-1">Reputational Damage</p>
              <p className="text-sm text-foreground">
                The enforcement notice became a matter of public record, damaging the centre's reputation and raising concerns among members and insurance providers.
              </p>
            </div>
          </div>
        </div>

        {/* Root Cause */}
        <div className="bg-gray-800 p-4 rounded-md border-l-4 border-purple-500">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="h-5 w-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-purple-400">Root Cause Analysis</h3>
          </div>
          <p className="text-sm sm:text-base text-foreground leading-relaxed mb-3">
            Investigation revealed systemic failures in both the original installation and ongoing management:
          </p>
          <ul className="space-y-2 text-sm sm:text-base text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-purple-400">1.</span>
              <span>The original contractor failed to label the system during commissioning (6 years prior)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">2.</span>
              <span>The building's Responsible Person was not adequately trained in emergency lighting compliance</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">3.</span>
              <span>Facilities staff conducted tests but didn't understand the legal importance of documentation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">4.</span>
              <span>No annual competent person inspections had been arranged (relying solely on in-house staff)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-purple-400">5.</span>
              <span>Management assumed that "working lights = compliance" without understanding regulatory requirements</span>
            </li>
          </ul>
        </div>

        {/* Resolution */}
        <div className="bg-gray-800 p-4 rounded-md border-l-4 border-green-500">
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-5 w-5 text-green-400" />
            <h3 className="text-lg font-semibold text-green-400">Resolution and Corrective Action</h3>
          </div>
          <p className="text-sm sm:text-base text-foreground leading-relaxed mb-3">
            The leisure centre engaged a specialist emergency lighting contractor to bring the system into full compliance:
          </p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center text-elec-dark font-bold text-xs flex-shrink-0">
                ✓
              </div>
              <div className="text-sm sm:text-base">
                <p className="font-semibold text-foreground">Complete System Survey</p>
                <p className="text-foreground">Every luminaire was identified, photographed, and allocated a unique reference number matching a new set of as-installed drawings</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center text-elec-dark font-bold text-xs flex-shrink-0">
                ✓
              </div>
              <div className="text-sm sm:text-base">
                <p className="font-semibold text-foreground">Professional Labelling</p>
                <p className="text-foreground">All luminaires, distribution boards, and test points received durable engraved labels cross-referenced to drawings and logbook</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center text-elec-dark font-bold text-xs flex-shrink-0">
                ✓
              </div>
              <div className="text-sm sm:text-base">
                <p className="font-semibold text-foreground">Full Re-Commissioning</p>
                <p className="text-foreground">Initial 3-hour duration test carried out and documented, with commissioning certificate issued</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center text-elec-dark font-bold text-xs flex-shrink-0">
                ✓
              </div>
              <div className="text-sm sm:text-base">
                <p className="font-semibold text-foreground">Staff Training Programme</p>
                <p className="text-foreground">Facilities staff received formal training on monthly test procedures, logbook completion, and fault reporting</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-green-400 flex items-center justify-center text-elec-dark font-bold text-xs flex-shrink-0">
                ✓
              </div>
              <div className="text-sm sm:text-base">
                <p className="font-semibold text-foreground">Annual Maintenance Contract</p>
                <p className="text-foreground">A service contract was put in place for annual duration tests and competent person inspections</p>
              </div>
            </div>
          </div>
        </div>

        {/* Lessons Learned */}
        <div className="bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 p-4 rounded-md">
          <div className="flex items-center gap-2 mb-3">
            <GraduationCap className="h-5 w-5 text-blue-400" />
            <h3 className="text-lg font-semibold text-blue-400">Lessons Learned for Electricians</h3>
          </div>
          <ul className="space-y-2 text-sm sm:text-base text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">1.</span>
              <span><strong>Labelling is non-negotiable:</strong> Never hand over an emergency lighting installation without complete labelling and documentation</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">2.</span>
              <span><strong>Educate clients:</strong> Ensure clients understand their legal responsibilities under the Fire Safety Order before handover</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">3.</span>
              <span><strong>Documentation = legal evidence:</strong> Physical compliance means nothing without proper records to prove it</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">4.</span>
              <span><strong>Annual competent person inspections:</strong> In-house staff testing is not sufficient — professional inspections are essential</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-elec-yellow font-bold">5.</span>
              <span><strong>Prevention is cheaper than remediation:</strong> Proper labelling and commissioning costs a fraction of enforcement-driven remedial work</span>
            </li>
          </ul>
        </div>

      </CardContent>
    </Card>
  );
};
