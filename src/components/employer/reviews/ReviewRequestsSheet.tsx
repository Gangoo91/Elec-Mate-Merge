import { useEffect, useMemo, useState } from 'react';
import FormSheet from '@/components/forms/FormSheet';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Field, inputClass, PrimaryButton, SecondaryButton } from '@/components/employer/editorial';
import {
  FigureStrip,
  Row,
  RowList,
  Segments,
  StatusPill,
  PanelTitle,
  panel,
} from '@/components/employer/pageParts/PageParts';
import { cn } from '@/lib/utils';
import { autoCompleteOff } from '@/lib/textEntry';
import { useDebounce } from '@/hooks/useDebounce';
import {
  PLATFORM_LABEL,
  useReviewPreview,
  useReviewRequests,
  useSaveReviewSettings,
  type ReviewChannel,
  type ReviewPlatform,
  type ReviewRequestRow,
} from '@/hooks/useReviewRequests';
import { toast } from 'sonner';

/* Gap #9: review requests after payment. One sheet, two tabs: what has been
   asked (and clicked), and the settings with a live wording preview. The
   server decides every send; this sheet only shows and saves.

   CMA fake reviews guidance (CMA208, DMCC Act 2024 Sch 20): every paid
   customer is asked the same way, nothing is offered for a review, and the
   wording asks for an honest review, not a good one. The save function
   rejects wording that offers a reward or asks for stars. */

const CMA_URL = 'https://www.gov.uk/government/publications/fake-reviews-cma208';

const chipOn = 'bg-elec-yellow border-elec-yellow text-black font-semibold';
const chipOff = 'bg-white/[0.06] border-white/[0.12] text-white font-medium';

