
import { FileText } from 'lucide-react';

export const VisualInspectionRegulatory = () => {
  const regulatoryItems = [
    "BS 7671 requires visual inspection before testing (Regulation 643.1)",
    "GS 38 guidance applies to visual inspection procedures", 
    "Electricity at Work Regulations 1989 mandate competent inspection",
    "Building Regulations Part P covers notification requirements",
    "IET Guidance Note 3 provides detailed inspection procedures",
    "CDM Regulations 2015 require safe systems of work",
    "Health and Safety at Work Act 1974 places duties on employers"
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <FileText className="h-4 w-4" />
        Regulatory Framework & Legal Requirements
      </h3>
      <p className="text-gray-300 mb-3">Visual inspection is mandated by several key regulations and standards:</p>
      <ul className="space-y-2 ml-4">
        {regulatoryItems.map((item, index) => (
          <li key={index} className="text-gray-300 flex items-start gap-2">
            <span className="text-elec-yellow mt-1">•</span>
            {item}
          </li>
        ))}
      </ul>
      <div className="bg-purple-600/10 border border-purple-600/20 rounded-lg p-4 mt-4">
        <p className="text-purple-200 font-medium">
          <strong>Legal Requirement:</strong> Under the Electricity at Work Regulations 1989, failure to carry out proper visual inspection could result in prosecution for breaches of health and safety law.
        </p>
      </div>
    </div>
  );
};
