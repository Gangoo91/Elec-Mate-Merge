import { openExternalUrl } from '@/utils/open-external-url';

interface NonRegisteredUserGuideProps {
  onFindBuildingControl: () => void;
}

export const NonRegisteredUserGuide = ({ onFindBuildingControl }: NonRegisteredUserGuideProps) => {
  const openCouncilFinder = () => {
    openExternalUrl(
      'https://www.planningportal.co.uk/applications/building-control-applications/building-control/find-your-LABC/'
    );
  };

  return (
    <div className="space-y-3">
      {/* Main card */}
      <div className="relative overflow-hidden card-surface-interactive rounded-2xl">
        <div className="p-4 sm:p-5">
          {/* Header */}
          <div className="mb-4">
            <h3 className="text-[15px] font-bold text-white">Building Control Required</h3>
            <p className="text-[12px] text-white mt-0.5">Submit directly to your local authority</p>
          </div>

          {/* Info pills */}
          <div className="flex flex-wrap gap-2 mb-5">
            {['30 days to submit', 'Fee varies by council', 'Inspection required'].map((text) => (
              <span key={text} className="text-[11px] font-medium text-white px-2.5 py-1 rounded-full border border-white/[0.08] bg-white/[0.04]">
                {text}
              </span>
            ))}
          </div>

          {/* Steps */}
          <div className="space-y-2 mb-5">
            {[
              'Find your local authority',
              'Submit building notice',
              'Provide your certificate',
              'Inspection and approval',
            ].map((label, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                  <span className="text-[11px] font-bold text-white">{i + 1}</span>
                </div>
                <span className="text-sm text-white">{label}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            onClick={openCouncilFinder}
            className="flex h-12 w-full items-center justify-center rounded-xl bg-elec-yellow text-sm font-semibold text-black transition-all hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98]"
          >
            Find your local council
          </button>
          <p className="text-[11px] text-white text-center mt-2">Opens Planning Portal</p>
        </div>
      </div>

      {/* Resource links — card-surface-interactive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <a
          href="https://www.gov.uk/find-local-council"
          target="_blank"
          rel="noopener noreferrer"
          className="card-surface-interactive rounded-xl flex items-center justify-between p-4"
        >
          <div>
            <p className="text-sm font-medium text-white">Gov.uk Council Finder</p>
            <p className="text-[12px] text-white">Find by postcode</p>
          </div>
          <span className="flex-shrink-0 text-[12.5px] font-semibold text-elec-yellow">Open</span>
        </a>
        <a
          href="https://www.gov.uk/building-regulations-approval"
          target="_blank"
          rel="noopener noreferrer"
          className="card-surface-interactive rounded-xl flex items-center justify-between p-4"
        >
          <div>
            <p className="text-sm font-medium text-white">Building Regs Guide</p>
            <p className="text-[12px] text-white">Official Gov.uk guidance</p>
          </div>
          <span className="flex-shrink-0 text-[12.5px] font-semibold text-elec-yellow">Open</span>
        </a>
      </div>

      {/* Tip card */}
      <div className="relative overflow-hidden card-surface-interactive rounded-2xl">
        <div className="relative z-10 p-4">
          <p className="text-sm font-bold text-white mb-1">Save Money on Future Jobs</p>
          <p className="text-[12px] text-white leading-relaxed">
            Join NICEIC or NAPIT to self-certify work and skip Building Control fees entirely.
            Membership pays for itself after just a few notifiable jobs.
          </p>
        </div>
      </div>
    </div>
  );
};
