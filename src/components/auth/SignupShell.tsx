/**
 * Parts shared by the sign-in / sign-up screens. The frame itself (brand
 * panel, top bar, progress line) is AuthFrame.
 *
 * No icons. Volt is only ever a solid fill, a line or text — never a
 * translucent wash, which goes muddy brown on this ground (card-recipe.ts).
 */
import type { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import type { OfferTerms } from '@/hooks/useSignupOffer';
import { PLANS, gbp, offerPrice, dayMonth, trialEndDate, type Plan } from './signupPlans';

/**
 * A group of fields on the ground, set off by a rule. (Was a cert-form band —
 * on the auth screens the bands read as boxes in boxes; 4 Oct 2026.)
 */
export const Section = ({
  title,
  children,
  className,
}: {
  title?: string;
  children: ReactNode;
  className?: string;
}) => (
  <section className={cn('space-y-4 border-t border-white/[0.08] pt-6', className)}>
    {title && <h2 className="text-[15px] font-semibold tracking-tight text-white">{title}</h2>}
    {children}
  </section>
);

/** What they'll pay, and when — the same rows on every screen that shows them. */
export const PlanRows = ({ plan, terms }: { plan: Plan; terms: OfferTerms | null }) => {
  const p = PLANS[plan];
  const trialEnd = trialEndDate();
  const discountEnd =
    terms && terms.months
      ? new Date(new Date(trialEnd).setMonth(trialEnd.getMonth() + terms.months))
      : null;
  const rows: { k: string; v: ReactNode; volt?: boolean }[] = [
    { k: 'Today', v: '£0', volt: true },
    { k: 'Free until', v: dayMonth(trialEnd) },
    terms
      ? {
          k: terms.months ? `Then, for ${terms.months} months` : 'Then',
          v: (
            <>
              {offerPrice(plan, terms)}/mo{' '}
              <span className="font-normal line-through decoration-white/70">{gbp(p.list)}</span>
            </>
          ),
        }
      : { k: 'Then', v: `${gbp(p.list)}/mo` },
    ...(discountEnd ? [{ k: `From ${dayMonth(discountEnd)}`, v: `${gbp(p.list)}/mo` }] : []),
    { k: 'Cancel', v: 'Any time, two clicks' },
  ];
  return (
    <dl className="divide-y divide-white/[0.08] border-t border-white/[0.08]">
      {rows.map((r) => (
        <div key={r.k} className="flex items-baseline justify-between gap-4 py-2.5">
          <dt className="text-[13px] text-white">{r.k}</dt>
          <dd
            className={cn(
              'text-right text-[14px] font-semibold tabular-nums',
              r.volt ? 'text-elec-yellow' : 'text-white'
            )}
          >
            {r.v}
          </dd>
        </div>
      ))}
    </dl>
  );
};

/**
 * The action bar: fixed in the thumb zone on a phone, inline under the form
 * on desktop (a bar pinned across a split screen floats under the panel).
 */
export const ShellFooter = ({
  hidden = false,
  children,
}: {
  /** Slide away while a phone keyboard is up so it never covers a field. */
  hidden?: boolean;
  children: ReactNode;
}) => (
  <>
    <div
      className={cn(
        'fixed inset-x-0 bottom-0 z-40 border-t border-white/[0.08] bg-background/95 backdrop-blur-md transition-transform duration-200',
        'lg:static lg:z-auto lg:mt-8 lg:translate-y-0 lg:border-0 lg:bg-transparent lg:backdrop-blur-none',
        hidden && 'translate-y-full'
      )}
    >
      <div className="mx-auto flex max-w-[440px] gap-2 px-5 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 lg:max-w-none lg:p-0">
        {children}
      </div>
    </div>
    {/* Spacer so the last section clears the fixed footer */}
    <div className="h-24 lg:hidden" aria-hidden="true" />
  </>
);
