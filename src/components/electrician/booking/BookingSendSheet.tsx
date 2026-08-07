import { useMemo, useState } from 'react';
import { Sheet, SheetContent } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { inputCn } from '@/components/forms/fieldStyles';
import { toast } from '@/hooks/use-toast';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import { useCustomers, type Customer } from '@/hooks/useCustomers';
import { bookingMessage, mailtoUrl, smsUrl, whatsappUrl } from './bookingMessage';

interface BookingSendSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  url: string;
  businessName?: string | null;
}

/**
 * Send the booking link to someone already on the books.
 *
 * Saves the round trip of copying a link, opening WhatsApp, finding the
 * customer and pasting — the number and the address are already stored.
 * Customers with neither a phone nor an email still appear, greyed of their
 * channels rather than hidden, so it is obvious why they cannot be sent to.
 */
const BookingSendSheet = ({ open, onOpenChange, url, businessName }: BookingSendSheetProps) => {
  const { customers, isLoading } = useCustomers();
  const [query, setQuery] = useState('');

  const matches = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = q
      ? customers.filter(
          (c) =>
            c.name.toLowerCase().includes(q) ||
            c.phone?.toLowerCase().includes(q) ||
            c.email?.toLowerCase().includes(q)
        )
      : customers;
    return [...list].sort((a, b) => a.name.localeCompare(b.name));
  }, [customers, query]);

  const send = (
    customer: Customer,
    channel: 'whatsapp' | 'email' | 'text'
  ) => {
    const parts = { url, businessName, clientName: customer.name };
    if (channel === 'whatsapp') openExternalUrl(whatsappUrl(parts, customer.phone));
    if (channel === 'email') openExternalUrl(mailtoUrl(parts, customer.email));
    if (channel === 'text') openExternalUrl(smsUrl(parts, customer.phone));
    onOpenChange(false);
  };

  const copyFor = async (customer: Customer) => {
    const ok = await copyToClipboard(
      bookingMessage({ url, businessName, clientName: customer.name })
    );
    toast(ok ? { title: `Message for ${customer.name} copied` } : { title: 'Could not copy' });
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="bottom" className="h-[85vh] overflow-hidden rounded-t-2xl p-0">
        <div className="flex h-full flex-col bg-background">
          <header className="shrink-0 px-4 pb-3 pt-5 sm:px-6">
            <h2 className="text-[19px] font-semibold tracking-tight text-white">
              Send your booking link
            </h2>
            <p className="mt-1 text-[13px] leading-snug text-white">
              Pick a customer and it fills in their number or address for you.
            </p>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search your customers"
              className={cn(inputCn, 'mt-3')}
            />
          </header>

          <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-8 sm:px-6">
            {isLoading && <p className="py-8 text-center text-[13px] text-white">Loading…</p>}

            {!isLoading && matches.length === 0 && (
              <p className="py-8 text-center text-[13px] leading-snug text-white">
                {customers.length === 0
                  ? 'No customers saved yet. You can still send the link from the buttons on the page.'
                  : 'No customer matches that.'}
              </p>
            )}

            <div className="divide-y divide-white/[0.08]">
              {matches.map((c) => {
                const hasPhone = !!c.phone?.trim();
                const hasEmail = !!c.email?.trim();
                return (
                  <div key={c.id} className="py-3.5">
                    <p className="truncate text-[15px] font-semibold tracking-tight text-white">
                      {c.name}
                    </p>
                    <p className="mt-0.5 truncate text-[12px] text-white">
                      {[c.phone, c.email].filter(Boolean).join(' · ') || 'No phone or email saved'}
                    </p>

                    <div className="mt-2.5 flex flex-wrap gap-2">
                      {hasPhone && (
                        <button
                          type="button"
                          onClick={() => send(c, 'whatsapp')}
                          className="h-10 rounded-lg border border-white/[0.12] bg-white/[0.06] px-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.10] touch-manipulation"
                        >
                          WhatsApp
                        </button>
                      )}
                      {hasEmail && (
                        <button
                          type="button"
                          onClick={() => send(c, 'email')}
                          className="h-10 rounded-lg border border-white/[0.12] bg-white/[0.06] px-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.10] touch-manipulation"
                        >
                          Email
                        </button>
                      )}
                      {hasPhone && (
                        <button
                          type="button"
                          onClick={() => send(c, 'text')}
                          className="h-10 rounded-lg border border-white/[0.12] bg-white/[0.06] px-3.5 text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.10] touch-manipulation"
                        >
                          Text
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => copyFor(c)}
                        className="h-10 rounded-lg px-3 text-[13px] font-semibold text-elec-yellow transition-opacity hover:opacity-80 touch-manipulation"
                      >
                        Copy message
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default BookingSendSheet;
