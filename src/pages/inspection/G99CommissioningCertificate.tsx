/**
 * G99CommissioningCertificate.tsx
 * EREC G99 Issue 5 — Generators >16A per phase
 * Two-stage: Stage 1 (Application) + Stage 2 (Commissioning) + Sign-off
 */

import { useState, useEffect, useCallback, useMemo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import SignatureInput from '@/components/signature/SignatureInput';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import CertShellHeader from '@/components/inspection/shared/CertShellHeader';
import CertShellFooter, {
  certFooterNeutralButton,
} from '@/components/inspection/shared/CertShellFooter';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { reportCloud } from '@/utils/reportCloud';
import { useReportSync } from '@/hooks/useReportSync';
import { useCertLock } from '@/hooks/useCertLock';
import CertLockBar from '@/components/inspection/CertLockBar';
import { draftStorage } from '@/utils/draftStorage';
// Module-scope import to match G98. handleSendEmail called formatG99Json while
// the only binding was a local const inside handleGeneratePDF, so every email
// threw a ReferenceError that the surrounding try/catch swallowed — leaving
// formattedData undefined and the send falling through to a 422. ESLint cannot
// see this (no-undef is off for TS), so it survived every green build.
import { formatG99Json } from '@/utils/g99JsonFormatter';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  getDefaultG99FormData,
  UK_DNOS,
  G99FormData,
  G99_DEFAULTS,
} from '@/types/g99-commissioning';
import { useG99CommissioningTabs, G99TabValue } from '@/hooks/useG99CommissioningTabs';
import useReadingKeypad from '@/hooks/useReadingKeypad';
import { scrollToTopForStepChange } from '@/utils/scroll';

/* eslint-disable @typescript-eslint/no-explicit-any */

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const pickerTrigger =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 w-full px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const DRAFT_KEY = 'elec-mate-draft-g99';

/** Numeric commissioning readings the keypad serves — free-number inputs only:
 * protection settings recorded from the relay/inverter plus the measured
 * additional G99 test values. */
const KEYPAD_META = {
  ovStage1Voltage: { label: 'OV stage 1 — trip voltage', unit: 'V' },
  ovStage1Time: { label: 'OV stage 1 — trip time', unit: 's' },
  ovStage2Voltage: { label: 'OV stage 2 — trip voltage', unit: 'V' },
  ovStage2Time: { label: 'OV stage 2 — trip time', unit: 's' },
  uvStage1Voltage: { label: 'UV stage 1 — trip voltage', unit: 'V' },
  uvStage1Time: { label: 'UV stage 1 — trip time', unit: 's' },
  uvStage2Voltage: { label: 'UV stage 2 — trip voltage', unit: 'V' },
  uvStage2Time: { label: 'UV stage 2 — trip time', unit: 's' },
  ofStage1Freq: { label: 'OF stage 1 — trip frequency', unit: 'Hz' },
  ofStage1Time: { label: 'OF stage 1 — trip time', unit: 's' },
  ofStage2Freq: { label: 'OF stage 2 — trip frequency', unit: 'Hz' },
  ofStage2Time: { label: 'OF stage 2 — trip time', unit: 's' },
  ufStage1Freq: { label: 'UF stage 1 — trip frequency', unit: 'Hz' },
  ufStage1Time: { label: 'UF stage 1 — trip time', unit: 's' },
  ufStage2Freq: { label: 'UF stage 2 — trip frequency', unit: 'Hz' },
  ufStage2Time: { label: 'UF stage 2 — trip time', unit: 's' },
  rocoFRate: { label: 'ROCOF — trip rate', unit: 'Hz/s' },
  rocoFTime: { label: 'ROCOF — trip time', unit: 's' },
  reconnectionDelay: { label: 'Reconnection delay', unit: 's' },
  powerQualityTHD: { label: 'THD — harmonic distortion', unit: '%' },
  measuredExportKW: { label: 'Measured export power', unit: 'kW' },
  gridVoltageAtConnection: { label: 'Grid voltage at connection', unit: 'V' },
};
const KEYPAD_SEQUENCE = Object.keys(KEYPAD_META);

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const Sub = ({ title }: { title: string }) => (
  <div className="border-t border-white/[0.1] pt-4">
    <h3 className="text-sm font-semibold text-white">{title}</h3>
  </div>
);

