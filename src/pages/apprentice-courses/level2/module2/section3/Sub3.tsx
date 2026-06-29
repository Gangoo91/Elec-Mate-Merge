/**
 * Module 2 · Section 3 · Subsection 3 — Resistance and resistivity (AC 4.3)
 * City & Guilds 2365-02 → Unit 202 → LO4 part 1.
 * Polish phase: relocated from old section5/Sub3, rewritten in apprentice voice.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import ResistanceCalculator from '@/components/apprentice-courses/ResistanceCalculator';
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
import { ResistorSymbol } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';
import { videos } from '@/data/study-centre/video-library';

const TITLE =
  'Resistance and resistivity (R = ρL/A) | Level 2 Module 2.3.3 (AC 4.3) | Elec-Mate';
const DESCRIPTION =
  'How length, cross-sectional area, material and temperature change conductor resistance. Worked examples in the units electricians actually use.';

const checks = [
  {
    id: 'rho-symbol-check',
    question: 'Which Greek letter is the symbol for resistivity?',
    options: [
      'σ (sigma)',
      'Ω (omega)',
      'ρ (rho)',
      'α (alpha)',
    ],
    correctIndex: 2,
    explanation:
      "Resistivity is rho (ρ). Sigma is conductivity (the inverse of ρ). Omega is the unit of resistance. Alpha is the temperature coefficient.",
  },
  {
    id: 'length-doubles-check',
    question:
      'You double the length of a conductor (same metal, same CSA, same temperature). What happens to its resistance?',
    options: [
      'Stays the same',
      'Halves',
      'Quadruples',
      'Doubles',
    ],
    correctIndex: 3,
    explanation:
      "R is directly proportional to L. Twice the length = twice the obstacles for the drifting electrons = twice the resistance. Picture two equal resistors in series.",
  },
  {
    id: 'csa-doubles-check',
    question: 'You double the CSA (same metal, same length, same temperature). Resistance:',
    options: [
      'Halves',
      'Quadruples',
      'Doubles',
      'Stays the same',
    ],
    correctIndex: 0,
    explanation:
      "R is inversely proportional to area. Twice the CSA gives the electrons twice the parallel path width = half the resistance. Like two equal resistors in parallel.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'The formula for the resistance of a uniform conductor is:',
    options: [
      'R = V/I',
      'R = ρL/A',
      'R = I²t',
      'R = mV/A/m',
    ],
    correctAnswer: 1,
    explanation:
      "R = ρL/A. Resistivity times length, divided by cross-sectional area. V/I is Ohm's law (true but separate). The mV/A/m formula is for voltage drop.",
  },
  {
    id: 2,
    question: 'The SI unit of resistivity is:',
    options: [
      'S/m',
      'Ω',
      'Ω·m',
      'Ω/m',
    ],
    correctAnswer: 2,
    explanation:
      "Ohm-metre (Ω·m). The units fall out of R = ρL/A: Ω = (Ω·m × m) / m² = Ω. We often quote in nano-ohm-metres (nΩ·m) because the values are tiny.",
  },
  {
    id: 3,
    question: 'Approximate resistivity of copper at 20°C:',
    options: [
      '172 nΩ·m',
      '1.72 nΩ·m',
      '1.72 mΩ·m',
      '17.2 nΩ·m',
    ],
    correctAnswer: 3,
    explanation:
      "Copper ρ ≈ 17.2 nΩ·m at 20°C. Aluminium is around 28.2 nΩ·m. These are the two values worth remembering — most exam questions hand you these as a constant anyway.",
  },
  {
    id: 4,
    question: 'A 30 m run of 2.5 mm² copper at 20°C has approximately what resistance?',
    options: [
      '0.21 Ω',
      '0.021 Ω',
      '2.1 Ω',
      '21 Ω',
    ],
    correctAnswer: 0,
    explanation:
      "R = ρL/A = (17.2 × 10⁻⁹ × 30) / (2.5 × 10⁻⁶) ≈ 0.21 Ω. Or use the shortcut R ≈ 0.0172 × L ÷ A for copper in metres and mm² → 0.0172 × 30 ÷ 2.5 = 0.206 Ω.",
  },
  {
    id: 5,
    question: 'For most metallic conductors, raising the temperature:',
    options: [
      'Decreases resistance',
      'Increases resistance',
      'Reverses the polarity',
      'Has no effect',
    ],
    correctAnswer: 1,
    explanation:
      "Metals have a positive temperature coefficient. Hotter atoms vibrate more, so the free electrons get knocked about more on their way through — that's higher resistance.",
  },
  {
    id: 6,
    question: 'The temperature coefficient of resistance (α) is used in which formula?',
    options: [
      'R_T = R_20 × [1 + α(T − 20)]',
      'R = ρL/A',
      'V = I × R',
      'P = I² × R',
    ],
    correctAnswer: 0,
    explanation:
      "R_T = R_20 × [1 + α(T − 20)] — corrects a 20°C value to the actual operating temperature. For copper α ≈ 0.004 /°C; for aluminium ≈ 0.0039.",
  },
  {
    id: 7,
    question:
      'A loose terminal in a junction box — what changes about the local resistance?',
    options: [
      'Falls to almost zero, so no heat is produced',
      'Stays the same as the rest of the conductor',
      'Rises slightly but is shared evenly along the cable',
      'Rises significantly, causing local heating (I²R)',
    ],
    correctAnswer: 3,
    explanation:
      "A loose joint has high contact resistance. The same current squared times that local R = a lot of heat in one tiny spot. Burns the insulation, melts the terminal — start of an electrical fire.",
  },
  {
    id: 8,
    question: 'Which BS 7671 appendix gives conductor resistance and voltage drop data?',
    options: [
      'Appendix 4',
      'Appendix 7',
      'Appendix 1',
      'Appendix 3',
    ],
    correctAnswer: 0,
    explanation:
      "Appendix 4 covers current-carrying capacity and voltage drop. Includes mV/A/m tables (voltage drop) and the resistance figures for cables at their rated operating temperatures.",
  },
];

const faqs = [
  {
    question: "Do I have to memorise ρ for copper and aluminium?",
    answer:
      "Worth knowing the rough numbers (17.2 nΩ·m for copper, 28.2 for aluminium), but most exam questions and on-site calculations use the shortcut: copper R ≈ 0.0172 × L ÷ A, aluminium R ≈ 0.0282 × L ÷ A, with L in metres and A in mm². Plug those into your phone calculator and you're done.",
  },
  {
    question: "Why do we use mV/A/m tables instead of R = ρL/A in BS 7671?",
    answer:
      "Two reasons. First, the tables already include the cable's operating temperature and the loop length (out and back). Second, they account for the cable's reactance at AC frequencies, not just its DC resistance. R = ρL/A is the underlying physics; mV/A/m is the engineered shortcut you'll actually use for design.",
  },
  {
    question: "What does the temperature coefficient actually do?",
    answer:
      "It tells you how much R changes per degree of temperature change. For copper, α ≈ 0.004 /°C — so a 50°C rise multiplies the resistance by [1 + 0.004 × 50] = 1.20 — a 20% increase. That's why a fully loaded cable carrying current at 70°C has noticeably more resistance than the same cable cold.",
  },
  {
    question: "Does insulation have resistivity too?",
    answer:
      "Yes — and it's huge. PVC sits around 10¹⁵ Ω·m, copper around 10⁻⁸ Ω·m. Twenty-three orders of magnitude different. That's why one wraps the other.",
  },
  {
    question: "Are there materials with NEGATIVE temperature coefficient?",
    answer:
      "Yes — most non-metals (carbon, semiconductors, electrolytes) have α < 0; their resistance falls as they heat up. Thermistors come in NTC (negative) and PTC (positive) flavours and you'll meet them in LO6 — for now, just remember metals are positive.",
  },
];

export default function Sub3() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3 · Subsection 3"
            title="Resistance and resistivity"
            description="What decides how much a conductor resists current — material, length, cross-sectional area and temperature. The formula R = ρL/A and how to actually use it on site."
            tone="emerald"
          />

          <TLDR
            points={[
              "R = ρL/A. Resistivity (material) times length, divided by cross-sectional area.",
              "Long thin cable in a hot loft has the highest resistance you'll see on a domestic install. Short fat cable run cool has the lowest.",
              "For metals, resistance also rises with temperature — about 0.4% per °C for copper. That's why fully loaded cables behave differently to cold ones.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the formula R = ρL/A and the units of each term.",
              "Calculate the resistance of a copper or aluminium conductor for a typical cable run.",
              "Explain how length, CSA, material and temperature each affect resistance.",
              "Apply the temperature correction R_T = R_20 × [1 + α(T − 20)].",
              "Recognise high-resistance joints and explain why they overheat.",
              "Reference BS 7671 Appendix 4 for the cable resistance and voltage drop data.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The formula and what it means</ContentEyebrow>

          <ConceptBlock
            title="R = ρL/A — four letters that explain every cable on site"
            plainEnglish="Imagine resistance as traffic on a road. Long road = more delay (longer L). Wider road = more cars through at once (bigger A). Smooth tarmac vs gravel = the material (ρ)."
            onSite="When the foreman says 'upsize the sub-main, voltage drop's killing it', he's quietly using R = ρL/A. Bigger A drops the resistance. Lower R = lower voltage drop = more volts at the load."
          >
            <p>The four ingredients:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>R</strong> — resistance, in <strong>ohms (Ω)</strong>. The bit you measure
                with a low-ohms meter or work out for design.
              </li>
              <li>
                <strong>ρ (rho)</strong> — resistivity, in <strong>ohm-metres (Ω·m)</strong>. A
                property of the material itself. Copper ≈ 17.2 nΩ·m at 20°C; aluminium ≈ 28.2
                nΩ·m. Tiny numbers — that's the scale of how easily metals conduct.
              </li>
              <li>
                <strong>L</strong> — length of the conductor in <strong>metres</strong>. For
                voltage drop you use the loop length (out and back). For raw resistance, just the
                length of the conductor itself.
              </li>
              <li>
                <strong>A</strong> — cross-sectional area in <strong>square metres (m²)</strong>{' '}
                in the formal SI version. On site you'll see it in <strong>mm²</strong> — that's
                what the cable's marked with (1.5, 2.5, 4.0, etc.). Convert: 2.5 mm² = 2.5 × 10⁻⁶
                m².
              </li>
            </ul>
          </ConceptBlock>

          <div className="flex items-center gap-3 py-2">
            <ResistorSymbol label="Resistor (BS EN 60617)" />
            <p className="text-[13px] text-white/80">
              The standard schematic symbol for a resistor — just a rectangle with two leads. Same
              symbol whether it's a discrete component or the resistance of a cable.
            </p>
          </div>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Appendix 4 (Current-carrying capacity and voltage drop)"
            clause="Tabulated values in Appendix 4 give the resistance and voltage drop per ampere per metre for copper and aluminium conductors at the maximum permitted operating temperature stated in Table 52.1."
            meaning={
              <>
                Appendix 4 is where you go for actual numbers in design. The tables already account
                for: the conductor metal, the CSA, whether the cable is single-phase or three-phase,
                and the operating temperature. <strong>You don't need to use ρ directly</strong>{' '}
                in everyday design — but knowing R = ρL/A is what tells you why the table values
                change the way they do.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Appendix 4."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>How each ingredient changes the answer</ContentEyebrow>

          <ConceptBlock
            title="Length — directly proportional"
            plainEnglish="Twice as long, twice the resistance. Three times as long, three times the resistance."
          >
            <p>
              Every metre of conductor is more atoms for the drifting electrons to bump into. The
              maths is linear: R goes up in lockstep with L. A 60 m run of 2.5 mm² copper has
              exactly twice the resistance of a 30 m run of the same cable.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="CSA — inversely proportional"
            plainEnglish="Twice the area, half the resistance. Treat doubling the CSA as opening up two parallel paths for the electrons."
            onSite="When voltage drop is too high, the practical fix is almost always: upsize the cable. You can shorten the run if the route allows; you can rarely change ρ (you're stuck with copper or aluminium) and you can't lower the load current."
          >
            <p>
              Doubling the cross-sectional area gives the free electrons twice the pipe to flow
              through. Same number of electrons, twice the room — half the resistance. Going up
              one CSA step (1.5 to 2.5, or 2.5 to 4.0) drops the resistance noticeably; going up
              two steps drops it more.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Material (ρ) — fixed once you've picked the metal">
            <p>
              The resistivity is set by the material. Once you've picked copper or aluminium, ρ is
              fixed (at any given temperature). Aluminium's resistivity is about 1.6× copper's, so
              the same job in aluminium needs about 1.6× the CSA.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Temperature — small effect that matters when cables are hot"
            plainEnglish="A cable carrying current heats up; a hot cable has more resistance; more resistance means more voltage drop and more heat. It's a small loop, but it's why design uses operating-temperature numbers, not cold-cable ones."
          >
            <p>
              For metals, R rises with temperature. The formula:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>R_T = R_20 × [1 + α(T − 20)]</strong>
              </li>
              <li>
                For <strong>copper</strong>, α ≈ 0.004 /°C. A copper conductor at 70°C has about{' '}
                <strong>1 + 0.004 × 50 = 1.20</strong> — that's 20% more resistance than at 20°C.
              </li>
              <li>
                For <strong>aluminium</strong>, α ≈ 0.0039 /°C — very similar to copper.
              </li>
            </ul>
            <p>
              That's why BS 7671 Appendix 4 quotes mV/A/m at the operating temperature of the
              cable's insulation system — 70°C for PVC, 90°C for XLPE — not at 20°C. Designing
              with cold-cable numbers undersizes the conductor.
            </p>
          </ConceptBlock>

          <VideoCard
            url={videos.resistors.url}
            title={videos.resistors.title}
            channel={videos.resistors.channel}
            duration={videos.resistors.duration}
            topic="Resistors and resistance · Unit 202 AC 4.3"
            caption="The maths is the same whether you're talking about a 1 kΩ resistor or 30 m of 2.5 mm² T&E. The animation makes the 'four ingredients' click."
          />

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Worked example — a typical socket spur</ContentEyebrow>

          <ConceptBlock
            title="30 m of 2.5 mm² copper at 20°C"
            plainEnglish="One run, one cable, one number. This is the kind of calculation you'd do in your head once you've got the shortcut."
          >
            <p>
              Question: a single radial spur, 30 m of 2.5 mm² copper at 20°C. What's the
              resistance of one core?
            </p>
            <p>Two ways to get there:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>SI long-form</strong>: R = ρL/A = (17.2 × 10⁻⁹ × 30) / (2.5 × 10⁻⁶) ={' '}
                <strong>0.206 Ω</strong>.
              </li>
              <li>
                <strong>Site shortcut</strong>: R ≈ 0.0172 × L ÷ A = 0.0172 × 30 ÷ 2.5 ={' '}
                <strong>0.206 Ω</strong>. Same answer, no scientific notation.
              </li>
            </ul>
            <p>
              Now warm the cable up to its 70°C operating temperature: R_70 ≈ 0.206 × [1 + 0.004 ×
              50] = 0.206 × 1.20 = <strong>0.247 Ω</strong>. About 20% more — exactly what
              Appendix 4 builds in.
            </p>
            <p>
              And remember: for voltage drop you'd use the <strong>loop length</strong> (out and
              back) — so you'd double the L for that calculation. We'll do that properly in 3.4.
            </p>
          </ConceptBlock>

          <ResistanceCalculator />

          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>Where it bites you on site</ContentEyebrow>

          <CommonMistake
            title="Treating a loose terminal as 'just a bit of resistance'"
            whatHappens={
              <>
                A consumer-unit busbar terminal is hand-tight. Looks fine. But the contact
                resistance is, say, 0.05 Ω instead of effectively zero. With a 32 A load, the
                power dissipated at that one screw = I²R = 32² × 0.05 ={' '}
                <strong>51 W</strong> — half a kettle element, in a screw the size of a fingernail.
                Insulation cooks, terminal browns, eventually arcs.
              </>
            }
            doInstead={
              <>
                Torque every terminal to the manufacturer's spec. Use the right driver and the
                torque setting on the back of the consumer-unit door. Re-check at first periodic.
                A high-resistance joint isn't just a bit of voltage drop — it's a fire risk.
              </>
            }
          />

          <Scenario
            title="Voltage drop fail on a long workshop spur"
            situation={
              <>
                You've designed a 32 A radial circuit for a workshop bandsaw — 50 m run of 2.5 mm²
                T&E, clipped direct. The voltage drop on Appendix 4 figures is 9.0% at full load.
                The 5% limit for sockets is blown.
              </>
            }
            whatToDo={
              <>
                Look at R = ρL/A. You can't change ρ (still copper). The route's already as short
                as it can be (L is fixed). The load current isn't optional. The only knob left is{' '}
                <strong>A</strong> — upsize. Step up to 4 mm² and the resistance roughly halves;
                voltage drop drops to about 5.5%. Step up to 6 mm² and you're inside the limit
                comfortably.
              </>
            }
            whyItMatters={
              <>
                Every voltage drop fix on site comes down to R = ρL/A. Knowing the formula tells
                you which lever is available before you start guessing.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 526.1 (Connections)"
            clause="Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection. The selection of the means of connection shall take account of, as appropriate: the material of the conductor and its insulation; the conductor class, the number and shape of the wires forming the conductor; the cross-sectional area of the conductor; the number of conductors to be connected together; the temperature attained at the terminals in normal service; and the provision of adequate locking arrangements in situations subject to vibration or thermal cycling."
            meaning={
              <>
                Translation: a joint must stay tight, conductive and protected for the life of the
                install. A loose terminal that develops contact resistance breaches 526.1. That's
                why every screwed terminal gets a torque setting — and why crimps, push-fits and
                Wago connectors all have manufacturers' instructions you have to follow.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 526.1."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "R = ρL/A — every cable's resistance is set by material, length and cross-sectional area.",
              "Length is directly proportional. Doubling L doubles R.",
              "CSA is inversely proportional. Doubling A halves R. This is the lever you use to fix voltage drop.",
              "Copper ρ ≈ 17.2 nΩ·m at 20°C; aluminium ≈ 28.2. Aluminium needs ~1.6× the CSA for the same job.",
              "Metals have positive temperature coefficient. R_T = R_20 × [1 + α(T − 20)]; α ≈ 0.004/°C for copper.",
              "Loose terminals = high local resistance = I²R heating. Torque every connection per the manufacturer (BS 7671 §526).",
            ]}
          />

          <Quiz title="Resistance and resistivity knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section3/3-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.2 Conductors and insulators
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section3/3-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.4 Voltage drop
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
