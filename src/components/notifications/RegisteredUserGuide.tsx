import { ArrowUpRight } from 'lucide-react';
import { PORTAL_LINKS } from '@/utils/portalLinks';
import { openExternalUrl } from '@/utils/open-external-url';
import { cn } from '@/lib/utils';

interface RegisteredUserGuideProps {
  showNiceic: boolean;
  showNapit: boolean;
}

/**
 * Compact scheme strip — states the electrician's competent-person scheme once
 * and puts the portal one tap away. Replaces the old three-part block (member
 * card + benefit chips + duplicate "registered" badge) that repeated the scheme
 * name three times and pushed the actual notifications off-screen.
 */
export const RegisteredUserGuide = ({ showNiceic, showNapit }: RegisteredUserGuideProps) => {
  // If neither flag is set we can't tell which scheme — offer both portals.
  const showBoth = !showNiceic && !showNapit;
  const portals = [
    (showNapit || showBoth) && { name: 'NAPIT', dot: 'bg-blue-400', url: PORTAL_LINKS.napit.url },
    (showNiceic || showBoth) && { name: 'NICEIC', dot: 'bg-amber-400', url: PORTAL_LINKS.niceic.url },
  ].filter(Boolean) as { name: string; dot: string; url: string }[];

  return (
    <div className="rounded-2xl border border-white/[0.09] bg-white/[0.02] p-4">
      <div className="flex items-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" aria-hidden />
        <p className="text-[13.5px] font-semibold tracking-tight text-white">
          Registered with {portals.map((p) => p.name).join(' & ')}
        </p>
      </div>
      <p className="mt-1 text-[12px] leading-relaxed text-white/75">
        Self-certify and submit directly — no Building Control fee.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {portals.map((p) => (
          <button
            key={p.name}
            onClick={() => openExternalUrl(p.url)}
            className="group inline-flex items-center gap-2 h-9 px-3.5 rounded-xl border border-white/[0.1] bg-white/[0.03] text-[13px] font-medium text-white touch-manipulation transition-colors hover:border-elec-yellow/30 hover:bg-elec-yellow/[0.05] active:scale-[0.98] focus:outline-none focus-visible:ring-1 focus-visible:ring-elec-yellow/50"
          >
            <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', p.dot)} aria-hidden />
            {p.name} portal
            <ArrowUpRight className="h-3.5 w-3.5 text-elec-yellow transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        ))}
      </div>
    </div>
  );
};
