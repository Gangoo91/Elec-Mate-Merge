import { useState, useMemo } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
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
  FilterBar,
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
  SheetShell,
  Eyebrow,
  Avatar,
  inputClass,
  textareaClass,
  selectTriggerClass,
  selectContentClass,
  type Tone,
} from '@/components/employer/editorial';
import { Phone, Mail, Plus, UserPlus, Sparkles, Copy, Check, Send, Zap } from 'lucide-react';
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

const fmt = (n: number) => `£${Math.round(n).toLocaleString('en-GB')}`;
const initialsOf = (name: string) =>
  name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? '')
    .join('') || 'LD';

const stageTone = (s: LeadStage): Tone => {
  switch (s) {
    case 'New':
      return 'blue';
    case 'Contacted':
      return 'cyan';
    case 'Quoted':
      return 'amber';
    case 'Won':
      return 'emerald';
    case 'Lost':
      return 'red';
    default:
      return 'default';
  }
};

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
  const [, setSearchParams] = useSearchParams();

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
  const decided = leads.filter((l) => l.stage === 'Won' || l.stage === 'Lost').length;
  const winRate = decided > 0 ? Math.round((wonCount / decided) * 100) : 0;

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

  return (
    <>
      <PageFrame>
        <PageHero
          eyebrow="Sales"
          title="Leads"
          description="Every enquiry from first contact to won — before it becomes a client."
          tone="cyan"
          actions={
            <PrimaryButton onClick={() => setAddOpen(true)}>
              <Plus className="h-4 w-4 mr-1.5" />
              Add lead
            </PrimaryButton>
          }
        />

        <StatStrip
          columns={4}
          stats={[
            { label: 'Open leads', value: openLeads.length, tone: 'cyan' },
            { label: 'Pipeline', value: fmt(pipeline), tone: 'blue', accent: true },
            { label: 'Won', value: wonCount, tone: 'emerald' },
            {
              label: 'Win rate',
              value: decided > 0 ? `${winRate}%` : '—',
              tone: decided === 0 ? undefined : winRate >= 50 ? 'emerald' : 'amber',
            },
          ]}
        />

        <FilterBar
          tabs={tabs}
          activeTab={filter}
          onTabChange={(v) => setFilter(v as 'all' | LeadStage)}
        />

        {isLoading ? (
          <LoadingBlocks />
        ) : leads.length === 0 ? (
          <div className="rounded-2xl border border-elec-yellow/25 bg-gradient-to-b from-elec-yellow/[0.08] to-transparent p-5 sm:p-6">
            <div className="flex items-start gap-3">
              <div className="h-10 w-10 shrink-0 rounded-xl bg-elec-yellow/15 border border-elec-yellow/25 grid place-items-center">
                <Zap className="h-5 w-5 text-elec-yellow" />
              </div>
              <div className="min-w-0">
                <h3 className="text-[15px] font-semibold text-white">No leads yet</h3>
                <p className="mt-1 text-[12.5px] text-white/60 leading-relaxed">
                  Your quote page is the fastest way to fill this pipeline — share the link or QR
                  and every enquiry lands here automatically. You can also add leads by hand.
                </p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              <PrimaryButton onClick={() => setSearchParams({ section: 'quotepage' })} fullWidth>
                <Zap className="h-4 w-4 mr-1.5" />
                Share your quote page
              </PrimaryButton>
              <SecondaryButton onClick={() => setAddOpen(true)} fullWidth>
                <Plus className="h-4 w-4 mr-1.5" />
                Add a lead
              </SecondaryButton>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState title="None in this stage" description="Try another stage." />
        ) : (
          <ListCard>
            <ListCardHeader
              tone="cyan"
              title="Pipeline"
              meta={<Pill tone="default">{filtered.length}</Pill>}
            />
            <ListBody>
              {filtered.map((l) => (
                <ListRow
                  key={l.id}
                  onClick={() => {
                    setSelected(l);
                    setDraftText('');
                    followUp.reset();
                  }}
                  lead={<Avatar initials={initialsOf(l.name)} />}
                  title={l.name}
                  subtitle={[l.contact_name, l.source].filter(Boolean).join(' · ') || 'No details'}
                  trailing={
                    <span className="flex items-center gap-2">
                      {l.estimated_value > 0 && (
                        <span className="text-[13px] font-semibold text-white tabular-nums">
                          {fmt(l.estimated_value)}
                        </span>
                      )}
                      <Pill tone={stageTone(l.stage)}>{l.stage}</Pill>
                    </span>
                  }
                />
              ))}
            </ListBody>
          </ListCard>
        )}
      </PageFrame>

      {/* Add lead */}
      <Sheet open={addOpen} onOpenChange={setAddOpen}>
        <SheetContent side="bottom" className="h-[85vh] p-0 rounded-t-2xl overflow-hidden">
          <SheetShell eyebrow="Sales" title="Add lead">
            <div className="space-y-4">
              <FormCard eyebrow="Enquiry">
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
                <Field label="Notes">
                  <Textarea
                    className={textareaClass}
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  />
                </Field>
                <div className="flex gap-2">
                  <SecondaryButton onClick={() => setAddOpen(false)} fullWidth>
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton onClick={submitAdd} disabled={createLead.isPending} fullWidth>
                    {createLead.isPending ? 'Adding…' : 'Add lead'}
                  </PrimaryButton>
                </div>
              </FormCard>
            </div>
          </SheetShell>
        </SheetContent>
      </Sheet>

      {/* Lead detail */}
      <Sheet
        open={!!selected}
        onOpenChange={(o) => {
          if (!o) {
            setSelected(null);
            setConfirmDelete(false);
            setDraftText('');
            followUp.reset();
          }
        }}
      >
        <SheetContent side="bottom" className="h-[90vh] p-0 rounded-t-2xl overflow-hidden">
          {selected && (
            <SheetShell
              eyebrow="Lead"
              title={selected.name}
              description={selected.source || undefined}
            >
              <div className="space-y-4">
                <StatStrip
                  columns={2}
                  stats={[
                    {
                      label: 'Estimated value',
                      value: fmt(selected.estimated_value),
                      accent: true,
                    },
                    { label: 'Stage', value: selected.stage, tone: stageTone(selected.stage) },
                  ]}
                />

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
                    <p className="text-[12.5px] text-white/55">
                      Mate is drafting your {channel === 'sms' ? 'text' : 'email'}…
                    </p>
                  )}
                  {followUp.error && <p className="text-[12.5px] text-red-400">{followUp.error}</p>}

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
                          <PrimaryButton
                            onClick={() => sendDraft(selected)}
                            disabled={channel === 'sms' ? !selected.phone : !selected.email}
                            fullWidth
                          >
                            <Send className="h-4 w-4 mr-1.5" />
                            Send{channel === 'sms' ? ' text' : ' email'}
                          </PrimaryButton>
                        </div>
                      )}
                    </div>
                  )}
                </FormCard>

                <FormCard eyebrow="Move stage">
                  <Field label="Stage">
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

                {(selected.contact_name || selected.email || selected.phone || selected.notes) && (
                  <ListCard>
                    <ListCardHeader tone="default" title="Details" />
                    <ListBody>
                      {selected.contact_name && (
                        <ListRow title="Contact" subtitle={selected.contact_name} />
                      )}
                      {selected.email && <ListRow title="Email" subtitle={selected.email} />}
                      {selected.phone && <ListRow title="Phone" subtitle={selected.phone} />}
                      {selected.notes && <ListRow title="Notes" subtitle={selected.notes} />}
                    </ListBody>
                  </ListCard>
                )}

                {/* Convert / manage */}
                {selected.converted_client_id ? (
                  <div className="rounded-xl bg-emerald-500/10 border border-emerald-500/20 px-4 py-3">
                    <p className="text-[13px] text-emerald-200/90">
                      Converted to a client — find them in Clients.
                    </p>
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

                <div className="pt-1">
                  {confirmDelete ? (
                    <FormCard eyebrow="Delete lead">
                      <p className="text-[13px] text-white">
                        This removes the lead. Can't be undone.
                      </p>
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
                    <div className="flex items-center justify-between">
                      <Eyebrow>
                        Added {new Date(selected.created_at).toLocaleDateString('en-GB')}
                      </Eyebrow>
                      <SecondaryButton onClick={() => setConfirmDelete(true)} size="sm">
                        Delete
                      </SecondaryButton>
                    </div>
                  )}
                </div>
              </div>
            </SheetShell>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
