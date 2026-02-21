import React, { useState, useEffect, useMemo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
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
  TestTube,
  Zap,
  Shield,
  CheckCircle2,
  XCircle,
  Calculator,
  AlertTriangle,
  Info,
  Thermometer,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  useEVChargingSmartForm,
  TestResultValidation,
} from '@/hooks/inspection/useEVChargingSmartForm';

interface EVChargingTestScheduleProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

type TestResult = 'pass' | 'fail' | '';

const TestResultSelect: React.FC<{
  value: TestResult;
  onChange: (value: TestResult) => void;
}> = ({ value, onChange }) => (
  <Select value={value || ''} onValueChange={(v) => onChange(v as TestResult)}>
    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
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
    </SelectContent>
  </Select>
);

// Validation badge component
const ValidationBadge: React.FC<{ validation: TestResultValidation | undefined }> = ({
  validation,
}) => {
  if (!validation) return null;

  return (
    <Badge
      variant="outline"
      className={cn(
        'text-xs px-1.5 py-0 font-medium ml-2',
        validation.status === 'pass' && 'border-green-500/50 bg-green-500/10 text-green-400',
        validation.status === 'fail' && 'border-red-500/50 bg-red-500/10 text-red-400',
        validation.status === 'warning' && 'border-orange-500/50 bg-orange-500/10 text-orange-400'
      )}
    >
      {validation.status === 'pass' && <CheckCircle2 className="h-3 w-3 mr-1" />}
      {validation.status === 'fail' && <XCircle className="h-3 w-3 mr-1" />}
      {validation.status === 'warning' && <AlertTriangle className="h-3 w-3 mr-1" />}
      {validation.status.toUpperCase()}
    </Badge>
  );
};

