import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, ExternalLink, Mail, MessageCircle, QrCode, Share2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from '@/hooks/use-toast';
import { copyToClipboard } from '@/utils/clipboard';
import { openExternalUrl } from '@/utils/open-external-url';
import { shareContent } from '@/utils/share';
import {
  ListCard,
  ListCardHeader,
  Pill,
  PrimaryButton,
  SecondaryButton,
  DestructiveButton,
  Eyebrow,
  LoadingBlocks,
  type Tone,
} from '@/components/employer/editorial';
import {
  portalUrl,
  useCustomerPortal,
  useEnsurePortalLink,
  useManagePortalLink,
  type CustomerPortalLink,
  type PortalAction,
} from '@/hooks/useCustomerPortal';

/* ==========================================================================
   PortalShareCard: on the client record. One private page per client with
   their jobs, who is coming, certificates, quotes, invoices with Pay now and
   a message thread. The office creates it once, then copies, shares, shows a
   QR code, pauses, renews or switches it off.
   ========================================================================== */

const EXPIRY_CHOICES: { label: string; days: number | null }[] = [
  { label: 'No expiry', days: null },
  { label: '30 days', days: 30 },
  { label: '90 days', days: 90 },
  { label: '1 year', days: 365 },
];

const shortDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '';

function linkState(link: CustomerPortalLink | null): { label: string; tone: Tone } {
  if (!link) return { label: 'Not shared yet', tone: 'amber' };
  if (link.expired) return { label: 'Expired', tone: 'red' };
  if (!link.is_active) return { label: 'Paused', tone: 'amber' };
  return { label: 'Live', tone: 'emerald' };
}

/** "Mrs Patel" stays whole; "John Smith" becomes "John". */
const firstName = (name: string) => {
  const parts = name.trim().split(/\s+/);
  return /^(mr|mrs|ms|miss|dr|mx)\.?$/i.test(parts[0] || '') ? name.trim() : parts[0] || name;
};

/** Whole-number day difference used to show which expiry chip is current. */
function currentExpiryDays(link: CustomerPortalLink): number | null | 'custom' {
  if (!link.expires_at) return null;
  const days = Math.round((new Date(link.expires_at).getTime() - Date.now()) / 86_400_000);
  const match = EXPIRY_CHOICES.find((c) => c.days !== null && Math.abs(c.days - days) <= 1);
  return match ? match.days : 'custom';
}

interface PortalShareCardProps {
  customerId: string;
  customerName: string;
  customerEmail?: string | null;
  customerPhone?: string | null;
}

