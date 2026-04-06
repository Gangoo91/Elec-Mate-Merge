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
import { formatNonComplianceNoticePayload } from '@/utils/non-compliance-notice-formatter';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };
const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const textareaCn = 'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

interface NonComplianceItem {
  id: string;
  description: string;
  location: string;
  standardRef: string;
  severity: 'critical' | 'major' | 'minor';
  remedialAction: string;
}

interface NonComplianceData {
  referenceNumber: string;
  date: string;
  linkedServiceRef: string;
  // System
  systemType: string;
  systemCategory: string;
  categoryRequired: string;
  panelMake: string;
  panelModel: string;
  systemAge: string;
  numberOfZones: string;
  numberOfDevices: string;
  // System Status
  zonesIsolated: string;
  outstandingFaults: string;
  lastServiceDate: string;
  arcMonitored: boolean;
  arcAffected: boolean;
  arcProvider: string;
  hasCertificates: boolean;
  certificateDetails: string;
  fireRiskAssessmentRef: string;
  // Inspector
  contractorName: string;
  contractorCompany: string;
  contractorPhone: string;
  contractorEmail: string;
  registrationScheme: string;
  registrationNumber: string;
  // Client / Responsible Person
  clientName: string;
  clientPosition: string;
  clientPhone: string;
  clientEmail: string;
  installationAddress: string;
  buildingType: string;
  numberOfFloors: string;
  sleepingAccommodation: boolean;
  // Items
  items: NonComplianceItem[];
  // Assessment
  immediateActionRequired: boolean;
  systemSafe: boolean;
  buildingCanBeOccupied: boolean;
  fireServiceNotified: boolean;
  insuranceAffected: boolean;
  timeframeForRemedial: string;
  remedialDeadline: string;
  followUpDate: string;
  temporaryMeasures: string;
  copyDistribution: string;
  // Signatures
  inspectorSignature: string;
  clientSignature: string;
  clientRefusedToSign: boolean;
  photos: string[];
  notes: string;
}

const newItem = (): NonComplianceItem => ({
  id: crypto.randomUUID(), description: '', location: '', standardRef: '', severity: 'major', remedialAction: '',
});

const defaultData = (): NonComplianceData => ({
  referenceNumber: `NCN-${Date.now().toString(36).toUpperCase()}`,
  date: new Date().toISOString().split('T')[0],
  linkedServiceRef: '',
  systemType: 'Fire Detection & Alarm', systemCategory: '', categoryRequired: '',
  panelMake: '', panelModel: '', systemAge: '', numberOfZones: '', numberOfDevices: '',
  zonesIsolated: '', outstandingFaults: '', lastServiceDate: '',
  arcMonitored: false, arcAffected: false, arcProvider: '',
  hasCertificates: false, certificateDetails: '', fireRiskAssessmentRef: '',
  contractorName: '', contractorCompany: '', contractorPhone: '', contractorEmail: '',
  registrationScheme: '', registrationNumber: '',
  clientName: '', clientPosition: '', clientPhone: '', clientEmail: '',
  installationAddress: '', buildingType: '', numberOfFloors: '', sleepingAccommodation: false,
  items: [newItem()],
  immediateActionRequired: false, systemSafe: true, buildingCanBeOccupied: true,
  fireServiceNotified: false, insuranceAffected: false,
  timeframeForRemedial: '', remedialDeadline: '', followUpDate: '', temporaryMeasures: '', copyDistribution: '',
  inspectorSignature: '', clientSignature: '', clientRefusedToSign: false,
  photos: [], notes: '',
});

const DRAFT_KEY = 'elec-mate-draft-non-compliance';

