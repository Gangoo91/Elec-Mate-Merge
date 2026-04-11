import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Plus, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { MobileSelectPicker } from '@/components/ui/mobile-select-picker';
import SignatureInput from '@/components/signature/SignatureInput';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { reportCloud } from '@/utils/reportCloud';
import { useReportSync } from '@/hooks/useReportSync';
import { SyncStatusBadge } from '@/components/inspection/SyncStatusBadge';
import { draftStorage } from '@/utils/draftStorage';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

const inputCn = '!h-10 !py-1 !text-xs touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const textareaCn = 'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white';
const pickerTrigger = 'h-10 w-full touch-manipulation bg-white/[0.06] border-white/[0.08] text-white text-xs';

const INSTRUMENT_MAKES = ['Megger', 'Fluke', 'Metrel', 'Kewtech', 'Seaward', 'Robin', 'Di-Log', 'Other'];

interface TestCircuit {
  id: string;
  circuitRef: string;
  description: string;
  cableType: string;
  cableSize: string;
  protectionType: string;
  protectionRating: string;
  ze: string;
  zs: string;
  r1r2: string;
  r2: string;
  ir: string;
  polarity: string;
  rcdType: string;
  rcdRating: string;
  rcdTripTime: string;
  result: 'pass' | 'fail' | '';
}

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
  numberOfCircuits: string;
  circuits: TestCircuit[];
  testerSignature: string;
  testerDate: string;
  notes: string;
}

const newCircuit = (): TestCircuit => ({
  id: crypto.randomUUID(), circuitRef: '', description: '', cableType: '', cableSize: '',
  protectionType: '', protectionRating: '', ze: '', zs: '', r1r2: '', r2: '', ir: '',
  polarity: '', rcdType: '', rcdRating: '', rcdTripTime: '', result: '',
});

const defaultData = (): TestingOnlyData => ({
  referenceNumber: `TOC-${Date.now().toString(36).toUpperCase()}`,
  testDate: new Date().toISOString().split('T')[0],
  testerName: '', testerQualifications: '', testerPhone: '', testerEmail: '',
  clientName: '', declarationConfirmed: false,
  mftMake: '', mftModel: '', mftSerial: '', mftCalDate: '',
  loopMake: '', loopSerial: '', rcdTesterMake: '', rcdTesterSerial: '',
  installationAddress: '', installationDescription: '', numberOfCircuits: '',
  circuits: [newCircuit()],
  testerSignature: '', testerDate: new Date().toISOString().split('T')[0], notes: '',
});

