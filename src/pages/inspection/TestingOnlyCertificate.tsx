import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, ClipboardList, TestTube, Loader2, Building2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import { SmartTabs, SmartTab } from '@/components/ui/smart-tabs';
import SignatureInput from '@/components/signature/SignatureInput';
import EICRScheduleOfTests from '@/components/EICRScheduleOfTests';
import CertificateGenerationDialog from '@/components/inspection/CertificateGenerationDialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { reportCloud } from '@/utils/reportCloud';
import { useReportSync } from '@/hooks/useReportSync';
import { SyncStatusBadge } from '@/components/inspection/SyncStatusBadge';

const inputCn = 'touch-manipulation';
const textareaCn = 'touch-manipulation min-h-[100px]';
const pickerTrigger = 'h-12 w-full touch-manipulation text-base';

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

// ── Shared sub-components ────────────────────────────────────────────────

const SectionHeader = ({ title }: { title: string }) => (
  <div className="border-b border-white/[0.06] pb-1 mb-3">
    <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
    <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
  </div>
);

const Sub = ({ title }: { title: string }) => (
  <div className="flex items-center gap-2 pt-2">
    <p className="text-[10px] font-semibold text-white uppercase tracking-wider shrink-0">{title}</p>
    <div className="h-px flex-1 bg-white/[0.06]" />
  </div>
);

