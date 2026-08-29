import { useRef } from 'react';
import { Camera, ImagePlus } from 'lucide-react';

/**
 * The shutter (ELE-1634).
 *
 * ── 🔴 NO `capture="environment"` ─────────────────────────────────────────
 * It bit us on ELE-1110, and it would bite harder here. On iOS that attribute
 * forces the system camera and REMOVES the option to pick an existing image
 * altogether — so an electrician who photographed the board an hour ago, or who
 * is writing the survey up at the office, could not attach their own photos to
 * their own report.
 *
 * The brief asks for camera-first, and camera-first is achieved by which button
 * is bigger, not by taking the other one away. Both inputs below are plain
 * `accept="image/*"`; on a phone that already offers Camera first in the picker.
 */

interface Props {
  onPick: (files: File[]) => void;
  disabled?: boolean;
  /** `hero` on an empty survey, `bar` once photographs exist. */
  variant: 'hero' | 'bar';
}

/* Sets the expectation without a wizard: three lines, no numbered steps. */
const HOW_IT_WORKS = [
  'Photograph anything worth mentioning as you walk round',
  'Each one is written up for you in plain English',
  'You check and confirm every note before it goes on the report',
];

export default function SurveyCapture({ onPick, disabled, variant }: Props) {
  const cameraRef = useRef<HTMLInputElement>(null);
  const libraryRef = useRef<HTMLInputElement>(null);

  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    e.target.value = '';
    if (files.length) onPick(files);
  };

  const inputs = (
    <>
      <input
        ref={cameraRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handle}
        className="hidden"
      />
      <input
        ref={libraryRef}
        type="file"
        accept="image/*"
        multiple
        onChange={handle}
        className="hidden"
      />
    </>
  );

  if (variant === 'hero') {
    return (
      <section className="-mx-4 border-y border-white/[0.14] bg-gradient-to-b from-white/[0.08] to-white/[0.04] px-4 py-8 sm:mx-0 sm:rounded-2xl sm:border-x sm:px-8 sm:py-10">
        <div className="mx-auto max-w-lg">
          {/*
           * Typographic, not a giant icon tile. The house rule is that
           * hierarchy comes from type and spacing — a big yellow square reads
           * as decoration and makes a working tool look like an onboarding
           * screen.
           */}
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-white">
            Start here
          </p>
          <h2 className="mt-2 text-[22px] font-semibold leading-tight tracking-tight text-white sm:text-[26px]">
            Walk the property and photograph what matters
          </h2>
          <p className="mt-2 text-[14px] leading-relaxed text-white">
            The board, the wiring, the sockets, anything that looks its age. The report
            builds itself behind you.
          </p>

          <div className="mt-6 flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              disabled={disabled}
              onClick={() => cameraRef.current?.click()}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98] disabled:opacity-50"
            >
              <Camera className="h-[18px] w-[18px]" />
              Take a photo
            </button>
            <button
              type="button"
              disabled={disabled}
              onClick={() => libraryRef.current?.click()}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-white/[0.16] bg-white/[0.06] text-[15px] font-semibold text-white transition-colors hover:bg-white/[0.1] touch-manipulation active:scale-[0.98] disabled:opacity-50"
            >
              <ImagePlus className="h-[18px] w-[18px]" />
              Choose from photos
            </button>
          </div>

          <ul className="mt-7 space-y-2.5 border-t border-white/[0.1] pt-6">
            {HOW_IT_WORKS.map((line) => (
              <li key={line} className="flex gap-3 text-[13px] leading-snug text-white">
                <span
                  aria-hidden="true"
                  className="mt-[7px] h-px w-4 shrink-0 bg-white/[0.35]"
                />
                {line}
              </li>
            ))}
          </ul>

          <p className="mt-6 text-[12px] leading-snug text-white">
            The client and address can wait until later — nothing here has to be done in
            order.
          </p>
        </div>
        {inputs}
      </section>
    );
  }

  return (
    <div className="flex gap-2">
      <button
        type="button"
        disabled={disabled}
        onClick={() => cameraRef.current?.click()}
        className="flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-elec-yellow text-[15px] font-semibold text-black transition-colors hover:bg-elec-yellow/90 touch-manipulation active:scale-[0.98] disabled:opacity-50"
      >
        <Camera className="h-[18px] w-[18px]" />
        Add a photo
      </button>
      <button
        type="button"
        disabled={disabled}
        onClick={() => libraryRef.current?.click()}
        aria-label="Choose from photos"
        className="flex h-12 w-14 shrink-0 items-center justify-center rounded-xl border border-white/[0.16] bg-white/[0.06] text-white transition-colors hover:bg-white/[0.1] touch-manipulation active:scale-[0.98] disabled:opacity-50"
      >
        <ImagePlus className="h-[18px] w-[18px]" />
      </button>
      {inputs}
    </div>
  );
}
