/**
 * Module 1 · Section 6 · Subsection 5 — Fire emergency procedures.
 *
 * Unit 201 LO2 / LO4 alignment:
 *   - AC 2.2: respond appropriately to workplace emergencies, including
 *     fire.
 *   - AC 4.6: know the correct extinguisher class for the type of fire.
 *
 * Pedagogy:
 *   - Fire triangle (heat + fuel + oxygen) and how that drives
 *     extinguisher choice.
 *   - The six classes of fire (A, B, C, D, F, plus electrical) and the
 *     extinguisher type for each.
 *   - PASS for extinguisher use.
 *   - Alarm → evac → assembly → roll call.
 *   - Fight or flight rule: untrained = evacuate; trained on a small
 *     incipient fire = MAYBE fight, only if you have an escape route.
 *   - Specific risks: lithium-ion, switchgear arc fires, hot works.
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
  'Fire emergency procedures | Level 2 Module 1.6.5 | Elec-Mate';
const DESCRIPTION =
  'Fire alarm, evacuation, extinguisher classes A/B/C/D/F + electrical, PASS technique, and the special cases like lithium-ion and arc-fault fires that need careful handling.';

/* ── Inline check questions (wired into stats/streaks) ──────────────── */

const checks = [
  {
    id: 'fire-class-electrical-check',
    question:
      'A laptop charger is on fire on the bench — which extinguisher class do you grab?',
    options: [
      'Water (red)',
      'Foam (cream label)',
      'CO₂ (black label) — designed for live electrical fires',
      'Class F wet chemical (yellow label)',
    ],
    correctIndex: 2,
    explanation:
      'CO₂ (black label) is the standard electrical extinguisher — non-conductive, leaves no residue, smothers the fire by displacing oxygen. Dry powder (blue label) also works but it goes everywhere and ruins the kit and any nearby electronics. Water and foam are conductive — never on live electrics.',
  },
  {
    id: 'pass-technique-check',
    question: 'PASS is the four-step extinguisher technique. What does the first letter stand for?',
    options: [
      'Push the lever',
      'Pull the safety pin',
      'Pump the handle three times',
      'Position your feet',
    ],
    correctIndex: 1,
    explanation:
      'P = Pull the safety pin. A = Aim at the BASE of the fire (not the flames). S = Squeeze the handle. S = Sweep side to side. Pin first because it locks the handle until you pull it — squeeze before pulling and nothing happens.',
  },
  {
    id: 'evac-stop-work-check',
    question: 'The fire alarm goes off. What is the right immediate action for an apprentice?',
    options: [
      'Pack up tools, finish the bit you’re on, then leave',
      'Investigate where the fire is so you can tell the supervisor',
      'Stop work immediately, leave by the nearest safe exit, go to the assembly point',
      'Wait for the supervisor to confirm it’s real',
    ],
    correctIndex: 2,
    explanation:
      'Stop work, leave by the nearest safe exit, go to the assembly point. Don’t pack up. Don’t investigate. Don’t wait for confirmation. Roll call at the assembly point identifies who is missing — that’s how the fire service knows whether to enter the building.',
  },
];

