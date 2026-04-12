import { useState } from 'react';

interface StepProps {
  formData: {
    primaryColor: string;
    accentColor: string;
    logoFile: File | null;
    [key: string]: unknown;
  };
  onChange: (data: Record<string, unknown>) => void;
}

export function BrandingStep({ formData, onChange }: StepProps) {
  const [logoPreview, setLogoPreview] = useState<string | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onChange({ ...formData, logoFile: file });
      const reader = new FileReader();
      reader.onload = (ev) => setLogoPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const removeLogo = () => {
    onChange({ ...formData, logoFile: null });
    setLogoPreview(null);
  };

  const hexInputClass =
    'h-12 w-full touch-manipulation rounded-2xl border border-white/[0.12] bg-white/[0.04] px-5 text-[16px] text-white placeholder:text-white/40 outline-none transition-all duration-150 focus:border-yellow-400/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-yellow-400/20';

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[1.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[1.75rem]">
          Make it <span className="text-yellow-400">yours.</span>
        </h3>
        <p className="mt-2 text-[14px] leading-[1.6] text-white sm:text-[15px]">
          Add your logo and brand colours so your quotes and invoices feel like you. Optional.
        </p>
      </div>

      {/* Logo upload */}
      <div>
        <label className="mb-2 block text-[13px] font-medium text-white">
          Company logo (optional)
        </label>
        {logoPreview ? (
          <div className="relative">
            <div className="flex h-44 w-full items-center justify-center rounded-2xl border border-white/[0.12] bg-white/[0.04] p-4">
              <img
                src={logoPreview}
                alt="Logo preview"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <button
              type="button"
              onClick={removeLogo}
              className="absolute right-3 top-3 h-9 touch-manipulation rounded-xl border border-white/[0.12] bg-black/70 px-3 text-[12px] font-medium text-white transition-colors hover:bg-black/90 hover:text-yellow-400"
            >
              Remove
            </button>
          </div>
        ) : (
          <label className="flex h-44 w-full cursor-pointer touch-manipulation flex-col items-center justify-center rounded-2xl border border-white/[0.12] bg-white/[0.04] text-center transition-colors hover:border-yellow-400/40 hover:bg-white/[0.06]">
            <span className="text-[14px] font-semibold text-white">Click to upload logo</span>
            <span className="mt-1 text-[12px] text-white">PNG or JPG, up to 5MB</span>
            <input
              type="file"
              className="hidden"
              accept="image/png,image/jpeg,image/jpg"
              onChange={handleLogoUpload}
            />
          </label>
        )}
      </div>

      {/* Colours */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="primary-color" className="mb-2 block text-[13px] font-medium text-white">
            Primary colour
          </label>
          <div className="flex items-center gap-3">
            <input
              id="primary-color"
              type="color"
              value={formData.primaryColor}
              onChange={(e) => onChange({ ...formData, primaryColor: e.target.value })}
              className="h-12 w-14 cursor-pointer touch-manipulation rounded-2xl border border-white/[0.12] bg-white/[0.04]"
            />
            <input
              type="text"
              value={formData.primaryColor}
              onChange={(e) => onChange({ ...formData, primaryColor: e.target.value })}
              className={hexInputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="accent-color" className="mb-2 block text-[13px] font-medium text-white">
            Accent colour
          </label>
          <div className="flex items-center gap-3">
            <input
              id="accent-color"
              type="color"
              value={formData.accentColor}
              onChange={(e) => onChange({ ...formData, accentColor: e.target.value })}
              className="h-12 w-14 cursor-pointer touch-manipulation rounded-2xl border border-white/[0.12] bg-white/[0.04]"
            />
            <input
              type="text"
              value={formData.accentColor}
              onChange={(e) => onChange({ ...formData, accentColor: e.target.value })}
              className={hexInputClass}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
