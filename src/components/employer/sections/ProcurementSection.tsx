import { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { FileText, Mail, Phone } from 'lucide-react';
import { toast } from 'sonner';
import { PageHero } from '@/components/employer/editorial';
import {
  PageColumn,
  TwoColumn,
  FigureStrip,
  FilterRow,
  Segments,
  SearchField,
  HeroActions,
  HeroPrimary,
  RefreshIcon,
  Rows,
  Row,
  PlainEmpty,
  StatusPill as UiPill,
  panel,
  PanelTitle,
} from '@/components/employer/pageParts/PageParts';
import { FormSheet } from '@/components/forms/FormSheet';
import {
  PageHelpButton,
  HowItWorks,
  type PageHelpContent,
  type HelpBlocker,
} from '@/components/hub/PageHelp';
import {
  inputCn,
  labelCn,
  cardCn,
  buttonPrimaryCn,
  buttonSecondaryCn,
} from '@/components/forms/fieldStyles';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import {
  useMaterialOrders,
  useSuppliers,
  useUpdateOrderStatus,
  useUpdateSupplier,
} from '@/hooks/useFinance';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { useJobContext } from '@/hooks/useJobContext';
import { JobContextBar } from '@/components/employer/JobContextBar';
import { CreateOrderDialog } from '@/components/employer/dialogs/CreateOrderDialog';
import { CreateSupplierDialog } from '@/components/employer/dialogs/CreateSupplierDialog';
import { ReceiveDeliverySheet } from '@/components/employer/sheets/ReceiveDeliverySheet';
import { generatePoPdf } from '@/utils/generatePoPdf';
import { saveOrSharePdf } from '@/utils/save-or-share-pdf';
import { useGoodsReceipts } from '@/hooks/useGoodsReceipts';
import { useSupplierInvoices, useMatchInvoice } from '@/hooks/useSupplierInvoices';
import { openExternalUrl } from '@/utils/open-external-url';
import { useStorageUrls } from '@/utils/storageUrls';
import { gbp } from '@/hooks/useFirmPriceBook';
import type { MaterialOrder, POLine, Supplier } from '@/services/financeService';
import { BillsAddressPanel } from '@/components/employer/wholesalers/BillsAddressPanel';

/* ==========================================================================
   Procurement (ELE-1978) — buying materials for jobs.

   Order materials from the job (its quote fills the lines from the firm
   price book), send the PO only when someone taps Send, book deliveries in,
   and match the supplier's invoice — the emailed PDF or a photo — against
   the PO and what arrived. Matched invoices set the job's material cost
   (get_job_material_costs) and the "last paid" price in the price book.

   Office managers track orders and book deliveries in, but never see buy
   prices: the list comes from get_firm_purchase_orders with costs null, and
   raising, sending and invoice matching are owner/admin only.

   Tools and calibration moved out to the Kit register.
   ========================================================================== */

const HELP: PageHelpContent = {
  id: 'employer-procurement',
  title: 'Purchase orders',
  what: 'Order materials for a job, track the delivery, and check the supplier bills you what you agreed.',
  steps: [
    {
      title: 'Order from the job',
      body: 'Open a job and tap Materials. The quote fills the order at your price-book buy prices.',
    },
    {
      title: 'Send, then book it in',
      body: 'Nothing goes to the supplier until you tap Send. When it arrives, book in what came.',
    },
    {
      title: 'Match the invoice',
      body: 'Upload the supplier invoice PDF or a photo. Overcharges and short deliveries are flagged, and the cost lands on the job.',
    },
  ],
  notes: [
    {
      title: 'Who sees prices',
      body: 'Office managers see orders and book deliveries in. Buy prices and invoices are for the owner and admins.',
    },
    { title: 'Tools and test kit', body: 'PAT and calibration now live in the Kit register.' },
  ],
  tasks: [
    {
      title: 'Raise a purchase order',
      steps: [
        'On the Orders tab, tap Raise an order. From a job it says Order materials.',
        'Pick the Supplier and the Job. The cost lands on that job once it is sent.',
        'Add lines: Fill from a quote, tap Price book, or type a line. Buy prices come from your price book.',
        'Tap Save draft to keep it, or Save & send to email it now. Save & send only shows when the supplier has an order email.',
      ],
      who: 'Owner and admins.',
      tour: [
        {
          target: 'procurement.tabs',
          text: 'Orders',
          caption: 'Start on the Orders tab.',
          opens: true,
        },
        {
          target: 'procurement.new',
          caption: 'Tap Raise an order. Nothing goes to the supplier until you send it.',
          opens: true,
        },
        {
          target: 'procurement.order-save',
          caption: 'Fill in the lines, then Save draft or Save & send.',
        },
      ],
    },
    {
      title: 'Send a draft to the supplier',
      steps: [
        'Tap the draft order.',
        'Tap PO as PDF if you want to check it first.',
        'Tap Send to … The PO goes as a PDF to the supplier’s order email.',
      ],
      after:
        'If the button says Add an email to send, open Suppliers and add their order email first.',
      who: 'Owner and admins.',
      tour: [
        { target: 'procurement.list', caption: 'Tap the draft order.', opens: true },
        {
          target: 'procurement.order-action',
          caption: 'Tap Send to the supplier. Check it first with PO as PDF.',
        },
      ],
    },
    {
      title: 'Book a delivery in',
      steps: [
        'Tap an order that is Sent, Confirmed or Part-received.',
        'Tap Book a delivery in.',
        'Under What arrived, set how many of each came. Add a photo of the delivery note if you have one.',
        'Tap Book in … items. The order moves to Part-received or Received.',
      ],
      who: 'Owner, admins and office managers. Quantities only, no prices.',
      tour: [
        { target: 'procurement.list', caption: 'Tap the order that has arrived.', opens: true },
        {
          target: 'procurement.order-action',
          caption: 'Tap Book a delivery in and count what came.',
        },
      ],
    },
    {
      title: 'Check the supplier’s invoice',
      steps: [
        'Open a sent order.',
        'Under Supplier invoice, tap Match the invoice (PDF or photo) and pick the file.',
        'It reads the invoice and flags overcharges and short deliveries. Invoices needs a check shows on the order until you have looked.',
      ],
      who: 'Owner and admins.',
      tour: [
        { target: 'procurement.list', caption: 'Tap a sent order.', opens: true },
        {
          target: 'procurement.match-invoice',
          caption: 'Tap here and pick the supplier’s invoice PDF or a photo.',
        },
      ],
    },
    {
      title: 'Add your suppliers',
      steps: [
        'Tap the Suppliers tab.',
        'Tap Add supplier. With none yet, Add the big UK merchants adds Edmundson, CEF, Rexel, YESSS, Screwfix and Denmans.',
        'Open each one and add your account number and their order email.',
      ],
      who: 'Owner, admins and office managers.',
      tour: [
        { target: 'procurement.tabs', text: 'Suppliers', caption: 'Tap Suppliers.', opens: true },
        {
          target: 'procurement.new',
          caption: 'Tap Add supplier, or add the big UK merchants in one go.',
        },
      ],
    },
  ],
};

type Tab = 'orders' | 'suppliers';

const COMMON_MERCHANTS = [
  'Edmundson Electrical',
  'CEF (City Electrical Factors)',
  'Rexel UK',
  'YESSS Electrical',
  'Screwfix',
  'Denmans Electrical',
];

const AWAITING = ['Sent', 'Confirmed', 'Part-received'];

const statusChip = (status: string) => {
  switch (status) {
    case 'Received':
      return 'border-emerald-500/35 text-emerald-300';
    case 'Cancelled':
      return 'border-red-500/40 text-red-300';
    default:
      return 'border-white/[0.18] text-white';
  }
};

const fmtDate = (v?: string | null) => {
  if (!v) return '—';
  const d = new Date(v);
  return Number.isNaN(d.getTime())
    ? '—'
    : d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
};

const todayIso = () => new Date().toISOString().split('T')[0];

function StatusPill({ status }: { status: string }) {
  return (
    <span
      className={cn(
        'inline-flex h-6 items-center rounded-full border px-2.5 text-[11.5px] font-semibold',
        statusChip(status)
      )}
    >
      {status}
    </span>
  );
}

export function ProcurementSection() {
  const qc = useQueryClient();
  const [searchParams, setSearchParams] = useSearchParams();
  const { jobId: contextJobId, job: contextJob } = useJobContext();
  const { data: role } = useEmployerRole();
  const money = role?.canSeeMoney ?? false;

  const [tab, setTab] = useState<Tab>('orders');
  const [search, setSearch] = useState('');
  const [showOrder, setShowOrder] = useState(false);
  const [orderJobId, setOrderJobId] = useState<string | null>(null);
  const [orderSupplier, setOrderSupplier] = useState<string | undefined>();
  const [showSupplierDialog, setShowSupplierDialog] = useState(false);
  const [editSupplier, setEditSupplier] = useState<Supplier | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);
  const [receiveOrder, setReceiveOrder] = useState<MaterialOrder | null>(null);

  const {
    data: orders = [],
    isLoading,
    isError,
    refetch,
    isFetching,
  } = useMaterialOrders(contextJobId);
  const { data: suppliers = [] } = useSuppliers();
  const selected = orders.find((o) => o.id === selectedId) ?? null;

  // ?order=1 from the job sheet's Materials tile opens the order straight away.
  useEffect(() => {
    if (searchParams.get('order') !== '1' || !money) return;
    setOrderJobId(contextJobId);
    setShowOrder(true);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('order');
        return next;
      },
      { replace: true }
    );
  }, [searchParams, setSearchParams, contextJobId, money]);

  // ?po=<id> (e.g. the low van stock notification) opens that order.
  const poParam = searchParams.get('po');
  useEffect(() => {
    if (!poParam || isLoading) return;
    if (orders.some((o) => o.id === poParam)) setSelectedId(poParam);
    else toast.error('That order is no longer here.');
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('po');
        return next;
      },
      { replace: true }
    );
  }, [poParam, isLoading, orders, setSearchParams]);

  const stats = useMemo(() => {
    const today = todayIso();
    const awaiting = orders.filter((o) => AWAITING.includes(o.status));
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - 30);
    const spend30 = orders
      .filter(
        (o) => o.status !== 'Cancelled' && o.status !== 'Draft' && new Date(o.order_date) >= cutoff
      )
      .reduce((s, o) => s + Number(o.total ?? 0), 0);
    return {
      awaiting: awaiting.length,
      today: awaiting.filter((o) => o.expected_date === today).length,
      late: awaiting.filter((o) => o.expected_date && o.expected_date < today).length,
      drafts: orders.filter((o) => o.status === 'Draft').length,
      flagged: orders.reduce((s, o) => s + (o.invoices_flagged ?? 0), 0),
      spend30,
    };
  }, [orders]);

  const q = search.trim().toLowerCase();
  const filteredOrders = useMemo(
    () =>
      orders.filter(
        (o) =>
          !q ||
          `${o.order_number} ${o.supplier?.name ?? ''} ${o.status} ${o.job_title ?? ''}`
            .toLowerCase()
            .includes(q)
      ),
    [orders, q]
  );
  const filteredSuppliers = useMemo(
    () =>
      suppliers.filter(
        (s) => !q || `${s.name} ${s.category} ${s.contact_name ?? ''}`.toLowerCase().includes(q)
      ),
    [suppliers, q]
  );

  const openNewOrder = (jobId?: string | null, supplierId?: string) => {
    setOrderJobId(jobId ?? contextJobId ?? null);
    setOrderSupplier(supplierId);
    setShowOrder(true);
  };

  // ── Send / preview (owner/admin only; an explicit tap) ───────────────
  const [sending, setSending] = useState(false);
  const supplierFor = (o: MaterialOrder | null) =>
    o ? suppliers.find((s) => s.id === o.supplier_id) : undefined;

  const previewPo = async (o: MaterialOrder) => {
    try {
      const { doc, filename } = await generatePoPdf(o, supplierFor(o));
      await saveOrSharePdf(doc, filename);
    } catch {
      toast.error('Could not make the PO PDF.');
    }
  };

  const sendPo = async (o: MaterialOrder) => {
    if (!o.items?.length) {
      toast.error('This order has no lines to send.');
      return;
    }
    const supplier = supplierFor(o);
    if (!supplier?.email) {
      toast.error('Add an email for this supplier first.');
      return;
    }
    setSending(true);
    try {
      const { base64, filename } = await generatePoPdf(o, supplier);
      const { error } = await supabase.functions.invoke('send-finance-document', {
        body: {
          type: 'purchase_order',
          documentId: o.id,
          recipientEmail: supplier.email,
          recipientName: supplier.contact_name || supplier.name,
          attachmentBase64: base64,
          attachmentName: filename,
        },
      });
      if (error) throw error;
      qc.invalidateQueries({ queryKey: ['material_orders'] });
      qc.invalidateQueries({ queryKey: ['job-financials'] });
      toast.success(`Order sent to ${supplier.name}.`);
    } catch {
      toast.error('Could not send the order. Try again.');
    } finally {
      setSending(false);
    }
  };

  const [addingMerchants, setAddingMerchants] = useState(false);
  const addCommonMerchants = async () => {
    setAddingMerchants(true);
    const have = new Set(suppliers.map((s) => s.name.toLowerCase()));
    const rows = COMMON_MERCHANTS.filter((m) => !have.has(m.toLowerCase())).map((name) => ({
      name,
      category: 'Wholesaler',
      credit_limit: 0,
      balance: 0,
      delivery_days: 1,
      discount_percent: 0,
    }));
    if (rows.length === 0) {
      setAddingMerchants(false);
      toast.info('Those merchants are already on your list.');
      return;
    }
    const { error } = await supabase.from('employer_suppliers').insert(rows);
    setAddingMerchants(false);
    if (error) {
      toast.error('Could not add them. Try again.');
      return;
    }
    qc.invalidateQueries({ queryKey: ['suppliers'] });
    toast.success(`Added ${rows.length} merchants. Add your account numbers and order emails.`);
  };

  const today = todayIso();

  // Live "Before you start" lines for the help (ELE-1980).
  const noEmail = money ? suppliers.filter((s) => !s.email).length : 0;
  const helpBlockers: HelpBlocker[] = [];
  if (suppliers.length === 0) {
    helpBlockers.push({
      text: 'No suppliers yet, so an order has nowhere to go.',
      fixLabel: 'Add suppliers',
      onFix: () => setTab('suppliers'),
    });
  } else if (noEmail > 0) {
    helpBlockers.push({
      text: `${noEmail} supplier${noEmail === 1 ? ' has' : 's have'} no order email, so orders to ${noEmail === 1 ? 'it' : 'them'} cannot be sent.`,
      fixLabel: 'Open suppliers',
      onFix: () => setTab('suppliers'),
    });
  }

  const newLabel =
    tab === 'orders' ? (contextJob ? 'Order materials' : 'Raise an order') : 'Add supplier';
  const canNew = money || tab === 'suppliers';
  const onNew = () => (tab === 'orders' ? openNewOrder() : setShowSupplierDialog(true));

  const statusLine =
    stats.awaiting === 0 && stats.drafts === 0
      ? contextJob
        ? 'Nothing on order for this job.'
        : 'Nothing on order right now.'
      : [
          stats.awaiting > 0
            ? `${stats.awaiting} order${stats.awaiting === 1 ? '' : 's'} awaiting delivery`
            : null,
          stats.late > 0 ? `${stats.late} late` : null,
          stats.today > 0 ? `${stats.today} due today` : null,
          stats.awaiting === 0 && stats.drafts > 0
            ? `${stats.drafts} draft${stats.drafts === 1 ? '' : 's'} not sent`
            : null,
        ]
          .filter(Boolean)
          .join(', ') + '.';

  const dueSoon = orders
    .filter((o) => AWAITING.includes(o.status))
    .sort((x, y) => (x.expected_date ?? '9999').localeCompare(y.expected_date ?? '9999'))
    .slice(0, 5);

  const ordersList = isLoading ? (
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="h-[72px] animate-pulse rounded-xl bg-white/[0.05]" />
      ))}
    </div>
  ) : isError ? (
    <div className={panel}>
      <PlainEmpty
        bare
        text="Your orders didn't load."
        action="Try again"
        onAction={() => refetch()}
      />
    </div>
  ) : (
    <section>
      <PanelTitle
        title={contextJob ? 'Orders for this job' : 'Orders'}
        meta={`${filteredOrders.length}`}
      />
      <div className={cn(panel, 'overflow-hidden')}>
        {filteredOrders.length === 0 ? (
          <PlainEmpty
            bare
            text={
              q
                ? 'No orders match that search.'
                : money
                  ? 'Orders you raise show here. Order from a job and its quote fills the lines at your price-book buy prices.'
                  : 'When the owner or an admin orders materials, you can track them and book deliveries in here.'
            }
            action={!q && money ? (contextJob ? 'Order materials' : 'Raise an order') : undefined}
            onAction={!q && money ? () => openNewOrder() : undefined}
          />
        ) : (
          <ul className="divide-y divide-white/[0.07]" data-help="procurement.list">
            {filteredOrders.map((o) => {
              const awaiting = AWAITING.includes(o.status);
              const late = awaiting && !!o.expected_date && o.expected_date < today;
              const flagged = (o.invoices_flagged ?? 0) > 0;
              const lines = o.items?.length ?? 0;
              const timing =
                o.status === 'Received'
                  ? `Arrived ${fmtDate(o.delivery_date)}`
                  : o.expected_date
                    ? `${late ? 'Was due' : 'Due'} ${fmtDate(o.expected_date)}`
                    : 'No date set';
              return (
                <li key={o.id}>
                  <Row
                    chevron={false}
                    title={o.supplier?.name ?? 'Supplier'}
                    detail={`${o.order_number} · ${o.job_title ?? 'Stock'} · ${lines} line${lines === 1 ? '' : 's'} · ${timing}`}
                    amount={money && o.total != null ? gbp(o.total) : undefined}
                    status={
                      late ? (
                        <UiPill tone="red">Late</UiPill>
                      ) : flagged ? (
                        <UiPill tone="volt">Check invoice</UiPill>
                      ) : (
                        <StatusPill status={o.status} />
                      )
                    }
                    onClick={() => setSelectedId(o.id)}
                  />
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );

  const suppliersList = (
    <section>
      <PanelTitle title="Suppliers" meta={`${filteredSuppliers.length}`} />
      <div className={cn(panel, 'overflow-hidden')}>
        {filteredSuppliers.length === 0 ? (
          q ? (
            <PlainEmpty bare text="No suppliers match that search." />
          ) : (
            <div className="px-4 py-5 sm:px-5">
              <p className="text-[14px] text-white">
                Add the merchants you buy from. Their order email is where purchase orders go.
              </p>
              <button
                type="button"
                onClick={addCommonMerchants}
                disabled={addingMerchants}
                className={cn(buttonSecondaryCn, 'mt-4 px-6')}
              >
                {addingMerchants ? 'Adding…' : 'Add the big UK merchants'}
              </button>
              <p className="mt-2 text-[13px] text-white">
                Edmundson, CEF, Rexel, YESSS, Screwfix and Denmans. Add account numbers after.
              </p>
            </div>
          )
        ) : (
          <ul className="divide-y divide-white/[0.07]">
            {filteredSuppliers.map((s) => (
              <li key={s.id}>
                <Row
                  chevron={false}
                  title={s.name}
                  detail={[
                    s.category,
                    s.account_number ? `Account ${s.account_number}` : null,
                    s.email ? 'Order email set' : 'No order email',
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                  status={
                    money && Number(s.discount_percent) > 0 ? (
                      <UiPill tone="green">{Number(s.discount_percent)}% off</UiPill>
                    ) : !s.email ? (
                      <UiPill tone="red">No email</UiPill>
                    ) : undefined
                  }
                  onClick={() => setSelectedSupplier(s)}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );

  const side = (
    <>
      {tab === 'orders' && (
        <section>
          <PanelTitle title="Coming in" meta={dueSoon.length ? `${stats.awaiting}` : undefined} />
          <div className={cn(panel, 'overflow-hidden')}>
            {dueSoon.length === 0 ? (
              <PlainEmpty
                bare
                text="Nothing is on its way. Sent orders show here by the day they are due."
              />
            ) : (
              <Rows>
                {dueSoon.map((o) => {
                  const late = !!o.expected_date && o.expected_date < today;
                  return (
                    <Row
                      key={o.id}
                      title={o.supplier?.name ?? 'Supplier'}
                      detail={
                        <span className={late ? 'text-red-300' : undefined}>
                          {o.expected_date
                            ? `${late ? 'Was due' : o.expected_date === today ? 'Due today,' : 'Due'} ${fmtDate(o.expected_date)}`
                            : 'No date set'}
                        </span>
                      }
                      onClick={() => setSelectedId(o.id)}
                      chevron
                    />
                  );
                })}
              </Rows>
            )}
          </div>
        </section>
      )}
      {/* Gap #7: suppliers' invoices by email, matched to these orders */}
      {tab === 'orders' && <BillsAddressPanel />}
      <section>
        <PanelTitle title="Related" />
        <div className={cn(panel, 'overflow-hidden')}>
          <Rows>
            {tab === 'orders' ? (
              <Row
                title="Suppliers"
                detail={
                  suppliers.length === 0
                    ? 'None yet, so orders have nowhere to go'
                    : noEmail > 0
                      ? `${suppliers.length} suppliers, ${noEmail} with no order email`
                      : `${suppliers.length} supplier${suppliers.length === 1 ? '' : 's'}`
                }
                onClick={() => setTab('suppliers')}
              />
            ) : (
              <Row
                title="Orders"
                detail={`${orders.length} order${orders.length === 1 ? '' : 's'}`}
                onClick={() => setTab('orders')}
              />
            )}
            <Row
              title="Kit register"
              detail="Tools, testers and calibration now live here"
              onClick={() => setSearchParams({ section: 'kit' })}
            />
          </Rows>
        </div>
      </section>
    </>
  );

  return (
    <>
      <PageColumn>
        <PageHero
          title="Purchase orders"
          description={statusLine}
          actions={
            <HeroActions>
              {canNew && (
                <HeroPrimary data-help="procurement.new" onClick={onNew}>
                  {newLabel}
                </HeroPrimary>
              )}
              <RefreshIcon onClick={() => refetch()} spinning={isFetching} />
              <PageHelpButton
                help={HELP}
                blockers={helpBlockers}
                askContext={{ page: 'procurement', tab }}
              />
            </HeroActions>
          }
        />

        <JobContextBar what="Orders" />
        <HowItWorks help={HELP} blockers={helpBlockers} askContext={{ page: 'procurement', tab }} />

        <FigureStrip
          figures={[
            {
              label: 'Awaiting delivery',
              value: stats.awaiting,
              sub: 'Sent or part-received',
              onOpen: () => setTab('orders'),
            },
            {
              label: 'Due today',
              value: stats.today,
              sub: stats.today > 0 ? 'Book them in when they land' : 'Nothing due today',
              tone: stats.today > 0 ? 'volt' : undefined,
              onOpen: () => setTab('orders'),
            },
            {
              label: 'Late',
              value: stats.late,
              sub: stats.late > 0 ? 'Past their due date' : 'Nothing late',
              tone: stats.late > 0 ? 'red' : undefined,
              onOpen: () => setTab('orders'),
            },
            money
              ? stats.flagged > 0
                ? {
                    label: 'Invoices to check',
                    value: stats.flagged,
                    sub: 'Overcharge or short',
                    tone: 'volt',
                    onOpen: () => setTab('orders'),
                  }
                : {
                    label: 'Spent in 30 days',
                    value: gbp(Math.round(stats.spend30)),
                    sub: 'Orders placed',
                    onOpen: () => setTab('orders'),
                  }
              : {
                  label: 'Drafts',
                  value: stats.drafts,
                  sub: 'Not sent yet',
                  onOpen: () => setTab('orders'),
                },
          ]}
        />

        <FilterRow>
          <div data-help="procurement.tabs" className="min-w-0" aria-label="Procurement">
            <Segments
              items={[
                { value: 'orders' as Tab, label: 'Orders', count: orders.length },
                { value: 'suppliers' as Tab, label: 'Suppliers', count: suppliers.length },
              ]}
              value={tab}
              onChange={setTab}
            />
          </div>
          <SearchField
            className="w-full lg:w-72"
            value={search}
            onChange={setSearch}
            placeholder={tab === 'orders' ? 'Search orders, suppliers, jobs' : 'Search suppliers'}
          />
        </FilterRow>

        <TwoColumn main={tab === 'orders' ? ordersList : suppliersList} side={side} />
      </PageColumn>

      <OrderSheet
        order={selected}
        onClose={() => setSelectedId(null)}
        money={money}
        supplier={supplierFor(selected)}
        sending={sending}
        onPreview={previewPo}
        onSend={sendPo}
        onReceive={(o) => {
          setSelectedId(null);
          setReceiveOrder(o);
        }}
      />

      <SupplierSheet
        supplier={selectedSupplier}
        money={money}
        onClose={() => setSelectedSupplier(null)}
        onEdit={(s) => {
          setSelectedSupplier(null);
          setEditSupplier(s);
          setShowSupplierDialog(true);
        }}
        onOrder={(s) => {
          setSelectedSupplier(null);
          openNewOrder(null, s.id);
        }}
      />

      {money && (
        <CreateOrderDialog
          open={showOrder}
          prefillSupplier={orderSupplier}
          prefillJobId={orderJobId}
          onOpenChange={(o) => {
            setShowOrder(o);
            if (!o) {
              setOrderSupplier(undefined);
              setOrderJobId(null);
            }
          }}
          onCreated={(order, send) => {
            if (send) sendPo(order);
            else setSelectedId(order.id);
          }}
        />
      )}
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

/* ── One order ──────────────────────────────────────────────────────────── */

function OrderSheet({
  order,
  onClose,
  money,
  supplier,
  sending,
  onPreview,
  onSend,
  onReceive,
}: {
  order: MaterialOrder | null;
  onClose: () => void;
  money: boolean;
  supplier: Supplier | undefined;
  sending: boolean;
  onPreview: (o: MaterialOrder) => void;
  onSend: (o: MaterialOrder) => void;
  onReceive: (o: MaterialOrder) => void;
}) {
  const { data: receipts = [] } = useGoodsReceipts(order?.id);
  const { urls: noteUrls } = useStorageUrls(
    'job-photos',
    receipts.map((r) => r.delivery_note_url)
  );
  const { data: invoices = [] } = useSupplierInvoices(money ? order?.id : undefined);
  const matchInvoice = useMatchInvoice();
  const updateStatus = useUpdateOrderStatus();
  const updateSupplier = useUpdateSupplier();
  const [emailDraft, setEmailDraft] = useState('');
  const [confirmCancel, setConfirmCancel] = useState(false);

  useEffect(() => {
    setEmailDraft('');
    setConfirmCancel(false);
  }, [order?.id]);

  if (!order) return null;

  const lines = (order.items as POLine[]) ?? [];
  const awaiting = AWAITING.includes(order.status);
  const canCancel = money && !['Received', 'Cancelled'].includes(order.status);
  const needsEmail = money && order.status === 'Draft' && !!supplier && !supplier.email;

  const saveEmail = async () => {
    const email = emailDraft.trim();
    if (!supplier || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      toast.error('Enter a valid email.');
      return;
    }
    try {
      await updateSupplier.mutateAsync({ id: supplier.id, updates: { email } });
      setEmailDraft('');
    } catch {
      /* hook toasts */
    }
  };

  const primary =
    money && order.status === 'Draft'
      ? {
          label: sending
            ? 'Sending…'
            : supplier?.email
              ? `Send to ${supplier.name}`
              : 'Add an email to send',
          onClick: () => onSend(order),
          disabled: sending || !supplier?.email,
        }
      : awaiting
        ? { label: 'Book a delivery in', onClick: () => onReceive(order), disabled: false }
        : null;

  return (
    <FormSheet
      open={!!order}
      onOpenChange={(o) => !o && onClose()}
      eyebrow={`Purchase order · ${order.status}`}
      title={`${order.order_number} · ${order.supplier?.name ?? 'Supplier'}`}
      description={order.job_title ? `For ${order.job_title}` : 'Not linked to a job'}
      width="wide"
      footer={
        <div className="flex gap-2">
          {money && (
            <button
              type="button"
              onClick={() => onPreview(order)}
              className={cn(buttonSecondaryCn, 'flex-1 px-4')}
            >
              PO as PDF
            </button>
          )}
          {primary ? (
            <button
              type="button"
              data-help="procurement.order-action"
              onClick={primary.onClick}
              disabled={primary.disabled}
              className={cn(buttonPrimaryCn, 'flex-[1.6] px-4')}
            >
              {primary.label}
            </button>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className={cn(buttonSecondaryCn, 'flex-1 px-4')}
            >
              Close
            </button>
          )}
        </div>
      }
    >
      <div className="space-y-5 lg:grid lg:grid-cols-[1.4fr_1fr] lg:items-start lg:gap-6 lg:space-y-0">
        <div className="space-y-5">
          <section className={cardCn}>
            <h2 className="text-[15px] font-semibold text-white">Lines</h2>
            {lines.length === 0 ? (
              <p className="text-[14px] text-white">No lines on this order.</p>
            ) : (
              <ul className="divide-y divide-white/[0.08]">
                {lines.map((l, i) => {
                  const got = Number(l.received_qty || 0);
                  return (
                    <li
                      key={`${l.name}-${i}`}
                      className="flex items-start justify-between gap-3 py-2.5"
                    >
                      <div className="min-w-0">
                        <p className="text-[14px] font-medium text-white">{l.name}</p>
                        <p className="text-[12.5px] text-white">
                          {Number(l.qty)} {l.unit || ''}
                          {money && l.unit_cost != null ? ` × ${gbp(Number(l.unit_cost))}` : ''}
                          {got > 0 ? ` · ${got} arrived` : ''}
                        </p>
                      </div>
                      {money && l.unit_cost != null && (
                        <span className="shrink-0 text-[14px] font-semibold tabular-nums text-white">
                          {gbp(Number(l.qty) * Number(l.unit_cost))}
                        </span>
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
            {money && order.total != null && (
              <div className="space-y-1.5 border-t border-white/[0.1] pt-3 text-[14px] text-white">
                <div className="flex justify-between">
                  <span>Lines</span>
                  <span className="tabular-nums">{gbp(order.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT {Number(order.vat_rate)}%</span>
                  <span className="tabular-nums">{gbp(order.vat_amount)}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-semibold">Order total</span>
                  <span className="text-[17px] font-semibold tabular-nums text-elec-yellow">
                    {gbp(order.total)}
                  </span>
                </div>
              </div>
            )}
            {!money && (
              <p className="text-[12px] text-white">
                Prices on orders are kept to the owner and admins.
              </p>
            )}
          </section>

          {money && order.status !== 'Draft' && order.status !== 'Cancelled' && (
            <section className={cardCn}>
              <h2 className="text-[15px] font-semibold text-white">Supplier invoice</h2>
              <label
                data-help="procurement.match-invoice"
                className={cn(
                  'flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-dashed border-white/[0.2] px-4 text-center text-[14px] font-medium text-white touch-manipulation hover:border-elec-yellow',
                  matchInvoice.isPending && 'pointer-events-none'
                )}
              >
                <FileText className="h-4 w-4" aria-hidden />
                {matchInvoice.isPending
                  ? 'Reading the invoice…'
                  : 'Match the invoice (PDF or photo)'}
                <input
                  type="file"
                  accept="application/pdf,image/*"
                  className="sr-only"
                  disabled={matchInvoice.isPending}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) matchInvoice.mutate({ orderId: order.id, file: f });
                    e.target.value = '';
                  }}
                />
              </label>
              <p className="text-[12px] text-white">
                The emailed PDF or a photo of the paper copy. It is checked against this order and
                what arrived, and the cost goes on the job.
              </p>
              {invoices.map((inv) => (
                <div
                  key={inv.id}
                  className="rounded-xl border border-white/[0.12] bg-white/[0.04] p-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-[14px] font-medium text-white">
                      {inv.supplier_name || 'Invoice'}
                      {inv.invoice_number ? ` · ${inv.invoice_number}` : ''}
                    </span>
                    <span className="shrink-0 text-[14px] font-semibold tabular-nums text-white">
                      {gbp(inv.invoice_total)}
                    </span>
                  </div>
                  {inv.matched ? (
                    <p className="mt-1 text-[13px] font-medium text-emerald-300">
                      Matches the order. Good to pay.
                    </p>
                  ) : (
                    <ul className="mt-1 space-y-1">
                      {inv.variances.map((v, i) => (
                        <li key={i} className="text-[13px] leading-snug text-orange-300">
                          {v.detail}
                          {v.amount > 0 ? ` (${gbp(v.amount)} more)` : ''}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </section>
          )}
        </div>

        <div className="space-y-5">
          <section className={cardCn}>
            <h2 className="text-[15px] font-semibold text-white">Details</h2>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[14px] text-white">
              <dt>Ordered</dt>
              <dd className="text-right">
                {fmtDate(order.order_date)}
                {order.ordered_by ? ` by ${order.ordered_by}` : ''}
              </dd>
              <dt>Needed by</dt>
              <dd className="text-right">{fmtDate(order.expected_date)}</dd>
              <dt>Delivery</dt>
              <dd className="text-right">{order.delivery_mode || 'Deliver to site'}</dd>
              {order.delivery_address && (
                <>
                  <dt>Address</dt>
                  <dd className="text-right">{order.delivery_address}</dd>
                </>
              )}
              {order.sent_to_email && (
                <>
                  <dt>Sent to</dt>
                  <dd className="truncate text-right">{order.sent_to_email}</dd>
                </>
              )}
              {order.status === 'Received' && (
                <>
                  <dt>Arrived</dt>
                  <dd className="text-right">{fmtDate(order.delivery_date)}</dd>
                </>
              )}
            </dl>
            {order.notes && (
              <p className="border-t border-white/[0.1] pt-3 text-[14px] text-white">
                {order.notes}
              </p>
            )}
          </section>

          {needsEmail && supplier && (
            <section className={cardCn}>
              <h2 className="text-[15px] font-semibold text-white">
                Order email for {supplier.name}
              </h2>
              <p className="text-[13px] text-white">
                Add the address they take orders on. It is saved to the supplier.
              </p>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <label className={labelCn} htmlFor="po-supplier-email">
                    Email
                  </label>
                  <input
                    id="po-supplier-email"
                    type="email"
                    inputMode="email"
                    value={emailDraft}
                    onChange={(e) => setEmailDraft(e.target.value)}
                    placeholder="orders@merchant.co.uk"
                    className={inputCn}
                  />
                </div>
                <button
                  type="button"
                  onClick={saveEmail}
                  disabled={updateSupplier.isPending}
                  className={cn(buttonSecondaryCn, 'px-4')}
                >
                  Save
                </button>
              </div>
            </section>
          )}

          {receipts.length > 0 && (
            <section className={cardCn}>
              <h2 className="text-[15px] font-semibold text-white">Deliveries</h2>
              <ul className="divide-y divide-white/[0.08]">
                {receipts.map((r) => {
                  const n = r.lines.reduce((s, l) => s + Number(l.qty_received || 0), 0);
                  const url = r.delivery_note_url ? noteUrls[r.delivery_note_url] : undefined;
                  return (
                    <li key={r.id} className="flex items-center justify-between gap-3 py-2.5">
                      <div className="min-w-0">
                        <p className="text-[14px] text-white">
                          {fmtDate(r.received_at)} · {n} item{n === 1 ? '' : 's'}
                        </p>
                        <p className="truncate text-[12.5px] text-white">
                          {[r.received_by, r.notes].filter(Boolean).join(' · ') || 'Booked in'}
                        </p>
                      </div>
                      {url && (
                        <button
                          type="button"
                          onClick={() => openExternalUrl(url)}
                          className="h-11 shrink-0 text-[13px] font-semibold text-elec-yellow touch-manipulation"
                        >
                          Note
                        </button>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          )}

          {canCancel &&
            (confirmCancel ? (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-3">
                <p className="text-[13px] text-red-300">
                  Cancel {order.order_number}? The supplier is not told automatically.
                </p>
                <div className="mt-2 flex gap-2">
                  <button
                    type="button"
                    onClick={() => setConfirmCancel(false)}
                    className={cn(buttonSecondaryCn, 'flex-1')}
                  >
                    Keep it
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      updateStatus.mutate(
                        { id: order.id, status: 'Cancelled' },
                        { onSuccess: onClose }
                      )
                    }
                    disabled={updateStatus.isPending}
                    className="h-12 flex-1 rounded-xl border border-red-500/30 bg-red-500/15 text-[14px] font-semibold text-red-300 touch-manipulation"
                  >
                    Cancel order
                  </button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => setConfirmCancel(true)}
                className="h-11 w-full text-[14px] font-semibold text-red-300 touch-manipulation"
              >
                Cancel this order
              </button>
            ))}
        </div>
      </div>
    </FormSheet>
  );
}

/* ── One supplier ───────────────────────────────────────────────────────── */

function SupplierSheet({
  supplier,
  money,
  onClose,
  onEdit,
  onOrder,
}: {
  supplier: Supplier | null;
  money: boolean;
  onClose: () => void;
  onEdit: (s: Supplier) => void;
  onOrder: (s: Supplier) => void;
}) {
  const actionCn =
    'flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] text-[14px] font-medium text-white touch-manipulation';
  return (
    <FormSheet
      open={!!supplier}
      onOpenChange={(o) => !o && onClose()}
      eyebrow="Supplier"
      title={supplier?.name ?? ''}
      description={supplier?.category}
      width="wide"
      footer={
        supplier ? (
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => onEdit(supplier)}
              className={cn(buttonSecondaryCn, 'flex-1 px-4')}
            >
              Edit
            </button>
            {money && (
              <button
                type="button"
                onClick={() => onOrder(supplier)}
                className={cn(buttonPrimaryCn, 'flex-[1.6] px-4')}
              >
                Order from {supplier.name.split(' ')[0]}
              </button>
            )}
          </div>
        ) : null
      }
    >
      {supplier && (
        <div className="space-y-5 lg:grid lg:grid-cols-2 lg:gap-6 lg:space-y-0">
          <section className={cardCn}>
            <h2 className="text-[15px] font-semibold text-white">Contact</h2>
            <div className="flex gap-2">
              {supplier.phone ? (
                <a href={`tel:${supplier.phone}`} className={actionCn}>
                  <Phone className="h-4 w-4" aria-hidden /> Call
                </a>
              ) : (
                <span className={cn(actionCn, 'opacity-50')}>
                  <Phone className="h-4 w-4" aria-hidden /> No phone
                </span>
              )}
              {supplier.email ? (
                <a href={`mailto:${supplier.email}`} className={actionCn}>
                  <Mail className="h-4 w-4" aria-hidden /> Email
                </a>
              ) : (
                <span className={cn(actionCn, 'opacity-50')}>
                  <Mail className="h-4 w-4" aria-hidden /> No email
                </span>
              )}
            </div>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[14px] text-white">
              <dt>Account no.</dt>
              <dd className="text-right tabular-nums">{supplier.account_number || '—'}</dd>
              <dt>Contact</dt>
              <dd className="text-right">{supplier.contact_name || '—'}</dd>
              <dt>Order email</dt>
              <dd className="truncate text-right">{supplier.email || '—'}</dd>
              <dt>Phone</dt>
              <dd className="text-right">{supplier.phone || '—'}</dd>
              <dt>Address</dt>
              <dd className="text-right">{supplier.address || '—'}</dd>
            </dl>
          </section>
          <section className={cardCn}>
            <h2 className="text-[15px] font-semibold text-white">Terms</h2>
            <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-[14px] text-white">
              <dt>Delivery</dt>
              <dd className="text-right">
                {supplier.delivery_days == null
                  ? '—'
                  : supplier.delivery_days === 0
                    ? 'Same day'
                    : `${supplier.delivery_days} day${supplier.delivery_days === 1 ? '' : 's'}`}
              </dd>
              {money && (
                <>
                  <dt>Discount</dt>
                  <dd className="text-right">
                    {Number(supplier.discount_percent) > 0
                      ? `${Number(supplier.discount_percent)}%`
                      : '—'}
                  </dd>
                  <dt>Credit limit</dt>
                  <dd className="text-right">
                    {supplier.credit_limit ? gbp(Number(supplier.credit_limit)) : '—'}
                  </dd>
                  <dt>Balance</dt>
                  <dd className="text-right">
                    {supplier.balance ? gbp(Number(supplier.balance)) : '—'}
                  </dd>
                </>
              )}
            </dl>
            {supplier.notes && (
              <p className="border-t border-white/[0.1] pt-3 text-[14px] text-white">
                {supplier.notes}
              </p>
            )}
          </section>
        </div>
      )}
    </FormSheet>
  );
}
