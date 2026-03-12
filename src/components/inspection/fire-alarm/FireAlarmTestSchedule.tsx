import React, { useState, useEffect, useMemo } from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import {
  ChevronDown,
  CheckCircle2,
  XCircle,
  Minus,
  Settings,
  Battery,
  AlertTriangle,
  Volume2,
  Plus,
  Trash2,
  Info,
  Gauge,
  Thermometer,
  ClipboardCheck,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  useFireAlarmSmartForm,
  SoundValidationResult,
} from '@/hooks/inspection/useFireAlarmSmartForm';
import { AreaType } from '@/data/fireAlarmCompliance';

interface FireAlarmTestScheduleProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

type TestResult = 'pass' | 'fail' | 'na' | '';

const TestResultSelect: React.FC<{
  value: TestResult;
  onChange: (value: TestResult) => void;
  id?: string;
}> = ({ value, onChange, id }) => (
  <Select value={value || ''} onValueChange={(v) => onChange(v as TestResult)}>
    <SelectTrigger
      className="h-11 touch-manipulation w-full bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
      id={id}
    >
      <SelectValue placeholder="Select">
        {value === 'pass' && (
          <span className="flex items-center gap-2 text-green-400">
            <CheckCircle2 className="h-4 w-4" /> Pass
          </span>
        )}
        {value === 'fail' && (
          <span className="flex items-center gap-2 text-red-400">
            <XCircle className="h-4 w-4" /> Fail
          </span>
        )}
        {value === 'na' && (
          <span className="flex items-center gap-2 text-white">
            <Minus className="h-4 w-4" /> N/A
          </span>
        )}
        {!value && <span className="text-white">Select</span>}
      </SelectValue>
    </SelectTrigger>
    <SelectContent className="z-[100] bg-background border-border text-foreground">
      <SelectItem value="pass">
        <span className="flex items-center gap-2 text-green-400">
          <CheckCircle2 className="h-4 w-4" /> Pass
        </span>
      </SelectItem>
      <SelectItem value="fail">
        <span className="flex items-center gap-2 text-red-400">
          <XCircle className="h-4 w-4" /> Fail
        </span>
      </SelectItem>
      <SelectItem value="na">
        <span className="flex items-center gap-2 text-white">
          <Minus className="h-4 w-4" /> N/A
        </span>
      </SelectItem>
    </SelectContent>
  </Select>
);

