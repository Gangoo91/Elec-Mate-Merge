
import { Shield } from 'lucide-react';

export const VisualInspectionWhy = () => {
  const whyReasons = [
    "Some hazards (loose terminations, incorrect IP ratings) cannot be detected by electrical testing alone",
    "Testing a visually unsafe system could cause injury, equipment damage, or invalid test results",
    "Electrical Installation Certificates legally require confirmation that visual inspection was carried out",
    "Many regulatory requirements can only be verified through visual examination",
    "It's the most cost-effective way to identify obvious defects before proceeding with testing",
    "Prevents damage to test equipment from obvious faults",
    "Ensures the safety of the person carrying out the testing"
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <Shield className="h-4 w-4" />
        Why Visual Inspection Is Critical
      </h3>
      <ul className="space-y-3 ml-4">
        {whyReasons.map((reason, index) => (
          <li key={index} className="text-gray-300 flex items-start gap-2">
            <span className="text-elec-yellow mt-1">•</span>
            {reason}
          </li>
        ))}
      </ul>
      <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-4 mt-4">
        <p className="text-green-200 font-medium">
          <strong>Industry Fact:</strong> Studies show that approximately 60% of electrical faults can be identified through visual inspection alone, making it the most effective single safety procedure in electrical work.
        </p>
      </div>
    </div>
  );
};
