import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'fam3-s4-accessible',
    question:
      'BS 5839-1:2025 clause 7 introduces a new requirement on the placement of fire alarm interfaces. What is it?',
    options: [
      'Interfaces must be located so they are accessible for safe maintenance, per CDM 2015.',
      'Interfaces must be finished in red so they are identifiable as fire-system equipment.',
      'Interfaces must be housed inside the CIE enclosure so all wiring terminates in one place.',
      'Interfaces must always be mounted remotely from the CIE, away from the panel enclosure.',
    ],
    correctIndex: 0,
    explanation:
      "The 2025 standard explicitly aligns with the Construction (Design and Management) Regulations 2015. The reasoning: interfaces require maintenance throughout the system's life. Designers must consider where the interface goes so future maintenance is safe and practicable. Sticking the interface in a switchgear cabinet because it was convenient at install creates a maintenance hazard later.",
  },
  {
    id: 'fam3-s4-lift',
    question: 'What is "lift recall" and what European standard governs the interface?',
    options: [
      'The manual operation of a lift-lobby call button by a fire warden to bring the lifts down.',
      'A telephone-based system letting occupants in a stalled lift speak to the control point.',
      'A requirement that lifts be taken out of use and occupants directed to the stairs.',
      'The automatic return of lifts to the recall floor on alarm, governed by BS EN 81-73.',
    ],
    correctIndex: 3,
    explanation:
      'BS EN 81-73 is the lift safety standard for behaviour in the event of fire. The fire alarm system feeds a recall signal via a monitored output (typically volt-free contact); the lift control reads it and executes the recall sequence. The cause-and-effect matrix records the recall trigger; the lift commissioning verifies the recall behaviour. Both standards work together.',
  },
  {
    id: 'fam3-s4-monitored',
    question: 'What is the difference between a MONITORED and an UNMONITORED interface output?',
    options: [
      'A monitored output uses a different cable colour so installers can tell them apart.',
      'A monitored output has its cable integrity continuously checked, reporting any fault.',
      'A monitored output runs at a higher voltage to drive the controlled equipment.',
      'A monitored output is marked on the panel, but both behave identically in service.',
    ],
    correctIndex: 1,
    explanation:
      'Monitoring is essential where the controlled function is part of life-safety. A failed sounder cable is a critical fault that must be detected. A failed cable to a non-life-safety output (e.g. a process plant alert) may be tolerable as unmonitored. The design specifies which outputs are monitored and which are not; the CIE configuration matches.',
  },
  {
    id: 'fam3-s4-refuge',
    question:
      'What is the relevance of BS 8893 (newly normative reference in BS 5839-1:2025) to interface design?',
    options: [
      'BS 8893 covers emergency voice communication (EVC) systems used at disabled refuges.',
      'BS 8893 specifies the fire-resisting cabling for interface circuits to controlled plant.',
      'BS 8893 sets the requirements for the standby batteries on loss of mains supply.',
      'BS 8893 covers the power-supply equipment (PSU) that feeds the fire alarm CIE.',
    ],
    correctIndex: 0,
    explanation:
      'Disabled refuges and EVC systems support inclusive evacuation. BS 8893 sets the EVC component standard. The 2025 normative reference means BS 5839-1:2025 expects interfaces and integration with EVC where refuges are present. BS EN 50518 covers monitoring and alarm receiving centre standards; together they form the framework for EVC and ARC integration around disabled persons in fire scenarios.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which BS 5839-1:2025 clause introduces the new accessibility requirement for fire alarm interfaces?',
    options: [
      'Clause 7, requiring interfaces to be accessible for maintenance, per CDM 2015.',
      'Clause 13, which sets out the spacing and siting of automatic fire detectors.',
      'Clause 22, which covers planned disablement of parts of the system during servicing.',
      'Clause 47, which deals with the documentation handed over on completion.',
    ],
    correctAnswer: 0,
    explanation:
      "Clause 7 is a 2025 addition specifically for interface placement. It is a CDM-aligned requirement: design with maintenance in mind. The example in the clause (placement inside other equipment's enclosure) is one common scenario; the principle applies more broadly — any siting that creates a maintenance hazard or impracticality must be avoided.",
  },
  {
    id: 2,
    question:
      'A fire alarm system needs to recall lifts on a fire signal. What is the typical interface architecture?',
    options: [
      'A mains-voltage feed wired from the CIE into the lift motor circuit to cut its supply.',
      'A manually operated key-switch at the lift lobby that a fire warden turns to recall lifts.',
      'A pneumatic line from the panel to the lift controller that triggers recall on pressure loss.',
      'A monitored volt-free contact to the lift controller, which runs the EN 81-73 recall.',
    ],
    correctAnswer: 3,
    explanation:
      'Volt-free (or "dry") contact is the universal interface idiom — it works regardless of the lift controller\'s voltage / circuitry. Monitored means the cable run is checked. The cause-and-effect matrix says when recall fires; the BS EN 81-73 lift behaviour says what the lift does; the interface monitor says the cable is intact.',
  },
  {
    id: 3,
    question:
      'What does "magnetic door holder" / "door release" mean in fire alarm interface design?',
    options: [
      'An electric lock that secures a fire door against use and releases it only on a fire signal.',
      'A door-mounted contact that raises a fault at the panel whenever a fire door is propped open.',
      'An electromagnet that holds a fire door open and releases it to close on a fire signal.',
      'A local sounder built into a fire door that warns when the door is opened during an alarm.',
    ],
    correctAnswer: 2,
    explanation:
      'Door holders integrate the active fire alarm system with passive compartmentation. Free passage during normal operation; self-closing under fire alarm to restore the compartment. Fail-safe: any loss of power (fault, deliberate isolation, fire damage to the magnet circuit) closes the door. The cause-and-effect matrix records the release trigger.',
  },
  {
    id: 4,
    question: 'What are typical "plant shutdown" interfaces and why are they used?',
    options: [
      'Outputs to HVAC, gas isolation and process plant, to stop smoke spread and make plant safe.',
      'Outputs that switch off the general office lighting on alarm so exit signs stand out.',
      'Outputs that isolate refrigeration plant so food storage areas are made safe before evacuation.',
      'Outputs that disconnect domestic-style appliances such as kettles and microwaves in kitchens.',
    ],
    correctAnswer: 0,
    explanation:
      'Plant shutdown is a major life-safety integration: HVAC continuing to run during a fire spreads smoke through the ductwork; live gas during a fire feeds the fire. The interfaces shut these systems down at the right moment per the matrix. The interface outputs are typically monitored (life-safety) and the controlled equipment is tested at commissioning and at every service.',
  },
  {
    id: 5,
    question: 'What does the Equality Act 2010 obligation produce in fire alarm interface design?',
    options: [
      'A requirement to colour-code interface cabling so accessibility circuits are identifiable.',
      'A requirement to fit a larger CIE so additional accessibility zones display on one panel.',
      'A requirement to network all panels so accessibility status is shared across the building.',
      'Provision for inclusive evacuation: refuges with EVC, VADs, and evacuation chairs.',
    ],
    correctAnswer: 3,
    explanation:
      'Inclusive evacuation is now mainstream. BS 5839-1:2025 adds BS 8893 as a normative reference for EVC; visual alarm devices are governed by BS EN 54-23. The fire alarm system is one part of an inclusive evacuation strategy that also includes physical refuges, evacuation chairs, training, and sometimes evacuation lifts.',
  },
  {
    id: 6,
    question:
      'A fire alarm system is to interface with a security access control system that locks specific doors. What is the typical fail-safe design?',
    options: [
      'Doors should fail-secure and stay locked on alarm, with escape only via final-exit doors.',
      'Doors should be physically wedged open each morning so they cannot lock during evacuation.',
      'Doors should fail-safe to unlocked on alarm, so loss of lock power releases them for escape.',
      'No interface is needed; the access-control system detects the fire itself and releases the doors.',
    ],
    correctAnswer: 2,
    explanation:
      'Life-safety priority over security: doors on escape routes must release on fire alarm to allow escape. Magnetic locks are common (fail-safe by design — loss of power releases the lock); some other lock technologies need explicit signalling. The fire alarm interface drives the release. Building occupants must be able to leave; that is non-negotiable.',
  },
  {
    id: 7,
    question:
      'The fire alarm system must signal a Building Management System (BMS). What is the typical interface and what data is conveyed?',
    options: [
      'Volt-free status contacts or a serial protocol carrying zone-level fire and fault status.',
      'A direct mains-voltage connection from the CIE that powers the BMS during a fire condition.',
      'An audio tone passed from the sounder circuit into the BMS, which decodes the fire status.',
      'An optical light-beam link between the panel and the BMS conveying status across the room.',
    ],
    correctAnswer: 0,
    explanation:
      'BMS integration is informational: the BMS receives status; the BMS does not control the fire alarm. The interface respects the principle that life-safety functions remain entirely within the fire alarm system. A BMS failure must not affect fire detection, alarm, or evacuation. The interface is monitored where the BMS uses the signal for life-safety annotation; otherwise unmonitored may be acceptable.',
  },
  {
    id: 8,
    question:
      'BS 5839-1:2025 clause 7 example states interfaces should NOT be sited inside an enclosure for other equipment if access requires what?',
    options: [
      'Walking more than a set distance from the CIE to reach the interface during a service.',
      'Using a ladder or other access equipment to reach an interface mounted at high level.',
      'Using a manufacturer-specific tool or key to open the enclosure housing the interface.',
      'Removing power to the other equipment, or attendance by other parties, to gain access.',
    ],
    correctAnswer: 3,
    explanation:
      "The 2025 clause aligns with CDM 2015. Designers think about maintenance, not just install. An interface that requires the building to be partially shut down for routine maintenance is a poor design — the maintenance will be deferred or skipped, and the interface will degrade out of compliance. The clause directs designers to plan for the system's maintenance lifecycle.",
  },
  {
    id: 9,
    question: 'What is a disabled refuge and how does the fire alarm system interface with it?',
    options: [
      'A dedicated storage room near the stair core where evacuation chairs are kept.',
      'A protected space where a person who cannot self-evacuate waits for assistance, with EVC.',
      'A room kept locked during evacuation so occupants are directed past it to the final exit.',
      'A ground-floor bedroom set aside for occupants who would struggle on the stairs in a fire.',
    ],
    correctAnswer: 1,
    explanation:
      'Disabled refuges are a critical part of inclusive evacuation. The fire alarm gives the alarm signal; the EVC gives two-way voice comms. The refuge is somewhere safe to wait for evacuation assistance (which may include trained staff with evacuation chairs, or evacuation lifts where provided). BS 8893 is now a normative reference in BS 5839-1:2025.',
  },
  {
    id: 10,
    question:
      'For a fire alarm interface to a critical life-safety output (sounders / VADs / lift recall), should the wiring be monitored?',
    options: [
      'Yes — the wiring must be monitored so a cable fault is reported, not missed until a test.',
      'Monitoring is optional where the cable run to the output is short and mechanically protected.',
      'The wiring need only be checked at installation and commissioning, not monitored thereafter.',
      'Monitoring of output wiring is never required, as the output is exercised in routine tests.',
    ],
    correctAnswer: 0,
    explanation:
      'Monitoring is the BS 5839-1 baseline for life-safety outputs. The reasoning: a critical output that does not work in a fire is a worse failure mode than a CIE that does not work, because the CIE failure is signalled by the fault while the output failure can be silent. Continuous monitoring of cable integrity catches the silent failure mode.',
  },
];

