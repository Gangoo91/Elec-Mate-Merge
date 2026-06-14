import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useSEO from '@/hooks/useSEO';
import {
  useInspectionRehearsal,
  type Grade,
  type RehearsalScenario,
} from '@/hooks/useInspectionRehearsal';
import {
  PageFrame,
  PageHero,
  Pill,
  PrimaryButton,
  SecondaryButton,
  itemVariants,
  type Tone,
} from '@/components/college/primitives';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

/* ==========================================================================
   InspectionRehearsalPage — /college/compliance/rehearsal
   ELE-921 (G1). Chat with Mate-as-inspector.
   ========================================================================== */

const SCENARIO_LABEL: Record<RehearsalScenario, string> = {
  general: 'General inspection',
  quality_of_education: 'Quality of Education',
  behaviour_and_attitudes: 'Behaviour & Attitudes',
  personal_development: 'Personal Development',
  leadership_and_management: 'Leadership & Management',
  apprenticeships: 'Apprenticeships',
  safeguarding: 'Safeguarding',
};

const GRADE_TONE: Record<Grade, Tone> = {
  strong: 'emerald',
  adequate: 'amber',
  insufficient: 'red',
};

const VERDICT_TONE: Record<string, Tone> = {
  outstanding: 'emerald',
  good: 'cyan',
  requires_improvement: 'amber',
  inadequate: 'red',
};

