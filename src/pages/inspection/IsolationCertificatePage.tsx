import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Camera, X, Loader2 } from 'lucide-react';
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

const inputCn = 'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';
const textareaCn = 'touch-manipulation text-base min-h-[100px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

// --- Reusable components ---

const Section = ({ title, accentColor, children }: { title: string; accentColor?: string; children: React.ReactNode }) => (
  <motion.section variants={itemVariants}>
    <div className="relative rounded-2xl bg-white/[0.04] border border-white/[0.06] overflow-hidden">
      <div className={cn('absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r opacity-50', accentColor || 'from-amber-500 via-amber-400 to-yellow-400')} />
      <div className="px-4 pt-4 pb-1">
        <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
      </div>
      <div className="px-4 pb-4 space-y-4">{children}</div>
    </div>
  </motion.section>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div>
    <Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>
    {children}
  </div>
);

const TickButton = ({ checked, label, color = 'amber', onChange }: { checked: boolean; label: string; color?: 'amber' | 'emerald' | 'red' | 'blue'; onChange: () => void }) => {
  const colors = {
    amber: { bg: 'bg-amber-500/10 border-amber-500/25', check: 'bg-amber-500 border-amber-500 text-black', text: 'text-amber-400' },
    emerald: { bg: 'bg-emerald-500/10 border-emerald-500/25', check: 'bg-emerald-500 border-emerald-500', text: 'text-emerald-400' },
    red: { bg: 'bg-red-500/10 border-red-500/25', check: 'bg-red-500 border-red-500', text: 'text-red-400' },
    blue: { bg: 'bg-blue-500/10 border-blue-500/25', check: 'bg-blue-500 border-blue-500', text: 'text-blue-400' },
  };
  const c = colors[color];
  return (
    <button onClick={onChange} className={cn('w-full flex items-center gap-3 p-3.5 rounded-xl border text-left touch-manipulation active:scale-[0.98] transition-all', checked ? c.bg : 'bg-white/[0.03] border-white/[0.06]')}>
      <div className={cn('w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0', checked ? c.check : 'border-white/30')}>
        {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
      </div>
      <span className={cn('text-sm font-medium', checked ? c.text : 'text-white')}>{label}</span>
    </button>
  );
};

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
      if (result) { setData((prev) => ({ ...prev, ...(result as any) })); setExistingReportId(editId); }
    });
  }, [editId]);

  // Auto-save draft
  useEffect(() => {
    if (editId) return;
    const timer = setTimeout(() => { storageSetJSONSync(DRAFT_KEY, data); }, 2000);
    return () => clearTimeout(timer);
  }, [data, editId]);

  // Pre-fill contractor from profile
  useEffect(() => {
    if (data.contractorName) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: profile } = await supabase
        .from('profiles')
        .select('full_name, company_name, phone, email, registration_number, registration_scheme')
        .eq('id', user.id)
        .single();
      if (profile) {
        setData((prev) => ({
          ...prev,
          contractorName: prev.contractorName || profile.full_name || '',
          contractorCompany: prev.contractorCompany || profile.company_name || '',
          contractorPhone: prev.contractorPhone || profile.phone || '',
          contractorEmail: prev.contractorEmail || profile.email || '',
          registrationNumber: prev.registrationNumber || profile.registration_number || '',
          registrationScheme: prev.registrationScheme || profile.registration_scheme || '',
          personIsolatingName: prev.personIsolatingName || profile.full_name || '',
        }));
      }
    });
  }, []);

  const update = useCallback((field: keyof IsolationData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    e.target.value = '';
    for (const file of Array.from(files)) {
      const reader = new FileReader();
      reader.onload = () => { setData((prev) => ({ ...prev, photos: [...prev.photos, reader.result as string] })); };
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
        await reportCloud.updateReport(existingReportId, user.id, data as any);
      } else {
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
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
                <Zap className="h-4 w-4 text-amber-400" />
              </div>
              <h1 className="text-base font-semibold text-white">Isolation Certificate</h1>
            </div>
          </div>
        </div>
      </div>

      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-4 max-w-2xl mx-auto">

        {/* Banner */}
        <motion.div variants={itemVariants} className="relative rounded-2xl border border-amber-500/20 overflow-hidden">
          <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-amber-500 via-amber-400 to-yellow-400" />
          <div className="p-4">
            <p className="text-sm font-bold text-amber-400">ELECTRICAL ISOLATION CERTIFICATE</p>
            <p className="text-xs text-white mt-1">This certificate confirms that the electrical circuit or equipment identified below has been safely isolated from all sources of electrical supply. Only a competent, authorised person should carry out isolation, proving dead, and issuing this certificate.</p>
          </div>
        </motion.div>

        {/* Reference */}
        <Section title="Reference" accentColor="from-white/20 to-white/5">
          <Field label="Record No."><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date"><input type="date" value={data.date} onChange={(e) => update('date', e.target.value)} className={cn(inputCn, 'w-full rounded-md border px-3 appearance-none')} /></Field>
            <Field label="Time"><input type="time" value={data.time} onChange={(e) => update('time', e.target.value)} className={cn(inputCn, 'w-full rounded-md border px-3 appearance-none')} /></Field>
          </div>
        </Section>

        {/* Contractor */}
        <Section title="Issued By" accentColor="from-elec-yellow/40 to-amber-400/20">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name"><Input value={data.contractorName} onChange={(e) => update('contractorName', e.target.value)} className={inputCn} /></Field>
            <Field label="Company"><Input value={data.contractorCompany} onChange={(e) => update('contractorCompany', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone"><Input type="tel" value={data.contractorPhone} onChange={(e) => update('contractorPhone', e.target.value)} className={inputCn} /></Field>
            <Field label="Email"><Input type="email" value={data.contractorEmail} onChange={(e) => update('contractorEmail', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Scheme"><Input value={data.registrationScheme} onChange={(e) => update('registrationScheme', e.target.value)} className={inputCn} placeholder="NICEIC, NAPIT..." /></Field>
            <Field label="Reg. No."><Input value={data.registrationNumber} onChange={(e) => update('registrationNumber', e.target.value)} className={inputCn} /></Field>
          </div>
        </Section>

        {/* Site Details */}
        <Section title="Site Details" accentColor="from-blue-500/40 to-cyan-400/20">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Site Name"><Input value={data.siteName} onChange={(e) => update('siteName', e.target.value)} className={inputCn} placeholder="e.g. ABC Offices" /></Field>
            <Field label="Contact on Site"><Input value={data.siteContactName} onChange={(e) => update('siteContactName', e.target.value)} className={inputCn} /></Field>
          </div>
          <Field label="Site Address"><Input value={data.siteAddress} onChange={(e) => update('siteAddress', e.target.value)} className={inputCn} /></Field>
          <Field label="Contact Phone"><Input type="tel" value={data.siteContactPhone} onChange={(e) => update('siteContactPhone', e.target.value)} className={inputCn} /></Field>
        </Section>

        {/* Equipment & Circuit */}
        <Section title="Equipment & Circuit" accentColor="from-amber-500/40 to-yellow-400/20">
          <Field label="Equipment Description" required><Input value={data.equipmentDescription} onChange={(e) => update('equipmentDescription', e.target.value)} className={inputCn} placeholder="e.g. Distribution board DB3" /></Field>
          <Field label="Circuit Reference"><Input value={data.circuitReference} onChange={(e) => update('circuitReference', e.target.value)} className={inputCn} placeholder="e.g. Circuit 5 — kitchen ring final" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Location"><Input value={data.locationWithinInstallation} onChange={(e) => update('locationWithinInstallation', e.target.value)} className={inputCn} placeholder="e.g. Plant room, Floor 2" /></Field>
            <Field label="DB Reference"><Input value={data.distributionBoardRef} onChange={(e) => update('distributionBoardRef', e.target.value)} className={inputCn} placeholder="e.g. DB3" /></Field>
          </div>
        </Section>

        {/* Isolation Details */}
        <Section title="Isolation Details" accentColor="from-amber-500/60 to-orange-400/30">
          <Field label="Point(s) of Isolation"><Input value={data.isolationPoints} onChange={(e) => update('isolationPoints', e.target.value)} className={inputCn} placeholder="e.g. MCB 5, DB3" /></Field>
          <div className="space-y-2">
            <Label className="text-white text-xs">Method of Isolation</Label>
            {isolationMethods.map((m) => (
              <TickButton key={m.key} checked={data[m.key] as boolean} label={m.label} onChange={() => update(m.key, !data[m.key])} />
            ))}
            {data.methodOther && (
              <div className="pl-8"><Input value={data.methodOtherDescription} onChange={(e) => update('methodOtherDescription', e.target.value)} className={inputCn} placeholder="Describe method..." /></div>
            )}
          </div>
          <Field label="Lock / Tag Number"><Input value={data.lockTagNumber} onChange={(e) => update('lockTagNumber', e.target.value)} className={inputCn} placeholder="e.g. Padlock ref SP-042" /></Field>
          <TickButton checked={data.warningNoticesPosted} label="Warning notices posted at isolation point" color="amber" onChange={() => update('warningNoticesPosted', !data.warningNoticesPosted)} />
        </Section>

        {/* Purpose of Work */}
        <Section title="Purpose of Work" accentColor="from-violet-500/40 to-purple-400/20">
          <Field label="Description of work to be carried out">
            <Textarea value={data.purposeOfWork} onChange={(e) => update('purposeOfWork', e.target.value)} className={textareaCn} placeholder="Describe the work requiring isolation..." />
          </Field>
        </Section>

        {/* Affected Systems */}
        <Section title="Affected Systems" accentColor="from-orange-500/40 to-red-400/20">
          <p className="text-xs text-white mb-2">The following systems may be affected by this isolation:</p>
          <div className="space-y-2">
            {affectedSystems.map((s) => (
              <TickButton key={s.key} checked={data[s.key] as boolean} label={s.label} color="red" onChange={() => update(s.key, !data[s.key])} />
            ))}
            {data.affectedOther && (
              <div className="pl-8"><Input value={data.affectedOtherDescription} onChange={(e) => update('affectedOtherDescription', e.target.value)} className={inputCn} placeholder="Describe other systems..." /></div>
            )}
          </div>
        </Section>

        {/* Proving Dead (GS 38) */}
        <Section title="Proving Dead — GS 38" accentColor="from-emerald-500/40 to-green-400/20">
          <div className="grid grid-cols-3 gap-3">
            <Field label="Tester Make"><Input value={data.testerMake} onChange={(e) => update('testerMake', e.target.value)} className={inputCn} /></Field>
            <Field label="Model"><Input value={data.testerModel} onChange={(e) => update('testerModel', e.target.value)} className={inputCn} /></Field>
            <Field label="Serial No."><Input value={data.testerSerialNumber} onChange={(e) => update('testerSerialNumber', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Proving Unit Make"><Input value={data.provingUnitMake} onChange={(e) => update('provingUnitMake', e.target.value)} className={inputCn} /></Field>
            <Field label="Model"><Input value={data.provingUnitModel} onChange={(e) => update('provingUnitModel', e.target.value)} className={inputCn} /></Field>
          </div>
          <TickButton checked={data.proveTestProveConfirmed} label="Prove — Test — Prove procedure completed" color="emerald" onChange={() => update('proveTestProveConfirmed', !data.proveTestProveConfirmed)} />
          <TickButton checked={data.confirmedDead} label="Confirmed dead — safe to work" color="emerald" onChange={() => update('confirmedDead', !data.confirmedDead)} />
        </Section>

        {/* Isolation Sign-On */}
        <Section title="Isolation" accentColor="from-elec-yellow/40 to-amber-400/20">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date Isolated"><input type="date" value={data.dateIsolated} onChange={(e) => update('dateIsolated', e.target.value)} className={cn(inputCn, 'w-full rounded-md border px-3 appearance-none')} /></Field>
            <Field label="Time Isolated"><input type="time" value={data.timeIsolated} onChange={(e) => update('timeIsolated', e.target.value)} className={cn(inputCn, 'w-full rounded-md border px-3 appearance-none')} /></Field>
          </div>
          <Field label="Person Isolating"><Input value={data.personIsolatingName} onChange={(e) => update('personIsolatingName', e.target.value)} className={inputCn} /></Field>
          <SignatureInput label="Person Isolating Signature" value={data.personIsolatingSignature} onChange={(sig) => update('personIsolatingSignature', sig || '')} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Person Receiving Isolation"><Input value={data.personReceivingName} onChange={(e) => update('personReceivingName', e.target.value)} className={inputCn} /></Field>
            <Field label="Position"><Input value={data.personReceivingPosition} onChange={(e) => update('personReceivingPosition', e.target.value)} className={inputCn} placeholder="e.g. Site Manager" /></Field>
          </div>
          <SignatureInput label="Person Receiving Signature" value={data.personReceivingSignature} onChange={(sig) => update('personReceivingSignature', sig || '')} />
        </Section>

        {/* De-Isolation / Handback */}
        <Section title="De-Isolation / Handback" accentColor="from-cyan-500/40 to-blue-400/20">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date"><input type="date" value={data.dateDeisolated} onChange={(e) => update('dateDeisolated', e.target.value)} className={cn(inputCn, 'w-full rounded-md border px-3 appearance-none')} /></Field>
            <Field label="Time"><input type="time" value={data.timeDeisolated} onChange={(e) => update('timeDeisolated', e.target.value)} className={cn(inputCn, 'w-full rounded-md border px-3 appearance-none')} /></Field>
          </div>
          <TickButton checked={data.workCompleted} label="All work completed" color="emerald" onChange={() => update('workCompleted', !data.workCompleted)} />
          <TickButton checked={data.allPersonsClear} label="All persons clear of equipment" color="emerald" onChange={() => update('allPersonsClear', !data.allPersonsClear)} />
          <Field label="Person De-Isolating"><Input value={data.personDeisolatingName} onChange={(e) => update('personDeisolatingName', e.target.value)} className={inputCn} /></Field>
          <SignatureInput label="Person De-Isolating Signature" value={data.personDeisolatingSignature} onChange={(sig) => update('personDeisolatingSignature', sig || '')} />
          <Field label="Person Authorising Re-Energisation"><Input value={data.personAuthorisingName} onChange={(e) => update('personAuthorisingName', e.target.value)} className={inputCn} /></Field>
          <SignatureInput label="Person Authorising Signature" value={data.personAuthorisingSignature} onChange={(sig) => update('personAuthorisingSignature', sig || '')} />
        </Section>

        {/* Photo Evidence */}
        <Section title="Photo Evidence" accentColor="from-cyan-500/40 to-blue-400/20">
          <input ref={photoInputRef} type="file" accept="image/*" capture="environment" multiple className="hidden" onChange={handlePhotoCapture} />
          <button onClick={() => photoInputRef.current?.click()} className="w-full h-12 rounded-xl border-2 border-dashed border-white/[0.15] flex items-center justify-center gap-2.5 text-sm text-white touch-manipulation active:scale-[0.98] hover:border-white/[0.25] transition-colors">
            <Camera className="h-4 w-4" />
            Add Photos
          </button>
          <p className="text-[11px] text-white">Photograph the isolation point, lock-off device, and warning notices</p>
          {data.photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {data.photos.map((photo, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                  <img src={photo} alt={`Evidence ${i + 1}`} className="w-full h-full object-cover" />
                  <button onClick={() => removePhoto(i)} className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center touch-manipulation">
                    <X className="h-3.5 w-3.5 text-white" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Notes */}
        <Section title="Notes" accentColor="from-white/20 to-white/5">
          <Textarea value={data.notes} onChange={(e) => update('notes', e.target.value)} className={textareaCn} placeholder="Additional notes..." />
        </Section>

        {/* Actions */}
        <motion.div variants={itemVariants} className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 h-12 text-sm font-medium touch-manipulation active:scale-[0.98] border-white/[0.08] text-white hover:bg-white/[0.06]" onClick={() => { storageSetJSONSync(DRAFT_KEY, data); toast.success('Draft saved'); }}>
            Save Draft
          </Button>
          <Button className="flex-1 h-12 text-sm font-medium touch-manipulation active:scale-[0.98] bg-amber-500 text-black hover:bg-amber-600" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Saving...</> : existingReportId ? 'Update Certificate' : 'Issue Certificate'}
          </Button>
        </motion.div>
      </motion.main>
    </div>
  );
}
