import { useState, useMemo } from 'react';
import { RefreshCw } from 'lucide-react';
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
  EmptyState,
  LoadingBlocks,
  IconButton,
  PrimaryButton,
  SecondaryButton,
  Field,
  FormCard,
  inputClass,
  textareaClass,
  type Tone,
} from '@/components/employer/editorial';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  useJobFinancials,
  useJobFinancialStats,
  useCreateVariationOrder,
  useUpdateVariationOrderStatus,
  type JobFinancialWithJob,
  type VariationOrder,
} from '@/hooks/useJobFinancials';
import { RecordActualCostSheet } from './sheets/RecordActualCostSheet';
import { EditJobBudgetSheet } from './sheets/EditJobBudgetSheet';
import { VariationOrderDetailSheet } from './sheets/VariationOrderDetailSheet';
import { useQueryClient, useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

type FilterTab = 'all' | 'profitable' | 'over_budget';

const formatCurrency = (n: number) => `£${Math.round(n).toLocaleString()}`;
const formatK = (n: number) => `£${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}k`;

const marginToneFor = (margin: number): Tone => {
  if (margin > 20) return 'emerald';
  if (margin > 10) return 'amber';
  return 'red';
};

export function JobFinancialsSection() {
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState<FilterTab>('all');
  const [openDetail, setOpenDetail] = useState<JobFinancialWithJob | null>(null);

  // job_financials.invoiced/paid are never maintained by any writer, so derive
  // the open job's payment status live from its linked invoices instead.
  const { data: jobInvoiceTotals } = useQuery({
    queryKey: ['job-invoice-totals', openDetail?.job_id],
    enabled: !!openDetail?.job_id,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('employer_invoices')
        .select('amount, status')
        .eq('job_id', openDetail!.job_id);
      if (error) throw error;
      const invoiced = (data || []).reduce((sum, inv) => sum + Number(inv.amount || 0), 0);
      const paid = (data || [])
        .filter((inv) => inv.status === 'Paid')
        .reduce((sum, inv) => sum + Number(inv.amount || 0), 0);
      return { invoiced, paid };
    },
  });
  const invoicedValue = jobInvoiceTotals?.invoiced ?? 0;
  const paidValue = jobInvoiceTotals?.paid ?? 0;

  const [showAddVariation, setShowAddVariation] = useState<string | null>(null);
  const [variationDesc, setVariationDesc] = useState('');
  const [variationValue, setVariationValue] = useState('');

  const [showRecordCostSheet, setShowRecordCostSheet] = useState<{
    jobId: string;
    jobTitle: string;
  } | null>(null);
  const [showEditBudgetSheet, setShowEditBudgetSheet] = useState<{
    jobId: string;
    jobTitle: string;
  } | null>(null);
  const [showVariationSheet, setShowVariationSheet] = useState<{
    vo: VariationOrder;
    jobTitle: string;
  } | null>(null);

  const { data: financials = [], isLoading, refetch, isFetching } = useJobFinancials();
  const stats = useJobFinancialStats();
  const createVariationMutation = useCreateVariationOrder();
  const updateVariationStatusMutation = useUpdateVariationOrderStatus();

  const refresh = () => {
    refetch();
    queryClient.invalidateQueries({ queryKey: ['jobFinancials'] });
  };

  const filteredFinancials = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return financials.filter((fin) => {
      const matchesSearch =
        !q ||
        fin.job?.title?.toLowerCase().includes(q) ||
        fin.job?.client?.toLowerCase().includes(q);
      if (!matchesSearch) return false;

      const margin = Number(fin.margin);
      const isOver = Number(fin.actual_total) > Number(fin.budget_total);

      if (filterTab === 'profitable') return margin > 10;
      if (filterTab === 'over_budget') return isOver;
      return true;
    });
  }, [financials, searchQuery, filterTab]);

  const tabs = useMemo(
    () => [
      { value: 'all', label: 'All', count: financials.length },
      {
        value: 'profitable',
        label: 'Profitable',
        count: financials.filter((f) => Number(f.margin) > 10).length,
      },
      {
        value: 'over_budget',
        label: 'Over Budget',
        count: financials.filter(
          (f) => Number(f.actual_total) > Number(f.budget_total)
        ).length,
      },
    ],
    [financials]
  );

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
      approvedBy: 'Admin',
    });
  };

  if (isLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Money"
          title="Job Financials"
          description="Per-job P&L — budget vs actual, labour vs materials."
          tone="emerald"
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  // Fold committed PO spend into the headline so it matches the per-job forecast.
  const totalCommitted = financials.reduce((s, f) => s + Number(f.committed_materials || 0), 0);
  const profit = stats.totalBudget - stats.totalActual - totalCommitted;
  const forecastMarginPct = stats.totalBudget > 0 ? (profit / stats.totalBudget) * 100 : 0;

  return (
    <PageFrame>
      <PageHero
        eyebrow="Money"
        title="Job Financials"
        description="Per-job P&L — budget vs actual, labour vs materials."
        tone="emerald"
        actions={
          <IconButton onClick={refresh} aria-label="Refresh">
            <RefreshCw className={isFetching ? 'h-4 w-4 animate-spin' : 'h-4 w-4'} />
          </IconButton>
        }
      />

      <StatStrip
        columns={4}
        stats={[
          {
            label: 'Budgeted £',
            value: formatK(stats.totalBudget),
            tone: 'emerald',
          },
          {
            label: 'Spent £',
            value: formatK(stats.totalActual),
            tone: 'amber',
          },
          {
            label: 'Forecast margin £',
            value: formatK(profit),
            accent: true,
          },
          {
            label: 'Margin %',
            value: `${forecastMarginPct.toFixed(1)}%`,
            tone: marginToneFor(forecastMarginPct),
          },
        ]}
      />

      <FilterBar
        tabs={tabs}
        activeTab={filterTab}
        onTabChange={(v) => setFilterTab(v as FilterTab)}
        search={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder="Search jobs or clients…"
      />

      {filteredFinancials.length === 0 ? (
        <EmptyState
          title="No job financials"
          description={
            searchQuery
              ? 'No jobs match your search criteria.'
              : 'Create jobs to start tracking financials. Financial tracking is automatically created for each job.'
          }
        />
      ) : (
        <ListCard>
          <ListCardHeader
            tone="emerald"
            title="Jobs P&L"
            meta={<Pill tone="emerald">{filteredFinancials.length}</Pill>}
          />
          <ListBody>
            {filteredFinancials.map((fin) => {
              const revenue = Number(fin.budget_total);
              const committed = Number(fin.committed_materials || 0);
              const forecastCost = Number(fin.actual_total) + committed;
              // Forecast margin folds in committed PO spend, not just booked actuals.
              const margin =
                revenue > 0 ? ((revenue - forecastCost) / revenue) * 100 : Number(fin.margin);
              const isOver = forecastCost > revenue;

              return (
                <ListRow
                  key={fin.id}
                  title={fin.job?.title || 'Untitled Job'}
                  subtitle={`${fin.job?.client || 'No client'} · rev ${formatCurrency(revenue)} · cost ${formatCurrency(forecastCost)}${committed > 0 ? ` (inc ${formatCurrency(committed)} committed)` : ''}`}
                  trailing={
                    <>
                      {isOver && <Pill tone="red">Over</Pill>}
                      <Pill tone={marginToneFor(margin)}>{margin.toFixed(0)}%</Pill>
                    </>
                  }
                  onClick={() => setOpenDetail(fin)}
                />
              );
            })}
          </ListBody>
        </ListCard>
      )}

      <Sheet open={!!openDetail} onOpenChange={(o) => !o && setOpenDetail(null)}>
        <SheetContent
          side="bottom"
          className="h-[90vh] p-0 rounded-t-2xl overflow-hidden bg-[hsl(0_0%_10%)] border-white/[0.06]"
        >
          {openDetail && (
            <div className="flex flex-col h-full">
              <SheetHeader className="px-5 sm:px-6 pt-5 pb-3 border-b border-white/[0.06]">
                <div className="text-[10px] font-medium uppercase tracking-[0.18em] text-white">
                  Job P&L
                </div>
                <SheetTitle className="text-white text-xl sm:text-2xl font-semibold tracking-tight text-left">
                  {openDetail.job?.title || 'Untitled Job'}
                </SheetTitle>
                <p className="text-[13px] text-white text-left">
                  {openDetail.job?.client || 'No client'}
                </p>
              </SheetHeader>

              <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5 space-y-6">
                {(() => {
                  const revenue = Number(openDetail.budget_total);
                  const actual = Number(openDetail.actual_total);
                  const committed = Number(openDetail.committed_materials || 0);
                  const forecastCost = actual + committed;
                  const forecastMarginPct =
                    revenue > 0 ? ((revenue - forecastCost) / revenue) * 100 : 0;
                  // Stacked budget bar: spent (amber) + committed (blue) vs budget.
                  const spentPct = revenue > 0 ? Math.min((actual / revenue) * 100, 100) : 0;
                  const committedPct =
                    revenue > 0 ? Math.min((committed / revenue) * 100, 100 - spentPct) : 0;
                  const overBudget = forecastCost > revenue && revenue > 0;
                  return (
                    <div className="space-y-3">
                      <StatStrip
                        columns={4}
                        stats={[
                          { label: 'Revenue £', value: formatK(revenue), tone: 'emerald' },
                          { label: 'Cost £', value: formatK(actual), tone: 'amber' },
                          {
                            label: 'Committed £',
                            value: committed > 0 ? formatK(committed) : '£0',
                            tone: committed > 0 ? 'blue' : undefined,
                          },
                          {
                            label: 'Forecast margin',
                            value: `${forecastMarginPct.toFixed(0)}%`,
                            tone: marginToneFor(forecastMarginPct),
                            accent: true,
                          },
                        ]}
                      />
                      {revenue > 0 && (committed > 0 || actual > 0) && (
                        <div className="space-y-2">
                          <div className="h-2.5 w-full rounded-full bg-white/[0.06] overflow-hidden flex">
                            <div
                              className={`h-full ${overBudget ? 'bg-red-500' : 'bg-amber-400'}`}
                              style={{ width: `${spentPct}%` }}
                            />
                            <div
                              className="h-full bg-blue-400/80"
                              style={{ width: `${committedPct}%` }}
                            />
                          </div>
                          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-white/60">
                            <span className="inline-flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-amber-400" />
                              {formatCurrency(actual)} spent
                            </span>
                            {committed > 0 && (
                              <span className="inline-flex items-center gap-1.5">
                                <span className="h-2 w-2 rounded-full bg-blue-400/80" />
                                {formatCurrency(committed)} on PO
                              </span>
                            )}
                            <span className="inline-flex items-center gap-1.5">
                              <span className="h-2 w-2 rounded-full bg-white/20" />
                              {formatCurrency(Math.max(revenue - forecastCost, 0))} left
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })()}

                <ListCard>
                  <ListCardHeader
                    tone="emerald"
                    title="Breakdown by category"
                    meta={
                      <Pill
                        tone={
                          openDetail.status === 'On Budget'
                            ? 'emerald'
                            : openDetail.status === 'Over Budget'
                              ? 'red'
                              : 'amber'
                        }
                      >
                        {openDetail.status}
                      </Pill>
                    }
                  />
                  <ListBody>
                    {[
                      {
                        label: 'Labour',
                        budget: Number(openDetail.budget_labour),
                        actual: Number(openDetail.actual_labour),
                        committed: 0,
                      },
                      {
                        label: 'Materials',
                        budget: Number(openDetail.budget_materials),
                        actual: Number(openDetail.actual_materials),
                        committed: Number(openDetail.committed_materials || 0),
                      },
                      {
                        label: 'Equipment',
                        budget: Number(openDetail.budget_equipment),
                        actual: Number(openDetail.actual_equipment),
                        committed: 0,
                      },
                      {
                        label: 'Overheads',
                        budget: Number(openDetail.budget_overheads),
                        actual: Number(openDetail.actual_overheads),
                        committed: 0,
                      },
                    ].map((row) => {
                      const effective = row.actual + row.committed;
                      const pct = row.budget > 0 ? (effective / row.budget) * 100 : 0;
                      const over = pct > 100;
                      return (
                        <ListRow
                          key={row.label}
                          title={row.label}
                          subtitle={
                            row.committed > 0
                              ? `${formatCurrency(row.actual)} spent + ${formatCurrency(row.committed)} on PO of ${formatCurrency(row.budget)}`
                              : `${formatCurrency(row.actual)} of ${formatCurrency(row.budget)}`
                          }
                          trailing={
                            <Pill tone={over ? 'red' : pct > 80 ? 'amber' : 'emerald'}>
                              {pct.toFixed(0)}%
                            </Pill>
                          }
                        />
                      );
                    })}
                  </ListBody>
                </ListCard>

                <ListCard>
                  <ListCardHeader tone="amber" title="Payment status" />
                  <ListBody>
                    <ListRow
                      title="Total value"
                      trailing={
                        <span className="text-[13px] font-semibold text-white tabular-nums">
                          {formatCurrency(Number(openDetail.budget_total))}
                        </span>
                      }
                    />
                    <ListRow
                      title="Invoiced"
                      trailing={
                        <span className="text-[13px] font-semibold text-white tabular-nums">
                          {formatCurrency(invoicedValue)}
                        </span>
                      }
                    />
                    <ListRow
                      title="Paid"
                      trailing={
                        <span className="text-[13px] font-semibold text-emerald-400 tabular-nums">
                          {formatCurrency(paidValue)}
                        </span>
                      }
                    />
                    {invoicedValue - paidValue > 0 && (
                      <ListRow
                        title="Outstanding"
                        trailing={
                          <span className="text-[13px] font-semibold text-amber-400 tabular-nums">
                            {formatCurrency(invoicedValue - paidValue)}
                          </span>
                        }
                      />
                    )}
                  </ListBody>
                </ListCard>

                {openDetail.variation_orders && openDetail.variation_orders.length > 0 && (
                  <ListCard>
                    <ListCardHeader
                      tone="purple"
                      title="Variation orders"
                      meta={<Pill tone="purple">{openDetail.variation_orders.length}</Pill>}
                    />
                    <ListBody>
                      {openDetail.variation_orders.map((vo) => (
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
                                +{formatCurrency(Number(vo.value))}
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
                          onClick={() =>
                            setShowVariationSheet({
                              vo,
                              jobTitle: openDetail.job?.title || 'Untitled Job',
                            })
                          }
                        />
                      ))}
                    </ListBody>
                  </ListCard>
                )}
              </div>

              <div className="border-t border-white/[0.06] px-5 sm:px-6 py-4 flex flex-wrap gap-2 bg-[hsl(0_0%_10%)]">
                <PrimaryButton
                  onClick={() =>
                    setShowRecordCostSheet({
                      jobId: openDetail.job_id,
                      jobTitle: openDetail.job?.title || 'Untitled Job',
                    })
                  }
                >
                  Record cost
                </PrimaryButton>
                <SecondaryButton
                  onClick={() =>
                    setShowEditBudgetSheet({
                      jobId: openDetail.job_id,
                      jobTitle: openDetail.job?.title || 'Untitled Job',
                    })
                  }
                >
                  Edit budget
                </SecondaryButton>
                <SecondaryButton onClick={() => setShowAddVariation(openDetail.job_id)}>
                  Add variation
                </SecondaryButton>
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>

      <Dialog open={!!showAddVariation} onOpenChange={() => setShowAddVariation(null)}>
        <DialogContent className="bg-[hsl(0_0%_10%)] border-white/[0.06] text-white">
          <DialogHeader>
            <DialogTitle className="text-white">Add variation order</DialogTitle>
            <DialogDescription className="text-white">
              Add a variation to adjust the job scope and budget.
            </DialogDescription>
          </DialogHeader>
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
                placeholder="0"
                value={variationValue}
                onChange={(e) => setVariationValue(e.target.value)}
                className={inputClass}
              />
            </Field>
          </FormCard>
          <DialogFooter className="flex flex-row gap-2">
            <SecondaryButton onClick={() => setShowAddVariation(null)}>
              Cancel
            </SecondaryButton>
            <PrimaryButton
              onClick={handleAddVariation}
              disabled={!variationDesc.trim() || createVariationMutation.isPending}
            >
              {createVariationMutation.isPending ? 'Adding…' : 'Add variation'}
            </PrimaryButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <RecordActualCostSheet
        open={!!showRecordCostSheet}
        onOpenChange={() => setShowRecordCostSheet(null)}
        jobId={showRecordCostSheet?.jobId || ''}
        jobTitle={showRecordCostSheet?.jobTitle}
      />

      <EditJobBudgetSheet
        open={!!showEditBudgetSheet}
        onOpenChange={() => setShowEditBudgetSheet(null)}
        jobId={showEditBudgetSheet?.jobId || ''}
        jobTitle={showEditBudgetSheet?.jobTitle}
      />

      <VariationOrderDetailSheet
        open={!!showVariationSheet}
        onOpenChange={() => setShowVariationSheet(null)}
        variationOrder={showVariationSheet?.vo || null}
        jobTitle={showVariationSheet?.jobTitle}
      />
    </PageFrame>
  );
}
