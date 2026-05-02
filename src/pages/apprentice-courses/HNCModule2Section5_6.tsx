/**
 * Module 2 · Section 5 · Subsection 6 — Building Fabric Performance
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Surface and interstitial condensation, Glaser method, vapour control layers,
 *   U-values and thermal bridging — the moisture-and-fabric design competence
 *   underpinning Part L compliance and durable building envelopes.
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

const TITLE = 'Building Fabric Performance - HNC Module 2 Section 5.6';
const DESCRIPTION =
  'Understanding condensation analysis, interstitial condensation, moisture movement, and compliance with Building Regulations Part L and Part O.';

const quickCheckQuestions = [
  {
    id: 'dew-point',
    question: 'At what condition does condensation occur on a surface?',
    options: [
      'When air temperature reaches 0°C',
      'When surface temperature falls below air dew point',
      'When relative humidity reaches 50%',
      'When air pressure drops',
    ],
    correctIndex: 1,
    explanation:
      'Condensation occurs when a surface temperature drops below the dew point of the adjacent air. At the dew point, the air is saturated (100% RH) and water vapour condenses into liquid.',
  },
  {
    id: 'interstitial-location',
    question: 'Where does interstitial condensation typically occur in a wall?',
    options: [
      'On the warm internal surface',
      'At the outer edge of insulation or cold side',
      'In the centre of dense materials',
      'Only on glazing surfaces',
    ],
    correctIndex: 1,
    explanation:
      'Interstitial condensation occurs within the construction, typically where temperature drops below dew point - usually at the cold side of insulation or where vapour resistance is low.',
  },
  {
    id: 'vapour-barrier',
    question: 'Where should a vapour control layer (VCL) be positioned in a wall?',
    options: [
      'On the cold (external) side of insulation',
      'On the warm (internal) side of insulation',
      'In the middle of the wall',
      "Position doesn't matter",
    ],
    correctIndex: 1,
    explanation:
      'VCL should be on the warm side to prevent moisture-laden internal air penetrating the insulation before reaching its dew point. Placing it on the cold side would trap moisture.',
  },
  {
    id: 'part-l-u-value',
    question: 'What is the Part L 2021 maximum U-value for external walls in new dwellings?',
    options: ['0.35 W/m²K', '0.26 W/m²K', '0.18 W/m²K', '0.15 W/m²K'],
    correctIndex: 2,
    explanation:
      'Part L 2021 limits external wall U-value to 0.18 W/m²K for new dwellings. This is more stringent than previous versions (0.30 W/m²K). Notional building uses 0.18 W/m²K.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is dew point temperature?',
    options: [
      'The temperature at which water boils',
      'The temperature at which air becomes saturated with moisture',
      'The temperature at which ice forms',
      'The average daily temperature',
    ],
    correctAnswer: 1,
    explanation:
      'Dew point is the temperature at which air becomes saturated (100% RH) and water vapour begins to condense. It depends on the absolute moisture content of the air.',
  },
  {
    id: 2,
    question: 'What is the approximate vapour resistivity of plasterboard?',
    options: ['5 MN.s/g.m', '45-60 MN.s/g.m', '100-200 MN.s/g.m', '1500 MN.s/g.m'],
    correctAnswer: 1,
    explanation:
      'Plasterboard has relatively low vapour resistivity (45-60 MN.s/g.m). By comparison, polythene VCL is 1500+ MN.s/g.m, and mineral wool is only 5 MN.s/g.m.',
  },
  {
    id: 3,
    question: 'Which assessment method is used for interstitial condensation risk?',
    options: [
      'SAP calculation',
      'Glaser method (BS EN ISO 13788)',
      'TM52 overheating assessment',
      'CIBSE admittance method',
    ],
    correctAnswer: 1,
    explanation:
      'The Glaser method (Dewpoint method) in BS EN ISO 13788 analyses temperature and vapour pressure profiles through construction to identify condensation risk. More sophisticated methods include dynamic simulation.',
  },
  {
    id: 4,
    question: "What causes 'thermal bridging' in building construction?",
    options: [
      'Good insulation continuity',
      'Gaps in the vapour barrier',
      'Areas of higher thermal conductivity creating heat flow paths',
      'Excessive ventilation',
    ],
    correctAnswer: 2,
    explanation:
      'Thermal bridges are areas where insulation is reduced or bypassed (steel lintels, window frames, junctions), creating localised paths of higher heat flow and cold internal surfaces.',
  },
  {
    id: 5,
    question: "What is the 'temperature factor' (fRsi) used for?",
    options: [
      'Calculating U-value',
      'Assessing mould growth risk at thermal bridges',
      'Measuring air permeability',
      'Determining heating system size',
    ],
    correctAnswer: 1,
    explanation:
      'Temperature factor fRsi = (Tsi - Te)/(Ti - Te) measures how well a surface maintains temperature. fRsi > 0.75 (dwellings) indicates low mould risk at thermal bridges.',
  },
  {
    id: 6,
    question: 'What Part L 2021 limiting U-value applies to new flat roofs?',
    options: ['0.25 W/m²K', '0.18 W/m²K', '0.15 W/m²K', '0.11 W/m²K'],
    correctAnswer: 3,
    explanation:
      'Part L 2021 limits flat roof U-value to 0.11 W/m²K for new dwellings. Pitched roofs with insulation between and over rafters also have 0.11 W/m²K limit.',
  },
  {
    id: 7,
    question: 'Why might excessive insulation cause summer overheating?',
    options: [
      'Insulation generates heat',
      'Heat gains cannot escape, temperatures rise',
      'Insulation reduces ventilation',
      'It has no effect on summer conditions',
    ],
    correctAnswer: 1,
    explanation:
      'High insulation reduces heat loss in winter but also reduces ability to lose internal gains in summer. Combined with solar gains and low thermal mass, this can cause overheating.',
  },
  {
    id: 8,
    question: "What is the purpose of a 'breather membrane' in a wall?",
    options: [
      'Provides primary waterproofing',
      'Allows vapour to escape outward while preventing water ingress',
      'Acts as a vapour barrier',
      'Improves thermal insulation',
    ],
    correctAnswer: 1,
    explanation:
      'Breather membranes (vapour permeable but water resistant) on the cold side of insulation allow construction to dry outward while protecting against rain penetration. Essential for vapour-open wall build-ups.',
  },
  {
    id: 9,
    question: 'Which Building Regulations Part specifically addresses overheating in new homes?',
    options: [
      'Part L (Conservation of fuel and power)',
      'Part F (Ventilation)',
      'Part O (Overheating)',
      'Part C (Site preparation)',
    ],
    correctAnswer: 2,
    explanation:
      'Part O (Overheating), introduced in 2021, specifically requires new residential buildings to demonstrate overheating risk is acceptable, using either simplified or dynamic assessment methods.',
  },
  {
    id: 10,
    question: 'What is the primary concern with moisture in insulation materials?',
    options: [
      'Aesthetics only',
      'Reduced thermal performance and potential structural damage',
      'Increased fire risk only',
      'No significant concerns',
    ],
    correctAnswer: 1,
    explanation:
      'Moisture in insulation dramatically reduces thermal performance (water conducts heat 25× better than air), can cause decay of organic materials, corrosion of metals, and structural degradation.',
  },
  {
    id: 11,
    question: "What is meant by 'accredited construction details'?",
    options: [
      'Drawings approved by the architect',
      'Pre-approved junction details that demonstrate thermal bridge compliance',
      'Details listed in Building Regulations',
      'Construction drawings signed by BCO',
    ],
    correctAnswer: 1,
    explanation:
      'Accredited construction details are pre-calculated junction details with known psi-values (thermal bridge losses). Using these simplifies Part L compliance by avoiding bespoke thermal bridge calculations.',
  },
  {
    id: 12,
    question:
      'For Part L 2021 dwellings, what is the default value for thermal bridging (y-value)?',
    options: ['0.05 W/m²K', '0.08 W/m²K', '0.15 W/m²K', '0.25 W/m²K'],
    correctAnswer: 2,
    explanation:
      'The Part L default y-value is 0.15 W/m²K (added to elemental U-values). Using accredited details or thermal bridge calculations can achieve better values (0.05-0.08 typical with good details).',
  },
];

const faqs = [
  {
    question: 'How do I assess condensation risk in a proposed wall construction?',
    answer:
      'Use the Glaser method (BS EN ISO 13788): calculate temperature profile through wall using U-values and thermal resistances, then plot vapour pressure profile using vapour resistances. Where vapour pressure exceeds saturation pressure at any point, condensation occurs. Software tools like WUFI provide more accurate dynamic analysis.',
  },
  {
    question: 'When is a vapour control layer essential?',
    answer:
      "VCL is essential when: insulation is on the cold side of structure (internal insulation), construction has low vapour resistance on cold side, high internal humidity (swimming pools, commercial kitchens), or Glaser analysis shows condensation risk. Modern 'intelligent' membranes adjust resistance seasonally.",
  },
  {
    question: 'What causes mould growth on walls and ceilings?',
    answer:
      'Mould requires surface relative humidity above ~80% sustained over time. This occurs at thermal bridges (cold spots), corners with poor air circulation, behind furniture against cold walls, or in poorly ventilated bathrooms/kitchens. Solutions include improving insulation, adding ventilation, and heating appropriately.',
  },
  {
    question: 'How do Part L and Part O requirements interact?',
    answer:
      "Part L drives insulation, airtightness and lower heating demand. Part O ensures this doesn't cause summer overheating. Tension exists: large south-facing windows help passive solar gain (Part L) but increase overheating risk (Part O). Design must balance both - often requiring external shading or reduced glazing.",
  },
  {
    question: 'What is the difference between U-value and R-value?',
    answer:
      'U-value (W/m²K) is thermal transmittance - rate of heat flow per degree difference. Lower is better. R-value (m²K/W) is thermal resistance - the inverse. Higher is better. R = 1/U for an element. U-values are standard in UK/EU; R-values common in USA/Australia.',
  },
  {
    question: 'How do thermal bridges affect condensation risk?',
    answer:
      'Thermal bridges create localised cold internal surfaces where temperature may drop below dew point, causing surface condensation and mould. The temperature factor fRsi must exceed 0.75 (dwellings) or 0.80 (swimming pools) to avoid sustained high surface humidity.',
  },
];

const HNCModule2Section5_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 5 · Subsection 6"
            title="Building Fabric Performance"
            description="Condensation analysis, moisture control, and regulatory compliance for building envelopes."
            tone="purple"
          />

          <TLDR
            points={[
              'You distinguish surface condensation (treated by raising surface T or lowering RH) from interstitial condensation (treated by VCL position and assembly drying potential).',
              'You apply the Glaser method to plot vapour pressure profile through a build-up and identify the dew-point intersection.',
              'You position vapour control layers correctly: warm side of insulation in heating-dominant climates (UK).',
              'You verify U-values against Part L 2021 fabric backstops (wall ≤ 0.26, roof ≤ 0.16, floor ≤ 0.18 W/m²·K) and quantify thermal-bridging losses Ψ × L.',
            ]}
          />

          <RegsCallout
            source="Building Regulations 2010 — Approved Document L (Conservation of fuel and power) and Approved Document O (Overheating)"
            clause="Part L sets fabric U-value backstops, thermal-bridging Ψ-values and air-permeability targets for new and refurbished buildings; Part O addresses overheating risk for residential buildings via either a simplified or dynamic-thermal-modelling route."
            meaning={
              <>
                Parts L and O are the dominant fabric-performance regulators. As HNC engineer
                you balance them: a more airtight, heavily insulated envelope (Part L) can
                push the building toward overheating (Part O) — the design must satisfy
                both. Cite both Approved Documents in the fabric performance summary.
              </>
            }
            cite="Source: Building Regulations 2010, Approved Documents L and O — gov.uk; BS EN ISO 6946 — Building components — Thermal resistance and transmittance; BS EN ISO 13788 — Hygrothermal performance — Internal surface temperature and interstitial condensation."
          />

          <LearningOutcomes
            outcomes={[
              'Understand dew point and condensation mechanisms',
              'Apply Glaser method for interstitial condensation analysis',
              'Position vapour control layers correctly in constructions',
              'Calculate U-values and identify thermal bridges',
              'Apply Part L 2021 fabric requirements',
              'Balance Part L and Part O requirements for compliant design',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Condensation Fundamentals"
            plainEnglish="Condensation forms whenever a surface drops below the dew point of the air touching it. Knowing the dew point lets you predict where you'll get water and mould."
          >
            <p>
              Condensation occurs when moist air contacts a surface at or below its dew point
              temperature. Understanding the relationship between temperature, moisture content, and
              relative humidity is essential for preventing condensation problems in buildings.
            </p>
            <p>
              <strong>Key moisture concepts:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Dew point:</strong> Temperature at which air becomes saturated (100% RH)
              </li>
              <li>
                <strong>Vapour pressure:</strong> Partial pressure of water vapour in air (Pa)
              </li>
              <li>
                <strong>Saturation pressure:</strong> Maximum vapour pressure at given temperature
              </li>
              <li>
                <strong>Relative humidity:</strong> Actual vapour pressure / saturation pressure × 100%
              </li>
            </ul>
            <p>
              <strong>Types of condensation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Surface:</strong> Internal surfaces - cold surfaces, high humidity. Prevent with insulation, ventilation, heating
              </li>
              <li>
                <strong>Interstitial:</strong> Within construction - vapour reaching cold zone. Prevent with VCL on warm side
              </li>
              <li>
                <strong>Reverse:</strong> Cold side of VCL - summer drying inward. Prevent with variable permeability membranes
              </li>
            </ul>
            <p>
              <strong>Typical internal conditions:</strong> Occupied buildings typically have
              temperature 20-22°C, RH 40-60% (higher in kitchens/bathrooms). At 20°C and 50% RH,
              dew point is approximately 9°C. Any surface below 9°C will experience condensation.
            </p>
            <p>
              <strong>Mould risk:</strong> Mould can grow at sustained RH above 80% at the surface
              (not 100%). Cold spots at thermal bridges often reach this level before visible
              condensation occurs.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Interstitial Condensation Analysis"
            plainEnglish="Hidden condensation inside the wall is the dangerous one - you don't see it till the structure rots. The Glaser method tells you where the dew point lands inside your build-up."
          >
            <p>
              Interstitial condensation occurs within the building fabric, invisible until damage
              becomes apparent. The Glaser method (BS EN ISO 13788) analyses temperature and vapour
              pressure profiles to identify condensation planes within constructions.
            </p>
            <p>
              <strong>Glaser method principles:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Temperature profile:</strong> Calculated from layer resistances and boundary conditions
              </li>
              <li>
                <strong>Saturation pressure:</strong> Calculated from temperature at each layer interface
              </li>
              <li>
                <strong>Vapour pressure:</strong> Calculated from layer vapour resistances
              </li>
              <li>
                <strong>Condensation:</strong> Occurs where actual vapour pressure exceeds saturation
              </li>
            </ul>
            <p>
              <strong>Vapour resistance of common materials (vapour resistivity / typical resistance):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Mineral wool: 5 MN.s/g.m / 0.5 (100mm)</li>
              <li>Plasterboard (12.5mm): 45-60 MN.s/g.m / 0.6-0.8</li>
              <li>Brick (102.5mm): 25-100 MN.s/g.m / 2.5-10</li>
              <li>OSB (11mm): ~100 MN.s/g.m / ~1.1</li>
              <li>Polythene VCL (500 gauge): ~1500 MN.s/g.m / 100-250</li>
              <li>Foil-faced insulation: very high / 200+</li>
            </ul>
            <p>
              <strong>VCL position rule - the '5:1 rule':</strong> Vapour resistance on warm side
              should be at least 5× that on cold side to minimise interstitial condensation risk.
              This ensures most moisture vapour is blocked before reaching the dew point zone within
              the construction.
            </p>
            <p>
              <strong>Practical note:</strong> Some condensation may be acceptable if it evaporates
              during warmer periods. BS EN ISO 13788 checks annual accumulation - temporary
              condensation in winter may dry in summer.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Thermal Bridges and Moisture Risk"
            plainEnglish="Thermal bridges are weak points in the insulation - lintels, reveals, slab edges. They make local cold spots, which means condensation, mould, and extra heat loss."
          >
            <p>
              Thermal bridges are localised areas where heat flow is increased compared to the
              general construction. They cause cold internal surfaces, condensation/mould risk, and
              additional heat loss that must be accounted for in Part L calculations.
            </p>
            <p>
              <strong>Common thermal bridge locations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Junctions:</strong> Wall-floor, wall-roof, wall-wall corners
              </li>
              <li>
                <strong>Openings:</strong> Window/door reveals, lintels, cills
              </li>
              <li>
                <strong>Penetrations:</strong> Structural elements, services, fixings
              </li>
              <li>
                <strong>Geometry:</strong> External corners, balcony connections
              </li>
            </ul>
            <p>
              <strong>Temperature factor (fRsi):</strong> fRsi = (Tsi - Te) / (Ti - Te). Where Tsi
              = internal surface temp, Ti = internal air, Te = external air. Required: fRsi ≥ 0.75
              (dwellings), ≥ 0.80 (high humidity spaces).
            </p>
            <p>
              <strong>Thermal bridge heat loss (Psi-value, default ψ / good practice ψ in W/mK):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Wall-floor (ground): 0.16 / 0.04-0.08</li>
              <li>Wall-roof (eaves): 0.06 / 0.02-0.04</li>
              <li>Window jamb: 0.05 / 0.01-0.03</li>
              <li>Lintel (steel): 0.30 / 0.05-0.15</li>
              <li>Corner (external): 0.09 / 0.02-0.05</li>
            </ul>
            <p>
              <strong>y-value:</strong> The thermal bridging factor y = Σ(ψ × L) / ΣA adds to the
              average U-value. Part L default is 0.15 W/m²K; well-detailed buildings achieve
              0.05-0.08 W/m²K.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Part L and Part O Compliance"
            plainEnglish="Part L pushes you to insulate, seal, and reduce heating demand. Part O makes sure the result doesn't cook in summer. Both have to land at the same time."
          >
            <p>
              Part L (Conservation of fuel and power) sets minimum fabric standards and overall
              energy targets. Part O (Overheating) ensures that high insulation and airtightness
              don't cause summer discomfort. Designs must satisfy both simultaneously.
            </p>
            <p>
              <strong>Part L 2021 limiting U-values for new dwellings (limiting / notional):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>External wall: 0.26 / 0.18 W/m²K</li>
              <li>Floor (ground): 0.18 / 0.13 W/m²K</li>
              <li>Roof (pitched): 0.16 / 0.11 W/m²K</li>
              <li>Roof (flat): 0.18 / 0.11 W/m²K</li>
              <li>Windows: 1.6 / 1.2 W/m²K</li>
              <li>Doors: 1.6 / 1.0 W/m²K</li>
            </ul>
            <p>
              <strong>Part L key requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Target Fabric Energy Efficiency (TFEE)</li>
              <li>Target Primary Energy Rate (TPER)</li>
              <li>Max air permeability: 8 m³/h/m² @ 50Pa</li>
              <li>Thermal bridges: default y = 0.15 W/m²K</li>
            </ul>
            <p>
              <strong>Part O key requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Simplified method OR dynamic simulation</li>
              <li>Glazing limits by orientation</li>
              <li>Maximum g-values for glazing</li>
              <li>Minimum purge ventilation</li>
            </ul>
            <p>
              <strong>Balancing Part L and Part O:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Glazing trade-off:</strong> Large south windows aid solar gain (Part L) but risk overheating (Part O)
              </li>
              <li>
                <strong>Shading:</strong> External shading helps Part O; consider impact on daylighting and winter gains
              </li>
              <li>
                <strong>Ventilation:</strong> Part O purge requirements may exceed Part F minimums
              </li>
              <li>
                <strong>Thermal mass:</strong> Exposed mass helps Part O but requires architectural coordination
              </li>
            </ul>
            <p>
              <strong>Future proofing:</strong> Consider Part O assessment with future weather files
              (2050s) to ensure homes remain comfortable as climate warms. Adaptation measures may
              be needed.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Four sums covering dew point, fRsi at a window reveal, a y-value calculation from junction lengths, and a Part L wall U-value check."
          >
            <p>
              <strong>Example 1 - Dew point calculation:</strong> Room air is at 20°C and 50% RH.
              What is the minimum surface temperature to avoid condensation?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>At 20°C, saturation vapour pressure ≈ 2340 Pa</li>
              <li>Actual vapour pressure = 50% × 2340 = 1170 Pa</li>
              <li>Dew point (where 1170 Pa = saturation) ≈ <strong>9.3°C</strong></li>
              <li>Any surface below 9.3°C will experience condensation</li>
            </ul>
            <p>
              <strong>Example 2 - Temperature factor:</strong> At a window reveal, surface
              temperature is 12°C when internal air is 20°C and external is -5°C. Calculate fRsi
              and assess mould risk.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>fRsi = (Tsi - Te) / (Ti - Te)</li>
              <li>fRsi = (12 - (-5)) / (20 - (-5)) = 17 / 25 = <strong>0.68</strong></li>
              <li><strong>FAIL:</strong> fRsi = 0.68 &lt; 0.75 required for dwellings</li>
              <li>High mould risk at this junction - needs improved detail</li>
            </ul>
            <p>
              <strong>Example 3 - Thermal bridge contribution:</strong> A house has perimeter
              junctions totalling 80m with ψ = 0.12 W/mK, and total envelope area 300m². Calculate
              the y-value contribution.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Thermal bridge loss = Σ(ψ × L) = 0.12 × 80 = 9.6 W/K</li>
              <li>y-value = Σ(ψ × L) / ΣA = 9.6 / 300 = <strong>0.032 W/m²K</strong></li>
              <li>GOOD: Well below default 0.15 W/m²K</li>
              <li>Good junction detailing significantly improves overall fabric performance</li>
            </ul>
            <p>
              <strong>Example 4 - Wall U-value check:</strong> A cavity wall has U-value 0.24
              W/m²K. Does it meet Part L 2021 for a new dwelling?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Part L limiting U-value for walls = 0.26 W/m²K</li>
              <li>Part L notional building value = 0.18 W/m²K</li>
              <li>0.24 &lt; 0.26 → <strong>PASS limiting requirement</strong></li>
              <li>0.24 &gt; 0.18 → Worse than notional - must compensate elsewhere</li>
              <li>Increase insulation to 0.18 or improve other elements</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The headline U-values, vapour rules and bridge factors you'll quote when checking compliance and condensation risk."
          >
            <p>
              <strong>Essential concepts:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>VCL on warm side:</strong> 5:1 resistance ratio warm:cold
              </li>
              <li>
                <strong>fRsi ≥ 0.75:</strong> Minimum temperature factor for dwellings
              </li>
              <li>
                <strong>y-value:</strong> Thermal bridging addition to U-values
              </li>
              <li>
                <strong>Part L notional:</strong> Target performance for compliance
              </li>
            </ul>
            <p>
              <strong>Key U-values (Part L 2021 limiting):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                External walls: <strong>0.26 W/m²K</strong>
              </li>
              <li>
                Roof: <strong>0.16-0.18 W/m²K</strong>
              </li>
              <li>
                Floor: <strong>0.18 W/m²K</strong>
              </li>
              <li>
                Windows: <strong>1.6 W/m²K</strong>
              </li>
              <li>
                Air permeability: <strong>8 m³/h/m² @ 50Pa</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>VCL on wrong side:</strong> Cold side VCL traps moisture
                </li>
                <li>
                  <strong>Ignoring thermal bridges:</strong> Default y=0.15 may understate reality
                </li>
                <li>
                  <strong>Part O afterthought:</strong> Consider overheating from concept stage
                </li>
                <li>
                  <strong>Forgetting ventilation:</strong> Airtight buildings need controlled ventilation
                </li>
              </ul>
            }
            doInstead="Always put the VCL on the warm side, calculate y-values from real junction details rather than relying on the default, design for Part O alongside Part L from concept, and pair very airtight builds with controlled (often MVHR) ventilation."
          />

          <SectionRule />

          <Scenario
            title="Glaser-method check on a renovated solid-wall Victorian terrace"
            situation={
              <>
                A Victorian solid-brick terrace is having internal wall insulation (IWI) fitted
                under a Cat-A refurb. The contractor proposes 60 mm PIR boards behind a
                vapour-permeable plaster finish, no separate VCL. You are asked to verify
                the build-up against interstitial condensation risk.
              </>
            }
            whatToDo={
              <>
                Plot the temperature profile through the build-up at design winter conditions
                (-3 °C external, 21 °C internal, 50% RH internal). Plot the vapour
                pressure profile and the saturation vapour pressure curve. Where the two
                cross, condensation risk exists. If the cross is inside the PIR layer or at
                the brick-PIR interface, recommend either: (a) reducing internal RH via MVHR;
                (b) switching to vapour-open wood-fibre insulation that can buffer; or
                (c) adding an intelligent VCL with variable Sd-value.
              </>
            }
            whyItMatters={
              <>
                Solid-wall IWI without proper hygrothermal design causes hidden interstitial
                condensation, slow timber rot in floor joists embedded in the external wall,
                and mould growth on cold spots. Damage often appears years after handover —
                long after defects liability has expired, but well within the 15-year
                Building Safety Act liability window.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Surface condensation: surface T &lt; air dew point — fix by raising surface T (insulation) or lowering RH (ventilation).',
              'Interstitial condensation: vapour pressure inside the build-up exceeds saturation at the local temperature.',
              'Glaser method: plot temperature, vapour pressure and saturation vapour pressure profiles; intersections = risk.',
              'Vapour control layer (VCL): warm side of insulation in heating-dominant UK climate.',
              'U-value method: BS EN ISO 6946 — sum series resistances of layers + surface resistances.',
              'Thermal-bridge Ψ-value × length L gives additional heat loss to add to U × A.',
              'Part L 2021 backstops: wall ≤ 0.26, roof ≤ 0.16, floor ≤ 0.18, window ≤ 1.4 W/m²·K (typical).',
              'Part O overheating must be satisfied alongside Part L energy — design to both, never trade one off against the other.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section5-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Thermal comfort
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Applied building services science
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section5_6;
