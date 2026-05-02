import { ArrowLeft, ChevronLeft, ChevronRight, Zap } from 'lucide-react';
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
    id: 'fam4-s1-dedicated',
    question:
      'BS 5839-1:2025 requires the fire alarm primary supply to be taken from where in the building?',
    options: [
      'From the nearest convenient socket-outlet on a final ring circuit.',
      "A DEDICATED 230 V AC final circuit, taken directly from a point as close as practicable to the origin of the consumer's installation (the main switch / consumer unit), with no other load shared on the circuit. The circuit serves the fire alarm system only — no sockets, no lighting, no auxiliary loads — so that operating, fault-finding or maintaining any other circuit cannot remove power from the fire alarm.",
      'From any spare way on a sub-distribution board, sized for the load.',
      'From the kitchen ring main, fused at 13 A.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5839-1:2025 clause 19 (Power supplies — consolidated 2025) is unambiguous. The primary supply is a DEDICATED final circuit taken from the origin. Sharing the circuit with other loads exposes the fire alarm to operations that have nothing to do with the fire alarm — a tripped MCB on a kitchen socket should never silence the CIE.',
  },
  {
    id: 'fam4-s1-isolator',
    question:
      'The lockable isolator at the consumer unit serving the fire alarm primary supply must be labelled with which exact wording?',
    options: [
      '"Fire alarm — caution".',
      '"FIRE ALARM SYSTEM — DO NOT SWITCH OFF" — the wording is mandated by BS 5839-1 and serves a dual purpose: it identifies the circuit so that maintenance personnel do not isolate it as part of routine work, and it makes the consequence of switching it off legally and operationally clear. The label must be permanent, legible, and visible on the lockable means of isolation.',
      '"Mains isolator — fire".',
      '"230 V AC supply — life safety".',
    ],
    correctIndex: 1,
    explanation:
      'The wording is prescribed because labelling discipline directly affects life safety. A label that merely says "fire alarm" invites a maintenance electrician to think it is a working label rather than a permanent identification. The "DO NOT SWITCH OFF" instruction prevents the most common cause of fire alarm power loss — accidental isolation during unrelated work.',
  },
  {
    id: 'fam4-s1-functional-earth',
    question:
      'Following BS 7671 Amendment 2:2022 (now consolidated in BS 7671:2018+A4:2026) and IEC 60445:2021, the FUNCTIONAL EARTH conductor in a fire alarm installation must be identified by which colour and alphanumeric mark?',
    options: [
      'Green-and-yellow with the mark "PE".',
      'Pink, with the alphanumeric designation "FE" — the change came in via BS 7671 Amendment 2:2022 incorporating IEC 60445:2021. The previous identification (cream) is superseded. BS 5839-1:2025 has reflected this change. Pink + "FE" identifies a functional earth conductor — used for noise / EMC / signalling reference — which is NOT a protective earth and must not be confused with the green-and-yellow circuit protective conductor.',
      'Cream — same as before, no change.',
      'Blue, with the mark "N".',
    ],
    correctIndex: 1,
    explanation:
      'The pink + "FE" identification is one of the most often-missed 2025 updates. Functional earth and protective earth do different jobs and must be visually distinct. Mixing the two identifications — colouring an FE conductor green-and-yellow, or terminating an FE wire onto the protective earth bar — creates a false earth path that can corrupt detection signalling or, worse, present as a CPC on test.',
  },
  {
    id: 'fam4-s1-cable-colour',
    question:
      'BS 5839-1:2025 has clarified the cable colour for fire alarm cabling. Which statement is correct?',
    options: [
      'Fire alarm cables may be any colour.',
      'All fire alarm cables AND the LV mains supply feeding the fire alarm system should be a single, common colour, with red being preferred. The 2025 clarification is that the rule extends to the dedicated 230 V AC mains feed, not just the detection / sounder circuits — so the entire electrical supply chain to the fire alarm reads as red, end-to-end, making misidentification on later works much harder.',
      'Detection circuits must be red, sounder circuits must be white.',
      'Mains cables must be grey, fire alarm circuits must be red.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5839-1:2025 clause 16 (Cabling, labelling and identification per the FIA Guide) makes the position explicit. A common red colour from the consumer unit through to every detection / sounder / interface circuit means a future electrician opening a void or trace cannot confuse fire alarm wiring with general low-voltage cabling. The previous edition was ambiguous about the mains feed colour; the 2025 standard removes the ambiguity.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Which of the following correctly describes the BS 5839-1:2025 primary power requirements for a fire detection and fire alarm system?',
    options: [
      'Any 230 V supply taken from a convenient socket on a ring circuit.',
      'A DEDICATED 230 V AC final circuit, taken from a point as close as practicable to the origin of the installation, protected by a circuit-breaker at the consumer unit, with a lockable means of isolation labelled "FIRE ALARM SYSTEM — DO NOT SWITCH OFF". No other loads on the circuit.',
      'A 12 V DC supply from a separate PSU.',
      'A 110 V AC reduced low-voltage supply from a transformer.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5839-1:2025 clause 19 sets out the dedicated final circuit, lockable isolation, prescribed labelling, and origin-point connection. All four elements are non-negotiable for a compliant primary supply.',
  },
  {
    id: 2,
    question:
      "Why does BS 5839-1:2025 require the primary supply to be taken from a point as close as practicable to the origin of the consumer's installation?",
    options: [
      'Cost.',
      'Because the further down the distribution chain the supply is taken, the more circuit-breakers, switches, isolators and joints there are between the supply and the fire alarm system — every one of which is a potential failure point or accidental-isolation point. A connection at the origin minimises the opportunities for accidental disconnection during maintenance of unrelated circuits.',
      'Easier to install.',
      'Lower voltage drop.',
    ],
    correctAnswer: 1,
    explanation:
      'The reasoning is reliability through architectural simplicity. Each upstream device that can isolate the circuit is a failure mode. Taking the supply from the origin makes the chain as short as it can be.',
  },
  {
    id: 3,
    question:
      'BS 5839-1:2025 cross-references BS 7671:2018+A4:2026 Section 560 (Safety services) for the fire alarm supply. What does Section 560 mandate that is relevant to the fire alarm circuit?',
    options: [
      'Coloured wiring only.',
      'Safety services, including fire detection and fire alarm systems, are to be provided by an electrical supply that is independent of the normal electrical supply or that is protected such that fire affecting the normal supply does not also disable the safety service. Section 560 also covers cable selection (fire-resistant), supply protection coordination, and the segregation requirements that prevent a fault on a non-safety circuit from de-energising a safety circuit.',
      'A maximum cable length of 10 metres.',
      'RCD protection at 30 mA for all safety circuits.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 7671 Section 560 sets the wiring-regulations envelope for safety-services circuits. BS 5839-1 sits inside that envelope — the fire alarm primary supply is a Section 560 safety service, and the dedicated-circuit, fire-resistant-cable, lockable-isolation rules of BS 5839-1 align with the BS 7671 framework.',
  },
  {
    id: 4,
    question:
      'A consumer unit protective device for a fire alarm primary supply has been specified by the CIE manufacturer. The installer fits a higher-rated MCB "to give some margin". Why is this wrong?',
    options: [
      'It is not wrong.',
      "The protective device rating is set by the CIE manufacturer based on the design of the equipment's primary supply path: internal fusing, transformer ratings, surge protection. Fitting a HIGHER-rated MCB defeats the manufacturer's upstream protection coordination. A fault inside the CIE that the manufacturer expected to be cleared by a 6 A MCB will not be cleared promptly by a 16 A MCB; damage spreads further, and the fire alarm may stop functioning long before the upstream protection trips.",
      'It is wrong because of cost.',
      'It is wrong because of cable size only.',
    ],
    correctAnswer: 1,
    explanation:
      "Protective device ratings are a coordination decision, not a single-component decision. The MCB at the consumer unit must coordinate with the protection inside the CIE. The manufacturer's specification is the engineering envelope.",
  },
  {
    id: 5,
    question:
      'A typical fire alarm CIE primary supply is fed via a small 6 A MCB at the consumer unit. The installer queries why the standby battery — capable of sourcing many amps in alarm — is being fed through such a small protective device. The correct explanation is...?',
    options: [
      'The MCB is wrong.',
      "The MCB protects the 230 V AC mains feed to the CIE, NOT the battery. The battery is downstream of the CIE's internal charging / inverter circuitry. In normal operation the mains feed only needs to power the CIE's standby load and the battery charger — typically well under 1 A. In alarm, current is drawn primarily from the BATTERY, not the mains. The 6 A MCB is therefore correctly sized for what it actually has to deliver: standby load + charger inrush.",
      'The battery should be removed.',
      'A 32 A MCB should be used.',
    ],
    correctAnswer: 1,
    explanation:
      "Understanding the current paths in standby vs alarm is fundamental to fire alarm design. The mains MCB never sees the alarm current — that comes from the battery, through the CIE's internal switching, to the alarm circuits. The mains supply only has to keep the standby load running and keep the battery charged.",
  },
  {
    id: 6,
    question:
      "BS 5839-1:2025 has consolidated the previous 2017 edition's separate clauses (clauses 25 and 29 in the 2017 edition) into a single clause on power supplies. Why does this matter to the installer?",
    options: [
      'Easier to find.',
      'Easier to find — but more importantly, it ENDS the previous structural ambiguity. The 2017 edition split mains-supply rules between two clauses (general installation and isolation), which sometimes produced apparent contradictions or gaps depending on which clause an inspector happened to read first. Consolidation into a single clause removes that ambiguity and gives one definitive set of rules, in one place, for the primary supply.',
      'Number of pages.',
      'Less text.',
    ],
    correctAnswer: 1,
    explanation:
      'Standards consolidation is rarely cosmetic. The 2025 single-clause structure for power supplies eliminates the cross-referencing problem the 2017 edition produced and should be the first thing referenced when designing or auditing a primary supply.',
  },
  {
    id: 7,
    question:
      'On a fire alarm installation the inspector finds the primary supply taken from a 13 A fused spur off the kitchen ring final circuit. The fused spur has been labelled "Fire alarm — do not switch off". What is the correct verdict?',
    options: [
      'Compliant — labelling is in place.',
      'NON-COMPLIANT. Labelling does not redeem an architectural defect. Sharing a fire alarm supply with a kitchen ring exposes the system to every kettle, fridge, microwave and dishwasher fault on that ring; an MCB trip from the kitchen will silence the fire alarm. BS 5839-1:2025 demands a DEDICATED final circuit. The remedy is to install a new dedicated MCB at the consumer unit, run a new dedicated circuit to the CIE, and decommission the spur.',
      'Compliant — fused spur counts as dedicated.',
      'Compliant — kitchen rings are robust.',
    ],
    correctAnswer: 1,
    explanation:
      'A "fused spur off a ring" is the most common non-compliance pattern on legacy installations. The label is correct; the architecture is wrong. Architectural compliance is the controlling test, not labelling.',
  },
  {
    id: 8,
    question:
      'Which statement most accurately captures the BS 5839-1:2025 cable-colour position for fire alarm wiring?',
    options: [
      'Any colour is acceptable provided cables are labelled at the ends.',
      'A SINGLE COMMON COLOUR for all fire alarm cabling AND for the dedicated low-voltage mains supply, with red being preferred. The 2025 clarification is that the colour rule applies end-to-end, including the 230 V mains feed from the consumer unit to the CIE — not just the extra-low-voltage detection / sounder circuits. End-to-end colour discipline reduces the chance of misidentification during later works in voids and risers.',
      'Detection circuits must be red, sounder circuits must be white.',
      'Cables must be unmarked.',
    ],
    correctAnswer: 1,
    explanation:
      'The 2025 standard treats the colour identification as a system-wide property — every conductor that exists to support fire detection and fire alarm operation, including its primary mains feed, is the same colour, and that colour is preferentially red.',
  },
  {
    id: 9,
    question:
      'The fire alarm primary supply must include "lockable means of isolation". What does that requirement imply for the device chosen at the consumer unit?',
    options: [
      'Any switch with a label.',
      'A means of isolation that can be secured in the OFF position by a lock — typically a lockable circuit-breaker, a lockable isolator, or a circuit-breaker fitted with a proprietary lock-off device. The lock prevents inadvertent re-energisation during maintenance, AND prevents unauthorised isolation. Both directions of locking matter: locking off (during fault repair on the fire alarm itself) and locking on (preventing nuisance isolation by unauthorised persons).',
      'A keyswitch on the CIE.',
      'A padlocked door on the consumer unit.',
    ],
    correctAnswer: 1,
    explanation:
      'Lockable isolation is a specific electrical concept: the device itself has a means of being secured by a lock in either position. A general-purpose padlock on the consumer unit door is not a lockable means of isolation in the BS 5839-1 sense, because it does not lock the device itself.',
  },
  {
    id: 10,
    question:
      'The primary supply to the CIE is found, on inspection, to have NO functional earth connection at the CIE end, even though one is specified by the CIE manufacturer. The earth is present in the supply cable — pink with the "FE" mark — but is left disconnected at the CIE terminal. The likely consequences are...?',
    options: [
      'No consequence.',
      "The CIE is operating without its specified noise / EMC reference. Symptoms can include intermittent earth fault indications on monitored loops (because the loop monitoring relies on a stable reference), spurious detection-signal noise, increased false alarm risk, and on some designs corruption of digital communication on the addressable loop. The fix is to terminate the FE conductor onto the CIE's functional-earth terminal as the manufacturer specifies — and the inspector should also verify that the FE has not been mistakenly landed on the protective earth bar somewhere upstream.",
      'The CIE will not power on.',
      'Cosmetic only.',
    ],
    correctAnswer: 1,
    explanation:
      'Functional earth is a real engineering requirement, not a discretionary nicety. Modern addressable CIEs depend on it for stable signalling. A disconnected FE produces symptoms that can look like detection faults — the troubleshooting trail leads back to the FE termination, not the loop devices.',
  },
];

const FireAlarmModule4Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Primary power supplies | Fire Alarm Module 4.1 | Elec-Mate',
    description:
      'BS 5839-1:2025 clause 19 — dedicated 230 V AC final circuit, lockable isolation labelled "FIRE ALARM SYSTEM — DO NOT SWITCH OFF", origin-point connection, BS 7671 Section 560 cross-reference, 2025 cable colour rule (red preferred end-to-end), pink + "FE" functional earth (IEC 60445:2021 / BS 7671 A2:2022).',
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
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 1"
            title="Primary power supplies"
            description="BS 5839-1:2025 clause 19 — the dedicated 230 V AC final circuit, lockable isolation labelled to prescription, BS 7671:2018+A4:2026 Section 560 framework, the 2025 single-colour cable rule, and the new pink + FE functional-earth identification."
            tone="yellow"
          />

          <TLDR
            points={[
              'Primary supply is a DEDICATED 230 V AC final circuit. No other loads — no sockets, no lighting, no auxiliaries. Sharing the circuit defeats the architecture.',
              "Connection point: as close as practicable to the ORIGIN of the consumer's installation (the main switch / consumer unit). Origin-point connection minimises the upstream chain that can isolate the supply.",
              'Protective device: per the CIE MANUFACTURER\'s specification — typically a small MCB (6 A or 10 A). Do not "uprate for margin"; that defeats coordination with the CIE\'s internal protection.',
              'Lockable means of isolation at the consumer unit, labelled exactly: "FIRE ALARM SYSTEM — DO NOT SWITCH OFF". Permanent, legible, visible.',
              'BS 5839-1:2025 cross-references BS 7671:2018+A4:2026 Section 560 (safety services) — fire alarm circuits sit inside the BS 7671 safety-services framework.',
              '2025 cable colour: SINGLE COMMON COLOUR for all fire alarm cabling AND the LV mains feed, with RED preferred. Applies end-to-end, including the dedicated mains circuit.',
              'Functional earth (IEC 60445:2021 / BS 7671 A2:2022): identified by PINK + alphanumeric mark "FE". Replaces the previous cream identification. Reflected in BS 5839-1:2025.',
              'Power-supply rules consolidated in 2025 — one clause replaces the old split between 2017 clauses 25 and 29.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Specify the BS 5839-1:2025 primary supply as a dedicated 230 V AC final circuit taken from the origin of the installation, with no other loads',
              'Apply the BS 5839-1:2025 prescribed labelling for the lockable means of isolation: "FIRE ALARM SYSTEM — DO NOT SWITCH OFF"',
              "Coordinate the consumer-unit protective device with the CIE manufacturer's specification, and explain why uprating for margin defeats internal coordination",
              'Cross-reference BS 7671:2018+A4:2026 Section 560 (safety services) and place the BS 5839-1 fire alarm primary supply inside that framework',
              'Apply the BS 5839-1:2025 single-colour cable rule (red preferred) end-to-end, including the dedicated LV mains supply',
              'Identify the functional-earth conductor by PINK + "FE" per IEC 60445:2021 / BS 7671 A2:2022, and distinguish it from the green-and-yellow circuit protective conductor',
              'Diagnose the most common primary-supply non-compliance patterns: shared circuits, mis-rated protective devices, undocumented isolation, mis-identified functional earth',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The dedicated final circuit — what and why</ContentEyebrow>

          <ConceptBlock
            title="A dedicated circuit, not a shared circuit"
            plainEnglish="The fire alarm primary power supply is a final circuit that exists for one purpose only — feeding the fire alarm CIE. No sockets are connected to it. No lighting is connected to it. No auxiliary loads. The reasoning is simple: every additional load on the circuit introduces an additional way for the fire alarm to lose power. A faulty kettle that trips an MCB on a kitchen ring is acceptable; a faulty kettle that silences a CIE is not. Dedication of the circuit is an architectural protective measure, not a luxury."
            onSite="When you walk up to a CIE and trace the supply backwards, the cable should run cleanly from the CIE to the consumer unit and end at a protective device that serves nothing else. If the cable disappears into a junction box, an unidentified spur, or a final ring that also serves room loads, the architecture is wrong — fix the architecture, then worry about the labelling."
          >
            <p>The architecture in plain terms:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Origin-point connection.</strong> The dedicated MCB sits at the origin of
                the consumer&apos;s installation — the consumer unit, the main switch, the position
                that BS 7671 calls the origin. Taking the supply from any sub-distribution further
                downstream introduces additional protective devices, additional joints, and
                additional opportunities for isolation.
              </li>
              <li>
                <strong>Single load.</strong> The MCB feeds the CIE alone. Spurs to other equipment
                — door entry boxes, signage, even a "useful" socket for the engineer&apos;s laptop —
                are forbidden. Once a second load is on the circuit, the dedication is broken; the
                circuit is no longer a fire alarm circuit.
              </li>
              <li>
                <strong>Lockable means of isolation.</strong> The MCB itself is a lockable device,
                or is fitted with a proprietary lock-off accessory. Lockable means: the device can
                be secured in the OFF position by a lock to prevent inadvertent re-energisation
                during fault repair on the fire alarm. The lock applies to the device, not to the
                consumer-unit door — a padlock on a hinged cover does not satisfy the requirement.
              </li>
              <li>
                <strong>Prescribed labelling.</strong> The exact wording is "FIRE ALARM SYSTEM — DO
                NOT SWITCH OFF". The label is permanent (engraved or printed onto a durable
                substrate, not handwritten on a sticky note), legible (sized to be read at the
                consumer unit), and visible (located on or immediately adjacent to the lockable
                means of isolation, not hidden inside the consumer unit lid).
              </li>
            </ul>
            <p>
              Each of the four elements above is independent: you can have a dedicated circuit
              without a lockable isolator, or a labelled isolator that feeds a shared circuit, and
              the system is non-compliant in either direction. Compliance requires all four
              simultaneously.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 19 (Power supplies) — consolidated from 2017 clauses 25 and 29"
            clause={
              <>
                The mains power supply to the fire detection and fire alarm system should be derived
                from a dedicated final circuit, taken from a point as close as practicable to the
                origin of the consumer&apos;s low-voltage installation. The circuit should be
                protected by an overcurrent protective device, the rating of which should be in
                accordance with the recommendations of the equipment manufacturer. A means of
                isolation, capable of being secured in the OFF position by a lock, should be
                provided and labelled to indicate that the circuit serves the fire detection and
                fire alarm system and that it should not be switched off.
              </>
            }
            meaning="Five engineering rules in one paragraph: (1) dedicated final circuit, (2) origin connection, (3) overcurrent protection per manufacturer, (4) lockable isolation, (5) prescribed labelling. The 2025 consolidation puts what used to be split across clauses 25 and 29 of the 2017 edition into a single, definitive statement."
          />

          <ConceptBlock
            title="Why origin-point connection matters"
            plainEnglish="Every electrical device between the supply and the fire alarm is a potential failure point. A protective device that can trip. A switch that can be operated. A connection that can corrode. By taking the supply at the origin of the installation — directly from the main consumer unit — the chain between supply and CIE is as short as it can be. Each additional sub-board, isolator, or joint added to the chain adds a failure mode that did not previously exist."
          >
            <p>The architectural reasoning:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Failure modes scale with chain length.</strong> If the supply runs origin →
                CIE through one MCB, there is one trip risk. If it runs origin → sub-board → CIE
                through two MCBs and an isolator, there are three trip risks plus the joint
                reliability of the sub-board itself. The probability of any one of those failing
                rises with the count.
              </li>
              <li>
                <strong>Maintenance exposure.</strong> Anything that anyone might reasonably switch
                off during maintenance of unrelated work is an exposure. A circuit at a
                sub-distribution board sits in a context where maintenance of other circuits at that
                board may inadvertently isolate the fire alarm. A circuit at the origin sits in a
                context where the only person who would isolate it is the person specifically
                working on the fire alarm.
              </li>
              <li>
                <strong>Diagnostic clarity.</strong> When something goes wrong, a short supply chain
                makes the diagnosis fast. The CIE has lost mains: check one MCB, one cable, one
                connection. A long chain spreads the diagnostic search across multiple points and
                multiple boards.
              </li>
            </ul>
            <p>
              "As close as practicable to the origin" is not a target of perfection — there will
              always be installations where the consumer unit and the CIE are physically separated
              and an intermediate route is unavoidable. The principle is to minimise the chain, and
              to document any departures with a justified variation per BS 5839-1:2025 clause 6
              (Variations).
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Diagram — mains supply path */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Primary supply path — DNO origin to CIE
            </h4>
            <svg
              viewBox="0 0 860 460"
              className="w-full h-auto"
              role="img"
              aria-label="Block diagram of a fire alarm primary supply: DNO incomer, meter, main switch / origin, dedicated 6 A MCB at consumer unit with lockable isolator labelled FIRE ALARM SYSTEM DO NOT SWITCH OFF, fire-resistant red cable rising to CIE. Functional earth conductor shown in pink with FE label running alongside."
            >
              {/* DNO incomer */}
              <rect
                x="20"
                y="180"
                width="110"
                height="80"
                rx="8"
                fill="rgba(168,85,247,0.08)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="75"
                y="208"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                DNO incomer
              </text>
              <text x="75" y="225" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9.5">
                230 V AC
              </text>
              <text x="75" y="240" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                main fuse
              </text>

              {/* Meter */}
              <rect
                x="160"
                y="180"
                width="90"
                height="80"
                rx="8"
                fill="rgba(34,211,238,0.08)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text
                x="205"
                y="208"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                Meter
              </text>
              <text x="205" y="225" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                tariff
              </text>

              {/* Origin / main switch */}
              <rect
                x="280"
                y="160"
                width="160"
                height="120"
                rx="10"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="2"
              />
              <text
                x="360"
                y="184"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="12"
                fontWeight="bold"
              >
                Origin / consumer unit
              </text>
              <text x="360" y="201" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                main switch + busbar
              </text>
              {/* Dedicated MCB */}
              <rect
                x="300"
                y="218"
                width="120"
                height="50"
                rx="6"
                fill="rgba(239,68,68,0.10)"
                stroke="#EF4444"
                strokeWidth="1.6"
              />
              <text
                x="360"
                y="236"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                DEDICATED MCB
              </text>
              <text x="360" y="251" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                6 A · lockable
              </text>
              <text
                x="360"
                y="263"
                textAnchor="middle"
                fill="rgba(255,255,255,0.55)"
                fontSize="8.5"
              >
                per CIE manufacturer spec
              </text>

              {/* Label sticker */}
              <rect
                x="455"
                y="200"
                width="200"
                height="56"
                rx="6"
                fill="rgba(251,191,36,0.12)"
                stroke="#FBBF24"
                strokeWidth="1.4"
                strokeDasharray="3,3"
              />
              <text
                x="555"
                y="218"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                PRESCRIBED LABEL
              </text>
              <text
                x="555"
                y="234"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="9.5"
                fontWeight="bold"
              >
                FIRE ALARM SYSTEM
              </text>
              <text
                x="555"
                y="248"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="9.5"
                fontWeight="bold"
              >
                — DO NOT SWITCH OFF
              </text>

              {/* Connector arrows */}
              <line x1="130" y1="220" x2="160" y2="220" stroke="#A855F7" strokeWidth="2" />
              <line x1="250" y1="220" x2="280" y2="220" stroke="#22D3EE" strokeWidth="2" />
              <line
                x1="420"
                y1="243"
                x2="455"
                y2="228"
                stroke="#FBBF24"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />

              {/* Red fire alarm cable run */}
              <path
                d="M 420 243 Q 540 243 600 243 Q 700 243 720 280 L 720 360"
                stroke="#EF4444"
                strokeWidth="3"
                fill="none"
              />
              <text
                x="720"
                y="298"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                Red FR cable (L+N+CPC)
              </text>
              <text x="720" y="312" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                FP200 Gold / FP PLUS — red end-to-end
              </text>

              {/* Pink FE conductor */}
              <path
                d="M 425 250 Q 545 252 605 252 Q 705 252 725 285 L 725 360"
                stroke="#F472B6"
                strokeWidth="2"
                fill="none"
                strokeDasharray="6,3"
              />
              <text
                x="720"
                y="338"
                textAnchor="middle"
                fill="#F472B6"
                fontSize="10"
                fontWeight="bold"
              >
                FE pink (NEW 2025, was cream)
              </text>
              <text x="720" y="352" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                functional earth
              </text>

              {/* CIE */}
              <rect
                x="650"
                y="360"
                width="160"
                height="80"
                rx="10"
                fill="rgba(34,211,238,0.10)"
                stroke="#22D3EE"
                strokeWidth="2"
              />
              <text
                x="730"
                y="388"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="12"
                fontWeight="bold"
              >
                CIE
              </text>
              <text x="730" y="405" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9.5">
                Control &amp; Indicating
              </text>
              <text x="730" y="420" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                BS EN 54-2
              </text>

              {/* Bottom rule line — no shared loads */}
              <rect
                x="20"
                y="402"
                width="600"
                height="40"
                rx="8"
                fill="rgba(239,68,68,0.06)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1.4"
              />
              <text
                x="320"
                y="420"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                ✗ No other loads on this circuit
              </text>
              <text x="320" y="434" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Dedicated final circuit — fire alarm only
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>The lockable isolator and its labelling</ContentEyebrow>

          <ConceptBlock
            title="Why labelling discipline is a life-safety control"
            plainEnglish="The single most common cause of fire alarm power loss in service is not equipment failure — it is human action. Someone, doing something else, switches off the wrong MCB. The reason for the prescribed label wording is to remove the ambiguity that produces those mistakes. A label that says 'fire alarm — caution' invites a maintenance electrician to interpret 'caution' as 'be careful while you operate it'. A label that says 'FIRE ALARM SYSTEM — DO NOT SWITCH OFF' removes the interpretation entirely. The label is the engineering control."
          >
            <p>What the label has to be:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Exact wording.</strong> "FIRE ALARM SYSTEM — DO NOT SWITCH OFF". Not
                "Caution: fire alarm". Not "Do not isolate". Not "Life safety supply". The exact
                wording is what BS 5839-1:2025 prescribes; departing from it weakens the engineering
                control.
              </li>
              <li>
                <strong>Permanent.</strong> Engraved Traffolyte, printed onto a durable substrate
                with adhesive backing rated for the environment, or a similarly durable label.
                Handwritten on tape or paper does not survive the lifetime of the installation.
              </li>
              <li>
                <strong>Legible.</strong> Text size large enough to be read from working distance —
                an electrician at the consumer unit door, a fire-risk assessor doing a survey, a
                layperson doing a routine check. Tiny print defeats the purpose.
              </li>
              <li>
                <strong>Visible.</strong> Located on or immediately adjacent to the lockable means
                of isolation — typically the face of the MCB, or the trim around it. A label hidden
                inside the consumer-unit lid only works if someone opens the lid; the label must be
                visible without opening the lid.
              </li>
            </ul>
            <p>
              On a cluttered consumer unit with many circuits, the fire alarm circuit&apos;s label
              should stand out. Some installations colour-code the trim around the MCB (e.g. red
              trim), some use a yellow safety-services background — these are reinforcements, not
              substitutes for the prescribed wording.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 19 (Lockable means of isolation)"
            clause={
              <>
                A means of isolation that can be secured in the OFF position by a lock should be
                provided in the dedicated final circuit. The means of isolation should be
                permanently labelled to indicate that the circuit serves the fire detection and fire
                alarm system, and that it should not be switched off. The label should be clearly
                visible adjacent to the means of isolation.
              </>
            }
            meaning="Two separate engineering controls: the lockable function (physical inability to re-energise during repair), and the labelled function (informational deterrent against accidental isolation). Both are required. Either alone is insufficient."
          />

          <ConceptBlock
            title="Lockable in the OFF position — what does that actually mean"
            plainEnglish="A lockable means of isolation is a device that has a built-in mechanism — or accepts a proprietary accessory — by which the device can be physically prevented from being moved out of the OFF position by means of a padlock. It is NOT a padlock on the consumer unit door. It is a lock on the device itself."
          >
            <p>The recognised forms:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Lockable circuit-breaker.</strong> An MCB designed with an integral lock-off
                mechanism — typically a sliding tab or a hole that accepts a small padlock. The MCB
                itself, once switched off, can have the padlock fitted; the MCB cannot then be
                switched on without removing the padlock.
              </li>
              <li>
                <strong>Lock-off accessory on a standard MCB.</strong> A proprietary clip-on device
                designed for a specific MCB type. Once switched off, the accessory is fitted and
                padlocked. Manufacturer-specific; the wrong accessory on the wrong MCB does not
                lock.
              </li>
              <li>
                <strong>Lockable isolator.</strong> A separate isolator (rotary or knife-blade type)
                with a built-in lock-off mechanism, fitted in the dedicated final circuit upstream
                of the protective device or as the protective device itself.
              </li>
            </ul>
            <p>
              The correct compliance pattern: at the consumer unit, the dedicated MCB is itself
              lockable (or fitted with the manufacturer&apos;s lock-off accessory), AND it carries
              the prescribed label, AND it serves no other load. A padlocked consumer-unit door does
              not meet the requirement because the circuit-breaker itself remains free to operate
              (the door simply prevents access).
            </p>
          </ConceptBlock>

          <Scenario
            title="The shared-circuit non-compliance"
            situation="A small commercial premises has a fire alarm CIE in the back office. The mains supply enters the CIE from a 13 A fused spur, which is itself fused down from a kitchen ring final circuit. The fused spur carries a label reading 'Fire alarm — do not switch off'. The kitchen ring also serves a fridge, a microwave and a kettle. The system has been operating for three years."
            whatToDo="The architecture is non-compliant. Labelling does not cure architectural defects. The remedy: install a NEW dedicated MCB at the consumer unit (size per the CIE manufacturer specification), fitted with a lock-off mechanism and the prescribed BS 5839-1:2025 label; run a new red FR cable directly from that MCB to the CIE; re-terminate the supply at the CIE; decommission the fused spur. Document the change as a system modification in line with BS 5839-1:2025 Section 7 (Extensions and modifications), and produce a modification certificate."
            whyItMatters="A microwave failure that draws fault current through the ring will trip the kitchen ring MCB. With the fire alarm sharing that ring, the CIE loses its mains supply when the microwave failed — an unrelated event has silenced the fire alarm. The standby battery will hold the system up for the standby duration, but if the kitchen MCB is not reset (because nobody knows the fire alarm is on it), the battery will eventually deplete and the system will fail. The architectural defect is what enables the failure mode; the labelling is irrelevant once the failure path is open."
          />

          <CommonMistake
            title="Uprating the consumer-unit MCB beyond the CIE manufacturer specification"
            whatHappens="The CIE manufacturer specifies a 6 A MCB at the consumer unit. The installer reasons: 'The cable is 1.5 mm², the run is short, a 16 A MCB will give us margin and prevent nuisance trips on charger inrush.' The 16 A MCB is fitted. Months later, an internal fault in the CIE — a partial short on the mains transformer — draws around 8 A continuously. The 16 A MCB does not trip. The fault current heats the transformer and surrounding components; insulation degrades; eventually a more catastrophic short produces a fire condition inside the CIE itself."
            doInstead="The protective device rating is set by the manufacturer for protection coordination — the upstream MCB is sized to clear faults the CIE's own internal fusing cannot clear. Uprating that MCB removes the upstream protection and leaves only the internal protection, which may not be sized to clear all fault paths. Fit the rating the manufacturer specifies. If nuisance trips are happening, investigate the cause (charger inrush characteristic, mis-specified MCB type — typically Type C is correct for fire alarm CIEs); do not fix nuisance trips by uprating."
          />

          <CommonMistake
            title="Hidden or handwritten labelling on the lockable isolator"
            whatHappens="The dedicated MCB has been installed correctly and is lockable. The label is a strip of insulation tape with 'FA — do not switch off' written in marker pen. Six months later the tape has dried out and fallen off; the MCB now has no identification. A maintenance electrician unfamiliar with the installation switches it off as part of fault-finding on a different circuit — the fire alarm is silenced. The system is also non-compliant on inspection."
            doInstead="The prescribed wording on a permanent label, fitted to the device or its trim. Engraved Traffolyte, laser-etched plastic, or a printed adhesive label rated for the environment. The label is part of the protective measure, not a finishing touch. If the label is missing or damaged, the system is non-compliant until it is replaced."
          />

          <SectionRule />

          <ContentEyebrow>
            BS 7671:2018+A4:2026 Section 560 — the safety-services framework
          </ContentEyebrow>

          <ConceptBlock
            title="Where the BS 5839 supply sits inside BS 7671"
            plainEnglish="BS 5839-1 is the code of practice for fire detection and fire alarm systems. BS 7671 is the wiring regulations. The fire alarm supply must comply with BOTH — BS 5839-1 sets the system-level rules (dedicated circuit, labelling, manufacturer protection), BS 7671 sets the installation-level rules (cable selection, segregation, supply protection coordination, earthing). Section 560 of BS 7671 is the part that deals specifically with safety services, of which a fire detection and fire alarm system is one example."
          >
            <p>What Section 560 contributes:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Independence of supply.</strong> Safety services are to be provided by a
                supply that is independent of the normal supply, OR by a supply protected such that
                fire affecting the normal supply does not also disable the safety service. For fire
                alarm, this is normally satisfied by the dedicated final circuit with fire-resistant
                cabling.
              </li>
              <li>
                <strong>Cable selection.</strong> Section 560 directs that wiring of safety services
                be of such construction or installation that fire and impact will not significantly
                affect operation. BS 5839-1 narrows this to specific cable categories —
                fire-resistant cable to BS EN 50200 with PH classification, see §3 of this module —
                and BS 8519 provides the broader code of practice for fire-resistant power and
                control cable systems.
              </li>
              <li>
                <strong>Protection coordination.</strong> Section 560 requires that the protection
                of the safety-services supply not be compromised by faults on other circuits. This
                aligns with the BS 5839-1 dedicated-circuit principle — an unrelated circuit cannot
                trip the safety-services supply.
              </li>
              <li>
                <strong>Switchgear identification.</strong> Section 560 requires the means of
                isolation of safety-services supplies to be clearly identified. BS 5839-1 narrows
                this to the prescribed label wording.
              </li>
            </ul>
            <p>
              The two standards interlock: BS 7671 provides the installation framework, BS 5839-1
              provides the system-specific tightening. The 2025 fire alarm standard is fully
              consistent with the 2026 wiring regulations amendment; no contradictions exist between
              the two for the primary supply.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Section 560 (Safety services)"
            clause={
              <>
                The supply for safety services shall be capable of operating during the period
                required, even when the normal supply has failed. The means of isolation of safety
                services shall be clearly identified. The wiring of safety services shall be of such
                construction or installation that fire and impact, and the failure of any other
                circuit, will not significantly affect their operation. The supply for safety
                services shall not be unintentionally interrupted by the operation of a protective
                device of another circuit.
              </>
            }
            meaning="Section 560 is the wiring-regulations envelope. The fire alarm primary supply lives inside it. The 'shall not be unintentionally interrupted by the operation of a protective device of another circuit' clause is the BS 7671 statement of what BS 5839-1 calls the dedicated-circuit principle. Two standards, one engineering control."
          />

          <SectionRule />

          <ContentEyebrow>The 2025 cable colour clarification</ContentEyebrow>

          <ConceptBlock
            title="Single common colour, end-to-end, red preferred"
            plainEnglish="Before the 2025 revision, the cable colour rule for fire alarm wiring was clear at the system level — fire-resistant cables in a recognisable colour, almost universally red — but ambiguous about the 230 V mains feed. Some installers ran the dedicated final circuit in standard 6242Y twin-and-earth (grey) up to the CIE and only switched to red FR cable downstream. The 2025 standard has closed the gap: the cable colour rule applies to the entire electrical supply chain to the fire alarm, including the LV mains feed."
          >
            <p>What the 2025 rule means for the installer:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>The mains feed is red.</strong> The dedicated final circuit from the
                consumer unit MCB to the CIE input terminals is a red fire-resistant cable —
                typically FP200 Gold or equivalent — not a grey twin-and-earth.
              </li>
              <li>
                <strong>Detection and sounder circuits are red.</strong> Already universal practice;
                the 2025 rule confirms it explicitly.
              </li>
              <li>
                <strong>Interface and ancillary circuits are red.</strong> Anything that exists to
                support fire alarm operation — door-closer interfaces, AOV interfaces, plant-shut
                signals — is in the same red colour.
              </li>
              <li>
                <strong>End-to-end discipline.</strong> The benefit is that a future electrician
                opening a void or a riser cannot misidentify a fire alarm cable as a general LV
                cable. Mistaken disconnection during unrelated work is the most common non-equipment
                failure mode in service; end-to-end colour discipline is one of the cheapest
                engineering controls available to prevent it.
              </li>
            </ul>
            <p>
              The standard says "red being preferred" — leaving room for installations where an
              alternative colour is locally established (some health-service estates, for example,
              have historic alternative conventions). The principle to apply is: a SINGLE colour,
              consistent across the whole installation, distinct from general LV cabling. Where red
              is used, all fire alarm cabling is red; where an alternative is used, all fire alarm
              cabling is that alternative.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 16 (Cabling, labelling and identification) per FIA Guide"
            clause={
              <>
                All fire alarm cables, and the low-voltage mains supply to the fire detection and
                fire alarm system, should be of a single common colour. The colour red is preferred.
                The intention is to enable identification of fire alarm cabling throughout the
                installation, including the mains feed from the origin of the consumer&apos;s
                installation to the control and indicating equipment.
              </>
            }
            meaning="The 2025 clarification extends the single-colour rule from the fire alarm circuits proper to include the dedicated mains feed. End-to-end red is the practical implementation. The 2017 ambiguity over the mains feed colour is removed."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Functional earth — the new pink + FE identification</ContentEyebrow>

          <ConceptBlock
            title="Functional earth is not protective earth"
            plainEnglish="A protective earth (the green-and-yellow conductor) exists to provide a path for fault current — to clear an earth fault by tripping the protective device. A functional earth exists to provide a stable reference for signalling, EMC filtering, or ground-loop noise rejection. The two conductors do completely different jobs and must be visually distinct. Confusing them — running an FE conductor in green-and-yellow, or terminating an FE wire onto the protective earth bar — corrupts the engineering and can mask faults."
          >
            <p>
              The 2025 identification, per IEC 60445:2021 / BS 7671 Amendment 2:2022 (now
              consolidated in BS 7671:2018+A4:2026):
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Colour: pink.</strong> Replaces the previous cream identification. Pink is a
                deliberate choice — distinct from green-and-yellow (PE), distinct from blue (N),
                distinct from brown (L), and distinct from the universal-grey of older
                installations.
              </li>
              <li>
                <strong>Alphanumeric mark: "FE".</strong> Marked on the conductor sleeve, sleeving
                ferrule, or termination identifier. The "FE" mark removes any residual ambiguity — a
                pink conductor with FE marked is unambiguously a functional earth.
              </li>
              <li>
                <strong>BS 5839-1:2025 reflects the change.</strong> The fire alarm standard follows
                the wiring regulations identification. A functional-earth conductor in a fire alarm
                installation built or modified after the relevant date is to be identified as pink +
                FE.
              </li>
              <li>
                <strong>Existing installations.</strong> The change is not retrospective in the
                sense that compliant cream-identified installations from before A2:2022 do not
                automatically become non-compliant. But ANY new work, modification, or extension
                applies the new identification — see BS 5839-1:2025 Section 7 (Extensions and
                modifications) for how the rule applies to additions to existing systems.
              </li>
            </ul>
            <p>
              The CIE manufacturer&apos;s installation manual will indicate whether the equipment
              requires a functional-earth connection and how the FE terminal is labelled. Modern
              addressable CIEs typically do require FE for stable digital communication on the
              addressable loop. Conventional CIEs often do not. Read the manual; do not assume one
              way or the other.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 (incorporating Amendment 2:2022 and IEC 60445:2021) · Conductor identification"
            clause={
              <>
                A functional earth conductor shall be identified by the colour pink. Where the
                identification is by colour alone, the colour shall be applied to the entire length
                of the conductor or to a sleeve at each termination. The alphanumeric designation FE
                may be used in addition to the colour to provide further identification. This
                identification is distinct from that of the protective earth conductor
                (green-and-yellow).
              </>
            }
            meaning="Pink + FE for functional earth, green-and-yellow for protective earth. The two are visually distinct and electrically distinct. BS 5839-1:2025 has aligned with this rule. A pre-2022 cream-identified FE conductor in an existing installation is not retroactively non-compliant, but any new or modified work uses the new identification."
          />

          <ConceptBlock
            title="Why the change matters in practice"
            plainEnglish="If you walk up to a fire alarm CIE and find a green-and-yellow conductor on the FE terminal, what is on that terminal? Is it actually the protective earth, in which case it is on the wrong terminal? Or is it an FE conductor that has been wrongly identified as PE? You cannot tell without tracing it. The 2022 identification change makes the visual signal unambiguous: pink = functional earth, green-and-yellow = protective earth. No tracing required to identify which is which."
          >
            <p>The fault-finding implications:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>FE on PE bar.</strong> A common legacy mistake is to land the
                functional-earth conductor onto the protective-earth bar at the consumer unit. The
                two earths are now electrically connected. Any potential difference between FE and
                PE that the CIE was designed to filter out is now imposed onto the protective earth.
                Symptoms include earth-fault indications on the loop that come and go, false alarms
                triggered by mains transients, and corrupted addressable communication.
              </li>
              <li>
                <strong>PE on FE terminal.</strong> The reverse: the protective earth has been
                landed on the FE terminal of the CIE. The CIE&apos;s safety earth is now sitting on
                the functional-earth path, which is not designed to carry fault current. An earth
                fault inside the CIE may not clear promptly because the FE path impedance is too
                high for ADS to operate.
              </li>
              <li>
                <strong>Identification trail.</strong> When the conductor colours are correct and
                consistent — pink for FE, green-and-yellow for PE — these mistakes are visible at
                inspection. When the colours are wrong or inconsistent, they are invisible until
                they cause a symptom.
              </li>
            </ul>
            <p>
              Pink + FE is one of the smallest 2025 changes by word count, and one of the most
              significant in field consequences. Apply it on every new installation, every
              extension, and every modification.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Protection coordination — the manufacturer specification</ContentEyebrow>

          <ConceptBlock
            title="Why the CIE manufacturer specifies the upstream MCB rating"
            plainEnglish="Inside the CIE there is internal fusing — typically a small mains fuse on the primary side of the transformer, plus secondary fusing on the DC rails. The internal fusing is sized for the CIE's normal operating envelope and for fault clearance up to a defined limit. Beyond that limit, fault clearance has to come from the upstream MCB at the consumer unit. The manufacturer specifies the MCB rating because they have done the engineering work to determine where the boundary is between internal and external clearance. Fitting a different rating moves the boundary, often without the installer realising the consequence."
          >
            <p>The coordination logic:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Normal operation.</strong> Standby load + battery charger demand is
                typically well under 1 A. The mains supply runs at low load most of the time.
              </li>
              <li>
                <strong>Charger inrush.</strong> When the standby battery has been deeply discharged
                and is being recharged, the charger may draw up to its rated peak — often 1.5 to 2 A
                on a small system, more on larger systems. The MCB must carry the inrush without
                tripping on a Type B characteristic; Type C is the typical specification.
              </li>
              <li>
                <strong>Internal fault — small.</strong> A minor short or partial short on a low-
                voltage rail inside the CIE is cleared by the internal fusing. The upstream MCB does
                not see it.
              </li>
              <li>
                <strong>Internal fault — large.</strong> A short on the primary side of the
                transformer, or a fault that bypasses the internal fusing, draws fault current
                directly from the mains. The upstream MCB has to clear it. The MCB rating must be
                LOW ENOUGH that this fault is detected and cleared, AND the MCB type must be FAST
                ENOUGH that the prospective fault current produces an instantaneous trip.
              </li>
            </ul>
            <p>
              Uprating the MCB beyond the manufacturer&apos;s specification raises the threshold for
              instantaneous trip and may leave a fault that should have cleared at the consumer unit
              instead heating components inside the CIE until something else fails. Always fit the
              rating the manufacturer specifies; if nuisance trips are happening, investigate type /
              characteristic / inrush rather than uprate.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 19 (Overcurrent protective device rating)"
            clause={
              <>
                The dedicated final circuit serving the fire detection and fire alarm system should
                be protected by an overcurrent protective device of a type and rating recommended by
                the manufacturer of the control and indicating equipment. The rating should not be
                modified without consultation with the equipment manufacturer.
              </>
            }
            meaning="The MCB rating is a manufacturer-controlled engineering parameter. The standard explicitly defers to the manufacturer's specification because the protection coordination cannot be determined without knowing the internal fusing arrangement of the CIE. Any departure is a design change and needs manufacturer engagement."
          />

          <Scenario
            title="The functional-earth diagnostic"
            situation="An addressable fire alarm system has been generating intermittent earth-fault indications on its main loop for several weeks. The fault is reported on the CIE, clears within an hour, and re-appears later. Detection still works; sounders still work; but the system is logging earth faults at a rate of several per day. The maintenance team has tested the loop with a megohmmeter (devices removed) and found 200 MΩ to earth — well above the threshold. The intermittent fault is not on the loop itself."
            whatToDo="Trace the functional-earth conductor from the CIE FE terminal back to its termination at the consumer unit. Verify that the FE conductor is pink + FE-marked, that it is landed on a dedicated FE bar (or the manufacturer-specified FE point), and that it is NOT landed on the protective earth bar. If FE has been landed on PE, separate the two. Verify that the PE conductor itself is intact and at the correct termination. After correction, monitor the system for 48 hours; intermittent earth-fault indications should disappear."
            whyItMatters="The CIE's loop monitoring uses the FE as the reference for earth-fault detection. If the FE has been imposed on the PE, every transient on the protective earth is interpreted by the CIE as a loop-to-earth event. Most of the time the transient is below threshold and clears, producing the on/off fault pattern. The diagnostic trail leads to the FE termination, not the loop. The 2022 identification change makes this kind of diagnostic faster — pink + FE is unambiguous; cream-on-PE-bar is ambiguous and requires tracing."
          />

          <CommonMistake
            title="Cream-identified FE conductor in a 2026 installation"
            whatHappens="An installer is adding a fire alarm system in 2026 and uses cream-sleeved cores from old stock for the functional-earth runs because 'that's what the standard used to specify'. On inspection, the conductors are flagged as non-compliant with the current identification rule. The installer argues that the equipment works correctly and the colour is harmless. The inspector points out that the identification is a permanent property of the installation; future maintenance personnel arriving in 2030 will not know that cream meant FE in this specific installation, and may misidentify the conductor as PE."
            doInstead="Use pink + FE marking on every new installation, extension, or modification from the date BS 7671 Amendment 2:2022 became effective. Existing pre-2022 installations with correctly cream-identified FE conductors are not retroactively non-compliant — they were compliant when built — but any new work uses the current identification. Old stock that does not meet the current identification rule is not used for new work."
          />

          <CommonMistake
            title="Treating the FE terminal as 'just another earth'"
            whatHappens="The CIE manufacturer specifies a separate FE terminal. The installer, not understanding the distinction, links the FE terminal to the PE terminal inside the CIE with a short jumper wire. The installer reasons: 'They're both earths, this saves running an FE conductor.' The CIE now has its functional earth and its protective earth bonded together at a single point; there is no separation. EMC noise that the FE was designed to filter is now coupled into the PE; protective-earth currents that the PE was designed to carry are now coupled into the FE. Symptoms include intermittent loop earth-fault reports and corrupted addressable communication."
            doInstead="Run a SEPARATE pink + FE conductor from the consumer unit (or from the CIE manufacturer's specified FE point) to the FE terminal of the CIE. The PE conductor (green-and-yellow) is independent and runs to the PE terminal. The two conductors are NEVER linked at the CIE end. Some installations bond FE and PE at a single, controlled point upstream — that is a manufacturer-specific design choice, made in writing by the equipment manufacturer; it is not an installer-level decision."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'DEDICATED 230 V AC final circuit — no other loads. Sharing the circuit defeats the architecture; labelling does not redeem it.',
              "Connection point: at the ORIGIN of the consumer's installation (main switch / consumer unit). Origin connection minimises the upstream chain.",
              'Protective device rating: per the CIE manufacturer specification. Do NOT uprate "for margin" — that defeats internal protection coordination.',
              'Lockable means of isolation: a device that can be SECURED IN OFF by a lock. Padlock on the consumer-unit door does not count.',
              'Prescribed label: "FIRE ALARM SYSTEM — DO NOT SWITCH OFF". Permanent, legible, visible. Not "fire alarm — caution"; not handwritten on tape.',
              'BS 7671:2018+A4:2026 Section 560 (safety services) is the wiring-regulations envelope. BS 5839-1 sits inside it; both apply.',
              '2025 cable colour: SINGLE common colour, end-to-end, RED preferred. Includes the dedicated mains feed — not just the detection / sounder circuits.',
              'Functional earth: PINK + alphanumeric "FE" (IEC 60445:2021 / BS 7671 A2:2022). Distinct from PE green-and-yellow. Never linked to PE at the CIE end.',
              'Power supply rules consolidated 2025 — single clause replaces the old split between 2017 clauses 25 and 29.',
              'Architectural compliance is the controlling test. Every element above is independent; all four must be present simultaneously for a compliant primary supply.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Can the fire alarm primary supply be taken from a sub-distribution board rather than the main consumer unit?',
                answer:
                  'In principle no — the standard is "as close as practicable to the origin of the consumer\'s installation". Where a sub-board is genuinely the only practicable connection point, the design must justify it as a variation per BS 5839-1:2025 clause 6. The justification has to address why the chain length cannot be reduced, and the variation has to be recorded in the system logbook. Sub-board connection adds upstream isolation points and weakens the architecture; it should be a last resort, not a default.',
              },
              {
                question:
                  'What rating MCB do I need at the consumer unit for a small fire alarm CIE?',
                answer:
                  'Whatever the CIE manufacturer specifies — typically 6 A or 10 A on a small conventional system, sometimes higher on larger addressable systems with significant charger inrush. Read the CIE installation manual; the manufacturer will state the required type (typically Type C) and rating. Do not uprate beyond the specification, because the rating is part of the protection coordination with internal CIE fusing.',
              },
              {
                question:
                  'The exact label wording — "FIRE ALARM SYSTEM — DO NOT SWITCH OFF" — feels prescriptive. Can I use a near-equivalent like "Caution: fire alarm — do not isolate"?',
                answer:
                  'Use the exact wording. The standard is prescriptive because departures from the wording weaken the engineering control. "Caution: fire alarm" invites interpretation as a warning to be careful, not as an instruction not to switch off. The "DO NOT SWITCH OFF" wording removes the interpretation. Stick to the prescription.',
              },
              {
                question: 'Does the dedicated final circuit need RCD protection?',
                answer:
                  'BS 5839-1 advises that RCD protection on the fire alarm primary supply should be avoided where reasonably practicable, because the RCD itself becomes an additional failure mode that can interrupt the supply. Where local conditions or BS 7671 requirements mandate RCD protection (e.g. cable routes through specific zones, or where the installation arrangement otherwise requires it), the RCD should be of a type that does not nuisance-trip and should be coordinated with the supply protection. The exact requirement depends on the installation context; consult both BS 5839-1 and BS 7671 Section 560 for the controlling rules.',
              },
              {
                question:
                  'Can I run the dedicated mains feed in standard grey twin-and-earth as long as the detection circuits are in red FR cable?',
                answer:
                  'No — the 2025 standard extends the cable colour rule to the LV mains feed. The dedicated final circuit from the consumer unit MCB to the CIE input is in the same single colour (red preferred) as the rest of the fire alarm cabling. The fire-resistance grade of the mains feed cable is determined by BS 5839-1 / BS 7671 Section 560 — typically the same fire-resistant grade as the detection circuits. End-to-end colour discipline is the 2025 clarification; embrace it.',
              },
              {
                question:
                  'What is the difference between functional earth and protective earth, in practical terms?',
                answer:
                  'Protective earth (green-and-yellow) provides a path for FAULT CURRENT — its job is to carry the current produced by an earth fault until the protective device clears the fault. Functional earth (pink + FE) provides a stable signal reference — its job is to give electronic equipment a known low-impedance reference point for noise rejection, EMC filtering, and signal integrity. They do completely different jobs and must remain electrically and visually distinct in the installation. Linking them at the equipment end imposes either function on the wrong conductor.',
              },
              {
                question:
                  'My existing installation has cream-identified functional-earth conductors. Do I have to re-cable to pink?',
                answer:
                  'No — the change is not retrospective. An installation that was correctly cream-identified when it was built is not made non-compliant by the 2022 amendment. But ANY new work — extensions, modifications, replacement of a length of cable — applies the new pink + FE identification. Mixed installations (some old cream, some new pink) need clear documentation in the system logbook and on as-built drawings so future maintenance personnel can identify the conductors correctly.',
              },
              {
                question: 'Where does the FE conductor terminate at the consumer-unit end?',
                answer:
                  "On a dedicated functional-earth bar or termination point, NOT on the protective-earth bar. Some CIE manufacturers specify a single-point bond between FE and PE at a controlled location; if so, that controlled point is documented in the manufacturer's installation manual and is part of the design. In the absence of such a specification, FE and PE remain separate end-to-end and are connected only via the equipment's internal architecture, where the manufacturer has engineered the relationship.",
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Primary power supplies — Module 4.1" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-4/section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.2 Secondary power and battery sizing
              </div>
            </button>
          </div>

          <div className="hidden">
            <Zap />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule4Section1;
