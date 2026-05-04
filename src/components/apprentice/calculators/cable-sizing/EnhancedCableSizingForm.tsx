import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Calculator, RotateCcw, AlertTriangle } from 'lucide-react';
import type { EnhancedCableSizingInputs } from './useEnhancedCableSizing';
import { industryTemplates } from './enhancedCableSizeData';

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

const inputClass =
  'h-11 mt-1 bg-white/[0.04] border-white/10 text-white text-base touch-manipulation focus:border-yellow-500 focus:ring-yellow-500';

const selectTriggerClass =
  'h-11 mt-1 bg-white/[0.04] border-white/10 text-white text-base touch-manipulation focus:border-yellow-500 focus:ring-yellow-500';

const EnhancedCableSizingForm: React.FC<EnhancedCableSizingFormProps> = ({
  inputs,
  errors,
  updateInput,
  applyTemplate,
  calculateCableSize,
  resetCalculator,
  currentProject,
  setCurrentProject,
}) => {
  const hasErrors = Object.keys(errors).length > 0;

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
        <Button
          onClick={calculateCableSize}
          className="w-full sm:flex-1 h-11 bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold touch-manipulation active:scale-[0.98] disabled:opacity-40"
          disabled={hasErrors}
        >
          <Calculator className="h-4 w-4 mr-2" />
          Calculate cable size
        </Button>
        <Button
          onClick={resetCalculator}
          variant="outline"
          className="w-full sm:w-auto h-11 border-white/15 text-white hover:bg-white/[0.05] touch-manipulation"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Project Information */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Project information
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
          <div>
            <Label htmlFor="projectName" className="text-[13px] text-white/85">
              Project name
            </Label>
            <Input
              id="projectName"
              value={currentProject}
              onChange={(e) => setCurrentProject(e.target.value)}
              placeholder="Enter project name"
              className={inputClass}
            />
          </div>
          <div>
            <Label htmlFor="template" className="text-[13px] text-white/85">
              Industry template
            </Label>
            <Select
              value={inputs.template}
              onValueChange={(value) => {
                updateInput('template', value);
                if (value !== 'none') applyTemplate(value);
              }}
            >
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No template</SelectItem>
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
          <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3 space-y-1">
            <div className="text-[14px] font-medium text-white">
              {industryTemplates.find((t) => t.id === inputs.template)?.name}
            </div>
            <div className="text-[12px] text-white/55">
              {industryTemplates.find((t) => t.id === inputs.template)?.description}
            </div>
          </div>
        )}
      </div>

      {/* Load Requirements */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Load requirements
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <Label htmlFor="current" className="text-[13px] text-white/85">
              Design current (A) *
            </Label>
            <Input
              id="current"
              type="text"
              inputMode="decimal"
              value={inputs.current ?? ''}
              onChange={(e) => updateInput('current', parseFloat(e.target.value) || 0)}
              placeholder="Enter current"
              className={`${inputClass} ${errors.current ? 'border-red-500' : ''}`}
            />
            {errors.current && (
              <div className="text-[11px] text-red-300 mt-1 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {errors.current}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="voltage" className="text-[13px] text-white/85">
              Voltage (V) *
            </Label>
            <Select
              value={inputs.voltage.toString()}
              onValueChange={(value) => updateInput('voltage', parseFloat(value))}
            >
              <SelectTrigger className={`${selectTriggerClass} ${errors.voltage ? 'border-red-500' : ''}`}>
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
            <Label htmlFor="phases" className="text-[13px] text-white/85">
              Phases
            </Label>
            <Select
              value={inputs.phases}
              onValueChange={(value: '1' | '3') => updateInput('phases', value)}
            >
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">Single Phase</SelectItem>
                <SelectItem value="3">Three Phase</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="powerFactor" className="text-[13px] text-white/85">
              Power factor
            </Label>
            <Input
              id="powerFactor"
              type="number"
              step="0.01"
              min="0.1"
              max="1.0"
              value={inputs.powerFactor}
              onChange={(e) => updateInput('powerFactor', parseFloat(e.target.value) || 0.85)}
              className={`${inputClass} ${errors.powerFactor ? 'border-red-500' : ''}`}
            />
          </div>

          <div>
            <Label htmlFor="loadType" className="text-[13px] text-white/85">
              Load type
            </Label>
            <Select
              value={inputs.loadType}
              onValueChange={(value: 'resistive' | 'inductive' | 'mixed') =>
                updateInput('loadType', value)
              }
            >
              <SelectTrigger className={selectTriggerClass}>
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
            <Label htmlFor="futureExpansion" className="text-[13px] text-white/85">
              Future expansion (%)
            </Label>
            <Input
              id="futureExpansion"
              type="number"
              min="0"
              max="100"
              value={inputs.futureExpansion}
              onChange={(e) => updateInput('futureExpansion', parseFloat(e.target.value) || 0)}
              className={inputClass}
            />
          </div>
        </div>
      </div>

      {/* Circuit Details */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Circuit details
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <Label htmlFor="length" className="text-[13px] text-white/85">
              Cable length (m) *
            </Label>
            <Input
              id="length"
              type="text"
              inputMode="decimal"
              value={inputs.length ?? ''}
              onChange={(e) => updateInput('length', parseFloat(e.target.value) || 0)}
              placeholder="Enter length"
              className={`${inputClass} ${errors.length ? 'border-red-500' : ''}`}
            />
            {errors.length && (
              <div className="text-[11px] text-red-300 mt-1 flex items-center gap-1">
                <AlertTriangle className="h-3 w-3" />
                {errors.length}
              </div>
            )}
          </div>

          <div>
            <Label htmlFor="circuitType" className="text-[13px] text-white/85">
              Circuit type
            </Label>
            <Select
              value={inputs.circuitType}
              onValueChange={(value: 'radial' | 'ring' | 'distribution') =>
                updateInput('circuitType', value)
              }
            >
              <SelectTrigger className={selectTriggerClass}>
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
            <Label htmlFor="voltageDropLimit" className="text-[13px] text-white/85">
              Voltage drop limit (%)
            </Label>
            <Input
              id="voltageDropLimit"
              type="number"
              step="0.1"
              min="1"
              max="10"
              value={inputs.voltageDropLimit}
              onChange={(e) => updateInput('voltageDropLimit', parseFloat(e.target.value) || 3)}
              className={`${inputClass} ${errors.voltageDropLimit ? 'border-red-500' : ''}`}
            />
          </div>
        </div>
      </div>

      {/* Installation Environment */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Installation environment
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <Label htmlFor="installationMethod" className="text-[13px] text-white/85">
              Installation method
            </Label>
            <Select
              value={inputs.installationMethod}
              onValueChange={(value) => updateInput('installationMethod', value)}
            >
              <SelectTrigger className={selectTriggerClass}>
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
            <Label htmlFor="ambientTemperature" className="text-[13px] text-white/85">
              Ambient temperature (°C)
            </Label>
            <Input
              id="ambientTemperature"
              type="number"
              value={inputs.ambientTemperature}
              onChange={(e) => updateInput('ambientTemperature', parseFloat(e.target.value) || 30)}
              className={`${inputClass} ${errors.ambientTemperature ? 'border-red-500' : ''}`}
            />
          </div>

          <div>
            <Label htmlFor="groupingFactor" className="text-[13px] text-white/85">
              Grouping factor
            </Label>
            <Input
              id="groupingFactor"
              type="number"
              step="0.1"
              min="0.1"
              max="1.0"
              value={inputs.groupingFactor}
              onChange={(e) => updateInput('groupingFactor', parseFloat(e.target.value) || 1.0)}
              className={`${inputClass} ${errors.groupingFactor ? 'border-red-500' : ''}`}
            />
          </div>
        </div>

        <label className="flex items-center gap-3 p-3 rounded-lg border border-white/[0.06] bg-white/[0.02] touch-manipulation cursor-pointer min-h-[44px]">
          <Checkbox
            id="thermalInsulation"
            checked={inputs.thermalInsulation}
            onCheckedChange={(checked) => updateInput('thermalInsulation', checked)}
            className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
          />
          <Label htmlFor="thermalInsulation" className="text-[13px] text-white/85">
            Cable in contact with thermal insulation
          </Label>
        </label>
      </div>

      {/* Cable Preferences */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Cable preferences
        </span>
        <div>
          <Label className="text-[13px] text-white/85">Preferred cable types</Label>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 mt-2">
            {['twin-and-earth', 'swa', 'lsf', 'micc', 'fplsoh'].map((type) => (
              <label
                key={type}
                className="flex items-center gap-2 p-2 rounded-lg border border-white/[0.06] bg-white/[0.02] touch-manipulation cursor-pointer min-h-[44px]"
              >
                <Checkbox
                  id={type}
                  checked={inputs.preferredCableTypes.includes(type)}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      updateInput('preferredCableTypes', [...inputs.preferredCableTypes, type]);
                    } else {
                      updateInput(
                        'preferredCableTypes',
                        inputs.preferredCableTypes.filter((t) => t !== type)
                      );
                    }
                  }}
                  className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                />
                <Label htmlFor={type} className="text-[12px] text-white/85 capitalize">
                  {type.replace('-', ' ')}
                </Label>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Protection */}
      <div className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 sm:p-5 space-y-3">
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
          Protection
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div>
            <Label htmlFor="protectionType" className="text-[13px] text-white/85">
              Protection type
            </Label>
            <Select
              value={inputs.protectionType}
              onValueChange={(value: 'mcb' | 'fuse' | 'mccb') =>
                updateInput('protectionType', value)
              }
            >
              <SelectTrigger className={selectTriggerClass}>
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
            <Label htmlFor="protectionRating" className="text-[13px] text-white/85">
              Protection rating (A)
            </Label>
            <Select
              value={inputs.protectionRating ? String(inputs.protectionRating) : '0'}
              onValueChange={(value) => updateInput('protectionRating', parseFloat(value) || 0)}
            >
              <SelectTrigger className={selectTriggerClass}>
                <SelectValue placeholder="Auto-calculate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0">Auto-calculate</SelectItem>
                <SelectItem value="6">6A</SelectItem>
                <SelectItem value="10">10A</SelectItem>
                <SelectItem value="16">16A</SelectItem>
                <SelectItem value="20">20A</SelectItem>
                <SelectItem value="25">25A</SelectItem>
                <SelectItem value="32">32A</SelectItem>
                <SelectItem value="40">40A</SelectItem>
                <SelectItem value="50">50A</SelectItem>
                <SelectItem value="63">63A</SelectItem>
                <SelectItem value="80">80A</SelectItem>
                <SelectItem value="100">100A</SelectItem>
                <SelectItem value="125">125A</SelectItem>
                <SelectItem value="160">160A</SelectItem>
                <SelectItem value="200">200A</SelectItem>
                <SelectItem value="250">250A</SelectItem>
                <SelectItem value="315">315A</SelectItem>
                <SelectItem value="400">400A</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="earthingSystem" className="text-[13px] text-white/85">
              Earthing system
            </Label>
            <Select
              value={inputs.earthingSystem}
              onValueChange={(value: 'tn-s' | 'tn-c-s' | 'tt' | 'it') =>
                updateInput('earthingSystem', value)
              }
            >
              <SelectTrigger className={selectTriggerClass}>
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
      </div>

      {/* Error Summary */}
      {hasErrors && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/[0.04] p-4 sm:p-5 space-y-2">
          <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-red-300">
            Please fix the following errors
          </span>
          <div className="space-y-1">
            {Object.entries(errors).map(([field, error]) => (
              <p key={field} className="text-[13px] text-white/85 leading-relaxed">
                • {error}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedCableSizingForm;
