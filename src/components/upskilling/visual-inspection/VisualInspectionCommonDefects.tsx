
import { AlertTriangle } from 'lucide-react';

export const VisualInspectionCommonDefects = () => {
  const commonDefects = [
    {
      category: "Terminations & Connections",
      items: [
        "Loose terminations causing overheating",
        "Inadequate torque on gland entries",
        "Poor crimping of cable lugs",
        "Incorrect terminal block usage"
      ]
    },
    {
      category: "Cable Management",
      items: [
        "Inadequate cable support intervals",
        "Sharp edges damaging cable sheathing",
        "Cables in contact with hot surfaces",
        "Mixing of different cable types inappropriately"
      ]
    },
    {
      category: "Protection & Safety",
      items: [
        "Missing or damaged protective covers",
        "Inadequate ingress protection for environment",
        "Missing warning labels and notices",
        "Inadequate segregation of circuits"
      ]
    },
    {
      category: "Environmental Factors",
      items: [
        "Corrosion on metalwork and enclosures",
        "Water ingress or moisture damage",
        "Dust accumulation affecting cooling",
        "UV degradation of cables and enclosures"
      ]
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <AlertTriangle className="h-4 w-4" />
        Common Visual Defects by Category
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {commonDefects.map((category, index) => (
          <div key={index} className="bg-[#323232] rounded-lg p-4">
            <h4 className="font-semibold text-foreground mb-3">{category.category}</h4>
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
    </div>
  );
};
