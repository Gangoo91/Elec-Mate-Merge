import { useState, useMemo } from 'react';
import { ContractViewer } from '@/components/employer/ContractViewer';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  IconButton,
  EmptyState,
  LoadingBlocks,
  PrimaryButton,
  type Tone,
} from '@/components/employer/editorial';
import {
  useContracts,
  useEmploymentContractTemplates,
  useAdoptedContractTemplateIds,
  useContractStats,
  useDeleteContract,
  type Contract,
  type EmploymentContractTemplate,
} from '@/hooks/useContracts';
import { RefreshCw, Trash2 } from 'lucide-react';

type FilterTab = 'all' | 'active' | 'pending' | 'expired' | 'templates';

function getInitials(value?: string | null) {
  if (!value) return 'CT';
  const parts = value.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

function statusToTone(status?: string): Tone {
  switch (status) {
    case 'Active':
      return 'emerald';
    case 'Draft':
      return 'amber';
    case 'Expired':
      return 'red';
    case 'Terminated':
      return 'red';
    case 'Template':
      return 'indigo';
    default:
      return 'orange';
  }
}

function categoryTone(category?: string): Tone {
  switch (category) {
    case 'Employment':
      return 'yellow';
    case 'Subcontractor':
      return 'cyan';
    case 'HR Letters':
      return 'emerald';
    default:
      return 'indigo';
  }
}

function isExpiringWithin(days: number, endDate?: string) {
  if (!endDate) return false;
  const end = new Date(endDate).getTime();
  if (Number.isNaN(end)) return false;
  const now = Date.now();
  const diff = (end - now) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff <= days;
}

function formatDate(d?: string) {
  if (!d) return '—';
  const parsed = new Date(d);
  if (Number.isNaN(parsed.getTime())) return '—';
  return parsed.toLocaleDateString('en-GB');
}

export function ContractsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<EmploymentContractTemplate | null>(null);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  const { data: systemTemplates = [], isLoading: templatesLoading } =
    useEmploymentContractTemplates();
  const { data: userContracts = [], isLoading: contractsLoading, error, refetch } = useContracts();
  const { data: adoptedTemplateIds = [] } = useAdoptedContractTemplateIds();
  const { data: stats } = useContractStats();
  const deleteContract = useDeleteContract();

  const isLoading = templatesLoading || contractsLoading;

  const filteredTemplates = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return systemTemplates.filter(
      (t) => t.name.toLowerCase().includes(q) || t.category.toLowerCase().includes(q)
    );
  }, [systemTemplates, searchQuery]);

  const filteredUserContracts = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return userContracts.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        (c.party_name?.toLowerCase().includes(q) ?? false)
    );
  }, [userContracts, searchQuery]);

  const employmentTemplates = filteredTemplates.filter((t) => t.category === 'Employment');
  const subcontractorTemplates = filteredTemplates.filter((t) => t.category === 'Subcontractor');
  const hrLettersTemplates = filteredTemplates.filter((t) => t.category === 'HR Letters');

  const activeCount = userContracts.filter((c) => c.status === 'Active').length;
  const pendingCount = userContracts.filter((c) => c.status === 'Draft').length;
  const expiredCount = userContracts.filter(
    (c) => c.status === 'Expired' || c.status === 'Terminated'
  ).length;
  const expiringSoon =
    stats?.expiringSoon ??
    userContracts.filter((c) => c.status === 'Active' && isExpiringWithin(30, c.end_date)).length;
  const totalTemplates = systemTemplates.length;

  const visibleContracts = useMemo(() => {
    if (activeTab === 'all') return filteredUserContracts;
    if (activeTab === 'active') return filteredUserContracts.filter((c) => c.status === 'Active');
    if (activeTab === 'pending') return filteredUserContracts.filter((c) => c.status === 'Draft');
    if (activeTab === 'expired')
      return filteredUserContracts.filter(
        (c) => c.status === 'Expired' || c.status === 'Terminated'
      );
    return [];
  }, [filteredUserContracts, activeTab]);

  const handleViewTemplate = (template: EmploymentContractTemplate) => {
    setSelectedTemplate(template);
    setSelectedContract(null);
    setViewerOpen(true);
  };

  const handleViewContract = (contract: Contract) => {
    setSelectedContract(contract);
    setSelectedTemplate(null);
    setViewerOpen(true);
  };

  const handleNewContract = () => {
    setSelectedContract(null);
    setSelectedTemplate(null);
    setViewerOpen(true);
  };

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm('Are you sure you want to delete this contract?')) {
      await deleteContract.mutateAsync(id);
    }
  };

  const heroActions = (
    <>
      <PrimaryButton onClick={handleNewContract}>New contract</PrimaryButton>
      <IconButton onClick={() => refetch()} aria-label="Refresh">
        <RefreshCw className="h-4 w-4" />
      </IconButton>
    </>
  );

  if (error) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="HR & Safety"
          title="Contracts"
          description="Employment, subcontractor and HR contract templates."
          tone="indigo"
          actions={heroActions}
        />
        <EmptyState
          title="Failed to load contracts"
          description="Something went wrong fetching your contracts. Try again."
          action="Retry"
          onAction={() => refetch()}
        />
      </PageFrame>
    );
  }

  if (isLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="HR & Safety"
          title="Contracts"
          description="Employment, subcontractor and HR contract templates."
          tone="indigo"
          actions={heroActions}
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  const showTemplatesView = activeTab === 'templates' || activeTab === 'all';
  const showContractsView = activeTab !== 'templates';

  return (
    <>
      <PageFrame>
        <PageHero
          eyebrow="HR & Safety"
          title="Contracts"
          description="Employment, subcontractor and HR contract templates."
          tone="indigo"
          actions={heroActions}
        />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Active', value: activeCount, tone: 'emerald' },
            { label: 'Awaiting sig', value: pendingCount, tone: 'orange' },
            { label: 'Templates', value: totalTemplates, tone: 'indigo' },
            { label: 'Expiring 30d', value: expiringSoon, tone: 'amber' },
          ]}
        />

        <FilterBar
          tabs={[
            { value: 'all', label: 'All', count: filteredUserContracts.length },
            { value: 'active', label: 'Active', count: activeCount },
            { value: 'pending', label: 'Pending', count: pendingCount },
            { value: 'expired', label: 'Expired', count: expiredCount },
            { value: 'templates', label: 'Templates', count: totalTemplates },
          ]}
          activeTab={activeTab}
          onTabChange={(v) => setActiveTab(v as FilterTab)}
          search={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search contracts and templates…"
        />

        {showContractsView && (
          <ListCard>
            <ListCardHeader
              tone="indigo"
              title="My contracts"
              meta={<Pill tone="indigo">{visibleContracts.length}</Pill>}
            />
            {visibleContracts.length === 0 ? (
              <div className="px-5 sm:px-6 py-10 text-center">
                <div className="text-sm font-medium text-white">No contracts here yet</div>
                <p className="mt-2 text-[12.5px] text-white max-w-md mx-auto leading-relaxed">
                  Adopt one of the templates below to start building your library, or create one
                  from scratch.
                </p>
              </div>
            ) : (
              <ListBody>
                {visibleContracts.map((contract) => {
                  const partyLabel = contract.party_name ?? contract.title;
                  const typeLabel = contract.contract_type ?? 'Contract';
                  const dateRange =
                    contract.start_date || contract.end_date
                      ? `${formatDate(contract.start_date)} → ${formatDate(contract.end_date)}`
                      : 'Dates not set';
                  return (
                    <ListRow
                      key={contract.id}
                      lead={<Avatar initials={getInitials(partyLabel)} />}
                      title={`${typeLabel} — ${partyLabel}`}
                      subtitle={dateRange}
                      onClick={() => handleViewContract(contract)}
                      trailing={
                        <>
                          <Pill tone={statusToTone(contract.status)}>{contract.status}</Pill>
                          <button
                            onClick={(e) => handleDelete(contract.id, e)}
                            disabled={deleteContract.isPending}
                            aria-label="Delete contract"
                            className="h-9 w-9 rounded-full flex items-center justify-center text-white hover:bg-white/[0.08] transition-colors touch-manipulation disabled:opacity-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </button>
                        </>
                      }
                    />
                  );
                })}
              </ListBody>
            )}
          </ListCard>
        )}

        {showTemplatesView && (
          <>
            {employmentTemplates.length > 0 && (
              <TemplateListCard
                title="Employment contracts"
                tone="yellow"
                templates={employmentTemplates}
                adoptedIds={adoptedTemplateIds}
                onView={handleViewTemplate}
              />
            )}

            {subcontractorTemplates.length > 0 && (
              <TemplateListCard
                title="Subcontractor agreements"
                tone="cyan"
                templates={subcontractorTemplates}
                adoptedIds={adoptedTemplateIds}
                onView={handleViewTemplate}
              />
            )}

            {hrLettersTemplates.length > 0 && (
              <TemplateListCard
                title="HR letters & documents"
                tone="emerald"
                templates={hrLettersTemplates}
                adoptedIds={adoptedTemplateIds}
                onView={handleViewTemplate}
              />
            )}

            {filteredTemplates.length === 0 && filteredUserContracts.length === 0 && (
              <EmptyState
                title="No contracts found"
                description="Try adjusting your search query or clearing the filter."
              />
            )}
          </>
        )}
      </PageFrame>

      <ContractViewer
        open={viewerOpen}
        onOpenChange={setViewerOpen}
        template={selectedTemplate}
        userContract={selectedContract}
        isAdopted={selectedTemplate ? adoptedTemplateIds.includes(selectedTemplate.id) : false}
      />
    </>
  );
}

function TemplateListCard({
  title,
  tone,
  templates,
  adoptedIds,
  onView,
}: {
  title: string;
  tone: Tone;
  templates: EmploymentContractTemplate[];
  adoptedIds: string[];
  onView: (template: EmploymentContractTemplate) => void;
}) {
  return (
    <ListCard>
      <ListCardHeader
        tone={tone}
        title={title}
        meta={<Pill tone={tone}>{templates.length}</Pill>}
      />
      <ListBody>
        {templates.map((template) => {
          const isAdopted = adoptedIds.includes(template.id);
          return (
            <ListRow
              key={template.id}
              lead={<Avatar initials={getInitials(template.name)} />}
              title={template.name}
              subtitle={template.summary || `Version ${template.version}`}
              onClick={() => onView(template)}
              trailing={
                isAdopted ? (
                  <Pill tone="emerald">Used</Pill>
                ) : (
                  <Pill tone={categoryTone(template.category)}>View</Pill>
                )
              }
            />
          );
        })}
      </ListBody>
    </ListCard>
  );
}
