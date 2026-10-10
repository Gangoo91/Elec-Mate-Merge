/**
 * Jobs › Automations (ELE-1987).
 *
 * Ready-made "when this, do that" rules. Each is a sentence with a switch,
 * a live preview of what it would act on, who turned it on, and every run in
 * the log. The server runs them (triggers + a 10-minute tick) and enforces who
 * may switch on the customer and money rules; this screen reads and toggles.
 * Deep links: ?section=automations&rule=<key>, &tab=log.
 */
import { useMemo, useState } from 'react';
import { formatDistanceToNow, format } from 'date-fns';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Loader2,
  Mail,
  PauseCircle,
  PlayCircle,
  PoundSterling,
  Users,
  Building2,
} from 'lucide-react';
import { toast } from 'sonner';
import { PageFrame, PageHero, StatStrip, LoadingState } from '@/components/employer/editorial';
import {
  frameClass,
  twoColClass,
  colClass,
  panel,
  PanelTitle,
  HeroActions,
  HeroPrimary,
  HeroSecondary,
  StatusPill,
  PlainEmpty,
  Segments,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';
import { FormSheet } from '@/components/forms/FormSheet';
import { JobDoneSettingsPanel } from '@/components/employer/jobs/JobDoneSettingsPanel';
import { PageHelpButton, HowItWorks } from '@/components/hub/PageHelp';
import { AUTOMATIONS_HELP as HELP } from '@/components/employer/help/automations';
import { buttonPrimaryCn, buttonSecondaryCn } from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import {
  useEmployerAutomations,
  useSetAutomation,
  useSetAutomationsPaused,
  type AutomationRuleKey,
  type AutomationRun,
  type AutomationRunStatus,
  type EmployerAutomations,
} from '@/hooks/useEmployerAutomations';
import { ReviewRequestsSheet } from '@/components/employer/reviews/ReviewRequestsSheet';
import {
  RULES,
  RULE_BY_KEY,
  REACH_LABEL,
  MOVED_LABEL,
  isSensitive,
  type RuleCopy,
  type RuleReach,
} from '@/components/employer/automations/ruleCatalogue';
import { useChaseSettings } from '@/hooks/useGetPaid';

const REACH_ICON: Record<RuleReach, typeof Mail> = {
  customer: Mail,
  money: PoundSterling,
  team: Users,
  office: Building2,
};

const RUN_CHIP: Record<AutomationRunStatus, { label: string; tone: PillTone }> = {
  done: { label: 'Done', tone: 'green' },
  skipped: { label: 'Skipped', tone: 'neutral' },
  failed: { label: 'Failed', tone: 'red' },
  queued: { label: 'Waiting to send', tone: 'neutral' },
  sending: { label: 'Sending', tone: 'neutral' },
};

const when = (iso: string | null | undefined) =>
  iso ? formatDistanceToNow(new Date(iso), { addSuffix: true }) : '';
const day = (iso: string | null | undefined) => (iso ? format(new Date(iso), 'd MMM yyyy') : '');

/** "When a job is marked Complete, draft the invoice." */
function Sentence({ rule, size = 'md' }: { rule: RuleCopy; size?: 'md' | 'lg' }) {
  return (
    <p
      className={cn(
        'text-white leading-snug tracking-tight',
        size === 'lg' ? 'text-[20px] sm:text-[26px] lg:text-[30px]' : 'text-[16px] sm:text-[17px]'
      )}
    >
      When <span className="font-semibold">{rule.when}</span>,{' '}
      <span className="font-semibold">{rule.then}</span>.
    </p>
  );
}

function ReachTags({ rule }: { rule: RuleCopy }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {rule.reach.map((r) => {
        const Icon = REACH_ICON[r];
        return (
          <span
            key={r}
            className="inline-flex h-6 items-center gap-1 rounded-full border border-white/[0.16] px-2.5 text-[12px] font-semibold text-white"
          >
            <Icon className="h-3 w-3" aria-hidden />
            {REACH_LABEL[r]}
          </span>
        );
      })}
    </div>
  );
}

