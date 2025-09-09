import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { CompanyProfile } from '@/types/company';
import { Upload, Image } from 'lucide-react';

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
}

export const CompanyProfileSettings = () => {
  const { companyProfile, loading, saveCompanyProfile, uploadLogo } = useCompanyProfile();
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
    });
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Image className="h-5 w-5" />
            Company Profile & Branding
          </CardTitle>
          <CardDescription>
            Configure your company details and branding for professional quotes and documents
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Company Logo */}
            <div className="space-y-4">
              <Label>Company Logo</Label>
              <div className="flex items-center gap-4">
                {logoPreview && (
                  <div className="h-20 w-20 border rounded-lg overflow-hidden bg-background">
                    <img 
                      src={logoPreview} 
                      alt="Company logo" 
                      className="h-full w-full object-contain"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className="cursor-pointer"
                  />
                  <p className="text-sm text-muted-foreground mt-1">
                    Recommended: PNG or JPG, max 2MB, square format
                  </p>
                </div>
              </div>
            </div>

            {/* Company Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="company_name">Company Name *</Label>
                <Input 
                  id="company_name"
                  {...register('company_name', { required: 'Company name is required' })}
                  placeholder="Your Company Ltd"
                />
                {errors.company_name && (
                  <p className="text-sm text-destructive">{errors.company_name.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="company_email">Company Email</Label>
                <Input 
                  id="company_email"
                  type="email"
                  {...register('company_email')}
                  placeholder="info@company.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company_phone">Company Phone</Label>
                <Input 
                  id="company_phone"
                  {...register('company_phone')}
                  placeholder="0123 456 7890"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company_website">Website</Label>
                <Input 
                  id="company_website"
                  {...register('company_website')}
                  placeholder="www.company.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company_registration">Company Registration</Label>
                <Input 
                  id="company_registration"
                  {...register('company_registration')}
                  placeholder="12345678"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="vat_number">VAT Number</Label>
                <Input 
                  id="vat_number"
                  {...register('vat_number')}
                  placeholder="GB123456789"
                />
              </div>
            </div>

            {/* Address */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label htmlFor="company_address">Company Address</Label>
                <Textarea 
                  id="company_address"
                  {...register('company_address')}
                  placeholder="123 Business Street, Business Park"
                  rows={3}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company_postcode">Postcode</Label>
                <Input 
                  id="company_postcode"
                  {...register('company_postcode')}
                  placeholder="AB1 2CD"
                />
              </div>
            </div>

            {/* Branding */}
            <div className="space-y-4">
              <Label>Brand Colors</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="primary_color">Primary Color</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="primary_color"
                      type="color"
                      {...register('primary_color')}
                      className="w-16 h-10 p-1 cursor-pointer"
                    />
                    <Input 
                      {...register('primary_color')}
                      placeholder="#1e40af"
                      className="flex-1"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="secondary_color">Secondary Color</Label>
                  <div className="flex gap-2">
                    <Input 
                      id="secondary_color"
                      type="color"
                      {...register('secondary_color')}
                      className="w-16 h-10 p-1 cursor-pointer"
                    />
                    <Input 
                      {...register('secondary_color')}
                      placeholder="#3b82f6"
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Currency & Locale */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>Currency</Label>
                <Select value={watch('currency')} onValueChange={(value) => setValue('currency', value)}>
                  <SelectTrigger>
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
                <Label>Locale</Label>
                <Select value={watch('locale')} onValueChange={(value) => setValue('locale', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en-GB">English (UK)</SelectItem>
                    <SelectItem value="en-US">English (US)</SelectItem>
                    <SelectItem value="de-DE">German</SelectItem>
                    <SelectItem value="fr-FR">French</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="payment_terms">Payment Terms</Label>
                <Input 
                  id="payment_terms"
                  {...register('payment_terms')}
                  placeholder="30 days"
                />
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={loading || uploading}
              className="w-full"
            >
              {uploading ? 'Uploading Logo...' : loading ? 'Saving...' : 'Save Company Profile'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};