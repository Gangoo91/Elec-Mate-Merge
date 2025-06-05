
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calculator, 
  RotateCcw, 
  Zap, 
  Settings,
  Cable,
  Thermometer,
  Shield,
  AlertTriangle
} from "lucide-react";
import type { EnhancedCableSizingInputs } from "./useEnhancedCableSizing";
import { industryTemplates } from "./enhancedCableSizeData";

interface EnhancedCableSizingFormProps {
  inputs: EnhancedCableSizingInputs;
  errors: Record<string, string>;
  updateInput: (field: keyof EnhancedCableSizingInputs, value: any) => void;
  applyTemplate: (templateId: string) => void;
  calculateCableSize: () => void;
  resetCalculator: () => void;
  currentProject: string;
  setCurrentProject: (project: string) => void;
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
  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Project Information */}
      <Card className="border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <Settings className="h-4 w-5" />
            Project Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="project-name" className="text-sm font-medium">
              Project Name
            </Label>
            <Input
              id="project-name"
              value={currentProject}
              onChange={(e) => setCurrentProject(e.target.value)}
              placeholder="Enter project name..."
              className="bg-elec-gray border-elec-yellow/30 focus:border-elec-yellow"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium">
              Description (Optional)
            </Label>
            <Textarea
              id="description"
              value={inputs.description || ''}
              onChange={(e) => updateInput('description', e.target.value)}
              placeholder="Brief description of the installation..."
              className="bg-elec-gray border-elec-yellow/30 focus:border-elec-yellow min-h-[80px]"
            />
          </div>

          {/* Template Selection */}
          <div className="space-y-2">
            <Label htmlFor="template" className="text-sm font-medium">
              Industry Template
            </Label>
            <Select
              value={inputs.template || ''}
              onValueChange={(value) => {
                updateInput('template', value);
                applyTemplate(value);
              }}
            >
              <SelectTrigger className="bg-elec-gray border-elec-yellow/30 focus:border-elec-yellow">
                <SelectValue placeholder="Select an industry template..." />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-elec-yellow/30">
                {industryTemplates.map((template) => (
                  <SelectItem key={template.id} value={template.id}>
                    <div className="flex items-center gap-2">
                      <span>{template.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {template.industry}
                      </Badge>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {inputs.template && (
              <p className="text-xs text-muted-foreground">
                {industryTemplates.find(t => t.id === inputs.template)?.description}
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Load Information */}
      <Card className="border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <Zap className="h-4 w-5" />
            Load Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="current" className="text-sm font-medium">
                Load Current (A) *
              </Label>
              <Input
                id="current"
                type="number"
                value={inputs.current || ''}
                onChange={(e) => updateInput('current', parseFloat(e.target.value) || 0)}
                placeholder="e.g., 32"
                className="bg-elec-gray border-elec-yellow/30 focus:border-elec-yellow"
                min="0"
                step="0.1"
              />
              {errors.current && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {errors.current}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="voltage" className="text-sm font-medium">
                Voltage (V) *
              </Label>
              <Select
                value={inputs.voltage?.toString() || ''}
                onValueChange={(value) => updateInput('voltage', parseInt(value))}
              >
                <SelectTrigger className="bg-elec-gray border-elec-yellow/30 focus:border-elec-yellow">
                  <SelectValue placeholder="Select voltage..." />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-elec-yellow/30">
                  <SelectItem value="230">230V (Single Phase)</SelectItem>
                  <SelectItem value="400">400V (Three Phase)</SelectItem>
                  <SelectItem value="110">110V (Site Supply)</SelectItem>
                </SelectContent>
              </Select>
              {errors.voltage && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {errors.voltage}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="power-factor" className="text-sm font-medium">
                Power Factor
              </Label>
              <Input
                id="power-factor"
                type="number"
                value={inputs.powerFactor || ''}
                onChange={(e) => updateInput('powerFactor', parseFloat(e.target.value) || 1)}
                placeholder="1.0"
                className="bg-elec-gray border-elec-yellow/30 focus:border-elec-yellow"
                min="0.1"
                max="1"
                step="0.01"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phases" className="text-sm font-medium">
                Number of Phases
              </Label>
              <Select
                value={inputs.phases?.toString() || ''}
                onValueChange={(value) => updateInput('phases', parseInt(value))}
              >
                <SelectTrigger className="bg-elec-gray border-elec-yellow/30 focus:border-elec-yellow">
                  <SelectValue placeholder="Select phases..." />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-elec-yellow/30">
                  <SelectItem value="1">Single Phase</SelectItem>
                  <SelectItem value="3">Three Phase</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cable Installation */}
      <Card className="border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <Cable className="h-4 w-5" />
            Cable Installation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="length" className="text-sm font-medium">
                Cable Length (m) *
              </Label>
              <Input
                id="length"
                type="number"
                value={inputs.length || ''}
                onChange={(e) => updateInput('length', parseFloat(e.target.value) || 0)}
                placeholder="e.g., 25"
                className="bg-elec-gray border-elec-yellow/30 focus:border-elec-yellow"
                min="0"
                step="0.1"
              />
              {errors.length && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {errors.length}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="installation-method" className="text-sm font-medium">
                Installation Method *
              </Label>
              <Select
                value={inputs.installationMethod || ''}
                onValueChange={(value) => updateInput('installationMethod', value)}
              >
                <SelectTrigger className="bg-elec-gray border-elec-yellow/30 focus:border-elec-yellow">
                  <SelectValue placeholder="Select installation method..." />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-elec-yellow/30">
                  <SelectItem value="clipped-direct">Clipped Direct</SelectItem>
                  <SelectItem value="in-conduit">In Conduit</SelectItem>
                  <SelectItem value="in-trunking">In Trunking</SelectItem>
                  <SelectItem value="on-tray">On Cable Tray</SelectItem>
                  <SelectItem value="direct-buried">Direct Buried</SelectItem>
                  <SelectItem value="in-duct">In Duct</SelectItem>
                </SelectContent>
              </Select>
              {errors.installationMethod && (
                <p className="text-sm text-red-400 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {errors.installationMethod}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="cable-type" className="text-sm font-medium">
                Cable Type Preference
              </Label>
              <Select
                value={inputs.cableType || ''}
                onValueChange={(value) => updateInput('cableType', value)}
              >
                <SelectTrigger className="bg-elec-gray border-elec-yellow/30 focus:border-elec-yellow">
                  <SelectValue placeholder="Select cable type..." />
                </SelectTrigger>
                <SelectContent className="bg-elec-gray border-elec-yellow/30">
                  <SelectItem value="twin-and-earth">Twin & Earth</SelectItem>
                  <SelectItem value="swa">SWA (Steel Wire Armoured)</SelectItem>
                  <SelectItem value="lsf">LSF (Low Smoke & Fume)</SelectItem>
                  <SelectItem value="armored">Armoured Cable</SelectItem>
                  <SelectItem value="micc">MICC (Mineral Insulated)</SelectItem>
                  <SelectItem value="fplsoh">FP LSoH (Fire Performance)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="protective-device" className="text-sm font-medium">
                Protective Device Rating (A)
              </Label>
              <Input
                id="protective-device"
                type="number"
                value={inputs.protectiveDeviceRating || ''}
                onChange={(e) => updateInput('protectiveDeviceRating', parseFloat(e.target.value) || 0)}
                placeholder="e.g., 40"
                className="bg-elec-gray border-elec-yellow/30 focus:border-elec-yellow"
                min="0"
                step="1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Environmental Factors */}
      <Card className="border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <Thermometer className="h-4 w-5" />
            Environmental Factors
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="ambient-temp" className="text-sm font-medium">
                Ambient Temperature (°C)
              </Label>
              <Input
                id="ambient-temp"
                type="number"
                value={inputs.ambientTemperature || ''}
                onChange={(e) => updateInput('ambientTemperature', parseFloat(e.target.value) || 20)}
                placeholder="20"
                className="bg-elec-gray border-elec-yellow/30 focus:border-elec-yellow"
                min="-40"
                max="60"
                step="1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grouping-factor" className="text-sm font-medium">
                Grouping Factor
              </Label>
              <Input
                id="grouping-factor"
                type="number"
                value={inputs.groupingFactor || ''}
                onChange={(e) => updateInput('groupingFactor', parseFloat(e.target.value) || 1)}
                placeholder="1.0"
                className="bg-elec-gray border-elec-yellow/30 focus:border-elec-yellow"
                min="0.1"
                max="1"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="soil-thermal" className="text-sm font-medium">
              Soil Thermal Resistivity (K·m/W)
            </Label>
            <Input
              id="soil-thermal"
              type="number"
              value={inputs.soilThermalResistivity || ''}
              onChange={(e) => updateInput('soilThermalResistivity', parseFloat(e.target.value) || 2.5)}
              placeholder="2.5"
              className="bg-elec-gray border-elec-yellow/30 focus:border-elec-yellow"
              min="0.5"
              max="10"
              step="0.1"
            />
            <p className="text-xs text-muted-foreground">
              Only applicable for direct buried installations
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Settings */}
      <Card className="border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <Shield className="h-4 w-5" />
            Advanced Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="voltage-drop-limit" className="text-sm font-medium">
                Voltage Drop Limit (%)
              </Label>
              <Input
                id="voltage-drop-limit"
                type="number"
                value={inputs.voltageDropLimit || ''}
                onChange={(e) => updateInput('voltageDropLimit', parseFloat(e.target.value) || 5)}
                placeholder="5"
                className="bg-elec-gray border-elec-yellow/30 focus:border-elec-yellow"
                min="1"
                max="10"
                step="0.1"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="diversity-factor" className="text-sm font-medium">
                Diversity Factor
              </Label>
              <Input
                id="diversity-factor"
                type="number"
                value={inputs.diversityFactor || ''}
                onChange={(e) => updateInput('diversityFactor', parseFloat(e.target.value) || 1)}
                placeholder="1.0"
                className="bg-elec-gray border-elec-yellow/30 focus:border-elec-yellow"
                min="0.1"
                max="1"
                step="0.01"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="future-expansion" className="text-sm font-medium">
              Future Expansion Factor
            </Label>
            <Input
              id="future-expansion"
              type="number"
              value={inputs.futureExpansionFactor || ''}
              onChange={(e) => updateInput('futureExpansionFactor', parseFloat(e.target.value) || 1)}
              placeholder="1.0"
              className="bg-elec-gray border-elec-yellow/30 focus:border-elec-yellow"
              min="1"
              max="2"
              step="0.1"
            />
            <p className="text-xs text-muted-foreground">
              Factor to account for potential future load increases
            </p>
          </div>
        </CardContent>
      </Card>

      <Separator className="bg-elec-yellow/20" />

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button
          onClick={calculateCableSize}
          className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80 font-medium"
          size="lg"
        >
          <Calculator className="h-4 w-4 mr-2" />
          Calculate Cable Size
        </Button>
        
        <Button
          onClick={resetCalculator}
          variant="outline"
          className="border-elec-yellow/30 hover:bg-elec-yellow/10 text-elec-yellow"
          size="lg"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default EnhancedCableSizingForm;
