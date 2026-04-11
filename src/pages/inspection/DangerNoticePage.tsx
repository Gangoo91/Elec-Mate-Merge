import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Loader2, Trash2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import SignatureInput from '@/components/signature/SignatureInput';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';
import { reportCloud } from '@/utils/reportCloud';
import { formatDangerNoticePayload } from '@/utils/danger-notice-formatter';

// --- Constants ---

const inputCn = '!h-10 !py-1 !text-xs touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const textareaCn = 'touch-manipulation text-xs min-h-[70px] bg-white/[0.06] border-white/[0.08] text-white';

const dangerTypes = [
  { key: 'riskOfFire' as const, label: 'Fire' },
  { key: 'riskOfElectricShock' as const, label: 'Shock' },
  { key: 'riskOfBurns' as const, label: 'Burns' },
  { key: 'riskOfInjury' as const, label: 'Injury' },
  { key: 'riskOther' as const, label: 'Other' },
];

// --- Types ---

interface DangerEntry {
  id: string;
  descriptionOfDanger: string;
  locationWithinInstallation: string;
  regulationRef: string;
  riskOfFire: boolean;
  riskOfElectricShock: boolean;
  riskOfBurns: boolean;
  riskOfInjury: boolean;
  riskOther: boolean;
  riskOtherDescription: string;
  immediateActionTaken: string;
  remedialActionRequired: string;
  circuitIsolated: boolean;
  isolationDetails: string;
  photos: string[];
}

interface DangerNoticeData {
  referenceNumber: string;
  date: string;
  time: string;
  linkedEicrId: string;
  linkedEicrCertNumber: string;
  contractorName: string;
  contractorCompany: string;
  contractorAddress: string;
  contractorPhone: string;
  contractorEmail: string;
  registrationScheme: string;
  registrationNumber: string;
  clientName: string;
  clientPosition: string;
  clientAddress: string;
  clientPhone: string;
  clientEmail: string;
  installationAddressDifferent: boolean;
  installationAddress: string;
  installationPostcode: string;
  dangers: DangerEntry[];
  declarationText: string;
  contractorSignature: string;
  acknowledgementText: string;
  clientSignature: string;
  clientRefusedToSign: boolean;
  witnessName: string;
  witnessSignature: string;
}

const newDangerEntry = (): DangerEntry => ({
  id: crypto.randomUUID(),
  descriptionOfDanger: '',
  locationWithinInstallation: '',
  regulationRef: '',
  riskOfFire: false,
  riskOfElectricShock: false,
  riskOfBurns: false,
  riskOfInjury: false,
  riskOther: false,
  riskOtherDescription: '',
  immediateActionTaken: '',
  remedialActionRequired: '',
  circuitIsolated: false,
  isolationDetails: '',
  photos: [],
});

const defaultData = (): DangerNoticeData => ({
  referenceNumber: `DN-${Date.now().toString(36).toUpperCase()}`,
  date: new Date().toISOString().split('T')[0],
  time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  linkedEicrId: '',
  linkedEicrCertNumber: '',
  contractorName: '',
  contractorCompany: '',
  contractorAddress: '',
  contractorPhone: '',
  contractorEmail: '',
  registrationScheme: '',
  registrationNumber: '',
  clientName: '',
  clientPosition: '',
  clientAddress: '',
  clientPhone: '',
  clientEmail: '',
  installationAddressDifferent: false,
  installationAddress: '',
  installationPostcode: '',
  dangers: [newDangerEntry()],
  declarationText: 'I hereby declare that the above observations constitute a dangerous condition in the electrical installation at the address shown above. The person(s) responsible for the safety of the electrical installation have been advised of the nature of the danger and the need for urgent remedial action.',
  contractorSignature: '',
  acknowledgementText: 'I acknowledge receipt of this Electrical Danger Notification and understand that urgent action is required to remove the danger identified above.',
  clientSignature: '',
  clientRefusedToSign: false,
  witnessName: '',
  witnessSignature: '',
});

const DRAFT_KEY = 'elec-mate-draft-danger-notice';

// --- Helper components (RED themed) ---

const SectionHeader = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-red-500/40 to-red-500/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[10px] font-semibold text-white uppercase tracking-wider shrink-0">{title}</p>
    <div className="h-px flex-1 bg-white/[0.06]" />
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>{children}</div>
);

