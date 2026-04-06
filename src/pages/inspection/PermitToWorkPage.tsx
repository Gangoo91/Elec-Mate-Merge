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
import { formatPermitToWorkPayload } from '@/utils/permit-to-work-formatter';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };

interface PermitData {
  permitNumber: string;
  dateIssued: string;
  timeIssued: string;
  validFrom: string;
  validUntil: string;
  // Issued By
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
  emergencyContact: string;
  nearestFirstAider: string;
  fireAssemblyPoint: string;
  // Part 1: Work
  descriptionOfWork: string;
  equipmentToBeWorkedOn: string;
  locationOfWork: string;
  distributionBoardRef: string;
  // Part 1: Hazards
  hazardLiveWorking: boolean;
  hazardStoredEnergy: boolean;
  hazardArcFlash: boolean;
  hazardConfinedSpace: boolean;
  hazardWorkingAtHeight: boolean;
  hazardAsbestos: boolean;
  hazardOtherServices: boolean;
  hazardOther: boolean;
  hazardOtherDescription: string;
  // Part 1: Precautions
  precautionIsolated: boolean;
  precautionProvedDead: boolean;
  precautionLockedOff: boolean;
  precautionWarningNotices: boolean;
  precautionBarriers: boolean;
  precautionAdjacentCovered: boolean;
  precautionEarthing: boolean;
  precautionOther: boolean;
  precautionOtherDescription: string;
  // Part 1: PPE
  ppeInsulatedGloves: boolean;
  ppeSafetyGlasses: boolean;
  ppeArcFlashSuit: boolean;
  ppeInsulatedTools: boolean;
  ppeSafetyBoots: boolean;
  ppeHardHat: boolean;
  ppeOther: boolean;
  ppeOtherDescription: string;
  // Part 1: Isolation
  isolationPoints: string;
  isolationMethod: string;
  lockTagNumber: string;
  linkedIsolationCertRef: string;
  // Part 1: Authorisation
  authorisedByName: string;
  authorisedByPosition: string;
  authorisedByCompany: string;
  authorisedBySignature: string;
  authorisedDate: string;
  authorisedTime: string;
  // Part 2: Receipt
  receiptDeclaration: string;
  personInChargeName: string;
  personInChargePosition: string;
  personInChargePhone: string;
  personInChargeEmail: string;
  personInChargeSignature: string;
  receiptDate: string;
  receiptTime: string;
  // Part 3: Clearance
  workCompleted: boolean;
  allPersonsClear: boolean;
  areaSafe: boolean;
  toolsRemoved: boolean;
  clearanceName: string;
  clearanceSignature: string;
  clearanceDate: string;
  clearanceTime: string;
  // Part 4: Cancellation
  permitCancelled: boolean;
  safeToReturn: boolean;
  cancellationName: string;
  cancellationSignature: string;
  cancellationDate: string;
  cancellationTime: string;
  // Extension
  extended: boolean;
  extendedValidUntil: string;
  extendedByName: string;
  extendedBySignature: string;
  // Photos + Notes
  photos: string[];
  notes: string;
}

