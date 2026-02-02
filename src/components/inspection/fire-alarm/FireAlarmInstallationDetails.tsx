import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, User, Building2, Settings, Zap, Lightbulb, Sparkles, Shield, FileText, Radio, Scan, X, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { FireAlarmSystemCategory } from '@/types/fire-alarm';
import { useIsMobile } from '@/hooks/use-mobile';
import { ExistingClientSelect, ClientFormData } from './ExistingClientSelect';
import { FireAlarmPanelAutocomplete, PanelInfoDisplay } from './FireAlarmPanelAutocomplete';
import { useFireAlarmSmartForm, CategorySuggestion } from '@/hooks/inspection/useFireAlarmSmartForm';
import { FireAlarmPanel } from '@/data/fireAlarmEquipmentDatabase';
import { SerialNumberScannerSheet } from './SerialNumberScannerSheet';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface FireAlarmInstallationDetailsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const systemCategories: { value: FireAlarmSystemCategory; label: string; description: string }[] = [
  { value: 'L1', label: 'L1 - Full Coverage', description: 'Protection throughout the building' },
  { value: 'L2', label: 'L2 - Enhanced Coverage', description: 'Protection in escape routes + high-risk areas' },
  { value: 'L3', label: 'L3 - Standard Coverage', description: 'Protection of escape routes only' },
  { value: 'L4', label: 'L4 - Escape Route Only', description: 'Within escape routes only' },
  { value: 'L5', label: 'L5 - Engineered System', description: 'As risk assessment dictates' },
  { value: 'M', label: 'M - Manual', description: 'Manual call points only' },
  { value: 'P1', label: 'P1 - Property Full', description: 'Full property protection' },
  { value: 'P2', label: 'P2 - Property Partial', description: 'Partial property protection' },
];

