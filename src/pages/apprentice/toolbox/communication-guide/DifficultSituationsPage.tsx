import { ArrowLeft, CheckCircle, AlertTriangle } from 'lucide-react';
import DifficultSituationsTab from '@/components/apprentice/communication-skills/DifficultSituationsTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const DifficultSituationsPage = () => {
  const navigate = useNavigate();
  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <button onClick={() => navigate('/apprentice/toolbox/communication-skills')} className="inline-flex items-center gap-2 h-11 -ml-2 px-2 rounded-md text-[12px] uppercase tracking-[0.18em] text-white/55 hover:text-white/85 transition-colors touch-manipulation">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Communication"
          title="Difficult Situations"
          tone="yellow"
        />
      </motion.div>

      {/* Intro Card */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Handling Challenging Conversations
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Every electrician will face difficult conversations — disagreements
            with supervisors, unhappy clients, or workplace conflicts. How you
            handle these situations defines your professionalism and can make
            the difference between escalation and resolution.
          </p>

          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 sm:p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              What You Will Learn
            </span>
            <ul className="space-y-1.5">
              {[
                'De-escalation techniques that actually work',
                'How to disagree professionally with your supervisor',
                'Managing client expectations and complaints',
                'Resolving workplace conflicts constructively',
                'Knowing when and how to escalate an issue',
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-[12.5px] text-white/85 leading-relaxed"
                >
                  <CheckCircle2 className="h-3.5 w-3.5 text-elec-yellow/85 flex-shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-white text-xs">
                <strong className="text-red-400">Safety first:</strong> If a
                situation involves safety concerns (e.g. being asked to work
                live), you have the legal right to refuse. See the Your Rights
                section for more detail.
              </p>
            </div>
          </div>
        </div>

      {/* Main Content */}
      <DifficultSituationsTab />
    </PageFrame>
  );
};

export default DifficultSituationsPage;
