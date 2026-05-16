/**
 * Module 4 · Section 6 · Subsection 2 — Apply correction techniques to common faults
 * Maps to C&G 2365-03 / Unit 303 / LO6 / AC 6.2 + AC 6.4
 *   AC 6.2 — "evaluate and apply appropriate fault diagnosis methods and techniques"
 *   AC 6.4 — "specify the procedures for the correction of faults"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 6.3 + 6.4 — apply techniques to
 * common circuit faults; correction methods.
 *
 * Frame: walks the canonical L3 fault correction techniques on common circuit
 * types — ring final, lighting circuit, immersion / shower circuit, dedicated
 * appliance circuit. Each section pairs the symptom, the diagnostic confirmation,
 * the correction technique and the verification.
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  "Apply correction techniques to common faults (6.2/6.4) | Level 3 Module 4.6.2 | Elec-Mate";
const DESCRIPTION =
  "L3 fault correction techniques on the four most common domestic / small-commercial circuits — ring final (broken ring, HRJ, R1+R2 anomaly), lighting (failed driver, two-way wiring fault), immersion / shower (overheated terminations, RCBO trip), dedicated appliance circuit (capacitor failure, bonding fault).";

const checks = [
  {
    id: "mod4-s6-sub2-broken-ring",
    question:
      "You've measured a kitchen ring final at the DB and the end-to-end continuity reading on the line conductors is open-circuit (the L1-L2 reading shows 'OL' on the Megger MFT1741). The ring is broken somewhere. What's the L3 correction technique?",
    options: [
      "Just use a Wago.",
      "Three-step technique. (1) DIAGNOSE the location — disconnect the ring at the DB, use the IR tester at 500 V from one end of each conductor with the OTHER end shorted to earth at the DB, walk the circuit with the customer's permission, listen / look for the section that gives a different reading. The break is between the last good reading and the first bad reading. The half-split method narrows it down quickly. (2) ACCESS the break — open the relevant socket back-box, junction box or accessory; identify the broken connection (loose terminal, fractured conductor, damaged Wago). (3) CORRECT — re-make the connection with the right method (manufacturer-torque screw on socket terminal, replacement Wago 221 lever-actuated for solid conductor, crimp ferrule for stranded into screw). VERIFY the ring continuity is restored (R1+R2 = ⅛ of the loop, end-to-end L1-L2 reads the loop resistance, no longer open-circuit).",
      "Replace the cable.",
      "Just leave it.",
    ],
    correctIndex: 1,
    explanation:
      "Broken ring is one of the canonical L3 corrections. Most breaks are at accessory terminations (loose screw, fatigued conductor at a much-rewired socket) and the half-split diagnostic narrows the location to one or two likely accessories. The correction is local re-termination, not cable replacement.",
  },
  {
    id: "mod4-s6-sub2-light-driver",
    question:
      "A kitchen LED downlight has stopped working. The other downlights on the same circuit work. You've isolated, removed the failed downlight, tested at the connector — 230 V present at the connector when energised. What's the next move?",
    options: [
      "Replace the cable.",
      "The driver in the failed downlight has likely failed — that's the most common LED fitting failure mode. Two correction options. (1) REPLACE the whole downlight — usually faster and the most reliable long-term fix. Cost £15&ndash;30 per unit; matched to the existing run for colour temperature (2700 K, 3000 K, 4000 K) and beam angle. (2) REPLACE just the driver if the fitting is integral-driver and the driver is replaceable as a separate part (some Aurora, Collingwood, Ansell models allow this). On most modern integrated LED downlights the driver is sealed inside and you replace the whole fitting. Verify the new fitting works under load (lights up + dims if dimmable) before closing the ceiling. The customer gets a like-for-like replacement and the rest of the run is unaffected.",
      "Add a transformer.",
      "Bypass the driver.",
    ],
    correctIndex: 1,
    explanation:
      "LED downlight failure is overwhelmingly driver failure (electrolytic capacitors degrade under heat). The L3 correction is replacement, matching the rest of the run for visual consistency. Bypassing or improvising driver substitutes is unsafe and breaches BS 7671 134.1.1 (manufacturer's instructions).",
  },
  {
    id: "mod4-s6-sub2-shower-trip",
    question:
      "A 9.5 kW electric shower is tripping its 40 A RCBO under load. Diagnosis confirms the RCBO is healthy and the cable is sound. What's the most common cause and the L3 correction?",
    options: [
      "Replace the RCBO.",
      "Most common cause — degraded shower element with insulation breakdown under heat. The element is a coiled resistive heater inside a sealed metal casing immersed in the water flow. Over time, mineral deposits, thermal cycling and water exposure degrade the insulation between the live coil and the earthed casing — when cold the IR is acceptable but when the element is at running temperature (hot water demand) the IR drops and earth leakage rises above 30 mA, tripping the RCBO. Diagnostic confirmation: IR test the element COLD at 500 V (probably acceptable at over 1 M&Omega;) and HOT after a few minutes of run-time (drops to under 1 M&Omega; — that's the failure). L3 CORRECTION: replace the heater element (Mira, Triton, Bristan branded as appropriate) following manufacturer instructions; verify post-replacement IR is over 1 M&Omega; cold AND hot.",
      "Bigger RCBO.",
      "Bypass the RCD.",
    ],
    correctIndex: 1,
    explanation:
      "Shower element insulation breakdown under heat is one of the most common 'I've had this for years and it's only just started tripping' fault patterns. The L3 diagnostic technique (cold-vs-hot IR comparison) finds it; the correction is element replacement matched to the shower model. Increasing the RCBO rating or bypassing the RCD is dangerous and a serious BS 7671 breach.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "What's the half-split method for finding a broken-ring fault on a 32 A ring final and why is it efficient?",
    options: [
      "Random guess.",
      "Half-split = at each step you eliminate half the remaining circuit. Step 1: open the ring at a socket roughly half-way around the ring; test continuity from the DB to that point on each leg; if both legs read continuity, the break is between this socket and the OTHER end of the ring; if one leg reads OL, the break is between this socket and the DB on that leg. Step 2: pick the half that contains the break, repeat at its mid-point. With a 12-socket ring you locate the break in 4 measurements (log&#8322;12 &asymp; 3.6, rounded up). Random walking would take 6 measurements on average. The technique is from logarithmic search algorithms — formalised diagnostic discipline beats random.",
      "End to end only.",
      "Visual only.",
    ],
    correctAnswer: 1,
    explanation:
      "Half-split (binary search) is one of the most powerful techniques in fault diagnosis. The L3 apprentice should know how to apply it on broken rings, broken radials, faulty long control circuits — anywhere a circuit has multiple potential break-points and end-to-end testing has confirmed a break exists.",
  },
  {
    id: 2,
    question:
      "A two-way lighting circuit (landing light controlled from upstairs and downstairs switches) has a fault — the upstairs switch operates the light correctly, the downstairs switch does nothing. What's the diagnostic and correction?",
    options: [
      "Replace both switches.",
      "Two-way wiring uses two STRAPPER cables between the switches plus a COMMON to the lamp. If one strapper is broken or wrongly terminated, one switch becomes inoperative. Diagnostic: isolate, prove dead, remove both switch fronts. Use the MFT continuity tester on the strapper conductors between the two boxes — both should read low resistance (near zero ohms for a typical 1.0 mm&sup2; lighting cable run); if one is open, that's the fault. Inspect the terminations at both ends — most common cause is a loose terminal at one of the switches. CORRECTION: re-terminate; verify both switches now operate the light from any combination of positions. Re-energise; functional test (switch on at top, off at bottom; switch off at top, on at bottom).",
      "Smash it.",
      "New cable.",
    ],
    correctAnswer: 1,
    explanation:
      "Two-way switching faults are common — most are loose terminations at one of the switches. The L3 diagnostic uses the strapper continuity test plus visual inspection of terminations. The functional test at the end verifies all four switch combinations work as expected.",
  },
  {
    id: 3,
    question:
      "A 7.5 kW immersion heater has been replaced and the customer reports the new element is tripping the RCBO within minutes of switching on. What are the diagnostic possibilities?",
    options: [
      "Faulty new element.",
      "Three possibilities to check in order. (1) ELEMENT INSTALLED DRY — if the cylinder wasn't refilled before energising, the element overheats instantly, the element scorches, IR drops, RCBO trips. Very common installer error. Confirmed by inspecting the element (visible scorch marks). Correction: replace AGAIN with a new element, refill the cylinder before re-energising. (2) WIRING MISMATCH — the new element may have a different terminal arrangement or rating than the original; loose / wrong polarity termination heats and trips. Confirmed by IR cold and visual on terminations. Correction: re-terminate to manufacturer instructions. (3) UPSTREAM FAULT — the cable from CU to immersion has insulation damage that the new element load has now exposed (was marginal before, now over the trip threshold). Confirmed by IR-testing the cable run with the element disconnected. Correction depends on cable damage location — re-route, repair joint, or replace the affected section.",
      "Customer's fault.",
      "Walk away.",
    ],
    correctAnswer: 1,
    explanation:
      "A newly-installed element that trips immediately almost always points back to installation error (dry-fire, mis-termination) rather than a manufacturing defect. The L3 diagnostic walks through the most likely causes in order. Dry-firing the element is the canonical installer mistake on immersion / shower heater work.",
  },
  {
    id: 4,
    question:
      "A workshop extractor fan motor with a 16 µF run capacitor has stopped running. The motor hums but doesn't start. What's the diagnostic and correction?",
    options: [
      "Replace the motor.",
      "Classic capacitor failure. The run capacitor on a single-phase induction motor provides the phase shift between the run winding and the start winding that creates the rotating field needed to start the motor. If the capacitor degrades (electrolytic dries out, paper-and-foil constructions go open) the motor energises but can't start — it draws stalled-rotor current, hums, and trips on thermal overload after 10&ndash;30 seconds. Diagnostic: ISOLATE; PROVE DEAD; DISCHARGE the cap through a 5&ndash;10 k&Omega; resistor (live-storage hazard); MEASURE the cap with the MFT capacitance function (should read within ±10% of marked value, e.g. 16 µF reads 14.4&ndash;17.6 µF; failed caps read near zero or open). CORRECTION: replace the cap with same μF value, same voltage rating (typically 250 V AC), same physical size to fit the bracket. Verify the motor starts immediately on energise.",
      "Bigger cap.",
      "Skip it.",
    ],
    correctAnswer: 1,
    explanation:
      "Run capacitor failure is one of the most common single-phase motor faults and a textbook L3 correction. The L3 diagnostic uses the MFT capacitance function (or a dedicated capacitance meter) to confirm the capacitor value is out of spec; the correction is like-for-like replacement.",
  },
  {
    id: 5,
    question:
      "A high-resistance joint (HRJ) on a 32 A ring final has been diagnosed at a back-of-socket termination — the cable conductor has darkened, the screw is loose, the surrounding plastic is heat-marked but not melted. What's the correction technique?",
    options: [
      "Just tighten.",
      "Re-make the termination properly, don't just re-tighten. The darkened conductor at the joint has surface oxidation and possibly partially-annealed copper from the heat — both increase contact resistance. The correct technique: (1) Cut back the conductor by 10&ndash;15 mm to remove the heat-affected length; (2) Strip fresh insulation; (3) Inspect the back-box and the socket terminal for melt damage — if the plastic is melted or charred, replace the back-box and/or the socket; (4) Re-terminate to manufacturer torque (1.2 Nm typical for MK Logic Plus 2.5 mm&sup2;); (5) Visual check that the conductor sits cleanly under the screw with no strands escaping; (6) IR test 500 V; (7) R1+R2 across the affected leg of the ring; (8) Zs at the affected socket. The temptation to 'just tighten' leaves heat-affected copper in the joint; the proper re-make replaces the affected length.",
      "Spray cleaner.",
      "Add another screw.",
    ],
    correctAnswer: 1,
    explanation:
      "HRJ correction is a precision technique. The heat-affected conductor and the heat-affected accessory both need replacing back to fresh material; just tightening the existing joint leaves the failure mechanism in place and the same fault recurs in months. Manufacturer torque on the new termination is essential.",
  },
  {
    id: 6,
    question:
      "A circuit is RCD-protected and the RCD is tripping intermittently — sometimes when an appliance starts, sometimes overnight when nothing is in use. What's the L3 correction strategy?",
    options: [
      "Replace the RCD.",
      "Multi-step strategy. (1) RULE OUT FAULTY RCD — use the MFT RCD trip-time test at I&Delta;n (30 mA) and 5&times;I&Delta;n (150 mA); a healthy 30 mA RCD trips within 300 ms at I&Delta;n and 40 ms at 5&times;I&Delta;n. If the RCD itself is out of spec, replace. (2) IDENTIFY ACCUMULATED LEAKAGE — if the RCD covers multiple final circuits, the standing earth leakage of all the connected equipment may be approaching the trip threshold. Disconnect circuits one at a time, measure the standing leakage with a clamp meter (Fluke 376 FC or similar, with the L+N inside the jaws) — total leakage should be well under 9 mA (30% of I&Delta;n is the typical design rule). (3) FIND THE LEAKY APPLIANCE — kitchen appliances (washing machine, dishwasher, kettle with damaged element) are common contributors. Disconnect each in turn, watch for the trips to stop. (4) CORRECT — repair / replace the leaky appliance OR reconfigure the protection (split the circuits across two RCDs to reduce total leakage per RCD).",
      "Bigger RCD.",
      "Remove it.",
    ],
    correctAnswer: 1,
    explanation:
      "Intermittent RCD trips are one of the most challenging diagnostic patterns. The L3 strategy works through the RCD itself, then standing leakage, then transient leakage, in order. Replacing the RCD without finding the cause just delays the next trip.",
  },
  {
    id: 7,
    question:
      "An EICR has flagged a 'no main equipotential bonding to gas service' as a C2 — the cable is missing entirely. What's the L3 correction technique?",
    options: [
      "Skip it.",
      "Fit a 10 mm&sup2; (typical for TT or where main earth is not 16 mm&sup2;) or 16 mm&sup2; (for TN-S / TN-C-S where main earth is 16 mm&sup2;) green/yellow protective bonding conductor between the MET (Main Earthing Terminal) at the consumer unit and the gas service pipe within 600 mm of the gas meter on the consumer's side, after the meter and before any branch (BS 7671 411.3.1.2). Use a BS 951 earthing clamp on the gas pipe with the appropriate label ('Safety Electrical Connection — Do Not Remove'). Verify continuity with the MFT — measured resistance from the MET to the bonded clamp should be under 0.05 &Omega; for a sound bonding cable. CERTIFICATE: Minor Works for the bonding work + Schedule of Remedial Works closing the C2. Inform the gas installer (Gas Safe registered) if the gas supplier needs to be aware of the change.",
      "Use a paperclip.",
      "Just label it.",
    ],
    correctAnswer: 1,
    explanation:
      "Main equipotential bonding correction is one of the most common EICR remedials. The L3 technique uses the right cable size (10 or 16 mm&sup2; G/Y), the BS 951 clamp, the correct location on the service (within 600 mm of the meter), and the verification (continuity from MET to clamp). The label is mandatory under BS 7671 514.13.1.",
  },
  {
    id: 8,
    question:
      "What's the verification routine after ANY rectification, regardless of which circuit?",
    options: [
      "Just energise.",
      "BS 7671 Part 6 643 verification — apply on every rectified circuit, every time. (1) CONTINUITY of CPC and ring conductors. (2) INSULATION RESISTANCE at 500 V (or 250 V if electronic loads can't be isolated). (3) POLARITY check (built-in to the other tests on most MFTs). (4) R1+R2 (if affecting a ring or radial). (5) Zs at the furthest accessible point on the affected circuit. (6) RCD TRIP-TIME at I&Delta;n where RCD-protected (300 ms typical, 40 ms at 5&times;I&Delta;n). (7) FUNCTIONAL test (load the circuit with a known appliance and verify it operates). (8) RECORD on the Minor Works Certificate test panel. The full Part 6 routine takes 20&ndash;30 minutes on a single circuit; non-negotiable.",
      "Just photograph.",
      "Customer says.",
    ],
    correctAnswer: 1,
    explanation:
      "BS 7671 Part 6 643 is the verification framework. Every rectified circuit gets the full sequence — continuity, IR, polarity, R1+R2, Zs, RCD trip-time, functional test, recorded on the cert. Skipping the testing turns a rectification into an assertion; doing the testing turns it into evidence.",
  },
];

const faqs = [
  {
    question: "Why can't I just use a Wago in a junction box for every break I find?",
    answer:
      "You can use Wago 221 / 222 / 223 connectors at any joint that BS 7671 526.1 permits — but the box has to be MAINTENANCE-FREE if it's not accessible (BS 7671 526.3 for buried or otherwise inaccessible joints). Wago push-wire connectors with the lever (221, 222) installed in an enclosed junction box ARE permitted as maintenance-free under BS 7671 526.3 (the IET has confirmed this in published guidance). The technique is fine; the discipline is the box selection (BS 5733 / BS EN 60670-22 fire-rated for above-ceiling) and the location (don't bury in plaster unless the box is approved for that). The L3 apprentice's mistake is to use a Wago on bare wire under a floorboard with no enclosure — that's a 526.3 breach regardless of the connector quality.",
  },
  {
    question: "How do I know the manufacturer's torque without the data sheet?",
    answer:
      "Approximate guidance for common sizes: 2.5 mm&sup2; into a typical UK socket terminal (MK, Crabtree, BG, Hager) — 1.0&ndash;1.5 Nm. 1.0 mm&sup2; into a typical lighting accessory — 0.5&ndash;0.8 Nm. 6 mm&sup2; into a 32 A immersion isolator — 2.0&ndash;2.5 Nm. 16 mm&sup2; into a CU main switch — 2.5&ndash;4.0 Nm. DIN-rail RCBO / MCB terminals (Hager, Schneider, ABB) — 2.0&ndash;3.0 Nm typical. These are starting points; for the actual job, look up the exact value on the manufacturer page (5 seconds on the phone). A torque screwdriver (Wera 7440, Wiha TorqueVario, Felo 100) is essential L3 kit.",
  },
  {
    question: "When is replacing a whole accessory better than re-terminating?",
    answer:
      "Three triggers. (1) HEAT DAMAGE — if the back-box plastic is melted, the front plate is heat-marked, or the contacts are pitted from arcing, replace the whole accessory. Plastic that's been heated past its softening point (typically 80&ndash;100 &deg;C for ABS, higher for thermoset) won't recover its mechanical properties. (2) AGE / WEAR — accessories more than 25&ndash;30 years old are typically due for replacement when accessed for any work; the cost is small and the future reliability gain is significant. (3) UPGRADE OPPORTUNITY — moving from older non-RCD-protected to current spec, switching from 13 A to USB-A/USB-C combo socket, fitting screwless flatplate. Customer's choice but worth offering. Re-termination is fine when the accessory is sound and only the connection has degraded; replacement is right when the accessory itself shows damage or wear.",
  },
  {
    question: "What's the difference between a screw terminal, a Wago, and a crimp ferrule?",
    answer:
      "Three connection methods, each suited to different conductor / environment combinations. SCREW TERMINAL — direct conductor under a screw, manufacturer torque applied. Best for solid conductor 1.0&ndash;6.0 mm&sup2; into accessories where space is limited. WAGO 221 / 222 LEVER-ACTUATED — push-wire connector with a lever that releases for re-termination. Best for solid OR fine-stranded 0.2&ndash;4.0 mm&sup2; in junction boxes or above-ceiling joints. Maintenance-free when installed in an enclosure. CRIMP FERRULE — bootlace / pin terminal crimped onto a stranded conductor before insertion into a screw terminal. Best for stranded conductor (typically tri-rated control cable) into a screw terminal designed for solid (e.g. RCBO terminals, isolator terminals). Each method has a place; using the wrong method for the conductor type causes high-resistance joints.",
  },
  {
    question: "How long does a typical fault correction take from arrival to leaving?",
    answer:
      "Domestic single-circuit rectification — typically 1.5&ndash;2.5 hours from arrival. Breakdown: 15 minutes greet + brief + access; 30 minutes diagnostic confirmation (re-run yesterday's diagnosis to verify nothing has changed); 30&ndash;60 minutes physical correction (depending on access difficulty); 20&ndash;30 minutes BS 7671 Part 6 verification testing; 20 minutes documentation (MWC + Schedule + customer hand-back). Small-commercial single-circuit — add 30&ndash;60 minutes for the larger DB, the more thorough customer brief, the additional safety isolation procedures. Three-phase or specialised systems (motor controls, fire alarm, EV) can extend significantly. The L3 apprentice's plan accounts for all phases, not just the physical correction.",
  },
  {
    question: "What if I can't find the fault in the planned visit time?",
    answer:
      "STOP, escalate, don't push past your time budget. Three responses. (1) RE-BRIEF the customer — explain progress, what's been ruled out, what's outstanding. (2) ESCALATE to the supervisor — phone call describing what's been done; supervisor decides whether to send additional resource, leave the work for another visit, or change strategy. (3) MAKE-SAFE — if you've opened the installation and need to leave it, ensure the affected circuit is safely isolated, the DB is closed and locked, the customer's other circuits are working, and there's no exposed live or hazard. Coming back is normal; pushing past your time budget into late-evening tired-mistake territory is the cause of incidents. The L3 apprentice's competence is to know when to stop, not to grind on hoping for a breakthrough.",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module4-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 4 · Section 6 · Subsection 2"
            title="Apply correction techniques to common faults"
            description="The four most common fault patterns the L3 apprentice meets — broken ring final, failed LED driver, shower / immersion element insulation breakdown, capacitor / motor failure — paired with the diagnostic confirmation, the correction technique and the BS 7671 Part 6 verification."
            tone="emerald"
          />

          <TLDR
            points={[
              "Broken ring final: half-split diagnostic narrows the location quickly; correction is local re-termination, not cable replacement.",
              "Failed LED downlight: replace the whole fitting (driver failure is the dominant mode); like-for-like for the rest of the run.",
              "Shower / immersion intermittent trip: cold-vs-hot IR test on the element finds insulation breakdown; correction is element replacement.",
              "Single-phase motor won't start: capacitor failure most likely; MFT capacitance test confirms; like-for-like cap replacement.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Apply the half-split (binary search) diagnostic technique to broken-ring and broken-radial faults.",
              "Diagnose and correct LED downlight failures, distinguishing driver failure from cable / connection failure.",
              "Diagnose and correct shower / immersion element insulation breakdown using cold-vs-hot IR comparison.",
              "Diagnose and correct single-phase motor capacitor failure using the MFT capacitance function.",
              "Re-make a high-resistance joint (HRJ) properly — cut back, fresh strip, manufacturer torque, replace damaged accessories.",
              "Apply the BS 7671 Part 6 643 verification routine on every rectified circuit, every time.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Broken ring + the half-split technique</ContentEyebrow>

          <ConceptBlock
            title="Half-split (binary search) is the L3 efficient technique for any multi-point circuit fault"
            plainEnglish="A 12-socket ring with a break somewhere takes log&#8322;12 (= 4) measurements to locate the break by half-split, vs an average of 6 measurements walking sequentially. Twelve becomes four; thirty becomes five. The technique scales — the bigger the circuit, the more efficient half-split becomes."
            onSite="The technique is — open the ring at a roughly mid-point socket; test continuity from the DB to that socket on each leg of the ring; the leg that reads OL contains the break; repeat at the mid-point of that half. Practical step: have the customer's permission to open accessories, work cleanly (one box at a time, restore before moving on), document each measurement on a sketch as you go."
          >
            <p>The half-split walk-through on a 12-socket kitchen ring:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Step 1</strong> — open socket #6 (mid-point). Test L1 leg from DB to socket 6 — reads 0.45 &Omega; (good). Test L2 leg from DB to socket 6 — reads OL (open). Break is on the L2 leg between socket 6 and the DB.</li>
              <li><strong>Step 2</strong> — open socket #3 (mid-point of the suspect leg). Test L2 leg from DB to socket 3 — reads 0.22 &Omega; (good). Break is between socket 3 and socket 6.</li>
              <li><strong>Step 3</strong> — open socket #4 or #5; test progressively. Break is between socket 4 and socket 5.</li>
              <li><strong>Step 4</strong> — physically inspect the connections at sockets 4 and 5. Loose terminal at socket 5 found and re-made.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 526.1"
            clause={
              <>
                "Every electrical connection between conductors and between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection."
              </>
            }
            meaning={
              <>
                Reg 526.1 governs every connection on the installation. For broken-ring rectification, the new connection must be made with the right method (manufacturer torque on screw terminals, lever-actuated Wago for fine stranded into a junction box, crimp ferrule for stranded into a screw), with the right material (BS 951 clamps for bonding, manufacturer-recommended ferrules for stranded), and to the right standard (BS EN 60998 for connectors, BS EN 60670 for boxes). 'Just twist together and tape' is a 526.1 breach.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 526.1 — IET Wiring Regulations 18th Edition Amendment 4."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <VideoCard
            url={videos.ringFinalTest.url}
            title={videos.ringFinalTest.title}
            channel={videos.ringFinalTest.channel}
            duration={videos.ringFinalTest.duration}
            topic={videos.ringFinalTest.topic}
          />

          <SectionRule />

          <ContentEyebrow>LED downlight + driver failure</ContentEyebrow>

          <ConceptBlock
            title="Driver failure is the dominant mode on integrated LED fittings"
            onSite="Modern integrated LED downlights (Aurora, Collingwood, Ansell, Robus) have an electrolytic capacitor in the driver that ages under heat — the kitchen ceiling void temperature can hit 50&ndash;60 &deg;C in summer. The capacitor's electrolyte dries out over 3&ndash;7 years and the driver fails. The LED chip itself is normally fine for 20+ years; the driver is the wear part. The L3 correction is whole-fitting replacement (most modern fittings have sealed integral drivers) matched for colour temperature and beam angle to the rest of the run."
          >
            <p>The L3 LED downlight correction routine:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Confirm 230 V at the connector</strong> — rules out cable / circuit fault; confirms the failure is in the fitting itself.</li>
              <li><strong>Match the replacement</strong> — colour temperature (2700 K warm, 3000 K soft white, 4000 K cool, 5000 K daylight); beam angle (40&deg; spot, 60&deg; flood, 90&deg; wide); cut-out size (typically 70 mm or 75 mm); fire-rating (60 / 90 minute IC-rated for ceilings above habitable rooms).</li>
              <li><strong>Fit + connect</strong> — typically a GU10-style push-fit connector or a screw-terminal block; manufacturer instructions on terminal torque if applicable.</li>
              <li><strong>Verify under load</strong> — energise; lights up; if dimmable, dim across the range to verify dimmer compatibility.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Shower / immersion + element insulation breakdown</ContentEyebrow>

          <ConceptBlock
            title="Element IR breakdown under heat is the canonical 'intermittent trip' on heating circuits"
            plainEnglish="A shower or immersion element is a coiled resistive heater inside a sealed metal sheath immersed in water. Over years, mineral deposits (limescale especially in hard-water areas), thermal cycling and water exposure weaken the insulation between the live coil and the earthed sheath. When cold the IR is acceptable; when hot the IR drops and earth leakage rises above the 30 mA RCD trip threshold."
            onSite="Diagnostic technique: ISOLATE; PROVE DEAD at the appliance terminals; DISCONNECT the element from the supply at the appliance terminals; TEST IR at 500 V cold (typically over 1 M&Omega; on a healthy element); WAIT until the customer confirms the trip pattern (they fired up the shower for 5 minutes, it tripped at 4 minutes); RE-TEST IR with the element still hot from the recent run — if it's dropped to under 1 M&Omega; (often under 100 k&Omega; on a failing element), that's the diagnostic confirmation. CORRECTION: replace the element (same model, same rating, same termination orientation) following manufacturer instructions."
          >
            <p>The L3 element-replacement routine:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Isolate at the dedicated CU breaker</strong> + lock-off + prove dead at the immersion / shower terminals.</li>
              <li><strong>Drain the cylinder</strong> (immersion) or shut off the water supply and drain the unit (shower) before removing the element; new element fits to a wet seat is fine, new element fitted dry-fires within seconds.</li>
              <li><strong>Remove the failed element</strong> with the correct spanner (typically a box spanner for immersion elements, a hex key for shower elements); save the gasket / O-ring or replace if perished.</li>
              <li><strong>Fit the new element</strong> — match the rating (1 kW, 2 kW, 3 kW, 7.5 kW, 9.5 kW) and the termination configuration; torque to manufacturer spec.</li>
              <li><strong>Refill the cylinder / restore water supply</strong> BEFORE energising; bleed any air locks.</li>
              <li><strong>Verify post-replacement IR</strong> — over 1 M&Omega; cold AND after a 10-minute run hot.</li>
              <li><strong>Functional test</strong> — full hot-water draw; thermostat cuts in / cuts out at the set temperature.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>RCD type matching during the repair</ContentEyebrow>

          <ConceptBlock
            title="Like-for-like only works when the load profile hasn&apos;t changed"
            plainEnglish="Replacing an RCD or RCBO is the moment to check whether the device type still suits the load. A circuit installed in 2010 with a Type AC RCBO might today be feeding LED drivers, an EV charge point or a heat-pump &mdash; loads with DC content that Type AC can&apos;t see."
            onSite="On a fault-correction visit it&apos;s common to find a Type AC RCBO protecting modern electronic loads. The repair is the chance to upgrade to Type A (DC component up to 6&nbsp;mA), Type F (single-phase frequency converters) or Type B (smooth DC residual currents). Don&apos;t blindly replace the same code that came out."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Type AC</strong> &mdash; legacy resistive / inductive loads. Increasingly rare on new installations.</li>
              <li><strong>Type A</strong> &mdash; default for modern domestic. Handles pulsating DC residual.</li>
              <li><strong>Type F</strong> &mdash; single-phase variable-speed drives, frequency converters.</li>
              <li><strong>Type B</strong> &mdash; smooth DC residual: EV chargers without internal Type B detection, three-phase VSDs, large PV inverters.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Termination quality and torque</ContentEyebrow>

          <ConceptBlock
            title="The single most overlooked detail in fault repair"
            plainEnglish="Most repeat faults trace to a poor termination. Strip length wrong, conductor not fully under the pinch, screw torqued by feel rather than to spec, ferrule missing on a flexible. The L3 step-up is to torque every termination to the manufacturer&apos;s value with a calibrated screwdriver."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Wera Kraftform 7440 / 7441 torque screwdriver</strong> &mdash; adjustable, audible click at set torque, calibration cert.</li>
              <li><strong>Typical torque values</strong> &mdash; MCB busbar 2.0&ndash;2.5&nbsp;Nm, 13&nbsp;A socket terminal 0.6&ndash;0.8&nbsp;Nm, RCBO terminal 1.2&ndash;1.5&nbsp;Nm. Always check the device data sheet.</li>
              <li><strong>Strip length</strong> &mdash; manufacturer&apos;s indicator inside the terminal block. Long = exposed conductor outside the pinch; short = insulation in the pinch.</li>
              <li><strong>Stranded conductor</strong> &mdash; bootlace ferrule (Knipex 97 53 14, Weidmuller PZ6 Roto crimp tool) &mdash; never twisted bare strands into a screw terminal.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Ring final continuity faults — three-test method and the high-resistance loop"
            plainEnglish="Ring final circuit faults often present as a tripping RCBO under heavy load (kettle plus toaster) or as warm sockets in one corner of the room. The diagnostic is the three-test continuity method — end-to-end resistance on each conductor (line, neutral, CPC) at the consumer unit, then cross-connection to verify the ring is complete and balanced. A broken leg shows as a missing reading; a high-resistance termination shows as a high reading on the affected leg."
            onSite="Disconnect the ring at the CU. Test L-L end-to-end (should read about twice the per-leg resistance); test N-N end-to-end (similar reading); test CPC-CPC end-to-end. If any reading is OL, the leg is broken — find the break by half-split. If a reading is significantly higher than the others, a high-resistance termination is somewhere on that leg — usually a back-box that has been over-tightened, a screw terminal degraded by heat, or a junction box with a loose conductor. Walk the ring with a low-resistance ohmmeter and the wander lead to localise."
          >
            <p>
              Ring continuity test pattern:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Test 1 — end-to-end on each conductor</strong> — line,
                neutral, CPC measured at the CU with the ring opened. Each
                should read consistent with the cable run length.
              </li>
              <li>
                <strong>Test 2 — cross-connection</strong> — line of one leg
                connected to neutral of the other; measure at every socket.
                Reading should be roughly half the end-to-end value (because
                each socket sees half of each leg in parallel).
              </li>
              <li>
                <strong>Test 3 — repeat for CPC</strong> — line of one leg
                connected to CPC of the other; measure at every socket;
                similar half-value pattern.
              </li>
              <li>
                <strong>Diagnostic patterns</strong> — OL on one test = broken
                leg; high reading at one socket = high-resistance termination
                local to that socket; consistent high reading across the ring
                = degraded conductor over the whole loop.
              </li>
              <li>
                <strong>Common HRJ locations</strong> — kitchen sockets behind
                white goods (heat exposure), socket spurs (added later, often
                under-torqued), back-of-cabinet sockets (where conductor was
                bent at an angle into the terminal).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Diagnosing nuisance RCD trips — the leakage budget approach"
            plainEnglish="A 30 mA RCD trips when the cumulative earth leakage on the protected circuit reaches roughly 22-30 mA (devices trip somewhere in their stated band). On a modern installation with multiple connected appliances, normal residual leakage might be 5-10 mA — leaving 12-20 mA of headroom. A nuisance trip means something has eaten the headroom: a developing fault adding 15 mA pushes the total over the trip threshold. The diagnostic is to budget the leakage per appliance and find the contributor."
            onSite="Use a clamp meter capable of mA AC measurement (Megger DCM340, Fluke 376) around the line plus neutral conductors of the affected circuit. Reading shows net residual current — under 10 mA is normal; 15-25 mA is the trip-edge zone. Disconnect appliances one at a time and watch the reading drop. The appliance whose disconnection drops the residual significantly is the culprit. Common causes: ageing dishwasher heater elements, water-damaged extractor fan motors, IT power supplies with degraded EMC filters, faulty fluorescent ballasts."
          >
            <p>
              Typical residual current contributions per appliance:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Modern dishwasher</strong> — 1-3 mA when on heat
                cycle; significantly higher with degraded heater element.
              </li>
              <li>
                <strong>Washing machine</strong> — similar to dishwasher;
                heat-cycle leakage rises with element age.
              </li>
              <li>
                <strong>Computer / TV PSU</strong> — 0.5-2 mA per unit;
                accumulates on circuits with multiple connected items.
              </li>
              <li>
                <strong>Inverter-driven white goods</strong> — variable
                speed compressors and motor drives can leak more under start
                and stop transients.
              </li>
              <li>
                <strong>Older fluorescent ballasts</strong> — 1-3 mA;
                replace with LED to remove the contribution.
              </li>
              <li>
                <strong>Water in an outdoor accessory</strong> — sudden
                jump from baseline; investigate any newly-added outdoor
                socket or junction box.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Intermittent faults — capturing the symptom before it disappears"
            plainEnglish="The hardest faults to diagnose are the intermittent ones — present when the customer rings, gone when the apprentice arrives. The discipline is to capture the symptom before it disappears: ask the customer to keep a log (date, time, conditions, which device tripped), leave a data-logger on the affected circuit between visits, or set up a CT clamp with peak-hold capture. The pattern in the log is the diagnostic clue."
            onSite="Tools that capture intermittent symptoms: power-quality logger (Fluke 1738, Hioki PQ3198) for voltage / current / harmonic events; current clamp with peak-hold for inrush capture; thermal camera (Flir One Pro) for heat-affected terminations; smart event recorder (Megger PD-200) for partial-discharge fault tracing. The L3 apprentice often does not own these but the firm has them — book them out for the next site visit. The data the logger captures over 48 hours often reveals the fault pattern in 30 seconds of analysis."
          >
            <p>
              Intermittent-fault tooling and capture strategies:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Customer log</strong> — paper or app; date, time,
                conditions, which device or circuit; first cheap diagnostic.
              </li>
              <li>
                <strong>Power-quality logger</strong> — clipped on the affected
                circuit for 48-168 hours; captures voltage dips, surges, RCD
                trip events.
              </li>
              <li>
                <strong>Thermal camera</strong> — survey of the consumer unit
                under load; HRJs and heat-affected terminations show as bright
                hotspots.
              </li>
              <li>
                <strong>Clamp meter with min-max</strong> — left on the
                circuit overnight; captures peak inrush and any unusual
                load-side events.
              </li>
              <li>
                <strong>Repeat visit pattern</strong> — diagnose at the time
                the customer reports the issue; cold visits often miss the
                symptom.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 642.2"
            clause={
              <>
                "The inspection shall be made to verify that the installed electrical equipment is: (a) in compliance with the requirements of Section 511; (b) correctly selected and erected in accordance with BS 7671, taking into account manufacturers&apos; instructions; and (c) not visibly damaged or defective so as to impair safety."
              </>
            }
            meaning={
              <>
                The inspection step that follows the repair has to verify the new component is the right one (Section 511), correctly selected and erected per the manufacturer&apos;s instructions (torque, strip length, orientation), and not visibly damaged. That third bullet catches the close-of-job photograph &mdash; visible damage at hand-back is unacceptable.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 642.2, verbatim."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 411.5.3"
            clause={
              <>
                "Where an RCD is used for fault protection, the following conditions shall be fulfilled: (a) the disconnection time shall be that required by Regulation 411.3.2.2 or 411.3.2.4; and (b) Ra &times; I&Delta;n &le; 50&nbsp;V where Ra is the sum of the resistances of the earth electrode and the protective conductor connecting it to the exposed-conductive-parts (in ohms), I&Delta;n is the rated residual operating current of the RCD."
              </>
            }
            meaning={
              <>
                After replacing an RCD or RCBO during fault correction, both halves of 411.5.3 must hold: the disconnection time at I&Delta;n meets 411.3.2.2 / 411.3.2.4, AND Ra&nbsp;&times;&nbsp;I&Delta;n stays under 50&nbsp;V. On TN that&apos;s usually obvious; on TT it&apos;s the calculation that catches a marginal earth electrode.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 411.5.3, verbatim."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Re-tightening a heat-affected screw terminal instead of re-making the joint"
            whatHappens={
              <>
                Apprentice finds an HRJ at a kitchen socket &mdash; conductor darkened, screw loose,
                surrounding plastic warm. Re-tightens the screw, tests, leaves. Three months later
                the same socket is heat-marked again and the customer calls. The heat-affected copper
                still has surface oxidation and partially-annealed metallurgy; the contact resistance
                has not recovered just because the screw is now tight. The same failure mechanism is
                still in the joint and it heats again under load.
              </>
            }
            doInstead={
              <>
                Cut back the conductor by 10&ndash;15 mm; strip fresh insulation; inspect the
                back-box and accessory for melt damage (replace if affected); re-terminate the
                fresh copper to manufacturer torque. The joint is now made on fresh material with
                proper torque &mdash; that lasts 25&ndash;40 years.
              </>
            }
          />

          <CommonMistake
            title="Dry-firing an immersion element after replacement"
            whatHappens={
              <>
                Apprentice replaces a failed 3&nbsp;kW immersion element. Energises immediately to
                test &mdash; the cylinder hadn't been refilled. The element heats from 20 &deg;C to
                over 400 &deg;C in 10&ndash;20 seconds with no water to absorb the heat. The
                element scorches, the sheath warps, the IR drops, the RCBO trips. The new element
                is now ruined and needs replacing AGAIN. The mistake costs the firm a second
                element + a wasted hour.
              </>
            }
            doInstead={
              <>
                Refill the cylinder and bleed any air locks BEFORE energising. The cylinder fills
                in 5&ndash;10 minutes from the cold supply; the air bleed at the highest tap takes
                30 seconds. Verify water flow through the cylinder OUTLET (not just the inlet)
                before pressing the test button on the immersion thermostat.
              </>
            }
          />

          <Scenario
            title="Intermittent shower trip on a 9.5 kW Mira Sport"
            situation={
              <>
                Customer reports their Mira Sport 9.5&nbsp;kW shower (Wylex 40&nbsp;A RCBO,
                10&nbsp;mm&sup2; cable, 2.5&nbsp;m run) trips after about 4 minutes of use. The
                shower has been installed since 2017 and the trips started a fortnight ago. You
                have a 2-hour visit booked.
              </>
            }
            whatToDo={
              <>
                (1) GREET + BRIEF &mdash; explain the diagnostic plan; ask for permission to use
                hot water for the heating test. (2) ISOLATE at the Wylex DB; lock-off; prove dead
                at the shower isolator with the Martindale VI-13800. (3) Open the shower; remove
                the cover; identify the element terminal block. (4) IR TEST at 500&nbsp;V on the
                element terminals to earth, COLD &mdash; reading 4.5&nbsp;M&Omega; (acceptable; over
                1&nbsp;M&Omega; threshold). (5) Restore the cover; energise; ask the customer to
                run the shower at full hot for 5 minutes (the trip threshold). The shower trips at
                4:20. (6) ISOLATE again immediately; lock-off; prove dead; quickly remove the
                cover and re-test IR while the element is still hot &mdash; reading 0.06&nbsp;M&Omega;
                (FAILED &mdash; well below the 1&nbsp;M&Omega; threshold). DIAGNOSTIC CONFIRMED.
                (7) Source the replacement element (Mira Sport 9.5&nbsp;kW heater pack from CEF
                Manchester &mdash; 1 hour delivery, &pound;65). (8) Drain the shower unit; remove
                failed element; fit new element with new gasket; restore water; bleed air. (9)
                Energise; functional test &mdash; full hot run for 8 minutes, no trip. (10) Re-test
                IR cold AND after a 10-minute run; both over 2&nbsp;M&Omega;. (11) Full BS 7671
                Part 6 testing on the shower circuit &mdash; R1+R2 0.34&nbsp;&Omega;, Zs
                0.41&nbsp;&Omega;, RCD trip-time 18&nbsp;ms. All within limits. (12) Issue MWC;
                customer hand-back; warranty explained.
              </>
            }
            whyItMatters={
              <>
                The cold-vs-hot IR comparison is the L3 diagnostic technique that catches the
                intermittent shower trip. Without it, the apprentice replaces the RCBO (no
                difference; trips again) or replaces the cable (no difference; trips again). The
                element under heat is the failure point; the diagnostic technique finds it; the
                correction is element replacement. The full Part 6 verification confirms the
                rectified circuit is sound; the documentation closes the loop.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Half-split (binary search) finds broken-ring faults in log₂(n) measurements — efficient diagnostic discipline beats random walking.",
              "BS 7671 526.1 governs every connection — manufacturer torque, right method for the conductor, right enclosure for the location.",
              "LED downlight failures are overwhelmingly driver failures; replace the whole fitting, match colour temperature and beam angle.",
              "Shower / immersion intermittent trip = element insulation breakdown under heat; diagnose with cold-vs-hot IR comparison.",
              "NEVER dry-fire an immersion / shower element; refill / restore water supply BEFORE energising the new element.",
              "Single-phase motor capacitor failure: motor hums, doesn't start; MFT capacitance test confirms; like-for-like cap replacement.",
              "HRJ correction: cut back heat-affected copper; fresh strip; replace damaged accessory; manufacturer torque on the new joint.",
              "BS 7671 Part 6 643 verification on every rectified circuit, every time — continuity, IR, polarity, R1+R2, Zs, RCD trip-time, functional test.",
            ]}
          />

          <Quiz title="Apply correction techniques to common faults — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/level3-module4-section6-1")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">6.1 Preparation + information sources</div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/level3-module4-section6-3")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">6.3 Specialised systems — 3-phase, control, EV / PV</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
