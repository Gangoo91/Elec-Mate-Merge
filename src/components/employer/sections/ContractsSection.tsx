import { useState, useMemo, useEffect } from 'react';
import { ContractViewer } from '@/components/employer/ContractViewer';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  PageFrame,
  PageHero,
  StatStrip,
  LoadingBlocks,
  PrimaryButton,
} from '@/components/employer/editorial';
import {
  frameClass,
  twoColClass,
  colClass,
  PanelTitle,
  Row,
  RowList,
  StatusPill,
  PlainEmpty,
  Segments,
  SearchField,
  FilterRow,
  HeroActions,
  heroBtn,
  Initials,
  plural,
} from '@/components/employer/pageParts/PageParts';
import {
  useContracts,
  useEmploymentContractTemplates,
  useAdoptedContractTemplateIds,
  useContractStats,
  useDeleteContract,
  type Contract,
  type EmploymentContractTemplate,
} from '@/hooks/useContracts';
import { Trash2 } from 'lucide-react';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { CONTRACTS_HELP } from '@/components/employer/help/people';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { SendContractSheet } from '@/components/employer/contracts/SendContractSheet';
import { CustomerTermsCard } from '@/components/employer/contracts/CustomerTermsCard';

type FilterTab = 'all' | 'active' | 'pending' | 'expired' | 'templates' | 'terms';

function getInitials(value?: string | null) {
  if (!value) return 'CT';
  // Letters only — "Demo Worker (test)" read "D(" before
  const parts = value
    .replace(/[^\p{L}\s]/gu, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2);
  if (parts.length === 0) return 'CT';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
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
  if (!d) return 'not set';
  const parsed = new Date(d);
  if (Number.isNaN(parsed.getTime())) return 'not set';
  return parsed.toLocaleDateString('en-GB');
}

