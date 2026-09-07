import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useComplianceStats } from '@/hooks/useComplianceStats';
import { useVerifierAuthority } from '@/hooks/useVerifierAuthority';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';
import { buttonPrimaryCn, chipBase, chipOff, chipOn, inputCn } from '@/components/forms/fieldStyles';
import { containerVariants, itemVariants } from '@/components/college/primitives';
import { HubKpi, HubKpiRow, HubSectionHeading } from '@/components/hub/HubPrimitives';
import { StaffComplianceList } from './StaffComplianceList';
import { PoliciesList } from './PoliciesList';
import { StaffComplianceDrawer } from '@/components/college/sheets/StaffComplianceDrawer';
import { AddPolicyDialog } from '@/components/college/dialogs/AddPolicyDialog';
import { AiAuthorPolicySheet } from '@/components/college/dialogs/AiAuthorPolicySheet';
import { PolicyTemplatesSheet } from '@/components/college/dialogs/PolicyTemplatesSheet';

/* ==========================================================================
   ComplianceDocsSection — the single central record and the policy library.

   Content only — CollegeDashboard draws the masthead. Four KPIs from
   v_single_central_record (in date / expiring / expired / missing — the hub
   card beneath shows expired+missing combined, so no figure repeats), the one
   solid volt control (Add policy on the policies tab, Add record on staff),
   the other destinations as quiet rows, then the two lists behind 44px
   chips and an underline search.
   ========================================================================== */

type Tab = 'staff' | 'policies';