export default function InspectionRehearsalPage() {
  useSEO({
    title: 'Inspection Rehearsal — College Hub',
    description: 'Practise Ofsted questions with Mate as the inspector.',
    noindex: true,
  });

  const { rehearsal, history, busy, error, start, respond, finish } = useInspectionRehearsal();
  const navigate = useNavigate();
  const [scenario, setScenario] = useState<RehearsalScenario>('general');
  const [draft, setDraft] = useState('');
  const scrollerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollerRef.current?.scrollTo({ top: scrollerRef.current.scrollHeight, behavior: 'smooth' });
  }, [rehearsal?.turns?.length]);

  const handleStart = async () => {
    try {
      await start(scenario);
    } catch {
      /* error captured in hook */
    }
  };

  const handleSend = async () => {
    if (!draft.trim()) return;
    const text = draft.trim();
    setDraft('');
    try {
      await respond(text);
    } catch {
      /* error captured in hook */
    }
  };

  return (
    <PageFrame>
      <PageHero
        eyebrow="Compliance"
        title="Inspection Rehearsal"
        description="Practise Ofsted questioning with Mate. Each answer is graded; finish for an overall verdict."
        actions={
          <SecondaryButton onClick={() => navigate('/college/compliance')}>
            Back to Compliance Hub
          </SecondaryButton>
        }
      />

      {error && (
        <div className="mx-4 mb-4 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {error}
        </div>
      )}

      {!rehearsal && (
        <motion.section
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          className="mx-4 my-6 rounded-2xl border border-white/10 bg-white/5 p-6"
        >
          <h2 className="text-lg font-semibold text-white">Start a new rehearsal</h2>
          <p className="mt-2 text-sm text-white/70">
            Pick a focus area. Mate plays the lead inspector and asks evidence-led probing
            questions grounded in your live college signals.
          </p>
          <div className="mt-4 max-w-md">
            <label className="text-xs uppercase tracking-wider text-white/50">Scenario</label>
            <Select value={scenario} onValueChange={(v) => setScenario(v as RehearsalScenario)}>
              <SelectTrigger className="mt-1 h-11 bg-elec-gray border-white/30 touch-manipulation">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-elec-gray border-white/10 text-white">
                {Object.entries(SCENARIO_LABEL).map(([key, label]) => (
                  <SelectItem key={key} value={key}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="mt-5">
            <PrimaryButton onClick={handleStart} disabled={busy}>
              {busy ? 'Briefing inspector…' : 'Start rehearsal'}
            </PrimaryButton>
          </div>

          {history.length > 0 && (
            <div className="mt-8">
              <h3 className="text-xs uppercase tracking-wider text-white/50">Recent rehearsals</h3>
              <ul className="mt-2 divide-y divide-white/5">
                {history.slice(0, 5).map((h) => (
                  <li
                    key={h.id}
                    className="flex items-center justify-between py-2 text-sm text-white/80"
                  >
                    <div>
                      <div>{SCENARIO_LABEL[h.scenario]}</div>
                      <div className="text-xs text-white/70">
                        {new Date(h.created_at).toLocaleString('en-GB')} • {h.status}
                      </div>
                    </div>
                    {h.overall_verdict && (
                      <Pill tone={VERDICT_TONE[h.overall_verdict] || 'blue'}>
                        {h.overall_verdict.replace('_', ' ')}
                      </Pill>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </motion.section>
      )}

      {rehearsal && (
        <div className="px-4 pb-24">
          <motion.div
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            className="rounded-2xl border border-white/10 bg-white/5"
          >
            <div className="border-b border-white/10 px-5 py-3 flex items-center justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider text-white/50">Scenario</div>
                <div className="text-sm font-medium text-white">
                  {SCENARIO_LABEL[rehearsal.scenario]}
                </div>
              </div>
              <Pill tone={rehearsal.status === 'complete' ? 'emerald' : 'amber'}>
                {rehearsal.status}
              </Pill>
            </div>

            <div ref={scrollerRef} className="max-h-[60vh] overflow-y-auto px-5 py-4 space-y-3">
              {rehearsal.turns.map((t, i) => (
                <div
                  key={i}
                  className={cn(
                    'rounded-xl px-4 py-3',
                    t.role === 'inspector'
                      ? 'bg-black/30 border border-white/10'
                      : 'bg-elec-yellow/10 border border-elec-yellow/30'
                  )}
                >
                  <div className="flex items-center gap-2 text-[11px] uppercase tracking-wider text-white/50">
                    {t.role === 'inspector' ? 'Inspector' : 'You'}
                    {t.grade && <Pill tone={GRADE_TONE[t.grade]}>{t.grade}</Pill>}
                  </div>
                  <div className="mt-1.5 text-sm text-white/90 whitespace-pre-line">{t.content}</div>
                  {t.feedback && (
                    <div className="mt-2 rounded-lg bg-black/30 px-3 py-2 text-xs text-white/60">
                      <span className="text-white/70">Inspector feedback:</span> {t.feedback}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {rehearsal.status === 'active' ? (
              <div className="border-t border-white/10 p-4">
                <Textarea
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Type your answer…"
                  rows={3}
                  className="touch-manipulation text-base border-white/30 focus:border-yellow-500"
                />
                <div className="mt-3 flex justify-between">
                  <SecondaryButton onClick={() => finish()}>Finish & get verdict</SecondaryButton>
                  <PrimaryButton onClick={handleSend} disabled={busy || !draft.trim()}>
                    {busy ? 'Sending…' : 'Send answer'}
                  </PrimaryButton>
                </div>
              </div>
            ) : (
              <div className="border-t border-white/10 p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <Pill tone={VERDICT_TONE[rehearsal.overall_verdict ?? ''] || 'blue'}>
                    {rehearsal.overall_verdict?.replace('_', ' ') ?? 'No verdict'}
                  </Pill>
                  <span className="text-sm text-white/80">{rehearsal.verdict_summary}</span>
                </div>
                {rehearsal.strengths && rehearsal.strengths.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-white/50">Strengths</h4>
                    <ul className="mt-1.5 list-disc pl-5 text-sm text-white/80">
                      {rehearsal.strengths.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
                {rehearsal.weaknesses && rehearsal.weaknesses.length > 0 && (
                  <div>
                    <h4 className="text-xs uppercase tracking-wider text-white/50">
                      Weaknesses
                    </h4>
                    <ul className="mt-1.5 list-disc pl-5 text-sm text-white/80">
                      {rehearsal.weaknesses.map((s, i) => (
                        <li key={i}>{s}</li>
                      ))}
                    </ul>
                  </div>
                )}
                <div>
                  <PrimaryButton onClick={() => window.location.reload()}>
                    Start another rehearsal
                  </PrimaryButton>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </PageFrame>
  );
}
