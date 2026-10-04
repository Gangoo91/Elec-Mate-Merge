/**
 * The frame every sign-in / sign-up screen sits in (4 Oct 2026).
 *
 * Desktop: a full-height split — brand panel on the left (headline, user
 * count, two app screens running off the bottom), the form column on the
 * right. Phones: one column with a slim top bar, the form on the ground (no
 * bands, no boxes) and the primary action in the thumb zone.
 *
 * Replaces the certificate header on these screens: Back · title · tabs is the
 * right shell inside a cert, but on the first screen someone sees it read as
 * a form inside a form. Steps show as a thin volt progress line instead.
 *
 * No icons. Volt is a solid fill, a line or text — never a translucent wash.
 */
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useUserCount } from '@/hooks/useUserCount';

type Back = string | (() => void);

const BackControl = ({ back, className }: { back: Back; className?: string }) => {
  const cls = cn(
    '-ml-2 inline-flex h-11 items-center px-2 text-[14px] font-semibold text-white touch-manipulation active:opacity-70',
    className
  );
  return typeof back === 'string' ? (
    <Link to={back} className={cls}>
      Back
    </Link>
  ) : (
    <button type="button" onClick={back} className={cls}>
      Back
    </button>
  );
};

const Wordmark = ({ size = 'sm' }: { size?: 'sm' | 'lg' }) => (
  <Link to="/" className="inline-flex h-11 items-center gap-2.5 touch-manipulation">
    <img
      src="/logo.jpg"
      alt=""
      className={cn('object-cover', size === 'lg' ? 'h-10 w-10 rounded-xl' : 'h-8 w-8 rounded-lg')}
    />
    <span
      className={cn(
        'font-bold tracking-tight text-white',
        size === 'lg' ? 'text-[20px]' : 'text-[17px]'
      )}
    >
      Elec-<span className="text-elec-yellow">Mate</span>
    </span>
  </Link>
);

const Hairline = ({ className }: { className?: string }) => (
  <span
    aria-hidden
    className={cn(
      'pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/55 to-elec-yellow/0',
      className
    )}
  />
);

/** Page title inside the frame — the one big line on the screen. */
export const AuthHeading = ({ title, sub }: { title: ReactNode; sub?: ReactNode }) => (
  <div>
    <h1 className="text-[30px] font-bold leading-[1.08] tracking-[-0.03em] text-white lg:text-[34px]">
      {title}
    </h1>
    {sub && <p className="mt-2 text-[15px] leading-relaxed text-white">{sub}</p>}
  </div>
);

export const AuthFrame = ({
  panel,
  back,
  step,
  children,
  footer,
}: {
  /** Desktop brand panel copy. Defaults to the returning-user line. */
  panel?: { headline: ReactNode; sub?: ReactNode };
  /** Shown top-left. Without it the top bar carries the wordmark (phones). */
  back?: Back;
  /** 0-based step and total — drawn as a segmented progress line. */
  step?: { current: number; total: number };
  children: ReactNode;
  /** A ShellFooter: fixed in the thumb zone on phones, inline on desktop. */
  footer?: ReactNode;
}) => {
  const userCount = useUserCount();
  const headline = panel?.headline ?? (
    <>
      Your jobs, certificates and quotes,{' '}
      <span className="text-elec-yellow">right where you left them.</span>
    </>
  );
  const sub = panel?.sub ?? `${userCount} electricians and apprentices run their work on Elec-Mate.`;

  return (
    <div className="min-h-[100svh] bg-background text-white lg:grid lg:grid-cols-2">
      {/* Desktop brand panel. Sticky so a long form scrolls past it, not with it. */}
      <aside className="relative hidden overflow-hidden border-r border-white/[0.08] bg-[hsl(0_0%_8%)] lg:sticky lg:top-0 lg:flex lg:h-[100svh] lg:flex-col">
        <Hairline />
        <div className="relative z-10 mx-auto w-full max-w-[560px] px-2 pt-12">
          <Wordmark size="lg" />
          <h2 className="mt-16 max-w-[27rem] text-[44px] font-bold leading-[1.04] tracking-[-0.035em] text-white xl:text-[48px]">
            {headline}
          </h2>
          <p className="mt-5 max-w-[25rem] text-[15px] leading-relaxed text-white">{sub}</p>
        </div>
        {/* Fixed height, not vh: a vh box shrank under the phones on a short
            window and they rode up over the headline. Too short a window and
            they go altogether. */}
        <div
          aria-hidden
          className="pointer-events-none relative mx-auto mt-auto h-[360px] w-full max-w-[560px] shrink-0 [@media(max-height:820px)]:hidden"
        >
          <img
            src="/images/auth/app-elec-ai.webp"
            alt=""
            width={600}
            height={1051}
            className="absolute bottom-[-130px] left-[-2%] w-[250px] -rotate-6 xl:w-[270px]"
          />
          <img
            src="/images/auth/app-inspection.webp"
            alt=""
            width={600}
            height={985}
            className="absolute bottom-[-106px] left-[42%] w-[270px] rotate-[5deg] drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)] xl:w-[290px]"
          />
        </div>
      </aside>

      <main className="relative flex min-h-[100svh] flex-col px-5 pb-[max(1.25rem,env(safe-area-inset-bottom))] pt-[max(0.75rem,env(safe-area-inset-top))] lg:px-12 lg:py-10">
        <Hairline className="lg:hidden" />

        {/* Top bar */}
        <div className="mx-auto flex h-11 w-full max-w-[440px] items-center justify-between">
          {back ? (
            <BackControl back={back} />
          ) : (
            <span className="lg:invisible">
              <Wordmark />
            </span>
          )}
          {step ? (
            <span className="text-[13px] font-semibold tabular-nums text-white">
              Step {step.current + 1} of {step.total}
            </span>
          ) : (
            <Link
              to="/"
              className="-mr-2 inline-flex h-11 items-center px-2 text-[13px] font-semibold text-white touch-manipulation"
            >
              <span className="lg:hidden">elec-mate.com</span>
              <span className="hidden lg:inline">Back to elec-mate.com</span>
            </Link>
          )}
        </div>

        {step && (
          <div
            className="mx-auto mt-2 flex w-full max-w-[440px] gap-1.5"
            role="progressbar"
            aria-valuemin={1}
            aria-valuemax={step.total}
            aria-valuenow={step.current + 1}
            aria-label="Sign-up progress"
          >
            {Array.from({ length: step.total }, (_, i) => (
              <span
                key={i}
                className={cn(
                  'h-[3px] flex-1 rounded-full transition-colors duration-300',
                  i <= step.current ? 'bg-elec-yellow' : 'bg-white/[0.12]'
                )}
              />
            ))}
          </div>
        )}

        <div className="mx-auto flex w-full max-w-[440px] flex-1 flex-col pt-8 lg:justify-center lg:pt-10">
          {children}
          {footer}
        </div>
      </main>
    </div>
  );
};
