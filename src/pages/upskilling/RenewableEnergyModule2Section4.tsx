import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
  VideoCard,
} from '@/components/study-centre/learning';
import { MpptTrackingCurve } from '@/components/study-centre/diagrams/renewableGapSvg';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm2s4-what-is-mppt',
    question:
      'What does MPPT (Maximum Power Point Tracking) do?',
    options: [
      'Mechanically tracks the sun across the sky to keep the panels pointed at it',
      'Continuously adjusts the string operating voltage to hold the maximum power point as conditions change',
      'Mechanically tilts the panels through the day to follow the sun\'s elevation',
      'Switches the array off at night and back on at dawn to protect the cells',
    ],
    correctIndex: 1,
    explanation:
      'MPPT is an electronic control function in the inverter (or charge controller / power optimiser). It continuously adjusts the operating point of the PV string by varying the DC voltage drawn from the array, finding the V_mp where the I-V curve product V × I is at maximum. Irradiance changes shift the I-V curve up and down; temperature changes shift V_oc and V_mp horizontally. Without MPPT, the array operates at whatever the battery / load voltage demands — typically well off the MPP, losing 10–30% of available power.',
  },
  {
    id: 'm2s4-mpp-position',
    question:
      'On a PV module I-V curve, where is the Maximum Power Point (MPP)?',
    options: [
      'At V_oc, the right-hand end of the curve where current is zero',
      'At the "knee" of the curve, at V_mp and I_mp, where V × I is greatest',
      'At I_sc, the top of the curve where the terminal voltage is zero',
      'At the point where the V_oc and I_sc axes would intersect',
    ],
    correctIndex: 1,
    explanation:
      'The MPP sits at the &ldquo;knee&rdquo; of the I-V curve — the point where the curve transitions from the relatively flat current-source region (near I_sc) to the relatively steep voltage-source region (near V_oc). At MPP, V × I is at its maximum. For a typical modern 60-cell 400 W module with V_oc 41.6 V and I_sc 12.5 A at STC, V_mp ≈ 34.0 V and I_mp ≈ 11.8 A — V_mp sits at ~82% of V_oc and I_mp sits at ~94% of I_sc. I_mp is always below I_sc on a real I-V curve. The MPPT\'s job is to operate the array at this knee continuously.',
  },
  {
    id: 'm2s4-mpp-shifts',
    question:
      'What causes the MPP to move during a day?',
    options: [
      'The MPP is fixed by the module and does not move during the day',
      'Irradiance shifts the curve up/down (I_sc) and temperature shifts it sideways (V_oc, V_mp)',
      'Only nightfall moves it, when generation stops at the end of the day',
      'Only passing cloud cover moves it; temperature has no effect on the MPP',
    ],
    correctIndex: 1,
    explanation:
      'Two variables drive MPP motion. Irradiance scales I_sc roughly linearly — bright sun, high I_sc, high MPP power; cloud cover, lower I_sc, lower MPP power. Temperature shifts V_oc and V_mp via the temperature coefficient — hot cells, lower V_oc and V_mp; cold cells, higher V_oc and V_mp. As irradiance and temperature change minute-by-minute through the day, the MPP shifts in both dimensions. The MPPT algorithm continuously seeks the moving MPP — typically updating several times per second.',
  },
  {
    id: 'm2s4-perturb-and-observe',
    question:
      'The perturb-and-observe (P&O) MPPT algorithm is the most common implementation. How does it work?',
    options: [
      'It reads the module datasheet V_mp value and fixes the operating voltage there',
      'It steps the voltage, observes if power rose, keeps stepping that way, and reverses when power falls',
      'It uses GPS sun-position data to predict the optimum operating voltage',
      'It relies on a manual adjustment the installer sets at commissioning',
    ],
    correctIndex: 1,
    explanation:
      'Perturb-and-observe is the simplest and most common MPPT algorithm. The controller perturbs the operating voltage by a small step (typically 0.5–1 V on a residential inverter), measures whether array power increased or decreased, and steps again in the direction of increasing power. When the perturbation causes power to decrease, the algorithm reverses direction. The result: the operating voltage oscillates within a small range around the MPP, with the average sitting very close to V_mp. Modern P&O implementations refine the step size adaptively to track fast-changing conditions while minimising steady-state oscillation losses.',
  },
  {
    id: 'm2s4-incremental-conductance',
    question:
      'Incremental conductance MPPT is an alternative algorithm to perturb-and-observe. What\'s the principle?',
    options: [
      'It is functionally identical to perturb-and-observe, just renamed',
      'It uses dI/dV = -I/V at MPP, tracking that equality directly for faster response',
      'It works only on monocrystalline cells, not poly or thin-film modules',
      'It requires GPS data to compute the curve slope at the operating point',
    ],
    correctIndex: 1,
    explanation:
      'Incremental conductance MPPT uses the mathematical property of the I-V curve at MPP. At the maximum power point, the slope of the P-V curve is zero (dP/dV = 0), which translates to dI/dV = -I/V. The algorithm measures dI and dV continuously, compares dI/dV against -I/V, and adjusts the operating point to satisfy the equality. Under rapidly changing irradiance (passing clouds, partial shade), incremental conductance tracks the new MPP faster than P&O\'s step-and-observe approach. Trade-off: more computationally demanding, more sensitive to measurement noise.',
  },
  {
    id: 'm2s4-multi-mppt',
    question:
      'Why do modern residential hybrid inverters typically have 2 or 3 MPPT inputs?',
    options: [
      'Purely for wiring flexibility, with no effect on yield',
      'Each MPPT runs one string at its own MPP, so different orientations are optimised separately',
      'They are decorative terminals with no functional role in tracking',
      'They exist only for redundancy if one tracking channel fails',
    ],
    correctIndex: 1,
    explanation:
      'Multi-MPPT architecture solves the mismatch problem from Section 2.3 by giving each string its own optimiser. South-facing string into MPPT 1; east-facing string into MPPT 2; each tracks its own MPP independent of the other. The mismatch losses that would occur if both strings were combined into one MPPT are eliminated. Most modern residential hybrid inverters have 2 MPPTs; commercial inverters typically have 3–6 MPPTs. The architectural choice between single-MPPT and multi-MPPT design is driven by the array geometry (single orientation = single MPPT viable; multi-orientation = multi-MPPT required).',
  },
  {
    id: 'm2s4-mppt-range-design',
    question:
      'When sizing a PV string against an inverter\'s MPPT input, three voltage parameters must align. What are they?',
    options: [
      'Only the string V_oc needs to be checked against the inverter',
      'Cold-morning V_oc < inverter max input; hot-day V_mp > MPPT minimum; cool-day V_mp < MPPT maximum',
      'Only the string I_sc matters for MPPT compatibility',
      'Only the inverter\'s power rating matters; voltage is not a constraint',
    ],
    correctIndex: 1,
    explanation:
      'Three MPPT voltage rules govern PV string-to-inverter compatibility. (1) Cold-morning V_oc must be below the inverter\'s absolute maximum DC input — protects against over-voltage damage. (2) Hot-day V_mp must remain above the inverter\'s MPPT minimum voltage — without this, the inverter cannot operate at MPP during peak production hours. (3) Cool-condition V_mp must remain below the inverter\'s MPPT maximum voltage — without this, the inverter is forced to operate off-MPP at the upper end of its range. All three calculations are mandatory parts of an MCS-compliant PV design pack.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A PV string with V_oc 540 V at STC and V_mp 440 V at STC connects to a hybrid inverter with MPPT range 100–500 V and absolute maximum DC input 600 V. On a hot summer day, V_mp drops to ~370 V (due to temperature coefficient). On a cold winter morning, V_oc rises to ~590 V. Is the design compatible across the operating envelope?',
    options: [
      'Yes — V_oc 590 V < 600 V max, V_mp 370 V > 100 V min, V_mp 440 V < 500 V max; all three pass',
      'No — the string sits outside the inverter\'s MPPT voltage range in operation',
      'Only at STC — the design fails once temperature shifts V_oc and V_mp',
      'Cannot be determined from the voltage figures given for the string',
    ],
    correctAnswer: 0,
    explanation:
      'The three MPPT voltage checks: cold-morning V_oc (590 V) vs inverter Vmax (600 V) — passes with margin. Hot-day V_mp (370 V) vs MPPT min (100 V) — passes comfortably. Cool-condition V_mp (440 V) vs MPPT max (500 V) — passes. The string is compatible across the operating envelope. The 10 V margin on cold-morning V_oc is the minimum acceptable; 20+ V margin is the safer design. This three-check method is mandatory on every MCS MIS 3002 design pack.',
  },
  {
    id: 2,
    question:
      'Without MPPT, a PV array connected directly to a 24 V battery operates at approximately what voltage? And what does that cost in yield?',
    options: [
      'At its V_mp — directly connecting array to battery costs no yield',
      'At the battery voltage (~24–28 V), well left of V_mp, losing 20–40% of available power',
      'At V_oc — the array sits at its maximum open-circuit voltage point',
      'At zero volts — the battery clamps the array terminals to no output',
    ],
    correctAnswer: 1,
    explanation:
      'A PWM (Pulse-Width Modulation) charge controller connects the array directly to the battery — the array operates at whatever voltage the battery dictates, well below V_mp for almost all module configurations. The result: 20–40% of available array power is lost as the operating point sits left of MPP. MPPT charge controllers solve this by stepping the array voltage down to the battery voltage via a DC-DC converter, while operating the array at V_mp. For any meaningful off-grid system, MPPT is worth the higher controller cost — the yield gain pays back the difference quickly.',
  },
  {
    id: 3,
    question:
      'Perturb-and-observe (P&O) MPPT exhibits a characteristic behaviour at steady state. What is it?',
    options: [
      'Exact MPP operation, settling precisely at V_mp with no oscillation',
      'Random voltage jumps unrelated to the position of the MPP',
      'Small continuous oscillation around the MPP, costing ~0.5–2% in steady state',
      'Total shutdown of tracking once the operating point reaches V_mp',
    ],
    correctAnswer: 2,
    explanation:
      'P&O\'s perturb-and-observe action produces continuous small oscillation around the MPP — the operating voltage swings within a few volts of V_mp at each tracking cycle. Smaller step sizes reduce the oscillation but slow the response to fast-changing conditions (passing clouds). Adaptive-step P&O implementations vary the step size based on the rate of change — larger steps under fast irradiance changes, smaller steps under steady-state — minimising both tracking error and steady-state oscillation loss. Modern hybrid inverters typically achieve &gt;99% MPPT efficiency.',
  },
  {
    id: 4,
    question:
      'A customer with a two-pitch roof (south and east) considers single-MPPT vs dual-MPPT inverter options. The single-MPPT inverter is £200 cheaper. The dual-MPPT inverter handles the two strings separately. Across a 25-year install life, which is the better choice?',
    options: [
      'Single-MPPT — save the £200 and accept the orientation mismatch',
      'Either is equivalent over the life of a multi-orientation array',
      'Neither — manually switch the inverter between the two strings through the day',
      'Dual-MPPT — removes the orientation mismatch; the yield gain far exceeds £200',
    ],
    correctAnswer: 3,
    explanation:
      'The dual-MPPT inverter\'s additional cost pays back many times over on a multi-orientation install. Mismatch losses on a single-MPPT array combining south and east orientations are typically 10–20% during peak-mismatch periods, and 5–15% on an annual basis. The cumulative cost of the lost yield over 25 years vastly exceeds the inverter price differential. Always specify multi-MPPT on multi-orientation arrays — the &ldquo;save £200 on the inverter&rdquo; option is the most expensive line item on the install over its life.',
  },
  {
    id: 5,
    question:
      'A PV string commissions in summer and operates correctly. The first cold sunny February morning, the inverter trips on over-voltage. Most likely root cause:',
    options: [
      'Cold-morning V_oc was not checked at design time, so the string is one module too long',
      'A module has failed open-circuit, raising the string voltage above the limit',
      'An inverter firmware bug is mis-reporting the DC input voltage on cold mornings',
      'The customer has overloaded the system with too much connected load',
    ],
    correctAnswer: 0,
    explanation:
      'This failure pattern is the most-common UK PV design error in action — the cold-morning V_oc calculation skipped at design time, surfaced as an inverter over-voltage trip on the first cold sunny morning post-install. The fix: reduce the string by one module (and verify the resulting hot-day V_mp still exceeds the MPPT minimum). The diagnostic: pull the cold-morning V_oc value from the inverter log alongside the cell temperature. Section 2.3\'s worked example walks the calculation; MIS 3002 mandates it in the design pack.',
  },
  {
    id: 6,
    question:
      'Module-level MPPT via microinverters or power optimisers (Section 2.5 covers in detail) — what advantage do they offer over string-level MPPT?',
    options: [
      'Lower overall hardware cost than a single string inverter',
      'Each module runs at its own MPP, eliminating string-level mismatch entirely',
      'Higher DC string voltage delivered to the inverter input',
      'Mechanical sun-tracking of each module across the sky',
    ],
    correctAnswer: 1,
    explanation:
      'Module-level MPPT (via microinverters or DC power optimisers) is the architectural answer to severe mismatch scenarios — heavy partial shading, complex roof geometries, multi-orientation arrays, mixed-vintage modules in the same array. Each module operates at its own MPP regardless of conditions on other modules. The cost: additional hardware per module (~£30–60 for a power optimiser, ~£100–150 for a microinverter on UK pricing) and the install labour overhead. For installs where string-level MPPT loses meaningful yield, module-level MPPT pays back; for clean single-orientation south-facing arrays, string-level MPPT is the cost-effective choice.',
  },
  {
    id: 7,
    question:
      'Why does incremental conductance MPPT typically outperform perturb-and-observe under rapidly changing irradiance (passing clouds)?',
    options: [
      'It uses GPS irradiance forecasts to anticipate cloud passes',
      'Both algorithms perform identically under changing irradiance',
      'It evaluates the MPP condition in one cycle, where P&O needs 2–3 to react',
      'P&O cannot operate at all under intermittent cloud cover',
    ],
    correctAnswer: 2,
    explanation:
      'Under rapidly changing irradiance (passing cumulus clouds, partial shade moving across the array), P&O can momentarily &ldquo;confuse&rdquo; the irradiance change for a power change due to its own perturbation — causing tracking errors. Incremental conductance evaluates the I-V curve mathematics directly in one measurement cycle, identifying the new MPP without the ambiguity. On UK installs where irradiance variability is the norm (cloud-passes happen many times per hour), incremental conductance can capture 1–3% more annual energy than P&O. Most modern inverters use enhanced P&O variants or hybrid algorithms; pure incremental conductance is less common but appears in some premium-tier inverters.',
  },
  {
    id: 8,
    question:
      'A small off-grid PV system uses a PWM charge controller into a 12 V battery bank. The customer asks whether upgrading to an MPPT controller is worthwhile. The right professional advice:',
    options: [
      'PWM is fine here — there is no worthwhile upgrade for this off-grid system',
      'MPPT only works on grid-tied systems, not off-grid battery systems',
      'PWM controllers have higher harvesting efficiency than MPPT controllers',
      'MPPT recovers ~20–40% more annual energy and pays back in 1–3 years above a few hundred watts',
    ],
    correctAnswer: 3,
    explanation:
      'PWM controllers operate the array at the battery voltage, losing 20–40% of available array power compared to MPP operation. MPPT controllers run the array at V_mp and step the voltage down to the battery via a DC-DC converter, capturing the full array power. On any off-grid system above ~100 W array capacity, the MPPT upgrade pays back in 1–3 years through additional energy harvested. For very small systems (under 50 W) the cost differential may not pay back; for typical &gt; 500 W off-grid PV, MPPT is the standard. The customer\'s question deserves a yes recommendation backed by the cost-benefit calculation.',
  },
];

