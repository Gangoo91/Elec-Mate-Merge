import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap, Loader2, Plus, Trash2, Save } from 'lucide-react';
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
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const containerVariants = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const itemVariants = { hidden: { opacity: 0, y: 8 }, visible: { opacity: 1, y: 0, transition: { duration: 0.25 } } };
const inputCn = 'h-12 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 [color-scheme:dark]';
const selectTriggerCn = 'h-12 touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500 data-[state=open]:border-yellow-500';
const selectContentCn = 'z-[100] max-w-[calc(100vw-2rem)] bg-elec-gray border-elec-gray text-foreground';
const checkboxCn = 'border-white/40 data-[state=checked]:bg-elec-yellow data-[state=checked]:border-elec-yellow data-[state=checked]:text-black';
const textareaCn = 'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500';

const ALARM_MANUFACTURERS = ['Aico', 'Kidde / BRK', 'FireAngel', 'Honeywell', 'Other'];
const FLOORS = ['Basement', 'Ground', 'First', 'Second', 'Third', 'Loft'];
const ROOMS = ['Hallway', 'Landing', 'Living Room', 'Bedroom 1', 'Bedroom 2', 'Bedroom 3', 'Kitchen', 'Dining Room', 'Utility', 'Garage', 'Loft', 'Study', 'Other'];
const COMMON_RECOMMENDATIONS = [
  'Recommend upgrade from LD3 to LD2 for enhanced protection',
  'Existing ionisation alarms should be replaced with optical or multi-sensor type',
  'CO alarm approaching end of life — replace by replacement date shown',
  'Recommend interlinked system for improved safety',
  'Additional smoke alarm recommended in [room] for LD2 coverage',
  'Heat alarm recommended in kitchen to reduce false alarms',
];

interface AlarmEntry {
  id: string;
  floor: string;
  room: string;
  alarmType: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  powerSource: string;
  interconnect: string;
  wirelessModule: string;
  dateOfManufacture: string;
  replacementDue: string;
  mounting: string;
  functionalTest: string;
  mainsIndicator: string;
}

interface SmokeCOData {
  referenceNumber: string;
  installationDate: string;
  certificateType: string;
  // Property
  propertyAddress: string;
  propertyType: string;
  numberOfStoreys: string;
  numberOfRooms: string;
  tenure: string;
  hmoLicenceNumber: string;
  combustionAppliances: string[];
  combustionApplianceLocations: string;
  // Landlord
  landlordName: string;
  landlordAddress: string;
  landlordPhone: string;
  landlordEmail: string;
  managingAgentName: string;
  managingAgentCompany: string;
  managingAgentPhone: string;
  managingAgentEmail: string;
  tenantName: string;
  // Installer
  installerName: string;
  installerCompany: string;
  installerPhone: string;
  installerEmail: string;
  registrationScheme: string;
  registrationNumber: string;
  competentPersonScheme: boolean;
  // System design
  gradeAchieved: string;
  categoryAchieved: string;
  interconnectionMethod: string;
  rfWirelessSystem: string;
  powerSupply: string;
  circuitNumber: string;
  mcbRating: string;
  rcdProtected: boolean;
  cableType: string;
  // Alarms
  alarms: AlarmEntry[];
  // System tests
  interconnectionTest: string;
  interconnectionTriggerAlarm: string;
  audibilityTest: string;
  mainsSupplyVerified: string;
  batteryBackupTest: string;
  rfSignalTest: string;
  // Compliance
  compliesSmokeCORegs2022: boolean;
  compliesBS5839_6: boolean;
  compliesBSEN14604: boolean;
  compliesBSEN50291: boolean;
  compliesBS7671: boolean;
  partPNotification: string;
  // Recommendations
  observations: string;
  selectedRecommendations: string[];
  nextInspectionDate: string;
  // Signatures
  installerSignature: string;
  installerDate: string;
  clientSignature: string;
  clientDate: string;
  notes: string;
}

const newAlarm = (): AlarmEntry => ({
  id: crypto.randomUUID(), floor: '', room: '', alarmType: '', manufacturer: '', model: '', serialNumber: '',
  powerSource: '', interconnect: '', wirelessModule: '', dateOfManufacture: '', replacementDue: '', mounting: 'ceiling',
  functionalTest: '', mainsIndicator: '',
});

