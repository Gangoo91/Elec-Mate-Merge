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
import { formatLimitationNoticePayload } from '@/utils/limitation-notice-formatter';

/*
 * Page styling comes from the shared kit. These were local copies that had
 * drifted from every other Notices & Labels page — see components/forms/pageStyles.
 */
import { pageInputCn as inputCn, pageTextareaCn as textareaCn } from '@/components/forms/pageStyles';

import { PageHeader } from '@/components/forms/PageHeader';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };
// --- Types ---

interface LimitationEntry {
  id: string;
  type: 'agreed' | 'operational';
  code: 'LIM' | 'NV';
  area: string;
  circuitRef: string;
  reason: string;
  impact: string;
  returnVisitCondition: string;
}

interface LimitationData {
  referenceNumber: string;
  date: string;
  linkedReportRef: string;
  linkedReportType: string;
  // Contractor
  contractorName: string;
  contractorCompany: string;
  contractorPhone: string;
  contractorEmail: string;
  registrationScheme: string;
  registrationNumber: string;
  // Client
  clientName: string;
  installationAddress: string;
  // Agreed with
  agreedWithName: string;
  agreedWithPosition: string;
  agreedBeforeInspection: boolean;
  // Extent of installation covered
  extentConsumerUnit: boolean;
  extentLighting: boolean;
  extentSockets: boolean;
  extentFixedEquipment: boolean;
  extentExternal: boolean;
  extentOutbuildings: boolean;
  extentFireAlarm: boolean;
  extentEmergencyLighting: boolean;
  extentEarthingBonding: boolean;
  extentSmokeAlarms: boolean;
  // Limitations
  limitations: LimitationEntry[];
  // Risk statement
  riskStatement: string;
  // Signatures
  inspectorSignature: string;
  clientSignature: string;
  notes: string;
  photos: string[];
}

const newLimitation = (): LimitationEntry => ({
  id: crypto.randomUUID(),
  type: 'agreed',
  code: 'LIM',
  area: '',
  circuitRef: '',
  reason: '',
  impact: '',
  returnVisitCondition: '',
});

const defaultData = (): LimitationData => ({
  referenceNumber: `LIM-${Date.now().toString(36).toUpperCase()}`,
  date: new Date().toISOString().split('T')[0],
  linkedReportRef: '', linkedReportType: 'eicr',
  contractorName: '', contractorCompany: '', contractorPhone: '', contractorEmail: '',
  registrationScheme: '', registrationNumber: '',
  clientName: '', installationAddress: '',
  agreedWithName: '', agreedWithPosition: '', agreedBeforeInspection: false,
  extentConsumerUnit: true, extentLighting: true, extentSockets: true,
  extentFixedEquipment: true, extentExternal: false, extentOutbuildings: false,
  extentFireAlarm: false, extentEmergencyLighting: false,
  extentEarthingBonding: true, extentSmokeAlarms: false,
  limitations: [newLimitation()],
  riskStatement: 'The inspection and testing detailed in the associated report is subject to the limitations recorded above. Defects may exist in parts of the installation that have not been inspected or tested. The overall condition of the installation cannot be fully assessed where limitations apply.',
  inspectorSignature: '', clientSignature: '',
  notes: '', photos: [],
});

const DRAFT_KEY = 'elec-mate-draft-limitation-notice';

// Categorised common reasons
const reasonCategories = [
  {
    title: 'Access',
    reasons: [
      'Locked room — keyholder not present at time of inspection',
      'Furniture / storage preventing access to sockets, switches, or wiring',
      'Loft space inaccessible — no boarding, no safe access, or no loft hatch',
      'Ceiling void inaccessible — no access panels or safe access',
      'Floor void inaccessible — flooring cannot be lifted without damage',
      'External areas inaccessible — height, scaffolding required',
    ],
  },
  {
    title: 'Operational',
    reasons: [
      'Circuit(s) could not be isolated — operational requirements prevent shutdown',
      'Business trading hours — full isolation not possible during opening hours',
      'Equipment in use — could not be disconnected without disruption to operations',
      'Live working not permitted on site — safe isolation not achievable',
      'IT / server equipment — client instructed not to isolate data circuits',
    ],
  },
  {
    title: 'Safety',
    reasons: [
      'Asbestos suspected — specialist survey required before access',
      'Water damage / flooding — unsafe to access or test',
      'Structural concern — unsafe to access ceiling / floor void',
      'Exposed live parts — made safe but further investigation needed',
    ],
  },
  {
    title: 'Client Instruction',
    reasons: [
      'Client instructed not to test specific circuits',
      'Client instructed not to disturb tenants in occupied areas',
      'Time constraints — client limited inspection to agreed duration',
      'Concealed wiring — client declined destructive investigation',
    ],
  },
];

