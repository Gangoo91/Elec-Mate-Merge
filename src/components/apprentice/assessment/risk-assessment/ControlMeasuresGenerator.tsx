
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Target, Shield, Users, Settings, AlertCircle } from "lucide-react";

interface ControlMeasure {
  id: string;
  measure: string;
  type: 'elimination' | 'substitution' | 'engineering' | 'administrative' | 'ppe';
  effectiveness: number;
  cost: 'low' | 'medium' | 'high';
  implementation: 'immediate' | 'short-term' | 'long-term';
}

interface ControlMeasuresGeneratorProps {
  hazard: string;
  riskLevel: string;
  onControlMeasuresSelected: (measures: string[], residualRisk: number) => void;
}

const ControlMeasuresGenerator = ({ hazard, riskLevel, onControlMeasuresSelected }: ControlMeasuresGeneratorProps) => {
  const [selectedMeasures, setSelectedMeasures] = useState<string[]>([]);

  const controlHierarchy = [
    { type: 'elimination', label: 'Elimination', icon: AlertCircle, color: 'bg-green-600', priority: 1 },
    { type: 'substitution', label: 'Substitution', icon: Settings, color: 'bg-green-500', priority: 2 },
    { type: 'engineering', label: 'Engineering Controls', icon: Settings, color: 'bg-blue-500', priority: 3 },
    { type: 'administrative', label: 'Administrative Controls', icon: Users, color: 'bg-yellow-500', priority: 4 },
    { type: 'ppe', label: 'Personal Protective Equipment', icon: Shield, color: 'bg-orange-500', priority: 5 }
  ];

  const controlMeasuresDatabase: Record<string, ControlMeasure[]> = {
    "Live conductors": [
      { id: "1", measure: "Isolate and lock off power supply", type: "elimination", effectiveness: 95, cost: "low", implementation: "immediate" },
      { id: "2", measure: "Use insulated barriers/guards", type: "engineering", effectiveness: 80, cost: "medium", implementation: "short-term" },
      { id: "3", measure: "Implement permit to work system", type: "administrative", effectiveness: 70, cost: "low", implementation: "immediate" },
      { id: "4", measure: "Use insulated tools and equipment", type: "ppe", effectiveness: 60, cost: "medium", implementation: "immediate" }
    ],
    "Working at height": [
      { id: "5", measure: "Work from ground level where possible", type: "elimination", effectiveness: 100, cost: "low", implementation: "immediate" },
      { id: "6", measure: "Use mobile elevated work platform", type: "substitution", effectiveness: 85, cost: "high", implementation: "short-term" },
      { id: "7", measure: "Install permanent fall protection systems", type: "engineering", effectiveness: 90, cost: "high", implementation: "long-term" },
      { id: "8", measure: "Implement height work procedures", type: "administrative", effectiveness: 65, cost: "low", implementation: "immediate" },
      { id: "9", measure: "Use fall arrest harnesses", type: "ppe", effectiveness: 75, cost: "medium", implementation: "immediate" }
    ],
    "default": [
      { id: "10", measure: "Risk assessment and safe work method", type: "administrative", effectiveness: 60, cost: "low", implementation: "immediate" },
      { id: "11", measure: "Regular safety inspections", type: "administrative", effectiveness: 50, cost: "low", implementation: "immediate" },
      { id: "12", measure: "Safety training and competency", type: "administrative", effectiveness: 55, cost: "medium", implementation: "short-term" },
      { id: "13", measure: "Appropriate PPE provision", type: "ppe", effectiveness: 45, cost: "medium", implementation: "immediate" }
    ]
  };

  const getRelevantMeasures = (): ControlMeasure[] => {
    const exactMatch = Object.keys(controlMeasuresDatabase).find(key => 
      hazard.toLowerCase().includes(key.toLowerCase())
    );
    
    if (exactMatch) {
      return [...controlMeasuresDatabase[exactMatch], ...controlMeasuresDatabase.default];
    }
    
    return controlMeasuresDatabase.default;
  };

  const calculateResidualRisk = (): number => {
    if (selectedMeasures.length === 0) return 100;
    
    const relevantMeasures = getRelevantMeasures();
    const selectedControls = relevantMeasures.filter(measure => 
      selectedMeasures.includes(measure.id)
    );
    
    const totalEffectiveness = selectedControls.reduce((acc, measure) => {
      return acc + measure.effectiveness;
    }, 0);
    
    const averageEffectiveness = totalEffectiveness / selectedControls.length;
    return Math.max(10, 100 - averageEffectiveness);
  };

  const handleMeasureToggle = (measureId: string) => {
    setSelectedMeasures(prev => 
      prev.includes(measureId)
        ? prev.filter(id => id !== measureId)
        : [...prev, measureId]
    );
  };

  const handleProceed = () => {
    const relevantMeasures = getRelevantMeasures();
    const selectedControlTexts = relevantMeasures
      .filter(measure => selectedMeasures.includes(measure.id))
      .map(measure => measure.measure);
    
    const residualRisk = calculateResidualRisk();
    onControlMeasuresSelected(selectedControlTexts, residualRisk);
  };

  const relevantMeasures = getRelevantMeasures();
  const groupedMeasures = controlHierarchy.map(hierarchy => ({
    ...hierarchy,
    measures: relevantMeasures.filter(measure => measure.type === hierarchy.type)
  }));

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Target className="h-5 w-5" />
            Control Measures Selection
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Hazard: <span className="text-white font-medium">{hazard}</span> | 
            Risk Level: <Badge className={`ml-2 ${
              riskLevel === 'Very High' ? 'bg-red-600' :
              riskLevel === 'High' ? 'bg-red-500' :
              riskLevel === 'Medium' ? 'bg-yellow-500' :
              riskLevel === 'Low' ? 'bg-green-500' : 'bg-green-400'
            }`}>{riskLevel}</Badge>
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Hierarchy of Controls */}
            <Card className="border-blue-500/20 bg-blue-500/10">
              <CardHeader>
                <CardTitle className="text-blue-300 text-sm">Hierarchy of Controls</CardTitle>
                <p className="text-xs text-muted-foreground">
                  Controls are listed in order of effectiveness. Start from the top.
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {groupedMeasures.map((group) => (
                    group.measures.length > 0 && (
                      <div key={group.type}>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge className={`${group.color} text-white`}>
                            {group.priority}
                          </Badge>
                          <group.icon className="h-4 w-4" />
                          <span className="font-medium">{group.label}</span>
                        </div>
                        <div className="space-y-2 ml-6">
                          {group.measures.map((measure) => (
                            <div key={measure.id} className="flex items-start gap-3 p-3 border border-gray-600 rounded-lg">
                              <Checkbox
                                id={measure.id}
                                checked={selectedMeasures.includes(measure.id)}
                                onCheckedChange={() => handleMeasureToggle(measure.id)}
                              />
                              <div className="flex-1">
                                <label htmlFor={measure.id} className="text-sm font-medium cursor-pointer">
                                  {measure.measure}
                                </label>
                                <div className="flex items-center gap-2 mt-1">
                                  <Badge variant="outline" className="text-xs">
                                    {measure.effectiveness}% effective
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {measure.cost} cost
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {measure.implementation}
                                  </Badge>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Risk Reduction Summary */}
            {selectedMeasures.length > 0 && (
              <Card className="border-green-500/20 bg-green-500/10">
                <CardHeader>
                  <CardTitle className="text-green-300 text-sm">Risk Reduction Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Controls Selected</p>
                      <p className="text-lg font-bold text-green-300">{selectedMeasures.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Estimated Residual Risk</p>
                      <p className="text-lg font-bold text-green-300">{calculateResidualRisk().toFixed(0)}%</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Reduction</p>
                      <p className="text-lg font-bold text-green-300">{(100 - calculateResidualRisk()).toFixed(0)}%</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Button */}
            <div className="flex justify-end">
              <Button 
                onClick={handleProceed} 
                disabled={selectedMeasures.length === 0}
                className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              >
                Apply Control Measures
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ControlMeasuresGenerator;
