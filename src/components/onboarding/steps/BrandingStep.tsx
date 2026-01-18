import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, Upload, X } from 'lucide-react';

interface StepProps {
  formData: any;
  onChange: (data: any) => void;
}

export function BrandingStep({ formData, onChange }: StepProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({ ...formData, logoFile: file });
      const reader = new FileReader();
      reader.onload = (e) => setLogoPreview(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    onChange({ ...formData, logoFile: null });
    setLogoPreview(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex p-4 rounded-2xl bg-purple-500/10 border border-purple-500/30 mb-4">
          <Sparkles className="h-10 w-10 text-purple-500" />
        </div>
        <h3 className="text-xl font-bold mb-2">Make it yours</h3>
        <p className="text-muted-foreground">
          Add your logo and brand colors (completely optional)
        </p>
      </div>

      <Card className="bg-elec-yellow/5 border-elec-yellow/20 p-4">
        <div className="flex items-start gap-3">
          <Sparkles className="h-5 w-5 text-elec-yellow shrink-0 mt-0.5" />
          <div className="text-sm">
            <p className="font-medium mb-1">Stand out with professional branding</p>
            <p className="text-muted-foreground">
              Adding your logo and brand colors makes quotes look more professional. You can always add these later in Settings.
            </p>
          </div>
        </div>
      </Card>

      <div className="space-y-6">
        <div>
          <Label className="text-base mb-3 block">Company Logo (Optional)</Label>
          {logoPreview ? (
            <div className="relative">
              <img
                src={logoPreview}
                alt="Logo preview"
                className="w-full h-48 object-contain rounded-lg border-2 border-dashed border-border bg-muted/30"
              />
              <Button
                variant="destructive"
                size="icon"
                className="absolute top-2 right-2 touch-manipulation h-11 w-11"
                onClick={removeLogo}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-border rounded-lg cursor-pointer hover:bg-muted/30 active:bg-muted/40 transition-all touch-manipulation">
              <div className="flex flex-col items-center gap-2">
                <Upload className="h-8 w-8 text-muted-foreground" />
                <span className="text-sm font-medium">Click to upload logo</span>
                <span className="text-xs text-muted-foreground">PNG, JPG up to 5MB</span>
              </div>
              <input
                type="file"
                className="hidden"
                accept="image/png,image/jpeg,image/jpg"
                onChange={handleLogoUpload}
              />
            </label>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="primary-color" className="text-base">Primary Color</Label>
            <div className="flex items-center gap-2 mt-2">
              <input
                id="primary-color"
                type="color"
                value={formData.primaryColor}
                onChange={(e) => onChange({ ...formData, primaryColor: e.target.value })}
                className="h-11 w-14 rounded border border-border cursor-pointer touch-manipulation"
              />
              <Input
                value={formData.primaryColor}
                onChange={(e) => onChange({ ...formData, primaryColor: e.target.value })}
                className="h-11 touch-manipulation"
              />
            </div>
          </div>

          <div>
            <Label htmlFor="accent-color" className="text-base">Accent Color</Label>
            <div className="flex items-center gap-2 mt-2">
              <input
                id="accent-color"
                type="color"
                value={formData.accentColor}
                onChange={(e) => onChange({ ...formData, accentColor: e.target.value })}
                className="h-11 w-14 rounded border border-border cursor-pointer touch-manipulation"
              />
              <Input
                value={formData.accentColor}
                onChange={(e) => onChange({ ...formData, accentColor: e.target.value })}
                className="h-11 touch-manipulation"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