const faqs = [
  {
    question:
      'How does the inverter actually adjust the PV string operating voltage?',
    answer:
      'The grid-tied inverter has a DC-DC converter stage (typically a boost converter) that controls the voltage seen at the PV string terminals independently of the downstream DC bus voltage. The MPPT controller commands the DC-DC duty cycle to set the input voltage; the boost converter steps the voltage to whatever the inverter\'s internal DC bus requires (typically 400–800 V). As the MPPT commands a different input voltage, the duty cycle adjusts and the operating point on the I-V curve moves. The inverter then converts the DC bus to AC at grid frequency for export.',
  },
  {
    question:
      'How fast does MPPT actually update?',
    answer:
      'Modern inverter MPPT updates several times per second (typical cycle 100–500 ms). Under steady-state conditions the operating point oscillates within a small range around V_mp at this update rate. Under fast irradiance changes (cloud passes), the algorithm tracks the new MPP within 1–3 cycles (typically &lt; 2 seconds for the worst cases). The update rate is a trade-off: too slow and the algorithm misses fast-changing conditions; too fast and steady-state oscillation losses grow. Modern adaptive algorithms vary the update rate based on conditions.',
  },
  {
    question:
      'Do MPPT efficiencies on inverter datasheets matter?',
    answer:
      'Yes. The MPPT efficiency on a datasheet (typically &gt; 99% for modern residential inverters) is the fraction of available array power the inverter actually captures vs the theoretical MPP. A 99.5% MPPT efficiency means 0.5% of available energy is lost in the tracking process (oscillation around MPP, occasional tracking lag). The remaining inverter loss is the DC-AC conversion efficiency (typically 96–98%). Total inverter efficiency = MPPT efficiency × conversion efficiency, usually quoted as European efficiency or CEC efficiency on the datasheet. Both matter for annual yield calculation.',
  },
  {
    question:
      'Why does the MPPT range matter when selecting an inverter?',
    answer:
      'The MPPT range defines the voltage window within which the inverter can operate the string at MPP. If the string\'s V_mp falls below MPPT min (e.g. on a very hot summer day), the inverter cannot operate at MPP — it operates at MPPT min, losing yield. If the string\'s V_mp rises above MPPT max (cool conditions on a long string), the inverter operates at MPPT max, off-MPP at the upper end. The design check is to verify V_mp stays within MPPT range across the operating temperature envelope, which means picking the right string length for the inverter\'s specific MPPT range.',
  },
  {
    question:
      'Can MPPT track multiple MPPs (e.g. under partial shading)?',
    answer:
      'A standard MPPT (P&O or incremental conductance) tracks the global MPP — the highest point on the P-V curve. Under partial shading the curve can have multiple local MPPs (one for each bypass-diode-isolated sub-string), and a standard MPPT can get stuck on a lower local MPP, missing the higher global MPP. Modern inverters implement &ldquo;global MPPT scan&rdquo; functions that periodically sweep the full V range to find the true global maximum. For severe partial shading scenarios, module-level optimisation (microinverters / power optimisers) is the cleaner solution — each module has its own MPPT, eliminating the partial-shade ambiguity.',
  },
  {
    question:
      'What\'s the difference between &ldquo;peak efficiency&rdquo; and &ldquo;European efficiency&rdquo; on an inverter datasheet?',
    answer:
      'Peak efficiency is the inverter\'s best-case efficiency at one specific operating point (typically around 50% of rated power). European efficiency (sometimes called &ldquo;Euro efficiency&rdquo;) is a weighted average across multiple load points, weighted to reflect typical European solar conditions — more time at part-load than at full power. Euro efficiency is a better predictor of real-world annual energy capture. CEC efficiency (the California Energy Commission equivalent) is weighted differently to reflect sunnier conditions. For UK installs, Euro efficiency is the more relevant figure. Modern residential inverters achieve 96–98% Euro efficiency.',
  },
  {
    question:
      'Does MPPT change anything for the cert evidence bundle or the BS 7671 design?',
    answer:
      'MPPT itself is an inverter function — not a BS 7671 design requirement. What BS 7671 requires is the string design that produces V_oc within the inverter absolute maximum (Section 2.3 cold-morning calculation) and V_mp within the MPPT range. The cert evidence bundle records the inverter\'s MPPT specifications (range, number of MPPTs, MPPT efficiency) as part of the design pack — these inform the string-to-inverter compatibility check. The IET CoP for Grid-Connected Solar PV Installations provides the operational methodology.',
  },
  {
    question:
      'Will adding a power optimiser to one module in a string improve the rest?',
    answer:
      'No — power optimisers and microinverters work as a system. A single module-level optimiser on a string-level system doesn\'t materially help. To get the module-level MPPT benefit, the whole array must be optimised module-by-module (each module gets a power optimiser, the string into the optimised inverter; OR each module gets a microinverter, no string inverter). Retrofitting one optimiser is rarely worth the cost. The design choice is at the architecture level, not the per-module level.',
  },
  {
    question:
      'What MPPT specifications matter most when comparing inverters?',
    answer:
      'Five MPPT specifications. (1) MPPT voltage range (the V_mp window the inverter can operate within). (2) Number of MPPTs (1, 2, or 3 for residential; up to 6+ for commercial). (3) MPPT efficiency (typically &gt; 99% on modern inverters). (4) Maximum DC input voltage per MPPT (drives the cold-day V_oc limit). (5) Maximum DC input current per MPPT (drives the per-string current limit and how many strings can connect in parallel to a single MPPT). The MPPT design verification — string V_oc and V_mp across the operating temperature envelope vs the inverter\'s MPPT envelope — uses all five values.',
  },
];

