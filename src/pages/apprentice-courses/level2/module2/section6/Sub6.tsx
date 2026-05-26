/**
 * Module 2 · Section 6 · Subsection 6
 * Unit 202 LO6 — AC 6.1
 * Real on-site electronics — relays, contactors, RCD/AFDD electronics, surge protection.
 * Final Sub of Module 2.
 */
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  VideoCard,
} from '@/components/study-centre/learning';
import {
  RelaySymbol,
  ContactorSymbol,
  SwitchSymbols,
  InductorSymbol,
  ConsumerUnit,
} from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Real on-site electronics — relays, contactors, RCD/AFDD, SPDs (6.1) | Level 2 Module 2.6.6 | Elec-Mate';
const DESCRIPTION =
  'Pull every Sub in this section together with the kit you actually fit. Relays vs contactors. The electronics inside an RCD and AFDD. What an SPD really is and why BS 7671 keeps mentioning it.';

const checks = [
  {
    id: 'relay-vs-contactor',
    question: 'What is the practical difference between a relay and a contactor?',
    options: [
      'Prevents premature collapse of the cable in the event of fire — typically by using metallic fixings or supports rather than plastic cable clips alone',
      'Seek to strengthen that area by gathering additional or better-quality evidence, such as a more detailed activity log entry, a reflective account, or a witness statement covering that KSB',
      'Both are coil-operated switches, but contactors are built for higher currents (motor and load circuits) and usually have multiple ganged poles, often three.',
      'Document the change, confirm cost and time implications, obtain written agreement before proceeding, and update the site diary',
    ],
    correctIndex: 2,
    explanation:
      'Both are electromagnetic switches: a small coil pulls in a set of contacts. A relay is small (typically up to 10–16 A on a single pole) and lives on a PCB or in a control panel. A contactor is built for kW-level loads, usually three- or four-pole, and lives at the motor or heater it’s switching.',
  },
  {
    id: 'rcd-detection',
    question: 'How does an RCD actually detect a fault?',
    options: [
      'A current transformer wraps around live and neutral; if more current goes out than comes back, the imbalance induces a tiny current in a sense coil that trips the unit.',
      'The earthing conductor, main protective bonding conductors and circuit protective conductors all connect to form the installation\\\\\\\\\\\\\\\'s earth reference',
      'BJTs are controlled by base current; MOSFETs are controlled by gate voltage. MOSFETs are far more common in modern power switching.',
      'To maintain a comprehensive list of all hazardous substances used or generated in the workplace, linked to their assessments and SDSs',
    ],
    correctIndex: 0,
    explanation:
      'A toroidal core surrounds line and neutral together. Healthy circuits balance — net flux is zero. Any leakage to earth means line carries more (or less) than neutral, the imbalance induces a current in the sense winding, and at 30 mA imbalance it trips the contacts.',
  },
  {
    id: 'spd-purpose',
    question: 'What does a Surge Protection Device (SPD) do?',
    options: [
      'A significant change in work activity, equipment, personnel, legislation, or a near-miss/incident related to the assessed activity',
      'Diverts brief, high-voltage surges (from lightning or switching) to earth, clamping the voltage seen by the installation to a safe level.',
      'Verify that protection coordination is maintained — the protective device rating, type and characteristics are still appropriate for the circuit',
      'Ensure no persons are on the tower, remove all loose materials, check the route for obstructions and overhead hazards, and unlock all castors',
    ],
    correctIndex: 1,
    explanation:
      'An SPD sits between the live conductors and earth, normally invisible. When a surge appears (microseconds long, hundreds or thousands of volts), the SPD’s internal MOV or gas tube switches to a low impedance, dumps the energy to earth, and snaps back to normal once the surge has passed.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A relay coil rated 24 V DC needs roughly what across it to operate reliably?',
    options: [
      'A 10% increase in biodiversity value — required for most new developments through planning',
      'Within about 80–110% of its rated voltage — too low and it chatters, too high and it overheats.',
      'A small peer group that meets regularly to share challenges, ideas, and hold each other accountable',
      'The fraction of dangerous undetected failures that the proof test is capable of detecting',
    ],
    correctAnswer: 1,
    explanation:
      'Coils have a "pickup" and a "hold" voltage. Below pickup the relay won’t pull in. Above about 110% the coil overheats. Datasheets quote operating ranges — usually 80–110% of nominal. Same logic for contactors: that’s why coil voltages are matched to control circuit voltages (24, 110, 230, 400 V).',
  },
  {
    id: 2,
    question: 'You’re replacing a 3-phase contactor on a compressor running off a 400 V supply. The new contactor’s coil is marked 110 V. Why is that not necessarily wrong?',
    options: [
      'Creates a searchable knowledge repository that enables technicians to find relevant diagnostic information, solutions and preventive measures from past investigations',
      'MHSWR Reg 5 — effective arrangements for planning, organising, controlling, monitoring, reviewing the preventive measures (POCMR). RA is one input; Reg 5 runs the system that operationalises it.',
      'Because the coil voltage is the CONTROL voltage — fed from a control transformer or a different supply, NOT the same as the load voltage being switched. 110 V control is standard in industrial environments for safety.',
      'A classification code assigned to waste based on its hazardous characteristics (e.g., HP1 Explosive, HP3 Flammable, HP5 Toxic, HP14 Ecotoxic) used to determine waste handling requirements',
    ],
    correctAnswer: 2,
    explanation:
      'In industrial work the control circuit is usually run at 110 V (often centre-tapped earth) for shock-protection reasons. The contactor switches the 400 V load but its coil is energised from the 110 V control supply through buttons, sensors and PLC outputs. Match the coil to the control voltage, not the load.',
  },
  {
    id: 3,
    question: 'Standard residential RCDs trip at what residual current?',
    options: [
      '100 mA',
      '10 mA',
      '300 mA',
      '30 mA',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 requires additional protection by an RCD with a rated residual operating current not exceeding 30 mA for socket outlets, mobile equipment used outdoors, and final circuits supplying luminaires in domestic premises. 30 mA is the threshold below which a healthy adult can still let go.',
  },
  {
    id: 4,
    question: 'What’s the headline difference between a Type AC, Type A and Type B RCD?',
    options: [
      'They detect different fault current waveforms — Type AC: sinusoidal AC only. Type A: AC + pulsating DC. Type B: AC + pulsating DC + smooth DC. Modern installs with EVs/inverters need Type A or B.',
      'An advanced system where each detector continuously reports its analogue sensor value to the control panel, allowing the panel to monitor trends, set dynamic thresholds, and make intelligent alarm decisions',
      'That the relay settings match the protection coordination study and the relay operates correctly when tested with a secondary injection test set',
      'To manage, schedule, and record all maintenance activities, including work orders, asset history, spare parts inventory, and maintenance KPIs',
    ],
    correctAnswer: 0,
    explanation:
      'The "type" describes which fault waveforms the RCD can reliably detect. Old Type AC misses pulsating DC faults — common with electronic loads. Type A is now the minimum default in domestic; Type B is needed where DC fault current is possible (most EV chargers, some PV inverters).',
  },
  {
    id: 5,
    question: 'What does an AFDD detect that an RCD doesn’t?',
    options: [
      'No, towers must always be erected on firm, level ground — the base must be levelled using adjustable legs within the manufacturer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s specified range',
      'The high-frequency electrical noise (the "spectral signature") of an arc fault — a loose terminal or damaged cable arcing inside an enclosure.',
      'A code of practice for fire safety in the design, management, and use of buildings, providing a risk-based framework as an alternative to Approved Document B',
      'A tie arrangement using tubes and couplers to form a box shape around a structural element, connecting the scaffold to the building',
    ],
    correctAnswer: 1,
    explanation:
      'RCDs see leakage to earth. AFDDs see series and parallel arcs that don’t leak to earth — the kind of fault that causes electrical fires. Inside the AFDD a microcontroller samples the current waveform thousands of times a second and analyses it for arc signatures.',
  },
  {
    id: 6,
    question: 'Which BS 7671 chapter covers Surge Protection Devices (SPDs)?',
    options: [
      'National Access and Scaffolding Confederation',
      'Disconnect all loads and test for earth faults',
      'Section 443 (with installation rules in 534)',
      'Dust, moisture and corrosive substances',
    ],
    correctAnswer: 2,
    explanation:
      'BS 7671 Section 443 sets when an SPD is required (based on a risk assessment). Section 534 covers selection and installation. Recent amendments push SPDs much closer to "always required" in domestic — the risk-assessment route is rarely going to come back as "not needed".',
  },
  {
    id: 7,
    question: 'Why do SPD installation rules say connecting conductors must be kept "as short and as straight as possible"?',
    options: [
      'Structured therapy that involves carefully and gradually processing the traumatic memory, challenging unhelpful trauma-related beliefs, and developing coping strategies — typically over 8 to 12 sessions',
      'Prioritising improvements to the building\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s thermal envelope (insulation, airtightness, glazing) before adding renewable energy technologies or complex mechanical systems',
      'Raise a Request for Information (RFI), record the conflict in the design log, propose a resolution that maintains BS 7671 and CDM safety, and only proceed once the resolution is recorded by the Principal Designer.',
      'Because surge currents rise so quickly that even a few centimetres of conductor adds significant inductive impedance, raising the voltage the equipment downstream sees.',
    ],
    correctAnswer: 3,
    explanation:
      'BS 7671 specifically requires SPD connecting conductors to be kept short and straight — long loops add inductance, and at the steep wavefront of a surge that inductance creates extra voltage. A poorly installed SPD can be worse than no SPD because the surge bypasses it.',
  },
  {
    id: 8,
    question: 'Inside a contactor, what makes the contacts physically pull in when energised?',
    options: [
      'An electromagnet — the energised coil pulls a moving iron armature, which carries the moving contacts onto the fixed contacts.',
      'Following up shows genuine care, confirms the resolution was satisfactory, and can transform a complaint into lasting loyalty',
      'A scheduled time-controlled load (such as a frost stat or boiler) with cumulative leakage current pushing the circuit over the trip threshold',
      'Fail (minimum 1 MΩ for LV) — investigate insulation degradation, moisture ingress, damaged cables or connected equipment that should have been disconnected',
    ],
    correctAnswer: 0,
    explanation:
      'Coil + iron core = electromagnet. Energise the coil and the magnetic flux pulls the armature. De-energise and a return spring throws the armature back. Same physics in every relay and contactor on every site for the last hundred years.',
  },
];

const faqs = [
  {
    question: 'When do I use a relay vs a contactor?',
    answer:
      'Rule of thumb: under about 16 A and a few hundred watts, a relay does the job — driven from a control PCB or a small DIN-rail relay base. Above that, especially for motors, heaters or anything three-phase, fit a proper contactor. Contactors are built for the high making/breaking currents of inductive loads and have proper arc-quenching arrangements built in.',
  },
  {
    question: 'Why do contactor coils come in 24, 110, 230 and 400 V variants?',
    answer:
      'To match the control circuit voltage on the panel. 24 V is common with PLCs and BMS. 110 V (often 55-0-55 to earth) is standard on UK construction sites and many industrial panels. 230 V is fine for simple fixed installations. 400 V coils exist for direct phase-to-phase control. The contactor body is the same — only the coil winding changes.',
  },
  {
    question: 'How does an RCD know it’s been tested vs a real fault?',
    answer:
      'It doesn’t care. The test button injects a small current through a deliberate resistor across line and earth, creating an artificial imbalance just like a real fault. The RCD trips. That’s why the test button only works when the device is energised — and why pressing it monthly is genuinely the right thing to do.',
  },
  {
    question: 'Are AFDDs going to be mandatory in all new installations?',
    answer:
      'BS 7671 currently mandates AFDDs in specific high-risk locations (high-rise residential buildings, care homes, premises with sleeping accommodation in some cases) and recommends them more widely. The trend is unmistakably towards more circuits requiring them. They\'re prohibited in medical locations of group 0 and 2 — refer to Reg 710.421.1.7 for the detail.',
  },
  {
    question: 'Why does my SPD have a "status indicator" on the front?',
    answer:
      'Because SPDs are sacrificial — every surge they absorb degrades the internal MOV slightly. Eventually they reach end of life. The window changes colour (usually green to red) to tell you the SPD has done its job and now needs replacing. Check it every periodic inspection. A red-window SPD is no protection at all.',
  },
  {
    question: 'What\'s a smart RCBO and how is it different from a normal RCBO?',
    answer:
      'A normal RCBO combines an MCB and an RCD in one module. A "smart" RCBO adds electronics — wireless or wired comms back to a central hub, energy monitoring, remote on/off, sometimes built-in arc fault detection. Inside you\'ve got a rectifier, a microcontroller, a small radio chip and a relay — every component family from this whole section, all packaged into one DIN-rail device.',
  },
];

export default function Sub6() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 2 · Section 6 · Subsection 6"
            title="Real on-site electronics — relays, contactors, RCD/AFDD, SPDs"
            description="Pull the previous five subs together. Inside every modern protective device on a UK installation, you’ll find resistors, diodes, capacitors, transistors and sensors — wired around an electromagnetic relay or contactor."
            tone="emerald"
          />

          <TLDR
            points={[
              'A relay is a small coil-operated switch (PCB or DIN-rail). A contactor is the heavy-duty version for kW-level loads, usually three-pole, with arc-quenching contacts.',
              'RCDs use a current transformer + sense coil to spot earth leakage. Type AC, A or B depending on the fault waveforms they can detect. 30 mA is the residential standard.',
              'AFDDs use a rectifier, sampling chip and signal-analysis software to spot arc fault signatures. SPDs (Section 443) divert surges to earth — keep their leads short and straight (Section 534).',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish a relay from a contactor and explain when you’d use each on site.',
              'Describe the electromagnet-driven contact mechanism inside both, and why coil voltage and load voltage are independent.',
              'Explain how an RCD detects an earth fault using a current transformer and a sense coil.',
              'State the difference between Type AC, Type A and Type B RCDs and when each is required.',
              'Describe how an AFDD detects an arc fault that an RCD wouldn’t see, and cite Reg 421.1.7.',
              'Explain the function of a Surge Protection Device (SPD) and the BS 7671 installation rule that connecting conductors be kept short and straight.',
            ]}
            initialVisibleCount={3}
          />

          <ConceptBlock
            title="Where this Sub fits in Section 6"
            plainEnglish="The first five Subs covered the components in isolation. This one puts every one of them into the same enclosure on a real distribution board."
          >
            <p>
              Sub6.1 introduced resistors as your circuit’s traffic-control. Sub6.2 added diodes
              (one-way valves). Sub6.3 brought in capacitors (energy buckets). Sub6.4 explained
              transistors (small signal switches a big load). Sub6.5 covered sensors (turn the
              world into voltage). This Sub puts every one of those into the consumer unit on a
              real distribution board — wired around the relays, contactors, RCDs, AFDDs and SPDs
              you fit on every job.
            </p>
            <p>
              The MFT you met in Sub1.5 is what you’ll use to verify any of the protection devices
              in this Sub — push-button trip test, IΔn measurement, ramp test, all in one
              instrument.
            </p>
          </ConceptBlock>

          <ContentEyebrow>Relays and contactors</ContentEyebrow>

          <ConceptBlock
            title="The electromagnetic switch — old idea, still everywhere"
            plainEnglish="A coil pulls a piece of iron, the iron drags a set of contacts shut. Take the coil power away, a spring throws them back open. That’s a relay AND a contactor, just at different scales."
            onSite="Same component family from doorbell relays in the 1970s to a 400 A motor contactor on a chiller plant today. Bigger only changes the contact size and the arc chute."
          >
            <p>
              A <strong>relay</strong> is a small electromagnetically operated switch. A coil
              wound around a soft-iron core pulls in a moving armature when energised; the armature
              carries one or more contact pairs onto fixed contacts, completing a separate circuit.
              De-energise the coil and a spring throws the armature back, opening the contacts.
            </p>
            <p>
              A <strong>contactor</strong> is the same thing built bigger — typically with three or
              four power poles for switching motors and heaters, plus auxiliary contacts for
              control logic. Contactors have proper arc chutes (insulating barriers and magnetic
              "blowouts" that stretch and quench the arc as the contacts open under load).
            </p>
            <div className="flex justify-center pt-2 gap-3 flex-wrap">
              <RelaySymbol label="Relay (SPDT)" />
              <ContactorSymbol label="3-phase contactor" />
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Coil voltage ≠ load voltage"
            onSite="A 110 V coil contactor on a 400 V three-phase compressor is the standard industrial fit. Coil sees 110 V from the control circuit; the contacts switch 400 V to the motor. Two separate worlds."
          >
            <p>
              The coil voltage is the <strong>control</strong> voltage — the signal that tells the
              contactor to operate. The contact ratings are the <strong>load</strong> voltage and
              current — what the contacts can switch safely. They’re independent, and that’s
              deliberate.
            </p>
            <p>
              On a typical industrial panel:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>24 V DC coil</strong> — driven from a PLC output, BMS controller or smart
                relay module. Common in modern automation.
              </li>
              <li>
                <strong>110 V AC coil</strong> — standard for UK construction sites and most
                industrial control panels. The 110 V supply is centre-tapped earth so worst-case
                shock is 55 V.
              </li>
              <li>
                <strong>230 V AC coil</strong> — simpler fixed installations where control comes
                straight from the same 230 V single-phase supply as the load.
              </li>
              <li>
                <strong>400 V AC coil</strong> — occasionally used for direct phase-to-phase
                control on three-phase systems.
              </li>
            </ul>
            <p>
              Inside the coil itself there’s a fair bit of inductance — the same physics covered
              way back in Section 5 — which is why switching the coil off can produce a back-EMF
              spike. That’s the reason you’ll see a small flyback diode (DC coils) or RC snubber
              (AC coils) wired across the coil terminals on most modern parts.
            </p>
            <div className="flex justify-center pt-2">
              <InductorSymbol label="Coil — inductance produces back-EMF when switched" />
            </div>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Chapter 53 (Protection, isolation, switching, control and monitoring)"
            clause="This chapter (Chapter 53) deals with general requirements for protection, isolation, switching, control and monitoring and with the requirements for selection and erection of the devices provided to fulfil such functions."
            meaning={
              <>
                Every relay and contactor switching a load on a UK installation has to comply with
                Chapter 53. Pick parts certified for the job, sized for the actual load (with
                margin for inrush) and rated for the duty cycle. A relay rated AC1 (resistive
                loads) will fail early on AC3 (motor) duty even if the steady-state current looks
                OK on paper.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 53."
          />

          <VideoCard
            url={videos.relays.url}
            title={videos.relays.title}
            channel={videos.relays.channel}
            duration={videos.relays.duration}
            topic="Relays · Unit 202 LO6.1"
            caption="Optional deeper dive — Engineering Mindset shows the coil pulling in the armature, the contacts closing, and how the same idea scales up to industrial contactors. Easier to grasp visually."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Inside an RCD</ContentEyebrow>

          <ConceptBlock
            title="Spotting earth leakage with a current transformer"
            plainEnglish="A toroidal core wraps around line and neutral. Healthy circuit = balanced = nothing happens. Leakage to earth = imbalance = induced current = trip."
          >
            <p>
              An RCD’s core technology is dead simple in principle. A toroidal (ring-shaped) iron
              core surrounds both the line and neutral conductors. In a healthy circuit, the line
              current flowing one way exactly equals the neutral current flowing the other way —
              the magnetic fluxes cancel and there’s no net flux in the core.
            </p>
            <p>
              If some current leaks to earth (through a person, through a fault), then line and
              neutral no longer balance. The difference creates a net flux in the core, which
              induces a tiny current in a sense winding wound around the same core. That sense
              current feeds an electronic trip circuit — once it crosses the threshold (30 mA for
              a domestic RCD), the trip coil energises, the latch releases, and the contacts open.
            </p>
            <p>
              All of this happens in roughly 25–40 ms — fast enough that even a serious shock
              current is interrupted before it crosses the threshold for ventricular fibrillation.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.4 (Additional protection for AC final circuits supplying luminaires — domestic)"
            clause="Within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires."
            meaning={
              <>
                30 mA is the residential standard — below the 30–80 mA range where a healthy adult
                can no longer let go of a live conductor. BS 7671 also requires ≤30 mA RCDs on
                socket outlets up to 32 A, mobile equipment used outdoors, and (now) lighting
                circuits in dwellings. There’s effectively no domestic final circuit left where
                30 mA RCD protection is optional.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.4."
          />

          <ConceptBlock
            title="Type AC, Type A, Type B — which fault waveforms it can see"
            onSite="A Type AC RCD on an EV charger is non-compliant and dangerous. The DC component of an EV fault can magnetically saturate the toroidal core, blinding the RCD to a real AC fault on the same circuit."
          >
            <p>
              The "type" classification tells you which fault current waveforms the RCD can
              reliably detect:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Type AC</strong> — sinusoidal AC only. Now considered obsolete for most
                domestic applications because nearly every electronic load can produce
                non-sinusoidal fault currents.
              </li>
              <li>
                <strong>Type A</strong> — AC plus pulsating DC. The new domestic default. Handles
                fault waveforms from electronic loads (LED drivers, smart switches, washing
                machines).
              </li>
              <li>
                <strong>Type F</strong> — like Type A but rated for higher-frequency components,
                used with single-phase variable-speed drives.
              </li>
              <li>
                <strong>Type B</strong> — AC + pulsating DC + smooth DC. Required on EV charge
                points (Type 2 charging where the car’s onboard charger can produce DC fault
                current) and many three-phase variable-speed drives.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Inside an AFDD</ContentEyebrow>

          <ConceptBlock
            title="Spotting arcs the RCD can’t see"
            plainEnglish="An RCD only sees current going to earth. An arc fault between two conductors (loose terminal, damaged cable) doesn’t leak to earth — the RCD never sees it. The AFDD does."
            onSite="Series arcs (loose terminal in a socket) and parallel arcs (damaged twin-and-earth between cores) are leading causes of electrical fires. AFDDs are mandated by Reg 421.1.7 in specific high-risk locations and recommended much more widely."
          >
            <p>
              An AFDD is built around the same chassis as a normal MCB or RCBO, but it adds a
              small electronics package: a bridge rectifier feeding a switched-mode supply, a
              current sensor, a microcontroller and signal-processing software. The microcontroller
              samples the current waveform thousands of times per second, looking for the
              characteristic high-frequency spectral signature of an arc — random, broadband
              "hash" on top of the smooth 50 Hz fundamental.
            </p>
            <p>
              The clever part is discrimination. Brush motors (vacuums, hairdryers, drills),
              switching power supplies and even ordinary light switches turning on all produce
              short bursts of arc-like noise. The AFDD has to ignore those (or it nuisance trips)
              while still spotting genuine sustained arcs from a fault. That’s where the BS EN
              62606 test profile comes in — it’s the standard the device has to meet.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 421.1.7 (paraphrased)"
            clause="Regulation 421.1.7 has been introduced recommending the installation of arc fault detection devices (AFDDs) to mitigate the risk of fire in AC final circuits of a fixed installation due to the effects of arc fault currents. Arc fault detection devices used to meet the requirements of this Regulation shall conform to BS EN 62606."
            meaning={
              <>
                Reg 421.1.7 mandates AFDDs in specified higher-risk locations (high-rise
                residential, premises with sleeping accommodation in certain cases) and recommends
                them more widely. Whatever AFDD you fit must conform to BS EN 62606 — you can’t
                substitute a generic device. Note also Reg 710.421.1.7: AFDDs shall NOT be used in
                medical locations of groups 0 and 2.
              </>
            }
            cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Part 4, Chapter 42, Regulation 421.1.7 for the full text."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Surge protection — SPDs</ContentEyebrow>

          <ConceptBlock
            title="The component that does nothing 99.99% of the time"
            plainEnglish="Sits there as a high impedance under normal voltage. The instant a surge appears, it switches to a low impedance and dumps the energy to earth. Then it goes back to invisible."
          >
            <p>
              A Surge Protection Device is built around a non-linear element — typically a metal
              oxide varistor (MOV), a gas discharge tube, or both in combination. At normal supply
              voltage it acts as a near-open circuit: tiny leakage, no effect on the installation.
              The moment the line-to-earth voltage exceeds its threshold (usually a few hundred
              volts above peak nominal), the device clamps — voltage held down, surge current
              diverted to earth.
            </p>
            <p>
              Surges come from two main sources:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Atmospheric (lightning)</strong> — a strike up to a kilometre away can
                induce thousands of volts on the supply line in microseconds.
              </li>
              <li>
                <strong>Switching</strong> — large inductive loads (motors, transformers) being
                switched on and off generate transients that ripple through the local network.
              </li>
            </ul>
            <p>
              An SPD on the consumer unit absorbs both, sparing the (much more vulnerable) modern
              electronic loads downstream — LED drivers, EV chargers, smart RCBOs, computers, the
              boiler PCB.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 534.4.10 (Connecting conductors of SPDs) (paraphrased)"
            clause="Conductors between SPDs and the main earthing terminal or the protective conductor shall have a cross-sectional area not less than: (a) 6 mm² copper or equivalent for Type 2 SPDs installed at or near the origin of the installation; (b) 16 mm² copper or equivalent for Type 1 SPDs installed at or near the origin of the installation. Conductors connecting SPDs and the OCPDs to live conductors shall be rated to withstand the prospective short-circuit current to be expected, with a minimum of 2.5 mm² (Type 2) or 6 mm² (Type 1). Industry guidance: leads shall be kept as short and straight as practicable to minimise the additional inductive voltage drop noted in Regulation 534.4.4.2."
            meaning={
              <>
                A surge has an extremely fast wavefront. Every centimetre of conductor adds
                inductance, and across that inductance the surge induces voltage. Long, looped or
                badly dressed SPD leads can mean the equipment downstream still sees most of the
                surge — making the SPD pointless. Keep the install tight: shortest practical run,
                straight in/straight out, no loops, and meet the minimum CSA in 534.4.10.
              </>
            }
            cite="Verbatim wording paraphrased — see BS 7671:2018+A4:2026 Part 5, Chapter 53, Regulation 534.4.10 for the conductor sizing requirements; lead-length guidance is given in Regulation 534.4.4.2 and the IET Guidance Note GN8."
          />

          <ConceptBlock
            title="SPDs are sacrificial — check the indicator"
            onSite="That little window on the front of the SPD — green = healthy, red = end of life. Every periodic inspection, look at it. A red-window SPD provides zero protection."
          >
            <p>
              Each surge degrades the MOV slightly. Big surges degrade it a lot. Eventually the
              device reaches end of life and stops clamping properly. The indicator window is your
              only warning. Plug-in SPDs are designed to be swapped out (no need to disturb the
              wiring); fixed SPDs need to be isolated and replaced like any other consumer-unit
              module.
            </p>
            <div className="flex justify-center pt-2">
              <SwitchSymbols type="SPST" label="SPD trigger — effectively a fast switch to earth" />
            </div>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Putting it all together</ContentEyebrow>

          <ConceptBlock
            title="Inside a modern smart consumer unit"
            onSite="Open one and tick off every component family from this whole section. Resistors. Diodes. Capacitors. Transistors. Sensors. Relays. Coils. SPDs. All in one DIN-rail enclosure."
          >
            <p>
              A modern consumer unit fitted to current BS 7671 might contain:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                A main switch — a heavy-duty <strong>contactor-style</strong> isolator.
              </li>
              <li>
                One or more <strong>SPDs</strong> at the origin — MOVs and gas tubes wired
                line-to-earth, neutral-to-earth, with short and straight connecting conductors.
              </li>
              <li>
                A row of <strong>RCBOs</strong>, each containing an RCD (current transformer +
                sense coil + electronics) and an MCB (thermal-magnetic trip). Type A or B
                depending on the load.
              </li>
              <li>
                Possibly an <strong>AFDD</strong> on circuits where Reg 421.1.7 mandates one —
                with rectifier, microcontroller and signal processing inside.
              </li>
              <li>
                Possibly a <strong>smart RCBO</strong> with energy monitoring and remote
                comms — add a radio chip and an LED driver to the list above.
              </li>
            </ul>
            <p>
              You don’t design any of this. But every time you fit, swap or fault-find one of
              these devices, you’re putting your signature next to it. Knowing what’s inside
              — down to the component families covered in this whole section — is what makes you
              competent rather than just trained.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating an SPD like an MCB and bunching its leads to fit the cover"
            whatHappens={
              <>
                You’re fitting a consumer-unit SPD. The leads come long, you bunch them up
                neatly inside the enclosure to make the lid go on. A surge hits the supply, the
                SPD does its job, but the connecting-lead inductance has already let several
                hundred extra volts through to the customer’s smart RCBOs and EV charger.
              </>
            }
            doInstead={
              <>
                BS 7671 Section 534 requires the connecting-conductor length to be kept to a
                minimum — preferably under 0.5 m total, never above 1.0 m. Cut the leads to the
                shortest practical length, route them straight, and accept that the install looks
                a bit less tidy than a coiled bundle. The surge protection has to function, not
                just exist.
              </>
            }
          />

          <Scenario
            title="Replacing a contactor on a 3-phase compressor"
            situation={
              <>
                The compressor on a small workshop has a failed 4-pole contactor. The supply is
                400 V three-phase. The original contactor has a 110 V coil. The customer says
                "just put another one in" and you’ve got a 230 V coil version on the van.
              </>
            }
            whatToDo={
              <>
                Don’t fit it. The 110 V coil is fed from a control transformer (or 110 V CTE
                supply) inside the panel — swap to a 230 V coil and the existing control circuit
                will either burn out the new coil (if it’s only providing 110 V) or work at half
                pull-in force and chatter. Either get the matching 110 V part from the local
                wholesaler or, if the customer wants you to convert, design and install the right
                supply for the new coil. Don’t bodge.
              </>
            }
            whyItMatters={
              <>
                Coil voltage and load voltage are independent for a reason. Mixing them up is one
                of the most common contactor-related faults you’ll see, and it’s genuinely
                dangerous on industrial kit.
              </>
            }
          />

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Module 2 capstone</ContentEyebrow>

          <ConceptBlock
            title="Module 2 in one job — kitchen extension end-to-end"
            plainEnglish="A real apprentice scenario that pulls every Section in this module into one continuous build."
            onSite="The customer doesn’t care which section of which module covers what. They want the kitchen done. Module 2 is what lets you do it without a single educated guess."
          >
            <p>
              The customer wants a kitchen extension. New circuits to install: a 9.5 kW electric
              shower (this is for the en-suite off the back of the same job), a 7 kW oven, four
              8 W LED downlights and a couple of sockets fed from a 32 A radial. The CU is in the
              hall; the new sub-board lives in the kitchen, 22 m of SWA away on a tray run through
              the loft. Walk through every Section of Module 2 in turn — every one of them feeds
              into this single job.
            </p>
            <p>
              <strong>Section 1 — units and quantities.</strong> Convert each load to current at
              230 V. The shower draws 9500 W ÷ 230 V = <strong>41.30 A</strong>. The oven 7000 ÷
              230 = <strong>30.43 A</strong>. The four LED downlights at 8 W each total 32 W —
              with a power factor around 0.9 that’s about <strong>0.15 A</strong>, vanishingly
              small. The sockets, after diversity, sit around <strong>13 A</strong>. Section 1
              gave you the unit conversions and the sense of scale to spot which circuit is
              actually the heavyweight (the shower, by miles).
            </p>
            <p>
              <strong>Section 2 — mechanics.</strong> The 22 m of SWA from the CU to the new
              sub-board has to physically get up into the loft, along the tray, and back down into
              the kitchen. The drum weighs around 25 kg — Sub2.1 set the lifting limits and Sub2.3
              walked through the SWA-up-the-riser routine. You won’t solo-lift that drum into the
              loft; you’ll get the labourer on the other end of it. None of this is in the
              regulations — it’s in Module 2 because it’s the part the regs assume you already
              know.
            </p>
            <p>
              <strong>Section 3 — R, V, I.</strong> Now check the SWA is big enough. Pick 10 mm²
              two-core+earth Cu SWA. From Sub3.4’s Method B table, 10 mm² is{' '}
              <strong>4.4 mV/A/m</strong>. At full shower current on a 22 m run:
              Vd = (4.4 × 41 × 22) ÷ 1000 = <strong>3.97 V</strong>, which is{' '}
              <strong>3.97 ÷ 230 = 1.73%</strong> — well inside the 5% non-lighting limit. Then
              Sub3.5’s I²R sanity check: with Vd = 3.97 V across the whole loop at 41 A, the
              power dissipated as heat in the cable run is V × I = 3.97 × 41 ≈{' '}
              <strong>163 W</strong>. That’s why the SWA needs the tray and the air gap — 163 W
              of low-grade heat sitting in roof insulation is exactly how cables cook.
            </p>
            <p>
              <strong>Section 4 — DC circuits, series and parallel.</strong> Look at the lighting
              circuit on its own. The four LED downlights wire in <em>parallel</em> across the
              switched live and the neutral — Section 4.3’s rule. That means the branch current
              through the cable feeding them is the <em>sum</em> of each driver’s current, not
              divided between them: 4 × ~0.04 A ≈ 0.15 A total. Section 4.6’s KVL/KCL sanity
              check still applies — what goes in at the JB has to come back out, drivers and all.
            </p>
            <p>
              <strong>Section 5 — AC origin.</strong> The 230 V at the cut-out is an{' '}
              <em>RMS</em> value — Sub5.6 explained that the actual peak voltage on each cycle is{' '}
              <strong>230 × √2 = 325 V</strong>. The LED drivers’ input rectifier (Sub6.2)
              has to be rated to handle that 325 V peak — the smoothing capacitor (Sub6.3)
              downstream of it sits charged near that peak. The shower element, by contrast, just
              heats with the RMS value: P = V²/R, RMS in, real power out, no peak nonsense
              involved.
            </p>
            <p>
              <strong>Section 6 — electronic kit on the board.</strong> The new sub-board needs an
              RCD — Sub6.6 (this Sub) pinned that down to <strong>Type A as the minimum</strong>{' '}
              because the LED drivers and oven electronics generate pulsating DC fault currents
              that a Type AC would miss. The shower circuit gets its own RCBO; if the
              manufacturer specifies it, that’s a <strong>Type B</strong>. An <strong>SPD</strong>{' '}
              sits at the sub-board origin to clamp surges before they reach the drivers. Inside
              each downlight driver there’s a bridge rectifier (Sub6.2 — diodes) feeding a
              smoothing capacitor (Sub6.3). Recognise all of those because Section 6 has just
              walked you through the component families they’re built from.
            </p>
            <p>
              Every Sub in Module 2 just helped you spec, install and verify one extension. That’s
              the point of the module — not 35 disconnected topics, one continuous build.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="What’s next — Module 3: Wiring systems"
            plainEnglish="Module 2 gave you the principles. Module 3 turns them into the install."
          >
            <p>
              You’ve specced the kitchen extension on paper. Module 3 is where you actually put
              it in the wall.
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                How that 22 m SWA run actually gets installed — clipped direct, on cable tray, in
                trunking, in conduit — and the mechanical-protection rules behind each method.
              </li>
              <li>
                Three-phase distribution (the proper version of Sub5.6’s preview) — how 400 V
                between phases turns into 230 V at the socket, and how a balanced three-phase
                load behaves on the supply.
              </li>
              <li>
                Consumer units and sub-boards in detail — RCBO and AFDD selection, breaking
                capacity, busbar configuration, neutral arrangement.
              </li>
              <li>
                Special locations — bathrooms, kitchens, outdoors, agricultural premises,
                marinas — where the BS 7671 rules tighten and the zoning starts to matter.
              </li>
              <li>
                The cable-selection process end-to-end — Method A and Method B from Sub3.4
                applied to real sub-mains and final circuits, with all the correction factors
                BS 7671 makes you apply.
              </li>
            </ul>
            <p>
              Module 3 takes everything you’ve just learned and shows you how to install it
              properly.
            </p>
          </ConceptBlock>

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Relays and contactors are both coil-driven electromagnetic switches — contactors are just bigger, with arc chutes and proper power ratings.',
              'Coil voltage is independent of load voltage. Match the coil to the control circuit (24/110/230 V), not to the load it switches.',
              'An RCD detects earth leakage by comparing line and neutral currents through a toroidal core. 30 mA is the residential standard (BS 7671 Reg 411.3.4).',
              'Type AC, A and B RCDs detect different fault waveforms. Modern installs need at least Type A; EV chargers need Type B.',
              'AFDDs (Reg 421.1.7, BS EN 62606) detect the high-frequency signature of arc faults that an RCD never sees — a key fire-safety device.',
              'SPDs (Section 443/534) divert surges to earth. Connecting-conductor length must be kept to a minimum (preferably under 0.5 m, never above 1.0 m), and the status indicator must be checked at every periodic inspection.',
            ]}
          />

          <Quiz title="On-site electronics — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module2/section6/6-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                6.5 Sensors — LDR, thermistor
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 3 — Wiring systems and enclosures →
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