const extentItems = [
  { key: 'extentConsumerUnit' as const, label: 'Consumer unit / distribution boards' },
  { key: 'extentLighting' as const, label: 'Lighting circuits' },
  { key: 'extentSockets' as const, label: 'Socket outlet circuits' },
  { key: 'extentFixedEquipment' as const, label: 'Fixed equipment (cooker, shower, immersion)' },
  { key: 'extentExternal' as const, label: 'External installation' },
  { key: 'extentOutbuildings' as const, label: 'Outbuildings / garages' },
  { key: 'extentFireAlarm' as const, label: 'Fire alarm system' },
  { key: 'extentEmergencyLighting' as const, label: 'Emergency lighting' },
  { key: 'extentEarthingBonding' as const, label: 'Earthing & bonding' },
  { key: 'extentSmokeAlarms' as const, label: 'Smoke / heat / CO alarms' },
];

// --- Reusable components ---

const Section = ({ title, action, className, children }: { title: string; action?: React.ReactNode; className?: string; children: React.ReactNode }) => (
  <motion.section variants={itemVariants} className={cn('-mx-4 rounded-none border-y border-white/[0.12] bg-gradient-to-b from-white/[0.07] to-white/[0.03] sm:mx-0 sm:rounded-2xl sm:border-x p-4 sm:p-5 space-y-4', className)}>
    <div className="flex items-center justify-between gap-3">
      <h2 className="text-[15px] font-semibold tracking-tight text-white">{title}</h2>
      {action}
    </div>
    {children}
  </motion.section>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-[12px] font-medium text-white mb-1 block">{label}{required && ' *'}</Label>{children}</div>
);