export default function RenewableEnergyModule2Section4() {
  const navigate = useNavigate();

  useSEO({
    title:
      'MPPT — Maximum Power Point Tracking | Renewable Energy 2.4 | Elec-Mate',
    description:
      'Maximum Power Point Tracking — the algorithm that continuously adjusts PV string voltage to operate at maximum power. I-V and P-V curves, perturb-and-observe vs incremental conductance, multi-MPPT inverter architecture, and MPPT range matching against the string operating envelope.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 4 · BS 7671:2018+A4:2026"
            title="MPPT — Maximum Power Point Tracking"
            description="The algorithm that continuously adjusts PV string voltage to operate at maximum power. I-V and P-V curves, perturb-and-observe vs incremental conductance, multi-MPPT inverter architecture, and MPPT range matching."
            tone="yellow"
          />

          <TLDR
            points={[
              'MPPT (Maximum Power Point Tracking) is the electronic control function that continuously adjusts the PV string operating voltage to keep it at the maximum power point on the I-V curve, where V × I is at maximum.',
              'The MPP shifts continuously as irradiance and temperature change. Irradiance scales I_sc roughly linearly; temperature shifts V_oc and V_mp via the temperature coefficient. The MPPT algorithm tracks the moving MPP in real time.',
              'Two common MPPT algorithms: perturb-and-observe (P&O — step the operating voltage and observe whether power increased, repeat) and incremental conductance (use dI/dV = -I/V at MPP to track directly). P&O is simpler; incremental conductance handles fast-changing conditions better.',
              'Multi-MPPT inverter architecture (2–3 MPPTs typical on residential hybrid inverters; 3–6+ on commercial) lets the installer connect strings of different orientations or characteristics independently — eliminating string-level mismatch losses.',
              'MPPT range matching against string operating envelope is mandatory: cold-morning V_oc < inverter absolute maximum, hot-day V_mp > MPPT minimum, cool-condition V_mp < MPPT maximum. All three calculations are mandatory parts of an MCS-compliant design pack.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain what MPPT does and why operating a PV array at MPP captures 20–40% more energy than operating at the battery / load voltage.',
              'Locate the MPP on an I-V curve and describe how it moves with irradiance and temperature changes.',
              'Distinguish the perturb-and-observe and incremental conductance MPPT algorithms and identify when each is preferable.',
              'Apply multi-MPPT inverter architecture to multi-orientation arrays, partial-shade scenarios, and mixed-string designs.',
              'Run the three MPPT voltage rules at string design stage — cold-morning V_oc, hot-day V_mp, cool-condition V_mp.',
              'Read inverter datasheet MPPT specifications (range, number of MPPTs, MPPT efficiency, maximum DC input voltage and current per MPPT) and apply them to the string compatibility check.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>The MPP moves. The MPPT chases it.</Pullquote>

          <ContentEyebrow>What MPPT does — and why it matters</ContentEyebrow>

          <ConceptBlock
            title="The Maximum Power Point — and why operating off it costs yield"
            plainEnglish="Every PV string has a single operating point — V_mp and I_mp — where the product V × I is at maximum. MPPT is the electronic function that keeps the inverter operating the string at this point, continuously, as conditions change."
            onSite="Without MPPT, the array operates at whatever voltage the load or battery imposes — typically well below V_mp. The lost power is the difference between V_mp × I_mp at MPP and V_actual × I_actual at the off-MPP operating point. 20–40% yield loss is typical for non-MPPT operation."
          >
            <p>The Maximum Power Point on the I-V curve:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Sits at the &ldquo;knee&rdquo; of the I-V curve</strong>
                {' '}— where the curve transitions from current-source behaviour (near
                I_sc) to voltage-source behaviour (near V_oc)
              </li>
              <li>
                <strong className="text-white">Voltage at MPP: V_mp</strong> — typically
                ~80% of V_oc for crystalline silicon (e.g. 33.3 V for a module with 41.6
                V V_oc)
              </li>
              <li>
                <strong className="text-white">Current at MPP: I_mp</strong> — typically
                ~92–96% of I_sc (e.g. 11.8 A for a module with 12.5 A I_sc). I_mp is
                always strictly less than I_sc on a real I-V curve — the MPP sits below
                I_sc on the current axis
              </li>
              <li>
                <strong className="text-white">Power at MPP: P_max = V_mp × I_mp</strong>
                {' '}— this is the module\'s nameplate power at STC
              </li>
            </ul>
            <p>How conditions change the MPP:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Irradiance changes</strong> — scale I_sc
                roughly linearly. Brighter sun, higher I_sc, higher MPP power, V_mp
                changes only slightly
              </li>
              <li>
                <strong className="text-white">Temperature changes</strong> — shift V_oc
                and V_mp via the temperature coefficient. Hot cells, lower V_oc and V_mp;
                cold cells, higher V_oc and V_mp
              </li>
              <li>
                <strong className="text-white">Partial shading</strong> — bypass diodes
                engage on shaded sub-strings, creating multiple local MPPs on the P-V
                curve. The MPPT must find the global maximum
              </li>
              <li>
                <strong className="text-white">Module degradation</strong> — gradual
                long-term shift; MPPT tracks it without issue
              </li>
            </ul>
            <p>
              The MPPT algorithm runs in the inverter (for grid-tied PV) or the charge
              controller (for off-grid PV with batteries). It commands the DC-DC
              converter stage in the inverter to vary the PV string operating voltage,
              measures the resulting power, and adjusts to find or maintain V_mp.
            </p>
          </ConceptBlock>

          <MpptTrackingCurve caption="The MPPT continuously hunts the voltage that yields peak power as sun and temperature change." />

          <VideoCard url="https://www.youtube.com/watch?v=BJpCWKgW8Ac" title="How an MPPT Solar Charge Controller Works" channel="The Engineering Mindset" topic="Maximum power point tracking — how the controller keeps the panel at its MPP across changing irradiance and temperature." />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>Perturb-and-observe — the workhorse MPPT algorithm</ContentEyebrow>

          <Pullquote>Step. Measure. Repeat. The perturb-and-observe algorithm in three words.</Pullquote>

          <ConceptBlock
            title="How P&O works — and why it\'s the dominant MPPT algorithm"
            plainEnglish="P&O perturbs the operating voltage by a small step, measures whether array power went up or down, and steps again in the direction of increasing power. When power starts decreasing, the algorithm reverses. The result: continuous oscillation around the MPP."
            onSite="The simplicity of P&O is its strength. It needs only an input voltage measurement and an input power measurement — no derivatives, no curve fitting, no calibration. The trade-off is the steady-state oscillation around MPP, which costs a small fraction of a percent in steady-state operation."
          >
            <p>The P&O algorithm cycle:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Step 1</strong> — Measure current array
                power P_k at operating voltage V_k
              </li>
              <li>
                <strong className="text-white">Step 2</strong> — Perturb V by a small
                step (typically ΔV ≈ 0.5–1 V on a residential inverter)
              </li>
              <li>
                <strong className="text-white">Step 3</strong> — Measure new array power
                P_(k+1) at new operating voltage V_(k+1) = V_k + ΔV
              </li>
              <li>
                <strong className="text-white">Step 4</strong> — Compare. If P_(k+1) &gt;
                P_k, the perturbation moved toward MPP — continue in same direction. If
                P_(k+1) &lt; P_k, reverse direction (next perturbation will be -ΔV)
              </li>
              <li>
                <strong className="text-white">Step 5</strong> — Repeat — the algorithm
                cycle typically runs at 5–10 Hz (100–200 ms per cycle)
              </li>
            </ul>
            <p>Adaptive P&O refinements in modern inverters:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Variable step size</strong> — larger ΔV
                under fast-changing conditions (cloud transitions), smaller ΔV under
                steady-state — reducing oscillation loss
              </li>
              <li>
                <strong className="text-white">Global MPPT scan</strong> — periodic full
                V_oc-to-V_min sweep to find the global MPP under partial shade (where
                local maxima from bypass-diode-isolated sub-strings can trap a simple P&O
                algorithm)
              </li>
              <li>
                <strong className="text-white">Cloud-detection logic</strong> — distinguish
                between a P&O perturbation effect and a real irradiance change, to avoid
                mis-tracking during cloud transitions
              </li>
            </ul>
            <p>
              Modern P&O implementations achieve &gt; 99% MPPT efficiency under
              steady-state conditions and &gt; 98% under typical UK partial-cloud
              variability. The remaining 1–2% loss is the cost of the algorithm\'s
              tracking method; a hypothetical perfect-tracking algorithm would be the
              benchmark, never achievable in practice.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <ContentEyebrow>Incremental conductance — the mathematical alternative</ContentEyebrow>

          <ConceptBlock
            title="Incremental conductance — using dI/dV to find MPP directly"
            plainEnglish="At the MPP, the slope dP/dV is zero — power is at its maximum. This translates to dI/dV = -I/V at MPP. Incremental conductance measures dI and dV continuously and adjusts V to satisfy the equality directly."
            onSite="Incremental conductance is preferred where rapid irradiance changes matter (partial cloud, complex shading patterns) — it tracks new MPPs faster than P&O. Trade-off: more computationally demanding, more sensitive to measurement noise."
          >
            <p>The mathematical foundation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">At MPP</strong> — dP/dV = 0 (the slope of
                the P-V curve is zero at the peak)
              </li>
              <li>
                <strong className="text-white">Differentiation</strong> — P = V × I, so
                dP/dV = I + V × dI/dV
              </li>
              <li>
                <strong className="text-white">At MPP</strong> — dP/dV = 0 means I + V ×
                dI/dV = 0, which gives dI/dV = -I/V
              </li>
              <li>
                <strong className="text-white">Algorithm</strong> — measure dI and dV
                between consecutive samples, compute the ratio, compare to -I/V. If
                dI/dV &gt; -I/V, we are below MPP voltage — increase V. If dI/dV &lt;
                -I/V, we are above MPP voltage — decrease V. If dI/dV = -I/V (within
                tolerance), we are at MPP — hold
              </li>
            </ul>
            <p>Comparison with P&O:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Tracking speed</strong> — incremental
                conductance reaches the new MPP in 1 measurement cycle after a step-change
                in irradiance; P&O takes 2–3 cycles
              </li>
              <li>
                <strong className="text-white">Steady-state oscillation</strong> —
                incremental conductance can hold exactly at MPP (no oscillation needed);
                P&O always oscillates by ±ΔV
              </li>
              <li>
                <strong className="text-white">Computation</strong> — incremental
                conductance requires division and derivative calculation; P&O requires
                only comparison
              </li>
              <li>
                <strong className="text-white">Noise sensitivity</strong> — incremental
                conductance is more sensitive to current and voltage measurement noise
                (the dI/dV calculation amplifies noise)
              </li>
            </ul>
            <p>
              Most residential inverters use enhanced P&O variants for the simpler
              implementation. Some premium inverters use incremental conductance or
              hybrid algorithms combining both — using P&O for steady-state and
              incremental conductance during rapid changes. For UK partial-cloud
              conditions, the choice rarely makes more than a 1–2% annual yield
              difference between well-implemented algorithms.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>Multi-MPPT architecture — and why it matters</ContentEyebrow>

          <Pullquote>One MPPT per orientation. One MPPT per shade pattern. One MPPT per design constraint.</Pullquote>

          <ConceptBlock
            title="Why modern hybrid inverters have 2 or 3 MPPTs"
            plainEnglish="Multi-MPPT solves the string mismatch problem from Section 2.3 architecturally. Each MPPT operates one string independently at its own MPP. South-facing string into MPPT 1; east-facing string into MPPT 2; each tracks its own MPP without dragging the other."
            onSite="The architectural decision at design stage: how many strings does the array geometry need? One orientation, no shade variation, identical module count: single MPPT viable. Multi-orientation, mixed shade, mixed module count: multi-MPPT required. Most modern residential hybrid inverters have 2 MPPTs as standard."
          >
            <p>Multi-MPPT inverter configurations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Single MPPT</strong> — all strings combine
                into one MPPT input. Viable for single-orientation arrays with matched
                strings. Common on entry-level and lowest-cost inverters.
              </li>
              <li>
                <strong className="text-white">Dual MPPT</strong> — two independent
                MPPTs, typically with one or more parallel strings per MPPT. Standard on
                modern residential hybrid inverters. Handles two-orientation roofs and
                some partial-shade variation.
              </li>
              <li>
                <strong className="text-white">Triple MPPT</strong> — three independent
                MPPTs on the same inverter. More flexibility for complex roof geometries
                or premium / commercial installs.
              </li>
              <li>
                <strong className="text-white">Six+ MPPTs</strong> — commercial-scale
                inverters with many independent inputs. Each input may host multiple
                parallel strings, all operating at the same MPPT.
              </li>
            </ul>
            <p>The design decision flow:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Single orientation, single roof pitch,
                no shade</strong> — single MPPT is adequate
              </li>
              <li>
                <strong className="text-white">Two orientations</strong> — dual MPPT
                eliminates the orientation mismatch loss
              </li>
              <li>
                <strong className="text-white">Two orientations + partial shade</strong>
                {' '}— dual MPPT plus possible module-level optimisation
              </li>
              <li>
                <strong className="text-white">Three or more orientations</strong> —
                triple MPPT inverter, or module-level optimisation (microinverters /
                power optimisers)
              </li>
              <li>
                <strong className="text-white">Heavy partial shading on any
                orientation</strong> — module-level optimisation regardless of inverter
                count
              </li>
            </ul>
            <p>
              The cost differential between single and dual MPPT inverters is typically
              £150–300 on residential pricing. The yield gain from eliminating
              orientation mismatch on a multi-orientation array is typically £100–200
              per year. The payback is 1–3 years; the 25-year value is substantial.
              Always specify multi-MPPT on multi-orientation installs.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>MPPT range matching — the design-stage compatibility check</ContentEyebrow>

          <Pullquote>Cold-morning V_oc below absolute max. Hot-day V_mp above MPPT min. Cool V_mp below MPPT max.</Pullquote>

          <ConceptBlock
            title="The three MPPT voltage rules — every design pack must verify"
            plainEnglish="Three voltage checks govern PV string-to-inverter compatibility. Each addresses a different operating-condition extreme. Together they verify the string operates correctly across the year\'s operating envelope."
            onSite="The cert evidence bundle for an MCS-compliant PV install includes all three calculations. Missing any one is a design pack incompleteness that surfaces at MCS audit or at the first cold-morning trip / hot-day yield collapse."
          >
            <p>The three voltage rules:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Rule 1 — Cold-morning V_oc &lt; inverter
                absolute maximum DC input voltage</strong> (with margin). String V_oc
                rises with falling temperature; cold-morning V_oc can be 8–15% above STC.
                Exceeding the inverter limit risks over-voltage damage. Covered in Section
                2.3.
              </li>
              <li>
                <strong className="text-white">Rule 2 — Hot-day V_mp &gt; inverter MPPT
                minimum voltage</strong>. String V_mp falls with rising temperature; on
                a hot UK roof V_mp can drop 8–15% below STC. If V_mp falls below MPPT
                min, the inverter cannot track at MPP and yield drops during peak
                production hours.
              </li>
              <li>
                <strong className="text-white">Rule 3 — Cool-condition V_mp &lt; inverter
                MPPT maximum voltage</strong>. On cool days V_mp sits closer to its STC
                value; on long strings this can approach the MPPT max. Exceeding MPPT
                max forces the inverter to operate off-MPP at the upper end.
              </li>
            </ul>
            <p>The calculation pattern (per rule):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>Module datasheet value at STC (V_oc or V_mp)</li>
              <li>Module temperature coefficient (V_oc or V_mp coefficient, typically -0.25 to -0.35 %/°C)</li>
              <li>Site design temperature (minimum cell temp for Rule 1, maximum cell temp for Rule 2, design typical for Rule 3)</li>
              <li>Temperature delta from STC reference (25°C)</li>
              <li>Scaled module voltage at the design temperature</li>
              <li>Multiplied by number of modules in series for string-level value</li>
              <li>Compared against the inverter\'s relevant limit</li>
            </ul>
            <p>
              Margin: 5–10% headroom on each rule is good practice. The cert evidence
              bundle records each calculation with the inputs used; MCS audit samples
              the design pack and looks for all three calculations completed.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <SectionRule />

          <ContentEyebrow>What it looks like in the wild</ContentEyebrow>

          <Scenario
            title="A 6 kWp install with one south-facing roof and one east-facing roof"
            situation="A customer with a south-facing main roof pitch (10 modules fit) and an east-facing extension roof (5 modules fit) asks for a 6 kWp PV install. 15 × 400 W modules total. Available hybrid inverters: a single-MPPT model (£1,200) and a dual-MPPT model (£1,450)."
            whatToDo="Specify the dual-MPPT inverter. String 1: 10 modules on south pitch into MPPT 1 — design pack runs the three voltage rules against MPPT 1\'s range. String 2: 5 modules on east pitch into MPPT 2 — design pack runs the three voltage rules against MPPT 2\'s range. Each string operates at its own MPP across the day; the morning peak captured by the east string and the midday-afternoon peak captured by the south string add directly. Modelled annual yield improvement vs single-MPPT configuration: ~8–12% (mismatch loss eliminated). Over 25 years at typical UK PV economics, the additional yield is worth £2,500–£4,000 — vastly exceeding the £250 inverter price differential. The cert evidence bundle records the two-string architecture, the per-MPPT voltage rule checks, and the inverter MPPT specifications."
            whyItMatters="The £250 inverter saving on the single-MPPT alternative is the most expensive line item on the install\'s 25-year life. The mismatch losses on a single-MPPT multi-orientation array compound year after year. The dual-MPPT decision pays back many times over. This scenario is one of the most common UK domestic PV configurations, and the dual-MPPT call is almost always correct."
          />

          <Scenario
            title="A hot UK summer afternoon — string V_mp drops below MPPT minimum"
            situation="An 8-module string on a south-facing UK roof commissions in autumn and works correctly through winter. On the first 30°C UK summer afternoon, cell temperatures reach 65°C. The customer\'s monitoring shows the inverter\'s reported DC voltage stuck at 130 V (the MPPT minimum on this inverter) while array output sits at ~50% of expected for the conditions."
            whatToDo="Diagnose: hot-day V_mp has dropped below the inverter\'s MPPT minimum. The inverter is operating at MPPT min, not at the string\'s actual V_mp — losing yield. Calculation check: 8 modules × STC V_mp 33.3 V = 266 V at STC. At 65°C (40°C above STC reference) with V_mp coefficient -0.35%/°C: V_mp scales by (1 - 40 × 0.0035) = 0.86, so hot-day V_mp = 266 × 0.86 = 229 V. But wait — that\'s still above 130 V MPPT minimum. Need to re-check the calculation or look for a fault. Investigation: one module in the string has failed in a way that holds its V_mp at near-zero (a faulty cell short-circuit); the rest-of-string V_mp = 7 × 33.3 × 0.86 = 200 V. Still above MPPT min. The 130 V inverter reading suggests another issue — possibly two failed modules, or a string-level wiring fault. Diagnostic: isolate the string, test each module\'s V_oc individually, check for the fault location."
            whyItMatters="MPPT operating-point diagnostics are part of the post-install troubleshooting toolkit. The combination of inverter monitoring data plus module-level V_oc testing localises faults that aren\'t visible from the inverter alone. The commissioning baseline (Section 2.3) becomes the comparison point — current V_oc readings vs baseline V_oc readings localise the affected module(s)."
          />

          <CommonMistake
            title="Specifying a single-MPPT inverter on a multi-orientation array to save cost"
            whatHappens="An installer quotes a multi-orientation install with a single-MPPT inverter to come in below a competitor\'s price. The customer accepts. The array commissions and works. Mismatch losses between the orientations drag the annual yield down by 10–15% vs the modelled PVGIS expectation. The customer queries the underperformance; the installer attempts to explain &ldquo;system efficiency&rdquo;; the customer remains dissatisfied; the EICR at 5 years flags the architecture as a design choice rather than a fault. The customer\'s 25-year energy loss is many times the inverter price differential."
            doInstead="Always specify multi-MPPT on multi-orientation installs. The cost differential is £150–300; the 25-year yield value is £2,500–£4,500 on a typical UK install. The PWI install pattern flags this — modules at different orientations need separate MPPTs, not combined strings. MIS 3002 design pack expects the multi-MPPT architecture on multi-orientation arrays; specifying single-MPPT on a multi-orientation array is a design pack red flag."
          />

          <CommonMistake
            title="Skipping the hot-day V_mp calculation in the design pack"
            whatHappens="The installer completes the cold-morning V_oc check (the high-profile one) but skips the hot-day V_mp check against the MPPT minimum. The string V_mp at the design maximum cell temperature falls below the inverter\'s MPPT minimum. On hot summer afternoons the inverter operates at MPPT min, not at MPP — losing 10–20% during peak production hours. The customer\'s annual yield falls below modelled expectations by 3–5% (averaged across the year)."
            doInstead="All three MPPT voltage rules must be checked in the design pack — cold-morning V_oc (Rule 1), hot-day V_mp (Rule 2), cool-condition V_mp (Rule 3). MIS 3002 mandates the full three-rule check. The hot-day V_mp check is the most-skipped; the cold-morning V_oc check gets attention because it\'s the catastrophic-failure mode (inverter damage), while the hot-day V_mp issue manifests as yield loss not catastrophe."
          />

          <CommonMistake
            title="Treating the MPPT inverter as a black box without understanding its limits"
            whatHappens="The installer specifies an inverter by P_max rating alone without checking the MPPT range. The string V_oc at STC fits within the inverter\'s absolute maximum (so Rule 1 passes), but the inverter\'s MPPT range is narrow and the string V_mp on cool days sits at the MPPT max. The inverter operates off-MPP at the upper end of its range, losing 5–8% during cool-condition peak production. The yield loss is invisible to the customer (it looks like normal seasonal variation) but real."
            doInstead="Read the inverter datasheet for all five MPPT specifications: range, number of MPPTs, MPPT efficiency, maximum DC input voltage per MPPT, maximum DC input current per MPPT. Run the three voltage rules against the actual MPPT range, not just the absolute maximum. The inverter MPPT range is the operating window; staying inside it across the temperature envelope is the design discipline."
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'MPPT (Maximum Power Point Tracking) is the electronic function that continuously adjusts PV string operating voltage to operate at the maximum power point — where V × I is at maximum. Without MPPT, arrays lose 20–40% of available power.',
              'The MPP sits at the &ldquo;knee&rdquo; of the I-V curve at V_mp and I_mp. The MPP shifts continuously with irradiance (scales I_sc) and temperature (shifts V_oc and V_mp).',
              'Perturb-and-observe (P&O) is the dominant MPPT algorithm — simple, robust, achieves &gt; 99% MPPT efficiency in modern implementations. Continuous small oscillation around MPP is the characteristic steady-state behaviour.',
              'Incremental conductance is the mathematical alternative — uses dI/dV = -I/V at MPP to track directly. Faster under rapid irradiance changes; more sensitive to measurement noise; less common in mainstream residential inverters.',
              'Multi-MPPT inverter architecture (2–3 MPPTs typical on modern residential hybrid inverters) eliminates string mismatch losses by operating each string independently. Mandatory on multi-orientation arrays; cost differential pays back in 1–3 years.',
              'Three MPPT voltage rules at design stage: cold-morning V_oc < inverter absolute maximum (Rule 1, Section 2.3); hot-day V_mp > MPPT minimum (Rule 2); cool-condition V_mp < MPPT maximum (Rule 3). MCS-compliant design packs check all three.',
              'PWM charge controllers (off-grid) operate the array at battery voltage — losing 20–40% vs MPPT controllers. MPPT controllers pay back in 1–3 years on any system above ~100 W array capacity.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 4 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-2-section-3')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 2.3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Strings and arrays
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-2-section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.5 Inverter topologies
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
