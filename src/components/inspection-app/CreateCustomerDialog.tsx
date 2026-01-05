import React, { useState } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { UserPlus, User, Mail, Phone, MapPin, FileText, Check, X, Loader2 } from 'lucide-react';

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
  const [customerData, setCustomerData] = useState({
    name: prefillData.name || '',
    email: prefillData.email || '',
    phone: prefillData.phone || '',
    address: prefillData.address || '',
    notes: `Created from certificate`,
  });
  const [isCreating, setIsCreating] = useState(false);
  const [emailError, setEmailError] = useState('');

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

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-[100vw] sm:max-w-md h-[100vh] sm:h-auto sm:max-h-[90vh] overflow-y-auto bg-[#0A0F1E]/98 backdrop-blur-xl border-slate-800/50 shadow-2xl shadow-black/50 animate-in fade-in-0 zoom-in-95 duration-300">
        <AlertDialogHeader className="space-y-3 pb-2">
          <div className="flex items-center gap-3 text-elec-yellow">
            <div className="p-2.5 rounded-xl bg-gradient-to-br from-elec-yellow/20 to-elec-yellow/5 border border-elec-yellow/30 shadow-lg shadow-elec-yellow/10 animate-pulse">
              <UserPlus className="h-6 w-6 sm:h-5 sm:w-5" />
            </div>
            <AlertDialogTitle className="text-xl sm:text-2xl font-semibold">Add Customer?</AlertDialogTitle>
          </div>
          <AlertDialogDescription className="text-slate-300 text-base leading-relaxed">
            Would you like to save <span className="font-semibold text-elec-yellow">{prefillData.name}</span> as a customer for future certificates?
          </AlertDialogDescription>
        </AlertDialogHeader>
        
        <div className="relative">
          <div className="absolute -left-4 -right-4 h-px bg-gradient-to-r from-transparent via-elec-yellow/30 to-transparent"></div>
        </div>
        
        <div className="space-y-4 sm:space-y-3 py-5 sm:py-4">
          {/* Name Field */}
          <div className="space-y-2 animate-in fade-in-0 slide-in-from-bottom-2 duration-300">
            <Label htmlFor="customer-name" className="text-slate-200 text-sm font-medium flex items-center gap-1">
              Name <span className="text-elec-yellow">*</span>
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none z-10" />
              <Input
                id="customer-name"
                value={customerData.name}
                onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                placeholder="Customer name"
                className="pl-10 bg-[#0F1629]/80 border-slate-700/50 hover:border-elec-yellow/50 focus:border-elec-yellow focus:shadow-lg focus:shadow-elec-yellow/20 focus:scale-[1.002] transition-all duration-200 h-12 sm:h-10"
                aria-required="true"
              />
              {customerData.name.trim() && (
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500 animate-in fade-in-0 zoom-in-95 duration-200" />
              )}
            </div>
          </div>

          {/* Contact Details Section */}
          <div className="relative pt-3">
            <div className="absolute -left-4 -right-4 top-0 h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent"></div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-3 flex items-center gap-2">
              <div className="h-px w-8 bg-gradient-to-r from-elec-yellow/50 to-transparent"></div>
              Contact Details
            </div>

            <div className="space-y-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-100">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="customer-email" className="text-slate-200 text-sm font-medium">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none z-10" />
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
                    className={`pl-10 bg-[#0F1629]/80 border-slate-700/50 hover:border-elec-yellow/50 focus:border-elec-yellow focus:shadow-lg focus:shadow-elec-yellow/20 focus:scale-[1.002] transition-all duration-200 h-12 sm:h-10 ${emailError ? 'border-red-500/50 animate-shake' : ''}`}
                    aria-invalid={!!emailError}
                    aria-describedby={emailError ? 'email-error' : undefined}
                  />
                  {customerData.email && !emailError && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500 animate-in fade-in-0 zoom-in-95 duration-200" />
                  )}
                </div>
                {emailError && (
                  <p id="email-error" className="text-xs text-red-400 animate-in fade-in-0 slide-in-from-top-1 duration-200">{emailError}</p>
                )}
              </div>

              {/* Phone Field */}
              <div className="space-y-2">
                <Label htmlFor="customer-phone" className="text-slate-200 text-sm font-medium">Phone</Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 pointer-events-none z-10" />
                  <Input
                    id="customer-phone"
                    type="tel"
                    value={customerData.phone}
                    onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                    placeholder="07XXX XXXXXX"
                    className="pl-10 bg-[#0F1629]/80 border-slate-700/50 hover:border-elec-yellow/50 focus:border-elec-yellow focus:shadow-lg focus:shadow-elec-yellow/20 focus:scale-[1.002] transition-all duration-200 h-12 sm:h-10"
                  />
                  {customerData.phone && (
                    <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-green-500 animate-in fade-in-0 zoom-in-95 duration-200" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Additional Information Section */}
          <div className="relative pt-3">
            <div className="absolute -left-4 -right-4 top-0 h-px bg-gradient-to-r from-transparent via-slate-700/30 to-transparent"></div>
            <div className="text-xs uppercase tracking-wider text-slate-400 font-medium mb-3 flex items-center gap-2">
              <div className="h-px w-8 bg-gradient-to-r from-elec-yellow/50 to-transparent"></div>
              Additional Information
            </div>

            <div className="space-y-3 animate-in fade-in-0 slide-in-from-bottom-2 duration-300 delay-200">
              {/* Address Field */}
              <div className="space-y-2">
                <Label htmlFor="customer-address" className="text-slate-200 text-sm font-medium">Address</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-3 h-4 w-4 text-slate-400 pointer-events-none z-10" />
                  <Textarea
                    id="customer-address"
                    value={customerData.address}
                    onChange={(e) => setCustomerData({ ...customerData, address: e.target.value })}
                    placeholder="Customer address"
                    rows={2}
                    className="pl-10 bg-[#0F1629]/80 border-slate-700/50 hover:border-elec-yellow/50 focus:border-elec-yellow focus:shadow-lg focus:shadow-elec-yellow/20 focus:scale-[1.002] transition-all duration-200 resize-none"
                  />
                </div>
              </div>

              {/* Notes Field */}
              <div className="space-y-2">
                <Label htmlFor="customer-notes" className="text-slate-200 text-sm font-medium flex items-center justify-between">
                  <span>Notes</span>
                  <span className="text-xs text-slate-400 font-normal">{customerData.notes.length}/500</span>
                </Label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 h-4 w-4 text-slate-400 pointer-events-none z-10" />
                  <Textarea
                    id="customer-notes"
                    value={customerData.notes}
                    onChange={(e) => setCustomerData({ ...customerData, notes: e.target.value.slice(0, 500) })}
                    placeholder="Additional notes"
                    rows={2}
                    maxLength={500}
                    className="pl-10 bg-[#0F1629]/80 border-slate-700/50 hover:border-elec-yellow/50 focus:border-elec-yellow focus:shadow-lg focus:shadow-elec-yellow/20 focus:scale-[1.002] transition-all duration-200 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <AlertDialogFooter className="flex-col sm:flex-row gap-3 sm:gap-2 pt-4">
          <AlertDialogCancel 
            disabled={isCreating}
            className="w-full sm:w-auto order-2 sm:order-1 h-12 sm:h-10 bg-[#0F1629]/80 hover:bg-[#0F1629] border-slate-700/50 hover:border-slate-600 text-slate-200 transition-all duration-200 touch-manipulation active:scale-95"
          >
            <X className="h-4 w-4 mr-2" />
            No, Just the Certificate
          </AlertDialogCancel>
          <AlertDialogAction 
            onClick={handleConfirm} 
            disabled={isCreating || !customerData.name.trim() || !!emailError}
            className="w-full sm:w-auto order-1 sm:order-2 h-12 sm:h-10 bg-gradient-to-r from-elec-yellow to-elec-yellow/90 hover:from-elec-yellow/90 hover:to-elec-yellow text-black font-semibold shadow-lg shadow-elec-yellow/20 hover:shadow-elec-yellow/30 transition-all duration-200 touch-manipulation active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none"
          >
            {isCreating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating...
              </>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Yes, Create Customer
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};
