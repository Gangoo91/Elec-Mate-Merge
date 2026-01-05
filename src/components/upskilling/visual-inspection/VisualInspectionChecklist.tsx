
import { Zap } from 'lucide-react';

export const VisualInspectionChecklist = () => {
  const checkingItems = [
    "Exposed live parts or inadequate protection",
    "Incorrect cable sizing for the load",
    "Missing grommets or gland entries in metal enclosures",
    "Unlabelled circuits or inadequate identification",
    "Signs of overheating, burning, or thermal damage",
    "Missing covers, barriers, or screw fixings",
    "Insecure fixings or damaged enclosures",
    "Incorrect IP ratings for the environment",
    "Poor workmanship or non-compliant installation methods",
    "Inadequate earthing and bonding connections",
    "Missing RCD protection where required",
    "Incorrect cable routes or insufficient support"
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <Zap className="h-4 w-4" />
        Comprehensive Visual Inspection Checklist
      </h3>
      <p className="text-gray-300 mb-3">During visual inspection, systematically check for these key items:</p>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-4">
        {checkingItems.map((item, index) => (
          <li key={index} className="text-gray-300 flex items-start gap-2">
            <span className="text-elec-yellow mt-1">•</span>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};
