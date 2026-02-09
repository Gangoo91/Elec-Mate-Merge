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
          <span className="flex items-center gap-2 text-muted-foreground">
            <Minus className="h-4 w-4" /> N/A
          </span>
        )}
        {!value && <span className="text-muted-foreground">Select</span>}
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
        <span className="flex items-center gap-2 text-muted-foreground">
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
  });

  // Store validation results for each sound reading
  const [validationResults, setValidationResults] = useState<Record<string, SoundValidationResult>>(
    {}
  );

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
                  <span className="text-xs text-muted-foreground">Power, zones, indicators</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform shrink-0',
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
                    'h-5 w-5 text-white/40 transition-transform',
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
                  <span className="text-xs text-muted-foreground">Mains, charger, backup</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform shrink-0',
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
                    'h-5 w-5 text-white/40 transition-transform',
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
                  <span className="text-xs text-muted-foreground">Open, short, earth faults</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform shrink-0',
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
                    'h-5 w-5 text-white/40 transition-transform',
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
                  <span className="text-xs text-muted-foreground">
                    {(formData.soundLevelReadings || []).length} readings
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform shrink-0',
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
                    'h-5 w-5 text-white/40 transition-transform',
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
                  <p className="text-muted-foreground mt-1">
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
