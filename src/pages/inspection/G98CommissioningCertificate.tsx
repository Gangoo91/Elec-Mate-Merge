import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Loader2, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import SignatureInput from '@/components/signature/SignatureInput';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { reportCloud } from '@/utils/reportCloud';
import { useReportSync } from '@/hooks/useReportSync';
import { SyncStatusBadge } from '@/components/inspection/SyncStatusBadge';
import { draftStorage } from '@/utils/draftStorage';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };
const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const selectTriggerCn = 'h-12 touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 data-[state=open]:border-yellow-500';
const selectContentCn = 'z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground';
const checkboxCn = 'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';

const UK_DNOS = ['UK Power Networks', 'Western Power Distribution', 'Northern Powergrid', 'SP Energy Networks', 'SSE Networks', 'Electricity North West', 'National Grid Electricity Distribution'];

// G98 default protection settings (EREC G98 Issue 5)
const G98_DEFAULTS = {
  ovStage1Voltage: '264.0', ovStage1Time: '1.0',
  ovStage2Voltage: '276.0', ovStage2Time: '0.5',
  uvStage1Voltage: '207.0', uvStage1Time: '1.5',
  uvStage2Voltage: '195.5', uvStage2Time: '0.5',
  ofStage1Freq: '50.4', ofStage1Time: '0.5',
  ofStage2Freq: '52.0', ofStage2Time: '0.5',
  ufStage1Freq: '47.5', ufStage1Time: '0.5',
  ufStage2Freq: '47.0', ufStage2Time: '0.5',
  rocoFRate: '1.0', rocoFTime: '0.5',
  reconnectionDelay: '60',
};

interface G98Data {
  referenceNumber: string;
  commissioningDate: string;
  notificationDate: string;
  dnoName: string;
  // Installer
  installerName: string;
  installerCompany: string;
  installerPhone: string;
  installerEmail: string;
  mcsNumber: string;
  registrationScheme: string;
  registrationNumber: string;
  // Site
  installationAddress: string;
  mpan: string;
  supplyType: string;
  earthingArrangement: string;
  // Equipment
  equipmentType: string;
  equipmentManufacturer: string;
  equipmentModel: string;
  equipmentSerial: string;
  ratedOutput: string;
  numberOfPhases: string;
  typeTestCertRef: string;
  inverterManufacturer: string;
  inverterModel: string;
  associatedCertRef: string;
  // Export
  exportCapable: boolean;
  exportLimited: boolean;
  exportLimit: string;
  exportMeterFitted: boolean;
  exportMeterSerial: string;
  segSupplier: string;
  // Protection settings
  ovStage1Voltage: string; ovStage1Time: string;
  ovStage2Voltage: string; ovStage2Time: string;
  uvStage1Voltage: string; uvStage1Time: string;
  uvStage2Voltage: string; uvStage2Time: string;
  ofStage1Freq: string; ofStage1Time: string;
  ofStage2Freq: string; ofStage2Time: string;
  ufStage1Freq: string; ufStage1Time: string;
  ufStage2Freq: string; ufStage2Time: string;
  rocoFRate: string; rocoFTime: string;
  reconnectionDelay: string;
  // Commissioning confirmation
  antiIslandingConfirmed: boolean;
  protectionSettingsVerified: boolean;
  systemOperating: boolean;
  labelsApplied: boolean;
  customerInformed: boolean;
  // Signatures
  installerSignature: string;
  installerDate: string;
  customerSignature: string;
  customerDate: string;
  notes: string;
}

const defaultData = (): G98Data => ({
  referenceNumber: `G98-${Date.now().toString(36).toUpperCase()}`,
  commissioningDate: new Date().toISOString().split('T')[0],
  notificationDate: new Date().toISOString().split('T')[0],
  dnoName: '',
  installerName: '', installerCompany: '', installerPhone: '', installerEmail: '',
  mcsNumber: '', registrationScheme: '', registrationNumber: '',
  installationAddress: '', mpan: '', supplyType: 'single-phase', earthingArrangement: '',
  equipmentType: '', equipmentManufacturer: '', equipmentModel: '', equipmentSerial: '',
  ratedOutput: '', numberOfPhases: '1', typeTestCertRef: '',
  inverterManufacturer: '', inverterModel: '', associatedCertRef: '',
  exportCapable: true, exportLimited: false, exportLimit: '',
  exportMeterFitted: false, exportMeterSerial: '', segSupplier: '',
  ...G98_DEFAULTS,
  antiIslandingConfirmed: false, protectionSettingsVerified: false,
  systemOperating: false, labelsApplied: false, customerInformed: false,
  installerSignature: '', installerDate: new Date().toISOString().split('T')[0],
  customerSignature: '', customerDate: '', notes: '',
});

