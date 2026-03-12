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
import {
  ChevronDown,
  User,
  Building2,
  Settings,
  Zap,
  Lightbulb,
  Sparkles,
  Shield,
  FileText,
  Radio,
  Scan,
  X,
  Check,
  Cable,
  Link2,
  Plus,
  Trash2,
  AlertTriangle,
  Wrench,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { FireAlarmSystemCategory } from '@/types/fire-alarm';
import { useIsMobile } from '@/hooks/use-mobile';
import { ExistingClientSelect, ClientFormData } from './ExistingClientSelect';
import { FireAlarmPanelAutocomplete, PanelInfoDisplay } from './FireAlarmPanelAutocomplete';
import {
  useFireAlarmSmartForm,
  CategorySuggestion,
} from '@/hooks/inspection/useFireAlarmSmartForm';
import { FireAlarmPanel } from '@/data/fireAlarmEquipmentDatabase';
import { SerialNumberScannerSheet } from './SerialNumberScannerSheet';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { UnifiedAddressFinder } from '@/components/ui/unified-address-finder';
import { PreviousCertPreFillSheet } from './PreviousCertPreFillSheet';
import { useFireAlarmRecentValues } from '@/hooks/inspection/useFireAlarmRecentValues';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FireAlarmInstallationDetailsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const systemCategories: { value: FireAlarmSystemCategory; label: string; description: string }[] = [
  { value: 'L1', label: 'L1 - Full Coverage', description: 'Protection throughout the building' },
  {
    value: 'L2',
    label: 'L2 - Enhanced Coverage',
    description: 'Protection in escape routes + high-risk areas',
  },
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
    cableWiring: false,
    interfaceEquipment: false,
    causeEffect: false,
    falseAlarm: false,
    designDetails: false,
    modificationDetails: false,
  });
  const [sameAsClientAddress, setSameAsClientAddress] = useState(false);
  const [categorySuggestion, setCategorySuggestion] = useState<CategorySuggestion | null>(null);
  const [selectedPanelId, setSelectedPanelId] = useState<string | null>(
    formData.selectedPanelId || null
  );
  const [panelAutoFilled, setPanelAutoFilled] = useState(false);
  const [serialScannerOpen, setSerialScannerOpen] = useState(false);
  const [preFillOpen, setPreFillOpen] = useState(false);
  const [preFillData, setPreFillData] = useState<any>(null);
  const { recentValues } = useFireAlarmRecentValues();
  const { toast } = useToast();

  // B1: Auto-sum zone counts from zone schedule
  const zonesArray = formData.zones || [];
  const hasZonesInSchedule = zonesArray.length > 0;
  useEffect(() => {
    if (hasZonesInSchedule && zonesArray.length !== formData.zonesCount) {
      onUpdate('zonesCount', zonesArray.length);
    }
  }, [zonesArray.length, hasZonesInSchedule, formData.zonesCount, onUpdate]);

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Handle existing client selection
  const handleClientSelect = async (client: ClientFormData | null) => {
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

    // C2: Check for previous cert at same premises for pre-fill
    if (client.premisesAddress) {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user?.id) return;

        const { data } = await supabase
          .from('reports')
          .select('data')
          .eq('user_id', session.user.id)
          .eq('report_type', 'fire-alarm')
          .is('deleted_at', null)
          .order('updated_at', { ascending: false })
          .limit(1)
          .single();

        if (data?.data) {
          const prevData = data.data as any;
          const cert = prevData.thirdPartyCertification || {};
          const fra = prevData.fireRiskAssessment || {};
          const hasPrefillableData = cert.bafeRegistration || cert.fiaMembership ||
            cert.nsiSsaibCertification || fra.fraReference ||
            prevData.monitoringDetails?.isMonitored || prevData.monitoringDetails?.arcName;
          if (hasPrefillableData) {
            setPreFillData(prevData);
            setPreFillOpen(true);
          }
        }
      } catch {
        // Silent - pre-fill is optional
      }
    }
  };

  // C2: Handle pre-fill confirmation
  const handlePreFillConfirm = (selectedSections: string[]) => {
    if (!preFillData) return;

    for (const section of selectedSections) {
      if (section === 'thirdParty') {
        const prevCert = preFillData.thirdPartyCertification || {};
        onUpdate('thirdPartyCertification', {
          ...formData.thirdPartyCertification,
          ...(prevCert.bafeRegistration && { bafeRegistration: prevCert.bafeRegistration }),
          ...(prevCert.fiaMembership && { fiaMembership: prevCert.fiaMembership }),
          ...(prevCert.nsiSsaibCertification && { nsiSsaibCertification: prevCert.nsiSsaibCertification }),
        });
      }
      if (section === 'fra') {
        const prevFra = preFillData.fireRiskAssessment || {};
        onUpdate('fireRiskAssessment', {
          ...formData.fireRiskAssessment,
          ...(prevFra.fraReference && { fraReference: prevFra.fraReference }),
          ...(prevFra.fraDate && { fraDate: prevFra.fraDate }),
          ...(prevFra.fraCompany && { fraCompany: prevFra.fraCompany }),
          ...(prevFra.fraAuthor && { fraAuthor: prevFra.fraAuthor }),
        });
      }
      if (section === 'monitoring') {
        const md = preFillData.monitoringDetails || {};
        onUpdate('monitoringDetails', {
          ...formData.monitoringDetails,
          isMonitored: md.isMonitored || false,
          monitoringType: md.monitoringType || '',
          arcName: md.arcName || '',
          arcAccountNumber: md.arcAccountNumber || '',
          arcTelephone: md.arcTelephone || '',
        });
      }
    }

    toast({
      title: 'Pre-Fill Applied',
      description: `${selectedSections.length} section(s) pre-filled from previous certificate.`,
    });
    setPreFillData(null);
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
    defaults: {
      networkType: string;
      zonesCount: number;
      loopCapacity: number;
      deviceCapacity: number;
      protocol: string;
    } | null
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
        if (defaults.deviceCapacity) onUpdate('maxLoopCapacity', defaults.deviceCapacity);
        setPanelAutoFilled(true);
      }
    } else {
      setSelectedPanelId(null);
      onUpdate('selectedPanelId', null);
      setPanelAutoFilled(false);
    }
  };

  return (
    <div className={cn(isMobile ? 'space-y-0' : 'space-y-6')}>
      {/* Certificate Metadata */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible open={openSections.metadata} onOpenChange={() => toggleSection('metadata')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20">
                <div className="h-10 w-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-red-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Certificate Details</h3>
                  <span className="text-xs text-white">Type, number & date</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform shrink-0',
                    openSections.metadata && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-red-400" />
                  </div>
                  <span className="text-white font-semibold">Certificate Details</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.metadata && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              {/* Certificate Type - Mobile-optimised cards */}
              <div className="space-y-3">
                <Label className="text-sm font-medium">Certificate Type *</Label>
                <RadioGroup
                  value={formData.certificateType || 'installation'}
                  onValueChange={(value) => onUpdate('certificateType', value)}
                  className={cn('gap-2', isMobile ? 'flex flex-col' : 'grid grid-cols-2 sm:grid-cols-4 gap-2')}
                >
                  {[
                    { value: 'design', label: 'Design', desc: 'System design (G.1)' },
                    { value: 'installation', label: 'Installation', desc: 'New system install (G.2)' },
                    { value: 'commissioning', label: 'Commissioning', desc: 'System handover (G.3)' },
                    { value: 'acceptance', label: 'Acceptance', desc: 'System handover (G.4)' },
                    { value: 'verification', label: 'Verification', desc: 'Independent audit (G.5)' },
                    { value: 'periodic', label: 'Periodic Test', desc: 'Routine inspection (G.6)' },
                    { value: 'modification', label: 'Modification', desc: 'System alteration (G.7)' },
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
                          'flex items-center gap-3 rounded-xl cursor-pointer touch-manipulation transition-all border-2',
                          isMobile ? 'p-4' : 'flex-col justify-center p-3 h-20 text-center',
                          'peer-data-[state=unchecked]:bg-black/30 peer-data-[state=unchecked]:border-white/10 peer-data-[state=unchecked]:text-white',
                          'peer-data-[state=checked]:bg-red-500/20 peer-data-[state=checked]:border-red-500 peer-data-[state=checked]:text-white'
                        )}
                      >
                        <div
                          className={cn(
                            'rounded-full flex items-center justify-center shrink-0',
                            isMobile ? 'w-5 h-5 border-2' : 'w-4 h-4 border-2',
                            'peer-data-[state=unchecked]:border-white/30',
                            formData.certificateType === option.value
                              ? 'border-red-500 bg-red-500'
                              : 'border-white/30'
                          )}
                        >
                          {formData.certificateType === option.value && (
                            <div className="w-2 h-2 rounded-full bg-white" />
                          )}
                        </div>
                        <div className={cn(isMobile ? 'flex-1' : '')}>
                          <span className={cn('font-medium', isMobile ? 'text-base' : 'text-sm')}>
                            {option.label}
                          </span>
                          {isMobile && (
                            <p className="text-xs text-white mt-0.5">{option.desc}</p>
                          )}
                        </div>
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

              {/* Standard Edition Reference */}
              <div className="space-y-2">
                <Label htmlFor="standardEdition">Standard Edition</Label>
                <Input
                  id="standardEdition"
                  placeholder="BS 5839-1:2017+A1:2024"
                  value={formData.standardEdition || 'BS 5839-1:2017+A1:2024'}
                  onChange={(e) => onUpdate('standardEdition', e.target.value)}
                  className="h-11 text-base touch-manipulation border-white/30 focus:border-red-500 focus:ring-red-500"
                />
              </div>

              {/* Previous Certificate Reference - For periodic/verification/modification */}
              {['periodic', 'verification', 'modification'].includes(formData.certificateType) && (
                <div className="space-y-2">
                  <Label htmlFor="previousCertificateRef">Previous Certificate Reference</Label>
                  <Input
                    id="previousCertificateRef"
                    placeholder="e.g., FA-2023-001"
                    value={formData.previousCertificateRef || ''}
                    onChange={(e) => onUpdate('previousCertificateRef', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-red-500 focus:ring-red-500"
                  />
                  <p className="text-xs text-white">
                    Reference to the previous certificate for this installation
                  </p>
                </div>
              )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Client Details */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible open={openSections.client} onOpenChange={() => toggleSection('client')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20">
                <div className="h-10 w-10 rounded-xl bg-elec-yellow/20 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-elec-yellow" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Client Details</h3>
                  <span className="text-xs text-white">Name, contact & address</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform shrink-0',
                    openSections.client && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-elec-yellow/15 flex items-center justify-center">
                    <User className="h-4 w-4 text-elec-yellow" />
                  </div>
                  <span className="text-white font-semibold">Client Details</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.client && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
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
                <p className="text-xs text-white">
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
                <UnifiedAddressFinder
                  onAddressSelect={(address, postcode) =>
                    onUpdate('clientAddress', postcode ? `${address}, ${postcode}` : address)
                  }
                  defaultValue={formData.clientAddress || ''}
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
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible open={openSections.premises} onOpenChange={() => toggleSection('premises')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-green-500/20 flex items-center justify-center shrink-0">
                  <Building2 className="h-5 w-5 text-green-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Premises Details</h3>
                  <span className="text-xs text-white">Location & building type</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform shrink-0',
                    openSections.premises && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-green-500/15 flex items-center justify-center">
                    <Building2 className="h-4 w-4 text-green-400" />
                  </div>
                  <span className="text-white font-semibold">Premises Details</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.premises && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
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
                    <Label
                      htmlFor="sameAsClient"
                      className="text-xs text-white cursor-pointer"
                    >
                      Same as client address
                    </Label>
                  </div>
                </div>
                <UnifiedAddressFinder
                  onAddressSelect={(address, postcode) => {
                    const fullAddress = postcode ? `${address}, ${postcode}` : address;
                    onUpdate('premisesAddress', fullAddress);
                    if (sameAsClientAddress && fullAddress !== formData.clientAddress) {
                      setSameAsClientAddress(false);
                    }
                  }}
                  defaultValue={formData.premisesAddress || ''}
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="floorsCount">Number of Floors</Label>
                  <Input
                    id="floorsCount"
                    type="number"
                    min="1"
                    value={formData.floorsCount ?? ''}
                    onChange={(e) =>
                      onUpdate(
                        'floorsCount',
                        e.target.value === '' ? '' : parseInt(e.target.value) || 0
                      )
                    }
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimatedOccupancy">Estimated Occupancy</Label>
                  <Input
                    id="estimatedOccupancy"
                    type="number"
                    min="0"
                    placeholder="Number of persons"
                    value={formData.estimatedOccupancy || ''}
                    onChange={(e) => onUpdate('estimatedOccupancy', e.target.value === '' ? 0 : parseInt(e.target.value) || 0)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupancyBasis">Occupancy Basis</Label>
                  <Input
                    id="occupancyBasis"
                    placeholder="e.g., Fire Risk Assessment"
                    value={formData.occupancyBasis || ''}
                    onChange={(e) => onUpdate('occupancyBasis', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="buildingPlanRef">Building Plan Reference</Label>
                  <Input
                    id="buildingPlanRef"
                    placeholder="e.g., DWG-001"
                    value={formData.buildingPlanRef || ''}
                    onChange={(e) => onUpdate('buildingPlanRef', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="buildingPlanDate">Building Plan Date</Label>
                  <Input
                    id="buildingPlanDate"
                    type="date"
                    value={formData.buildingPlanDate || ''}
                    onChange={(e) => onUpdate('buildingPlanDate', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* System Classification */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible open={openSections.system} onOpenChange={() => toggleSection('system')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-red-500/20 flex items-center justify-center shrink-0">
                  <Settings className="h-5 w-5 text-red-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">System Classification</h3>
                  <span className="text-xs text-white">BS 5839 category & panel</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform shrink-0',
                    openSections.system && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-red-500/15 flex items-center justify-center">
                    <Settings className="h-4 w-4 text-red-400" />
                  </div>
                  <span className="text-white font-semibold">System Classification</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.system && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
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
                          <span className="text-xs text-white">{cat.description}</span>
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
                        Suggested:{' '}
                        <span className="text-elec-yellow">{categorySuggestion.recommended}</span>
                      </p>
                      <p className="text-xs text-white mt-0.5">
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
                    value={formData.zonesCount ?? ''}
                    readOnly={hasZonesInSchedule}
                    onChange={(e) => {
                      if (!hasZonesInSchedule) {
                        onUpdate('zonesCount', e.target.value === '' ? '' : parseInt(e.target.value) || 0);
                      }
                    }}
                    className={cn(
                      'h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow',
                      hasZonesInSchedule && 'border-green-500/30 bg-green-500/5 cursor-not-allowed'
                    )}
                  />
                  {hasZonesInSchedule && (
                    <p className="text-xs text-green-400">Auto-calculated from zone schedule ({zonesArray.length} zones)</p>
                  )}
                </div>
              </div>

              {/* Repeaters Installed Toggle */}
              <div
                className={cn(
                  'flex items-center gap-3 h-12 px-4 rounded-lg cursor-pointer transition-colors',
                  formData.repeatersInstalled
                    ? 'bg-red-500/10 border border-red-500/30'
                    : 'bg-black/30 border border-white/10 hover:border-white/20'
                )}
                onClick={() => onUpdate('repeatersInstalled', !formData.repeatersInstalled)}
              >
                <Checkbox
                  id="repeatersInstalled"
                  checked={formData.repeatersInstalled || false}
                  onCheckedChange={(checked) => onUpdate('repeatersInstalled', checked as boolean)}
                  className="border-white/40 data-[state=checked]:bg-red-500 data-[state=checked]:border-red-500 data-[state=checked]:text-white h-5 w-5 shrink-0"
                />
                <Label
                  htmlFor="repeatersInstalled"
                  className="cursor-pointer text-sm font-medium text-foreground"
                >
                  Repeaters/Translators installed
                </Label>
              </div>

              {/* Panel Selection with Auto-fill */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles
                      className={cn(
                        'h-4 w-4',
                        panelAutoFilled ? 'text-elec-yellow' : 'text-white'
                      )}
                    />
                    <span className="text-sm font-medium">Control Panel</span>
                  </div>
                  {panelAutoFilled && (
                    <span className="flex items-center gap-1 text-xs font-medium text-elec-yellow">
                      <Sparkles className="h-3 w-3" />
                      Auto-filled
                    </span>
                  )}
                </div>

                <FireAlarmPanelAutocomplete
                  value={selectedPanelId || undefined}
                  onValueChange={(id) => setSelectedPanelId(id)}
                  onPanelSelect={handlePanelSelect}
                  placeholder="Search panels by make/model..."
                  showAutoFillBadge={false}
                />

                {selectedPanelId && (
                  <PanelInfoDisplay panelId={selectedPanelId} />
                )}
              </div>

              {/* Manual override fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="systemMake">Control Panel Make *</Label>
                  <Input
                    id="systemMake"
                    list="recentSystemMakes"
                    placeholder="e.g., Morley, Gent, Hochiki"
                    value={formData.systemMake || ''}
                    onChange={(e) => onUpdate('systemMake', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                  {recentValues.systemMakes.length > 0 && (
                    <datalist id="recentSystemMakes">
                      {recentValues.systemMakes.map((v) => <option key={v} value={v} />)}
                    </datalist>
                  )}
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
                    list="recentPanelLocations"
                    placeholder="e.g., Main reception, Ground floor lobby"
                    value={formData.panelLocation || ''}
                    onChange={(e) => onUpdate('panelLocation', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                  {recentValues.panelLocations.length > 0 && (
                    <datalist id="recentPanelLocations">
                      {recentValues.panelLocations.map((v) => <option key={v} value={v} />)}
                    </datalist>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="panelFirmwareVersion">Panel Firmware Version</Label>
                  <Input
                    id="panelFirmwareVersion"
                    placeholder="e.g., V3.2.1"
                    value={formData.panelFirmwareVersion || ''}
                    onChange={(e) => onUpdate('panelFirmwareVersion', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="panelSerialNumber">Panel Serial Number</Label>
                  <div className="flex gap-2">
                    <Input
                      id="panelSerialNumber"
                      placeholder="Serial number"
                      value={formData.panelSerialNumber || ''}
                      onChange={(e) => onUpdate('panelSerialNumber', e.target.value)}
                      className={cn(
                        'h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow flex-1',
                        formData.panelSerialPhoto && 'border-green-500/50 bg-green-500/5'
                      )}
                    />
                    <Button
                      type="button"
                      onClick={() => setSerialScannerOpen(true)}
                      className="h-11 px-4 shrink-0 bg-red-500 hover:bg-red-600 text-white gap-2 touch-manipulation active:scale-[0.98] transition-transform"
                      title="Scan serial number with camera"
                    >
                      <Scan className="h-5 w-5" />
                      <span className="text-sm font-medium">Scan</span>
                    </Button>
                  </div>
                  {/* AI Scanned indicator */}
                  {formData.panelSerialPhoto && (
                    <div className="flex items-center gap-2 mt-2 p-2 rounded-lg bg-green-500/10 border border-green-500/20">
                      <div className="w-6 h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Check className="h-3 w-3 text-green-400" />
                      </div>
                      <span className="text-xs text-green-400 font-medium">
                        AI scanned from photo
                      </span>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={clearSerialPhoto}
                        className="ml-auto h-11 w-11 text-white hover:text-white hover:bg-white/10"
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

      <PreviousCertPreFillSheet
        open={preFillOpen}
        onOpenChange={setPreFillOpen}
        previousData={preFillData}
        onConfirm={handlePreFillConfirm}
      />

      {/* Power Supply */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible open={openSections.power} onOpenChange={() => toggleSection('power')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Zap className="h-5 w-5 text-blue-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Power Supply</h3>
                  <span className="text-xs text-white">Battery backup & type</span>
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
                  <div className="w-9 h-9 rounded-xl bg-elec-yellow/15 flex items-center justify-center">
                    <Zap className="h-4 w-4 text-elec-yellow" />
                  </div>
                  <span className="text-white font-semibold">Power Supply</span>
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
              {/* Mains Power Supply Toggle */}
              <div
                className={cn(
                  'flex items-center gap-3 h-12 px-4 rounded-lg cursor-pointer transition-colors',
                  formData.mainsPowerSupply !== false
                    ? 'bg-blue-500/10 border border-blue-500/30'
                    : 'bg-black/30 border border-white/10 hover:border-white/20'
                )}
                onClick={() =>
                  onUpdate('mainsPowerSupply', formData.mainsPowerSupply === false ? true : false)
                }
              >
                <Checkbox
                  id="mainsPowerSupply"
                  checked={formData.mainsPowerSupply !== false}
                  onCheckedChange={(checked) => onUpdate('mainsPowerSupply', checked as boolean)}
                  className="border-white/40 data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500 data-[state=checked]:text-white h-5 w-5 shrink-0"
                />
                <Label
                  htmlFor="mainsPowerSupply"
                  className="cursor-pointer text-sm font-medium text-foreground"
                >
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
                  <p className="text-xs text-white">
                    BS 5839 requires min 24 hours standby
                  </p>
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
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible
          open={openSections.certification}
          onOpenChange={() => toggleSection('certification')}
        >
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                  <Shield className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Third-Party Certification</h3>
                  <span className="text-xs text-white">BAFE, FIA, NSI/SSAIB</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform shrink-0',
                    openSections.certification && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
                    <Shield className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-white font-semibold">Third-Party Certification</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.certification && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              <p className="text-xs text-white">
                Optional: Enter your third-party certification details if applicable.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="bafeRegistration">BAFE SP203-1 Registration</Label>
                  <Input
                    id="bafeRegistration"
                    placeholder="e.g., SP203-1/12345"
                    value={formData.thirdPartyCertification?.bafeRegistration || ''}
                    onChange={(e) =>
                      onUpdate('thirdPartyCertification', {
                        ...formData.thirdPartyCertification,
                        bafeRegistration: e.target.value,
                      })
                    }
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fiaMembership">FIA Membership Number</Label>
                  <Input
                    id="fiaMembership"
                    placeholder="e.g., FIA12345"
                    value={formData.thirdPartyCertification?.fiaMembership || ''}
                    onChange={(e) =>
                      onUpdate('thirdPartyCertification', {
                        ...formData.thirdPartyCertification,
                        fiaMembership: e.target.value,
                      })
                    }
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="nsiSsaibCertification">NSI/SSAIB Certification</Label>
                  <Input
                    id="nsiSsaibCertification"
                    placeholder="e.g., NSI Gold, SSAIB"
                    value={formData.thirdPartyCertification?.nsiSsaibCertification || ''}
                    onChange={(e) =>
                      onUpdate('thirdPartyCertification', {
                        ...formData.thirdPartyCertification,
                        nsiSsaibCertification: e.target.value,
                      })
                    }
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="otherAccreditation">Other Accreditation</Label>
                  <Input
                    id="otherAccreditation"
                    placeholder="Any other relevant accreditation"
                    value={formData.thirdPartyCertification?.otherAccreditation || ''}
                    onChange={(e) =>
                      onUpdate('thirdPartyCertification', {
                        ...formData.thirdPartyCertification,
                        otherAccreditation: e.target.value,
                      })
                    }
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Fire Risk Assessment Reference */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible open={openSections.fra} onOpenChange={() => toggleSection('fra')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-orange-500/20 flex items-center justify-center shrink-0">
                  <FileText className="h-5 w-5 text-orange-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Fire Risk Assessment</h3>
                  <span className="text-xs text-white">FRA reference details</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform shrink-0',
                    openSections.fra && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/15 flex items-center justify-center">
                    <FileText className="h-4 w-4 text-orange-400" />
                  </div>
                  <span className="text-white font-semibold">Fire Risk Assessment Reference</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.fra && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              <p className="text-xs text-white">
                Reference the Fire Risk Assessment that informed the system design.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fraReference">FRA Reference Number</Label>
                  <Input
                    id="fraReference"
                    placeholder="e.g., FRA-2024-001"
                    value={formData.fireRiskAssessment?.fraReference || ''}
                    onChange={(e) =>
                      onUpdate('fireRiskAssessment', {
                        ...formData.fireRiskAssessment,
                        fraReference: e.target.value,
                      })
                    }
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fraDate">FRA Date</Label>
                  <Input
                    id="fraDate"
                    type="date"
                    value={formData.fireRiskAssessment?.fraDate || ''}
                    onChange={(e) =>
                      onUpdate('fireRiskAssessment', {
                        ...formData.fireRiskAssessment,
                        fraDate: e.target.value,
                      })
                    }
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fraAuthor">FRA Author</Label>
                  <Input
                    id="fraAuthor"
                    placeholder="Name of risk assessor"
                    value={formData.fireRiskAssessment?.fraAuthor || ''}
                    onChange={(e) =>
                      onUpdate('fireRiskAssessment', {
                        ...formData.fireRiskAssessment,
                        fraAuthor: e.target.value,
                      })
                    }
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="fraCompany">FRA Company</Label>
                  <Input
                    id="fraCompany"
                    placeholder="Risk assessment company"
                    value={formData.fireRiskAssessment?.fraCompany || ''}
                    onChange={(e) =>
                      onUpdate('fireRiskAssessment', {
                        ...formData.fireRiskAssessment,
                        fraCompany: e.target.value,
                      })
                    }
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Monitoring/ARC Details */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible
          open={openSections.monitoring}
          onOpenChange={() => toggleSection('monitoring')}
        >
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-cyan-500/20 flex items-center justify-center shrink-0">
                  <Radio className="h-5 w-5 text-cyan-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Monitoring & ARC</h3>
                  <span className="text-xs text-white">Alarm Receiving Centre</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform shrink-0',
                    openSections.monitoring && 'rotate-180'
                  )}
                />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/15 flex items-center justify-center">
                    <Radio className="h-4 w-4 text-cyan-400" />
                  </div>
                  <span className="text-white font-semibold">Monitoring & ARC Details</span>
                </div>
                <ChevronDown
                  className={cn(
                    'h-5 w-5 text-white transition-transform',
                    openSections.monitoring && 'rotate-180'
                  )}
                />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              {/* Is Monitored Checkbox */}
              <div
                className={cn(
                  'flex items-center gap-3 h-12 px-4 rounded-lg cursor-pointer transition-colors',
                  formData.monitoringDetails?.isMonitored
                    ? 'bg-cyan-500/10 border border-cyan-500/30'
                    : 'bg-black/30 border border-white/10 hover:border-white/20'
                )}
                onClick={() =>
                  onUpdate('monitoringDetails', {
                    ...formData.monitoringDetails,
                    isMonitored: !formData.monitoringDetails?.isMonitored,
                  })
                }
              >
                <Checkbox
                  id="isMonitored"
                  checked={formData.monitoringDetails?.isMonitored || false}
                  onCheckedChange={(checked) =>
                    onUpdate('monitoringDetails', {
                      ...formData.monitoringDetails,
                      isMonitored: checked as boolean,
                    })
                  }
                  className="border-white/40 data-[state=checked]:bg-cyan-500 data-[state=checked]:border-cyan-500 data-[state=checked]:text-white h-5 w-5 shrink-0"
                />
                <Label
                  htmlFor="isMonitored"
                  className="cursor-pointer text-sm font-medium text-foreground"
                >
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
                        list="recentArcNames"
                        placeholder="Alarm Receiving Centre name"
                        value={formData.monitoringDetails?.arcName || ''}
                        onChange={(e) =>
                          onUpdate('monitoringDetails', {
                            ...formData.monitoringDetails,
                            arcName: e.target.value,
                          })
                        }
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                      {recentValues.arcNames.length > 0 && (
                        <datalist id="recentArcNames">
                          {recentValues.arcNames.map((v) => <option key={v} value={v} />)}
                        </datalist>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="arcContactNumber">ARC Contact Number</Label>
                      <Input
                        id="arcContactNumber"
                        type="tel"
                        placeholder="Contact telephone"
                        value={formData.monitoringDetails?.arcContactNumber || ''}
                        onChange={(e) =>
                          onUpdate('monitoringDetails', {
                            ...formData.monitoringDetails,
                            arcContactNumber: e.target.value,
                          })
                        }
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="arcAccountNumber">ARC Account Number</Label>
                      <Input
                        id="arcAccountNumber"
                        placeholder="Your account/site reference"
                        value={formData.monitoringDetails?.arcAccountNumber || ''}
                        onChange={(e) =>
                          onUpdate('monitoringDetails', {
                            ...formData.monitoringDetails,
                            arcAccountNumber: e.target.value,
                          })
                        }
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signallingRoute">Signalling Route</Label>
                      <Select
                        value={formData.monitoringDetails?.signallingRoute || ''}
                        onValueChange={(value) =>
                          onUpdate('monitoringDetails', {
                            ...formData.monitoringDetails,
                            signallingRoute: value,
                          })
                        }
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
                        onChange={(e) =>
                          onUpdate('monitoringDetails', {
                            ...formData.monitoringDetails,
                            signallingRouteOther: e.target.value,
                          })
                        }
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                  )}
                </>
              )}

              {/* Cause & Effect Reference */}
              <div className="space-y-3 pt-2">
                <h4 className="font-medium text-sm text-cyan-400 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-cyan-400"></div>
                  Cause & Effect
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="causeAndEffectRef">Document Reference</Label>
                    <Input
                      id="causeAndEffectRef"
                      placeholder="e.g., C&E-001"
                      value={formData.causeAndEffectRef || ''}
                      onChange={(e) => onUpdate('causeAndEffectRef', e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="causeAndEffectDate">Date Verified</Label>
                    <Input
                      id="causeAndEffectDate"
                      type="date"
                      value={formData.causeAndEffectDate || ''}
                      onChange={(e) => onUpdate('causeAndEffectDate', e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                </div>
                <div
                  className={cn(
                    'flex items-center gap-3 h-12 px-4 rounded-lg cursor-pointer transition-colors',
                    formData.causeAndEffectVerified
                      ? 'bg-green-500/10 border border-green-500/30'
                      : 'bg-black/30 border border-white/10 hover:border-white/20'
                  )}
                  onClick={() => onUpdate('causeAndEffectVerified', !formData.causeAndEffectVerified)}
                >
                  <Checkbox
                    checked={formData.causeAndEffectVerified || false}
                    onCheckedChange={(checked) => onUpdate('causeAndEffectVerified', checked as boolean)}
                    className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white h-5 w-5 shrink-0"
                  />
                  <Label className="cursor-pointer text-sm font-medium text-foreground">
                    Verified against installed system
                  </Label>
                </div>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Design Details - Only for design certificates */}
      {formData.certificateType === 'design' && (
        <div className={cn(isMobile ? '' : 'eicr-section-card')}>
          <Collapsible open={openSections.designDetails} onOpenChange={() => toggleSection('designDetails')}>
            <CollapsibleTrigger className="w-full">
              {isMobile ? (
                <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                  <div className="h-10 w-10 rounded-xl bg-indigo-500/20 flex items-center justify-center shrink-0">
                    <FileText className="h-5 w-5 text-indigo-400" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-semibold text-foreground">Design Details</h3>
                    <span className="text-xs text-white">BS 5839-1 Annex G.1</span>
                  </div>
                  <ChevronDown className={cn('h-5 w-5 text-white transition-transform shrink-0', openSections.designDetails && 'rotate-180')} />
                </div>
              ) : (
                <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-indigo-500/15 flex items-center justify-center">
                      <FileText className="h-4 w-4 text-indigo-400" />
                    </div>
                    <span className="text-white font-semibold">Design Details</span>
                  </div>
                  <ChevronDown className={cn('h-5 w-5 text-white transition-transform', openSections.designDetails && 'rotate-180')} />
                </div>
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
                <div className="space-y-2">
                  <Label htmlFor="designBasis">Design Basis</Label>
                  <Textarea
                    id="designBasis"
                    placeholder="Description of the design basis and applicable standards..."
                    value={formData.designBasis || ''}
                    onChange={(e) => onUpdate('designBasis', e.target.value)}
                    className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="designCoverageCategory">Coverage Category</Label>
                    <Input
                      id="designCoverageCategory"
                      placeholder="e.g., L1, L2, P1"
                      value={formData.designCoverageCategory || ''}
                      onChange={(e) => onUpdate('designCoverageCategory', e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="designDocRef">Design Document Reference</Label>
                    <Input
                      id="designDocRef"
                      placeholder="e.g., DES-2024-001"
                      value={formData.designDocRef || ''}
                      onChange={(e) => onUpdate('designDocRef', e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="designDeviations">Deviations from Standard</Label>
                  <Textarea
                    id="designDeviations"
                    placeholder="Any deviations from BS 5839-1 and justification..."
                    value={formData.designDeviations || ''}
                    onChange={(e) => onUpdate('designDeviations', e.target.value)}
                    className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Modification Details - Only for modification certificates */}
      {formData.certificateType === 'modification' && (
        <div className={cn(isMobile ? '' : 'eicr-section-card')}>
          <Collapsible open={openSections.modificationDetails} onOpenChange={() => toggleSection('modificationDetails')}>
            <CollapsibleTrigger className="w-full">
              {isMobile ? (
                <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                  <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                    <Wrench className="h-5 w-5 text-amber-400" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-semibold text-foreground">Modification Details</h3>
                    <span className="text-xs text-white">BS 5839-1 Annex G.7</span>
                  </div>
                  <ChevronDown className={cn('h-5 w-5 text-white transition-transform shrink-0', openSections.modificationDetails && 'rotate-180')} />
                </div>
              ) : (
                <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
                      <Wrench className="h-4 w-4 text-amber-400" />
                    </div>
                    <span className="text-white font-semibold">Modification Details</span>
                  </div>
                  <ChevronDown className={cn('h-5 w-5 text-white transition-transform', openSections.modificationDetails && 'rotate-180')} />
                </div>
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="originalCertRef">Original Certificate Reference</Label>
                    <Input
                      id="originalCertRef"
                      placeholder="e.g., FA-2023-001"
                      value={formData.originalCertRef || ''}
                      onChange={(e) => onUpdate('originalCertRef', e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="modificationExtent">Extent of Modification</Label>
                    <Select
                      value={formData.modificationExtent || ''}
                      onValueChange={(value) => onUpdate('modificationExtent', value)}
                    >
                      <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                        <SelectValue placeholder="Select extent" />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-background border-border text-foreground">
                        <SelectItem value="minor">Minor</SelectItem>
                        <SelectItem value="significant">Significant</SelectItem>
                        <SelectItem value="major">Major</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modificationDescription">Description of Modification</Label>
                  <Textarea
                    id="modificationDescription"
                    placeholder="Full description of the modification work undertaken..."
                    value={formData.modificationDescription || ''}
                    onChange={(e) => onUpdate('modificationDescription', e.target.value)}
                    className="text-base touch-manipulation min-h-[100px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="modificationReason">Reason for Modification</Label>
                  <Textarea
                    id="modificationReason"
                    placeholder="Reason why the modification was required..."
                    value={formData.modificationReason || ''}
                    onChange={(e) => onUpdate('modificationReason', e.target.value)}
                    className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Cable & Wiring Details - For installation, design, modification, acceptance */}
      {['installation', 'design', 'modification', 'acceptance'].includes(formData.certificateType) && (
        <div className={cn(isMobile ? '' : 'eicr-section-card')}>
          <Collapsible open={openSections.cableWiring} onOpenChange={() => toggleSection('cableWiring')}>
            <CollapsibleTrigger className="w-full">
              {isMobile ? (
                <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                  <div className="h-10 w-10 rounded-xl bg-teal-500/20 flex items-center justify-center shrink-0">
                    <Cable className="h-5 w-5 text-teal-400" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <h3 className="font-semibold text-foreground">Cable & Wiring</h3>
                    <span className="text-xs text-white">BS 5839-1 Cl.26-27</span>
                  </div>
                  <ChevronDown className={cn('h-5 w-5 text-white transition-transform shrink-0', openSections.cableWiring && 'rotate-180')} />
                </div>
              ) : (
                <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-teal-500/15 flex items-center justify-center">
                      <Cable className="h-4 w-4 text-teal-400" />
                    </div>
                    <span className="text-white font-semibold">Cable & Wiring Details</span>
                  </div>
                  <ChevronDown className={cn('h-5 w-5 text-white transition-transform', openSections.cableWiring && 'rotate-180')} />
                </div>
              )}
            </CollapsibleTrigger>
            <CollapsibleContent>
              <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="cableType">Cable Type</Label>
                    <Select
                      value={formData.cableType || ''}
                      onValueChange={(value) => onUpdate('cableType', value)}
                    >
                      <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                        <SelectValue placeholder="Select cable type" />
                      </SelectTrigger>
                      <SelectContent className="z-[100] bg-background border-border text-foreground">
                        <SelectItem value="standard-ph30">Standard (PH30)</SelectItem>
                        <SelectItem value="enhanced-ph120">Enhanced (PH120)</SelectItem>
                        <SelectItem value="mineral-insulated">Mineral Insulated (MICC)</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cableFireRating">Fire Rating</Label>
                    <Input
                      id="cableFireRating"
                      placeholder="e.g., PH30, PH120"
                      value={formData.cableFireRating || ''}
                      onChange={(e) => onUpdate('cableFireRating', e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="circuitIntegrity">Circuit Integrity</Label>
                  <Select
                    value={formData.circuitIntegrity || ''}
                    onValueChange={(value) => onUpdate('circuitIntegrity', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select integrity level" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="standard">Standard</SelectItem>
                      <SelectItem value="enhanced">Enhanced (BS 5839-1 Cl.27)</SelectItem>
                      <SelectItem value="critical-signal-path">Critical Signal Path</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="wiringNotes">Wiring Notes</Label>
                  <Textarea
                    id="wiringNotes"
                    placeholder="Additional wiring details, routing, containment..."
                    value={formData.wiringNotes || ''}
                    onChange={(e) => onUpdate('wiringNotes', e.target.value)}
                    className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>
      )}

      {/* Interface Equipment - All certificate types */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible open={openSections.interfaceEquipment} onOpenChange={() => toggleSection('interfaceEquipment')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-pink-500/20 flex items-center justify-center shrink-0">
                  <Link2 className="h-5 w-5 text-pink-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Interface Equipment</h3>
                  <span className="text-xs text-white">
                    {(formData.interfaceEquipment || []).length} interfaces
                  </span>
                </div>
                <ChevronDown className={cn('h-5 w-5 text-white transition-transform shrink-0', openSections.interfaceEquipment && 'rotate-180')} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-pink-500/15 flex items-center justify-center">
                    <Link2 className="h-4 w-4 text-pink-400" />
                  </div>
                  <span className="text-white font-semibold">Interface Equipment</span>
                </div>
                <ChevronDown className={cn('h-5 w-5 text-white transition-transform', openSections.interfaceEquipment && 'rotate-180')} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              <p className="text-xs text-white">
                Record interface equipment connected to the fire alarm system (BS 5839-1 Cl.26, Cl.44.2).
              </p>

              {(formData.interfaceEquipment || []).map((item: any, index: number) => (
                <div key={item.id} className="bg-black/40 rounded-xl p-4">
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-medium flex items-center gap-2 text-sm">
                      <Link2 className="h-4 w-4 text-pink-400" />
                      Interface {index + 1}
                    </h4>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => {
                        const items = formData.interfaceEquipment || [];
                        onUpdate('interfaceEquipment', items.filter((i: any) => i.id !== item.id));
                      }}
                      className="h-11 w-11 p-0 text-red-400 hover:text-red-300 hover:bg-red-500/10 touch-manipulation"
                      aria-label="Remove interface"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-2">
                      <Label className="text-sm">Type</Label>
                      <Select
                        value={item.type || ''}
                        onValueChange={(v) => {
                          const items = [...(formData.interfaceEquipment || [])];
                          const idx = items.findIndex((i: any) => i.id === item.id);
                          if (idx >= 0) { items[idx] = { ...items[idx], type: v }; onUpdate('interfaceEquipment', items); }
                        }}
                      >
                        <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent className="z-[100] bg-background border-border text-foreground">
                          <SelectItem value="door-holders">Door Holders</SelectItem>
                          <SelectItem value="sprinkler-interface">Sprinkler Interface</SelectItem>
                          <SelectItem value="lift-recall">Lift Recall</SelectItem>
                          <SelectItem value="ventilation-dampers">Ventilation/Dampers</SelectItem>
                          <SelectItem value="gas-shutdown">Gas Shutdown</SelectItem>
                          <SelectItem value="access-control">Access Control</SelectItem>
                          <SelectItem value="suppression">Suppression</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Interface Method</Label>
                      <Select
                        value={item.interfaceMethod || ''}
                        onValueChange={(v) => {
                          const items = [...(formData.interfaceEquipment || [])];
                          const idx = items.findIndex((i: any) => i.id === item.id);
                          if (idx >= 0) { items[idx] = { ...items[idx], interfaceMethod: v }; onUpdate('interfaceEquipment', items); }
                        }}
                      >
                        <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                          <SelectValue placeholder="Select method" />
                        </SelectTrigger>
                        <SelectContent className="z-[100] bg-background border-border text-foreground">
                          <SelectItem value="volt-free-relay">Volt-free Relay</SelectItem>
                          <SelectItem value="monitored-output">Monitored Output</SelectItem>
                          <SelectItem value="addressable-module">Addressable Module</SelectItem>
                          <SelectItem value="hardwired">Hardwired</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Location</Label>
                      <Input
                        placeholder="Location"
                        value={item.location || ''}
                        onChange={(e) => {
                          const items = [...(formData.interfaceEquipment || [])];
                          const idx = items.findIndex((i: any) => i.id === item.id);
                          if (idx >= 0) { items[idx] = { ...items[idx], location: e.target.value }; onUpdate('interfaceEquipment', items); }
                        }}
                        className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm">Details</Label>
                      <Input
                        placeholder="Additional details"
                        value={item.details || ''}
                        onChange={(e) => {
                          const items = [...(formData.interfaceEquipment || [])];
                          const idx = items.findIndex((i: any) => i.id === item.id);
                          if (idx >= 0) { items[idx] = { ...items[idx], details: e.target.value }; onUpdate('interfaceEquipment', items); }
                        }}
                        className="h-11 text-sm touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                  </div>
                  {['periodic', 'acceptance'].includes(formData.certificateType) && (
                    <div
                      className={cn(
                        'flex items-center gap-3 h-12 px-4 rounded-lg cursor-pointer transition-colors mt-3',
                        item.tested ? 'bg-green-500/10 border border-green-500/30' : 'bg-black/30 border border-white/10'
                      )}
                      onClick={() => {
                        const items = [...(formData.interfaceEquipment || [])];
                        const idx = items.findIndex((i: any) => i.id === item.id);
                        if (idx >= 0) { items[idx] = { ...items[idx], tested: !items[idx].tested }; onUpdate('interfaceEquipment', items); }
                      }}
                    >
                      <Checkbox
                        checked={item.tested || false}
                        className="border-white/40 data-[state=checked]:bg-green-500 data-[state=checked]:border-green-500 data-[state=checked]:text-white h-5 w-5 shrink-0"
                      />
                      <Label className="cursor-pointer text-sm font-medium text-foreground">Tested</Label>
                    </div>
                  )}
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full h-11 touch-manipulation border-dashed border-white/20 hover:border-pink-500 hover:bg-pink-500/10"
                onClick={() => {
                  const items = formData.interfaceEquipment || [];
                  onUpdate('interfaceEquipment', [...items, {
                    id: `iface-${Date.now()}`,
                    type: '',
                    location: '',
                    interfaceMethod: '',
                    details: '',
                    tested: false,
                  }]);
                }}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Interface Equipment
              </Button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* False Alarm Management */}
      <div className={cn(isMobile ? '' : 'eicr-section-card')}>
        <Collapsible open={openSections.falseAlarm} onOpenChange={() => toggleSection('falseAlarm')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">False Alarm Management</h3>
                  <span className="text-xs text-white">BS 5839-1 Cl.19</span>
                </div>
                <ChevronDown className={cn('h-5 w-5 text-white transition-transform shrink-0', openSections.falseAlarm && 'rotate-180')} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-amber-400" />
                  </div>
                  <span className="text-white font-semibold">False Alarm Management</span>
                </div>
                <ChevronDown className={cn('h-5 w-5 text-white transition-transform', openSections.falseAlarm && 'rotate-180')} />
              </div>
            )}
          </CollapsibleTrigger>
          <CollapsibleContent>
            <div className={cn('space-y-4', isMobile ? 'px-4 py-4' : 'px-4 pb-4')}>
              <div
                className={cn(
                  'flex items-center gap-3 h-12 px-4 rounded-lg cursor-pointer transition-colors',
                  formData.falseAlarmManagement
                    ? 'bg-amber-500/10 border border-amber-500/30'
                    : 'bg-black/30 border border-white/10 hover:border-white/20'
                )}
                onClick={() => onUpdate('falseAlarmManagement', !formData.falseAlarmManagement)}
              >
                <Checkbox
                  checked={formData.falseAlarmManagement || false}
                  onCheckedChange={(checked) => onUpdate('falseAlarmManagement', checked as boolean)}
                  className="border-white/40 data-[state=checked]:bg-amber-500 data-[state=checked]:border-amber-500 data-[state=checked]:text-white h-5 w-5 shrink-0"
                />
                <Label className="cursor-pointer text-sm font-medium text-foreground">
                  False alarm management strategy in place
                </Label>
              </div>

              {formData.falseAlarmManagement && (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="falseAlarmStrategy">Strategy</Label>
                      <Select
                        value={formData.falseAlarmStrategy || ''}
                        onValueChange={(value) => onUpdate('falseAlarmStrategy', value)}
                      >
                        <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                          <SelectValue placeholder="Select strategy" />
                        </SelectTrigger>
                        <SelectContent className="z-[100] bg-background border-border text-foreground">
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="coincidence-detection">Coincidence Detection</SelectItem>
                          <SelectItem value="verification">Verification</SelectItem>
                          <SelectItem value="intelligent-detectors">Intelligent Detectors</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="investigationDelay">Investigation Delay (seconds)</Label>
                      <Input
                        id="investigationDelay"
                        type="number"
                        min="0"
                        placeholder="0"
                        value={formData.investigationDelay || ''}
                        onChange={(e) => onUpdate('investigationDelay', e.target.value === '' ? 0 : parseInt(e.target.value) || 0)}
                        className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="falseAlarmNotes">Notes</Label>
                    <Textarea
                      id="falseAlarmNotes"
                      placeholder="Additional false alarm management notes..."
                      value={formData.falseAlarmNotes || ''}
                      onChange={(e) => onUpdate('falseAlarmNotes', e.target.value)}
                      className="text-base touch-manipulation min-h-[80px] border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
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
