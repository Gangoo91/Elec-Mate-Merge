
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { HardHat, CheckSquare, MapPin, Thermometer } from "lucide-react";
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
        "Vehicle access available if required"
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
        "No flammable vapours or gases present"
      ]
    },
    {
      category: "Lighting & Visibility",
      items: [
        "Adequate natural or artificial lighting",
        "Emergency lighting available if required",
        "All warning signs and labels clearly visible",
        "Colour identification possible in lighting conditions",
        "Additional portable lighting available if needed"
      ]
    },
    {
      category: "Structural Considerations",
      items: [
        "Building structure suitable for proposed work",
        "No signs of structural damage or instability",
        "Cable routes and fixing points accessible",
        "Load-bearing capacity adequate for equipment",
        "Fire stopping and compartmentation maintained"
      ]
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
          </p>
        </CardContent>
      </Card>

      {conditionChecklist.map((category, index) => (
        <Card key={index} className="border-elec-yellow/20 bg-elec-gray">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              {category.icon && <category.icon className="h-5 w-5 text-elec-yellow" />}
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

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white">Environmental Assessment Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={environmentalNotes}
            onChange={(e) => setEnvironmentalNotes(e.target.value)}
            placeholder="Record specific environmental conditions, weather factors, or site-specific considerations..."
            className="min-h-24 mb-4"
          />
          <Button className="w-full">
            Complete Site Condition Assessment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SiteConditionTab;