/* ── End-of-page Quiz (wires into stats/streaks) ─────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question: 'What three things make up the fire triangle?',
    options: [
      'Heat, smoke, oxygen',
      'Heat, fuel, oxygen',
      'Fuel, water, electricity',
      'Spark, gas, pressure',
    ],
    correctAnswer: 1,
    explanation:
      'Heat + Fuel + Oxygen. Remove any one of the three and the fire goes out. Extinguishers work by removing one of the three: water cools (removes heat), foam smothers (removes oxygen), CO₂ displaces oxygen, dry powder interrupts the chemical reaction.',
  },
  {
    id: 2,
    question: 'A chip pan is on fire in the canteen. Which class of fire is that?',
    options: [
      'Class A — solids',
      'Class B — flammable liquids',
      'Class F — cooking oils and fats',
      'Class C — flammable gases',
    ],
    correctAnswer: 2,
    explanation:
      'Class F fires (yellow label, wet chemical extinguisher) cover cooking oils and fats. Don’t use water — flash steam explosion as water hits hot oil. Don’t use foam — same problem. Wet chemical extinguishers spray a saponifying agent that turns the hot oil into a layer of soap-like foam, smothering the fire.',
  },
  {
    id: 3,
    question:
      'You see a small waste-bin fire of paper and cardboard in the corridor. The alarm hasn’t gone yet. Which extinguisher?',
    options: [
      'CO₂ (black) — works on everything',
      'Water (red) or foam (cream) — Class A solid combustibles',
      'Dry powder (blue) — wrap it round the bin',
      'Class F (yellow)',
    ],
    correctAnswer: 1,
    explanation:
      'Class A (solids — paper, wood, fabric, plastic) is what water and foam extinguishers are designed for. CO₂ would work but it’s overkill and the fire can re-ignite once the gas disperses. Hit the alarm first. Tackle only if it’s small (incipient stage), you’re trained, and you have a clear escape route behind you.',
  },
  {
    id: 4,
    question: 'What does PASS stand for in fire-extinguisher use?',
    options: [
      'Push, Aim, Sweep, Squeeze',
      'Pull (the pin), Aim (at the base), Squeeze (the handle), Sweep (side to side)',
      'Position, Attack, Spray, Stand back',
      'Pin, Activate, Spread, Stop',
    ],
    correctAnswer: 1,
    explanation:
      'Pull pin. Aim at the BASE (not the flames). Squeeze the handle. Sweep side to side across the base. Universal mnemonic on every UK fire-awareness course.',
  },
  {
    id: 5,
    question:
      'A lithium-ion battery pack on a fit-out has gone into thermal runaway. What extinguisher is most appropriate?',
    options: [
      'Water (red) — cools it down',
      'CO₂ (black) — smothers the fire',
      'A specialist Li-ion extinguisher (e.g. AVD or copious water cooling); evacuate and call fire service if not contained',
      'Dry powder (blue)',
    ],
    correctAnswer: 2,
    explanation:
      'Lithium-ion fires self-oxidate (the cell releases its own oxygen) so smothering doesn’t work. Standard extinguishers can knock down flames temporarily but the cells will re-ignite. Specialist AVD (Aqueous Vermiculite Dispersion) or large volumes of cooling water are the recognised tactics. Get out and call 999 if the fire isn’t small and contained.',
  },
  {
    id: 6,
    question: 'When the alarm sounds, what should you take with you?',
    options: [
      'Tools, phone, jacket — anything valuable',
      'Phone for calling 999, but nothing that delays you',
      'Your personal RAMS folder',
      'Coffee — long wait at the assembly point',
    ],
    correctAnswer: 1,
    explanation:
      'Take only what you can grab without delay. A phone is fine, a jacket maybe. Don’t go back for tools, laptops, anything in the van. The HSE figure for fire deaths is dominated by people who delayed evacuation by going back — not by people who got out and stayed out.',
  },
  {
    id: 7,
    question: 'After evacuating, where do you go?',
    options: [
      'Home',
      'The pub across the road',
      'The designated fire assembly point — and stay there until the roll call is done',
      'Back to the van to wait it out',
    ],
    correctAnswer: 2,
    explanation:
      'Designated assembly point. Roll call confirms everyone is out. If you wander off, you’re assumed missing — and the fire service will go back into a burning building looking for you. Stay until you’re officially accounted for.',
  },
  {
    id: 8,
    question:
      'Who is responsible for ensuring fire safety arrangements are in place at a workplace under the Regulatory Reform (Fire Safety) Order 2005?',
    options: [
      'The HSE',
      'The local fire service',
      'The "responsible person" — usually the employer or person in control of the premises',
      'Each individual worker',
    ],
    correctAnswer: 2,
    explanation:
      'RRFSO 2005 puts the duty on the "responsible person" — typically the employer for a workplace, or whoever has control of the premises. They must complete a fire risk assessment, keep it up to date, provide alarms / extinguishers / signage / training, and have a documented evacuation plan.',
  },
];

/* ── FAQs (apprentice voice) ─────────────────────────────────────────── */

