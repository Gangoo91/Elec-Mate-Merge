import { Book, CheckCircle, AlertTriangle, Shield, Info, Target, Settings, Cable, Zap, Users, Calculator, Clipboard, Timer, Database, FileText, Wrench } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const MinorWorksContent = () => {
  const introductionContent = {
    overview: "The Minor Electrical Installation Works Certificate (MEIWC) is designed for documenting small-scale electrical work that doesn't require a full Electrical Installation Certificate. This streamlined certification process maintains safety standards while providing proportionate documentation for minor additions and modifications to existing electrical installations.",
    importance: "Understanding when to use a Minor Works Certificate versus other certification types is crucial for compliance and efficiency. The MEIWC serves as both a record of work completed and verification of safety testing, providing essential documentation for minor electrical works without unnecessary bureaucracy.",
    scope: "This section covers the complete Minor Works Certificate process, including when it's appropriate to use, how to complete it correctly, required testing procedures, and the legal obligations that accompany this form of certification."
  };

  const learningObjectives = [
    "Distinguish when Minor Works Certificate is appropriate versus EIC or EICR",
    "Complete all sections of MEIWC accurately and comprehensively",
    "Perform required testing for minor works according to BS 7671",
    "Understand the limitations and scope of minor works certification",
    "Document circuit additions and modifications correctly",
    "Apply appropriate testing schedules for different work types",
    "Ensure compliance with Building Regulations notification requirements",
    "Understand liability and responsibility limitations of minor works",
    "Complete circuit details and protection information accurately",
    "Recognise when work exceeds minor works scope and requires EIC"
  ];

  const minorWorksTypes = [
    { work: "Additional socket outlet on existing circuit", certificate: "MEIWC", limitations: "Circuit must have adequate capacity, existing protection suitable, no design changes required" },
    { work: "Additional lighting point on existing circuit", certificate: "MEIWC", limitations: "Within existing circuit design parameters, no additional load calculations needed" },
    { work: "Replacement of accessories (sockets, switches)", certificate: "MEIWC", limitations: "Like-for-like replacement, no circuit modifications, same ratings and types" },
    { work: "Single additional circuit from existing distribution board", certificate: "MEIWC", limitations: "Board has spare capacity, no main modifications, standard circuit requirements" },
    { work: "Replacement of damaged cable section", certificate: "MEIWC", limitations: "Same cable type and rating, no route changes, maintains existing protection" },
    { work: "Installation of additional light fitting", certificate: "MEIWC", limitations: "Existing circuit adequate, no structural modifications, standard installation method" },
    { work: "Replacement of single MCB or RCD", certificate: "MEIWC", limitations: "Same rating and type, no discrimination issues, existing installation compatible" },
    { work: "Addition of external socket for garden use", certificate: "MEIWC", limitations: "Adequate RCD protection, suitable existing circuit, appropriate IP rating provided" }
  ];

  const certificateRequirements = [
    { section: "Installation Details", requirements: ["Address and installation description", "Scope and extent of minor works", "Existing installation assessment", "Supply characteristics confirmation"] },
    { section: "Circuit Information", requirements: ["Circuit identification and designation", "Type and rating of protective device", "Cable details and installation method", "Circuit length and conductor sizes"] },
    { section: "Testing Requirements", requirements: ["Continuity of protective conductors", "Insulation resistance testing", "Polarity verification", "RCD operation where applicable"] },
    { section: "Completion Details", requirements: ["Work completion date", "Test date and instruments used", "Competent person details", "Customer notification requirements"] }
  ];

  const testingRequirements = [
    { test: "Continuity of Protective Conductors", requirement: "Verify all protective conductors continuous", method: "Low resistance ohmmeter, test between points", limit: "No specific limit, but continuity must be confirmed" },
    { test: "Insulation Resistance", requirement: "Between live conductors and earth", method: "500V DC insulation tester", limit: "≥1MΩ for circuits ≤500V" },
    { test: "Polarity", requirement: "Correct connection of conductors", method: "Visual inspection and testing", limit: "Single pole devices in line conductors only" },
    { test: "Earth Fault Loop Impedance", requirement: "Where new circuits added", method: "Loop impedance tester", limit: "≤ maximum Zs for protective device" },
    { test: "RCD Operation", requirement: "Where RCD protection provided", method: "RCD tester at required test currents", limit: "≤30ms at 5×IΔn, ≤300ms at 1×IΔn" },
    { test: "Functional Testing", requirement: "Operation of new accessories", method: "Manual operation and visual check", limit: "All devices operate as intended" }
  ];

  const limitations = [
    "Cannot be used for new consumer unit installations",
    "Not suitable for complete circuit rewiring",
    "Cannot cover work requiring design calculations",
    "Not appropriate for special location work requiring detailed assessment",
    "Cannot be used for three-phase installations without prior assessment",
    "Not suitable for installations requiring load calculations",
    "Cannot cover work affecting main earthing or bonding",
    "Not appropriate for installations requiring discrimination studies"
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardContent className="space-y-8 pt-6">
        
        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Info className="h-6 w-6 text-elec-yellow" />
            Introduction
          </h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <div className="space-y-4">
              <div>
                <h4 className="text-lg font-medium text-foreground mb-2">Overview</h4>
                <p className="text-foreground leading-relaxed">{introductionContent.overview}</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-foreground mb-2">Importance</h4>
                <p className="text-foreground leading-relaxed">{introductionContent.importance}</p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-foreground mb-2">Scope of Learning</h4>
                <p className="text-foreground leading-relaxed">{introductionContent.scope}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">When to Use Minor Works Certificate</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed">
              Minor Works Certificates are appropriate for small additions and modifications to existing electrical installations 
              where the work does not significantly alter the installation characteristics or require extensive design calculations.
            </p>
            <div className="bg-[#2a2a2a] border border-gray-600 rounded p-4">
              <Shield className="h-6 w-6 text-elec-yellow mb-3" />
              <p className="text-foreground text-sm">
                <strong className="text-foreground">Important:</strong> The person completing the MEIWC must be competent 
                in both installation and testing work, as they take responsibility for all aspects of the minor works.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Learning Objectives</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              By completing this section, you will develop the skills necessary to determine when minor works certification 
              is appropriate and how to complete it correctly. Each objective builds practical competency in minor works procedures.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {learningObjectives.map((objective, index) => (
                <div key={index} className="bg-[#2a2a2a] rounded-lg p-4 border-l-4 border-gray-500">
                  <div className="flex items-start gap-3">
                    <Target className="h-5 w-5 text-elec-yellow mt-0.5 flex-shrink-0" />
                    <p className="text-foreground text-sm">{objective}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Appropriate Minor Works Examples</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Understanding the scope and limitations of minor works is essential for correct certification. 
              Each example shows typical work that can be covered by MEIWC along with important limitations to consider.
            </p>
            <div className="space-y-3">
              {minorWorksTypes.map((item, index) => (
                <div key={index} className="bg-green-600/10 border border-green-600/20 rounded-lg p-4">
                  <h4 className="text-green-200 font-medium mb-2">{item.work}</h4>
                  <p className="text-foreground text-sm">{item.limitations}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Certificate Structure and Requirements</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              The Minor Works Certificate follows a logical structure designed to capture essential information 
              while maintaining proportionality for small-scale work. Each section serves a specific documentation purpose.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certificateRequirements.map((section, index) => (
                <div key={index} className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
                  <FileText className="h-6 w-6 text-blue-400 mb-3" />
                  <h4 className="text-blue-200 font-medium mb-3">{section.section}</h4>
                  <ul className="text-foreground text-sm space-y-1">
                    {section.requirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-blue-400 mt-1 flex-shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Required Testing for Minor Works</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Testing requirements for minor works are proportionate to the work undertaken. While not requiring 
              the full testing regime of an EIC, essential safety tests must be performed and documented.
            </p>
            <div className="space-y-3">
              {testingRequirements.map((test, index) => (
                <div key={index} className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-yellow-500 text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-yellow-200 font-medium mb-1">{test.test}</h4>
                      <p className="text-foreground text-sm mb-2">{test.requirement}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <p className="text-yellow-300"><strong>Method:</strong> {test.method}</p>
                        <p className="text-yellow-300"><strong>Limit:</strong> {test.limit}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Circuit Documentation Requirements</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <div className="bg-orange-600/10 border border-orange-600/20 rounded p-4">
              <Database className="h-6 w-6 text-orange-400 mb-3" />
              <h4 className="text-orange-200 font-medium mb-3">Essential Circuit Information</h4>
              <p className="text-foreground text-sm mb-4">
                Accurate circuit documentation ensures future maintenance and modification work can be planned 
                and executed safely. The following information must be recorded for each circuit affected by minor works.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-orange-300 font-medium mb-3">Circuit Identification</h5>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Circuit designation (e.g., RFC1, L1, etc.)</li>
                    <li>• Brief circuit description and purpose</li>
                    <li>• Distribution board identification</li>
                    <li>• Circuit protective device position</li>
                    <li>• Type of circuit (radial, ring, etc.)</li>
                    <li>• Areas served by the circuit</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-orange-300 font-medium mb-3">Technical Specifications</h5>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Conductor cross-sectional areas</li>
                    <li>• Protective device type and rating</li>
                    <li>• Cable type and installation method</li>
                    <li>• Circuit length and route details</li>
                    <li>• RCD protection type and rating</li>
                    <li>• Test results specific to the work</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Limitations and Restrictions</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Understanding the limitations of Minor Works Certificates is crucial for determining when more 
              comprehensive certification is required. Exceeding these limitations may invalidate the certification.
            </p>
            <div className="bg-red-600/10 border border-red-600/20 rounded p-4">
              <AlertTriangle className="h-6 w-6 text-red-400 mb-3" />
              <h4 className="text-red-200 font-medium mb-3">Work Requiring Full EIC</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {limitations.map((limitation, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <AlertTriangle className="h-4 w-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-foreground text-sm">{limitation}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Legal and Professional Obligations</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Minor Works Certificates carry the same legal weight as other electrical certificates. 
              The certifying person accepts full responsibility for the work documented.
            </p>
            <div className="space-y-4">
              <div className="bg-purple-600/10 border border-purple-600/20 rounded p-4">
                <Shield className="h-6 w-6 text-purple-400 mb-3" />
                <h4 className="text-purple-200 font-medium mb-3">Competency Requirements</h4>
                <ul className="text-foreground text-sm space-y-2">
                  <li>• Competent in installation techniques relevant to the work</li>
                  <li>• Competent in testing and inspection procedures</li>
                  <li>• Knowledge of relevant BS 7671 requirements</li>
                  <li>• Understanding of Building Regulations Part P</li>
                  <li>• Awareness of health and safety obligations</li>
                  <li>• Professional indemnity insurance coverage</li>
                </ul>
              </div>
              <div className="bg-cyan-600/10 border border-cyan-600/20 rounded p-4">
                <Timer className="h-6 w-6 text-cyan-400 mb-3" />
                <h4 className="text-cyan-200 font-medium mb-3">Record Keeping and Retention</h4>
                <p className="text-foreground text-sm mb-3">
                  Minor Works Certificates must be retained and made available for inspection:
                </p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Original copy provided to installation owner</li>
                  <li>• Copy retained by certifying person</li>
                  <li>• Available to subsequent electricians</li>
                  <li>• Accessible to building control authorities</li>
                  <li>• Required for insurance and legal purposes</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-2xl font-semibold text-foreground flex items-center gap-2">
            <Clipboard className="h-6 w-6 text-elec-yellow" />
            Summary
          </h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed">
              The Minor Works Certificate provides an efficient certification method for small-scale electrical work 
              while maintaining essential safety standards. Proper use of MEIWC ensures regulatory compliance and 
              professional protection for appropriate minor electrical installations.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="text-lg font-medium text-foreground mb-3">Key Principles</h4>
                <ul className="text-foreground text-sm space-y-2">
                  <li>• Use only for work within defined scope limitations</li>
                  <li>• Ensure competency in all aspects of the work</li>
                  <li>• Perform all required testing and documentation</li>
                  <li>• Verify existing installation condition and suitability</li>
                  <li>• Maintain clear records and provide appropriate certificates</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium text-foreground mb-3">Professional Standards</h4>
                <ul className="text-foreground text-sm space-y-2">
                  <li>• Complete documentation demonstrates thoroughness</li>
                  <li>• Testing results must meet BS 7671 requirements</li>
                  <li>• Professional judgment determines scope appropriateness</li>
                  <li>• Ongoing competency maintenance is essential</li>
                  <li>• Quality workmanship reflects professional standards</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-[#2a2a2a] border border-gray-600 rounded p-4 mt-6">
              <p className="text-foreground text-sm">
                <strong className="text-foreground">Next Steps:</strong> Practice determining minor works scope through 
                practical scenarios, complete sample certificates, and test knowledge with the comprehensive quiz. 
                Remember that minor works certification requires the same professional standards as any electrical certificate.
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default MinorWorksContent;