const TickButton = ({ checked, label, onChange }: { checked: boolean; label: string; onChange: () => void }) => (
  <button onClick={onChange} className={cn('w-full min-h-[44px] flex items-center gap-3 p-3 rounded-xl border text-left touch-manipulation active:scale-[0.98] transition-all', checked ? 'bg-elec-yellow border-elec-yellow' : 'bg-white/[0.06] border-white/[0.1]')}>
    <div className={cn('w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0', checked ? 'bg-black border-black' : 'border-white/30')}>
      {checked && <svg className="w-3 h-3 text-elec-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
    </div>
    <span className={cn('text-sm', checked ? 'font-semibold text-black' : 'font-medium text-white')}>{label}</span>
  </button>
);

const chipCn = (selected: boolean) => cn(
  'flex-1 h-11 rounded-lg text-[13px] touch-manipulation transition-all',
  selected ? 'bg-elec-yellow border border-elec-yellow text-black font-semibold' : 'bg-white/[0.06] border border-white/[0.1] text-white font-medium'
);

// --- Main component ---

export default function LimitationNoticePage() {
  const navigate = useNavigate();
  const { id: editId } = useParams<{ id: string }>();
  const [isSaving, setIsSaving] = useState(false);
  const [existingReportId, setExistingReportId] = useState<string | null>(null);
  const [showReasonPicker, setShowReasonPicker] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<LimitationData>(() => {
    const saved = storageGetJSONSync<Partial<LimitationData>>(DRAFT_KEY, null);
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
  const update = useCallback((field: keyof LimitationData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const updateLimitation = useCallback((id: string, field: keyof LimitationEntry, value: any) => {
    setData((prev) => ({ ...prev, limitations: prev.limitations.map((l) => l.id === id ? { ...l, [field]: value } : l) }));
  }, []);

  const addLimitation = () => setData((prev) => ({ ...prev, limitations: [...prev.limitations, newLimitation()] }));

  const removeLimitation = (id: string) => {
    if (data.limitations.length <= 1) return;
    setData((prev) => ({ ...prev, limitations: prev.limitations.filter((l) => l.id !== id) }));
  };

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

  const handleSave = async () => {
    if (!data.limitations.some((l) => l.area.trim())) { toast.error('Please specify at least one limitation'); return; }
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error('Please sign in'); setIsSaving(false); return; }
      if (existingReportId) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await reportCloud.updateReport(existingReportId, user.id, data as any);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await reportCloud.createReport(user.id, 'limitation-notice' as any, data as any);
        if (!result.success) { toast.error('Failed to save'); setIsSaving(false); return; }
      }
      // Generate PDF
      toast.success('Saved — generating PDF...');
      const savedReportId = existingReportId || data.referenceNumber;
      try {
        const payload = formatLimitationNoticePayload(data);
        const { data: pdfResult, error: pdfError } = await supabase.functions.invoke('generate-limitation-notice-pdf', { body: { formData: payload } });
        if (pdfError) {
          console.error('PDF error:', pdfError);
          toast.error('Saved but PDF generation failed');
        } else if (pdfResult?.download_url) {
          let permanentPdfUrl = pdfResult.download_url;
          try {
            const { saveCertificatePdf } = await import('@/utils/certificate-pdf-storage');
            const { permanentUrl, storagePath } = await saveCertificatePdf(pdfResult.download_url, (await supabase.auth.getUser()).data.user!.id, savedReportId, data.referenceNumber);
            permanentPdfUrl = permanentUrl;
            await supabase.from('reports').update({ storage_path: storagePath, pdf_url: permanentPdfUrl, pdf_generated_at: new Date().toISOString() }).eq('report_id', savedReportId);
          } catch (e) { console.warn('Storage failed:', e); }
          const { openOrDownloadPdf } = await import('@/utils/pdf-download');
          await openOrDownloadPdf(permanentPdfUrl, `Limitation-Notice-${data.referenceNumber}.pdf`);
          toast.success('Limitation notice issued');
        }
      } catch (e) { console.error('PDF error:', e); toast.error('Saved but PDF failed'); }

      storageRemoveSync(DRAFT_KEY);
      navigate(-1);
    } catch { toast.error('Failed to save'); } finally { setIsSaving(false); }
  };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <PageHeader
        eyebrow="BS 7671"
        title="Limitation Notice"
        lead="BS 7671 Section D."
        description="Records the extent and limitations of inspection and testing, the reasons for them, and with whom they were agreed — accompanies the related EICR or EIC."
        reference={data.referenceNumber}
      />


      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-5 mx-auto max-w-3xl lg:max-w-none xl:max-w-[1700px] lg:px-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">

        {/* Reference */}
        <Section title="Reference">
          <Field label="Record No."><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Date"><Input type="date" value={data.date} onChange={(e) => update('date', e.target.value)} className={inputCn} /></Field>
            <Field label="Linked Report Ref"><Input value={data.linkedReportRef} onChange={(e) => update('linkedReportRef', e.target.value)} className={inputCn} placeholder="e.g. EICR-2026-001" /></Field>
          </div>
        </Section>

        {/* Inspector */}
        <Section title="Inspector">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Name"><Input value={data.contractorName} onChange={(e) => update('contractorName', e.target.value)} className={inputCn} /></Field>
            <Field label="Company"><Input value={data.contractorCompany} onChange={(e) => update('contractorCompany', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Scheme"><Input value={data.registrationScheme} onChange={(e) => update('registrationScheme', e.target.value)} className={inputCn} placeholder="NICEIC, NAPIT..." /></Field>
            <Field label="Reg. No."><Input value={data.registrationNumber} onChange={(e) => update('registrationNumber', e.target.value)} className={inputCn} /></Field>
          </div>
        </Section>

        {/* Client */}
        <Section title="Client & installation">
          <Field label="Client Name"><Input value={data.clientName} onChange={(e) => update('clientName', e.target.value)} className={inputCn} /></Field>
          <Field label="Installation Address"><Input value={data.installationAddress} onChange={(e) => update('installationAddress', e.target.value)} className={inputCn} /></Field>
        </Section>

        {/* Agreed With — BS 7671 requirement */}
        <Section title="Limitations agreed with">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Name of person"><Input value={data.agreedWithName} onChange={(e) => update('agreedWithName', e.target.value)} className={inputCn} placeholder="Person ordering the report" /></Field>
            <Field label="Position"><Input value={data.agreedWithPosition} onChange={(e) => update('agreedWithPosition', e.target.value)} className={inputCn} placeholder="e.g. Landlord, Building Manager" /></Field>
          </div>
          <TickButton checked={data.agreedBeforeInspection} label="Limitations discussed and agreed before inspection commenced" onChange={() => update('agreedBeforeInspection', !data.agreedBeforeInspection)} />
        </Section>

        {/* Extent of Installation Covered */}
        <Section title="Extent of installation covered" className="lg:col-span-2">
          <p className="text-[12.5px] text-white">Tick the parts of the installation that WERE inspected and tested:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {extentItems.map((item) => (
              <TickButton key={item.key} checked={data[item.key]} label={item.label} onChange={() => update(item.key, !data[item.key])} />
            ))}
          </div>
        </Section>

        {/* Limitations — repeatable */}
        {data.limitations.map((lim, idx) => (
          <Section
            key={lim.id}
            className="lg:col-span-2"
            title={`Limitation${data.limitations.length > 1 ? ` ${idx + 1}` : ''}`}
            action={data.limitations.length > 1 ? (
              <button onClick={() => removeLimitation(lim.id)} className="h-11 px-2 text-[13px] font-semibold text-red-400 hover:text-red-300 transition-colors touch-manipulation">Remove</button>
            ) : undefined}
          >
            {/* Type + Code selectors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <Label className="text-[12px] font-medium text-white mb-1 block">Type</Label>
                <div className="flex gap-2">
                  <button onClick={() => updateLimitation(lim.id, 'type', 'agreed')} className={chipCn(lim.type === 'agreed')}>Agreed</button>
                  <button onClick={() => updateLimitation(lim.id, 'type', 'operational')} className={chipCn(lim.type === 'operational')}>Operational</button>
                </div>
              </div>
              <div>
                <Label className="text-[12px] font-medium text-white mb-1 block">Code</Label>
                <div className="flex gap-2">
                  <button onClick={() => updateLimitation(lim.id, 'code', 'LIM')} className={chipCn(lim.code === 'LIM')}>LIM</button>
                  <button onClick={() => updateLimitation(lim.id, 'code', 'NV')} className={chipCn(lim.code === 'NV')}>NV</button>
                </div>
              </div>
            </div>

            <Field label="Area / Location Not Inspected" required>
              <Input value={lim.area} onChange={(e) => updateLimitation(lim.id, 'area', e.target.value)} className={inputCn} placeholder="e.g. First floor bedroom 2, loft space" />
            </Field>

            <Field label="Circuit / Zone Reference">
              <Input value={lim.circuitRef} onChange={(e) => updateLimitation(lim.id, 'circuitRef', e.target.value)} className={inputCn} placeholder="e.g. Circuit 5, Zone 3, DB2" />
            </Field>

            <Field label="Reason">
              <Textarea value={lim.reason} onChange={(e) => updateLimitation(lim.id, 'reason', e.target.value)} className={textareaCn} placeholder="Why this area could not be inspected..." />
            </Field>

            {/* Categorised reason picker */}
            <div>
              <button onClick={() => setShowReasonPicker(showReasonPicker === lim.id ? null : lim.id)} className="h-11 text-[13px] font-semibold text-elec-yellow transition-colors hover:text-elec-yellow/80 touch-manipulation">
                {showReasonPicker === lim.id ? 'Hide common reasons' : 'Select common reason'}
              </button>
              {showReasonPicker === lim.id && (
                <div className="space-y-3 mt-1">
                  {reasonCategories.map((cat) => (
                    <div key={cat.title}>
                      <p className="text-[13px] font-semibold text-white mb-1.5">{cat.title}</p>
                      <div className="space-y-1">
                        {cat.reasons.map((reason) => (
                          <button key={reason} onClick={() => { updateLimitation(lim.id, 'reason', reason); setShowReasonPicker(null); }} className="w-full min-h-[44px] text-left text-[13px] text-white p-2.5 rounded-lg bg-white/[0.06] border border-white/[0.1] hover:bg-white/[0.08] touch-manipulation active:scale-[0.98] transition-all">
                            {reason}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <Field label="Impact on Report">
              <Input value={lim.impact} onChange={(e) => updateLimitation(lim.id, 'impact', e.target.value)} className={inputCn} placeholder="e.g. Unable to confirm condition of concealed wiring" />
            </Field>

            <Field label="Recommend Return Visit When">
              <Input value={lim.returnVisitCondition} onChange={(e) => updateLimitation(lim.id, 'returnVisitCondition', e.target.value)} className={inputCn} placeholder="e.g. Access available, furniture removed, tenant absent" />
            </Field>
          </Section>
        ))}

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <button onClick={addLimitation} className="h-11 w-full rounded-xl border border-dashed border-white/[0.2] text-[13px] font-semibold text-white hover:border-white/[0.35] touch-manipulation active:scale-[0.98] transition-all">
            Add Another Limitation
          </button>
        </motion.div>

        {/* Risk Statement */}
        <Section title="Risk statement" className="lg:col-span-2">
          <p className="text-[13px] text-white/80 leading-relaxed">{data.riskStatement}</p>
        </Section>

        {/* Photos */}
        <Section title="Photo evidence" className="lg:col-span-2">
          <input ref={photoInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoCapture} />
          <button onClick={() => photoInputRef.current?.click()} className="h-11 w-full rounded-xl border border-dashed border-white/[0.2] text-[13px] font-semibold text-white hover:border-white/[0.35] touch-manipulation active:scale-[0.98] transition-all">Add photos</button>
          {data.photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {data.photos.map((photo, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                  <img src={photo} alt={`Evidence ${i + 1}`} className="w-full h-full object-cover" />
                  <button onClick={() => setData((prev) => ({ ...prev, photos: prev.photos.filter((_, j) => j !== i) }))} className="absolute top-1.5 right-1.5 h-8 w-8 rounded-full bg-black/60 flex items-center justify-center text-[15px] font-semibold text-red-400 touch-manipulation" aria-label={`Remove photo ${i + 1}`}>×</button>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Signatures */}
        <Section title="Declaration" className="lg:col-span-2">
          <SignatureInput label="Inspector Signature" value={data.inspectorSignature} onChange={(sig) => update('inspectorSignature', sig || '')} />
          <SignatureInput label="Client / Person Ordering Report (optional)" value={data.clientSignature} onChange={(sig) => update('clientSignature', sig || '')} />
        </Section>

        {/* Notes */}
        <Section title="Notes" className="lg:col-span-2">
          <Textarea value={data.notes} onChange={(e) => update('notes', e.target.value)} className={textareaCn} placeholder="Additional notes..." />
        </Section>

        {/* Actions */}
        <motion.div variants={itemVariants} className="flex gap-3 pt-2 lg:justify-end lg:col-span-2">
          <button className="flex-1 h-12 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white hover:bg-white/[0.08] touch-manipulation active:scale-[0.99] transition-all lg:flex-none lg:px-10" onClick={() => { storageSetJSONSync(DRAFT_KEY, data); toast.success('Draft saved'); }}>Save Draft</button>
          <button className="flex-1 h-12 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.99] transition-all disabled:bg-white/[0.08] disabled:text-white/70 lg:flex-none lg:px-10 inline-flex items-center justify-center" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Saving...</> : existingReportId ? 'Update Notice' : 'Download PDF'}
          </button>
        </motion.div>
      </motion.main>
    </div>
  );
}
