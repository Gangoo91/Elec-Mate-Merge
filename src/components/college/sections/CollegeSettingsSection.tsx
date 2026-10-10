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
import { CollegePageHeader, CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import { ChevronRight } from 'lucide-react';
import { PEOPLE_CARD, TOP_LINE } from '@/components/college/people/peopleKit';
import { cn } from '@/lib/utils';
import { StaffNotificationPrefsCard } from '@/components/college/settings/StaffNotificationPrefsCard';
import { SecurityAccessCard } from '@/components/college/settings/SecurityAccessCard';
import { ProviderTypeCard } from '@/components/college/settings/ProviderTypeCard';
import { TeamsNotificationsCard } from '@/components/college/settings/TeamsNotificationsCard';

const HELP: PageHelpContent = {
  id: 'college-settings',
  title: 'College settings',
  what: 'Where your college sets the rules the rest of the hub uses: attendance targets, how much IQA samples, what the lesson planner should always include, and your VLE connection.',
  steps: [
    {
      title: 'Quality thresholds',
      body: 'The attendance target that flags a learner, the IQA sampling rate, how far back inspection signals look, EPA verdicts and the risk flags. Changes reach every screen within a second.',
    },
    {
      title: 'Lesson plan settings',
      body: 'British values, stretch and challenge, inclusion and safeguarding context that every generated lesson plan includes.',
    },
    {
      title: 'VLE integration',
      body: 'Connect Canvas, Moodle or Blackboard so learners launch Elec-Mate from your VLE.',
    },
    {
      title: 'Microsoft Teams',
      body: 'A college admin or head of department pastes a Teams Workflows webhook link. New tutor inbox items then post to that channel, held overnight, each with a link back into the hub.',
    },
    {
      title: 'Your notifications',
      body: 'Choose which pushes reach your phone: marking, hours, messages, reviews. Each one opens the exact item. Anything you switch off still appears in the bell. Safeguarding always comes through.',
    },
  ],
  notes: [
    {
      title: 'Who can change these',
      body: 'Everyone at your college can read them. Any staff member can change lesson plan settings; only a college admin or head of department can change the quality thresholds and risk flags. Each change is saved for the whole college. Your notifications are the exception: they are yours alone.',
    },
  ],
};

/**
 * A settings destination. A compact row on a phone (title, then the line
 * under it, no gap); the kit's same-height card from sm: up.
 */
function SettingsLink({
  title,
  body,
  onClick,
}: {
  title: string;
  body?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(PEOPLE_CARD, 'min-h-0 p-4 active:bg-white/[0.06] sm:min-h-[112px] sm:p-5')}
    >
      <span aria-hidden className={TOP_LINE} />
      <span className="flex w-full items-start justify-between gap-3">
        <span className="text-[15px] font-semibold leading-snug text-white">{title}</span>
        <ChevronRight
          className="mt-0.5 h-4 w-4 shrink-0 text-white transition-transform group-hover:translate-x-0.5 group-hover:text-elec-yellow"
          aria-hidden
        />
      </span>
      {body && (
        <span className="mt-1 block text-[13px] leading-snug text-white sm:mt-auto sm:pt-2 sm:text-[12.5px]">
          {body}
        </span>
      )}
    </button>
  );
}

