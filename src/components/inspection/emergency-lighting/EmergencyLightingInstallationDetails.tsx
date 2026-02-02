import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { ChevronDown, User, Building2, Lightbulb, Settings, Info, Clock, Copy, History } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEmergencyLightingSmartForm } from '@/hooks/inspection/useEmergencyLightingSmartForm';
import { DurationBadge } from './ValidationBadge';
import { supabase } from '@/integrations/supabase/client';

interface ExistingClient {
  id: string;
  clientName: string;
  clientAddress: string;
  clientTelephone: string;
  clientEmail: string;
  premisesName: string;
  premisesAddress: string;
  premisesType: string;
  occupancyType: string;
}

interface EmergencyLightingInstallationDetailsProps {
  formData: any;
  onUpdate: (field: string, value: any) => void;
}

const EmergencyLightingInstallationDetails: React.FC<EmergencyLightingInstallationDetailsProps> = ({
  formData,
  onUpdate,
}) => {
  const isMobile = useIsMobile();
  const { getDurationForPremises } = useEmergencyLightingSmartForm();
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    client: true,
    premises: true,
    system: true,
    equipment: true,
  });
  const [sameAsClientAddress, setSameAsClientAddress] = useState(false);

  // Fetch existing clients from previous emergency lighting certificates
  const { data: existingClients } = useQuery({
    queryKey: ['emergency-lighting-existing-clients'],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      const { data, error } = await supabase
        .from('reports')
        .select('id, report_data, created_at')
        .eq('report_type', 'emergency-lighting')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error || !data) return [];

      // Extract unique clients from report_data
      const clientMap = new Map<string, ExistingClient>();
      data.forEach(report => {
        const rd = report.report_data as any;
        if (!rd?.clientName) return;
        const key = `${rd.clientName}-${rd.clientAddress || ''}`;
        if (!clientMap.has(key)) {
          clientMap.set(key, {
            id: report.id,
            clientName: rd.clientName || '',
            clientAddress: rd.clientAddress || '',
            clientTelephone: rd.clientTelephone || '',
            clientEmail: rd.clientEmail || '',
            premisesName: rd.premisesName || '',
            premisesAddress: rd.premisesAddress || '',
            premisesType: rd.premisesType || '',
            occupancyType: rd.occupancyType || ''
          });
        }
      });
      return Array.from(clientMap.values());
    },
    staleTime: 5 * 60 * 1000, // Cache for 5 minutes
  });

  // Handle selecting an existing client
  const handleSelectExistingClient = (clientId: string) => {
    const client = existingClients?.find(c => c.id === clientId);
    if (client) {
      onUpdate('clientName', client.clientName);
      onUpdate('clientAddress', client.clientAddress);
      onUpdate('clientTelephone', client.clientTelephone);
      onUpdate('clientEmail', client.clientEmail);
      onUpdate('premisesName', client.premisesName);
      onUpdate('premisesAddress', client.premisesAddress);
      onUpdate('premisesType', client.premisesType);
      onUpdate('occupancyType', client.occupancyType);
    }
  };

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Get duration guidance based on premises type
  const durationGuidance = formData.premisesType
    ? getDurationForPremises(formData.premisesType)
    : null;

  // Auto-update duration when premises type changes to sleeping risk
  useEffect(() => {
    if (durationGuidance && durationGuidance.duration === 180) {
      // Only auto-update if currently set to 1 hour
      if (formData.ratedDuration === 60) {
        onUpdate('ratedDuration', 180);
      }
    }
  }, [formData.premisesType, durationGuidance]);

  // Copy client address to premises address
  const copyClientAddress = () => {
    if (formData.clientAddress) {
      onUpdate('premisesAddress', formData.clientAddress);
      setSameAsClientAddress(true);
    }
  };

  return (
    <div className={cn(isMobile ? "space-y-0" : "space-y-6")}>
      {/* Client Details */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.client} onOpenChange={() => toggleSection('client')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-y border-border/20">
                <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center shrink-0">
                  <User className="h-5 w-5 text-blue-400" />
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
                  <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-400" />
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
              {/* Existing Client Dropdown */}
              {existingClients && existingClients.length > 0 && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <History className="h-3.5 w-3.5 text-blue-400" />
                    Load Previous Client
                  </Label>
                  <Select onValueChange={handleSelectExistingClient}>
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select existing client..." />
                    </SelectTrigger>
                    <SelectContent className="z-[100] max-w-[calc(100vw-2rem)] bg-background border-border text-foreground">
                      {existingClients.map(client => (
                        <SelectItem key={client.id} value={client.id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{client.clientName}</span>
                            <span className="text-xs text-muted-foreground truncate max-w-[250px]">
                              {client.premisesAddress || client.clientAddress || 'No address'}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">
                    Select a previous client to auto-fill their details
                  </p>
                </div>
              )}

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
                  <span className="text-xs text-muted-foreground">Address, type & risk</span>
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
                  {formData.clientAddress && (
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={copyClientAddress}
                      className="h-7 text-xs text-muted-foreground hover:text-foreground"
                    >
                      <Copy className="h-3 w-3 mr-1" />
                      Same as client
                    </Button>
                  )}
                </div>
                <Textarea
                  id="premisesAddress"
                  placeholder="Full installation address"
                  value={formData.premisesAddress || ''}
                  onChange={(e) => {
                    onUpdate('premisesAddress', e.target.value);
                    setSameAsClientAddress(false);
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
                      <SelectItem value="office">Office</SelectItem>
                      <SelectItem value="retail">Retail</SelectItem>
                      <SelectItem value="industrial">Industrial</SelectItem>
                      <SelectItem value="educational">Educational</SelectItem>
                      <SelectItem value="healthcare">Healthcare</SelectItem>
                      <SelectItem value="residential-communal">Residential Communal</SelectItem>
                      <SelectItem value="hotel">Hotel/Hospitality</SelectItem>
                      <SelectItem value="entertainment">Entertainment</SelectItem>
                      <SelectItem value="warehouse">Warehouse</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="occupancyType">Occupancy Risk</Label>
                  <Select
                    value={formData.occupancyType || ''}
                    onValueChange={(value) => onUpdate('occupancyType', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select risk" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="sleeping">Sleeping Risk</SelectItem>
                      <SelectItem value="high">High Risk</SelectItem>
                      <SelectItem value="normal">Normal Risk</SelectItem>
                      <SelectItem value="low">Low Risk</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
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
                <div className="h-10 w-10 rounded-xl bg-amber-500/20 flex items-center justify-center shrink-0">
                  <Settings className="h-5 w-5 text-amber-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">System Classification</h3>
                  <span className="text-xs text-muted-foreground">BS 5266 settings</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.system && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center">
                    <Settings className="h-4 w-4 text-amber-400" />
                  </div>
                  <span className="text-white font-semibold">System Classification (BS 5266)</span>
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
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="testType">Test Type</Label>
                  <Select
                    value={formData.testType || ''}
                    onValueChange={(value) => onUpdate('testType', value)}
                  >
                    <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                      <SelectValue placeholder="Select test type" />
                    </SelectTrigger>
                    <SelectContent className="z-[100] bg-background border-border text-foreground">
                      <SelectItem value="commissioning">Commissioning</SelectItem>
                      <SelectItem value="monthly">Monthly Functional Test</SelectItem>
                      <SelectItem value="annual">Annual Duration Test</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="testDate">Test Date *</Label>
                  <Input
                    id="testDate"
                    type="date"
                    value={formData.testDate || ''}
                    onChange={(e) => onUpdate('testDate', e.target.value)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="systemType">System Type *</Label>
                <Select
                  value={formData.systemType || ''}
                  onValueChange={(value) => onUpdate('systemType', value)}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                    <SelectValue placeholder="Select system type" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-background border-border text-foreground">
                    <SelectItem value="maintained">
                      <div className="flex flex-col">
                        <span className="font-medium">Maintained</span>
                        <span className="text-xs text-muted-foreground">Continuously lit, battery backup</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="non-maintained">
                      <div className="flex flex-col">
                        <span className="font-medium">Non-Maintained</span>
                        <span className="text-xs text-muted-foreground">Only lit on mains failure</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="combined">
                      <div className="flex flex-col">
                        <span className="font-medium">Combined (Sustained)</span>
                        <span className="text-xs text-muted-foreground">Both maintained and non-maintained</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="ratedDuration">Rated Duration</Label>
                  {durationGuidance && (
                    <DurationBadge
                      duration={durationGuidance.duration}
                      required={durationGuidance.duration === 180}
                    />
                  )}
                </div>
                <Select
                  value={formData.ratedDuration?.toString() || '180'}
                  onValueChange={(value) => onUpdate('ratedDuration', parseInt(value))}
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30 focus:border-elec-yellow focus:ring-elec-yellow">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent className="z-[100] bg-background border-border text-foreground">
                    <SelectItem value="60">1 Hour (60 minutes)</SelectItem>
                    <SelectItem value="180">3 Hours (180 minutes)</SelectItem>
                  </SelectContent>
                </Select>

                {/* Duration Guidance Alert */}
                {durationGuidance && (
                  <Alert className={cn(
                    "mt-2",
                    durationGuidance.duration === 180
                      ? "border-purple-500/30 bg-purple-500/10"
                      : "border-blue-500/30 bg-blue-500/10"
                  )}>
                    <Clock className={cn(
                      "h-4 w-4",
                      durationGuidance.duration === 180 ? "text-purple-400" : "text-blue-400"
                    )} />
                    <AlertDescription className={cn(
                      "text-sm",
                      durationGuidance.duration === 180 ? "text-purple-200" : "text-blue-200"
                    )}>
                      <strong>{durationGuidance.title}</strong>
                      <p className="text-xs mt-1 opacity-80">{durationGuidance.content}</p>
                      <p className="text-xs mt-1 opacity-60">{durationGuidance.reference}</p>
                    </AlertDescription>
                  </Alert>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <Checkbox
                    id="selfContainedUnits"
                    checked={formData.selfContainedUnits !== false}
                    onCheckedChange={(checked) => onUpdate('selfContainedUnits', checked)}
                    className="mt-0.5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <Label htmlFor="selfContainedUnits" className="cursor-pointer text-base leading-relaxed">
                    Self-contained luminaires (integrated battery)
                  </Label>
                </div>

                <div className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg">
                  <Checkbox
                    id="centralBatterySystem"
                    checked={formData.centralBatterySystem || false}
                    onCheckedChange={(checked) => onUpdate('centralBatterySystem', checked)}
                    className="mt-0.5 border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black"
                  />
                  <Label htmlFor="centralBatterySystem" className="cursor-pointer text-base leading-relaxed">
                    Central battery system installed
                  </Label>
                </div>

                {formData.centralBatterySystem && (
                  <div className="pl-6 space-y-2">
                    <Label htmlFor="centralBatteryLocation">Central Battery Location</Label>
                    <Input
                      id="centralBatteryLocation"
                      placeholder="e.g., Electrical plant room"
                      value={formData.centralBatteryLocation || ''}
                      onChange={(e) => onUpdate('centralBatteryLocation', e.target.value)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                )}
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>

      {/* Equipment Summary */}
      <div className={cn(isMobile ? "" : "eicr-section-card")}>
        <Collapsible open={openSections.equipment} onOpenChange={() => toggleSection('equipment')}>
          <CollapsibleTrigger className="w-full">
            {isMobile ? (
              <div className="flex items-center gap-3 py-4 px-4 bg-card/30 border-b border-border/20">
                <div className="h-10 w-10 rounded-xl bg-purple-500/20 flex items-center justify-center shrink-0">
                  <Lightbulb className="h-5 w-5 text-purple-400" />
                </div>
                <div className="flex-1 text-left min-w-0">
                  <h3 className="font-semibold text-foreground">Equipment Summary</h3>
                  <span className="text-xs text-muted-foreground">Luminaire & sign counts</span>
                </div>
                <ChevronDown className={cn(
                  "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                  openSections.equipment && "rotate-180"
                )} />
              </div>
            ) : (
              <div className="flex items-center justify-between py-4 px-4 cursor-pointer hover:bg-white/5 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/15 flex items-center justify-center">
                    <Lightbulb className="h-4 w-4 text-purple-400" />
                  </div>
                  <span className="text-white font-semibold">Equipment Summary</span>
                </div>
                <ChevronDown className={cn("h-5 w-5 text-white/40 transition-transform", openSections.equipment && "rotate-180")} />
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
                  <Label htmlFor="luminaireCount">Luminaire Count</Label>
                  <Input
                    id="luminaireCount"
                    type="number"
                    min="0"
                    value={formData.luminaireCount || 0}
                    onChange={(e) => onUpdate('luminaireCount', parseInt(e.target.value) || 0)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exitSignCount">Exit Sign Count</Label>
                  <Input
                    id="exitSignCount"
                    type="number"
                    min="0"
                    value={formData.exitSignCount || 0}
                    onChange={(e) => onUpdate('exitSignCount', parseInt(e.target.value) || 0)}
                    className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                  />
                </div>
                {formData.centralBatterySystem && (
                  <div className="space-y-2">
                    <Label htmlFor="centralBatteryCount">Central Battery Units</Label>
                    <Input
                      id="centralBatteryCount"
                      type="number"
                      min="0"
                      value={formData.centralBatteryCount || 0}
                      onChange={(e) => onUpdate('centralBatteryCount', parseInt(e.target.value) || 0)}
                      className="h-11 text-base touch-manipulation border-white/30 focus:border-elec-yellow focus:ring-elec-yellow"
                    />
                  </div>
                )}
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <h4 className="font-medium mb-2">Equipment Total</h4>
                <p className="text-2xl font-bold text-amber-500">
                  {(formData.luminaireCount || 0) + (formData.exitSignCount || 0)} units
                </p>
                <p className="text-sm text-muted-foreground">
                  {formData.luminaireCount || 0} luminaires + {formData.exitSignCount || 0} exit signs
                </p>
              </div>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};

export default EmergencyLightingInstallationDetails;
