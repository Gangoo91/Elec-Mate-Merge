
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MobileInput } from "@/components/ui/mobile-input";
import { Shield, Plus, Lightbulb, CheckCircle, AlertTriangle } from "lucide-react";

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
      color: "green",
      description: "Most effective - remove the hazard completely",
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
      color: "green",
      description: "Replace with safer alternative",
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
      color: "yellow",
      description: "Physical barriers and safety devices",
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
      color: "orange",
      description: "Procedures and training",
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
      color: "red",
      description: "Last line of defence",
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

  const getColorConfig = (color: string) => {
    const configs: Record<string, { bg: string; text: string; border: string; iconBg: string }> = {
      green: { bg: 'bg-green-500/10', text: 'text-green-400', border: 'border-green-500/30', iconBg: 'from-green-500/20 to-green-500/5' },
      yellow: { bg: 'bg-elec-yellow/10', text: 'text-elec-yellow', border: 'border-elec-yellow/30', iconBg: 'from-elec-yellow/20 to-elec-yellow/5' },
      orange: { bg: 'bg-orange-500/10', text: 'text-orange-400', border: 'border-orange-500/30', iconBg: 'from-orange-500/20 to-orange-500/5' },
      red: { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/30', iconBg: 'from-red-500/20 to-red-500/5' }
    };
    return configs[color] || configs.green;
  };

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
    <Card className="bg-gradient-to-br from-white/5 to-elec-card border-white/10 overflow-hidden relative animate-fade-in">
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      <CardHeader className="relative">
        <CardTitle className="text-white flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-500/5 border border-blue-500/30">
            <Shield className="h-5 w-5 text-blue-400" />
          </div>
          Control Measures Generator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 relative">
        {/* Info Banner */}
        <div className="p-4 rounded-xl bg-blue-500/10 border border-blue-500/30">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-blue-500/20 flex-shrink-0">
              <Lightbulb className="h-4 w-4 text-blue-400" />
            </div>
            <p className="text-sm text-white/70">
              Select control measures following the hierarchy of controls. Higher-level controls (elimination, substitution) are more effective.
            </p>
          </div>
        </div>

        {/* Control Measure Categories */}
        {controlMeasureCategories.map((category) => {
          const colorConfig = getColorConfig(category.color);
          return (
            <div key={category.category} className="space-y-3">
              <div className="flex items-center gap-3">
                <Badge className={`${colorConfig.bg} ${colorConfig.text} border ${colorConfig.border}`}>
                  Level {category.hierarchy}
                </Badge>
                <div>
                  <h4 className="font-semibold text-white">{category.category}</h4>
                  <p className="text-xs text-white/80">{category.description}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 ml-0 sm:ml-4">
                {category.measures.map((measure) => {
                  const isSelected = selectedMeasures.includes(measure);
                  return (
                    <button
                      key={measure}
                      onClick={() => toggleMeasure(measure)}
                      className={`
                        flex items-center gap-3 p-3 rounded-xl border transition-all
                        touch-manipulation active:scale-[0.98]
                        ${isSelected
                          ? `${colorConfig.bg} ${colorConfig.border}`
                          : 'bg-white/10 border-white/10 hover:border-white/20'
                        }
                      `}
                    >
                      <div className={`
                        w-5 h-5 rounded-lg flex items-center justify-center flex-shrink-0 transition-all
                        ${isSelected
                          ? `bg-gradient-to-br ${colorConfig.iconBg} border ${colorConfig.border}`
                          : 'border border-white/30'
                        }
                      `}>
                        {isSelected && <CheckCircle className={`h-3.5 w-3.5 ${colorConfig.text}`} />}
                      </div>
                      <span className={`text-sm text-left ${isSelected ? colorConfig.text : 'text-white/70'}`}>
                        {measure}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Custom Control Measure */}
        <div className="p-4 rounded-xl bg-white/10 border border-white/10">
          <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
            <Plus className="h-4 w-4 text-purple-400" />
            Custom Control Measure
          </h4>
          <div className="flex gap-2 items-end">
            <MobileInput
              label=""
              placeholder="Add a specific control measure..."
              value={customMeasure}
              onChange={(e) => setCustomMeasure(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addCustomMeasure()}
              className="flex-1"
            />
            <Button
              onClick={addCustomMeasure}
              disabled={!customMeasure.trim()}
              className="h-12 bg-purple-500 hover:bg-purple-500/90 text-white disabled:opacity-30 touch-manipulation active:scale-95 transition-all"
            >
              Add
            </Button>
          </div>
        </div>

        {/* Selected Measures Summary */}
        {selectedMeasures.length > 0 && (
          <div className="p-4 rounded-xl bg-green-500/10 border border-green-500/30">
            <div className="flex items-center gap-2 mb-3">
              <CheckCircle className="h-5 w-5 text-green-400" />
              <h4 className="font-semibold text-white">
                Selected Control Measures ({selectedMeasures.length})
              </h4>
            </div>
            <div className="space-y-1 mb-4 max-h-32 overflow-y-auto">
              {selectedMeasures.map((measure, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-white/70">
                  <span className="w-1.5 h-1.5 bg-green-400 rounded-full flex-shrink-0" />
                  {measure}
                </div>
              ))}
            </div>
            <Button
              onClick={applyControlMeasures}
              className="w-full h-12 bg-green-500 hover:bg-green-500/90 text-white font-semibold touch-manipulation active:scale-95 transition-all"
            >
              <Shield className="mr-2 h-5 w-5" />
              Apply Control Measures ({selectedMeasures.length})
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ControlMeasuresGenerator;
