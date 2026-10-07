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
import type { PageHelpContent } from '@/components/hub/PageHelp';
import { CollegePageHeader, CollegeSectionTitle, CollegeStats } from '@/components/college/ui/CollegeUi';
import { LinkGroup, QuickActions, TeachingScreen } from '@/components/college/teaching/TeachingKit';

const HELP: PageHelpContent = {
  id: 'college-resources-hub',
  title: 'Resources and admin',
  what: 'The records an inspector asks for, the materials your tutors teach from, and the settings that connect the college to other systems.',
  steps: [
    { title: 'Keep records in date', body: 'Compliance docs shows DBS checks, policies and staff records that have expired, are missing or are about to expire.' },
    { title: 'Share materials', body: 'Teaching resources and the document library hold slides, handouts, templates and policies everyone can use.' },
    { title: 'Connect your systems', body: 'Link a VLE (Canvas, Moodle or any LTI 1.3 platform) and invite employers to see their apprentices.' },
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

  return (
    <TeachingScreen>
      <CollegePageHeader
        eyebrow="Resources"
        title="Resources and admin"
        description="Compliance records, shared materials, integrations and college settings in one place."
        help={HELP}
      />

      <CollegeStats
        items={[
          {
            label: 'Expired or missing',
            value: complianceLoading ? '—' : String(complianceProblems),
            sub: complianceLoading
              ? ''
              : complianceProblems > 0
                ? 'compliance records'
                : compliance.total === 0
                  ? 'No records yet'
                  : 'all records in date',
            warn: complianceProblems > 0,
            good: complianceProblems === 0 && compliance.total > 0,
            onClick: () => onNavigate('compliancedocs'),
          },
          {
            label: 'Expiring soon',
            value: complianceLoading ? '—' : String(compliance.expiring),
            sub: complianceLoading ? '' : 'renew before they lapse',
            onClick: () => onNavigate('compliancedocs'),
          },
          {
            label: 'VLE platforms',
            value: vleConnected === null ? '—' : String(vleConnected),
            sub: 'connected by LTI',
            onClick: () => onNavigate('ltisettings'),
          },
          {
            label: 'Employers',
            value: String(employers.length),
            sub: 'linked to the college',
            onClick: () => onNavigate('employerportal'),
          },
        ]}
      />

      <section className="space-y-4">
        <CollegeSectionTitle title="Start something" />
        <QuickActions
          items={[
            {
              title: 'Check compliance',
              body:
                complianceProblems > 0
                  ? `${complianceProblems} record${complianceProblems === 1 ? '' : 's'} expired or missing`
                  : 'DBS, policies and staff records',
              onClick: () => onNavigate('compliancedocs'),
              primary: true,
            },
            { title: 'Add a resource', body: 'Upload slides or a handout', onClick: () => onNavigate('teachingresources') },
            { title: 'Connect a VLE', body: 'Canvas, Moodle or any LTI 1.3 platform', onClick: () => onNavigate('ltisettings') },
          ]}
        />
      </section>

      <LinkGroup
        title="Records and materials"
        items={[
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
          { title: 'Teaching resources', body: 'Shared teaching materials and uploads across the college.', onClick: () => onNavigate('teachingresources') },
          { title: 'Document library', body: 'Policies, templates and documents for staff and learners.', onClick: () => onNavigate('documentlibrary') },
          { title: 'Resource use', body: 'What is being used, and which materials to mark as gold standard.', onClick: () => onNavigate('resourceanalytics') },
        ]}
      />

      <LinkGroup
        title="Integrations and admin"
        items={[
          {
            title: 'VLE integration',
            figure: vleConnected !== null && vleConnected > 0 ? String(vleConnected) : undefined,
            body:
              vleConnected !== null && vleConnected > 0
                ? `platform${vleConnected === 1 ? '' : 's'} connected`
                : 'Connect Canvas, Moodle or any LTI 1.3 learning platform.',
            onClick: () => onNavigate('ltisettings'),
          },
          {
            title: 'Employer portal',
            figure: employers.length > 0 ? String(employers.length) : undefined,
            body: employers.length > 0 ? 'employers linked' : 'Apprentice progress visibility and employer engagement.',
            onClick: () => onNavigate('employerportal'),
          },
          { title: 'College settings', body: 'Institution preferences, defaults and staff roles.', onClick: () => onNavigate('collegesettings') },
          { title: 'Audit log', body: 'Append-only record of every sensitive action, built for audits.', onClick: () => onNavigate('auditlog') },
        ]}
      />
    </TeachingScreen>
  );
}