const Field = ({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) => (
  <div>
    <Label className={labelCn}>
      {label}
      {required && ' *'}
    </Label>
    {children}
  </div>
);

const Toggle = ({
  label,
  value,
  onChange,
}: {
  label: string;
  value: boolean | undefined;
  onChange: (v: boolean) => void;
}) => (
  <div className="flex min-h-11 items-center justify-between gap-3">
    <Label className="text-[13px] font-medium text-white">{label}</Label>
    <div className="flex gap-2 shrink-0">
      {[true, false].map((v) => (
        <button
          key={String(v)}
          type="button"
          onClick={() => onChange(v)}
          className={cn(
            'h-11 w-16 rounded-xl text-[13px] touch-manipulation transition-all active:scale-[0.98]',
            value === v
              ? v
                ? 'bg-green-500 border border-green-500 text-black font-semibold'
                : 'bg-white/20 border border-white/20 text-white font-semibold'
              : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium'
          )}
        >
          {v ? 'Yes' : 'No'}
        </button>
      ))}
    </div>
  </div>
);

const TAB_ORDER: G99TabValue[] = ['application', 'commissioning', 'signoff'];

export default function G99CommissioningCertificate() {
  const navigate = useNavigate();
  const { id: editId } = useParams<{ id: string }>();
  const isNew = editId === 'new' || !editId;
  const [isSaving, setIsSaving] = useState(false);
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState('document.pdf');
  const [generationError, setGenerationError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [savedReportId, setSavedReportId] = useState<string | null>(
    editId !== 'new' ? editId || null : null
  );
  // Email dialog state
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);
  const [recoveryDraft, setRecoveryDraft] = useState<{ data: any; lastModified: Date } | null>(
    null
  );

  const [data, setData] = useState<G99FormData>(getDefaultG99FormData());

    // Lock + versioning (ELE-1037). enabled:!isLocked below gates autosave.
  const {
    isLocked,
    lockedAt,
    editVersion,
    lockReport: lockReportBase,
    amendReport,
    databaseId,
    openReport,
    hasVersions,
  } = useCertLock({
    reportId: savedReportId,
    onAmended: (newId) => navigate(`/electrician/inspection-testing/g99-commissioning/${newId}`),
  });

const {
    status: syncStatus,
    saveNow,
    syncNowImmediate,
    hasRecoverableDraft,
    recoverDraft,
    discardDraft,
    onTabChange: syncOnTabChange,
  } = useReportSync({
    reportId: savedReportId,
    reportType: 'g99-commissioning' as any,
    formData: data,
    enabled: !isLoading && !isLocked,
    isHydrating: isLoading, // Gate autosave while loading from cloud — prevents blank-overwrite race.
    onReportCreated: (newId) => {
      setSavedReportId(newId);
      window.history.replaceState(
        null,
        '',
        `/electrician/inspection-testing/g99-commissioning/${newId}`
      );
    },
  });

  // Issue & Lock — flush pending edits first, then lock.
  const lockReport = useCallback(async () => {
    try {
      await syncNowImmediate?.();
    } catch {
      /* best-effort flush */
    }
    await lockReportBase();
  }, [syncNowImmediate, lockReportBase]);

  useEffect(() => {
    if (isNew || !editId) {
      setIsLoading(false);
      return;
    }
    const load = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          setIsLoading(false);
          return;
        }
        const reportData = await reportCloud.getReportData(editId, user.id);
        if (reportData) {
          setData((prev) => ({ ...getDefaultG99FormData(), ...prev, ...(reportData as any) }));
          setSavedReportId(editId);
        }
      } catch (err) {
        console.error('Failed to load G99:', err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [editId, isNew]);

  useEffect(() => {
    if (!isNew || !hasRecoverableDraft) return;
    const draft = draftStorage.loadDraft('g99-commissioning' as any, null);
    if (draft) {
      setRecoveryDraft(draft);
      setShowRecoveryDialog(true);
    }
  }, [isNew, hasRecoverableDraft]);

  useEffect(() => {
    if (data.installerName) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: cpData } = await supabase.rpc('get_my_company_profile');
      const cp = Array.isArray(cpData) ? cpData[0] : cpData;
      if (cp)
        setData((prev) => ({
          ...prev,
          installerName: prev.installerName || cp.inspector_name || '',
          installerCompany: prev.installerCompany || cp.company_name || '',
          installerPhone: prev.installerPhone || cp.company_phone || '',
          installerEmail: prev.installerEmail || cp.company_email || '',
          registrationScheme: prev.registrationScheme || cp.registration_scheme || '',
          registrationNumber: prev.registrationNumber || cp.registration_number || '',
        }));
    });
  }, []);

  const update = useCallback((field: keyof G99FormData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // Reading keypad — shared MW pattern for the grid protection settings and
  // measured commissioning tests. Values flow through the existing update
  // path; the spread only ADDS props.
  const keypad = useReadingKeypad({
    meta: KEYPAD_META,
    sequence: KEYPAD_SEQUENCE,
    getValue: (field) => String((data as any)[field] ?? ''),
    setValue: (field, value) => update(field as keyof G99FormData, value),
  });

  const settingsMatchDefaults = useMemo(() => {
    const keys = Object.keys(G99_DEFAULTS) as (keyof typeof G99_DEFAULTS)[];
    return keys.every((k) => data[k] === G99_DEFAULTS[k]);
  }, [data]);

  const {
    currentTab,
    setCurrentTab,
    currentTabIndex,
    totalTabs,
    canNavigateNext,
    canNavigatePrevious,
    navigateNext,
    navigatePrevious,
    isTabComplete,
    getProgressPercentage,
  } = useG99CommissioningTabs(data);

  // Track direction so the step slide matches travel (forward vs back).
  const prevIndexRef = useRef(TAB_ORDER.indexOf(currentTab));
  const isBack = currentTabIndex < prevIndexRef.current;
  prevIndexRef.current = currentTabIndex;

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try {
      await saveNow();
      toast.success('Draft saved');
    } catch {
      toast.error('Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendEmail = async () => {
    if (!emailRecipient || !emailRecipient.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    const reportId = savedReportId;
    if (!reportId) {
      toast.error('Save the certificate first before emailing.');
      return;
    }
    setIsSendingEmail(true);
    try {
      await syncNowImmediate();
      // Formatted payload so the server can generate + attach even pre-Generate.
      let formattedData: Record<string, unknown> | undefined;
      try {
        formattedData = formatG99Json({
          ...data,
          referenceNumber: data.referenceNumber || `G99-${Date.now()}`,
        });
      } catch {
        formattedData = undefined; // fall back to server-side pdf_payload
      }
      const { data: result, error: fnError } = await supabase.functions.invoke(
        'send-certificate-resend',
        { body: { reportId, recipientEmail: emailRecipient, formattedData } }
      );
      if (fnError) {
        let msg = fnError.message;
        try {
          const body = typeof fnError.context?.body === 'string' ? JSON.parse(fnError.context.body) : fnError.context?.body;
          if (body?.error) msg = body.error;
        } catch { /* keep */ }
        throw new Error(msg);
      }
      if (!result?.success) throw new Error(result?.error || 'Failed to send');
      toast.success(
        result?.pdfAttached
          ? `Certificate emailed to ${emailRecipient} with the PDF attached`
          : `Certificate emailed to ${emailRecipient}`
      );
      setShowEmailDialog(false);
      setEmailRecipient('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send certificate email.');
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleGeneratePDF = async () => {
    if (!data.installationAddress) {
      toast.error('Installation address required');
      return;
    }
    setIsSaving(true);
    setGeneratedPdfUrl(null);
    setGenerationError(null);
    setShowGenerationDialog(true);
    try {
      await syncNowImmediate();
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in');
        setIsSaving(false);
        return;
      }

      // One reader for the whole fleet — resolves the logo from the real columns
      // (logo_data_url / logo_url) and the colour chosen in Settings → Business
      // → Brand. Never throws; branding must never block a certificate.
      const { formatG99Json, G99_ACCENT } = await import('@/utils/g99JsonFormatter');
      const { fetchCertBranding } = await import('@/utils/certBranding');
      const resolved = await fetchCertBranding(G99_ACCENT);

      const branding = {
        ...resolved,
        // Fall back to what the installer typed on the form when Settings is bare.
        companyName: resolved.companyName || data.installerCompany,
        companyPhone: resolved.companyPhone || data.installerPhone,
        companyEmail: resolved.companyEmail || data.installerEmail,
      };

      const payload = formatG99Json(data, branding);

      const { data: pdfResult, error: pdfError } = await supabase.functions.invoke(
        'generate-g99-commissioning-pdf',
        { body: { formData: payload } }
      );
      if (pdfError) throw new Error(pdfError.message || 'PDF generation failed');
      if (!pdfResult?.download_url) throw new Error('No PDF URL returned');

      const filename = `G99-${data.referenceNumber}.pdf`;
      let url = pdfResult.download_url;
      const reportId = savedReportId || data.referenceNumber;
      try {
        const { saveCertificatePdf } = await import('@/utils/certificate-pdf-storage');
        const { permanentUrl, storagePath } = await saveCertificatePdf(
          pdfResult.download_url,
          user.id,
          reportId,
          data.referenceNumber
        );
        url = permanentUrl;
        await supabase
          .from('reports')
          .update({
            storage_path: storagePath,
            pdf_url: url,
            pdf_generated_at: new Date().toISOString(),
            pdf_payload: payload,
            status: 'completed',
          })
          .eq('report_id', reportId);
      } catch {
        await supabase
          .from('reports')
          .update({ pdf_url: url, pdf_generated_at: new Date().toISOString(), pdf_payload: payload, status: 'completed' })
          .eq('report_id', reportId);
      }

      setGeneratedPdfUrl(url);
      setPdfFilename(filename);
      toast.success('G99 form generated');
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to generate PDF';
      setGenerationError(msg);
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  // Tab content renderers
  const renderApplicationTab = () => (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      <div className={cardCn}>
        <SectionHeader title="DNO application" />
        <Field label="DNO" required>
          <MobileSelectPicker
            value={data.dnoName}
            onValueChange={(v) => update('dnoName', v)}
            options={UK_DNOS.map((d) => ({ value: d, label: d }))}
            placeholder="Select DNO..."
            triggerClassName={pickerTrigger}
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Application date">
            <Input
              type="date"
              value={data.applicationDate}
              onChange={(e) => update('applicationDate', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Application ref">
            <Input
              value={data.dnoApplicationRef}
              onChange={(e) => update('dnoApplicationRef', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Commission date">
            <Input
              type="date"
              value={data.proposedCommissioningDate}
              onChange={(e) => update('proposedCommissioningDate', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Connection voltage">
            <MobileSelectPicker
              value={data.connectionVoltage}
              onValueChange={(v) => update('connectionVoltage', v)}
              options={[
                { value: 'LV', label: 'LV' },
                { value: 'HV', label: 'HV' },
                { value: 'EHV', label: 'EHV' },
              ]}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </Field>
        </div>
        <div className="space-y-3">
          <Toggle
            label="Network study"
            value={data.networkStudyRequired}
            onChange={(v) => update('networkStudyRequired', v)}
          />
          <Toggle
            label="Intertrip required"
            value={data.interTripRequired}
            onChange={(v) => update('interTripRequired', v)}
          />
          <Toggle
            label="DNO approval"
            value={data.dnoApprovalReceived}
            onChange={(v) => update('dnoApprovalReceived', v)}
          />
        </div>
        {data.dnoApprovalReceived && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Approval date">
              <Input
                type="date"
                value={data.dnoApprovalDate}
                onChange={(e) => update('dnoApprovalDate', e.target.value)}
                className={inputCn}
              />
            </Field>
            <Field label="Approval ref">
              <Input
                value={data.dnoApprovalRef}
                onChange={(e) => update('dnoApprovalRef', e.target.value)}
                className={inputCn}
              />
            </Field>
          </div>
        )}
        {data.dnoApprovalReceived && (
          <Field label="Special conditions">
            <Textarea
              value={data.dnoSpecialConditions}
              onChange={(e) => update('dnoSpecialConditions', e.target.value)}
              className={textareaCn}
              placeholder="Any DNO-imposed conditions..."
            />
          </Field>
        )}
      </div>

      <div className={cardCn}>
        <SectionHeader title="Installer details" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Name">
            <Input
              value={data.installerName}
              onChange={(e) => update('installerName', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Company">
            <Input
              value={data.installerCompany}
              onChange={(e) => update('installerCompany', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Phone">
            <Input
              type="tel"
              value={data.installerPhone}
              onChange={(e) => update('installerPhone', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Email">
            <Input
              type="email"
              value={data.installerEmail}
              onChange={(e) => update('installerEmail', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
          <Field label="MCS no." required>
            <Input
              value={data.mcsNumber}
              onChange={(e) => update('mcsNumber', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Scheme">
            <Input
              value={data.registrationScheme}
              onChange={(e) => update('registrationScheme', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Reg. no.">
            <Input
              value={data.registrationNumber}
              onChange={(e) => update('registrationNumber', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </div>

      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Site details" />
        <Field label="Address" required>
          <Input
            value={data.installationAddress}
            onChange={(e) => update('installationAddress', e.target.value)}
            className={inputCn}
          />
        </Field>
        <Field label="MPAN">
          <Input
            value={data.mpan}
            onChange={(e) => update('mpan', e.target.value)}
            className={inputCn}
            placeholder="21-digit"
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Supply type">
            <MobileSelectPicker
              value={data.supplyType}
              onValueChange={(v) => update('supplyType', v)}
              options={[
                { value: 'single-phase', label: 'Single-phase' },
                { value: 'three-phase', label: 'Three-phase' },
              ]}
              triggerClassName={pickerTrigger}
            />
          </Field>
          <Field label="Earthing">
            <MobileSelectPicker
              value={data.earthingArrangement}
              onValueChange={(v) => update('earthingArrangement', v)}
              options={[
                { value: 'TN-S', label: 'TN-S' },
                { value: 'TN-C-S', label: 'TN-C-S' },
                { value: 'TT', label: 'TT' },
              ]}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </Field>
        </div>
      </div>

      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Generating equipment" />
        <Field label="Equipment type">
          <MobileSelectPicker
            value={data.equipmentType}
            onValueChange={(v) => update('equipmentType', v)}
            options={[
              { value: 'Solar PV', label: 'Solar PV' },
              { value: 'Battery Storage', label: 'Battery Storage' },
              { value: 'Combined PV+Battery', label: 'Combined PV + Battery' },
              { value: 'Wind', label: 'Wind' },
            ]}
            placeholder="Select..."
            triggerClassName={pickerTrigger}
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Manufacturer">
            <Input
              value={data.equipmentManufacturer}
              onChange={(e) => update('equipmentManufacturer', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Model">
            <Input
              value={data.equipmentModel}
              onChange={(e) => update('equipmentModel', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-x-6 gap-y-4">
          <Field label="Serial number">
            <Input
              value={data.equipmentSerial}
              onChange={(e) => update('equipmentSerial', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Output (kW)" required>
            <Input
              type="number"
              step="0.01"
              value={data.ratedOutput}
              onChange={(e) => update('ratedOutput', e.target.value)}
              className={inputCn}
              placeholder=">3.68 / >11.04"
            />
          </Field>
          <Field label="Phases">
            <MobileSelectPicker
              value={data.numberOfPhases}
              onValueChange={(v) => update('numberOfPhases', v)}
              options={[
                { value: '1', label: 'Single' },
                { value: '3', label: 'Three' },
              ]}
              triggerClassName={pickerTrigger}
            />
          </Field>
        </div>
        <Field label="Type test cert ref">
          <Input
            value={data.typeTestCertRef}
            onChange={(e) => update('typeTestCertRef', e.target.value)}
            className={inputCn}
            placeholder="G99 type test cert"
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Inverter make">
            <Input
              value={data.inverterManufacturer}
              onChange={(e) => update('inverterManufacturer', e.target.value)}
              className={inputCn}
              placeholder="If different"
            />
          </Field>
          <Field label="Inverter model">
            <Input
              value={data.inverterModel}
              onChange={(e) => update('inverterModel', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Export (kW)">
            <Input
              type="number"
              step="0.01"
              value={data.proposedExportCapacity}
              onChange={(e) => update('proposedExportCapacity', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="No. of units">
            <Input
              type="number"
              value={data.numberOfGeneratingUnits}
              onChange={(e) => update('numberOfGeneratingUnits', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="Linked cert ref">
          <Input
            value={data.associatedCertRef}
            onChange={(e) => update('associatedCertRef', e.target.value)}
            className={inputCn}
            placeholder="PV/BESS cert ref"
          />
        </Field>
      </div>

      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Export details" />
        <div className="space-y-3">
          <Toggle
            label="Export capable"
            value={data.exportCapable}
            onChange={(v) => update('exportCapable', v)}
          />
          <Toggle
            label="Export limited"
            value={data.exportLimited}
            onChange={(v) => update('exportLimited', v)}
          />
          {data.exportLimited && (
            <Field label="Export limit (kW)">
              <Input
                type="number"
                step="0.01"
                value={data.exportLimit}
                onChange={(e) => update('exportLimit', e.target.value)}
                className={inputCn}
              />
            </Field>
          )}
          <Toggle
            label="Export meter fitted"
            value={data.exportMeterFitted}
            onChange={(v) => update('exportMeterFitted', v)}
          />
          {data.exportMeterFitted && (
            <Field label="Meter serial">
              <Input
                value={data.exportMeterSerial}
                onChange={(e) => update('exportMeterSerial', e.target.value)}
                className={inputCn}
              />
            </Field>
          )}
        </div>
        <Field label="SEG supplier">
          <Input
            value={data.segSupplier}
            onChange={(e) => update('segSupplier', e.target.value)}
            className={inputCn}
            placeholder="e.g. Octopus, British Gas..."
          />
        </Field>
      </div>
    </div>
  );

  const renderCommissioningTab = () => (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {!data.dnoApprovalReceived && (
        <div className="rounded-xl border border-amber-500/30 bg-white/[0.05] p-3 lg:col-span-2">
          <p className="text-sm font-semibold text-white">
            DNO approval required before commissioning
          </p>
        </div>
      )}
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Commissioning details" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Date">
            <Input
              type="date"
              value={data.commissioningDate}
              onChange={(e) => update('commissioningDate', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Settings source">
            <MobileSelectPicker
              value={data.settingsSource}
              onValueChange={(v) => update('settingsSource', v)}
              options={[
                { value: 'G99 default', label: 'G99 default' },
                { value: 'DNO specified', label: 'DNO specified' },
              ]}
              placeholder="Select..."
              triggerClassName={pickerTrigger}
            />
          </Field>
        </div>
      </div>

      <div className={cn(cardCn, 'lg:col-span-2')}>
        <div className="mb-3 flex items-center justify-between gap-3">
          <h2 className="text-[15px] font-semibold tracking-tight text-white">Grid protection</h2>
          <span
            className={cn(
              'rounded-full border px-2.5 py-1 text-[11px] font-semibold',
              settingsMatchDefaults
                ? 'border-green-500/40 text-green-400'
                : 'border-amber-500/40 text-amber-400'
            )}
          >
            {settingsMatchDefaults ? 'G99 defaults' : 'DNO modified'}
          </span>
        </div>
        {data.settingsSource === 'DNO specified' && (
          <div className="rounded-xl border border-amber-500/30 bg-white/[0.05] p-3">
            <p className="text-sm font-semibold text-white">
              DNO non-standard settings - use DNO approval letter values
            </p>
          </div>
        )}

        <Sub title="Over-voltage" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-4">
          <Field label="OV1 (V)">
            <Input
              value={data.ovStage1Voltage}
              onChange={(e) => update('ovStage1Voltage', e.target.value)}
              className={inputCn}
              {...keypad.field('ovStage1Voltage')}
            />
          </Field>
          <Field label="OV1 time">
            <Input
              value={data.ovStage1Time}
              onChange={(e) => update('ovStage1Time', e.target.value)}
              className={inputCn}
              {...keypad.field('ovStage1Time')}
            />
          </Field>
          <Field label="OV2 (V)">
            <Input
              value={data.ovStage2Voltage}
              onChange={(e) => update('ovStage2Voltage', e.target.value)}
              className={inputCn}
              {...keypad.field('ovStage2Voltage')}
            />
          </Field>
          <Field label="OV2 time">
            <Input
              value={data.ovStage2Time}
              onChange={(e) => update('ovStage2Time', e.target.value)}
              className={inputCn}
              {...keypad.field('ovStage2Time')}
            />
          </Field>
        </div>

        <Sub title="Under-voltage" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-4">
          <Field label="UV1 (V)">
            <Input
              value={data.uvStage1Voltage}
              onChange={(e) => update('uvStage1Voltage', e.target.value)}
              className={inputCn}
              {...keypad.field('uvStage1Voltage')}
            />
          </Field>
          <Field label="UV1 time">
            <Input
              value={data.uvStage1Time}
              onChange={(e) => update('uvStage1Time', e.target.value)}
              className={inputCn}
              {...keypad.field('uvStage1Time')}
            />
          </Field>
          <Field label="UV2 (V)">
            <Input
              value={data.uvStage2Voltage}
              onChange={(e) => update('uvStage2Voltage', e.target.value)}
              className={inputCn}
              {...keypad.field('uvStage2Voltage')}
            />
          </Field>
          <Field label="UV2 time">
            <Input
              value={data.uvStage2Time}
              onChange={(e) => update('uvStage2Time', e.target.value)}
              className={inputCn}
              {...keypad.field('uvStage2Time')}
            />
          </Field>
        </div>

        <Sub title="Over-frequency" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-4">
          <Field label="OF1 (Hz)">
            <Input
              value={data.ofStage1Freq}
              onChange={(e) => update('ofStage1Freq', e.target.value)}
              className={inputCn}
              {...keypad.field('ofStage1Freq')}
            />
          </Field>
          <Field label="OF1 time">
            <Input
              value={data.ofStage1Time}
              onChange={(e) => update('ofStage1Time', e.target.value)}
              className={inputCn}
              {...keypad.field('ofStage1Time')}
            />
          </Field>
          <Field label="OF2 (Hz)">
            <Input
              value={data.ofStage2Freq}
              onChange={(e) => update('ofStage2Freq', e.target.value)}
              className={inputCn}
              {...keypad.field('ofStage2Freq')}
            />
          </Field>
          <Field label="OF2 time">
            <Input
              value={data.ofStage2Time}
              onChange={(e) => update('ofStage2Time', e.target.value)}
              className={inputCn}
              {...keypad.field('ofStage2Time')}
            />
          </Field>
        </div>

        <Sub title="Under-frequency" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-4">
          <Field label="UF1 (Hz)">
            <Input
              value={data.ufStage1Freq}
              onChange={(e) => update('ufStage1Freq', e.target.value)}
              className={inputCn}
              {...keypad.field('ufStage1Freq')}
            />
          </Field>
          <Field label="UF1 time">
            <Input
              value={data.ufStage1Time}
              onChange={(e) => update('ufStage1Time', e.target.value)}
              className={inputCn}
              {...keypad.field('ufStage1Time')}
            />
          </Field>
          <Field label="UF2 (Hz)">
            <Input
              value={data.ufStage2Freq}
              onChange={(e) => update('ufStage2Freq', e.target.value)}
              className={inputCn}
              {...keypad.field('ufStage2Freq')}
            />
          </Field>
          <Field label="UF2 time">
            <Input
              value={data.ufStage2Time}
              onChange={(e) => update('ufStage2Time', e.target.value)}
              className={inputCn}
              {...keypad.field('ufStage2Time')}
            />
          </Field>
        </div>

        <Sub title="ROCOF & reconnection" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4">
          <Field label="ROCOF (Hz/s)">
            <Input
              value={data.rocoFRate}
              onChange={(e) => update('rocoFRate', e.target.value)}
              className={inputCn}
              {...keypad.field('rocoFRate')}
            />
          </Field>
          <Field label="ROCOF time">
            <Input
              value={data.rocoFTime}
              onChange={(e) => update('rocoFTime', e.target.value)}
              className={inputCn}
              {...keypad.field('rocoFTime')}
            />
          </Field>
          <Field label="Reconn. (s)">
            <Input
              value={data.reconnectionDelay}
              onChange={(e) => update('reconnectionDelay', e.target.value)}
              className={inputCn}
              {...keypad.field('reconnectionDelay')}
            />
          </Field>
        </div>
      </div>

      <div className={cardCn}>
        <SectionHeader title="Additional G99 tests" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="THD (%)">
            <Input
              value={data.powerQualityTHD}
              onChange={(e) => update('powerQualityTHD', e.target.value)}
              className={inputCn}
              placeholder="Harmonic distortion"
              {...keypad.field('powerQualityTHD')}
            />
          </Field>
          <Field label="Export (kW)">
            <Input
             
              step="0.01"
              value={data.measuredExportKW}
              onChange={(e) => update('measuredExportKW', e.target.value)}
              className={inputCn}
              {...keypad.field('measuredExportKW')}
            />
          </Field>
        </div>
        <Field label="Grid voltage (V)">
          <Input
           
            step="0.1"
            value={data.gridVoltageAtConnection}
            onChange={(e) => update('gridVoltageAtConnection', e.target.value)}
            className={inputCn}
            {...keypad.field('gridVoltageAtConnection')}
          />
        </Field>
        <div className="space-y-3">
          <Toggle
            label="Reactive power verified"
            value={data.reactivePowerVerified}
            onChange={(v) => update('reactivePowerVerified', v)}
          />
          <Toggle
            label="Active power verified"
            value={data.activePowerControlVerified}
            onChange={(v) => update('activePowerControlVerified', v)}
          />
          <Toggle
            label="Frequency response"
            value={data.frequencyResponseVerified}
            onChange={(v) => update('frequencyResponseVerified', v)}
          />
        </div>
        {data.interTripRequired && (
          <>
            <Field label="Intertrip tested">
              <MobileSelectPicker
                value={data.interTripTested}
                onValueChange={(v) => update('interTripTested', v)}
                options={[
                  { value: 'pass', label: 'Pass' },
                  { value: 'fail', label: 'Fail' },
                  { value: 'na', label: 'N/A' },
                ]}
                placeholder="Select..."
                triggerClassName={pickerTrigger}
              />
            </Field>
            {data.interTripRequired &&
              data.interTripTested !== 'pass' &&
              data.interTripTested !== '' && (
                <div className="rounded-xl border border-red-500/30 bg-white/[0.05] p-3">
                  <p className="text-sm text-white">
                    Intertrip test has not passed - commissioning cannot proceed
                  </p>
                </div>
              )}
          </>
        )}
      </div>

      <div className={cardCn}>
        <SectionHeader title="DNO witness" />
        <Toggle
          label="DNO witness required"
          value={data.dnoWitnessRequired}
          onChange={(v) => update('dnoWitnessRequired', v)}
        />
        {data.dnoWitnessRequired && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Witness name">
              <Input
                value={data.dnoWitnessName}
                onChange={(e) => update('dnoWitnessName', e.target.value)}
                className={inputCn}
              />
            </Field>
            <Field label="Witness date">
              <Input
                type="date"
                value={data.dnoWitnessDate}
                onChange={(e) => update('dnoWitnessDate', e.target.value)}
                className={inputCn}
              />
            </Field>
          </div>
        )}
      </div>

      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Confirmation" />
        <div className="space-y-3">
          <Toggle
            label="Anti-islanding confirmed"
            value={data.antiIslandingConfirmed}
            onChange={(v) => update('antiIslandingConfirmed', v)}
          />
          <Toggle
            label="Settings verified"
            value={data.protectionSettingsVerified}
            onChange={(v) => update('protectionSettingsVerified', v)}
          />
          <Toggle
            label="System operating"
            value={data.systemOperating}
            onChange={(v) => update('systemOperating', v)}
          />
          <Toggle
            label="Labels fitted"
            value={data.labelsApplied}
            onChange={(v) => update('labelsApplied', v)}
          />
          <Toggle
            label="Customer informed"
            value={data.customerInformed}
            onChange={(v) => update('customerInformed', v)}
          />
        </div>
      </div>

      {/* Scroll room so the last reading can rise clear of the keypad */}
      {keypad.spacer}

      {/* Reading keypad — coarse-pointer devices only */}
      {keypad.element}
    </div>
  );

  const renderSignoffTab = () => (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Reference & result" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Reference no.">
            <Input
              value={data.referenceNumber}
              onChange={(e) => update('referenceNumber', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Overall result">
            <div className="flex gap-2">
              {[
                { v: 'satisfactory', l: 'Pass', c: 'bg-green-500 border border-green-500 text-black' },
                { v: 'unsatisfactory', l: 'Fail', c: 'bg-red-500 border border-red-500 text-white' },
              ].map(({ v, l, c }) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => update('overallResult', v as any)}
                  className={cn(
                    'flex-1 h-11 rounded-xl text-sm font-semibold touch-manipulation transition-all active:scale-[0.98]',
                    data.overallResult === v
                      ? c
                      : 'bg-white/[0.06] text-white border border-white/[0.12]'
                  )}
                >
                  {l}
                </button>
              ))}
            </div>
          </Field>
        </div>
      </div>

      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Declaration & signatures" />
        <div className="rounded-xl bg-white/[0.05] p-3.5">
          <p className="text-sm text-white/90 leading-relaxed">
            I confirm that the generating equipment described above has been installed and
            commissioned in accordance with EREC G99. The protection settings have been verified and
            the system is connected to the distribution network with the approval of the DNO.
          </p>
        </div>
        <SignatureInput
          label="Installer signature"
          value={data.installerSignature}
          onChange={(sig) => update('installerSignature', sig || '')}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Installer date">
            <Input
              type="date"
              value={data.installerDate}
              onChange={(e) => update('installerDate', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        {data.dnoWitnessRequired && (
          <SignatureInput
            label="DNO witness"
            value={data.dnoWitnessSignature}
            onChange={(sig) => update('dnoWitnessSignature', sig || '')}
          />
        )}
        <SignatureInput
          label="Customer (optional)"
          value={data.customerSignature}
          onChange={(sig) => update('customerSignature', sig || '')}
        />
        {data.customerSignature && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Customer date">
              <Input
                type="date"
                value={data.customerDate}
                onChange={(e) => update('customerDate', e.target.value)}
                className={inputCn}
              />
            </Field>
          </div>
        )}
      </div>

      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Notes" />
        <Textarea
          value={data.notes}
          onChange={(e) => update('notes', e.target.value)}
          className={textareaCn}
          placeholder="Additional notes..."
        />
      </div>
    </div>
  );

  const content: Record<G99TabValue, React.ReactNode> = {
    application: renderApplicationTab(),
    commissioning: renderCommissioningTab(),
    signoff: renderSignoffTab(),
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Shell header — fixed bar with progress ring + full-width step tabs */}
      <CertShellHeader
        onBack={() => navigate(-1)}
        title="G99 Commissioning"
        subtitle={data.referenceNumber ? `${data.referenceNumber} · EREC G99` : null}
        isSaving={isSaving}
        onManualSave={handleSaveDraft}
        syncStatus={syncStatus}
        progressPercent={getProgressPercentage()}
        steps={[
          { id: 'application', label: 'Application' },
          { id: 'commissioning', label: 'Commissioning' },
          { id: 'signoff', label: 'Sign off' },
        ]}
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab as G99TabValue);
          syncOnTabChange();
          scrollToTopForStepChange();
        }}
        completedTabs={{
          application: !!isTabComplete('application'),
          commissioning: !!isTabComplete('commissioning'),
          signoff: !!isTabComplete('signoff'),
        }}
      />

      {/* ELE-1037 — lock / version bar */}
      <CertLockBar
        isLocked={isLocked}
        lockedAt={lockedAt}
        editVersion={editVersion}
        canIssue={!isLocked && !!savedReportId}
        onLock={lockReport}
        onAmend={amendReport}
        databaseId={databaseId}
        hasVersions={hasVersions}
        onOpenVersion={openReport}
      />

      <main className="-mx-3 px-4 py-4 pb-36 sm:mx-auto sm:px-4 lg:max-w-[1600px] lg:px-8">
        <div className={cn(isLocked && 'pointer-events-none select-none opacity-95')} aria-disabled={isLocked || undefined}>
          <div
            key={currentTab}
            className={
              isBack ? 'motion-safe:animate-mw-step-back' : 'motion-safe:animate-mw-step-in'
            }
          >
            {content[currentTab]}
          </div>
        </div>
        {/* Footer OUTSIDE the isLocked pointer-events-none wrapper — a locked
            cert must still allow Download PDF / navigation. */}
        <CertShellFooter
        previewReportType="g99-commissioning"
        previewReportId={savedReportId}
        previewData={data as unknown as Record<string, unknown>}
          currentIndex={currentTabIndex}
          totalSteps={totalTabs}
          canPrevious={canNavigatePrevious}
          canNext={canNavigateNext}
          onPrevious={navigatePrevious}
          onNext={navigateNext}
          nextLabels={['Continue to Commissioning', 'Continue to Sign off']}
          isLastStep={currentTabIndex === totalTabs - 1}
          onGenerate={handleGeneratePDF}
          canGenerate={!isSaving}
          lastStepActions={
            <button
              onClick={() => {
                if (!savedReportId) {
                    toast.error('Save the certificate first before emailing.');
                    return;
                }
                setEmailRecipient(String((data as any).clientEmail || (data as any).customerEmail || ''));
                setShowEmailDialog(true);
              }}
              className={certFooterNeutralButton}
            >
              Email
            </button>
          }
          generateLabel="Download PDF"
        />
      </main>


      {/* Email dialog — EV reference pattern */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="max-w-[90vw] sm:max-w-md bg-[#111114] border border-white/[0.1] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-base font-bold">Email certificate</DialogTitle>
            <DialogDescription className="text-white/85 text-sm">
              Enter the recipient's email address.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-3">
            <div>
              <label htmlFor="g99-email" className="mb-1 block text-[12px] font-medium text-white">
                Recipient email
              </label>
              <Input
                id="g99-email"
                type="email"
                placeholder="client@example.com"
                value={emailRecipient}
                onChange={(e) => setEmailRecipient(e.target.value)}
                disabled={isSendingEmail}
                className="input-underline h-11 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none touch-manipulation"
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <button
              onClick={handleSendEmail}
              disabled={isSendingEmail || !emailRecipient}
              className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-all hover:bg-elec-yellow/90 active:scale-[0.98] disabled:bg-elec-yellow disabled:text-black disabled:opacity-100 touch-manipulation"
            >
              {isSendingEmail ? (
                <span className="inline-flex items-center justify-center">
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-black" />
                  Sending…
                </span>
              ) : (
                'Send certificate'
              )}
            </button>
            <button
              onClick={() => setShowEmailDialog(false)}
              disabled={isSendingEmail}
              className="h-12 w-full rounded-xl border border-white/[0.1] bg-white/[0.04] font-medium text-white transition-all hover:bg-white/[0.08] active:scale-[0.98] disabled:opacity-40 touch-manipulation"
            >
              Cancel
            </button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md bg-[#111114] border border-white/[0.08] rounded-2xl shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-base font-bold">Recover draft?</AlertDialogTitle>
            <AlertDialogDescription className="text-white text-sm">
              A previous unsaved G99 form was found. Would you like to recover it?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
            <AlertDialogAction
              onClick={() => {
                if (recoveryDraft) {
                  setData((prev) => ({
                    ...getDefaultG99FormData(),
                    ...prev,
                    ...recoveryDraft.data,
                  }));
                  recoverDraft();
                }
                setShowRecoveryDialog(false);
              }}
              className="w-full h-11 rounded-xl bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation"
            >
              Recover draft
            </AlertDialogAction>
            <AlertDialogCancel
              onClick={() => {
                discardDraft();
                setShowRecoveryDialog(false);
              }}
              className="w-full h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-medium hover:bg-white/[0.08] active:scale-[0.98] transition-all touch-manipulation mt-0"
            >
              Discard
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CertificateGenerationDialog
        open={showGenerationDialog}
        onOpenChange={setShowGenerationDialog}
        isGenerating={isSaving}
        pdfUrl={generatedPdfUrl}
        pdfFilename={pdfFilename}
        errorMessage={generationError}
        documentLabel="G99 Form"
      />
    </div>
  );
}
