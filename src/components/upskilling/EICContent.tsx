import { Book, CheckCircle, FileText, AlertTriangle, Shield, Info, Target, Settings, Cable, Zap, Users, Calculator, Clipboard, Timer, Database } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const EICContent = () => {
  const introductionContent = {
    overview: "The Electrical Installation Certificate (EIC) is the cornerstone document for demonstrating compliance with BS 7671 for new electrical installations and major alterations. This comprehensive certificate serves as both a design record and verification document, providing essential information for the safe operation and future maintenance of electrical installations.",
    importance: "Understanding when and how to complete an EIC correctly is fundamental to electrical installation work. The certificate not only demonstrates legal compliance but also protects both the installer and the client by providing documented evidence of proper design, installation, and testing procedures.",
    scope: "This section covers the complete EIC process from initial design considerations through to final certification, including practical completion techniques, common pitfalls to avoid, and the legal implications of certification."
  };

  const learningObjectives = [
    "Understand when EIC is required vs other certificate types",
    "Complete all sections of EIC accurately and comprehensively", 
    "Perform and record all required tests according to BS 7671",
    "Identify and document design criteria and calculations",
    "Understand responsibilities of designer, installer, and tester",
    "Ensure compliance with Building Regulations Part P requirements",
    "Assess maximum demand and apply diversity factors correctly",
    "Document earthing and bonding arrangements comprehensively",
    "Complete circuit schedules with accurate technical data",
    "Understand legal implications and retention requirements"
  ];

  const eicRequirements = [
    { work: "Complete new electrical installation", certificate: "EIC", reason: "New installation requiring full design verification and comprehensive testing" },
    { work: "New consumer unit installation", certificate: "EIC", reason: "Major alteration affecting entire installation requiring design assessment" },
    { work: "Addition of new circuits", certificate: "EIC", reason: "Significant alteration requiring design calculations and full testing regime" },
    { work: "Complete house rewire", certificate: "EIC", reason: "New installation replacing existing system with full design responsibility" },
    { work: "Extension with new circuits", certificate: "EIC", reason: "New circuits requiring design calculations and protective device coordination" },
    { work: "Commercial fit-out installation", certificate: "EIC", reason: "New installation with complex load calculations and special requirements" },
    { work: "Three-phase installation", certificate: "EIC", reason: "Complex installation requiring phase sequence verification and load balancing" },
    { work: "Installation with special locations", certificate: "EIC", reason: "Design must consider enhanced protection requirements per BS 7671 Part 7" }
  ];

  const designResponsibilities = [
    { role: "Designer", responsibilities: ["Load calculations and diversity assessment", "Cable sizing and protection coordination", "Earthing system design", "Compliance with BS 7671 and other standards"] },
    { role: "Installer", responsibilities: ["Installation according to design specifications", "Material selection and workmanship", "Initial verification testing", "Health and safety during installation"] },
    { role: "Inspector/Tester", responsibilities: ["Independent verification of installation", "Comprehensive testing regime", "Assessment of compliance", "Identification of defects and omissions"] }
  ];

  const testingSequence = [
    { order: 1, test: "Continuity of protective conductors", requirement: "All protective conductors verified continuous", standard: "≤ (R1 + R2) values" },
    { order: 2, test: "Continuity of ring final circuits", requirement: "Ring continuity and correct connections", standard: "R1, R2, and r1+r2 measured" },
    { order: 3, test: "Insulation resistance", requirement: "Between live conductors and earth", standard: "≥1MΩ at 500V DC" },
    { order: 4, test: "Protection by SELV/PELV/electrical separation", requirement: "Where applicable", standard: "Per BS 7671 requirements" },
    { order: 5, test: "Protection by automatic disconnection", requirement: "Zs measurements at all points", standard: "≤ maximum Zs values" },
    { order: 6, test: "Additional protection (RCD)", requirement: "RCD operation and effectiveness", standard: "≤30mA, ≤40ms at 5×IΔn" },
    { order: 7, test: "Polarity", requirement: "All connections correct polarity", standard: "Single pole devices in line conductors" },
    { order: 8, test: "Phase sequence", requirement: "Three-phase installations only", standard: "Correct phase rotation verified" },
    { order: 9, test: "Functional testing", requirement: "All protective devices and controls", standard: "Operate as designed" }
  ];

  return (
    <Card className="bg-elec-gray border-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          <Book className="h-5 w-5 text-elec-yellow" />
          Core Content
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        
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
          <h3 className="text-xl font-semibold text-foreground">When to Issue an EIC</h3>
          <div className="bg-[#323232] rounded-lg p-4 space-y-3">
            <p className="text-foreground leading-relaxed">
              An Electrical Installation Certificate must be issued for all new electrical installations 
              and major alterations. This includes complete rewiring, new consumer units, and addition of new circuits.
            </p>
            <div className="flex items-start gap-3 bg-green-600/10 border border-green-600/20 rounded p-3">
              <Shield className="h-5 w-5 text-green-400 mt-0.5 flex-shrink-0" />
              <p className="text-foreground text-sm">
                <strong>Remember:</strong> EIC requires designer, installer, and tester signatures, 
                each accepting responsibility for their role.
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Learning Objectives</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              By the end of this section, you will have developed comprehensive skills in EIC completion and understand 
              the critical importance of accurate certification. Each objective builds upon previous knowledge to create 
              a complete understanding of the certification process.
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
          <h3 className="text-xl font-semibold text-foreground">EIC Requirements by Work Type</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Understanding when an EIC is required versus other certificate types is crucial for compliance. 
              The following scenarios require EIC completion, each with specific technical and legal considerations 
              that must be addressed during the certification process.
            </p>
            <div className="space-y-3">
              {eicRequirements.map((item, index) => (
                <div key={index} className="bg-[#2a2a2a] border border-gray-600 rounded-lg p-4">
                  <h4 className="text-foreground font-medium mb-2">{item.work}</h4>
                  <p className="text-foreground text-sm">{item.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Essential EIC Sections</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              The EIC is structured into distinct sections, each serving a specific purpose in documenting the installation. 
              Understanding these sections and their requirements ensures comprehensive and compliant certification.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-[#2a2a2a] border border-gray-600 rounded-lg p-4">
                <FileText className="h-6 w-6 text-elec-yellow mb-3" />
                <h4 className="text-foreground font-medium mb-2">Installation Details</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Address and description</li>
                  <li>• Supply characteristics</li>
                  <li>• Earthing arrangements</li>
                  <li>• Protective bonding</li>
                  <li>• DNO details and cut-out fuse</li>
                  <li>• Installation extent and scope</li>
                </ul>
              </div>
              <div className="bg-[#2a2a2a] border border-gray-600 rounded-lg p-4">
                <Settings className="h-6 w-6 text-elec-yellow mb-3" />
                <h4 className="text-foreground font-medium mb-2">Design Information</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Maximum demand calculations</li>
                  <li>• Cable sizing and volt drop</li>
                  <li>• Protection coordination</li>
                  <li>• Special locations requirements</li>
                  <li>• Diversity factors applied</li>
                  <li>• Design standards compliance</li>
                </ul>
              </div>
              <div className="bg-[#2a2a2a] border border-gray-600 rounded-lg p-4">
                <Zap className="h-6 w-6 text-elec-yellow mb-3" />
                <h4 className="text-foreground font-medium mb-2">Test Results</h4>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Continuity of all conductors</li>
                  <li>• Insulation resistance testing</li>
                  <li>• RCD operation verification</li>
                  <li>• Polarity and phase sequence</li>
                  <li>• Earth fault loop impedance</li>
                  <li>• Functional testing results</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Detailed EIC Completion Process</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-6">
            <p className="text-foreground leading-relaxed">
              Completing an EIC requires systematic approach and attention to detail. Each section must be completed 
              accurately with supporting documentation and calculations where required.
            </p>
            
            <div className="space-y-4">
              <h4 className="text-lg font-medium text-foreground">Step-by-Step Completion Guide</h4>
              <div className="space-y-3">
                <div className="bg-[#2a2a2a] border border-gray-600 rounded-lg p-4">
                  <h5 className="text-foreground font-medium mb-2">1. Installation Description and Scope</h5>
                  <p className="text-foreground text-sm mb-2">
                    Clearly define the installation work covered by the certificate, including any limitations or exclusions.
                  </p>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Specify exact address and installation location</li>
                    <li>• Detail the type and extent of electrical work</li>
                    <li>• Note any existing installation retained</li>
                    <li>• Record any special conditions or requirements</li>
                  </ul>
                </div>
                
                <div className="bg-[#2a2a2a] border border-gray-600 rounded-lg p-4">
                  <h5 className="text-foreground font-medium mb-2">2. Supply System and Earthing Details</h5>
                  <p className="text-foreground text-sm mb-2">
                    Document the supply characteristics and earthing arrangements that influence the installation design.
                  </p>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Supply voltage, frequency, and phase arrangement</li>
                    <li>• Type of earthing system (TN-S, TN-C-S, TT, IT)</li>
                    <li>• External earth fault loop impedance (Ze)</li>
                    <li>• Prospective fault current at origin</li>
                    <li>• Alternative supply arrangements if applicable</li>
                  </ul>
                </div>
                
                <div className="bg-[#2a2a2a] border border-gray-600 rounded-lg p-4">
                  <h5 className="text-foreground font-medium mb-2">3. Design Calculations and Assessments</h5>
                  <p className="text-foreground text-sm mb-2">
                    Provide comprehensive design information demonstrating compliance with BS 7671 requirements.
                  </p>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Maximum demand assessment with diversity applied</li>
                    <li>• Cable sizing calculations for all circuits</li>
                    <li>• Voltage drop calculations under normal conditions</li>
                    <li>• Discrimination and protection coordination</li>
                    <li>• Special location requirements compliance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Roles and Responsibilities</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              The EIC requires three distinct signatures, each representing specific professional responsibilities. 
              Understanding these roles ensures appropriate accountability and competence verification.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {designResponsibilities.map((role, index) => (
                <div key={index} className="bg-[#2a2a2a] border border-gray-600 rounded-lg p-4">
                  <Users className="h-6 w-6 text-elec-yellow mb-3" />
                  <h4 className="text-foreground font-medium mb-3">{role.role}</h4>
                  <ul className="text-foreground text-sm space-y-2">
                    {role.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle className="h-3 w-3 text-elec-yellow mt-1 flex-shrink-0" />
                        <span>{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Testing Sequence and Standards</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              Testing must be carried out in the correct sequence according to BS 7671 Part 6. 
              Each test verifies specific safety parameters and must meet prescribed standards.
              The sequence is designed to ensure safety and prevent damage to equipment.
            </p>
            <div className="space-y-3">
              {testingSequence.map((test, index) => (
                <div key={index} className="bg-[#2a2a2a] border border-gray-600 rounded-lg p-4">
                  <div className="flex items-start gap-4">
                    <span className="w-8 h-8 bg-elec-yellow text-black rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {test.order}
                    </span>
                    <div className="flex-1">
                      <h4 className="text-foreground font-medium mb-1">{test.test}</h4>
                      <p className="text-foreground text-sm mb-2">{test.requirement}</p>
                      <p className="text-foreground text-xs font-medium">Standard: {test.standard}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Maximum Demand Assessment</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <div className="bg-[#2a2a2a] border border-gray-600 rounded p-4">
              <Calculator className="h-6 w-6 text-elec-yellow mb-3" />
              <h4 className="text-foreground font-medium mb-3">Calculation Process</h4>
              <p className="text-foreground text-sm mb-4">
                Maximum demand assessment is critical for ensuring adequate supply capacity and protection coordination. 
                This calculation must consider actual usage patterns, not just connected load totals.
              </p>
              <div className="space-y-3">
                <div>
                  <h5 className="text-foreground font-medium mb-2">Calculation Steps</h5>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Calculate total connected load by circuit type</li>
                    <li>• Apply appropriate diversity factors per BS 7671 Appendix 1</li>
                    <li>• Consider simultaneous operation likelihood</li>
                    <li>• Account for future expansion requirements</li>
                    <li>• Verify against supply capacity and protection settings</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-foreground font-medium mb-2">Documentation Requirements</h5>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Show all calculation steps and assumptions</li>
                    <li>• Record diversity factors applied and justification</li>
                    <li>• Include load schedules for complex installations</li>
                    <li>• Document any special considerations or constraints</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Circuit Schedule Requirements</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <div className="bg-[#2a2a2a] border border-gray-600 rounded p-4">
              <Database className="h-6 w-6 text-elec-yellow mb-3" />
              <h4 className="text-foreground font-medium mb-3">Essential Information</h4>
              <p className="text-foreground text-sm mb-4">
                The circuit schedule provides a comprehensive record of all circuits within the installation. 
                This information is essential for future maintenance, modification, and fault-finding activities.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h5 className="text-foreground font-medium mb-3">Circuit Details</h5>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Circuit designation and description</li>
                    <li>• Type of wiring system used</li>
                    <li>• Installation method reference</li>
                    <li>• Cable construction and insulation type</li>
                    <li>• Circuit length and route description</li>
                    <li>• Number of points served</li>
                  </ul>
                </div>
                <div>
                  <h5 className="text-foreground font-medium mb-3">Protection & Load</h5>
                  <ul className="text-foreground text-sm space-y-1">
                    <li>• Conductor cross-sectional area (line and cpc)</li>
                    <li>• Overcurrent protective device type and rating</li>
                    <li>• Device characteristics (B, C, D type curves)</li>
                    <li>• Design current and maximum demand</li>
                    <li>• RCD protection type and rating</li>
                    <li>• Test results for the circuit</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-foreground">Legal and Regulatory Compliance</h3>
          <div className="bg-[#323232] rounded-lg p-6 space-y-4">
            <p className="text-foreground leading-relaxed mb-4">
              EIC completion carries significant legal obligations and must comply with multiple regulatory frameworks. 
              Understanding these requirements protects both the certifier and the installation user.
            </p>
            <div className="space-y-4">
              <div className="bg-[#2a2a2a] border border-gray-600 rounded p-4">
                <Shield className="h-6 w-6 text-elec-yellow mb-3" />
                <h4 className="text-foreground font-medium mb-3">Statutory Requirements</h4>
                <ul className="text-foreground text-sm space-y-2">
                  <li>• Compliance with BS 7671 (IET Wiring Regulations)</li>
                  <li>• Building Regulations Part P notification where required</li>
                  <li>• Electrical Safety, Quality and Continuity Regulations</li>
                  <li>• Construction (Design and Management) Regulations</li>
                  <li>• Health and Safety at Work Act obligations</li>
                  <li>• Data Protection Act for client information handling</li>
                </ul>
              </div>
              <div className="bg-[#2a2a2a] border border-gray-600 rounded p-4">
                <Timer className="h-6 w-6 text-elec-yellow mb-3" />
                <h4 className="text-foreground font-medium mb-3">Retention and Access Requirements</h4>
                <p className="text-foreground text-sm mb-3">
                  EICs must be retained for the life of the installation and made available to authorised persons when required.
                </p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Installation owners and responsible persons</li>
                  <li>• Subsequent contractors and inspectors</li>
                  <li>• Building control and enforcement authorities</li>
                  <li>• Insurance companies and legal representatives</li>
                  <li>• Emergency services if required for safety reasons</li>
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
              The Electrical Installation Certificate represents the culmination of professional electrical work, 
              combining design expertise, skilled installation, and comprehensive verification. Mastery of EIC 
              completion ensures regulatory compliance, professional protection, and most importantly, electrical safety.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div>
                <h4 className="text-lg font-medium text-foreground mb-3">Key Takeaways</h4>
                <ul className="text-foreground text-sm space-y-2">
                  <li>• EIC is mandatory for all new installations and major alterations</li>
                  <li>• Three distinct professional roles must be identified and signed</li>
                  <li>• Testing sequence must follow BS 7671 Part 6 requirements</li>
                  <li>• Design calculations must be documented and retained</li>
                  <li>• Legal obligations extend beyond initial certification</li>
                </ul>
              </div>
              <div>
                <h4 className="text-lg font-medium text-foreground mb-3">Professional Standards</h4>
                <ul className="text-foreground text-sm space-y-2">
                  <li>• Accuracy and completeness are non-negotiable</li>
                  <li>• Documentation must support all entries made</li>
                  <li>• Competence must be demonstrated in each role</li>
                  <li>• Regular updates with regulation changes essential</li>
                  <li>• Professional development maintains certification quality</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-[#2a2a2a] border border-gray-600 rounded p-4 mt-6">
              <p className="text-foreground text-sm">
                <strong className="text-foreground">Next Steps:</strong> Apply this knowledge through practical exercises, 
                review common certification scenarios, and test understanding with the comprehensive quiz. 
                Remember that EIC completion is both a technical skill and a professional responsibility.
              </p>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  );
};

export default EICContent;