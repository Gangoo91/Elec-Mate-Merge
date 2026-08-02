import { useState, useEffect, useCallback, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import SignatureInput from '@/components/signature/SignatureInput';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import CertShellHeader from '@/components/inspection/shared/CertShellHeader';
import CertShellFooter, {
  certFooterNeutralButton,
} from '@/components/inspection/shared/CertShellFooter';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { fetchCertBranding } from '@/utils/certBranding';
import { formatDesignStandard } from '@/data/standards';
import { cn } from '@/lib/utils';
import { reportCloud } from '@/utils/reportCloud';
import { useReportSync } from '@/hooks/useReportSync';
import { useCertLock } from '@/hooks/useCertLock';
import CertLockBar from '@/components/inspection/CertLockBar';
import { draftStorage } from '@/utils/draftStorage';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

/* eslint-disable @typescript-eslint/no-explicit-any */

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const pickerTrigger =
  'h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

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
  compliesBS5446_2: boolean;
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
  compliesSmokeCORegs2022: false, compliesBS5839_6: false, compliesBSEN14604: false, compliesBS5446_2: false,
  compliesBSEN50291: false, compliesBS7671: false, partPNotification: '',
  observations: '', selectedRecommendations: [], nextInspectionDate: '',
  installerSignature: '', installerDate: new Date().toISOString().split('T')[0],
  clientSignature: '', clientDate: '', notes: '',
});

/** House accent for this cert; the user's Settings → Brand accent overrides it. */
const SMOKE_CO_ACCENT = '#dc2626';
const DRAFT_KEY = 'elec-mate-draft-smoke-co';

type StepId = 'details' | 'system' | 'alarms' | 'signoff';

const STEPS: { id: StepId; label: string }[] = [
  { id: 'details', label: 'Details' },
  { id: 'system', label: 'System' },
  { id: 'alarms', label: 'Alarms' },
  { id: 'signoff', label: 'Sign off' },
];

const Section = ({ title, className, children }: { title: string; className?: string; children: React.ReactNode }) => (
  <section className={cn(cardCn, className)}>
    <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
    {children}
  </section>
);

const Sub = ({ title }: { title: string }) => (
  <div className="border-t border-white/[0.1] pt-4">
    <h3 className="text-sm font-semibold text-white">{title}</h3>
  </div>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className={labelCn}>{label}{required && ' *'}</Label>{children}</div>
);

