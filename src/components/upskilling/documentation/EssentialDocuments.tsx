
import { Folder } from 'lucide-react';

export const EssentialDocuments = () => {
  const essentialDocs = [
    {
      category: "Design & Installation Documents",
      items: [
        "Electrical installation drawings and schematics",
        "Circuit schedules and distribution board layouts",
        "Cable routing and containment drawings",
        "Earthing and bonding arrangements",
        "Special location requirements and layouts",
        "Load calculations and diversity factors"
      ]
    },
    {
      category: "Specification Documents",
      items: [
        "Technical specifications for equipment and materials",
        "Environmental conditions and IP requirements",
        "Performance requirements and operating parameters",
        "Manufacturer's installation instructions",
        "Product compliance certificates and declarations",
        "Safety and operational procedures"
      ]
    },
    {
      category: "Regulatory & Compliance",
      items: [
        "Building control notifications and approvals",
        "Planning permission and consent documents",
        "Health and safety risk assessments",
        "Method statements and safe systems of work",
        "CDM compliance documentation",
        "Environmental impact assessments"
      ]
    },
    {
      category: "Previous Inspection Records",
      items: [
        "Previous electrical installation certificates",
        "Electrical installation condition reports (EICRs)",
        "Minor works certificates",
        "Periodic inspection schedules",
        "Fault repair records and modifications",
        "Maintenance and testing logs"
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <Folder className="h-4 w-4" />
        Essential Documentation Categories
      </h3>
      <p className="text-foreground mb-4 text-base sm:text-lg leading-relaxed">
        Before conducting visual inspection, ensure you have access to these critical document categories:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {essentialDocs.map((category, index) => (
          <div key={index} className="bg-[#323232] rounded-lg p-5">
            <h4 className="font-semibold text-foreground mb-3 border-b border-gray-600 pb-2 text-base sm:text-lg">
              {category.category}
            </h4>
            <ul className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-foreground flex items-start gap-2 text-sm sm:text-base leading-relaxed">
                  <span className="text-elec-yellow mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 mt-6">
        <p className="text-red-200 font-medium">
          <strong>Critical Requirement:</strong> BS 7671 Regulation 514.9.1 requires that diagrams, charts, or tables be provided to show the type and composition of circuits, including points of utilisation, protective devices, and their characteristics.
        </p>
      </div>
    </div>
  );
};
