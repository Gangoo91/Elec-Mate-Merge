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
import { ChevronDown, TestTube, Zap, Shield, CheckCircle2, XCircle, Calculator, AlertTriangle, Info, Thermometer } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEVChargingSmartForm, TestResultValidation } from '@/hooks/inspection/useEVChargingSmartForm';

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
        {value === 'pass' && <span className="flex items-center gap-2 text-green-400"><CheckCircle2 className="h-4 w-4" /> Pass</span>}
        {value === 'fail' && <span className="flex items-center gap-2 text-red-400"><XCircle className="h-4 w-4" /> Fail</span>}
        {!value && <span className="text-muted-foreground">Select</span>}
      </SelectValue>
    </SelectTrigger>
    <SelectContent className="z-[100] bg-background border-border text-foreground">
      <SelectItem value="pass">
        <span className="flex items-center gap-2 text-green-400"><CheckCircle2 className="h-4 w-4" /> Pass</span>
      </SelectItem>
      <SelectItem value="fail">
        <span className="flex items-center gap-2 text-red-400"><XCircle className="h-4 w-4" /> Fail</span>
      </SelectItem>
    </SelectContent>
  </Select>
);

// Validation badge component
const ValidationBadge: React.FC<{ validation: TestResultValidation | undefined }> = ({ validation }) => {
  if (!validation) return null;

  return (
    <Badge
      variant="outline"
      className={cn(
        "text-[10px] px-1.5 py-0 font-medium ml-2",
        validation.status === 'pass' && "border-green-500/50 bg-green-500/10 text-green-400",
        validation.status === 'fail' && "border-red-500/50 bg-red-500/10 text-red-400",
        validation.status === 'warning' && "border-orange-500/50 bg-orange-500/10 text-orange-400"
      )}
    >
      {validation.status === 'pass' && <CheckCircle2 className="h-3 w-3 mr-1" />}
      {validation.status === 'fail' && <XCircle className="h-3 w-3 mr-1" />}
      {validation.status === 'warning' && <AlertTriangle className="h-3 w-3 mr-1" />}
      {validation.status.toUpperCase()}
    </Badge>
  );
};

