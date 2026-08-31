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
import { formatNonComplianceNoticePayload } from '@/utils/non-compliance-notice-formatter';

/*
 * Page styling comes from the shared kit. These were local copies that had
 * drifted from every other Notices & Labels page — see components/forms/pageStyles.
 */
import { pageInputCn as inputCn, pageTextareaCn as textareaCn } from '@/components/forms/pageStyles';

import { PageHeader } from '@/components/forms/PageHeader';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };
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

const TickButton = ({ checked, label, tone = 'volt', onChange }: { checked: boolean; label: string; tone?: 'volt' | 'red' | 'amber' | 'green'; onChange: () => void }) => {
  const tones: Record<string, { row: string; box: string; text: string }> = {
    volt: { row: 'bg-elec-yellow border-elec-yellow', box: 'bg-black border-black text-elec-yellow', text: 'text-black' },
    red: { row: 'bg-red-500 border-red-500', box: 'bg-white border-white text-red-500', text: 'text-white' },
    amber: { row: 'bg-amber-400 border-amber-400', box: 'bg-black border-black text-amber-400', text: 'text-black' },
    green: { row: 'bg-green-500 border-green-500', box: 'bg-black border-black text-green-500', text: 'text-black' },
  };
  const t = tones[tone];
  return (
    <button type="button" onClick={onChange} className={cn('flex min-h-[44px] w-full items-center gap-3 rounded-xl border p-3 text-left touch-manipulation transition-all active:scale-[0.98]', checked ? t.row : 'bg-white/[0.06] border-white/[0.1]')}>
      <span aria-hidden="true" className={cn('flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border-2 text-[13px] font-bold leading-none transition-all', checked ? t.box : 'border-white/30 text-transparent')}>✓</span>
      <span className={cn('text-sm', checked ? cn('font-semibold', t.text) : 'font-medium text-white')}>{label}</span>
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
  const update = useCallback((field: keyof NonComplianceData, value: any) => { setData((prev) => ({ ...prev, [field]: value })); }, []);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (existingReportId) { await reportCloud.updateReport(existingReportId, user.id, data as any); }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      else { const result = await reportCloud.createReport(user.id, 'non-compliance-notice' as any, data as any); if (!result.success) { toast.error('Failed to save'); setIsSaving(false); return; } }

      // Generate PDF
      toast.success('Saved — generating PDF...');
      const savedReportId = existingReportId || data.referenceNumber;
      try {
        // Get company branding
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
    { value: 'critical', label: 'Critical', selected: 'bg-red-500 border border-red-500 text-white' },
    { value: 'major', label: 'Major', selected: 'bg-orange-500 border border-orange-500 text-black' },
    { value: 'minor', label: 'Minor', selected: 'bg-amber-400 border border-amber-400 text-black' },
  ];

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <PageHeader
        eyebrow="BS 5839"
        title="Non-Compliance Notice"
        lead="Fire alarm non-compliance."
        leadTone="danger"
        description="Formally records that the system does not comply with BS 5839-1:2025 or BS 5839-6:2019 — the Responsible Person must act under the Regulatory Reform (Fire Safety) Order 2005."
        reference={data.referenceNumber}
      />


      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="mx-auto max-w-3xl lg:max-w-none xl:max-w-[1700px] px-4 py-4 lg:px-8 space-y-5 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
        {/* Reference */}
        <Section title="Reference">
          <Field label="Record No."><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Date"><Input type="date" value={data.date} onChange={(e) => update('date', e.target.value)} className={inputCn} /></Field>
            <Field label="Service Report Ref"><Input value={data.linkedServiceRef} onChange={(e) => update('linkedServiceRef', e.target.value)} className={inputCn} placeholder="e.g. SVC-2026-001" /></Field>
          </div>
        </Section>

        {/* System Details */}
        <Section title="System details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="System Type"><Input value={data.systemType} onChange={(e) => update('systemType', e.target.value)} className={inputCn} /></Field>
            <Field label="Category Installed"><Input value={data.systemCategory} onChange={(e) => update('systemCategory', e.target.value)} className={inputCn} placeholder="e.g. L2, P1, M" /></Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Category Required (by FRA)"><Input value={data.categoryRequired} onChange={(e) => update('categoryRequired', e.target.value)} className={inputCn} placeholder="e.g. L2" /></Field>
            <Field label="FRA Reference"><Input value={data.fireRiskAssessmentRef} onChange={(e) => update('fireRiskAssessmentRef', e.target.value)} className={inputCn} placeholder="FRA ref number" /></Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Panel Make"><Input value={data.panelMake} onChange={(e) => update('panelMake', e.target.value)} className={inputCn} /></Field>
            <Field label="Panel Model"><Input value={data.panelModel} onChange={(e) => update('panelModel', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="System Age"><Input value={data.systemAge} onChange={(e) => update('systemAge', e.target.value)} className={inputCn} placeholder="e.g. 12 years" /></Field>
            <Field label="Zones"><Input value={data.numberOfZones} onChange={(e) => update('numberOfZones', e.target.value)} className={inputCn} placeholder="e.g. 8" /></Field>
            <Field label="Devices"><Input value={data.numberOfDevices} onChange={(e) => update('numberOfDevices', e.target.value)} className={inputCn} placeholder="e.g. 45" /></Field>
          </div>
        </Section>

        {/* System Status */}
        <Section title="Current system status">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Zones Isolated / Disabled"><Input value={data.zonesIsolated} onChange={(e) => update('zonesIsolated', e.target.value)} className={inputCn} placeholder="e.g. Zone 3, Zone 7" /></Field>
            <Field label="Outstanding Faults on Panel"><Input value={data.outstandingFaults} onChange={(e) => update('outstandingFaults', e.target.value)} className={inputCn} placeholder="e.g. 3 faults" /></Field>
          </div>
          <Field label="Last Service Date"><Input type="date" value={data.lastServiceDate} onChange={(e) => update('lastServiceDate', e.target.value)} className={inputCn} /></Field>
          <TickButton checked={data.arcMonitored} label="System monitored by Alarm Receiving Centre (ARC)" tone="volt" onChange={() => update('arcMonitored', !data.arcMonitored)} />
          {data.arcMonitored && (
            <>
              <Field label="ARC Provider"><Input value={data.arcProvider} onChange={(e) => update('arcProvider', e.target.value)} className={inputCn} placeholder="e.g. Redcare, Dualcom" /></Field>
              <TickButton checked={data.arcAffected} label="ARC monitoring affected by non-compliance" tone="red" onChange={() => update('arcAffected', !data.arcAffected)} />
            </>
          )}
          <TickButton checked={data.hasCertificates} label="Valid G1/G2/G3 certificates held on site" tone="green" onChange={() => update('hasCertificates', !data.hasCertificates)} />
          {!data.hasCertificates && (
            <Field label="Certificate Status"><Input value={data.certificateDetails} onChange={(e) => update('certificateDetails', e.target.value)} className={inputCn} placeholder="e.g. No installation cert, commissioning cert expired" /></Field>
          )}
        </Section>

        {/* Inspector */}
        <Section title="Inspector">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Name"><Input value={data.contractorName} onChange={(e) => update('contractorName', e.target.value)} className={inputCn} /></Field>
            <Field label="Company"><Input value={data.contractorCompany} onChange={(e) => update('contractorCompany', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Scheme"><Input value={data.registrationScheme} onChange={(e) => update('registrationScheme', e.target.value)} className={inputCn} /></Field>
            <Field label="Reg. No."><Input value={data.registrationNumber} onChange={(e) => update('registrationNumber', e.target.value)} className={inputCn} /></Field>
          </div>
        </Section>

        {/* Client */}
        <Section title="Responsible person">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Name"><Input value={data.clientName} onChange={(e) => update('clientName', e.target.value)} className={inputCn} /></Field>
            <Field label="Position"><Input value={data.clientPosition} onChange={(e) => update('clientPosition', e.target.value)} className={inputCn} placeholder="e.g. Building Manager" /></Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Phone"><Input type="tel" value={data.clientPhone} onChange={(e) => update('clientPhone', e.target.value)} className={inputCn} /></Field>
            <Field label="Email"><Input type="email" value={data.clientEmail} onChange={(e) => update('clientEmail', e.target.value)} className={inputCn} /></Field>
          </div>
          <Field label="Premises Address"><Input value={data.installationAddress} onChange={(e) => update('installationAddress', e.target.value)} className={inputCn} /></Field>
        </Section>

        {/* Building Details */}
        <Section title="Building details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Building Type">
              <select value={data.buildingType} onChange={(e) => update('buildingType', e.target.value)} className={cn(inputCn, 'w-full')}>
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
          <TickButton checked={data.sleepingAccommodation} label="Sleeping accommodation present" tone="amber" onChange={() => update('sleepingAccommodation', !data.sleepingAccommodation)} />
        </Section>

        {/* Non-compliance items */}
        <Section title="Non-compliance items" className="lg:col-span-2">
          {data.items.map((item, idx) => (
            <div key={item.id} className={cn('space-y-4', idx > 0 && 'border-t border-white/[0.08] pt-4')}>
              {data.items.length > 1 && (
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-[13px] font-semibold text-white">Non-compliance {idx + 1}</h3>
                  <button onClick={() => removeItem(item.id)} className="h-11 px-2 text-[13px] font-semibold text-red-400 transition-colors hover:text-red-300 touch-manipulation">Remove</button>
                </div>
              )}
              <Field label="Description" required><Textarea value={item.description} onChange={(e) => updateItem(item.id, 'description', e.target.value)} className={textareaCn} placeholder="Describe the non-compliance..." /></Field>

              {/* Quick preset picker */}
              <button onClick={() => setShowPresets(showPresets === item.id ? null : item.id)} className="block h-11 text-[13px] font-semibold text-elec-yellow touch-manipulation">
                {showPresets === item.id ? 'Hide common items' : 'Select common non-compliance'}
              </button>
              {showPresets === item.id && (
                <div className="space-y-1">
                  {commonNonCompliance.map((preset) => (
                    <button key={preset.desc} onClick={() => { updateItem(item.id, 'description', preset.desc); updateItem(item.id, 'standardRef', preset.ref); setShowPresets(null); }} className="w-full rounded-lg border border-white/[0.1] bg-white/[0.06] p-2.5 text-left text-[13px] text-white transition-all hover:bg-white/[0.08] touch-manipulation active:scale-[0.98]">
                      <span className="font-semibold">{preset.desc}</span>
                      <span className="ml-2 text-white">({preset.ref})</span>
                    </button>
                  ))}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Field label="Location / Zone"><Input value={item.location} onChange={(e) => updateItem(item.id, 'location', e.target.value)} className={inputCn} placeholder="e.g. Zone 3, Ground floor" /></Field>
                <Field label="Standard Reference"><Input value={item.standardRef} onChange={(e) => updateItem(item.id, 'standardRef', e.target.value)} className={inputCn} placeholder="e.g. BS 5839-1 Cl. 25.2" /></Field>
              </div>
              <div>
                <Label className="text-[12px] font-medium text-white mb-1 block">Severity</Label>
                <div className="flex gap-2">
                  {severities.map((sev) => (
                    <button key={sev.value} onClick={() => updateItem(item.id, 'severity', sev.value)} className={cn('h-11 flex-1 rounded-xl text-[13px] font-semibold touch-manipulation transition-all active:scale-[0.98]', item.severity === sev.value ? sev.selected : 'bg-white/[0.06] border border-white/[0.1] text-white')}>
                      {sev.label}
                    </button>
                  ))}
                </div>
              </div>
              <Field label="Remedial Action Required"><Textarea value={item.remedialAction} onChange={(e) => updateItem(item.id, 'remedialAction', e.target.value)} className={textareaCn} placeholder="What must be done to achieve compliance..." /></Field>
            </div>
          ))}
        </Section>

        <motion.div variants={itemVariants} className="lg:col-span-2">
          <button onClick={addItem} className="h-11 w-full rounded-xl border border-dashed border-white/[0.2] text-[13px] font-semibold text-white transition-all hover:border-white/[0.35] touch-manipulation active:scale-[0.98]">
            Add another item
          </button>
        </motion.div>

        {/* Overall Assessment */}
        <Section title="Overall assessment" className="lg:col-span-2">
          <div className="space-y-2">
            <TickButton checked={data.immediateActionRequired} label="Immediate action required — system currently unsafe" tone="red" onChange={() => update('immediateActionRequired', !data.immediateActionRequired)} />
            <TickButton checked={!data.systemSafe} label="System should not be relied upon for life safety" tone="red" onChange={() => update('systemSafe', !data.systemSafe)} />
            <TickButton checked={!data.buildingCanBeOccupied} label="Building should not be occupied until system is compliant" tone="red" onChange={() => update('buildingCanBeOccupied', !data.buildingCanBeOccupied)} />
            <TickButton checked={data.fireServiceNotified} label="Fire service has been notified of reduced protection" tone="amber" onChange={() => update('fireServiceNotified', !data.fireServiceNotified)} />
            <TickButton checked={data.insuranceAffected} label="Non-compliance may affect building insurance cover" tone="amber" onChange={() => update('insuranceAffected', !data.insuranceAffected)} />
          </div>
          <Field label="Timeframe for Remedial Work"><Input value={data.timeframeForRemedial} onChange={(e) => update('timeframeForRemedial', e.target.value)} className={inputCn} placeholder="e.g. Within 28 days, Immediately" /></Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Field label="Remedial Deadline"><Input type="date" value={data.remedialDeadline} onChange={(e) => update('remedialDeadline', e.target.value)} className={inputCn} /></Field>
            <Field label="Follow-Up / Re-inspection Date"><Input type="date" value={data.followUpDate} onChange={(e) => update('followUpDate', e.target.value)} className={inputCn} /></Field>
          </div>
        </Section>

        {/* Temporary Measures */}
        <Section title="Temporary measures">
          <p className="text-[12.5px] leading-relaxed text-white">BS 5839-1 Cl. 25.2 — Where fire protection is reduced, temporary compensatory measures must be implemented until compliance is restored.</p>
          <Textarea value={data.temporaryMeasures} onChange={(e) => update('temporaryMeasures', e.target.value)} className={textareaCn} placeholder="e.g. Fire warden patrols every 30 mins, temporary battery-operated detectors installed, revised evacuation plan briefed to all staff..." />
        </Section>

        {/* Copy Distribution */}
        <Section title="Copy distribution">
          <Textarea value={data.copyDistribution} onChange={(e) => update('copyDistribution', e.target.value)} className={textareaCn} placeholder="e.g. Responsible Person, FRA Assessor, Managing Agent, Building Insurer, Fire Service" />
        </Section>

        {/* Photos */}
        <Section title="Photo evidence" className="lg:col-span-2">
          <input ref={photoInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handlePhotoCapture} />
          <button onClick={() => photoInputRef.current?.click()} className="h-11 w-full rounded-xl border border-dashed border-white/[0.2] text-[13px] font-semibold text-white transition-all hover:border-white/[0.35] touch-manipulation active:scale-[0.98]">Add photos</button>
          {data.photos.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {data.photos.map((photo, i) => (
                <div key={i} className="relative aspect-square overflow-hidden rounded-xl">
                  <img src={photo} alt={`Photo ${i + 1}`} className="h-full w-full object-cover" />
                  <button onClick={() => setData((prev) => ({ ...prev, photos: prev.photos.filter((_, j) => j !== i) }))} aria-label={`Remove photo ${i + 1}`} className="absolute top-1.5 right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/70 text-base leading-none text-white touch-manipulation">×</button>
                </div>
              ))}
            </div>
          )}
        </Section>

        {/* Declaration */}
        <Section title="Declaration" className="lg:col-span-2">
          <p className="text-[12.5px] leading-relaxed text-white">I hereby declare that the fire detection and alarm system at the above premises does not comply with the applicable standard as detailed in this notice. The Responsible Person has been advised of the non-compliance, the associated risks, and the recommended remedial actions. Failure to address these items may constitute a breach of the Regulatory Reform (Fire Safety) Order 2005.</p>
          <div className="border-t border-white/[0.06] pt-3" />
          <SignatureInput label="Inspector Signature" value={data.inspectorSignature} onChange={(sig) => update('inspectorSignature', sig || '')} />
          <TickButton checked={data.clientRefusedToSign} label="Responsible person refused to sign" tone="red" onChange={() => update('clientRefusedToSign', !data.clientRefusedToSign)} />
          {!data.clientRefusedToSign && <SignatureInput label="Responsible Person Signature" value={data.clientSignature} onChange={(sig) => update('clientSignature', sig || '')} />}
        </Section>

        {/* Notes */}
        <Section title="Notes" className="lg:col-span-2">
          <Textarea value={data.notes} onChange={(e) => update('notes', e.target.value)} className={textareaCn} placeholder="Additional notes..." />
        </Section>

        {/* Actions */}
        <motion.div variants={itemVariants} className="flex gap-3 pt-2 lg:col-span-2 lg:justify-end">
          <button onClick={() => { storageSetJSONSync(DRAFT_KEY, data); toast.success('Draft saved'); }} className="h-12 flex-1 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.99] lg:flex-none lg:px-8">Save draft</button>
          <button onClick={handleSave} disabled={isSaving} className="flex h-12 flex-1 items-center justify-center rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.99] disabled:bg-white/[0.08] disabled:text-white/70 lg:flex-none lg:w-auto lg:px-10">
            {isSaving ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />Saving...</> : existingReportId ? 'Update notice' : 'Download PDF'}
          </button>
        </motion.div>
      </motion.main>
    </div>
  );
}