const FireAlarmModule3Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Interface design | Fire Alarm Module 3.4 | Elec-Mate',
    description:
      'BS 5839-1:2025 interface design: clause 7 accessibility / CDM 2015, lift recall (EN 81-73), magnetic door holders, plant shutdown, BMS integration, access control, voice alarm, disabled refuge / EVC (BS 8893 — new 2025 normative reference), monitored vs unmonitored outputs.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 4"
            title="Interface design"
            description="BS 5839-1:2025 clause 7: interfaces must be accessible for maintenance (CDM 2015 alignment). Plus lift recall (EN 81-73), magnetic door holders, plant shutdown, BMS integration, access control, voice alarm (BS 5839-8 / EN 54-16/-24), and disabled refuge / EVC (BS 8893 — new 2025 normative reference)."
            tone="yellow"
          />

          <TLDR
            points={[
              "NEW in BS 5839-1:2025 (clause 7): interfaces must be located so they are ACCESSIBLE for maintenance — aligned with CDM 2015 to reduce risks to maintenance personnel. Don't hide interfaces inside other equipment's enclosures.",
              'Lift recall on fire alarm: monitored volt-free contact from CIE → lift controller; lift returns to recall floor and is taken out of service per BS EN 81-73.',
              'Magnetic door holders: electromagnets hold fire-resisting doors open under normal conditions; de-energise on fire alarm; doors close to restore compartmentation. Fail-safe by design.',
              'Plant shutdown: HVAC fans / fire dampers, gas isolation valves, fuel shut-offs, process emergency stops. Monitored outputs from CIE; documented in cause-and-effect matrix.',
              'Access control: locked doors on escape routes must fail-safe to UNLOCKED on fire alarm. Magnetic locks (fail-safe by design); access control system signals or drops supply.',
              'BMS integration: volt-free contacts or serial / network protocol (BACnet, Modbus). Informational — BMS receives status; BMS does NOT control fire alarm.',
              'Voice alarm: BS 5839-8 specifies voice alarm system design; BS EN 54-16 (control + indicating) and BS EN 54-24 (loudspeakers) are the product standards. Fire alarm CIE triggers VA; VA delivers spoken evacuation messages.',
              'Disabled refuges + EVC (emergency voice communication): BS 8893 is NEW normative reference in BS 5839-1:2025. Two-way comms between refuge and control point.',
              'BS EN 50518 (alarm receiving centre standard) governs ARC infrastructure for life-safety signalling.',
              'Monitored outputs (continuous cable integrity check) required for life-safety functions; unmonitored may be acceptable for non-critical functions.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply BS 5839-1:2025 clause 7: place fire alarm interfaces so they are accessible for maintenance, aligned with CDM 2015',
              'Specify lift recall interfaces in line with BS EN 81-73 lift safety standard',
              'Design magnetic door holder circuits as fail-safe outputs that close fire-resisting doors on alarm to restore compartmentation',
              'Configure plant shutdown interfaces (HVAC, gas, fuel, process emergency stops) so smoke / fuel / hazard is removed from the affected area',
              'Integrate access control so escape-route doors fail-safe to UNLOCKED on fire alarm',
              'Specify monitored interface outputs for life-safety functions; understand when unmonitored may be acceptable for informational outputs',
              'Integrate disabled refuges with emergency voice communication systems per BS 8893 (new 2025 normative reference) and Equality Act 2010 obligations',
              'Distinguish life-safety outputs (always monitored, fail-safe) from informational outputs (BMS, logging) that may use simpler interfaces',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The 2025 accessibility requirement (clause 7)</ContentEyebrow>

          <ConceptBlock
            title="Interfaces must be accessible for maintenance"
            plainEnglish="Interfaces are devices that translate between the fire alarm system and other building systems — relays, contact outputs, signal modules. They are typically wall-mounted boxes containing the interface circuitry. Over the system's life, interfaces require maintenance: testing the contact operation, replacing failed components, updating wiring on system changes. BS 5839-1:2025 clause 7 introduces a new requirement: interfaces must be located so they are ACCESSIBLE for maintenance. This aligns with the Construction (Design and Management) Regulations 2015 obligation to reduce risks to maintenance personnel."
            onSite="Before signing off an interface location, ask: 'Can a fire alarm engineer reach this interface during a normal working day, with normal access, without coordination with other trades?' If yes, the location is fine. If the answer involves shutting down switchgear, getting a permit, or scaffolding, the location is not fine — find another."
          >
            <p>The clause and its practical effect:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Clause 7 of BS 5839-1:2025</strong> — &quot;For all systems and categories,
                the fire detection and fire alarm system interfaces should be located such that they
                are accessible for maintenance purposes.&quot;
              </li>
              <li>
                <strong>CDM 2015 alignment</strong> — designers have a legal duty to reduce risks
                during the construction AND maintenance phases of a project. Interface placement
                affects maintenance risk; designers must consider maintenance access from the
                outset.
              </li>
              <li>
                <strong>The clause example</strong> — interfaces should not be sited inside an
                enclosure provided for other equipment if access would not be possible without
                removing power to that other equipment or requiring attendance by other parties.
              </li>
              <li>
                <strong>Practical interpretation</strong> — interface boxes mounted on accessible
                wall surfaces in defined plant rooms / risers / service voids; not buried in ceiling
                voids without access hatches; not behind permanent finishes; not inside live
                switchgear cabinets.
              </li>
            </ul>
            <p>
              The new requirement formalises common-sense good practice that was previously left to
              designer judgement. It changes the conversation at design review: interface
              accessibility is now a clause-level question, asked explicitly.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 7 (Placement of interfaces)"
            clause={
              <>
                For all systems, and categories, the fire detection and fire alarm system interfaces
                should be located such that they are accessible for maintenance purposes. This is to
                keep in line with the requirements of The Construction (Design and Management)
                Regulations 2015, with its requirements to reduce risks to maintenance personnel.
                Therefore, as a common example, this might preclude the siting of the interface
                within an enclosure provided for other equipment, as access might not be possible
                without the need for attendance by other parties or might involve removing power to
                the other equipment.
              </>
            }
            meaning="Three explicit alignments. (1) CDM 2015 is named — designers have legal duties under CDM that include planning for maintenance. (2) The 'enclosure for other equipment' example is illustrative — switchgear cabinets are the most common case but the principle applies more broadly. (3) The clause asks designers to think about who needs to access the interface and how, throughout the system's life, not just at install."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Diagram — interface schematic */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Interface schematic — door release, lift recall, plant shutdown, EVC
            </h4>
            <svg
              viewBox="0 0 880 540"
              className="w-full h-auto"
              role="img"
              aria-label="A fire alarm CIE with monitored interface outputs feeding (a) magnetic door holders for fire doors, (b) lift recall input on the lift controller per BS EN 81-73, (c) HVAC / gas plant shutdown via emergency stop input, (d) Disabled refuge EVC system per BS 8893."
            >
              <text
                x="440"
                y="28"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="14"
                fontWeight="bold"
              >
                Fire alarm CIE → interface outputs → controlled systems
              </text>

              {/* CIE central */}
              <rect
                x="360"
                y="60"
                width="160"
                height="100"
                rx="10"
                fill="rgba(251,191,36,0.1)"
                stroke="#FBBF24"
                strokeWidth="2"
              />
              <text
                x="440"
                y="92"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                CIE
              </text>
              <text x="440" y="112" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                Cause-and-effect
              </text>
              <text x="440" y="126" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10">
                drives outputs
              </text>
              <text x="440" y="146" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                Clause 22.5 mandatory
              </text>

              {/* Top-left — Door holders */}
              <line x1="360" y1="100" x2="200" y2="100" stroke="#22C55E" strokeWidth="2" />
              <line x1="200" y1="100" x2="200" y2="190" stroke="#22C55E" strokeWidth="2" />
              <rect
                x="80"
                y="190"
                width="240"
                height="100"
                rx="8"
                fill="rgba(34,197,94,0.08)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <text
                x="200"
                y="214"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                Magnetic door holders
              </text>
              <text x="200" y="232" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Electromagnet holds fire door open
              </text>
              <text x="200" y="248" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                De-energise on alarm → door closes
              </text>
              <text x="200" y="264" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Fail-safe (loss of power = closed)
              </text>
              <text
                x="200"
                y="280"
                textAnchor="middle"
                fill="rgba(34,197,94,0.7)"
                fontSize="9"
                fontWeight="bold"
              >
                MONITORED output
              </text>

              {/* Top-right — Lift recall */}
              <line x1="520" y1="100" x2="680" y2="100" stroke="#A855F7" strokeWidth="2" />
              <line x1="680" y1="100" x2="680" y2="190" stroke="#A855F7" strokeWidth="2" />
              <rect
                x="560"
                y="190"
                width="240"
                height="100"
                rx="8"
                fill="rgba(168,85,247,0.08)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="680"
                y="214"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                Lift recall (BS EN 81-73)
              </text>
              <text x="680" y="232" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Volt-free contact → lift controller
              </text>
              <text x="680" y="248" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Lift returns to recall floor
              </text>
              <text x="680" y="264" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Out of service (occupants out)
              </text>
              <text
                x="680"
                y="280"
                textAnchor="middle"
                fill="rgba(168,85,247,0.7)"
                fontSize="9"
                fontWeight="bold"
              >
                MONITORED output
              </text>

              {/* Bottom-left — Plant shutdown */}
              <line x1="360" y1="160" x2="200" y2="160" stroke="#EF4444" strokeWidth="2" />
              <line x1="200" y1="160" x2="200" y2="350" stroke="#EF4444" strokeWidth="2" />
              <rect
                x="80"
                y="350"
                width="240"
                height="100"
                rx="8"
                fill="rgba(239,68,68,0.08)"
                stroke="#EF4444"
                strokeWidth="1.6"
              />
              <text
                x="200"
                y="374"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                Plant shutdown
              </text>
              <text x="200" y="392" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                HVAC fans / fire dampers / gas
              </text>
              <text x="200" y="408" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                isolation valve / fuel shut-off
              </text>
              <text x="200" y="424" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Emergency-stop input on plant
              </text>
              <text
                x="200"
                y="440"
                textAnchor="middle"
                fill="rgba(239,68,68,0.7)"
                fontSize="9"
                fontWeight="bold"
              >
                MONITORED output
              </text>

              {/* Bottom-right — EVC / refuge */}
              <line x1="520" y1="160" x2="680" y2="160" stroke="#22D3EE" strokeWidth="2" />
              <line x1="680" y1="160" x2="680" y2="350" stroke="#22D3EE" strokeWidth="2" />
              <rect
                x="560"
                y="350"
                width="240"
                height="100"
                rx="8"
                fill="rgba(34,211,238,0.08)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text
                x="680"
                y="374"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                Disabled refuge / EVC
              </text>
              <text x="680" y="392" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                BS 8893 — new 2025 normative ref
              </text>
              <text x="680" y="408" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Two-way comms refuge ↔ control
              </text>
              <text x="680" y="424" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Equality Act 2010 obligation
              </text>
              <text
                x="680"
                y="440"
                textAnchor="middle"
                fill="rgba(34,211,238,0.7)"
                fontSize="9"
                fontWeight="bold"
              >
                Status signalling to EVC
              </text>

              {/* Bottom legend */}
              <rect
                x="40"
                y="476"
                width="800"
                height="48"
                rx="8"
                fill="rgba(251,191,36,0.05)"
                stroke="rgba(251,191,36,0.3)"
                strokeWidth="1.2"
              />
              <text
                x="440"
                y="496"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                BS 5839-1:2025 clause 7: ALL interfaces accessible for maintenance (CDM 2015
                alignment)
              </text>
              <text x="440" y="512" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Do not bury interfaces inside switchgear cabinets · life-safety outputs MONITORED ·
                cause-and-effect matrix mandatory
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>
            Interface types — door, lift, plant, BMS, access, voice, EVC
          </ContentEyebrow>

          <ConceptBlock
            title="Magnetic door holders — passive compartmentation made active"
            plainEnglish="A fire-resisting door is part of the building's passive compartmentation. Held closed it forms part of the fire barrier; held open (for free passage of occupants and goods) the compartment line is broken. A magnetic door holder is an electromagnet that holds the fire door OPEN against the closing force of a self-closer. Energising the magnet (normal condition) holds the door open; de-energising the magnet (fire alarm or power loss) releases the door which closes under the self-closer's spring force, restoring the compartment."
          >
            <p>Design considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Fail-safe</strong> — the magnet de-energising on power loss closes the door.
                This is the architectural property: no separate signal needed. A fire that damages
                the supply causes the door to close.
              </li>
              <li>
                <strong>Monitored output</strong> — the fire alarm CIE provides a monitored
                interface output that drops the magnet supply on fire alarm. Continuous monitoring
                detects cable faults; at fire-alarm time the monitored output drops the supply
                intentionally.
              </li>
              <li>
                <strong>Coordination with door hardware</strong> — the door must have a self-closer
                strong enough to overcome any swelling / friction. The magnet must be powerful
                enough to hold the door open in normal conditions but weaker than the self-closer
                under release.
              </li>
              <li>
                <strong>Manual release</strong> — door holders typically include a local manual
                release button to allow the door to be closed without triggering the fire alarm
                (e.g. for fire drills, security checks).
              </li>
            </ul>
            <p>
              Door holders are widely used in commercial buildings, hospitals, schools, and wherever
              free passage is needed during normal operation but compartmentation must be restored
              on alarm. The cause-and-effect matrix records the release trigger.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Lift recall — BS EN 81-73 integration"
            plainEnglish="Passenger lifts are not normally used for evacuation in fire (firefighting lifts and evacuation lifts are exceptions designed for different scenarios). On a fire alarm, lifts are recalled to the designated recall floor (typically the ground / final exit floor); they take any passengers there, open the doors, and then go out of service. The fire alarm system signals the lift control to initiate recall via a defined interface; the lift controller executes the BS EN 81-73 recall sequence."
          >
            <p>Recall interface design:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Monitored volt-free contact</strong> from the fire alarm CIE / interface
                module to the lift controller&apos;s recall input. Volt-free is universal — works
                regardless of the lift controller voltage / circuitry.
              </li>
              <li>
                <strong>Per-shaft signalling</strong> in some designs — typically all lifts in a
                building recall together, but in some configurations specific lifts may be held in
                service for fire-fighter use or excluded for other reasons. The cause-and-effect
                matrix records the per-lift logic.
              </li>
              <li>
                <strong>Indication at the CIE</strong> — the CIE indicates recall is active. On the
                lift control side, BS EN 81-73 specifies the lift behaviour: returning to the recall
                floor, opening doors, going out of service.
              </li>
              <li>
                <strong>Firefighting lifts</strong> — if the building has firefighting lifts (BS EN
                81-72), they are NOT recalled with the passenger lifts. They remain in service for
                fire and rescue service use, controlled by their own switching at the fire-fighter
                access level.
              </li>
            </ul>
            <p>
              The interface is the bridge between BS 5839-1 (fire alarm) and BS EN 81-73 / -72 (lift
              safety). The two systems are commissioned together and tested together at every
              service.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <ConceptBlock
            title="Plant shutdown — HVAC, gas, fuel, process"
            plainEnglish="Several building services must shut down or change state on fire alarm to manage the spread of fire / smoke and to remove fuel sources. The fire alarm system signals each affected plant via interface outputs; each plant has an emergency-stop input that triggers the shutdown sequence. The cause-and-effect matrix records every interface output and the sequence of activation."
          >
            <p>Typical plant shutdowns:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>HVAC fans</strong> — shut off to prevent smoke distribution through the
                ductwork. Some smoke control systems do the opposite — START fans to extract smoke
                from specific zones. The cause-and-effect matrix records which fans stop and which
                start.
              </li>
              <li>
                <strong>Fire dampers</strong> — close to seal the ductwork penetrations through fire
                compartments. Some are electrically driven (interface controlled); some are
                fusible-link / passive.
              </li>
              <li>
                <strong>Gas isolation valves</strong> — close to remove gas as a fuel source from
                the affected area. Often a building-wide gas valve at the meter; sometimes
                zone-specific valves for laboratories / kitchens.
              </li>
              <li>
                <strong>Fuel shut-offs</strong> — fuel oil pumps, biomass feeds, hydrogen / other
                fuel supply lines. Critical in industrial premises.
              </li>
              <li>
                <strong>Process emergency stops</strong> — manufacturing, chemical, food processing
                equipment. Fire alarm initiates the same emergency-stop sequence as a local E-stop
                button.
              </li>
            </ul>
            <p>
              Each plant shutdown is a defined interface from the CIE to the plant controller. Each
              interface output is monitored for life-safety reasons. The matrix records the
              activation logic; the commissioning tests verify each interface operates as specified.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Access control — fail-safe to escape"
            plainEnglish="Modern buildings often have access-controlled doors on escape routes — magnetic locks, electric strikes, or maglock-equipped fire doors. Access control prevents unauthorised entry but must NEVER prevent egress in a fire. The fire alarm interface signals the access control system (or directly drops the lock supply) on fire alarm, releasing all locks on escape routes."
          >
            <p>Design principles:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Fail-safe to unlocked</strong> — the lock technology must release on power
                loss. Magnetic locks (maglocks) do this by design — the lock holds when energised
                and releases when de-energised. Electric strikes need to be specified fail-safe-mode
                (also de-energised = released).
              </li>
              <li>
                <strong>Direct power drop OR signalling</strong> — the simplest design is for the
                fire alarm interface to drop the lock supply directly. More sophisticated designs
                signal the access control system, which logs the event and releases the relevant
                doors.
              </li>
              <li>
                <strong>Independent override</strong> — break-glass green call points adjacent to
                each access-controlled exit door provide manual override. These are NOT fire alarm
                call points; they are escape-door overrides.
              </li>
              <li>
                <strong>Secure but not trapped</strong> — the design balance: secure under normal
                conditions; never trap occupants in a fire.
              </li>
            </ul>
            <p>
              Building Regulations and the Regulatory Reform (Fire Safety) Order 2005 require escape
              routes to be useable. Access control that prevents escape is non-compliant. The fire
              alarm interface to access control is the principal mechanism that ensures compliance
              under alarm conditions.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 · Article 14 (Emergency routes and exits)"
            clause={
              <>
                Where necessary in order to safeguard the safety of relevant persons in case of
                fire, the responsible person must ensure that emergency routes and exits are kept
                clear at all times and that any door or gate on an escape route can be easily and
                immediately opened by any person who may require to use it in an emergency. Any fire
                detection and fire alarm system or other safety system that is interfaced with door
                release / access control should ensure that locked doors release immediately on the
                fire alarm signal.
              </>
            }
            meaning="Escape route doors must release on fire alarm. The fire alarm interface to access control is how this is implemented; the maglock fail-safe behaviour is how this is achieved physically. Failure here is a serious fire safety failing — occupants trapped behind locked doors. Designers, installers, and the responsible person are jointly responsible for ensuring the escape integrity."
          />

          <ConceptBlock
            title="BMS / network integration — informational, not control"
            plainEnglish="Modern buildings have a Building Management System (BMS) that integrates HVAC, lighting, energy, and other systems. The BMS commonly receives status signals from the fire alarm — fire indication per zone, fault status, isolation status — for logging, alerting facilities staff, and integration with other building events. The fire alarm REMAINS the controller of life-safety functions. The BMS is informed; the BMS does not control."
          >
            <p>Integration patterns:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Volt-free contact outputs</strong> — typical for legacy / simple
                installations. Fire / fault / isolation status as separate contacts read by the BMS
                as digital inputs.
              </li>
              <li>
                <strong>Serial / network protocol</strong> — BACnet, Modbus, or vendor-proprietary —
                for richer data including zone-level status, device-level addressable information,
                and historical event logs.
              </li>
              <li>
                <strong>Cyber security boundary</strong> (per BS 5839-1:2025 clause 43.4) — the
                interface to BMS / corporate network must not allow the BMS to control the fire
                alarm. Authentication, network segregation, and risk assessment per the 2025
                cyber-security clause apply.
              </li>
            </ul>
            <p>
              The fire alarm system\&apos;s primary loyalty is to the life-safety function. Any
              integration with BMS / network must preserve that loyalty.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Voice alarm and emergency voice communication</ContentEyebrow>

          <ConceptBlock
            title="Voice alarm — BS 5839-8 / EN 54-16 / EN 54-24"
            plainEnglish="In larger or more complex buildings, voice alarm replaces (or augments) tone-based sounders. Instead of a generic alarm tone, occupants hear spoken evacuation messages: 'A fire has been reported in the building. Please evacuate via the nearest exit.' BS 5839-8 specifies the voice alarm system design; BS EN 54-16 governs the voice alarm control + indicating equipment; BS EN 54-24 governs the loudspeakers. The fire alarm CIE triggers the voice alarm via an interface; the voice alarm system delivers the spoken messages."
          >
            <p>Design considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Trigger interface</strong> — fire alarm CIE → voice alarm controller. The
                cause-and-effect matrix specifies which message zones activate on which causes.
                Phased evacuation in a tall building uses voice alarm extensively because spoken
                messages can give specific instructions per floor.
              </li>
              <li>
                <strong>Message zones</strong> — areas of the building covered by specific
                loudspeaker groups. Often align with fire detection zones; not always (a single
                voice alarm zone may cover several detection zones).
              </li>
              <li>
                <strong>Pre-recorded vs live</strong> — pre-recorded messages for standard
                evacuation; live announcements via microphone for staff use during managed response.
              </li>
              <li>
                <strong>Audibility and intelligibility</strong> — voice alarm must be loud enough
                AND clear enough. Speech transmission index (STI) is the metric; specific values per
                BS 5839-8.
              </li>
            </ul>
            <p>
              Voice alarm is now common in large retail, transport hubs, hotels, and high-rise
              buildings. The integration with fire alarm is via interface outputs; the design and
              commissioning are coordinated.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Disabled refuge and emergency voice communication — BS 8893 (new 2025 normative reference)"
            plainEnglish="Disabled refuges are protected spaces within escape routes where occupants who cannot self-evacuate (wheelchair users, occupants with mobility impairments, occupants with sensory impairments) wait for evacuation assistance. They are equipped with two-way emergency voice communication (EVC) systems connecting the refuge to a control point manned during the evacuation. BS 8893 specifies the EVC system; BS 5839-1:2025 adds it as a normative reference."
          >
            <p>Refuge + EVC integration:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>The refuge</strong> — a fire-resisting protected space within or adjacent to
                a stairway / escape route. Equipped with an evacuation chair, the EVC handset, and
                signage. Per Approved Document M / Equality Act 2010 obligations.
              </li>
              <li>
                <strong>The EVC</strong> — a two-way audio communication system. The refuge has a
                handset / panel; a control point (fire warden station / reception) has a master
                panel that takes calls from any active refuge handset. BS 8893 specifies the
                technical requirements.
              </li>
              <li>
                <strong>Fire alarm interface</strong> — the fire alarm CIE signals fire status to
                the EVC system. The EVC system may automatically switch to a "fire" state where it
                displays / signals the alarm status to the refuge and to the control point. The EVC
                remains operational independent of the fire alarm — it has its own power supply, its
                own cabling.
              </li>
              <li>
                <strong>Evacuation lifts</strong> — where provided (typically high-rise buildings),
                evacuation lifts are managed in coordination with the fire alarm and the EVC. They
                are dispatched to refuges to evacuate occupants who cannot use stairs.
              </li>
            </ul>
            <p>
              The 2025 normative reference to BS 8893 signals the maturity of EVC systems as
              standard life-safety infrastructure. Designers of new buildings (and refurbishments of
              existing ones) increasingly include EVC as part of an inclusive evacuation strategy.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Normative references (BS 8893 added 2025)"
            clause={
              <>
                BS 8893, Emergency voice communication (EVC) systems — Components — Specification,
                is added to the normative references in BS 5839-1:2025. EVC systems are a normal
                expectation in fire detection and fire alarm system design where disabled refuges
                are provided per the Equality Act 2010 and Approved Document M of the Building
                Regulations.
              </>
            }
            meaning="The 2025 standard formally recognises EVC as part of the life-safety design framework. BS 8893 is the EVC component specification; BS EN 50518 covers monitoring and alarm receiving centres; together they provide the standards-based framework. The fire alarm system interfaces with the EVC; the EVC integrates with the broader inclusive evacuation strategy."
          />

          <Scenario
            title="High-rise office tower — interfaces in a complex life-safety system"
            situation="A 25-storey commercial office tower is being designed. The fire engineering specifies phased evacuation, a voice alarm system covering the whole building, lift recall on all 8 passenger lifts (BS EN 81-73), a separate firefighting lift (BS EN 81-72), 12 disabled refuges (one on each upper floor stairway lobby) with EVC, magnetic door holders on cross-corridor fire doors, BMS integration for facilities management, plant shutdown (HVAC fans, gas valves on lower floors). The fire alarm designer must specify all interfaces."
            whatToDo="Map every interface against the cause-and-effect matrix. Each interface is a clause-7 conversation: where will this interface module physically live? Is it accessible for maintenance? On a 25-storey building, interfaces should typically be sited in service risers / plant rooms with proper access — not buried in ceilings or inside live switchgear cabinets. Lift recall interfaces: monitored volt-free contacts from CIE → lift controller in the lift motor room (accessed by lift maintenance); CIE indicates recall active; firefighting lift NOT recalled with passengers. Door holders: monitored outputs to each magnet circuit; cause-and-effect releases at the right stage in the phased evacuation. EVC: BS 8893-compliant system with handsets at each refuge, master panel at the fire warden control point on the ground floor; fire alarm signals fire status to EVC, EVC remains independent. Voice alarm: BS 5839-8 system, message zones aligned to floors / phased stages; pre-recorded messages with live announcement capability from the fire warden position. Plant shutdown: HVAC interfaces accessible at the AHU plant rooms; gas valve interface accessible at the gas meter cabinet (with appropriate signage and access management). BMS integration: BACnet over IP, fire alarm system signals one-way to BMS, BMS does not control fire alarm. Cyber security: BS 5839-1:2025 clause 43.4 — physical access control to the CIE cabinet, network segregation between fire alarm and corporate IT, authentication for any remote service. Document everything in the cause-and-effect matrix and the interface schedule. Issue a commissioning certificate and a system extension or modification certificate per clause 47."
            whyItMatters="A 25-storey tower has perhaps 50-100 individual interfaces. Each is a single point that must work in a fire. Each is a single point that must be maintainable over the building's 50-year life. The 2025 clause 7 accessibility requirement is not pedantry — it is the difference between a system that is maintained and a system that is left to degrade. The cause-and-effect matrix coordinates everything; the interface schedule is the implementation."
          />

          <SectionRule />

          <ContentEyebrow>Monitored vs unmonitored — when each is appropriate</ContentEyebrow>

          <ConceptBlock
            title="Monitoring is the BS 5839-1 baseline for life-safety"
            plainEnglish="Cable monitoring continuously checks the integrity of an interface output's wiring. The fire alarm system passes a small standby current; if the cable opens (break) or shorts, the current changes and the CIE reports a fault. Monitored outputs catch silent failures: a cable damaged during refurbishment, a corroded terminal, a connector vibrating loose. Unmonitored outputs do not — a fault on the cable would only be discovered at the next scheduled test."
          >
            <p>The BS 5839-1 monitoring expectations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Sounder circuits</strong> — always monitored. A failed sounder cable means
                an audible alarm not heard.
              </li>
              <li>
                <strong>VAD circuits</strong> — always monitored. Same reasoning for visual alarms.
              </li>
              <li>
                <strong>Voice alarm interfaces</strong> — monitored to and within the voice alarm
                system.
              </li>
              <li>
                <strong>Lift recall outputs</strong> — monitored. Lift recall is life-safety.
              </li>
              <li>
                <strong>Door holder outputs</strong> — monitored. Door release is life-safety
                (compartmentation restoration).
              </li>
              <li>
                <strong>Plant shutdown outputs</strong> — typically monitored where life-safety
                affects (HVAC for smoke control, gas isolation).
              </li>
              <li>
                <strong>BMS / informational outputs</strong> — may be unmonitored. The BMS receiving
                stale or no data is not a life-safety failure.
              </li>
              <li>
                <strong>Service / maintenance signals</strong> — may be unmonitored. Engineering
                test outputs, indication-only signals.
              </li>
            </ul>
            <p>
              The design specifies monitored vs unmonitored per output. The CIE configuration
              matches. Commissioning verifies the monitoring is operational. The 6-monthly service
              tests cable monitoring by introducing controlled faults at the interface and observing
              the CIE response.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Siting a fire alarm interface inside a switchgear cabinet"
            whatHappens="A new commercial premises is designed with the fire alarm interface to a generator load-shed function sited inside the LV switchgear cabinet because it was the closest space at install time. Three years later, a service engineer arrives to test the load-shed interface during a 6-monthly service. They cannot access the cabinet without the building's HV electrician attending and isolating part of the LV switchgear. The service engineer reports the interface as inaccessible, the load-shed test is deferred, the service is incomplete."
            doInstead="Per BS 5839-1:2025 clause 7, the interface should not be sited inside an enclosure for other equipment if access requires removing power to that other equipment OR attendance by other parties. Site the interface in an accessible location — adjacent to the switchgear in a separate small enclosure with its own access; in a service cupboard; in a plant room with proper access. The interface module itself is small (perhaps a pattress-sized box); the space requirement is modest; the savings from co-location are typically minimal. The new clause prevents this trade-off being made at install in a way that bites later."
          />

          <CommonMistake
            title="Treating door holders as unmonitored 'just to save cable'"
            whatHappens="A retrofit fire alarm covers a building with 30 fire doors fitted with magnetic door holders. The original install used unmonitored interface outputs to the magnets, justified at the time as 'door holders fail safely on power loss anyway.' Two years later, a cable supplying one zone's door holders is damaged during a separate works project. The cable is severed but the maintenance team does not notice — there is no monitoring, no fault on the CIE. The doors held by that cable are no longer held energised; they have closed. Occupants report 'doors keep closing on us' and the building manager assumes mechanical fault. The compartmentation function is in fact still working (the doors close); the convenience function (held open) is broken. But the CIE shows nothing wrong."
            doInstead="Monitor door holder outputs. The 'fail-safe' argument is correct for the closing direction (doors close on power loss = compartmentation restored), but it ignores the other failure mode: the holding circuit failing in a way that closes doors prematurely is also a fault that must be reported. Monitored outputs catch cable faults; the CIE reports the fault; the maintenance organisation responds. The cable cost difference for monitoring is trivial; the operational benefit is real."
          />

          <CommonMistake
            title="Forgetting the voice alarm cause-and-effect matrix entries"
            whatHappens="A building with both fire alarm sounders AND voice alarm has a cause-and-effect matrix that documents the sounder activation per zone — but does not document the voice alarm message zones, message selection, or staging. The voice alarm system is commissioned separately by the VA contractor. At a fire test six months later, the sounders activate as expected but the voice alarm gives a different message in some zones than the fire alarm matrix would suggest. The two systems have drifted out of alignment. There is no single source of truth."
            doInstead="The cause-and-effect matrix covers ALL outputs the fire alarm system controls — sounders, VADs, voice alarm message zones, lift recall, door holders, plant shutdown, EVC signals, ARC transmission. Voice alarm is integrated, not separate. The matrix records, for each cause, every effect across every output system. The commissioning of the integrated system tests every entry. the BS 5839-1:2025 mandate that the matrix be in handover documentation is exactly to prevent this kind of drift."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              "NEW in BS 5839-1:2025 (clause 7): interfaces must be accessible for maintenance, aligned with CDM 2015. Don't bury them in switchgear cabinets.",
              'Lift recall (BS EN 81-73): monitored volt-free contact CIE → lift controller; lift returns to recall floor and goes out of service.',
              'Magnetic door holders: electromagnets hold fire doors open in normal conditions; de-energise on alarm to close doors. Fail-safe by design. Monitored output.',
              'Plant shutdown: HVAC, gas, fuel, process emergency stops via monitored outputs. Cause-and-effect matrix records each.',
              'Access control: escape route doors must fail-safe to UNLOCKED on fire alarm. Magnetic locks (maglocks) or fail-safe-mode electric strikes; fire alarm signals release.',
              'BMS integration: informational only — BMS receives status; BMS does NOT control fire alarm. Cyber security boundary per clause 43.4.',
              'Voice alarm: BS 5839-8 design, BS EN 54-16 control + indicating equipment, BS EN 54-24 loudspeakers. Trigger interface from fire alarm CIE; messages per zone.',
              'Disabled refuge + EVC: BS 8893 NEW 2025 normative reference. Two-way comms refuge ↔ control point. Equality Act 2010 / Approved Document M obligations.',
              'BS EN 50518 covers ARC monitoring infrastructure for life-safety signalling.',
              'Monitored outputs (continuous cable check) for life-safety functions. Unmonitored may be acceptable for informational signals only.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Where should a fire alarm interface module be sited per BS 5839-1:2025?',
                answer:
                  'In a location accessible for maintenance per clause 7. Practical guidance: in a service cupboard, riser, or plant room with normal working access; not inside switchgear cabinets where access requires isolating live equipment; not in ceiling voids without access hatches; not behind permanent finishes. The principle: a fire alarm engineer should be able to reach the interface during routine maintenance without coordinating with other trades or shutting down other systems.',
              },
              {
                question: 'Is BS EN 81-73 a fire alarm standard?',
                answer:
                  'No — it is a lift safety standard. It specifies how lifts behave in the event of a fire alarm signal: recalling to the recall floor, opening doors, going out of service. The fire alarm system does not implement this behaviour; the lift does. The fire alarm interface to the lift control provides the trigger signal. The two systems work together; commissioning involves both contractors testing the integrated behaviour.',
              },
              {
                question:
                  'On a fire alarm, do firefighting lifts get recalled with passenger lifts?',
                answer:
                  'No. Firefighting lifts (BS EN 81-72) are intended for fire and rescue service use during fire-fighting operations. They are NOT recalled by the passenger-lift recall logic. They remain in service, controlled by switching at the firefighting access level. The cause-and-effect matrix clearly distinguishes passenger lifts (recalled) from firefighting lifts (held in service).',
              },
              {
                question: 'How is the EVC system tested?',
                answer:
                  'Per BS 8893 maintenance recommendations and the maintenance schedule for the EVC system. Routine testing typically includes: handset operation at each refuge, audio quality from refuge to control point, control point answer / call routing, fault indication. The fire alarm interface to the EVC is tested at each fire alarm service visit (the fire alarm signals "fire" to the EVC; the EVC indication should respond). The EVC has its own commissioning and maintenance regime separate from but coordinated with the fire alarm.',
              },
              {
                question: 'Can BMS integration use a network protocol like BACnet?',
                answer:
                  'Yes — many modern installations use BACnet, Modbus, or similar protocols for BMS integration. The interface is informational: the BMS reads status from the fire alarm. Cyber security per BS 5839-1:2025 clause 43.4 applies — the integration must not allow the BMS to control the fire alarm. Network segregation, authentication, and risk assessment apply. The interface is typically read-only from the BMS perspective.',
              },
              {
                question: 'What happens if a magnetic door holder cable is faulty?',
                answer:
                  'If the output is monitored (per BS 5839-1 expectation), the CIE reports a fault. The responsible person and servicing organisation respond — a service engineer attends, diagnoses, repairs the cable. The doors held by that cable have likely already closed (de-energising on cable break) — compartmentation is restored, but the convenience function is lost. If the output is unmonitored, the same physical event happens (doors close) but the CIE does not report a fault — the next service visit identifies the issue, potentially weeks later. Monitor your outputs.',
              },
              {
                question: 'Is voice alarm part of fire alarm or a separate system?',
                answer:
                  'Both. Voice alarm has its own product standards (BS EN 54-16 for control + indicating equipment, BS EN 54-24 for loudspeakers) and design standard (BS 5839-8). It is a separate system in the same way that a sounder circuit is a separate system. From the cause-and-effect matrix perspective, voice alarm is simply another output the fire alarm CIE controls. Commissioning and maintenance involve both fire alarm and voice alarm contractors; the integrated system is verified end-to-end at the fire alarm system commissioning.',
              },
              {
                question: 'How should I document interfaces in the design package?',
                answer:
                  'Three things. (1) An interface schedule — a table listing every interface, where it physically is, what it controls, monitored or unmonitored, the cable type / route. (2) The cause-and-effect matrix — what each cause does to each output, including each interface output. (3) Interface schematics — diagrammatic representations of the wiring, particularly important for complex interfaces (lift recall, plant shutdown, EVC integration). All three together form the documentation set per BS 5839-1:2025 clause 22 / 38.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Interface design — Module 3.4" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-3/section-5')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.5 Network and multi-panel systems
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule3Section4;
