/**
 * Module 3 · Section 6 · Subsection 6 — BS 7671, CIBSE and Part L Requirements for Energy Efficiency
 * HNC Electrical Engineering for Building Services (Pearson U4019)
 *   The UK regulatory stack for energy efficiency &mdash; Part L, BS 7671, CIBSE
 *   Guides A/F/L, BREEAM, ESOS, EPC/DEC. The compliance framework every BSE designer
 *   delivers against on every commercial project.
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

const TITLE =
  'BS 7671, CIBSE and Part L Requirements for Energy Efficiency - HNC Module 3 Section 6.6';
const DESCRIPTION =
  'Master UK regulatory frameworks governing energy efficiency in electrical installations: Building Regulations Part L, CIBSE guides, BS 7671, BREEAM and compliance documentation.';

const quickCheckQuestions = [
  {
    id: 'part-l-purpose',
    question: 'What is the primary purpose of Building Regulations Approved Document Part L?',
    options: [
      'Lower back pain and spinal disorders',
      'Check documentation and plan tests',
      'Conservation of fuel and power',
      'Better device coverage and reliability',
    ],
    correctIndex: 2,
    explanation:
      'Part L (Conservation of fuel and power) sets requirements for energy efficiency in new and existing buildings, including fabric performance, fixed building services, and on-site energy generation.',
  },
  {
    id: 'ter-ber',
    question: 'For compliance with Part L, what must be demonstrated about TER and BER?',
    options: [
      'BER must be less than TER',
      'They are unrelated',
      'TER must equal BER',
      'TER must be less than BER',
    ],
    correctIndex: 0,
    explanation:
      'The Building Emission Rate (BER) must be less than or equal to the Target Emission Rate (TER). This demonstrates that the actual building design produces fewer CO₂ emissions than the notional reference building.',
  },
  {
    id: 'sub-metering',
    question: 'Under Part L, when is sub-metering required for a new non-domestic building?',
    options: [
      'Buildings over 500m²',
      'Never required',
      'All buildings regardless of size',
      'Buildings over 1000m²',
    ],
    correctIndex: 3,
    explanation:
      'Part L requires sub-metering for non-domestic buildings with a total useful floor area greater than 1000m². This enables monitoring of energy use by end-use category (lighting, heating, cooling, etc.).',
  },
  {
    id: 'dec-rating',
    question: "What does a Display Energy Certificate (DEC) rating of 'A' indicate?",
    options: [
      'The building meets minimum standards',
      'Very poor energy performance',
      'The building is exempt from requirements',
      'Very efficient energy performance',
    ],
    correctIndex: 3,
    explanation:
      "DEC ratings run from A (most efficient) to G (least efficient). An 'A' rating indicates the building's operational energy performance is significantly better than the typical benchmark for that building type.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does Part L Volume 2 specifically cover?',
    options: [
      'Short circuit causing flashover and burns',
      'New buildings other than dwellings',
      'Supply air temperature control',
      'Scalability and flexibility',
    ],
    correctAnswer: 1,
    explanation:
      'Part L is split into volumes: Volume 1 covers new dwellings, Volume 2 covers new buildings other than dwellings (commercial/industrial). There are separate volumes for existing buildings.',
  },
  {
    id: 2,
    question: 'The Target Fabric Energy Efficiency (TFEE) rate is measured in which units?',
    options: [
      'kgCO₂/m²/year',
      'lux/W',
      'kWh/m²/year',
      'W/m²K',
    ],
    correctAnswer: 2,
    explanation:
      'TFEE is expressed in kWh/m²/year and represents the maximum fabric energy demand for space heating and cooling. This ensures good thermal performance regardless of heating system efficiency.',
  },
  {
    id: 3,
    question: 'Which CIBSE guide specifically addresses sustainability in building services?',
    options: [
      'CIBSE Guide F',
      'CIBSE Guide A',
      'CIBSE Guide M',
      'CIBSE Guide L',
    ],
    correctAnswer: 3,
    explanation:
      'CIBSE Guide L: Sustainability covers the environmental design of buildings including energy efficiency, carbon emissions, and sustainable building services strategies.',
  },
  {
    id: 4,
    question:
      'Under BS 7671, which regulation specifically addresses maximum demand and diversity?',
    options: [
      'Regulation 311.1',
      'Regulation 132.5',
      'Regulation 433.1',
      'Regulation 525.1',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 311.1 requires assessment of maximum demand, taking into account diversity where applicable. This is essential for efficient sizing of supplies and reduces oversizing waste.',
  },
  {
    id: 5,
    question:
      'What is the minimum BREEAM rating required for new public buildings under government procurement?',
    options: [
      'Good',
      'Excellent',
      'Pass',
      'Very Good',
    ],
    correctAnswer: 1,
    explanation:
      "UK government procurement requires new public buildings to achieve BREEAM 'Excellent' rating. This ensures high environmental performance across energy, water, materials, and other categories.",
  },
  {
    id: 6,
    question: 'For buildings over 1000m², Part L requires sub-metering by which categories?',
    options: [
      'Frequency rating and performance',
      'Extensive experience and specialist knowledge',
      'End-use category (lighting, heating, etc.)',
      'Ensure safe isolation and verify circuits are dead',
    ],
    correctAnswer: 2,
    explanation:
      'Sub-metering must enable at least 90% of estimated annual energy consumption to be assigned to end-use categories: heating, hot water, cooling, ventilation, lighting, small power, and other major loads.',
  },
  {
    id: 7,
    question:
      'Which document must be provided to the building control body before work commences on a new non-domestic building?',
    options: [
      'Completion certificate',
      'As-built calculations only',
      'EPC certificate',
      'Design stage BRUKL output',
    ],
    correctAnswer: 3,
    explanation:
      'A design stage BRUKL (Building Regulations UK Part L) output document must be submitted showing predicted compliance. As-built calculations are required at completion to confirm actual compliance.',
  },
  {
    id: 8,
    question:
      'What is the maximum circuit watts loss (CWL) allowed under Part L for LED lighting circuits?',
    options: [
      'No specific limit - varies by space type',
      'Hot spots indicating problems',
      'Before using any chemical products or materials',
      'Timing, conditions, frequency, and triggering events',
    ],
    correctAnswer: 0,
    explanation:
      'Part L specifies maximum lighting efficacy requirements (lamp-circuit lumens per circuit watt) rather than fixed W/m² limits. Requirements vary by space type and are detailed in the Non-Domestic Building Services Compliance Guide.',
  },
  {
    id: 9,
    question:
      'How often must a Display Energy Certificate (DEC) be renewed for a building over 1000m²?',
    options: [
      'Every 5 years',
      'Every year',
      'Every 7 years',
      'Every 10 years',
    ],
    correctAnswer: 1,
    explanation:
      'DECs for buildings over 1000m² must be renewed annually based on actual metered energy consumption data. Smaller public buildings (250-1000m²) require renewal every 10 years.',
  },
  {
    id: 10,
    question:
      "In BREEAM assessments, what percentage weighting does 'Energy' typically receive in the overall score?",
    options: [
      '5%',
      '10%',
      '15-19%',
      '25-30%',
    ],
    correctAnswer: 2,
    explanation:
      'Energy typically has a weighting of 15-19% in BREEAM assessments (varies by building type). It is one of the most significant categories alongside Health & Wellbeing and Management.',
  },
];

const faqs = [
  {
    question: 'What is the difference between an EPC and a DEC?',
    answer:
      'An Energy Performance Certificate (EPC) rates the theoretical energy performance based on building design and is required for sale/let of buildings. A Display Energy Certificate (DEC) rates actual operational energy performance based on metered consumption and is required for public buildings over 250m². EPCs are valid for 10 years; DECs are annual for larger buildings.',
  },
  {
    question: 'Does BS 7671 directly mandate energy efficiency requirements?',
    answer:
      'BS 7671 does not set specific energy efficiency targets but includes fundamental principles supporting efficient design: Regulation 132.5 requires consideration of reasonably foreseeable influences (including energy efficiency), Regulation 311.1 addresses maximum demand assessment, and Chapter 55 covers coordination with other systems. BS 7671 works alongside Part L and CIBSE guidance.',
  },
  {
    question: 'How do I demonstrate Part L compliance for a lighting installation?',
    answer:
      'You must demonstrate that lighting achieves minimum efficacy (lamp-circuit lumens per circuit watt), has appropriate controls (occupancy sensing, daylight dimming where required), and that total power density is reasonable for the space type. Documentation includes luminaire schedules, control strategies, and calculations showing compliance with Non-Domestic Building Services Compliance Guide criteria.',
  },
  {
    question: 'What happens if a building fails to meet Part L requirements?',
    answer:
      'Building control can refuse to issue a completion certificate until compliance is demonstrated. This may require modifications to building services, additional insulation, or enhanced controls. In serious cases, enforcement action can be taken. It is essential to verify compliance at design stage to avoid costly remedial work.',
  },
  {
    question: 'Are there exemptions from Part L requirements?',
    answer:
      'Some exemptions exist: buildings with very low energy demand (<50kWh/m²/year), temporary buildings (<2 years), places of worship, industrial sites with low heating requirements, and certain listed buildings where compliance would unacceptably alter character. However, even exempt buildings should follow best practice for energy efficiency.',
  },
  {
    question: 'How does Part L interact with ventilation requirements in Part F?',
    answer:
      'Part L and Part F must be considered together. Improved airtightness (Part L) requires mechanical ventilation with heat recovery (MVHR) to maintain air quality (Part F). Ventilation system efficiency (Specific Fan Power in W/l/s) is limited by Part L. Building services designers must balance thermal performance, ventilation rates, and energy consumption.',
  },
];

const HNCModule3Section6_6 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module3-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 3 · Section 6 · Subsection 6"
            title="BS 7671, CIBSE and Part L requirements for energy efficiency"
            description="UK regulatory frameworks governing energy efficiency in electrical installations for building services"
            tone="purple"
          />

          <TLDR
            points={[
              'You navigate Part L (Building Regs) &harr; BS 7671 &harr; CIBSE Guides &harr; BREEAM in parallel on every commercial BSE design &mdash; they reinforce, not duplicate.',
              'You produce TER vs BER (Target Emission Rate vs Building Emission Rate) via SBEM/DSM &mdash; SBEM for naturally-ventilated, DSM for AC / mixed-mode.',
              'You map the obligations through the building lifecycle &mdash; SAP/SBEM at design, commissioning + as-built EPC at handover, in-use DEC and ESOS audit on operation.',
              'You evidence MEES (Minimum Energy Efficiency Standards) compliance for any commercial leasehold project &mdash; EPC Band E minimum, rising to C by 2027 and B by 2030.',
            ]}
          />

          <RegsCallout
            source="Building Regulations 2010 — Approved Document L (2021): Conservation of fuel and power (overarching purpose)"
            clause="Reasonable provision shall be made for the conservation of fuel and power in or in connection with buildings by limiting heat gains and losses, by providing fixed building services that are energy-efficient, have effective controls, and are commissioned by testing and adjustment as necessary to ensure they use no more fuel and power than is reasonable in the circumstances. A notice giving particulars of the commissioning should be given to the building control body."
            meaning={
              <>
                Approved Document L 2021 is the apex regulatory anchor for energy
                efficiency on UK BSE projects. As designer you orchestrate all the
                downstream evidence &mdash; SBEM/DSM TER vs BER calculation, motor IE
                class, lighting LENI, BMS controls strategy, transformer Tier-2
                Ecodesign, commissioning M&amp;V &mdash; into one coherent submission
                that satisfies Building Control. CIBSE and BS 7671 give you the
                technical methodology; Part L is the statutory hook.
              </>
            }
            cite="Source: Building Regulations 2010 + Approved Document L (2021); BS 7671:2018+A4:2026; CIBSE Guides A, F, L; BREEAM UK New Construction; ESOS Regulations 2014; MEES Regulations 2015 + 2023 amendments; SAP / SBEM methodology"
          />

          <SectionRule />

          <ConceptBlock title="In 30 seconds">
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Part L:</strong> Conservation of fuel and power in buildings</li>
              <li><strong>TER vs BER:</strong> Target vs actual CO₂ emissions</li>
              <li><strong>CIBSE Guide L:</strong> Sustainability in building services</li>
              <li><strong>BS 7671:</strong> Supporting efficient design principles</li>
            </ul>
            <p className="text-sm font-medium text-elec-yellow/80">Building Services Context</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Sub-metering:</strong> Required for buildings over 1000m²</li>
              <li><strong>BREEAM:</strong> Environmental assessment method</li>
              <li><strong>DECs:</strong> Display Energy Certificates for public buildings</li>
              <li><strong>Documentation:</strong> Design stage and as-built compliance</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Building Regulations Part L Overview">
            <p>
              Part L of the Building Regulations addresses the conservation of fuel and power. It
              sets minimum standards for the energy performance of new buildings, extensions, and
              building services installations, forming the cornerstone of UK building energy
              legislation.
            </p>

              <p className="text-sm font-medium text-white">Part L Structure (2021 Edition)</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Volume 1:</strong> New dwellings - residential energy requirements
                </li>
                <li>
                  <strong>Volume 2:</strong> New buildings other than dwellings -
                  commercial/industrial
                </li>
                <li>
                  <strong>Existing Dwellings:</strong> Extensions, renovations, and alterations
                </li>
                <li>
                  <strong>Existing Buildings:</strong> Non-domestic extensions and work
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Key Part L Requirements for Building Services
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Energy efficiency of fixed building services</strong> — Heating, cooling, lighting, ventilation — Meet minimum efficacy standards</li>
              <li><strong>Controls for building services</strong> — Time, temperature, occupancy sensing — Appropriate control strategy</li>
              <li><strong>Commissioning of systems</strong> — All fixed building services — CIBSE commissioning codes</li>
              <li><strong>Energy metering</strong> — Buildings over 1000m² — Sub-metering by end-use category</li>
              <li><strong>Information provision</strong> — Building owner/occupier — Building log book, O&M manuals</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">2021 Part L Updates</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  ~31% reduction in carbon emissions compared to 2013 standards
                </li>
                <li>Introduction of primary energy metric alongside CO₂</li>
                <li>Enhanced ventilation requirements linked to Part F</li>
                <li>Pathway towards Future Homes/Buildings Standard (2025)</li>
              </ul>

            <p>
              <strong>Note:</strong> Part L works alongside the Non-Domestic Building Services
              Compliance Guide which provides detailed technical guidance for each building service
              type.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <ConceptBlock title="Target Emission Rate (TER) vs Building Emission Rate (BER)">
            <p>
              Part L compliance requires demonstrating that a building's calculated carbon dioxide
              emissions do not exceed the target set by the regulations. This is achieved through
              comparison of the TER (Target Emission Rate) and BER (Building Emission Rate).
            </p>

              <p className="text-sm font-medium text-white">Understanding the Metrics</p>

                
                  <p className="font-medium text-elec-yellow mb-1">TER (Target Emission Rate)</p>
                  <p>
                    The maximum CO₂ emission rate for a 'notional' reference building of the same
                    size, shape and use. Calculated using SBEM or approved software.
                  </p>
                  <p className="text-xs text-white mt-2">Unit: kgCO₂/m²/year</p>

                
                  <p className="font-medium text-elec-yellow mb-1">BER (Building Emission Rate)</p>
                  <p>
                    The actual calculated CO₂ emission rate for the proposed building design, based
                    on specified fabric, systems and controls.
                  </p>
                  <p className="text-xs text-white mt-2">Unit: kgCO₂/m²/year</p>

              

              <p className="text-sm font-medium text-green-400 mb-2">Compliance Criterion</p>
              <p className="text-center text-lg font-mono text-white mb-2">BER ≤ TER</p>
              <p>
                The building emission rate must not exceed the target emission rate
              </p>

              <p className="text-sm font-medium text-elec-yellow/80">Additional Metrics</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>TFEE</strong> — Target Fabric Energy Efficiency - maximum fabric energy demand — kWh/m²/year</li>
              <li><strong>DFEE</strong> — Dwelling Fabric Energy Efficiency - actual fabric performance — kWh/m²/year</li>
              <li><strong>TPER</strong> — Target Primary Energy Rate - total primary energy target — kWh/m²/year</li>
              <li><strong>BPER</strong> — Building Primary Energy Rate - actual primary energy use — kWh/m²/year</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">Calculation Tools</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>SBEM:</strong> Simplified Building Energy Model - free government tool for
                  non-domestic buildings
                </li>
                <li>
                  <strong>SAP:</strong> Standard Assessment Procedure - for domestic buildings
                </li>
                <li>
                  <strong>DSM:</strong> Dynamic Simulation Modelling - IES, TAS, etc. for complex
                  buildings
                </li>
                <li>
                  <strong>BRUKL:</strong> Building Regulations UK Part L - output document format
                </li>
              </ul>

            <p>
              <strong>Design tip:</strong> Aim for BER significantly below TER to allow margin for
              as-built variations and to achieve BREEAM energy credits.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <ConceptBlock title="CIBSE Guide L: Sustainability">
            <p>
              CIBSE Guide L provides comprehensive guidance on sustainability in building services
              engineering, covering environmental design principles, energy efficiency strategies,
              and the role of building services in achieving sustainable buildings.
            </p>

              <p className="text-sm font-medium text-white">
                Key CIBSE Guides for Energy Efficiency
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Guide L</strong> — Sustainability — Primary guide for sustainable building services design</li>
              <li><strong>Guide F</strong> — Energy Efficiency in Buildings — Detailed energy benchmarks and calculation methods</li>
              <li><strong>Guide A</strong> — Environmental Design — Thermal comfort, indoor environment criteria</li>
              <li><strong>Guide M</strong> — Maintenance Engineering — Maintaining system efficiency over building lifetime</li>
              <li><strong>TM54</strong> — Evaluating Operational Energy — Predicting actual energy use vs design calculations</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                CIBSE Guide L Key Topics
              </p>

                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Energy hierarchy principles</li>
                  <li>Low and zero carbon technologies</li>
                  <li>Passive design strategies</li>
                  <li>Lifecycle carbon assessment</li>
                </ul>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Water efficiency</li>
                  <li>Material selection</li>
                  <li>Indoor air quality</li>
                  <li>Building adaptation and resilience</li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">CIBSE Energy Hierarchy</p>

                
                  <span className="text-green-400 font-bold w-6">1</span>
                  <span className="text-sm">
                    <strong>Be Lean:</strong> Reduce demand through passive design and efficiency
                  </span>

                
                  <span className="text-blue-400 font-bold w-6">2</span>
                  <span className="text-sm">
                    <strong>Be Clean:</strong> Use efficient and low carbon energy supply
                  </span>

                
                  <span className="text-yellow-400 font-bold w-6">3</span>
                  <span className="text-sm">
                    <strong>Be Green:</strong> Maximise on-site renewable energy generation
                  </span>

                
                  <span className="text-purple-400 font-bold w-6">4</span>
                  <span className="text-sm">
                    <strong>Be Seen:</strong> Monitor, verify and report performance
                  </span>

              

            <p>
              <strong>Application:</strong> CIBSE guides provide the technical detail to support
              Part L compliance and go beyond minimum standards towards best practice sustainable
              design.
            </p>
          </ConceptBlock>

          <ConceptBlock title="BS 7671 Requirements for Efficiency">
            <p>
              While BS 7671 (IET Wiring Regulations) primarily addresses electrical safety, it
              includes several requirements that support energy efficient design. Understanding
              these provisions helps integrate safety and sustainability in electrical
              installations.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Relevant BS 7671 Regulations
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>132.5</strong> — Reasonably foreseeable influences — Include energy efficiency as a design consideration</li>
              <li><strong>311.1</strong> — Maximum demand assessment — Prevents oversized supplies - reduces losses</li>
              <li><strong>Chapter 55</strong> — Other equipment (BMS, controls) — Coordination with control and automation systems</li>
              <li><strong>525</strong> — Voltage drop requirements — Ensures efficient power transmission</li>
              <li><strong>314</strong> — Division of installation — Circuit separation enables sub-metering</li>
            </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Regulation 311.1 - Maximum Demand
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Assess maximum demand with diversity</li>
                  <li>Prevents over-specification of supply</li>
                  <li>Reduces transformer and cable losses</li>
                  <li>Refer to Appendix 1 for diversity factors</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Regulation 525 - Voltage Drop
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Maximum 5% for power circuits</li>
                  <li>Maximum 3% for lighting circuits</li>
                  <li>Excessive Vd wastes energy as heat</li>
                  <li>Consider cable upsizing for long runs</li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Appendix 4 (Section 6.4) - Voltage Drop Calculations
              </p>
              <p>Voltage drop = (mV/A/m) × Ib × L / 1000</p>
              <p>
                Where mV/A/m is from the cable tables, Ib is design current, and L is circuit
                length. Lower voltage drop means more efficient power delivery and reduced cable
                heating.
              </p>

            <p><em>
              <strong>Integration:</strong> BS 7671 supports energy efficiency through proper design
              practices - correct cable sizing, appropriate diversity factors, and coordination with
              building services controls.
            </em></p>
          </ConceptBlock>

          <ConceptBlock title="Metering Requirements (Sub-Metering)">
            <p>
              Part L requires sub-metering in larger non-domestic buildings to enable effective
              monitoring and management of energy consumption. This allows building operators to
              identify waste, verify system performance, and target energy reduction measures.
            </p>

              <p className="text-sm font-medium text-blue-400 mb-2">Part L Metering Threshold</p>
              <p className="text-lg text-white text-center font-medium">
                Buildings &gt; 1000m² useful floor area
              </p>
              <p>
                Must provide sub-metering enabling at least 90% of estimated annual energy
                consumption to be assigned to end-use categories
              </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Required Sub-Metering Categories
              </p>

                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Lighting:</strong> General, display, emergency
                  </li>
                  <li>
                    <strong>Heating:</strong> Space heating, including pumps
                  </li>
                  <li>
                    <strong>Cooling:</strong> Chillers, DX systems, pumps
                  </li>
                  <li>
                    <strong>Ventilation:</strong> AHUs, fans, extract systems
                  </li>
                </ul>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>
                    <strong>Hot water:</strong> Domestic hot water generation
                  </li>
                  <li>
                    <strong>Small power:</strong> Socket outlets, IT equipment
                  </li>
                  <li>
                    <strong>Large loads:</strong> Kitchens, lifts, server rooms
                  </li>
                  <li>
                    <strong>Renewables:</strong> Generation and export metering
                  </li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Sub-Metering Installation Design
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>DIN rail kWh meter</strong> — Individual circuits in distribution boards — Pulse, Modbus, M-Bus</li>
              <li><strong>CT operated meter</strong> — Larger loads, busbar systems — Pulse, Modbus, BACnet</li>
              <li><strong>Multi-circuit meter</strong> — Multiple circuits from single device — Ethernet, cloud platform</li>
              <li><strong>Smart meter</strong> — Main incomer (fiscal metering) — Half-hourly data to supplier</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Best Practice Metering Strategy
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  Design distribution to group similar loads for efficient metering
                </li>
                <li>
                  Connect meters to BMS for automatic data collection and trending
                </li>
                <li>Provide sufficient CT space in panels for future metering</li>
                <li>
                  Use automatic meter reading (AMR) to enable analysis and reporting
                </li>
                <li>Consider tenant sub-metering for multi-let buildings</li>
              </ul>

            <p>
              <strong>BREEAM:</strong> Enhanced metering beyond Part L minimum can contribute to
              BREEAM credits under category Ene 02 (Energy monitoring).
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <ConceptBlock title="BREEAM and Energy Credits">
            <p>
              BREEAM (Building Research Establishment Environmental Assessment Method) is the
              leading sustainability assessment method for buildings in the UK. Energy performance
              is one of the most heavily weighted categories, making electrical installation design
              crucial.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">BREEAM Rating Levels</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Unclassified</strong> — &lt;30% — Below minimum standard</li>
              <li><strong>Pass</strong> — ≥30% — Minimum acceptable performance</li>
              <li><strong>Good</strong> — ≥45% — Standard commercial development</li>
              <li><strong>Very Good</strong> — ≥55% — Good commercial practice</li>
              <li><strong>Excellent</strong> — ≥70% — UK government requirement for public buildings</li>
              <li><strong>Outstanding</strong> — ≥85% — Top 1% of buildings - exemplar projects</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Energy-Related BREEAM Credits
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Ene 01</strong> — Reduction of energy use and carbon emissions — Efficient lighting, controls, low loss transformers</li>
              <li><strong>Ene 02</strong> — Energy monitoring — Sub-metering installation, BMS integration</li>
              <li><strong>Ene 03</strong> — External lighting — Efficient luminaires, controls, light pollution</li>
              <li><strong>Ene 04</strong> — Low carbon design — Passive design analysis, energy strategy</li>
              <li><strong>Ene 05</strong> — Energy efficient cold storage — Refrigeration controls, defrost management</li>
              <li><strong>Ene 06</strong> — Energy efficient transportation — Efficient lifts and escalators, regenerative drives</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Ene 01 - Energy Performance Credits
              </p>
              <p>
                Credits awarded based on Energy Performance Ratio (EPR):
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>EPR compares actual BER/BPER to Part L baseline</li>
                <li>Up to 15 credits available (varies by scheme)</li>
                <li>Credits scale with improvement beyond Part L</li>
                <li>
                  Minimum standards required for 'Excellent' and 'Outstanding'
                </li>
              </ul>

            <p>
              <strong>Tip:</strong> Early engagement with a BREEAM assessor allows electrical design
              to target specific credits cost-effectively.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Display Energy Certificates (DECs)">
            <p>
              Display Energy Certificates (DECs) show the actual energy performance of public
              buildings based on metered consumption data. Unlike EPCs which are theoretical, DECs
              reflect real operational performance and must be displayed prominently in the
              building.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">DEC Requirements</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>&gt;1000m²</strong> — Yes - mandatory — Annual — Every 7 years</li>
              <li><strong>250-1000m²</strong> — Yes - mandatory — Every 10 years — Every 10 years</li>
              <li><strong>&lt;250m²</strong> — Not required — - — -</li>
            </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">DEC Rating Scale</p>

                  
                    <span className="w-8 h-6 rounded bg-green-600 flex items-center justify-center font-bold text-white">
                      A
                    </span>
                    <span>0-25: Very efficient</span>

                  
                    <span className="w-8 h-6 rounded bg-green-500 flex items-center justify-center font-bold text-white">
                      B
                    </span>
                    <span>26-50: Efficient</span>

                  
                    <span className="w-8 h-6 rounded bg-lime-500 flex items-center justify-center font-bold text-black">
                      C
                    </span>
                    <span>51-75: Better than typical</span>

                  
                    <span className="w-8 h-6 rounded bg-yellow-400 flex items-center justify-center font-bold text-black">
                      D
                    </span>
                    <span>76-100: Typical</span>

                  
                    <span className="w-8 h-6 rounded bg-orange-400 flex items-center justify-center font-bold text-black">
                      E
                    </span>
                    <span>101-125: Below average</span>

                  
                    <span className="w-8 h-6 rounded bg-orange-600 flex items-center justify-center font-bold text-white">
                      F
                    </span>
                    <span>126-150: Poor</span>

                  
                    <span className="w-8 h-6 rounded bg-red-600 flex items-center justify-center font-bold text-white">
                      G
                    </span>
                    <span>&gt;150: Very poor</span>

                

              
                <p className="text-sm font-medium text-elec-yellow/80">DEC Calculation</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Based on actual metered energy consumption</li>
                  <li>Weather corrected (degree days)</li>
                  <li>Compared to benchmark for building type</li>
                  <li>Rating 100 = typical for that building type</li>
                  <li>Lower rating = better performance</li>
                </ul>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Public Buildings Requiring DECs
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>Government offices, council buildings</li>
                <li>Schools, colleges, universities</li>
                <li>Hospitals, health centres</li>
                <li>Libraries, museums, leisure centres</li>
                <li>
                  Any building frequently visited by the public and over 250m²
                </li>
              </ul>

            <p>
              <strong>Key difference:</strong> EPC rates design performance (theoretical), DEC rates
              operational performance (actual). A building can have a good EPC but poor DEC if
              operated inefficiently.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <ConceptBlock title="Building Services: Compliance Documentation">
            <p>
              Demonstrating Part L compliance requires comprehensive documentation at design stage
              and completion. Building control bodies require evidence that energy efficiency
              requirements have been met before issuing completion certificates.
            </p>

              <p className="text-sm font-medium text-elec-yellow/80">
                Design Stage Documentation
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>BRUKL output (design)</strong> — Shows predicted TER/BER compliance — Before work commences</li>
              <li><strong>Lighting design calculations</strong> — Demonstrates efficacy compliance — Design stage submission</li>
              <li><strong>Control strategy</strong> — Documents automatic controls — Design stage submission</li>
              <li><strong>Sub-metering schedule</strong> — Shows metering strategy — Design stage (buildings &gt;1000m²)</li>
            </ul>

              <p className="text-sm font-medium text-elec-yellow/80">As-Built Documentation</p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>BRUKL output (as-built)</strong> — Confirms final TER/BER compliance — SAP/SBEM assessor</li>
              <li><strong>EPC certificate</strong> — Energy Performance Certificate — Accredited energy assessor</li>
              <li><strong>Commissioning certificates</strong> — Proves systems commissioned to CIBSE codes — Commissioning engineer</li>
              <li><strong>Building log book</strong> — Operating and maintenance information — Design team / contractor</li>
              <li><strong>O&M manuals</strong> — System-specific operating instructions — Installing contractor</li>
            </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  BRUKL Document Contents
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Building geometry and orientation</li>
                  <li>Fabric U-values and air permeability</li>
                  <li>Heating/cooling system efficiencies</li>
                  <li>Lighting efficacy and controls</li>
                  <li>Renewable energy contribution</li>
                  <li>TER, BER, TPER, BPER results</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">
                  Building Log Book Contents
                </p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>System descriptions and schematics</li>
                  <li>Design parameters and setpoints</li>
                  <li>Control strategies and schedules</li>
                  <li>Maintenance requirements</li>
                  <li>Sub-metering strategy</li>
                  <li>Energy benchmarks and targets</li>
                </ul>

            

              <p className="text-sm font-medium text-orange-400 mb-2">
                Design Stage Assessment Importance
              </p>
              <p>
                Always verify Part L compliance at design stage before construction begins. Remedial
                work to achieve compliance after construction is expensive and may not be possible.
                The design stage BRUKL output gives confidence that the proposed design will comply.
              </p>

            <p><em>
              <strong>Practical tip:</strong> Keep detailed records of all equipment specifications,
              control settings, and commissioning results. These are essential evidence if
              compliance is questioned.
            </em></p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p className="text-sm font-medium text-elec-yellow/80">
                Example 1: Sub-Metering Design
              </p>
              <p>
                <strong>Question:</strong> A new 2500m² office building requires sub-metering.
                Annual energy consumption is estimated at 150,000 kWh. Design the metering strategy.
              </p>

                <p className="text-white">Step 1: Identify end-use categories</p>
                <p>- Lighting: 35,000 kWh (23%)</p>
                <p>- Small power: 45,000 kWh (30%)</p>
                <p>- HVAC: 55,000 kWh (37%)</p>
                <p>- Lifts/other: 15,000 kWh (10%)</p>
                <p>Step 2: Check 90% coverage requirement</p>
                <p>
                  90% of 150,000 kWh = <strong>135,000 kWh minimum</strong>
                </p>
                <p>Step 3: Design metering schedule</p>
                <p>- Main incomer: Fiscal meter (100%)</p>
                <p>- Lighting DB: kWh meter (23%)</p>
                <p>- Floor small power DBs: kWh meters (30%)</p>
                <p>- HVAC panel: kWh meter (37%)</p>
                <p>
                  - Total metered: <strong>90% - COMPLIANT</strong>
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 2: Part L Lighting Compliance
              </p>
              <p>
                <strong>Question:</strong> Verify lighting compliance for an open-plan office. LED
                luminaires provide 500 lux at 10W/m². Lamp-circuit efficacy is 110 lm/W.
              </p>

                <p className="text-white">Part L requirement for office general lighting:</p>
                <p>Minimum efficacy: 95 lamp-circuit lumens per circuit watt</p>
                <p>Proposed installation:</p>
                <p>
                  Efficacy = 110 lm/W &gt; 95 lm/W{' '}
                  <span className="text-green-400">✓ COMPLIANT</span>
                </p>
                <p>Controls requirement check:</p>
                <p>
                  - Occupancy sensing: <span className="text-green-400">✓ Provided</span>
                </p>
                <p>
                  - Daylight dimming (perimeter): <span className="text-green-400">✓ Provided</span>
                </p>
                <p>
                  - Time scheduling: <span className="text-green-400">✓ Via BMS</span>
                </p>
                <p className="mt-2 text-green-400">
                  <strong>Installation COMPLIES with Part L</strong>
                </p>

            

              <p className="text-sm font-medium text-elec-yellow/80">
                Example 3: BREEAM Energy Credit Calculation
              </p>
              <p>
                <strong>Question:</strong> A building achieves BER of 18 kgCO₂/m²/year against a TER
                of 25 kgCO₂/m²/year. Calculate the improvement and estimated Ene 01 credits.
              </p>

                <p className="text-white">Calculate percentage improvement:</p>
                <p>Improvement = (TER - BER) / TER × 100</p>
                <p>
                  Improvement = (25 - 18) / 25 × 100 = <strong>28%</strong>
                </p>
                <p>BREEAM Ene 01 credit estimation:</p>
                <p>- Each credit requires approximately 6% improvement</p>
                <p>- 28% improvement ÷ 6% = 4.7 credits</p>
                <p>
                  - Estimated credits: <strong>4-5 out of available credits</strong>
                </p>
                <p>
                  (Exact credits depend on BREEAM version and EPR calculation)
                </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical Guidance">
            <p className="text-sm font-medium text-elec-yellow/80">
                Key Standards Reference
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  <strong>Part L (2021):</strong> Conservation of fuel and power
                </li>
                <li>
                  <strong>Non-Domestic Building Services Compliance Guide:</strong> Technical
                  standards for systems
                </li>
                <li>
                  <strong>CIBSE Guide L:</strong> Sustainability in building services
                </li>
                <li>
                  <strong>CIBSE Guide F:</strong> Energy efficiency in buildings
                </li>
                <li>
                  <strong>BS 7671:</strong> Wiring regulations - efficiency provisions
                </li>
                <li>
                  <strong>BREEAM Technical Manual:</strong> Assessment criteria
                </li>
              </ul>

              <p className="text-sm font-medium text-elec-yellow/80">
                Design Checklist for Part L Compliance
              </p>
              <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                <li>
                  Verify lighting efficacy meets minimum standards for each space type
                </li>
                <li>
                  Specify automatic controls: occupancy, daylight, time scheduling
                </li>
                <li>Design sub-metering to cover 90% of estimated consumption</li>
                <li>Coordinate with mechanical designer on HVAC efficiency</li>
                <li>Allow for commissioning to CIBSE codes</li>
                <li>Prepare building log book information</li>
              </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Quick Reference">
            <p className="text-sm font-medium text-elec-yellow/80">Compliance Metrics</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>TER - Target Emission Rate (kgCO₂/m²/year)</li>
                  <li>BER - Building Emission Rate (must be ≤ TER)</li>
                  <li>TFEE - Target Fabric Energy Efficiency</li>
                  <li>BPER - Building Primary Energy Rate</li>
                </ul>

              
                <p className="text-sm font-medium text-elec-yellow/80">Key Thresholds</p>
                <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
                  <li>Sub-metering: buildings &gt;1000m²</li>
                  <li>DEC required: public buildings &gt;250m²</li>
                  <li>DEC annual renewal: buildings &gt;1000m²</li>
                  <li>BREEAM Excellent: government requirement</li>
                </ul>
          </ConceptBlock>

          <SectionRule />

          <Scenario
            title="Office leasehold refurbishment &mdash; MEES C-by-2027 evidence"
            situation={
              <>
                A 4500 m&sup2; commercial office on a 10-year lease has an EPC of D
                (rating 92). The landlord plans a refurbishment in 2026 with a 12-year
                forward-lease in mind. MEES Regulations require commercial leasehold to
                achieve EPC Band C by 1 April 2027. The BSE engineer is asked to design
                the electrical-services upgrades that get the building from D to C.
              </>
            }
            whatToDo={
              <>
                Three-track upgrade: (a) Lighting &mdash; full LED retrofit + presence /
                daylight controls + LENI evidence to BS EN 15193, typically delivers
                15&ndash;20 EPC points on commercial offices; (b) Motors / drives &mdash;
                replace fan/pump motors with IE3+ on VSDs across HVAC plant, deliver
                cube-law saving + Part L compliance evidence; (c) Controls &mdash;
                BMS upgrade to G36 high-performance sequences for AHUs / VAVs, sub-meter
                lighting + small power per CIBSE TM39. Re-run SBEM with as-built data;
                target EPC B (more headroom for the 2030 step) not just C. Lodge the
                new EPC and update the building&rsquo;s log book.
              </>
            }
            whyItMatters={
              <>
                MEES is now actively enforced &mdash; landlords found leasing
                sub-Band-E commercial space face up to &pound;150k civil penalties.
                The 2027 step to C and 2030 step to B will affect ~85 % of UK commercial
                stock. The BSE engineer who designs the integrated electrical upgrades
                that hit the rating unlocks the building&rsquo;s lettability for the
                next decade.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Approved Document L 2021 (Volumes 1 + 2) is the statutory anchor &mdash; SBEM / DSM compliance evidence + commissioning notice to Building Control.',
              'TER (Target Emission Rate) vs BER (Building Emission Rate) &mdash; BER must &le; TER for compliance; both reported in kgCO&#x2082;/m&sup2;/yr.',
              'BS 7671 supports Part L via Reg 132.5 (conductor sizing), Reg 311.1 (max demand), and Section 132 generally.',
              'CIBSE Guide A (environmental design), Guide F (energy efficiency), Guide L (sustainability) &mdash; the three pillars of design methodology.',
              'BREEAM UK New Construction: voluntary above Building Regs minimum &mdash; Ene credits driven by motor IE class, lighting LENI, BMS controls, sub-metering.',
              'EPC (Energy Performance Certificate) at sale / let; DEC (Display Energy Certificate) annual on public buildings &gt; 250 m&sup2;.',
              'MEES (Minimum Energy Efficiency Standards): Band E since 2018, Band C by 2027, Band B by 2030 &mdash; commercial leasehold.',
              'ESOS Regulations 2014: large enterprise (&gt; 250 staff or &gt; &pound;44m turnover) energy audit every 4 years &mdash; Phase 3 deadline 2023, Phase 4 2027.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section6-5")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Smart controls and building automation
              </div>
            </button>
            <button
              onClick={() => navigate("/study-centre/apprentice/h-n-c-module3-section6-7")}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Integration with renewables and storage systems
              </div>
            </button>
          </div>

        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule3Section6_6;
