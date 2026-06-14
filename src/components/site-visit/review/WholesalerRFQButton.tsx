/**
 * WholesalerRFQButton (ELE-1118)
 *
 * Turns the (editable, live-priced) site-visit materials list into a clean,
 * price-free Request-for-Quotation and fires it at the spark's saved
 * wholesalers — all in BCC, so the merchants quote blind and "fight for it".
 * Falls back to copy / WhatsApp / a blank-recipient email.
 *
 * No backend — contacts are RLS-scoped rows; sending uses clipboard / wa.me /
 * mailto (the user's own mail app).
 */
import { useMemo, useState } from 'react';
import { Sheet, SheetContent, SheetHeader, SheetTitle } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Store, Copy, Check, MessageSquare, Mail, Plus, X, Send } from 'lucide-react';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import { useToast } from '@/hooks/use-toast';
import { useCompanyProfile } from '@/hooks/useCompanyProfile';
import { useWholesalerContacts } from '@/hooks/useWholesalerContacts';
import { cn } from '@/lib/utils';
import type { SiteVisit } from '@/types/siteVisit';
import type { MaterialItem } from '@/types/surveyAnalysis';

interface WholesalerRFQButtonProps {
  visit: SiteVisit;
  materials: MaterialItem[];
}

function buildRfqText(materials: MaterialItem[], visit: SiteVisit, companyName: string): string {
  const lines = materials
    .filter((m) => m.description?.trim())
    .map((m) => `• ${m.quantity} ${m.unit} — ${m.description}`);

  const parts: string[] = [`Request for Quotation${companyName ? ` — ${companyName}` : ''}`];
  if (visit.propertyAddress) parts.push(`Site: ${visit.propertyAddress}`);
  parts.push(
    '',
    'Please quote your best price and availability for the following:',
    '',
    ...lines,
    '',
    'Many thanks.'
  );
  if (companyName) parts.push(companyName);
  return parts.join('\n');
}

const fieldCls =
  'h-10 rounded-lg border border-white/[0.12] bg-white/[0.05] px-3 text-[13px] text-white placeholder:text-white/40 focus:border-elec-yellow focus:outline-none focus:ring-2 focus:ring-elec-yellow/15 touch-manipulation';

export const WholesalerRFQButton = ({ visit, materials }: WholesalerRFQButtonProps) => {
  const { toast } = useToast();
  const { companyProfile } = useCompanyProfile();
  const { contacts, addContact, deleteContact } = useWholesalerContacts();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [adding, setAdding] = useState(false);

  const companyName = companyProfile?.companyName?.trim() || '';
  const rfqText = useMemo(
    () => buildRfqText(materials, visit, companyName),
    [materials, visit, companyName]
  );
  const subject = `Request for Quotation${companyName ? ` — ${companyName}` : ''}`;
  const itemCount = materials.filter((m) => m.description?.trim()).length;
  const selectedEmails = contacts.filter((c) => selected.has(c.id)).map((c) => c.email);

  const toggle = (id: string) =>
    setSelected((prev) => {
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
    const ok = await copyToClipboard(rfqText);
    if (ok) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({ title: 'RFQ copied', description: 'Paste it to any wholesaler.' });
    }
  };

  const handleWhatsApp = () =>
    openExternalUrl(`https://wa.me/?text=${encodeURIComponent(rfqText)}`);

  // BCC so merchants can't see each other — they quote blind.
  const handleEmailSelected = () => {
    if (selectedEmails.length === 0) return;
    openExternalUrl(
      `mailto:?bcc=${encodeURIComponent(selectedEmails.join(','))}&subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(rfqText)}`
    );
  };

  const handleEmailBlank = () =>
    openExternalUrl(
      `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(rfqText)}`
    );

  return (
    <>
      <Button
        onClick={() => setOpen(true)}
        disabled={itemCount === 0}
        variant="outline"
        className="h-11 flex-1 touch-manipulation rounded-xl border-white/[0.15] bg-white/[0.04] text-[13px] font-medium text-white transition-transform hover:bg-white/[0.08] active:scale-[0.98] disabled:opacity-50"
      >
        <Store className="mr-2 h-4 w-4" />
        Wholesaler RFQ
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent
          side="bottom"
          className="flex h-[88vh] flex-col overflow-hidden rounded-t-2xl border-white/[0.08] bg-elec-dark p-0 lg:left-64"
        >
          <SheetHeader className="border-b border-white/[0.06] px-5 pb-3 pt-5">
            <SheetTitle className="text-left text-white">Request wholesaler quotes</SheetTitle>
            <p className="text-left text-[12px] text-white/60">
              {itemCount} item{itemCount !== 1 ? 's' : ''} · price-free, sent BCC so they quote
              their best
            </p>
          </SheetHeader>

          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-4">
            {/* Wholesaler picker */}
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-white/55">
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
                        className="flex flex-1 items-center gap-2.5 text-left touch-manipulation"
                      >
                        <span
                          className={cn(
                            'flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border',
                            on
                              ? 'border-elec-yellow bg-elec-yellow text-black'
                              : 'border-white/30 bg-white/[0.04]'
                          )}
                        >
                          {on && <Check className="h-3.5 w-3.5" />}
                        </span>
                        <span className="min-w-0">
                          <span className="block truncate text-[13px] text-white">
                            {c.name || c.email}
                          </span>
                          {c.name && (
                            <span className="block truncate text-[11px] text-white/50">
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
                        className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg text-white/40 hover:text-red-400 active:bg-white/[0.06] touch-manipulation"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  );
                })}
                {contacts.length === 0 && (
                  <p className="text-[12px] text-white/50">
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
                  className="h-10 touch-manipulation rounded-lg border-white/[0.15] bg-white/[0.04] px-3 text-[13px] text-white active:scale-[0.98] disabled:opacity-50"
                >
                  <Plus className="mr-1 h-4 w-4" />
                  Add
                </Button>
              </div>
            </div>

            {/* RFQ preview */}
            <div>
              <p className="mb-2 text-[11px] font-medium uppercase tracking-wider text-white/55">
                Preview
              </p>
              <pre className="whitespace-pre-wrap break-words rounded-xl border border-white/[0.08] bg-white/[0.03] p-3.5 font-sans text-[12.5px] leading-relaxed text-white/85">
                {rfqText}
              </pre>
            </div>
          </div>

          {/* Footer actions */}
          <div className="space-y-2 border-t border-white/[0.06] px-5 py-4 pb-[max(1rem,env(safe-area-inset-bottom))]">
            <Button
              onClick={handleEmailSelected}
              disabled={selectedEmails.length === 0}
              className="h-12 w-full touch-manipulation rounded-xl bg-elec-yellow text-[14px] font-semibold text-black hover:bg-elec-yellow/90 active:scale-[0.98] disabled:opacity-40"
            >
              <Send className="mr-2 h-4 w-4" />
              {selectedEmails.length > 0
                ? `Email ${selectedEmails.length} wholesaler${selectedEmails.length !== 1 ? 's' : ''} (BCC)`
                : 'Select wholesalers to email'}
            </Button>
            <div className="grid grid-cols-3 gap-2">
              <Button
                onClick={handleCopy}
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
              <Button
                onClick={handleWhatsApp}
                variant="outline"
                className="h-11 touch-manipulation flex-col gap-0.5 rounded-xl border-white/[0.15] bg-white/[0.04] text-[11px] font-medium text-white active:scale-[0.98]"
              >
                <MessageSquare className="h-4 w-4" />
                WhatsApp
              </Button>
              <Button
                onClick={handleEmailBlank}
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
    </>
  );
};

export default WholesalerRFQButton;
