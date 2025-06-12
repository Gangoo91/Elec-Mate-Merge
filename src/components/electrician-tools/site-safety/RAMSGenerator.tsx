
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { FileText, Download, Plus, Trash2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface RAMSData {
  projectName: string;
  location: string;
  date: string;
  assessor: string;
  activities: string[];
  risks: Array<{
    id: string;
    hazard: string;
    risk: string;
    likelihood: number;
    severity: number;
    riskRating: number;
    controls: string;
    residualRisk: number;
  }>;
}

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

  const removeRisk = (id: string) => {
    setRAMSData(prev => ({
      ...prev,
      risks: prev.risks.filter(risk => risk.id !== id)
    }));
  };

  const getRiskColor = (rating: number) => {
    if (rating <= 4) return "text-green-400";
    if (rating <= 9) return "text-yellow-400";
    if (rating <= 16) return "text-orange-400";
    return "text-red-400";
  };

  const getRiskLevel = (rating: number) => {
    if (rating <= 4) return "Low";
    if (rating <= 9) return "Medium";
    if (rating <= 16) return "High";
    return "Very High";
  };

  const generateRAMS = () => {
    if (!ramsData.projectName || !ramsData.location || !ramsData.assessor) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields before generating RAMS",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "RAMS Generated",
      description: "Your Risk Assessment & Method Statement has been generated successfully"
    });
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
                            <Input
                              value={risk.hazard}
                              onChange={(e) => updateRisk(risk.id, 'hazard', e.target.value)}
                              placeholder="Describe the hazard"
                            />
                          </div>
                          <div>
                            <Label className="text-sm">Risk</Label>
                            <Input
                              value={risk.risk}
                              onChange={(e) => updateRisk(risk.id, 'risk', e.target.value)}
                              placeholder="Potential harm/consequence"
                            />
                          </div>
                        </div>
                        <Button
                          onClick={() => removeRisk(risk.id)}
                          size="sm"
                          variant="outline"
                          className="ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div>
                          <Label className="text-sm">Likelihood (1-5)</Label>
                          <Input
                            type="number"
                            min="1"
                            max="5"
                            value={risk.likelihood}
                            onChange={(e) => updateRisk(risk.id, 'likelihood', parseInt(e.target.value))}
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Severity (1-5)</Label>
                          <Input
                            type="number"
                            min="1"
                            max="5"
                            value={risk.severity}
                            onChange={(e) => updateRisk(risk.id, 'severity', parseInt(e.target.value))}
                          />
                        </div>
                        <div>
                          <Label className="text-sm">Risk Rating</Label>
                          <div className={`p-2 text-center font-bold ${getRiskColor(risk.riskRating)}`}>
                            {risk.riskRating} - {getRiskLevel(risk.riskRating)}
                          </div>
                        </div>
                        <div>
                          <Label className="text-sm">Residual Risk (1-25)</Label>
                          <Input
                            type="number"
                            min="1"
                            max="25"
                            value={risk.residualRisk}
                            onChange={(e) => updateRisk(risk.id, 'residualRisk', parseInt(e.target.value))}
                          />
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

          <div className="flex gap-4">
            <Button onClick={generateRAMS} className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Generate RAMS Document
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RAMSGenerator;
