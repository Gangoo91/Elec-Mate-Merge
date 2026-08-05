import React from 'react';
import { REFERENCE_TABLES, TEST_SEQUENCE } from '@/data/itLearningPath';

/**
 * The On-site surface — ELE I&T hub redesign.
 *
 * A different job from the Learn path, so a different design. Someone reading
 * this is stood at a board with gloves on, checking one number. So: no prose,
 * no search box, no navigation. Every table is on the screen at once, because
 * scrolling past four tables is faster than typing into a search field with
 * one thumb — and it still works when you already know roughly where to look.
 *
 * Values are bigger than the Learn path uses and set in tabular figures, so a
 * column of readings can be scanned rather than read.
 *
 * All numbers come from `itLearningPath`, whose Zs limits are derived from
 * `@/data/zsLimits` — the same table the certificate validates against. A
 * reference that can disagree with the cert is worse than no reference.
 */

const cardCn =
  '-mx-4 rounded-none border-y border-white/[0.14] sm:mx-0 sm:rounded-2xl sm:border-x ' +
  'bg-gradient-to-b from-white/[0.08] to-white/[0.04]';

export const OnSiteReference: React.FC = () => {
  return (
    <div className="space-y-6 px-4 py-4">
      {/* The sequence as a strip — the one thing people forget mid-job is
          which test comes next, and it costs almost no room to answer that. */}
      <section className={`${cardCn} p-4 sm:p-5`}>
        <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">Test order</h2>
        <ol className="flex flex-wrap gap-1.5">
          {TEST_SEQUENCE.map((step) => (
            <li
              key={step.key}
              className={`flex items-center gap-1.5 rounded-lg border px-2 py-1.5 ${
                step.phase === 'dead'
                  ? 'border-white/[0.14] bg-white/[0.06]'
                  : 'border-elec-yellow/30 bg-elec-yellow/10'
              }`}
            >
              <span className="text-[12px] font-semibold tabular-nums text-white">
                {step.order}
              </span>
              <span className="text-[12px] text-white">{step.short}</span>
            </li>
          ))}
        </ol>
        <p className="mt-2 text-[11px] text-white">
          Plain = dead tests · highlighted = live tests. BS 7671 Reg 643.
        </p>
      </section>

      {REFERENCE_TABLES.map((table) => (
        <section key={table.key}>
          <h2 className="mb-3 text-[15px] font-semibold tracking-tight text-white">
            {table.title}
          </h2>
          <div className={cardCn}>
            <div className="divide-y divide-white/[0.08]">
              {table.rows.map((row) => (
                <div
                  key={row.label}
                  className="flex min-h-[3rem] items-center justify-between gap-4 px-4 py-3"
                >
                  <span className="text-[14px] text-white">{row.label}</span>
                  {/* Bigger than body text on purpose — this is the thing
                      being looked up, at arm's length, in bad light. */}
                  <span className="text-[17px] font-semibold tabular-nums text-white">
                    {row.value}
                  </span>
                </div>
              ))}
            </div>
            <p className="border-t border-white/[0.08] px-4 py-2.5 text-[11px] text-white">
              {table.source}
            </p>
          </div>
        </section>
      ))}

      <p className="pb-2 text-[12px] leading-relaxed text-white">
        Figures are the published limits. Site conditions, conductor temperature and the
        device's own manufacturer data still apply — measure, don't assume.
      </p>
    </div>
  );
};

export default OnSiteReference;
