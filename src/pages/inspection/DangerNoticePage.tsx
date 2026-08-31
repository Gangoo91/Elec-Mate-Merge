import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
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
import { DangerNoticeSignoffCard } from '@/components/certificates/DangerNoticeSignoffCard';

/*
 * Page styling comes from the shared kit. These were local copies that had
 * drifted from every other Notices & Labels page — see components/forms/pageStyles.
 */
import { pageInputCn as inputCn, pageTextareaCn as textareaCn } from '@/components/forms/pageStyles';

import { PageHeader } from '@/components/forms/PageHeader';

// --- Constants ---

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

// --- Helper components ---

const Section = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <div className={cn('-mx-4 rounded-none border-y border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] sm:mx-0 sm:rounded-2xl sm:border-x p-4 sm:p-5 space-y-4', className)}>
    {children}
  </div>
);

const SectionHeading = ({ title }: { title: string }) => (
  <h2 className="text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const Sub = ({ title }: { title: string }) => (
  <p className="text-[13px] font-semibold text-white">{title}</p>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-[12px] font-medium text-white mb-1 block">{label}{required && ' *'}</Label>{children}</div>
);

const YesNoToggle = ({ value, onChange, yesLabel = 'Yes', noLabel = 'No', yesDanger }: { value: boolean; onChange: (v: boolean) => void; yesLabel?: string; noLabel?: string; yesDanger?: boolean }) => (
  <div className="flex gap-2">
    <button
      type="button"
      onClick={() => onChange(true)}
      className={cn(
        'flex-1 h-11 rounded-lg text-[13px] touch-manipulation transition-all',
        value
          ? yesDanger
            ? 'bg-red-500 border border-red-500 text-white font-semibold'
            : 'bg-elec-yellow border border-elec-yellow text-black font-semibold'
          : 'bg-white/[0.06] border border-white/[0.1] text-white font-medium'
      )}
    >{yesLabel}</button>
    <button
      type="button"
      onClick={() => onChange(false)}
      className={cn(
        'flex-1 h-11 rounded-lg text-[13px] touch-manipulation transition-all',
        !value ? 'bg-elec-yellow border border-elec-yellow text-black font-semibold' : 'bg-white/[0.06] border border-white/[0.1] text-white font-medium'
      )}
    >{noLabel}</button>
  </div>
);

