import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PageFrame,
  PageHero,
  ListCard,
  SectionHeader,
  Pill,
  itemVariants,
} from '@/components/college/primitives';

const upcomingFeatures = [
  {
    eyebrow: 'Institution',
    title: 'Institution details',
    description: 'Name, address, Ofsted number and contact info.',
  },
  {
    eyebrow: 'Notifications',
    title: 'Notification preferences',
    description: 'Email, push and in-app alert settings per role.',
  },
  {
    eyebrow: 'Calendar',
    title: 'Academic year settings',
    description: 'Term dates, holiday periods and assessment windows.',
  },
  {
    eyebrow: 'Security',
    title: 'Security & access policies',
    description: 'Two-factor auth, session timeouts and role permissions.',
  },
];

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
            className="group w-full flex items-center gap-4 px-5 sm:px-6 py-5 text-left hover:bg-[hsl(0_0%_15%)] transition-colors touch-manipulation"
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
        </ListCard>
      </motion.section>

      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader eyebrow="Planned Features" title="What's coming" />
        <ListCard>
          {upcomingFeatures.map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-4 px-5 sm:px-6 py-5"
            >
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white">
                  {feature.eyebrow}
                </div>
                <div className="mt-1 text-[15px] font-medium text-white">{feature.title}</div>
                <div className="mt-0.5 text-[12px] text-white">{feature.description}</div>
              </div>
              <Pill tone="yellow">Soon</Pill>
            </div>
          ))}
        </ListCard>
      </motion.section>
    </PageFrame>
  );
}
