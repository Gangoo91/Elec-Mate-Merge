
import { MapPin } from 'lucide-react';

export const DefectsByLocation = () => {
  const locationDefects = [
    {
      location: "Distribution Boards & Consumer Units",
      priority: "Critical",
      commonDefects: [
        "Missing or damaged MCB covers",
        "Inadequate labelling of circuits",
        "Loose terminal connections",
        "No RCD test facilities or notices",
        "Insufficient cable entries/glands",
        "Poor cable management and support"
      ]
    },
    {
      location: "Socket Outlets & Accessories",
      priority: "High",
      commonDefects: [
        "Loose mounting or damaged faceplates",
        "Missing earth continuity connections",
        "Inadequate tightening of terminals",
        "Wrong accessory for the environment",
        "No additional RCD protection where required",
        "Incorrect height installation"
      ]
    },
    {
      location: "Lighting Circuits & Fittings",
      priority: "Medium",
      commonDefects: [
        "Inadequate support for heavy fittings",
        "Wrong lamp type or wattage rating",
        "Missing heat-resistant cable connections",
        "No emergency lighting test facilities",
        "Incorrect IP rating for bathroom zones",
        "Poor cable entry into luminaires"
      ]
    },
    {
      location: "Bathroom & Wet Areas",
      priority: "Critical",
      commonDefects: [
        "Equipment installed in prohibited zones",
        "Missing supplementary equipotential bonding",
        "Inadequate IP rating for the zone",
        "No 30mA RCD protection",
        "Incorrect accessories for wet locations",
        "Missing zone identification"
      ]
    },
    {
      location: "External & Outdoor Installations",
      priority: "High",
      commonDefects: [
        "Inadequate weatherproof protection",
        "Wrong cable type for outdoor use",
        "Missing UV protection for cables",
        "Incorrect burial depth for underground cables",
        "No mechanical protection where required",
        "Poor drainage from enclosures"
      ]
    },
    {
      location: "Kitchen Areas",
      priority: "High",
      commonDefects: [
        "Socket outlets too close to sinks",
        "No additional RCD protection",
        "Inadequate cable protection from heat",
        "Wrong type of cable for appliance connections",
        "Missing isolation for fixed appliances",
        "Poor ventilation around electrical equipment"
      ]
    }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-600/20 text-red-200';
      case 'High': return 'bg-orange-600/20 text-orange-200';
      case 'Medium': return 'bg-yellow-600/20 text-yellow-200';
      default: return 'bg-gray-600/20 text-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-elec-yellow flex items-center gap-2">
        <MapPin className="h-4 w-4" />
        Common Defects by Installation Location
      </h3>
      <p className="text-gray-300 mb-4">
        Different areas of installations have characteristic defect patterns. Focus your inspection on these location-specific issues:
      </p>
      <div className="space-y-4">
        {locationDefects.map((location, index) => (
          <div key={index} className="bg-[#323232] rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-foreground">{location.location}</h4>
              <span className={`px-3 py-1 rounded text-xs font-medium ${getPriorityColor(location.priority)}`}>
                {location.priority} Priority
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {location.commonDefects.map((defect, defectIndex) => (
                <div key={defectIndex} className="text-gray-300 flex items-start gap-2 text-sm">
                  <span className="text-elec-yellow mt-1">•</span>
                  {defect}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="bg-blue-600/10 border border-blue-600/20 rounded-lg p-4 mt-4">
        <p className="text-blue-200 font-medium">
          <strong>Inspection Strategy:</strong> Start with critical priority locations first, then work through high and medium priority areas. This approach ensures you catch the most dangerous defects early in your inspection process.
        </p>
      </div>
    </div>
  );
};
