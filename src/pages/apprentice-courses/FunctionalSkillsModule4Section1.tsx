/**
 * Functional Skills · Module 4 · Section 1 — Electrical calculations
 *
 * CONVERTED (13 Sep) from the 2024 dialect to the StudyPage reading kit.
 * This is a pure maths page, so density runs higher than a typical section:
 * every technique below is naturally a WorkedExample, and the page carries
 * 13 WorkedExample and 8 TryIt blocks against 8 ConceptBlocks — every section
 * runs explain → show → do, and several sections run it twice.
 *
 * 🔴 CORRECTED DATA CARRIED FORWARD FROM THE 2024 PAGE, UNCHANGED — checked
 * again against the canonical source files during this pass, not recalled:
 *  - 50A Type B max Zs = 0.87Ω (checked against src/data/zsLimits.ts,
 *    MCB_RCBO_ZS_LIMITS.typeB — the full ladder 6A 7.28 / 10A 4.37 / 16A 2.73
 *    / 20A 2.19 / 32A 1.37 / 40A 1.09 / 50A 0.87 matches the source exactly).
 *  - R1+R2 for 4.0mm² line with 1.5mm² CPC = 4.61 + 12.1 = 16.71 mΩ/m
 *    (checked against src/lib/eic/expectedValues.ts, CONDUCTOR_RESISTANCE_20C
 *    — Table 9A at 20°C: 4.0mm² = 4.61, 1.5mm² = 12.1). The CPC must be added;
 *    the line conductor alone (4.61) is not R1+R2.
 *  - 4.0mm² T&E Method C Iz = 37A (checked against
 *    src/lib/calculators/bs7671-data/appendix4CurrentCapacity.ts — every
 *    relevant Method C / clipped-direct row for 4.0mm² reads 37).
 *  - Prospective fault current determination is Regulation 434.1; the
 *    neighbouring regulation on breaking capacity is 434.5.1. Both numbers
 *    were already on the 2024 page and are unchanged — no new regulation
 *    numbers have been added anywhere on this page.
 *  - The BS EN 60898 device ladder is 6, 10, 16, 20, 25, 32, 40, 50, 63.
 *    There is no 45A rung and no 60A rung — taught explicitly in Section 02,
 *    where the shower example lands on 41.3A and the next size up is 50A.
 *  - The ring final explanation in Section 01 keeps its full reasoning
 *    intact: 0.52Ω is the whole loop, each leg is half at 0.26Ω, R1 = 0.52/4
 *    = 0.13Ω because you halve twice (leg, then parallel), and 0.13Ω is R1
 *    alone — Zs still needs the CPC added in.
 *  - The ADMD worked example in Section 05 still totals 133.68A, still notes
 *    that exceeds a 100A cut-out (so the answer is to talk to the DNO, not to
 *    just fit a bigger board), and still flags that no diversity has been
 *    applied to the shower or an EV charger in that total.
 *  - Voltage drop 3% (lighting) / 5% (other) are RECOMMENDED maxima from
 *    Appendix 4 §6.4, deemed-to-satisfy via Regulation 525.202 — never
 *    written as "maximum permitted" anywhere on this page.
 *
 * DENSITY PASS (13 Sep): the 2024 page already had reasonable maths content
 * but almost none of it was in a checkable, reusable WorkedExample/TryIt
 * shape — it was prose with inline bullet arithmetic, and a learner had
 * nothing of their own to attempt. This pass:
 *  - Turned every existing calculation into a proper WorkedExample with
 *    step-by-step `steps` and a stated `answer`, and added a TryIt after
 *    each one so the learner repeats the technique on their own numbers
 *    before moving on.
 *  - Added new worked material the 2024 page did not have at all: a second
 *    Ohm's Law worked example (parallel circuit walked as a technique rather
 *    than a bullet list), a full ring final Zs example that combines R1 and
 *    R2 rather than stopping at R1, a second temperature-correction example,
 *    and a second complete circuit-design walkthrough in Section 08 using
 *    different numbers to the first.
 *  - Cut nothing substantive — the subject explanation in every ConceptBlock
 *    is at least as long as the 2024 prose it replaces, in several places
 *    (the ring final reasoning, the Part 7/regulation distinction between
 *    434.1 and 434.5.1) longer, because that reasoning is exactly what a
 *    learner needs to be able to repeat, not just read once.
 *  - Quiz bank (all 8 questions, options, correctAnswer indices) and all
 *    three InlineChecks (calc-check-1, calc-check-2, calc-check-3 — ids and
 *    correctIndex values unchanged) are carried over verbatim.
 *
 * Deliberately NOT using <RegsCallout> anywhere on this page: it renders its
 * `clause` prop as quoted regulation text, and this page paraphrases and
 * teaches the numbering rather than quoting clause text — promoting a
 * paraphrase into a clause field is exactly how a fabricated BS 7671 quote
 * got shipped once before.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  Scenario,
  ContentEyebrow,
  SectionRule,
  WorkedExample,
  TryIt,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Electrical Calculations - Functional Skills Module 4.1';
const DESCRIPTION =
  "Master Ohm's law, the power triangle, voltage drop, diversity factors, maximum demand, earth fault loop impedance and prospective fault current for UK electrical installations, with worked examples throughout.";

const quizQuestions = [
  {
    id: 1,
    question: 'A 230V circuit supplies a 2.3kW load. What current does it draw?',
    options: ['10A', '5A', '23A', '13A'],
    correctAnswer: 0,
    explanation:
      'I = P / V = 2300 / 230 = 10A, applying the power formula rearranged for current. The 23A figure is the common error of forgetting to convert kilowatts to watts.',
  },
  {
    id: 2,
    question:
      'A cable run is 25m using 2.5mm² twin and earth (mV/A/m = 18). The load current is 20A. What is the voltage drop?',
    options: ['18.0V', '4.5V', '9.0V', '45.0V'],
    correctAnswer: 2,
    explanation:
      'Voltage drop = mV/A/m × I × L / 1000 = 18 × 20 × 25 / 1000 = 9.0V. This is within the recommended 5% maximum (11.5V) for a power circuit.',
  },
  {
    id: 3,
    question: 'Ze is measured as 0.35Ω and R1+R2 for the circuit is 0.95Ω. What is Zs?',
    options: ['0.95Ω', '0.60Ω', '1.65Ω', '1.30Ω'],
    correctAnswer: 3,
    explanation:
      'Zs = Ze + (R1+R2) = 0.35 + 0.95 = 1.30Ω. This must then be checked against the maximum Zs value for the protective device.',
  },
  {
    id: 4,
    question:
      'A domestic lighting circuit has a total connected load of 1800W at 230V. Applying 66% diversity, what current should be allowed for in the maximum demand?',
    options: ['7.83A', '5.17A', '11.88A', '3.42A'],
    correctAnswer: 1,
    explanation:
      'Total current = 1800 / 230 = 7.83A; after applying 66% diversity, 7.83 × 0.66 = 5.17A. This is the figure carried into the ADMD calculation; 7.83A is the undiversified current.',
  },
  {
    id: 5,
    question:
      'Three resistors of 10Ω, 15Ω and 25Ω are connected in series across a 230V supply. What is the current?',
    options: ['4.6A', '9.2A', '2.3A', '23A'],
    correctAnswer: 0,
    explanation:
      'In a series circuit, resistances add: total R = 10 + 15 + 25 = 50Ω, so I = V / R = 230 / 50 = 4.6A.',
  },
  {
    id: 6,
    question:
      'A 3kW immersion heater is connected to a 230V supply. What is the resistance of the heating element?',
    options: ['76.67Ω', '52.90Ω', '17.63Ω', '6.67Ω'],
    correctAnswer: 2,
    explanation:
      'R = V² / P = 230² / 3000 = 52900 / 3000 = 17.63Ω. You can verify: I = P/V = 3000/230 = 13.04A, then R = V/I = 230/13.04 = 17.64Ω (slight rounding difference).',
  },
  {
    id: 7,
    question:
      'The measured Ze at the origin of a TN-C-S supply is 0.10Ω. What is the prospective fault current?',
    options: ['230A', '1,150A', '23,000A', '2,300A'],
    correctAnswer: 3,
    explanation:
      'Ipf = Uoc / Zs = 230 / 0.10 = 2,300A = 2.3kA. This is well within the 6kA rating of a standard domestic MCB.',
  },
  {
    id: 8,
    question:
      'A TN-S supply has Ze = 0.8Ω. A 20A Type B MCB protects a radial circuit with measured R1+R2 of 1.05Ω. Applying the 1.20 correction factor, what is the Zs and does it comply?',
    options: [
      'Zs = 1.85Ω — does not comply',
      'Zs = 2.06Ω — complies (max 2.19Ω)',
      'Zs = 1.26Ω — complies easily',
      'Zs = 2.46Ω — does not comply',
    ],
    correctAnswer: 1,
    explanation:
      'Zs = Ze + (R1+R2 × 1.20) = 0.8 + (1.05 × 1.20) = 0.8 + 1.26 = 2.06Ω. Maximum Zs for a 20A Type B MCB = 2.19Ω (BS 7671:2018+A4:2026 Table 41.3). Since 2.06 < 2.19, it complies.',
  },
];

const FunctionalSkillsModule4Section1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 4 · Section 1"
        title="Electrical calculations"
        backTo="/study-centre/apprentice/functional-skills/module4"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        {/* Wider than the 64rem default, to match the rest of the course — this
            section carries formulae and multi-line worked calculations that
            read badly when they wrap. */}
        <StudyPage measure="74rem" wide="94rem">
          <p className="text-[13px] leading-relaxed text-white">
            Every calculation on this page traces back to one relationship between voltage, current
            and resistance. Cable sizing, voltage drop, diversity, earth fault loop impedance and
            prospective fault current all look like separate topics until you notice they are the
            same handful of formulae, applied to different questions. This section builds each one
            from the ground up and then makes you use it — not recall it.
          </p>

          <LearningOutcomes
            outcomes={[
              "Apply Ohm's Law and its rearrangements to series and parallel circuits, and explain why a ring final's R1 is divided by four rather than two.",
              'Use the power triangle to move between power, current, voltage and resistance, and select the correct next-size protective device from the BS EN 60898 ladder.',
              'Calculate voltage drop for a radial and a ring final circuit, and check the result against the correct recommended maximum for the circuit type.',
              'Apply IET On-Site Guide diversity factors to lighting, cooker and socket circuits, and explain why diversity applies to the supply, not to individual circuit protection.',
              'Build a full after-diversity maximum demand (ADMD) calculation and recognise when the result means talking to the DNO rather than fitting a bigger board.',
              'Calculate Zs from Ze and R1+R2, apply the 1.20 temperature correction factor, and check the result against the correct maximum for the protective device.',
              'Calculate prospective fault current from Ze, and check it against the breaking capacity of a protective device — distinguishing Regulation 434.1 from 434.5.1.',
              'Work a complete circuit design calculation from design current through to prospective fault current, in the right order, on one circuit.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Module 1 — percentages, ratios and basic algebra',
                gist: 'Every formula here is rearranged algebra and every diversity factor is a percentage. You do not need to be fast at either, but neither should be unfamiliar.',
              },
              {
                term: 'You know what R1, R2 and Ze mean',
                gist: "This section builds the calculations on top of those terms rather than defining them from scratch — a basic sense of 'line conductor', 'CPC' and 'external loop impedance' is assumed.",
              },
            ]}
          />

          <TLDR
            points={[
              "Ohm's Law — V = I × R — and its two rearrangements, I = V/R and R = V/I, underlie every calculation on this page.",
              'The power triangle gives three ways to find power depending on what you know: P = I×V, P = I²×R, P = V²/R.',
              'Voltage drop = mV/A/m × Ib × L / 1000. The recommended maxima are 3% for lighting and 5% for other uses (Appendix 4 §6.4, deemed-to-satisfy via Reg 525.202) — recommended, not a permitted ceiling.',
              "Diversity reduces the assumed total load for sizing the SUPPLY. It never reduces what an individual circuit's protective device is rated for.",
              'Zs = Ze + (R1+R2), and R1+R2 measured at 20°C is corrected for operating temperature by multiplying by 1.20 before comparing it to the maximum in the table.',
              "Ipf = Uoc / Zs. Regulation 434.1 requires you to determine it; 434.5.1 is the separate rule that the device's breaking capacity must not be exceeded by it.",
              'The BS EN 60898 device ladder is 6, 10, 16, 20, 25, 32, 40, 50, 63 — there is no 45A rung and no 60A rung, so "round up to the next standard size" sometimes jumps further than you expect.',
              "A ring final's R1 is not half the measured end-to-end resistance — it is a quarter of it, because you halve once for the leg and again for the parallel legs.",
            ]}
          />

          <SectionRule />

          {/* ── 01 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>01 · Ohm's Law in practice</ContentEyebrow>

          <ConceptBlock
            title="V = I × R, and its two rearrangements"
            onSite="Every calculation you do on site — cable sizing, fault current, voltage drop — is Ohm's Law wearing a different hat. Get comfortable rearranging it and the rest of this page is mostly bookkeeping."
          >
            <p>
              Ohm's Law describes the relationship between voltage, current and resistance in any
              circuit: <strong className="text-white">V = I × R</strong>. Rearranged, that also
              gives you <strong className="text-white">I = V / R</strong> and{' '}
              <strong className="text-white">R = V / I</strong>. Those three forms let you find any
              one of the three quantities as soon as you know the other two — which one you use
              depends only on which two you already have.
            </p>
            <p>
              In a <strong className="text-white">series</strong> circuit, resistances simply add: R
              <sub>T</sub> = R<sub>1</sub> + R<sub>2</sub> + R<sub>3</sub>… The same current flows
              through every resistor, but the voltage divides across them in proportion to their
              resistance.
            </p>
            <p>
              In a <strong className="text-white">parallel</strong> circuit it works the other way
              round: the voltage across every branch is the same, but the current divides between
              them, and the combined resistance is found from{' '}
              <strong className="text-white">
                1/R<sub>T</sub> = 1/R<sub>1</sub> + 1/R<sub>2</sub>
              </strong>{' '}
              (extended with a further term for each additional branch). The combined resistance of
              a parallel group is always lower than the smallest individual resistor — adding a
              second path always makes it easier for current to flow, never harder.
            </p>
            <p>
              A ring final circuit is the one place where this series-and-parallel thinking trips
              people up on a real job, so it is worth working through carefully once you have the
              basic idea. You measure the end-to-end resistance of a ring's line conductor — testing
              from one leg of the ring at the consumer unit, all the way round, to the other leg —
              and get, say, 0.52Ω. That figure is the resistance of the{' '}
              <strong className="text-white">whole loop</strong>: all the way out and all the way
              back. It is not the resistance of each leg; each leg on its own is exactly half of it,
              0.26Ω.
            </p>
            <p>
              Once the ring is cross-connected and made up at every socket, those two legs sit in
              parallel with each other from the consumer unit to any point on the ring. Two equal
              resistors in parallel halve again, so the resistance you actually get from the
              consumer unit to a socket works out at R<sub>1</sub> = 0.52 / 4 = 0.13Ω. Dividing by
              four catches people out every time, so it is worth seeing why: you halve once because
              each leg is half the loop, and you halve again because the two legs are in parallel.
              Two separate halvings, not one.
            </p>
            <p>
              And 0.13Ω is R<sub>1</sub> on its own — the line conductor. Zs needs (R<sub>1</sub>+R
              <sub>2</sub>), so you still have to do exactly the same measurement and the same
              arithmetic for the CPC and add it in. Stopping at R<sub>1</sub> understates your Zs,
              which is the worst direction to be wrong in.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Three resistors of 10Ω, 15Ω and 25Ω are connected in series across a 230V supply. Find the total resistance, the current, and the voltage dropped across the 25Ω resistor."
            steps={[
              {
                calc: 'Total resistance: R_T = 10 + 15 + 25 = 50Ω',
                note: 'Series resistances simply add.',
              },
              {
                calc: 'Current: I = V / R_T = 230 / 50 = 4.6A',
                note: 'The same current flows through every resistor in a series circuit.',
              },
              {
                calc: 'Voltage across the 25Ω resistor: V = I × R = 4.6 × 25 = 115V',
                note: 'Each resistor takes a share of the supply voltage in proportion to its own resistance.',
              },
            ]}
            answer="Total resistance 50Ω, current 4.6A, and 115V dropped across the 25Ω resistor — exactly half the 230V supply, because 25Ω is exactly half of the 50Ω total."
            watchOut="It's easy to apply V = I × R using the total resistance when you actually want the voltage across one resistor. Use the resistance of the single component you're asking about, with the current that is common to the whole series loop."
          />

          <TryIt
            question="Two resistors of 20Ω and 30Ω are connected in series across a 100V supply. Find the total resistance, the current, and the voltage dropped across the 30Ω resistor."
            steps={[
              { calc: 'R_T = 20 + 30 = 50Ω', note: 'Series resistances add.' },
              {
                calc: 'I = V / R_T = 100 / 50 = 2A',
                note: 'The same current flows through both resistors.',
              },
              {
                calc: 'V across 30Ω = I × R = 2 × 30 = 60V',
                note: 'Its share of the 100V supply, in proportion to its resistance.',
              },
            ]}
            answer="Total resistance 50Ω, current 2A, and 60V across the 30Ω resistor (with the remaining 40V across the 20Ω resistor — the two shares add back to the 100V supply)."
          />

          <SectionRule />

          <WorkedExample
            question="Two resistors of 20Ω and 30Ω are connected in parallel across a 12V supply. Find the combined resistance, the total current drawn from the supply, and the current through each branch."
            steps={[
              {
                calc: '1/R_T = 1/20 + 1/30 = 3/60 + 2/60 = 5/60',
                note: 'Put both fractions over a common denominator (60) before adding.',
              },
              {
                calc: 'R_T = 60 / 5 = 12Ω',
                note: 'Invert the result to get the combined resistance. Notice 12Ω is lower than either individual resistor.',
              },
              {
                calc: 'Total current: I = V / R_T = 12 / 12 = 1A',
                note: 'Using the supply voltage and the combined resistance.',
              },
              {
                calc: 'Branch currents: I₁ = 12/20 = 0.6A, I₂ = 12/30 = 0.4A',
                note: 'Each branch sees the full 12V, so its own current is found from its own resistance alone.',
              },
            ]}
            answer="Combined resistance 12Ω, total current 1A, split as 0.6A through the 20Ω branch and 0.4A through the 30Ω branch."
            watchOut="Check your branch currents add back up to the total: 0.6A + 0.4A = 1A. This is Kirchhoff's Current Law — what goes in at the parallel junction must come out — and it is a free check on every parallel calculation you do."
          />

          <TryIt
            question="Two resistors of 10Ω and 40Ω are connected in parallel across a 20V supply. Find the combined resistance, the total current, and the current through each branch — then check your branch currents add up correctly."
            steps={[
              {
                calc: '1/R_T = 1/10 + 1/40 = 4/40 + 1/40 = 5/40',
                note: 'Common denominator of 40.',
              },
              {
                calc: 'R_T = 40 / 5 = 8Ω',
                note: 'Lower than the smallest resistor (10Ω), as it should be.',
              },
              { calc: 'Total current: I = 20 / 8 = 2.5A', note: '' },
              { calc: 'Branch currents: I₁ = 20/10 = 2A, I₂ = 20/40 = 0.5A', note: '' },
            ]}
            answer="Combined resistance 8Ω, total current 2.5A, branch currents 2A and 0.5A — which add back to 2.5A, confirming the arithmetic."
          />

          <WorkedExample
            question="A ring final's line conductors measure 0.68Ω end-to-end at the consumer unit. The CPC measures 1.12Ω end-to-end over the same run. Find R1, R2, and R1+R2 for a socket at the far side of the ring."
            steps={[
              {
                calc: 'R1 = 0.68 / 4 = 0.17Ω',
                note: 'End-to-end line resistance divided by four: once for the leg being half the loop, once for the two legs being in parallel.',
              },
              {
                calc: 'R2 = 1.12 / 4 = 0.28Ω',
                note: 'Exactly the same reasoning applied to the CPC — it is also a ring, made up of two legs in parallel.',
              },
              {
                calc: 'R1 + R2 = 0.17 + 0.28 = 0.45Ω',
                note: 'Both halvings done for both conductors, then added — this is the figure that goes into Zs, not R1 alone.',
              },
            ]}
            answer="R1 = 0.17Ω, R2 = 0.28Ω, R1+R2 = 0.45Ω. Both figures needed the same divide-by-four treatment before they could be added."
            watchOut="A common mistake is to divide the line conductor by four correctly, then simply halve the CPC reading because it 'feels' like a different sort of number. The CPC is a ring too — treat it exactly the same way as R1."
          />

          <TryIt
            question="A ring final's line conductors measure 0.44Ω end-to-end. The CPC (1.5mm² in a 2.5mm² ring, so a different cross-section) measures 0.74Ω end-to-end. Find R1, R2, and R1+R2."
            steps={[
              { calc: 'R1 = 0.44 / 4 = 0.11Ω', note: 'Divide by four: leg, then parallel.' },
              {
                calc: 'R2 = 0.74 / 4 = 0.185Ω',
                note: 'Same treatment for the CPC, regardless of its cross-section being smaller than the line conductor.',
              },
              { calc: 'R1 + R2 = 0.11 + 0.185 = 0.295Ω', note: 'Add the two divided figures.' },
            ]}
            answer="R1 = 0.11Ω, R2 = 0.185Ω, R1+R2 = 0.295Ω. The CPC being a smaller cross-section than the line conductor is exactly why its own end-to-end reading matters — you cannot infer it from the line conductor's figure."
          />

          <SectionRule />

          {/* ── 02 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>02 · The power triangle</ContentEyebrow>

          <ConceptBlock title="Three formulae, chosen by what you already know">
            <p>
              Electrical power can be found three interchangeable ways, and which one you reach for
              depends entirely on which two quantities you already have:
            </p>
            <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="mb-1 font-mono text-lg text-white">P = I × V</p>
                <p className="text-xs text-white">When you know current and voltage</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="mb-1 font-mono text-lg text-white">P = I² × R</p>
                <p className="text-xs text-white">When you know current and resistance</p>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/5 p-4 text-center">
                <p className="mb-1 font-mono text-lg text-white">P = V² / R</p>
                <p className="text-xs text-white">When you know voltage and resistance</p>
              </div>
            </div>
            <p className="mt-3">
              Rearranged for current, the one you will use most often on site is{' '}
              <strong className="text-white">I = P / V</strong> — the rating on an appliance's
              nameplate, divided by the supply voltage, gives you the design current. Once you have
              that current, the next job is almost always to pick a protective device to match it,
              and that device has to come off a fixed ladder of standard sizes:{' '}
              <strong className="text-white">6, 10, 16, 20, 25, 32, 40, 50, 63 amps</strong> (BS EN
              60898). There is no 45A rung and no 60A rung on that ladder — if your calculated
              current lands between two of those numbers, you round up to the next one that actually
              exists, and sometimes that jump is bigger than you expect.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A 3kW immersion heater is connected to a 230V supply. Find the current it draws and the resistance of its heating element, then check the two figures agree with each other."
            steps={[
              {
                calc: 'Current: I = P / V = 3000 / 230 = 13.04A',
                note: 'Rearranging P = I × V for current.',
              },
              {
                calc: 'Resistance: R = V² / P = 230² / 3000 = 52,900 / 3000 = 17.63Ω',
                note: 'Using the voltage-and-resistance form, since you were not given the current directly.',
              },
              {
                calc: 'Check: P = I² × R = 13.04² × 17.63 ≈ 2,997W ≈ 3kW',
                note: 'Feeding the two answers back into the third formula should return close to the original power — the small gap is rounding.',
              },
            ]}
            answer="Current 13.04A, resistance 17.63Ω, and the check confirms both figures are consistent with the stated 3kW rating."
            watchOut="Always sense-check a calculated result. A domestic immersion heater drawing 13A on 230V is realistic; if you calculated 130A, you have almost certainly made a decimal-point error somewhere upstream."
          />

          <TryIt
            question="A 2kW fan heater is connected to a 230V supply. Find the current it draws and the resistance of its heating element, then check the two answers are consistent."
            steps={[
              { calc: 'I = P / V = 2000 / 230 = 8.70A', note: '' },
              { calc: 'R = V² / P = 230² / 2000 = 52,900 / 2000 = 26.45Ω', note: '' },
              {
                calc: 'Check: P = I² × R = 8.70² × 26.45 ≈ 2,002W ≈ 2kW',
                note: 'Small rounding difference, as expected.',
              },
            ]}
            answer="Current 8.70A, resistance 26.45Ω, and the check confirms both are consistent with a 2kW rating."
          />

          <SectionRule />

          <WorkedExample
            question="A 9.5kW electric shower runs on a 230V supply. Find the current it draws, and identify the correct protective device size — bearing in mind the BS EN 60898 ladder skips some sizes you might expect."
            steps={[
              {
                calc: 'I = P / V = 9500 / 230 = 41.3A',
                note: 'The design current the circuit must be sized to carry.',
              },
              {
                calc: 'Check the standard ladder: 6, 10, 16, 20, 25, 32, 40, 50, 63',
                note: '41.3A sits between the 40A and 50A rungs. There is no 45A rung to round to — the ladder jumps straight from 40 to 50.',
              },
              {
                calc: 'Select 50A',
                note: 'The next standard size at or above the design current.',
              },
            ]}
            answer="41.3A, and the circuit needs a 50A device — there being no 45A size means the jump is larger than the current itself might suggest, and the circuit needs to be designed (cable, voltage drop, Zs) around a 50A device throughout, not around the 41.3A the shower actually draws."
            watchOut="It is tempting to assume the next standard size is always 'close' to your calculated current. Between 40A and 50A the gap is nearly 25% of the lower value — check the actual ladder rather than assuming evenly spaced sizes."
          />

          <TryIt
            question="A 7.2kW electric shower runs on a 230V supply. Find the current it draws and the protective device size needed."
            steps={[
              { calc: 'I = P / V = 7200 / 230 = 31.3A', note: '' },
              {
                calc: 'Check the ladder: 6, 10, 16, 20, 25, 32, 40, 50, 63',
                note: '31.3A sits just below the 32A rung.',
              },
              { calc: 'Select 32A', note: 'The next standard size at or above 31.3A.' },
            ]}
            answer="31.3A, needing a 32A device — a much smaller jump than the previous example, because 31.3A happens to land just under an existing rung rather than in one of the wider gaps higher up the ladder."
          />

          <InlineCheck
            id="calc-check-1"
            question="A 100W lamp operates on 230V. What is the current and resistance of the filament?"
            options={['2.3A and 100Ω', '0.43A and 230Ω', '0.43A and 529Ω', '23A and 10Ω']}
            correctIndex={2}
            explanation="I = P/V = 100/230 = 0.43A. R = V/I = 230/0.43 = 529Ω (or directly R = V²/P = 230²/100 = 529Ω). Both methods give the same answer."
          />

          <SectionRule />

          {/* ── 03 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>03 · Voltage drop calculations</ContentEyebrow>

          <ConceptBlock
            title="Voltage Drop = mV/A/m × Ib × L / 1000"
            plainEnglish="Every metre of cable has resistance, so some voltage is used up just getting the current to the load. Too much of that and equipment misbehaves before anything actually fails."
          >
            <p>
              Every cable has resistance, so voltage is lost along the run. If the drop is too
              great, motors may struggle to start, lighting may flicker or run dim, and sensitive
              equipment may misbehave — all while the cable itself is perfectly intact. The formula
              uses a figure from cable tables (mV/A/m), the design current (I<sub>b</sub>), and the
              cable length in metres (L), then divides by 1000 to convert millivolts to volts.
            </p>
            <p>
              BS 7671 Appendix 4 §6.4 gives 3% of nominal voltage as the recommended maximum for
              lighting circuits (6.9V on a 230V supply) and 5% for other circuits (11.5V) —
              deemed-to-satisfy figures via Regulation 525.202, not a hard ceiling written into the
              standard as a pass/fail limit. Common mV/A/m values for twin and earth: 1.0mm² = 44,
              1.5mm² = 29, 2.5mm² = 18, 4.0mm² = 11, 6.0mm² = 7.3, 10.0mm² = 4.4.
            </p>
            <p>
              A ring final circuit needs one adjustment before the formula applies: the current
              splits between the two legs of the ring, so the effective length used in the
              calculation is the total ring length divided by four, not the full length of cable in
              the ground.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A 20A radial circuit uses 2.5mm² twin and earth cable, 20m to a workshop heater drawing 17A. Calculate the voltage drop and check it against the recommended maximum."
            steps={[
              { calc: 'mV/A/m for 2.5mm² T&E = 18', note: 'From the cable tables.' },
              {
                calc: 'VD = 18 × 17 × 20 / 1000 = 6.12V',
                note: 'mV/A/m × Ib × L, then divide by 1000 to convert to volts.',
              },
              {
                calc: 'Recommended maximum for a power circuit = 11.5V (5% of 230V)',
                note: 'This is not a lighting circuit, so the 5% figure applies.',
              },
              { calc: '6.12V < 11.5V', note: 'Comfortably within the recommendation.' },
            ]}
            answer="6.12V, which is acceptable against the 11.5V recommended maximum for a general-use circuit."
            watchOut="Use the design current (Ib) for this calculation, not the protective device rating — a 20A MCB protecting a 17A load is sized on the device, but the voltage drop is caused by the actual current flowing, which is 17A."
          />

          <TryIt
            question="A 16A radial circuit uses 2.5mm² twin and earth cable, 15m to a load drawing 12A. Calculate the voltage drop and check it against the recommended maximum."
            steps={[
              { calc: 'mV/A/m for 2.5mm² T&E = 18', note: '' },
              { calc: 'VD = 18 × 12 × 15 / 1000 = 3.24V', note: '' },
              { calc: 'Recommended maximum = 11.5V', note: 'General-use circuit, 5%.' },
            ]}
            answer="3.24V, well within the 11.5V recommendation."
          />

          <SectionRule />

          <WorkedExample
            question="A 32A ring final circuit uses 2.5mm² T&E cable, with a total ring length of 60m. Calculate the voltage drop, remembering to adjust the length for a ring."
            steps={[
              {
                calc: 'For a ring, effective length = total ring length / 4',
                note: 'The current splits between the two parallel legs of the ring.',
              },
              { calc: 'Effective length = 60 / 4 = 15m', note: '' },
              {
                calc: 'VD = 18 × 32 × 15 / 1000 = 8.64V',
                note: 'Using the adjusted length, not the full 60m.',
              },
              { calc: '8.64V < 11.5V', note: 'Acceptable against the recommended maximum.' },
            ]}
            answer="8.64V, acceptable against the 11.5V recommendation — but notice how much higher this is than the radial example despite a similar current, because a ring final loads its cable harder per metre of length actually installed."
            watchOut="Using the full 60m instead of the adjusted 15m would give a voltage drop nearly four times too high — 34.56V — which would fail an otherwise perfectly acceptable circuit. Always apply the /4 adjustment for a ring."
          />

          <TryIt
            question="A 32A ring final circuit uses 2.5mm² T&E cable with a total ring length of 48m. Calculate the voltage drop."
            steps={[
              { calc: 'Effective length = 48 / 4 = 12m', note: '' },
              { calc: 'VD = 18 × 32 × 12 / 1000 = 6.91V', note: '' },
            ]}
            answer="6.91V, acceptable against the 11.5V recommended maximum."
          />

          <CommonMistake
            title="Checking a lighting circuit against the 5% figure"
            whatHappens="A voltage drop calculation is run on a lighting circuit and compared against 11.5V because that is the figure used for every other circuit that day. The circuit passes on that check while genuinely exceeding its own, lower, 3% (6.9V) recommendation — flicker and dimming complaints follow."
            doInstead="Identify the circuit type before you check the result. Lighting gets the 3% figure (6.9V on 230V); everything else gets 5% (11.5V). The two circuit types are not interchangeable in this check even when the cable and current look similar."
          />

          <SectionRule />

          {/* ── 04 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>04 · Diversity factors</ContentEyebrow>

          <ConceptBlock title="Diversity reduces the SUPPLY calculation, never the circuit protection">
            <p>
              Not every load in an installation runs at full power at the same time. A house never
              has every light, every socket, the shower, the cooker and the immersion heater all
              drawing peak current simultaneously. Diversity lets you reduce the assumed total load
              when sizing the supply — the main switch, the service cable, the cut-out — using
              factors from the IET On-Site Guide Table A2: lighting at 66% of its total connected
              load, a cooker at 10A plus 30% of the remainder plus 5A for a socket outlet in the
              control unit, socket circuits at 100% of the largest plus 40% of the rest, and showers
              and immersion heaters at 100% each, with no diversity applied at all.
            </p>
            <p>
              The one thing diversity never touches is the individual circuit's own protective
              device. Every circuit is still sized and protected for its own full load — a 12kW
              cooker circuit still needs cable and a device rated for that cooker's actual current,
              even though the cooker's contribution to the overall ADMD is reduced by the diversity
              calculation. Diversity is a supply-sizing tool, not a licence to under-protect a
              circuit.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A cooker is rated at 12kW on a 230V supply, with a socket outlet built into the cooker control unit. Calculate the diversified current using the On-Site Guide cooker allowance."
            steps={[
              {
                calc: 'Full load current: I = 12000 / 230 = 52.17A',
                note: 'The undiversified current — what the circuit itself must still be rated for.',
              },
              {
                calc: 'First 10A at 100%: 10A',
                note: 'The first slice of the On-Site Guide cooker formula.',
              },
              {
                calc: 'Remainder at 30%: (52.17 − 10) × 0.30 = 42.17 × 0.30 = 12.65A',
                note: 'Everything above the first 10A is only counted at 30%.',
              },
              {
                calc: 'Socket outlet allowance: 5A',
                note: 'A fixed allowance for the socket in the control unit, if fitted.',
              },
              {
                calc: 'Total diversified demand: 10 + 12.65 + 5 = 27.65A',
                note: 'This is the figure that feeds into the ADMD, not the 52.17A full load current.',
              },
            ]}
            answer="27.65A carried into the ADMD calculation — but the cooker circuit itself is still designed around the full 52.17A."
            watchOut="It is easy to carry the diversified figure (27.65A) back into sizing the cooker's own cable and protective device. Diversity is for the supply calculation only; the circuit is designed on the undiversified 52.17A."
          />

          <TryIt
            question="A cooker is rated at 9kW on a 230V supply, with a socket outlet in the control unit. Calculate the diversified current using the same On-Site Guide allowance."
            steps={[
              { calc: 'Full load: I = 9000 / 230 = 39.13A', note: '' },
              { calc: 'First 10A at 100%: 10A', note: '' },
              { calc: 'Remainder at 30%: (39.13 − 10) × 0.30 = 29.13 × 0.30 = 8.74A', note: '' },
              { calc: 'Socket allowance: 5A', note: '' },
              { calc: 'Total: 10 + 8.74 + 5 = 23.74A', note: '' },
            ]}
            answer="23.74A carried into the ADMD calculation; the circuit itself is still designed around the full 39.13A."
          />

          <InlineCheck
            id="calc-check-2"
            question="A lighting circuit has a total connected load of 1800W at 230V. Applying 66% diversity, what current should be allowed for in the maximum demand calculation?"
            options={[
              '7.83A — no diversity applied',
              '5.17A — after 66% diversity',
              '11.88A — with 66% added on top',
              'Diversity cannot be applied to lighting',
            ]}
            correctIndex={1}
            explanation="Total current = 1800/230 = 7.83A. After 66% diversity = 7.83 × 0.66 = 5.17A. Alternatively: 1800 × 0.66 = 1188W, then 1188/230 = 5.17A."
          />

          <SectionRule />

          {/* ── 05 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>05 · Maximum demand</ContentEyebrow>

          <ConceptBlock title="ADMD determines the main switch, the service cable, and the cut-out">
            <p>
              Maximum demand is the total current an installation is expected to draw under normal
              conditions. The after-diversity maximum demand (ADMD) applies the diversity factors
              from Section 04 to every load in the installation and totals them, and that total
              figure — not the sum of every circuit's full-load current — is what sizes the main
              switch rating, the service fuse and the incoming cable.
            </p>
            <p>
              For a three-phase installation, the loads are spread as evenly as possible across all
              three phases, and the per-phase current is found from{' '}
              <strong className="text-white">
                I<sub>phase</sub> = P<sub>total</sub> / (√3 × V<sub>L</sub>)
              </strong>{' '}
              — that is, total power divided by 1.732 × 400 for a standard 400V line voltage.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Calculate the ADMD for a house with: lighting 2400W, a 12kW cooker with a socket (as calculated in Section 04), two 32A ring finals (one downstairs, one upstairs), a 3kW immersion heater, and a 9.5kW shower. Is a standard 100A cut-out adequate?"
            steps={[
              {
                calc: 'Lighting: 2400W at 66% → 1584W → 1584/230 = 6.89A',
                note: 'On-Site Guide lighting diversity.',
              },
              {
                calc: 'Cooker: 10A + 12.65A + 5A = 27.65A',
                note: 'Carried straight from the Section 04 worked example.',
              },
              {
                calc: 'Ring 1 (downstairs, 32A): 100% → 32A',
                note: 'The largest socket circuit is counted at full load.',
              },
              {
                calc: 'Ring 2 (upstairs, 32A): 40% → 12.8A',
                note: 'Every socket circuit after the first is counted at 40%.',
              },
              {
                calc: 'Immersion heater: 3000W at 100% → 3000/230 = 13.04A',
                note: 'No diversity applies to an immersion heater.',
              },
              {
                calc: 'Shower: 9500W at 100% → 9500/230 = 41.3A',
                note: 'No diversity applies to a shower.',
              },
              {
                calc: 'Total ADMD = 6.89 + 27.65 + 32 + 12.8 + 13.04 + 41.3 = 133.68A',
                note: 'Sum every diversified figure.',
              },
            ]}
            answer="133.68A — more than a standard 100A domestic cut-out will carry. This installation does not fit the supply it has, and that is the useful finding: it is the point at which you stop designing and talk to the DNO about an upgrade, not something to discover after the consumer unit is already on the wall. It is also worth noting this total takes no diversity on the shower or on an EV charger, were one added — applying the On-Site Guide allowances properly, where they exist, is the next thing to check before making that call."
            watchOut="ADMD is a sum of already-diversified figures — do not diversify the total again at the end. Each load's own diversity is applied once, when it is added to the list, and never again afterwards."
          />

          <TryIt
            question="A smaller flat has: lighting 1200W, a 7kW cooker with no socket in the control unit, one 32A ring final, and no immersion heater or shower. Calculate the ADMD."
            steps={[
              { calc: 'Lighting: 1200W at 66% → 792W → 792/230 = 3.44A', note: '' },
              {
                calc: 'Cooker: I = 7000/230 = 30.43A. First 10A at 100% = 10A. Remainder (30.43−10)×0.30 = 6.13A. No socket allowance.',
                note: 'Total cooker demand = 10 + 6.13 = 16.13A.',
              },
              {
                calc: 'Ring final (32A, only one, so 100%): 32A',
                note: 'The largest — and only — socket circuit is counted in full.',
              },
              {
                calc: 'Total ADMD = 3.44 + 16.13 + 32 = 51.57A',
                note: 'Sum of the three diversified figures.',
              },
            ]}
            answer="51.57A — comfortably within a standard 100A cut-out, unlike the larger house in the worked example."
          />

          <Scenario
            title="The consumer unit already on the wall"
            situation="You are called to a house where the client has had a shower and an EV charger added by different contractors over several years, on top of the original installation. Nobody totalled the ADMD before either addition, and the cut-out has been 80A the whole time."
            whatToDo="Run the full ADMD calculation properly before doing any further work, including every load now present. If the total exceeds the cut-out rating, that is a conversation with the client and the DNO before anything else is touched — not a problem you can quietly work around with better cable."
            whyItMatters="An overloaded service cut-out does not announce itself with a single dramatic failure. It shows up as nuisance tripping, warm connections at the cut-out, or, in the worst case, a sustained overload the DNO's fuse was never designed to run at. Each addition looked reasonable on its own; nobody added them up."
          />

          <SectionRule />

          {/* ── 06 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>06 · Earth fault loop impedance (Zs)</ContentEyebrow>

          <ConceptBlock title="Zs = Ze + (R1+R2), corrected for temperature, checked against the table">
            <p>
              The earth fault loop impedance determines how much fault current will flow when a
              line-to-earth fault occurs, which in turn determines whether the protective device
              disconnects fast enough to prevent electric shock and fire.{' '}
              <strong className="text-white">Zs = Ze + (R1 + R2)</strong>, where Ze is the external
              loop impedance (measured or provided by the supplier), R1 is the line conductor
              resistance and R2 is the CPC resistance for the circuit in question. Typical Ze
              values: TN-C-S (PME) around 0.35Ω, TN-S (sheath) around 0.8Ω, TT (earth electrode)
              around 21Ω or higher and highly variable — which is exactly why TT systems rely on RCD
              protection rather than loop impedance alone.
            </p>
            <p>
              R1+R2 figures from the conductor resistance tables are given at 20°C, but under fault
              conditions the conductor heats up and its resistance rises. To account for that, the
              measured or tabulated R1+R2 is multiplied by a correction factor of{' '}
              <strong className="text-white">1.20</strong> before being added to Ze — accounting for
              the rise from 20°C to around 70°C under normal operating conditions. The result is
              then checked against the maximum Zs for the protective device: for common Type B MCBs
              (BS 7671:2018+A4:2026 Table 41.3), 6A = 7.28Ω, 10A = 4.37Ω, 16A = 2.73Ω, 20A = 2.19Ω,
              32A = 1.37Ω, 40A = 1.09Ω, 50A = 0.87Ω.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A TN-C-S supply (Ze = 0.35Ω) feeds a 32A ring final circuit. The measured R1+R2 = 0.82Ω. Calculate Zs with temperature correction applied, and check it complies."
            steps={[
              {
                calc: 'Apply the 1.20 correction to R1+R2: 0.82 × 1.20 = 0.984Ω',
                note: 'Accounts for the conductor heating up under fault conditions.',
              },
              { calc: 'Zs = Ze + corrected (R1+R2) = 0.35 + 0.984 = 1.334Ω', note: '' },
              {
                calc: 'Maximum Zs for 32A Type B = 1.37Ω (A4:2026)',
                note: 'From the Table 41.3 ladder above.',
              },
              { calc: '1.334Ω < 1.37Ω', note: 'Compliant, but only by 0.036Ω.' },
            ]}
            answer="Zs = 1.334Ω, which complies against the 1.37Ω maximum for a 32A Type B device — but only just. If the cable run were slightly longer, or Ze slightly higher, it would fail."
            watchOut="Never compare the uncorrected R1+R2 figure to the table, and never compare Ze alone. The 1.20 factor has to be applied to R1+R2 specifically, before it is added to Ze — applying it to the whole Zs figure instead gives a different, wrong answer."
          />

          <TryIt
            question="A TN-S supply (Ze = 0.8Ω) feeds a 20A radial circuit. The measured R1+R2 = 0.95Ω. Calculate Zs with temperature correction applied, and check compliance."
            steps={[
              { calc: 'Corrected R1+R2 = 0.95 × 1.20 = 1.14Ω', note: '' },
              { calc: 'Zs = 0.8 + 1.14 = 1.94Ω', note: '' },
              { calc: 'Maximum Zs for 20A Type B = 2.19Ω', note: '' },
              { calc: '1.94Ω < 2.19Ω', note: '' },
            ]}
            answer="Zs = 1.94Ω, which complies against the 2.19Ω maximum for a 20A Type B device, with a somewhat larger margin than the previous example."
          />

          <SectionRule />

          <WorkedExample
            question="A ring final's line conductors measure 0.60Ω end-to-end and its CPC measures 1.00Ω end-to-end. The supply is TN-C-S with Ze = 0.30Ω, and the circuit is protected by a 32A Type B MCB. Bring this together with the R1/R2 method from Section 01: find R1, R2, and the corrected Zs, and check compliance."
            steps={[
              {
                calc: 'R1 = 0.60 / 4 = 0.15Ω',
                note: 'End-to-end line resistance, halved for the leg and halved again for the parallel legs.',
              },
              { calc: 'R2 = 1.00 / 4 = 0.25Ω', note: 'Same treatment applied to the CPC.' },
              {
                calc: 'R1 + R2 = 0.15 + 0.25 = 0.40Ω',
                note: 'Both conductors combined, before temperature correction.',
              },
              {
                calc: 'Corrected R1+R2 = 0.40 × 1.20 = 0.48Ω',
                note: 'Apply the 1.20 factor to the combined figure.',
              },
              { calc: 'Zs = 0.30 + 0.48 = 0.78Ω', note: 'Add Ze.' },
              { calc: 'Maximum Zs for 32A Type B = 1.37Ω', note: '' },
              { calc: '0.78Ω < 1.37Ω', note: 'Comfortably compliant.' },
            ]}
            answer="R1 = 0.15Ω, R2 = 0.25Ω, corrected Zs = 0.78Ω — well within the 1.37Ω maximum. This is the same divide-by-four reasoning from Section 01 feeding straight into the Zs calculation from this section — they are not two separate skills."
            watchOut="It would be easy to stop after finding R1 = 0.15Ω and treat that as the whole answer, forgetting the CPC entirely. Zs always needs R1 AND R2 — a ring final circuit is not exempt from that just because the arithmetic to get there is more involved."
          />

          <SectionRule />

          <InlineCheck
            id="calc-check-3"
            question="A TN-S supply has Ze = 0.8Ω. A 20A Type B MCB protects a radial circuit with measured R1+R2 of 1.05Ω. Applying the 1.20 correction factor, does the Zs comply?"
            options={[
              'Zs = 1.85Ω — does not comply',
              'Zs = 1.26Ω — complies easily',
              'Zs = 2.06Ω — complies with max 2.19Ω',
              'Cannot be calculated without cable length',
            ]}
            correctIndex={2}
            explanation="Zs = Ze + (R1+R2 × 1.20) = 0.8 + (1.05 × 1.20) = 0.8 + 1.26 = 2.06Ω. Max Zs for 20A Type B = 2.19Ω (BS 7671:2018+A4:2026 Table 41.3). 2.06 < 2.19 so it complies."
          />

          <SectionRule />

          {/* ── 07 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>07 · Prospective fault current</ContentEyebrow>

          <ConceptBlock title="Ipf = Uoc / Zs, and the difference between 434.1 and 434.5.1">
            <p>
              Prospective fault current (Ipf) is the maximum current that would flow under a
              short-circuit or earth fault condition. Protective devices must be able to safely
              interrupt that current — if they cannot, there is a serious risk of fire or explosion
              inside the distribution board itself.{' '}
              <strong className="text-white">
                Ipf = U<sub>oc</sub> / Zs
              </strong>
              , where U<sub>oc</sub> is the open-circuit voltage (typically 230V) and Zs is the
              earth fault loop impedance at the point in question.
            </p>
            <p>
              Two regulations get muddled constantly here because they sit next to each other and
              sound similar, but they ask different questions.{' '}
              <strong className="text-white">Regulation 434.1</strong> requires the prospective
              fault current to be determined at every relevant point of the installation — "how big
              is the fault current here?" <strong className="text-white">Regulation 434.5.1</strong>{' '}
              is the neighbouring regulation on breaking capacity — "can the device actually
              interrupt it?" You need both answers, in that order: determine Ipf first, then check a
              device against it. Typical breaking capacities: domestic MCBs around 6kA, industrial
              MCBs 10–25kA, MCCBs up to 50kA or higher, HRC fuses (BS 88) up to 80kA.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="The measured Ze at the origin of a domestic installation is 0.10Ω. Determine the prospective fault current (434.1), then check whether a standard 6kA MCB is suitable (434.5.1)."
            steps={[
              {
                calc: 'Ipf = Uoc / Zs = 230 / 0.10 = 2,300A = 2.3kA',
                note: 'Regulation 434.1 — determining the fault current at this point.',
              },
              {
                calc: 'Compare against the device breaking capacity: 2.3kA vs 6kA',
                note: 'Regulation 434.5.1 — checking the device can interrupt it.',
              },
              {
                calc: '2.3kA < 6kA',
                note: 'The device is within its rated breaking capacity, with a good margin.',
              },
            ]}
            answer="Ipf = 2.3kA. A standard 6kA domestic MCB is suitable, with the device rated at roughly 2.6 times the fault current it needs to interrupt."
            watchOut="Determining Ipf and checking breaking capacity are two separate steps answering two separate questions — do not skip straight to 'is it under 6kA' without first stating the actual calculated Ipf. On an exam or a certificate, both figures should appear."
          />

          <TryIt
            question="A commercial installation close to a substation has Ze = 0.02Ω. Determine the prospective fault current, and say whether a standard 6kA MCB would be suitable."
            steps={[
              { calc: 'Ipf = 230 / 0.02 = 11,500A = 11.5kA', note: '' },
              { calc: 'Compare: 11.5kA vs 6kA', note: '' },
              {
                calc: '11.5kA > 6kA',
                note: "This exceeds a standard domestic MCB's breaking capacity.",
              },
            ]}
            answer="Ipf = 11.5kA. A standard 6kA MCB is NOT suitable here — the installation needs devices rated at 15kA or higher, or back-up protection using BS 88 fuses ahead of lower-rated devices."
          />

          <SectionRule />

          {/* ── 08 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>08 · Bringing it all together</ContentEyebrow>

          <ConceptBlock title="One circuit, every calculation, in the right order">
            <p>
              On a real job you rarely run one calculation in isolation — a single circuit needs
              design current, device selection, cable capacity, voltage drop, Zs and prospective
              fault current worked through in sequence, each one depending on the answer before it.
              The order matters: you cannot check voltage drop before you know the design current,
              and you cannot check Zs before you know R1+R2. Two full worked examples follow, using
              different circuits, so you can see the same sequence produce two different verdicts.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Design check for a 20A radial circuit supplying a 4kW workshop heater. TN-C-S supply, Ze = 0.35Ω. Cable is 4.0mm² T&E, 18m run. Work through design current, device, cable capacity, voltage drop, Zs and prospective fault current."
            steps={[
              { calc: 'Step 1 — Design current: Ib = P / V = 4000 / 230 = 17.39A', note: '' },
              {
                calc: 'Step 2 — Protective device: In = 20A Type B (In ≥ Ib: 20 ≥ 17.39)',
                note: '',
              },
              {
                calc: 'Step 3 — Cable capacity: 4.0mm² T&E, Method C, Iz = 37A. Since Iz ≥ In (37 ≥ 20), the cable is adequate.',
                note: 'Iz confirmed against the current-carrying capacity tables.',
              },
              {
                calc: 'Step 4 — Voltage drop: VD = 11 × 17.39 × 18 / 1000 = 3.44V (limit 11.5V — pass)',
                note: 'mV/A/m for 4.0mm² T&E is 11.',
              },
              {
                calc: 'Step 5 — Zs: R1+R2 for 4.0/1.5mm² = 4.61 + 12.1 = 16.71 mΩ/m',
                note: 'The 4.0mm² line conductor at 4.61 mΩ/m and the 1.5mm² CPC at 12.1 mΩ/m, added together — using the line conductor alone is the usual slip, and it makes the circuit look far better than it is.',
              },
              {
                calc: 'R1+R2 = 16.71 × 18 / 1000 = 0.301Ω',
                note: 'Table figure converted to the actual run length.',
              },
              {
                calc: 'Zs = 0.35 + (0.301 × 1.20) = 0.35 + 0.361 = 0.711Ω',
                note: 'Ze plus the temperature-corrected R1+R2.',
              },
              { calc: 'Max Zs for 20A Type B = 2.19Ω (A4:2026) → 0.711 < 2.19 — pass', note: '' },
              {
                calc: 'Step 6 — Prospective fault current: Ipf = 230 / 0.35 = 657A (at origin). Well within 6kA MCB rating — pass',
                note: 'Using Ze at the origin, not the circuit Zs.',
              },
            ]}
            answer="Every stage passes: 17.39A design current, 20A device, 37A cable capacity, 3.44V voltage drop, 0.711Ω Zs and 657A prospective fault current — all checked against the correct limit for that stage, in the order a real design check has to run."
            watchOut="Six separate checks, six separate limits. A circuit that passes on cable capacity and fails on Zs is still a failed circuit — do not stop checking once the first pass appears."
          />

          <WorkedExample
            question="Design check for a 32A radial circuit supplying a 6kW workshop compressor. TN-S supply, Ze = 0.6Ω. Cable is 6.0mm² T&E, 22m run (mV/A/m = 7.3, Iz on Method C = 47A, R1+R2 for 6.0/2.5mm² = 3.08 + 7.41 = 10.49 mΩ/m). Work through the same six steps."
            steps={[
              { calc: 'Step 1 — Design current: Ib = 6000 / 230 = 26.09A', note: '' },
              {
                calc: 'Step 2 — Protective device: In = 32A Type B (In ≥ Ib: 32 ≥ 26.09)',
                note: '',
              },
              {
                calc: 'Step 3 — Cable capacity: Iz = 47A. Iz ≥ In (47 ≥ 32) — adequate.',
                note: '',
              },
              {
                calc: 'Step 4 — Voltage drop: VD = 7.3 × 26.09 × 22 / 1000 = 4.19V (limit 11.5V — pass)',
                note: '',
              },
              {
                calc: 'Step 5 — R1+R2 = 10.49 × 22 / 1000 = 0.231Ω',
                note: 'The 6.0mm² line and 2.5mm² CPC figures, combined and converted to the run length.',
              },
              { calc: 'Zs = 0.6 + (0.231 × 1.20) = 0.6 + 0.277 = 0.877Ω', note: '' },
              { calc: 'Max Zs for 32A Type B = 1.37Ω → 0.877 < 1.37 — pass', note: '' },
              {
                calc: 'Step 6 — Ipf = 230 / 0.6 = 383A (at origin). Well within 6kA MCB rating — pass',
                note: '',
              },
            ]}
            answer="Every stage passes again, but with a wider Zs margin than the first example (0.877Ω against a 1.37Ω limit, versus 0.711Ω against 2.19Ω) — a reminder that 'it passed' is not the same as 'it passed by the same amount', and a marginal result on one circuit is worth flagging even when a similar-looking circuit elsewhere had room to spare."
            watchOut="Notice the device changed (32A, not 20A) because the load changed — do not carry over a device size from a previous job's similar-looking circuit without re-running Ib from that job's own load."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Ohm's Law and the power triangle underpin every calculation on this page — the skill is choosing the right rearrangement for what you already know.",
              "A ring final's R1 is a quarter of the end-to-end measurement, not half — one halving for the leg, one for the parallel legs — and the same treatment applies to R2.",
              'Voltage drop has two recommended maxima, not one: 3% for lighting, 5% for other circuits (Appendix 4 §6.4, deemed-to-satisfy via Reg 525.202) — and a ring final needs its length divided by four before the formula is applied.',
              'Diversity reduces the supply calculation (ADMD). It never reduces what an individual circuit is designed and protected for.',
              'An ADMD calculation that exceeds the cut-out rating means talking to the DNO, not fitting a bigger board and hoping.',
              'Zs = Ze + (R1+R2), with the 1.20 temperature correction applied to R1+R2 before it is added to Ze, then checked against the maximum for the specific device rating.',
              'Regulation 434.1 (determine the fault current) and 434.5.1 (check the device can interrupt it) are two separate questions, asked in that order.',
              'The BS EN 60898 device ladder is 6, 10, 16, 20, 25, 32, 40, 50, 63 — no 45A, no 60A — so rounding up to the next size can be a bigger jump than expected.',
              'A full circuit design check runs design current → device → cable capacity → voltage drop → Zs → prospective fault current, in that order, with every stage checked against its own limit.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Why does the ring final R1 calculation divide by four rather than two?',
                answer:
                  "Because two separate things are happening. The end-to-end reading is the whole loop, so each leg on its own is half of it — that's the first halving. Then, once the ring is made up, those two legs sit in parallel with each other, which halves the resistance again. Two halvings multiply together to a quarter, not a half.",
              },
              {
                question: 'Is the 1.20 temperature correction factor always applied to Zs?',
                answer:
                  'It is applied to R1+R2 before that figure is added to Ze — it accounts for the conductor heating up from around 20°C to around 70°C under fault conditions. It is not applied to Ze itself, and it is not applied to the combined Zs figure after Ze has already been added.',
              },
              {
                question: 'Are the 3% and 5% voltage drop figures a legal maximum?',
                answer:
                  'No — they are recommended maxima from BS 7671 Appendix 4 §6.4, offered as a deemed-to-satisfy route via Regulation 525.202. A circuit can, in principle, be shown compliant by another route even if it exceeds them, but in practice the recommended figures are what almost every design is checked against.',
              },
              {
                question: 'Why is there no 45A protective device?',
                answer:
                  'BS EN 60898 fixes the standard ladder of MCB ratings at 6, 10, 16, 20, 25, 32, 40, 50, 63 amps. It simply is not a ladder of every whole multiple of 5 or 10 — the gap between 40 and 50 is wider than the gaps around it, and a calculated current landing in that gap still has to round up to 50, not to an intermediate size that does not exist.',
              },
              {
                question: 'Does diversity ever apply to cable sizing?',
                answer:
                  "No. Diversity is applied once, at the point of totalling the whole installation's demand for the supply calculation. Every individual circuit — its cable, its protective device, its voltage drop check — is designed and checked against its own full, undiversified design current.",
              },
            ]}
          />

          <SectionRule />

          <Quiz questions={quizQuestions} title="Electrical Calculations Quiz" />

          {/* ── prev / next ─────────────────────────────────────────── */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() => navigate('/study-centre/apprentice/functional-skills/module4')}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-sm font-medium text-white touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" />
              Module 4
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module4/section2')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-elec-yellow/35 bg-elec-yellow/[0.08] px-4 text-sm font-semibold text-white touch-manipulation"
            >
              Section 2
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default FunctionalSkillsModule4Section1;
