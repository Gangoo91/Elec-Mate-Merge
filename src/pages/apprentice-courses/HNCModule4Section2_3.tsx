/**
 * Module 4 · Section 2 · Subsection 3 — Thermal Constraints
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   The three derating factors a designer must compound: Ca (ambient), Cg (grouping)
 *   and Ci (thermal insulation), and how they multiply together to define the safe Iz.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  LearningOutcomes,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Thermal Constraints - HNC Module 4 Section 2.3';
const DESCRIPTION =
  'Understand cable derating factors for ambient temperature, grouping, and thermal insulation according to BS 7671 for building services installations.';

const quickCheckQuestions = [
  {
    id: 'ca-factor',
    question: 'What does the correction factor Ca account for?',
    options: [
      'The number of circuits grouped together',
      'Cables surrounded by thermal insulation',
      'The cross-sectional area of the conductor',
      'Ambient temperature different from 30°C',
    ],
    correctIndex: 3,
    explanation:
      'Ca is the ambient temperature correction factor. When ambient temperature exceeds the reference 30°C, cable current capacity must be reduced (Ca < 1) because less heat can dissipate from the cable.',
  },
  {
    id: 'cg-factor',
    question: 'What does the correction factor Cg account for?',
    options: [
      'Generator loads',
      'Grouping of cables together',
      'Ground conditions',
      'Galvanic protection',
    ],
    correctIndex: 1,
    explanation:
      'Cg is the grouping factor applied when multiple cables are installed together. Grouped cables cannot dissipate heat as effectively, so their current capacity must be reduced.',
  },
  {
    id: 'ci-factor',
    question: 'When must the Ci (thermal insulation) factor be applied?',
    options: [
      'When the ambient temperature exceeds 30°C',
      'When more than three circuits are grouped together',
      'When the cable is installed on a perforated tray',
      'When cables pass through or are surrounded by thermal insulation',
    ],
    correctIndex: 3,
    explanation:
      'Ci applies when cables are in contact with or surrounded by thermal insulation material (loft insulation, wall insulation). This severely restricts heat dissipation.',
  },
  {
    id: 'combined-factors',
    question: 'How are multiple correction factors combined?',
    options: [
      'Added together',
      'The lowest is used',
      'The highest is used',
      'Multiplied together',
    ],
    correctIndex: 3,
    explanation:
      'Correction factors are multiplied together: Iz = It × Ca × Cg × Ci. Each factor further reduces the effective current-carrying capacity.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A cable is installed where ambient temperature is 40°C. The Ca factor is 0.87. What does this mean?',
    options: [
      'The cable can carry 87% more current',
      'The cable can carry 87% of its tabulated current',
      'The ambient is 87% of maximum',
      'Voltage drop is reduced by 13%',
    ],
    correctAnswer: 1,
    explanation:
      "Ca = 0.87 means the cable's effective current capacity is 87% of the tabulated value. Higher ambient reduces the temperature difference available for heat dissipation.",
  },
  {
    id: 2,
    question:
      'Six circuits are grouped together in trunking. The grouping factor is 0.57. If each circuit needs 20A, what minimum It is required?',
    options: [
      '120A',
      '11.4A',
      '35.1A',
      '20A',
    ],
    correctAnswer: 2,
    explanation:
      'Minimum It = In / Cg = 20 / 0.57 = 35.1A. The tabulated current must be higher to compensate for reduced heat dissipation when grouped.',
  },
  {
    id: 3,
    question:
      'Why does the Ci factor for cables totally surrounded by thermal insulation equal 0.5?',
    options: [
      'Only half the cable is covered',
      'The insulation is 50% effective',
      "It's an arbitrary safety factor",
      'Heat dissipation is severely restricted',
    ],
    correctAnswer: 3,
    explanation:
      'Thermal insulation prevents heat from escaping. When totally surrounded, the cable can only carry 50% of its normal current to prevent dangerous overheating.',
  },
  {
    id: 4,
    question:
      'A cable runs through 400mm of thermal insulation in a ceiling void. What Ci factor applies?',
    options: [
      '0.5 (worst-case derating at the 400mm threshold)',
      '0.87 (same as a 40°C ambient correction)',
      '1.0 (no derating needed below 500mm)',
      '0.7 (same as four grouped circuits)',
    ],
    correctAnswer: 0,
    explanation:
      'For cables passing through insulation exceeding 400mm, Ci = 0.5 applies (same as totally surrounded). The 400mm is the threshold for worst-case derating.',
  },
  {
    id: 5,
    question:
      'In a plant room with 45°C ambient, what Ca factor applies to PVC cables (Table 4B1)?',
    options: [
      '0.87',
      '0.79',
      '1.0',
      '0.94',
    ],
    correctAnswer: 1,
    explanation:
      'From Table 4B1, for PVC cables at 45°C ambient: Ca = 0.79. Higher temperatures require greater derating than moderate increases.',
  },
  {
    id: 6,
    question: 'What reference ambient temperature do BS 7671 tables assume?',
    options: [
      '20°C',
      '25°C',
      '30°C',
      '35°C',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 Appendix 4 tables assume a reference ambient temperature of 30°C for cables installed in air. Higher ambients require Ca derating.',
  },
  {
    id: 7,
    question:
      'Three single-phase circuits in a conduit are grouped with three three-phase circuits. How many circuits for the grouping factor?',
    options: [
      '3 circuits',
      '12 circuits',
      '9 circuits (3 × 3-phase)',
      '6 circuits',
    ],
    correctAnswer: 3,
    explanation:
      'Count each multi-core cable or set of single-core cables forming one circuit as one circuit. Three single-phase + three three-phase = 6 circuits.',
  },
  {
    id: 8,
    question: 'Why do XLPE cables have different Ca factors than PVC cables?',
    options: [
      'XLPE has higher maximum operating temperature (90°C vs 70°C)',
      'Ensure they are the latest, stamped/dated copies',
      'Fast response time and high power capability',
      '3-5 years (standard) or 10-12 years (long-life)',
    ],
    correctAnswer: 0,
    explanation:
      'XLPE cables operate at 90°C compared to PVC at 70°C. The larger temperature margin means XLPE cables are less affected by elevated ambient temperatures.',
  },
  {
    id: 9,
    question:
      'A cable has It = 40A. Ca = 0.87, Cg = 0.7, Ci = 1.0. What is the effective capacity Iz?',
    options: [
      '40A',
      '24.4A',
      '65.7A',
      '27.8A',
    ],
    correctAnswer: 1,
    explanation:
      'Iz = It × Ca × Cg × Ci = 40 × 0.87 × 0.7 × 1.0 = 24.4A. Multiple factors compound to significantly reduce capacity.',
  },
  {
    id: 10,
    question: 'When cables are spaced by one cable diameter in a group, how does this affect Cg?',
    options: [
      'No improvement - same Cg applies',
      'Only applicable to single-core cables',
      'Cg improves to a higher value',
      'Grouping factor no longer applies',
    ],
    correctAnswer: 2,
    explanation:
      'Table 4C1 Note 4: When cables are spaced by at least one cable diameter, improved grouping factors apply because air circulation improves heat dissipation.',
  },
];

const faqs = [
  {
    question: 'What if a cable route passes through different ambient temperatures?',
    answer:
      'Apply the Ca factor for the highest ambient temperature along the entire route. The cable must be sized for the worst-case condition, even if most of the run is at normal temperature. Document the high-temperature section in design records.',
  },
  {
    question: 'Do I apply grouping factors to cables in separate compartments of trunking?',
    answer:
      'If there is no thermal barrier between compartments, apply grouping factors for all cables in the trunking. If there is a thermal barrier (metal partition), cables may be considered as separate groups. BS 7671 assumes thermal interaction unless properly segregated.',
  },
  {
    question: 'How do I handle cables partially in thermal insulation?',
    answer:
      'BS 7671 Table 52.2 provides Ci factors based on insulation length: 50mm = 0.89, 100mm = 0.81, 200mm = 0.68, 400mm = 0.55. For lengths exceeding 400mm or cables totally surrounded, use Ci = 0.5. Apply to the entire cable length.',
  },
  {
    question: 'Can I use different cable sizes to avoid heavy grouping derating?',
    answer:
      'The grouping factor applies regardless of individual cable sizes. However, cables installed on separate routes, different tray levels with spacing, or in separate conduits can be treated as separate groups with better Cg factors.',
  },
  {
    question: 'What about cables in hot plant rooms with grouped circuits?',
    answer:
      'Compound the factors: if ambient is 45°C (Ca = 0.79 for PVC) and six cables grouped (Cg = 0.57), combined factor = 0.79 × 0.57 = 0.45. A cable with It = 40A would have Iz = 18A - a significant reduction requiring larger cables.',
  },
  {
    question: 'Are correction factors applied before or after selecting the protective device?',
    answer:
      'Correction factors determine the minimum required tabulated current (It). The process is: select In ≥ Ib, then calculate minimum It = In / (Ca × Cg × Ci), then select cable with It ≥ minimum. The protective device is selected first based on load current.',
  },
];

const HNCModule4Section2_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2 · Subsection 3"
            title="Thermal Constraints"
            description="Understanding derating factors for ambient temperature, grouping and thermal insulation."
            tone="purple"
          />

          <TLDR
            points={[
              'Appendix 4 cable ratings are tabulated for an ambient of 30&nbsp;°C, single circuit, no thermal insulation. Real installations rarely match.',
              'C_a corrects for ambient temperature, C_g for grouping, C_i for thermal insulation, C_f for harmonics — all multiplied to give effective I_z.',
              'Plant rooms run 35–45&nbsp;°C in summer; ceiling voids 35–40&nbsp;°C with downlighters; risers grouped 6–12 circuits — every one of those eats capacity.',
              'A 70&nbsp;°C thermoplastic cable in 45&nbsp;°C ambient with 6 circuits grouped can lose 50%+ of its tabulated rating — design for the real environment.',
              'BS 7671 Reg 311.1 ties cable sizing to thermal limits; Reg 434.5.2 ties device characteristics to fault-current protection — both depend on honest derating.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 434.5.2 (Operating characteristic of fault-current protective device)"
            clause="Where Regulation 434.2.2 permits installation of the protective device on the supply side of a change, that device shall possess an operating characteristic such that it protects the wiring situated on the load side against fault current, in accordance with Regulation 434.5.2. See Regulation 434.5.2 for the detailed requirements on operating characteristics and protection levels."
            meaning={
              <>
                Reg 434.5.2 requires the protective device to clear a fault before the cable
                reaches its limiting temperature. That calculation (the &lsquo;adiabatic
                equation&rsquo; in Reg 434.5.2) uses the cable&rsquo;s real I_z — derated for
                ambient, grouping, thermal insulation and harmonic content. Skip a derating
                factor and the device may &lsquo;protect&rsquo; on paper but fail to clear the
                fault before insulation breakdown in reality.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 434.5.2; BS 7671 Appendix 4 (current-carrying capacity); Appendix 11 (harmonic effects)."
          />

          <LearningOutcomes
            outcomes={[
              'Apply ambient temperature correction factors (Ca) from BS 7671',
              'Determine and apply grouping factors (Cg) for multiple cables',
              'Apply thermal insulation factors (Ci) for insulated routes',
              'Calculate combined derating for complex installations',
              'Recognise situations requiring multiple correction factors',
              'Select cables accounting for all thermal constraints',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="Ambient Temperature Correction (Ca)">
            <p>
              Cable current ratings in BS 7671 are based on an ambient temperature of 30°C. When the
              surrounding air temperature differs, the correction factor Ca adjusts the cable's
              effective current-carrying capacity.
            </p>
            <p>
              <strong>Ambient temperature factors (Table 4B1) — ambient °C / PVC (70°C) / XLPE
              (90°C) / Mineral (70°C):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>25 / 1.03 / 1.02 / 1.03</li>
              <li>30 / 1.00 / 1.00 / 1.00</li>
              <li>35 / 0.94 / 0.96 / 0.94</li>
              <li>40 / 0.87 / 0.91 / 0.87</li>
              <li>45 / 0.79 / 0.87 / 0.79</li>
              <li>50 / 0.71 / 0.82 / 0.71</li>
              <li>55 / 0.61 / 0.76 / 0.61</li>
            </ul>
            <p>
              <strong>Typical high-temperature locations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Boiler rooms: 40-50°C</li>
              <li>Plant rooms: 35-45°C</li>
              <li>Kitchen extracts: 40-55°C</li>
              <li>Roof spaces (summer): 40-50°C</li>
              <li>Server rooms: 25-30°C (cooled)</li>
              <li>Cold stores: 0-5°C (Ca &gt; 1)</li>
            </ul>
            <p>
              <strong>XLPE advantage:</strong> At 50°C ambient, XLPE (Ca = 0.82) retains
              significantly more capacity than PVC (Ca = 0.71), making it preferred for hot
              locations.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Grouping Factors (Cg)">
            <p>
              When multiple cables are installed together, each cable's heat adds to its
              neighbours, reducing the ability to dissipate heat. The grouping factor Cg accounts
              for this mutual heating effect.
            </p>
            <p>
              <strong>Grouping factors (Table 4C1) — cables touching (no. circuits / bunched /
              single layer / perforated tray):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>1 / 1.00 / 1.00 / 1.00</li>
              <li>2 / 0.80 / 0.85 / 0.88</li>
              <li>3 / 0.70 / 0.79 / 0.82</li>
              <li>4 / 0.65 / 0.75 / 0.77</li>
              <li>6 / 0.57 / 0.73 / 0.73</li>
              <li>9 / 0.50 / 0.72 / 0.72</li>
              <li>12 / 0.45 / 0.70 / 0.70</li>
            </ul>
            <p>
              <strong>What counts as a 'circuit'?</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single-phase:</strong> one 2-core cable or L+N singles = 1 circuit
              </li>
              <li>
                <strong>Three-phase:</strong> one 3/4-core cable or L1+L2+L3(+N) singles = 1 circuit
              </li>
              <li>
                <strong>Ring final:</strong> count as 2 circuits (outgoing and return)
              </li>
              <li>
                <strong>Spare cables:</strong> do not count if not loaded
              </li>
            </ul>
            <p>
              <strong>Improving Cg factors:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Space cables by one diameter (Table 4C1 Note 4)</li>
              <li>Use perforated tray instead of solid</li>
              <li>Install in single layer not bunched</li>
              <li>Separate routes for high-current circuits</li>
            </ul>
            <p>
              <strong>Where Cg doesn't apply:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cables spaced &gt; 2× diameter apart</li>
              <li>Single cable run (obviously)</li>
              <li>Cables in separate conduits/trunking</li>
              <li>With adequate thermal barriers</li>
            </ul>
            <p>
              <strong>Design tip:</strong> For heavily grouped risers, consider XLPE cables on
              perforated tray to maximise capacity.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Thermal Insulation Correction (Ci)">
            <p>
              Thermal insulation material severely restricts heat dissipation from cables. When
              cables pass through or are surrounded by thermal insulation, significant derating is
              required to prevent dangerous overheating.
            </p>
            <p>
              <strong>Thermal insulation factors (Table 52.2) — cable position / length in
              insulation / Ci factor:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>In contact with surface / 50mm / 0.89</li>
              <li>In contact with surface / 100mm / 0.81</li>
              <li>In contact with surface / 200mm / 0.68</li>
              <li>In contact with surface / 400mm / 0.55</li>
              <li>Totally surrounded / any length / 0.5</li>
            </ul>
            <p>
              <strong>Critical — totally surrounded:</strong> A cable totally surrounded by thermal
              insulation can only carry 50% of its normal current. This applies to:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cables run through loft insulation laid over joists</li>
              <li>Cables in insulated cavity walls</li>
              <li>Cables enclosed by sprayed insulation</li>
              <li>Any route where cable is fully enclosed by thermal material</li>
            </ul>
            <p>
              <strong>Strategies to avoid severe Ci derating:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Route above insulation:</strong> clip cables to joists above loft insulation
              </li>
              <li>
                <strong>Use conduit/trunking:</strong> create air gap around cables
              </li>
              <li>
                <strong>Thermal barriers:</strong> install non-combustible board between cable and
                insulation
              </li>
              <li>
                <strong>Upsize cables:</strong> where unavoidable, select larger cable for required
                capacity
              </li>
            </ul>
            <p>
              <strong>Regulation:</strong> BS 7671 522.5 requires cables passing through thermal
              insulation to be suitably rated or protected.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Combined Derating Calculations">
            <p>
              In practice, multiple thermal constraints often apply simultaneously. The correction
              factors are multiplied together, potentially resulting in severe cumulative derating.
            </p>
            <p>
              <strong>Combined factor formula:</strong> Iz = It × Ca × Cg × Ci. Or rearranged for
              selection: Min It = In / (Ca × Cg × Ci).
            </p>
            <p>
              <strong>Combined factor examples (scenario / Ca / Cg / Ci / combined):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Standard conditions / 1.0 / 1.0 / 1.0 / 1.0</li>
              <li>3 cables in trunking / 1.0 / 0.70 / 1.0 / 0.70</li>
              <li>Plant room (40°C) + 4 cables / 0.87 / 0.65 / 1.0 / 0.57</li>
              <li>Loft (35°C) in insulation / 0.94 / 1.0 / 0.5 / 0.47</li>
              <li>Hot riser (45°C) + 6 cables / 0.79 / 0.57 / 1.0 / 0.45</li>
            </ul>
            <p>
              <strong>Worked example — hot plant room with grouping (32A MCB, 45°C ambient, 6
              circuits grouped, PVC cable):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ca (45°C PVC) = 0.79</li>
              <li>Cg (6 circuits bunched) = 0.57</li>
              <li>Ci = 1.0 (no thermal insulation)</li>
              <li>
                Combined factor = 0.79 × 0.57 × 1.0 = <strong>0.45</strong>
              </li>
              <li>
                Min It = 32 / 0.45 = <strong>71.1A</strong>
              </li>
              <li>Table 4D2A: need 16mm² cable (It = 76A)</li>
              <li>Severe derating requires much larger cable than 32A would suggest</li>
            </ul>
            <p>
              <strong>Cost consideration:</strong> The combined factor example above requires 16mm²
              for a 32A circuit. Consider XLPE (Ca = 0.87), better routing (lower Cg), or separate
              cable runs to reduce cable costs.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — domestic loft lighting circuit:</strong> A 6A lighting circuit
              runs through 300mm of loft insulation. Ambient 35°C in summer. What cable size?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ca (35°C) = 0.94</li>
              <li>Cg = 1.0 (single circuit)</li>
              <li>Ci (300mm through insulation) = interpolate ~0.60</li>
              <li>
                Combined = 0.94 × 1.0 × 0.60 = <strong>0.56</strong>
              </li>
              <li>
                Min It = 6 / 0.56 = <strong>10.7A</strong>
              </li>
              <li>Table 4D2A: 1.0mm² = 11A (marginal)</li>
              <li>1.5mm² provides adequate margin (14.5A)</li>
            </ul>
            <p>
              <strong>Example 2 — commercial riser:</strong> 8 × 63A three-phase circuits in a
              riser, ambient 35°C. XLPE/SWA on tray. What size?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Ca (35°C XLPE) = 0.96</li>
              <li>Cg (8 circuits, single layer tray) = 0.72</li>
              <li>Ci = 1.0</li>
              <li>
                Combined = 0.96 × 0.72 × 1.0 = <strong>0.69</strong>
              </li>
              <li>
                Min It = 63 / 0.69 = <strong>91.3A</strong>
              </li>
              <li>Table 4E2A Method E: 25mm² = 110A — 25mm² 4-core XLPE/SWA adequate</li>
            </ul>
            <p>
              <strong>Example 3 — comparing PVC vs XLPE:</strong> 50°C plant room, 4 circuits
              grouped. Compare cable sizes for 32A circuit.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>PVC cable:</strong> Ca = 0.71, Cg = 0.65 → combined = 0.46; min It = 32 /
                0.46 = 69.6A → need 16mm²
              </li>
              <li>
                <strong>XLPE cable:</strong> Ca = 0.82, Cg = 0.65 → combined = 0.53; min It = 32 /
                0.53 = 60.4A → need 10mm²
              </li>
              <li>XLPE allows smaller cable in hot environments</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Key correction factor tables:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Table 4B1:</strong> ambient temperature (Ca)
              </li>
              <li>
                <strong>Table 4C1:</strong> grouping factors (Cg)
              </li>
              <li>
                <strong>Table 52.2:</strong> thermal insulation (Ci)
              </li>
              <li>
                <strong>Table 4B2:</strong> ground temperature (buried cables)
              </li>
            </ul>
            <p>
              <strong>Building services best practice:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Survey ambient temperatures during hottest operation</li>
              <li>Design cable routes to minimise grouping where possible</li>
              <li>Use XLPE cables in plant rooms and risers</li>
              <li>Avoid routing through thermal insulation where practical</li>
              <li>Document all correction factors in design calculations</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Adding factors:</strong> they must be multiplied, not added
                </li>
                <li>
                  <strong>Forgetting partial insulation:</strong> even 50mm contact needs Ci
                </li>
                <li>
                  <strong>Wrong Cg arrangement:</strong> bunched vs single layer differ
                  significantly
                </li>
                <li>
                  <strong>Using summer ambient in winter:</strong> design for worst case (usually
                  hot)
                </li>
              </ul>
            }
            doInstead="Always multiply Ca × Cg × Ci, look up the actual installation arrangement (bunched / single layer / spaced) in Table 4C1, and design the cable for the hottest expected ambient and the worst-case insulation contact along the route."
          />

          <SectionRule />

          <Scenario
            title="Plant-room sub-mains — combining ambient, grouping and harmonic derating"
            situation={
              <>
                A plant room contains 8 grouped XLPE/SWA sub-main cables on a perforated tray,
                each feeding a different floor DB. Ambient 40&nbsp;°C in summer (poor ventilation,
                heat from boilers and chillers). Each cable carries a load with measured 25%
                3rd-harmonic content from LED lighting and IT.
              </>
            }
            whatToDo={
              <>
                C_a (40&nbsp;°C, 90&nbsp;°C XLPE) ≈ 0.91 (Appendix 4 Table 4B1). C_g (8 circuits
                grouped on tray) ≈ 0.52 (Table 4C1). 3rd harmonic 15–33%: Appendix 11 derate
                applies to neutral-loaded circuits — use the line-current rating without
                adjustment unless &gt; 33%, where the derating bites. Combined: I_z = I_t × 0.91
                × 0.52 = 0.47 × I_t. A 70&nbsp;mm² XLPE rated at 254&nbsp;A clipped becomes
                ≈ 119&nbsp;A in this environment. Document on the cable schedule and feed the
                derated I_z into the Reg 434.5.2 adiabatic check for fault-current protection.
              </>
            }
            whyItMatters={
              <>
                Grouping is the most-missed factor in real designs. A 100&nbsp;A MCB on a cable
                that has lost 50% of its capacity is a long-term fire risk — and the protective
                device&rsquo;s operating characteristic under Reg 434.5.2 has been calculated
                against the wrong I_z. Get the derating right at design, not after a fire
                investigator arrives.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Appendix 4 cable ratings assume 30&nbsp;°C ambient, single circuit, no thermal insulation — real installations almost never match.',
              'C_a corrects for ambient temperature; pick the right column for cable insulation type (70&nbsp;°C TP vs 90&nbsp;°C XLPE).',
              'C_g corrects for grouping — 6 cables grouped typically loses 40–45%, 9 cables loses 50%+.',
              'C_i applies when cables run through thermal insulation (loft, wall void, floor) — a single &lsquo;buried in insulation&rsquo; cable can lose 50%.',
              'C_f (Appendix 11) applies for 3rd-harmonic content above 33% — affects three-phase circuits with neutral loading.',
              'Multiply all applicable factors: I_z = I_t × C_a × C_g × C_i × C_f. Pick the combination that applies, do not just take the lowest.',
              'Reg 311.1 ties cable sizing to thermal limits; Reg 434.5.2 ties device characteristics to fault-current protection — both rely on honest I_z.',
              'Document every derating factor on the cable schedule for verification under Part 6 — auditors check the workings, not just the final figure.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section2-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Voltage drop calculations
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section2-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Short-circuit withstand
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section2_3;
