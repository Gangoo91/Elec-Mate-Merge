
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Plus, Trash2, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { HazardSelect } from "./common/HazardSelect";
import { RiskSelect } from "./common/RiskSelect";
import { RAMSData } from "@/types/rams";
import { generateRAMSPDF } from "@/utils/rams-pdf";

const RAMSGenerator = () => {
  const [ramsData, setRAMSData] = useState<RAMSData>({
    projectName: "",
    location: "",
    date: new Date().toISOString().split('T')[0],
    assessor: "",
    activities: [""],
    risks: []
  });

  const addActivity = () => {
    setRAMSData(prev => ({
      ...prev,
      activities: [...prev.activities, ""]
    }));
  };

  const updateActivity = (index: number, value: string) => {
    setRAMSData(prev => ({
      ...prev,
      activities: prev.activities.map((activity, i) => i === index ? value : activity)
    }));
  };

  const removeActivity = (index: number) => {
    setRAMSData(prev => ({
      ...prev,
      activities: prev.activities.filter((_, i) => i !== index)
    }));
  };

  const addRisk = () => {
    const newRisk = {
      id: Date.now().toString(),
      hazard: "",
      risk: "",
      likelihood: 1,
      severity: 1,
      riskRating: 1,
      controls: "",
      residualRisk: 1
    };
    setRAMSData(prev => ({
      ...prev,
      risks: [...prev.risks, newRisk]
    }));
  };

  const duplicateRisk = (riskId: string) => {
    const riskToDuplicate = ramsData.risks.find(r => r.id === riskId);
    if (riskToDuplicate) {
      const duplicatedRisk = {
        ...riskToDuplicate,
        id: Date.now().toString(),
        hazard: `${riskToDuplicate.hazard} (Copy)`
      };
      setRAMSData(prev => ({
        ...prev,
        risks: [...prev.risks, duplicatedRisk]
      }));
      toast({
        title: "Risk Duplicated",
        description: "Risk assessment row has been duplicated successfully"
      });
    }
  };

  const updateRisk = (id: string, field: string, value: any) => {
    setRAMSData(prev => ({
      ...prev,
      risks: prev.risks.map(risk => {
        if (risk.id === id) {
          const updatedRisk = { ...risk, [field]: value };
          if (field === 'likelihood' || field === 'severity') {
            updatedRisk.riskRating = updatedRisk.likelihood * updatedRisk.severity;
          }
          return updatedRisk;
        }
        return risk;
      })
    }));
  };

  const updateRiskControlMeasures = (id: string, controlMeasures: string[]) => {
    const suggestedControls = controlMeasures.join('\n• ');
    updateRisk(id, 'controls', `• ${suggestedControls}`);
  };

  const removeRisk = (id: string) => {
    setRAMSData(prev => ({
      ...prev,
      risks: prev.risks.filter(risk => risk.id !== id)
    }));
  };

  const getRiskColor = (rating: number) => {
    if (rating <= 4) return "bg-green-500/20 text-green-400 border-green-500/30";
    if (rating <= 9) return "bg-amber-500/20 text-amber-400 border-amber-500/30";
    if (rating <= 16) return "bg-orange-500/20 text-orange-400 border-orange-500/30";
    return "bg-red-500/20 text-red-400 border-red-500/30";
  };

  const getRiskLevel = (rating: number) => {
    if (rating <= 4) return "Low";
    if (rating <= 9) return "Medium";
    if (rating <= 16) return "High";
    return "Very High";
  };

  const getLikelihoodDescription = (level: number) => {
    const descriptions = [
      "", 
      "Very Unlikely - Rare occurrence",
      "Unlikely - Could happen occasionally", 
      "Possible - Might happen sometimes",
      "Likely - Will probably happen",
      "Very Likely - Expected to happen regularly"
    ];
    return descriptions[level] || "";
  };

  const getSeverityDescription = (level: number) => {
    const descriptions = [
      "",
      "Negligible - Minor bruising or discomfort",
      "Minor - First aid treatment required", 
      "Moderate - Medical treatment required",
      "Major - Serious injury, hospitalisation",
      "Catastrophic - Fatality or permanent disability"
    ];
    return descriptions[level] || "";
  };

  const validateRAMSData = () => {
    const errors = [];
    
    if (!ramsData.projectName.trim()) errors.push("Project Name");
    if (!ramsData.location.trim()) errors.push("Location");
    if (!ramsData.assessor.trim()) errors.push("Assessor Name");
    if (ramsData.activities.filter(a => a.trim()).length === 0) errors.push("At least one Work Activity");
    if (ramsData.risks.length === 0) errors.push("At least one Risk Assessment");
    
    const incompleteRisks = ramsData.risks.filter(risk => 
      !risk.hazard.trim() || !risk.risk.trim() || !risk.controls.trim()
    );
    if (incompleteRisks.length > 0) errors.push(`${incompleteRisks.length} incomplete risk assessment(s)`);
    
    return errors;
  };

  const generateRAMS = () => {
    const errors = validateRAMSData();
    
    if (errors.length > 0) {
      toast({
        title: "Validation Failed",
        description: `Please complete: ${errors.join(", ")}`,
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "RAMS Generated",
      description: "Your Risk Assessment & Method Statement has been generated successfully"
    });
  };

  const exportToPDF = () => {
    const errors = validateRAMSData();
    
    if (errors.length > 0) {
      toast({
        title: "Cannot Export PDF",
        description: `Please complete: ${errors.join(", ")}`,
        variant: "destructive"
      });
      return;
    }

    try {
      generateRAMSPDF(ramsData);
      toast({
        title: "PDF Exported",
        description: "Your RAMS document has been downloaded successfully",
        variant: "success"
      });
    } catch (error) {
      console.error("PDF generation error:", error);
      toast({
        title: "Export Failed",
        description: "There was an error generating the PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <FileText className="h-5 w-5" />
            RAMS Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Project Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="projectName">Project Name *</Label>
              <Input
                id="projectName"
                value={ramsData.projectName}
                onChange={(e) => setRAMSData(prev => ({ ...prev, projectName: e.target.value }))}
                placeholder="Enter project name"
              />
            </div>
            <div>
              <Label htmlFor="location">Location *</Label>
              <Input
                id="location"
                value={ramsData.location}
                onChange={(e) => setRAMSData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Site location"
              />
            </div>
            <div>
              <Label htmlFor="date">Assessment Date</Label>
              <Input
                id="date"
                type="date"
                value={ramsData.date}
                onChange={(e) => setRAMSData(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="assessor">Assessor Name *</Label>
              <Input
                id="assessor"
                value={ramsData.assessor}
                onChange={(e) => setRAMSData(prev => ({ ...prev, assessor: e.target.value }))}
                placeholder="Name of person conducting assessment"
              />
            </div>
          </div>

          {/* Activities Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="text-lg">Work Activities</Label>
              <Button onClick={addActivity} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Activity
              </Button>
            </div>
            <div className="space-y-3">
              {ramsData.activities.map((activity, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    value={activity}
                    onChange={(e) => updateActivity(index, e.target.value)}
                    placeholder={`Activity ${index + 1}`}
                  />
                  {ramsData.activities.length > 1 && (
                    <Button
                      onClick={() => removeActivity(index)}
                      size="sm"
                      variant="outline"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Risk Assessment Section */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <Label className="text-lg">Risk Assessment</Label>
              <Button onClick={addRisk} size="sm" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Add Risk
              </Button>
            </div>
            
            {ramsData.risks.length === 0 ? (
              <Card className="border-dashed border-elec-yellow/50">
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">No risks added yet. Click "Add Risk" to start your assessment.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {ramsData.risks.map((risk) => (
                  <Card key={risk.id} className="border-elec-yellow/30">
                    <CardContent className="p-4 space-y-4">
                      <div className="flex justify-between items-start">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
                          <div>
                            <Label className="text-sm">Hazard</Label>
                            <HazardSelect
                              value={risk.hazard}
                              onValueChange={(value) => updateRisk(risk.id, 'hazard', value)}
                              placeholder="Select or search hazards..."
                              showQuickPicks={false}
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Risk / Consequence</Label>
                            <RiskSelect
                              selectedHazard={risk.hazard}
                              value={risk.risk}
                              onValueChange={(value) => updateRisk(risk.id, 'risk', value)}
                              onControlMeasuresChange={(controlMeasures) => updateRiskControlMeasures(risk.id, controlMeasures)}
                              placeholder="Select potential consequence..."
                            />
                          </div>
                        </div>
                        <div className="flex gap-2 ml-2">
                          <Button
                            onClick={() => duplicateRisk(risk.id)}
                            size="sm"
                            variant="outline"
                            title="Duplicate this risk"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            onClick={() => removeRisk(risk.id)}
                            size="sm"
                            variant="outline"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-sm">Likelihood</Label>
                          <Select 
                            value={risk.likelihood.toString()} 
                            onValueChange={(value) => updateRisk(risk.id, 'likelihood', parseInt(value))}
                          >
                            <SelectTrigger className="bg-background/80 backdrop-blur-sm border-elec-yellow/20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-background/95 backdrop-blur-sm border-elec-yellow/20 z-50">
                              <SelectItem value="1">1 - Very Unlikely</SelectItem>
                              <SelectItem value="2">2 - Unlikely</SelectItem>
                              <SelectItem value="3">3 - Possible</SelectItem>
                              <SelectItem value="4">4 - Likely</SelectItem>
                              <SelectItem value="5">5 - Very Likely</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground mt-1">
                            {getLikelihoodDescription(risk.likelihood)}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm">Severity</Label>
                          <Select 
                            value={risk.severity.toString()} 
                            onValueChange={(value) => updateRisk(risk.id, 'severity', parseInt(value))}
                          >
                            <SelectTrigger className="bg-background/80 backdrop-blur-sm border-elec-yellow/20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-background/95 backdrop-blur-sm border-elec-yellow/20 z-50">
                              <SelectItem value="1">1 - Negligible</SelectItem>
                              <SelectItem value="2">2 - Minor</SelectItem>
                              <SelectItem value="3">3 - Moderate</SelectItem>
                              <SelectItem value="4">4 - Major</SelectItem>
                              <SelectItem value="5">5 - Catastrophic</SelectItem>
                            </SelectContent>
                          </Select>
                          <p className="text-xs text-muted-foreground mt-1">
                            {getSeverityDescription(risk.severity)}
                          </p>
                        </div>
                        <div>
                          <Label className="text-sm">Risk Rating</Label>
                          <div className="mt-2">
                            <Badge className={`${getRiskColor(risk.riskRating)} bg-opacity-20 text-sm font-bold`}>
                              {risk.riskRating} - {getRiskLevel(risk.riskRating)}
                            </Badge>
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm">Residual Risk</Label>
                          <Select 
                            value={risk.residualRisk.toString()} 
                            onValueChange={(value) => updateRisk(risk.id, 'residualRisk', parseInt(value))}
                          >
                            <SelectTrigger className="bg-background/80 backdrop-blur-sm border-elec-yellow/20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent className="bg-background/95 backdrop-blur-sm border-elec-yellow/20 z-50">
                              {[1,2,3,4,5,6,7,8,9,10,12,15,16,20,25].map(val => (
                                <SelectItem key={val} value={val.toString()}>
                                  {val} - {getRiskLevel(val)}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      
                      <div>
                        <Label className="text-sm">Control Measures</Label>
                        <Textarea
                          value={risk.controls}
                          onChange={(e) => updateRisk(risk.id, 'controls', e.target.value)}
                          placeholder="Describe control measures to mitigate this risk"
                          rows={3}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          {/* Mobile-First Action Buttons */}
          <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-4">
            <Button onClick={generateRAMS} className="w-full sm:flex-1 h-12 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 font-medium">
              <FileText className="h-4 w-4 mr-2" />
              Generate RAMS Document
            </Button>
            <Button 
              onClick={exportToPDF}
              variant="outline" 
              className="w-full sm:w-auto h-12 border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/10 font-medium px-6"
            >
              <Download className="h-4 w-4 mr-2" />
              <span className="hidden sm:inline">Export PDF</span>
              <span className="sm:hidden">Export</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RAMSGenerator;
