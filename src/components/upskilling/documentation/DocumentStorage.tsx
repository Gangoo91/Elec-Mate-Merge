
import { Archive } from 'lucide-react';

export const DocumentStorage = () => {
  const storageRequirements = [
    "Electrical installation certificates must be retained for the life of the installation",
    "Inspection and test records should be kept for minimum 7 years",
    "Design documentation must be accessible to maintenance personnel",
    "Digital copies should have secure backup and version control",
    "Physical documents require protection from damage and loss",
    "Access permissions should be controlled and documented"
  ];

  const bestPractices = [
    "Use cloud-based document management systems with access controls",
    "Maintain both digital and physical copies of critical documents",
    "Implement version control to track changes and updates",
    "Regular backup and disaster recovery procedures",
    "Clear naming conventions and folder structures",
    "Regular review and updating of documentation"
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <Archive className="h-4 w-4" />
        Document Storage & Management
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-[#323232] rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Legal Requirements</h4>
          <ul className="space-y-2">
            {storageRequirements.map((requirement, index) => (
              <li key={index} className="text-foreground flex items-start gap-2 text-sm">
                <span className="text-elec-yellow mt-1">•</span>
                {requirement}
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-[#323232] rounded-lg p-4">
          <h4 className="font-semibold text-foreground mb-3">Best Practices</h4>
          <ul className="space-y-2">
            {bestPractices.map((practice, index) => (
              <li key={index} className="text-foreground flex items-start gap-2 text-sm">
                <span className="text-elec-yellow mt-1">•</span>
                {practice}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4">
        <p className="text-blue-200 font-medium">
          <strong>Future-Proofing:</strong> Good document management today saves significant time and cost in future inspections, maintenance, and modifications. Invest in proper systems from the start.
        </p>
      </div>
    </div>
  );
};
