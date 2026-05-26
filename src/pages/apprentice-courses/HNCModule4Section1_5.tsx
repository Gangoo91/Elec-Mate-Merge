/**
 * Module 4 · Section 1 · Subsection 5 — Future Load Allowances
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Capacity planning across the 30-50 year asset life: spare ways, riser headroom,
 *   EV charging (Part S), heat-pump electrification, BESS / V2B / on-site generation,
 *   and how to balance future-proofing against capital cost.
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

const TITLE = 'Future Load Allowances - HNC Module 4 Section 1.5';
const DESCRIPTION =
  'Master future load planning for building services: capacity allowances, spare ways, diversity growth, EV charging provision, and adapting to technology changes.';

const quickCheckQuestions = [
  {
    id: 'growth-allowance',
    question:
      'What is a typical growth allowance for new commercial building electrical installations?',
    options: [
      '15-20%',
      '20-30%',
      '40-50%',
      '5-10%',
    ],
    correctIndex: 1,
    explanation:
      '20-30% growth allowance is typically recommended for commercial buildings to accommodate future load increases, technology changes, and tenant requirements.',
  },
  {
    id: 'spare-ways',
    question: 'BS 7671 recommends spare ways in distribution boards for:',
    options: [
      'Aesthetic purposes',
      'Reducing harmonics',
      'Improving power factor',
      'Future circuit additions',
    ],
    correctIndex: 3,
    explanation:
      'Spare ways (typically 20-30% of total ways) allow for future circuit additions without replacing distribution boards, reducing disruption and cost.',
  },
  {
    id: 'ev-allowance',
    question:
      'For a new office building, what EV charging allowance per parking space is typically considered?',
    options: [
      '0.5-1 kVA',
      '2-4 kVA',
      '50 kVA total',
      '7-22 kVA per space',
    ],
    correctIndex: 1,
    explanation:
      '2-4 kVA per parking space (with smart charging/load management) is typical for workplace EV provision, though this depends on expected utilisation and charging strategy.',
  },
  {
    id: 'technology-change',
    question: 'When planning for technology changes, which approach is most appropriate?',
    options: [
      'At least 12 months to capture seasonal variations',
      'Planning to maintain operations during and after emergencies',
      'Design for flexibility with adequate spare capacity',
      'Compression, condensation, expansion, evaporation',
    ],
    correctIndex: 2,
    explanation:
      'Design for flexibility allows adaptation to technology changes. Adequate spare capacity in infrastructure (cable routes, switchgear, supply) enables future upgrades without major works.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'Why is future load allowance important in building design?',
    options: [
      'To maximise initial construction cost',
      'To avoid expensive retrofitting when loads increase',
      'To comply with Part L regulations',
      'To reduce initial cable sizes',
    ],
    correctAnswer: 1,
    explanation:
      'Retrofitting electrical infrastructure is typically 3-5 times more expensive than initial provision. Adequate allowances avoid disruption and cost when loads inevitably increase.',
  },
  {
    id: 2,
    question: 'Which element is typically most difficult to upgrade later?',
    options: [
      'Size, type, route, and condition',
      'Clarity, accuracy, legibility',
      'Main cable routes and risers',
      'Before any electrical testing',
    ],
    correctAnswer: 2,
    explanation:
      'Main cable routes, risers, and infrastructure are integrated into the building structure. Upgrading them often requires significant construction work and business disruption.',
  },
  {
    id: 3,
    question:
      'A building is designed with 500 kVA supply capacity. What maximum demand should be used for initial loads?',
    options: [
      '400-425 kVA (15-20% spare)',
      '500 kVA (use full capacity)',
      '250 kVA (50% spare)',
      '350-400 kVA (20-30% spare)',
    ],
    correctAnswer: 3,
    explanation:
      'Initial loads should typically be 70-80% of supply capacity, leaving 20-30% for growth. A 500 kVA supply should serve 350-400 kVA initial demand.',
  },
  {
    id: 4,
    question: 'For a new residential development, EV charging provision should consider:',
    options: [
      'Building Regulations requirements and future EV adoption',
      'L1, L2, L3 (with N for neutral and PE for protective earth)',
      'HMRC refunds the £5,000 overpayment after filing the tax return',
      'Equipment limitations for high current pulses',
    ],
    correctAnswer: 0,
    explanation:
      'Building Regulations now require EV infrastructure in new buildings. Design should consider 2030/2035 petrol/diesel phase-out targets and likely EV adoption growth.',
  },
  {
    id: 5,
    question: "What is 'future-proofing' in electrical installation design?",
    options: [
      'Dispose of properly according to waste regulations',
      'Designing infrastructure that can adapt to changing requirements',
      'Metallic (ferrous and non-ferrous) materials only',
      'Resume CPR immediately for 2 minutes before the AED re-analyses',
    ],
    correctAnswer: 1,
    explanation:
      'Future-proofing means designing adaptable infrastructure - adequate capacity, flexible distribution, accessible routes - without excessive over-engineering that wastes resources.',
  },
  {
    id: 6,
    question: 'Heat pump adoption is driving increased electrical demand because:',
    options: [
      'Carry out safe isolation: isolate, lock off, prove dead, and display warning notices',
      'Listen respectfully — they may have observed something useful — then explain your professional assessment politely',
      'Replacing gas heating with electric heat pumps significantly increases electricity demand',
      'Partial discharge or corona discharge — electrical breakdown producing ozone from oxygen in the air',
    ],
    correctAnswer: 2,
    explanation:
      'Decarbonisation means replacing gas boilers with electric heat pumps. Even with COP of 3-4, this adds significant winter electrical demand, often doubling or trebling dwelling electricity use.',
  },
  {
    id: 7,
    question:
      'When sizing spare ways in distribution boards, what percentage is typically recommended?',
    options: [
      '5-10%',
      '10-15%',
      '50%',
      '20-30%',
    ],
    correctAnswer: 3,
    explanation:
      '20-30% spare ways is typical best practice, allowing for future circuit additions, circuit splits, and unforeseen requirements without replacing distribution boards.',
  },
  {
    id: 8,
    question:
      'Which factor has most significantly increased office small power allowances in recent years?',
    options: [
      'IT equipment density and personal devices',
      'Both operational and embodied carbon emissions',
      'Design to industry benchmarks with flexibility',
      'Short-circuit AND earth fault conditions',
    ],
    correctAnswer: 0,
    explanation:
      'IT equipment density (multiple monitors, docking stations, personal devices) has significantly increased desk-level power demand, though this is partially offset by more efficient equipment.',
  },
  {
    id: 9,
    question:
      'For a speculative office development (unknown tenant), what approach to electrical design is appropriate?',
    options: [
      'Support roles assisting qualified electricians',
      'Design to industry benchmarks with flexibility',
      'Guaranteeing you will pass the actual EPA',
      'Test quarterly or recommended test frequency',
    ],
    correctAnswer: 1,
    explanation:
      'Speculative developments should be designed to CIBSE/BCO benchmarks with flexibility for tenant fit-out. Infrastructure (risers, main distribution) should accommodate reasonable tenant variation.',
  },
  {
    id: 10,
    question: 'What is the main challenge with battery energy storage system (BESS) provision?',
    options: [
      'Controlled breathing, lowering your voice, and maintaining open body language',
      'Risks should be weighed against the cost, time, and effort of reducing them',
      'Space, weight, ventilation, and connection capacity requirements',
      'Incorrect polarity can damage components or prevent proper operation',
    ],
    correctAnswer: 2,
    explanation:
      'BESS requires significant space, structural support for weight, ventilation/fire suppression, and electrical capacity for charging. Future-proofing should consider where BESS might be located.',
  },
];

const faqs = [
  {
    question: 'How much spare capacity should I allow in a new building?',
    answer:
      'As a general rule: 20-30% spare capacity in supply infrastructure, 20-30% spare ways in distribution boards, 30% spare capacity in cable containment routes. Adjust based on building type, expected tenant requirements, and technology trajectory (e.g., higher for buildings likely to electrify heating).',
  },
  {
    question: 'Should I install EV chargers now or just the infrastructure?',
    answer:
      "Building Regulations typically require a minimum number of active chargers plus cabling or cable routes for remaining spaces. 'EV-ready' (full cabling, no charger) and 'EV-enabled' (cable routes only) provide options. Consider initial demand, available capacity, and smart charging potential.",
  },
  {
    question: 'How do I account for building electrification (heat pumps, no gas)?',
    answer:
      'All-electric buildings have significantly higher electrical demand, especially in winter. Heat pumps add 5-15 kW per dwelling. Design heating-dominated loads with appropriate diversity, allow for thermal storage (hot water, building fabric), and consider demand-side response capability.',
  },
  {
    question: "What's the cost-benefit of spare capacity vs. just-in-time upgrades?",
    answer:
      'Marginal cost of additional capacity during construction is typically 10-20% of the retrofit cost. A £10,000 larger initial cable might avoid a £50,000+ retrofit. However, excessive over-provision ties up capital and may never be used. Balance based on building life, flexibility needs, and upgrade complexity.',
  },
  {
    question: 'How should I plan for data centre-style loads in offices?',
    answer:
      'Modern offices may have server rooms or high-density IT areas. Allow for dedicated cooling, UPS provision, and higher power density (500-1000 W/m² vs. standard 25 W/m²). Identify likely locations and design infrastructure to serve them, even if not initially fitted out.',
  },
  {
    question: "What technologies should I be planning for that don't exist widely today?",
    answer:
      'Consider: on-site battery storage (BESS), vehicle-to-building (V2B) energy flow, on-site renewable generation expansion, smart grid interaction, local DC distribution, automated demand response. Design infrastructure that can accommodate these without major structural or capacity constraints.',
  },
];

const HNCModule4Section1_5 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1 · Subsection 5"
            title="Future Load Allowances"
            description="Planning for growth, technology changes, and evolving building requirements in electrical system design."
            tone="purple"
          />

          <TLDR
            points={[
              'Building electrical systems live 30–50 years — design for the loads of year 30, not year 1.',
              'Standard growth headroom: 20–25% on supply capacity, 25–30% spare ways in DBs, 30–40% spare containment fill.',
              'EV charging is the dominant change driver — domestic 7&nbsp;kW chargers, commercial 7–22&nbsp;kW per bay, rapid 50&nbsp;kW+ DC at strategic sites.',
              'Building electrification (heat pumps replacing gas, induction kitchens, electric DHW) shifts dwellings from 2–3&nbsp;kVA gas-heated to 4–6&nbsp;kVA all-electric.',
              'BS 7671 Reg 132.16 makes additions and alterations a design assessment — leaving spare capacity now avoids ripping out switchgear later.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 132.16 (Additions and alterations to an installation)"
            clause="No addition or alteration, temporary or permanent, shall be made to an existing installation, unless it has been ascertained that the rating and the condition of any existing equipment, including that of the distributor, will be adequate for the altered circumstances. Furthermore, the earthing and bonding arrangements, if necessary for the protective measure applied for the safety of the addition or alteration, shall be adequate."
            meaning={
              <>
                Reg 132.16 is the regulatory hook for future-proofing. Every addition or
                alteration triggers a re-assessment of supply capacity, switchgear ratings,
                earthing and bonding. Designing in spare DB ways, oversized containment and
                supply headroom now is what stops a future heat-pump or EV charger upgrade
                becoming a full main-board replacement. The cost of designing in 25% headroom
                upfront is trivial against rip-out and replace later.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 132.16; CIBSE TM54 (operational performance gap)."
          />

          <LearningOutcomes
            outcomes={[
              'Apply appropriate growth allowances to electrical system design',
              'Plan spare capacity in distribution boards and containment',
              'Design for EV charging infrastructure requirements',
              'Account for building electrification trends',
              'Balance future-proofing against cost constraints',
              'Identify technology changes affecting electrical design',
            ]}
            initialVisibleCount={3}
          />

          <SectionRule />

          <ConceptBlock title="Capacity Planning Principles">
            <p>
              Building electrical systems typically have a 30-50 year lifespan, during which
              requirements will inevitably change. Effective capacity planning balances current
              needs against future flexibility without excessive over-engineering.
            </p>
            <p>
              <strong>Typical growth allowances by building element:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Main supply capacity — 20-30%:</strong> DNO upgrades expensive and slow
              </li>
              <li>
                <strong>Transformer rating — 20-25%:</strong> replacement requires outage
              </li>
              <li>
                <strong>Main switchboard — 25-30% spare ways:</strong> extensions possible but
                costly
              </li>
              <li>
                <strong>Distribution boards — 20-30% spare ways:</strong> future circuits, circuit
                splits
              </li>
              <li>
                <strong>Cable containment — 30-40%:</strong> additional cables easily added
              </li>
              <li>
                <strong>Riser capacity — 30-50%:</strong> structural modifications difficult
              </li>
              <li>
                <strong>Busbar trunking — 20-30%:</strong> tap-off flexibility valuable
              </li>
            </ul>
            <p>
              <strong>The cost-benefit equation — marginal cost of extra capacity:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Larger cable: +10-20%</li>
              <li>More DB ways: +5-15%</li>
              <li>Larger containment: +15-25%</li>
              <li>Higher supply capacity: +10-30%</li>
            </ul>
            <p>
              <strong>Retrofit cost multiple:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Replace cables: 3-5× initial</li>
              <li>New DB: 2-3× initial</li>
              <li>New containment: 5-10× initial</li>
              <li>Supply upgrade: 3-10× initial</li>
            </ul>
            <p>
              <strong>Design philosophy:</strong> Infrastructure that is difficult to upgrade later
              warrants higher allowances; elements easily added can be more tightly specified.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Spare Ways and Distribution Planning">
            <p>
              Distribution board sizing must account for both current circuits and future additions.
              Undersized boards lead to expensive replacements or inappropriate circuit sharing.
            </p>
            <p>
              <strong>Distribution board sizing guidance:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Domestic consumer unit:</strong> 2-4 spare ways — EV, heat pump, additions
              </li>
              <li>
                <strong>Small commercial DB:</strong> 20-25% spare — tenant changes, circuits
              </li>
              <li>
                <strong>Office floor DB:</strong> 25-30% spare — flexible fit-out expected
              </li>
              <li>
                <strong>Industrial DB:</strong> 20-30% spare — process changes, machinery
              </li>
              <li>
                <strong>Main switchboard:</strong> 25-30% spare — major outage to extend
              </li>
            </ul>
            <p>
              <strong>Types of spare provision — spare ways (fitted blanks):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Circuit breaker position available</li>
              <li>Busbars rated for future load</li>
              <li>Quick addition of new circuits</li>
              <li>Cost: minimal additional</li>
            </ul>
            <p>
              <strong>Types of spare provision — space for extension:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Physical space adjacent to DB</li>
              <li>Busbar extension possible</li>
              <li>Allows significant expansion</li>
              <li>Cost: planning only</li>
            </ul>
            <p>
              <strong>Common future circuit requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>EV charging points (7-22 kW each)</li>
              <li>Additional small power circuits for desk density changes</li>
              <li>Dedicated circuits for high-power equipment</li>
              <li>Circuit splits to reduce discrimination issues</li>
              <li>New mechanical equipment (fan coils, pumps)</li>
              <li>Building automation and control systems</li>
            </ul>
            <p>
              <strong>Practical tip:</strong> Label spare ways with 'SPARE' and record capacity
              availability in building O&amp;M documentation.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="EV Charging Provision">
            <p>
              Electric vehicle charging is a major driver of increased electrical demand. Building
              Regulations now require EV infrastructure in new buildings, and existing buildings
              face growing retrofit demand.
            </p>
            <p>
              <strong>Building Regulations requirements (Part S):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>New residential:</strong> 1 charge point per dwelling with parking
              </li>
              <li>
                <strong>New non-residential:</strong> 1 charge point per 5 spaces, cable routes for
                remainder
              </li>
              <li>
                <strong>Major renovation:</strong> similar requirements apply
              </li>
              <li>
                <strong>Minimum rating:</strong> 7 kW (Mode 3)
              </li>
            </ul>
            <p>
              <strong>EV charging infrastructure levels:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Active (charge point):</strong> full charger installed and operational —
                full cost now
              </li>
              <li>
                <strong>EV Ready:</strong> full cabling installed, no charger — ~70% of active cost
              </li>
              <li>
                <strong>EV Enabled:</strong> cable routes and DB capacity only — ~30% of active cost
              </li>
              <li>
                <strong>Nothing:</strong> no provision — retrofit 3-5× cost
              </li>
            </ul>
            <p>
              <strong>Load management strategies:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Unmanaged:</strong> full power to all chargers simultaneously (7-22 kW each)
              </li>
              <li>
                <strong>Static load management:</strong> fixed reduced power per charger (e.g. 3.7
                kW)
              </li>
              <li>
                <strong>Dynamic load management:</strong> intelligent sharing of available capacity
              </li>
              <li>
                <strong>Smart charging:</strong> time-of-use optimisation, grid response capability
              </li>
            </ul>
            <p>
              <strong>Capacity allowance examples (per space):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Residential (home):</strong> 7 kW — overnight charging, high diversity
              </li>
              <li>
                <strong>Workplace (smart):</strong> 2-4 kVA diversified — all-day dwell, load
                management
              </li>
              <li>
                <strong>Retail/destination:</strong> 7-22 kW — short dwell, faster charging needed
              </li>
              <li>
                <strong>Fleet depot:</strong> 7-22 kW per vehicle — managed overnight charging
              </li>
            </ul>
            <p>
              <strong>Key consideration:</strong> The 2030 new car sales deadline means EV
              penetration will accelerate significantly. Plan for 50%+ EV by 2030, 80%+ by 2040.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Adapting to Technology Changes">
            <p>
              Building electrical systems must adapt to technologies that may not exist widely
              today. Designing for flexibility rather than specific technologies reduces future
              obsolescence risk.
            </p>
            <p>
              <strong>Key technology trends affecting electrical design:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Building electrification:</strong> heat pumps replacing gas boilers
                significantly increases electrical demand, particularly winter peak — consider 3-5×
                current heating-related electrical load
              </li>
              <li>
                <strong>On-site generation &amp; storage:</strong> solar PV, battery storage (BESS)
                and vehicle-to-building (V2B) require bidirectional power flow capability and grid
                interface equipment
              </li>
              <li>
                <strong>Smart grid interaction:</strong> demand response, flexible loads and grid
                services require intelligent monitoring, control systems and potentially export
                capability
              </li>
              <li>
                <strong>Increased IT density:</strong> edge computing, IoT devices and personal
                technology continue to increase distributed power demand across buildings
              </li>
            </ul>
            <p>
              <strong>Future-proofing strategies — infrastructure provision:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Heat pumps:</strong> additional supply capacity, three-phase provision,
                space for outdoor units
              </li>
              <li>
                <strong>Battery storage (BESS):</strong> identified location with ventilation,
                structural support, cabling route to main switchboard
              </li>
              <li>
                <strong>Solar PV expansion:</strong> roof structural allowance, inverter space, DC
                cabling routes, export metering capability
              </li>
              <li>
                <strong>Vehicle-to-building (V2B):</strong> bidirectional charger provision,
                anti-islanding protection, control system integration
              </li>
              <li>
                <strong>DC distribution:</strong> segregated containment routes, space for DC
                distribution equipment
              </li>
            </ul>
            <p>
              <strong>Net zero building implications:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                All-electric buildings have 2-3× the electrical demand of gas-heated equivalents
              </li>
              <li>Demand-side flexibility becomes essential for grid stability</li>
              <li>On-site generation and storage may become standard</li>
              <li>Electrical infrastructure is a key enabler of decarbonisation</li>
            </ul>
            <p>
              <strong>Design principle:</strong> Build infrastructure for flexibility. Specific
              equipment can be added when technologies mature; infrastructure is costly to retrofit.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — office building growth allowance:</strong> A new 10,000m² office
              has calculated initial demand of 650 kVA. What supply capacity should be requested?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Initial demand: 650 kVA</li>
              <li>Growth allowance: 25% recommended for office</li>
              <li>Design capacity = 650 × 1.25 = 812 kVA</li>
              <li>Round to standard sizes</li>
              <li>
                Request: <strong>800 kVA or 1000 kVA supply</strong>
              </li>
              <li>If EV charging for 100 spaces, add ~200 kVA diversified</li>
            </ul>
            <p>
              <strong>Example 2 — EV charging capacity:</strong> A workplace has 200 parking spaces.
              Estimate EV charging capacity with smart load management.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Parking spaces: 200</li>
              <li>Active charge points (Part S min): 200 ÷ 5 = 40</li>
              <li>Unmanaged capacity: 40 × 7kW = 280 kW</li>
              <li>With smart management (diversity ~0.4): 280 × 0.4 = 112 kW</li>
              <li>Future provision (100% spaces): 200 spaces × 2.5 kVA diversified = 500 kVA potential</li>
              <li>
                Recommended allowance: <strong>150-200 kVA initially</strong>
              </li>
              <li>Design infrastructure for 500 kVA expansion</li>
            </ul>
            <p>
              <strong>Example 3 — distribution board sizing:</strong> An office floor requires 24
              circuits initially. Size the distribution board.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Initial circuits: 24</li>
              <li>Spare allowance: 25%</li>
              <li>Total ways needed: 24 × 1.25 = 30 ways</li>
              <li>Standard DB sizes: 24, 36, 48 ways (typical)</li>
              <li>
                Select: <strong>36-way distribution board</strong>
              </li>
              <li>Provides 12 spare ways (33% spare) — good flexibility</li>
              <li>Consider 48-way if tenant flexibility expected</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Future load planning checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Apply appropriate growth allowances by building element</li>
              <li>Plan EV charging to Building Regulations minimum plus growth</li>
              <li>Consider building electrification (heat pumps, no gas)</li>
              <li>Size containment for 30-40% additional cables</li>
              <li>Identify BESS and generation locations</li>
              <li>Document spare capacity in O&amp;M information</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Supply growth allowance: <strong>20-30%</strong>
              </li>
              <li>
                Spare ways: <strong>20-30%</strong>
              </li>
              <li>
                Containment spare: <strong>30-40%</strong>
              </li>
              <li>
                EV diversified: <strong>2-4 kVA/space</strong> (workplace)
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>No EV provision</strong> — Building Regulations now require it
                </li>
                <li>
                  <strong>Tight containment</strong> — future cables impossible without new routes
                </li>
                <li>
                  <strong>Ignoring electrification</strong> — heat pump demand is significant
                </li>
                <li>
                  <strong>No spare documentation</strong> — lost knowledge of available capacity
                </li>
              </ul>
            }
            doInstead="Default to Part S compliance plus growth, oversize containment by 30-40%, model the building as if it will go all-electric within 10-15 years, and hand over a clear schedule of spare ways / spare capacity to the building operator."
          />

          <SectionRule />

          <Scenario
            title="40-flat residential block — sizing for future EV and heat-pump uptake"
            situation={
              <>
                A 40-flat new-build apartment block is being designed. Today the dwellings will
                be gas-heated (DHW and heating) with no EV charging fitted. The client wants the
                supply &lsquo;EV-ready and heat-pump-ready&rsquo; to avoid a costly DNO upgrade
                in 5–10 years when both technologies become standard.
              </>
            }
            whatToDo={
              <>
                Today&rsquo;s ADMD: 40 × 2.5&nbsp;kVA × 0.5 inter-dwelling diversity ≈ 50&nbsp;kVA.
                Future ADMD with all-electric heat pumps: 40 × 5&nbsp;kVA × 0.5 ≈ 100&nbsp;kVA.
                Add EV charging at 7&nbsp;kW per dwelling × 40, with smart-charging diversity
                ≈ 0.25, ≈ 70&nbsp;kVA. Total future ≈ 170&nbsp;kVA. Specify a 200&nbsp;kVA DNO TX
                with 250&nbsp;kVA reinforcement headroom, 300&nbsp;A four-pole isolator,
                400&nbsp;A rated busbar in the meter chamber, and 25% spare in landlord
                services DBs. Document the design intent against Reg 132.16 in the O&amp;M and
                the Part L submission.
              </>
            }
            whyItMatters={
              <>
                Designing in headroom adds maybe 5% to capital cost. Retro-fitting a DNO upgrade
                with the building occupied costs 10–20× that, often impossible without a
                dedicated outage and tenant decant. Reg 132.16 says any addition must check the
                existing distributor capacity is adequate — leave it short and the DNO blocks the
                future heat-pump rollout.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Buildings live 30–50 years — design for the loads of year 30, not year 1.',
              'Standard growth headroom: 20–25% supply capacity, 25–30% spare DB ways, 30–40% spare containment fill.',
              'EV charging is the dominant load growth driver: 7&nbsp;kW domestic, 7–22&nbsp;kW commercial, smart-charging diversity 0.2–0.3.',
              'Building electrification shifts dwelling ADMD from 2–3&nbsp;kVA (gas) to 4–6&nbsp;kVA (all-electric) — design for the heat-pump future today.',
              'Reg 132.16 forces a capacity re-assessment on every addition or alteration — spare capacity now avoids ripping out switchgear later.',
              'High-density loads (data, EV bay, server room) need dedicated infrastructure, not shared diversity assumptions.',
              'Containment first: oversize ladders/trays/risers — they are nearly impossible to upgrade later without major works.',
              'Document the design intent in O&amp;M — future engineers need to know what you assumed.',
            ]}
          />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section1-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Harmonic assessment
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section1-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Building services load profiles
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section1_5;
