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
import { useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import {
  useClientActivities,
  useLogClientActivity,
  type ActivityType,
} from '@/hooks/useClientActivities';
import {
  useClientTasks,
  useAddClientTask,
  useToggleClientTask,
  useDeleteClientTask,
} from '@/hooks/useClientTasks';
import { useClientReviews, useAddReview, useDeleteReview } from '@/hooks/useClientReviews';
import { cn } from '@/lib/utils';
import { CreateQuoteDialog } from '@/components/employer/dialogs/CreateQuoteDialog';
import { AddJobDialog } from '@/components/employer/dialogs/AddJobDialog';
import type { Section } from '@/pages/employer/EmployerDashboard';

const fmt = (n: number) => `£${Math.round(n).toLocaleString('en-GB')}`;
const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';

const statusTone = (s: string): 'emerald' | 'amber' | 'red' | 'cyan' | 'default' => {
  const v = s.toLowerCase();
  if (v === 'paid' || v === 'accepted' || v === 'completed' || v === 'won' || v === 'converted')
    return 'emerald';
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
  const { data: activities = [] } = useClientActivities(open ? client?.id : undefined);
  const logActivity = useLogClientActivity();
  const { data: tasks = [] } = useClientTasks(open ? client?.id : undefined);
  const addTask = useAddClientTask();
  const toggleTask = useToggleClientTask();
  const deleteTask = useDeleteClientTask();
  const { data: reviews = [] } = useClientReviews(open ? client?.id : undefined);
  const addReview = useAddReview();
  const deleteReview = useDeleteReview();
  const updateClient = useUpdateClient();
  const deleteClient = useDeleteClient();
  const [editing, setEditing] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [showQuote, setShowQuote] = useState(false);
  const [showJob, setShowJob] = useState(false);
  const [actType, setActType] = useState<ActivityType>('note');
  const [actText, setActText] = useState('');
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDue, setTaskDue] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [draft, setDraft] = useState({ contact_name: '', email: '', phone: '', address: '', notes: '' });
  const queryClient = useQueryClient();
  const [, setSearchParams] = useSearchParams();

  // Open a specific linked record via its section deep-link, closing this sheet.
  const openJob = (jobId: string) => {
    setSearchParams({ section: 'jobs', job: jobId });
    onOpenChange(false);
  };
  const openQuote = (id: string) => {
    setSearchParams({ section: 'quotes', quote: id });
    onOpenChange(false);
  };
  const openInvoice = (id: string) => {
    setSearchParams({ section: 'quotes', invoice: id });
    onOpenChange(false);
  };

  // Creating a quote/job from the client pre-fills + auto-links it; on close,
  // refresh the client's linked lists so the new record shows immediately.
  const closeAndRefresh = (setter: (v: boolean) => void) => (o: boolean) => {
    setter(o);
    if (!o) queryClient.invalidateQueries({ queryKey: ['employer-clients'] });
  };

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

  const submitLog = async () => {
    if (!actText.trim()) return;
    try {
      await logActivity.mutateAsync({ client_id: client.id, type: actType, summary: actText.trim() });
      setActText('');
    } catch {
      /* non-fatal */
    }
  };

  const submitTask = async () => {
    if (!taskTitle.trim()) return;
    try {
      await addTask.mutateAsync({
        client_id: client.id,
        title: taskTitle.trim(),
        due_date: taskDue || null,
      });
      setTaskTitle('');
      setTaskDue('');
    } catch {
      /* non-fatal */
    }
  };

  const submitReview = async () => {
    try {
      await addReview.mutateAsync({
        client_id: client.id,
        rating: reviewRating,
        text: reviewText.trim() || null,
      });
      setReviewText('');
      setReviewRating(5);
    } catch {
      /* non-fatal */
    }
  };

  const requestReview = () => {
    if (!client.email) return;
    const subject = encodeURIComponent('How did we do?');
    const body = encodeURIComponent(
      `Hi ${client.contact_name || client.name},\n\nThanks for choosing us. If you have a moment, we'd really appreciate a quick review of how the job went — it helps us a lot.\n\nMany thanks.`
    );
    openExternalUrl(`mailto:${client.email}?subject=${subject}&body=${body}`);
  };

  const todayStr = new Date().toISOString().slice(0, 10);

  // One feed: manual activities merged with derived quote/invoice/job events.
  const timeline = [
    ...activities.map((a) => ({ at: a.created_at, kind: a.type as string, text: a.summary })),
    ...(linked?.quotes || []).map((q) => ({
      at: q.created_at,
      kind: 'quote',
      text: `Quote ${q.quote_number || ''} · ${fmt(q.value)}`.trim(),
    })),
    ...(linked?.invoices || []).map((inv) => ({
      at: inv.created_at,
      kind: 'invoice',
      text: `Invoice ${inv.invoice_number || ''} · ${fmt(inv.amount)}`.trim(),
    })),
    ...(linked?.jobs || []).map((j) => ({
      at: j.start_date || '',
      kind: 'job',
      text: `Job: ${j.title}`,
    })),
  ]
    .filter((e) => e.at)
    .sort((a, b) => (a.at < b.at ? 1 : -1));

  return (
    <>
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[92vh] p-0 rounded-t-2xl overflow-hidden">
        <SheetShell
          eyebrow="Client"
          title={client.name}
          description={client.contact_name || undefined}
        >
          <div className="space-y-4">
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
              <SecondaryButton onClick={() => setShowQuote(true)} fullWidth>
                <FileText className="h-4 w-4 mr-1.5" />
                New quote
              </SecondaryButton>
              <SecondaryButton onClick={() => setShowJob(true)} fullWidth>
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
                          onClick={() => openQuote(q.id)}
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
                            onClick={() => openInvoice(inv.id)}
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
                          onClick={() => openJob(j.id)}
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

            {/* Follow-ups */}
            <ListCard>
              <ListCardHeader
                tone="amber"
                title="Follow-ups"
                meta={<Pill tone="default">{tasks.filter((t) => !t.done).length}</Pill>}
              />
              <div className="p-3 border-b border-white/[0.06] flex flex-col gap-2">
                <Input
                  className={inputClass}
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  placeholder="Add a follow-up…"
                  onKeyDown={(e) => e.key === 'Enter' && submitTask()}
                />
                <div className="flex gap-2">
                  <Input
                    className={inputClass}
                    type="date"
                    value={taskDue}
                    onChange={(e) => setTaskDue(e.target.value)}
                  />
                  <SecondaryButton
                    onClick={submitTask}
                    disabled={!taskTitle.trim() || addTask.isPending}
                    className="shrink-0"
                  >
                    Add
                  </SecondaryButton>
                </div>
              </div>
              <ListBody>
                {tasks.length === 0 ? (
                  <div className="p-5">
                    <EmptyState title="No follow-ups" />
                  </div>
                ) : (
                  tasks.map((t) => {
                    const overdue = !t.done && !!t.due_date && t.due_date < todayStr;
                    return (
                      <ListRow
                        key={t.id}
                        onClick={() => toggleTask.mutate({ id: t.id, done: !t.done })}
                        lead={
                          <span
                            className={cn(
                              'h-5 w-5 rounded-md border grid place-items-center text-[11px] font-bold',
                              t.done
                                ? 'bg-emerald-500/80 border-emerald-500 text-black'
                                : 'border-white/25 text-transparent'
                            )}
                          >
                            ✓
                          </span>
                        }
                        title={t.done ? `✓ ${t.title}` : t.title}
                        subtitle={
                          t.due_date
                            ? overdue
                              ? `Overdue · ${fmtDate(t.due_date)}`
                              : `Due ${fmtDate(t.due_date)}`
                            : undefined
                        }
                        trailing={
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteTask.mutate(t.id);
                            }}
                            className="min-h-11 px-2 -my-1 inline-flex items-center text-[12px] text-white/30 hover:text-red-400 touch-manipulation"
                          >
                            Remove
                          </button>
                        }
                      />
                    );
                  })
                )}
              </ListBody>
            </ListCard>

            {/* Activity timeline */}
            <ListCard>
              <ListCardHeader tone="cyan" title="Activity" />
              <div className="p-3 border-b border-white/[0.06] space-y-2">
                <div className="flex gap-1.5">
                  {(['note', 'call', 'email', 'meeting'] as ActivityType[]).map((t) => (
                    <button
                      key={t}
                      onClick={() => setActType(t)}
                      className={cn(
                        'px-3 h-11 rounded-lg text-[12px] capitalize touch-manipulation transition-colors',
                        actType === t
                          ? 'bg-elec-yellow text-black font-medium'
                          : 'bg-white/[0.05] text-white/60 hover:text-white/85'
                      )}
                    >
                      {t}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    className={inputClass}
                    value={actText}
                    onChange={(e) => setActText(e.target.value)}
                    placeholder={`Log a ${actType}…`}
                    onKeyDown={(e) => e.key === 'Enter' && submitLog()}
                  />
                  <SecondaryButton
                    onClick={submitLog}
                    disabled={!actText.trim() || logActivity.isPending}
                  >
                    Log
                  </SecondaryButton>
                </div>
              </div>
              <ListBody>
                {timeline.length === 0 ? (
                  <div className="p-5">
                    <EmptyState title="No activity yet" />
                  </div>
                ) : (
                  timeline.slice(0, 25).map((e, i) => (
                    <ListRow
                      key={`${e.kind}-${i}`}
                      title={e.text}
                      subtitle={fmtDate(e.at)}
                      trailing={<Pill tone="default">{e.kind}</Pill>}
                    />
                  ))
                )}
              </ListBody>
            </ListCard>

            {/* Reviews */}
            <ListCard>
              <ListCardHeader
                tone="yellow"
                title="Reviews"
                meta={<Pill tone="default">{reviews.length}</Pill>}
              />
              <div className="p-3 border-b border-white/[0.06] space-y-2">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button
                      key={n}
                      onClick={() => setReviewRating(n)}
                      className="h-11 w-8 grid place-items-center text-[20px] leading-none touch-manipulation"
                      aria-label={`${n} star${n === 1 ? '' : 's'}`}
                    >
                      <span className={n <= reviewRating ? 'text-elec-yellow' : 'text-white/20'}>
                        ★
                      </span>
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Input
                    className={inputClass}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    placeholder="What did they say?"
                    onKeyDown={(e) => e.key === 'Enter' && submitReview()}
                  />
                  <SecondaryButton onClick={submitReview} disabled={addReview.isPending}>
                    Save
                  </SecondaryButton>
                </div>
                <SecondaryButton onClick={requestReview} disabled={!client.email} fullWidth>
                  Request a review by email
                </SecondaryButton>
              </div>
              <ListBody>
                {reviews.length === 0 ? (
                  <div className="p-5">
                    <EmptyState title="No reviews yet" />
                  </div>
                ) : (
                  reviews.map((r) => (
                    <ListRow
                      key={r.id}
                      title={'★'.repeat(r.rating || 0) + '☆'.repeat(5 - (r.rating || 0))}
                      subtitle={r.text || fmtDate(r.created_at)}
                      trailing={
                        <button
                          onClick={() => deleteReview.mutate(r.id)}
                          className="min-h-11 px-2 -my-1 inline-flex items-center text-[12px] text-white/30 hover:text-red-400 touch-manipulation"
                        >
                          Remove
                        </button>
                      }
                    />
                  ))
                )}
              </ListBody>
            </ListCard>

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
                    <SecondaryButton onClick={startEdit} aria-label="Edit client">
                      <Pencil className="h-4 w-4" />
                    </SecondaryButton>
                    <SecondaryButton onClick={() => setConfirmDelete(true)} aria-label="Delete client">
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

      <CreateQuoteDialog
        open={showQuote}
        onOpenChange={closeAndRefresh(setShowQuote)}
        prefillClient={client.name}
        prefillEmail={client.email || undefined}
        prefillPhone={client.phone || undefined}
        prefillAddress={client.address || undefined}
      />
      <AddJobDialog
        open={showJob}
        onOpenChange={closeAndRefresh(setShowJob)}
        prefillClient={client.name}
      />
    </>
  );
}
