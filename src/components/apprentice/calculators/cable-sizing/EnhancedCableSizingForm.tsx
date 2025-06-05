
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calculator, 
  RotateCcw, 
  Settings, 
  Zap, 
  Info,
  Building,
  Thermometer,
  Users
} from "lucide-react";
import type { EnhancedCableSizingInputs, EnhancedCableSizingErrors } from "./useEnhancedCableSizing";
import { industryTemplates } from "./enhancedCableSizeData";

interface EnhancedCableSizingFormProps {
  inputs: EnhancedCableSizingInputs;
  errors: EnhancedCableSizingErrors;
  updateInput: (field: keyof EnhancedCableSizingInputs, value: string) => void;
  applyTemplate: (templateId: string) => void;
  calculateCableSize: () => void;
  resetCalculator: () => void;
  currentProject: string;
  setCurrentProject: (name: string) => void;
}

const EnhancedCableSizingForm: React.FC<EnhancedCableSizingFormProps> = ({
  inputs,
  errors,
  updateInput,
  applyTemplate,
  calculateCableSize,
  resetCalculator,
  currentProject,
  setCurrentProject
}) => {
  const handleCalculate = () => {
    calculateCableSize();
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Project Information */}
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <Building className="h-4 w-5" />
            Project Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName" className="text-sm font-medium">Project Name</Label>
            <Input
              id="projectName"
              value={currentProject}
              onChange={(e) => setCurrentProject(e.target.value)}
              placeholder="Kitchen Extension"
              className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">Description</Label>
            <Textarea
              id="description"
              value={inputs.description}
              onChange={(e) => updateInput("description", e.target.value)}
              placeholder="Brief description of the electrical installation..."
              className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm min-h-[60px] resize-none"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium">Industry Template</Label>
            <Select value={inputs.template || ""} onValueChange={(value) => applyTemplate(value)}>
              <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm">
                <SelectValue placeholder="Select industry template" />
              </SelectTrigger>
              <SelectContent className="bg-elec-dark border-elec-yellow/20">
                {industryTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex flex-col">
                      <span>{template.name}</span>
                      <span className="text-xs text-muted-foreground">{template.description}</span>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Basic Parameters */}
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <Zap className="h-4 w-5" />
            Basic Parameters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          {/* Load Current and Cable Length */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="current" className="text-sm font-medium">Load Current (A)</Label>
              <Input
                id="current"
                type="number"
                step="0.1"
                value={inputs.current}
                onChange={(e) => updateInput("current", e.target.value)}
                placeholder="32"
                className={`bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm ${
                  errors.current ? 'border-red-500' : ''
                }`}
              />
              {errors.current && (
                <p className="text-red-400 text-xs">{errors.current}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="length" className="text-sm font-medium">Cable Length (m)</Label>
              <Input
                id="length"
                type="number"
                step="0.1"
                value={inputs.length}
                onChange={(e) => updateInput("length", e.target.value)}
                placeholder="25"
                className={`bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm ${
                  errors.length ? 'border-red-500' : ''
                }`}
              />
              {errors.length && (
                <p className="text-red-400 text-xs">{errors.length}</p>
              )}
            </div>
          </div>

          {/* Power Factor and Phases */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="powerFactor" className="text-sm font-medium">Power Factor</Label>
              <Input
                id="powerFactor"
                type="number"
                step="0.01"
                min="0.5"
                max="1"
                value={inputs.powerFactor}
                onChange={(e) => updateInput("powerFactor", e.target.value)}
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phases" className="text-sm font-medium">System Type</Label>
              <Select value={inputs.phases} onValueChange={(value) => updateInput("phases", value)}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="single">Single Phase</SelectItem>
                  <SelectItem value="three">Three Phase</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Voltage and Voltage Drop */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="voltage" className="text-sm font-medium">Voltage (V)</Label>
              <Select value={inputs.voltage} onValueChange={(value) => updateInput("voltage", value)}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="230">230V (Single Phase)</SelectItem>
                  <SelectItem value="400">400V (Three Phase)</SelectItem>
                  <SelectItem value="110">110V (Site Supply)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="voltageDrop" className="text-sm font-medium">Max Voltage Drop (%)</Label>
              <Input
                id="voltageDrop"
                type="number"
                step="0.1"
                value={inputs.voltageDrop}
                onChange={(e) => updateInput("voltageDrop", e.target.value)}
                className={`bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm ${
                  errors.voltageDrop ? 'border-red-500' : ''
                }`}
              />
              {errors.voltageDrop && (
                <p className="text-red-400 text-xs">{errors.voltageDrop}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Installation Details */}
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <Settings className="h-4 w-5" />
            Installation Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Cable Type</Label>
              <Select value={inputs.cableType} onValueChange={(value) => updateInput("cableType", value)}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="twin-and-earth">Twin & Earth</SelectItem>
                  <SelectItem value="swa">SWA Cable</SelectItem>
                  <SelectItem value="micc">MICC Cable</SelectItem>
                  <SelectItem value="fplsoh">FP LSoH Cable</SelectItem>
                  <SelectItem value="data">Data Cable</SelectItem>
                  <SelectItem value="fire-alarm">Fire Alarm Cable</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Installation Method</Label>
              <Select value={inputs.installationMethod} onValueChange={(value) => updateInput("installationMethod", value)}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="clipped-direct">Clipped Direct</SelectItem>
                  <SelectItem value="in-conduit">In Conduit</SelectItem>
                  <SelectItem value="in-trunking">In Trunking</SelectItem>
                  <SelectItem value="on-tray">On Cable Tray</SelectItem>
                  <SelectItem value="direct-buried">Direct Buried</SelectItem>
                  <SelectItem value="in-duct">In Duct</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Insulation Type</Label>
              <Select value={inputs.installationType} onValueChange={(value) => updateInput("installationType", value)}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="pvc">PVC (70°C)</SelectItem>
                  <SelectItem value="xlpe">XLPE (90°C)</SelectItem>
                  <SelectItem value="epr">EPR (90°C)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="protectiveDeviceRating" className="text-sm font-medium">Protective Device (A)</Label>
              <Input
                id="protectiveDeviceRating"
                type="number"
                value={inputs.protectiveDeviceRating}
                onChange={(e) => updateInput("protectiveDeviceRating", e.target.value)}
                placeholder="Auto-calculated"
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Load Type</Label>
              <Select value={inputs.loadType} onValueChange={(value) => updateInput("loadType", value)}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="resistive">Resistive (Heating)</SelectItem>
                  <SelectItem value="inductive">Inductive (Motors)</SelectItem>
                  <SelectItem value="capacitive">Capacitive</SelectItem>
                  <SelectItem value="mixed">Mixed Load</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">MCB Type</Label>
              <Select value={inputs.mcbType} onValueChange={(value) => updateInput("mcbType", value)}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="type-b">Type B (3-5 × In)</SelectItem>
                  <SelectItem value="type-c">Type C (5-10 × In)</SelectItem>
                  <SelectItem value="type-d">Type D (10-20 × In)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environmental Conditions */}
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <Thermometer className="h-4 w-5" />
            Environmental Conditions
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="ambientTemperature" className="text-sm font-medium">Ambient Temperature (°C)</Label>
              <Input
                id="ambientTemperature"
                type="number"
                value={inputs.ambientTemperature}
                onChange={(e) => updateInput("ambientTemperature", e.target.value)}
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="soilThermalResistivity" className="text-sm font-medium">Soil Thermal Resistivity (K·m/W)</Label>
              <Input
                id="soilThermalResistivity"
                type="number"
                step="0.1"
                value={inputs.soilThermalResistivity}
                onChange={(e) => updateInput("soilThermalResistivity", e.target.value)}
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="groupingFactor" className="text-sm font-medium">Grouping Factor</Label>
              <Select value={inputs.groupingFactor} onValueChange={(value) => updateInput("groupingFactor", value)}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="1">1.0 (Single cable)</SelectItem>
                  <SelectItem value="0.8">0.8 (2-3 cables)</SelectItem>
                  <SelectItem value="0.7">0.7 (4-5 cables)</SelectItem>
                  <SelectItem value="0.6">0.6 (6+ cables)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Environment</Label>
              <Select value={inputs.environment} onValueChange={(value) => updateInput("environment", value)}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="indoor-dry">Indoor Dry</SelectItem>
                  <SelectItem value="indoor-humid">Indoor Humid</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="underground">Underground</SelectItem>
                  <SelectItem value="corrosive">Corrosive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Parameters */}
      <Card className="border-elec-yellow/20 bg-elec-gray/50">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <Users className="h-4 w-5" />
            Advanced Parameters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label htmlFor="diversityFactor" className="text-sm font-medium">Diversity Factor</Label>
              <Input
                id="diversityFactor"
                type="number"
                step="0.1"
                min="0.1"
                max="1"
                value={inputs.diversityFactor}
                onChange={(e) => updateInput("diversityFactor", e.target.value)}
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="futureExpansion" className="text-sm font-medium">Future Expansion (%)</Label>
              <Input
                id="futureExpansion"
                type="number"
                step="5"
                value={inputs.futureExpansion}
                onChange={(e) => updateInput("futureExpansion", e.target.value)}
                className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium">Harmonics</Label>
              <Select value={inputs.harmonics} onValueChange={(value) => updateInput("harmonics", value)}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="none">None/Minimal</SelectItem>
                  <SelectItem value="low">Low (&lt;15%)</SelectItem>
                  <SelectItem value="medium">Medium (15-25%)</SelectItem>
                  <SelectItem value="high">High (&gt;25%)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium">Earthing System</Label>
              <Select value={inputs.earthingSystem} onValueChange={(value) => updateInput("earthingSystem", value)}>
                <SelectTrigger className="bg-elec-dark border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-elec-dark border-elec-yellow/20">
                  <SelectItem value="tn-s">TN-S</SelectItem>
                  <SelectItem value="tn-c-s">TN-C-S</SelectItem>
                  <SelectItem value="tt">TT</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
        <Button
          onClick={handleCalculate}
          className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80 text-sm sm:text-base"
          size="default"
        >
          <Calculator className="h-4 w-4 mr-1 sm:mr-2" />
          Calculate Cable Size
        </Button>
        
        <Button
          onClick={resetCalculator}
          variant="outline"
          className="flex-1 sm:flex-none border-elec-yellow/30 hover:bg-elec-yellow/10 text-sm sm:text-base"
          size="default"
        >
          <RotateCcw className="h-4 w-4 mr-1 sm:mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default EnhancedCableSizingForm;
