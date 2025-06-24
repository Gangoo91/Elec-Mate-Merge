
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Shield, Plus, Lightbulb } from "lucide-react";

interface ControlMeasuresGeneratorProps {
  onControlMeasuresAdded: (controlMeasures: string[]) => void;
}

const ControlMeasuresGenerator = ({ onControlMeasuresAdded }: ControlMeasuresGeneratorProps) => {
  const [selectedMeasures, setSelectedMeasures] = useState<string[]>([]);
  const [customMeasure, setCustomMeasure] = useState("");

  const controlMeasureCategories = [
    {
      category: "Elimination",
      hierarchy: 1,
      color: "bg-green-600",
      measures: [
        "Remove the hazard completely",
        "Redesign the work process",
        "Use alternative methods",
        "Avoid the hazardous situation"
      ]
    },
    {
      category: "Substitution",
      hierarchy: 2,
      color: "bg-green-500",
      measures: [
        "Replace with safer alternative",
        "Use less hazardous materials",
        "Lower voltage alternatives",
        "Safer work methods"
      ]
    },
    {
      category: "Engineering Controls",
      hierarchy: 3,
      color: "bg-yellow-500",
      measures: [
        "Install safety barriers",
        "Use lockout/tagout systems",
        "Improve ventilation",
        "Residual current devices (RCDs)",
        "Earth fault protection",
        "Physical guarding"
      ]
    },
    {
      category: "Administrative Controls",
      hierarchy: 4,
      color: "bg-orange-500",
      measures: [
        "Safety training and competency",
        "Safe work procedures",
        "Permit to work systems",
        "Regular safety inspections",
        "Supervision and monitoring",
        "Warning signs and labels"
      ]
    },
    {
      category: "Personal Protective Equipment",
      hierarchy: 5,
      color: "bg-red-500",
      measures: [
        "Insulated tools and equipment",
        "Arc flash protective clothing",
        "Safety helmets",
        "Safety footwear",
        "Eye and face protection",
        "Respiratory protection"
      ]
    }
  ];

  const toggleMeasure = (measure: string) => {
    setSelectedMeasures(prev =>
      prev.includes(measure)
        ? prev.filter(m => m !== measure)
        : [...prev, measure]
    );
  };

  const addCustomMeasure = () => {
    if (customMeasure.trim() && !selectedMeasures.includes(customMeasure.trim())) {
      setSelectedMeasures(prev => [...prev, customMeasure.trim()]);
      setCustomMeasure("");
    }
  };

  const applyControlMeasures = () => {
    if (selectedMeasures.length > 0) {
      onControlMeasuresAdded(selectedMeasures);
    }
  };

  return (
    <Card className="border-elec-yellow/20 bg-elec-gray">
      <CardHeader>
        <CardTitle className="text-elec-yellow flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Control Measures Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-2 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
          <Lightbulb className="h-4 w-4 text-blue-400" />
          <p className="text-sm text-blue-300">
            Select control measures following the hierarchy of controls. Higher-level controls (elimination, substitution) are more effective.
          </p>
        </div>

        {controlMeasureCategories.map((category) => (
          <div key={category.category} className="space-y-3">
            <div className="flex items-center gap-3">
              <Badge className={`${category.color} text-white`}>
                Level {category.hierarchy}
              </Badge>
              <h4 className="font-semibold">{category.category}</h4>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-4">
              {category.measures.map((measure) => (
                <div key={measure} className="flex items-center space-x-2">
                  <Checkbox
                    id={measure}
                    checked={selectedMeasures.includes(measure)}
                    onCheckedChange={() => toggleMeasure(measure)}
                  />
                  <label
                    htmlFor={measure}
                    className="text-sm cursor-pointer hover:text-elec-yellow transition-colors"
                  >
                    {measure}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Custom Control Measure */}
        <div className="space-y-3">
          <h4 className="font-semibold flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Custom Control Measure
          </h4>
          <div className="flex gap-2">
            <Input
              placeholder="Add a specific control measure..."
              value={customMeasure}
              onChange={(e) => setCustomMeasure(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomMeasure()}
            />
            <Button onClick={addCustomMeasure} disabled={!customMeasure.trim()}>
              Add
            </Button>
          </div>
        </div>

        {/* Selected Measures Summary */}
        {selectedMeasures.length > 0 && (
          <div className="p-4 border border-gray-600 rounded-lg bg-elec-dark/50">
            <h4 className="font-semibold mb-3">Selected Control Measures ({selectedMeasures.length})</h4>
            <div className="space-y-1 mb-3 max-h-32 overflow-y-auto">
              {selectedMeasures.map((measure, index) => (
                <div key={index} className="text-sm text-gray-300">
                  • {measure}
                </div>
              ))}
            </div>
            <Button 
              onClick={applyControlMeasures}
              className="w-full bg-elec-yellow text-black hover:bg-elec-yellow/90"
            >
              Apply Control Measures ({selectedMeasures.length})
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ControlMeasuresGenerator;
