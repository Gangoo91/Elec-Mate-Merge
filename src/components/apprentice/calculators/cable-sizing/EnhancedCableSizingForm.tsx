
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { 
  Calculator,
  RotateCcw,
  Zap,
  Settings,
  MapPin,
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
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Action Buttons - Mobile First */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Button
          onClick={calculateCableSize}
          className="w-full sm:flex-1 bg-elec-yellow text-elec-dark hover:bg-elec-yellow/80 text-sm sm:text-base"
          disabled={hasErrors}
        >
          <Calculator className="h-4 w-4 mr-1 sm:mr-2" />
          Calculate Cable Size
        </Button>
        <Button
          onClick={resetCalculator}
          variant="outline"
          className="w-full sm:w-auto border-elec-yellow/30 hover:bg-elec-yellow/10 text-sm sm:text-base"
        >
          <RotateCcw className="h-4 w-4 mr-1 sm:mr-2" />
          Reset
        </Button>
      </div>

      {/* Project Information */}
      <Card className="border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <MapPin className="h-4 w-5" />
            Project Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="projectName" className="text-sm">Project Name</Label>
              <Input
                id="projectName"
                value={currentProject}
                onChange={(e) => setCurrentProject(e.target.value)}
                placeholder="Enter project name"
                className="mt-1"
              />
            </div>
            <div>
              <Label htmlFor="template" className="text-sm">Industry Template</Label>
              <Select
                value={inputs.template}
                onValueChange={(value) => {
                  updateInput('template', value);
                  applyTemplate(value);
                }}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder="Select template" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">No template</SelectItem>
                  {industryTemplates.map((template) => (
                    <SelectItem key={template.id} value={template.id}>
                      {template.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {inputs.template && (
            <div className="p-3 bg-elec-yellow/10 rounded-lg border border-elec-yellow/20">
              <div className="text-sm font-medium text-elec-yellow mb-1">
                {industryTemplates.find(t => t.id === inputs.template)?.name}
              </div>
              <div className="text-xs text-muted-foreground">
                {industryTemplates.find(t => t.id === inputs.template)?.description}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Load Requirements */}
      <Card className="border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <Zap className="h-4 w-5" />
            Load Requirements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="current" className="text-sm">Design Current (A) *</Label>
              <Input
                id="current"
                type="number"
                value={inputs.current || ''}
                onChange={(e) => updateInput('current', parseFloat(e.target.value) || 0)}
                placeholder="Enter current"
                className={`mt-1 ${errors.current ? 'border-red-500' : ''}`}
              />
              {errors.current && (
                <div className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {errors.current}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="voltage" className="text-sm">Voltage (V) *</Label>
              <Select
                value={inputs.voltage.toString()}
                onValueChange={(value) => updateInput('voltage', parseFloat(value))}
              >
                <SelectTrigger className={`mt-1 ${errors.voltage ? 'border-red-500' : ''}`}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="230">230V (Single Phase)</SelectItem>
                  <SelectItem value="400">400V (Three Phase)</SelectItem>
                  <SelectItem value="110">110V (Site Supply)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="phases" className="text-sm">Phases</Label>
              <Select
                value={inputs.phases}
                onValueChange={(value: '1' | '3') => updateInput('phases', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">Single Phase</SelectItem>
                  <SelectItem value="3">Three Phase</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="powerFactor" className="text-sm">Power Factor</Label>
              <Input
                id="powerFactor"
                type="number"
                step="0.01"
                min="0.1"
                max="1.0"
                value={inputs.powerFactor}
                onChange={(e) => updateInput('powerFactor', parseFloat(e.target.value) || 0.85)}
                className={`mt-1 ${errors.powerFactor ? 'border-red-500' : ''}`}
              />
            </div>

            <div>
              <Label htmlFor="loadType" className="text-sm">Load Type</Label>
              <Select
                value={inputs.loadType}
                onValueChange={(value: 'resistive' | 'inductive' | 'mixed') => updateInput('loadType', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="resistive">Resistive (Heating)</SelectItem>
                  <SelectItem value="inductive">Inductive (Motors)</SelectItem>
                  <SelectItem value="mixed">Mixed Load</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="futureExpansion" className="text-sm">Future Expansion (%)</Label>
              <Input
                id="futureExpansion"
                type="number"
                min="0"
                max="100"
                value={inputs.futureExpansion}
                onChange={(e) => updateInput('futureExpansion', parseFloat(e.target.value) || 0)}
                className="mt-1"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Circuit Details */}
      <Card className="border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <Settings className="h-4 w-5" />
            Circuit Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="length" className="text-sm">Cable Length (m) *</Label>
              <Input
                id="length"
                type="number"
                value={inputs.length || ''}
                onChange={(e) => updateInput('length', parseFloat(e.target.value) || 0)}
                placeholder="Enter length"
                className={`mt-1 ${errors.length ? 'border-red-500' : ''}`}
              />
              {errors.length && (
                <div className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <AlertTriangle className="h-3 w-3" />
                  {errors.length}
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="circuitType" className="text-sm">Circuit Type</Label>
              <Select
                value={inputs.circuitType}
                onValueChange={(value: 'radial' | 'ring' | 'distribution') => updateInput('circuitType', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="radial">Radial Circuit</SelectItem>
                  <SelectItem value="ring">Ring Final Circuit</SelectItem>
                  <SelectItem value="distribution">Distribution Circuit</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="voltageDropLimit" className="text-sm">Voltage Drop Limit (%)</Label>
              <Input
                id="voltageDropLimit"
                type="number"
                step="0.1"
                min="1"
                max="10"
                value={inputs.voltageDropLimit}
                onChange={(e) => updateInput('voltageDropLimit', parseFloat(e.target.value) || 3)}
                className={`mt-1 ${errors.voltageDropLimit ? 'border-red-500' : ''}`}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Installation Environment */}
      <Card className="border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <Settings className="h-4 w-5" />
            Installation Environment
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="installationMethod" className="text-sm">Installation Method</Label>
              <Select
                value={inputs.installationMethod}
                onValueChange={(value) => updateInput('installationMethod', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="clipped-direct">Clipped Direct</SelectItem>
                  <SelectItem value="on-tray">On Cable Tray</SelectItem>
                  <SelectItem value="in-conduit">In Conduit</SelectItem>
                  <SelectItem value="in-trunking">In Trunking</SelectItem>
                  <SelectItem value="direct-buried">Direct Buried</SelectItem>
                  <SelectItem value="in-duct">In Duct</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="ambientTemperature" className="text-sm">Ambient Temperature (°C)</Label>
              <Input
                id="ambientTemperature"
                type="number"
                value={inputs.ambientTemperature}
                onChange={(e) => updateInput('ambientTemperature', parseFloat(e.target.value) || 30)}
                className={`mt-1 ${errors.ambientTemperature ? 'border-red-500' : ''}`}
              />
            </div>

            <div>
              <Label htmlFor="groupingFactor" className="text-sm">Grouping Factor</Label>
              <Input
                id="groupingFactor"
                type="number"
                step="0.1"
                min="0.1"
                max="1.0"
                value={inputs.groupingFactor}
                onChange={(e) => updateInput('groupingFactor', parseFloat(e.target.value) || 1.0)}
                className={`mt-1 ${errors.groupingFactor ? 'border-red-500' : ''}`}
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="thermalInsulation"
              checked={inputs.thermalInsulation}
              onCheckedChange={(checked) => updateInput('thermalInsulation', checked)}
            />
            <Label htmlFor="thermalInsulation" className="text-sm">
              Cable in contact with thermal insulation
            </Label>
          </div>
        </CardContent>
      </Card>

      {/* Cable Preferences */}
      <Card className="border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            Cable Preferences
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div>
            <Label className="text-sm">Preferred Cable Types</Label>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
              {['twin-and-earth', 'swa', 'lsf', 'micc', 'fplsoh'].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <Checkbox
                    id={type}
                    checked={inputs.preferredCableTypes.includes(type)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        updateInput('preferredCableTypes', [...inputs.preferredCableTypes, type]);
                      } else {
                        updateInput('preferredCableTypes', inputs.preferredCableTypes.filter(t => t !== type));
                      }
                    }}
                  />
                  <Label htmlFor={type} className="text-xs capitalize">
                    {type.replace('-', ' ')}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Protection */}
      <Card className="border-elec-yellow/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-elec-yellow flex items-center gap-2 text-base sm:text-lg">
            <Shield className="h-4 w-5" />
            Protection
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 sm:space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            <div>
              <Label htmlFor="protectionType" className="text-sm">Protection Type</Label>
              <Select
                value={inputs.protectionType}
                onValueChange={(value: 'mcb' | 'fuse' | 'mccb') => updateInput('protectionType', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mcb">MCB (Miniature Circuit Breaker)</SelectItem>
                  <SelectItem value="fuse">Fuse</SelectItem>
                  <SelectItem value="mccb">MCCB (Moulded Case Circuit Breaker)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="protectionRating" className="text-sm">Protection Rating (A)</Label>
              <Input
                id="protectionRating"
                type="number"
                value={inputs.protectionRating || ''}
                onChange={(e) => updateInput('protectionRating', parseFloat(e.target.value) || 0)}
                placeholder="Auto-calculate if left blank"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="earthingSystem" className="text-sm">Earthing System</Label>
              <Select
                value={inputs.earthingSystem}
                onValueChange={(value: 'tn-s' | 'tn-c-s' | 'tt' | 'it') => updateInput('earthingSystem', value)}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="tn-c-s">TN-C-S (PME)</SelectItem>
                  <SelectItem value="tn-s">TN-S</SelectItem>
                  <SelectItem value="tt">TT</SelectItem>
                  <SelectItem value="it">IT</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Error Summary */}
      {hasErrors && (
        <Card className="border-red-500/30 bg-red-500/5">
          <CardContent className="pt-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span className="font-medium text-red-500 text-sm">Please fix the following errors:</span>
            </div>
            <div className="space-y-1">
              {Object.entries(errors).map(([field, error]) => (
                <p key={field} className="text-xs text-red-400">• {error}</p>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default EnhancedCableSizingForm;
