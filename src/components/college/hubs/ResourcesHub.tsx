import { motion } from 'framer-motion';
import { PullToRefresh } from '@/components/college/ui/PullToRefresh';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { useCollegeSupabase } from '@/contexts/CollegeSupabaseContext';
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
                value: 0,
                label: 'VLE Connected',
                sub: 'Canvas / Moodle / LTI',
              },
              {
                value: 0,
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
          </HubGrid>
        </motion.section>

        {/* INTEGRATIONS */}
        <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
          <SectionHeader eyebrow="Integrations" title="Connect external systems" />
          <HubGrid columns={2}>
            <HubCard
              number="03"
              eyebrow="VLE & Learning"
              title="VLE Integration"
              description="Connect Canvas, Moodle or any LTI 1.3 learning platform."
              tone="blue"
              meta="Not connected"
              onClick={() => onNavigate('ltisettings')}
            />
            <HubCard
              number="04"
              eyebrow="Workplace Partners"
              title="Employer Portal"
              description="Apprentice progress visibility and employer engagement."
              tone="green"
              meta="0 employers"
              onClick={() => onNavigate('employerportal')}
            />
          </HubGrid>
        </motion.section>

        {/* ADMINISTRATION */}
        <motion.section variants={itemVariants} className="space-y-6 sm:space-y-7">
          <SectionHeader eyebrow="Administration" title="Institution configuration" />
          <HubGrid columns={1}>
            <HubCard
              number="05"
              eyebrow="Preferences & Setup"
              title="College Settings"
              description="Institution preferences, defaults and system configuration."
              tone="indigo"
              meta="Admin only"
              onClick={() => onNavigate('collegesettings')}
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
