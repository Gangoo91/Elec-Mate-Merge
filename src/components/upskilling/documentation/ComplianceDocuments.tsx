
import { Shield } from 'lucide-react';

export const ComplianceDocuments = () => {
  const complianceAreas = [
    {
      standard: "BS 7671 (IET Wiring Regulations)",
      requirements: [
        "Circuit design and protection compliance",
        "Special location requirements (Part 7)",
        "Selection and erection of wiring systems",
        "Earthing and protective conductor arrangements",
        "Inspection and testing procedures",
        "Certification and documentation requirements"
      ]
    },
    {
      standard: "Building Regulations Part P",
      requirements: [
        "Notification requirements for electrical work",
        "Competent person scheme compliance",
        "Building control approval documentation",
        "Completion certificates and notifications",
        "Design and installation standards",
        "Safety and performance requirements"
      ]
    },
    {
      standard: "CDM Regulations 2015",
      requirements: [
        "Health and safety plan documentation",
        "Risk assessment and method statements",
        "Competency records for personnel",
        "Construction phase safety measures",
        "Information for future maintenance",
        "Principal contractor responsibilities"
      ]
    },
    {
      standard: "Electricity at Work Regulations 1989",
      requirements: [
        "System safety and maintenance procedures",
        "Competency requirements for electrical work",
        "Isolation and working procedures",
        "Equipment suitability for environment",
        "Preventive maintenance programmes",
        "Incident reporting and investigation"
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <Shield className="h-4 w-4" />
        Regulatory Compliance Documentation
      </h3>
      <p className="text-foreground mb-4 text-base sm:text-lg leading-relaxed">
        Visual inspection must verify compliance with multiple regulatory frameworks:
      </p>
      <div className="space-y-6">
        {complianceAreas.map((area, index) => (
          <div key={index} className="bg-[#323232] rounded-lg p-5 border-l-4 border-elec-yellow/30">
            <h4 className="font-semibold text-foreground mb-3 text-base sm:text-lg">{area.standard}</h4>
            <ul className="space-y-3">
              {area.requirements.map((requirement, reqIndex) => (
                <li key={reqIndex} className="text-foreground flex items-start gap-2 text-sm sm:text-base leading-relaxed">
                  <span className="text-elec-yellow mt-1">•</span>
                  {requirement}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4">
        <p className="text-purple-200 font-medium">
          <strong>Legal Note:</strong> Failure to maintain proper compliance documentation can result in enforcement action, invalidate insurance claims, and create legal liability for duty holders.
        </p>
      </div>
    </div>
  );
};
