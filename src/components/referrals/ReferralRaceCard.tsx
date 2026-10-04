/**
 * ReferralRaceCard — the October 2026 referral push, shown at the top of the
 * main, electrician and apprentice dashboards.
 *
 * Mechanic (Andrew, 4 Oct 2026, and the email that went to 298 paying
 * electricians the same day): share your link, you are in the £100 draw at the
 * end of the month. A friend who subscribes is a free month for both of you.
 * It is a DRAW, not a race — the card and the email must say the same thing.
 *
 * The card does the whole job inline: the person's own link, a copy button and
 * a WhatsApp button. Nobody should have to go looking for their link.
 *
 * Dismissal is deliberately TEMPORARY (returns after a week). A permanent
 * dismissal would quietly undo the campaign on first sight.
 *
 * Full card the first visit, slim strip after (Andrew, 4 Oct 2026). On a phone
 * the full card is ~400px — most of the first screen — and it sat above the
 * home layout people had just customised ("diary first" landed halfway down).
 * The strip keeps the draw in view; one tap opens the full card.
 */
import { useState } from 'react';
import { X } from 'lucide-react';
import ReferralShareSheet from '@/components/referrals/ReferralShareSheet';
import { useReferralShare } from '@/hooks/useReferralShare';
import { storageGetSync, storageSetSync } from '@/utils/storage';
import { cn } from '@/lib/utils';

/** Campaign window — inclusive of both days, local time. */
const RACE_START = new Date('2026-09-27T00:00:00');
const RACE_END = new Date('2026-10-31T23:59:59');

/** Keyed to the campaign so a dismissal never carries into the next one. */
const DISMISS_KEY = 'elec-mate-referral-race-dismissed-2026-10';
const DISMISS_DAYS = 7;

function isReferralRaceLive(now: Date = new Date()): boolean {
  return now >= RACE_START && now <= RACE_END;
}

function isCurrentlyDismissed(now: number = Date.now()): boolean {
  const raw = storageGetSync(DISMISS_KEY);
  if (!raw) return false;
  const showAgainAt = Number(raw);
  return Number.isFinite(showAgainAt) && now < showAgainAt;
}

/** Per-device: when this campaign's full card was first shown. */
const SEEN_KEY = 'elec-mate-referral-race-seen-2026-10';
/** Per-tab: keep the full card for the rest of the session it was first seen in. */
const FULL_THIS_SESSION_KEY = 'elec-mate-referral-race-full-session';

/**
 * Full on first sight (and for the rest of that session), compact after.
 * Storage can throw in private mode — then it behaves as first sight, which is
 * the safe direction for a campaign.
 */
function startsCompact(): boolean {
  try {
    if (!storageGetSync(SEEN_KEY)) {
      storageSetSync(SEEN_KEY, String(Date.now()));
      window.sessionStorage.setItem(FULL_THIS_SESSION_KEY, '1');
      return false;
    }
    return window.sessionStorage.getItem(FULL_THIS_SESSION_KEY) !== '1';
  } catch {
    return false;
  }
}

/** The link without the scheme, which is what people recognise and what fits on a phone. */
function displayUrl(url: string | null): string {
  return (url ?? '').replace(/^https?:\/\/(www\.)?/, '');
}