function Chips<T extends string | number>({
  value,
  options,
  onChange,
  disabled,
}: {
  value: T;
  options: { value: T; label: string; disabled?: boolean }[];
  onChange: (v: T) => void;
  disabled?: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={String(o.value)}
          type="button"
          disabled={disabled || o.disabled}
          aria-pressed={value === o.value}
          onClick={() => onChange(o.value)}
          className={cn(
            'h-11 rounded-full border px-4 text-[13px] touch-manipulation disabled:opacity-40',
            value === o.value ? chipOn : chipOff
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

const DELAYS = [
  { value: 0, label: 'Same day' },
  { value: 1, label: '1 day' },
  { value: 3, label: '3 days' },
  { value: 7, label: '1 week' },
  { value: 14, label: '2 weeks' },
];
const COOLDOWNS = [
  { value: 90, label: '3 months' },
  { value: 180, label: '6 months' },
  { value: 365, label: '1 year' },
  { value: 730, label: '2 years' },
];
const PLATFORMS: { key: ReviewPlatform; placeholder: string; hint?: string }[] = [
  {
    key: 'google',
    placeholder: 'g.page/r/… or your Google review link',
    hint: 'In Google Business Profile, open "Ask for reviews" and copy the link.',
  },
  { key: 'checkatrade', placeholder: 'checkatrade.com/give-feedback/…' },
  { key: 'trustatrader', placeholder: 'trustatrader.com/traders/…' },
  { key: 'facebook', placeholder: 'facebook.com/yourpage/reviews' },
];

const ukDay = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleDateString('en-GB', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
        timeZone: 'Europe/London',
      })
    : '';

const delayWords = (d: number) =>
  d === 0
    ? 'the same day they pay'
    : d === 7
      ? 'a week after they pay'
      : d === 14
        ? 'two weeks after they pay'
        : `${d} day${d === 1 ? '' : 's'} after they pay`;

function rowView(r: ReviewRequestRow): {
  detail: string;
  pill: { tone: 'neutral' | 'green' | 'red'; label: string };
} {
  const how = r.channel === 'sms' ? 'Texted' : 'Emailed';
  const inv = r.invoice_number ? `Invoice ${r.invoice_number}. ` : '';
  if (r.status === 'sent') {
    const sites = Object.keys(r.clicks ?? {})
      .filter((k) => k !== 'any')
      .map((k) => PLATFORM_LABEL[k as ReviewPlatform] ?? k);
    const clicked = r.click_count > 0;
    return {
      detail:
        `${inv}${how} ${ukDay(r.sent_at)}.` +
        (clicked ? ` Opened ${sites.length ? sites.join(' and ') : 'your review page'}.` : '') +
        (r.opted_out_at ? ' Asked not to be asked again.' : ''),
      pill: clicked ? { tone: 'green', label: 'Clicked' } : { tone: 'neutral', label: 'Asked' },
    };
  }
  if (r.status === 'queued' || r.status === 'sending') {
    const waitNote = r.summary && r.summary.startsWith('Waiting:') ? ` ${r.summary}` : '';
    return {
      detail: `${inv}Will be asked ${ukDay(r.due_at)}, between 9am and 7pm.${waitNote}`,
      pill: { tone: 'neutral', label: r.status === 'sending' ? 'Sending' : 'Waiting' },
    };
  }
  if (r.status === 'failed')
    return { detail: `${inv}${r.summary}`, pill: { tone: 'red', label: 'Failed' } };
  return { detail: `${inv}${r.summary}`, pill: { tone: 'neutral', label: 'Skipped' } };
}

type Links = Record<ReviewPlatform, string>;

export function ReviewRequestsSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (o: boolean) => void;
}) {
  const { data, isLoading, error } = useReviewRequests(open);
  const save = useSaveReviewSettings();
  const [tab, setTab] = useState<'activity' | 'settings'>('activity');
  const [on, setOn] = useState(false);
  const [delay, setDelay] = useState(3);
  const [cooldown, setCooldown] = useState(365);
  const [channel, setChannel] = useState<ReviewChannel>('email');
  const [waitJob, setWaitJob] = useState(true);
  const [links, setLinks] = useState<Links>({
    google: '',
    checkatrade: '',
    trustatrader: '',
    facebook: '',
  });
  const [message, setMessage] = useState('');
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!open) setHydrated(false);
  }, [open]);

  useEffect(() => {
    if (!open || !data || hydrated) return;
    const s = data.settings;
    const sug = data.saved ? {} : data.suggested_links;
    setOn(s.enabled);
    setDelay(s.delay_days);
    setCooldown(s.cooldown_days);
    setChannel(s.channel);
    setWaitJob(s.wait_for_job_complete);
    setLinks({
      google: s.google_url ?? sug.google_url ?? '',
      checkatrade: s.checkatrade_url ?? sug.checkatrade_url ?? '',
      trustatrader: s.trustatrader_url ?? sug.trustatrader_url ?? '',
      facebook: s.facebook_url ?? sug.facebook_url ?? '',
    });
    setMessage(s.message ?? '');
    setTab(s.enabled || data.recent.length > 0 ? 'activity' : 'settings');
    setHydrated(true);
  }, [open, data, hydrated]);

  const debounced = useDebounce(message, 400);
  const { data: preview } = useReviewPreview(debounced, open && tab === 'settings');

  const manage = !!data?.can_manage;
  const hasLink = Object.values(links).some((v) => v.trim());
  const filledLinks = PLATFORMS.filter((p) => links[p.key].trim());

  const onSave = async () => {
    if (on && !hasLink) {
      toast.error('Add at least one review link first.');
      return;
    }
    try {
      await save.mutateAsync({
        enabled: on,
        delay_days: delay,
        cooldown_days: cooldown,
        channel,
        wait_for_job_complete: waitJob,
        google_url: links.google.trim() || null,
        checkatrade_url: links.checkatrade.trim() || null,
        trustatrader_url: links.trustatrader.trim() || null,
        facebook_url: links.facebook.trim() || null,
        message: message.trim() || null,
      });
      toast.success(on ? 'Review requests are on' : 'Review request settings saved');
      setTab('activity');
    } catch (e) {
      toast.error((e as Error).message || 'Could not save');
    }
  };

  const stats = data?.stats;
  const notes = useMemo(() => {
    const n: string[] = [];
    if (!data) return n;
    if (data.automations_paused)
      n.push('Automations are paused for the firm, so nothing is sent until you resume them.');
    if (data.old_rule_on)
      n.push(
        'Your automation "Ask for a review" stands aside while this is on, so customers are only asked once, after they pay.'
      );
    if (data.receipt_asks)
      n.push(
        'Your payment receipt already has review buttons (Settings, Ask for reviews). Customers who got that receipt are not asked again.'
      );
    return n;
  }, [data]);

  const denied = !!error;

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      width="wide"
      eyebrow="Clients"
      title="Review requests"
      description={
        data?.settings.enabled
          ? `On. Each customer is asked once, ${delayWords(data.settings.delay_days)}.`
          : 'Ask every customer for one honest review after they pay. Off until you turn it on.'
      }
      subheader={
        <div className="pb-3">
          <Segments
            items={[
              { value: 'activity', label: 'Requests' },
              { value: 'settings', label: 'Settings' },
            ]}
            value={tab}
            onChange={setTab}
            className="sm:w-fit"
          />
        </div>
      }
      footer={
        tab === 'settings' && manage ? (
          <div className="flex items-center justify-end gap-2">
            <SecondaryButton
              onClick={() => onOpenChange(false)}
              className="h-12 flex-1 px-5 sm:flex-none"
            >
              Cancel
            </SecondaryButton>
            <PrimaryButton
              onClick={onSave}
              disabled={save.isPending || isLoading}
              className="h-12 flex-[2] px-6 sm:flex-none"
            >
              {save.isPending ? 'Saving' : 'Save'}
            </PrimaryButton>
          </div>
        ) : undefined
      }
    >
      {denied ? (
        <p className="text-[14px] text-white">
          You do not have access to this firm's review requests.
        </p>
      ) : isLoading || !data ? (
        <p className="text-[14px] text-white">Loading review requests.</p>
      ) : tab === 'activity' ? (
        <div className="space-y-6 lg:grid lg:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] lg:items-start lg:gap-8 lg:space-y-0">
          <section className="min-w-0">
            <PanelTitle
              title="Recent requests"
              meta={data.recent.length ? `Latest ${data.recent.length}` : undefined}
            />
            <RowList>
              {data.recent.length === 0 ? (
                <Row
                  wrapDetail
                  title={data.settings.enabled ? 'Nobody asked yet' : 'Not switched on'}
                  detail={
                    data.settings.enabled
                      ? `The next customer who pays will be asked ${delayWords(data.settings.delay_days)}.`
                      : 'Turn it on in Settings. Only invoices paid after that are followed up.'
                  }
                />
              ) : (
                data.recent.map((r) => {
                  const v = rowView(r);
                  return (
                    <Row
                      key={r.id}
                      wrapDetail
                      title={r.client_name || 'Customer'}
                      detail={v.detail}
                      trailing={<StatusPill tone={v.pill.tone}>{v.pill.label}</StatusPill>}
                    />
                  );
                })
              )}
            </RowList>
          </section>

          <section className="min-w-0 space-y-4">
            <FigureStrip
              title="Last 30 days"
              figures={[
                {
                  label: 'Asked',
                  value: stats?.asked_30 ?? 0,
                  sub: `${stats?.asked_all ?? 0} in total`,
                },
                {
                  label: 'Clicked',
                  value: stats?.clicked_30 ?? 0,
                  sub:
                    stats && stats.asked_30 > 0
                      ? `${Math.round((stats.clicked_30 / stats.asked_30) * 100)}% of those asked`
                      : 'Opened a review page',
                  tone: stats && stats.clicked_30 > 0 ? 'green' : undefined,
                },
                { label: 'Waiting', value: stats?.waiting ?? 0, sub: 'Paid, not due yet' },
              ]}
            />
            <div className={cn(panel, 'space-y-2 p-4 sm:p-5')}>
              <p className="text-[15px] font-semibold text-white">How it works</p>
              <p className="text-[13px] leading-relaxed text-white">
                When an invoice is paid, by card, bank transfer or marked paid, the customer gets
                one short request {delayWords(data.settings.delay_days)}, between 9am and 7pm. A
                click counts when they open your review page. Whether they then leave a review
                happens on Google or the other site.
              </p>
              {notes.map((n) => (
                <p key={n} className="text-[13px] leading-relaxed text-white">
                  {n}
                </p>
              ))}
            </div>
          </section>
        </div>
      ) : (
        <div className="space-y-6 lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-start lg:gap-8 lg:space-y-0">
          <div className="min-w-0 space-y-5">
            <div className={cn(panel, 'flex items-center justify-between gap-4 p-4 sm:p-5')}>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-white">
                  Ask customers for a review after they pay
                </p>
                <p className="mt-0.5 text-[13px] text-white">
                  {on
                    ? `On. Invoices paid from now are followed up ${delayWords(delay)}.`
                    : 'Off. Nothing is sent until you turn it on.'}
                </p>
              </div>
              <Switch
                checked={on}
                onCheckedChange={setOn}
                disabled={!manage}
                aria-label="Ask customers for a review after they pay"
              />
            </div>
            {!manage && (
              <p className="text-[13px] text-white">
                Only the owner or an admin can change these settings.
              </p>
            )}

            <Field label="When to ask">
              <Chips<number>
                value={delay}
                onChange={setDelay}
                options={DELAYS}
                disabled={!manage}
              />
            </Field>

            <Field
              label="Never ask the same customer again within"
              hint="Counts every request, by customer and by email address or mobile."
            >
              <Chips<number>
                value={cooldown}
                onChange={setCooldown}
                options={COOLDOWNS}
                disabled={!manage}
              />
            </Field>

            <Field
              label="How"
              hint={
                data.texts_live
                  ? 'A text goes to their mobile. With no mobile, or after STOP, it is emailed instead.'
                  : 'Texts become available once your messaging number is live. Until then it is email.'
              }
            >
              <Chips<ReviewChannel>
                value={channel}
                onChange={setChannel}
                disabled={!manage}
                options={[
                  { value: 'email', label: 'Email' },
                  { value: 'sms', label: 'Text', disabled: !data.texts_live && channel !== 'sms' },
                ]}
              />
            </Field>

            <div className={cn(panel, 'flex items-center justify-between gap-4 p-4 sm:p-5')}>
              <div className="min-w-0">
                <p className="text-[15px] font-semibold text-white">
                  Wait until the job is complete
                </p>
                <p className="mt-0.5 text-[13px] text-white">
                  When an invoice belongs to a job, ask once the job is done and paid, not on a
                  deposit.
                </p>
              </div>
              <Switch
                checked={waitJob}
                onCheckedChange={setWaitJob}
                disabled={!manage}
                aria-label="Wait until the job is complete"
              />
            </div>

            <section>
              <PanelTitle
                title="Your review links"
                meta={filledLinks.length ? `${filledLinks.length} added` : 'Add at least one'}
              />
              <div className={cn(panel, 'space-y-4 p-4 sm:p-5')}>
                {PLATFORMS.map((p) => (
                  <Field key={p.key} label={PLATFORM_LABEL[p.key]} hint={p.hint}>
                    <Input
                      value={links[p.key]}
                      onChange={(e) => setLinks((prev) => ({ ...prev, [p.key]: e.target.value }))}
                      placeholder={p.placeholder}
                      inputMode="url"
                      autoCapitalize="none"
                      disabled={!manage}
                      className={inputClass}
                      autoComplete={autoCompleteOff}
                    />
                  </Field>
                ))}
              </div>
            </section>
          </div>

          <div className="min-w-0 space-y-5">
            <section>
              <PanelTitle title="Wording" meta={message.trim() ? 'Your own' : 'Default'} />
              <div className={cn(panel, 'space-y-4 p-4 sm:p-5')}>
                <Field
                  label="Message"
                  hint="Can use {first_name} and {firm_name}. Leave it empty for the default."
                >
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={data.default_message}
                    rows={4}
                    maxLength={600}
                    disabled={!manage}
                    spellCheck
                    autoCapitalize="sentences"
                    autoComplete={autoCompleteOff}
                    className="textarea-soft w-full resize-none rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 py-2 text-base leading-relaxed text-white caret-elec-yellow placeholder:text-white/35 hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 disabled:opacity-60 touch-manipulation"
                  />
                </Field>
                {preview?.problem && <p className="text-[13px] text-red-300">{preview.problem}</p>}
                {preview && (
                  <div className="space-y-3 border-t border-white/[0.08] pt-4">
                    <p className="text-[12px] font-semibold text-white">
                      {channel === 'sms' ? 'The text' : 'The email'}, as a customer called Sam sees
                      it
                    </p>
                    {channel === 'sms' ? (
                      <div className="space-y-1.5">
                        <p className="rounded-2xl bg-white/[0.06] px-4 py-3 text-[14px] leading-relaxed text-white">
                          {preview.sms}
                        </p>
                        <p className="text-[11.5px] text-white">
                          {preview.sms_segments} text{preview.sms_segments === 1 ? '' : 's'} long
                        </p>
                      </div>
                    ) : (
                      <div className="space-y-3 rounded-2xl border border-white/[0.1] px-4 py-4">
                        <p className="text-[13px] text-white">
                          <span className="font-semibold">Subject:</span> {preview.subject}
                        </p>
                        <p className="text-[14px] text-white">{preview.greeting}</p>
                        <p className="text-[14px] leading-relaxed text-white">
                          {preview.paragraph}
                        </p>
                        <div className="space-y-2">
                          {(filledLinks.length ? filledLinks : PLATFORMS.slice(0, 1)).map(
                            (p, i) => (
                              <div
                                key={p.key}
                                className={cn(
                                  'flex h-11 items-center justify-center rounded-xl text-[14px] font-semibold',
                                  i === 0
                                    ? 'bg-white text-black'
                                    : 'border border-white/[0.2] text-white'
                                )}
                              >
                                Review us on {PLATFORM_LABEL[p.key]}
                              </div>
                            )
                          )}
                        </div>
                        <p className="text-[11.5px] text-white">
                          Ends with a "Do not ask me for reviews again" link.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </section>

            <div className="space-y-1.5">
              <p className="text-[13px] leading-relaxed text-white">
                Every paid customer is asked the same way. Nothing is offered in return, and the
                wording asks for an honest review, as the CMA's fake reviews guidance expects. Keep
                it on rather than switching it off and on to choose who gets asked.
              </p>
              <a
                href={CMA_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-11 items-center text-[13px] font-semibold text-white underline underline-offset-4 touch-manipulation"
              >
                Read the CMA guidance
              </a>
            </div>
          </div>
        </div>
      )}
    </FormSheet>
  );
}

export default ReviewRequestsSheet;
