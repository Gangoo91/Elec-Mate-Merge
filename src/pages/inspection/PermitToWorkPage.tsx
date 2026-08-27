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
import { formatPermitToWorkPayload } from '@/utils/permit-to-work-formatter';

/*
 * Page styling comes from the shared kit. These were local copies that had
 * drifted from every other Notices & Labels page — see components/forms/pageStyles.
 */
import { pageInputCn as inputCn, pageTextareaCn as textareaCn } from '@/components/forms/pageStyles';

import { PageHeader } from '@/components/forms/PageHeader';

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
const dateTimeCn = inputCn;

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
  <button
    onClick={onChange}
    className={cn(
      'w-full flex items-center gap-3 p-3 min-h-[44px] rounded-xl border text-left touch-manipulation active:scale-[0.98] transition-all',
      checked ? 'bg-elec-yellow border-elec-yellow' : 'bg-white/[0.06] border-white/[0.1]'
    )}
  >
    <div className={cn('w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0', checked ? 'border-black/70' : 'border-white/30')}>
      {checked && <svg className="w-3 h-3 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
    </div>
    <span className={cn('text-sm', checked ? 'font-semibold text-black' : 'font-medium text-white')}>{label}</span>
  </button>
);

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await reportCloud.updateReport(existingReportId, user.id, data as any);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <PageHeader
        eyebrow="HSE"
        title="Permit to Work"
        lead="Formal authorisation."
        description="Work on electrical systems in accordance with HSE HSG250 and BS 7671:2018+A3:2024 — Issue, Receipt, Clearance, Cancellation."
        reference={data.permitNumber}
      />


      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-5 mx-auto max-w-3xl lg:max-w-none xl:max-w-[1700px] lg:px-8 lg:grid lg:grid-cols-2 lg:gap-4 lg:space-y-0">

        {/* Reference */}
        <Section title="Reference">
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
            <Field label="Site Name"><Input value={data.siteName} onChange={(e) => update('siteName', e.target.value)} className={inputCn} /></Field>
            <Field label="Site Contact"><Input value={data.siteContactName} onChange={(e) => update('siteContactName', e.target.value)} className={inputCn} /></Field>
          </div>
          <Field label="Site Address"><Input value={data.siteAddress} onChange={(e) => update('siteAddress', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Contact Phone"><Input type="tel" value={data.siteContactPhone} onChange={(e) => update('siteContactPhone', e.target.value)} className={inputCn} /></Field>
            <Field label="Emergency Contact"><Input type="tel" value={data.emergencyContact} onChange={(e) => update('emergencyContact', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Nearest First Aider"><Input value={data.nearestFirstAider} onChange={(e) => update('nearestFirstAider', e.target.value)} className={inputCn} /></Field>
            <Field label="Fire Assembly Point"><Input value={data.fireAssemblyPoint} onChange={(e) => update('fireAssemblyPoint', e.target.value)} className={inputCn} /></Field>
          </div>
        </Section>

        {/* Part 1: Work Description */}
        <Section title="Part 1 — Work description">
          <Field label="Description of Work" required><Textarea value={data.descriptionOfWork} onChange={(e) => update('descriptionOfWork', e.target.value)} className={textareaCn} placeholder="Describe the electrical work to be carried out..." /></Field>
          <Field label="Equipment to Be Worked On"><Input value={data.equipmentToBeWorkedOn} onChange={(e) => update('equipmentToBeWorkedOn', e.target.value)} className={inputCn} placeholder="e.g. Distribution board DB1" /></Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Location"><Input value={data.locationOfWork} onChange={(e) => update('locationOfWork', e.target.value)} className={inputCn} placeholder="e.g. Plant room, Floor 2" /></Field>
            <Field label="DB Reference"><Input value={data.distributionBoardRef} onChange={(e) => update('distributionBoardRef', e.target.value)} className={inputCn} /></Field>
          </div>
        </Section>

        {/* Part 1: Hazards */}
        <Section title="Part 1 — Hazards identified">
          <div className="flex items-center justify-between gap-3">
            <p className="text-[12.5px] text-white">Select all hazards present</p>
            <button onClick={applyStandardElectrical} className="h-11 shrink-0 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-[13px] font-semibold text-white hover:bg-white/[0.08] touch-manipulation active:scale-[0.98] transition-colors">
              Standard Electrical
            </button>
          </div>
          <div className="space-y-2">
            {hazards.map((h) => (
              <TickButton key={h.key} checked={data[h.key] as boolean} label={h.label} onChange={() => update(h.key, !data[h.key])} />
            ))}
            {data.hazardOther && <div className="pl-8"><Input value={data.hazardOtherDescription} onChange={(e) => update('hazardOtherDescription', e.target.value)} className={inputCn} placeholder="Describe..." /></div>}
          </div>
        </Section>

        {/* Part 1: Precautions */}
        <Section title="Part 1 — Precautions required">
          <div className="space-y-2">
            {precautions.map((p) => (
              <TickButton key={p.key} checked={data[p.key] as boolean} label={p.label} onChange={() => update(p.key, !data[p.key])} />
            ))}
            {data.precautionOther && <div className="pl-8"><Input value={data.precautionOtherDescription} onChange={(e) => update('precautionOtherDescription', e.target.value)} className={inputCn} placeholder="Describe..." /></div>}
          </div>
        </Section>

        {/* Part 1: PPE */}
        <Section title="Part 1 — PPE required">
          <div className="space-y-2">
            {ppe.map((p) => (
              <TickButton key={p.key} checked={data[p.key] as boolean} label={p.label} onChange={() => update(p.key, !data[p.key])} />
            ))}
            {data.ppeOther && <div className="pl-8"><Input value={data.ppeOtherDescription} onChange={(e) => update('ppeOtherDescription', e.target.value)} className={inputCn} placeholder="Describe..." /></div>}
          </div>
        </Section>

        {/* Part 1: Isolation */}
        <Section title="Part 1 — Isolation details">
          <Field label="Point(s) of Isolation"><Input value={data.isolationPoints} onChange={(e) => update('isolationPoints', e.target.value)} className={inputCn} placeholder="e.g. MCB 5, DB3" /></Field>
          <Field label="Method of Isolation"><Input value={data.isolationMethod} onChange={(e) => update('isolationMethod', e.target.value)} className={inputCn} placeholder="e.g. MCB off, locked with padlock" /></Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Lock / Tag Number"><Input value={data.lockTagNumber} onChange={(e) => update('lockTagNumber', e.target.value)} className={inputCn} /></Field>
            <Field label="Linked Isolation Cert"><Input value={data.linkedIsolationCertRef} onChange={(e) => update('linkedIsolationCertRef', e.target.value)} className={inputCn} placeholder="ISO-..." /></Field>
          </div>
        </Section>

        {/* Part 1: Authorisation */}
        <Section title="Part 1 — Authorisation">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
        <Section title="Part 2 — Receipt">
          <p className="border-b border-white/[0.06] pb-3 text-[12.5px] text-white leading-relaxed">{data.receiptDeclaration}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Person in Charge"><Input value={data.personInChargeName} onChange={(e) => update('personInChargeName', e.target.value)} className={inputCn} /></Field>
            <Field label="Position"><Input value={data.personInChargePosition} onChange={(e) => update('personInChargePosition', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
        <Section title="Part 3 — Clearance">
          <div className="space-y-2">
            <TickButton checked={data.workCompleted} label="All work completed" onChange={() => update('workCompleted', !data.workCompleted)} />
            <TickButton checked={data.allPersonsClear} label="All persons clear of equipment" onChange={() => update('allPersonsClear', !data.allPersonsClear)} />
            <TickButton checked={data.areaSafe} label="Area inspected and safe" onChange={() => update('areaSafe', !data.areaSafe)} />
            <TickButton checked={data.toolsRemoved} label="All tools and equipment removed" onChange={() => update('toolsRemoved', !data.toolsRemoved)} />
          </div>
          <Field label="Person in Charge"><Input value={data.clearanceName} onChange={(e) => update('clearanceName', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date"><Input type="date" value={data.clearanceDate} onChange={(e) => update('clearanceDate', e.target.value)} className={dateTimeCn} /></Field>
            <Field label="Time"><Input type="time" value={data.clearanceTime} onChange={(e) => update('clearanceTime', e.target.value)} className={dateTimeCn} /></Field>
          </div>
          <SignatureInput label="Person in Charge Signature" value={data.clearanceSignature} onChange={(sig) => update('clearanceSignature', sig || '')} />
        </Section>

        {/* Part 4: Cancellation */}
        <Section title="Part 4 — Cancellation">
          <div className="space-y-2">
            <TickButton checked={data.permitCancelled} label="Permit cancelled" onChange={() => update('permitCancelled', !data.permitCancelled)} />
            <TickButton checked={data.safeToReturn} label="Safe to return to normal service" onChange={() => update('safeToReturn', !data.safeToReturn)} />
          </div>
          {data.permitCancelled && (
            <div className="space-y-4">
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
        <Section title="Extension" className="lg:col-span-2">
          <TickButton checked={data.extended} label="Permit validity extended" onChange={() => update('extended', !data.extended)} />
          {data.extended && (
            <div className="space-y-4">
              <Field label="Extended Valid Until"><Input type="date" value={data.extendedValidUntil} onChange={(e) => update('extendedValidUntil', e.target.value)} className={dateTimeCn} /></Field>
              <Field label="Extended By"><Input value={data.extendedByName} onChange={(e) => update('extendedByName', e.target.value)} className={inputCn} /></Field>
              <SignatureInput label="Extension Signature" value={data.extendedBySignature} onChange={(sig) => update('extendedBySignature', sig || '')} />
            </div>
          )}
        </Section>

        {/* Photo Evidence */}
        <Section title="Photo evidence" className="lg:col-span-2">
          <input ref={photoInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoCapture} />
          <button onClick={() => photoInputRef.current?.click()} className="h-11 w-full rounded-xl border border-dashed border-white/[0.2] text-[13px] font-semibold text-white hover:border-white/[0.35] touch-manipulation active:scale-[0.98] transition-colors">
            Add Photos
          </button>
          {data.photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
              {data.photos.map((photo, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                  <img src={photo} alt={`Evidence ${i + 1}`} className="w-full h-full object-cover" />
                  <button onClick={() => removePhoto(i)} aria-label="Remove photo" className="absolute top-1.5 right-1.5 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-base leading-none text-white touch-manipulation">×</button>
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
        <motion.div variants={itemVariants} className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-end lg:col-span-2">
          <Button variant="outline" className="h-12 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white hover:bg-white/[0.08] hover:text-white touch-manipulation sm:px-8" onClick={() => { storageSetJSONSync(DRAFT_KEY, data); toast.success('Draft saved'); }}>
            Save Draft
          </Button>
          <Button className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black hover:bg-elec-yellow/90 active:scale-[0.99] touch-manipulation sm:w-auto sm:px-10" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Saving...</> : existingReportId ? 'Update Permit' : 'Download PDF'}
          </Button>
        </motion.div>
      </motion.main>
    </div>
  );
}
