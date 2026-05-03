import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DropdownTabs } from '@/components/ui/dropdown-tabs';
import {
  PageFrame,
  PageHero,
  SectionHeader,
  itemVariants,
} from '@/components/college/primitives';
import TimeTrackingTab from '@/components/apprentice/ojt/TimeTrackingTab';
import PortfolioBuildingTab from '@/components/apprentice/ojt/PortfolioBuildingTab';
import EvidenceAssessmentTab from '@/components/apprentice/ojt/EvidenceAssessmentTab';
import AssessmentTrackingTab from '@/components/apprentice/ojt/AssessmentTrackingTab';
import ComplianceDashboardTab from '@/components/apprentice/ojt/ComplianceDashboardTab';

export default function ApprenticeOJT() {
  const navigate = useNavigate();

  const tabs = [
    {
      value: 'portfolio',
      label: 'Portfolio',
      content: React.createElement(PortfolioBuildingTab),
    },
    {
      value: 'time-tracking',
      label: 'Time tracking',
      content: React.createElement(TimeTrackingTab),
    },
    {
      value: 'evidence',
      label: 'Evidence assessment',
      content: React.createElement(EvidenceAssessmentTab),
    },
    {
      value: 'assessments',
      label: 'Assessments',
      content: React.createElement(AssessmentTrackingTab),
    },
    {
      value: 'compliance',
      label: 'Goals & progress',
      content: React.createElement(ComplianceDashboardTab),
    },
  ];

  return (
    <PageFrame className="px-4 sm:px-6 lg:px-8">
      <motion.div variants={itemVariants}>
        <Button
          variant="ghost"
          onClick={() => navigate('/apprentice')}
          className="text-white hover:text-white hover:bg-white/[0.05] active:bg-white/[0.08] -ml-2 h-11 touch-manipulation"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </Button>
      </motion.div>

      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Apprentice · Portfolio & OJT"
          title="Build your apprenticeship portfolio"
          description="Manage your 20% off-the-job training, track evidence, and progress through the full apprenticeship — all in one place."
          tone="yellow"
        />
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-5 sm:space-y-6">
        <SectionHeader eyebrow="Five workstreams" title="Pick a section" />
        <DropdownTabs
          tabs={tabs}
          defaultValue="portfolio"
          placeholder="Select a section"
          triggerClassName="w-full sm:w-[320px]"
        />
      </motion.section>
    </PageFrame>
  );
}
