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
import EICRScheduleOfTests from '@/components/EICRScheduleOfTests';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { reportCloud } from '@/utils/reportCloud';
import { useReportSync } from '@/hooks/useReportSync';
import { useCertLock } from '@/hooks/useCertLock';
import CertLockBar from '@/components/inspection/CertLockBar';
import CertShellHeader from '@/components/inspection/shared/CertShellHeader';
import CertShellFooter, {
  certFooterNeutralButton,
} from '@/components/inspection/shared/CertShellFooter';

/* eslint-disable @typescript-eslint/no-explicit-any */

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:p-5 space-y-4';

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base md:text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors duration-150 hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none !leading-[2.75rem] [color-scheme:dark] touch-manipulation';

const textareaCn =
  'textarea-soft rounded-xl border-0 bg-white/[0.05] px-3.5 py-3 text-base md:text-base text-white placeholder:text-white/25 caret-elec-yellow transition-colors focus:bg-white/[0.07] focus:ring-1 focus:ring-elec-yellow/50 focus-visible:ring-1 focus-visible:ring-elec-yellow/50 focus:outline-none focus:shadow-none min-h-[90px] touch-manipulation';

const labelCn = 'text-[12px] font-medium text-white mb-1 block';

const pickerTrigger =
  'rounded-none border-0 border-b border-white/[0.15] bg-transparent h-11 w-full px-1 text-base font-medium text-white hover:border-white/[0.3] focus:border-elec-yellow focus:ring-0 focus-visible:ring-0 focus:outline-none touch-manipulation';

const INSTRUMENT_MAKES = ['Megger', 'Fluke', 'Metrel', 'Kewtech', 'Seaward', 'Robin', 'Di-Log', 'Other'];

interface TestingOnlyData {
  referenceNumber: string;
  testDate: string;
  testerName: string;
  testerQualifications: string;
  testerPhone: string;
  testerEmail: string;
  clientName: string;
  declarationConfirmed: boolean;
  mftMake: string;
  mftModel: string;
  mftSerial: string;
  mftCalDate: string;
  loopMake: string;
  loopSerial: string;
  rcdTesterMake: string;
  rcdTesterSerial: string;
  installationAddress: string;
  installationDescription: string;
  workCarriedOut: string;
  numberOfCircuits: string;
  scheduleOfTests: any[];
  distributionBoards: any[];
  testerSignature: string;
  testerDate: string;
  notes: string;
}

const defaultData = (): TestingOnlyData => ({
  referenceNumber: `TOC-${Date.now().toString(36).toUpperCase()}`,
  testDate: new Date().toISOString().split('T')[0],
  testerName: '', testerQualifications: '', testerPhone: '', testerEmail: '',
  clientName: '', declarationConfirmed: false,
  mftMake: '', mftModel: '', mftSerial: '', mftCalDate: '',
  loopMake: '', loopSerial: '', rcdTesterMake: '', rcdTesterSerial: '',
  installationAddress: '', installationDescription: '', workCarriedOut: '', numberOfCircuits: '',
  scheduleOfTests: [],
  distributionBoards: [],
  testerSignature: '', testerDate: new Date().toISOString().split('T')[0], notes: '',
});

const TAB_ORDER = ['details', 'testing'] as const;

const STEPS = [
  { id: 'details', label: 'Details' },
  { id: 'testing', label: 'Sign off' },
];

// ── Shared sub-components ────────────────────────────────────────────────

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const Sub = ({ title }: { title: string }) => (
  <div className="border-t border-white/[0.08] pt-4">
    <p className="text-[13px] font-semibold text-white">{title}</p>
  </div>
);

const Field = ({ label, required, children, full }: { label: string; required?: boolean; children: React.ReactNode; full?: boolean }) => (
  <div className={full ? 'sm:col-span-2' : ''}>
    <Label className={labelCn}>{label}{required && ' *'}</Label>
    {children}
  </div>
);

// ── Main Component ───────────────────────────────────────────────────────