const FireAlarmInstallationDetails: React.FC<FireAlarmInstallationDetailsProps> = ({
  formData,
  onUpdate,
}) => {
  const isMobile = useIsMobile();
  const { suggestCategoryForPremises } = useFireAlarmSmartForm();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    metadata: true,
    client: true,
    premises: true,
    system: true,
    power: true,
    certification: false,
    fra: false,
    monitoring: false,
  });
  const [sameAsClientAddress, setSameAsClientAddress] = useState(false);
  const [categorySuggestion, setCategorySuggestion] = useState<CategorySuggestion | null>(null);
  const [selectedPanelId, setSelectedPanelId] = useState<string | null>(formData.selectedPanelId || null);
  const [panelAutoFilled, setPanelAutoFilled] = useState(false);
  const [serialScannerOpen, setSerialScannerOpen] = useState(false);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Handle existing client selection
  const handleClientSelect = (client: ClientFormData | null) => {
    if (!client) return;

    // Update all client-related fields
    onUpdate('clientName', client.clientName);
    onUpdate('clientAddress', client.clientAddress);
    onUpdate('clientTelephone', client.clientTelephone);
    onUpdate('clientEmail', client.clientEmail);
    onUpdate('premisesName', client.premisesName);
    onUpdate('premisesAddress', client.premisesAddress);
    onUpdate('premisesType', client.premisesType);
    onUpdate('floorsCount', client.floorsCount);
  };

  // Handle "Same as client address" checkbox
  const handleSameAsClientAddress = (checked: boolean) => {
    setSameAsClientAddress(checked);
    if (checked && formData.clientAddress) {
      onUpdate('premisesAddress', formData.clientAddress);
    }
  };

  // Update category suggestion when premises type changes
  useEffect(() => {
    if (formData.premisesType) {
      const suggestion = suggestCategoryForPremises(formData.premisesType);
      setCategorySuggestion(suggestion);
    } else {
      setCategorySuggestion(null);
    }
  }, [formData.premisesType, suggestCategoryForPremises]);

  // Apply suggested category
  const applySuggestedCategory = () => {
    if (categorySuggestion) {
      onUpdate('systemCategory', categorySuggestion.recommended);
    }
  };

  // Handle serial number extraction from AI scanner
  const handleSerialExtracted = (serialNumber: string, photoBase64: string) => {
    onUpdate('panelSerialNumber', serialNumber);
    onUpdate('panelSerialPhoto', photoBase64);
  };

  // Clear serial photo and number
  const clearSerialPhoto = () => {
    onUpdate('panelSerialPhoto', '');
  };

  // Handle panel selection with auto-fill
  const handlePanelSelect = (
    panel: FireAlarmPanel | null,
    defaults: { networkType: string; zonesCount: number; loopCapacity: number; protocol: string } | null
  ) => {
    if (panel) {
      // Store the selected panel ID
      setSelectedPanelId(panel.id);
      onUpdate('selectedPanelId', panel.id);

      // Auto-fill panel make and model
      onUpdate('systemMake', panel.manufacturer);
      onUpdate('systemModel', panel.model);

      // Apply defaults if available
      if (defaults) {
        onUpdate('networkType', defaults.networkType);
        if (defaults.zonesCount) onUpdate('zonesCount', defaults.zonesCount);
        setPanelAutoFilled(true);
      }
    } else {
      setSelectedPanelId(null);
      onUpdate('selectedPanelId', null);
      setPanelAutoFilled(false);
    }
  };

  return (
    <div className={cn(isMobile ? "space-y-0" : "space-y-6")}>
      {/* Certificate Metadata */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.metadata} onOpenChange={() => toggleSection('metadata')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20">
                <div className="h-10 w-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-red-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Certificate Details</h3>
                  <span className="text-xs text-muted-foreground">Type, number & date</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.metadata && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-red-400" />
                  </div>
                  <span className="text-white font-semibold">Certificate Details</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.metadata && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              {/* Certificate Type - Segmented Control Style */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Certificate Type *</Label>
                <RadioGroup
                  value={formData.certificateType || 'installation'}
                  onValueChange={(value) => onUpdate('certificateType', value)}
                  className="grid grid-cols-3 gap-1 bg-black/40 p-1 rounded-lg border border-white/10"
                >
                  {[
                    { value: 'installation', label: 'Installation' },
                    { value: 'commissioning', label: 'Commissioning' },
                    { value: 'periodic', label: 'Periodic Test' },
                  ].map((option) => (
                    <div key={option.value} className="relative">
                      <RadioGroupItem
                        value={option.value}
                        id={`cert-${option.value}`}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={`cert-${option.value}`}
                        className={cn(
                          "flex items-center justify-center h-11 px-2 text-sm font-medium text-center rounded-md cursor-pointer touch-manipulation transition-all",
                          "peer-data-[state=unchecked]:bg-transparent peer-data-[state=unchecked]:text-gray-400 peer-data-[state=unchecked]:hover:text-white/70",
                          "peer-data-[state=checked]:bg-red-500 peer-data-[state=checked]:text-white peer-data-[state=checked]:shadow-sm"
                        )}
                      >
                        {option.label}
                      </Label>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="certificateNumber">Certificate Number *</Label>
                  <Input
                    id="certificateNumber"
                    placeholder="e.g., FA-2024-001"
                    value={formData.certificateNumber || ''}
                    onChange={(e) => onUpdate('certificateNumber', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="inspectionDate">Inspection Date *</Label>
                  <Input
                    id="inspectionDate"
                    type="date"
                    value={formData.inspectionDate || new Date().toISOString().split('T')[0]}
                    onChange={(e) => onUpdate('inspectionDate', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-red-500 focus:ring-red-500"
                  />
                </div>
              </div>

              {/* Previous Certificate Reference - Only for periodic */}
              {formData.certificateType === 'periodic' && (
                <div className="space-y-2">
                  <Label htmlFor="previousCertificateRef">Previous Certificate Reference</Label>
                  <Input
                    id="previousCertificateRef"
                    placeholder="e.g., FA-2023-001"
                    value={formData.previousCertificateRef || ''}
                    onChange={(e) => onUpdate('previousCertificateRef', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-red-500 focus:ring-red-500"
                  />
                  <p className="text-xs text-muted-foreground">Reference to the previous certificate for this installation</p>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Client Details */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.client} onOpenChange={() => toggleSection('client')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20">
                <div className="h-10 w-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-elec-yellow" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Client Details</h3>
                  <span className="text-xs text-muted-foreground">Name, contact & address</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.client && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-elec-yellow/15 flex items-center justify-center">
                    <User className="h-4 w-4 text-elec-yellow" />
                  </div>
                  <span className="text-white font-semibold">Client Details</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.client && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              {/* Load Previous Client */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-elec-yellow" />
                  Load Previous Client
                </Label>
                <ExistingClientSelect
                  onClientSelect={handleClientSelect}
                  placeholder="Select a previous client to auto-fill..."
                />
                <p className="text-xs text-muted-foreground">
                  Auto-fill from a previous fire alarm certificate
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="clientName">Client Name *</Label>
                  <Input
                    id="clientName"
                    placeholder="Enter client name"
                    value={formData.clientName || ''}
                    onChange={(e) => onUpdate('clientName', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="clientTelephone">Telephone</Label>
                  <Input
                    id="clientTelephone"
                    type="tel"
                    placeholder="Contact number"
                    value={formData.clientTelephone || ''}
                    onChange={(e) => onUpdate('clientTelephone', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientAddress">Client Address</Label>
                <Textarea
                  id="clientAddress"
                  placeholder="Full address"
                  value={formData.clientAddress || ''}
                  onChange={(e) => onUpdate('clientAddress', e.target.value)}
                  className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="clientEmail">Email</Label>
                <Input
                  id="clientEmail"
                  type="email"
                  placeholder="Email address"
                  value={formData.clientEmail || ''}
                  onChange={(e) => onUpdate('clientEmail', e.target.value)}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Premises Details */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.premises} onOpenChange={() => toggleSection('premises')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                  <Building2 className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Premises Details</h3>
                  <span className="text-xs text-muted-foreground">Location & building type</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.premises && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-white font-semibold">Premises Details</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.premises && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              <div className="space-y-2">
                <Label htmlFor="premisesName">Premises Name</Label>
                <Input
                  id="premisesName"
                  placeholder="Building or site name"
                  value={formData.premisesName || ''}
                  onChange={(e) => onUpdate('premisesName', e.target.value)}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="premisesAddress">Premises Address *</Label>
                  <div className="flex items-center gap-2">
                    <Checkbox
                      id="sameAsClient"
                      checked={sameAsClientAddress}
                      onCheckedChange={handleSameAsClientAddress}
                      className="border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                    />
                    <Label htmlFor="sameAsClient" className="text-xs text-muted-foreground cursor-pointer">
                      Same as client address
                    </Label>
                  </div>
                </div>
                <Textarea
                  id="premisesAddress"
                  placeholder="Full installation address"
                  value={formData.premisesAddress || ''}
                  onChange={(e) => {
                    onUpdate('premisesAddress', e.target.value);
                    if (sameAsClientAddress && e.target.value !== formData.clientAddress) {
                      setSameAsClientAddress(false);
                    }
                  }}
                  className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="premisesType">Premises Type</Label>
                  <Select
                    value={formData.premisesType || ''}
                    onValueChange={(value) => onUpdate('premisesType', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                      <SelectItem value="hospitality">Hospitality</SelectItem>
                      <SelectItem value="care-home">Care Home</SelectItem>
                      <SelectItem value="hmo">HMO</SelectItem>
                      <SelectItem value="mixed-use">Mixed Use</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupancyType">Occupancy Type</Label>
                  <Select
                    value={formData.occupancyType || ''}
                    onValueChange={(value) => onUpdate('occupancyType', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select occupancy" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="sleeping">Sleeping Risk</SelectItem>
                      <SelectItem value="day-use">Day Use Only</SelectItem>
                      <SelectItem value="24hr">24 Hour Occupation</SelectItem>
                      <SelectItem value="shift">Shift Pattern</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="floorsCount">Number of Floors</Label>
                <Input
                  id="floorsCount"
                  type="number"
                  min="1"
                  value={formData.floorsCount || 1}
                  onChange={(e) => onUpdate('floorsCount', parseInt(e.target.value) || 1)}
                  className="h-11 text-base touch-manipulation w-32 border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                />
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* System Classification */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.system} onOpenChange={() => toggleSection('system')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                  <Settings className="h-5 w-5 text-red-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">System Classification</h3>
                  <span className="text-xs text-muted-foreground">BS 5839 category & panel</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.system && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center">
                    <Settings className="h-4 w-4 text-red-400" />
                  </div>
                  <span className="text-white font-semibold">System Classification</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.system && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              <div className="space-y-2">
                <Label htmlFor="systemCategory">System Category *</Label>
                <Select
                  value={formData.systemCategory || ''}
                  onValueChange={(value) => onUpdate('systemCategory', value)}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-background border-border text-foreground">
                    {systemCategories.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        <div className="flex flex-col">
                          <span className="font-medium">{cat.label}</span>
                          <span className="text-xs text-muted-foreground">{cat.description}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {/* Category Suggestion */}
                {categorySuggestion && !formData.systemCategory && (
                  <div className="flex items-start gap-3 p-3 bg-elec-yellow/10 border border-elec-yellow/30 rounded-lg">
                    <Lightbulb className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground">
                        Suggested: <span className="text-elec-yellow">{categorySuggestion.recommended}</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {categorySuggestion.reason}
                      </p>
                      <button
                        type="button"
                        onClick={applySuggestedCategory}
                        className="mt-2 text-xs font-medium text-elec-yellow hover:underline touch-manipulation"
                      >
                        Apply suggestion
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="networkType">Network Type</Label>
                  <Select
                    value={formData.networkType || 'conventional'}
                    onValueChange={(value) => onUpdate('networkType', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="standalone">Standalone</SelectItem>
                      <SelectItem value="conventional">Conventional</SelectItem>
                      <SelectItem value="addressable">Addressable</SelectItem>
                      <SelectItem value="analogue">Analogue Addressable</SelectItem>
                      <SelectItem value="networked">Networked</SelectItem>
                      <SelectItem value="wireless">Wireless</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zonesCount">Number of Zones</Label>
                  <Input
                    id="zonesCount"
                    type="number"
                    min="1"
                    value={formData.zonesCount || 1}
                    onChange={(e) => onUpdate('zonesCount', parseInt(e.target.value) || 1)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>

              {/* Repeaters Installed Toggle */}
              <div
                className={cn(
                  "flex items-center gap-3 h-12 px-4 rounded-lg cursor-pointer transition-colors",
                  formData.repeatersInstalled
                    ? "bg-red-500/10 border border-red-500/30"
                    : "bg-black/30 border border-white/10 hover:border-white/20"
                )}
                onClick={() => onUpdate('repeatersInstalled', !formData.repeatersInstalled)}
              >
                <Checkbox
                  id="repeatersInstalled"
                  checked={formData.repeatersInstalled || false}
                  onCheckedChange={(checked) => onUpdate('repeatersInstalled', checked as boolean)}
                  className="border-white/40 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 data-[state=checked]:text-white h-5 w-5 shrink-0"
                />
                <Label htmlFor="repeatersInstalled" className="cursor-pointer text-sm font-medium text-foreground">
                  Repeaters/Translators installed
                </Label>
              </div>

              {/* Panel Selection with Auto-fill */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Sparkles className="h-3.5 w-3.5 text-elec-yellow" />
                  Control Panel (Auto-fill)
                </Label>
                <FireAlarmPanelAutocomplete
                  value={selectedPanelId || undefined}
                  onValueChange={(id) => setSelectedPanelId(id)}
                  onPanelSelect={handlePanelSelect}
                  placeholder="Search panels by make/model..."
                  showAutoFillBadge={panelAutoFilled}
                />
                <p className="text-xs text-muted-foreground">
                  Select a panel to auto-fill network type and specifications
                </p>

                {/* Show panel info if selected */}
                {selectedPanelId && (
                  <PanelInfoDisplay panelId={selectedPanelId} className="mt-2" />
                )}
              </div>

              {/* Manual override fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systemMake">Control Panel Make *</Label>
                  <Input
                    id="systemMake"
                    placeholder="e.g., Morley, Gent, Hochiki"
                    value={formData.systemMake || ''}
                    onChange={(e) => onUpdate('systemMake', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="systemModel">Control Panel Model</Label>
                  <Input
                    id="systemModel"
                    placeholder="Model number"
                    value={formData.systemModel || ''}
                    onChange={(e) => onUpdate('systemModel', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="panelLocation">Panel Location *</Label>
                  <Input
                    id="panelLocation"
                    placeholder="e.g., Main reception, Ground floor lobby"
                    value={formData.panelLocation || ''}
                    onChange={(e) => onUpdate('panelLocation', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="panelSerialNumber">Panel Serial Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="panelSerialNumber"
                      placeholder="Serial number"
                      value={formData.panelSerialNumber || ''}
                      onChange={(e) => onUpdate('panelSerialNumber', e.target.value)}
                      className={cn(
                        "h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow flex-1",
                        formData.panelSerialPhoto && "border-green-500/50 bg-green-500/5"
                      )}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setSerialScannerOpen(true)}
                      className="h-11 px-3 shrink-0 border-white/30 hover:border-elec-yellow hover:bg-elec-yellow/10 gap-2"
                      title="Scan serial number with camera"
                    >
                      <Scan className="h-4 w-4" />
                      <span className="hidden sm:inline text-sm">Scan</span>
                    </Button>
                  </div>
                  {/* AI Scanned indicator */}
                  {formData.panelSerialPhoto && (
                    <div className="flex items-center gap-2 mt-2 p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-400" />
                      </div>
                      <span className="text-xs text-green-400 font-medium">AI scanned from photo</span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={clearSerialPhoto}
                        className="ml-auto h-6 w-6 text-white/40 hover:text-white hover:bg-white/10"
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Serial Number Scanner Sheet */}
      <SerialNumberScannerSheet
        open={serialScannerOpen}
        onOpenChange={setSerialScannerOpen}
        onSerialExtracted={handleSerialExtracted}
      />

      {/* Power Supply */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.power} onOpenChange={() => toggleSection('power')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Zap className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Power Supply</h3>
                  <span className="text-xs text-muted-foreground">Battery backup & type</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.power && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-elec-yellow/15 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-elec-yellow" />
                  </div>
                  <span className="text-white font-semibold">Power Supply</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.power && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              {/* Mains Power Supply Toggle */}
              <div
                className={cn(
                  "flex items-center gap-3 h-12 px-4 rounded-lg cursor-pointer transition-colors",
                  formData.mainsPowerSupply !== false
                    ? "bg-blue-500/10 border border-blue-500/30"
                    : "bg-black/30 border border-white/10 hover:border-white/20"
                )}
                onClick={() => onUpdate('mainsPowerSupply', formData.mainsPowerSupply === false ? true : false)}
              >
                <Checkbox
                  id="mainsPowerSupply"
                  checked={formData.mainsPowerSupply !== false}
                  onCheckedChange={(checked) => onUpdate('mainsPowerSupply', checked as boolean)}
                  className="border-white/40 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:text-white h-5 w-5 shrink-0"
                />
                <Label htmlFor="mainsPowerSupply" className="cursor-pointer text-sm font-medium text-foreground">
                  Mains power supply connected
                </Label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="batteryBackupHours">Battery Backup Duration (hours)</Label>
                  <Input
                    id="batteryBackupHours"
                    type="number"
                    min="0"
                    value={formData.batteryBackupHours || 24}
                    onChange={(e) => onUpdate('batteryBackupHours', parseInt(e.target.value) || 24)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                  <p className="text-xs text-muted-foreground">BS 5839 requires min 24 hours standby</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="batteryType">Battery Type</Label>
                  <Select
                    value={formData.batteryType || ''}
                    onValueChange={(value) => onUpdate('batteryType', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="sealed-lead-acid">Sealed Lead Acid</SelectItem>
                      <SelectItem value="nickel-cadmium">Nickel Cadmium</SelectItem>
                      <SelectItem value="lithium">Lithium</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Third-Party Certification */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.certification} onOpenChange={() => toggleSection('certification')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                  <Shield className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Third-Party Certification</h3>
                  <span className="text-xs text-muted-foreground">BAFE, FIA, NSI/SSAIB</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.certification && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-white font-semibold">Third-Party Certification</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.certification && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              <p className="text-xs text-muted-foreground">
                Optional: Enter your third-party certification details if applicable.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bafeRegistration">BAFE SP203-1 Registration</Label>
                  <Input
                    id="bafeRegistration"
                    placeholder="e.g., SP203-1/12345"
                    value={formData.thirdPartyCertification?.bafeRegistration || ''}
                    onChange={(e) => onUpdate('thirdPartyCertification', {
                      ...formData.thirdPartyCertification,
                      bafeRegistration: e.target.value
                    })}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fiaMembership">FIA Membership Number</Label>
                  <Input
                    id="fiaMembership"
                    placeholder="e.g., FIA12345"
                    value={formData.thirdPartyCertification?.fiaMembership || ''}
                    onChange={(e) => onUpdate('thirdPartyCertification', {
                      ...formData.thirdPartyCertification,
                      fiaMembership: e.target.value
                    })}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nsiSsaibCertification">NSI/SSAIB Certification</Label>
                  <Input
                    id="nsiSsaibCertification"
                    placeholder="e.g., NSI Gold, SSAIB"
                    value={formData.thirdPartyCertification?.nsiSsaibCertification || ''}
                    onChange={(e) => onUpdate('thirdPartyCertification', {
                      ...formData.thirdPartyCertification,
                      nsiSsaibCertification: e.target.value
                    })}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otherAccreditation">Other Accreditation</Label>
                  <Input
                    id="otherAccreditation"
                    placeholder="Any other relevant accreditation"
                    value={formData.thirdPartyCertification?.otherAccreditation || ''}
                    onChange={(e) => onUpdate('thirdPartyCertification', {
                      ...formData.thirdPartyCertification,
                      otherAccreditation: e.target.value
                    })}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Fire Risk Assessment Reference */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.fra} onOpenChange={() => toggleSection('fra')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-orange-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Fire Risk Assessment</h3>
                  <span className="text-xs text-muted-foreground">FRA reference details</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.fra && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-orange-400" />
                  </div>
                  <span className="text-white font-semibold">Fire Risk Assessment Reference</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.fra && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              <p className="text-xs text-muted-foreground">
                Reference the Fire Risk Assessment that informed the system design.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fraReference">FRA Reference Number</Label>
                  <Input
                    id="fraReference"
                    placeholder="e.g., FRA-2024-001"
                    value={formData.fireRiskAssessment?.fraReference || ''}
                    onChange={(e) => onUpdate('fireRiskAssessment', {
                      ...formData.fireRiskAssessment,
                      fraReference: e.target.value
                    })}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fraDate">FRA Date</Label>
                  <Input
                    id="fraDate"
                    type="date"
                    value={formData.fireRiskAssessment?.fraDate || ''}
                    onChange={(e) => onUpdate('fireRiskAssessment', {
                      ...formData.fireRiskAssessment,
                      fraDate: e.target.value
                    })}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fraAuthor">FRA Author</Label>
                  <Input
                    id="fraAuthor"
                    placeholder="Name of risk assessor"
                    value={formData.fireRiskAssessment?.fraAuthor || ''}
                    onChange={(e) => onUpdate('fireRiskAssessment', {
                      ...formData.fireRiskAssessment,
                      fraAuthor: e.target.value
                    })}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fraCompany">FRA Company</Label>
                  <Input
                    id="fraCompany"
                    placeholder="Risk assessment company"
                    value={formData.fireRiskAssessment?.fraCompany || ''}
                    onChange={(e) => onUpdate('fireRiskAssessment', {
                      ...formData.fireRiskAssessment,
                      fraCompany: e.target.value
                    })}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Monitoring/ARC Details */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.monitoring} onOpenChange={() => toggleSection('monitoring')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                  <Radio className="h-5 w-5 text-cyan-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Monitoring & ARC</h3>
                  <span className="text-xs text-muted-foreground">Alarm Receiving Centre</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.monitoring && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/15 flex items-center justify-center">
                    <Radio className="h-4 w-4 text-cyan-400" />
                  </div>
                  <span className="text-white font-semibold">Monitoring & ARC Details</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.monitoring && "rotate-180")} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn(
              "space-y-4",
              isMobile ? "px-4 py-4" : "px-4 pb-4"
            )}>
              {/* Is Monitored Checkbox */}
              <div
                className={cn(
                  "flex items-center gap-3 h-12 px-4 rounded-lg cursor-pointer transition-colors",
                  formData.monitoringDetails?.isMonitored
                    ? "bg-cyan-500/10 border border-cyan-500/30"
                    : "bg-black/30 border border-white/10 hover:border-white/20"
                )}
                onClick={() => onUpdate('monitoringDetails', {
                  ...formData.monitoringDetails,
                  isMonitored: !formData.monitoringDetails?.isMonitored
                })}
              >
                <Checkbox
                  id="isMonitored"
                  checked={formData.monitoringDetails?.isMonitored || false}
                  onCheckedChange={(checked) => onUpdate('monitoringDetails', {
                    ...formData.monitoringDetails,
                    isMonitored: checked as boolean
                  })}
                  className="border-white/40 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 data-[state=checked]:text-white h-5 w-5 shrink-0"
                />
                <Label htmlFor="isMonitored" className="cursor-pointer text-sm font-medium text-foreground">
                  System is remotely monitored
                </Label>
              </div>

              {formData.monitoringDetails?.isMonitored && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="arcName">ARC Name</Label>
                      <Input
                        id="arcName"
                        placeholder="Alarm Receiving Centre name"
                        value={formData.monitoringDetails?.arcName || ''}
                        onChange={(e) => onUpdate('monitoringDetails', {
                          ...formData.monitoringDetails,
                          arcName: e.target.value
                        })}
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="arcContactNumber">ARC Contact Number</Label>
                      <Input
                        id="arcContactNumber"
                        type="tel"
                        placeholder="Contact telephone"
                        value={formData.monitoringDetails?.arcContactNumber || ''}
                        onChange={(e) => onUpdate('monitoringDetails', {
                          ...formData.monitoringDetails,
                          arcContactNumber: e.target.value
                        })}
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="arcAccountNumber">ARC Account Number</Label>
                      <Input
                        id="arcAccountNumber"
                        placeholder="Your account/site reference"
                        value={formData.monitoringDetails?.arcAccountNumber || ''}
                        onChange={(e) => onUpdate('monitoringDetails', {
                          ...formData.monitoringDetails,
                          arcAccountNumber: e.target.value
                        })}
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signallingRoute">Signalling Route</Label>
                      <Select
                        value={formData.monitoringDetails?.signallingRoute || ''}
                        onValueChange={(value) => onUpdate('monitoringDetails', {
                          ...formData.monitoringDetails,
                          signallingRoute: value
                        })}
                      >
                        <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                          <SelectValue placeholder="Select route type" />
                        </SelectTrigger>
                        <SelectContent className="z-[100] bg-background border-border text-foreground">
                          <SelectItem value="dual-path">Dual Path</SelectItem>
                          <SelectItem value="single-path">Single Path</SelectItem>
                          <SelectItem value="redcare">BT Redcare</SelectItem>
                          <SelectItem value="dualcom">Dualcom</SelectItem>
                          <SelectItem value="gsm">GSM/GPRS</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {formData.monitoringDetails?.signallingRoute === 'other' && (
                    <div className="space-y-2">
                      <Label htmlFor="signallingRouteOther">Specify Signalling Route</Label>
                      <Input
                        id="signallingRouteOther"
                        placeholder="Describe the signalling route"
                        value={formData.monitoringDetails?.signallingRouteOther || ''}
                        onChange={(e) => onUpdate('monitoringDetails', {
                          ...formData.monitoringDetails,
                          signallingRouteOther: e.target.value
                        })}
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

    </div>
  );
};

export default FireAlarmInstallationDetails;
