import { useEffect, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Check, ClipboardCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  SheetShell,
  PrimaryButton,
  SecondaryButton,
} from '@/components/college/primitives';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { logCollegeAction } from '@/services/college/collegeActivityService';

/* ==========================================================================
   MockGradingSheet — tutor-recorded EPA mock.

   The apprentice-side simulator writes to `epa_mock_sessions` via auth.uid()
   = user_id. When a tutor sits with a learner for a face-to-face mock
   (portfolio walkthrough, practical observation, professional discussion or
   knowledge review), they record it here. We stamp `recorded_by_tutor_id`
   so the row can be told apart from a learner-driven simulator session.

   Schema reuse: same `epa_mock_sessions` table so the existing rollups
   (mock_discussion_avg, mock_knowledge_avg) pick this up. Tutor's notes go
   into `ai_feedback`; improvement suggestions are a `\n`-separated text
   field stored as a JSONB string array.
   ========================================================================== */

const SESSION_TYPES: { value: string; label: string; description: string }[] = [
  {
    value: 'portfolio_walkthrough',
    label: 'Portfolio walkthrough',
    description: 'Walked the learner through their portfolio. Reviewed evidence quality + KSB coverage.',
  },
  {
    value: 'professional_discussion',
    label: 'Professional discussion',
    description: 'Open-ended discussion mock. Behaviours, reflective practice, scenario reasoning.',
  },
  {
    value: 'practical_observation',
    label: 'Practical observation',
    description: 'Watched the learner perform a live practical task. Skills + safety + competence.',
  },
  {
    value: 'knowledge_review',
    label: 'Knowledge review',
    description: 'Verbal Q&A on theory / regulations. Knowledge gaps + recall under pressure.',
  },
];

const GRADES: { value: string; label: string; tone: string }[] = [
  { value: 'distinction', label: 'Distinction', tone: 'bg-emerald-500/15 border-emerald-400/40 text-emerald-200' },
  { value: 'merit', label: 'Merit', tone: 'bg-amber-500/15 border-amber-400/40 text-amber-200' },
  { value: 'pass', label: 'Pass', tone: 'bg-blue-500/15 border-blue-400/40 text-blue-200' },
  { value: 'fail', label: 'Fail / not yet', tone: 'bg-red-500/15 border-red-400/40 text-red-200' },
];

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Learner's auth.users.id — required to write user_id on the row. */
  userId: string | null;
  /** Display name for the sheet header. */
  studentName: string;
  /** Qualification code — written to the row; helpful for rollups by qual. */
  qualificationCode?: string | null;
  onSaved?: () => void;
}

