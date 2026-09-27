/**
 * ReferralRaceCard — the Referral Race promo, shown at the top of the main,
 * electrician and apprentice dashboards.
 *
 * Not gated on account age: the existing <BringAMate> block only rendered in a
 * user's first 7 days, which is why almost nobody has ever seen a referral
 * prompt. This one runs for everyone, for the whole campaign window, and
 * disappears on its own afterwards.
 *
 * August 2026 ran this same card and produced 12 referrals in the month —
 * a third of every referral the product has ever had.
 *
 * 🔴 Dismissal is deliberately TEMPORARY. August's card could not be closed at
 * all; this one can, but it returns after a week. A permanent dismissal would
 * quietly undo the campaign — most people tap the X on their first visit, and
 * the race would then run to a fraction of the audience while still promising
 * a £100 prize.
 *
 * Opens the existing <ReferralShareSheet>, so the code / link / QR / reward
 * plumbing is unchanged.
 */
import { useState } from 'react';
import { ArrowRight, X } from 'lucide-react';
import ReferralShareSheet from '@/components/referrals/ReferralShareSheet';
import { storageGetSync, storageSetSync } from '@/utils/storage';

/**
 * Campaign window — inclusive of both days, local time.
 *
 * The race runs from the day it goes live until the end of October, and every
 * referral inside that window counts toward the £100. Deliberately NOT "just
 * October": the card is up now, so anyone who refers this week must be in the
 * running. Promising a prize for a month that hasn't started, on a card people
 * can already act on, is how you end up arguing about it in November.
 */
const RACE_START = new Date('2026-09-27T00:00:00');
const RACE_END = new Date('2026-10-31T23:59:59');

/** Keyed to the campaign so a dismissal never carries into the next one. */
const DISMISS_KEY = 'elec-mate-referral-race-dismissed-2026-10';
const DISMISS_DAYS = 7;

function isReferralRaceLive(now: Date = new Date()): boolean {
  return now >= RACE_START && now <= RACE_END;
}

/**
 * Reads the stored dismissal. The value is the epoch ms at which the card is
 * allowed back. Anything unparseable is treated as "not dismissed" rather than
 * hiding the card forever on a bad write.
 */
function isCurrentlyDismissed(now: number = Date.now()): boolean {
  const raw = storageGetSync(DISMISS_KEY);
  if (!raw) return false;
  const showAgainAt = Number(raw);
  return Number.isFinite(showAgainAt) && now < showAgainAt;
}

export function ReferralRaceCard() {
  const [shareOpen, setShareOpen] = useState(false);
  const [dismissed, setDismissed] = useState(() => isCurrentlyDismissed());

  if (!isReferralRaceLive()) return null;
  if (dismissed) return null;

  const handleDismiss = () => {
    storageSetSync(DISMISS_KEY, String(Date.now() + DISMISS_DAYS * 24 * 60 * 60 * 1000));
    setDismissed(true);
  };

  return (
    <>
      <section
        className="relative -mx-4 mb-4 rounded-none border-y border-elec-yellow/25 bg-gradient-to-br from-elec-yellow/[0.11] via-white/[0.04] to-transparent p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5"
        aria-labelledby="referral-race-heading"
      >
        {/* 44px target, kept clear of the heading's right edge on mobile. */}
        <button
          type="button"
          onClick={handleDismiss}
          aria-label="Hide this for a week"
          className="absolute right-2 top-2 flex h-11 w-11 touch-manipulation items-center justify-center rounded-xl text-white/70 transition-colors hover:bg-white/[0.08] hover:text-white"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Single column on phones; splits into message + action from lg up.
            Stacked full-width on a 1,100px dashboard left the right 60% of the
            card empty and stretched a one-line panel across the whole width,
            which read as a layout bug rather than a promo. */}
        <div className="lg:flex lg:items-center lg:gap-10">
          <div className="min-w-0 lg:flex-1">
            <p className="pr-12 text-[10px] font-semibold uppercase tracking-[0.14em] text-elec-yellow lg:pr-0">
              {/* "Ends 31 Oct", not "31 October": with the padding that keeps
                  this clear of the close button, the long form wrapped onto a
                  second line at 320px. The headline underneath carries the
                  full date anyway. */}
              Referral Race · ends 31 Oct
            </p>

            {/* The £100 is the hook, so it leads and it is part of the heading
                rather than a decorative numeral floated to the right. The old
                layout hid it below `xs:` to stop the headline wrapping, which
                meant the one number that sells this vanished on the narrowest
                phones — exactly the devices most of these users are on. */}
            <h2 id="referral-race-heading" className="mt-2">
              <span className="block text-[42px] font-extrabold leading-none tracking-[-0.03em] text-elec-yellow [font-variant-numeric:tabular-nums] sm:text-[52px]">
                £100
              </span>
              <span className="mt-1.5 block text-[17px] font-bold leading-tight tracking-tight text-white sm:text-[19px]">
                to whoever refers the most by 31 October.
              </span>
            </h2>

            <p className="mt-3 max-w-[54ch] text-[13px] leading-snug text-white">
              And every mate who subscribes is{' '}
              <span className="font-semibold">a free month for both of you</span> — win or not.
            </p>
          </div>

          {/* Action column. Capped so the one-line panel never stretches. */}
          <div className="mt-4 lg:mt-0 lg:w-[320px] lg:shrink-0">
            {/* £100 on its own reads as a lottery. A real, named, low number
                tells people it is winnable — last month it took four.
                Beatable is more motivating than big. */}
            <div className="rounded-xl border border-white/[0.14] bg-black/25 px-3.5 py-2.5">
              <p className="text-[13px] leading-snug text-white">
                Last month's winner took it with{' '}
                <span className="font-semibold text-elec-yellow">4 sign-ups</span>. That's the bar.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setShareOpen(true)}
              className="mt-3 inline-flex h-11 w-full touch-manipulation items-center justify-center gap-1.5 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-opacity hover:opacity-90"
            >
              Get your link
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      <ReferralShareSheet
        open={shareOpen}
        onOpenChange={setShareOpen}
        headline="Refer your mates — £100 cash for the winner"
        subline="Last month's winner took it with 4 sign-ups. Every mate who subscribes is a free month for both of you. Race ends 31 October."
        context="referral_race_october"
      />
    </>
  );
}

export default ReferralRaceCard;
