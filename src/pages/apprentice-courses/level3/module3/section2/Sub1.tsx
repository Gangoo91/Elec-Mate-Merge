/**
 * Module 3 · Section 2 · Subsection 1 — Electron theory and conductor properties (AC 2.1)
 * Maps to C&G 2365-03 / Unit 302 / LO2 / AC 2.1
 *   AC 2.1 — "explain the relationship between resistance, inductance, capacitance and impedance"
 *
 * Layered depth: 2357 Unit 609 ELTK08 / AC 4.1, 4.2, 4.3
 *   AC 4.1 — "describe the basic principles of electron theory"
 *   AC 4.2 — "differentiate between materials which are good conductors and insulators"
 *   AC 4.3 — "state the types and properties of different electrical cables"
 *
 * The L3 view of conductivity. Same atomic story as L2 but extended to band theory,
 * temperature coefficient and the cable-property table you'll use in design.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import OhmsCalculator from '@/components/apprentice-courses/OhmsCalculator';
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
import { CableCrossSection } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Electron theory and conductor properties | Level 3 Module 3.2.1 | Elec-Mate';
const DESCRIPTION =
  'L3 view of electron theory: free electrons, valence band, temperature coefficient α, and the cable property table that drives conductor selection.';

const checks = [
  {
    id: 'l3-m3-2-1-resistivity',
    question: 'Copper resistivity at 20 °C is approximately:',
    options: ['1.7 × 10⁻⁸ Ω·m', '2.8 × 10⁻⁸ Ω·m', '1.7 × 10⁻⁵ Ω·m', '1.7 × 10⁻¹¹ Ω·m'],
    correctIndex: 0,
    explanation:
      'Copper ρ ≈ 1.72 × 10⁻⁸ Ω·m at 20 °C. Aluminium is about 2.83 × 10⁻⁸ Ω·m — roughly 1.6× higher.',
  },
  {
    id: 'l3-m3-2-1-tempcoeff',
    question: "Copper's resistance at 60 °C compared with 20 °C, using α = 0.004 /°C:",
    options: [
      'Increases by ~16 %',
      'Decreases by ~16 %',
      'Doubles',
      'Stays the same',
    ],
    correctIndex: 0,
    explanation:
      'R_60 = R_20 × [1 + α × ΔT] = R_20 × [1 + 0.004 × 40] = R_20 × 1.16. So resistance increases by 16 %.',
  },
  {
    id: 'l3-m3-2-1-band',
    question: 'Why is silicon called a semiconductor?',
    options: [
      'It conducts perfectly at room temperature like a metal',
      'It has no electrons available to carry current at all',
      'Its energy band gap is small enough that doping or heat can free electrons into conduction',
      'Its resistance is completely independent of temperature',
    ],
    correctIndex: 2,
    explanation:
      "Silicon's valence-to-conduction band gap is around 1.1 eV — small enough that adding tiny amounts of phosphorus (n-type) or boron (p-type) shifts conductivity by orders of magnitude. That control is what every semiconductor device exploits.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A good conductor has:',
    options: [
      'A wide energy gap to the conduction band',
      'Many free electrons in the conduction band',
      'A full valence band and no free carriers',
      'A very high resistivity at room temperature',
    ],
    correctAnswer: 1,
    explanation:
      'Conductors have overlapping valence and conduction bands, so electrons are essentially free at room temperature. That low resistivity is why current passes easily.',
  },
  {
    id: 2,
    question: 'The temperature coefficient of resistance for copper is approximately:',
    options: [
      '+0.4 /°C',
      '−4 /°C',
      '+0.004 /°C',
      '−0.004 /°C',
    ],
    correctAnswer: 2,
    explanation:
      'Positive coefficient — resistance rises with temperature for metals. About +0.004 /°C means R rises 0.4 % per °C of temperature increase.',
  },
  {
    id: 3,
    question: 'Aluminium is preferred over copper for some applications because:',
    options: [
      'It has a much lower resistivity than copper',
      'It needs a smaller CSA than copper for the same current',
      'It terminates directly into brass without any treatment',
      'It is much lighter and cheaper for the same conductance',
    ],
    correctAnswer: 3,
    explanation:
      'Aluminium is roughly one-third the weight of copper for the same conductance, and cheaper per kg. Used on overhead lines, large feeders and busbars where weight and cost matter and the larger CSA is acceptable.',
  },
  {
    id: 4,
    question: 'The PVC sheath of a cable has a continuous operating limit of:',
    options: [
      '70 °C',
      '40 °C',
      '90 °C',
      '120 °C',
    ],
    correctAnswer: 0,
    explanation: 'Standard PVC: 70 °C continuous. XLPE goes to 90 °C; mineral insulation to 250 °C+.',
  },
  {
    id: 5,
    question: 'A 50 m run of 1.0 mm² copper. Resistance per metre at 20 °C ≈ 18 mΩ/m. Total resistance:',
    options: [
      '0.36 Ω',
      '0.9 Ω',
      '9 Ω',
      '1.8 Ω',
    ],
    correctAnswer: 1,
    explanation: '50 m × 18 mΩ/m = 900 mΩ = 0.9 Ω.',
  },
  {
    id: 6,
    question: "If the same 1.0 mm² cable warms from 20 °C to 70 °C in service, its resistance becomes (use α = 0.004 /°C):",
    options: [
      '0.72 Ω',
      '0.9 Ω',
      '1.08 Ω',
      '1.8 Ω',
    ],
    correctAnswer: 2,
    explanation: 'R_70 = 0.9 × [1 + 0.004 × 50] = 0.9 × 1.20 = 1.08 Ω. That extra 20 % shows up as voltage drop and I²R losses.',
  },
  {
    id: 7,
    question: 'Mineral insulated copper-clad cable (MICC) is preferred for:',
    options: [
      'Flexible appliance leads and trailing flex',
      'Cheap domestic ring final circuits',
      'Buried direct underground feeder runs only',
      'Fire-survival circuits like emergency lighting and alarm',
    ],
    correctAnswer: 3,
    explanation:
      'MICC ("Pyro") survives high temperatures and direct flame for long enough to keep fire-safety circuits operating during evacuation. Standard for sounders and emergency lighting in critical buildings.',
  },
  {
    id: 8,
    question: 'Insulators differ from conductors at the atomic level because:',
    options: [
      'Their electrons are tightly bound and the band gap to conduction is large',
      'Their valence and conduction bands overlap completely',
      'They contain many free electrons in the conduction band',
      'Their resistivity falls sharply as voltage increases',
    ],
    correctAnswer: 0,
    explanation:
      'In an insulator the valence band is full and the gap to the conduction band is wide (several eV). At normal voltages no electrons cross the gap, so essentially no current flows.',
  },
];

const faqs = [
  {
    question: 'Why does copper resistance increase with temperature, but a thermistor decrease?',
    answer:
      "Copper is a metal — at higher temperature the lattice vibrates more and electrons collide more often, raising resistance. Negative-temperature-coefficient thermistors are made from semiconductor ceramics; heating frees more carriers, lowering resistance. Same physics, different starting point.",
  },
  {
    question: 'Is the L2 simple "free electrons" model wrong then?',
    answer:
      "Not wrong, just simplified. At L3 you add the band-theory picture so semiconductor and superconductor behaviour makes sense. The L2 model still works for cable sizing and basic Ohm's Law; the L3 view explains why some materials do strange things.",
  },
  {
    question: 'What does α (alpha) mean on a cable datasheet?',
    answer:
      "Temperature coefficient of resistance, in /°C. R_T = R_20 × [1 + α × (T − 20)]. Use it when ambient or operating temperature is significantly different from 20 °C — typical on hot loft runs, plant rooms or buried cables in summer.",
  },
  {
    question: 'Why do we always use 20 °C as the reference?',
    answer:
      "It's the IEC standard reference temperature for resistance measurements. Megger continuity readings, manufacturer data and Appendix 4 tables are all referenced to 20 °C unless stated otherwise. Make sure you correct readings if the cable is hot or cold.",
  },
  {
    question: "What's a Class 2 / Class 5 conductor?",
    answer:
      "BS EN 60228 conductor classes describe construction. Class 1 = solid; Class 2 = stranded fixed wiring (T&E above 4 mm², SWA cores); Class 5 = flexible (appliance flex); Class 6 = extra-fine flex (welder leads, drum-reel). Higher class = more flexible, but needs the right termination (ferrule, bootlace) to avoid frayed strands.",
  },
  {
    question: 'How much does sheath colour matter?',
    answer:
      "For installation it's identification only. Black SWA is no different electrically from grey SWA. Where colour matters: BS 7671 §514 cores (brown/blue/green-yellow), Health-and-Safety hazard markers, and outdoor UV-stable variants which are usually black for UV resistance.",
  },
];

export default function Sub1() {
  useSEO(TITLE, DESCRIPTION);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module3-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 2
          </button>

          <PageHero
            eyebrow="Module 3 · Section 2 · Subsection 1"
            title="Electron theory and conductor properties"
            description="The L3 view of conductivity — band theory, temperature coefficient α, and the cable property table that drives conductor selection."
            tone="yellow"
          />

          <TLDR
            points={[
              'Conductors have free electrons in a partially filled conduction band; insulators have a wide gap to conduction; semiconductors sit in between.',
              'Resistance of metals rises with temperature (positive α). R_T = R_20 × [1 + α(T − 20)].',
              'Copper ρ ≈ 1.72 × 10⁻⁸ Ω·m at 20 °C; aluminium ≈ 2.83 × 10⁻⁸ Ω·m. Aluminium needs ~1.6× CSA for same conductance.',
              'Cable choice = current capacity × voltage drop × environment × fire performance. Each property has a BS EN standard behind it.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain conductor, insulator and semiconductor behaviour using the band-theory picture.',
              'Calculate resistance change with temperature using the temperature coefficient α.',
              'Compare conductor materials (copper, aluminium, mineral) for typical installations.',
              'Identify cable sheath and insulation systems by BS EN reference.',
              'Recognise BS EN 60228 conductor classes (Class 1, 2, 5, 6).',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Atoms, bands and free electrons</ContentEyebrow>

          <ConceptBlock
            title="Band theory — why some materials conduct and others don't"
            plainEnglish="Electrons in a solid sit in 'energy bands'. The valence band is filled; the conduction band is where electrons can move freely. The gap between them decides everything."
            onSite="You don't see this on the meter, but it's the why behind the cable property table. A copper conductor passes 32 A because its conduction band is essentially overlapping the valence band — electrons flow with no real activation energy."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Conductor (metal):</strong> conduction and valence bands overlap. Free
                electrons everywhere. Low resistivity.
              </li>
              <li>
                <strong>Insulator:</strong> wide gap (several electron-volts) between bands. No
                electrons in the conduction band at room temperature. High resistivity.
              </li>
              <li>
                <strong>Semiconductor:</strong> small band gap (~1 eV for silicon). At room
                temperature a few electrons cross by thermal energy; doping with phosphorus or
                boron massively boosts the carrier count.
              </li>
            </ul>
          </ConceptBlock>

          <CableCrossSection type="twin-and-earth" />

          <SectionRule />

          <ContentEyebrow>Temperature coefficient — α</ContentEyebrow>

          <ConceptBlock
            title="Resistance changes with temperature"
            plainEnglish="In a metal, hotter atoms vibrate more, so electrons collide more often. Resistance rises. The fractional rise per °C is the temperature coefficient of resistance, α."
          >
            <p>
              <strong>R<sub>T</sub> = R<sub>20</sub> × [1 + α × (T − 20)]</strong>
            </p>
            <p>Typical values:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Copper: α ≈ +0.004 /°C (+0.4 % per °C)</li>
              <li>Aluminium: α ≈ +0.0040 /°C</li>
              <li>Steel: α ≈ +0.0050 /°C</li>
              <li>Carbon: α slightly negative</li>
              <li>NTC thermistor: large negative α (used as inrush limiters)</li>
            </ul>
            <p>
              Worked example: a 1 mm² copper conductor 50 m long has R<sub>20</sub> = 0.9 Ω (from
              18 mΩ/m × 50 m). At 70 °C in service, R<sub>70</sub> = 0.9 × [1 + 0.004 × 50] = 0.9
              × 1.2 = 1.08 Ω. That 20 % rise feeds straight into voltage-drop calculations — which
              is why Appendix 4 tables build in a "fully loaded" temperature assumption.
            </p>
          </ConceptBlock>

          <div className="my-4">
            <ContentEyebrow>Try the calculator</ContentEyebrow>
            <OhmsCalculator />
          </div>

          <InlineCheck {...checks[0]} />
          <InlineCheck {...checks[1]} />
          <InlineCheck {...checks[2]} />

          <SectionRule />

          <ContentEyebrow>The cable property table</ContentEyebrow>

          <ConceptBlock
            title="Match cable to job using the property table"
            plainEnglish="Every cable type has a fixed set of properties: conductor material, conductor class, insulation, sheath, max temp, fire performance, BS EN reference. Pick the cable that matches every property your installation needs."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>6242Y (T&E, "twin and earth")</strong> — Cu Class 1 solid (≤4 mm²) or
                Class 2 stranded (≥6 mm²), PVC insulation 70 °C, PVC sheath, BS 6004. Domestic
                fixed wiring. Indoor only.
              </li>
              <li>
                <strong>SWA (steel-wire armoured)</strong> — Cu Class 2 stranded, XLPE insulation
                90 °C, PVC sheath inner and outer, steel armour as CPC, BS 5467 / BS 6724
                (LSF version). Outdoors, buried, plant rooms.
              </li>
              <li>
                <strong>FP200 / FP400 / FP PLUS</strong> — Cu Class 2, mica/glass insulation,
                LSZH sheath, BS 7629/BS 8434. Fire-rated for sounder, emergency lighting and BMS
                circuits in escape routes.
              </li>
              <li>
                <strong>MICC (mineral-insulated copper-clad)</strong> — solid Cu conductor in
                magnesium-oxide powder inside a copper sheath. BS EN 60702. Survives direct fire
                for 2-3 hours. Premium price.
              </li>
              <li>
                <strong>H07RN-F flex</strong> — Cu Class 5, EPR insulation, polychloroprene
                sheath. Heavy-duty rubber flex for outdoor extension leads, festoon lighting,
                industrial flexible feeds.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 521.1 (Selection of wiring systems)"
            clause="The type of wiring system shall be selected with reference to the description in Table 4A1 of Appendix 4 of BS 7671 and shall be appropriate for the conditions described in the design."
            meaning={
              <>
                You can't just pick a cable that has the right CSA. The selection process must
                match conductor material, insulation system and sheath chemistry to the
                installation method, ambient conditions and fire performance the design requires.
                Appendix 4 ties cable type to current-carrying capacity by reference method.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 521.1; Appendix 4 Table 4A1."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 524.1 (Cross-sectional area of conductors)"
            clause="The cross-sectional area of each conductor in a circuit shall be not less than the values given in Table 52.3, except as provided for extra-low voltage lighting installations according to Regulation 715.524.201."
            meaning={
              <>
                Conductor selection by resistivity and current-carrying capacity is bounded by a
                hard minimum CSA. Table 52.3 sets the floor: even on a tiny load, you can't drop
                below the tabulated minimum for the wiring-system type. The band-theory and
                resistivity work in this Sub explains <em>why</em> bigger CSA carries more
                current; Reg 524.1 is the regulation that stops you undershooting the floor.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 524.1; Table 52.3."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 522.1.1 (Ambient temperature)"
            clause="A wiring system shall be selected and erected so as to be suitable for the highest and lowest local ambient temperatures and so that the limiting temperature in normal operation (see Table 52.2) and the limiting temperature in case of a fault (see Table 43.1) will not be exceeded."
            meaning={
              <>
                The temperature coefficient α and the cable property table tie directly to this
                rule: pick a cable whose insulation limit (70 °C PVC, 90 °C XLPE, 250 °C MICC)
                stays within Table 52.2 across the worst-case ambient on the job, including hot
                lofts, plant rooms and buried summer ground. R<sub>T</sub> = R<sub>20</sub>(1 + αΔT)
                is the maths Reg 522.1.1 expects you to apply.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026, Regulation 522.1.1; Table 52.2; Table 43.1."
          />

          <ConceptBlock
            title="Resistivity ρ — the material number behind every conductor"
            plainEnglish="Resistivity is the resistance of a 1 m length of 1 m² cross-section of the material at 20 °C. Lower ρ = better conductor. The number is fixed for a pure material; alloys (brass, steel) have higher ρ than the pure metals they're made of."
            onSite="ρ goes straight into R = ρL/A. So the relative resistivities tell you instantly that aluminium needs about 1.6× the CSA of copper for the same resistance — which is why a 16 mm² Al SWA cable replaces a 10 mm² Cu T&E."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Silver</strong>: ρ ≈ 1.59 × 10⁻⁸ Ω·m (best conductor — too expensive for cables)</li>
              <li><strong>Copper</strong>: ρ ≈ 1.72 × 10⁻⁸ Ω·m (the standard for fixed wiring)</li>
              <li><strong>Aluminium</strong>: ρ ≈ 2.83 × 10⁻⁸ Ω·m (1.65× higher than Cu)</li>
              <li><strong>Brass</strong>: ρ ≈ 7 × 10⁻⁸ Ω·m (terminals and fittings only)</li>
              <li><strong>Steel</strong>: ρ ≈ 1.4 × 10⁻⁷ Ω·m (~8× Cu — armouring, structural)</li>
              <li><strong>Carbon</strong>: ρ ≈ 3.5 × 10⁻⁵ Ω·m (~2000× Cu — used in resistors, brushes)</li>
            </ul>
            <p>
              Sanity-check: copper resistance per metre at 1 mm² CSA = ρ/A = (1.72 × 10⁻⁸) / (10⁻⁶)
              = 0.0172 Ω/m. So 100 m of 1 mm² Cu has R ≈ 1.72 Ω. Memorise that single number — it
              lets you sanity-check any cable resistance answer in seconds.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Aluminium vs copper — the engineering trade-offs"
            plainEnglish="Aluminium is lighter, cheaper per kg, and resists atmospheric corrosion well — but it has higher resistivity, creeps under pressure (loose terminations), and forms a non-conductive oxide layer on the surface. Each property dictates where it can and can't be used."
          >
            <p>Engineering comparison for the same conductance (same R):</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>CSA</strong>: Al needs ~1.6× the area of Cu (e.g. 16 mm² Al ≈ 10 mm² Cu).</li>
              <li><strong>Mass</strong>: Al × 1.6 area but density is 1/3 of Cu → Al is ~55 % the mass for same conductance.</li>
              <li><strong>Cost</strong>: Al per kg ~25 % of Cu; for same conductance ~13 % of Cu cost — significant on long runs.</li>
              <li><strong>Termination</strong>: Al needs aluminium-rated terminals, antioxidant compound (NoAlOx) and re-torque after first thermal cycle. Direct Al-to-brass connections fail in months.</li>
              <li><strong>Allowed uses</strong>: overhead lines, large supply tails (16 mm² and above), busbars. NOT used in fine-strand flex or domestic ring finals.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Insulation systems — ratings and chemistry matter"
            plainEnglish="The insulation around the conductor sets the maximum operating temperature, the voltage rating, the fire performance and the chemical resistance. Pick the wrong insulation and the cable melts, flashes over or rots."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>PVC (polyvinyl chloride)</strong> — 70 °C continuous, 300/500 or 450/750 V, releases HCl on burning. Standard T&E.</li>
              <li><strong>XLPE (cross-linked polyethylene)</strong> — 90 °C continuous, 600/1000 V, slower flame spread. SWA cables.</li>
              <li><strong>EPR (ethylene-propylene rubber)</strong> — 90 °C continuous, very flexible, used in trailing flex (H07RN-F).</li>
              <li><strong>LSZH (low-smoke zero halogen)</strong> — same temperature class as the base polymer but releases no hydrogen halide on burning. Mandatory in escape routes per BS 7671 §422.</li>
              <li><strong>Mineral (MgO)</strong> — to 250 °C+, full fire-survival, 600 V class. MICC/Pyro.</li>
              <li><strong>Silicone</strong> — to 180 °C, used in heater leads and high-temperature plant.</li>
            </ul>
            <p>
              Higher temperature class = more current capacity for the same CSA (Appendix 4
              tables show this — 90 °C XLPE columns carry roughly 15 % more than 70 °C PVC).
              Don't terminate XLPE-rated cable into a 70 °C rated terminal — the terminal becomes
              the weak link and overheats.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Conductor classes (BS EN 60228)"
            plainEnglish="Same copper, different shape. Class describes the strand count and stiffness, which decides how the cable behaves in a terminal and a flex."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Class 1</strong> — solid conductor. Stiff, cheap, only used up to about
                4 mm² in fixed wiring.
              </li>
              <li>
                <strong>Class 2</strong> — stranded fixed wiring. SWA cores, T&E ≥6 mm², most
                singles.
              </li>
              <li>
                <strong>Class 5</strong> — flexible (multi-strand). Standard appliance flex,
                pendant cords.
              </li>
              <li>
                <strong>Class 6</strong> — extra flexible (very fine strands). Welder leads,
                cable drums, robot arm cables.
              </li>
            </ul>
            <p>
              Class 5 and 6 must be terminated with ferrules ("bootlace" terminals) to stop
              strands escaping the screw clamp. Direct-clamping fine strands is a common
              installation defect that fails an EICR.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Why current limits exist — heat balance in the cable"
            plainEnglish="Every conductor heats up when current flows (P = I²R). The cable's insulation sets the maximum continuous temperature it can stand. The current rating in Appendix 4 is the value at which steady-state heating just reaches the insulation limit at the assumed installation method and ambient temperature."
            onSite="A 1.5 mm² T&E inside foam insulation (Reference Method 100, A.4 §) is rated only ~13 A. The same cable clipped to a wall (Reference Method C) carries 19 A. Same copper, same insulation — different heat loss to the environment."
          >
            <p>
              Heat balance: P_in (I²R) = P_out (conduction + convection + radiation). When P_in
              exceeds P_out, the cable temperature rises until losses match. That equilibrium
              temperature must stay below the insulation limit (70 °C PVC, 90 °C XLPE, 250 °C
              mineral). Otherwise the insulation degrades, breakdown follows, and the cable
              eventually short-circuits.
            </p>
            <p>
              Derating factors C_a (ambient), C_g (grouping) and C_i (thermal insulation)
              multiply down the table value to give the actual safe current. A 32 A circuit
              tabled at 36 A but in a hot loft (C_a = 0.87) and grouped with three others (C_g =
              0.65): I_max = 36 × 0.87 × 0.65 = 20.4 A. The 32 A circuit is now overloaded — fail
              the design.
            </p>
          </ConceptBlock>

          <SectionRule />

          <CommonMistake
            title="Using cold-state resistance for hot-cable voltage drop"
            whatHappens={
              <>
                Apprentice measures continuity (R1+R2 cold) on a 50 m run = 0.9 Ω. Plugs into
                voltage-drop calc using 32 A: V_drop = I × R = 32 × 0.9 = 28.8 V. Reports 12.5 %
                drop, recommends 6 mm² upgrade. Wastes the customer\'s money.
              </>
            }
            doInstead={
              <>
                Cold continuity is for fault-loop checks; voltage drop in service uses the HOT
                cable. Either use Appendix 4 mV/A/m tables (already corrected for 70 °C operation)
                or apply the temperature coefficient: R_70 = 0.9 × 1.2 = 1.08 Ω → V_drop = 32 ×
                1.08 = 34.6 V. Either way, do the maths once with the right starting point.
              </>
            }
          />

          <Scenario
            title="Choosing a cable for an outdoor LED festoon to a marquee"
            situation={
              <>
                Customer wants an outdoor festoon for an event marquee 30 m from the supply, draws
                400 W of LEDs. Cable will be temporary, lying on grass, exposed to UV and possibly
                rain.
              </>
            }
            whatToDo={
              <>
                Property checklist:
                <br />
                — UV resistance: must withstand sunlight (rules out standard PVC outdoor).
                <br />
                — Mechanical: trodden on, dragged. Class 5 flex (not solid) so it bends.
                <br />
                — Voltage rating: 230 V outdoor — H07 (450/750 V) flex, not H05 (300/500 V).
                <br />
                — Sheath: polychloroprene (rubber) is UV stable.
                <br />
                Pick: <strong>H07RN-F 3-core 1.5 mm²</strong>. Class 5 stranded copper, EPR
                insulation, polychloroprene sheath. Supply via 30 mA RCD (BS 7671 §704 outdoor).
              </>
            }
            whyItMatters={
              <>
                A T&E run for the same job would crack within weeks of UV exposure and become a
                shock risk. Reading the cable property table is the difference between a safe
                temporary install and a customer prosecution.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Conductors have overlapping bands; insulators have a wide gap; semiconductors sit between with controllable conductivity.',
              'Metal resistance rises with temperature (α positive ~0.4 %/°C for copper). Use R_T = R_20 × [1 + α(T − 20)].',
              'Copper ρ ≈ 1.72 × 10⁻⁸ Ω·m; aluminium ≈ 1.6× higher → needs 1.6× CSA for same conductance.',
              'Cable selection = property table match: conductor class, insulation, sheath, fire performance, BS EN reference.',
              'BS EN 60228 conductor classes 1 (solid) → 2 (stranded fixed) → 5 (flex) → 6 (extra-fine flex).',
              'Always size cable for HOT operating resistance, not cold continuity test value.',
            ]}
          />

          <Quiz title="Electron theory and cables knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 1
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module3-section2-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.2 Resistance, resistivity and DC circuits
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
