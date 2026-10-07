import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow, format } from 'date-fns';
import {
  Camera,
  Check,
  ChevronDown,
  Copy,
  Mail,
  MapPin,
  MessageCircle,
  MessageSquare,
  Pencil,
  Phone,
} from 'lucide-react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { Haptics, ImpactStyle, NotificationType } from '@capacitor/haptics';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useAuthUser } from '@/contexts/AuthContext';
import { copyToClipboard } from '@/utils/clipboard';
import { bookingUrl, normaliseUkPhone } from '@/components/electrician/booking/bookingMessage';
import {
  primaryButtonCn,
  ghostButtonCn,
  chipBase,
  chipOn,
  chipOff,
  warningPanelCn,
} from '@/components/shared/surfaceStyles';
import {
  type Enquiry,
  SOURCE_LABEL,
  firstSuitableTime,
  ukInstant,
  smartReply,
  firstName,
  useOwnRates,
  useTypicalPrice,
  visitPhrase,
  senderOf,
  useConvertEnquiry,
  useSetSenderBlocked,
  useEnquiry,
  useEnquiryPhotoUrls,
  useUpdateEnquiry,
} from '@/hooks/useEnquiries';

/**
 * One enquiry, top to bottom in the order the electrician works it:
 * who / how to reach them → what they need (+ photos) → reply → details →
 * original message. The decision buttons stay pinned at the bottom.
 */

const inputCn =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] ' +
  'bg-transparent px-1 text-base font-medium text-white placeholder:text-white/25 ' +
  'caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow ' +
  'focus-visible:ring-0 focus:ring-0 focus:outline-none [color-scheme:dark] touch-manipulation';

const labelCn = 'mb-1 block text-[12px] font-medium text-white';

/** "14 Mill Lane, SK4 2AB" without doubling a postcode the address already has. */
const fullAddress = (address: string | null, postcode: string | null) => {
  const compact = (v: string) => v.toUpperCase().replace(/\s+/g, '');
  if (address && postcode && compact(address).includes(compact(postcode))) return address;
  return [address, postcode].filter(Boolean).join(', ');
};
const sectionTitleCn = 'text-[11px] font-semibold uppercase tracking-[0.14em] text-white';

type Editable = Pick<
  Enquiry,
  'name' | 'email' | 'phone' | 'address' | 'postcode' | 'job_description'
>;

interface Props {
  enquiry: Enquiry | null;
  onOpenChange: (open: boolean) => void;
  /** 'sheet' = phone bottom sheet; 'panel' = inline right-hand pane on desktop */
  variant?: 'sheet' | 'panel';
}

