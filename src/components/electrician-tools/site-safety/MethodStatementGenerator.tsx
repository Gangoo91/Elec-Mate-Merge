
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ClipboardCheck, Plus, Trash2, Download } from "lucide-react";

interface MethodStep {
  id: string;
  stepNumber: number;
  description: string;
  safetyRequirements: string;
  equipmentNeeded: string;
  qualifications: string;
}

const MethodStatementGenerator = () => {
  const [methodData, setMethodData] = useState({
    jobTitle: "",
    location: "",
    contractor: "",
    supervisor: "",
    workType: "",
    duration: "",
    teamSize: ""
  });

  const [methodSteps, setMethodSteps] = useState<MethodStep[]>([]);

  const workTypes = [
    "Installation Work",
    "Maintenance",
    "Testing & Inspection", 
    "Repair Work",
    "Emergency Response",
    "Upgrade/Modification"
  ];

  const addMethodStep = () => {
    const newStep: MethodStep = {
      id: Date.now().toString(),
      stepNumber: methodSteps.length + 1,
      description: "",
      safetyRequirements: "",
      equipmentNeeded: "",
      qualifications: ""
    };
    setMethodSteps(prev => [...prev, newStep]);
  };

  const updateMethodStep = (id: string, field: keyof MethodStep, value: string) => {
    setMethodSteps(prev => 
      prev.map(step => 
        step.id === id ? { ...step, [field]: value } : step
      )
    );
  };

  const removeMethodStep = (id: string) => {
    setMethodSteps(prev => prev.filter(step => step.id !== id));
    // Renumber remaining steps
    setMethodSteps(prev => 
      prev.map((step, index) => ({ ...step, stepNumber: index + 1 }))
    );
  };

  const generateMethodStatement = () => {
    console.log("Generating method statement with:", { methodData, methodSteps });
    // Here you would typically generate a PDF or formatted document
  };

  return (
    <div className="space-y-6">
      {/* Job Information */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <CardTitle className="text-elec-yellow flex items-center gap-2">
            <ClipboardCheck className="h-5 w-5" />
            Method Statement Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={methodData.jobTitle}
                onChange={(e) => setMethodData(prev => ({ ...prev, jobTitle: e.target.value }))}
                placeholder="e.g., Consumer Unit Replacement"
              />
            </div>
            <div>
              <Label htmlFor="location">Site Location</Label>
              <Input
                id="location"
                value={methodData.location}
                onChange={(e) => setMethodData(prev => ({ ...prev, location: e.target.value }))}
                placeholder="Full site address"
              />
            </div>
            <div>
              <Label htmlFor="contractor">Contractor Company</Label>
              <Input
                id="contractor"
                value={methodData.contractor}
                onChange={(e) => setMethodData(prev => ({ ...prev, contractor: e.target.value }))}
                placeholder="Company name"
              />
            </div>
            <div>
              <Label htmlFor="supervisor">Site Supervisor</Label>
              <Input
                id="supervisor"
                value={methodData.supervisor}
                onChange={(e) => setMethodData(prev => ({ ...prev, supervisor: e.target.value }))}
                placeholder="Supervisor name"
              />
            </div>
            <div>
              <Label htmlFor="workType">Type of Work</Label>
              <Select 
                value={methodData.workType} 
                onValueChange={(value) => setMethodData(prev => ({ ...prev, workType: value }))}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select work type" />
                </SelectTrigger>
                <SelectContent>
                  {workTypes.map(type => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="duration">Estimated Duration</Label>
              <Input
                id="duration"
                value={methodData.duration}
                onChange={(e) => setMethodData(prev => ({ ...prev, duration: e.target.value }))}
                placeholder="e.g., 2 days"
              />
            </div>
            <div>
              <Label htmlFor="teamSize">Team Size</Label>
              <Input
                id="teamSize"
                value={methodData.teamSize}
                onChange={(e) => setMethodData(prev => ({ ...prev, teamSize: e.target.value }))}
                placeholder="Number of personnel"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Method Steps */}
      <Card className="border-elec-yellow/20 bg-elec-gray">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-elec-yellow flex items-center gap-2">
              Method Steps ({methodSteps.length})
            </CardTitle>
            <Button onClick={addMethodStep} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add Step
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          {methodSteps.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              No method steps added yet. Click "Add Step" to start building your method statement.
            </div>
          ) : (
            <div className="space-y-6">
              {methodSteps.map((step) => (
                <Card key={step.id} className="border-elec-yellow/30">
                  <CardContent className="p-4 space-y-4">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-elec-yellow">Step {step.stepNumber}</h4>
                      <Button
                        onClick={() => removeMethodStep(step.id)}
                        size="sm"
                        variant="outline"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <Label className="text-sm">Step Description</Label>
                        <Textarea
                          value={step.description}
                          onChange={(e) => updateMethodStep(step.id, 'description', e.target.value)}
                          placeholder="Describe what needs to be done in this step"
                          rows={3}
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Safety Requirements</Label>
                        <Textarea
                          value={step.safetyRequirements}
                          onChange={(e) => updateMethodStep(step.id, 'safetyRequirements', e.target.value)}
                          placeholder="PPE, isolation procedures, safety measures"
                          rows={2}
                        />
                      </div>
                      <div>
                        <Label className="text-sm">Equipment Needed</Label>
                        <Textarea
                          value={step.equipmentNeeded}
                          onChange={(e) => updateMethodStep(step.id, 'equipmentNeeded', e.target.value)}
                          placeholder="Tools, materials, equipment required"
                          rows={2}
                        />
                      </div>
                      <div className="md:col-span-2">
                        <Label className="text-sm">Required Qualifications/Competence</Label>
                        <Input
                          value={step.qualifications}
                          onChange={(e) => updateMethodStep(step.id, 'qualifications', e.target.value)}
                          placeholder="e.g., 18th Edition, Part P, AM2"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pre-defined Method Templates */}
      <Card className="border-blue-500/20 bg-blue-500/10">
        <CardHeader>
          <CardTitle className="text-blue-300">Quick Method Templates</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-start"
              onClick={() => {
                // Add predefined steps for consumer unit installation
                const cuSteps = [
                  "Isolate main supply and confirm dead",
                  "Remove existing consumer unit",
                  "Install new consumer unit and RCD protection",
                  "Connect circuits and test functionality",
                  "Complete testing and certification"
                ];
                // Implementation would add these as proper method steps
              }}
            >
              <div className="font-medium">Consumer Unit Replacement</div>
              <div className="text-xs text-muted-foreground">Standard 5-step process</div>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-start"
            >
              <div className="font-medium">Socket Installation</div>
              <div className="text-xs text-muted-foreground">New circuit installation</div>
            </Button>
            <Button 
              variant="outline" 
              className="h-auto p-4 flex flex-col items-start"
            >
              <div className="font-medium">Lighting Circuit</div>
              <div className="text-xs text-muted-foreground">New lighting installation</div>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generate Method Statement */}
      {methodSteps.length > 0 && (
        <div className="flex gap-4">
          <Button onClick={generateMethodStatement} className="flex-1">
            <ClipboardCheck className="h-4 w-4 mr-2" />
            Generate Method Statement
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      )}
    </div>
  );
};

export default MethodStatementGenerator;
