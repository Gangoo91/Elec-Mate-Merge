import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import SignatureInput from '@/components/signature/SignatureInput';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';
import { reportCloud } from '@/utils/reportCloud';

const inputCn = '!h-10 !py-1 !text-xs touch-manipulation bg-white/[0.06] border-white/[0.08] text-white [color-scheme:dark]';
const textareaCn = 'touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white';

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

const Toggle = ({ label, value, onChange }: { label?: string; value: boolean; onChange: (v: boolean) => void }) => (
  <div className="flex gap-2">
    {[true, false].map((v) => (
      <button key={String(v)} type="button" onClick={() => onChange(v)}
        className={cn('flex-1 h-11 rounded-lg text-xs font-semibold touch-manipulation transition-all',
          value === v ? (v ? 'bg-green-500 text-white' : 'bg-red-500 text-white') : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
        {v ? 'Yes' : 'No'}
      </button>
    ))}
  </div>
);

const isolationSteps = [
  'Identify the circuit or equipment to be worked on',
  'Notify all persons who may be affected',
  'Identify the means of isolation',
  'Prove the test instrument on a known live source',
  'Test for dead at the point of work',
  'Re-prove the test instrument on a known live source',
  'Fit locking-off devices and retain keys',
  'Post warning notices at points of isolation',
];

interface SafeIsolationData {
  referenceNumber: string;
  date: string;
  time: string;
  location: string;
  equipmentDescription: string;
  circuitReference: string;
  steps: boolean[];
  testerMake: string;
  testerModel: string;
  testerSerialNumber: string;
  provingUnitMake: string;
  provingUnitModel: string;
  personName: string;
  personSignature: string;
  notes: string;
}

const defaultData = (): SafeIsolationData => ({
  referenceNumber: `SIP-${Date.now().toString(36).toUpperCase()}`,
  date: new Date().toISOString().split('T')[0],
  time: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
  location: '',
  equipmentDescription: '',
  circuitReference: '',
  steps: new Array(isolationSteps.length).fill(false),
  testerMake: '',
  testerModel: '',
  testerSerialNumber: '',
  provingUnitMake: '',
  provingUnitModel: '',
  personName: '',
  personSignature: '',
  notes: '',
});

const DRAFT_KEY = 'elec-mate-draft-safe-isolation';

export default function SafeIsolationPage() {
  const navigate = useNavigate();
  const { id: editId } = useParams<{ id: string }>();
  const [isSaving, setIsSaving] = useState(false);
  const [existingReportId, setExistingReportId] = useState<string | null>(null);
  const [data, setData] = useState<SafeIsolationData>(() => {
    const saved = storageGetJSONSync<Partial<SafeIsolationData>>(DRAFT_KEY, null);
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
    const timer = setTimeout(() => {
      storageSetJSONSync(DRAFT_KEY, data);
    }, 2000);
    return () => clearTimeout(timer);
  }, [data, editId]);

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data: { user } }) => {
      if (!user) return;
      const { data: cpData } = await supabase.rpc('get_my_company_profile');
      const cp = Array.isArray(cpData) ? cpData[0] : cpData;
      if (cp && !data.personName) {
        setData((prev) => ({ ...prev, personName: prev.personName || cp.inspector_name || cp.company_name || '' }));
      }
    });
  }, []);

  const update = useCallback((field: keyof SafeIsolationData, value: any) => {
    setData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const toggleStep = (index: number) => {
    setData((prev) => {
      const newSteps = [...prev.steps];
      newSteps[index] = !newSteps[index];
      return { ...prev, steps: newSteps };
    });
  };

  const allStepsComplete = data.steps.every(Boolean);
  const completedSteps = data.steps.filter(Boolean).length;

  const handleSave = async () => {
    if (!allStepsComplete) { toast.error('Please complete all isolation steps'); return; }
    setIsSaving(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { toast.error('Please sign in'); return; }
      if (existingReportId) {
        await reportCloud.updateReport(existingReportId, user.id, data as any);
      } else {
        const result = await reportCloud.createReport(user.id, 'safe-isolation', data as any);
        if (!result.success) { toast.error('Failed to save'); return; }
      }
      storageRemoveSync(DRAFT_KEY);
      toast.success('Safe isolation record saved');
      navigate(-1);
    } catch { toast.error('Failed to save'); } finally { setIsSaving(false); }
  };

  const handleSaveDraft = () => {
    storageSetJSONSync(DRAFT_KEY, data);
    toast.success('Draft saved');
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
                <h1 className="text-sm font-bold text-white leading-tight">Safe Isolation</h1>
                <p className="text-[10px] text-white font-mono mt-0.5">GS 38</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={handleSaveDraft} className="w-9 h-9 rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center text-white touch-manipulation active:scale-[0.98]">
                <Save className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <div className="h-[1px] bg-gradient-to-r from-elec-yellow/40 via-elec-yellow/20 to-transparent" />
      </div>

      <main className="px-3 py-4 pb-48 sm:px-4 sm:pb-8 space-y-5">
        {/* Details */}
        <section className="space-y-3">
          <SectionHeader title="Details" />
          <Field label="Reference"><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></Field>
          <div className="grid grid-cols-2 gap-2">
            <Field label="Date"><Input type="date" value={data.date} onChange={(e) => update('date', e.target.value)} className={inputCn} /></Field>
            <Field label="Time"><Input type="time" value={data.time} onChange={(e) => update('time', e.target.value)} className={inputCn} /></Field>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Circuit Ref"><Input value={data.circuitReference} onChange={(e) => update('circuitReference', e.target.value)} className={inputCn} placeholder="Circuit 5" /></Field>
            <Field label="Location"><Input value={data.location} onChange={(e) => update('location', e.target.value)} className={inputCn} placeholder="Plant room" /></Field>
          </div>
          <Field label="Equipment"><Input value={data.equipmentDescription} onChange={(e) => update('equipmentDescription', e.target.value)} className={inputCn} placeholder="Distribution board DB3" /></Field>
        </section>

        {/* Isolation Steps */}
        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <SectionHeader title="Isolation Steps (GS 38)" />
            <span className={cn(
              'text-[10px] font-bold px-2 py-0.5 rounded',
              allStepsComplete ? 'bg-green-500/15 text-green-400' : 'bg-amber-500/15 text-amber-400'
            )}>
              {completedSteps}/{isolationSteps.length}
            </span>
          </div>
          <div className="space-y-1.5">
            {isolationSteps.map((step, index) => (
              <div key={index} className="flex items-center justify-between gap-2 rounded-lg bg-white/[0.03] border border-white/[0.06] px-3 py-2">
                <div className="flex items-start gap-2 flex-1 min-w-0">
                  <span className="text-[10px] font-bold text-elec-yellow mt-0.5 shrink-0">{index + 1}</span>
                  <p className="text-[11px] text-white leading-tight">{step}</p>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button type="button" onClick={() => { if (!data.steps[index]) toggleStep(index); }}
                    className={cn('w-11 h-7 rounded text-[10px] font-semibold touch-manipulation transition-all',
                      data.steps[index] ? 'bg-green-500 text-white' : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                    Yes
                  </button>
                  <button type="button" onClick={() => { if (data.steps[index]) toggleStep(index); }}
                    className={cn('w-11 h-7 rounded text-[10px] font-semibold touch-manipulation transition-all',
                      !data.steps[index] ? 'bg-red-500/80 text-white' : 'bg-white/[0.06] text-white border border-white/[0.08]')}>
                    No
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Test Instruments */}
        <section className="space-y-3">
          <SectionHeader title="Test Instruments" />
          <Sub title="Voltage Tester" />
          <div className="grid grid-cols-3 gap-2">
            <Field label="Make"><Input value={data.testerMake} onChange={(e) => update('testerMake', e.target.value)} className={inputCn} /></Field>
            <Field label="Model"><Input value={data.testerModel} onChange={(e) => update('testerModel', e.target.value)} className={inputCn} /></Field>
            <Field label="Serial"><Input value={data.testerSerialNumber} onChange={(e) => update('testerSerialNumber', e.target.value)} className={inputCn} /></Field>
          </div>
          <Sub title="Proving Unit" />
          <div className="grid grid-cols-2 gap-2">
            <Field label="Make"><Input value={data.provingUnitMake} onChange={(e) => update('provingUnitMake', e.target.value)} className={inputCn} /></Field>
            <Field label="Model"><Input value={data.provingUnitModel} onChange={(e) => update('provingUnitModel', e.target.value)} className={inputCn} /></Field>
          </div>
        </section>

        {/* Sign-Off */}
        <section className="space-y-3">
          <SectionHeader title="Sign-Off" />
          <Field label="Name"><Input value={data.personName} onChange={(e) => update('personName', e.target.value)} className={inputCn} /></Field>
          <SignatureInput label="Signature" value={data.personSignature} onChange={(sig) => update('personSignature', sig || '')} />
          <Field label="Notes"><Textarea value={data.notes} onChange={(e) => update('notes', e.target.value)} className={textareaCn} /></Field>
        </section>

        {/* Actions */}
        <div className="space-y-2 pt-2">
          <button onClick={handleSave} disabled={!allStepsComplete || isSaving}
            className="w-full h-11 rounded-lg text-xs font-semibold touch-manipulation active:scale-[0.98] bg-elec-yellow/20 border border-elec-yellow/40 text-elec-yellow disabled:opacity-50">
            {isSaving ? 'Saving...' : existingReportId ? 'Update Record' : 'Save Record'}
          </button>
          <button onClick={handleSaveDraft}
            className="w-full h-11 rounded-lg text-xs font-medium touch-manipulation active:scale-[0.98] border border-white/[0.12] text-white hover:bg-white/[0.06]">
            Save Draft
          </button>
        </div>
      </main>
    </div>
  );
}