export function ReferralRaceCard() {
  const [sheetOpen, setSheetOpen] = useState(false);
  const [dismissed, setDismissed] = useState(() => isCurrentlyDismissed());
  const [copied, setCopied] = useState(false);
  const [compact, setCompact] = useState(startsCompact);
  const { referralUrl, isLoading, copyLink, shareViaWhatsApp } = useReferralShare({
    context: 'referral_draw_october',
  });

  if (!isReferralRaceLive()) return null;
  if (dismissed) return null;

  const handleDismiss = () => {
    storageSetSync(DISMISS_KEY, String(Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000));
    setDismissed(true);
  };

  if (compact) {
    const daysLeft = Math.max(1, Math.ceil((RACE_END.getTime() - Date.now()) / 86_400_000));
    return (
      // A div, not a button: the Share button inside it is its own control, and
      // a button inside a button is invalid. The expand target is the whole
      // text area, which is a button of its own.
      <div className="-mx-4 mb-4 flex items-center gap-3 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] py-3 pl-4 pr-3 sm:mx-0 sm:rounded-2xl sm:border-x">
        <button
          type="button"
          onClick={() => setCompact(false)}
          aria-label="£100 October draw — open for your link and more ways to share"
          className="flex min-h-[56px] min-w-0 flex-1 touch-manipulation items-center gap-3 text-left"
        >
          <span className="shrink-0 text-[26px] font-extrabold leading-none tracking-[-0.03em] text-elec-yellow [font-variant-numeric:tabular-nums]">
            £100
          </span>
          <span className="min-w-0">
            <span className="block text-[14.5px] font-semibold leading-snug text-white">
              October draw — share your link and you're in
            </span>
            <span className="mt-0.5 block text-[12.5px] leading-snug text-white">
              They get a month free · {daysLeft === 1 ? 'last day' : `${daysLeft} days left`}
            </span>
          </span>
        </button>
        <button
          type="button"
          onClick={shareViaWhatsApp}
          disabled={isLoading}
          className="h-11 shrink-0 touch-manipulation rounded-xl bg-elec-yellow px-4 text-[14px] font-bold text-black transition-opacity active:opacity-90 disabled:opacity-40"
        >
          Share
        </button>
      </div>
    );
  }

  const handleCopy = async () => {
    await copyLink();
    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <section
        aria-labelledby="referral-race-heading"
        className="relative -mx-4 mb-4 rounded-none border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-6"
      >
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Hide this for a week"
          className="absolute right-2 top-2 flex h-11 w-11 touch-manipulation items-center justify-center rounded-xl text-white transition-colors hover:bg-white/[0.08]"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="lg:grid lg:grid-cols-[1fr_minmax(0,460px)] lg:items-center lg:gap-10">
          {/* The ask */}
          <div className="min-w-0">
            <p className="pr-12 text-[11px] font-semibold uppercase tracking-[0.16em] text-elec-yellow lg:pr-0">
              October · £100 draw
            </p>
            <h2 id="referral-race-heading" className="mt-2">
              <span className="block text-[44px] font-extrabold leading-none tracking-[-0.035em] text-elec-yellow [font-variant-numeric:tabular-nums] sm:text-[56px]">
                £100
              </span>
              <span className="mt-2 block text-[17px] font-bold leading-tight tracking-tight text-white sm:text-[20px]">
                Share your link with one electrician and you're in the draw.
              </span>
            </h2>
            <p className="mt-3 max-w-[52ch] text-[14px] leading-snug text-white">
              They get their first month free. When they stay, so do you. Winner picked at random
              on 31 October from everyone who shared.
            </p>
          </div>

          {/* The link and the two ways to send it */}
          <div className="mt-5 lg:mt-0">
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
              Your link
            </p>
            <div className="mt-2 flex h-12 items-center rounded-xl border border-white/[0.14] bg-black/30 px-4">
              <span
                className={cn(
                  'min-w-0 flex-1 truncate font-mono text-[14px] text-white',
                  isLoading && 'opacity-40'
                )}
              >
                {isLoading ? 'Loading your link…' : displayUrl(referralUrl)}
              </span>
            </div>
            <div className="mt-3 grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={shareViaWhatsApp}
                disabled={isLoading}
                className="inline-flex h-12 touch-manipulation items-center justify-center rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                Send on WhatsApp
              </button>
              <button
                type="button"
                onClick={handleCopy}
                disabled={isLoading}
                className="inline-flex h-12 touch-manipulation items-center justify-center rounded-xl border border-white/[0.18] bg-white/[0.06] text-[15px] font-semibold text-white transition-colors hover:border-elec-yellow/60 disabled:opacity-40"
              >
                {copied ? 'Copied' : 'Copy link'}
              </button>
            </div>
            <button
              type="button"
              onClick={() => setSheetOpen(true)}
              className="mt-3 h-11 w-full touch-manipulation text-[13px] font-medium text-white underline underline-offset-4 hover:text-elec-yellow"
            >
              QR code and other ways to share
            </button>
          </div>
        </div>
      </section>

      <ReferralShareSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        headline="Share Elec-Mate, you're in the £100 draw"
        subline="Every share this month is an entry. A friend who subscribes is a free month for both of you. Draw on 31 October."
        context="referral_draw_october"
      />
    </>
  );
}

export default ReferralRaceCard;
