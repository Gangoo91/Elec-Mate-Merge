
import { Tag } from 'lucide-react';

export const DefectClassification = () => {
  const defectClassifications = [
    {
      category: "C1 - Danger Present",
      description: "Immediate danger to persons or property",
      colour: "bg-red-600/20 border-red-600/40 text-red-200",
      action: "Immediate rectification required",
      examples: [
        "Exposed live parts at accessible voltages",
        "Complete loss of earthing to circuits",
        "Dangerous overcurrent protection settings",
        "Live parts accessible without tools"
      ]
    },
    {
      category: "C2 - Potentially Dangerous",
      description: "Urgent remedial action required",
      colour: "bg-orange-600/20 border-orange-600/40 text-orange-200",
      action: "Remedial action urgently required",
      examples: [
        "Inadequate earthing arrangements",
        "Missing RCD protection where required",
        "Loose connections causing overheating",
        "Inadequate IP rating for environment"
      ]
    },
    {
      category: "C3 - Improvement Recommended",
      description: "Improvement recommended for enhanced safety",
      colour: "bg-yellow-600/20 border-yellow-600/40 text-yellow-200",
      action: "Improvement recommended at next opportunity",
      examples: [
        "Missing labels on distribution boards",
        "Insufficient mechanical protection",
        "Old wiring systems nearing replacement",
        "Minor non-compliance with current standards"
      ]
    },
    {
      category: "FI - Further Investigation",
      description: "Unable to fully inspect during visual examination",
      colour: "bg-purple-600/20 border-purple-600/40 text-purple-200",
      action: "Further investigation required",
      examples: [
        "Concealed wiring requiring opening up",
        "Inaccessible junction boxes",
        "Equipment requiring dismantling",
        "Underground cable routes"
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <Tag className="h-4 w-4" />
        Defect Classification System (BS 7671)
      </h3>
      <p className="text-gray-300 mb-4">
        Visual defects must be classified according to their severity and potential risk. Understanding this classification helps prioritise remedial actions:
      </p>
      <div className="space-y-4">
        {defectClassifications.map((classification, index) => (
          <div key={index} className={`rounded-lg p-4 border ${classification.colour}`}>
            <div className="mb-3">
              <h4 className="font-semibold text-lg mb-1">{classification.category}</h4>
              <p className="text-sm mb-2">{classification.description}</p>
              <div className="bg-black/20 rounded px-3 py-1 inline-block">
                <span className="text-xs font-medium">Action Required: {classification.action}</span>
              </div>
            </div>
            <div className="space-y-2">
              <h5 className="font-medium text-sm">Typical Examples:</h5>
              <ul className="space-y-1 ml-4">
                {classification.examples.map((example, exampleIndex) => (
                  <li key={exampleIndex} className="text-sm flex items-start gap-2">
                    <span className="mt-1">•</span>
                    {example}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-gray-600/10 border border-gray-600/20 rounded-lg p-4">
        <p className="text-gray-300 font-medium">
          <strong>Legal Requirement:</strong> All defects found during visual inspection must be classified and recorded. C1 defects require immediate action before the installation can be energised or certified as safe.
        </p>
      </div>
    </div>
  );
};
