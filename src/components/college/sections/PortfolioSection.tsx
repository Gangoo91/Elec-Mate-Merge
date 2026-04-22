import { motion } from 'framer-motion';
import CollegePortfolioHub from '@/components/college/portfolio/CollegePortfolioHub';
import type { CollegeSection } from '@/pages/college/CollegeDashboard';
import { PageFrame, PageHero, itemVariants } from '@/components/college/primitives';

interface PortfolioSectionProps {
  onNavigate: (section: CollegeSection) => void;
}

export function PortfolioSection({ onNavigate: _onNavigate }: PortfolioSectionProps) {
  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Assessment · Portfolios"
          title="Student portfolios"
          description="Manage submissions, review portfolio evidence and track progress to EPA gateway."
          tone="purple"
        />
      </motion.div>
      <motion.div variants={itemVariants}>
        <CollegePortfolioHub />
      </motion.div>
    </PageFrame>
  );
}