const Field = ({ label, required, children, full }: { label: string; required?: boolean; children: React.ReactNode; full?: boolean }) => (
  <div className={full ? 'col-span-2' : ''}>
    <Label className="text-white text-xs mb-1.5 block">{label}{required && ' *'}</Label>
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

  const [data, setData] = useState<TestingOnlyData>(defaultData());

  const {
    status: syncStatus, saveNow, syncNowImmediate,
  } = useReportSync({
    reportId: savedReportId,
    reportType: 'testing-only',
    formData: data,
    enabled: !isLoading,
    onReportCreated: (newId) => {
      setSavedReportId(newId);
      window.history.replaceState(null, '', `/electrician/inspection-testing/testing-only/${newId}`);
    },
  });

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

  if (isLoading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-elec-yellow" />
      </div>
    );
  }

  // ── Tab 1: Details ────────────────────────────────────────────────────
  const detailsContent = (
    <div className="py-4 space-y-6 pb-48">
      {/* Tester */}
      <section className="space-y-4">
        <SectionHeader title="Tester Details" />
        <Field label="Name" required><Input value={data.testerName} onChange={(e) => update('testerName', e.target.value)} className={inputCn} /></Field>
        <Field label="Qualifications"><Input value={data.testerQualifications} onChange={(e) => update('testerQualifications', e.target.value)} className={inputCn} placeholder="e.g. C&G 2391-52" /></Field>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Phone"><Input type="tel" value={data.testerPhone} onChange={(e) => update('testerPhone', e.target.value)} className={inputCn} /></Field>
          <Field label="Email"><Input type="email" value={data.testerEmail} onChange={(e) => update('testerEmail', e.target.value)} className={inputCn} /></Field>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Field label="Ref No."><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></Field>
          <Field label="Test Date"><Input type="date" value={data.testDate} onChange={(e) => update('testDate', e.target.value)} className={inputCn} /></Field>
        </div>
      </section>

      {/* Client / Installation */}
      <section className="space-y-4">
        <SectionHeader title="Installation" />
        <Field label="Client / Main Contractor"><Input value={data.clientName} onChange={(e) => update('clientName', e.target.value)} className={inputCn} placeholder="e.g. ABC Electrical Ltd" /></Field>
        <Field label="Address" required><Input value={data.installationAddress} onChange={(e) => update('installationAddress', e.target.value)} className={inputCn} /></Field>
        <Field label="Description of Installation"><Textarea value={data.installationDescription} onChange={(e) => update('installationDescription', e.target.value)} className={textareaCn} placeholder="e.g. Single-phase domestic, consumer unit" /></Field>
        <Field label="Work Carried Out"><Textarea value={data.workCarriedOut} onChange={(e) => update('workCarriedOut', e.target.value)} className={textareaCn} placeholder="e.g. Full rewire, new 18th edition consumer unit" /></Field>
        <Field label="No. of Circuits"><Input type="number" inputMode="numeric" value={data.numberOfCircuits} onChange={(e) => update('numberOfCircuits', e.target.value)} className={inputCn} /></Field>
      </section>

      {/* Test Instruments */}
      <section className="space-y-4">
        <SectionHeader title="Test Instruments" />
        <button onClick={loadInstrumentsFromSettings}
          className="w-full h-11 bg-elec-yellow/10 border border-elec-yellow/30 text-elec-yellow text-sm font-semibold rounded-xl touch-manipulation active:scale-[0.98] transition-all flex items-center justify-center gap-2">
          <Building2 className="h-4 w-4" />
          Load from Business Settings
        </button>

        <Sub title="Multi-Function Tester" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Make">
            <MobileSelectPicker value={data.mftMake} onValueChange={(v) => update('mftMake', v)} placeholder="Select"
              options={INSTRUMENT_MAKES.map((m) => ({ label: m, value: m }))} triggerClassName={pickerTrigger} />
          </Field>
          <Field label="Model"><Input value={data.mftModel} onChange={(e) => update('mftModel', e.target.value)} className={inputCn} /></Field>
        </div>
        <Field label="Serial No."><Input value={data.mftSerial} onChange={(e) => update('mftSerial', e.target.value)} className={inputCn} /></Field>
        <Field label="Calibration Date"><Input type="date" value={data.mftCalDate} onChange={(e) => update('mftCalDate', e.target.value)} className={inputCn} /></Field>

        <Sub title="Loop Impedance Tester" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Make">
            <MobileSelectPicker value={data.loopMake} onValueChange={(v) => update('loopMake', v)} placeholder="Select"
              options={INSTRUMENT_MAKES.map((m) => ({ label: m, value: m }))} triggerClassName={pickerTrigger} />
          </Field>
          <Field label="Serial No."><Input value={data.loopSerial} onChange={(e) => update('loopSerial', e.target.value)} className={inputCn} /></Field>
        </div>

        <Sub title="RCD Tester" />
        <div className="grid grid-cols-2 gap-3">
          <Field label="Make">
            <MobileSelectPicker value={data.rcdTesterMake} onValueChange={(v) => update('rcdTesterMake', v)} placeholder="Select"
              options={INSTRUMENT_MAKES.map((m) => ({ label: m, value: m }))} triggerClassName={pickerTrigger} />
          </Field>
          <Field label="Serial No."><Input value={data.rcdTesterSerial} onChange={(e) => update('rcdTesterSerial', e.target.value)} className={inputCn} /></Field>
        </div>
      </section>

      {/* Details tab bottom actions */}
      <div className="space-y-2 pt-2">
        <button onClick={handleSave} disabled={isSaving}
          className="w-full h-12 bg-elec-yellow/15 border border-elec-yellow/25 text-elec-yellow text-sm font-semibold rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-50 transition-all">
          {isSaving ? 'Saving...' : savedReportId ? 'Update Record' : 'Save Record'}
        </button>
        <button onClick={() => setCurrentTab('testing')}
          className="w-full h-12 bg-white/[0.04] border border-white/[0.08] text-white text-sm font-medium rounded-xl touch-manipulation active:scale-[0.98] transition-all">
          Continue to Testing
        </button>
      </div>
    </div>
  );

  // ── Tab 2: Testing + Sign-off ─────────────────────────────────────────
  const testingContent = (
    <div className="space-y-0">
      {/* Shared SoT table — same component as EICR/EIC */}
      <EICRScheduleOfTests
        formData={data}
        onUpdate={handleFormUpdate}
      />

      {/* Sign-off section below the table */}
      <div className="py-4 space-y-6 pb-48">
        {/* Declaration */}
        <section className="space-y-4">
          <SectionHeader title="Declaration" />
          <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-4">
            <p className="text-sm text-white leading-relaxed">I confirm that the tests recorded in this document have been carried out by me in accordance with BS 7671:2018+A3:2024, using calibrated instruments, and the results are a true record of the readings obtained.</p>
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-white text-sm font-medium">I confirm the above</Label>
            <div className="flex gap-2">
              {[true, false].map((v) => (
                <button key={String(v)} type="button" onClick={() => update('declarationConfirmed', v)}
                  className={cn('w-14 h-9 rounded-lg text-xs font-semibold touch-manipulation transition-all',
                    data.declarationConfirmed === v ? (v ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                  {v ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Signature */}
        <section className="space-y-4">
          <SectionHeader title="Sign-off" />
          <SignatureInput label="Tester Signature" value={data.testerSignature} onChange={(sig) => update('testerSignature', sig || '')} />
          <div className="grid grid-cols-2 gap-3">
            <Field label="Date"><Input type="date" value={data.testerDate} onChange={(e) => update('testerDate', e.target.value)} className={inputCn} /></Field>
          </div>
          <Field label="Notes"><Textarea value={data.notes} onChange={(e) => update('notes', e.target.value)} className={textareaCn} placeholder="Additional notes..." /></Field>
        </section>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <button onClick={handleGeneratePDF} disabled={isGenerating || !data.testerSignature}
            className="w-full h-12 bg-elec-yellow/15 border border-elec-yellow/25 text-elec-yellow hover:bg-elec-yellow/25 text-sm font-semibold rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-50 transition-all">
            {isGenerating ? 'Generating...' : 'Generate Certificate'}
          </button>
          <button onClick={handleSave} disabled={isSaving}
            className="w-full h-12 bg-white/[0.04] border border-white/[0.08] text-white text-sm font-medium rounded-xl touch-manipulation active:scale-[0.98] disabled:opacity-50 transition-all">
            {isSaving ? 'Saving...' : 'Save Record'}
          </button>
        </div>
      </div>
    </div>
  );

  const smartTabs: SmartTab[] = [
    {
      value: 'details',
      label: 'Details',
      shortLabel: 'Details',
      icon: <ClipboardList className="h-4 w-4" />,
      content: detailsContent,
    },
    {
      value: 'testing',
      label: 'Testing',
      shortLabel: 'Tests',
      icon: <TestTube className="h-4 w-4" />,
      content: testingContent,
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm">
        <div className="px-2 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <h1 className="text-sm font-bold text-white leading-tight">Testing Only</h1>
                <p className="text-[10px] text-white font-mono mt-0.5">{data.referenceNumber || 'Schedule of Tests'}</p>
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

      {/* Tabs */}
      <SmartTabs
        tabs={smartTabs}
        value={currentTab}
        onValueChange={setCurrentTab}
        className="w-full"
        completedTabs={completedTabs}
        showProgress
      />

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

    </div>
  );
}
