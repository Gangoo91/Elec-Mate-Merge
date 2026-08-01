import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import SignatureInput from '@/components/signature/SignatureInput';
import ClientSelector from '@/components/ClientSelector';
import type { Customer } from '@/hooks/inspection/useCustomers';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useCertLock } from '@/hooks/useCertLock';
import CertLockBar from '@/components/inspection/CertLockBar';
import CertShellHeader from '@/components/inspection/shared/CertShellHeader';
import CertShellFooter, {
  certFooterNeutralButton,
} from '@/components/inspection/shared/CertShellFooter';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';
import { reportCloud } from '@/utils/reportCloud';
import { formatDisconnectionCertificatePayload } from '@/utils/disconnection-certificate-formatter';

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const DEFAULT_METHOD =
  'Isolated at the consumer unit, circuit locked off and proved dead with a GS38-approved voltage indicator.';

// Most disconnections are one standard hard-wired appliance — one tap fills it.
const APPLIANCE_PRESETS: { label: string; appliance: string; circuit: string }[] = [
  { label: 'Cooker', appliance: 'Electric cooker', circuit: 'Cooker circuit' },
  { label: 'Hob', appliance: 'Electric hob', circuit: 'Hob circuit' },
  { label: 'Oven', appliance: 'Electric oven', circuit: 'Oven circuit' },
  { label: 'Shower', appliance: 'Electric shower', circuit: 'Shower circuit' },
  { label: 'Immersion', appliance: 'Immersion heater', circuit: 'Immersion heater circuit' },
  { label: 'EV charger', appliance: 'EV charge point', circuit: 'EV charger circuit' },
];

const REASON_PRESETS = [
  'Appliance removed',
  'Faulty appliance removed',
  'Refurbishment / refit',
  'Customer request',
  'Made safe pending repair',
];

interface DisconnectionData {
  referenceNumber: string;
  workDate: string;
  // Contractor
  contractorName: string;
  contractorCompany: string;
  contractorPhone: string;
  contractorEmail: string;
  registrationScheme: string;
  registrationNumber: string;
  // Client
  selectedCustomerId: string;
  clientName: string;
  clientPhone: string;
  clientEmail: string;
  installationAddress: string;
  // Disconnection
  disconnectionType: string;
  circuitDisconnected: string;
  applianceDisconnected: string;
  reasonForDisconnection: string;
  isolationMethod: string;
  // Confirmations
  madeDead: boolean;
  terminationsSafe: boolean;
  labelled: boolean;
  noReconnectionRisk: boolean;
  remainderSafe: boolean;
  reconnectionAdvised: boolean;
  // Declaration
  inspectorSignature: string;
  clientSignature: string;
  clientRefusedToSign: boolean;
  photos: string[];
  notes: string;
}

const defaultData = (): DisconnectionData => ({
  referenceNumber: `DISC-${Date.now().toString(36).toUpperCase()}`,
  workDate: new Date().toISOString().split('T')[0],
  contractorName: '',
  contractorCompany: '',
  contractorPhone: '',
  contractorEmail: '',
  registrationScheme: '',
  registrationNumber: '',
  selectedCustomerId: '',
  clientName: '',
  clientPhone: '',
  clientEmail: '',
  installationAddress: '',
  disconnectionType: 'appliance',
  circuitDisconnected: '',
  applianceDisconnected: '',
  reasonForDisconnection: '',
  isolationMethod: DEFAULT_METHOD,
  madeDead: false,
  terminationsSafe: false,
  labelled: false,
  noReconnectionRisk: false,
  remainderSafe: false,
  reconnectionAdvised: false,
  inspectorSignature: '',
  clientSignature: '',
  clientRefusedToSign: false,
  photos: [],
  notes: '',
});

const DRAFT_KEY = 'elec-mate-draft-disconnection-certificate';

type StepId = 'details' | 'disconnection' | 'safety' | 'signoff';

const STEPS: { id: StepId; label: string }[] = [
  { id: 'details', label: 'Details' },
  { id: 'disconnection', label: 'Disconnection' },
  { id: 'safety', label: 'Safe isolation' },
  { id: 'signoff', label: 'Sign off' },
];

