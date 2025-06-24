
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calculator, Info } from "lucide-react";

interface RiskCalculationMatrixProps {
  hazard: string;
  onRiskCalculated: (likelihood: number, severity: number) => void;
}

const RiskCalculationMatrix = ({ hazard, onRiskCalculated }: RiskCalculationMatrixProps) => {
  const [selectedLikelihood, setSelectedLikelihood] = useState<number>(0);
  const [selectedSeverity, setSelectedSeverity] = useState<number>(0);

  const likelihoodScale = [
    { value: 1, label: "Very Unlikely", description: "Almost impossible, never heard of in the industry", color: "bg-green-400" },
    { value: 2, label: "Unlikely", description: "Possible but only in exceptional circumstances", color: "bg-green-500" },
    { value: 3, label: "Possible", description: "Might occur at some time, has happened elsewhere", color: "bg-yellow-500" },
    { value: 4, label: "Likely", description: "Will probably occur in most circumstances", color: "bg-orange-500" },
    { value: 5, label: "Very Likely", description: "Expected to occur frequently, common occurrence", color: "bg-red-500" }
  ];

  const severityScale = [
    { value: 1, label: "Negligible", description: "No injury, minimal equipment damage", color: "bg-green-400" },
    { value: 2, label: "Minor", description: "Minor injury requiring first aid, some equipment damage", color: "bg-green-500" },
    { value: 3, label: "Moderate", description: "Medical treatment required, significant equipment damage", color: "bg-yellow-500" },
    { value: 4, label: "Major", description: "Serious injury/illness, major equipment damage", color: "bg-orange-500" },
    { value: 5, label: "Catastrophic", description: "Death, permanent disability, total system failure", color: "bg-red-500" }
  ];

  const calculateRisk = () => {
    if (selectedLikelihood && selectedSeverity) {
      onRiskCalculated(selectedLikelihood, selectedSeverity);
    }
  };

  const getRiskLevel = (likelihood: number, severity: number): string => {
    const score = likelihood * severity;
    if (score >= 15) return "Very High";
    if (score >= 10) return "High";
    if (score >= 6) return "Medium";
    if (score >= 3) return "Low";
    return "Very Low";
  };

  const getRiskColor = (level: string): string => {
    switch (level) {
      case "Very High": return "bg-red-600";
      case "High": return "bg-red-500";
      case "Medium": return "bg-yellow-500";
      case "Low": return "bg-green-500";
      case "Very Low": return "bg-green-400";
      default: return "bg-gray-500";
    }
  };

  const currentRiskLevel = selectedLikelihood && selectedSeverity 
    ? getRiskLevel(selectedLikelihood, selectedSeverity)
    : "";

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Calculator className="h-5 w-5" />
            Risk Calculation Matrix
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Assessing: <span className="text-white font-medium">{hazard}</span>
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Likelihood Assessment */}
            <Card className="border-blue-500/20 bg-blue-500/10">
              <CardHeader>
                <CardTitle className="text-blue-300 text-lg">Likelihood Assessment</CardTitle>
                <p className="text-sm text-muted-foreground">
                  How likely is this hazard to cause harm?
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {likelihoodScale.map((item) => (
                  <div
                    key={item.value}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedLikelihood === item.value
                        ? 'border-elec-yellow bg-elec-yellow/20'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedLikelihood(item.value)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={`${item.color} text-white`}>{item.value}</Badge>
                        <span className="font-medium">{item.label}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Severity Assessment */}
            <Card className="border-orange-500/20 bg-orange-500/10">
              <CardHeader>
                <CardTitle className="text-orange-300 text-lg">Severity Assessment</CardTitle>
                <p className="text-sm text-muted-foreground">
                  How severe would the consequences be?
                </p>
              </CardHeader>
              <CardContent className="space-y-3">
                {severityScale.map((item) => (
                  <div
                    key={item.value}
                    className={`p-3 rounded-lg border cursor-pointer transition-all ${
                      selectedSeverity === item.value
                        ? 'border-elec-yellow bg-elec-yellow/20'
                        : 'border-gray-600 hover:border-gray-500'
                    }`}
                    onClick={() => setSelectedSeverity(item.value)}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={`${item.color} text-white`}>{item.value}</Badge>
                        <span className="font-medium">{item.label}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Risk Matrix Visualization */}
          {selectedLikelihood && selectedSeverity && (
            <Card className="border-purple-500/20 bg-purple-500/10 mt-6">
              <CardHeader>
                <CardTitle className="text-purple-300">Risk Matrix Result</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-6 gap-1 mb-4">
                  <div></div>
                  {[1, 2, 3, 4, 5].map(sev => (
                    <div key={sev} className="text-center text-xs p-1 font-medium">
                      Sev {sev}
                    </div>
                  ))}
                  {[5, 4, 3, 2, 1].map(lik => (
                    <>
                      <div key={lik} className="text-xs p-1 font-medium flex items-center">
                        Lik {lik}
                      </div>
                      {[1, 2, 3, 4, 5].map(sev => {
                        const score = lik * sev;
                        const level = getRiskLevel(lik, sev);
                        const isSelected = lik === selectedLikelihood && sev === selectedSeverity;
                        return (
                          <div
                            key={`${lik}-${sev}`}
                            className={`h-8 flex items-center justify-center text-xs font-medium text-white rounded ${
                              getRiskColor(level)
                            } ${isSelected ? 'ring-2 ring-elec-yellow' : ''}`}
                          >
                            {score}
                          </div>
                        );
                      })}
                    </>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Score</p>
                      <p className="text-2xl font-bold">{selectedLikelihood * selectedSeverity}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Risk Level</p>
                      <Badge className={`${getRiskColor(currentRiskLevel)} text-white`}>
                        {currentRiskLevel}
                      </Badge>
                    </div>
                  </div>
                  <Button onClick={calculateRisk} className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90">
                    Proceed to Control Measures
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Guidance */}
          <Card className="border-gray-600 bg-gray-800/50 mt-4">
            <CardHeader>
              <CardTitle className="text-gray-300 text-sm flex items-center gap-2">
                <Info className="h-4 w-4" />
                Assessment Guidance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-muted-foreground space-y-2">
                <p>• Consider the specific working conditions and environment</p>
                <p>• Factor in existing control measures when assessing likelihood</p>
                <p>• Think about worst-case but realistic scenarios for severity</p>
                <p>• Consider both immediate and long-term health effects</p>
              </div>
            </CardContent>
          </Card>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskCalculationMatrix;
