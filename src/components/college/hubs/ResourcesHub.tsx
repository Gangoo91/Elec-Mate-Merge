/**
 * Resources Hub — compliance records, integrations and college settings.
 *
 * Rebuilt on the shared hub shell (`@/components/hub/HubPrimitives`). The
 * masthead is drawn by CollegeDashboard; this is only the body:
 *
 *   header (one sentence on compliance, the one action) → records →
 *   integrations & admin
 *
 * 8 Oct 2026: the four figure tiles and the "Start something" strip went;
 * the sentence says what is lapsed and each card carries its status as a
 * chip in words.
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
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { cn } from '@/lib/utils';
import {
  LinkGroup,
  TEACH_BTN_PRIMARY,
  TeachingHeader,
  TeachingScreen,
  plural,
} from '@/components/college/teaching/TeachingKit';

const HELP: PageHelpContent = {
  id: 'college-resources-hub',
  title: 'Resources and admin',
  what: 'The records an inspector asks for, the materials your tutors teach from, and the settings that connect the college to other systems.',
  steps: [
    {
      title: 'Keep records in date',
      body: 'Compliance docs shows DBS checks, policies and staff records that have expired, are missing or are about to expire.',
    },
    {
      title: 'Share materials',
      body: 'Teaching resources and the document library hold slides, handouts, templates and policies everyone can use.',
    },
    {
      title: 'Connect your systems',
      body: 'Link a VLE (Canvas, Moodle or any LTI 1.3 platform) and invite employers to see their apprentices.',
    },
  ],
  legend: [
    { swatch: 'bg-orange-400', label: 'Orange', body: 'expired or missing: deal with these first' },
  ],
};

interface ResourcesHubProps {
  onNavigate: (section: CollegeSection) => void;
}

export function ResourcesHub({ onNavigate }: ResourcesHubProps) {
  const { stats: compliance, loading: complianceLoading } = useComplianceStats();
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

  const vleText =
    vleConnected === null
      ? null
      : vleConnected > 0
        ? `${plural(vleConnected, 'learning platform')} connected`
        : 'no learning platform connected';

  return (
    <TeachingScreen>
      <TeachingHeader
        eyebrow="Resources"
        title="Resources and admin"
        help={HELP}
        summary={
          complianceLoading ? (
            'Checking the compliance records…'
          ) : compliance.total === 0 ? (
            'No compliance records on file yet.'
          ) : complianceProblems > 0 ? (
            <>
              <span className="font-semibold text-orange-400">
                {plural(complianceProblems, 'compliance record')}{' '}
                {complianceProblems === 1 ? 'is' : 'are'} expired or missing
              </span>
              {compliance.expiring > 0 ? `, and ${compliance.expiring} expire soon.` : '.'}
            </>
          ) : compliance.expiring > 0 ? (
            `Every compliance record is in date; ${compliance.expiring} expire soon.`
          ) : (
            'Every compliance record is in date.'
          )
        }
        sub={[
          vleText ? vleText.charAt(0).toUpperCase() + vleText.slice(1) : null,
          `${plural(employers.length, 'employer')} linked`,
        ]
          .filter(Boolean)
          .join(' · ')}
        actions={
          <button
            type="button"
            onClick={() => onNavigate('compliancedocs')}
            className={cn(TEACH_BTN_PRIMARY, 'w-full sm:w-auto')}
          >
            {complianceProblems > 0 ? 'Fix compliance records' : 'Compliance records'}
          </button>
        }
      />

      <LinkGroup
        title="Records and materials"
        items={[
          {
            title: 'Compliance docs',
            body: 'DBS checks, policies and staff records, with what has lapsed.',
            status: complianceLoading
              ? undefined
              : complianceProblems > 0
                ? { label: `${complianceProblems} expired or missing`, tone: 'action' }
                : compliance.expiring > 0
                  ? { label: `${compliance.expiring} expiring soon`, tone: 'action' }
                  : compliance.total > 0
                    ? { label: 'All in date', tone: 'done' }
                    : { label: 'None on file' },
            onClick: () => onNavigate('compliancedocs'),
          },
          {
            title: 'Teaching resources',
            body: 'Slides, handouts and links your tutors teach from, mapped to criteria.',
            onClick: () => onNavigate('teachingresources'),
          },
          {
            title: 'Document library',
            body: 'Search everything the college has shared in one place.',
            onClick: () => onNavigate('documentlibrary'),
          },
          {
            title: 'Resource use',
            body: 'What learners open, and which materials to mark as the gold standard.',
            onClick: () => onNavigate('resourceanalytics'),
          },
        ]}
      />

      <LinkGroup
        title="Integrations and admin"
        items={[
          {
            title: 'VLE integration',
            body: 'Connect Canvas, Moodle or any LTI 1.3 learning platform.',
            status:
              vleConnected === null
                ? undefined
                : vleConnected > 0
                  ? { label: `${vleConnected} connected`, tone: 'done' }
                  : { label: 'Not connected' },
            onClick: () => onNavigate('ltisettings'),
          },
          {
            title: 'Employer portal',
            body: 'Let employers see their apprentices’ progress.',
            status:
              employers.length > 0
                ? { label: `${plural(employers.length, 'employer')} linked` }
                : { label: 'None linked yet' },
            onClick: () => onNavigate('employerportal'),
          },
          {
            title: 'College settings',
            body: 'Institution preferences, defaults and staff roles.',
            onClick: () => onNavigate('collegesettings'),
          },
          {
            title: 'Audit log',
            body: 'A record of every sensitive action that cannot be edited, for audits.',
            onClick: () => onNavigate('auditlog'),
          },
        ]}
      />
    </TeachingScreen>
  );
}
