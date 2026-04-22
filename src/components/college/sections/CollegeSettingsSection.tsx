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
  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Resources · College Settings"
          title="Institution configuration"
          description="Manage your institution-wide settings, preferences and policies."
          tone="indigo"
          actions={<Pill tone="yellow">Coming soon</Pill>}
        />
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader eyebrow="Planned Features" title="What's coming" />
        <ListCard>
          {upcomingFeatures.map((feature) => (
            <div
              key={feature.title}
              className="flex items-center gap-4 px-5 sm:px-6 py-5"
            >
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-medium uppercase tracking-[0.16em] text-white/40">
                  {feature.eyebrow}
                </div>
                <div className="mt-1 text-[15px] font-medium text-white">{feature.title}</div>
                <div className="mt-0.5 text-[12px] text-white/50">{feature.description}</div>
              </div>
              <Pill tone="yellow">Soon</Pill>
            </div>
          ))}
        </ListCard>
      </motion.section>
    </PageFrame>
  );
}
