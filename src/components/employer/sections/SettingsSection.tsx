import { useState, useEffect, useRef } from 'react';
import { RefreshCw, Loader2, Upload, Image as ImageIcon, Trash2, RotateCw, Plus } from 'lucide-react';
import {
  getSetting,
  setSetting,
  getCompanySettings,
  saveCompanySettings,
  getBrandingSettings,
  saveBrandingSettings,
  uploadCompanyLogo,
  type CompanySettings,
  type BrandingSettings,
} from '@/services/settingsService';
import {
  useTeamMembers,
  useInviteTeamMember,
  useRemoveTeamMember,
  useResendInvitation,
  type TeamMemberRole,
} from '@/hooks/useTeamMembers';
import { InviteTeamMemberDialog } from '../dialogs/InviteTeamMemberDialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { useIsMobile } from '@/hooks/use-mobile';
import { permissionsList, rolePermissions, type TeamRole } from '@/data/employerMockData';
import { StripeConnectCard } from '../StripeConnectCard';
import VoiceSettingsPanel from '../VoiceSettingsPanel';
import {
  PageFrame,
  PageHero,
  IconButton,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  Avatar as EditorialAvatar,
  LoadingBlocks,
  EmptyState,
  Eyebrow,
  Divider,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  inputClass,
  selectTriggerClass,
  selectContentClass,
  checkboxClass,
} from '@/components/employer/editorial';

