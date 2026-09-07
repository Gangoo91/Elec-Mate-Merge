/**
 * Resources Hub — compliance records, integrations and college settings.
 *
 * Rebuilt on the shared hub shell (`@/components/hub/HubPrimitives`). The
 * masthead is drawn by CollegeDashboard; this is only the body:
 *
 *   quick start → records → integrations & admin
 *
 * What went, and why:
 *
 * The STAT STRIP ("Active Staff / VLE Connected / Compliance Docs"). Active
 * staff is a People Hub figure and had nothing to do with this page; the other
 * two now sit on the cards that own them.
 *
 * The QUICK ACTIONS grid at the bottom — four small cards opening the same
 * four sections as the big cards above them.
 *
 * Three groups of two. The grid is auto-fit and fills the width, so a pair of
 * cards on a desktop drew two wide slabs with a hole beside them. Now three
 * and four.
 *
 * The compliance figure changed source: it was a bare `count(*)` of
 * `compliance_documents`, a number that means nothing on its own. It now
 * reads the single central record view through `useComplianceStats` — the
 * same figures the Compliance Docs page shows — so the card can say how many
 * records are expired or missing rather than how many exist.
 */
import { useEffect, useState } from 'react';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { supabase } from '@/integrations/supabase/client';
import { useComplianceStats } from '@/hooks/useComplianceStats';
import { useCollegeEmployers } from '@/hooks/useCollegeEmployers';
import {
  HubQuickStart,
  HubToolGrid,
  type HubTool,
  type HubQuickAction,
} from '@/components/hub/HubPrimitives';

interface ResourcesHubProps {
  onNavigate: (section: CollegeSection) => void;
}

export function ResourcesHub({ onNavigate }: ResourcesHubProps) {
  const { stats: compliance } = useComplianceStats();
  const { employers } = useCollegeEmployers();
  const [vleConnected, setVleConnected] = useState<number | null>(null);

  // Live count of LTI platforms, scoped to the caller's college via RLS.
  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const { count } = await supabase
        .from('lti_platforms')
        .select('id', { count: 'exact', head: true });
      if (!cancelled) setVleConnected(count ?? 0);
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const complianceProblems = compliance.expired + compliance.missing;

  /*
   * ── Start something ──────────────────────────────────────────────────
   * Compliance is the thing on this page with a cost of delay, so it takes
   * the single solid volt card.
   */
  const quickStart: HubQuickAction[] = [
    {
      title: 'Check compliance',
      description:
        complianceProblems > 0
          ? `${complianceProblems} record${complianceProblems === 1 ? '' : 's'} expired or missing`
          : 'DBS, policies and staff records',
      onClick: () => onNavigate('compliancedocs'),
      primary: true,
    },
    {
      title: 'Add a resource',
      description: 'Upload slides or a handout',
      onClick: () => onNavigate('teachingresources'),
    },
    {
      title: 'Connect a VLE',
      description: 'Canvas, Moodle or any LTI 1.3 platform',
      onClick: () => onNavigate('ltisettings'),
    },
  ];

  /*
   * ── Tool groups ──────────────────────────────────────────────────────
   * Three and four. A card reports a figure when it has one and says what it
   * is for when it doesn't — never both.
   */
  const records: HubTool[] = [
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
      id: 'teaching-resources',
      title: 'Teaching resources',
      onClick: () => onNavigate('teachingresources'),
      description: 'Shared teaching materials and uploads across the college.',
    },
    {
      id: 'resource-analytics',
      title: 'Resource analytics',
      onClick: () => onNavigate('resourceanalytics'),
      description: 'What is being used, and which materials to mark as gold standard.',
    },
  ];

  const integrationsAndAdmin: HubTool[] = [
    {
      id: 'vle-integration',
      title: 'VLE integration',
      onClick: () => onNavigate('ltisettings'),
      value: vleConnected !== null && vleConnected > 0 ? String(vleConnected) : undefined,
      valueLabel:
        vleConnected !== null && vleConnected > 0
          ? `platform${vleConnected === 1 ? '' : 's'} connected`
          : undefined,
      description: 'Connect Canvas, Moodle or any LTI 1.3 learning platform.',
    },
    {
      id: 'employer-portal',
      title: 'Employer portal',
      onClick: () => onNavigate('employerportal'),
      value: employers.length > 0 ? String(employers.length) : undefined,
      valueLabel: employers.length > 0 ? 'employers linked' : undefined,
      description: 'Apprentice progress visibility and employer engagement.',
    },
    {
      id: 'college-settings',
      title: 'College settings',
      onClick: () => onNavigate('collegesettings'),
      description: 'Institution preferences, defaults and staff roles.',
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

      <HubToolGrid label="Records" cards={records} columns="four" />

      <HubToolGrid label="Integrations & admin" cards={integrationsAndAdmin} columns="four" />
    </>
  );
}