const faqs = [
  {
    question: 'What if I don’t know what type of fire it is — which extinguisher do I grab?',
    answer:
      'In doubt, leave it. The default for an untrained worker is EVACUATE — only tackle a fire if it’s clearly small (waste-bin size at most), you’re trained, you’ve raised the alarm, and you have a clear escape route behind you. Wrong extinguisher on the wrong fire makes things much worse — water on a chip-pan flash-explodes, foam on a hot-oil fire spreads it, water on live electrical kit gives you a shock. When in doubt — get out.',
  },
  {
    question: 'How do I tell which extinguisher is which?',
    answer:
      'In the UK, all extinguishers are red-bodied (since 1997 BS EN 3 standard) but with a coloured panel showing the contents. Red = water. Cream = foam. Black = CO₂. Blue = dry powder. Yellow = wet chemical (Class F). Each panel also has icons of the fire classes it CAN be used on, with red crosses through ones it MUST NOT. Read the panel before you grab.',
  },
  {
    question: 'What about CO₂ on people — won’t it smother them?',
    answer:
      'In a typical room the dispersal makes a CO₂ extinguisher safe to use near people — but never aim it at someone, and don’t use it in a small enclosed space (cupboard, plant room) without ventilating after. The discharge is intensely cold (the horn drops to about -78°C) — never grip the horn directly, frostbite is real. Hold the handle.',
  },
  {
    question: 'Why is "Class C" not on most UK extinguishers?',
    answer:
      'Class C covers flammable GASES. The default UK approach for a gas fire is to STOP THE GAS rather than fight the fire — extinguishing without isolation creates a worse hazard (an unburned gas cloud finding an ignition source = explosion). So most UK extinguishers don’t list Class C. The right action is isolate the supply at the meter / valve, evacuate, fire service.',
  },
  {
    question: 'I see a fire alarm panel showing a fault — should I touch it?',
    answer:
      'No. Fire alarm panels are commissioned and maintained by competent fire-system engineers under BS 5839-1. An apprentice flipping silence/reset buttons can disable a system that needs to detect a real fire. Tell the responsible person, log it as a defect, fire-watch arrangements may need to kick in until the panel is fixed. Hands off the panel.',
  },
  {
    question: 'Are extinguishers tested? How often?',
    answer:
      'BS 5306 sets the maintenance regime. Monthly visual check (gauge in the green, seal intact, no damage) — usually by the responsible person or appointed fire warden. Annual service by a competent technician (label on the side will show the last service date). Extended service or replacement every 5 years for most types, every 10 for CO₂. Out-of-date extinguisher = take it out of service, get it replaced.',
  },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-10 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 1 · Section 6 · Subsection 5"
            title="Fire emergency procedures"
            description="Fire alarm, evacuation, the six fire classes and the right extinguisher for each, the PASS technique, and the special cases — lithium-ion, switchgear arc, hot works — that need careful handling."
            tone="emerald"
          />

          <TLDR
            points={[
              "Fire triangle = heat + fuel + oxygen. Remove ONE and the fire goes out. Extinguishers work by removing one of the three.",
              "UK fire classes: A (solids), B (flammable liquids), C (gases — usually isolate not extinguish), D (metals), F (cooking oils). Plus electrical (live equipment) — typically CO₂.",
              "Default response for untrained workers: ALARM → EVACUATE → ASSEMBLY POINT → ROLL CALL. Tackle a fire only if you’re trained, it’s tiny, and you have an escape route behind you.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Explain the fire triangle and how each extinguisher type breaks it.",
              "Identify the correct extinguisher class for solids, liquids, gases, metals, cooking oils, and live electrical equipment.",
              "Apply the PASS technique to use an extinguisher safely.",
              "React correctly to a fire alarm — stop work, evacuate, assembly point, roll call.",
              "Recognise high-risk scenarios (lithium-ion thermal runaway, switchgear arc, hot works) and the right tactical response.",
              "Name the responsible person under the Regulatory Reform (Fire Safety) Order 2005 and what their duties are.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>How fires work</ContentEyebrow>

          <ConceptBlock
            title="The fire triangle — heat + fuel + oxygen"
            plainEnglish="A fire needs all three to burn. Take any one away and it goes out. Every extinguisher works by removing one of the three."
            onSite="Some textbooks now talk about a fire tetrahedron — adding the chemical chain reaction as a fourth side. That’s why dry powder works: it disrupts the chain reaction itself, not just one of the three sides."
          >
            <p>How each extinguisher type breaks the triangle:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Water</strong> — cools the fuel below its ignition temperature. Removes
                HEAT.
              </li>
              <li>
                <strong>Foam</strong> — forms a blanket over the fuel, sealing in the vapours.
                Removes OXYGEN (and provides some cooling).
              </li>
              <li>
                <strong>CO₂</strong> — displaces oxygen in the immediate area. Removes OXYGEN.
              </li>
              <li>
                <strong>Dry powder</strong> — interrupts the chemical chain reaction of
                combustion. Knocks out the fourth side of the tetrahedron.
              </li>
              <li>
                <strong>Wet chemical</strong> — saponifies hot oil into a soap-like foam.
                Removes OXYGEN and cools.
              </li>
            </ul>
            <p>
              Choosing the wrong one doesn’t just fail to put the fire out — it can make things
              much worse. Water on hot oil flash-explodes. Water on live electricity conducts
              the fault back through the spray to you. Foam on a Class D metal fire reacts
              violently. Match the extinguisher to the class.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>The six classes (and what to use on each)</ContentEyebrow>

          <ConceptBlock
            title="Class A, B, C, D, F — plus electrical"
            plainEnglish="The five classes (A/B/C/D/F) are about WHAT is burning. Electrical isn’t a class on its own under BS EN 2 — it’s an additional rating shown by an electric-arc icon on the extinguisher panel. CO₂ is the standard for live electrical fires."
          >
            <p>UK fire classes and the right extinguisher for each:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Class A — Solids</strong> (paper, wood, fabric, plastic). Use:{' '}
                <strong>WATER (red label)</strong> or <strong>FOAM (cream label)</strong>. Both
                cool and smother. Most common workplace fire.
              </li>
              <li>
                <strong>Class B — Flammable liquids</strong> (petrol, diesel, paint thinners,
                solvents). Use: <strong>FOAM (cream)</strong>, <strong>CO₂ (black)</strong>, or{' '}
                <strong>DRY POWDER (blue)</strong>. Never water — water sinks below the liquid
                and pushes it around, spreading the fire.
              </li>
              <li>
                <strong>Class C — Flammable gases</strong> (LPG, butane, methane). Default
                tactic: <strong>ISOLATE THE SUPPLY</strong> (close the valve, isolate at the
                meter), then evacuate. Most UK extinguishers don’t carry a Class C rating
                because extinguishing without isolation leaves an unburned gas cloud waiting
                for an ignition source.
              </li>
              <li>
                <strong>Class D — Combustible metals</strong> (sodium, magnesium, lithium,
                titanium). Use: <strong>SPECIALIST DRY POWDER (Class D powder, e.g. M28 or
                L2)</strong>. Standard ABC powder doesn’t work and water reacts violently. Rare
                in domestic / commercial sites; common in lab and industrial settings.
              </li>
              <li>
                <strong>Class F — Cooking oils and fats</strong>. Use:{' '}
                <strong>WET CHEMICAL (yellow label)</strong>. Saponifies the oil into foam.
                Never water (steam explosion), never foam (sinks and spreads).
              </li>
              <li>
                <strong>Electrical (live equipment)</strong>. Use: <strong>CO₂ (black)</strong>{' '}
                — non-conductive, leaves no residue, won’t damage nearby electronics. Dry
                powder also rated for electrical but it goes everywhere and ruins kit. Water
                and foam are CONDUCTIVE — never on live equipment.
              </li>
            </ul>
            <p>
              Once you’ve isolated the supply (drop the main switch), the electrical risk is
              gone and you can treat the fire by whatever the burning material is — usually
              Class A. But while it’s live, CO₂ first.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 3 — Portable fire extinguishers"
            clause="All portable fire extinguishers manufactured to BS EN 3 are predominantly red, with a coloured zone on the front panel indicating the type of extinguishing medium: red for water, cream for foam, black for CO₂, blue for dry powder, yellow for wet chemical."
            meaning={
              <>
                Since 1997, all UK extinguishers have been red bodied with a coloured panel on
                the front. Memorise the five panel colours — they’re the same on every site,
                in every building, every time. The panel also lists the fire classes the
                extinguisher CAN be used on, plus an electrical-rating icon if applicable.
              </>
            }
            cite="Reference: BS EN 3 — Portable fire extinguishers (current edition)."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Using an extinguisher</ContentEyebrow>

          <ConceptBlock
            title="PASS — Pull, Aim, Squeeze, Sweep"
            plainEnglish="Universal four-step technique for any portable extinguisher. Pin first because the handle is locked until you pull it."
            onSite="Stand 2–3 metres back from the fire when you start. Closer for CO₂ (the gas dissipates fast, you need to be near). Wind / draught at your back if outdoors."
          >
            <p>Step by step:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>P — Pull the safety pin.</strong> Located near the handle, usually with
                a tag. The pin locks the handle — pull it before squeezing or nothing happens.
              </li>
              <li>
                <strong>A — Aim at the BASE of the fire.</strong> Not the flames. The base
                contains the fuel — that’s what needs to be cooled, smothered or starved of
                oxygen. Aiming at the flames does nothing useful.
              </li>
              <li>
                <strong>S — Squeeze the handle.</strong> Slow, steady pressure. Most
                extinguishers will discharge their entire contents in 8–15 seconds — don’t waste
                them with intermittent bursts.
              </li>
              <li>
                <strong>S — Sweep side to side.</strong> Cover the whole base of the fire,
                working back-to-front. Keep going until the fire is out OR the extinguisher is
                empty OR you have to retreat.
              </li>
            </ol>
            <p>
              <strong>If the extinguisher empties and the fire isn’t out — get out.</strong>{' '}
              Don’t waste time going for a second one. Close doors behind you to slow the fire,
              raise the alarm if you haven’t already, evacuate.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The fight-or-flight rule for an apprentice"
            plainEnglish="The default for an untrained worker is ALWAYS evacuate. Only tackle a fire if it’s small (incipient stage — bin / desk size), you’re trained on extinguishers, you’ve raised the alarm first, and you have a clear escape route behind you."
            onSite={`"Behind you" matters — never put the fire between you and the exit. If retreating means walking past or through the fire, don’t engage in the first place.`}
          >
            <p>
              The Home Office figures show that workplace fires kill more people through
              attempted firefighting that goes wrong than through evacuation that takes too
              long. The four pre-conditions before you even consider tackling a fire:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                The alarm has already been raised (you’ve hit the manual call point or someone
                else has).
              </li>
              <li>
                The fire is small (incipient — wastebasket, single appliance, small spill —
                NOT room-engulfed).
              </li>
              <li>
                You’re trained on the type of extinguisher and the type of fire.
              </li>
              <li>
                You have a clear escape route behind you — fire never between you and the
                exit. If you can’t back away, you can’t fight.
              </li>
            </ul>
            <p>
              If ANY of those four is missing — get out. The HSE’s Fire Safety guidance is
              clear that no piece of equipment, no document, no work-in-progress is worth your
              life. Things can be replaced, you can’t.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>When the alarm goes</ContentEyebrow>

          <ConceptBlock
            title="Alarm → evacuate → assembly point → roll call"
            plainEnglish="Stop work the moment you hear the alarm. Walk briskly (not run) to the nearest safe exit. Don’t go back for anything. Go to the assembly point and stay there until the roll call says you’re accounted for."
            onSite="On a typical construction site the alarm sequence is intermittent (testing) vs continuous (real). Site induction tells you which is which. If unsure, treat it as real."
          >
            <p>The full sequence:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Alarm sounds</strong> (continuous or as briefed at induction).
              </li>
              <li>
                <strong>Stop work immediately.</strong> Make safe what you can in seconds — turn
                off torches, drop tools — but do NOT pack up.
              </li>
              <li>
                <strong>Leave by the nearest safe exit.</strong> Use the stairs, never the
                lift. Touch doors with the back of your hand before opening — heat means fire
                on the other side.
              </li>
              <li>
                <strong>Close doors behind you</strong> as you go (slows fire spread). Don’t
                lock them.
              </li>
              <li>
                <strong>Go to the assembly point.</strong> Specified at site induction. NOT the
                car park, NOT the pub, NOT the van.
              </li>
              <li>
                <strong>Report to your supervisor / fire warden.</strong> Roll call confirms
                everyone is out. If you wander off, the fire service may go back into a burning
                building looking for you.
              </li>
              <li>
                <strong>Stay at the assembly point</strong> until told it’s safe to return OR
                released by the fire warden. Don’t go back for tools / phone / anything.
              </li>
            </ol>
          </ConceptBlock>

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 — Article 9"
            clause="The responsible person must make a suitable and sufficient assessment of the risks to which relevant persons are exposed for the purpose of identifying the general fire precautions he needs to take."
            meaning={
              <>
                The RRFSO is the master fire-safety law in England and Wales (Scotland and
                Northern Ireland have similar parallel legislation). It puts the duty on the
                "responsible person" — usually the employer or person in control of premises —
                to do a fire risk assessment, keep it current, provide alarms / extinguishers /
                signage, train staff, and have a documented evacuation plan. As an apprentice,
                you’re entitled to know all of this — ask at induction.
              </>
            }
            cite="Reference: Regulatory Reform (Fire Safety) Order 2005."
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The trickier ones electricians actually meet</ContentEyebrow>

          <ConceptBlock
            title="Switchgear / consumer-unit fire — isolate, CO₂, evacuate, fire service"
            plainEnglish="A fire inside live switchgear or a CU is high-risk because the fault is feeding the fire. The first move is to KILL THE SUPPLY upstream — at the main switch or, if the CU itself is in flames, at the meter."
            onSite="If the meter cut-out is the source — call the DNO immediately (national emergency 105). Don’t try to pull the cut-out fuse yourself; that’s their kit, their job, and DNO fuses can fail explosively under fault."
          >
            <p>Tactical sequence for a switchgear / CU fire:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Raise the fire alarm. Get the building evacuating.
              </li>
              <li>
                Isolate at the main switch upstream of the fire — drop it whether or not it’s
                "yours" to operate. Lock-off after if you have time.
              </li>
              <li>
                If the CU itself is the source AND you can’t isolate above it, isolate at the
                MEM cut-out by pulling the company fuse — only if competent and safe to do so.
                Otherwise call the DNO (105) and the fire service.
              </li>
              <li>
                If the fire is still small after isolation: CO₂ extinguisher, PASS technique,
                stand back from the rapidly-cooling enclosure (CO₂ horn drops to about -78°C —
                metal contracts, can crack).
              </li>
              <li>
                If the fire is bigger than incipient — get out. CU fires can punch through
                plasterboard fast and the smoke from burning insulation is genuinely toxic.
                Fire service.
              </li>
            </ol>
          </ConceptBlock>

          <ConceptBlock
            title="Lithium-ion thermal runaway — different beast entirely"
            plainEnglish="Lithium-ion battery fires are not normal fires. The cells release their own oxygen as they decompose, so smothering doesn’t work. Standard extinguishers can knock down flames temporarily but the cells will keep re-igniting until all the energy is dissipated."
            onSite="More and more on fit-outs — cordless tool batteries, e-scooter chargers, EV charging points, solar PV battery storage. Know the location of any battery storage on every site you’re on."
          >
            <p>What works (in roughly the right order to try them):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Specialist Li-ion extinguishers</strong> — AVD (Aqueous Vermiculite
                Dispersion) or specialist Li-ion encapsulators. These are increasingly common
                on EV-charging sites and battery-storage installations.
              </li>
              <li>
                <strong>Copious cooling water</strong> — large volumes, sustained, until the
                cell temperature drops below thermal-runaway threshold. Domestic
                extinguishers don’t carry enough.
              </li>
              <li>
                <strong>Isolation and containment</strong> — get the burning device outside
                if you can do it safely. Concrete floor, away from anything else flammable. Let
                it burn out under fire-service supervision.
              </li>
              <li>
                <strong>Evacuate and call 999</strong> — the default if the fire isn’t
                controlled in seconds. Fumes from burning Li-ion include hydrogen fluoride and
                other genuinely dangerous gases. Don’t hang around to "watch".
              </li>
            </ul>
            <p>
              Standard CO₂, dry powder and water extinguishers will all FAIL on a sustained
              Li-ion fire. They might knock the flames down briefly but the cells re-ignite as
              soon as the agent disperses. The only durable solution is cooling the cells
              below the runaway threshold — which usually means the fire service with a hose.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Grabbing the nearest extinguisher without checking the panel"
            whatHappens={
              <>
                Foam extinguisher on a chip-pan fire. The foam sinks into the hot oil, water
                content flashes to steam, oil ejects everywhere, and a small kitchen fire
                becomes a kitchen-engulfing fire that takes the ceiling. Or: water extinguisher
                on a live electrical fire — the spray gives you a 230 V shock through the
                water column.
              </>
            }
            doInstead={
              <>
                Take the two seconds to check the panel — colour and the icons of fire classes
                it’s rated for. If you’re not sure of the class, default to evacuate. The
                wrong extinguisher is worse than no extinguisher in many cases. Better-trained
                companies put a quick-reference sticker next to each extinguisher showing what
                it is and what it’s for.
              </>
            }
          />

          <Scenario
            title="Lithium battery on the fit-out — what extinguisher?"
            situation={
              <>
                You’re second-fixing on a commercial fit-out. A delivery of cordless impact
                drivers arrived this morning — about 30 batteries on charge in the corner.
                You smell something acrid; one of the chargers is smoking, and as you turn
                round one of the battery packs starts venting white-yellow smoke and hissing.
                Within seconds it’s on fire. The site has standard CO₂ and water extinguishers
                in the corridor.
              </>
            }
            whatToDo={
              <>
                Hit the fire alarm immediately. Shout for evacuation. Do NOT engage with
                standard extinguishers — CO₂ will displace flames briefly but Li-ion cells
                self-oxidate and will re-ignite. Water in domestic-extinguisher quantities is
                useless and conducts back the live charger circuit. <strong>Get out.</strong>{' '}
                On the way past, isolate the chargers at the wall socket if you can do it in
                under 5 seconds without going past the fire. Once at the assembly point, brief
                the fire service on arrival: "lithium-ion battery thermal runaway, charging
                rack, approximately 30 batteries". They have specialist tools and training.
                Don’t go back in.
              </>
            }
            whyItMatters={
              <>
                Li-ion thermal runaway is increasingly common on fit-outs because of cordless
                tool culture, e-bikes / e-scooters charging on site, and EV / solar storage
                installations. The lethal mistake is treating a Li-ion fire like a normal
                Class A or electrical fire. The fumes alone (hydrogen fluoride, carbon
                monoxide) can kill at concentrations small enough to be inside a single room.
                Get out, call 999, brief the fire service.
              </>
            }
          />

          <SectionRule />

          <ContentEyebrow>Hot works — your responsibility, your permit</ContentEyebrow>

          <ConceptBlock
            title="Hot works permits — angle grinders, soldering, blowtorches">
            <p>
              Most insurance and most site H&S regimes require a hot works permit for any
              activity that produces sparks, flames or significant heat — angle grinding,
              cutting metal trunking with a disc, soldering joints, brazing, pipe-thawing
              torches, even a heat-shrink gun in some interpretations. The permit:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Confirms the area is clear of combustibles (or that combustibles have been
                shielded with fire blankets).
              </li>
              <li>
                Specifies a fire watch (a person standing by with an extinguisher, often for an
                hour AFTER the work finishes — embers can smoulder for 30 minutes plus).
              </li>
              <li>
                Specifies the extinguisher type, location and capacity.
              </li>
              <li>
                Has a defined start and end time — work outside the permit window is a breach.
              </li>
              <li>
                Names the worker doing the hot works AND the fire watch.
              </li>
            </ul>
            <p>
              As an apprentice you may be asked to act as a fire watch. Take it seriously —
              your job is to look at the work area, not at your phone. If anything starts to
              smoulder, tackle small / get out big.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Fire triangle = heat + fuel + oxygen. Remove one to extinguish. Different extinguishers attack different sides.",
              "Six classes / contexts: A solids (water/foam), B liquids (foam/CO₂/powder), C gases (isolate, don’t fight), D metals (specialist powder), F cooking oil (wet chemical), Electrical (CO₂).",
              "Panel colours on UK extinguishers: red water, cream foam, black CO₂, blue powder, yellow wet chemical.",
              "PASS: Pull pin, Aim base, Squeeze handle, Sweep side to side. Stand 2–3 m back to start.",
              "Default for untrained = ALARM → EVACUATE → ASSEMBLY POINT → ROLL CALL. Tackle a fire only if small, you’re trained, and escape route is clear behind you.",
              "Lithium-ion fires need specialist treatment (AVD or copious water cooling). Standard extinguishers don’t work — get out and call 999.",
            ]}
          />

          {/* ── Quiz (preserved — links to streaks/stats) ───────── */}

          <Quiz title="Fire emergency procedures — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section6/6-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Accident investigation & lessons learned
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module1/section6/6-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                General workplace emergency procedures
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
