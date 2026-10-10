import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { RefreshCw } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import {
  frameClass,
  HeroActions,
  HeroSecondary,
  ToolButton,
  StatusPill,
  Row,
  RowList,
  PanelTitle,
  PlainEmpty,
  Segments,
  SearchField,
} from '@/components/employer/pageParts/PageParts';
import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Pill,
  EmptyState,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  Field,
  FormCard,
  Divider,
  inputClass,
  textareaClass,
} from '@/components/employer/editorial';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import {
  ResponsiveFormModal,
  ResponsiveFormModalContent,
  ResponsiveFormModalHeader,
  ResponsiveFormModalTitle,
  ResponsiveFormModalBody,
  ResponsiveFormModalFooter,
} from '@/components/ui/responsive-form-modal';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  useJobFinancials,
  useCreateVariationOrder,
  useUpdateVariationOrderStatus,
  type VariationOrder,
} from '@/hooks/useJobFinancials';
import { useJobCostEntries, useJobFinanceList } from '@/hooks/useFinanceModel';
import {
  FINANCE_LABELS,
  formatGBP,
  formatGBPCompact,
  formatMargin,
  type JobFinance,
} from '@/lib/financeDefinitions';
import { RecordActualCostSheet } from './sheets/RecordActualCostSheet';
import { EditJobBudgetSheet } from './sheets/EditJobBudgetSheet';
import { VariationOrderDetailSheet } from './sheets/VariationOrderDetailSheet';
import { SetJobLabourSheet } from './sheets/SetJobLabourSheet';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { JOB_FINANCIALS_HELP } from '@/components/employer/help/finance-ops';
import { useJobProfitList } from '@/hooks/useJobProfit';
import { JobProfitBlock } from '@/components/employer/jobs/JobProfitBlock';
import { TeamCostRatesSheet } from '@/components/employer/jobs/TeamCostRatesSheet';

type FilterTab = 'all' | 'invoiced' | 'loss' | 'over_budget' | 'over_hours';

const COST_CATEGORY_LABEL: Record<string, string> = {
  labour_adjustment: 'Labour change',
  materials: 'Materials',
  equipment: 'Equipment',
  overheads: 'Overheads',
  other: 'Other',
};

/**
 * Job financials — per-job profit from the shared finance model
 * (get_job_finance). Revenue is what has been invoiced; contract value and
 * budget are shown separately. Labour comes from approved timesheets (with a
 * logged override), materials from purchase orders, expenses from approved
 * claims — the same maths as Reports and Accounts.
 */
