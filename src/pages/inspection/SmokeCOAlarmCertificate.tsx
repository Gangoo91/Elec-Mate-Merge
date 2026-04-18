import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Loader2, Trash2, Save } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import SignatureInput from '@/components/signature/SignatureInput';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { reportCloud } from '@/utils/reportCloud';
import { useReportSync } from '@/hooks/useReportSync';
import { SyncStatusBadge } from '@/components/inspection/SyncStatusBadge';
import { draftStorage } from '@/utils/draftStorage';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const inputCn = 'h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const textareaCn = 'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white';
const pickerTrigger = 'h-11 w-full touch-manipulation bg-white/[0.06] border-white/[0.08] text-white';

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

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <div className="border-b border-white/[0.06] pb-1">
      <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
    </div>
    {children}
  </div>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[10px] font-semibold text-white uppercase tracking-wider shrink-0">{title}</p>
    <div className="h-px flex-1 bg-white/[0.06]" />
  </div>
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
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState('document.pdf');
  const [generationError, setGenerationError] = useState<string | null>(null);
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
    isHydrating: isLoading, // Gate autosave while loading from cloud — prevents blank-overwrite race.
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
    setGeneratedPdfUrl(null);
    setGenerationError(null);
    setShowGenerationDialog(true);
    try {
      await syncNowImmediate();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error('Please sign in'); setIsSaving(false); return; }

      let branding: Record<string, string> = {};
      try { const { data: cpData } = await supabase.rpc('get_my_company_profile'); const cp = Array.isArray(cpData) ? cpData[0] : cpData; if (cp) branding = { companyName: cp.company_name || '', companyAddress: cp.company_address || '', companyPhone: cp.company_phone || '', companyEmail: cp.company_email || '', companyLogo: cp.company_logo || '' }; } catch {}
      const { formatSmokeCOJson } = await import('@/utils/smokeCOJsonFormatter');
      const payload = formatSmokeCOJson(data, branding);
      const { data: pdfResult, error: pdfError } = await supabase.functions.invoke('generate-smoke-co-alarm-pdf', { body: { formData: payload } });
      if (pdfError) throw new Error(pdfError.message || 'PDF generation failed');
      if (!pdfResult?.download_url) throw new Error('No PDF URL returned');

      const filename = `Smoke-CO-Alarm-${data.referenceNumber}.pdf`;
      let url = pdfResult.download_url;
      const reportId = savedReportId || data.referenceNumber;
      try { const { saveCertificatePdf } = await import('@/utils/certificate-pdf-storage'); const { permanentUrl, storagePath } = await saveCertificatePdf(pdfResult.download_url, user.id, reportId, data.referenceNumber); url = permanentUrl; await supabase.from('reports').update({ storage_path: storagePath, pdf_url: url, pdf_generated_at: new Date().toISOString(), status: 'completed' }).eq('report_id', reportId); } catch { await supabase.from('reports').update({ pdf_url: url, pdf_generated_at: new Date().toISOString(), status: 'completed' }).eq('report_id', reportId); }

      setGeneratedPdfUrl(url);
      setPdfFilename(filename);
      toast.success('Smoke & CO alarm certificate generated');
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to generate PDF';
      setGenerationError(msg);
      toast.error(msg);
    } finally { setIsSaving(false); }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="bg-background">
        <div className="px-2 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <h1 className="text-sm font-bold text-white leading-tight">Smoke & CO Alarm</h1>
                {data.referenceNumber && <p className="text-[10px] text-white font-mono mt-0.5">{data.referenceNumber}</p>}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SyncStatusBadge status={syncStatus} />
              <button onClick={handleSaveDraft} disabled={isSaving} className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.98] disabled:opacity-50">
                {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              </button>
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      <main className="py-4 pb-48 sm:px-4 sm:pb-8 space-y-6">
        {/* Compliance warnings */}
        {(data.tenure === 'HMO' && data.gradeAchieved && data.gradeAchieved !== 'A' && data.gradeAchieved !== 'D') && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-2.5">
            <p className="text-[11px] text-white">HMO: LACORS requires min Grade D (or A for large HMOs). Current: Grade {data.gradeAchieved}</p>
          </div>
        )}
        {(totalStoreys > 0 && !hasSmokeEveryStorey) && (
          <div className="rounded-lg bg-amber-500/10 border border-amber-500/20 p-2.5">
            <p className="text-[11px] text-white">Smoke alarm not on every storey ({smokeAlarmFloors.size}/{totalStoreys} covered)</p>
          </div>
        )}
        {coAlarmNeeded && (
          <div className="rounded-lg bg-red-500/10 border border-red-500/20 p-2.5">
            <p className="text-[11px] text-white">Combustion appliance present but no CO alarm — required by 2022 Regulations</p>
          </div>
        )}

        {/* 1. Certificate Details */}
        <Section title="Certificate Details">
          <div className="grid grid-cols-2 gap-3">
            <Field label="Reference No."><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></Field>
            <Field label="Certificate Type">
              <MobileSelectPicker value={data.certificateType} onValueChange={(v) => update('certificateType', v)} triggerClassName={pickerTrigger} options={[
                { value: 'new-installation', label: 'New installation' }, { value: 'upgrade', label: 'Upgrade' },
                { value: 'replacement', label: 'Replacement' }, { value: 'addition', label: 'Addition to existing' },
              ]} />
            </Field>
          </div>
          <Field label="Installation Date"><Input type="date" value={data.installationDate} onChange={(e) => update('installationDate', e.target.value)} className={inputCn} /></Field>
        </Section>

        {/* 2. Property */}
        <Section title="Property Details">
          <Field label="Property Address" required><Input value={data.propertyAddress} onChange={(e) => update('propertyAddress', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Type">
              <MobileSelectPicker value={data.propertyType} onValueChange={(v) => update('propertyType', v)} placeholder="Select..." triggerClassName={pickerTrigger} options={[
                { value: 'House', label: 'House' }, { value: 'Flat', label: 'Flat' }, { value: 'Bungalow', label: 'Bungalow' },
                { value: 'Maisonette', label: 'Maisonette' }, { value: 'HMO', label: 'HMO' }, { value: 'Other', label: 'Other' },
              ]} />
            </Field>
            <Field label="Tenure">
              <MobileSelectPicker value={data.tenure} onValueChange={(v) => update('tenure', v)} triggerClassName={pickerTrigger} options={[
                { value: 'private-rental', label: 'Private rental' }, { value: 'social-housing', label: 'Social housing' },
                { value: 'owner-occupied', label: 'Owner-occupied' }, { value: 'HMO', label: 'HMO (licensed)' },
              ]} />
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Storeys"><Input type="number" value={data.numberOfStoreys} onChange={(e) => update('numberOfStoreys', e.target.value)} className={inputCn} placeholder="2" /></Field>
            <Field label="Rooms"><Input type="number" value={data.numberOfRooms} onChange={(e) => update('numberOfRooms', e.target.value)} className={inputCn} /></Field>
          </div>
          {data.tenure === 'HMO' && <Field label="HMO Licence No."><Input value={data.hmoLicenceNumber} onChange={(e) => update('hmoLicenceNumber', e.target.value)} className={inputCn} /></Field>}
          <Sub title="Combustion Appliances" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {['Gas boiler', 'Oil boiler', 'Solid fuel', 'Gas fire', 'Open fire', 'None'].map((app) => (
              <button key={app} type="button" onClick={() => toggleCombustionAppliance(app)}
                className={cn('h-9 rounded-lg text-[11px] font-medium touch-manipulation transition-all',
                  data.combustionAppliances.includes(app) ? 'bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow' : 'bg-white/[0.06] border border-white/[0.08] text-white')}>
                {app}
              </button>
            ))}
          </div>
          {data.combustionAppliances.length > 0 && !data.combustionAppliances.includes('None') && (
            <Field label="Locations"><Input value={data.combustionApplianceLocations} onChange={(e) => update('combustionApplianceLocations', e.target.value)} className={inputCn} placeholder="Kitchen (gas boiler), Living room (gas fire)" /></Field>
          )}
        </Section>

        {/* 3. Landlord */}
        <Section title="Landlord / Client">
            <div className="grid grid-cols-2 gap-3">
              <Field label="Name"><Input value={data.landlordName} onChange={(e) => update('landlordName', e.target.value)} className={inputCn} /></Field>
              <Field label="Phone"><Input type="tel" value={data.landlordPhone} onChange={(e) => update('landlordPhone', e.target.value)} className={inputCn} /></Field>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Email"><Input type="email" value={data.landlordEmail} onChange={(e) => update('landlordEmail', e.target.value)} className={inputCn} /></Field>
              <Field label="Tenant"><Input value={data.tenantName} onChange={(e) => update('tenantName', e.target.value)} className={inputCn} placeholder="Optional" /></Field>
            </div>
            <Field label="Landlord Address"><Input value={data.landlordAddress} onChange={(e) => update('landlordAddress', e.target.value)} className={inputCn} /></Field>
            <Sub title="Managing Agent" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Agent Name"><Input value={data.managingAgentName} onChange={(e) => update('managingAgentName', e.target.value)} className={inputCn} placeholder="If applicable" /></Field>
              <Field label="Company"><Input value={data.managingAgentCompany} onChange={(e) => update('managingAgentCompany', e.target.value)} className={inputCn} /></Field>
            </div>
            {data.managingAgentName && (
              <div className="grid grid-cols-2 gap-3">
                <Field label="Phone"><Input type="tel" value={data.managingAgentPhone} onChange={(e) => update('managingAgentPhone', e.target.value)} className={inputCn} /></Field>
                <Field label="Email"><Input type="email" value={data.managingAgentEmail} onChange={(e) => update('managingAgentEmail', e.target.value)} className={inputCn} /></Field>
              </div>
            )}
          </Section>

        {/* 4. Installer */}
        <Section title="Installer">
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
            <div className="flex items-center justify-between">
              <Label className="text-white text-xs font-medium">Competent person (Part P)</Label>
              <div className="flex gap-1.5">
                {[true, false].map((v) => (
                  <button key={String(v)} type="button" onClick={() => update('competentPersonScheme', v)}
                    className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                      data.competentPersonScheme === v ? (v ? 'bg-green-500 text-white' : 'bg-white/20 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                    {v ? 'Yes' : 'No'}
                  </button>
                ))}
              </div>
            </div>
          </Section>

        {/* 5. System Design */}
        <Section title="System Design (BS 5839-6)">
            <Sub title="Classification" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Grade" required>
                <MobileSelectPicker value={data.gradeAchieved} onValueChange={(v) => update('gradeAchieved', v)} placeholder="Select..." triggerClassName={pickerTrigger} options={[
                  { value: 'A', label: 'A — Panel system' }, { value: 'B', label: 'B — Mains, no panel' },
                  { value: 'C', label: 'C — Dedicated supply' }, { value: 'D', label: 'D — Mains + battery' },
                  { value: 'E', label: 'E — Mains only' }, { value: 'F', label: 'F — Battery only' },
                ]} />
              </Field>
              <Field label="Category" required>
                <MobileSelectPicker value={data.categoryAchieved} onValueChange={(v) => update('categoryAchieved', v)} placeholder="Select..." triggerClassName={pickerTrigger} options={[
                  { value: 'LD1', label: 'LD1 — All rooms' }, { value: 'LD2', label: 'LD2 — Circ + high-risk' },
                  { value: 'LD3', label: 'LD3 — Circulation only' },
                ]} />
              </Field>
            </div>
            <Sub title="Interconnection & Power" />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Interconnection">
                <MobileSelectPicker value={data.interconnectionMethod} onValueChange={(v) => update('interconnectionMethod', v)} placeholder="Select..." triggerClassName={pickerTrigger} options={[
                  { value: 'hardwired', label: 'Hardwired' }, { value: 'rf-wireless', label: 'RF wireless' },
                  { value: 'combination', label: 'Combination' }, { value: 'standalone', label: 'Standalone' },
                ]} />
              </Field>
              <Field label="Power Supply">
                <MobileSelectPicker value={data.powerSupply} onValueChange={(v) => update('powerSupply', v)} placeholder="Select..." triggerClassName={pickerTrigger} options={[
                  { value: 'mains-sealed-lithium', label: 'Mains + lithium' }, { value: 'mains-rechargeable', label: 'Mains + rechargeable' },
                  { value: 'sealed-lithium', label: 'Lithium 10yr' }, { value: 'replaceable-battery', label: 'Replaceable battery' },
                ]} />
              </Field>
            </div>
            {data.interconnectionMethod === 'rf-wireless' && (
              <Field label="RF System">
                <MobileSelectPicker value={data.rfWirelessSystem} onValueChange={(v) => update('rfWirelessSystem', v)} placeholder="Select..." triggerClassName={pickerTrigger} options={[
                  { value: 'Aico RadioLINK+', label: 'Aico RadioLINK+' }, { value: 'FireAngel Wi-Safe 2', label: 'FireAngel Wi-Safe 2' }, { value: 'Other', label: 'Other' },
                ]} />
              </Field>
            )}
            {(data.interconnectionMethod === 'hardwired' || data.interconnectionMethod === 'combination') && (
              <>
                <Sub title="Wiring" />
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Circuit No."><Input value={data.circuitNumber} onChange={(e) => update('circuitNumber', e.target.value)} className={inputCn} /></Field>
                  <Field label="MCB"><Input value={data.mcbRating} onChange={(e) => update('mcbRating', e.target.value)} className={inputCn} placeholder="6A" /></Field>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <Field label="Cable"><Input value={data.cableType} onChange={(e) => update('cableType', e.target.value)} className={inputCn} placeholder="1.5mm² 3c+E" /></Field>
                  <div className="flex items-center justify-between pt-5">
                    <Label className="text-white text-xs font-medium">RCD Protected</Label>
                    <div className="flex gap-1.5">
                      {[true, false].map((v) => (
                        <button key={String(v)} type="button" onClick={() => update('rcdProtected', v)}
                          className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                            data.rcdProtected === v ? (v ? 'bg-green-500 text-white' : 'bg-white/20 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                          {v ? 'Yes' : 'No'}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </>
            )}
          </Section>

        {/* 6. Alarm Schedule */}
        <Section title={`Alarm Schedule (${data.alarms.length})`}>
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
                  <MobileSelectPicker value={alarm.floor} onValueChange={(v) => updateAlarm(alarm.id, 'floor', v)} placeholder="Floor" triggerClassName={pickerTrigger} options={FLOORS.map((f) => ({ value: f, label: f }))} />
                  <MobileSelectPicker value={alarm.room} onValueChange={(v) => updateAlarm(alarm.id, 'room', v)} placeholder="Room" triggerClassName={pickerTrigger} options={ROOMS.map((r) => ({ value: r, label: r }))} />
                </div>
                <MobileSelectPicker value={alarm.alarmType} onValueChange={(v) => updateAlarm(alarm.id, 'alarmType', v)} placeholder="Alarm type" triggerClassName={pickerTrigger} options={[
                  { value: 'optical-smoke', label: 'Optical smoke' },
                  { value: 'heat', label: 'Heat' },
                  { value: 'multi-sensor-smoke-heat', label: 'Multi-sensor (smoke + heat)' },
                  { value: 'CO', label: 'CO alarm' },
                  { value: 'multi-sensor-heat-co', label: 'Multi-sensor (heat + CO)' },
                ]} />
                <div className="grid grid-cols-2 gap-2">
                  <MobileSelectPicker value={alarm.manufacturer} onValueChange={(v) => updateAlarm(alarm.id, 'manufacturer', v)} placeholder="Manufacturer" triggerClassName={pickerTrigger} options={ALARM_MANUFACTURERS.map((m) => ({ value: m, label: m }))} />
                  <Input value={alarm.model} onChange={(e) => updateAlarm(alarm.id, 'model', e.target.value)} className="h-11 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white" placeholder="Model" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Input value={alarm.serialNumber} onChange={(e) => updateAlarm(alarm.id, 'serialNumber', e.target.value)} className="h-11 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white" placeholder="Serial number" />
                  <Input type="date" value={alarm.dateOfManufacture} onChange={(e) => updateAlarm(alarm.id, 'dateOfManufacture', e.target.value)} className="h-11 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <MobileSelectPicker value={alarm.powerSource} onValueChange={(v) => updateAlarm(alarm.id, 'powerSource', v)} placeholder="Power source" triggerClassName={pickerTrigger} options={[
                    { value: 'mains-sealed-lithium', label: 'Mains + sealed lithium' },
                    { value: 'mains-rechargeable', label: 'Mains + rechargeable' },
                    { value: 'sealed-lithium', label: 'Sealed lithium (10yr)' },
                    { value: 'replaceable-battery', label: 'Replaceable battery' },
                  ]} />
                  <MobileSelectPicker value={alarm.interconnect} onValueChange={(v) => updateAlarm(alarm.id, 'interconnect', v)} placeholder="Interconnect" triggerClassName={pickerTrigger} options={[
                    { value: 'hardwired', label: 'Hardwired' },
                    { value: 'rf-wireless', label: 'RF wireless' },
                    { value: 'standalone', label: 'Standalone' },
                  ]} />
                </div>
                {alarm.interconnect === 'rf-wireless' && (
                  <Input value={alarm.wirelessModule} onChange={(e) => updateAlarm(alarm.id, 'wirelessModule', e.target.value)} className="h-11 text-sm touch-manipulation bg-white/[0.06] border-white/[0.08] text-white" placeholder="Wireless module (e.g. Ei3000MRF)" />
                )}
                <div className="grid grid-cols-2 gap-2">
                  <MobileSelectPicker value={alarm.mounting} onValueChange={(v) => updateAlarm(alarm.id, 'mounting', v)} placeholder="Mounting" triggerClassName={pickerTrigger} options={[
                    { value: 'ceiling', label: 'Ceiling' },
                    { value: 'wall', label: 'Wall' },
                  ]} />
                  <div />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div><Label className="text-[10px] text-white mb-1 block">Functional Test</Label><PassFailButtons value={alarm.functionalTest} onChange={(v) => updateAlarm(alarm.id, 'functionalTest', v)} /></div>
                  <div><Label className="text-[10px] text-white mb-1 block">Mains Indicator</Label><PassFailButtons value={alarm.mainsIndicator} onChange={(v) => updateAlarm(alarm.id, 'mainsIndicator', v)} includeNA /></div>
                </div>
              </div>
            ))}
            <button onClick={addAlarm} className="w-full h-11 rounded-xl border-2 border-dashed border-elec-yellow/20 flex items-center justify-center gap-2 text-sm font-medium text-elec-yellow touch-manipulation active:scale-[0.98] hover:border-elec-yellow/30 transition-all">
              Add Alarm
            </button>
          </Section>

        {/* 7. System Tests */}
        <Section title="System Tests">
            <Field label="Interconnection Test"><PassFailButtons value={data.interconnectionTest} onChange={(v) => update('interconnectionTest', v)} includeNA /></Field>
            {data.interconnectionTest === 'pass' && <Field label="Triggered from"><Input value={data.interconnectionTriggerAlarm} onChange={(e) => update('interconnectionTriggerAlarm', e.target.value)} className={inputCn} placeholder="e.g. Ground floor hallway — all alarms sounded" /></Field>}
            <Field label="Audibility Test (bedrooms, doors closed)"><PassFailButtons value={data.audibilityTest} onChange={(v) => update('audibilityTest', v)} includeNA /></Field>
            <Field label="Mains Supply Verified"><PassFailButtons value={data.mainsSupplyVerified} onChange={(v) => update('mainsSupplyVerified', v)} includeNA /></Field>
            <Field label="Battery Backup Test"><PassFailButtons value={data.batteryBackupTest} onChange={(v) => update('batteryBackupTest', v)} includeNA /></Field>
            <Field label="RF Signal Strength (if wireless)"><PassFailButtons value={data.rfSignalTest} onChange={(v) => update('rfSignalTest', v)} includeNA /></Field>
          </Section>

        {/* 8. Compliance */}
        <Section title="Compliance Declaration">
            <div className="space-y-2">
              {[
                { field: 'compliesSmokeCORegs2022' as const, label: 'Complies with Smoke and Carbon Monoxide Alarm (England) Regulations 2015 (as amended 2022)' },
                { field: 'compliesBS5839_6' as const, label: `Complies with BS 5839-6:2019+A1:2020 — Grade ${data.gradeAchieved || '?'}, Category ${data.categoryAchieved || '?'}` },
                { field: 'compliesBSEN14604' as const, label: 'All smoke alarms comply with BS EN 14604' },
                { field: 'compliesBSEN50291' as const, label: 'All CO alarms comply with BS EN 50291-1:2018 and carry BSI Kitemark' },
                { field: 'compliesBS7671' as const, label: 'Electrical work complies with BS 7671:2018+A3:2024 (if hardwired)' },
              ].map(({ field, label }) => (
                <div key={field} className="flex items-center justify-between">
                  <Label className="text-white text-xs font-medium flex-1 mr-3">{label}</Label>
                  <div className="flex gap-1.5 shrink-0">
                    {[true, false].map((v) => (
                      <button key={String(v)} type="button" onClick={() => update(field, v)}
                        className={cn('w-14 h-8 rounded-lg text-[11px] font-semibold touch-manipulation transition-all',
                          data[field] === v ? (v ? 'bg-green-500 text-white' : 'bg-white/20 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                        {v ? 'Yes' : 'No'}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <Field label="Part P Notification">
              <MobileSelectPicker value={data.partPNotification} onValueChange={(v) => update('partPNotification', v)} placeholder="Select..." triggerClassName={pickerTrigger} options={[
                { value: 'self-certified', label: 'Self-certified via competent person scheme' },
                { value: 'building-control', label: 'Notified to building control' },
                { value: 'not-applicable', label: 'Not applicable (battery only / existing circuit)' },
              ]} />
            </Field>
          </Section>

        {/* 9. Recommendations */}
        <Section title="Recommendations & Observations">
            <div className="space-y-1.5 mb-3">
              {COMMON_RECOMMENDATIONS.map((rec) => (
                <button key={rec} onClick={() => toggleRecommendation(rec)} className={cn('w-full text-left text-xs p-2.5 rounded-lg border touch-manipulation active:scale-[0.98] transition-all', data.selectedRecommendations.includes(rec) ? 'bg-elec-yellow/10 border-elec-yellow/25 text-elec-yellow' : 'bg-white/[0.03] border-white/[0.06] text-white')}>
                  {rec}
                </button>
              ))}
            </div>
            <Field label="Additional Observations"><Textarea value={data.observations} onChange={(e) => update('observations', e.target.value)} className={textareaCn} placeholder="Any observations or additional recommendations..." /></Field>
            <Field label="Next Inspection Recommended"><Input type="date" value={data.nextInspectionDate} onChange={(e) => update('nextInspectionDate', e.target.value)} className={inputCn} /></Field>
          </Section>

        {/* 10. Signatures */}
        <Section title="Signatures">
            <div className="rounded-xl bg-white/[0.03] border border-white/[0.06] p-3.5 mb-3">
              <p className="text-xs text-white leading-relaxed">I certify that the smoke and carbon monoxide alarm system described in this certificate has been installed in accordance with the applicable standards and regulations. The system has been tested and is fully operational.</p>
            </div>
            <SignatureInput label="Installer Signature" value={data.installerSignature} onChange={(sig) => update('installerSignature', sig || '')} />
            <Field label="Date"><Input type="date" value={data.installerDate} onChange={(e) => update('installerDate', e.target.value)} className={inputCn} /></Field>
            <SignatureInput label="Landlord / Client Signature (optional)" value={data.clientSignature} onChange={(sig) => update('clientSignature', sig || '')} />
            {data.clientSignature && <Field label="Client Date"><Input type="date" value={data.clientDate} onChange={(e) => update('clientDate', e.target.value)} className={inputCn} /></Field>}
          </Section>

        {/* 11. Notes */}
        <Section title="Notes">
            <Textarea value={data.notes} onChange={(e) => update('notes', e.target.value)} className={textareaCn} placeholder="Additional notes..." />
          </Section>

        {/* Actions */}
        <div className="space-y-2 pt-4">
          <button onClick={handleGeneratePDF} disabled={isSaving} className="w-full h-11 bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/30 text-xs font-semibold touch-manipulation active:scale-[0.98] rounded-lg">
            {isSaving ? 'Generating...' : 'Generate Certificate'}
          </button>
          <button onClick={handleSaveDraft} className="w-full h-11 border border-white/[0.12] text-white hover:bg-white/[0.06] text-xs font-semibold touch-manipulation active:scale-[0.98] rounded-lg">
            Save Draft
          </button>
        </div>
      </main>

      <AlertDialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
        <AlertDialogContent className="bg-[#1a1a1e] border-white/[0.08] text-white">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Recover Draft?</AlertDialogTitle>
            <AlertDialogDescription className="text-white">A previous unsaved Smoke & CO Alarm certificate was found. Would you like to recover it?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="border-white/[0.12] text-white hover:bg-white/[0.06]" onClick={() => { discardDraft(); setShowRecoveryDialog(false); }}>Discard</AlertDialogCancel>
            <AlertDialogAction className="bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow hover:bg-elec-yellow/30" onClick={() => { if (recoveryDraft) { setData((prev) => ({ ...defaultData(), ...prev, ...recoveryDraft.data })); recoverDraft(); } setShowRecoveryDialog(false); }}>Recover Draft</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <CertificateGenerationDialog
        open={showGenerationDialog}
        onOpenChange={setShowGenerationDialog}
        isGenerating={isSaving}
        pdfUrl={generatedPdfUrl}
        pdfFilename={pdfFilename}
        errorMessage={generationError}
        documentLabel="Certificate"
      />
    </div>
  );
}
