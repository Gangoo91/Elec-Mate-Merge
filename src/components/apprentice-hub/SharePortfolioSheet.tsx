/**
 * SharePortfolioSheet (ELE-1885)
 *
 * Make and manage portfolio share links: how long a link lasts (it always
 * expires, 90 days at most), an optional PIN, who opened it and when, and
 * turning it off. The person with the link sees the evidence with photos and
 * files, the assessment record (decisions and witness statements) and
 * verified hours, read-only; anything they write is advisory.
 */

import { useState } from 'react';
import { Copy, Loader2, Share2 } from 'lucide-react';
import { FormSheet } from '@/components/forms/FormSheet';
import { cn } from '@/lib/utils';
import {
  linkToken,
  usePortfolioSharing,
  type PortfolioShare,
  type ShareExpiry,
  type ShareViewSummary,
} from '@/hooks/portfolio/usePortfolioSharing';
import { useHaptic } from '@/hooks/useHaptic';

interface SharePortfolioSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

// Every link expires; the server refuses anything past 90 days.
const EXPIRY_OPTIONS: { value: ShareExpiry; label: string }[] = [
  { value: '24h', label: '24 hours' },
  { value: '7d', label: '7 days' },
  { value: '30d', label: '30 days' },
  { value: '90d', label: '90 days' },
];

const CARD =
  '-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5';
const BTN =
  'inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-white/[0.18] px-4 text-[14px] font-semibold text-white transition-colors touch-manipulation hover:border-white/[0.4] disabled:cursor-not-allowed disabled:border-white/[0.08] disabled:text-white';
const BTN_PRIMARY =
  'inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-elec-yellow px-4 text-[15px] font-semibold text-black touch-manipulation active:scale-[0.99] disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-white';
/** A choice of 2 to 4: one joined toggle, the chosen option white. */
const SEG_GROUP =
  'flex w-full rounded-xl border border-white/[0.12] bg-white/[0.03] p-0.5 sm:inline-flex sm:w-auto';
const chip = (on: boolean) =>
  cn(
    'h-11 min-w-0 flex-1 whitespace-nowrap rounded-[10px] px-3 text-[13.5px] font-semibold transition-colors touch-manipulation sm:flex-none sm:px-4',
    on ? 'bg-white text-black' : 'text-white hover:bg-white/[0.06] active:bg-white/[0.08]'
  );
const INPUT =
  'input-underline h-11 w-full rounded-none border-0 border-b border-white/[0.15] bg-transparent px-1 font-mono text-[18px] tracking-[0.3em] text-white placeholder:text-white/70 caret-elec-yellow focus:border-elec-yellow focus:outline-none focus:ring-0 touch-manipulation';

const dayTime = (iso: string) => {
  const d = new Date(iso);
  return `${d.toLocaleDateString('en-GB', { weekday: 'short', day: 'numeric', month: 'short' })}, ${d.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })}`;
};

/** "iPhone, Safari": enough to recognise an open, nothing more. */
function deviceFrom(ua: string | null): string {
  if (!ua) return 'Unknown device';
  const device = /iPhone/.test(ua)
    ? 'iPhone'
    : /iPad/.test(ua)
      ? 'iPad'
      : /Android/.test(ua)
        ? 'Android'
        : /Macintosh|Mac OS X/.test(ua)
          ? 'Mac'
          : /Windows/.test(ua)
            ? 'Windows'
            : /Linux/.test(ua)
              ? 'Linux'
              : 'Unknown device';
  const browser = /Edg\//.test(ua)
    ? 'Edge'
    : /CriOS|Chrome\//.test(ua)
      ? 'Chrome'
      : /FxiOS|Firefox\//.test(ua)
        ? 'Firefox'
        : /Safari\//.test(ua)
          ? 'Safari'
          : null;
  return browser ? `${device}, ${browser}` : device;
}

function opensLine(v: ShareViewSummary | undefined): string {
  if (!v || v.count === 0) return 'Not opened yet';
  return `Opened ${v.count === 1 ? 'once' : `${v.count} times`}, last ${dayTime(v.last_viewed_at!)}`;
}

function expiryLine(expiresAt: string | null): string {
  if (!expiresAt) return 'No end date';
  const ms = new Date(expiresAt).getTime() - Date.now();
  if (ms <= 0) return 'Expired';
  const days = Math.ceil(ms / 86_400_000);
  if (days <= 1) return 'Ends within a day';
  return `Ends in ${days} days`;
}

