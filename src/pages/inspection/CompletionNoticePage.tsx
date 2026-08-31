import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
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
import { formatCompletionNoticePayload } from '@/utils/completion-notice-formatter';

/*
 * Page styling comes from the shared kit. These were local copies that had
 * drifted from every other Notices & Labels page — see components/forms/pageStyles.
 */
import { pageInputCn as inputCn, pageTextareaCn as textareaCn } from '@/components/forms/pageStyles';

import { PageHeader } from '@/components/forms/PageHeader';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };
interface WorkItem {
  id: string;
  description: string;
  location: string;
  completed: boolean;
}

interface MaterialItem {
  id: string;
  description: string;
  quantity: string;
  manufacturer: string;
}

interface CompletionData {
  referenceNumber: string;
  date: string;
  time: string;
  linkedReportRef: string;
  workOrderRef: string;
  // Contractor
  contractorName: string;
  contractorCompany: string;
  contractorPhone: string;
  contractorEmail: string;
  registrationScheme: string;
  registrationNumber: string;
  // Client
  clientName: string;
  clientPosition: string;
  clientPhone: string;
  clientEmail: string;
  installationAddress: string;
  // Work
  descriptionOfWork: string;
  workItems: WorkItem[];
  // Materials
  materialsUsed: MaterialItem[];
  // Outstanding work
  hasOutstandingWork: boolean;
  outstandingWorkDescription: string;
  outstandingWorkReason: string;
  // Confirmation
  allWorkCompleted: boolean;
  testedSatisfactory: boolean;
  areaLeftSafe: boolean;
  clientInstructed: boolean;
  certificateIssued: boolean;
  certificateType: string;
  warningLabelsApplied: boolean;
  // Handover
  manualsProvided: boolean;
  asBuiltDrawingsProvided: boolean;
  spareKeysProvided: boolean;
  operatingInstructionsGiven: boolean;
  // Warranty
  workmanshipWarrantyPeriod: string;
  manufacturerWarrantyDetails: string;
  // Next actions
  nextRecommendedAction: string;
  nextActionDate: string;
  // Signatures
  inspectorSignature: string;
  clientSignature: string;
  clientRefusedToSign: boolean;
  photos: string[];
  notes: string;
}

const newWorkItem = (): WorkItem => ({ id: crypto.randomUUID(), description: '', location: '', completed: true });
const newMaterial = (): MaterialItem => ({ id: crypto.randomUUID(), description: '', quantity: '', manufacturer: '' });

const defaultData = (): CompletionData => ({
  referenceNumber: `COMP-${Date.now().toString(36).toUpperCase()}`,
  date: new Date().toISOString().split('T')[0],
  time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  linkedReportRef: '', workOrderRef: '',
  contractorName: '', contractorCompany: '', contractorPhone: '', contractorEmail: '',
  registrationScheme: '', registrationNumber: '',
  clientName: '', clientPosition: '', clientPhone: '', clientEmail: '', installationAddress: '',
  descriptionOfWork: '',
  workItems: [newWorkItem()],
  materialsUsed: [],
  hasOutstandingWork: false, outstandingWorkDescription: '', outstandingWorkReason: '',
  allWorkCompleted: false, testedSatisfactory: false, areaLeftSafe: false,
  clientInstructed: false, certificateIssued: false, certificateType: '',
  warningLabelsApplied: false,
  manualsProvided: false, asBuiltDrawingsProvided: false, spareKeysProvided: false, operatingInstructionsGiven: false,
  workmanshipWarrantyPeriod: '12 months', manufacturerWarrantyDetails: '',
  nextRecommendedAction: '', nextActionDate: '',
  inspectorSignature: '', clientSignature: '', clientRefusedToSign: false,
  photos: [], notes: '',
});

const DRAFT_KEY = 'elec-mate-draft-completion-notice';

