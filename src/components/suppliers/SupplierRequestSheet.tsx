/**
 * Send a price-free materials list to merchants (ELE-1118, shared by ELE-1795).
 *
 * Pick saved wholesalers and email them all in BCC — so they quote blind and
 * "fight for it" — or copy / WhatsApp / email it from a blank message. No
 * backend: contacts are RLS-scoped rows; sending uses clipboard / wa.me /
 * mailto (the electrician's own mail app).
 *
 * Used by the site visit's "Wholesaler RFQ" and a quote's "Materials for
 * supplier". From a quote the lines can be unticked, since a hand-typed line
 * may be a call-out or a skip rather than something to buy.
 */
import { useMemo, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Copy, Check, MessageSquare, Mail, Plus, X, Send } from 'lucide-react';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import { useToast } from '@/hooks/use-toast';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useWholesalerContacts } from '@/hooks/useWholesalerContacts';
import { cn } from '@/lib/utils';
import {
  MAX_PREFILL_URL,
  supplierLineText,
  supplierRequestText,
  type SupplierLine,
} from '@/utils/supplierRequest';

// Underline fields (the form standard): the app forces placeholders to full
// white except on `input-underline`, and a boxed "wholesaler@email.com" read
// as an address already saved.
const fieldCls =
  'input-underline h-11 rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 text-base font-medium text-white caret-elec-yellow transition-colors hover:border-white/[0.3] focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation';

const Tick = ({ on }: { on: boolean }) => (
  <span
    className={cn(
      'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border',
      on ? 'border-elec-yellow bg-elec-yellow text-black' : 'border-white/30 bg-white/[0.04]'
    )}
  >
    {on && <Check className="h-3.5 w-3.5" />}
  </span>
);

export interface SupplierRequestSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  lines: SupplierLine[];
  /** Offer a tick per line (a quote); otherwise every line is sent. */
  chooseLines?: boolean;
  /** "Quote QT-0042" — so the merchant's reply can be matched up. */
  reference?: string;
  siteAddress?: string;
  title?: string;
  /** 'list' — just the materials and quantities (a quote). Default 'rfq'. */
  style?: 'list' | 'rfq';
}

