
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { AlertTriangle, Plus, Save, Eye, X, Edit3, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { HazardSelect } from "./common/HazardSelect";
import { hazardCategories } from "@/data/hazards";

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
  const [showAddForm, setShowAddForm] = useState(false);
  const [currentRisk, setCurrentRisk] = useState<Partial<RiskFactor>>({
    category: "",
    description: "",
    likelihood: 1,
    severity: 1,
    controlMeasures: []
  });

  const riskCategories = hazardCategories.map(cat => cat.name);

  // Use realistic risk ratings from enhanced database
  const hazardTemplates = hazardCategories.map(cat => ({
    category: cat.name,
    defaultLikelihood: cat.name === "Electrical Hazards" ? 3 :
                      cat.name === "Working at Height" ? 3 :
                      cat.name === "Asbestos & Hazardous Materials" ? 2 :
                      cat.name === "Manual Handling" ? 4 :
                      cat.name === "Fire & Explosion" ? 2 :
                      cat.name === "Environmental" ? 3 :
                      cat.name === "Tools & Equipment" ? 3 : 3,
    defaultSeverity: cat.name === "Electrical Hazards" ? 4 :
                    cat.name === "Working at Height" ? 5 :
                    cat.name === "Asbestos & Hazardous Materials" ? 5 :
                    cat.name === "Manual Handling" ? 3 :
                    cat.name === "Fire & Explosion" ? 5 :
                    cat.name === "Environmental" ? 3 :
                    cat.name === "Tools & Equipment" ? 3 : 3
  }));

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
    setShowAddForm(false); // Hide form after adding
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
      {/* Page Header with Description */}
      <Card className="border-elec-yellow/20 bg-elec-gray/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Risk Assessment Builder
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Build comprehensive risk assessments for electrical work using the 5x5 risk matrix methodology
          </p>
        </CardHeader>
      </Card>

      {/* Risk Statistics - Mobile Optimized */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="border-blue-500/30 bg-elec-gray/50 hover:bg-elec-gray/70 transition-colors">
          <CardContent className="p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-blue-400">{stats.total}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Total Risks</div>
          </CardContent>
        </Card>
        <Card className="border-red-500/30 bg-elec-gray/50 hover:bg-elec-gray/70 transition-colors">
          <CardContent className="p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-red-400">{stats.high}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">High Risk</div>
          </CardContent>
        </Card>
        <Card className="border-yellow-500/30 bg-elec-gray/50 hover:bg-elec-gray/70 transition-colors">
          <CardContent className="p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-yellow-400">{stats.medium}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Medium Risk</div>
          </CardContent>
        </Card>
        <Card className="border-green-500/30 bg-elec-gray/50 hover:bg-elec-gray/70 transition-colors">
          <CardContent className="p-4 text-center">
            <div className="text-xl sm:text-2xl font-bold text-green-400">{stats.low}</div>
            <div className="text-xs sm:text-sm text-muted-foreground">Low Risk</div>
          </CardContent>
        </Card>
      </div>

      {/* Add Risk Button */}
      {!showAddForm && (
        <Card className="border-elec-yellow/20 bg-elec-gray/60">
          <CardContent className="p-6">
            <Button 
              onClick={() => setShowAddForm(true)}
              className="w-full bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 h-12"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add New Risk Factor
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Add New Risk Form - Progressive Disclosure */}
      {showAddForm && (
        <Card className="border-elec-yellow/20 bg-elec-gray/80 backdrop-blur-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-elec-yellow flex items-center gap-2">
                <Edit3 className="h-5 w-5" />
                Add Risk Factor
              </CardTitle>
              <Button
                onClick={() => setShowAddForm(false)}
                size="sm"
                variant="outline"
                className="border-elec-yellow/30 text-muted-foreground hover:bg-elec-yellow/10"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Form Fields - Stacked on Mobile */}
            <div className="space-y-4">
              {/* Hazard Template Selection */}
              <div>
                <Label className="text-white text-sm font-medium">Hazard Template (Optional)</Label>
                <Select 
                  onValueChange={(value) => {
                    const template = hazardTemplates.find(t => t.category === value);
                    if (template) {
                      setCurrentRisk(prev => ({ 
                        ...prev, 
                        category: template.category,
                        likelihood: template.defaultLikelihood,
                        severity: template.defaultSeverity
                      }));
                    }
                  }}
                >
                  <SelectTrigger className="mt-2 bg-elec-dark/50 border-elec-yellow/20 focus:border-elec-yellow/50">
                    <SelectValue placeholder="Choose a hazard template for suggested defaults" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/95 backdrop-blur-sm border-elec-yellow/20 z-50">
                    {hazardTemplates.map(template => (
                      <SelectItem key={template.category} value={template.category}>
                        {template.category} (L:{template.defaultLikelihood} S:{template.defaultSeverity})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Risk Category */}
              <div>
                <Label htmlFor="category" className="text-white text-sm font-medium">Risk Category</Label>
                <Select 
                  value={currentRisk.category} 
                  onValueChange={(value) => setCurrentRisk(prev => ({ ...prev, category: value }))}
                >
                  <SelectTrigger className="mt-2 bg-elec-dark/50 border-elec-yellow/20 focus:border-elec-yellow/50">
                    <SelectValue placeholder="Select risk category" />
                  </SelectTrigger>
                  <SelectContent className="bg-background/95 backdrop-blur-sm border-elec-yellow/20 z-50">
                    {riskCategories.map(category => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Hazard Selection */}
              <div>
                <Label className="text-white text-sm font-medium">Specific Hazard</Label>
                <HazardSelect
                  value={currentRisk.description || ""}
                  onValueChange={(value) => setCurrentRisk(prev => ({ ...prev, description: value }))}
                  placeholder="Select or search for specific hazards..."
                  className="mt-2"
                  showQuickPicks={false}
                />
              </div>

              {/* Likelihood and Severity - Side by Side on Larger Screens */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="likelihood" className="text-white text-sm font-medium">Likelihood (1-5)</Label>
                  <Select 
                    value={currentRisk.likelihood?.toString()} 
                    onValueChange={(value) => setCurrentRisk(prev => ({ ...prev, likelihood: parseInt(value) }))}
                  >
                    <SelectTrigger className="mt-2 bg-elec-dark/50 border-elec-yellow/20 focus:border-elec-yellow/50">
                      <SelectValue placeholder="Select likelihood" />
                    </SelectTrigger>
                    <SelectContent className="bg-background/95 backdrop-blur-sm border-elec-yellow/20 z-50">
                      <SelectItem value="1">1 - Very Unlikely</SelectItem>
                      <SelectItem value="2">2 - Unlikely</SelectItem>
                      <SelectItem value="3">3 - Possible</SelectItem>
                      <SelectItem value="4">4 - Likely</SelectItem>
                      <SelectItem value="5">5 - Very Likely</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="severity" className="text-white text-sm font-medium">Severity (1-5)</Label>
                  <Select 
                    value={currentRisk.severity?.toString()} 
                    onValueChange={(value) => setCurrentRisk(prev => ({ ...prev, severity: parseInt(value) }))}
                  >
                    <SelectTrigger className="mt-2 bg-elec-dark/50 border-elec-yellow/20 focus:border-elec-yellow/50">
                      <SelectValue placeholder="Select severity" />
                    </SelectTrigger>
                    <SelectContent className="bg-background/95 backdrop-blur-sm border-elec-yellow/20 z-50">
                      <SelectItem value="1">1 - Negligible</SelectItem>
                      <SelectItem value="2">2 - Minor</SelectItem>
                      <SelectItem value="3">3 - Moderate</SelectItem>
                      <SelectItem value="4">4 - Major</SelectItem>
                      <SelectItem value="5">5 - Catastrophic</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Risk Level Preview */}
              {currentRisk.likelihood && currentRisk.severity && (
                <div className="p-4 bg-elec-dark/50 rounded-lg border border-elec-yellow/20">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                    <span className="text-sm text-muted-foreground">Risk Level:</span>
                    <Badge className={`${calculateRiskLevel(currentRisk.likelihood, currentRisk.severity).color} text-white`}>
                      {calculateRiskLevel(currentRisk.likelihood, currentRisk.severity).level}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      (Score: {currentRisk.likelihood * currentRisk.severity}/25)
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <Button 
                onClick={addRiskFactor} 
                className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
                disabled={!currentRisk.category || !currentRisk.description}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Risk Factor
              </Button>
              <Button
                onClick={() => setShowAddForm(false)}
                variant="outline"
                className="border-elec-yellow/30 text-muted-foreground hover:bg-elec-yellow/10"
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Risk Factors List */}
      <Card className="border-elec-yellow/20 bg-elec-gray/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <AlertTriangle className="h-5 w-5" />
            Identified Risk Factors ({riskFactors.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {riskFactors.length === 0 ? (
            <div className="text-center py-12">
              <AlertTriangle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground mb-2">No risk factors identified yet</p>
              <p className="text-sm text-muted-foreground">Add your first risk factor to begin the assessment</p>
            </div>
          ) : (
            <div className="space-y-4">
              {riskFactors.map((risk) => {
                const riskLevel = calculateRiskLevel(risk.likelihood, risk.severity);
                return (
                  <Card key={risk.id} className="border-elec-yellow/30 bg-elec-gray/40 hover:bg-elec-gray/60 transition-colors">
                    <CardContent className="p-4">
                      {/* Mobile-Optimized Layout */}
                      <div className="space-y-3">
                        {/* Header Row */}
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 space-y-2">
                            <div className="flex flex-wrap items-center gap-2">
                              <Badge 
                                variant="outline" 
                                className="border-elec-yellow/30 text-muted-foreground text-xs"
                              >
                                {risk.category}
                              </Badge>
                              <Badge className={`${riskLevel.color} text-white text-xs`}>
                                {risk.riskLevel}
                              </Badge>
                            </div>
                            <p className="text-sm sm:text-base font-medium text-white leading-relaxed">
                              {risk.description}
                            </p>
                          </div>
                          <Button
                            onClick={() => removeRiskFactor(risk.id)}
                            size="sm"
                            variant="outline"
                            className="border-red-500/30 text-red-400 hover:bg-red-500/10 flex-shrink-0"
                          >
                            <X className="h-4 w-4 sm:mr-1" />
                            <span className="hidden sm:inline">Remove</span>
                          </Button>
                        </div>

                        {/* Risk Metrics */}
                        <div className="grid grid-cols-3 gap-4 p-3 bg-elec-dark/30 rounded-lg">
                          <div className="text-center">
                            <div className="text-sm font-medium text-muted-foreground">Likelihood</div>
                            <div className="text-lg font-bold text-white">{risk.likelihood}/5</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium text-muted-foreground">Severity</div>
                            <div className="text-lg font-bold text-white">{risk.severity}/5</div>
                          </div>
                          <div className="text-center">
                            <div className="text-sm font-medium text-muted-foreground">Score</div>
                            <div className="text-lg font-bold text-elec-yellow">{risk.likelihood * risk.severity}</div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons - Only show when risks exist */}
      {riskFactors.length > 0 && (
        <Card className="border-elec-yellow/20 bg-elec-gray/60">
          <CardContent className="p-4">
            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 h-12">
                <Save className="h-4 w-4 mr-2" />
                Save Assessment
              </Button>
              <Button 
                variant="outline" 
                className="flex-1 border-elec-yellow/30 text-muted-foreground hover:bg-elec-yellow/10 h-12"
              >
                <Eye className="h-4 w-4 mr-2" />
                Preview Report
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Safety Best Practices - Bottom Section */}
      <Card className="border-green-500/30 bg-green-500/5">
        <CardHeader>
          <CardTitle className="text-green-300 flex items-center gap-2 text-lg">
            <Shield className="h-5 w-5" />
            Safety Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 text-sm">
            <div>
              <h4 className="font-medium text-green-300 mb-3">Risk Assessment Process:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  Identify all potential hazards on site
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  Assess likelihood and severity objectively
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  Prioritise high-risk items first
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  Review assessments regularly
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-green-300 mb-3">UK Compliance:</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  Follow CDM Regulations 2015
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  Comply with BS 7671 requirements
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  Document all risk assessments
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-green-400 mt-1">•</span>
                  Share with all team members
                </li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RiskAssessmentBuilder;
