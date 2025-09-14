import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  ChevronLeft, 
  ChevronRight, 
  User, 
  MapPin, 
  Phone, 
  Calendar,
  CheckCircle2,
  AlertCircle,
  Lightbulb
} from "lucide-react";
import { MobileInputWrapper } from "@/components/ui/mobile-input-wrapper";
import { MobileSelectWrapper } from "@/components/ui/mobile-select-wrapper";
import { ClientDetailsStepProps } from "../types";
import { useToast } from "@/hooks/use-toast";

// AI-powered suggestions for common values
const getAISuggestions = (fieldId: string, currentValue: string) => {
  const suggestions: Record<string, string[]> = {
    installationDescription: [
      "Domestic dwelling - 3 bedroom house",
      "Commercial office building",
      "Retail shop premises",
      "Industrial workshop",
      "Farm building",
      "Flat/apartment",
    ],
    earthingArrangements: ["TN-C-S (PME)", "TN-S", "TT", "IT"],
    supplyCharacteristics: ["230V 50Hz Single Phase", "400V 50Hz Three Phase"],
    mainSwitchRating: ["100A DP", "80A DP", "125A DP", "160A DP"],
    estimatedAge: ["0-5 years", "5-10 years", "10-20 years", "20+ years"]
  };
  
  return suggestions[fieldId] || [];
};