const SectionHeader = ({ title }: { title: string }) => (
  <div className="space-y-3">
    <div className="border-b border-white/[0.06] pb-1">
      <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-elec-yellow/40 to-elec-yellow/10 mb-2" />
      <h2 className="text-xs font-medium text-white uppercase tracking-wider">{title}</h2>
    </div>
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

const PassFailToggle = ({ value, onChange }: { value: string; onChange: (v: string) => void }) => (
  <div className="flex gap-2">
    {['pass', 'fail'].map((v) => (
      <button key={v} type="button" onClick={() => onChange(v)}
        className={cn('flex-1 h-9 rounded-lg text-[10px] font-semibold touch-manipulation transition-all',
          value === v ? (v === 'pass' ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
        {v === 'pass' ? 'Pass' : 'Fail'}
      </button>
    ))}
  </div>
);

export default function TestingOnlyCertificate() {
  const navigate = useNavigate();
  const { id: editId } = useParams<{ id: string }>();
  const isNew = editId === 'new' || !editId;
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(!isNew);
  const [savedReportId, setSavedReportId] = useState<string | null>(editId !== 'new' ? editId || null : null);
  const [showRecoveryDialog, setShowRecoveryDialog] = useState(false);
  const [recoveryDraft, setRecoveryDraft] = useState<{ data: any; lastModified: Date } | null>(null);

  const [data, setData] = useState<TestingOnlyData>(defaultData());

  const {
    status: syncStatus, saveNow, syncNowImmediate,
    hasRecoverableDraft, recoverDraft, discardDraft,
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

  useEffect(() => {
    if (isNew || !editId) { setIsLoading(false); return; }
    const load = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setIsLoading(false); return; }
        const reportData = await reportCloud.getReportData(editId, user.id);
        if (reportData) { setData((prev) => ({ ...defaultData(), ...prev, ...(reportData as any) })); setSavedReportId(editId); }
      } catch (err) { console.error('Failed to load Testing Only cert:', err); }
      finally { setIsLoading(false); }
    };
    load();
  }, [editId, isNew]);

  useEffect(() => {
    if (!isNew || !hasRecoverableDraft) return;
    const draft = draftStorage.loadDraft('testing-only', null);
    if (draft) { setRecoveryDraft(draft); setShowRecoveryDialog(true); }
  }, [isNew, hasRecoverableDraft]);

  // Pre-fill tester name from company profile (no company details)
  useEffect(() => {
    if (data.testerName) return;
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: cpData } = await supabase.rpc('get_my_company_profile');
      const cp = Array.isArray(cpData) ? cpData[0] : cpData;
      if (cp) setData((prev) => ({
        ...prev,
        testerName: prev.testerName || cp.inspector_name || cp.company_name || '',
        testerPhone: prev.testerPhone || cp.company_phone || '',
        testerEmail: prev.testerEmail || cp.company_email || '',
      }));
    });
  }, []);

  const update = useCallback((field: keyof TestingOnlyData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const updateCircuit = useCallback((id: string, field: keyof TestCircuit, value: any) => {
    setData((prev) => ({
      ...prev,
      circuits: prev.circuits.map((c) => c.id === id ? { ...c, [field]: value } : c),
    }));
  }, []);

  const addCircuit = useCallback(() => {
    setData((prev) => ({ ...prev, circuits: [...prev.circuits, newCircuit()] }));
  }, []);

  const removeCircuit = useCallback((id: string) => {
    setData((prev) => ({ ...prev, circuits: prev.circuits.length > 1 ? prev.circuits.filter((c) => c.id !== id) : prev.circuits }));
  }, []);

  const handleSave = async () => {
    if (!data.testerName) { toast.error('Please enter tester name'); return; }
    setIsSaving(true);
    try {
      const result = await syncNowImmediate({ dataOverride: data });
      if (result?.success) {
        toast.success(savedReportId ? 'Record updated' : 'Record saved');
        navigate(-1);
      } else { toast.error('Failed to save'); }
    } catch { toast.error('Failed to save'); }
    finally { setIsSaving(false); }
  };

  const handleSaveDraft = () => { saveNow(); toast.success('Draft saved'); };

  const handleGeneratePDF = async () => {
    if (!data.testerSignature) { toast.error('Tester signature required'); return; }
    setIsSaving(true);
    try {
      await syncNowImmediate();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error('Please sign in'); setIsSaving(false); return; }

      // No company branding — intentionally omitted for Testing Only
      const payload = { ...data };
      const { data: pdfResult, error: pdfError } = await supabase.functions.invoke('generate-testing-only-pdf', { body: { formData: payload } });
      if (pdfError) { toast.error('PDF generation failed'); }
      else if (pdfResult?.download_url) {
        let url = pdfResult.download_url;
        const reportId = savedReportId || data.referenceNumber;
        try {
          const { saveCertificatePdf } = await import('@/utils/certificate-pdf-storage');
          const { permanentUrl, storagePath } = await saveCertificatePdf(url, user.id, reportId, data.referenceNumber);
          url = permanentUrl;
          await supabase.from('reports').update({ storage_path: storagePath, pdf_url: url, pdf_generated_at: new Date().toISOString(), status: 'completed' }).eq('report_id', reportId);
        } catch {
          await supabase.from('reports').update({ pdf_url: url, pdf_generated_at: new Date().toISOString(), status: 'completed' }).eq('report_id', reportId);
        }
        const { openOrDownloadPdf } = await import('@/utils/pdf-download');
        await openOrDownloadPdf(url, `Testing-Only-${data.referenceNumber}.pdf`);
        toast.success('Testing record generated');
      }
    } catch { toast.error('Failed to generate PDF'); } finally { setIsSaving(false); }
  };

  return (
    <div className="bg-background min-h-screen">
      {/* Header */}
      <div className="bg-background">
        <div className="px-2 py-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <button onClick={() => navigate(-1)} className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.98]">
                <ArrowLeft className="h-4 w-4" />
              </button>
              <div>
                <h1 className="text-sm font-bold text-white leading-tight">Testing Only</h1>
                <p className="text-[10px] text-white font-mono mt-0.5">Schedule of Tests</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SyncStatusBadge status={syncStatus} />
              <button onClick={handleSaveDraft} className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.98]">
                <Save className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      <main className="px-3 py-4 pb-48 sm:px-4 sm:pb-8 space-y-5">
        {/* 1. Tester Details */}
        <section className="space-y-3">
          <SectionHeader title="Tester Details" />
          <div className="grid grid-cols-2 gap-2">
            <Field label="Name" required><Input value={data.testerName} onChange={(e) => update('testerName', e.target.value)} className={inputCn} /></Field>
            <Field label="Qualifications"><Input value={data.testerQualifications} onChange={(e) => update('testerQualifications', e.target.value)} className={inputCn} placeholder="e.g. 2391" /></Field>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Phone"><Input type="tel" value={data.testerPhone} onChange={(e) => update('testerPhone', e.target.value)} className={inputCn} /></Field>
            <Field label="Email"><Input type="email" value={data.testerEmail} onChange={(e) => update('testerEmail', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Reference No."><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></Field>
            <Field label="Test Date"><Input type="date" value={data.testDate} onChange={(e) => update('testDate', e.target.value)} className={inputCn} /></Field>
          </div>
        </section>

        {/* 2. Test Instruments */}
        <section className="space-y-3">
          <SectionHeader title="Test Instruments" />
          <Sub title="MFT" />
          <div className="grid grid-cols-2 gap-2">
            <Field label="Make">
              <MobileSelectPicker value={data.mftMake} onValueChange={(v) => update('mftMake', v)} placeholder="Select"
                options={INSTRUMENT_MAKES.map((m) => ({ label: m, value: m }))} triggerClassName={pickerTrigger} />
            </Field>
            <Field label="Model"><Input value={data.mftModel} onChange={(e) => update('mftModel', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Serial No."><Input value={data.mftSerial} onChange={(e) => update('mftSerial', e.target.value)} className={inputCn} /></Field>
            <Field label="Cal. Date"><Input type="date" value={data.mftCalDate} onChange={(e) => update('mftCalDate', e.target.value)} className={inputCn} /></Field>
          </div>
          <Sub title="Loop Tester" />
          <div className="grid grid-cols-2 gap-2">
            <Field label="Make">
              <MobileSelectPicker value={data.loopMake} onValueChange={(v) => update('loopMake', v)} placeholder="Select"
                options={INSTRUMENT_MAKES.map((m) => ({ label: m, value: m }))} triggerClassName={pickerTrigger} />
            </Field>
            <Field label="Serial No."><Input value={data.loopSerial} onChange={(e) => update('loopSerial', e.target.value)} className={inputCn} /></Field>
          </div>
          <Sub title="RCD Tester" />
          <div className="grid grid-cols-2 gap-2">
            <Field label="Make">
              <MobileSelectPicker value={data.rcdTesterMake} onValueChange={(v) => update('rcdTesterMake', v)} placeholder="Select"
                options={INSTRUMENT_MAKES.map((m) => ({ label: m, value: m }))} triggerClassName={pickerTrigger} />
            </Field>
            <Field label="Serial No."><Input value={data.rcdTesterSerial} onChange={(e) => update('rcdTesterSerial', e.target.value)} className={inputCn} /></Field>
          </div>
        </section>

        {/* 3. Installation */}
        <section className="space-y-3">
          <SectionHeader title="Installation" />
          <Field label="Client / Main Contractor"><Input value={data.clientName} onChange={(e) => update('clientName', e.target.value)} className={inputCn} placeholder="e.g. ABC Electrical Ltd" /></Field>
          <Field label="Address"><Input value={data.installationAddress} onChange={(e) => update('installationAddress', e.target.value)} className={inputCn} /></Field>
          <Field label="Description"><Textarea value={data.installationDescription} onChange={(e) => update('installationDescription', e.target.value)} className={textareaCn} placeholder="e.g. Single-phase domestic, consumer unit replacement" /></Field>
          <Field label="No. of Circuits"><Input type="number" inputMode="numeric" value={data.numberOfCircuits} onChange={(e) => update('numberOfCircuits', e.target.value)} className={inputCn} /></Field>
        </section>

        {/* 4. Schedule of Tests */}
        <section className="space-y-3">
          <SectionHeader title="Schedule of Tests" />
          {data.circuits.map((circuit, idx) => (
            <div key={circuit.id} className="rounded-lg border border-white/[0.08] bg-white/[0.03] p-3 space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-[10px] font-bold text-elec-yellow uppercase">#{idx + 1} Circuit</p>
                {data.circuits.length > 1 && (
                  <button type="button" onClick={() => removeCircuit(circuit.id)} className="w-7 h-7 rounded bg-red-500/20 flex items-center justify-center touch-manipulation">
                    <X className="h-3 w-3 text-red-400" />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Ref"><Input value={circuit.circuitRef} onChange={(e) => updateCircuit(circuit.id, 'circuitRef', e.target.value)} className={inputCn} placeholder="C1" /></Field>
                <Field label="Description"><Input value={circuit.description} onChange={(e) => updateCircuit(circuit.id, 'description', e.target.value)} className={inputCn} placeholder="Lights" /></Field>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Cable Type"><Input value={circuit.cableType} onChange={(e) => updateCircuit(circuit.id, 'cableType', e.target.value)} className={inputCn} placeholder="T&E" /></Field>
                <Field label="Size (mm²)"><Input value={circuit.cableSize} onChange={(e) => updateCircuit(circuit.id, 'cableSize', e.target.value)} className={inputCn} placeholder="1.5" /></Field>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Field label="Protection Type"><Input value={circuit.protectionType} onChange={(e) => updateCircuit(circuit.id, 'protectionType', e.target.value)} className={inputCn} placeholder="B" /></Field>
                <Field label="Rating (A)"><Input value={circuit.protectionRating} onChange={(e) => updateCircuit(circuit.id, 'protectionRating', e.target.value)} className={inputCn} placeholder="6" /></Field>
              </div>
              <Sub title="Impedance" />
              <div className="grid grid-cols-4 gap-1.5">
                <Field label="Ze"><Input value={circuit.ze} onChange={(e) => updateCircuit(circuit.id, 'ze', e.target.value)} className={inputCn} /></Field>
                <Field label="Zs"><Input value={circuit.zs} onChange={(e) => updateCircuit(circuit.id, 'zs', e.target.value)} className={inputCn} /></Field>
                <Field label="R1+R2"><Input value={circuit.r1r2} onChange={(e) => updateCircuit(circuit.id, 'r1r2', e.target.value)} className={inputCn} /></Field>
                <Field label="R2"><Input value={circuit.r2} onChange={(e) => updateCircuit(circuit.id, 'r2', e.target.value)} className={inputCn} /></Field>
              </div>
              <Sub title="IR" />
              <Field label="IR Reading (MΩ)"><Input value={circuit.ir} onChange={(e) => updateCircuit(circuit.id, 'ir', e.target.value)} className={inputCn} placeholder="≥1.0" /></Field>
              <Sub title="Polarity" />
              <PassFailToggle value={circuit.polarity} onChange={(v) => updateCircuit(circuit.id, 'polarity', v)} />
              <Sub title="RCD" />
              <div className="grid grid-cols-3 gap-1.5">
                <Field label="Type"><Input value={circuit.rcdType} onChange={(e) => updateCircuit(circuit.id, 'rcdType', e.target.value)} className={inputCn} placeholder="AC" /></Field>
                <Field label="Rating (mA)"><Input value={circuit.rcdRating} onChange={(e) => updateCircuit(circuit.id, 'rcdRating', e.target.value)} className={inputCn} placeholder="30" /></Field>
                <Field label="Trip (ms)"><Input value={circuit.rcdTripTime} onChange={(e) => updateCircuit(circuit.id, 'rcdTripTime', e.target.value)} className={inputCn} placeholder="<300" /></Field>
              </div>
              <Sub title="Result" />
              <PassFailToggle value={circuit.result} onChange={(v) => updateCircuit(circuit.id, 'result', v as any)} />
            </div>
          ))}
          <button type="button" onClick={addCircuit}
            className="w-full h-11 rounded-lg border-2 border-dashed border-white/[0.12] text-white/60 text-xs font-medium touch-manipulation active:scale-[0.98] flex items-center justify-center gap-1.5">
            <Plus className="h-3.5 w-3.5" /> Add Circuit
          </button>
        </section>

        {/* 5. Declaration */}
        <section className="space-y-3">
          <SectionHeader title="Declaration" />
          <div className="rounded-lg bg-white/[0.03] border border-white/[0.06] p-3">
            <p className="text-[11px] text-white leading-relaxed">I confirm that the tests recorded in this document have been carried out by me in accordance with BS 7671:2018+A3:2024, using calibrated instruments, and the results are a true record of the readings obtained.</p>
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-white text-xs font-medium">I confirm the above</Label>
            <div className="flex gap-1.5">
              {[true, false].map((v) => (
                <button key={String(v)} type="button" onClick={() => update('declarationConfirmed', v)}
                  className={cn('w-11 h-7 rounded text-[10px] font-semibold touch-manipulation transition-all',
                    data.declarationConfirmed === v ? (v ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                  {v ? 'Yes' : 'No'}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* 6. Sign-off */}
        <section className="space-y-3">
          <SectionHeader title="Sign-off" />
          <SignatureInput label="Tester Signature" value={data.testerSignature} onChange={(sig) => update('testerSignature', sig || '')} />
          <Field label="Date"><Input type="date" value={data.testerDate} onChange={(e) => update('testerDate', e.target.value)} className={inputCn} /></Field>
          <Field label="Notes"><Textarea value={data.notes} onChange={(e) => update('notes', e.target.value)} className={textareaCn} placeholder="Additional notes..." /></Field>
        </section>

        {/* Actions */}
        <div className="space-y-2 pt-4">
          <button onClick={handleSave} disabled={isSaving}
            className="w-full h-11 bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow text-xs font-semibold rounded-lg touch-manipulation active:scale-[0.98] disabled:opacity-50">
            {isSaving ? 'Saving...' : savedReportId ? 'Update Record' : 'Save Record'}
          </button>
          <button onClick={handleGeneratePDF} disabled={isSaving || !data.testerSignature}
            className="w-full h-11 bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow text-xs font-semibold rounded-lg touch-manipulation active:scale-[0.98] disabled:opacity-50">
            {isSaving ? 'Generating...' : 'Generate PDF'}
          </button>
          <button onClick={handleSaveDraft}
            className="w-full h-11 border border-white/[0.12] text-white text-xs font-medium rounded-lg touch-manipulation active:scale-[0.98]">
            Save Draft
          </button>
        </div>
      </main>

      {/* Draft Recovery Dialog */}
      <AlertDialog open={showRecoveryDialog} onOpenChange={setShowRecoveryDialog}>
        <AlertDialogContent className="bg-[#1a1a2e] border-white/10 text-white max-w-sm">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-white">Recover Draft?</AlertDialogTitle>
            <AlertDialogDescription className="text-white/60">
              {recoveryDraft && `A draft from ${recoveryDraft.lastModified.toLocaleDateString()} was found. Would you like to restore it?`}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => { discardDraft(); setShowRecoveryDialog(false); }} className="bg-white/10 border-white/10 text-white">
              Discard
            </AlertDialogCancel>
            <AlertDialogAction onClick={() => { if (recoveryDraft) { setData((prev) => ({ ...prev, ...recoveryDraft.data })); } setShowRecoveryDialog(false); }} className="bg-elec-yellow text-black">
              Restore
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
