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
import { useQueryClient } from '@tanstack/react-query';

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

  const profit = stats.totalBudget - stats.totalActual;

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
            label: 'Revenue 30d £',
            value: formatK(stats.totalBudget),
            tone: 'emerald',
          },
          {
            label: 'Cost 30d £',
            value: formatK(stats.totalActual),
            tone: 'amber',
          },
          {
            label: 'Profit £',
            value: formatK(profit),
            accent: true,
          },
          {
            label: 'Margin %',
            value: `${stats.avgMargin.toFixed(1)}%`,
            tone: 'emerald',
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
              const cost = Number(fin.actual_total);
              const margin = Number(fin.margin);
              const isOver = cost > revenue;

              return (
                <ListRow
                  key={fin.id}
                  title={fin.job?.title || 'Untitled Job'}
                  subtitle={`${fin.job?.client || 'No client'} · rev ${formatCurrency(revenue)} · cost ${formatCurrency(cost)}`}
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
                <StatStrip
                  columns={4}
                  stats={[
                    {
                      label: 'Revenue £',
                      value: formatK(Number(openDetail.budget_total)),
                      tone: 'emerald',
                    },
                    {
                      label: 'Cost £',
                      value: formatK(Number(openDetail.actual_total)),
                      tone: 'amber',
                    },
                    {
                      label: 'Profit £',
                      value: formatK(
                        Number(openDetail.budget_total) - Number(openDetail.actual_total)
                      ),
                      accent: true,
                    },
                    {
                      label: 'Margin %',
                      value: `${Number(openDetail.margin).toFixed(0)}%`,
                      tone: marginToneFor(Number(openDetail.margin)),
                    },
                  ]}
                />

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
                      },
                      {
                        label: 'Materials',
                        budget: Number(openDetail.budget_materials),
                        actual: Number(openDetail.actual_materials),
                      },
                      {
                        label: 'Equipment',
                        budget: Number(openDetail.budget_equipment),
                        actual: Number(openDetail.actual_equipment),
                      },
                      {
                        label: 'Overheads',
                        budget: Number(openDetail.budget_overheads),
                        actual: Number(openDetail.actual_overheads),
                      },
                    ].map((row) => {
                      const pct = row.budget > 0 ? (row.actual / row.budget) * 100 : 0;
                      const over = pct > 100;
                      return (
                        <ListRow
                          key={row.label}
                          title={row.label}
                          subtitle={`${formatCurrency(row.actual)} of ${formatCurrency(row.budget)}`}
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
                          {formatCurrency(Number(openDetail.invoiced))}
                        </span>
                      }
                    />
                    <ListRow
                      title="Paid"
                      trailing={
                        <span className="text-[13px] font-semibold text-emerald-400 tabular-nums">
                          {formatCurrency(Number(openDetail.paid))}
                        </span>
                      }
                    />
                    {Number(openDetail.invoiced) - Number(openDetail.paid) > 0 && (
                      <ListRow
                        title="Outstanding"
                        trailing={
                          <span className="text-[13px] font-semibold text-amber-400 tabular-nums">
                            {formatCurrency(
                              Number(openDetail.invoiced) - Number(openDetail.paid)
                            )}
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
                <SecondaryButton>
                  Generate invoice
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