const defaultData = (): SmokeCOData => ({
  referenceNumber: `SCA-${Date.now().toString(36).toUpperCase()}`,
  installationDate: new Date().toISOString().split('T')[0],
  certificateType: 'new-installation',
  propertyAddress: '', propertyType: '', numberOfStoreys: '', numberOfRooms: '',
  tenure: 'private-rental', hmoLicenceNumber: '',
  combustionAppliances: [], combustionApplianceLocations: '',
  landlordName: '', landlordAddress: '', landlordPhone: '', landlordEmail: '',
  managingAgentName: '', managingAgentCompany: '', managingAgentPhone: '', managingAgentEmail: '',
  tenantName: '',
  installerName: '', installerCompany: '', installerPhone: '', installerEmail: '',
  registrationScheme: '', registrationNumber: '', competentPersonScheme: false,
  gradeAchieved: '', categoryAchieved: '', interconnectionMethod: '', rfWirelessSystem: '',
  powerSupply: '', circuitNumber: '', mcbRating: '', rcdProtected: false, cableType: '',
  alarms: [newAlarm()],
  interconnectionTest: '', interconnectionTriggerAlarm: '', audibilityTest: '',
  mainsSupplyVerified: '', batteryBackupTest: '', rfSignalTest: '',
  compliesSmokeCORegs2022: false, compliesBS5839_6: false, compliesBSEN14604: false,
  compliesBSEN50291: false, compliesBS7671: false, partPNotification: '',
  observations: '', selectedRecommendations: [], nextInspectionDate: '',
  installerSignature: '', installerDate: new Date().toISOString().split('T')[0],
  clientSignature: '', clientDate: '', notes: '',
});

const DRAFT_KEY = 'elec-mate-draft-smoke-co';

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

