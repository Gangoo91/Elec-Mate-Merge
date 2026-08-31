import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
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

/*
 * Page styling comes from the shared kit. These were local copies that had
 * drifted from every other Notices & Labels page — see components/forms/pageStyles.
 */
import { pageCardCn as sectionCn, pageInputCn as inputCn, pageTextareaCn as textareaCn } from '@/components/forms/pageStyles';

import { PageHeader } from '@/components/forms/PageHeader';

const SectionHeader = ({ title }: { title: string }) => (
  <h2 className="text-[15px] font-semibold tracking-tight text-white">{title}</h2>
);

const Sub = ({ title }: { title: string }) => (
  <p className="text-[13px] font-semibold text-white pt-1">{title}</p>
);

const Field = ({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) => (
  <div><Label className="text-[12px] font-medium text-white mb-1 block">{label}{required && ' *'}</Label>{children}</div>
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await reportCloud.updateReport(existingReportId, user.id, data as any);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
      <PageHeader
        eyebrow="GS 38"
        title="Safe Isolation"
        actions={
            <button onClick={handleSaveDraft} className="h-11 text-[13px] font-semibold text-white transition-opacity hover:opacity-80 touch-manipulation">Save draft</button>
        }
      />


      <main className="px-4 py-4 pb-28 sm:pb-8 lg:px-8">
        <div className="mx-auto max-w-3xl lg:max-w-none xl:max-w-[1700px] space-y-4 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-4">
          {/* Details */}
          <section className={sectionCn}>
            <SectionHeader title="Details" />
            <Field label="Reference"><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></Field>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Date"><Input type="date" value={data.date} onChange={(e) => update('date', e.target.value)} className={inputCn} /></Field>
              <Field label="Time"><Input type="time" value={data.time} onChange={(e) => update('time', e.target.value)} className={inputCn} /></Field>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Circuit Ref"><Input value={data.circuitReference} onChange={(e) => update('circuitReference', e.target.value)} className={inputCn} placeholder="Circuit 5" /></Field>
              <Field label="Location"><Input value={data.location} onChange={(e) => update('location', e.target.value)} className={inputCn} placeholder="Plant room" /></Field>
            </div>
            <Field label="Equipment"><Input value={data.equipmentDescription} onChange={(e) => update('equipmentDescription', e.target.value)} className={inputCn} placeholder="Distribution board DB3" /></Field>
          </section>

          {/* Isolation steps */}
          <section className={cn(sectionCn, 'lg:col-span-2')}>
            <div className="flex items-center justify-between gap-3">
              <SectionHeader title="Isolation steps (GS 38)" />
              <span className={cn('text-[12px] font-semibold', allStepsComplete ? 'text-green-400' : 'text-white/85')}>
                {completedSteps}/{isolationSteps.length}
              </span>
            </div>
            <div className="divide-y divide-white/[0.06]">
              {isolationSteps.map((step, index) => (
                <div key={index} className="flex items-center justify-between gap-3 py-2.5">
                  <p className="flex-1 min-w-0 text-[13px] leading-snug text-white">
                    <span className="font-semibold text-white">{index + 1}.</span> {step}
                  </p>
                  <div className="flex gap-1.5 shrink-0">
                    <button type="button" onClick={() => { if (!data.steps[index]) toggleStep(index); }}
                      className={cn('h-11 w-12 rounded-lg text-[13px] touch-manipulation transition-all',
                        data.steps[index] ? 'bg-elec-yellow border border-elec-yellow text-black font-semibold' : 'bg-white/[0.06] border border-white/[0.1] text-white font-medium')}>
                      Yes
                    </button>
                    <button type="button" onClick={() => { if (data.steps[index]) toggleStep(index); }}
                      className={cn('h-11 w-12 rounded-lg text-[13px] touch-manipulation transition-all',
                        !data.steps[index] ? 'bg-red-500 border border-red-500 text-white font-semibold' : 'bg-white/[0.06] border border-white/[0.1] text-white font-medium')}>
                      No
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Test instruments */}
          <section className={sectionCn}>
            <SectionHeader title="Test instruments" />
            <Sub title="Voltage tester" />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <Field label="Make"><Input value={data.testerMake} onChange={(e) => update('testerMake', e.target.value)} className={inputCn} /></Field>
              <Field label="Model"><Input value={data.testerModel} onChange={(e) => update('testerModel', e.target.value)} className={inputCn} /></Field>
              <Field label="Serial"><Input value={data.testerSerialNumber} onChange={(e) => update('testerSerialNumber', e.target.value)} className={inputCn} /></Field>
            </div>
            <Sub title="Proving unit" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <Field label="Make"><Input value={data.provingUnitMake} onChange={(e) => update('provingUnitMake', e.target.value)} className={inputCn} /></Field>
              <Field label="Model"><Input value={data.provingUnitModel} onChange={(e) => update('provingUnitModel', e.target.value)} className={inputCn} /></Field>
            </div>
          </section>

          {/* Sign-off */}
          <section className={cn(sectionCn, 'lg:col-span-2')}>
            <SectionHeader title="Sign-off" />
            <Field label="Name"><Input value={data.personName} onChange={(e) => update('personName', e.target.value)} className={inputCn} /></Field>
            <SignatureInput label="Signature" value={data.personSignature} onChange={(sig) => update('personSignature', sig || '')} />
            <Field label="Notes"><Textarea value={data.notes} onChange={(e) => update('notes', e.target.value)} className={textareaCn} /></Field>
          </section>

          {/* Actions */}
          <div className="flex flex-col gap-2 pt-2 lg:col-span-2 lg:flex-row-reverse lg:items-center lg:justify-start">
            <button onClick={handleSave} disabled={!allStepsComplete || isSaving}
              className="h-12 w-full rounded-xl bg-elec-yellow text-[15px] font-semibold text-black hover:bg-elec-yellow/90 active:scale-[0.99] touch-manipulation disabled:bg-white/[0.08] disabled:text-white/70 lg:w-auto lg:px-10">
              {isSaving ? (
                <span className="inline-flex items-center justify-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Saving…</span>
              ) : existingReportId ? 'Update Record' : 'Save Record'}
            </button>
            <button onClick={handleSaveDraft}
              className="h-12 w-full rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white hover:bg-white/[0.08] touch-manipulation lg:w-auto lg:px-8">
              Save Draft
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