export function SharePortfolioSheet({ open, onOpenChange }: SharePortfolioSheetProps) {
  const haptic = useHaptic();
  const {
    shares,
    views,
    isLoading,
    createShareLink,
    revokeShareLink,
    setSharePin,
    copyShareLink,
    getShareUrl,
  } = usePortfolioSharing();
  const [expiry, setExpiry] = useState<ShareExpiry>('7d');
  const [withPin, setWithPin] = useState(false);
  const [pin, setPin] = useState('');
  const [creating, setCreating] = useState(false);

  const pinOk = !withPin || /^[0-9]{4,8}$/.test(pin);
  const totalOpens = shares.reduce((n, s) => n + (views[s.id]?.count ?? 0), 0);

  const create = async () => {
    if (!pinOk || creating) return;
    setCreating(true);
    haptic.light();
    const made = await createShareLink({ expiresIn: expiry, pin: withPin ? pin : undefined });
    setCreating(false);
    if (made) {
      setPin('');
      setWithPin(false);
    }
  };

  return (
    <FormSheet
      open={open}
      onOpenChange={onOpenChange}
      eyebrow="Portfolio"
      title="Share your portfolio"
      description={
        shares.length === 0
          ? 'Make a link for an assessor, an employer or an end-point assessor. They read it; they cannot change it.'
          : `${shares.length} live link${shares.length === 1 ? '' : 's'}, opened ${totalOpens === 1 ? 'once' : `${totalOpens} times`} in all.`
      }
      width="wide"
      bodyClassName="space-y-8 lg:grid lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)] lg:items-start lg:gap-10 lg:space-y-0"
    >
      {/* New link */}
      <section aria-labelledby="share-new" className="space-y-5">
        <h3 id="share-new" className="text-[15px] font-semibold text-white">
          New link
        </h3>
        <fieldset>
          <legend className="mb-2 text-[12px] font-medium text-white">
            It stops working after
          </legend>
          <div className={SEG_GROUP}>
            {EXPIRY_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                aria-pressed={expiry === opt.value}
                onClick={() => {
                  haptic.light();
                  setExpiry(opt.value);
                }}
                className={chip(expiry === opt.value)}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-2 text-[12px] font-medium text-white">PIN</legend>
          <div className={SEG_GROUP}>
            <button
              type="button"
              aria-pressed={!withPin}
              onClick={() => setWithPin(false)}
              className={chip(!withPin)}
            >
              No PIN
            </button>
            <button
              type="button"
              aria-pressed={withPin}
              onClick={() => setWithPin(true)}
              className={chip(withPin)}
            >
              Add a PIN
            </button>
          </div>
          {withPin && (
            <div className="mt-3">
              <label
                htmlFor="share-pin-new"
                className="mb-1 block text-[12px] font-medium text-white"
              >
                4 to 8 numbers
              </label>
              <input
                id="share-pin-new"
                className={INPUT}
                inputMode="numeric"
                autoComplete="off"
                maxLength={8}
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
              />
              <p className="mt-2 text-[12.5px] leading-snug text-white">
                Tell them the PIN separately from the link, for example by phone. Five wrong tries
                lock the link for 15 minutes and you are told.
              </p>
            </div>
          )}
        </fieldset>

        <button
          type="button"
          onClick={() => void create()}
          disabled={creating || !pinOk}
          className={BTN_PRIMARY}
        >
          {creating && <Loader2 className="h-4 w-4 animate-spin" />}
          Create link
        </button>

        <div className="border-t border-white/[0.1] pt-4">
          <h4 className="text-[13px] font-semibold text-white">What they see</h4>
          <ul className="mt-2 space-y-1.5 text-[12.5px] leading-snug text-white">
            <li>Your evidence, with photos and files.</li>
            <li>
              Every criterion in the state your assessment record shows, with decisions and signed
              witness statements.
            </li>
            <li>Your verified off-the-job hours.</li>
            <li>Comments they leave are advisory. Nobody can pass or fail work through a link.</li>
          </ul>
        </div>
      </section>

      {/* Live links */}
      <section aria-labelledby="share-live" className="space-y-3">
        <h3 id="share-live" className="text-[15px] font-semibold text-white">
          Live links{shares.length > 0 ? ` (${shares.length})` : ''}
        </h3>

        {isLoading && shares.length === 0 && (
          <div className="flex items-center gap-2 py-6 text-[14px] text-white">
            <Loader2 className="h-4 w-4 animate-spin" /> Loading your links…
          </div>
        )}

        {!isLoading && shares.length === 0 && (
          <p className="py-4 text-[14px] text-white">No live links. Make one on the left.</p>
        )}

        <div className="space-y-3">
          {shares.map((share) => (
            <ShareLinkCard
              key={share.id}
              share={share}
              url={getShareUrl(linkToken(share))}
              views={views[share.id]}
              onCopy={() => {
                haptic.light();
                void copyShareLink(linkToken(share));
              }}
              onRevoke={() => {
                haptic.light();
                void revokeShareLink(share.id);
              }}
              onPin={(p) => setSharePin(share.id, p)}
            />
          ))}
        </div>
      </section>
    </FormSheet>
  );
}

function ShareLinkCard({
  share,
  url,
  views,
  onCopy,
  onRevoke,
  onPin,
}: {
  share: PortfolioShare;
  url: string;
  views: ShareViewSummary | undefined;
  onCopy: () => void;
  onRevoke: () => void;
  onPin: (pin: string | null) => Promise<boolean>;
}) {
  const expired = !!share.expires_at && new Date(share.expires_at) < new Date();
  const hasPin = !!share.pin_set_at;
  const [confirmOff, setConfirmOff] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [pin, setPin] = useState('');
  const [busy, setBusy] = useState(false);
  const [logOpen, setLogOpen] = useState(false);

  const share_ = async () => {
    if (navigator.share) {
      try {
        await navigator.share({ title: 'My apprenticeship portfolio', url });
        return;
      } catch (e) {
        if ((e as DOMException)?.name === 'AbortError') return;
      }
    }
    onCopy();
  };

  const savePin = async (p: string | null) => {
    setBusy(true);
    const ok = await onPin(p);
    setBusy(false);
    if (ok) {
      setPinOpen(false);
      setPin('');
    }
  };

  return (
    <article className={cn(CARD, 'space-y-3')} aria-label={share.title || 'Share link'}>
      <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
        <span
          className={cn(
            'rounded-full border px-2.5 py-0.5 text-[12px] font-semibold',
            expired ? 'border-red-400 text-red-300' : 'border-emerald-400 text-emerald-300'
          )}
        >
          {expired ? 'Expired' : 'Live'}
        </span>
        {hasPin && (
          <span className="rounded-full border border-white/[0.3] px-2.5 py-0.5 text-[12px] font-semibold text-white">
            PIN
          </span>
        )}
        <span className="text-[13px] text-white">{expiryLine(share.expires_at)}</span>
      </div>

      <p className="break-all font-mono text-[12.5px] text-white">
        {url.replace(/^https?:\/\//, '')}
      </p>

      <div>
        <button
          type="button"
          onClick={() => setLogOpen((o) => !o)}
          aria-expanded={logOpen}
          disabled={!views?.count}
          className="flex min-h-11 w-full items-center text-left text-[14px] text-white touch-manipulation"
        >
          <span className="flex-1">{opensLine(views)}</span>
          {!!views?.count && (
            <span className="text-[13px] font-semibold text-elec-yellow">
              {logOpen ? 'Hide' : 'Who opened it'}
            </span>
          )}
        </button>
        {(views?.wrong_pins ?? 0) > 0 && (
          <p className="text-[13px] font-semibold text-orange-300">
            {views!.wrong_pins} wrong PIN{views!.wrong_pins === 1 ? '' : 's'} in the last 24 hours
          </p>
        )}
        {logOpen && views && views.recent.length > 0 && (
          <ul className="mt-1 divide-y divide-white/[0.08] border-t border-white/[0.08]">
            {views.recent.map((v) => (
              <li key={v.viewed_at} className="flex items-center gap-3 py-2 text-[13px] text-white">
                <span className="flex-1">{dayTime(v.viewed_at)}</span>
                <span>{deviceFrom(v.user_agent)}</span>
              </li>
            ))}
            {views.count > views.recent.length && (
              <li className="py-2 text-[12.5px] text-white">
                And {views.count - views.recent.length} earlier.
              </li>
            )}
          </ul>
        )}
      </div>

      {pinOpen && (
        <div className="space-y-3 border-t border-white/[0.1] pt-3">
          <label htmlFor={`pin-${share.id}`} className="block text-[12px] font-medium text-white">
            {hasPin ? 'New PIN, 4 to 8 numbers' : 'PIN, 4 to 8 numbers'}
          </label>
          <input
            id={`pin-${share.id}`}
            className={INPUT}
            inputMode="numeric"
            autoComplete="off"
            maxLength={8}
            value={pin}
            onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))}
          />
          <p className="text-[12.5px] text-white">
            The link gets a new address, so a copy you sent before stops working. Send the new one.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={BTN}
              disabled={busy || !/^[0-9]{4,8}$/.test(pin)}
              onClick={() => void savePin(pin)}
            >
              {busy && <Loader2 className="h-4 w-4 animate-spin" />}
              Save PIN
            </button>
            {hasPin && (
              <button
                type="button"
                className={BTN}
                disabled={busy}
                onClick={() => void savePin(null)}
              >
                Remove PIN
              </button>
            )}
            <button type="button" className={BTN} onClick={() => setPinOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}

      {confirmOff ? (
        <div className="space-y-3 border-t border-white/[0.1] pt-3">
          <p className="text-[14px] text-white">
            Turn this link off? Anyone with it sees "This link has expired". The open log stays.
          </p>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={cn(BTN, 'border-red-400 text-red-300')}
              onClick={onRevoke}
            >
              Turn it off
            </button>
            <button type="button" className={BTN} onClick={() => setConfirmOff(false)}>
              Keep it
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 border-t border-white/[0.1] pt-3">
          <button type="button" onClick={() => void share_()} disabled={expired} className={BTN}>
            <Share2 className="h-4 w-4" /> Send
          </button>
          <button type="button" onClick={onCopy} disabled={expired} className={BTN}>
            <Copy className="h-4 w-4" /> Copy link
          </button>
          {!expired && !pinOpen && (
            <button type="button" onClick={() => setPinOpen(true)} className={BTN}>
              {hasPin ? 'Change PIN' : 'Add PIN'}
            </button>
          )}
          <button
            type="button"
            onClick={() => setConfirmOff(true)}
            className={cn(BTN, 'text-red-300')}
          >
            Turn off
          </button>
        </div>
      )}
    </article>
  );
}

export default SharePortfolioSheet;
