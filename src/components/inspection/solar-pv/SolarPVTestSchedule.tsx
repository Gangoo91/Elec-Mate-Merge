/**
 * Solar PV Test Schedule Tab
 * DC tests, AC tests, and commissioning checklist per BS EN 62446 + BS 7671
 */

import React, { useState, useEffect } from 'react';
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
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  TestTube,
  Zap,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  Check,
  X,
  Minus,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SolarPVFormData,
  ArrayTestResult,
  InverterTestResult,
  EarthingArrangement,
  getDefaultArrayTestResult,
  getDefaultInverterTestResult,
} from '@/types/solar-pv';

interface SolarPVTestScheduleProps {
  formData: SolarPVFormData;
  onUpdate: (field: string, value: any) => void;
}

interface SectionHeaderProps {
  title: string;
  icon: React.ElementType;
  isOpen: boolean;
  color?: string;
  badge?: string;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  icon: Icon,
  isOpen,
  color = 'amber-500',
  badge,
}) => (
  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 sm:p-5 hover:bg-white/5 transition-colors rounded-t-xl">
    <div className="flex items-center gap-3">
      <div
        className={cn('w-10 h-11 rounded-xl flex items-center justify-center', `bg-${color}/15`)}
      >
        <Icon className={cn('h-5 w-5', `text-${color}`)} />
      </div>
      <div className="text-left">
        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
          {title}
          {badge && (
            <Badge
              variant="outline"
              className="text-[10px] px-1.5 py-0 bg-amber-500/10 text-amber-400 border-amber-500/30"
            >
              {badge}
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

// Result badge component
const ResultBadge: React.FC<{ value: boolean | null | undefined; className?: string }> = ({
  value,
  className,
}) => {
  if (value === true) {
    return (
      <Badge className={cn('bg-green-500/20 text-green-400 border-green-500/30', className)}>
        <Check className="h-3 w-3 mr-1" />
        Pass
      </Badge>
    );
  }
  if (value === false) {
    return (
      <Badge className={cn('bg-red-500/20 text-red-400 border-red-500/30', className)}>
        <X className="h-3 w-3 mr-1" />
        Fail
      </Badge>
    );
  }
  return (
    <Badge className={cn('bg-gray-500/20 text-gray-400 border-gray-500/30', className)}>
      <Minus className="h-3 w-3 mr-1" />
      N/A
    </Badge>
  );
};

const SolarPVTestSchedule: React.FC<SolarPVTestScheduleProps> = ({ formData, onUpdate }) => {
  const [openSections, setOpenSections] = useState({
    arrayTests: true,
    inverterTests: true,
    acTests: true,
    commissioning: true,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Initialize test results if arrays/inverters exist but tests don't
  useEffect(() => {
    const currentArrayTests = formData.testResults?.arrayTests || [];
    const currentInverterTests = formData.testResults?.inverterTests || [];

    // Initialize array tests
    if (formData.arrays?.length > 0 && currentArrayTests.length !== formData.arrays.length) {
      const newArrayTests = formData.arrays.map((array) => {
        const existing = currentArrayTests.find((t) => t.arrayId === array.id);
        if (existing) return existing;
        const test = getDefaultArrayTestResult(array.id);
        test.vocExpected = array.stringVoltageVoc || 0;
        test.iscExpected = array.stringCurrentIsc || 0;
        return test;
      });
      onUpdate('testResults', {
        ...formData.testResults,
        arrayTests: newArrayTests,
      });
    }

    // Initialize inverter tests
    if (
      formData.inverters?.length > 0 &&
      currentInverterTests.length !== formData.inverters.length
    ) {
      const newInverterTests = formData.inverters.map((inverter) => {
        const existing = currentInverterTests.find((t) => t.inverterId === inverter.id);
        if (existing) return existing;
        return getDefaultInverterTestResult(inverter.id);
      });
      onUpdate('testResults', {
        ...formData.testResults,
        inverterTests: newInverterTests,
      });
    }
  }, [formData.arrays, formData.inverters]);

  // Update array test
  const updateArrayTest = (arrayId: string, field: string, value: any) => {
    const currentTests = formData.testResults?.arrayTests || [];
    const updatedTests = currentTests.map((test) => {
      if (test.arrayId === arrayId) {
        return { ...test, [field]: value };
      }
      return test;
    });
    onUpdate('testResults', {
      ...formData.testResults,
      arrayTests: updatedTests,
    });
  };

  // Update inverter test
  const updateInverterTest = (inverterId: string, field: string, value: any) => {
    const currentTests = formData.testResults?.inverterTests || [];
    const updatedTests = currentTests.map((test) => {
      if (test.inverterId === inverterId) {
        return { ...test, [field]: value };
      }
      return test;
    });
    onUpdate('testResults', {
      ...formData.testResults,
      inverterTests: updatedTests,
    });
  };

  // Update AC test
  const updateAcTest = (field: string, value: any) => {
    onUpdate('testResults', {
      ...formData.testResults,
      acTests: {
        ...formData.testResults?.acTests,
        [field]: value,
      },
    });
  };

  // Update commissioning
  const updateCommissioning = (field: string, value: any) => {
    onUpdate('testResults', {
      ...formData.testResults,
      commissioning: {
        ...formData.testResults?.commissioning,
        [field]: value,
      },
    });
  };

  // Get array by ID
  const getArrayById = (arrayId: string) => {
    return formData.arrays?.find((a) => a.id === arrayId);
  };

  // Get inverter by ID
  const getInverterById = (inverterId: string) => {
    return formData.inverters?.find((i) => i.id === inverterId);
  };

  return (
    <div className="space-y-4 px-4 sm:px-0">
      {/* DC Array Tests */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible
          open={openSections.arrayTests}
          onOpenChange={() => toggleSection('arrayTests')}
        >
          <SectionHeader
            title="DC Array Tests"
            icon={TestTube}
            isOpen={openSections.arrayTests}
            color="amber-500"
            badge="BS EN 62446"
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-4 border-t border-white/10">
              {(formData.testResults?.arrayTests || []).map((test, index) => {
                const array = getArrayById(test.arrayId);
                return (
                  <div
                    key={test.arrayId}
                    className="p-4 bg-muted/30 rounded-xl border border-white/10 space-y-4"
                  >
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-amber-500/20 flex items-center justify-center text-xs text-amber-400">
                        {index + 1}
                      </span>
                      Array {index + 1}: {array?.panelMake || 'Unknown'} {array?.panelModel || ''}
                    </h4>

                    {/* Voltage Tests */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Open Circuit Voltage (Voc)
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Expected (V)</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={test.vocExpected || array?.stringVoltageVoc || ''}
                            onChange={(e) =>
                              updateArrayTest(
                                test.arrayId,
                                'vocExpected',
                                e.target.value === '' ? 0 : parseFloat(e.target.value) || 0
                              )
                            }
                            className="h-11 text-base touch-manipulation border-white/30 bg-muted/50"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Measured (V)</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={test.vocMeasured || ''}
                            onChange={(e) => {
                              const measured =
                                e.target.value === '' ? 0 : parseFloat(e.target.value) || 0;
                              const expected = test.vocExpected || 0;
                              const tolerance = expected * 0.1; // ±10%
                              const withinTolerance =
                                measured >= expected - tolerance &&
                                measured <= expected + tolerance;
                              updateArrayTest(test.arrayId, 'vocMeasured', measured);
                              updateArrayTest(test.arrayId, 'vocWithinTolerance', withinTolerance);
                            }}
                            className="h-11 text-base touch-manipulation border-white/30"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Result</Label>
                          <div className="h-11 flex items-center">
                            <ResultBadge value={test.vocWithinTolerance} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Current Tests */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Short Circuit Current (Isc)
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Expected (A)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={test.iscExpected || array?.stringCurrentIsc || ''}
                            onChange={(e) =>
                              updateArrayTest(
                                test.arrayId,
                                'iscExpected',
                                e.target.value === '' ? 0 : parseFloat(e.target.value) || 0
                              )
                            }
                            className="h-11 text-base touch-manipulation border-white/30 bg-muted/50"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Measured (A)</Label>
                          <Input
                            type="number"
                            step="0.01"
                            value={test.iscMeasured || ''}
                            onChange={(e) => {
                              const measured = parseFloat(e.target.value) || 0;
                              const expected = test.iscExpected || 0;
                              const tolerance = expected * 0.1; // ±10%
                              const withinTolerance =
                                measured >= expected - tolerance &&
                                measured <= expected + tolerance;
                              updateArrayTest(test.arrayId, 'iscMeasured', measured);
                              updateArrayTest(test.arrayId, 'iscWithinTolerance', withinTolerance);
                            }}
                            className="h-11 text-base touch-manipulation border-white/30"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Result</Label>
                          <div className="h-11 flex items-center">
                            <ResultBadge value={test.iscWithinTolerance} />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Insulation Resistance */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground">
                        Insulation Resistance (MΩ) - Test Voltage: {test.irTestVoltage || 1000}V
                      </Label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">+ve to Earth</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={test.irPositiveToEarth || ''}
                            onChange={(e) =>
                              updateArrayTest(
                                test.arrayId,
                                'irPositiveToEarth',
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="h-11 text-base touch-manipulation border-white/30"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">-ve to Earth</Label>
                          <Input
                            type="number"
                            step="0.1"
                            value={test.irNegativeToEarth || ''}
                            onChange={(e) =>
                              updateArrayTest(
                                test.arrayId,
                                'irNegativeToEarth',
                                parseFloat(e.target.value) || 0
                              )
                            }
                            className="h-11 text-base touch-manipulation border-white/30"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Min Required</Label>
                          <Input
                            type="number"
                            value={test.irMinimumRequired || 1}
                            onChange={(e) =>
                              updateArrayTest(
                                test.arrayId,
                                'irMinimumRequired',
                                parseFloat(e.target.value) || 1
                              )
                            }
                            className="h-11 text-base touch-manipulation border-white/30 bg-muted/50"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Result</Label>
                          <div className="h-11 flex items-center">
                            <ResultBadge
                              value={
                                test.irPositiveToEarth >= (test.irMinimumRequired || 1) &&
                                test.irNegativeToEarth >= (test.irMinimumRequired || 1)
                                  ? true
                                  : test.irPositiveToEarth > 0
                                    ? false
                                    : null
                              }
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Environmental Conditions - BS EN 62446-1 Requirement */}
                    <div className="space-y-2">
                      <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                        Environmental Conditions at Test
                        <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 text-[9px]">
                          BS EN 62446
                        </Badge>
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Irradiance (W/m²)</Label>
                          <Input
                            type="number"
                            step="10"
                            value={test.irradiance || ''}
                            onChange={(e) =>
                              updateArrayTest(
                                test.arrayId,
                                'irradiance',
                                parseFloat(e.target.value) || 0
                              )
                            }
                            placeholder="e.g., 800"
                            className="h-11 text-base touch-manipulation border-white/30"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Ambient Temp (°C)</Label>
                          <Input
                            type="number"
                            step="0.5"
                            value={test.ambientTemp || ''}
                            onChange={(e) =>
                              updateArrayTest(
                                test.arrayId,
                                'ambientTemp',
                                parseFloat(e.target.value) || 0
                              )
                            }
                            placeholder="e.g., 20"
                            className="h-11 text-base touch-manipulation border-white/30"
                          />
                        </div>
                        <div className="space-y-1">
                          <Label className="text-xs text-muted-foreground">Module Temp (°C)</Label>
                          <Input
                            type="number"
                            step="0.5"
                            value={test.moduleTemp || ''}
                            onChange={(e) =>
                              updateArrayTest(
                                test.arrayId,
                                'moduleTemp',
                                parseFloat(e.target.value) || 0
                              )
                            }
                            placeholder="e.g., 35"
                            className="h-11 text-base touch-manipulation border-white/30"
                          />
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Record irradiance &gt;400 W/m² for valid Isc measurements. Temperature
                        affects Voc readings.
                      </p>
                    </div>

                    {/* Polarity & Continuity */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                        <Checkbox
                          checked={test.polarityCorrect || false}
                          onCheckedChange={(checked) =>
                            updateArrayTest(test.arrayId, 'polarityCorrect', checked)
                          }
                          className="h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                        />
                        <Label className="text-sm text-foreground cursor-pointer">
                          Polarity Correct
                        </Label>
                      </div>

                      <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                        <Checkbox
                          checked={test.stringContinuity || false}
                          onCheckedChange={(checked) =>
                            updateArrayTest(test.arrayId, 'stringContinuity', checked)
                          }
                          className="h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                        />
                        <Label className="text-sm text-foreground cursor-pointer">
                          String Continuity OK
                        </Label>
                      </div>
                    </div>

                    {/* Array Test Notes */}
                    <div className="space-y-1">
                      <Label className="text-xs text-muted-foreground">Array Test Notes</Label>
                      <Input
                        value={test.notes || ''}
                        onChange={(e) => updateArrayTest(test.arrayId, 'notes', e.target.value)}
                        placeholder="Any observations or issues..."
                        className="h-11 text-base touch-manipulation border-white/30"
                      />
                    </div>
                  </div>
                );
              })}

              {(!formData.testResults?.arrayTests ||
                formData.testResults.arrayTests.length === 0) && (
                <div className="p-6 text-center text-muted-foreground">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No arrays configured. Add arrays in the System Design tab first.</p>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Inverter Tests */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible
          open={openSections.inverterTests}
          onOpenChange={() => toggleSection('inverterTests')}
        >
          <SectionHeader
            title="Inverter Tests"
            icon={Zap}
            isOpen={openSections.inverterTests}
            color="blue-500"
            badge="G98/G99"
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-4 border-t border-white/10">
              {(formData.testResults?.inverterTests || []).map((test, index) => {
                const inverter = getInverterById(test.inverterId);
                return (
                  <div
                    key={test.inverterId}
                    className="p-4 bg-muted/30 rounded-xl border border-white/10 space-y-4"
                  >
                    <h4 className="font-semibold text-foreground flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center text-xs text-blue-400">
                        {index + 1}
                      </span>
                      Inverter {index + 1}: {inverter?.make || 'Unknown'} {inverter?.model || ''}
                    </h4>

                    {/* Isolators */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-foreground">DC Isolator</Label>
                        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                          <Checkbox
                            checked={test.dcIsolatorOperational || false}
                            onCheckedChange={(checked) =>
                              updateInverterTest(test.inverterId, 'dcIsolatorOperational', checked)
                            }
                            className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                          />
                          <Label className="text-sm text-foreground cursor-pointer">
                            Operational
                          </Label>
                        </div>
                        <Input
                          value={test.dcIsolatorLocation || ''}
                          onChange={(e) =>
                            updateInverterTest(
                              test.inverterId,
                              'dcIsolatorLocation',
                              e.target.value
                            )
                          }
                          placeholder="Location"
                          className="h-11 text-base touch-manipulation border-white/30"
                        />
                      </div>

                      <div className="space-y-3">
                        <Label className="text-sm font-medium text-foreground">AC Isolator</Label>
                        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                          <Checkbox
                            checked={test.acIsolatorOperational || false}
                            onCheckedChange={(checked) =>
                              updateInverterTest(test.inverterId, 'acIsolatorOperational', checked)
                            }
                            className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                          />
                          <Label className="text-sm text-foreground cursor-pointer">
                            Operational
                          </Label>
                        </div>
                        <Input
                          value={test.acIsolatorLocation || ''}
                          onChange={(e) =>
                            updateInverterTest(
                              test.inverterId,
                              'acIsolatorLocation',
                              e.target.value
                            )
                          }
                          placeholder="Location"
                          className="h-11 text-base touch-manipulation border-white/30"
                        />
                      </div>
                    </div>

                    {/* Protection Tests - G98/G99 Compliance */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                        Protection Tests
                        <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30 text-[9px]">
                          G98/G99
                        </Badge>
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                          <Checkbox
                            checked={test.antiIslandingTest || false}
                            onCheckedChange={(checked) =>
                              updateInverterTest(test.inverterId, 'antiIslandingTest', checked)
                            }
                            className="h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                          />
                          <Label className="text-sm text-foreground cursor-pointer">
                            Anti-Islanding Verified
                          </Label>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                          <Checkbox
                            checked={test.earthFaultProtection || false}
                            onCheckedChange={(checked) =>
                              updateInverterTest(test.inverterId, 'earthFaultProtection', checked)
                            }
                            className="h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                          />
                          <Label className="text-sm text-foreground cursor-pointer">
                            Earth Fault Protection
                          </Label>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                          <Checkbox
                            checked={test.overvoltageProtection || false}
                            onCheckedChange={(checked) =>
                              updateInverterTest(test.inverterId, 'overvoltageProtection', checked)
                            }
                            className="h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                          />
                          <Label className="text-sm text-foreground cursor-pointer">
                            Overvoltage Protection
                          </Label>
                        </div>
                      </div>

                      {/* Anti-Islanding Test Method */}
                      <div className="space-y-1">
                        <Label className="text-xs text-muted-foreground">
                          Anti-Islanding Verification Method
                        </Label>
                        <Select
                          value={test.antiIslandingMethod || ''}
                          onValueChange={(value) =>
                            updateInverterTest(test.inverterId, 'antiIslandingMethod', value)
                          }
                        >
                          <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray">
                            <SelectValue placeholder="Select method" />
                          </SelectTrigger>
                          <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                            <SelectItem value="mains-isolation">
                              Mains isolation test (switch off supply)
                            </SelectItem>
                            <SelectItem value="manufacturer-cert">
                              G98/G99 certificate verified
                            </SelectItem>
                            <SelectItem value="type-tested">Type-tested to EN 50549</SelectItem>
                            <SelectItem value="visual-display">
                              Verified via inverter display
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    {/* Commissioning */}
                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-foreground">
                        Commissioning Checks
                      </Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                          <Checkbox
                            checked={test.commissioning?.powerOnTest || false}
                            onCheckedChange={(checked) =>
                              updateInverterTest(test.inverterId, 'commissioning', {
                                ...test.commissioning,
                                powerOnTest: checked,
                              })
                            }
                            className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                          />
                          <Label className="text-sm text-foreground cursor-pointer">Power On</Label>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                          <Checkbox
                            checked={test.commissioning?.gridSyncTest || false}
                            onCheckedChange={(checked) =>
                              updateInverterTest(test.inverterId, 'commissioning', {
                                ...test.commissioning,
                                gridSyncTest: checked,
                              })
                            }
                            className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                          />
                          <Label className="text-sm text-foreground cursor-pointer">
                            Grid Sync
                          </Label>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                          <Checkbox
                            checked={test.commissioning?.displayFunctional || false}
                            onCheckedChange={(checked) =>
                              updateInverterTest(test.inverterId, 'commissioning', {
                                ...test.commissioning,
                                displayFunctional: checked,
                              })
                            }
                            className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                          />
                          <Label className="text-sm text-foreground cursor-pointer">
                            Display OK
                          </Label>
                        </div>

                        <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                          <Checkbox
                            checked={test.commissioning?.communicationsTest || false}
                            onCheckedChange={(checked) =>
                              updateInverterTest(test.inverterId, 'commissioning', {
                                ...test.commissioning,
                                communicationsTest: checked,
                              })
                            }
                            className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                          />
                          <Label className="text-sm text-foreground cursor-pointer">Comms OK</Label>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {(!formData.testResults?.inverterTests ||
                formData.testResults.inverterTests.length === 0) && (
                <div className="p-6 text-center text-muted-foreground">
                  <AlertTriangle className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p>No inverters configured. Add inverters in the System Design tab first.</p>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* AC Tests */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible open={openSections.acTests} onOpenChange={() => toggleSection('acTests')}>
          <SectionHeader
            title="AC Installation Tests"
            icon={Zap}
            isOpen={openSections.acTests}
            color="purple-500"
            badge="BS 7671"
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-4 border-t border-white/10">
              {/* Earthing */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Earthing</Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Arrangement</Label>
                    <Select
                      value={formData.testResults?.acTests?.earthingArrangement || 'TN-C-S'}
                      onValueChange={(value) =>
                        updateAcTest('earthingArrangement', value as EarthingArrangement)
                      }
                    >
                      <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                        <SelectItem value="TN-S">TN-S</SelectItem>
                        <SelectItem value="TN-C-S">TN-C-S (PME)</SelectItem>
                        <SelectItem value="TT">TT</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Ze (Ω)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.testResults?.acTests?.zeValue || ''}
                      onChange={(e) => updateAcTest('zeValue', parseFloat(e.target.value) || 0)}
                      className="h-11 text-base touch-manipulation border-white/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Zs (Ω)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.testResults?.acTests?.zsValue || ''}
                      onChange={(e) => updateAcTest('zsValue', parseFloat(e.target.value) || 0)}
                      className="h-11 text-base touch-manipulation border-white/30"
                    />
                  </div>
                </div>
              </div>

              {/* RCD */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">RCD Protection</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Type</Label>
                    <Select
                      value={formData.testResults?.acTests?.rcdType || 'Type A'}
                      onValueChange={(value) => updateAcTest('rcdType', value)}
                    >
                      <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                        <SelectItem value="Type A">Type A</SelectItem>
                        <SelectItem value="Type B">Type B</SelectItem>
                        <SelectItem value="Type A + 6mA DC">Type A + 6mA DC</SelectItem>
                        <SelectItem value="Type F">Type F</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Rating (mA)</Label>
                    <Input
                      type="number"
                      value={formData.testResults?.acTests?.rcdRating || 30}
                      onChange={(e) => updateAcTest('rcdRating', parseInt(e.target.value) || 30)}
                      className="h-11 text-base touch-manipulation border-white/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Trip Time (ms)</Label>
                    <Input
                      type="number"
                      value={formData.testResults?.acTests?.rcdTripTime || ''}
                      onChange={(e) => updateAcTest('rcdTripTime', parseInt(e.target.value) || 0)}
                      className="h-11 text-base touch-manipulation border-white/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Result</Label>
                    <div className="h-11 flex items-center">
                      <ResultBadge
                        value={
                          formData.testResults?.acTests?.rcdTripTime
                            ? formData.testResults.acTests.rcdTripTime <= 300
                            : null
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Continuity & Insulation */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">
                  Continuity & Insulation
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">R1+R2 (Ω)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={formData.testResults?.acTests?.r1r2Value || ''}
                      onChange={(e) => updateAcTest('r1r2Value', parseFloat(e.target.value) || 0)}
                      className="h-11 text-base touch-manipulation border-white/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">IR (MΩ)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.testResults?.acTests?.insulationResistance || ''}
                      onChange={(e) =>
                        updateAcTest('insulationResistance', parseFloat(e.target.value) || 0)
                      }
                      className="h-11 text-base touch-manipulation border-white/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Test Voltage (V)</Label>
                    <Select
                      value={String(formData.testResults?.acTests?.irTestVoltage || 500)}
                      onValueChange={(value) => updateAcTest('irTestVoltage', parseInt(value))}
                    >
                      <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                        <SelectItem value="250">250V</SelectItem>
                        <SelectItem value="500">500V</SelectItem>
                        <SelectItem value="1000">1000V</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">IR Result</Label>
                    <div className="h-11 flex items-center">
                      <ResultBadge
                        value={
                          formData.testResults?.acTests?.insulationResistance
                            ? formData.testResults.acTests.insulationResistance >= 1
                            : null
                        }
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Protection Device & PFC */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Protection Device</Label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">MCB Rating (A)</Label>
                    <Input
                      type="number"
                      value={formData.testResults?.acTests?.mcbRating || ''}
                      onChange={(e) => updateAcTest('mcbRating', parseInt(e.target.value) || 0)}
                      className="h-11 text-base touch-manipulation border-white/30"
                    />
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">MCB Type</Label>
                    <Select
                      value={formData.testResults?.acTests?.mcbType || 'B'}
                      onValueChange={(value) => updateAcTest('mcbType', value)}
                    >
                      <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                        <SelectItem value="B">Type B</SelectItem>
                        <SelectItem value="C">Type C</SelectItem>
                        <SelectItem value="D">Type D</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">PFC (kA)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.testResults?.acTests?.pfc || ''}
                      onChange={(e) => updateAcTest('pfc', parseFloat(e.target.value) || 0)}
                      placeholder="Prospective"
                      className="h-11 text-base touch-manipulation border-white/30"
                    />
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-background/50 rounded-lg">
                    <Checkbox
                      checked={formData.testResults?.acTests?.polarityCorrect || false}
                      onCheckedChange={(checked) => updateAcTest('polarityCorrect', checked)}
                      className="h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <Label className="text-sm text-foreground cursor-pointer">Polarity OK</Label>
                  </div>
                </div>
              </div>

              {/* MCB Location */}
              <div className="space-y-1">
                <Label className="text-xs text-muted-foreground">
                  MCB Location / Consumer Unit
                </Label>
                <Input
                  value={formData.testResults?.acTests?.mcbLocation || ''}
                  onChange={(e) => updateAcTest('mcbLocation', e.target.value)}
                  placeholder="e.g., Main CU, Way 12"
                  className="h-11 text-base touch-manipulation border-white/30"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Commissioning Checklist */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible
          open={openSections.commissioning}
          onOpenChange={() => toggleSection('commissioning')}
        >
          <SectionHeader
            title="Commissioning Checklist"
            icon={CheckCircle2}
            isOpen={openSections.commissioning}
            color="green-500"
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-4 border-t border-white/10">
              {/* Initial Performance Check */}
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-xl space-y-3">
                <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-green-400" />
                  Initial Performance Check
                </Label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Power Output (kW)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.testResults?.commissioning?.initialPowerOutput || ''}
                      onChange={(e) =>
                        updateCommissioning('initialPowerOutput', parseFloat(e.target.value) || 0)
                      }
                      placeholder="Observed power"
                      className="h-11 text-base touch-manipulation border-white/30 bg-background/50"
                    />
                  </div>
                  <div className="space-y-1 sm:col-span-2">
                    <Label className="text-xs text-muted-foreground">Weather Conditions</Label>
                    <Input
                      value={formData.testResults?.commissioning?.weatherConditions || ''}
                      onChange={(e) => updateCommissioning('weatherConditions', e.target.value)}
                      placeholder="e.g., Clear sky, full sun, midday"
                      className="h-11 text-base touch-manipulation border-white/30 bg-background/50"
                    />
                  </div>
                </div>
              </div>

              {/* System Operational Checks */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">System Operation</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Checkbox
                      checked={formData.testResults?.commissioning?.systemOperational || false}
                      onCheckedChange={(checked) =>
                        updateCommissioning('systemOperational', checked)
                      }
                      className="h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <Label className="text-sm text-foreground cursor-pointer">
                      System Operational & Generating
                    </Label>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Checkbox
                      checked={formData.testResults?.commissioning?.exportVerified || false}
                      onCheckedChange={(checked) => updateCommissioning('exportVerified', checked)}
                      className="h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <Label className="text-sm text-foreground cursor-pointer">
                      Export to Grid Verified
                    </Label>
                  </div>
                </div>
              </div>

              {/* Meter Readings */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">
                  Initial Meter Readings
                </Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Generation Meter (kWh)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.testResults?.commissioning?.generationMeterReading || ''}
                      onChange={(e) =>
                        updateCommissioning(
                          'generationMeterReading',
                          parseFloat(e.target.value) || 0
                        )
                      }
                      placeholder="Initial reading"
                      className="h-11 text-base touch-manipulation border-white/30"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Export Meter (kWh)</Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.testResults?.commissioning?.exportMeterReading || ''}
                      onChange={(e) =>
                        updateCommissioning('exportMeterReading', parseFloat(e.target.value) || 0)
                      }
                      placeholder="If fitted"
                      className="h-11 text-base touch-manipulation border-white/30"
                    />
                  </div>
                </div>
              </div>

              {/* Customer Handover */}
              <div className="space-y-3">
                <Label className="text-sm font-medium text-foreground">Customer Handover</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Checkbox
                      checked={formData.testResults?.commissioning?.customerBriefed || false}
                      onCheckedChange={(checked) => updateCommissioning('customerBriefed', checked)}
                      className="h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <Label className="text-sm text-foreground cursor-pointer">
                      Customer Briefed on System
                    </Label>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Checkbox
                      checked={
                        formData.testResults?.commissioning?.shutdownProcedureExplained || false
                      }
                      onCheckedChange={(checked) =>
                        updateCommissioning('shutdownProcedureExplained', checked)
                      }
                      className="h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <Label className="text-sm text-foreground cursor-pointer">
                      Emergency Shutdown Explained
                    </Label>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Checkbox
                      checked={
                        formData.testResults?.commissioning?.systemPerformanceExplained || false
                      }
                      onCheckedChange={(checked) =>
                        updateCommissioning('systemPerformanceExplained', checked)
                      }
                      className="h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <Label className="text-sm text-foreground cursor-pointer">
                      Performance Expectations Set
                    </Label>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Checkbox
                      checked={
                        formData.testResults?.commissioning?.maintenanceRequirementsExplained ||
                        false
                      }
                      onCheckedChange={(checked) =>
                        updateCommissioning('maintenanceRequirementsExplained', checked)
                      }
                      className="h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <Label className="text-sm text-foreground cursor-pointer">
                      Maintenance Requirements Explained
                    </Label>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Checkbox
                      checked={
                        formData.testResults?.commissioning?.warrantyDetailsExplained || false
                      }
                      onCheckedChange={(checked) =>
                        updateCommissioning('warrantyDetailsExplained', checked)
                      }
                      className="h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <Label className="text-sm text-foreground cursor-pointer">
                      Warranty Details Explained
                    </Label>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Checkbox
                      checked={formData.testResults?.commissioning?.documentationProvided || false}
                      onCheckedChange={(checked) =>
                        updateCommissioning('documentationProvided', checked)
                      }
                      className="h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <Label className="text-sm text-foreground cursor-pointer">
                      All Documentation Provided
                    </Label>
                  </div>

                  <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                    <Checkbox
                      checked={
                        formData.testResults?.commissioning?.emergencyContactProvided || false
                      }
                      onCheckedChange={(checked) =>
                        updateCommissioning('emergencyContactProvided', checked)
                      }
                      className="h-5 w-5 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500"
                    />
                    <Label className="text-sm text-foreground cursor-pointer">
                      Emergency Contact Details Given
                    </Label>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">Commissioning Notes</Label>
                <Textarea
                  value={formData.testResults?.commissioning?.notes || ''}
                  onChange={(e) => updateCommissioning('notes', e.target.value)}
                  placeholder="Any observations, issues resolved, or follow-up required..."
                  className="min-h-[120px] touch-manipulation text-base border-white/30 focus:border-yellow-500"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
};

export default SolarPVTestSchedule;
