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

  if (loading || !survey || alreadySubmitted) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl border border-elec-yellow/30 bg-elec-yellow/[0.06] p-5"
    >
      <div className="text-[10px] font-medium uppercase tracking-[0.22em] text-elec-yellow">
        Your voice · anonymous
      </div>
      <h3 className="mt-2 text-lg font-semibold text-white">
        {survey.title}
      </h3>
      <p className="mt-2 text-sm text-white/70 leading-relaxed">
        2-minute anonymous check-in for {survey.iso_month}. Your college sees aggregated themes
        only — never who said what. Closes {new Date(survey.close_at).toLocaleDateString('en-GB')}.
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
