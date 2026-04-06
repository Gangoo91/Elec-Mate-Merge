import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Plus, Trash2, Camera, X, Loader2 } from 'lucide-react';
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
import { formatLimitationNoticePayload } from '@/utils/limitation-notice-formatter';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };
const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const textareaCn = 'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

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

const Section = ({ title, accentColor, children }: { title: string; accentColor?: string; children: React.ReactNode }) => (
  <motion.section variants={itemVariants} className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div className={cn('h-[2px] w-full rounded-full bg-gradient-to-r mb-2', accentColor || 'from-blue-500 to-cyan-400')} />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
    </div>
    {children}
  </motion.section>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>{children}</div>
);

const TickButton = ({ checked, label, color = 'blue', onChange }: { checked: boolean; label: string; color?: 'blue' | 'emerald' | 'amber'; onChange: () => void }) => {
  const colors: Record<string, { bg: string; check: string; text: string }> = {
    blue: { bg: 'bg-blue-500/10 border-blue-500/25', check: 'bg-blue-500 border-blue-500', text: 'text-blue-400' },
    emerald: { bg: 'bg-emerald-500/10 border-emerald-500/25', check: 'bg-emerald-500 border-emerald-500', text: 'text-emerald-400' },
    amber: { bg: 'bg-amber-500/10 border-amber-500/25', check: 'bg-amber-500 border-amber-500 text-black', text: 'text-amber-400' },
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

  const update = useCallback((field: keyof LimitationData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

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
        await reportCloud.updateReport(existingReportId, user.id, data as any);
      } else {
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
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"><ArrowLeft className="h-5 w-5" /></Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20"><Zap className="h-4 w-4 text-blue-400" /></div>
              <h1 className="text-base font-semibold text-white">Limitation Notice</h1>
            </div>
          </div>
        </div>
      </div>

      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-5 max-w-3xl mx-auto">

        <motion.div variants={itemVariants} className="border-b border-blue-500/20 pb-3">
          <p className="text-sm font-bold text-blue-400">LIMITATION NOTICE — BS 7671 Section D</p>
          <p className="text-xs text-white mt-1">This notice formally records the extent and limitations of the inspection and testing, including the reasons for any limitations and with whom they were agreed. It accompanies the EICR or EIC to which it relates.</p>
        </motion.div>

        {/* Reference */}
        <Section title="Reference" accentColor="from-white/20 to-white/5">
          <Field label="Record No."><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date"><Input type="date" value={data.date} onChange={(e) => update('date', e.target.value)} className={inputCn} /></Field>
            <Field label="Linked Report Ref"><Input value={data.linkedReportRef} onChange={(e) => update('linkedReportRef', e.target.value)} className={inputCn} placeholder="e.g. EICR-2026-001" /></Field>
          </div>
        </Section>

        {/* Inspector */}
        <Section title="Inspector" accentColor="from-elec-yellow/40 to-amber-400/20">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name"><Input value={data.contractorName} onChange={(e) => update('contractorName', e.target.value)} className={inputCn} /></Field>
            <Field label="Company"><Input value={data.contractorCompany} onChange={(e) => update('contractorCompany', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Scheme"><Input value={data.registrationScheme} onChange={(e) => update('registrationScheme', e.target.value)} className={inputCn} placeholder="NICEIC, NAPIT..." /></Field>
            <Field label="Reg. No."><Input value={data.registrationNumber} onChange={(e) => update('registrationNumber', e.target.value)} className={inputCn} /></Field>
          </div>
        </Section>

        {/* Client */}
        <Section title="Client & Installation" accentColor="from-blue-500/40 to-cyan-400/20">
          <Field label="Client Name"><Input value={data.clientName} onChange={(e) => update('clientName', e.target.value)} className={inputCn} /></Field>
          <Field label="Installation Address"><Input value={data.installationAddress} onChange={(e) => update('installationAddress', e.target.value)} className={inputCn} /></Field>
        </Section>

        {/* Agreed With — BS 7671 requirement */}
        <Section title="Limitations Agreed With" accentColor="from-emerald-500/40 to-green-400/20">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name of person"><Input value={data.agreedWithName} onChange={(e) => update('agreedWithName', e.target.value)} className={inputCn} placeholder="Person ordering the report" /></Field>
            <Field label="Position"><Input value={data.agreedWithPosition} onChange={(e) => update('agreedWithPosition', e.target.value)} className={inputCn} placeholder="e.g. Landlord, Building Manager" /></Field>
          </div>
          <TickButton checked={data.agreedBeforeInspection} label="Limitations discussed and agreed before inspection commenced" color="emerald" onChange={() => update('agreedBeforeInspection', !data.agreedBeforeInspection)} />
        </Section>

        {/* Extent of Installation Covered */}
        <Section title="Extent of Installation Covered" accentColor="from-blue-500/40 to-cyan-400/20">
          <p className="text-xs text-white mb-2">Tick the parts of the installation that WERE inspected and tested:</p>
          <div className="space-y-2">
            {extentItems.map((item) => (
              <TickButton key={item.key} checked={data[item.key]} label={item.label} color="blue" onChange={() => update(item.key, !data[item.key])} />
            ))}
          </div>
        </Section>

        {/* Limitations — repeatable */}
        {data.limitations.map((lim, idx) => (
          <Section key={lim.id} title={`Limitation${data.limitations.length > 1 ? ` ${idx + 1}` : ''}`} accentColor="from-amber-500/40 to-yellow-400/20">
            {data.limitations.length > 1 && (
              <div className="flex justify-end -mt-2 mb-2">
                <button onClick={() => removeLimitation(lim.id)} className="h-8 w-8 rounded-lg flex items-center justify-center text-white hover:text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation"><Trash2 className="h-4 w-4" /></button>
              </div>
            )}

            {/* Type + Code selectors */}
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-white text-xs mb-1.5 block">Type</Label>
                <div className="flex gap-2">
                  <button onClick={() => updateLimitation(lim.id, 'type', 'agreed')} className={cn('flex-1 h-10 rounded-lg text-xs font-semibold touch-manipulation transition-all', lim.type === 'agreed' ? 'bg-blue-500 text-white' : 'bg-white/[0.06] text-white border border-white/[0.08]')}>Agreed</button>
                  <button onClick={() => updateLimitation(lim.id, 'type', 'operational')} className={cn('flex-1 h-10 rounded-lg text-xs font-semibold touch-manipulation transition-all', lim.type === 'operational' ? 'bg-amber-500 text-black' : 'bg-white/[0.06] text-white border border-white/[0.08]')}>Operational</button>
                </div>
              </div>
              <div>
                <Label className="text-white text-xs mb-1.5 block">Code</Label>
                <div className="flex gap-2">
                  <button onClick={() => updateLimitation(lim.id, 'code', 'LIM')} className={cn('flex-1 h-10 rounded-lg text-xs font-semibold touch-manipulation transition-all', lim.code === 'LIM' ? 'bg-blue-500 text-white' : 'bg-white/[0.06] text-white border border-white/[0.08]')}>LIM</button>
                  <button onClick={() => updateLimitation(lim.id, 'code', 'NV')} className={cn('flex-1 h-10 rounded-lg text-xs font-semibold touch-manipulation transition-all', lim.code === 'NV' ? 'bg-orange-500 text-white' : 'bg-white/[0.06] text-white border border-white/[0.08]')}>NV</button>
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
              <button onClick={() => setShowReasonPicker(showReasonPicker === lim.id ? null : lim.id)} className="text-[11px] font-medium text-blue-400 touch-manipulation mb-2">
                {showReasonPicker === lim.id ? 'Hide common reasons' : 'Select common reason'}
              </button>
              {showReasonPicker === lim.id && (
                <div className="space-y-3">
                  {reasonCategories.map((cat) => (
                    <div key={cat.title}>
                      <p className="text-[10px] font-semibold text-white uppercase tracking-wider mb-1.5">{cat.title}</p>
                      <div className="space-y-1">
                        {cat.reasons.map((reason) => (
                          <button key={reason} onClick={() => { updateLimitation(lim.id, 'reason', reason); setShowReasonPicker(null); }} className="w-full text-left text-xs text-white p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] touch-manipulation active:scale-[0.98] transition-all">
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

        <motion.div variants={itemVariants}>
          <button onClick={addLimitation} className="w-full h-11 rounded-xl border-2 border-dashed border-blue-500/20 flex items-center justify-center gap-2 text-sm font-medium text-blue-400 touch-manipulation active:scale-[0.98] hover:border-blue-500/30 hover:bg-blue-500/5 transition-all">
            <Plus className="h-4 w-4" /> Add Another Limitation
          </button>
        </motion.div>

        {/* Risk Statement */}
        <Section title="Risk Statement" accentColor="from-red-500/40 to-orange-400/20">
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5">
            <p className="text-xs text-white leading-relaxed">{data.riskStatement}</p>
          </div>
        </Section>

        {/* Photos */}
        <Section title="Photo Evidence" accentColor="from-cyan-500/40 to-blue-400/20">
          <input ref={photoInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoCapture} />
          <button onClick={() => photoInputRef.current?.click()} className="w-full h-12 rounded-xl border-2 border-dashed border-white/[0.15] flex items-center justify-center gap-2.5 text-sm text-white touch-manipulation active:scale-[0.98]"><Camera className="h-4 w-4" /> Add Photos</button>
          {data.photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {data.photos.map((photo, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                  <img src={photo} alt={`Evidence ${i + 1}`} className="w-full h-full object-cover" />
                  <button onClick={() => setData((prev) => ({ ...prev, photos: prev.photos.filter((_, j) => j !== i) }))} className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center touch-manipulation"><X className="h-3.5 w-3.5 text-white" /></button>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Signatures */}
        <Section title="Declaration" accentColor="from-elec-yellow/40 to-amber-400/20">
          <SignatureInput label="Inspector Signature" value={data.inspectorSignature} onChange={(sig) => update('inspectorSignature', sig || '')} />
          <SignatureInput label="Client / Person Ordering Report (optional)" value={data.clientSignature} onChange={(sig) => update('clientSignature', sig || '')} />
        </Section>

        {/* Notes */}
        <Section title="Notes" accentColor="from-white/20 to-white/5">
          <Textarea value={data.notes} onChange={(e) => update('notes', e.target.value)} className={textareaCn} placeholder="Additional notes..." />
        </Section>

        {/* Actions */}
        <motion.div variants={itemVariants} className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 h-12 text-sm font-medium touch-manipulation active:scale-[0.98] border-white/[0.08] text-white hover:bg-white/[0.06]" onClick={() => { storageSetJSONSync(DRAFT_KEY, data); toast.success('Draft saved'); }}>Save Draft</Button>
          <Button className="flex-1 h-12 text-sm font-medium touch-manipulation active:scale-[0.98] bg-blue-500 text-white hover:bg-blue-600" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Saving...</> : existingReportId ? 'Update Notice' : 'Download PDF'}
          </Button>
        </motion.div>
      </motion.main>
    </div>
  );
}
