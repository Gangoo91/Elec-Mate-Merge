
import { Eye } from 'lucide-react';

export const FrequentVisualIssues = () => {
  const frequentIssues = [
    {
      category: "Environmental Protection",
      items: [
        "No IP-rated seals where needed (outdoors, wet areas)",
        "Incorrect IP rating for the environment",
        "Missing weatherproof enclosures for external installations",
        "Inadequate protection against UV degradation"
      ]
    },
    {
      category: "Circuit Protection & Control",
      items: [
        "No RCD protection where required by BS 7671",
        "Missing or incorrect RCD test notices",
        "Inadequate fault protection for special locations",
        "No additional protection for socket outlets"
      ]
    },
    {
      category: "Installation Methods",
      items: [
        "Mixing of neutral and CPC conductors in terminals",
        "Unused knockout holes left open in enclosures",
        "Inadequate cable support and fixing intervals",
        "Poor cable routing through sharp edges"
      ]
    },
    {
      category: "Accessibility & Maintenance",
      items: [
        "Obstructed access to isolators or distribution boards",
        "No permanent means of access to equipment",
        "Insufficient working space around electrical equipment",
        "Emergency isolation not clearly identifiable"
      ]
    },
    {
      category: "Earthing & Bonding",
      items: [
        "Missing bonding or supplementary earthing connections",
        "Inadequate cross-sectional area of bonding conductors",
        "No earth electrode connection labels",
        "Missing equipotential bonding in special locations"
      ]
    },
    {
      category: "Documentation & Compliance",
      items: [
        "No circuit charts or schedules provided",
        "Missing warning labels and safety notices",
        "Inadequate marking of conductor functions",
        "No emergency contact information displayed"
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <Eye className="h-4 w-4" />
        Other Frequent Visual Issues by Category
      </h3>
      <p className="text-gray-300 mb-4">
        These common defects may seem minor but can compromise safety, compliance, and long-term reliability:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {frequentIssues.map((category, index) => (
          <div key={index} className="bg-[#323232] rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-3 border-b border-gray-600 pb-2">
              {category.category}
            </h4>
            <ul className="space-y-2">
              {category.items.map((item, itemIndex) => (
                <li key={itemIndex} className="text-gray-300 flex items-start gap-2 text-sm">
                  <span className="text-elec-yellow mt-1">•</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="bg-orange-600/10 border border-orange-600/20 rounded-lg p-4 mt-6">
        <p className="text-orange-200 font-medium">
          <strong>Professional Tip:</strong> Many of these issues are easily rectified during installation but can be costly and time-consuming to fix later. A systematic visual inspection helps identify these problems before they become major compliance issues.
        </p>
      </div>
    </div>
  );
};
