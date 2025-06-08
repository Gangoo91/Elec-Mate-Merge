
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, CheckSquare, FileText, Shield, Users, ClipboardList } from "lucide-react";
import { useState } from "react";

const RiskAssessmentTab = () => {
  const [identifiedHazards, setIdentifiedHazards] = useState<string[]>([]);
  const [controlMeasures, setControlMeasures] = useState("");
  const [riskNotes, setRiskNotes] = useState("");

  const hazardTypes = [
    { name: "Electrical shock", severity: "High", category: "electrical", likelihood: "Possible" },
    { name: "Arc flash/blast", severity: "High", category: "electrical", likelihood: "Unlikely" },
    { name: "Working at height", severity: "Medium", category: "physical", likelihood: "Likely" },
    { name: "Manual handling", severity: "Medium", category: "physical", likelihood: "Very Likely" },
    { name: "Dust inhalation", severity: "Low", category: "health", likelihood: "Possible" },
    { name: "Noise exposure", severity: "Medium", category: "health", likelihood: "Likely" },
    { name: "Confined spaces", severity: "High", category: "environmental", likelihood: "Unlikely" },
    { name: "Fire/explosion risk", severity: "High", category: "environmental", likelihood: "Unlikely" },
    { name: "Chemical exposure", severity: "Medium", category: "health", likelihood: "Possible" },
    { name: "Cuts from tools/materials", severity: "Medium", category: "physical", likelihood: "Likely" },
    { name: "Eye injury from debris", severity: "Medium", category: "physical", likelihood: "Possible" },
    { name: "Slips, trips and falls", severity: "Medium", category: "physical", likelihood: "Likely" }
  ];

  const riskMatrix = [
    { probability: "Very Unlikely", impact: "Minor", risk: "Very Low", color: "green", action: "Accept risk - monitor regularly" },
    { probability: "Unlikely", impact: "Moderate", risk: "Low", color: "green", action: "Accept risk - review annually" },
    { probability: "Possible", impact: "Major", risk: "Medium", color: "orange", action: "Additional controls required" },
    { probability: "Likely", impact: "Severe", risk: "High", color: "red", action: "Immediate action required" },
    { probability: "Very Likely", impact: "Catastrophic", risk: "Very High", color: "red", action: "Stop work immediately" }
  ];

  const controlMeasureExamples = [
    {
      hazard: "Electrical Shock",
      hierarchy: [
        { level: "Elimination", example: "Use battery-powered tools where possible" },
        { level: "Substitution", example: "Use lower voltage equipment" },
        { level: "Engineering", example: "Install RCD protection" },
        { level: "Administrative", example: "Safe isolation procedures" },
        { level: "PPE", example: "Insulated gloves and tools" }
      ]
    },
    {
      hazard: "Working at Height",
      hierarchy: [
        { level: "Elimination", example: "Work from ground level where possible" },
        { level: "Substitution", example: "Use extension tools" },
        { level: "Engineering", example: "Install scaffold or platforms" },
        { level: "Administrative", example: "Height work training and permits" },
        { level: "PPE", example: "Safety harness and hard hat" }
      ]
    }
  ];

  const riskAssessmentSteps = [
    { step: 1, title: "Identify Hazards", description: "Systematically identify all potential hazards in the work environment" },
    { step: 2, title: "Identify People at Risk", description: "Consider workers, visitors, public, and vulnerable groups" },
    { step: 3, title: "Evaluate Risks", description: "Assess likelihood and severity of potential harm" },
    { step: 4, title: "Record Findings", description: "Document significant findings and control measures" },
    { step: 5, title: "Review and Update", description: "Regularly review and update the assessment" }
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
            This process is required under the Management of Health and Safety at Work Regulations 1999.
          </p>
        </CardContent>
      </Card>

      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300 flex items-center gap-2">
            <ClipboardList className="h-5 w-5" />
            Risk Assessment Process
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {riskAssessmentSteps.map((step, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border border-blue-400/20 rounded-lg">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                <div>
                  <h4 className="font-semibold text-white">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
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
                <div className="flex gap-1">
                  <Badge className={getSeverityColor(hazard.severity)} variant="outline">
                    {hazard.severity}
                  </Badge>
                </div>
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
                                        'bg-green-500/20 text-green-400'}`}>
                        {row.risk}
                      </Badge>
                    </td>
                    <td className="p-3 text-sm text-muted-foreground">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/20 bg-green-500/10">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Control Measures Hierarchy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">
            Apply control measures in order of effectiveness (most effective first):
          </p>
          <div className="space-y-4">
            {controlMeasureExamples.map((example, index) => (
              <div key={index} className="border border-green-400/20 rounded-lg p-4">
                <h4 className="font-semibold text-white mb-3">{example.hazard} - Control Hierarchy</h4>
                <div className="space-y-2">
                  {example.hierarchy.map((control, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2 bg-green-500/5 rounded">
                      <Badge variant="outline" className="text-green-300 border-green-300">
                        {idx + 1}
                      </Badge>
                      <div>
                        <span className="font-medium text-green-200">{control.level}:</span>
                        <span className="text-sm text-muted-foreground ml-2">{control.example}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
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
            placeholder="Detail the specific control measures to be implemented for each identified hazard, following the hierarchy of controls..."
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
            placeholder="Record any additional risk factors, monitoring requirements, review schedules, or specific considerations for this work activity..."
            className="min-h-24 mb-4"
          />
          <Button className="w-full">
            Complete Risk Assessment
          </Button>
        </CardContent>
      </Card>

      <Card className="border-purple-500/50 bg-purple-500/10">
        <CardHeader>
          <CardTitle className="text-purple-300 flex items-center gap-2">
            <Users className="h-5 w-5" />
            People at Risk
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-2">
            Consider all people who may be affected by the work:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li>• Workers directly involved in the electrical work</li>
            <li>• Other trades working in the same area</li>
            <li>• Building occupants and visitors</li>
            <li>• Members of the public</li>
            <li>• Vulnerable groups (elderly, disabled, children)</li>
            <li>• Emergency service personnel</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessmentTab;
