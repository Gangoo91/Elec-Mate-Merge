import { ChevronRight } from 'lucide-react';
import { PORTAL_LINKS } from '@/utils/portalLinks';
import { openExternalUrl } from '@/utils/open-external-url';

interface RegisteredUserGuideProps {
  showNiceic: boolean;
  showNapit: boolean;
}

export const RegisteredUserGuide = ({ showNiceic, showNapit }: RegisteredUserGuideProps) => {
  return (
    <div className="space-y-3">
      {/* Main card */}
      <div className="relative overflow-hidden card-surface-interactive rounded-2xl">
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500 via-emerald-400 to-green-400 opacity-50" />
        <div className="relative z-10 p-4">
          {/* Header */}
          <div className="flex items-center gap-2.5 mb-3">
            <h3 className="text-[15px] font-bold text-white">Scheme Member</h3>
            <span className="text-[10px] font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/15">
              Verified
            </span>
          </div>
          <p className="text-[12px] text-white mb-4">
            Self-certify and submit directly through your scheme portal
          </p>

          {/* Benefits */}
          <div className="grid grid-cols-2 gap-2 mb-4">
            <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 text-center">
              <p className="text-xs font-medium text-white">No Building Control fees</p>
            </div>
            <div className="rounded-xl bg-white/[0.04] border border-white/[0.06] px-3 py-2.5 text-center">
              <p className="text-xs font-medium text-white">Submit within 30 days</p>
            </div>
          </div>

          {/* Portal links */}
          <div className="border-b border-white/[0.06] pb-1 mb-3">
            <div className="h-[2px] w-full rounded-full bg-gradient-to-r from-blue-500/40 to-blue-500/10 mb-2" />
            <p className="text-xs font-medium text-white uppercase tracking-wider">Open Your Scheme Portal</p>
          </div>

          <div className="space-y-2">
            {(showNapit || (!showNiceic && !showNapit)) && (
              <button
                onClick={() => openExternalUrl(PORTAL_LINKS.napit.url)}
                className="group w-full relative overflow-hidden card-surface-interactive rounded-xl active:scale-[0.98] transition-all touch-manipulation text-left"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-blue-500 via-blue-400 to-cyan-400 opacity-30 group-hover:opacity-80 transition-opacity" />
                <div className="relative z-10 flex items-center justify-between p-3.5">
                  <div>
                    <span className="text-sm font-semibold text-white block group-hover:text-elec-yellow transition-colors">NAPIT Direct</span>
                    <span className="text-[11px] text-white">Certification Portal</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all">
                    <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </button>
            )}

            {(showNiceic || (!showNiceic && !showNapit)) && (
              <button
                onClick={() => openExternalUrl(PORTAL_LINKS.niceic.url)}
                className="group w-full relative overflow-hidden card-surface-interactive rounded-xl active:scale-[0.98] transition-all touch-manipulation text-left"
              >
                <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-yellow-500 via-amber-400 to-orange-400 opacity-30 group-hover:opacity-80 transition-opacity" />
                <div className="relative z-10 flex items-center justify-between p-3.5">
                  <div>
                    <span className="text-sm font-semibold text-white block group-hover:text-elec-yellow transition-colors">NICEIC Online</span>
                    <span className="text-[11px] text-white">Certification Portal</span>
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white/[0.05] border border-elec-yellow/20 flex items-center justify-center group-hover:bg-elec-yellow group-hover:border-elec-yellow transition-all">
                    <ChevronRight className="w-3.5 h-3.5 text-white group-hover:text-black group-hover:translate-x-0.5 transition-all" />
                  </div>
                </div>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Scheme badges */}
      {(showNiceic || showNapit) && (
        <div className="flex items-center justify-center gap-2">
          {showNapit && (
            <span className="text-[10px] font-bold text-blue-400 px-2.5 py-1 rounded bg-blue-500/15">
              NAPIT Registered
            </span>
          )}
          {showNiceic && (
            <span className="text-[10px] font-bold text-yellow-400 px-2.5 py-1 rounded bg-yellow-500/15">
              NICEIC Registered
            </span>
          )}
        </div>
      )}
    </div>
  );
};
