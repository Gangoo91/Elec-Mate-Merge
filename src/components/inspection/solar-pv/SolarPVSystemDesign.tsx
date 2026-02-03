/**
 * Solar PV System Design Tab
 * PV Arrays, Inverters, and Battery Storage configuration
 */

import React, { useState, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Grid3X3,
  Cpu,
  Battery,
  ChevronDown,
  ChevronUp,
  Plus,
  Trash2,
  Sparkles,
  AlertTriangle,
  CheckCircle,
  Compass,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SolarPVFormData,
  PVArray,
  Inverter,
  MountingType,
  InverterType,
  BatteryChemistry,
  getDefaultPVArray,
  getDefaultInverter,
  ORIENTATIONS,
  SHADING_FACTORS,
} from '@/types/solar-pv';
import { PVPanelAutocomplete } from './PVPanelAutocomplete';
import { InverterAutocomplete } from './InverterAutocomplete';
import { useSolarPVSmartForm } from '@/hooks/inspection/useSolarPVSmartForm';

interface SolarPVSystemDesignProps {
  formData: SolarPVFormData;
  onUpdate: (field: string, value: any) => void;
}

interface SectionHeaderProps {
  title: string;
  icon: React.ElementType;
  isOpen: boolean;
  color?: string;
  count?: number;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon: Icon,
  isOpen,
  color = 'amber-500',
  count,
}) => (
  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 sm:p-5 hover:bg-white/5 transition-colors rounded-t-xl">
    <div className="flex items-center gap-3">
      <div className={cn(
        'w-10 h-10 rounded-xl flex items-center justify-center',
        `bg-${color}/15`
      )}>
        <Icon className={cn('h-5 w-5', `text-${color}`)} />
      </div>
      <div className="text-left">
        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
          {title}
          {count !== undefined && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-muted">
              {count}
            </Badge>
          )}
        </h3>
      </div>
    </div>
    {isOpen ? (
      <ChevronUp className="h-5 w-5 text-muted-foreground" />
    ) : (
      <ChevronDown className="h-5 w-5 text-muted-foreground" />
    )}
  </CollapsibleTrigger>
);

