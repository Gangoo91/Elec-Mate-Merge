import React, { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CompanyProfile } from '@/types/company';
import { toast } from 'sonner';
import { Eyebrow } from '@/components/college/primitives';

interface BrandSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CompanyProfile | null;
  onSave: (data: Record<string, unknown>) => Promise<boolean>;
}

const BrandSheet = ({ open, onOpenChange, profile, onSave }: BrandSheetProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [primaryColor, setPrimaryColor] = useState('#FFCC00');
  const [secondaryColor, setSecondaryColor] = useState('#1A1A1A');
  const [accentColor, setAccentColor] = useState('#F59E0B');

  useEffect(() => {
    if (profile && open) {
      setPrimaryColor(profile.primary_color || '#FFCC00');
      setSecondaryColor(profile.secondary_color || '#1A1A1A');
      setAccentColor(profile.accent_color || '#F59E0B');
    }
  }, [profile, open]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const success = await onSave({
        primary_color: primaryColor,
        secondary_color: secondaryColor,
        accent_color: accentColor,
      });
      if (success) {
        toast.success('Brand colours saved');
        onOpenChange(false);
      }
    } catch {
      toast.error('Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  const colours = [
    { label: 'Primary', value: primaryColor, setter: setPrimaryColor },
    { label: 'Secondary', value: secondaryColor, setter: setSecondaryColor },
    { label: 'Accent', value: accentColor, setter: setAccentColor },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.06] bg-[#0a0a0a]"
      >
        <div className="flex flex-col h-full bg-[#0a0a0a]">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <header className="px-5 sm:px-6 pb-4">
            <Eyebrow>Identity</Eyebrow>
            <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">
              Brand colours
            </h2>
            <p className="mt-1 text-[13px] text-white">Colours used on your documents</p>
          </header>

          <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6 space-y-5">
            <div className="grid grid-cols-3 gap-4">
              {colours.map(({ label, value, setter }) => (
                <div key={label} className="space-y-2">
                  <Label className="text-white font-medium text-[13px]">{label}</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      className="w-11 h-11 rounded-xl border border-white/[0.08] cursor-pointer bg-transparent touch-manipulation"
                    />
                    <Input
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      className="flex-1 h-11 text-[13px] font-mono rounded-xl bg-[#0a0a0a] border-white/[0.08] text-white uppercase focus:border-elec-yellow focus:ring-0 touch-manipulation"
                      maxLength={7}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="h-px bg-white/[0.06]" />

            <div className="space-y-2">
              <Eyebrow>Preview</Eyebrow>
              <div className="flex gap-3">
                <div
                  className="flex-1 h-16 rounded-2xl"
                  style={{ backgroundColor: primaryColor }}
                />
                <div
                  className="flex-1 h-16 rounded-2xl"
                  style={{ backgroundColor: secondaryColor }}
                />
                <div
                  className="flex-1 h-16 rounded-2xl"
                  style={{ backgroundColor: accentColor }}
                />
              </div>
            </div>
          </div>

          <div className="px-5 sm:px-6 py-4 border-t border-white/[0.06]">
            <button
              type="button"
              onClick={handleSave}
              disabled={isSaving}
              className="w-full h-12 rounded-xl bg-elec-yellow text-black font-semibold text-[14px] hover:bg-elec-yellow/90 transition-colors touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Saving…' : 'Save'}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BrandSheet;
