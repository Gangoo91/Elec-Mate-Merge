import { useState, useEffect, useRef } from 'react';
import { RefreshCw, Loader2, Upload, Image as ImageIcon, ChevronLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
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
import { ManagersCard } from '@/components/employer/settings/ManagersCard';
import { SeatsCard } from '@/components/employer/settings/SeatsCard';
import { RoleAccessGuide } from '@/components/employer/settings/RoleAccessGuide';
import { useSearchParams } from 'react-router-dom';
import type { EmployerRole } from '@/hooks/useEmployerRole';
import { ROLE_ACCESS } from '@/lib/roleAccess';
import {
  PageFrame,
  PageHero,
  IconButton,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  inputClass,
} from '@/components/employer/editorial';
import {
  PanelHead,
  Row,
  RowList,
  StatusPill,
  frameClass,
  panelShellClass,
} from '@/components/employer/pageParts/PageParts';
import { useAuth } from '@/contexts/AuthContext';
import { getActingEmployerId } from '@/lib/actingEmployer';
import { useEmployerCoAdmin } from '@/hooks/useEmployerCoAdmin';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { SETTINGS_HELP } from '@/components/employer/help/clients';
// ELE-2067: Bring your data across, Export everything, Plain terms (flagged).
import { BringDataAcrossPanel } from '@/components/employer/settings/import/BringDataAcrossPanel';
import { FullExportPanel } from '@/components/employer/settings/import/FullExportPanel';
import {
  PlainTermsPanel,
  usePlainTermsVisibility,
} from '@/components/employer/settings/import/PlainTerms';
import { useFirmImportAccess } from '@/components/employer/settings/import/useFirmImportAccess';
import { MessagingPanel } from '@/components/employer/settings/MessagingPanel';
import { DevelopersPanel } from '@/components/employer/settings/DevelopersPanel';

/** A labelled field in a settings panel: label and hint above the control. */
function FieldCell({
  label,
  hint,
  children,
  className,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('min-w-0', className)}>
      <label className="block text-[13px] font-semibold text-white">{label}</label>
      {hint && <p className="mt-0.5 text-[12.5px] leading-snug text-white">{hint}</p>}
      <div className="mt-1.5 flex items-center gap-2">{children}</div>
    </div>
  );
}

