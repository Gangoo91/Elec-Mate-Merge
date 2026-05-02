import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'elm4-s3-duration',
    question:
      'A standard non-domestic UK building requires emergency lighting on the escape route. What is the minimum BS 5266-1:2025 autonomy duration?',
    options: [
      '30 minutes.',
      '1 hour.',
      '3 hours — the standard non-domestic minimum. The 3-hour figure recognises that real evacuations may extend well beyond the time taken to walk out (door obstruction, occupant immobility, simultaneous evacuation of multiple zones, fire-fighting duration, post-event search). 1-hour and 2-hour autonomy are also recognised in BS 5266-1:2025 but only for buildings where the evacuation profile and occupancy permit (e.g. small premises with rapid clear evacuation, or where mains is restored quickly via standby supply). The 3-hour figure is the safe default and the duration that should be assumed unless a specific risk assessment justifies less.',
      '24 hours.',
    ],
    correctIndex: 2,
    explanation:
      '3 hours is the standard non-domestic minimum. 1 h and 2 h options exist for specific applications. 24 h would be wildly impractical and is not a BS 5266-1 option. The duration drives battery sizing directly via the calculation P × t × ageing factor.',
  },
  {
    id: 'elm4-s3-ageing',
    question:
      'When sizing the battery for a 3-hour autonomy, why is an ageing factor applied to the calculated capacity?',
    options: [
      'To make the battery cheaper.',
      'No reason — it is optional.',
      'Battery capacity DEGRADES over its service life. A battery rated 100 Ah when new typically delivers 80% of nominal capacity (= 80 Ah) by end-of-design-life (typically 4 years for SLA, longer for lithium-ion). Sizing the battery for the design load × duration alone would mean it just barely meets requirement when new and FAILS the duration test in years 2-4. The ageing factor (typically 1.25, equivalent to sizing for 125% of calculated capacity) ensures the battery still delivers full duration at end-of-life. The factor compensates for capacity loss, not for safety margin.',
      'It is a typo.',
    ],
    correctIndex: 2,
    explanation:
      'The ageing factor (≈ 1.25 for SLA, lower for lithium-ion) compensates for capacity degradation over service life. Without it, the battery passes commissioning then fails its duration test as capacity declines. It is not a safety margin in the engineering sense — it is a degradation allowance.',
  },
  {
    id: 'elm4-s3-recharge',
    question:
      'After a full discharge, BS EN 50171:2021 / BS EN 50172:2024 require the battery to recharge to at least 80% of rated capacity within how long?',
    options: [
      '4 hours.',
      '24 hours — within one day of a discharge event the battery must be recharged to at least 80% of rated capacity, restoring it to operational duty for the next event. The reasoning: the building remains occupied; another mains failure could occur before the battery has fully recovered; the system must be ready for the next event quickly. The 80% figure is the practical "operational" capacity for emergency duty; full 100% recharge typically takes longer and is monitored separately. The same recharge target appears in both standards and is built into BS EN 50171-rated cabinet chargers.',
      '7 days.',
      'No requirement.',
    ],
    correctIndex: 1,
    explanation:
      '24 hours to 80% is the recharge requirement. It is a system-level specification: the battery, the charger, the temperature management, and the supply infrastructure together must achieve it. Cabinets that take longer are not BS EN 50171-rated.',
  },
  {
    id: 'elm4-s3-chemistry',
    question:
      'Compare sealed lead acid (SLA) with lithium-ion as battery chemistries for emergency lighting.',
    options: [
      'SLA is always better.',
      'Lithium-ion is always better.',
      'SLA: well-proven, widely available, lower capital cost per Wh, simpler charge management, ≈ 4-year typical service life, sensitive to temperature (hot environments halve life). Lithium-ion: longer service life (typically 5-8 years, sometimes 10+), higher energy density (smaller, lighter), wider temperature tolerance, faster recharge — but higher capital cost per Wh, more complex charge management (BMS required), still rare in some self-contained luminaires. The choice depends on lifecycle economics: lithium-ion costs more upfront but earns it back via longer life and lower replacement labour at scale. For a single small office, SLA dominates; for a 1000-luminaire campus over 25-year service life, lithium-ion typically wins on whole-life cost.',
      'They are identical.',
    ],
    correctIndex: 2,
    explanation:
      'SLA = lower capital, shorter life, well-proven. Lithium-ion = higher capital, longer life, smaller footprint, modern. The choice is lifecycle-driven, not abstract. NiCd persists in extreme-temperature applications; NiMH is uncommon for emergency lighting in 2026.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the standard minimum autonomy duration for emergency lighting in a UK non-domestic building per BS 5266-1:2025?',
    options: [
      '30 minutes.',
      '3 hours — the default minimum. 1-hour and 2-hour options exist for specific applications (small premises with rapid clear evacuation, or where mains is restored via standby supply) but the 3-hour figure is the safe baseline assumed unless a specific risk assessment justifies less.',
      '24 hours.',
      '15 minutes.',
    ],
    correctAnswer: 1,
    explanation:
      '3 hours is the standard. The duration drives battery sizing directly. Domestic standards differ; BS 5266-1:2025 is for non-domestic.',
  },
  {
    id: 2,
    question: 'A central battery system supplies emergency luminaires totalling 240 W of emergency load for a 3-hour duration at 24 V dc nominal. Ignoring efficiency and ageing, what is the basic battery capacity in Ah?',
    options: [
      '10 Ah.',
      '24 Ah.',
      '30 Ah — the basic calculation is current × time. Current = 240 W ÷ 24 V = 10 A. Time = 3 h. Capacity = 10 A × 3 h = 30 Ah at the design discharge rate. The actual specified capacity is HIGHER once efficiency (typically 0.85-0.95 for inverter losses) and ageing (typically 1.25 for SLA) are applied — giving roughly 30 ÷ 0.9 × 1.25 ≈ 42 Ah. The 30 Ah figure is the energy floor before real-world derating.',
      '720 Ah.',
    ],
    correctAnswer: 2,
    explanation:
      'Basic Ah = (P / V) × t = (240 / 24) × 3 = 30 Ah. Real-world specification adds inverter efficiency (90% typical) and ageing (1.25 typical) to land at ≈ 42 Ah. The basic figure is the starting point; the specified figure is what gets ordered.',
  },
  {
    id: 3,
    question: 'Why is an ageing factor of typically 1.25 applied to the calculated battery capacity?',
    options: [
      'To make the battery bigger for fun.',
      'To compensate for capacity degradation over the battery service life. A 100 Ah battery when new delivers ≈ 80 Ah at end-of-design-life. Sizing for the design load alone (without ageing factor) means the battery just-passes commissioning and fails the duration test as it ages. The 1.25 factor (≈ 125% of basic capacity) ensures the battery still meets the duration requirement at end-of-life. For lithium-ion the factor is typically lower (1.10-1.15) because lithium-ion holds capacity better over its life.',
      'To meet HSE guidance only.',
      'To impress clients.',
    ],
    correctAnswer: 1,
    explanation:
      'The ageing factor compensates for capacity loss over service life. Without it the battery just passes commissioning and fails in service. It is degradation allowance, not engineering safety margin.',
  },
  {
    id: 4,
    question: 'What is the maximum recharge time specified by BS EN 50171:2021 / BS EN 50172:2024 after a full discharge?',
    options: [
      '4 hours to 100%.',
      '24 hours to at least 80% of rated capacity. The standard does not require full 100% recharge in 24 hours — only 80%, the practical "operational" threshold for emergency duty. Full recharge typically takes longer. The 24 h / 80% figure exists because the building remains occupied after a discharge event and another mains failure could occur before full recovery; the system must be ready for the next event quickly.',
      '7 days to 100%.',
      'No specification.',
    ],
    correctAnswer: 1,
    explanation:
      '24 h to ≥ 80% rated capacity. It is the recharge target every BS EN 50171 cabinet charger must meet. Generic UPS chargers may meet this; many do not, depending on battery technology and charger sizing.',
  },
  {
    id: 5,
    question: 'Which battery chemistry is most commonly used in self-contained emergency luminaires in UK installations as at 2026?',
    options: [
      'Nickel-cadmium (NiCd).',
      'Sealed lead acid (SLA), increasingly being displaced by lithium-ion (Li-ion / LiFePO4) at the higher end of the market. SLA dominates the value segment because it is well-proven, cheap, and the manufacturing supply chain is mature. Lithium-ion is taking share at the premium end because of longer service life, smaller footprint, and lighter weight — particularly in luminaires where size and weight matter. NiCd is rare in modern installations (environmental directives have reduced its use). NiMH is occasionally found but uncommon.',
      'Lead-acid wet cell.',
      'Mercury cell.',
    ],
    correctAnswer: 1,
    explanation:
      'SLA dominates by volume, lithium-ion is the rising challenger. NiCd is being phased out for environmental reasons. NiMH and exotic chemistries are minor segments.',
  },
  {
    id: 6,
    question: 'A self-contained emergency luminaire has a battery date label showing it was manufactured in 2022. The luminaire has not been replaced or had its battery changed. As at 2026, what is the maintenance action?',
    options: [
      'No action.',
      'Treat the battery as approaching end of design life (typically 4 years SLA). Confirm via the next annual 3-hour duration test — if the luminaire passes the duration test it has remaining service life; if it fails or is marginal, replace the battery (or the luminaire if non-replaceable). The date label is the planning trigger, not the strict end-of-life criterion. Combined with self-test data and capacity test results, the date label informs the maintenance schedule. Lithium-ion batteries with 5-8 year design life would have more remaining life at the same age.',
      'Throw the luminaire away immediately.',
      'Ignore the date label.',
    ],
    correctAnswer: 1,
    explanation:
      'The date label is a planning trigger. The actual replacement decision is informed by the duration test and self-test data. SLA at 4 years is at the end of design life and should be replaced or confirmed via the next test cycle.',
  },
  {
    id: 7,
    question: 'What additional design output does the BS 5266-1:2025 5-year photometric requirement add, beyond the traditional load × duration battery sizing?',
    options: [
      'No effect on battery sizing.',
      'It does not directly change the sizing formula but it CONFIRMS the design assumption (the luminaire is delivering the required lumen output / illuminance at end-of-life). Without the 5-year photometric check, a luminaire whose lamp had aged could pass the duration test (it still illuminates) while failing to meet the design lux on the escape route. The photometric check verifies that the emergency function is meeting BS EN 1838 lux levels in service, not just that the luminaire is "on". Battery sizing remains based on load × duration × ageing; the photometric requirement audits the outcome.',
      'It removes the duration test.',
      'It changes the autonomy to 30 minutes.',
    ],
    correctAnswer: 1,
    explanation:
      'The 5-year photometric check (NEW in BS 5266-1:2025) audits whether the luminaire delivers BS EN 1838 lux at end-of-life. Battery sizing assumes the luminaire delivers rated output throughout duration; the photometric check verifies that assumption is still true after years of service.',
  },
  {
    id: 8,
    question: 'Why is the end-of-discharge voltage relevant to battery sizing?',
    options: [
      'It is not.',
      'The battery delivers rated capacity only down to a defined end-of-discharge voltage (typically 1.75-1.80 V/cell for SLA, ≈ 2.5-2.7 V/cell for lithium-ion equivalents). Discharging below that voltage damages the battery and is prevented by low-voltage cut-off in the cabinet/luminaire. Sizing must account for the voltage at end-of-discharge: the lamp/luminaire driver continues to function at the LOWER voltage, which means HIGHER current draw for the same wattage. The capacity at the end-of-discharge rate is what matters, not the nominal capacity at a higher rate.',
      'Only the nominal voltage matters.',
      'Voltage is irrelevant.',
    ],
    correctAnswer: 1,
    explanation:
      'End-of-discharge voltage matters because (a) it is the cut-off below which the battery must not run, and (b) at end-of-discharge the load draws higher current at lower voltage. Battery capacity is rated at a specified discharge current and end-voltage; using a different combination changes the actual capacity available.',
  },
  {
    id: 9,
    question: 'A 24 V central battery system is sized for 200 W load for 3 hours. Including 90% inverter efficiency and 1.25 ageing factor, what is the specified Ah?',
    options: [
      '20 Ah.',
      '25 Ah.',
      '34.7 Ah — calculation: basic Ah = (P × t) / V = (200 × 3) / 24 = 25 Ah. With 90% inverter efficiency the battery must supply 25 / 0.9 = 27.78 Ah at the inverter input. With 1.25 ageing factor: 27.78 × 1.25 = 34.7 Ah. So specify ≥ 35 Ah at the design discharge rate. (Round UP to standard battery sizes; specify 40 Ah typical to be in the standard product range.)',
      '120 Ah.',
    ],
    correctAnswer: 2,
    explanation:
      'Cmin = (P × t) / (V × η) × ageing = (200 × 3) / (24 × 0.9) × 1.25 = 34.7 Ah. Specify the next standard size up — typically 40 Ah. The formula must include both efficiency (η) and ageing factor.',
  },
  {
    id: 10,
    question: 'What is the difference between maintenance-free (sealed) and maintainable (vented) batteries in central battery systems?',
    options: [
      'No difference.',
      'Maintenance-free (sealed VRLA / SLA / lithium-ion): no electrolyte top-up, no equalisation discharge, no specific gravity measurements; smaller plant-room ventilation; cabinet-installed; typical 4-10 year life. Maintainable (vented lead acid): user accessible electrolyte for top-up, periodic equalisation, hydrometer testing; requires plant-room ventilation for hydrogen off-gassing; longer life potential (15-20 years) but higher maintenance labour; floor-standing in dedicated battery rooms. Modern installations dominantly use sealed maintenance-free batteries; vented batteries persist in some long-life critical applications (e.g. some rail / utility installations).',
      'Maintenance-free is always better.',
      'Maintainable is always cheaper.',
    ],
    correctAnswer: 1,
    explanation:
      'Maintenance-free vs maintainable is a real distinction. Maintenance-free dominates modern emergency lighting (smaller plant rooms, no ventilation, no electrolyte work). Maintainable persists in long-life applications where the higher maintenance is justified by longer service life.',
  },
];

