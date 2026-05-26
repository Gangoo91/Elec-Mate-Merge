/**
 * Module 2 · Section 1 · Subsection 6 — Heat Loss Calculations
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   The room-by-room heat loss method that drives heating system sizing — fabric loss
 *   plus ventilation/infiltration loss against design external temperature. The output
 *   sets boiler/heat-pump capacity, emitter selection and pipe sizing.
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

const TITLE = 'Heat Loss Calculations - HNC Module 2 Section 1.6';
const DESCRIPTION =
  'Master heat loss calculations for building services: fabric losses, ventilation losses, total building heat load and heating system sizing using CIBSE design data.';

const quickCheckQuestions = [
  {
    id: 'fabric-formula',
    question: 'What is the correct formula for fabric heat loss?',
    options: [
      'Q = U / A × ΔT',
      'Q = 0.33 × n × V × ΔT',
      'Q = m × c × ΔT',
      'Q = U × A × ΔT',
    ],
    correctIndex: 3,
    explanation:
      'Fabric heat loss Q = U × A × ΔT where U is the U-value (W/m²K), A is the area (m²), and ΔT is the temperature difference (K or °C).',
  },
  {
    id: 'ventilation-formula',
    question: 'Which formula calculates ventilation heat loss?',
    options: [
      'Q = V × I',
      'Q = U × A × ΔT',
      'Q = P × t',
      'Q = 0.33 × n × V × ΔT',
    ],
    correctIndex: 3,
    explanation:
      'Ventilation heat loss Q = 0.33 × n × V × ΔT where 0.33 is the volumetric specific heat of air (Wh/m³K), n is air changes per hour, V is room volume (m³), and ΔT is temperature difference.',
  },
  {
    id: 'design-temp-external',
    question: 'What is the typical CIBSE external design temperature for the UK?',
    options: [
      '-1°C to -4°C',
      '0°C',
      '+5°C',
      '-10°C',
    ],
    correctIndex: 0,
    explanation:
      'CIBSE Guide A recommends external design temperatures between -1°C and -4°C for most UK locations, with colder temperatures for northern regions and exposed sites.',
  },
  {
    id: 'total-heat-load',
    question: 'Total building heat load is calculated as:',
    options: [
      'Fabric loss - Ventilation loss',
      'Fabric loss + Ventilation loss',
      'Fabric loss × Ventilation loss',
      'Fabric loss ÷ Ventilation loss',
    ],
    correctIndex: 1,
    explanation:
      'Total building heat load is the sum of fabric heat losses (through walls, roof, floor, windows) and ventilation heat losses (air infiltration and mechanical ventilation).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does the U-value represent in heat loss calculations?',
    options: [
      'Hearing only parts of the conversation that interest you or confirm your existing views',
      'The rate of heat transfer through a material per unit area per degree temperature difference',
      'Material prices and labour rates change; an open-ended quote can leave the contractor on the hook for old prices',
      'The tower must not be used — it has failed inspection or is incomplete/unsafe',
    ],
    correctAnswer: 1,
    explanation:
      'The U-value (thermal transmittance) measures the rate of heat transfer through a building element in W/m²K. Lower U-values indicate better insulation.',
  },
  {
    id: 2,
    question:
      'A wall has U-value 0.3 W/m²K, area 45m², with 21°C inside and -3°C outside. What is the fabric heat loss?',
    options: [
      '486W',
      '540W',
      '324W',
      '405W',
    ],
    correctAnswer: 2,
    explanation: 'Q = U × A × ΔT = 0.3 × 45 × (21 - (-3)) = 0.3 × 45 × 24 = 324W',
  },
  {
    id: 3,
    question:
      'What is the volumetric specific heat capacity of air used in ventilation calculations?',
    options: [
      '0.50 Wh/m³K',
      '0.25 Wh/m³K',
      '1.00 Wh/m³K',
      '0.33 Wh/m³K',
    ],
    correctAnswer: 3,
    explanation:
      'The volumetric specific heat capacity of air is approximately 0.33 Wh/m³K (or 1200 J/m³K). This value accounts for both the density and specific heat capacity of air at standard conditions.',
  },
  {
    id: 4,
    question:
      'A room is 5m × 4m × 2.8m with 1.5 air changes per hour. ΔT is 24K. What is the ventilation heat loss?',
    options: [
      '665W',
      '443W',
      '554W',
      '332W',
    ],
    correctAnswer: 0,
    explanation:
      'Volume = 5 × 4 × 2.8 = 56m³. Q = 0.33 × n × V × ΔT = 0.33 × 1.5 × 56 × 24 = 665.3W ≈ 665W',
  },
  {
    id: 5,
    question:
      'According to CIBSE Guide A, what is the recommended internal design temperature for a general office?',
    options: [
      '20°C',
      '22°C',
      '24°C',
      '18°C',
    ],
    correctAnswer: 1,
    explanation:
      'CIBSE Guide A recommends 22°C for general offices (sedentary work). Living rooms are 21°C, bedrooms 18°C, and bathrooms 22°C.',
  },
  {
    id: 6,
    question: 'Why is a margin typically added to calculated heat loads?',
    options: [
      'Large, complex, or high-occupancy sites like hospitals and airports',
      'Noise radiating through duct walls into surrounding spaces',
      'To account for pre-heat requirements and system losses',
      'Test each conductor individually then cross-connect and test',
    ],
    correctAnswer: 2,
    explanation:
      'A margin (typically 10-20%) is added to account for pre-heat/boost requirements, distribution losses, and to ensure the system can maintain comfort during extreme weather events.',
  },
  {
    id: 7,
    question:
      'A building has 5kW fabric loss and 2kW ventilation loss. With a 15% margin, what boiler output is needed?',
    options: [
      '7.0kW',
      '7.5kW',
      '9.2kW',
      '8.05kW',
    ],
    correctAnswer: 3,
    explanation:
      'Total heat load = 5 + 2 = 7kW. With 15% margin: 7 × 1.15 = 8.05kW. The boiler would typically be sized at 9kW or 10kW to match available equipment.',
  },
  {
    id: 8,
    question:
      'What is the typical air change rate for a living room used in heat loss calculations?',
    options: [
      '1.0 ACH',
      '1.5 ACH',
      '0.5 ACH',
      '2.0 ACH',
    ],
    correctAnswer: 0,
    explanation:
      'CIBSE recommends 1.0 air change per hour for living rooms. Kitchens and bathrooms require higher rates (2-3 ACH) due to moisture and odour removal needs.',
  },
  {
    id: 9,
    question: 'Which building element typically has the highest U-value?',
    options: [
      'External wall',
      'Windows',
      'Floor',
      'Roof',
    ],
    correctAnswer: 1,
    explanation:
      'Windows typically have the highest U-values (1.2-2.8 W/m²K for double glazing), making them the weakest thermal element. Modern walls achieve 0.18-0.3 W/m²K.',
  },
  {
    id: 10,
    question: 'When calculating heat loss, temperature difference (ΔT) is measured in:',
    options: [
      'Kelvin only',
      'Celsius only',
      'Either Kelvin or Celsius',
      'Fahrenheit',
    ],
    correctAnswer: 2,
    explanation:
      'A temperature difference of 1K equals a difference of 1°C. While absolute temperatures differ (0°C = 273K), temperature differences are numerically identical, so either unit can be used.',
  },
  {
    id: 11,
    question:
      'Building Regulations Part L sets maximum U-values. What is the current limit for new-build external walls?',
    options: [
      '0.35 W/m²K',
      '0.26 W/m²K',
      '0.15 W/m²K',
      '0.18 W/m²K',
    ],
    correctAnswer: 3,
    explanation:
      'Building Regulations Part L (2021) sets a maximum U-value of 0.18 W/m²K for new-build external walls. This represents a significant improvement from previous standards.',
  },
  {
    id: 12,
    question:
      'A heating system has a boiler efficiency of 89%. If the building heat load is 15kW, what boiler input is required?',
    options: [
      '16.9kW',
      '17.8kW',
      '13.4kW',
      '15.0kW',
    ],
    correctAnswer: 0,
    explanation:
      'Boiler input = Heat load ÷ Efficiency = 15 ÷ 0.89 = 16.85kW ≈ 16.9kW. The boiler must provide more input energy than the useful heat output.',
  },
];

const faqs = [
  {
    question: 'Why do we use -3°C or -4°C for external design temperature when it can be colder?',
    answer:
      "CIBSE design temperatures represent the coldest conditions the heating system must handle during the occupied period, based on statistical analysis. While colder temperatures occur, they are infrequent and brief. The building's thermal mass provides a buffer. Designing for -10°C or lower would result in oversized, inefficient systems that rarely operate at full capacity.",
  },
  {
    question: 'Should I include internal doors in heat loss calculations?',
    answer:
      'Internal doors are not typically included as the temperature difference is minimal between heated spaces. However, if a room adjoins an unheated space (garage, utility), you should calculate heat loss through that partition using appropriate temperature assumptions (e.g., 10°C for unheated spaces).',
  },
  {
    question: 'How do I account for intermittent heating in heat loss calculations?',
    answer:
      'For intermittent heating (e.g., offices heated only during occupied hours), add a pre-heat margin of 15-25% depending on building thermal mass. Heavyweight buildings (concrete, brick) need longer pre-heat times but maintain temperature better. Lightweight buildings respond faster but lose heat quickly when heating stops.',
  },
  {
    question: 'What is the difference between infiltration and ventilation?',
    answer:
      'Infiltration is uncontrolled air leakage through gaps in the building fabric (windows, doors, service penetrations). Ventilation is the controlled introduction of fresh air, either naturally (openable windows, trickle vents) or mechanically (MVHR, extract fans). Both contribute to heat loss but ventilation is necessary for indoor air quality.',
  },
  {
    question: 'How do solar gains affect heat loss calculations?',
    answer:
      'Solar gains are typically not included in heating design calculations as they cannot be relied upon during the coldest periods (winter mornings, overcast days). However, solar gains are crucial for cooling load calculations in summer and may cause overheating in heavily glazed buildings even in winter.',
  },
  {
    question: 'Why is floor heat loss calculated differently from walls?',
    answer:
      'Ground floors lose heat through the ground, which has significant thermal mass and maintains a relatively stable temperature (around 10°C). The calculation uses either simplified methods (exposed perimeter approach) or more complex analysis considering floor size, edge insulation, and soil conductivity. Suspended floors over unheated voids use the standard U × A × ΔT method.',
  },
];

const HNCModule2Section1_6 = () => {
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
            eyebrow="Module 2 · Section 1 · Subsection 6"
            title="Heat Loss Calculations"
            description="Calculating building heat loads for heating system design using CIBSE methods."
            tone="purple"
          />

          <TLDR
            points={[
              'You will perform a room-by-room heat loss calculation using fabric loss (Σ U·A·ΔT) plus ventilation/infiltration loss (0.33·n·V·ΔT) against the design external temperature.',
              'You apply the CIBSE Domestic Heating Design Guide and BS EN 12831 (the European method) — and you know which is appropriate for the project.',
              'You select design external temperature for the project location (CIBSE Guide A weather data) and the design internal temperature for each room.',
              'You add intermittent-heating uplift (typically 5-15%) where the system is not run 24/7 — and reject blanket-overinsuring.',
            ]}
          />

          <RegsCallout
            source="BS EN 12831 — Energy performance of buildings: method for calculation of the design heat load"
            clause="The design heat loss for a heated space is calculated as the sum of the design transmission heat loss (through fabric) and the design ventilation heat loss, evaluated for the design external temperature and the design internal temperature for the space, with appropriate corrections for thermal bridging and intermittent heating."
            meaning={
              <>
                BS EN 12831 is the UK / European reference for design heat-load calculations.
                CIBSE&rsquo;s Domestic Heating Design Guide and Guide A apply the same physics
                with UK-specific data. As an HNC engineer your output (kW per room, kW per
                building) drives every downstream sizing decision.
              </>
            }
            cite="Source: BS EN 12831 — Method for calculation of the design heat load; CIBSE Domestic Heating Design Guide; CIBSE Guide A — Environmental design"
          />

          <LearningOutcomes
            outcomes={[
              'Calculate fabric heat loss using U-values and areas',
              'Calculate ventilation heat loss using air change rates',
              'Determine total building heat load',
              'Apply CIBSE internal and external design temperatures',
              'Size heating systems with appropriate margins',
              'Understand Building Regulations Part L requirements',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock
            title="Fabric Heat Loss"
            plainEnglish="The straightforward bit: heat through the walls, roof, floor and windows. Q = U × A × ΔT for every element. Add them up."
          >
            <p>
              Fabric heat loss occurs through the building envelope - walls, roof, floor, windows
              and doors. It is the primary heat loss mechanism in most buildings and is directly
              related to the insulation quality (U-value) and surface area of each element.
            </p>
            <p>
              <strong>Formula:</strong> Q = U × A × ΔT. Q = heat loss (W), U = U-value (W/m²K), A =
              area (m²), ΔT = temperature difference (K or °C).
            </p>
            <p>
              <strong>Key principles of fabric heat loss:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Heat flows from hot to cold - always from inside to outside in winter</li>
              <li>Lower U-values mean better insulation and less heat loss</li>
              <li>Total fabric loss is the sum of losses through each element</li>
              <li>Window and door areas are subtracted from wall areas</li>
            </ul>
            <p>
              <strong>Typical U-values (Building Regulations Part L 2021) — new build / existing
              refurb / typical old building:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>External wall: 0.18 / 0.30 / 1.5-2.0 W/m²K</li>
              <li>Roof (pitched): 0.11 / 0.16 / 0.5-1.0 W/m²K</li>
              <li>Floor: 0.13 / 0.25 / 0.5-0.8 W/m²K</li>
              <li>Windows: 1.2 / 1.4 / 2.8-5.0 W/m²K</li>
              <li>External doors: 1.0 / 1.4 / 3.0-4.0 W/m²K</li>
            </ul>
            <p>
              <strong>Remember:</strong> Windows typically have U-values 5-10 times higher than
              modern walls, making them the weakest thermal element despite their smaller area.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock
            title="Ventilation Heat Loss"
            plainEnglish="Cold air comes in, warm air goes out. The 0.33 magic number turns air-change-rate × volume × temperature-difference into watts."
          >
            <p>
              Ventilation heat loss occurs when warm indoor air is replaced by cold outdoor air.
              This happens through both controlled ventilation (windows, vents, MVHR) and
              uncontrolled infiltration (gaps, cracks, service penetrations).
            </p>
            <p>
              <strong>Formula:</strong> Q = 0.33 × n × V × ΔT. Q = heat loss (W), 0.33 = volumetric
              specific heat of air (Wh/m³K), n = air changes per hour (ACH), V = room volume (m³),
              ΔT = temperature difference (K or °C).
            </p>
            <p>
              <strong>Understanding the 0.33 factor:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Air density ≈ 1.2 kg/m³ at standard conditions</li>
              <li>Specific heat capacity of air ≈ 1000 J/kgK</li>
              <li>Combined: 1.2 × 1000 = 1200 J/m³K = 0.33 Wh/m³K</li>
              <li>This factor accounts for the energy needed to heat incoming air</li>
            </ul>
            <p>
              <strong>CIBSE recommended air change rates:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Living room: 1.0 ACH — background ventilation</li>
              <li>Bedroom: 0.5-1.0 ACH — lower overnight</li>
              <li>Kitchen: 2.0-3.0 ACH — extract ventilation</li>
              <li>Bathroom: 2.0-3.0 ACH — moisture removal</li>
              <li>Office (general): 1.0-1.5 ACH — 8-10 l/s per person</li>
              <li>Classroom: 2.0-3.0 ACH — high occupancy</li>
            </ul>
            <p>
              <strong>Modern buildings:</strong> With improved airtightness (&lt;5 m³/h/m² at 50Pa),
              mechanical ventilation with heat recovery (MVHR) can recover 80-90% of heat from
              exhaust air.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock
            title="Design Temperatures and CIBSE Data"
            plainEnglish="Inside temp = what the room should sit at. Outside temp = the design cold day. Difference = ΔT, which feeds every heat loss calc."
          >
            <p>
              Accurate heat loss calculations require appropriate design temperatures. CIBSE Guide A
              provides comprehensive data for internal comfort temperatures and external design
              conditions based on UK weather statistics.
            </p>
            <p>
              <strong>Internal design temperatures - residential:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Living room:</strong> 21°C
              </li>
              <li>
                <strong>Dining room:</strong> 21°C
              </li>
              <li>
                <strong>Bedroom:</strong> 18°C
              </li>
              <li>
                <strong>Bathroom:</strong> 22°C
              </li>
              <li>
                <strong>Hall/landing:</strong> 18°C
              </li>
              <li>
                <strong>Kitchen:</strong> 18°C (cooking gains)
              </li>
            </ul>
            <p>
              <strong>Internal design temperatures - commercial spaces:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>General office:</strong> 22°C
              </li>
              <li>
                <strong>Open plan office:</strong> 22°C
              </li>
              <li>
                <strong>Retail (sales):</strong> 19-21°C
              </li>
              <li>
                <strong>Restaurant:</strong> 22°C
              </li>
              <li>
                <strong>Warehouse:</strong> 12-16°C
              </li>
              <li>
                <strong>Factory (light work):</strong> 16-19°C
              </li>
            </ul>
            <p>
              <strong>External design temperatures (CIBSE Guide A):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>London: -2°C — urban heat island effect</li>
              <li>Birmingham: -3°C — central England</li>
              <li>Manchester: -3°C — north west</li>
              <li>Edinburgh: -4°C — Scotland, colder</li>
              <li>Aberdeen: -5°C — north Scotland</li>
              <li>Exposed/rural sites: subtract a further 1-2°C</li>
            </ul>
            <p>
              <strong>Calculating temperature difference (ΔT):</strong> ΔT = ti - te. Example -
              office in Manchester: internal 22°C, external -3°C. ΔT = 22 - (-3) = <strong>25K</strong>.
            </p>
            <p>
              <strong>CIBSE basis:</strong> External design temperatures are based on the
              temperature exceeded for 99.6% of the year (i.e., only colder for approximately 35
              hours annually).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock
            title="Total Building Heat Load and System Sizing"
            plainEnglish="Add fabric and ventilation. Add a margin (10-20%). Add DHW if it's a combi. That's the boiler / heat-pump output you need to specify."
          >
            <p>
              The total building heat load is the sum of all fabric and ventilation losses. This
              determines the required capacity of the heating system including boiler, heat pump,
              distribution pipework and heat emitters.
            </p>
            <p>
              <strong>Total heat load formula:</strong> Qtotal = Qfabric + Qventilation. Add
              margins for pre-heat (10-20%) and distribution losses (5-10%).
            </p>
            <p>
              <strong>System sizing considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pre-heat margin:</strong> 10-20% for intermittent heating
              </li>
              <li>
                <strong>Distribution losses:</strong> 5-10% for pipe heat losses
              </li>
              <li>
                <strong>Safety factor:</strong> Round up to available equipment sizes
              </li>
              <li>
                <strong>Future-proofing:</strong> Consider building extensions or usage changes
              </li>
            </ul>
            <p>
              <strong>Typical heat loss benchmarks (W/m² floor area):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Passivhaus: 10-15 — ultra-low energy</li>
              <li>New build (Part L 2021): 30-50 — current standards</li>
              <li>1990s-2000s build: 50-80 — reasonable insulation</li>
              <li>1970s-1980s build: 80-120 — partial insulation</li>
              <li>Pre-1970s unimproved: 120-200+ — solid walls, single glazing</li>
            </ul>
            <p>
              <strong>Boiler sizing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Output must exceed total heat load</li>
              <li>Add DHW load for combis (3-5kW)</li>
              <li>Consider modulation range (10:1)</li>
              <li>Oversizing causes short-cycling</li>
            </ul>
            <p>
              <strong>Heat pump sizing:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>COP reduces at low external temps</li>
              <li>Size to peak load or bivalent point</li>
              <li>Buffer vessels for low thermal mass</li>
              <li>Weather compensation essential</li>
            </ul>
            <p>
              <strong>Rule of thumb:</strong> Modern well-insulated homes need approximately 40-60
              W/m² floor area. A 100m² home would need 4-6kW heating capacity.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock
            title="Worked examples"
            plainEnglish="Four numbers: a room's fabric loss, a room's ventilation loss, the same room with margin for radiator sizing, and a whole house through to boiler kW."
          >
            <p>
              <strong>Example 1 - room fabric heat loss:</strong> Living room with: external wall
              12m² (U=0.3), window 4m² (U=1.4), floor 20m² (U=0.2), ceiling 20m² (U=0.15). Internal
              21°C, external -3°C.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>ΔT = 21 - (-3) = 24K</li>
              <li>Wall loss: 0.3 × 12 × 24 = 86.4W</li>
              <li>Window loss: 1.4 × 4 × 24 = 134.4W</li>
              <li>Floor loss: 0.2 × 20 × 24 = 96W</li>
              <li>Ceiling loss: 0.15 × 20 × 24 = 72W</li>
              <li>Total fabric loss = <strong>388.8W</strong></li>
              <li>Window contributes 35% of loss despite being 7% of envelope area</li>
            </ul>
            <p>
              <strong>Example 2 - room ventilation heat loss:</strong> Same living room is 5m × 4m ×
              2.4m with 1.0 ACH.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Volume = 5 × 4 × 2.4 = 48m³</li>
              <li>ΔT = 24K</li>
              <li>Q = 0.33 × 1.0 × 48 × 24 = <strong>380.2W</strong></li>
              <li>Ventilation loss is almost equal to fabric loss in this example</li>
            </ul>
            <p>
              <strong>Example 3 - total room heat load with margin:</strong> Total heat loss =
              fabric + ventilation = 388.8 + 380.2 = 769W. With 10% margin = 769 × 1.10 =
              <strong>845.9W</strong>. Recommended radiator: 900-1000W output (next size up from
              manufacturer's range).
            </p>
            <p>
              <strong>Example 4 - whole house heat load:</strong> A 120m² house has calculated
              room-by-room heat losses totalling 7.2kW. Size the boiler with appropriate margins for
              intermittent heating.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Base heat load: 7.2kW</li>
              <li>Pre-heat margin (15%): 7.2 × 0.15 = 1.08kW</li>
              <li>Distribution losses (5%): 7.2 × 0.05 = 0.36kW</li>
              <li>Total required: 7.2 + 1.08 + 0.36 = <strong>8.64kW</strong></li>
              <li>Add DHW for combi (3kW): 8.64 + 3 = 11.64kW</li>
              <li>Recommended: <strong>12-15kW combi boiler</strong> (or 9-10kW system boiler with separate DHW cylinder)</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock
            title="Practical guidance"
            plainEnglish="The five formulas, five values, and design conditions you'll keep coming back to."
          >
            <p>
              <strong>Essential formulas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Q = U × A × ΔT</strong> — Fabric heat loss (W)
              </li>
              <li>
                <strong>Q = 0.33 × n × V × ΔT</strong> — Ventilation heat loss (W)
              </li>
              <li>
                <strong>Qtotal = Qfabric + Qventilation</strong> — Total heat load
              </li>
              <li>
                <strong>ΔT = tinside - toutside</strong> — Temperature difference
              </li>
              <li>
                <strong>Boiler output = Total × margin factor</strong> — System sizing
              </li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Volumetric specific heat of air: <strong>0.33 Wh/m³K</strong>
              </li>
              <li>
                Living room internal temp: <strong>21°C</strong>
              </li>
              <li>
                Office internal temp: <strong>22°C</strong>
              </li>
              <li>
                UK external design temp: <strong>-1°C to -4°C</strong>
              </li>
              <li>
                New build wall U-value: <strong>≤0.18 W/m²K</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Forgetting negatives</strong> — ΔT = 21 - (-3) = 24, not 18
                </li>
                <li>
                  <strong>Double counting areas</strong> — Subtract window area from wall area
                </li>
                <li>
                  <strong>Ignoring internal partitions</strong> — Heat flows to unheated spaces too
                </li>
                <li>
                  <strong>Undersizing systems</strong> — Always add appropriate margins
                </li>
                <li>
                  <strong>Using wrong U-values</strong> — Verify actual construction, not assumed
                </li>
              </ul>
            }
            doInstead="Watch the sign on external temps, deduct openings from wall areas, treat unheated adjoining spaces as a partial heat loss, always carry a pre-heat + distribution margin, and confirm U-values from actual build-up not generic figures."
          />

          <SectionRule />

          <Scenario
            title="Sizing an air-source heat pump for a Victorian terrace"
            situation={
              <>
                The customer wants an ASHP retrofit for a 3-bed Victorian terrace. The
                existing gas boiler is 24 kW. They have read online that ASHP needs to be
                sized to 80% of boiler capacity.
              </>
            }
            whatToDo={
              <>
                Reject the rule of thumb. Run a room-by-room heat loss to BS EN 12831 with
                the actual U-values of the as-built fabric (likely 1.5-2.5 W/m²·K for solid
                brick walls, 5+ for single glazing). Use design external temperature for the
                location (-3 °C London, -5 °C Birmingham, -8 °C Glasgow per CIBSE). Sum the
                room loads. Compare against ASHP performance at the design ambient (de-rated
                from nameplate). Likely outcome: 8-12 kW heat pump matched to the actual
                load is realistic. The 24 kW boiler was massively oversized.
              </>
            }
            whyItMatters={
              <>
                Oversized ASHPs cycle, lose efficiency and shorten compressor life.
                Right-sizing from a proper heat-loss calculation is the single biggest factor
                in retrofit success.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Design heat loss = fabric loss + ventilation/infiltration loss.',
              'Fabric loss: Σ(U·A·ΔT) — sum over all elements bounding the heated space.',
              'Ventilation loss: Q_v = 0.33·n·V·ΔT (W) where n = air change rate (per hour) and V = room volume (m³).',
              'BS EN 12831 is the European method; CIBSE Domestic Heating Design Guide and Guide A apply UK data and conventions.',
              'Design external temperature: location-specific (CIBSE Guide A) — typically -1 to -8 °C across the UK.',
              'Design internal temperature: CIBSE Guide A or BS EN 12831 — living rooms 21 °C, bedrooms 18 °C, bathrooms 22 °C.',
              'Intermittent heating uplift: 5-15% for systems run on schedule rather than 24/7.',
              'Output drives boiler/heat pump sizing, emitter selection, pipe sizing, fuel cost estimate — get it wrong and the whole system suffers.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section1-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Thermal bridging
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module2-section2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Fluid mechanics
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule2Section1_6;