const FireAlarmTestSchedule: React.FC<FireAlarmTestScheduleProps> = ({ formData, onUpdate }) => {
  const isMobile = useIsMobile();
  const { validateSoundReading, getMinimumDbRequired } = useFireAlarmSmartForm();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    panel: true,
    power: true,
    fault: true,
    soundLevels: true,
    devicesTested: false,
    testEquipment: false,
    environmental: false,
    deviceSchedule: false,
  });

  // Store validation results for each sound reading
  const [validationResults, setValidationResults] = useState<Record<string, SoundValidationResult>>(
    {}
  );

  // A3: Auto-calculate calibration due dates (+12 months)
  useEffect(() => {
    const items = formData.testEquipment || [];
    if (items.length === 0) return;

    let needsUpdate = false;
    const updated = items.map((item: any) => {
      if (item.calibrationDate && !item.calibrationDue) {
        const calDate = new Date(item.calibrationDate);
        if (!isNaN(calDate.getTime())) {
          const dueDate = new Date(calDate);
          dueDate.setFullYear(dueDate.getFullYear() + 1);
          needsUpdate = true;
          return { ...item, calibrationDue: dueDate.toISOString().split('T')[0] };
        }
      }
      return item;
    });

    if (needsUpdate) {
      onUpdate('testEquipment', updated);
    }
  }, [formData.testEquipment, onUpdate]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updatePanelTest = (field: string, value: TestResult) => {
    const currentTests = formData.panelTests || {};
    onUpdate('panelTests', { ...currentTests, [field]: value });
  };

  const updatePowerTest = (field: string, value: any) => {
    const currentTests = formData.powerTests || {};
    onUpdate('powerTests', { ...currentTests, [field]: value });
  };

  const updateFaultTest = (field: string, value: TestResult) => {
    const currentTests = formData.faultTests || {};
    onUpdate('faultTests', { ...currentTests, [field]: value });
  };

  const panelTests = formData.panelTests || {};
  const powerTests = formData.powerTests || {};
  const faultTests = formData.faultTests || {};

  // Sound level readings
  const addSoundReading = () => {
    const readings = formData.soundLevelReadings || [];
    const newReading = {
      id: `sound-${Date.now()}`,
      zone: '',
      location: '',
      dBReading: '',
      minRequired: '65',
      result: '' as TestResult,
    };
    onUpdate('soundLevelReadings', [...readings, newReading]);
  };

  const updateSoundReading = (id: string, field: string, value: any) => {
    const readings = formData.soundLevelReadings || [];
    const updatedReadings = readings.map((r: any) => (r.id === id ? { ...r, [field]: value } : r));
    onUpdate('soundLevelReadings', updatedReadings);
  };

  const removeSoundReading = (id: string) => {
    const readings = formData.soundLevelReadings || [];
    onUpdate(
      'soundLevelReadings',
      readings.filter((r: any) => r.id !== id)
    );

    // Remove validation result
    setValidationResults((prev) => {
      const newResults = { ...prev };
      delete newResults[id];
      return newResults;
    });
  };

  // Auto-validate sound reading when dB or area type changes
  const handleSoundReadingChange = (id: string, field: string, value: any) => {
    updateSoundReading(id, field, value);

    // Get the current reading to access all fields
    const readings = formData.soundLevelReadings || [];
    const currentReading = readings.find((r: any) => r.id === id);
    if (!currentReading) return;

    // Update the field value for validation
    const updatedReading = { ...currentReading, [field]: value };

    // If dB reading or area type changed, validate and auto-set result
    if (field === 'dBReading' || field === 'areaType') {
      const dbValue = field === 'dBReading' ? value : updatedReading.dBReading;
      const areaType =
        ((field === 'areaType' ? value : updatedReading.areaType) as AreaType) || 'general';

      if (dbValue) {
        const result = validateSoundReading(dbValue, areaType);
        setValidationResults((prev) => ({ ...prev, [id]: result }));

        // Auto-set the result and minRequired based on validation
        updateSoundReading(id, 'result', result.isValid ? 'pass' : 'fail');
        updateSoundReading(id, 'minRequired', String(result.minRequired));
      }
    }
  };

  // Get area type options
  const areaTypeOptions = [
    { value: 'general', label: 'General Occupied Area', minDb: 65 },
    { value: 'sleeping', label: 'Sleeping/Bedroom', minDb: 75 },
    { value: 'noisy', label: 'Noisy Environment', minDb: 75 },
    { value: 'external', label: 'External/Outdoor', minDb: 65 },
  ];

  return (
    <div className={cn(isMobile ? 'space-y-0' : 'space-y-6')}>
      {/* Control Panel Tests */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible open={openSections.panel} onOpenChange={() => toggleSection('panel')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20">
                <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Settings className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Control Panel Tests</h3>
                  <span className="text-xs text-white">Power, zones, indicators</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform shrink-0',
                    openSections.panel && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <Settings className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-white font-semibold">Control Panel Tests</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.panel && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Power On Indicator</Label>
                  <TestResultSelect
                    value={panelTests.powerOnTest || ''}
                    onChange={(v) => updatePanelTest('powerOnTest', v)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Zone Indicators</Label>
                  <TestResultSelect
                    value={panelTests.zoneIndicators || ''}
                    onChange={(v) => updatePanelTest('zoneIndicators', v)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Fault Indicators</Label>
                  <TestResultSelect
                    value={panelTests.faultIndicators || ''}
                    onChange={(v) => updatePanelTest('faultIndicators', v)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Silence Facility</Label>
                  <TestResultSelect
                    value={panelTests.silenceFacility || ''}
                    onChange={(v) => updatePanelTest('silenceFacility', v)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Reset Function</Label>
                  <TestResultSelect
                    value={panelTests.resetFunction || ''}
                    onChange={(v) => updatePanelTest('resetFunction', v)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Event Log</Label>
                  <TestResultSelect
                    value={panelTests.eventLog || ''}
                    onChange={(v) => updatePanelTest('eventLog', v)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Remote Signalling</Label>
                  <TestResultSelect
                    value={panelTests.remoteSignalling || ''}
                    onChange={(v) => updatePanelTest('remoteSignalling', v)}
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Power & Battery Tests */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible open={openSections.power} onOpenChange={() => toggleSection('power')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                  <Battery className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Power & Battery Tests</h3>
                  <span className="text-xs text-white">Mains, charger, backup</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform shrink-0',
                    openSections.power && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                    <Battery className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-white font-semibold">Power & Battery Tests</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.power && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Mains Supply</Label>
                  <TestResultSelect
                    value={powerTests.mainsSupply || ''}
                    onChange={(v) => updatePowerTest('mainsSupply', v)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Battery Voltage (V)</Label>
                  <Input
                    type="text"
                    placeholder="e.g., 26.4V"
                    value={powerTests.batteryVoltage || ''}
                    onChange={(e) => updatePowerTest('batteryVoltage', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Battery Condition</Label>
                  <TestResultSelect
                    value={powerTests.batteryCondition || ''}
                    onChange={(v) => updatePowerTest('batteryCondition', v)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Charger Operation</Label>
                  <TestResultSelect
                    value={powerTests.chargerOperation || ''}
                    onChange={(v) => updatePowerTest('chargerOperation', v)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Standby Duration Test</Label>
                  <TestResultSelect
                    value={powerTests.standbyDuration || ''}
                    onChange={(v) => updatePowerTest('standbyDuration', v)}
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Fault Simulation Tests */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible open={openSections.fault} onOpenChange={() => toggleSection('fault')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Fault Simulation Tests</h3>
                  <span className="text-xs text-white">Open, short, earth faults</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform shrink-0',
                    openSections.fault && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                  </div>
                  <span className="text-white font-semibold">Fault Simulation Tests</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.fault && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Open Circuit Fault</Label>
                  <TestResultSelect
                    value={faultTests.openCircuit || ''}
                    onChange={(v) => updateFaultTest('openCircuit', v)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Short Circuit Fault</Label>
                  <TestResultSelect
                    value={faultTests.shortCircuit || ''}
                    onChange={(v) => updateFaultTest('shortCircuit', v)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Earth Fault</Label>
                  <TestResultSelect
                    value={faultTests.earthFault || ''}
                    onChange={(v) => updateFaultTest('earthFault', v)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Power Fail Indication</Label>
                  <TestResultSelect
                    value={faultTests.powerFail || ''}
                    onChange={(v) => updateFaultTest('powerFail', v)}
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Sound Level Readings */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible
          open={openSections.soundLevels}
          onOpenChange={() => toggleSection('soundLevels')}
        >
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                  <Volume2 className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Sound Level Readings</h3>
                  <span className="text-xs text-white">
                    {(formData.soundLevelReadings || []).length} readings
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform shrink-0',
                    openSections.soundLevels && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
                    <Volume2 className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-white font-semibold">Sound Level Readings</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.soundLevels && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              {/* BS 5839 Info Box */}
              <div className="flex items-start gap-3 p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg">
                <Info className="h-5 w-5 text-purple-400 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-foreground">BS 5839-1 Sound Level Requirements</p>
                  <p className="text-white mt-1">
                    Minimum <span className="text-green-400 font-medium">65 dB(A)</span> in general
                    occupied areas
                    <br />
                    Minimum <span className="text-orange-400 font-medium">75 dB(A)</span> in
                    bedrooms/sleeping areas
                  </p>
                </div>
              </div>

              {(formData.soundLevelReadings || []).map((reading: any, index: number) => {
                const validation = validationResults[reading.id];

                return (
                  <div
                    key={reading.id}
                    className="border-b border-white/10 pb-4 last:border-0 last:pb-0"
                  >
                    {/* Header Row */}
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-foreground">
                          Reading {index + 1}
                        </span>
                        {/* Auto-validation badge */}
                        {validation && (
                          <span
                            className={cn(
                              'px-2 py-0.5 rounded text-[10px] font-bold',
                              validation.isValid
                                ? 'bg-green-500/20 text-green-400'
                                : 'bg-red-500/20 text-red-400'
                            )}
                          >
                            {validation.isValid ? 'PASS' : 'FAIL'}
                          </span>
                        )}
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeSoundReading(reading.id)}
                        className="h-11 w-11 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10 touch-manipulation active:scale-[0.98] transition-transform"
                        aria-label="Remove item"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>

                    {/* Validation message */}
                    {validation && !validation.isValid && (
                      <div className="mb-3 px-3 py-2 bg-red-500/10 border border-red-500/30 rounded text-xs text-red-300">
                        {validation.message}
                      </div>
                    )}

                    {/* Fields */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      <div className="space-y-2">
                        <Label className="text-sm">Zone</Label>
                        <Input
                          placeholder="Zone 1"
                          value={reading.zone || ''}
                          onChange={(e) => updateSoundReading(reading.id, 'zone', e.target.value)}
                          className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Location</Label>
                        <Input
                          placeholder="Main corridor"
                          value={reading.location || ''}
                          onChange={(e) =>
                            updateSoundReading(reading.id, 'location', e.target.value)
                          }
                          className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Area Type</Label>
                        <Select
                          value={reading.areaType || 'general'}
                          onValueChange={(v) => handleSoundReadingChange(reading.id, 'areaType', v)}
                        >
                          <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="z-[100] bg-elec-gray border-white/20 text-foreground">
                            {areaTypeOptions.map((opt) => (
                              <SelectItem key={opt.value} value={opt.value}>
                                {opt.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">dB Reading</Label>
                        <Input
                          placeholder="dB(A)"
                          type="number"
                          min="0"
                          value={reading.dBReading || ''}
                          onChange={(e) =>
                            handleSoundReadingChange(reading.id, 'dBReading', e.target.value)
                          }
                          className={cn(
                            'h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow',
                            validation?.isValid === false && 'border-red-500/50',
                            validation?.isValid === true && 'border-green-500/50'
                          )}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Min Required</Label>
                        <Input
                          value={
                            reading.minRequired ||
                            getMinimumDbRequired(reading.areaType || 'general')
                          }
                          className="h-11 text-base touch-manipulation border-white/30 bg-black/20"
                          readOnly
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Result</Label>
                        <TestResultSelect
                          value={reading.result || ''}
                          onChange={(v) => updateSoundReading(reading.id, 'result', v)}
                        />
                      </div>
                    </div>
                  </div>
                );
              })}

              <Button
                variant="outline"
                className="w-full h-11 touch-manipulation border-dashed border-white/20 hover:border-elec-yellow hover:bg-elec-yellow/10"
                onClick={addSoundReading}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Sound Level Reading
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Devices Tested Count - Periodic only */}
      {formData.certificateType === 'periodic' && (
        <div className={cn(isMobile ? '' : 'eicr-section-card')}>
          <Collapsible open={openSections.devicesTested} onOpenChange={() => toggleSection('devicesTested')}>
            <CollapsibleTrigger className="w-full">
              {isMobile ? (
                <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                  <div className="h-10 w-10 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                    <Gauge className="h-5 w-5 text-cyan-400" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-semibold text-foreground">Devices Tested</h3>
                    <span className="text-xs text-white">Rolling programme (Cl.45.4)</span>
                  </div>
                  <ChevronDown className={cn('h-5 w-5 text-white transition-transform shrink-0', openSections.devicesTested && 'rotate-180')} />
                </div>
              ) : (
                <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-cyan-500/15 flex items-center justify-center">
                      <Gauge className="h-4 w-4 text-cyan-400" />
                    </div>
                    <span className="text-white font-semibold">Devices Tested Count</span>
                  </div>
                  <ChevronDown className={cn('h-5 w-5 text-white transition-transform', openSections.devicesTested && 'rotate-180')} />
                </div>
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
                {/* B3: Warning if devices tested exceeds total */}
                {(formData.devicesTestedCount || 0) > 0 && (formData.devicesTotalCount || 0) > 0 && formData.devicesTestedCount > formData.devicesTotalCount && (
                  <div className="flex items-start gap-3 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
                    <AlertTriangle className="h-4 w-4 text-yellow-400 shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-300">Devices tested ({formData.devicesTestedCount}) exceeds total devices ({formData.devicesTotalCount})</p>
                  </div>
                )}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Devices Tested</Label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.devicesTestedCount || ''}
                      onChange={(e) => onUpdate('devicesTestedCount', e.target.value === '' ? 0 : parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Total Devices</Label>
                    <Input
                      type="number"
                      min="0"
                      value={formData.devicesTotalCount || ''}
                      onChange={(e) => onUpdate('devicesTotalCount', e.target.value === '' ? 0 : parseInt(e.target.value) || 0)}
                      placeholder="0"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Percentage</Label>
                    <div className="h-11 flex items-center px-3 rounded-md border border-white/20 bg-black/20 text-base">
                      {formData.devicesTotalCount > 0
                        ? `${Math.round((formData.devicesTestedCount / formData.devicesTotalCount) * 100)}%`
                        : '0%'}
                    </div>
                  </div>
                </div>
                <div
                  className={cn(
                    'flex items-center gap-3 h-12 px-4 rounded-lg cursor-pointer transition-colors',
                    formData.deviceTestingComplete
                      ? 'bg-green-500/10 border border-green-500/30'
                      : 'bg-black/30 border border-white/10 hover:border-white/20'
                  )}
                  onClick={() => onUpdate('deviceTestingComplete', !formData.deviceTestingComplete)}
                >
                  <Checkbox
                    checked={formData.deviceTestingComplete || false}
                    onCheckedChange={(checked) => onUpdate('deviceTestingComplete', checked as boolean)}
                    className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white h-5 w-5 shrink-0"
                  />
                  <Label className="cursor-pointer text-sm font-medium text-foreground">
                    All devices tested in rolling programme
                  </Label>
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Test Equipment Details */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible open={openSections.testEquipment} onOpenChange={() => toggleSection('testEquipment')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                  <ClipboardCheck className="h-5 w-5 text-indigo-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Test Equipment</h3>
                  <span className="text-xs text-white">
                    {(formData.testEquipment || []).length} instruments
                  </span>
                </div>
                <ChevronDown className={cn('h-5 w-5 text-white transition-transform shrink-0', openSections.testEquipment && 'rotate-180')} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-500/15 flex items-center justify-center">
                    <ClipboardCheck className="h-4 w-4 text-indigo-400" />
                  </div>
                  <span className="text-white font-semibold">Test Equipment Details</span>
                </div>
                <ChevronDown className={cn('h-5 w-5 text-white transition-transform', openSections.testEquipment && 'rotate-180')} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              {(formData.testEquipment || []).map((item: any, index: number) => (
                <div key={item.id} className="bg-black/40 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium text-sm">Equipment {index + 1}</h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const items = formData.testEquipment || [];
                        onUpdate('testEquipment', items.filter((i: any) => i.id !== item.id));
                      }}
                      className="h-11 w-11 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10 touch-manipulation"
                      aria-label="Remove equipment"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <div className="space-y-2">
                      <Label className="text-sm">Type</Label>
                      <Select
                        value={item.type || ''}
                        onValueChange={(v) => {
                          const items = [...(formData.testEquipment || [])];
                          const idx = items.findIndex((i: any) => i.id === item.id);
                          if (idx >= 0) { items[idx] = { ...items[idx], type: v }; onUpdate('testEquipment', items); }
                        }}
                      >
                        <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                          <SelectValue placeholder="Select" />
                        </SelectTrigger>
                        <SelectContent className="z-[100] bg-background border-border text-foreground">
                          <SelectItem value="sound-level-meter">Sound Level Meter</SelectItem>
                          <SelectItem value="smoke-detector-tester">Smoke Detector Tester</SelectItem>
                          <SelectItem value="heat-detector-tester">Heat Detector Tester</SelectItem>
                          <SelectItem value="call-point-key">Call Point Key</SelectItem>
                          <SelectItem value="multimeter">Multimeter</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Make</Label>
                      <Input
                        placeholder="Manufacturer"
                        value={item.make || ''}
                        onChange={(e) => {
                          const items = [...(formData.testEquipment || [])];
                          const idx = items.findIndex((i: any) => i.id === item.id);
                          if (idx >= 0) { items[idx] = { ...items[idx], make: e.target.value }; onUpdate('testEquipment', items); }
                        }}
                        className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Model</Label>
                      <Input
                        placeholder="Model"
                        value={item.model || ''}
                        onChange={(e) => {
                          const items = [...(formData.testEquipment || [])];
                          const idx = items.findIndex((i: any) => i.id === item.id);
                          if (idx >= 0) { items[idx] = { ...items[idx], model: e.target.value }; onUpdate('testEquipment', items); }
                        }}
                        className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Serial Number</Label>
                      <Input
                        placeholder="S/N"
                        value={item.serialNumber || ''}
                        onChange={(e) => {
                          const items = [...(formData.testEquipment || [])];
                          const idx = items.findIndex((i: any) => i.id === item.id);
                          if (idx >= 0) { items[idx] = { ...items[idx], serialNumber: e.target.value }; onUpdate('testEquipment', items); }
                        }}
                        className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Calibration Date</Label>
                      <Input
                        type="date"
                        value={item.calibrationDate || ''}
                        onChange={(e) => {
                          const items = [...(formData.testEquipment || [])];
                          const idx = items.findIndex((i: any) => i.id === item.id);
                          if (idx >= 0) { items[idx] = { ...items[idx], calibrationDate: e.target.value }; onUpdate('testEquipment', items); }
                        }}
                        className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Calibration Due</Label>
                      <Input
                        type="date"
                        value={item.calibrationDue || ''}
                        onChange={(e) => {
                          const items = [...(formData.testEquipment || [])];
                          const idx = items.findIndex((i: any) => i.id === item.id);
                          if (idx >= 0) { items[idx] = { ...items[idx], calibrationDue: e.target.value }; onUpdate('testEquipment', items); }
                        }}
                        className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                      {item.calibrationDate && item.calibrationDue && (
                        <p className="text-xs text-green-400">Auto-calculated: 12 months from calibration date</p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full h-11 touch-manipulation border-dashed border-white/20 hover:border-indigo-500 hover:bg-indigo-500/10"
                onClick={() => {
                  const items = formData.testEquipment || [];
                  onUpdate('testEquipment', [...items, {
                    id: `te-${Date.now()}`,
                    type: '',
                    make: '',
                    model: '',
                    serialNumber: '',
                    calibrationDate: '',
                    calibrationDue: '',
                  }]);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Test Equipment
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Environmental Conditions */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible open={openSections.environmental} onOpenChange={() => toggleSection('environmental')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-teal-500/20 flex items-center justify-center shrink-0">
                  <Thermometer className="h-5 w-5 text-teal-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Environmental Conditions</h3>
                  <span className="text-xs text-white">Temperature, noise, weather</span>
                </div>
                <ChevronDown className={cn('h-5 w-5 text-white transition-transform shrink-0', openSections.environmental && 'rotate-180')} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-teal-500/15 flex items-center justify-center">
                    <Thermometer className="h-4 w-4 text-teal-400" />
                  </div>
                  <span className="text-white font-semibold">Environmental Conditions</span>
                </div>
                <ChevronDown className={cn('h-5 w-5 text-white transition-transform', openSections.environmental && 'rotate-180')} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Ambient Temperature (C)</Label>
                  <Input
                    placeholder="e.g., 21"
                    value={formData.ambientTemperature || ''}
                    onChange={(e) => onUpdate('ambientTemperature', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Ambient Noise Level (dB)</Label>
                  <Input
                    placeholder="e.g., 45"
                    value={formData.ambientNoiseLevel || ''}
                    onChange={(e) => onUpdate('ambientNoiseLevel', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Weather Conditions</Label>
                  <Select
                    value={formData.weatherConditions || ''}
                    onValueChange={(value) => onUpdate('weatherConditions', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="dry">Dry</SelectItem>
                      <SelectItem value="wet">Wet</SelectItem>
                      <SelectItem value="windy">Windy</SelectItem>
                      <SelectItem value="extreme-heat">Extreme Heat</SelectItem>
                      <SelectItem value="extreme-cold">Extreme Cold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Individual Device Test Schedule */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible open={openSections.deviceSchedule} onOpenChange={() => toggleSection('deviceSchedule')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                  <ClipboardCheck className="h-5 w-5 text-red-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Device Test Schedule</h3>
                  <span className="text-xs text-white">
                    Individual device results
                  </span>
                </div>
                <ChevronDown className={cn('h-5 w-5 text-white transition-transform shrink-0', openSections.deviceSchedule && 'rotate-180')} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center">
                    <ClipboardCheck className="h-4 w-4 text-red-400" />
                  </div>
                  <span className="text-white font-semibold">Individual Device Test Schedule</span>
                </div>
                <ChevronDown className={cn('h-5 w-5 text-white transition-transform', openSections.deviceSchedule && 'rotate-180')} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-6', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              {/* Detectors */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-red-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-red-400"></div>
                  Detectors ({(formData.detectors || []).length})
                </h4>
                {(formData.detectors || []).map((device: any, index: number) => (
                  <div key={device.id} className="bg-black/40 rounded-lg p-3">
                    <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                      <Input placeholder="Location" value={device.location || ''} onChange={(e) => {
                        const items = [...(formData.detectors || [])];
                        items[index] = { ...items[index], location: e.target.value };
                        onUpdate('detectors', items);
                      }} className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow" />
                      <Input placeholder="Device ID" value={device.serialNumber || ''} onChange={(e) => {
                        const items = [...(formData.detectors || [])];
                        items[index] = { ...items[index], serialNumber: e.target.value };
                        onUpdate('detectors', items);
                      }} className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow" />
                      <Input placeholder="Type" value={device.type || ''} onChange={(e) => {
                        const items = [...(formData.detectors || [])];
                        items[index] = { ...items[index], type: e.target.value };
                        onUpdate('detectors', items);
                      }} className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow" />
                      <TestResultSelect value={device.testResult || ''} onChange={(v) => {
                        const items = [...(formData.detectors || [])];
                        items[index] = { ...items[index], testResult: v };
                        onUpdate('detectors', items);
                      }} />
                      <Button variant="ghost" size="sm" onClick={() => {
                        const items = (formData.detectors || []).filter((_: any, i: number) => i !== index);
                        onUpdate('detectors', items);
                      }} className="h-11 w-11 p-0 text-red-400 hover:bg-red-500/10 touch-manipulation"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="h-11 touch-manipulation border-dashed border-white/20 hover:border-red-500 hover:bg-red-500/10" onClick={() => {
                  const items = formData.detectors || [];
                  onUpdate('detectors', [...items, { id: `det-${Date.now()}`, zoneId: '', location: '', type: '', make: '', model: '', serialNumber: '', installDate: '', testResult: '', notes: '' }]);
                }}><Plus className="h-3.5 w-3.5 mr-1" />Add Detector</Button>
              </div>

              {/* Call Points */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-green-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400"></div>
                  Call Points ({(formData.callPoints || []).length})
                </h4>
                {(formData.callPoints || []).map((device: any, index: number) => (
                  <div key={device.id} className="bg-black/40 rounded-lg p-3">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                      <Input placeholder="Location" value={device.location || ''} onChange={(e) => {
                        const items = [...(formData.callPoints || [])];
                        items[index] = { ...items[index], location: e.target.value };
                        onUpdate('callPoints', items);
                      }} className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow" />
                      <Input placeholder="Type" value={device.type || ''} onChange={(e) => {
                        const items = [...(formData.callPoints || [])];
                        items[index] = { ...items[index], type: e.target.value };
                        onUpdate('callPoints', items);
                      }} className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow" />
                      <TestResultSelect value={device.testResult || ''} onChange={(v) => {
                        const items = [...(formData.callPoints || [])];
                        items[index] = { ...items[index], testResult: v };
                        onUpdate('callPoints', items);
                      }} />
                      <Button variant="ghost" size="sm" onClick={() => {
                        const items = (formData.callPoints || []).filter((_: any, i: number) => i !== index);
                        onUpdate('callPoints', items);
                      }} className="h-11 w-11 p-0 text-red-400 hover:bg-red-500/10 touch-manipulation"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="h-11 touch-manipulation border-dashed border-white/20 hover:border-green-500 hover:bg-green-500/10" onClick={() => {
                  const items = formData.callPoints || [];
                  onUpdate('callPoints', [...items, { id: `cp-${Date.now()}`, zoneId: '', location: '', type: 'resettable', make: '', model: '', testResult: '' }]);
                }}><Plus className="h-3.5 w-3.5 mr-1" />Add Call Point</Button>
              </div>

              {/* Sounders */}
              <div className="space-y-3">
                <h4 className="font-medium text-sm text-orange-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                  Sounders ({(formData.sounders || []).length})
                </h4>
                {(formData.sounders || []).map((device: any, index: number) => (
                  <div key={device.id} className="bg-black/40 rounded-lg p-3">
                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                      <Input placeholder="Location" value={device.location || ''} onChange={(e) => {
                        const items = [...(formData.sounders || [])];
                        items[index] = { ...items[index], location: e.target.value };
                        onUpdate('sounders', items);
                      }} className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow" />
                      <Input placeholder="dB Reading" value={device.dBReading || ''} onChange={(e) => {
                        const items = [...(formData.sounders || [])];
                        items[index] = { ...items[index], dBReading: e.target.value };
                        onUpdate('sounders', items);
                      }} className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow" />
                      <TestResultSelect value={device.testResult || ''} onChange={(v) => {
                        const items = [...(formData.sounders || [])];
                        items[index] = { ...items[index], testResult: v };
                        onUpdate('sounders', items);
                      }} />
                      <Button variant="ghost" size="sm" onClick={() => {
                        const items = (formData.sounders || []).filter((_: any, i: number) => i !== index);
                        onUpdate('sounders', items);
                      }} className="h-11 w-11 p-0 text-red-400 hover:bg-red-500/10 touch-manipulation"><Trash2 className="h-3.5 w-3.5" /></Button>
                    </div>
                  </div>
                ))}
                <Button variant="outline" size="sm" className="h-11 touch-manipulation border-dashed border-white/20 hover:border-orange-500 hover:bg-orange-500/10" onClick={() => {
                  const items = formData.sounders || [];
                  onUpdate('sounders', [...items, { id: `snd-${Date.now()}`, zoneId: '', location: '', type: 'electronic-sounder', make: '', model: '', dBReading: '', testResult: '' }]);
                }}><Plus className="h-3.5 w-3.5 mr-1" />Add Sounder</Button>
              </div>

              {/* Summary */}
              {((formData.detectors || []).length > 0 || (formData.callPoints || []).length > 0 || (formData.sounders || []).length > 0) && (
                <div className="bg-black/40 rounded-xl p-4">
                  <h4 className="font-medium mb-3 text-sm text-elec-yellow">Device Test Summary</h4>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="text-center p-2 bg-green-500/10 rounded-lg">
                      <p className="text-lg font-bold text-green-400">
                        {[...(formData.detectors || []), ...(formData.callPoints || []), ...(formData.sounders || [])].filter((d: any) => d.testResult === 'pass').length}
                      </p>
                      <p className="text-white text-xs">Pass</p>
                    </div>
                    <div className="text-center p-2 bg-red-500/10 rounded-lg">
                      <p className="text-lg font-bold text-red-400">
                        {[...(formData.detectors || []), ...(formData.callPoints || []), ...(formData.sounders || [])].filter((d: any) => d.testResult === 'fail').length}
                      </p>
                      <p className="text-white text-xs">Fail</p>
                    </div>
                    <div className="text-center p-2 bg-blue-500/10 rounded-lg">
                      <p className="text-lg font-bold text-blue-400">
                        {[...(formData.detectors || []), ...(formData.callPoints || []), ...(formData.sounders || [])].length}
                      </p>
                      <p className="text-white text-xs">Total</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Overall Battery Test Result */}
      <div className={cn(isMobile ? 'px-4 py-4' : 'eicr-section-card p-4')}>
        <h4 className="font-semibold text-white mb-4 flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow"></div>
          Battery Backup Test
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Battery Backup Test Result</Label>
            <Select
              value={formData.batteryTestResult || ''}
              onValueChange={(v) => onUpdate('batteryTestResult', v)}
            >
              <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                <SelectValue placeholder="Select result" />
              </SelectTrigger>
              <SelectContent className="z-[100] bg-background border-border text-foreground">
                <SelectItem value="pass">
                  <span className="flex items-center gap-2 text-green-400">
                    <CheckCircle2 className="h-4 w-4" /> Pass
                  </span>
                </SelectItem>
                <SelectItem value="fail">
                  <span className="flex items-center gap-2 text-red-400">
                    <XCircle className="h-4 w-4" /> Fail
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FireAlarmTestSchedule;
