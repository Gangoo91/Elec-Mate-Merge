/**
 * "Right — now tell them."
 *
 * A booking that only exists in the electrician's diary is half a booking. The
 * customer standing at the door has nothing in writing, and the single most
 * common way a job goes wrong is both sides remembering a different Tuesday.
 *
 * Nothing sends itself. Every button here opens the electrician's own WhatsApp,
 * Messages or mail client with the message already written; they read it and
 * press send. That was a deliberate choice — an app that silently emails your
 * customers is an app you stop trusting the first time it emails the wrong one.
 *
 * Channels the customer cannot receive are shown greyed rather than hidden, so
 * it is obvious WHY you cannot text someone (no number on file) instead of the
 * button quietly not being there.
 */
import { useEffect, useMemo, useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Check, Copy, Loader2, Mail, MessageCircle, MessageSquare, RotateCcw } from 'lucide-react';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import { eyebrowCn } from './calendarStyles';
import {
  lastChannelFor,
  rememberChannel,
  useSendBookingConfirmation,
  type TellChannel,
} from '@/hooks/useBookingConfirmation';
import {
  confirmationMailto,
  confirmationMessage,
  confirmationSms,
  confirmationWhatsapp,
  whenLine,
  type ConfirmationParts,
} from './confirmationMessage';

export interface TellCustomerTarget {
  id?: string;
  name: string;
  phone?: string;
  email?: string;
}

interface TellCustomerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer: TellCustomerTarget | null;
  /** `movedFrom` set turns this from a confirmation into a reschedule. */
  booking: Omit<ConfirmationParts, 'clientName' | 'businessName'> | null;
  businessName?: string | null;
  /** The saved event, so the email can be sent server-side against it. */
  eventId?: string | null;
  /** ELE-1685 — the electrician's own confirmation wording, if set in Settings. */
  template?: string | null;
  /**
   * After a drag, the way back. The move toast has Undo too, but this sheet
   * is modal and sits on top of it — a tap on the toast only closed the
   * sheet (found in Chrome, 20 Sep). So the undo lives here as well.
   */
  onUndoMove?: (() => void) | null;
}