/** A switch row inside a settings panel. */
function ToggleLine({
  title,
  body,
  control,
}: {
  title: string;
  body: string;
  control: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-4 px-4 py-3.5 sm:px-5">
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-semibold text-white">{title}</p>
        <p className="mt-0.5 text-[13px] leading-snug text-white">{body}</p>
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

type SettingsKey =
  | 'general'
  | 'managers'
  | 'access'
  | 'seats'
  | 'branding'
  | 'notifications'
  | 'payments'
  | 'qs'
  | 'bank'
  | 'messaging'
  | 'developers'
  | 'data'
  | 'export'
  | 'terms';

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
  // Co-admins see the firm's details but only the owner can change them.
  const { user: authUser } = useAuth();
  const { data: isCoAdmin } = useEmployerCoAdmin(authUser?.id);
  const importAccess = useFirmImportAccess();
  const plainTerms = usePlainTermsVisibility();

  // Phone: a list of sections, then one section at a time. Desktop: a left
  // nav beside every panel, highlighting the one in view.
  const [phoneSection, setPhoneSection] = useState<SettingsKey | null>(null);
  const [inView, setInView] = useState<SettingsKey>('general');

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
      // The firm's flags — a manager sees the owner's settings, not their own.
      const firmId = (await getActingEmployerId(user.id)) ?? user.id;
      const { data } = await supabase
        .from('company_profiles')
        .select('qs_approval_required, owner_is_qs')
        .eq('user_id', firmId)
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

      const { data: updated, error } = await supabase
        .from('company_profiles')
        .update({ owner_is_qs: checked })
        .eq('user_id', user.id)
        .select('id');
      if (error) throw error;

      if (!updated || updated.length === 0) {
        const { error: insertError } = await supabase
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
    const value = notificationEmail.trim();
    // Empty clears it (no office emails); anything else must look like an address.
    if (value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
      toast({
        title: 'Check the email address',
        description: 'That does not look like an email address.',
        variant: 'destructive',
      });
      return;
    }
    setSavingEmail(true);
    const success = await saveNotificationEmail(value);
    setSavingEmail(false);
    if (success) {
      setNotificationEmail(value);
      toast({
        title: value ? 'Office alerts on' : 'Office alerts off',
        description: value
          ? `Incidents, paid invoices and the weekday summary go to ${value}.`
          : 'No office alert emails will be sent.',
      });
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

  // ?open=access[&role=office] lands "Why can't I see this?" links (ELE-1831)
  // on the role guide, with that role opened.
  const [searchParams] = useSearchParams();
  const openParam = searchParams.get('open');
  const roleParam = searchParams.get('role');
  const focusRole = roleParam && roleParam in ROLE_ACCESS ? (roleParam as EmployerRole) : null;
  // ?open=data / ?open=export (ELE-2067: the Overview's "Bring your data across").
  useEffect(() => {
    if (loadingCompany || (openParam !== 'data' && openParam !== 'export')) return;
    setPhoneSection(openParam);
    setInView(openParam);
    const t = window.setTimeout(
      () =>
        document
          .getElementById(`settings-${openParam}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      150
    );
    return () => window.clearTimeout(t);
  }, [loadingCompany, openParam]);

  // ?open=messaging / ?open=developers (ELE-2070 bell, ELE-2077).
  useEffect(() => {
    if (loadingCompany || (openParam !== 'messaging' && openParam !== 'developers')) return;
    setPhoneSection(openParam);
    setInView(openParam);
    const t = window.setTimeout(
      () =>
        document
          .getElementById(`settings-${openParam}`)
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      150
    );
    return () => window.clearTimeout(t);
  }, [loadingCompany, openParam]);

  useEffect(() => {
    if (loadingCompany || openParam !== 'access') return;
    setPhoneSection('access');
    setInView('access');
    const t = window.setTimeout(
      () =>
        document
          .getElementById(focusRole ? `access-${focusRole}` : 'settings-access')
          ?.scrollIntoView({ behavior: 'smooth', block: 'start' }),
      150
    );
    return () => window.clearTimeout(t);
  }, [loadingCompany, openParam, focusRole]);

  // Desktop scroll-spy for the left nav (only once the panels are drawn).
  useEffect(() => {
    if (loadingCompany || typeof IntersectionObserver === 'undefined') return;
    const els = Array.from(document.querySelectorAll<HTMLElement>('section[id^="settings-"]'));
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((x, y) => x.boundingClientRect.top - y.boundingClientRect.top)[0];
        if (top) setInView(top.target.id.replace('settings-', '') as SettingsKey);
      },
      { rootMargin: '-15% 0px -70% 0px' }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [loadingCompany, isCoAdmin]);

  if (loadingCompany) {
    return (
      <PageFrame className={frameClass}>
        <PageHero title="Settings" description="Loading your firm's settings." />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  const openSection = (key: SettingsKey) => {
    setPhoneSection(key);
    setInView(key);
    requestAnimationFrame(() =>
      document
        .getElementById(`settings-${key}`)
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    );
  };

  // Live "Before you start" lines for the help (ELE-1980). Owner only:
  // managers cannot change these.
  const helpBlockers: HelpBlocker[] = [];
  const missingName = !isCoAdmin && !companySettings.company_name.trim();
  const missingBank =
    !isCoAdmin &&
    (!companySettings.bank_sort_code.trim() || !companySettings.bank_account_number.trim());
  if (missingName) {
    helpBlockers.push({
      text: 'No company name yet. It goes on every quote, invoice and email.',
      fixLabel: 'Add it',
      onFix: () => openSection('general'),
    });
  }
  if (missingBank) {
    helpBlockers.push({
      text: 'No bank details yet, so invoices go out without payment instructions.',
      fixLabel: 'Add bank details',
      onFix: () => openSection('bank'),
    });
  }

  const headline = isCoAdmin
    ? "You can see the firm's settings. Only the account owner can change company details, branding and payments."
    : missingName && missingBank
      ? 'Two things to finish: your company name and your bank details.'
      : missingName
        ? 'Add your company name. It goes on every quote, invoice and email.'
        : missingBank
          ? 'Add your bank details so invoices carry payment instructions.'
          : 'Company profile, branding, payments and QS sign-off.';

  const bankSet =
    !!companySettings.bank_sort_code.trim() && !!companySettings.bank_account_number.trim();
  const sections: { key: SettingsKey; title: string; detail: string; flag?: boolean }[] = [
    {
      key: 'general',
      title: 'Company',
      detail: companySettings.company_name.trim() || 'Not filled in yet',
      flag: missingName,
    },
    {
      key: 'managers',
      title: 'Managers',
      detail: isCoAdmin ? 'You are a manager' : 'Office and admin access',
    },
    {
      key: 'access',
      title: 'Who can see what',
      detail: "Why can't I see this? Each role, explained",
    },
    ...(isCoAdmin !== true
      ? [{ key: 'seats' as const, title: 'Team seats', detail: 'Who holds a seat and the cost' }]
      : []),
    { key: 'branding', title: 'Branding', detail: 'Logo and colours on your documents' },
    {
      key: 'notifications',
      title: 'Notifications',
      detail: notificationEmail.trim() || 'Office email off',
    },
    { key: 'payments', title: 'Card payments', detail: 'Pay now link on invoices' },
    {
      key: 'qs',
      title: 'QS sign-off',
      detail: qsApprovalRequired ? 'Required before issue' : 'Optional',
    },
    { key: 'messaging', title: 'Customer messaging', detail: 'Texts, WhatsApp, templates and usage' },
    { key: 'developers', title: 'Integrations and API', detail: 'Accounting, API keys and webhooks' },
    {
      key: 'bank',
      title: 'Bank details',
      detail: bankSet ? `Sort code ${companySettings.bank_sort_code}` : 'Not added yet',
      flag: missingBank,
    },
    {
      key: 'data',
      title: 'Bring your data across',
      detail: 'Import from Tradify, Fergus and others',
    },
    ...(importAccess.isOwner
      ? [{ key: 'export' as const, title: 'Export everything', detail: 'Every record and PDF in one zip' }]
      : []),
    ...(plainTerms.show
      ? [{ key: 'terms' as const, title: 'Plain terms', detail: 'No contract, your data goes with you' }]
      : []),
  ];

  const sectionClass = (key: SettingsKey) =>
    cn('scroll-mt-24', phoneSection !== key && 'hidden lg:block');

  return (
    <>
      <PageFrame className={frameClass}>
        <PageHero
          title="Settings"
          description={headline}
          actions={
            <>
              <IconButton onClick={refresh} aria-label="Refresh settings">
                <RefreshCw className="h-4 w-4" />
              </IconButton>
              <PageHelpButton
                help={SETTINGS_HELP}
                blockers={helpBlockers}
                askContext={{ page: 'settings' }}
              />
            </>
          }
        />

        <HowItWorks
          help={SETTINGS_HELP}
          blockers={helpBlockers}
          askContext={{ page: 'settings' }}
        />

        <div className="lg:grid lg:grid-cols-[240px_minmax(0,1fr)] lg:items-start lg:gap-8">
          {/* Phone: the list of sections */}
          {!phoneSection && (
            <div className="lg:hidden">
              <RowList>
                {sections.map((sec) => (
                  <div key={sec.key} data-help={`settings.menu.${sec.key}`}>
                    <Row
                      wrapDetail
                      title={sec.title}
                      detail={sec.detail}
                      trailing={sec.flag ? <StatusPill tone="volt">To do</StatusPill> : undefined}
                      onClick={() => openSection(sec.key)}
                    />
                  </div>
                ))}
              </RowList>
            </div>
          )}

          {/* Desktop: the left nav */}
          <nav aria-label="Settings sections" className="sticky top-24 hidden lg:block">
            <ul className="space-y-0.5">
              {sections.map((sec) => (
                <li key={sec.key}>
                  <button
                    type="button"
                    data-help={`settings.menu.${sec.key}`}
                    onClick={() => openSection(sec.key)}
                    aria-current={inView === sec.key ? 'true' : undefined}
                    className={cn(
                      'flex h-11 w-full items-center justify-between gap-2 rounded-xl px-3.5 text-left text-[14px] font-semibold touch-manipulation transition-colors',
                      inView === sec.key
                        ? 'bg-white/[0.08] text-white'
                        : 'text-white hover:bg-white/[0.04]'
                    )}
                  >
                    <span className="truncate">{sec.title}</span>
                    {sec.flag && <span className="h-2 w-2 shrink-0 rounded-full bg-elec-yellow" />}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <div className={cn('min-w-0 space-y-6 sm:space-y-8', !phoneSection && 'hidden lg:block')}>
            {phoneSection && (
              <button
                type="button"
                onClick={() => setPhoneSection(null)}
                className="-ml-1 flex h-11 items-center gap-1 text-[14px] font-semibold text-elec-yellow touch-manipulation lg:hidden"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden />
                All settings
              </button>
            )}

            {/* General */}
            <section
              id="settings-general"
              data-help="settings.general"
              className={sectionClass('general')}
            >
              <div className={panelShellClass}>
                <PanelHead
                  title="Company"
                  meta={
                    <span className="text-[13px] text-white">On quotes, invoices and emails</span>
                  }
                />
                <div className="grid gap-x-6 gap-y-5 px-4 py-4 sm:grid-cols-2 sm:px-5 sm:py-5">
                  <FieldCell label="Company name" hint="Shown on quotes, invoices and emails">
                    <Input
                      value={companySettings.company_name}
                      onChange={(e) => updateCompany({ company_name: e.target.value })}
                      placeholder="Your Company Ltd"
                      className={inputClass}
                    />
                  </FieldCell>
                  <FieldCell label="Company number" hint="Companies House registration">
                    <Input
                      value={companySettings.company_number}
                      onChange={(e) => updateCompany({ company_number: e.target.value })}
                      placeholder="12345678"
                      className={inputClass}
                    />
                  </FieldCell>
                  <FieldCell label="VAT number" hint="Used on invoices where applicable">
                    <Input
                      value={companySettings.company_vat_number}
                      onChange={(e) => updateCompany({ company_vat_number: e.target.value })}
                      placeholder="GB123456789"
                      className={inputClass}
                    />
                  </FieldCell>
                  <FieldCell label="Phone" hint="Primary contact number">
                    <Input
                      value={companySettings.company_phone}
                      onChange={(e) => updateCompany({ company_phone: e.target.value })}
                      placeholder="+44 123 456 7890"
                      className={inputClass}
                    />
                  </FieldCell>
                  <FieldCell label="Email" hint="Public contact address">
                    <Input
                      type="email"
                      value={companySettings.company_email}
                      onChange={(e) => updateCompany({ company_email: e.target.value })}
                      placeholder="info@yourcompany.com"
                      className={inputClass}
                    />
                  </FieldCell>
                  <FieldCell label="Website" hint="Linked from quote PDFs">
                    <Input
                      value={companySettings.company_website}
                      onChange={(e) => updateCompany({ company_website: e.target.value })}
                      placeholder="https://yourcompany.com"
                      className={inputClass}
                    />
                  </FieldCell>
                  <FieldCell
                    label="Registered address"
                    hint="Used on letterhead and invoices"
                    className="sm:col-span-2"
                  >
                    <Input
                      value={companySettings.company_address}
                      onChange={(e) => updateCompany({ company_address: e.target.value })}
                      placeholder="123 Business Park, City, Postcode"
                      className={inputClass}
                    />
                  </FieldCell>
                </div>
              </div>
            </section>

            {/* Managers (co-admins) — ELE-1986 */}
            <section
              id="settings-managers"
              data-help="settings.managers"
              className={sectionClass('managers')}
            >
              <ManagersCard />
            </section>

            {/* Who can see what — ELE-1831 "Why can't I see this?" */}
            <section id="settings-access" className={sectionClass('access')}>
              <RoleAccessGuide focusRole={focusRole} />
            </section>

            {/* Team seats — who is on a paid seat and the monthly cost (owner only) */}
            <section id="settings-seats" className={sectionClass('seats')}>
              <SeatsCard />
            </section>

            {/* Branding */}
            <section
              id="settings-branding"
              data-help="settings.branding"
              className={sectionClass('branding')}
            >
              <div className={panelShellClass}>
                <PanelHead
                  title="Branding"
                  meta={<span className="text-[13px] text-white">On your documents</span>}
                />
                <div className="divide-y divide-white/[0.07]">
                  <div className="flex items-center gap-4 px-4 py-4 sm:px-5">
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="relative flex h-16 w-24 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/[0.1] bg-white/[0.03] touch-manipulation transition-colors hover:bg-white/[0.06]"
                    >
                      {brandingSettings.company_logo_url ? (
                        <img
                          src={brandingSettings.company_logo_url}
                          alt="Company logo"
                          className="max-h-full max-w-full object-contain p-1.5"
                        />
                      ) : (
                        <ImageIcon className="h-5 w-5 text-white" />
                      )}
                      {uploadingLogo && (
                        <div className="absolute inset-0 flex items-center justify-center bg-black/70">
                          <Loader2 className="h-4 w-4 animate-spin text-elec-yellow" />
                        </div>
                      )}
                    </button>
                    <div className="min-w-0 flex-1">
                      <p className="text-[15px] font-semibold text-white">Company logo</p>
                      <p className="mt-0.5 text-[13px] text-white">
                        PNG, JPG or SVG. Max 20MB. Recommended 400x200px
                      </p>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleLogoUpload}
                      className="hidden"
                    />
                    <SecondaryButton
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploadingLogo || !!isCoAdmin}
                      className="shrink-0"
                    >
                      <Upload className="h-4 w-4 sm:mr-2" />
                      <span className="hidden sm:inline">
                        {uploadingLogo ? 'Uploading…' : 'Upload'}
                      </span>
                    </SecondaryButton>
                  </div>
                  <div className="grid gap-x-6 gap-y-5 px-4 py-4 sm:grid-cols-2 sm:px-5 sm:py-5">
                    <FieldCell label="Primary colour" hint="Buttons, accents and CTAs">
                      <input
                        type="color"
                        value={brandingSettings.brand_primary_color}
                        onChange={(e) => updateBranding({ brand_primary_color: e.target.value })}
                        className="h-11 w-11 shrink-0 cursor-pointer appearance-none rounded-lg border border-white/10 bg-transparent touch-manipulation"
                        style={{ padding: 0 }}
                      />
                      <Input
                        value={brandingSettings.brand_primary_color}
                        onChange={(e) => updateBranding({ brand_primary_color: e.target.value })}
                        placeholder="#f59e0b"
                        className={`${inputClass} font-mono uppercase`}
                      />
                    </FieldCell>
                    <FieldCell label="Secondary colour" hint="Headers and panel backgrounds">
                      <input
                        type="color"
                        value={brandingSettings.brand_secondary_color}
                        onChange={(e) => updateBranding({ brand_secondary_color: e.target.value })}
                        className="h-11 w-11 shrink-0 cursor-pointer appearance-none rounded-lg border border-white/10 bg-transparent touch-manipulation"
                        style={{ padding: 0 }}
                      />
                      <Input
                        value={brandingSettings.brand_secondary_color}
                        onChange={(e) => updateBranding({ brand_secondary_color: e.target.value })}
                        placeholder="#0f172a"
                        className={`${inputClass} font-mono uppercase`}
                      />
                    </FieldCell>
                  </div>
                  <div className="flex flex-col gap-3 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
                    <div className="flex items-center gap-3">
                      <span className="text-[13px] font-semibold text-white">Preview</span>
                      <div
                        className="flex h-9 items-center rounded-md border border-white/10 px-3 text-[12px] font-medium text-white"
                        style={{ backgroundColor: brandingSettings.brand_secondary_color }}
                      >
                        Header
                      </div>
                      <div
                        className="flex h-9 items-center rounded-md border border-white/10 px-4 text-[12px] font-medium text-white"
                        style={{ backgroundColor: brandingSettings.brand_primary_color }}
                      >
                        Button
                      </div>
                    </div>
                    <PrimaryButton
                      onClick={handleSaveBranding}
                      disabled={savingBranding || !!isCoAdmin}
                    >
                      {savingBranding ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : null}
                      {savingBranding ? 'Saving…' : 'Save branding'}
                    </PrimaryButton>
                  </div>
                </div>
              </div>
            </section>

            {/* Notifications */}
            <section
              id="settings-notifications"
              data-help="settings.notifications"
              className={sectionClass('notifications')}
            >
              <div className={panelShellClass}>
                <PanelHead title="Notifications" />
                <div className="px-4 py-4 sm:px-5 sm:py-5">
                  <FieldCell
                    label="Office email"
                    hint="Gets an email when an incident or near miss is reported and when a client pays an invoice, plus a weekday morning summary when timesheets, leave or expenses are waiting for approval or a renewal is coming up. Leave it empty to turn these off. Everyone still gets the in-app alerts."
                  >
                    <Input
                      type="email"
                      inputMode="email"
                      autoComplete="email"
                      placeholder="office@yourcompany.com"
                      value={notificationEmail}
                      onChange={(e) => setNotificationEmail(e.target.value)}
                      disabled={!!isCoAdmin}
                      className={`${inputClass} sm:max-w-md`}
                    />
                    <SecondaryButton
                      onClick={handleSaveNotificationEmail}
                      disabled={savingEmail || !!isCoAdmin}
                      className="shrink-0"
                    >
                      {savingEmail ? 'Saving…' : 'Save'}
                    </SecondaryButton>
                  </FieldCell>
                </div>
              </div>
            </section>

            {/* Payments — Stripe Connect (the one real integration) */}
            <section
              id="settings-payments"
              data-help="settings.payments"
              className={sectionClass('payments')}
            >
              <StripeConnectCard />
            </section>

            {/* Team — QS sign-off */}
            <section id="settings-qs" data-help="settings.qs" className={sectionClass('qs')}>
              <div className={panelShellClass}>
                <PanelHead
                  title="QS sign-off"
                  meta={
                    <StatusPill tone={qsApprovalRequired ? 'green' : 'neutral'}>
                      {qsApprovalRequired ? 'Required' : 'Optional'}
                    </StatusPill>
                  }
                />
                <div className="divide-y divide-white/[0.07]">
                  <ToggleLine
                    title="I am my own Qualifying Supervisor"
                    body="Lets you review and countersign your own certificates as the QS. For sole traders and registration-holding owners."
                    control={
                      <Switch
                        checked={ownerIsQs}
                        onCheckedChange={handleToggleOwnerIsQs}
                        disabled={ownerQsSaving || !!isCoAdmin}
                      />
                    }
                  />
                  <ToggleLine
                    title="Require QS approval before issue"
                    body="Team EICR, EIC and Minor Works certificates must be countersigned by a Qualifying Supervisor before the PDF can be issued."
                    control={
                      <Switch
                        checked={qsApprovalRequired}
                        onCheckedChange={handleToggleQsApproval}
                        disabled={qsToggleSaving || !!isCoAdmin}
                      />
                    }
                  />
                </div>
              </div>
            </section>

            {/* ELE-2070 customer messaging */}
            <section id="settings-messaging" data-help="settings.messaging" className={sectionClass('messaging')}>
              <MessagingPanel />
            </section>

            {/* ELE-2077 integrations, API keys and webhooks */}
            <section id="settings-developers" data-help="settings.developers" className={sectionClass('developers')}>
              <DevelopersPanel isOwner={isCoAdmin === false} />
            </section>

            {/* Billing — payment details */}
            <section id="settings-bank" data-help="settings.bank" className={sectionClass('bank')}>
              <div className={panelShellClass}>
                <PanelHead
                  title="Bank details"
                  meta={<span className="text-[13px] text-white">Printed on every invoice</span>}
                />
                <div className="grid gap-x-6 gap-y-5 px-4 py-4 sm:grid-cols-3 sm:px-5 sm:py-5">
                  <FieldCell label="Account name" hint="On invoice payment instructions">
                    <Input
                      value={companySettings.bank_account_name}
                      onChange={(e) => updateCompany({ bank_account_name: e.target.value })}
                      placeholder="Your Company Ltd"
                      className={inputClass}
                    />
                  </FieldCell>
                  <FieldCell label="Sort code" hint="UK bank sort code">
                    <Input
                      value={companySettings.bank_sort_code}
                      onChange={(e) => updateCompany({ bank_sort_code: e.target.value })}
                      placeholder="00-00-00"
                      className={`${inputClass} font-mono`}
                    />
                  </FieldCell>
                  <FieldCell label="Account number" hint="8-digit account number">
                    <Input
                      value={companySettings.bank_account_number}
                      onChange={(e) => updateCompany({ bank_account_number: e.target.value })}
                      placeholder="12345678"
                      className={`${inputClass} font-mono`}
                    />
                  </FieldCell>
                </div>
                <div className="flex justify-end border-t border-white/[0.07] px-4 py-3 sm:px-5">
                  <PrimaryButton
                    onClick={handleSaveCompany}
                    disabled={savingCompany || !!isCoAdmin}
                    className="w-full sm:w-auto"
                  >
                    {savingCompany ? 'Saving…' : 'Save bank details'}
                  </PrimaryButton>
                </div>
              </div>
            </section>

            {/* ELE-2067: Bring your data across */}
            <section id="settings-data" className={sectionClass('data')}>
              {importAccess.firmId && (
                <BringDataAcrossPanel
                  firmId={importAccess.firmId}
                  isOwner={importAccess.isOwner}
                  canImport={importAccess.canImport}
                  contact={{
                    email: companySettings.company_email || importAccess.email,
                    phone: companySettings.company_phone,
                  }}
                />
              )}
            </section>

            {importAccess.isOwner && importAccess.firmId && (
              <section id="settings-export" className={sectionClass('export')}>
                <FullExportPanel
                  firmId={importAccess.firmId}
                  firmName={companySettings.company_name || 'My firm'}
                />
              </section>
            )}

            {plainTerms.show && (
              <section id="settings-terms" className={sectionClass('terms')}>
                <PlainTermsPanel />
              </section>
            )}
          </div>
        </div>
      </PageFrame>

      {/* Sticky save bar */}
      {dirty && !isCoAdmin && (
        <div className="fixed bottom-0 inset-x-0 z-40 border-t border-white/[0.06] bg-[hsl(0_0%_8%)]/95 backdrop-blur-xl pb-safe">
          <div className="mx-auto max-w-[1600px] px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
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
