
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  Calculator, 
  RotateCcw, 
  Zap, 
  Settings, 
  Bookmark,
  FileText,
  Thermometer,
  Shield
} from "lucide-react";
import { EnhancedCableSizingInputs, EnhancedCableSizingErrors } from "./useEnhancedCableSizing";
import { industryTemplates } from "./enhancedCableSizeData";

interface EnhancedCableSizingFormProps {
  inputs: EnhancedCableSizingInputs;
  errors: EnhancedCableSizingErrors;
  updateInput: (field: keyof EnhancedCableSizingInputs, value: string) => void;
  applyTemplate: (templateId: string) => void;
  calculateCableSize: () => void;
  resetCalculator: () => void;
  currentProject?: string;
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
  const handleTemplateChange = (templateId: string) => {
    if (templateId !== "none") {
      applyTemplate(templateId);
    }
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Project Information */}
      <Card className="border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <FileText className="h-4 w-5" />
            Project Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div>
            <Label htmlFor="project-name" className="text-xs sm:text-sm">Project Name</Label>
            <Input
              id="project-name"
              value={currentProject || ''}
              onChange={(e) => setCurrentProject(e.target.value)}
              placeholder="Enter project name..."
              className="bg-elec-gray-light/5 border-elec-yellow/20 focus:border-elec-yellow text-sm"
            />
          </div>

