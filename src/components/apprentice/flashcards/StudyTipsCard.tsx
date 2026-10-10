/**
 * "How to study" on the flashcards page (10 Oct 2026 redesign): today's tip,
 * readable at a glance, and the rest one tap away. No eyebrow caps, no
 * yellow edge — a quiet panel at the foot of the page.
 */
import { useState } from 'react';

const tips = [
  'Study 10 to 15 minutes a day. Little and often beats cramming.',
  'Say the answer to yourself before you turn the card. Recalling it is what makes it stick.',
  'Be honest with "Not yet". Those cards come back sooner, which is the point.',
  'Review what’s due before starting a new deck.',
  'Mix decks up: switching topics helps you remember more than one deck in a row.',
  'Link a card to a job you’ve done. A real board or a real fault is easier to remember.',
  'Study at the same time each day to build the habit.',
  'Spend extra time on the cards you keep missing.',
  'Somewhere quiet, phone on silent, ten minutes. That’s a session.',
];

const StudyTipsCard = () => {
  const [open, setOpen] = useState(false);
  const today = new Date().getDate() % tips.length;

  return (
    <section className="space-y-3" aria-labelledby="fc-tips">
      <h2 id="fc-tips" className="text-[18px] font-bold tracking-tight text-white sm:text-[20px]">
        How to study
      </h2>
      <div className="rounded-2xl border border-white/[0.1] bg-white/[0.03] p-5">
        <p className="text-[12.5px] font-medium text-white">Today’s tip</p>
        <p className="mt-1 text-[16px] font-semibold leading-snug text-white">{tips[today]}</p>
        {open && (
          <ol className="mt-4 space-y-2.5 border-t border-white/[0.08] pt-4">
            {tips.map((t, i) =>
              i === today ? null : (
                <li key={t} className="flex gap-3 text-[14px] leading-snug text-white">
                  <span className="w-4 shrink-0 font-semibold tabular-nums">{i + 1}</span>
                  <span>{t}</span>
                </li>
              )
            )}
          </ol>
        )}
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          className="mt-3 h-11 text-[13.5px] font-semibold text-white underline-offset-4 touch-manipulation hover:underline"
        >
          {open ? 'Show fewer' : `All ${tips.length} tips`}
        </button>
      </div>
    </section>
  );
};

export default StudyTipsCard;