/** A 44px tap target holding a switch track. Solid yellow when on, never a tint. */
function RuleSwitch({
  on,
  disabled,
  busy,
  label,
  onToggle,
}: {
  on: boolean;
  disabled?: boolean;
  busy?: boolean;
  label: string;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={on}
      aria-label={label}
      disabled={disabled || busy}
      onClick={(e) => {
        e.stopPropagation();
        onToggle();
      }}
      className="-mr-1.5 inline-flex h-11 w-[60px] shrink-0 items-center justify-center rounded-full touch-manipulation disabled:cursor-not-allowed focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow"
    >
      <span
        className={cn(
          'relative inline-flex h-7 w-12 items-center rounded-full border transition-colors',
          on ? 'border-elec-yellow bg-elec-yellow' : 'border-white/[0.18] bg-white/[0.1]',
          disabled && !on && 'bg-white/[0.04]'
        )}
      >
        <span
          className={cn(
            'absolute h-5 w-5 rounded-full shadow transition-transform',
            on ? 'translate-x-[22px] bg-black' : 'translate-x-[3px] bg-white',
            disabled && !on && 'bg-white/50'
          )}
        >
          {busy && (
            <Loader2
              className={cn('h-5 w-5 animate-spin p-0.5', on ? 'text-elec-yellow' : 'text-black')}
            />
          )}
        </span>
      </span>
    </button>
  );
}

