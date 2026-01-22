import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { UserPlus, User, Mail, Phone, MapPin, FileText, Check, X, Loader2 } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';
import { cn } from '@/lib/utils';

interface CreateCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (customerData: {
    name: string;
    email?: string;
    phone?: string;
    address?: string;
    notes?: string;
  }) => Promise<void>;
  prefillData: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
}

export const CreateCustomerDialog: React.FC<CreateCustomerDialogProps> = ({
  open,
  onOpenChange,
  onConfirm,
  prefillData,
}) => {
  const isMobile = useIsMobile();
  const [customerData, setCustomerData] = useState({
    name: prefillData.name || '',
    email: prefillData.email || '',
    phone: prefillData.phone || '',
    address: prefillData.address || '',
    notes: 'Created from certificate',
  });
  const [isCreating, setIsCreating] = useState(false);
  const [emailError, setEmailError] = useState('');

  // Reset form when dialog opens
  useEffect(() => {
    if (open) {
      setCustomerData({
        name: prefillData.name || '',
        email: prefillData.email || '',
        phone: prefillData.phone || '',
        address: prefillData.address || '',
        notes: 'Created from certificate',
      });
      setEmailError('');
    }
  }, [open, prefillData]);

  const validateEmail = (email: string) => {
    if (!email) {
      setEmailError('');
      return true;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email');
      return false;
    }
    setEmailError('');
    return true;
  };

  const handleConfirm = async () => {
    setIsCreating(true);
    try {
      await onConfirm(customerData);
      onOpenChange(false);
    } finally {
      setIsCreating(false);
    }
  };

  const handleDecline = () => {
    onOpenChange(false);
  };

  // Form content shared between mobile and desktop
  const FormContent = () => (
    <div className="space-y-5">
      {/* Name Field */}
      <div className="space-y-2">
        <Label htmlFor="customer-name" className="text-sm font-medium text-foreground">
          Name <span className="text-elec-yellow">*</span>
        </Label>
        <div className="relative">
          {!customerData.name && (
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
          )}
          <Input
            id="customer-name"
            value={customerData.name}
            onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
            placeholder="Customer name"
            className={cn(
              "h-12 text-base touch-manipulation border-white/30 bg-card focus:border-elec-yellow focus:ring-elec-yellow",
              !customerData.name && "pl-10"
            )}
          />
          {customerData.name.trim() && (
            <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
          )}
        </div>
      </div>

      {/* Contact Details Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-border/50"></div>
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-2">Contact Details</span>
          <div className="h-px flex-1 bg-border/50"></div>
        </div>

        {/* Email Field */}
        <div className="space-y-2">
          <Label htmlFor="customer-email" className="text-sm font-medium text-foreground">Email</Label>
          <div className="relative">
            {!customerData.email && (
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            )}
            <Input
              id="customer-email"
              type="email"
              value={customerData.email}
              onChange={(e) => {
                setCustomerData({ ...customerData, email: e.target.value });
                validateEmail(e.target.value);
              }}
              onBlur={(e) => validateEmail(e.target.value)}
              placeholder="customer@example.com"
              className={cn(
                "h-12 text-base touch-manipulation border-white/30 bg-card focus:border-elec-yellow focus:ring-elec-yellow",
                !customerData.email && "pl-10",
                emailError && "border-red-500/50"
              )}
            />
            {customerData.email && !emailError && (
              <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
            )}
          </div>
          {emailError && (
            <p className="text-xs text-red-400">{emailError}</p>
          )}
        </div>

        {/* Phone Field */}
        <div className="space-y-2">
          <Label htmlFor="customer-phone" className="text-sm font-medium text-foreground">Phone</Label>
          <div className="relative">
            {!customerData.phone && (
              <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
            )}
            <Input
              id="customer-phone"
              type="tel"
              value={customerData.phone}
              onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
              placeholder="07XXX XXXXXX"
              className={cn(
                "h-12 text-base touch-manipulation border-white/30 bg-card focus:border-elec-yellow focus:ring-elec-yellow",
                !customerData.phone && "pl-10"
              )}
            />
            {customerData.phone && (
              <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500" />
            )}
          </div>
        </div>
      </div>

      {/* Additional Information Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-px flex-1 bg-border/50"></div>
          <span className="text-xs uppercase tracking-wider text-muted-foreground font-medium px-2">Additional Info</span>
          <div className="h-px flex-1 bg-border/50"></div>
        </div>

        {/* Address Field */}
        <div className="space-y-2">
          <Label htmlFor="customer-address" className="text-sm font-medium text-foreground">Address</Label>
          <div className="relative">
            {!customerData.address && (
              <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            )}
            <Textarea
              id="customer-address"
              value={customerData.address}
              onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
              placeholder="Customer address"
              rows={2}
              className={cn(
                "text-base touch-manipulation border-white/30 bg-card focus:border-elec-yellow focus:ring-elec-yellow resize-none min-h-[80px]",
                !customerData.address && "pl-10"
              )}
            />
          </div>
        </div>

        {/* Notes Field */}
        <div className="space-y-2">
          <Label htmlFor="customer-notes" className="text-sm font-medium text-foreground flex items-center justify-between">
            <span>Notes</span>
            <span className="text-xs text-muted-foreground font-normal">{customerData.notes.length}/500</span>
          </Label>
          <div className="relative">
            {!customerData.notes && (
              <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground pointer-events-none" />
            )}
            <Textarea
              id="customer-notes"
              value={customerData.notes}
              onChange={(e) => setCustomerData({ ...customerData, notes: e.target.value.slice(0, 500) })}
              placeholder="Additional notes"
              rows={2}
              maxLength={500}
              className={cn(
                "text-base touch-manipulation border-white/30 bg-card focus:border-elec-yellow focus:ring-elec-yellow resize-none min-h-[80px]",
                !customerData.notes && "pl-10"
              )}
            />
          </div>
        </div>
      </div>
    </div>
  );

  // Action buttons shared between mobile and desktop
  const ActionButtons = () => (
    <div className="flex flex-col-reverse sm:flex-row gap-3 w-full">
      <Button
        variant="outline"
        onClick={handleDecline}
        disabled={isCreating}
        className="flex-1 h-12 touch-manipulation text-base border-white/30 hover:bg-card"
      >
        <X className="h-4 w-4 mr-2" />
        No Thanks
      </Button>
      <Button
        onClick={handleConfirm}
        disabled={isCreating || !customerData.name.trim() || !!emailError}
        className="flex-1 h-12 touch-manipulation text-base bg-elec-yellow hover:bg-elec-yellow/90 text-black font-semibold"
      >
        {isCreating ? (
          <>
            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
            Creating...
          </>
        ) : (
          <>
            <Check className="h-4 w-4 mr-2" />
            Save Customer
          </>
        )}
      </Button>
    </div>
  );

  // Mobile: Bottom Sheet for native app feel
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className="h-[85vh] rounded-t-2xl p-0 flex flex-col">
          <div className="flex flex-col h-full bg-background">
            {/* Header */}
            <SheetHeader className="px-5 pt-5 pb-4 border-b border-border/50 flex-shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30">
                  <UserPlus className="h-5 w-5 text-elec-yellow" />
                </div>
                <div>
                  <SheetTitle className="text-lg font-semibold text-foreground text-left">Add Customer?</SheetTitle>
                  <SheetDescription className="text-sm text-muted-foreground text-left">
                    Save <span className="font-medium text-elec-yellow">{prefillData.name}</span> for future certificates
                  </SheetDescription>
                </div>
              </div>
            </SheetHeader>

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto overscroll-contain px-5 py-5">
              <FormContent />
            </div>

            {/* Fixed Footer */}
            <SheetFooter className="px-5 py-4 border-t border-border/50 bg-card/50 flex-shrink-0">
              <ActionButtons />
            </SheetFooter>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // Desktop: Dialog
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[85vh] flex flex-col bg-background border-border overflow-hidden">
        <DialogHeader className="space-y-3 flex-shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-elec-yellow/10 border border-elec-yellow/30">
              <UserPlus className="h-5 w-5 text-elec-yellow" />
            </div>
            <div>
              <DialogTitle className="text-xl font-semibold">Add Customer?</DialogTitle>
              <DialogDescription className="text-sm">
                Save <span className="font-medium text-elec-yellow">{prefillData.name}</span> for future certificates
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto py-4 -mx-6 px-6">
          <FormContent />
        </div>

        <DialogFooter className="flex-shrink-0 pt-4 border-t border-border/50">
          <ActionButtons />
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