const SolarPVSystemDesign: React.FC<SolarPVSystemDesignProps> = ({
  formData,
  onUpdate,
}) => {
  const [openSections, setOpenSections] = useState({
    arrays: true,
    inverters: true,
    battery: true,
  });

  const smartForm = useSolarPVSmartForm(formData, onUpdate);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Add new array
  const addArray = useCallback(() => {
    const newArray = getDefaultPVArray(formData.arrays.length + 1);
    onUpdate('arrays', [...formData.arrays, newArray]);
  }, [formData.arrays, onUpdate]);

  // Remove array
  const removeArray = useCallback((index: number) => {
    const updatedArrays = formData.arrays.filter((_, i) => i !== index);
    // Renumber arrays
    const renumbered = updatedArrays.map((arr, i) => ({ ...arr, arrayNumber: i + 1 }));
    onUpdate('arrays', renumbered);
    smartForm.recalculateAllValues({ ...formData, arrays: renumbered }, onUpdate);
  }, [formData, onUpdate, smartForm]);

  // Update array field
  const updateArray = useCallback((index: number, field: string, value: any) => {
    const updatedArrays = [...formData.arrays];
    updatedArrays[index] = { ...updatedArrays[index], [field]: value };

    // Recalculate array values if relevant field changed
    if (['panelWattage', 'panelCount', 'vocRated', 'iscRated', 'vmpRated', 'impRated', 'panelsPerString', 'stringsInParallel', 'orientation', 'tiltAngle', 'shadingFactor'].includes(field)) {
      const calculated = smartForm.calculateArrayValues(updatedArrays[index]);
      updatedArrays[index] = { ...updatedArrays[index], ...calculated };
    }

    onUpdate('arrays', updatedArrays);

    // Recalculate totals
    const totalCapacity = updatedArrays.reduce((sum, a) =>
      sum + (a.panelWattage * a.panelCount) / 1000, 0
    );
    onUpdate('totalCapacity', Math.round(totalCapacity * 100) / 100);

    // Recalculate yield
    const { estimateAnnualYield } = require('@/data/solarPanelDatabase');
    const totalYield = updatedArrays.reduce((sum, a) => {
      const cap = (a.panelWattage * a.panelCount) / 1000;
      return sum + estimateAnnualYield(cap, a.orientation, a.tiltAngle, a.shadingFactor);
    }, 0);
    onUpdate('estimatedAnnualYield', Math.round(totalYield));
  }, [formData.arrays, onUpdate, smartForm]);

  // Add new inverter
  const addInverter = useCallback(() => {
    const newInverter = getDefaultInverter();
    onUpdate('inverters', [...formData.inverters, newInverter]);
  }, [formData.inverters, onUpdate]);

  // Remove inverter
  const removeInverter = useCallback((index: number) => {
    const updatedInverters = formData.inverters.filter((_, i) => i !== index);
    onUpdate('inverters', updatedInverters);
  }, [formData.inverters, onUpdate]);

  // Update inverter field
  const updateInverter = useCallback((index: number, field: string, value: any) => {
    const updatedInverters = [...formData.inverters];
    updatedInverters[index] = { ...updatedInverters[index], [field]: value };
    onUpdate('inverters', updatedInverters);
  }, [formData.inverters, onUpdate]);

  return (
    <div className="space-y-4 px-4 sm:px-0">
      {/* PV Arrays */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible open={openSections.arrays} onOpenChange={() => toggleSection('arrays')}>
          <SectionHeader
            title="PV Arrays"
            icon={Grid3X3}
            isOpen={openSections.arrays}
            color="amber-500"
            count={formData.arrays?.length || 0}
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-4 border-t border-white/10">
              {formData.arrays?.map((array, index) => (
                <div
                  key={array.id}
                  className="p-4 bg-muted/30 rounded-xl border border-white/10 space-y-4"
                >
                  {/* Array Header */}
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs text-amber-400">
                        {array.arrayNumber}
                      </span>
                      Array {array.arrayNumber}
                      {array.arrayCapacity > 0 && (
                        <Badge className="bg-amber-500/20 text-amber-400 border-0 text-xs">
                          {array.arrayCapacity.toFixed(2)} kWp
                        </Badge>
                      )}
                    </h4>
                    {formData.arrays.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeArray(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Panel Selection */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Panel Make & Model
                      </Label>
                      <PVPanelAutocomplete
                        value={array.panelMake && array.panelModel ? `${array.panelMake} ${array.panelModel}` : ''}
                        onPanelSelect={(panel) => {
                          if (panel) {
                            smartForm.updateArrayWithPanelSelection(
                              index,
                              panel.id,
                              formData,
                              onUpdate
                            );
                          }
                        }}
                        placeholder="Search for a panel..."
                      />
                      {array.mcsCertified && array.panelMake && (
                        <div className="flex items-center gap-1 text-green-400 text-xs">
                          <CheckCircle className="h-3 w-3" />
                          MCS Certified
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Wattage (Wp)</Label>
                        <Input
                          type="number"
                          value={array.panelWattage || ''}
                          onChange={(e) => updateArray(index, 'panelWattage', e.target.value === '' ? 0 : parseInt(e.target.value) || 0)}
                          className="h-10 text-base touch-manipulation border-white/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Panel Count</Label>
                        <Input
                          type="number"
                          value={array.panelCount || ''}
                          onChange={(e) => updateArray(index, 'panelCount', e.target.value === '' ? 0 : parseInt(e.target.value) || 0)}
                          className="h-10 text-base touch-manipulation border-white/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Voc (V)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={array.vocRated || ''}
                          onChange={(e) => updateArray(index, 'vocRated', e.target.value === '' ? 0 : parseFloat(e.target.value) || 0)}
                          className="h-10 text-base touch-manipulation border-white/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Isc (A)</Label>
                        <Input
                          type="number"
                          step="0.01"
                          value={array.iscRated || ''}
                          onChange={(e) => updateArray(index, 'iscRated', e.target.value === '' ? 0 : parseFloat(e.target.value) || 0)}
                          className="h-10 text-base touch-manipulation border-white/30"
                        />
                      </div>
                    </div>

                    {/* String Configuration */}
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Panels/String</Label>
                        <Input
                          type="number"
                          value={array.panelsPerString || array.panelCount}
                          onChange={(e) => updateArray(index, 'panelsPerString', e.target.value === '' ? 0 : parseInt(e.target.value) || 0)}
                          className="h-10 text-base touch-manipulation border-white/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Strings Parallel</Label>
                        <Input
                          type="number"
                          value={array.stringsInParallel || 1}
                          onChange={(e) => updateArray(index, 'stringsInParallel', e.target.value === '' ? 1 : parseInt(e.target.value) || 1)}
                          className="h-10 text-base touch-manipulation border-white/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">String Voc (V)</Label>
                        <Input
                          type="number"
                          value={array.stringVoltageVoc?.toFixed(1) || ''}
                          disabled
                          className="h-10 text-base touch-manipulation border-white/30 bg-muted/50"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Total Isc (A)</Label>
                        <Input
                          type="number"
                          value={array.stringCurrentIsc?.toFixed(2) || ''}
                          disabled
                          className="h-10 text-base touch-manipulation border-white/30 bg-muted/50"
                        />
                      </div>
                    </div>

                    {/* Orientation & Mounting */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground flex items-center gap-1">
                          <Compass className="h-3 w-3" />
                          Orientation
                        </Label>
                        <Select
                          value={array.orientation || 'South'}
                          onValueChange={(value) => updateArray(index, 'orientation', value)}
                        >
                          <SelectTrigger className="h-10 touch-manipulation bg-elec-gray border-elec-gray">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                            {ORIENTATIONS.map((o) => (
                              <SelectItem key={o.value} value={o.value}>
                                {o.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Tilt Angle (°)</Label>
                        <Input
                          type="number"
                          value={array.tiltAngle || 35}
                          onChange={(e) => updateArray(index, 'tiltAngle', parseInt(e.target.value) || 35)}
                          className="h-10 text-base touch-manipulation border-white/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Shading Factor</Label>
                        <Select
                          value={array.shadingFactor?.toString() || '1'}
                          onValueChange={(value) => updateArray(index, 'shadingFactor', parseFloat(value))}
                        >
                          <SelectTrigger className="h-10 touch-manipulation bg-elec-gray border-elec-gray">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                            {SHADING_FACTORS.map((s) => (
                              <SelectItem key={s.value} value={s.value.toString()}>
                                {s.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Mounting Type</Label>
                        <Select
                          value={array.mountingType || 'roof-mounted'}
                          onValueChange={(value) => updateArray(index, 'mountingType', value as MountingType)}
                        >
                          <SelectTrigger className="h-10 touch-manipulation bg-elec-gray border-elec-gray">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                            <SelectItem value="roof-mounted">Roof Mounted</SelectItem>
                            <SelectItem value="roof-integrated">Roof Integrated (BIPV)</SelectItem>
                            <SelectItem value="ground-mounted">Ground Mounted</SelectItem>
                            <SelectItem value="building-integrated">Building Integrated</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Array Button */}
              <Button
                variant="outline"
                onClick={addArray}
                className="w-full h-12 border-dashed border-white/30 hover:border-amber-500/50 hover:bg-amber-500/5"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Array
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Inverters */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible open={openSections.inverters} onOpenChange={() => toggleSection('inverters')}>
          <SectionHeader
            title="Inverter(s)"
            icon={Cpu}
            isOpen={openSections.inverters}
            color="blue-500"
            count={formData.inverters?.length || 0}
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-4 border-t border-white/10">
              {formData.inverters?.map((inverter, index) => (
                <div
                  key={inverter.id}
                  className="p-4 bg-muted/30 rounded-xl border border-white/10 space-y-4"
                >
                  {/* Inverter Header */}
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs text-blue-400">
                        {index + 1}
                      </span>
                      Inverter {index + 1}
                      {inverter.ratedPowerAc > 0 && (
                        <Badge className="bg-blue-500/20 text-blue-400 border-0 text-xs">
                          {inverter.ratedPowerAc} kW
                        </Badge>
                      )}
                    </h4>
                    {formData.inverters.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeInverter(index)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>

                  {/* Inverter Selection */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Inverter Make & Model
                      </Label>
                      <InverterAutocomplete
                        value={inverter.make && inverter.model ? `${inverter.make} ${inverter.model}` : ''}
                        onInverterSelect={(selectedInverter) => {
                          if (selectedInverter) {
                            smartForm.updateInverterWithSelection(
                              index,
                              selectedInverter.id,
                              formData,
                              onUpdate
                            );
                          }
                        }}
                        placeholder="Search for an inverter..."
                      />
                      {inverter.mcsCertified && inverter.make && (
                        <div className="flex items-center gap-1 text-green-400 text-xs">
                          <CheckCircle className="h-3 w-3" />
                          MCS Certified
                        </div>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Serial Number</Label>
                        <Input
                          value={inverter.serialNumber || ''}
                          onChange={(e) => updateInverter(index, 'serialNumber', e.target.value)}
                          className="h-10 text-base touch-manipulation border-white/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">AC Power (kW)</Label>
                        <Input
                          type="number"
                          step="0.1"
                          value={inverter.ratedPowerAc || ''}
                          onChange={(e) => updateInverter(index, 'ratedPowerAc', parseFloat(e.target.value) || 0)}
                          className="h-10 text-base touch-manipulation border-white/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Type</Label>
                        <Select
                          value={inverter.type || 'string'}
                          onValueChange={(value) => updateInverter(index, 'type', value as InverterType)}
                        >
                          <SelectTrigger className="h-10 touch-manipulation bg-elec-gray border-elec-gray">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                            <SelectItem value="string">String Inverter</SelectItem>
                            <SelectItem value="micro">Microinverter</SelectItem>
                            <SelectItem value="hybrid">Hybrid Inverter</SelectItem>
                            <SelectItem value="central">Central Inverter</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">MPPT Count</Label>
                        <Input
                          type="number"
                          value={inverter.mpptCount || 2}
                          onChange={(e) => updateInverter(index, 'mpptCount', parseInt(e.target.value) || 1)}
                          className="h-10 text-base touch-manipulation border-white/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Max DC Voltage (V)</Label>
                        <Input
                          type="number"
                          value={inverter.maxInputVoltage || ''}
                          onChange={(e) => updateInverter(index, 'maxInputVoltage', parseInt(e.target.value) || 0)}
                          className="h-10 text-base touch-manipulation border-white/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Location</Label>
                        <Input
                          value={inverter.location || ''}
                          onChange={(e) => updateInverter(index, 'location', e.target.value)}
                          placeholder="e.g., Garage"
                          className="h-10 text-base touch-manipulation border-white/30"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label className="text-xs text-muted-foreground">Phases</Label>
                        <Select
                          value={inverter.phases || 'single'}
                          onValueChange={(value) => updateInverter(index, 'phases', value as 'single' | 'three')}
                        >
                          <SelectTrigger className="h-10 touch-manipulation bg-elec-gray border-elec-gray">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                            <SelectItem value="single">Single Phase</SelectItem>
                            <SelectItem value="three">Three Phase</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Add Inverter Button */}
              <Button
                variant="outline"
                onClick={addInverter}
                className="w-full h-12 border-dashed border-white/30 hover:border-blue-500/50 hover:bg-blue-500/5"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Inverter
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Battery Storage */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible open={openSections.battery} onOpenChange={() => toggleSection('battery')}>
          <SectionHeader
            title="Battery Storage"
            icon={Battery}
            isOpen={openSections.battery}
            color="green-500"
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-4 border-t border-white/10">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg min-h-[48px]">
                <Checkbox
                  id="batteryInstalled"
                  checked={formData.battery?.installed || false}
                  onCheckedChange={(checked) => {
                    onUpdate('battery', {
                      ...formData.battery,
                      installed: checked,
                    });
                  }}
                  className="h-5 w-5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                />
                <Label
                  htmlFor="batteryInstalled"
                  className="text-sm text-foreground cursor-pointer"
                >
                  Battery storage included in this installation
                </Label>
              </div>

              {formData.battery?.installed && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Make</Label>
                      <Input
                        value={formData.battery?.make || ''}
                        onChange={(e) => onUpdate('battery', { ...formData.battery, make: e.target.value })}
                        placeholder="e.g., GivEnergy"
                        className="h-10 text-base touch-manipulation border-white/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Model</Label>
                      <Input
                        value={formData.battery?.model || ''}
                        onChange={(e) => onUpdate('battery', { ...formData.battery, model: e.target.value })}
                        placeholder="e.g., All-in-One"
                        className="h-10 text-base touch-manipulation border-white/30"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Serial Number</Label>
                      <Input
                        value={formData.battery?.serialNumber || ''}
                        onChange={(e) => onUpdate('battery', { ...formData.battery, serialNumber: e.target.value })}
                        className="h-10 text-base touch-manipulation border-white/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Usable Capacity (kWh)</Label>
                      <Input
                        type="number"
                        step="0.1"
                        value={formData.battery?.capacity || ''}
                        onChange={(e) => onUpdate('battery', { ...formData.battery, capacity: parseFloat(e.target.value) || 0 })}
                        className="h-10 text-base touch-manipulation border-white/30"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label className="text-xs text-muted-foreground">Chemistry</Label>
                      <Select
                        value={formData.battery?.chemistry || 'lithium-ion'}
                        onValueChange={(value) => onUpdate('battery', { ...formData.battery, chemistry: value as BatteryChemistry })}
                      >
                        <SelectTrigger className="h-10 touch-manipulation bg-elec-gray border-elec-gray">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                          <SelectItem value="lithium-ion">Lithium Ion (NMC)</SelectItem>
                          <SelectItem value="lfp">Lithium Iron Phosphate (LFP)</SelectItem>
                          <SelectItem value="lead-acid">Lead Acid</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs text-muted-foreground">Location</Label>
                    <Input
                      value={formData.battery?.location || ''}
                      onChange={(e) => onUpdate('battery', { ...formData.battery, location: e.target.value })}
                      placeholder="e.g., Garage, Utility Room"
                      className="h-10 text-base touch-manipulation border-white/30"
                    />
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
};

export default SolarPVSystemDesign;
