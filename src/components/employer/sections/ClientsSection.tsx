import { useMemo, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from '@/hooks/use-toast';
import {
  PageFrame,
  PageHero,
  StatStrip,
  ListCard,
  ListCardHeader,
  ListBody,
  ListRow,
  Avatar,
  Pill,
  EmptyState,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  IconButton,
  Field,
  FormCard,
  SheetShell,
  inputClass,
  textareaClass,
} from '@/components/employer/editorial';
import { RefreshCw, Search, Plus } from 'lucide-react';
import { useClientSummaries, useCreateClient } from '@/hooks/useEmployerClients';
import type { EmployerClientSummary } from '@/services/employerClientService';
import { ClientDetailSheet } from '@/components/employer/sheets/ClientDetailSheet';
import type { Section } from '@/pages/employer/EmployerDashboard';

const fmt = (n: number) => `£${Math.round(n).toLocaleString('en-GB')}`;

const initialsOf = (name: string) =>
  name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?';

interface ClientsSectionProps {
  onNavigate: (section: Section) => void;
}

export function ClientsSection({ onNavigate }: ClientsSectionProps) {
  const { data: clients = [], isLoading, isError, refetch, isRefetching } = useClientSummaries();
  const createClient = useCreateClient();
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<EmployerClientSummary | null>(null);
  const [addOpen, setAddOpen] = useState(false);
  const [form, setForm] = useState({ name: '', contact_name: '', email: '', phone: '', address: '', notes: '' });

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
        (c.contact_name || '').toLowerCase().includes(q) ||
        (c.email || '').toLowerCase().includes(q)
    );
  }, [clients, query]);

  const resetForm = () =>
    setForm({ name: '', contact_name: '', email: '', phone: '', address: '', notes: '' });

  const handleAdd = async () => {
    if (!form.name.trim()) {
      toast({ title: 'Name required', variant: 'destructive' });
      return;
    }
    try {
      await createClient.mutateAsync({
        name: form.name.trim(),
        contact_name: form.contact_name || null,
        email: form.email || null,
        phone: form.phone || null,
        address: form.address || null,
        notes: form.notes || null,
      });
      toast({ title: 'Client added' });
      resetForm();
      setAddOpen(false);
    } catch {
      toast({ title: 'Could not add client', description: 'Please try again.', variant: 'destructive' });
    }
  };

  return (
    <>
      <PageFrame>
        <PageHero
          eyebrow="Finance"
          title="Clients"
          description="Every customer in one place — quotes, invoices, jobs and what they owe."
          tone="yellow"
          actions={
            <>
              <PrimaryButton onClick={() => setAddOpen(true)}>
                <Plus className="h-4 w-4 mr-1.5" />
                Add client
              </PrimaryButton>
              <IconButton onClick={() => refetch()} aria-label="Refresh">
                <RefreshCw className={`h-4 w-4 ${isRefetching ? 'animate-spin' : ''}`} />
              </IconButton>
            </>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Clients', value: totals.count },
            { label: 'Paid', value: fmt(totals.paid), accent: true },
            { label: 'Outstanding', value: fmt(totals.outstanding), tone: totals.outstanding > 0 ? 'amber' : 'emerald' },
            { label: 'Pipeline', value: fmt(totals.pipeline), tone: 'cyan' },
          ]}
        />

        {clients.length > 0 && (
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/40" />
            <Input
              className={`${inputClass} pl-9`}
              placeholder="Search clients"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
        )}

        {isLoading ? (
          <LoadingBlocks />
        ) : isError ? (
          <EmptyState
            title="Couldn't load clients"
            description="Check your connection and try again."
            action="Retry"
            onAction={() => refetch()}
          />
        ) : filtered.length === 0 ? (
          <EmptyState
            title={clients.length === 0 ? 'No clients yet' : 'No matches'}
            description={
              clients.length === 0
                ? 'Add your first client to start tracking their quotes, invoices and jobs.'
                : 'Try a different search.'
            }
            action={clients.length === 0 ? 'Add client' : undefined}
            onAction={() => setAddOpen(true)}
          />
        ) : (
          <ListCard>
            <ListCardHeader tone="yellow" title="All clients" meta={<Pill tone="default">{filtered.length}</Pill>} />
            <ListBody>
              {filtered.map((c) => (
                <ListRow
                  key={c.id}
                  onClick={() => setSelected(c)}
                  lead={<Avatar initials={initialsOf(c.name)} />}
                  title={c.name}
                  subtitle={
                    [c.contact_name, `${c.job_count} job${c.job_count === 1 ? '' : 's'}`]
                      .filter(Boolean)
                      .join(' · ')
                  }
                  trailing={
                    <span className="text-right">
                      <span className="block text-[13px] font-semibold text-white tabular-nums">
                        {fmt(c.total_paid)}
                      </span>
                      {c.outstanding > 0 && (
                        <span className="block text-[11px] text-amber-400 tabular-nums">
                          {fmt(c.outstanding)} due
                        </span>
                      )}
                    </span>
                  }
                />
              ))}
            </ListBody>
          </ListCard>
        )}
      </PageFrame>

      <ClientDetailSheet
        client={selected}
        open={!!selected}
        onOpenChange={(o) => !o && setSelected(null)}
        onNavigate={onNavigate}
      />

      {/* Add client */}
      <Sheet open={addOpen} onOpenChange={setAddOpen}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          <SheetShell eyebrow="Finance" title="Add client">
            <div className="px-5 sm:px-6 py-5 space-y-4">
              <FormCard eyebrow="Details">
                <Field label="Business / client name" required>
                  <Input
                    className={inputClass}
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="e.g. Riverside Developments Ltd"
                  />
                </Field>
                <Field label="Contact name">
                  <Input
                    className={inputClass}
                    value={form.contact_name}
                    onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
                  />
                </Field>
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
                <Field label="Address">
                  <Textarea
                    className={textareaClass}
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                  />
                </Field>
                <Field label="Notes">
                  <Textarea
                    className={textareaClass}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  />
                </Field>
              </FormCard>
              <div className="flex gap-2">
                <SecondaryButton onClick={() => setAddOpen(false)} fullWidth>
                  Cancel
                </SecondaryButton>
                <PrimaryButton onClick={handleAdd} disabled={createClient.isPending} fullWidth>
                  {createClient.isPending ? 'Adding…' : 'Add client'}
                </PrimaryButton>
              </div>
            </div>
          </SheetShell>
        </SheetContent>
      </Sheet>
    </>
  );
}
