import { useState, useEffect, useRef } from 'react';
import { RefreshCw, Loader2, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import {
  getNotificationEmail,
  setNotificationEmail as saveNotificationEmail,
  getCompanySettings,
  saveCompanySettings,
  getBrandingSettings,
  saveBrandingSettings,
  uploadCompanyLogo,
  type CompanySettings,
  type BrandingSettings,
} from '@/services/settingsService';
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
import { supabase } from '@/integrations/supabase/client';
import { StripeConnectCard } from '../StripeConnectCard';
import {
  PageFrame,
  PageHero,
  IconButton,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  LoadingBlocks,
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

/**
 * A settings row with an editable field. On phones the input stacks BELOW the
 * label at full width (fixed-width inputs in ListRow's no-shrink trailing slot
 * crushed the titles and overflowed 375px screens); from sm: up it sits
 * trailing like a standard ListRow.
 */
function SettingFieldRow({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="px-4 sm:px-5 py-3.5 sm:py-4 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:gap-3.5">
      <div className="flex-1 min-w-0">
        <div className="text-[14px] font-medium text-white">{title}</div>
        {subtitle && <div className="mt-0.5 text-[11.5px] text-white/55">{subtitle}</div>}
      </div>
      <div className="sm:shrink-0 flex items-center gap-2 w-full sm:w-auto">{children}</div>
    </div>
  );
}

export function SettingsSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);
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
  // Guards against saving default branding values over real ones before
  // the profile has loaded (would null the logo / reset colours)
  const [brandingLoaded, setBrandingLoaded] = useState(false);

  const [dirty, setDirty] = useState(false);

  // QS sign-off gate — "QS approval required before issue" (company_profiles)
  const [qsApprovalRequired, setQsApprovalRequired] = useState(false);
  const [qsToggleSaving, setQsToggleSaving] = useState(false);

  // "I am my own Qualifying Supervisor" — lets the owner countersign their OWN
  // certificates (company_profiles.owner_is_qs). For sole traders / registration holders.
  const [ownerIsQs, setOwnerIsQs] = useState(false);
  const [ownerQsSaving, setOwnerQsSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;
      // owner_is_qs is a newly-added column not yet in the generated types — cast.
      const { data } = await (supabase as any)
        .from('company_profiles')
        .select('qs_approval_required, owner_is_qs')
        .eq('user_id', user.id)
        .maybeSingle();
      setQsApprovalRequired(!!data?.qs_approval_required);
      setOwnerIsQs(!!data?.owner_is_qs);
    })();
  }, []);

  const handleToggleQsApproval = async (checked: boolean) => {
    const previous = qsApprovalRequired;
    setQsApprovalRequired(checked);
    setQsToggleSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      const { data: updated, error } = await supabase
        .from('company_profiles')
        .update({ qs_approval_required: checked })
        .eq('user_id', user.id)
        .select('id');
      if (error) throw error;

      // No company profile row yet — create one carrying just the setting
      // (company_name is NOT NULL; the employer fills it in properly later)
      if (!updated || updated.length === 0) {
        const { error: insertError } = await supabase
          .from('company_profiles')
          .insert({ user_id: user.id, company_name: '', qs_approval_required: checked });
        if (insertError) throw insertError;
      }

      toast({
        title: checked ? 'QS approval now required' : 'QS approval optional',
        description: checked
          ? 'Team certificates must be countersigned by a QS before they can be issued.'
          : 'Team members can issue certificates without QS sign-off.',
      });
    } catch (err) {
      console.error('[Settings] QS gate toggle failed:', err);
      setQsApprovalRequired(previous);
      toast({ title: 'Could not save setting', variant: 'destructive' });
    } finally {
      setQsToggleSaving(false);
    }
  };

  const handleToggleOwnerIsQs = async (checked: boolean) => {
    const previous = ownerIsQs;
    setOwnerIsQs(checked);
    setOwnerQsSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error('Not authenticated');

      // owner_is_qs is not yet in the generated types — cast the writes.
      const { data: updated, error } = await (supabase as any)
        .from('company_profiles')
        .update({ owner_is_qs: checked })
        .eq('user_id', user.id)
        .select('id');
      if (error) throw error;

      if (!updated || updated.length === 0) {
        const { error: insertError } = await (supabase as any)
          .from('company_profiles')
          .insert({ user_id: user.id, company_name: '', owner_is_qs: checked });
        if (insertError) throw insertError;
      }

      toast({
        title: checked ? "You're set as your own QS" : 'Self sign-off turned off',
        description: checked
          ? 'You can now review and countersign your own certificates as Qualifying Supervisor.'
          : 'Your own certificates will need a separate QS to sign them off.',
      });
    } catch (err) {
      console.error('[Settings] owner-QS toggle failed:', err);
      setOwnerIsQs(previous);
      toast({ title: 'Could not save setting', variant: 'destructive' });
    } finally {
      setOwnerQsSaving(false);
    }
  };

  useEffect(() => {
    getNotificationEmail().then((value) => {
      if (value) setNotificationEmail(value);
    });
    getCompanySettings().then((settings) => {
      setCompanySettings(settings);
      setLoadingCompany(false);
    });
    getBrandingSettings().then((settings) => {
      setBrandingSettings(settings);
      setBrandingLoaded(true);
    });
  }, []);

  const refresh = async () => {
    setLoadingCompany(true);
    const [emailVal, company, branding] = await Promise.all([
      getNotificationEmail(),
      getCompanySettings(),
      getBrandingSettings(),
    ]);
    if (emailVal) setNotificationEmail(emailVal);
    setCompanySettings(company);
    setBrandingSettings(branding);
    setBrandingLoaded(true);
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
    const success = await saveNotificationEmail(notificationEmail);
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
    if (!brandingLoaded) return;
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
      brandingLoaded ? saveBrandingSettings(brandingSettings) : Promise.resolve(true),
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

  if (loadingCompany) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Admin"
          title="Settings"
          description="Company profile, branding, payments and QS sign-off."
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
          description="Company profile, branding, payments and QS sign-off."
          tone="yellow"
          actions={
            <IconButton onClick={refresh} aria-label="Refresh settings">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          }
        />

        {/* General */}
        <ListCard>
          <ListCardHeader tone="yellow" title="General" meta={<Pill tone="yellow">Company</Pill>} />
          <ListBody>
            <SettingFieldRow title="Company name" subtitle="Shown on quotes, invoices and emails">
              <Input
                value={companySettings.company_name}
                onChange={(e) => updateCompany({ company_name: e.target.value })}
                placeholder="Your Company Ltd"
                className={`${inputClass} w-full sm:w-56`}
              />
            </SettingFieldRow>
            <SettingFieldRow title="Company number" subtitle="Companies House registration">
              <Input
                value={companySettings.company_number}
                onChange={(e) => updateCompany({ company_number: e.target.value })}
                placeholder="12345678"
                className={`${inputClass} w-full sm:w-40`}
              />
            </SettingFieldRow>
            <SettingFieldRow title="VAT number" subtitle="Used on invoices where applicable">
              <Input
                value={companySettings.company_vat_number}
                onChange={(e) => updateCompany({ company_vat_number: e.target.value })}
                placeholder="GB123456789"
                className={`${inputClass} w-full sm:w-40`}
              />
            </SettingFieldRow>
            <SettingFieldRow title="Phone" subtitle="Primary contact number">
              <Input
                value={companySettings.company_phone}
                onChange={(e) => updateCompany({ company_phone: e.target.value })}
                placeholder="+44 123 456 7890"
                className={`${inputClass} w-full sm:w-56`}
              />
            </SettingFieldRow>
            <SettingFieldRow title="Email" subtitle="Public contact address">
              <Input
                type="email"
                value={companySettings.company_email}
                onChange={(e) => updateCompany({ company_email: e.target.value })}
                placeholder="info@yourcompany.com"
                className={`${inputClass} w-full sm:w-64`}
              />
            </SettingFieldRow>
            <SettingFieldRow title="Website" subtitle="Linked from quote PDFs">
              <Input
                value={companySettings.company_website}
                onChange={(e) => updateCompany({ company_website: e.target.value })}
                placeholder="https://yourcompany.com"
                className={`${inputClass} w-full sm:w-64`}
              />
            </SettingFieldRow>
            <SettingFieldRow title="Registered address" subtitle="Used on letterhead and invoices">
              <Input
                value={companySettings.company_address}
                onChange={(e) => updateCompany({ company_address: e.target.value })}
                placeholder="123 Business Park, City, Postcode"
                className={`${inputClass} w-full sm:w-72`}
              />
            </SettingFieldRow>
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
            <SettingFieldRow title="Primary colour" subtitle="Buttons, accents and CTAs">
              <input
                type="color"
                value={brandingSettings.brand_primary_color}
                onChange={(e) => updateBranding({ brand_primary_color: e.target.value })}
                className="h-11 w-11 shrink-0 rounded-lg border border-white/10 cursor-pointer appearance-none bg-transparent touch-manipulation"
                style={{ padding: 0 }}
              />
              <Input
                value={brandingSettings.brand_primary_color}
                onChange={(e) => updateBranding({ brand_primary_color: e.target.value })}
                placeholder="#f59e0b"
                className={`${inputClass} flex-1 sm:flex-none sm:w-32 font-mono uppercase`}
              />
            </SettingFieldRow>
            <SettingFieldRow title="Secondary colour" subtitle="Headers and panel backgrounds">
              <input
                type="color"
                value={brandingSettings.brand_secondary_color}
                onChange={(e) => updateBranding({ brand_secondary_color: e.target.value })}
                className="h-11 w-11 shrink-0 rounded-lg border border-white/10 cursor-pointer appearance-none bg-transparent touch-manipulation"
                style={{ padding: 0 }}
              />
              <Input
                value={brandingSettings.brand_secondary_color}
                onChange={(e) => updateBranding({ brand_secondary_color: e.target.value })}
                placeholder="#0f172a"
                className={`${inputClass} flex-1 sm:flex-none sm:w-32 font-mono uppercase`}
              />
            </SettingFieldRow>
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

        {/* Notifications */}
        <ListCard>
          <ListCardHeader
            tone="blue"
            title="Notifications"
            meta={<Pill tone="blue">Alerts</Pill>}
          />
          <ListBody>
            <SettingFieldRow
              title="Notification email"
              subtitle="Where quote and invoice alerts are sent"
            >
              <Input
                type="email"
                placeholder="accounts@yourcompany.com"
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
                className={`${inputClass} flex-1 sm:flex-none sm:w-64`}
              />
              <PrimaryButton onClick={handleSaveNotificationEmail} disabled={savingEmail}>
                {savingEmail ? 'Saving…' : 'Save'}
              </PrimaryButton>
            </SettingFieldRow>
          </ListBody>
        </ListCard>

        {/* Payments — Stripe Connect (the one real integration) */}
        <StripeConnectCard />

        {/* Team — QS sign-off */}
        <ListCard>
          <ListCardHeader
            tone="yellow"
            title="QS sign-off"
            meta={<Pill tone="yellow">{qsApprovalRequired ? 'Required' : 'Optional'}</Pill>}
          />
          <ListBody>
            <ListRow
              title="I am my own Qualifying Supervisor"
              subtitle="Lets you review and countersign your own certificates as the QS. For sole traders and registration-holding owners."
              trailing={
                <Switch
                  checked={ownerIsQs}
                  onCheckedChange={handleToggleOwnerIsQs}
                  disabled={ownerQsSaving}
                />
              }
            />
            <ListRow
              title="Require QS approval before issue"
              subtitle="Team EICR, EIC and Minor Works certificates must be countersigned by a Qualifying Supervisor before the PDF can be issued."
              trailing={
                <Switch
                  checked={qsApprovalRequired}
                  onCheckedChange={handleToggleQsApproval}
                  disabled={qsToggleSaving}
                />
              }
            />
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
            <SettingFieldRow
              title="Account name"
              subtitle="Appears on invoice payment instructions"
            >
              <Input
                value={companySettings.bank_account_name}
                onChange={(e) => updateCompany({ bank_account_name: e.target.value })}
                placeholder="Your Company Ltd"
                className={`${inputClass} w-full sm:w-64`}
              />
            </SettingFieldRow>
            <SettingFieldRow title="Sort code" subtitle="UK bank sort code">
              <Input
                value={companySettings.bank_sort_code}
                onChange={(e) => updateCompany({ bank_sort_code: e.target.value })}
                placeholder="00-00-00"
                className={`${inputClass} w-full sm:w-32 font-mono`}
              />
            </SettingFieldRow>
            <SettingFieldRow title="Account number" subtitle="8-digit account number">
              <Input
                value={companySettings.bank_account_number}
                onChange={(e) => updateCompany({ bank_account_number: e.target.value })}
                placeholder="12345678"
                className={`${inputClass} w-full sm:w-40 font-mono`}
              />
            </SettingFieldRow>
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
              <PrimaryButton onClick={handleSaveAll} disabled={savingCompany || savingBranding}>
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
