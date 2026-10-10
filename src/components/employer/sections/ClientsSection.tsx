import { useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { FormSheet } from '@/components/forms/FormSheet';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import {
  PageFrame,
  PageHero,
  StatStrip,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  IconButton,
  Field,
  FormCard,
  inputClass,
} from '@/components/employer/editorial';
import {
  PanelTitle,
  PlainEmpty,
  Row,
  RowList,
  StatusPill,
  Initials,
  asideFirstClass,
  colClass,
  frameClass,
  heroPrimaryClass,
  searchInputClass,
  twoColClass,
} from '@/components/employer/pageParts/PageParts';
import { RefreshCw, Search, Plus } from 'lucide-react';
import { useClientSummaries, useCreateClient } from '@/hooks/useEmployerClients';
import {
  getClientDuplicates,
  type EmployerClientSummary,
} from '@/services/employerClientService';
import { useQuery } from '@tanstack/react-query';
import { ClientMatchHint } from '@/components/employer/clients/ClientMatchHint';
import { ClientDetailSheet } from '@/components/employer/sheets/ClientDetailSheet';
import { useClientMessageInbox } from '@/hooks/useCustomerPortal';
import type { Section } from '@/pages/employer/EmployerDashboard';
import { useEmployerRole } from '@/hooks/useEmployerRole';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { CLIENTS_HELP } from '@/components/employer/help/clients';

const fmt = (n: number) => `£${Math.round(n).toLocaleString('en-GB')}`;

interface ClientsSectionProps {
  onNavigate: (section: Section) => void;
}


/** Underline multi-line field, matching the inputs (design audit 2). */
const underlineAreaClass =
  'input-underline min-h-[44px] w-full resize-none rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2.5 text-base font-medium text-white placeholder:font-normal placeholder:text-white/25 caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus-visible:ring-0 focus:ring-0 focus:outline-none touch-manipulation';

/** "DEMO — Mrs Patel" -> "DP": punctuation and titles out before the initials. */
const clientInitials = (name: string) =>
  name
    .replace(/[^\p{L}\p{N}\s]+/gu, ' ')
    .split(/\s+/)
    .filter((w) => w && !/^(mr|mrs|ms|miss|mx|dr)$/i.test(w))
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase() || '?';

export function ClientsSection({ onNavigate }: ClientsSectionProps) {
  const { data: roleInfo } = useEmployerRole();
  const canSeeMoney = !!roleInfo?.canSeeMoney;
  const { data: clients = [], isLoading, isError, refetch, isRefetching } = useClientSummaries();
  const createClient = useCreateClient();
  const { data: inbox = [] } = useClientMessageInbox();
  const unreadByClient = useMemo(
    () => new Map(inbox.filter((t) => t.unread > 0).map((t) => [t.customer_id, t.unread])),
    [inbox]
  );
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<EmployerClientSummary | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({
    name: '',
    company_name: '',
    email: '',
    phone: '',
    address: '',
    notes: '',
  });
  // ELE-1996: &tab=messages (bell notification, Client portal page, Overview)
  // opens the record with the message thread in view.
  const [focus, setFocus] = useState<'messages' | null>(null);
  const closeDetail = () => {
    setSelected(null);
    setFocus(null);
  };

  // ?client=<id> opens that client (from the hub search, ELE-1939).
  const [searchParams, setSearchParams] = useSearchParams();
  const urlClientId = searchParams.get('client');
  const urlTab = searchParams.get('tab');
  useEffect(() => {
    if (!urlClientId || clients.length === 0) return;
    const match = clients.find((c) => c.id === urlClientId);
    if (match) {
      setSelected(match);
      setFocus(urlTab === 'messages' ? 'messages' : null);
    }
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('client');
        next.delete('tab');
        return next;
      },
      { replace: true }
    );
  }, [urlClientId, urlTab, clients, setSearchParams]);

  const totals = useMemo(
    () => ({
      count: clients.length,
      outstanding: clients.reduce((s, c) => s + c.outstanding, 0),
      pipeline: clients.reduce((s, c) => s + c.open_quote_value, 0),
      paid: clients.reduce((s, c) => s + c.total_paid, 0),
    }),
    [clients]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return clients;
    return clients.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        (c.company_name || '').toLowerCase().includes(q) ||
        (c.email || '').toLowerCase().includes(q)
    );
  }, [clients, query]);

  const resetForm = () =>
    setForm({ name: '', company_name: '', email: '', phone: '', address: '', notes: '' });

  const handleAdd = async () => {
    if (!form.name.trim()) {
      toast({ title: 'Name required', variant: 'destructive' });
      return;
    }
    try {
      await createClient.mutateAsync({
        name: form.name.trim(),
        company_name: form.company_name || null,
        email: form.email || null,
        phone: form.phone || null,
        address: form.address || null,
        notes: form.notes || null,
      });
      toast({ title: 'Client added' });
      resetForm();
      setAddOpen(false);
    } catch {
      toast({
        title: 'Could not add client',
        description: 'Please try again.',
        variant: 'destructive',
      });
    }
  };

  // Live "Before you start" line for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] =
    !isLoading && !isError && clients.length === 0
      ? [
          {
            text: 'No clients yet. Add your first one to see their quotes, invoices and jobs together.',
            fixLabel: 'Add a client',
            onFix: () => setAddOpen(true),
          },
        ]
      : [];

  const owing = useMemo(
    () => clients.filter((c) => c.outstanding > 0).sort((a, b) => b.outstanding - a.outstanding),
    [clients]
  );
  const waiting = useMemo(
    () => inbox.filter((t) => t.unread > 0 && clients.some((c) => c.id === t.customer_id)),
    [inbox, clients]
  );
  // ELE-2065 §3A #14: clients that look like the same person (read-only).
  const { data: duplicates = [] } = useQuery({
    queryKey: ['employer-clients', 'duplicates', clients.length],
    enabled: clients.length > 1,
    staleTime: 60_000,
    queryFn: getClientDuplicates,
  });

  const headline = isLoading
    ? 'Loading your clients.'
    : isError
      ? "Couldn't load your clients."
      : clients.length === 0
        ? 'No clients yet. Add one, or convert a lead.'
        : [
            owing.length > 0
              ? canSeeMoney
                ? `${owing.length} owe you ${fmt(totals.outstanding)}`
                : `${owing.length} owe you money`
              : 'Nobody owes you money',
            waiting.length > 0
              ? `${waiting.length} waiting on a reply`
              : `${clients.length} client${clients.length === 1 ? '' : 's'} on record`,
          ].join(', ') + '.';

  const openClient = (id: string, messages = false) => {
    const match = clients.find((c) => c.id === id);
    if (!match) return;
    setSelected(match);
    setFocus(messages ? 'messages' : null);
  };

  return (
    <>
      <PageFrame className={frameClass}>
        <PageHero
          title="Clients"
          description={headline}
          actions={
            <>
              <PrimaryButton
                data-help="clients.add"
                onClick={() => setAddOpen(true)}
                className={heroPrimaryClass}
              >
                <Plus className="h-4 w-4 mr-1.5" />
                Add client
              </PrimaryButton>
              <IconButton onClick={() => refetch()} aria-label="Refresh">
                <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
              </IconButton>
              <PageHelpButton
                help={CLIENTS_HELP}
                blockers={helpBlockers}
                askContext={{ page: 'clients' }}
              />
            </>
          }
        />

        <HowItWorks help={CLIENTS_HELP} blockers={helpBlockers} askContext={{ page: 'clients' }} />

        {clients.length > 0 && (
          <StatStrip
            columns={canSeeMoney ? 4 : 2}
            stats={
              canSeeMoney
                ? [
                    { label: 'Clients', value: totals.count, sub: 'On record' },
                    { label: 'Paid to date', value: fmt(totals.paid), sub: 'All clients' },
                    {
                      label: 'Owed to you',
                      value: fmt(totals.outstanding),
                      sub: owing.length > 0 ? `${owing.length} with a balance` : 'Nothing owed',
                      tone: totals.outstanding > 0 ? 'yellow' : undefined,
                    },
                    {
                      label: 'Open quotes',
                      value: fmt(totals.pipeline),
                      sub: 'Waiting on a decision',
                    },
                  ]
                : // Office managers: no firm-wide £ totals (ELE-1831). Each client's
                  // own balance still shows so they can chase it.
                  [
                    { label: 'Clients', value: totals.count, sub: 'On record' },
                    {
                      label: 'Owing',
                      value: owing.length,
                      sub: owing.length > 0 ? 'Clients with a balance' : 'Nothing owed',
                      tone: owing.length > 0 ? 'yellow' : undefined,
                    },
                  ]
            }
          />
        )}

        <div className={clients.length > 0 ? twoColClass : undefined}>
          <div className={colClass}>
            <section>
              <PanelTitle
                title="All clients"
                meta={
                  clients.length > 0
                    ? query.trim()
                      ? `${filtered.length} of ${clients.length}`
                      : `${clients.length}`
                    : undefined
                }
              />
              {clients.length > 0 && (
                <div className="relative mb-3">
                  <Search className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-white" />
                  <input
                    className={searchInputClass}
                    placeholder="Search by name, company or email"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </div>
              )}
              {isLoading ? (
                <LoadingBlocks />
              ) : isError ? (
                <PlainEmpty
                  stacked
                  text="Couldn't load clients. Check your connection and try again."
                  action="Retry"
                  onAction={() => refetch()}
                />
              ) : filtered.length === 0 ? (
                <PlainEmpty
                  stacked
                  text={
                    clients.length === 0
                      ? 'Your clients show here with their quotes, invoices and jobs.'
                      : 'No client matches that search.'
                  }
                  action={clients.length === 0 ? 'Add client' : 'Clear search'}
                  onAction={() => (clients.length === 0 ? setAddOpen(true) : setQuery(''))}
                />
              ) : (
                <div data-help="clients.list">
                  <RowList>
                    {filtered.map((c) => {
                      const unread = unreadByClient.get(c.id);
                      return (
                        <Row
                          wrapDetail
                          key={c.id}
                          onClick={() => setSelected(c)}
                          lead={<Initials text={clientInitials(c.name)} />}
                          title={c.name}
                          detail={[
                            c.company_name,
                            `${c.job_count} job${c.job_count === 1 ? '' : 's'}`,
                          ]
                            .filter(Boolean)
                            .join(' · ')}
                          trailing={
                            <>
                              {unread ? (
                                <StatusPill tone="volt">
                                  {unread} new message{unread === 1 ? '' : 's'}
                                </StatusPill>
                              ) : null}
                              <span className="text-right">
                                <span className="block text-[14px] font-semibold tabular-nums text-white">
                                  {fmt(c.total_paid)}
                                </span>
                                {c.outstanding > 0 && (
                                  <span className="block text-[12px] font-semibold tabular-nums text-elec-yellow">
                                    {fmt(c.outstanding)} due
                                  </span>
                                )}
                              </span>
                            </>
                          }
                        />
                      );
                    })}
                  </RowList>
                </div>
              )}
            </section>
          </div>

          {clients.length > 0 && (
            <div
              className={cn(
                // Flex, not space-y, so "May be the same client" can lead on a phone.
                'flex min-w-0 flex-col gap-6 sm:gap-8',
                (owing.length > 0 || waiting.length > 0 || duplicates.length > 0) && asideFirstClass
              )}
            >
              {/* Empty: desktop only, so a phone reaches the client list sooner. */}
              <section className={owing.length === 0 ? 'hidden lg:block' : undefined}>
                <PanelTitle
                  title="Owing you"
                  meta={owing.length > 0 ? `${owing.length}` : undefined}
                  action={owing.length > 0 ? 'Invoices' : undefined}
                  onAction={() => onNavigate('quotes')}
                />
                {owing.length === 0 ? (
                  <PlainEmpty stacked text="No client owes you anything right now." />
                ) : (
                  <RowList>
                    {owing.slice(0, 6).map((c) => (
                      <Row
                        wrapDetail
                        key={c.id}
                        title={c.name}
                        detail={
                          c.company_name || `${c.job_count} job${c.job_count === 1 ? '' : 's'}`
                        }
                        trailing={
                          <span className="text-[14px] font-semibold tabular-nums text-elec-yellow">
                            {fmt(c.outstanding)}
                          </span>
                        }
                        onClick={() => setSelected(c)}
                      />
                    ))}
                  </RowList>
                )}
              </section>

              {duplicates.length > 0 && (
                <section className="order-first lg:order-none">
                  <PanelTitle title="May be the same client" meta={`${duplicates.length}`} />
                  <RowList>
                    {duplicates.slice(0, 6).map((g) => (
                      <Row
                        wrapDetail
                        key={g.clients.map((c) => c.id).join('-')}
                        title={g.clients.map((c) => c.name.trim()).join(' and ')}
                        detail={
                          g.reason === 'email'
                            ? `Same email, ${g.clients[0].email}`
                            : g.reason === 'phone'
                              ? `Same phone number, ${g.clients[0].phone}`
                              : 'Same name'
                        }
                        trailing={<StatusPill>{g.clients.length} records</StatusPill>}
                        onClick={() => openClient(g.clients[0].id)}
                      />
                    ))}
                  </RowList>
                  <p className="mt-2 px-4 text-[13px] leading-snug text-white sm:px-0">
                    Nothing is merged. Open each record to check which one to keep.
                  </p>
                </section>
              )}

              {waiting.length > 0 && (
                <section>
                  <PanelTitle
                    title="Waiting on a reply"
                    meta={`${waiting.length}`}
                    action="Portal"
                    onAction={() => onNavigate('clientportal')}
                  />
                  <RowList>
                    {waiting.slice(0, 6).map((t) => (
                      <Row
                        wrapDetail
                        key={t.customer_id}
                        title={t.customer_name}
                        detail={t.last_message}
                        trailing={<StatusPill tone="volt">{t.unread} new</StatusPill>}
                        onClick={() => openClient(t.customer_id, true)}
                      />
                    ))}
                  </RowList>
                </section>
              )}
            </div>
          )}
        </div>
      </PageFrame>

      <ClientDetailSheet
        // Read the live row so an edit shows straight away (selected is a snapshot).
        client={clients.find((c) => c.id === selected?.id) ?? selected}
        open={!!selected}
        onOpenChange={(o) => !o && closeDetail()}
        onNavigate={onNavigate}
        focus={focus}
      />

      {/* Add client */}
      <FormSheet
        open={addOpen}
        onOpenChange={setAddOpen}
        title="Add client"
        description="Only the name is needed. Add the rest now or later from their record."
        width="wide"
        bodyClassName="space-y-5 pt-1"
        footer={
          <div className="flex gap-2 sm:justify-end">
            <SecondaryButton onClick={() => setAddOpen(false)} className="flex-1 sm:flex-none">
              Cancel
            </SecondaryButton>
            <PrimaryButton
              data-help="clients.add-save"
              onClick={handleAdd}
              disabled={createClient.isPending}
              className="flex-1 sm:flex-none"
            >
              {createClient.isPending ? 'Adding…' : 'Add client'}
            </PrimaryButton>
          </div>
        }
      >
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
          <FormCard eyebrow="Who">
            <Field label="Client name" required>
              <Input
                className={inputClass}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Riverside Developments Ltd"
              />
            </Field>
            <Field label="Company">
              <Input
                className={inputClass}
                value={form.company_name}
                onChange={(e) => setForm({ ...form, company_name: e.target.value })}
                placeholder="Optional"
              />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Email">
                <Input
                  className={inputClass}
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
              </Field>
              <Field label="Phone">
                <Input
                  className={inputClass}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </Field>
            </div>
            <ClientMatchHint
              name={form.name}
              email={form.email}
              phone={form.phone}
              pickedId={null}
              useLabel="Open their record"
              intro="They may already be on your list. Open their record instead of adding them twice."
              onPick={(m) => {
                if (m && m !== 'new') {
                  setAddOpen(false);
                  resetForm();
                  openClient(m.id);
                }
              }}
            />
          </FormCard>
          <FormCard eyebrow="Where and notes">
            <Field label="Address">
              <Input
                className={inputClass}
                value={form.address}
                autoComplete="street-address"
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                placeholder="Street, town, postcode"
              />
            </Field>
            <Field label="Notes">
              <textarea
                className={underlineAreaClass}
                rows={2}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </Field>
          </FormCard>
        </div>
      </FormSheet>
    </>
  );
}