export function AutomationsSection() {
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const setParam = (patch: Record<string, string | null>) => {
    const next = new URLSearchParams(params);
    Object.entries(patch).forEach(([k, v]) => (v ? next.set(k, v) : next.delete(k)));
    setParams(next, { replace: true });
  };
  const tab = params.get('tab') === 'log' ? 'log' : 'rules';
  const openKey = params.get('rule') as AutomationRuleKey | null;

  const q = useEmployerAutomations();
  const setRule = useSetAutomation();
  const setPaused = useSetAutomationsPaused();
  const [busyKey, setBusyKey] = useState<AutomationRuleKey | null>(null);
  const [logFilter, setLogFilter] = useState<'all' | 'done' | 'attention'>('all');
  // Reviews are asked for in one place: Clients, Review requests (after payment).
  const [reviewsOpen, setReviewsOpen] = useState(false);

  const data = q.data;
  const stateByKey = useMemo(
    () => Object.fromEntries((data?.rules ?? []).map((r) => [r.key, r])),
    [data?.rules]
  );
  const onCount = (data?.rules ?? []).filter((r) => r.enabled).length;
  // A moved rule only counts while a firm still has it on.
  const ruleTotal = RULES.filter(
    (r) => !r.movedTo || (data?.rules ?? []).some((x) => x.key === r.key && x.enabled)
  ).length;
  // Gap §4.9: once Get paid's chasing schedule is on, the server skips the
  // old 14-day "Chase unpaid invoices" rule (ELE-2065), so it must not read
  // as active here.
  const { data: chase } = useChaseSettings(!!data?.can_manage_sensitive);
  const scheduleOn = !!chase?.invoice_enabled;
  const replacedBySchedule = (key: AutomationRuleKey) =>
    key === 'invoice_unpaid_reminder' && scheduleOn;
  const runs = data?.runs ?? [];
  const runs30 = runs.filter((r) => Date.now() - new Date(r.created_at).getTime() < 30 * 864e5);
  const stats = {
    done: runs30.filter((r) => r.status === 'done').length,
    skipped: runs30.filter((r) => r.status === 'skipped').length,
    failed: runs30.filter((r) => r.status === 'failed').length,
  };

  const toggle = async (rule: RuleCopy, next: boolean) => {
    // A moved rule is never switched on here; it points at where it lives now.
    if (next && rule.movedTo) {
      setReviewsOpen(true);
      return;
    }
    // Customer and money rules are confirmed in the sheet, never one stray tap.
    if (next && isSensitive(rule) && openKey !== rule.key) {
      setParam({ rule: rule.key });
      return;
    }
    setBusyKey(rule.key);
    try {
      await setRule.mutateAsync({ rule: rule.key, enabled: next });
      toast.success(next ? `${rule.name}: on` : `${rule.name}: off`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not change that rule');
    } finally {
      setBusyKey(null);
    }
  };

  const togglePaused = async () => {
    if (!data) return;
    try {
      await setPaused.mutateAsync(!data.paused);
      toast.success(data.paused ? 'Automations resumed' : 'All automations paused');
    } catch (e) {
      toast.error(e instanceof Error ? e.message : 'Could not change that');
    }
  };

  const openRule = openKey ? RULE_BY_KEY[openKey] : null;

  const liveLine = (() => {
    if (q.isLoading) return 'Loading automations.';
    if (!data) return 'Simple rules for the jobs you repeat every week.';
    if (data.paused) return `All automations are paused. Nothing runs until you resume them.`;
    if (!onCount)
      return 'No rules on yet. Each one is off until you turn it on, and everything it does is logged.';
    const tail: string[] = [];
    if (stats.failed) tail.push(`${stats.failed} failed`);
    if (stats.done) tail.push(`${stats.done} done in 30 days`);
    return `${onCount} of ${ruleTotal} rules on${tail.length ? `. ${tail.join(', ')}` : ''}.`;
  })();

  return (
    <PageFrame className={frameClass}>
      <PageHero
        title="Automations"
        description={liveLine}
        actions={
          <HeroActions>
            {data && data.paused && (
              <HeroPrimary
                onClick={togglePaused}
                disabled={setPaused.isPending}
                icon={
                  setPaused.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <PlayCircle className="h-4 w-4" />
                  )
                }
              >
                Resume all
              </HeroPrimary>
            )}
            {data && !data.paused && (
              <HeroSecondary
                label="Pause all"
                labelOnPhone
                onClick={togglePaused}
                disabled={setPaused.isPending}
                icon={
                  setPaused.isPending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <PauseCircle className="h-4 w-4" />
                  )
                }
              >
                Pause all
              </HeroSecondary>
            )}
            <PageHelpButton help={HELP} askContext={{ page: 'automations', tab }} />
          </HeroActions>
        }
      />
      <HowItWorks help={HELP} askContext={{ page: 'automations', tab }} />

      {q.isLoading ? (
        <LoadingState className="py-16" />
      ) : q.isError || !data ? (
        <PlainEmpty
          text={
            q.error instanceof Error && q.error.message.includes('Not allowed')
              ? 'Automations are for the owner and the office. Ask the owner if you need access.'
              : 'Automations would not load. Check your connection and try again.'
          }
          action="Try again"
          onAction={() => q.refetch()}
        />
      ) : (
        <>
          {data.paused && <StatusBar data={data} />}

          <StatStrip
            columns={4}
            stats={[
              {
                label: 'Rules on',
                value: `${onCount} of ${ruleTotal}`,
                onClick: () => setParam({ tab: null }),
              },
              {
                label: 'Done',
                value: stats.done,
                sub: 'Last 30 days',
                onClick: () => {
                  setLogFilter('done');
                  setParam({ tab: 'log' });
                },
              },
              {
                label: 'Skipped',
                value: stats.skipped,
                sub: 'Last 30 days',
                onClick: () => {
                  setLogFilter('attention');
                  setParam({ tab: 'log' });
                },
              },
              {
                label: 'Failed',
                value: stats.failed,
                tone: stats.failed ? 'red' : undefined,
                sub: 'Last 30 days',
                onClick: () => {
                  setLogFilter('attention');
                  setParam({ tab: 'log' });
                },
              },
            ]}
          />

          {/* Phones: one thing at a time. Desktop shows both side by side. */}
          <div className="lg:hidden">
            <Segments
              items={[
                { value: 'rules' as const, label: 'Rules' },
                {
                  value: 'log' as const,
                  label: `Run log${runs.length ? ` (${runs.length})` : ''}`,
                },
              ]}
              value={tab}
              onChange={(v) => setParam({ tab: v === 'rules' ? null : v })}
            />
          </div>

          <div className={twoColClass}>
            <section
              className={cn(colClass, tab === 'log' && 'hidden lg:block')}
              aria-label="Rules"
            >
              <div>
                <div className="hidden lg:block">
                  <PanelTitle title="Rules" meta={`${onCount} of ${ruleTotal} on`} />
                </div>
                <div className={cn(panel, 'overflow-hidden divide-y divide-white/[0.07]')}>
                  {RULES.map((rule) => {
                    const st = stateByKey[rule.key];
                    const on = !!st?.enabled;
                    const locked = isSensitive(rule) && !data.can_manage_sensitive && !on;
                    const preview = data.preview?.[rule.key];
                    const count = data.stats?.[rule.key]?.runs_30d ?? 0;
                    if (rule.movedTo && !on) {
                      return (
                        <article
                          key={rule.key}
                          className="flex items-start gap-3 px-4 py-3 sm:px-5"
                        >
                          <button
                            type="button"
                            onClick={() => setParam({ rule: rule.key })}
                            className="-mx-1 min-w-0 flex-1 rounded-xl px-1 py-1 text-left touch-manipulation hover:bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow"
                          >
                            <Sentence rule={rule} />
                            <p className="mt-1 text-[13px] leading-snug text-white">
                              Customers are now asked once, after they pay, so nobody is asked
                              twice.
                            </p>
                            <p className="mt-1 text-[13px] text-white">
                              <span className="font-semibold">
                                Moved to {MOVED_LABEL[rule.movedTo]}
                              </span>
                              {' · '}
                              {rule.reach.map((r) => REACH_LABEL[r]).join(', ')}
                            </p>
                          </button>
                          <button
                            type="button"
                            onClick={() => setReviewsOpen(true)}
                            className="h-11 shrink-0 rounded-full border border-white/[0.14] bg-white/[0.06] px-4 text-[13px] font-semibold text-white touch-manipulation hover:bg-white/[0.1]"
                          >
                            Open
                          </button>
                        </article>
                      );
                    }
                    return (
                      <article key={rule.key} className="flex items-start gap-3 px-4 py-3 sm:px-5">
                        <button
                          type="button"
                          onClick={() => setParam({ rule: rule.key })}
                          className="-mx-1 min-w-0 flex-1 rounded-xl px-1 py-1 text-left touch-manipulation hover:bg-white/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-elec-yellow"
                        >
                          <Sentence rule={rule} />
                          {preview?.line && (
                            <p className="mt-1 text-[13px] leading-snug text-white">
                              {preview.line}
                            </p>
                          )}
                          {rule.movedTo && (
                            <p className="mt-1 text-[13px] leading-snug text-white">
                              <span className="font-semibold">
                                Moved to {MOVED_LABEL[rule.movedTo]}.
                              </span>{' '}
                              Still working for you until you turn it off. Turn on{' '}
                              {MOVED_LABEL[rule.movedTo]} and this rule stands aside.
                            </p>
                          )}
                          <p className="mt-1 text-[13px] text-white">
                            <span
                              className={
                                on && !data.paused && !replacedBySchedule(rule.key)
                                  ? 'font-semibold text-elec-yellow'
                                  : undefined
                              }
                            >
                              {on && replacedBySchedule(rule.key)
                                ? 'Replaced by your chasing schedule'
                                : on && data.paused
                                  ? 'On, but paused with all automations'
                                  : on
                                    ? `On · by ${st?.changed_by ?? 'the office'}${st?.enabled_at || st?.changed_at ? `, ${day(st?.enabled_at ?? st?.changed_at)}` : ''}`
                                    : locked
                                      ? 'Off · owner or admin turns this on'
                                      : 'Off'}
                            </span>
                            {' · '}
                            {rule.reach.map((r) => REACH_LABEL[r]).join(', ')}
                            {count ? ` · ${count} run${count === 1 ? '' : 's'} in 30 days` : ''}
                          </p>
                        </button>
                        <RuleSwitch
                          on={on}
                          disabled={locked}
                          busy={busyKey === rule.key}
                          label={`${rule.name}: ${on ? 'on' : 'off'}`}
                          onToggle={() => toggle(rule, !on)}
                        />
                      </article>
                    );
                  })}
                </div>
                <p className="mt-3 text-[13px] leading-relaxed text-white">
                  Rules are checked every 10 minutes and the moment a job changes. Customer emails
                  wait two minutes first.
                </p>
              </div>
              {/* ELE-2068: who can close a job on site with Job done. Under the
                  rules on a phone, under the run log on desktop. */}
              <div className="lg:hidden">
                <JobDoneSettingsPanel
                  onOpenRule={(k) => setParam({ rule: k })}
                  onOpenReviews={() => setReviewsOpen(true)}
                />
              </div>
            </section>

            <section
              className={cn(colClass, tab !== 'log' && 'hidden lg:block')}
              aria-label="Run log"
            >
              <RunLog
                runs={runs}
                filter={logFilter}
                onFilter={setLogFilter}
                onOpenJob={(id) => navigate(`/employer?section=jobs&job=${id}`)}
                onOpenRule={(k) => setParam({ rule: k })}
              />
              <div className="hidden lg:block">
                <JobDoneSettingsPanel
                  onOpenRule={(k) => setParam({ rule: k })}
                  onOpenReviews={() => setReviewsOpen(true)}
                />
              </div>
            </section>
          </div>
        </>
      )}

      {openRule && data && (
        <RuleSheet
          rule={openRule}
          data={data}
          replacedBySchedule={replacedBySchedule(openRule.key)}
          busy={busyKey === openRule.key || setRule.isPending}
          onClose={() => setParam({ rule: null })}
          onSet={async (next) => {
            setBusyKey(openRule.key);
            try {
              await setRule.mutateAsync({ rule: openRule.key, enabled: next });
              toast.success(next ? `${openRule.name}: on` : `${openRule.name}: off`);
            } catch (e) {
              toast.error(e instanceof Error ? e.message : 'Could not change that rule');
            } finally {
              setBusyKey(null);
            }
          }}
          onOpenJob={(id) => navigate(`/employer?section=jobs&job=${id}`)}
          onOpenMoved={() => {
            setParam({ rule: null });
            setReviewsOpen(true);
          }}
        />
      )}
      <ReviewRequestsSheet open={reviewsOpen} onOpenChange={setReviewsOpen} />
    </PageFrame>
  );
}