export default function TestingOnlyCertificate() {
  const navigate = useNavigate();
  const { id: editId } = useParams<{ id: string }>();
  const isNew = editId === 'new' || !editId;
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [isGenerating, setIsGenerating] = useState(false);
  const [savedReportId, setSavedReportId] = useState<string | null>(editId !== 'new' ? editId || null : null);
  const [currentTab, setCurrentTab] = useState('details');

  // PDF generation dialog state
  const [showGenerationDialog, setShowGenerationDialog] = useState(false);
  const [generatedPdfUrl, setGeneratedPdfUrl] = useState<string | null>(null);
  const [pdfFilename, setPdfFilename] = useState('document.pdf');
  const [generationError, setGenerationError] = useState<string | null>(null);

  // Email dialog state
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [emailRecipient, setEmailRecipient] = useState('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const [data, setData] = useState<TestingOnlyData>(defaultData());

  // Track direction so the step slide matches travel (forward vs back).
  const prevIndexRef = useRef(TAB_ORDER.indexOf(currentTab as (typeof TAB_ORDER)[number]));
  const currentIndex = TAB_ORDER.indexOf(currentTab as (typeof TAB_ORDER)[number]);
  const isBack = currentIndex < prevIndexRef.current;
  prevIndexRef.current = currentIndex;

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
    onAmended: (newId) => navigate(`/electrician/inspection-testing/testing-only/${newId}`),
  });