export const SupplierRequestSheet = ({
  open,
  onOpenChange,
  lines,
  chooseLines = false,
  reference,
  siteAddress,
  title = 'Request wholesaler quotes',
  style = 'rfq',
}: SupplierRequestSheetProps) => {
  const { toast } = useToast();
  const { companyProfile } = useCompanyProfile();
  const { contacts, addContact, deleteContact } = useWholesalerContacts();
  const [copied, setCopied] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);
  // Lines the electrician has flipped from their default.
  const [flipped, setFlipped] = useState<Set<string>>(new Set());

  // `company_name` — the old site-visit sheet read `companyName`, which the
  // profile doesn't have, so the request never carried the firm's name.
  const companyName = companyProfile?.company_name?.trim() || '';
  const sending = useMemo(
    () => lines.filter((l) => (flipped.has(l.id) ? !l.include : l.include)),
    [lines, flipped]
  );
  const text = useMemo(
    () => supplierRequestText({ lines: sending, companyName, reference, siteAddress, style }),
    [sending, companyName, reference, siteAddress, style]
  );
  const subject = `${style === 'list' ? 'Materials list' : 'Request for Quotation'}${
    companyName ? ` — ${companyName}` : ''
  }${reference ? ` (${reference})` : ''}`;
  const selectedEmails = contacts.filter((c) => selected.has(c.id)).map((c) => c.email);
  // A quote's materials list: the lines and three ways to send them, nothing
  // else — no wholesaler picker, no preview repeating the list.
  const plain = style === 'list';
  const nothing = sending.length === 0;

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  const flip = (id: string) =>
    setFlipped((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const handleAdd = async () => {
    const email = newEmail.trim();
    if (!email || !email.includes('@')) {
      toast({ title: 'Enter a valid email', variant: 'destructive' });
      return;
    }
    setAdding(true);
    const c = await addContact(email, newName);
    setAdding(false);
    if (c) {
      setSelected((prev) => new Set(prev).add(c.id));
      setNewEmail('');
      setNewName('');
    } else {
      toast({ title: 'Could not save wholesaler', variant: 'destructive' });
    }
  };

  const handleCopy = async () => {
    const ok = await copyToClipboard(text);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: 'List copied', description: 'Paste it to any wholesaler.' });
    }
  };

  /*
   * A prefilled message rides in the URL, and mail apps and WhatsApp cut it
   * off past ~2,000 characters — a 15-line list already reaches that. Past
   * the limit the list goes on the clipboard and the app opens without it,
   * with a prompt to paste, rather than sending a merchant half a list.
   */
  const openPrefilled = async (withBody: string, withoutBody: string, where: string) => {
    if (withBody.length <= MAX_PREFILL_URL) {
      openExternalUrl(withBody);
      return;
    }
    const ok = await copyToClipboard(text);
    toast({
      title: ok ? 'List copied — paste it in' : 'List too long to fill in',
      description: ok
        ? `It's too long to fill in automatically, so paste it into the ${where}.`
        : 'Use Copy, then paste it into your message.',
    });
    if (ok) openExternalUrl(withoutBody);
  };

  const handleWhatsApp = () =>
    openPrefilled(`https://wa.me/?text=${encodeURIComponent(text)}`, 'https://wa.me/', 'message');

  // BCC so merchants can't see each other — they quote blind.
  const handleEmailSelected = () => {
    if (selectedEmails.length === 0) return;
    const head = `mailto:?bcc=${encodeURIComponent(selectedEmails.join(','))}&subject=${encodeURIComponent(subject)}`;
    return openPrefilled(`${head}&body=${encodeURIComponent(text)}`, head, 'email');
  };

  const handleEmailBlank = () => {
    const head = `mailto:?subject=${encodeURIComponent(subject)}`;
    return openPrefilled(`${head}&body=${encodeURIComponent(text)}`, head, 'email');
  };

  const groups: { kind: SupplierLine['kind']; heading: string }[] = [
    { kind: 'materials', heading: 'Materials' },
    { kind: 'equipment', heading: 'Equipment (hire) — tick only if buying' },
    { kind: 'other', heading: 'Other lines — tick any to buy' },
  ];

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex h-[85vh] flex-col overflow-hidden rounded-t-2xl border-white/[0.08] bg-elec-dark p-0 lg:left-64"
      >
        <SheetHeader className="border-b border-white/[0.06] px-5 pb-3 pt-5">
          <SheetTitle className="text-left text-white">{title}</SheetTitle>
          <p className="text-left text-[12px] text-white">
            {sending.length} item{sending.length !== 1 ? 's' : ''} ·{' '}
            {style === 'list'
              ? 'materials and quantities, no prices'
              : 'no prices, sent BCC so they quote their best'}
          </p>
        </SheetHeader>

        <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
          {/* The lines, when they can be chosen */}
          {chooseLines && (
            <div className="space-y-4">
              {groups.map(({ kind, heading }) => {
                const own = lines.filter((l) => l.kind === kind);
                if (!own.length) return null;
                return (
                  <div key={kind}>
                    {!plain && (
                      <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-white">
                        {heading}
                      </p>
                    )}
                    <div className="space-y-1.5">
                      {own.map((l) => {
                        const on = flipped.has(l.id) ? !l.include : l.include;
                        return (
                          <button
                            key={l.id}
                            type="button"
                            onClick={() => flip(l.id)}
                            aria-pressed={on}
                            className="flex min-h-11 w-full items-center gap-2.5 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2 text-left touch-manipulation"
                          >
                            <Tick on={on} />
                            <span className="min-w-0 flex-1 text-[13px] text-white">
                              {supplierLineText(l).replace(/^• /, '')}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {plain ? (
            <p className="text-[12px] text-white">
              Headed: {text.split('\n\n')[0].replace(/\n/g, ' · ')}
            </p>
          ) : (
            <>
              {/* Wholesaler picker */}
              <div>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-white">
                  Send to ({selectedEmails.length} selected)
                </p>
                <div className="space-y-1.5">
                  {contacts.map((c) => {
                    const on = selected.has(c.id);
                    return (
                      <div
                        key={c.id}
                        className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-3 py-2"
                      >
                        <button
                          type="button"
                          onClick={() => toggle(c.id)}
                          className="flex min-h-11 flex-1 items-center gap-2.5 text-left touch-manipulation"
                        >
                          <Tick on={on} />
                          <span className="min-w-0">
                            <span className="block truncate text-[13px] text-white">
                              {c.name || c.email}
                            </span>
                            {c.name && (
                              <span className="block truncate text-[11px] text-white">
                                {c.email}
                              </span>
                            )}
                          </span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelected((prev) => {
                              const n = new Set(prev);
                              n.delete(c.id);
                              return n;
                            });
                            deleteContact(c.id);
                          }}
                          aria-label="Remove wholesaler"
                          className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-lg text-white hover:text-red-400 active:bg-white/[0.06] touch-manipulation"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    );
                  })}
                  {contacts.length === 0 && (
                    <p className="text-[12px] text-white">
                      No wholesalers saved yet — add your merchant reps below.
                    </p>
                  )}
                </div>

                {/* Add wholesaler */}
                <div className="mt-2.5 flex flex-col gap-2 sm:flex-row">
                  <input
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Name (optional)"
                    className={cn(fieldCls, 'sm:w-32')}
                  />
                  <input
                    value={newEmail}
                    onChange={(e) => setNewEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                    type="email"
                    inputMode="email"
                    autoCapitalize="none"
                    placeholder="wholesaler@email.com"
                    className={cn(fieldCls, 'flex-1')}
                  />
                  <Button
                    onClick={handleAdd}
                    disabled={adding || !newEmail.trim()}
                    variant="outline"
                    className="h-11 touch-manipulation rounded-lg border-white/[0.15] bg-white/[0.04] px-3 text-[13px] text-white active:scale-[0.98] disabled:opacity-50"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add
                  </Button>
                </div>
              </div>

              {/* Preview */}
              <div>
                <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-white">
                  Preview
                </p>
                <pre className="whitespace-pre-wrap break-words rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5 font-sans text-[12.5px] leading-relaxed text-white">
                  {text}
                </pre>
              </div>
            </>
          )}
        </div>

        {/* Footer actions */}
        <div className="space-y-2 border-t border-white/[0.06] px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
          {plain ? (
            <Button
              onClick={handleCopy}
              disabled={nothing}
              className="h-12 w-full touch-manipulation rounded-xl bg-elec-yellow text-[14px] font-semibold text-black hover:bg-elec-yellow/90 active:scale-[0.98] disabled:bg-white/[0.08] disabled:text-white"
            >
              {copied ? <Check className="mr-2 h-4 w-4" /> : <Copy className="mr-2 h-4 w-4" />}
              {nothing ? 'Tick at least one item' : copied ? 'Copied' : 'Copy list'}
            </Button>
          ) : (
            <Button
              onClick={handleEmailSelected}
              disabled={selectedEmails.length === 0 || nothing}
              className="h-12 w-full touch-manipulation rounded-xl bg-elec-yellow text-[14px] font-semibold text-black hover:bg-elec-yellow/90 active:scale-[0.98] disabled:bg-white/[0.08] disabled:text-white"
            >
              <Send className="mr-2 h-4 w-4" />
              {nothing
                ? 'Tick at least one item'
                : selectedEmails.length > 0
                  ? `Email ${selectedEmails.length} wholesaler${selectedEmails.length !== 1 ? 's' : ''} (BCC)`
                  : 'Select wholesalers to email'}
            </Button>
          )}
          <div className={cn('grid gap-2', plain ? 'grid-cols-2' : 'grid-cols-3')}>
            {!plain && (
              <Button
                onClick={handleCopy}
                disabled={nothing}
                variant="outline"
                className="h-11 touch-manipulation flex-col gap-0.5 rounded-xl border-white/[0.15] bg-white/[0.04] text-[11px] font-medium text-white active:scale-[0.98]"
              >
                {copied ? (
                  <Check className="h-4 w-4 text-emerald-400" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
                {copied ? 'Copied' : 'Copy'}
              </Button>
            )}
            <Button
              onClick={handleWhatsApp}
              disabled={nothing}
              variant="outline"
              className="h-11 touch-manipulation flex-col gap-0.5 rounded-xl border-white/[0.15] bg-white/[0.04] text-[11px] font-medium text-white active:scale-[0.98]"
            >
              <MessageSquare className="h-4 w-4" />
              WhatsApp
            </Button>
            <Button
              onClick={handleEmailBlank}
              disabled={nothing}
              variant="outline"
              className="h-11 touch-manipulation flex-col gap-0.5 rounded-xl border-white/[0.15] bg-white/[0.04] text-[11px] font-medium text-white active:scale-[0.98]"
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default SupplierRequestSheet;