function StatusBar({ data }: { data: EmployerAutomations }) {
  return (
    <div className={cn(panel, 'flex items-start gap-3 px-4 py-3 sm:px-5')}>
      <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-elec-yellow" aria-hidden />
      <p className="min-w-0 text-[14px] leading-relaxed text-white">
        Paused by {data.paused_by ?? 'the office'} {when(data.paused_at)}. Nothing runs, and
        anything waiting to send is cancelled.
      </p>
    </div>
  );
}

function RunRow({
  run,
  showRule = true,
  onOpenJob,
  onOpenRule,
}: {
  run: AutomationRun;
  showRule?: boolean;
  onOpenJob: (id: string) => void;
  onOpenRule?: (k: AutomationRuleKey) => void;
}) {
  const chip = RUN_CHIP[run.status] ?? {
    label: run.status || 'Unknown',
    tone: 'neutral' as PillTone,
  };
  const rule = RULE_BY_KEY[run.rule];
  return (
    <li className="px-4 py-3 sm:px-5">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          {showRule && rule && (
            <button
              type="button"
              onClick={() => onOpenRule?.(run.rule)}
              className="text-left text-[13px] font-semibold text-elec-yellow touch-manipulation"
            >
              {rule.name}
            </button>
          )}
          <p className="mt-0.5 text-[14px] leading-snug text-white">
            {run.summary || 'Working on it'}
          </p>
          <p className="mt-1 text-[13px] text-white">{when(run.finished_at ?? run.created_at)}</p>
        </div>
        <StatusPill tone={chip.tone}>{chip.label}</StatusPill>
      </div>
      {run.job_id && (
        <button
          type="button"
          onClick={() => onOpenJob(run.job_id!)}
          className="mt-2 inline-flex h-11 items-center rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-[13px] font-medium text-white touch-manipulation hover:bg-white/[0.08]"
        >
          Open job
        </button>
      )}
    </li>
  );
}

