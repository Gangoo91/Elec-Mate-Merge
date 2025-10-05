import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpen, Scale, FileCheck } from "lucide-react";

const RegulationsTab = () => {
  return (
    <div className="space-y-8">
      {/* Introduction */}
      <Card className="border-elec-yellow/30 bg-gradient-to-br from-elec-yellow/5 to-transparent">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <Scale className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-2xl text-elec-yellow">Regulations and Standards</CardTitle>
          </div>
          <p className="text-foreground/90 leading-relaxed">
            Understanding and complying with electrical safety regulations and standards is essential for legal and safe electrical work in the UK.
          </p>
        </CardHeader>
      </Card>

      {/* Key Regulations */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <FileCheck className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-xl">Key UK Regulations</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            {[
              {
                title: "Electricity at Work Regulations 1989",
                scope: "Statutory Instrument",
                description: "The principal legislation covering electrical safety in the workplace. Places duties on employers and employees to ensure electrical systems are safe and maintained.",
                keyRequirements: [
                  "All electrical systems must be constructed and maintained to prevent danger",
                  "Only competent persons may work on electrical systems",
                  "Adequate precautions must be taken to prevent danger",
                  "Equipment must be suitable for its environment and use",
                  "Work activities must be planned to prevent danger"
                ]
              },
              {
                title: "BS 7671:2018 (18th Edition)",
                scope: "IET Wiring Regulations",
                description: "The national standard for electrical installation work in the UK. While not statutory law, compliance is considered best practice and often required for insurance and certification.",
                keyRequirements: [
                  "Fundamental principles for safety of electrical installations",
                  "Protection against electric shock and thermal effects",
                  "Design, erection, and verification requirements",
                  "Special installations and locations guidance",
                  "Regular inspection and testing schedules"
                ]
              },
              {
                title: "Building Regulations Part P",
                scope: "England and Wales",
                description: "Covers electrical safety in dwellings, requiring certain electrical work to be carried out by competent persons and notified to building control.",
                keyRequirements: [
                  "Notification requirements for electrical work in dwellings",
                  "Competent person scheme compliance",
                  "Installation certificates and documentation",
                  "Special location work requirements",
                  "Consumer unit replacement regulations"
                ]
              },
              {
                title: "Health and Safety at Work Act 1974",
                scope: "General Health & Safety",
                description: "The primary piece of legislation covering occupational health and safety. Requires employers to ensure the health, safety, and welfare of employees and others affected by their work.",
                keyRequirements: [
                  "Risk assessment and safe systems of work",
                  "Provision of information, instruction, and training",
                  "Safe equipment and working environment",
                  "Reporting of accidents and dangerous occurrences",
                  "Consultation with employees on safety matters"
                ]
              }
            ].map((regulation, index) => (
              <div key={index} className="p-6 rounded-lg border border-elec-yellow/20 bg-elec-yellow/5 space-y-4">
                <div>
                  <div className="flex items-start justify-between mb-2">
                    <h4 className="font-bold text-elec-yellow text-lg">{regulation.title}</h4>
                    <span className="text-xs px-3 py-1 rounded-full bg-elec-yellow/20 text-elec-yellow">
                      {regulation.scope}
                    </span>
                  </div>
                  <p className="text-foreground/90 text-sm leading-relaxed mb-4">
                    {regulation.description}
                  </p>
                </div>
                
                <div>
                  <h5 className="font-semibold text-foreground mb-3">Key Requirements:</h5>
                  <ul className="space-y-2">
                    {regulation.keyRequirements.map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                        <span className="text-foreground/80 text-sm">{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Guidance Documents */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <div className="flex items-center gap-3">
            <BookOpen className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-xl">Important Guidance Documents</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                title: "HSE Guidance HSR25",
                desc: "Memorandum of guidance on the Electricity at Work Regulations 1989"
              },
              {
                title: "IET Guidance Notes",
                desc: "Supporting guidance for BS 7671 compliance (Guidance Notes 1-8)"
              },
              {
                title: "BS 7909",
                desc: "Code of practice for temporary electrical systems for entertainment and related purposes"
              },
              {
                title: "GS 38",
                desc: "Electrical test equipment for use by electricians"
              },
              {
                title: "IET Code of Practice",
                desc: "For In-Service Inspection and Testing of Electrical Equipment"
              },
              {
                title: "NICEIC Technical Manuals",
                desc: "Industry guidance on installation practices and compliance"
              }
            ].map((doc, index) => (
              <div key={index} className="p-4 rounded-lg border border-elec-yellow/20 bg-elec-yellow/5">
                <h5 className="font-semibold text-foreground mb-2">{doc.title}</h5>
                <p className="text-foreground/70 text-sm">{doc.desc}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Compliance Requirements */}
      <Card className="border-elec-yellow/20 bg-elec-card">
        <CardHeader>
          <CardTitle className="text-xl">Practical Compliance Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h4 className="font-semibold text-elec-yellow mb-4">Documentation Required</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {[
                "Electrical Installation Certificates",
                "Minor Electrical Installation Works Certificates",
                "Periodic Inspection Reports",
                "Risk Assessments and Method Statements",
                "Test Results and Measurements",
                "Competent Person Scheme Membership",
                "Equipment Calibration Certificates",
                "Training and Competency Records"
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-elec-yellow/20 bg-elec-yellow/5">
                  <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                  <span className="text-foreground/90 text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-elec-yellow mb-4">Competent Person Schemes</h4>
            <p className="text-foreground/80 text-sm mb-4 leading-relaxed">
              Registration with a competent person scheme allows electrical contractors to self-certify certain types of work without building control notification:
            </p>
            <div className="space-y-2">
              {[
                "NICEIC (National Inspection Council for Electrical Installation Contracting)",
                "NAPIT (National Association of Professional Inspectors and Testers)",
                "ELECSA (Electrical Safety Certification)",
                "Stroma Certification",
                "BSI Certification"
              ].map((scheme, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border border-elec-yellow/20 bg-elec-yellow/5">
                  <div className="w-2 h-2 rounded-full bg-elec-yellow mt-2 flex-shrink-0" />
                  <span className="text-foreground/90 text-sm">{scheme}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RegulationsTab;