const EVChargingTestSchedule: React.FC<EVChargingTestScheduleProps> = ({
  formData,
  onUpdate,
}) => {
  const isMobile = useIsMobile();
  const { calculateZs, validateTestResults } = useEVChargingSmartForm();

  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    circuit: true,
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

  // Validate all test results
  const validations = useMemo(() => {
    const maxZs = parseFloat(testResults.maxZs);
    const results = validateTestResults(testResults, !isNaN(maxZs) ? maxZs : undefined);

    // Convert array to lookup object
    const lookup: Record<string, TestResultValidation> = {};
    results.forEach(v => {
      lookup[v.field] = v;
    });
    return lookup;
  }, [testResults, validateTestResults]);

  return (
    <div className={cn(isMobile ? "space-y-0" : "space-y-6")}>
      {/* Circuit Tests */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
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
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.circuit && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <TestTube className="h-4 w-4 text-blue-400" />
                  </div>
                  <span className="text-white font-semibold">Circuit Tests</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.circuit && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              {/* Zs Auto-calculation Info Box */}
              {calculatedZs && (
                <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/30 rounded-lg p-3">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-lg bg-blue-500/20 flex items-center justify-center shrink-0">
                      <Calculator className="h-4 w-4 text-blue-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-sm font-medium text-foreground">Auto-calculated Zs</span>
                        <Badge variant="outline" className="text-[10px] px-1.5 py-0 border-blue-500/50 text-blue-400">
                          {zsIsManual ? 'Manual Override' : 'Live'}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-1">
                        Ze ({formData.ze}Ω) + R1+R2 ({testResults.r1r2}Ω) × {applyTempCorrection ? '1.2' : '1.0'} = <span className="font-medium text-blue-400">{calculatedZs.calculatedZs.toFixed(2)}Ω</span>
                      </p>
                      {zsIsManual && (
                        <button
                          type="button"
                          onClick={resetToCalculated}
                          className="text-xs text-blue-400 hover:text-blue-300 mt-1 underline"
                        >
                          Use calculated value
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Temperature Correction Toggle */}
              <div className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-orange-400" />
                  <div>
                    <Label className="text-sm">Temperature Correction (1.2×)</Label>
                    <p className="text-xs text-muted-foreground">Per BS 7671 for 70°C operating temp</p>
                  </div>
                </div>
                <Switch
                  checked={applyTempCorrection}
                  onCheckedChange={setApplyTempCorrection}
                  className="data-[state=checked]:bg-elec-yellow"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="r1r2">R1+R2 (Ω)</Label>
                  <Input
                    id="r1r2"
                    placeholder="e.g., 0.25"
                    value={testResults.r1r2 || ''}
                    onChange={(e) => updateTestResult('r1r2', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                  {formData.ze && testResults.r1r2 && (
                    <p className="text-[10px] text-blue-400 flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      Used for Zs calculation
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="r2">R2 (Ω)</Label>
                  <Input
                    id="r2"
                    placeholder="e.g., 0.12"
                    value={testResults.r2 || ''}
                    onChange={(e) => updateTestResult('r2', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="zs">Zs (Ω)</Label>
                    <ValidationBadge validation={validations.zs} />
                  </div>
                  <div className="relative">
                    <Input
                      id="zs"
                      placeholder="e.g., 0.60"
                      value={testResults.zs || ''}
                      onChange={(e) => handleZsChange(e.target.value)}
                      className={cn(
                        "h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow",
                        validations.zs?.status === 'pass' && "border-green-500/50 focus:border-green-500",
                        validations.zs?.status === 'fail' && "border-red-500/50 focus:border-red-500"
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
                    <p className={cn(
                      "text-[10px]",
                      validations.zs.status === 'pass' ? "text-green-400" : "text-red-400"
                    )}>
                      {validations.zs.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="maxZs">Max Zs (Ω)</Label>
                  <Input
                    id="maxZs"
                    placeholder="e.g., 1.09"
                    value={testResults.maxZs || ''}
                    onChange={(e) => updateTestResult('maxZs', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow bg-card/50"
                    readOnly={!!testResults.maxZs && formData.protectionDeviceType}
                  />
                  {testResults.maxZs && formData.protectionDeviceType && (
                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Info className="h-3 w-3" />
                      Auto-filled from Supply Details
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label htmlFor="insulationResistance">Insulation Resistance (MΩ)</Label>
                    <ValidationBadge validation={validations.insulationResistance} />
                  </div>
                  <Input
                    id="insulationResistance"
                    placeholder="e.g., >200"
                    value={testResults.insulationResistance || ''}
                    onChange={(e) => updateTestResult('insulationResistance', e.target.value)}
                    className={cn(
                      "h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow",
                      validations.insulationResistance?.status === 'pass' && "border-green-500/50",
                      validations.insulationResistance?.status === 'fail' && "border-red-500/50"
                    )}
                  />
                  <p className="text-[10px] text-muted-foreground">Min 1MΩ required</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Label>Polarity</Label>
                    <ValidationBadge validation={validations.polarity} />
                  </div>
                  <Select
                    value={testResults.polarity || ''}
                    onValueChange={(value) => updateTestResult('polarity', value)}
                  >
                    <SelectTrigger className={cn(
                      "h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow",
                      validations.polarity?.status === 'pass' && "border-green-500/50",
                      validations.polarity?.status === 'fail' && "border-red-500/50"
                    )}>
                      <SelectValue placeholder="Select">
                        {testResults.polarity === 'correct' && <span className="text-green-400">Correct</span>}
                        {testResults.polarity === 'incorrect' && <span className="text-red-400">Incorrect</span>}
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="correct">Correct</SelectItem>
                      <SelectItem value="incorrect">Incorrect</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {formData.earthElectrodeInstalled && (
                  <div className="space-y-2">
                    <Label htmlFor="earthElectrodeRa">Earth Electrode Ra (Ω)</Label>
                    <Input
                      id="earthElectrodeRa"
                      placeholder="e.g., 150"
                      value={testResults.earthElectrodeRa || ''}
                      onChange={(e) => updateTestResult('earthElectrodeRa', e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                )}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* RCD Tests */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
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
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.rcd && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-red-400" />
                  </div>
                  <span className="text-white font-semibold">RCD Tests</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.rcd && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="flex items-center flex-wrap">
                    <Label htmlFor="rcdTripTime">Trip Time @ IΔn (ms)</Label>
                    <ValidationBadge validation={validations.rcdTripTime} />
                  </div>
                  <Input
                    id="rcdTripTime"
                    placeholder="e.g., 25"
                    value={testResults.rcdTripTime || ''}
                    onChange={(e) => updateTestResult('rcdTripTime', e.target.value)}
                    className={cn(
                      "h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow",
                      validations.rcdTripTime?.status === 'pass' && "border-green-500/50",
                      validations.rcdTripTime?.status === 'fail' && "border-red-500/50"
                    )}
                  />
                  {validations.rcdTripTime ? (
                    <p className={cn(
                      "text-[10px]",
                      validations.rcdTripTime.status === 'pass' ? "text-green-400" : "text-red-400"
                    )}>
                      {validations.rcdTripTime.message}
                    </p>
                  ) : (
                    <p className="text-[10px] text-muted-foreground">Max 300ms</p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center flex-wrap">
                    <Label htmlFor="rcdTripTimeX5">Trip Time @ 5×IΔn (ms)</Label>
                    <ValidationBadge validation={validations.rcdTripTimeX5} />
                  </div>
                  <Input
                    id="rcdTripTimeX5"
                    placeholder="e.g., 12"
                    value={testResults.rcdTripTimeX5 || ''}
                    onChange={(e) => updateTestResult('rcdTripTimeX5', e.target.value)}
                    className={cn(
                      "h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow",
                      validations.rcdTripTimeX5?.status === 'pass' && "border-green-500/50",
                      validations.rcdTripTimeX5?.status === 'fail' && "border-red-500/50"
                    )}
                  />
                  {validations.rcdTripTimeX5 ? (
                    <p className={cn(
                      "text-[10px]",
                      validations.rcdTripTimeX5.status === 'pass' ? "text-green-400" : "text-red-400"
                    )}>
                      {validations.rcdTripTimeX5.message}
                    </p>
                  ) : (
                    <p className="text-[10px] text-muted-foreground">Max 40ms</p>
                  )}
                </div>
              </div>

              <div className="bg-black/40 rounded-lg p-4">
                <h4 className="font-medium mb-2">RCD Test Reference</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <p>30mA RCD: Test at 30mA (IΔn) and 150mA (5×IΔn)</p>
                  <p>At IΔn: Must trip within 300ms</p>
                  <p>At 5×IΔn: Must trip within 40ms</p>
                  <p>Test button operation must be verified</p>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Functional Tests */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.functional} onOpenChange={() => toggleSection('functional')}>
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
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.functional && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-white font-semibold">Functional Tests</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.functional && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Charger Functional Test</Label>
                  <TestResultSelect
                    value={testResults.functionalTest || ''}
                    onChange={(v) => updateTestResult('functionalTest', v)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Verify charger powers up and communicates</p>
                </div>
                <div className="space-y-2">
                  <Label>Load Test</Label>
                  <TestResultSelect
                    value={testResults.loadTest || ''}
                    onChange={(v) => updateTestResult('loadTest', v)}
                  />
                  <p className="text-xs text-muted-foreground mt-1">Verify charging function with EV or load box</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="loadTestCurrent">Load Test Current (A)</Label>
                  <Input
                    id="loadTestCurrent"
                    placeholder="e.g., 32"
                    value={testResults.loadTestCurrent || ''}
                    onChange={(e) => updateTestResult('loadTestCurrent', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>

              <div className="space-y-3 border-t border-border pt-4">
                <h4 className="font-medium flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-elec-yellow"></div>
                  Verification Checklist
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                    <Checkbox
                      id="chargerPowerUp"
                      checked={formData.chargerPowerUpVerified || false}
                      onCheckedChange={(checked) => onUpdate('chargerPowerUpVerified', checked)}
                      className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                    />
                    <Label htmlFor="chargerPowerUp" className="cursor-pointer text-sm">
                      Charger powers up correctly
                    </Label>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                    <Checkbox
                      id="ledIndicators"
                      checked={formData.ledIndicatorsVerified || false}
                      onCheckedChange={(checked) => onUpdate('ledIndicatorsVerified', checked)}
                      className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                    />
                    <Label htmlFor="ledIndicators" className="cursor-pointer text-sm">
                      LED indicators function correctly
                    </Label>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                    <Checkbox
                      id="cableSecure"
                      checked={formData.cableSecureVerified || false}
                      onCheckedChange={(checked) => onUpdate('cableSecureVerified', checked)}
                      className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                    />
                    <Label htmlFor="cableSecure" className="cursor-pointer text-sm">
                      Cable/connector secure and undamaged
                    </Label>
                  </div>
                  <div className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                    <Checkbox
                      id="earthContinuity"
                      checked={formData.earthContinuityVerified || false}
                      onCheckedChange={(checked) => onUpdate('earthContinuityVerified', checked)}
                      className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                    />
                    <Label htmlFor="earthContinuity" className="cursor-pointer text-sm">
                      Earth continuity to exposed parts
                    </Label>
                  </div>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Smart Features */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.smart} onOpenChange={() => toggleSection('smart')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                  <Zap className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Smart Features</h3>
                  <span className="text-xs text-muted-foreground">App control, load management</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.smart && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-white font-semibold">Smart Features</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.smart && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                  <Checkbox
                    id="smartChargingEnabled"
                    checked={formData.smartChargingEnabled || false}
                    onCheckedChange={(checked) => onUpdate('smartChargingEnabled', checked)}
                    className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <div>
                    <Label htmlFor="smartChargingEnabled" className="cursor-pointer">
                      Smart Charging Enabled
                    </Label>
                    <p className="text-xs text-muted-foreground">App control, scheduling, etc.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-black/40 rounded-lg">
                  <Checkbox
                    id="loadManagement"
                    checked={formData.loadManagement || false}
                    onCheckedChange={(checked) => onUpdate('loadManagement', checked)}
                    className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <div>
                    <Label htmlFor="loadManagement" className="cursor-pointer">
                      Load Management Installed
                    </Label>
                    <p className="text-xs text-muted-foreground">CT clamp or similar</p>
                  </div>
                </div>
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
