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

// 'templates' = unadopted system templates; 'review' = adopted policies past
// their review date. There is no acknowledgement tracking in the schema, so no
// tab or stat claims one.
type TabValue = 'active' | 'templates' | 'review';

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

  const availableTemplates = useMemo(
    () => templates.filter((t) => !adoptedTemplateIds.includes(t.id)),
    [templates, adoptedTemplateIds]
  );

  const activeCount = userPolicies.length;
  const reviewDueCount = reviewDuePolicies.length;
  const templateCount = availableTemplates.length;
  const adoptedPct =
    templates.length > 0
      ? Math.round((adoptedTemplateIds.length / templates.length) * 100)
      : 0;

  const matchesSearch = (s: string) =>
    s.toLowerCase().includes(search.toLowerCase());

  const filteredActive = useMemo(
    () => userPolicies.filter((p) => matchesSearch(p.name)),
    [userPolicies, search]
  );

  const filteredReviewDue = useMemo(
    () => reviewDuePolicies.filter((p) => matchesSearch(p.name)),
    [reviewDuePolicies, search]
  );

  const filteredTemplates = useMemo(
    () =>
      availableTemplates.filter(
        (t) => matchesSearch(t.name) || matchesSearch(t.category)
      ),
    [availableTemplates, search]
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
      <PrimaryButton onClick={() => setTab('templates')}>
        Browse templates
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
          description="Adopt templates, customise and manage your policy library."
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
      : tab === 'review'
        ? filteredReviewDue
        : [];

  return (
    <PageFrame>
      <PageHero
        eyebrow="HR & Safety"
        title="Policies"
        description="Adopt templates, customise and manage your policy library."
        tone="blue"
        actions={heroActions}
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Active', value: activeCount, tone: 'blue' },
          { label: 'Review due', value: reviewDueCount, tone: 'orange' },
          {
            label: 'Adopted %',
            value: `${adoptedPct}%`,
            tone: 'emerald',
            accent: true,
          },
          { label: 'Templates', value: templateCount, tone: 'amber' },
        ]}
      />

      <FilterBar
        tabs={[
          { value: 'active', label: 'Active', count: filteredActive.length },
          { value: 'templates', label: 'Templates', count: filteredTemplates.length },
          {
            value: 'review',
            label: 'Review due',
            count: filteredReviewDue.length,
          },
        ]}
        activeTab={tab}
        onTabChange={(v) => setTab(v as TabValue)}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search policies…"
      />

      {tab === 'templates' ? (
        filteredTemplates.length === 0 ? (
          <EmptyState
            title="No templates available"
            description="Every available template has been adopted. New templates will appear here when published."
          />
        ) : (
          <ListCard>
            <ListCardHeader
              tone="amber"
              title="Templates"
              meta={<Pill tone="amber">{filteredTemplates.length}</Pill>}
            />
            <ListBody>
              {filteredTemplates.map((t) => (
                <ListRow
                  key={t.id}
                  title={t.name}
                  subtitle={`v${t.version} · ${t.category}`}
                  trailing={<Pill tone="amber">Template</Pill>}
                  onClick={() => handleViewTemplate(t)}
                />
              ))}
            </ListBody>
          </ListCard>
        )
      ) : activeTabList.length === 0 ? (
        <EmptyState
          title={tab === 'active' ? 'No active policies' : 'No policies due for review'}
          description={
            tab === 'active'
              ? 'Adopt a template from the Templates tab to build your policy library.'
              : 'All adopted policies are within their review dates.'
          }
          action={tab === 'active' ? 'Browse templates' : undefined}
          onAction={tab === 'active' ? () => setTab('templates') : undefined}
        />
      ) : (
        <ListCard>
          <ListCardHeader
            tone="blue"
            title="Policies"
            meta={<Pill tone="blue">{activeTabList.length}</Pill>}
          />
          <ListBody>
            {activeTabList.map((p) => (
              <ListRow
                key={p.id}
                title={p.name}
                subtitle={`v${p.template?.version ?? '1'}${p.template?.category ? ` · ${p.template.category}` : ''} · updated ${formatDate(p.updated_at)}${p.review_date ? ` · review ${formatDate(p.review_date)}` : ''}`}
                trailing={
                  <Pill tone={statusTone(p.status)}>{p.status ?? 'Active'}</Pill>
                }
                onClick={() => handleViewUserPolicy(p)}
              />
            ))}
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
