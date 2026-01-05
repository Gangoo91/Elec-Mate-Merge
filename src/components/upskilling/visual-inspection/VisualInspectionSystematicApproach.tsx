
import { Search } from 'lucide-react';

export const VisualInspectionSystematicApproach = () => {
  const systematicApproach = [
    "Start at the origin of the installation (main incoming supply)",
    "Work systematically towards the final circuits",
    "Check each distribution board and consumer unit thoroughly",
    "Examine cable routes, supports, and terminations",
    "Verify protective devices and their ratings",
    "Check earthing and bonding arrangements",
    "Inspect accessories, switches, and socket outlets",
    "Verify IP ratings match environmental conditions"
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <Search className="h-4 w-4" />
        Systematic Inspection Approach
      </h3>
      <p className="text-gray-300 leading-relaxed mb-3">
        Visual inspection must follow a logical, systematic approach to ensure nothing is missed:
      </p>
      <ul className="space-y-2 ml-4">
        {systematicApproach.map((item, index) => (
          <li key={index} className="text-gray-300 flex items-start gap-2">
            <span className="text-elec-yellow mt-1">{index + 1}.</span>
            {item}
          </li>
        ))}
      </ul>
      <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4 mt-4">
        <p className="text-blue-200 font-medium">
          <strong>Professional Tip:</strong> Use a methodical room-by-room, circuit-by-circuit approach. Don't jump around randomly as this leads to missed items and having to re-check areas.
        </p>
      </div>
    </div>
  );
};