export function MockGradingSheet({
  open,
  onOpenChange,
  userId,
  studentName,
  qualificationCode,
  onSaved,
}: Props) {
  const { toast } = useToast();
  const [sessionType, setSessionType] = useState<string>('portfolio_walkthrough');
  const [grade, setGrade] = useState<string>('pass');
  const [overallScore, setOverallScore] = useState<string>('');
  const [knowledgeScore, setKnowledgeScore] = useState<string>('');
  const [skillsScore, setSkillsScore] = useState<string>('');
  const [behavioursScore, setBehavioursScore] = useState<string>('');
  const [feedback, setFeedback] = useState('');
  const [improvements, setImprovements] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!open) return;
    setSessionType('portfolio_walkthrough');
    setGrade('pass');
    setOverallScore('');
    setKnowledgeScore('');
    setSkillsScore('');
    setBehavioursScore('');
    setFeedback('');
    setImprovements('');
  }, [open]);

  const parseScore = (s: string): number | null => {
    if (!s.trim()) return null;
    const n = Number(s);
    if (Number.isNaN(n) || n < 0 || n > 100) return null;
    return Math.round(n);
  };

  const handleSave = async () => {
    if (!userId) {
      toast({ title: 'Cannot record', description: 'No learner user_id.', variant: 'destructive' });
      return;
    }
    if (!feedback.trim()) {
      toast({
        title: 'Add feedback',
        description: 'A short feedback note is required so the learner has actionable takeaway.',
        variant: 'destructive',
      });
      return;
    }
    setSaving(true);
    try {
      const { data: userRes } = await supabase.auth.getUser();
      const tutorId = userRes.user?.id;
      if (!tutorId) throw new Error('Not signed in');

      const overall = parseScore(overallScore);
      const knowledge = parseScore(knowledgeScore);
      const skills = parseScore(skillsScore);
      const behaviours = parseScore(behavioursScore);
      const componentScores: Record<string, number> = {};
      if (knowledge !== null) componentScores.knowledge = knowledge;
      if (skills !== null) componentScores.skills = skills;
      if (behaviours !== null) componentScores.behaviours = behaviours;

      const suggestionList = improvements
        .split('\n')
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

      const now = new Date().toISOString();
      const { data: inserted, error } = await supabase
        .from('epa_mock_sessions')
        .insert({
          user_id: userId,
          recorded_by_tutor_id: tutorId,
          qualification_code: qualificationCode ?? '',
          session_type: sessionType,
          status: 'completed',
          overall_score: overall,
          predicted_grade: grade,
          component_scores: Object.keys(componentScores).length > 0 ? componentScores : null,
          ai_feedback: feedback.trim(),
          improvement_suggestions: suggestionList.length > 0 ? suggestionList : null,
          started_at: now,
          completed_at: now,
          time_spent_seconds: 0,
        })
        .select('id')
        .single();
      if (error) throw new Error(error.message || 'Could not save mock');

      // Audit log — fire and forget
      void (async () => {
        const { data: profile } = await supabase
          .from('profiles')
          .select('college_id')
          .eq('id', tutorId)
          .maybeSingle();
        const collegeId = (profile as { college_id?: string | null } | null)?.college_id;
        if (!collegeId || !inserted?.id) return;
        try {
          await logCollegeAction(
            collegeId,
            tutorId,
            'epa_mock_recorded',
            'epa_mock_session',
            inserted.id,
            {
              session_type: sessionType,
              predicted_grade: grade,
              overall_score: overall,
              student_user_id: userId,
            }
          );
        } catch {
          /* audit log failures must not block the user */
        }
      })();

      toast({
        title: 'Mock recorded',
        description: `${studentName.split(' ')[0]} — ${grade} on ${sessionType.replace(/_/g, ' ')}.`,
      });
      onSaved?.();
      onOpenChange(false);
    } catch (e) {
      toast({
        title: 'Could not record mock',
        description: (e as Error).message,
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent hideCloseButton
        side="bottom"
        className="h-[90vh] sm:max-w-2xl sm:mx-auto p-0 rounded-t-2xl overflow-hidden border-white/10"
      >
        <SheetShell
          eyebrow="Tutor-led mock"
          title={`Record mock — ${studentName.split(' ')[0]}`}
          description="Capture a face-to-face mock you ran with this learner. Lives alongside the AI simulator runs, but stamped as tutor-recorded so the difference is clear."
          footer={
            <>
              <SecondaryButton onClick={() => onOpenChange(false)} disabled={saving} fullWidth>
                Cancel
              </SecondaryButton>
              <PrimaryButton onClick={handleSave} disabled={saving} fullWidth>
                <Check className="h-3.5 w-3.5 mr-1.5" strokeWidth={3} />
                {saving ? 'Saving…' : 'Save mock'}
              </PrimaryButton>
            </>
          }
        >
          <div className="rounded-2xl border border-white/[0.06] bg-[hsl(0_0%_12%)] px-5 py-4">
            <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 mb-2 inline-flex items-center gap-1.5">
              <ClipboardCheck className="h-3.5 w-3.5 text-elec-yellow" />
              Session type
            </div>
            <div className="grid gap-2 sm:grid-cols-2">
              {SESSION_TYPES.map((s) => (
                <button
                  key={s.value}
                  type="button"
                  onClick={() => setSessionType(s.value)}
                  className={cn(
                    'text-left rounded-xl border px-3 py-2.5 transition-colors touch-manipulation',
                    sessionType === s.value
                      ? 'bg-elec-yellow/[0.08] border-elec-yellow/40'
                      : 'bg-[hsl(0_0%_10%)] border-white/[0.08] hover:bg-white/[0.04]'
                  )}
                >
                  <div className="text-[12.5px] font-semibold text-white">{s.label}</div>
                  <div className="mt-0.5 text-[11px] text-white/55 leading-snug">{s.description}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>Predicted grade</Label>
            <div className="mt-2 grid grid-cols-2 gap-2">
              {GRADES.map((g) => (
                <button
                  key={g.value}
                  type="button"
                  onClick={() => setGrade(g.value)}
                  className={cn(
                    'h-11 rounded-xl border text-[12.5px] font-semibold tracking-tight transition-colors touch-manipulation',
                    grade === g.value
                      ? g.tone
                      : 'bg-[hsl(0_0%_12%)] border-white/[0.08] text-white/70 hover:bg-white/[0.04]'
                  )}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label>Overall score (0–100, optional)</Label>
            <input
              type="number"
              inputMode="numeric"
              min={0}
              max={100}
              value={overallScore}
              onChange={(e) => setOverallScore(e.target.value)}
              placeholder="e.g. 72"
              className="mt-2 w-full h-11 rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[13px] text-white px-3 touch-manipulation"
            />
          </div>

          <div>
            <Label>Component scores (optional)</Label>
            <div className="mt-2 grid grid-cols-3 gap-2">
              <ScoreInput label="Knowledge" value={knowledgeScore} onChange={setKnowledgeScore} />
              <ScoreInput label="Skills" value={skillsScore} onChange={setSkillsScore} />
              <ScoreInput label="Behaviours" value={behavioursScore} onChange={setBehavioursScore} />
            </div>
          </div>

          <div>
            <Label>Feedback</Label>
            <textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              placeholder="What did the learner do well? Where did they slip? Be specific so they can act on it."
              className="mt-2 w-full rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[13px] text-white p-3 leading-snug touch-manipulation"
            />
          </div>

          <div>
            <Label>Improvement actions (optional, one per line)</Label>
            <textarea
              value={improvements}
              onChange={(e) => setImprovements(e.target.value)}
              rows={3}
              placeholder={'e.g.\nPractise reg 411.3.3 worked examples\nRevisit BS 7671 chapter 41'}
              className="mt-2 w-full rounded-xl bg-[hsl(0_0%_12%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[13px] text-white p-3 leading-snug touch-manipulation"
            />
          </div>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}

function ScoreInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <div className="text-[10px] uppercase tracking-wider text-white/45">{label}</div>
      <input
        type="number"
        inputMode="numeric"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0–100"
        className="mt-1 w-full h-10 rounded-lg bg-[hsl(0_0%_12%)] border border-white/[0.08] focus:border-elec-yellow/40 text-[13px] text-white px-2.5 touch-manipulation tabular-nums"
      />
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">{children}</div>
  );
}
