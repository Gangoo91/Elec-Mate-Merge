/**
 * Module 2 · Section 1 · Subsection 5 — Thermal Bridging
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Linear (psi) and point (chi) thermal bridges at fabric junctions and service
 *   penetrations. Y-value, condensation risk and the difference between &ldquo;ideal&rdquo;
 *   and &ldquo;as-built&rdquo; U-values.
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
  SectionRule,
  FAQ,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Thermal Bridging - HNC Module 2 Section 1.5';
const DESCRIPTION =
  'Understand thermal bridging in building services: linear and point thermal bridges, psi and chi values, condensation risks, and mitigation strategies for building services junctions.';

const quickCheckQuestions = [
  {
    id: 'psi-value-unit',
    question: 'What is the SI unit for linear thermal transmittance (psi value)?',
    options: [
      'W/mK',
      'W/K',
      'mK/W',
      'W/m²K',
    ],
    correctIndex: 0,
    explanation:
      'Linear thermal transmittance (ψ - psi) is measured in W/mK (Watts per metre Kelvin). It represents the additional heat loss per metre length of the thermal bridge per degree temperature difference.',
  },
  {
    id: 'chi-value-unit',
    question: 'What is the SI unit for point thermal transmittance (chi value)?',
    options: [
      'W/mK',
      'W/m²K',
      'W/K',
      'mK/W',
    ],
    correctIndex: 2,
    explanation:
      'Point thermal transmittance (χ - chi) is measured in W/K (Watts per Kelvin). It represents the additional heat loss at a single point per degree temperature difference.',
  },
  {
    id: 'condensation-risk',
    question:
      'At what relative humidity does surface condensation typically occur on cold surfaces?',
    options: [
      '100%',
      '80%',
      '50%',
      '70%',
    ],
    correctIndex: 0,
    explanation:
      'Condensation occurs when the relative humidity at a surface reaches 100% (saturation). However, to avoid mould growth risk, surface relative humidity should be kept below 80%.',
  },
  {
    id: 'acd-purpose',
    question: 'What is the primary purpose of Accredited Construction Details (ACDs)?',
    options: [
      'To provide standardised solutions that minimise thermal bridging',
      'To set the maximum U-value allowed for external walls',
      'To specify the fire resistance period of a junction',
      'To define the sound insulation between dwellings',
    ],
    correctIndex: 0,
    explanation:
      'ACDs provide pre-calculated, standardised construction details with known psi values. Using ACDs ensures compliance with Part L and reduces the need for bespoke thermal bridge calculations.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is a thermal bridge?',
    options: [
      'A section of cable carrying a higher current than the rest of the circuit',
      'An area of building fabric with higher thermal transmittance than surrounding elements',
      'A structural beam that spans an opening in a wall',
      'A duct that carries warm air between two rooms',
    ],
    correctAnswer: 1,
    explanation:
      'A thermal bridge (or cold bridge) is an area of the building fabric that has significantly higher thermal transmittance than the surrounding materials, creating a localised pathway for heat loss.',
  },
  {
    id: 2,
    question:
      'A window-to-wall junction has a psi value of 0.05 W/mK. If the total perimeter is 12m and ΔT is 20K, what is the heat loss through this junction?',
    options: [
      '60W',
      '0.6W',
      '12W',
      '6W',
    ],
    correctAnswer: 2,
    explanation:
      'Heat loss = ψ × L × ΔT = 0.05 W/mK × 12m × 20K = 12W. This is the additional heat loss beyond what is calculated from the window and wall U-values alone.',
  },
  {
    id: 3,
    question: 'Which of the following is NOT a common location for linear thermal bridges?',
    options: [
      'Window reveals',
      'Wall-to-floor junctions',
      'Lintels above openings',
      'Centre of a cavity wall',
    ],
    correctAnswer: 3,
    explanation:
      'The centre of a properly constructed cavity wall is not typically a thermal bridge location. Thermal bridges occur at junctions, around openings, and where insulation continuity is broken.',
  },
  {
    id: 4,
    question: 'What does the temperature factor (fRsi) indicate?',
    options: [
      'The risk of surface condensation at a thermal bridge',
      'The U-value of the wall away from any junction',
      'The air permeability of the whole building',
      'The total heat loss through the windows',
    ],
    correctAnswer: 0,
    explanation:
      'The temperature factor (fRsi) indicates the ratio of temperature difference between the internal surface and outside air to the total temperature difference. Values below 0.75 indicate high condensation risk.',
  },
  {
    id: 5,
    question:
      'A steel beam penetrating the thermal envelope has a chi value of 0.15 W/K. With an inside-outside temperature difference of 25K, what is the heat loss?',
    options: [
      '0.375W',
      '3.75W',
      '37.5W',
      '6W',
    ],
    correctAnswer: 1,
    explanation:
      'Heat loss = χ × ΔT = 0.15 W/K × 25K = 3.75W. Point thermal bridges are calculated directly without considering length.',
  },
  {
    id: 6,
    question:
      'What is the minimum temperature factor (fRsi) required to avoid mould growth risk in UK residential buildings?',
    options: [
      '0.65',
      '0.70',
      '0.75',
      '0.80',
    ],
    correctAnswer: 2,
    explanation:
      'BRE IP 1/06 recommends a minimum fRsi of 0.75 to avoid mould growth risk. This corresponds to keeping the surface temperature above the dew point at normal internal conditions.',
  },
  {
    id: 7,
    question: 'Which building services element commonly creates point thermal bridges?',
    options: [
      'Internal lighting circuits run within a ceiling void',
      'Socket outlets mounted on an internal partition',
      'Surface-mounted trunking on an internal wall',
      'Wall fixings for cable trays penetrating insulation',
    ],
    correctAnswer: 3,
    explanation:
      'Wall fixings, brackets, and supports that penetrate insulation create point thermal bridges. Each fixing provides a direct heat loss path through the thermal envelope.',
  },
  {
    id: 8,
    question:
      'In SAP calculations, what y-value is used when Accredited Construction Details are adopted?',
    options: [
      'y = 0.05',
      'y = 0.10',
      'y = 0.15',
      'y = 0.08',
    ],
    correctAnswer: 0,
    explanation:
      'When ACDs are fully adopted, a y-value of 0.05 W/m²K can be used. The default y-value without detailed assessment is 0.15 W/m²K, so ACDs provide significant benefit.',
  },
  {
    id: 9,
    question: 'What is the primary cause of condensation at thermal bridges?',
    options: [
      'Increased surface temperature above the dew point',
      'Reduced surface temperature below dew point',
      'A rise in the external air temperature',
      'A reduction in internal relative humidity',
    ],
    correctAnswer: 1,
    explanation:
      'At thermal bridges, the internal surface temperature drops because heat escapes more rapidly. When this temperature falls below the dew point of the internal air, water vapour condenses on the surface.',
  },
  {
    id: 10,
    question:
      'Which mitigation strategy is most effective for cable tray penetrations through external walls?',
    options: [
      'Using a larger cable tray to spread the heat loss',
      'Leaving the penetration open for ventilation',
      'Installing thermal break sleeves and sealing around penetrations',
      'Painting the cable tray a light colour',
    ],
    correctAnswer: 2,
    explanation:
      'Thermal break sleeves (such as neoprene or EPDM) combined with proper sealing minimise both heat loss and air leakage at service penetrations. This maintains the thermal envelope integrity.',
  },
];

const faqs = [
  {
    question: 'How do thermal bridges affect building energy performance?',
    answer:
      'Thermal bridges can account for 20-30% of total fabric heat loss in well-insulated buildings. As U-values improve, the relative impact of thermal bridging increases. This heat loss must be compensated by the heating system, increasing energy consumption and carbon emissions. Part L requires thermal bridging to be accounted for in calculations.',
  },
  {
    question: 'What is the difference between repeating and non-repeating thermal bridges?',
    answer:
      'Repeating thermal bridges occur regularly throughout an element (like mortar joints or wall ties) and are included in U-value calculations. Non-repeating thermal bridges occur at specific locations (junctions, around openings) and must be calculated separately using psi and chi values. Building Regulations focus primarily on non-repeating bridges.',
  },
  {
    question: 'How do I identify potential thermal bridges in building services installations?',
    answer:
      'Look for any service that penetrates or is fixed to the thermal envelope: external cable entries, flue penetrations, duct connections, fixings for external equipment, and support brackets. Any continuous metal element (like a cable tray) that crosses the insulation layer creates a thermal bridge. Consider using thermal imaging during design reviews.',
  },
  {
    question: 'What are the consequences of ignoring thermal bridging in design?',
    answer:
      'Beyond increased heat loss, thermal bridges cause localised cold spots that lead to surface condensation. This promotes mould growth, affecting indoor air quality and occupant health. Persistent dampness can cause staining, material degradation, and structural damage. Addressing thermal bridges post-construction is far more expensive than designing them out initially.',
  },
  {
    question: 'How do Part L 2021 and Part O interact regarding thermal bridging?',
    answer:
      'Part L requires minimising thermal bridges to reduce heat loss and carbon emissions. Part O addresses overheating risk. Well-detailed thermal bridges (with good fRsi values) help maintain consistent internal surface temperatures, reducing cold spots in winter without significantly affecting summer overheating risk. Both regulations benefit from continuous insulation strategies.',
  },
  {
    question: 'Can thermal imaging detect thermal bridges?',
    answer:
      'Yes, infrared thermography is excellent for identifying thermal bridges in existing buildings. During heating season, thermal bridges appear as warm patches on external surfaces or cold spots internally. Building services engineers often use thermal imaging during commissioning to verify that service penetrations have been properly sealed and insulated.',
  },
];

const HNCModule2Section1_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 2 · Section 1 · Subsection 5"
            title="Thermal Bridging"
            description="Understanding heat loss pathways at building fabric junctions and service penetrations."
            tone="purple"
          />

          <TLDR
            points={[
              'You will identify thermal bridges at every fabric junction (corners, eaves, lintels, sills, services penetrations) and quantify them using the linear (psi, W/m·K) and point (chi, W/K) coefficients.',
              'You apply BR 443 / BRE IP 1/06 default psi values, or commission a Therm/HEAT3 numerical calculation where the standard junction does not match the design.',
              'You apply the SAP / SBEM y-value (default 0.15 W/m²·K, or 0.05 with Approved Construction Details) — and you know what the difference is worth in compliance terms.',
              'You analyse condensation risk at low surface temperatures using the temperature factor f_Rsi against the BS EN ISO 13788 minimum.',
            ]}
          />

          <RegsCallout
            source="Building Regulations 2010 — Approved Document L (thermal bridging)"
            clause="The contribution of thermal bridges to fabric heat loss must be assessed. Where Approved Construction Details (or equivalent) are followed, the linear thermal transmittance values associated with the relevant junctions may be used; otherwise default values from Building Regulations guidance must be applied. Surface condensation risk shall be assessed in accordance with BS EN ISO 13788."
            meaning={
              <>
                Part L makes thermal bridging a compliance item, not an afterthought. Using
                Approved Construction Details (ACDs) drops the y-value from 0.15 to 0.05 and
                often makes the difference between a passing and failing SAP/SBEM.
              </>
            }
            cite="Source: Building Regulations 2010, Approved Document L; BR 443 — Conventions for U-value calculations; BS EN ISO 13788 — surface condensation"
          />

          <LearningOutcomes
            outcomes={[
              'Define linear thermal bridges and calculate heat loss using psi values',
              'Define point thermal bridges and calculate heat loss using chi values',
              'Identify common thermal bridge locations in building construction',
              'Assess condensation risk using temperature factor (fRsi)',
              'Apply Accredited Construction Details to minimise thermal bridging',
              'Design building services junctions to reduce thermal bridge effects',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Linear Thermal Bridges (Psi Values)"
            plainEnglish="Where two bits of fabric meet — wall-to-floor, wall-to-roof, around windows — there's extra heat loss along that line. The psi value (ψ) measures it in watts per metre per Kelvin."
          >
            <p>
              Linear thermal bridges occur where two building elements meet, creating a continuous
              line of increased heat loss along the junction. The additional heat flow is quantified
              by the linear thermal transmittance, or psi (ψ) value.
            </p>
            <p>
              <strong>Key facts about psi values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Symbol: ψ (Greek letter psi)</li>
              <li>Unit: W/mK (Watts per metre Kelvin)</li>
              <li>Represents heat loss per metre length of junction</li>
              <li>Lower values indicate better thermal performance</li>
            </ul>
            <p>
              <strong>Heat loss calculation:</strong> Q = ψ × L × ΔT. Where Q = heat loss (W), L =
              length (m), ΔT = temperature difference (K).
            </p>
            <p>
              <strong>Typical psi values for common junctions (poor detail / ACD detail):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>External wall to ground floor: 0.16 / 0.04 W/mK</li>
              <li>External wall to roof (eaves): 0.12 / 0.04 W/mK</li>
              <li>Window reveal (jamb): 0.08 / 0.02 W/mK</li>
              <li>Window sill: 0.10 / 0.03 W/mK</li>
              <li>Steel lintel (uninsulated): 0.30 / 0.05 W/mK</li>
              <li>Corner (external): 0.09 / 0.02 W/mK</li>
            </ul>
            <p>
              <strong>Key point:</strong> The difference between poor and good detailing can reduce
              junction heat loss by 70-85%. This emphasises the importance of careful design and
              specification.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Point Thermal Bridges (Chi Values)"
            plainEnglish="A bracket bolted through the insulation. A cable entry. A wall tie. Each is a single point of heat loss — chi (χ) in watts per Kelvin. Add up enough of them and they add up to a fan heater running 24/7."
          >
            <p>
              Point thermal bridges occur at discrete locations where a single element penetrates or
              disrupts the insulation layer. Common examples include fixings, brackets, and service
              penetrations through the thermal envelope.
            </p>
            <p>
              <strong>Key facts about chi values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Symbol: χ (Greek letter chi)</li>
              <li>Unit: W/K (Watts per Kelvin)</li>
              <li>Represents heat loss at a single point location</li>
              <li>Often overlooked but can be significant in aggregate</li>
            </ul>
            <p>
              <strong>Heat loss calculation:</strong> Q = χ × ΔT. Where Q = heat loss (W), χ = point
              thermal transmittance (W/K), ΔT = temperature difference (K).
            </p>
            <p>
              <strong>Common point bridges:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Steel wall ties in cavity walls</li>
              <li>Cladding support brackets</li>
              <li>Balcony connections</li>
              <li>Structural steel penetrations</li>
            </ul>
            <p>
              <strong>Building services point bridges:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Cable tray and trunking fixings</li>
              <li>Service entry sleeves</li>
              <li>External lighting brackets</li>
              <li>Flue and duct penetrations</li>
            </ul>
            <p>
              <strong>Typical chi values:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Stainless steel wall tie: χ = 0.002-0.004 W/K (per tie, typically 2.5/m²)</li>
              <li>Steel fixing bracket (100mm²): χ = 0.05-0.10 W/K (through 100mm insulation)</li>
              <li>Cable entry (unsealed): χ = 0.10-0.20 W/K (includes air leakage effect)</li>
              <li>Cable entry (sealed with thermal break): χ = 0.02-0.05 W/K</li>
              <li>Structural steel beam penetration: χ = 0.15-0.50 W/K (depends on beam size)</li>
            </ul>
            <p>
              <strong>Aggregate effect:</strong> A building with 50 unsealed service penetrations at
              χ = 0.15 W/K each, with ΔT = 20K, loses 150W - equivalent to leaving a desktop heater
              on permanently.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Common Bridge Locations and Condensation Risk"
            plainEnglish="Cold surface + warm humid air = condensation. The temperature factor fRsi tells you how cold a junction will get. Below 0.75 and you're risking mould."
          >
            <p>
              Thermal bridges create localised cold spots on internal surfaces. When the surface
              temperature falls below the dew point of the internal air, condensation forms. This
              moisture promotes mould growth and can cause material degradation.
            </p>
            <p>
              <strong>High-risk thermal bridge locations - junctions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Wall-to-floor junctions</li>
              <li>Wall-to-roof junctions</li>
              <li>External corners</li>
              <li>Internal corners (party walls)</li>
              <li>Intermediate floor edges</li>
            </ul>
            <p>
              <strong>High-risk thermal bridge locations - around openings:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Window reveals (jambs, sills, heads)</li>
              <li>Door thresholds</li>
              <li>Lintels (especially uninsulated steel)</li>
              <li>Meter boxes and service entries</li>
              <li>Ventilation openings</li>
            </ul>
            <p>
              <strong>Temperature factor (fRsi):</strong> fRsi = (Tsi - Te) / (Ti - Te). Where Tsi =
              internal surface temperature, Ti = internal air temperature, Te = external
              temperature. Minimum fRsi = 0.75 required to avoid mould growth (BRE IP 1/06).
            </p>
            <p>
              <strong>Condensation risk assessment:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Surface condensation:</strong> Occurs when surface RH reaches 100%
              </li>
              <li>
                <strong>Mould growth threshold:</strong> Surface RH above 80% sustained
              </li>
              <li>
                <strong>Internal conditions assumed:</strong> 20°C, 50% RH (gives dew point ~9°C)
              </li>
              <li>
                <strong>External design condition:</strong> 0°C for UK calculations
              </li>
            </ul>
            <p>
              <strong>Surface temperature vs condensation risk (Ti=20°C, Te=0°C):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>fRsi 0.90+: Surface 18°C+ — low risk</li>
              <li>fRsi 0.75-0.90: Surface 15-18°C — acceptable</li>
              <li>fRsi 0.65-0.75: Surface 13-15°C — mould risk</li>
              <li>fRsi &lt; 0.65: Surface &lt; 13°C — condensation likely</li>
            </ul>
            <p>
              <strong>Critical insight:</strong> At a thermal bridge with fRsi of 0.65 and standard
              conditions (20°C inside, 0°C outside), the surface reaches 13°C. With internal air at
              50% RH, dew point is ~9°C - no condensation. But raise humidity to 70% (common in
              kitchens/bathrooms) and dew point rises to ~14°C, causing condensation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Accredited Construction Details and Mitigation Strategies"
            plainEnglish="ACDs are pre-calculated junction details that get you a tick in the SAP/SBEM box without bespoke calcs. Use them and your default y-value drops from 0.15 to 0.05 — a third of the bridging heat loss."
          >
            <p>
              Accredited Construction Details (ACDs) are pre-calculated junction details that meet
              specific performance criteria. Using ACDs simplifies compliance with Part L and
              ensures thermal bridging is properly addressed without bespoke calculations.
            </p>
            <p>
              <strong>Understanding y-values in SAP:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Default (no assessment): y = 0.15 W/m²K — no evidence required</li>
              <li>ACDs fully adopted: y = 0.05 W/m²K — all junctions match ACD specifications</li>
              <li>Calculated (bespoke): varies — thermal modelling of all junctions</li>
              <li>Y-value × total envelope area = additional heat loss from thermal bridges</li>
            </ul>
            <p>
              <strong>Cable and conduit penetrations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use thermal break sleeves (neoprene, EPDM) around cables</li>
              <li>Seal penetrations with expanding foam and intumescent mastic</li>
              <li>Position entries away from corners and junctions</li>
              <li>Consolidate multiple cables through single, well-detailed penetration</li>
              <li>Consider wireless alternatives for sensors where practical</li>
            </ul>
            <p>
              <strong>Cable tray and trunking supports:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use thermally broken brackets where fixing through insulation</li>
              <li>Fix to internal structure where possible, avoiding thermal envelope</li>
              <li>Specify GRP or composite brackets instead of steel</li>
              <li>Minimise number of penetrations through careful routing</li>
            </ul>
            <p>
              <strong>Ductwork and ventilation:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Insulate ducts continuously through the thermal envelope</li>
              <li>Use proprietary insulated duct sleeves at wall penetrations</li>
              <li>Ensure vapour barriers are continuous and sealed</li>
              <li>Detail MVHR and MEV terminals with thermal breaks</li>
            </ul>
            <p>
              <strong>External equipment mounting:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Use stand-off brackets with thermal breaks for AC units</li>
              <li>Mount solar PV and thermal systems on thermally isolated rails</li>
              <li>Detail EV charger and external socket installations carefully</li>
              <li>Specify insulated flue systems for boilers and biomass</li>
            </ul>
            <p>
              <strong>Key mitigation principles:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Continuity:</strong> Maintain insulation layer continuity wherever possible
              </li>
              <li>
                <strong>Thermal breaks:</strong> Use low-conductivity materials where continuity is impossible
              </li>
              <li>
                <strong>Air sealing:</strong> Seal all penetrations to prevent convective heat loss
              </li>
              <li>
                <strong>Coordination:</strong> Early coordination between architects and services engineers
              </li>
              <li>
                <strong>Documentation:</strong> Record all non-standard details for compliance evidence
              </li>
            </ul>
            <p>
              <strong>Design coordination:</strong> Thermal bridging mitigation must be considered
              during early design stages. Retrofitting solutions is far more expensive and often
              less effective than designing details correctly from the outset.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Four practical numbers: junction loss, brackets, dew-point check, and the cash difference between default y-value and ACDs."
          >
            <p>
              <strong>Example 1 - linear thermal bridge heat loss:</strong> A building has 48m of
              wall-to-floor junction with ψ = 0.08 W/mK. Annual heat loss if average ΔT is 12K and
              heating season is 5,400 hours.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Q = ψ × L × ΔT = 0.08 × 48 × 12 = <strong>46.1W</strong></li>
              <li>E = 46.1W × 5,400h = 249,000 Wh = <strong>249 kWh/year</strong></li>
              <li>At £0.28/kWh = £70/year for this single junction</li>
            </ul>
            <p>
              <strong>Example 2 - point thermal bridge assessment:</strong> A commercial building
              has 120 cable tray brackets penetrating the external wall insulation. Each bracket has
              χ = 0.06 W/K. Calculate the total additional heat loss at design conditions (ΔT =
              25K).
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>χtotal = n × χ = 120 × 0.06 = 7.2 W/K</li>
              <li>Q = χtotal × ΔT = 7.2 × 25 = <strong>180W</strong></li>
              <li>Equivalent to a small fan heater running continuously</li>
            </ul>
            <p>
              <strong>Example 3 - condensation risk check:</strong> A window reveal has fRsi = 0.72.
              With internal conditions of 21°C and 60% RH, and external temperature of -2°C, will
              condensation occur?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Tsi = Te + fRsi × (Ti - Te) = -2 + 0.72 × (21 - (-2))</li>
              <li>Tsi = -2 + 0.72 × 23 = -2 + 16.6 = <strong>14.6°C</strong></li>
              <li>Dew point at 21°C, 60% RH ≈ <strong>12.9°C</strong></li>
              <li>Surface (14.6°C) is above dew point (12.9°C) — but close to threshold; mould risk if RH increases</li>
            </ul>
            <p>
              <strong>Example 4 - y-value impact on heat loss:</strong> A dwelling has 450m² total
              envelope area. Compare annual thermal bridge heat loss using default y-value (0.15) vs
              ACDs (0.05). Average ΔT = 12K, 5,400 heating hours.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Default detail: Q = 0.15 × 450 × 12 = 810W → E = 4,374 kWh/year</li>
              <li>With ACDs: Q = 0.05 × 450 × 12 = 270W → E = 1,458 kWh/year</li>
              <li><strong>Saving: 2,916 kWh/year (£816/year at £0.28/kWh)</strong></li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="Formulas, key thresholds, and the standard internal design conditions you'll be quoted at."
          >
            <p>
              <strong>Essential formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Q = ψ × L × ΔT</strong> — Linear thermal bridge heat loss
              </li>
              <li>
                <strong>Q = χ × ΔT</strong> — Point thermal bridge heat loss
              </li>
              <li>
                <strong>fRsi = (Tsi - Te) / (Ti - Te)</strong> — Temperature factor
              </li>
              <li>
                <strong>HTB = Σ(ψ × L) + Σχ</strong> — Total thermal bridge coefficient
              </li>
              <li>
                <strong>Additional loss = y × A × ΔT</strong> — Y-value method
              </li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Minimum fRsi: <strong>0.75</strong> (to avoid mould)
              </li>
              <li>
                Default y-value: <strong>0.15 W/m²K</strong>
              </li>
              <li>
                ACD y-value: <strong>0.05 W/m²K</strong>
              </li>
              <li>
                Mould threshold: surface RH &gt; <strong>80%</strong>
              </li>
              <li>
                Design internal conditions: <strong>20°C, 50% RH</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Ignoring point bridges</strong> — Many small bridges add up significantly
                </li>
                <li>
                  <strong>Late coordination</strong> — Services routes designed without thermal consideration
                </li>
                <li>
                  <strong>Unsealed penetrations</strong> — Air leakage compounds conductive losses
                </li>
                <li>
                  <strong>Wrong units</strong> — Confusing W/mK (linear) with W/K (point)
                </li>
              </ul>
            }
            doInstead="Count point bridges, route services with thermal envelope in mind from day one, seal every penetration, and double-check whether you're working in W/mK or W/K."
          />

          <SectionRule />

          <Scenario
            title="Mould complaint at a window reveal in a recently completed flat"
            situation={
              <>
                A new dwelling is showing mould growth at the window reveals after one
                heating season. The fabric U-values are at Part L target, but the as-built
                construction did not follow Approved Construction Details at the lintel and
                jamb.
              </>
            }
            whatToDo={
              <>
                Run a thermal-bridging assessment. Calculate the f_Rsi (temperature factor at
                the internal surface) at the worst-case junction using a 2D heat-flow
                simulation (Therm or HEAT3). If f_Rsi falls below the BS EN ISO 13788 limit
                (typically 0.75 for dwellings), surface condensation is foreseeable. Specify
                remedial work: insulating reveal liner, internal insulating render, or warm-edge
                spacer if missed. Document and re-run SAP with corrected y-value.
              </>
            }
            whyItMatters={
              <>
                Surface condensation triggers mould growth and habitability claims under
                Homes (Fitness for Human Habitation) Act 2018. Designing junctions correctly
                and verifying f_Rsi is cheaper than the call-back.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Thermal bridge = localised heat loss path through the fabric — junction, penetration, structural element.',
              'Linear bridge: psi (W/m·K) per metre of junction (e.g. wall-to-roof).',
              'Point bridge: chi (W/K) per occurrence (e.g. wall tie, structural fixing).',
              'SAP / SBEM y-value: 0.15 default, 0.05 with Approved Construction Details — material to compliance.',
              'f_Rsi (temperature factor) measures condensation risk — BS EN ISO 13788 sets the minimum (typically 0.75 dwellings).',
              'Standard junctions: BR 443 / BRE IP 1/06 default psi values; bespoke junctions need numerical 2D/3D thermal modelling.',
              'Linear bridges contribute typically 10-30% of fabric heat loss — never neglect.',
              'Condensation, mould and Homes (Fitness for Human Habitation) Act 2018 claims are downstream of poor junction detailing — design out at concept stage.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section1-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                U-values
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section1-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Heat loss calculations
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section1_5;
