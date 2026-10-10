import { LC_FRAME, lcChip } from '@/components/apprentice-hub/college-hub/learnerUi';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useApprenticeVoiceSurvey } from '@/hooks/useApprenticeVoiceSurvey';

/* ==========================================================================
   MyVoiceSurveyCard — apprentice-side entry point to the monthly voice
   survey. Shows when a survey is open and they haven't yet submitted.
   ELE-936 (L1).
   ========================================================================== */

export function MyVoiceSurveyCard() {
  const { survey, alreadySubmitted, loading } = useApprenticeVoiceSurvey();
  const navigate = useNavigate();

  if (loading) return null;

  /*
   * Rendering NOTHING when no survey is open left the "Surveys & reflection"
   * section showing one card above half a screen of empty space — it read as
   * a page that had failed to load rather than one with nothing outstanding.
   * Say which it is.
   */
  if (!survey || alreadySubmitted) {
    return (
      <section className={cn(LC_FRAME, 'p-4 sm:p-5')}>
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-[15px] font-semibold tracking-tight text-white">Monthly check-in</h3>
          <span className={lcChip()}>Anonymous</span>
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-white">
          {alreadySubmitted
            ? 'Thanks, this month’s check-in is in. Your college sees themes across everyone, never who said what.'
            : 'No check-in open right now. When your college opens one it appears here, and it takes about two minutes.'}
        </p>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(LC_FRAME, 'p-4 sm:p-5')}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-[13px] font-semibold text-white">Monthly check-in</span>
        <span className={lcChip()}>Anonymous</span>
      </div>
      <h3 className="mt-2 text-lg font-semibold text-white">{survey.title}</h3>
      <p className="mt-2 text-sm text-white leading-relaxed">
        A two-minute anonymous check-in for {survey.iso_month}. Your college sees themes across
        everyone, never who said what. Closes{' '}
        {new Date(survey.close_at).toLocaleDateString('en-GB')}.
      </p>
      <div className="mt-4">
        <button
          type="button"
          onClick={() => navigate('/apprentice/voice-survey')}
          className="inline-flex h-11 items-center rounded-xl bg-elec-yellow px-4 text-[13.5px] font-semibold text-black transition-opacity touch-manipulation hover:opacity-90"
        >
          Open the check-in
        </button>
      </div>
    </motion.section>
  );
}
