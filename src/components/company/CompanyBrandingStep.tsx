import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Upload, Building, Globe, Phone, Mail, MapPin, FileText } from "lucide-react";
import { useCompanyProfile } from "@/hooks/useCompanyProfile";
import { useToast } from "@/hooks/use-toast";

interface CompanyBrandingStepProps {
  onComplete?: () => void;
}

export const CompanyBrandingStep = ({ onComplete }: CompanyBrandingStepProps) => {
  const { companyProfile, loading, saveCompanyProfile, uploadLogo } = useCompanyProfile();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    company_name: "",
    company_address: "",
    company_postcode: "",
    company_phone: "",
    company_email: "",
    company_website: "",
    company_registration: "",
    vat_number: "",
    primary_color: "#F59E0B",
    secondary_color: "#1F2937",
    currency: "GBP",
    locale: "en-GB",
    payment_terms: "Net 30 days",
    bank_details: null,
  });
  
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (companyProfile) {
      setFormData({
        company_name: companyProfile.company_name || "",
        company_address: companyProfile.company_address || "",
        company_postcode: companyProfile.company_postcode || "",
        company_phone: companyProfile.company_phone || "",
        company_email: companyProfile.company_email || "",
        company_website: companyProfile.company_website || "",
        company_registration: companyProfile.company_registration || "",
        vat_number: companyProfile.vat_number || "",
        primary_color: companyProfile.primary_color || "#F59E0B",
        secondary_color: companyProfile.secondary_color || "#1F2937",
        currency: companyProfile.currency || "GBP",
        locale: companyProfile.locale || "en-GB",
        payment_terms: companyProfile.payment_terms || "Net 30 days",
        bank_details: companyProfile.bank_details || null,
      });
      
      if (companyProfile.logo_data_url) {
        setLogoPreview(companyProfile.logo_data_url);
      }
    }
  }, [companyProfile]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast({
          title: "File too large",
          description: "Please select an image under 5MB.",
          variant: "destructive",
        });
        return;
      }
      
      setLogoFile(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!formData.company_name) {
      toast({
        title: "Company name required",
        description: "Please enter your company name.",
        variant: "destructive",
      });
      return;
    }

    setIsSaving(true);
    
    try {
      let logoUrl = companyProfile?.logo_url;
      let logoDataUrl = companyProfile?.logo_data_url;
      
      // Upload logo if a new one was selected
      if (logoFile) {
        const logoResult = await uploadLogo(logoFile);
        logoUrl = logoResult.url;
        logoDataUrl = logoResult.dataUrl;
      }
      
      await saveCompanyProfile({
        ...formData,
        logo_url: logoUrl,
        logo_data_url: logoDataUrl,
      });
      
      toast({
        title: "Company profile saved",
        description: "Your company branding has been updated successfully.",
        variant: "success",
      });
      
      onComplete?.();
    } catch (error) {
      console.error('Error saving company profile:', error);
      toast({
        title: "Error saving profile",
        description: "There was an error saving your company profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="p-6">
          <div className="text-center">Loading company profile...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building className="h-5 w-5" />
            Company Branding
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Logo Upload */}
          <div className="space-y-3">
            <Label>Company Logo</Label>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {logoPreview && (
                <div className="w-24 h-24 border-2 border-border rounded-lg overflow-hidden bg-background">
                  <img 
                    src={logoPreview} 
                    alt="Company logo preview" 
                    className="w-full h-full object-contain"
                  />
                </div>
              )}
              <div className="flex-1">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoChange}
                  className="hidden"
                  id="logo-upload"
                />
                <Label htmlFor="logo-upload">
                  <Button variant="outline" className="cursor-pointer" asChild>
                    <span className="flex items-center gap-2">
                      <Upload className="h-4 w-4" />
                      {logoPreview ? 'Change Logo' : 'Upload Logo'}
                    </span>
                  </Button>
                </Label>
                <p className="text-xs text-muted-foreground mt-1">
                  Recommended: Square image, max 5MB
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
                value={formData.company_name}
                onChange={(e) => setFormData(prev => ({ ...prev, company_name: e.target.value }))}
                placeholder="Your Company Ltd"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company_registration">Company Registration</Label>
              <Input
                id="company_registration"
                value={formData.company_registration}
                onChange={(e) => setFormData(prev => ({ ...prev, company_registration: e.target.value }))}
                placeholder="12345678"
              />
            </div>
          </div>

          {/* Contact Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company_email">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="company_email"
                  type="email"
                  value={formData.company_email}
                  onChange={(e) => setFormData(prev => ({ ...prev, company_email: e.target.value }))}
                  placeholder="info@company.com"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company_phone">Phone</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="company_phone"
                  value={formData.company_phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, company_phone: e.target.value }))}
                  placeholder="01234 567890"
                  className="pl-10"
                />
              </div>
            </div>
          </div>

          {/* Address */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3 space-y-2">
              <Label htmlFor="company_address">Address</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Textarea
                  id="company_address"
                  value={formData.company_address}
                  onChange={(e) => setFormData(prev => ({ ...prev, company_address: e.target.value }))}
                  placeholder="123 Business Street, City"
                  className="pl-10 min-h-[80px]"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="company_postcode">Postcode</Label>
              <Input
                id="company_postcode"
                value={formData.company_postcode}
                onChange={(e) => setFormData(prev => ({ ...prev, company_postcode: e.target.value }))}
                placeholder="AB1 2CD"
              />
            </div>
          </div>

          {/* Additional Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="company_website">Website</Label>
              <div className="relative">
                <Globe className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="company_website"
                  value={formData.company_website}
                  onChange={(e) => setFormData(prev => ({ ...prev, company_website: e.target.value }))}
                  placeholder="www.company.com"
                  className="pl-10"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="vat_number">VAT Number</Label>
              <Input
                id="vat_number"
                value={formData.vat_number}
                onChange={(e) => setFormData(prev => ({ ...prev, vat_number: e.target.value }))}
                placeholder="GB123456789"
              />
            </div>
          </div>

          {/* Payment Terms */}
          <div className="space-y-2">
            <Label htmlFor="payment_terms">Payment Terms</Label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                id="payment_terms"
                value={formData.payment_terms}
                onChange={(e) => setFormData(prev => ({ ...prev, payment_terms: e.target.value }))}
                placeholder="Net 30 days"
                className="pl-10"
              />
            </div>
          </div>

          {/* Color Scheme */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="primary_color">Primary Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="primary_color"
                  value={formData.primary_color}
                  onChange={(e) => setFormData(prev => ({ ...prev, primary_color: e.target.value }))}
                  className="w-12 h-10 border border-border rounded cursor-pointer"
                />
                <Input
                  value={formData.primary_color}
                  onChange={(e) => setFormData(prev => ({ ...prev, primary_color: e.target.value }))}
                  placeholder="#F59E0B"
                  className="flex-1"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="secondary_color">Secondary Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="secondary_color"
                  value={formData.secondary_color}
                  onChange={(e) => setFormData(prev => ({ ...prev, secondary_color: e.target.value }))}
                  className="w-12 h-10 border border-border rounded cursor-pointer"
                />
                <Input
                  value={formData.secondary_color}
                  onChange={(e) => setFormData(prev => ({ ...prev, secondary_color: e.target.value }))}
                  placeholder="#1F2937"
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          <Button 
            onClick={handleSave} 
            disabled={isSaving || !formData.company_name}
            className="w-full"
          >
            {isSaving ? "Saving..." : "Save Company Profile"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};