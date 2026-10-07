/**
 * PublicPageShell — the landing page's design (v4 "Volt", src/pages/LandingPage.tsx)
 * for the pages people reach from a link someone sent them:
 * /witness/:token, /assessor-invite/:token, and the /assessor workspace.
 *
 * Same top bar (logo + wordmark, 76rem column, hairline under a blurred bar),
 * same eyebrow / headline type, same card material with the volt hairline, same
 * tall primary button. Volt rules: no decorative icons; volt is a solid fill, a
 * line or text, never a translucent wash; all text is white.
 */
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { CARD_SURFACE } from '@/components/ui/card-recipe';

export const PUBLIC_PRIMARY_CTA =
  'inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-elec-yellow px-8 text-[16px] font-bold text-black ' +
  'touch-manipulation transition-transform hover:bg-[hsl(47_100%_60%)] active:scale-[0.98] ' +
  // Disabled is neutral, not faded yellow: yellow at low opacity reads brown on the dark ground.
  'disabled:cursor-not-allowed disabled:bg-white/[0.08] disabled:text-white disabled:hover:bg-white/[0.08] disabled:active:scale-100';
export const PUBLIC_SECONDARY_CTA =
  'inline-flex h-14 w-full items-center justify-center gap-2 rounded-2xl border border-white/[0.22] px-8 text-[16px] font-semibold text-white ' +
  'touch-manipulation transition-colors hover:border-white/[0.4] active:scale-[0.98]';

export const PublicEyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-elec-yellow">
    {children}
  </p>
);

export const PublicH1 = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h1
    className={cn(
      'mt-3 text-[32px] font-bold leading-[1.05] tracking-[-0.03em] text-white sm:text-[44px]',
      className
    )}
  >
    {children}
  </h1>
);

export const PublicLead = ({ children }: { children: React.ReactNode }) => (
  <p className="mt-4 text-[17px] leading-[1.55] text-white">{children}</p>
);

/** The landing card: lit gradient surface, gold edge, volt hairline across the top. */
export const PublicCard = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div
    className={cn(
      'relative overflow-hidden rounded-2xl border border-elec-yellow/35 p-5 sm:p-6',
      CARD_SURFACE,
      className
    )}
  >
    <span
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/55 to-elec-yellow/0"
    />
    {children}
  </div>
);

export function PublicPageShell({
  children,
  width = 'narrow',
  right,
  homeTo = '/',
}: {
  children: React.ReactNode;
  /** narrow = a form or a message (40rem); wide = a workspace (76rem, as the landing). */
  width?: 'narrow' | 'wide';
  /** Optional controls on the right of the top bar. */
  right?: React.ReactNode;
  /** Where the logo goes. The assessor workspace keeps people inside it. */
  homeTo?: string;
}) {
  return (
    <div className="flex min-h-[100svh] flex-col bg-background text-white">
      <nav className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-background/90 pt-[env(safe-area-inset-top)] backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-[76rem] items-center justify-between px-5 lg:h-16 lg:px-8">
          <Link to={homeTo} className="flex h-11 items-center gap-2.5 touch-manipulation">
            <img src="/logo.jpg" alt="" className="h-8 w-8 rounded-lg lg:h-9 lg:w-9" />
            <span className="text-[17px] font-bold tracking-tight lg:text-[19px]">
              Elec-<span className="text-elec-yellow">Mate</span>
            </span>
          </Link>
          {right ? <div className="flex items-center gap-1 sm:gap-3">{right}</div> : null}
        </div>
      </nav>

      <main
        className={cn(
          'mx-auto w-full flex-1 px-5 pb-16 pt-[calc(env(safe-area-inset-top)+5.5rem)] lg:px-8 lg:pt-28',
          width === 'narrow' ? 'max-w-[40rem]' : 'max-w-[76rem]'
        )}
      >
        {children}
      </main>

      <footer className="border-t border-white/[0.08] px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] lg:px-8">
        <div className="mx-auto flex max-w-[76rem] flex-col gap-2 text-[13px] text-white sm:flex-row sm:items-center sm:justify-between">
          <p>Elec-Mate · the platform for UK electricians and apprentices</p>
          <div className="flex gap-4">
            <Link
              to="/privacy"
              className="inline-flex h-11 items-center touch-manipulation hover:text-elec-yellow"
            >
              Privacy
            </Link>
            <Link
              to="/terms"
              className="inline-flex h-11 items-center touch-manipulation hover:text-elec-yellow"
            >
              Terms
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default PublicPageShell;
