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
    id: 'patm4-s5-bs-en',
    question:
      'Which BS EN standard governs the design and accuracy of multifunction PAT testers — specifically the low-resistance ohmmeter and insulation resistance functions?',
    options: [
      'BS EN 61010 alone, the standard printed on the instrument rating plate',
      'BS 7671 alone, since the wiring regulations define the test methods',
      'BS EN 60335, the safety standard for the household appliances under test',
      'BS EN 61557 series — Parts 1, 2 and 4',
    ],
    correctIndex: 3,
    explanation:
      'The BS EN 61557 series sets measurement performance for safety test instruments, with each part covering a specific test type — Part 1 general, Part 2 insulation resistance, Part 4 low-resistance ohmmeter / earth continuity. BS EN 61010 separately covers the safety (overvoltage category, insulation, mechanical) of the test instrument as a piece of electrical equipment in its own right, not its measurement performance.',
  },
  {
    id: 'patm4-s5-calibration',
    question: 'What does IET CoP recommend for PAT tester calibration interval?',
    options: [
      'Annual formal calibration, plus monthly site-checks against a known reference box',
      'Every five years, since modern electronic instruments are stable enough not to drift',
      'Once a decade, aligned with the typical service life of the instrument before replacement',
      'Only when the meter visibly fails or gives an obviously wrong reading, with no fixed interval',
    ],
    correctIndex: 0,
    explanation:
      "IET CoP recommends annual formal calibration of PAT testers. Many test-equipment hire firms align this with their hire cycle. Site-checks against a calibration box (a known-resistance and known-IR reference unit) every month or so detect drift between formal calibrations and catch problems before a whole month's test results are called into question.",
  },
  {
    id: 'patm4-s5-gs38',
    question: 'What does GS38 require of the test leads supplied with a PAT tester?',
    options: [
      'That the leads physically fit the meter sockets and reach the appliance comfortably',
      'That the leads carry a colour code matching the meter casing to avoid mix-ups',
      'Finger-barriers, minimal exposed tip metal, voltage-rated insulation and fused leads where appropriate',
      'That each lead is kept under 1 m in length to limit the resistance it adds to readings',
    ],
    correctIndex: 2,
    explanation:
      "GS38 is HSE's guidance on test probes and leads. The headline requirements are finger-barriers (a moulded shroud stopping fingers reaching the tip), minimum exposed tip metal (typically ≤ 4 mm, or ≤ 2 mm for higher overvoltage categories), insulation rated to the test voltage, and fused leads where the application calls for it. PAT lead sets fall under GS38 as they are used on or near energised equipment; the operator should still inspect leads for damage / shroud integrity at the start of each test session.",
  },
  {
    id: 'patm4-s5-tester-choice',
    question:
      'You are setting up a PAT regime for a small electrical contractor with a fleet of about 50 portable appliances (mostly hand tools and office kit). Which class of PAT tester is most appropriate?',
    options: [
      'A manual single-test tester only, cheaper but forcing a separate operator step per test',
      'A high-end specialist medical / industrial tester, future-proofed against any added equipment',
      'A general multimeter plus a separate low-resistance ohmmeter, used together for the individual tests',
      'An automatic mid-range tester running the IET CoP sequence with on-board storage and label printing',
    ],
    correctIndex: 3,
    explanation:
      'For a 50-appliance fleet, a mid-range automatic tester is the right cost-quality balance — it runs the IET CoP sequence (earth continuity → IR → polarity → leakage) against pre-configured thresholds, stores results and prints labels, integrating with most asset-management software. Manual testers slow the workflow and increase operator errors at scale; high-end specialist kit is overkill. A multimeter cannot produce the required test currents and voltages.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What is the headline difference between a manual PAT tester and an automatic PAT tester?',
    options: [
      'Manual testers are cheaper, but automatic testers are inherently more accurate at the same measurement',
      'Automatic testers can only test Class I appliances, while manual testers handle both Class I and Class II',
      'Manual testers are for fixed-installation work, while automatic testers are only for portable appliances',
      'Manual runs each test as a separate operator step; automatic runs the whole IET CoP sequence on one button-press with on-board storage',
    ],
    correctAnswer: 3,
    explanation:
      'The functional split is workflow-level. A manual tester exposes the test sequence to the operator step-by-step with manual pass/fail judgement; an automatic tester packages the IET CoP sequence as a single workflow with pre-configured limits and on-board recording — faster, more consistent, and audit-quality by default. Modern PAT practice typically uses automatic testers; manual testers remain useful for diagnosis and edge cases but are not the workflow tool of choice for routine PAT. Accuracy is set by BS EN 61557 compliance, not by manual versus automatic operation.',
  },
  {
    id: 2,
    question: 'What does BS EN 61557 Part 4 specifically govern?',
    options: [
      'Low-resistance ohmmeters used for protective-conductor / earth-continuity measurement',
      'Insulation-resistance test instruments and their minimum applied voltage and accuracy',
      'Earth fault loop impedance testers used to verify disconnection times within BS 7671 limits',
      'RCD testers and the trip-time / trip-current ranges they must accurately measure',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 61557 Part 4 specifies performance requirements for low-resistance ohmmeters — including the required test current, no-load voltage range and lead-resistance compensation. Part 2 covers insulation resistance instruments, Part 3 covers earth fault loop impedance, Part 6 covers RCD testers. Each part of BS EN 61557 governs a specific test instrument type within the safety-test family.',
  },
  {
    id: 3,
    question:
      'What is the IET CoP-recommended calibration interval for PAT test equipment, and why?',
    options: [
      'Every five years — modern instruments are stable enough not to need more frequent formal calibration',
      'Whenever the operator chooses, since calibration intervals are a matter of individual judgement',
      'Annual formal calibration, with monthly site-checks against a calibration box to catch drift between annuals',
      'Only after the instrument suffers impact damage or an obvious fault',
    ],
    correctAnswer: 2,
    explanation:
      'IET CoP recommends annual formal calibration. PAT testers contain components (high-voltage IR generation, low-current shunts, electronic switching) whose accuracy can drift over a year of use; the annual gives a formal traceable check. UKAS-accredited calibration laboratories typically issue 12-month certificates, and monthly site-checks against a portable calibration reference catch drift between annuals.',
  },
  {
    id: 4,
    question:
      'GS38 requires test probes to have what feature to prevent operator fingers reaching the conductive tip?',
    options: [
      'A prominent warning sticker on the probe handle reminding the operator not to touch the tip',
      'A red colour applied to the probe body so the live test lead is easily identified by the operator',
      'Insulation along the lead only, the tip being left fully bare so it can make a reliable contact',
      'A finger-barrier — a moulded shroud, set back from the tip, that stops the finger reaching the conductive tip',
    ],
    correctAnswer: 3,
    explanation:
      "GS38 finger-barriers are the headline safety feature. Combined with minimal exposed tip metal (≤ 4 mm general; ≤ 2 mm for higher overvoltage categories), they prevent the most common test-probe accident — the operator's finger slipping onto the conductive tip while making a measurement on energised equipment.",
  },
  {
    id: 5,
    question:
      'What standard covers the SAFETY (overvoltage category, mechanical safety, insulation) of the PAT tester itself, distinct from BS EN 61557 which covers measurement performance?',
    options: [
      'BS EN 61010 — Safety requirements for electrical equipment for measurement, control and laboratory use',
      'BS 7671, the wiring regulations governing the fixed installation the tester plugs into',
      'GS38, the HSE guidance covering test probes and leads rather than the instrument body',
      'BS EN 60335, the safety standard for the household appliances being tested',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 61010 is the umbrella safety standard for laboratory and field test instruments. PAT testers fit within Part 1 (general requirements) and Part 2-030 (handheld and hand-manipulated test instruments). BS EN 61557 governs the measurement performance; BS EN 61010 governs the equipment safety.',
  },
  {
    id: 6,
    question:
      'A high-end PAT tester offers Bluetooth (BLE) transfer of results to a tablet, on-board barcode reading for appliance ID, integrated label printing and a built-in calibration check function. Which use case is this configuration most appropriate for?',
    options: [
      'A single small office with a handful of appliances tested once a year by the office manager',
      'Hobbyist domestic use where the owner wants to check their own household appliances occasionally',
      'A specialist PAT contractor handling several thousand appliances a year across multiple client sites',
      'Medical electrical equipment only, since BLE and barcode features are specific to BS EN 62353 work',
    ],
    correctAnswer: 2,
    explanation:
      'High-end automatic testers with BLE / USB / barcode / label printing are aimed at high-throughput contractor work. The features pay back in operator time saved per appliance and in audit-quality records that integrate directly with asset management software. For a small fleet (< 100 appliances) the mid-range automatic tester is sufficient.',
  },
  {
    id: 7,
    question:
      'A manual single-test PAT tester (low-cost, basic) is being considered for a workshop. What are the trade-offs IET CoP and good practice would highlight?',
    options: [
      'Each test is a separate operator action (steps can be skipped or misread), no on-board recording, and no asset-linked storage — fine for diagnosis but not routine PAT at scale',
      'No real trade-offs — a manual tester is functionally equivalent to an automatic one for high-volume routine work',
      'A manual tester is inherently more accurate, since the operator controls and judges each measurement individually',
      'A manual tester is the preferred choice for medical electrical equipment because of its step-by-step operator control',
    ],
    correctAnswer: 0,
    explanation:
      'Manual testers have specific use cases (diagnosis, training, edge-case work) but are not the workflow tool of choice for routine PAT. The operator runs each test individually (risk of skipping or misreading a step), there is no on-board recording so results must be hand-transcribed, and there is no asset-linked storage for trend analysis. Automatic testers reduce operator workload, enforce the IET CoP test sequence, and produce structured records that integrate with asset management. Manual testers are appropriate where the operator is doing one-off work or specifically wants step-by-step control.',
  },
  {
    id: 8,
    question:
      'IET CoP recommends competent-person training for PAT operators. What is the legal underpinning?',
    options: [
      'There is no legal requirement; PAT operator training is entirely voluntary and a matter of industry best practice',
      'It is underpinned only by HSG107, which is HSE guidance rather than a statutory legal requirement',
      'It rests on trade-union competence agreements covering electrical workers rather than on any legislation',
      'Electricity at Work Regulations 1989 Reg 16 — the competent-person duty requiring technical knowledge or supervision',
    ],
    correctAnswer: 3,
    explanation:
      'EAW Regulation 16 is the primary legal underpinning for "competent person" requirements across electrical work — including PAT. The duty-holder is legally responsible for ensuring the PAT operator has the technical knowledge or appropriate supervision to do the work safely. Industry-recognised training and assessment (such as the City &amp; Guilds 2377 and equivalents) provide one route to demonstrating competence.',
  },
  {
    id: 9,
    question:
      'Your PAT tester fails its calibration check (a known 0.10 Ω reference reads 0.27 Ω). What is the correct procedural response?',
    options: [
      'Continue testing for now and send the instrument away for recalibration at the next scheduled annual',
      'Apply a manual correction factor to each subsequent reading to compensate for the measured offset',
      'Stop using the tester immediately; investigate leads / nulling / drift, and review tests since the last known-good check',
      'Restrict the tester to non-critical or low-risk appliances only until the next calibration falls due',
    ],
    correctAnswer: 2,
    explanation:
      "A failed calibration check invalidates results since the last known-good check. Stop using the tester immediately and investigate likely causes in order: damaged leads (the most common cause), failed nulling, or genuine drift — replace leads / re-null and re-check. If it still fails, take it out of service for formal calibration. Tests since the last known-good check may need repeating, per the duty-holder's procedures and the size of the fail margin. The procedural answer is to stop, not to push through.",
  },
  {
    id: 10,
    question: 'What is the role of "competent person" in PAT testing per HSG107?',
    options: [
      'HSG107 sets out a tiered competence framework: (a) the user doing daily visual checks, (b) the formal-visual inspector doing a thorough visual at intervals with no testing, (c) the combined inspection-and-testing operator doing the full instrument-based PAT. Each tier needs a different level of competence; the duty-holder under EAW 1989 Reg 16 must put the right tier in place per task',
      'It states that anyone may perform PAT regardless of training, as the test is straightforward',
      'HSG107 is concerned only with fixed installations and is irrelevant to portable appliance testing',
      'It restricts PAT to qualified electrical engineers only, excluding trained technicians',
    ],
    correctAnswer: 0,
    explanation:
      'HSG107 frames PAT as a tiered system: user checks (no training requirement), formal visual inspection (basic training), and combined inspection-and-testing (formal training to a recognised standard). The duty-holder allocates the appropriate tier per the equipment risk and the legal duty under EAW 1989. The tester instrument is one part of the system; the operator competence is the other.',
  },
];

const PATTestingModule4Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Test equipment types | PAT M4.5 | Elec-Mate',
    description:
      'BS EN 61557 / BS EN 61010 / GS38: manual vs automatic vs advanced PAT testers, lead-set requirements, annual calibration interval per IET CoP, and the competent-person tier framework from HSG107 / EAW 1989 Reg 16.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/pat-testing-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5"
            title="Test equipment types"
            description="Manual, automatic and advanced PAT testers. The BS EN 61557 / BS EN 61010 standards, GS38 lead-set requirements, annual calibration, and how the test instrument fits inside the wider competent-person framework."
            tone="yellow"
          />

          <TLDR
            points={[
              'Three classes of PAT tester: manual (single-test workflow, low-cost, operator-driven), automatic (IET CoP sequence as one button-press, on-board storage, mid-range), advanced (BLE / USB transfer, barcode reading, label printing, calibration-check function — high-end contractor / specialist).',
              'BS EN 61557 series governs measurement performance: Part 1 (general / safety umbrella), Part 2 (insulation resistance), Part 3 (earth-loop impedance), Part 4 (low-resistance ohmmeter / earth continuity). BS EN 61010 governs the safety of the instrument itself.',
              'GS38 governs test leads and probes: finger-barriers, minimal exposed tip metal (typically ≤ 4 mm), voltage-rated insulation, fused leads where appropriate. Inspect leads at the start of every session.',
              'IET CoP recommends annual formal calibration. Site-checks against a calibration reference (a known-resistance / known-IR test box) more frequently — typically monthly — catch drift between annuals.',
              'EAW 1989 Reg 16 sets the competent-person duty. HSG107 frames it as a tiered system (user checks → formal visual → combined inspection-and-testing). The tester is half the safety system; operator competence is the other half.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish manual, automatic and advanced PAT testers and select the appropriate class for a given workload',
              'Reference BS EN 61557 series correctly (Parts 1 / 2 / 4 most relevant to PAT) and recognise BS EN 61010 as the instrument safety standard',
              'State the GS38 requirements for test leads and probes and inspect lead-sets for compliance at the start of a session',
              'Apply the IET CoP annual calibration interval and the role of in-session calibration checks against a reference',
              'Understand the EAW 1989 Reg 16 competent-person duty and the HSG107 tiered competence framework',
              'Choose tester features (BLE transfer, label printing, barcode, asset-management integration) based on the size and type of the PAT regime',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The three classes of PAT tester</ContentEyebrow>

          <ConceptBlock
            title="Manual testers — single-test workflow"
            plainEnglish="A manual PAT tester exposes each individual test (earth continuity, IR, polarity, substitute leakage) as a separate menu item. The operator selects the test, runs it, reads the result, judges pass/fail against the IET CoP limit, and records the result on a paper sheet or appliance record before moving to the next test."
            onSite="Manual testers cost less than automatic ones — typical street price under £200. They produce no on-board record; results live where the operator writes them. Useful for diagnosis (chasing down which specific test is failing on a problem appliance), training (forcing the operator to think through each step), and very small fleets (a handful of appliances)."
          >
            <p>
              The trade-off is workflow speed and consistency. A manual tester takes longer per
              appliance because each test is a separate operator action; the IET CoP test sequence
              (earth continuity → IR → polarity → leakage) requires the operator to remember to do
              each test, in the right order, with the right pass/fail threshold for each. On a fleet
              of 50+ appliances this becomes a fatigue problem — fatigue-driven errors rise, and
              tests get skipped or recorded incorrectly.
            </p>
            <p>
              Manual testers remain useful in two specific cases: (1) diagnosis, where you want to
              isolate individual tests on a problem appliance to find a fault; and (2) the rare case
              where the duty-holder wants the operator to engage with each test individually for
              training or QA reasons. For routine PAT at any scale, the automatic class is the right
              tool.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Automatic testers — sequence + pass/fail logic"
            plainEnglish="An automatic PAT tester packages the IET CoP test sequence as one button-press. The operator plugs in the appliance, configures the test profile (Class I / Class II / IEC lead / extension lead), presses START, and the tester runs earth continuity, IR (or substitute leakage as configured), polarity and leakage in sequence — stopping on the first fail. Pass/fail is judged automatically against pre-configured limits."
            onSite="Mid-range automatic testers cost £400–£900. They typically include 1000+ test result memory, USB or SD-card transfer, and basic label printing (via a separate printer). They are the standard tool for SMB-level PAT — the right balance between cost, throughput and audit-quality records."
          >
            <p>Three operational advantages over manual:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Sequence enforcement.</strong> The tester will not run IR before earth
                continuity has passed, and will not run polarity before IR has passed (or been
                substituted-out). The IET CoP sequence is enforced in firmware — operator cannot
                accidentally skip a step.
              </li>
              <li>
                <strong>Pre-configured pass/fail.</strong> The Class I appliance profile sets ≤ 0.1
                Ω + cable R for earth continuity, ≥ 1 MΩ for IR, ≤ 0.5 mA for substitute leakage.
                The operator does not interpret the reading against the limit — the tester does.
              </li>
              <li>
                <strong>On-board storage.</strong> Results are saved against the appliance ID, with
                timestamp, test method and pass/fail. The record is structured and audit-ready
                without manual transcription.
              </li>
            </ul>
            <p>
              The disadvantages are mostly cost (a mid-range automatic tester costs roughly twice
              what a manual tester costs) and the small risk that pre-configured limits are wrong
              for the appliance under test (most testers handle this by allowing custom test
              profiles). For a fleet of more than a few dozen appliances, the trade is unequivocally
              in favour of automatic.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Advanced testers — BLE / USB transfer, label printing, barcode reading"
            plainEnglish="Advanced PAT testers add asset-management features on top of the automatic test workflow. BLE / USB transfer to a tablet or PC. On-board barcode reading for appliance ID. Integrated thermal label printing (so a pass label with appliance ID, test date, retest date and operator initials is printed on the tester itself). Calibration-check function that lets the operator verify the tester against an internal or external reference at the start of each session."
            onSite="Advanced testers cost £1000–£3500. They are the right choice for specialist PAT contractors handling thousands of appliances per year across multiple client sites. The features pay back in operator time saved per appliance, in audit records that integrate directly with asset-management software, and in the ability to confirm the tester is in spec at the start of each session."
          >
            <p>Three features that distinguish advanced from automatic:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>BLE / USB transfer.</strong> Results sync to an asset-management app (most
                manufacturers offer their own, with API hooks for third-party). The operator does
                not transcribe; the records flow direct to the duty-holder system.
              </li>
              <li>
                <strong>Barcode reading.</strong> Each appliance has a unique barcode label
                (typically applied at the previous test cycle); the tester reads the barcode, looks
                up the previous test record, and presents the test profile and history to the
                operator before testing starts.
              </li>
              <li>
                <strong>Calibration-check function.</strong> A built-in or external reference unit
                with known-resistance and known-IR test points. The operator runs a check at the
                start of each session; the tester verifies its measurements against the reference
                and either confirms in-spec or flags a calibration concern.
              </li>
            </ul>
            <p>
              The break-even on advanced versus mid-range automatic depends on appliance volume. For
              a contractor handling 5000+ appliances per year, the advanced features pay back in
              months. For a small site with 50 appliances tested annually, the automatic tester is
              sufficient and the advanced features are over-spec.
            </p>
          </ConceptBlock>

          {/* Manual vs auto vs advanced PAT tester comparison diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Manual vs automatic vs advanced PAT tester — feature comparison
            </h4>
            <svg
              viewBox="0 0 800 360"
              className="w-full h-auto"
              role="img"
              aria-label="Comparison of three PAT tester classes. Manual on the left has individual test buttons and a paper record. Automatic in the centre has a single-press IET CoP sequence and on-board storage. Advanced on the right adds BLE transfer, barcode reading, label printing and calibration check."
            >
              {/* Manual */}
              <rect
                x="30"
                y="40"
                width="230"
                height="280"
                rx="10"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="145"
                y="65"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="13"
                fontWeight="bold"
              >
                MANUAL
              </text>
              <text x="145" y="82" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                ~£150–£250
              </text>

              <rect
                x="55"
                y="100"
                width="60"
                height="34"
                rx="4"
                fill="rgba(0,0,0,0.4)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />
              <text
                x="85"
                y="121"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                EARTH
              </text>
              <rect
                x="125"
                y="100"
                width="60"
                height="34"
                rx="4"
                fill="rgba(0,0,0,0.4)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />
              <text
                x="155"
                y="121"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                IR
              </text>
              <rect
                x="195"
                y="100"
                width="60"
                height="34"
                rx="4"
                fill="rgba(0,0,0,0.4)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />
              <text
                x="225"
                y="121"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                POL
              </text>

              <text x="145" y="170" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Each test: separate
              </text>
              <text x="145" y="185" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                operator action
              </text>
              <text x="145" y="220" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                No on-board storage
              </text>
              <text x="145" y="237" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Paper record
              </text>
              <text x="145" y="254" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                No labels / barcode
              </text>
              <text x="145" y="271" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                BS EN 61557 / 61010
              </text>
              <text
                x="145"
                y="298"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Diagnosis &amp; training
              </text>

              {/* Automatic */}
              <rect
                x="290"
                y="40"
                width="230"
                height="280"
                rx="10"
                fill="rgba(251,191,36,0.06)"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <text
                x="405"
                y="65"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                AUTOMATIC
              </text>
              <text x="405" y="82" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                ~£400–£900
              </text>

              <rect
                x="320"
                y="100"
                width="170"
                height="40"
                rx="6"
                fill="rgba(0,0,0,0.4)"
                stroke="#FBBF24"
                strokeWidth="1.2"
              />
              <text
                x="405"
                y="125"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                ▶ START SEQUENCE
              </text>

              <text x="405" y="170" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Earth → IR → Polarity →
              </text>
              <text x="405" y="185" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Leakage in one press
              </text>
              <text x="405" y="220" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                On-board storage (1000+ tests)
              </text>
              <text x="405" y="237" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                USB / SD card transfer
              </text>
              <text x="405" y="254" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Pass/fail logic
              </text>
              <text x="405" y="271" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Optional label printer
              </text>
              <text
                x="405"
                y="298"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                SMB / contractor standard
              </text>

              {/* Advanced */}
              <rect
                x="550"
                y="40"
                width="220"
                height="280"
                rx="10"
                fill="rgba(34,197,94,0.06)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="660"
                y="65"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="13"
                fontWeight="bold"
              >
                ADVANCED
              </text>
              <text x="660" y="82" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                ~£1000–£3500
              </text>

              <rect
                x="575"
                y="100"
                width="170"
                height="40"
                rx="6"
                fill="rgba(0,0,0,0.4)"
                stroke="#22C55E"
                strokeWidth="1.2"
              />
              <text
                x="660"
                y="125"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                ▶ + BLE / BARCODE
              </text>

              <text x="660" y="170" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Auto sequence +
              </text>
              <text x="660" y="185" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                asset-management
              </text>
              <text x="660" y="220" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                BLE / USB to tablet / PC
              </text>
              <text x="660" y="237" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Barcode reader (asset ID)
              </text>
              <text x="660" y="254" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Integrated label printer
              </text>
              <text x="660" y="271" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Calibration-check function
              </text>
              <text
                x="660"
                y="298"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                Specialist contractor / high vol
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The standards stack — what governs the tester</ContentEyebrow>

          <ConceptBlock
            title="BS EN 61557 series — measurement performance"
            plainEnglish="BS EN 61557 is the family of standards that specifies what a safety test instrument must do to be considered fit for purpose. Each part covers a different test type. PAT testers typically meet Parts 1, 2 and 4 at minimum."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Part</th>
                    <th className="text-left text-white/80 py-2">Scope</th>
                    <th className="text-left text-elec-yellow py-2">PAT relevance</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Part 1</td>
                    <td>General requirements / safety umbrella for the series</td>
                    <td className="text-elec-yellow">All PAT testers</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Part 2</td>
                    <td>Insulation resistance test instruments</td>
                    <td className="text-elec-yellow">All PAT testers (IR function)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Part 3</td>
                    <td>Earth fault loop impedance testers</td>
                    <td className="text-elec-yellow">Multifunction (PAT + installation)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Part 4</td>
                    <td>Low-resistance ohmmeters (earth continuity)</td>
                    <td className="text-elec-yellow">All PAT testers (continuity function)</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Part 5</td>
                    <td>Earth resistance testers</td>
                    <td className="text-elec-yellow">Specialist installation only</td>
                  </tr>
                  <tr>
                    <td className="py-2">Part 6</td>
                    <td>RCD testers</td>
                    <td className="text-elec-yellow">Multifunction installation testers</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              A multifunction tester that does both PAT and installation testing typically meets
              Parts 1, 2, 3, 4 and 6 — the dual-use kit covers both portable equipment and the
              fixed-installation tests in BS 7671 643.x. A PAT-only tester typically meets Parts 1,
              2 and 4. The compliance is declared on the manufacturer\'s data sheet; if it is not
              listed, the instrument should not be used for safety-critical PAT work.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 61010-1:2010 — Safety requirements for electrical equipment for measurement, control and laboratory use"
            clause={
              <>
                Equipment shall be classified by its overvoltage category (CAT II, III or IV)
                indicating the supply environment in which it is intended to be used. The
                classification, together with the rated voltage, shall be marked on the equipment or
                in the user manual. The equipment shall provide protection against electric shock to
                the operator under normal and single-fault conditions.
              </>
            }
            meaning="BS EN 61010 governs the test instrument itself as a piece of electrical equipment. Overvoltage categories matter: CAT II is for plug-in appliances on a final circuit, CAT III for fixed-installation distribution, CAT IV for the supply origin. PAT testers are typically CAT II / CAT III rated. Using a CAT II instrument on a CAT III supply (e.g. directly on a distribution-board level) is the most common BS EN 61010 violation in practice."
          />

          <ConceptBlock
            title="GS38 — the leads and probes specifically"
            plainEnglish="GS38 is HSE's free guidance note on test probes and leads. It applies to any test-equipment lead set used in electrical work — including PAT lead sets, multimeter leads, and the probes used for live polarity verification or troubleshooting. The headline requirements: finger-barriers, minimal exposed tip metal, voltage-rated insulation, fused leads where appropriate."
          >
            <p>The GS38 essentials, in operator terms:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Finger-barrier:</strong> a moulded shroud on the probe handle, set back from
                the conductive tip, that physically prevents the operator\'s finger from sliding
                forward onto the tip during a measurement on energised equipment.
              </li>
              <li>
                <strong>Minimum exposed tip metal:</strong> typically ≤ 4 mm of bare conductive tip;
                for higher overvoltage categories (CAT III, CAT IV) the limit drops to ≤ 2 mm to
                reduce the risk of an inadvertent short circuit between adjacent terminals.
              </li>
              <li>
                <strong>Voltage-rated insulation:</strong> the lead body insulation must be rated
                for the voltage category of the supply being tested. PAT lead sets are typically
                rated CAT II 600 V or CAT III 1000 V depending on the model.
              </li>
              <li>
                <strong>Fused leads where appropriate:</strong> for live troubleshooting work, leads
                with an in-line BS 1362 fuse limit short-circuit fault current and reduce the risk
                of arc flash. Standard PAT leads are not always fused (the tester provides the
                protection), but specialist leads for live verification typically are.
              </li>
            </ul>
            <p>
              Inspect leads at the start of every PAT session. A cracked finger-barrier, a frayed
              insulation, a bent or burnt tip — any of those is reason to replace the lead before
              proceeding. PAT-tester manufacturers supply replacement leads that meet GS38; using
              non-OEM leads may void the BS EN 61010 certification of the instrument.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Calibration and the in-session check</ContentEyebrow>

          <ConceptBlock
            title="Annual calibration plus in-session checks"
            plainEnglish="IET CoP recommends annual formal calibration of PAT testers — a UKAS-accredited calibration laboratory measures the tester\'s output against traceable references and issues a 12-month calibration certificate. Between annuals, in-session checks against a calibration reference (a portable test box with known-resistance and known-IR points) catch drift early."
          >
            <p>
              Annual calibration is the formal traceability backbone. The certificate documents that
              the tester was within manufacturer spec on a specific date; subsequent test results
              are auditable against that reference. Most testing organisations align the annual
              calibration with the start of their financial year so the calibration certificate
              covers a known operational period.
            </p>
            <p>
              In-session checks are the practical complement. A calibration test box (typically
              £100–£300) has a built-in known resistance (e.g. 0.10 Ω, 1.5 Ω) and a known insulation
              reference (e.g. 1 MΩ, 10 MΩ). The operator runs a continuity test at the start of the
              session; if the tester reads 0.10 Ω against the 0.10 Ω reference, the tester is in
              spec for that day. Run the same check against the IR reference. Done in two minutes,
              the in-session check catches the most common cause of bad PAT records: the tester
              drifted out of spec mid-cycle and nobody noticed until the next annual.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Calibration step</th>
                    <th className="text-center text-white/80 py-2">Frequency</th>
                    <th className="text-center text-elec-yellow py-2">Authority</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Formal UKAS-accredited calibration</td>
                    <td className="text-center">Annual</td>
                    <td className="text-center text-elec-yellow">UKAS lab certificate</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">In-session check vs calibration box</td>
                    <td className="text-center">Each session (or weekly)</td>
                    <td className="text-center text-elec-yellow">Operator log</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Test-lead null / nulling</td>
                    <td className="text-center">Each session, after lead change</td>
                    <td className="text-center text-elec-yellow">Operator log</td>
                  </tr>
                  <tr>
                    <td className="py-2">Visual inspection of leads</td>
                    <td className="text-center">Each session</td>
                    <td className="text-center text-elec-yellow">Operator log</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <Scenario
            title="A failed in-session calibration check mid-job"
            situation="You are on day three of a five-day PAT job at a school (about 800 appliances). At the start of day three, your in-session check against the calibration box shows the tester reading 0.27 Ω against a 0.10 Ω reference. The tester has been working normally up to this point."
            whatToDo={
              <>
                <span className="block">
                  Stop testing immediately. The tester is out of spec; any results since the last
                  known-good check are now uncertain.
                </span>
                <span className="block">
                  Investigate likely causes in order: (1) test leads damaged or contaminated — the
                  most common cause; clean / replace leads and re-check; (2) tester null function
                  invalidated — re-null and re-check; (3) genuine instrument drift — formal
                  calibration required.
                </span>
                <span className="block">
                  If lead replacement / re-nulling restores the tester to in-spec, document the
                  intervention, mark the appliances tested before the issue as &ldquo;subject to
                  re-test if calibration root cause indicates&rdquo;, and consult the duty-holder on
                  whether the previous two days\' tests need repeating. The fail margin (0.27 vs
                  0.10 Ω) is enough to flip a borderline appliance from pass to fail, so the answer
                  is normally yes.
                </span>
                <span className="block">
                  If the cause is genuine instrument drift, the tester is out of service. A
                  replacement tester is required. The previous two days\' tests are repeated on the
                  replacement before any new appliances are tested.
                </span>
              </>
            }
            whyItMatters="Without an in-session calibration check, this drift would be discovered at the next annual — by which time months of test records are uncertain. The in-session check costs two minutes and saves the entire test cohort from being potentially invalidated."
          />

          <CommonMistake
            title="Trusting last year\'s calibration certificate as a current pass"
            whatHappens="The PAT tester has a UKAS calibration certificate dated 14 months ago. The duty-holder asks for proof of calibration; the operator presents the expired certificate. The duty-holder either accepts (and exposes themselves to liability) or rejects, and the operator loses credibility on the job."
            doInstead="The certificate is a one-year guarantee; once expired, the tester is out of spec from a compliance standpoint regardless of how the readings look. Schedule formal recalibration to start before the expiry of the current certificate — most calibration labs offer a 1–2 week turnaround. Build the recalibration schedule into the equipment register so it is never overlooked."
          />

          <CommonMistake
            title="Skipping lead inspection because &lsquo;the leads look fine&rsquo;"
            whatHappens="A PAT lead has a small split in the insulation halfway down the probe lead, hidden under the operator\'s grip during normal use. During an IR test on a Class II appliance, the test voltage flows through the operator\'s finger via the split, the operator gets a shock, and the integrity of every IR test from that lead is questionable."
            doInstead="Inspect every lead for the entire length at the start of every PAT session: tip integrity, finger-barrier intact, insulation unbroken, plug / connector at the meter end secure. The inspection is a 30-second visual. GS38 does not list it as a formal step, but it is the single highest-value safety check in the PAT workflow."
          />

          <RegsCallout
            source="HSG107 — Maintaining portable electric equipment in low-risk environments (HSE)"
            clause={
              <>
                Suitable test equipment, in good condition and fit for purpose, will form an
                essential part of any combined inspection and testing regime. Calibration of test
                equipment must be carried out at periods recommended by the manufacturer and / or as
                appropriate to the type of testing. The competence of the person performing the
                tests must be matched to the test regime adopted; in particular, combined inspection
                and testing requires the operator to have a sound knowledge of test methods,
                instrument operation, and the equipment under test.
              </>
            }
            meaning="Three obligations from HSE: (1) instruments fit for purpose; (2) calibration to manufacturer / industry interval (annual is the IET CoP recommended figure for PAT); (3) operator competence matched to the test regime. The duty-holder is responsible for all three under EAW 1989 Reg 16."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The competent-person framework</ContentEyebrow>

          <ConceptBlock
            title="EAW 1989 Reg 16 + HSG107 — the legal duty"
            plainEnglish="The Electricity at Work Regulations 1989 Regulation 16 is the legal underpinning for &lsquo;competent person&rsquo; in any electrical work activity. HSG107 frames PAT specifically as a tiered competence system: user checks → formal visual inspection → combined inspection-and-testing. Each tier requires a different level of training; the duty-holder allocates the appropriate tier per the equipment risk."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>User checks (no formal training required).</strong> Everyday users are
                trained to spot obvious damage — a frayed flex, a cracked plug, a smell of burning,
                a wobbling kettle base. Daily / pre-use; reports problems but does not test.
              </li>
              <li>
                <strong>Formal visual inspection (basic training).</strong> The trained inspector
                conducts a thorough visual check at intervals (typically weekly to annually,
                depending on equipment risk per HSG107 risk assessment). Removes from service items
                with visible damage. No instrument-based testing.
              </li>
              <li>
                <strong>
                  Combined inspection-and-testing (formal training to a recognised standard,
                  typically C&amp;G 2377 or equivalent).
                </strong>{' '}
                Performs the IET CoP test sequence with appropriate test equipment. Records pass /
                fail per appliance with numeric test results. The full PAT regime as described in
                this module.
              </li>
            </ol>
            <p>
              The C&amp;G 2377 (or equivalent) formal qualification is the industry-recognised
              evidence of competence at the third tier. The qualification covers test methods, IET
              CoP acceptance values, equipment under test (Class I / II / III, IT equipment, medical
              edge cases), instrument operation, and the legal framework. Most insurance and
              duty-holder policies require operators at this tier to hold a current qualification
              and demonstrate continuing competence.
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

          <ContentEyebrow>Choosing the right tester for the job</ContentEyebrow>

          <ConceptBlock
            title="Decision matrix — appliance volume, complexity and integration needs"
            plainEnglish="The right tester for a given regime depends on three factors: the appliance volume per cycle, the complexity of the equipment under test, and the integration requirements with the duty-holder\'s asset management system."
          >
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Profile</th>
                    <th className="text-center text-white/80 py-2">Recommended class</th>
                    <th className="text-left text-elec-yellow py-2">Rationale</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Tradesperson, occasional PAT (&lt; 50 appliances/yr)</td>
                    <td className="text-center">Manual or low-end automatic</td>
                    <td>
                      Cost vs throughput trade favours simple kit; on-board storage less critical at
                      this volume
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">SMB, on-staff PAT (50–500 appliances/yr)</td>
                    <td className="text-center">Mid-range automatic</td>
                    <td>
                      Sequence enforcement, on-board storage, optional label printer — workflow
                      standard
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Specialist contractor (5,000+ appliances/yr)</td>
                    <td className="text-center">Advanced</td>
                    <td>
                      BLE / barcode / label / calibration check pay back in operator time per
                      appliance
                    </td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">Mixed PAT + fixed installation work</td>
                    <td className="text-center">Multifunction (PAT + installation)</td>
                    <td>
                      BS EN 61557 Parts 1/2/3/4/6 in one instrument; lower kit cost than two
                      specialists
                    </td>
                  </tr>
                  <tr>
                    <td className="py-2">Medical / specialist environment</td>
                    <td className="text-center">BS EN 62353 specialist tester</td>
                    <td>
                      Patient leakage measurements, stricter limits — IET CoP regime is insufficient
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember when buying / using a PAT tester"
            points={[
              'Three classes: manual (single-test, low-cost, diagnosis), automatic (sequence-enforced, on-board storage, SMB standard), advanced (BLE / barcode / label / calibration check, specialist contractor / high volume).',
              'BS EN 61557 series governs measurement performance — Parts 1, 2 and 4 are the PAT-relevant ones. BS EN 61010 governs the safety of the tester itself.',
              'GS38 governs test leads: finger-barriers, ≤ 4 mm exposed tip metal, voltage-rated insulation, inspect at the start of every session.',
              'Calibration: annual formal (UKAS-accredited) plus in-session checks against a calibration box. Lead-null at start of each session and after any lead change.',
              'EAW 1989 Reg 16 is the legal underpinning for competent-person duty. HSG107 frames PAT as a tiered system (user checks → formal visual → combined inspection-and-testing). C&G 2377 (or equivalent) is the industry-standard qualification at the third tier.',
              'A failed in-session calibration check stops testing immediately — the previous tests since last known-good are uncertain. Investigate (leads → null → instrument) before resuming.',
              'Choose the tester to match the job: cheap kit for occasional work, mid-range for SMB, advanced for high-volume contractor work, multifunction for combined PAT + installation, BS EN 62353 specialist for medical.',
              "The instrument is half the safety system; operator competence per HSG107 is the other half. Both must be in place for the duty-holder's legal duty under EAW 1989.",
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Can I use a multifunction installation tester (the kind I use for EICRs) for PAT?',
                answer:
                  'Often yes, depending on the model. Many high-end multifunction installation testers (Megger MFT, Fluke 1660 series, Metrel) include a dedicated PAT mode that runs the IET CoP sequence with appropriate pass/fail logic. Check the manufacturer datasheet for declared compliance with BS EN 61557 Parts 2 and 4 and for an explicit PAT test profile. A multimeter on its own is not a PAT tester — the IET CoP test sequence requires specific test currents and voltages that a general multimeter cannot produce.',
              },
              {
                question:
                  'My PAT tester is more than a year out of calibration but the in-session check still passes. Can I keep using it?',
                answer:
                  "From a measurement standpoint, the tester is in spec for the day's testing. From a compliance standpoint, the formal calibration certificate has expired and any duty-holder asking for proof of compliance will find the tester non-compliant. The pragmatic answer is: book the recalibration immediately, complete the current job under the in-session check evidence, and refuse any new job until the recalibration certificate is back. Do not allow the tester to be used as the primary compliance evidence after the certificate expires.",
              },
              {
                question: 'How do I know if my test leads meet GS38?',
                answer:
                  'Check the leads themselves and the manufacturer documentation. The leads should have the moulded finger-barrier set back from the tip, the tip should be ≤ 4 mm of bare metal (or ≤ 2 mm for CAT III/IV use), and the manufacturer datasheet should state the voltage category and rating (e.g. CAT III 1000 V). OEM leads supplied with reputable brand-name PAT testers (Megger, Seaward, Kewtech, Metrel) are GS38 compliant by design. Off-brand or generic replacement leads may not be — verify before use.',
              },
              {
                question:
                  'Does calibration drift affect all tests equally or some tests more than others?',
                answer:
                  'Some more than others. Earth continuity (low-Ω) is most sensitive to drift because the working values are at the edge of measurement resolution — a 0.1 Ω full-scale drift turns acceptable readings into fails. Insulation resistance (MΩ range) is much more tolerant; a 10% drift on a reading that is supposed to be 50 MΩ vs the 1 MΩ acceptance is irrelevant. Polarity is binary (continuity / no continuity), so calibration drift rarely affects polarity test outcomes. The earth continuity result is the canary for tester health.',
              },
              {
                question:
                  'I am a one-person electrician with maybe 20 of my own tools to PAT. Do I need a £500 automatic tester?',
                answer:
                  'Probably not for the volume — a £150–£250 manual tester or low-end automatic will handle 20 tools comfortably. The trade-off is workflow time: manual takes longer per appliance. For 20 tools, even a manual tester is finished in a half-day. The argument for automatic is consistency (sequence-enforced) and audit-quality records — useful if the work is for clients who ask for evidence of PAT, less critical for personal tool checks.',
              },
              {
                question:
                  'Is there a difference between a "PAT tester" and a "portable appliance tester" — same thing?',
                answer:
                  'Same thing. PAT is industry shorthand for &ldquo;Portable Appliance Testing&rdquo; (or &ldquo;Tester&rdquo;). The instruments and the activity share the abbreviation. Some manufacturers prefer &ldquo;portable appliance tester&rdquo; in formal documentation for clarity; others use PAT directly. There is no functional difference. Note that &ldquo;PAT&rdquo; specifically covers portable equipment — fixed-installation tests use different (multifunction installation tester) instruments and follow BS 7671 643.x rather than IET CoP.',
              },
              {
                question:
                  'My tester offers "user-defined limits" for earth continuity (e.g. let me set 1.0 Ω instead of 0.1 Ω + cable R). When should I use that?',
                answer:
                  "Only with great care, and ideally not at all for routine PAT. The IET CoP acceptance is a calculated value (0.1 Ω + cable R) that scales with lead length and csa. A flat user-defined limit of 1.0 Ω is non-IET-CoP-compliant for short leads (it is too lenient — a kettle lead should be 0.13 Ω, not 1.0 Ω) and unnecessarily strict for long extension reels. Use the tester's built-in IET CoP profile (which calculates the limit per the rule) rather than overriding with a flat value. Custom limits are appropriate only for specialist applications under a documented duty-holder procedure.",
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Test equipment types — PAT M4.5" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-4')}
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
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-4-section-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.6 Interpreting results and common failures
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

export default PATTestingModule4Section5;
