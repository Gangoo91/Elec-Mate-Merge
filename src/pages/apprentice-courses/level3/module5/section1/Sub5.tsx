/**
 * Module 5 · Section 1 · Subsection 5 — Safe isolation at Level 3 depth
 * Maps to C&G 2365-03 / Unit 304 / LO1 / AC 1.2, 1.3, 1.4, 1.5, 1.6 + LO8 / AC 8.1, 8.2, 8.3
 *   AC 1.2 — "specify the appropriate procedure for completing safe isolation"
 *   AC 1.3 — "state the reasons for carrying out safe isolation"
 *   AC 1.6 — "identify the Health and Safety requirements which apply when inspecting, testing and commissioning"
 *
 * Layered depth: 2357 Unit 607 ELTK06 / AC 1.1, 1.2, 1.3, 1.4, 1.5; 2366-03 Unit 302 / AC 1.1-1.5
 *
 * The L3 lift on safe isolation. L2 covered the JIB sequence. L3 covers
 * three-phase isolation, multi-supply isolation (PV / generators / UPS),
 * permits to work, and the implications across personnel/clients/public.
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Safe isolation at Level 3 depth | Level 3 Module 5.1.5 | Elec-Mate';
const DESCRIPTION =
  'Three-phase isolation, multi-supply isolation (PV, generators, UPS), permits to work, and the safety-system thinking that turns the JIB sequence into a robust safe-system-of-work for inspection and testing.';

const checks = [
  {
    id: 'm5-s1-sub5-tp-isolation',
    question: 'Safe isolation of a three-phase circuit requires you to prove dead between:',
    options: [
      'National Grid Electricity Transmission (NGET) — the transmission owner. The independent operator is now the National Energy System Operator (NESO).',
      'The energy efficiency rating of a building on a scale from A (most efficient) to G (least efficient), along with recommendations for improvement',
      'Each line conductor (L1, L2, L3) to neutral, each line conductor to earth, and between every pair of line conductors (L1-L2, L2-L3, L1-L3) — ten readings minimum to confirm absolute isolation.',
      'Prevent condensation forming on components during cold periods when the panel is not in use, avoiding moisture-related insulation failures',
    ],
    correctIndex: 2,
    explanation:
      'Three-phase proving dead requires checking every conductor pair: L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, L1-L2, L2-L3, L1-L3 — and N-E for completeness. A single reading is not enough because a fault could leave one line still energised while another reads dead. Use a two-pole voltage indicator to GS38 with a known-good supply for prove/test/prove.',
  },
  {
    id: 'm5-s1-sub5-multi-supply',
    question: 'A commercial site has solar PV, a standby generator, and a UPS. To safely isolate a circuit fed from the main board:',
    options: [
      'Identify ALL sources that could feed the circuit (mains, PV, generator, UPS), isolate every source point, lock off every isolator, and prove dead at the work location after every isolation step.',
      'No, towers must always be erected on firm, level ground — the base must be levelled using adjustable legs within the manufacturer\\\\\\\\\\\\\\\'s specified range',
      'Inadequate training on motor maintenance, failure to follow lubrication procedures, incorrect torque applied during installation, or fatigue causing errors during commissioning',
      'Information about the existing site, including ground conditions, existing structures, hazardous substances (such as asbestos), and any relevant survey results',
    ],
    correctIndex: 0,
    explanation:
      'Multi-source installations (PV, generator, UPS) can backfeed circuits even with the main switch off. Identify every source via single-line diagram and physical inspection, isolate each one, lock off, prove dead at the work location AFTER all isolations. The prove-test-prove sequence with a known-good supply is essential because the test instrument itself could be at fault.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'A "permit to work" is required when:',
    options: [
      'A massive increase in renewable generation, heat pumps, EV charging and battery storage — all requiring installation, maintenance and integration by electrical technicians, making emerging technology skills essential for the ST1426 maintenance technician',
      'The work involves additional risks beyond routine activities — typically live work, work on or near HV, work in confined spaces, work in dangerous atmospheres, or work where multiple trades interact and conflicts must be controlled.',
      'Shadowing commercial electricians (vicarious experience), completing small commercial tasks under supervision (mastery experience), and managing anxiety about the transition (emotional regulation)',
      'Designer (Reg 132.13 design pack) → installer (as-built records, mark-ups, materials register) → tester (Schedule of Test Results, RCD/Zs witness sheets) → certifier (EIC top-level signed declarations) → customer (full O&M pack including all of the above).',
    ],
    correctAnswer: 1,
    explanation:
      'Permit to work is a formal documented system for managing high-risk activities. It assigns responsibility, documents the precautions, identifies the permitted scope and time, and provides a sign-off mechanism for safe completion. Routine LV electrical work usually does not need a permit. Live work on commercial systems, HV switching, and work in atmospheres or confined spaces typically does. The permit is the paper trail that demonstrates control of the risk.',
  },
  {
    id: 2,
    question: 'GS38 (HSE Guidance Note) addresses:',
    options: [
      'Allow proper stabilisation time, control environmental conditions, check for mechanical wear or electrical noise, and implement shielding if necessary',
      'Process them only for the agreed purpose (the cert), store them securely, share only with parties who need them (e.g. landlord, scheme provider), and have a privacy notice telling the customer what you do with their data',
      'Test equipment leads, probes and accessories — limiting exposed metal at the probe tip, fused leads, no clip ends for live testing, current limiters, and the requirement for prove/test/prove on a known-good supply.',
      'Ongoing, consistent maintenance of healthy habits, relationships, and coping strategies — treating wellbeing as a continuous practice, not a destination',
    ],
    correctAnswer: 2,
    explanation:
      'HSE GS38 specifies test lead and probe safety: fused leads, retractable shrouded probes (max 4mm exposed metal), no crocodile clip terminations on live conductors, finger barriers, and the prove-test-prove method using a known-good voltage source. Compliance with GS38 is the standard expected by HSE for any live verification testing.',
  },
  {
    id: 3,
    question: 'A two-pole voltage indicator (rather than a multimeter) is preferred for proving dead because:',
    options: [
      'You’re at the OSG limit. Adding more cables breaches the fill factor and likely the cable grouping (Cg) derate too — you need bigger trunking or a separate run',
      'New circuits; consumer unit replacements; work in special locations (kitchens were removed from notifiable in 2013, but work in bathrooms / outdoors / swimming pools etc remains). Must be done by Competent Person Scheme registered installer OR notified to building control.',
      'Verbally explain what was found and repaired, confirm the equipment is safe to operate, demonstrate correct operation, document the handover, and note any recommendations or limitations',
      'It does not have selectable ranges that can be on the wrong setting, it indicates voltage by direct measurement (no battery dependency for the reading), and most include a current-limited indication that meets GS38.',
    ],
    correctAnswer: 3,
    explanation:
      'Two-pole voltage indicators have a single function — show voltage. No range selector to be wrong on. No risk of being on Ω when you think you are on V. The voltage indication is by physical phenomenon (LED bar from voltage divider, or solenoid lift) and works without battery for the reading itself. Multimeters are still useful for measurements but for prove dead the dedicated voltage indicator is the right tool.',
  },
  {
    id: 4,
    question: 'Lock-off devices on a CU breaker after isolation:',
    options: [
      'Are essential — they prevent re-energisation by another person who might assume the breaker is off because of a tripped fault. Multiple lock-offs allow each person working on the circuit to fit their own padlock.',
      'Visually inspect for storage damage, check the coil resistance, verify the contacts are not corroded or contaminated, ensure the operating mechanism moves freely, and confirm the component is within its shelf-life (if applicable)',
      'Per CAR 2012 Reg 6 (assessment) + Reg 8 (licensed work) + HSE guidance L143. Considers: type of asbestos (chrysotile/amosite/crocidolite); friability; quantity; nature of work (removal vs encapsulation vs observation); duration; exposure level.',
      'Tissue damage caused by current passing through the body OR by arc / flash heating the skin. Internal burns can be severe with small surface marking. Different from thermal burns (cooler at surface; hotter at depth).',
    ],
    correctAnswer: 0,
    explanation:
      'Lock-offs are essential safe-isolation kit. A breaker in the off position is not safe to work on — anyone could flip it back. The lock-off + padlock + tag identifies who has it isolated and prevents re-energisation. Multiple workers each fit their own padlock on a hasp — the circuit cannot be re-energised until every lock is removed. This is fundamental to electrical safe-systems-of-work.',
  },
  {
    id: 5,
    question: 'The implications of NOT isolating before working include risk to:',
    options: [
      'It is denser than air and accumulates at low levels, is an asphyxiant that displaces oxygen, and at higher concentrations acts as a direct toxin affecting the central nervous system',
      'The electrician (shock, burn, arc flash), other personnel on site, customers/clients, the public if the work affects public-accessible parts, and building systems (consequential damage from arc faults, fire spread).',
      'A DC isolator must be provided at each PV array adjacent to the inverter, suitable for switching DC under load and clearly identified for rapid emergency disconnection',
      'Dated photographs (before, during, after), a completed minor works certificate, a witness testimony from the supervising electrician, and a reflective account',
    ],
    correctAnswer: 1,
    explanation:
      'Working live without justification puts everyone at risk: the worker (primary), other trades on site (secondary if arc/fire), occupants/clients/public (tertiary if escape routes affected or fire spreads), and the building systems themselves (cascading failure from one fault to others). EAWR Reg 14 makes dead working the default precisely because the risk extends well beyond the worker.',
  },
  {
    id: 6,
    question: 'When carrying out safe isolation in a domestic property where the occupier is at home, the implications to consider include:',
    options: [
      'Stop immediately. Re-isolate at the correct point. Prove dead again. Investigate why the original isolation was incomplete (wrong device locked off, back-fed circuit, alternative supply source, parallel CPC path, induced voltage). Document the near-miss.',
      's.2 is the duty to employees; s.3 is the duty to non-employees affected by the work — customers, the public, other trades, visitors. On a domestic install it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s s.3 that catches the customer\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s family. On a commercial fit-out it\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s s.3 that catches the trades next to you.',
      'Loss of supply to lighting, heating, refrigeration, medical equipment, computers and security systems. Brief the occupier in advance, plan timing around their needs, provide temporary lighting if needed, and minimise duration.',
      'HSE guidance "Electricity at Work — Safe Working Practices". Detailed practitioner guidance on EAWR compliance including isolation procedures, live working defences, competence and supervision. The non-statutory companion to EAWR.',
    ],
    correctAnswer: 2,
    explanation:
      'Loss of supply has consequences. Refrigerated food at risk if isolation is long. Medical equipment (CPAP machines, dialysis) needs continuity. Computers may lose work or corrupt files. Security systems and alarms may go offline. Heating in winter, lighting in winter evenings — quality of life implications. Brief the client, plan around their needs, provide alternatives where reasonable. Customer service AND duty-of-care concern.',
  },
  {
    id: 7,
    question: 'The implications of safe isolation on building systems can include:',
    options: [
      'USB is a significant attack vector — controls include disabling unused ports, whitelisting approved devices, scanning all media before use, and restricting personal USB devices from OT areas',
      'Evidence in your portfolio of planned approaches, prioritisation decisions, deadline management, and professional communication about timescales — demonstrated through activity logs, reflective accounts and witness statements',
      'Because they extract a much larger quantity of heat from a renewable source (the outside air or ground) than the electricity input would deliver if used for direct resistive heating — typically 3:1, so they massively reduce the carbon footprint of heating.',
      'Loss of fire alarm interfaces, loss of automatic doors, loss of emergency lighting (if isolated), interruption of process equipment, loss of computer-room cooling, loss of safety-critical controls in industrial environments. Plan and brief accordingly.',
    ],
    correctAnswer: 3,
    explanation:
      'Building systems implications are wide. Fire alarm panels may go into fault. Automatic doors stop opening. Emergency lighting batteries kick in but are time-limited. Server rooms overheat without cooling. Industrial process equipment may need controlled shutdown not abrupt power loss. On non-domestic isolation, planning meetings with FM, IT, fire systems, and process owners are routine — the brief is "what happens when this circuit goes dead, and for how long?".',
  },
  {
    id: 8,
    question: 'The prove-test-prove sequence with a known-good supply means:',
    options: [
      'Prove the voltage indicator works on a known live source (often a proving unit), test the conductors at the work location to confirm dead, then re-prove the indicator on the known live source to confirm it didn\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'t fail during the test.',
      'The architect must consider how the glazing will be safely cleaned throughout the building\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s life and, where reasonably practicable, design in safe access solutions such as permanent davit systems, walkways, or access gantries',
      'Complete the portfolio before the gateway is opened — the portfolio is a gateway requirement and must meet the EPAO\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\'s minimum standards before the submission can be made',
      'Identify the discharged cells as defective (sulphation or open internal connection), test specific gravity, and replace as a matched set; never mix new and old cells in a series string',
    ],
    correctAnswer: 0,
    explanation:
      'Prove-test-prove is the standard safe isolation method. Step 1 — confirm the indicator works (on a proving unit or a known live circuit). Step 2 — test the conductors at the work point. Step 3 — re-prove the indicator on the known source to confirm it didn\'t fail (battery die, internal fault) between Steps 1 and 2. Without Step 3, a "dead" reading could just mean a broken indicator. This three-step sequence is the routine for every dead-prove activity.',
  },
];

const faqs = [
  {
    question: 'What is the JIB safe isolation sequence and how does it relate to L3 work?',
    answer:
      'The JIB sequence (Joint Industry Board) is the recognised safe-isolation procedure for LV work: identify, isolate, lock off, prove dead with prove-test-prove. At L2 you learned to apply it on single circuits in dwellings. At L3 you apply it to three-phase systems, multi-source installations, and contexts where the implications extend across multiple parties. The sequence itself doesn\'t change — but the planning around it gets richer.',
  },
  {
    question: 'How does isolation differ on a TT installation vs TN-S/TN-C-S?',
    answer:
      'Mechanically the same — isolate at the consumer unit or origin. The difference is the CONSEQUENCES of isolation. TT installations rely on the local earth electrode and a 30 mA RCD as primary fault protection. Removing supply doesn\'t affect the electrode — but removing earth does (don\'t disconnect the earthing conductor without re-establishing earth before re-energising). On TN systems the supplier provides earth via the supply cable; isolating at the consumer end leaves earth intact upstream.',
  },
  {
    question: 'Can I rely on the main switch being labelled correctly?',
    answer:
      'No. Always physically prove dead at the work location after isolation. Labels can be wrong (mis-labelled at install, modifications since), main switches can fail to open contacts, and even with the right device operated the circuit you intend to work on might be picking up a back-feed from somewhere. Trust labels for guidance; trust your voltage indicator for safety.',
  },
  {
    question: 'What\'s the difference between isolation and switching off?',
    answer:
      'Isolation provides reliable separation between the circuit and every source of supply, with means to prevent re-energisation. Switching off may break the live conductors for normal operation but doesn\'t necessarily provide secure separation, may not isolate the neutral, and typically has no lock-off facility. BS 7671 Section 537 distinguishes the two — isolation is the requirement before working on a circuit; switching is for normal operational control.',
  },
  {
    question: 'What about isolation upstream of the consumer unit — the cut-out fuse?',
    answer:
      'The cut-out fuse (the "100 A main fuse" on the supply side of the meter) belongs to the distributor (DNO). You generally cannot remove it — that\'s the DNO\'s job, with their permission. For work that requires upstream isolation (replacing the meter tails, working on the cut-out itself), arrange with the DNO. For routine work on the consumer\'s side, isolate at the main switch and prove dead — the cut-out remains in place as the upstream protective device.',
  },
  {
    question: 'How do permits to work fit alongside the JIB sequence?',
    answer:
      'They overlap. The permit is the management framework; the JIB sequence is the practical procedure. On a permit-controlled job: the issuing authority confirms the system is in a safe state to work on (often via the JIB isolation), issues the permit, the receiving worker accepts the permit, does the work within scope, returns the permit on completion, the issuing authority restores the system. The permit creates documented accountability; the JIB isolation is the physical safety mechanism. Both are important on commercial/industrial scale.',
  },
];

export default function Sub5() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module5-section1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 1
          </button>

          <PageHero
            eyebrow="Module 5 · Section 1 · Subsection 5"
            title="Safe isolation at Level 3 depth"
            description="Three-phase isolation, multi-source installations (PV, generators, UPS), permits to work, and the safety-system thinking around inspection and testing."
            tone="emerald"
          />

          <TLDR
            points={[
              'L2 covered the JIB single-circuit safe isolation sequence. L3 extends this to three-phase, multi-source installations (PV / generators / UPS), and the wider implications across people and systems.',
              'Three-phase prove-dead = ten readings minimum: L1/L2/L3 to N, to E, plus L1-L2, L2-L3, L1-L3, plus N-E. A single reading is not enough.',
              'Multi-source installations need every source isolated and proved dead at the work location AFTER isolation. Solar PV can backfeed even with main switch off.',
              'GS38-compliant test leads + prove-test-prove on a known-good supply is the standard for safe live testing.',
              'Permit-to-work systems formalise high-risk activities — assigning responsibility, documenting precautions, scoping the work, signing off completion.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Specify the safe isolation procedure for single-phase and three-phase LV circuits including the prove-test-prove method.',
              'Identify all sources of supply on a multi-source installation and apply the isolation sequence to each.',
              'Apply HSE GS38 to test instrument selection and use.',
              'Describe the implications of safe isolation across personnel, clients, public, and building systems.',
              'Describe the implications of NOT carrying out safe isolation.',
              'Explain when a permit to work is required and what role it plays alongside JIB isolation.',
              'Cite the relevant Health and Safety requirements applying to inspection, testing and commissioning.',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Three-phase prove dead</ContentEyebrow>

          <ConceptBlock
            title="Why three-phase needs ten readings, not one"
            plainEnglish="A three-phase circuit has more places for residual or back-fed voltage to hide. A single L1-N reading dead does not mean L2 and L3 are dead, doesn't mean L1-L2 is dead, doesn't mean N is at earth potential. You need to systematically check every conductor pair."
            onSite="Use a two-pole voltage indicator on every pair: L1-N, L2-N, L3-N, L1-E, L2-E, L3-E, L1-L2, L2-L3, L1-L3, N-E. That's ten readings — and yes, you do every one. Don't shortcut."
          >
            <p>The full three-phase prove-dead sequence:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                Prove the indicator works on a known live source (proving unit or known live socket).
              </li>
              <li>
                At the work location: L1 to N, L2 to N, L3 to N — three readings.
              </li>
              <li>L1 to E, L2 to E, L3 to E — three readings.</li>
              <li>L1 to L2, L2 to L3, L1 to L3 — three readings.</li>
              <li>N to E — one reading (catches faulty neutral, residual potentials).</li>
              <li>Re-prove the indicator on the known live source to confirm it didn't fail.</li>
            </ol>
            <p>
              Ten conductor-pair readings plus prove-test-prove on the indicator. Each reading
              confirms a different potential difference is zero. A single reading shortcut is the
              path to the kind of incident that ends careers and lives.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="HSE Guidance Note GS38 (Electrical test equipment for use by electricians)"
            clause="Test equipment, including leads, probes and clips, should be such that their selection and use will minimise the risk to the user and to other persons. Probes should be insulated to leave no more than 4 mm of exposed metal at the tip; leads should be fused; clips should not be used to connect to live conductors. The prove-test-prove sequence using a known good supply is essential to confirm voltage indicator integrity."
            meaning={
              <>
                GS38 is HSE\'s definitive guidance on test equipment. Compliant kit: 4 mm max
                exposed metal at the probe tip (or shrouded retractable tips), fused leads, no
                crocodile clip terminations on live conductors, finger barriers on probes. Plus
                the prove-test-prove method using a known-good source. Non-compliant kit
                (unfused leads, exposed probe tips, clip-on-live) is a flagged item on any HSE
                inspection and a contributory factor in many shock incidents.
              </>
            }
            cite="Source: HSE Guidance Note GS38, paraphrased extract."
          />

          <SectionRule />

          <ContentEyebrow>Multi-source installations</ContentEyebrow>

          <ConceptBlock
            title="Solar PV, generators, UPS — every source must be isolated"
            plainEnglish="Modern installations often have multiple sources of supply. Solar PV can backfeed the consumer circuits via the inverter even when the main switch is off (depending on inverter type and isolators). Standby generators auto-start on supply loss. UPS systems hold their stored energy even with mains gone. You must isolate ALL sources before working."
            onSite="Look at the single-line diagram. Identify every source. Isolate each one at its own isolator. Lock off each. THEN prove dead at the work location. The order matters because backfeed makes \'dead at the consumer side of the main switch' meaningless if the PV inverter is still pushing voltage in from the generation side."
          >
            <p>Isolation procedure for multi-source installations:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Identify all sources.</strong> Single-line diagram + physical inspection.
                Mains supply + PV + battery + generator + UPS + any others.
              </li>
              <li>
                <strong>Isolate each source at its dedicated isolator.</strong> Solar PV at the
                AC isolator (and DC isolator on the array side if working on DC components).
                Generator at the changeover switch and the generator output. UPS at the bypass
                switch and the battery isolator if working on the UPS.
              </li>
              <li>
                <strong>Lock off each isolator.</strong> Padlock + hasp for multi-worker scenarios.
                Tag with date + name + reason.
              </li>
              <li>
                <strong>Wait for capacitive discharge if applicable.</strong> Some equipment
                (filters, capacitor banks, large variable-speed drives) holds charge for seconds
                to minutes after isolation. Check the manufacturer data.
              </li>
              <li>
                <strong>Prove dead at the work location.</strong> Full prove-test-prove on every
                conductor pair appropriate to the circuit.
              </li>
              <li>
                <strong>Display warning signs and barrier off the work area</strong> in commercial
                settings to prevent accidental re-energisation by others.
              </li>
            </ol>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Implications — across people and systems</ContentEyebrow>

          <ConceptBlock
            title="Who and what is affected by your isolation"
            plainEnglish="Safe isolation removes danger to the worker — but it also creates downstream effects. People lose lighting, heating, refrigeration. Equipment goes offline. Building systems may go into fault states. Plan, brief, mitigate."
          >
            <p>The implications matrix:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Personnel — other trades on site.</strong> Carpenters lose power tools,
                heating goes off, lighting reduces. Coordinate timing.
              </li>
              <li>
                <strong>Customers/clients.</strong> Domestic — refrigeration, heating in winter,
                lighting, computers, medical equipment. Brief, plan around their needs, minimise
                duration.
              </li>
              <li>
                <strong>The public.</strong> If the work is in or affects public-accessible
                spaces (shops, restaurants, public buildings), loss of lighting, escape route
                lighting, payment systems may all be affected. Safety implications must be
                considered.
              </li>
              <li>
                <strong>Building systems.</strong> Fire alarms (panel goes into fault), automatic
                doors stop, emergency lighting batteries take over (time-limited), HVAC controls
                lose. In commercial environments, brief facilities and IT in advance.
              </li>
              <li>
                <strong>Safety-critical equipment.</strong> Medical (CPAP, dialysis, oxygen
                concentrators), security (alarms, CCTV), data (servers, backup systems). Plan
                for continuity using temporary supplies if needed.
              </li>
            </ul>
            <p>
              The implications of NOT isolating are far worse: shock, burn, arc flash injury to
              the worker; cascading damage if a fault is created; injury or death to others if
              consequences spread. EAWR Reg 4 obliges you to take precautions — and Reg 14 makes
              dead working the default. Isolation done badly causes inconvenience; not isolating
              causes incidents.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Solo isolation on an unfamiliar three-phase board with no lock-off"
            whatHappens={
              <>
                You arrive at a small commercial unit to investigate a tripping circuit. The board
                is three-phase with TPN feeders. You identify the breaker labelled "kitchen ring"
                and switch it off. Without locking it off you go to the kitchen to investigate.
                Meanwhile the owner returns, sees a tripped breaker (your "off" looks the same as
                a trip on this board) and resets it. You\'re at the back of a socket pulling
                conductors out when the supply comes back on at 230 V via the L1 conductor. The
                shock pathway is hand-to-hand or hand-to-foot depending on what you\'re touching.
                You\'re lucky to walk away.
              </>
            }
            doInstead={
              <>
                Always lock off — even on a quick job, even when "no one\'s around". Padlock the
                breaker handle in the off position. Tag with your name and date. If the board has
                no lock-off provision, fit a temporary lock-off device or escalate (don\'t work
                without it). If you must leave the work for any reason — even briefly — re-prove
                dead when you return. The "I\'ll only be a minute" mindset has killed and injured
                a lot of electricians. The lock-off + tag is the cheapest safety device you own.
              </>
            }
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <ConceptBlock
            title="Isolation vs switching off — Section 537 distinction"
            plainEnglish="BS 7671 Section 537 distinguishes isolation (reliable, lockable, full disconnection from every source) from switching (operational on/off). Working on a circuit requires isolation, not just switching. Many cheap rotary switches are functional switches only — they are not isolators."
            onSite="Look at the device. Is it labelled as an isolator? Does it have a lock-off facility? Does it disconnect both line conductors AND neutral on TT (or just line on TN)? An MCB in the off position is not an isolator unless it's lockable in that position. Switch a circuit off for normal use; isolate it for work."
          >
            <p>Section 537 device categories:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Isolation (Section 537.2).</strong> Reliable separation, all live
                conductors of the supply (line + neutral on TT; line on TN), means to prevent
                re-energisation. Lockable. Used before working on the circuit.
              </li>
              <li>
                <strong>Switching off for mechanical maintenance (Section 537.3).</strong>
                Disconnect motors / process equipment for maintenance. May be the same device as
                isolation if it meets both requirements.
              </li>
              <li>
                <strong>Emergency switching (Section 537.4).</strong> Single action to remove
                supply quickly. Mushroom-head emergency stop is the typical device. Identified by
                a red operator on yellow background.
              </li>
              <li>
                <strong>Functional switching (Section 537.5).</strong> Normal operation on/off —
                light switch, socket switch, equipment on/off. Does not need to provide reliable
                separation; cannot be relied on for isolation.
              </li>
            </ul>
            <p>
              Visual inspection during verification confirms the right device for each role —
              isolation devices for places where work will happen, emergency stops at hazardous
              equipment, functional switches for normal control. Mixing them up creates a safety
              gap.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Permit to work — when and how"
            plainEnglish="Permit to work is a formal documented system for managing high-risk activities. It assigns responsibility, documents the precautions, scopes the work in time and space, and provides a sign-off mechanism for safe completion. Standard for HV switching, live work on commercial systems, work in confined spaces or hazardous atmospheres."
            onSite="Routine LV electrical work usually doesn't need a permit. But when working on a commercial / industrial system with multiple stakeholders, the permit is the framework that prevents one trade re-energising what another trade has isolated. Don't view permits as bureaucracy — view them as the documented control of high-risk work."
          >
            <p>The permit-to-work components:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Issuing authority.</strong> The person responsible for the system who
                confirms it is in a safe state to work on. Often the duty holder's representative
                or an authorised engineer.
              </li>
              <li>
                <strong>Receiving worker.</strong> The competent person who accepts the permit
                and carries out the work within scope.
              </li>
              <li>
                <strong>Description of work.</strong> Specific task, specific equipment, specific
                duration. Not "general electrical work" — "replace 3-phase contactor on motor 4
                between 09:00 and 13:00 on Tuesday".
              </li>
              <li>
                <strong>Identified hazards and precautions.</strong> Live parts identified,
                isolation arrangements, lock-off positions, parallel sources, additional PPE,
                emergency arrangements.
              </li>
              <li>
                <strong>Limits of work.</strong> What is permitted. What is excluded (don't open
                this panel, don't touch this circuit). Clear scope boundaries.
              </li>
              <li>
                <strong>Permit duration.</strong> Specific start and end. Permit is not open-ended
                — extension requires re-issue.
              </li>
              <li>
                <strong>Cancellation / completion sign-off.</strong> Worker confirms work complete
                and area left safe. Issuing authority confirms acceptance and restores the system.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Energy capacitor discharge — the hidden hold-up"
            plainEnglish="Some equipment holds energy after isolation. Capacitor banks, EMC filters at the input of variable-speed drives, large UPS systems, photovoltaic combiner boxes — all can hold dangerous voltage for seconds to minutes after the supply is removed. Manufacturer literature gives the discharge time."
            onSite="Read the manufacturer plate / manual before working on equipment with stored energy. VFD inputs typically need 5-10 minutes to discharge; large UPS systems may need longer. Don't assume 'isolated = safe' — prove dead at the work location AFTER the discharge time has elapsed."
          >
            <p>Equipment categories with stored energy after isolation:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Variable speed drives (VFD / VSD).</strong> DC bus capacitors hold
                hundreds of volts for several minutes. Manufacturer specifies wait time —
                typically 5-15 minutes. Some VFDs have automatic discharge; check before assuming.
              </li>
              <li>
                <strong>Capacitor banks for power factor correction.</strong> Hold full line
                voltage briefly; discharge resistors typically bring this down within 60 seconds
                but check rating.
              </li>
              <li>
                <strong>EMC input filters on industrial equipment.</strong> Capacitors connected
                line-to-earth can hold charge after isolation. Touching the line side without
                discharge can give a brief but uncomfortable shock.
              </li>
              <li>
                <strong>UPS battery banks.</strong> The battery itself is always live unless
                disconnected via the battery isolator. Even with the AC isolated, the DC bus is
                live from the battery.
              </li>
              <li>
                <strong>PV combiner boxes.</strong> The DC array side is live whenever sunlight
                is present. Even at dawn / dusk small voltages can be present. Cover the array
                with opaque material if working on the DC side.
              </li>
              <li>
                <strong>Large luminaires / signage with power supplies.</strong> Some LED drivers
                hold capacitor charge for tens of seconds after isolation.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Five steps of safe isolation — the detailed JIB sequence"
            plainEnglish="The JIB (Joint Industry Board) safe isolation procedure is the recognised method for LV work. Five steps: identify the supply, switch off, secure (lock off), prove the voltage indicator, prove dead at the work location. The proving stages are what catch failure modes — wrong circuit identified, faulty indicator."
            onSite="Memorise the five steps. Run them in order, every time, even on familiar circuits. Apprentices in particular: do not deviate from the sequence. Familiarity breeds the shortcut that catches you out — the 'I've done this a hundred times' moment is when one circuit is wrong-labelled and you become a statistic."
          >
            <p>JIB safe isolation — the five steps in detail:</p>
            <ol className="space-y-1.5 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>1. Identify the source(s) of supply to the equipment.</strong>
                Single-line diagram, circuit chart, physical inspection. Multi-source installs
                require all sources identified.
              </li>
              <li>
                <strong>2. Switch off / open the means of isolation.</strong> Use the device
                designated for isolation (Section 537.2). Operate to the off position.
              </li>
              <li>
                <strong>3. Secure (lock off and tag).</strong> Padlock + hasp + tag with name,
                date, work description. Multiple workers each fit their own padlock on the hasp.
              </li>
              <li>
                <strong>4. Prove the voltage indicator.</strong> Test the indicator on a known
                live source — proving unit OR a known-live socket. Confirms the indicator is
                working before the safety-critical reading.
              </li>
              <li>
                <strong>5. Prove dead at the work location.</strong> Use the indicator to confirm
                ALL conductors are dead at every conductor pair appropriate to the circuit. THEN
                re-prove the indicator on the known live source to confirm it didn't fail during
                the test.
              </li>
            </ol>
            <p>
              Steps 4 and 5 together form the prove-test-prove sequence. Step 5 has TWO parts —
              prove dead at the work, then re-prove indicator. Skipping the re-prove means a
              "dead" reading might just be a faulty indicator. The two-stage prove + re-prove is
              what makes this safe.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Voltage indicator selection — two-pole vs multimeter"
            plainEnglish="A two-pole voltage indicator (e.g. Drummond, Martindale) is the right tool for proving dead. Single function — show voltage. No selectable ranges to be wrong on. Rugged, simple, GS38 compliant. A multimeter has its place for measurement, but the dedicated two-pole indicator is what you reach for to prove dead."
            onSite="Buy a quality two-pole indicator and a proving unit. Carry them as a pair. The proving unit lets you prove the indicator without needing to find a known live circuit. Together they're the cheapest, most-used, most-life-saving kit you own."
          >
            <p>Why the two-pole indicator is preferred over a multimeter for proving dead:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Single function.</strong> No selectable ranges — voltage is what it does.
                A multimeter on Ω instead of V will read "0" on a live circuit, falsely indicating
                dead.
              </li>
              <li>
                <strong>No battery dependency for the reading.</strong> Voltage indication is by
                physical phenomenon (LED bar from voltage divider, solenoid lift). Even if the
                battery is dead, the indication still works.
              </li>
              <li>
                <strong>Current-limited.</strong> Most quality two-pole indicators draw a small
                load current to discriminate against capacitively-coupled "ghost" voltages.
                Multimeters with high input impedance can read floating ghosts as significant
                voltages.
              </li>
              <li>
                <strong>GS38 compliant.</strong> Quality units have shrouded probes, fused leads,
                finger barriers — meet HSE GS38 by default.
              </li>
              <li>
                <strong>Rugged.</strong> Designed for site use — drop-resistant, IP-rated for
                damp conditions, simple to operate with gloved hands.
              </li>
              <li>
                <strong>Multimeter still useful.</strong> For measurement (actual voltage value,
                resistance, continuity). But the dedicated indicator is the right tool for prove
                dead.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="Isolation planning for a CU change in an occupied dwelling"
            situation={
              <>
                A CU change is booked for next Tuesday. The customer has a CPAP machine she uses
                overnight, a tropical fish tank with sensitive equipment, and works from home with
                a desktop PC. The work is expected to take 4-5 hours.
              </>
            }
            whatToDo={
              <>
                Brief the customer at quoting stage. Schedule the work for daytime (so CPAP isn\'t
                affected). Plan for at least 4-5 hours of supply loss. Recommend the customer save
                files, shut down the PC properly, switch off non-essential equipment in advance.
                For the fish tank, bring a small inverter generator or UPS for the air pump and
                heater to bridge the supply loss (or warn the customer to source one). Identify
                and brief the customer on which circuits will be off and when. On the day, isolate
                at the main switch, lock off, prove dead, complete the CU change including all
                dead tests on each circuit, energise per the test sequence, restore supply, brief
                the customer on the new CU, hand over EIC pack. Total downtime contained,
                customer impacts mitigated, no surprises.
              </>
            }
            whyItMatters={
              <>
                Safe isolation is not just about the worker. It\'s about managing downstream
                consequences for everyone affected. Five minutes of planning and a 30-second
                conversation at quoting stage prevents 4 hours of emergency calls about a dying
                fish tank, a complaint about lost work, or worse — a customer relying on critical
                equipment without warning. Customer service AND safety are both well-served by
                planning the implications of isolation alongside the technical work itself.
              </>
            }
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 642.1 (inspection with supply disconnected)"
            clause={
              <>
                Inspection shall precede testing and shall normally be done with that part of
                the installation under inspection disconnected from the supply.
              </>
            }
            meaning={
              <>
                Safe isolation is the doorway into the inspection itself — Regulation 642.1
                requires the inspection to take place with the relevant part of the installation
                disconnected. Multi-source installations (PV, BESS, generators) make &quot;disconnected
                from the supply&quot; a non-trivial test in itself; every source has to be
                addressed before the inspection begins.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Regulation 642.1 — full text from published amendment."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Section 712 (PV) extensive revision"
            clause={
              <>
                Section 712 &apos;Solar photovoltaic (PV) power supply systems&apos; has been
                extensively revised and expanded in BS 7671:2018+A4:2026. The technical content
                of this section has been extensively revised and expanded and now contains
                updated requirements specific to PV systems.
              </>
            }
            meaning={
              <>
                The DC isolation requirement on PV is the one that catches new inspectors out —
                a PV array stays live during daylight even after the AC side is open. Section
                712 (rewritten in A4:2026) is the regulatory home for the DC isolation
                arrangement. Pre-A4 reference material should be cross-checked.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Section 712."
          />

          <InlineCheck
            id="m5-s1-sub5-multi-source-isolation"
            question="An EICR is booked on a domestic install with a 4 kWp PV array, a 10 kWh battery and a 7 kW EV charger. The inspector must isolate the installation for the dead-test stage. What does &quot;isolated&quot; mean here?"
            options={[
              "Open the main switch — that&apos;s enough.",
              "Open every source — DNO main switch, PV DC isolator at the array, PV AC isolator at the inverter, battery DC isolator, EV charger isolator, plus prove-dead at the work point. PV strings remain live in daylight even with the AC side open; the battery holds stored DC; the EV charger may have its own backfeed path. Single-source isolation is unsafe on multi-source installs.",
              "Trip the RCD and walk away.",
              "Only the DNO disconnects can fully isolate it.",
            ]}
            correctIndex={1}
            explanation="Multi-source installations require every source to be addressed. Section 712 (PV) and Chapter 57 (battery) both require accessible DC isolation for the stored / generated energy. Failing to isolate the DC strings or the battery before working downstream of the inverter is the textbook way an apprentice gets a shock from a system that &quot;should be off&quot;."
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'L2 introduced the JIB single-circuit isolation sequence. L3 extends it to three-phase, multi-source installations, and wider implications.',
              'Three-phase prove dead = ten readings minimum: every line to N, every line to E, every line pair, plus N-E. No shortcuts.',
              'Multi-source installations (PV, generators, UPS) need every source isolated. PV can backfeed via the inverter; generators auto-start; UPS holds stored energy.',
              'GS38-compliant test leads (4 mm max exposed tip, fused, no live clips, finger barriers) plus prove-test-prove on a known-good supply.',
              'Lock off every isolation, every time. Multiple workers each fit their own padlock on a hasp.',
              'Implications of isolation extend across personnel, clients, public, and building systems. Brief, plan, mitigate downstream effects.',
              'Implications of NOT isolating: shock/burn/arc flash to worker, cascading damage, injury/death to others. EAWR Reg 14 makes dead working the default.',
              'Permit-to-work systems formalise high-risk activities — issued, accepted, returned, signed off — sitting alongside the JIB isolation as the documented control framework.',
            ]}
          />

          <Quiz title="Safe isolation L3 depth — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section1-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                1.4 Scheme certification chain
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5-section1-6')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.6 Initial verification — purpose and information set
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
