/**
 * Module 4 · Section 3 · Subsection 4 — RCD and AFDD nuisance trips
 * Maps to C&G 2365-03 / Unit 303 / LO3 / AC 3.1
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 3.5 — fault locations and
 * symptoms; A4:2026 layer for AFDD requirements.
 *
 * Frame: the practical diagnosis of RCD nuisance trips (cumulative leakage,
 * single-source leakage, weather-correlated, appliance failure) and AFDD
 * nuisance trips (electronics false trigger, switching transients) — using
 * the clamp meter, the differential isolation method, and the AFDD-specific
 * test functions. A4:2026 reinforced AFDD requirements.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'RCD and AFDD nuisance trips (3.4) | Level 3 Module 4.3.4 | Elec-Mate';
const DESCRIPTION =
  'The practical diagnosis of RCD nuisance trips (cumulative leakage, weather, appliance failure) and AFDD nuisance trips (electronics false trigger, switching transients) — clamp meter method, differential isolation, AFDD test functions, A4:2026 layer.';

const checks = [
  {
    id: 'mod4-s3-sub4-cumulative',
    question:
      "What is 'cumulative leakage' on an RCD-protected installation and how does it cause nuisance trips?",
    options: [
      "Doesn't exist.",
      "Cumulative leakage = the SUM of small earth-leakage currents from every appliance and circuit on the RCD's protected side. Modern installations: every LED driver leaks 0.1–0.3 mA, every PC PSU leaks 0.5–1 mA, every appliance with EMC filter leaks 0.5–2 mA. On a circuit with 30 LED downlighters + a TV + a router + a PC + 3 appliances — total leakage easily reaches 8–15 mA at no fault. Add a marginal additional load (kettle, toaster) with their own leakage and you cross the 30 mA threshold. RCD trips even though no individual circuit / appliance is faulty. Common on LED-retrofit / smart-home installations.",
      "Always one source.",
      "Random.",
    ],
    correctIndex: 1,
    explanation:
      "Cumulative leakage is the modern fault category that didn't exist in pre-2010 installations. Every electronic device contributes a tiny earth leakage; the sum can exceed RCD threshold. Diagnostic: clamp meter L+N together at the RCD output reads total leakage (1–25 mA range). Healthy is 1–3 mA; problem is &gt;8 mA approaching the 30 mA threshold.",
  },
  {
    id: 'mod4-s3-sub4-isolation',
    question:
      "What's the 'differential isolation' method for finding which appliance is causing an RCD trip?",
    options: [
      "Just guess.",
      "Six-step. (1) Energise the RCD with all appliances disconnected on the protected circuits. (2) Clamp meter L+N together at the RCD output — note baseline leakage (typically 1–3 mA on healthy installation). (3) Connect appliances ONE AT A TIME, watching the clamp reading. (4) The appliance whose connection causes a sudden jump (e.g. baseline 2 mA, jumps to 18 mA on connecting the dishwasher) is the leaky one. (5) For confirmation, disconnect that appliance only — leakage drops back. (6) For appliances with intermittent leakage (e.g. heating element fails on heat cycle only), trigger the operating mode and watch for the leakage rise. Identifies the leaky appliance without needing to repeat the trip-and-reset cycle.",
      "Trip and guess.",
      "Random.",
    ],
    correctIndex: 1,
    explanation:
      "Differential isolation is the L3 standard for diagnosing RCD nuisance trips. The clamp meter (Sub 2.3) is the key instrument — it lets you measure leakage WITHOUT operating the RCD. Standard time on a typical job: 30–60 minutes vs hours of trip-and-guess.",
  },
  {
    id: 'mod4-s3-sub4-afdd',
    question:
      "An AFDD (arc fault detection device) keeps tripping on a kitchen circuit. What's the diagnostic approach?",
    options: [
      "Replace AFDD.",
      "Three-step. (1) Confirm AFDD is genuinely tripping on arc detection (most modern AFDDs distinguish trip cause via LCD or LED indicators) — NOT a regular RCD/MCB trip with the AFDD blamed. (2) If genuine arc trip, identify the arc source: cumulative motor commutator brushes (tumble dryer, washing machine, vacuum), poorly-terminated accessories on the affected circuit (use thermal imaging), faulty appliance with internal arcing. (3) Modern AFDDs (Hager AFB, Schneider Vigi+AF, Eaton AFDD) have 'arc signature' analysis — typical false-trigger sources: switching mode power supplies (phone chargers, laptop PSUs) with high-frequency content. Some installations need replacement of cumulative-motor appliances or different AFDD model. A4:2026 mandates AFDD on certain dwelling final circuits.",
      "Just reset.",
      "Replace circuit.",
    ],
    correctIndex: 1,
    explanation:
      "AFDD nuisance trips are an emerging fault category. The technology is signature-based and not 100% perfect — some appliances (cumulative motors, certain switching PSUs) have arc-like signatures that trigger false trips. The diagnostic approach is to identify whether the arc detection is real (then find the arc source) or false (then consider AFDD compatibility with the loads).",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "What's the 30 mA RCD threshold designed to protect against and why is it set there?",
    options: [
      "Random number.",
      "30 mA is the threshold below which a healthy adult is unlikely to suffer ventricular fibrillation from a sustained earth-fault current. Set by IEC 60479-1 (effects of current on the human body and livestock). Above 30 mA at typical contact times (200+ ms), fibrillation risk rises sharply. Below 30 mA, the heart can usually withstand the disturbance. The 30 mA RCD trips in 200 ms or less, limiting both the current AND the duration to safe levels. Higher-rated RCDs (100 mA, 300 mA) protect against fire risk (earth leakage that would cause heating) rather than electric shock.",
      "Just legacy.",
      "Just convenient.",
    ],
    correctAnswer: 1,
    explanation:
      "30 mA is a deliberate biological threshold from decades of research. BS 7671 411.4 (TT) and 411.4.5 (TN) require additional protection by 30 mA RCD on socket outlets and many other circuit types. The 30 mA + 200 ms combination is the safety case.",
  },
  {
    id: 2,
    question: "What's the difference between Type AC, Type A, Type F and Type B RCDs and which goes where?",
    options: [
      "All same.",
      "Type AC — detects AC residual currents only; obsolete for most new installations under BS 7671 A2:2022. Type A — detects AC and pulsating DC residual currents; current default for general use. Type F — detects AC + pulsating DC + composite multi-frequency residuals; required for circuits with VFDs, Class 1 PCs / servers. Type B — detects all of the above PLUS smooth DC residual currents; required for EV chargers (BS 7671 722.531), some PV inverters, three-phase rectifier loads. The choice depends on the load. Wrong type = won't detect the actual residual current = false sense of protection.",
      "Just one type.",
      "Doesn't matter.",
    ],
    correctAnswer: 1,
    explanation:
      "RCD type selection is critical for modern installations with electronic loads. EV chargers MUST have Type B (or Type A + dedicated 6 mA DC RCM in the charger). VFDs need Type F minimum. PCs and servers benefit from Type A or F. The wrong type is undetected non-protection. Hager / Schneider / Wylex sell the full type range; the L3 apprentice needs to know which to fit where.",
  },
  {
    id: 3,
    question: "Why does the 30 mA RCD threshold cause more nuisance trips on modern installations than on older ones?",
    options: [
      "RCDs are worse now.",
      "Three reasons. (1) Cumulative leakage from electronics — every LED, every PC PSU, every appliance with an EMC filter leaks a few mA; the sum can exceed 30 mA. (2) More circuits per RCD — older installations had separate RCDs per few circuits; modern dual-RCD CUs put many circuits on one RCD, accumulating leakage. (3) More appliances per circuit — modern kitchens have dishwasher + washing machine + tumble dryer + microwave + induction hob, each contributing leakage. The 30 mA threshold hasn't changed; the load behind it has multiplied. Solution: RCBO per circuit (instead of dual-RCD CU) to isolate each circuit's leakage; replacement of high-leakage appliances; redistribution of loads.",
      "Random.",
      "RCDs degrade.",
    ],
    correctAnswer: 1,
    explanation:
      "The cumulative leakage problem is the modern installation's defining RCD challenge. The trade response is RCBO-per-circuit (every circuit has its own RCBO; leakage is isolated to its source circuit). Most new builds and rewires now spec RCBO-per-circuit rather than dual-RCD CUs.",
  },
  {
    id: 4,
    question: "What's the operational difference between a 'split-load' (dual-RCD) CU and an 'all-RCBO' CU?",
    options: [
      "Same thing.",
      "DUAL-RCD CU — two main RCDs, each protecting a group of circuits via standard MCBs. Cheaper to install but a single fault on one circuit trips the entire RCD's group (e.g. a fault on the kitchen ring trips all circuits on RCD1, including the freezer and lights). ALL-RCBO CU — every circuit has its own RCBO with both overcurrent and earth-leakage protection. More expensive but a fault on one circuit only affects that circuit. Cumulative leakage is also limited per circuit. A4:2026 reinforces RCBO-per-circuit for higher-occupancy dwellings; trade preference is RCBO-per-circuit for any new install.",
      "RCBO is worse.",
      "Dual is newer.",
    ],
    correctAnswer: 1,
    explanation:
      "RCBO-per-circuit has become the trade standard for new installations and rewires. The selectivity advantage (one fault doesn't kill multiple circuits) and the cumulative-leakage advantage (each circuit's leakage isolated) both favour the design. Hager, Schneider, Wylex, MK all offer all-RCBO CUs at competitive price points now.",
  },
  {
    id: 5,
    question: "What's the difference between a Type AC RCD and a Type A RCD trip-time-test wise on the MFT?",
    options: [
      "Same test.",
      "The MFT (Megger MFT1741+, Kewtech KT64+) injects different test currents based on the RCD type. Type AC test: pure sinusoidal AC at I∆n. Type A test: pure sinusoidal AC AT I∆n PLUS pulsating DC at 1.4× I∆n (because Type A must detect both). Type F test: all of the above PLUS composite multi-frequency. Type B test: all of the above PLUS smooth DC at twice I∆n. Selecting the wrong type on the MFT may show 'pass' on a Type B device (because you're only testing the AC capability, not the DC) — false confidence. Modern MFTs auto-detect or have explicit type selection.",
      "Always same.",
      "Doesn't matter.",
    ],
    correctAnswer: 1,
    explanation:
      "The MFT trip-time test must be set to match the RCD type to fully verify the device. Megger MFT1741+ has explicit type selection (AC / A / F / B); Kewtech and Fluke models similar. Setting AC mode on a Type B RCD only tests its AC sensitivity, missing the DC capability.",
  },
  {
    id: 6,
    question: "BS 7671 A4:2026 reinforced AFDD requirements. What's the current requirement for AFDD on dwelling installations?",
    options: [
      "Not required.",
      "BS 7671 421.1.7 (per A4:2026 progression) requires AFDD on certain final circuits in specified locations: (a) bedrooms in Houses in Multiple Occupation (HMOs), care homes, dwellings used for short-term accommodation, (b) circuits feeding bedrooms in higher-occupancy student / hostel-type dwellings, (c) circuits feeding combustible-construction buildings (timber-frame in some interpretations). Single-family domestic dwellings are not currently mandated but A4 wording is moving toward broader uptake. Manufacturers (Hager AFB, Schneider Vigi+AF) sell combined RCBO+AFDD devices that fit in standard CU positions. The L3 apprentice's exam expectation: know AFDD is required where, why, and how it's specified.",
      "Always required.",
      "Never required.",
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 A4:2026 strengthened AFDD requirements significantly compared to A2:2022. The progression has been toward broader application; market penetration is still building. By the time most L3 apprentices qualify (next 18 months), AFDD will be standard fit in many specifications. Knowing the requirement and the diagnostic approach is the L3 expectation.",
  },
  {
    id: 7,
    question: "An AFDD won't latch on after a trip — keeps tripping the moment you press the toggle. What's likely wrong?",
    options: [
      "AFDD faulty.",
      "Two possibilities. (1) Active arc fault on the circuit — there's a real arc happening that the AFDD is correctly detecting and refusing to ignore. Investigate as a real fault: visual inspection, IR test, thermal imaging. (2) AFDD itself has failed in the 'trip' state — internal electronics fault. Test by removing the AFDD from the busbar (load disconnected) and trying to latch it; if it still won't latch, the AFDD is faulty and needs replacement. The L3 apprentice's protocol: investigate as real fault first; only if no fault is found, consider AFDD failure and substitute with known-good unit.",
      "Reset breaker.",
      "Try harder.",
    ],
    correctAnswer: 1,
    explanation:
      "AFDD won't-latch is a strong indicator of a real arc fault on the circuit — the AFDD doesn't permit the toggle to latch if it's detecting an arc signature. The investigative discipline is to treat it as a real fault (don't dismiss as 'AFDD glitch' without evidence). If investigation rules out a real fault, then AFDD failure is the diagnosis; substitute confirms.",
  },
  {
    id: 8,
    question: "What's an 'S-type' (selective) RCD and where is it used?",
    options: [
      "Same as Type B.",
      "S-type (or 'selective time-delayed') RCD has a built-in delay before tripping (typically 100–300 ms intentional delay). Used UPSTREAM of standard 30 mA RCDs for selectivity — the standard RCD trips on a downstream fault before the S-type does, so only the affected sub-circuit loses supply. Common application: TT installation main switch (S-type 100 mA) feeding sub-DBs with 30 mA RCDs on individual circuits. Also: TN-C-S installation with EV charger has S-type 100 mA upstream of EV charger to provide additional protection without nuisance-tripping on the EV's own RCM. Marked 'S' on the device label.",
      "Same as Type AC.",
      "Random.",
    ],
    correctAnswer: 1,
    explanation:
      "S-type RCDs are the upstream selective device in a layered protection scheme. The intentional delay allows downstream 30 mA devices to operate first on a localised fault. BS 7671 A4:2026 reinforces S-type usage at TT origins and upstream of EV chargers.",
  },
];

const faqs = [
  {
    question: "Why do RCDs trip more often in winter than summer?",
    answer:
      "Three reasons. (1) Heating loads — electric heaters / underfloor heating add additional leakage on heat cycles; cumulative leakage rises. (2) Condensation — winter humidity changes cause condensation in outdoor sockets / lights / unheated buildings; water-induced leakage. (3) Christmas lights — outdoor decorative lighting often has marginal IP rating; rain / dew causes leakage to earth. Standard winter-fault uptick across the trade. RCBO-per-circuit installations spread the load, reducing cumulative-leakage trips.",
  },
  {
    question: "Can I just upgrade the RCD to a higher rating (100 mA instead of 30 mA) to stop nuisance trips?",
    answer:
      "Almost always NO. The 30 mA threshold is for additional protection against electric shock under BS 7671 411.4.5 — it's a safety-critical specification. Replacing with 100 mA removes the shock protection. The right answer is to investigate the cause of the nuisance trips and rectify it (split the loads, replace the leaky appliance, install RCBO-per-circuit). The exception is upstream selectivity where an S-type 100 mA may sit ABOVE 30 mA RCDs — but that's adding a layer, not replacing the 30 mA.",
  },
  {
    question: "How do I tell if it's an RCD trip or an MCB trip on a tripped RCBO?",
    answer:
      "Most modern RCBOs (Hager, Schneider Vigi+RCBO) have an indicator flag that shows the trip cause — a yellow flag for residual current trip (RCD), a red flag for overcurrent trip (MCB). Some older RCBOs don't have the flag; you have to deduce from the load behaviour (RCD trip = appliance fault or earth leakage; MCB trip = overload or short circuit). Resetting and observing what happens next is diagnostic: if it trips immediately on reset = short circuit or persistent earth leakage; trips after a delay under load = overload; resets fine but trips later = intermittent leakage.",
  },
  {
    question: "Why do AFDDs sometimes trip when nothing's wrong?",
    answer:
      "AFDD detection is signature-based — looking for the high-frequency 'noise' on the current waveform that indicates an arc. Some appliances generate similar high-frequency content without being arcs: cumulative-motor brushes (vacuum, drill), poorly-filtered switching power supplies (cheap phone chargers, LED drivers), some RF welders / induction heaters in commercial settings. Modern AFDDs have improved discrimination but no detection technology is 100% perfect. The trade workaround: identify the false-trigger source and either replace it (e.g. bin the cheap phone charger) or use an AFDD model with better discrimination (Hager and Schneider iterate on this).",
  },
  {
    question: "What's the practical workflow for diagnosing an RCD nuisance trip on a modern domestic installation?",
    answer:
      "(1) Customer interview — when does it trip, what's running, weather correlation. (2) Identify which RCD / RCBO is tripping. (3) With circuit live, clamp meter L+N together at RCD output — note baseline leakage. (4) If baseline &gt;8 mA, suspect cumulative leakage; isolate appliances one at a time to identify which contribute. (5) If baseline &lt;3 mA but trips occur intermittently, suspect time-of-day or load-condition leakage; trigger suspect modes and watch the clamp. (6) If confirmed leaky appliance, customer pays for replacement; if confirmed wiring fault, isolate and rectify. Document findings on job sheet.",
  },
  {
    question: "Are RCBOs more reliable than MCBs?",
    answer:
      "More complex, similarly reliable. RCBO has all the MCB's mechanism PLUS the residual current detection circuitry — more components, more potential failure points. But: modern RCBOs from premium manufacturers (Hager, Schneider, Eaton) match MCB MTBF (mean time between failures) at typical domestic loading. Trade observation: cheaper RCBOs (sub-£25) have shorter life; premium devices (£30–50) match MCB life. The trip-time test on the MFT catches RCBOs approaching end of life before they fail in service.",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3')} className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start">
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 4 · Section 3 · Subsection 4"
            title="RCD and AFDD nuisance trips"
            description="The practical diagnosis of RCD nuisance trips (cumulative leakage, weather, appliance failure) and AFDD nuisance trips (electronics false trigger, switching transients) — clamp meter method, differential isolation, AFDD test functions, A4:2026 layer."
            tone="emerald"
          />

          <TLDR
            points={[
              "Modern RCD nuisance trips are usually CUMULATIVE leakage — many small leaks summing to &gt;30 mA. Clamp meter (L+N together) measures total leakage; differential isolation finds the source.",
              "RCD types: AC (legacy), A (default), F (VFD), B (EV / smooth DC). Wrong type = undetected non-protection. EV chargers MUST have Type B or Type A + 6 mA DC RCM.",
              "AFDD nuisance trips are usually real arcs (cumulative motors, poor terminations) or signature false-triggers (cheap PSUs, RF interference). A4:2026 reinforced AFDD requirements.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Diagnose RCD nuisance trips using clamp meter (L+N together) for total leakage measurement and differential isolation to identify the source.",
              "Distinguish RCD types — AC, A, F, B — and select the correct type for each load category (general, VFD, EV charger, PV).",
              "Recognise cumulative leakage as the modern installation's defining RCD problem and know the RCBO-per-circuit solution.",
              "Apply BS 7671 A4:2026 AFDD requirements — where mandated, why, and how to specify.",
              "Diagnose AFDD nuisance trips — distinguish real arc faults from signature false-triggers.",
              "Use S-type (selective) RCDs for upstream selectivity in TT and EV-charger installations.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>RCD nuisance trips — the cumulative leakage problem</ContentEyebrow>

          <ConceptBlock
            title="Why modern installations trip RCDs that older ones didn't"
            plainEnglish="Every electronic device in a modern home leaks a tiny earth current — LED drivers (0.1–0.3 mA each), PC PSUs (0.5–1 mA), appliances with EMC filters (0.5–2 mA each). The sum can easily reach 8–15 mA on a busy circuit, leaving little margin to the 30 mA RCD trip threshold. Add a marginal load and you exceed the threshold."
            onSite="Cumulative leakage is the modern installation's defining RCD problem. Pre-2010 installations had little electronics — leakage was dominated by the occasional faulty heater or motor. 2026 installations have hundreds of leakage sources. The RCD threshold hasn't changed; the load behind it has multiplied."
          >
            <p>Standard cumulative leakage values:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Each LED driver: 0.1–0.3 mA.</li>
              <li>Each PC / laptop PSU: 0.5–1 mA.</li>
              <li>Each appliance with EMC filter (washing machine, dishwasher, etc.): 0.5–2 mA.</li>
              <li>Smart meter / energy monitor: 0.1–0.5 mA.</li>
              <li>Each EV charger (without dedicated 6 mA RCM): up to 6 mA.</li>
            </ul>
            <p>
              On a modern kitchen circuit with 12 LED downlighters + dishwasher + washing machine + microwave + kettle + toaster: total cumulative leakage easily reaches 12–20 mA at idle. Add a partial fault (degraded heater element on washer) and you cross 30 mA.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 411.4.5 (Additional protection)"
            clause={<>"In each AC system, additional protection by means of a residual current device (RCD) in accordance with Regulation 415.1 shall be provided for socket outlets with a rated current not exceeding 32 A."</>}
            meaning={<>The 30 mA RCD requirement on socket outlets is the safety-case driver for the trip threshold. A4:2026 strengthened this with broader application (Reg 411.4.4 + 411.4.5) and reinforced AFDD requirements (Reg 421.1.7).</>}
            cite="Source: BS 7671:2018 incorporating Amendment 2:2022, Reg 411.4.5."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>The differential isolation diagnostic method</ContentEyebrow>

          <ConceptBlock
            title="Find the leak with a clamp meter, not by trial and error"
            onSite="The trip-and-guess approach (reset RCD, see what trips it next) is the apprentice's first-instinct method and the worst possible. The clamp meter approach finds the source in 30 minutes; the trip-and-guess approach takes hours and never definitively identifies the cause."
          >
            <p>The six-step differential isolation:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>1. Energise the RCD</strong> with all appliances disconnected on the protected circuits.</li>
              <li><strong>2. Clamp meter L+N together</strong> at the RCD output — note baseline leakage (1–3 mA on healthy installation).</li>
              <li><strong>3. Connect appliances ONE AT A TIME</strong>, watching the clamp reading.</li>
              <li><strong>4. The appliance whose connection causes a sudden jump</strong> (e.g. baseline 2 mA → 18 mA on connecting the dishwasher) is the leaky one.</li>
              <li><strong>5. For confirmation</strong>, disconnect that appliance only — leakage drops back.</li>
              <li><strong>6. For appliances with intermittent leakage</strong> (e.g. heater fails on heat cycle only), trigger the operating mode and watch for the leakage rise.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>RCD types and their applications</ContentEyebrow>

          <ConceptBlock
            title="Type AC, A, F, B — match the type to the load"
            plainEnglish="Different residual currents need different detection technology. The wrong type means undetected non-protection — false sense of safety."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Type AC</strong> — detects AC residual only. Obsolete for most new installations under A2:2022.</li>
              <li><strong>Type A</strong> — detects AC + pulsating DC. Current default for general use.</li>
              <li><strong>Type F</strong> — detects AC + pulsating DC + composite multi-frequency. Required for VFDs, Class 1 PCs / servers.</li>
              <li><strong>Type B</strong> — detects all of the above + smooth DC. Required for EV chargers (BS 7671 722.531), some PV inverters, three-phase rectifier loads.</li>
              <li><strong>S-type (selective)</strong> — built-in delay (100–300 ms) for upstream selectivity above 30 mA downstream RCDs. Used at TT main switch, upstream of EV chargers.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>AFDD nuisance trips — the new fault category</ContentEyebrow>

          <ConceptBlock
            title="Arc fault detection — what causes false trips and what causes real trips"
            onSite="AFDD is the newest protective device category. The detection is signature-based — looking for high-frequency content on the current waveform that indicates an arc. Effective at detecting real arc faults but sometimes triggers on similar-looking signatures from other sources."
          >
            <p>Real arc trip causes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cumulative motor brushes (tumble dryer, washing machine, vacuum, drill).</li>
              <li>Poorly-terminated accessories on the affected circuit (HRJ in early stages of arcing).</li>
              <li>Faulty appliance with internal arcing (failing motor brushes, wear on relay contacts).</li>
              <li>Damaged cable with intermittent contact.</li>
            </ul>
            <p>False trip sources:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Switching power supplies with high-frequency content (cheap phone chargers, laptop PSUs).</li>
              <li>RF interference from nearby transmitters (commercial RF welders, broadcasting).</li>
              <li>Dimmer modules generating switching noise.</li>
              <li>Some LED drivers with poor EMC filtering.</li>
            </ul>
            <p>
              Brand notes: Hager AFB, Schneider Vigi+AF, Eaton AFDD — improving discrimination with each generation. A4:2026 mandates AFDD on certain dwelling final circuits (Reg 421.1.7) — bedrooms in HMOs, care homes, short-term accommodation, plus some combustible-construction buildings.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 421.1.7"
            clause={
              <>
                "It is now a requirement to protect final circuits supplying socket-outlets with a rated current not exceeding 32&nbsp;A using arc fault detection devices (AFDD) in Higher Risk Residential Buildings, Houses in Multiple Occupation, Purpose-built student accommodation and Care homes. For all other premises, the regulation recommends AFDDs for single-phase circuits."
              </>
            }
            meaning={
              <>
                A4:2026 split AFDDs into mandatory categories (HRRBs, HMOs, PBSA, care homes) and recommended-elsewhere. When you&apos;re diagnosing an AFDD nuisance trip on, say, a private dwelling, you can&apos;t simply remove the AFDD and revert to a normal RCBO &mdash; that loses functionality the customer paid for, and on a mandatory-category property it would be a Code 2 non-compliance.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 421.1.7 redraft, verbatim from facet."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 643.3"
            clause={
              <>
                "Regardless of RCD Type, an alternating current test at rated residual operating current (IΔn) is used to verify the effectiveness of the RCD."
              </>
            }
            meaning={
              <>
                When an RCD is nuisance-tripping but appears to operate at I&Delta;n on the MFT, that single AC test at rated I&Delta;n is now the only required verification (5&times;I&Delta;n is gone in A4:2026). If the device passes the AC test but trips intermittently in service, the diagnosis points to cumulative leakage on the load side, not a faulty RCD.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 643.3 (RCD testing redraft), verbatim from facet."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Replacing the RCD instead of finding the leakage source"
            whatHappens={<>Apprentice arrives at a 'RCD trips occasionally' job. Tests the RCD — trip-time fine, MFT measurement OK. Replaces it anyway because they don't know how to find the cause. Customer pays for new RCD; problem persists; firm gets called back; bad reputation. Real cause was a failing dishwasher heater element (1.8 mA leakage on heat cycle) — a 30-second clamp meter measurement would have spotted it.</>}
            doInstead={<>For RCD nuisance trips, always use the clamp meter differential isolation method first (Sub 3.4). Find the actual leakage source. Replace the RCD only if testing shows the RCD is genuinely faulty (slow trip-time on MFT). Replacing a working RCD doesn\'t fix a leakage source; the source has to go.</>}
          />

          <CommonMistake
            title="Fitting Type A RCD on an EV charger circuit"
            whatHappens={<>Apprentice installs a domestic EV charger. CU has Type A RCBO covering the relevant circuit. Charger appears to work fine for weeks. Then one of the EV\'s batteries develops a smooth DC leakage to chassis (rare but happens). The Type A RCD doesn\'t see smooth DC; the leakage continues unprotected. Eventually a fault path opens (dampness in the charging cable, EV chassis to ground), customer takes a shock. Investigation finds the wrong RCD type.</>}
            doInstead={<>EV chargers MUST have Type B RCD OR Type A RCD + dedicated 6 mA DC RCM in the charger (most modern EVSEs include the 6 mA RCM by design — Zappi, Ohme, Pod Point, Tesla). Verify the EVSE specification AND the upstream RCD type at install. BS 7671 722.531 is explicit about this.</>}
          />

          <Scenario
            title="Recurring kitchen RCD trip on a new-build property"
            situation={<>Three-month-old new-build. Customer reports the kitchen RCBO trips two or three times per week. Always reset works. They\'ve had two firms out; both replaced the RCBO; problem persists.</>}
            whatToDo={<>(1) Customer interview — when does it trip? Customer recalls: usually around 7–8pm in the evening, sometimes when the dishwasher is running, sometimes when the washing machine is on. (2) Hypothesis: cumulative leakage. (3) Clamp meter L+N together at the RCBO output. With dishwasher off: 4 mA. With dishwasher running (rinse cycle): 7 mA. With washing machine also running: 14 mA. With kettle plugged in too: 22 mA. Threshold is 30 mA — they\'re operating at 70% of threshold under normal cooking-time load. (4) Add the LED downlighters that come on at 7pm (12 lights, ~3 mA cumulative): now at 25 mA. (5) Diagnosis: cumulative leakage from the modern kitchen\'s load mix is approaching the 30 mA threshold. The RCBO is correctly reporting an over-threshold leakage; it\'s not faulty. (6) Solutions: split the kitchen circuit into two RCBOs (one for the appliances, one for the lighting/sockets); replace LED drivers with lower-leakage models; or upgrade the CU to all-RCBO with the kitchen on a dedicated 30 mA RCBO (no shared circuits adding leakage). (7) Recommend the all-RCBO CU upgrade as the long-term solution; quote and document.</>}
            whyItMatters={<>Cumulative leakage is invisible without the clamp meter — the customer\'s symptoms are real but the root cause is design (one RCBO covering too many leaky loads), not a faulty component. Two previous firms replaced the wrong thing; the L3 apprentice\'s clamp meter approach finds the actual cause and recommends the right fix. The economic answer (CU upgrade) is bigger than the customer expected, but it\'s the correct answer.</>}
          />

          <SectionRule />

          <ContentEyebrow>Differential isolation — the appliance-by-appliance method</ContentEyebrow>

          <ConceptBlock
            title="When the clamp meter doesn't pin it down — the elimination method"
            plainEnglish="If the clamp meter shows leakage but you can't identify the source, the differential method works: disconnect everything; reset the RCD; plug back loads one at a time, observing the leakage clamp until the leakage rises above threshold. The load that pushed it over is the culprit."
            onSite="Use a Fluke 369 FC clamp around line + neutral together at the RCD output (or RCBO terminals). A healthy circuit reads &lt;1 mA standing leakage. Plug each appliance back in turn — kettle, washing machine, dishwasher, freezer, microwave, downlights, immersion heater — observe each step on the clamp display. Note which load takes the cumulative leakage past 30 mA."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Baseline reading</strong> — all loads off, all appliances unplugged. Clamp reads close to 0 mA. This is your zero baseline.</li>
              <li><strong>Plug-back sequence</strong> — one appliance at a time. Wait 30-60 seconds for inrush to settle. Read clamp.</li>
              <li><strong>Cumulative chart</strong> — note each appliance's leakage contribution. Some appliances (electronic SMPS loads) leak 1-3 mA continuously; some (kettle, immersion) leak only when running.</li>
              <li><strong>Test under load</strong> — for cycling loads (washing machine, dishwasher), test through their cycle. Leakage often peaks during heating phase.</li>
              <li><strong>Faulty appliance</strong> — single appliance leaking &gt;5 mA = faulty (typically heating element insulation breakdown, water ingress in motor, failed Y-class capacitor).</li>
              <li><strong>Cumulative breach</strong> — total leakage from healthy loads exceeding 30 mA = circuit design problem (too many loads on one RCD). Solution: split circuit, upgrade to all-RCBO CU.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>AFDD — what it actually detects</ContentEyebrow>

          <ConceptBlock
            title="The AFDD function — series and parallel arc detection"
            plainEnglish="An Arc Fault Detection Device (AFDD) detects arcing signatures in the current waveform — the chaotic, high-frequency pattern caused by intermittent contact arcing. Two arc types: SERIES arc (loose terminal arcing in the same conductor — most common) and PARALLEL arc (L-N or L-E arcing). AFDDs detect both."
            onSite="A4:2026 expanded AFDD requirements (Reg 421.1.7) — required for socket outlets in residential, accommodation in HMOs, and certain commercial. Standard products: Hager AFDD-RCBO range, Schneider Acti9 AFDD, Wylex AFDD. AFDD test button simulates an arc; the device should trip within seconds. Some devices have an indicator that shows what triggered the trip (RCD, MCB, or AFDD)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>What AFDD detects</strong> — high-frequency signatures (kHz range) characteristic of arcing. Not the steady-state current of a normal load.</li>
              <li><strong>Series arc</strong> — loose terminal arcing while current flows. Most common cause of electrical fires in residential. AFDD catches before fire develops.</li>
              <li><strong>Parallel arc</strong> — L-N or L-E arcing through degraded insulation. Can also trip MCB (overcurrent) or RCD (residual current) but AFDD catches earlier.</li>
              <li><strong>What AFDD doesn't detect</strong> — slow degradation that hasn't yet started arcing; non-arcing thermal damage (HRJ generating heat without yet producing detectable arc).</li>
              <li><strong>Test sequence</strong> — press the test button; AFDD should trip within ~1 second; trip indicator (often a different colour from the standard trip indicator) shows AFDD function operated. Reset is normal MCB-style.</li>
              <li><strong>BS EN 62606</strong> — the AFDD product standard. Defines test signatures and trip times. Type 1 is series arc only; Type 2 covers series and parallel.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>AFDD nuisance trips — diagnosis and resolution</ContentEyebrow>

          <ConceptBlock
            title="AFDD nuisance trips — switching transients and electronic loads"
            plainEnglish="AFDDs sometimes trip on signatures that aren't real arcs: dimmer switching, VSD output, switching power supplies, contactor operation, fluorescent lamp ballast. The L3 apprentice diagnoses by event pattern and load type."
            onSite="Diagnostic process: customer interview to identify timing pattern and what's running when trips occur; clamp meter (Fluke 369 FC) on the affected circuit during operation; isolate suspect loads one at a time; if nuisance pattern resolves, the load was the source. Resolution: replace the load with one that doesn't generate the false signature, or upgrade to a more discriminating AFDD."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Common nuisance triggers</strong> — old fluorescent ballasts (replace with LED retrofits), incompatible LED dimmers (use Click Mode or Aurora compatible products), cheap LED downlight drivers (Aurora Enlite, Collingwood, JCC Hyperion are AFDD-compatible), switch-mode appliances (older PCs, induction hobs).</li>
              <li><strong>Pattern check</strong> — does it trip at the same load configuration each time? If yes, source identified by elimination.</li>
              <li><strong>Voltage event correlation</strong> — Fluke 1730 PQ analyser can correlate trips with voltage events; if external transients are triggering, install Type 2 SPD upstream.</li>
              <li><strong>AFDD type</strong> — check device datasheet. Some have higher rejection of common nuisance signatures (e.g. Hager AFDD-RCBO has improved rejection for dimmers vs older designs).</li>
              <li><strong>Documentation</strong> — log each trip event for the customer; build pattern; recommend specific load replacements with quote.</li>
              <li><strong>Don't bypass the AFDD</strong> — if AFDD is required by BS 7671 for the location, bypassing it (e.g. fitting a non-AFDD RCBO instead) is a code C2 finding on next EICR. Investigate and resolve, don't bypass.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>RCD type selection — Type AC / A / B</ContentEyebrow>

          <ConceptBlock
            title="The right RCD type for the load — a A4:2026 emphasis area"
            plainEnglish="Different RCD types detect different fault current waveforms. Type AC sees only sinusoidal AC; Type A also sees pulsating DC; Type B also sees smooth DC. Modern installations (LED drivers, EV chargers, VSDs, solar PV) inject DC components into the residual current — the wrong RCD type either won't see the fault (no protection) or will nuisance-trip."
            onSite="A4:2026 reinforced RCD type selection — Type AC is now generally considered legacy except for purely sinusoidal loads (resistive heaters, incandescent lamps); Type A is the modern domestic standard; Type B is required for EV chargers (BS 7671 722.531.3.101) and many VSDs / battery storage / certain solar PV inverters. Check the load specification; select RCD type accordingly."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Type AC</strong> — sinusoidal AC residual only. Resistive heaters, simple incandescent / halogen circuits. Increasingly rare on modern installations.</li>
              <li><strong>Type A</strong> — sinusoidal AC + pulsating DC. Modern domestic standard. Catches LED drivers, switch-mode power supplies, single-phase VSDs.</li>
              <li><strong>Type F</strong> — Type A + high-frequency components. Used on certain VSD applications and inverter-fed loads.</li>
              <li><strong>Type B</strong> — Type A + smooth DC. Required for EV chargers (BS 7671 722.531.3.101), many three-phase VSDs, certain solar PV / battery storage inverters with DC-side faults.</li>
              <li><strong>Identifying installed RCDs</strong> — type marked on front of device. Hager: Type AC has no symbol; Type A has half-sine + dotted line; Type B has all symbols. Schneider similar.</li>
              <li><strong>Wrong-type symptom</strong> — Type AC on DC-injecting load: either silent failure (won't see fault) or nuisance trips when the DC component drives the RCD detection circuit into nonlinear region.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Modern RCD nuisance trips are usually CUMULATIVE leakage from many small electronic loads. Clamp meter (L+N together) measures total leakage; differential isolation finds the source.",
              "RCD types: AC (legacy), A (default), F (VFD), B (EV / smooth DC). EV chargers MUST have Type B or Type A + 6 mA DC RCM.",
              "30 mA RCD threshold is the IEC 60479-1 safety case for shock protection. Don\'t \'solve' nuisance trips by upgrading to higher mA — that removes the protection.",
              "RCBO-per-circuit (instead of dual-RCD CU) isolates each circuit\'s leakage and prevents cumulative trips. Trade standard for new installs / rewires.",
              "S-type (selective) RCDs upstream of standard 30 mA give selectivity. Used at TT origin and upstream of EV chargers.",
              "AFDD detection is signature-based — real arc trips (motor brushes, HRJ early arc) and false trips (cheap PSUs, RF interference) both possible.",
              "BS 7671 A4:2026 mandates AFDD on certain dwelling final circuits (HMO bedrooms, care homes, short-term accommodation, some combustible-construction).",
              "AFDD won\'t-latch is a strong indicator of real arc fault — investigate before assuming AFDD failure.",
            ]}
          />

          <Quiz title="RCD and AFDD nuisance trips — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3-3')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">3.3 Fault locations</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3-5')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">3.5 Special precautions</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
