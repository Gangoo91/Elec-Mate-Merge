import { useState, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { RefreshCw } from 'lucide-react';
import { PolicyViewer } from '@/components/employer/PolicyViewer';
import {
  PageFrame,
  PageHero,
  StatStrip,
  FilterBar,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  IconButton,
  EmptyState,
  LoadingBlocks,
  PrimaryButton,
  type Tone,
} from '@/components/employer/editorial';
import {
  usePolicyTemplates,
  useUserPolicies,
  useAdoptedTemplateIds,
  type PolicyTemplate,
  type UserPolicy,
} from '@/hooks/usePolicies';

type TabValue = 'active' | 'draft' | 'archived';

export function PoliciesSection() {
  const queryClient = useQueryClient();

  const [search, setSearch] = useState('');
  const [tab, setTab] = useState<TabValue>('active');
  const [selectedTemplate, setSelectedTemplate] = useState<PolicyTemplate | null>(null);
  const [selectedUserPolicy, setSelectedUserPolicy] = useState<UserPolicy | null>(null);
  const [viewerOpen, setViewerOpen] = useState(false);

  const { data: templates = [], isLoading: templatesLoading } = usePolicyTemplates();
  const { data: userPolicies = [], isLoading: userPoliciesLoading } = useUserPolicies();
  const { data: adoptedTemplateIds = [] } = useAdoptedTemplateIds();

  const isLoading = templatesLoading || userPoliciesLoading;

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['policyTemplates'] });
    queryClient.invalidateQueries({ queryKey: ['userPolicies'] });
  };

  const reviewDuePolicies = useMemo(
    () =>
      userPolicies.filter(
        (p) =>
          p.status === 'Review Due' ||
          (p.review_date && new Date(p.review_date) <= new Date())
      ),
    [userPolicies]
  );

  const draftTemplates = useMemo(
    () => templates.filter((t) => !adoptedTemplateIds.includes(t.id)),
    [templates, adoptedTemplateIds]
  );

  const activeCount = userPolicies.length;
  const awaitingCount = reviewDuePolicies.length;
  const draftCount = draftTemplates.length;
  const acknowledgedPct =
    templates.length > 0
      ? Math.round((adoptedTemplateIds.length / templates.length) * 100)
      : 0;

  const matchesSearch = (s: string) =>
    s.toLowerCase().includes(search.toLowerCase());

  const filteredActive = useMemo(
    () => userPolicies.filter((p) => matchesSearch(p.name)),
    [userPolicies, search]
  );

  const filteredArchived = useMemo(
    () => reviewDuePolicies.filter((p) => matchesSearch(p.name)),
    [reviewDuePolicies, search]
  );

  const filteredDrafts = useMemo(
    () =>
      draftTemplates.filter(
        (t) => matchesSearch(t.name) || matchesSearch(t.category)
      ),
    [draftTemplates, search]
  );

  const handleViewTemplate = (template: PolicyTemplate) => {
    setSelectedTemplate(template);
    setSelectedUserPolicy(null);
    setViewerOpen(true);
  };

  const handleViewUserPolicy = (policy: UserPolicy) => {
    setSelectedUserPolicy(policy);
    setSelectedTemplate(null);
    setViewerOpen(true);
  };

  const formatDate = (value?: string | null) => {
    if (!value) return 'never';
    try {
      const d = new Date(value);
      return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
    } catch {
      return 'never';
    }
  };

  const statusTone = (status?: string | null): Tone => {
    if (status === 'Active') return 'emerald';
    if (status === 'Review Due') return 'amber';
    return 'blue';
  };

  const heroActions = (
    <>
      <PrimaryButton
        onClick={() => {
          if (draftTemplates.length > 0) handleViewTemplate(draftTemplates[0]);
        }}
      >
        Upload policy
      </PrimaryButton>
      <IconButton onClick={refresh} aria-label="Refresh">
        <RefreshCw className="h-4 w-4" />
      </IconButton>
    </>
  );

  if (isLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="HR & Safety"
          title="Policies"
          description="Upload, version, distribute and track acknowledgements."
          tone="blue"
          actions={heroActions}
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  const activeTabList =
    tab === 'active'
      ? filteredActive
      : tab === 'archived'
        ? filteredArchived
        : [];

  return (
    <PageFrame>
      <PageHero
        eyebrow="HR & Safety"
        title="Policies"
        description="Upload, version, distribute and track acknowledgements."
        tone="blue"
        actions={heroActions}
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Active', value: activeCount, tone: 'blue' },
          { label: 'Awaiting ack', value: awaitingCount, tone: 'orange' },
          {
            label: 'Acknowledged %',
            value: `${acknowledgedPct}%`,
            tone: 'emerald',
            accent: true,
          },
          { label: 'Drafts', value: draftCount, tone: 'amber' },
        ]}
      />

      <FilterBar
        tabs={[
          { value: 'active', label: 'Active', count: filteredActive.length },
          { value: 'draft', label: 'Draft', count: filteredDrafts.length },
          {
            value: 'archived',
            label: 'Archived',
            count: filteredArchived.length,
          },
        ]}
        activeTab={tab}
        onTabChange={(v) => setTab(v as TabValue)}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search policies…"
      />

      {tab === 'draft' ? (
        filteredDrafts.length === 0 ? (
          <EmptyState
            title="No draft policies"
            description="Every available template has been adopted. New templates will appear here when published."
          />
        ) : (
          <ListCard>
            <ListCardHeader
              tone="amber"
              title="Drafts"
              meta={<Pill tone="amber">{filteredDrafts.length}</Pill>}
            />
            <ListBody>
              {filteredDrafts.map((t) => (
                <ListRow
                  key={t.id}
                  title={t.name}
                  subtitle={`v${t.version} · ${t.category} · template`}
                  trailing={<Pill tone="amber">Draft</Pill>}
                  onClick={() => handleViewTemplate(t)}
                />
              ))}
            </ListBody>
          </ListCard>
        )
      ) : activeTabList.length === 0 ? (
        <EmptyState
          title={
            tab === 'active' ? 'No active policies' : 'No policies awaiting acknowledgement'
          }
          description={
            tab === 'active'
              ? 'Adopt a template from the Draft tab to start tracking acknowledgements across your organisation.'
              : 'All adopted policies are up to date and acknowledged.'
          }
          action={tab === 'active' ? 'Browse drafts' : undefined}
          onAction={tab === 'active' ? () => setTab('draft') : undefined}
        />
      ) : (
        <ListCard>
          <ListCardHeader
            tone="blue"
            title="Policies"
            meta={<Pill tone="blue">{activeTabList.length}</Pill>}
          />
          <ListBody>
            {activeTabList.map((p) => {
              const total = userPolicies.length || 1;
              const acked = p.status === 'Active' ? total : 0;
              return (
                <ListRow
                  key={p.id}
                  title={p.name}
                  subtitle={`v${p.template?.version ?? '1'} · ${acked}/${total} acknowledged · updated ${formatDate(p.updated_at)}`}
                  trailing={
                    <Pill tone={statusTone(p.status)}>{p.status ?? 'Active'}</Pill>
                  }
                  onClick={() => handleViewUserPolicy(p)}
                />
              );
            })}
          </ListBody>
        </ListCard>
      )}

      <PolicyViewer
        open={viewerOpen}
        onOpenChange={setViewerOpen}
        template={selectedTemplate}
        userPolicy={selectedUserPolicy}
        isAdopted={
          selectedTemplate ? adoptedTemplateIds.includes(selectedTemplate.id) : false
        }
      />
    </PageFrame>
  );
}
