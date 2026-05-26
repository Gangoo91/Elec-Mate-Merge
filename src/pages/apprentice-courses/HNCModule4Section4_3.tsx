/**
 * Module 4 · Section 4 · Subsection 3 — Emergency Lighting Design
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   BS 5266 / BS EN 1838 / BS EN 50172 emergency lighting — escape routes (1 lux centre
 *   line, 40:1 uniformity), open area anti-panic (0.5 lux > 60m²), high-risk task
 *   (10% / 15 lux min), 3-hour duration, maintained / non-maintained / sustained types.
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

const TITLE = 'Emergency Lighting Design - HNC Module 4 Section 4.3';
const DESCRIPTION =
  'Master emergency lighting design to BS 5266: escape route lighting, open area anti-panic lighting, high-risk task areas, maintained and non-maintained systems, and duration requirements.';

const quickCheckQuestions = [
  {
    id: 'escape-route-lux',
    question:
      'What is the minimum illuminance required on the centre line of an escape route to BS 5266?',
    options: [
      '0.2 lux',
      '0.5 lux',
      '1 lux',
      '2 lux',
    ],
    correctIndex: 2,
    explanation:
      'BS 5266 requires a minimum of 1 lux on the centre line of escape routes up to 2m wide. For wider routes, 50% of the route width must be illuminated to at least 1 lux.',
  },
  {
    id: 'standard-duration',
    question: 'What is the standard minimum duration for emergency lighting in most UK buildings?',
    options: [
      '1 hour',
      '2 hours',
      '4 hours',
      '3 hours',
    ],
    correctIndex: 3,
    explanation:
      '3 hours is the standard minimum emergency lighting duration for most buildings in the UK. This allows time for evacuation and search by emergency services. Shorter durations (1 hour) may be acceptable where immediate evacuation is possible.',
  },
  {
    id: 'maintained-definition',
    question: "What does 'maintained' emergency lighting mean?",
    options: [
      'Luminaires include self-test function',
      'Luminaires operate continuously on mains and battery',
      'Luminaires have extended battery life',
      'Luminaires require maintenance annually',
    ],
    correctIndex: 1,
    explanation:
      'Maintained emergency lighting operates continuously - both on mains supply during normal conditions and on battery during power failure. This contrasts with non-maintained which only operates during mains failure.',
  },
  {
    id: 'open-area-illuminance',
    question: 'What minimum illuminance is required for open area (anti-panic) emergency lighting?',
    options: [
      '0.2 lux',
      '0.5 lux',
      '5 lux',
      '1 lux',
    ],
    correctIndex: 1,
    explanation:
      'Open area (anti-panic) lighting requires 0.5 lux minimum at floor level. This lower level is acceptable as people are not following defined routes, but need sufficient light to orientate themselves and move safely.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the primary UK standard for emergency lighting design?',
    options: [
      'BS 7671',
      'BS 5266',
      'BS EN 60598',
      'BS EN 1838',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5266 is the primary UK standard for emergency lighting. Part 1 covers code of practice, and it references BS EN 1838 for photometric requirements. BS 7671 covers electrical installation, not emergency lighting design specifically.',
  },
  {
    id: 2,
    question:
      'What is the maximum spacing between emergency luminaires on an escape route (2m wide)?',
    options: [
      'Serpentine and amphibole groups',
      'Clamp meter to measure load current',
      'Depends on luminaire output',
      'Up to 1000V AC or 1500V DC',
    ],
    correctAnswer: 2,
    explanation:
      "Spacing depends on the luminaire's emergency output and distribution. Manufacturers provide spacing tables for their products. Maximum spacing is determined by maintaining 1 lux minimum on the centre line throughout the route.",
  },
  {
    id: 3,
    question: 'Which locations require emergency lighting to BS 5266?',
    options: [
      'Investigate, rectify, and retest before certification',
      'To avoid confusion and ensure each repair is verified',
      'Continuous background fresh air when windows are closed',
      'All escape routes and specified safety features',
    ],
    correctAnswer: 3,
    explanation:
      'Emergency lighting is required on all escape routes, open areas over 60m², at exit signs, fire fighting equipment, call points, lift cars, disabled refuges, first aid points, and other specified locations.',
  },
  {
    id: 4,
    question: 'What is the minimum requirement for emergency lighting uniformity on escape routes?',
    options: [
      'Uniformity ratio 40:1 maximum',
      'No uniformity requirement',
      'Uniformity ratio 10:1 maximum',
      'Uniformity ratio 3:1 maximum',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 1838 requires maximum uniformity ratio of 40:1 (Emax/Emin) on escape routes. This ensures no dark spots that could cause trips or falls, while allowing practical luminaire spacing.',
  },
  {
    id: 5,
    question: 'When is maintained emergency lighting required?',
    options: [
      'Results, conditions, and observations',
      'Where normal lighting may be dimmed or switched off',
      'Insulated tools, gloves, mats, footwear',
      'Circuit cannot complete and lamp will not illuminate',
    ],
    correctAnswer: 1,
    explanation:
      'Maintained emergency lighting is required where the normal lighting may be dimmed or extinguished while the area is occupied, such as cinemas, theatres, nightclubs, and some restaurants or entertainment venues.',
  },
  {
    id: 6,
    question: 'What is high-risk task area emergency lighting designed for?',
    options: [
      'Document conditions found and repairs made',
      'Immediately upon completion of installation',
      'Areas where sudden loss of light creates danger',
      'Dwellings including houses, flats, and communal areas',
    ],
    correctAnswer: 2,
    explanation:
      'High-risk task area lighting provides illumination where sudden darkness would create immediate danger, such as operating machinery, working at height, or handling hazardous materials. It requires higher illuminance (10% of normal, minimum 15 lux).',
  },
  {
    id: 7,
    question: 'What minimum illuminance is required for high-risk task area emergency lighting?',
    options: [
      'Meets European safety standards',
      'To save time and maintain momentum',
      'P = (2π × n × T) / 60 where n is RPM',
      '10% of normal illuminance, minimum 15 lux',
    ],
    correctAnswer: 3,
    explanation:
      'High-risk task areas require 10% of the normal task illuminance, with a minimum of 15 lux on the task area. This enables safe shutdown of potentially dangerous processes.',
  },
  {
    id: 8,
    question: 'What is the minimum colour rendering index (Ra) required for emergency lighting?',
    options: [
      'Ra 40',
      'Ra 60',
      'Ra 20',
      'Ra 80',
    ],
    correctAnswer: 0,
    explanation:
      'Emergency lighting requires minimum Ra 40 (CRI). This is lower than normal lighting requirements because the primary purpose is safe evacuation, not accurate colour perception. Most modern LED emergency luminaires exceed this.',
  },
  {
    id: 9,
    question: 'How should emergency lighting be designed for disabled refuges?',
    options: [
      'Low coercivity (soft magnetic material)',
      'Higher illuminance and intercom visibility',
      'Heavy series leakage reactance to limit weld current',
      'Aluminium or copper bars short-circuited by end rings',
    ],
    correctAnswer: 1,
    explanation:
      'Disabled refuges require adequate illuminance for communication equipment (intercom) to be visible and usable. BS 5266 recommends illuminating the refuge to enable safe waiting and communication with rescue teams.',
  },
  {
    id: 10,
    question: 'What testing regime is required for emergency lighting to BS 5266?',
    options: [
      'Self-certify notifiable electrical work',
      'To provide a known voltage source to verify tester operation',
      'Monthly function test, annual full duration test',
      'Heavy series leakage reactance to limit weld current',
    ],
    correctAnswer: 2,
    explanation:
      'BS 5266 requires monthly function tests (brief operation check) and annual full duration tests (3 hour or specified duration). Records must be maintained. Self-test systems can automate function testing.',
  },
];

const faqs = [
  {
    question: 'What is the difference between maintained and non-maintained emergency lighting?',
    answer:
      'Non-maintained luminaires only illuminate during mains failure, remaining off during normal operation. Maintained luminaires operate continuously - providing normal lighting on mains power and switching to battery during failure. Sustained emergency luminaires contain two lamps - one maintained for emergency, one non-maintained for normal lighting.',
  },
  {
    question: 'How do I determine emergency lighting duration requirements?',
    answer:
      'Standard duration is 3 hours for most UK buildings. 1 hour may be acceptable where immediate evacuation is possible and the building will not be reoccupied without restored power. Extended durations (to 8 hours) may be needed for sleeping accommodation or where delayed evacuation is expected. The fire risk assessment determines requirements.',
  },
  {
    question: 'Can I use the normal lighting installation for emergency lighting?',
    answer:
      'Yes, but the luminaires must be specifically designed and supplied for emergency operation with battery backup or central battery system. Simply having luminaires on an essential supply (generator) is not compliant unless changeover is instantaneous (within 0.5 seconds for escape routes).',
  },
  {
    question: 'What is self-contained emergency lighting?',
    answer:
      'Self-contained units have their own battery, charger and control gear within each luminaire. They operate independently without external wiring for emergency supply. This contrasts with central battery systems where multiple luminaires are supplied from a common battery room.',
  },
  {
    question: 'How do I design emergency lighting for very large open areas?',
    answer:
      'Open areas over 60m² require anti-panic lighting at 0.5 lux minimum across the core area (excluding 0.5m perimeter). Calculate luminaire positions using manufacturer spacing data. Consider obstruction by furniture/equipment. Software can optimise layouts for large spaces.',
  },
  {
    question: 'What records must be kept for emergency lighting?',
    answer:
      'BS 5266 requires a log book recording: commissioning certificate, design information, luminaire locations, test results (monthly function and annual duration), repairs/replacements, and any changes to the system. Electronic records are acceptable. The responsible person must ensure testing is carried out.',
  },
];

const HNCModule4Section4_3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 4 · Subsection 3"
            title="Emergency Lighting Design"
            description="Designing life safety systems to BS 5266 for safe evacuation during power failure."
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              'Design escape route emergency lighting to BS 5266',
              'Apply illuminance requirements for different areas',
              'Select appropriate system types (maintained/non-maintained)',
              'Determine correct duration for building types',
              'Position luminaires for required coverage',
              'Specify testing and maintenance requirements',
            ]}
            initialVisibleCount={3}
          />

          <TLDR
            points={[
              'Escape route minimum 1 lx along the centre line, 0.5 lx across the full route width — at floor level, with the maintenance factor applied. BS 5266 numbers are not optional.',
              'Open (anti-panic) areas: 0.5 lx minimum over the empty floor (excluding a 0.5 m perimeter band). High-risk task areas: 10 % of the maintained task value, never less than 15 lx.',
              'Duration: 1 h for premises evacuated immediately; 3 h where occupants might re-enter or where evacuation could be delayed. Most commercial designs go to 3 h by default.',
              'Self-contained luminaires are simpler to install but harder to manage at scale; central battery (BS EN 50171) is the choice when you’ve got hundreds of points across multiple floors.',
              'BS 7671 Chapter 56 sits underneath BS 5266 — the supply, circuit segregation, sources and wiring all have to comply. The fire-engineered escape strategy and the electrical design are inseparable.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 560.6.1"
            clause="The following electrical sources for safety services are recognized: (a) primary batteries; (b) stationary secondary batteries; (c) other generating sets independent of the normal supply; (d) a separate feeder of the supply network that is effectively independent of the normal feeder."
            meaning={
              <>
                Reg 560.6.1 fixes the menu of acceptable safety-source supplies for emergency
                lighting. As the HNC designer you choose between a self-contained luminaire (its
                own secondary battery), a central battery system to BS EN 50171, an independent
                generator, or — rarely — a genuinely independent network feeder. Anything else
                isn’t a recognised source and won’t pass verification under Chapter 56. Your spec
                states which option (a)–(d) you’re using and why.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 560.6.1."
          />

          <SectionRule />

          <ConceptBlock title="Escape Route Lighting Requirements">
            <p>
              Escape route lighting ensures occupants can safely evacuate a building during mains
              failure. Routes must be illuminated to enable recognition of obstacles, direction
              changes and exit points. BS 5266 and BS EN 1838 specify the requirements.
            </p>
            <p>
              <strong>Escape route requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Illuminance:</strong> minimum 1 lux on centre line of route
              </li>
              <li>
                <strong>Uniformity:</strong> maximum 40:1 ratio (Emax/Emin)
              </li>
              <li>
                <strong>Width:</strong> central band of at least 50% of route width
              </li>
              <li>
                <strong>Response:</strong> 50% output within 5 seconds, 100% within 60 seconds
              </li>
            </ul>
            <p>
              <strong>Locations requiring escape route lighting (location / requirement):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Corridors — 1 lux on centre line, luminaires at direction changes</li>
              <li>Stairways — 1 lux on treads, each flight illuminated</li>
              <li>Exit doors — illuminated exit sign, 1 lux at door position</li>
              <li>Changes of direction — luminaire within 2m of change</li>
              <li>Changes of level — luminaire to illuminate each change</li>
              <li>Intersections — luminaire at or near each intersection</li>
            </ul>
            <p>
              <strong>Critical:</strong> Emergency lighting must also illuminate fire safety signs,
              fire alarm call points, fire fighting equipment locations, and first aid points.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Open Area and High-Risk Task Lighting">
            <p>
              Open area (anti-panic) lighting and high-risk task area lighting serve different
              purposes from escape routes. Anti-panic lighting prevents panic in large spaces,
              while high-risk lighting enables safe shutdown of dangerous processes.
            </p>
            <p>
              <strong>Open area (anti-panic):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Required in areas &gt;60m² floor area</li>
              <li>Minimum 0.5 lux at floor level</li>
              <li>Core area (excluding 0.5m perimeter band)</li>
              <li>Uniformity maximum 40:1</li>
              <li>Enable occupants to reach escape routes</li>
            </ul>
            <p>
              <strong>High-risk task areas:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Required where sudden darkness is dangerous</li>
              <li>Minimum 10% of normal task illuminance</li>
              <li>Never less than 15 lux on task area</li>
              <li>Uniformity maximum 10:1</li>
              <li>Response: 0.5 seconds for escape routes</li>
            </ul>
            <p>
              <strong>Emergency lighting summary (type / illuminance / uniformity / response):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Escape route — 1 lux (centre line) — 40:1 max — 5s (50%), 60s (100%)</li>
              <li>Open area — 0.5 lux (floor) — 40:1 max — 5s (50%), 60s (100%)</li>
              <li>
                High-risk task — 10% of normal, min 15 lux — 10:1 max — 0.5s (100%)
              </li>
            </ul>
            <p>
              <strong>Examples of high-risk areas:</strong> operating machinery, laboratories,
              electrical switchrooms, kitchens with hot equipment, working at height.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Maintained vs Non-Maintained Systems">
            <p>
              The choice between maintained and non-maintained systems depends on how the space is
              used. Where lighting may be deliberately switched off while occupied, maintained
              systems are required.
            </p>
            <p>
              <strong>System types comparison (type / operation / applications):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Non-maintained</strong> — only operates on mains failure — offices, shops,
                factories where lights always on when occupied
              </li>
              <li>
                <strong>Maintained</strong> — operates continuously (mains or battery) — cinemas,
                theatres, nightclubs, some restaurants
              </li>
              <li>
                <strong>Sustained</strong> — two lamps, one maintained, one not — combined normal
                and emergency function
              </li>
            </ul>
            <p>
              <strong>Self-contained systems:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Battery in each luminaire</li>
              <li>Simple installation (no battery room)</li>
              <li>Each unit independent</li>
              <li>Batteries require replacement (5-10 years)</li>
              <li>Self-test options available</li>
            </ul>
            <p>
              <strong>Central battery systems:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Single battery location</li>
              <li>Easier maintenance monitoring</li>
              <li>Fire-rated distribution required</li>
              <li>More complex cabling</li>
              <li>Suitable for larger buildings</li>
            </ul>
            <p>
              <strong>Duration requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>3 hours:</strong> standard for most buildings (offices, retail,
                industrial)
              </li>
              <li>
                <strong>1 hour:</strong> where immediate evacuation possible and no reoccupation
                without power
              </li>
              <li>
                <strong>Extended (to 8 hours):</strong> sleeping accommodation, hospitals,
                premises with delayed evacuation
              </li>
            </ul>
            <p>
              <strong>Remember:</strong> Duration is determined by the fire risk assessment, not
              chosen arbitrarily. The responsible person must justify any deviation from 3 hours.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Testing, Maintenance and Documentation">
            <p>
              Emergency lighting is a life safety system requiring regular testing and
              maintenance. BS 5266 specifies the test regime and documentation requirements.
              Self-test systems can automate some requirements but manual verification remains
              essential.
            </p>
            <p>
              <strong>Testing regime BS 5266 (test / frequency / requirements):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Daily check — daily (visual) — indicator lights functioning</li>
              <li>Function test — monthly — brief operation, check all luminaires function</li>
              <li>Full duration test — annually — full rated duration (1 or 3 hours)</li>
              <li>
                Battery replacement — as required — when duration test fails (typically 4-6 years)
              </li>
            </ul>
            <p>
              <strong>Documentation required:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Completion certificate (initial)</li>
              <li>As-built drawings showing luminaire positions</li>
              <li>Design basis and calculations</li>
              <li>Test log book with all test records</li>
              <li>Maintenance records and replacements</li>
            </ul>
            <p>
              <strong>Self-test systems:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Automatic function testing</li>
              <li>Fault indication (local or central)</li>
              <li>Reduced manual testing burden</li>
              <li>Still requires annual duration test</li>
              <li>DALI-compatible options available</li>
            </ul>
            <p>
              <strong>Recharge time after testing:</strong> After any discharge test, batteries
              require 24 hours to fully recharge. Testing should be scheduled to ensure the system
              is fully charged during normal occupied periods. Avoid testing on consecutive days
              or before weekends/holidays when the building is occupied.
            </p>
            <p>
              <strong>Legal responsibility:</strong> The Regulatory Reform (Fire Safety) Order
              2005 places responsibility on the 'responsible person' (usually building
              owner/employer) to maintain emergency lighting in working order.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — escape route design:</strong> Design emergency lighting for a 30m
              corridor, 2m wide, with exit at one end and a change of direction midway.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Requirements (BS 5266): minimum 1 lux on centre line</li>
              <li>Uniformity maximum 40:1</li>
              <li>Luminaire at each end (exits)</li>
              <li>Luminaire within 2m of direction change</li>
              <li>Exit luminaire at 0m (illuminated exit sign)</li>
              <li>Corridor luminaire at 15m (direction change point)</li>
              <li>Exit luminaire at 30m (exit door)</li>
              <li>Using 8W LED emergency with 15m spacing capability</li>
              <li>
                Total: <strong>3 emergency luminaires + signage</strong>
              </li>
              <li>Verify with manufacturer spacing data for 1 lux compliance</li>
            </ul>
            <p>
              <strong>Example 2 — open area calculation:</strong> An open plan office is 20m × 15m
              (300m²). Determine emergency lighting requirements.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Area = 300m² &gt; 60m² threshold — anti-panic lighting required</li>
              <li>Core area (excluding 0.5m perimeter): (20 − 1) × (15 − 1) = 19 × 14 = 266m²</li>
              <li>Requirement: 0.5 lux minimum across core</li>
              <li>Using 3W LED bulkhead with 8m × 8m spacing (0.5 lux):</li>
              <li>
                Grid: 3 across × 2 along = <strong>6 luminaires</strong>
              </li>
              <li>Plus escape route lighting to exits</li>
            </ul>
            <p>
              <strong>Example 3 — high-risk task area:</strong> A machine workshop operates at 500
              lux. Calculate emergency lighting requirement for safe shutdown.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>10% of normal = 500 × 0.1 = 50 lux</li>
              <li>50 lux &gt; 15 lux (minimum) — pass</li>
              <li>
                Required: <strong>50 lux on machine task areas</strong>
              </li>
              <li>Uniformity maximum 10:1</li>
              <li>Response time: 0.5 seconds to full output</li>
              <li>
                Self-contained may not achieve 0.5s response; consider central battery or
                UPS-backed system
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Design summary:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Escape routes: 1 lux centre line, uniformity 40:1</li>
              <li>Open areas (&gt;60m²): 0.5 lux, uniformity 40:1</li>
              <li>High-risk: 10% of normal, min 15 lux, 10:1 uniformity</li>
              <li>Standard duration: 3 hours</li>
              <li>Test: monthly function, annual duration</li>
            </ul>
            <p>
              <strong>Luminaire positioning:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>At or near each exit door</li>
              <li>Within 2m of direction changes</li>
              <li>At each stairway flight and landing</li>
              <li>Near fire alarm call points</li>
              <li>Near fire extinguisher locations</li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common mistakes to avoid"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Excessive spacing</strong> — always check manufacturer data for actual
                  coverage
                </li>
                <li>
                  <strong>Forgetting open areas</strong> — spaces &gt;60m² need anti-panic
                  lighting
                </li>
                <li>
                  <strong>Missing safety equipment</strong> — fire extinguishers and call points
                  need illumination
                </li>
                <li>
                  <strong>Poor test scheduling</strong> — allow 24h recharge before occupied
                  periods
                </li>
              </ul>
            }
            doInstead="Use the manufacturer's emergency-spacing tables (not generic distances), include open areas above 60m² in the design, illuminate every fire alarm call point and extinguisher, and schedule discharge tests so the system has 24 hours to recharge before occupation."
          />

          <SectionRule />

          <Scenario
            title="Three-storey office refurb — picking source (a)–(d)"
            situation={
              <>
                You’re designing the emergency lighting for a 3-storey, 2,400 m² office refurb.
                Around 140 emergency luminaires across escape routes, open areas, plant rooms and
                a small high-risk archive store. Client wants 3 h duration, monthly function tests
                and an annual full-discharge test logged centrally. The fire strategy says
                simultaneous evacuation, single staircase per zone.
              </>
            }
            whatToDo={
              <>
                Choose the source under Reg 560.6.1. Option (a) primary batteries — non-starter for
                a 3 h commercial duty. Option (d) independent feeder — not realistic from a single
                DNO connection. That leaves (b) stationary secondary batteries (a central battery
                system to BS EN 50171) or (c) generator. Generator is overkill for emergency
                lighting alone and triggers gas-flue and ventilation works. Specify a central
                battery system (b) to BS EN 50171 with addressable luminaires for self-test
                logging, OR self-contained 3 h luminaires with a wireless test/monitoring head-end.
                Document escape route 1 lx / 0.5 lx, open area 0.5 lx, high-risk archive 15 lx (10
                % of task), and call out that the supply circuits are independent of normal
                lighting per Reg 560.7.1.
              </>
            }
            whyItMatters={
              <>
                On a 140-luminaire scheme, manual annual discharge testing is a 3-day disruption
                you only do once before the FM team rebels. Self-test (DALI / wireless) is the
                modern answer; central battery wins on long corridors and tower blocks. The
                560.6.1 source choice cascades into every other M&amp;E decision.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Escape route 1 lx centre line / 0.5 lx full width at floor, with MF applied — the BS 5266 floor.',
              'Open (anti-panic) area 0.5 lx minimum, high-risk task 10 % of task / 15 lx minimum.',
              '1 h duration for immediate-evacuate premises; 3 h is the commercial default for offices, retail, hospitality.',
              'Self-contained vs central battery is a maintenance and scale decision — both are recognised under Reg 560.6.1.',
              'Reg 560.7.1 demands circuit independence from normal lighting — separate circuits, separate routes or fire-resistant cable.',
              'Test regime: monthly function test (visual), annual 1 h or 3 h full discharge — log it. BS 5266-1 is explicit.',
              'Cover every open area &gt; 60 m², every change of direction, stair, exit and external assembly point.',
              'BS 7671 Chapter 56 is the verification framework; BS 5266 is the design code; BS EN 50171 covers the central battery hardware.',
            ]}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section4-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Interior lighting calculations
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section4-4')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Lighting controls
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section4_3;
