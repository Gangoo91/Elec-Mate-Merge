import { useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { RefreshCw, Phone, Mail, Plus, PackageCheck } from 'lucide-react';
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
  DestructiveButton,
  SheetShell,
  type Tone,
} from '@/components/employer/editorial';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';
import {
  useMaterialOrders,
  useSuppliers,
  useUpdateOrderStatus,
  useUpdateSupplier,
} from '@/hooks/useFinance';
import { useCompanyTools, useToolStats } from '@/hooks/useCompanyTools';
import { useJobs } from '@/hooks/useJobs';
import { CreateOrderDialog } from '@/components/employer/dialogs/CreateOrderDialog';
import { CreateSupplierDialog } from '@/components/employer/dialogs/CreateSupplierDialog';
import { generatePoPdf } from '@/utils/generatePoPdf';
import { saveOrSharePdf } from '@/utils/save-or-share-pdf';
import { ReceiveDeliverySheet } from '@/components/employer/sheets/ReceiveDeliverySheet';
import { useGoodsReceipts } from '@/hooks/useGoodsReceipts';
import { useSupplierInvoices, useMatchInvoice } from '@/hooks/useSupplierInvoices';
import { openExternalUrl } from '@/utils/open-external-url';
import type { MaterialOrder, Supplier } from '@/services/financeService';

type TabValue = 'all' | 'orders' | 'suppliers' | 'pat';

// Starter set for the empty state — the big UK electrical merchants. Opt-in,
// per-employer (not a global seed); the owner fills in account no. + discount.
const COMMON_MERCHANTS = [
  { name: 'Edmundson Electrical' },
  { name: 'CEF (City Electrical Factors)' },
  { name: 'Rexel UK' },
  { name: 'YESSS Electrical' },
  { name: 'Screwfix' },
  { name: 'Denmans Electrical' },
];

