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
    id: 'fam2-s1-ionisation',
    question:
      'Why is ionisation smoke detection now uncommon in new BS 5839-1:2025 designs, and what is the modern alternative for the same application?',
    options: [
      'It is too expensive.',
      'Ionisation chambers contain a sealed source of Americium-241 (an alpha-emitter). The radioactive source triggers waste-disposal, transport and end-of-life duties under the Environmental Permitting Regulations and the Radioactive Substances Act, plus user reluctance about radioactivity in occupied premises. The modern alternative is the optical (photoelectric) point detector or, where fast-flaming detection is also wanted, the optical + heat multi-sensor configured to mode O+H. The detection performance for slow smouldering fires is broadly comparable; the regulatory burden is removed.',
      'Optical detectors detect heat better.',
      'Ionisation is banned outright.',
    ],
    correctIndex: 1,
    explanation:
      'Ionisation detectors remain technically permitted and standards-compliant, but the radioactive-source duty has driven the market to optical and multi-sensor alternatives. BS 5839-1:2025 does not prohibit ionisation; it just no longer treats it as the default. Designers should record the detector type and operating mode under clause 20.11 regardless of which chamber technology is chosen.',
  },
  {
    id: 'fam2-s1-multi',
    question:
      'A multi-sensor detector is configured to operate ONLY when both heat and smoke are sensed simultaneously. What is the maximum mounting height permitted?',
    options: [
      'The smoke-detector limit (10.5 m for an A1R configuration).',
      'The HEAT-detector limit. Per BS 5839-1:2025 clause 17 (ceiling heights — table 3), if a multi-sensor is configured to require both heat AND smoke for an alarm, the controlling sensor for ceiling-height purposes is the one that responds latest — the heat element. The mounting height is limited to the heat-detector value (typically 7.5 m or 9 m depending on class), NOT the smoke-detector value. Configuring a multi-sensor in this conservative mode is sometimes done to suppress nuisance smoke alarms, but the ceiling-height implication is real.',
      'There is no height limit on multi-sensors.',
      '15 m, the beam-detector limit.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5839-1:2025 clause 17 clarifies that the controlling height limit follows the slowest-responding element configured to trigger the alarm. The lowest sensitivity drives the limit. Designers must record the operating mode (clause 20.11) so the commissioning engineer can verify the ceiling-height assumption used in the design.',
  },
  {
    id: 'fam2-s1-beam',
    question: 'A beam smoke detector is the right answer in which scenario?',
    options: [
      'A small office (<60 m²).',
      'A large open volume where point detectors cannot be reasonably mounted within 10.5 m of the ceiling — typical examples include warehouses, atria, sports halls, theatres and cathedral roofs. A reflective beam detector projects an infrared beam from a transmitter/receiver unit at one end of the volume to a passive reflector at the other. Smoke crossing the beam attenuates the signal; an alarm is generated when the obscuration exceeds the configured threshold. One beam can cover a long, narrow volume (typically up to 100 m beam length with appropriate spacing rules).',
      'A residential bedroom.',
      'A bathroom.',
    ],
    correctIndex: 1,
    explanation:
      'Beam detectors fill a specific gap: large open volumes where ceiling height makes point detection impractical. They are NOT the default — point detection is the default — but they are the right tool when the geometry demands it. BS 5839-1:2025 retains the beam detector recommendations from earlier editions; spacing rules require careful calculation of beam path and lateral coverage.',
  },
  {
    id: 'fam2-s1-co',
    question:
      'A CO (carbon monoxide) fire detector to BS EN 54-26 is being proposed for a hotel bedroom. Is this a fire detector or a domestic CO alarm?',
    options: [
      'They are the same.',
      'They are DIFFERENT products with different roles. A CO FIRE detector to BS EN 54-26 senses the elevated CO levels produced by smouldering combustion of common materials (wood, soft furnishings) and reports a FIRE signal to the CIE. A domestic CO ALARM to BS EN 50291 senses CO from incomplete combustion in flueless or faulty fuel-burning appliances and reports a TOXIC GAS signal locally. Fitting a BS EN 50291 alarm in place of a BS EN 54-26 fire detector is a category-of-product error: it would warn of boiler CO, not of smouldering soft furnishings, and it would not signal the fire alarm panel.',
      'CO is never used in fire alarm systems.',
      'BS EN 54-26 is for domestic use only.',
    ],
    correctIndex: 1,
    explanation:
      'Two products, two standards, two failure modes. BS EN 54-26 CO fire detectors are integrated into a BS 5839-1 system. BS EN 50291 CO alarms are stand-alone fuel-burning-appliance safety devices. Conflating them is one of the more common procurement errors on residential/HMO contracts.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What does BS 5839-1:2025 clause 20.11 require the designer to record about each detector?',
    options: [
      'Only the manufacturer.',
      "The selection of detector type AND configuration. Where detection can be set to a number of different operating modes (e.g. a multi-sensor with several response characteristics), the designer must record the chosen type and mode. The information must be made available to the commissioning technician and recorded in the system's operating and maintenance manual. Annex D, Figure D.1 gives a suitable means of recording.",
      'Just the mounting height.',
      'Only smoke-detector settings.',
    ],
    correctAnswer: 1,
    explanation:
      'Clause 20.11 is one of the most operationally significant changes in BS 5839-1:2025. The designer cannot simply specify "multi-sensor"; the operating mode (O, H, O+H, OR/AND logic, sensitivity) must be documented and handed over. The commissioning technician programs to that record; the maintainer verifies against it.',
  },
  {
    id: 2,
    question: 'What is the principle of operation of an OPTICAL (photoelectric) smoke detector?',
    options: [
      'It measures temperature.',
      'A pulsed infrared LED inside a labyrinth chamber emits light into a sensing volume. A photodiode sits at an ANGLE to the LED — out of the direct path — so under clean-air conditions almost no light reaches it. When smoke particles enter the chamber, light is SCATTERED off the particles and a portion reaches the photodiode. The photodiode current rises in proportion to particle concentration; an alarm is generated when the threshold is exceeded. The chamber labyrinth is engineered to admit smoke but exclude ambient light and large insects.',
      'It detects ionisation current changes.',
      'It uses a radioactive source.',
    ],
    correctAnswer: 1,
    explanation:
      'Light-scatter is the principle. Optical detectors are sensitive to large smoke particles characteristic of smouldering fires (cotton, polyurethane foam) and less sensitive to small particles characteristic of clean-flaming fires (paper, alcohol). Multi-sensor and ionisation alternatives address that selectivity gap.',
  },
  {
    id: 3,
    question:
      'Per BS EN 54-5, what does the heat-detector class designation (A1, A2, B, C, D, E, F, G) define?',
    options: [
      'The colour.',
      "The static (fixed-temperature) response point and the maximum application temperature. A1 has the lowest static response (54-65 °C) for normal occupied spaces; class G has the highest (110-129 °C) for boiler rooms and similar high-ambient locations. Letters with an 'R' suffix (e.g. A1R) indicate the detector ALSO has a rate-of-rise element. The class is selected against the worst-case ambient temperature of the protected area, leaving sufficient margin to avoid spurious operation while preserving fast response to fire.",
      'The IP rating.',
      'The colour code only.',
    ],
    correctAnswer: 1,
    explanation:
      'Heat-detector class is one of the few fire-detection parameters where the wrong choice produces immediate, observable failure: an A1 in a boiler room cycles into alarm every time the boiler runs; a class G in a bedroom never catches a slow smouldering fire. Match the class to the ambient.',
  },
  {
    id: 4,
    question:
      'Which BS EN 54 product standard applies to NON-RESETTABLE linear (line-type) heat detectors?',
    options: [
      'BS EN 54-5.',
      'BS EN 54-28. NEW recognition in BS 5839-1:2025 (clause 8 system components). Non-resettable line-type heat cable is a continuous sensing cable along which the insulation breaks down at a defined temperature; once triggered, the cable section must be replaced. Used in cable trays, transformer rooms and tunnels where point detection cannot follow the linear hazard. Resettable line-type cable (which uses electronic interrogation along the cable to detect localised heat) is covered by the partner standard BS EN 54-22.',
      'BS EN 54-22.',
      'BS EN 54-7.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5839-1:2025 added BS EN 54-22 (resettable) and BS EN 54-28 (non-resettable) to the normative references. Recognising both gives designers a sanctioned product standard for two distinct linear-heat technologies that the 2017 edition referenced informally.',
  },
  {
    id: 5,
    question:
      'What is an aspirating smoke detection (ASD) system, and where is it the right answer?',
    options: [
      'A regular point detector.',
      'A high-sensitivity smoke detection technology (sometimes branded VESDA after a leading manufacturer). A network of small-bore sampling pipes draws air from the protected volume back to a centralised, very-high-sensitivity laser/optical detection chamber. Sensitivity is typically 10x to 100x that of a point detector. Used in (a) IT rooms, data centres and clean rooms where very early warning of overheating insulation is needed, (b) high-airflow environments where smoke would be rapidly diluted before reaching ceiling-mounted point detectors, (c) high-ceiling/aesthetic-sensitive areas where pipe sampling is preferable to surface-mounted point detectors.',
      'A type of beam detector.',
      'A heat-only detector.',
    ],
    correctAnswer: 1,
    explanation:
      'ASD is not a beam detector and is not a point detector — it is a sampling technology. Its sensitivity advantage matters where (a) the airflow would dilute smoke at the ceiling, (b) the consequence of late detection is loss of unique data, or (c) point detectors cannot be located. Spacing and pipe-network design are governed by manufacturer guidance and BS 5839-1 detection-zoning rules.',
  },
  {
    id: 6,
    question:
      'Why does BS 5839-1:2025 (in its commentary on clause 20 and clause 33) prefer multi-sensor detectors where there is a known risk of false alarms from point smoke?',
    options: [
      'Multi-sensors are cheaper.',
      'A multi-sensor (typically optical + heat, sometimes optical + heat + CO) requires evidence from MORE THAN ONE sensing element before declaring alarm. A short-lived smoke event from cooking aerosol or steam will trigger the optical element but not the heat element; the AND logic suppresses the false alarm. A real fire produces both smoke AND elevated heat; the multi-sensor responds. The result is materially fewer false alarms than a comparable point smoke detector while preserving (or improving) real-fire response. Clause 33 explicitly recommends multi-sensor as a measure to limit unwanted alarms.',
      'They consume less power.',
      'They are easier to service.',
    ],
    correctAnswer: 1,
    explanation:
      'False-alarm management drove the market shift to multi-sensor as the modern default. Clause 20.11 then requires the designer to record the operating mode — because a multi-sensor configured to OR-logic behaves as smoke-only and offers none of the false-alarm benefit. Mode is everything.',
  },
  {
    id: 7,
    question:
      'A multi-sensor is configured to "smoke OR heat" logic (alarm on whichever element triggers first). What does this configuration buy you?',
    options: [
      'Nothing.',
      'FAST response. The detector declares alarm on the FIRST element to trigger, whichever it is. Used where speed-of-response matters more than false-alarm suppression — for example, in escape routes where an early alarm is essential. Drawback: each element operates independently of the other, so the false-alarm benefit of AND logic is forfeited. Optical false alarms still translate to system false alarms. Mode selection is a design trade-off; clause 20.11 requires it to be recorded.',
      'Lower power consumption.',
      'Smaller detector size.',
    ],
    correctAnswer: 1,
    explanation:
      'OR vs AND vs MAJORITY-VOTE is the multi-sensor design lever. OR favours speed; AND favours false-alarm suppression. Most modern panels can run different modes by area (e.g. AND in kitchens-adjacent corridors, OR in escape stairwells). Clause 20.11 documentation captures this per device.',
  },
  {
    id: 8,
    question:
      'In a hotel bedroom (Category L1 or L2 with sleeping risk), is a HEAT detector permitted under BS 5839-1:2025?',
    options: [
      'Yes, always.',
      'NO — for new works. Clause 14 (selection and application) makes clear that heat detectors are no longer permitted in rooms in which people sleep, in either L1, L2 or L3 categories. The reasoning is that a slow smouldering fire (e.g. soft-furnishing fire from a discarded cigarette, charging-cable fault) can produce lethal smoke long before the heat threshold is reached. Smoke or multi-sensor detection is required. The change is NOT retrospective — existing systems do not have to be ripped out — but ANY new works (new build, refurbishment, extension, modification) must comply.',
      'Yes, if it is rate-of-rise.',
      'Yes, if combined with a smoke alarm in the corridor.',
    ],
    correctAnswer: 1,
    explanation:
      'This is one of the most consequential category-5 changes in 2025: heat detection is now off the table for new sleeping-risk areas. The change recognises that bedroom fires are characteristically smouldering, low-temperature events whose victims succumb to smoke before the heat element ever responds. Always specify smoke or smoke-multi for new bedroom installs.',
  },
  {
    id: 9,
    question:
      'What is the difference between a "fixed-temperature" heat detector and a "rate-of-rise" heat detector?',
    options: [
      'Identical.',
      'DIFFERENT response triggers. A FIXED-TEMPERATURE heat detector triggers at a specific static temperature (e.g. 58 °C for class A1). A RATE-OF-RISE detector triggers when the rate of temperature rise exceeds a threshold (typically around 8 °C/min) — it can therefore respond at a LOWER absolute temperature than the fixed point, provided the rate is high. Most modern heat detectors are COMBINED (e.g. A1R, A2S/R) — they trigger on either the static threshold OR the rate-of-rise. Combined detectors give faster response to rapidly developing fires while still catching slow temperature rises that approach the static point.',
      'Heat detectors only do one of these.',
      'Rate-of-rise is a smoke detector function.',
    ],
    correctAnswer: 1,
    explanation:
      'The class designation tells you which: A1, A2, B... = fixed only; A1R, A2R... = combined fixed + rate-of-rise. The "R" matters operationally — rate-of-rise gives faster response to flaming fires but can produce nuisance trips in environments with rapid legitimate temperature swings (cookers, vehicle exhaust).',
  },
  {
    id: 10,
    question:
      'A multi-sensor detector with optical + heat + CO sensing offers the FASTEST and most RELIABLE detection across the broadest fire signature. Why is it not the default for every application?',
    options: [
      'It is illegal.',
      'Cost and operating-mode complexity. A three-element multi-sensor is materially more expensive per device than a basic optical or O+H multi-sensor. The CO element also adds servicing burden — the CO cell has a finite life (typically 5-10 years) and must be replaced, recorded and tested as part of maintenance. The DESIGN benefit (very high false-alarm immunity, very fast response across smouldering and flaming signatures) is worth the cost in critical applications: hotel corridors, healthcare wards, stand-alone kitchens. In low-risk offices the cost-benefit goes the other way. Clause 14/20.11 record the choice and rationale.',
      'They cannot be wired to any panel.',
      'They are only for industrial use.',
    ],
    correctAnswer: 1,
    explanation:
      'The "most-sensors-wins" view is wrong. Each sensing element adds cost, mode-complexity, and a service-life consideration. Multi-sensor selection is a risk-and-cost trade-off, recorded under clause 20.11 so that the design rationale is auditable.',
  },
];

const FireAlarmModule2Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Detector technologies | Fire Alarm Module 2.1 | Elec-Mate',
    description:
      'BS 5839-1:2025 detector technologies: ionisation and optical smoke, point and rate-of-rise heat, BS EN 54-22/-28 line-heat, BS EN 54-26 CO, multi-sensor selection per clause 20.11, and aspirating systems.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 1"
            title="Detector technologies"
            description="The chamber, the heat element, the CO cell, the line-heat cable, the aspirating pipe-network — six fundamentally different ways of sensing fire. BS 5839-1:2025 recognises all of them, but clause 20.11 puts the designer on the hook for recording type, mode and configuration."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 5839-1:2025 recognises five core detection technologies: smoke (optical, ionisation, beam, aspirating), heat (point fixed and rate-of-rise, line-type resettable BS EN 54-22 and non-resettable BS EN 54-28), CO fire (BS EN 54-26), multi-sensor (combinations of the above), and aspirating high-sensitivity (ASD).',
              'Optical (photoelectric) smoke detection is the modern default for point smoke detection — light-scatter chamber, sensitive to smouldering signatures, no radioactive source.',
              'Ionisation detection (Am-241 alpha source) remains permitted but carries radioactive-source duties; market has moved to optical and multi-sensor.',
              'BS EN 54-22 and BS EN 54-28 are NEW normative references in 2025 — formal recognition of resettable and non-resettable line-type heat cable.',
              'BS EN 54-26 CO fire detectors are NOT the same as BS EN 50291 domestic CO alarms — different products, different signals, different installations.',
              'Multi-sensor detectors are the modern preferred choice where point smoke detection is at risk of false alarms (clause 33). Operating mode (O, H, O+H, OR/AND/VOTE) must be recorded under clause 20.11.',
              'Heat detectors are NO LONGER permitted in sleeping rooms for new L1/L2/L3 work (clause 14) — smoke or multi-sensor is required.',
              'Aspirating smoke detection (ASD) is the high-sensitivity option for IT/data, high-airflow, and high-ceiling applications where point detection cannot perform.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Describe the principle of operation of optical (photoelectric) smoke detectors and explain why they are the modern default for point smoke detection',
              'Describe the principle of operation of ionisation smoke detectors and explain the regulatory burden of the Am-241 source that has driven the market shift to optical',
              'Distinguish fixed-temperature, rate-of-rise and combined heat detector classes (A1 through G, with and without "R" suffix), and select the correct class against ambient temperature',
              'Recognise BS EN 54-22 and BS EN 54-28 line-heat cable as NEW normative references in BS 5839-1:2025, and identify resettable vs non-resettable applications',
              'Distinguish BS EN 54-26 CO FIRE detectors (system-connected) from BS EN 50291 domestic CO alarms (stand-alone fuel-appliance safety) and avoid the procurement-error pattern',
              'Apply clause 20.11 documentation: record detector type AND operating mode (O, H, O+H, AND/OR/VOTE) at design and pass to commissioning',
              'Apply clause 14: heat detection is NO LONGER permitted in sleeping rooms for new L1/L2/L3 work; specify smoke or multi-sensor instead',
              'Identify when an aspirating smoke detection (ASD) system is the right tool: IT rooms, high-airflow, high-ceiling, very-early-warning applications',
              'Identify when a beam smoke detector is the right tool: large open volumes where point detection cannot be ceiling-mounted within range',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Smoke detection — optical, ionisation, beam, aspirating</ContentEyebrow>

          <ConceptBlock
            title="Optical (photoelectric) smoke detector"
            plainEnglish="An optical detector watches for light scattered off smoke particles inside a small chamber. A pulsed infrared LED shines light into the chamber. A photodiode sits at an angle to the LED — not in the direct beam — so under clean-air conditions almost no light reaches it. When smoke particles enter, they SCATTER light off the LED beam, and a portion of that scattered light reaches the photodiode. The photodiode signal rises with smoke density. When the signal exceeds the alarm threshold, the detector reports a fire. The chamber is engineered as a labyrinth: an internal maze of black-painted vanes that admits smoke through the side openings but blocks ambient light and excludes insects."
            onSite="Open up an optical detector at a maintenance visit and you will see the labyrinth chamber, the LED, and the offset photodiode. A dirty chamber accumulates dust on the labyrinth vanes and the chamber walls; the dust scatters light just like smoke and pushes the baseline up. Drift compensation in the panel handles slow accumulation; rapid changes (after building dust from construction work, for example) need cleaning at the next service."
          >
            <p>The strengths and weaknesses:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Strong on smouldering fires.</strong> Soft-furnishing, polyurethane foam,
                cotton, paper smouldering all produce LARGE smoke particles that scatter visible and
                near-IR light efficiently. The optical detector responds well.
              </li>
              <li>
                <strong>Weaker on clean-flaming fires.</strong> Alcohol, methanol and very-clean
                paper fires produce SMALL particles that scatter less light. Detection is slower
                than ionisation. This is the historical reason ionisation was preferred in some
                applications — a gap now filled by multi-sensor (optical + heat) instead of
                ionisation.
              </li>
              <li>
                <strong>False-alarm sources.</strong> Steam (water droplets), cooking aerosol,
                aerosol propellant, dust raised by sweeping. All scatter light and look like smoke
                to a single-sensor optical chamber. Multi-sensor (O+H AND-logic) eliminates most of
                these.
              </li>
              <li>
                <strong>No radioactive source.</strong> No environmental, transport or end-of-life
                radioactive-substance duty. This is the operational reason optical has replaced
                ionisation as the default.
              </li>
            </ul>
            <p>
              Optical is the headline point smoke detection technology of BS 5839-1:2025. Standalone
              optical detectors are still widely specified for low-cost, low-false-alarm-risk areas;
              the trend in higher-risk areas is to replace standalone optical with optical + heat
              multi-sensor.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 20.11 (selection and application of fire detectors — operating modes)"
            clause={
              <>
                Where detection can be set to a number of different operating modes (e.g. when a
                system incorporates multi sensor detector(s) with a number of different response
                characteristics), the designer should record the selection of the detector type and
                configuration. This information should be made available to the commissioning
                technician and recorded in the operating and maintenance manual for the system.
                NOTE: A suitable means of recording the information is given in Annex D, Figure D.1.
              </>
            }
            meaning="The designer cannot simply specify 'multi-sensor' and walk away. Operating mode (O, H, O+H, AND/OR/VOTE, sensitivity) is a designer decision that must be documented and handed over. The commissioning technician programs to that record; the maintainer verifies against it; the user inherits a maintainable system. Skipping the documentation breaks that chain — and increasingly, breaks the BS 5839-1:2025 compliance case."
          />

          <ConceptBlock
            title="Ionisation smoke detector"
            plainEnglish="An ionisation detector uses a small amount of Americium-241, a sealed radioactive isotope that emits alpha particles. The alphas ionise the air inside two small chambers — a sensing chamber open to the protected atmosphere, and a sealed reference chamber. A small voltage drives a tiny ionisation current across each chamber. When smoke particles enter the sensing chamber, they capture some of the ionised gas molecules and slow the current. The current change between sensing and reference chambers is the alarm signal. The chambers are sealed inside an aluminium can; the source is licensed and tracked from manufacture to disposal."
          >
            <p>The technology has two distinct character traits:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Strong on clean-flaming fires.</strong> Alcohol, methanol, paper
                fast-flaming produce SMALL combustion particles that ionisation chambers detect
                efficiently — sometimes faster than optical chambers see the same fire. Historically
                this is why ionisation was used in escape routes and clean storage areas.
              </li>
              <li>
                <strong>Weaker on smouldering fires.</strong> Smouldering soft furnishings produce
                large particles that have less effect on ionisation current; ionisation is therefore
                slower than optical for typical bedroom-fire signatures.
              </li>
              <li>
                <strong>Radioactive-source duty.</strong> The Am-241 source is licensed under the
                Environmental Permitting Regulations 2016 and the Radioactive Substances Act 1993.
                Transport, installation, removal and end-of-life disposal are all controlled. The
                premises operator carries documentation duties; the maintainer must handle the
                detectors as radioactive items at end of life. None of this exists for optical.
              </li>
              <li>
                <strong>Market shift.</strong> Multi-sensor detectors (optical + heat) match or
                exceed ionisation performance on most fires WITHOUT the radioactive duty. This is
                the operational reason ionisation has receded from new BS 5839-1:2025 designs even
                though it remains technically permitted.
              </li>
            </ul>
            <p>
              The standard does not prohibit ionisation; it just no longer treats it as a default.
              Where you encounter ionisation in service, treat the source as you would any
              radioactive item — handle, log and dispose under the operator&apos;s
              radioactive-substances regime.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Detector internals diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Detector internals — optical chamber, ionisation chamber, heat element
            </h4>
            <svg
              viewBox="0 0 820 540"
              className="w-full h-auto"
              role="img"
              aria-label="Three side-by-side cross-section diagrams. Left: optical detector showing labyrinth chamber, infrared LED on one side, photodiode at an angle, and smoke entering through openings. Centre: ionisation detector showing sealed Am-241 source between two chambers (sensing and reference) with measured ionisation current. Right: heat detector showing thermistor sensing element protruding into the airflow with associated electronics."
            >
              <g>
                <text
                  x="135"
                  y="44"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="13"
                  fontWeight="bold"
                >
                  OPTICAL (photoelectric)
                </text>
                <text
                  x="135"
                  y="60"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="10"
                >
                  light-scatter chamber
                </text>
                <rect
                  x="30"
                  y="80"
                  width="210"
                  height="200"
                  rx="14"
                  fill="rgba(168,85,247,0.05)"
                  stroke="#A855F7"
                  strokeWidth="2"
                />
                <rect
                  x="60"
                  y="118"
                  width="150"
                  height="124"
                  rx="10"
                  fill="rgba(0,0,0,0.4)"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="1.4"
                />
                <line
                  x1="80"
                  y1="118"
                  x2="80"
                  y2="160"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.4"
                />
                <line
                  x1="100"
                  y1="200"
                  x2="100"
                  y2="242"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.4"
                />
                <line
                  x1="170"
                  y1="118"
                  x2="170"
                  y2="160"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.4"
                />
                <line
                  x1="190"
                  y1="200"
                  x2="190"
                  y2="242"
                  stroke="rgba(255,255,255,0.3)"
                  strokeWidth="1.4"
                />
                <circle cx="78" cy="180" r="7" fill="#FBBF24" />
                <text
                  x="78"
                  y="184"
                  textAnchor="middle"
                  fill="black"
                  fontSize="8"
                  fontWeight="bold"
                >
                  L
                </text>
                <text x="48" y="184" textAnchor="end" fill="#FBBF24" fontSize="9">
                  LED
                </text>
                <line
                  x1="86"
                  y1="180"
                  x2="200"
                  y2="200"
                  stroke="#FBBF24"
                  strokeWidth="1.2"
                  strokeDasharray="3,2"
                />
                <rect x="190" y="150" width="14" height="10" rx="2" fill="#22D3EE" />
                <text x="222" y="156" fill="#22D3EE" fontSize="9">
                  photodiode
                </text>
                <circle cx="135" cy="190" r="3" fill="rgba(255,255,255,0.55)" />
                <circle cx="148" cy="186" r="2.5" fill="rgba(255,255,255,0.55)" />
                <circle cx="125" cy="195" r="2.5" fill="rgba(255,255,255,0.55)" />
                <line
                  x1="135"
                  y1="190"
                  x2="195"
                  y2="158"
                  stroke="#22D3EE"
                  strokeWidth="1.1"
                  strokeDasharray="2,2"
                />
                <text x="60" y="262" fill="rgba(255,255,255,0.7)" fontSize="9">
                  smoke entry
                </text>
                <text x="135" y="280" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                  labyrinth admits smoke, excludes light
                </text>
              </g>

              <g>
                <text
                  x="410"
                  y="44"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="13"
                  fontWeight="bold"
                >
                  IONISATION
                </text>
                <text
                  x="410"
                  y="60"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="10"
                >
                  Am-241 dual-chamber
                </text>
                <rect
                  x="305"
                  y="80"
                  width="210"
                  height="200"
                  rx="14"
                  fill="rgba(168,85,247,0.05)"
                  stroke="#A855F7"
                  strokeWidth="2"
                />
                <rect
                  x="335"
                  y="118"
                  width="78"
                  height="124"
                  rx="8"
                  fill="rgba(239,68,68,0.08)"
                  stroke="rgba(239,68,68,0.6)"
                  strokeWidth="1.4"
                />
                <text
                  x="374"
                  y="138"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="9"
                  fontWeight="bold"
                >
                  SENSING
                </text>
                <text
                  x="374"
                  y="150"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  open
                </text>
                <rect
                  x="425"
                  y="118"
                  width="78"
                  height="124"
                  rx="8"
                  fill="rgba(34,211,238,0.08)"
                  stroke="rgba(34,211,238,0.6)"
                  strokeWidth="1.4"
                />
                <text
                  x="464"
                  y="138"
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="9"
                  fontWeight="bold"
                >
                  REFERENCE
                </text>
                <text
                  x="464"
                  y="150"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  sealed
                </text>
                <circle cx="419" cy="180" r="6" fill="#FBBF24" stroke="black" strokeWidth="1" />
                <text
                  x="419"
                  y="184"
                  textAnchor="middle"
                  fill="black"
                  fontSize="7"
                  fontWeight="bold"
                >
                  Am
                </text>
                <text x="419" y="160" textAnchor="middle" fill="#FBBF24" fontSize="9">
                  Am-241 (α)
                </text>
                <line
                  x1="345"
                  y1="200"
                  x2="405"
                  y2="200"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <line
                  x1="433"
                  y1="200"
                  x2="495"
                  y2="200"
                  stroke="rgba(255,255,255,0.55)"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
                <text x="374" y="220" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  ion current ↓ on smoke
                </text>
                <text x="464" y="220" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  ion current = baseline
                </text>
                <circle cx="360" cy="170" r="2.5" fill="rgba(255,255,255,0.5)" />
                <circle cx="375" cy="178" r="2.5" fill="rgba(255,255,255,0.5)" />
                <text x="410" y="262" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  differential current = alarm
                </text>
                <text x="410" y="280" textAnchor="middle" fill="rgba(239,68,68,0.7)" fontSize="9">
                  ⚠ radioactive source duty applies
                </text>
              </g>

              <g>
                <text
                  x="685"
                  y="44"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="13"
                  fontWeight="bold"
                >
                  HEAT (point)
                </text>
                <text
                  x="685"
                  y="60"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="10"
                >
                  thermistor sensing
                </text>
                <rect
                  x="580"
                  y="80"
                  width="210"
                  height="200"
                  rx="14"
                  fill="rgba(168,85,247,0.05)"
                  stroke="#A855F7"
                  strokeWidth="2"
                />
                <line
                  x1="685"
                  y1="120"
                  x2="685"
                  y2="180"
                  stroke="rgba(255,255,255,0.7)"
                  strokeWidth="2"
                />
                <circle
                  cx="685"
                  cy="190"
                  r="14"
                  fill="rgba(239,68,68,0.18)"
                  stroke="#EF4444"
                  strokeWidth="2"
                />
                <text
                  x="685"
                  y="194"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="9"
                  fontWeight="bold"
                >
                  NTC
                </text>
                <text x="710" y="195" fill="rgba(255,255,255,0.65)" fontSize="9">
                  thermistor
                </text>
                <line
                  x1="610"
                  y1="160"
                  x2="660"
                  y2="170"
                  stroke="rgba(34,211,238,0.6)"
                  strokeWidth="1.2"
                />
                <polygon points="660,170 654,166 654,174" fill="rgba(34,211,238,0.6)" />
                <line
                  x1="610"
                  y1="210"
                  x2="660"
                  y2="200"
                  stroke="rgba(34,211,238,0.6)"
                  strokeWidth="1.2"
                />
                <polygon points="660,200 654,196 654,204" fill="rgba(34,211,238,0.6)" />
                <text x="600" y="240" fill="rgba(34,211,238,0.6)" fontSize="9">
                  heated air
                </text>
                <rect
                  x="600"
                  y="252"
                  width="170"
                  height="22"
                  rx="6"
                  fill="rgba(251,191,36,0.08)"
                  stroke="rgba(251,191,36,0.4)"
                  strokeWidth="1"
                />
                <text
                  x="685"
                  y="267"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="9.5"
                  fontWeight="bold"
                >
                  A1 / A1R / A2 / B / C / D / E / F / G
                </text>
              </g>

              <rect
                x="30"
                y="320"
                width="760"
                height="60"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
              />
              <text x="50" y="344" fill="rgba(255,255,255,0.85)" fontSize="11" fontWeight="bold">
                Multi-sensor detectors combine these elements:
              </text>
              <text x="50" y="362" fill="rgba(255,255,255,0.65)" fontSize="10">
                optical + heat (most common) · optical + heat + CO (highest false-alarm immunity) ·
                operating mode O / H / O+H / AND / OR / VOTE recorded under clause 20.11
              </text>

              <rect
                x="30"
                y="400"
                width="760"
                height="120"
                rx="12"
                fill="rgba(168,85,247,0.05)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text x="50" y="426" fill="#A855F7" fontSize="11" fontWeight="bold">
                BS 5839-1:2025 normative product standards
              </text>
              <text x="50" y="448" fill="rgba(255,255,255,0.75)" fontSize="10">
                BS EN 54-7 — point smoke (optical / ionisation)
              </text>
              <text x="50" y="464" fill="rgba(255,255,255,0.75)" fontSize="10">
                BS EN 54-5 — point heat (classes A1, A1R, A2, A2S/R, B, C, D, E, F, G)
              </text>
              <text x="50" y="480" fill="rgba(255,255,255,0.75)" fontSize="10">
                BS EN 54-12 — beam smoke (line-type optical)
              </text>
              <text x="50" y="496" fill="rgba(255,255,255,0.75)" fontSize="10">
                BS EN 54-22 — RESETTABLE line-type heat (NEW reference in 2025)
              </text>
              <text x="50" y="512" fill="rgba(255,255,255,0.75)" fontSize="10">
                BS EN 54-26 — CO fire detector · BS EN 54-28 NON-RESETTABLE line-type heat (NEW in
                2025)
              </text>
            </svg>
          </div>

          <ConceptBlock
            title="Beam (line-type optical) smoke detector — BS EN 54-12"
            plainEnglish="A beam smoke detector projects an infrared beam across a large open volume from a transmitter/receiver unit at one end to a passive reflector at the other. Under clean-air conditions the receiver sees the full beam intensity reflected back. Smoke crossing the beam path absorbs and scatters the IR energy, reducing the received signal. When the obscuration exceeds the configured percentage threshold (typically calibrated to give early warning without reacting to dust or transient occlusions), the detector reports a fire."
            onSite="Installation tolerances matter — the beam alignment must be within fractions of a degree over the path length, and the reflector must be on a structurally stable surface (not a wall that flexes with wind loading). Periodic re-alignment is part of the maintenance regime. A one-degree drift over 80 m can put the beam off the reflector entirely."
          >
            <p>The application envelope:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Large open volumes.</strong> Warehouses, atria, sports halls, theatres,
                cathedral roofs, aircraft hangars. Where ceiling height makes point detection
                impractical (above the 10.5 m smoke limit, or where mounting and access are
                impossible).
              </li>
              <li>
                <strong>Long, narrow geometries.</strong> One beam covers a corridor of volume up to
                approximately 100 m beam length, with lateral coverage governed by spacing rules
                (typically 7.5 m either side for an optimised beam). One beam can replace a row of
                30+ point detectors.
              </li>
              <li>
                <strong>Aesthetic-sensitive areas.</strong> Heritage buildings, atria with exposed
                services. The transmitter/receiver and reflector are small; the beam is invisible.
              </li>
              <li>
                <strong>Limitations.</strong> Does not work where structural elements obstruct the
                beam path; does not work where ambient dust or condensation regularly attenuates the
                beam; recovery from misalignment requires service attendance.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Aspirating smoke detection (ASD) — high-sensitivity sampling"
            plainEnglish="An aspirating system uses a small fan inside a centralised detection unit to draw air through a network of small-bore (typically 25 mm) sampling pipes. The pipes have a series of holes (sampling points) drilled along their length; air enters at each hole and is conveyed back to the central detection chamber. The chamber contains a high-sensitivity laser or optical detector — typically 10x to 100x more sensitive than a standard point detector. The geometry — many sampling points feeding one very-sensitive chamber — gives both early-warning sensitivity AND a single auditable detection point."
          >
            <p>Where ASD wins:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>IT rooms and data centres.</strong> Overheating insulation produces tiny
                quantities of smoke long before flame-out. A standard point detector at the ceiling
                would not respond until the fire was well-developed; ASD detects pre-combustion
                signatures and gives staff time to investigate the rack before a power-down decision
                is forced.
              </li>
              <li>
                <strong>High-airflow environments.</strong> Computer-room air conditioning, theatre
                stage air-handling, clean-room HVAC. Standard point detectors fail because the smoke
                is rapidly diluted before reaching the ceiling. ASD samples directly from the air
                stream, restoring the detection signal.
              </li>
              <li>
                <strong>Very-high or aesthetically-sensitive ceilings.</strong> Atria, listed-status
                spaces. Pipe sampling can run discreetly in service voids; the only visible elements
                are the small sampling holes.
              </li>
              <li>
                <strong>Cold stores.</strong> Where standard optical detectors struggle with
                condensation; ASD chambers are heated.
              </li>
            </ul>
            <p>
              ASD design and installation is a specialist sub-discipline; pipe-network length,
              sampling-hole sizing and pressure-drop calculations all come from manufacturer
              software and BS 5839-1 detection-zoning rules. The product standard is BS EN 54-20.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Heat detection — point and line-type</ContentEyebrow>

          <ConceptBlock
            title="Point heat detectors — BS EN 54-5 classes"
            plainEnglish="A point heat detector contains a temperature-sensitive element — usually a thermistor whose resistance changes sharply with temperature. The electronics monitor the thermistor signal. When the temperature reaches a configured static threshold, the detector triggers (FIXED-TEMPERATURE response). Where the detector also has a rate-of-rise element, it ALSO triggers if the temperature is rising fast even before the static threshold is reached. Combined detectors trigger on whichever response activates first."
          >
            <p>The class designation tells you the response point and ambient envelope:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>A1</strong> — static response 54-65 °C, max ambient 25 °C (typical
                living/office spaces). The lowest-temperature class — fastest response to fire,
                lowest tolerance for ambient swings.
              </li>
              <li>
                <strong>A2</strong> — static 54-70 °C, max ambient 35 °C. Wider ambient envelope for
                spaces with higher background temperature (poorly ventilated stores).
              </li>
              <li>
                <strong>B / C / D / E / F / G</strong> — successively higher static response and
                ambient envelopes. Class G has static 110-129 °C, max ambient 80 °C — for boiler
                rooms, kiln rooms and similar.
              </li>
              <li>
                <strong>R suffix</strong> (e.g. A1R, A2R) — rate-of-rise also fitted. Trigger on
                static OR on rate-of-rise (typically about 8 °C/min). Faster response to flaming
                fires.
              </li>
              <li>
                <strong>S suffix</strong> (e.g. A2S) — static-only, no rate-of-rise. Used where
                rate-of-rise would generate nuisance trips (kitchens with cookers cycling on/off).
              </li>
            </ul>
            <p>
              Class selection is the dominant heat-detector design decision. Get it wrong and the
              detector either spuriously triggers in normal operation (class too low) or fails to
              respond until the fire is well-developed (class too high). The design margin is
              between the highest expected ambient and the static response point.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 14 (the use of heat detectors — sleeping rooms)"
            clause={
              <>
                With the changes to category L2 systems now including early warning of fire to rooms
                in which occupants sleep, the use of heat detectors is no longer permitted in these
                areas. Similarly, heat detectors should now not be used in rooms where people sleep
                in a category L3 system. The new recommendation is not retrospective, so existing
                systems do not need to be changed unless they are undergoing new works (e.g. a
                system upgrade).
              </>
            }
            meaning="The most consequential category-5 change in 2025: heat detection is OFF the table for new sleeping-risk areas in L1, L2 and L3 designs. Bedroom fires are characteristically smouldering, low-temperature events whose victims succumb to smoke before the heat element ever responds. New work means new build, refurbishment, extension and modification — anything that requires a certificate. Specify smoke or smoke-multi for new bedroom installations. Existing heat-only sleeping-room installations are grandfathered until they become 'new work'."
          />

          <ConceptBlock
            title="Line-type heat detection — BS EN 54-22 and BS EN 54-28"
            plainEnglish="Line-type heat detection is a continuous sensing element that follows the linear profile of the hazard — cable trays, tunnels, transformer rooms, conveyor belts. The standard recognises two technologies: NON-RESETTABLE cable (BS EN 54-28), where the insulation breaks down at a defined temperature and triggers an alarm; once triggered, the affected section must be replaced. RESETTABLE cable (BS EN 54-22), where electronic interrogation along the cable detects localised heat events and resets after the event clears. BS 5839-1:2025 added BS EN 54-22 and BS EN 54-28 as NEW normative references — formal recognition of products that the 2017 edition mentioned only informally."
          >
            <p>Application notes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Non-resettable (BS EN 54-28).</strong> Cable trays in plant rooms, tunnels,
                conveyor systems. Single-use; an event consumes the affected length and that length
                must be replaced. Cost-effective for installations where a fire event is expected to
                require shutdown anyway.
              </li>
              <li>
                <strong>Resettable (BS EN 54-22).</strong> Same applications, but where reset after
                event without replacement is wanted. Higher unit cost, lower lifetime cost where
                events are expected to recur.
              </li>
              <li>
                <strong>Coverage.</strong> A single cable run can be hundreds of metres, addressing
                hazards that point detection cannot economically cover. The cable is specified for a
                temperature-rated alarm point (e.g. 68 °C, 88 °C, 105 °C) chosen against the
                background ambient.
              </li>
              <li>
                <strong>Limitation.</strong> Line-type heat is a HEAT detector — it does not respond
                to smoke. Use it for hazards where heat is the leading fire signature (cable trays,
                belt friction, transformer faults) and supplement with smoke or aspirating where
                smouldering is the early signature.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Multi-sensor and CO detection — modern best-of-breed</ContentEyebrow>

          <ConceptBlock
            title="Multi-sensor detectors — and why mode is everything"
            plainEnglish="A multi-sensor detector combines two or more sensing technologies into one head — most commonly optical + heat (O+H), sometimes optical + heat + CO, less commonly ionisation + heat. The PANEL programs the detector to operate on a chosen LOGIC: alarm on either element (OR), alarm only when both confirm (AND), alarm on the slower of two votes (VOTE), or specified weighting. The resulting detector behaviour is fundamentally controlled by the software mode, not by the hardware presence of multiple elements."
          >
            <p>The three principal modes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>OR-logic (alarm on first element to trigger).</strong> Fastest response.
                Optical false alarms still translate to system false alarms — false-alarm benefit is
                minimal. Used where speed-of-response matters more than false-alarm management
                (escape routes, high-life-risk).
              </li>
              <li>
                <strong>AND-logic (alarm only when BOTH confirm).</strong> Strong false-alarm
                suppression. Optical alone (steam, aerosol, dust) will not trigger; only smoke +
                heat together will. Trade-off: response is slightly slower because the heat element
                must catch up. Used in known-false-alarm-risk areas (kitchens-adjacent, cleaning-bay
                corridors).
              </li>
              <li>
                <strong>WEIGHTED / VOTE / drift-compensated.</strong> Each sensor element is
                continuously evaluated; the panel applies algorithms to balance sensitivity against
                false-alarm rejection. Behaviour is more nuanced than simple AND/OR. Manufacturer
                documentation governs the implementation.
              </li>
            </ul>
            <p>
              Clause 20.11 requires the designer to record type AND configuration. A multi-sensor in
              OR mode is, in practical terms, a smoke-or-heat detector — different behaviour from
              the same device in AND mode. The commissioning technician must know the mode to
              programme correctly; the maintainer must know the mode to test the right response.
              Skipping the documentation collapses the system to whatever the panel default happens
              to be — often not what the designer intended.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 33 (measures to limit false alarms — multi-sensor preference)"
            clause={
              <>
                Greater emphasis has been placed on the use of multi-sensor detectors. In situations
                where point smoke detectors may present a higher risk of false alarms, the 2025
                revision recommends selecting multi-sensor detectors instead. Annex D (selection and
                application of fire detectors) provides guidance on the appropriate choice of
                detector.
              </>
            }
            meaning="The market shift to multi-sensor — historically driven by manufacturer marketing — is now standardised. BS 5839-1:2025 explicitly recommends multi-sensor where smoke-FA risk is identified. The designer's job is to identify the FA risk areas (kitchens, smoking-area corridors, hairdressing salons, bedsit corridors) and specify multi-sensor with appropriate AND-logic. The cost difference (perhaps 30 percent more per device) is recovered many times over in avoided FRS attendances and avoided business disruption."
          />

          <ConceptBlock
            title="CO fire detection — BS EN 54-26 (NOT to be confused with BS EN 50291)"
            plainEnglish="A CO fire detector to BS EN 54-26 senses elevated carbon monoxide levels produced by smouldering combustion. Smouldering soft furnishings, paper, polyurethane and wood all produce CO in characteristic concentration profiles. A BS EN 54-26 detector contains an electrochemical CO cell; the cell output is processed against fire-signature algorithms (typically also incorporating temperature data). When the algorithm declares a fire, the detector reports to the CIE through the standard alarm bus. CO fire detectors are typically deployed as the C element of an O+H+C multi-sensor — providing a third orthogonal signal that further reduces false-alarm rate while extending early-warning capability for smouldering signatures."
          >
            <p>Two products that are frequently confused:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>BS EN 54-26 CO FIRE detector.</strong> Part of a BS 5839-1 system. Reports
                FIRE to the CIE. Detection algorithm is fire-signature-tuned.
              </li>
              <li>
                <strong>BS EN 50291 domestic CO ALARM.</strong> Stand-alone fuel-burning-appliance
                safety device. Reports TOXIC GAS locally. Detection algorithm is calibrated to the
                CO signature of leaking flueless appliances. Does not connect to a fire alarm panel.
              </li>
              <li>
                <strong>Procurement-error pattern.</strong> A residential/HMO contract specifies
                &quot;CO detection&quot; without distinguishing the two. The installer fits BS EN
                50291 alarms because they are cheaper. The BS 5839-1 CIE never receives a CO signal
                because the BS EN 50291 alarms are not on the loop. The system fails on
                commissioning when the test scenario is run. Fix: specify the standard explicitly.
                CO FIRE detection on a BS 5839-1 system is BS EN 54-26.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <Scenario
            title="The hotel corridor — choosing detection technology"
            situation="A 60-bedroom 4-star hotel has a long single-loaded corridor (140 m end to end) feeding into bedrooms on one side and a service core on the other. The corridor sits between the bedrooms and the housekeeping-cart bay. Corridor cleaning (vacuum dust) and aerosol use (room-freshener, laundry-aerosol) are routine. The kitchen-vent risers pass close to the corridor at one end. There have been three FRS-attendance false alarms in the previous 12 months on the existing optical-only detectors."
            whatToDo="Specify multi-sensor detection (optical + heat) configured to AND logic for the corridor sections within 10 m of the kitchen-vent risers and the housekeeping-cart bay. Specify multi-sensor in WEIGHTED mode for the remaining corridor where speed-of-response matters more (it is escape-route geometry). Document the mode per detector under clause 20.11. The corridor near the kitchen no longer trips on aerosol and steam; the corridor near the rooms keeps fast response. Bedrooms themselves get smoke detection (NOT heat — clause 14 prohibits heat in sleeping rooms for new work). The combination delivers the FA reduction the hotel needs without compromising bedroom protection."
            whyItMatters="The 'one detector type for everything' approach is what produced the three FAs in the first place. BS 5839-1:2025 expects designers to think per-area and document the choice. The mixed-mode approach — AND in FA-risk areas, weighted/OR in fast-response areas — is the response. The clause 20.11 record makes it auditable and maintainable; without it the next maintainer has no idea why kitchen-end detectors are slow and corridor-middle detectors are fast."
          />

          <CommonMistake
            title="Ionisation in a clean office — choosing the wrong technology for the wrong reason"
            whatHappens="A small commercial fit-out specifies ionisation detection because 'they were always best in offices and they are cheaper than multi-sensor'. The detectors are sourced from old stock. Two years later, the building is sold to an insurer who carries out a fire risk assessment and finds the ionisation detectors. The Am-241 source duty falls to the new occupier without warning — environmental permits, transport-of-radioactive-substances paperwork, and end-of-life disposal cost — all undocumented. The fire alarm system is technically compliant but operationally a regulatory liability."
            doInstead="Specify optical or optical+heat multi-sensor as the new-design default. Ionisation has not been actively withdrawn from the standards, but the operational cost (radioactive-source administration) is now well above the cost saving on the device. Multi-sensor detection performs at least as well across the typical office fire signature and adds false-alarm immunity. Reserve ionisation for very specific, documented design cases — and even then, record the rationale and the radioactive-source disposal plan in the operating manual."
          />

          <CommonMistake
            title="Specifying a heat detector in a new-build hotel bedroom"
            whatHappens="A new-build hotel design pre-dates the BS 5839-1:2025 publication. The original spec used heat detectors in bedrooms (an A2R class) on the basis that smoke detectors trigger on aerosol and steam from the en-suite. Construction completes after the 2025 publication; commissioning identifies the heat-in-bedroom configuration as a new-work non-compliance under clause 14. The bedrooms must be re-fitted with smoke or multi-sensor detectors before the system can be certified. Cost: 60 detector heads, 60 base re-wires, 60 commissioning re-runs."
            doInstead="Treat the BS 5839-1:2025 sleeping-room heat-detector prohibition as a hard rule for any new work. Specify smoke or optical+heat multi-sensor for new bedrooms. Steam and aerosol concerns are addressed by the AND-logic of multi-sensor (steam alone does not trigger; smoke + heat together does). The cost increase per device is a fraction of a re-fit. The historical 'heat in bedrooms because smoke trips' justification is no longer available."
          />

          <CommonMistake
            title="Specifying 'CO detection' without naming the standard"
            whatHappens="A residential-conversion specification says 'fit CO detection in each studio'. The contractor procures BS EN 50291 domestic CO alarms (cheaper) and fits them battery-powered next to each cooker. At commissioning of the BS 5839-1 system, the test engineer checks for CO inputs to the CIE and finds none. The 'CO detection' line item exists physically but is not on the fire alarm system. Re-work: replace 50291 alarms with BS EN 54-26 detectors on the loop, leaving 50291 alarms in place separately for fuel-appliance CO."
            doInstead="Always specify the product standard explicitly. 'BS EN 54-26 CO fire detector wired to the BS 5839-1 fire alarm panel' is unambiguous. 'BS EN 50291 domestic CO alarm sited within 1 m of fuel-burning appliance, battery powered, separately from the fire alarm system' is unambiguous. Without the explicit standard, the cheaper product wins the procurement and the system fails at commissioning."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Putting it together — selecting the right detector</ContentEyebrow>

          <ConceptBlock
            title="The selection decision tree"
            plainEnglish="Detector selection follows from the area type, the dominant fire signature, the false-alarm risk, and the ceiling/airflow geometry. The selection is recorded under clause 20.11 with the operating mode."
          >
            <p>A working selection sequence:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Identify the dominant fire signature.</strong> Smouldering (soft furnishing,
                paper, electrical insulation) → smoke-led detection. Flaming (alcohol, paper bin
                fires, vehicle) → fast-response smoke or O+H multi-sensor. Heat-only hazard (cable
                tray, transformer, kiln) → heat detection (point or line-type).
              </li>
              <li>
                <strong>Identify the ambient envelope.</strong> Living/office space (max ~25 °C) →
                A1/A1R class heat where heat is appropriate. Boiler/kiln (high ambient) → C/D/F/G
                class. Use ambient envelope to select heat-detector class — wrong class is the
                dominant heat-detector failure mode.
              </li>
              <li>
                <strong>Identify false-alarm risk.</strong> Kitchens, kitchen-vent zones,
                housekeeping bays, smoking-area corridors → multi-sensor with AND-logic. Recently
                converted-to-residential industrial space (ambient dust elevated) → multi-sensor or
                aspirating with drift-compensation programmed in.
              </li>
              <li>
                <strong>Identify geometry constraints.</strong> Ceiling height &gt; 10.5 m for smoke
                or &gt; 7.5 m for heat → beam (smoke) or aspirating (smoke) or relocate detection.
                Long linear hazards → line-type heat. High-airflow → aspirating.
              </li>
              <li>
                <strong>Identify sleeping-risk constraint.</strong> Any new work in a sleeping room
                (L1/L2/L3) → heat is OFF the table (clause 14). Specify smoke or multi-sensor.
              </li>
              <li>
                <strong>Record under clause 20.11.</strong> Type, mode, sensitivity, rationale.
                Annex D Figure D.1 gives a documentation template. The record passes to
                commissioning and into the operating and maintenance manual.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 17 (ceiling heights — multi-sensor implication)"
            clause={
              <>
                With the use of multi-sensors becoming more common the limits of ceiling height for
                multi-sensors has been clarified. If the multi-sensor is configured to operate ONLY
                on detection of heat AND smoke, then its maximum mounting height as per Table 3
                should be to the lowest form of detection i.e. heat.
              </>
            }
            meaning="Configuring a multi-sensor in AND logic suppresses false alarms — but the height limit for the device drops to the heat-detector value, not the smoke-detector value. If the protected space is high (above 7.5 m), AND-logic configuration may force a different detector technology. The designer must work the height limit and the FA-risk decision together; clause 20.11 requires both to be recorded."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'BS 5839-1:2025 recognises five detection technologies: smoke (optical, ionisation, beam, aspirating), heat (point fixed/rate-of-rise, line BS EN 54-22/-28), CO fire (BS EN 54-26), multi-sensor combinations, and aspirating high-sensitivity.',
              'Optical (photoelectric) is the modern default for point smoke. Light-scatter chamber, sensitive to smouldering signatures, no radioactive source.',
              'Ionisation (Am-241) carries a radioactive-source duty (Environmental Permitting Regs / RSA 1993). Permitted but no longer the operational default.',
              'Heat-detector class selection (A1 through G, with/without R suffix) is critical. Wrong class = either spurious operation or fire missed.',
              'BS EN 54-22 (resettable) and BS EN 54-28 (non-resettable) line-type heat cable are NEW normative references in 2025.',
              'BS EN 54-26 CO FIRE detector ≠ BS EN 50291 domestic CO ALARM. Different products, different standards, different signals. Specify explicitly.',
              'Multi-sensor (optical + heat, sometimes + CO) is the modern preferred technology where FA risk is identified (clause 33). MODE is everything — record it under clause 20.11.',
              'Heat detection is NO LONGER permitted in sleeping rooms for NEW L1/L2/L3 work (clause 14). Specify smoke or multi-sensor. Existing systems grandfathered until new work.',
              'A multi-sensor in AND logic forces ceiling-height limit to the HEAT-detector value, not smoke (clause 17 / Table 3). Mode and height interact.',
              'Aspirating (ASD, BS EN 54-20) is the high-sensitivity choice for IT/data, high-airflow and high-ceiling applications.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'I have heat detectors in hotel bedrooms in an existing system. Do I have to replace them now BS 5839-1:2025 is in force?',
                answer:
                  'Not yet. Clause 14 is NOT retrospective. Existing heat-only sleeping-room installations remain compliant against the 2017 edition under which they were installed. The 2025 prohibition kicks in at the point of "new work" — new build, refurbishment, extension, or modification that triggers a new certificate. At that point the affected bedrooms must be re-fitted with smoke or multi-sensor detection. Plan for the change at next major works rather than treating it as an immediate retrofit.',
              },
              {
                question: 'Are ionisation detectors banned by BS 5839-1:2025?',
                answer:
                  'No. Ionisation detection remains technically permitted. The shift away from ionisation is driven by the operational burden of the Am-241 source — environmental permitting, transport, end-of-life disposal — not by a standards prohibition. The 2025 standard does not single out ionisation for restriction. In practice, optical and multi-sensor have replaced ionisation in nearly all new BS 5839-1 designs.',
              },
              {
                question:
                  'My multi-sensor manufacturer offers six different "modes". Which do I record under clause 20.11?',
                answer:
                  'The mode you have programmed the device to operate in. The clause requires the designer to record the type AND configuration; if the manufacturer\'s mode names are non-obvious (e.g. "Mode 3", "Custom-A"), record the mode name AND a plain-English description ("optical AND heat, sensitivity medium-high"). Annex D Figure D.1 gives a recording template. The commissioning technician needs the record to programme correctly; the maintainer needs it to test the right response.',
              },
              {
                question: 'Do I need a CO fire detector in every bedroom of an HMO?',
                answer:
                  'No — that is a BS EN 50291 (domestic CO alarm) question, not a BS 5839-1 question. BS EN 50291 CO alarms are required where there is a fuel-burning appliance. BS EN 54-26 CO FIRE detectors are an OPTIONAL element of a BS 5839-1 multi-sensor specification — typically used in O+H+C multi-sensors in corridors where smouldering-fire risk is elevated. The two are different products with different drivers. For a typical HMO: smoke detection on the BS 5839-1 system in escape routes and bedrooms (clause 14 prohibits heat in bedrooms for new work), separate BS EN 50291 alarms next to fuel-burning appliances. Both are needed; neither replaces the other.',
              },
              {
                question: 'What is the difference between an ASD system and a beam detector?',
                answer:
                  'Both are non-point-detector technologies for large or high-airflow volumes. A BEAM detector projects an IR beam across the volume and senses obscuration — sensitivity is moderate (similar to a point detector) but the coverage area per device is enormous. An ASD draws air through a sampling pipe network back to a centralised, very-high-sensitivity laser/optical chamber — sensitivity is 10x to 100x point detection, but the coverage per pipe is shorter and the install effort is greater. Choose beam for coverage of a large open volume where standard sensitivity is fine (warehouse). Choose ASD for very-early warning in a critical, high-airflow or high-aesthetic space (data centre, atrium, heritage building).',
              },
              {
                question: 'Can I mix detector technologies on the same loop?',
                answer:
                  'Yes. Modern addressable loops will mix optical, multi-sensor, heat, beam, ASD interface, MCP and sounder devices on a single loop, provided the panel and the device manufacturers are compatible. The loop loading calculation must include all devices. The advantage: you can choose detector technology per area without artificial restriction. The disadvantage: documentation is essential — the panel must be programmed with the correct mode for each multi-sensor (clause 20.11), and zone mapping must reflect the device-by-device choices.',
              },
              {
                question:
                  'Why does the 2017 edition let me put heat detectors in bedrooms but the 2025 edition does not?',
                answer:
                  'The 2017 edition was based on the historical assumption that smoke detection in bedrooms produced unacceptable false alarm rates from cooking aerosol, steam from en-suites, and aerosol products. The 2025 edition recognises (a) that multi-sensor detection has effectively eliminated those false-alarm sources via AND-logic, and (b) that bedroom fires are characteristically smouldering low-temperature events whose victims succumb to smoke before any heat threshold is reached. The evidence base — coroner inquest data, FRS fatality statistics — supports the change. Clause 14 closes a known fatal gap.',
              },
              {
                question: 'How do I know what detector technology was used in an existing system?',
                answer:
                  'First port of call: the operating and maintenance manual delivered at handover. Under clause 20.11 in 2025 (and the equivalent clause 24.11 in 2017) this should record type and mode per detector. If the manual is missing or incomplete (a common 2017-and-earlier scenario): inspect a sample of detectors physically — the manufacturer label, the model number, and where applicable the BS EN 54-x compliance mark. Cross-check against the panel programming using the configuration tool. Document the as-found state in your service report; if the type-and-mode record is missing, this is itself a finding for the user under clause 33 documentation requirements.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Detector technologies — Module 2.1" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-2/section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.2 Detector siting and coverage
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

export default FireAlarmModule2Section1;
