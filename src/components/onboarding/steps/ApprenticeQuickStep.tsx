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
  'h-11 w-full touch-manipulation rounded-xl border border-white/[0.10] bg-white/[0.04] px-4 text-[16px] text-white placeholder:text-white/40 outline-none transition-all duration-150 focus:border-yellow-400/60 focus:bg-white/[0.06] focus:ring-1 focus:ring-yellow-400/20';

const chipClass = (active: boolean) =>
  [
    'h-10 touch-manipulation rounded-xl border px-2.5 text-[13px] font-medium transition-colors',
    active
      ? 'border-elec-yellow/60 bg-elec-yellow/10 text-elec-yellow'
      : 'border-white/[0.10] bg-white/[0.04] text-white/85 hover:border-white/25',
  ].join(' ');

export function ApprenticeQuickStep({ formData, onChange }: ApprenticeStepProps) {
  return (
    <div className="space-y-5">
      <div className="space-y-1">
        <h3 className="text-[18px] font-semibold tracking-tight text-white leading-tight">
          What are you studying?
        </h3>
        <p className="text-[12.5px] leading-snug text-white/55">
          Two taps and you&apos;re in — this targets your mock tests, flashcards and AI
          mentor to the right level.
        </p>
      </div>

      <div className="space-y-4">
        {/* Course */}
        <div>
          <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Course
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {COURSES.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => onChange({ ...formData, apprenticeCourse: c.value })}
                className={chipClass(formData.apprenticeCourse === c.value)}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Year */}
        <div>
          <span className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-white/55">
            Where are you up to?
          </span>
          <div className="grid grid-cols-2 gap-1.5">
            {YEARS.map((y) => (
              <button
                key={y.value}
                type="button"
                onClick={() => onChange({ ...formData, apprenticeYear: y.value })}
                className={chipClass(formData.apprenticeYear === y.value)}
              >
                {y.label}
              </button>
            ))}
          </div>
        </div>

        {/* College — optional */}
        <div>
          <label
            htmlFor="apprentice-college"
            className="mb-1.5 block text-[10px] font-medium uppercase tracking-[0.18em] text-white/55"
          >
            College or provider <span className="normal-case tracking-normal text-white/40">(optional)</span>
          </label>
          <input
            id="apprentice-college"
            type="text"
            value={formData.apprenticeCollege}
            onChange={(e) => onChange({ ...formData, apprenticeCollege: e.target.value })}
            placeholder="e.g. JTL, Newcastle College"
            className={inputClass}
          />
        </div>
      </div>

      {/* One quiet line, not a box — this screen shouldn't shout */}
      <p className="text-[11.5px] leading-snug text-white/45">
        Your level decides which mock papers, flashcards and AI answers you see — get
        this right and the app does the rest.
      </p>
    </div>
  );
}
