
import { Target } from 'lucide-react';

export const FocusAreas = () => {
  const focusAreas = [
    {
      area: "Distribution boards (DBs)",
      priority: "High"
    },
    {
      area: "Socket and lighting points",
      priority: "High"
    },
    {
      area: "Junction boxes",
      priority: "Medium"
    },
    {
      area: "Isolators and control panels",
      priority: "High"
    },
    {
      area: "Bathroom and kitchen circuits",
      priority: "High"
    },
    {
      area: "Cable routing and fixings",
      priority: "Medium"
    },
    {
      area: "External enclosures",
      priority: "High"
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <Target className="h-4 w-4" />
        Where to Focus Your Checks
      </h3>
      <p className="text-gray-300 mb-3">
        Prioritise your visual inspection efforts on these key areas where defects are most commonly found:
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {focusAreas.map((area, index) => (
          <div key={index} className="flex items-center justify-between bg-[#323232] rounded-lg p-3">
            <span className="text-gray-300">{area.area}</span>
            <span className={`px-2 py-1 rounded text-xs font-medium ${
              area.priority === 'High' 
                ? 'bg-red-600/20 text-red-200' 
                : 'bg-yellow-600/20 text-yellow-200'
            }`}>
              {area.priority}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
