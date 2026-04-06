import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Coins, Loader2, CheckCircle } from 'lucide-react';
import { CompanyProfile } from '@/types/company';
import { toast } from 'sonner';

interface RegionalSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CompanyProfile | null;
  onSave: (data: Record<string, unknown>) => Promise<boolean>;
}

const RegionalSheet = ({ open, onOpenChange, profile, onSave }: RegionalSheetProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [currency, setCurrency] = useState('GBP');
  const [locale, setLocale] = useState('en-GB');

  useEffect(() => {
    if (profile && open) {
      setCurrency(profile.currency || 'GBP');
      setLocale(profile.locale || 'en-GB');
    }
  }, [profile, open]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = await onSave({ currency, locale });
      if (success) {
        toast.success('Regional settings saved');
        onOpenChange(false);
      }
    } catch {
      toast.error('Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <div className="px-5 pb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
              <Coins className="h-5 w-5 text-rose-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Regional Settings</h2>
              <p className="text-xs text-white">Currency and locale preferences</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-xs font-medium text-white uppercase tracking-wider">Currency</Label>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500 focus:ring-amber-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-medium text-white uppercase tracking-wider">Locale</Label>
                <Select value={locale} onValueChange={setLocale}>
                  <SelectTrigger className="h-11 rounded-xl bg-white/[0.03] border-white/[0.08] text-white focus:border-amber-500 focus:ring-amber-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en-GB">English (UK)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="p-4 border-t border-white/[0.06]">
            <Button
              onClick={handleSave}
              disabled={isSaving}
              className="w-full h-14 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-white font-bold text-base touch-manipulation active:scale-[0.98] shadow-lg shadow-amber-500/20"
            >
              {isSaving ? <><Loader2 className="mr-2 h-5 w-5 animate-spin" /> Saving...</> : <><CheckCircle className="mr-2 h-5 w-5" /> Save</>}
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default RegionalSheet;
