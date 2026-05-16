import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import ProfessionalSkillsTab from '@/components/apprentice/communication-skills/ProfessionalSkillsTab';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PageFrame,
  PageHero,
  itemVariants,
} from '@/components/college/primitives';

const ProfessionalSkillsPage = () => {
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
          title="Professional Skills"
          tone="yellow"
        />
      </motion.div>

      {/* Intro Card */}
      <div className="rounded-xl border border-white/[0.06] bg-[hsl(0_0%_10%)] p-4 sm:p-5 space-y-4">
          <h2 className="text-lg font-semibold text-white">
            Building Professional Communication
          </h2>
          <p className="text-white text-sm leading-relaxed">
            Professional communication goes beyond just talking. It includes
            active listening, body language, written communication, and knowing
            how to express yourself clearly. These skills set top electricians
            apart and are essential for career progression.
          </p>

          <div className="rounded-md border border-elec-yellow/20 bg-elec-yellow/[0.04] p-3 sm:p-4 space-y-2">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow/85">
              Core Skills Covered
            </span>
            <ul className="space-y-1.5">
              {[
                'Active listening — hear what is actually being said',
                'Clear speaking — get your point across effectively',
                'Body language — non-verbal communication matters',
                'Written communication — emails, reports, and site notes',
                'Professional language — choosing the right words',
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
        </div>

      {/* Main Content */}
      <ProfessionalSkillsTab />
    </PageFrame>
  );
};

export default ProfessionalSkillsPage;
