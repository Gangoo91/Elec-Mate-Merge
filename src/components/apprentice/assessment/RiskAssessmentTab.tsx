
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckSquare } from "lucide-react";
import { useState } from "react";

const RiskAssessmentTab = () => {
  const [identifiedHazards, setIdentifiedHazards] = useState<string[]>([]);
  const [controlMeasures, setControlMeasures] = useState("");
  const [riskNotes, setRiskNotes] = useState("");

  const hazardTypes = [
    { name: "Electrical shock", severity: "High", category: "electrical" },
    { name: "Arc flash/blast", severity: "High", category: "electrical" },
    { name: "Working at height", severity: "Medium", category: "physical" },
    { name: "Manual handling", severity: "Medium", category: "physical" },
    { name: "Dust inhalation", severity: "Low", category: "health" },
    { name: "Noise exposure", severity: "Medium", category: "health" },
    { name: "Confined spaces", severity: "High", category: "environmental" },
    { name: "Fire/explosion risk", severity: "High", category: "environmental" },
    { name: "Chemical exposure", severity: "Medium", category: "health" },
    { name: "Cuts from tools/materials", severity: "Medium", category: "physical" }
  ];

  const riskMatrix = [
    { probability: "Very Unlikely", impact: "Minor", risk: "Very Low", color: "green" },
    { probability: "Unlikely", impact: "Moderate", risk: "Low", color: "yellow" },
    { probability: "Possible", impact: "Major", risk: "Medium", color: "orange" },
    { probability: "Likely", impact: "Severe", risk: "High", color: "red" },
    { probability: "Very Likely", impact: "Catastrophic", risk: "Very High", color: "red" }
  ];

  const toggleHazard = (hazard: string) => {
    setIdentifiedHazards(prev => 
      prev.includes(hazard) 
        ? prev.filter(h => h !== hazard)
        : [...prev, hazard]
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "High": return "text-red-400 bg-red-400/10 border-red-400/40";
      case "Medium": return "text-yellow-400 bg-yellow-400/10 border-yellow-400/40";
      case "Low": return "text-green-400 bg-green-400/10 border-green-400/40";
      default: return "text-elec-yellow bg-elec-yellow/10 border-elec-yellow/40";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-gradient-to-r from-elec-gray to-elec-dark/50">
        <CardHeader>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-elec-yellow" />
            <CardTitle className="text-elec-yellow">Risk Assessment Matrix</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Systematic evaluation of potential hazards and implementation of appropriate control measures.
          </p>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-elec-yellow" />
            Hazard Identification
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Select all hazards that may be present during this work activity:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {hazardTypes.map((hazard, index) => (
              <div key={index} className="flex items-center gap-3 p-3 border border-elec-yellow/20 rounded-lg hover:bg-elec-yellow/5 transition-colors">
                <button
                  onClick={() => toggleHazard(hazard.name)}
                  className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    identifiedHazards.includes(hazard.name)
                      ? 'bg-orange-500 border-orange-500'
                      : 'border-elec-yellow/40 hover:border-elec-yellow'
                  }`}
                >
                  {identifiedHazards.includes(hazard.name) && (
                    <CheckSquare className="h-3 w-3 text-white" />
                  )}
                </button>
                <span className="text-sm text-muted-foreground flex-1">{hazard.name}</span>
                <Badge className={getSeverityColor(hazard.severity)}>
                  {hazard.severity}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white">Risk Assessment Matrix</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-elec-yellow/20">
                  <th className="text-left p-3 text-white">Probability</th>
                  <th className="text-left p-3 text-white">Impact</th>
                  <th className="text-left p-3 text-white">Risk Level</th>
                  <th className="text-left p-3 text-white">Action Required</th>
                </tr>
              </thead>
              <tbody>
                {riskMatrix.map((row, index) => (
                  <tr key={index} className="border-b border-elec-yellow/10">
                    <td className="p-3 text-sm text-muted-foreground">{row.probability}</td>
                    <td className="p-3 text-sm text-muted-foreground">{row.impact}</td>
                    <td className="p-3">
                      <Badge className={`${row.color === 'red' ? 'bg-red-500/20 text-red-400' : 
                                        row.color === 'orange' ? 'bg-orange-500/20 text-orange-400' :
                                        row.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                                        'bg-green-500/20 text-green-400'}`}>
                        {row.risk}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">
                      {row.risk === 'Very High' || row.risk === 'High' ? 'Stop work - immediate action required' :
                       row.risk === 'Medium' ? 'Additional controls needed' :
                       'Monitor and review'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white">Control Measures</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={controlMeasures}
            onChange={(e) => setControlMeasures(e.target.value)}
            placeholder="Detail the specific control measures to be implemented for each identified hazard..."
            className="min-h-24 mb-4"
          />
        </CardContent>
      </Card>

      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-white">Additional Risk Assessment Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={riskNotes}
            onChange={(e) => setRiskNotes(e.target.value)}
            placeholder="Record any additional risk factors, monitoring requirements, or review schedules..."
            className="min-h-24 mb-4"
          />
          <Button className="w-full">
            Complete Risk Assessment
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessmentTab;