const EmergencyLightingModule4Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Battery sizing and autonomy duration | Emergency Lighting Module 4.3 | Elec-Mate',
    description:
      'Battery sizing for 1h/2h/3h autonomy, ageing factor 1.25, end-of-discharge voltage, BS EN 50171 24h recharge, SLA vs lithium-ion vs NiCd, BS 5266-1:2025.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3"
            title="Battery sizing and autonomy duration"
            description="The battery is the energy store that powers the emergency lighting from mains failure to evacuation complete. Sizing it correctly is engineering: load × duration × efficiency × ageing factor, with end-of-discharge voltage as the operating floor. Get any of those wrong and the battery passes commissioning then fails its duration test in service."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 5266-1:2025 standard non-domestic minimum autonomy: 3 hours. Options of 1 h and 2 h exist for specific lower-risk applications.',
              'Battery sizing formula: Cmin = (P × t) / (V × η) × ageing factor. P = load in W, t = duration in h, V = nominal voltage, η = inverter/driver efficiency, ageing factor compensates for capacity loss over life.',
              'Typical efficiency: 0.85-0.95 (inverter / driver). Typical ageing factor: 1.25 for SLA (4-year life), 1.10-1.15 for lithium-ion (longer life, less degradation).',
              'BS EN 50171:2021 / BS EN 50172:2024 require recharge to ≥ 80% of rated capacity within 24 hours of full discharge.',
              'End-of-discharge voltage is the operating floor — typically 1.75-1.80 V/cell for SLA. Below this point the battery is damaged; capacity ratings are at this point.',
              'SLA dominates by volume — well-proven, cheap, ≈ 4-year typical life, sensitive to temperature. Lithium-ion is taking share at the premium end — longer life (5-10 years), smaller, lighter, more complex BMS.',
              'NiCd persists in extreme-temperature or very-long-life applications; NiMH is rare in modern emergency lighting.',
              'Maintenance-free (sealed VRLA / lithium-ion) dominates modern installations. Maintainable (vented lead acid) persists where 15-20 year life justifies higher maintenance labour.',
              'Battery date labels (similar to fire alarm 2025 requirement) trigger replacement planning at end-of-design-life.',
              'BS 5266-1:2025 5-year photometric check audits that the luminaire still delivers BS EN 1838 lux at end-of-life — battery sizing assumes rated output throughout duration; photometric check verifies that.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify the BS 5266-1:2025 autonomy duration options (1 h, 2 h, 3 h) and apply the standard 3-hour minimum to non-domestic installations',
              'Apply the battery sizing formula Cmin = (P × t) / (V × η) × ageing factor and specify a battery capacity for a worked load × duration scenario',
              'Apply efficiency and ageing factors appropriately — typical 0.9 efficiency, 1.25 SLA ageing, 1.10-1.15 lithium-ion ageing',
              'Identify end-of-discharge voltage and explain why battery capacity ratings are referenced to it',
              'Apply the BS EN 50171:2021 / BS EN 50172:2024 recharge requirement (24 h to ≥ 80% rated capacity) to charger sizing',
              'Compare battery chemistries (SLA, lithium-ion, NiCd, NiMH) on capital cost, service life, recharge time, temperature tolerance, and maintenance regime',
              'Distinguish maintenance-free from maintainable battery systems and identify which is appropriate for a given installation',
              'Apply battery date labelling and end-of-life planning to maintenance scheduling',
              'Connect battery sizing to the BS 5266-1:2025 5-year photometric check — the battery delivers duration; the photometric check verifies the luminaire delivers lux at end-of-life',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Autonomy duration — what the standard requires</ContentEyebrow>

          <ConceptBlock
            title="The 3-hour default"
            plainEnglish="BS 5266-1:2025 sets the standard minimum autonomy at 3 hours for non-domestic premises. This is the default unless a specific risk assessment justifies a shorter duration. The 3-hour figure recognises real-world evacuation profiles: the time to clear a building includes door congestion, occupant immobility, simultaneous evacuation of multiple zones, fire-fighting, and post-event search. A 30-minute system that passes the bare evacuation walking-time can fail catastrophically if the actual incident extends — and most do."
            onSite="When you see a 1-hour or 2-hour autonomy specified, ask why. The risk assessment should justify it. Default to 3 hours unless the design explicitly steps down."
          >
            <p>The autonomy duration options:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>3 hours.</strong> Standard non-domestic minimum. Default for offices, retail,
                hospitals, schools, hotels, residential care, and the vast majority of non-domestic
                buildings. Used unless the risk assessment explicitly steps down.
              </li>
              <li>
                <strong>2 hours.</strong> Permitted in some specific cases — for example, smaller
                premises with rapid clear evacuation, or where mains is reliably restored via standby
                generator within the autonomy window. The risk assessment must justify the step-down.
              </li>
              <li>
                <strong>1 hour.</strong> Permitted in narrowly-defined cases — typically small
                premises with very rapid evacuation and low occupancy, where the cost of 3-hour
                autonomy is disproportionate to the risk. Should not be the default; must be justified.
              </li>
              <li>
                <strong>Longer than 3 hours.</strong> Required in some applications — high-rise
                residential, deep basements, hospitals with bedridden patients, anywhere where the
                full evacuation profile exceeds 3 hours. Determined by the risk assessment, not by
                default.
              </li>
            </ul>
            <p>
              The duration drives battery sizing directly. A 3-hour system needs roughly 3× the
              battery capacity of a 1-hour system at the same load. Capital cost and physical size
              scale accordingly. The temptation to under-spec duration to save cost is real and
              must be resisted unless the risk assessment honestly supports the shorter time.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Clause on autonomy duration"
            clause={
              <>
                The duration of operation of the emergency lighting in a non-domestic premises shall
                be not less than 3 hours, except where a shorter duration of 1 hour or 2 hours can be
                justified by the risk assessment, taking into account the time required for full
                evacuation, the occupancy profile, the building risk classification, and the
                availability of standby generation or alternative supply restoration. The duration
                applies to all luminaires forming part of the emergency lighting installation.
              </>
            }
            meaning="Two key phrases. (1) 'Not less than 3 hours' — the default is 3 hours, not negotiable down by habit. (2) 'Justified by the risk assessment' — shorter durations are permitted only when the risk assessment supports them with reasoning. 'Justified' means documented analysis, not pricing pressure."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The battery sizing formula</ContentEyebrow>

          <ConceptBlock
            title="From load and duration to specified Ah"
            plainEnglish="Battery sizing is engineering arithmetic. You start with the emergency load (in watts), multiply by the duration (in hours), divide by the system voltage to get the basic ampere-hours, then apply efficiency and ageing factors to reach the actual specified capacity. The formula is the same whether you are sizing a self-contained luminaire battery or a central battery cabinet — only the numbers change."
          >
            <p>The sizing formula:</p>
            <p className="text-[14px] text-elec-yellow font-mono pl-5">
              Cmin = (P × t) / (V × η) × ageing factor
            </p>
            <p>Where:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cmin</strong> = minimum specified battery capacity (Ah at the rated discharge
                rate to end-of-discharge voltage)
              </li>
              <li>
                <strong>P</strong> = total emergency load (W) — sum of all luminaire wattages running
                in emergency mode, plus any other loads on the same battery (sounders, signs, etc.)
              </li>
              <li>
                <strong>t</strong> = required autonomy duration (h) — typically 3 in non-domestic
              </li>
              <li>
                <strong>V</strong> = nominal battery voltage (V) — typically 12, 24, or 48 V dc for
                central battery; per luminaire for self-contained
              </li>
              <li>
                <strong>η</strong> = inverter / driver efficiency (dimensionless, 0.85-0.95 typical) —
                represents losses between battery and lamp output
              </li>
              <li>
                <strong>ageing factor</strong> = capacity-loss compensation (1.25 typical SLA,
                1.10-1.15 lithium-ion) — compensates for capacity decline over service life
              </li>
            </ul>
            <p>
              The output Cmin is the MINIMUM specified capacity. In practice you specify the next
              standard battery size up (40, 50, 65, 100, 200 Ah etc.) that meets or exceeds Cmin.
              Specifying below standard sizes is impractical; specifying above gives margin and is
              only constrained by physical space and capital cost.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Worked example — central battery for an office floor"
            plainEnglish="An office floor has 40 emergency luminaires, each rated 6 W in emergency mode (LED, BS EN 60598-2-22 compliant). The system is central battery at 24 V dc nominal, with inverter efficiency 90%. Required autonomy is 3 hours per BS 5266-1:2025. The battery is SLA with 1.25 ageing factor."
          >
            <p>Step-by-step:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Total emergency load.</strong> P = 40 × 6 = 240 W
              </li>
              <li>
                <strong>Basic ampere-hours.</strong> Basic Ah = (P × t) / V = (240 × 3) / 24 = 30 Ah
              </li>
              <li>
                <strong>With efficiency.</strong> Ah at battery terminals = 30 / 0.9 = 33.33 Ah
              </li>
              <li>
                <strong>With ageing factor.</strong> Cmin = 33.33 × 1.25 = 41.67 Ah
              </li>
              <li>
                <strong>Round up to standard.</strong> Specify 50 Ah at the design discharge rate
                (next standard size above 41.67 Ah). Some manufacturers offer 45 Ah; either is
                acceptable provided it meets Cmin.
              </li>
            </ul>
            <p>
              Charger sizing: must recharge 50 Ah from full discharge to ≥ 80% within 24 h. That
              means at least 50 × 0.8 / 24 = 1.67 A continuous charging current at fully discharged
              terminal voltage, plus losses. A 3-4 A charger (typical for a 50 Ah cabinet) handles
              this with margin.
            </p>
            <p>
              Plant-room space: a 50 Ah 24 V SLA bank is two 12 V 50 Ah units in series — physically
              compact, cabinet-mountable. A 200 Ah bank would need floor-standing cabinet space.
              Lithium-ion equivalents are smaller and lighter for the same Ah rating.
            </p>
          </ConceptBlock>

          {/* Battery sizing flow with worked example */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Battery sizing flow — worked example: 40 × 6 W luminaires, 3 h autonomy, 24 V central battery
            </h4>
            <svg
              viewBox="0 0 880 480"
              className="w-full h-auto"
              role="img"
              aria-label="Flow diagram showing the steps of battery sizing: total load, basic ampere-hours, efficiency adjustment, ageing factor, rounding to standard size."
            >
              <text x="440" y="30" textAnchor="middle" fill="white" fontSize="13" fontWeight="bold">
                Battery sizing — five-step flow
              </text>

              {/* Step 1 */}
              <rect x="40" y="60" width="220" height="80" rx="10" fill="rgba(34,197,94,0.10)" stroke="#22C55E" strokeWidth="1.6" />
              <text x="150" y="84" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">1 · Total emergency load</text>
              <text x="150" y="106" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">P = N × Pn</text>
              <text x="150" y="124" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9.5">40 × 6 W = 240 W</text>

              {/* Arrow */}
              <line x1="260" y1="100" x2="310" y2="100" stroke="rgba(255,255,255,0.5)" strokeWidth="1.6" />
              <polygon points="310,100 302,96 302,104" fill="rgba(255,255,255,0.5)" />

              {/* Step 2 */}
              <rect x="320" y="60" width="220" height="80" rx="10" fill="rgba(251,191,36,0.10)" stroke="#FBBF24" strokeWidth="1.6" />
              <text x="430" y="84" textAnchor="middle" fill="#FBBF24" fontSize="11" fontWeight="bold">2 · Basic ampere-hours</text>
              <text x="430" y="106" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">Ah = (P × t) / V</text>
              <text x="430" y="124" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9.5">(240 × 3) / 24 = 30 Ah</text>

              {/* Arrow */}
              <line x1="540" y1="100" x2="590" y2="100" stroke="rgba(255,255,255,0.5)" strokeWidth="1.6" />
              <polygon points="590,100 582,96 582,104" fill="rgba(255,255,255,0.5)" />

              {/* Step 3 */}
              <rect x="600" y="60" width="240" height="80" rx="10" fill="rgba(34,211,238,0.10)" stroke="#22D3EE" strokeWidth="1.6" />
              <text x="720" y="84" textAnchor="middle" fill="#22D3EE" fontSize="11" fontWeight="bold">3 · Apply efficiency</text>
              <text x="720" y="106" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">Ah / η     where η = 0.9</text>
              <text x="720" y="124" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9.5">30 / 0.9 = 33.33 Ah</text>

              {/* Arrow down */}
              <line x1="720" y1="140" x2="720" y2="200" stroke="rgba(255,255,255,0.5)" strokeWidth="1.6" />
              <polygon points="720,200 716,192 724,192" fill="rgba(255,255,255,0.5)" />

              {/* Step 4 */}
              <rect x="600" y="210" width="240" height="80" rx="10" fill="rgba(168,85,247,0.10)" stroke="#A855F7" strokeWidth="1.6" />
              <text x="720" y="234" textAnchor="middle" fill="#A855F7" fontSize="11" fontWeight="bold">4 · Ageing factor</text>
              <text x="720" y="256" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">× 1.25 (SLA, 4 yr life)</text>
              <text x="720" y="274" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9.5">33.33 × 1.25 = 41.67 Ah</text>

              {/* Arrow left */}
              <line x1="600" y1="250" x2="540" y2="250" stroke="rgba(255,255,255,0.5)" strokeWidth="1.6" />
              <polygon points="540,250 548,246 548,254" fill="rgba(255,255,255,0.5)" />

              {/* Step 5 */}
              <rect x="320" y="210" width="220" height="80" rx="10" fill="rgba(239,68,68,0.10)" stroke="#EF4444" strokeWidth="1.8" />
              <text x="430" y="234" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">5 · Round up to standard</text>
              <text x="430" y="256" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">Specify next standard ≥ Cmin</text>
              <text x="430" y="274" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">50 Ah @ 24 V</text>

              {/* Charger requirement */}
              <rect x="120" y="320" width="640" height="80" rx="10" fill="rgba(34,197,94,0.08)" stroke="#22C55E" strokeWidth="1.4" strokeDasharray="6,3" />
              <text x="440" y="346" textAnchor="middle" fill="#22C55E" fontSize="11" fontWeight="bold">Charger requirement (BS EN 50171:2021)</text>
              <text x="440" y="366" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="10">Recharge to ≥ 80% rated capacity within 24 hours of full discharge</text>
              <text x="440" y="384" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9.5">50 Ah × 0.8 / 24 h = 1.67 A continuous → typical 3-4 A charger with margin</text>

              {/* Footnote */}
              <text x="440" y="440" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9.5">
                Formula: Cmin = (P × t) / (V × η) × ageing factor       Where: P = load (W), t = duration (h), V = nominal voltage (V), η = efficiency
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>End-of-discharge voltage and recharge requirement</ContentEyebrow>

          <ConceptBlock
            title="The voltage floor that defines the rated capacity"
            plainEnglish="A battery does not deliver a flat voltage from full to empty. Voltage starts high (just after charging) and declines as the battery discharges. Below a defined voltage — the end-of-discharge voltage — the battery is damaged if it continues to discharge. Capacity ratings are quoted at a specific discharge current down to a specific end-voltage. Sizing must be referenced to the same conditions to be meaningful."
          >
            <p>The voltage parameters that matter:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Nominal voltage.</strong> The "headline" voltage of the battery — 12 V for a
                lead-acid 6-cell battery, 24 V for two in series, 48 V for four. Lithium-ion equivalents
                use different cell counts to reach similar nominal voltages.
              </li>
              <li>
                <strong>Float voltage.</strong> The voltage at which the battery is held when fully
                charged on the cabinet charger — typically slightly above nominal (e.g. 13.6-13.8 V
                for a 12 V SLA), maintaining full charge without overcharging.
              </li>
              <li>
                <strong>Discharge curve.</strong> Voltage falls during discharge. For SLA, the curve
                is roughly flat for most of the discharge then drops sharply near end. For lithium-ion
                the curve is even flatter then drops at the very end.
              </li>
              <li>
                <strong>End-of-discharge voltage.</strong> The voltage below which the battery must
                not discharge to avoid permanent damage. Typically 1.75-1.80 V/cell for SLA (so 10.5-10.8 V
                for a 12 V battery, or 21-21.6 V for a 24 V system). Lithium-ion equivalents around
                2.5-2.7 V/cell. The cabinet/luminaire low-voltage cut-off enforces this.
              </li>
              <li>
                <strong>Capacity rating reference.</strong> Battery capacity (Ah) is quoted at a
                specific discharge current AND a specific end-voltage. A 100 Ah @ C/10 to 1.75 V/cell
                rating means the battery delivers 100 Ah when discharged at 10 A continuous to a
                terminal voltage of 1.75 × 6 = 10.5 V (12 V SLA). Sizing must use the same reference;
                discharging at higher currents or to higher cut-off voltages reduces effective capacity.
              </li>
            </ul>
            <p>
              The driver / inverter at the luminaire end maintains constant lamp wattage as battery
              voltage falls — which means it draws MORE current at lower voltage. The current at
              end-of-discharge is therefore higher than at full charge. Battery capacity at this
              higher discharge current is lower than at the rated reference current. A real sizing
              calculation accounts for this; a casual one does not, and the battery falls short on
              its duration test.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50171:2021 · Recharge requirement"
            clause={
              <>
                The central power supply system shall, after full discharge of the battery, recharge
                the battery to at least 80% of its rated capacity within 24 hours, and to full rated
                capacity within a longer period to be specified by the system designer. The charger
                shall provide constant-voltage current-limited charging with temperature compensation
                appropriate to the battery technology.
              </>
            }
            meaning="The headline number is 24 hours to 80%. The 80% threshold is the practical operational capacity for emergency duty — the system is back online for the next event quickly. Full recharge takes longer and is monitored separately. 'Temperature compensation' matters because battery charge-acceptance varies with temperature; the charger adjusts float voltage automatically to avoid overcharging in hot conditions or undercharging in cold."
          />

          <ConceptBlock
            title="Why the 24-hour / 80% recharge requirement exists"
            plainEnglish="The building stays occupied after a discharge event. Another mains failure could occur the next day. If the battery takes a week to recharge, the system is off-duty for that week — and the next event finds it half-empty. The 24-hour requirement ensures the system is operational again quickly. The 80% threshold is the practical floor for emergency duty: at 80% capacity the system still meets its duration requirement (because the original sizing has the 1.25 ageing factor margin). Full 100% recharge takes longer but is not required for return-to-service."
          >
            <p>The recharge implications:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Charger sizing.</strong> The charger must be capable of delivering 80% of
                battery rated capacity within 24 hours. For a 100 Ah bank, that is at least 100 × 0.8
                / 24 = 3.33 A continuous — plus losses, plus float-charge headroom. Real chargers are
                sized at 5-10% of bank capacity (so 5-10 A for a 100 Ah bank) to comfortably meet the
                requirement.
              </li>
              <li>
                <strong>Charger technology.</strong> Constant-voltage current-limited (CVCC) chargers
                with temperature compensation are standard for lead-acid; lithium-ion uses a more
                complex profile managed by the BMS (battery management system) integrated with the
                charger.
              </li>
              <li>
                <strong>Mains supply sizing.</strong> The mains supply to the cabinet must be sized
                for the charger maximum current plus any continuous load (the luminaires fed during
                normal operation). Typical 16-32 A dedicated final circuit for medium-sized cabinets.
              </li>
              <li>
                <strong>Heat dissipation.</strong> A charger working at full output during recharge
                produces heat. Plant-room ventilation and ambient temperature affect both charger
                output and battery life. BS EN 50171 expects the cabinet to be sited where ambient
                conditions support reliable operation.
              </li>
            </ul>
            <p>
              The 24-hour figure is not arbitrary. It is engineered to balance system readiness
              against charger / supply / battery lifecycle constraints. Designs that try to recharge
              faster (12 h, 6 h) need much larger chargers and more aggressive battery technology;
              designs that allow longer recharge are not BS EN 50171-compliant.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Battery chemistries — choosing for the application</ContentEyebrow>

          <ConceptBlock
            title="Sealed lead acid (SLA) — the workhorse"
            plainEnglish="Sealed lead acid batteries dominate emergency lighting by volume. They are well-proven, widely available, cheap per Wh, and the manufacturing supply chain is mature. The sealed (VRLA — valve-regulated lead acid) variant has no electrolyte top-up, no ventilation requirement, and is the maintenance-free standard. Typical service life is 4 years in emergency lighting duty, longer in less-cycled applications. Temperature-sensitive: hot environments halve life."
          >
            <p>SLA characteristics for emergency lighting:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Service life.</strong> Typically 4 years (some manufacturers claim 5+) in
                emergency lighting duty cycled by occasional discharge tests. Hot environments
                (consistently &gt; 25 °C) reduce life to 2-3 years.
              </li>
              <li>
                <strong>Capital cost.</strong> Lowest of the common chemistries on a £/Wh basis.
                Drives self-contained luminaire prices; suits central systems where bulk capacity is
                needed.
              </li>
              <li>
                <strong>Charge management.</strong> Standard CVCC with temperature compensation. No
                BMS required at the cell level. Float and equalisation managed by the charger.
              </li>
              <li>
                <strong>Recharge time.</strong> Meets the BS EN 50171 24 h / 80% requirement
                comfortably with appropriately sized charger. Full recharge typically 24-48 h.
              </li>
              <li>
                <strong>Energy density.</strong> Lower than lithium-ion (≈ 30-40 Wh/kg vs 100-200+
                Wh/kg for Li-ion). Larger and heavier for the same Wh. Acceptable for floor-standing
                cabinets; noticeable in luminaire-integrated applications where size matters.
              </li>
              <li>
                <strong>End-of-life behaviour.</strong> Capacity declines gradually then drops more
                sharply near end-of-life. Capacity test catches it; visual inspection rarely does.
              </li>
            </ul>
            <p>
              SLA is the right answer for the majority of UK emergency lighting installations as at
              2026 — particularly small-to-medium self-contained, and central battery systems where
              floor-standing cabinet space is available. It is the default unless lithium-ion's
              specific advantages (size, weight, life) justify the higher capital.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Lithium-ion — the rising challenger"
            plainEnglish="Lithium-ion batteries are taking share at the premium end of the emergency lighting market. The dominant chemistries are lithium iron phosphate (LiFePO4) and lithium nickel manganese cobalt (NMC). Service life is materially longer than SLA (5-10 years typical), energy density is much higher (smaller, lighter), recharge is faster, and temperature tolerance is wider. Capital cost is higher per Wh but lifecycle cost can be lower at scale because of longer service life and lower replacement labour."
          >
            <p>Lithium-ion characteristics for emergency lighting:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Service life.</strong> Typically 5-10 years in emergency lighting duty.
                LiFePO4 has the longest cycle life (very stable, less degradation per cycle). NMC has
                higher energy density but shorter cycle life.
              </li>
              <li>
                <strong>Capital cost.</strong> Higher than SLA per Wh — typically 2-3× as at 2026.
                Trend is downward as production scales.
              </li>
              <li>
                <strong>Charge management.</strong> Requires BMS (battery management system) at cell
                or module level. Monitors voltage, current, temperature, cell balance. Cabinet
                charger is integrated with BMS protocol. More complex than SLA charging.
              </li>
              <li>
                <strong>Recharge time.</strong> Faster than SLA — typically 4-8 hours to 80% with
                appropriately sized charger. Comfortably meets BS EN 50171.
              </li>
              <li>
                <strong>Energy density.</strong> 3-5× SLA at the cell level. The battery for a given
                Ah at given V is much smaller and lighter — important in luminaire-integrated
                applications.
              </li>
              <li>
                <strong>Temperature tolerance.</strong> Wider than SLA at moderate temperatures.
                Cold-weather performance better than SLA. High-temperature behaviour variable by
                chemistry — LiFePO4 is more thermally stable than NMC.
              </li>
              <li>
                <strong>End-of-life behaviour.</strong> Capacity declines slowly, more linearly than
                SLA. End-of-life is often defined as 80% of original capacity — at which point the
                battery is replaced even though it is still functional.
              </li>
              <li>
                <strong>Safety considerations.</strong> Lithium-ion has thermal runaway potential
                under abuse (overcharge, physical damage, manufacturing defect). LiFePO4 is more
                stable than NMC. BS EN 50171:2021 requires appropriate cell protection and BMS for
                the chosen chemistry.
              </li>
            </ul>
            <p>
              Lithium-ion is the right answer where lifecycle cost matters more than capital cost
              (long service life applications), where size and weight matter (luminaire-integrated),
              or where the maintenance regime favours fewer, longer-life batteries. It is being
              specified more often in 2026 as the cost differential narrows.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Other chemistries — niches and legacy"
            plainEnglish="Two other chemistries appear in emergency lighting, both in narrower niches than SLA or lithium-ion."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Nickel-cadmium (NiCd).</strong> Long service life (15-20 years possible),
                very wide temperature tolerance, robust under abuse. Used in extreme-temperature
                applications (rail trackside, marine, outdoor) and very-long-life critical systems.
                Disadvantages: cadmium environmental impact (restricted under EU/UK environmental
                directives), higher capital cost, lower energy density than lithium-ion. Largely
                being phased out of mainstream emergency lighting; persists in specific niches.
              </li>
              <li>
                <strong>Nickel-metal hydride (NiMH).</strong> Avoids the cadmium environmental issue
                but offers limited advantages over lithium-ion, which has better energy density and
                longer life. Rare in modern emergency lighting installations.
              </li>
            </ul>
            <p>
              For most UK emergency lighting designs in 2026, the realistic choice is SLA or
              lithium-ion. NiCd is justified only in specific applications; NiMH rarely.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Sizing the battery for the calculated load with no ageing factor"
            whatHappens="A central battery is sized using P × t / V only — no efficiency, no ageing factor. The bank is specified at exactly the calculated Ah. The system passes commissioning at year zero with marginal capacity. Year 1: capacity declines slightly; system still passes annual 3-hour duration test, just. Year 2: capacity at ≈ 90% of original; duration test fails by 10-15 minutes. Year 3: capacity at ≈ 85%; duration test fails by 30 minutes. Year 4: capacity at ≈ 80%; duration test fails the 3-hour requirement entirely. The battery has to be replaced two years earlier than design life because it was sized without margin for ageing."
            doInstead="Apply BOTH efficiency (typically 0.9 for inverter losses) AND ageing factor (1.25 for SLA). The battery is then specified at ≈ 1.25/0.9 = 1.39× the basic load × duration calculation — about 39% larger. It passes commissioning with margin, holds duration through years 1-4, and is replaced on schedule. The bigger battery costs more upfront; the smaller battery costs more in early replacement and missed duration tests. The standard sizing formula exists for a reason."
          />

          <CommonMistake
            title="Using a SLA charger for a lithium-ion battery (or vice versa)"
            whatHappens="A central battery cabinet is upgraded with a lithium-ion battery for longer service life. The cabinet charger is the original SLA-profile CVCC charger; the BMS is not properly integrated. The lithium-ion battery is initially happy — it accepts the charge — but the SLA-profile constant-voltage levels are wrong for lithium-ion cell chemistry. Cell balancing fails. After 12-18 months the lithium-ion battery exhibits reduced capacity, cell imbalance, and eventually thermal events on charge. The 'longer service life' lithium-ion is failing faster than the SLA it replaced — because the charger is wrong."
            doInstead="Battery and charger are a system. Specify them together. A lithium-ion battery requires a lithium-ion-profile charger with BMS protocol integration. A SLA charger requires a SLA battery. Cabinet retrofits to lithium-ion need the charger replaced too. Mixing chemistries with the wrong charger profile damages the new battery and undermines the whole upgrade. Manufacturers offer matched battery + charger packages for this reason."
          />

          <Scenario
            title="A retrofit upgrade — SLA to lithium-ion in a 25-year campus"
            situation="A university campus has a central battery system serving emergency lighting across multiple buildings. The original 1998 install used vented lead-acid; this was replaced in 2010 with sealed VRLA. The current 2026 plan is to replace the SLA bank with lithium-ion to extend service intervals from 4 years to 8-10 years."
            whatToDo="Treat the upgrade as a system change, not just a battery swap. (1) Confirm the cabinet is BS EN 50171:2021 compliant or upgrade to one that is. (2) Specify lithium-ion battery (typically LiFePO4 for safety/cycle life) sized via the standard formula with ageing factor 1.10-1.15 (lower than SLA because lithium-ion holds capacity better). (3) Replace the charger with a lithium-ion-profile unit with BMS integration. (4) Verify the plant-room ventilation and ambient temperature suit the new chemistry. (5) Recommission the system per BS EN 50172:2024 — full discharge test, full recharge test, monitoring + alarms test. (6) Update the as-built drawings and operating manual. (7) Review the maintenance schedule — lithium-ion needs less frequent capacity testing but cell-level monitoring is more important. The capital cost is higher but the lifecycle saving over the next 15-20 years is substantial because the battery does not need replacing twice in that period."
            whyItMatters="A naive battery swap (lithium-ion cells in the existing cabinet with the existing SLA charger) damages the new battery. A well-managed upgrade (battery + charger + commissioning + documentation) realises the lifecycle saving. The choice between SLA and lithium-ion is real engineering with real consequences."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Date labels and end-of-life planning</ContentEyebrow>

          <ConceptBlock
            title="The battery date label"
            plainEnglish="Modern emergency lighting batteries (and luminaires with integrated batteries) carry a date label showing manufacture date or installation date. The label is the planning trigger for end-of-design-life replacement. Combined with self-test data and capacity test results, it tells the maintenance team when to schedule replacement. The 2025 emergency lighting code aligns with the BS 5839-1:2025 fire alarm date-label requirement — both life-safety systems treat battery date as a primary maintenance datum."
          >
            <p>The date-label workflow:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>At installation.</strong> Record the battery manufacture date and installation
                date in the as-built / commissioning record. The label remains on the battery for
                future inspection.
              </li>
              <li>
                <strong>At each annual duration test.</strong> Read the battery date alongside the
                capacity test result. Track capacity vs age. A battery passing capacity at year 1
                is normal; one passing marginally at year 3 is approaching end-of-life.
              </li>
              <li>
                <strong>At year design-life - 1 (e.g. year 3 for SLA).</strong> Schedule replacement
                in the next year's maintenance budget. Order batteries; plan access; coordinate with
                facilities team.
              </li>
              <li>
                <strong>At year design-life (e.g. year 4 for SLA).</strong> Replace battery whether
                or not it has technically failed a test. Capacity is declining and the next test
                cycle is at risk. Proactive replacement avoids reactive failures.
              </li>
              <li>
                <strong>At capacity test failure (any year).</strong> Replace immediately regardless
                of date label. The label is a planning aid; the test is the ground truth.
              </li>
            </ul>
            <p>
              The date label and the capacity test work together. Neither alone is sufficient. Date
              label without capacity test misses early failures (manufacturing defects, hot
              environments halving life). Capacity test without date label misses planning — you
              know it failed but you did not see it coming. Both together gives a managed
              maintenance regime.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · 5-year photometric check"
            clause={
              <>
                In addition to the routine functional and duration tests, the emergency lighting
                installation shall be subject to a photometric verification at intervals not
                exceeding 5 years, confirming that the luminaires deliver the design illuminance
                values specified in BS EN 1838 for escape route, open area, and high-risk task areas.
                The photometric verification shall be documented and retained.
              </>
            }
            meaning="The 5-year photometric check is NEW in BS 5266-1:2025. It addresses a gap in the traditional functional + duration regime: a luminaire whose lamp has aged could pass duration (it still illuminates) but fail to deliver the BS EN 1838 lux required on the escape route. The photometric check audits the actual delivered illuminance, end-of-life. It is the outcome verification that the battery sizing assumes."
          />

          <SectionRule />

          <ContentEyebrow>Maintenance-free vs maintainable batteries</ContentEyebrow>

          <ConceptBlock
            title="The two operational classes"
            plainEnglish="Batteries for emergency lighting fall into two broad operational classes: maintenance-free (sealed) and maintainable (vented). The choice affects plant-room space, ventilation, maintenance labour, and service life."
          >
            <p>Maintenance-free batteries:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Examples.</strong> Sealed VRLA (valve-regulated lead acid) including SLA and
                AGM (absorbed glass mat) sub-types; lithium-ion; sealed nickel-cadmium.
              </li>
              <li>
                <strong>Operation.</strong> Sealed cells with no electrolyte top-up. Internal
                recombination of gases; no significant venting in normal use. No specific gravity
                measurement; no equalisation discharge; no per-cell maintenance.
              </li>
              <li>
                <strong>Plant-room.</strong> Cabinet-mountable; no battery-room ventilation
                requirement (small relief vent for fault conditions only). Compact installation.
              </li>
              <li>
                <strong>Maintenance labour.</strong> Visual inspection and capacity testing only.
                Replacement at end-of-design-life as a unit (no individual cell work).
              </li>
              <li>
                <strong>Service life.</strong> 4 years SLA, 5-10 years lithium-ion typical for
                emergency duty.
              </li>
            </ul>
            <p>Maintainable batteries:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Examples.</strong> Vented lead-acid (flooded cell type), some industrial
                vented NiCd.
              </li>
              <li>
                <strong>Operation.</strong> Open electrolyte accessible for top-up with distilled
                water; periodic equalisation discharge; specific gravity measurement with hydrometer
                to track cell health.
              </li>
              <li>
                <strong>Plant-room.</strong> Dedicated battery room with hydrogen ventilation (cells
                produce hydrogen on charge; concentrations must stay below explosive limits). Larger
                footprint; higher capital cost on installation.
              </li>
              <li>
                <strong>Maintenance labour.</strong> Substantially higher than maintenance-free.
                Quarterly or annual electrolyte checks; equalisation discharges; hydrometer testing;
                cell-level fault diagnosis.
              </li>
              <li>
                <strong>Service life.</strong> 15-20 years possible with proper maintenance — much
                longer than maintenance-free. The whole-life cost can be lower despite higher
                maintenance labour, because batteries are not replaced as often.
              </li>
            </ul>
            <p>
              Modern UK emergency lighting installations almost universally use maintenance-free
              batteries. Maintainable persists in some long-life critical applications (utilities,
              rail, telecoms backup) but is rare in commercial buildings. The decision is driven by
              the plant-room available, the maintenance team skill, and the lifecycle economics over
              service life.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'BS 5266-1:2025 standard non-domestic minimum autonomy = 3 hours. 1 h / 2 h options exist for specific cases; default to 3 h unless risk assessment justifies less.',
              'Battery sizing formula: Cmin = (P × t) / (V × η) × ageing factor. Apply BOTH efficiency (≈ 0.9) AND ageing factor (1.25 SLA, 1.10-1.15 Li-ion).',
              'BS EN 50171:2021 / BS EN 50172:2024 require recharge to ≥ 80% rated capacity within 24 hours of full discharge.',
              'End-of-discharge voltage is the operating floor — 1.75-1.80 V/cell typical for SLA. Battery capacity is rated AT this point; sizing must use the same reference.',
              'SLA dominates the volume market — well-proven, cheap, ≈ 4-year life. Sensitive to temperature; hot environments halve life.',
              'Lithium-ion is taking share at the premium end — longer life (5-10 years), smaller, lighter, more complex BMS, higher capital cost.',
              'NiCd persists in extreme-temperature niches; NiMH rare in modern emergency lighting.',
              'Maintenance-free (sealed VRLA / Li-ion) dominates modern installations. Maintainable (vented) persists in some 15-20 year service-life applications.',
              'Battery date labels trigger replacement planning at end-of-design-life. Combined with capacity test results, they drive the maintenance schedule.',
              'Battery and charger are a system. Replacing the battery without matching the charger profile (SLA vs Li-ion) damages the new battery.',
              'BS 5266-1:2025 5-year photometric check audits BS EN 1838 lux at end-of-life — the outcome verification of the battery sizing.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Why is 3 hours the standard autonomy and not 1 hour?',
                answer:
                  'The 3-hour figure recognises real-world evacuation profiles — door congestion, occupant immobility, simultaneous evacuation of multiple zones, fire-fighting duration, post-event search. A 1-hour system that just covers the bare evacuation walking-time fails when reality intrudes. BS 5266-1:2025 sets 3 hours as the default; shorter durations require a specific risk assessment justifying the step-down.',
              },
              {
                question: 'What is the typical efficiency factor in the battery sizing formula?',
                answer:
                  'For inverter-fed systems (typical of central battery), efficiency is typically 0.85-0.95 — representing losses in the inverter/driver between battery and lamp output. A figure of 0.9 is a common default. For self-contained luminaires the equivalent figure is the driver efficiency from battery to LED output, also typically 0.85-0.95. Modern LED drivers tend to higher efficiency than older fluorescent inverters.',
              },
              {
                question: 'Why is the SLA ageing factor 1.25 and not higher or lower?',
                answer:
                  'It compensates for the typical 20% capacity loss over 4-year service life — a battery rated 100 Ah delivers ≈ 80 Ah at end-of-life. Sizing at 1.25 × calculated capacity means the as-installed bank has 25% margin which decays to 0% margin at end-of-life, just meeting the duration requirement at year 4. Lithium-ion holds capacity better (typically 80% retained at 5-10 years), so the ageing factor is lower at 1.10-1.15.',
              },
              {
                question: 'Can I use a battery rated for cyclic duty in an emergency lighting application?',
                answer:
                  'You can use it but it is mismatched. Emergency lighting batteries are STANDBY duty — float charge for years, occasional discharge for testing or real events. Cyclic-duty batteries are designed for repeated deep cycles (electric vehicles, golf carts) and do not optimise for the long-float / occasional-discharge profile. Use a battery specifically rated for STANDBY emergency duty — the manufacturer datasheet will state the duty type and the expected service life under that duty.',
              },
              {
                question: 'How do I size the charger for a given battery bank?',
                answer:
                  'The charger must be capable of delivering ≥ 80% of battery rated capacity within 24 hours of full discharge, plus the continuous load current during normal operation. Practical charger sizing is typically 5-10% of bank rated capacity in continuous output current — for a 100 Ah bank that is 5-10 A. Larger chargers give faster recharge and more thermal headroom; smaller ones may struggle to meet the 24 h / 80% requirement under worst-case conditions.',
              },
              {
                question: 'What happens to battery life in a hot plant room?',
                answer:
                  'SLA service life roughly halves for every 8-10 °C above 25 °C ambient. A 4-year battery in a 35 °C plant room may give only 2 years. The chemistry behind this is increased rates of grid corrosion and electrolyte degradation. Mitigation: site the battery in a cool plant room (≤ 25 °C), provide ventilation, derate the design service life if cool conditions cannot be guaranteed. Lithium-ion is more tolerant but still benefits from cool conditions.',
              },
              {
                question: 'How does the new BS 5266-1:2025 5-year photometric check relate to battery sizing?',
                answer:
                  'Battery sizing assumes the luminaire delivers rated lumen output throughout the autonomy duration. Over service life the lamp output may decline (lumen depreciation), and at end-of-life the actual delivered illuminance on the escape route may fall below the BS EN 1838 lux requirement even though the duration test passes. The 5-year photometric check audits the actual delivered illuminance — the outcome verification. Battery sizing remains as before; the photometric check verifies the assumption is still true at year 5.',
              },
              {
                question: 'When is lithium-ion the right choice over SLA?',
                answer:
                  'Lithium-ion is preferred when (a) lifecycle cost matters more than capital cost (long service-life applications, large installations), (b) size and weight matter (luminaire-integrated applications), (c) recharge speed matters (frequent test discharges, multi-event scenarios), or (d) the maintenance regime favours fewer, longer-life batteries. SLA remains preferred when capital cost dominates (small installations, value market), the supply chain matters (SLA is universally available), or the application is well-served by 4-year service life.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Battery sizing and autonomy duration — Module 4.3" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-4-section-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.4 Circuit segregation
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default EmergencyLightingModule4Section3;
