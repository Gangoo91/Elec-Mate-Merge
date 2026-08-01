import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
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
import { formatIsolationCertPayload } from '@/utils/isolation-cert-formatter';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

// --- Types ---

interface IsolationData {
  referenceNumber: string;
  date: string;
  time: string;
  // Contractor
  contractorName: string;
  contractorCompany: string;
  contractorPhone: string;
  contractorEmail: string;
  registrationScheme: string;
  registrationNumber: string;
  // Site
  siteName: string;
  siteAddress: string;
  siteContactName: string;
  siteContactPhone: string;
  // Equipment
  equipmentDescription: string;
  circuitReference: string;
  locationWithinInstallation: string;
  distributionBoardRef: string;
  // Isolation
  isolationPoints: string;
  methodMcbOff: boolean;
  methodFuseRemoved: boolean;
  methodIsolatorLocked: boolean;
  methodSupplyDisconnected: boolean;
  methodOther: boolean;
  methodOtherDescription: string;
  lockTagNumber: string;
  warningNoticesPosted: boolean;
  // Purpose
  purposeOfWork: string;
  // Affected Systems
  affectedFireAlarm: boolean;
  affectedEmergencyLighting: boolean;
  affectedSecurity: boolean;
  affectedIT: boolean;
  affectedLifts: boolean;
  affectedOther: boolean;
  affectedOtherDescription: string;
  // Proving Dead
  testerMake: string;
  testerModel: string;
  testerSerialNumber: string;
  provingUnitMake: string;
  provingUnitModel: string;
  proveTestProveConfirmed: boolean;
  confirmedDead: boolean;
  // Isolation Sign-On
  dateIsolated: string;
  timeIsolated: string;
  personIsolatingName: string;
  personIsolatingSignature: string;
  personReceivingName: string;
  personReceivingPosition: string;
  personReceivingSignature: string;
  // De-Isolation
  dateDeisolated: string;
  timeDeisolated: string;
  workCompleted: boolean;
  allPersonsClear: boolean;
  personDeisolatingName: string;
  personDeisolatingSignature: string;
  personAuthorisingName: string;
  personAuthorisingSignature: string;
  // Photos
  photos: string[];
  // Notes
  notes: string;
}

const defaultData = (): IsolationData => ({
  referenceNumber: `ISO-${Date.now().toString(36).toUpperCase()}`,
  date: new Date().toISOString().split('T')[0],
  time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  contractorName: '',
  contractorCompany: '',
  contractorPhone: '',
  contractorEmail: '',
  registrationScheme: '',
  registrationNumber: '',
  siteName: '',
  siteAddress: '',
  siteContactName: '',
  siteContactPhone: '',
  equipmentDescription: '',
  circuitReference: '',
  locationWithinInstallation: '',
  distributionBoardRef: '',
  isolationPoints: '',
  methodMcbOff: false,
  methodFuseRemoved: false,
  methodIsolatorLocked: false,
  methodSupplyDisconnected: false,
  methodOther: false,
  methodOtherDescription: '',
  lockTagNumber: '',
  warningNoticesPosted: false,
  purposeOfWork: '',
  affectedFireAlarm: false,
  affectedEmergencyLighting: false,
  affectedSecurity: false,
  affectedIT: false,
  affectedLifts: false,
  affectedOther: false,
  affectedOtherDescription: '',
  testerMake: '',
  testerModel: '',
  testerSerialNumber: '',
  provingUnitMake: '',
  provingUnitModel: '',
  proveTestProveConfirmed: false,
  confirmedDead: false,
  dateIsolated: new Date().toISOString().split('T')[0],
  timeIsolated: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  personIsolatingName: '',
  personIsolatingSignature: '',
  personReceivingName: '',
  personReceivingPosition: '',
  personReceivingSignature: '',
  dateDeisolated: '',
  timeDeisolated: '',
  workCompleted: false,
  allPersonsClear: false,
  personDeisolatingName: '',
  personDeisolatingSignature: '',
  personAuthorisingName: '',
  personAuthorisingSignature: '',
  photos: [],
  notes: '',
});

const DRAFT_KEY = 'elec-mate-draft-isolation-cert';

const inputCn = 'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';
const textareaCn = 'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';
const dateTimeCn = 'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

// --- Reusable components ---

