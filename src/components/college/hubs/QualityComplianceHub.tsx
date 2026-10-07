/**
 * Quality & Compliance Hub (College Hub redesign, 7 Oct 2026).
 *
 *   header + "?" → four live figures → readiness at a glance (chart)
 *   → start something → safeguarding & IQA → inspection → records
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
import { CollegePageHeader, CollegeSectionTitle, CollegeStats } from '@/components/college/ui/CollegeUi';
import { AreaHero } from '@/components/college/student360/Student360AreaHeroes';
import { SegmentBar } from '@/components/college/quality/QualityKit';
import { LinkGroup, QualityScreen, QuickActions } from '@/components/college/quality/QualityHubKit';

interface QualityComplianceHubProps {
  onNavigate: (section: CollegeSection) => void;
}

const HELP: PageHelpContent = {
  id: 'college-quality-hub',
  title: 'Quality and compliance',
  what: 'Everything that keeps the college safe and inspection-ready in one place: safeguarding, internal quality assurance (IQA), staff checks, policies, and the documents an inspector or auditor will ask for.',
  steps: [
    { title: 'Check the figures', body: 'The four figures at the top are live. Orange means something needs doing; tap a figure to go straight to it.' },
    { title: 'Start with what is due', body: 'Sample work for IQA, close evidence gaps, or update the improvement plan from Start something.' },
    { title: 'Keep the paper trail', body: 'Staff checks, policies, reports and the audit log are under Records, ready to print or download.' },
  ],
  notes: [
    {
      title: 'Safeguarding',
      body: 'Designated safeguarding leads and their deputies see and act on concerns. If the college has no lead with an account, admins and heads of department are told instead and can see and act on them until a lead is set. Everyone else sees who the leads are and how to raise one.',
    },
    { title: 'Staff checks', body: 'In date, expiring within 60 days, awaiting verification, expired, or missing, from the single central record. The same states and colours are used in Compliance docs and the audit pack.' },
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

  const firstJob = noLead
    ? 'No one would be told about a safeguarding concern: there is no designated lead, admin or head of department with an account. Set a lead in Compliance docs.'
    : fallbackOnly && !isDsl
      ? 'No designated safeguarding lead is set. Concerns go to admins and heads of department until one is. Set a lead in Compliance docs.'
    : isDsl && unacknowledged > 0
      ? `${unacknowledged} safeguarding ${unacknowledged === 1 ? 'concern has' : 'concerns have'} not been acknowledged. Open the queue first.`
      : compliance.expired > 0
        ? `${compliance.expired} staff ${compliance.expired === 1 ? 'check has' : 'checks have'} expired. Renew them before anything else; an inspector will ask.`
        : compliance.missing > 0
          ? `${compliance.missing} staff ${compliance.missing === 1 ? 'check is' : 'checks are'} not on file. Upload them in Compliance docs.`
          : iqaAwaiting > 0
            ? `${iqaAwaiting} IQA ${iqaAwaiting === 1 ? 'verdict is' : 'verdicts are'} waiting. Sample and decide them on the IQA dashboard.`
            : 'Nothing urgent. Keep sampling, and rehearse an inspection before the next one is due.';

  return (
    <QualityScreen>
      <CollegePageHeader
        eyebrow="Quality & compliance"
        title="Quality and compliance"
        description="Safeguarding, IQA, staff checks and the evidence an inspector will ask for, kept live in one place."
        help={HELP}
      />

      <CollegeStats
        items={[
          isDsl
            ? {
                label: 'Safeguarding',
                value: String(safeguardingOpen),
                sub: unacknowledged > 0 ? `${unacknowledged} not acknowledged` : safeguardingOpen > 0 ? 'open concerns' : 'nothing open',
                warn: unacknowledged > 0,
                onClick: () => onNavigate('safeguardingqueue'),
              }
            : noLead
              ? { label: 'Safeguarding', value: 'No lead', sub: 'a concern would alert no one', warn: true, onClick: () => onNavigate('safeguardingqueue') }
              : fallbackOnly
                ? { label: 'Safeguarding', value: 'No DSL', sub: 'admins and heads of department are told', onClick: () => onNavigate('safeguardingqueue') }
                : { label: 'Safeguarding', value: 'Leads', sub: 'who to tell, and how', onClick: () => onNavigate('safeguardingqueue') },
          {
            label: 'IQA verdicts due',
            value: String(iqaAwaiting),
            sub: iqaAwaiting > 0 ? 'samples waiting' : 'nothing waiting',
            warn: iqaAwaiting > 0,
            onClick: () => navigate('/college/iqa'),
          },
          {
            label: 'Staff checks in date',
            value: complianceLoading ? '…' : inDatePct == null ? 'None' : `${inDatePct}%`,
            sub: compliance.total > 0 ? `${compliance.valid} of ${compliance.total} checks` : 'nothing on file yet',
            good: inDatePct != null && inDatePct >= 95,
            onClick: () => onNavigate('compliancedocs'),
          },
          {
            label: 'Expired or missing',
            value: complianceLoading ? '…' : String(complianceProblems),
            sub: compliance.expiring > 0 ? `${compliance.expiring} more expiring soon` : 'staff checks',
            warn: complianceProblems > 0,
            onClick: () => onNavigate('compliancedocs'),
          },
        ]}
      />

      <section className="space-y-4">
        <CollegeSectionTitle title="Readiness at a glance" sub="Staff checks from the single central record, and the first thing to do." />
        <AreaHero
          figures={[
            { label: 'In date', value: String(compliance.valid), good: compliance.valid > 0 && complianceProblems === 0 },
            { label: 'Expiring soon', value: String(compliance.expiring), warn: compliance.expiring > 0, sub: 'within 60 days' },
            { label: 'Expired', value: String(compliance.expired), warn: compliance.expired > 0 },
            { label: 'Missing', value: String(compliance.missing), warn: compliance.missing > 0, sub: compliance.pending_verification > 0 ? `not on file · ${compliance.pending_verification} awaiting verification` : 'not on file' },
          ]}
          chartTitle="Staff checks by state"
          chart={
            <SegmentBar
              emptyText="No staff checks on file yet. Add staff in Compliance docs."
              segments={scrSegments(compliance, () => onNavigate('compliancedocs'))}
            />
          }
          side={
            <div>
              <p className="text-[13px] font-semibold text-white">Do this first</p>
              <p className="mt-1.5 text-[13.5px] leading-relaxed text-white">{firstJob}</p>
            </div>
          }
        />
      </section>

      <section className="space-y-4">
        <CollegeSectionTitle title="Start something" />
        <QuickActions
          items={[
            {
              title: 'Sample work',
              body: iqaAwaiting > 0 ? `${iqaAwaiting} verdict${iqaAwaiting === 1 ? '' : 's'} due` : 'IQA sampling and verdicts',
              onClick: () => navigate('/college/iqa'),
              primary: true,
            },
            { title: 'Close evidence gaps', body: 'The funding evidence pack, live', onClick: () => navigate('/college/evidence-pack') },
            { title: 'Rehearse an inspection', body: 'Mate plays the inspector', onClick: () => navigate('/college/compliance/rehearsal') },
            { title: 'Draft the SAR', body: 'Self-assessment report', onClick: () => navigate('/college/compliance/sar') },
            { title: 'Update the QIP', body: 'Actions, owners and due dates', onClick: () => navigate('/college/compliance/qip') },
          ]}
        />
      </section>

      <LinkGroup
        title="Safeguarding and IQA"
        items={[
          {
            title: 'Safeguarding',
            figure: isDsl && safeguardingOpen > 0 ? String(safeguardingOpen) : undefined,
            body: isDsl
              ? safeguardingOpen > 0
                ? 'open concerns'
                : 'No open concerns. Every concern logged at your college, in one place.'
              : 'Who your designated leads are and how to raise a concern.',
            warn: (isDsl && unacknowledged > 0) || noLead,
            onClick: () => onNavigate('safeguardingqueue'),
          },
          {
            title: 'IQA dashboard',
            figure: iqaAwaiting > 0 ? String(iqaAwaiting) : undefined,
            body: iqaAwaiting > 0 ? 'verdicts due' : 'Sampling plans, findings, standardisation and coverage.',
            warn: iqaAwaiting > 0,
            onClick: () => navigate('/college/iqa'),
          },
          { title: 'IQA workflow', body: 'Findings, standardisation prep and assessor agreement.', onClick: () => onNavigate('iqaworkflow') },
          { title: 'IQA off-the-job audit', body: 'Sample and audit off-the-job verification decisions.', onClick: () => onNavigate('iqaotjaudit') },
        ]}
      />

      <LinkGroup
        title="Inspection readiness"
        items={[
          { title: 'Ofsted lens', body: 'Your figures set against what inspectors look at, rated live.', onClick: () => navigate('/college/compliance/ofsted') },
          { title: 'Quality dashboard', body: 'Quality figures, learners at risk and the evidence behind them.', onClick: () => onNavigate('qualitydashboard') },
          {
            title: 'Funding evidence pack',
            body: 'Every apprentice’s funding evidence, live from the record, with what is missing and who it affects.',
            onClick: () => navigate('/college/evidence-pack'),
          },
          { title: 'Audit pack', body: 'Staff checks, policies and sign-offs, ready to print.', onClick: () => navigate('/college/compliance/pack') },
          { title: 'Lesson observations', body: 'Peer, head of department, IQA and learning-walk observations for every tutor.', onClick: () => onNavigate('tutorobs') },
          { title: 'Compliance overview', body: 'The SAR, QIP, rehearsal and audit pack together.', onClick: () => navigate('/college/compliance') },
        ]}
      />

      <LinkGroup
        title="Records"
        items={[
          { title: 'Reports', body: 'Off-the-job, attendance, progress, EPA and coverage exports.', onClick: () => navigate('/college/reports') },
          {
            title: 'Compliance docs',
            figure:
              complianceProblems > 0
                ? String(complianceProblems)
                : compliance.expiring > 0
                  ? String(compliance.expiring)
                  : compliance.total > 0
                    ? String(compliance.total)
                    : undefined,
            body:
              complianceProblems > 0
                ? 'expired or missing'
                : compliance.expiring > 0
                  ? 'expiring soon'
                  : compliance.total > 0
                    ? 'records on file'
                    : 'Policies, DBS checks and staff documentation.',
            warn: complianceProblems > 0,
            onClick: () => onNavigate('compliancedocs'),
          },
          ...(can('quality.view')
            ? [{ title: 'Audit log', body: 'Permanent record of every sensitive action, built for audits.', onClick: () => onNavigate('auditlog') }]
            : []),
        ]}
      />
    </QualityScreen>
  );
}
