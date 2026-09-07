/**
 * Quality & Compliance Hub — safeguarding, IQA, inspection and the paper trail.
 *
 * Rebuilt on the shared hub shell (`@/components/hub/HubPrimitives`). The
 * masthead is drawn by CollegeDashboard; this is only the body:
 *
 *   quick start → safeguarding & IQA → inspection readiness → records
 *
 * What went, and why:
 *
 * The HERO ("Inspection-ready, in one place" and a paragraph about things no
 * longer being scattered) and the numbered, colour-toned cards — red, purple,
 * blue, amber, green, indigo, yellow on one screen. Colour now only encodes
 * state: a volt figure means work outstanding.
 *
 * A group of ONE (Safeguarding) and a group of SIX (Inspection). The grid is
 * auto-fit; one card sat alone in a quarter-width track, six drew 4 + 2 with
 * a hole. Now four, four and three.
 *
 * This page had no live figures at all. Three are now real: open safeguarding
 * concerns (designated leads only — the hook returns nothing for anyone
 * else), IQA verdicts awaiting a decision (the same count the College
 * overview shows), and single-central-record problems (the same figures the
 * Compliance Docs page shows).
 */
import { useNavigate } from 'react-router-dom';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useSafeguardingQueue } from '@/hooks/useSafeguardingQueue';
import { useTutorToday } from '@/hooks/useTutorToday';
import { useComplianceStats } from '@/hooks/useComplianceStats';
import {
  HubQuickStart,
  HubToolGrid,
  type HubTool,
  type HubQuickAction,
} from '@/components/hub/HubPrimitives';

interface QualityComplianceHubProps {
  onNavigate: (section: CollegeSection) => void;
}

export function QualityComplianceHub({ onNavigate }: QualityComplianceHubProps) {
  const navigate = useNavigate();
  const { isDsl, openCount: safeguardingOpen } = useSafeguardingQueue();
  const { data: today } = useTutorToday();
  const { stats: compliance } = useComplianceStats();

  const iqaAwaiting = today?.counts.iqa_awaiting ?? 0;
  const complianceProblems = compliance.expired + compliance.missing;

  /*
   * ── Start something ──────────────────────────────────────────────────
   * Sampling is the IQA's daily work and the one thing here with a queue, so
   * it takes the single solid volt card.
   */
  const quickStart: HubQuickAction[] = [
    {
      title: 'Sample work',
      description: iqaAwaiting > 0 ? `${iqaAwaiting} verdict${iqaAwaiting === 1 ? '' : 's'} due` : 'IQA sampling and verdicts',
      onClick: () => navigate('/college/iqa'),
      primary: true,
    },
    {
      title: 'Rehearse an inspection',
      description: 'Mate plays the inspector',
      onClick: () => navigate('/college/compliance/rehearsal'),
    },
    {
      title: 'Draft the SAR',
      description: 'Self-assessment report',
      onClick: () => navigate('/college/compliance/sar'),
    },
    {
      title: 'Update the QIP',
      description: 'Actions, owners and due dates',
      onClick: () => navigate('/college/compliance/qip'),
    },
  ];

  /*
   * ── Tool groups ──────────────────────────────────────────────────────
   * Four, four and three. A card reports a figure when it has one and says
   * what it is for when it doesn't — never both.
   */
  const safeguardingAndIqa: HubTool[] = [
    {
      id: 'safeguarding-queue',
      title: 'Safeguarding queue',
      onClick: () => onNavigate('safeguardingqueue'),
      value: isDsl && safeguardingOpen > 0 ? String(safeguardingOpen) : undefined,
      valueLabel: isDsl && safeguardingOpen > 0 ? 'open concerns' : undefined,
      description: isDsl
        ? 'No open concerns. Every concern logged at your college, in one place.'
        : 'Every concern logged at your college. Designated safeguarding leads only.',
      alert: isDsl && safeguardingOpen > 0,
    },
    {
      id: 'iqa-dashboard',
      title: 'IQA dashboard',
      to: '/college/iqa',
      value: iqaAwaiting > 0 ? String(iqaAwaiting) : undefined,
      valueLabel: iqaAwaiting > 0 ? 'verdicts due' : undefined,
      description: 'Sampling plans, findings, standardisation and coverage.',
      alert: iqaAwaiting > 0,
    },
    {
      id: 'iqa-workflow',
      title: 'IQA workflow',
      onClick: () => onNavigate('iqaworkflow'),
      description: 'Findings, standardisation prep and assessor agreement.',
    },
    {
      id: 'iqa-otj-audit',
      title: 'IQA off-the-job audit',
      onClick: () => onNavigate('iqaotjaudit'),
      description: 'Sample and audit off-the-job verification decisions.',
    },
  ];

  const inspection: HubTool[] = [
    {
      id: 'ofsted-eif',
      title: 'Ofsted EIF',
      to: '/college/compliance/ofsted',
      description: 'Your KPIs against the Education Inspection Framework, RAG-rated live.',
    },
    {
      id: 'quality-dashboard',
      title: 'Quality dashboard',
      onClick: () => onNavigate('qualitydashboard'),
      description: 'Quality KPIs and the evidence behind them, at a glance.',
    },
    {
      id: 'audit-pack',
      title: 'Audit pack',
      to: '/college/compliance/pack',
      description: 'IQA samples, assessor decisions and the evidence chain, ready to print.',
    },
    {
      id: 'lesson-observations',
      title: 'Lesson observations',
      onClick: () => onNavigate('tutorobs'),
      description: 'Peer, HoD, IQA and learning-walk observations for every tutor.',
    },
  ];

  const records: HubTool[] = [
    {
      id: 'reports',
      title: 'Reports',
      to: '/college/reports',
      description: 'Off-the-job, attendance, progress, EPA and coverage exports.',
    },
    {
      id: 'compliance-docs',
      title: 'Compliance docs',
      onClick: () => onNavigate('compliancedocs'),
      value:
        complianceProblems > 0
          ? String(complianceProblems)
          : compliance.expiring > 0
            ? String(compliance.expiring)
            : compliance.total > 0
              ? String(compliance.total)
              : undefined,
      valueLabel:
        complianceProblems > 0
          ? 'expired or missing'
          : compliance.expiring > 0
            ? 'expiring soon'
            : compliance.total > 0
              ? 'records on file'
              : undefined,
      description: 'Policies, DBS checks and staff documentation.',
      alert: complianceProblems > 0,
    },
    {
      id: 'audit-log',
      title: 'Audit log',
      onClick: () => onNavigate('auditlog'),
      description: 'Append-only record of every sensitive action, built for audits.',
    },
  ];

  return (
    <>
      <HubQuickStart label="Start something" items={quickStart} />

      <HubToolGrid label="Safeguarding & IQA" cards={safeguardingAndIqa} columns="four" />

      <HubToolGrid label="Inspection readiness" cards={inspection} columns="four" />

      <HubToolGrid label="Records" cards={records} columns="four" />
    </>
  );
}