const DRAFT_KEY = 'elec-mate-draft-g98';

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
  <div><Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>{children}</div>
);

const TickButton = ({ checked, label, onChange }: { checked: boolean; label: string; onChange: () => void }) => (
  <button onClick={onChange} className={cn('w-full flex items-center gap-3 p-3 rounded-xl border text-left touch-manipulation active:scale-[0.98] transition-all', checked ? 'bg-emerald-500/10 border-emerald-500/25' : 'bg-white/[0.03] border-white/[0.06]')}>
    <div className={cn('w-5 h-5 rounded border-2 flex items-center justify-center transition-all flex-shrink-0', checked ? 'bg-emerald-500 border-emerald-500' : 'border-white/30')}>
      {checked && <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>}
    </div>
    <span className={cn('text-sm font-medium', checked ? 'text-emerald-400' : 'text-white')}>{label}</span>
  </button>
);

export default function G98CommissioningCertificate() {
  const navigate = useNavigate();
  const { id: editId } = useParams<{ id: string }>();
  const isNew = editId === 'new' || !editId;
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [savedReportId, setSavedReportId] = useState<string | null>(editId !== 'new' ? editId || null : null);
  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);
  const [recoveryDraft, setRecoveryDraft] = useState<{ data: any; lastModified: Date } | null>(null);

  const [data, setData] = useState<G98Data>(defaultData());

  const {
    status: syncStatus, saveNow, syncNowImmediate,
    hasRecoverableDraft, recoverDraft, discardDraft,
  } = useReportSync({
    reportId: savedReportId,
    reportType: 'g98-commissioning' as any,
    formData: data,
    enabled: !isLoading,
    onReportCreated: (newId) => {
      setSavedReportId(newId);
      window.history.replaceState(null, '', `/electrician/inspection-testing/g98-commissioning/${newId}`);
    },
  });

  // Load existing report
  useEffect(() => {
    if (isNew || !editId) { setIsLoading(false); return; }
    const load = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setIsLoading(false); return; }
        const reportData = await reportCloud.getReportData(editId, user.id);
        if (reportData) { setData((prev) => ({ ...defaultData(), ...prev, ...(reportData as any) })); setSavedReportId(editId); }
      } catch (err) { console.error('Failed to load G98:', err); }
      finally { setIsLoading(false); }
    };
    load();
  }, [editId, isNew]);

  // Draft recovery
  useEffect(() => {
    if (!isNew || !hasRecoverableDraft) return;
    const draft = draftStorage.loadDraft('g98-commissioning' as any, null);
    if (draft) { setRecoveryDraft(draft); setShowRecoveryDialog(true); }
  }, [isNew, hasRecoverableDraft]);

  useEffect(() => {
    if (data.installerName) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: cpData } = await supabase.rpc('get_my_company_profile');
      const cp = Array.isArray(cpData) ? cpData[0] : cpData;
      if (cp) {
        setData((prev) => ({
          ...prev,
          installerName: prev.installerName || cp.inspector_name || '',
          installerCompany: prev.installerCompany || cp.company_name || '',
          installerPhone: prev.installerPhone || cp.company_phone || '',
          installerEmail: prev.installerEmail || cp.company_email || '',
          registrationScheme: prev.registrationScheme || cp.registration_scheme || '',
          registrationNumber: prev.registrationNumber || cp.registration_number || '',
        }));
      }
    });
  }, []);

  const update = useCallback((field: keyof G98Data, value: any) => { setData((prev) => ({ ...prev, [field]: value })); }, []);

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try { await saveNow(); toast.success('Draft saved'); }
    catch { toast.error('Failed to save'); }
    finally { setIsSaving(false); }
  };

  const handleGeneratePDF = async () => {
    if (!data.installationAddress) { toast.error('Installation address required'); return; }
    setIsSaving(true);
    try {
      await syncNowImmediate();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error('Please sign in'); setIsSaving(false); return; }

      toast.success('Generating PDF...');
      const reportId = savedReportId || data.referenceNumber;
      let company: Record<string, any> = {};
      try { const { data: cpData } = await supabase.rpc('get_my_company_profile'); const cp = Array.isArray(cpData) ? cpData[0] : cpData; if (cp) company = cp; } catch {}

      const payload = { ...data, companyName: company.company_name || data.installerCompany, companyAddress: company.company_address || '', companyPhone: company.company_phone || data.installerPhone, companyEmail: company.company_email || data.installerEmail, companyLogo: company.company_logo || '' };
      const { data: pdfResult, error: pdfError } = await supabase.functions.invoke('generate-g98-commissioning-pdf', { body: { formData: payload } });

      if (pdfError) { toast.error('PDF generation failed'); }
      else if (pdfResult?.download_url) {
        let url = pdfResult.download_url;
        try {
          const { saveCertificatePdf } = await import('@/utils/certificate-pdf-storage');
          const { permanentUrl, storagePath } = await saveCertificatePdf(pdfResult.download_url, user.id, reportId, data.referenceNumber);
          url = permanentUrl;
          await supabase.from('reports').update({ storage_path: storagePath, pdf_url: url, pdf_generated_at: new Date().toISOString(), status: 'completed' }).eq('report_id', reportId);
        } catch { await supabase.from('reports').update({ pdf_url: url, pdf_generated_at: new Date().toISOString(), status: 'completed' }).eq('report_id', reportId); }
        const { openOrDownloadPdf } = await import('@/utils/pdf-download');
        await openOrDownloadPdf(url, `G98-${data.referenceNumber}.pdf`);
        toast.success('G98 form generated');
      }
    } catch { toast.error('Failed to generate PDF'); } finally { setIsSaving(false); }
  };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center justify-between h-11">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"><ArrowLeft className="h-5 w-5" /></Button>
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-orange-500/10 border border-orange-500/20"><Zap className="h-4 w-4 text-orange-400" /></div>
                <h1 className="text-base font-semibold text-white">G98 Commissioning</h1>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SyncStatusBadge status={syncStatus} />
              <Button variant="ghost" size="icon" onClick={handleSaveDraft} disabled={isSaving} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-5 max-w-3xl mx-auto">
        <motion.div variants={itemVariants} className="border-b border-orange-500/20 pb-3">
          <p className="text-sm font-bold text-orange-400">G98 COMMISSIONING CONFIRMATION</p>
          <p className="text-xs text-white mt-1">EREC G98 Issue 5 — Micro-generators ≤16A per phase (≤3.68kW single-phase / ≤11.04kW three-phase). Notify DNO within 28 days of commissioning.</p>
        </motion.div>

        {/* Notification Details */}
        <Section title="Notification Details" accentColor="from-white/20 to-white/5">
          <Field label="Reference No."><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Commissioning Date"><Input type="date" value={data.commissioningDate} onChange={(e) => update('commissioningDate', e.target.value)} className={inputCn} /></Field>
            <Field label="Notification Date"><Input type="date" value={data.notificationDate} onChange={(e) => update('notificationDate', e.target.value)} className={inputCn} /></Field>
          </div>
          <Field label="DNO" required>
            <Select value={data.dnoName} onValueChange={(v) => update('dnoName', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select DNO..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                {UK_DNOS.map((d) => <SelectItem key={d} value={d}>{d}</SelectItem>)}
              </SelectContent>
            </Select>
          </Field>
        </Section>

        {/* Installer */}
        <Section title="Installer Details" accentColor="from-elec-yellow/40 to-amber-400/20">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name"><Input value={data.installerName} onChange={(e) => update('installerName', e.target.value)} className={inputCn} /></Field>
            <Field label="Company"><Input value={data.installerCompany} onChange={(e) => update('installerCompany', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone"><Input type="tel" value={data.installerPhone} onChange={(e) => update('installerPhone', e.target.value)} className={inputCn} /></Field>
            <Field label="Email"><Input type="email" value={data.installerEmail} onChange={(e) => update('installerEmail', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="MCS No." required><Input value={data.mcsNumber} onChange={(e) => update('mcsNumber', e.target.value)} className={inputCn} /></Field>
            <Field label="Scheme"><Input value={data.registrationScheme} onChange={(e) => update('registrationScheme', e.target.value)} className={inputCn} placeholder="NICEIC, NAPIT..." /></Field>
            <Field label="Reg. No."><Input value={data.registrationNumber} onChange={(e) => update('registrationNumber', e.target.value)} className={inputCn} /></Field>
          </div>
        </Section>

        {/* Site */}
        <Section title="Site Details" accentColor="from-blue-500/40 to-cyan-400/20">
          <Field label="Installation Address" required><Input value={data.installationAddress} onChange={(e) => update('installationAddress', e.target.value)} className={inputCn} /></Field>
          <Field label="MPAN (21-digit)"><Input value={data.mpan} onChange={(e) => update('mpan', e.target.value)} className={inputCn} placeholder="e.g. 1200023305967..." /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Supply Type">
              <Select value={data.supplyType} onValueChange={(v) => update('supplyType', v)}>
                <SelectTrigger className={selectTriggerCn}><SelectValue /></SelectTrigger>
                <SelectContent className={selectContentCn}>
                  <SelectItem value="single-phase">Single-phase</SelectItem>
                  <SelectItem value="three-phase">Three-phase</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Earthing">
              <Select value={data.earthingArrangement} onValueChange={(v) => update('earthingArrangement', v)}>
                <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent className={selectContentCn}>
                  <SelectItem value="TN-S">TN-S</SelectItem>
                  <SelectItem value="TN-C-S">TN-C-S</SelectItem>
                  <SelectItem value="TT">TT</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </Section>

        {/* Equipment */}
        <Section title="Generating Equipment" accentColor="from-green-500/40 to-emerald-400/20">
          <Field label="Equipment Type" required>
            <Select value={data.equipmentType} onValueChange={(v) => update('equipmentType', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="Solar PV">Solar PV</SelectItem>
                <SelectItem value="Battery Storage">Battery Storage</SelectItem>
                <SelectItem value="Combined PV+Battery">Combined PV + Battery</SelectItem>
                <SelectItem value="Wind">Wind</SelectItem>
                <SelectItem value="Micro CHP">Micro CHP</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Manufacturer"><Input value={data.equipmentManufacturer} onChange={(e) => update('equipmentManufacturer', e.target.value)} className={inputCn} /></Field>
            <Field label="Model"><Input value={data.equipmentModel} onChange={(e) => update('equipmentModel', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Field label="Serial Number"><Input value={data.equipmentSerial} onChange={(e) => update('equipmentSerial', e.target.value)} className={inputCn} /></Field>
            <Field label="Rated Output (kW)" required><Input type="number" step="0.01" value={data.ratedOutput} onChange={(e) => update('ratedOutput', e.target.value)} className={inputCn} placeholder="≤3.68 single-phase" /></Field>
            <Field label="Phases">
              <Select value={data.numberOfPhases} onValueChange={(v) => update('numberOfPhases', v)}>
                <SelectTrigger className={selectTriggerCn}><SelectValue /></SelectTrigger>
                <SelectContent className={selectContentCn}>
                  <SelectItem value="1">Single-phase</SelectItem>
                  <SelectItem value="3">Three-phase</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <Field label="Type Test Certificate Ref"><Input value={data.typeTestCertRef} onChange={(e) => update('typeTestCertRef', e.target.value)} className={inputCn} placeholder="Manufacturer's G98 type test certificate" /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Inverter Manufacturer"><Input value={data.inverterManufacturer} onChange={(e) => update('inverterManufacturer', e.target.value)} className={inputCn} placeholder="If different" /></Field>
            <Field label="Inverter Model"><Input value={data.inverterModel} onChange={(e) => update('inverterModel', e.target.value)} className={inputCn} /></Field>
          </div>
          <Field label="Associated Cert Ref"><Input value={data.associatedCertRef} onChange={(e) => update('associatedCertRef', e.target.value)} className={inputCn} placeholder="Link to PV/BESS cert number" /></Field>
        </Section>

        {/* Export */}
        <Section title="Export Details" accentColor="from-cyan-500/40 to-blue-400/20">
          <div className="space-y-2">
            <div className="flex items-center gap-3"><Checkbox checked={data.exportCapable} onCheckedChange={(v) => update('exportCapable', !!v)} className={checkboxCn} /><Label className="text-sm text-white">Export capable</Label></div>
            <div className="flex items-center gap-3"><Checkbox checked={data.exportLimited} onCheckedChange={(v) => update('exportLimited', !!v)} className={checkboxCn} /><Label className="text-sm text-white">Export limited by DNO</Label></div>
            {data.exportLimited && <Field label="Export Limit (kW)"><Input type="number" step="0.01" value={data.exportLimit} onChange={(e) => update('exportLimit', e.target.value)} className={inputCn} /></Field>}
            <div className="flex items-center gap-3"><Checkbox checked={data.exportMeterFitted} onCheckedChange={(v) => update('exportMeterFitted', !!v)} className={checkboxCn} /><Label className="text-sm text-white">Export meter fitted</Label></div>
            {data.exportMeterFitted && <Field label="Export Meter Serial"><Input value={data.exportMeterSerial} onChange={(e) => update('exportMeterSerial', e.target.value)} className={inputCn} /></Field>}
          </div>
          <Field label="SEG Supplier"><Input value={data.segSupplier} onChange={(e) => update('segSupplier', e.target.value)} className={inputCn} placeholder="e.g. Octopus, British Gas..." /></Field>
        </Section>

        {/* Grid Protection Settings */}
        <Section title="Grid Protection Settings" accentColor="from-purple-500/40 to-indigo-400/20">
          <div className="rounded-xl bg-purple-500/5 border border-purple-500/15 p-3 mb-3">
            <p className="text-[11px] text-white">Pre-filled with EREC G98 Issue 5 default settings. Verify against inverter display.</p>
          </div>
          {/* OV */}
          <p className="text-xs font-semibold text-white">Over-voltage</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Field label="OV1 (V)"><Input value={data.ovStage1Voltage} onChange={(e) => update('ovStage1Voltage', e.target.value)} className={inputCn} /></Field>
            <Field label="OV1 Time (s)"><Input value={data.ovStage1Time} onChange={(e) => update('ovStage1Time', e.target.value)} className={inputCn} /></Field>
            <Field label="OV2 (V)"><Input value={data.ovStage2Voltage} onChange={(e) => update('ovStage2Voltage', e.target.value)} className={inputCn} /></Field>
            <Field label="OV2 Time (s)"><Input value={data.ovStage2Time} onChange={(e) => update('ovStage2Time', e.target.value)} className={inputCn} /></Field>
          </div>
          {/* UV */}
          <p className="text-xs font-semibold text-white mt-3">Under-voltage</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Field label="UV1 (V)"><Input value={data.uvStage1Voltage} onChange={(e) => update('uvStage1Voltage', e.target.value)} className={inputCn} /></Field>
            <Field label="UV1 Time (s)"><Input value={data.uvStage1Time} onChange={(e) => update('uvStage1Time', e.target.value)} className={inputCn} /></Field>
            <Field label="UV2 (V)"><Input value={data.uvStage2Voltage} onChange={(e) => update('uvStage2Voltage', e.target.value)} className={inputCn} /></Field>
            <Field label="UV2 Time (s)"><Input value={data.uvStage2Time} onChange={(e) => update('uvStage2Time', e.target.value)} className={inputCn} /></Field>
          </div>
          {/* OF */}
          <p className="text-xs font-semibold text-white mt-3">Over-frequency</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Field label="OF1 (Hz)"><Input value={data.ofStage1Freq} onChange={(e) => update('ofStage1Freq', e.target.value)} className={inputCn} /></Field>
            <Field label="OF1 Time (s)"><Input value={data.ofStage1Time} onChange={(e) => update('ofStage1Time', e.target.value)} className={inputCn} /></Field>
            <Field label="OF2 (Hz)"><Input value={data.ofStage2Freq} onChange={(e) => update('ofStage2Freq', e.target.value)} className={inputCn} /></Field>
            <Field label="OF2 Time (s)"><Input value={data.ofStage2Time} onChange={(e) => update('ofStage2Time', e.target.value)} className={inputCn} /></Field>
          </div>
          {/* UF */}
          <p className="text-xs font-semibold text-white mt-3">Under-frequency</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            <Field label="UF1 (Hz)"><Input value={data.ufStage1Freq} onChange={(e) => update('ufStage1Freq', e.target.value)} className={inputCn} /></Field>
            <Field label="UF1 Time (s)"><Input value={data.ufStage1Time} onChange={(e) => update('ufStage1Time', e.target.value)} className={inputCn} /></Field>
            <Field label="UF2 (Hz)"><Input value={data.ufStage2Freq} onChange={(e) => update('ufStage2Freq', e.target.value)} className={inputCn} /></Field>
            <Field label="UF2 Time (s)"><Input value={data.ufStage2Time} onChange={(e) => update('ufStage2Time', e.target.value)} className={inputCn} /></Field>
          </div>
          {/* ROCOF + Reconnection */}
          <p className="text-xs font-semibold text-white mt-3">ROCOF & Reconnection</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            <Field label="ROCOF (Hz/s)"><Input value={data.rocoFRate} onChange={(e) => update('rocoFRate', e.target.value)} className={inputCn} /></Field>
            <Field label="ROCOF Time (s)"><Input value={data.rocoFTime} onChange={(e) => update('rocoFTime', e.target.value)} className={inputCn} /></Field>
            <Field label="Reconnection (s)"><Input value={data.reconnectionDelay} onChange={(e) => update('reconnectionDelay', e.target.value)} className={inputCn} /></Field>
          </div>
        </Section>

        {/* Commissioning Confirmation */}
        <Section title="Commissioning Confirmation" accentColor="from-emerald-500/40 to-green-400/20">
          <div className="space-y-2">
            <TickButton checked={data.antiIslandingConfirmed} label="Anti-islanding protection confirmed operational" onChange={() => update('antiIslandingConfirmed', !data.antiIslandingConfirmed)} />
            <TickButton checked={data.protectionSettingsVerified} label="Protection settings verified against type test certificate" onChange={() => update('protectionSettingsVerified', !data.protectionSettingsVerified)} />
            <TickButton checked={data.systemOperating} label="System energised and operating correctly" onChange={() => update('systemOperating', !data.systemOperating)} />
            <TickButton checked={data.labelsApplied} label="All labels and warning notices fitted" onChange={() => update('labelsApplied', !data.labelsApplied)} />
            <TickButton checked={data.customerInformed} label="Customer informed of system operation" onChange={() => update('customerInformed', !data.customerInformed)} />
          </div>
        </Section>

        {/* Declaration */}
        <Section title="Declaration" accentColor="from-elec-yellow/40 to-amber-400/20">
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 mb-3">
            <p className="text-xs text-white leading-relaxed">I confirm that the generating equipment described above has been installed and commissioned in accordance with EREC G98 and is connected to the distribution network. The protection settings have been verified and the system is operating correctly.</p>
          </div>
          <SignatureInput label="Installer Signature" value={data.installerSignature} onChange={(sig) => update('installerSignature', sig || '')} />
          <Field label="Date"><Input type="date" value={data.installerDate} onChange={(e) => update('installerDate', e.target.value)} className={inputCn} /></Field>
          <SignatureInput label="Customer Signature (optional)" value={data.customerSignature} onChange={(sig) => update('customerSignature', sig || '')} />
          {data.customerSignature && <Field label="Customer Date"><Input type="date" value={data.customerDate} onChange={(e) => update('customerDate', e.target.value)} className={inputCn} /></Field>}
        </Section>

        {/* Notes */}
        <Section title="Notes" accentColor="from-white/20 to-white/5">
          <Textarea value={data.notes} onChange={(e) => update('notes', e.target.value)} className="touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500" placeholder="Additional notes..." />
        </Section>

        {/* Actions */}
        <motion.div variants={itemVariants} className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 h-12 text-sm font-medium touch-manipulation active:scale-[0.98] border-white/[0.08] text-white hover:bg-white/[0.06]" onClick={handleSaveDraft}>Save Draft</Button>
          <Button className="flex-1 h-12 text-sm font-medium touch-manipulation active:scale-[0.98] bg-orange-500 text-white hover:bg-orange-600" onClick={handleGeneratePDF} disabled={isSaving}>
            {isSaving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Generating...</> : 'Download PDF'}
          </Button>
        </motion.div>
      </motion.main>

      {/* Draft recovery dialog */}
      <AlertDialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Recover Draft?</AlertDialogTitle><AlertDialogDescription>A previous unsaved G98 form was found. Would you like to recover it?</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => { discardDraft(); setShowRecoveryDialog(false); }}>Discard</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (recoveryDraft) { setData((prev) => ({ ...defaultData(), ...prev, ...recoveryDraft.data })); recoverDraft(); } setShowRecoveryDialog(false); }}>Recover Draft</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
