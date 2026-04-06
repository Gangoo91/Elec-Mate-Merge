import React, { useState, useEffect } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Palette, Loader2, CheckCircle } from 'lucide-react';
import { CompanyProfile } from '@/types/company';
import { toast } from 'sonner';

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
      <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
        <div className="flex flex-col h-full bg-background">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <div className="px-5 pb-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-pink-500/10 border border-pink-500/20 flex items-center justify-center">
              <Palette className="h-5 w-5 text-pink-400" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Brand Colours</h2>
              <p className="text-xs text-white">Colours used on your documents</p>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-5 pb-6 space-y-5">
            <div className="grid grid-cols-3 gap-4">
              {colours.map(({ label, value, setter }) => (
                <div key={label} className="space-y-2">
                  <Label className="text-xs font-medium text-white uppercase tracking-wider">{label}</Label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      className="w-10 h-10 rounded-lg border border-white/[0.1] cursor-pointer bg-transparent"
                    />
                    <Input
                      value={value}
                      onChange={(e) => setter(e.target.value)}
                      className="flex-1 h-11 text-[13px] font-mono rounded-xl bg-white/[0.03] border-white/[0.08] text-white uppercase focus:border-amber-500 focus:ring-amber-500"
                      maxLength={7}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Preview */}
            <div className="h-px bg-white/[0.06]" />
            <div className="space-y-2">
              <Label className="text-xs font-medium text-white uppercase tracking-wider">Preview</Label>
              <div className="flex gap-3">
                <div className="flex-1 h-16 rounded-xl" style={{ backgroundColor: primaryColor }} />
                <div className="flex-1 h-16 rounded-xl" style={{ backgroundColor: secondaryColor }} />
                <div className="flex-1 h-16 rounded-xl" style={{ backgroundColor: accentColor }} />
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

export default BrandSheet;
