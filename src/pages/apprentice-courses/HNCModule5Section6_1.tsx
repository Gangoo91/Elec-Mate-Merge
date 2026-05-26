/**
 * Module 5 · Section 6 · Subsection 1 — Site Organisation
 * HNC Electrical Engineering for Building Services (Project Management — Pearson U4004 + BSE PM context)
 *   Site facilities, welfare, security, access control and temporary services — the operational base on which all delivery sits.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  CommonMistake,
  ConceptBlock,
  FAQ,
  KeyTakeaways,
  LearningOutcomes,
  RegsCallout,
  Scenario,
  SectionRule,
  TLDR,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Site Organisation - HNC Module 5 Section 6.1';
const DESCRIPTION =
  'Master site organisation for building services projects: site facilities, welfare provisions, security arrangements, access control, and temporary services coordination under CDM regulations.';

const quickCheckQuestions = [
  {
    id: 'welfare-cdm',
    question: 'Under CDM 2015, who has the primary duty to provide welfare facilities on site?',
    options: [
      'The principal contractor',
      'The principal designer',
      'The client',
      'The building services contractor',
    ],
    correctIndex: 0,
    explanation:
      'The principal contractor has the primary duty under CDM 2015 to provide adequate welfare facilities for all workers on the construction site.',
  },
  {
    id: 'compound-layout',
    question: 'What is the primary consideration when planning site compound layout?',
    options: [
      'Periodic synchronization signals from coordinators',
      'Maintaining safe traffic and pedestrian segregation',
      'CDM 2007 replaced it with the CDM Co-ordinator',
      'AC to DC using both half-cycles via four diodes',
    ],
    correctIndex: 1,
    explanation:
      'Safe segregation of vehicle and pedestrian routes is the primary safety consideration in compound layout planning to prevent struck-by incidents.',
  },
  {
    id: 'temp-electrical',
    question: 'What voltage is required for portable tools on construction sites under BS 7671?',
    options: [
      '110V centre-tapped earth',
      '230V single phase',
      '400V three phase',
      '50V SELV',
    ],
    correctIndex: 0,
    explanation:
      '110V centre-tapped earth (CTE) is the standard for portable tools on UK construction sites, limiting shock voltage to 55V to earth.',
  },
  {
    id: 'access-control',
    question: 'An induction is required before site access primarily to:',
    options: [
      'To prevent delays, clashes, and rework',
      'An impulse line filled with fill fluid',
      'Insulation resistance test between L-E and N-E',
      'Communicate site-specific hazards and rules',
    ],
    correctIndex: 3,
    explanation:
      'Site inductions ensure all workers understand site-specific hazards, emergency procedures, and rules before starting work.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'According to CDM 2015, welfare facilities must include which minimum provisions?',
    options: [
      'The Contractor loses their right to additional time and money',
      'Toilets, washing facilities, drinking water, rest area, changing rooms',
      'The ground may collapse under the weight of the MEWP, causing it to overturn',
      'Issue records, training records, inspection records, maintenance records',
    ],
    correctAnswer: 1,
    explanation:
      'CDM 2015 Schedule 2 specifies minimum welfare requirements: sanitary conveniences, washing facilities, drinking water, changing rooms/lockers, and facilities for rest.',
  },
  {
    id: 2,
    question: 'How many sanitary conveniences are required for up to 25 workers under CDM 2015?',
    options: [
      '3',
      '4',
      '1',
      '2',
    ],
    correctAnswer: 2,
    explanation:
      'CDM 2015 guidance recommends minimum 1 toilet per 7 males or 1 per 25 if urinals also provided, and 1 per 7 females. For mixed sites up to 25, minimum 1 is required.',
  },
  {
    id: 3,
    question:
      'Temporary electrical supplies on construction sites should be installed in accordance with:',
    options: [
      'HSE guidance only',
      'BS 7671 only',
      "Site manager's discretion",
      'BS 7671 and BS 7909',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 provides general requirements whilst BS 7909 gives specific guidance for temporary electrical installations at events and construction sites.',
  },
  {
    id: 4,
    question: 'The recommended maximum cable run for 110V supplies on site is:',
    options: [
      '100 metres',
      '50 metres',
      '25 metres',
      'No specific limit',
    ],
    correctAnswer: 0,
    explanation:
      "While there's no absolute limit, 100 metres is typically the practical maximum for 110V supplies to maintain acceptable voltage drop and protection.",
  },
  {
    id: 5,
    question: 'A site compound fire assembly point should be:',
    options: [
      'Either mains connection or bowser with appropriate treatment',
      'At a safe distance from the compound with clear access',
      'Adjacent to delivery access with good ground conditions',
      'IP44 rated minimum and 30mA RCD protected',
    ],
    correctAnswer: 1,
    explanation:
      'Fire assembly points must be at a safe distance from potential fire hazards, clearly signed, and with clear access for emergency services.',
  },
  {
    id: 6,
    question: 'Temporary water supplies on construction sites typically require:',
    options: [
      'When they have a mortgage or dependants who rely on their income',
      'Higher operating frequency eliminates flicker and improves efficacy',
      'Either mains connection or bowser with appropriate treatment',
      'The internal test resistor has failed but the RCD mechanism works',
    ],
    correctAnswer: 2,
    explanation:
      'Temporary water can be supplied via mains connection or bowser tanks. Bowser water for drinking must be treated and regularly tested.',
  },
  {
    id: 7,
    question: 'What is the minimum illumination level required in welfare facilities?',
    options: [
      '50 lux',
      '100 lux',
      '200 lux',
      '150 lux',
    ],
    correctAnswer: 3,
    explanation:
      'HSE guidance recommends minimum 150 lux in welfare facilities to enable safe use of facilities and reading of safety notices.',
  },
  {
    id: 8,
    question: 'Site security fencing should typically be a minimum height of:',
    options: [
      '2.0 metres',
      '2.4 metres',
      '1.2 metres',
      '1.8 metres',
    ],
    correctAnswer: 0,
    explanation:
      '2.0 metres is the recommended minimum height for site security fencing to deter unauthorised access and protect the public.',
  },
  {
    id: 9,
    question:
      'Hot work permits are required when working within what distance of combustible materials?',
    options: [
      '3 metres',
      '10 metres',
      '6 metres',
      '15 metres',
    ],
    correctAnswer: 1,
    explanation:
      'Hot work permits are typically required when working within 10 metres of combustible materials, though this may vary by site rules.',
  },
  {
    id: 10,
    question: 'Material storage areas should be positioned:',
    options: [
      'IP44 rated minimum and 30mA RCD protected',
      'Either mains connection or bowser with appropriate treatment',
      'Adjacent to delivery access with good ground conditions',
      'At a safe distance from the compound with clear access',
    ],
    correctAnswer: 2,
    explanation:
      'Storage areas should be accessible for deliveries, on firm level ground, and positioned to minimise double-handling of materials.',
  },
  {
    id: 11,
    question:
      'The Construction Logistics and Community Safety (CLOCS) standard primarily addresses:',
    options: [
      'A load with unequal current draw on each phase',
      'All lids are in place and secured',
      'Equivalent CO2 impact per kg released',
      'Safe vehicle movements and driver competence',
    ],
    correctAnswer: 3,
    explanation:
      'CLOCS focuses on construction vehicle safety, particularly protecting vulnerable road users through driver training, vehicle standards, and route planning.',
  },
  {
    id: 12,
    question: 'Temporary electrical distribution boards on site must be:',
    options: [
      'IP44 rated minimum and 30mA RCD protected',
      'Protected by fuses rather than MCBs',
      'Protected by 30mA RCD only',
      'Located inside site cabins only',
    ],
    correctAnswer: 0,
    explanation:
      'Site distribution equipment must be minimum IP44 rated for outdoor use and all socket circuits protected by 30mA RCDs for personal protection.',
  },
];

const faqs = [
  {
    question: 'Who is responsible for site welfare facilities on a multi-contractor project?',
    answer:
      'The principal contractor has overall responsibility for welfare provisions under CDM 2015. However, the client must ensure adequate arrangements are in place before work starts, and individual contractors must not obstruct welfare access. On larger projects, welfare costs are often shared through preliminaries or levies.',
  },
  {
    question: 'Can 230V equipment be used on construction sites?',
    answer:
      "Yes, but only where it's fixed installation or where 110V is impractical. Fixed 230V equipment must have appropriate RCD protection. Some specialist equipment (large power tools, welding equipment) may operate at 230V or 400V with specific risk assessments and additional safety measures including RCDs and competent operators.",
  },
  {
    question: 'What records should be kept for temporary electrical installations?',
    answer:
      'Records should include: initial installation certificate, periodic inspection records (typically every 3 months), PAT testing records for portable equipment, fault logs, and any modifications. These demonstrate compliance with CDM and Electricity at Work Regulations.',
  },
  {
    question: 'How often should site security be reviewed?',
    answer:
      'Security arrangements should be reviewed: weekly as part of site inspections, after any security incidents, when site layout changes, when valuable materials/equipment arrive, and at key project phases. Night-time security may need enhancement during sensitive fit-out phases.',
  },
  {
    question: 'What temporary services coordination is needed between trades?',
    answer:
      'The principal contractor should establish a temporary services strategy covering: power distribution routing, transformer locations, water supply points, compressed air if required, temporary heating, data/communications, and phased handover as permanent services come online. Regular coordination meetings prevent conflicts.',
  },
  {
    question: 'What are the requirements for site cabins and offices?',
    answer:
      'Site accommodation must be: structurally sound, weatherproof, adequately heated (minimum 16 degrees for sedentary work), ventilated, lit to appropriate standards, with emergency exits. Offices need data connections, meeting space, and secure document storage. Welfare units need hot water, adequate heating, and proper drainage.',
  },
];

const HNCModule5Section6_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 5 · Section 6 · Subsection 1"
            title="Site Organisation"
            description="Site facilities, welfare provisions, security arrangements, access control and temporary services coordination."
            tone="purple"
          />

          <TLDR
            points={[
              "Site organisation = the physical and procedural infrastructure that lets the project be built safely and productively.",
              "CDM 2015 Schedule 2 minimum welfare: WCs, washing facilities, drinking water, changing/storage, rest facilities — non-negotiable.",
              "Security: perimeter fencing, access control (signing-in, induction), CCTV, lighting — protect both people and materials.",
              "Temporary services: power, water, drainage, lighting, heating — sized for the construction phase, not just occupancy.",
              "Site logistics: lay-down areas, crane positions, deliveries, waste streams — planned in pre-construction.",
            ]}
          />

          <RegsCallout
            source="CDM 2015 — Regulation 13(4)(c) (Duties of a principal contractor)"
            clause="The principal contractor must consult and engage with workers in matters which may affect their health, safety or welfare; ensure that workers are provided with suitable site induction; and ensure that the necessary welfare facilities are provided in accordance with Schedule 2 throughout the construction phase."
            meaning={
              <>
                CDM 2015 places explicit welfare duties on the principal contractor — Schedule 2 minimums must be in place from the start of work, not "when convenient". Site organisation is therefore a CDM compliance matter, not an operational nicety. HSE inspectors check welfare on every visit.
              </>
            }
            cite="Source: Construction (Design and Management) Regulations 2015 — legislation.gov.uk"
          />


          <LearningOutcomes
            outcomes={[
              'Plan site compound layout for safe and efficient operations',
              'Specify welfare facilities compliant with CDM 2015 requirements',
              'Design temporary electrical distribution systems for construction',
              'Implement effective security and access control measures',
              'Coordinate temporary services between multiple contractors',
              'Manage material storage and handling logistics',
            ]}
          />

          <SectionRule />

          <ConceptBlock title="Site Setup Planning">
            <p>
              Effective site organisation begins before construction starts. The principal
              contractor must plan the compound layout, access routes, and temporary services to
              support safe and efficient work throughout the project duration.
            </p>
            <p>
              <strong>Site setup planning sequence:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Pre-construction survey:</strong> Ground conditions, services, access
                constraints
              </li>
              <li>
                <strong>Compound layout design:</strong> Offices, welfare, storage, parking zones
              </li>
              <li>
                <strong>Traffic management plan:</strong> Vehicle/pedestrian segregation, delivery
                routes
              </li>
              <li>
                <strong>Temporary services specification:</strong> Power, water, drainage,
                communications
              </li>
              <li>
                <strong>Security strategy:</strong> Fencing, CCTV, access control, lighting
              </li>
            </ul>
            <p>
              <strong>Compound layout considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Site entrance:</strong> Gatehouse, signing-in, wheel wash — Main road access
                with visibility
              </li>
              <li>
                <strong>Offices:</strong> Meeting space, document storage — Near entrance,
                overlooking site
              </li>
              <li>
                <strong>Welfare:</strong> Toilets, canteen, drying room — Central for all workers,
                drainage access
              </li>
              <li>
                <strong>Material storage:</strong> Level ground, secure, weather protection —
                Crane/forklift accessible
              </li>
              <li>
                <strong>Waste management:</strong> Segregated skips, recycling — Vehicle access for
                collection
              </li>
            </ul>
            <p>
              <strong>Planning principle:</strong> Site layout should evolve through project phases
              - plan for adaptability as work progresses from groundworks through to fit-out.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Welfare Facilities (CDM Requirements)">
            <p>
              CDM 2015 Schedule 2 mandates specific welfare provisions for construction sites. The
              principal contractor must ensure adequate facilities are available from day one and
              maintained throughout the project.
            </p>
            <p>
              <strong>CDM 2015 Schedule 2 — mandatory welfare provisions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Sanitary conveniences:</strong> Adequate numbers, properly ventilated, lit,
                maintained
              </li>
              <li>
                <strong>Washing facilities:</strong> Hot and cold (or warm) water, soap, towels or
                drying
              </li>
              <li>
                <strong>Drinking water:</strong> Readily accessible, clearly marked, cups provided
              </li>
              <li>
                <strong>Changing/storage:</strong> Secure lockers for clothing and personal effects
              </li>
              <li>
                <strong>Rest facilities:</strong> Shelter, seating, means to heat food, boil water
              </li>
            </ul>
            <p>
              <strong>Welfare provision ratios:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1-5 workers:</strong> 1 WC, 1 wash station
              </li>
              <li>
                <strong>6-25 workers:</strong> 2 WCs, 2 wash stations
              </li>
              <li>
                <strong>26-50 workers:</strong> 3 WCs, 3 wash stations
              </li>
              <li>
                <strong>51-75 workers:</strong> 4 WCs, 4 wash stations
              </li>
              <li>
                <strong>76-100 workers:</strong> 5 WCs, 5 wash stations
              </li>
              <li>Note: Additional facilities may be required for mixed-gender workforces</li>
            </ul>
            <p>
              <strong>Rest facilities must include:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Adequate seating with backs</li>
              <li>Tables for eating</li>
              <li>Means to heat food (microwave)</li>
              <li>Boiling water for hot drinks</li>
              <li>Heating in cold weather</li>
              <li>Protection from tobacco smoke</li>
            </ul>
            <p>
              <strong>Additional considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Drying room for wet clothing</li>
              <li>Separate facilities for women</li>
              <li>Accessible facilities (disabled)</li>
              <li>First aid room for larger sites</li>
              <li>Cleaning regime and supplies</li>
              <li>Waste disposal arrangements</li>
            </ul>
            <p>
              <strong>Compliance tip:</strong> Document welfare provision in the construction phase
              plan and conduct regular inspections to maintain standards.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Security and Access Control">
            <p>
              Construction sites present security challenges from theft, vandalism, and unauthorised
              access. Effective security protects workers, the public, and valuable materials and
              equipment.
            </p>
            <p>
              <strong>Security measures:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Perimeter fencing:</strong> 2.0m minimum, anti-climb — Prevent unauthorised
                entry
              </li>
              <li>
                <strong>Security lighting:</strong> Motion-activated, full perimeter — Deter
                intruders, CCTV effectiveness
              </li>
              <li>
                <strong>CCTV:</strong> IP cameras, remote monitoring — Surveillance, incident
                evidence
              </li>
              <li>
                <strong>Intruder alarms:</strong> Monitored, compound and stores — Alert
                security/response
              </li>
              <li>
                <strong>Secure containers:</strong> Heavy-duty locks, ground anchors — Protect
                valuable tools/materials
              </li>
            </ul>
            <p>
              <strong>Access control requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Site induction:</strong> Mandatory before any access, covers hazards, rules,
                emergency procedures
              </li>
              <li>
                <strong>Identity verification:</strong> Check CSCS/ECS cards, photo ID, right to work
              </li>
              <li>
                <strong>Sign-in/out system:</strong> Electronic or manual register for fire
                evacuation roll call
              </li>
              <li>
                <strong>Visitor management:</strong> Escorted access, visitor PPE, limited areas
              </li>
              <li>
                <strong>Vehicle control:</strong> Delivery booking system, authorised drivers only
              </li>
            </ul>
            <p>
              <strong>Induction content (minimum):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Site-specific hazards</li>
              <li>Emergency procedures and assembly</li>
              <li>First aid arrangements</li>
              <li>PPE requirements</li>
              <li>Prohibited areas/activities</li>
              <li>Reporting procedures</li>
              <li>Welfare facilities location</li>
              <li>Working hours and access times</li>
            </ul>
            <p>
              <strong>Best practice:</strong> Use electronic access control cards that integrate
              with time recording and automatically prevent access for workers with expired
              inductions.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Temporary Services Coordination">
            <p>
              Temporary electrical supplies, water, and other services are critical infrastructure
              for construction operations. The building services contractor often leads this
              coordination given their technical expertise.
            </p>
            <p>
              <strong>Temporary electrical installation requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>110V CTE:</strong> Standard for all portable hand tools (55V to earth)
              </li>
              <li>
                <strong>RCD protection:</strong> 30mA on all socket circuits, time-delay on upstream
              </li>
              <li>
                <strong>IP rating:</strong> Minimum IP44 for outdoor distribution boards
              </li>
              <li>
                <strong>Inspection:</strong> Initial certification, 3-monthly periodic inspection
              </li>
              <li>
                <strong>PAT testing:</strong> All portable equipment before first use, then 3-monthly
              </li>
            </ul>
            <p>
              <strong>Temporary power distribution layout:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Site transformer (110V):</strong> 5-10 kVA per work area — Central to work
                activities
              </li>
              <li>
                <strong>Main distribution board:</strong> 100-200A three-phase — Near DNO supply
                point
              </li>
              <li>
                <strong>Sub-distribution:</strong> 32-63A per floor/zone — Each working level
              </li>
              <li>
                <strong>Tower/task lighting:</strong> LED, 110V or SELV — Work areas, access routes
              </li>
            </ul>
            <p>
              <strong>Temporary water supply:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Mains connection or bowser tanks</li>
              <li>Potable water clearly marked</li>
              <li>Hose points for dust suppression</li>
              <li>Protection from freezing</li>
              <li>Regular testing if from bowser</li>
            </ul>
            <p>
              <strong>Storage areas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Segregated by trade/material type</li>
              <li>Weather protection for moisture-sensitive</li>
              <li>COSHH store for hazardous substances</li>
              <li>Cylinder storage (gases) ventilated</li>
              <li>Cable drum storage area</li>
            </ul>
            <p>
              <strong>Coordination responsibilities:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Principal contractor:</strong> Overall temporary services strategy, main
                supplies
              </li>
              <li>
                <strong>Building services contractor:</strong> Distribution design, installation,
                maintenance
              </li>
              <li>
                <strong>Individual contractors:</strong> Comply with connection rules, report faults
              </li>
              <li>
                <strong>Coordination meetings:</strong> Weekly review of capacity, routing, phased
                handover
              </li>
            </ul>
            <p>
              <strong>Handover planning:</strong> As permanent electrical and mechanical services
              are commissioned, plan phased transfer from temporary supplies. Maintain temporary
              backup until permanent systems proven reliable.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — Welfare provision calculation:</strong> A construction site has
              peak workforce of 85 workers. What welfare facilities are required?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Using CDM Schedule 2 ratios for 76-100 workers:</li>
              <li>
                Toilets: <strong>5 minimum</strong>
              </li>
              <li>
                Wash stations: <strong>5 minimum</strong>
              </li>
              <li>Rest area seating for 85 (typically provide for 50% = 43 seats minimum)</li>
              <li>Drinking water points - minimum 2 locations</li>
              <li>Changing/locker facilities for 85 workers</li>
              <li>Also consider: drying room, separate female facilities if mixed workforce</li>
            </ul>
            <p>
              <strong>Example 2 — Temporary power sizing:</strong> Estimate temporary power
              requirement for fit-out phase with 20 electricians and 15 mechanical fitters working
              across 4 floors.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Power tools: 1.5kW average, 3kW peak</li>
              <li>Task lighting: 0.5kW per work area</li>
              <li>35 workers × 1.5kW = 52.5kW average connected</li>
              <li>
                Apply diversity (0.4): 52.5 × 0.4 = <strong>21kW typical demand</strong>
              </li>
              <li>Plus site lighting: 4 floors × 2kW = 8kW</li>
              <li>Plus welfare: 15kW (heating, water heating, canteen)</li>
              <li>
                Total: 21 + 8 + 15 = <strong>44kW</strong>
              </li>
              <li>Provision: 63A three-phase supply (44kVA at 0.8 PF = 55kVA)</li>
              <li>4× 5kVA 110V transformers (one per floor)</li>
            </ul>
            <p>
              <strong>Example 3 — Security assessment:</strong> A city centre site has high-value
              M&E equipment arriving for installation. What security measures are appropriate?
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Urban location: higher theft risk</li>
              <li>High-value equipment: attractive target</li>
              <li>City centre: public access nearby</li>
              <li>1. Solid hoarding (2.4m) replacing mesh fencing</li>
              <li>2. 24-hour manned security during equipment delivery phase</li>
              <li>3. CCTV with remote monitoring and recording</li>
              <li>4. Secure internal compound for high-value items</li>
              <li>5. Just-in-time delivery to minimise storage time</li>
              <li>6. Asset tracking tags on major equipment</li>
              <li>
                Consider: coordinated delivery with immediate installation to avoid overnight
                storage
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Site setup checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Perimeter secured with appropriate fencing/hoarding</li>
              <li>Welfare facilities in place and operational</li>
              <li>Temporary power connected and distribution installed</li>
              <li>Water supply available (potable and construction use)</li>
              <li>Access control and induction system ready</li>
              <li>Emergency procedures posted and assembly point marked</li>
              <li>First aid provision in place</li>
              <li>Waste management arrangements operational</li>
            </ul>
            <p>
              <strong>Key values to remember:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Security fencing: <strong>2.0m minimum height</strong>
              </li>
              <li>
                Portable tool voltage: <strong>110V CTE</strong>
              </li>
              <li>
                Welfare lighting: <strong>150 lux minimum</strong>
              </li>
              <li>
                Distribution board IP rating: <strong>IP44 minimum outdoor</strong>
              </li>
              <li>
                RCD rating: <strong>30mA, 40ms</strong>
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Insufficient welfare:</strong> Calculate for peak workforce, not average
                </li>
                <li>
                  <strong>Poor transformer positioning:</strong> Leads to excessive cable runs and
                  voltage drop
                </li>
                <li>
                  <strong>Ignoring phased requirements:</strong> Site layout must adapt through
                  project
                </li>
                <li>
                  <strong>Inadequate records:</strong> Maintain inspection logs for temporary
                  installations
                </li>
                <li>
                  <strong>Late handover planning:</strong> Plan permanent services takeover early
                </li>
              </ul>
            }
            doInstead="Size welfare for peak workforce, position transformers central to demand, refresh layout each project phase, log every 3-monthly inspection, and design the temporary-to-permanent transition into the programme from day one."
          />

          <SectionRule />

          <Scenario
            title="HSE prohibition notice over inadequate welfare"
            situation={
              <>
                An MEP refurbishment of an occupied office. The contractor is using two portable toilets shared with the existing building's cleaners; no dedicated welfare cabin; nowhere to dry wet PPE; nowhere to eat. After a worker complaint, HSE visits. The inspector issues a prohibition notice: works to stop until CDM Schedule 2 welfare is provided. Two-week stoppage; reputational damage with client.
              </>
            }
            whatToDo={
              <>
                Welfare is mobilisation Day 1, not Week 4. Engage early with the client about welfare cabin location, drainage and power. If the building is occupied and external space limited, lease a remote welfare cabin and provide transport. Brief subcontractors that they cannot start without the welfare facilities being in place. Use the Construction Phase Plan to formalise the welfare arrangement — HSE inspectors read this on first visit.
              </>
            }
            whyItMatters={
              <>
                Welfare is both a legal duty and a productivity issue. Operatives without proper facilities lose time, develop health issues, and leave the site for the wrong reasons. CDM enforcement on welfare is increasingly active — a prohibition notice carries reputational and commercial consequences far beyond the cost of the cabin.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

                    <KeyTakeaways
            points={[
              "Site organisation = physical and procedural infrastructure for safe, productive delivery.",
              "CDM 2015 Schedule 2 welfare minimums: WCs, washing, drinking water, changing, rest.",
              "Security: perimeter, access control, CCTV, lighting.",
              "Temporary services sized for construction phase, not occupancy.",
              "Site logistics: lay-down, cranes, deliveries, waste streams — planned in pre-construction.",
              "Welfare from Day 1 — not \"when convenient\". HSE inspects on every visit.",
              "Construction Phase Plan documents site organisation — legally required under CDM Reg 12.",
              "Site signage, induction process, visitor protocol — first impressions of project safety culture.",
            ]}
          />


          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section6')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Site management and CDM
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module5-section6-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Progress monitoring
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule5Section6_1;
