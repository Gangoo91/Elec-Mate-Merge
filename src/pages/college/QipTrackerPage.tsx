import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import {
  useQipActions,
  type QipAction,
  type QipPriority,
  type QipStatus,
  type QipJudgement,
} from '@/hooks/useQipActions';
import { useToast } from '@/hooks/use-toast';
import {
  PageFrame,
  PageHero,
  Pill,
  PrimaryButton,
  SecondaryButton,
  itemVariants,
  toneDot,
  type Tone,
} from '@/components/college/primitives';
import { cn } from '@/lib/utils';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/* ==========================================================================
   QipTrackerPage — /college/compliance/qip
   ELE-923 (G3). Quality Improvement Plan actions board, scoped to college.
   ========================================================================== */

const STATUS_COLS: Array<{ key: QipStatus; label: string; tone: Tone }> = [
  { key: 'planned', label: 'Planned', tone: 'blue' },
  { key: 'in_progress', label: 'In progress', tone: 'amber' },
  { key: 'blocked', label: 'Blocked', tone: 'red' },
  { key: 'completed', label: 'Completed', tone: 'emerald' },
];

const PRIORITY_TONE: Record<QipPriority, Tone> = {
  urgent: 'red',
  high: 'orange',
  medium: 'amber',
  low: 'blue',
};

const JUDGEMENT_LABEL: Record<QipJudgement, string> = {
  quality_of_education: 'Quality of Education',
  behaviour_and_attitudes: 'Behaviour & Attitudes',
  personal_development: 'Personal Development',
  leadership_and_management: 'Leadership & Management',
  apprenticeships: 'Apprenticeships',
  cross_cutting: 'Cross-cutting',
};

