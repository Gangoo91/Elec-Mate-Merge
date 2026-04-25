import { useState } from 'react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  SectionHeader,
  itemVariants,
} from '@/components/college/primitives';
import { useNavigate } from 'react-router-dom';
import { useComplianceStats } from '@/hooks/useComplianceStats';
import { useVerifierAuthority } from '@/hooks/useVerifierAuthority';
import { StaffComplianceList } from './StaffComplianceList';
import { PoliciesList } from './PoliciesList';
import { StaffComplianceDrawer } from '@/components/college/sheets/StaffComplianceDrawer';
import { AddPolicyDialog } from '@/components/college/dialogs/AddPolicyDialog';

export function ComplianceDocsSection() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('staff');
  const [openStaffId, setOpenStaffId] = useState<string | null>(null);
  const [addPolicyOpen, setAddPolicyOpen] = useState(false);
  const { stats, loading: statsLoading } = useComplianceStats();
  const { isVerifier } = useVerifierAuthority();

  const openStaff = (id: string) => {
    setOpenStaffId(id);
  };

  const heroAction = () => {
    if (activeTab === 'policies') {
      setAddPolicyOpen(true);
    } else {
      toast({
        title: 'Tip',
        description: 'Tap any staff row to add or update their compliance records.',
      });
    }
  };

  return (
    <PageFrame>
      <motion.div variants={itemVariants}>
        <PageHero
          eyebrow="Resources · Compliance"
          title="Policies & documents"
          description="Staff qualifications, DBS checks, policies and institution-wide compliance documentation."
          tone="purple"
          actions={
            <div className="flex items-center gap-3 flex-wrap justify-end">
              {isVerifier && (
                <button
                  onClick={() => navigate('/college/compliance/pack')}
                  className="text-[12px] font-medium text-white/65 hover:text-white transition-colors touch-manipulation whitespace-nowrap"
                  title="Generate an Ofsted/EQA-ready audit pack from current data"
                >
                  Generate audit pack
                </button>
              )}
              <button
                onClick={heroAction}
                className="text-[12.5px] font-medium text-elec-yellow/90 hover:text-elec-yellow transition-colors touch-manipulation whitespace-nowrap"
              >
                {activeTab === 'policies' ? 'Add policy →' : 'Add record →'}
              </button>
            </div>
          }
        />
      </motion.div>

      <motion.div variants={itemVariants}>
        <StatStrip
          columns={4}
          stats={[
            {
              value: statsLoading ? '—' : stats.valid,
              label: 'Valid',
              sub: 'In date',
              tone: 'green',
            },
            {
              value: statsLoading ? '—' : stats.expiring,
              label: 'Expiring',
              sub: 'Within 60 days',
              tone: 'amber',
            },
            {
              value: statsLoading ? '—' : stats.expired,
              label: 'Expired',
              sub: 'Immediate action',
              tone: 'red',
            },
            {
              value: statsLoading ? '—' : stats.missing,
              label: 'Missing',
              sub: 'Not yet recorded',
              tone: 'blue',
            },
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
        {activeTab === 'staff' ? (
          <StaffComplianceList search={searchQuery} onOpen={openStaff} />
        ) : (
          <PoliciesList
            search={searchQuery}
            onOpen={(id) => navigate(`/college/policies/${id}`)}
            onAdd={() => setAddPolicyOpen(true)}
          />
        )}
      </motion.section>

      <StaffComplianceDrawer
        open={!!openStaffId}
        onOpenChange={(open) => {
          if (!open) setOpenStaffId(null);
        }}
        staffId={openStaffId}
      />

      <AddPolicyDialog open={addPolicyOpen} onOpenChange={setAddPolicyOpen} />
    </PageFrame>
  );
}