const defaultData = (): PermitData => ({
  permitNumber: `PTW-${Date.now().toString(36).toUpperCase()}`,
  dateIssued: new Date().toISOString().split('T')[0],
  timeIssued: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  validFrom: new Date().toISOString().split('T')[0],
  validUntil: '',
  contractorName: '', contractorCompany: '', contractorPhone: '', contractorEmail: '',
  registrationScheme: '', registrationNumber: '',
  siteName: '', siteAddress: '', siteContactName: '', siteContactPhone: '',
  emergencyContact: '', nearestFirstAider: '', fireAssemblyPoint: '',
  descriptionOfWork: '', equipmentToBeWorkedOn: '', locationOfWork: '', distributionBoardRef: '',
  hazardLiveWorking: false, hazardStoredEnergy: false, hazardArcFlash: false,
  hazardConfinedSpace: false, hazardWorkingAtHeight: false, hazardAsbestos: false,
  hazardOtherServices: false, hazardOther: false, hazardOtherDescription: '',
  precautionIsolated: false, precautionProvedDead: false, precautionLockedOff: false,
  precautionWarningNotices: false, precautionBarriers: false, precautionAdjacentCovered: false,
  precautionEarthing: false, precautionOther: false, precautionOtherDescription: '',
  ppeInsulatedGloves: false, ppeSafetyGlasses: false, ppeArcFlashSuit: false,
  ppeInsulatedTools: false, ppeSafetyBoots: false, ppeHardHat: false,
  ppeOther: false, ppeOtherDescription: '',
  isolationPoints: '', isolationMethod: '', lockTagNumber: '', linkedIsolationCertRef: '',
  authorisedByName: '', authorisedByPosition: '', authorisedByCompany: '',
  authorisedBySignature: '', authorisedDate: new Date().toISOString().split('T')[0],
  authorisedTime: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  receiptDeclaration: 'I confirm that I have read and understand this permit, the hazards identified, and the precautions required. I accept responsibility for ensuring the work is carried out in accordance with this permit.',
  personInChargeName: '', personInChargePosition: '', personInChargePhone: '', personInChargeEmail: '', personInChargeSignature: '',
  receiptDate: '', receiptTime: '',
  workCompleted: false, allPersonsClear: false, areaSafe: false, toolsRemoved: false,
  clearanceName: '', clearanceSignature: '', clearanceDate: '', clearanceTime: '',
  permitCancelled: false, safeToReturn: false,
  cancellationName: '', cancellationSignature: '', cancellationDate: '', cancellationTime: '',
  extended: false, extendedValidUntil: '', extendedByName: '', extendedBySignature: '',
  photos: [], notes: '',
});

const DRAFT_KEY = 'elec-mate-draft-permit-to-work';
const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';
const textareaCn = 'touch-manipulation text-base min-h-[100px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';
const dateTimeCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';

