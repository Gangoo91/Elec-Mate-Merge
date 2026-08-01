import { PORTAL_LINKS } from '@/utils/portalLinks';
import { openExternalUrl } from '@/utils/open-external-url';

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
    (showNapit || showBoth) && { name: 'NAPIT', url: PORTAL_LINKS.napit.url },
    (showNiceic || showBoth) && { name: 'NICEIC', url: PORTAL_LINKS.niceic.url },
  ].filter(Boolean) as { name: string; url: string }[];

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-white/[0.12] bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden />
          <p className="text-[13.5px] font-semibold tracking-tight text-white">
            Registered with {portals.map((p) => p.name).join(' & ')}
          </p>
        </div>
        <p className="mt-0.5 text-[12px] leading-relaxed text-white/60">
          Self-certify and submit directly — no Building Control fee.
        </p>
      </div>
      <div className="flex shrink-0 flex-wrap gap-2">
        {portals.map((p) => (
          <button
            key={p.name}
            onClick={() => openExternalUrl(p.url)}
            className="inline-flex h-10 items-center rounded-xl bg-elec-yellow px-4 text-[13px] font-semibold text-black touch-manipulation transition-colors hover:bg-elec-yellow/90 active:scale-[0.98]"
          >
            Open {p.name} portal
          </button>
        ))}
      </div>
    </div>
  );
};
