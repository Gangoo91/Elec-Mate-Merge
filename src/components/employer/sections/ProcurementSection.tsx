import { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { RefreshCw, Phone, Mail, Plus } from 'lucide-react';
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
  Dot,
  Divider,
  EmptyState,
  LoadingBlocks,
  IconButton,
  PrimaryButton,
  SecondaryButton,
  SheetShell,
  type Tone,
} from '@/components/employer/editorial';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { useMaterialOrders, useSuppliers, useUpdateOrderStatus } from '@/hooks/useFinance';
import { useCompanyTools, useToolStats } from '@/hooks/useCompanyTools';
import { CreateOrderDialog } from '@/components/employer/dialogs/CreateOrderDialog';
import { CreateSupplierDialog } from '@/components/employer/dialogs/CreateSupplierDialog';
import type { MaterialOrder, Supplier } from '@/services/financeService';

type TabValue = 'all' | 'orders' | 'suppliers' | 'pat';

const orderStatusTone = (status: string): Tone => {
  switch (status) {
    case 'Delivered':
      return 'emerald';
    case 'In Transit':
      return 'cyan';
    case 'Processing':
      return 'amber';
    default:
      return 'blue';
  }
};

const toolStatusTone = (status: string): Tone => {
  switch (status) {
    case 'In Use':
      return 'emerald';
    case 'Available':
      return 'cyan';
    case 'On Hire':
      return 'amber';
    case 'Under Repair':
      return 'red';
    default:
      return 'blue';
  }
};

const formatDate = (value?: string | null) => {
  if (!value) return '—';
  try {
    return new Date(value).toLocaleDateString('en-GB');
  } catch {
    return '—';
  }
};

const isToday = (value?: string | null) => {
  if (!value) return false;
  const d = new Date(value);
  const now = new Date();
  return (
    d.getDate() === now.getDate() &&
    d.getMonth() === now.getMonth() &&
    d.getFullYear() === now.getFullYear()
  );
};

