import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { cn } from '@/lib/utils';
import { cardCn, eyebrowCn } from '@/components/shared/surfaceStyles';
import { toast } from '@/hooks/use-toast';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import {
  bookingMessage,
  mailtoUrl,
  smsUrl,
  whatsappUrl,
} from './bookingMessage';

interface BookingLinkCardProps {
  url: string;
  businessName?: string | null;
  /** Opens the customer picker, which pre-fills a number or address. */
  onSendToCustomer: () => void;
  onPreview: () => void;
}

/**
 * Sending the booking link.
 *
 * This replaces a single button that called the OS share sheet. On a phone
 * that sheet listed WhatsApp and Mail and looked like a proper send screen;
 * on desktop there is no such sheet, so `shareContent` fell through to a
 * clipboard copy and the button appeared to do nothing at all. Real buttons
 * behave the same on both.
 */
const BookingLinkCard = ({
  url,
  businessName,
  onSendToCustomer,
  onPreview,
}: BookingLinkCardProps) => {
  const [showQr, setShowQr] = useState(false);
  const parts = { url, businessName };

  const handleCopy = async () => {
    const ok = await copyToClipboard(url);
    toast(
      ok
        ? { title: 'Booking link copied' }
        : { title: 'Could not copy', description: url, variant: 'destructive' }
    );
  };

  const handleCopyMessage = async () => {
    const ok = await copyToClipboard(bookingMessage(parts));
    toast(ok ? { title: 'Message copied' } : { title: 'Could not copy', variant: 'destructive' });
  };

  const channels = [
    { key: 'whatsapp', label: 'WhatsApp', run: () => openExternalUrl(whatsappUrl(parts)) },
    { key: 'email', label: 'Email', run: () => openExternalUrl(mailtoUrl(parts)) },
    { key: 'text', label: 'Text', run: () => openExternalUrl(smsUrl(parts)) },
    { key: 'copy', label: 'Copy link', run: handleCopy },
  ];

  return (
    <section className={cn(cardCn, 'p-4 sm:p-5')}>
      <span className={cn(eyebrowCn, 'block')}>Your booking link</span>
      <h2 className="mt-1.5 text-[17px] font-semibold tracking-tight text-white">
        Send it to a customer
      </h2>
      <p className="mt-1 text-[13px] leading-snug text-white">
        They pick a slot that suits them and it lands straight in your diary. Nothing to install
        and no account for them to make.
      </p>

      {/* The URL itself, readable. Someone reading it out over the phone needs
          to see it, not trust that a copy button worked. */}
      <button
        type="button"
        onClick={handleCopy}
        className="mt-4 flex w-full items-center gap-3 rounded-xl border border-white/[0.12] bg-white/[0.05] px-3.5 py-3 text-left transition-colors hover:bg-white/[0.08] touch-manipulation"
      >
        <span className="min-w-0 flex-1 truncate text-[13px] text-white">{url}</span>
        <span className="shrink-0 text-[12px] font-semibold text-elec-yellow">Copy</span>
      </button>

      {/* Two-up throughout. Four across a desktop card gave each button 290px
          of width to hold the word "Email". */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        {channels.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={c.run}
            className="h-11 rounded-xl border border-white/[0.12] bg-white/[0.06] text-[13.5px] font-semibold text-white transition-colors hover:bg-white/[0.10] touch-manipulation active:scale-[0.98]"
          >
            {c.label}
          </button>
        ))}
      </div>

      <button
        type="button"
        onClick={onSendToCustomer}
        className="mt-2 h-11 w-full rounded-xl bg-elec-yellow text-[14px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
      >
        Send to a saved customer
      </button>

      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 border-t border-white/[0.1] pt-3">
        <button
          type="button"
          onClick={onPreview}
          className="min-h-11 text-[13px] font-semibold text-elec-yellow transition-opacity hover:opacity-80 touch-manipulation"
        >
          Preview as a client
        </button>
        <button
          type="button"
          onClick={() => setShowQr((v) => !v)}
          className="min-h-11 text-[13px] font-semibold text-elec-yellow transition-opacity hover:opacity-80 touch-manipulation"
        >
          {showQr ? 'Hide QR code' : 'Show QR code'}
        </button>
        <button
          type="button"
          onClick={handleCopyMessage}
          className="min-h-11 text-[13px] font-semibold text-elec-yellow transition-opacity hover:opacity-80 touch-manipulation"
        >
          Copy the message
        </button>
      </div>

      {showQr && (
        <div className="mt-1 flex flex-col items-center gap-3 border-t border-white/[0.1] pt-4">
          {/* White plate behind the code — scanners need the quiet zone and the
              contrast, and this page is dark. */}
          <div className="rounded-2xl bg-white p-4">
            <QRCodeSVG value={url} size={176} level="M" />
          </div>
          <p className="max-w-xs text-center text-[12px] leading-snug text-white">
            For the van, a business card or holding up on the doorstep. It points at the same
            link.
          </p>
        </div>
      )}
    </section>
  );
};

export default BookingLinkCard;
