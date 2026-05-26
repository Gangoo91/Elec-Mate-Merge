/**
 * Module 2 · Section 3 · Subsection 5 — Thermal effects of current (AC 4.8 thermal)
 * City & Guilds 2365-02 → Unit 202 → LO4 part 1.
 * Polish phase: consolidated from old section5/Sub4 + Sub6, rewritten in apprentice voice.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PowerCalculator } from '@/components/apprentice-courses/PowerCalculator';
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
  'Thermal effects of current — heating, ratings and fire | Level 2 Module 2.3.5 (AC 4.8) | Elec-Mate';
const DESCRIPTION =
  'Why current makes things hot, why I²R losses are everywhere, and how BS 7671 sets cable ratings, fuse choices and connection requirements to keep the heat under control.';

const checks = [
  {
    id: 'i-squared-r-check',
    question: 'The power dissipated as heat in a conductor of resistance R carrying current I is:',
    options: [
      'P = V × I',
      'P = V² × R',
      'P = I² × R',
      'P = I × R',
    ],
    correctIndex: 2,
    explanation:
      "P = I²R. Double the current and you quadruple the heating. That's why a small overload heats a cable badly out of proportion, and why bigger CSA (lower R) is the fix.",
  },
  {
    id: 'pvc-limit-check',
    question:
      'A 70°C PVC-insulated cable run is left in a hot loft. The ambient is 45°C and the cable is also bunched with three other circuits. What does BS 7671 want you to do?',
    options: [
      'By evaluating whether the space is substantially enclosed and whether there is a foreseeable risk of serious injury from hazardous conditions',
      'Golden thread of digital information including electrical certification, accountability through dutyholder roles, and AFDD-related design considerations',
      'Could be a short circuit (L-N), an earth fault (L-PE), or both — depends what the nail bridges',
      'Apply Appendix 4 correction factors (ambient + grouping) and check the corrected rating still covers the design current',
    ],
    correctIndex: 3,
    explanation:
      "Appendix 4 has correction factors (Ca for ambient, Cg for grouping, Ci for thermal insulation). Multiply them together with the tabulated It value to get the actual usable rating in that environment. If your design current exceeds it, upsize.",
  },
  {
    id: 'loose-joint-check',
    question:
      "A consumer-unit terminal at 25 A has 0.05 Ω of contact resistance because it's loose. How much heat is dissipated at that single screw?",
    options: [
      '125 W',
      '31.25 W',
      '12.5 W',
      '1.25 W',
    ],
    correctIndex: 1,
    explanation:
      "P = I²R = 25² × 0.05 = 31.25 W. That's a 30 W heater concentrated on the head of one terminal screw — easily enough to brown the insulation, melt the bus-bar coating, and start an arc fault.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Heat in a current-carrying cable is best described by:',
    options: [
      'Magnetic induction',
      'I²R losses (Joule heating)',
      'Capacitive reactance',
      'Frequency drift',
    ],
    correctAnswer: 1,
    explanation:
      "Joule heating: every conductor with resistance dissipates power = I²R as heat. Bigger I or bigger R = more heat. It's the underlying mechanism behind every cable rating, every fuse, every kettle element.",
  },
  {
    id: 2,
    question: 'Doubling the current in a cable does what to the heat dissipated?',
    options: [
      'No change',
      'Doubles it',
      'Quadruples it',
      'Halves it',
    ],
    correctAnswer: 2,
    explanation:
      "P = I²R. Square of two = four. That's why a small overload heats a cable disproportionately — and why protective devices have to act quickly above the rated current.",
  },
  {
    id: 3,
    question: 'Standard PVC cable insulation is rated for a maximum continuous temperature of:',
    options: [
      '90°C',
      '40°C',
      '120°C',
      '70°C',
    ],
    correctAnswer: 3,
    explanation:
      "70°C for PVC, 90°C for XLPE. Above the limit, the insulation softens and ages rapidly — a 10°C overrun roughly halves its remaining life.",
  },
  {
    id: 4,
    question: 'Why does grouping cables together reduce their current rating?',
    options: [
      "Bunched cables can't dissipate heat as well, so they run hotter for the same current",
      "Apply for supply upgrade, consider on-site generation, or implement load management",
      "A target for total primary energy consumption including generation and distribution losses",
      "To take reasonable care of themselves and others, and cooperate with employers",
    ],
    correctAnswer: 0,
    explanation:
      "Bunched cables share the same volume of air to dump heat into. Each cable is heating its neighbours. Cg in Appendix 4 derates the rating to keep insulation under its temperature limit.",
  },
  {
    id: 5,
    question: 'A circuit-protective device (fuse or MCB) trips on overload because:',
    options: [
      'Evaluating and prioritising risks by plotting likelihood against severity',
      'Current creates heat in the device, which triggers the trip mechanism above the rated value',
      'Activating event, Beliefs (about the event), Consequences (emotional and behavioural)',
      'Location, type, condition, pressure gauge reading (if applicable), seal integrity, and any damage or obstruction',
    ],
    correctAnswer: 1,
    explanation:
      "Fuse element melts (I²R heating in a deliberately weak link). MCB thermal element bends as I²R heat builds. Both are using the heating effect of current to disconnect before the cable insulation cooks.",
  },
  {
    id: 6,
    question: 'A loose terminal in a junction box typically causes:',
    options: [
      'After every practice test, with a formal review every 2-3 weeks',
      'Gradually increase lighting based on time of day',
      'High contact resistance, localised I²R heating and possible fire',
      'A solar system connected to the mains grid, exporting excess generation',
    ],
    correctAnswer: 2,
    explanation:
      "Loose joint = high local R. Same I, much bigger R at one point = a lot of heat in one spot. Browns insulation, melts plastic, can ignite materials nearby. Doesn't usually trip the protection because total circuit current is unchanged.",
  },
  {
    id: 7,
    question: 'BS 7671 Sections 525 and 526 between them cover:',
    options: [
      'Surge protection',
      'Earthing arrangements',
      'Special locations',
      'Voltage drop and connections',
    ],
    correctAnswer: 3,
    explanation:
      "525 = voltage drop. 526 = connections (durable continuity, mechanical strength, accessibility for inspection). Together they cover the two main thermal failure modes: long undersized runs and bad joints.",
  },
  {
    id: 8,
    question: 'Best initial response to a strong burning smell from a consumer unit:',
    options: [
      'Isolate the supply, lock-off, evacuate if heavy smoke, then investigate',
      'Only if trained, it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s safe to do so, you have the right extinguisher, and the fire is small',
      'Eliminate where possible, guard remaining hazards, train staff, provide PPE',
      'To provide fixed reference points for accurate positioning',
    ],
    correctAnswer: 0,
    explanation:
      "Safety first. Burning smell means insulation is already cooking, possibly arcing inside. Open the door of a unit that's actively faulting and you risk a flash. Isolate, lock-off, evacuate if smoke is significant, then make safe before opening up.",
  },
];

const faqs = [
  {
    question: "Why is I²R more dangerous than the current itself?",
    answer:
      "Squaring the current means small overloads matter more than they look. A cable rated at 32 A carrying 40 A (only 25% over) dissipates 56% more heat. That extra heat raises the conductor temperature, which raises the resistance (positive temp coefficient — see 3.3), which raises the heat again. Without protection, the cable cooks itself.",
  },
  {
    question: "What's a thermal camera actually showing me?",
    answer:
      "Infrared radiation from the surface of whatever it's pointed at. Hot spots on a consumer unit, terminal block or motor casing usually indicate higher local R — loose connection, undersized cable, blocked ventilation. Compare across similar circuits or phases; a single hot terminal in an otherwise-cool board is a red flag.",
  },
  {
    question: "Why do MCBs have different curves (B, C, D)?",
    answer:
      "Different load profiles. Type B trips fast on small overloads, fine for resistive and lighting. Type C tolerates the inrush of fluorescents, motors. Type D for heavy-inrush kit (welders, transformers). The trip mechanism still uses I²R heating to detect overload — the curve just changes how much short-term overload it tolerates before tripping.",
  },
  {
    question: "Does heat damage all cable types equally?",
    answer:
      "No. PVC ages noticeably above 70°C, going hard and brittle. XLPE has more headroom but still degrades above 90°C. Mineral insulation (MICC) is essentially indifferent to heat — that's why it's used on fire-alarm circuits that have to keep working in a fire.",
  },
  {
    question: "What's the link between thermal effects and the protection cascade?",
    answer:
      "Every protective device sits on the I²t curve of the cable it protects. The fuse/MCB has to trip before the cable's insulation reaches its thermal failure point. That's why 'discrimination' between devices uses I²t energy values — it's about the heat the cable can absorb before failing, not just instantaneous current.",
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
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 3
          </button>

          <PageHero
            eyebrow="Module 2 · Section 3 · Subsection 5"
            title="Thermal effects of current"
            description="Why current makes things hot — the I²R heating that runs your kettle, undersizes your cables, ages your insulation and starts your electrical fires. The single most important effect to understand for safe design."
            tone="emerald"
          />

          <TLDR
            points={[
              "Every conductor dissipates heat = I²R. Double the current, quadruple the heat. This is the basis of every cable rating in BS 7671.",
              "PVC cable insulation tops out at 70°C continuous; XLPE at 90°C. Beyond those temperatures, insulation ages fast and eventually fails.",
              "The most dangerous thermal failure on site isn't a long cable run — it's a loose terminal. Tiny contact resistance, big localised heating, real fire risk.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "State the heating effect P = I²R and explain why doubling current quadruples heat.",
              "List the maximum operating temperatures of common UK cable insulations (PVC, XLPE).",
              "Explain how Appendix 4 correction factors (ambient, grouping, thermal insulation) protect cables from overheating.",
              "Describe how fuses and MCBs use the heating effect to disconnect on overload.",
              "Recognise visual, smell and thermal-imaging signs of thermal damage on site.",
              "Cite BS 7671 §525 (voltage drop), §526 (connections) and Chapter 42 (protection against thermal effects) in design and inspection.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why current makes things hot</ContentEyebrow>

          <ConceptBlock
            title="Joule heating — the unavoidable side effect of current"
            plainEnglish="A drifting electron banging into atoms in the cable hands over a tiny bit of energy each time. Multiply by the trillions of electrons drifting per second and you get a measurable amount of heat."
            onSite="The kettle works because of I²R. So does the toaster, the immersion, the fan heater. Same physics that protects your cable also boils your tea."
          >
            <p>
              The same drifting electrons that make current also crash into the lattice of atoms
              they're moving through. Each collision transfers a tiny bit of kinetic energy to the
              atoms — they vibrate harder, the metal warms up. Bulk-up that effect across an
              entire conductor and you get noticeable heating.
            </p>
            <p>
              The maths is simple and brutal:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>P = I²R</strong> — power dissipated as heat in watts, given the current in
                amps and the resistance in ohms.
              </li>
              <li>
                <strong>The square is the sting.</strong> Double the current = four times the
                heat. Triple the current = nine times the heat. A 25% overload = 56% more heat.
              </li>
              <li>
                <strong>Energy over time</strong> = I²Rt, in joules. That's what a fuse element
                absorbs before it melts, and what a cable insulation absorbs before it fails. We
                call that I²t value the cable's "thermal energy".
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 423.1 (Protection against burns) (paraphrased)"
            clause="Excepting equipment for which a Harmonized Standard specifies a limiting temperature, an accessible part of fixed electrical equipment within arm’s reach shall not attain a temperature in excess of the appropriate limit stated in Table 42.1. Each such part of the fixed installation likely to attain under normal load conditions, even for a short period, a temperature exceeding the appropriate limit in Table 42.1 shall be guarded so as to prevent accidental contact."
            meaning={
              <>
                Chapter 42 is BS 7671's whole chapter on protection against thermal effects.
                Cables, accessories, equipment cases — all have temperature limits. The reg
                exists because we know how dangerous a touchable surface at 70°C+ is, and how
                quickly insulation degrades above its rated temp.
              </>
            }
            cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Chapter 42 Regulation 423.1 and Table 42.1 for the full text."
          />

          <InlineCheck {...checks[0]} />

          <SectionRule />

          <ContentEyebrow>How BS 7671 keeps cables under control</ContentEyebrow>

          <ConceptBlock
            title="Cable ratings are temperature limits in disguise"
            plainEnglish="A cable rated at 32 A isn't 'allowed to carry 32 A' — it's allowed to carry whatever current keeps the conductor under its insulation's temperature limit, in a defined installation method, at a defined ambient. The 32 A is the answer to that thermal sum."
          >
            <p>
              Every CSA in Appendix 4 has a tabulated current-carrying capacity (called Iz or It),
              based on:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                The conductor metal (copper or aluminium — different ρ).
              </li>
              <li>
                The insulation system (PVC = 70°C limit, XLPE = 90°C limit).
              </li>
              <li>
                The installation method (clipped direct, conduit, buried, in thermal insulation).
              </li>
              <li>
                A reference ambient temperature (usually 30°C in air, 20°C in ground).
              </li>
            </ul>
            <p>
              Change any of those and the cable's safe rating changes. Appendix 4 gives correction
              factors:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Ca</strong> — ambient temperature. Hot loft, boiler room, hot panel.
              </li>
              <li>
                <strong>Cg</strong> — grouping. Multiple cables sharing the same containment can't
                shed heat as well.
              </li>
              <li>
                <strong>Ci</strong> — thermal insulation. Cable in or on thermal insulation
                can't lose heat to the air around it.
              </li>
              <li>
                <strong>Cf</strong> — fuse / BS 3036 rewireable type protection (slower clearing).
              </li>
            </ul>
            <p>
              Multiply the tabulated current by the relevant factors to get the actual usable
              rating. Compare to the design current (Ib) — if it doesn't cover, upsize.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Protective devices — the safety net for I²R"
            onSite="The whole point of an MCB or fuse is to disconnect a circuit BEFORE the cable insulation reaches its thermal failure point. The trip curves are designed around exactly that."
          >
            <p>
              A fuse or MCB is using the heating effect of current to detect a fault:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS 88 fuses, BS 1361:</strong> a thin metal element melts when I²t
                exceeds the fuse's rating. Self-destructing — replace the cartridge after operation.
              </li>
              <li>
                <strong>BS 3036 rewireable fuse</strong> (the old porcelain type): same principle,
                a thin tinned wire that melts. Slower and less precise — Cf factor of 0.725 in
                Appendix 4 because they take longer to clear an overload.
              </li>
              <li>
                <strong>MCBs (BS EN 60898):</strong> two trip mechanisms. Thermal (bimetal strip
                that bends as it heats) for slow overloads; magnetic (solenoid that pulls the
                contacts apart) for fast short circuits. Type B / C / D have different magnetic
                trip thresholds for different load types.
              </li>
            </ul>
            <p>
              The match between protective device and cable is the foundation of the whole
              installation. Both are characterised by I²t curves; the device curve has to sit
              below the cable curve at every current level.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 522.1.1 (Ambient temperature)"
            clause="A wiring system shall be selected and erected so as to be suitable for the highest and lowest local ambient temperatures and so that the limiting temperature in normal operation (see Table 52.2) and the limiting temperature in case of a fault (see Table 43.1) will not be exceeded."
            meaning={
              <>
                The reg behind every Ca and Ci factor in Appendix 4. It’s the cable designer’s
                obligation to make sure the conductor never exceeds its limiting temperature
                (Table 52.2 — 70°C for PVC, 90°C for XLPE) under the ambient conditions it’s
                actually installed in. <strong>Appendix 4</strong> gives you the maths — Ca for
                ambient, Cg for grouping, Ci for thermal insulation, Cf for BS 3036 fuse —
                multiply through to get the corrected current-carrying capacity (Iz) and check it
                covers the design current (Ib).
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 522.1.1 (verbatim) and Appendix 4 (Ca/Cg/Ci/Cf correction factors)."
          />

          <InlineCheck {...checks[2]} />

          <VideoCard
            url={videos.electricHeating.url}
            title={videos.electricHeating.title}
            channel={videos.electricHeating.channel}
            duration={videos.electricHeating.duration}
            topic="Electric heating — the thermal effect of current · Unit 202 AC 4.8"
            caption="Useful animation of where I²R heating shows up — from kettles and toasters to overheating cables. The same principle in every example."
          />

          <InlineCheck {...checks[1]} />

          <SectionRule />

          <ContentEyebrow>Where it fails on site</ContentEyebrow>

          <ConceptBlock
            title="The thermal-runaway feedback loop — why small overloads escalate"
            plainEnglish="Hot conductors have higher resistance. Higher resistance means more I²R heat at the same current. More heat means more resistance. The cable can spiral upwards faster than common sense expects."
            onSite="A cable that's been sitting at 25 A for years and ‘never bothered anyone’ is the one that fails the day someone adds a 7 kW heater on a long extension lead. The extra current pushes it past its corrected rating; the temperature rises; the resistance rises; the loss climbs faster than linearly. By the time the smell reaches the kitchen, the insulation is already cooked."
          >
            <p>
              Three feedback effects that make thermal failures non-linear and surprising:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Positive temperature coefficient of copper</strong> (Sub3.3): copper's
                resistance rises by about 0.4% per °C. A conductor at 70°C has roughly 20% more
                resistance than the same one at 20°C. So I²R losses climb faster than the
                straightforward "I squared" tells you, because R is also rising.
              </li>
              <li>
                <strong>Insulation degradation</strong>: PVC ages roughly twice as fast for every
                10°C above its 70°C limit. A cable held at 80°C for ten years comes out as brittle
                as one held at 70°C for twenty. The damage is permanent — cooling it back down
                doesn't reverse it.
              </li>
              <li>
                <strong>Convection and radiation efficiency</strong>: a cable can dump heat to its
                surroundings only as fast as the temperature gradient lets it. Bury it in
                insulation, group it with other circuits, or run it in a hot ceiling void and the
                gradient narrows — so heat builds up, temperature rises, and the next loop of the
                feedback runs hotter still.
              </li>
            </ul>
            <p>
              The protective device's job is to break the loop before this snowballs. That's why
              the I²t curve of the MCB has to sit below the cable's thermal limit at every current
              level — not just at the overload trip threshold.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Why protective devices use I²t, not just current"
            plainEnglish="Cables and devices both store energy as heat over time. A short, big pulse of current can be safe; a longer, smaller current can be lethal. I²t — current squared multiplied by time — is the energy measure both sides agree on."
            onSite="The whole reason an MCB has a trip CURVE rather than a single threshold is I²t. A 32 A Type B MCB tolerates roughly 4× rated current for a few seconds (motor inrush) but trips almost instantly above ~5× (short-circuit). Both the device and the cable behind it are sized in I²t — the device's let-through energy must always be less than the cable's withstand energy."
          >
            <p>
              I²t (read "I-squared-t", units A²·s) is the energy proxy used to match protective
              devices to cables. Two key uses:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Cable withstand</strong> — a cable can absorb a defined amount of I²t before
                its insulation reaches the failure temperature. Bigger CSA = bigger withstand.
                BS 7671 Reg 434.5.2 gives the formula k²S² for the withstand energy of a conductor
                with CSA S and a material constant k (e.g. k = 115 for 70°C PVC copper).
              </li>
              <li>
                <strong>Device let-through</strong> — a fuse or MCB lets a certain amount of I²t
                through before clearing the fault. Manufacturer datasheets publish let-through
                curves (energy vs prospective fault current) for every device.
              </li>
            </ul>
            <p>
              The acceptance condition: <strong>device let-through I²t ≤ cable withstand I²t</strong>{' '}
              at the prospective fault current the install will see. Get this wrong and the cable
              cooks faster than the breaker clears — fire risk, even if the breaker is "rated"
              correctly on the simple amps test.
            </p>
            <p>
              For Level 2 you don't have to crunch the I²t arithmetic by hand. You do have to know
              that the sizing chain is{' '}
              <strong>cable Iz ≥ device In ≥ design current Ib</strong> AND that the device's
              let-through energy has to suit the cable. Both checks, every circuit.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Heat conduction, convection and radiation — where cable heat goes"
            plainEnglish="A loaded cable produces heat at I²R watts per second. To stop the temperature climbing forever, the same wattage has to leave the cable somehow. Three heat-transfer modes share that job — and which one dominates depends on where the cable is."
            onSite="A surface-clipped 6 mm² T&E in a cool room is mostly cooled by convection — air rising past the sheath. The same cable buried in loft insulation has almost no convection; it has to dump heat by conduction through the surrounding insulation, which is poor at it. That's why Ci can drop the rating to 50% or less."
          >
            <p>
              Three heat-transfer mechanisms for any current-carrying cable:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Conduction</strong> — heat travels through solids in contact (the
                conductor, insulation, sheath, then any thermal insulation around it). Rate
                depends on the materials' thermal conductivity. PVC and XLPE are poor conductors
                of heat; loft fibreglass is even worse.
              </li>
              <li>
                <strong>Convection</strong> — heat carried away by moving air. The dominant mode
                for cables clipped or laid in free air. Rising plumes of warm air over the cable
                continually replace with cooler air.
              </li>
              <li>
                <strong>Radiation</strong> — infrared energy emitted from the cable surface.
                Significant at higher operating temperatures (90°C+ XLPE), small for a 70°C PVC
                cable.
              </li>
            </ul>
            <p>
              Appendix 4's reference installation methods (clipped direct, in conduit, buried, in
              thermal insulation) are essentially a catalogue of heat-removal environments — each
              with a different mix of the three mechanisms. The current rating tabulated for each
              method is whatever current produces a steady-state cable temperature at exactly the
              insulation limit. Change the environment, and the rating changes — that's why the
              correction factors exist.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Joule heating put to useful work — heaters, kettles, immersions"
            plainEnglish="Same I²R that you fight on a cable is what runs every electric heater, kettle, immersion and toaster. Designed to be hot; the conductor IS the load."
            onSite="An immersion element is a coil of resistance wire (often nichrome) sized so that I²R = the rated wattage at the rated voltage. A 3 kW immersion at 230 V wants R ≈ 17.6 Ω (P = V²/R, so R = V²/P = 230²/3000). Measure that on a healthy element with a multimeter and you'll read close to 17 Ω cold."
          >
            <p>
              Useful applications of I²R heating across UK installs:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Immersion heaters</strong> — nichrome element rated to dissipate 3 kW (or
                similar) directly into the cylinder water. Cable feeding it is sized so it doesn't
                overheat; the element itself runs red-hot in air, safely transferring heat to
                water through the sheath.
              </li>
              <li>
                <strong>Storage heaters and electric panel heaters</strong> — same physics, lower
                power densities, often controlled by relay or TRIAC.
              </li>
              <li>
                <strong>Underfloor heating mats</strong> — long thin resistive cable laid in
                screed, sized for power per square metre (typically 100-200 W/m²). Same I²R, just
                spread out.
              </li>
              <li>
                <strong>Kettle and toaster elements</strong> — resistance wire designed to glow
                red when energised. Direct conversion of electrical energy to heat with
                near-100% efficiency (anything not radiated as heat ends up as heat anyway via
                convection / conduction in the surroundings).
              </li>
              <li>
                <strong>Electric showers</strong> — instantaneous heating of water passing over
                an element. 9 kW at 230 V means roughly 39 A through the element and a roughly 5
                Ω cold resistance.
              </li>
            </ul>
            <p>
              The line between "useful heater" and "fire risk" is just whether the heat is
              wanted. Same I²R both ways. The reason a cable rated at 32 A doesn't glow when
              loaded to 32 A is that the cable's resistance is tiny, so the I²R per metre is
              small. An immersion element's resistance is fifty thousand times bigger — same
              current, same physics, vastly different heat output.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The big three thermal failures you'll see"
            onSite="Old consumer units, especially backed up against thermal insulation in lofts. Outdoor sockets with corroded terminals. Spurs that have been added to over the years until the original cable can't cope. All thermal failures, all preventable."
          >
            <p>The patterns that come up again and again on EICRs:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Loose connections.</strong> The most common, by miles. Vibrations, thermal
                cycling, original install never properly torqued. Local R rises, I²R heat
                concentrates, terminal browns, eventually arcs.
              </li>
              <li>
                <strong>Bunched / insulated cables.</strong> A T&E run buried in loft insulation
                with no Ci factor applied. The cable can't shed heat. Insulation cooks slowly
                until it gives way. Often only spotted during a periodic.
              </li>
              <li>
                <strong>Overloaded sockets / circuits.</strong> Too many extension leads, multiple
                heaters on one ring, modern loads on circuits designed for 1970s usage. Not
                strictly an installation fault — but the symptoms are the same: hot accessories,
                blackened pins, melted plastic.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 526.1 (Connection factors list)"
            clause="Every connection between conductors or between a conductor and other equipment shall provide durable electrical continuity and adequate mechanical strength and protection. The selection of the means of connection shall take account of, as appropriate: (a) the material of the conductor and its insulation; (b) the conductor class, the number and shape of the wires forming the conductor; (c) the cross-sectional area of the conductor; (d) the number of conductors to be connected together; (e) the temperature attained at the terminals in normal service such that the effectiveness of the insulation of the conductors connected to them is not impaired; (f) the provision of adequate locking arrangements in situations subject to vibration or thermal cycling."
            meaning={
              <>
                The reg behind every "use the right terminal for the conductor" rule. Solid vs
                stranded, different metals, different CSAs — all need the right connector and the
                right torque. Get it wrong and you've engineered a high-resistance joint into the
                install.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 526.1."
          />

          <CommonMistake
            title="Using a thermal camera as the only check on connections"
            whatHappens={
              <>
                Apprentice does a "thermal survey" with a hire camera, sees nothing hot, ticks
                everything as fine. Three months later a CU terminal that wasn't loaded at the
                time of the survey is now running 25 A and starts cooking. Thermal imaging only
                sees what's hot RIGHT NOW.
              </>
            }
            doInstead={
              <>
                Thermal imaging is great as one diagnostic tool, but you need the load on for it
                to mean anything. Combine it with: physical torque-checks at install, periodic
                tightness checks, R1+R2 readings on EICRs (a creeping joint shows up as a slowly
                rising loop value), and visual inspection for discolouration.
              </>
            }
          />

          <Scenario
            title="Burning smell at the consumer unit"
            situation={
              <>
                Customer phones in: there's a 'plasticky burning smell' near the meter cupboard
                and the kitchen lights have started flickering. They've already turned the kettle
                off. You arrive 20 minutes later — smell is still there, no visible smoke.
              </>
            }
            whatToDo={
              <>
                Don't open the consumer unit live. Isolate at the main switch (or the cut-out fuse
                if you have to and the DNO allows). Lock-off. Let it cool for 10 minutes. Open up
                with safety glasses on, check for browning, melted plastic, blackened terminals.
                Most likely culprit: a loose neutral on a heavily loaded circuit dissipating tens
                of watts at one screw. Re-terminate properly to the manufacturer's torque, replace
                any damaged components, run a full IR + R1+R2 + Zs check before re-energising.
              </>
            }
            whyItMatters={
              <>
                Burning insulation is one step from arcing, which is one step from a fire that
                spreads to the joists. The smell is the install warning you while there's still
                time to fix it. Treat it as urgent.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Every conductor dissipates P = I²R as heat. The square is what makes overloads dangerous out of proportion.",
              "PVC = 70°C limit, XLPE = 90°C limit. Beyond those, insulation ages fast and eventually fails.",
              "Cable ratings in Appendix 4 are temperature limits expressed as currents. Apply Ca, Cg, Ci correction factors to get the real usable rating in your environment.",
              "Fuses and MCBs use I²R heating to detect overloads. The device's I²t curve has to sit below the cable's.",
              "The most common site failure is a loose terminal — high local R = concentrated heat = browned insulation, melted parts, eventual arcing.",
              "Trust your nose and eyes on EICRs. Discolouration, plastic-burning smell, melted terminals = isolate immediately and investigate.",
            ]}
          />

          <Quiz title="Thermal effects knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section3/3-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                3.4 Voltage drop
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section3/3-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.6 Chemical effects of current
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
