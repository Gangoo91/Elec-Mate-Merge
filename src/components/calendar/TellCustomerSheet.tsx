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
import { Check, Copy, Loader2, Mail, MessageCircle, MessageSquare } from 'lucide-react';
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
}

const TellCustomerSheet = ({
  open,
  onOpenChange,
  customer,
  booking,
  businessName,
  eventId,
}: TellCustomerSheetProps) => {
  const { send, sending } = useSendBookingConfirmation();
  const [emailed, setEmailed] = useState(false);
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
        ? { ...booking, clientName: customer.name, businessName }
        : null,
    [booking, customer, businessName]
  );

  const preview = parts ? confirmationMessage(parts) : '';
  const hasPhone = !!customer?.phone?.trim();
  const hasEmail = !!customer?.email?.trim();

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
    const result = await send(eventId, booking?.movedFrom ?? null);
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
      <SheetContent side="bottom" className="max-h-[85vh] overflow-hidden rounded-t-2xl p-0">
        <div className="flex max-h-[85vh] flex-col bg-background">
          <SheetHeader className="shrink-0 px-4 py-3">
            <SheetTitle className="text-left text-[17px] font-semibold tracking-tight text-white">
              {booking?.movedFrom ? 'Moved' : 'Booked in'}
              {customer ? ` — tell ${customer.name.split(/\s+/)[0]}` : ''}
            </SheetTitle>
            <SheetDescription className="text-left text-[13px] text-white">
              {parts ? whenLine(parts) : 'Nothing to send.'}
            </SheetDescription>
          </SheetHeader>

          <div className="flex-1 space-y-4 overflow-y-auto px-4 pb-4">
            <div>
              <span className={cn(eyebrowCn, 'mb-2 block')}>What they&rsquo;ll get</span>
              <pre className="whitespace-pre-wrap rounded-2xl border border-white/[0.12] bg-white/[0.04] px-3.5 py-3 font-sans text-[13px] leading-relaxed text-white">
                {preview}
              </pre>
            </div>

            {emailError && (
              <p className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2.5 text-[13px] text-orange-300">
                {emailError}
              </p>
            )}

            <div className="grid grid-cols-2 gap-2">
              <ChannelButton
                icon={<MessageCircle className="h-5 w-5" />}
                label="WhatsApp"
                hint={hasPhone ? undefined : 'No number on file'}
                disabled={!hasPhone}
                primary={preferred === 'whatsapp'}
                onClick={() => handOff('whatsapp')}
              />
              <ChannelButton
                icon={<MessageSquare className="h-5 w-5" />}
                label="Text"
                hint={hasPhone ? undefined : 'No number on file'}
                disabled={!hasPhone}
                primary={preferred === 'sms'}
                onClick={() => handOff('sms')}
              />
              <ChannelButton
                icon={
                  sending ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : emailed ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    <Mail className="h-5 w-5" />
                  )
                }
                label={emailed ? 'Emailed' : 'Email'}
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
                icon={<Copy className="h-5 w-5" />}
                label="Copy"
                onClick={copy}
              />
            </div>
          </div>

          <div
            className="shrink-0 border-t border-white/[0.10] px-4 pt-3"
            style={{ paddingBottom: 'max(0.75rem, env(safe-area-inset-bottom))' }}
          >
            <button
              type="button"
              onClick={() => onOpenChange(false)}
              className="flex h-12 w-full items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.04] text-[15px] font-semibold text-white touch-manipulation active:scale-[0.98]"
            >
              {/* Wording matters on a reschedule: "Not now" on a job that has
                  MOVED reads as "remind me", and nothing will remind them. */}
              {booking?.movedFrom ? 'I’ll tell them myself' : 'Not now'}
            </button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

function ChannelButton({
  icon,
  label,
  hint,
  disabled,
  primary,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  hint?: string;
  disabled?: boolean;
  /** The channel used last for this customer — leads, rather than being found. */
  primary?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex min-h-[76px] flex-col items-center justify-center gap-1 rounded-2xl border px-3 py-3 transition-colors touch-manipulation',
        primary
          ? 'border-elec-yellow bg-elec-yellow text-black active:bg-elec-yellow/90'
          : 'border-white/[0.12] bg-white/[0.05] text-white active:bg-white/[0.10]',
        // Dimmed as a whole rather than greyed type — the house rule.
        disabled && 'pointer-events-none opacity-40'
      )}
    >
      {icon}
      <span className="text-[13px] font-semibold">{label}</span>
      {hint && <span className="text-[11px] leading-tight">{hint}</span>}
    </button>
  );
}

export default TellCustomerSheet;
