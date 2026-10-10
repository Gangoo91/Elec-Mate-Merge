/**
 * Quality & Compliance Hub (College Hub redesign, 7 Oct 2026).
 *
 *   header (one sentence with the counts, the first job as the primary)
 *   → needs you + staff checks bar → start something → safeguarding & IQA
 *   → inspection → records
 *
 * 8 Oct 2026: the four figure tiles and the readiness panel went (they
 * repeated the sentence and Compliance docs); the first job became the
 * page's one primary action.
 *
 * Built from the College Hub kit (CollegeUi). Every figure is live:
 * open safeguarding concerns (designated leads only; the hook returns
 * nothing for anyone else), IQA verdicts awaiting a decision (the same count
 * the tutor home shows) and the single central record states (the same
 * figures Compliance docs shows).
 */
import { useNavigate } from 'react-router-dom';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useSafeguardingQueue } from '@/hooks/useSafeguardingQueue';
import { useCollegeCan } from '@/hooks/useCollegeCan';
import { useTutorToday } from '@/hooks/useTutorToday';
import { useComplianceStats } from '@/hooks/useComplianceStats';
import { useSafeguardingRouting } from '@/components/college/quality/useSafeguardingRouting';
import { SCR_LEGEND, scrCounts, scrSegments } from '@/components/college/quality/complianceStatus';
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { CollegeSectionTitle } from '@/components/college/ui/CollegeUi';
import { SegmentBar } from '@/components/college/quality/QualityKit';
import {
  LinkGroup,
  QBTN_PRIMARY,
  QPanel,
  QualityHeader,
  QualityScreen,
  QuickActions,
  WorkRows,
  type WorkRow,
} from '@/components/college/quality/QualityHubKit';
import { cap, joinAnd, plural } from '@/components/college/quality/qualityText';

interface QualityComplianceHubProps {
  onNavigate: (section: CollegeSection) => void;
}

const HELP: PageHelpContent = {
  id: 'college-quality-hub',
  title: 'Quality and compliance',
  what: 'Everything that keeps the college safe and inspection-ready in one place: safeguarding, internal quality assurance (IQA), staff checks, policies, and the documents an inspector or auditor will ask for.',
  steps: [
    {
      title: 'Start with Needs you',
      body: 'Everything waiting on someone, most urgent first. Orange means it needs doing; tap a row to go straight to it.',
    },
    {
      title: 'Keep the cycle moving',
      body: 'Sample work for IQA, rehearse an inspection, draft the self-assessment or update the improvement plan from Start something.',
    },
    {
      title: 'Keep the paper trail',
      body: 'Staff checks, policies, reports and the audit log are under Records, ready to print or download.',
    },
  ],
  notes: [
    {
      title: 'Safeguarding',
      body: 'Designated safeguarding leads and their deputies see and act on concerns. If the college has no lead with an account, admins and heads of department are told instead and can see and act on them until a lead is set. Everyone else sees who the leads are and how to raise one.',
    },
    {
      title: 'Staff checks',
      body: 'In date, expiring within 60 days, awaiting verification, expired, or missing, from the single central record. The same states and colours are used in Compliance docs and the audit pack.',
    },
  ],
  legend: SCR_LEGEND,
};