const EVChargingTestSchedule: React.FC<EVChargingTestScheduleProps> = ({ formData, onUpdate }) => {
  const isMobile = useIsMobile();
  const { calculateZs, calculateVoltageDrop, validateTestResults } = useEVChargingSmartForm();

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    circuit: true,
    additional: true,
    rcd: true,
    functional: true,
    smart: false,
  });

  // Temperature correction toggle (default: on)
  const [applyTempCorrection, setApplyTempCorrection] = useState(true);

  // Track if Zs was manually entered vs calculated
  const [zsIsManual, setZsIsManual] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const updateTestResult = (field: string, value: any) => {
    const currentResults = formData.testResults || {};
    onUpdate('testResults', { ...currentResults, [field]: value });
  };

  const testResults = formData.testResults || {};

  // Auto-calculate Zs from Ze + R1+R2 when both values exist
  const calculatedZs = useMemo(() => {
    const ze = parseFloat(formData.ze);
    const r1r2 = parseFloat(testResults.r1r2);

    if (!isNaN(ze) && !isNaN(r1r2) && ze > 0 && r1r2 > 0) {
      return calculateZs(ze, r1r2, applyTempCorrection);
    }
    return null;
  }, [formData.ze, testResults.r1r2, applyTempCorrection, calculateZs]);

  // Auto-update Zs when calculated (unless manually entered)
  useEffect(() => {
    if (calculatedZs && !zsIsManual) {
      const currentZs = parseFloat(testResults.zs);
      // Only update if different (avoid loops)
      if (isNaN(currentZs) || Math.abs(currentZs - calculatedZs.calculatedZs) > 0.001) {
        updateTestResult('zs', calculatedZs.calculatedZs.toFixed(2));
      }
    }
  }, [calculatedZs, zsIsManual]);

  // Handle manual Zs entry
  const handleZsChange = (value: string) => {
    setZsIsManual(true);
    updateTestResult('zs', value);
  };

  // Reset to calculated Zs
  const resetToCalculated = () => {
    if (calculatedZs) {
      setZsIsManual(false);
      updateTestResult('zs', calculatedZs.calculatedZs.toFixed(2));
    }
  };

  // Auto-calculate voltage drop from cable data
  const voltageDrop = useMemo(() => {
    const cableSize = formData.cableSize;
    const cableLength = formData.cableLength;
    const current = formData.ratedCurrent;
    const cableType = formData.cableType;
    if (cableSize && cableLength && current) {
      return calculateVoltageDrop(cableSize, cableLength, current, cableType);
    }
    return null;
  }, [formData.cableSize, formData.cableLength, formData.ratedCurrent, formData.cableType, calculateVoltageDrop]);

  // Auto-update voltage drop in test results when calculated
  useEffect(() => {
    if (voltageDrop && !testResults.voltageDrop) {
      updateTestResult('voltageDrop', voltageDrop.voltageDropV.toString());
    }
  }, [voltageDrop]);

  // Validate all test results
  const validations = useMemo(() => {
    const maxZs = parseFloat(testResults.maxZs);
    const results = validateTestResults(testResults, !isNaN(maxZs) ? maxZs : undefined);

    // Convert array to lookup object
    const lookup: Record<string, TestResultValidation> = {};
    results.forEach((v) => {
      lookup[v.field] = v;
    });
    return lookup;
  }, [testResults, validateTestResults]);

  return (
    <div className={cn(isMobile ? 'space-y-0' : 'space-y-0 divide-y divide-white/[0.06]')}>
      {/* Circuit Tests */}
      <div>
        <Collapsible open={openSections.circuit} onOpenChange={() => toggleSection('circuit')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20">
                <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <TestTube className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Circuit Tests</h3>
                  <span className="text-xs text-muted-foreground">R1+R2, Zs, insulation</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform shrink-0',
                    openSections.circuit && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <TestTube className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-white font-semibold">Circuit Tests</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.circuit && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              {/* Temperature Correction Toggle — compact strip */}
              <label
                className={cn(
                  'flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer transition-all touch-manipulation',
                  applyTempCorrection
                    ? 'border-orange-500/30 bg-orange-500/[0.06]'
                    : 'border-white/10 bg-white/[0.02]'
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    'h-9 w-9 rounded-xl flex items-center justify-center shrink-0',
                    applyTempCorrection ? 'bg-orange-500/15' : 'bg-white/[0.06]'
                  )}>
                    <Thermometer className={cn('h-4 w-4', applyTempCorrection ? 'text-orange-400' : 'text-white')} />
                  </div>
                  <div>
                    <span className="text-sm font-medium text-white block">Temp Correction (1.2×)</span>
                    <span className="text-xs text-white">BS 7671 — 70°C operating temp</span>
                  </div>
                </div>
                <Switch
                  checked={applyTempCorrection}
                  onCheckedChange={setApplyTempCorrection}
                  className="data-[state=checked]:bg-elec-yellow shrink-0"
                />
              </label>

              {/* Zs Auto-calculation — compact strip */}
              {calculatedZs && (
                <div className="flex items-center gap-3 rounded-xl border border-blue-500/20 bg-blue-500/[0.04] px-4 py-3">
                  <div className="flex items-center gap-2 flex-1 min-w-0">
                    <span className="text-2xl font-semibold text-blue-400 tabular-nums">
                      {calculatedZs.calculatedZs.toFixed(2)}Ω
                    </span>
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-white">Calculated Zs</p>
                      <p className="text-[10px] text-white">
                        Ze ({formData.ze}) + R1+R2 ({testResults.r1r2}) × {applyTempCorrection ? '1.2' : '1.0'}
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-end gap-1 shrink-0">
                    <Badge
                      variant="outline"
                      className="text-[10px] px-2 py-0.5 border-blue-500/30 text-blue-400"
                    >
                      {zsIsManual ? 'Override' : 'Live'}
                    </Badge>
                    {zsIsManual && (
                      <button
                        type="button"
                        onClick={resetToCalculated}
                        className="text-[10px] text-blue-400 hover:text-blue-300 underline touch-manipulation"
                      >
                        Use calculated
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Continuity & impedance readings */}
              <div className="space-y-3">
                <h4 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Continuity & Impedance</h4>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 items-start">
                  <div className="space-y-1.5">
                    <Label htmlFor="r1r2" className="text-xs h-5 flex items-center">R1+R2 (Ω)</Label>
                    <Input
                      id="r1r2"
                      placeholder="0.25"
                      inputMode="decimal"
                      step="0.01"
                      value={testResults.r1r2 || ''}
                      onChange={(e) => updateTestResult('r1r2', e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="r2" className="text-xs h-5 flex items-center">R2 (Ω)</Label>
                    <Input
                      id="r2"
                      placeholder="0.12"
                      inputMode="decimal"
                      step="0.01"
                      value={testResults.r2 || ''}
                      onChange={(e) => updateTestResult('r2', e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1 h-5">
                      <Label htmlFor="zs" className="text-xs">Zs (Ω)</Label>
                      <ValidationBadge validation={validations.zs} />
                    </div>
                    <div className="relative">
                      <Input
                        id="zs"
                        placeholder="0.60"
                        inputMode="decimal"
                        step="0.01"
                        value={testResults.zs || ''}
                        onChange={(e) => handleZsChange(e.target.value)}
                        className={cn(
                          'h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow',
                          validations.zs?.status === 'pass' &&
                            'border-green-500/50 focus:border-green-500',
                          validations.zs?.status === 'fail' &&
                            'border-red-500/50 focus:border-red-500'
                        )}
                      />
                      {!zsIsManual && calculatedZs && (
                        <Badge
                          variant="outline"
                          className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] px-1 py-0 border-blue-500/50 text-blue-400 bg-background"
                        >
                          Auto
                        </Badge>
                      )}
                    </div>
                    {validations.zs && (
                      <p
                        className={cn(
                          'text-[10px]',
                          validations.zs.status === 'pass' ? 'text-green-400' : 'text-red-400'
                        )}
                      >
                        {validations.zs.message}
                      </p>
                    )}
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="maxZs" className="text-xs h-5 flex items-center">Max Zs (Ω)</Label>
                    <Input
                      id="maxZs"
                      placeholder="1.09"
                      inputMode="decimal"
                      step="0.01"
                      value={testResults.maxZs || ''}
                      onChange={(e) => updateTestResult('maxZs', e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow bg-card/50"
                      readOnly={!!testResults.maxZs && formData.protectionDeviceType}
                    />
                    {testResults.maxZs && formData.protectionDeviceType && (
                      <p className="text-[10px] text-blue-400 flex items-center gap-1">
                        <Info className="h-3 w-3" />
                        Auto-filled
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Insulation & Polarity */}
              <div className="space-y-3">
                <h4 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Insulation & Polarity</h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 items-start">
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1 h-5">
                      <Label htmlFor="insulationResistance" className="text-xs">Insulation (MΩ)</Label>
                      <ValidationBadge validation={validations.insulationResistance} />
                    </div>
                    <Input
                      id="insulationResistance"
                      placeholder=">200"
                      inputMode="decimal"
                      step="0.01"
                      value={testResults.insulationResistance || ''}
                      onChange={(e) => updateTestResult('insulationResistance', e.target.value)}
                      className={cn(
                        'h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow',
                        validations.insulationResistance?.status === 'pass' && 'border-green-500/50',
                        validations.insulationResistance?.status === 'fail' && 'border-red-500/50'
                      )}
                    />
                    <p className="text-[10px] text-white">Min 1MΩ required</p>
                  </div>
                  <div className="space-y-1.5">
                    <div className="flex items-center gap-1 h-5">
                      <Label className="text-xs">Polarity</Label>
                      <ValidationBadge validation={validations.polarity} />
                    </div>
                    <Select
                      value={testResults.polarity || ''}
                      onValueChange={(value) => updateTestResult('polarity', value)}
                    >
                      <SelectTrigger
                        className={cn(
                          'h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow',
                          validations.polarity?.status === 'pass' && 'border-green-500/50',
                          validations.polarity?.status === 'fail' && 'border-red-500/50'
                        )}
                      >
                        <SelectValue placeholder="Select">
                          {testResults.polarity === 'correct' && (
                            <span className="text-green-400">Correct</span>
                          )}
                          {testResults.polarity === 'incorrect' && (
                            <span className="text-red-400">Incorrect</span>
                          )}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-background border-border text-foreground">
                        <SelectItem value="correct">Correct</SelectItem>
                        <SelectItem value="incorrect">Incorrect</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {formData.earthElectrodeInstalled && (
                    <div className="space-y-1.5">
                      <Label htmlFor="earthElectrodeRa" className="text-xs h-5 flex items-center">Earth Electrode Ra (Ω)</Label>
                      <Input
                        id="earthElectrodeRa"
                        placeholder="150"
                        inputMode="decimal"
                        step="0.01"
                        value={testResults.earthElectrodeRa || ''}
                        onChange={(e) => updateTestResult('earthElectrodeRa', e.target.value)}
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Additional Tests (IET CoP 5th Edition) */}
      <div>
        <Collapsible open={openSections.additional} onOpenChange={() => toggleSection('additional')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                  <Zap className="h-5 w-5 text-cyan-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Additional Tests</h3>
                  <span className="text-xs text-muted-foreground">PE continuity, voltage drop</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform shrink-0',
                    openSections.additional && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/15 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-cyan-400" />
                  </div>
                  <span className="text-white font-semibold">Additional Tests</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.additional && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-start">
                <div className="space-y-1.5">
                  <Label htmlFor="continuityPE" className="text-sm h-5 flex items-center">
                    PE Continuity (Ω)
                  </Label>
                  <Input
                    id="continuityPE"
                    placeholder="e.g., 0.15"
                    inputMode="decimal"
                    step="0.01"
                    value={testResults.continuityPE || ''}
                    onChange={(e) => updateTestResult('continuityPE', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                  <p className="text-[10px] text-white">Protective earth conductor</p>
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="voltageDrop" className="text-sm h-5 flex items-center">
                    Voltage Drop (V)
                  </Label>
                  <Input
                    id="voltageDrop"
                    placeholder="Auto-calculated"
                    inputMode="decimal"
                    step="0.01"
                    value={testResults.voltageDrop || ''}
                    onChange={(e) => updateTestResult('voltageDrop', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                  <div className="flex items-center gap-1.5">
                    <p className="text-[10px] text-white">Max 5% (11.5V)</p>
                    {voltageDrop && (
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-[10px] px-1.5 py-0 font-medium',
                          voltageDrop.satisfactory
                            ? 'border-green-500/50 bg-green-500/10 text-green-400'
                            : 'border-red-500/50 bg-red-500/10 text-red-400'
                        )}
                      >
                        {voltageDrop.satisfactory ? (
                          <><CheckCircle2 className="h-2.5 w-2.5 mr-0.5" /> {voltageDrop.percentOf230V}%</>
                        ) : (
                          <><XCircle className="h-2.5 w-2.5 mr-0.5" /> {voltageDrop.percentOf230V}%</>
                        )}
                      </Badge>
                    )}
                  </div>
                </div>
                {formData.supplyPhases === 'three' && (
                  <div className="space-y-1.5">
                    <Label className="text-sm h-5 flex items-center">Phase Rotation</Label>
                    <Select
                      value={testResults.phaseRotation || ''}
                      onValueChange={(value) => updateTestResult('phaseRotation', value)}
                    >
                      <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-background border-border text-foreground">
                        <SelectItem value="L1-L2-L3">L1-L2-L3 (Correct)</SelectItem>
                        <SelectItem value="L1-L3-L2">L1-L3-L2 (Reversed)</SelectItem>
                        <SelectItem value="N/A">N/A</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className="text-[10px] text-white">3-phase rotation check</p>
                  </div>
                )}
              </div>

              {/* Voltage Drop Auto-calculation Info */}
              {voltageDrop && (
                <div className={cn(
                  'rounded-lg p-3 border',
                  voltageDrop.satisfactory
                    ? 'bg-green-500/5 border-green-500/20'
                    : 'bg-red-500/5 border-red-500/20'
                )}>
                  <div className="flex items-center gap-2">
                    <Calculator className="h-4 w-4 text-white" />
                    <span className="text-sm font-medium text-foreground">
                      {voltageDrop.voltageDropV}V ({voltageDrop.percentOf230V}% of 230V)
                    </span>
                    <Badge
                      variant="outline"
                      className={cn(
                        'text-xs px-1.5 py-0',
                        voltageDrop.satisfactory
                          ? 'border-green-500/50 text-green-400'
                          : 'border-red-500/50 text-red-400'
                      )}
                    >
                      {voltageDrop.satisfactory ? 'Satisfactory' : 'Exceeds 5%'}
                    </Badge>
                  </div>
                  <p className="text-xs text-white mt-1">
                    Cable: {formData.cableSize}mm² × {formData.cableLength}m @ {formData.ratedCurrent}A
                  </p>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* RCD Tests */}
      <div>
        <Collapsible open={openSections.rcd} onOpenChange={() => toggleSection('rcd')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                  <Shield className="h-5 w-5 text-red-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">RCD Tests</h3>
                  <span className="text-xs text-muted-foreground">Trip times, test button</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform shrink-0',
                    openSections.rcd && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-red-400" />
                  </div>
                  <span className="text-white font-semibold">RCD Tests</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.rcd && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 items-start">
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1 h-5">
                    <Label htmlFor="rcdTripTime" className="text-sm">Trip @ IΔn (ms)</Label>
                    <ValidationBadge validation={validations.rcdTripTime} />
                  </div>
                  <Input
                    id="rcdTripTime"
                    placeholder="e.g., 25"
                    inputMode="numeric"
                    step="1"
                    value={testResults.rcdTripTime || ''}
                    onChange={(e) => updateTestResult('rcdTripTime', e.target.value)}
                    className={cn(
                      'h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow',
                      validations.rcdTripTime?.status === 'pass' && 'border-green-500/50',
                      validations.rcdTripTime?.status === 'fail' && 'border-red-500/50'
                    )}
                  />
                  {validations.rcdTripTime ? (
                    <p
                      className={cn(
                        'text-[10px]',
                        validations.rcdTripTime.status === 'pass'
                          ? 'text-green-400'
                          : 'text-red-400'
                      )}
                    >
                      {validations.rcdTripTime.message}
                    </p>
                  ) : (
                    <p className="text-[10px] text-white">Max 300ms</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-1 h-5">
                    <Label htmlFor="rcdTripTimeX5" className="text-sm">Trip @ 5×IΔn (ms)</Label>
                    <ValidationBadge validation={validations.rcdTripTimeX5} />
                  </div>
                  <Input
                    id="rcdTripTimeX5"
                    placeholder="e.g., 12"
                    inputMode="numeric"
                    step="1"
                    value={testResults.rcdTripTimeX5 || ''}
                    onChange={(e) => updateTestResult('rcdTripTimeX5', e.target.value)}
                    className={cn(
                      'h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow',
                      validations.rcdTripTimeX5?.status === 'pass' && 'border-green-500/50',
                      validations.rcdTripTimeX5?.status === 'fail' && 'border-red-500/50'
                    )}
                  />
                  {validations.rcdTripTimeX5 ? (
                    <p
                      className={cn(
                        'text-[10px]',
                        validations.rcdTripTimeX5.status === 'pass'
                          ? 'text-green-400'
                          : 'text-red-400'
                      )}
                    >
                      {validations.rcdTripTimeX5.message}
                    </p>
                  ) : (
                    <p className="text-[10px] text-white">Max 40ms</p>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-blue-500/20 bg-blue-500/5 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-blue-500/10 border-b border-blue-500/20">
                  <Info className="h-4 w-4 text-blue-400" />
                  <h4 className="font-medium text-sm text-white">RCD Test Reference</h4>
                </div>
                <div className="px-4 py-3 space-y-2">
                  <div className="grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 text-sm">
                    <span className="text-white">30mA RCD test at IΔn</span>
                    <span className="text-blue-400 font-medium text-right">≤ 300ms</span>
                    <span className="text-white">30mA RCD test at 5×IΔn (150mA)</span>
                    <span className="text-blue-400 font-medium text-right">≤ 40ms</span>
                  </div>
                  <p className="text-xs text-white pt-1 border-t border-blue-500/10">
                    Test button operation must be verified
                  </p>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Functional Tests */}
      <div>
        <Collapsible
          open={openSections.functional}
          onOpenChange={() => toggleSection('functional')}
        >
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                  <Zap className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Functional Tests</h3>
                  <span className="text-xs text-muted-foreground">Charger, load, verification</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform shrink-0',
                    openSections.functional && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-white font-semibold">Functional Tests</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.functional && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              <div className="grid grid-cols-2 gap-3 items-start">
                <div className="space-y-1.5">
                  <Label className="text-sm h-5 flex items-center">Functional Test</Label>
                  <TestResultSelect
                    value={testResults.functionalTest || ''}
                    onChange={(v) => updateTestResult('functionalTest', v)}
                  />
                  <p className="text-[10px] text-white">Powers up & communicates</p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm h-5 flex items-center">Load Test</Label>
                  <TestResultSelect
                    value={testResults.loadTest || ''}
                    onChange={(v) => updateTestResult('loadTest', v)}
                  />
                  <p className="text-[10px] text-white">Charging with EV or load box</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 items-start">
                <div className="space-y-1.5">
                  <Label htmlFor="loadTestCurrent" className="text-sm h-5 flex items-center">Load Current (A)</Label>
                  <Input
                    id="loadTestCurrent"
                    placeholder="e.g., 32"
                    inputMode="decimal"
                    step="0.01"
                    value={testResults.loadTestCurrent || ''}
                    onChange={(e) => updateTestResult('loadTestCurrent', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                  <p className="text-[10px] text-white">Measured at full rate</p>
                </div>
                <div className="space-y-1.5">
                  <Label className="text-sm h-5 flex items-center">RCD Test Button</Label>
                  <TestResultSelect
                    value={testResults.rcdTestButton || ''}
                    onChange={(v) => updateTestResult('rcdTestButton', v)}
                  />
                  <p className="text-[10px] text-white">Built-in RCD button check</p>
                </div>
              </div>

              <div className="rounded-xl border border-white/[0.06] overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2.5 bg-white/5 border-b border-white/[0.06]">
                  <CheckCircle2 className="h-4 w-4 text-green-400" />
                  <h4 className="font-medium text-sm text-white">Verification Checklist</h4>
                </div>
                <div className="divide-y divide-white/[0.04]">
                  <label htmlFor="chargerPowerUp" className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors touch-manipulation">
                    <Checkbox
                      id="chargerPowerUp"
                      checked={formData.chargerPowerUpVerified || false}
                      onCheckedChange={(checked) => onUpdate('chargerPowerUpVerified', checked)}
                      className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white"
                    />
                    <span className="text-sm text-white">Charger powers up correctly</span>
                  </label>
                  <label htmlFor="ledIndicators" className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors touch-manipulation">
                    <Checkbox
                      id="ledIndicators"
                      checked={formData.ledIndicatorsVerified || false}
                      onCheckedChange={(checked) => onUpdate('ledIndicatorsVerified', checked)}
                      className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white"
                    />
                    <span className="text-sm text-white">LED indicators function correctly</span>
                  </label>
                  <label htmlFor="cableSecure" className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors touch-manipulation">
                    <Checkbox
                      id="cableSecure"
                      checked={formData.cableSecureVerified || false}
                      onCheckedChange={(checked) => onUpdate('cableSecureVerified', checked)}
                      className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white"
                    />
                    <span className="text-sm text-white">Cable/connector secure and undamaged</span>
                  </label>
                  <label htmlFor="earthContinuity" className="flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-white/5 transition-colors touch-manipulation">
                    <Checkbox
                      id="earthContinuity"
                      checked={formData.earthContinuityVerified || false}
                      onCheckedChange={(checked) => onUpdate('earthContinuityVerified', checked)}
                      className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white"
                    />
                    <span className="text-sm text-white">Earth continuity to exposed parts</span>
                  </label>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Smart Features */}
      <div>
        <Collapsible open={openSections.smart} onOpenChange={() => toggleSection('smart')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                  <Zap className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Smart Features</h3>
                  <span className="text-xs text-muted-foreground">
                    App control, load management
                  </span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-muted-foreground transition-transform shrink-0',
                    openSections.smart && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-white font-semibold">Smart Features</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.smart && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label
                  htmlFor="smartChargingEnabled"
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer transition-all touch-manipulation',
                    formData.smartChargingEnabled
                      ? 'border-purple-500/30 bg-purple-500/[0.06]'
                      : 'border-white/10 bg-white/[0.02]'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'h-9 w-9 rounded-xl flex items-center justify-center shrink-0',
                      formData.smartChargingEnabled ? 'bg-purple-500/15' : 'bg-white/[0.06]'
                    )}>
                      <Zap className={cn('h-4 w-4', formData.smartChargingEnabled ? 'text-purple-400' : 'text-white')} />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-white block">Smart Charging</span>
                      <span className="text-xs text-white">App control, scheduling</span>
                    </div>
                  </div>
                  <Checkbox
                    id="smartChargingEnabled"
                    checked={formData.smartChargingEnabled || false}
                    onCheckedChange={(checked) => onUpdate('smartChargingEnabled', checked)}
                    className="sr-only"
                  />
                  <div className={cn(
                    'h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors',
                    formData.smartChargingEnabled
                      ? 'border-purple-400 bg-purple-400'
                      : 'border-white/30'
                  )}>
                    {formData.smartChargingEnabled && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                  </div>
                </label>
                <label
                  htmlFor="loadManagement"
                  className={cn(
                    'flex items-center justify-between px-4 py-3 rounded-xl border cursor-pointer transition-all touch-manipulation',
                    formData.loadManagement
                      ? 'border-purple-500/30 bg-purple-500/[0.06]'
                      : 'border-white/10 bg-white/[0.02]'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn(
                      'h-9 w-9 rounded-xl flex items-center justify-center shrink-0',
                      formData.loadManagement ? 'bg-purple-500/15' : 'bg-white/[0.06]'
                    )}>
                      <Calculator className={cn('h-4 w-4', formData.loadManagement ? 'text-purple-400' : 'text-white')} />
                    </div>
                    <div>
                      <span className="text-sm font-medium text-white block">Load Management</span>
                      <span className="text-xs text-white">CT clamp or similar</span>
                    </div>
                  </div>
                  <Checkbox
                    id="loadManagement"
                    checked={formData.loadManagement || false}
                    onCheckedChange={(checked) => onUpdate('loadManagement', checked)}
                    className="sr-only"
                  />
                  <div className={cn(
                    'h-5 w-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors',
                    formData.loadManagement
                      ? 'border-purple-400 bg-purple-400'
                      : 'border-white/30'
                  )}>
                    {formData.loadManagement && <CheckCircle2 className="h-3.5 w-3.5 text-white" />}
                  </div>
                </label>
              </div>

              {formData.loadManagement && (
                <div className="space-y-2">
                  <Label htmlFor="loadManagementType">Load Management Type</Label>
                  <Select
                    value={formData.loadManagementType || ''}
                    onValueChange={(value) => onUpdate('loadManagementType', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="ct-clamp">CT Clamp</SelectItem>
                      <SelectItem value="dynamic">Dynamic Load Balancing</SelectItem>
                      <SelectItem value="static">Static Limit</SelectItem>
                      <SelectItem value="solar-integration">Solar Integration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default EVChargingTestSchedule;
