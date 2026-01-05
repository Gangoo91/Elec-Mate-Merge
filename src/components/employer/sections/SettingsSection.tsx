import { useState, useEffect, useRef } from "react";
import { Building2, User, Bell, Shield, Palette, Users, Save, Plus, Trash2, Key, Link2, CheckCircle2, Mail, Loader2, Upload, Image as ImageIcon, CreditCard, Mic } from "lucide-react";
import { getSetting, setSetting, getCompanySettings, saveCompanySettings, getBrandingSettings, saveBrandingSettings, uploadCompanyLogo, type CompanySettings, type BrandingSettings } from "@/services/settingsService";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { useIsMobile } from "@/hooks/use-mobile";
import { permissionsList, rolePermissions, type TeamRole } from "@/data/employerMockData";
import { StripeConnectCard } from "../StripeConnectCard";
import VoiceSettingsPanel from "../VoiceSettingsPanel";

export function SettingsSection() {
  const isMobile = useIsMobile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeTab, setActiveTab] = useState("company");
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    certificationReminders: true,
    jobUpdates: true,
    invoiceAlerts: true,
    tenderDeadlines: true,
    safetyAlerts: true,
  });

  const [selectedRole, setSelectedRole] = useState<TeamRole>("Operative");
  const [rolePerms, setRolePerms] = useState<Record<TeamRole, string[]>>(rolePermissions);
  const [notificationEmail, setNotificationEmail] = useState("");
  const [savingEmail, setSavingEmail] = useState(false);

  // Company settings state
  const [companySettings, setCompanySettings] = useState<CompanySettings>({
    company_name: '',
    company_address: '',
    company_phone: '',
    company_email: '',
    company_number: '',
    company_vat_number: '',
    company_website: '',
    bank_account_name: '',
    bank_sort_code: '',
    bank_account_number: ''
  });
  const [loadingCompany, setLoadingCompany] = useState(true);
  const [savingCompany, setSavingCompany] = useState(false);

  // Branding settings state
  const [brandingSettings, setBrandingSettings] = useState<BrandingSettings>({
    company_logo_url: null,
    brand_primary_color: '#f59e0b',
    brand_secondary_color: '#0f172a'
  });
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [savingBranding, setSavingBranding] = useState(false);

  useEffect(() => {
    // Load notification email
    getSetting("business_notification_email").then((value) => {
      if (value) setNotificationEmail(value);
    });

    // Load company settings
    getCompanySettings().then((settings) => {
      setCompanySettings(settings);
      setLoadingCompany(false);
    });

    // Load branding settings
    getBrandingSettings().then((settings) => {
      setBrandingSettings(settings);
    });
  }, []);

  const handleSaveNotificationEmail = async () => {
    setSavingEmail(true);
    const success = await setSetting("business_notification_email", notificationEmail);
    setSavingEmail(false);
    if (success) {
      toast({
        title: "Saved",
        description: "Notification email updated successfully.",
      });
    } else {
      toast({
        title: "Error",
        description: "Failed to save notification email.",
        variant: "destructive",
      });
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({ title: "Invalid file", description: "Please select an image file.", variant: "destructive" });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Maximum file size is 5MB.", variant: "destructive" });
      return;
    }

    setUploadingLogo(true);
    const logoUrl = await uploadCompanyLogo(file);
    setUploadingLogo(false);

    if (logoUrl) {
      setBrandingSettings(prev => ({ ...prev, company_logo_url: logoUrl }));
      toast({ title: "Logo uploaded", description: "Your company logo has been updated." });
    } else {
      toast({ title: "Upload failed", description: "Failed to upload logo. Please try again.", variant: "destructive" });
    }
  };

  const handleSaveBranding = async () => {
    setSavingBranding(true);
    const success = await saveBrandingSettings(brandingSettings);
    setSavingBranding(false);
    if (success) {
      toast({ title: "Saved", description: "Branding settings updated successfully." });
    } else {
      toast({ title: "Error", description: "Failed to save branding settings.", variant: "destructive" });
    }
  };

  const teamMembers = [
    { name: "John Smith", email: "john@elec-mate.com", role: "Owner", status: "Active" },
    { name: "Sarah Johnson", email: "sarah@elec-mate.com", role: "Admin", status: "Active" },
    { name: "Mike Williams", email: "mike@elec-mate.com", role: "Manager", status: "Active" },
  ];

  const integrations = [
    { name: "Xero", description: "Accounting & payroll integration", connected: true, icon: "X", color: "bg-[#13B5EA]" },
    { name: "Google Workspace", description: "Calendar and email sync", connected: false, icon: "G", color: "bg-[#4285F4]" },
    { name: "Dropbox", description: "Document storage", connected: true, icon: "D", color: "bg-[#0061FF]" },
    { name: "Sage", description: "Accounting software", connected: false, icon: "S", color: "bg-[#00D632]" },
  ];

  const handleSavePermissions = () => {
    toast({
      title: "Permissions Saved",
      description: `Permissions for ${selectedRole} role have been updated.`,
    });
  };

  const togglePermission = (permId: string) => {
    setRolePerms(prev => {
      const currentPerms = prev[selectedRole] || [];
      if (currentPerms.includes(permId)) {
        return { ...prev, [selectedRole]: currentPerms.filter(p => p !== permId) };
      } else {
        return { ...prev, [selectedRole]: [...currentPerms, permId] };
      }
    });
  };

  const tabOptions = [
    { value: "company", label: "Company" },
    { value: "voice", label: "Voice Assistant" },
    { value: "permissions", label: "Permissions" },
    { value: "integrations", label: "Integrations" },
    { value: "notifications", label: "Notifications" },
    { value: "preferences", label: "Preferences" },
  ];

  return (
    <div className="space-y-6 animate-fade-in pb-safe">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Settings</h1>
        <p className="text-muted-foreground text-sm">Company settings, permissions, and integrations</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        {isMobile ? (
          <Select value={activeTab} onValueChange={setActiveTab}>
            <SelectTrigger className="w-full h-12">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {tabOptions.map((tab) => (
                <SelectItem key={tab.value} value={tab.value}>
                  {tab.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <TabsList className="inline-flex">
            {tabOptions.map((tab) => (
              <TabsTrigger key={tab.value} value={tab.value}>
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
        )}

        {/* Company Settings */}
        <TabsContent value="company" className="space-y-6">
          {/* Logo & Branding Card */}
          <Card className="overflow-hidden border-elec-yellow/20">
            <CardHeader className="bg-gradient-to-r from-primary/10 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-elec-yellow" />
                Logo & Branding
              </CardTitle>
              <CardDescription>Your logo and colours appear on quotes, invoices, and emails</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              {/* Logo Upload */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Company Logo</Label>
                <div className={`flex ${isMobile ? 'flex-col' : 'flex-row'} items-start gap-6`}>
                  {/* Logo Preview */}
                  <div 
                    className="relative group cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <div className={`${isMobile ? 'w-full h-32' : 'w-40 h-24'} rounded-xl border-2 border-dashed border-muted-foreground/30 flex items-center justify-center bg-muted/30 overflow-hidden transition-all hover:border-elec-yellow/50 hover:bg-muted/50`}>
                      {brandingSettings.company_logo_url ? (
                        <img 
                          src={brandingSettings.company_logo_url} 
                          alt="Company logo" 
                          className="max-w-full max-h-full object-contain p-2"
                        />
                      ) : (
                        <div className="flex flex-col items-center gap-2 text-muted-foreground">
                          <ImageIcon className="h-8 w-8" />
                          <span className="text-xs">No logo</span>
                        </div>
                      )}
                    </div>
                    {uploadingLogo && (
                      <div className="absolute inset-0 bg-background/80 rounded-xl flex items-center justify-center">
                        <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
                      </div>
                    )}
                  </div>
                  
                  <div className="flex-1 space-y-3">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <Button 
                      variant="outline" 
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingLogo}
                      className="w-full sm:w-auto h-12"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      {uploadingLogo ? 'Uploading...' : 'Upload Logo'}
                    </Button>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG or SVG. Max 5MB. Recommended: 400x200px
                    </p>
                  </div>
                </div>
              </div>

              {/* Brand Colours */}
              <div className="space-y-4 pt-4 border-t border-border/50">
                <Label className="text-base font-medium">Brand Colours</Label>
                <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                  {/* Primary Colour */}
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Primary Colour</Label>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <input
                          type="color"
                          value={brandingSettings.brand_primary_color}
                          onChange={(e) => setBrandingSettings(prev => ({ ...prev, brand_primary_color: e.target.value }))}
                          className="w-14 h-14 rounded-xl border-2 border-border cursor-pointer appearance-none bg-transparent"
                          style={{ padding: 0 }}
                        />
                      </div>
                      <Input
                        value={brandingSettings.brand_primary_color}
                        onChange={(e) => setBrandingSettings(prev => ({ ...prev, brand_primary_color: e.target.value }))}
                        placeholder="#f59e0b"
                        className="font-mono uppercase h-12"
                      />
                    </div>
                  </div>

                  {/* Secondary Colour */}
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">Secondary Colour</Label>
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <input
                          type="color"
                          value={brandingSettings.brand_secondary_color}
                          onChange={(e) => setBrandingSettings(prev => ({ ...prev, brand_secondary_color: e.target.value }))}
                          className="w-14 h-14 rounded-xl border-2 border-border cursor-pointer appearance-none bg-transparent"
                          style={{ padding: 0 }}
                        />
                      </div>
                      <Input
                        value={brandingSettings.brand_secondary_color}
                        onChange={(e) => setBrandingSettings(prev => ({ ...prev, brand_secondary_color: e.target.value }))}
                        placeholder="#0f172a"
                        className="font-mono uppercase h-12"
                      />
                    </div>
                  </div>
                </div>

                {/* Live Preview */}
                <div className="mt-4 p-4 rounded-xl border border-border/50 bg-muted/20">
                  <Label className="text-xs text-muted-foreground mb-3 block">Preview</Label>
                  <div className="flex items-center gap-3">
                    <div 
                      className="h-10 flex-1 rounded-lg flex items-center justify-center text-sm font-medium"
                      style={{ backgroundColor: brandingSettings.brand_secondary_color, color: '#fff' }}
                    >
                      Header
                    </div>
                    <div 
                      className="h-10 px-6 rounded-lg flex items-center justify-center text-sm font-medium"
                      style={{ backgroundColor: brandingSettings.brand_primary_color, color: '#fff' }}
                    >
                      Button
                    </div>
                  </div>
                </div>
              </div>

              <Button 
                onClick={handleSaveBranding} 
                disabled={savingBranding}
                className="w-full sm:w-auto h-12"
              >
                {savingBranding ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {savingBranding ? "Saving..." : "Save Branding"}
              </Button>
            </CardContent>
          </Card>

          {/* Company Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5 text-elec-yellow" />
                Company Profile
              </CardTitle>
              <CardDescription>Your company details for quotes and invoices</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {loadingCompany ? (
                <div className="flex items-center justify-center py-8">
                  <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
                </div>
              ) : (
                <>
                  <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                    <div className="space-y-2">
                      <Label>Company Name</Label>
                      <Input 
                        value={companySettings.company_name}
                        onChange={(e) => setCompanySettings(prev => ({ ...prev, company_name: e.target.value }))}
                        placeholder="Your Company Ltd"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company Number</Label>
                      <Input 
                        value={companySettings.company_number}
                        onChange={(e) => setCompanySettings(prev => ({ ...prev, company_number: e.target.value }))}
                        placeholder="12345678"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>VAT Number</Label>
                      <Input 
                        value={companySettings.company_vat_number}
                        onChange={(e) => setCompanySettings(prev => ({ ...prev, company_vat_number: e.target.value }))}
                        placeholder="GB123456789"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone</Label>
                      <Input 
                        value={companySettings.company_phone}
                        onChange={(e) => setCompanySettings(prev => ({ ...prev, company_phone: e.target.value }))}
                        placeholder="+44 123 456 7890"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Email</Label>
                      <Input 
                        type="email"
                        value={companySettings.company_email}
                        onChange={(e) => setCompanySettings(prev => ({ ...prev, company_email: e.target.value }))}
                        placeholder="info@yourcompany.com"
                        className="h-12"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Website</Label>
                      <Input 
                        value={companySettings.company_website}
                        onChange={(e) => setCompanySettings(prev => ({ ...prev, company_website: e.target.value }))}
                        placeholder="https://yourcompany.com"
                        className="h-12"
                      />
                    </div>
                    <div className={`space-y-2 ${isMobile ? '' : 'col-span-2'}`}>
                      <Label>Address</Label>
                      <Input 
                        value={companySettings.company_address}
                        onChange={(e) => setCompanySettings(prev => ({ ...prev, company_address: e.target.value }))}
                        placeholder="123 Business Park, City, Postcode"
                        className="h-12"
                      />
                    </div>
                  </div>
                  <Button 
                    onClick={async () => {
                      setSavingCompany(true);
                      const success = await saveCompanySettings(companySettings);
                      setSavingCompany(false);
                      if (success) {
                        toast({ title: "Saved", description: "Company details updated successfully." });
                      } else {
                        toast({ title: "Error", description: "Failed to save company details.", variant: "destructive" });
                      }
                    }}
                    disabled={savingCompany}
                    className="w-full sm:w-auto h-12"
                  >
                    {savingCompany ? (
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    ) : (
                      <Save className="h-4 w-4 mr-2" />
                    )}
                    {savingCompany ? "Saving..." : "Save Changes"}
                  </Button>
                </>
              )}
            </CardContent>
          </Card>

          {/* Payment Details Card */}
          <Card className="overflow-hidden border-green-500/20">
            <CardHeader className="bg-gradient-to-r from-green-500/10 to-transparent">
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-green-500" />
                Payment Details
              </CardTitle>
              <CardDescription>Bank details shown on invoices for client payments</CardDescription>
            </CardHeader>
            <CardContent className="p-6 space-y-4">
              <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-3'} gap-4`}>
                <div className="space-y-2">
                  <Label>Account Name</Label>
                  <Input 
                    value={companySettings.bank_account_name}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, bank_account_name: e.target.value }))}
                    placeholder="Your Company Ltd"
                    className="h-12"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Sort Code</Label>
                  <Input 
                    value={companySettings.bank_sort_code}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, bank_sort_code: e.target.value }))}
                    placeholder="00-00-00"
                    className="h-12 font-mono"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Account Number</Label>
                  <Input 
                    value={companySettings.bank_account_number}
                    onChange={(e) => setCompanySettings(prev => ({ ...prev, bank_account_number: e.target.value }))}
                    placeholder="12345678"
                    className="h-12 font-mono"
                  />
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                These details will appear on invoices sent to clients. The invoice number will be suggested as the payment reference.
              </p>
              <Button 
                onClick={async () => {
                  setSavingCompany(true);
                  const success = await saveCompanySettings(companySettings);
                  setSavingCompany(false);
                  if (success) {
                    toast({ title: "Saved", description: "Payment details updated successfully." });
                  } else {
                    toast({ title: "Error", description: "Failed to save payment details.", variant: "destructive" });
                  }
                }}
                disabled={savingCompany}
                className="w-full sm:w-auto h-12"
              >
                {savingCompany ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {savingCompany ? "Saving..." : "Save Payment Details"}
              </Button>
            </CardContent>
          </Card>

          {/* Notification Email */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-elec-yellow" />
                Notification Email
              </CardTitle>
              <CardDescription>Where quote and invoice notifications are sent</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email Address</Label>
                <Input 
                  type="email"
                  placeholder="e.g. accounts@yourcompany.com"
                  value={notificationEmail}
                  onChange={(e) => setNotificationEmail(e.target.value)}
                  className="h-12"
                />
                <p className="text-xs text-muted-foreground">
                  You'll receive notifications here when clients accept or decline quotes
                </p>
              </div>
              <Button onClick={handleSaveNotificationEmail} disabled={savingEmail} className="w-full sm:w-auto h-12">
                <Save className="h-4 w-4 mr-2" />
                {savingEmail ? "Saving..." : "Save Email"}
              </Button>
            </CardContent>
          </Card>

          {/* Team Members */}
          <Card>
            <CardHeader>
              <div className={`flex ${isMobile ? 'flex-col gap-3' : 'items-center justify-between'}`}>
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-elec-yellow" />
                    Dashboard Users
                  </CardTitle>
                  <CardDescription>Manage who has access to the employer dashboard</CardDescription>
                </div>
                <Button size="sm" className={isMobile ? 'w-full h-12' : ''}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {teamMembers.map((member, idx) => (
                  <div key={idx} className={`flex ${isMobile ? 'flex-col gap-3' : 'items-center justify-between'} p-4 rounded-xl bg-muted/30 border border-border/50`}>
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12 border-2 border-elec-yellow/20">
                        <AvatarFallback className="bg-elec-yellow/10 text-elec-yellow font-medium">
                          {member.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{member.name}</p>
                        <p className="text-sm text-muted-foreground">{member.email}</p>
                      </div>
                    </div>
                    <div className={`flex items-center gap-3 ${isMobile ? 'ml-16' : ''}`}>
                      <Badge variant="secondary" className="h-7">{member.role}</Badge>
                      {member.role !== "Owner" && (
                        <Button variant="ghost" size="icon" className="text-destructive h-9 w-9">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Voice Assistant Settings */}
        <TabsContent value="voice" className="space-y-6">
          <VoiceSettingsPanel />
        </TabsContent>

        {/* Permissions */}
        <TabsContent value="permissions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Key className="h-5 w-5 text-elec-yellow" />
                Role Permissions
              </CardTitle>
              <CardDescription>Configure what each role can access</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Role Selector */}
              <div className={`flex gap-2 ${isMobile ? 'flex-wrap' : ''}`}>
                {(["QS", "Supervisor", "Operative", "Apprentice"] as TeamRole[]).map((role) => (
                  <Button
                    key={role}
                    variant={selectedRole === role ? "default" : "outline"}
                    size={isMobile ? "default" : "sm"}
                    onClick={() => setSelectedRole(role)}
                    className={isMobile ? 'flex-1 h-12' : ''}
                  >
                    {role}
                  </Button>
                ))}
              </div>

              {/* Permissions Matrix */}
              <div className="space-y-2">
                {permissionsList.map((perm) => (
                  <div 
                    key={perm.id} 
                    className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border border-border/50"
                  >
                    <div className="flex items-center gap-3 flex-1">
                      <Checkbox
                        id={perm.id}
                        checked={rolePerms[selectedRole]?.includes(perm.id) || false}
                        onCheckedChange={() => togglePermission(perm.id)}
                        className="h-5 w-5"
                      />
                      <div className="flex-1">
                        <label htmlFor={perm.id} className="font-medium text-sm cursor-pointer">
                          {perm.name}
                        </label>
                        <p className="text-xs text-muted-foreground">{perm.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={handleSavePermissions} className="w-full sm:w-auto h-12">
                <Save className="h-4 w-4 mr-2" />
                Save {selectedRole} Permissions
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Integrations - Redesigned */}
        <TabsContent value="integrations" className="space-y-6">
          {/* Stripe Connect Card */}
          <StripeConnectCard />
          
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Link2 className="h-5 w-5 text-elec-yellow" />
                Other Integrations
              </CardTitle>
              <CardDescription>Connect third-party services to enhance your workflow</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {integrations.map((integration, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${isMobile ? 'flex-col' : 'items-center'} gap-4 p-4 rounded-xl border border-border/50 bg-muted/20 transition-all hover:bg-muted/40`}
                >
                  <div className={`flex items-center gap-4 ${isMobile ? 'w-full' : 'flex-1'}`}>
                    <div className={`w-14 h-14 rounded-xl ${integration.color} flex items-center justify-center text-foreground font-bold text-xl shrink-0`}>
                      {integration.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <h4 className="font-semibold">{integration.name}</h4>
                        {integration.connected && (
                          <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30 h-6">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Connected
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mt-0.5">{integration.description}</p>
                    </div>
                  </div>
                  <Button 
                    variant={integration.connected ? "outline" : "default"}
                    className={`${isMobile ? 'w-full' : ''} h-11 shrink-0`}
                  >
                    {integration.connected ? "Manage" : "Connect"}
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Document Templates */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-elec-yellow" />
                Document Templates
              </CardTitle>
              <CardDescription>Manage your RAMS, method statement, and briefing pack templates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {["RAMS Template", "Method Statement Template", "Briefing Pack Template", "Closeout Report Template"].map((template, idx) => (
                <div key={idx} className={`flex ${isMobile ? 'flex-col gap-3' : 'items-center justify-between'} p-4 bg-muted/30 rounded-xl border border-border/50`}>
                  <span className="font-medium">{template}</span>
                  <div className={`flex gap-2 ${isMobile ? 'w-full' : ''}`}>
                    <Button variant="outline" size="sm" className={isMobile ? 'flex-1 h-11' : ''}>Edit</Button>
                    <Button variant="outline" size="sm" className={isMobile ? 'flex-1 h-11' : ''}>Download</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-elec-yellow" />
                Notification Preferences
              </CardTitle>
              <CardDescription>Control what notifications you receive</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { key: "emailAlerts", label: "Email Alerts", description: "Receive important updates via email" },
                  { key: "certificationReminders", label: "Certification Reminders", description: "Get notified when certifications are expiring" },
                  { key: "jobUpdates", label: "Job Updates", description: "Notifications about job progress and completions" },
                  { key: "invoiceAlerts", label: "Invoice Alerts", description: "Payment reminders and overdue notices" },
                  { key: "tenderDeadlines", label: "Tender Deadlines", description: "Reminders for upcoming tender deadlines" },
                  { key: "safetyAlerts", label: "Safety Alerts", description: "Immediate notifications for safety incidents" },
                ].map((item) => (
                  <div key={item.key} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="flex-1 pr-4">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch
                      checked={notifications[item.key as keyof typeof notifications]}
                      onCheckedChange={(checked) => 
                        setNotifications(prev => ({ ...prev, [item.key]: checked }))
                      }
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences */}
        <TabsContent value="preferences" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Palette className="h-5 w-5 text-elec-yellow" />
                Display Preferences
              </CardTitle>
              <CardDescription>Customise your dashboard experience</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {[
                  { label: "Dark Mode", description: "Use dark theme throughout the app", defaultChecked: true },
                  { label: "Compact View", description: "Show more information in less space", defaultChecked: false },
                  { label: "Animations", description: "Enable smooth transitions and animations", defaultChecked: true },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-4 rounded-xl bg-muted/30 border border-border/50">
                    <div className="flex-1 pr-4">
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <Switch defaultChecked={item.defaultChecked} />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-elec-yellow" />
                Security
              </CardTitle>
              <CardDescription>Manage your account security settings</CardDescription>
            </CardHeader>
            <CardContent className={`flex ${isMobile ? 'flex-col' : 'flex-wrap'} gap-3`}>
              <Button variant="outline" className={isMobile ? 'w-full h-12' : ''}>Change Password</Button>
              <Button variant="outline" className={isMobile ? 'w-full h-12' : ''}>Enable Two-Factor Authentication</Button>
              <Button variant="outline" className={isMobile ? 'w-full h-12' : ''}>Manage API Keys</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}