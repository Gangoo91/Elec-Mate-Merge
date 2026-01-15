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
import { useCustomerProperties, CustomerProperty } from '@/hooks/inspection/useCustomerProperties';
import { FileText, ClipboardCheck, Wrench, MapPin, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StartCertificateDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: Customer;
}

type CertificateType = 'eicr' | 'eic' | 'minor-works';

const certificateTypes: { value: CertificateType; label: string; description: string; icon: React.ElementType; color: string }[] = [
  {
    value: 'eicr',
    label: 'EICR',
    description: 'Electrical Installation Condition Report',
    icon: ClipboardCheck,
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  },
  {
    value: 'eic',
    label: 'EIC',
    description: 'Electrical Installation Certificate',
    icon: FileText,
    color: 'bg-green-500/20 text-green-400 border-green-500/30',
  },
  {
    value: 'minor-works',
    label: 'Minor Works',
    description: 'Minor Electrical Installation Works Certificate',
    icon: Wrench,
    color: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
  },
];

export const StartCertificateDialog = ({ open, onOpenChange, customer }: StartCertificateDialogProps) => {
  const navigate = useNavigate();
  const { properties, isLoading } = useCustomerProperties(customer.id);
  const [selectedType, setSelectedType] = useState<CertificateType>('eicr');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>('');

  const handleStart = () => {
    // Navigate to the inspection-testing page with the certificate type and customer info
    navigate(`/electrician/inspection-testing?section=${selectedType}`, {
      state: {
        section: selectedType,
        customerId: customer.id,
        customerData: customer, // Full customer object for pre-filling name, phone, email, address
        propertyId: selectedPropertyId || undefined,
        // If a property is selected, use its address, otherwise use customer's default address
        address: selectedPropertyId
          ? properties.find(p => p.id === selectedPropertyId)?.address
          : customer.address,
      },
    });
    onOpenChange(false);
  };

  // Get primary property or first property as default
  const defaultProperty = properties.find(p => p.isPrimary) || properties[0];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[calc(100%-2rem)] max-w-[500px] max-h-[90vh] overflow-y-auto bg-card border-border p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl text-foreground">
            Start New Certificate
          </DialogTitle>
          <DialogDescription className="text-sm text-neutral-400">
            Choose a certificate type for {customer.name}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-5 mt-4">
          {/* Certificate Type Selection */}
          <div className="space-y-3">
            <Label className="text-foreground">Certificate Type</Label>
            <div className="space-y-2">
              {certificateTypes.map((type) => (
                <button
                  key={type.value}
                  type="button"
                  onClick={() => setSelectedType(type.value)}
                  className={cn(
                    'w-full flex items-center gap-3 p-3 rounded-lg border transition-all touch-manipulation text-left',
                    selectedType === type.value
                      ? type.color
                      : 'bg-background border-border hover:border-border/80'
                  )}
                >
                  <div className={cn(
                    'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                    selectedType === type.value ? 'bg-white/10' : 'bg-muted'
                  )}>
                    <type.icon className="h-5 w-5" />
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

          {/* Property Selection (if customer has properties) */}
          {properties.length > 0 && (
            <div className="space-y-2">
              <Label className="text-foreground flex items-center gap-2">
                <MapPin className="h-4 w-4" />
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
              <p className="text-xs text-muted-foreground">
                The property address will be pre-filled in the certificate
              </p>
            </div>
          )}

          {/* Customer default address (if no properties) */}
          {properties.length === 0 && customer.address && (
            <div className="p-3 rounded-lg bg-muted/50 border border-border">
              <Label className="text-xs text-muted-foreground flex items-center gap-2 mb-1">
                <MapPin className="h-3 w-3" />
                Address
              </Label>
              <p className="text-sm whitespace-pre-wrap">{customer.address}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-2 sm:gap-3 pt-2">
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
              Start Certificate
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