const Section = ({ title, children, className }: { title: string; children: React.ReactNode; className?: string }) => (
  <motion.section variants={itemVariants} className={cn('-mx-4 rounded-none border-y border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] sm:mx-0 sm:rounded-2xl sm:border-x p-4 sm:p-5 space-y-4', className)}>
    <h2 className="text-[15px] font-semibold tracking-tight text-white">{title}</h2>
    {children}
  </motion.section>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div>
    <Label className="text-[12px] font-medium text-white mb-1 block">{label}{required && ' *'}</Label>
    {children}
  </div>
);

const TickButton = ({ checked, label, onChange }: { checked: boolean; label: string; onChange: () => void }) => (
  <button onClick={onChange} className={cn('w-full flex items-center gap-3 p-3.5 rounded-xl border text-left touch-manipulation active:scale-[0.98] transition-all', checked ? 'bg-elec-yellow border-elec-yellow' : 'bg-white/[0.06] border-white/[0.1]')}>
    <div className={cn('w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0', checked ? 'border-black/70' : 'border-white/30')}>
      {checked && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
    </div>
    <span className={cn('text-sm', checked ? 'font-semibold text-black' : 'font-medium text-white')}>{label}</span>
  </button>
);

// --- Main component ---

export default function IsolationCertificatePage() {
  const navigate = useNavigate();
  const { id: editId } = useParams<{ id: string }>();
  const [isSaving, setIsSaving] = useState(false);
  const [existingReportId, setExistingReportId] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<IsolationData>(() => {
    const saved = storageGetJSONSync<Partial<IsolationData>>(DRAFT_KEY, null);
    return saved ? { ...defaultData(), ...saved } : defaultData();
  });

  // Load existing document
  useEffect(() => {
    if (!editId) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const result = await reportCloud.getReportData(editId, user.id);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (result) { setData((prev) => ({ ...prev, ...(result as any) })); setExistingReportId(editId); }
    });
  }, [editId]);

  // Auto-save draft
  useEffect(() => {
    if (editId) return;
    const timer = setTimeout(() => { storageSetJSONSync(DRAFT_KEY, data); }, 2000);
    return () => clearTimeout(timer);
  }, [data, editId]);

  // Pre-fill contractor from company profile
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
          registrationNumber: prev.registrationNumber || cp.registration_number || '',
          registrationScheme: prev.registrationScheme || cp.registration_scheme || '',
          personIsolatingName: prev.personIsolatingName || cp.inspector_name || '',
        }));
      }
    });
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update = useCallback((field: keyof IsolationData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    e.target.value = '';
    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = () => {
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
          setData((prev) => ({ ...prev, photos: [...prev.photos, compressed] }));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = (index: number) => {
    setData((prev) => ({ ...prev, photos: prev.photos.filter((_, i) => i !== index) }));
  };

  const handleSave = async () => {
    if (!data.equipmentDescription) { toast.error('Please describe the equipment'); return; }
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error('Please sign in'); setIsSaving(false); return; }

      // Save to Supabase
      const savedReportId = existingReportId || data.referenceNumber;
      if (existingReportId) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await reportCloud.updateReport(existingReportId, user.id, data as any);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await reportCloud.createReport(user.id, 'isolation-cert', data as any);
        if (!result.success) { toast.error('Failed to save'); setIsSaving(false); return; }
      }

      // Generate PDF
      toast.success('Saved — generating PDF...');
      try {
        const payload = formatIsolationCertPayload(data);
        const { data: pdfResult, error: pdfError } = await supabase.functions.invoke(
          'generate-isolation-cert-pdf',
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
              pdfResult.download_url, user.id, savedReportId, data.referenceNumber
            );
            permanentPdfUrl = permanentUrl;
            await supabase.from('reports').update({ storage_path: storagePath, pdf_url: permanentPdfUrl, pdf_generated_at: new Date().toISOString() }).eq('report_id', savedReportId);
          } catch (storageErr) {
            console.warn('[IsolationCert] Permanent PDF storage failed:', storageErr);
            await supabase.from('reports').update({ pdf_url: permanentPdfUrl, pdf_generated_at: new Date().toISOString() }).eq('report_id', savedReportId);
          }

          const { openOrDownloadPdf } = await import('@/utils/pdf-download');
          await openOrDownloadPdf(permanentPdfUrl, `Isolation-Certificate-${data.referenceNumber}.pdf`);
          toast.success('Isolation certificate issued');
        }
      } catch (pdfErr) {
        console.error('PDF generation error:', pdfErr);
        toast.error('Saved but PDF generation failed');
      }

      storageRemoveSync(DRAFT_KEY);
      navigate(-1);
    } catch { toast.error('Failed to save'); } finally { setIsSaving(false); }
  };

  const isolationMethods = [
    { key: 'methodMcbOff' as const, label: 'MCB / RCBO switched off' },
    { key: 'methodFuseRemoved' as const, label: 'Fuse removed' },
    { key: 'methodIsolatorLocked' as const, label: 'Isolator locked off' },
    { key: 'methodSupplyDisconnected' as const, label: 'Supply disconnected' },
    { key: 'methodOther' as const, label: 'Other' },
  ];

  const affectedSystems = [
    { key: 'affectedFireAlarm' as const, label: 'Fire alarm system' },
    { key: 'affectedEmergencyLighting' as const, label: 'Emergency lighting' },
    { key: 'affectedSecurity' as const, label: 'Security / CCTV' },
    { key: 'affectedIT' as const, label: 'IT / Data / Comms' },
    { key: 'affectedLifts' as const, label: 'Lifts' },
    { key: 'affectedOther' as const, label: 'Other' },
  ];

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      {/* Header */}
      <div className="px-4 pt-3 pb-1 lg:px-8">
        <div className="mx-auto max-w-3xl lg:max-w-[1600px]">
          <button onClick={() => navigate(-1)} className="h-11 pr-2 text-[13px] font-semibold text-white/90 transition-colors hover:text-white touch-manipulation">Back</button>
          <div className="flex items-end justify-between gap-3">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-white sm:text-[28px]">Isolation Certificate</h1>
              <p className="mt-1 text-[13px] text-white/50"><span className="font-semibold text-elec-yellow">Safe isolation.</span> Confirms the circuit or equipment identified below has been safely isolated from all sources of supply — isolation, proving dead and issue by a competent, authorised person only.</p>
              <p className="mt-1 font-mono text-[12px] text-white/50">{data.referenceNumber}</p>
            </div>
          </div>
        </div>
      </div>

      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 mx-auto max-w-3xl lg:max-w-[1600px] lg:px-8 space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">

        {/* Reference */}
        <Section title="Reference">
          <Field label="Record No."><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Date"><Input type="date" value={data.date} onChange={(e) => update('date', e.target.value)} className={dateTimeCn} /></Field>
            <Field label="Time"><Input type="time" value={data.time} onChange={(e) => update('time', e.target.value)} className={dateTimeCn} /></Field>
          </div>
        </Section>

        {/* Contractor */}
        <Section title="Issued by">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Name"><Input value={data.contractorName} onChange={(e) => update('contractorName', e.target.value)} className={inputCn} /></Field>
            <Field label="Company"><Input value={data.contractorCompany} onChange={(e) => update('contractorCompany', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Phone"><Input type="tel" value={data.contractorPhone} onChange={(e) => update('contractorPhone', e.target.value)} className={inputCn} /></Field>
            <Field label="Email"><Input type="email" value={data.contractorEmail} onChange={(e) => update('contractorEmail', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Scheme"><Input value={data.registrationScheme} onChange={(e) => update('registrationScheme', e.target.value)} className={inputCn} placeholder="NICEIC, NAPIT..." /></Field>
            <Field label="Reg. No."><Input value={data.registrationNumber} onChange={(e) => update('registrationNumber', e.target.value)} className={inputCn} /></Field>
          </div>
        </Section>

        {/* Site Details */}
        <Section title="Site details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Site Name"><Input value={data.siteName} onChange={(e) => update('siteName', e.target.value)} className={inputCn} placeholder="e.g. ABC Offices" /></Field>
            <Field label="Contact on Site"><Input value={data.siteContactName} onChange={(e) => update('siteContactName', e.target.value)} className={inputCn} /></Field>
          </div>
          <Field label="Site Address"><Input value={data.siteAddress} onChange={(e) => update('siteAddress', e.target.value)} className={inputCn} /></Field>
          <Field label="Contact Phone"><Input type="tel" value={data.siteContactPhone} onChange={(e) => update('siteContactPhone', e.target.value)} className={inputCn} /></Field>
        </Section>

        {/* Equipment & Circuit */}
        <Section title="Equipment & circuit">
          <Field label="Equipment Description" required><Input value={data.equipmentDescription} onChange={(e) => update('equipmentDescription', e.target.value)} className={inputCn} placeholder="e.g. Distribution board DB3" /></Field>
          <Field label="Circuit Reference"><Input value={data.circuitReference} onChange={(e) => update('circuitReference', e.target.value)} className={inputCn} placeholder="e.g. Circuit 5 — kitchen ring final" /></Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Location"><Input value={data.locationWithinInstallation} onChange={(e) => update('locationWithinInstallation', e.target.value)} className={inputCn} placeholder="e.g. Plant room, Floor 2" /></Field>
            <Field label="DB Reference"><Input value={data.distributionBoardRef} onChange={(e) => update('distributionBoardRef', e.target.value)} className={inputCn} placeholder="e.g. DB3" /></Field>
          </div>
        </Section>

        {/* Isolation Details */}
        <Section title="Isolation details" className="lg:col-span-2">
          <Field label="Point(s) of Isolation"><Input value={data.isolationPoints} onChange={(e) => update('isolationPoints', e.target.value)} className={inputCn} placeholder="e.g. MCB 5, DB3" /></Field>
          <div className="space-y-2">
            <Label className="text-[12px] font-medium text-white mb-1 block">Method of Isolation</Label>
            {isolationMethods.map((m) => (
              <TickButton key={m.key} checked={data[m.key] as boolean} label={m.label} onChange={() => update(m.key, !data[m.key])} />
            ))}
            {data.methodOther && (
              <div className="pl-8"><Input value={data.methodOtherDescription} onChange={(e) => update('methodOtherDescription', e.target.value)} className={inputCn} placeholder="Describe method..." /></div>
            )}
          </div>
          <Field label="Lock / Tag Number"><Input value={data.lockTagNumber} onChange={(e) => update('lockTagNumber', e.target.value)} className={inputCn} placeholder="e.g. Padlock ref SP-042" /></Field>
          <TickButton checked={data.warningNoticesPosted} label="Warning notices posted at isolation point" onChange={() => update('warningNoticesPosted', !data.warningNoticesPosted)} />
        </Section>

        {/* Purpose of Work */}
        <Section title="Purpose of work" className="lg:col-span-2">
          <Field label="Description of work to be carried out">
            <Textarea value={data.purposeOfWork} onChange={(e) => update('purposeOfWork', e.target.value)} className={textareaCn} placeholder="Describe the work requiring isolation..." />
          </Field>
        </Section>

        {/* Affected Systems */}
        <Section title="Affected systems" className="lg:col-span-2">
          <p className="text-[12.5px] text-white/90 mb-2">The following systems may be affected by this isolation:</p>
          <div className="space-y-2">
            {affectedSystems.map((s) => (
              <TickButton key={s.key} checked={data[s.key] as boolean} label={s.label} onChange={() => update(s.key, !data[s.key])} />
            ))}
            {data.affectedOther && (
              <div className="pl-8"><Input value={data.affectedOtherDescription} onChange={(e) => update('affectedOtherDescription', e.target.value)} className={inputCn} placeholder="Describe other systems..." /></div>
            )}
          </div>
        </Section>

        {/* Proving Dead (GS 38) */}
        <Section title="Proving dead — GS 38" className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="Tester Make"><Input value={data.testerMake} onChange={(e) => update('testerMake', e.target.value)} className={inputCn} /></Field>
            <Field label="Model"><Input value={data.testerModel} onChange={(e) => update('testerModel', e.target.value)} className={inputCn} /></Field>
            <Field label="Serial No."><Input value={data.testerSerialNumber} onChange={(e) => update('testerSerialNumber', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Proving Unit Make"><Input value={data.provingUnitMake} onChange={(e) => update('provingUnitMake', e.target.value)} className={inputCn} /></Field>
            <Field label="Model"><Input value={data.provingUnitModel} onChange={(e) => update('provingUnitModel', e.target.value)} className={inputCn} /></Field>
          </div>
          <TickButton checked={data.proveTestProveConfirmed} label="Prove — Test — Prove procedure completed" onChange={() => update('proveTestProveConfirmed', !data.proveTestProveConfirmed)} />
          <TickButton checked={data.confirmedDead} label="Confirmed dead — safe to work" onChange={() => update('confirmedDead', !data.confirmedDead)} />
        </Section>

        {/* Isolation Sign-On */}
        <Section title="Isolation" className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Date Isolated"><Input type="date" value={data.dateIsolated} onChange={(e) => update('dateIsolated', e.target.value)} className={dateTimeCn} /></Field>
            <Field label="Time Isolated"><Input type="time" value={data.timeIsolated} onChange={(e) => update('timeIsolated', e.target.value)} className={dateTimeCn} /></Field>
          </div>
          <Field label="Person Isolating"><Input value={data.personIsolatingName} onChange={(e) => update('personIsolatingName', e.target.value)} className={inputCn} /></Field>
          <SignatureInput label="Person Isolating Signature" value={data.personIsolatingSignature} onChange={(sig) => update('personIsolatingSignature', sig || '')} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Person Receiving Isolation"><Input value={data.personReceivingName} onChange={(e) => update('personReceivingName', e.target.value)} className={inputCn} /></Field>
            <Field label="Position"><Input value={data.personReceivingPosition} onChange={(e) => update('personReceivingPosition', e.target.value)} className={inputCn} placeholder="e.g. Site Manager" /></Field>
          </div>
          <SignatureInput label="Person Receiving Signature" value={data.personReceivingSignature} onChange={(sig) => update('personReceivingSignature', sig || '')} />
        </Section>

        {/* De-Isolation / Handback */}
        <Section title="De-isolation / handback" className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Date"><Input type="date" value={data.dateDeisolated} onChange={(e) => update('dateDeisolated', e.target.value)} className={dateTimeCn} /></Field>
            <Field label="Time"><Input type="time" value={data.timeDeisolated} onChange={(e) => update('timeDeisolated', e.target.value)} className={dateTimeCn} /></Field>
          </div>
          <TickButton checked={data.workCompleted} label="All work completed" onChange={() => update('workCompleted', !data.workCompleted)} />
          <TickButton checked={data.allPersonsClear} label="All persons clear of equipment" onChange={() => update('allPersonsClear', !data.allPersonsClear)} />
          <Field label="Person De-Isolating"><Input value={data.personDeisolatingName} onChange={(e) => update('personDeisolatingName', e.target.value)} className={inputCn} /></Field>
          <SignatureInput label="Person De-Isolating Signature" value={data.personDeisolatingSignature} onChange={(sig) => update('personDeisolatingSignature', sig || '')} />
          <Field label="Person Authorising Re-Energisation"><Input value={data.personAuthorisingName} onChange={(e) => update('personAuthorisingName', e.target.value)} className={inputCn} /></Field>
          <SignatureInput label="Person Authorising Signature" value={data.personAuthorisingSignature} onChange={(sig) => update('personAuthorisingSignature', sig || '')} />
        </Section>

        {/* Photo Evidence */}
        <Section title="Photo evidence" className="lg:col-span-2">
          <input ref={photoInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoCapture} />
          <button onClick={() => photoInputRef.current?.click()} className="h-11 w-full rounded-xl border border-dashed border-white/[0.2] text-[13px] font-semibold text-white hover:border-white/[0.35] touch-manipulation active:scale-[0.98] transition-colors">
            Add photos
          </button>
          <p className="text-[12.5px] text-white/90">Photograph the isolation point, lock-off device, and warning notices</p>
          {data.photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {data.photos.map((photo, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                  <img src={photo} alt={`Evidence ${i + 1}`} className="w-full h-full object-cover" />
                  <button onClick={() => removePhoto(i)} className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-white text-base leading-none touch-manipulation" aria-label="Remove photo">
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Notes */}
        <Section title="Notes" className="lg:col-span-2">
          <Textarea value={data.notes} onChange={(e) => update('notes', e.target.value)} className={textareaCn} placeholder="Additional notes..." />
        </Section>

        {/* Actions */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3 pt-2 lg:col-span-2 lg:flex-row lg:justify-end">
          <Button variant="outline" className="h-12 w-full rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white hover:bg-white/[0.08] hover:text-white touch-manipulation lg:w-auto lg:px-8" onClick={() => { storageSetJSONSync(DRAFT_KEY, data); toast.success('Draft saved'); }}>
            Save Draft
          </Button>
          <Button className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black hover:bg-elec-yellow/90 active:scale-[0.99] touch-manipulation lg:w-auto lg:px-10" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Saving...</> : existingReportId ? 'Update Certificate' : 'Issue Certificate'}
          </Button>
        </motion.div>
      </motion.main>
    </div>
  );
}
