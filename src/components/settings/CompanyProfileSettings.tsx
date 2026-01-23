import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useNotifications } from '@/components/notifications/NotificationProvider';
import { cn } from '@/lib/utils';
import {
  Building2,
  Upload,
  Image,
  Mail,
  Phone,
  Globe,
  FileText,
  Palette,
  Coins,
  MapPin,
  Loader2,
  CheckCircle,
  PoundSterling,
  Users,
  Shield,
  Award,
  Calendar,
  Pen,
  Check,
} from 'lucide-react';
import { WorkerRates } from '@/types/company';
import SignatureInput from '@/components/signature/SignatureInput';

// Default worker rates matching preset data
const defaultWorkerRates: WorkerRates = {
  electrician: 45,
  apprentice: 25,
  labourer: 20,
  designer: 65,
  owner: 75,
};

// Worker type labels for display
const workerTypeLabels: Record<keyof WorkerRates, { name: string; description: string }> = {
  electrician: { name: 'Qualified Electrician', description: 'Fully qualified electrician' },
  apprentice: { name: 'Apprentice', description: 'Apprentice electrician under supervision' },
  labourer: { name: 'General Labourer', description: 'General building labourer' },
  designer: { name: 'Electrical Designer', description: 'Design and planning specialist' },
  owner: { name: 'Business Owner', description: 'Business owner / senior electrician' },
};

// Available qualifications for inspector
const availableQualifications = [
  '18th Edition BS7671',
  'City & Guilds 2391-52',
  'City & Guilds 2391-51',
  'NICEIC Approved',
  'NAPIT Registered',
  'ECA Member',
  'JIB Approved',
  'CompEx Certified',
];

// Registration schemes
const registrationSchemes = [
  { value: 'NICEIC', label: 'NICEIC' },
  { value: 'NAPIT', label: 'NAPIT' },
  { value: 'ELECSA', label: 'ELECSA' },
  { value: 'STROMA', label: 'STROMA' },
  { value: 'BRE', label: 'BRE' },
  { value: 'other', label: 'Other' },
];

interface CompanyProfileFormData {
  company_name: string;
  company_address: string;
  company_postcode: string;
  company_phone: string;
  company_email: string;
  company_website: string;
  company_registration: string;
  vat_number: string;
  primary_color: string;
  secondary_color: string;
  currency: string;
  locale: string;
  payment_terms: string;
  hourly_rate: number;
  // Worker rates
  worker_rates: WorkerRates;
  // Inspector details
  inspector_name: string;
  inspector_qualifications: string[];
  registration_scheme: string;
  registration_number: string;
  registration_expiry: string;
  insurance_provider: string;
  insurance_policy_number: string;
  insurance_coverage: string;
  insurance_expiry: string;
  signature_data: string;
}