export default function EnquiryDetailSheet({ enquiry, onOpenChange, variant = 'sheet' }: Props) {
  const navigate = useNavigate();
  const { companyProfile } = useCompanyProfile();
  const update = useUpdateEnquiry();
  const convert = useConvertEnquiry();
  const { data: typical } = useTypicalPrice(enquiry?.job_key, enquiry?.user_id);
  const { data: rates } = useOwnRates(enquiry?.user_id);
  const [slotIdx, setSlotIdx] = useState(0);
  const [booking, setBooking] = useState(false);
  const qc = useQueryClient();
  const block = useSetSenderBlocked();
  // The list leaves out the original message; fetch it (and photos) for the open card
  const { data: full } = useEnquiry(enquiry?.id ?? null);
  const { data: photoUrls = [] } = useEnquiryPhotoUrls(full?.photos ?? enquiry?.photos);

  // Only the fields the electrician has changed. Everything else follows the live
  // enquiry, so a voicemail or text that fills in a name lands on screen (and is
  // never overwritten by a stale copy when they book or add the customer).
  const [edits, setEdits] = useState<Partial<Editable>>({});
  const [editing, setEditing] = useState(false);
  const [showOriginal, setShowOriginal] = useState(false);
  const [includeBooking, setIncludeBooking] = useState(true);
  const [message, setMessage] = useState('');
  const [messageEdited, setMessageEdited] = useState(false);
  const [visitOpen, setVisitOpen] = useState(false);
  const [visitDate, setVisitDate] = useState('');
  const [visitTime, setVisitTime] = useState('09:00');
  const visitRef = useRef<HTMLElement>(null);
  const adding = useRef(false);
  const [emailing, setEmailing] = useState(false);
  const [bookingEmail, setBookingEmail] = useState<'idle' | 'sending' | 'sent'>('idle');
  const [remindEve, setRemindEve] = useState(true);
  const [addingNow, setAddingNow] = useState(false);

  const businessName = companyProfile?.company_name?.trim() || null;
  // The booking email is sent from the diary's owner (a co-admin texts or emails the reply instead)
  const authUser = useAuthUser();

  // Reset everything when a different enquiry opens
  useEffect(() => {
    if (!enquiry) return;
    setEdits({});
    setBookingEmail('idle');
    setEditing(false);
    setShowOriginal(false);
    setVisitOpen(false);
    setMessageEdited(false);
    setSlotIdx(0);
    // A booking link suits a normal enquiry, not an emergency or a job you may turn down
    setIncludeBooking(enquiry.urgency !== 'emergency' && !enquiry.fit_note);
    // "Other time" opens on a day and time that suit the customer
    const first = firstSuitableTime(enquiry.availability ?? null);
    setVisitDate(first.date);
    setVisitTime(first.time);
  }, [enquiry?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  // Ready-made message follows the details and the booking-link switch until
  // the electrician types in it; after that it is theirs.
  useEffect(() => {
    if (!enquiry || messageEdited) return;
    setMessage(
      smartReply(
        { ...enquiry, ...edits },
        businessName,
        includeBooking ? bookingUrl(enquiry.user_id) : undefined
      )
    );
  }, [enquiry, edits, includeBooking, businessName, messageEdited]);

  // The visit form opens at the bottom of the scroll area: bring it into view
  useEffect(() => {
    if (visitOpen) visitRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [visitOpen]);

  if (!enquiry) return null;

  const e: Enquiry = { ...enquiry, ...edits };
  const changed = (Object.keys(edits) as (keyof Editable)[]).filter(
    (k) => (edits[k] ?? '') !== (enquiry[k] ?? '')
  );
  const dirty = changed.length > 0;
  const intlPhone = normaliseUkPhone(e.phone);
  // Not update.isPending: a field's blur-save must never disable the button being tapped
  const busy = convert.isPending || booking || addingNow;
  const isNew = enquiry.status === 'new';
  const replied = !!enquiry.first_actioned_at;
  const waitingMins = (Date.now() - new Date(enquiry.received_at).getTime()) / 60000;
  const mapsUrl =
    e.postcode || e.address
      ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          fullAddress(e.address, e.postcode)
        )}`
      : null;

  const set =
    (k: keyof Editable) => (ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setEdits((f) => ({ ...f, [k]: ev.target.value || null }));

  const saveEdits = async (): Promise<boolean> => {
    if (!dirty) return true;
    try {
      const saved = Object.fromEntries(
        changed.map((k) => [k, edits[k] ?? null])
      ) as Partial<Editable>;
      await update.mutateAsync({ id: enquiry.id, patch: saved });
      // Saved fields follow the live enquiry again (unless typed in since)
      setEdits(
        (cur) =>
          Object.fromEntries(
            Object.entries(cur).filter(([k, v]) => v !== saved[k as keyof Editable])
          ) as Partial<Editable>
      );
      return true;
    } catch (err) {
      toast({
        title: 'Could not save',
        description: (err as Error).message,
        variant: 'destructive',
      });
      return false;
    }
  };

  // Replying counts as acting on it (response-time stat, "Replied" state).
  // A sent message is kept: the reader learns the electrician's tone from it.
  const markReplied = () => {
    if (!enquiry.first_actioned_at) {
      update.mutate({ id: enquiry.id, patch: { first_actioned_at: new Date().toISOString() } });
    }
  };
  // Only a message the electrician changed teaches tone (an untouched AI draft would
  // just teach the AI itself), and never with links or tests.
  const markSent = (via?: 'whatsapp' | 'text' | 'copy') => {
    buzz(false);
    // How they were contacted, on the card for the whole team (one atomic append,
    // so a reply logged elsewhere at the same moment is never lost)
    if (via) {
      supabase
        .rpc(
          'log_enquiry_reply' as never,
          { p_id: enquiry.id, p_via: via, p_text: message.slice(0, 500) } as never
        )
        .then(({ error }) => {
          if (!error) qc.invalidateQueries({ queryKey: ['enquiry', enquiry.id] });
        });
    }
    const learn = messageEdited && !enquiry.is_test;
    const clean = message
      .replace(/\s*(If it's easier, )?you can pick a time[^.]*?(https?:\/\/\S+)?\.?/gi, '')
      .replace(/https?:\/\/\S+/g, '')
      .replace(/\s{2,}/g, ' ')
      .trim()
      .slice(0, 1500);
    update.mutate({
      id: enquiry.id,
      patch: {
        ...(learn && clean.length > 20 ? { sent_message: clean } : {}),

        ...(enquiry.first_actioned_at ? {} : { first_actioned_at: new Date().toISOString() }),
      },
    });
  };

  // Email goes from Elec-Mate itself (branded, Reply-To you), not a mail app:
  // it works on any phone, threads under their email, and is logged on the card
  // and the customer's timeline like the other CRM emails.
  const emailReply = async () => {
    if (emailing) return;
    setEmailing(true);
    try {
      // A contact change that didn't save must not send to the old address
      if (!(await saveEdits())) return;
      const { data, error } = await supabase.functions.invoke('enquiry-send-reply', {
        body: { enquiry_id: enquiry.id, message },
      });
      if (error) {
        const ctx = (error as { context?: Response }).context;
        const detail = ctx ? await ctx.json().catch(() => null) : null;
        throw new Error(detail?.error ?? error.message);
      }
      markSent();
      toast({
        title: 'Email sent',
        description: `To ${(data as { to?: string })?.to ?? e.email}.`,
      });
    } catch (err) {
      fail('Could not send the email')(err);
    } finally {
      setEmailing(false);
      qc.invalidateQueries({ queryKey: ['enquiry', enquiry.id] });
    }
  };

  // After booking: the existing booking email (calendar invite, optional reminder
  // the evening before), the same one the diary sends
  const emailBooking = async () => {
    if (!enquiry.calendar_event_id || bookingEmail === 'sending') return;
    setBookingEmail('sending');
    try {
      const { error } = await supabase.functions.invoke('send-booking-confirmation', {
        body: { eventId: enquiry.calendar_event_id, remindDayBefore: remindEve },
      });
      if (error) {
        const ctx = (error as { context?: Response }).context;
        const detail = ctx ? await ctx.json().catch(() => null) : null;
        throw new Error(detail?.error ?? error.message);
      }
      setBookingEmail('sent');
      markReplied();
      buzz();
      toast({
        title: 'Booking emailed',
        description: remindEve
          ? 'With a calendar invite, and a reminder the evening before.'
          : 'With a calendar invite.',
      });
    } catch (err) {
      setBookingEmail('idle');
      fail('Could not email the booking')(err);
    }
  };

  // One at a time: a double tap must not create two customers
  const ensureCustomer = async () => {
    if (adding.current) throw new Error('Already adding');
    adding.current = true;
    setAddingNow(true);
    try {
      await saveEdits();
      return await convert.mutateAsync(e);
    } finally {
      adding.current = false;
      setAddingNow(false);
    }
  };

  const buzz = (ok = true) =>
    (ok
      ? Haptics.notification({ type: NotificationType.Success })
      : Haptics.impact({ style: ImpactStyle.Light })
    ).catch(() => {});

  const fail = (title: string) => (err: unknown) =>
    toast({ title, description: (err as Error).message, variant: 'destructive' });

  const onAddAndQuote = async () => {
    try {
      const customerId = await ensureCustomer();
      onOpenChange(false);
      navigate('/electrician/quote-builder/create', {
        state: {
          customerId,
          prefillCustomer: e.name ?? undefined,
          prefillJob: {
            title: e.job_type && e.job_type !== 'Other' ? e.job_type : (e.summary ?? 'Enquiry'),
            description: e.job_description ?? '',
            location: fullAddress(e.address, e.postcode),
            postcode: e.postcode ?? undefined,
          },
        },
      });
    } catch (err) {
      fail('Could not add customer')(err);
    }
  };

  const onAddCustomer = async () => {
    try {
      await ensureCustomer();
      toast({ title: 'Added to customers' });
      onOpenChange(false);
    } catch (err) {
      fail('Could not add customer')(err);
    }
  };

  // Booking happens on the server (enquiry-visit-action): it re-checks the time
  // is free, books into the OWNER's diary (co-admins too), links the customer and
  // keeps the enquiry in "To reply" until the time is actually sent.
  const proposals = (enquiry.proposed_slots ?? []).filter(
    (p) => new Date(p.start).getTime() > Date.now() + 30 * 60_000
  );
  const callVisit = async (body: Record<string, unknown>) => {
    await saveEdits();
    setBooking(true);
    try {
      const { data, error } = await supabase.functions.invoke('enquiry-visit-action', {
        body: { enquiry_id: enquiry.id, ...body },
      });
      if (error) {
        // 409 = the time has gone; the server has already offered fresh ones
        const ctx = (error as { context?: Response }).context;
        const detail = ctx ? await ctx.json().catch(() => null) : null;
        if (ctx?.status === 409) {
          toast({ title: 'That time has just gone', description: 'Here are fresh times.' });
          setSlotIdx(0);
          return null;
        }
        throw new Error(detail?.error ?? error.message);
      }
      return data as { label?: string };
    } finally {
      setBooking(false);
      qc.invalidateQueries({ queryKey: ['enquiries'] });
      qc.invalidateQueries({ queryKey: ['enquiry', enquiry.id] });
      qc.invalidateQueries({ queryKey: ['calendar-events'] });
    }
  };

  const onBookSlot = async () => {
    const slot = proposals[slotIdx];
    if (!slot) return;
    const realIndex = (enquiry.proposed_slots ?? []).findIndex((p) => p.start === slot.start);
    try {
      const out = await callVisit({ action: 'book', slot_index: realIndex });
      if (!out) return;
      setMessageEdited(false);
      buzz();
      toast({
        title: `Booked ${out.label ?? slot.label}`,
        description: `In your diary. Now send ${firstName(e.name) || 'them'} the time below.`,
      });
    } catch (err) {
      fail('Could not book')(err);
    }
  };

  const onBookVisit = async () => {
    if (!visitDate || !visitTime) return;
    // UK time whatever the phone's own time zone is set to
    const start = ukInstant(visitDate, visitTime);
    if (Number.isNaN(start.getTime()) || start.getTime() < Date.now()) {
      toast({ title: 'Pick a time in the future', variant: 'destructive' });
      return;
    }
    const end = new Date(start.getTime() + 60 * 60 * 1000);
    try {
      const out = await callVisit({
        action: 'book',
        start: start.toISOString(),
        end: end.toISOString(),
      });
      if (!out) return;
      setVisitOpen(false);
      setMessageEdited(false);
      toast({
        title: 'Site visit booked',
        description: new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Europe/London',
          weekday: 'short',
          day: 'numeric',
          month: 'short',
          hour: '2-digit',
          minute: '2-digit',
        }).format(start),
      });
    } catch (err) {
      fail('Could not book visit')(err);
    }
  };

  const setStatus = async (status: Enquiry['status']) => {
    try {
      await update.mutateAsync({ id: enquiry.id, patch: { status } });
      buzz(false);
      onOpenChange(false);
    } catch (err) {
      fail('Could not update')(err);
    }
  };

  const sendButtons = [
    intlPhone && {
      label: 'WhatsApp',
      icon: MessageCircle,
      href: `https://wa.me/${intlPhone}?text=${encodeURIComponent(message)}`,
    },
    e.phone && {
      label: 'Text',
      icon: MessageSquare,
      href: `sms:${e.phone.replace(/\s+/g, '')}?&body=${encodeURIComponent(message)}`,
    },
    e.email && {
      label: emailing ? 'Sending…' : 'Email',
      icon: Mail,
      onClick: emailReply,
    },
  ].filter(Boolean) as {
    label: string;
    icon: typeof Phone;
    href?: string;
    onClick?: () => void;
  }[];

  const contactChip =
    'inline-flex min-h-11 max-w-full items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-3 text-[13.5px] font-medium text-white transition-colors hover:bg-white/[0.08] touch-manipulation active:scale-[0.98]';

  const header = (
    <>
      {/* ── Who and how to reach them ─────────────────────────────── */}
      <div className="border-b border-white/[0.10] px-4 pb-4 pt-4 sm:px-6">
        <div className="flex flex-wrap items-center gap-1.5 text-[12px] font-medium">
          {enquiry.urgency === 'emergency' && (
            <span className="rounded-full bg-red-500/20 px-2 py-0.5 font-semibold text-red-300">
              Urgent
            </span>
          )}
          {enquiry.is_test && (
            <span className="rounded-full bg-elec-yellow/20 px-2 py-0.5 font-semibold text-elec-yellow">
              Test
            </span>
          )}
          <span className="rounded-full bg-white/[0.08] px-2 py-0.5 text-white">
            {SOURCE_LABEL[enquiry.source]}
          </span>
          {enquiry.work_category && enquiry.work_category !== 'domestic' && (
            <span className="rounded-full bg-sky-400/15 px-2 py-0.5 font-semibold capitalize text-sky-300">
              {enquiry.work_category}
            </span>
          )}
          <span className="text-white">
            {formatDistanceToNow(new Date(enquiry.received_at), { addSuffix: true })}
          </span>
        </div>

        <h2 className="mt-2 text-[22px] font-bold leading-tight tracking-tight text-white">
          {e.name || e.email || e.phone || 'New enquiry'}
        </h2>
        {enquiry.summary && (
          <p className="mt-1 text-[14px] leading-snug text-white">{enquiry.summary}</p>
        )}

        <div className="mt-3 flex flex-wrap gap-2">
          {e.phone && (
            <a
              href={`tel:${e.phone.replace(/\s+/g, '')}`}
              onClick={markReplied}
              className={contactChip}
            >
              <Phone className="h-4 w-4 shrink-0 text-elec-yellow" />
              <span className="truncate">{e.phone}</span>
            </a>
          )}
          {e.email && (
            <a href={`mailto:${encodeURIComponent(e.email)}`} className={contactChip}>
              <Mail className="h-4 w-4 shrink-0 text-elec-yellow" />
              <span className="truncate">{e.email}</span>
            </a>
          )}
          {mapsUrl && (
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className={contactChip}>
              <MapPin className="h-4 w-4 shrink-0 text-elec-yellow" />
              <span className="truncate">
                {e.postcode || e.address}
                {enquiry.distance_miles != null && ` · ${enquiry.distance_miles} mi`}
              </span>
            </a>
          )}
        </div>

        {isNew && !enquiry.is_test && (
          <div className="mt-3 flex items-center justify-between gap-3">
            {replied ? (
              <p className="flex items-center gap-2 text-[13px] font-medium text-emerald-300">
                <Check className="h-4 w-4" />
                Replied {format(new Date(enquiry.first_actioned_at!), "EEE 'at' HH:mm")}
              </p>
            ) : (
              <>
                <p
                  className={cn(
                    'text-[13px] font-medium',
                    waitingMins >= 120 ? 'text-orange-300' : 'text-white'
                  )}
                >
                  Not replied yet · waiting {formatDistanceToNow(new Date(enquiry.received_at))}
                </p>
                <button
                  type="button"
                  onClick={markReplied}
                  className="h-11 shrink-0 rounded-xl px-3 text-[13px] font-semibold text-white underline-offset-4 hover:underline touch-manipulation"
                >
                  I've replied
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );

  const body = (
    <div className={cn('flex h-full flex-col', variant === 'sheet' && 'bg-background')}>
      {variant === 'panel' && header}

      {/* ── Scrolling body ────────────────────────────────────────── */}
      <div
        className={cn(
          'flex-1 overflow-y-auto',
          variant === 'panel' && 'space-y-7 px-4 py-5 sm:px-6'
        )}
      >
        {/* On a phone the header scrolls away so the content gets the screen. A
            sticky grab bar keeps the handle and the close button clear of content. */}
        {variant === 'sheet' && (
          <div className="sticky top-0 z-10 flex h-11 items-center justify-center bg-background/95 backdrop-blur-sm">
            <span aria-hidden className="h-1.5 w-10 rounded-full bg-white/30" />
          </div>
        )}
        {variant === 'sheet' && <div className="-mb-2 -mt-3">{header}</div>}
        <div
          className={cn(
            variant === 'sheet' && 'space-y-7 px-4 py-5 sm:px-6',
            variant === 'panel' && 'contents'
          )}
        >
          {enquiry.photo_danger && (
            <div className="rounded-xl border border-red-500/40 bg-red-500/[0.12] px-3.5 py-3">
              <p className="text-[13px] font-semibold text-red-300">
                Possible danger in the photos
              </p>
              <p className="mt-1 text-[12.5px] leading-snug text-white">
                Check the photos below and ring them first. Tell them to keep away from anything hot
                or burnt.
              </p>
            </div>
          )}
          {enquiry.fit_note && (
            <div className={warningPanelCn}>
              <p className="text-[13px] font-semibold text-orange-300">{enquiry.fit_note}</p>
              <p className="mt-1 text-[12.5px] leading-snug text-white">
                Still worth a polite reply. Dismiss it if you won't take it on.
              </p>
            </div>
          )}
          {enquiry.contact_hidden && (
            <div className={warningPanelCn}>
              <p className="text-[13px] font-semibold text-orange-300">
                Contact details are hidden by {SOURCE_LABEL[enquiry.source]}
              </p>
              <p className="mt-1 text-[12.5px] leading-snug text-white">
                Accept or buy the lead on {SOURCE_LABEL[enquiry.source]} to see their number. The
                reply below is ready to paste there.
              </p>
            </div>
          )}
          {enquiry.matched && !enquiry.customer_id && (
            <div className={warningPanelCn}>
              <p className="text-[13px] font-semibold text-orange-300">
                Looks like {enquiry.matched.name}, an existing customer
              </p>
              <p className="mt-1 text-[12.5px] leading-snug text-white">
                Same phone or email. Adding uses that record rather than creating a new one.
              </p>
            </div>
          )}
          {enquiry.confidence != null && enquiry.confidence < 0.6 && (
            <div className={warningPanelCn}>
              <p className="text-[13px] font-semibold text-orange-300">Check the details</p>
              <p className="mt-1 text-[12.5px] leading-snug text-white">
                This one was hard to read. Compare with the original message at the bottom.
              </p>
            </div>
          )}

          {/* What they need */}
          <section>
            <div className="flex items-center justify-between gap-2">
              <h3 className={sectionTitleCn}>What they need</h3>
              {e.job_type && (
                <span className="rounded-full bg-elec-yellow/15 px-2.5 py-0.5 text-[12px] font-semibold text-elec-yellow">
                  {e.job_type}
                </span>
              )}
            </div>
            {editing ? (
              <textarea
                rows={4}
                className={cn(inputCn, 'mt-2 h-auto py-2 leading-snug')}
                value={e.job_description ?? ''}
                onChange={set('job_description')}
              />
            ) : (
              <p className="mt-2 whitespace-pre-wrap text-[15.5px] leading-relaxed text-white">
                {e.job_description ||
                  (enquiry.source === 'phone'
                    ? 'Missed call, no voicemail. Call them back to find out what they need.'
                    : 'No description. See the original message below.')}
              </p>
            )}
            {enquiry.availability && (
              <p className="mt-2 text-[14px] text-white">
                <span className="font-semibold">When suits them:</span> {enquiry.availability.note}
              </p>
            )}

            {photoUrls.length > 0 && (
              <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
                {photoUrls.map((u, i) => {
                  // iPhone HEIC photos (emailed) can't be shown inline outside Safari
                  const heic = /\.(heic|heif)(\?|$)/i.test(u);
                  return (
                    <a
                      key={u}
                      href={u}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block aspect-square overflow-hidden rounded-xl border border-white/[0.12] touch-manipulation"
                    >
                      {heic ? (
                        <span className="flex h-full w-full flex-col items-center justify-center gap-1.5 bg-white/[0.04] text-[12px] font-medium text-white">
                          <Camera className="h-5 w-5" />
                          Photo {i + 1}
                        </span>
                      ) : (
                        <img
                          src={u}
                          alt={`Photo ${i + 1} from the customer`}
                          className="h-full w-full object-cover"
                          loading="lazy"
                        />
                      )}
                    </a>
                  );
                })}
              </div>
            )}
          </section>

          {/* AI-suggested visit: approve, pick another, or no visit */}
          {isNew && enquiry.visit_status === 'proposed' && proposals.length > 0 && (
            <section className="rounded-2xl border border-elec-yellow/45 bg-elec-yellow/[0.07] p-4">
              <div className="flex items-center justify-between gap-2">
                <p className={cn(sectionTitleCn, 'text-elec-yellow')}>Suggested visit</p>
                <span className="text-[11.5px] font-medium text-white">
                  From your diary · needs your OK
                </span>
              </div>
              <div role="radiogroup" aria-label="Suggested visit times" className="mt-3 space-y-2">
                {proposals.map((p, i) => (
                  <button
                    key={p.start}
                    type="button"
                    role="radio"
                    aria-checked={slotIdx === i}
                    onClick={() => setSlotIdx(i)}
                    className={cn(
                      'flex min-h-[52px] w-full items-center gap-3 rounded-xl border px-3 py-2 text-left transition-colors touch-manipulation',
                      slotIdx === i
                        ? 'border-elec-yellow bg-elec-yellow/[0.12]'
                        : 'border-white/[0.12] bg-white/[0.03] hover:bg-white/[0.06]'
                    )}
                  >
                    <span
                      className={cn(
                        'grid h-5 w-5 shrink-0 place-items-center rounded-full border-2',
                        slotIdx === i ? 'border-elec-yellow' : 'border-white/40'
                      )}
                    >
                      {slotIdx === i && (
                        <span className="h-2.5 w-2.5 rounded-full bg-elec-yellow" />
                      )}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-[14.5px] font-semibold text-white">
                        {p.label}
                      </span>
                      <span className="block text-[12.5px] text-white">{p.reason}</span>
                    </span>
                  </button>
                ))}
              </div>
              <div className="mt-3 grid grid-cols-[minmax(0,1fr)_auto_auto] gap-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={onBookSlot}
                  className={primaryButtonCn}
                >
                  Book {proposals[slotIdx]?.label.split(',')[0]}
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setVisitOpen(true)}
                  className={cn(ghostButtonCn, 'whitespace-nowrap px-3')}
                >
                  Other time
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => callVisit({ action: 'decline' }).catch(fail('Could not update'))}
                  className={cn(ghostButtonCn, 'whitespace-nowrap px-3')}
                >
                  No visit
                </button>
              </div>
            </section>
          )}
          {enquiry.visit_status === 'booked' && enquiry.visit_start && (
            <section className="flex items-start gap-3 rounded-2xl border border-emerald-500/40 bg-emerald-500/[0.08] p-4">
              <Check className="mt-0.5 h-5 w-5 shrink-0 text-emerald-300" />
              <div>
                <p className="text-[14.5px] font-semibold text-white">
                  Visit booked: {visitPhrase(enquiry.visit_start)}
                </p>
                <p className="mt-0.5 text-[12.5px] leading-snug text-white">
                  It's in your diary. The reply below offers this time. Send it so they can confirm.
                </p>
                {e.email && enquiry.calendar_event_id && authUser?.id === enquiry.user_id && (
                  <div className="mt-3 space-y-2">
                    {bookingEmail === 'sent' ? (
                      <p className="flex items-center gap-1.5 text-[13px] font-semibold text-emerald-300">
                        <Check className="h-4 w-4" /> Booking emailed to {e.email}
                      </p>
                    ) : (
                      <>
                        <button
                          type="button"
                          onClick={emailBooking}
                          disabled={bookingEmail === 'sending'}
                          className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 text-[13.5px] font-semibold text-black disabled:opacity-60 touch-manipulation active:scale-[0.98] sm:w-auto"
                        >
                          <Mail className="h-4 w-4" />
                          {bookingEmail === 'sending'
                            ? 'Sending…'
                            : 'Email them the booking with a calendar invite'}
                        </button>
                        <label className="flex min-h-11 cursor-pointer items-center gap-2 text-[13px] text-white touch-manipulation">
                          <input
                            type="checkbox"
                            checked={remindEve}
                            onChange={(ev) => setRemindEve(ev.target.checked)}
                            className="h-5 w-5 accent-emerald-500"
                          />
                          Remind them the evening before
                        </label>
                      </>
                    )}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* What the photos show + what they usually cost */}
          {(enquiry.photo_findings.length > 0 ||
            typical ||
            (rates && enquiry.job_key && enquiry.job_key !== 'not_electrical')) && (
            <section className="grid gap-3 sm:grid-cols-2">
              {enquiry.photo_findings.length > 0 && (
                <div
                  className={cn(
                    'rounded-2xl border p-4',
                    enquiry.photo_danger
                      ? 'border-red-500/40 bg-red-500/[0.08]'
                      : 'border-elec-yellow/40 bg-elec-yellow/[0.06]'
                  )}
                >
                  <p
                    className={cn(
                      sectionTitleCn,
                      enquiry.photo_danger ? 'text-red-300' : 'text-elec-yellow'
                    )}
                  >
                    From the photos
                  </p>
                  <ul className="mt-2 space-y-1.5 text-[14px] leading-snug text-white">
                    {enquiry.photo_findings.map((f) => (
                      <li key={f} className="flex gap-2">
                        <span
                          aria-hidden
                          className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-current"
                        />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-2 text-[11.5px] text-white">
                    Read by AI. Check before you rely on it.
                  </p>
                </div>
              )}
              {(typical || rates) && (
                <div className="rounded-2xl border border-white/[0.12] bg-white/[0.04] p-4">
                  <p className={sectionTitleCn}>
                    {typical?.source === 'rate_card' ? 'Your rate card' : 'Your prices'}
                  </p>
                  {typical && (
                    <p className="mt-1.5 text-[22px] font-bold tabular-nums tracking-tight text-white">
                      £{typical.low.toLocaleString('en-GB')}
                      {typical.high !== typical.low &&
                        ` – £${typical.high.toLocaleString('en-GB')}`}
                    </p>
                  )}
                  <p className="mt-1 text-[12.5px] leading-snug text-white">
                    {typical?.source === 'rate_card'
                      ? typical.item
                        ? `${typical.item}, from your Rate Card.`
                        : `${typical.count} matching items on your Rate Card.`
                      : typical
                        ? `Middle of your last ${typical.count} quotes for this kind of job.`
                        : 'No Rate Card price or past quotes for this kind of job yet.'}
                  </p>
                  {rates && (
                    <p className="mt-2 text-[12.5px] font-medium text-white">
                      {[rates.hourly && `£${rates.hourly}/hour`, rates.day && `£${rates.day}/day`]
                        .filter(Boolean)
                        .join(' · ')}
                    </p>
                  )}
                  <p className="mt-2 text-[11.5px] text-white">
                    A guide for the call, not a price to give.
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Reply */}
          {(isNew || (enquiry.visit_status === 'booked' && enquiry.status === 'converted')) &&
            (e.phone || e.email || enquiry.contact_hidden) && (
              <section>
                <h3 className={sectionTitleCn}>Reply</h3>
                <textarea
                  aria-label="Reply message"
                  rows={4}
                  value={message}
                  onChange={(ev) => {
                    setMessage(ev.target.value);
                    setMessageEdited(true);
                  }}
                  className="mt-2 w-full resize-none rounded-xl border border-white/[0.12] bg-white/[0.04] px-3 py-2.5 text-base leading-snug text-white caret-elec-yellow focus:border-elec-yellow focus:outline-none touch-manipulation"
                />
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setIncludeBooking((v) => !v);
                      setMessageEdited(false);
                    }}
                    className={cn(chipBase, includeBooking ? chipOn : chipOff)}
                  >
                    {includeBooking ? 'Booking link on' : 'Add booking link'}
                  </button>
                  {messageEdited && (
                    <button
                      type="button"
                      onClick={() => setMessageEdited(false)}
                      className={cn(chipBase, chipOff)}
                    >
                      Reset message
                    </button>
                  )}
                </div>
                {sendButtons.length > 0 && (
                  <div
                    className="mt-3 grid gap-2"
                    style={{ gridTemplateColumns: `repeat(${sendButtons.length}, minmax(0, 1fr))` }}
                  >
                    {sendButtons.map(({ label, icon: Icon, href, onClick }) =>
                      onClick ? (
                        <button
                          key="email"
                          type="button"
                          onClick={onClick}
                          disabled={emailing}
                          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] text-[13.5px] font-semibold text-white transition-colors hover:bg-white/[0.1] disabled:opacity-60 touch-manipulation active:scale-[0.97]"
                        >
                          <Icon className="h-4 w-4" />
                          {label}
                        </button>
                      ) : (
                        <a
                          key={label}
                          href={href}
                          target={href!.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          onClick={() => markSent(label === 'WhatsApp' ? 'whatsapp' : 'text')}
                          className="flex h-12 items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] text-[13.5px] font-semibold text-white transition-colors hover:bg-white/[0.1] touch-manipulation active:scale-[0.97]"
                        >
                          <Icon className="h-4 w-4" />
                          {label}
                        </a>
                      )
                    )}
                  </div>
                )}
                {/* Lead sites that hide the customer: reply through the site */}
                {sendButtons.length === 0 && (
                  <button
                    type="button"
                    onClick={async () => {
                      if (await copyToClipboard(message)) {
                        markSent('copy');
                        toast({
                          title: 'Reply copied',
                          description: `Paste it into ${SOURCE_LABEL[enquiry.source]}.`,
                        });
                      }
                    }}
                    className="mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.06] text-[13.5px] font-semibold text-white transition-colors hover:bg-white/[0.1] touch-manipulation active:scale-[0.97]"
                  >
                    <Copy className="h-4 w-4" />
                    Copy reply
                  </button>
                )}
                {(full?.replies ?? []).length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {(full?.replies ?? []).slice(-3).map((r) => (
                      <li key={r.at} className="flex items-center gap-2 text-[12.5px] text-white">
                        <Check className="h-3.5 w-3.5 shrink-0 text-emerald-300" />
                        {r.via === 'email'
                          ? `Emailed ${r.to}`
                          : r.via === 'whatsapp'
                            ? 'WhatsApp opened'
                            : r.via === 'text'
                              ? 'Text opened'
                              : 'Reply copied'}{' '}
                        {formatDistanceToNow(new Date(r.at), { addSuffix: true })}
                      </li>
                    ))}
                  </ul>
                )}
              </section>
            )}

          {/* Details */}
          <section>
            <div className="flex items-center justify-between">
              <h3 className={sectionTitleCn}>Contact details</h3>
              <button
                type="button"
                onClick={async () => {
                  if (editing) await saveEdits();
                  setEditing((v) => !v);
                }}
                className="flex h-11 items-center gap-1.5 rounded-xl px-2 text-[13px] font-semibold text-white touch-manipulation"
              >
                {editing ? <Check className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                {editing ? 'Done' : 'Edit'}
              </button>
            </div>
            {editing ? (
              <div className="mt-2 space-y-4">
                <div>
                  <label className={labelCn} htmlFor="enq-name">
                    Name
                  </label>
                  <input
                    id="enq-name"
                    className={inputCn}
                    value={e.name ?? ''}
                    onChange={set('name')}
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelCn} htmlFor="enq-phone">
                      Phone
                    </label>
                    <input
                      id="enq-phone"
                      className={inputCn}
                      type="tel"
                      value={e.phone ?? ''}
                      onChange={set('phone')}
                    />
                  </div>
                  <div>
                    <label className={labelCn} htmlFor="enq-email">
                      Email
                    </label>
                    <input
                      id="enq-email"
                      className={inputCn}
                      type="email"
                      value={e.email ?? ''}
                      onChange={set('email')}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className={labelCn} htmlFor="enq-address">
                      Address
                    </label>
                    <input
                      id="enq-address"
                      className={inputCn}
                      value={e.address ?? ''}
                      onChange={set('address')}
                    />
                  </div>
                  <div>
                    <label className={labelCn} htmlFor="enq-postcode">
                      Postcode
                    </label>
                    <input
                      id="enq-postcode"
                      className={inputCn}
                      value={e.postcode ?? ''}
                      onChange={set('postcode')}
                    />
                  </div>
                </div>
              </div>
            ) : (
              <dl className="mt-1 divide-y divide-white/[0.08]">
                {(
                  [
                    ['Name', e.name],
                    ['Phone', e.phone],
                    ['Email', e.email],
                    ['Address', fullAddress(e.address, e.postcode)],
                  ] as [string, string | null][]
                ).map(([k, v]) => (
                  <div key={k} className="flex items-baseline justify-between gap-4 py-2.5">
                    <dt className="shrink-0 text-[13px] text-white">{k}</dt>
                    <dd
                      className={cn(
                        'min-w-0 break-words text-right text-[14px] font-medium',
                        v ? 'text-white' : 'font-normal italic text-white'
                      )}
                    >
                      {v || 'Not given'}
                    </dd>
                  </div>
                ))}
              </dl>
            )}
          </section>

          {/* Original message */}
          {full?.raw_text && (
            <section className="border-t border-white/[0.1] pt-2">
              <button
                type="button"
                onClick={() => setShowOriginal((v) => !v)}
                className="flex h-11 w-full items-center justify-between text-[13px] font-semibold text-white touch-manipulation"
              >
                {enquiry.source === 'phone' || enquiry.source === 'sms'
                  ? 'Calls and texts'
                  : 'Original message'}
                <ChevronDown
                  className={cn('h-4 w-4 transition-transform', showOriginal && 'rotate-180')}
                />
              </button>
              {showOriginal && (
                <div className="mt-1 rounded-xl bg-white/[0.04] p-3">
                  {enquiry.raw_from && (
                    <p className="text-[12px] font-medium text-white">From: {enquiry.raw_from}</p>
                  )}
                  {enquiry.raw_subject && (
                    <p className="text-[12px] font-medium text-white">
                      Subject: {enquiry.raw_subject}
                    </p>
                  )}
                  <pre className="mt-2 whitespace-pre-wrap break-words font-sans text-[13px] leading-snug text-white">
                    {full.raw_text}
                  </pre>
                </div>
              )}
            </section>
          )}

          {/* Book visit */}
          {visitOpen && (
            <section
              ref={visitRef}
              className="space-y-4 rounded-2xl border border-elec-yellow/40 bg-elec-yellow/[0.06] p-4"
            >
              <h3 className="text-[15px] font-semibold text-white">Book a site visit</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelCn} htmlFor="enq-visit-date">
                    Date
                  </label>
                  <input
                    id="enq-visit-date"
                    type="date"
                    className={inputCn}
                    value={visitDate}
                    onChange={(ev) => setVisitDate(ev.target.value)}
                  />
                </div>
                <div>
                  <label className={labelCn} htmlFor="enq-visit-time">
                    Time
                  </label>
                  <input
                    id="enq-visit-time"
                    type="time"
                    className={inputCn}
                    value={visitTime}
                    onChange={(ev) => setVisitTime(ev.target.value)}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button type="button" onClick={() => setVisitOpen(false)} className={ghostButtonCn}>
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={busy}
                  onClick={onBookVisit}
                  className={primaryButtonCn}
                >
                  Book it
                </button>
              </div>
            </section>
          )}
        </div>
      </div>

      {/* ── Decision bar ──────────────────────────────────────────── */}
      <div
        onMouseDown={(ev) => ev.preventDefault()}
        className="border-t border-white/[0.10] bg-background/95 px-4 pb-[max(env(safe-area-inset-bottom),12px)] pt-3 sm:px-6"
      >
        {isNew ? (
          <div className="space-y-2">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={onAddAndQuote}
                className={cn(primaryButtonCn, 'w-full')}
              >
                Add & quote
              </button>
              {!(enquiry.visit_status === 'proposed' && proposals.length > 0) &&
                enquiry.visit_status !== 'booked' && (
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => setVisitOpen((v) => !v)}
                    className={cn(ghostButtonCn, visitOpen && 'border-elec-yellow')}
                  >
                    Book visit
                  </button>
                )}
            </div>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                disabled={busy}
                onClick={onAddCustomer}
                className={cn(ghostButtonCn, 'whitespace-nowrap px-2')}
              >
                Add customer
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => setStatus('dismissed')}
                className={cn(ghostButtonCn, 'whitespace-nowrap px-2')}
              >
                Dismiss
              </button>
              <button
                type="button"
                disabled={busy}
                onClick={() => setStatus('spam')}
                className={cn(ghostButtonCn, 'whitespace-nowrap px-2')}
              >
                Spam
              </button>
            </div>
          </div>
        ) : enquiry.status === 'converted' && enquiry.customer_id ? (
          <button
            type="button"
            onClick={() => {
              onOpenChange(false);
              navigate(`/customers/${enquiry.customer_id}`);
            }}
            className={cn(primaryButtonCn, 'w-full')}
          >
            Open customer
          </button>
        ) : enquiry.status === 'spam' ? (
          (() => {
            const from = senderOf(enquiry.raw_from);
            // Personal addresses (gmail, hotmail…) block the one address, never the whole domain
            const target = from.personal ? from.address : from.domain;
            return (
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  disabled={busy}
                  onClick={() => setStatus('new')}
                  className={cn(ghostButtonCn, 'whitespace-nowrap px-2')}
                >
                  Not spam
                </button>
                {target ? (
                  <button
                    type="button"
                    disabled={block.isPending}
                    onClick={async () => {
                      try {
                        await block.mutateAsync({ sender: target, blocked: true });
                        toast({
                          title: `Blocked ${target}`,
                          description:
                            'Their emails are dropped from now on. Undo in Connect enquiries.',
                        });
                        onOpenChange(false);
                      } catch (err) {
                        fail('Could not block')(err);
                      }
                    }}
                    className={cn(ghostButtonCn, 'truncate whitespace-nowrap px-2')}
                  >
                    Block {target}
                  </button>
                ) : (
                  <span />
                )}
              </div>
            );
          })()
        ) : (
          <button
            type="button"
            disabled={busy}
            onClick={() => setStatus('new')}
            className={cn(ghostButtonCn, 'w-full')}
          >
            Move back to inbox
          </button>
        )}
      </div>
    </div>
  );

  if (variant === 'panel') return body;

  return (
    <Sheet open={!!enquiry} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
        {body}
      </SheetContent>
    </Sheet>
  );
}