export function ComplianceDocsSection() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<Tab>('staff');
  const [openStaffId, setOpenStaffId] = useState<string | null>(null);
  const [addPolicyOpen, setAddPolicyOpen] = useState(false);
  const [aiAuthorOpen, setAiAuthorOpen] = useState(false);
  const [templatesOpen, setTemplatesOpen] = useState(false);
  const { stats, loading: statsLoading } = useComplianceStats();
  const { isVerifier } = useVerifierAuthority();

  const openStaff = (id: string) => setOpenStaffId(id);

  const primaryAction = () => {
    if (activeTab === 'policies') {
      setAddPolicyOpen(true);
    } else {
      toast({
        title: 'Tip',
        description: 'Tap any staff row to add or update their compliance records.',
      });
    }
  };

  const fig = (n: number) => (statsLoading ? '—' : String(n));
  const problems = stats.expired + stats.missing;

  const more: { id: string; title: string; reason: string; onClick: () => void }[] = [
    {
      id: 'ofsted',
      title: 'Ofsted EIF lens',
      reason: 'Live RAG snapshot across the four EIF judgements',
      onClick: () => navigate('/college/compliance/ofsted'),
    },
    ...(isVerifier
      ? [
          {
            id: 'pack',
            title: 'Generate audit pack',
            reason: 'Ofsted and EQA-ready pack from current data',
            onClick: () => navigate('/college/compliance/pack'),
          },
        ]
      : []),
    ...(activeTab === 'policies'
      ? [
          {
            id: 'templates',
            title: 'Policy templates',
            reason: 'Browse starter templates and clone one as a draft',
            onClick: () => setTemplatesOpen(true),
          },
          {
            id: 'ai',
            title: 'Draft a policy with AI',
            reason: 'From a topic to a draft you review and file',
            onClick: () => setAiAuthorOpen(true),
          },
        ]
      : []),
  ];

  return (
    <div className="space-y-8 sm:space-y-10">
      <HubKpiRow>
        <HubKpi
          accent
          label="In date"
          value={fig(stats.valid)}
          verdict={stats.total > 0 ? `of ${stats.total} required records` : 'No records yet'}
          onClick={() => setActiveTab('staff')}
        />
        <HubKpi
          label="Expiring"
          value={fig(stats.expiring)}
          verdict={stats.expiring > 0 ? 'Within 60 days — renew now' : 'Nothing due in 60 days'}
          onClick={() => setActiveTab('staff')}
        />
        <HubKpi
          label="Expired"
          value={fig(stats.expired)}
          verdict={stats.expired > 0 ? 'Immediate action' : 'None expired'}
          sentiment={stats.expired > 0 ? 'bad' : 'neutral'}
          onClick={() => setActiveTab('staff')}
        />
        <HubKpi
          label="Missing"
          value={fig(stats.missing)}
          verdict={stats.missing > 0 ? 'Not yet recorded' : 'Every record on file'}
          sentiment={stats.missing > 0 ? 'bad' : 'neutral'}
          context={problems > 0 ? `${problems} to fix in total` : undefined}
          onClick={() => setActiveTab('staff')}
        />
      </HubKpiRow>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <motion.div
          variants={itemVariants}
          className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
        >
          <div className="flex flex-wrap gap-2">
            {(
              [
                { value: 'staff', label: 'Staff records' },
                { value: 'policies', label: 'Policies' },
              ] as { value: Tab; label: string }[]
            ).map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => setActiveTab(t.value)}
                className={cn(
                  chipBase,
                  'px-4 text-[12.5px]',
                  activeTab === t.value ? chipOn : chipOff
                )}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            onClick={primaryAction}
            className={cn(buttonPrimaryCn, 'w-full px-5 sm:w-auto')}
          >
            {activeTab === 'policies' ? 'Add policy' : 'Add record'}
          </button>
        </motion.div>

        <motion.div variants={itemVariants}>
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={
              activeTab === 'staff' ? 'Search staff by name, role or department…' : 'Search policies…'
            }
            aria-label="Search compliance records"
            className={inputCn}
          />
        </motion.div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <HubSectionHeading>
          {activeTab === 'staff' ? 'DBS, qualifications and CPD' : 'Institution policies'}
        </HubSectionHeading>
        <motion.div variants={itemVariants}>
          {activeTab === 'staff' ? (
            <StaffComplianceList search={searchQuery} onOpen={openStaff} />
          ) : (
            <PoliciesList
              search={searchQuery}
              onOpen={(id) => navigate(`/college/policies/${id}`)}
              onAdd={() => setAddPolicyOpen(true)}
            />
          )}
        </motion.div>
      </motion.section>

      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="space-y-3"
      >
        <HubSectionHeading>Also here</HubSectionHeading>
        <motion.div
          variants={itemVariants}
          className={cn(
            '-mx-4 overflow-hidden border-y border-elec-yellow/35 sm:mx-0 sm:rounded-2xl sm:border-x',
            CARD_SURFACE
          )}
        >
          <ul className="divide-y divide-white/[0.10]">
            {more.map((m) => (
              <li key={m.id}>
                <button
                  type="button"
                  onClick={m.onClick}
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors touch-manipulation hover:bg-white/[0.06] active:bg-white/[0.09] sm:px-5"
                >
                  <span
                    aria-hidden="true"
                    className="h-8 w-[3px] shrink-0 rounded-full bg-white/[0.25]"
                  />
                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-[14px] font-semibold leading-tight text-white">
                      {m.title}
                    </span>
                    <span className="mt-0.5 block truncate text-[12px] leading-tight text-white">
                      {m.reason}
                    </span>
                  </span>
                  <ChevronRight className="h-4 w-4 shrink-0 text-white" aria-hidden="true" />
                </button>
              </li>
            ))}
          </ul>
        </motion.div>
      </motion.section>

      <StaffComplianceDrawer
        open={!!openStaffId}
        onOpenChange={(open) => {
          if (!open) setOpenStaffId(null);
        }}
        staffId={openStaffId}
      />

      <AddPolicyDialog open={addPolicyOpen} onOpenChange={setAddPolicyOpen} />
      <AiAuthorPolicySheet open={aiAuthorOpen} onOpenChange={setAiAuthorOpen} />
      <PolicyTemplatesSheet open={templatesOpen} onOpenChange={setTemplatesOpen} />
    </div>
  );
}
