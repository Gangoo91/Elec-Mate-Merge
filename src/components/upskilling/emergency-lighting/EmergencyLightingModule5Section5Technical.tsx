import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BookOpen, CheckCircle, FileText, Shield, AlertTriangle, Info } from 'lucide-react';
import { CertificationPurposeQuickCheck } from './CertificationPurposeQuickCheck';
import { CertificateTypesQuickCheck } from './CertificateTypesQuickCheck';
import { CommissioningChecklistQuickCheck } from './CommissioningChecklistQuickCheck';
import { SignOffQuickCheck } from './SignOffQuickCheck';

export const EmergencyLightingModule5Section5Technical = () => {
  return (
    <Card className="bg-elec-gray border-gray-700">
      <CardHeader>
        <CardTitle className="text-foreground flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-elec-yellow" />
          Content / Learning
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        
        {/* Section 1: Purpose of Certification */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold flex-shrink-0">
              1
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground">Purpose of Certification</h3>
          </div>

          <div className="ml-0 sm:ml-11 space-y-4">
            <div className="bg-green-500/10 border-l-4 border-green-500 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-green-400 mb-2">Certification Confirms</h4>
                  <p className="text-foreground text-sm">
                    Formal certification provides legal proof that the emergency lighting system meets all regulatory requirements.
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-lg p-4 space-y-3">
              <p className="text-foreground text-sm sm:text-base lg:text-lg font-semibold">
                Certification formally confirms that:
              </p>
              <div className="space-y-2">
                {[
                  "The system design complies with BS 5266 and BS 7671",
                  "The installation was completed to specification",
                  "Functional and duration tests have been successfully carried out",
                  "All defects identified during inspection have been rectified",
                  "A logbook, drawings, and maintenance plan have been issued to the client"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <span className="text-foreground text-sm sm:text-base lg:text-lg">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-amber-500/10 border-l-4 border-amber-500 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-400 mb-2">Why Certification Matters Beyond Testing</h4>
                  <p className="text-foreground text-sm">
                    Testing proves the system works at a specific moment. Certification provides legal documentation 
                    that the system was designed, installed, and verified to recognised standards — essential for 
                    insurance claims, fire authority inspections, and professional liability protection.
                  </p>
                </div>
              </div>
            </div>

            <CertificationPurposeQuickCheck />
          </div>
        </div>

        {/* Section 2: Types of Certificates */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold flex-shrink-0">
              2
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground">Types of Certificates</h3>
          </div>

          <div className="ml-0 sm:ml-11 space-y-4">
            <div className="bg-blue-500/10 border-l-4 border-blue-500 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <FileText className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-400 mb-2">Required Documentation Package</h4>
                  <p className="text-foreground text-sm">
                    Multiple certificates are required to demonstrate full compliance across design, installation, and commissioning phases.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-foreground text-sm sm:text-base lg:text-lg">
              The following documentation must be prepared and retained:
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Emergency Lighting Completion Certificate",
                  standard: "BS 5266-1, Annex G",
                  description: "Confirms installation and testing compliance"
                },
                {
                  title: "Electrical Installation Certificate",
                  standard: "BS 7671",
                  description: "Covers wiring and circuit integrity"
                },
                {
                  title: "Design Declaration Certificate",
                  standard: "BS 5266-1",
                  description: "Confirms that design meets lighting levels, coverage, and risk-based requirements"
                },
                {
                  title: "Commissioning Certificate",
                  standard: "BS 5266-1 / BS EN 50172",
                  description: "Verifies the system's operational performance after installation"
                },
                {
                  title: "Minor Works Certificate",
                  standard: "BS 7671",
                  description: "For small modifications, repairs, or additions to existing systems"
                }
              ].map((cert, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-2">
                    <div className="w-7 h-7 rounded-full bg-purple-500 text-foreground flex items-center justify-center font-bold flex-shrink-0 text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm sm:text-base lg:text-lg">{cert.title}</h4>
                      <div className="inline-block bg-purple-500/20 text-purple-300 px-2 py-1 rounded text-xs mt-1">
                        {cert.standard}
                      </div>
                    </div>
                  </div>
                  <p className="text-foreground text-sm ml-0 sm:ml-10">{cert.description}</p>
                </div>
              ))}
            </div>

            <div className="bg-blue-500/10 border-l-4 border-blue-500 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Info className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-blue-400 mb-2">Certificate Hierarchy and Dependencies</h4>
                  <p className="text-foreground text-sm">
                    The Electrical Installation Certificate must be issued before the Emergency Lighting Completion 
                    Certificate, as electrical safety is a prerequisite. The Commissioning Certificate is the final 
                    document, confirming all previous work has been verified and the system is operational.
                  </p>
                </div>
              </div>
            </div>

            <CertificateTypesQuickCheck />
          </div>
        </div>

        {/* Section 3: Commissioning Checklist Requirements */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold flex-shrink-0">
              3
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground">Commissioning Checklist Requirements</h3>
          </div>

          <div className="ml-0 sm:ml-11 space-y-4">
            <div className="bg-purple-500/10 border-l-4 border-purple-500 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <CheckCircle className="h-5 w-5 text-purple-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-purple-400 mb-2">Checklist Structure</h4>
                  <p className="text-foreground text-sm">
                    A commissioning checklist provides a structured record that every aspect of the system has been verified.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-foreground text-sm sm:text-base lg:text-lg">
              It should include confirmation of:
            </p>

            <div className="space-y-4">
              {[
                {
                  title: "Luminaire Verification",
                  items: ["Correct luminaire types, positions, and orientations", "Mounting heights comply with design", "All fittings securely fixed and accessible"]
                },
                {
                  title: "Battery & Autonomy Testing",
                  items: ["Battery capacity verified (3-hour test)", "All luminaires remain lit for full duration", "Charging circuits operational"]
                },
                {
                  title: "Exit Sign Compliance",
                  items: ["All exit signs conform to ISO 7010", "Directional arrows correctly positioned", "Illumination levels meet BS 5266-1"]
                },
                {
                  title: "System Labelling & Segregation",
                  items: ["Containment labelled and segregated from other circuits", "Distribution boards clearly marked", "Emergency lighting circuits identifiable"]
                },
                {
                  title: "Documentation Package",
                  items: ["Drawings, logbook, and test results completed", "Certificates prepared and signed", "Maintenance schedule provided to client"]
                },
                {
                  title: "Professional Sign-Off",
                  items: ["Installer, designer, and verifier signatures confirmed", "All outstanding defects resolved", "Client handover meeting scheduled"]
                }
              ].map((section, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-6 h-6 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold flex-shrink-0 text-xs">
                      {idx + 1}
                    </div>
                    <h4 className="font-semibold text-foreground text-sm sm:text-base lg:text-lg">{section.title}</h4>
                  </div>
                  <div className="ml-0 sm:ml-9 space-y-2">
                    {section.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow mt-2 flex-shrink-0"></div>
                        <span className="text-foreground text-sm">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gray-800 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-3">Example Checklist Format:</h4>
              <div className="bg-elec-dark rounded-lg p-3 font-mono text-xs sm:text-sm overflow-x-auto">
                <pre className="text-foreground whitespace-pre">
{`┌────────────────────────────────────────────────┬──────┬─────────┐
│ Item                                           │ Pass │ Comment │
├────────────────────────────────────────────────┼──────┼─────────┤
│ All luminaires installed per drawing          │  ✓   │         │
│ 3-hour duration test completed                │  ✓   │         │
│ Exit signs comply with ISO 7010               │  ✓   │         │
│ Circuits segregated and labelled              │  ✓   │         │
│ Documentation package complete                │  ✓   │         │
│ Professional sign-off obtained                │  ✓   │         │
└────────────────────────────────────────────────┴──────┴─────────┘`}
                </pre>
              </div>
            </div>

            <div className="bg-amber-500/10 border-l-4 border-amber-500 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-amber-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-amber-400 mb-2">Digital vs. Paper Checklists</h4>
                  <p className="text-foreground text-sm">
                    Many contractors now use digital checklists on tablets with photo evidence and GPS tagging. 
                    However, paper checklists remain legally acceptable. Whichever format you use, ensure it's 
                    signed, dated, and retained for the life of the installation.
                  </p>
                </div>
              </div>
            </div>

            <CommissioningChecklistQuickCheck />
          </div>
        </div>

        {/* Section 4: Sign-Off and Accountability */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-elec-yellow text-elec-dark flex items-center justify-center font-bold flex-shrink-0">
              4
            </div>
            <h3 className="text-xl sm:text-2xl font-semibold text-foreground">Sign-Off and Accountability</h3>
          </div>

          <div className="ml-0 sm:ml-11 space-y-4">
            <div className="bg-red-500/10 border-l-4 border-red-500 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <Shield className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Legal Accountability Framework</h4>
                  <p className="text-foreground text-sm">
                    Certification and checklists must be signed by qualified professionals to establish clear 
                    accountability at every stage of the project.
                  </p>
                </div>
              </div>
            </div>

            <p className="text-foreground text-sm sm:text-base lg:text-lg">
              Certification and checklists must be signed by:
            </p>

            <div className="space-y-4">
              {[
                {
                  role: "Designer",
                  responsibility: "Confirms design meets required standards",
                  details: "The designer certifies that the emergency lighting design complies with BS 5266-1, including lux levels, spacing ratios, coverage of escape routes, and risk assessment requirements. They confirm calculations, luminaire specifications, and circuit layouts are correct."
                },
                {
                  role: "Installer",
                  responsibility: "Confirms installation follows design and regulations",
                  details: "The installing electrician certifies that all work was carried out in accordance with BS 7671, the approved design drawings, and manufacturer instructions. They confirm cable selection, containment, terminations, and earthing are correct."
                },
                {
                  role: "Verifier / Commissioning Engineer",
                  responsibility: "Confirms system performance and functionality",
                  details: "The commissioning engineer verifies that all tests have been completed successfully, the system operates as intended, and all documentation is accurate. They provide independent confirmation that the installation is ready for handover."
                }
              ].map((signatory, idx) => (
                <div key={idx} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-7 h-7 rounded-full bg-red-500 text-foreground flex items-center justify-center font-bold flex-shrink-0 text-sm">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground text-sm sm:text-base lg:text-lg">{signatory.role}</h4>
                      <p className="text-gray-300 text-sm mt-1">{signatory.responsibility}</p>
                    </div>
                  </div>
                  <p className="text-foreground text-sm ml-0 sm:ml-10">{signatory.details}</p>
                </div>
              ))}
            </div>

            <p className="text-foreground text-sm sm:text-base lg:text-lg">
              This ensures clear accountability at every stage of the project.
            </p>

            <div className="bg-red-500/10 border-l-4 border-red-500 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-semibold text-red-400 mb-2">Professional Liability and Insurance Implications</h4>
                  <p className="text-foreground text-sm">
                    Your signature on certification documents creates a legal record of professional responsibility. 
                    Never sign certificates for work you haven't personally verified. Ensure your professional indemnity 
                    insurance covers certification activities, and retain copies of all signed documents for at least 
                    six years to protect against future claims.
                  </p>
                </div>
              </div>
            </div>

            <SignOffQuickCheck />
          </div>
        </div>

      </CardContent>
    </Card>
  );
};
