import React, { useRef, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Image, X, Building2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface CompanyBrandingSectionProps {
  formData: any;
  onUpdate: (field: string, value: string) => void;
}

const CompanyBrandingSection = ({ formData, onUpdate }: CompanyBrandingSectionProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: "Invalid file type",
        description: "Please select an image file (PNG, JPG, etc.)",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Please select an image smaller than 5MB",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);

    try {
      // Convert to base64 data URL
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        onUpdate('companyLogo', dataUrl);
        toast({
          title: "Logo uploaded successfully",
          description: "Your company logo has been added to the report",
        });
        setIsUploading(false);
      };
      reader.onerror = () => {
        toast({
          title: "Upload failed",
          description: "Failed to read the image file",
          variant: "destructive",
        });
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      toast({
        title: "Upload failed",
        description: "An error occurred while uploading the logo",
        variant: "destructive",
      });
      setIsUploading(false);
    }
  };

  const handleRemoveLogo = () => {
    onUpdate('companyLogo', '');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleQuickFillBranding = (template: string) => {
    const templates = {
      'electrical_contractor': {
        brandingCompanyName: '[Your Company Name] Electrical Services',
        brandingTagline: 'Professional Electrical Testing & Inspection',
        brandingAccentColor: '#FCD34D', // elec-yellow
      },
      'inspection_services': {
        brandingCompanyName: '[Your Company Name] Inspection Services',
        brandingTagline: 'Certified Electrical Safety Inspections',
        brandingAccentColor: '#3B82F6', // blue
      },
      'maintenance_company': {
        brandingCompanyName: '[Your Company Name] Maintenance',
        brandingTagline: 'Electrical Installation Testing & Certification',
        brandingAccentColor: '#10B981', // green
      }
    };

    const template_data = templates[template as keyof typeof templates];
    if (template_data) {
      Object.entries(template_data).forEach(([key, value]) => {
        onUpdate(key, value);
      });
    }
  };

  return (
    <Card className="elec-card border-yellow-400/20 overflow-hidden">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold flex items-center gap-3">
          <div className="p-2 rounded-lg bg-gradient-to-br from-yellow-400 to-yellow-500 shadow-sm">
            <Building2 className="h-5 w-5 text-black" />
          </div>
          <span className="bg-gradient-to-r from-yellow-600 to-yellow-500 bg-clip-text text-transparent">
            Company Branding
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Company Logo */}
        <div className="space-y-3 p-3 rounded-lg bg-gradient-to-r from-yellow-50/30 to-transparent border border-yellow-400/20">
          <Label className="text-sm font-bold text-foreground uppercase tracking-wide flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-500"></div>
            Company Logo
          </Label>
          
          <div className="space-y-3">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            
            {formData.companyLogo ? (
              <div className="flex justify-center">
                <div className="relative inline-block group">
                  <img
                    src={formData.companyLogo}
                    alt="Company logo"
                    className="max-w-32 max-h-16 object-contain border border-yellow-400/30 rounded-lg bg-white/50 backdrop-blur-sm p-2 shadow-md transition-all duration-200 group-hover:shadow-lg"
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    onClick={handleRemoveLogo}
                  >
                    <X className="h-2.5 w-2.5" />
                  </Button>
                </div>
              </div>
            ) : (
              <div 
                className="border-2 border-dashed border-yellow-400/40 rounded-lg p-4 text-center hover:border-yellow-400/60 transition-all duration-200 hover:bg-yellow-50/20 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="flex flex-col items-center gap-2">
                  <div className="p-2 rounded-full bg-gradient-to-br from-yellow-400/20 to-yellow-500/20">
                    <Image className="h-5 w-5 text-yellow-600" />
                  </div>
                  <p className="text-xs font-medium text-muted-foreground">Drag and drop or click to upload</p>
                  <p className="text-xs text-muted-foreground">PNG, JPG, GIF up to 5MB</p>
                </div>
              </div>
            )}
            
            <div className="flex justify-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => fileInputRef.current?.click()}
                disabled={isUploading}
                className="flex items-center gap-2 border-yellow-400/40 text-foreground hover:bg-yellow-50 hover:border-yellow-400/60 font-medium transition-all duration-200"
              >
                <Upload className="h-3 w-3" />
                {isUploading ? 'Uploading...' : 'Upload Logo'}
              </Button>
              {formData.companyLogo && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={handleRemoveLogo}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50 font-medium transition-colors duration-200"
                >
                  Remove
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Branding Details */}
        <div className="space-y-3 p-3 rounded-lg bg-gradient-to-r from-gray-50/30 to-transparent border border-gray-200/50">
          <h3 className="text-sm font-bold text-foreground uppercase tracking-wide flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-gradient-to-r from-gray-400 to-gray-500"></div>
            Branding Details
          </h3>
          
          <div className="space-y-3">
            <div className="space-y-2">
              <Label htmlFor="brandingCompanyName" className="font-semibold text-sm">Company Name for Headers</Label>
              <Input
                id="brandingCompanyName"
                value={formData.brandingCompanyName || ''}
                onChange={(e) => onUpdate('brandingCompanyName', e.target.value)}
                placeholder="Company name as it appears on reports"
                className="border-gray-300/50 focus:border-yellow-400 focus:ring-yellow-400 transition-colors duration-200"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="brandingTagline" className="font-semibold text-sm">Tagline/Subtitle (Optional)</Label>
              <Input
                id="brandingTagline"
                value={formData.brandingTagline || ''}
                onChange={(e) => onUpdate('brandingTagline', e.target.value)}
                placeholder="Professional tagline or services description"
                className="border-gray-300/50 focus:border-yellow-400 focus:ring-yellow-400 transition-colors duration-200"
              />
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-2">
                <Label htmlFor="brandingAccentColor" className="font-semibold text-sm">Accent Colour</Label>
                <div className="flex gap-2">
                  <Input
                    id="brandingAccentColor"
                    type="color"
                    value={formData.brandingAccentColor || '#FCD34D'}
                    onChange={(e) => onUpdate('brandingAccentColor', e.target.value)}
                    className="w-12 h-9 p-1 rounded-md cursor-pointer border-2 border-gray-300/50 hover:border-yellow-400/50 transition-all duration-200 touch-manipulation"
                  />
                  <Input
                    value={formData.brandingAccentColor || '#FCD34D'}
                    onChange={(e) => onUpdate('brandingAccentColor', e.target.value)}
                    placeholder="#FCD34D"
                    className="flex-1 border-gray-300/50 focus:border-yellow-400 focus:ring-yellow-400 font-mono text-sm transition-colors duration-200"
                  />
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <div className="w-1 h-1 rounded-full bg-yellow-400"></div>
                  Used for headers and accent elements
                </p>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="brandingWebsite" className="font-semibold text-sm">Website (Optional)</Label>
                <Input
                  id="brandingWebsite"
                  type="url"
                  value={formData.brandingWebsite || ''}
                  onChange={(e) => onUpdate('brandingWebsite', e.target.value)}
                  placeholder="https://yourcompany.co.uk"
                  className="border-gray-300/50 focus:border-yellow-400 focus:ring-yellow-400 transition-colors duration-200"
                />
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CompanyBrandingSection;