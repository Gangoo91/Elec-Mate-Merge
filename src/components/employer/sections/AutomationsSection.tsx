import { useState, useMemo } from 'react';
import { RefreshCw, Play } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import {
  useAutomationRules,
  useAutomationLogs,
  useAutomationStats,
  useToggleAutomation,
  useRunAutomation,
} from '@/hooks/useAutomations';
import {
  getCategoryInfo,
  getTriggerTypeInfo,
  type AutomationRule,
  type AutomationLog,
} from '@/services/automationService';
import { CreateAutomationRuleSheet } from '@/components/employer/dialogs/CreateAutomationRuleSheet';
import { useQueryClient } from '@tanstack/react-query';
import { formatDistanceToNow } from 'date-fns';
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

type RuleFilter = 'all' | 'active' | 'paused' | 'templates';

const triggerLabel = (rule: AutomationRule) => {
  const info = getTriggerTypeInfo(rule.trigger_type);
  return rule.trigger_config?.description || info.label;
};

const actionLabel = (rule: AutomationRule) => {
  if (!rule.actions || rule.actions.length === 0) return 'No actions';
  if (rule.actions.length === 1) return rule.actions[0].type.replace(/_/g, ' ');
  return `${rule.actions.length} actions`;
};

const categoryTone = (category: string): Tone => {
  switch (category) {
    case 'compliance':
      return 'orange';
    case 'jobs':
      return 'blue';
    case 'finance':
      return 'emerald';
    case 'hr':
      return 'purple';
    default:
      return 'indigo';
  }
};

const logStatusTone = (status: string): Tone => {
  if (status === 'success') return 'emerald';
  if (status === 'failed') return 'red';
  return 'amber';
};

