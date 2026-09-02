import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
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
      <section className={cn('rounded-2xl border border-elec-yellow/35 p-5', CARD_SURFACE)}>
        <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
          Your voice · anonymous
        </div>
        <p className="mt-2 text-[13px] leading-relaxed text-white">
          {alreadySubmitted
            ? 'Thanks — this month’s check-in is in. Your college sees aggregated themes only, never who said what.'
            : 'No check-in open right now. When your college opens one it appears here, and it takes about two minutes.'}
        </p>
      </section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn('rounded-2xl border border-elec-yellow/35 p-5', CARD_SURFACE)}
    >
      <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
        Your voice · anonymous
      </div>
      <h3 className="mt-2 text-lg font-semibold text-white">{survey.title}</h3>
      <p className="mt-2 text-sm text-white leading-relaxed">
        2-minute anonymous check-in for {survey.iso_month}. Your college sees aggregated themes only
        — never who said what. Closes {new Date(survey.close_at).toLocaleDateString('en-GB')}.
      </p>
      <div className="mt-4">
        <button
          type="button"
          onClick={() => navigate('/apprentice/voice-survey')}
          className="inline-flex items-center h-11 px-4 rounded-full bg-elec-yellow text-black font-semibold touch-manipulation"
        >
          Open survey →
        </button>
      </div>
    </motion.section>
  );
}
