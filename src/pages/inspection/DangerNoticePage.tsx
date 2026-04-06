import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Camera, X, Plus, Trash2, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
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

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

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

const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';
const textareaCn = 'touch-manipulation text-base min-h-[100px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

const dangerTypes = [
  { key: 'riskOfFire' as const, label: 'Risk of Fire' },
  { key: 'riskOfElectricShock' as const, label: 'Risk of Electric Shock' },
  { key: 'riskOfBurns' as const, label: 'Risk of Burns' },
  { key: 'riskOfInjury' as const, label: 'Risk of Injury' },
  { key: 'riskOther' as const, label: 'Other' },
];

// --- Reusable components ---

const Section = ({ title, accentColor, children, badge }: { title: string; accentColor?: string; children: React.ReactNode; badge?: React.ReactNode }) => (
  <motion.section variants={itemVariants} className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3 flex items-center justify-between">
      <div>
        <div className={cn('h-[2px] w-full rounded-full bg-gradient-to-r mb-2', accentColor || 'from-red-500 via-rose-400 to-pink-400')} />
        <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
      </div>
      {badge}
    </div>
    {children}
  </motion.section>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>
    {children}
  </div>
);

const TickButton = ({ checked, label, color = 'red', onChange }: { checked: boolean; label: string; color?: 'red' | 'amber'; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={cn(
      'w-full flex items-center gap-3 p-3.5 rounded-xl border text-left touch-manipulation active:scale-[0.98] transition-all',
      checked
        ? color === 'red' ? 'bg-red-500/10 border-red-500/25' : 'bg-amber-500/10 border-amber-500/25'
        : 'bg-white/[0.03] border-white/[0.06]'
    )}
  >
    <div className={cn(
      'w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0',
      checked
        ? color === 'red' ? 'bg-red-500 border-red-500' : 'bg-amber-500 border-amber-500 text-black'
        : 'border-white/30'
    )}>
      {checked && (
        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </div>
    <span className={cn('text-sm font-medium', checked ? color === 'red' ? 'text-red-400' : 'text-amber-400' : 'text-white')}>{label}</span>
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
        updateDanger(dangerId, 'photos', [...(data.dangers.find((d) => d.id === dangerId)?.photos || []), reader.result as string]);
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
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20">
                <Zap className="h-4 w-4 text-red-400" />
              </div>
              <h1 className="text-base font-semibold text-white">Danger Notice</h1>
            </div>
          </div>
        </div>
      </div>

      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-4 max-w-3xl mx-auto">

        {/* Warning banner */}
        <motion.div variants={itemVariants} className="relative rounded-2xl border border-red-500/20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-red-500 via-rose-400 to-pink-400" />
          <div className="p-4">
            <p className="text-sm font-bold text-red-400">ELECTRICAL DANGER NOTIFICATION</p>
            <p className="text-xs text-white mt-1">C1 — Danger Present. This notice advises the responsible person of dangerous condition(s) requiring urgent remedial action.</p>
          </div>
        </motion.div>

        {/* Linked EICR */}
        {data.linkedEicrCertNumber && (
          <motion.div variants={itemVariants} className="rounded-xl bg-blue-500/8 border border-blue-500/20 px-4 py-3 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-blue-400 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-white">Linked to EICR</p>
              <p className="text-sm font-semibold text-blue-400">{data.linkedEicrCertNumber}</p>
            </div>
          </motion.div>
        )}

        {/* Reference */}
        <Section title="Reference" accentColor="from-white/20 to-white/5">
          <Field label="Record No."><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date"><Input type="date" value={data.date} onChange={(e) => update('date', e.target.value)} className={cn(inputCn, '[color-scheme:dark]')} /></Field>
            <Field label="Time"><Input type="time" value={data.time} onChange={(e) => update('time', e.target.value)} className={cn(inputCn, '[color-scheme:dark]')} /></Field>
          </div>
        </Section>

        {/* Contractor */}
        <Section title="Contractor / Installer" accentColor="from-elec-yellow/40 to-amber-400/20">
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
        </Section>

        {/* Client */}
        <Section title="Client / Responsible Person" accentColor="from-blue-500/40 to-cyan-400/20">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name" required><Input value={data.clientName} onChange={(e) => update('clientName', e.target.value)} className={inputCn} /></Field>
            <Field label="Position"><Input value={data.clientPosition} onChange={(e) => update('clientPosition', e.target.value)} className={inputCn} placeholder="Homeowner, Landlord..." /></Field>
          </div>
          <Field label="Address"><Input value={data.clientAddress} onChange={(e) => update('clientAddress', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone"><Input type="tel" value={data.clientPhone} onChange={(e) => update('clientPhone', e.target.value)} className={inputCn} /></Field>
            <Field label="Email"><Input type="email" value={data.clientEmail} onChange={(e) => update('clientEmail', e.target.value)} className={inputCn} /></Field>
          </div>
        </Section>

        {/* Installation Address */}
        <Section title="Installation Address" accentColor="from-violet-500/40 to-purple-400/20">
          <TickButton checked={data.installationAddressDifferent} label="Different from client address" color="amber" onChange={() => update('installationAddressDifferent', !data.installationAddressDifferent)} />
          {data.installationAddressDifferent ? (
            <>
              <Field label="Address"><Textarea value={data.installationAddress} onChange={(e) => update('installationAddress', e.target.value)} className="touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500" /></Field>
              <Field label="Postcode"><Input value={data.installationPostcode} onChange={(e) => update('installationPostcode', e.target.value)} className={inputCn} /></Field>
            </>
          ) : (
            <p className="text-xs text-white">Same as client address</p>
          )}
        </Section>

        {/* Dangerous Conditions — repeatable */}
        {data.dangers.map((danger, idx) => (
          <Section
            key={danger.id}
            title={`Dangerous Condition ${data.dangers.length > 1 ? `#${idx + 1}` : ''}`}
            accentColor="from-red-500/60 to-rose-400/30"
            badge={
              data.dangers.length > 1 ? (
                <button onClick={() => removeDanger(danger.id)} className="h-8 w-8 rounded-lg flex items-center justify-center text-white hover:text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation">
                  <Trash2 className="h-4 w-4" />
                </button>
              ) : undefined
            }
          >
            <Field label="Description of Danger" required>
              <Textarea value={danger.descriptionOfDanger} onChange={(e) => updateDanger(danger.id, 'descriptionOfDanger', e.target.value)} className={textareaCn} placeholder="Describe the dangerous condition..." />
            </Field>
            <Field label="Location Within Installation">
              <Input value={danger.locationWithinInstallation} onChange={(e) => updateDanger(danger.id, 'locationWithinInstallation', e.target.value)} className={inputCn} placeholder="e.g. Consumer unit, kitchen ring" />
            </Field>
            <Field label="BS 7671 Regulation Reference">
              <Input value={danger.regulationRef} onChange={(e) => updateDanger(danger.id, 'regulationRef', e.target.value)} className={inputCn} placeholder="e.g. 411.3.3, 543.1.1" />
            </Field>

            {/* Type of Danger */}
            <div className="space-y-2">
              <Label className="text-white text-xs">Type of Danger</Label>
              {dangerTypes.map((dt) => (
                <TickButton key={dt.key} checked={danger[dt.key] as boolean} label={dt.label} onChange={() => updateDanger(danger.id, dt.key, !danger[dt.key])} />
              ))}
              {danger.riskOther && (
                <div className="pl-8">
                  <Input value={danger.riskOtherDescription} onChange={(e) => updateDanger(danger.id, 'riskOtherDescription', e.target.value)} className={inputCn} placeholder="Describe other danger..." />
                </div>
              )}
            </div>

            {/* Action */}
            <Field label="Immediate Action Taken">
              <Textarea value={danger.immediateActionTaken} onChange={(e) => updateDanger(danger.id, 'immediateActionTaken', e.target.value)} className={textareaCn} placeholder="e.g. Circuit isolated, warning posted..." />
            </Field>
            <TickButton checked={danger.circuitIsolated} label="Circuit / equipment isolated" color="amber" onChange={() => updateDanger(danger.id, 'circuitIsolated', !danger.circuitIsolated)} />
            {danger.circuitIsolated && (
              <Field label="Isolation Details">
                <Input value={danger.isolationDetails} onChange={(e) => updateDanger(danger.id, 'isolationDetails', e.target.value)} className={inputCn} placeholder="e.g. MCB 5, DB1" />
              </Field>
            )}
            <Field label="Urgent Remedial Action Required">
              <Textarea value={danger.remedialActionRequired} onChange={(e) => updateDanger(danger.id, 'remedialActionRequired', e.target.value)} className={textareaCn} placeholder="What must be done urgently..." />
            </Field>

            {/* Photos */}
            <div className="space-y-3">
              <Label className="text-white text-xs">Photo Evidence</Label>
              <input
                ref={(el) => { photoInputRefs.current[danger.id] = el; }}
                type="file" accept="image/*" capture="environment" multiple className="hidden"
                onChange={(e) => handlePhotoCapture(danger.id, e)}
              />
              <button
                onClick={() => photoInputRefs.current[danger.id]?.click()}
                className="w-full h-12 rounded-xl border-2 border-dashed border-white/[0.15] flex items-center justify-center gap-2.5 text-sm text-white touch-manipulation active:scale-[0.98] hover:border-white/[0.25] transition-colors"
              >
                <Camera className="h-4 w-4" />
                Add Photos
              </button>
              {danger.photos.length > 0 && (
                <div className="grid grid-cols-3 gap-2">
                  {danger.photos.map((photo, i) => (
                    <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                      <img src={photo} alt={`Evidence ${i + 1}`} className="w-full h-full object-cover" />
                      <button onClick={() => removePhoto(danger.id, i)} className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center touch-manipulation">
                        <X className="h-3.5 w-3.5 text-white" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </Section>
        ))}

        {/* Add another danger */}
        <motion.div variants={itemVariants}>
          <button
            onClick={addDanger}
            className="w-full h-12 rounded-2xl border-2 border-dashed border-red-500/20 flex items-center justify-center gap-2.5 text-sm font-medium text-red-400 touch-manipulation active:scale-[0.98] hover:border-red-500/30 hover:bg-red-500/5 transition-all"
          >
            <Plus className="h-4 w-4" />
            Add Another Dangerous Condition
          </button>
        </motion.div>

        {/* Contractor Declaration */}
        <Section title="Contractor Declaration" accentColor="from-elec-yellow/40 to-amber-400/20">
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5">
            <p className="text-xs text-white leading-relaxed">{data.declarationText}</p>
          </div>
          <SignatureInput label="Contractor Signature *" value={data.contractorSignature} onChange={(sig) => update('contractorSignature', sig || '')} />
        </Section>

        {/* Client Acknowledgement */}
        <Section title="Client Acknowledgement" accentColor="from-emerald-500/40 to-green-400/20">
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5">
            <p className="text-xs text-white leading-relaxed">{data.acknowledgementText}</p>
          </div>
          <TickButton checked={data.clientRefusedToSign} label="Client refused to sign" onChange={() => update('clientRefusedToSign', !data.clientRefusedToSign)} />
          {!data.clientRefusedToSign && (
            <SignatureInput label="Client / Responsible Person Signature" value={data.clientSignature} onChange={(sig) => update('clientSignature', sig || '')} />
          )}
          {data.clientRefusedToSign && (
            <div className="rounded-xl bg-red-500/8 border border-red-500/20 p-4 space-y-4">
              <p className="text-xs text-red-400 font-semibold">Witness required when client refuses to sign</p>
              <Field label="Witness Name"><Input value={data.witnessName} onChange={(e) => update('witnessName', e.target.value)} className={inputCn} /></Field>
              <SignatureInput label="Witness Signature" value={data.witnessSignature} onChange={(sig) => update('witnessSignature', sig || '')} />
            </div>
          )}
        </Section>

        {/* Actions */}
        <motion.div variants={itemVariants} className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 h-12 text-sm font-medium touch-manipulation active:scale-[0.98] border-white/[0.08] text-white hover:bg-white/[0.06]" onClick={() => { storageSetJSONSync(DRAFT_KEY, data); toast.success('Draft saved'); }}>
            Save Draft
          </Button>
          <Button className="flex-1 h-12 text-sm font-medium touch-manipulation active:scale-[0.98] bg-red-500 text-white hover:bg-red-600" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Saving...</> : existingReportId ? 'Update Notice' : 'Issue Notice'}
          </Button>
        </motion.div>
      </motion.main>
    </div>
  );
}
