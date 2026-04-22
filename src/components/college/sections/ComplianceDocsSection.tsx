import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  EmptyState,
  SectionHeader,
  itemVariants,
} from '@/components/college/primitives';

export function ComplianceDocsSection() {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('staff');

  // Backend integration pending — counts will come from supabase
  const validCount = 0;
  const expiringCount = 0;
  const expiredCount = 0;
  const pendingCount = 0;

  const addDoc = () =>
    toast({
      title: 'Compliance documents',
      description: 'Compliance document management is coming soon.',
    });

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Resources · Compliance"
          title="Policies & documents"
          description="Staff qualifications, DBS checks, policies and institution-wide compliance documentation."
          tone="purple"
          actions={
            <button
              onClick={addDoc}
              className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
            >
              Add document →
            </button>
          }
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatStrip
          columns={4}
          stats={[
            { value: validCount, label: 'Valid', sub: 'In date', tone: 'green' },
            { value: expiringCount, label: 'Expiring', sub: 'Action needed', tone: 'amber' },
            { value: expiredCount, label: 'Expired', sub: 'Immediate', tone: 'red' },
            { value: pendingCount, label: 'Pending', sub: 'Awaiting docs', tone: 'blue' },
          ]}
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <FilterBar
          tabs={[
            { value: 'staff', label: 'Staff Compliance' },
            { value: 'policies', label: 'Policies & Procedures' },
          ]}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search compliance records…"
        />
      </motion.div>

      <motion.section variants={itemVariants} className="space-y-5">
        <SectionHeader
          eyebrow={activeTab === 'staff' ? 'Staff Compliance' : 'Policies'}
          title={activeTab === 'staff' ? 'DBS, qualifications & CPD' : 'Institution policies'}
        />
        <EmptyState
          title={activeTab === 'staff' ? 'No compliance records yet' : 'No policies uploaded yet'}
          description={
            activeTab === 'staff'
              ? 'Add DBS certificates, teaching qualifications and CPD records per staff member. Expiry dates will be tracked automatically.'
              : 'Upload safeguarding, teaching & learning, assessment and quality assurance policies. Version history is kept automatically.'
          }
          action={activeTab === 'staff' ? 'Add compliance record' : 'Upload policy'}
          onAction={addDoc}
        />
      </motion.section>
    </PageFrame>
  );
}
