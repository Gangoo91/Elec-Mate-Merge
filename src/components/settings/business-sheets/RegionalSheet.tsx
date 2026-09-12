import React, { useEffect, useRef, useState } from 'react';
import { Sheet } from '@/components/ui/sheet';
import SettingsSheetContent from '@/components/settings/SettingsSheetContent';
import { Label } from '@/components/ui/label';
import { CompanyProfile } from '@/types/company';
import { toast } from 'sonner';
import { Eyebrow } from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { chipBase, chipOff, chipOn, labelCn } from '@/components/settings/formStyles';

const CURRENCY_OPTIONS = [
  { value: 'GBP', label: 'GBP (£)' },
  { value: 'EUR', label: 'EUR (€)' },
  { value: 'USD', label: 'USD ($)' },
];

const LOCALE_OPTIONS = [
  { value: 'en-GB', label: 'English (UK)' },
  { value: 'en-US', label: 'English (US)' },
];

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

  // Hydrate ONCE per open transition (see CompanySheet for rationale).
  const hydratedForOpenRef = useRef(false);
  useEffect(() => {
    if (!open) {
      hydratedForOpenRef.current = false;
      return;
    }
    if (hydratedForOpenRef.current) return;
    if (!profile) return;
    setCurrency(profile.currency || 'GBP');
    setLocale(profile.locale || 'en-GB');
    hydratedForOpenRef.current = true;
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
      <SettingsSheetContent className="bg-elec-dark" title="Regional settings">
        <div className="flex flex-col h-full bg-elec-dark">
          <div className="lg:hidden flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <header className="px-5 sm:px-6 lg:pt-6 pb-4">
            <Eyebrow>Localisation</Eyebrow>
            <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">
              Regional settings
            </h2>
            <p className="mt-1 text-[13px] text-white">Currency and locale preferences</p>
          </header>

          <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className={labelCn}>Currency</Label>
                <div className="flex gap-2">
                  {CURRENCY_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setCurrency(opt.value)}
                      className={cn(chipBase, currency === opt.value ? chipOn : chipOff)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-1.5">
                <Label className={labelCn}>Locale</Label>
                <div className="flex gap-2">
                  {LOCALE_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setLocale(opt.value)}
                      className={cn(chipBase, locale === opt.value ? chipOn : chipOff)}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="px-5 sm:px-6 py-4 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:bg-white/[0.08] disabled:text-white disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </SettingsSheetContent>
    </Sheet>
  );
};

export default RegionalSheet;
