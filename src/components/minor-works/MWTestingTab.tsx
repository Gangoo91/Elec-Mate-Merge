import React, { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import SectionHeader from '@/components/ui/section-header';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Power, Zap, Shield, Wrench, AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MWTestingTabProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const MWTestingTab: React.FC<MWTestingTabProps> = ({ formData, onUpdate }) => {
  const [openSections, setOpenSections] = useState({
    dead: true,
    live: true,
    protection: true,
    equipment: true
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

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

  return (
    <div className="space-y-4 sm:space-y-6">
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
                    <Select value={formData.polarity || ''} onValueChange={(v) => onUpdate('polarity', v)}>
                      <SelectTrigger className={cn("h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-orange-500 focus:ring-orange-500", !formData.polarity && "border-red-500/50")}>
                        <SelectValue placeholder="Select" />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                        <SelectItem value="correct">Correct</SelectItem>
                        <SelectItem value="incorrect">Incorrect</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Insulation Resistance */}
              <div className="space-y-4">
                <h4 className="text-sm font-semibold text-orange-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-400"></div>
                  Insulation Resistance
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Test Voltage</Label>
                    <Select value={formData.insulationTestVoltage || '500V'} onValueChange={(v) => onUpdate('insulationTestVoltage', v)}>
                      <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-orange-500 focus:ring-orange-500">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                        <SelectItem value="250V">250V</SelectItem>
                        <SelectItem value="500V">500V</SelectItem>
                        <SelectItem value="1000V">1000V</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm">Live-Live (MΩ)</Label>
                    <Input
                      value={formData.insulationLiveLive || ''}
                      onChange={(e) => onUpdate('insulationLiveLive', e.target.value)}
                      placeholder="≥1MΩ"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Live-Neutral (MΩ)</Label>
                    <Input
                      value={formData.insulationLiveNeutral || ''}
                      onChange={(e) => onUpdate('insulationLiveNeutral', e.target.value)}
                      placeholder="≥1MΩ"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Live-Earth (MΩ)</Label>
                    <Input
                      value={formData.insulationLiveEarth || ''}
                      onChange={(e) => onUpdate('insulationLiveEarth', e.target.value)}
                      placeholder="≥1MΩ"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-sm">Neutral-Earth (MΩ)</Label>
                    <Input
                      value={formData.insulationNeutralEarth || ''}
                      onChange={(e) => onUpdate('insulationNeutralEarth', e.target.value)}
                      placeholder="≥1MΩ"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-orange-500 focus:ring-orange-500"
                    />
                  </div>
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
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50 text-sm"></span>
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
                  <Select value={formData.functionalTesting || ''} onValueChange={(v) => onUpdate('functionalTesting', v)}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select result" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="pass">Pass</SelectItem>
                      <SelectItem value="fail">Fail</SelectItem>
                      <SelectItem value="na">N/A</SelectItem>
                    </SelectContent>
                  </Select>
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
                        <Select value={formData.rcdRating || ''} onValueChange={(v) => onUpdate('rcdRating', v)}>
                          <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-purple-500 focus:ring-purple-500">
                            <SelectValue placeholder="Select" />
                          </SelectTrigger>
                          <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                            <SelectItem value="30">30mA</SelectItem>
                            <SelectItem value="100">100mA</SelectItem>
                            <SelectItem value="300">300mA</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">1x In (ms)</Label>
                        <Input
                          value={formData.rcdOneX || ''}
                          onChange={(e) => onUpdate('rcdOneX', e.target.value)}
                          placeholder="&lt;300ms"
                          className="h-11 text-base touch-manipulation border-white/30 focus:border-purple-500 focus:ring-purple-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Test Button</Label>
                        <Select value={formData.rcdTestButton || ''} onValueChange={(v) => onUpdate('rcdTestButton', v)}>
                          <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-purple-500 focus:ring-purple-500">
                            <SelectValue placeholder="Result" />
                          </SelectTrigger>
                          <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                            <SelectItem value="pass">Pass</SelectItem>
                            <SelectItem value="fail">Fail</SelectItem>
                          </SelectContent>
                        </Select>
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
                        <Select value={formData.afddTestButton || ''} onValueChange={(v) => onUpdate('afddTestButton', v)}>
                          <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-purple-500 focus:ring-purple-500">
                            <SelectValue placeholder="Result" />
                          </SelectTrigger>
                          <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                            <SelectItem value="pass">Pass</SelectItem>
                            <SelectItem value="fail">Fail</SelectItem>
                          </SelectContent>
                        </Select>
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
                        <Select value={formData.spdIndicatorStatus || ''} onValueChange={(v) => onUpdate('spdIndicatorStatus', v)}>
                          <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-purple-500 focus:ring-purple-500">
                            <SelectValue placeholder="Status" />
                          </SelectTrigger>
                          <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                            <SelectItem value="green">Green (OK)</SelectItem>
                            <SelectItem value="red">Red (Replace)</SelectItem>
                            <SelectItem value="na">N/A</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Visual Inspection</Label>
                        <Select value={formData.spdVisualInspection || ''} onValueChange={(v) => onUpdate('spdVisualInspection', v)}>
                          <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-purple-500 focus:ring-purple-500">
                            <SelectValue placeholder="Result" />
                          </SelectTrigger>
                          <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                            <SelectItem value="satisfactory">Satisfactory</SelectItem>
                            <SelectItem value="unsatisfactory">Unsatisfactory</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
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
                  <Select value={formData.testEquipmentModel || ''} onValueChange={(v) => onUpdate('testEquipmentModel', v)}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select instrument" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground max-h-[300px]">
                      <SelectItem value="Fluke 1664 FC">Fluke 1664 FC</SelectItem>
                      <SelectItem value="Fluke 1663">Fluke 1663</SelectItem>
                      <SelectItem value="Megger MFT1741">Megger MFT1741</SelectItem>
                      <SelectItem value="Megger MFT1730">Megger MFT1730</SelectItem>
                      <SelectItem value="Kewtech KT65DL">Kewtech KT65DL</SelectItem>
                      <SelectItem value="Kewtech KT64DL">Kewtech KT64DL</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Serial Number</Label>
                  <Input
                    value={formData.testEquipmentSerial || ''}
                    onChange={(e) => onUpdate('testEquipmentSerial', e.target.value)}
                    placeholder="Instrument serial"
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
                </div>
                <div className="space-y-2">
                  <Label className="text-sm">Test Temperature</Label>
                  <Input
                    value={formData.testTemperature || '20C'}
                    onChange={(e) => onUpdate('testTemperature', e.target.value)}
                    placeholder="e.g., 20C"
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
