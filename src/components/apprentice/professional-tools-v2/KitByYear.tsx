import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { CARD_BASE, CARD_NEUTRAL } from '@/components/ui/card-recipe';
import { itemVariants } from '@/components/college/primitives';
import { HubSectionHeading } from '@/components/hub/HubPrimitives';
import { apprenticeBudgetGuide } from '@/data/professional-tools/suppliersData';

/**
 * What to buy, and when.
 *
 * 🔴 This is the most useful content in the guide and it was filed at the
 * bottom of chapter 06 — the chapter about where to shop.
 *
 * The rest of the guide is organised by tool type (fixings, hand, power, test,
 * PPE), which is how a CATALOGUE is arranged. An apprentice is not browsing a
 * catalogue; they are asking "what do I buy this year, and what will it cost".
 * `apprenticeBudgetGuide` answers exactly that, year by year, and told nobody.
 *
 * It also corrects the guide's own arithmetic. Summing every tool tagged
 * `essential` gives roughly £790–£2,000, which reads as a day-one shopping
 * list — while this content says Year 1 is £300–500 and that the EMPLOYER
 * should be providing power tools and test kit in the first year. Leading with
 * the total would have told a first-year to spend money they do not need to.
 */
const KitByYear = () => (
  <motion.section variants={itemVariants} className="space-y-4 sm:space-y-5">
    <HubSectionHeading>What to buy, and when</HubSectionHeading>

    <p className="max-w-3xl text-[13px] leading-relaxed text-white">
      You do not buy a full kit on day one, and you should not be asked to. This is the order most
      UK apprentices build one in — start at the year you are in.
    </p>

    <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
      {apprenticeBudgetGuide.map((phase, i) => (
        <article
          key={phase.phase}
          className={cn(CARD_BASE, CARD_NEUTRAL, 'flex flex-col gap-3 p-4 sm:p-5')}
        >
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-[15px] font-semibold leading-tight tracking-tight text-white">
              {phase.phase}
            </h3>
            <span className="whitespace-nowrap rounded-md border border-elec-yellow/45 bg-elec-yellow/10 px-2 py-0.5 font-mono text-[12px] tabular-nums text-elec-yellow">
              {phase.budget}
            </span>
          </div>

          <ul className="space-y-1.5">
            {phase.items.map((item) => (
              <li key={item} className="flex gap-2 text-[13px] leading-snug text-white">
                <span
                  aria-hidden
                  className="mt-[7px] h-1 w-1 flex-shrink-0 rounded-full bg-elec-yellow"
                />
                {item}
              </li>
            ))}
          </ul>

          {/* The advice is the part they cannot get from a price list. */}
          <div className="mt-auto rounded-lg border-y border-r border-l-[3px] border-white/[0.08] border-l-elec-yellow bg-white/[0.03] p-3">
            <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-elec-yellow">
              {i === 0 ? 'Know your rights' : 'Worth knowing'}
            </span>
            <p className="mt-1 text-[13px] leading-relaxed text-white">{phase.tip}</p>
          </div>
        </article>
      ))}
    </div>
  </motion.section>
);

export default KitByYear;
