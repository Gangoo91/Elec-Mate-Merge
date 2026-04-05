import { Shield, ChevronRight } from 'lucide-react';
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
      <div className="group relative overflow-hidden card-surface">
        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-emerald-500 via-green-400 to-teal-400 opacity-50" />

        <div className="p-5 sm:p-6">
          {/* Header */}
          <div className="flex items-start gap-4 mb-5">
            <div className="p-3 sm:p-3.5 rounded-2xl bg-green-500/10 border border-green-500/20 flex-shrink-0">
              <Shield className="h-6 w-6 sm:h-7 sm:w-7 text-green-400" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 mb-1">
                <h3 className="text-lg font-semibold text-white">Scheme Member</h3>
                <span className="text-[11px] font-semibold text-green-400 px-2.5 py-1 rounded-full bg-green-500/12 border border-green-500/20">
                  Verified
                </span>
              </div>
              <p className="text-sm text-white">
                Self-certify and submit directly through your scheme portal
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid grid-cols-2 gap-2.5 mb-6">
            <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/6 px-4 py-3 text-center">
              <p className="text-sm font-medium text-white">No Building Control fees</p>
            </div>
            <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/6 px-4 py-3 text-center">
              <p className="text-sm font-medium text-white">Submit within 30 days</p>
            </div>
          </div>

          {/* Portal links */}
          <p className="text-xs font-medium text-white uppercase tracking-wider mb-3 px-0.5">
            Open Your Scheme Portal
          </p>

          <div className="space-y-2.5">
            {showNapit && (
              <button
                onClick={() => openExternalUrl(PORTAL_LINKS.napit.url)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-blue-500/8 border border-blue-500/20 hover:bg-blue-500/14 hover:border-blue-500/30 transition-all touch-manipulation active:scale-[0.98] group/btn"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-white">N</span>
                  </div>
                  <div className="text-left">
                    <span className="text-[15px] font-semibold text-white block">NAPIT Direct</span>
                    <span className="text-xs text-white">Certification Portal</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-blue-500/20 flex items-center justify-center group-hover/btn:bg-blue-500 group-hover/btn:border-blue-500 transition-all">
                  <ChevronRight className="w-4 h-4 text-white group-hover/btn:translate-x-0.5 transition-transform" />
                </div>
              </button>
            )}

            {showNiceic && (
              <button
                onClick={() => openExternalUrl(PORTAL_LINKS.niceic.url)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-yellow-500/8 border border-yellow-500/20 hover:bg-yellow-500/14 hover:border-yellow-500/30 transition-all touch-manipulation active:scale-[0.98] group/btn"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm font-bold text-black">N</span>
                  </div>
                  <div className="text-left">
                    <span className="text-[15px] font-semibold text-white block">NICEIC Online</span>
                    <span className="text-xs text-white">Certification Portal</span>
                  </div>
                </div>
                <div className="w-8 h-8 rounded-full bg-white/[0.05] border border-yellow-500/20 flex items-center justify-center group-hover/btn:bg-yellow-500 group-hover/btn:border-yellow-500 transition-all">
                  <ChevronRight className="w-4 h-4 text-white group-hover/btn:text-black group-hover/btn:translate-x-0.5 transition-all" />
                </div>
              </button>
            )}

            {!showNiceic && !showNapit && (
              <>
                <button
                  onClick={() => openExternalUrl(PORTAL_LINKS.napit.url)}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-blue-500/8 border border-blue-500/20 hover:bg-blue-500/14 transition-all touch-manipulation active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-white">N</span>
                    </div>
                    <div className="text-left">
                      <span className="text-[15px] font-semibold text-white block">NAPIT Direct</span>
                      <span className="text-xs text-white">Certification Portal</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => openExternalUrl(PORTAL_LINKS.niceic.url)}
                  className="w-full flex items-center justify-between p-4 rounded-xl bg-yellow-500/8 border border-yellow-500/20 hover:bg-yellow-500/14 transition-all touch-manipulation active:scale-[0.98]"
                >
                  <div className="flex items-center gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-black">N</span>
                    </div>
                    <div className="text-left">
                      <span className="text-[15px] font-semibold text-white block">NICEIC Online</span>
                      <span className="text-xs text-white">Certification Portal</span>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-white" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Scheme badges */}
      {(showNiceic || showNapit) && (
        <div className="flex items-center justify-center gap-2.5">
          {showNapit && (
            <span className="text-[11px] font-medium text-white px-3.5 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20">
              NAPIT Registered
            </span>
          )}
          {showNiceic && (
            <span className="text-[11px] font-medium text-white px-3.5 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/20">
              NICEIC Registered
            </span>
          )}
        </div>
      )}
    </div>
  );
};
