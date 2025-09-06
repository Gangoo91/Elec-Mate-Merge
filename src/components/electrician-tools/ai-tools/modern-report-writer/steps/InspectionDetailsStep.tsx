import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { 
  ChevronLeft, 
  ChevronRight, 
  Search, 
  AlertTriangle, 
  CheckCircle2,
  Eye,
  TestTube,
  FileWarning,
  Lightbulb,
  Plus,
  X
} from "lucide-react";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { InspectionDetailsStepProps } from "../types";
import { useToast } from "@/hooks/use-toast";

interface FaultEntry {
  id: string;
  code: 'C1' | 'C2' | 'C3' | 'FI';
  description: string;
  location: string;
  recommendation: string;
}

const InspectionDetailsStep: React.FC<InspectionDetailsStepProps> = ({
  data,
  template,
  onDataChange,
  onNext,
  onBack
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(data);
  const [faults, setFaults] = useState<FaultEntry[]>(data.faults || []);
  const [showingFaultForm, setShowingFaultForm] = useState(false);
  const [newFault, setNewFault] = useState<Partial<FaultEntry>>({});

  // Form validation based on template
  const getRequiredFields = () => {
    const baseFields = ['extentOfInspection', 'overallAssessment'];
    
    if (template?.id === 'eicr') {
      return [...baseFields, 'faultsFound', 'inspectorName', 'inspectorQualification'];
    }
    if (template?.id === 'periodic-inspection') {
      return [...baseFields, 'inspectionType', 'overallCondition'];
    }
    return baseFields;
  };

  const requiredFields = getRequiredFields();
  const completedFields = requiredFields.filter(field => formData[field]?.trim()).length;
  const fieldProgress = (completedFields / requiredFields.length) * 100;
  const isFormValid = requiredFields.every(field => formData[field]?.trim());

  useEffect(() => {
    const updatedData = { ...formData, faults };
    onDataChange(updatedData);
  }, [formData, faults, onDataChange]);

  const updateField = (fieldId: string, value: string) => {
    setFormData(prev => ({ ...prev, [fieldId]: value }));
  };

  const addFault = () => {
    if (newFault.code && newFault.description && newFault.location) {
      const fault: FaultEntry = {
        id: Date.now().toString(),
        code: newFault.code!,
        description: newFault.description,
        location: newFault.location,
        recommendation: newFault.recommendation || ''
      };
      
      setFaults(prev => [...prev, fault]);
      setNewFault({});
      setShowingFaultForm(false);
      
      toast({
        title: "Fault added",
        description: `${fault.code} fault has been added to the report.`,
      });
    }
  };

  const removeFault = (faultId: string) => {
    setFaults(prev => prev.filter(f => f.id !== faultId));
    toast({
      title: "Fault removed",
      description: "Fault has been removed from the report.",
    });
  };

  const getFaultColor = (code: string) => {
    switch (code) {
      case 'C1': return 'bg-red-500/10 text-red-500 border-red-500/30';
      case 'C2': return 'bg-orange-500/10 text-orange-500 border-orange-500/30';
      case 'C3': return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30';
      case 'FI': return 'bg-blue-500/10 text-blue-500 border-blue-500/30';
      default: return 'bg-muted/10 text-muted-foreground border-muted/30';
    }
  };

  // Options for different templates
  const extentOptions = [
    { value: "100-visual-10-test", label: "100% Visual, 10% Testing" },
    { value: "100-visual-25-test", label: "100% Visual, 25% Testing" },
    { value: "100-visual-100-test", label: "100% Visual, 100% Testing" },
    { value: "limited-access", label: "Limited Access - Partial Inspection" },
    { value: "other", label: "Other (specify in limitations)" }
  ];

  const assessmentOptions = [
    { value: "satisfactory", label: "Satisfactory" },
    { value: "unsatisfactory", label: "Unsatisfactory" }
  ];

  const faultCodeOptions = [
    { value: "C1", label: "C1 - Danger Present", description: "Immediate action required" },
    { value: "C2", label: "C2 - Potentially Dangerous", description: "Urgent remedial action required" },
    { value: "C3", label: "C3 - Improvement Recommended", description: "Improvement recommended" },
    { value: "FI", label: "FI - Further Investigation", description: "Further investigation required" }
  ];

  const conditionOptions = [
    { value: "good", label: "Good - No issues found" },
    { value: "fair", label: "Fair - Minor issues identified" },
    { value: "poor", label: "Poor - Significant issues found" },
    { value: "dangerous", label: "Dangerous - Immediate action required" }
  ];

  const inspectionTypeOptions = [
    { value: "routine", label: "Routine Periodic Inspection" },
    { value: "change-of-occupancy", label: "Change of Occupancy" },
    { value: "alteration", label: "Following Alteration" },
    { value: "insurance", label: "Insurance Requirement" },
    { value: "other", label: "Other" }
  ];

  const qualificationOptions = [
    { value: "2391", label: "City & Guilds 2391" },
    { value: "2391-52", label: "City & Guilds 2391-52" },
    { value: "nvq-level-3", label: "NVQ Level 3 Electrical" },
    { value: "18th-edition", label: "18th Edition BS 7671" },
    { value: "am2", label: "AM2 Assessment" },
    { value: "other", label: "Other Qualification" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-elec-gray border-elec-yellow/30 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Inspection & Findings</h2>
            <p className="text-muted-foreground">
              Document your inspection findings and observations
            </p>
          </div>
          
          {/* Progress */}
          <div className="w-full sm:w-auto">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm text-muted-foreground">Progress:</span>
              <Badge variant="outline" className="text-elec-yellow border-elec-yellow/30">
                {Math.round(fieldProgress)}% Complete
              </Badge>
            </div>
            <Progress value={fieldProgress} className="w-full sm:w-48" />
          </div>
        </div>
      </Card>

      {/* Inspection Details */}
      <Card className="bg-elec-gray border-elec-yellow/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <Eye className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg font-medium text-white">Inspection Scope</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MobileSelectWrapper
            label="Extent of Inspection"
            placeholder="Select inspection extent"
            value={formData.extentOfInspection || ""}
            onValueChange={(value) => updateField('extentOfInspection', value)}
            options={extentOptions}
          />

          {template?.id === 'periodic-inspection' && (
            <MobileSelectWrapper
              label="Inspection Type"
              placeholder="Select inspection type"
              value={formData.inspectionType || ""}
              onValueChange={(value) => updateField('inspectionType', value)}
              options={inspectionTypeOptions}
            />
          )}
        </div>

        <div className="mt-4 space-y-2">
          <label className="text-sm font-medium text-white">Limitations</label>
          <Textarea
            placeholder="Enter any limitations encountered during inspection (e.g., areas not accessible, equipment not tested)"
            className="min-h-[80px] bg-elec-dark border-elec-yellow/30 text-white placeholder:text-muted-foreground focus:border-elec-yellow/50"
            value={formData.limitations || ""}
            onChange={(e) => updateField('limitations', e.target.value)}
          />
        </div>
      </Card>

      {/* Faults and Observations */}
      <Card className="bg-elec-gray border-elec-yellow/30 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileWarning className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-medium text-white">Faults & Observations</h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowingFaultForm(true)}
            className="border-elec-yellow/30 text-elec-yellow hover:bg-elec-yellow/10"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Fault
          </Button>
        </div>

        {/* Existing Faults */}
        {faults.length > 0 ? (
          <div className="space-y-3 mb-4">
            {faults.map((fault) => (
              <div
                key={fault.id}
                className="p-4 bg-elec-dark rounded-lg border border-elec-yellow/20"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge className={getFaultColor(fault.code)}>
                        {fault.code}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        {fault.location}
                      </span>
                    </div>
                    <p className="text-sm text-white mb-1">{fault.description}</p>
                    {fault.recommendation && (
                      <p className="text-xs text-muted-foreground">
                        Recommendation: {fault.recommendation}
                      </p>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFault(fault.id)}
                    className="text-red-400 hover:bg-red-500/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 border-2 border-dashed border-elec-yellow/20 rounded-lg">
            <CheckCircle2 className="h-8 w-8 text-green-500 mx-auto mb-2" />
            <p className="text-white font-medium">No faults recorded</p>
            <p className="text-sm text-muted-foreground">
              Add any faults or observations found during inspection
            </p>
          </div>
        )}

        {/* Add Fault Form */}
        {showingFaultForm && (
          <Card className="bg-elec-dark border-elec-yellow/30 p-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-white font-medium">Add New Fault</h4>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => {
                  setShowingFaultForm(false);
                  setNewFault({});
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <MobileSelectWrapper
                label="Fault Code"
                placeholder="Select fault code"
                value={newFault.code || ""}
                onValueChange={(value) => setNewFault(prev => ({ ...prev, code: value as any }))}
                options={faultCodeOptions}
              />
              
              <MobileInputWrapper
                label="Location"
                placeholder="e.g., Consumer unit, Kitchen, Bedroom 1"
                value={newFault.location || ""}
                onChange={(value) => setNewFault(prev => ({ ...prev, location: value }))}
              />
            </div>
            
            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium text-white">Description</label>
              <Textarea
                placeholder="Describe the fault or observation in detail"
                className="bg-elec-gray border-elec-yellow/30 text-white"
                value={newFault.description || ""}
                onChange={(e) => setNewFault(prev => ({ ...prev, description: e.target.value }))}
              />
            </div>
            
            <div className="mt-4 space-y-2">
              <label className="text-sm font-medium text-white">Recommendation</label>
              <Textarea
                placeholder="Recommended action to address this fault"
                className="bg-elec-gray border-elec-yellow/30 text-white"
                value={newFault.recommendation || ""}
                onChange={(e) => setNewFault(prev => ({ ...prev, recommendation: e.target.value }))}
              />
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowingFaultForm(false)}
                className="border-elec-yellow/30 text-white"
              >
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={addFault}
                disabled={!newFault.code || !newFault.description || !newFault.location}
                className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90"
              >
                Add Fault
              </Button>
            </div>
          </Card>
        )}
      </Card>

      {/* Overall Assessment */}
      <Card className="bg-elec-gray border-elec-yellow/30 p-6">
        <div className="flex items-center gap-2 mb-4">
          <TestTube className="h-5 w-5 text-elec-yellow" />
          <h3 className="text-lg font-medium text-white">Overall Assessment</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MobileSelectWrapper
            label="Overall Assessment"
            placeholder="Select assessment"
            value={formData.overallAssessment || ""}
            onValueChange={(value) => updateField('overallAssessment', value)}
            options={assessmentOptions}
          />

          {template?.id === 'periodic-inspection' && (
            <MobileSelectWrapper
              label="Overall Condition"
              placeholder="Select condition"
              value={formData.overallCondition || ""}
              onValueChange={(value) => updateField('overallCondition', value)}
              options={conditionOptions}
            />
          )}
        </div>

        <div className="mt-4 space-y-2">
          <label className="text-sm font-medium text-white">Recommended Actions</label>
          <Textarea
            placeholder="Enter any recommended actions or improvements"
            className="min-h-[80px] bg-elec-dark border-elec-yellow/30 text-white placeholder:text-muted-foreground focus:border-elec-yellow/50"
            value={formData.recommendedActions || ""}
            onChange={(e) => updateField('recommendedActions', e.target.value)}
          />
        </div>
      </Card>

      {/* Inspector Details (for EICR) */}
      {template?.id === 'eicr' && (
        <Card className="bg-elec-gray border-elec-yellow/30 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-medium text-white">Inspector Details</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MobileInputWrapper
              label="Inspector Name"
              placeholder="Enter inspector name"
              value={formData.inspectorName || ""}
              onChange={(value) => updateField('inspectorName', value)}
            />
            
            <MobileSelectWrapper
              label="Inspector Qualification"
              placeholder="Select qualification"
              value={formData.inspectorQualification || ""}
              onValueChange={(value) => updateField('inspectorQualification', value)}
              options={qualificationOptions}
            />
            
            <MobileInputWrapper
              label="Inspection Date"
              type="date"
              placeholder="Select inspection date"
              value={formData.inspectionDate || ""}
              onChange={(value) => updateField('inspectionDate', value)}
            />
          </div>
        </Card>
      )}

      {/* Navigation */}
      <Card className="bg-elec-gray border-elec-yellow/30 p-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Button
            variant="outline"
            onClick={onBack}
            className="border-elec-yellow/30 text-white hover:bg-elec-yellow/10 w-full sm:w-auto"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Client Details
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Step 3 of 4 • Inspection & Findings
            </p>
          </div>

          <Button
            onClick={onNext}
            disabled={!isFormValid}
            className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            Review & Generate
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default InspectionDetailsStep;