export function SettingsSection() {
  const isMobile = useIsMobile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    certificationReminders: true,
    jobUpdates: true,
    invoiceAlerts: true,
    tenderDeadlines: true,
    safetyAlerts: true,
  });

  const [selectedRole, setSelectedRole] = useState<TeamRole>('Operative');
  const [rolePerms, setRolePerms] = useState<Record<TeamRole, string[]>>(rolePermissions);
  const [notificationEmail, setNotificationEmail] = useState('');
  const [savingEmail, setSavingEmail] = useState(false);

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
    bank_account_number: '',
  });
  const [loadingCompany, setLoadingCompany] = useState(true);
  const [savingCompany, setSavingCompany] = useState(false);

  const [brandingSettings, setBrandingSettings] = useState<BrandingSettings>({
    company_logo_url: null,
    brand_primary_color: '#f59e0b',
    brand_secondary_color: '#0f172a',
  });
  const [uploadingLogo, setUploadingLogo] = useState(false);
  const [savingBranding, setSavingBranding] = useState(false);

  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const { data: teamMembers = [], isLoading: teamLoading } = useTeamMembers();
  const inviteTeamMember = useInviteTeamMember();
  const removeTeamMember = useRemoveTeamMember();
  const resendInvitation = useResendInvitation();

  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    getSetting('business_notification_email').then((value) => {
      if (value) setNotificationEmail(value);
    });
    getCompanySettings().then((settings) => {
      setCompanySettings(settings);
      setLoadingCompany(false);
    });
    getBrandingSettings().then((settings) => {
      setBrandingSettings(settings);
    });
  }, []);

  const refresh = async () => {
    setLoadingCompany(true);
    const [emailVal, company, branding] = await Promise.all([
      getSetting('business_notification_email'),
      getCompanySettings(),
      getBrandingSettings(),
    ]);
    if (emailVal) setNotificationEmail(emailVal);
    setCompanySettings(company);
    setBrandingSettings(branding);
    setLoadingCompany(false);
    setDirty(false);
    toast({ title: 'Refreshed', description: 'Settings reloaded.' });
  };

  const updateCompany = (patch: Partial<CompanySettings>) => {
    setCompanySettings((prev) => ({ ...prev, ...patch }));
    setDirty(true);
  };

  const updateBranding = (patch: Partial<BrandingSettings>) => {
    setBrandingSettings((prev) => ({ ...prev, ...patch }));
    setDirty(true);
  };

  const handleSaveNotificationEmail = async () => {
    setSavingEmail(true);
    const success = await setSetting('business_notification_email', notificationEmail);
    setSavingEmail(false);
    if (success) {
      toast({ title: 'Saved', description: 'Notification email updated successfully.' });
    } else {
      toast({
        title: 'Error',
        description: 'Failed to save notification email.',
        variant: 'destructive',
      });
    }
  };

  const handleLogoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file',
        description: 'Please select an image file.',
        variant: 'destructive',
      });
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Maximum file size is 20MB.',
        variant: 'destructive',
      });
      return;
    }
    setUploadingLogo(true);
    const logoUrl = await uploadCompanyLogo(file);
    setUploadingLogo(false);
    if (logoUrl) {
      setBrandingSettings((prev) => ({ ...prev, company_logo_url: logoUrl }));
      setDirty(true);
      toast({ title: 'Logo uploaded', description: 'Your company logo has been updated.' });
    } else {
      toast({
        title: 'Upload failed',
        description: 'Failed to upload logo. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSaveBranding = async () => {
    setSavingBranding(true);
    const success = await saveBrandingSettings(brandingSettings);
    setSavingBranding(false);
    if (success) {
      toast({ title: 'Saved', description: 'Branding settings updated successfully.' });
      setDirty(false);
    } else {
      toast({
        title: 'Error',
        description: 'Failed to save branding settings.',
        variant: 'destructive',
      });
    }
  };

  const handleSaveCompany = async () => {
    setSavingCompany(true);
    const success = await saveCompanySettings(companySettings);
    setSavingCompany(false);
    if (success) {
      toast({ title: 'Saved', description: 'Company details updated successfully.' });
      setDirty(false);
    } else {
      toast({
        title: 'Error',
        description: 'Failed to save company details.',
        variant: 'destructive',
      });
    }
  };

  const handleSaveAll = async () => {
    setSavingCompany(true);
    setSavingBranding(true);
    const [companyOk, brandingOk] = await Promise.all([
      saveCompanySettings(companySettings),
      saveBrandingSettings(brandingSettings),
    ]);
    setSavingCompany(false);
    setSavingBranding(false);
    if (companyOk && brandingOk) {
      toast({ title: 'Saved', description: 'All changes saved.' });
      setDirty(false);
    } else {
      toast({
        title: 'Some changes failed',
        description: 'Review and try again.',
        variant: 'destructive',
      });
    }
  };

  const handleInviteTeamMember = async (data: {
    email: string;
    name?: string;
    role: TeamMemberRole;
  }) => {
    await inviteTeamMember.mutateAsync(data);
  };

  const integrations = [
    {
      name: 'Stripe Connect',
      description: 'Accept card payments directly into your account',
      connected: false,
      tone: 'purple' as const,
    },
    {
      name: 'Xero',
      description: 'Accounting & payroll integration',
      connected: true,
      tone: 'cyan' as const,
    },
    {
      name: 'Sage',
      description: 'Accounting software sync',
      connected: false,
      tone: 'green' as const,
    },
    {
      name: 'Google Workspace',
      description: 'Calendar and email sync',
      connected: false,
      tone: 'blue' as const,
    },
    {
      name: 'Dropbox',
      description: 'Document storage',
      connected: true,
      tone: 'indigo' as const,
    },
  ];

  const handleSavePermissions = () => {
    toast({
      title: 'Permissions saved',
      description: `Permissions for ${selectedRole} role have been updated.`,
    });
  };

  const togglePermission = (permId: string) => {
    setRolePerms((prev) => {
      const currentPerms = prev[selectedRole] || [];
      if (currentPerms.includes(permId)) {
        return { ...prev, [selectedRole]: currentPerms.filter((p) => p !== permId) };
      }
      return { ...prev, [selectedRole]: [...currentPerms, permId] };
    });
  };

  const getInitials = (member: { name?: string; email: string }) =>
    (member.name || member.email)
      .split(/[ @]/)
      .map((n) => n[0]?.toUpperCase() || '')
      .filter(Boolean)
      .slice(0, 2)
      .join('');

  const notificationItems = [
    { key: 'emailAlerts', label: 'Email alerts', description: 'Receive important updates via email' },
    { key: 'certificationReminders', label: 'Certification reminders', description: 'Get notified when certifications are expiring' },
    { key: 'jobUpdates', label: 'Job updates', description: 'Notifications about job progress and completions' },
    { key: 'invoiceAlerts', label: 'Invoice alerts', description: 'Payment reminders and overdue notices' },
    { key: 'tenderDeadlines', label: 'Tender deadlines', description: 'Reminders for upcoming tender deadlines' },
    { key: 'safetyAlerts', label: 'Safety alerts', description: 'Immediate notifications for safety incidents' },
  ] as const;

  if (loadingCompany) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Admin"
          title="Settings"
          description="Company profile, branding, integrations and team permissions."
          tone="yellow"
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  return (
    <>
      <PageFrame>
        <PageHero
          eyebrow="Admin"
          title="Settings"
          description="Company profile, branding, integrations and team permissions."
          tone="yellow"
          actions={
            <IconButton onClick={refresh} aria-label="Refresh settings">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          }
        />

        {/* General */}
        <ListCard>
          <ListCardHeader
            tone="yellow"
            title="General"
            meta={<Pill tone="yellow">Company</Pill>}
          />
          <ListBody>
            <ListRow
              title="Company name"
              subtitle="Shown on quotes, invoices and emails"
              trailing={
                <Input
                  value={companySettings.company_name}
                  onChange={(e) => updateCompany({ company_name: e.target.value })}
                  placeholder="Your Company Ltd"
                  className={`${inputClass} w-56`}
                />
              }
            />
            <ListRow
              title="Company number"
              subtitle="Companies House registration"
              trailing={
                <Input
                  value={companySettings.company_number}
                  onChange={(e) => updateCompany({ company_number: e.target.value })}
                  placeholder="12345678"
                  className={`${inputClass} w-40`}
                />
              }
            />
            <ListRow
              title="VAT number"
              subtitle="Used on invoices where applicable"
              trailing={
                <Input
                  value={companySettings.company_vat_number}
                  onChange={(e) => updateCompany({ company_vat_number: e.target.value })}
                  placeholder="GB123456789"
                  className={`${inputClass} w-40`}
                />
              }
            />
            <ListRow
              title="Phone"
              subtitle="Primary contact number"
              trailing={
                <Input
                  value={companySettings.company_phone}
                  onChange={(e) => updateCompany({ company_phone: e.target.value })}
                  placeholder="+44 123 456 7890"
                  className={`${inputClass} w-56`}
                />
              }
            />
            <ListRow
              title="Email"
              subtitle="Public contact address"
              trailing={
                <Input
                  type="email"
                  value={companySettings.company_email}
                  onChange={(e) => updateCompany({ company_email: e.target.value })}
                  placeholder="info@yourcompany.com"
                  className={`${inputClass} w-64`}
                />
              }
            />
            <ListRow
              title="Website"
              subtitle="Linked from quote PDFs"
              trailing={
                <Input
                  value={companySettings.company_website}
                  onChange={(e) => updateCompany({ company_website: e.target.value })}
                  placeholder="https://yourcompany.com"
                  className={`${inputClass} w-64`}
                />
              }
            />
            <ListRow
              title="Registered address"
              subtitle="Used on letterhead and invoices"
              trailing={
                <Input
                  value={companySettings.company_address}
                  onChange={(e) => updateCompany({ company_address: e.target.value })}
                  placeholder="123 Business Park, City, Postcode"
                  className={`${inputClass} w-72`}
                />
              }
            />
          </ListBody>
        </ListCard>

        {/* Branding */}
        <ListCard>
          <ListCardHeader
            tone="purple"
            title="Branding"
            meta={<Pill tone="purple">Identity</Pill>}
          />
          <ListBody>
            <ListRow
              title="Company logo"
              subtitle="PNG, JPG or SVG. Max 20MB. Recommended 400x200px"
              lead={
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="relative h-14 w-20 rounded-lg border border-white/[0.08] bg-[hsl(0_0%_10%)] flex items-center justify-center overflow-hidden touch-manipulation hover:bg-[hsl(0_0%_15%)] transition-colors"
                >
                  {brandingSettings.company_logo_url ? (
                    <img
                      src={brandingSettings.company_logo_url}
                      alt="Company logo"
                      className="max-w-full max-h-full object-contain p-1.5"
                    />
                  ) : (
                    <ImageIcon className="h-5 w-5 text-white" />
                  )}
                  {uploadingLogo && (
                    <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                      <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
                    </div>
                  )}
                </button>
              }
              trailing={
                <>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <SecondaryButton
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploadingLogo}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    {uploadingLogo ? 'Uploading…' : 'Upload'}
                  </SecondaryButton>
                </>
              }
            />
            <ListRow
              title="Primary colour"
              subtitle="Buttons, accents and CTAs"
              trailing={
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={brandingSettings.brand_primary_color}
                    onChange={(e) => updateBranding({ brand_primary_color: e.target.value })}
                    className="h-11 w-11 rounded-lg border border-white/10 cursor-pointer appearance-none bg-transparent touch-manipulation"
                    style={{ padding: 0 }}
                  />
                  <Input
                    value={brandingSettings.brand_primary_color}
                    onChange={(e) => updateBranding({ brand_primary_color: e.target.value })}
                    placeholder="#f59e0b"
                    className={`${inputClass} w-32 font-mono uppercase`}
                  />
                </div>
              }
            />
            <ListRow
              title="Secondary colour"
              subtitle="Headers and panel backgrounds"
              trailing={
                <div className="flex items-center gap-2">
                  <input
                    type="color"
                    value={brandingSettings.brand_secondary_color}
                    onChange={(e) => updateBranding({ brand_secondary_color: e.target.value })}
                    className="h-11 w-11 rounded-lg border border-white/10 cursor-pointer appearance-none bg-transparent touch-manipulation"
                    style={{ padding: 0 }}
                  />
                  <Input
                    value={brandingSettings.brand_secondary_color}
                    onChange={(e) => updateBranding({ brand_secondary_color: e.target.value })}
                    placeholder="#0f172a"
                    className={`${inputClass} w-32 font-mono uppercase`}
                  />
                </div>
              }
            />
            <ListRow
              title="Live preview"
              subtitle="How your brand looks together"
              trailing={
                <div className="flex items-center gap-2">
                  <div
                    className="h-9 px-3 rounded-md flex items-center text-[12px] font-medium text-white border border-white/10"
                    style={{ backgroundColor: brandingSettings.brand_secondary_color }}
                  >
                    Header
                  </div>
                  <div
                    className="h-9 px-4 rounded-md flex items-center text-[12px] font-medium text-white border border-white/10"
                    style={{ backgroundColor: brandingSettings.brand_primary_color }}
                  >
                    Button
                  </div>
                </div>
              }
            />
            <ListRow
              title="Save branding"
              subtitle="Apply colour and logo changes"
              trailing={
                <PrimaryButton onClick={handleSaveBranding} disabled={savingBranding}>
                  {savingBranding ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                  {savingBranding ? 'Saving…' : 'Save branding'}
                </PrimaryButton>
              }
            />
          </ListBody>
        </ListCard>

        {/* Voice Assistant */}
        <ListCard>
          <ListCardHeader
            tone="indigo"
            title="Voice assistant"
            meta={<Pill tone="indigo">Mate</Pill>}
          />
          <div className="p-5 sm:p-6">
            <VoiceSettingsPanel />
          </div>
        </ListCard>

        {/* Notifications */}
        <ListCard>
          <ListCardHeader
            tone="blue"
            title="Notifications"
            meta={<Pill tone="blue">Alerts</Pill>}
          />
          <ListBody>
            <ListRow
              title="Notification email"
              subtitle="Where quote and invoice alerts are sent"
              trailing={
                <div className="flex items-center gap-2">
                  <Input
                    type="email"
                    placeholder="accounts@yourcompany.com"
                    value={notificationEmail}
                    onChange={(e) => setNotificationEmail(e.target.value)}
                    className={`${inputClass} w-64`}
                  />
                  <PrimaryButton onClick={handleSaveNotificationEmail} disabled={savingEmail}>
                    {savingEmail ? 'Saving…' : 'Save'}
                  </PrimaryButton>
                </div>
              }
            />
            {notificationItems.map((item) => (
              <ListRow
                key={item.key}
                title={item.label}
                subtitle={item.description}
                trailing={
                  <Switch
                    checked={notifications[item.key as keyof typeof notifications]}
                    onCheckedChange={(checked) =>
                      setNotifications((prev) => ({ ...prev, [item.key]: checked }))
                    }
                  />
                }
              />
            ))}
          </ListBody>
        </ListCard>

        {/* Security */}
        <ListCard>
          <ListCardHeader
            tone="orange"
            title="Security"
            meta={<Pill tone="orange">Account</Pill>}
          />
          <ListBody>
            <ListRow
              title="Change password"
              subtitle="Update your sign-in credentials"
              trailing={
                <SecondaryButton>Change</SecondaryButton>
              }
            />
            <ListRow
              title="Two-factor authentication"
              subtitle="Add an extra step at sign-in"
              trailing={
                <SecondaryButton>Enable</SecondaryButton>
              }
            />
            <ListRow
              title="Session timeout"
              subtitle="Auto sign-out after inactivity"
              trailing={
                <Select defaultValue="60">
                  <SelectTrigger className={`${selectTriggerClass} w-40`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="15">15 minutes</SelectItem>
                    <SelectItem value="30">30 minutes</SelectItem>
                    <SelectItem value="60">1 hour</SelectItem>
                    <SelectItem value="240">4 hours</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              }
            />
            <ListRow
              title="Password policy"
              subtitle="Minimum strength requirements"
              trailing={
                <Select defaultValue="strong">
                  <SelectTrigger className={`${selectTriggerClass} w-40`}>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className={selectContentClass}>
                    <SelectItem value="basic">Basic</SelectItem>
                    <SelectItem value="strong">Strong</SelectItem>
                    <SelectItem value="enterprise">Enterprise</SelectItem>
                  </SelectContent>
                </Select>
              }
            />
            <ListRow
              title="API keys"
              subtitle="Manage developer access tokens"
              trailing={
                <SecondaryButton>Manage</SecondaryButton>
              }
            />
          </ListBody>
        </ListCard>

        {/* Integrations */}
        <ListCard>
          <ListCardHeader
            tone="emerald"
            title="Integrations"
            meta={<Pill tone="emerald">{integrations.length}</Pill>}
          />
          <ListBody>
            {integrations.map((integration) => (
              <ListRow
                key={integration.name}
                accent={integration.tone}
                title={
                  <span className="inline-flex items-center gap-2">
                    {integration.name}
                    {integration.connected && (
                      <Pill tone="emerald">Connected</Pill>
                    )}
                  </span>
                }
                subtitle={integration.description}
                trailing={
                  <SecondaryButton>
                    {integration.connected ? 'Manage' : 'Connect'}
                  </SecondaryButton>
                }
              />
            ))}
          </ListBody>
        </ListCard>

        <div className="hidden">
          <StripeConnectCard />
        </div>

        {/* Document templates */}
        <ListCard>
          <ListCardHeader
            tone="amber"
            title="Document templates"
            meta={<Pill tone="amber">RAMS</Pill>}
          />
          <ListBody>
            {[
              'RAMS template',
              'Method statement template',
              'Briefing pack template',
              'Closeout report template',
            ].map((template) => (
              <ListRow
                key={template}
                title={template}
                subtitle="Branded with your colours and logo"
                trailing={
                  <div className="flex items-center gap-2">
                    <SecondaryButton>Edit</SecondaryButton>
                    <SecondaryButton>Download</SecondaryButton>
                  </div>
                }
              />
            ))}
          </ListBody>
        </ListCard>

        {/* Team — Members */}
        <ListCard>
          <ListCardHeader
            tone="cyan"
            title="Team members"
            meta={<Pill tone="cyan">{teamMembers.length}</Pill>}
            action="Invite"
            onAction={() => setShowInviteDialog(true)}
          />
          {teamLoading ? (
            <div className="p-6">
              <LoadingBlocks />
            </div>
          ) : teamMembers.length === 0 ? (
            <EmptyState
              title="No team members yet"
              description="Invite operatives, supervisors and PMs to access the dashboard."
              action="Invite team member"
              onAction={() => setShowInviteDialog(true)}
            />
          ) : (
            <ListBody>
              {teamMembers.map((member) => (
                <ListRow
                  key={member.id}
                  lead={<EditorialAvatar initials={getInitials(member)} />}
                  title={member.name || member.email}
                  subtitle={member.email}
                  trailing={
                    <>
                      <Pill tone={member.status === 'Pending' ? 'amber' : 'emerald'}>
                        {member.status === 'Pending' ? 'Pending' : member.role}
                      </Pill>
                      {member.status === 'Pending' && (
                        <IconButton
                          aria-label="Resend invitation"
                          onClick={() => resendInvitation.mutate(member.id)}
                          disabled={resendInvitation.isPending}
                        >
                          <RotateCw
                            className={`h-4 w-4 ${resendInvitation.isPending ? 'animate-spin' : ''}`}
                          />
                        </IconButton>
                      )}
                      {member.role !== 'Owner' && (
                        <IconButton
                          aria-label="Remove member"
                          onClick={() => removeTeamMember.mutate(member.id)}
                          disabled={removeTeamMember.isPending}
                        >
                          <Trash2 className="h-4 w-4" />
                        </IconButton>
                      )}
                    </>
                  }
                />
              ))}
            </ListBody>
          )}
        </ListCard>

        {/* Team — Roles & permissions */}
        <ListCard>
          <ListCardHeader
            tone="cyan"
            title="Roles & permissions"
            meta={<Pill tone="cyan">{selectedRole}</Pill>}
            action="Save"
            onAction={handleSavePermissions}
          />
          <div className="px-5 sm:px-6 pt-4 pb-2">
            <Eyebrow>Select role</Eyebrow>
            <div className={`mt-3 flex gap-2 ${isMobile ? 'flex-wrap' : ''}`}>
              {(['QS', 'Supervisor', 'Operative', 'Apprentice'] as TeamRole[]).map((role) => {
                const active = selectedRole === role;
                return (
                  <button
                    key={role}
                    onClick={() => setSelectedRole(role)}
                    className={`h-11 px-4 rounded-full text-[12.5px] font-medium touch-manipulation transition-colors ${
                      active
                        ? 'bg-elec-yellow text-black'
                        : 'bg-[hsl(0_0%_10%)] text-white border border-white/10 hover:bg-white/[0.06]'
                    } ${isMobile ? 'flex-1' : ''}`}
                  >
                    {role}
                  </button>
                );
              })}
            </div>
          </div>
          <Divider />
          <ListBody>
            {permissionsList.map((perm) => (
              <ListRow
                key={perm.id}
                lead={
                  <Checkbox
                    id={perm.id}
                    checked={rolePerms[selectedRole]?.includes(perm.id) || false}
                    onCheckedChange={() => togglePermission(perm.id)}
                    className={checkboxClass}
                  />
                }
                title={perm.name}
                subtitle={perm.description}
              />
            ))}
          </ListBody>
        </ListCard>

        {/* Billing — payment details */}
        <ListCard>
          <ListCardHeader
            tone="amber"
            title="Billing & payments"
            meta={<Pill tone="amber">Bank</Pill>}
          />
          <ListBody>
            <ListRow
              title="Account name"
              subtitle="Appears on invoice payment instructions"
              trailing={
                <Input
                  value={companySettings.bank_account_name}
                  onChange={(e) => updateCompany({ bank_account_name: e.target.value })}
                  placeholder="Your Company Ltd"
                  className={`${inputClass} w-64`}
                />
              }
            />
            <ListRow
              title="Sort code"
              subtitle="UK bank sort code"
              trailing={
                <Input
                  value={companySettings.bank_sort_code}
                  onChange={(e) => updateCompany({ bank_sort_code: e.target.value })}
                  placeholder="00-00-00"
                  className={`${inputClass} w-32 font-mono`}
                />
              }
            />
            <ListRow
              title="Account number"
              subtitle="8-digit account number"
              trailing={
                <Input
                  value={companySettings.bank_account_number}
                  onChange={(e) => updateCompany({ bank_account_number: e.target.value })}
                  placeholder="12345678"
                  className={`${inputClass} w-40 font-mono`}
                />
              }
            />
            <ListRow
              title="Subscription"
              subtitle="Manage plan and payment methods"
              trailing={
                <SecondaryButton>Manage</SecondaryButton>
              }
            />
            <ListRow
              title="Invoices"
              subtitle="View and download past invoices"
              trailing={
                <SecondaryButton>View</SecondaryButton>
              }
            />
            <ListRow
              title="Save payment details"
              subtitle="Update bank info shown on invoices"
              trailing={
                <PrimaryButton onClick={handleSaveCompany} disabled={savingCompany}>
                  {savingCompany ? 'Saving…' : 'Save'}
                </PrimaryButton>
              }
            />
          </ListBody>
        </ListCard>

        {/* Danger zone */}
        <ListCard className="border-red-500/30">
          <ListCardHeader
            tone="red"
            title="Danger zone"
            meta={<Pill tone="red">Irreversible</Pill>}
          />
          <ListBody>
            <ListRow
              title="Export all data"
              subtitle="Download a JSON archive of every record"
              trailing={
                <SecondaryButton>Export</SecondaryButton>
              }
            />
            <ListRow
              title="Delete account"
              subtitle="Permanently remove your organisation and all data"
              trailing={
                <DestructiveButton>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </DestructiveButton>
              }
            />
          </ListBody>
        </ListCard>

        <InviteTeamMemberDialog
          open={showInviteDialog}
          onOpenChange={setShowInviteDialog}
          onInvite={handleInviteTeamMember}
          isInviting={inviteTeamMember.isPending}
        />
      </PageFrame>

      {/* Sticky save bar */}
      {dirty && (
        <div className="fixed bottom-0 inset-x-0 z-40 border-t border-white/[0.06] bg-[hsl(0_0%_8%)]/95 backdrop-blur-xl pb-safe">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-[13px] font-semibold text-white truncate">Unsaved changes</div>
              <div className="text-[11.5px] text-white truncate">
                Save to apply company and branding updates.
              </div>
            </div>
            <div className="shrink-0 flex items-center gap-2">
              <SecondaryButton onClick={refresh}>Discard</SecondaryButton>
              <PrimaryButton
                onClick={handleSaveAll}
                disabled={savingCompany || savingBranding}
              >
                {savingCompany || savingBranding ? (
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                ) : null}
                {savingCompany || savingBranding ? 'Saving…' : 'Save all'}
              </PrimaryButton>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