function RunLog({
  runs,
  filter,
  onFilter,
  onOpenJob,
  onOpenRule,
}: {
  runs: AutomationRun[];
  filter: 'all' | 'done' | 'attention';
  onFilter: (f: 'all' | 'done' | 'attention') => void;
  onOpenJob: (id: string) => void;
  onOpenRule: (k: AutomationRuleKey) => void;
}) {
  const list = runs.filter((r) =>
    filter === 'all'
      ? true
      : filter === 'done'
        ? r.status === 'done'
        : r.status === 'skipped' || r.status === 'failed'
  );
  return (
    <div>
      <PanelTitle title="Run log" meta="Last 60" />
      <Segments
        quiet
        className="mb-3 lg:w-full"
        items={[
          { value: 'all' as const, label: 'All' },
          { value: 'done' as const, label: 'Done' },
          { value: 'attention' as const, label: 'Skipped or failed' },
        ]}
        value={filter}
        onChange={onFilter}
      />
      {list.length === 0 ? (
        <PlainEmpty
          text={
            runs.length === 0
              ? 'When a rule does something, skips something or hits a problem, it is listed here with the reason.'
              : 'Nothing in this filter.'
          }
        />
      ) : (
        <ul
          className={cn(
            panel,
            'divide-y divide-white/[0.07] overflow-hidden lg:max-h-[70vh] lg:overflow-y-auto'
          )}
        >
          {list.map((r) => (
            <RunRow key={r.id} run={r} onOpenJob={onOpenJob} onOpenRule={onOpenRule} />
          ))}
        </ul>
      )}
    </div>
  );
}