const DangerTickButton = ({ checked, label, onChange }: { checked: boolean; label: string; onChange: () => void }) => (
  <button type="button" onClick={onChange}
    className={cn('h-11 rounded-lg text-[13px] touch-manipulation transition-all w-full',
      checked ? 'bg-red-500 border border-red-500 text-white font-semibold' : 'bg-white/[0.06] border border-white/[0.1] text-white font-medium')}>
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update = useCallback((field: keyof DangerNoticeData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await reportCloud.updateReport(existingReportId, user.id, data as any);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <PageHeader
        eyebrow="BS 7671"
        title="Danger Notice"
        lead="C1 — Danger present."
        leadTone="danger"
        description="Advises the responsible person of dangerous condition(s) requiring urgent remedial action."
        reference={data.referenceNumber}
        actions={
            <button
            onClick={() => { storageSetJSONSync(DRAFT_KEY, data); toast.success('Draft saved'); }}
            className="h-11 text-[13px] font-semibold text-white transition-opacity hover:opacity-80 touch-manipulation"
            >
            Save draft
            </button>
        }
      />


      <main className="mx-auto max-w-3xl lg:max-w-none xl:max-w-[1700px] px-4 lg:px-8 py-4 pb-48 sm:pb-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">

        {/* Linked EICR */}
        {data.linkedEicrCertNumber && (
          <div className="-mx-4 rounded-none border-y border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] sm:mx-0 sm:rounded-2xl sm:border-x px-4 py-3 lg:col-span-2">
            <p className="text-[12.5px] text-white">Linked to EICR</p>
            <p className="font-mono text-[13px] font-semibold text-white">{data.linkedEicrCertNumber}</p>
          </div>
        )}

        {/* Reference */}
        <Section>
          <SectionHeading title="Reference" />
          <Field label="Record No."><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Date"><Input type="date" value={data.date} onChange={(e) => update('date', e.target.value)} className={inputCn} /></Field>
            <Field label="Time"><Input type="time" value={data.time} onChange={(e) => update('time', e.target.value)} className={inputCn} /></Field>
          </div>
        </Section>

        {/* Contractor / installer */}
        <Section>
          <SectionHeading title="Contractor / installer" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Name"><Input value={data.contractorName} onChange={(e) => update('contractorName', e.target.value)} className={inputCn} /></Field>
            <Field label="Company"><Input value={data.contractorCompany} onChange={(e) => update('contractorCompany', e.target.value)} className={inputCn} /></Field>
          </div>
          <Field label="Address"><Input value={data.contractorAddress} onChange={(e) => update('contractorAddress', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Phone"><Input type="tel" value={data.contractorPhone} onChange={(e) => update('contractorPhone', e.target.value)} className={inputCn} /></Field>
            <Field label="Email"><Input type="email" value={data.contractorEmail} onChange={(e) => update('contractorEmail', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Scheme"><Input value={data.registrationScheme} onChange={(e) => update('registrationScheme', e.target.value)} className={inputCn} placeholder="NICEIC, NAPIT..." /></Field>
            <Field label="Reg. No."><Input value={data.registrationNumber} onChange={(e) => update('registrationNumber', e.target.value)} className={inputCn} /></Field>
          </div>
        </Section>

        {/* Client / responsible person */}
        <Section>
          <SectionHeading title="Client / responsible person" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Name" required><Input value={data.clientName} onChange={(e) => update('clientName', e.target.value)} className={inputCn} /></Field>
            <Field label="Position"><Input value={data.clientPosition} onChange={(e) => update('clientPosition', e.target.value)} className={inputCn} placeholder="Homeowner, Landlord..." /></Field>
          </div>
          <Field label="Address"><Input value={data.clientAddress} onChange={(e) => update('clientAddress', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Phone"><Input type="tel" value={data.clientPhone} onChange={(e) => update('clientPhone', e.target.value)} className={inputCn} /></Field>
            <Field label="Email"><Input type="email" value={data.clientEmail} onChange={(e) => update('clientEmail', e.target.value)} className={inputCn} /></Field>
          </div>
        </Section>

        {/* Installation address */}
        <Section>
          <SectionHeading title="Installation address" />
          <Field label="Different from client address">
            <YesNoToggle value={data.installationAddressDifferent} onChange={(v) => update('installationAddressDifferent', v)} />
          </Field>
          {data.installationAddressDifferent ? (
            <>
              <Field label="Address"><Textarea value={data.installationAddress} onChange={(e) => update('installationAddress', e.target.value)} className={textareaCn} /></Field>
              <Field label="Postcode"><Input value={data.installationPostcode} onChange={(e) => update('installationPostcode', e.target.value)} className={inputCn} /></Field>
            </>
          ) : (
            <p className="text-[12.5px] text-white">Same as client address</p>
          )}
        </Section>

        {/* Dangerous conditions — repeatable */}
        <Section className="lg:col-span-2">
          <SectionHeading title="Dangerous conditions" />
          {data.dangers.map((danger, idx) => (
          <div key={danger.id} className={cn('space-y-4', idx > 0 && 'border-t border-white/[0.08] pt-4')}>
            {data.dangers.length > 1 && (
              <div className="flex items-center justify-between gap-3">
                <p className="text-[13px] font-semibold text-white">{`Dangerous condition ${idx + 1}`}</p>
                <button
                  onClick={() => removeDanger(danger.id)}
                  className="h-11 px-2 text-[13px] font-semibold text-red-400 transition-colors hover:text-red-300 touch-manipulation"
                >
                  Remove
                </button>
              </div>
            )}

            <Field label="Description" required>
              <Textarea value={danger.descriptionOfDanger} onChange={(e) => updateDanger(danger.id, 'descriptionOfDanger', e.target.value)} className={textareaCn} placeholder="Describe the dangerous condition..." />
            </Field>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Location">
                <Input value={danger.locationWithinInstallation} onChange={(e) => updateDanger(danger.id, 'locationWithinInstallation', e.target.value)} className={inputCn} placeholder="Consumer unit" />
              </Field>
              <Field label="Reg. Ref.">
                <Input value={danger.regulationRef} onChange={(e) => updateDanger(danger.id, 'regulationRef', e.target.value)} className={inputCn} placeholder="411.3.3" />
              </Field>
            </div>

            {/* Type of danger */}
            <div className="space-y-2">
              <Sub title="Type of danger" />
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {dangerTypes.map((dt) => (
                  <DangerTickButton key={dt.key} checked={danger[dt.key] as boolean} label={dt.label} onChange={() => updateDanger(danger.id, dt.key, !danger[dt.key])} />
                ))}
              </div>
              {danger.riskOther && (
                <Input value={danger.riskOtherDescription} onChange={(e) => updateDanger(danger.id, 'riskOtherDescription', e.target.value)} className={inputCn} placeholder="Describe other danger..." />
              )}
            </div>

            {/* Action */}
            <Field label="Action Taken">
              <Textarea value={danger.immediateActionTaken} onChange={(e) => updateDanger(danger.id, 'immediateActionTaken', e.target.value)} className={textareaCn} placeholder="Circuit isolated, warning posted..." />
            </Field>

            <div className="flex items-center justify-between gap-3">
              <Label className="text-[13px] font-medium text-white">Circuit isolated</Label>
              <div className="flex gap-2">
                {[true, false].map((v) => (
                  <button key={String(v)} type="button" onClick={() => updateDanger(danger.id, 'circuitIsolated', v)}
                    className={cn('h-11 px-5 rounded-lg text-[13px] touch-manipulation transition-all',
                      danger.circuitIsolated === v ? 'bg-elec-yellow border border-elec-yellow text-black font-semibold' : 'bg-white/[0.06] border border-white/[0.1] text-white font-medium')}>
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
              <Sub title="Photo evidence" />
              <input
                ref={(el) => { photoInputRefs.current[danger.id] = el; }}
                type="file" accept="image/*" multiple className="hidden"
                onChange={(e) => handlePhotoCapture(danger.id, e)}
              />
              <button
                type="button"
                onClick={() => photoInputRefs.current[danger.id]?.click()}
                className="h-11 w-full rounded-xl border border-dashed border-white/[0.2] text-[13px] font-semibold text-white hover:border-white/[0.35] touch-manipulation active:scale-[0.99] transition-colors"
              >
                Add photo
              </button>
              {danger.photos.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {danger.photos.map((photo, i) => (
                    <div key={i} className="relative rounded-lg overflow-hidden aspect-square">
                      <img src={photo} alt={`Evidence ${i + 1}`} className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => removePhoto(danger.id, i)}
                        className="absolute top-1 right-1 flex h-8 w-8 items-center justify-center rounded-full bg-black/70 touch-manipulation"
                      >
                        <span className="text-[13px] font-semibold leading-none text-white">×</span>
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
            className="h-11 w-full rounded-xl border border-dashed border-white/[0.2] text-[13px] font-semibold text-white hover:border-white/[0.35] touch-manipulation active:scale-[0.99] transition-colors"
          >
            Add another danger
          </button>
        </Section>

        {/* Contractor declaration */}
        <Section className="lg:col-span-2">
          <SectionHeading title="Contractor declaration" />
          <p className="text-[12.5px] leading-relaxed text-white">{data.declarationText}</p>
          <SignatureInput label="Contractor Signature *" value={data.contractorSignature} onChange={(sig) => update('contractorSignature', sig || '')} />
        </Section>

        {/* Client acknowledgement */}
        <Section className="lg:col-span-2">
          <SectionHeading title="Client acknowledgement" />
          <p className="text-[12.5px] leading-relaxed text-white">{data.acknowledgementText}</p>
          <Field label="Client refused to sign">
            <YesNoToggle value={data.clientRefusedToSign} onChange={(v) => update('clientRefusedToSign', v)} yesLabel="Refused" noLabel="Will Sign" yesDanger />
          </Field>
          {!data.clientRefusedToSign && (
            <SignatureInput label="Client / Responsible Person Signature" value={data.clientSignature} onChange={(sig) => update('clientSignature', sig || '')} />
          )}
          {data.clientRefusedToSign && (
            <div className="border-t border-white/[0.06] pt-3 space-y-3">
              <p className="text-[12.5px] font-semibold text-red-400">Witness required when client refuses to sign</p>
              <Field label="Witness Name"><Input value={data.witnessName} onChange={(e) => update('witnessName', e.target.value)} className={inputCn} /></Field>
              <SignatureInput label="Witness Signature" value={data.witnessSignature} onChange={(sig) => update('witnessSignature', sig || '')} />
            </div>
          )}
        </Section>

        {/* Remote sign-off — email the dutyholder a signing link with read
            receipts and a 12h auto-refusal (ELE-1288/1289). Saved notices only. */}
        {existingReportId && (
          <div className="lg:col-span-2">
            <DangerNoticeSignoffCard
              reportRef={existingReportId}
              defaultEmail={data.clientEmail}
              defaultName={data.clientName}
            />
          </div>
        )}

        {/* Bottom actions */}
        <div className="flex flex-col gap-2 pt-2 lg:col-span-2 lg:flex-row-reverse lg:items-center lg:justify-start lg:gap-3">
          <button
            type="button"
            onClick={handleSave}
            disabled={isSaving}
            className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black hover:bg-elec-yellow/90 active:scale-[0.99] touch-manipulation transition-all disabled:bg-white/[0.08] disabled:text-white/70 flex items-center justify-center gap-2 lg:w-auto lg:px-10"
          >
            {isSaving ? <><Loader2 className="h-4 w-4 animate-spin" />Saving...</> : existingReportId ? 'Update & Generate' : 'Generate & Save'}
          </button>
          <button
            type="button"
            onClick={() => { storageSetJSONSync(DRAFT_KEY, data); toast.success('Draft saved'); }}
            className="h-12 w-full rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white hover:bg-white/[0.08] active:scale-[0.99] touch-manipulation transition-all lg:w-auto lg:px-8"
          >
            Save Draft
          </button>
        </div>
      </main>
    </div>
  );
}
