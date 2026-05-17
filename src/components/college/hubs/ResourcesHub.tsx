import { motion } from 'framer-motion';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import {
  PageFrame,
  PageHero,
  StatStrip,
  SectionHeader,
  HubGrid,
  HubCard,
  itemVariants,
} from '@/components/college/primitives';

interface ResourcesHubProps {
  onNavigate: (section: CollegeSection) => void;
}

export function ResourcesHub({ onNavigate }: ResourcesHubProps) {
  const { staff } = useCollegeSupabase();
  const activeStaff = staff.filter((s) => s.status === 'Active').length;
  const [vleConnected, setVleConnected] = useState<number | null>(null);
  const [complianceDocs, setComplianceDocs] = useState<number | null>(null);

  // Real stats: live count of LTI platforms + compliance documents,
  // scoped to the caller's college via RLS.
  useEffect(() => {
    void (async () => {
      const [ltiRes, docsRes] = await Promise.all([
        supabase.from('lti_platforms').select('id', { count: 'exact', head: true }),
        supabase.from('compliance_documents').select('id', { count: 'exact', head: true }),
      ]);
      setVleConnected(ltiRes.count ?? 0);
      setComplianceDocs(docsRes.count ?? 0);
    })();
  }, []);

  const handleRefresh = async () => {
    await new Promise((resolve) => setTimeout(resolve, 600));
  };

  return (
    <PullToRefresh onRefresh={handleRefresh}>
      <PageFrame>
        {/* HERO */}
        <motion.div variants={itemVariants}>
          <PageHero
            eyebrow="Resources Hub"
            title="Compliance, integrations & settings"
            description="Documentation, VLE integrations, employer engagement and institution-wide settings."
            tone="purple"
          />
        </motion.div>

        {/* STATS */}
        <motion.div variants={itemVariants}>
          <StatStrip
            columns={3}
            stats={[
              {
                value: activeStaff,
                label: 'Active Staff',
                sub: 'Across all roles',
              },
              {
                value: vleConnected ?? '—',
                label: 'VLE Connected',
                sub: 'Canvas / Moodle / LTI',
              },
              {
                value: complianceDocs ?? '—',
                label: 'Compliance Docs',
                sub: 'On file',
              },
            ]}
          />
        </motion.div>

        {/* COMPLIANCE & DOCS */}
        <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
          <SectionHeader eyebrow="Compliance & Documents" title="Keep records in order" />
          <HubGrid columns={2}>
            <HubCard
              number="01"
              eyebrow="Policies & Checks"
              title="Compliance"
              description="Policies, DBS checks and staff documentation."
              tone="purple"
              meta="Docs & audit trail"
              onClick={() => onNavigate('compliancedocs')}
            />
            <HubCard
              number="02"
              eyebrow="Shared Materials"
              title="Teaching Resources"
              description="Institution-wide teaching resources and uploads."
              tone="amber"
              meta="Resource library"
              onClick={() => onNavigate('teachingresources')}
            />
            <HubCard
              number="03"
              eyebrow="Usage & Gold Standard"
              title="Resource Analytics"
              description="See what's being used. Tag the top performers as gold standard."
              tone="yellow"
              meta="Views + downloads"
              onClick={() => onNavigate('resourceanalytics')}
            />
          </HubGrid>
        </motion.section>

        {/* INTEGRATIONS */}
        <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
          <SectionHeader eyebrow="Integrations" title="Connect external systems" />
          <HubGrid columns={2}>
            <HubCard
              number="04"
              eyebrow="VLE & Learning"
              title="VLE Integration"
              description="Connect Canvas, Moodle or any LTI 1.3 learning platform."
              tone="blue"
              meta={vleConnected !== null ? `${vleConnected} connected` : 'Loading…'}
              onClick={() => onNavigate('ltisettings')}
            />
            <HubCard
              number="05"
              eyebrow="Workplace Partners"
              title="Employer Portal"
              description="Apprentice progress visibility and employer engagement."
              tone="green"
              meta="See employers"
              onClick={() => onNavigate('employerportal')}
            />
          </HubGrid>
        </motion.section>

        {/* ADMINISTRATION */}
        <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
          <SectionHeader eyebrow="Administration" title="Institution configuration" />
          <HubGrid columns={2}>
            <HubCard
              number="06"
              eyebrow="Preferences & Setup"
              title="College Settings"
              description="Institution preferences, defaults and system configuration."
              tone="indigo"
              meta="Admin only"
              onClick={() => onNavigate('collegesettings')}
            />
            <HubCard
              number="07"
              eyebrow="Who did what · when"
              title="Audit log"
              description="Append-only record of every sensitive action. Built for Ofsted + funding audits."
              tone="amber"
              meta="Append-only"
              onClick={() => onNavigate('auditlog')}
            />
          </HubGrid>
        </motion.section>

        {/* QUICK ACTIONS */}
        <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
          <SectionHeader eyebrow="Quick Actions" title="Common tasks" />
          <HubGrid columns={4}>
            <HubCard
              size="sm"
              eyebrow="Review"
              title="Check compliance"
              description="Open doc register."
              tone="purple"
              onClick={() => onNavigate('compliancedocs')}
            />
            <HubCard
              size="sm"
              eyebrow="Connect"
              title="VLE setup"
              description="Open LTI settings."
              tone="blue"
              onClick={() => onNavigate('ltisettings')}
            />
            <HubCard
              size="sm"
              eyebrow="Browse"
              title="Resources"
              description="View materials."
              tone="amber"
              onClick={() => onNavigate('teachingresources')}
            />
            <HubCard
              size="sm"
              eyebrow="Configure"
              title="Settings"
              description="Institution prefs."
              tone="indigo"
              onClick={() => onNavigate('collegesettings')}
            />
          </HubGrid>
        </motion.section>
      </PageFrame>
    </PullToRefresh>
  );
}