export function ContractsSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [selectedTemplate, setSelectedTemplate] = useState<EmploymentContractTemplate | null>(null);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [contractToDelete, setContractToDelete] = useState<string | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);
  const [sendOpen, setSendOpen] = useState(false);
  const { data: roleInfo, isLoading: roleLoading } = useEmployerRole();
  const canSeeMoney = roleInfo?.canSeeMoney ?? false;

  const { data: systemTemplates = [], isLoading: templatesLoading } =
    useEmploymentContractTemplates();
  const { data: userContracts = [], isLoading: contractsLoading, error, refetch } = useContracts();

  // Deep link from a person's record: /employer?section=contracts&contract=<id>
  const [deepLinked, setDeepLinked] = useState(false);
  useEffect(() => {
    if (deepLinked || userContracts.length === 0) return;
    const id = new URLSearchParams(window.location.search).get('contract');
    const hit = id ? userContracts.find((c) => c.id === id) : null;
    if (hit) {
      setSelectedContract(hit);
      setSelectedTemplate(null);
      setViewerOpen(true);
    }
    setDeepLinked(true);
  }, [userContracts, deepLinked]);
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
      (c) => c.title.toLowerCase().includes(q) || (c.party_name?.toLowerCase().includes(q) ?? false)
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

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setContractToDelete(id);
  };

  const heroActions = (
    <HeroActions stretchFirst>
      {canSeeMoney && (
        <PrimaryButton
          data-help="contracts.send"
          className={heroBtn}
          onClick={() => setSendOpen(true)}
        >
          Send a contract
        </PrimaryButton>
      )}
      <PageHelpButton help={CONTRACTS_HELP} askContext={{ page: 'contracts', tab: activeTab }} />
    </HeroActions>
  );

  // Contracts carry pay, so they are owner/admin only (can_see_firm_money,
  // enforced in SQL). Office managers see the status on each person instead.
  if (!roleLoading && roleInfo && !canSeeMoney) {
    return (
      <PageFrame className={frameClass}>
        <PageHero
          title="Contracts"
          description="Contracts are for the owner and admins."
          actions={<PageHelpButton help={CONTRACTS_HELP} askContext={{ page: 'contracts' }} />}
        />
        <PlainEmpty text="A contract carries pay, so only the owner and admins open them. You can see whether someone has signed on their record in Team." />
      </PageFrame>
    );
  }

  if (error) {
    return (
      <PageFrame className={frameClass}>
        <PageHero title="Contracts" description="Contracts did not load." actions={heroActions} />
        <PlainEmpty
          text="Something went wrong fetching your contracts. Try again."
          action="Try again"
          onAction={() => refetch()}
        />
      </PageFrame>
    );
  }

  if (isLoading) {
    return (
      <PageFrame className={frameClass}>
        <PageHero title="Contracts" description="Loading contracts." actions={heroActions} />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  const liveTodo: string[] = [];
  if (pendingCount > 0) liveTodo.push(`${plural(pendingCount, 'contract')} awaiting signature`);
  if (expiringSoon > 0) liveTodo.push(`${expiringSoon} ending in 30 days`);
  const liveStanding =
    userContracts.length === 0
      ? 'No contracts sent yet. Send one from here or from a person in Team'
      : `${plural(activeCount, 'active contract')}`;
  const liveFirst = liveTodo.join(', ');
  const liveLine =
    liveTodo.length > 0
      ? `${liveFirst.charAt(0).toUpperCase()}${liveFirst.slice(1)}. ${liveStanding}.`
      : `${liveStanding}.`;

  const contractPill = (status?: string) => (
    <StatusPill
      tone={
        status === 'Active'
          ? 'green'
          : status === 'Expired' || status === 'Terminated'
            ? 'red'
            : status === 'Draft'
              ? 'volt'
              : 'neutral'
      }
    >
      {status === 'Draft' ? 'Awaiting signature' : (status ?? 'Contract')}
    </StatusPill>
  );

  const contractsPanel = (
    <section>
      <PanelTitle
        title="Your contracts"
        meta={visibleContracts.length > 0 ? `${visibleContracts.length}` : undefined}
      />
      {visibleContracts.length === 0 ? (
        <PlainEmpty
          text={
            searchQuery
              ? 'No contract matches that search.'
              : 'No contracts here yet. Send one with Send a contract, or from a person in Team. They sign on their phone and it is filed here and on their record.'
          }
        />
      ) : (
        <RowList>
          {visibleContracts.map((contract) => {
            const partyLabel = contract.party_name ?? contract.employee?.name ?? 'No name';
            const typeLabel = contract.title || contract.contract_type || 'Contract';
            const dateRange =
              contract.start_date || contract.end_date
                ? `${formatDate(contract.start_date)} to ${formatDate(contract.end_date)}`
                : 'Dates not set';
            return (
              <Row
                key={contract.id}
                lead={<Initials text={getInitials(partyLabel)} />}
                title={partyLabel}
                detail={`${typeLabel} · ${dateRange}`}
                onClick={() => handleViewContract(contract)}
                chevron={false}
                trailing={
                  <>
                    {contractPill(contract.status)}
                    <button
                      type="button"
                      onClick={(e) => handleDelete(contract.id, e)}
                      disabled={deleteContract.isPending}
                      aria-label="Delete contract"
                      title="Delete contract"
                      className="flex h-11 w-11 items-center justify-center rounded-full text-white transition-colors touch-manipulation hover:bg-white/[0.08] hover:text-red-400 disabled:opacity-50"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </>
                }
              />
            );
          })}
        </RowList>
      )}
    </section>
  );

  const templateGroups = [
    { title: 'Employment contracts', items: employmentTemplates },
    { title: 'Subcontractor agreements', items: subcontractorTemplates },
    { title: 'HR letters and documents', items: hrLettersTemplates },
  ].filter((g) => g.items.length > 0);

  const templateGroup = (g: (typeof templateGroups)[number]) => (
    <TemplateList
      key={g.title}
      title={g.title}
      templates={g.items}
      adoptedIds={adoptedTemplateIds}
      onView={handleViewTemplate}
    />
  );

  const noTemplates = filteredTemplates.length === 0 && (
    <PlainEmpty text="No template matches that search." />
  );

  return (
    <>
      <PageFrame className={frameClass}>
        <PageHero title="Contracts" description={liveLine} actions={heroActions} />

        <HowItWorks help={CONTRACTS_HELP} askContext={{ page: 'contracts', tab: activeTab }} />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Active', value: activeCount, onClick: () => setActiveTab('active') },
            {
              label: 'Awaiting signature',
              value: pendingCount,
              tone: pendingCount > 0 ? 'yellow' : undefined,
              onClick: () => setActiveTab('pending'),
            },
            {
              label: 'Ending in 30 days',
              value: expiringSoon,
              tone: expiringSoon > 0 ? 'yellow' : undefined,
              onClick: () => setActiveTab('active'),
            },
            {
              label: 'Templates',
              value: totalTemplates,
              sub: 'Ready to send',
              onClick: () => setActiveTab('templates'),
            },
          ]}
        />

        <FilterRow>
          <Segments
            wrap
            items={[
              { value: 'all', label: 'All', count: filteredUserContracts.length },
              { value: 'active', label: 'Active', count: activeCount },
              { value: 'pending', label: 'Awaiting signature', count: pendingCount },
              { value: 'expired', label: 'Ended', count: expiredCount },
              { value: 'templates', label: 'Templates', count: totalTemplates },
              { value: 'terms', label: 'Customer terms' },
            ]}
            value={activeTab}
            onChange={(v) => setActiveTab(v as FilterTab)}
          />
          {activeTab !== 'terms' && (
            <SearchField
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search contracts and templates"
              className="lg:w-80"
            />
          )}
        </FilterRow>

        {activeTab === 'terms' ? (
          <CustomerTermsCard canEdit={canSeeMoney} />
        ) : activeTab === 'templates' ? (
          <div className={twoColClass}>
            <div className={colClass}>
              {templateGroups[0] && templateGroup(templateGroups[0])}
              {noTemplates}
            </div>
            <div className={colClass}>{templateGroups.slice(1).map(templateGroup)}</div>
          </div>
        ) : (
          <div className={twoColClass}>
            <div className={colClass}>{contractsPanel}</div>
            <div className={colClass}>
              {activeTab === 'all' ? (
                <>
                  {templateGroups.map(templateGroup)}
                  {noTemplates}
                </>
              ) : (
                <section>
                  <PanelTitle
                    title="Templates"
                    action="All templates"
                    onAction={() => setActiveTab('templates')}
                  />
                  <PlainEmpty
                    text={`${plural(totalTemplates, 'template')} for employment, subcontractors and HR letters, ready to send.`}
                  />
                </section>
              )}
            </div>
          </div>
        )}

        <AlertDialog
          open={!!contractToDelete}
          onOpenChange={(open) => {
            if (!open) setContractToDelete(null);
          }}
        >
          <AlertDialogContent className="bg-[hsl(0_0%_8%)] border border-white/[0.08] text-white">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-white">Delete contract?</AlertDialogTitle>
              <AlertDialogDescription className="text-white">
                The contract will be permanently removed. This cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel className="h-11 touch-manipulation">Cancel</AlertDialogCancel>
              <AlertDialogAction
                className="h-11 touch-manipulation bg-red-500/90 hover:bg-red-500 text-white"
                onClick={async () => {
                  if (!contractToDelete) return;
                  setContractToDelete(null);
                  await deleteContract.mutateAsync(contractToDelete);
                }}
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </PageFrame>

      <ContractViewer
        open={viewerOpen}
        onOpenChange={setViewerOpen}
        template={selectedTemplate}
        // Prefer the live row from the query cache — selectedContract is a
        // snapshot and would show stale signing state after "Sign as employer"
        userContract={
          selectedContract
            ? (userContracts.find((c) => c.id === selectedContract.id) ?? selectedContract)
            : null
        }
        isAdopted={selectedTemplate ? adoptedTemplateIds.includes(selectedTemplate.id) : false}
      />

      {canSeeMoney && <SendContractSheet open={sendOpen} onOpenChange={setSendOpen} />}
    </>
  );
}

function TemplateList({
  title,
  templates,
  adoptedIds,
  onView,
}: {
  title: string;
  templates: EmploymentContractTemplate[];
  adoptedIds: string[];
  onView: (template: EmploymentContractTemplate) => void;
}) {
  return (
    <section>
      <PanelTitle title={title} meta={`${templates.length}`} />
      <RowList>
        {templates.map((template) => (
          <Row
            key={template.id}
            title={template.name}
            detail={template.summary || `Version ${template.version}`}
            onClick={() => onView(template)}
            trailing={
              adoptedIds.includes(template.id) ? (
                <StatusPill tone="green">Used</StatusPill>
              ) : undefined
            }
          />
        ))}
      </RowList>
    </section>
  );
}
