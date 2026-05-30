import { ArrowUpRight } from 'lucide-react';
import { PORTAL_LINKS } from '@/utils/portalLinks';
import { openExternalUrl } from '@/utils/open-external-url';
import { cn } from '@/lib/utils';

interface RegisteredUserGuideProps {
  showNiceic: boolean;
  showNapit: boolean;
}

// Editorial portal row — accent dot + name, single yellow "Open ↗" (external).
const PortalRow = ({
  name,
  dot,
  onClick,
}: {
  name: string;
  dot: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="group flex w-full items-center justify-between gap-3 p-3.5 bg-[hsl(0_0%_13%)] text-left transition-colors touch-manipulation hover:bg-elec-yellow/[0.05] active:bg-white/[0.05] focus:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-elec-yellow/50"
  >
    <div className="flex items-center gap-2.5 min-w-0">
      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', dot)} aria-hidden />
      <div className="min-w-0">
        <span className="block text-sm font-semibold text-white truncate group-hover:text-elec-yellow transition-colors">
          {name}
        </span>
        <span className="text-[11px] text-white/45">Certification Portal</span>
      </div>
    </div>
    <span className="inline-flex items-center gap-1 text-[12px] font-medium text-elec-yellow shrink-0">
      Open
      <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </span>
  </button>
);

export const RegisteredUserGuide = ({ showNiceic, showNapit }: RegisteredUserGuideProps) => {
  const showNapitRow = showNapit || (!showNiceic && !showNapit);
  const showNiceicRow = showNiceic || (!showNiceic && !showNapit);

  return (
    <div className="space-y-3">
      {/* Main card */}
      <div className="relative border border-white/[0.14] rounded-2xl overflow-hidden bg-[hsl(0_0%_11%)]">
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-elec-yellow/0 via-elec-yellow/60 to-elec-yellow/0 pointer-events-none z-10" />
        <div className="p-4 sm:p-5">
          {/* Header — status dot + title + verified badge */}
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" aria-hidden />
              <h3 className="text-[18px] font-semibold tracking-tight text-white truncate">
                Scheme Member
              </h3>
            </div>
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-emerald-400 border border-emerald-400/30 rounded px-1.5 py-0.5 shrink-0">
              Verified
            </span>
          </div>
          <p className="mt-2 text-[12.5px] leading-relaxed text-white/55">
            Self-certify and submit directly through your scheme portal
          </p>

          {/* Benefits */}
          <div className="mt-4 grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-white/[0.12] bg-white/[0.03] px-3 py-2.5 text-center">
              <p className="text-[11.5px] font-medium text-white/70">No Building Control fees</p>
            </div>
            <div className="rounded-lg border border-white/[0.12] bg-white/[0.03] px-3 py-2.5 text-center">
              <p className="text-[11.5px] font-medium text-white/70">Submit within 30 days</p>
            </div>
          </div>

          {/* Portal links */}
          <p className="mt-5 mb-2.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-white/45">
            Open your scheme portal
          </p>
          <div className="relative border border-white/[0.12] rounded-xl overflow-hidden divide-y divide-white/[0.12]">
            {showNapitRow && (
              <PortalRow
                name="NAPIT Direct"
                dot="bg-blue-400"
                onClick={() => openExternalUrl(PORTAL_LINKS.napit.url)}
              />
            )}
            {showNiceicRow && (
              <PortalRow
                name="NICEIC Online"
                dot="bg-amber-400"
                onClick={() => openExternalUrl(PORTAL_LINKS.niceic.url)}
              />
            )}
          </div>
        </div>
      </div>

      {/* Scheme badges */}
      {(showNiceic || showNapit) && (
        <div className="flex items-center justify-center gap-2">
          {showNapit && (
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/50 border border-white/[0.12] rounded px-2 py-0.5">
              NAPIT Registered
            </span>
          )}
          {showNiceic && (
            <span className="text-[9px] font-semibold uppercase tracking-[0.14em] text-white/50 border border-white/[0.12] rounded px-2 py-0.5">
              NICEIC Registered
            </span>
          )}
        </div>
      )}
    </div>
  );
};