          <div>
            <Label htmlFor="template" className="text-xs sm:text-sm">Industry Template</Label>
            <Select value={inputs.template || "none"} onValueChange={handleTemplateChange}>
              <SelectTrigger className="bg-elec-gray-light/5 border-elec-yellow/20 focus:border-elec-yellow text-sm">
                <SelectValue placeholder="Select industry template..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No template</SelectItem>
                {industryTemplates.map(template => (
                  <SelectItem key={template.id} value={template.id}>
                    {template.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {inputs.template && inputs.template !== "none" && (
              <div className="mt-2">
                <Badge variant="outline" className="text-xs border-elec-yellow/30 text-elec-yellow">
                  {industryTemplates.find(t => t.id === inputs.template)?.name} Applied
                </Badge>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Basic Electrical Parameters */}
      <Card className="border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <Zap className="h-4 w-5" />
            Electrical Parameters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="current" className="text-xs sm:text-sm">
                Load Current (A) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="current"
                type="number"
                value={inputs.current}
                onChange={(e) => updateInput('current', e.target.value)}
                placeholder="Enter current in amps"
                className={`bg-elec-gray-light/5 border-elec-yellow/20 focus:border-elec-yellow text-sm ${
                  errors.current ? 'border-red-500' : ''
                }`}
              />
              {errors.current && (
                <p className="text-red-500 text-xs mt-1">{errors.current}</p>
              )}
            </div>

            <div>
              <Label htmlFor="voltage" className="text-xs sm:text-sm">
                System Voltage (V) <span className="text-red-500">*</span>
              </Label>
              <Select value={inputs.voltage} onValueChange={(value) => updateInput('voltage', value)}>
                <SelectTrigger className={`bg-elec-gray-light/5 border-elec-yellow/20 focus:border-elec-yellow text-sm ${
                  errors.voltage ? 'border-red-500' : ''
                }`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="230">230V (Single Phase)</SelectItem>
                  <SelectItem value="400">400V (Three Phase)</SelectItem>
                  <SelectItem value="110">110V (Site Supply)</SelectItem>
                </SelectContent>
              </Select>
              {errors.voltage && (
                <p className="text-red-500 text-xs mt-1">{errors.voltage}</p>
              )}
            </div>

            <div>
              <Label htmlFor="length" className="text-xs sm:text-sm">
                Cable Length (m) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="length"
                type="number"
                value={inputs.length}
                onChange={(e) => updateInput('length', e.target.value)}
                placeholder="Enter length in metres"
                className={`bg-elec-gray-light/5 border-elec-yellow/20 focus:border-elec-yellow text-sm ${
                  errors.length ? 'border-red-500' : ''
                }`}
              />
              {errors.length && (
                <p className="text-red-500 text-xs mt-1">{errors.length}</p>
              )}
            </div>

            <div>
              <Label htmlFor="voltageDrop" className="text-xs sm:text-sm">
                Max Voltage Drop (%) <span className="text-red-500">*</span>
              </Label>
              <Select value={inputs.voltageDrop} onValueChange={(value) => updateInput('voltageDrop', value)}>
                <SelectTrigger className={`bg-elec-gray-light/5 border-elec-yellow/20 focus:border-elec-yellow text-sm ${
                  errors.voltageDrop ? 'border-red-500' : ''
                }`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3% (Lighting)</SelectItem>
                  <SelectItem value="5">5% (Power)</SelectItem>
                  <SelectItem value="6">6% (Motors)</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectContent>
              </Select>
              {errors.voltageDrop && (
                <p className="text-red-500 text-xs mt-1">{errors.voltageDrop}</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Cable & Installation */}
      <Card className="border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <Settings className="h-4 w-5" />
            Cable & Installation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="cableType" className="text-xs sm:text-sm">Cable Type</Label>
              <Select value={inputs.cableType} onValueChange={(value) => updateInput('cableType', value)}>
                <SelectTrigger className="bg-elec-gray-light/5 border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="twin-and-earth">Twin & Earth</SelectItem>
                  <SelectItem value="swa">SWA Armoured</SelectItem>
                  <SelectItem value="micc">MICC Fire Resistant</SelectItem>
                  <SelectItem value="fplsoh">FP LSoH</SelectItem>
                  <SelectItem value="data">Data Cable</SelectItem>
                  <SelectItem value="fire-alarm">Fire Alarm</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="installationType" className="text-xs sm:text-sm">Insulation Type</Label>
              <Select value={inputs.installationType} onValueChange={(value) => updateInput('installationType', value)}>
                <SelectTrigger className="bg-elec-gray-light/5 border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pvc">PVC (70°C)</SelectItem>
                  <SelectItem value="xlpe">XLPE (90°C)</SelectItem>
                  <SelectItem value="epr">EPR (90°C)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="installationMethod" className="text-xs sm:text-sm">Installation Method</Label>
              <Select value={inputs.installationMethod} onValueChange={(value) => updateInput('installationMethod', value)}>
                <SelectTrigger className="bg-elec-gray-light/5 border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clipped-direct">Clipped Direct</SelectItem>
                  <SelectItem value="in-conduit">In Conduit</SelectItem>
                  <SelectItem value="in-trunking">In Trunking</SelectItem>
                  <SelectItem value="on-tray">On Cable Tray</SelectItem>
                  <SelectItem value="direct-buried">Direct Buried</SelectItem>
                  <SelectItem value="in-duct">In Duct</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="environment" className="text-xs sm:text-sm">Environment</Label>
              <Select value={inputs.environment} onValueChange={(value) => updateInput('environment', value)}>
                <SelectTrigger className="bg-elec-gray-light/5 border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="indoor-dry">Indoor Dry</SelectItem>
                  <SelectItem value="indoor-damp">Indoor Damp</SelectItem>
                  <SelectItem value="outdoor">Outdoor</SelectItem>
                  <SelectItem value="underground">Underground</SelectItem>
                  <SelectItem value="industrial">Industrial</SelectItem>
                  <SelectItem value="corrosive">Corrosive</SelectItem>
                </SelectContent>
              </Select>
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
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="ambientTemperature" className="text-xs sm:text-sm">
                Ambient Temperature (°C)
              </Label>
              <Input
                id="ambientTemperature"
                type="number"
                value={inputs.ambientTemperature}
                onChange={(e) => updateInput('ambientTemperature', e.target.value)}
                placeholder="30"
                className="bg-elec-gray-light/5 border-elec-yellow/20 focus:border-elec-yellow text-sm"
              />
            </div>

            <div>
              <Label htmlFor="groupingFactor" className="text-xs sm:text-sm">
                Grouping Factor
              </Label>
              <Select value={inputs.groupingFactor} onValueChange={(value) => updateInput('groupingFactor', value)}>
                <SelectTrigger className="bg-elec-gray-light/5 border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1.0 (Single Cable)</SelectItem>
                  <SelectItem value="0.8">0.8 (2-3 Cables)</SelectItem>
                  <SelectItem value="0.7">0.7 (4-6 Cables)</SelectItem>
                  <SelectItem value="0.65">0.65 (7-12 Cables)</SelectItem>
                  <SelectItem value="0.6">0.6 (13-20 Cables)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="futureExpansion" className="text-xs sm:text-sm">
                Future Expansion (%)
              </Label>
              <Select value={inputs.futureExpansion} onValueChange={(value) => updateInput('futureExpansion', value)}>
                <SelectTrigger className="bg-elec-gray-light/5 border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="0">0% (No expansion)</SelectItem>
                  <SelectItem value="25">25% (Standard)</SelectItem>
                  <SelectItem value="50">50% (High growth)</SelectItem>
                  <SelectItem value="100">100% (Future doubling)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="loadType" className="text-xs sm:text-sm">Load Type</Label>
              <Select value={inputs.loadType} onValueChange={(value) => updateInput('loadType', value)}>
                <SelectTrigger className="bg-elec-gray-light/5 border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resistive">Resistive (Heating)</SelectItem>
                  <SelectItem value="inductive">Inductive (Motors)</SelectItem>
                  <SelectItem value="capacitive">Capacitive</SelectItem>
                  <SelectItem value="non-linear">Non-linear (IT)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Protection & Compliance */}
      <Card className="border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <Shield className="h-4 w-5" />
            Protection & Compliance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="mcbType" className="text-xs sm:text-sm">MCB/RCBO Type</Label>
              <Select value={inputs.mcbType} onValueChange={(value) => updateInput('mcbType', value)}>
                <SelectTrigger className="bg-elec-gray-light/5 border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="type-b">Type B (3-5 x In)</SelectItem>
                  <SelectItem value="type-c">Type C (5-10 x In)</SelectItem>
                  <SelectItem value="type-d">Type D (10-20 x In)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="earthingSystem" className="text-xs sm:text-sm">Earthing System</Label>
              <Select value={inputs.earthingSystem} onValueChange={(value) => updateInput('earthingSystem', value)}>
                <SelectTrigger className="bg-elec-gray-light/5 border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tn-s">TN-S</SelectItem>
                  <SelectItem value="tn-c-s">TN-C-S</SelectItem>
                  <SelectItem value="tt">TT</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="sm:col-span-2">
              <Label htmlFor="harmonics" className="text-xs sm:text-sm">Harmonic Content</Label>
              <Select value={inputs.harmonics} onValueChange={(value) => updateInput('harmonics', value)}>
                <SelectTrigger className="bg-elec-gray-light/5 border-elec-yellow/20 focus:border-elec-yellow text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">None/Minimal</SelectItem>
                  <SelectItem value="low">Low (Linear loads)</SelectItem>
                  <SelectItem value="medium">Medium (Mixed loads)</SelectItem>
                  <SelectItem value="high">High (IT/Variable drives)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <Button
          onClick={calculateCableSize}
          className="flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80 text-sm sm:text-base py-2 sm:py-3"
        >
          <Calculator className="h-4 w-4 mr-2" />
          Calculate Cable Size
        </Button>
        <Button
          onClick={resetCalculator}
          variant="outline"
          className="flex-1 sm:flex-none border-elec-yellow/30 hover:bg-elec-yellow/10 text-sm sm:text-base py-2 sm:py-3"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>
    </div>
  );
};

export default EnhancedCableSizingForm;