const PassFailButtons = ({ value, onChange, includeNA }: { value: string; onChange: (v: string) => void; includeNA?: boolean }) => (
  <div className="flex gap-2">
    {/* N/A stores 'na', NOT '' — '' is the UNSET value, so an untouched test
        used to render as an already-selected "N/A", and the data could not
        distinguish "explicitly not applicable" from "never tested". */}
    {['pass', 'fail', ...(includeNA ? ['na'] : [])].map((v) => (
      <button key={v || 'na'} type="button" onClick={() => onChange(v)}
        className={cn('flex-1 h-11 rounded-xl text-sm touch-manipulation transition-all active:scale-[0.98]',
          value === v
            ? (v === 'pass'
                ? 'bg-green-500 border border-green-500 text-black font-semibold'
                : v === 'fail'
                  ? 'bg-red-500 border border-red-500 text-white font-semibold'
                  : 'bg-white/20 border border-white/20 text-white font-semibold')
            : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium')}>
        {v === 'pass' ? 'Pass' : v === 'fail' ? 'Fail' : 'N/A'}
      </button>
    ))}
  </div>
);

const YesNo = ({ value, onSelect }: { value: boolean; onSelect: (v: boolean) => void }) => (
  <div className="flex shrink-0 gap-2">
    {[true, false].map((v) => (
      <button key={String(v)} type="button" onClick={() => onSelect(v)}
        className={cn('h-11 w-16 rounded-xl text-sm touch-manipulation transition-all active:scale-[0.97]',
          value === v
            ? (v
                ? 'bg-green-500 border border-green-500 text-black font-semibold'
                : 'bg-white/20 border border-white/20 text-white font-semibold')
            : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium')}>
        {v ? 'Yes' : 'No'}
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
  const [currentStep, setCurrentStep] = useState<StepId>('details');

  // Email dialog state
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const [data, setData] = useState<SmokeCOData>(defaultData());

  // Track direction so the step slide matches travel (forward vs back).
  const currentStepIndex = STEPS.findIndex((s) => s.id === currentStep);
  const prevIndexRef = useRef(currentStepIndex);
  const isBack = currentStepIndex < prevIndexRef.current;
  prevIndexRef.current = currentStepIndex;

    // Lock + versioning (ELE-1037). enabled:!isLocked below gates autosave.
  const {
    isLocked,
    lockedAt,
    editVersion,
    lockReport: lockReportBase,
    amendReport,
    databaseId,
    openReport,
    hasVersions,
  } = useCertLock({
    reportId: savedReportId,
    onAmended: (newId) => navigate(`/electrician/inspection-testing/smoke-co-alarm/${newId}`),
  });

const {
    status: syncStatus, saveNow, syncNowImmediate,
    hasRecoverableDraft, recoverDraft, discardDraft,
  } = useReportSync({
    reportId: savedReportId,
    reportType: 'smoke-co-alarm' as any,
    formData: data,
    enabled: !isLoading && !isLocked,
    isHydrating: isLoading, // Gate autosave while loading from cloud — prevents blank-overwrite race.
    onReportCreated: (newId) => {
      setSavedReportId(newId);
      window.history.replaceState(null, '', `/electrician/inspection-testing/smoke-co-alarm/${newId}`);
    },
  });

  // Issue & Lock — flush pending edits first, then lock.
  const lockReport = useCallback(async () => {
    try {
      await syncNowImmediate?.();
    } catch {
      /* best-effort flush */
    }
    await lockReportBase();
  }, [syncNowImmediate, lockReportBase]);

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
      if (cp) setData((prev) => ({ ...prev, installerName: prev.installerName || cp.inspector_name || '', installerCompany: prev.installerCompany || cp.company_name || '', installerPhone: prev.installerPhone || cp.company_phone || '', installerEmail: prev.installerEmail || cp.company_email || '', registrationScheme: prev.registrationScheme || cp.registration_scheme || '', registrationNumber: prev.registrationNumber || cp.registration_number || '', installerSignature: prev.installerSignature || cp.signature_data || '' }));
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
  //
  // Storey coverage counts SMOKE-detecting alarms only. The old test was a
  // denylist (anything that isn't CO), which let a kitchen 'heat' alarm satisfy
  // "smoke alarm on this storey" — a heat alarm is not a smoke alarm. It also
  // mapped every alarm's floor, so an alarm with a type but no floor yet added
  // '' to the Set and inflated the covered-storey count. Allowlist + drop blanks.
  const SMOKE_DETECTING_TYPES = ['optical-smoke', 'multi-sensor-smoke-heat'];
  const smokeAlarmFloors = new Set(
    data.alarms
      .filter((a) => SMOKE_DETECTING_TYPES.includes(a.alarmType) && a.floor)
      .map((a) => a.floor)
  );
  const totalStoreys = parseInt(data.numberOfStoreys) || 0;
  const hasSmokeEveryStorey = totalStoreys > 0 && smokeAlarmFloors.size >= totalStoreys;
  // 'None' is a peer chip in the same list, so counting length alone made
  // "no combustion appliances" trigger the missing-CO-alarm alert. The form
  // already special-cases 'None' further down when showing the locations field.
  const hasCombustionAppliances = data.combustionAppliances.filter((a) => a !== 'None').length > 0;
  const hasCOAlarm = data.alarms.some((a) => a.alarmType === 'CO' || a.alarmType === 'multi-sensor-heat-co');
  const coAlarmNeeded = hasCombustionAppliances && !hasCOAlarm;

  const handleSaveDraft = async () => {
    setIsSaving(true);
    try { await saveNow(); toast.success('Draft saved'); }
    catch { toast.error('Failed to save'); }
    finally { setIsSaving(false); }
  };

  const handleEmailCertificate = () => {
    if (!savedReportId) {
      toast.error('Please save the certificate first before emailing.');
      return;
    }
    if (data.landlordEmail) setEmailRecipient(data.landlordEmail);
    setShowEmailDialog(true);
  };

  const handleSendEmail = async () => {
    if (!emailRecipient || !emailRecipient.includes('@')) {
      toast.error('Please enter a valid email address.');
      return;
    }
    setIsSendingEmail(true);
    try {
      // Send the formatted payload so the function can generate + attach the
      // PDF even when the user emails before ever tapping Generate.
      let formattedData: Record<string, unknown> | undefined;
      try {
        let branding: Record<string, string> = {};
        branding = await fetchCertBranding(SMOKE_CO_ACCENT);
        const { formatSmokeCOJson } = await import('@/utils/smokeCOJsonFormatter');
        formattedData = formatSmokeCOJson(
          { ...data, referenceNumber: data.referenceNumber || `SCA-${Date.now().toString(36).toUpperCase()}` },
          branding
        );
      } catch {
        formattedData = undefined; // fall back to server-side pdf_payload
      }
      const { data: result, error: fnError } = await supabase.functions.invoke(
        'send-certificate-resend',
        { body: { reportId: savedReportId, recipientEmail: emailRecipient, formattedData } }
      );
      if (fnError) {
        let errorMessage = fnError.message;
        try { const parsed = JSON.parse(fnError.message); errorMessage = parsed.error || parsed.message || fnError.message; } catch { /* keep */ }
        if (fnError.context?.body) {
          try {
            const bodyError = typeof fnError.context.body === 'string' ? JSON.parse(fnError.context.body) : fnError.context.body;
            if (bodyError.error) errorMessage = bodyError.error;
          } catch { /* keep */ }
        }
        throw new Error(errorMessage);
      }
      if (!result?.success) throw new Error(result?.error || 'Failed to send');
      toast.success(
        result?.pdfAttached
          ? `Certificate emailed to ${emailRecipient} with the PDF attached`
          : `Certificate emailed to ${emailRecipient}`
      );
      setShowEmailDialog(false);
      setEmailRecipient('');
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Failed to send certificate email.');
    } finally {
      setIsSendingEmail(false);
    }
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
      branding = await fetchCertBranding(SMOKE_CO_ACCENT);
      const { formatSmokeCOJson } = await import('@/utils/smokeCOJsonFormatter');
      const payload = formatSmokeCOJson(data, branding);

      // Persist the formatted payload so server-side email/regeneration uses
      // the exact data this PDF was generated from (not raw form_data).
      if (savedReportId) {
        await supabase.from('reports').update({ pdf_payload: payload }).eq('report_id', savedReportId);
      }

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

  // Live completion — drives the header progress ring and step ticks (visual only).
  const alarmsComplete = data.alarms.length > 0 && data.alarms.every((a) => a.floor && a.room && a.alarmType);
  const testsComplete = data.alarms.every((a) => a.functionalTest);
  const completionChecks = [
    !!data.propertyAddress,
    !!data.installerName,
    !!data.gradeAchieved && !!data.categoryAchieved,
    alarmsComplete,
    testsComplete,
    !!data.installerSignature,
  ];
  const progress = Math.round((completionChecks.filter(Boolean).length / completionChecks.length) * 100);

  const completedTabs: Record<string, boolean> = {
    details: completionChecks[0] && completionChecks[1],
    system: completionChecks[2],
    alarms: alarmsComplete && testsComplete,
    signoff: !!data.installerSignature,
  };

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const goToStep = (step: string) => {
    setCurrentStep(step as StepId);
    scrollToTop();
  };

  const stepContent: Record<StepId, React.ReactNode> = {
    details: (
      <>
        {/* 1. Certificate details */}
        <Section title="Certificate details">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Reference no."><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></Field>
            <Field label="Certificate type">
              <MobileSelectPicker value={data.certificateType} onValueChange={(v) => update('certificateType', v)} triggerClassName={pickerTrigger} options={[
                { value: 'new-installation', label: 'New installation' }, { value: 'upgrade', label: 'Upgrade' },
                { value: 'replacement', label: 'Replacement' }, { value: 'addition', label: 'Addition to existing' },
              ]} />
            </Field>
          </div>
          <Field label="Installation date"><Input type="date" value={data.installationDate} onChange={(e) => update('installationDate', e.target.value)} className={inputCn} /></Field>
        </Section>

        {/* 2. Property */}
        <Section title="Property details">
          <Field label="Property address" required><Input value={data.propertyAddress} onChange={(e) => update('propertyAddress', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
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
          <div className="grid grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Storeys"><Input type="number" value={data.numberOfStoreys} onChange={(e) => update('numberOfStoreys', e.target.value)} className={inputCn} placeholder="2" /></Field>
            <Field label="Rooms"><Input type="number" value={data.numberOfRooms} onChange={(e) => update('numberOfRooms', e.target.value)} className={inputCn} /></Field>
          </div>
          {data.tenure === 'HMO' && <Field label="HMO licence no."><Input value={data.hmoLicenceNumber} onChange={(e) => update('hmoLicenceNumber', e.target.value)} className={inputCn} /></Field>}
          <Sub title="Combustion appliances" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {['Gas boiler', 'Oil boiler', 'Solid fuel', 'Gas fire', 'Open fire', 'None'].map((app) => (
              <button key={app} type="button" onClick={() => toggleCombustionAppliance(app)}
                className={cn('h-11 rounded-xl text-[13px] touch-manipulation transition-all active:scale-[0.98]',
                  data.combustionAppliances.includes(app)
                    ? 'bg-elec-yellow border border-elec-yellow text-black font-semibold'
                    : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium')}>
                {app}
              </button>
            ))}
          </div>
          {data.combustionAppliances.length > 0 && !data.combustionAppliances.includes('None') && (
            <Field label="Locations"><Input value={data.combustionApplianceLocations} onChange={(e) => update('combustionApplianceLocations', e.target.value)} className={inputCn} placeholder="Kitchen (gas boiler), Living room (gas fire)" /></Field>
          )}
        </Section>

        {/* 3. Landlord */}
        <Section title="Landlord / client">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Name"><Input value={data.landlordName} onChange={(e) => update('landlordName', e.target.value)} className={inputCn} /></Field>
            <Field label="Phone"><Input type="tel" value={data.landlordPhone} onChange={(e) => update('landlordPhone', e.target.value)} className={inputCn} /></Field>
            <Field label="Email"><Input type="email" value={data.landlordEmail} onChange={(e) => update('landlordEmail', e.target.value)} className={inputCn} /></Field>
            <Field label="Tenant"><Input value={data.tenantName} onChange={(e) => update('tenantName', e.target.value)} className={inputCn} placeholder="Optional" /></Field>
          </div>
          <Field label="Landlord address"><Input value={data.landlordAddress} onChange={(e) => update('landlordAddress', e.target.value)} className={inputCn} /></Field>
          <Sub title="Managing agent" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Agent name"><Input value={data.managingAgentName} onChange={(e) => update('managingAgentName', e.target.value)} className={inputCn} placeholder="If applicable" /></Field>
            <Field label="Company"><Input value={data.managingAgentCompany} onChange={(e) => update('managingAgentCompany', e.target.value)} className={inputCn} /></Field>
          </div>
          {data.managingAgentName && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
              <Field label="Phone"><Input type="tel" value={data.managingAgentPhone} onChange={(e) => update('managingAgentPhone', e.target.value)} className={inputCn} /></Field>
              <Field label="Email"><Input type="email" value={data.managingAgentEmail} onChange={(e) => update('managingAgentEmail', e.target.value)} className={inputCn} /></Field>
            </div>
          )}
        </Section>

        {/* 4. Installer */}
        <Section title="Installer">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Name"><Input value={data.installerName} onChange={(e) => update('installerName', e.target.value)} className={inputCn} /></Field>
            <Field label="Company"><Input value={data.installerCompany} onChange={(e) => update('installerCompany', e.target.value)} className={inputCn} /></Field>
            <Field label="Phone"><Input type="tel" value={data.installerPhone} onChange={(e) => update('installerPhone', e.target.value)} className={inputCn} /></Field>
            <Field label="Email"><Input type="email" value={data.installerEmail} onChange={(e) => update('installerEmail', e.target.value)} className={inputCn} /></Field>
            <Field label="Scheme"><Input value={data.registrationScheme} onChange={(e) => update('registrationScheme', e.target.value)} className={inputCn} placeholder="NICEIC, NAPIT..." /></Field>
            <Field label="Reg. no."><Input value={data.registrationNumber} onChange={(e) => update('registrationNumber', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="flex min-h-11 items-center justify-between gap-3">
            <Label className="text-[13px] font-medium leading-snug text-white">Competent person (Part P)</Label>
            <YesNo value={data.competentPersonScheme} onSelect={(v) => update('competentPersonScheme', v)} />
          </div>
        </Section>
      </>
    ),
    system: (
      <>
        {(data.tenure === 'HMO' && data.gradeAchieved && data.gradeAchieved !== 'A' && data.gradeAchieved !== 'D') && (
          <div className="rounded-xl border border-red-500/40 bg-white/[0.05] px-3.5 py-3 lg:col-span-2">
            <p className="text-[13px] text-white">HMO: LACORS requires min Grade D (or A for large HMOs). Current: Grade {data.gradeAchieved}</p>
          </div>
        )}

        {/* 5. System design */}
        <Section title="System design (BS 5839-6)" className="lg:col-span-2">
          <Sub title="Classification" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
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
          <Sub title="Interconnection & power" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Interconnection">
              <MobileSelectPicker value={data.interconnectionMethod} onValueChange={(v) => update('interconnectionMethod', v)} placeholder="Select..." triggerClassName={pickerTrigger} options={[
                { value: 'hardwired', label: 'Hardwired' }, { value: 'rf-wireless', label: 'RF wireless' },
                { value: 'combination', label: 'Combination' }, { value: 'standalone', label: 'Standalone' },
              ]} />
            </Field>
            <Field label="Power supply">
              <MobileSelectPicker value={data.powerSupply} onValueChange={(v) => update('powerSupply', v)} placeholder="Select..." triggerClassName={pickerTrigger} options={[
                { value: 'mains-sealed-lithium', label: 'Mains + lithium' }, { value: 'mains-rechargeable', label: 'Mains + rechargeable' },
                { value: 'sealed-lithium', label: 'Lithium 10yr' }, { value: 'replaceable-battery', label: 'Replaceable battery' },
              ]} />
            </Field>
          </div>
          {data.interconnectionMethod === 'rf-wireless' && (
            <Field label="RF system">
              <MobileSelectPicker value={data.rfWirelessSystem} onValueChange={(v) => update('rfWirelessSystem', v)} placeholder="Select..." triggerClassName={pickerTrigger} options={[
                { value: 'Aico RadioLINK+', label: 'Aico RadioLINK+' }, { value: 'FireAngel Wi-Safe 2', label: 'FireAngel Wi-Safe 2' }, { value: 'Other', label: 'Other' },
              ]} />
            </Field>
          )}
          {(data.interconnectionMethod === 'hardwired' || data.interconnectionMethod === 'combination') && (
            <>
              <Sub title="Wiring" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <Field label="Circuit no."><Input value={data.circuitNumber} onChange={(e) => update('circuitNumber', e.target.value)} className={inputCn} /></Field>
                <Field label="MCB"><Input value={data.mcbRating} onChange={(e) => update('mcbRating', e.target.value)} className={inputCn} placeholder="6A" /></Field>
                <Field label="Cable"><Input value={data.cableType} onChange={(e) => update('cableType', e.target.value)} className={inputCn} placeholder="1.5mm² 3c+E" /></Field>
                <div className="flex min-h-11 items-center justify-between gap-3 sm:self-end">
                  <Label className="text-[13px] font-medium leading-snug text-white">RCD protected</Label>
                  <YesNo value={data.rcdProtected} onSelect={(v) => update('rcdProtected', v)} />
                </div>
              </div>
            </>
          )}
        </Section>
      </>
    ),
    alarms: (
      <>
        {(totalStoreys > 0 && !hasSmokeEveryStorey) && (
          <div className="rounded-xl border border-amber-500/40 bg-white/[0.05] px-3.5 py-3 lg:col-span-2">
            <p className="text-[13px] text-white">Smoke alarm not on every storey ({smokeAlarmFloors.size}/{totalStoreys} covered)</p>
          </div>
        )}
        {coAlarmNeeded && (
          <div className="rounded-xl border border-red-500/40 bg-white/[0.05] px-3.5 py-3 lg:col-span-2">
            <p className="text-[13px] text-white">Combustion appliance present but no CO alarm — required by 2022 Regulations</p>
          </div>
        )}

        {/* 6. Alarm schedule */}
        <Section title={`Alarm schedule (${data.alarms.length})`} className="lg:col-span-2">
          {data.alarms.map((alarm, idx) => (
            <div key={alarm.id} className="border-t border-white/[0.08] pt-4 space-y-4">
              <div className="flex items-center justify-between gap-3">
                <h3 className="text-sm font-semibold text-white">Alarm {idx + 1}</h3>
                <div className="flex items-center gap-2">
                  {alarm.replacementDue && <span className="rounded-md bg-white/[0.06] px-2 py-1 text-[11px] tabular-nums text-white/80">Replace: {alarm.replacementDue}</span>}
                  {data.alarms.length > 1 && (
                    <button type="button" onClick={() => removeAlarm(alarm.id)} className="h-11 px-2 text-[13px] font-semibold text-red-400 touch-manipulation active:scale-[0.97]">
                      Remove
                    </button>
                  )}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <Field label="Floor"><MobileSelectPicker value={alarm.floor} onValueChange={(v) => updateAlarm(alarm.id, 'floor', v)} placeholder="Floor" triggerClassName={pickerTrigger} options={FLOORS.map((f) => ({ value: f, label: f }))} /></Field>
                <Field label="Room"><MobileSelectPicker value={alarm.room} onValueChange={(v) => updateAlarm(alarm.id, 'room', v)} placeholder="Room" triggerClassName={pickerTrigger} options={ROOMS.map((r) => ({ value: r, label: r }))} /></Field>
              </div>
              <Field label="Alarm type">
                <MobileSelectPicker value={alarm.alarmType} onValueChange={(v) => updateAlarm(alarm.id, 'alarmType', v)} placeholder="Alarm type" triggerClassName={pickerTrigger} options={[
                  { value: 'optical-smoke', label: 'Optical smoke' },
                  { value: 'heat', label: 'Heat' },
                  { value: 'multi-sensor-smoke-heat', label: 'Multi-sensor (smoke + heat)' },
                  { value: 'CO', label: 'CO alarm' },
                  { value: 'multi-sensor-heat-co', label: 'Multi-sensor (heat + CO)' },
                ]} />
              </Field>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <Field label="Manufacturer"><MobileSelectPicker value={alarm.manufacturer} onValueChange={(v) => updateAlarm(alarm.id, 'manufacturer', v)} placeholder="Manufacturer" triggerClassName={pickerTrigger} options={ALARM_MANUFACTURERS.map((m) => ({ value: m, label: m }))} /></Field>
                <Field label="Model"><Input value={alarm.model} onChange={(e) => updateAlarm(alarm.id, 'model', e.target.value)} className={inputCn} placeholder="Model" /></Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <Field label="Serial number"><Input value={alarm.serialNumber} onChange={(e) => updateAlarm(alarm.id, 'serialNumber', e.target.value)} className={inputCn} placeholder="Serial number" /></Field>
                <Field label="Date of manufacture"><Input type="date" value={alarm.dateOfManufacture} onChange={(e) => updateAlarm(alarm.id, 'dateOfManufacture', e.target.value)} className={inputCn} /></Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <Field label="Power source">
                  <MobileSelectPicker value={alarm.powerSource} onValueChange={(v) => updateAlarm(alarm.id, 'powerSource', v)} placeholder="Power source" triggerClassName={pickerTrigger} options={[
                    { value: 'mains-sealed-lithium', label: 'Mains + sealed lithium' },
                    { value: 'mains-rechargeable', label: 'Mains + rechargeable' },
                    { value: 'sealed-lithium', label: 'Sealed lithium (10yr)' },
                    { value: 'replaceable-battery', label: 'Replaceable battery' },
                  ]} />
                </Field>
                <Field label="Interconnect">
                  <MobileSelectPicker value={alarm.interconnect} onValueChange={(v) => updateAlarm(alarm.id, 'interconnect', v)} placeholder="Interconnect" triggerClassName={pickerTrigger} options={[
                    { value: 'hardwired', label: 'Hardwired' },
                    { value: 'rf-wireless', label: 'RF wireless' },
                    { value: 'standalone', label: 'Standalone' },
                  ]} />
                </Field>
              </div>
              {alarm.interconnect === 'rf-wireless' && (
                <Field label="Wireless module"><Input value={alarm.wirelessModule} onChange={(e) => updateAlarm(alarm.id, 'wirelessModule', e.target.value)} className={inputCn} placeholder="e.g. Ei3000MRF" /></Field>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <Field label="Mounting">
                  <MobileSelectPicker value={alarm.mounting} onValueChange={(v) => updateAlarm(alarm.id, 'mounting', v)} placeholder="Mounting" triggerClassName={pickerTrigger} options={[
                    { value: 'ceiling', label: 'Ceiling' },
                    { value: 'wall', label: 'Wall' },
                  ]} />
                </Field>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                <Field label="Functional test"><PassFailButtons value={alarm.functionalTest} onChange={(v) => updateAlarm(alarm.id, 'functionalTest', v)} /></Field>
                <Field label="Mains indicator"><PassFailButtons value={alarm.mainsIndicator} onChange={(v) => updateAlarm(alarm.id, 'mainsIndicator', v)} includeNA /></Field>
              </div>
            </div>
          ))}
          <button type="button" onClick={addAlarm} className="w-full h-11 rounded-xl border-2 border-dashed border-elec-yellow/40 text-sm font-semibold text-elec-yellow touch-manipulation active:scale-[0.98] hover:border-elec-yellow/60 transition-colors">
            Add alarm
          </button>
        </Section>

        {/* 7. System tests */}
        <Section title="System tests" className="lg:col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            <Field label="Interconnection test"><PassFailButtons value={data.interconnectionTest} onChange={(v) => update('interconnectionTest', v)} includeNA /></Field>
            {data.interconnectionTest === 'pass' && <Field label="Triggered from"><Input value={data.interconnectionTriggerAlarm} onChange={(e) => update('interconnectionTriggerAlarm', e.target.value)} className={inputCn} placeholder="e.g. Ground floor hallway — all alarms sounded" /></Field>}
            <Field label="Audibility test (bedrooms, doors closed)"><PassFailButtons value={data.audibilityTest} onChange={(v) => update('audibilityTest', v)} includeNA /></Field>
            <Field label="Mains supply verified"><PassFailButtons value={data.mainsSupplyVerified} onChange={(v) => update('mainsSupplyVerified', v)} includeNA /></Field>
            <Field label="Battery backup test"><PassFailButtons value={data.batteryBackupTest} onChange={(v) => update('batteryBackupTest', v)} includeNA /></Field>
            <Field label="RF signal strength (if wireless)"><PassFailButtons value={data.rfSignalTest} onChange={(v) => update('rfSignalTest', v)} includeNA /></Field>
          </div>
        </Section>
      </>
    ),
    signoff: (
      <>
        {/* 8. Compliance */}
        <Section title="Compliance declaration">
          <div className="space-y-3">
            {[
              { field: 'compliesSmokeCORegs2022' as const, label: 'Complies with Smoke and Carbon Monoxide Alarm (England) Regulations 2015 (as amended 2022)' },
              { field: 'compliesBS5839_6' as const, label: `Complies with BS 5839-6:2019+A1:2020 — Grade ${data.gradeAchieved || '?'}, Category ${data.categoryAchieved || '?'}` },
              { field: 'compliesBSEN14604' as const, label: 'All smoke alarms comply with BS EN 14604' },
              { field: 'compliesBSEN50291' as const, label: 'All CO alarms comply with BS EN 50291-1:2018 and carry BSI Kitemark' },
              // Approved Document B Vol 1 §1.3 — heat alarms conform to BS 5446-2.
              // Only relevant when a heat-detecting alarm has actually been recorded.
              ...(data.alarms.some((a) => a.alarmType === 'heat' || a.alarmType === 'multi-sensor-smoke-heat' || a.alarmType === 'multi-sensor-heat-co')
                ? [{ field: 'compliesBS5446_2' as const, label: 'All heat alarms comply with BS 5446-2' }]
                : []),
              { field: 'compliesBS7671' as const, label: `Electrical work complies with ${formatDesignStandard('')} (if hardwired)` },
            ].map(({ field, label }) => (
              <div key={field} className="flex items-center justify-between gap-3">
                <Label className="flex-1 text-[13px] font-medium leading-snug text-white">{label}</Label>
                <YesNo value={data[field]} onSelect={(v) => update(field, v)} />
              </div>
            ))}
          </div>
          <Field label="Part P notification">
            <MobileSelectPicker value={data.partPNotification} onValueChange={(v) => update('partPNotification', v)} placeholder="Select..." triggerClassName={pickerTrigger} options={[
              { value: 'self-certified', label: 'Self-certified via competent person scheme' },
              { value: 'building-control', label: 'Notified to building control' },
              { value: 'not-applicable', label: 'Not applicable (battery only / existing circuit)' },
            ]} />
          </Field>
        </Section>

        {/* 9. Recommendations */}
        <Section title="Recommendations & observations">
          <div className="space-y-2">
            {COMMON_RECOMMENDATIONS.map((rec) => (
              <button key={rec} type="button" onClick={() => toggleRecommendation(rec)}
                className={cn('w-full min-h-11 rounded-xl border px-3.5 py-3 text-left text-[13px] leading-snug touch-manipulation transition-colors active:scale-[0.99]',
                  data.selectedRecommendations.includes(rec)
                    ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                    : 'bg-white/[0.06] border-white/[0.12] text-white')}>
                {rec}
              </button>
            ))}
          </div>
          <Field label="Additional observations"><Textarea value={data.observations} onChange={(e) => update('observations', e.target.value)} className={textareaCn} placeholder="Any observations or additional recommendations..." /></Field>
          <Field label="Next inspection recommended"><Input type="date" value={data.nextInspectionDate} onChange={(e) => update('nextInspectionDate', e.target.value)} className={inputCn} /></Field>
        </Section>

        {/* 10. Signatures */}
        <Section title="Signatures" className="lg:col-span-2">
          <div className="rounded-xl bg-white/[0.05] px-3.5 py-3">
            <p className="text-[13px] leading-relaxed text-white/85">I certify that the smoke and carbon monoxide alarm system described in this certificate has been installed in accordance with the applicable standards and regulations. The system has been tested and is fully operational.</p>
          </div>
          <SignatureInput label="Installer signature" value={data.installerSignature} onChange={(sig) => update('installerSignature', sig || '')} />
          <Field label="Date"><Input type="date" value={data.installerDate} onChange={(e) => update('installerDate', e.target.value)} className={inputCn} /></Field>
          <SignatureInput label="Landlord / client signature (optional)" value={data.clientSignature} onChange={(sig) => update('clientSignature', sig || '')} />
          {data.clientSignature && <Field label="Client date"><Input type="date" value={data.clientDate} onChange={(e) => update('clientDate', e.target.value)} className={inputCn} /></Field>}
        </Section>

        {/* 11. Notes */}
        <Section title="Notes" className="lg:col-span-2">
          <Textarea value={data.notes} onChange={(e) => update('notes', e.target.value)} className={textareaCn} placeholder="Additional notes..." />
        </Section>
      </>
    ),
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Shell header — fixed bar with progress ring + full-width step tabs */}
      <CertShellHeader
        onBack={() => navigate(-1)}
        title="Smoke & CO alarm"
        subtitle={data.referenceNumber ? `${data.referenceNumber} · BS 5839-6` : null}
        isSaving={isSaving}
        onManualSave={handleSaveDraft}
        syncStatus={syncStatus}
        progressPercent={progress}
        steps={STEPS}
        currentTab={currentStep}
        onTabChange={goToStep}
        completedTabs={completedTabs}
      />

      {/* ELE-1037 — lock / version bar */}
      <CertLockBar
        isLocked={isLocked}
        lockedAt={lockedAt}
        editVersion={editVersion}
        canIssue={!isLocked && !!savedReportId}
        onLock={lockReport}
        onAmend={amendReport}
        databaseId={databaseId}
        hasVersions={hasVersions}
        onOpenVersion={openReport}
      />

      <main className="-mx-3 px-4 py-4 pb-36 sm:mx-auto sm:px-4 lg:max-w-[1600px] lg:px-8">
        <div className={cn(isLocked && 'pointer-events-none select-none opacity-95')} aria-disabled={isLocked || undefined}>
          <div
            key={currentStep}
            className={isBack ? 'motion-safe:animate-mw-step-back' : 'motion-safe:animate-mw-step-in'}
          >
            <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
              {stepContent[currentStep]}
            </div>
          </div>
        </div>
      </main>

      {/* Shell footer — Back + Continue, Generate on the last step */}
      <CertShellFooter
        currentIndex={currentStepIndex}
        totalSteps={STEPS.length}
        canPrevious={currentStepIndex > 0}
        canNext={currentStepIndex < STEPS.length - 1}
        onPrevious={() => {
          if (currentStepIndex > 0) goToStep(STEPS[currentStepIndex - 1].id);
        }}
        onNext={() => {
          if (currentStepIndex < STEPS.length - 1) goToStep(STEPS[currentStepIndex + 1].id);
        }}
        nextLabels={['Continue to system design', 'Continue to alarms', 'Continue to sign off']}
        isLastStep={currentStepIndex === STEPS.length - 1}
        onGenerate={handleGeneratePDF}
        canGenerate={!isSaving}
        generateLabel={isSaving ? 'Generating...' : 'Generate certificate'}
        lastStepActions={
          <>
            <button type="button" onClick={handleSaveDraft} disabled={isSaving} className={certFooterNeutralButton}>
              Save draft
            </button>
            <button type="button" onClick={handleEmailCertificate} disabled={!savedReportId} className={certFooterNeutralButton}>
              Email
            </button>
          </>
        }
      />

      {/* Email dialog */}
      <Dialog open={showEmailDialog} onOpenChange={setShowEmailDialog}>
        <DialogContent className="max-w-[90vw] sm:max-w-md bg-[#111114] border border-white/[0.1] rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-base font-bold">Email certificate</DialogTitle>
            <DialogDescription className="text-white/85 text-sm">
              Enter the recipient's email address.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-3 py-3">
            <div>
              <label htmlFor="smoke-co-email" className="mb-1 block text-[12px] font-medium text-white">
                Recipient email
              </label>
              <Input
                id="smoke-co-email"
                type="email"
                placeholder="landlord@example.com"
                value={emailRecipient}
                onChange={(e) => setEmailRecipient(e.target.value)}
                disabled={isSendingEmail}
                className="input-underline h-11 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none touch-manipulation"
              />
            </div>
            {data.landlordEmail && emailRecipient !== data.landlordEmail && (
              <button
                onClick={() => setEmailRecipient(data.landlordEmail)}
                className="w-full h-11 rounded-xl bg-white/[0.04] border border-white/[0.1] text-white text-[13px] font-medium hover:bg-white/[0.08] touch-manipulation active:scale-[0.98] transition-all"
              >
                Use landlord email: {data.landlordEmail}
              </button>
            )}
          </div>
          {/* Plain column footer — DialogFooter's sm:space-x-2 skews stacked
              buttons sideways, so the two never sat level. */}
          <div className="flex flex-col gap-2">
            <Button
              onClick={handleSendEmail}
              disabled={isSendingEmail || !emailRecipient}
              className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-all hover:bg-elec-yellow/90 active:scale-[0.98] disabled:bg-elec-yellow disabled:text-black disabled:opacity-100 touch-manipulation"
            >
              {isSendingEmail ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin text-black" />
                  Sending…
                </>
              ) : (
                'Send certificate'
              )}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowEmailDialog(false)}
              disabled={isSendingEmail}
              className="h-12 w-full rounded-xl border border-white/[0.1] bg-white/[0.04] font-medium text-white transition-all hover:bg-white/[0.08] hover:text-white active:scale-[0.98] disabled:opacity-40 touch-manipulation"
            >
              Cancel
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
        <AlertDialogContent className="max-w-[90vw] sm:max-w-md bg-[#111114] border border-white/[0.08] rounded-2xl shadow-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white text-base font-bold">Recover unsaved work?</AlertDialogTitle>
            <AlertDialogDescription className="text-white text-sm">A previous unsaved Smoke & CO alarm certificate was found. Would you like to recover it?</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-col sm:space-x-0">
            <AlertDialogAction className="w-full h-11 rounded-xl bg-elec-yellow font-semibold text-black hover:bg-elec-yellow/90 active:scale-[0.98] transition-all touch-manipulation" onClick={() => { if (recoveryDraft) { setData((prev) => ({ ...defaultData(), ...prev, ...recoveryDraft.data })); recoverDraft(); } setShowRecoveryDialog(false); }}>Recover draft</AlertDialogAction>
            <AlertDialogCancel className="w-full h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white font-medium hover:bg-white/[0.08] active:scale-[0.98] transition-all touch-manipulation mt-0" onClick={() => { discardDraft(); setShowRecoveryDialog(false); }}>Start fresh</AlertDialogCancel>
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