function RuleSheet({
  rule,
  data,
  replacedBySchedule = false,
  busy,
  onClose,
  onSet,
  onOpenJob,
  onOpenMoved,
}: {
  rule: RuleCopy;
  data: EmployerAutomations;
  /** Gap §4.9: Get paid's chasing schedule is on, so this rule is skipped. */
  replacedBySchedule?: boolean;
  busy: boolean;
  onClose: () => void;
  onSet: (next: boolean) => Promise<void>;
  onOpenJob: (id: string) => void;
  /** Opens where a moved rule lives now (Review requests). */
  onOpenMoved: () => void;
}) {
  const st = data.rules.find((r) => r.key === rule.key);
  const on = !!st?.enabled;
  const sensitive = isSensitive(rule);
  const locked = sensitive && !data.can_manage_sensitive && !on;
  const preview = data.preview?.[rule.key];
  const mine = data.runs.filter((r) => r.rule === rule.key).slice(0, 6);
  const needsLink =
    !rule.movedTo && rule.key === 'job_complete_review_request' && preview?.ready === false;

  const facts: Array<[string, string]> = [
    [
      'Status',
      replacedBySchedule && on
        ? 'Replaced by your chasing schedule in Get paid'
        : rule.movedTo && !on
          ? `Moved to ${MOVED_LABEL[rule.movedTo]}`
          : data.paused && on
            ? 'On, but all automations are paused'
            : on
              ? 'On'
              : 'Off',
    ],
    ...(on
      ? ([
          [
            'Turned on by',
            `${st?.changed_by ?? 'the office'}${st?.enabled_at || st?.changed_at ? `, ${day(st?.enabled_at ?? st?.changed_at)}` : ''}`,
          ],
        ] as Array<[string, string]>)
      : []),
    ...(!on && st?.changed_by
      ? ([['Last changed', `${st.changed_by}, ${day(st.changed_at)}`]] as Array<[string, string]>)
      : []),
    ['Runs in the last 30 days', String(data.stats?.[rule.key]?.runs_30d ?? 0)],
  ];

  return (
    <FormSheet
      open
      onOpenChange={(o) => !o && onClose()}
      eyebrow="Automation"
      title={rule.name}
      width="wide"
      footer={
        <div className="flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className={cn(buttonSecondaryCn, 'flex-1 px-5 sm:w-auto sm:flex-none')}
          >
            Close
          </button>
          {rule.movedTo && on ? (
            <>
              <button
                type="button"
                disabled={busy}
                onClick={() => onSet(false)}
                className={cn(
                  buttonSecondaryCn,
                  'inline-flex flex-1 items-center justify-center gap-2 px-5 sm:w-auto sm:flex-none'
                )}
              >
                {busy && <Loader2 className="h-4 w-4 animate-spin" />}
                Turn off
              </button>
              <button
                type="button"
                onClick={onOpenMoved}
                className={cn(buttonPrimaryCn, 'flex-[2] px-5 sm:w-auto sm:flex-none')}
              >
                Open {MOVED_LABEL[rule.movedTo]}
              </button>
            </>
          ) : rule.movedTo ? (
            <button
              type="button"
              onClick={onOpenMoved}
              className={cn(buttonPrimaryCn, 'flex-[2] px-5 sm:w-auto sm:flex-none')}
            >
              Open {MOVED_LABEL[rule.movedTo]}
            </button>
          ) : locked ? (
            <button
              type="button"
              disabled
              className={cn(buttonPrimaryCn, 'flex-[2] px-5 sm:w-auto sm:flex-none')}
            >
              Owner or admin only
            </button>
          ) : (
            <button
              type="button"
              disabled={busy}
              onClick={() => onSet(!on)}
              className={cn(
                on ? buttonSecondaryCn : buttonPrimaryCn,
                'inline-flex flex-[2] items-center justify-center gap-2 px-5 sm:w-auto sm:flex-none'
              )}
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              {on
                ? 'Turn off'
                : sensitive && rule.reach.includes('customer')
                  ? 'Turn on and email customers'
                  : 'Turn on'}
            </button>
          )}
        </div>
      }
    >
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-10">
        <div className="space-y-5">
          <div className="-mx-4 border-y border-white/[0.12] bg-gradient-to-b from-white/[0.08] to-white/[0.03] px-4 py-5 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-6 sm:py-6">
            <ReachTags rule={rule} />
            <div className="mt-3">
              <Sentence rule={rule} size="lg" />
            </div>
            {preview?.line && (
              <p className="mt-4 border-t border-white/[0.1] pt-4 text-[14px] leading-relaxed text-white">
                <span className="font-semibold">Right now: </span>
                {preview.line}
              </p>
            )}
          </div>

          {needsLink && (
            <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-[13.5px] leading-relaxed text-white">
              No review link yet, so nothing would be sent. Add it under Settings, Business,
              Reviews.
            </div>
          )}
          {rule.movedTo && (
            <div className={cn(panel, 'px-4 py-3 text-[13.5px] leading-relaxed text-white')}>
              <span className="font-semibold">Moved to {MOVED_LABEL[rule.movedTo]}.</span> Reviews
              are now asked for in one place, Clients, {MOVED_LABEL[rule.movedTo]}: once, after the
              customer pays, the same way for every customer.
              {on
                ? ' This rule is still on and keeps working until you turn it off. While Review requests is on, it stands aside so nobody is asked twice.'
                : ' This rule can no longer be turned on here.'}
            </div>
          )}
          {sensitive && !on && !locked && !rule.movedTo && (
            <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-4 py-3 text-[13.5px] leading-relaxed text-white">
              {rule.reach.includes('customer')
                ? 'This rule emails your customers on your behalf. Read what it does, then confirm with the button below.'
                : 'This rule creates invoices. Read what it does, then confirm with the button below.'}
            </div>
          )}

          <div>
            <h3 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
              What happens
            </h3>
            <ol className="space-y-3">
              {rule.steps.map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-elec-yellow text-[13px] font-bold text-elec-yellow">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-[14px] leading-relaxed text-white">{s}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="border-t border-white/[0.1] pt-4">
            <h3 className="mb-2 text-[15px] font-semibold tracking-tight text-white">
              Safe by default
            </h3>
            <ul className="space-y-2">
              {rule.safety.map((s) => (
                <li key={s} className="flex gap-2.5 text-[14px] leading-relaxed text-white">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-white" aria-hidden />
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-5">
          <dl className="divide-y divide-white/[0.08] rounded-2xl border border-white/[0.1] bg-white/[0.04]">
            {facts.map(([k, v]) => (
              <div key={k} className="px-4 py-3">
                <dt className="text-[12px] font-medium text-white">{k}</dt>
                <dd className="mt-0.5 text-[15px] text-white">{v}</dd>
              </div>
            ))}
          </dl>
          <div>
            <h3 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
              Recent runs
            </h3>
            {mine.length === 0 ? (
              <p className="rounded-2xl border border-white/[0.08] bg-white/[0.03] px-4 py-4 text-[13.5px] leading-relaxed text-white">
                {on
                  ? 'Nothing yet. Runs appear here, on the job and in the audit log.'
                  : 'Turn it on and every run will be listed here.'}
              </p>
            ) : (
              <ul className="divide-y divide-white/[0.08] overflow-hidden rounded-2xl border border-white/[0.1] bg-white/[0.03]">
                {mine.map((r) => (
                  <RunRow key={r.id} run={r} showRule={false} onOpenJob={onOpenJob} />
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </FormSheet>
  );
}

export default AutomationsSection;