export default function QipTrackerPage() {
  useSEO({
    title: 'Quality Improvement Plan — College Hub',
    description: 'Track quality improvement actions for your college.',
    noindex: true,
  });

  const { actions, loading, error, create, update, remove } = useQipActions();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [showNew, setShowNew] = useState(false);
  const [draft, setDraft] = useState<{
    title: string;
    description: string;
    judgement_key: QipJudgement;
    priority: QipPriority;
    target_date: string;
  }>({
    title: '',
    description: '',
    judgement_key: 'quality_of_education',
    priority: 'medium',
    target_date: '',
  });

  const grouped = useMemo(() => {
    const buckets: Record<QipStatus, QipAction[]> = {
      planned: [],
      in_progress: [],
      blocked: [],
      completed: [],
      cancelled: [],
    };
    for (const a of actions) buckets[a.status].push(a);
    return buckets;
  }, [actions]);

  const handleCreate = async () => {
    if (!draft.title.trim()) {
      toast({ title: 'Title required', variant: 'destructive' });
      return;
    }
    try {
      await create({
        title: draft.title.trim(),
        description: draft.description.trim() || undefined,
        judgement_key: draft.judgement_key,
        priority: draft.priority,
        target_date: draft.target_date || null,
      });
      setShowNew(false);
      setDraft({
        title: '',
        description: '',
        judgement_key: 'quality_of_education',
        priority: 'medium',
        target_date: '',
      });
      toast({ title: 'Action added' });
    } catch (e) {
      toast({
        title: 'Could not add action',
        description: e instanceof Error ? e.message : String(e),
        variant: 'destructive',
      });
    }
  };

  const cycleStatus = (a: QipAction) => {
    const order: QipStatus[] = ['planned', 'in_progress', 'completed', 'blocked'];
    const idx = order.indexOf(a.status);
    const next = order[(idx + 1) % order.length];
    return update(a.id, { status: next });
  };

  return (
    <PageFrame>
      <PageHero
        eyebrow="Compliance"
        title="Quality Improvement Plan"
        description="Track actions flowing out of SAR findings, inspections and IQA outcomes."
        actions={
          <div className="flex gap-2">
            <SecondaryButton onClick={() => navigate('/college/compliance/sar')}>
              ← SAR
            </SecondaryButton>
            <PrimaryButton onClick={() => setShowNew(true)}>+ New action</PrimaryButton>
          </div>
        }
      />

      {loading && <div className="px-4 pb-12 text-sm text-white/60">Loading QIP…</div>}

      {error && (
        <div className="mx-4 mb-6 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {!loading && (
        <div className="px-4 pb-16">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STATUS_COLS.map((col) => (
              <motion.section
                key={col.key}
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                className="rounded-2xl border border-white/10 bg-white/5 p-4"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className={cn('h-1.5 w-1.5 rounded-full', toneDot[col.tone])} />
                  <h2 className="text-sm font-semibold text-white">{col.label}</h2>
                  <span className="ml-auto text-xs text-white/70">
                    {grouped[col.key].length}
                  </span>
                </div>

                {grouped[col.key].length === 0 ? (
                  <div className="rounded-lg border border-dashed border-white/10 px-3 py-6 text-center text-xs text-white/70">
                    None
                  </div>
                ) : (
                  <ul className="space-y-2">
                    {grouped[col.key].map((a) => (
                      <li
                        key={a.id}
                        className="rounded-xl border border-white/10 bg-black/20 p-3"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1">
                            <div className="text-sm font-medium text-white">{a.title}</div>
                            <div className="mt-1 flex flex-wrap gap-1.5">
                              <Pill tone={PRIORITY_TONE[a.priority]}>{a.priority}</Pill>
                              <Pill tone="blue">{JUDGEMENT_LABEL[a.judgement_key]}</Pill>
                              {a.target_date && (
                                <span className="rounded-full border border-white/10 px-2 py-0.5 text-[11px] text-white/60">
                                  by {new Date(a.target_date).toLocaleDateString('en-GB')}
                                </span>
                              )}
                            </div>
                            {a.description && (
                              <p className="mt-2 text-xs text-white/70">{a.description}</p>
                            )}
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <button
                            type="button"
                            onClick={() => cycleStatus(a)}
                            className="rounded-md border border-white/15 px-2 py-1 text-[11px] text-white/80 hover:bg-white/5 touch-manipulation"
                          >
                            Advance
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete "${a.title}"?`)) void remove(a.id);
                            }}
                            className="rounded-md border border-red-500/30 px-2 py-1 text-[11px] text-red-300 hover:bg-red-500/10 touch-manipulation"
                          >
                            Delete
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.section>
            ))}
          </div>
        </div>
      )}

      <Dialog open={showNew} onOpenChange={setShowNew}>
        <DialogContent className="bg-elec-gray border-white/10 text-white">
          <DialogHeader>
            <DialogTitle>New QIP action</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50">Title</label>
              <Input
                value={draft.title}
                onChange={(e) => setDraft((d) => ({ ...d, title: e.target.value }))}
                placeholder="e.g. Lift OTJ verification turnaround under 5 days"
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500 focus:ring-yellow-500"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50">Description</label>
              <Textarea
                value={draft.description}
                onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
                placeholder="What needs to happen and why."
                className="touch-manipulation text-base border-white/30 focus:border-yellow-500"
                rows={3}
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <label className="text-xs uppercase tracking-wider text-white/50">Judgement</label>
                <Select
                  value={draft.judgement_key}
                  onValueChange={(v) =>
                    setDraft((d) => ({ ...d, judgement_key: v as QipJudgement }))
                  }
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-white/10 text-white">
                    {Object.entries(JUDGEMENT_LABEL).map(([key, label]) => (
                      <SelectItem key={key} value={key}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-xs uppercase tracking-wider text-white/50">Priority</label>
                <Select
                  value={draft.priority}
                  onValueChange={(v) =>
                    setDraft((d) => ({ ...d, priority: v as QipPriority }))
                  }
                >
                  <SelectTrigger className="h-11 touch-manipulation bg-elec-gray border-white/30">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="bg-elec-gray border-white/10 text-white">
                    <SelectItem value="urgent">Urgent</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-white/50">Target date</label>
              <Input
                type="date"
                value={draft.target_date}
                onChange={(e) => setDraft((d) => ({ ...d, target_date: e.target.value }))}
                className="h-11 text-base touch-manipulation border-white/30 focus:border-yellow-500"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <SecondaryButton onClick={() => setShowNew(false)}>Cancel</SecondaryButton>
              <PrimaryButton onClick={handleCreate}>Add</PrimaryButton>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </PageFrame>
  );
}
