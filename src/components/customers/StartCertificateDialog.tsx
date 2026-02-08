import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Customer } from '@/hooks/inspection/useCustomers';
import { useCustomerProperties } from '@/hooks/inspection/useCustomerProperties';
import { FileText, ClipboardCheck, Wrench, MapPin, ArrowRight, PoundSterling, Receipt, Flame, Lightbulb, Zap, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StartCertificateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer;
}

type ActionType = 'eicr' | 'eic' | 'minor-works' | 'fire-alarm' | 'emergency-lighting' | 'ev-charging' | 'solar-pv' | 'quote' | 'invoice';

// Certificate types that use the new standalone routes (/inspection-testing/<type>/new)
const STANDALONE_CERT_TYPES: ActionType[] = ['fire-alarm', 'emergency-lighting', 'ev-charging', 'solar-pv'];

const actionTypes: { value: ActionType; label: string; description: string; icon: React.ElementType; color: string; group: 'certificate' | 'business' }[] = [
  {
    value: 'quote',
    label: 'New Quote',
    description: 'Create a quote for this customer',
    icon: FileText,
    color: 'bg-elec-yellow/20 text-elec-yellow border-elec-yellow/30',
    group: 'business',
  },
  {
    value: 'invoice',
    label: 'New Invoice',
    description: 'Create an invoice for this customer',
    icon: PoundSterling,
    color: 'bg-green-500/20 text-green-400 border-green-500/30',
    group: 'business',
  },
  {
    value: 'eicr',
    label: 'EICR',
    description: 'Electrical Installation Condition Report',
    icon: ClipboardCheck,
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    group: 'certificate',
  },
  {
    value: 'eic',
    label: 'EIC',
    description: 'Electrical Installation Certificate',
    icon: Receipt,
    color: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
    group: 'certificate',
  },
  {
    value: 'minor-works',
    label: 'Minor Works',
    description: 'Minor Electrical Installation Works Certificate',
    icon: Wrench,
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
    group: 'certificate',
  },
  {
    value: 'fire-alarm',
    label: 'Fire Alarm',
    description: 'BS 5839 Fire Detection & Alarm',
    icon: Flame,
    color: 'bg-red-500/20 text-red-400 border-red-500/30',
    group: 'certificate',
  },
  {
    value: 'emergency-lighting',
    label: 'Emergency Lighting',
    description: 'BS 5266 Emergency Lighting',
    icon: Lightbulb,
    color: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
    group: 'certificate',
  },
  {
    value: 'ev-charging',
    label: 'EV Charging',
    description: 'IET Code of Practice EV Charging',
    icon: Zap,
    color: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    group: 'certificate',
  },
  {
    value: 'solar-pv',
    label: 'Solar PV',
    description: 'MCS Compliant Solar PV Installation',
    icon: Sun,
    color: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
    group: 'certificate',
  },
];