const YesNoToggle = ({ value, onChange, yesLabel = 'Yes', noLabel = 'No' }: { value: boolean; onChange: (v: boolean) => void; yesLabel?: string; noLabel?: string }) => (
  <div className="flex gap-2">
    <button
      type="button"
      onClick={() => onChange(true)}
      className={cn(
        'flex-1 h-10 rounded-lg text-xs font-medium touch-manipulation transition-all',
        value ? 'bg-red-500/20 border border-red-500/40 text-red-400' : 'bg-white/[0.06] border border-white/[0.08] text-white'
      )}
    >{yesLabel}</button>
    <button
      type="button"
      onClick={() => onChange(false)}
      className={cn(
        'flex-1 h-10 rounded-lg text-xs font-medium touch-manipulation transition-all',
        !value ? 'bg-white/[0.06] border border-white/[0.08] text-white' : 'bg-white/[0.04] border border-white/[0.06] text-white/50'
      )}
    >{noLabel}</button>
  </div>
);

const DangerTickButton = ({ checked, label, onChange }: { checked: boolean; label: string; onChange: () => void }) => (
  <button type="button" onClick={onChange}
    className={cn('h-9 rounded-lg text-[11px] font-medium touch-manipulation transition-all w-full',
      checked ? 'bg-red-500/20 border border-red-500/40 text-red-400' : 'bg-white/[0.04] border border-white/[0.08] text-white')}>
    {label}
  </button>
);

// --- Main component ---