// ── Section primitives ────────────────────────────────────────────
const SectionHeading = ({ title, hint }: { title: string; hint?: string }) => (
  <div className="mb-3 flex items-baseline justify-between gap-3">
    <h2 className="text-[15px] font-semibold tracking-tight text-white">{title}</h2>
    {hint && <span className="text-[11px] text-white/80">{hint}</span>}
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className={labelCn}>{label}</Label>
    {children}
  </div>
);

const Chip = ({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={cn(
      'h-11 px-4 rounded-xl text-[13px] whitespace-nowrap touch-manipulation transition-colors active:scale-[0.97]',
      active
        ? 'bg-elec-yellow border border-elec-yellow text-black font-semibold'
        : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium'
    )}
  >
    {label}
  </button>
);

const Segment = ({
  value,
  options,
  onChange,
}: {
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) => (
  <div className="flex gap-2">
    {options.map((o) => (
      <button
        key={o.value}
        type="button"
        onClick={() => onChange(o.value)}
        className={cn(
          'flex-1 h-11 rounded-xl px-3 text-sm touch-manipulation transition-all active:scale-[0.98]',
          value === o.value
            ? 'bg-elec-yellow border border-elec-yellow text-black font-semibold'
            : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium'
        )}
      >
        {o.label}
      </button>
    ))}
  </div>
);

const ConfirmRow = ({
  checked,
  label,
  onToggle,
}: {
  checked: boolean;
  label: string;
  onToggle: () => void;
}) => (
  <button
    type="button"
    onClick={onToggle}
    className={cn(
      'w-full flex items-center justify-between gap-3 min-h-11 px-3.5 py-2.5 rounded-xl border text-left touch-manipulation transition-colors active:scale-[0.99] bg-white/[0.06]',
      checked ? 'border-green-500/60' : 'border-white/[0.12]'
    )}
  >
    <span className="text-[13px] leading-tight text-white">{label}</span>
    <span
      className={cn(
        'text-[12px] shrink-0',
        checked ? 'font-semibold text-green-400' : 'font-medium text-white/80'
      )}
    >
      {checked ? 'Confirmed' : 'Tap'}
    </span>
  </button>
);

export default function DisconnectionCertificate() {
  const navigate = useNavigate();
  const { id: editId } = useParams<{ id: string }>();
  const [isSaving, setIsSaving] = useState(false);
  const [isProcessingPhoto, setIsProcessingPhoto] = useState(false);
  const [existingReportId, setExistingReportId] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<StepId>('details');

  // Email dialog state
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  // Lock + versioning (ELE-1037). Disconnection saves manually (no autosave),
  // so handleSave is guarded below when locked.
  const {
    isLocked,
    lockedAt,
    editVersion,
    lockReport,
    amendReport,
    databaseId,
    openReport,
    hasVersions,
  } = useCertLock({
    reportId: existingReportId || editId || null,
    onAmended: (newId) => navigate(`/electrician/inspection-testing/disconnection/${newId}`),
  });

  const photoInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<DisconnectionData>(() => {
    const saved = storageGetJSONSync<Partial<DisconnectionData>>(DRAFT_KEY, null);
    return saved ? { ...defaultData(), ...saved } : defaultData();
  });

  // Track direction so the step slide matches travel (forward vs back).
  const currentIndex = STEPS.findIndex((s) => s.id === currentStep);
  const prevIndexRef = useRef(currentIndex);
  const isBack = currentIndex < prevIndexRef.current;
  prevIndexRef.current = currentIndex;

  useEffect(() => {
    if (!editId) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const result = await reportCloud.getReportData(editId, user.id);
      if (result) {
        setData((prev) => ({ ...prev, ...(result as Partial<DisconnectionData>) }));
        setExistingReportId(editId);
      }
    });
  }, [editId]);

  useEffect(() => {
    if (editId) return;
    const timer = setTimeout(() => {
      storageSetJSONSync(DRAFT_KEY, data);
    }, 2000);
    return () => clearTimeout(timer);
  }, [data, editId]);

  useEffect(() => {
    if (data.contractorName) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: cpData } = await supabase.rpc('get_my_company_profile');
      const cp = Array.isArray(cpData) ? cpData[0] : cpData;
      if (cp) {
        setData((prev) => ({
          ...prev,
          contractorName: prev.contractorName || cp.inspector_name || cp.company_name || '',
          contractorCompany: prev.contractorCompany || cp.company_name || '',
          contractorPhone: prev.contractorPhone || cp.company_phone || '',
          contractorEmail: prev.contractorEmail || cp.company_email || '',
          registrationScheme: prev.registrationScheme || cp.registration_scheme || '',
          registrationNumber: prev.registrationNumber || cp.registration_number || '',
        }));
      }
    });
  }, []);

  const update = useCallback(
    <K extends keyof DisconnectionData>(field: K, value: DisconnectionData[K]) => {
      setData((prev) => ({ ...prev, [field]: value }));
    },
    []
  );

  const handleSelectCustomer = (customer: Customer | null) => {
    if (!customer) {
      update('selectedCustomerId', '');
      return;
    }
    setData((prev) => ({
      ...prev,
      selectedCustomerId: customer.id,
      clientName: customer.name || prev.clientName,
      clientPhone: customer.phone || prev.clientPhone,
      clientEmail: customer.email || prev.clientEmail,
      installationAddress: customer.address || prev.installationAddress,
    }));
  };

  const applyAppliancePreset = (preset: { appliance: string; circuit: string }) => {
    setData((prev) => ({
      ...prev,
      disconnectionType: 'appliance',
      applianceDisconnected: preset.appliance,
      // Only suggest a circuit if the user hasn't typed their own.
      circuitDisconnected: prev.circuitDisconnected.trim()
        ? prev.circuitDisconnected
        : preset.circuit,
    }));
  };

  const confirmAll = () =>
    setData((prev) => ({
      ...prev,
      madeDead: true,
      terminationsSafe: true,
      labelled: true,
      noReconnectionRisk: true,
      remainderSafe: true,
      reconnectionAdvised: true,
    }));

  // Resize + re-encode a single image file to a JPEG data URL. Rejects on
  // formats the browser can't decode (e.g. HEIC in Chrome) so we can tell the
  // user instead of silently dropping the photo.
  const processImageFile = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('read-failed'));
      reader.onload = () => {
        const img = new Image();
        img.onerror = () => reject(new Error('decode-failed'));
        img.onload = () => {
          try {
            const MAX = 1400;
            const scale = img.width > MAX ? MAX / img.width : 1;
            const canvas = document.createElement('canvas');
            canvas.width = Math.round(img.width * scale);
            canvas.height = Math.round(img.height * scale);
            const ctx = canvas.getContext('2d');
            if (!ctx) return reject(new Error('no-canvas'));
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
            resolve(canvas.toDataURL('image/jpeg', 0.78));
          } catch {
            reject(new Error('encode-failed'));
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    });

  const handlePhotoCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    e.target.value = '';
    setIsProcessingPhoto(true);
    let failed = 0;
    for (const file of Array.from(files)) {
      try {
        const dataUrl = await processImageFile(file);
        setData((prev) => ({ ...prev, photos: [...prev.photos, dataUrl] }));
      } catch {
        failed += 1;
      }
    }
    setIsProcessingPhoto(false);
    if (failed > 0) {
      toast.error(
        failed === 1
          ? "Couldn't read that photo — if it's a HEIC from your camera roll, use Take Photo or save it as JPEG first."
          : `Couldn't read ${failed} photos (HEIC isn't supported here) — use Take Photo or JPEG.`
      );
    }
  };

  const handleSaveDraft = () => {
    storageSetJSONSync(DRAFT_KEY, data);
    toast.success('Draft saved');
  };

  const handleEmailCertificate = () => {
    if (!existingReportId) {
      toast.error('Generate the certificate first, then email it.');
      return;
    }
    if (data.clientEmail) setEmailRecipient(data.clientEmail);
    setShowEmailDialog(true);
  };

  const handleSendEmail = async () => {
    if (!emailRecipient || !emailRecipient.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    if (!existingReportId) {
      toast.error('Generate the certificate first, then email it.');
      return;
    }
    setIsSendingEmail(true);
    try {
      // Send the formatted payload so the function can generate + attach the
      // PDF even when the stored pdf_payload is missing or stale.
      let formattedData: Record<string, unknown> | undefined;
      try {
        let company: Record<string, unknown> = {};
        try {
          const { data: cpData } = await supabase.rpc('get_my_company_profile');
          const cp = Array.isArray(cpData) ? cpData[0] : cpData;
          if (cp) company = cp;
        } catch {
          /* proceed without branding */
        }
        formattedData = formatDisconnectionCertificatePayload(
          {
            ...data,
            referenceNumber:
              data.referenceNumber || `DISC-${Date.now().toString(36).toUpperCase()}`,
          },
          company
        );
      } catch {
        formattedData = undefined; // fall back to server-side pdf_payload
      }
      const { data: result, error: fnError } = await supabase.functions.invoke(
        'send-certificate-resend',
        { body: { reportId: existingReportId, recipientEmail: emailRecipient, formattedData } }
      );
      if (fnError) {
        let errorMessage = fnError.message;
        try {
          const parsed = JSON.parse(fnError.message);
          errorMessage = parsed.error || parsed.message || fnError.message;
        } catch {
          /* keep original message */
        }
        const context = (fnError as { context?: { body?: unknown } }).context;
        if (context?.body) {
          try {
            const bodyError =
              typeof context.body === 'string' ? JSON.parse(context.body) : context.body;
            const errText = (bodyError as { error?: string }).error;
            if (errText) errorMessage = errText;
          } catch {
            /* keep original message */
          }
        }
        throw new Error(errorMessage);
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

  const handleSave = async () => {
    if (isLocked) {
      toast.error('This certificate is locked. Create a new version to make changes.');
      return;
    }
    if (!data.circuitDisconnected.trim() && !data.applianceDisconnected.trim()) {
      toast.error('Describe the circuit or appliance disconnected');
      return;
    }
    if (!data.inspectorSignature) {
      toast.error('Please add your signature');
      return;
    }
    setIsSaving(true);
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) {
        toast.error('Please sign in');
        setIsSaving(false);
        return;
      }

      const customerId = data.selectedCustomerId || undefined;
      // Track the database report_id locally — setExistingReportId won't be
      // visible in this closure, and data.referenceNumber ('DISC-...') never
      // matches reports.report_id ('DISCONNECTION-...'), so relying on state
      // here silently updated 0 rows on every first-time generation.
      let reportIdForSave = existingReportId;
      if (existingReportId) {
        await reportCloud.updateReport(
          existingReportId,
          user.id,
          data as unknown as Record<string, unknown>,
          customerId
        );
      } else {
        const result = await reportCloud.createReport(
          user.id,
          'disconnection' as never,
          data as unknown as Record<string, unknown>,
          customerId
        );
        if (!result.success) {
          toast.error('Failed to save');
          setIsSaving(false);
          return;
        }
        if (result.reportId) {
          reportIdForSave = result.reportId;
          setExistingReportId(result.reportId);
        }
      }

      toast.success('Saved — generating PDF...');
      const savedReportId = reportIdForSave || data.referenceNumber;
      try {
        let company: Record<string, unknown> = {};
        try {
          const { data: cpData } = await supabase.rpc('get_my_company_profile');
          const cp = Array.isArray(cpData) ? cpData[0] : cpData;
          if (cp) company = cp;
        } catch {
          /* proceed without branding */
        }

        const payload = formatDisconnectionCertificatePayload(data, company);

        // Store the formatted payload so server-side email regeneration can
        // rebuild the PDF without the client (EV pattern) — reportCloud
        // clears pdf_payload on every save, so re-write it at generate time.
        if (reportIdForSave) {
          await supabase
            .from('reports')
            .update({ pdf_payload: payload })
            .eq('report_id', reportIdForSave);
        }

        const { data: pdfResult, error: pdfError } = await supabase.functions.invoke(
          'generate-disconnection-certificate-pdf',
          { body: { formData: payload } }
        );

        if (pdfError) {
          console.error('PDF generation error:', pdfError);
          toast.error('Saved but PDF generation failed — you can retry later');
        } else if (pdfResult?.download_url) {
          let permanentPdfUrl = pdfResult.download_url;
          try {
            const { saveCertificatePdf } = await import('@/utils/certificate-pdf-storage');
            const { permanentUrl, storagePath } = await saveCertificatePdf(
              pdfResult.download_url,
              user.id,
              savedReportId,
              data.referenceNumber
            );
            permanentPdfUrl = permanentUrl;
            await supabase
              .from('reports')
              .update({
                storage_path: storagePath,
                pdf_url: permanentPdfUrl,
                pdf_generated_at: new Date().toISOString(),
              })
              .eq('report_id', savedReportId);
          } catch (storageErr) {
            console.warn(
              '[DisconnectionCertificate] Permanent PDF storage failed, using temp URL:',
              storageErr
            );
            await supabase
              .from('reports')
              .update({ pdf_url: permanentPdfUrl, pdf_generated_at: new Date().toISOString() })
              .eq('report_id', savedReportId);
          }

          const { openOrDownloadPdf } = await import('@/utils/pdf-download');
          await openOrDownloadPdf(
            permanentPdfUrl,
            `Disconnection-Certificate-${data.referenceNumber}.pdf`
          );
          toast.success('Disconnection certificate issued');
        }
      } catch (pdfErr) {
        console.error('PDF generation error:', pdfErr);
        toast.error('Saved but PDF generation failed');
      }

      storageRemoveSync(DRAFT_KEY);
      navigate(-1);
    } catch {
      toast.error('Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  const allConfirmed =
    data.madeDead &&
    data.terminationsSafe &&
    data.labelled &&
    data.noReconnectionRisk &&
    data.remainderSafe &&
    data.reconnectionAdvised;

  // Live completion — drives the header progress ring.
  const completionChecks = [
    !!(data.clientName.trim() || data.installationAddress.trim()),
    !!(data.applianceDisconnected.trim() || data.circuitDisconnected.trim()),
    !!data.reasonForDisconnection.trim(),
    !!data.isolationMethod.trim(),
    allConfirmed,
    !!data.inspectorSignature,
  ];
  const progress = Math.round(
    (completionChecks.filter(Boolean).length / completionChecks.length) * 100
  );

  const completedTabs: Record<string, boolean> = {
    details: completionChecks[0],
    disconnection: completionChecks[1] && completionChecks[2] && completionChecks[3],
    safety: allConfirmed,
    signoff: !!data.inspectorSignature,
  };

  const goToStep = (step: string) => {
    setCurrentStep(step as StepId);
    window.scrollTo({ top: 0 });
  };

  const stepContent: Record<StepId, React.ReactNode> = {
    details: (
      <>
        <p className="text-[13px] leading-relaxed text-white/80 lg:col-span-2">
          A record confirming a circuit or appliance has been safely disconnected and made dead.
          For disconnections only — no live testing is carried out, so this is not a Minor Works
          certificate.
        </p>

        {/* Reference */}
        <section className={cn(cardCn, 'lg:col-span-2')}>
          <SectionHeading title="Reference" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Record no.">
              <Input
                value={data.referenceNumber}
                onChange={(e) => update('referenceNumber', e.target.value)}
                className={inputCn}
              />
            </Field>
            <Field label="Date of work">
              <Input
                type="date"
                value={data.workDate}
                onChange={(e) => update('workDate', e.target.value)}
                className={inputCn}
              />
            </Field>
          </div>
        </section>

        {/* Contractor — autofilled from your company profile */}
        <section className={cardCn}>
          <SectionHeading title="Contractor" hint="from your profile" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Name">
              <Input
                value={data.contractorName}
                onChange={(e) => update('contractorName', e.target.value)}
                className={inputCn}
              />
            </Field>
            <Field label="Company">
              <Input
                value={data.contractorCompany}
                onChange={(e) => update('contractorCompany', e.target.value)}
                className={inputCn}
              />
            </Field>
            <Field label="Phone">
              <Input
                type="tel"
                inputMode="tel"
                value={data.contractorPhone}
                onChange={(e) => update('contractorPhone', e.target.value)}
                className={inputCn}
              />
            </Field>
            <Field label="Email">
              <Input
                type="email"
                inputMode="email"
                autoCapitalize="none"
                value={data.contractorEmail}
                onChange={(e) => update('contractorEmail', e.target.value)}
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
            <Field label="Reg. no.">
              <Input
                value={data.registrationNumber}
                onChange={(e) => update('registrationNumber', e.target.value)}
                className={inputCn}
              />
            </Field>
          </div>
        </section>

        {/* Client — pick a saved customer to autofill */}
        <section className={cardCn}>
          <SectionHeading title="Client" hint="pick to autofill" />
          <ClientSelector
            onSelectCustomer={handleSelectCustomer}
            selectedCustomerId={data.selectedCustomerId || undefined}
          />
          <Field label="Name">
            <Input
              value={data.clientName}
              onChange={(e) => update('clientName', e.target.value)}
              className={inputCn}
              placeholder="Client name"
            />
          </Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Phone">
              <Input
                type="tel"
                inputMode="tel"
                value={data.clientPhone}
                onChange={(e) => update('clientPhone', e.target.value)}
                className={inputCn}
              />
            </Field>
            <Field label="Email">
              <Input
                type="email"
                inputMode="email"
                autoCapitalize="none"
                value={data.clientEmail}
                onChange={(e) => update('clientEmail', e.target.value)}
                className={inputCn}
              />
            </Field>
          </div>
          <Field label="Installation address">
            <Input
              value={data.installationAddress}
              onChange={(e) => update('installationAddress', e.target.value)}
              className={inputCn}
              placeholder="Where the work was carried out"
            />
          </Field>
        </section>
      </>
    ),
    disconnection: (
      <section className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeading title="What was disconnected" />

        {/* Quick presets — one tap fills the common job */}
        <div>
          <p className={labelCn}>Quick pick</p>
          <div className="flex flex-wrap gap-2">
            {APPLIANCE_PRESETS.map((p) => (
              <Chip
                key={p.label}
                label={p.label}
                active={data.applianceDisconnected === p.appliance}
                onClick={() => applyAppliancePreset(p)}
              />
            ))}
          </div>
        </div>

        <Field label="Type">
          <Segment
            value={data.disconnectionType}
            onChange={(v) => update('disconnectionType', v)}
            options={[
              { value: 'appliance', label: 'Appliance' },
              { value: 'circuit', label: 'Circuit' },
              { value: 'both', label: 'Both' },
            ]}
          />
        </Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Appliance disconnected">
            <Input
              value={data.applianceDisconnected}
              onChange={(e) => update('applianceDisconnected', e.target.value)}
              className={inputCn}
              placeholder="e.g. Electric cooker / 9.5kW shower"
            />
          </Field>
          <Field label="Circuit disconnected">
            <Input
              value={data.circuitDisconnected}
              onChange={(e) => update('circuitDisconnected', e.target.value)}
              className={inputCn}
              placeholder="e.g. Cooker circuit, 32A from way 6"
            />
          </Field>
        </div>

        <Field label="Reason for disconnection">
          <div className="flex flex-wrap gap-2 mb-2">
            {REASON_PRESETS.map((r) => (
              <Chip
                key={r}
                label={r}
                active={data.reasonForDisconnection === r}
                onClick={() => update('reasonForDisconnection', r)}
              />
            ))}
          </div>
          <Textarea
            value={data.reasonForDisconnection}
            onChange={(e) => update('reasonForDisconnection', e.target.value)}
            className={textareaCn}
            placeholder="Tap a reason above or type your own"
          />
        </Field>

        <Field label="Method of isolation / making dead">
          <Textarea
            value={data.isolationMethod}
            onChange={(e) => update('isolationMethod', e.target.value)}
            className={textareaCn}
            placeholder="How the circuit was isolated and proved dead"
          />
          {data.isolationMethod !== DEFAULT_METHOD && (
            <button
              type="button"
              onClick={() => update('isolationMethod', DEFAULT_METHOD)}
              className="mt-1 h-11 px-1 text-[13px] font-medium text-elec-yellow touch-manipulation active:scale-[0.98]"
            >
              Use standard GS38 wording
            </button>
          )}
        </Field>
      </section>
    ),
    safety: (
      <>
        {/* Confirmation */}
        <section className={cardCn}>
          <SectionHeading
            title="Safe isolation"
            hint={allConfirmed ? 'all confirmed' : undefined}
          />
          <button
            type="button"
            onClick={confirmAll}
            disabled={allConfirmed}
            className={cn(
              'w-full h-11 rounded-xl text-[13px] touch-manipulation transition-colors active:scale-[0.99]',
              allConfirmed
                ? 'bg-white/[0.06] border border-white/[0.12] text-white/60 font-medium'
                : 'bg-elec-yellow font-semibold text-black'
            )}
          >
            {allConfirmed ? 'All checks confirmed' : 'Confirm all'}
          </button>
          <div className="space-y-2">
            <ConfirmRow
              checked={data.madeDead}
              label="Circuit / appliance safely isolated and proved dead"
              onToggle={() => update('madeDead', !data.madeDead)}
            />
            <ConfirmRow
              checked={data.terminationsSafe}
              label="Exposed conductors safely terminated / made safe"
              onToggle={() => update('terminationsSafe', !data.terminationsSafe)}
            />
            <ConfirmRow
              checked={data.labelled}
              label="Disconnected point labelled where required"
              onToggle={() => update('labelled', !data.labelled)}
            />
            <ConfirmRow
              checked={data.noReconnectionRisk}
              label="No risk of inadvertent reconnection / left safe"
              onToggle={() => update('noReconnectionRisk', !data.noReconnectionRisk)}
            />
            <ConfirmRow
              checked={data.remainderSafe}
              label="Remainder of installation left in safe working order"
              onToggle={() => update('remainderSafe', !data.remainderSafe)}
            />
            <ConfirmRow
              checked={data.reconnectionAdvised}
              label="Client advised: reconnection by a competent person only"
              onToggle={() => update('reconnectionAdvised', !data.reconnectionAdvised)}
            />
          </div>
        </section>

        {/* Photos */}
        <section className={cardCn}>
          <SectionHeading
            title="Photos"
            hint={data.photos.length > 0 ? `${data.photos.length} added` : 'optional'}
          />
          {/* Camera capture — always returns JPEG, the reliable on-site path */}
          <input
            ref={cameraInputRef}
            type="file"
            accept="image/*"
            capture="environment"
            className="hidden"
            onChange={handlePhotoCapture}
          />
          {/* Gallery upload */}
          <input
            ref={photoInputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp,.jpg,.jpeg,.png,.webp"
            multiple
            className="hidden"
            onChange={handlePhotoCapture}
          />
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              disabled={isProcessingPhoto}
              onClick={() => cameraInputRef.current?.click()}
              className="h-11 rounded-xl border border-white/[0.12] bg-white/[0.06] flex items-center justify-center gap-2 text-[13px] font-medium text-white touch-manipulation active:scale-[0.98] disabled:opacity-50"
            >
              {isProcessingPhoto && <Loader2 className="h-4 w-4 animate-spin" />}
              Take photo
            </button>
            <button
              type="button"
              disabled={isProcessingPhoto}
              onClick={() => photoInputRef.current?.click()}
              className="h-11 rounded-xl border border-dashed border-white/[0.2] flex items-center justify-center text-[13px] font-medium text-white/85 touch-manipulation active:scale-[0.98] disabled:opacity-50"
            >
              Add photos
            </button>
          </div>
          {data.photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {data.photos.map((photo, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                  <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        photos: prev.photos.filter((_, j) => j !== i),
                      }))
                    }
                    className="absolute top-1.5 right-1.5 h-8 rounded-full bg-black/70 px-3 text-[11px] font-medium text-white touch-manipulation active:scale-[0.97]"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </>
    ),
    signoff: (
      <>
        {/* Declaration & Signatures */}
        <section className={cn(cardCn, 'lg:col-span-2')}>
          <SectionHeading title="Declaration" />
          <div className="rounded-xl bg-white/[0.05] p-3.5">
            <p className="text-[12.5px] text-white/80 leading-relaxed">
              I confirm that the circuit / appliance described above has been safely disconnected
              and made dead in accordance with safe isolation practice (GS38). No live testing has
              been carried out as part of this disconnection.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 items-start">
            <SignatureInput
              label="Contractor signature"
              value={data.inspectorSignature}
              onChange={(sig) => update('inspectorSignature', sig || '')}
            />
            <div className="space-y-3">
              <ConfirmRow
                checked={data.clientRefusedToSign}
                label="Client declined to sign"
                onToggle={() => update('clientRefusedToSign', !data.clientRefusedToSign)}
              />
              {!data.clientRefusedToSign && (
                <SignatureInput
                  label="Client signature"
                  value={data.clientSignature}
                  onChange={(sig) => update('clientSignature', sig || '')}
                />
              )}
            </div>
          </div>
        </section>

        {/* Notes */}
        <section className={cn(cardCn, 'lg:col-span-2')}>
          <SectionHeading title="Notes" hint="optional" />
          <Textarea
            value={data.notes}
            onChange={(e) => update('notes', e.target.value)}
            className={textareaCn}
            placeholder="Additional notes..."
          />
        </section>
      </>
    ),
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Shell header — fixed bar with progress ring + full-width step tabs */}
      <CertShellHeader
        onBack={() => navigate(-1)}
        title="Disconnection"
        subtitle={data.referenceNumber ? `${data.referenceNumber} · BS 7671` : null}
        isSaving={isSaving}
        onManualSave={handleSaveDraft}
        progressPercent={progress}
        steps={STEPS}
        currentTab={currentStep}
        onTabChange={goToStep}
        completedTabs={completedTabs}
      />

      {/* ELE-1037 — lock / version bar */}
      <CertLockBar
        isLocked={isLocked}
        lockedAt={lockedAt}
        editVersion={editVersion}
        canIssue={!isLocked && !!(existingReportId || editId) && !!data.inspectorSignature}
        onLock={lockReport}
        onAmend={amendReport}
        databaseId={databaseId}
        hasVersions={hasVersions}
        onOpenVersion={openReport}
      />

      <main className="-mx-3 px-4 py-4 pb-36 sm:mx-auto sm:px-4 lg:max-w-[1600px] lg:px-8">
        <div
          className={cn(isLocked && 'pointer-events-none select-none opacity-95')}
          aria-disabled={isLocked || undefined}
        >
          <div
            key={currentStep}
            className={
              isBack ? 'motion-safe:animate-mw-step-back' : 'motion-safe:animate-mw-step-in'
            }
          >
            <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
              {stepContent[currentStep]}
            </div>
          </div>
        </div>
      </main>

      {/* Shell footer — Back + Continue, Generate on the last step */}
      <CertShellFooter
        currentIndex={currentIndex}
        totalSteps={STEPS.length}
        canPrevious={currentIndex > 0}
        canNext={currentIndex < STEPS.length - 1}
        onPrevious={() => {
          if (currentIndex > 0) setCurrentStep(STEPS[currentIndex - 1].id);
        }}
        onNext={() => {
          if (currentIndex < STEPS.length - 1) setCurrentStep(STEPS[currentIndex + 1].id);
        }}
        nextLabels={[
          'Continue to disconnection',
          'Continue to safe isolation',
          'Continue to sign off',
        ]}
        isLastStep={currentIndex === STEPS.length - 1}
        onGenerate={handleSave}
        canGenerate={!isSaving}
        generateLabel={
          isSaving ? 'Saving...' : existingReportId ? 'Update certificate' : 'Generate PDF'
        }
        lastStepActions={
          <>
            <button type="button" onClick={handleSaveDraft} className={certFooterNeutralButton}>
              Save draft
            </button>
            <button
              type="button"
              onClick={handleEmailCertificate}
              disabled={!existingReportId}
              className={certFooterNeutralButton}
            >
              Email
            </button>
          </>
        }
      />

      {/* Email dialog */}
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
              <label
                htmlFor="disconnection-email"
                className="mb-1 block text-[12px] font-medium text-white"
              >
                Recipient email
              </label>
              <Input
                id="disconnection-email"
                type="email"
                placeholder="client@example.com"
                value={emailRecipient}
                onChange={(e) => setEmailRecipient(e.target.value)}
                disabled={isSendingEmail}
                className="input-underline h-11 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none touch-manipulation"
              />
            </div>
            {data.clientEmail && emailRecipient !== data.clientEmail && (
              <button
                type="button"
                onClick={() => setEmailRecipient(data.clientEmail)}
                className="w-full h-11 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-[13px] font-medium hover:bg-white/[0.08] touch-manipulation active:scale-[0.98] transition-all"
              >
                Use client email: {data.clientEmail}
              </button>
            )}
          </div>
          {/* Plain column footer — DialogFooter's sm:space-x-2 skews stacked
              buttons sideways, so the two never sat level. */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleSendEmail}
              disabled={isSendingEmail || !emailRecipient}
              className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-all hover:bg-elec-yellow/90 active:scale-[0.98] disabled:bg-elec-yellow disabled:text-black disabled:opacity-100 touch-manipulation"
            >
              {isSendingEmail ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-black" />
                  Sending…
                </>
              ) : (
                'Send certificate'
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowEmailDialog(false)}
              disabled={isSendingEmail}
              className="h-12 w-full rounded-xl border border-white/[0.1] bg-white/[0.04] font-medium text-white transition-all hover:bg-white/[0.08] hover:text-white active:scale-[0.98] disabled:opacity-40 touch-manipulation"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
