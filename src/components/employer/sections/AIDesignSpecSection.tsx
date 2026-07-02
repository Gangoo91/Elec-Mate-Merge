import { AIInstallationDesigner } from '@/components/electrician-tools/circuit-designer/AIInstallationDesigner';
import { PageFrame, PageHero } from '@/components/employer/editorial';
import type { Section } from '@/pages/employer/EmployerDashboard';

interface AIDesignSpecSectionProps {
  onNavigate: (section: Section) => void;
}

/**
 * Employer-branded shell around the full circuit-design engine — the same
 * structured wizard → live streaming → editorial results → branded PDF the
 * electrician side runs, minus the electrician-only chrome (agent inbox,
 * save-to-customer). Jobs are keyed to the signed-in admin's user_id.
 */
export function AIDesignSpecSection(_props: AIDesignSpecSectionProps) {
  return (
    <PageFrame>
      <PageHero
        eyebrow="Smart Docs"
        title="AI Design"
        description="Design a full installation to BS 7671 — every circuit sized, protected and compliance-checked, ready as a branded spec."
        tone="purple"
      />
      <AIInstallationDesigner variant="employer" />
    </PageFrame>
  );
}
