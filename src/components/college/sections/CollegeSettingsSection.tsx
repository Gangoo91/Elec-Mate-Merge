/**
 * CollegeSettingsSection — the settings index (College Hub kit, 7 Oct 2026).
 *
 * Grouped cards, each saying what it controls and, where there is one, the
 * value set now: quality thresholds (IQA sampling, audit window, attendance
 * bands), lesson plan settings, the VLE connection, then the college's set-up
 * (courses, cohorts, staff, employers, bulk jobs).
 */
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCollegeSettings } from '@/hooks/college/useCollegeSettings';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import {
  COLLEGE_CARD,
  CollegeLinkCard,
  CollegePageHeader,
  CollegeSectionTitle,
} from '@/components/college/ui/CollegeUi';
import { cn } from '@/lib/utils';
import { StaffNotificationPrefsCard } from '@/components/college/settings/StaffNotificationPrefsCard';

const HELP: PageHelpContent = {
  id: 'college-settings',
  title: 'College settings',
  what: 'Where your college sets the rules the rest of the hub uses: attendance targets, how much IQA samples, what the lesson planner should always include, and your VLE connection.',
  steps: [
    { title: 'Quality thresholds', body: 'The attendance target that flags a learner, the IQA sampling rate and how far back inspection signals look. Changes reach every screen within a second.' },
    { title: 'Lesson plan settings', body: 'British values, stretch and challenge, inclusion and safeguarding context that every generated lesson plan includes.' },
    { title: 'VLE integration', body: 'Connect Canvas, Moodle or Blackboard so learners launch Elec-Mate from your VLE.' },
    { title: 'Your notifications', body: 'Choose which pushes reach your phone: marking, hours, messages, reviews. Each one opens the exact item. Anything you switch off still appears in the bell. Safeguarding always comes through.' },
  ],
  notes: [
    { title: 'Who can change these', body: 'Any staff member at your college can. Each change is saved for the whole college, not just you. Your notifications are the exception: they are yours alone.' },
  ],
};

export function CollegeSettingsSection() {
  const navigate = useNavigate();
  const { settings, isLoading } = useCollegeSettings();

  const value = (label: string, v: string) => (
    <div className="min-w-0">
      <dd className="text-[24px] font-bold leading-none tabular-nums text-white">{isLoading ? '…' : v}</dd>
      <dt className="mt-1.5 text-[12.5px] leading-snug text-white">{label}</dt>
    </div>
  );

  return (
    <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8 sm:space-y-10">
      <CollegePageHeader
        eyebrow="College"
        title="Settings"
        description="The rules the rest of the hub runs on, and how your college is set up."
        help={HELP}
      />

      <section className="space-y-3">
        <CollegeSectionTitle title="Rules the hub uses" sub="Saved for the whole college." />
        <div className="grid items-stretch gap-3 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <motion.button
            variants={itemVariants}
            type="button"
            onClick={() => navigate('/college/settings/operational')}
            className={cn(COLLEGE_CARD, 'group h-full w-[calc(100%+2rem)] text-left transition-colors touch-manipulation hover:border-white/[0.2] sm:w-full')}
          >
            <span className="flex items-start justify-between gap-3">
              <span>
                <span className="block text-[15px] font-semibold text-white">Quality thresholds</span>
                <span className="mt-1 block text-[13px] leading-snug text-white">
                  When a learner is flagged for attendance, how much IQA samples, and the inspection window.
                </span>
              </span>
              <span className="text-[13px] font-semibold text-elec-yellow">Change</span>
            </span>
            <dl className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {value('attendance flagged below', `${settings.low_attendance_threshold_percent}%`)}
              {value('attendance good from', `${settings.high_attendance_threshold_percent}%`)}
              {value('IQA sampling target', `${settings.iqa_sampling_target_percent}%`)}
              {value('inspection window', `${settings.audit_window_days} days`)}
            </dl>
          </motion.button>
          <div className="grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-1">
            <CollegeLinkCard
              title="Lesson plan settings"
              body="British values, stretch and challenge, inclusion and safeguarding context for every generated plan."
              onClick={() => navigate('/college/settings/curriculum')}
            />
            <CollegeLinkCard
              title="VLE integration"
              body="Connect Canvas, Moodle or Blackboard over LTI 1.3."
              onClick={() => navigate('/college?section=ltisettings')}
            />
          </div>
        </div>
      </section>

      <section className="space-y-3" id="notifications">
        <CollegeSectionTitle
          title="Your notifications"
          sub="Just for you. What the hub pushes to your phone; everything still reaches the bell."
        />
        <StaffNotificationPrefsCard />
      </section>

      <section className="space-y-3">
        <CollegeSectionTitle title="How your college is set up" />
        <div className="grid grid-cols-2 items-stretch gap-3 xl:grid-cols-3">
          <CollegeLinkCard title="Course setup" body="The courses you run and the off-the-job hours each needs." onClick={() => navigate('/college?section=coursesetup')} />
          <CollegeLinkCard title="Cohorts" body="Class groups, their tutors and places." onClick={() => navigate('/college?section=cohorts')} />
          <CollegeLinkCard title="Tutors" body="The teaching team and their qualifications." onClick={() => navigate('/college?section=tutors')} />
          <CollegeLinkCard title="Support staff" body="Assessors, IQA and admin." onClick={() => navigate('/college?section=supportstaff')} />
          <CollegeLinkCard title="Employers" body="Who your apprentices work for and how they are doing." onClick={() => navigate('/college?section=employerportal')} />
          <CollegeLinkCard title="Bulk jobs" body="Grades, ILP reviews or a message for a whole cohort at once." onClick={() => navigate('/college?section=batchoperations')} />
        </div>
      </section>
    </motion.div>
  );
}
