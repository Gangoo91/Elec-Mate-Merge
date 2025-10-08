import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { Upload, Check } from "lucide-react";

interface ClientDetails {
  clientName: string;
  propertyAddress: string;
  postcode: string;
  contactNumber: string;
  email: string;
  siteNotes: string;
}

interface CompanyDetails {
  companyName: string;
  companyAddress: string;
  registrationNumber: string;
  vatNumber: string;
  phone: string;
  email: string;
  website: string;
  logoUrl: string;
}

interface ProjectDetailsFormProps {
  projectId?: string;
  onDetailsSaved: (clientDetails: ClientDetails, companyDetails: CompanyDetails) => void;
}

export const ProjectDetailsForm = ({ projectId, onDetailsSaved }: ProjectDetailsFormProps) => {
  const [clientDetails, setClientDetails] = useState<ClientDetails>({
    clientName: "",
    propertyAddress: "",
    postcode: "",
    contactNumber: "",
    email: "",
    siteNotes: ""
  });

  const [companyDetails, setCompanyDetails] = useState<CompanyDetails>({
    companyName: "",
    companyAddress: "",
    registrationNumber: "",
    vatNumber: "",
    phone: "",
    email: "",
    website: "",
    logoUrl: ""
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLogoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("Please upload an image file");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Image must be less than 2MB");
      return;
    }

    setIsUploading(true);

    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('company-branding')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('company-branding')
        .getPublicUrl(filePath);

      setCompanyDetails(prev => ({ ...prev, logoUrl: publicUrl }));
      toast.success("Logo uploaded successfully");
    } catch (error) {
      console.error('Logo upload error:', error);
      toast.error("Failed to upload logo");
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = () => {
    if (!clientDetails.clientName.trim()) {
      toast.error("Client Name is required");
      return;
    }

    if (!clientDetails.propertyAddress.trim()) {
      toast.error("Property Address is required");
      return;
    }

    if (!companyDetails.companyName.trim()) {
      toast.error("Company Name is required");
      return;
    }

    // Save to localStorage
    const storageKey = `elecmate_project_details_${projectId || 'temp'}`;
    localStorage.setItem(storageKey, JSON.stringify({ clientDetails, companyDetails }));

    setIsSaved(true);
    onDetailsSaved(clientDetails, companyDetails);
    toast.success("Project details saved", {
      description: "These will be included in all PDF exports"
    });
  };

  return (
    <div className="space-y-6">
      {/* Client Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            📋 Client Details
            {isSaved && <Check className="w-5 h-5 text-green-500" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="clientName">
                Client Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="clientName"
                value={clientDetails.clientName}
                onChange={(e) => setClientDetails(prev => ({ ...prev, clientName: e.target.value }))}
                placeholder="John Smith Building Ltd"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postcode">
                Postcode <span className="text-destructive">*</span>
              </Label>
              <Input
                id="postcode"
                value={clientDetails.postcode}
                onChange={(e) => setClientDetails(prev => ({ ...prev, postcode: e.target.value }))}
                placeholder="SW1A 1AA"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="propertyAddress">
              Property Address <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="propertyAddress"
              value={clientDetails.propertyAddress}
              onChange={(e) => setClientDetails(prev => ({ ...prev, propertyAddress: e.target.value }))}
              placeholder="12 High Street&#10;London"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="contactNumber">Contact Number</Label>
              <Input
                id="contactNumber"
                value={clientDetails.contactNumber}
                onChange={(e) => setClientDetails(prev => ({ ...prev, contactNumber: e.target.value }))}
                placeholder="07700 900123"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="clientEmail">Email Address</Label>
              <Input
                id="clientEmail"
                type="email"
                value={clientDetails.email}
                onChange={(e) => setClientDetails(prev => ({ ...prev, email: e.target.value }))}
                placeholder="john@example.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="siteNotes">Site Notes</Label>
            <Textarea
              id="siteNotes"
              value={clientDetails.siteNotes}
              onChange={(e) => setClientDetails(prev => ({ ...prev, siteNotes: e.target.value }))}
              placeholder="Any additional site information..."
              rows={3}
            />
          </div>
        </CardContent>
      </Card>

      {/* Company Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            🏢 Company Details
            {isSaved && <Check className="w-5 h-5 text-green-500" />}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">
                Company Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="companyName"
                value={companyDetails.companyName}
                onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyName: e.target.value }))}
                placeholder="ElecMate Ltd"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="registrationNumber">Registration Number</Label>
              <Input
                id="registrationNumber"
                value={companyDetails.registrationNumber}
                onChange={(e) => setCompanyDetails(prev => ({ ...prev, registrationNumber: e.target.value }))}
                placeholder="12345678"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="companyAddress">Company Address</Label>
            <Textarea
              id="companyAddress"
              value={companyDetails.companyAddress}
              onChange={(e) => setCompanyDetails(prev => ({ ...prev, companyAddress: e.target.value }))}
              placeholder="123 Business Park&#10;Manchester"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="vatNumber">VAT Number</Label>
              <Input
                id="vatNumber"
                value={companyDetails.vatNumber}
                onChange={(e) => setCompanyDetails(prev => ({ ...prev, vatNumber: e.target.value }))}
                placeholder="GB123456789"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="companyPhone">Phone</Label>
              <Input
                id="companyPhone"
                value={companyDetails.phone}
                onChange={(e) => setCompanyDetails(prev => ({ ...prev, phone: e.target.value }))}
                placeholder="0208 123 4567"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companyEmail">Email</Label>
              <Input
                id="companyEmail"
                type="email"
                value={companyDetails.email}
                onChange={(e) => setCompanyDetails(prev => ({ ...prev, email: e.target.value }))}
                placeholder="info@company.com"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="website">Website</Label>
              <Input
                id="website"
                value={companyDetails.website}
                onChange={(e) => setCompanyDetails(prev => ({ ...prev, website: e.target.value }))}
                placeholder="www.company.com"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="logo">Company Logo</Label>
            <div className="flex items-center gap-4">
              <input
                type="file"
                id="logo"
                accept="image/*"
                onChange={handleLogoUpload}
                disabled={isUploading}
                className="hidden"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('logo')?.click()}
                disabled={isUploading}
              >
                <Upload className="w-4 h-4 mr-2" />
                {isUploading ? "Uploading..." : "Upload Logo"}
              </Button>
              {companyDetails.logoUrl && (
                <div className="flex items-center gap-2">
                  <img
                    src={companyDetails.logoUrl}
                    alt="Company logo"
                    className="h-12 w-auto object-contain border rounded"
                  />
                  <span className="text-sm text-muted-foreground">✓ Logo uploaded</span>
                </div>
              )}
            </div>
            <p className="text-xs text-muted-foreground">PNG, JPG or JPEG (max 2MB)</p>
          </div>
        </CardContent>
      </Card>

      <Button onClick={handleSave} className="w-full" size="lg">
        💾 Save Project Details
      </Button>
    </div>
  );
};