export const StartCertificateDialog = ({ open, onOpenChange, customer }: StartCertificateDialogProps) => {
  const navigate = useNavigate();
  const { properties } = useCustomerProperties(customer.id);
  const [selectedType, setSelectedType] = useState<ActionType>('quote');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');

  const isCertificate = selectedType !== 'quote' && selectedType !== 'invoice';
  const isStandalone = STANDALONE_CERT_TYPES.includes(selectedType);

  const handleStart = () => {
    const address = selectedPropertyId
      ? properties.find(p => p.id === selectedPropertyId)?.address || customer.address
      : customer.address;

    if (selectedType === 'quote' || selectedType === 'invoice') {
      // Use sessionStorage pattern for pre-filling customer data
      const sessionId = `customer-${selectedType}-${Date.now()}`;
      sessionStorage.setItem(sessionId, JSON.stringify({
        certificateData: {
          client: {
            name: customer.name,
            email: customer.email || '',
            phone: customer.phone || '',
            address: address || '',
          },
        },
      }));

      const builderPath = selectedType === 'quote'
        ? '/electrician/quote-builder/create'
        : '/electrician/invoice-builder/create';

      navigate(`${builderPath}?certificateSessionId=${sessionId}`);
    } else if (isStandalone) {
      // Standalone cert types use /inspection-testing/<type>/new
      navigate(`/electrician/inspection-testing/${selectedType}/new`, {
        state: {
          customerId: customer.id,
          customerData: customer,
          propertyId: selectedPropertyId || undefined,
          address,
        },
      });
    } else {
      // Legacy cert types (EICR/EIC/Minor Works) use query param
      navigate(`/electrician/inspection-testing?section=${selectedType}`, {
        state: {
          section: selectedType,
          customerId: customer.id,
          customerData: customer,
          propertyId: selectedPropertyId || undefined,
          address,
        },
      });
    }
    onOpenChange(false);
  };

  const defaultProperty = properties.find(p => p.isPrimary) || properties[0];

  const businessActions = actionTypes.filter(a => a.group === 'business');
  const certificateActions = actionTypes.filter(a => a.group === 'certificate');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[500px] max-h-[90vh] overflow-y-auto bg-card border-border p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl text-foreground">
            New for {customer.name}
          </DialogTitle>
          <DialogDescription className="text-sm text-neutral-400">
            Create a quote, invoice or certificate
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-3">
          {/* Business Actions */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">Business</Label>
            <div className="grid grid-cols-2 gap-2">
              {businessActions.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setSelectedType(type.value)}
                  className={cn(
                    'flex items-center gap-2.5 p-3 rounded-xl border transition-all touch-manipulation text-left',
                    selectedType === type.value
                      ? type.color
                      : 'bg-background border-border hover:border-border/80'
                  )}
                >
                  <div className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
                    selectedType === type.value ? 'bg-white/10' : 'bg-muted'
                  )}>
                    <type.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{type.label}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Certificate Actions */}
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground uppercase tracking-wider">Certificates</Label>
            <div className="space-y-1.5">
              {certificateActions.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setSelectedType(type.value)}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-xl border transition-all touch-manipulation text-left',
                    selectedType === type.value
                      ? type.color
                      : 'bg-background border-border hover:border-border/80'
                  )}
                >
                  <div className={cn(
                    'w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0',
                    selectedType === type.value ? 'bg-white/10' : 'bg-muted'
                  )}>
                    <type.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm">{type.label}</p>
                    <p className="text-xs text-muted-foreground">{type.description}</p>
                  </div>
                  {selectedType === type.value && (
                    <div className="w-2 h-2 rounded-full bg-current flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Property Selection (for certificates & quotes/invoices with properties) */}
          {properties.length > 0 && (
            <div className="space-y-2">
              <Label className="text-foreground flex items-center gap-2 text-sm">
                <MapPin className="h-3.5 w-3.5" />
                Property
              </Label>
              <MobileSelectPicker
                value={selectedPropertyId || defaultProperty?.id || ''}
                onValueChange={setSelectedPropertyId}
                options={properties.map((property) => ({
                  value: property.id,
                  label: property.address + (property.isPrimary ? ' (Primary)' : ''),
                }))}
                placeholder="Select property"
                title="Select Property"
                triggerClassName="h-11 bg-background border-border"
              />
            </div>
          )}

          {/* Customer default address (if no properties) */}
          {properties.length === 0 && customer.address && (
            <div className="p-3 rounded-xl bg-muted/50 border border-border">
              <Label className="text-xs text-muted-foreground flex items-center gap-2 mb-1">
                <MapPin className="h-3 w-3" />
                Address
              </Label>
              <p className="text-sm whitespace-pre-wrap">{customer.address}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-1">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="w-full sm:w-auto h-11 touch-manipulation"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="accent"
              onClick={handleStart}
              className="w-full sm:w-auto h-11 touch-manipulation"
            >
              {selectedType === 'quote' ? 'Create Quote' : selectedType === 'invoice' ? 'Create Invoice' : 'Start Certificate'}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