const Section = ({ title, accentColor, children }: { title: string; accentColor?: string; children: React.ReactNode }) => (
  <motion.section variants={itemVariants} className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div className={cn('h-[2px] w-full rounded-full bg-gradient-to-r mb-2', accentColor || 'from-orange-500 to-amber-400')} />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
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

const TickButton = ({ checked, label, color = 'orange', onChange }: { checked: boolean; label: string; color?: 'orange' | 'emerald' | 'red' | 'blue' | 'amber'; onChange: () => void }) => {
  const colors: Record<string, { bg: string; check: string; text: string }> = {
    orange: { bg: 'bg-orange-500/10 border-orange-500/25', check: 'bg-orange-500 border-orange-500', text: 'text-orange-400' },
    amber: { bg: 'bg-amber-500/10 border-amber-500/25', check: 'bg-amber-500 border-amber-500 text-black', text: 'text-amber-400' },
    emerald: { bg: 'bg-emerald-500/10 border-emerald-500/25', check: 'bg-emerald-500 border-emerald-500', text: 'text-emerald-400' },
    red: { bg: 'bg-red-500/10 border-red-500/25', check: 'bg-red-500 border-red-500', text: 'text-red-400' },
    blue: { bg: 'bg-blue-500/10 border-blue-500/25', check: 'bg-blue-500 border-blue-500', text: 'text-blue-400' },
  };
  const c = colors[color];
  return (
    <button onClick={onChange} className={cn('w-full flex items-center gap-3 p-3 rounded-xl border text-left touch-manipulation active:scale-[0.98] transition-all', checked ? c.bg : 'bg-white/[0.03] border-white/[0.06]')}>
      <div className={cn('w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0', checked ? c.check : 'border-white/30')}>
        {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
      </div>
      <span className={cn('text-sm font-medium', checked ? c.text : 'text-white')}>{label}</span>
    </button>
  );
};

export default function PermitToWorkPage() {
  const navigate = useNavigate();
  const { id: editId } = useParams<{ id: string }>();
  const [isSaving, setIsSaving] = useState(false);
  const [existingReportId, setExistingReportId] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<PermitData>(() => {
    const saved = storageGetJSONSync<Partial<PermitData>>(DRAFT_KEY, null);
    return saved ? { ...defaultData(), ...saved } : defaultData();
  });

  useEffect(() => {
    if (!editId) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const result = await reportCloud.getReportData(editId, user.id);
      if (result) { setData((prev) => ({ ...prev, ...(result as any) })); setExistingReportId(editId); }
    });
  }, [editId]);

  useEffect(() => {
    if (editId) return;
    const timer = setTimeout(() => { storageSetJSONSync(DRAFT_KEY, data); }, 2000);
    return () => clearTimeout(timer);
  }, [data, editId]);

  // Pre-fill from company profile
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
          authorisedByName: prev.authorisedByName || cp.inspector_name || cp.company_name || '',
          authorisedByCompany: prev.authorisedByCompany || cp.company_name || '',
        }));
      }
    });
  }, []);

  const update = useCallback((field: keyof PermitData, value: any) => {
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

  // Smart feature: apply standard electrical hazard+precaution+PPE bundle
  const applyStandardElectrical = () => {
    setData((prev) => ({
      ...prev,
      hazardLiveWorking: true, hazardStoredEnergy: true, hazardArcFlash: true,
      precautionIsolated: true, precautionProvedDead: true, precautionLockedOff: true,
      precautionWarningNotices: true,
      ppeInsulatedGloves: true, ppeSafetyGlasses: true, ppeInsulatedTools: true, ppeSafetyBoots: true,
    }));
    toast.success('Standard electrical precautions applied');
  };

  const handleSave = async () => {
    if (!data.descriptionOfWork) { toast.error('Please describe the work'); return; }
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error('Please sign in'); setIsSaving(false); return; }

      const savedReportId = existingReportId || data.permitNumber;
      if (existingReportId) {
        await reportCloud.updateReport(existingReportId, user.id, data as any);
      } else {
        const result = await reportCloud.createReport(user.id, 'permit-to-work', data as any);
        if (!result.success) { toast.error('Failed to save'); setIsSaving(false); return; }
      }

      toast.success('Saved — generating PDF...');
      try {
        const payload = formatPermitToWorkPayload(data);
        const { data: pdfResult, error: pdfError } = await supabase.functions.invoke(
          'generate-permit-to-work-pdf',
          { body: { formData: payload } }
        );
        if (pdfError) {
          console.error('PDF generation error:', pdfError);
          toast.error('Saved but PDF generation failed — you can retry later');
        } else if (pdfResult?.download_url) {
          let permanentPdfUrl = pdfResult.download_url;
          try {
            const { saveCertificatePdf } = await import('@/utils/certificate-pdf-storage');
            const { permanentUrl, storagePath } = await saveCertificatePdf(pdfResult.download_url, user.id, savedReportId, data.permitNumber);
            permanentPdfUrl = permanentUrl;
            await supabase.from('reports').update({ storage_path: storagePath, pdf_url: permanentPdfUrl, pdf_generated_at: new Date().toISOString() }).eq('report_id', savedReportId);
          } catch (storageErr) {
            console.warn('[PermitToWork] Permanent PDF storage failed:', storageErr);
            await supabase.from('reports').update({ pdf_url: permanentPdfUrl, pdf_generated_at: new Date().toISOString() }).eq('report_id', savedReportId);
          }
          const { openOrDownloadPdf } = await import('@/utils/pdf-download');
          await openOrDownloadPdf(permanentPdfUrl, `Permit-To-Work-${data.permitNumber}.pdf`);
          toast.success('Permit to work issued');
        }
      } catch (pdfErr) {
        console.error('PDF generation error:', pdfErr);
        toast.error('Saved but PDF generation failed');
      }

      storageRemoveSync(DRAFT_KEY);
      navigate(-1);
    } catch { toast.error('Failed to save'); } finally { setIsSaving(false); }
  };

  const hazards = [
    { key: 'hazardLiveWorking' as const, label: 'Live working / adjacent live parts' },
    { key: 'hazardStoredEnergy' as const, label: 'Stored energy (capacitors, UPS)' },
    { key: 'hazardArcFlash' as const, label: 'Arc flash risk' },
    { key: 'hazardConfinedSpace' as const, label: 'Confined space' },
    { key: 'hazardWorkingAtHeight' as const, label: 'Working at height' },
    { key: 'hazardAsbestos' as const, label: 'Asbestos present' },
    { key: 'hazardOtherServices' as const, label: 'Other services (gas, water, comms)' },
    { key: 'hazardOther' as const, label: 'Other' },
  ];

  const precautions = [
    { key: 'precautionIsolated' as const, label: 'Circuit / equipment isolated' },
    { key: 'precautionProvedDead' as const, label: 'Proved dead (GS 38)' },
    { key: 'precautionLockedOff' as const, label: 'Locked off with personal lock' },
    { key: 'precautionWarningNotices' as const, label: 'Warning notices posted' },
    { key: 'precautionBarriers' as const, label: 'Barriers / screens erected' },
    { key: 'precautionAdjacentCovered' as const, label: 'Adjacent live parts covered' },
    { key: 'precautionEarthing' as const, label: 'Earthing applied' },
    { key: 'precautionOther' as const, label: 'Other' },
  ];

  const ppe = [
    { key: 'ppeInsulatedGloves' as const, label: 'Insulated gloves' },
    { key: 'ppeSafetyGlasses' as const, label: 'Safety glasses / visor' },
    { key: 'ppeArcFlashSuit' as const, label: 'Arc flash suit / face shield' },
    { key: 'ppeInsulatedTools' as const, label: 'Insulated tools' },
    { key: 'ppeSafetyBoots' as const, label: 'Safety boots' },
    { key: 'ppeHardHat' as const, label: 'Hard hat' },
    { key: 'ppeOther' as const, label: 'Other' },
  ];

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20">
                <Zap className="h-4 w-4 text-orange-400" />
              </div>
              <h1 className="text-base font-semibold text-white">Permit to Work</h1>
            </div>
          </div>
        </div>
      </div>

      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-6 max-w-3xl mx-auto">

        {/* Banner */}
        <motion.div variants={itemVariants} className="border-b border-orange-500/20 pb-4">
          <p className="text-sm font-bold text-orange-400">ELECTRICAL PERMIT TO WORK</p>
          <p className="text-xs text-white mt-1">Formal authorisation to carry out work on electrical systems in accordance with HSE HSG250 and BS 7671:2018+A3:2024. This permit follows the 4-part lifecycle: Issue, Receipt, Clearance, Cancellation.</p>
        </motion.div>

        {/* Reference */}
        <Section title="Reference" accentColor="from-white/30 to-white/5">
          <Field label="Permit Number"><Input value={data.permitNumber} onChange={(e) => update('permitNumber', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date Issued"><Input type="date" value={data.dateIssued} onChange={(e) => update('dateIssued', e.target.value)} className={dateTimeCn} /></Field>
            <Field label="Time Issued"><Input type="time" value={data.timeIssued} onChange={(e) => update('timeIssued', e.target.value)} className={dateTimeCn} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Valid From"><Input type="date" value={data.validFrom} onChange={(e) => update('validFrom', e.target.value)} className={dateTimeCn} /></Field>
            <Field label="Valid Until"><Input type="date" value={data.validUntil} onChange={(e) => update('validUntil', e.target.value)} className={dateTimeCn} /></Field>
          </div>
        </Section>

        {/* Issued By */}
        <Section title="Issued By" accentColor="from-elec-yellow/50 to-amber-400/20">
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
            <Field label="Site Name"><Input value={data.siteName} onChange={(e) => update('siteName', e.target.value)} className={inputCn} /></Field>
            <Field label="Site Contact"><Input value={data.siteContactName} onChange={(e) => update('siteContactName', e.target.value)} className={inputCn} /></Field>
          </div>
          <Field label="Site Address"><Input value={data.siteAddress} onChange={(e) => update('siteAddress', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Contact Phone"><Input type="tel" value={data.siteContactPhone} onChange={(e) => update('siteContactPhone', e.target.value)} className={inputCn} /></Field>
            <Field label="Emergency Contact"><Input type="tel" value={data.emergencyContact} onChange={(e) => update('emergencyContact', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Nearest First Aider"><Input value={data.nearestFirstAider} onChange={(e) => update('nearestFirstAider', e.target.value)} className={inputCn} /></Field>
            <Field label="Fire Assembly Point"><Input value={data.fireAssemblyPoint} onChange={(e) => update('fireAssemblyPoint', e.target.value)} className={inputCn} /></Field>
          </div>
        </Section>

        {/* Part 1: Work Description */}
        <Section title="Part 1 — Work Description" accentColor="from-orange-500/50 to-amber-400/20">
          <Field label="Description of Work" required><Textarea value={data.descriptionOfWork} onChange={(e) => update('descriptionOfWork', e.target.value)} className={textareaCn} placeholder="Describe the electrical work to be carried out..." /></Field>
          <Field label="Equipment to Be Worked On"><Input value={data.equipmentToBeWorkedOn} onChange={(e) => update('equipmentToBeWorkedOn', e.target.value)} className={inputCn} placeholder="e.g. Distribution board DB1" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Location"><Input value={data.locationOfWork} onChange={(e) => update('locationOfWork', e.target.value)} className={inputCn} placeholder="e.g. Plant room, Floor 2" /></Field>
            <Field label="DB Reference"><Input value={data.distributionBoardRef} onChange={(e) => update('distributionBoardRef', e.target.value)} className={inputCn} /></Field>
          </div>
        </Section>

        {/* Part 1: Hazards */}
        <Section title="Part 1 — Hazards Identified" accentColor="from-red-500/50 to-orange-400/20">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs text-white">Select all hazards present</p>
            <button onClick={applyStandardElectrical} className="text-[11px] font-medium text-orange-400 bg-orange-500/10 border border-orange-500/20 px-3 py-1.5 rounded-lg touch-manipulation active:scale-[0.98]">
              Standard Electrical
            </button>
          </div>
          <div className="space-y-2">
            {hazards.map((h) => (
              <TickButton key={h.key} checked={data[h.key] as boolean} label={h.label} color="red" onChange={() => update(h.key, !data[h.key])} />
            ))}
            {data.hazardOther && <div className="pl-8"><Input value={data.hazardOtherDescription} onChange={(e) => update('hazardOtherDescription', e.target.value)} className={inputCn} placeholder="Describe..." /></div>}
          </div>
        </Section>

        {/* Part 1: Precautions */}
        <Section title="Part 1 — Precautions Required" accentColor="from-emerald-500/50 to-green-400/20">
          <div className="space-y-2">
            {precautions.map((p) => (
              <TickButton key={p.key} checked={data[p.key] as boolean} label={p.label} color="emerald" onChange={() => update(p.key, !data[p.key])} />
            ))}
            {data.precautionOther && <div className="pl-8"><Input value={data.precautionOtherDescription} onChange={(e) => update('precautionOtherDescription', e.target.value)} className={inputCn} placeholder="Describe..." /></div>}
          </div>
        </Section>

        {/* Part 1: PPE */}
        <Section title="Part 1 — PPE Required" accentColor="from-blue-500/50 to-cyan-400/20">
          <div className="space-y-2">
            {ppe.map((p) => (
              <TickButton key={p.key} checked={data[p.key] as boolean} label={p.label} color="blue" onChange={() => update(p.key, !data[p.key])} />
            ))}
            {data.ppeOther && <div className="pl-8"><Input value={data.ppeOtherDescription} onChange={(e) => update('ppeOtherDescription', e.target.value)} className={inputCn} placeholder="Describe..." /></div>}
          </div>
        </Section>

        {/* Part 1: Isolation */}
        <Section title="Part 1 — Isolation Details" accentColor="from-amber-500/50 to-yellow-400/20">
          <Field label="Point(s) of Isolation"><Input value={data.isolationPoints} onChange={(e) => update('isolationPoints', e.target.value)} className={inputCn} placeholder="e.g. MCB 5, DB3" /></Field>
          <Field label="Method of Isolation"><Input value={data.isolationMethod} onChange={(e) => update('isolationMethod', e.target.value)} className={inputCn} placeholder="e.g. MCB off, locked with padlock" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Lock / Tag Number"><Input value={data.lockTagNumber} onChange={(e) => update('lockTagNumber', e.target.value)} className={inputCn} /></Field>
            <Field label="Linked Isolation Cert"><Input value={data.linkedIsolationCertRef} onChange={(e) => update('linkedIsolationCertRef', e.target.value)} className={inputCn} placeholder="ISO-..." /></Field>
          </div>
        </Section>

        {/* Part 1: Authorisation */}
        <Section title="Part 1 — Authorisation" accentColor="from-orange-500/50 to-amber-400/20">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Authorised By"><Input value={data.authorisedByName} onChange={(e) => update('authorisedByName', e.target.value)} className={inputCn} /></Field>
            <Field label="Position"><Input value={data.authorisedByPosition} onChange={(e) => update('authorisedByPosition', e.target.value)} className={inputCn} placeholder="e.g. Authorised Person" /></Field>
          </div>
          <Field label="Company"><Input value={data.authorisedByCompany} onChange={(e) => update('authorisedByCompany', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date"><Input type="date" value={data.authorisedDate} onChange={(e) => update('authorisedDate', e.target.value)} className={dateTimeCn} /></Field>
            <Field label="Time"><Input type="time" value={data.authorisedTime} onChange={(e) => update('authorisedTime', e.target.value)} className={dateTimeCn} /></Field>
          </div>
          <SignatureInput label="Authorised Person Signature" value={data.authorisedBySignature} onChange={(sig) => update('authorisedBySignature', sig || '')} />
        </Section>

        {/* Part 2: Receipt */}
        <Section title="Part 2 — Receipt" accentColor="from-cyan-500/50 to-blue-400/20">
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 mb-3">
            <p className="text-xs text-white leading-relaxed">{data.receiptDeclaration}</p>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Person in Charge"><Input value={data.personInChargeName} onChange={(e) => update('personInChargeName', e.target.value)} className={inputCn} /></Field>
            <Field label="Position"><Input value={data.personInChargePosition} onChange={(e) => update('personInChargePosition', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone"><Input type="tel" value={data.personInChargePhone} onChange={(e) => update('personInChargePhone', e.target.value)} className={inputCn} /></Field>
            <Field label="Email"><Input type="email" value={data.personInChargeEmail} onChange={(e) => update('personInChargeEmail', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date"><Input type="date" value={data.receiptDate} onChange={(e) => update('receiptDate', e.target.value)} className={dateTimeCn} /></Field>
            <Field label="Time"><Input type="time" value={data.receiptTime} onChange={(e) => update('receiptTime', e.target.value)} className={dateTimeCn} /></Field>
          </div>
          <SignatureInput label="Person in Charge Signature" value={data.personInChargeSignature} onChange={(sig) => update('personInChargeSignature', sig || '')} />
        </Section>

        {/* Part 3: Clearance */}
        <Section title="Part 3 — Clearance" accentColor="from-emerald-500/50 to-green-400/20">
          <div className="space-y-2">
            <TickButton checked={data.workCompleted} label="All work completed" color="emerald" onChange={() => update('workCompleted', !data.workCompleted)} />
            <TickButton checked={data.allPersonsClear} label="All persons clear of equipment" color="emerald" onChange={() => update('allPersonsClear', !data.allPersonsClear)} />
            <TickButton checked={data.areaSafe} label="Area inspected and safe" color="emerald" onChange={() => update('areaSafe', !data.areaSafe)} />
            <TickButton checked={data.toolsRemoved} label="All tools and equipment removed" color="emerald" onChange={() => update('toolsRemoved', !data.toolsRemoved)} />
          </div>
          <Field label="Person in Charge"><Input value={data.clearanceName} onChange={(e) => update('clearanceName', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date"><Input type="date" value={data.clearanceDate} onChange={(e) => update('clearanceDate', e.target.value)} className={dateTimeCn} /></Field>
            <Field label="Time"><Input type="time" value={data.clearanceTime} onChange={(e) => update('clearanceTime', e.target.value)} className={dateTimeCn} /></Field>
          </div>
          <SignatureInput label="Person in Charge Signature" value={data.clearanceSignature} onChange={(sig) => update('clearanceSignature', sig || '')} />
        </Section>

        {/* Part 4: Cancellation */}
        <Section title="Part 4 — Cancellation" accentColor="from-red-500/50 to-rose-400/20">
          <div className="space-y-2">
            <TickButton checked={data.permitCancelled} label="Permit cancelled" color="red" onChange={() => update('permitCancelled', !data.permitCancelled)} />
            <TickButton checked={data.safeToReturn} label="Safe to return to normal service" color="emerald" onChange={() => update('safeToReturn', !data.safeToReturn)} />
          </div>
          {data.permitCancelled && (
            <div className="space-y-4 mt-3">
              <Field label="Cancelled By"><Input value={data.cancellationName} onChange={(e) => update('cancellationName', e.target.value)} className={inputCn} /></Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Date"><Input type="date" value={data.cancellationDate} onChange={(e) => update('cancellationDate', e.target.value)} className={dateTimeCn} /></Field>
                <Field label="Time"><Input type="time" value={data.cancellationTime} onChange={(e) => update('cancellationTime', e.target.value)} className={dateTimeCn} /></Field>
              </div>
              <SignatureInput label="Authorised Person Signature" value={data.cancellationSignature} onChange={(sig) => update('cancellationSignature', sig || '')} />
            </div>
          )}
        </Section>

        {/* Extension */}
        <Section title="Extension" accentColor="from-violet-500/50 to-purple-400/20">
          <TickButton checked={data.extended} label="Permit validity extended" color="blue" onChange={() => update('extended', !data.extended)} />
          {data.extended && (
            <div className="space-y-4 mt-3">
              <Field label="Extended Valid Until"><Input type="date" value={data.extendedValidUntil} onChange={(e) => update('extendedValidUntil', e.target.value)} className={dateTimeCn} /></Field>
              <Field label="Extended By"><Input value={data.extendedByName} onChange={(e) => update('extendedByName', e.target.value)} className={inputCn} /></Field>
              <SignatureInput label="Extension Signature" value={data.extendedBySignature} onChange={(sig) => update('extendedBySignature', sig || '')} />
            </div>
          )}
        </Section>

        {/* Photo Evidence */}
        <Section title="Photo Evidence" accentColor="from-cyan-500/40 to-blue-400/20">
          <input ref={photoInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoCapture} />
          <button onClick={() => photoInputRef.current?.click()} className="w-full h-12 rounded-xl border-2 border-dashed border-white/[0.15] flex items-center justify-center gap-2.5 text-sm text-white touch-manipulation active:scale-[0.98] hover:border-white/[0.25] transition-colors">
            <Camera className="h-4 w-4" /> Add Photos
          </button>
          {data.photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {data.photos.map((photo, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                  <img src={photo} alt={`Evidence ${i + 1}`} className="w-full h-full object-cover" />
                  <button onClick={() => removePhoto(i)} className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center touch-manipulation"><X className="h-3.5 w-3.5 text-white" /></button>
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
          <Button className="flex-1 h-12 text-sm font-medium touch-manipulation active:scale-[0.98] bg-orange-500 text-white hover:bg-orange-600" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Saving...</> : existingReportId ? 'Update Permit' : 'Download PDF'}
          </Button>
        </motion.div>
      </motion.main>
    </div>
  );
}