export function CollegeSettingsSection() {
  const navigate = useNavigate();
  const { settings, isLoading } = useCollegeSettings();

  const value = (label: string, v: string) => (
    <div className="min-w-0">
      <dd className="text-[24px] font-bold leading-none tabular-nums text-white">
        {isLoading ? '…' : v}
      </dd>
      <dt className="mt-1.5 text-[12.5px] leading-snug text-white">{label}</dt>
    </div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8 sm:space-y-10"
    >
      <CollegePageHeader
        eyebrow="College"
        title="Settings"
        description="The rules the rest of the hub runs on, and how your college is set up."
        help={HELP}
      />

      <section className="space-y-3">
        <CollegeSectionTitle title="Rules the hub uses" sub="Saved for the whole college." />
        {/* Thresholds take two of three columns, so the seven links fill three even rows on desktop. */}
        <div className="grid items-stretch gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <motion.button
            variants={itemVariants}
            type="button"
            onClick={() => navigate('/college/settings/operational')}
            className={cn(PEOPLE_CARD, 'p-4 sm:col-span-2 sm:p-5')}
          >
            <span aria-hidden className={TOP_LINE} />
            <span className="flex items-start justify-between gap-3">
              <span>
                <span className="block text-[15px] font-semibold text-white">
                  Quality thresholds
                </span>
                <span className="mt-1 block text-[13px] leading-snug text-white">
                  When attendance shows orange, how much IQA samples, the inspection window, EPA
                  verdicts and the risk flags.
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
          <SettingsLink
            title="Lesson plan settings"
            body="British values, stretch and challenge, inclusion and safeguarding context for every generated plan."
            onClick={() => navigate('/college/settings/curriculum')}
          />
          <SettingsLink
            title="VLE integration"
            body="Connect Canvas, Moodle or Blackboard over LTI 1.3."
            onClick={() => navigate('/college?section=ltisettings')}
          />
          <SettingsLink
            title="Data and API"
            body="Export to your MIS as CSV or JSON, ILR fields on every learner, and read-only API keys."
            onClick={() => navigate('/college/settings/data')}
          />
          <SettingsLink
            title="MIS sync"
            body="Map your ebs, ProSolution or UNIT-e export once and re-run it to keep references, ULNs and dates in step."
            onClick={() => navigate('/college/settings/mis')}
          />
          <SettingsLink
            title="Apprenticeship units"
            body="Short units (ILR programme type 34) with their own criteria, hours and completion, without reviews or gateway."
            onClick={() => navigate('/college/units')}
          />
          <SettingsLink
            title="Security and procurement"
            body="Security and data processing, a DPIA template, sub-processors and the accessibility statement, ready for your IT and DPO."
            onClick={() => navigate('/college/trust')}
          />
          <SettingsLink
            title="Bring evidence across"
            body="Import learners' evidence from another e-portfolio's export, checked by the learner first."
            onClick={() => navigate('/college/import')}
          />
        </div>
      </section>

      <section className="space-y-3" id="notifications">
        <CollegeSectionTitle
          title="Your notifications"
          sub="Just for you. What the hub pushes to your phone; everything still reaches the bell."
        />
        <StaffNotificationPrefsCard />
      </section>

      {/* ELE-2056 */}
      <section className="space-y-3" id="teams">
        <CollegeSectionTitle
          title="Microsoft Teams"
          sub="For the whole college. New inbox items posted to one Teams channel, each linking back here."
        />
        <TeamsNotificationsCard />
      </section>

      {/* ELE-1915 / ELE-1966 / ELE-1971 */}
      <section className="space-y-3" id="security">
        <CollegeSectionTitle
          title="Security and access"
          sub="Two-step sign-in for staff, Elec-Mate support access, and Sign in with Microsoft."
        />
        <SecurityAccessCard />
      </section>

      <section className="space-y-3" id="provider">
        <CollegeSectionTitle
          title="Your organisation"
          sub="What kind of provider you are, and how Elec-Mate charges you."
        />
        <ProviderTypeCard />
      </section>

      <section className="space-y-3">
        <CollegeSectionTitle title="How your college is set up" />
        {/* Ten links: one column on a phone, then two rows of five on desktop. */}
        <div className="grid grid-cols-1 items-stretch gap-3 sm:grid-cols-2 xl:grid-cols-5">
          <SettingsLink
            title="Learners and billing"
            body="Learners counted once a year, the cohorts your agreement covers, invoices and renewal."
            onClick={() => navigate('/college/billing')}
          />
          <SettingsLink
            title="Course setup"
            body="The courses you run and the off-the-job hours each needs."
            onClick={() => navigate('/college?section=coursesetup')}
          />
          <SettingsLink
            title="Cohorts"
            body="Class groups, their tutors and places."
            onClick={() => navigate('/college?section=cohorts')}
          />
          <SettingsLink
            title="Tutors"
            body="The teaching team and their qualifications."
            onClick={() => navigate('/college?section=tutors')}
          />
          <SettingsLink
            title="Support staff"
            body="Assessors, IQA and admin."
            onClick={() => navigate('/college?section=supportstaff')}
          />
          <SettingsLink
            title="Employers"
            body="Who your apprentices work for and how they are doing."
            onClick={() => navigate('/college?section=employerportal')}
          />
          <SettingsLink
            title="Bulk jobs"
            body="Grades, ILP reviews or a message for a whole cohort at once."
            onClick={() => navigate('/college?section=batchoperations')}
          />
          <SettingsLink
            title="Setup checklist"
            body="Every step from college details to the first register, with your join codes."
            onClick={() => navigate('/college/setup')}
          />
          <SettingsLink
            title="Audit log"
            body="Who did what, when, to which record. For admins and quality staff."
            onClick={() => navigate('/college?section=auditlog')}
          />
          <SettingsLink
            title="People"
            body="Learners, staff and employers in one place, starting with who needs you."
            onClick={() => navigate('/college?section=peoplehub')}
          />
        </div>
      </section>
    </motion.div>
  );
}
