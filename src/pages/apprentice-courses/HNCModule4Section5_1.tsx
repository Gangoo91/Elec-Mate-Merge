/**
 * Module 4 · Section 5 · Subsection 1 — LV Switchgear Selection
 * HNC Electrical Engineering for Building Services (Building Services Specialist)
 *   Main switchboards, form of separation (1-4), IP ratings, fault ratings (Icu/Ics/Icw/Ipk)
 *   and BS EN 61439 type-tested assemblies. Foundation for safe, reliable LV distribution
 *   in commercial and industrial buildings.
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

const TITLE = 'LV Switchgear Selection - HNC Module 4 Section 5.1';
const DESCRIPTION =
  'Master LV switchgear selection for building services: main switchboards, form of separation, IP ratings, fault ratings and type-tested assemblies.';

const quickCheckQuestions = [
  {
    id: 'form-4',
    question:
      'Which form of separation provides separate compartments for busbars, functional units AND terminals?',
    options: [
      'Form 1',
      'Form 2',
      'Form 4',
      'Form 3',
    ],
    correctIndex: 2,
    explanation:
      'Form 4 provides the highest level of internal separation with distinct compartments for busbars, functional units and terminals, allowing safe access to one section without exposure to others.',
  },
  {
    id: 'ip-rating',
    question: 'What does an IP rating of IP54 indicate?',
    options: [
      'Dust protected, splash proof',
      'Dust tight, splash proof',
      'Dust tight, water jet proof',
      'Dust protected, water jet proof',
    ],
    correctIndex: 0,
    explanation:
      'IP54 means protected against dust ingress (5) and protected against splashing water from all directions (4). The first digit is solids protection (0-6), second is liquids (0-8).',
  },
  {
    id: 'fault-rating',
    question: "What does the 'Icw' rating of switchgear represent?",
    options: [
      'Making capacity',
      'Breaking capacity',
      'Peak withstand',
      'Short-time withstand',
    ],
    correctIndex: 3,
    explanation:
      'Icw is the rated short-time withstand current - the RMS value of current the assembly can carry for a specified time (typically 1 second) without damage. This is crucial for discrimination.',
  },
  {
    id: 'type-tested',
    question: 'What standard governs type-tested LV switchgear assemblies?',
    options: [
      'BS 7671',
      'BS EN 61439',
      'BS EN 60947',
      'BS 88',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 61439 covers low-voltage switchgear and controlgear assemblies, replacing the previous BS EN 60439. It defines requirements for type-tested assemblies (TTA).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the primary purpose of a main switchboard in a building?',
    options: [
      'To convert the incoming AC supply to DC for distribution',
      'To receive and distribute the incoming electrical supply',
      'To correct the power factor of the incoming supply',
      'To step the DNO supply voltage down to 230 V',
    ],
    correctAnswer: 1,
    explanation:
      'The main switchboard (MSB) receives the incoming supply from the DNO and distributes it to sub-mains and final circuits throughout the building. It houses the main protective devices and metering.',
  },
  {
    id: 2,
    question: 'Form 1 switchgear provides:',
    options: [
      'Separation between all functional units',
      'Separate terminals for each unit',
      'No internal separation',
      'Separation between busbars and functional units',
    ],
    correctAnswer: 2,
    explanation:
      'Form 1 has no internal separation - all components are in a single common compartment. This is the most basic form, suitable where work will only be done with all circuits isolated.',
  },
  {
    id: 3,
    question: 'Why would you specify Form 3b separation?',
    options: [
      'To reduce the assembly footprint and lower the purchase cost',
      'To increase the busbar current rating of the assembly',
      'To improve the IP rating of the enclosure against water',
      'To allow access to terminals while other units remain live',
    ],
    correctAnswer: 3,
    explanation:
      'Form 3b provides separation between busbars and functional units, plus separation of terminals from busbars but not from each other. This allows terminal access without busbar exposure.',
  },
  {
    id: 4,
    question: 'What IP rating is typically required for switchgear in a general plant room?',
    options: [
      'IP2X minimum',
      'IP3X minimum',
      'IP4X minimum',
      'IP5X minimum',
    ],
    correctAnswer: 0,
    explanation:
      'IP2X (protection against finger contact with live parts) is the minimum for general indoor locations. Plant rooms typically require IP2X to IP3X depending on environmental conditions.',
  },
  {
    id: 5,
    question:
      'The prospective fault current (PFC) at a switchboard is 25kA. What minimum fault rating should the switchgear have?',
    options: [
      '20kA',
      '25kA',
      '50kA',
      '32kA',
    ],
    correctAnswer: 1,
    explanation:
      'Switchgear must have a fault rating at least equal to the PFC at the point of installation. With 25kA PFC, you need minimum 25kA rated equipment, though specifying higher provides a safety margin.',
  },
  {
    id: 6,
    question: "What does 'partially type-tested assembly' (PTTA) mean?",
    options: [
      'An assembly that has passed only the dielectric type test',
      'An assembly tested for half its rated short-circuit current',
      'Verification based on tested components plus design rules',
      'An assembly verified only by routine factory inspection',
    ],
    correctAnswer: 2,
    explanation:
      'PTTA verification combines type-tested components with design rules and calculations from BS EN 61439 to verify performance without full assembly testing. This is common for modified standard designs.',
  },
  {
    id: 7,
    question: 'Which busbar configuration provides the best continuity of supply?',
    options: [
      'Single busbar serving all outgoing circuits',
      'Single busbar split by one section switch',
      'Single busbar with a higher current rating',
      'Duplicate busbars with bus coupler',
    ],
    correctAnswer: 3,
    explanation:
      'Duplicate busbars with bus coupler allows either busbar to supply all loads. If one busbar or its incomer fails, the coupler closes to maintain supply from the healthy busbar.',
  },
  {
    id: 8,
    question: 'What clearance is required in front of switchgear for safe operation?',
    options: [
      '700mm minimum',
      '900mm minimum',
      '500mm minimum',
      '1200mm minimum',
    ],
    correctAnswer: 0,
    explanation:
      'Industry guidance specifies 700mm minimum clear working space in front of switchgear. This allows safe operation, access for testing, and emergency escape.',
  },
  {
    id: 9,
    question: 'When is IP65 rated switchgear required?',
    options: [
      'Dedicated switchrooms with controlled, clean access',
      'Wash-down areas or external locations',
      'General office distribution boards in dry rooms',
      'Riser cupboards with no water or dust exposure',
    ],
    correctAnswer: 1,
    explanation:
      'IP65 (dust tight, protected against water jets) is specified for harsh environments including external locations, wash-down areas in food processing, and similar applications with water exposure.',
  },
  {
    id: 10,
    question: 'What is the purpose of arc fault containment in modern switchgear?',
    options: [
      'To increase the continuous current rating of the busbars',
      'To improve the assembly IP rating against dust ingress',
      'To protect personnel and limit damage during internal faults',
      'To reduce the operating noise of the circuit breakers',
    ],
    correctAnswer: 2,
    explanation:
      'Arc fault containment features (arc vents, reinforced construction, flame-retardant materials) protect personnel and limit damage if an internal arc fault occurs, directing energy safely away from operators.',
  },
];

const faqs = [
  {
    question: 'What is the difference between Form 2 and Form 3 separation?',
    answer:
      'Form 2 separates busbars from functional units but provides no separation between functional units themselves. Form 3 adds separation between each functional unit, so work can be done on one unit without risk from adjacent units. Form 3b further separates terminals from busbars.',
  },
  {
    question: 'How do I determine the required fault rating for a switchboard?',
    answer:
      'Request the prospective fault current (PFC) from the DNO for new supplies, or have it calculated/measured. The switchgear must have fault ratings (Icu, Ics, Icw) at least equal to the PFC. Consider future network changes that might increase PFC and specify appropriate margins.',
  },
  {
    question: 'When should I specify withdrawable circuit breakers versus fixed?',
    answer:
      'Withdrawable units cost more but allow maintenance without complete shutdown. Specify them for critical circuits where downtime must be minimised, or where frequent testing/maintenance is required. Fixed units are suitable where planned shutdown for maintenance is acceptable.',
  },
  {
    question: 'What ventilation is required for switchrooms?',
    answer:
      'Calculate heat dissipation from all equipment and size ventilation to maintain temperature below 35°C ambient. Typical switchgear dissipates 2-5W per amp of rated current. Natural ventilation often suffices for smaller installations; larger switchrooms may need mechanical cooling.',
  },
];

const HNCModule4Section5_1 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5 · Subsection 1"
            title="LV Switchgear Selection"
            description="Specifying main switchboards and distribution equipment for reliable, safe power distribution."
            tone="purple"
          />

          <LearningOutcomes
            outcomes={[
              'Understand main switchboard functions and configurations',
              'Select appropriate form of separation for each application',
              'Specify IP ratings based on environmental conditions',
              'Determine fault ratings from prospective fault current data',
              'Distinguish type-tested from partially type-tested assemblies',
              'Apply BS EN 61439 requirements to switchgear specifications',
            ]}
            initialVisibleCount={3}
          />

          <TLDR
            points={[
              'Main switchboards are type-tested assemblies (TTA) to BS EN 61439-1/-2 — Form 4 separation is the commercial default for live work and outgoing circuit identification.',
              'Fault ratings: Icu (ultimate breaking), Ics (service breaking), Icw (1 s short-time withstand), Ipk (peak). Ics is the figure that matters for design — it’s what the device can re-close on.',
              'IP rating = environment + accidental contact protection. IP54 is typical for plant rooms; IP41 inside a clean LV room with restricted access.',
              'Coordinate the assembly Inc rating with the DNO PFC at the cut-out — over-spec is expensive, under-spec is dangerous.',
              'Reg 510.3 binds the equipment selection back to the rest of BS 7671 — manufacturer instructions, terminal capacity for incoming SWA, ambient temperature derating.',
            ]}
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 510.3"
            clause="Every item of equipment shall be selected and erected so as to allow compliance with the regulations stated in this chapter and the relevant regulations in other parts of BS 7671 and shall take account of manufacturers' instructions."
            meaning={
              <>
                Reg 510.3 is the umbrella that ties the BS EN 61439 type-test certificate to the
                wider BS 7671 verification. The MSB has to be selected against the prospective
                fault current at the origin (Chapter 43), the disconnection times for the
                downstream circuits (Chapter 41), the ambient/IP/IK environment (Chapter 52), and
                the manufacturer’s installation/torque/cable termination instructions. Skip any of
                those and the assembly’s type-test certificate doesn’t cover you.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Regulation 510.3."
          />

          <SectionRule />

          <ConceptBlock title="Main Switchboards">
            <p>
              The main switchboard (MSB) is the central point for power distribution in a building.
              It receives the incoming supply from the Distribution Network Operator (DNO) and
              distributes power to sub-mains and final circuits throughout the installation.
            </p>
            <p>
              <strong>Main switchboard functions:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>House main incoming device and DNO metering equipment</li>
              <li>Provide main isolation point for the entire installation</li>
              <li>Distribute power to sub-distribution boards and major loads</li>
              <li>Incorporate protective devices for fault current interruption</li>
              <li>Enable measurement and monitoring of power quality</li>
            </ul>
            <p>
              <strong>Switchboard configurations (configuration / description / application):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single busbar:</strong> One set of busbars serving all circuits — standard
                buildings, non-critical
              </li>
              <li>
                <strong>Bus section:</strong> Single busbar split by section switch — partial
                shutdown for maintenance
              </li>
              <li>
                <strong>Duplicate busbar:</strong> Two busbars with bus coupler — critical
                facilities, high availability
              </li>
              <li>
                <strong>Ring busbar:</strong> Busbars form closed ring — maximum resilience, dual-fed
              </li>
            </ul>
            <p>
              <strong>Design principle:</strong> Always specify 20-30% spare capacity in
              switchboards for future expansion. Adding ways later is expensive and disruptive.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[0]} />

          <SectionRule />

          <ConceptBlock title="Form of Separation">
            <p>
              The form of separation defines the internal compartmentalisation of switchgear
              assemblies. Higher forms provide greater safety for maintenance personnel by isolating
              different sections within the assembly.
            </p>
            <p>
              <strong>Forms of internal separation (form / separation provided / typical application):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Form 1:</strong> No internal separation — small DBs, full isolation for work
              </li>
              <li>
                <strong>Form 2a:</strong> Busbars separated from functional units — standard
                distribution boards
              </li>
              <li>
                <strong>Form 2b:</strong> As 2a plus terminals in same compartment — standard
                distribution boards
              </li>
              <li>
                <strong>Form 3a:</strong> Busbars and all units separated — main switchboards
              </li>
              <li>
                <strong>Form 3b:</strong> As 3a plus terminals separate from busbars — main
                switchboards, live working
              </li>
              <li>
                <strong>Form 4a:</strong> All separate including terminals in unit — critical
                installations
              </li>
              <li>
                <strong>Form 4b:</strong> All separate including external terminals — highest safety
                requirement
              </li>
            </ul>
            <p>
              <strong>When to specify higher forms:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Maintenance on live equipment required</li>
              <li>Multiple maintenance teams working</li>
              <li>Critical loads cannot be interrupted</li>
              <li>Client specification requirements</li>
            </ul>
            <p>
              <strong>Cost considerations:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Form 4 typically 40-60% more than Form 2</li>
              <li>Larger footprint for higher forms</li>
              <li>Balance safety against budget</li>
              <li>Consider operational requirements</li>
            </ul>
            <p>
              <strong>Specification tip:</strong> Form 3b is commonly specified for main
              switchboards where occasional terminal work may be needed without complete shutdown.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ConceptBlock title="IP Ratings">
            <p>
              IP (Ingress Protection) ratings define the level of protection an enclosure provides
              against solid objects and liquids. Correct IP selection ensures equipment reliability
              in its intended environment.
            </p>
            <p>
              <strong>First digit (X) — solids protection:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>0:</strong> No protection
              </li>
              <li>
                <strong>1:</strong> Objects &gt;50mm
              </li>
              <li>
                <strong>2:</strong> Objects &gt;12.5mm (fingers)
              </li>
              <li>
                <strong>3:</strong> Objects &gt;2.5mm (tools)
              </li>
              <li>
                <strong>4:</strong> Objects &gt;1mm (wires)
              </li>
              <li>
                <strong>5:</strong> Dust protected
              </li>
              <li>
                <strong>6:</strong> Dust tight
              </li>
            </ul>
            <p>
              <strong>Second digit (Y) — liquids protection:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>0:</strong> No protection
              </li>
              <li>
                <strong>1:</strong> Vertical drips
              </li>
              <li>
                <strong>2:</strong> Drips at 15° angle
              </li>
              <li>
                <strong>3:</strong> Spraying water
              </li>
              <li>
                <strong>4:</strong> Splashing water
              </li>
              <li>
                <strong>5:</strong> Water jets
              </li>
              <li>
                <strong>6:</strong> Powerful water jets
              </li>
            </ul>
            <p>
              <strong>IP ratings for building services locations (location / minimum IP / reason):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Dedicated switchroom — IP2X — controlled access, clean environment</li>
              <li>General plant room — IP3X to IP4X — tools may be present, some dust</li>
              <li>Car park — IP54 — dust and splash from vehicles</li>
              <li>Commercial kitchen — IP55/IP65 — wash-down cleaning procedures</li>
              <li>External (sheltered) — IP55 — rain ingress risk</li>
              <li>External (exposed) — IP65/IP66 — direct weather exposure</li>
            </ul>
            <p>
              <strong>Important:</strong> IP rating applies to the complete assembly when closed.
              Doors open for operation reduce protection — consider additional measures for harsh
              environments.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[1]} />

          <SectionRule />

          <ConceptBlock title="Fault Ratings and Type-Tested Assemblies">
            <p>
              Switchgear must withstand and interrupt fault currents safely. Understanding fault
              ratings ensures equipment selection matches the prospective fault current (PFC) at
              each location in the installation.
            </p>
            <p>
              <strong>Key fault current ratings (rating / name / significance):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Icu:</strong> Ultimate breaking capacity — maximum fault current device can
                break
              </li>
              <li>
                <strong>Ics:</strong> Service breaking capacity — breaking capacity for continued use
              </li>
              <li>
                <strong>Icw:</strong> Short-time withstand — current assembly can carry for 1 second
              </li>
              <li>
                <strong>Ipk:</strong> Peak withstand — peak value of fault current tolerated
              </li>
            </ul>
            <p>
              <strong>Typical PFC values in building services:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>At DNO transformer:</strong> 25-50kA (check with DNO)
              </li>
              <li>
                <strong>Main switchboard:</strong> 25-40kA typically
              </li>
              <li>
                <strong>Sub-distribution boards:</strong> 10-25kA
              </li>
              <li>
                <strong>Final distribution:</strong> 6-16kA
              </li>
            </ul>
            <p>
              <strong>BS EN 61439 — Type-Tested Assembly (TTA):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Complete assembly tested to standard</li>
              <li>Design verified by physical testing</li>
              <li>Standard designs from manufacturers</li>
              <li>Highest assurance level</li>
            </ul>
            <p>
              <strong>BS EN 61439 — Partially Type-Tested (PTTA):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Based on type-tested components</li>
              <li>Verification by calculation/rules</li>
              <li>Allows customisation</li>
              <li>Common for bespoke assemblies</li>
            </ul>
            <p>
              <strong>Verification requirements:</strong> BS EN 61439 specifies 13 design
              verifications including temperature rise, dielectric properties, short-circuit
              withstand, and EMC compliance.
            </p>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[2]} />

          <SectionRule />

          <ConceptBlock title="Worked Examples">
            <p>
              <strong>Example 1 — specifying form of separation:</strong> A main switchboard serves
              a hospital with 24/7 operations. Maintenance must be possible with minimum
              disruption.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Critical loads cannot be interrupted</li>
              <li>Maintenance teams need safe access</li>
              <li>Cable termination work may be needed</li>
              <li>
                Recommendation: <strong>Form 3b minimum</strong>
              </li>
              <li>Allows terminal access without busbar exposure</li>
              <li>Consider Form 4b for maximum safety</li>
            </ul>
            <p>
              <strong>Example 2 — IP rating selection:</strong> Distribution board in a multi-storey
              car park riser cupboard.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Vehicle exhaust particles and dust</li>
              <li>Possible water ingress from cleaning</li>
              <li>No direct weather exposure</li>
              <li>Solids: IP5X needed (dust protected)</li>
              <li>Liquids: IP X4 minimum (splashing)</li>
              <li>
                Specification: <strong>IP54 minimum</strong> (consider IP55 for extra margin)
              </li>
            </ul>
            <p>
              <strong>Example 3 — fault rating verification:</strong> DNO confirms PFC at intake is
              32kA. Select main switchboard fault rating.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Given: PFC = 32kA RMS</li>
              <li>Peak factor (k) typically 2.2</li>
              <li>Peak current = 32 × 2.2 = 70.4kA</li>
              <li>Icw ≥ 32kA (1 second)</li>
              <li>Ipk ≥ 70.4kA</li>
              <li>
                Specification: <strong>40kA/1s rated switchboard</strong> — 25% margin for future
                network changes
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck {...quickCheckQuestions[3]} />

          <SectionRule />

          <ConceptBlock title="Practical guidance">
            <p>
              <strong>Switchroom requirements:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>700mm minimum</strong> clear working space in front of switchgear
              </li>
              <li>
                <strong>600mm minimum</strong> clear space at rear if access required
              </li>
              <li>Door opening outward for emergency escape</li>
              <li>Adequate ventilation for heat dissipation</li>
              <li>Fire-resistant construction (typically 1 hour)</li>
            </ul>
            <p>
              <strong>Specification checklist:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Rated voltage and frequency (230/400V, 50Hz)</li>
              <li>Rated current (main busbar and outgoing ways)</li>
              <li>Short-circuit ratings (Icw, Ipk)</li>
              <li>Form of separation required</li>
              <li>IP rating for the environment</li>
              <li>Number and rating of outgoing ways</li>
              <li>Metering and monitoring requirements</li>
            </ul>
            <p>
              <strong>Key standards:</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>BS EN 61439</strong> — assemblies
              </li>
              <li>
                <strong>BS EN 60947</strong> — switchgear devices
              </li>
              <li>
                <strong>BS 7671</strong> — installation requirements
              </li>
              <li>
                <strong>IEC 60529</strong> — IP ratings
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Common specification errors"
            whatHappens={
              <ul className="space-y-1.5 list-disc pl-5 marker:text-orange-400/70">
                <li>
                  <strong>Under-rating fault level</strong> — always verify PFC with DNO
                </li>
                <li>
                  <strong>Wrong IP for environment</strong> — site survey essential
                </li>
                <li>
                  <strong>Insufficient spare ways</strong> — plan for 20-30% growth
                </li>
                <li>
                  <strong>Ignoring access requirements</strong> — operational needs matter
                </li>
              </ul>
            }
            doInstead="Confirm PFC with the DNO before specifying breaking capacities, carry out a site survey to set the IP rating against the real environment, build in 20-30% spare ways at design stage, and specify clearances and door swings that match how the room will actually be operated and maintained."
          />

          <SectionRule />

          <Scenario
            title="800 A MSB for an industrial unit — specifying the assembly"
            situation={
              <>
                You’re specifying the main switchboard for a new 1,800 m² light-industrial unit:
                400 V TP+N, 800 A incomer, DNO advised PFC of 25 kA at the cut-out, plant room
                location with occasional damp ingress through the ventilation louvres. Spec is due
                with the contractor next week.
              </>
            }
            whatToDo={
              <>
                Specify a BS EN 61439-2 type-tested assembly. Form 4b separation for live work and
                clear circuit identification. IP54 (against the damp plant room and to keep dust
                out of the busbar chamber). Incomer: 800 A 4-pole ACB with motorised operation,
                Icu = 50 kA, Ics ≥ 50 kA (give yourself headroom over the 25 kA PFC for future
                supply upgrades). Outgoing MCCBs sized per the load schedule, 36 kA Ics minimum.
                Add a surge protection device at the origin (Reg 443/534 territory). Tie the
                specification back to Reg 510.3 — manufacturer’s torque tables, IP54 maintenance
                regime, ambient ≤ 40 °C derating curve. Document the PFC, the type-test
                certificate references, and the form-of-separation drawing in the O&amp;M.
              </>
            }
            whyItMatters={
              <>
                Under-specifying Ics means a device that trips on a fault but can’t re-close
                safely — at 25 kA PFC, that’s a switchboard fire. Over-specifying form of
                separation needlessly inflates the cost. This is where the HNC engineer earns
                their fee.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'BS EN 61439-1/-2 type-tested assemblies (TTA) are the gold standard — partially type-tested (PTTA) needs careful coordination evidence.',
              'Form 1, 2a/b, 3a/b, 4a/b — Form 4 separates busbar, functional unit and outgoing terminals. Form 4b for live work.',
              'Fault ratings: confirm Icu, Ics, Icw, Ipk against DNO PFC. Ics is the design figure; under-specifying is unsafe.',
              'IP rating from BS EN 60529 — environment first (water, dust), accidental contact second.',
              'IK rating from BS EN 62262 — impact resistance for plant rooms and accessible locations.',
              'Spare way provision: 20–30 % at design — retrofitting outgoing circuits into a sealed busbar chamber is painful.',
              'Reg 510.3 ties manufacturer instructions, torque, ambient and IP back to the wider BS 7671 verification.',
              'Document type-test certificate references, form-of-separation drawing and PFC coordination in the O&amp;M.',
            ]}
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Test Your Knowledge" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Back to section
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Power distribution design
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/h-n-c-module4-section5-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Distribution board design
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default HNCModule4Section5_1;
