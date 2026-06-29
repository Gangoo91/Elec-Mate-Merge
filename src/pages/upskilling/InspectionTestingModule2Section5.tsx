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

const quizQuestions = [
  {
    id: 1,
    question:
      'You have isolated and locked-off the lighting circuit at the main DB. The same building has a 5 kWp rooftop PV array. Why does your lock-off at the main DB not, on its own, make the wiring downstream of a luminaire safe to work on?',
    options: [
      'The PV is a second supply, so a borrowed neutral or shared fitting can bring its voltage onto your conductors',
      'It does make it safe — the PV array can only ever feed back when the grid is present',
      'The lock-off is at the wrong end of the lighting circuit, away from the PV tie-in point',
      'PV is DC not AC, so it physically cannot energise the lighting conductors at all',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 Reg 537.1.2 requires a durable warning notice where an installation contains live parts connected to more than one supply, and Reg 462.1 requires provisions for isolation from each supply. PV inverters with G98/G99 anti-islanding trip on grid loss, but anti-islanding is a fault-protection measure, not an isolation method — and the lighting circuit is not the only path between the PV and the work area. You isolate at every source — array DC isolator, AC isolator at the inverter, and the consumer-unit feed — before you can rely on the lighting circuit being dead.',
  },
  {
    id: 2,
    question:
      'On a TN-C-S (PME) installation, you have isolated and locked-off the local circuit and proven dead. While you are working, a fault develops on the supply network and the PEN conductor opens upstream. What happens at your workplace?',
    options: [
      'Nothing happens — your local isolation and lock-off fully protect you from this fault',
      'The local MCB on the circuit you are working on trips and removes the hazard',
      'Neutral and earth rise toward phase voltage, so bonded metalwork you touch becomes live to ground',
      'The installation RCD detects the imbalance and trips, removing the hazard at source',
    ],
    correctAnswer: 2,
    explanation:
      'PEN faults on TN-C-S systems are the canonical reason BS 7671 distinguishes "isolated from the supply" from "safe with respect to true earth". Reg 411.4.3 prohibits switching or isolating devices in a PEN conductor and the supply-side PEN remains a single point of failure. A broken supply PEN can lift the installation MET above true earth — every exposed-conductive-part bonded to it, including the metalwork of the enclosure you are working in, can become live with respect to ground even though your circuit is locked off. That is why touching simultaneously accessible metalwork while standing on a damp floor or holding a bonded radiator is the real risk.',
  },
  {
    id: 3,
    question:
      'You need to verify the protective conductor continuity on a circuit you have already disconnected and re-landed. The only instrument to hand is your insulation-resistance tester. Is this acceptable for the continuity test?',
    options: [
      'Yes — simply switch it to the lowest resistance range and read off the ohms',
      'Yes, provided the building is left unoccupied while the test is carried out',
      'It is acceptable only if the circuit is disconnected at both ends beforehand',
      'No — its 500 V DC output can damage electronics or shock you; continuity needs a low-resistance ohmmeter',
    ],
    correctAnswer: 3,
    explanation:
      'GN3 Ch 2 names a low-resistance ohmmeter for the continuity duty in Reg 643.2.1. An insulation-resistance tester applies 250–1000 V DC; on a re-connected circuit that is not fully discharged or has stray capacitance, that voltage can re-energise components, damage electronics, or cause a shock. The two instruments do different jobs — use the right one and do not improvise on the dead side.',
  },
  {
    id: 4,
    question:
      'You are extending a circuit. The new conductors are run, terminated and locked off at the DB. The customer asks why the section of cable between the DB and the new accessory still needs an insulated barrier or screen across the open enclosure where you are working.',
    options: [
      'Basic protection (Section 416) must be kept on the rest of the live board; a screen or shroud restores it while you work the dead side',
      'It does not need a barrier — the lock-off on the single circuit is sufficient on its own',
      'A barrier is only required where the board is metal-clad rather than all-insulated',
      'A barrier is only required for as long as the customer is present in the room',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 416.2 requires barriers or enclosures that prevent contact with live parts. Your lock-off applies to one circuit; the rest of the busbar, neighbouring outgoing ways and incoming tails are still live. When a board is open for work, basic protection at the rest of the board has been temporarily lost — restoring it with shrouds, insulated screens or a temporary barrier is part of the work-area control, not an optional courtesy. This is what GN3 calls "protection of the live side of the boundary".',
  },
  {
    id: 5,
    question:
      'A premises has a 22 kW EV charge point fitted as part of an earlier project. You are now isolating a final circuit elsewhere on the same DB. The EV charger has its own RCD and is fed from a dedicated way. Does the charger affect your safe-isolation procedure for the final circuit?',
    options: [
      'No — they are different circuits, so there is no interaction to worry about',
      'It only matters where the charge point is rated above 32 A on its own way',
      'Yes — it shares the earth, so a parallel earth path can carry fault voltage onto your work',
      'It only matters where the charge point is a tethered unit rather than a socket',
    ],
    correctAnswer: 2,
    explanation:
      'EV charging circuits are an additional supply-coupled load on the installation earth. Reg 722 has specific requirements for the EV-side wiring. Although the charger does not feed back into your circuit through the DB, EV charge points can present residual DC fault currents on their own circuit, and bonding/parallel earth paths between the charge-point CPC and the rest of the installation can carry voltage during a fault. When isolating elsewhere on the same board, ensure no parallel earth path can carry fault voltage onto the conductors you are about to touch. The general principle from Reg 537.1.2 — multiple supplies need warning and separate isolation — applies any time the installation has back-feed sources.',
  },
  {
    id: 6,
    question:
      'A UPS supplies a comms rack. The maintenance bypass is an external manual switch with three positions: NORMAL / BYPASS / OFF. You need to work on the rack distribution. What is the correct sequence?',
    options: [
      'Set the maintenance bypass switch to OFF and start work on the rack straight away',
      'Set the switch to NORMAL first, then isolate the single upstream circuit only',
      'Pull only the UPS battery isolator, since the battery is the sole back-up source',
      'Switch to BYPASS, isolate the UPS input and output, prove the rack dead, then lock off the bypass feed',
    ],
    correctAnswer: 3,
    explanation:
      'A UPS is, by definition, a second supply (Reg 537.1.2 territory). Switching to BYPASS routes the load from raw mains and idles the inverter. OFF on a maintenance bypass usually disconnects the load from both feeds, but that is the design intent — not the verification. You isolate each supply explicitly at its own input/output isolators, prove dead at the point of work, and lock-off both. Trusting a single switch position on a multi-source system is the failure mode that gets people hurt.',
  },
  {
    id: 7,
    question:
      "You are working in an opened consumer unit. The customer's child enters the room. What does Reg 416.2 require of you in this moment, and what is the practical control?",
    options: [
      'Maintain basic protection (Reg 416.2): screen the opening, control access at the boundary, or stop work until the area is cleared',
      "Nothing is required — the child's safety is solely the customer's responsibility here",
      'Simply tell the child to stand well back and then continue working as normal',
      'Carry on, and only close the consumer-unit cover once the work is finished',
    ],
    correctAnswer: 0,
    explanation:
      'Reg 416.2 requires that basic protection — preventing contact with live parts — is maintained, and while the board is open that protection is degraded. Section 416 of BS 7671 is exactly the situation an open live board addresses. The practical controls are a screen or barrier across the opening, a person at the boundary controlling access, or stopping work until the area can be cleared. Work-area control during isolated working is not a soft skill; it is the live application of the standard. "Carry on and hope" is not a control.',
  },
  {
    id: 8,
    question:
      'During isolated working on a DB, you notice the PV inverter status light is green and pulsing despite the AC isolator being open. Which of the following is the correct interpretation?',
    options: [
      'The inverter is malfunctioning and should be replaced before any further work',
      'The AC isolator has failed and is not actually open as it appears to be',
      'The DC side stays live in daylight and the capacitors hold charge until the DC isolator opens too',
      'The grid is back-feeding the array through the open AC isolator somehow',
    ],
    correctAnswer: 2,
    explanation:
      "PV systems are dual-supply at heart: AC from the grid and DC from the array. The AC isolator opens the inverter's grid connection, but the DC string and the inverter's internal capacitors stay at potentially lethal voltages whenever there is daylight, until the DC isolator at the array or combiner is also opened and the capacitors have discharged. BS 7671 Section 712 and the relevant industry guidance require a permanent warning notice at DC-side equipment for exactly this reason. Believing the AC isolator is the whole story is a common and dangerous mistake.",
  },
  {
    id: 9,
    question:
      'You are alone on a small job. The isolation point is in a different room from the work area. What does good practice require?',
    options: [
      'Nothing further — a lock-off on the isolation device is enough on its own',
      'Lock-off plus a single verbal warning to the building owner to leave it alone',
      'Lock-off, then trust the building owner not to interfere with the supply at all',
      'Lock-off, key on you, a visible "Do Not Switch" notice, and access controlled',
    ],
    correctAnswer: 3,
    explanation:
      'Reg 462.3 and Reg 537.2.4 both require that isolation devices are designed and installed to prevent unintentional or inadvertent closure. The behavioural complement — the key on your person, a visible notice, supervision or compensating controls — is what turns a regulation about hardware into a safe procedure on site. Where supervision is impractical, adjust the work plan: complete the dead-side work in shorter blocks and prove dead at the point of work each time you re-engage.',
  },
  {
    id: 10,
    question:
      'A back-up generator is fitted to a small commercial unit with a manual changeover switch. While you are working on the lighting circuit, the customer starts the generator "to test it" without telling you. What protected against re-energisation, and what almost did not?',
    options: [
      'The changeover blocks paralleling, but it was unlocked — it should have been in your lock-off',
      'The circuit MCB protected you, and nothing else was relevant to the situation',
      'The fact that the generator frame was earthed is what protected you here',
      'The lighting circuit being RCD-protected is what protected you in this case',
    ],
    correctAnswer: 0,
    explanation:
      'A correctly designed manual changeover should mechanically prevent both supplies being live at once, so with it in the mains-supply position the generator alone should not re-feed the lighting circuit. But "designed to prevent" is not the same as "physically prevented" — a worn changeover, a wrongly wired changeover, or a person operating a changeover whose position you have not verified can all break the assumption. Reg 462.3 / 537.2.4 expect the changeover to be padlocked or interlocked against unwanted operation, and your lock-off should have included it. The lock-off in a multi-supply environment is multi-point — exactly what Reg 537.1.2 is written for. Trusting "the customer would not do that" is not a control.',
  },
];

const inlineChecks = [
  {
    id: 'mod2-s5-pv-dc-side',
    question:
      'You open the AC isolator at a PV inverter — the inverter status lights go out. The DC isolator at the array is still closed and it is midday in July. You need to open the inverter cover. What is the actual state of the inverter, and what is the duty?',
    options: [
      'Live on the DC side and in the capacitors — open the DC isolator and wait the discharge time.',
      'Dead — opening the AC isolator removed all sources from the inverter completely.',
      'Dead — anti-islanding (G98/G99) stops the array from contributing any voltage.',
      'Dead, although you should wear insulating gloves as a sensible precaution anyway.',
    ],
    correctIndex: 0,
    explanation:
      'PV is dual-supply: AC from the grid via the inverter, and DC from the array energised by sunlight. The inverter capacitors hold charge for the manufacturer-stated discharge time. Anti-islanding (G98/G99) is fault-protection for the network, not isolation for the operative. Open both isolators, observe the manufacturer discharge time, then prove dead inside the inverter. BS 7671 Section 712 + the DC-side warning notice exist because this is the failure mode that has injured installers.',
  },
  {
    id: 'mod2-s5-pen-fault',
    question:
      'A TN-C-S domestic install. Your circuit is locked off and proved dead at the point of work. While you are working, an upstream PEN conductor opens on the supply network. What can happen at the property, and what Reg framing covers it?',
    options: [
      'Nothing happens — your local isolation and lock-off protect you.',
      'The local RCD detects the imbalance, trips, and removes the hazard.',
      'The MET and bonded metalwork can rise toward phase voltage above true earth, beyond your lock-off.',
      'The local MCB trips on the resulting fault current and removes the hazard.',
    ],
    correctIndex: 2,
    explanation:
      'PEN faults on TN-C-S are the classic reason "isolated from the supply" is not the same as "safe with respect to true earth". As load current tries to return through parallel earth paths, the installation MET, all CPCs and bonded metalwork can rise to a significant fraction of phase voltage above true earth, and a local lock-off does nothing about it. Reg 411.4.3 prohibits any switching or isolating device in a PEN conductor — there is no operative lock-off available on the supply-side PEN. Real-world PEN faults have lifted MET to over 200 V above true earth. Stay alert; minimise simultaneous contact with bonded metalwork.',
  },
  {
    id: 'mod2-s5-ir-on-reconnected',
    question:
      'You have re-landed the conductors at a junction box and want to verify CPC continuity before re-closing the breaker. Your only instrument is your insulation-resistance tester. What is the correct call?',
    options: [
      'Switch the IR tester to its ohms range and read the continuity value off directly.',
      'Disconnect everything downstream first, then run the IR tester on its ohms range.',
      'Use a general-purpose multimeter on its resistance range for the continuity check.',
      'Wrong instrument — use a low-resistance ohmmeter; the IR tester can damage or shock.',
    ],
    correctIndex: 3,
    explanation:
      'Continuity and insulation resistance are different tests with different instruments and different injected voltages. The IR tester applies 250–1000 V DC, and on a re-connected circuit that can damage downstream electronics, energise stray capacitance or cause a shock. GN3 Ch 2 + Reg 643.2.1 specify a low-resistance ohmmeter for continuity. Stop and use a multifunction tester or dedicated low-Ω ohmmeter — an IR tester injecting 500 V DC into a circuit with electronic loads on the line side is a recipe for collateral damage and an unreliable reading.',
  },
  {
    id: 'mod2-s5-open-board-basic-protection',
    question:
      'You are changing one outgoing way on a 12-way TP+N consumer unit. You have isolated and locked off your circuit. The customer’s child enters the room while the cover is off. Which BS 7671 section bites in this moment, and what are the valid controls?',
    options: [
      'Reg 416.2 (basic protection) bites — screen the opening, control access, or stop work until cleared.',
      'No regulation applies in this moment — the lock-off on your circuit is sufficient.',
      'Only Reg 462.3 applies here — it is enough simply to keep the lock visible.',
      'No electrical regulation applies — only the customer’s parental responsibility.',
    ],
    correctIndex: 0,
    explanation:
      'Section 416 sets the basic-protection requirements: contact with live parts must be prevented. The cover that normally provides basic protection has been removed; the other 11 ways and the busbar are still live. Reg 416.2 expects you to restore it — a barrier or screen across the opening, a person at the boundary controlling access, or pausing work — for the duration. Work-area control during isolated working is the live application of the standard, not a soft skill; "carry on and hope" is not a control.',
  },
];

const InspectionTestingModule2Section5 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Working on isolated systems | I&T Module 2.5 | Elec-Mate',
    description:
      'Protecting the live side of the boundary, back-feed sources (PV, generators, UPS, EV, BESS), PEN faults during work on TN-C-S, dead-side testing rules and work-area control.',
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
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 5"
            title="Working on isolated systems"
            description="Isolation is the start, not the end. What changes once the lock is on — back-feed sources, PEN faults on TN-C-S, dead-side testing rules, and the boundary you are now responsible for."
            tone="yellow"
          />

          <TLDR
            points={[
              'A circuit is "isolated" only with respect to the supply you have switched off. PV, generators, UPS, EV chargers and battery storage are independent supplies — every one of them needs its own isolation step (Reg 537.1.2, Reg 462.1).',
              'BS 7671 Reg 411.4.3 prohibits any switching or isolating device in a PEN conductor. That prohibition is the reason a supply-side PEN fault on a TN-C-S installation can put the installation MET above true earth even when your local circuit is locked off.',
              'Basic protection (Reg 416) does not stop existing because you opened a board. While the enclosure is open, the live side of the boundary needs barriers, shrouds or a screen — and the work area needs supervision or controlled access.',
              'On the dead side, only a low-resistance ohmmeter (GN3 Ch 2) belongs on a re-connected circuit for continuity work. An insulation-resistance tester applies 250–1000 V DC and is the wrong tool for that job — it can damage electronics, energise stray capacitance, or shock you.',
              'Lock-off plus key-on-you plus visible warning notice is one control. The matching procedural control is your assumption that nobody else will mess with it — and that needs verification, not trust.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'List the back-feed sources commonly found on UK installations and the BS 7671 reference that requires each to be isolated separately',
              'Explain why a PEN fault on a TN-C-S system can put exposed-conductive-parts above true earth even with the local circuit locked off',
              'Apply the Reg 416 basic-protection requirements to an opened enclosure during isolated working — barriers, shrouds, screens and access control',
              'Choose the correct test instrument for any check carried out on the dead side, and state why an insulation-resistance tester is wrong for continuity on a re-connected circuit',
              'Plan and execute work-area control for solo and team working, including lock-off, key custody, signage and supervision',
              'Recognise the situations where the changeover, RCD, or anti-islanding feature you have relied on is a design control rather than an isolation method, and respond appropriately',
            ]}
          />

          <ContentEyebrow>The boundary you are now responsible for</ContentEyebrow>

          <ConceptBlock
            title="What changes the moment the lock goes on"
            plainEnglish="Isolation puts a hard boundary across the installation. On one side is the dead conductor you are about to work on. On the other side is everything still live: the rest of the busbar, neighbouring circuits, incoming tails, supply-side PEN, and any independent supplies the building has. Your job during the isolated work is to keep the live side basic-protected and prevent any source from crossing the boundary."
            onSite="Treat the open enclosure as a temporary live exposure. Whatever protected the public from contact with live parts before you opened the cover (the cover itself) has gone. You are the replacement until the cover is back on."
          >
            <p>
              The lock-off and the proving-dead step at the point of work confirm one thing: the
              circuit you have isolated is dead at the moment you tested it. They do not, on their
              own, address (a) other supplies that can re-energise the conductors via a different
              path, (b) supply-side faults that can lift the installation earth, or (c) the live
              parts that are still present on the live side of the boundary you have just opened.
            </p>
            <p>
              Reg 462.1 sets the principle: every electrical installation shall have provisions for
              isolation from each supply. The phrase &ldquo;each supply&rdquo; is doing the work in
              that sentence. A modern installation routinely has more than one supply — the public
              network, a rooftop PV array, a generator, a UPS, an EV charge point with a battery
              feature, or domestic battery storage. Isolation from one is not isolation from the
              others.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 537.1.2"
            clause={
              <>
                Where an installation or an item of equipment or enclosure contains live parts
                connected to more than one supply, a durable warning notice shall be placed in such
                a position that any person, before gaining access to live parts, will be warned of
                the need to isolate those parts from the various supplies unless an interlocking
                arrangement is provided to isolate all the circuits concerned.
              </>
            }
            meaning="Multiple supplies = multiple isolations, every time. The warning notice is the install-time evidence. The procedural duty is to read the notice, find the supplies, and isolate each one before you cross the boundary."
          />

          <SectionRule />

          <ContentEyebrow>Back-feed sources you must account for</ContentEyebrow>

          <ConceptBlock
            title="Solar PV — AC and DC are two separate supplies"
            plainEnglish="A PV installation has two live sides: the AC connection from the inverter to the grid, and the DC string from the array to the inverter. Opening the AC isolator at the inverter does not de-energise the DC side. The DC side is live whenever the array is illuminated."
            onSite="Open both isolators (DC at the array / combiner, AC at the inverter) and treat the inverter capacitors as energised until you have either waited the manufacturer's discharge time or measured them with a meter you trust."
          >
            <p>
              BS 7671 Section 712 (and the IET PV Code of Practice) treat the DC side as a separate
              supply requiring its own isolator and its own warning notice. A permanent warning
              notice at DC-side equipment such as combiner boxes and inverter inputs is required
              precisely because the &ldquo;normal&rdquo; isolation cue (AC supply switched off) does
              not apply.
            </p>
            <p>
              Anti-islanding (G98 / G99 inverter behaviour) is a fault-protection feature, not an
              isolation method. It disconnects the inverter from the grid on loss of grid voltage;
              it does not prove the DC side is dead, and it does not prevent the inverter feeding a
              local island if its detection logic is fooled by a particular load arrangement.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Generators — manual changeover, automatic transfer, and the trust gap"
            plainEnglish="A generator is a second source. A changeover switch is a design control intended to prevent both sources being live at the same time. It is not, by itself, an isolation method — and it is not always in the position you assume."
            onSite="If the building has a generator, isolate the generator at its own controls and lock it off, in addition to the lock-off at the consumer unit / DB. The changeover position is part of the work-area control, not a substitute for it."
          >
            <p>
              Reg 462.3 and Reg 537.2.4 both require that isolation devices are designed and
              installed to prevent unintentional or inadvertent closure. A changeover switch that
              someone could flip during your work is not, in that moment, doing what those
              regulations ask. Padlocking the changeover in a known position, or removing the
              starter key on a manual-start set, is the procedural counterpart to the locked
              isolator at the DB.
            </p>
            <p>
              For automatic transfer switches (ATS), the additional risk is that the unit will start
              the generator and transfer the load when it senses loss of mains. If you have isolated
              the mains supply at the consumer unit, you have given the ATS exactly the signal it is
              looking for. Disable the ATS on its own controls, or isolate the generator-side feed
              too, before you rely on the building being dead.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="UPS, EV chargers and BESS — three more supplies in the modern installation"
            plainEnglish="A UPS feeds its load whenever the battery has charge. An EV charge point can present residual DC fault currents and is bonded to the same earth system as the rest of the installation. Battery energy storage (BESS) is, by definition, a storage source: a battery is a generator and a load (Reg 551 territory)."
            onSite="The modern domestic CU might have: incoming DNO supply, PV inverter feeding back, a tethered EV charger with a 22 kW way, and a hybrid PV/battery system with a black-start feature. That is four supplies. Reg 537.1.2 applies."
          >
            <p>
              A UPS with an external maintenance bypass simplifies the isolation procedure but does
              not remove it. BYPASS routes the load to raw mains and idles the inverter; OFF is
              meant to disconnect the load from both feeds, but you verify by isolating each
              upstream feed and proving dead at the rack — never by trusting a single switch
              position on a multi-source system.
            </p>
            <p>
              EV charge points fed from the same DB do not back-feed your final circuit, but they
              share the protective conductor and bonding network. A fault on the charger circuit
              while you are working can put fault voltage onto the CPC of the conductor you are
              touching. Where the work is on the same earth/bonding system, isolate the charger
              circuit too. Reg 722.312 requirements for EV circuits also remind us that a PEN
              conductor is not permitted on a TN-system EV circuit downstream of the origin.
            </p>
            <p>
              Battery storage adds a second generator behaviour. BS 7671 explicitly notes that a
              battery can be considered as a generator and as a load. Where a hybrid inverter has a
              black-start or off-grid feature, the battery can re-feed the loads independently of
              the mains supply. Confirm the BESS is in a safe-isolated state per its manufacturer
              instructions, isolate the AC and DC sides separately, and do not rely on a single
              system controller saying it is &ldquo;off&rdquo;.
            </p>
          </ConceptBlock>

          {/* Back-feed sources schematic */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Back-feed sources around the modern DB — every one needs its own isolation
            </h4>
            <svg
              viewBox="0 0 800 460"
              className="w-full h-auto"
              role="img"
              aria-label="Distribution board at centre with possible back-feed sources arrayed around it: solar PV with separate AC and DC isolation requirements, manual or automatic standby generator with changeover, uninterruptible power supply with maintenance bypass, EV charge point sharing the bonding system, and battery energy storage with hybrid inverter. Each source is shown with its own isolation step labelled."
            >
              {/* Title strip */}
              <rect x="0" y="0" width="800" height="28" fill="rgba(251,191,36,0.08)" />
              <text
                x="400"
                y="18"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Reg 462.1 — provisions for isolation FROM EACH SUPPLY · Reg 537.1.2 — multi-supply
                warning notice
              </text>

              {/* Central DB */}
              <rect
                x="320"
                y="180"
                width="160"
                height="120"
                rx="10"
                fill="rgba(255,255,255,0.06)"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="2"
              />
              <text
                x="400"
                y="205"
                textAnchor="middle"
                fill="rgba(255,255,255,0.9)"
                fontSize="12"
                fontWeight="bold"
              >
                DISTRIBUTION
              </text>
              <text
                x="400"
                y="222"
                textAnchor="middle"
                fill="rgba(255,255,255,0.9)"
                fontSize="12"
                fontWeight="bold"
              >
                BOARD
              </text>
              <text x="400" y="246" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                MET · busbar
              </text>
              <text x="400" y="262" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                outgoing ways
              </text>
              <rect
                x="345"
                y="275"
                width="110"
                height="18"
                rx="4"
                fill="rgba(34,197,94,0.12)"
                stroke="#22C55E"
                strokeWidth="1"
              />
              <text
                x="400"
                y="288"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                LOCK-OFF · circuit X
              </text>

              {/* PV — top left */}
              <rect
                x="40"
                y="50"
                width="180"
                height="90"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="130"
                y="72"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                SOLAR PV
              </text>
              <text x="130" y="90" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Two supplies:
              </text>
              <text x="130" y="104" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9">
                · DC isolator at array
              </text>
              <text x="130" y="118" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9">
                · AC isolator at inverter
              </text>
              <text
                x="130"
                y="132"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="9"
                fontStyle="italic"
              >
                anti-islanding ≠ isolation
              </text>
              <line
                x1="220"
                y1="120"
                x2="320"
                y2="200"
                stroke="rgba(251,191,36,0.5)"
                strokeWidth="1.5"
                strokeDasharray="4,3"
              />

              {/* Generator — top right */}
              <rect
                x="580"
                y="50"
                width="180"
                height="90"
                rx="8"
                fill="rgba(239,68,68,0.06)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="670"
                y="72"
                textAnchor="middle"
                fill="#F87171"
                fontSize="11"
                fontWeight="bold"
              >
                GENERATOR
              </text>
              <text x="670" y="90" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Manual or ATS:
              </text>
              <text x="670" y="104" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9">
                · padlock changeover
              </text>
              <text x="670" y="118" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9">
                · disable ATS
              </text>
              <text
                x="670"
                y="132"
                textAnchor="middle"
                fill="#F87171"
                fontSize="9"
                fontStyle="italic"
              >
                changeover ≠ isolation
              </text>
              <line
                x1="580"
                y1="120"
                x2="480"
                y2="200"
                stroke="rgba(239,68,68,0.5)"
                strokeWidth="1.5"
                strokeDasharray="4,3"
              />

              {/* UPS — left */}
              <rect
                x="40"
                y="230"
                width="180"
                height="80"
                rx="8"
                fill="rgba(59,130,246,0.06)"
                stroke="rgba(59,130,246,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="130"
                y="252"
                textAnchor="middle"
                fill="#60A5FA"
                fontSize="11"
                fontWeight="bold"
              >
                UPS
              </text>
              <text x="130" y="270" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Bypass + battery:
              </text>
              <text x="130" y="284" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9">
                · isolate input AND output
              </text>
              <text
                x="130"
                y="298"
                textAnchor="middle"
                fill="#60A5FA"
                fontSize="9"
                fontStyle="italic"
              >
                BYPASS ≠ OFF
              </text>
              <line
                x1="220"
                y1="270"
                x2="320"
                y2="240"
                stroke="rgba(59,130,246,0.5)"
                strokeWidth="1.5"
                strokeDasharray="4,3"
              />

              {/* EV charger — right */}
              <rect
                x="580"
                y="230"
                width="180"
                height="80"
                rx="8"
                fill="rgba(34,197,94,0.06)"
                stroke="rgba(34,197,94,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="670"
                y="252"
                textAnchor="middle"
                fill="#4ADE80"
                fontSize="11"
                fontWeight="bold"
              >
                EV CHARGE POINT
              </text>
              <text x="670" y="270" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Shared earth / bonding:
              </text>
              <text x="670" y="284" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9">
                · isolate charger circuit
              </text>
              <text
                x="670"
                y="298"
                textAnchor="middle"
                fill="#4ADE80"
                fontSize="9"
                fontStyle="italic"
              >
                Reg 722 PEN restrictions
              </text>
              <line
                x1="580"
                y1="270"
                x2="480"
                y2="240"
                stroke="rgba(34,197,94,0.5)"
                strokeWidth="1.5"
                strokeDasharray="4,3"
              />

              {/* BESS — bottom */}
              <rect
                x="280"
                y="380"
                width="240"
                height="70"
                rx="8"
                fill="rgba(168,85,247,0.06)"
                stroke="rgba(168,85,247,0.4)"
                strokeWidth="1.5"
              />
              <text
                x="400"
                y="402"
                textAnchor="middle"
                fill="#C084FC"
                fontSize="11"
                fontWeight="bold"
              >
                BATTERY ENERGY STORAGE (BESS)
              </text>
              <text x="400" y="420" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9">
                · isolate AC side AND DC side · disable hybrid black-start
              </text>
              <text
                x="400"
                y="436"
                textAnchor="middle"
                fill="#C084FC"
                fontSize="9"
                fontStyle="italic"
              >
                a battery is a generator AND a load
              </text>
              <line
                x1="400"
                y1="380"
                x2="400"
                y2="300"
                stroke="rgba(168,85,247,0.5)"
                strokeWidth="1.5"
                strokeDasharray="4,3"
              />

              {/* Caption */}
              <text x="400" y="350" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="10">
                Each source has its own isolation step. Lock-off at the DB only addresses the DNO
                supply.
              </text>
              <text
                x="400"
                y="366"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Find every supply → isolate each → prove dead at the point of work.
              </text>
            </svg>
          </div>

          <Scenario
            title="A small commercial unit with PV, ATS-controlled generator and a UPS rack"
            situation="You are replacing a luminaire on a lighting circuit. The unit has a 12 kWp rooftop PV array (G99-compliant), a 20 kVA standby generator with an automatic transfer switch, and a 6 kVA UPS feeding a comms rack. You isolate the lighting circuit at the consumer unit and lock-off."
            whatToDo={
              <>
                <span className="block">
                  1. Isolate the PV at the AC isolator at the inverter; isolate the DC at the array
                  DC isolator. Note discharge time on the inverter.
                </span>
                <span className="block">
                  2. At the ATS, disable automatic transfer per its manual; padlock or remove the
                  starter key on the generator so it cannot start. Verify changeover position.
                </span>
                <span className="block">
                  3. The UPS feeds the comms rack only — confirm. If your work is on the lighting
                  circuit and the UPS rack is on a separate circuit, the UPS does not feed the
                  lighting; if any of its outputs share earthing/bonding with your work area,
                  isolate the UPS input and output too.
                </span>
                <span className="block">
                  4. Lock-off the lighting circuit at the consumer unit. Prove dead at the luminaire
                  with a GS38-compliant tester proven on a known live source before and after.
                </span>
                <span className="block">
                  5. Apply the multi-supply warning notice if not already in place (Reg 537.1.2).
                  Record what you did on the work pack.
                </span>
              </>
            }
            whyItMatters="Single-supply muscle memory misses three of these steps. The first time the ATS fires up while you are leaning into an opened ceiling rose, the cost of the missed step is non-recoverable."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The PEN-fault risk on TN-C-S installations</ContentEyebrow>

          <ConceptBlock
            title="Why a supply-side PEN fault is dangerous even with your circuit locked off"
            plainEnglish="On a TN-C-S supply, the protective earth and the neutral are combined upstream as a PEN conductor. The installation MET, all CPCs and all bonded metalwork are connected to that PEN via the neutral terminal. If the PEN opens upstream during a fault on the network, the installation MET can rise to a significant fraction of phase voltage above true earth — and your locally-isolated circuit does nothing about that."
            onSite="Reg 411.4.3 prohibits switching or isolating devices in a PEN conductor. There is no equivalent of your local lock-off available on the supply-side PEN: you cannot isolate it. The mitigation is awareness — knowing the failure mode exists, knowing what it looks like, and knowing what to do if you see signs of it."
          >
            <p>
              In a TN-C-S (PME) system, all exposed-conductive-parts of an installation are
              connected to the PEN conductor via the main earthing terminal and the neutral
              terminal, with these terminals linked together. The supply-side PEN is earthed at
              multiple points along the network. The whole arrangement assumes a continuous,
              low-impedance PEN.
            </p>
            <p>
              A broken supply-side PEN inverts the assumption. With load current still flowing on
              the line conductors and trying to return via the (now broken) PEN, the path of least
              impedance for that return current becomes the parallel earth paths via bonded
              metalwork — copper water service, gas service, structural steel — and the earth
              electrode if there is one. The MET, and everything bonded to it, sits at a voltage
              relative to true earth set by the impedance of those paths. That voltage can
              comfortably exceed 50 V AC and has been measured at over 200 V on real PEN faults.
            </p>
            <p>
              Practical signs of a developing PEN fault: tingles from a metal sink while standing on
              a concrete floor, lights flickering on one phase but not another in a three-phase
              installation, a doorbell or comms equipment failing in a way that suggests neutral
              displacement. None of these are guaranteed warnings; the only definitive control is
              awareness that the installation earth is not absolute, and a healthy respect for the
              live side of the boundary even when your local lock-off is in place.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.4.3"
            clause={<>No switching or isolating device shall be inserted in a PEN conductor.</>}
            meaning="The PEN conductor is the single path that combines protective earth and neutral upstream. The standard does not allow it to be opened deliberately. The corollary is that a fault that opens it accidentally is dangerous and must be designed against — and worked around safely."
          />

          <CommonMistake
            title="Treating the AC isolator at a PV inverter as &lsquo;the&rsquo; isolation"
            whatHappens="The inverter status lights are out. The AC side is dead. The customer is impressed. You open the inverter cover to investigate a fault and contact a DC string conductor that is at 600 V DC because the array is in full sun. The inverter capacitors are also still charged. The shock and the burn are immediate."
            doInstead="Isolate the DC side first (or simultaneously). Most modern inverters require AC isolation, then DC isolation, and a manufacturer-stated discharge time before opening the lid. The permanent warning notice required at DC-side equipment exists precisely to remind you of this — read it every time, not just the first time."
          />

          <CommonMistake
            title="Leaving the live side of the board unprotected when working on one circuit"
            whatHappens="You are changing an outgoing way on a 12-way TP+N consumer unit. You isolate that circuit and lock it off. The other eleven ways are still live. Your screwdriver slips off the terminal you are working on and lands on the busbar of a neighbouring way. Best case: a flash and a tripped main switch. Worst case: an arc-flash incident that hospitalises you."
            doInstead="Apply Reg 416.2 in the moment: barriers, shrouds or insulated screens across the rest of the busbar while one circuit is being worked. Many manufacturers supply purpose-made shrouds for exactly this scenario. Where they are not available, an insulated rubber matting cut to size and clipped in place is acceptable. The principle is that the live side of the boundary remains basic-protected."
          />

          <CommonMistake
            title="Using the wrong instrument on a re-connected dead circuit"
            whatHappens="You re-land the conductors at a junction box and want to verify CPC continuity before re-closing the breaker. The only tester you have is your IR tester. You switch it to ohms (which is actually still an injected-voltage range on many models) and read 0.4 Ω. You record the value, close the breaker, and a piece of low-voltage equipment downstream fails."
            doInstead="GN3 Ch 2 names a low-resistance ohmmeter for the continuity duty (Reg 643.2.1). On a re-connected circuit there can be electronic loads, dimmers, residual capacitance and stray paths that an IR tester will damage or excite. Use a multifunction tester or a dedicated low-Ω ohmmeter for continuity. The IR tester is for insulation resistance, applied with the equipment disconnected per Reg 643.3.3."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Work-area control during isolated working</ContentEyebrow>

          <ConceptBlock
            title="Lock-off is hardware. Work-area control is the procedure that makes it work"
            plainEnglish="The lock prevents the device from being closed. The work-area control prevents anything else from undoing what you have done — somebody else swapping a fuse-link, a customer flipping the changeover, a maintenance contractor energising another supply. Both halves are needed."
            onSite="The four parts: lock + key on you, visible warning notice at the isolation point, supervision or controlled access to the work area, and a brief to anyone who could affect the isolation. None of these is optional in a multi-source environment."
          >
            <p>
              Reg 462.3 requires devices for isolation to be designed and installed so as to prevent
              unintentional or inadvertent closure — examples given include locating in a lockable
              space or enclosure, padlocking, or other suitable means. Reg 537.2.4 repeats the duty
              for selection and installation. Both regulations are about the isolation hardware. The
              procedural controls around them are what you bring to site.
            </p>
            <p>
              Solo working tightens the requirement. With nobody else on site, the ways an isolation
              can be undone are limited to (a) the customer or another occupant, (b) your own
              forgetfulness, and (c) automatic systems like an ATS or a hybrid-inverter black-start.
              (a) and (c) are addressed at the source — padlocked changeovers, disabled ATS,
              isolated black-start. (b) is addressed by the visible notice and the key on your
              person, not in your toolbox.
            </p>
            <p>
              Team working changes the model. Each person whose work depends on the isolation should
              ideally have their own padlock on the same multi-lock hasp, removed only by that
              person when they personally are clear. This is borrowed from process-industry lock-out
              / tag-out practice and is the most reliable control where multiple trades are on the
              same circuit.
            </p>
          </ConceptBlock>

          <Scenario
            title="A two-person team in a domestic refurbishment"
            situation="You and an apprentice are rewiring a kitchen. The lighting and the ring final on that floor are isolated and locked off. You are working at the consumer unit; the apprentice is at a junction box in the ceiling void above the kitchen. Mid-morning, the homeowner asks if they can boil the kettle on the unaffected ground-floor ring."
            whatToDo={
              <>
                <span className="block">
                  Confirm verbally with the apprentice the lock-off is still in place and which
                  circuits it covers. Confirm the kettle is on a circuit you have not isolated.
                  Demonstrate to the homeowner where your lock-off is and that touching it would cut
                  their kettle off too — they tend not to.
                </span>
                <span className="block">
                  If the apprentice steps away for a break, the work area is unattended with a
                  partially open enclosure. The basic-protection control needs maintaining: either
                  close the JB cover during the break, or put a screen/barrier across the access
                  point and a notice on the ladder.
                </span>
                <span className="block">
                  When the apprentice signs off for the day before you, your lock and notice stay in
                  place; you remove them only when you are personally clear.
                </span>
              </>
            }
            whyItMatters="The PV-and-generator scenarios make headlines. The undramatic risks — somebody innocently switching something while you are reaching into a board — are the ones that account for most actual incidents. Work-area control is the unglamorous half of safe isolation."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Dead-side testing rules</ContentEyebrow>

          <ConceptBlock
            title="What you can and cannot do on the dead side"
            plainEnglish="Continuity testing, insulation-resistance testing and earth-electrode testing happen on the dead side. Each has its own instrument, its own injected voltage, and its own conditions. Mixing them up — using an IR tester for continuity, or applying 500 V DC to a re-connected circuit — is the most common cause of avoidable damage during isolated working."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Continuity (Reg 643.2.1, GN3 Ch 2):</strong> low-resistance ohmmeter,
                injected current, reading in ohms. Safe to use on a re-connected circuit because the
                injected voltage is low. Right tool for verifying CPC and bonding before
                re-energisation.
              </li>
              <li>
                <strong>Insulation resistance (Reg 643.3, Table 64):</strong> 250 V / 500 V / 1000 V
                DC depending on circuit voltage. Reg 643.3.3 requires that where connected equipment
                is likely to influence the result or be damaged by the test, the test is applied
                prior to the connection of such equipment. After re-connection, a 250 V DC test
                between live conductors and protective conductor is permitted with a 1 MΩ acceptance
                criterion.
              </li>
              <li>
                <strong>Earth electrode (where applicable):</strong> the procedural sequence is
                isolate, disconnect the earthing conductor, perform the test, reconnect the earthing
                conductor BEFORE re-energising. The reconnection step is non-negotiable — leaving
                the electrode disconnected and re-energising is a direct breach of fault-protection.
              </li>
              <li>
                <strong>Polarity (Reg 643.6):</strong> verified before energisation. Confirm every
                fuse and single-pole device is in the line conductor only, and that wiring is
                correctly connected throughout.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 643.3.3"
            clause={
              <>
                Where connected equipment is likely to influence the measurement or result of the
                test, or be damaged, the test shall be applied prior to the connection of such
                equipment, in accordance with Table 64. Following connection of the equipment, a
                test at 250 V DC shall be applied between live conductors and the protective
                conductor connected to the earthing arrangement. The insulation resistance shall
                have a value of at least 1 MΩ.
              </>
            }
            meaning="Two rules in one regulation. (1) Test the insulation resistance at the design test voltage with the equipment disconnected. (2) After re-connection, a 250 V DC live-to-PE test is the post-connection check, with a 1 MΩ minimum. Use the right voltage for the right stage."
          />

          <ConceptBlock
            title="Proving dead — the GS38 test lamp / two-pole tester procedure"
            plainEnglish="Every time you isolate, the verification step is to prove dead at the point of work using a tester proven on a known live source before and after the dead test. The tester must comply with HSE Guidance Note GS38 (insulated probes, finger guards, fused leads where applicable, voltage indicators that cannot give a false negative)."
            onSite="The proving sequence is: prove tester on known live source → test point of work between every combination of conductors (L1-L2, L1-L3, L2-L3, L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, N-E for 3-phase; L-N, L-E, N-E for single phase) → re-prove tester on known live source. Any failure of the re-prove invalidates the dead test."
          >
            <p>
              Voltage indicators are preferred over multimeters for proving dead. A multimeter set
              to volts can give a confident-looking zero reading because the rotary switch is on
              ohms, the leads are open-circuit, the battery is flat, or the fuse is blown. A
              two-pole voltage indicator with a beacon and an audible signal is purpose-built for
              the task and removes most of those failure modes. Where a multimeter is used, the
              proving-on-known-live before and after is the only protection.
            </p>
            <p>
              The proving-source test box (a small mains-powered or battery-powered known voltage)
              is the modern norm and the safest practical option. If the only known live source on
              site is a socket on the same circuit you have just isolated, that is not a known live
              source — it is the source you have made dead. Find a known live elsewhere, or carry a
              proving unit.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Putting it together</ContentEyebrow>

          <ConceptBlock
            title="The isolated-working checklist"
            plainEnglish="Each step has a regulation behind it. Doing them in order is the procedural form of compliance with Section 537, Section 462 and Section 416 simultaneously."
          >
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                Identify every supply on the installation. Read warning notices, schedule of circuit
                details, and walk the building if needed (Reg 537.1.2).
              </li>
              <li>
                Isolate each supply at its own controls. Lock or padlock each isolation point.
                Disable automatic systems (ATS, hybrid black-start) per their own manuals (Reg
                462.1, Reg 462.3, Reg 537.2.4).
              </li>
              <li>
                Apply the multi-supply warning notice at the work area if not already present.
              </li>
              <li>
                Prove dead at the point of work using a GS38-compliant tester proven before and
                after on a known live source.
              </li>
              <li>
                Establish the work-area control: barriers/screens for the live side of the boundary
                (Reg 416.2), supervision or controlled access, key on your person, brief to anyone
                present.
              </li>
              <li>
                Carry out the work using only dead-side tests with the correct instrument.
                Continuity = low-resistance ohmmeter; insulation resistance = IR tester at the Table
                64 voltage with equipment disconnected, then 250 V DC after re-connection; polarity
                = continuity-style check, never a meter on volts.
              </li>
              <li>
                If the work involves a PV / generator / UPS / EV / BESS, check the manufacturer
                guidance for residual energy and discharge times before reaching inside.
              </li>
              <li>
                On completion, reconnect any earthing/bonding conductors removed for testing BEFORE
                restoring supply. Apply for re-energisation per Module 2 §6.
              </li>
            </ol>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Every supply needs its own isolation step — DNO, PV (AC and DC), generator, UPS, EV, BESS. Reg 537.1.2 is the regulation; the warning notice on the board is the install-time evidence.',
              'A PEN conductor is not isolatable (Reg 411.4.3). A supply-side PEN fault on TN-C-S can put your installation MET above true earth even with your circuit locked off — awareness is the only control.',
              'When the enclosure is open, basic protection (Reg 416) needs restoring with shrouds, barriers or screens. The lock-off addresses the dead side; the live side needs its own control.',
              'On the dead side, use the right instrument for the right test. Low-resistance ohmmeter for continuity; IR tester at Table 64 voltage for insulation resistance with equipment disconnected; 250 V DC for the post-connection check (Reg 643.3.3).',
              'Anti-islanding, ATS interlocks and changeover switches are design controls, not isolation methods. Padlock, disable, or isolate at source — and verify by proving dead at the point of work.',
              "Solo working: lock + key on you + visible notice + verified work-area control. Team working: shared multi-lock hasp, each person's own lock, removed only when that person is clear.",
              'Proving dead: prove on known live before and after. A multimeter on volts is not a proving instrument; a GS38 voltage indicator with a beacon is.',
              'If anything you have relied on (changeover, ATS, anti-islanding) feels like a single point of failure, it is. Add a second control before you cross the boundary.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'My customer says the PV inverter has anti-islanding so I do not need to isolate the DC side. Are they right?',
                answer:
                  "No. Anti-islanding (G98 / G99 behaviour) disconnects the inverter from the grid on loss of grid voltage — it is fault-protection for the network, not isolation for you. The DC side is energised by sunlight regardless of the inverter's state and the inverter's capacitors hold charge for the manufacturer-stated discharge time. Open both isolators (DC at the array / combiner, AC at the inverter) and wait the discharge time before opening the inverter.",
              },
              {
                question:
                  'How can I tell if a TN-C-S installation has a developing PEN fault while I am working?',
                answer:
                  'You usually cannot tell directly — that is the problem. Indirect signs include lights varying in brightness on one phase but not others, mild shocks from bonded metalwork, comms or doorbell equipment behaving oddly, or a measurable voltage between the MET and an independent earth electrode. None of these are guaranteed. The mitigation is awareness: do not assume the installation earth is at true earth potential, keep contact with bonded metalwork to a minimum during dead-side work, and treat any tingling or behavioural sign as a stop-and-investigate trigger.',
              },
              {
                question:
                  'Can I use the existing CPC of the circuit I have isolated as my proving-dead reference?',
                answer:
                  'No, not as a known live reference — you have just made it dead, by definition. For proving dead, you need a known live source independent of the isolation you have applied. A purpose-built proving unit is the safest practical option. A live socket on a different, unaffected circuit can serve in a pinch, provided you have positively confirmed it is live and not part of the isolation.',
              },
              {
                question:
                  'I am replacing a luminaire and the customer asks if I really need to isolate at the consumer unit when there is a switch right there. Why not just turn the switch off?',
                answer:
                  'A local switch can fail to make break (worn contacts, damaged switch drop), and it cannot be locked off in any reliable way. Reg 462.3 / Reg 537.2.4 expect isolation devices to prevent unintentional or inadvertent closure — a normal lighting switch cannot meet that bar. The lock-off at the consumer unit is the isolation; the local switch is a convenience.',
              },
              {
                question:
                  'On a TN-C-S installation with a domestic battery storage system that has a black-start feature, is the AC isolator at the inverter enough to make the system safe?',
                answer:
                  "No. The AC isolator handles the grid-coupling side. The black-start feature means the inverter can intentionally re-create AC voltage from the battery to feed the loads even with the grid absent — and from your point of view inside the consumer unit, that AC voltage is indistinguishable from the grid. Disable black-start per the manufacturer's manual (often a battery-side isolator or a configuration setting), isolate the DC side, and prove dead at the point of work.",
              },
              {
                question:
                  'My multifunction tester can do continuity, insulation resistance, RCD and loop testing in one box. Do I still need a GS38 voltage indicator?',
                answer:
                  'Yes. A multifunction tester is for measurement; a GS38 voltage indicator is for proving dead. The voltage-indicator function on most multifunction testers is acceptable for a quick check but lacks the failure-tolerant design of a dedicated two-pole voltage indicator with beacons / audible signal. For the proving-dead step at the point of work, a GS38 unit and a proven-on-known-live procedure is the durable practice.',
              },
              {
                question:
                  'A site has a generator with manual changeover and the customer says the generator has not run for years. Is it OK to skip isolating it?',
                answer:
                  'No. Reg 537.1.2 applies because the installation contains live parts connected to more than one supply, regardless of how often that supply is exercised. The risk is not that the generator runs; the risk is that someone (the customer, a maintenance contractor, you in a hurry) operates the changeover or starts the set during your work. Padlock the changeover in the mains-supply position, remove the starter key, and treat the generator as live until proven otherwise.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Working on isolated systems — Module 2.5" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-2')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 2
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-2/section-6')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.6 Re-energisation procedures
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

export default InspectionTestingModule2Section5;