export function PortalShareCard({
  customerId,
  customerName,
  customerEmail,
  customerPhone,
}: PortalShareCardProps) {
  const { data, isLoading, isError, refetch } = useCustomerPortal(customerId);
  const ensure = useEnsurePortalLink(customerId);
  const manage = useManagePortalLink(customerId);
  const [showQr, setShowQr] = useState(false);
  const [confirmOff, setConfirmOff] = useState(false);
  const [confirmNew, setConfirmNew] = useState(false);

  const link = data?.link ?? null;
  const state = linkState(link);
  const url = link ? portalUrl(link.token) : '';
  const busy = ensure.isPending || manage.isPending;

  const fail = (e: unknown) =>
    toast({
      title: 'That did not work',
      description: e instanceof Error ? e.message : 'Please try again.',
      variant: 'destructive',
    });

  const run = async (action: PortalAction, extra?: { days?: number | null; via?: string }) => {
    if (!link) return;
    try {
      await manage.mutateAsync({ linkId: link.id, action, ...extra });
      return true;
    } catch (e) {
      fail(e);
      return false;
    }
  };

  const create = async () => {
    try {
      await ensure.mutateAsync(null);
      toast({ title: 'Portal link ready', description: 'Copy it or send it to your client.' });
    } catch (e) {
      fail(e);
    }
  };

  const message = `Hi ${firstName(customerName)}, this is your own page with us. It shows your jobs and who is coming, your certificates and invoices, and you can message us from it: ${url}`;

  const copy = async () => {
    const ok = await copyToClipboard(url);
    toast({ title: ok ? 'Link copied' : 'Could not copy the link' });
    if (ok) void run('shared', { via: 'copy' });
  };

  const share = async () => {
    const outcome = await shareContent({ title: 'Your page with us', text: message, url });
    if (outcome === 'copied') toast({ title: 'Link copied' });
    if (outcome === 'shared' || outcome === 'copied') void run('shared', { via: 'share' });
  };

  const whatsapp = () => {
    const digits = (customerPhone || '').replace(/[^\d+]/g, '').replace(/^0/, '+44');
    void openExternalUrl(
      `https://wa.me/${digits.replace(/^\+/, '')}?text=${encodeURIComponent(message)}`
    );
    void run('shared', { via: 'whatsapp' });
  };

  const email = () => {
    if (!customerEmail) return;
    void openExternalUrl(
      `mailto:${customerEmail}?subject=${encodeURIComponent('Your jobs, certificates and invoices')}&body=${encodeURIComponent(message)}`
    );
    void run('shared', { via: 'email' });
  };

  const expiryNow = link ? currentExpiryDays(link) : null;

  return (
    <ListCard>
      <ListCardHeader
        tone="blue"
        title="Client portal"
        meta={<Pill tone={state.tone}>{state.label}</Pill>}
      />

      {isLoading ? (
        <div className="p-4">
          <LoadingBlocks />
        </div>
      ) : isError ? (
        <div className="p-4 sm:p-5 space-y-3">
          <p className="text-[13px] text-white">Could not load the portal for this client.</p>
          <SecondaryButton onClick={() => refetch()}>Try again</SecondaryButton>
        </div>
      ) : !link ? (
        <div className="p-4 sm:p-5 space-y-4">
          <p className="text-[13px] leading-relaxed text-white">
            One private page for {(customerName ?? '').trim()}. It shows their jobs and dates, who is coming on
            the day (first names, only for staff who have said yes), certificates to download,
            quotes to accept, invoices with Pay now, and a message thread with you. They do not
            need an account.
          </p>
          <PrimaryButton onClick={create} disabled={busy} fullWidth>
            {ensure.isPending ? 'Creating…' : 'Create portal link'}
          </PrimaryButton>
        </div>
      ) : (
        <div className="p-4 sm:p-5 space-y-5">
          {/* The link itself */}
          <div className="space-y-2">
            <Eyebrow>Their link</Eyebrow>
            <div className="rounded-xl border border-white/[0.1] bg-white/[0.04] px-3 py-2.5">
              <p className="font-mono text-[12px] text-white break-all leading-relaxed">{url}</p>
            </div>
            <p className="text-[12px] text-white">
              {link.views > 0
                ? `Opened ${link.views} time${link.views === 1 ? '' : 's'}, last ${shortDate(link.last_opened_at)}`
                : 'Not opened yet'}
              {link.last_shared_at ? ` · Shared ${shortDate(link.last_shared_at)}` : ''}
              {link.expires_at
                ? ` · ${link.expired ? 'Expired' : 'Expires'} ${shortDate(link.expires_at)}`
                : ''}
            </p>
          </div>

          {!link.usable && (
            <div className="rounded-xl border border-orange-500/30 bg-orange-500/10 px-3 py-2.5 text-[12.5px] text-orange-300">
              {link.expired
                ? 'This link has expired. Choose a new expiry below to open it again.'
                : 'This link is paused. Your client sees a "paused" page until you turn it back on.'}
            </div>
          )}

          {/* Share */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            <SecondaryButton onClick={copy} fullWidth>
              <Copy className="h-4 w-4 mr-1.5" />
              Copy
            </SecondaryButton>
            <SecondaryButton onClick={share} fullWidth>
              <Share2 className="h-4 w-4 mr-1.5" />
              Share
            </SecondaryButton>
            <SecondaryButton onClick={() => setShowQr((v) => !v)} fullWidth>
              <QrCode className="h-4 w-4 mr-1.5" />
              {showQr ? 'Hide QR' : 'QR code'}
            </SecondaryButton>
            <SecondaryButton onClick={() => window.open(url, '_blank', 'noopener')} fullWidth>
              <ExternalLink className="h-4 w-4 mr-1.5" />
              Preview
            </SecondaryButton>
            <SecondaryButton onClick={whatsapp} disabled={!customerPhone} fullWidth>
              <MessageCircle className="h-4 w-4 mr-1.5" />
              WhatsApp
            </SecondaryButton>
            <SecondaryButton onClick={email} disabled={!customerEmail} fullWidth>
              <Mail className="h-4 w-4 mr-1.5" />
              Email
            </SecondaryButton>
          </div>
          {(!customerPhone || !customerEmail) && (
            <p className="text-[12px] text-white">
              {!customerPhone && !customerEmail
                ? 'Add a phone number or email to the client to send it straight from here.'
                : !customerPhone
                  ? 'Add a mobile number to send it by WhatsApp.'
                  : 'Add an email address to send it by email.'}
            </p>
          )}

          {showQr && (
            <div className="flex flex-col items-center gap-2">
              <div className="rounded-2xl bg-white p-4">
                <QRCodeSVG value={url} size={176} level="M" />
              </div>
              <p className="text-[12px] text-white text-center">
                Your client scans this with their phone camera.
              </p>
            </div>
          )}

          {/* Expiry */}
          <div className="space-y-2">
            <Eyebrow>Link lasts</Eyebrow>
            <div className="flex flex-wrap gap-2">
              {EXPIRY_CHOICES.map((c) => {
                const on = !link.expired && expiryNow === c.days;
                return (
                  <button
                    key={c.label}
                    type="button"
                    disabled={busy}
                    onClick={() => void run('expiry', { days: c.days })}
                    className={cn(
                      'h-11 px-4 rounded-full border text-[13px] touch-manipulation transition-colors',
                      on
                        ? 'bg-elec-yellow border-elec-yellow text-black font-semibold'
                        : 'bg-white/[0.06] border-white/[0.12] text-white font-medium'
                    )}
                  >
                    {c.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Manage */}
          <div className="border-t border-white/[0.08] pt-4 space-y-3">
            {confirmOff ? (
              <div className="space-y-3">
                <p className="text-[13px] text-white">
                  Switch this link off for good? It stops working straight away. Your messages
                  with {customerName} are kept, and you can create a new link later.
                </p>
                <div className="flex gap-2">
                  <SecondaryButton onClick={() => setConfirmOff(false)} fullWidth>
                    Keep it
                  </SecondaryButton>
                  <DestructiveButton
                    onClick={async () => {
                      if (await run('revoke')) {
                        setConfirmOff(false);
                        toast({ title: 'Portal link switched off' });
                      }
                    }}
                    disabled={busy}
                    fullWidth
                  >
                    Switch off
                  </DestructiveButton>
                </div>
              </div>
            ) : confirmNew ? (
              <div className="space-y-3">
                <p className="text-[13px] text-white">
                  Make a new link? The old one stops working, so use this if it was sent to the
                  wrong person. Send the new one to {customerName}.
                </p>
                <div className="flex gap-2">
                  <SecondaryButton onClick={() => setConfirmNew(false)} fullWidth>
                    Cancel
                  </SecondaryButton>
                  <PrimaryButton
                    onClick={async () => {
                      if (await run('rotate')) {
                        setConfirmNew(false);
                        toast({ title: 'New link made', description: 'The old link no longer works.' });
                      }
                    }}
                    disabled={busy}
                    fullWidth
                  >
                    Make new link
                  </PrimaryButton>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <SecondaryButton
                  onClick={() => void run(link.is_active ? 'pause' : 'resume')}
                  disabled={busy}
                  fullWidth
                >
                  {link.is_active ? 'Pause' : 'Turn back on'}
                </SecondaryButton>
                <SecondaryButton onClick={() => setConfirmNew(true)} disabled={busy} fullWidth>
                  New link
                </SecondaryButton>
                <DestructiveButton onClick={() => setConfirmOff(true)} disabled={busy} fullWidth>
                  Switch off
                </DestructiveButton>
              </div>
            )}
          </div>
        </div>
      )}
    </ListCard>
  );
}

export default PortalShareCard;
