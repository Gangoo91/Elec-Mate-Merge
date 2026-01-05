
import { CheckSquare } from 'lucide-react';

export const DocumentationChecklist = () => {
  const checklistItems = [
    "Electrical installation drawings are current and accurate",
    "Circuit schedules match the actual installation",
    "Previous inspection certificates are available",
    "Design calculations are accessible and verified",
    "Manufacturer instructions are available for all equipment",
    "Risk assessments cover all relevant hazards",
    "Method statements are current and followed",
    "Compliance certificates are valid and complete",
    "Building control approvals are in place",
    "Emergency procedures are documented and accessible"
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <CheckSquare className="h-4 w-4" />
        Pre-Inspection Documentation Checklist
      </h3>
      <p className="text-foreground mb-4 text-base sm:text-lg leading-relaxed">
        Use this checklist before starting any visual inspection:
      </p>
      <div className="bg-[#323232] rounded-lg p-5">
        <ul className="space-y-4">
          {checklistItems.map((item, index) => (
            <li key={index} className="text-foreground flex items-start gap-3 text-sm sm:text-base leading-relaxed">
              <div className="w-5 h-5 border border-gray-500 rounded mt-0.5 flex-shrink-0"></div>
              {item}
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-yellow-600/10 border border-yellow-600/20 rounded-lg p-4">
        <p className="text-yellow-200 font-medium">
          <strong>Best Practice:</strong> Never proceed with visual inspection if critical documentation is missing. The time spent gathering proper documentation will be saved many times over during the inspection process.
        </p>
      </div>
    </div>
  );
};