const commonNonCompliance = [
  { desc: 'System category does not match fire risk assessment recommendation', ref: 'BS 5839-1 Cl. 8' },
  { desc: 'Zones isolated/disabled with no temporary measures in place', ref: 'BS 5839-1 Cl. 25.2' },
  { desc: 'Detectors missing or removed — coverage gaps in protected areas', ref: 'BS 5839-1 Cl. 22' },
  { desc: 'Overdue servicing — last service more than 7 months ago', ref: 'BS 5839-1 Cl. 25.1' },
  { desc: 'Fire doors wedged or held open without automatic release', ref: 'RRO 2005 Art. 17' },
  { desc: 'Sounder levels insufficient — alarm not audible in all areas', ref: 'BS 5839-1 Cl. 16' },
  { desc: 'Call points obstructed, painted over, or inaccessible', ref: 'BS 5839-1 Cl. 15' },
  { desc: 'Zone chart missing, outdated, or does not reflect current layout', ref: 'BS 5839-1 Cl. 25.2' },
  { desc: 'Panel showing fault conditions — no action taken by responsible person', ref: 'BS 5839-1 Cl. 25.2' },
  { desc: 'No fire alarm log book maintained', ref: 'RRO 2005 Art. 9' },
  { desc: 'Weekly testing not being conducted or not recorded', ref: 'BS 5839-1 Cl. 25.2' },
  { desc: 'Standby batteries failed or not replaced', ref: 'BS 5839-1 Cl. 25.2' },
  { desc: 'Heat detectors installed in sleeping areas (smoke required)', ref: 'BS 5839-1:2025' },
  { desc: 'No valid installation/commissioning certificate (G1/G2)', ref: 'BS 5839-1 Annex G' },
  { desc: 'Modifications made without certificate of extension', ref: 'BS 5839-1:2025' },
];

const Section = ({ title, accentColor, children }: { title: string; accentColor?: string; children: React.ReactNode }) => (
  <motion.section variants={itemVariants} className="space-y-4">
    <div className="border-b border-white/[0.06] pb-1 mb-3">
      <div className={cn('h-[2px] w-full rounded-full bg-gradient-to-r mb-2', accentColor || 'from-red-500 to-orange-400')} />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
    </div>
    {children}
  </motion.section>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>{children}</div>
);