const Section = ({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) => (
  <motion.section variants={itemVariants} className={cn('-mx-4 rounded-none border-y border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] sm:mx-0 sm:rounded-2xl sm:border-x p-4 sm:p-5 space-y-4', className)}>
    <h2 className="text-[15px] font-semibold tracking-tight text-white">{title}</h2>
    {children}
  </motion.section>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-[12px] font-medium text-white mb-1 block">{label}{required && ' *'}</Label>{children}</div>
);

const TickButton = ({ checked, label, tone = 'volt', onChange }: { checked: boolean; label: string; tone?: 'volt' | 'green'; onChange: () => void }) => (
  <button
    onClick={onChange}
    className={cn(
      'w-full flex items-center gap-3 p-3 rounded-xl border text-left touch-manipulation active:scale-[0.98] transition-all',
      checked
        ? tone === 'green'
          ? 'bg-green-500 border-green-500'
          : 'bg-elec-yellow border-elec-yellow'
        : 'bg-white/[0.06] border-white/[0.1]'
    )}
  >
    <span
      className={cn(
        'w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0',
        checked ? 'bg-black border-black' : 'border-white/30'
      )}
    >
      {checked && (
        <svg className={cn('w-3 h-3', tone === 'green' ? 'text-green-500' : 'text-elec-yellow')} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      )}
    </span>
    <span className={cn('text-sm', checked ? 'font-semibold text-black' : 'font-medium text-white')}>{label}</span>
  </button>
);

export default function CompletionNoticePage() {
  const navigate = useNavigate();
  const { id: editId } = useParams<{ id: string }>();
  const [isSaving, setIsSaving] = useState(false);
  const [existingReportId, setExistingReportId] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<CompletionData>(() => {
    const saved = storageGetJSONSync<Partial<CompletionData>>(DRAFT_KEY, null);
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const update = useCallback((field: keyof CompletionData, value: any) => { setData((prev) => ({ ...prev, [field]: value })); }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateWorkItem = useCallback((id: string, field: keyof WorkItem, value: any) => { setData((prev) => ({ ...prev, workItems: prev.workItems.map((w) => w.id === id ? { ...w, [field]: value } : w) })); }, []);
  const addWorkItem = () => setData((prev) => ({ ...prev, workItems: [...prev.workItems, newWorkItem()] }));
  const removeWorkItem = (id: string) => { if (data.workItems.length <= 1) return; setData((prev) => ({ ...prev, workItems: prev.workItems.filter((w) => w.id !== id) })); };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateMaterial = useCallback((id: string, field: keyof MaterialItem, value: any) => { setData((prev) => ({ ...prev, materialsUsed: prev.materialsUsed.map((m) => m.id === id ? { ...m, [field]: value } : m) })); }, []);
  const addMaterial = () => setData((prev) => ({ ...prev, materialsUsed: [...prev.materialsUsed, newMaterial()] }));
  const removeMaterial = (id: string) => setData((prev) => ({ ...prev, materialsUsed: prev.materialsUsed.filter((m) => m.id !== id) }));

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; if (!files) return; e.target.value = '';
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

  const handleSave = async () => {
    if (!data.descriptionOfWork.trim()) { toast.error('Please describe the work completed'); return; }
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error('Please sign in'); setIsSaving(false); return; }

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (existingReportId) { await reportCloud.updateReport(existingReportId, user.id, data as any); }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      else { const result = await reportCloud.createReport(user.id, 'completion-notice' as any, data as any); if (!result.success) { toast.error('Failed to save'); setIsSaving(false); return; } }

      toast.success('Saved — generating PDF...');
      const savedReportId = existingReportId || data.referenceNumber;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let company: Record<string, any> = {};
        try {
          const { data: cpData } = await supabase.rpc('get_my_company_profile');
          const cp = Array.isArray(cpData) ? cpData[0] : cpData;
          if (cp) company = cp;
        } catch { /* proceed without branding */ }

        const payload = formatCompletionNoticePayload(data, company);
        const { data: pdfResult, error: pdfError } = await supabase.functions.invoke(
          'generate-completion-notice-pdf',
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
            console.warn('[CompletionNotice] Permanent PDF storage failed, using temp URL:', storageErr);
            await supabase.from('reports').update({ pdf_url: permanentPdfUrl, pdf_generated_at: new Date().toISOString() }).eq('report_id', savedReportId);
          }

          const { openOrDownloadPdf } = await import('@/utils/pdf-download');
          await openOrDownloadPdf(permanentPdfUrl, `Completion-Notice-${data.referenceNumber}.pdf`);
          toast.success('Completion notice issued');
        }
      } catch (pdfErr) {
        console.error('PDF generation error:', pdfErr);
        toast.error('Saved but PDF generation failed');
      }

      storageRemoveSync(DRAFT_KEY);
      navigate(-1);
    } catch { toast.error('Failed to save'); } finally { setIsSaving(false); }
  };

  const completedCount = data.workItems.filter((w) => w.completed).length;

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <PageHeader
        eyebrow="General"
        title="Completion Notice"
        lead="Work complete."
        leadTone="success"
        description="Formally confirms the work described below has been completed, tested and the installation is safe for use."
        reference={data.referenceNumber}
      />


      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 lg:px-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4 mx-auto max-w-3xl lg:max-w-none xl:max-w-[1700px]">
        {/* Reference */}
        <Section title="Reference">
          <Field label="Record No."><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date"><Input type="date" value={data.date} onChange={(e) => update('date', e.target.value)} className={inputCn} /></Field>
            <Field label="Time"><Input type="time" value={data.time} onChange={(e) => update('time', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Linked Report Ref"><Input value={data.linkedReportRef} onChange={(e) => update('linkedReportRef', e.target.value)} className={inputCn} placeholder="e.g. EICR-2026-001" /></Field>
            <Field label="Work Order / Quote Ref"><Input value={data.workOrderRef} onChange={(e) => update('workOrderRef', e.target.value)} className={inputCn} placeholder="e.g. WO-1234" /></Field>
          </div>
        </Section>

        {/* Contractor */}
        <Section title="Contractor">
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

        {/* Client */}
        <Section title="Client">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Name"><Input value={data.clientName} onChange={(e) => update('clientName', e.target.value)} className={inputCn} /></Field>
            <Field label="Position"><Input value={data.clientPosition} onChange={(e) => update('clientPosition', e.target.value)} className={inputCn} placeholder="Homeowner, Landlord..." /></Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Phone"><Input type="tel" value={data.clientPhone} onChange={(e) => update('clientPhone', e.target.value)} className={inputCn} /></Field>
            <Field label="Email"><Input type="email" value={data.clientEmail} onChange={(e) => update('clientEmail', e.target.value)} className={inputCn} /></Field>
          </div>
          <Field label="Installation Address"><Input value={data.installationAddress} onChange={(e) => update('installationAddress', e.target.value)} className={inputCn} /></Field>
        </Section>

        {/* Work Completed */}
        <Section title="Work completed">
          <Field label="Description of Work" required>
            <Textarea value={data.descriptionOfWork} onChange={(e) => update('descriptionOfWork', e.target.value)} className={textareaCn} placeholder="Describe the work that was carried out..." />
          </Field>
        </Section>

        {/* Work Items Checklist */}
        <Section title="Work items" className="lg:col-span-2">
          <p className="text-[13px] text-white">{completedCount}/{data.workItems.length} items completed</p>
          {data.workItems.map((item, idx) => (
            <div key={item.id} className={cn('flex items-start gap-2', idx > 0 && 'border-t border-white/[0.08] pt-4')}>
              <button onClick={() => updateWorkItem(item.id, 'completed', !item.completed)} className={cn('w-6 h-6 mt-3 rounded border-2 flex items-center justify-center transition-all flex-shrink-0 touch-manipulation', item.completed ? 'bg-green-500 border-green-500' : 'border-white/30')}>
                {item.completed && <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
              </button>
              <div className="flex-1 space-y-2">
                <Input value={item.description} onChange={(e) => updateWorkItem(item.id, 'description', e.target.value)} className={cn(inputCn, item.completed && 'line-through opacity-70')} placeholder="Work item description" />
                <Input value={item.location} onChange={(e) => updateWorkItem(item.id, 'location', e.target.value)} className={inputCn} placeholder="Location" />
              </div>
              {data.workItems.length > 1 && (
                <button onClick={() => removeWorkItem(item.id)} className="h-11 px-2 mt-0.5 text-[13px] font-semibold text-red-400 hover:text-red-300 transition-colors touch-manipulation flex-shrink-0">Remove</button>
              )}
            </div>
          ))}
          <button onClick={addWorkItem} className="h-11 w-full rounded-xl border border-dashed border-white/[0.2] text-[13px] font-semibold text-white hover:border-white/[0.35] transition-all touch-manipulation active:scale-[0.98]">
            Add work item
          </button>
        </Section>

        {/* Materials Used */}
        <Section title="Key materials / components installed" className="lg:col-span-2">
          {data.materialsUsed.map((mat, idx) => (
            <div key={mat.id} className={cn('flex items-start gap-2', idx > 0 && 'border-t border-white/[0.08] pt-4')}>
              <div className="flex-1 space-y-2">
                <Input value={mat.description} onChange={(e) => updateMaterial(mat.id, 'description', e.target.value)} className={inputCn} placeholder="e.g. Hager 18th Edition CU, 6mm T&E" />
                <div className="grid grid-cols-2 gap-2">
                  <Input value={mat.quantity} onChange={(e) => updateMaterial(mat.id, 'quantity', e.target.value)} className={inputCn} placeholder="Qty" />
                  <Input value={mat.manufacturer} onChange={(e) => updateMaterial(mat.id, 'manufacturer', e.target.value)} className={inputCn} placeholder="Manufacturer" />
                </div>
              </div>
              <button onClick={() => removeMaterial(mat.id)} className="h-11 px-2 mt-0.5 text-[13px] font-semibold text-red-400 hover:text-red-300 transition-colors touch-manipulation flex-shrink-0">Remove</button>
            </div>
          ))}
          <button onClick={addMaterial} className="h-11 w-full rounded-xl border border-dashed border-white/[0.2] text-[13px] font-semibold text-white hover:border-white/[0.35] transition-all touch-manipulation active:scale-[0.98]">
            Add material
          </button>
        </Section>

        {/* Outstanding Work */}
        <Section title="Outstanding / remaining work">
          <TickButton checked={data.hasOutstandingWork} label="There is outstanding work that could not be completed" onChange={() => update('hasOutstandingWork', !data.hasOutstandingWork)} />
          {data.hasOutstandingWork && (
            <>
              <Field label="Description of Outstanding Work"><Textarea value={data.outstandingWorkDescription} onChange={(e) => update('outstandingWorkDescription', e.target.value)} className={textareaCn} placeholder="What work remains..." /></Field>
              <Field label="Reason"><Input value={data.outstandingWorkReason} onChange={(e) => update('outstandingWorkReason', e.target.value)} className={inputCn} placeholder="e.g. Parts on order, access required, client instruction" /></Field>
            </>
          )}
        </Section>

        {/* Confirmation Checklist */}
        <Section title="Confirmation">
          <div className="space-y-2">
            <TickButton checked={data.allWorkCompleted} tone="green" label="All work completed as described" onChange={() => update('allWorkCompleted', !data.allWorkCompleted)} />
            <TickButton checked={data.testedSatisfactory} tone="green" label="Installation tested and results satisfactory" onChange={() => update('testedSatisfactory', !data.testedSatisfactory)} />
            <TickButton checked={data.areaLeftSafe} tone="green" label="Work area left safe, clean, and tidy" onChange={() => update('areaLeftSafe', !data.areaLeftSafe)} />
            <TickButton checked={data.clientInstructed} tone="green" label="Client instructed on operation of new equipment" onChange={() => update('clientInstructed', !data.clientInstructed)} />
            <TickButton checked={data.warningLabelsApplied} tone="green" label="Warning labels and notices applied where required" onChange={() => update('warningLabelsApplied', !data.warningLabelsApplied)} />
            <TickButton checked={data.certificateIssued} tone="green" label="Certificate issued (EIC / Minor Works / EICR)" onChange={() => update('certificateIssued', !data.certificateIssued)} />
          </div>
          {data.certificateIssued && (
            <Field label="Certificate Type & Number"><Input value={data.certificateType} onChange={(e) => update('certificateType', e.target.value)} className={inputCn} placeholder="e.g. Minor Works MW-2026-001" /></Field>
          )}
        </Section>

        {/* Handover */}
        <Section title="Client handover">
          <div className="space-y-2">
            <TickButton checked={data.manualsProvided} label="Manuals and data sheets provided" onChange={() => update('manualsProvided', !data.manualsProvided)} />
            <TickButton checked={data.asBuiltDrawingsProvided} label="As-built drawings or circuit charts provided" onChange={() => update('asBuiltDrawingsProvided', !data.asBuiltDrawingsProvided)} />
            <TickButton checked={data.spareKeysProvided} label="Spare keys / access items handed over" onChange={() => update('spareKeysProvided', !data.spareKeysProvided)} />
            <TickButton checked={data.operatingInstructionsGiven} label="Operating instructions given to client" onChange={() => update('operatingInstructionsGiven', !data.operatingInstructionsGiven)} />
          </div>
        </Section>

        {/* Warranty */}
        <Section title="Warranty">
          <Field label="Workmanship Warranty Period">
            <select value={data.workmanshipWarrantyPeriod} onChange={(e) => update('workmanshipWarrantyPeriod', e.target.value)} className={cn(inputCn, 'w-full')}>
              <option value="6 months">6 months</option>
              <option value="12 months">12 months</option>
              <option value="24 months">24 months</option>
              <option value="36 months">36 months</option>
              <option value="N/A">N/A</option>
            </select>
          </Field>
          <Field label="Manufacturer Warranty Details"><Input value={data.manufacturerWarrantyDetails} onChange={(e) => update('manufacturerWarrantyDetails', e.target.value)} className={inputCn} placeholder="e.g. Hager 5yr CU warranty, 25yr cable warranty" /></Field>
        </Section>

        {/* Next Actions */}
        <Section title="Recommended next action" className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Next Recommended Action"><Input value={data.nextRecommendedAction} onChange={(e) => update('nextRecommendedAction', e.target.value)} className={inputCn} placeholder="e.g. EICR due in 5 years, RCD test every 6 months" /></Field>
            <Field label="Recommended By Date"><Input type="date" value={data.nextActionDate} onChange={(e) => update('nextActionDate', e.target.value)} className={inputCn} /></Field>
          </div>
        </Section>

        {/* Photos */}
        <Section title="Photos" className="lg:col-span-2">
          <input ref={photoInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoCapture} />
          <button onClick={() => photoInputRef.current?.click()} className="h-11 w-full rounded-xl border border-dashed border-white/[0.2] text-[13px] font-semibold text-white hover:border-white/[0.35] transition-all touch-manipulation active:scale-[0.98]">Add photos</button>
          {data.photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-6">
              {data.photos.map((photo, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                  <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                  <button onClick={() => setData((prev) => ({ ...prev, photos: prev.photos.filter((_, j) => j !== i) }))} className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center text-[15px] leading-none text-white touch-manipulation" aria-label={`Remove photo ${i + 1}`}>&times;</button>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Declaration & Signatures */}
        <Section title="Declaration" className="lg:col-span-2">
          <p className="text-[12.5px] text-white leading-relaxed">I hereby confirm that the electrical work described in this notice has been completed in accordance with BS 7671:2018+A3:2024 and is safe for continued use. Where applicable, the installation has been tested and the results are satisfactory.</p>
          <SignatureInput label="Contractor Signature" value={data.inspectorSignature} onChange={(sig) => update('inspectorSignature', sig || '')} />
          <TickButton checked={data.clientRefusedToSign} label="Client declined to sign" onChange={() => update('clientRefusedToSign', !data.clientRefusedToSign)} />
          {!data.clientRefusedToSign && <SignatureInput label="Client Signature" value={data.clientSignature} onChange={(sig) => update('clientSignature', sig || '')} />}
        </Section>

        {/* Notes */}
        <Section title="Notes" className="lg:col-span-2">
          <Textarea value={data.notes} onChange={(e) => update('notes', e.target.value)} className={textareaCn} placeholder="Additional notes, recommendations, follow-up work..." />
        </Section>

        {/* Actions */}
        <motion.div variants={itemVariants} className="flex flex-col gap-3 pt-2 sm:flex-row lg:justify-end lg:col-span-2 lg:pt-4">
          <button
            onClick={() => { storageSetJSONSync(DRAFT_KEY, data); toast.success('Draft saved'); }}
            className="h-12 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white hover:bg-white/[0.08] touch-manipulation sm:flex-1 lg:flex-none lg:px-8"
          >
            Save Draft
          </button>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black hover:bg-elec-yellow/90 active:scale-[0.99] touch-manipulation disabled:bg-white/[0.08] disabled:text-white/70 flex items-center justify-center sm:w-auto sm:flex-1 lg:flex-none lg:w-auto lg:px-10"
          >
            {isSaving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Saving...</> : existingReportId ? 'Update Notice' : 'Download PDF'}
          </button>
        </motion.div>
      </motion.main>
    </div>
  );
}
