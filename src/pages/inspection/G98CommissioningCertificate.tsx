/**
 * G98CommissioningCertificate.tsx
 * EREC G98 Issue 5 — Micro-generators ≤16A per phase
 * Notify DNO within 28 days of commissioning
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import SignatureInput from '@/components/signature/SignatureInput';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import CertShellHeader from '@/components/inspection/shared/CertShellHeader';
import CertShellFooter, {
  certFooterNeutralButton,
} from '@/components/inspection/shared/CertShellFooter';
import InspectionPhotoUpload from '@/components/inspection/InspectionPhotoUpload';
import InspectionPhotoGallery from '@/components/inspection/InspectionPhotoGallery';
import { useInspectionPhotos } from '@/hooks/useInspectionPhotos';
import ClientSelector from '@/components/ClientSelector';
import { Customer } from '@/hooks/inspection/useCustomers';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { reportCloud } from '@/utils/reportCloud';
import { useReportSync } from '@/hooks/useReportSync';
import { useCertLock } from '@/hooks/useCertLock';
import CertLockBar from '@/components/inspection/CertLockBar';
import { draftStorage } from '@/utils/draftStorage';
import { createInvoiceFromCertificate } from '@/utils/certificateToQuote';
import { formatG98Json, fetchG98ReportPhotos } from '@/utils/g98JsonFormatter';
import { useG98CommissioningTabs, G98TabValue } from '@/hooks/useG98CommissioningTabs';
import { UK_DNOS } from '@/types/g99-commissioning';
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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

// UK_DNOS imported from types/g99-commissioning — single shared list for
// both G98 and G99 (was duplicated locally).

// G98 default protection settings (EREC G98 Issue 5)
const G98_DEFAULTS = {
  ovStage1Voltage: '264.0',
  ovStage1Time: '1.0',
  ovStage2Voltage: '276.0',
  ovStage2Time: '0.5',
  uvStage1Voltage: '207.0',
  uvStage1Time: '1.5',
  uvStage2Voltage: '195.5',
  uvStage2Time: '0.5',
  ofStage1Freq: '50.4',
  ofStage1Time: '0.5',
  ofStage2Freq: '52.0',
  ofStage2Time: '0.5',
  ufStage1Freq: '47.5',
  ufStage1Time: '0.5',
  ufStage2Freq: '47.0',
  ufStage2Time: '0.5',
  rocoFRate: '1.0',
  rocoFTime: '0.5',
  reconnectionDelay: '60',
};

interface G98Data {
  referenceNumber: string;
  commissioningDate: string;
  notificationDate: string;
  dnoName: string;
  // Installer
  installerName: string;
  installerCompany: string;
  installerPhone: string;
  installerEmail: string;
  mcsNumber: string;
  registrationScheme: string;
  registrationNumber: string;
  // Site
  installationAddress: string;
  mpan: string;
  supplyType: string;
  earthingArrangement: string;
  // Equipment
  equipmentType: string;
  equipmentManufacturer: string;
  equipmentModel: string;
  equipmentSerial: string;
  ratedOutput: string;
  numberOfPhases: string;
  typeTestCertRef: string;
  inverterManufacturer: string;
  inverterModel: string;
  associatedCertRef: string;
  // Export
  exportCapable: boolean;
  exportLimited: boolean;
  exportLimit: string;
  exportMeterFitted: boolean;
  exportMeterSerial: string;
  segSupplier: string;
  // Protection settings
  ovStage1Voltage: string;
  ovStage1Time: string;
  ovStage2Voltage: string;
  ovStage2Time: string;
  uvStage1Voltage: string;
  uvStage1Time: string;
  uvStage2Voltage: string;
  uvStage2Time: string;
  ofStage1Freq: string;
  ofStage1Time: string;
  ofStage2Freq: string;
  ofStage2Time: string;
  ufStage1Freq: string;
  ufStage1Time: string;
  ufStage2Freq: string;
  ufStage2Time: string;
  rocoFRate: string;
  rocoFTime: string;
  reconnectionDelay: string;
  // Commissioning confirmation
  antiIslandingConfirmed: boolean;
  protectionSettingsVerified: boolean;
  systemOperating: boolean;
  labelsApplied: boolean;
  customerInformed: boolean;
  // Signatures
  installerSignature: string;
  installerDate: string;
  customerSignature: string;
  customerDate: string;
  notes: string;
}

const defaultData = (): G98Data => ({
  referenceNumber: `G98-${Date.now().toString(36).toUpperCase()}`,
  commissioningDate: new Date().toISOString().split('T')[0],
  notificationDate: new Date().toISOString().split('T')[0],
  dnoName: '',
  installerName: '',
  installerCompany: '',
  installerPhone: '',
  installerEmail: '',
  mcsNumber: '',
  registrationScheme: '',
  registrationNumber: '',
  installationAddress: '',
  mpan: '',
  supplyType: 'single-phase',
  earthingArrangement: '',
  equipmentType: '',
  equipmentManufacturer: '',
  equipmentModel: '',
  equipmentSerial: '',
  ratedOutput: '',
  numberOfPhases: '1',
  typeTestCertRef: '',
  inverterManufacturer: '',
  inverterModel: '',
  associatedCertRef: '',
  exportCapable: true,
  exportLimited: false,
  exportLimit: '',
  exportMeterFitted: false,
  exportMeterSerial: '',
  segSupplier: '',
  ...G98_DEFAULTS,
  antiIslandingConfirmed: false,
  protectionSettingsVerified: false,
  systemOperating: false,
  labelsApplied: false,
  customerInformed: false,
  installerSignature: '',
  installerDate: new Date().toISOString().split('T')[0],
  customerSignature: '',
  customerDate: '',
  notes: '',
});

const DRAFT_KEY = 'elec-mate-draft-g98';

const TAB_ORDER: G98TabValue[] = ['details', 'equipment', 'signoff'];

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[12px] font-semibold text-white shrink-0">{title}</p>
    <div className="h-px flex-1 bg-white/[0.08]" />
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
                : 'bg-white/[0.18] border border-white/[0.18] text-white font-semibold'
              : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium'
          )}
        >
          {v ? 'Yes' : 'No'}
        </button>
      ))}
    </div>
  </div>
);

export default function G98CommissioningCertificate() {
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

  const [data, setData] = useState<G98Data>(defaultData());

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
    onAmended: (newId) => navigate(`/electrician/inspection-testing/g98-commissioning/${newId}`),
  });

const {
    status: syncStatus,
    saveNow,
    syncNowImmediate,
    hasRecoverableDraft,
    recoverDraft,
    discardDraft,
  } = useReportSync({
    reportId: savedReportId,
    reportType: 'g98-commissioning' as any,
    formData: data,
    enabled: !isLoading && !isLocked,
    isHydrating: isLoading, // Gate autosave while loading from cloud — prevents blank-overwrite race.
    onReportCreated: (newId) => {
      setSavedReportId(newId);
      window.history.replaceState(
        null,
        '',
        `/electrician/inspection-testing/g98-commissioning/${newId}`
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

  // Load existing report
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
          setData((prev) => ({ ...defaultData(), ...prev, ...(reportData as any) }));
          setSavedReportId(editId);
        }
      } catch (err) {
        console.error('Failed to load G98:', err);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [editId, isNew]);

  // Draft recovery
  useEffect(() => {
    if (!isNew || !hasRecoverableDraft) return;
    const draft = draftStorage.loadDraft('g98-commissioning' as any, null);
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
      if (cp) {
        setData((prev) => ({
          ...prev,
          installerName: prev.installerName || cp.inspector_name || '',
          installerCompany: prev.installerCompany || cp.company_name || '',
          installerPhone: prev.installerPhone || cp.company_phone || '',
          installerEmail: prev.installerEmail || cp.company_email || '',
          registrationScheme: prev.registrationScheme || cp.registration_scheme || '',
          registrationNumber: prev.registrationNumber || cp.registration_number || '',
        }));
      }
    });
  }, []);

  const update = useCallback((field: keyof G98Data, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const {
    currentTab,
    setCurrentTab,
    currentTabIndex,
    totalTabs,
    canNavigateNext,
    canNavigatePrevious,
    navigateNext,
    navigatePrevious,
    isCurrentTabComplete,
    isTabComplete,
    getProgressPercentage,
  } = useG98CommissioningTabs(data);

  // Track direction so the step slide matches travel (forward vs back).
  const prevIndexRef = useRef(TAB_ORDER.indexOf(currentTab));
  const stepIndex = TAB_ORDER.indexOf(currentTab);
  const isBack = stepIndex < prevIndexRef.current;
  prevIndexRef.current = stepIndex;

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
        formattedData = formatG98Json({
          ...data,
          referenceNumber: data.referenceNumber || `G98-${Date.now()}`,
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

      let company: Record<string, any> = {};
      try {
        const { data: cpData } = await supabase.rpc('get_my_company_profile');
        const cp = Array.isArray(cpData) ? cpData[0] : cpData;
        if (cp) company = cp;
      } catch {
        /* branding is optional — fall back to form data */
      }

      const branding = {
        companyName: company.company_name || data.installerCompany,
        companyAddress: company.company_address || '',
        companyPhone: company.company_phone || data.installerPhone,
        companyEmail: company.company_email || data.installerEmail,
        companyLogo: company.company_logo || '',
      };

      const { formatG98Json } = await import('@/utils/g98JsonFormatter');
      const payload = formatG98Json(data, branding);

      const { data: pdfResult, error: pdfError } = await supabase.functions.invoke(
        'generate-g98-commissioning-pdf',
        { body: { formData: payload } }
      );

      if (pdfError) throw new Error(pdfError.message || 'PDF generation failed');
      if (!pdfResult?.download_url) throw new Error('No PDF URL returned');

      const filename = `G98-${data.referenceNumber}.pdf`;
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
      toast.success('G98 form generated');
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to generate PDF';
      setGenerationError(msg);
      toast.error(msg);
    } finally {
      setIsSaving(false);
    }
  };

  // Tab content renderers
  const renderDetailsTab = () => (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      <div className={cardCn}>
        <SectionHeader title="Notification Details" />
        <Field label="Reference No.">
          <Input
            value={data.referenceNumber}
            onChange={(e) => update('referenceNumber', e.target.value)}
            className={inputCn}
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Commissioning Date">
            <Input
              type="date"
              value={data.commissioningDate}
              onChange={(e) => update('commissioningDate', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Notification Date">
            <Input
              type="date"
              value={data.notificationDate}
              onChange={(e) => update('notificationDate', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="DNO" required>
          <MobileSelectPicker
            value={data.dnoName}
            onValueChange={(v) => update('dnoName', v)}
            options={UK_DNOS.map((d) => ({ value: d, label: d }))}
            placeholder="Select DNO..."
            triggerClassName={pickerTrigger}
          />
        </Field>
      </div>

      <div className={cardCn}>
        <SectionHeader title="Installer Details" />
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
          <Field label="MCS No." required>
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
              placeholder="NICEIC, NAPIT..."
            />
          </Field>
          <Field label="Reg. No.">
            <Input
              value={data.registrationNumber}
              onChange={(e) => update('registrationNumber', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </div>

      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Site Details" />
        <Field label="Installation Address" required>
          <Input
            value={data.installationAddress}
            onChange={(e) => update('installationAddress', e.target.value)}
            className={inputCn}
          />
        </Field>
        <Field label="MPAN (21-digit)">
          <Input
            value={data.mpan}
            onChange={(e) => update('mpan', e.target.value)}
            className={inputCn}
            placeholder="e.g. 1200023305967..."
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Supply Type">
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
    </div>
  );

  const renderEquipmentTab = () => (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      <div className={cardCn}>
        <SectionHeader title="Generating Equipment" />
        <Field label="Equipment Type" required>
          <MobileSelectPicker
            value={data.equipmentType}
            onValueChange={(v) => update('equipmentType', v)}
            options={[
              { value: 'Solar PV', label: 'Solar PV' },
              { value: 'Battery Storage', label: 'Battery Storage' },
              { value: 'Combined PV+Battery', label: 'Combined PV + Battery' },
              { value: 'Wind', label: 'Wind' },
              { value: 'Micro CHP', label: 'Micro CHP' },
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
          <Field label="Serial Number">
            <Input
              value={data.equipmentSerial}
              onChange={(e) => update('equipmentSerial', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Rated Output (kW)" required>
            <Input
              type="number"
              step="0.01"
              value={data.ratedOutput}
              onChange={(e) => update('ratedOutput', e.target.value)}
              className={inputCn}
              placeholder="≤3.68 single-phase"
            />
          </Field>
          <Field label="Phases">
            <MobileSelectPicker
              value={data.numberOfPhases}
              onValueChange={(v) => update('numberOfPhases', v)}
              options={[
                { value: '1', label: 'Single-phase' },
                { value: '3', label: 'Three-phase' },
              ]}
              triggerClassName={pickerTrigger}
            />
          </Field>
        </div>
        <Field label="Type Test Certificate Ref">
          <Input
            value={data.typeTestCertRef}
            onChange={(e) => update('typeTestCertRef', e.target.value)}
            className={inputCn}
            placeholder="Manufacturer's G98 type test certificate"
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Inverter Manufacturer">
            <Input
              value={data.inverterManufacturer}
              onChange={(e) => update('inverterManufacturer', e.target.value)}
              className={inputCn}
              placeholder="If different"
            />
          </Field>
          <Field label="Inverter Model">
            <Input
              value={data.inverterModel}
              onChange={(e) => update('inverterModel', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
        <Field label="Associated Cert Ref">
          <Input
            value={data.associatedCertRef}
            onChange={(e) => update('associatedCertRef', e.target.value)}
            className={inputCn}
            placeholder="Link to PV/BESS cert number"
          />
        </Field>
      </div>

      <div className={cardCn}>
        <SectionHeader title="Export Details" />
        <div className="space-y-3">
          <Toggle
            label="Export capable"
            value={data.exportCapable}
            onChange={(v) => update('exportCapable', v)}
          />
          <Toggle
            label="Export limited by DNO"
            value={data.exportLimited}
            onChange={(v) => update('exportLimited', v)}
          />
          {data.exportLimited && (
            <Field label="Export Limit (kW)">
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
            <Field label="Export Meter Serial">
              <Input
                value={data.exportMeterSerial}
                onChange={(e) => update('exportMeterSerial', e.target.value)}
                className={inputCn}
              />
            </Field>
          )}
        </div>
        <Field label="SEG Supplier">
          <Input
            value={data.segSupplier}
            onChange={(e) => update('segSupplier', e.target.value)}
            className={inputCn}
            placeholder="e.g. Octopus, British Gas..."
          />
        </Field>
      </div>

      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Grid Protection Settings" />
        <div className="rounded-xl bg-white/[0.05] border border-amber-500/30 p-3">
          <p className="text-[12px] text-white/85">
            Pre-filled with EREC G98 Issue 5 default settings. Verify against inverter display.
          </p>
        </div>

        <Sub title="Over-voltage" />
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-4 gap-y-4">
          <Field label="OV1 (V)">
            <Input
              value={data.ovStage1Voltage}
              onChange={(e) => update('ovStage1Voltage', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="OV1 Time">
            <Input
              value={data.ovStage1Time}
              onChange={(e) => update('ovStage1Time', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="OV2 (V)">
            <Input
              value={data.ovStage2Voltage}
              onChange={(e) => update('ovStage2Voltage', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="OV2 Time">
            <Input
              value={data.ovStage2Time}
              onChange={(e) => update('ovStage2Time', e.target.value)}
              className={inputCn}
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
            />
          </Field>
          <Field label="UV1 Time">
            <Input
              value={data.uvStage1Time}
              onChange={(e) => update('uvStage1Time', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="UV2 (V)">
            <Input
              value={data.uvStage2Voltage}
              onChange={(e) => update('uvStage2Voltage', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="UV2 Time">
            <Input
              value={data.uvStage2Time}
              onChange={(e) => update('uvStage2Time', e.target.value)}
              className={inputCn}
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
            />
          </Field>
          <Field label="OF1 Time">
            <Input
              value={data.ofStage1Time}
              onChange={(e) => update('ofStage1Time', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="OF2 (Hz)">
            <Input
              value={data.ofStage2Freq}
              onChange={(e) => update('ofStage2Freq', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="OF2 Time">
            <Input
              value={data.ofStage2Time}
              onChange={(e) => update('ofStage2Time', e.target.value)}
              className={inputCn}
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
            />
          </Field>
          <Field label="UF1 Time">
            <Input
              value={data.ufStage1Time}
              onChange={(e) => update('ufStage1Time', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="UF2 (Hz)">
            <Input
              value={data.ufStage2Freq}
              onChange={(e) => update('ufStage2Freq', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="UF2 Time">
            <Input
              value={data.ufStage2Time}
              onChange={(e) => update('ufStage2Time', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>

        <Sub title="ROCOF & Reconnection" />
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-4 gap-y-4">
          <Field label="ROCOF (Hz/s)">
            <Input
              value={data.rocoFRate}
              onChange={(e) => update('rocoFRate', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="ROCOF Time">
            <Input
              value={data.rocoFTime}
              onChange={(e) => update('rocoFTime', e.target.value)}
              className={inputCn}
            />
          </Field>
          <Field label="Reconnection (s)">
            <Input
              value={data.reconnectionDelay}
              onChange={(e) => update('reconnectionDelay', e.target.value)}
              className={inputCn}
            />
          </Field>
        </div>
      </div>
    </div>
  );

  const renderSignoffTab = () => (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Commissioning Confirmation" />
        <div className="space-y-3">
          <Toggle
            label="Anti-islanding protection confirmed"
            value={data.antiIslandingConfirmed}
            onChange={(v) => update('antiIslandingConfirmed', v)}
          />
          <Toggle
            label="Protection settings verified"
            value={data.protectionSettingsVerified}
            onChange={(v) => update('protectionSettingsVerified', v)}
          />
          <Toggle
            label="System energised and operating correctly"
            value={data.systemOperating}
            onChange={(v) => update('systemOperating', v)}
          />
          <Toggle
            label="All labels and warning notices fitted"
            value={data.labelsApplied}
            onChange={(v) => update('labelsApplied', v)}
          />
          <Toggle
            label="Customer informed of system operation"
            value={data.customerInformed}
            onChange={(v) => update('customerInformed', v)}
          />
        </div>
      </div>

      <div className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Declaration & Signatures" />
        <div className="rounded-xl bg-white/[0.05] p-3.5">
          <p className="text-[13px] text-white/85 leading-relaxed">
            I confirm that the generating equipment described above has been installed and
            commissioned in accordance with EREC G98 and is connected to the distribution network.
            The protection settings have been verified and the system is operating correctly.
          </p>
        </div>
        <SignatureInput
          label="Installer Signature"
          value={data.installerSignature}
          onChange={(sig) => update('installerSignature', sig || '')}
        />
        <Field label="Date">
          <Input
            type="date"
            value={data.installerDate}
            onChange={(e) => update('installerDate', e.target.value)}
            className={inputCn}
          />
        </Field>
        <SignatureInput
          label="Customer Signature (optional)"
          value={data.customerSignature}
          onChange={(sig) => update('customerSignature', sig || '')}
        />
        {data.customerSignature && (
          <Field label="Customer Date">
            <Input
              type="date"
              value={data.customerDate}
              onChange={(e) => update('customerDate', e.target.value)}
              className={inputCn}
            />
          </Field>
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

  const tabContent: Record<G98TabValue, React.ReactNode> = {
    details: renderDetailsTab(),
    equipment: renderEquipmentTab(),
    signoff: renderSignoffTab(),
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Shell header — fixed bar with progress ring + full-width step tabs */}
      <CertShellHeader
        onBack={() => navigate(-1)}
        title="G98 Commissioning"
        subtitle={data.referenceNumber ? `${data.referenceNumber} · EREC G98` : null}
        isSaving={isSaving}
        onManualSave={handleSaveDraft}
        syncStatus={syncStatus}
        progressPercent={getProgressPercentage()}
        steps={[
          { id: 'details', label: 'Details' },
          { id: 'equipment', label: 'Equipment' },
          { id: 'signoff', label: 'Sign off' },
        ]}
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab as G98TabValue);
          window.scrollTo({ top: 0 });
        }}
        completedTabs={{
          details: !!isTabComplete('details'),
          equipment: !!isTabComplete('equipment'),
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
            {tabContent[currentTab]}
          </div>
        </div>
      </main>

      <CertShellFooter
        currentIndex={currentTabIndex}
        totalSteps={totalTabs}
        canPrevious={canNavigatePrevious}
        canNext={canNavigateNext}
        onPrevious={navigatePrevious}
        onNext={navigateNext}
        nextLabels={['Continue to Equipment', 'Continue to Sign off']}
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
              <label htmlFor="g98-email" className="mb-1 block text-[12px] font-medium text-white">
                Recipient email
              </label>
              <Input
                id="g98-email"
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
            <AlertDialogTitle className="text-white text-base font-bold">Recover unsaved work?</AlertDialogTitle>
            <AlertDialogDescription className="text-white text-sm">
              A previous unsaved G98 form was found. Would you like to recover it?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
            <AlertDialogAction
              onClick={() => {
                if (recoveryDraft) {
                  setData((prev) => ({ ...defaultData(), ...prev, ...recoveryDraft.data }));
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
        documentLabel="G98 Form"
      />
    </div>
  );
}