export function JobFinancialsSection() {
  const { profile } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<FilterTab>('all');
  const [openJobId, setOpenJobId] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();

  const financeQuery = useJobFinanceList();
  // Hours vs quoted per job (ELE-1824) — same RPC family, same firm scope.
  const profitList = useJobProfitList();
  const hoursFor = (jobId: string) => profitList.data?.find((p) => p.jobId === jobId);
  const isOverHours = (jobId: string) => {
    const h = hoursFor(jobId);
    return !!h && h.quotedHours !== null && h.quotedHours > 0 && h.approvedHours > h.quotedHours;
  };
  const [showRates, setShowRates] = useState(false);
  const { data: roleInfo } = useEmployerRole();
  const budgetsQuery = useJobFinancials();
  const jobs = useMemo(() => financeQuery.data ?? [], [financeQuery.data]);
  const budgetRows = useMemo(() => budgetsQuery.data ?? [], [budgetsQuery.data]);
  const budgetFor = (jobId: string) => budgetRows.find((b) => b.job_id === jobId);

  const openJob = jobs.find((j) => j.jobId === openJobId) ?? null;
  const openBudget = openJobId ? budgetFor(openJobId) : undefined;
  const costLog = useJobCostEntries(openJobId ?? undefined);

  const [showAddVariation, setShowAddVariation] = useState<string | null>(null);
  const [variationDesc, setVariationDesc] = useState('');
  const [variationValue, setVariationValue] = useState('');
  const [showRecordCost, setShowRecordCost] = useState(false);
  const [showEditBudget, setShowEditBudget] = useState(false);
  const [showLabour, setShowLabour] = useState(false);
  const [showVariationSheet, setShowVariationSheet] = useState<VariationOrder | null>(null);

  const createVariationMutation = useCreateVariationOrder();
  const updateVariationStatusMutation = useUpdateVariationOrderStatus();

  // Deep link: ?job=<employer_jobs id> opens that job (from the job sheet,
  // Reports' job profitability list or the Jobs hub).
  useEffect(() => {
    const jobId = searchParams.get('job');
    if (!jobId || jobs.length === 0) return;
    if (jobs.some((j) => j.jobId === jobId)) setOpenJobId(jobId);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('job');
        return next;
      },
      { replace: true }
    );
  }, [searchParams, jobs, setSearchParams]);

  const refresh = () => {
    financeQuery.refetch();
    budgetsQuery.refetch();
    profitList.refetch();
  };

  const isOverBudget = (j: JobFinance) => j.budgetTotal > 0 && j.totalCosts > j.budgetTotal;

  const filtered = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return jobs.filter((j) => {
      if (q && !j.title.toLowerCase().includes(q) && !(j.client || '').toLowerCase().includes(q))
        return false;
      if (filterTab === 'invoiced') return j.invoiced > 0;
      if (filterTab === 'loss') return j.forecastProfit < 0;
      if (filterTab === 'over_budget') return isOverBudget(j);
      if (filterTab === 'over_hours') return isOverHours(j.jobId);
      return true;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [jobs, searchQuery, filterTab, profitList.data]);

  const totals = useMemo(() => {
    const invoiced = jobs.reduce((s, j) => s + j.invoiced, 0);
    const costs = jobs.reduce((s, j) => s + j.totalCosts, 0);
    const profit = invoiced - costs;
    return { invoiced, costs, profit, margin: invoiced > 0 ? (profit / invoiced) * 100 : null };
  }, [jobs]);

  const tabs: { value: FilterTab; label: string; count?: number }[] = [
    { value: 'all', label: 'All' },
    { value: 'invoiced', label: 'Invoiced', count: jobs.filter((j) => j.invoiced > 0).length },
    {
      value: 'loss',
      label: 'Losing money',
      count: jobs.filter((j) => j.forecastProfit < 0).length,
    },
    { value: 'over_budget', label: 'Over budget', count: jobs.filter(isOverBudget).length },
    {
      value: 'over_hours',
      label: 'Over quoted hours',
      count: jobs.filter((j) => isOverHours(j.jobId)).length,
    },
  ];

  const handleAddVariation = async () => {
    if (!showAddVariation || !variationDesc.trim()) return;
    await createVariationMutation.mutateAsync({
      job_id: showAddVariation,
      description: variationDesc,
      value: parseFloat(variationValue) || 0,
    });
    setShowAddVariation(null);
    setVariationDesc('');
    setVariationValue('');
  };

  const handleApproveVariation = (vo: VariationOrder) => {
    updateVariationStatusMutation.mutate({
      id: vo.id,
      status: 'Approved',
      approvedBy: profile?.full_name || 'Manager',
    });
  };

  // Live "Before you start" lines for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] =
    !financeQuery.isLoading && !financeQuery.error && jobs.length === 0
      ? [
          {
            text: 'No live jobs yet, so there is no profit to show.',
            fixLabel: 'Open jobs',
            onFix: () => setSearchParams({ section: 'jobs' }),
          },
        ]
      : [];
  const helpAsk = { page: 'financials', tab: filterTab };

  const lossCount = jobs.filter((j) => j.forecastProfit < 0).length;
  const overBudgetCount = jobs.filter(isOverBudget).length;
  // Same rule as the gate below: never put firm money in the header for a role
  // that can't see it, and never claim "no jobs" when the load failed.
  const moneyHiddenForLine =
    !roleInfo?.canSeeMoney || (financeQuery.data ?? []).some((j) => !j.moneyVisible);
  const liveLine = (() => {
    if (financeQuery.error) return "Couldn't load job financials.";
    if (financeQuery.isLoading) return 'Loading job financials.';
    if (moneyHiddenForLine) return "Each job's costs, labour and profit, for the owner and admins.";
    if (jobs.length === 0) return 'No live jobs yet, so there is no profit to show.';
    const head =
      totals.invoiced > 0
        ? `${formatGBPCompact(totals.invoiced)} invoiced, ${formatGBPCompact(totals.profit)} gross profit`
        : `${formatGBPCompact(totals.costs)} of costs and nothing invoiced yet`;
    const todo: string[] = [];
    if (lossCount) todo.push(`${lossCount} ${lossCount === 1 ? 'job' : 'jobs'} losing money`);
    if (overBudgetCount) todo.push(`${overBudgetCount} over budget`);
    return todo.length ? `${head}. ${todo.join(', ')}.` : `${head}.`;
  })();

  const hero = (
    <PageHero
      title="Job financials"
      description={liveLine}
      actions={
        <HeroActions>
          {(roleInfo?.canSeeMoney ?? false) && (
            <HeroSecondary
              data-help="jobfin.cost-rates"
              label="Cost rates"
              labelOnPhone
              onClick={() => setShowRates(true)}
            >
              Cost rates
            </HeroSecondary>
          )}
          <ToolButton
            label="Refresh"
            onClick={refresh}
            icon={
              <RefreshCw className={financeQuery.isFetching ? 'h-4 w-4 animate-spin' : 'h-4 w-4'} />
            }
          />
          <PageHelpButton help={JOB_FINANCIALS_HELP} blockers={helpBlockers} askContext={helpAsk} />
        </HeroActions>
      }
    />
  );

  if (financeQuery.error) {
    return (
      <PageFrame className={frameClass}>
        {hero}
        <EmptyState
          title="Couldn't load job financials"
          description={`Nothing is shown rather than a misleading £0. ${
            financeQuery.error instanceof Error ? financeQuery.error.message : ''
          }`}
          action="Try again"
          onAction={refresh}
        />
      </PageFrame>
    );
  }

  // Job profit, labour cost and budgets are owner/admin only (ELE-1831). The
  // server nulls them for office managers; show why instead of £0.
  const moneyHidden =
    (roleInfo ? !roleInfo.canSeeMoney : false) ||
    (financeQuery.data ?? []).some((j) => !j.moneyVisible);
  if (moneyHidden) {
    return (
      <PageFrame className={frameClass}>
        {hero}
        <EmptyState
          title="Job profit is for the owner and admins"
          description="Your role can see each job's invoices on the job sheet, but not its costs, labour or profit. Ask the owner to make you an admin if you need it."
          action="Why can't I see this?"
          onAction={() =>
            setSearchParams({
              section: 'settings',
              open: 'access',
              role: roleInfo?.role ?? 'office',
            })
          }
        />
      </PageFrame>
    );
  }

  if (financeQuery.isLoading) {
    return (
      <PageFrame className={frameClass}>
        {hero}
        <LoadingBlocks />
      </PageFrame>
    );
  }

  return (
    <PageFrame className={frameClass}>
      {hero}
      <HowItWorks help={JOB_FINANCIALS_HELP} blockers={helpBlockers} askContext={helpAsk} />

      <StatStrip
        columns={4}
        stats={[
          {
            label: FINANCE_LABELS.invoiced,
            value: formatGBPCompact(totals.invoiced),
            sub: 'Revenue',
          },
          {
            label: FINANCE_LABELS.costs,
            value: formatGBPCompact(totals.costs),
            sub: 'Labour, materials, expenses',
          },
          {
            label: FINANCE_LABELS.grossProfit,
            value: formatGBPCompact(totals.profit),
            sub: 'Invoiced less costs',
            tone: totals.profit < 0 ? 'red' : undefined,
          },
          {
            label: FINANCE_LABELS.margin,
            value: formatMargin(totals.margin),
            tone: totals.margin !== null && totals.margin <= 10 ? 'red' : undefined,
            sub: totals.margin === null ? 'Nothing invoiced yet' : 'Of invoiced',
          },
        ]}
      />

      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div data-help="jobfin.tabs">
          <Segments wrap items={tabs} value={filterTab} onChange={setFilterTab} />
        </div>
        <SearchField
          value={searchQuery}
          onChange={setSearchQuery}
          placeholder="Search jobs or clients"
          className="lg:w-72"
        />
      </div>

      {filtered.length === 0 ? (
        <PlainEmpty
          text={
            searchQuery
              ? 'No jobs match your search.'
              : 'Every live job appears here with its invoices, labour, materials and expenses.'
          }
        />
      ) : (
        <section data-help="jobfin.list">
          <PanelTitle title="Jobs" meta={`${filtered.length}`} />
          <RowList>
            {filtered.map((j) => (
              <Row
                key={j.jobId}
                title={j.title}
                meta={
                  isOverBudget(j) || isOverHours(j.jobId) ? (
                    <span>
                      {isOverBudget(j) && <span className="text-red-400">Over budget</span>}
                      {isOverBudget(j) && isOverHours(j.jobId) && ' · '}
                      {isOverHours(j.jobId) && (
                        <span className="text-elec-yellow">Over quoted hours</span>
                      )}
                    </span>
                  ) : undefined
                }
                detail={(() => {
                  const h = hoursFor(j.jobId);
                  const hours =
                    h && h.quotedHours !== null && h.quotedHours > 0
                      ? ` · ${h.approvedHours.toLocaleString('en-GB', { maximumFractionDigits: 1 })} of ${h.quotedHours.toLocaleString('en-GB', { maximumFractionDigits: 1 })} hrs`
                      : h && h.approvedHours > 0
                        ? ` · ${h.approvedHours.toLocaleString('en-GB', { maximumFractionDigits: 1 })} hrs`
                        : '';
                  const costs =
                    h && h.costLines === 0
                      ? 'no costs yet'
                      : `${formatGBPCompact(j.totalCosts)} costs`;
                  return `${j.client || 'No client'} · ${
                    j.invoiced > 0 ? `${formatGBPCompact(j.invoiced)} invoiced` : 'not invoiced'
                  } · ${costs}${hours}`;
                })()}
                trailing={
                  j.invoiced > 0 ? (
                    <StatusPill
                      tone={
                        j.marginPct !== null && j.marginPct <= 10
                          ? 'red'
                          : j.marginPct !== null && j.marginPct > 20
                            ? 'green'
                            : 'neutral'
                      }
                    >
                      {formatMargin(j.marginPct)}
                    </StatusPill>
                  ) : (
                    <StatusPill tone={j.forecastProfit < 0 ? 'red' : 'neutral'}>
                      {j.forecastMarginPct === null
                        ? 'No value'
                        : `${formatMargin(j.forecastMarginPct)} forecast`}
                    </StatusPill>
                  )
                }
                onClick={() => setOpenJobId(j.jobId)}
              />
            ))}
          </RowList>
        </section>
      )}

      <Sheet open={!!openJob} onOpenChange={(o) => !o && setOpenJobId(null)}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          {openJob && (
            <div className="flex flex-col h-full">
              <SheetHeader className="px-5 sm:px-6 lg:px-10 pt-5 pb-3 border-b border-white/[0.06]">
                <div className="text-[12px] font-semibold text-white text-left">Job profit</div>
                <SheetTitle className="text-white text-xl sm:text-2xl font-semibold tracking-tight text-left">
                  {openJob.title}
                </SheetTitle>
                <p className="text-[13px] text-white text-left">{openJob.client || 'No client'}</p>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-5 sm:px-6 lg:px-10 py-5">
                <div className="space-y-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-8 lg:space-y-0">
                  <div className="-mx-5 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5 lg:sticky lg:top-0">
                    <JobProfitBlock jobId={openJob.jobId} />
                  </div>
                  <div className="min-w-0 space-y-6">
                    <ListCard>
                      <ListCardHeader
                        tone="blue"
                        title="Value"
                        meta={<Pill tone="blue">Forecast</Pill>}
                      />
                      <ListBody>
                        <ListRow
                          title="Contract value"
                          subtitle={
                            openJob.acceptedQuotes > 0
                              ? 'Accepted quotes + approved variations'
                              : openJob.jobValue > 0
                                ? 'Job value + approved variations'
                                : openJob.quoted > 0
                                  ? 'Open quotes (none accepted yet)'
                                  : 'No quote or job value yet'
                          }
                          trailing={formatGBP(openJob.contractValue)}
                        />
                        {openJob.variationsApproved !== 0 && (
                          <ListRow
                            title="Of which approved variations"
                            trailing={formatGBP(openJob.variationsApproved)}
                          />
                        )}
                        <ListRow
                          title="Forecast profit"
                          subtitle={`On ${formatGBP(openJob.forecastRevenue)} · costs so far`}
                          trailing={
                            <Pill tone={openJob.forecastProfit >= 0 ? 'emerald' : 'red'}>
                              {formatGBP(openJob.forecastProfit)} ·{' '}
                              {formatMargin(openJob.forecastMarginPct)}
                            </Pill>
                          }
                        />
                        <ListRow
                          title="Budget"
                          subtitle="Your own plan. Not used for profit"
                          trailing={
                            openJob.budgetTotal > 0 ? formatGBP(openJob.budgetTotal) : 'Not set'
                          }
                          onClick={() => setShowEditBudget(true)}
                        />
                      </ListBody>
                    </ListCard>

                    <ListCard>
                      <ListCardHeader
                        tone="amber"
                        title="Costs"
                        meta={
                          isOverBudget(openJob) ? (
                            <Pill tone="red">Over budget</Pill>
                          ) : (
                            <Pill tone="amber">{formatGBP(openJob.totalCosts)}</Pill>
                          )
                        }
                      />
                      <ListBody>
                        <ListRow
                          title="Labour"
                          subtitle={
                            Math.abs(openJob.labourAdjustments) >= 0.005
                              ? `${openJob.labourHours.toLocaleString('en-GB', { maximumFractionDigits: 2 })} hrs approved (${formatGBP(openJob.labourTimesheets)}) · overridden`
                              : `${openJob.labourHours.toLocaleString('en-GB', { maximumFractionDigits: 2 })} hrs from approved timesheets, overtime included`
                          }
                          trailing={
                            <span className="tabular-nums text-white">
                              {formatGBP(openJob.labour)}
                              {openBudget && Number(openBudget.budget_labour) > 0 && (
                                <span className="block text-[11px] text-white text-right">
                                  of {formatGBP(Number(openBudget.budget_labour))}
                                </span>
                              )}
                            </span>
                          }
                          onClick={() => setShowLabour(true)}
                        />
                        <ListRow
                          title="Materials"
                          subtitle={
                            openJob.materialsCommitted > 0
                              ? `Purchase orders (${formatGBP(openJob.materialsCommitted)} not yet received) + manual`
                              : 'Purchase orders + materials recorded on the job'
                          }
                          trailing={
                            <span className="tabular-nums text-white">
                              {formatGBP(openJob.materials)}
                              {openBudget && Number(openBudget.budget_materials) > 0 && (
                                <span className="block text-[11px] text-white text-right">
                                  of {formatGBP(Number(openBudget.budget_materials))}
                                </span>
                              )}
                            </span>
                          }
                        />
                        <ListRow
                          title="Expenses"
                          subtitle="Approved and paid claims on this job"
                          trailing={formatGBP(openJob.expenses)}
                        />
                        <ListRow
                          title="Other"
                          subtitle="Equipment, overheads and other recorded costs"
                          trailing={formatGBP(openJob.otherCosts)}
                        />
                      </ListBody>
                    </ListCard>

                    <ListCard>
                      <ListCardHeader tone="emerald" title="Invoices" />
                      <ListBody>
                        <ListRow
                          title={FINANCE_LABELS.invoiced}
                          subtitle={`${openJob.invoiceCount} invoice${openJob.invoiceCount === 1 ? '' : 's'} sent, overdue or paid`}
                          trailing={formatGBP(openJob.invoiced)}
                        />
                        <ListRow
                          title="Paid"
                          trailing={
                            <span className="text-emerald-400 tabular-nums">
                              {formatGBP(openJob.paid)}
                            </span>
                          }
                        />
                        <ListRow
                          title={FINANCE_LABELS.outstanding}
                          subtitle={
                            openJob.overdue > 0
                              ? `${formatGBP(openJob.overdue)} overdue`
                              : undefined
                          }
                          trailing={
                            <span className="text-amber-400 tabular-nums">
                              {formatGBP(openJob.outstanding)}
                            </span>
                          }
                        />
                        {openJob.draftInvoiced > 0 && (
                          <ListRow
                            title="Draft invoices"
                            subtitle="Not sent, so not counted as revenue"
                            trailing={formatGBP(openJob.draftInvoiced)}
                          />
                        )}
                      </ListBody>
                    </ListCard>

                    {openBudget?.variation_orders && openBudget.variation_orders.length > 0 && (
                      <ListCard>
                        <ListCardHeader
                          tone="purple"
                          title="Variation orders"
                          meta={<Pill tone="purple">{openBudget.variation_orders.length}</Pill>}
                        />
                        <ListBody>
                          {openBudget.variation_orders.map((vo) => (
                            <ListRow
                              key={vo.id}
                              title={vo.description}
                              subtitle={new Date(vo.created_at).toLocaleDateString('en-GB')}
                              trailing={
                                <>
                                  <Pill
                                    tone={
                                      vo.status === 'Approved'
                                        ? 'emerald'
                                        : vo.status === 'Rejected'
                                          ? 'red'
                                          : 'amber'
                                    }
                                  >
                                    {vo.status}
                                  </Pill>
                                  <span className="text-[13px] font-semibold text-white tabular-nums">
                                    +{formatGBP(Number(vo.value))}
                                  </span>
                                  {vo.status === 'Pending' && (
                                    <PrimaryButton
                                      size="sm"
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        handleApproveVariation(vo);
                                      }}
                                      disabled={updateVariationStatusMutation.isPending}
                                    >
                                      Approve
                                    </PrimaryButton>
                                  )}
                                </>
                              }
                              onClick={() => setShowVariationSheet(vo)}
                            />
                          ))}
                        </ListBody>
                      </ListCard>
                    )}

                    {(costLog.data ?? []).length > 0 && (
                      <ListCard>
                        <ListCardHeader
                          tone="cyan"
                          title="Cost log"
                          meta={<Pill tone="cyan">{costLog.data?.length}</Pill>}
                        />
                        <ListBody>
                          {(costLog.data ?? []).map((e) => (
                            <ListRow
                              key={e.id}
                              title={
                                e.category === 'labour_adjustment'
                                  ? `Labour ${formatGBP(Number(e.previous_value ?? 0))} → ${formatGBP(Number(e.new_value ?? 0))}`
                                  : `${COST_CATEGORY_LABEL[e.category]}${e.note ? `: ${e.note}` : ''}`
                              }
                              subtitle={`${e.category === 'labour_adjustment' && e.note ? `${e.note} · ` : ''}${
                                e.created_by_name || 'Team member'
                              } · ${new Date(e.created_at).toLocaleDateString('en-GB')}`}
                              trailing={
                                <span className="tabular-nums text-white">
                                  {e.amount >= 0 ? '+' : ''}
                                  {formatGBP(e.amount)}
                                </span>
                              }
                            />
                          ))}
                        </ListBody>
                      </ListCard>
                    )}

                    <Divider />
                    <p className="text-[12px] text-white leading-relaxed">
                      Gross profit is invoiced less costs. The same maths as Reports and Accounts.
                      Labour is approved hours × each person's cost rate (else their pay rate, else
                      the firm default. See Cost rates), overtime included; change it with a reason
                      and the change is logged.
                    </p>
                  </div>
                </div>
              </div>

              <div className="border-t border-white/[0.06] px-5 sm:px-6 lg:px-10 py-4 grid grid-cols-2 gap-2 bg-[hsl(0_0%_10%)] pb-safe lg:flex lg:flex-row-reverse lg:justify-start [&>button]:lg:px-6">
                <PrimaryButton
                  data-help="jobfin.record-cost"
                  onClick={() => setShowRecordCost(true)}
                  className="h-11"
                >
                  Record cost
                </PrimaryButton>
                <SecondaryButton
                  data-help="jobfin.labour"
                  onClick={() => setShowLabour(true)}
                  className="h-11"
                >
                  Labour
                </SecondaryButton>
                <SecondaryButton
                  data-help="jobfin.edit-budget"
                  onClick={() => setShowEditBudget(true)}
                  className="h-11"
                >
                  Edit budget
                </SecondaryButton>
                <SecondaryButton
                  data-help="jobfin.add-variation"
                  onClick={() => setShowAddVariation(openJob.jobId)}
                  className="h-11"
                >
                  Add variation
                </SecondaryButton>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <ResponsiveFormModal
        open={!!showAddVariation}
        onOpenChange={(o) => !o && setShowAddVariation(null)}
      >
        <ResponsiveFormModalContent className="bg-[hsl(0_0%_10%)] border-white/[0.06] text-white">
          <ResponsiveFormModalHeader>
            <ResponsiveFormModalTitle className="text-white">
              Add variation order
            </ResponsiveFormModalTitle>
            <p className="text-[12.5px] text-white text-left">
              Once approved, a variation adds to the job's contract value.
            </p>
          </ResponsiveFormModalHeader>
          <ResponsiveFormModalBody className="pb-6">
            <FormCard>
              <Field label="Description">
                <Textarea
                  id="variation-desc"
                  placeholder="Describe the variation…"
                  value={variationDesc}
                  onChange={(e) => setVariationDesc(e.target.value)}
                  className={textareaClass}
                  rows={5}
                />
              </Field>
              <Field label="Value (£)">
                <Input
                  id="variation-value"
                  type="number"
                  inputMode="decimal"
                  placeholder="0"
                  value={variationValue}
                  onChange={(e) => setVariationValue(e.target.value)}
                  className={inputClass}
                />
              </Field>
            </FormCard>
          </ResponsiveFormModalBody>
          <ResponsiveFormModalFooter className="flex flex-row gap-3">
            <SecondaryButton onClick={() => setShowAddVariation(null)} fullWidth>
              Cancel
            </SecondaryButton>
            <PrimaryButton
              onClick={handleAddVariation}
              disabled={!variationDesc.trim() || createVariationMutation.isPending}
              fullWidth
            >
              {createVariationMutation.isPending ? 'Adding…' : 'Add variation'}
            </PrimaryButton>
          </ResponsiveFormModalFooter>
        </ResponsiveFormModalContent>
      </ResponsiveFormModal>

      <RecordActualCostSheet
        open={showRecordCost}
        onOpenChange={setShowRecordCost}
        jobId={openJob?.jobId || ''}
        jobTitle={openJob?.title}
      />

      <TeamCostRatesSheet open={showRates} onOpenChange={setShowRates} />

      <SetJobLabourSheet open={showLabour} onOpenChange={setShowLabour} job={openJob} />

      <EditJobBudgetSheet
        open={showEditBudget}
        onOpenChange={setShowEditBudget}
        // Only query the budget row while the sheet is open.
        jobId={showEditBudget ? openJob?.jobId || '' : ''}
        jobTitle={openJob?.title}
      />

      <VariationOrderDetailSheet
        open={!!showVariationSheet}
        onOpenChange={() => setShowVariationSheet(null)}
        variationOrder={showVariationSheet}
        jobTitle={openJob?.title}
      />
    </PageFrame>
  );
}
