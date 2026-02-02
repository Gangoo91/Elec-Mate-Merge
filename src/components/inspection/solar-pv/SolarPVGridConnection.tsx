/**
 * Solar PV Grid Connection Tab
 * DNO notification, G98/G99, MPAN, and metering configuration
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
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  Zap,
  Building,
  Gauge,
  ChevronDown,
  ChevronUp,
  AlertTriangle,
  CheckCircle,
  Info,
  FileText,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { SolarPVFormData, UK_DNOS, PhaseType, MeterType } from '@/types/solar-pv';
import { useSolarPVSmartForm } from '@/hooks/inspection/useSolarPVSmartForm';

interface SolarPVGridConnectionProps {
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
      <div className={cn(
        'w-10 h-10 rounded-xl flex items-center justify-center',
        `bg-${color}/15`
      )}>
        <Icon className={cn('h-5 w-5', `text-${color}`)} />
      </div>
      <div className="text-left">
        <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
          {title}
          {badge && (
            <Badge variant="outline" className="text-[10px] px-1.5 py-0 bg-amber-500/10 text-amber-400 border-amber-500/30">
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

const SolarPVGridConnection: React.FC<SolarPVGridConnectionProps> = ({
  formData,
  onUpdate,
}) => {
  const [openSections, setOpenSections] = useState({
    dno: true,
    application: true,
    metering: true,
    export: true,
  });

  const smartForm = useSolarPVSmartForm(formData, onUpdate);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Update grid connection field
  const updateGridConnection = (field: string, value: any) => {
    onUpdate('gridConnection', {
      ...formData.gridConnection,
      [field]: value,
    });
  };

  // Update metering field
  const updateMetering = (field: string, value: any) => {
    onUpdate('metering', {
      ...formData.metering,
      [field]: value,
    });
  };

  // Suggest G98/G99 based on capacity
  const suggestedApplication = formData.totalCapacity
    ? smartForm.suggestG98OrG99(formData.totalCapacity, formData.gridConnection?.supplyPhases || 'single')
    : null;

  // Validate MPAN
  const mpanValidation = formData.gridConnection?.mpan
    ? smartForm.validateMPAN(formData.gridConnection.mpan)
    : null;

  return (
    <div className="space-y-4 px-4 sm:px-0">
      {/* DNO Details */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible open={openSections.dno} onOpenChange={() => toggleSection('dno')}>
          <SectionHeader
            title="DNO & Supply Details"
            icon={Building}
            isOpen={openSections.dno}
            color="blue-500"
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-4 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Distribution Network Operator (DNO) *
                  </Label>
                  <Select
                    value={formData.gridConnection?.dnoName || ''}
                    onValueChange={(value) => {
                      const dno = UK_DNOS.find(d => d.name === value);
                      updateGridConnection('dnoName', value);
                      if (dno) {
                        updateGridConnection('dnoRegion', dno.regions[0]);
                      }
                    }}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select DNO" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      {UK_DNOS.map((dno) => (
                        <SelectItem key={dno.name} value={dno.name}>
                          {dno.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    DNO Region
                  </Label>
                  <Select
                    value={formData.gridConnection?.dnoRegion || ''}
                    onValueChange={(value) => updateGridConnection('dnoRegion', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      {formData.gridConnection?.dnoName &&
                        UK_DNOS.find(d => d.name === formData.gridConnection.dnoName)?.regions.map((region) => (
                          <SelectItem key={region} value={region}>
                            {region}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground flex items-center gap-2">
                  MPAN (Meter Point Admin Number) *
                  {mpanValidation && !mpanValidation.valid && (
                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                  )}
                </Label>
                <Input
                  value={formData.gridConnection?.mpan || ''}
                  onChange={(e) => updateGridConnection('mpan', e.target.value.replace(/[^0-9\s-]/g, ''))}
                  placeholder="e.g., 00 000 000 00 000 or full 21 digits"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500 font-mono"
                />
                {mpanValidation && !mpanValidation.valid && (
                  <p className="text-xs text-orange-400">{mpanValidation.error}</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Found on the electricity bill. Can be 13 or 21 digits.
                </p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Supply Voltage (V)
                  </Label>
                  <Select
                    value={formData.gridConnection?.supplyVoltage?.toString() || '230'}
                    onValueChange={(value) => updateGridConnection('supplyVoltage', parseInt(value))}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="230">230V (Single Phase)</SelectItem>
                      <SelectItem value="400">400V (Three Phase)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Supply Phases
                  </Label>
                  <Select
                    value={formData.gridConnection?.supplyPhases || 'single'}
                    onValueChange={(value) => updateGridConnection('supplyPhases', value as PhaseType)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="single">Single Phase</SelectItem>
                      <SelectItem value="three">Three Phase</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Max Supply Fuse (A)
                  </Label>
                  <Select
                    value={formData.gridConnection?.maxSupplyFuse?.toString() || '100'}
                    onValueChange={(value) => updateGridConnection('maxSupplyFuse', parseInt(value))}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="60">60A</SelectItem>
                      <SelectItem value="80">80A</SelectItem>
                      <SelectItem value="100">100A</SelectItem>
                      <SelectItem value="125">125A</SelectItem>
                      <SelectItem value="200">200A</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Cut-out / Meter Location
                </Label>
                <Input
                  value={formData.gridConnection?.cutOutLocation || ''}
                  onChange={(e) => updateGridConnection('cutOutLocation', e.target.value)}
                  placeholder="e.g., Under stairs cupboard"
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* G98/G99 Application */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible open={openSections.application} onOpenChange={() => toggleSection('application')}>
          <SectionHeader
            title="DNO Notification (G98/G99)"
            icon={FileText}
            isOpen={openSections.application}
            color="purple-500"
            badge="Required"
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-4 border-t border-white/10">
              {/* Info Banner */}
              <div className="p-3 bg-purple-500/10 border border-purple-500/30 rounded-lg flex items-start gap-3">
                <Info className="h-5 w-5 text-purple-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm text-purple-200">
                    <strong>G98</strong>: Up to 16A per phase (&le;3.68kW single, &le;11.04kW three phase) - Notification only
                  </p>
                  <p className="text-sm text-purple-200 mt-1">
                    <strong>G99</strong>: Above 16A per phase - Application required, may take 45+ days
                  </p>
                </div>
              </div>

              {/* Suggestion banner */}
              {suggestedApplication && formData.totalCapacity > 0 && (
                <div className={cn(
                  'p-3 rounded-lg flex items-center gap-2',
                  suggestedApplication === 'G98'
                    ? 'bg-green-500/10 border border-green-500/30'
                    : 'bg-orange-500/10 border border-orange-500/30'
                )}>
                  <CheckCircle className={cn(
                    'h-4 w-4',
                    suggestedApplication === 'G98' ? 'text-green-400' : 'text-orange-400'
                  )} />
                  <span className={cn(
                    'text-sm font-medium',
                    suggestedApplication === 'G98' ? 'text-green-300' : 'text-orange-300'
                  )}>
                    Based on {formData.totalCapacity.toFixed(2)}kWp capacity: {suggestedApplication} recommended
                  </span>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Application Type *
                  </Label>
                  <Select
                    value={formData.gridConnection?.applicationType || ''}
                    onValueChange={(value) => updateGridConnection('applicationType', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="G98">G98 (&le;16A/phase - Notification)</SelectItem>
                      <SelectItem value="G99">G99 (&gt;16A/phase - Application)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Application Reference
                  </Label>
                  <Input
                    value={formData.gridConnection?.applicationReference || ''}
                    onChange={(e) => updateGridConnection('applicationReference', e.target.value)}
                    placeholder="DNO reference number"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Application Date
                  </Label>
                  <Input
                    type="date"
                    value={formData.gridConnection?.applicationDate || ''}
                    onChange={(e) => updateGridConnection('applicationDate', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Approval Status
                  </Label>
                  <Select
                    value={formData.gridConnection?.approvalStatus || ''}
                    onValueChange={(value) => updateGridConnection('approvalStatus', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="not-required">Not Required (G98)</SelectItem>
                      <SelectItem value="pending">Pending Approval</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {formData.gridConnection?.approvalStatus === 'approved' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Approval Date
                    </Label>
                    <Input
                      type="date"
                      value={formData.gridConnection?.approvalDate || ''}
                      onChange={(e) => updateGridConnection('approvalDate', e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Approval Reference
                    </Label>
                    <Input
                      value={formData.gridConnection?.approvalReference || ''}
                      onChange={(e) => updateGridConnection('approvalReference', e.target.value)}
                      placeholder="DNO approval reference"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Export Limiting */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible open={openSections.export} onOpenChange={() => toggleSection('export')}>
          <SectionHeader
            title="Export Limiting"
            icon={Zap}
            isOpen={openSections.export}
            color="orange-500"
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-4 border-t border-white/10">
              <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg min-h-[48px]">
                <Checkbox
                  id="exportLimited"
                  checked={formData.gridConnection?.exportLimited || false}
                  onCheckedChange={(checked) => updateGridConnection('exportLimited', checked)}
                  className="h-5 w-5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                />
                <Label
                  htmlFor="exportLimited"
                  className="text-sm text-foreground cursor-pointer"
                >
                  Export limiting is required/applied
                </Label>
              </div>

              {formData.gridConnection?.exportLimited && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Export Limit (kW)
                    </Label>
                    <Input
                      type="number"
                      step="0.1"
                      value={formData.gridConnection?.exportLimitKw || ''}
                      onChange={(e) => updateGridConnection('exportLimitKw', parseFloat(e.target.value) || 0)}
                      placeholder="e.g., 3.68"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium text-foreground">
                      Limiting Method
                    </Label>
                    <Input
                      value={formData.gridConnection?.exportLimitingMethod || ''}
                      onChange={(e) => updateGridConnection('exportLimitingMethod', e.target.value)}
                      placeholder="e.g., Inverter setting, Export limiter device"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>

      {/* Metering */}
      <Card className="bg-card/50 border border-white/10 rounded-xl overflow-hidden">
        <Collapsible open={openSections.metering} onOpenChange={() => toggleSection('metering')}>
          <SectionHeader
            title="Metering"
            icon={Gauge}
            isOpen={openSections.metering}
            color="green-500"
          />
          <CollapsibleContent>
            <div className="p-4 sm:p-5 space-y-4 border-t border-white/10">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Meter Type
                  </Label>
                  <Select
                    value={formData.metering?.meterType || 'smart'}
                    onValueChange={(value) => updateMetering('meterType', value as MeterType)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-elec-gray focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-elec-gray border-elec-gray text-foreground">
                      <SelectItem value="smart">Smart Meter (SMETS2)</SelectItem>
                      <SelectItem value="export">Dedicated Export Meter</SelectItem>
                      <SelectItem value="generation">Generation Meter</SelectItem>
                      <SelectItem value="none">No Additional Meter</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-foreground">
                    Meter Serial Number
                  </Label>
                  <Input
                    value={formData.metering?.meterSerial || ''}
                    onChange={(e) => updateMetering('meterSerial', e.target.value)}
                    placeholder="If applicable"
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg min-h-[48px]">
                  <Checkbox
                    id="segRegistered"
                    checked={formData.metering?.segRegistered || false}
                    onCheckedChange={(checked) => updateMetering('segRegistered', checked)}
                    className="h-5 w-5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <div>
                    <Label
                      htmlFor="segRegistered"
                      className="text-sm text-foreground cursor-pointer"
                    >
                      Smart Export Guarantee (SEG) registered
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Customer is signed up to receive payment for exported electricity
                    </p>
                  </div>
                </div>

                {formData.metering?.segRegistered && (
                  <div className="space-y-2 ml-10">
                    <Label className="text-sm font-medium text-foreground">
                      SEG Supplier
                    </Label>
                    <Input
                      value={formData.metering?.segSupplier || ''}
                      onChange={(e) => updateMetering('segSupplier', e.target.value)}
                      placeholder="e.g., Octopus Energy, EDF"
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium text-foreground">
                  Metering Notes
                </Label>
                <Textarea
                  value={formData.metering?.notes || ''}
                  onChange={(e) => updateMetering('notes', e.target.value)}
                  placeholder="Any additional metering details..."
                  className="min-h-[80px] touch-manipulation text-base border-white/30 focus:border-yellow-500"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
};

export default SolarPVGridConnection;
