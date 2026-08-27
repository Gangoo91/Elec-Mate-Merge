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
import { useMemo } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Copy, Mail, MessageCircle, MessageSquare } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import { eyebrowCn } from './calendarStyles';
import {
  confirmationMailto,
  confirmationMessage,
  confirmationSms,
  confirmationWhatsapp,
  whenLine,
  type ConfirmationParts,
} from './confirmationMessage';

export interface TellCustomerTarget {
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
}

const TellCustomerSheet = ({
  open,
  onOpenChange,
  customer,
  booking,
  businessName,
}: TellCustomerSheetProps) => {
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

  const send = async (channel: 'whatsapp' | 'sms' | 'email') => {
    if (!parts) return;
    const url =
      channel === 'whatsapp'
        ? confirmationWhatsapp(parts, customer?.phone)
        : channel === 'sms'
          ? confirmationSms(parts, customer?.phone)
          : confirmationMailto(parts, customer?.email);
    await openExternalUrl(url);
    onOpenChange(false);
  };

  const copy = async () => {
    const ok = await copyToClipboard(preview);
    toast(ok ? { title: 'Message copied' } : { title: 'Could not copy', variant: 'destructive' });
  };

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

            <div className="grid grid-cols-2 gap-2">
              <ChannelButton
                icon={<MessageCircle className="h-5 w-5" />}
                label="WhatsApp"
                hint={hasPhone ? undefined : 'No number on file'}
                disabled={!hasPhone}
                onClick={() => send('whatsapp')}
              />
              <ChannelButton
                icon={<MessageSquare className="h-5 w-5" />}
                label="Text"
                hint={hasPhone ? undefined : 'No number on file'}
                disabled={!hasPhone}
                onClick={() => send('sms')}
              />
              <ChannelButton
                icon={<Mail className="h-5 w-5" />}
                label="Email"
                hint={hasEmail ? undefined : 'No email on file'}
                disabled={!hasEmail}
                onClick={() => send('email')}
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
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  hint?: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex min-h-[76px] flex-col items-center justify-center gap-1 rounded-2xl border border-white/[0.12] bg-white/[0.05] px-3 py-3 text-white transition-colors touch-manipulation active:bg-white/[0.10]',
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