export function AutomationsSection() {
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState<RuleFilter>('all');
  const [search, setSearch] = useState('');
  const [showCreateSheet, setShowCreateSheet] = useState(false);
  const [editingRule, setEditingRule] = useState<AutomationRule | null>(null);

  const { data: rules, isLoading: rulesLoading } = useAutomationRules();
  const { data: logs, isLoading: logsLoading } = useAutomationLogs({ limit: 50 });
  const { data: stats, isLoading: statsLoading } = useAutomationStats();
  const toggleMutation = useToggleAutomation();
  const runMutation = useRunAutomation();

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['automation-rules'] });
    queryClient.invalidateQueries({ queryKey: ['automation-logs'] });
    queryClient.invalidateQueries({ queryKey: ['automation-stats'] });
  };

  const filteredRules = useMemo(() => {
    if (!rules) return [];
    let list = rules;
    if (filter === 'active') list = list.filter((r) => r.is_active);
    else if (filter === 'paused') list = list.filter((r) => !r.is_active);
    else if (filter === 'templates') list = list.filter((r) => r.is_system);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(
        (r) =>
          r.name.toLowerCase().includes(q) ||
          (r.description ?? '').toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      );
    }
    return list;
  }, [rules, filter, search]);

  const counts = useMemo(() => {
    const all = rules?.length ?? 0;
    const active = rules?.filter((r) => r.is_active).length ?? 0;
    const paused = rules?.filter((r) => !r.is_active).length ?? 0;
    const templates = rules?.filter((r) => r.is_system).length ?? 0;
    return { all, active, paused, templates };
  }, [rules]);

  const recentFailures = useMemo(
    () => (logs ?? []).filter((l) => l.status === 'failed').length,
    [logs]
  );

  if (rulesLoading || statsLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Admin"
          title="Automations"
          description="Rules that fire on compliance, jobs, finance and HR events."
          tone="indigo"
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  return (
    <PageFrame>
      <PageHero
        eyebrow="Admin"
        title="Automations"
        description="Rules that fire on compliance, jobs, finance and HR events."
        tone="indigo"
        actions={
          <>
            <PrimaryButton
              onClick={() => {
                setEditingRule(null);
                setShowCreateSheet(true);
              }}
            >
              New rule
            </PrimaryButton>
            <IconButton onClick={refresh} aria-label="Refresh">
              <RefreshCw className="h-4 w-4" />
            </IconButton>
          </>
        }
      />

      <StatStrip
        columns={4}
        stats={[
          { label: 'Active rules', value: stats?.activeRules ?? 0, tone: 'emerald' },
          { label: 'Runs 30d', value: stats?.totalExecutions ?? 0, tone: 'indigo' },
          { label: 'Failed', value: recentFailures || stats?.failedExecutions || 0, tone: 'red' },
          { label: 'Templates', value: counts.templates, tone: 'blue' },
        ]}
      />

      <FilterBar
        tabs={[
          { value: 'all', label: 'All', count: counts.all },
          { value: 'active', label: 'Active', count: counts.active },
          { value: 'paused', label: 'Paused', count: counts.paused },
          { value: 'templates', label: 'Templates', count: counts.templates },
        ]}
        activeTab={filter}
        onTabChange={(v) => setFilter(v as RuleFilter)}
        search={search}
        onSearchChange={setSearch}
        searchPlaceholder="Search rules…"
      />

      <ListCard>
        <ListCardHeader
          tone="indigo"
          title="Rules"
          meta={<Pill tone="indigo">{filteredRules.length}</Pill>}
        />
        {filteredRules.length === 0 ? (
          <div className="p-2">
            <EmptyState
              title="No automation rules"
              description="Create a rule to fire on compliance, jobs, finance or HR events."
              action="New rule"
              onAction={() => {
                setEditingRule(null);
                setShowCreateSheet(true);
              }}
            />
          </div>
        ) : (
          <ListBody>
            {filteredRules.map((rule) => {
              const status = rule.is_active ? 'Active' : 'Paused';
              const statusTone: Tone = rule.is_active ? 'emerald' : 'amber';
              const categoryInfo = getCategoryInfo(rule.category);
              const last = rule.last_run_at
                ? `last ${formatDistanceToNow(new Date(rule.last_run_at), { addSuffix: true })}`
                : 'never run';
              return (
                <ListRow
                  key={rule.id}
                  accent={categoryTone(rule.category)}
                  title={
                    <span className="flex items-center gap-2">
                      <span className="truncate">{rule.name}</span>
                      {rule.is_system && (
                        <Pill tone="blue" className="shrink-0">
                          Template
                        </Pill>
                      )}
                    </span>
                  }
                  subtitle={`${categoryInfo.label} · ${triggerLabel(rule)} → ${actionLabel(rule)} · ${rule.run_count} runs · ${last}`}
                  trailing={
                    <>
                      {rule.trigger_type === 'schedule' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            runMutation.mutate(rule.id);
                          }}
                          disabled={runMutation.isPending || !rule.is_active}
                          aria-label="Run now"
                          className="h-9 w-9 rounded-full bg-white/[0.04] border border-white/[0.08] text-white flex items-center justify-center hover:bg-white/[0.08] transition-colors disabled:opacity-40 disabled:cursor-not-allowed touch-manipulation"
                        >
                          <Play className="h-3.5 w-3.5" />
                        </button>
                      )}
                      <Pill tone={statusTone}>{status}</Pill>
                      <div onClick={(e) => e.stopPropagation()}>
                        <Switch
                          checked={rule.is_active}
                          onCheckedChange={(checked) =>
                            toggleMutation.mutate({ id: rule.id, isActive: checked })
                          }
                          disabled={toggleMutation.isPending}
                        />
                      </div>
                    </>
                  }
                  onClick={() => {
                    setEditingRule(rule);
                    setShowCreateSheet(true);
                  }}
                />
              );
            })}
          </ListBody>
        )}
      </ListCard>

      <ListCard>
        <ListCardHeader
          tone="amber"
          title="Activity"
          meta={<Pill tone="amber">{logs?.length ?? 0}</Pill>}
        />
        {logsLoading ? (
          <div className="p-6">
            <LoadingBlocks />
          </div>
        ) : !logs || logs.length === 0 ? (
          <div className="p-2">
            <EmptyState
              title="No activity yet"
              description="Logs appear here once your automations run."
            />
          </div>
        ) : (
          <ListBody>
            {logs.slice(0, 25).map((log) => (
              <AutomationLogRow key={log.id} log={log} rules={rules ?? []} />
            ))}
          </ListBody>
        )}
      </ListCard>

      <CreateAutomationRuleSheet
        open={showCreateSheet}
        onOpenChange={(open) => {
          setShowCreateSheet(open);
          if (!open) setEditingRule(null);
        }}
      />
    </PageFrame>
  );
}

function AutomationLogRow({
  log,
  rules,
}: {
  log: AutomationLog;
  rules: AutomationRule[];
}) {
  const rule = rules.find((r) => r.id === log.rule_id);
  const successful = log.actions_taken?.filter((a) => a.success).length ?? 0;
  const total = log.actions_taken?.length ?? 0;
  const tone = logStatusTone(log.status);
  const sub = [
    `${log.records_processed} records`,
    `${successful}/${total} actions`,
    log.duration_ms ? `${log.duration_ms}ms` : null,
    formatDistanceToNow(new Date(log.executed_at), { addSuffix: true }),
  ]
    .filter(Boolean)
    .join(' · ');

  return (
    <ListRow
      accent={tone}
      title={rule?.name || 'Unknown rule'}
      subtitle={log.error_message ? `${sub} — ${log.error_message}` : sub}
      trailing={<Pill tone={tone}>{log.status}</Pill>}
    />
  );
}