const TellCustomerSheet = ({
  open,
  onOpenChange,
  customer,
  booking,
  businessName,
  eventId,
  template,
  onUndoMove,
}: TellCustomerSheetProps) => {
  const { send, sending } = useSendBookingConfirmation();
  const [emailed, setEmailed] = useState(false);
  /**
   * Email them again the evening before. On by default: a customer who
   * wanted the booking wants the reminder, and a no-show costs a day. Only
   * email can be automated — WhatsApp and text leave the phone by hand.
   */
  const [remind, setRemind] = useState(true);
  const [emailError, setEmailError] = useState<string | null>(null);

  /*
   * Reset per booking.
   *
   * These are about ONE event, and the sheet is reused for every one. Without
   * this, emailing the first booking of the morning left the Email button
   * reading "Emailed" and disabled for the rest of the day — the second
   * customer never got told, and nothing said so.
   */
  useEffect(() => {
    setEmailed(false);
    setEmailError(null);
  }, [open, eventId]);
  const parts = useMemo<ConfirmationParts | null>(
    () =>
      booking && customer
        ? { ...booking, clientName: customer.name, businessName, template }
        : null,
    [booking, customer, businessName, template]
  );

  const preview = parts ? confirmationMessage(parts) : '';
  const hasPhone = !!customer?.phone?.trim();
  const hasEmail = !!customer?.email?.trim();
  /**
   * The reminder switch is offered only where the cron could act on it: a
   * saved booking, an address to send to, and not a reschedule — a move keeps
   * whatever was chosen the first time rather than silently switching it off.
   */
  const showRemind = !!eventId && hasEmail && !booking?.movedFrom;

  /** WhatsApp and SMS hand off to the phone; nothing is sent by the app. */
  const handOff = async (channel: 'whatsapp' | 'sms') => {
    if (!parts) return;
    rememberChannel(customer?.id, channel);
    await openExternalUrl(
      channel === 'whatsapp'
        ? confirmationWhatsapp(parts, customer?.phone)
        : confirmationSms(parts, customer?.phone)
    );
    onOpenChange(false);
  };

  /**
   * Email is the one the app sends itself — branded, with the .ics attached.
   *
   * Falls back to a plain `mailto:` when there is no saved event to send
   * against (an unsaved preview), so the button is never dead.
   */
  const sendEmail = async () => {
    if (!parts) return;
    setEmailError(null);
    if (!eventId) {
      await openExternalUrl(confirmationMailto(parts, customer?.email));
      onOpenChange(false);
      return;
    }
    const result = await send(
      eventId,
      booking?.movedFrom ?? null,
      showRemind ? { remindDayBefore: remind } : undefined
    );
    if (result.ok) {
      rememberChannel(customer?.id, 'email');
      setEmailed(true);
      toast({ title: `Emailed ${customer?.name ?? 'the customer'}`, variant: 'success' });
      return;
    }
    // Kept on screen rather than toasted away: a suppressed address means they
    // have to pick another channel, and the reason has to still be readable
    // while they do it.
    setEmailError(result.error ?? 'Could not send the email.');
  };

  const copy = async () => {
    const ok = await copyToClipboard(preview);
    toast(ok ? { title: 'Message copied' } : { title: 'Could not copy', variant: 'destructive' });
  };

  /** The channel used last for this customer leads; the rest stay available. */
  const preferred: TellChannel | null = useMemo(() => {
    if (!open) return null;
    const last = lastChannelFor(customer?.id);
    if (last === 'whatsapp' || last === 'sms') return hasPhone ? last : null;
    if (last === 'email') return hasEmail ? 'email' : null;
    return null;
  }, [open, customer?.id, hasPhone, hasEmail]);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        /*
         * Full width from the sidebar to the window edge on a desktop — not a
         * 640px panel like the other calendar sheets. This one is a compose
         * screen: the message on the left, the ways to send it on the right
         * (Andrew, 20 Sep). On a phone it stacks, message first.
         */
        className="max-h-[85vh] overflow-hidden rounded-t-2xl p-0"
      >
        <div className="flex max-h-[85vh] flex-col bg-background">
          <SheetHeader className="shrink-0 px-4 py-3 sm:px-6 sm:py-4">
            <SheetTitle className="flex flex-wrap items-center gap-2 text-left text-[17px] font-semibold tracking-tight text-white sm:text-[19px]">
              {/* A pill for the state, colour-coded like the grid: green for a
                  fresh booking, orange for one that has moved. */}
              <span
                className={cn(
                  'rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-[0.12em]',
                  booking?.movedFrom
                    ? 'bg-orange-500/20 text-orange-300'
                    : 'bg-emerald-500/20 text-emerald-300'
                )}
              >
                {booking?.movedFrom ? 'Rescheduled' : 'Booked in'}
              </span>
              <span>
                Tell{' '}
                <span className="text-elec-yellow">
                  {customer ? customer.name.split(/\s+/)[0] : 'the customer'}
                </span>
              </span>
            </SheetTitle>
            <SheetDescription className="text-left text-[13px] text-white">
              {parts ? whenLine(parts) : 'Nothing to send.'}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto px-4 pb-4 sm:px-6 sm:pb-6">
            {/* Phone: message, then the ways to send it. Desktop: side by side —
                the message gets the width it needs to read as a message, and
                the channels sit where the hand goes next. */}
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-8">
              <div>
                <span className={cn(eyebrowCn, 'mb-2 block')}>What they&rsquo;ll get</span>
                <pre className="whitespace-pre-wrap rounded-2xl border border-white/[0.12] border-l-[3px] border-l-elec-yellow bg-white/[0.04] px-4 py-3.5 font-sans text-[13px] leading-relaxed text-white sm:px-5 sm:py-4 sm:text-[14px] lg:min-h-[280px]">
                  {preview}
                </pre>
              </div>

              <div className="space-y-3">
                <span className={cn(eyebrowCn, 'hidden lg:block')}>Send it by</span>

            {emailError && (
              <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2.5 text-[13px] text-orange-300">
                {emailError}
              </p>
            )}

            {/* Only shown when there is a saved booking to remind against and
                an address to send to — the cron emails, nothing else. */}
            {showRemind && (
              <label className="flex min-h-11 cursor-pointer items-center justify-between gap-3 rounded-2xl border border-white/[0.12] bg-white/[0.04] px-4 py-2.5">
                <span className="min-w-0">
                  <span className="block text-[14px] font-medium text-white">
                    Remind them the evening before
                  </span>
                  <span className="block text-[12px] text-white">By email, the day before the job</span>
                </span>
                <Switch checked={remind} onCheckedChange={setRemind} disabled={emailed} />
              </label>
            )}

            <div className="grid grid-cols-2 gap-2">
              <ChannelButton
                label="WhatsApp"
                tone="#25D366"
                hint={hasPhone ? undefined : 'No number on file'}
                disabled={!hasPhone}
                primary={preferred === 'whatsapp'}
                onClick={() => handOff('whatsapp')}
              />
              <ChannelButton
                label="Text"
                tone="#3B82F6"
                hint={hasPhone ? undefined : 'No number on file'}
                disabled={!hasPhone}
                primary={preferred === 'sms'}
                onClick={() => handOff('sms')}
              />
              <ChannelButton
                label={emailed ? 'Emailed' : 'Email'}
                tone="#FACC15"
                // Says what makes email different — it is the only channel that
                // can put the job straight into the customer's own diary.
                hint={
                  !hasEmail
                    ? 'No email on file'
                    : emailed
                      ? undefined
                      : eventId
                        ? 'With calendar file'
                        : undefined
                }
                disabled={!hasEmail || sending || emailed}
                primary={preferred === 'email'}
                onClick={sendEmail}
              />
              <ChannelButton
                label="Copy"
                tone="#A78BFA"
                onClick={copy}
              />
              </div>
              </div>
            </div>
          </div>

          <div
            className="shrink-0 border-t border-white/[0.10] px-4 pt-3 sm:px-6"
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-end">
              {booking?.movedFrom && onUndoMove && (
                <button
                  type="button"
                  onClick={() => {
                    onUndoMove();
                    onOpenChange(false);
                  }}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-xl text-[14px] font-medium text-white underline decoration-white/40 underline-offset-4 touch-manipulation sm:w-auto sm:px-4"
                >
                  Moved by mistake? Put it back
                </button>
              )}
              <button
                type="button"
                onClick={() => onOpenChange(false)}
                className="flex h-12 w-full items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.04] text-[15px] font-semibold text-white touch-manipulation active:scale-[0.98] sm:w-auto sm:min-w-[240px] sm:px-8"
              >
                {/* Wording matters on a reschedule: "Not now" on a job that has
                    MOVED reads as "remind me", and nothing will remind them. */}
                {booking?.movedFrom ? 'I’ll tell them myself' : 'Not now'}
              </button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

function ChannelButton({
  label,
  hint,
  disabled,
  primary,
  tone,
  onClick,
}: {
  label: string;
  hint?: string;
  disabled?: boolean;
  /** The channel used last for this customer — leads, rather than being found. */
  primary?: boolean;
  /** The channel's own colour — WhatsApp green, iMessage blue — on its label. */
  tone?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex min-h-[64px] flex-col items-center justify-center gap-1 rounded-2xl border px-3 py-3 transition-colors touch-manipulation',
        primary
          ? 'border-elec-yellow bg-elec-yellow text-black active:bg-elec-yellow/90'
          : 'border-white/[0.12] bg-white/[0.05] text-white hover:bg-white/[0.08] active:bg-white/[0.10]',
        // Dimmed as a whole rather than greyed type — the house rule.
        disabled && 'pointer-events-none opacity-40'
      )}
    >
      <span
        className="text-[15px] font-semibold"
        style={!primary && tone ? { color: tone } : undefined}
      >
        {label}
      </span>
      {hint && <span className="text-[11px] leading-tight">{hint}</span>}
    </button>
  );
}

export default TellCustomerSheet;