const PassFailButtons = ({ value, onChange, includeNA }: { value: string; onChange: (v: string) => void; includeNA?: boolean }) => (
  <div className="flex gap-2">
    {['pass', 'fail', ...(includeNA ? [''] : [])].map((v) => (
      <button key={v || 'na'} type="button" onClick={() => onChange(v)}
        className={cn('flex-1 h-11 rounded-lg text-xs font-semibold touch-manipulation transition-all',
          value === v ? (v === 'pass' ? 'bg-green-500 text-white' : v === 'fail' ? 'bg-red-500 text-white' : 'bg-white/20 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
        {v === 'pass' ? 'Pass' : v === 'fail' ? 'Fail' : 'N/A'}
      </button>
    ))}
  </div>
);

// Auto-calculate replacement date from manufacture date
function calcReplacementDate(mfgDate: string, alarmType: string): string {
  if (!mfgDate) return '';
  const d = new Date(mfgDate);
  if (isNaN(d.getTime())) return '';
  const years = alarmType === 'CO' || alarmType === 'multi-sensor-heat-co' ? 7 : 10;
  d.setFullYear(d.getFullYear() + years);
  return d.toISOString().split('T')[0];
}

export default function SmokeCOAlarmCertificate() {
  const navigate = useNavigate();
  const { id: editId } = useParams<{ id: string }>();
  const isNew = editId === 'new' || !editId;
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [savedReportId, setSavedReportId] = useState<string | null>(editId !== 'new' ? editId || null : null);
  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);
  const [recoveryDraft, setRecoveryDraft] = useState<{ data: any; lastModified: Date } | null>(null);

  const [data, setData] = useState<SmokeCOData>(defaultData());

  const {
    status: syncStatus, saveNow, syncNowImmediate,
    hasRecoverableDraft, recoverDraft, discardDraft,
  } = useReportSync({
    reportId: savedReportId,
    reportType: 'smoke-co-alarm' as any,
    formData: data,
    enabled: !isLoading,
    onReportCreated: (newId) => {
      setSavedReportId(newId);
      window.history.replaceState(null, '', `/electrician/inspection-testing/smoke-co-alarm/${newId}`);
    },
  });

  useEffect(() => {
    if (isNew || !editId) { setIsLoading(false); return; }
    const load = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setIsLoading(false); return; }
        const reportData = await reportCloud.getReportData(editId, user.id);
        if (reportData) { setData((prev) => ({ ...defaultData(), ...prev, ...(reportData as any) })); setSavedReportId(editId); }
      } catch (err) { console.error('Failed to load Smoke & CO:', err); }
      finally { setIsLoading(false); }
    };
    load();
  }, [editId, isNew]);

  useEffect(() => {
    if (!isNew || !hasRecoverableDraft) return;
    const draft = draftStorage.loadDraft('smoke-co-alarm' as any, null);
    if (draft) { setRecoveryDraft(draft); setShowRecoveryDialog(true); }
  }, [isNew, hasRecoverableDraft]);

  useEffect(() => {
    if (data.installerName) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: cpData } = await supabase.rpc('get_my_company_profile');
      const cp = Array.isArray(cpData) ? cpData[0] : cpData;
      if (cp) setData((prev) => ({ ...prev, installerName: prev.installerName || cp.inspector_name || '', installerCompany: prev.installerCompany || cp.company_name || '', installerPhone: prev.installerPhone || cp.company_phone || '', installerEmail: prev.installerEmail || cp.company_email || '', registrationScheme: prev.registrationScheme || cp.registration_scheme || '', registrationNumber: prev.registrationNumber || cp.registration_number || '' }));
    });
  }, []);

  const update = useCallback((field: keyof SmokeCOData, value: any) => { setData((prev) => ({ ...prev, [field]: value })); }, []);

  const updateAlarm = useCallback((id: string, field: keyof AlarmEntry, value: any) => {
    setData((prev) => {
      const alarms = prev.alarms.map((a) => {
        if (a.id !== id) return a;
        const updated = { ...a, [field]: value };
        // Auto-calculate replacement date when manufacture date or type changes
        if (field === 'dateOfManufacture' || field === 'alarmType') {
          updated.replacementDue = calcReplacementDate(
            field === 'dateOfManufacture' ? value : updated.dateOfManufacture,
            field === 'alarmType' ? value : updated.alarmType
          );
        }
        return updated;
      });
      return { ...prev, alarms };
    });
  }, []);

  const addAlarm = () => setData((prev) => ({ ...prev, alarms: [...prev.alarms, newAlarm()] }));
  const removeAlarm = (id: string) => { if (data.alarms.length <= 1) return; setData((prev) => ({ ...prev, alarms: prev.alarms.filter((a) => a.id !== id) })); };

  const toggleCombustionAppliance = (appliance: string) => {
    setData((prev) => ({
      ...prev,
      combustionAppliances: prev.combustionAppliances.includes(appliance)
        ? prev.combustionAppliances.filter((a) => a !== appliance)
        : [...prev.combustionAppliances, appliance],
    }));
  };

  const toggleRecommendation = (rec: string) => {
    setData((prev) => ({
      ...prev,
      selectedRecommendations: prev.selectedRecommendations.includes(rec)
        ? prev.selectedRecommendations.filter((r) => r !== rec)
        : [...prev.selectedRecommendations, rec],
    }));
  };

  // Compliance warnings
  const smokeAlarmFloors = new Set(data.alarms.filter((a) => a.alarmType && a.alarmType !== 'CO' && a.alarmType !== 'multi-sensor-heat-co').map((a) => a.floor));
  const totalStoreys = parseInt(data.numberOfStoreys) || 0;
  const hasSmokeEveryStorey = totalStoreys > 0 && smokeAlarmFloors.size >= totalStoreys;
  const hasCombustionAppliances = data.combustionAppliances.length > 0;
  const hasCOAlarm = data.alarms.some((a) => a.alarmType === 'CO' || a.alarmType === 'multi-sensor-heat-co');
  const coAlarmNeeded = hasCombustionAppliances && !hasCOAlarm;

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try { await saveNow(); toast.success('Draft saved'); }
    catch { toast.error('Failed to save'); }
    finally { setIsSaving(false); }
  };

  const handleGeneratePDF = async () => {
    if (!data.propertyAddress) { toast.error('Property address required'); return; }
    setIsSaving(true);
    try {
      await syncNowImmediate();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error('Please sign in'); setIsSaving(false); return; }

      let company: Record<string, any> = {};
      try { const { data: cpData } = await supabase.rpc('get_my_company_profile'); const cp = Array.isArray(cpData) ? cpData[0] : cpData; if (cp) company = cp; } catch {}
      const payload = { ...data, companyName: company.company_name || data.installerCompany, companyAddress: company.company_address || '', companyPhone: company.company_phone || data.installerPhone, companyEmail: company.company_email || data.installerEmail, companyLogo: company.company_logo || '' };
      const { data: pdfResult, error: pdfError } = await supabase.functions.invoke('generate-smoke-co-alarm-pdf', { body: { formData: payload } });
      if (pdfError) { toast.error('PDF generation failed'); }
      else if (pdfResult?.download_url) {
        let url = pdfResult.download_url;
        const reportId = savedReportId || data.referenceNumber;
        try { const { saveCertificatePdf } = await import('@/utils/certificate-pdf-storage'); const { permanentUrl, storagePath } = await saveCertificatePdf(pdfResult.download_url, user.id, reportId, data.referenceNumber); url = permanentUrl; await supabase.from('reports').update({ storage_path: storagePath, pdf_url: url, pdf_generated_at: new Date().toISOString(), status: 'completed' }).eq('report_id', reportId); } catch { await supabase.from('reports').update({ pdf_url: url, pdf_generated_at: new Date().toISOString(), status: 'completed' }).eq('report_id', reportId); }
        const { openOrDownloadPdf } = await import('@/utils/pdf-download');
        await openOrDownloadPdf(url, `Smoke-CO-Alarm-${data.referenceNumber}.pdf`);
        toast.success('Smoke & CO alarm certificate generated');
      }
    } catch { toast.error('Failed to generate PDF'); } finally { setIsSaving(false); }
  };

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <div className="flex items-center gap-3">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]"><ArrowLeft className="h-5 w-5" /></Button>
              <div className="flex items-center gap-2.5">
                <div className="p-1.5 rounded-lg bg-red-500/10 border border-red-500/20"><Zap className="h-4 w-4 text-red-400" /></div>
                <h1 className="text-base font-semibold text-white">Smoke & CO Alarm</h1>
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
        <motion.div variants={itemVariants} className="border-b border-red-500/20 pb-3">
          <p className="text-sm font-bold text-red-400">SMOKE & CO ALARM INSTALLATION CERTIFICATE</p>
          <p className="text-xs text-white mt-1">BS 5839-6:2019+A1:2020 | Smoke and Carbon Monoxide Alarm (England) Regulations 2015 (as amended 2022)</p>
        </motion.div>

        {/* Compliance warnings */}
        {(data.tenure === 'HMO' && data.gradeAchieved && data.gradeAchieved !== 'A' && data.gradeAchieved !== 'D') && (
          <motion.div variants={itemVariants} className="rounded-xl bg-red-500/10 border border-red-500/20 p-3">
            <p className="text-xs text-red-400 font-semibold">HMO Warning: LACORS guide requires minimum Grade D (or Grade A for large HMOs). Current: Grade {data.gradeAchieved}</p>
          </motion.div>
        )}
        {(totalStoreys > 0 && !hasSmokeEveryStorey) && (
          <motion.div variants={itemVariants} className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-3">
            <p className="text-xs text-amber-400 font-semibold">Warning: Smoke alarm not recorded on every storey ({smokeAlarmFloors.size}/{totalStoreys} covered)</p>
          </motion.div>
        )}
        {coAlarmNeeded && (
          <motion.div variants={itemVariants} className="rounded-xl bg-red-500/10 border border-red-500/20 p-3">
            <p className="text-xs text-red-400 font-semibold">Warning: Combustion appliance present but no CO alarm recorded — required by 2022 Regulations</p>
          </motion.div>
        )}

        {/* 1. Certificate Details */}
        <Section title="Certificate Details" accentColor="from-white/20 to-white/5">
          <Field label="Reference No."><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Installation Date"><Input type="date" value={data.installationDate} onChange={(e) => update('installationDate', e.target.value)} className={inputCn} /></Field>
            <Field label="Certificate Type">
              <Select value={data.certificateType} onValueChange={(v) => update('certificateType', v)}>
                <SelectTrigger className={selectTriggerCn}><SelectValue /></SelectTrigger>
                <SelectContent className={selectContentCn}>
                  <SelectItem value="new-installation">New installation</SelectItem>
                  <SelectItem value="upgrade">Upgrade</SelectItem>
                  <SelectItem value="replacement">Replacement</SelectItem>
                  <SelectItem value="addition">Addition to existing</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
        </Section>

        {/* 2. Property */}
        <Section title="Property Details" accentColor="from-blue-500/40 to-cyan-400/20">
          <Field label="Property Address" required><Input value={data.propertyAddress} onChange={(e) => update('propertyAddress', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Property Type">
              <Select value={data.propertyType} onValueChange={(v) => update('propertyType', v)}>
                <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent className={selectContentCn}>
                  <SelectItem value="House">House</SelectItem>
                  <SelectItem value="Flat">Flat</SelectItem>
                  <SelectItem value="Bungalow">Bungalow</SelectItem>
                  <SelectItem value="Maisonette">Maisonette</SelectItem>
                  <SelectItem value="HMO">HMO</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Tenure">
              <Select value={data.tenure} onValueChange={(v) => update('tenure', v)}>
                <SelectTrigger className={selectTriggerCn}><SelectValue /></SelectTrigger>
                <SelectContent className={selectContentCn}>
                  <SelectItem value="private-rental">Private rental</SelectItem>
                  <SelectItem value="social-housing">Social housing</SelectItem>
                  <SelectItem value="owner-occupied">Owner-occupied</SelectItem>
                  <SelectItem value="HMO">HMO (licensed)</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Number of Storeys"><Input type="number" value={data.numberOfStoreys} onChange={(e) => update('numberOfStoreys', e.target.value)} className={inputCn} placeholder="e.g. 2" /></Field>
            <Field label="Habitable Rooms"><Input type="number" value={data.numberOfRooms} onChange={(e) => update('numberOfRooms', e.target.value)} className={inputCn} /></Field>
          </div>
          {data.tenure === 'HMO' && <Field label="HMO Licence No."><Input value={data.hmoLicenceNumber} onChange={(e) => update('hmoLicenceNumber', e.target.value)} className={inputCn} /></Field>}
          <div>
            <Label className="text-white text-xs mb-2 block">Combustion Appliances Present</Label>
            <div className="grid grid-cols-2 gap-2">
              {['Gas boiler', 'Oil boiler', 'Solid fuel', 'Gas fire', 'Open fire', 'None'].map((app) => (
                <div key={app} className="flex items-center gap-3">
                  <Checkbox checked={data.combustionAppliances.includes(app)} onCheckedChange={() => toggleCombustionAppliance(app)} className={checkboxCn} />
                  <Label className="text-sm text-white">{app}</Label>
                </div>
              ))}
            </div>
          </div>
          {data.combustionAppliances.length > 0 && data.combustionAppliances[0] !== 'None' && (
            <Field label="Appliance Locations"><Input value={data.combustionApplianceLocations} onChange={(e) => update('combustionApplianceLocations', e.target.value)} className={inputCn} placeholder="e.g. Kitchen (gas boiler), Living room (gas fire)" /></Field>
          )}
        </Section>

        {/* 3. Landlord */}
        <Section title="Landlord / Client" accentColor="from-purple-500/40 to-indigo-400/20">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Landlord Name"><Input value={data.landlordName} onChange={(e) => update('landlordName', e.target.value)} className={inputCn} /></Field>
            <Field label="Phone"><Input type="tel" value={data.landlordPhone} onChange={(e) => update('landlordPhone', e.target.value)} className={inputCn} /></Field>
          </div>
          <Field label="Email"><Input type="email" value={data.landlordEmail} onChange={(e) => update('landlordEmail', e.target.value)} className={inputCn} /></Field>
          <Field label="Landlord Address"><Input value={data.landlordAddress} onChange={(e) => update('landlordAddress', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Managing Agent"><Input value={data.managingAgentName} onChange={(e) => update('managingAgentName', e.target.value)} className={inputCn} placeholder="If applicable" /></Field>
            <Field label="Agent Company"><Input value={data.managingAgentCompany} onChange={(e) => update('managingAgentCompany', e.target.value)} className={inputCn} /></Field>
          </div>
          {data.managingAgentName && (
            <div className="grid grid-cols-2 gap-3">
              <Field label="Agent Phone"><Input type="tel" value={data.managingAgentPhone} onChange={(e) => update('managingAgentPhone', e.target.value)} className={inputCn} /></Field>
              <Field label="Agent Email"><Input type="email" value={data.managingAgentEmail} onChange={(e) => update('managingAgentEmail', e.target.value)} className={inputCn} /></Field>
            </div>
          )}
          <Field label="Tenant Name"><Input value={data.tenantName} onChange={(e) => update('tenantName', e.target.value)} className={inputCn} placeholder="Optional" /></Field>
        </Section>

        {/* 4. Installer */}
        <Section title="Installer" accentColor="from-elec-yellow/40 to-amber-400/20">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Name"><Input value={data.installerName} onChange={(e) => update('installerName', e.target.value)} className={inputCn} /></Field>
            <Field label="Company"><Input value={data.installerCompany} onChange={(e) => update('installerCompany', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Phone"><Input type="tel" value={data.installerPhone} onChange={(e) => update('installerPhone', e.target.value)} className={inputCn} /></Field>
            <Field label="Email"><Input type="email" value={data.installerEmail} onChange={(e) => update('installerEmail', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Scheme"><Input value={data.registrationScheme} onChange={(e) => update('registrationScheme', e.target.value)} className={inputCn} placeholder="NICEIC, NAPIT..." /></Field>
            <Field label="Reg. No."><Input value={data.registrationNumber} onChange={(e) => update('registrationNumber', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="flex items-center gap-3">
            <Checkbox checked={data.competentPersonScheme} onCheckedChange={(v) => update('competentPersonScheme', !!v)} className={checkboxCn} />
            <Label className="text-sm text-white">Registered with competent person scheme (Part P self-certification)</Label>
          </div>
        </Section>

        {/* 5. System Design */}
        <Section title="System Design" accentColor="from-red-500/40 to-orange-400/20">
          <div className="grid grid-cols-2 gap-3">
            <Field label="BS 5839-6 Grade" required>
              <Select value={data.gradeAchieved} onValueChange={(v) => update('gradeAchieved', v)}>
                <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent className={selectContentCn}>
                  <SelectItem value="A">Grade A — Fire alarm panel system</SelectItem>
                  <SelectItem value="B">Grade B — Mains system, no panel</SelectItem>
                  <SelectItem value="C">Grade C — Mains, dedicated supply</SelectItem>
                  <SelectItem value="D">Grade D — Mains + battery, interlinked</SelectItem>
                  <SelectItem value="E">Grade E — Mains, no standby</SelectItem>
                  <SelectItem value="F">Grade F — Battery only</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="BS 5839-6 Category" required>
              <Select value={data.categoryAchieved} onValueChange={(v) => update('categoryAchieved', v)}>
                <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent className={selectContentCn}>
                  <SelectItem value="LD1">LD1 — All rooms (max coverage)</SelectItem>
                  <SelectItem value="LD2">LD2 — Circulation + high-risk rooms</SelectItem>
                  <SelectItem value="LD3">LD3 — Circulation spaces only (min)</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Interconnection">
              <Select value={data.interconnectionMethod} onValueChange={(v) => update('interconnectionMethod', v)}>
                <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent className={selectContentCn}>
                  <SelectItem value="hardwired">Hardwired</SelectItem>
                  <SelectItem value="rf-wireless">RF wireless</SelectItem>
                  <SelectItem value="combination">Combination</SelectItem>
                  <SelectItem value="standalone">Standalone (no interconnection)</SelectItem>
                </SelectContent>
              </Select>
            </Field>
            <Field label="Power Supply">
              <Select value={data.powerSupply} onValueChange={(v) => update('powerSupply', v)}>
                <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent className={selectContentCn}>
                  <SelectItem value="mains-sealed-lithium">Mains + sealed lithium backup</SelectItem>
                  <SelectItem value="mains-rechargeable">Mains + rechargeable backup</SelectItem>
                  <SelectItem value="sealed-lithium">Sealed lithium battery (10yr)</SelectItem>
                  <SelectItem value="replaceable-battery">Replaceable battery</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          </div>
          {data.interconnectionMethod === 'rf-wireless' && (
            <Field label="RF Wireless System">
              <Select value={data.rfWirelessSystem} onValueChange={(v) => update('rfWirelessSystem', v)}>
                <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
                <SelectContent className={selectContentCn}>
                  <SelectItem value="Aico RadioLINK+">Aico RadioLINK+</SelectItem>
                  <SelectItem value="FireAngel Wi-Safe 2">FireAngel Wi-Safe 2</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </Field>
          )}
          {(data.interconnectionMethod === 'hardwired' || data.interconnectionMethod === 'combination') && (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Field label="Circuit No."><Input value={data.circuitNumber} onChange={(e) => update('circuitNumber', e.target.value)} className={inputCn} /></Field>
              <Field label="MCB Rating"><Input value={data.mcbRating} onChange={(e) => update('mcbRating', e.target.value)} className={inputCn} placeholder="e.g. 6A" /></Field>
              <Field label="Cable Type"><Input value={data.cableType} onChange={(e) => update('cableType', e.target.value)} className={inputCn} placeholder="e.g. 1.5mm² 3c+E" /></Field>
              <div className="flex items-center gap-2 pt-6"><Checkbox checked={data.rcdProtected} onCheckedChange={(v) => update('rcdProtected', !!v)} className={checkboxCn} /><Label className="text-xs text-white">RCD</Label></div>
            </div>
          )}
        </Section>

        {/* 6. Alarm Schedule */}
        <Section title={`Alarm Schedule (${data.alarms.length})`} accentColor="from-red-500/50 to-orange-400/20">
          {data.alarms.map((alarm, idx) => (
            <div key={alarm.id} className="p-3 bg-white/[0.03] rounded-xl border border-white/[0.06] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-elec-yellow">Alarm {idx + 1}</span>
                <div className="flex items-center gap-2">
                  {alarm.replacementDue && <span className="text-[10px] text-white bg-white/[0.06] px-2 py-0.5 rounded">Replace: {alarm.replacementDue}</span>}
                  {data.alarms.length > 1 && <button onClick={() => removeAlarm(alarm.id)} className="w-8 h-8 rounded-lg flex items-center justify-center text-white hover:text-red-400 touch-manipulation"><Trash2 className="h-4 w-4" /></button>}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Select value={alarm.floor} onValueChange={(v) => updateAlarm(alarm.id, 'floor', v)}>
                  <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] text-white text-sm"><SelectValue placeholder="Floor" /></SelectTrigger>
                  <SelectContent className={selectContentCn}>{FLOORS.map((f) => <SelectItem key={f} value={f}>{f}</SelectItem>)}</SelectContent>
                </Select>
                <Select value={alarm.room} onValueChange={(v) => updateAlarm(alarm.id, 'room', v)}>
                  <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] text-white text-sm"><SelectValue placeholder="Room" /></SelectTrigger>
                  <SelectContent className={selectContentCn}>{ROOMS.map((r) => <SelectItem key={r} value={r}>{r}</SelectItem>)}</SelectContent>
                </Select>
              </div>
              <Select value={alarm.alarmType} onValueChange={(v) => updateAlarm(alarm.id, 'alarmType', v)}>
                <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] text-white text-sm"><SelectValue placeholder="Alarm type" /></SelectTrigger>
                <SelectContent className={selectContentCn}>
                  <SelectItem value="optical-smoke">Optical smoke</SelectItem>
                  <SelectItem value="heat">Heat</SelectItem>
                  <SelectItem value="multi-sensor-smoke-heat">Multi-sensor (smoke + heat)</SelectItem>
                  <SelectItem value="CO">CO alarm</SelectItem>
                  <SelectItem value="multi-sensor-heat-co">Multi-sensor (heat + CO)</SelectItem>
                </SelectContent>
              </Select>
              <div className="grid grid-cols-2 gap-2">
                <Select value={alarm.manufacturer} onValueChange={(v) => updateAlarm(alarm.id, 'manufacturer', v)}>
                  <SelectTrigger className="h-11 touch-manipulation bg-white/[0.06] border-white/[0.08] text-white text-sm"><SelectValue placeholder="Manufacturer" /></SelectTrigger>
                  <SelectContent className={selectContentCn}>{ALARM_MANUFACTURERS.map((m) => <SelectItem key={m} value={m}>{m}</SelectItem>)}</SelectContent>
                </Select>
                <Input value={alarm.model} onChange={(e) => updateAlarm(alarm.id, 'model', e.target.value)} className="h-11 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white" placeholder="Model" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input value={alarm.serialNumber} onChange={(e) => updateAlarm(alarm.id, 'serialNumber', e.target.value)} className="h-11 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white" placeholder="Serial number" />
                <Input type="date" value={alarm.dateOfManufacture} onChange={(e) => updateAlarm(alarm.id, 'dateOfManufacture', e.target.value)} className="h-11 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]" />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Select value={alarm.powerSource} onValueChange={(v) => updateAlarm(alarm.id, 'powerSource', v)}>
                  <SelectTrigger className="h-11 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white"><SelectValue placeholder="Power source" /></SelectTrigger>
                  <SelectContent className={selectContentCn}>
                    <SelectItem value="mains-sealed-lithium">Mains + sealed lithium</SelectItem>
                    <SelectItem value="mains-rechargeable">Mains + rechargeable</SelectItem>
                    <SelectItem value="sealed-lithium">Sealed lithium (10yr)</SelectItem>
                    <SelectItem value="replaceable-battery">Replaceable battery</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={alarm.interconnect} onValueChange={(v) => updateAlarm(alarm.id, 'interconnect', v)}>
                  <SelectTrigger className="h-11 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white"><SelectValue placeholder="Interconnect" /></SelectTrigger>
                  <SelectContent className={selectContentCn}>
                    <SelectItem value="hardwired">Hardwired</SelectItem>
                    <SelectItem value="rf-wireless">RF wireless</SelectItem>
                    <SelectItem value="standalone">Standalone</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {alarm.interconnect === 'rf-wireless' && (
                <Input value={alarm.wirelessModule} onChange={(e) => updateAlarm(alarm.id, 'wirelessModule', e.target.value)} className="h-11 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white" placeholder="Wireless module (e.g. Ei3000MRF)" />
              )}
              <div className="grid grid-cols-2 gap-2">
                <Select value={alarm.mounting} onValueChange={(v) => updateAlarm(alarm.id, 'mounting', v)}>
                  <SelectTrigger className="h-11 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white"><SelectValue placeholder="Mounting" /></SelectTrigger>
                  <SelectContent className={selectContentCn}>
                    <SelectItem value="ceiling">Ceiling</SelectItem>
                    <SelectItem value="wall">Wall</SelectItem>
                  </SelectContent>
                </Select>
                <div />
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div><Label className="text-[10px] text-white mb-1 block">Functional Test</Label><PassFailButtons value={alarm.functionalTest} onChange={(v) => updateAlarm(alarm.id, 'functionalTest', v)} /></div>
                <div><Label className="text-[10px] text-white mb-1 block">Mains Indicator</Label><PassFailButtons value={alarm.mainsIndicator} onChange={(v) => updateAlarm(alarm.id, 'mainsIndicator', v)} includeNA /></div>
              </div>
            </div>
          ))}
          <button onClick={addAlarm} className="w-full h-11 rounded-xl border-2 border-dashed border-red-500/20 flex items-center justify-center gap-2 text-sm font-medium text-red-400 touch-manipulation active:scale-[0.98] hover:border-red-500/30 transition-all">
            <Plus className="h-4 w-4" /> Add Alarm
          </button>
        </Section>

        {/* 7. System Tests */}
        <Section title="System Tests" accentColor="from-green-500/40 to-emerald-400/20">
          <Field label="Interconnection Test"><PassFailButtons value={data.interconnectionTest} onChange={(v) => update('interconnectionTest', v)} includeNA /></Field>
          {data.interconnectionTest === 'pass' && <Field label="Triggered from"><Input value={data.interconnectionTriggerAlarm} onChange={(e) => update('interconnectionTriggerAlarm', e.target.value)} className={inputCn} placeholder="e.g. Ground floor hallway — all alarms sounded" /></Field>}
          <Field label="Audibility Test (bedrooms, doors closed)"><PassFailButtons value={data.audibilityTest} onChange={(v) => update('audibilityTest', v)} includeNA /></Field>
          <Field label="Mains Supply Verified"><PassFailButtons value={data.mainsSupplyVerified} onChange={(v) => update('mainsSupplyVerified', v)} includeNA /></Field>
          <Field label="Battery Backup Test"><PassFailButtons value={data.batteryBackupTest} onChange={(v) => update('batteryBackupTest', v)} includeNA /></Field>
          <Field label="RF Signal Strength (if wireless)"><PassFailButtons value={data.rfSignalTest} onChange={(v) => update('rfSignalTest', v)} includeNA /></Field>
        </Section>

        {/* 8. Compliance */}
        <Section title="Compliance Declaration" accentColor="from-emerald-500/40 to-green-400/20">
          <div className="space-y-2">
            {[
              { field: 'compliesSmokeCORegs2022' as const, label: 'Complies with Smoke and Carbon Monoxide Alarm (England) Regulations 2015 (as amended 2022)' },
              { field: 'compliesBS5839_6' as const, label: `Complies with BS 5839-6:2019+A1:2020 — Grade ${data.gradeAchieved || '?'}, Category ${data.categoryAchieved || '?'}` },
              { field: 'compliesBSEN14604' as const, label: 'All smoke alarms comply with BS EN 14604' },
              { field: 'compliesBSEN50291' as const, label: 'All CO alarms comply with BS EN 50291-1:2018 and carry BSI Kitemark' },
              { field: 'compliesBS7671' as const, label: 'Electrical work complies with BS 7671:2018+A3:2024 (if hardwired)' },
            ].map(({ field, label }) => (
              <div key={field} className="flex items-center gap-3">
                <Checkbox checked={data[field]} onCheckedChange={(v) => update(field, !!v)} className={checkboxCn} />
                <Label className="text-sm text-white">{label}</Label>
              </div>
            ))}
          </div>
          <Field label="Part P Notification">
            <Select value={data.partPNotification} onValueChange={(v) => update('partPNotification', v)}>
              <SelectTrigger className={selectTriggerCn}><SelectValue placeholder="Select..." /></SelectTrigger>
              <SelectContent className={selectContentCn}>
                <SelectItem value="self-certified">Self-certified via competent person scheme</SelectItem>
                <SelectItem value="building-control">Notified to building control</SelectItem>
                <SelectItem value="not-applicable">Not applicable (battery only / existing circuit)</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </Section>

        {/* 9. Recommendations */}
        <Section title="Recommendations & Observations" accentColor="from-amber-500/40 to-yellow-400/20">
          <div className="space-y-1.5 mb-3">
            {COMMON_RECOMMENDATIONS.map((rec) => (
              <button key={rec} onClick={() => toggleRecommendation(rec)} className={cn('w-full text-left text-xs p-2.5 rounded-lg border touch-manipulation active:scale-[0.98] transition-all', data.selectedRecommendations.includes(rec) ? 'bg-amber-500/10 border-amber-500/25 text-amber-400' : 'bg-white/[0.03] border-white/[0.06] text-white')}>
                {rec}
              </button>
            ))}
          </div>
          <Field label="Additional Observations"><Textarea value={data.observations} onChange={(e) => update('observations', e.target.value)} className={textareaCn} placeholder="Any observations or additional recommendations..." /></Field>
          <Field label="Next Inspection Recommended"><Input type="date" value={data.nextInspectionDate} onChange={(e) => update('nextInspectionDate', e.target.value)} className={inputCn} /></Field>
        </Section>

        {/* 10. Signatures */}
        <Section title="Signatures" accentColor="from-elec-yellow/40 to-amber-400/20">
          <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 mb-3">
            <p className="text-xs text-white leading-relaxed">I certify that the smoke and carbon monoxide alarm system described in this certificate has been installed in accordance with the applicable standards and regulations. The system has been tested and is fully operational.</p>
          </div>
          <SignatureInput label="Installer Signature" value={data.installerSignature} onChange={(sig) => update('installerSignature', sig || '')} />
          <Field label="Date"><Input type="date" value={data.installerDate} onChange={(e) => update('installerDate', e.target.value)} className={inputCn} /></Field>
          <SignatureInput label="Landlord / Client Signature (optional)" value={data.clientSignature} onChange={(sig) => update('clientSignature', sig || '')} />
          {data.clientSignature && <Field label="Client Date"><Input type="date" value={data.clientDate} onChange={(e) => update('clientDate', e.target.value)} className={inputCn} /></Field>}
        </Section>

        {/* 11. Notes */}
        <Section title="Notes" accentColor="from-white/20 to-white/5">
          <Textarea value={data.notes} onChange={(e) => update('notes', e.target.value)} className={textareaCn} placeholder="Additional notes..." />
        </Section>

        {/* Actions */}
        <motion.div variants={itemVariants} className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 h-12 text-sm font-medium touch-manipulation active:scale-[0.98] border-white/[0.08] text-white hover:bg-white/[0.06]" onClick={handleSaveDraft}>Save Draft</Button>
          <Button className="flex-1 h-12 text-sm font-medium touch-manipulation active:scale-[0.98] bg-red-500 text-white hover:bg-red-600" onClick={handleGeneratePDF} disabled={isSaving}>
            {isSaving ? <><Loader2 className="h-4 w-4 animate-spin mr-2" />Generating...</> : 'Download PDF'}
          </Button>
        </motion.div>
      </motion.main>

      <AlertDialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
        <AlertDialogContent>
          <AlertDialogHeader><AlertDialogTitle>Recover Draft?</AlertDialogTitle><AlertDialogDescription>A previous unsaved Smoke & CO Alarm certificate was found. Would you like to recover it?</AlertDialogDescription></AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => { discardDraft(); setShowRecoveryDialog(false); }}>Discard</AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (recoveryDraft) { setData((prev) => ({ ...defaultData(), ...prev, ...recoveryDraft.data })); recoverDraft(); } setShowRecoveryDialog(false); }}>Recover Draft</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