export default function DangerNoticePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const { id: editId } = useParams<{ id: string }>();
  const photoInputRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [existingReportId, setExistingReportId] = useState<string | null>(null);

  // EICR pre-fill — supports single observation OR multiple observations array
  const eicrState = location.state as {
    fromEicr?: boolean;
    eicrReportId?: string;
    eicrCertNumber?: string;
    clientName?: string;
    installationAddress?: string;
    clientPhone?: string;
    clientEmail?: string;
    // Single observation (from DefectObservationCard)
    observation?: {
      description?: string;
      item?: string;
      regulation?: string;
      recommendation?: string;
      photos?: string[];
    };
    // Multiple observations (from EICRSummary — all C1s)
    observations?: Array<{
      description?: string;
      item?: string;
      regulation?: string;
      recommendation?: string;
      photos?: string[];
    }>;
    inspectorName?: string;
    inspectorCompany?: string;
    inspectorPhone?: string;
    inspectorEmail?: string;
    inspectorRegistration?: string;
    inspectorScheme?: string;
  } | null;

  const [data, setData] = useState<DangerNoticeData>(() => {
    if (eicrState?.fromEicr) {
      const base = defaultData();

      // Build danger entries from observations
      let dangers: DangerEntry[] = [];

      // Multiple C1 observations from summary
      if (eicrState.observations && eicrState.observations.length > 0) {
        dangers = eicrState.observations.map((obs) => ({
          ...newDangerEntry(),
          descriptionOfDanger: obs.description || '',
          locationWithinInstallation: obs.item || '',
          regulationRef: obs.regulation || '',
          remedialActionRequired: obs.recommendation || '',
          photos: obs.photos || [],
        }));
      }
      // Single observation from individual card
      else if (eicrState.observation) {
        dangers = [{
          ...newDangerEntry(),
          descriptionOfDanger: eicrState.observation.description || '',
          locationWithinInstallation: eicrState.observation.item || '',
          regulationRef: eicrState.observation.regulation || '',
          remedialActionRequired: eicrState.observation.recommendation || '',
          photos: eicrState.observation.photos || [],
        }];
      }

      if (dangers.length === 0) dangers = [newDangerEntry()];

      return {
        ...base,
        linkedEicrId: eicrState.eicrReportId || '',
        linkedEicrCertNumber: eicrState.eicrCertNumber || '',
        clientName: eicrState.clientName || '',
        clientAddress: eicrState.installationAddress || '',
        clientPhone: eicrState.clientPhone || '',
        clientEmail: eicrState.clientEmail || '',
        contractorName: eicrState.inspectorName || '',
        contractorCompany: eicrState.inspectorCompany || '',
        contractorPhone: eicrState.inspectorPhone || '',
        contractorEmail: eicrState.inspectorEmail || '',
        registrationNumber: eicrState.inspectorRegistration || '',
        registrationScheme: eicrState.inspectorScheme || '',
        dangers,
      };
    }
    const saved = storageGetJSONSync<Partial<DangerNoticeData>>(DRAFT_KEY, null);
    return saved ? { ...defaultData(), ...saved } : defaultData();
  });

  // Load existing document if editing
  useEffect(() => {
    if (!editId) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const result = await reportCloud.getReportData(editId, user.id);
      if (result) {
        setData((prev) => ({ ...prev, ...(result as any) }));
        setExistingReportId(editId);
      }
    });
  }, [editId]);

  // Auto-save draft (only for new documents)
  useEffect(() => {
    if (editId) return;
    const timer = setTimeout(() => { storageSetJSONSync(DRAFT_KEY, data); }, 2000);
    return () => clearTimeout(timer);
  }, [data, editId]);

  // Pre-fill contractor from company profile
  useEffect(() => {
    if (eicrState?.fromEicr && data.contractorName) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: cpData } = await supabase.rpc('get_my_company_profile');
      const cp = Array.isArray(cpData) ? cpData[0] : cpData;
      if (cp && !data.contractorName) {
        setData((prev) => ({
          ...prev,
          contractorName: prev.contractorName || cp.inspector_name || cp.company_name || '',
          contractorCompany: prev.contractorCompany || cp.company_name || '',
          contractorPhone: prev.contractorPhone || cp.company_phone || '',
          contractorEmail: prev.contractorEmail || cp.company_email || '',
          contractorAddress: prev.contractorAddress || cp.company_address || '',
          registrationNumber: prev.registrationNumber || cp.registration_number || '',
          registrationScheme: prev.registrationScheme || cp.registration_scheme || '',
        }));
      }
    });
  }, []);

  const update = useCallback((field: keyof DangerNoticeData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateDanger = useCallback((id: string, field: keyof DangerEntry, value: any) => {
    setData((prev) => ({
      ...prev,
      dangers: prev.dangers.map((d) => d.id === id ? { ...d, [field]: value } : d),
    }));
  }, []);

  const addDanger = () => {
    setData((prev) => ({ ...prev, dangers: [...prev.dangers, newDangerEntry()] }));
  };

  const removeDanger = (id: string) => {
    if (data.dangers.length <= 1) { toast.error('At least one danger entry required'); return; }
    setData((prev) => ({ ...prev, dangers: prev.dangers.filter((d) => d.id !== id) }));
  };

  const handlePhotoCapture = (dangerId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    e.target.value = '';
    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = () => {
        // Compress to max 1000px wide, JPEG 75% — keeps PDFMonkey payload manageable
        const img = new Image();
        img.onload = () => {
          const MAX = 1000;
          const scale = img.width > MAX ? MAX / img.width : 1;
          const canvas = document.createElement('canvas');
          canvas.width = Math.round(img.width * scale);
          canvas.height = Math.round(img.height * scale);
          const ctx = canvas.getContext('2d');
          if (!ctx) return;
          ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
          const compressed = canvas.toDataURL('image/jpeg', 0.75);
          updateDanger(dangerId, 'photos', [...(data.dangers.find((d) => d.id === dangerId)?.photos || []), compressed]);
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (dangerId: string, photoIndex: number) => {
    const danger = data.dangers.find((d) => d.id === dangerId);
    if (!danger) return;
    updateDanger(dangerId, 'photos', danger.photos.filter((_, i) => i !== photoIndex));
  };

  const handleSave = async () => {
    const hasDescription = data.dangers.some((d) => d.descriptionOfDanger.trim());
    if (!hasDescription) { toast.error('Please describe at least one dangerous condition'); return; }
    if (!data.contractorSignature) { toast.error('Contractor signature required'); return; }

    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error('Please sign in'); setIsSaving(false); return; }

      // Save to Supabase
      if (existingReportId) {
        await reportCloud.updateReport(existingReportId, user.id, data as any);
      } else {
        const result = await reportCloud.createReport(user.id, 'danger-notice', data as any);
        if (!result.success) { toast.error('Failed to save'); setIsSaving(false); return; }
      }

      // Generate PDF
      toast.success('Saved — generating PDF...');
      const savedReportId = existingReportId || data.referenceNumber;
      try {
        const payload = formatDangerNoticePayload(data);
        const { data: pdfResult, error: pdfError } = await supabase.functions.invoke(
          'generate-danger-notice-pdf',
          { body: { formData: payload } }
        );

        if (pdfError) {
          console.error('PDF generation error:', pdfError);
          toast.error('Saved but PDF generation failed — you can retry later');
        } else if (pdfResult?.download_url) {
          // Save PDF permanently to Supabase Storage
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
              .update({ storage_path: storagePath, pdf_url: permanentPdfUrl, pdf_generated_at: new Date().toISOString() })
              .eq('report_id', savedReportId);
          } catch (storageErr) {
            console.warn('[DangerNotice] Permanent PDF storage failed, using temp URL:', storageErr);
            await supabase
              .from('reports')
              .update({ pdf_url: permanentPdfUrl, pdf_generated_at: new Date().toISOString() })
              .eq('report_id', savedReportId);
          }

          // Download/share via native-aware utility
          const { openOrDownloadPdf } = await import('@/utils/pdf-download');
          await openOrDownloadPdf(permanentPdfUrl, `Danger-Notice-${data.referenceNumber}.pdf`);
          toast.success('Danger notice issued');
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

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-background">
        <div className="px-2 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => navigate(-1)}
                className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.96]"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <h1 className="text-sm font-bold text-white leading-tight">Danger Notice</h1>
                {data.referenceNumber && <p className="text-[10px] text-white font-mono mt-0.5">{data.referenceNumber}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => { storageSetJSONSync(DRAFT_KEY, data); toast.success('Draft saved'); }}
                className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.96]"
              >
                <Save className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-red-500/40 via-red-500/20 to-transparent" />
      </div>

      <main className="px-3 py-4 pb-48 sm:px-4 sm:pb-8 space-y-5">

        {/* Warning banner */}
        <div className="relative rounded-lg border border-red-500/20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-red-500 via-rose-400 to-red-500/20" />
          <div className="p-3">
            <p className="text-xs font-bold text-red-400">ELECTRICAL DANGER NOTIFICATION</p>
            <p className="text-[10px] text-white mt-1 leading-relaxed">C1 — Danger Present. This notice advises the responsible person of dangerous condition(s) requiring urgent remedial action.</p>
          </div>
        </div>

        {/* Linked EICR */}
        {data.linkedEicrCertNumber && (
          <div className="rounded-lg bg-blue-500/[0.08] border border-blue-500/20 px-3 py-2.5 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-[10px] text-white">Linked to EICR</p>
              <p className="text-xs font-semibold text-blue-400">{data.linkedEicrCertNumber}</p>
            </div>
          </div>
        )}

        {/* Reference */}
        <div className="space-y-3">
          <SectionHeader title="Reference" />
          <Field label="Record No."><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date"><Input type="date" value={data.date} onChange={(e) => update('date', e.target.value)} className={inputCn} /></Field>
            <Field label="Time"><Input type="time" value={data.time} onChange={(e) => update('time', e.target.value)} className={inputCn} /></Field>
          </div>
        </div>

        {/* Contractor / Installer */}
        <div className="space-y-3">
          <SectionHeader title="Contractor / Installer" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name"><Input value={data.contractorName} onChange={(e) => update('contractorName', e.target.value)} className={inputCn} /></Field>
            <Field label="Company"><Input value={data.contractorCompany} onChange={(e) => update('contractorCompany', e.target.value)} className={inputCn} /></Field>
          </div>
          <Field label="Address"><Input value={data.contractorAddress} onChange={(e) => update('contractorAddress', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone"><Input type="tel" value={data.contractorPhone} onChange={(e) => update('contractorPhone', e.target.value)} className={inputCn} /></Field>
            <Field label="Email"><Input type="email" value={data.contractorEmail} onChange={(e) => update('contractorEmail', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Scheme"><Input value={data.registrationScheme} onChange={(e) => update('registrationScheme', e.target.value)} className={inputCn} placeholder="NICEIC, NAPIT..." /></Field>
            <Field label="Reg. No."><Input value={data.registrationNumber} onChange={(e) => update('registrationNumber', e.target.value)} className={inputCn} /></Field>
          </div>
        </div>

        {/* Client / Responsible Person */}
        <div className="space-y-3">
          <SectionHeader title="Client / Responsible Person" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name" required><Input value={data.clientName} onChange={(e) => update('clientName', e.target.value)} className={inputCn} /></Field>
            <Field label="Position"><Input value={data.clientPosition} onChange={(e) => update('clientPosition', e.target.value)} className={inputCn} placeholder="Homeowner, Landlord..." /></Field>
          </div>
          <Field label="Address"><Input value={data.clientAddress} onChange={(e) => update('clientAddress', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone"><Input type="tel" value={data.clientPhone} onChange={(e) => update('clientPhone', e.target.value)} className={inputCn} /></Field>
            <Field label="Email"><Input type="email" value={data.clientEmail} onChange={(e) => update('clientEmail', e.target.value)} className={inputCn} /></Field>
          </div>
        </div>

        {/* Installation Address */}
        <div className="space-y-3">
          <SectionHeader title="Installation Address" />
          <Field label="Different from client address">
            <YesNoToggle value={data.installationAddressDifferent} onChange={(v) => update('installationAddressDifferent', v)} />
          </Field>
          {data.installationAddressDifferent ? (
            <>
              <Field label="Address"><Textarea value={data.installationAddress} onChange={(e) => update('installationAddress', e.target.value)} className={textareaCn} /></Field>
              <Field label="Postcode"><Input value={data.installationPostcode} onChange={(e) => update('installationPostcode', e.target.value)} className={inputCn} /></Field>
            </>
          ) : (
            <p className="text-[10px] text-white">Same as client address</p>
          )}
        </div>

        {/* Dangerous Conditions — repeatable */}
        {data.dangers.map((danger, idx) => (
          <div key={danger.id} className="space-y-3">
            <div className="border-b border-white/[0.06] pb-1 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="h-[2px] flex-1 rounded-full bg-gradient-to-r from-red-500/60 to-red-500/10" />
                <div className="w-6 h-6 rounded-md bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                  <span className="text-[10px] font-bold text-red-400">{idx + 1}</span>
                </div>
                <h2 className="text-xs font-medium text-white uppercase tracking-wider">
                  Dangerous Condition{data.dangers.length > 1 ? ` #${idx + 1}` : ''}
                </h2>
              </div>
              {data.dangers.length > 1 && (
                <button
                  onClick={() => removeDanger(danger.id)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
            </div>

            <Field label="Description" required>
              <Textarea value={danger.descriptionOfDanger} onChange={(e) => updateDanger(danger.id, 'descriptionOfDanger', e.target.value)} className={textareaCn} placeholder="Describe the dangerous condition..." />
            </Field>

            <div className="grid grid-cols-2 gap-2">
              <Field label="Location">
                <Input value={danger.locationWithinInstallation} onChange={(e) => updateDanger(danger.id, 'locationWithinInstallation', e.target.value)} className={inputCn} placeholder="Consumer unit" />
              </Field>
              <Field label="Reg. Ref.">
                <Input value={danger.regulationRef} onChange={(e) => updateDanger(danger.id, 'regulationRef', e.target.value)} className={inputCn} placeholder="411.3.3" />
              </Field>
            </div>

            {/* Type of Danger */}
            <div className="space-y-2">
              <Sub title="Type of Danger" />
              <div className="grid grid-cols-3 gap-1.5">
                {dangerTypes.map((dt) => (
                  <DangerTickButton key={dt.key} checked={danger[dt.key] as boolean} label={dt.label} onChange={() => updateDanger(danger.id, dt.key, !danger[dt.key])} />
                ))}
              </div>
              {danger.riskOther && (
                <div className="pl-1">
                  <Input value={danger.riskOtherDescription} onChange={(e) => updateDanger(danger.id, 'riskOtherDescription', e.target.value)} className={inputCn} placeholder="Describe other danger..." />
                </div>
              )}
            </div>

            {/* Action */}
            <Field label="Action Taken">
              <Textarea value={danger.immediateActionTaken} onChange={(e) => updateDanger(danger.id, 'immediateActionTaken', e.target.value)} className={textareaCn} placeholder="Circuit isolated, warning posted..." />
            </Field>

            <div className="flex items-center justify-between">
              <Label className="text-white text-xs font-medium">Circuit isolated</Label>
              <div className="flex gap-1.5">
                {[true, false].map((v) => (
                  <button key={String(v)} type="button" onClick={() => updateDanger(danger.id, 'circuitIsolated', v)}
                    className={cn('w-11 h-7 rounded text-[10px] font-semibold touch-manipulation transition-all',
                      danger.circuitIsolated === v ? (v ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                    {v ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
            </div>
            {danger.circuitIsolated && (
              <Field label="Isolation Details">
                <Input value={danger.isolationDetails} onChange={(e) => updateDanger(danger.id, 'isolationDetails', e.target.value)} className={inputCn} placeholder="e.g. MCB 5, DB1" />
              </Field>
            )}

            <Field label="Remedial Action Required">
              <Textarea value={danger.remedialActionRequired} onChange={(e) => updateDanger(danger.id, 'remedialActionRequired', e.target.value)} className={textareaCn} placeholder="What must be done urgently..." />
            </Field>

            {/* Photos */}
            <div className="space-y-2">
              <Sub title="Photo Evidence" />
              <input
                ref={(el) => { photoInputRefs.current[danger.id] = el; }}
                type="file" accept="image/*" multiple className="hidden"
                onChange={(e) => handlePhotoCapture(danger.id, e)}
              />
              <button
                type="button"
                onClick={() => photoInputRefs.current[danger.id]?.click()}
                className="w-full h-10 rounded-lg border-2 border-dashed border-white/[0.12] text-xs text-white touch-manipulation active:scale-[0.98] hover:border-white/[0.20] transition-colors"
              >
                Add Photo
              </button>
              {danger.photos.length > 0 && (
                <div className="grid grid-cols-4 gap-1.5">
                  {danger.photos.map((photo, i) => (
                    <div key={i} className="relative rounded-lg overflow-hidden aspect-square">
                      <img src={photo} alt={`Evidence ${i + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(danger.id, i)}
                        className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center touch-manipulation"
                      >
                        <span className="text-white text-[10px] font-bold leading-none">x</span>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Add another danger */}
        <button
          type="button"
          onClick={addDanger}
          className="w-full h-10 rounded-lg border-2 border-dashed border-red-500/20 text-xs text-red-400 touch-manipulation active:scale-[0.98] hover:border-red-500/30 hover:bg-red-500/5 transition-all"
        >
          Add Danger
        </button>

        {/* Contractor Declaration */}
        <div className="space-y-3">
          <SectionHeader title="Contractor Declaration" />
          <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3">
            <p className="text-[10px] text-white leading-relaxed">{data.declarationText}</p>
          </div>
          <SignatureInput label="Contractor Signature *" value={data.contractorSignature} onChange={(sig) => update('contractorSignature', sig || '')} />
        </div>

        {/* Client Acknowledgement */}
        <div className="space-y-3">
          <SectionHeader title="Client Acknowledgement" />
          <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3">
            <p className="text-[10px] text-white leading-relaxed">{data.acknowledgementText}</p>
          </div>
          <Field label="Client refused to sign">
            <YesNoToggle value={data.clientRefusedToSign} onChange={(v) => update('clientRefusedToSign', v)} yesLabel="Refused" noLabel="Will Sign" />
          </Field>
          {!data.clientRefusedToSign && (
            <SignatureInput label="Client / Responsible Person Signature" value={data.clientSignature} onChange={(sig) => update('clientSignature', sig || '')} />
          )}
          {data.clientRefusedToSign && (
            <div className="rounded-lg bg-red-500/[0.08] border border-red-500/20 p-3 space-y-3">
              <p className="text-[10px] text-red-400 font-semibold">Witness required when client refuses to sign</p>
              <Field label="Witness Name"><Input value={data.witnessName} onChange={(e) => update('witnessName', e.target.value)} className={inputCn} /></Field>
              <SignatureInput label="Witness Signature" value={data.witnessSignature} onChange={(sig) => update('witnessSignature', sig || '')} />
            </div>
          )}
        </div>

        {/* Bottom actions */}
        <div className="space-y-2 pt-2">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="w-full h-11 rounded-lg bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-medium touch-manipulation active:scale-[0.98] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isSaving ? <><Loader2 className="h-4 w-4 animate-spin" />Saving...</> : existingReportId ? 'Update & Generate' : 'Generate & Save'}
          </button>
          <button
            type="button"
            onClick={() => { storageSetJSONSync(DRAFT_KEY, data); toast.success('Draft saved'); }}
            className="w-full h-11 rounded-lg border border-white/[0.12] text-white text-xs font-medium touch-manipulation active:scale-[0.98] transition-all"
          >
            Save Draft
          </button>
        </div>
      </main>
    </div>
  );
}
