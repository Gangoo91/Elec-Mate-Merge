import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  buttonPrimaryCn,
  buttonSecondaryCn,
  chipBase,
  chipOff,
  chipOnQuiet as chipOn,
  inputCn,
  labelCn,
  textareaCn,
} from '@/components/forms/fieldStyles';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { getMyCollegeId } from '@/lib/myCollege';
import { logCollegeAction } from '@/services/college/collegeActivityService';

/* ==========================================================================
   MockGradingSheet — tutor-recorded EPA mock.

   The apprentice-side simulator writes to `epa_mock_sessions` via auth.uid()
   = user_id. When a tutor sits with a learner for a face-to-face mock
   (portfolio walkthrough, practical observation, a timed AM2 section or a
   knowledge review), they record it here. There is no professional
   discussion in the ST0152 EPA (src/lib/epa/facts.ts), so it isn't offered. We stamp `recorded_by_tutor_id`
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
    description:
      'Walked the learner through their portfolio. Reviewed evidence quality + KSB coverage.',
  },
  {
    value: 'am2_section',
    label: 'Timed AM2 section',
    description:
      'A tutor-run AM2 section on a real rig: inspection and testing, safe isolation or fault diagnosis.',
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

const GRADES: { value: string; label: string }[] = [
  { value: 'distinction', label: 'Distinction' },
  { value: 'merit', label: 'Merit' },
  { value: 'pass', label: 'Pass' },
  { value: 'fail', label: 'Fail / not yet' },
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
        const collegeId = await getMyCollegeId(tutorId).catch(() => null);
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
        description: `${studentName.split(' ')[0]}: ${grade} on ${sessionType.replace(/_/g, ' ')}.`,
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
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Tutor-led mock"
      title={`Record mock for ${studentName.split(' ')[0]}`}
      description="Capture a face-to-face mock you ran with this learner. It sits alongside the AI simulator runs, but is stamped as tutor-recorded so the difference is clear."
      bodyClassName="grid grid-cols-1 items-start gap-x-10 gap-y-5 lg:grid-cols-2"
      footer={
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            disabled={saving}
            className={buttonSecondaryCn}
          >
            Cancel
          </button>
          <button type="button" onClick={handleSave} disabled={saving} className={buttonPrimaryCn}>
            {saving ? 'Saving…' : 'Save mock'}
          </button>
        </div>
      }
    >
      <div className="space-y-5">
        <div>
          <p className={labelCn}>Session type</p>
          <div className="mt-1 grid gap-2 sm:grid-cols-2">
            {SESSION_TYPES.map((s) => (
              <button
                key={s.value}
                type="button"
                aria-pressed={sessionType === s.value}
                onClick={() => setSessionType(s.value)}
                className={cn(
                  'rounded-xl border px-3.5 py-3 text-left transition-colors touch-manipulation',
                  sessionType === s.value
                    ? 'border-elec-yellow bg-white/[0.06]'
                    : 'border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.06]'
                )}
              >
                <div className="text-[13.5px] font-semibold text-white">{s.label}</div>
                <div className="mt-0.5 text-[12px] leading-snug text-white">{s.description}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <p className={labelCn}>Predicted grade</p>
          <div className="mt-1 grid grid-cols-2 gap-2 sm:grid-cols-4">
            {GRADES.map((g) => (
              <button
                key={g.value}
                type="button"
                aria-pressed={grade === g.value}
                onClick={() => setGrade(g.value)}
                className={cn(chipBase, grade === g.value ? chipOn : chipOff)}
              >
                {g.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-3 gap-y-4 sm:grid-cols-4 sm:gap-x-6">
          <ScoreInput
            id="mock-overall"
            label="Overall"
            value={overallScore}
            onChange={setOverallScore}
          />
          <ScoreInput
            id="mock-knowledge"
            label="Knowledge"
            value={knowledgeScore}
            onChange={setKnowledgeScore}
          />
          <ScoreInput
            id="mock-skills"
            label="Skills"
            value={skillsScore}
            onChange={setSkillsScore}
          />
          <ScoreInput
            id="mock-behaviours"
            label="Behaviours"
            value={behavioursScore}
            onChange={setBehavioursScore}
          />
        </div>
        <p className="-mt-2 text-[12px] text-white">Scores are out of 100 and all optional.</p>
      </div>

      <div className="space-y-5">
        <div>
          <label className={labelCn} htmlFor="mock-feedback">
            Feedback
          </label>
          <textarea
            id="mock-feedback"
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            rows={6}
            placeholder="What did the learner do well? Where did they slip? Be specific so they can act on it."
            className={textareaCn}
          />
        </div>

        <div>
          <label className={labelCn} htmlFor="mock-improvements">
            Improvement actions (optional, one per line)
          </label>
          <textarea
            id="mock-improvements"
            value={improvements}
            onChange={(e) => setImprovements(e.target.value)}
            rows={4}
            placeholder={'e.g.\nPractise reg 411.3.3 worked examples\nRevisit BS 7671 chapter 41'}
            className={textareaCn}
          />
        </div>
      </div>
    </FormSheet>
  );
}

function ScoreInput({
  id,
  label,
  value,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className={labelCn} htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type="number"
        inputMode="numeric"
        min={0}
        max={100}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="0–100"
        className={cn(inputCn, 'tabular-nums')}
      />
    </div>
  );
}
