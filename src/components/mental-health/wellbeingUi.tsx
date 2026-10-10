/**
 * The Wellbeing pages' shared look (10 Oct 2026), built on the College Hub
 * kit so the area reads like the rest of the app on a phone: edge-to-edge
 * cards, sentence-case labels (no spaced capitals), names that wrap instead
 * of being cut, outlined call buttons with a 44px target. Red is kept for the
 * lines you ring when you are not safe; nothing uses translucent yellow.
 */
import type { ReactNode } from 'react';
import { Phone, Send, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { COLLEGE_CARD, COLLEGE_LIST } from '@/components/college/ui/CollegeUi';

export const WB_CARD = COLLEGE_CARD;
export const WB_LIST = COLLEGE_LIST;

/** The top of a wellbeing section: a sentence-case label, a title and one sentence. */
export function WellbeingIntro({
  label,
  title,
  description,
  tone = 'yellow',
}: {
  label: string;
  title: string;
  description?: ReactNode;
  tone?: 'yellow' | 'red';
}) {
  return (
    <header className="min-w-0">
      <p
        className={cn(
          'text-[13px] font-semibold',
          tone === 'red' ? 'text-red-300' : 'text-elec-yellow'
        )}
      >
        {label}
      </p>
      <h2 className="mt-1.5 text-[26px] font-bold leading-tight tracking-tight text-white sm:text-[30px]">
        {title}
      </h2>
      {description && (
        <p className="mt-2 max-w-3xl text-[14.5px] leading-relaxed text-white">{description}</p>
      )}
    </header>
  );
}

/** A section: a plain white heading, an optional line under it, then the content. */
export function WellbeingSection({
  title,
  sub,
  children,
  className,
}: {
  title: string;
  sub?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={cn('space-y-3', className)}>
      <div>
        <h3 className="text-[17px] font-semibold tracking-tight text-white">{title}</h3>
        {sub && <p className="mt-0.5 max-w-3xl text-[13.5px] leading-snug text-white">{sub}</p>}
      </div>
      {children}
    </section>
  );
}

/**
 * One contact in a list: the name on its own line (wraps, never cut), the
 * detail under it, and the call or visit button under that on a phone (beside
 * the words from sm: up) so a long number never squeezes the name.
 */
export function ContactRow({
  title,
  detail,
  action,
}: {
  title: string;
  detail?: ReactNode;
  action?: ReactNode;
}) {
  return (
    <li className="flex flex-col items-start gap-2.5 px-5 py-4 sm:flex-row sm:items-center sm:gap-3 sm:px-6 sm:py-3.5">
      <div className="min-w-0 sm:flex-1">
        <p className="text-[15px] font-semibold leading-snug text-white">{title}</p>
        {detail && <p className="mt-0.5 text-[13px] leading-snug text-white">{detail}</p>}
      </div>
      {action && <div className="sm:shrink-0">{action}</div>}
    </li>
  );
}

/**
 * A call / text / visit button. `urgent` (999, Samaritans, crisis lines) is
 * red-outlined; everything else is the neutral outlined button.
 */
export function ContactButton({
  href,
  label,
  ariaLabel,
  kind = 'call',
  urgent = false,
  onClick,
  className,
}: {
  href: string;
  label: string;
  ariaLabel?: string;
  kind?: 'call' | 'text' | 'visit';
  urgent?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const Icon = kind === 'text' ? Send : kind === 'visit' ? ExternalLink : Phone;
  return (
    <a
      href={href}
      onClick={onClick}
      aria-label={ariaLabel}
      {...(kind === 'visit' ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={cn(
        'inline-flex h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border px-3.5 text-[13.5px] font-semibold tabular-nums transition-colors touch-manipulation active:bg-white/[0.06]',
        urgent
          ? 'border-red-400/50 text-red-300 hover:border-red-400'
          : 'border-white/[0.14] text-white hover:border-white/[0.35]',
        className
      )}
    >
      <Icon className="h-4 w-4 shrink-0" strokeWidth={1.5} aria-hidden />
      {label}
    </a>
  );
}

/** A short note in a card; `red` gives it the crisis edge colour. */
export function WellbeingNote({
  tone = 'plain',
  children,
}: {
  tone?: 'plain' | 'red';
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        WB_CARD,
        'text-[14px] leading-relaxed text-white',
        tone === 'red' && '!border-red-400/40'
      )}
    >
      {children}
    </div>
  );
}
