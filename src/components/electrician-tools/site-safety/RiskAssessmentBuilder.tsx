
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Plus, Save, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface RiskFactor {
  id: string;
  category: string;
  description: string;
  likelihood: number;
  severity: number;
  riskLevel: string;
  controlMeasures: string[];
}

const RiskAssessmentBuilder = () => {
  const [riskFactors, setRiskFactors] = useState<RiskFactor[]>([]);
  const [currentRisk, setCurrentRisk] = useState<Partial<RiskFactor>>({
    category: "",
    description: "",
    likelihood: 1,
    severity: 1,
    controlMeasures: []
  });

  const riskCategories = [
    "Electrical Hazards",
    "Working at Height",
    "Manual Handling",
    "Chemical/Substances",
    "Fire/Explosion",
    "Environmental",
    "Equipment/Tools",
    "Human Factors"
  ];

  const calculateRiskLevel = (likelihood: number, severity: number) => {
    const score = likelihood * severity;
    if (score <= 4) return { level: "Low", color: "bg-green-500" };
    if (score <= 9) return { level: "Medium", color: "bg-yellow-500" };
    if (score <= 16) return { level: "High", color: "bg-orange-500" };
    return { level: "Very High", color: "bg-red-500" };
  };

  const addRiskFactor = () => {
    if (!currentRisk.category || !currentRisk.description) return;

    const riskLevel = calculateRiskLevel(currentRisk.likelihood || 1, currentRisk.severity || 1);
    
    const newRisk: RiskFactor = {
      id: Date.now().toString(),
      category: currentRisk.category,
      description: currentRisk.description,
      likelihood: currentRisk.likelihood || 1,
      severity: currentRisk.severity || 1,
      riskLevel: riskLevel.level,
      controlMeasures: currentRisk.controlMeasures || []
    };

    setRiskFactors(prev => [...prev, newRisk]);
    setCurrentRisk({
      category: "",
      description: "",
      likelihood: 1,
      severity: 1,
      controlMeasures: []
    });
  };

  const removeRiskFactor = (id: string) => {
    setRiskFactors(prev => prev.filter(risk => risk.id !== id));
  };

  const getRiskStats = () => {
    const total = riskFactors.length;
    const high = riskFactors.filter(r => r.riskLevel === "High" || r.riskLevel === "Very High").length;
    const medium = riskFactors.filter(r => r.riskLevel === "Medium").length;
    const low = riskFactors.filter(r => r.riskLevel === "Low").length;
    
    return { total, high, medium, low };
  };

  const stats = getRiskStats();

  return (
    <div className="space-y-6">
      {/* Risk Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-blue-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{stats.total}</div>
            <div className="text-sm text-muted-foreground">Total Risks</div>
          </CardContent>
        </Card>
        <Card className="border-red-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{stats.high}</div>
            <div className="text-sm text-muted-foreground">High Risk</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">{stats.medium}</div>
            <div className="text-sm text-muted-foreground">Medium Risk</div>
          </CardContent>
        </Card>
        <Card className="border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{stats.low}</div>
            <div className="text-sm text-muted-foreground">Low Risk</div>
          </CardContent>
        </Card>
      </div>

      {/* Add New Risk */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add Risk Factor
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="category">Risk Category</Label>
              <Select 
                value={currentRisk.category} 
                onValueChange={(value) => setCurrentRisk(prev => ({ ...prev, category: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {riskCategories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="description">Risk Description</Label>
              <Input
                id="description"
                value={currentRisk.description || ""}
                onChange={(e) => setCurrentRisk(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Describe the specific risk"
              />
            </div>
            <div>
              <Label htmlFor="likelihood">Likelihood (1-5)</Label>
              <Select 
                value={currentRisk.likelihood?.toString()} 
                onValueChange={(value) => setCurrentRisk(prev => ({ ...prev, likelihood: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select likelihood" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Very Unlikely</SelectItem>
                  <SelectItem value="2">2 - Unlikely</SelectItem>
                  <SelectItem value="3">3 - Possible</SelectItem>
                  <SelectItem value="4">4 - Likely</SelectItem>
                  <SelectItem value="5">5 - Very Likely</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="severity">Severity (1-5)</Label>
              <Select 
                value={currentRisk.severity?.toString()} 
                onValueChange={(value) => setCurrentRisk(prev => ({ ...prev, severity: parseInt(value) }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select severity" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 - Negligible</SelectItem>
                  <SelectItem value="2">2 - Minor</SelectItem>
                  <SelectItem value="3">3 - Moderate</SelectItem>
                  <SelectItem value="4">4 - Major</SelectItem>
                  <SelectItem value="5">5 - Catastrophic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          {currentRisk.likelihood && currentRisk.severity && (
            <div className="p-4 bg-elec-dark rounded-lg">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Risk Level:</span>
                <Badge className={calculateRiskLevel(currentRisk.likelihood, currentRisk.severity).color}>
                  {calculateRiskLevel(currentRisk.likelihood, currentRisk.severity).level}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  (Score: {currentRisk.likelihood * currentRisk.severity})
                </span>
              </div>
            </div>
          )}

          <Button onClick={addRiskFactor} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Risk Factor
          </Button>
        </CardContent>
      </Card>

      {/* Risk Factors List */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Identified Risk Factors ({riskFactors.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {riskFactors.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No risk factors identified yet. Add your first risk factor above.
            </div>
          ) : (
            <div className="space-y-4">
              {riskFactors.map((risk) => {
                const riskLevel = calculateRiskLevel(risk.likelihood, risk.severity);
                return (
                  <Card key={risk.id} className="border-elec-yellow/30">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline">{risk.category}</Badge>
                            <Badge className={riskLevel.color}>{risk.riskLevel}</Badge>
                          </div>
                          <p className="text-sm font-medium mb-2">{risk.description}</p>
                          <div className="flex gap-4 text-xs text-muted-foreground">
                            <span>Likelihood: {risk.likelihood}/5</span>
                            <span>Severity: {risk.severity}/5</span>
                            <span>Score: {risk.likelihood * risk.severity}</span>
                          </div>
                        </div>
                        <Button
                          onClick={() => removeRiskFactor(risk.id)}
                          size="sm"
                          variant="outline"
                        >
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {riskFactors.length > 0 && (
        <div className="flex gap-4">
          <Button className="flex-1">
            <Save className="h-4 w-4 mr-2" />
            Save Assessment
          </Button>
          <Button variant="outline">
            <Eye className="h-4 w-4 mr-2" />
            Preview Report
          </Button>
        </div>
      )}
    </div>
  );
};

export default RiskAssessmentBuilder;
