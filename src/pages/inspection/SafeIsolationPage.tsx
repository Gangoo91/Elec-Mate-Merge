import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import SignatureInput from '@/components/signature/SignatureInput';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { storageGetJSONSync, storageSetJSONSync, storageRemoveSync } from '@/utils/storage';
import { reportCloud } from '@/utils/reportCloud';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.25 } },
};

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
      const { data: profile } = await supabase.from('profiles').select('full_name').eq('id', user.id).single();
      if (profile && !data.personName) {
        setData((prev) => ({ ...prev, personName: prev.personName || profile.full_name || '' }));
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

  const inputCn = "h-11 text-base touch-manipulation bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500";

  return (
    <div className="-mt-3 sm:-mt-4 md:-mt-6 bg-background pb-24">
      <div className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-white/[0.06]">
        <div className="px-4 py-2">
          <div className="flex items-center gap-3 h-11">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-white hover:text-white hover:bg-white/10 rounded-xl h-11 w-11 touch-manipulation active:scale-[0.98]">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex items-center gap-2.5">
              <div className="p-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Zap className="h-4 w-4 text-emerald-400" />
              </div>
              <h1 className="text-base font-semibold text-white">Safe Isolation</h1>
            </div>
          </div>
        </div>
      </div>

      <motion.main variants={containerVariants} initial="hidden" animate="visible" className="px-4 py-4 space-y-5 max-w-2xl mx-auto">
        <motion.div variants={itemVariants} className="rounded-2xl bg-emerald-500/8 border border-emerald-500/20 p-4">
          <p className="text-sm font-semibold text-emerald-400">Safe Isolation Procedure — GS 38</p>
          <p className="text-xs text-white mt-1">Step-by-step record confirming the safe isolation procedure was followed before commencing work on electrical equipment.</p>
        </motion.div>

        {/* Details */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Details</h2>
          <div className="grid grid-cols-3 gap-3">
            <div><Label className="text-white text-xs">Reference</Label><Input value={data.referenceNumber} onChange={(e) => update('referenceNumber', e.target.value)} className={inputCn} /></div>
            <div><Label className="text-white text-xs">Date</Label><Input type="date" value={data.date} onChange={(e) => update('date', e.target.value)} className={inputCn} /></div>
            <div><Label className="text-white text-xs">Time</Label><Input type="time" value={data.time} onChange={(e) => update('time', e.target.value)} className={inputCn} /></div>
          </div>
          <div><Label className="text-white text-xs">Location</Label><Input value={data.location} onChange={(e) => update('location', e.target.value)} className={inputCn} placeholder="e.g. Plant room, Floor 2" /></div>
          <div><Label className="text-white text-xs">Equipment Description</Label><Input value={data.equipmentDescription} onChange={(e) => update('equipmentDescription', e.target.value)} className={inputCn} placeholder="e.g. Distribution board DB3" /></div>
          <div><Label className="text-white text-xs">Circuit Reference</Label><Input value={data.circuitReference} onChange={(e) => update('circuitReference', e.target.value)} className={inputCn} placeholder="e.g. Circuit 5 — kitchen ring" /></div>
        </motion.section>

        {/* Checklist */}
        <motion.section variants={itemVariants} className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Isolation Steps</h2>
            <span className={cn(
              'text-[11px] font-semibold px-2.5 py-1 rounded-lg',
              allStepsComplete ? 'bg-emerald-500/15 text-emerald-400' : 'bg-amber-500/15 text-amber-400'
            )}>
              {completedSteps}/{isolationSteps.length}
            </span>
          </div>
          <div className="space-y-2">
            {isolationSteps.map((step, index) => (
              <button
                key={index}
                onClick={() => toggleStep(index)}
                className={cn(
                  'w-full flex items-start gap-3 p-3.5 rounded-xl border text-left touch-manipulation active:scale-[0.98] transition-all',
                  data.steps[index]
                    ? 'bg-emerald-500/8 border-emerald-500/20'
                    : 'bg-white/[0.04] border-white/[0.06]'
                )}
              >
                <div className={cn(
                  'w-6 h-6 rounded-lg border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all',
                  data.steps[index]
                    ? 'bg-emerald-500 border-emerald-500'
                    : 'border-white/30'
                )}>
                  {data.steps[index] && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                <div>
                  <span className="text-[11px] font-bold text-elec-yellow">Step {index + 1}</span>
                  <p className={cn('text-sm text-white mt-0.5', data.steps[index] && 'line-through opacity-70')}>
                    {step}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </motion.section>

        {/* Test Instruments */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Test Instruments</h2>
          <div className="grid grid-cols-3 gap-3">
            <div><Label className="text-white text-xs">Tester Make</Label><Input value={data.testerMake} onChange={(e) => update('testerMake', e.target.value)} className={inputCn} /></div>
            <div><Label className="text-white text-xs">Model</Label><Input value={data.testerModel} onChange={(e) => update('testerModel', e.target.value)} className={inputCn} /></div>
            <div><Label className="text-white text-xs">Serial No.</Label><Input value={data.testerSerialNumber} onChange={(e) => update('testerSerialNumber', e.target.value)} className={inputCn} /></div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label className="text-white text-xs">Proving Unit Make</Label><Input value={data.provingUnitMake} onChange={(e) => update('provingUnitMake', e.target.value)} className={inputCn} /></div>
            <div><Label className="text-white text-xs">Model</Label><Input value={data.provingUnitModel} onChange={(e) => update('provingUnitModel', e.target.value)} className={inputCn} /></div>
          </div>
        </motion.section>

        {/* Sign-off */}
        <motion.section variants={itemVariants} className="space-y-3">
          <h2 className="text-xs font-medium text-white uppercase tracking-wider px-0.5">Sign-Off</h2>
          <div><Label className="text-white text-xs">Person Carrying Out Isolation</Label><Input value={data.personName} onChange={(e) => update('personName', e.target.value)} className={inputCn} /></div>
          <SignatureInput label="Signature" value={data.personSignature} onChange={(sig) => update('personSignature', sig || '')} />
          <div><Label className="text-white text-xs">Notes</Label><Textarea value={data.notes} onChange={(e) => update('notes', e.target.value)} className="touch-manipulation text-base min-h-[80px] bg-white/[0.06] border-white/[0.08] text-white focus:border-yellow-500 focus:ring-yellow-500" /></div>
        </motion.section>

        {/* Actions */}
        <motion.div variants={itemVariants} className="flex gap-3 pt-2">
          <Button variant="outline" className="flex-1 h-12 text-sm font-medium touch-manipulation active:scale-[0.98] border-white/[0.08] text-white hover:bg-white/[0.06]" onClick={() => { storageSetJSONSync(DRAFT_KEY, data); toast.success('Draft saved'); }}>Save Draft</Button>
          <Button className="flex-1 h-12 text-sm font-medium touch-manipulation active:scale-[0.98] bg-emerald-500 text-white hover:bg-emerald-600" onClick={handleSave} disabled={!allStepsComplete || isSaving}>{isSaving ? 'Saving...' : existingReportId ? 'Update Record' : 'Save Record'}</Button>
        </motion.div>
      </motion.main>
    </div>
  );
}
