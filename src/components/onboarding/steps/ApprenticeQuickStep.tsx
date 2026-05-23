/**
 * Apprentice fast-path setup step.
 *
 * Apprentices don't need company name / banking / branding — they need
 * to tell us what course they're on so the Study Centre, mock tests and
 * AI mentor can target the right level.
 *
 * This is a single screen, not a wizard. They tap Save and they're in.
 */

interface ApprenticeStepProps {
  formData: {
    apprenticeCourse: string;
    apprenticeYear: string;
    apprenticeCollege: string;
    [key: string]: unknown;
  };
  onChange: (data: Record<string, unknown>) => void;
}

const COURSES = [
  { value: 'level-2', label: 'Level 2 Diploma' },
  { value: 'level-3', label: 'Level 3 Diploma' },
  { value: 'am2', label: 'AM2 / AM2E / AM2S' },
  { value: 'nvq-3', label: 'NVQ Level 3' },
  { value: 'hnc', label: 'HNC Electrical' },
  { value: '2391', label: '2391 Inspection & Testing' },
  { value: '2365', label: '2365 Diploma' },
  { value: '18th-edition', label: '18th Edition (2382)' },
  { value: 'other', label: 'Something else' },
];

const YEARS = [
  { value: '1st', label: 'Year 1' },
  { value: '2nd', label: 'Year 2' },
  { value: '3rd', label: 'Year 3' },
  { value: '4th', label: 'Year 4' },
  { value: 'pre-am2', label: 'Heading into AM2' },
  { value: 'post', label: 'Qualified, brushing up' },
];

const inputClass =
  'h-12 w-full touch-manipulation rounded-2xl border border-white/[0.12] bg-white/[0.04] px-5 text-[16px] text-white placeholder:text-white/40 outline-none transition-all duration-150 focus:border-yellow-400/70 focus:bg-white/[0.06] focus:ring-2 focus:ring-yellow-400/20';

export function ApprenticeQuickStep({ formData, onChange }: ApprenticeStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-[1.5rem] font-bold leading-[1.1] tracking-[-0.02em] text-white sm:text-[1.75rem]">
          What are you <span className="text-yellow-400">studying?</span>
        </h3>
        <p className="mt-2 text-[14px] leading-[1.6] text-white sm:text-[15px]">
          One question, then you&apos;re in. We&apos;ll line up the right mock tests,
          flashcards and AI mentor for your level.
        </p>
      </div>

      <div className="space-y-4">
        {/* Course */}
        <div>
          <label
            htmlFor="apprentice-course"
            className="mb-2 block text-[13px] font-medium text-white"
          >
            Course
          </label>
          <div className="grid grid-cols-2 gap-2">
            {COURSES.map((c) => {
              const active = formData.apprenticeCourse === c.value;
              return (
                <button
                  key={c.value}
                  type="button"
                  onClick={() => onChange({ ...formData, apprenticeCourse: c.value })}
                  className={[
                    'h-12 touch-manipulation rounded-2xl border px-3 text-[14px] font-medium transition-all',
                    active
                      ? 'border-yellow-400/70 bg-yellow-400/10 text-yellow-300'
                      : 'border-white/[0.12] bg-white/[0.04] text-white hover:border-white/25',
                  ].join(' ')}
                >
                  {c.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Year */}
        <div>
          <label
            htmlFor="apprentice-year"
            className="mb-2 block text-[13px] font-medium text-white"
          >
            Where are you up to?
          </label>
          <div className="grid grid-cols-2 gap-2">
            {YEARS.map((y) => {
              const active = formData.apprenticeYear === y.value;
              return (
                <button
                  key={y.value}
                  type="button"
                  onClick={() => onChange({ ...formData, apprenticeYear: y.value })}
                  className={[
                    'h-12 touch-manipulation rounded-2xl border px-3 text-[14px] font-medium transition-all',
                    active
                      ? 'border-yellow-400/70 bg-yellow-400/10 text-yellow-300'
                      : 'border-white/[0.12] bg-white/[0.04] text-white hover:border-white/25',
                  ].join(' ')}
                >
                  {y.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* College — optional */}
        <div>
          <label
            htmlFor="apprentice-college"
            className="mb-2 block text-[13px] font-medium text-white"
          >
            College or training provider{' '}
            <span className="font-normal text-white/50">(optional)</span>
          </label>
          <input
            id="apprentice-college"
            type="text"
            value={formData.apprenticeCollege}
            onChange={(e) => onChange({ ...formData, apprenticeCollege: e.target.value })}
            placeholder="e.g. JTL, Newcastle College"
            className={inputClass}
          />
          <p className="mt-2 text-[12px] leading-[1.5] text-white/55">
            Helps us point you to peers on the same course and unlock college features later.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-yellow-500/20 bg-yellow-500/[0.06] p-4">
        <p className="text-[13px] font-semibold text-yellow-400">Why we ask</p>
        <p className="mt-1 text-[13px] leading-[1.6] text-white">
          Your level decides which mock papers, flashcards and AI mentor responses we
          show you. Get this right and the app does the rest.
        </p>
      </div>
    </div>
  );
}
