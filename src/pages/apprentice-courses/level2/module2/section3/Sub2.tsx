/**
 * Module 2 · Section 3 · Subsection 2 — Conductors and insulators (AC 4.2)
 * City & Guilds 2365-02 → Unit 202 → LO4 part 1.
 * Polish phase: relocated from old section5/Sub1 + Sub2, rewritten in apprentice voice.
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
import { CableCrossSection, InsulationResistanceTest } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Conductors and insulators | Level 2 Module 2.3.2 (AC 4.2) | Elec-Mate';
const DESCRIPTION =
  'What conductors and insulators actually are, why we pick copper or aluminium for cores and PVC, XLPE or LSF for sheathing, and how to choose for the job.';

const checks = [
  {
    id: 'conductor-best-check',
    question: 'Which of these is the most common conductor in domestic UK cables?',
    options: [
      'Steel',
      'Aluminium',
      'Copper',
      'Carbon',
    ],
    correctIndex: 2,
    explanation:
      "Copper is the standard for domestic and most commercial cabling — low resistivity, easy to terminate, stable connections. Aluminium turns up on big feeders and overhead lines but you don't see it in T&E.",
  },
  {
    id: 'insulator-purpose-check',
    question: "Why does a cable need insulation around the conductor?",
    options: [
      'To stop current leaking out and to prevent shock',
      'A = cut-out, B = electricity meter',
      'Fibre with gradually changing refractive index across the core',
      'Stable modal power distribution after long fibre length',
    ],
    correctIndex: 0,
    explanation:
      "Insulation is the safety layer. It stops current leaking from the live core to anything (or anyone) else, and it stops one core touching another. Without it, every cable would be a fault waiting to happen.",
  },
  {
    id: 'pvc-temp-check',
    question: 'What is the maximum continuous operating temperature of standard PVC insulation?',
    options: [
      '70°C',
      '40°C',
      '90°C',
      '120°C',
    ],
    correctIndex: 0,
    explanation:
      "PVC tops out at 70°C continuous. XLPE goes to 90°C. Run a cable beyond its insulation rating and the insulation softens, embrittles, and eventually fails — that's a fire and shock risk.",
  },
  {
    id: 'aluminium-csa-check',
    question:
      'You need to replace a copper sub-main with aluminium for weight reasons. The original was 70 mm² copper. Roughly what aluminium CSA do you need to carry the same current?',
    options: [
      '300 mm²',
      '25 mm²',
      '50 mm²',
      '95 mm²',
    ],
    correctIndex: 3,
    explanation:
      'Aluminium has roughly 1.6× the resistivity of copper, so you need about 1.6× the CSA. 70 × 1.6 = 112 mm² — round up to the next standard size, 95 mm² or 120 mm² depending on the design. 50 mm² would undersize and overheat; 300 mm² is overkill and a waste of money.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A material is classed as a conductor because it:',
    options: [
      'Is shiny and metallic looking',
      'Has very low resistivity and lots of free electrons',
      'Has high resistance to current',
      'Is rated for high temperature',
    ],
    correctAnswer: 1,
    explanation:
      "Low resistivity = current passes easily. The reason is the sea of free electrons covered in 3.1. Looks have nothing to do with it — graphite is a non-metallic conductor; mercury is a liquid one.",
  },
  {
    id: 2,
    question: 'Which has the lower resistivity?',
    options: [
      'Steel',
      'Aluminium',
      'Copper',
      'Carbon',
    ],
    correctAnswer: 2,
    explanation:
      "Copper ρ ≈ 17.2 nΩ·m at 20°C. Aluminium ≈ 28.2 nΩ·m. So copper carries more current for the same CSA — that's why it's standard for domestic wiring.",
  },
  {
    id: 3,
    question: 'For the same current and run length, an aluminium conductor needs:',
    options: [
      'Roughly the same CSA as copper',
      'A smaller CSA than copper',
      'No conductor at all',
      'A larger CSA than copper',
    ],
    correctAnswer: 3,
    explanation:
      "Aluminium has higher resistivity, so to carry the same current safely you need more cross-sectional area — typically about 1.6× the copper CSA for the same job.",
  },
  {
    id: 4,
    question: 'Which insulating material is rated to 90°C continuous?',
    options: [
      'XLPE',
      'Rubber',
      'PVC',
      'Cotton',
    ],
    correctAnswer: 0,
    explanation:
      "XLPE (cross-linked polyethylene) handles 90°C — common on SWA and larger feeders. PVC is 70°C. The higher temp rating lets the cable carry more current without breakdown.",
  },
  {
    id: 5,
    question: "What's the main advantage of LSF/LSZH cable in escape routes?",
    options: [
      'Ensures switches and fuses interrupt the line conductor',
      'It produces less smoke and no halogen gases when burned',
      'An interconnection point in the horizontal pathway for flexibility',
      'Continuity, insulation resistance, and polarity',
    ],
    correctAnswer: 1,
    explanation:
      "Low Smoke Zero Halogen — the sheath chemistry is chosen so a cable fire produces minimal toxic smoke and no acidic halogen gas. Used in stairwells, hospitals, public buildings — anywhere you can't have people choking on fumes.",
  },
  {
    id: 6,
    question: 'A conductor is described as "extraneous-conductive-part". This means:',
    options: [
      'Selected the correct answer but your reasoning was flawed or based on a guess',
      'The total heat content per unit mass of dry air, typically kJ/kg dry air',
      'Conductive metalwork not part of the circuit, capable of introducing a potential',
      'Metal part of electrical equipment that can become live under fault',
    ],
    correctAnswer: 2,
    explanation:
      "Things like gas pipes, water pipes, structural steel — they're conductive but not in the circuit. They get bonded to the MET so they sit at the same potential as the earthing system in a fault.",
  },
  {
    id: 7,
    question: 'Damaged insulation on a fixed cable should be:',
    options: [
      'Immediate isolation and urgent investigation',
      'Cables run close to or parallel with live conductors',
      'To control motor speed and reduce energy consumption',
      'Reported and the cable replaced or properly repaired',
    ],
    correctAnswer: 3,
    explanation:
      "Tape is not a permanent repair on fixed wiring. Damaged insulation is a C2 (potentially dangerous) at best — replace the cable or follow the manufacturer's joint kit instructions.",
  },
  {
    id: 8,
    question: 'Which BS 7671 part covers selection and erection of equipment and wiring systems?',
    options: [
      'Part 5',
      'Part 4',
      'Part 1',
      'Part 2',
    ],
    correctAnswer: 0,
    explanation:
      "Part 5 (Sections 510 onwards) covers selection and erection — including how to choose conductors, insulation systems and wiring systems for the environment.",
  },
];

const faqs = [
  {
    question: "Why do we use copper instead of cheaper alternatives like steel?",
    answer:
      "Steel has roughly 6× the resistivity of copper and corrodes badly at terminations. Copper gives you low resistance for a sensible CSA, doesn't tarnish in a way that ruins the joint, and takes a crimp or screw terminal cleanly. The price tag is worth it.",
  },
  {
    question: "When would you actually see aluminium cable on site?",
    answer:
      "Big feeders, overhead distribution lines, sometimes the supply tails between the cut-out and meter. Anywhere weight matters — aluminium is about a third the weight of copper for the same conductance — and you've got space for the larger CSA. Domestic final circuits stay copper.",
  },
  {
    question: "What's the difference between PVC, XLPE and LSF?",
    answer:
      "PVC is the cheap, all-rounder insulator — 70°C rating, fine for most domestic. XLPE handles 90°C, used on SWA and larger cables where you want more current capacity. LSF/LSZH is a low-smoke variant for life-safety areas. All three are insulators; they just trade cost, temperature and fire performance.",
  },
  {
    question: "Are there any 'half-insulator, half-conductor' materials?",
    answer:
      "Yes — semiconductors like silicon. They sit between conductors and insulators and we control their behaviour with doping. You'll meet them properly when you cover diodes and transistors in LO6. For now, treat materials as either conductors or insulators.",
  },
  {
    question: "Does temperature really change the conductor that much?",
    answer:
      "It changes its resistance, yes — copper rises about 0.4% per °C. A cable running at 70°C has noticeably more resistance than the same cable at 20°C. That's why Appendix 4 has correction factors for ambient temperature, grouping and thermal insulation.",
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
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3 · Subsection 2"
            title="Conductors and insulators"
            description="Why we wrap a metal core in plastic and call it a cable. The material choices behind every install — conductor, insulator, and what to pick for which environment."
            tone="emerald"
          />

          <TLDR
            points={[
              "Conductors have low resistivity and lots of free electrons. Copper and aluminium are the two you'll meet on site — copper for nearly everything domestic, aluminium for big feeders.",
              "Insulators have high resistivity. PVC (70°C) is the workhorse; XLPE (90°C) goes on SWA and larger feeders; LSF/LSZH for life-safety areas.",
              "The conductor carries the current, the insulator stops it leaking out. Damaged insulation is a fault — never a tape repair on fixed wiring.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Define a conductor and an insulator in terms of free electrons and resistivity.",
              "List the common conductor materials used in BS 7671 cables and where each is used.",
              "List the common insulating materials and their continuous operating temperatures.",
              "Choose a sensible cable for typical jobs (domestic ring, garden socket, escape stairs).",
              "Recognise damaged insulation and know what to do about it.",
              "Cite the relevant part of BS 7671 for selection of equipment and wiring systems.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Conductors — the metal in the middle</ContentEyebrow>

          <ConceptBlock
            title="Two metals do almost all the work"
            plainEnglish="Copper for nearly everything you'll touch on a domestic or small commercial job. Aluminium when the cable is huge or it's strung up overhead."
            onSite="Open up any consumer unit on a domestic install — every conductor is copper. Walk into a substation or the head end of a tower block riser and you'll start seeing aluminium busbars and feeders."
          >
            <p>
              In BS 7671 land, you'll see two conductor materials again and again:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Copper (Cu)</strong> — resistivity ρ ≈ 17.2 nΩ·m at 20°C. Low resistance,
                excellent ductility, takes a crimp or screw terminal cleanly. Doesn't go brittle.
                Standard for T&E, single-cores, flex, SWA cores in normal sizes — basically every
                domestic and most commercial circuits.
              </li>
              <li>
                <strong>Aluminium (Al)</strong> — ρ ≈ 28.2 nΩ·m at 20°C. About 60% the weight of
                copper but needs roughly 1.6× the CSA for the same current. Used for the supply
                tails on some installs, big sub-mains, overhead lines and bus-bars. Needs the
                right termination kit (bimetallic lugs, jointing paste) because it oxidises and
                creeps under pressure.
              </li>
            </ul>
            <p>
              You'll occasionally hear about silver as the best conductor on Earth. It is — but
              the price ruins it for installation work. Steel turns up where mechanical strength
              matters more than conductivity (SWA armour, structural earthing of pylons), but it's
              never the load-carrying conductor.
            </p>
          </ConceptBlock>

          <CableCrossSection type="twin-and-earth" />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 514.3.1 (Identification of conductors)"
            clause="Except where identification is not required by Regulation 514.6, cores of cables shall be identified by: (a) colour as required by Regulation 514.4; and/or (b) letters and/or numbers as required by Regulation 514.5."
            meaning={
              <>
                Brown is line, blue is neutral, green-and-yellow is the CPC. The colours are
                identification, not function — a brown core is line because it's connected as line,
                not because the colour does something special. But getting the colours wrong on a
                fixed install causes a guaranteed C2/C3 on an EICR and is a sackable mistake.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 514.3.1."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>Insulators — the wrapping that keeps you alive</ContentEyebrow>

          <ConceptBlock
            title="Resistivity, but huge"
            plainEnglish="If conductors let current through easily, insulators stop it dead. Same physics — just locked-up electrons instead of free ones."
            onSite="A 230 V conductor with intact PVC sleeves is safe to handle the sheath of. The same conductor with cracked or melted insulation is a shock waiting to happen."
          >
            <p>
              An insulator is just a material with such high resistivity that, at normal voltages,
              effectively no current flows through it. Copper has a resistivity around 1.7 × 10⁻⁸
              Ω·m. PVC sits around 1 × 10¹⁵ Ω·m — twenty-three orders of magnitude bigger. The
              electrons in a PVC molecule are locked into bonds with their atoms and won't shift
              under 230 V.
            </p>
            <p>
              The insulator's job inside a cable is two things: stop the current leaking from one
              core to another, and stop it leaking from a core to anything outside the cable
              (including you). Insulation is the difference between a useful cable and a fault.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The insulator family — what you'll see on site"
            onSite="Read the cable marking. Twin-and-earth is usually labelled '6242Y' (PVC), SWA cores are typically XLPE, fire-rated cables (FP200, etc.) have specialised insulation systems."
          >
            <p>The common insulating materials in BS 7671 cables:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PVC (polyvinyl chloride)</strong> — 70°C continuous. The default insulator
                on domestic T&E sheaths and cores. Cheap, easy to work, good for normal indoor
                environments. Releases halogen gas when it burns, which is the reason it's not
                used in life-safety areas.
              </li>
              <li>
                <strong>XLPE (cross-linked polyethylene)</strong> — 90°C continuous. Standard
                insulation on SWA cable cores and larger feeder cables. The higher temperature
                rating means the cable can carry more current without the insulation breaking
                down.
              </li>
              <li>
                <strong>Rubber / EPR</strong> — flexible, used on cords for portable appliances and
                anywhere the cable has to bend repeatedly. Higher temperature versions (silicone
                rubber) for heating equipment.
              </li>
              <li>
                <strong>LSF / LSZH (Low Smoke and Fume / Low Smoke Zero Halogen)</strong> —
                specialised sheath chemistry that produces minimal smoke and no halogen acid in a
                fire. Required in stairwells, hospitals, schools, public buildings — anywhere
                people need to escape through the smoke a cable fire would produce.
              </li>
              <li>
                <strong>Mineral insulation (MICC, "Pyro")</strong> — magnesium oxide powder
                between the conductor and a copper sheath. Not flammable. Survives fire long
                enough for sirens and emergency lighting to keep working. You'll see it on
                fire-alarm and emergency-lighting circuits.
              </li>
            </ul>
          </ConceptBlock>

          <CableCrossSection type="SWA" />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 522.1.1 (Ambient temperature)"
            clause="A wiring system shall be selected and erected to be suitable for the highest and lowest local ambient temperatures, and to ensure that the limiting temperature in normal service indicated in Table 52.1 is not exceeded."
            meaning={
              <>
                You can't just stick PVC anywhere. The ambient temperature plus the temperature
                rise from current flow has to keep the insulation under its rated limit (70°C for
                PVC, 90°C for XLPE). Loft spaces, near boilers, inside thermal insulation — all
                need correction factors from Appendix 4.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 522.1.1."
          />

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Picking the right cable for the job</ContentEyebrow>

          <ConceptBlock
            title="Match the cable to the environment, not just the load"
            plainEnglish="Calculate the current the cable has to carry. Then think about where it lives — heat, moisture, sunlight, mechanical knocks, fire risk. Pick a cable that survives both."
          >
            <p>
              Every cable choice is a balance of:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Current capacity</strong> — CSA, conductor material, installation method
                (clipped, conduit, buried), grouping, ambient temperature.
              </li>
              <li>
                <strong>Voltage drop</strong> — covered properly in 3.4. Long runs need bigger CSA
                even if the load is small.
              </li>
              <li>
                <strong>Mechanical protection</strong> — SWA for buried or exposed runs; conduit
                for plant rooms; T&E behind plasterboard with a 50 mm safe zone.
              </li>
              <li>
                <strong>Environment</strong> — UV-resistant sheath outdoors, LSF/LSZH on escape
                routes, fire-rated for sounders and emergency lighting.
              </li>
              <li>
                <strong>Cost and availability</strong> — the perfect cable nobody stocks isn't
                much use. Pick something the wholesalers can deliver tomorrow.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Stranded vs solid conductor — when to pick which"
            plainEnglish="Solid is one thick wire. Stranded is many fine wires twisted together. Same conductor material, very different mechanical behaviour."
            onSite="Twin-and-earth (6242Y) cores are solid up to 4 mm² and stranded above. Flex cords (3183Y, H05VV-F, etc.) are always finely stranded so they survive being moved and bent. Use the wrong one in the wrong place and the conductor work-hardens, snaps, or fails to seat in the terminal."
          >
            <p>
              The conductor inside any cable is either:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Solid</strong> — one thick wire. Cheap, easy to terminate in screw and
                cage clamps, mechanically stiff. Standard on fixed wiring up to 4 mm² T&E. Fine
                for runs that won't move.
              </li>
              <li>
                <strong>Stranded</strong> — multiple thinner wires twisted together. More
                flexible, much better for cables that bend or move. Required for flex (appliance
                cords, pendant drops, equipment tails) and standard for fixed cores 6 mm² and
                above (where solid would be unworkably stiff).
              </li>
              <li>
                <strong>Fine-stranded / "Class 5" or "Class 6"</strong> — extra-fine strands for
                very flexible flex (welder leads, drum-reel cable). Needs the right ferrule
                terminal — squashing fine-stranded direct under a screw frays the strands and
                strands escape the terminal, eventually shorting.
              </li>
            </ul>
            <p>
              Get the conductor class wrong at the terminal and the joint either won't grip
              (loose strands), or work-hardens and snaps (solid in something that flexes). Either
              way it ends up in §526.1's territory — a connection that fails to give "durable
              electrical continuity".
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Sheath chemistry — what the outer jacket is doing for you"
            plainEnglish="The thing you actually grip when you pull a cable through is the sheath, not the insulation. It's a different material picked for mechanical and environmental performance, not just electrical isolation."
            onSite="Read the cable marking. Standard T&E is '6242Y' — a PVC sheath over PVC core insulation. SWA is typically PVC-sheathed over XLPE cores with steel armour in between. LSF is a low-smoke, halogen-free outer over standard cores. Each sheath is matched to where the cable lives."
          >
            <p>
              The outer sheath has three jobs that the core insulation can't do alone:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Mechanical protection</strong> — abrasion resistance during installation
                and over the cable's life. PVC sheaths take a knock and survive; bare core
                insulation would chafe through against masonry, joists or metal trunking edges.
              </li>
              <li>
                <strong>Environmental protection</strong> — UV stability outdoors (standard PVC
                degrades; UV-stable PVC and HDPE survive); moisture and chemical resistance for
                buried, marine and industrial installs.
              </li>
              <li>
                <strong>Fire performance</strong> — LSF/LSZH sheaths cut smoke and acid-gas
                output during a fire, which is why they're mandatory in stairwells, hospitals,
                schools and other escape-route environments. Mineral-insulated cable goes
                further again — survives the fire and keeps fire-alarm circuits running.
              </li>
            </ul>
            <p>
              The sheath isn't structural insulation under BS 7671 — the core insulation is. But
              damage to the sheath that exposes the core insulation to UV, moisture or
              mechanical abuse will eventually take the core insulation down with it. Treat
              sheath damage seriously, even when the cores still test clean today.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The semiconductor middle ground — why this matters later"
            plainEnglish="A few materials sit between conductor and insulator. They behave like insulators in some conditions and like conductors in others — and we control which by 'doping' them with impurities."
            onSite="Every modern install has semiconductor devices in it: LED drivers, RCD electronics, SMPS power supplies in lighting and chargers, EV charge controllers, inverter PCBs in PV. The diodes and transistors covered in LO6 are all built from doped silicon — neither conductor nor insulator on its own."
          >
            <p>
              Most materials fall cleanly into "conductor" (low resistivity) or "insulator" (very
              high resistivity). A handful sit in between, with conductivity that depends on
              temperature, light, voltage or impurities. The big one for electricians is{' '}
              <strong>silicon</strong>:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pure silicon</strong> at room temperature has very few free electrons —
                it behaves nearly as an insulator.
              </li>
              <li>
                Add a tiny amount of phosphorus or boron (parts per million) and the conductivity
                changes by orders of magnitude. The doped material becomes a controlled
                semiconductor — used to build diodes, transistors, MOSFETs, SCRs, the silicon
                inside every modern protective relay, inverter and LED driver.
              </li>
              <li>
                Photoconductors (like the cadmium sulphide in an LDR) work the same way —
                resistance drops sharply when light energy frees electrons. That's how a
                dusk-till-dawn sensor works.
              </li>
            </ul>
            <p>
              You don't need the device-physics for Level 2 — but recognise that BS 7671's
              "conductor" / "insulator" framework is a useful simplification for cables and
              fittings. Inside the components themselves, the boundary is blurrier and more
              controllable. Sub6.1 onwards picks this up.
            </p>
          </ConceptBlock>

          <InlineCheck {...checks[2]} />

          <CableCrossSection type="flex" />

          <CommonMistake
            title="Taping over damaged insulation and signing it off"
            whatHappens={
              <>
                Apprentice spots a nick in the sheath of a kitchen ring during the periodic. Slap
                a couple of turns of self-amalgamating tape on it. Pen the EICR as 'C3 — improvement
                recommended'. Six months later, the homeowner gets a shock through a metal cooker
                surround.
              </>
            }
            doInstead={
              <>
                Damaged insulation on fixed wiring is a <strong>C2</strong> at minimum (potentially
                dangerous). Tape is not a repair. Either replace the section properly with a
                joint kit, or replace the whole cable. If you can't fix it on the visit, write it
                up clearly and recommend immediate remedial action.
              </>
            }
          />

          <Scenario
            title="Garden socket on a long run from the consumer unit"
            situation={
              <>
                Customer wants a single double-socket on the back of the shed, 30 m from the
                consumer unit. You've got SWA in the van and T&E in the loft. Which one?
              </>
            }
            whatToDo={
              <>
                SWA. The cable's going outdoors and possibly buried — T&E sheath isn't rated for UV
                or mechanical knocks, and it has no armour. Use 2.5 mm² SWA with the armour as
                the CPC, glanded properly at both ends, RCD protected at 30 mA per Section 411.
                Run it in a deep enough trench with marker tape above.
              </>
            }
            whyItMatters={
              <>
                The conductor is doing the same job in either cable. The difference is the
                insulator and the sheath system — SWA's XLPE cores plus armour plus outer PVC are
                rated for the abuse a buried cable takes. T&E in the same place fails inspection,
                fails BS 7671 §522, and eventually fails in service.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Insulation in fault and inspection</ContentEyebrow>

          <ConceptBlock
            title="Insulation resistance — the test you'll do every install"
            plainEnglish="A 500 V insulation resistance test puts a high voltage across the insulation and measures how much current leaks. Good insulation = very high reading; damaged insulation = low reading."
          >
            <p>
              Insulation isn't perfect. There's always a tiny leakage current, but for a healthy
              install it should be in the megohms or gigohms. BS 7671 sets a minimum of{' '}
              <strong>1 MΩ</strong> for low-voltage circuits (Table 64). Anything below that and
              the install fails — you've got moisture ingress, damaged sheathing, a swarf-bridged
              terminal, or worse.
            </p>
            <p>
              You'll come back to insulation resistance properly in I&T (LO5 territory and the
              EICR work in Module 5). For now: insulation isn't just a passive layer — it's
              something you actively test, every initial verification and every periodic.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Table 64 (Minimum values of insulation resistance)"
            clause="For circuits up to and including 500 V, with the exception of SELV and PELV, the test voltage d.c. is 500 V and the minimum insulation resistance is 1.0 MΩ."
            meaning={
              <>
                If a final circuit measures less than 1 MΩ, the install fails and you don't
                energise it. Common causes: moisture, swarf in a back-box, a crushed cable behind
                a screw, a faulty appliance left plugged in. Investigate before you certify.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Part 6, Table 64."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Conductor = low resistivity material full of free electrons. Copper for nearly everything; aluminium where weight or scale matters.",
              "Insulator = high resistivity material with electrons locked into bonds. PVC (70°C), XLPE (90°C), rubber, LSF/LSZH and mineral insulation are the ones to know.",
              "Aluminium needs about 1.6× the CSA of copper for the same job.",
              "Cable choice is a balance: current, voltage drop, environment, mechanical protection, fire performance, cost.",
              "Damaged insulation on fixed wiring is a C2 minimum. Tape is not a repair — replace the cable or fit a proper joint.",
              "Insulation resistance is tested every install, minimum 1 MΩ at 500 V d.c. per BS 7671 Table 64.",
            ]}
          />

          <Quiz title="Conductors and insulators knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section3/3-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.1 Electron theory
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section3/3-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.3 Resistance and resistivity
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
