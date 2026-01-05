
import { Clock } from 'lucide-react';

export const VisualInspectionWhen = () => {
  const whenItems = [
    "Before any electrical testing begins",
    "During initial verification of new installations",
    "As part of periodic inspection and testing (EICR)",
    "Following alterations, additions, or modifications",
    "After fault finding or remedial work",
    "When taking over responsibility for an installation",
    "Before re-energising after maintenance work",
    "When investigating reported electrical problems"
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <Clock className="h-4 w-4" />
        When Must Visual Inspection Be Carried Out?
      </h3>
      <p className="text-gray-300 leading-relaxed mb-3">
        Visual inspection is mandatory in several circumstances under BS 7671:
      </p>
      <ul className="space-y-2 ml-4">
        {whenItems.map((item, index) => (
          <li key={index} className="text-gray-300 flex items-start gap-2">
            <span className="text-elec-yellow mt-1">•</span>
            {item}
          </li>
        ))}
      </ul>
      <div className="bg-red-600/10 border border-red-600/20 rounded-lg p-4 mt-4">
        <p className="text-red-200 font-medium">
          <strong>Critical Rule:</strong> BS 7671 Regulation 643.1 states that visual inspection must be completed before any electrical testing. You must not energise or test any circuit until the visual inspection is complete and defects resolved.
        </p>
      </div>
    </div>
  );
};
