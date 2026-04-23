import React, { useEffect, useRef, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { PlacesAutocomplete } from '@/components/ui/PlacesAutocomplete';
import { CompanyProfile } from '@/types/company';
import { toast } from 'sonner';
import { Eyebrow } from '@/components/college/primitives';

interface CompanySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  profile: CompanyProfile | null;
  onSave: (data: Record<string, unknown>) => Promise<boolean>;
  uploadLogo: (file: File) => Promise<{ url?: string; dataUrl?: string } | null>;
}

const CompanySheet = ({
  open,
  onOpenChange,
  profile,
  onSave,
  uploadLogo,
}: CompanySheetProps) => {
  const [isSaving, setIsSaving] = useState(false);
  const [companyName, setCompanyName] = useState('');
  const [companyEmail, setCompanyEmail] = useState('');
  const [companyPhone, setCompanyPhone] = useState('');
  const [companyWebsite, setCompanyWebsite] = useState('');
  const [vatNumber, setVatNumber] = useState('');
  const [companyAddress, setCompanyAddress] = useState('');
  const [companyPostcode, setCompanyPostcode] = useState('');
  const [companyRegistration, setCompanyRegistration] = useState('');
  const [officeLat, setOfficeLat] = useState<number | null>(null);
  const [officeLng, setOfficeLng] = useState<number | null>(null);

  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState<'small' | 'medium' | 'large'>('medium');
  const [deleteLogo, setDeleteLogo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (profile && open) {
      setCompanyName(profile.company_name || '');
      setCompanyEmail(profile.company_email || '');
      setCompanyPhone(profile.company_phone || '');
      setCompanyWebsite(profile.company_website || '');
      setVatNumber(profile.vat_number || '');
      setCompanyAddress(profile.company_address || '');
      setCompanyPostcode(profile.company_postcode || '');
      setCompanyRegistration(profile.company_registration || '');
      setOfficeLat(profile.office_lat || null);
      setOfficeLng(profile.office_lng || null);
      setLogoPreview(profile.logo_url || null);
      setLogoSize((profile as any).logo_size || 'medium');
      setLogoFile(null);
      setDeleteLogo(false);
    }
  }, [profile, open]);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const maxSize = 20 * 1024 * 1024;
      if (file.size > maxSize) {
        toast.error('Logo must be under 20MB');
        return;
      }
      setLogoFile(file);
      setDeleteLogo(false);
      const reader = new FileReader();
      reader.onload = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
    event.target.value = '';
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      let logoData: Record<string, string | null> = {};

      if (deleteLogo) {
        logoData = { logo_url: null, logo_data_url: null };
      } else if (logoFile) {
        const uploadResult = await uploadLogo(logoFile);
        if (uploadResult) {
          logoData = {
            logo_url: uploadResult.url || null,
            logo_data_url: uploadResult.dataUrl || null,
          };
          setLogoFile(null);
        } else {
          setIsSaving(false);
          return;
        }
      }

      const success = await onSave({
        company_name: companyName,
        company_email: companyEmail,
        company_phone: companyPhone,
        company_website: companyWebsite,
        vat_number: vatNumber,
        company_address: companyAddress,
        company_postcode: companyPostcode,
        company_registration: companyRegistration,
        office_lat: officeLat,
        office_lng: officeLng,
        logo_size: logoSize,
        ...logoData,
      });

      if (success) {
        toast.success('Company details saved');
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
      <SheetContent
        side="bottom"
        className="h-[85vh] p-0 rounded-t-2xl overflow-hidden border-white/[0.06] bg-[#0a0a0a]"
      >
        <div className="flex flex-col h-full bg-[#0a0a0a]">
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-white/20" />
          </div>

          <header className="px-5 sm:px-6 pb-4">
            <Eyebrow>Business</Eyebrow>
            <h2 className="mt-1.5 text-xl font-semibold text-white tracking-tight">
              Company identity
            </h2>
            <p className="mt-1 text-[13px] text-white">Name, logo and contact details</p>
          </header>

          <div className="flex-1 overflow-y-auto px-5 sm:px-6 pb-6 space-y-6">
            {/* Logo */}
            <div className="space-y-4">
              <Eyebrow>Company logo</Eyebrow>
              <div className="flex items-start gap-4">
                <div
                  className={cn(
                    'rounded-2xl bg-[#0a0a0a] border border-white/[0.08] flex items-center justify-center overflow-hidden flex-shrink-0',
                    logoSize === 'small' && 'w-16 h-16',
                    logoSize === 'medium' && 'w-20 h-20',
                    logoSize === 'large' && 'w-28 h-28'
                  )}
                >
                  {logoPreview ? (
                    <img
                      loading="lazy"
                      src={logoPreview}
                      alt="Logo"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <span className="text-[11px] uppercase tracking-[0.18em] text-white">
                      Logo
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="cursor-pointer inline-block">
                    <div className="h-11 px-4 rounded-xl bg-elec-yellow text-black text-[13px] font-semibold flex items-center justify-center hover:bg-elec-yellow/90 transition-colors touch-manipulation">
                      {logoPreview ? 'Change logo' : 'Upload logo'}
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/png,image/jpeg,image/jpg,image/webp,.heic,.heif"
                      onChange={handleLogoChange}
                      className="hidden"
                    />
                  </label>
                  {logoPreview && (
                    <button
                      type="button"
                      onClick={() => {
                        setLogoPreview(null);
                        setLogoFile(null);
                        setDeleteLogo(true);
                      }}
                      className="h-11 px-4 rounded-xl border border-red-500/30 text-red-400 text-[13px] font-medium hover:bg-red-500/10 transition-colors touch-manipulation"
                    >
                      Delete logo
                    </button>
                  )}
                  {logoFile && (
                    <p className="text-[11.5px] text-elec-yellow font-medium px-1">
                      New logo ready — save to apply
                    </p>
                  )}
                  <p className="text-[11px] text-white px-1">PNG, JPG or HEIC, max 20MB</p>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-white font-medium text-[12px]">
                  Logo size on documents
                </Label>
                <div className="flex gap-2">
                  {(['small', 'medium', 'large'] as const).map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setLogoSize(size)}
                      className={cn(
                        'flex-1 h-11 rounded-xl text-[13px] font-medium capitalize transition-colors touch-manipulation border',
                        logoSize === size
                          ? 'bg-elec-yellow text-black border-elec-yellow'
                          : 'bg-[#0a0a0a] text-white border-white/[0.08] hover:bg-[hsl(0_0%_15%)]'
                      )}
                      aria-pressed={logoSize === size}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* Company name */}
            <div className="space-y-1.5">
              <Label className="text-white font-medium text-[13px]">
                Company name <span className="text-red-400">*</span>
              </Label>
              <Input
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="ABC Electrical Ltd"
                className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
              />
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* Contact grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-white font-medium text-[13px]">Email</Label>
                <Input
                  value={companyEmail}
                  onChange={(e) => setCompanyEmail(e.target.value)}
                  type="email"
                  placeholder="info@company.com"
                  className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white font-medium text-[13px]">Phone</Label>
                <Input
                  value={companyPhone}
                  onChange={(e) => setCompanyPhone(e.target.value)}
                  placeholder="0123 456 7890"
                  className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white font-medium text-[13px]">Website</Label>
                <Input
                  value={companyWebsite}
                  onChange={(e) => setCompanyWebsite(e.target.value)}
                  placeholder="www.company.com"
                  className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white font-medium text-[13px]">VAT number</Label>
                <Input
                  value={vatNumber}
                  onChange={(e) => setVatNumber(e.target.value)}
                  placeholder="GB123456789"
                  className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                />
              </div>
            </div>

            <div className="h-px bg-white/[0.06]" />

            {/* Address */}
            <div className="space-y-1.5">
              <Label className="text-white font-medium text-[13px]">Business address</Label>
              <PlacesAutocomplete
                value={companyAddress}
                onChange={(value) => setCompanyAddress(value)}
                onPlaceSelect={(place) => {
                  setCompanyAddress(place.address);
                  setOfficeLat(place.lat);
                  setOfficeLng(place.lng);
                }}
                placeholder="Start typing your address…"
                className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
              />
              {officeLat && officeLng && (
                <div className="pt-1">
                  <span className="text-[11px] font-medium uppercase tracking-[0.15em] text-emerald-400">
                    Location saved
                  </span>
                </div>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <Label className="text-white font-medium text-[13px]">Postcode</Label>
                <Input
                  value={companyPostcode}
                  onChange={(e) => setCompanyPostcode(e.target.value)}
                  placeholder="AB1 2CD"
                  className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-white font-medium text-[13px]">Company reg</Label>
                <Input
                  value={companyRegistration}
                  onChange={(e) => setCompanyRegistration(e.target.value)}
                  placeholder="12345678"
                  className="h-11 bg-[#0a0a0a] border-white/[0.08] text-white focus:border-elec-yellow focus:ring-0 touch-manipulation"
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

export default CompanySheet;
