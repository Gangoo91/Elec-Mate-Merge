
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { HardHat, CheckSquare, MapPin, Thermometer, Wind, Sun, Droplets } from "lucide-react";
import { useState } from "react";

const SiteConditionTab = () => {
  const [checkedItems, setCheckedItems] = useState<string[]>([]);
  const [environmentalNotes, setEnvironmentalNotes] = useState("");

  const conditionChecklist = [
    {
      category: "Access & Working Space",
      icon: MapPin,
      items: [
        "Adequate working space around electrical equipment (minimum 600mm)",
        "Clear access routes to and from work area",
        "Stable working platform or surface",
        "No obstructions in emergency escape routes",
        "Vehicle access available if required",
        "Suitable parking arrangements for work vehicles",
        "Pedestrian walkways clearly marked and safe"
      ]
    },
    {
      category: "Environmental Conditions",
      icon: Thermometer,
      items: [
        "Dry conditions - no risk of water ingress",
        "Adequate ventilation in enclosed spaces",
        "Temperature suitable for equipment and materials",
        "Wind conditions safe for overhead work",
        "No flammable vapours or gases present",
        "Humidity levels within acceptable ranges",
        "Air quality suitable for respiratory health"
      ]
    },
    {
      category: "Lighting & Visibility",
      icon: Sun,
      items: [
        "Adequate natural or artificial lighting",
        "Emergency lighting available if required",
        "All warning signs and labels clearly visible",
        "Colour identification possible in lighting conditions",
        "Additional portable lighting available if needed",
        "No glare or shadow issues affecting work",
        "Backup lighting arrangements in place"
      ]
    },
    {
      category: "Structural Considerations",
      icon: HardHat,
      items: [
        "Building structure suitable for proposed work",
        "No signs of structural damage or instability",
        "Cable routes and fixing points accessible",
        "Load-bearing capacity adequate for equipment",
        "Fire stopping and compartmentation maintained",
        "Building materials compatible with electrical work",
        "Structural modifications approved if required"
      ]
    },
    {
      category: "Weather & Seasonal Factors",
      icon: Wind,
      items: [
        "Current weather conditions suitable for work",
        "Weather forecast checked for duration of work",
        "Seasonal considerations (frost, ice, heat)",
        "Protection from rain and moisture available",
        "Wind speed within safe working limits",
        "Temperature effects on materials considered",
        "Contingency plans for weather changes"
      ]
    }
  ];

  const environmentalFactors = [
    {
      factor: "Temperature",
      considerations: ["Cable installation temperature ratings", "Thermal expansion effects", "Worker comfort and safety"],
      optimalRange: "5°C to 30°C for most electrical work"
    },
    {
      factor: "Humidity",
      considerations: ["Condensation risk", "Insulation resistance", "Equipment protection"],
      optimalRange: "30% to 70% relative humidity"
    },
    {
      factor: "Air Quality",
      considerations: ["Dust levels", "Chemical vapours", "Respiratory protection needs"],
      optimalRange: "Clean, well-ventilated air"
    }
  ];

  const toggleItem = (item: string) => {
    setCheckedItems(prev => 
      prev.includes(item) 
        ? prev.filter(i => i !== item)
        : [...prev, item]
    );
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <HardHat className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Site Condition Evaluation</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Assess environmental and working conditions to ensure safe and effective electrical installation work.
            This evaluation helps identify potential hazards and ensures optimal working conditions for quality installation.
          </p>
        </CardContent>
      </Card>

      {conditionChecklist.map((category, index) => (
        <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <category.icon className="h-5 w-5 text-elec-yellow" />
              <CheckSquare className="h-5 w-5 text-elec-yellow" />
              {category.category}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {category.items.map((item, itemIndex) => (
                <div key={itemIndex} className="flex items-start gap-3 p-3 border border-elec-yellow/20 rounded-lg hover:bg-elec-yellow/5 transition-colors">
                  <button
                    onClick={() => toggleItem(item)}
                    className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                      checkedItems.includes(item)
                        ? 'bg-green-500 border-green-500'
                        : 'border-elec-yellow/40 hover:border-elec-yellow'
                    }`}
                  >
                    {checkedItems.includes(item) && (
                      <CheckSquare className="h-3 w-3 text-white" />
                    )}
                  </button>
                  <span className={`text-sm ${checkedItems.includes(item) ? 'text-green-400' : 'text-muted-foreground'}`}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <Thermometer className="h-5 w-5" />
            Environmental Factors Guide
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {environmentalFactors.map((factor, index) => (
              <div key={index} className="border border-blue-400/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-2">{factor.factor}</h4>
                <p className="text-sm text-blue-200 mb-2">Optimal Range: {factor.optimalRange}</p>
                <ul className="space-y-1">
                  {factor.considerations.map((consideration, idx) => (
                    <li key={idx} className="text-sm text-muted-foreground flex items-center gap-2">
                      <span className="w-1 h-1 bg-blue-400 rounded-full"></span>
                      {consideration}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white">Environmental Assessment Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={environmentalNotes}
            onChange={(e) => setEnvironmentalNotes(e.target.value)}
            placeholder="Record specific environmental conditions, weather factors, seasonal considerations, or site-specific environmental challenges..."
            className="min-h-24 mb-4"
          />
          <Button className="w-full">
            Complete Site Condition Assessment
          </Button>
        </CardContent>
      </Card>

      <Card className="border-orange-500/50 bg-orange-500/10">
        <CardHeader>
          <CardTitle className="text-orange-300 flex items-center gap-2">
            <Droplets className="h-5 w-5" />
            Weather Considerations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-2">
            Always check weather conditions before starting outdoor electrical work:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Do not work in wet conditions or during electrical storms</li>
            <li>• Wind speeds above 15 mph may affect ladder work</li>
            <li>• Temperature below 0°C may affect cable flexibility</li>
            <li>• High humidity can affect insulation resistance readings</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteConditionTab;