export function QualityComplianceHub({ onNavigate }: QualityComplianceHubProps) {
  const navigate = useNavigate();
  const { isDsl, openCount: safeguardingOpen, openConcerns } = useSafeguardingQueue();
  // ELE-1898: the audit log reads college_activity, which only quality roles
  // (college_can 'quality.view') can read in full; anyone else saw only
  // their own lines under a heading that promised everything.
  const { can } = useCollegeCan();
  const { data: today } = useTutorToday();
  const { stats: rawCompliance, loading: complianceLoading } = useComplianceStats();
  // Shared definition (complianceStatus): awaiting verification is the
  // remainder, so the states add up to the total.
  const compliance = scrCounts(rawCompliance);
  const { data: routing } = useSafeguardingRouting();
  // The alarm fires only when a concern would alert nobody at all: no lead
  // with an account AND no admin / head of department to fall back to.
  const noLead = !!routing && routing.nobodyAlerted;
  // No lead set, but admins / heads of department are told instead.
  const fallbackOnly = !!routing && routing.fallbackActive && !routing.nobodyAlerted;

  const iqaAwaiting = today?.counts.iqa_awaiting ?? 0;
  const complianceProblems = compliance.problems;
  const inDatePct = compliance.inDatePct;
  const unacknowledged = openConcerns.filter((c) => !c.isAcknowledged).length;

  /* The sentence under the title carries the counts (no figure tiles). */
  const bits: string[] = [];
  if (isDsl && safeguardingOpen > 0)
    bits.push(
      `${plural(safeguardingOpen, 'open safeguarding concern')}${unacknowledged > 0 ? ` (${unacknowledged} not acknowledged)` : ''}`
    );
  if (!complianceLoading) {
    if (compliance.expired > 0)
      bits.push(plural(compliance.expired, 'staff check expired', 'staff checks expired'));
    if (compliance.missing > 0) bits.push(`${compliance.missing} not on file`);
    if (compliance.expiring > 0) bits.push(`${compliance.expiring} expiring within 60 days`);
  }
  if (iqaAwaiting > 0) bits.push(plural(iqaAwaiting, 'IQA verdict', 'IQA verdicts') + ' waiting');
  const summary = complianceLoading
    ? 'Reading your records…'
    : bits.length === 0
      ? 'Nothing needs you right now. Staff checks are in date and no IQA verdicts are waiting.'
      : `${cap(joinAnd(bits))}.`;

  /* The page's one primary action follows the first job. */
  const primary =
    noLead || (fallbackOnly && !isDsl)
      ? { label: 'Set a safeguarding lead', go: () => onNavigate('compliancedocs') }
      : isDsl && unacknowledged > 0
        ? { label: 'Open the safeguarding queue', go: () => onNavigate('safeguardingqueue') }
        : compliance.expired > 0 || compliance.missing > 0
          ? { label: 'Fix staff checks', go: () => onNavigate('compliancedocs') }
          : { label: 'Sample work', go: () => navigate('/college/iqa') };

  const needs: WorkRow[] = [];
  if (noLead)
    needs.push({
      id: 'nolead',
      title: 'No one would be told about a safeguarding concern',
      sub: 'There is no designated lead, admin or head of department with an account.',
      trailing: 'Set a lead',
      warn: true,
      onClick: () => onNavigate('compliancedocs'),
    });
  if (isDsl && safeguardingOpen > 0)
    needs.push({
      id: 'sg',
      title: plural(safeguardingOpen, 'open safeguarding concern'),
      sub:
        unacknowledged > 0
          ? `${unacknowledged} not acknowledged yet. Acknowledge first, then act.`
          : 'All acknowledged. Record actions and close when done.',
      trailing: unacknowledged > 0 ? 'Act now' : 'Open',
      warn: unacknowledged > 0,
      onClick: () => onNavigate('safeguardingqueue'),
    });
  if (compliance.expired > 0)
    needs.push({
      id: 'exp',
      title: plural(compliance.expired, 'staff check has expired', 'staff checks have expired'),
      sub: 'Not valid today. An inspector will ask for these first.',
      trailing: 'Renew',
      warn: true,
      onClick: () => onNavigate('compliancedocs'),
    });
  if (compliance.missing > 0)
    needs.push({
      id: 'miss',
      title: plural(
        compliance.missing,
        'staff check is not on file',
        'staff checks are not on file'
      ),
      sub:
        compliance.pending_verification > 0
          ? `${compliance.pending_verification} more uploaded and waiting to be verified.`
          : 'Never uploaded to the single central record.',
      trailing: 'Upload',
      warn: true,
      onClick: () => onNavigate('compliancedocs'),
    });
  if (compliance.expiring > 0)
    needs.push({
      id: 'soon',
      title:
        plural(compliance.expiring, 'staff check expires', 'staff checks expire') +
        ' within 60 days',
      sub: 'Renew before the date passes.',
      trailing: 'Plan renewal',
      onClick: () => onNavigate('compliancedocs'),
    });
  if (iqaAwaiting > 0)
    needs.push({
      id: 'iqa',
      title: plural(iqaAwaiting, 'IQA sample is', 'IQA samples are') + ' waiting for a verdict',
      sub: 'Agree, disagree or return each one on its sampling plan.',
      trailing: 'Give verdicts',
      warn: true,
      onClick: () => navigate('/college/iqa'),
    });

  return (
    <QualityScreen>
      <QualityHeader
        eyebrow="Quality & compliance"
        title="Quality and compliance"
        summary={summary}
        sub="Safeguarding, IQA, staff checks and the evidence an inspector will ask for, kept live in one place."
        help={HELP}
        primary={
          <button type="button" onClick={primary.go} className={QBTN_PRIMARY}>
            {primary.label}
          </button>
        }
      />

      <div className="grid grid-cols-1 items-start gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:gap-6">
        <section className="space-y-4">
          <CollegeSectionTitle
            title="Needs you"
            sub={
              needs.length === 0
                ? 'Nothing waiting.'
                : `${plural(needs.length, 'thing')} to sort, most urgent first`
            }
          />
          {needs.length > 0 ? (
            <WorkRows rows={needs} />
          ) : (
            <QPanel>
              <p className="text-[14px] text-white">
                Nothing urgent. Keep sampling, and rehearse an inspection before the next one is
                due.
              </p>
            </QPanel>
          )}
        </section>
        <section className="space-y-4">
          <CollegeSectionTitle title="Staff checks" sub="The single central record, by state" />
          <QPanel>
            <SegmentBar
              emptyText="No staff checks on file yet. Add staff in Compliance docs."
              segments={scrSegments(compliance, () => onNavigate('compliancedocs'))}
            />
            <p className="mt-2 text-[13px] text-white">
              {compliance.total > 0
                ? `${compliance.valid} of ${compliance.total} checks in date${inDatePct != null ? ` (${inDatePct}%)` : ''}.`
                : 'Nothing on file yet.'}
            </p>
          </QPanel>
        </section>
      </div>

      <section className="space-y-4">
        <CollegeSectionTitle title="Start something" />
        <QuickActions
          items={[
            {
              title: 'Sample work',
              body:
                iqaAwaiting > 0
                  ? `${plural(iqaAwaiting, 'verdict')} due`
                  : 'IQA sampling and verdicts',
              onClick: () => navigate('/college/iqa'),
            },
            {
              title: 'Rehearse an inspection',
              body: 'Mate plays the inspector',
              onClick: () => navigate('/college/compliance/rehearsal'),
            },
            {
              title: 'Draft the SAR',
              body: 'Self-assessment report',
              onClick: () => navigate('/college/compliance/sar'),
            },
            {
              title: 'Update the QIP',
              body: 'Actions, owners and due dates',
              onClick: () => navigate('/college/compliance/qip'),
            },
          ]}
        />
      </section>

      <LinkGroup
        title="Safeguarding and IQA"
        items={[
          {
            title: 'Safeguarding',
            status: isDsl
              ? safeguardingOpen > 0
                ? `${safeguardingOpen} open`
                : 'Nothing open'
              : noLead
                ? 'No lead set'
                : undefined,
            body: isDsl
              ? 'Every concern logged at your college, in one place.'
              : 'Who your designated leads are and how to raise a concern.',
            warn: (isDsl && unacknowledged > 0) || noLead,
            onClick: () => onNavigate('safeguardingqueue'),
          },
          {
            title: 'IQA dashboard',
            status: iqaAwaiting > 0 ? `${plural(iqaAwaiting, 'verdict')} due` : undefined,
            body: 'Sampling plans, findings, standardisation and coverage.',
            warn: iqaAwaiting > 0,
            onClick: () => navigate('/college/iqa'),
          },
          {
            title: 'IQA workflow',
            body: 'Findings, standardisation prep and assessor agreement.',
            onClick: () => onNavigate('iqaworkflow'),
          },
          {
            title: 'IQA off-the-job audit',
            body: 'Check off-the-job hours an assessor has already verified.',
            onClick: () => onNavigate('iqaotjaudit'),
          },
        ]}
      />

      <LinkGroup
        title="Inspection readiness"
        items={[
          {
            title: 'Ofsted lens',
            body: 'Your evidence against the areas Ofsted inspects, live.',
            onClick: () => navigate('/college/compliance/ofsted'),
          },
          {
            title: 'Quality dashboard',
            body: 'Quality figures against target, learners at risk and the evidence behind them.',
            onClick: () => onNavigate('qualitydashboard'),
          },
          {
            title: 'Funding evidence pack',
            body: 'Every apprentice’s funding evidence, live from the record, with what is missing and who it affects.',
            onClick: () => navigate('/college/evidence-pack'),
          },
          {
            title: 'Audit pack',
            body: 'Staff checks, policies and sign-offs, ready to print.',
            onClick: () => navigate('/college/compliance/pack'),
          },
          {
            title: 'Lesson observations',
            body: 'Peer, head of department, IQA and learning-walk observations for every tutor.',
            onClick: () => onNavigate('tutorobs'),
          },
          {
            title: 'Compliance overview',
            body: 'The SAR, QIP, rehearsal and audit pack together.',
            onClick: () => navigate('/college/compliance'),
          },
        ]}
      />

      <LinkGroup
        title="Records"
        items={[
          {
            title: 'Reports',
            body: 'Off-the-job, attendance, progress, EPA and coverage exports.',
            onClick: () => navigate('/college/reports'),
          },
          {
            title: 'Staff records and policies',
            status:
              complianceProblems > 0
                ? `${complianceProblems} expired or missing`
                : compliance.expiring > 0
                  ? `${compliance.expiring} expiring soon`
                  : compliance.total > 0
                    ? 'All in date'
                    : undefined,
            body: 'DBS, right to work, references, declarations and the policies staff sign.',
            warn: complianceProblems > 0,
            onClick: () => onNavigate('compliancedocs'),
          },
          ...(can('quality.view')
            ? [
                {
                  title: 'Audit log',
                  body: 'Permanent record of every sensitive action, built for audits.',
                  onClick: () => onNavigate('auditlog'),
                },
              ]
            : []),
        ]}
      />
    </QualityScreen>
  );
}
