import { useState, useMemo, useEffect } from 'react';
import { FormSheet } from '@/components/forms/FormSheet';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { openExternalUrl } from '@/utils/open-external-url';
import {
  PageFrame,
  PageHero,
  StatStrip,
  LoadingBlocks,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  Field,
  FormCard,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
} from '@/components/employer/editorial';
import {
  PanelTitle,
  PlainEmpty,
  Row,
  RowList,
  Segments,
  StatusPill,
  Initials,
  colClass,
  frameClass,
  heroPrimaryClass,
  panel,
  twoColClass,
  type PillTone,
} from '@/components/employer/pageParts/PageParts';
import { Phone, Mail, Plus, UserPlus, Sparkles, Copy, Check, Send } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import {
  useLeads,
  useCreateLead,
  useUpdateLead,
  useDeleteLead,
  useConvertLead,
  LEAD_STAGES,
  type Lead,
  type LeadStage,
} from '@/hooks/useLeads';
import { useDraftFollowUp } from '@/hooks/useDraftFollowUp';
import { copyToClipboard } from '@/utils/clipboard';
import { toast } from '@/hooks/use-toast';
import { PageHelpButton, HowItWorks, type HelpBlocker } from '@/components/hub/PageHelp';
import { LEADS_HELP } from '@/components/employer/help/clients';
import { decidedCount, winRate as winRateOf } from '@/utils/winRate';

const fmt = (n: number) => `£${Math.round(n).toLocaleString('en-GB')}`;
const stageTone = (s: LeadStage): PillTone =>
  s === 'New' ? 'volt' : s === 'Won' ? 'green' : s === 'Lost' ? 'red' : 'neutral';

const EMPTY_FORM = {
  name: '',
  contact_name: '',
  email: '',
  phone: '',
  source: '',
  estimated_value: '',
  notes: '',
};