export function ProcurementSection() {
  const [activeTab, setActiveTab] = useState<TabValue>('all');
  const [search, setSearch] = useState('');
  const [showOrderDialog, setShowOrderDialog] = useState(false);
  const [showSupplierDialog, setShowSupplierDialog] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<MaterialOrder | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  const queryClient = useQueryClient();
  const { data: materialOrders = [], isLoading: ordersLoading } = useMaterialOrders();
  const { data: suppliers = [], isLoading: suppliersLoading } = useSuppliers();
  const { data: companyTools = [], isLoading: toolsLoading } = useCompanyTools();
  const toolStats = useToolStats();
  const updateOrderStatusMutation = useUpdateOrderStatus();

  const isLoading = ordersLoading || suppliersLoading || toolsLoading;

  const stats = useMemo(() => {
    const openOrders = materialOrders.filter(
      (o) => o.status === 'Processing' || o.status === 'In Transit'
    ).length;
    const arrivingToday = materialOrders.filter(
      (o) => o.status === 'In Transit' && isToday(o.delivery_date)
    ).length;
    const lowStock = toolStats.toolsOverdue + toolStats.toolsDue;
    const now = new Date();
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);
    const spend30 = materialOrders
      .filter((o) => {
        const d = new Date(o.order_date);
        return d >= cutoff && d <= now;
      })
      .reduce((sum, o) => sum + Number(o.total || 0), 0);
    return {
      openOrders,
      arrivingToday,
      lowStock,
      spend30: Math.round(spend30),
    };
  }, [materialOrders, toolStats]);

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['material_orders'] });
    queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    queryClient.invalidateQueries({ queryKey: ['company_tools'] });
  };

  const q = search.trim().toLowerCase();

  const filteredOrders = useMemo(() => {
    return materialOrders.filter((o) => {
      if (!q) return true;
      const supplierName = (o as MaterialOrder & { suppliers?: { name?: string } }).suppliers?.name ?? '';
      const haystack = `${o.order_number} ${supplierName} ${o.status}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [materialOrders, q]);

  const filteredSuppliers = useMemo(() => {
    return suppliers.filter((s) => {
      if (!q) return true;
      const haystack = `${s.name} ${s.category} ${s.contact_name ?? ''}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [suppliers, q]);

  const filteredTools = useMemo(() => {
    return companyTools.filter((t) => {
      if (!q) return true;
      const haystack = `${t.name} ${t.category} ${t.assigned_to ?? ''} ${t.serial_number ?? ''}`.toLowerCase();
      return haystack.includes(q);
    });
  }, [companyTools, q]);

  const showOrders = activeTab === 'all' || activeTab === 'orders';
  const showSuppliers = activeTab === 'all' || activeTab === 'suppliers';
  const showPat = activeTab === 'all' || activeTab === 'pat';

  const heroActions = (
    <>
      <PrimaryButton onClick={() => setShowOrderDialog(true)}>New order</PrimaryButton>
      <IconButton onClick={refresh} aria-label="Refresh">
        <RefreshCw className="h-4 w-4" />
      </IconButton>
    </>
  );

  if (isLoading) {
    return (
      <PageFrame>
        <PageHero
          eyebrow="Money"
          title="Procurement"
          description="Orders, suppliers and PAT & calibration logs."
          tone="cyan"
          actions={heroActions}
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  const selectedOrderItems = (selectedOrder?.items as Array<{ qty: number; name: string; price: number }>) ?? [];

  return (
    <>
      <PageFrame>
        <PageHero
          eyebrow="Money"
          title="Procurement"
          description="Orders, suppliers and PAT & calibration logs."
          tone="cyan"
          actions={heroActions}
        />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Open orders', value: stats.openOrders, tone: 'cyan' },
            { label: 'Arriving today', value: stats.arrivingToday, tone: 'blue' },
            { label: 'Low stock', value: stats.lowStock, tone: 'orange' },
            { label: 'Spend 30d £', value: stats.spend30.toLocaleString(), accent: true },
          ]}
        />

        <FilterBar
          tabs={[
            { value: 'all', label: 'All' },
            { value: 'orders', label: 'Orders', count: filteredOrders.length },
            { value: 'suppliers', label: 'Suppliers', count: filteredSuppliers.length },
            { value: 'pat', label: 'PAT & calibration', count: filteredTools.length },
          ]}
          activeTab={activeTab}
          onTabChange={(v) => setActiveTab(v as TabValue)}
          search={search}
          onSearchChange={setSearch}
          searchPlaceholder="Search procurement…"
          actions={
            activeTab === 'suppliers' ? (
              <PrimaryButton onClick={() => setShowSupplierDialog(true)}>Add supplier</PrimaryButton>
            ) : undefined
          }
        />

        {showOrders && (
          <ListCard>
            <ListCardHeader
              tone="cyan"
              title="Orders"
              meta={<Pill tone="cyan">{filteredOrders.length}</Pill>}
              action="New order"
              onAction={() => setShowOrderDialog(true)}
            />
            {filteredOrders.length === 0 ? (
              <div className="p-5 sm:p-6">
                <EmptyState
                  title="No orders"
                  description={q ? 'No orders match your search.' : 'Raise your first material order to track deliveries and spend.'}
                  action={q ? undefined : 'New order'}
                  onAction={q ? undefined : () => setShowOrderDialog(true)}
                />
              </div>
            ) : (
              <ListBody>
                {filteredOrders.map((o) => {
                  const supplierName =
                    (o as MaterialOrder & { suppliers?: { name?: string } }).suppliers?.name ?? 'Unknown supplier';
                  const items = (o.items as Array<unknown>) ?? [];
                  const itemCount = items.length;
                  const eta = o.delivery_date ? formatDate(o.delivery_date) : '—';
                  const subtitle = `${itemCount} item${itemCount === 1 ? '' : 's'} · £${Number(o.total).toFixed(2)} · ETA ${eta}`;
                  return (
                    <ListRow
                      key={o.id}
                      title={
                        <span className="flex items-center gap-2">
                          <span className="text-white">{supplierName}</span>
                          <span className="text-white">·</span>
                          <span className="text-white tabular-nums">{o.order_number}</span>
                        </span>
                      }
                      subtitle={subtitle}
                      trailing={<Pill tone={orderStatusTone(o.status)}>{o.status}</Pill>}
                      onClick={() => setSelectedOrder(o)}
                    />
                  );
                })}
              </ListBody>
            )}
          </ListCard>
        )}

        {showSuppliers && (
          <ListCard>
            <ListCardHeader
              tone="blue"
              title="Suppliers"
              meta={<Pill tone="blue">{filteredSuppliers.length}</Pill>}
              action="Add supplier"
              onAction={() => setShowSupplierDialog(true)}
            />
            {filteredSuppliers.length === 0 ? (
              <div className="p-5 sm:p-6">
                <EmptyState
                  title="No suppliers"
                  description={q ? 'No suppliers match your search.' : 'Add a supplier to start raising orders.'}
                  action={q ? undefined : 'Add supplier'}
                  onAction={q ? undefined : () => setShowSupplierDialog(true)}
                />
              </div>
            ) : (
              <ListBody>
                {filteredSuppliers.map((s) => {
                  const delivery =
                    s.delivery_days === 0 ? 'Same day' : `${s.delivery_days} day delivery`;
                  return (
                    <ListRow
                      key={s.id}
                      title={s.name}
                      subtitle={`${s.category} · ${delivery} · £${Number(s.balance).toLocaleString()} balance`}
                      trailing={
                        <>
                          <Pill tone="emerald">{Number(s.discount_percent)}% off</Pill>
                        </>
                      }
                      onClick={() => setSelectedSupplier(s)}
                    />
                  );
                })}
              </ListBody>
            )}
          </ListCard>
        )}

        {showPat && (
          <ListCard>
            <ListCardHeader
              tone="orange"
              title="PAT & calibration"
              meta={
                <span className="flex items-center gap-2">
                  <Pill tone="orange">{toolStats.toolsOverdue} overdue</Pill>
                  <Pill tone="amber">{toolStats.toolsDue} due 30d</Pill>
                </span>
              }
            />
            {filteredTools.length === 0 ? (
              <div className="p-5 sm:p-6">
                <EmptyState
                  title="No equipment logged"
                  description={q ? 'No equipment matches your search.' : 'Add tools to track PAT testing and calibration intervals.'}
                />
              </div>
            ) : (
              <ListBody>
                {filteredTools.map((t) => {
                  const now = new Date();
                  const patOverdue = t.pat_due && new Date(t.pat_due) < now;
                  const calOverdue = t.next_calibration && new Date(t.next_calibration) < now;
                  const tone: Tone = patOverdue || calOverdue ? 'red' : toolStatusTone(t.status);
                  const parts: string[] = [t.category];
                  if (t.assigned_to) parts.push(t.assigned_to);
                  if (t.pat_due) parts.push(`PAT ${formatDate(t.pat_due)}`);
                  if (t.next_calibration) parts.push(`Cal ${formatDate(t.next_calibration)}`);
                  return (
                    <ListRow
                      key={t.id}
                      lead={<Dot tone={tone} />}
                      title={t.name}
                      subtitle={parts.join(' · ')}
                      trailing={<Pill tone={toolStatusTone(t.status)}>{t.status}</Pill>}
                    />
                  );
                })}
              </ListBody>
            )}
          </ListCard>
        )}
      </PageFrame>

      <Sheet open={!!selectedOrder} onOpenChange={(open) => !open && setSelectedOrder(null)}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl overflow-hidden"
        >
          {selectedOrder && (
            <SheetShell
              eyebrow="Money"
              title={`Order ${selectedOrder.order_number}`}
              description={
                <span className="flex items-center gap-2 pt-1">
                  <Pill tone={orderStatusTone(selectedOrder.status)}>{selectedOrder.status}</Pill>
                  <span className="text-[12px] text-white">
                    {(selectedOrder as MaterialOrder & { suppliers?: { name?: string } }).suppliers?.name ?? 'Unknown supplier'}
                  </span>
                </span>
              }
              footer={
                selectedOrder.status === 'In Transit' ? (
                  <PrimaryButton
                    onClick={() => {
                      updateOrderStatusMutation.mutate(
                        {
                          id: selectedOrder.id,
                          status: 'Delivered',
                          deliveryDate: new Date().toISOString().split('T')[0],
                        },
                        {
                          onSuccess: () => setSelectedOrder(null),
                        }
                      );
                    }}
                    disabled={updateOrderStatusMutation.isPending}
                    fullWidth
                  >
                    {updateOrderStatusMutation.isPending ? 'Marking…' : 'Mark as delivered'}
                  </PrimaryButton>
                ) : undefined
              }
            >
              <StatStrip
                columns={3}
                stats={[
                  { label: 'Total £', value: Number(selectedOrder.total).toFixed(2), accent: true },
                  { label: 'Items', value: selectedOrderItems.length, tone: 'cyan' },
                  {
                    label: 'ETA',
                    value: selectedOrder.delivery_date ? formatDate(selectedOrder.delivery_date) : '—',
                    tone: 'blue',
                  },
                ]}
              />

              <ListCard>
                <ListCardHeader tone="cyan" title="Line items" />
                {selectedOrderItems.length === 0 ? (
                  <div className="p-5 sm:p-6">
                    <EmptyState title="No line items" />
                  </div>
                ) : (
                  <ListBody>
                    {selectedOrderItems.map((item, idx) => (
                      <ListRow
                        key={`${item.name}-${idx}`}
                        title={item.name}
                        subtitle={`Qty ${item.qty} · £${Number(item.price).toFixed(2)} ea`}
                        trailing={
                          <span className="text-[14px] font-semibold text-white tabular-nums">
                            £{(Number(item.qty) * Number(item.price)).toFixed(2)}
                          </span>
                        }
                      />
                    ))}
                  </ListBody>
                )}
              </ListCard>

              <ListCard>
                <ListCardHeader title="Details" />
                <ListBody>
                  <ListRow title="Order date" trailing={<span className="text-white text-[13px]">{formatDate(selectedOrder.order_date)}</span>} />
                  <ListRow title="Ordered by" trailing={<span className="text-white text-[13px]">{selectedOrder.ordered_by || '—'}</span>} />
                  <ListRow
                    title="Delivery date"
                    trailing={<span className="text-white text-[13px]">{selectedOrder.delivery_date ? formatDate(selectedOrder.delivery_date) : '—'}</span>}
                  />
                </ListBody>
              </ListCard>

              {selectedOrder.notes && (
                <ListCard>
                  <ListCardHeader title="Notes" />
                  <div className="px-5 sm:px-6 py-4 text-[13px] text-white leading-relaxed">
                    {selectedOrder.notes}
                  </div>
                </ListCard>
              )}
            </SheetShell>
          )}
        </SheetContent>
      </Sheet>

      <Sheet open={!!selectedSupplier} onOpenChange={(open) => !open && setSelectedSupplier(null)}>
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl overflow-hidden"
        >
          {selectedSupplier && (
            <SheetShell
              eyebrow="Money"
              title={selectedSupplier.name}
              description={
                <span className="flex items-center gap-2 pt-1">
                  <Pill tone="blue">{selectedSupplier.category}</Pill>
                  <Pill tone="emerald">{Number(selectedSupplier.discount_percent)}% off</Pill>
                </span>
              }
              footer={
                <div className="grid grid-cols-3 gap-2 w-full">
                  <a
                    href={selectedSupplier.phone ? `tel:${selectedSupplier.phone}` : undefined}
                    className="h-11 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium flex items-center justify-center gap-2 touch-manipulation hover:bg-white/[0.1] transition-colors"
                  >
                    <Phone className="h-4 w-4" /> Call
                  </a>
                  <a
                    href={selectedSupplier.email ? `mailto:${selectedSupplier.email}` : undefined}
                    className="h-11 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium flex items-center justify-center gap-2 touch-manipulation hover:bg-white/[0.1] transition-colors"
                  >
                    <Mail className="h-4 w-4" /> Email
                  </a>
                  <PrimaryButton
                    onClick={() => {
                      setSelectedSupplier(null);
                      setShowOrderDialog(true);
                    }}
                    fullWidth
                  >
                    <Plus className="h-4 w-4 mr-1" /> Order
                  </PrimaryButton>
                </div>
              }
            >
              <StatStrip
                columns={3}
                stats={[
                  { label: 'Credit limit £', value: Number(selectedSupplier.credit_limit).toLocaleString(), tone: 'cyan' },
                  { label: 'Balance £', value: Number(selectedSupplier.balance).toLocaleString(), accent: true },
                  {
                    label: 'Delivery',
                    value: selectedSupplier.delivery_days === 0 ? 'Same' : `${selectedSupplier.delivery_days}d`,
                    tone: 'blue',
                  },
                ]}
              />

              <ListCard>
                <ListCardHeader title="Account" />
                <ListBody>
                  <ListRow title="Account no." trailing={<span className="text-white text-[13px] tabular-nums">{selectedSupplier.account_number || '—'}</span>} />
                  <ListRow title="Contact" trailing={<span className="text-white text-[13px]">{selectedSupplier.contact_name || '—'}</span>} />
                  <ListRow title="Phone" trailing={<span className="text-white text-[13px]">{selectedSupplier.phone || '—'}</span>} />
                  <ListRow title="Email" trailing={<span className="text-white text-[13px] truncate max-w-[180px]">{selectedSupplier.email || '—'}</span>} />
                  <ListRow title="Address" trailing={<span className="text-white text-[13px] truncate max-w-[200px]">{selectedSupplier.address || '—'}</span>} />
                </ListBody>
              </ListCard>

              {selectedSupplier.notes && (
                <ListCard>
                  <ListCardHeader title="Notes" />
                  <div className="px-5 sm:px-6 py-4 text-[13px] text-white leading-relaxed">
                    {selectedSupplier.notes}
                  </div>
                </ListCard>
              )}

              <Divider />
            </SheetShell>
          )}
        </SheetContent>
      </Sheet>

      <CreateOrderDialog open={showOrderDialog} onOpenChange={setShowOrderDialog} />
      <CreateSupplierDialog open={showSupplierDialog} onOpenChange={setShowSupplierDialog} />
    </>
  );
}