const TickButton = ({ checked, label, color = 'red', onChange }: { checked: boolean; label: string; color?: 'red' | 'emerald' | 'amber' | 'blue'; onChange: () => void }) => {
  const colors: Record<string, { bg: string; check: string; text: string }> = {
    red: { bg: 'bg-red-500/10 border-red-500/25', check: 'bg-red-500 border-red-500', text: 'text-red-400' },
    emerald: { bg: 'bg-emerald-500/10 border-emerald-500/25', check: 'bg-emerald-500 border-emerald-500', text: 'text-emerald-400' },
    amber: { bg: 'bg-amber-500/10 border-amber-500/25', check: 'bg-amber-500 border-amber-500 text-black', text: 'text-amber-400' },
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

export default function NonComplianceNoticePage() {
  const navigate = useNavigate();
  const { id: editId } = useParams<{ id: string }>();
  const [isSaving, setIsSaving] = useState(false);
  const [existingReportId, setExistingReportId] = useState<string | null>(null);
  const [showPresets, setShowPresets] = useState<string | null>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<NonComplianceData>(() => {
    const saved = storageGetJSONSync<Partial<NonComplianceData>>(DRAFT_KEY, null);
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

  const update = useCallback((field: keyof NonComplianceData, value: any) => { setData((prev) => ({ ...prev, [field]: value })); }, []);
  const updateItem = useCallback((id: string, field: keyof NonComplianceItem, value: any) => { setData((prev) => ({ ...prev, items: prev.items.map((i) => i.id === id ? { ...i, [field]: value } : i) })); }, []);
  const addItem = () => setData((prev) => ({ ...prev, items: [...prev.items, newItem()] }));
  const removeItem = (id: string) => { if (data.items.length <= 1) return; setData((prev) => ({ ...prev, items: prev.items.filter((i) => i.id !== id) })); };

  const handlePhotoCapture = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files; if (!files) return; e.target.value = '';
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
          setData((prev) => ({ ...prev, photos: [...prev.photos, compressed] }));
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    if (!data.items.some((i) => i.description.trim())) { toast.error('Describe at least one non-compliance item'); return; }
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error('Please sign in'); setIsSaving(false); return; }

      // Save to Supabase
      if (existingReportId) { await reportCloud.updateReport(existingReportId, user.id, data as any); }
      else { const result = await reportCloud.createReport(user.id, 'non-compliance-notice' as any, data as any); if (!result.success) { toast.error('Failed to save'); setIsSaving(false); return; } }

      // Generate PDF
      toast.success('Saved — generating PDF...');
      const savedReportId = existingReportId || data.referenceNumber;
      try {
        // Get company branding
        let company: Record<string, any> = {};
        try {
          const { data: cpData } = await supabase.rpc('get_my_company_profile');
          const cp = Array.isArray(cpData) ? cpData[0] : cpData;
          if (cp) company = cp;
        } catch { /* proceed without branding */ }

        const payload = formatNonComplianceNoticePayload(data, company);
        const { data: pdfResult, error: pdfError } = await supabase.functions.invoke(
          'generate-non-compliance-notice-pdf',
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
              pdfResult.download_url, user.id, savedReportId, data.referenceNumber
            );
            permanentPdfUrl = permanentUrl;
            await supabase.from('reports').update({ storage_path: storagePath, pdf_url: permanentPdfUrl, pdf_generated_at: new Date().toISOString() }).eq('report_id', savedReportId);
          } catch (storageErr) {
            console.warn('[NonCompliance] Permanent PDF storage failed, using temp URL:', storageErr);
            await supabase.from('reports').update({ pdf_url: permanentPdfUrl, pdf_generated_at: new Date().toISOString() }).eq('report_id', savedReportId);
          }

          // Download/share via native-aware utility
          const { openOrDownloadPdf } = await import('@/utils/pdf-download');
          await openOrDownloadPdf(permanentPdfUrl, `Non-Compliance-Notice-${data.referenceNumber}.pdf`);
          toast.success('Non-compliance notice issued');
        }
      } catch (pdfErr) {
        console.error('PDF generation error:', pdfErr);
        toast.error('Saved but PDF generation failed');
      }

      storageRemoveSync(DRAFT_KEY);
      navigate(-1);
    } catch { toast.error('Failed to save'); } finally { setIsSaving(false); }
  };

  const severities = [
    { value: 'critical', label: 'Critical', color: 'bg-red-500' },
    { value: 'major', label: 'Major', color: 'bg-orange-500' },
    { value: 'minor', label: 'Minor', color: 'bg-amber-500' },
  ];

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"><ArrowLeft className="h-5 w-5" /></Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20"><Zap className="h-4 w-4 text-red-400" /></div>
              <h1 className="text-base font-semibold text-white">Non-Compliance Notice</h1>
            </div>
          </div>
        </div>
      </div>

      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-5 max-w-3xl mx-auto">
        <motion.div variants={itemVariants} className="border-b border-red-500/20 pb-3">
          <p className="text-sm font-bold text-red-400">FIRE ALARM NON-COMPLIANCE NOTIFICATION</p>
          <p className="text-xs text-white mt-1">This notice formally records that the fire detection and alarm system does not comply with BS 5839-1:2025 or BS 5839-6:2019. The Responsible Person must take action under the Regulatory Reform (Fire Safety) Order 2005.</p>
        </motion.div>

        {/* Reference */}
        <Section title="Reference" accentColor="from-white/20 to-white/5">
          <Field label="Record No."><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date"><Input type="date" value={data.date} onChange={(e) => update('date', e.target.value)} className={inputCn} /></Field>
            <Field label="Service Report Ref"><Input value={data.linkedServiceRef} onChange={(e) => update('linkedServiceRef', e.target.value)} className={inputCn} placeholder="e.g. SVC-2026-001" /></Field>
          </div>
        </Section>

        {/* System Details */}
        <Section title="System Details" accentColor="from-red-500/40 to-orange-400/20">
          <div className="grid grid-cols-2 gap-3">
            <Field label="System Type"><Input value={data.systemType} onChange={(e) => update('systemType', e.target.value)} className={inputCn} /></Field>
            <Field label="Category Installed"><Input value={data.systemCategory} onChange={(e) => update('systemCategory', e.target.value)} className={inputCn} placeholder="e.g. L2, P1, M" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Category Required (by FRA)"><Input value={data.categoryRequired} onChange={(e) => update('categoryRequired', e.target.value)} className={inputCn} placeholder="e.g. L2" /></Field>
            <Field label="FRA Reference"><Input value={data.fireRiskAssessmentRef} onChange={(e) => update('fireRiskAssessmentRef', e.target.value)} className={inputCn} placeholder="FRA ref number" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Panel Make"><Input value={data.panelMake} onChange={(e) => update('panelMake', e.target.value)} className={inputCn} /></Field>
            <Field label="Panel Model"><Input value={data.panelModel} onChange={(e) => update('panelModel', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Field label="System Age"><Input value={data.systemAge} onChange={(e) => update('systemAge', e.target.value)} className={inputCn} placeholder="e.g. 12 years" /></Field>
            <Field label="Zones"><Input value={data.numberOfZones} onChange={(e) => update('numberOfZones', e.target.value)} className={inputCn} placeholder="e.g. 8" /></Field>
            <Field label="Devices"><Input value={data.numberOfDevices} onChange={(e) => update('numberOfDevices', e.target.value)} className={inputCn} placeholder="e.g. 45" /></Field>
          </div>
        </Section>

        {/* System Status */}
        <Section title="Current System Status" accentColor="from-amber-500/40 to-yellow-400/20">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Zones Isolated / Disabled"><Input value={data.zonesIsolated} onChange={(e) => update('zonesIsolated', e.target.value)} className={inputCn} placeholder="e.g. Zone 3, Zone 7" /></Field>
            <Field label="Outstanding Faults on Panel"><Input value={data.outstandingFaults} onChange={(e) => update('outstandingFaults', e.target.value)} className={inputCn} placeholder="e.g. 3 faults" /></Field>
          </div>
          <Field label="Last Service Date"><Input type="date" value={data.lastServiceDate} onChange={(e) => update('lastServiceDate', e.target.value)} className={inputCn} /></Field>
          <TickButton checked={data.arcMonitored} label="System monitored by Alarm Receiving Centre (ARC)" color="blue" onChange={() => update('arcMonitored', !data.arcMonitored)} />
          {data.arcMonitored && (
            <>
              <Field label="ARC Provider"><Input value={data.arcProvider} onChange={(e) => update('arcProvider', e.target.value)} className={inputCn} placeholder="e.g. Redcare, Dualcom" /></Field>
              <TickButton checked={data.arcAffected} label="ARC monitoring affected by non-compliance" color="red" onChange={() => update('arcAffected', !data.arcAffected)} />
            </>
          )}
          <TickButton checked={data.hasCertificates} label="Valid G1/G2/G3 certificates held on site" color="emerald" onChange={() => update('hasCertificates', !data.hasCertificates)} />
          {!data.hasCertificates && (
            <Field label="Certificate Status"><Input value={data.certificateDetails} onChange={(e) => update('certificateDetails', e.target.value)} className={inputCn} placeholder="e.g. No installation cert, commissioning cert expired" /></Field>
          )}
        </Section>

        {/* Inspector */}
        <Section title="Inspector" accentColor="from-elec-yellow/40 to-amber-400/20">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name"><Input value={data.contractorName} onChange={(e) => update('contractorName', e.target.value)} className={inputCn} /></Field>
            <Field label="Company"><Input value={data.contractorCompany} onChange={(e) => update('contractorCompany', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Scheme"><Input value={data.registrationScheme} onChange={(e) => update('registrationScheme', e.target.value)} className={inputCn} /></Field>
            <Field label="Reg. No."><Input value={data.registrationNumber} onChange={(e) => update('registrationNumber', e.target.value)} className={inputCn} /></Field>
          </div>
        </Section>

        {/* Client */}
        <Section title="Responsible Person" accentColor="from-blue-500/40 to-cyan-400/20">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name"><Input value={data.clientName} onChange={(e) => update('clientName', e.target.value)} className={inputCn} /></Field>
            <Field label="Position"><Input value={data.clientPosition} onChange={(e) => update('clientPosition', e.target.value)} className={inputCn} placeholder="e.g. Building Manager" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone"><Input type="tel" value={data.clientPhone} onChange={(e) => update('clientPhone', e.target.value)} className={inputCn} /></Field>
            <Field label="Email"><Input type="email" value={data.clientEmail} onChange={(e) => update('clientEmail', e.target.value)} className={inputCn} /></Field>
          </div>
          <Field label="Premises Address"><Input value={data.installationAddress} onChange={(e) => update('installationAddress', e.target.value)} className={inputCn} /></Field>
        </Section>

        {/* Building Details */}
        <Section title="Building Details" accentColor="from-blue-500/40 to-cyan-400/20">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Building Type">
              <select value={data.buildingType} onChange={(e) => update('buildingType', e.target.value)} className={cn(inputCn, 'w-full rounded-md border px-3')}>
                <option value="">Select...</option>
                <option value="Office">Office</option>
                <option value="Retail">Retail</option>
                <option value="Warehouse">Warehouse</option>
                <option value="School">School</option>
                <option value="Care Home">Care Home</option>
                <option value="Hospital">Hospital</option>
                <option value="HMO">HMO</option>
                <option value="Hotel">Hotel</option>
                <option value="Residential Block">Residential Block</option>
                <option value="Industrial">Industrial</option>
                <option value="Restaurant / Kitchen">Restaurant / Kitchen</option>
                <option value="Leisure / Sports">Leisure / Sports</option>
                <option value="Place of Worship">Place of Worship</option>
                <option value="Other">Other</option>
              </select>
            </Field>
            <Field label="Number of Floors"><Input value={data.numberOfFloors} onChange={(e) => update('numberOfFloors', e.target.value)} className={inputCn} placeholder="e.g. 3" /></Field>
          </div>
          <TickButton checked={data.sleepingAccommodation} label="Sleeping accommodation present" color="amber" onChange={() => update('sleepingAccommodation', !data.sleepingAccommodation)} />
        </Section>

        {/* Non-compliance items */}
        {data.items.map((item, idx) => (
          <Section key={item.id} title={`Non-Compliance${data.items.length > 1 ? ` ${idx + 1}` : ''}`} accentColor="from-red-500/50 to-orange-400/20">
            {data.items.length > 1 && (
              <div className="flex justify-end -mt-2 mb-2">
                <button onClick={() => removeItem(item.id)} className="h-8 w-8 rounded-lg flex items-center justify-center text-white hover:text-red-400 hover:bg-red-500/10 transition-colors touch-manipulation"><Trash2 className="h-4 w-4" /></button>
              </div>
            )}
            <Field label="Description" required><Textarea value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)} className={textareaCn} placeholder="Describe the non-compliance..." /></Field>

            {/* Quick preset picker */}
            <button onClick={() => setShowPresets(showPresets === item.id ? null : item.id)} className="text-[11px] font-medium text-red-400 touch-manipulation mb-1">
              {showPresets === item.id ? 'Hide common items' : 'Select common non-compliance'}
            </button>
            {showPresets === item.id && (
              <div className="space-y-1 mb-3">
                {commonNonCompliance.map((preset) => (
                  <button key={preset.desc} onClick={() => { updateItem(item.id, 'description', preset.desc); updateItem(item.id, 'standardRef', preset.ref); setShowPresets(null); }} className="w-full text-left text-xs text-white p-2.5 rounded-lg bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06] touch-manipulation active:scale-[0.98] transition-all">
                    <span className="font-semibold">{preset.desc}</span>
                    <span className="text-white/50 ml-2">({preset.ref})</span>
                  </button>
                ))}
              </div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <Field label="Location / Zone"><Input value={item.location} onChange={(e) => updateItem(item.id, 'location', e.target.value)} className={inputCn} placeholder="e.g. Zone 3, Ground floor" /></Field>
              <Field label="Standard Reference"><Input value={item.standardRef} onChange={(e) => updateItem(item.id, 'standardRef', e.target.value)} className={inputCn} placeholder="e.g. BS 5839-1 Cl. 25.2" /></Field>
            </div>
            <div>
              <Label className="text-white text-xs mb-1.5 block">Severity</Label>
              <div className="flex gap-2">
                {severities.map((sev) => (
                  <button key={sev.value} onClick={() => updateItem(item.id, 'severity', sev.value)} className={cn('flex-1 h-10 rounded-lg text-xs font-semibold touch-manipulation transition-all', item.severity === sev.value ? `${sev.color} text-white` : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                    {sev.label}
                  </button>
                ))}
              </div>
            </div>
            <Field label="Remedial Action Required"><Textarea value={item.remedialAction} onChange={(e) => updateItem(item.id, 'remedialAction', e.target.value)} className={textareaCn} placeholder="What must be done to achieve compliance..." /></Field>
          </Section>
        ))}

        <motion.div variants={itemVariants}>
          <button onClick={addItem} className="w-full h-11 rounded-xl border-2 border-dashed border-red-500/20 flex items-center justify-center gap-2 text-sm font-medium text-red-400 touch-manipulation active:scale-[0.98] hover:border-red-500/30 hover:bg-red-500/5 transition-all">
            <Plus className="h-4 w-4" /> Add Another Item
          </button>
        </motion.div>

        {/* Overall Assessment */}
        <Section title="Overall Assessment" accentColor="from-red-500/40 to-orange-400/20">
          <div className="space-y-2">
            <TickButton checked={data.immediateActionRequired} label="Immediate action required — system currently unsafe" color="red" onChange={() => update('immediateActionRequired', !data.immediateActionRequired)} />
            <TickButton checked={!data.systemSafe} label="System should not be relied upon for life safety" color="red" onChange={() => update('systemSafe', !data.systemSafe)} />
            <TickButton checked={!data.buildingCanBeOccupied} label="Building should not be occupied until system is compliant" color="red" onChange={() => update('buildingCanBeOccupied', !data.buildingCanBeOccupied)} />
            <TickButton checked={data.fireServiceNotified} label="Fire service has been notified of reduced protection" color="amber" onChange={() => update('fireServiceNotified', !data.fireServiceNotified)} />
            <TickButton checked={data.insuranceAffected} label="Non-compliance may affect building insurance cover" color="amber" onChange={() => update('insuranceAffected', !data.insuranceAffected)} />
          </div>
          <Field label="Timeframe for Remedial Work"><Input value={data.timeframeForRemedial} onChange={(e) => update('timeframeForRemedial', e.target.value)} className={inputCn} placeholder="e.g. Within 28 days, Immediately" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Remedial Deadline"><Input type="date" value={data.remedialDeadline} onChange={(e) => update('remedialDeadline', e.target.value)} className={inputCn} /></Field>
            <Field label="Follow-Up / Re-inspection Date"><Input type="date" value={data.followUpDate} onChange={(e) => update('followUpDate', e.target.value)} className={inputCn} /></Field>
          </div>
        </Section>

        {/* Temporary Measures */}
        <Section title="Temporary Measures" accentColor="from-amber-500/40 to-yellow-400/20">
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3 mb-2">
            <p className="text-[11px] text-white leading-relaxed">BS 5839-1 Cl. 25.2 — Where fire protection is reduced, temporary compensatory measures must be implemented until compliance is restored.</p>
          </div>
          <Textarea value={data.temporaryMeasures} onChange={(e) => update('temporaryMeasures', e.target.value)} className={textareaCn} placeholder="e.g. Fire warden patrols every 30 mins, temporary battery-operated detectors installed, revised evacuation plan briefed to all staff..." />
        </Section>

        {/* Copy Distribution */}
        <Section title="Copy Distribution" accentColor="from-white/20 to-white/5">
          <Textarea value={data.copyDistribution} onChange={(e) => update('copyDistribution', e.target.value)} className={textareaCn} placeholder="e.g. Responsible Person, FRA Assessor, Managing Agent, Building Insurer, Fire Service" />
        </Section>

        {/* Photos */}
        <Section title="Photo Evidence" accentColor="from-cyan-500/40 to-blue-400/20">
          <input ref={photoInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoCapture} />
          <button onClick={() => photoInputRef.current?.click()} className="w-full h-12 rounded-xl border-2 border-dashed border-white/[0.15] flex items-center justify-center gap-2.5 text-sm text-white touch-manipulation active:scale-[0.98]"><Camera className="h-4 w-4" /> Add Photos</button>
          {data.photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {data.photos.map((photo, i) => (
                <div key={i} className="relative rounded-xl overflow-hidden aspect-square">
                  <img src={photo} alt={`Photo ${i + 1}`} className="w-full h-full object-cover" />
                  <button onClick={() => setData((prev) => ({ ...prev, photos: prev.photos.filter((_, j) => j !== i) }))} className="absolute top-1.5 right-1.5 w-7 h-7 rounded-full bg-black/60 flex items-center justify-center touch-manipulation"><X className="h-3.5 w-3.5 text-white" /></button>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Declaration */}
        <Section title="Declaration" accentColor="from-elec-yellow/40 to-amber-400/20">
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 mb-3">
            <p className="text-xs text-white leading-relaxed">I hereby declare that the fire detection and alarm system at the above premises does not comply with the applicable standard as detailed in this notice. The Responsible Person has been advised of the non-compliance, the associated risks, and the recommended remedial actions. Failure to address these items may constitute a breach of the Regulatory Reform (Fire Safety) Order 2005.</p>
          </div>
          <SignatureInput label="Inspector Signature" value={data.inspectorSignature} onChange={(sig) => update('inspectorSignature', sig || '')} />
          <TickButton checked={data.clientRefusedToSign} label="Responsible person refused to sign" color="red" onChange={() => update('clientRefusedToSign', !data.clientRefusedToSign)} />
          {!data.clientRefusedToSign && <SignatureInput label="Responsible Person Signature" value={data.clientSignature} onChange={(sig) => update('clientSignature', sig || '')} />}
        </Section>

        {/* Notes */}
        <Section title="Notes" accentColor="from-white/20 to-white/5">
          <Textarea value={data.notes} onChange={(e) => update('notes', e.target.value)} className={textareaCn} placeholder="Additional notes..." />
        </Section>

        {/* Actions */}
        <motion.div variants={itemVariants} className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 h-12 text-sm font-medium touch-manipulation active:scale-[0.98] border-white/[0.08] text-white hover:bg-white/[0.06]" onClick={() => { storageSetJSONSync(DRAFT_KEY, data); toast.success('Draft saved'); }}>Save Draft</Button>
          <Button className="flex-1 h-12 text-sm font-medium touch-manipulation active:scale-[0.98] bg-red-500 text-white hover:bg-red-600" onClick={handleSave} disabled={isSaving}>
            {isSaving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Saving...</> : existingReportId ? 'Update Notice' : 'Download PDF'}
          </Button>
        </motion.div>
      </motion.main>
    </div>
  );
}
