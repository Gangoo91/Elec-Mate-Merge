import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PageFrame,
  PageHero,
  ListCard,
  SectionHeader,
  itemVariants,
} from '@/components/college/primitives';

export function CollegeSettingsSection() {
  const navigate = useNavigate();
  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Resources · College Settings"
          title="Institution configuration"
          description="Manage your institution-wide settings, preferences and policies."
          tone="indigo"
        />
      </motion.div>

      {/* Live settings */}
      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader eyebrow="Live" title="Available now" />
        <ListCard>
          <button
            type="button"
            onClick={() => navigate('/college/settings/curriculum')}
            className="group w-full flex items-center gap-4 px-5 sm:px-6 py-5 text-left hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation border-b border-white/[0.06]"
          >
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white">
                Curriculum
              </div>
              <div className="mt-1 text-[15px] font-medium text-white">
                Lesson plan settings
              </div>
              <div className="mt-0.5 text-[12px] text-white">
                British Values · Stretch & challenge · Inclusive practice · Safeguarding
                context for the AI.
              </div>
            </div>
            <span className="text-[13px] font-medium text-elec-yellow/90 group-hover:text-elec-yellow shrink-0">
              Open →
            </span>
          </button>
          <button
            type="button"
            onClick={() => navigate('/college/settings/operational')}
            className="group w-full flex items-center gap-4 px-5 sm:px-6 py-5 text-left hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
          >
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white">
                Operational
              </div>
              <div className="mt-1 text-[15px] font-medium text-white">
                Quality thresholds
              </div>
              <div className="mt-0.5 text-[12px] text-white">
                IQA sampling rate · Audit window · Attendance bands · EPA verdict scoring.
              </div>
            </div>
            <span className="text-[13px] font-medium text-elec-yellow/90 group-hover:text-elec-yellow shrink-0">
              Open →
            </span>
          </button>
        </ListCard>
      </motion.section>
    </PageFrame>
  );
}