export function LeadsSection() {
  const { data: leads = [], isLoading } = useLeads();
  const createLead = useCreateLead();
  const updateLead = useUpdateLead();
  const deleteLead = useDeleteLead();
  const convertLead = useConvertLead();

  const [addOpen, setAddOpen] = useState(false);
  const [selected, setSelected] = useState<Lead | null>(null);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [filter, setFilter] = useState<'all' | LeadStage>('all');
  const [form, setForm] = useState({ ...EMPTY_FORM });
  const [searchParams, setSearchParams] = useSearchParams();

  // Deep link from the bell / push / office email: ?section=leads&lead=<id>
  // opens that lead once the list has loaded, then drops the param.
  const leadParam = searchParams.get('lead');
  useEffect(() => {
    if (!leadParam || isLoading) return;
    const hit = leads.find((l) => l.id === leadParam);
    if (hit) setSelected(hit);
    setSearchParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        next.delete('lead');
        return next;
      },
      { replace: true }
    );
  }, [leadParam, isLoading, leads, setSearchParams]);

  // Mate follow-up drafting
  const followUp = useDraftFollowUp();
  const [channel, setChannel] = useState<'sms' | 'email'>('sms');
  const [draftText, setDraftText] = useState('');
  const [draftCopied, setDraftCopied] = useState(false);
  const draftShown = followUp.loading ? followUp.draft : draftText;

  const parseEmail = (text: string) => {
    const m = text.match(/^\s*subject:\s*(.+)\n([\s\S]*)$/i);
    return m ? { subject: m[1].trim(), body: m[2].trim() } : { subject: '', body: text.trim() };
  };

  const generateDraft = async (lead: Lead, ch: 'sms' | 'email') => {
    setChannel(ch);
    setDraftText('');
    const out = await followUp.generate({
      name: lead.name,
      contact_name: lead.contact_name,
      source: lead.source,
      notes: lead.notes,
      estimated_value: lead.estimated_value,
      channel: ch,
    });
    if (out) setDraftText(out);
  };

  const copyDraft = async () => {
    try {
      await copyToClipboard(draftShown);
      setDraftCopied(true);
      setTimeout(() => setDraftCopied(false), 1800);
      toast({ title: 'Copied', description: 'Paste it into your messages.' });
    } catch {
      toast({ title: 'Copy failed', variant: 'destructive' });
    }
  };

  const sendDraft = (lead: Lead) => {
    if (channel === 'sms' && lead.phone) {
      // `?&body=` is the form that prefills on BOTH iOS and Android.
      openExternalUrl(`sms:${lead.phone}?&body=${encodeURIComponent(draftShown)}`);
    } else if (channel === 'email' && lead.email) {
      const { subject, body } = parseEmail(draftShown);
      openExternalUrl(
        `mailto:${lead.email}?subject=${encodeURIComponent(subject || 'Your enquiry')}&body=${encodeURIComponent(body)}`
      );
    } else {
      copyDraft();
      return;
    }
    if (lead.stage === 'New') setStage(lead, 'Contacted');
  };

  const openLeads = leads.filter((l) => l.stage !== 'Won' && l.stage !== 'Lost');
  const pipeline = openLeads.reduce((s, l) => s + (Number(l.estimated_value) || 0), 0);
  const wonCount = leads.filter((l) => l.stage === 'Won').length;
  const lostCount = leads.filter((l) => l.stage === 'Lost').length;
  // The one win rate (src/utils/winRate.ts): won of decided. Leads don't expire.
  const decided = decidedCount({ won: wonCount, lost: lostCount });
  const winRate = winRateOf({ won: wonCount, lost: lostCount }) ?? 0;

  const filtered = useMemo(
    () => (filter === 'all' ? leads : leads.filter((l) => l.stage === filter)),
    [leads, filter]
  );

  const tabs = useMemo(
    () => [
      { value: 'all', label: 'All', count: leads.length },
      ...LEAD_STAGES.map((s) => ({
        value: s,
        label: s,
        count: leads.filter((l) => l.stage === s).length,
      })),
    ],
    [leads]
  );

  const submitAdd = async () => {
    if (!form.name.trim()) {
      toast({ title: 'Add a name', variant: 'destructive' });
      return;
    }
    try {
      await createLead.mutateAsync({
        name: form.name.trim(),
        contact_name: form.contact_name || null,
        email: form.email || null,
        phone: form.phone || null,
        source: form.source || null,
        estimated_value: Number(form.estimated_value) || 0,
        notes: form.notes || null,
      });
      setForm({ ...EMPTY_FORM });
      setAddOpen(false);
    } catch {
      /* hook surfaces the error */
    }
  };

  const setStage = async (lead: Lead, stage: LeadStage) => {
    setSelected({ ...lead, stage });
    try {
      await updateLead.mutateAsync({ id: lead.id, updates: { stage } });
    } catch {
      setSelected(lead); // roll back the optimistic stage on failure
    }
  };

  const convert = async (lead: Lead) => {
    try {
      await convertLead.mutateAsync(lead);
      setSelected(null);
    } catch {
      /* hook surfaces the error */
    }
  };

  const remove = async (lead: Lead) => {
    try {
      await deleteLead.mutateAsync(lead.id);
      setSelected(null);
      setConfirmDelete(false);
    } catch {
      /* hook surfaces the error */
    }
  };

  // Live "Before you start" line for the help (ELE-1980).
  const helpBlockers: HelpBlocker[] =
    !isLoading && leads.length === 0
      ? [
          {
            text: 'No leads yet. Your quote page fills this list on its own.',
            fixLabel: 'Set up the quote page',
            onFix: () => setSearchParams({ section: 'quotepage' }),
          },
        ]
      : [];

  const newLeads = leads
    .filter((l) => l.stage === 'New')
    .sort((x, y) => (x.created_at < y.created_at ? -1 : 1));
  const headline = isLoading
    ? 'Loading your leads.'
    : leads.length === 0
      ? 'No leads yet. Your quote page fills this list on its own.'
      : newLeads.length > 0
        ? `${newLeads.length} new lead${newLeads.length === 1 ? '' : 's'} to reply to. The first firm to call usually wins.`
        : openLeads.length > 0
          ? `${openLeads.length} open lead${openLeads.length === 1 ? '' : 's'}${pipeline > 0 ? ` worth ${fmt(pipeline)}` : ''}. Nothing new waiting.`
          : 'Nothing open. Share your quote page to bring more in.';

  const openLead = (l: Lead) => {
    setSelected(l);
    setDraftText('');
    followUp.reset();
  };

  return (
    <>
      <PageFrame className={frameClass}>
        <PageHero
          title="Leads"
          description={headline}
          actions={
            <>
              <PrimaryButton
                data-help="leads.add"
                onClick={() => setAddOpen(true)}
                className={heroPrimaryClass}
              >
                <Plus className="h-4 w-4 mr-1.5" />
                Add lead
              </PrimaryButton>
              <PageHelpButton
                help={LEADS_HELP}
                blockers={helpBlockers}
                askContext={{ page: 'leads', tab: filter }}
              />
            </>
          }
        />

        <HowItWorks
          help={LEADS_HELP}
          blockers={helpBlockers}
          askContext={{ page: 'leads', tab: filter }}
        />

        {leads.length > 0 && (
          <StatStrip
            columns={4}
            stats={[
              {
                label: 'Open leads',
                value: openLeads.length,
                sub: newLeads.length > 0 ? `${newLeads.length} new` : 'None new',
                tone: newLeads.length > 0 ? 'yellow' : undefined,
                onClick: () => setFilter('New'),
              },
              { label: 'Pipeline', value: fmt(pipeline), sub: 'Estimated, open leads' },
              {
                label: 'Won',
                value: wonCount,
                sub: 'Converted to clients',
                onClick: () => setFilter('Won'),
              },
              {
                label: 'Win rate',
                value: decided > 0 ? `${winRate}%` : '—',
                sub: decided > 0 ? `Of ${decided} decided` : 'None decided yet',
              },
            ]}
          />
        )}

        <div className={leads.length > 0 ? twoColClass : undefined}>
          <section className={colClass}>
            <div>
              <PanelTitle
                title={filter === 'all' ? 'All leads' : filter}
                meta={leads.length > 0 ? `${filtered.length}` : undefined}
              />
              {leads.length > 0 && (
                <div data-help="leads.tabs" className="mb-3">
                  <Segments
                    wrap
                    items={tabs.map((t) => ({ ...t, value: t.value as 'all' | LeadStage }))}
                    value={filter}
                    onChange={(v) => setFilter(v)}
                  />
                </div>
              )}
              {isLoading ? (
                <LoadingBlocks />
              ) : leads.length === 0 ? (
                <div className={cn(panel, 'px-4 py-4 sm:px-5')}>
                  <p className="text-[15px] font-semibold text-white">No leads yet</p>
                  <p className="mt-1 text-[13px] leading-relaxed text-white">
                    Share your quote page link or QR and every enquiry lands here. You can also add
                    leads by hand.
                  </p>
                  <div className="mt-4 flex flex-col gap-2 sm:flex-row">
                    <PrimaryButton onClick={() => setSearchParams({ section: 'quotepage' })}>
                      Share your quote page
                    </PrimaryButton>
                    <SecondaryButton onClick={() => setAddOpen(true)}>
                      <Plus className="h-4 w-4 mr-1.5" />
                      Add a lead
                    </SecondaryButton>
                  </div>
                </div>
              ) : filtered.length === 0 ? (
                <PlainEmpty
                  stacked
                  text="No leads at this stage."
                  action="Show all"
                  onAction={() => setFilter('all')}
                />
              ) : (
                <div data-help="leads.list">
                  <RowList>
                    {filtered.map((l) => (
                      <Row
                        wrapDetail
                        key={l.id}
                        onClick={() => openLead(l)}
                        lead={<Initials name={l.name} fallback="LD" />}
                        title={l.name}
                        detail={
                          [l.contact_name, l.source].filter(Boolean).join(' · ') || 'No details'
                        }
                        trailing={
                          <>
                            {l.estimated_value > 0 && (
                              <span className="hidden text-[14px] font-semibold tabular-nums text-white sm:inline">
                                {fmt(l.estimated_value)}
                              </span>
                            )}
                            <StatusPill tone={stageTone(l.stage)}>{l.stage}</StatusPill>
                          </>
                        }
                      />
                    ))}
                  </RowList>
                </div>
              )}
            </div>
          </section>

          {leads.length > 0 && (
            <aside className={colClass}>
              {/* On a phone the list above already leads with new enquiries. */}
              <div className="hidden lg:block">
                <PanelTitle
                  title="Reply first"
                  meta={newLeads.length > 0 ? `${newLeads.length}` : undefined}
                />
                {newLeads.length === 0 ? (
                  <PlainEmpty
                    stacked
                    text="Nothing new waiting. New enquiries show here, oldest first."
                  />
                ) : (
                  <RowList>
                    {newLeads.slice(0, 5).map((l) => (
                      <Row
                        wrapDetail
                        key={l.id}
                        title={l.name}
                        detail={`Came in ${new Date(l.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}${l.source ? ` · ${l.source}` : ''}`}
                        chevron={false}
                        trailing={
                          <button
                            type="button"
                            onClick={() => openLead(l)}
                            className="h-11 rounded-xl bg-elec-yellow px-4 text-[14px] font-semibold text-black touch-manipulation"
                          >
                            Reply
                          </button>
                        }
                      />
                    ))}
                  </RowList>
                )}
              </div>
              <div>
                <PanelTitle title="Get more leads" />
                <RowList>
                  <Row
                    wrapDetail
                    title="Your quote page"
                    detail="Share the link or QR. Requests land here."
                    onClick={() => setSearchParams({ section: 'quotepage' })}
                  />
                </RowList>
              </div>
            </aside>
          )}
        </div>
      </PageFrame>

      {/* Add lead */}
      <FormSheet
        open={addOpen}
        onOpenChange={setAddOpen}
        title="Add lead"
        description="A phone call, a referral or anything that did not come through your quote page."
        width="wide"
        bodyClassName="space-y-5 pt-1"
        footer={
          <div className="flex gap-2">
            <SecondaryButton onClick={() => setAddOpen(false)} className="flex-1 lg:flex-none">
              Cancel
            </SecondaryButton>
            <PrimaryButton onClick={submitAdd} disabled={createLead.isPending} className="flex-1">
              {createLead.isPending ? 'Adding…' : 'Add lead'}
            </PrimaryButton>
          </div>
        }
      >
        <div className="grid gap-5 lg:grid-cols-2 lg:gap-8">
          <FormCard eyebrow="Who got in touch">
            <Field label="Name / company">
              <Input
                className={inputClass}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="Who got in touch"
              />
            </Field>
            <Field label="Contact name">
              <Input
                className={inputClass}
                value={form.contact_name}
                onChange={(e) => setForm({ ...form, contact_name: e.target.value })}
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
          </FormCard>
          <FormCard eyebrow="The job">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Source">
                <Input
                  className={inputClass}
                  value={form.source}
                  onChange={(e) => setForm({ ...form, source: e.target.value })}
                  placeholder="Referral, website, Checkatrade…"
                />
              </Field>
              <Field label="Estimated value (£)">
                <Input
                  className={inputClass}
                  inputMode="numeric"
                  value={form.estimated_value}
                  onChange={(e) => setForm({ ...form, estimated_value: e.target.value })}
                />
              </Field>
            </div>
            <Field label="Notes">
              <Textarea
                className={textareaClass}
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
              />
            </Field>
          </FormCard>
        </div>
      </FormSheet>

      {/* Lead detail */}
      <FormSheet
        open={!!selected}
        onOpenChange={(o) => {
          if (!o) {
            setSelected(null);
            setConfirmDelete(false);
            setDraftText('');
            followUp.reset();
          }
        }}
        title={selected?.name ?? 'Lead'}
        description={
          selected
            ? [
                selected.stage,
                selected.estimated_value > 0 ? fmt(selected.estimated_value) : null,
                selected.source,
              ]
                .filter(Boolean)
                .join(' · ')
            : undefined
        }
        width="wide"
        bodyClassName="pt-1"
        footer={
          selected ? (
            <div data-help="leads.convert">
              {selected.converted_customer_id || selected.converted_client_id ? (
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <p className="text-[13px] text-white">
                    Converted to a client. Quote them now, or find them in Clients.
                  </p>
                  <PrimaryButton
                    onClick={() => {
                      const params: Record<string, string> = {
                        section: 'quotes',
                        new: 'quote',
                        client: selected.name,
                        // ELE-2073: straight onto the job templates.
                        template: 'pick',
                      };
                      if (selected.email) params.email = selected.email;
                      if (selected.phone) params.phone = selected.phone;
                      setSearchParams(params);
                    }}
                    className="w-full sm:w-auto"
                  >
                    Write a quote
                  </PrimaryButton>
                </div>
              ) : (
                <PrimaryButton
                  onClick={() => convert(selected)}
                  disabled={convertLead.isPending}
                  fullWidth
                >
                  <UserPlus className="h-4 w-4 mr-1.5" />
                  {convertLead.isPending ? 'Converting…' : 'Convert to client'}
                </PrimaryButton>
              )}
            </div>
          ) : undefined
        }
      >
        {selected && (
          <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-8">
            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-2">
                <SecondaryButton
                  onClick={() => selected.phone && openExternalUrl(`tel:${selected.phone}`)}
                  disabled={!selected.phone}
                  fullWidth
                >
                  <Phone className="h-4 w-4 mr-1.5" />
                  Call
                </SecondaryButton>
                <SecondaryButton
                  onClick={() => selected.email && openExternalUrl(`mailto:${selected.email}`)}
                  disabled={!selected.email}
                  fullWidth
                >
                  <Mail className="h-4 w-4 mr-1.5" />
                  Email
                </SecondaryButton>
              </div>

              <div data-help="leads.stage">
                <FormCard eyebrow="Stage">
                  <Field label="Move to">
                    <Select
                      value={selected.stage}
                      onValueChange={(v) => setStage(selected, v as LeadStage)}
                    >
                      <SelectTrigger className={selectTriggerClass}>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className={selectContentClass}>
                        {LEAD_STAGES.map((s) => (
                          <SelectItem key={s} value={s}>
                            {s}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </FormCard>
              </div>

              <FormCard eyebrow="Details">
                <dl className="divide-y divide-white/[0.07] -my-1">
                  {[
                    ['Estimated value', selected.estimated_value > 0 ? fmt(selected.estimated_value) : ''],
                    ['Contact', selected.contact_name],
                    ['Email', selected.email],
                    ['Phone', selected.phone],
                    ['Notes', selected.notes],
                    ['Added', new Date(selected.created_at).toLocaleDateString('en-GB')],
                  ]
                    .filter(([, v]) => !!v)
                    .map(([k, v]) => (
                      <div key={k} className="flex gap-4 py-2.5">
                        <dt className="w-32 shrink-0 text-[13px] text-white">{k}</dt>
                        <dd className="min-w-0 flex-1 break-words text-[14px] font-medium text-white">
                          {v}
                        </dd>
                      </div>
                    ))}
                </dl>
              </FormCard>
            </div>

            <div className="space-y-5">
              <div data-help="leads.followup">
                <FormCard eyebrow="Follow up with Mate">
                  <div className="grid grid-cols-2 gap-2">
                    <SecondaryButton
                      onClick={() => generateDraft(selected, 'sms')}
                      disabled={followUp.loading}
                      fullWidth
                    >
                      <Sparkles className="h-4 w-4 mr-1.5" />
                      Text
                    </SecondaryButton>
                    <SecondaryButton
                      onClick={() => generateDraft(selected, 'email')}
                      disabled={followUp.loading}
                      fullWidth
                    >
                      <Sparkles className="h-4 w-4 mr-1.5" />
                      Email
                    </SecondaryButton>
                  </div>

                  {followUp.loading && !followUp.draft && (
                    <p className="text-[13px] text-white">
                      Mate is drafting your {channel === 'sms' ? 'text' : 'email'}…
                    </p>
                  )}
                  {followUp.error && <p className="text-[13px] text-red-400">{followUp.error}</p>}

                  {(draftShown || followUp.loading) && (
                    <div className="space-y-2">
                      <Textarea
                        className={textareaClass}
                        value={draftShown}
                        onChange={(e) => setDraftText(e.target.value)}
                        readOnly={followUp.loading}
                        rows={channel === 'email' ? 8 : 4}
                        placeholder="Your draft will appear here…"
                      />
                      {!followUp.loading && draftShown && (
                        <div className="grid grid-cols-2 gap-2">
                          <SecondaryButton onClick={copyDraft} fullWidth>
                            {draftCopied ? (
                              <Check className="h-4 w-4 mr-1.5" />
                            ) : (
                              <Copy className="h-4 w-4 mr-1.5" />
                            )}
                            {draftCopied ? 'Copied' : 'Copy'}
                          </SecondaryButton>
                          <SecondaryButton
                            onClick={() => sendDraft(selected)}
                            disabled={channel === 'sms' ? !selected.phone : !selected.email}
                            fullWidth
                          >
                            <Send className="h-4 w-4 mr-1.5" />
                            Send{channel === 'sms' ? ' text' : ' email'}
                          </SecondaryButton>
                        </div>
                      )}
                    </div>
                  )}
                </FormCard>
              </div>

              {confirmDelete ? (
                <FormCard eyebrow="Delete lead">
                  <p className="text-[13px] text-white">This removes the lead. Can't be undone.</p>
                  <div className="flex gap-2">
                    <SecondaryButton onClick={() => setConfirmDelete(false)} fullWidth>
                      Cancel
                    </SecondaryButton>
                    <DestructiveButton
                      onClick={() => remove(selected)}
                      disabled={deleteLead.isPending}
                      fullWidth
                    >
                      {deleteLead.isPending ? 'Deleting…' : 'Delete'}
                    </DestructiveButton>
                  </div>
                </FormCard>
              ) : (
                <div className="flex justify-end">
                  <SecondaryButton
                    onClick={() => setConfirmDelete(true)}
                    size="sm"
                    className="h-11"
                  >
                    Delete lead
                  </SecondaryButton>
                </div>
              )}
            </div>
          </div>
        )}
      </FormSheet>
    </>
  );
}