export const CompanyProfileSettings = () => {
  const { companyProfile, loading, saveCompanyProfile, uploadLogo } = useCompanyProfile();
  const { addNotification } = useNotifications();
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(companyProfile?.logo_url || null);
  const [uploading, setUploading] = useState(false);

  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<CompanyProfileFormData>({
    defaultValues: {
      company_name: companyProfile?.company_name || '',
      company_address: companyProfile?.company_address || '',
      company_postcode: companyProfile?.company_postcode || '',
      company_phone: companyProfile?.company_phone || '',
      company_email: companyProfile?.company_email || '',
      company_website: companyProfile?.company_website || '',
      company_registration: companyProfile?.company_registration || '',
      vat_number: companyProfile?.vat_number || '',
      primary_color: companyProfile?.primary_color || '#1e40af',
      secondary_color: companyProfile?.secondary_color || '#3b82f6',
      currency: companyProfile?.currency || 'GBP',
      locale: companyProfile?.locale || 'en-GB',
      payment_terms: companyProfile?.payment_terms || '30 days',
      hourly_rate: companyProfile?.hourly_rate || 45,
      worker_rates: companyProfile?.worker_rates || defaultWorkerRates,
      inspector_name: companyProfile?.inspector_name || '',
      inspector_qualifications: companyProfile?.inspector_qualifications || [],
      registration_scheme: companyProfile?.registration_scheme || '',
      registration_number: companyProfile?.registration_number || '',
      registration_expiry: companyProfile?.registration_expiry || '',
      insurance_provider: companyProfile?.insurance_provider || '',
      insurance_policy_number: companyProfile?.insurance_policy_number || '',
      insurance_coverage: companyProfile?.insurance_coverage || '',
      insurance_expiry: companyProfile?.insurance_expiry || '',
      signature_data: companyProfile?.signature_data || '',
    }
  });

  React.useEffect(() => {
    if (companyProfile) {
      setValue('company_name', companyProfile.company_name);
      setValue('company_address', companyProfile.company_address || '');
      setValue('company_postcode', companyProfile.company_postcode || '');
      setValue('company_phone', companyProfile.company_phone || '');
      setValue('company_email', companyProfile.company_email || '');
      setValue('company_website', companyProfile.company_website || '');
      setValue('company_registration', companyProfile.company_registration || '');
      setValue('vat_number', companyProfile.vat_number || '');
      setValue('primary_color', companyProfile.primary_color);
      setValue('secondary_color', companyProfile.secondary_color);
      setValue('currency', companyProfile.currency);
      setValue('locale', companyProfile.locale);
      setValue('payment_terms', companyProfile.payment_terms);
      setValue('hourly_rate', companyProfile.hourly_rate || 45);
      setValue('worker_rates', companyProfile.worker_rates || defaultWorkerRates);
      setValue('inspector_name', companyProfile.inspector_name || '');
      setValue('inspector_qualifications', companyProfile.inspector_qualifications || []);
      setValue('registration_scheme', companyProfile.registration_scheme || '');
      setValue('registration_number', companyProfile.registration_number || '');
      setValue('registration_expiry', companyProfile.registration_expiry || '');
      setValue('insurance_provider', companyProfile.insurance_provider || '');
      setValue('insurance_policy_number', companyProfile.insurance_policy_number || '');
      setValue('insurance_coverage', companyProfile.insurance_coverage || '');
      setValue('insurance_expiry', companyProfile.insurance_expiry || '');
      setValue('signature_data', companyProfile.signature_data || '');
      setLogoPreview(companyProfile.logo_url || null);
    }
  }, [companyProfile, setValue]);

  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setLogoFile(file);
      const reader = new FileReader();
      reader.onload = () => setLogoPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: CompanyProfileFormData) => {
    let logoData = {};

    if (logoFile) {
      setUploading(true);
      const uploadResult = await uploadLogo(logoFile);
      setUploading(false);

      if (uploadResult) {
        logoData = {
          logo_url: uploadResult.url,
          logo_data_url: uploadResult.dataUrl,
        };
      }
    }

    await saveCompanyProfile({
      ...data,
      ...logoData,
      // Ensure worker_rates is saved
      worker_rates: data.worker_rates || defaultWorkerRates,
      // Ensure inspector details are saved
      inspector_name: data.inspector_name || undefined,
      inspector_qualifications: data.inspector_qualifications?.length > 0 ? data.inspector_qualifications : undefined,
      registration_scheme: data.registration_scheme || undefined,
      registration_number: data.registration_number || undefined,
      registration_expiry: data.registration_expiry || undefined,
      insurance_provider: data.insurance_provider || undefined,
      insurance_policy_number: data.insurance_policy_number || undefined,
      insurance_coverage: data.insurance_coverage || undefined,
      insurance_expiry: data.insurance_expiry || undefined,
      signature_data: data.signature_data || undefined,
    });

    addNotification({
      title: 'Profile Saved',
      message: 'Your company profile has been updated',
      type: 'success'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
        <div className="p-4 md:p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-elec-yellow/10 flex items-center justify-center">
              <Building2 className="h-6 w-6 text-elec-yellow" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Company Profile</h3>
              <p className="text-sm text-muted-foreground">
                Configure your company details for professional quotes and documents
              </p>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Logo Section */}
        <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-white/10">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Image className="h-4 w-4 text-elec-yellow" />
              Company Logo
            </h3>
          </div>
          <div className="p-4 md:p-6">
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {/* Logo Preview */}
              <div className="w-24 h-24 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden">
                {logoPreview ? (
                  <img
                    src={logoPreview}
                    alt="Company logo"
                    className="h-full w-full object-contain"
                  />
                ) : (
                  <Building2 className="h-10 w-10 text-muted-foreground" />
                )}
              </div>

              {/* Upload */}
              <div className="flex-1">
                <Label
                  htmlFor="logo-upload"
                  className="flex items-center justify-center gap-2 p-4 rounded-lg bg-white/5 border border-dashed border-white/20 cursor-pointer hover:bg-white/10 active:bg-white/15 transition-all touch-manipulation"
                >
                  <Upload className="h-5 w-5 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Click to upload logo</span>
                </Label>
                <Input
                  id="logo-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                />
                <p className="text-xs text-muted-foreground mt-2">
                  PNG or JPG, max 2MB, square format recommended
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Company Details */}
        <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-white/10">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <FileText className="h-4 w-4 text-elec-yellow" />
              Business Details
            </h3>
          </div>
          <div className="p-4 md:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">Company Name *</Label>
                <Input
                  {...register('company_name', { required: 'Company name is required' })}
                  placeholder="Your Company Ltd"
                  className="bg-white/5 border-white/10"
                />
                {errors.company_name && (
                  <p className="text-xs text-red-400">{errors.company_name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Company Email</Label>
                <div className="relative">
                  {!watch('company_email') && (
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  )}
                  <Input
                    type="email"
                    {...register('company_email')}
                    placeholder="info@company.com"
                    className={cn("bg-white/5 border-white/10", !watch('company_email') && "pl-10")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Phone Number</Label>
                <div className="relative">
                  {!watch('company_phone') && (
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  )}
                  <Input
                    {...register('company_phone')}
                    placeholder="0123 456 7890"
                    className={cn("bg-white/5 border-white/10", !watch('company_phone') && "pl-10")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Website</Label>
                <div className="relative">
                  {!watch('company_website') && (
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  )}
                  <Input
                    {...register('company_website')}
                    placeholder="www.company.com"
                    className={cn("bg-white/5 border-white/10", !watch('company_website') && "pl-10")}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">Company Registration</Label>
                <Input
                  {...register('company_registration')}
                  placeholder="12345678"
                  className="bg-white/5 border-white/10"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-foreground">VAT Number</Label>
                <Input
                  {...register('vat_number')}
                  placeholder="GB123456789"
                  className="bg-white/5 border-white/10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-white/10">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <MapPin className="h-4 w-4 text-elec-yellow" />
              Business Address
            </h3>
          </div>
          <div className="p-4 md:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label className="text-foreground">Address</Label>
                <Textarea
                  {...register('company_address')}
                  placeholder="123 Business Street, Business Park"
                  rows={3}
                  className="bg-white/5 border-white/10 resize-none"
                />
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Postcode</Label>
                <Input
                  {...register('company_postcode')}
                  placeholder="AB1 2CD"
                  className="bg-white/5 border-white/10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-white/10">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Palette className="h-4 w-4 text-elec-yellow" />
              Brand Colors
            </h3>
          </div>
          <div className="p-4 md:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">Primary Color</Label>
                <div className="flex gap-2">
                  <div className="relative">
                    <Input
                      type="color"
                      {...register('primary_color')}
                      className="w-14 h-10 p-1 cursor-pointer bg-transparent border-white/10 rounded-lg"
                    />
                  </div>
                  <Input
                    {...register('primary_color')}
                    placeholder="#1e40af"
                    className="flex-1 bg-white/5 border-white/10 font-mono"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Secondary Color</Label>
                <div className="flex gap-2">
                  <Input
                    type="color"
                    {...register('secondary_color')}
                    className="w-14 h-10 p-1 cursor-pointer bg-transparent border-white/10 rounded-lg"
                  />
                  <Input
                    {...register('secondary_color')}
                    placeholder="#3b82f6"
                    className="flex-1 bg-white/5 border-white/10 font-mono"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Settings */}
        <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-white/10">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <PoundSterling className="h-4 w-4 text-elec-yellow" />
              Pricing Settings
            </h3>
          </div>
          <div className="p-4 md:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">Hourly Rate (£)</Label>
                <div className="relative">
                  <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                  <Input
                    type="number"
                    step="0.50"
                    min="0"
                    {...register('hourly_rate', { valueAsNumber: true })}
                    placeholder="45.00"
                    className="bg-white/5 border-white/10 pl-10"
                  />
                </div>
                <p className="text-xs text-muted-foreground">
                  Your default hourly rate for quotes and invoices
                </p>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Payment Terms</Label>
                <Input
                  {...register('payment_terms')}
                  placeholder="30 days"
                  className="bg-white/5 border-white/10"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Worker Hourly Rates */}
        <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-white/10">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Users className="h-4 w-4 text-elec-yellow" />
              Worker Hourly Rates
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              These rates are used as defaults in quotes and invoices
            </p>
          </div>
          <div className="p-4 md:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(Object.keys(workerTypeLabels) as Array<keyof WorkerRates>).map((workerKey) => {
                const worker = workerTypeLabels[workerKey];
                const rates = watch('worker_rates') || defaultWorkerRates;
                return (
                  <div key={workerKey} className="space-y-2">
                    <Label className="text-foreground">{worker.name}</Label>
                    <div className="relative">
                      <PoundSterling className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input
                        type="number"
                        step="0.50"
                        min="0"
                        value={rates[workerKey] || defaultWorkerRates[workerKey]}
                        onChange={(e) => {
                          const newRates = { ...rates, [workerKey]: parseFloat(e.target.value) || 0 };
                          setValue('worker_rates', newRates);
                        }}
                        className="bg-white/5 border-white/10 pl-10"
                      />
                    </div>
                    <p className="text-xs text-muted-foreground">{worker.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Inspector Details for Certificates */}
        <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-white/10">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Shield className="h-4 w-4 text-elec-yellow" />
              Inspector Details for Certificates
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              Auto-fills EICR, EIC, and Minor Works forms
            </p>
          </div>
          <div className="p-4 md:p-6 space-y-6">
            {/* Inspector Name */}
            <div className="space-y-2">
              <Label className="text-foreground">Inspector Name</Label>
              <Input
                {...register('inspector_name')}
                placeholder="Full name of the inspector"
                className="bg-white/5 border-white/10"
              />
            </div>

            {/* Qualifications */}
            <div className="space-y-3">
              <Label className="text-foreground flex items-center gap-2">
                <Award className="h-4 w-4 text-elec-yellow" />
                Qualifications
              </Label>
              <p className="text-xs text-muted-foreground">Tap to select your qualifications</p>
              <div className="flex flex-wrap gap-2">
                {availableQualifications.map((qualification) => {
                  const currentQuals = watch('inspector_qualifications') || [];
                  const isSelected = currentQuals.includes(qualification);
                  return (
                    <button
                      key={qualification}
                      type="button"
                      onClick={() => {
                        const updated = isSelected
                          ? currentQuals.filter((q: string) => q !== qualification)
                          : [...currentQuals, qualification];
                        setValue('inspector_qualifications', updated);
                      }}
                      className={cn(
                        "px-3 py-2 rounded-lg text-sm font-medium transition-all touch-manipulation",
                        "flex items-center gap-2 active:scale-95",
                        isSelected
                          ? "bg-elec-yellow text-black"
                          : "bg-white/5 text-foreground border border-white/10 hover:bg-white/10"
                      )}
                    >
                      {isSelected && <Check className="h-4 w-4" />}
                      {qualification}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Registration Details */}
            <div className="space-y-4">
              <Label className="text-foreground flex items-center gap-2">
                <Shield className="h-4 w-4 text-elec-yellow" />
                Professional Registration
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Registration Scheme</Label>
                  <Select
                    value={watch('registration_scheme') || ''}
                    onValueChange={(value) => setValue('registration_scheme', value)}
                  >
                    <SelectTrigger className="bg-white/5 border-white/10">
                      <SelectValue placeholder="Select scheme" />
                    </SelectTrigger>
                    <SelectContent className="bg-elec-gray border-white/10">
                      {registrationSchemes.map((scheme) => (
                        <SelectItem key={scheme.value} value={scheme.value}>
                          {scheme.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Registration Number</Label>
                  <Input
                    {...register('registration_number')}
                    placeholder="e.g., NICEIC/12345"
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Registration Expiry</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      type="date"
                      {...register('registration_expiry')}
                      className="bg-white/5 border-white/10 pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Insurance Details */}
            <div className="space-y-4">
              <Label className="text-foreground flex items-center gap-2">
                <FileText className="h-4 w-4 text-elec-yellow" />
                Insurance Details
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Insurance Provider</Label>
                  <Input
                    {...register('insurance_provider')}
                    placeholder="e.g., Zurich, Aviva"
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Policy Number</Label>
                  <Input
                    {...register('insurance_policy_number')}
                    placeholder="Policy number"
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Coverage Amount</Label>
                  <Input
                    {...register('insurance_coverage')}
                    placeholder="e.g., £2,000,000"
                    className="bg-white/5 border-white/10"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="text-sm text-muted-foreground">Insurance Expiry</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    <Input
                      type="date"
                      {...register('insurance_expiry')}
                      className="bg-white/5 border-white/10 pl-10"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Signature */}
            <div className="space-y-3">
              <Label className="text-foreground flex items-center gap-2">
                <Pen className="h-4 w-4 text-elec-yellow" />
                Signature
              </Label>
              <p className="text-xs text-muted-foreground">
                Draw or type your signature. This will auto-fill on EICR, EIC, and Minor Works certificates.
              </p>
              <SignatureInput
                value={watch('signature_data') || ''}
                onChange={(signature) => setValue('signature_data', signature || '')}
              />
            </div>
          </div>
        </div>

        {/* Currency & Settings */}
        <div className="rounded-xl bg-elec-gray/50 border border-white/10 overflow-hidden">
          <div className="px-4 md:px-6 py-4 border-b border-white/10">
            <h3 className="text-base font-semibold text-foreground flex items-center gap-2">
              <Coins className="h-4 w-4 text-elec-yellow" />
              Regional Settings
            </h3>
          </div>
          <div className="p-4 md:p-6 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-foreground">Currency</Label>
                <Select value={watch('currency')} onValueChange={(value) => setValue('currency', value)}>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-white/10">
                    <SelectItem value="GBP">GBP (£)</SelectItem>
                    <SelectItem value="EUR">EUR (€)</SelectItem>
                    <SelectItem value="USD">USD ($)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-foreground">Locale</Label>
                <Select value={watch('locale')} onValueChange={(value) => setValue('locale', value)}>
                  <SelectTrigger className="bg-white/5 border-white/10">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-white/10">
                    <SelectItem value="en-GB">English (UK)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="de-DE">German</SelectItem>
                    <SelectItem value="fr-FR">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end">
          <Button
            type="submit"
            disabled={loading || uploading}
            className="bg-elec-yellow hover:bg-elec-yellow/90 text-elec-dark font-semibold"
          >
            {uploading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Uploading Logo...
              </>
            ) : loading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <CheckCircle className="h-4 w-4 mr-2" />
                Save Company Profile
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};
