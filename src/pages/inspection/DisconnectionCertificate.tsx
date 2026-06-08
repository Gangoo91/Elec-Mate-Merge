import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';
import { reportCloud } from '@/utils/reportCloud';
import { formatDisconnectionCertificatePayload } from '@/utils/disconnection-certificate-formatter';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};
const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};
const inputCn =
  'h-12 text-base touch-manipulation bg-white/[0.04] border-white/[0.08] text-white rounded-lg focus:border-elec-yellow/60 focus:ring-elec-yellow/20 [color-scheme:dark]';
const textareaCn =
  'touch-manipulation text-base min-h-[80px] bg-white/[0.04] border-white/[0.08] text-white rounded-lg focus:border-elec-yellow/60 focus:ring-elec-yellow/20';

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

// ── Editorial primitives ──────────────────────────────────────────
const SectionHeader = ({ title, hint }: { title: string; hint?: string }) => (
  <div className="flex items-baseline justify-between gap-3 border-b border-white/[0.06] pb-1.5 mb-3.5">
    <h2 className="text-[11px] font-semibold text-white/90 uppercase tracking-[0.18em]">{title}</h2>
    {hint && <span className="text-[10px] text-white/35">{hint}</span>}
  </div>
);

const Field = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div>
    <Label className="text-white/55 text-[11px] font-medium mb-1.5 block tracking-wide">
      {label}
    </Label>
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
      'h-10 px-4 rounded-full text-[13px] font-medium whitespace-nowrap touch-manipulation transition-colors active:scale-[0.97]',
      active
        ? 'bg-elec-yellow/15 border border-elec-yellow/50 text-elec-yellow'
        : 'bg-white/[0.04] border border-white/[0.1] text-white/70'
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
  <div className="flex gap-1.5 p-1 rounded-xl bg-white/[0.03] border border-white/[0.08]">
    {options.map((o) => (
      <button
        key={o.value}
        type="button"
        onClick={() => onChange(o.value)}
        className={cn(
          'flex-1 h-10 rounded-lg text-[12.5px] font-medium touch-manipulation transition-colors active:scale-[0.98]',
          value === o.value
            ? 'bg-elec-yellow/15 border border-elec-yellow/45 text-elec-yellow'
            : 'text-white/60'
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
      'w-full flex items-center justify-between gap-3 h-12 px-3.5 rounded-lg border text-left touch-manipulation transition-colors active:scale-[0.99]',
      checked
        ? 'bg-elec-yellow/[0.08] border-elec-yellow/35'
        : 'bg-white/[0.03] border-white/[0.08]'
    )}
  >
    <span className={cn('text-[13px] leading-tight', checked ? 'text-white' : 'text-white/70')}>
      {label}
    </span>
    <span
      className={cn(
        'text-[10px] font-semibold uppercase tracking-[0.12em] shrink-0',
        checked ? 'text-elec-yellow' : 'text-white/30'
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
        if (result.reportId) setExistingReportId(result.reportId);
      }

      toast.success('Saved — generating PDF...');
      const savedReportId = existingReportId || data.referenceNumber;
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

  // Live completion — drives the sticky progress bar.
  const steps = [
    !!(data.clientName.trim() || data.installationAddress.trim()),
    !!(data.applianceDisconnected.trim() || data.circuitDisconnected.trim()),
    !!data.reasonForDisconnection.trim(),
    !!data.isolationMethod.trim(),
    allConfirmed,
    !!data.inspectorSignature,
  ];
  const progress = Math.round((steps.filter(Boolean).length / steps.length) * 100);

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 sm:px-6 py-2 mx-auto w-full max-w-5xl">
          <div className="flex items-center justify-between gap-3 h-11">
            <div className="flex items-center gap-2.5 min-w-0">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(-1)}
                className="text-white hover:text-white hover:bg-white/10 rounded-xl h-10 w-10 shrink-0 touch-manipulation active:scale-[0.98]"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-[15px] font-semibold text-white truncate">
                Disconnection Certificate
              </h1>
            </div>
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/40 border border-white/[0.12] rounded px-1.5 py-0.5 shrink-0">
              BS 7671
            </span>
          </div>
        </div>
      </div>

      {/* ELE-1037 — lock / version bar */}
      <div className="mx-auto w-full max-w-5xl">
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
      </div>

      <motion.main
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={cn(
          'px-4 sm:px-6 pt-5 pb-28 mx-auto w-full max-w-5xl space-y-7',
          isLocked && 'pointer-events-none select-none opacity-95'
        )}
        aria-disabled={isLocked || undefined}
      >
        {/* Intro */}
        <motion.div variants={itemVariants}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-elec-yellow/90">
            Electrical Disconnection
          </p>
          <p className="text-[12.5px] text-white/55 mt-1.5 leading-relaxed">
            A record confirming a circuit or appliance has been safely disconnected and made dead.
            For disconnections only — no live testing is carried out, so this is not a Minor Works
            certificate.
          </p>
        </motion.div>

        {/* Reference */}
        <motion.section variants={itemVariants}>
          <SectionHeader title="Reference" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Record No.">
              <Input
                value={data.referenceNumber}
                onChange={(e) => update('referenceNumber', e.target.value)}
                className={cn(inputCn, 'font-mono')}
              />
            </Field>
            <Field label="Date of Work">
              <Input
                type="date"
                value={data.workDate}
                onChange={(e) => update('workDate', e.target.value)}
                className={inputCn}
              />
            </Field>
          </div>
        </motion.section>

        {/* Contractor — autofilled from your company profile */}
        <motion.section variants={itemVariants}>
          <SectionHeader title="Contractor" hint="from your profile" />
          <div className="space-y-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
        </motion.section>

        {/* Client — pick a saved customer to autofill */}
        <motion.section variants={itemVariants}>
          <SectionHeader title="Client" hint="pick to autofill" />
          <div className="mb-3">
            <ClientSelector
              onSelectCustomer={handleSelectCustomer}
              selectedCustomerId={data.selectedCustomerId || undefined}
            />
          </div>
          <div className="space-y-3">
            <Field label="Name">
              <Input
                value={data.clientName}
                onChange={(e) => update('clientName', e.target.value)}
                className={inputCn}
                placeholder="Client name"
              />
            </Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
            <Field label="Installation Address">
              <Input
                value={data.installationAddress}
                onChange={(e) => update('installationAddress', e.target.value)}
                className={inputCn}
                placeholder="Where the work was carried out"
              />
            </Field>
          </div>
        </motion.section>

        {/* Disconnection Details */}
        <motion.section variants={itemVariants}>
          <SectionHeader title="What was disconnected" />

          {/* Quick presets — one tap fills the common job */}
          <p className="text-[11px] font-medium text-white/45 mb-2 tracking-wide">Quick pick</p>
          <div className="flex flex-wrap gap-2 mb-4">
            {APPLIANCE_PRESETS.map((p) => (
              <Chip
                key={p.label}
                label={p.label}
                active={data.applianceDisconnected === p.appliance}
                onClick={() => applyAppliancePreset(p)}
              />
            ))}
          </div>

          <div className="space-y-3.5">
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
            <Field label="Appliance Disconnected">
              <Input
                value={data.applianceDisconnected}
                onChange={(e) => update('applianceDisconnected', e.target.value)}
                className={inputCn}
                placeholder="e.g. Electric cooker / 9.5kW shower"
              />
            </Field>
            <Field label="Circuit Disconnected">
              <Input
                value={data.circuitDisconnected}
                onChange={(e) => update('circuitDisconnected', e.target.value)}
                className={inputCn}
                placeholder="e.g. Cooker circuit, 32A from way 6"
              />
            </Field>

            <Field label="Reason for Disconnection">
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

            <Field label="Method of Isolation / Making Dead">
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
                  className="mt-2 text-[11.5px] font-medium text-elec-yellow/90 touch-manipulation"
                >
                  Use standard GS38 wording
                </button>
              )}
            </Field>
          </div>
        </motion.section>

        {/* Confirmation */}
        <motion.section variants={itemVariants}>
          <SectionHeader title="Safe isolation" hint={allConfirmed ? 'all confirmed' : undefined} />
          <button
            type="button"
            onClick={confirmAll}
            disabled={allConfirmed}
            className={cn(
              'w-full h-11 mb-2.5 rounded-lg text-[12.5px] font-semibold uppercase tracking-[0.1em] touch-manipulation transition-colors active:scale-[0.99]',
              allConfirmed
                ? 'bg-white/[0.03] border border-white/[0.06] text-white/30'
                : 'bg-elec-yellow/15 border border-elec-yellow/45 text-elec-yellow'
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
        </motion.section>

        {/* Photos */}
        <motion.section variants={itemVariants}>
          <SectionHeader
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
              className="h-12 rounded-lg border border-white/[0.12] bg-white/[0.04] flex items-center justify-center gap-2 text-[13px] font-medium text-white touch-manipulation active:scale-[0.98] disabled:opacity-50"
            >
              {isProcessingPhoto ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Camera className="h-4 w-4" />
              )}{' '}
              Take Photo
            </button>
            <button
              type="button"
              disabled={isProcessingPhoto}
              onClick={() => photoInputRef.current?.click()}
              className="h-12 rounded-lg border border-dashed border-white/[0.15] flex items-center justify-center gap-2 text-[13px] font-medium text-white/70 touch-manipulation active:scale-[0.98] disabled:opacity-50"
            >
              Upload
            </button>
          </div>
          {data.photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mt-3">
              {data.photos.map((photo, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden aspect-square">
                  <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                  <button
                    onClick={() =>
                      setData((prev) => ({
                        ...prev,
                        photos: prev.photos.filter((_, j) => j !== i),
                      }))
                    }
                    className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center touch-manipulation"
                  >
                    <X className="h-3.5 w-3.5 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </motion.section>

        {/* Declaration & Signatures */}
        <motion.section variants={itemVariants}>
          <SectionHeader title="Declaration" />
          <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3.5 mb-3.5">
            <p className="text-[12px] text-white/65 leading-relaxed">
              I confirm that the circuit / appliance described above has been safely disconnected
              and made dead in accordance with safe isolation practice (GS38). No live testing has
              been carried out as part of this disconnection.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-start">
            <SignatureInput
              label="Contractor Signature"
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
                  label="Client Signature"
                  value={data.clientSignature}
                  onChange={(sig) => update('clientSignature', sig || '')}
                />
              )}
            </div>
          </div>
        </motion.section>

        {/* Notes */}
        <motion.section variants={itemVariants}>
          <SectionHeader title="Notes" hint="optional" />
          <Textarea
            value={data.notes}
            onChange={(e) => update('notes', e.target.value)}
            className={textareaCn}
            placeholder="Additional notes..."
          />
        </motion.section>
      </motion.main>

      {/* Sticky action bar — always thumb-reachable, with live completion */}
      <div className="sticky bottom-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-t border-white/[0.08] px-4 sm:px-6 pt-2.5 pb-[calc(0.625rem+env(safe-area-inset-bottom))]">
        <div className="mx-auto w-full max-w-5xl">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[10px] uppercase tracking-[0.14em] text-white/45">
              {progress === 100 ? 'Ready to issue' : `${progress}% complete`}
            </span>
            <span className="text-[10px] font-medium text-white/70 tabular-nums">{progress}%</span>
          </div>
          <div className="h-1 bg-white/[0.1] rounded-full overflow-hidden mb-2.5">
            <div
              className="h-full bg-elec-yellow rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex gap-2.5">
            <Button
              variant="outline"
              className="h-12 px-4 text-[13px] font-medium touch-manipulation active:scale-[0.98] border-white/[0.12] text-white hover:bg-white/[0.06]"
              onClick={() => {
                storageSetJSONSync(DRAFT_KEY, data);
                toast.success('Draft saved');
              }}
            >
              Draft
            </Button>
            <Button
              className="flex-1 h-12 text-[13.5px] font-semibold touch-manipulation active:scale-[0.98] bg-elec-yellow text-black hover:bg-elec-yellow/90"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : existingReportId ? (
                'Update Certificate'
              ) : (
                'Generate PDF'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
