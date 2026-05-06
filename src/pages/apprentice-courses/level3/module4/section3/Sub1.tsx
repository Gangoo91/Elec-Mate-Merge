/**
 * Module 4 · Section 3 · Subsection 1 — Types, causes and consequences of faults
 * Maps to C&G 2365-03 / Unit 303 / LO3 / AC 3.1
 *   AC 3.1 — "identify types, causes and consequences of electrical faults"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 3.4 — causes of high resistance,
 * transient voltages, insulation failure, excess current, short circuit, open
 * circuit faults.
 *
 * Frame: the seven canonical fault types — open circuit, short circuit (L–L,
 * L–N), earth fault (L–E, N–E), high-resistance joint, insulation failure,
 * transient voltage, excess current — what causes each, what each looks like
 * on the meter, what each does to the installation.
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
  'Types, causes and consequences of faults (3.1) | Level 3 Module 4.3.1 | Elec-Mate';
const DESCRIPTION =
  'The seven canonical electrical fault types — open circuit, short circuit, earth fault, high-resistance joint, insulation failure, transient voltage, excess current — what causes each, what each looks like on the meter, what each does to the installation.';

const checks = [
  {
    id: 'mod4-s3-sub1-open',
    question:
      "What's the meter signature of an OPEN CIRCUIT fault on a domestic radial?",
    options: [
      "Low resistance.",
      "Continuity reads OPEN (∞ Ω) on the affected conductor; IR reads infinity (no leakage path); EFLI reads OPEN (the loop is broken). The load doesn't operate (no current path). Customer symptom: 'the socket / light / appliance has stopped working'. Causes: broken conductor (cut, snapped at termination), failed terminal screw (loosened to no contact), failed component (broken switch, blown fuse, failed contactor). The classic L1 / L2 'why isn't this working?' fault — straightforward to diagnose, usually a localised termination or component issue.",
      "RCD trips.",
      "Smoke.",
    ],
    correctIndex: 1,
    explanation:
      "Open circuit is the simplest fault category — the current path is broken, the load doesn't work. R = ∞, V = 0 on the load side, EFLI = OPEN. Diagnosis is usually visual or with a continuity test from one end of the circuit to the other; the break is at the point continuity fails.",
  },
  {
    id: 'mod4-s3-sub1-short',
    question:
      "What's the meter signature of a SHORT CIRCUIT fault between L and N?",
    options: [
      "Open circuit.",
      "Continuity between L and N reads near zero (typically &lt;1 Ω, often a few hundred milliohms — the impedance of the supply cable + the bridging fault). The protective device trips immediately (an MCB on a domestic circuit will operate within 10 ms on a high-PSCC short). The user symptom: 'breaker tripped instantly when I plugged in / switched on'. Causes: insulation breakdown between L and N inside an appliance, a damaged cable where insulation has worn through and conductors touch, a cross-wired terminal at an accessory.",
      "Slow trip.",
      "No effect.",
    ],
    correctIndex: 1,
    explanation:
      "Short circuit causes the highest fault current the system will see — limited only by supply impedance + cable resistance. On a 6 kA PSCC supply with a few metres of cable, a phase-neutral short will draw 4–5 kA briefly. The MCB's magnetic trip operates in under 10 ms. The thermal damage to the cable / fault location can be significant; visual inspection often shows scorching or melted insulation at the fault point.",
  },
  {
    id: 'mod4-s3-sub1-hrj',
    question:
      "What distinguishes a HIGH-RESISTANCE JOINT (HRJ) from a clean termination, and why is it dangerous?",
    options: [
      "No difference.",
      "An HRJ has higher contact resistance than a clean termination — typically 0.05–5 Ω vs &lt;0.001 Ω for a properly-tightened terminal. Causes: loose terminal screw, oxidised aluminium-to-copper contact, undersized crimp, conductor strand damage, scorched contact from previous fault. Danger: under load, the joint dissipates I²R heat. A 0.5 Ω HRJ carrying 20 A dissipates 200 W — enough to char the surrounding plastic, melt the cable insulation, ignite combustible material in the enclosure. HRJ is the leading cause of electrical fires in buildings (HSE / fire investigation data). Hard to diagnose because the joint reads OK on a multimeter — only thermal imaging or voltage drop under load reveals it.",
      "Just a high reading.",
      "Not a real fault.",
    ],
    correctIndex: 1,
    explanation:
      "HRJ is the single most dangerous common fault because it doesn't trip a protective device — the current is below the breaker's rating, but the heat at the joint is enough to start a fire. The fault investigation data from the FIA (Fire Industry Association) consistently puts HRJ in the top 3 causes of dwelling fires of electrical origin. Sub 3.3 (likely fault locations) goes deep into where they appear; Sub 2.3 covered the thermal-imaging diagnosis.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "Define each of the seven canonical fault types.",
    options: [
      "All faults are the same.",
      "(1) OPEN CIRCUIT — current path broken, R = ∞. (2) SHORT CIRCUIT — direct connection between L–L, L–N, or live conductors that should be separate; very low resistance, very high current. (3) EARTH FAULT — current path between live conductor and earth (CPC, exposed metalwork, true ground); operates RCD if path is through CPC; may not operate RCD if return path is via parallel route. (4) HIGH-RESISTANCE JOINT (HRJ) — termination with elevated contact resistance; under load, dissipates I²R heat; fire risk. (5) INSULATION FAILURE — degraded insulation between conductors; high-resistance leakage path; precursor to short circuit or earth fault. (6) TRANSIENT VOLTAGE — brief over-voltage from lightning, switching, faults elsewhere; damages electronics. (7) EXCESS CURRENT — overload (sustained current above design) or fault (sudden high current); causes thermal damage to cables.",
      "Only short circuit.",
      "Only open circuit.",
    ],
    correctAnswer: 1,
    explanation:
      "The seven categories cover the canonical fault types. Real faults are sometimes combinations (e.g. an HRJ that progresses to a short circuit after the cable insulation chars). Knowing the categories gives you a diagnostic vocabulary; recognising the meter signature lets you classify quickly.",
  },
  {
    id: 2,
    question: "What protective device responds to which fault type?",
    options: [
      "RCD covers everything.",
      "MCB / RCBO thermal element — overload (sustained excess current). MCB / RCBO magnetic element — short circuit and high-current fault. RCD / RCBO residual element — earth fault through CPC (residual current). AFDD — series and parallel arc faults (degraded contacts, arc tracking). SPD — transient over-voltage. Fuse (BS 88 HRC) — short circuit and overload (slower than MCB but higher breaking capacity, used at supply origins). Each device is designed for a specific fault type; using the wrong device leaves the corresponding fault uncovered.",
      "Just one device.",
      "Just MCB.",
    ],
    correctAnswer: 1,
    explanation:
      "Modern installations use a combination — MCB / RCBO for overload and short circuit, RCD for earth fault, AFDD for arc fault, SPD for transients. BS 7671 A4:2026 mandates AFDD on certain circuit types (high-occupancy dwellings) precisely because RCBO doesn't catch the arc fault category. Each device targets its fault type; together they form layered protection.",
  },
  {
    id: 3,
    question: "What causes most insulation failures in domestic installations?",
    options: [
      "Random.",
      "Common causes (in approximate frequency order): (1) physical damage — nail / screw through cable during DIY, mouse damage in lofts, abrasion against sharp metalwork. (2) thermal damage — cable run alongside a heating pipe, conductors derated by enclosed installation method, prolonged overload heating. (3) moisture / contamination — water ingress into ceiling void, condensation in unheated buildings, salt-air corrosion in coastal properties. (4) UV degradation — exterior cables exposed to sunlight without UV protection. (5) ageing — polymer insulation breakdown after 30+ years (rubber-insulated cables from pre-1970s installations). (6) chemical attack — cables in contact with PVC pipes, certain adhesives, hydrocarbon spills.",
      "Just water.",
      "Just rodents.",
    ],
    correctAnswer: 1,
    explanation:
      "Insulation failure has many causes but the headline is — protect the cable from its environment. Physical damage is the most common single cause. The IET wiring matters guidance and BS 7671 Section 522 (external influences) cover the cable selection that prevents premature insulation failure.",
  },
  {
    id: 4,
    question: "What's a transient over-voltage, where do they come from, and what damages them?",
    options: [
      "Permanent over-voltage.",
      "A transient is a brief (microseconds to milliseconds) over-voltage spike — typical magnitudes 1 kV to 6 kV (lightning-induced can reach 20 kV+). Sources: (1) lightning strikes (direct or induced from nearby strikes). (2) switching events — large inductive loads (motors, transformers) creating back-EMF spikes when switched off. (3) fault clearing — supply network faults causing brief over-voltages on the consumer's side. (4) capacitor switching on power-factor correction equipment. Damage: solid-state devices (LED drivers, electronic boards, computers) have peak-voltage tolerance below the transient magnitude. Single transient can fail an entire LED ceiling rose array. Protection: SPDs (Surge Protective Devices) under BS 7671 443.",
      "Always lightning.",
      "Never important.",
    ],
    correctAnswer: 1,
    explanation:
      "Transient over-voltages are the silent killer of modern electronics. BS 7671 A4:2026 strengthened the requirements for SPDs on most installations (Reg 443.4 — risk assessment driving SPD requirement). Most domestic installations now have a Type 2 SPD at the CU or main switch. Without one, a single lightning strike within a few miles can fail every electronic device in the property simultaneously.",
  },
  {
    id: 5,
    question: "What's the difference between an OVERLOAD fault and a SHORT-CIRCUIT fault?",
    options: [
      "Same thing.",
      "OVERLOAD — sustained current above the cable / device design rating, typically 1.1× to 5× rated current. Caused by adding load beyond the circuit capacity (multiple appliances on one socket, kettle + toaster + microwave on one ring final at peak). Cleared by the THERMAL element of the MCB (slow trip, 30 seconds to several minutes depending on current). SHORT-CIRCUIT — sudden direct connection between live conductors, very low resistance, very high current (1000s of amps). Caused by insulation breakdown, damaged cables, internal appliance fault. Cleared by the MAGNETIC element of the MCB (instantaneous, &lt;10 ms). The MCB has both elements; both protect against different fault types.",
      "Both same.",
      "Only overload exists.",
    ],
    correctAnswer: 1,
    explanation:
      "Overload and short-circuit are the two excess-current categories the MCB protects against. The thermal element covers the slow heating of overload (would damage cable insulation by heating); the magnetic element covers the explosive current of a short (would damage cable / equipment by heating + arc / mechanical force). Type B / C / D ratings define the magnetic threshold (3-5× / 5-10× / 10-20× rated current respectively).",
  },
  {
    id: 6,
    question: "What's a 'parallel arc' fault and how does an AFDD detect it?",
    options: [
      "Same as short circuit.",
      "Parallel arc = arc between two conductors at different potential through degraded insulation or air gap. Examples: damaged cable with conductors close but not touching, scorched accessory terminal with carbon track between phase and earth. Current is high but intermittent and short-lived (the arc self-extinguishes briefly then re-strikes). MCB / RCBO doesn't see it (current pulses are too short for thermal element, too low for magnetic element). RCD doesn't see it if the arc is L–L or L–N (no residual). AFDD has signature analysis (high-frequency content of current waveform identifies the arc), trips on detected pattern. BS 7671 A4:2026 mandates AFDD on certain dwelling circuits.",
      "Just normal current.",
      "Doesn't exist.",
    ],
    correctAnswer: 1,
    explanation:
      "Parallel arc faults are the canonical case for AFDD. Pre-AFDD, these faults caused fires that no other protective device could prevent — the current was always within the breaker's rating. AFDD's signature analysis uses the high-frequency 'noise' on the current waveform (caused by the arc itself) to identify and trip. BS 7671 A4:2026 Reg 421.1.7 mandates AFDD on certain final circuits in higher-risk dwellings; full requirement progresses through the regulation cycle.",
  },
  {
    id: 7,
    question: "What's an 'L–L' fault on a three-phase system and what does it look like on the meter?",
    options: [
      "Doesn't happen.",
      "L–L (phase-to-phase) fault is a direct connection between two phases of a three-phase supply (e.g. L1 and L2). Continuity between the phases reads near zero. Fault current is high (limited only by supply + cable impedance) — typically 5–10 kA on a typical commercial supply. Operates the magnetic element of the protective device on at least one of the affected phases. The unaffected phase remains live; loads connected line-to-neutral on the unaffected phase continue working. Common cause: insulation breakdown in three-phase cable or motor windings, accidental contact between phases at a terminal block.",
      "Same as L-N.",
      "No current.",
    ],
    correctAnswer: 1,
    explanation:
      "L–L faults are a three-phase-only category. The fault current is high but limited; the unaffected phase remains live (which can be confusing — 'half the loads still work'). Three-phase fault diagnosis requires understanding which loads are line-to-neutral (single-phase) vs line-to-line vs three-phase — the symptoms reveal the fault location.",
  },
  {
    id: 8,
    question: "Which fault type causes the most harm to people, and which causes the most damage to property?",
    options: [
      "Same one.",
      "PEOPLE: earth fault that's NOT cleared by a protective device — the operator touches metalwork that has risen to phase voltage, current flows through them to earth. Direct cause of most electrical shock fatalities. PROPERTY: high-resistance joint (HRJ) — generates I²R heat under load, ignites surrounding combustibles. Direct cause of most electrical fires. The two top fault categories on the HSE / Fire & Rescue statistics. RCD protects against the people-harm fault; AFDD + thermal monitoring protect against the property-harm fault. Both are required for full protection.",
      "Only one harms.",
      "All faults same.",
    ],
    correctAnswer: 1,
    explanation:
      "The HSE and FIA statistics are clear — earth faults kill people (when protection fails), HRJs burn buildings (when no detection exists). The L3 fault diagnostician needs to recognise both — the earth fault is more obvious (RCD trip, customer report), the HRJ is more dangerous because it's silent until it ignites.",
  },
];

const faqs = [
  {
    question: "What's the most common fault type on domestic installations?",
    answer:
      "Earth-leakage faults causing RCD nuisance trips — typically around 40% of domestic fault call-outs in the trade-data sources. Causes: failing appliance heaters (dishwasher, washing machine, kettle elements), water ingress into outdoor sockets / lights, accumulated leakage from many small sources reaching the 30 mA threshold. Second most common: open-circuit faults at sockets and accessories (broken switches, failed terminals). Third: HRJs at sockets and DBs (loose terminals, undersized cable for load). Short circuits and excess current are less frequent but more dramatic when they happen.",
  },
  {
    question: "Why is HRJ so much harder to diagnose than open or short circuit?",
    answer:
      "Because the meter readings on a HRJ at no-load look almost identical to a clean termination. The continuity test is at 200 mA — a 0.5 Ω HRJ shows 0.5 Ω, a clean termination shows 0.05 Ω. Both look 'fine' if you don't know the expected value. The HRJ only reveals itself under load (voltage drop across it heats it) and over time (the heat damages the surrounding material). Diagnosis needs: (1) baseline expected continuity reading from cable design, (2) voltage drop measurement under realistic load, (3) thermal imaging at full load. The combination identifies HRJ; no single test does.",
  },
  {
    question: "Can a fault be more than one of the seven categories at once?",
    answer:
      "Yes. Most real faults evolve. A typical sequence: (1) Insulation failure starts as a high-resistance leakage (e.g. moisture in a junction box). (2) Leakage current heats the contamination, accelerating breakdown. (3) Insulation degrades to short circuit (L–N or L–E). (4) Short-circuit current arcs at the fault, vaporising material and creating a parallel arc fault. (5) Repeated arcing creates an HRJ at the damaged point. (6) HRJ heat ignites surrounding material — fire. The fault you see today might be at stage 3 or 4 of a process that started as a stage 1 leakage two years ago. Diagnosis identifies the current state AND the trajectory.",
  },
  {
    question: "Do AFDDs replace RCDs?",
    answer:
      "No — they're complementary. RCDs detect residual currents (earth faults). AFDDs detect arc signatures (parallel and series arcs). They protect against different fault categories. Modern installations under BS 7671 A4:2026 increasingly use AFDD/RCBO combination devices (single device with all three elements: thermal, magnetic, residual + arc detection). Manufacturer examples: Hager AFB, Schneider iC60 with Vigi+AF, Wylex NHXSAF. The combination devices are the future of CU protection — single-pole-and-neutral protection covering all four fault categories.",
  },
  {
    question: "How much energy is in a typical electrical fire ignition?",
    answer:
      "Surprisingly little. A 0.5 Ω HRJ on a 32 A circuit carrying 25 A under load dissipates 313 W at the joint — equivalent to a small electric heater concentrated in a few millimetres of terminal. Surface temperature can reach 400-600 °C within minutes. PVC insulation chars at 200 °C; wood ignites at 250 °C; paper at 230 °C. So a few hundred watts of HRJ heat is more than enough to ignite combustibles in a typical CU enclosure or junction box. The relatively small power level is why HRJs are missed by overcurrent protection — and why thermal scanning + AFDD are the appropriate detection methods.",
  },
  {
    question: "Why do faults often appear randomly (intermittent) rather than continuously?",
    answer:
      "Several reasons. (1) Thermal cycling — the fault appears when the affected component is at a particular temperature (cold solder joint, heat-sensitive crack). (2) Mechanical movement — vibration, settling, thermal expansion / contraction of cable runs makes contact at one position and not another. (3) Moisture cycling — fault appears when humidity is high (overnight, after rain) and clears when conditions dry. (4) Load-dependent — fault appears under specific load combinations that exceed a marginal joint or cable. (5) Time-dependent — fault appears at specific times (afternoon when temperature peaks, morning when first switched on). Diagnosing intermittent faults often requires data-logging (PQ analyser, see Sub 2.3) over hours / days rather than instantaneous testing.",
  },
];

export default function Sub1() {
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
            eyebrow="Module 4 · Section 3 · Subsection 1"
            title="Types, causes and consequences of faults"
            description="The seven canonical electrical fault types — open circuit, short circuit, earth fault, high-resistance joint, insulation failure, transient voltage, excess current — what causes each, what each looks like on the meter, what each does to the installation."
            tone="emerald"
          />

          <TLDR
            points={[
              "Seven canonical fault types: open circuit, short circuit, earth fault, HRJ, insulation failure, transient voltage, excess current.",
              "Most fatal fault: earth fault that isn't cleared (RCD failure or no RCD). Most damaging fault: high-resistance joint (no protective device sees it; ignites buildings).",
              "Real faults often evolve through stages — insulation failure → arc → HRJ → fire. Diagnosis identifies current state AND trajectory.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Define and identify each of the seven canonical fault types — open, short, earth, HRJ, insulation failure, transient, excess current.",
              "Match each fault type to the protective device that responds to it — MCB thermal/magnetic, RCD, AFDD, SPD, fuse.",
              "Explain why high-resistance joint (HRJ) is the most dangerous fault category for property damage — silent, unprotected by overcurrent devices, ignites combustibles.",
              "Recognise the meter signatures of each fault type on continuity, IR and EFLI tests.",
              "Understand fault evolution — how an insulation failure can progress through arc, HRJ, to fire over time.",
              "Apply BS 7671 A4:2026 protection layering — MCB + RCBO + AFDD + SPD — to cover all fault categories.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The seven canonical fault types</ContentEyebrow>

          <ConceptBlock
            title="Each fault has a meter signature, a protective device, and a consequence"
            plainEnglish="Real faults are infinitely varied but they fall into seven categories. Knowing the categories gives you a diagnostic vocabulary; recognising the meter signature lets you classify the fault quickly; knowing the protective device tells you what should have caught it."
          >
            <p>The seven types:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Open circuit</strong> — current path broken. R = ∞. Load doesn't operate. Caused by broken conductor, failed terminal, blown fuse.</li>
              <li><strong>Short circuit</strong> — direct connection between conductors that should be separate (L–L, L–N, live to live). Very low R, very high current. Trips MCB magnetic element.</li>
              <li><strong>Earth fault</strong> — current path between live and earth. Operates RCD if path is through CPC; bypasses RCD if return is via parallel route.</li>
              <li><strong>High-resistance joint (HRJ)</strong> — termination with elevated contact resistance. Dissipates I²R heat under load. Fire risk. NOT cleared by any overcurrent device.</li>
              <li><strong>Insulation failure</strong> — degraded insulation between conductors. High-resistance leakage path. Precursor to short circuit or earth fault.</li>
              <li><strong>Transient over-voltage</strong> — brief over-voltage spike (microseconds to ms) at 1–20+ kV. From lightning, switching, faults. Damages electronics. Cleared by SPD.</li>
              <li><strong>Excess current</strong> — overload (sustained 1.1–5× rated) or fault (sudden 10×+ rated). Trips MCB thermal or magnetic element respectively.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 131.1 (Fundamental principles)"
            clause={<>"This chapter states the fundamental principles which a person designing, erecting and verifying an electrical installation shall observe... All electrical installations shall be capable of withstanding overcurrent due to overload and short-circuit, and have means provided for the safe disconnection of any fault."</>}
            meaning={<>The \'fundamental principles' chapter sets the duty for protection against the fault categories. Overcurrent protection (MCB / fuse) covers overload + short circuit. Earth fault protection (RCD / RCBO) covers earth fault. AFDD covers arc faults. SPD covers transients. Each category has a designated protective device under the regulation.</>}
            cite="Source: BS 7671:2018 incorporating Amendment 2:2022, Reg 131.1."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Open circuit and short circuit — the easy ones</ContentEyebrow>

          <ConceptBlock
            title="Two categories that show up obviously on the meter"
            onSite="Open and short circuits are the simplest faults to diagnose because the meter signature is unambiguous — R = ∞ or R = near zero. The hard part is finding the location, not classifying the fault."
          >
            <p>Open circuit characteristics:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Continuity reads ∞ Ω on the affected conductor.</li>
              <li>IR reads infinity (no leakage path).</li>
              <li>EFLI reads OPEN (the loop is broken).</li>
              <li>Load doesn't operate.</li>
              <li>Causes: broken conductor, failed terminal screw, blown fuse, failed switch, broken component.</li>
            </ul>
            <p>Short circuit characteristics:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Continuity between L and N (or L and L) reads near zero.</li>
              <li>Protective device trips immediately on energisation.</li>
              <li>Causes: insulation breakdown, damaged cable, cross-wired terminal, internal appliance fault.</li>
              <li>Often visual evidence at the fault point (scorching, melted insulation, displaced conductors).</li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>HRJ — the silent killer</ContentEyebrow>

          <ConceptBlock
            title="Why high-resistance joints are the hardest fault to diagnose AND the most dangerous"
            plainEnglish="HRJ is a termination with higher-than-design contact resistance. The \'normal' resistance is 0.001 Ω or less; an HRJ might be 0.05–5 Ω. Under load, the joint dissipates power as heat (I²R). Sustained heat damages the surrounding insulation and combustibles."
            onSite="Sub 2.3 covered the thermal-imaging diagnosis. Sub 2.4 covered the multi-test signature (high R1+R2 + high Zs + voltage drop on load). HRJ is genuinely hard to find — and it's the leading cause of electrical fires in dwellings."
          >
            <p>HRJ causes:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Loose terminal screw (under-torqued, vibration loosened, thermal cycling loosened).</li>
              <li>Oxidised contact (especially aluminium-to-copper).</li>
              <li>Undersized crimp or wrong tool used (pliers instead of ratchet crimper).</li>
              <li>Damaged conductor strands at the termination (over-stripped, knife-nicked).</li>
              <li>Scorched contact from a previous fault (carbon residue creates the new HRJ).</li>
              <li>Wrong terminal type for conductor (screw terminal not suitable for fine-stranded flex without bootlace ferrule).</li>
            </ul>
            <p>
              HRJ heat output: a 0.5 Ω joint at 25 A load = 313 W concentrated in a few mm. PVC chars at 200 °C; wood ignites at 250 °C; the joint surface easily reaches 400–600 °C. Fire ignition takes minutes to hours of sustained load.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Insulation failure, transient over-voltage, excess current</ContentEyebrow>

          <ConceptBlock
            title="The remaining three fault categories"
          >
            <p><strong>Insulation failure</strong> — degradation of the dielectric between conductors. Causes: physical damage (nail, mouse, abrasion), thermal damage (proximity to heat source, prolonged overload), moisture / contamination, UV degradation, ageing, chemical attack. Progresses to short circuit or earth fault. Diagnosed by IR test — readings below 1 MΩ indicate failure.</p>
            <p><strong>Transient over-voltage</strong> — brief spike (μs–ms) at 1–20+ kV. Causes: lightning (direct or induced), switching of inductive loads, supply-network faults, capacitor switching. Damages solid-state devices. SPD (Surge Protective Device) under BS 7671 443 is the protection. A4:2026 strengthened SPD requirements.</p>
            <p><strong>Excess current</strong> — two sub-categories. OVERLOAD: sustained 1.1–5× rated current; cleared by MCB thermal element (slow trip). SHORT-CIRCUIT FAULT: sudden 10×+ rated; cleared by MCB magnetic element (instant trip). Type B/C/D ratings define the magnetic threshold (3-5× / 5-10× / 10-20× respectively).</p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 421.1.7"
            clause={
              <>
                "Regulation 421.1.7 has been redrafted. It is now a requirement to protect final circuits supplying socket-outlets with a rated current not exceeding 32&nbsp;A using arc fault detection devices (AFDD) in Higher Risk Residential Buildings, Houses in Multiple Occupation, Purpose-built student accommodation and Care homes. For all other premises, the regulation recommends AFDDs for single-phase circuits."
              </>
            }
            meaning={
              <>
                A4:2026 split AFDDs into two categories: mandatory for HRRBs, HMOs, PBSA and care homes; recommended for everywhere else. On a fault-diagnosis visit to one of the mandatory categories, an absent AFDD is a non-compliance to record. On other premises, an absent AFDD is a recommendation to discuss &mdash; not a Code 2.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 421.1.7 (AFDD recommendation, redrafted in A4:2026)."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 411.4.1"
            clause={
              <>
                "In a TN system, the integrity of the earthing of the installation depends on the reliable and effective connection of the PEN or PE conductors to Earth. Where the earthing is provided from a public or other supply system, compliance with the necessary conditions external to the installation is the responsibility of the distributor."
              </>
            }
            meaning={
              <>
                Earth-fault behaviour on TN installations is only as reliable as the upstream PEN. When you&apos;re classifying a fault as &ldquo;earth fault&rdquo; you&apos;re assuming the path back to the transformer is intact. If it isn&apos;t, the fault current never flows, the breaker never trips, and the customer&apos;s metalwork sits at phase voltage. This is why N&ndash;E and Ze readings come before fault classification, not after.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 411.4.1, verbatim."
          />

          <VideoCard
            url={videos.faultFinding.url}
            title={videos.faultFinding.title}
            channel={videos.faultFinding.channel}
            duration={videos.faultFinding.duration}
            topic={videos.faultFinding.topic}
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Diagnosing an HRJ as \'just a worn socket' and replacing without root cause analysis"
            whatHappens={<>Apprentice finds a kitchen socket with melted face plate, replaces socket, retests, all fine, leaves. Three months later the customer reports another melted socket on the same circuit. Apprentice replaces again. Cycle continues. Real cause: the upstream socket has been over-loaded for years (kettle + microwave + toaster on a single faceplate) — the issue isn't the socket, it\'s the cable rating + the breaker rating + the user\'s load pattern. The melting socket is a symptom; the design / load issue is the root cause.</>}
            doInstead={<>For HRJ findings, look for the pattern. Multiple HRJs on the same circuit suggest sustained overload, not random failure. Measure the actual load pattern with a clamp meter; check the circuit design against the load; consider upgrading to higher-rated cable / breaker / accessory. Sub 4.4 (5-Whys root cause) walks through the analysis discipline.</>}
          />

          <CommonMistake
            title="Restoring a tripped MCB without identifying the fault category"
            whatHappens={<>Customer has tripped MCB. Apprentice resets it without testing. Breaker stays in. Apprentice leaves. Two days later same breaker trips again — this time the underlying fault has progressed (insulation failure → short circuit) and an arc has scorched the cable. Customer escalates the call-out fee complaint; the apprentice is asked why they didn't investigate the original trip.</>}
            doInstead={<>A tripped MCB is a symptom — never just reset and leave. Test the affected circuit (continuity, IR, EFLI) to identify the fault category. Find and rectify the cause. Reset only after rectification AND retest. Document the cause and the fix on the job sheet. The 'just reset it' habit is the root of repeat call-outs.</>}
          />

          <Scenario
            title="Distinguishing fault types on a multi-symptom domestic complaint"
            situation={<>Customer reports three symptoms over two weeks: (1) lights flicker briefly when the fridge cycles on, (2) RCD on kitchen ring trips occasionally, (3) socket in utility room is warm to the touch. They suspect 'something wrong with the wiring\'.</>}
            whatToDo={<>Investigate each symptom as a separate fault hypothesis. (1) Flicker on fridge cycle — voltage drop on inrush; possible HRJ on the supply path or undersized supply cable. Test EFLI at the affected lighting circuit; measure voltage drop with clamp meter when fridge cycles. (2) RCD nuisance trip on kitchen ring — earth leakage. Use clamp meter (L+N together) to measure leakage; identify the leaky appliance by elimination (Sub 3.4 covers this). (3) Warm socket — HRJ at that socket. Thermal imaging under load; if hotspot confirmed, isolate, open, inspect, re-terminate. The customer\'s 'something wrong with the wiring' is actually three separate faults of different categories — your investigation reports each one and its rectification.</>}
            whyItMatters={<>Real fault-diagnosis jobs often have multiple symptoms that look like one issue but are actually independent. The L3 step-up is to investigate each symptom as its own hypothesis with appropriate tests, rather than assuming one root cause. Combining the seven-category framework with disciplined per-symptom testing is what separates a fast, accurate diagnosis from a hand-wavy guess.</>}
          />

          <SectionRule />

          <ContentEyebrow>Open circuit — diagnosis routine</ContentEyebrow>

          <ConceptBlock
            title="The open-circuit fault — why it happens and how the MFT confirms it"
            plainEnglish="Open circuit means a break in the conductor — line, neutral or CPC. Symptom: the load doesn't work; voltage at the load is zero; continuity test from supply to load reads OPEN."
            onSite="Common causes: terminal screw vibrated loose, conductor work-hardened and snapped at a junction box clamp, rodent damage in a loft (rats love XLPE insulation on SWA), broken solder joint inside an electronic load, fuse blown or MCB tripped. Diagnosis: continuity (R1+R2) on the Megger MFT1741+ between supply end and load end of each conductor in turn — line, neutral, CPC. The conductor that reads OPEN is the broken one. Then walk the cable run with continuity probes to find the break point."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Continuity sequence</strong> — line continuity (supply L to load L); neutral continuity (supply N to load N); CPC continuity (supply CPC to load earth).</li>
              <li><strong>R1+R2</strong> — line + CPC loop. Reads OPEN if either is broken.</li>
              <li><strong>Halve and test</strong> — split the cable run at the midpoint, retest each half. The half that reads OPEN contains the break. Repeat until you've localised to a few metres.</li>
              <li><strong>Cable-locator</strong> — a Fluke 2042 cable locator or Megger CFL535G can trace cable runs through walls / under floors and identify break points without exposing the cable.</li>
              <li><strong>Wander lead</strong> — Megger WL10 / WL20 wander lead extends one MFT probe to the far end of a long radial. Test R1+R2 with the lead at the load and the MFT at the DB.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Short circuit — diagnosis routine</ContentEyebrow>

          <ConceptBlock
            title="The short-circuit fault — L-N or L-L direct contact"
            plainEnglish="Short circuit means line directly contacting neutral (L-N) or line-to-line on three-phase (L-L). Fault current is limited only by source impedance; PSCC of 1-10 kA is typical. The MCB or fuse trips immediately. Symptom: breaker trips on power-up; loud bang on initial fault; possibly visible damage at the fault point (burnt insulation, tripped MCB on closure)."
            onSite="Common causes: cable nail / staple driven through twin-and-earth, water ingress bridging L and N inside an outdoor accessory, terminal screw clamping insulation between L and N, rodent damage exposing both conductors, faulty appliance with internal short. Diagnosis: insulation resistance test L-N at 500 V on the Megger MFT1741+ — healthy circuit reads &gt;999 MΩ; short reads near zero (&lt;1 MΩ definitely faulty)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>IR test L-N</strong> — at 500 V (or 250 V if electronics can't be disconnected). Pass: &gt;1 MΩ minimum, typically &gt;100 MΩ on healthy circuit.</li>
              <li><strong>Halve and test</strong> — disconnect at midpoint, retest each half. Repeat to localise.</li>
              <li><strong>Visual inspection</strong> — burnt insulation, melted accessory, signs of arcing. Common at staple points, nail points through cables, corner-of-back-box where insulation got crushed.</li>
              <li><strong>Appliance test</strong> — disconnect all loads, retest IR. If now passes, fault is in an appliance. Plug appliances back one at a time, retest each — the appliance that drops the IR is faulty.</li>
              <li><strong>Cable-tracer / fault-finder</strong> — Amprobe AT-7000, Megger FFL3 cable fault locator, both inject signal and locate faults along buried or hidden cable runs.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Earth fault — diagnosis routine</ContentEyebrow>

          <ConceptBlock
            title="The earth fault — L-E direct contact (the most common fault on modern installations)"
            plainEnglish="Earth fault means line directly contacting CPC or exposed earthed metalwork. Fault current depends on Zs (earth fault loop impedance); on TN-C-S typically 50-500 A; on TT typically 1-5 A. RCD trips at 30 mA residual; MCB trips at instantaneous trip current (typically 5-10× rated)."
            onSite="Common causes: damaged insulation exposing line conductor near earthed metal, water ingress inside outdoor accessories, faulty heating element shorting to body of appliance, damaged appliance flex with line touching earth. Diagnosis: IR test L-E at 500 V on MFT — healthy &gt;999 MΩ; faulty &lt;1 MΩ. EFLI Zs measurement confirms protection will operate."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>IR test L-E</strong> — at 500 V. Identifies the L-E fault if the fault is permanent.</li>
              <li><strong>Live clamp test</strong> — Fluke 369 FC or Megger DCM340 leakage clamp around line + neutral together at the circuit origin. A healthy circuit reads &lt;1 mA; an L-E leak reads 5-30+ mA.</li>
              <li><strong>Hi-Z (no-trip) loop test</strong> — Megger MFT1741+ Hi-Z mode tests Zs without tripping the RCD. Useful when investigating without disturbing the customer.</li>
              <li><strong>Disconnect appliances</strong> — plug-in appliances are the most common cause of intermittent earth leakage (kettle element wet, washing machine drum bearing failed). Disconnect each in turn, retest IR.</li>
              <li><strong>Touch-voltage test</strong> — Megger MFT1741+ touch-voltage mode reports the voltage on accessible metalwork during a simulated L-E fault. Above 50 V AC = unsafe.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Transient voltages and surge events</ContentEyebrow>

          <ConceptBlock
            title="The transient fault — when the cause is gone before you arrive"
            plainEnglish="Transient voltage events (lightning strikes, switching surges, capacitor switching, motor starting, IGBT switching in inverters) can damage equipment and trip protection without leaving a measurable fault. Symptom: equipment damaged, fault is gone, the customer can't reproduce it. Investigation requires either evidence of past events (equipment damage patterns) or a power-quality analyser to catch a future event."
            onSite="Standard kit: Fluke 1730 / 1760 PQ analyser logs voltage, current and transient events over hours/days. SPDs (Surge Protective Devices) at the origin (Type 1+2 combined units like Hager SPN302D, Schneider iPRD40r, Mersen STR40T2-275) catch lightning-induced surges and prevent equipment damage. A blown SPD is itself a diagnostic clue (the SPD did its job; check for a recent event)."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>SPD inspection</strong> — Type 2 SPDs at the CU have a status indicator (red/green window). Red = SPD has operated and needs replacement.</li>
              <li><strong>Equipment damage patterns</strong> — pinhole burns on PCBs, blackened MOV (metal-oxide varistor), failed switching power supplies in multiple devices simultaneously = lightning-induced transient.</li>
              <li><strong>PQ analyser deployment</strong> — Fluke 1730 logs for 7+ days, captures dips, swells, transients above defined threshold. Customer-presentable report identifies events and timing.</li>
              <li><strong>Switching transients</strong> — large motor startups, capacitor banks, contactor operation, VSD switching all create transients. Localised to specific equipment events; correlate by timing.</li>
              <li><strong>BS 7671 443 + 534</strong> — Chapter 443 (transient overvoltages) sets when SPDs are required (most modern installations); Chapter 534 (specification for SPDs) sets the technical requirements.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Seven canonical fault types: open circuit, short circuit, earth fault, HRJ, insulation failure, transient voltage, excess current.",
              "Each fault has a meter signature, a designated protective device (MCB / RCD / AFDD / SPD / fuse), and a consequence (load fails / fire / shock / equipment damage).",
              "Most fatal fault: earth fault not cleared (RCD failure or no RCD). Most damaging fault: HRJ (silent, unprotected by overcurrent, ignites buildings).",
              "Real faults evolve — insulation failure → arc → HRJ → fire. Diagnosis identifies current state AND trajectory.",
              "Open / short circuit are easy to classify (R = ∞ or near zero). HRJ is hard — needs voltage drop on load + thermal imaging to reveal.",
              "BS 7671 A4:2026 mandates AFDD on certain dwelling final circuits to catch the parallel-arc fault category that no other device sees.",
              "SPD (BS 7671 443) protects against transient over-voltages from lightning, switching and supply-network faults.",
              "Tripped MCB is a symptom — never reset without testing. The 'just reset' habit is the root of repeat call-outs.",
            ]}
          />

          <Quiz title="Types, causes and consequences — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section2-4')} className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white"><ChevronLeft className="h-3 w-3" /> Previous</div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">2.4 MFT testing</div>
            </button>
            <button onClick={() => navigate('/study-centre/apprentice/level3-module4-section3-2')} className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]">
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">Next subsection <ChevronRight className="h-3 w-3" /></div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">3.2 Common symptoms</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