const {
    status: syncStatus, saveNow, syncNowImmediate,
  } = useReportSync({
    reportId: savedReportId,
    reportType: 'testing-only',
    formData: data,
    enabled: !isLoading && !isLocked,
    isHydrating: isLoading, // Gate autosave while loading from cloud — prevents blank-overwrite race.
    onReportCreated: (newId) => {
      setSavedReportId(newId);
      window.history.replaceState(null, '', `/electrician/inspection-testing/testing-only/${newId}`);
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

  // ── Load existing report ──────────────────────────────────────────────
  useEffect(() => {
    if (isNew || !editId) { setIsLoading(false); return; }
    const load = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setIsLoading(false); return; }
        const reportData = await reportCloud.getReportData(editId, user.id);
        if (reportData) {
          setData((prev) => ({ ...defaultData(), ...prev, ...(reportData as any) }));
          setSavedReportId(editId);
        }
      } catch (err) { console.error('Failed to load Testing Only cert:', err); }
      finally { setIsLoading(false); }
    };
    load();
  }, [editId, isNew]);

  // Draft recovery handled by useReportSync — no manual dialog needed

  // ── Auto-fill tester details from profile on first load ────────────────
  useEffect(() => {
    if (data.testerName) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: cpData } = await supabase.rpc('get_my_company_profile');
      const cp = Array.isArray(cpData) ? cpData[0] : cpData;
      if (cp) {
        const quals = Array.isArray(cp.inspector_qualifications)
          ? cp.inspector_qualifications.join(', ')
          : cp.inspector_qualifications || '';
        setData((prev) => ({
          ...prev,
          testerName: prev.testerName || cp.inspector_name || cp.company_name || '',
          testerQualifications: prev.testerQualifications || quals,
          testerPhone: prev.testerPhone || cp.company_phone || '',
          testerEmail: prev.testerEmail || cp.company_email || '',
          testerSignature: prev.testerSignature || cp.signature_data || '',
        }));
      }
    });
  }, []);

  // ── Load test instruments from Business Settings ──────────────────────
  const loadInstrumentsFromSettings = useCallback(async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    const { data: cpData } = await supabase.rpc('get_my_company_profile');
    const cp = Array.isArray(cpData) ? cpData[0] : cpData;
    if (!cp?.testing_instruments?.length) { toast.error('No saved instruments in Business Settings'); return; }
    const instruments = cp.testing_instruments as Array<{ instrument_type: string; make: string; model: string; serial_number: string; calibration_date: string }>;
    const mft = instruments.find((i) => i.instrument_type === 'multifunction');
    const loop = instruments.find((i) => i.instrument_type === 'loop_impedance');
    const rcd = instruments.find((i) => i.instrument_type === 'rcd');
    setData((prev) => ({
      ...prev,
      ...(mft ? { mftMake: mft.make, mftModel: mft.model, mftSerial: mft.serial_number, mftCalDate: mft.calibration_date } : {}),
      ...(loop ? { loopMake: loop.make, loopSerial: loop.serial_number } : {}),
      ...(rcd ? { rcdTesterMake: rcd.make, rcdTesterSerial: rcd.serial_number } : {}),
    }));
    toast.success('Instruments loaded from Business Settings');
  }, []);

  const update = useCallback((field: keyof TestingOnlyData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleFormUpdate = useCallback((field: string, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  // ── Save ──────────────────────────────────────────────────────────────
  const handleSave = async () => {
    if (!data.testerName) { toast.error('Please enter tester name'); return; }
    setIsSaving(true);
    try {
      const result = await syncNowImmediate({ dataOverride: data });
      if (result?.success) {
        toast.success(savedReportId ? 'Record updated' : 'Record saved');
      } else { toast.error('Failed to save'); }
    } catch { toast.error('Failed to save'); }
    finally { setIsSaving(false); }
  };

  const handleSaveDraft = () => { saveNow(); toast.success('Draft saved'); };

  const handleEmailCertificate = () => {
    if (!savedReportId) {
      toast.error('Please save the record first before emailing.');
      return;
    }
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
      // PDF even when the user emails before ever tapping Generate. Raw
      // form_data lacks the boards/circuits arrays the template needs.
      let formattedData: Record<string, unknown> | undefined;
      try {
        const { formatTestingOnlyJson } = await import('@/utils/testingOnlyJsonFormatter');
        formattedData = formatTestingOnlyJson({
          ...data,
          referenceNumber: data.referenceNumber || `TOC-${Date.now().toString(36).toUpperCase()}`,
        });
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

  // ── Generate PDF (with CertificateGenerationDialog for Capacitor) ────
  const handleGeneratePDF = async () => {
    if (!data.testerSignature) { toast.error('Tester signature required'); return; }
    setIsGenerating(true);
    setGeneratedPdfUrl(null);
    setGenerationError(null);
    setShowGenerationDialog(true);
    try {
      await syncNowImmediate();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('Please sign in');

      const { formatTestingOnlyJson } = await import('@/utils/testingOnlyJsonFormatter');
      const payload = formatTestingOnlyJson(data);

      // Persist the formatted payload so server-side email/regeneration uses
      // the boards/circuits arrays the template needs (raw form_data lacks them).
      if (savedReportId) {
        await supabase.from('reports').update({ pdf_payload: payload }).eq('report_id', savedReportId);
      }

      const { data: pdfResult, error: pdfError } = await supabase.functions.invoke('generate-testing-only-pdf', { body: { formData: payload } });
      if (pdfError) throw new Error(pdfError.message || 'PDF generation failed');
      if (!pdfResult?.success || !pdfResult?.pdfUrl) throw new Error(pdfResult?.error || 'No PDF URL returned');

      const filename = `Testing-Only-${data.referenceNumber}.pdf`;

      // Save to permanent storage
      let permanentPdfUrl = pdfResult.pdfUrl;
      const reportId = savedReportId || data.referenceNumber;
      try {
        const { saveCertificatePdf } = await import('@/utils/certificate-pdf-storage');
        const { permanentUrl, storagePath } = await saveCertificatePdf(pdfResult.pdfUrl, user.id, reportId, data.referenceNumber);
        permanentPdfUrl = permanentUrl;
        await supabase.from('reports').update({ storage_path: storagePath, pdf_url: permanentPdfUrl, pdf_generated_at: new Date().toISOString(), status: 'completed' }).eq('report_id', reportId);
      } catch {
        await supabase.from('reports').update({ pdf_url: permanentPdfUrl, pdf_generated_at: new Date().toISOString(), status: 'completed' }).eq('report_id', reportId);
      }

      setGeneratedPdfUrl(permanentPdfUrl);
      setPdfFilename(filename);
      toast.success('Testing record generated');
    } catch (error) {
      const msg = error instanceof Error ? error.message : 'Failed to generate PDF';
      setGenerationError(msg);
      toast.error(msg);
    } finally {
      setIsGenerating(false);
    }
  };

  // ── Tab completion ────────────────────────────────────────────────────
  const completedTabs: Record<string, boolean> = {
    details: !!(data.testerName && data.installationAddress),
    testing: !!(data.scheduleOfTests?.length > 0 && data.testerSignature),
  };

  const progressPercent = Math.round(
    (TAB_ORDER.filter((t) => completedTabs[t]).length / TAB_ORDER.length) * 100
  );

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
      </div>
    );
  }

  // ── Tab 1: Details ────────────────────────────────────────────────────
  const detailsContent = (
    <div className="space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
      {/* Tester */}
      <section className={cardCn}>
        <SectionHeader title="Tester Details" />
        <Field label="Name" required><Input value={data.testerName} onChange={(e) => update('testerName', e.target.value)} className={inputCn} /></Field>
        <Field label="Qualifications"><Input value={data.testerQualifications} onChange={(e) => update('testerQualifications', e.target.value)} className={inputCn} placeholder="e.g. C&G 2391-52, Level 3 I&T, LCL L3, EAL L3" /></Field>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Phone"><Input type="tel" value={data.testerPhone} onChange={(e) => update('testerPhone', e.target.value)} className={inputCn} /></Field>
          <Field label="Email"><Input type="email" value={data.testerEmail} onChange={(e) => update('testerEmail', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Ref No."><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></Field>
          <Field label="Test Date"><Input type="date" value={data.testDate} onChange={(e) => update('testDate', e.target.value)} className={inputCn} /></Field>
        </div>
      </section>

      {/* Client / Installation */}
      <section className={cardCn}>
        <SectionHeader title="Installation" />
        <Field label="Client / Main Contractor"><Input value={data.clientName} onChange={(e) => update('clientName', e.target.value)} className={inputCn} placeholder="e.g. ABC Electrical Ltd" /></Field>
        <Field label="Address" required><Input value={data.installationAddress} onChange={(e) => update('installationAddress', e.target.value)} className={inputCn} /></Field>
        <Field label="Description of Installation"><Textarea value={data.installationDescription} onChange={(e) => update('installationDescription', e.target.value)} className={textareaCn} placeholder="e.g. Single-phase domestic, consumer unit" /></Field>
        <Field label="Work Carried Out"><Textarea value={data.workCarriedOut} onChange={(e) => update('workCarriedOut', e.target.value)} className={textareaCn} placeholder="e.g. Full rewire, new 18th edition consumer unit" /></Field>
        <Field label="No. of Circuits"><Input type="number" inputMode="numeric" value={data.numberOfCircuits} onChange={(e) => update('numberOfCircuits', e.target.value)} className={inputCn} /></Field>
      </section>

      {/* Test Instruments */}
      <section className={cn(cardCn, 'lg:col-span-2')}>
        <SectionHeader title="Test Instruments" />
        <button onClick={loadInstrumentsFromSettings}
          className="w-full h-11 rounded-xl bg-elec-yellow text-sm font-semibold text-black touch-manipulation active:scale-[0.98] transition-all hover:bg-elec-yellow/90">
          Load from Business Settings
        </button>

        <Sub title="Multi-Function Tester" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Make">
            <MobileSelectPicker value={data.mftMake} onValueChange={(v) => update('mftMake', v)} placeholder="Select"
              options={INSTRUMENT_MAKES.map((m) => ({ label: m, value: m }))} triggerClassName={pickerTrigger} />
          </Field>
          <Field label="Model"><Input value={data.mftModel} onChange={(e) => update('mftModel', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Serial No."><Input value={data.mftSerial} onChange={(e) => update('mftSerial', e.target.value)} className={inputCn} /></Field>
          <Field label="Calibration Date"><Input type="date" value={data.mftCalDate} onChange={(e) => update('mftCalDate', e.target.value)} className={inputCn} /></Field>
        </div>

        <Sub title="Loop Impedance Tester" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Make">
            <MobileSelectPicker value={data.loopMake} onValueChange={(v) => update('loopMake', v)} placeholder="Select"
              options={INSTRUMENT_MAKES.map((m) => ({ label: m, value: m }))} triggerClassName={pickerTrigger} />
          </Field>
          <Field label="Serial No."><Input value={data.loopSerial} onChange={(e) => update('loopSerial', e.target.value)} className={inputCn} /></Field>
        </div>

        <Sub title="RCD Tester" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Make">
            <MobileSelectPicker value={data.rcdTesterMake} onValueChange={(v) => update('rcdTesterMake', v)} placeholder="Select"
              options={INSTRUMENT_MAKES.map((m) => ({ label: m, value: m }))} triggerClassName={pickerTrigger} />
          </Field>
          <Field label="Serial No."><Input value={data.rcdTesterSerial} onChange={(e) => update('rcdTesterSerial', e.target.value)} className={inputCn} /></Field>
        </div>
      </section>
    </div>
  );

  // ── Tab 2: Testing + Sign-off ─────────────────────────────────────────
  const testingContent = (
    <div className="space-y-4">
      {/* Shared SoT table — same component as EICR/EIC */}
      <EICRScheduleOfTests
        formData={data}
        onUpdate={handleFormUpdate}
      />

      {/* Declaration */}
      <section className={cardCn}>
        <SectionHeader title="Declaration" />
        <div className="rounded-xl bg-white/[0.05] px-3.5 py-3">
          <p className="text-sm text-white leading-relaxed">I confirm that the tests recorded in this document have been carried out by me in accordance with BS 7671:2018+A3:2024, using calibrated instruments, and the results are a true record of the readings obtained.</p>
        </div>
        <div className="flex items-center justify-between gap-3">
          <Label className="text-white text-sm font-medium">I confirm the above</Label>
          <div className="flex gap-2">
            {[true, false].map((v) => (
              <button key={String(v)} type="button" onClick={() => update('declarationConfirmed', v)}
                className={cn('h-11 min-w-[64px] rounded-xl px-4 text-sm touch-manipulation transition-all active:scale-[0.98]',
                  data.declarationConfirmed === v
                    ? (v ? 'bg-green-500 border border-green-500 text-black font-semibold' : 'bg-red-500 border border-red-500 text-white font-semibold')
                    : 'bg-white/[0.06] border border-white/[0.12] text-white font-medium')}>
                {v ? 'Yes' : 'No'}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Signature */}
      <section className={cardCn}>
        <SectionHeader title="Sign-off" />
        <SignatureInput label="Tester Signature" value={data.testerSignature} onChange={(sig) => update('testerSignature', sig || '')} />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
          <Field label="Date"><Input type="date" value={data.testerDate} onChange={(e) => update('testerDate', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="Notes"><Textarea value={data.notes} onChange={(e) => update('notes', e.target.value)} className={textareaCn} placeholder="Additional notes..." /></Field>
      </section>
    </div>
  );

  return (
    <div className="bg-background min-h-screen">
      {/* Shell header — fixed bar with progress ring + full-width step tabs */}
      <CertShellHeader
        onBack={() => navigate(-1)}
        title="Testing Only"
        subtitle={data.referenceNumber ? `${data.referenceNumber} · BS 7671` : null}
        isSaving={isSaving}
        onManualSave={handleSaveDraft}
        syncStatus={syncStatus}
        progressPercent={progressPercent}
        steps={STEPS}
        currentTab={currentTab}
        onTabChange={(tab) => {
          setCurrentTab(tab);
          window.scrollTo({ top: 0 });
        }}
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
        <div
          className={cn(isLocked && 'pointer-events-none select-none opacity-95')}
          aria-disabled={isLocked || undefined}
        >
          <div
            key={currentTab}
            className={isBack ? 'motion-safe:animate-mw-step-back' : 'motion-safe:animate-mw-step-in'}
          >
            {currentTab === 'details' ? detailsContent : testingContent}
          </div>

          <CertShellFooter
            currentIndex={currentIndex}
            totalSteps={TAB_ORDER.length}
            canPrevious={currentIndex > 0}
            canNext={currentIndex < TAB_ORDER.length - 1}
            onPrevious={() => setCurrentTab('details')}
            onNext={() => setCurrentTab('testing')}
            nextLabels={['Continue to testing']}
            isLastStep={currentTab === 'testing'}
            onGenerate={handleGeneratePDF}
            canGenerate={!isGenerating && !!data.testerSignature}
            generateLabel="Generate certificate"
            lastStepActions={
              <>
                <button onClick={handleSave} disabled={isSaving} className={certFooterNeutralButton}>
                  {isSaving ? 'Saving...' : savedReportId ? 'Update record' : 'Save record'}
                </button>
                <button onClick={handleEmailCertificate} disabled={!savedReportId} className={certFooterNeutralButton}>
                  Email
                </button>
              </>
            }
          />
        </div>
      </main>

      {/* PDF Generation Dialog (handles Capacitor download properly) */}
      <CertificateGenerationDialog
        open={showGenerationDialog}
        onOpenChange={setShowGenerationDialog}
        isGenerating={isGenerating}
        pdfUrl={generatedPdfUrl}
        pdfFilename={pdfFilename}
        errorMessage={generationError}
        documentLabel="Certificate"
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
              <label htmlFor="testing-only-email" className="mb-1 block text-[12px] font-medium text-white">
                Recipient email
              </label>
              <Input
                id="testing-only-email"
                type="email"
                placeholder="client@example.com"
                value={emailRecipient}
                onChange={(e) => setEmailRecipient(e.target.value)}
                disabled={isSendingEmail}
                className="input-underline h-11 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base text-white focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none focus:shadow-none touch-manipulation"
              />
            </div>
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

    </div>
  );
}