const orderStatusTone = (status: string): Tone => {
  switch (status) {
    case 'Received':
      return 'emerald';
    case 'Part-received':
      return 'cyan';
    case 'Confirmed':
      return 'blue';
    case 'Sent':
      return 'amber';
    case 'Cancelled':
      return 'red';
    default:
      return 'purple'; // Draft
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
  const [editSupplier, setEditSupplier] = useState<Supplier | null>(null);
  const [receiveOrder, setReceiveOrder] = useState<MaterialOrder | null>(null);

  const queryClient = useQueryClient();
  const { data: materialOrders = [], isLoading: ordersLoading } = useMaterialOrders();
  const { data: suppliers = [], isLoading: suppliersLoading } = useSuppliers();
  const { data: companyTools = [], isLoading: toolsLoading } = useCompanyTools();
  const { data: jobs = [] } = useJobs();
  const { data: receipts = [] } = useGoodsReceipts(selectedOrder?.id);
  const { data: supplierInvoices = [] } = useSupplierInvoices(selectedOrder?.id);
  const matchInvoice = useMatchInvoice();
  const toolStats = useToolStats();
  const jobTitleFor = (id: string | null) => (id ? jobs.find((j) => j.id === id)?.title : undefined);
  const updateOrderStatusMutation = useUpdateOrderStatus();

  const isLoading = ordersLoading || suppliersLoading || toolsLoading;
  const todayStr = new Date().toISOString().split('T')[0];

  const stats = useMemo(() => {
    const awaiting = (o: MaterialOrder) =>
      ['Sent', 'Confirmed', 'Part-received'].includes(o.status);
    const openOrders = materialOrders.filter(awaiting).length;
    const arrivingToday = materialOrders.filter(
      (o) => awaiting(o) && isToday(o.expected_date)
    ).length;
    const late = materialOrders.filter(
      (o) => awaiting(o) && o.expected_date && o.expected_date < todayStr
    ).length;
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
      late,
      spend30: Math.round(spend30),
    };
  }, [materialOrders, todayStr]);

  const refresh = () => {
    queryClient.invalidateQueries({ queryKey: ['material_orders'] });
    queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    queryClient.invalidateQueries({ queryKey: ['company_tools'] });
  };

  const [sendingPo, setSendingPo] = useState(false);
  const [emailDraft, setEmailDraft] = useState('');
  const updateSupplierMutation = useUpdateSupplier();
  const supplierForOrder = (o: MaterialOrder | null) =>
    o ? suppliers.find((s) => s.id === o.supplier_id) : undefined;

  const saveSupplierEmail = async (supplierId: string) => {
    const email = emailDraft.trim();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error('Enter a valid email.');
      return;
    }
    try {
      await updateSupplierMutation.mutateAsync({ id: supplierId, updates: { email } });
      setEmailDraft('');
    } catch {
      /* hook surfaces the error */
    }
  };

  const previewPo = async (order: MaterialOrder) => {
    try {
      const { doc, filename } = await generatePoPdf(order, supplierForOrder(order));
      await saveOrSharePdf(doc, filename); // native-safe (Filesystem+Share on native, download on web)
    } catch {
      toast.error('Could not generate the PO PDF.');
    }
  };

  const sendPoToSupplier = async (order: MaterialOrder) => {
    if (!Array.isArray(order.items) || order.items.length === 0) {
      toast.error('This PO has no line items to send.');
      return;
    }
    const supplier = supplierForOrder(order);
    if (!supplier?.email) {
      toast.error('Add an email to this supplier first, then send.');
      return;
    }
    setSendingPo(true);
    try {
      const { base64, filename } = await generatePoPdf(order, supplier);
      const { error } = await supabase.functions.invoke('send-finance-document', {
        body: {
          type: 'purchase_order',
          documentId: order.id,
          recipientEmail: supplier.email,
          recipientName: supplier.contact_name || supplier.name,
          attachmentBase64: base64,
          attachmentName: filename,
        },
      });
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ['material_orders'] });
      queryClient.invalidateQueries({ queryKey: ['job-financials'] }); // committed cost moves
      setSelectedOrder(null);
      toast.success(`PO sent to ${supplier.name}.`);
    } catch {
      toast.error('Could not send the PO — try again.');
    } finally {
      setSendingPo(false);
    }
  };

  const [addingMerchants, setAddingMerchants] = useState(false);
  const addCommonMerchants = async () => {
    setAddingMerchants(true);
    const existing = new Set(suppliers.map((s) => s.name.toLowerCase()));
    const rows = COMMON_MERCHANTS.filter((m) => !existing.has(m.name.toLowerCase())).map((m) => ({
      name: m.name,
      category: 'Wholesaler', // matches the edit dialog's category options
      credit_limit: 0,
      balance: 0,
      delivery_days: 1,
      discount_percent: 0,
    }));
    if (rows.length === 0) {
      setAddingMerchants(false);
      toast.info('Those merchants are already in your list.');
      return;
    }
    const { error } = await supabase.from('employer_suppliers').insert(rows);
    setAddingMerchants(false);
    if (error) {
      toast.error('Could not add merchants — try again.');
      return;
    }
    queryClient.invalidateQueries({ queryKey: ['suppliers'] });
    toast.success(`Added ${rows.length} merchant${rows.length === 1 ? '' : 's'} — set your account numbers and discounts.`);
  };

  const q = search.trim().toLowerCase();

  const filteredOrders = useMemo(() => {
    return materialOrders.filter((o) => {
      if (!q) return true;
      const supplierName = o.supplier?.name ?? '';
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
      <PrimaryButton onClick={() => setShowOrderDialog(true)}>Raise PO</PrimaryButton>
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
          title="Purchase orders"
          description="Raise POs, manage suppliers, and track PAT & calibration."
          tone="cyan"
          actions={heroActions}
        />
        <LoadingBlocks />
      </PageFrame>
    );
  }

  const selectedOrderItems =
    (selectedOrder?.items as Array<{
      qty: number;
      name: string;
      unit_cost: number;
      unit?: string | null;
      received_qty?: number;
    }>) ?? [];
  const canCancelPo =
    !!selectedOrder && !['Received', 'Cancelled'].includes(selectedOrder.status);
  const orderSupplier = supplierForOrder(selectedOrder);
  const supplierNeedsEmail = !!orderSupplier && !orderSupplier.email;

  return (
    <>
      <PageFrame>
        <PageHero
          eyebrow="Money"
          title="Purchase orders"
          description="Raise POs, manage suppliers, and track PAT & calibration."
          tone="cyan"
          actions={heroActions}
        />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Awaiting delivery', value: stats.openOrders, tone: 'cyan' },
            { label: 'Arriving today', value: stats.arrivingToday, tone: 'blue' },
            { label: 'Late', value: stats.late, tone: stats.late > 0 ? 'red' : 'emerald' },
            { label: 'Spend 30d £', value: stats.spend30.toLocaleString(), accent: true },
          ]}
        />

        <FilterBar
          tabs={[
            { value: 'all', label: 'All' },
            { value: 'orders', label: 'Purchase orders', count: filteredOrders.length },
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
              title="Purchase orders"
              meta={<Pill tone="cyan">{filteredOrders.length}</Pill>}
              action="Raise PO"
              onAction={() => setShowOrderDialog(true)}
            />
            {filteredOrders.length === 0 ? (
              <EmptyState
                title="No purchase orders"
                description={q ? 'No POs match your search.' : 'Raise your first purchase order to send to a supplier and track spend against the job.'}
                action={q ? undefined : 'Raise PO'}
                onAction={q ? undefined : () => setShowOrderDialog(true)}
              />
            ) : (
              <ListBody>
                {filteredOrders.map((o) => {
                  const supplierName = o.supplier?.name ?? 'Unknown supplier';
                  const items = (o.items as Array<unknown>) ?? [];
                  const itemCount = items.length;
                  const awaiting = ['Sent', 'Confirmed', 'Part-received'].includes(o.status);
                  const isLate =
                    awaiting && !!o.expected_date && o.expected_date < todayStr;
                  const timing =
                    o.status === 'Received'
                      ? `Received ${formatDate(o.delivery_date)}`
                      : o.expected_date
                        ? `ETA ${formatDate(o.expected_date)}`
                        : 'No ETA set';
                  const jobTitle = jobTitleFor(o.job_id);
                  const primaryLabel = jobTitle || `${itemCount} item${itemCount === 1 ? '' : 's'}`;
                  const subtitle = `${primaryLabel} · £${Number(o.total).toFixed(2)} · ${timing}`;
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
                      trailing={
                        <span className="flex items-center gap-1.5">
                          {isLate && <Pill tone="red">Late</Pill>}
                          <Pill tone={orderStatusTone(o.status)}>{o.status}</Pill>
                        </span>
                      }
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
              <div className="p-5 sm:p-6 space-y-4">
                <EmptyState
                  title="No suppliers"
                  description={q ? 'No suppliers match your search.' : 'Add a supplier to start raising orders.'}
                  action={q ? undefined : 'Add supplier'}
                  onAction={q ? undefined : () => setShowSupplierDialog(true)}
                />
                {!q && (
                  <div className="text-center">
                    <SecondaryButton onClick={addCommonMerchants} disabled={addingMerchants}>
                      {addingMerchants ? 'Adding…' : 'Quick-add UK merchants'}
                    </SecondaryButton>
                    <p className="mt-2 text-[11px] text-white/45">
                      Adds Edmundson, CEF, Rexel, YESSS, Screwfix &amp; Denmans — edit account no. and discount after.
                    </p>
                  </div>
                )}
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
              <EmptyState
                title="No equipment logged"
                description={q ? 'No equipment matches your search.' : 'Add tools to track PAT testing and calibration intervals.'}
              />
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

      <Sheet
        open={!!selectedOrder}
        onOpenChange={(open) => {
          if (!open) {
            setSelectedOrder(null);
            setEmailDraft('');
          }
        }}
      >
        <SheetContent
          side="bottom"
          className="h-[85vh] p-0 rounded-t-2xl overflow-hidden"
        >
          {selectedOrder && (
            <SheetShell
              eyebrow="Purchase order"
              title={selectedOrder.order_number}
              description={
                <span className="flex items-center gap-2 pt-1">
                  <Pill tone={orderStatusTone(selectedOrder.status)}>{selectedOrder.status}</Pill>
                  <span className="text-[12px] text-white">
                    {selectedOrder.supplier?.name ?? 'Unknown supplier'}
                  </span>
                </span>
              }
              footer={
                <div className="flex gap-2">
                  <SecondaryButton onClick={() => previewPo(selectedOrder)} fullWidth>
                    Preview PO
                  </SecondaryButton>
                  {selectedOrder.status === 'Draft' ? (
                    <PrimaryButton
                      onClick={() => sendPoToSupplier(selectedOrder)}
                      disabled={sendingPo}
                      fullWidth
                    >
                      {sendingPo ? 'Sending…' : 'Send to supplier'}
                    </PrimaryButton>
                  ) : (
                    ['Sent', 'Confirmed', 'Part-received'].includes(selectedOrder.status) && (
                      <PrimaryButton
                        onClick={() => {
                          const o = selectedOrder;
                          setSelectedOrder(null);
                          setReceiveOrder(o);
                        }}
                        fullWidth
                      >
                        <PackageCheck className="h-4 w-4 mr-1.5" />
                        Receive delivery
                      </PrimaryButton>
                    )
                  )}
                </div>
              }
            >
              <StatStrip
                columns={3}
                stats={[
                  { label: 'Total £', value: Number(selectedOrder.total).toFixed(2), accent: true },
                  { label: 'Items', value: selectedOrderItems.length, tone: 'cyan' },
                  {
                    label: selectedOrder.status === 'Received' ? 'Received' : 'ETA',
                    value:
                      selectedOrder.status === 'Received'
                        ? formatDate(selectedOrder.delivery_date)
                        : selectedOrder.expected_date
                          ? formatDate(selectedOrder.expected_date)
                          : '—',
                    tone: 'blue',
                  },
                ]}
              />

              <ListCard>
                <ListCardHeader tone="cyan" title="Line items" />
                {selectedOrderItems.length === 0 ? (
                  <EmptyState title="No line items" />
                ) : (
                  <ListBody>
                    {selectedOrderItems.map((item, idx) => (
                      <ListRow
                        key={`${item.name}-${idx}`}
                        title={item.name}
                        subtitle={`Qty ${item.qty} · £${Number(item.unit_cost).toFixed(2)} ea${item.unit ? ` / ${item.unit}` : ''}${Number(item.received_qty || 0) > 0 ? ` · ${Number(item.received_qty)} received` : ''}`}
                        trailing={
                          <span className="text-[14px] font-semibold text-white tabular-nums">
                            £{(Number(item.qty) * Number(item.unit_cost)).toFixed(2)}
                          </span>
                        }
                      />
                    ))}
                  </ListBody>
                )}
                <div className="px-5 sm:px-6 py-3 space-y-1.5 border-t border-white/[0.06]">
                  <div className="flex items-center justify-between text-[13px] text-white/70">
                    <span>Subtotal</span>
                    <span className="tabular-nums">£{Number(selectedOrder.subtotal ?? 0).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between text-[13px] text-white/70">
                    <span>VAT ({Number(selectedOrder.vat_rate ?? 0)}%)</span>
                    <span className="tabular-nums">£{Number(selectedOrder.vat_amount ?? 0).toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-white/[0.06]">
                    <span className="text-[13px] font-medium text-white">Total</span>
                    <span className="text-[15px] font-semibold text-elec-yellow tabular-nums">
                      £{Number(selectedOrder.total).toFixed(2)}
                    </span>
                  </div>
                </div>
              </ListCard>

              <ListCard>
                <ListCardHeader tone="default" title="Details" />
                <ListBody>
                  {jobTitleFor(selectedOrder.job_id) && (
                    <ListRow
                      title="Job"
                      trailing={
                        <span className="text-white text-[13px] text-right max-w-[220px] truncate">
                          {jobTitleFor(selectedOrder.job_id)}
                        </span>
                      }
                    />
                  )}
                  <ListRow title="Order date" trailing={<span className="text-white text-[13px]">{formatDate(selectedOrder.order_date)}</span>} />
                  <ListRow
                    title="Expected"
                    trailing={
                      <span className="text-white text-[13px]">
                        {selectedOrder.expected_date ? formatDate(selectedOrder.expected_date) : '—'}
                      </span>
                    }
                  />
                  <ListRow title="Delivery" trailing={<span className="text-white text-[13px]">{selectedOrder.delivery_mode || 'Deliver to site'}</span>} />
                  {selectedOrder.delivery_address && (
                    <ListRow
                      title="Address"
                      trailing={<span className="text-white text-[13px] text-right max-w-[220px]">{selectedOrder.delivery_address}</span>}
                    />
                  )}
                  <ListRow title="Ordered by" trailing={<span className="text-white text-[13px]">{selectedOrder.ordered_by || '—'}</span>} />
                  {selectedOrder.sent_to_email && (
                    <ListRow title="Sent to" trailing={<span className="text-white text-[13px] truncate max-w-[200px]">{selectedOrder.sent_to_email}</span>} />
                  )}
                  <ListRow
                    title="Received date"
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

              {receipts.length > 0 && (
                <ListCard>
                  <ListCardHeader
                    tone="emerald"
                    title="Deliveries"
                    meta={<Pill tone="emerald">{receipts.length}</Pill>}
                  />
                  <ListBody>
                    {receipts.map((r) => {
                      const qty = r.lines.reduce((s, l) => s + Number(l.qty_received || 0), 0);
                      return (
                        <ListRow
                          key={r.id}
                          title={formatDate(r.received_at)}
                          subtitle={`${qty} item${qty === 1 ? '' : 's'} received${r.notes ? ` · ${r.notes}` : ''}`}
                          trailing={
                            r.delivery_note_url ? (
                              <button
                                type="button"
                                onClick={() => openExternalUrl(r.delivery_note_url as string)}
                                className="text-[12px] text-elec-yellow/90 hover:text-elec-yellow touch-manipulation"
                              >
                                View note
                              </button>
                            ) : undefined
                          }
                        />
                      );
                    })}
                  </ListBody>
                </ListCard>
              )}

              {selectedOrder.status !== 'Draft' && selectedOrder.status !== 'Cancelled' && (
                <ListCard>
                  <ListCardHeader
                    tone="amber"
                    title="Supplier invoice"
                    meta={
                      supplierInvoices.length > 0 ? (
                        <Pill tone="default">{supplierInvoices.length}</Pill>
                      ) : undefined
                    }
                  />
                  <div className="px-5 sm:px-6 py-4 space-y-3">
                    <label className="flex items-center justify-center gap-2 h-11 rounded-xl border border-dashed border-white/[0.15] bg-white/[0.03] text-[13px] text-white/70 cursor-pointer touch-manipulation hover:bg-white/[0.05]">
                      <Mail className="h-4 w-4" />
                      {matchInvoice.isPending ? 'Checking invoice…' : 'Match a supplier invoice'}
                      <input
                        type="file"
                        accept="image/*"
                        capture="environment"
                        className="hidden"
                        disabled={matchInvoice.isPending}
                        onChange={(e) => {
                          const f = e.target.files?.[0];
                          if (f) matchInvoice.mutate({ orderId: selectedOrder.id, file: f });
                          e.target.value = '';
                        }}
                      />
                    </label>
                    <p className="text-[11px] text-white/45">
                      Photograph the invoice — we check it against the PO and what you received.
                    </p>
                    {supplierInvoices.map((inv) => (
                      <div
                        key={inv.id}
                        className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-3 space-y-1.5"
                      >
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[13px] text-white truncate">
                            {inv.supplier_name || 'Invoice'}
                            {inv.invoice_number ? ` · ${inv.invoice_number}` : ''}
                          </span>
                          <span className="text-[13px] font-semibold text-white tabular-nums">
                            £{Number(inv.invoice_total).toFixed(2)}
                          </span>
                        </div>
                        {inv.matched ? (
                          <Pill tone="emerald">Matches PO</Pill>
                        ) : (
                          <ul className="space-y-1">
                            {inv.variances.map((v, i) => (
                              <li key={i} className="text-[12px] text-amber-300 leading-snug">
                                • {v.detail}
                                {v.amount > 0 ? ` (+£${Number(v.amount).toFixed(2)})` : ''}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    ))}
                  </div>
                </ListCard>
              )}

              {selectedOrder.status === 'Draft' && supplierNeedsEmail && orderSupplier && (
                <ListCard>
                  <ListCardHeader tone="amber" title="Supplier email needed" />
                  <div className="px-5 sm:px-6 py-4 space-y-2.5">
                    <p className="text-[12.5px] text-white/60 leading-relaxed">
                      {orderSupplier.name} has no email yet. Add one to send the PO — it'll be saved to the supplier.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="email"
                        inputMode="email"
                        value={emailDraft}
                        onChange={(e) => setEmailDraft(e.target.value)}
                        placeholder="orders@supplier.co.uk"
                        className="flex-1 h-11 rounded-xl bg-white/[0.05] border border-white/[0.1] px-3.5 text-[14px] text-white placeholder:text-white/35 focus:outline-none focus:border-elec-yellow touch-manipulation"
                      />
                      <SecondaryButton
                        onClick={() => saveSupplierEmail(orderSupplier.id)}
                        disabled={updateSupplierMutation.isPending}
                      >
                        {updateSupplierMutation.isPending ? 'Saving…' : 'Save email'}
                      </SecondaryButton>
                    </div>
                  </div>
                </ListCard>
              )}

              {canCancelPo && (
                <DestructiveButton
                  onClick={() =>
                    updateOrderStatusMutation.mutate(
                      { id: selectedOrder.id, status: 'Cancelled' },
                      { onSuccess: () => setSelectedOrder(null) }
                    )
                  }
                  disabled={updateOrderStatusMutation.isPending}
                  fullWidth
                >
                  Cancel this PO
                </DestructiveButton>
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

              <SecondaryButton
                onClick={() => {
                  const s = selectedSupplier;
                  setSelectedSupplier(null);
                  setEditSupplier(s);
                  setShowSupplierDialog(true);
                }}
                fullWidth
              >
                Edit details
              </SecondaryButton>

              <Divider />
            </SheetShell>
          )}
        </SheetContent>
      </Sheet>

      <CreateOrderDialog
        open={showOrderDialog}
        onOpenChange={setShowOrderDialog}
        onCreated={(order, send) => {
          if (send) sendPoToSupplier(order);
        }}
      />
      <ReceiveDeliverySheet
        open={!!receiveOrder}
        order={receiveOrder}
        onOpenChange={(o) => !o && setReceiveOrder(null)}
      />
      <CreateSupplierDialog
        open={showSupplierDialog}
        supplier={editSupplier}
        onOpenChange={(o) => {
          setShowSupplierDialog(o);
          if (!o) setEditSupplier(null);
        }}
      />
    </>
  );
}
