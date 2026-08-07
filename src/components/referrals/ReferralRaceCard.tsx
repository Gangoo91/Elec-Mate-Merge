/**
 * ReferralRaceCard — the August Referral Race promo, shown at the top of the
 * main, electrician and apprentice dashboards.
 *
 * Deliberately NOT dismissible and not gated on account age: the existing
 * <BringAMate> block only rendered in a user's first 7 days, which is why
 * almost nobody has ever seen a referral prompt. This one runs for everyone,
 * for the whole campaign window, and disappears on its own afterwards.
 *
 * Opens the existing <ReferralShareSheet>, so the code / link / QR / reward
 * plumbing is unchanged.
 */
import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import ReferralShareSheet from '@/components/referrals/ReferralShareSheet';

/** Campaign window — inclusive of both days, local time. */
const RACE_START = new Date('2026-08-01T00:00:00');
const RACE_END = new Date('2026-08-31T23:59:59');

function isReferralRaceLive(now: Date = new Date()): boolean {
  return now >= RACE_START && now <= RACE_END;
}

export function ReferralRaceCard() {
  const [shareOpen, setShareOpen] = useState(false);

  if (!isReferralRaceLive()) return null;

  return (
    <>
      <section
        className="-mx-4 mb-4 rounded-none border-y border-elec-yellow/25 bg-gradient-to-br from-elec-yellow/[0.11] via-white/[0.04] to-transparent p-4 sm:mx-0 sm:rounded-2xl sm:border-x sm:p-5"
        aria-labelledby="referral-race-heading"
      >
        {/* One row, vertically centred: the £100 used to sit in a top row of
            its own, which left a block of dead space beneath it on desktop. */}
        <div className="flex items-center gap-4 sm:gap-8">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-elec-yellow">
              1–31 August · Referral Race
            </p>

            <h2
              id="referral-race-heading"
              className="mt-2 text-[19px] font-bold leading-tight tracking-tight text-white sm:text-[21px]"
            >
              Refer your mates.
            </h2>

            <p className="mt-1 text-[14px] leading-snug text-white">
              Most referrals this month takes{' '}
              <span className="font-semibold text-elec-yellow">£100 cash</span>, paid to your bank.
            </p>

            <p className="mt-3 border-t border-white/10 pt-3 text-[13px] leading-snug text-white">
              Can't win? Can't lose. Every mate who subscribes is{' '}
              <span className="font-semibold">a free month for both of you</span> — as many as you
              refer, prize or no prize.
            </p>

            <button
              type="button"
              onClick={() => setShareOpen(true)}
              className="mt-4 inline-flex h-11 w-full touch-manipulation items-center justify-center gap-1.5 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-opacity hover:opacity-90 sm:w-auto sm:px-6"
            >
              Get your link
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          {/* Carries the message at a glance. Hidden on the narrowest screens
              so the headline never wraps awkwardly. */}
          <div
            aria-hidden="true"
            className="hidden shrink-0 text-[46px] font-extrabold leading-none tracking-[-0.04em] text-elec-yellow [font-variant-numeric:tabular-nums] xs:block sm:text-[64px]"
          >
            £100
          </div>
        </div>
      </section>

      <ReferralShareSheet
        open={shareOpen}
        onOpenChange={setShareOpen}
        headline="Refer your mates — £100 cash for the winner"
        subline="Every mate who subscribes is a free month for both of you. Race ends 31 August."
        context="referral_race_august"
      />
    </>
  );
}

export default ReferralRaceCard;
