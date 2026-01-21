import React, { useState, useEffect, useMemo } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SectionHeader from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Power, Zap, Shield, Wrench, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import {
  RCD_RATINGS,
  TEST_EQUIPMENT,
  INSULATION_TEST_VOLTAGES,
} from '@/constants/minorWorksOptions';

interface MWTestingTabProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const MWTestingTab: React.FC<MWTestingTabProps> = ({ formData, onUpdate }) => {
  const isMobile = useIsMobile();
  const [openSections, setOpenSections] = useState({
    dead: true,
    live: true,
    protection: true,
    equipment: true
  });
  const [recentInstruments, setRecentInstruments] = useState<string[]>([]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  // Load recent instruments on mount
  useEffect(() => {
    const loadInstruments = async () => {
      try {
        const { offlineStorage } = await import('@/utils/offlineStorage');
        const instruments = await offlineStorage.getRecentInstruments();
        setRecentInstruments(instruments);
      } catch (e) {
        console.error('Failed to load recent instruments', e);
      }
    };
    loadInstruments();
  }, []);

  // Auto-fill serial and calibration when instrument is selected
  const loadInstrumentDetails = async (make: string) => {
    if (!make || make === 'other') return;
    try {
      const { offlineStorage } = await import('@/utils/offlineStorage');
      const details = await offlineStorage.getInstrumentDetails(make);
      if (details) {
        // Only auto-fill if fields are currently empty
        if (!formData.testEquipmentSerial && details.serialNumber) {
          onUpdate('testEquipmentSerial', details.serialNumber);
        }
        if (!formData.testEquipmentCalDate && details.calibrationDate) {
          onUpdate('testEquipmentCalDate', details.calibrationDate);
        }
      }
    } catch (e) {
      console.error('Failed to load instrument details', e);
    }
  };

  // Save instrument details when serial or calibration changes
  useEffect(() => {
    const saveInstrumentDetails = async () => {
      const make = formData.testEquipmentModel;
      if (!make || make === 'other') return;

      const serial = formData.testEquipmentSerial;
      const calibration = formData.testEquipmentCalDate;

      // Only save if we have at least a serial number
      if (serial) {
        try {
          const { offlineStorage } = await import('@/utils/offlineStorage');
          await offlineStorage.saveInstrumentDetails(make, {
            serialNumber: serial,
            calibrationDate: calibration || ''
          });
        } catch (e) {
          console.error('Failed to save instrument details', e);
        }
      }
    };

    const timer = setTimeout(() => {
      saveInstrumentDetails();
    }, 500);
    return () => clearTimeout(timer);
  }, [formData.testEquipmentSerial, formData.testEquipmentCalDate, formData.testEquipmentModel]);

  // Save instrument to recent list and load its details
  const handleInstrumentSelect = async (value: string) => {
    onUpdate('testEquipmentModel', value);

    if (value && value !== 'other') {
      // Save to recent list
      const updated = [
        value,
        ...recentInstruments.filter(i => i !== value)
      ].slice(0, 3);
      setRecentInstruments(updated);

      try {
        const { offlineStorage } = await import('@/utils/offlineStorage');
        await offlineStorage.saveRecentInstrument(value);
      } catch (e) {
        console.error('Failed to save recent instrument', e);
      }

      // Load saved details for this instrument
      loadInstrumentDetails(value);
    }
  };

  // Build options list with recent instruments at top
  const instrumentOptions = useMemo(() => {
    const recentOptions = recentInstruments.map(instrument => ({
      value: instrument,
      label: `⏱️ ${instrument}`,
      description: 'Recently used'
    }));

    // Filter out recent instruments from main list to avoid duplicates
    const mainOptions = TEST_EQUIPMENT.filter(
      opt => !recentInstruments.includes(opt.value)
    );

    return [...recentOptions, ...mainOptions];
  }, [recentInstruments]);

  const getCompletionPercentage = (section: string) => {
    switch (section) {
      case 'dead': {
        const fields = ['continuityR1R2', 'polarity'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      case 'live': {
        const fields = ['earthFaultLoopImpedance'];
        const filled = fields.filter(f => formData[f]).length;
        return Math.round((filled / fields.length) * 100);
      }
      case 'protection':
        return formData.rcdRating || formData.afddTestButton || formData.spdIndicatorStatus ? 100 : 0;
      case 'equipment':
        return formData.testEquipmentModel ? 100 : 0;
      default:
        return 0;
    }
  };

  // Check if Zs is within limits
  const isZsValid = () => {
    if (!formData.earthFaultLoopImpedance || !formData.maxPermittedZs) return null;
    const measured = parseFloat(formData.earthFaultLoopImpedance);
    const max = parseFloat(formData.maxPermittedZs);
    return measured <= max;
  };

  const zsValidation = isZsValid();

  // Check insulation resistance values
  const checkInsulationValue = (value: string) => {
    if (!value) return null;
    const num = parseFloat(value);
    if (isNaN(num)) return null;
    return num >= 1; // Minimum 1 MΩ per BS 7671
  };

  return (
    <div className={cn("space-y-4 sm:space-y-6", isMobile && "-mx-4")}>
      {/* Dead Tests */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.dead} onOpenChange={() => toggleSection('dead')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Dead Tests (Circuit Isolated)"
              icon={Power}
              isOpen={openSections.dead}
              color="orange-500"
              completionPercentage={getCompletionPercentage('dead')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              {/* Continuity - IET allows R1+R2 OR R2 */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                  Continuity (R1+R2 or R2)
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">(R1+R2) Continuity (Ω)</Label>
                    <div className="relative">
                      <Input
                        value={formData.continuityR1R2 || ''}
                        onChange={(e) => onUpdate('continuityR1R2', e.target.value)}
                        placeholder="e.g., 0.45"
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-orange-500 focus:ring-orange-500 pr-10"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-sm">Ω</span>
                    </div>
                    <p className="text-xs text-muted-foreground">Combined line and cpc</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm"><span className="font-semibold">or</span> R2 Continuity (Ω)</Label>
                    <div className="relative">
                      <Input
                        value={formData.r2Continuity || ''}
                        onChange={(e) => onUpdate('r2Continuity', e.target.value)}
                        placeholder="e.g., 0.25"
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-orange-500 focus:ring-orange-500 pr-10"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-sm">Ω</span>
                    </div>
                    <p className="text-xs text-muted-foreground">CPC only (alternative)</p>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Polarity *</Label>
                    <MobileSelectPicker
                      value={formData.polarity || ''}
                      onValueChange={(v) => onUpdate('polarity', v)}
                      options={[
                        { value: 'correct', label: 'Correct', description: 'All conductors correctly identified' },
                        { value: 'incorrect', label: 'Incorrect', description: 'Polarity fault detected' },
                      ]}
                      placeholder="Select"
                      title="Polarity Test Result"
                      triggerClassName={cn(
                        "bg-elec-gray border-white/30",
                        !formData.polarity && "border-red-500/50",
                        formData.polarity === 'correct' && "border-green-500/50",
                        formData.polarity === 'incorrect' && "border-red-500"
                      )}
                    />
                    {formData.polarity === 'correct' && (
                      <div className="flex items-center gap-1 text-xs text-green-400">
                        <CheckCircle className="h-3 w-3" />
                        <span>Polarity confirmed</span>
                      </div>
                    )}
                    {formData.polarity === 'incorrect' && (
                      <div className="flex items-center gap-1 text-xs text-red-400">
                        <AlertCircle className="h-3 w-3" />
                        <span>Polarity fault - must be corrected</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Ring Circuit Continuity - shown only for ring circuits */}
              {formData.circuitType === 'ring' && (
                <div className="rounded-xl border border-white/10 bg-orange-500/5 border-l-2 border-l-orange-500 overflow-hidden">
                  <div className="px-4 py-2.5 bg-orange-500/10 border-b border-white/5">
                    <span className="text-sm font-medium text-orange-400">Ring Circuit Continuity</span>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">(r1) Line-Line</label>
                        <div className="relative">
                          <Input
                            value={formData.ringR1 || ''}
                            onChange={(e) => onUpdate('ringR1', e.target.value)}
                            placeholder="e.g., 0.52"
                            className="h-12 text-base bg-white/5 border-white/10 rounded-xl focus:border-orange-500/50 focus:ring-orange-500/20 pr-10"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">Ω</span>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">(rn) Neutral-Neutral</label>
                        <div className="relative">
                          <Input
                            value={formData.ringRn || ''}
                            onChange={(e) => onUpdate('ringRn', e.target.value)}
                            placeholder="e.g., 0.52"
                            className="h-12 text-base bg-white/5 border-white/10 rounded-xl focus:border-orange-500/50 focus:ring-orange-500/20 pr-10"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">Ω</span>
                        </div>
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-xs uppercase tracking-wide text-white/50 pl-0.5">(r2) CPC-CPC</label>
                        <div className="relative">
                          <Input
                            value={formData.ringR2 || ''}
                            onChange={(e) => onUpdate('ringR2', e.target.value)}
                            placeholder="e.g., 0.87"
                            className="h-12 text-base bg-white/5 border-white/10 rounded-xl focus:border-orange-500/50 focus:ring-orange-500/20 pr-10"
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 text-sm">Ω</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Insulation Resistance */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                  Insulation Resistance
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Test Voltage</Label>
                    <MobileSelectPicker
                      value={formData.insulationTestVoltage || '500V'}
                      onValueChange={(v) => onUpdate('insulationTestVoltage', v)}
                      options={INSULATION_TEST_VOLTAGES}
                      placeholder="Select"
                      title="Insulation Test Voltage"
                      triggerClassName="bg-elec-gray border-white/30"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  {[
                    { field: 'insulationLiveLive', label: 'Live-Live (MΩ)' },
                    { field: 'insulationLiveNeutral', label: 'Live-Neutral (MΩ)' },
                    { field: 'insulationLiveEarth', label: 'Live-Earth (MΩ)' },
                    { field: 'insulationNeutralEarth', label: 'Neutral-Earth (MΩ)' },
                  ].map(({ field, label }) => {
                    const isValid = checkInsulationValue(formData[field]);
                    return (
                      <div key={field} className="space-y-2">
                        <Label className="text-sm">{label}</Label>
                        <Input
                          value={formData[field] || ''}
                          onChange={(e) => onUpdate(field, e.target.value)}
                          placeholder="≥1MΩ"
                          className={cn(
                            "h-11 text-base touch-manipulation",
                            isValid === true && "border-green-500/50 focus:border-green-500 focus:ring-green-500",
                            isValid === false && "border-red-500/50 focus:border-red-500 focus:ring-red-500",
                            isValid === null && "border-white/30 focus:border-orange-500 focus:ring-orange-500"
                          )}
                        />
                        {isValid === true && (
                          <div className="flex items-center gap-1">
                            <CheckCircle className="h-3 w-3 text-green-400" />
                            <span className="text-xs text-green-400">Pass</span>
                          </div>
                        )}
                        {isValid === false && (
                          <div className="flex items-center gap-1">
                            <AlertCircle className="h-3 w-3 text-red-400" />
                            <span className="text-xs text-red-400">Below 1MΩ</span>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Live Tests */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.live} onOpenChange={() => toggleSection('live')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Live Tests (Circuit Energised)"
              icon={Zap}
              isOpen={openSections.live}
              color="yellow-500"
              completionPercentage={getCompletionPercentage('live')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Earth Fault Loop Impedance (Zs) *</Label>
                  <div className="relative">
                    <Input
                      value={formData.earthFaultLoopImpedance || ''}
                      onChange={(e) => onUpdate('earthFaultLoopImpedance', e.target.value)}
                      placeholder="e.g., 0.85"
                      className={cn(
                        "h-11 text-base touch-manipulation pr-10",
                        !formData.earthFaultLoopImpedance && "border-red-500/50",
                        zsValidation === true && "border-green-500/50 focus:border-green-500 focus:ring-green-500",
                        zsValidation === false && "border-red-500/50 focus:border-red-500 focus:ring-red-500",
                        zsValidation === null && "border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      )}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-sm">Ω</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Max Permitted Zs</Label>
                  <Input
                    value={formData.maxPermittedZs || ''}
                    readOnly
                    placeholder="Auto-calculated"
                    className="h-11 text-base touch-manipulation border-white/30 bg-white/5 cursor-not-allowed"
                  />
                </div>
              </div>

              {zsValidation !== null && (
                <Alert className={cn(
                  "border",
                  zsValidation ? "border-green-500/30 bg-green-500/10" : "border-red-500/30 bg-red-500/10"
                )}>
                  {zsValidation ? (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  ) : (
                    <AlertCircle className="h-4 w-4 text-red-400" />
                  )}
                  <AlertDescription className={zsValidation ? "text-green-200" : "text-red-200"}>
                    {zsValidation
                      ? "Zs is within acceptable limits"
                      : "Zs exceeds maximum permitted value - check circuit protection"}
                  </AlertDescription>
                </Alert>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Prospective Fault Current (kA)</Label>
                  <Input
                    value={formData.prospectiveFaultCurrent || ''}
                    onChange={(e) => onUpdate('prospectiveFaultCurrent', e.target.value)}
                    placeholder="e.g., 2.5"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Functional Testing</Label>
                  <MobileSelectPicker
                    value={formData.functionalTesting || ''}
                    onValueChange={(v) => onUpdate('functionalTesting', v)}
                    options={[
                      { value: 'pass', label: 'Pass', description: 'All functions working correctly' },
                      { value: 'fail', label: 'Fail', description: 'Functional issues found' },
                      { value: 'na', label: 'N/A', description: 'Not applicable' },
                    ]}
                    placeholder="Select result"
                    title="Functional Testing Result"
                    triggerClassName="bg-elec-gray border-white/30"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Protection Testing (Conditional) */}
      {(formData.protectionRcd || formData.protectionRcbo || formData.protectionAfdd || formData.protectionSpd) && (
        <div className="eicr-section-card">
          <Collapsible open={openSections.protection} onOpenChange={() => toggleSection('protection')}>
            <CollapsibleTrigger className="w-full">
              <SectionHeader
                title="Protection Testing"
                icon={Shield}
                isOpen={openSections.protection}
                color="purple-500"
                completionPercentage={getCompletionPercentage('protection')}
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className="p-4 sm:p-5 md:p-6 space-y-4">
                {/* RCD/RCBO Testing */}
                {(formData.protectionRcd || formData.protectionRcbo) && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-purple-400 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                      RCD/RCBO Testing
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">RCD Rating (mA)</Label>
                        <MobileSelectPicker
                          value={formData.rcdRating || ''}
                          onValueChange={(v) => onUpdate('rcdRating', v)}
                          options={RCD_RATINGS}
                          placeholder="Select"
                          title="RCD Rating (IΔn)"
                          triggerClassName="bg-elec-gray border-white/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">1× IΔn Trip Time (ms)</Label>
                        <div className="relative">
                          <Input
                            value={formData.rcdOneX || ''}
                            onChange={(e) => onUpdate('rcdOneX', e.target.value)}
                            placeholder="<300ms"
                            className={cn(
                              "h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500 pr-12",
                              formData.rcdOneX && parseFloat(formData.rcdOneX) <= 300 && "border-green-500/50",
                              formData.rcdOneX && parseFloat(formData.rcdOneX) > 300 && "border-red-500/50"
                            )}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-sm">ms</span>
                        </div>
                        {formData.rcdOneX && parseFloat(formData.rcdOneX) <= 300 && (
                          <div className="flex items-center gap-1 text-xs text-green-400">
                            <CheckCircle className="h-3 w-3" />
                            <span>Within limits</span>
                          </div>
                        )}
                        {formData.rcdOneX && parseFloat(formData.rcdOneX) > 300 && (
                          <div className="flex items-center gap-1 text-xs text-red-400">
                            <AlertCircle className="h-3 w-3" />
                            <span>Exceeds 300ms limit</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Test Button</Label>
                        <MobileSelectPicker
                          value={formData.rcdTestButton || ''}
                          onValueChange={(v) => onUpdate('rcdTestButton', v)}
                          options={[
                            { value: 'pass', label: 'Pass', description: 'RCD trips when test button pressed' },
                            { value: 'fail', label: 'Fail', description: 'RCD did not trip' },
                          ]}
                          placeholder="Result"
                          title="RCD Test Button Result"
                          triggerClassName="bg-elec-gray border-white/30"
                        />
                      </div>
                    </div>
                    {/* Additional RCD test fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">5× IΔn Trip Time (ms)</Label>
                        <div className="relative">
                          <Input
                            value={formData.rcdFiveX || ''}
                            onChange={(e) => onUpdate('rcdFiveX', e.target.value)}
                            placeholder="<40ms"
                            className={cn(
                              "h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500 pr-12",
                              formData.rcdFiveX && parseFloat(formData.rcdFiveX) <= 40 && "border-green-500/50",
                              formData.rcdFiveX && parseFloat(formData.rcdFiveX) > 40 && "border-red-500/50"
                            )}
                          />
                          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-sm">ms</span>
                        </div>
                        {formData.rcdFiveX && parseFloat(formData.rcdFiveX) <= 40 && (
                          <div className="flex items-center gap-1 text-xs text-green-400">
                            <CheckCircle className="h-3 w-3" />
                            <span>Within 40ms limit</span>
                          </div>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">½× IΔn (No Trip)</Label>
                        <MobileSelectPicker
                          value={formData.rcdHalfX || ''}
                          onValueChange={(v) => onUpdate('rcdHalfX', v)}
                          options={[
                            { value: 'pass', label: 'Pass', description: 'RCD did not trip at ½× IΔn' },
                            { value: 'fail', label: 'Fail', description: 'RCD tripped (too sensitive)' },
                          ]}
                          placeholder="Result"
                          title="½× IΔn Test Result"
                          triggerClassName="bg-elec-gray border-white/30"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* AFDD Testing */}
                {formData.protectionAfdd && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-purple-400 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                      AFDD Testing
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">Test Button</Label>
                        <MobileSelectPicker
                          value={formData.afddTestButton || ''}
                          onValueChange={(v) => onUpdate('afddTestButton', v)}
                          options={[
                            { value: 'pass', label: 'Pass', description: 'AFDD trips when test button pressed' },
                            { value: 'fail', label: 'Fail', description: 'AFDD did not trip' },
                          ]}
                          placeholder="Result"
                          title="AFDD Test Button Result"
                          triggerClassName="bg-elec-gray border-white/30"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* SPD Testing */}
                {formData.protectionSpd && (
                  <div className="space-y-4">
                    <h4 className="text-sm font-semibold text-purple-400 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-400"></div>
                      SPD Testing
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label className="text-sm">Indicator Status</Label>
                        <MobileSelectPicker
                          value={formData.spdIndicatorStatus || ''}
                          onValueChange={(v) => onUpdate('spdIndicatorStatus', v)}
                          options={[
                            { value: 'green', label: 'Green (OK)', description: 'SPD is functional' },
                            { value: 'red', label: 'Red (Replace)', description: 'SPD needs replacement' },
                            { value: 'na', label: 'N/A', description: 'No indicator present' },
                          ]}
                          placeholder="Status"
                          title="SPD Indicator Status"
                          triggerClassName="bg-elec-gray border-white/30"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Visual Inspection</Label>
                        <MobileSelectPicker
                          value={formData.spdVisualInspection || ''}
                          onValueChange={(v) => onUpdate('spdVisualInspection', v)}
                          options={[
                            { value: 'satisfactory', label: 'Satisfactory', description: 'No visible damage or issues' },
                            { value: 'unsatisfactory', label: 'Unsatisfactory', description: 'Damage or issues found' },
                          ]}
                          placeholder="Result"
                          title="SPD Visual Inspection"
                          triggerClassName="bg-elec-gray border-white/30"
                        />
                      </div>
                    </div>
                    {/* SPD Test Button Checkbox */}
                    <div className="flex items-center gap-3 p-4 min-h-[52px] rounded-lg bg-card/50">
                      <Checkbox
                        id="spdTestButton"
                        checked={formData.spdTestButton || false}
                        onCheckedChange={(c) => onUpdate('spdTestButton', c)}
                        className="h-6 w-6 border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 touch-manipulation"
                      />
                      <Label htmlFor="spdTestButton" className="text-base cursor-pointer">
                        SPD test button operates correctly
                      </Label>
                    </div>
                  </div>
                )}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Test Equipment */}
      <div className="eicr-section-card">
        <Collapsible open={openSections.equipment} onOpenChange={() => toggleSection('equipment')}>
          <CollapsibleTrigger className="w-full">
            <SectionHeader
              title="Test Equipment"
              icon={Wrench}
              isOpen={openSections.equipment}
              color="blue-500"
              completionPercentage={getCompletionPercentage('equipment')}
            />
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className="p-4 sm:p-5 md:p-6 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Test Instrument</Label>
                  <MobileSelectPicker
                    value={formData.testEquipmentModel || ''}
                    onValueChange={handleInstrumentSelect}
                    options={instrumentOptions}
                    placeholder="Select instrument"
                    title="Test Instrument"
                    triggerClassName="bg-elec-gray border-white/30"
                  />
                  {formData.testEquipmentModel && formData.testEquipmentSerial && (
                    <p className="text-xs text-green-400 flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      Serial number saved for next time
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Serial Number</Label>
                  <Input
                    value={formData.testEquipmentSerial || ''}
                    onChange={(e) => onUpdate('testEquipmentSerial', e.target.value)}
                    placeholder="Auto-fills if previously entered"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm">Calibration Date</Label>
                  <Input
                    type="date"
                    value={formData.testEquipmentCalDate || ''}
                    onChange={(e) => onUpdate('testEquipmentCalDate', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-blue-500 focus:ring-blue-500"
                  />
                  {formData.testEquipmentCalDate && (
                    (() => {
                      const calDate = new Date(formData.testEquipmentCalDate);
                      const today = new Date();
                      const monthsAgo = (today.getFullYear() - calDate.getFullYear()) * 12 +
                                       (today.getMonth() - calDate.getMonth());
                      if (monthsAgo > 12) {
                        return (
                          <div className="flex items-center gap-1 text-xs text-red-400">
                            <AlertCircle className="h-3 w-3" />
                            <span>Calibration may be expired (&gt;12 months)</span>
                          </div>
                        );
                      }
                      return (
                        <div className="flex items-center gap-1 text-xs text-green-400">
                          <CheckCircle className="h-3 w-3" />
                          <span>Within calibration period</span>
                        </div>
                      );
                    })()
                  )}
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Test Temperature</Label>
                  <Input
                    value={formData.testTemperature || '20°C'}
                    onChange={(e) => onUpdate('testTemperature', e.target.value)}
                    placeholder="e.g., 20°C"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default MWTestingTab;
