interface NonRegisteredUserGuideProps {
  onFindBuildingControl: () => void;
  onOpenGuide?: () => void;
}

/**
 * The same one-line strip as the registered version, for an electrician who
 * notifies the council directly. Says the two things that matter — go direct,
 * a fee applies — and offers the council finder.
 */
export const NonRegisteredUserGuide = ({ onFindBuildingControl, onOpenGuide }: NonRegisteredUserGuideProps) => (
  <div className="-mx-4 flex flex-col gap-3 border-y border-white/[0.12] bg-gradient-to-b from-white/[0.06] to-white/[0.03] p-4 sm:mx-0 sm:flex-row sm:items-center sm:justify-between sm:rounded-2xl sm:border-x sm:p-5">
    <div className="min-w-0">
      <p className="text-[13.5px] font-semibold tracking-tight text-white">Not registered with a scheme</p>
      <p className="mt-0.5 text-[12.5px] leading-snug text-white">
        Notify your local Building Control directly — ideally before the work starts. They charge a
        fee and may inspect. Add your scheme in Settings if you join one.
      </p>
    </div>
    <div className="flex shrink-0 flex-wrap gap-2">
      <button
        type="button"
        onClick={onFindBuildingControl}
        className="inline-flex h-11 items-center rounded-xl bg-elec-yellow px-4 text-[13px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 active:scale-[0.98] touch-manipulation"
      >
        Find your council
      </button>
      {onOpenGuide && (
        <button
          type="button"
          onClick={onOpenGuide}
          className="inline-flex h-11 items-center rounded-xl border border-white/[0.14] bg-white/[0.05] px-4 text-[13px] font-semibold text-white transition-colors hover:bg-white/[0.09] active:scale-[0.98] touch-manipulation"
        >
          How it works
        </button>
      )}
    </div>
  </div>
);