const ClientDetailsStep: React.FC<ClientDetailsStepProps> = ({
  data,
  template,
  onDataChange,
  onNext,
  onBack
}) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState(data);
  const [showingSuggestions, setShowingSuggestions] = useState<string | null>(null);
  const [completedFields, setCompletedFields] = useState<Set<string>>(new Set());

  // Form validation
  const requiredFields = [
    'clientName',
    'clientAddress', 
    'installationAddress',
    'installationDescription'
  ];

  const fieldProgress = (completedFields.size / requiredFields.length) * 100;
  const isFormValid = requiredFields.every(field => formData[field]?.trim());

  useEffect(() => {
    // Update completed fields
    const completed = new Set<string>();
    requiredFields.forEach(field => {
      if (formData[field]?.trim()) {
        completed.add(field);
      }
    });
    setCompletedFields(completed);

    // Propagate changes to parent
    onDataChange(formData);
  }, [formData, onDataChange, requiredFields]);

  const updateField = (fieldId: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
  };

  const applySuggestion = (fieldId: string, suggestion: string) => {
    updateField(fieldId, suggestion);
    setShowingSuggestions(null);
    toast({
      title: "Suggestion applied",
      description: "AI suggestion has been applied to the field.",
    });
  };


  const propertyTypeOptions = [
    { value: "domestic-house", label: "Domestic House" },
    { value: "flat-apartment", label: "Flat/Apartment" },
    { value: "commercial-office", label: "Commercial Office" },
    { value: "retail-shop", label: "Retail Shop" },
    { value: "industrial-unit", label: "Industrial Unit" },
    { value: "farm-building", label: "Farm Building" },
    { value: "other", label: "Other" }
  ];

  const ageOptions = [
    { value: "0-5-years", label: "0-5 years (Recent)" },
    { value: "5-10-years", label: "5-10 years" },
    { value: "10-20-years", label: "10-20 years" },
    { value: "20-30-years", label: "20-30 years" },
    { value: "30-years-plus", label: "30+ years (Older installation)" },
    { value: "unknown", label: "Unknown" }
  ];

  const earthingOptions = [
    { value: "tn-c-s", label: "TN-C-S (PME)" },
    { value: "tn-s", label: "TN-S (Separate Neutral & Earth)" },
    { value: "tt", label: "TT (Earth Electrode)" },
    { value: "it", label: "IT (Isolated Terra)" }
  ];

  const supplyOptions = [
    { value: "230v-50hz-1ph", label: "230V 50Hz Single Phase" },
    { value: "400v-50hz-3ph", label: "400V 50Hz Three Phase" },
    { value: "110v-50hz-1ph", label: "110V 50Hz Single Phase (Site Supply)" },
    { value: "other", label: "Other" }
  ];

  const mainSwitchOptions = [
    { value: "60a-sp", label: "60A SP" },
    { value: "80a-dp", label: "80A DP" },
    { value: "100a-dp", label: "100A DP" },
    { value: "125a-dp", label: "125A DP" },
    { value: "160a-dp", label: "160A DP" },
    { value: "200a-dp", label: "200A DP" },
    { value: "other", label: "Other" }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-elec-gray border-elec-yellow/30 p-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Client & Installation Details</h2>
            <p className="text-muted-foreground">
              Provide the basic information for your {template?.name}
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

      {/* Form Sections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Client Information */}
        <Card className="bg-elec-gray border-elec-yellow/30 p-6">
          <div className="flex items-center gap-2 mb-4">
            <User className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-medium text-white">Client Information</h3>
          </div>
          
          <div className="space-y-4">
            <div className="relative">
              <MobileInputWrapper
                label="Client Name"
                placeholder="Enter client name"
                value={formData.clientName || ""}
                onChange={(value) => updateField('clientName', value)}
              />
            </div>

            <MobileInputWrapper
              label="Client Address"
              placeholder="Enter client address"
              value={formData.clientAddress || ""}
              onChange={(value) => updateField('clientAddress', value)}
            />

            <MobileInputWrapper
              label="Client Phone"
              placeholder="Enter client phone number"
              type="tel"
              value={formData.clientPhone || ""}
              onChange={(value) => updateField('clientPhone', value)}
            />
          </div>
        </Card>

        {/* Installation Details */}
        <Card className="bg-elec-gray border-elec-yellow/30 p-6">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-medium text-white">Installation Details</h3>
          </div>
          
          <div className="space-y-4">
            <MobileInputWrapper
              label="Installation Address"
              placeholder="Enter installation address"
              value={formData.installationAddress || ""}
              onChange={(value) => updateField('installationAddress', value)}
            />

            <MobileSelectWrapper
              label="Installation Description"
              placeholder="Select property type"
              value={formData.installationDescription || ""}
              onValueChange={(value) => updateField('installationDescription', value)}
              options={propertyTypeOptions}
            />

            <MobileSelectWrapper
              label="Estimated Age"
              placeholder="Select installation age"
              value={formData.estimatedAge || ""}
              onValueChange={(value) => updateField('estimatedAge', value)}
              options={ageOptions}
            />
          </div>
        </Card>
      </div>

      {/* Technical Details (only for relevant templates) */}
      {(template?.id === 'eicr' || template?.id === 'periodic-inspection') && (
        <Card className="bg-elec-gray border-elec-yellow/30 p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="h-5 w-5 text-elec-yellow" />
            <h3 className="text-lg font-medium text-white">Technical Specifications</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <MobileSelectWrapper
              label="Earthing Arrangements"
              placeholder="Select earthing system"
              value={formData.earthingArrangements || ""}
              onValueChange={(value) => updateField('earthingArrangements', value)}
              options={earthingOptions}
            />

            <MobileSelectWrapper
              label="Supply Characteristics"
              placeholder="Select supply type"
              value={formData.supplyCharacteristics || ""}
              onValueChange={(value) => updateField('supplyCharacteristics', value)}
              options={supplyOptions}
            />

            <MobileSelectWrapper
              label="Main Switch Rating"
              placeholder="Select main switch rating"
              value={formData.mainSwitchRating || ""}
              onValueChange={(value) => updateField('mainSwitchRating', value)}
              options={mainSwitchOptions}
            />
          </div>
        </Card>
      )}

      {/* Form Validation Summary */}
      {!isFormValid && (
        <Card className="bg-amber-500/10 border-amber-500/30 p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-amber-500 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-amber-500 mb-1">Required fields missing</h4>
              <p className="text-sm text-amber-500/80">
                Please complete all required fields before continuing to the next step.
              </p>
              <div className="mt-2 text-xs text-amber-500/70">
                Missing: {requiredFields.filter(field => !formData[field]?.trim()).join(', ')}
              </div>
            </div>
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
            Back to Templates
          </Button>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Step 2 of 4 • Client & Installation Details
            </p>
          </div>

          <Button
            onClick={onNext}
            disabled={!isFormValid}
            className="bg-elec-yellow text-elec-dark hover:bg-elec-yellow/90 disabled:opacity-50 disabled:cursor-not-allowed w-full sm:w-auto"
          >
            Continue to Inspection Details
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ClientDetailsStep;