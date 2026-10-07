import { PrimaryButton, SecondaryButton } from '@/components/employer/editorial';

/**
 * The end of the guide, shown on the job sheet (?firstjob=<id>): the two
 * things a contractor does next with a booked job.
 */
export function FirstJobNext({
  booked,
  onPack,
  onQuote,
  onDone,
}: {
  booked: number;
  onPack: () => void;
  onQuote: () => void;
  onDone: () => void;
}) {
  return (
    <div className="rounded-2xl border border-white/[0.12] border-l-[3px] border-l-elec-yellow bg-white/[0.03] p-4 space-y-3">
      <div>
        <p className="text-[15px] font-semibold text-white">Your first job is set up</p>
        <p className="mt-1 text-[13px] leading-relaxed text-white">
          {booked > 0
            ? `${booked === 1 ? 'One person is' : `${booked} people are`} booked and can see it in Worker Tools. Two things usually come next:`
            : 'Nobody is booked yet; use Team below when you are ready. Two things usually come next:'}
        </p>
      </div>
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <PrimaryButton fullWidth onClick={onPack}>
          Send the RAMS pack
        </PrimaryButton>
        <SecondaryButton fullWidth onClick={onQuote}>
          Raise a quote
        </SecondaryButton>
      </div>
      <button
        type="button"
        onClick={onDone}
        className="h-11 w-full text-[13px] font-semibold text-white touch-manipulation"
      >
        Done for now
      </button>
    </div>
  );
}
