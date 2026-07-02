import { useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { openExternalUrl } from '@/utils/open-external-url';
import { toast } from '@/hooks/use-toast';
import {
  SheetShell,
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
  DestructiveButton,
  Field,
  FormCard,
  inputClass,
  textareaClass,
  Eyebrow,
} from '@/components/employer/editorial';
import { Phone, Mail, FileText, Briefcase, Pencil, Trash2 } from 'lucide-react';
import type { EmployerClientSummary } from '@/services/employerClientService';
import { daysOverdue } from '@/utils/invoiceAging';
import { useClientLinkedRecords, useUpdateClient, useDeleteClient } from '@/hooks/useEmployerClients';
import type { Section } from '@/pages/employer/EmployerDashboard';

const fmt = (n: number) => `£${Math.round(n).toLocaleString('en-GB')}`;
const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

const statusTone = (s: string): 'emerald' | 'amber' | 'red' | 'cyan' | 'default' => {
  const v = s.toLowerCase();
  if (v === 'paid' || v === 'accepted' || v === 'completed' || v === 'won') return 'emerald';
  if (v === 'overdue' || v === 'declined' || v === 'rejected' || v === 'cancelled') return 'red';
  if (v === 'active' || v === 'sent') return 'cyan';
  return 'amber';
};

interface ClientDetailSheetProps {
  client: EmployerClientSummary | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onNavigate: (section: Section) => void;
}

export function ClientDetailSheet({ client, open, onOpenChange, onNavigate }: ClientDetailSheetProps) {
  const { data: linked, isLoading } = useClientLinkedRecords(open ? client?.id : undefined);
  const updateClient = useUpdateClient();
  const deleteClient = useDeleteClient();
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [draft, setDraft] = useState({ contact_name: '', email: '', phone: '', address: '', notes: '' });

  if (!client) return null;

  const startEdit = () => {
    setDraft({
      contact_name: client.contact_name || '',
      email: client.email || '',
      phone: client.phone || '',
      address: client.address || '',
      notes: client.notes || '',
    });
    setEditing(true);
  };

  const saveEdit = async () => {
    try {
      await updateClient.mutateAsync({ id: client.id, updates: draft });
      toast({ title: 'Client updated' });
      setEditing(false);
    } catch {
      toast({ title: 'Could not save', description: 'Please try again.', variant: 'destructive' });
    }
  };

  const handleDelete = async () => {
    try {
      await deleteClient.mutateAsync(client.id);
      toast({ title: 'Client deleted' });
      onOpenChange(false);
    } catch {
      toast({ title: 'Could not delete', description: 'Please try again.', variant: 'destructive' });
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[92vh] p-0 rounded-t-2xl overflow-hidden">
        <SheetShell
          eyebrow="Client"
          title={client.name}
          description={client.contact_name || undefined}
        >
          <div className="px-5 sm:px-6 py-5 space-y-4">
            {/* Lifetime value / outstanding / pipeline — real numbers */}
            <StatStrip
              columns={3}
              stats={[
                { label: 'Lifetime paid', value: fmt(client.total_paid), accent: true },
                {
                  label: 'Outstanding',
                  value: fmt(client.outstanding),
                  tone: client.outstanding > 0 ? 'amber' : 'emerald',
                },
                { label: 'Open quotes', value: fmt(client.open_quote_value), tone: 'cyan' },
              ]}
            />

            {/* Quick actions — reach + create, pre-filled where possible */}
            <div className="grid grid-cols-2 gap-2">
              <SecondaryButton
                onClick={() => client.phone && openExternalUrl(`tel:${client.phone}`)}
                disabled={!client.phone}
                fullWidth
              >
                <Phone className="h-4 w-4 mr-1.5" />
                Call
              </SecondaryButton>
              <SecondaryButton
                onClick={() => client.email && openExternalUrl(`mailto:${client.email}`)}
                disabled={!client.email}
                fullWidth
              >
                <Mail className="h-4 w-4 mr-1.5" />
                Email
              </SecondaryButton>
              <SecondaryButton onClick={() => onNavigate('quotes')} fullWidth>
                <FileText className="h-4 w-4 mr-1.5" />
                New quote
              </SecondaryButton>
              <SecondaryButton onClick={() => onNavigate('jobs')} fullWidth>
                <Briefcase className="h-4 w-4 mr-1.5" />
                New job
              </SecondaryButton>
            </div>

            {/* Contact card / edit */}
            {editing ? (
              <FormCard eyebrow="Edit client">
                <Field label="Contact name">
                  <Input
                    className={inputClass}
                    value={draft.contact_name}
                    onChange={(e) => setDraft({ ...draft, contact_name: e.target.value })}
                  />
                </Field>
                <Field label="Email">
                  <Input
                    className={inputClass}
                    type="email"
                    value={draft.email}
                    onChange={(e) => setDraft({ ...draft, email: e.target.value })}
                  />
                </Field>
                <Field label="Phone">
                  <Input
                    className={inputClass}
                    value={draft.phone}
                    onChange={(e) => setDraft({ ...draft, phone: e.target.value })}
                  />
                </Field>
                <Field label="Address">
                  <Textarea
                    className={textareaClass}
                    value={draft.address}
                    onChange={(e) => setDraft({ ...draft, address: e.target.value })}
                  />
                </Field>
                <Field label="Notes">
                  <Textarea
                    className={textareaClass}
                    value={draft.notes}
                    onChange={(e) => setDraft({ ...draft, notes: e.target.value })}
                  />
                </Field>
                <div className="flex gap-2">
                  <SecondaryButton onClick={() => setEditing(false)} fullWidth>
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton onClick={saveEdit} disabled={updateClient.isPending} fullWidth>
                    {updateClient.isPending ? 'Saving…' : 'Save'}
                  </PrimaryButton>
                </div>
              </FormCard>
            ) : (
              (client.email || client.phone || client.address || client.notes) && (
                <ListCard>
                  <ListCardHeader
                    tone="default"
                    title="Contact"
                    action="Edit"
                    onAction={startEdit}
                  />
                  <ListBody>
                    {client.email && <ListRow title="Email" subtitle={client.email} />}
                    {client.phone && <ListRow title="Phone" subtitle={client.phone} />}
                    {client.address && <ListRow title="Address" subtitle={client.address} />}
                    {client.notes && <ListRow title="Notes" subtitle={client.notes} />}
                  </ListBody>
                </ListCard>
              )
            )}

            {/* Linked records — the hub */}
            {isLoading ? (
              <LoadingBlocks />
            ) : (
              <>
                <ListCard>
                  <ListCardHeader
                    tone="yellow"
                    title="Quotes"
                    meta={<Pill tone="default">{linked?.quotes.length ?? 0}</Pill>}
                    action="View all"
                    onAction={() => onNavigate('quotes')}
                  />
                  <ListBody>
                    {linked?.quotes.length ? (
                      linked.quotes.slice(0, 6).map((q) => (
                        <ListRow
                          key={q.id}
                          title={q.quote_number || q.job_title || 'Quote'}
                          subtitle={fmtDate(q.created_at)}
                          trailing={
                            <span className="flex items-center gap-2">
                              <span className="text-[13px] font-semibold text-white tabular-nums">
                                {fmt(q.value)}
                              </span>
                              <Pill tone={statusTone(q.status)}>{q.status}</Pill>
                            </span>
                          }
                        />
                      ))
                    ) : (
                      <div className="p-5">
                        <EmptyState title="No quotes yet" />
                      </div>
                    )}
                  </ListBody>
                </ListCard>

                <ListCard>
                  <ListCardHeader
                    tone="emerald"
                    title="Invoices"
                    meta={<Pill tone="default">{linked?.invoices.length ?? 0}</Pill>}
                    action="View all"
                    onAction={() => onNavigate('quotes')}
                  />
                  <ListBody>
                    {linked?.invoices.length ? (
                      linked.invoices.slice(0, 6).map((inv) => {
                        const over =
                          inv.status !== 'Paid' ? daysOverdue({ due_date: inv.due_date }) : 0;
                        return (
                          <ListRow
                            key={inv.id}
                            title={inv.invoice_number || 'Invoice'}
                            subtitle={
                              over > 0
                                ? `${over} day${over === 1 ? '' : 's'} overdue`
                                : inv.due_date
                                  ? `Due ${fmtDate(inv.due_date)}`
                                  : fmtDate(inv.created_at)
                            }
                            trailing={
                              <span className="flex items-center gap-2">
                                <span className="text-[13px] font-semibold text-white tabular-nums">
                                  {fmt(inv.amount)}
                                </span>
                                <Pill tone={over > 0 ? 'red' : statusTone(inv.status)}>
                                  {over > 0 ? 'Overdue' : inv.status}
                                </Pill>
                              </span>
                            }
                          />
                        );
                      })
                    ) : (
                      <div className="p-5">
                        <EmptyState title="No invoices yet" />
                      </div>
                    )}
                  </ListBody>
                </ListCard>

                <ListCard>
                  <ListCardHeader
                    tone="cyan"
                    title="Jobs"
                    meta={<Pill tone="default">{linked?.jobs.length ?? 0}</Pill>}
                    action="View all"
                    onAction={() => onNavigate('jobs')}
                  />
                  <ListBody>
                    {linked?.jobs.length ? (
                      linked.jobs.slice(0, 6).map((j) => (
                        <ListRow
                          key={j.id}
                          title={j.title}
                          subtitle={j.start_date ? fmtDate(j.start_date) : undefined}
                          trailing={
                            <span className="flex items-center gap-2">
                              {j.value != null && (
                                <span className="text-[13px] font-semibold text-white tabular-nums">
                                  {fmt(j.value)}
                                </span>
                              )}
                              <Pill tone={statusTone(j.status)}>{j.status}</Pill>
                            </span>
                          }
                        />
                      ))
                    ) : (
                      <div className="p-5">
                        <EmptyState title="No jobs yet" />
                      </div>
                    )}
                  </ListBody>
                </ListCard>
              </>
            )}

            {/* Manage */}
            <div className="pt-2">
              {confirmDelete ? (
                <FormCard eyebrow="Delete client">
                  <p className="text-[13px] text-white">
                    This removes the client record. Their quotes, invoices and jobs are kept (just
                    unlinked). This can't be undone.
                  </p>
                  <div className="flex gap-2">
                    <SecondaryButton onClick={() => setConfirmDelete(false)} fullWidth>
                      Cancel
                    </SecondaryButton>
                    <DestructiveButton
                      onClick={handleDelete}
                      disabled={deleteClient.isPending}
                      fullWidth
                    >
                      {deleteClient.isPending ? 'Deleting…' : 'Delete'}
                    </DestructiveButton>
                  </div>
                </FormCard>
              ) : (
                <div className="flex items-center justify-between">
                  <Eyebrow>Added {fmtDate(client.created_at)}</Eyebrow>
                  <div className="flex gap-2">
                    <SecondaryButton onClick={startEdit} size="sm">
                      <Pencil className="h-4 w-4" />
                    </SecondaryButton>
                    <SecondaryButton onClick={() => setConfirmDelete(true)} size="sm">
                      <Trash2 className="h-4 w-4" />
                    </SecondaryButton>
                  </div>
                </div>
              )}
            </div>
          </div>
        </SheetShell>
      </SheetContent>
    </Sheet>
  );
}
