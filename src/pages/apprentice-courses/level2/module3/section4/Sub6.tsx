/**
 * Module 3 · Section 4 · Subsection 6 — Earthing in practice — three real installs
 * Maps to City & Guilds 2365-02 / Unit 203 / LO4 / AC 4.1, 4.2, 4.3, 4.4, 4.5
 *   AC 4.1 — "Identify different types of earthing systems"
 *   AC 4.2 — "Identify component parts of Automatic Disconnection of Supply (ADS)"
 *   AC 4.3 — "Identify exposed conductive parts"
 *   AC 4.4 — "Identify extraneous conductive parts"
 *   AC 4.5 — "Identify component parts of an earth loop impedance path"
 *
 * SYNTHESIS Sub. Three contrasting real installs walked end-to-end:
 *   Walk 1 — Domestic TN-C-S (PME) kitchen extension
 *   Walk 2 — Commercial small TT install (rural office on its own electrode)
 *   Walk 3 — Small industrial IT install (operating theatre / process)
 *
 * Same five-step pattern applied to each: identify system → ADS chain →
 * exposed parts → extraneous parts → measure Zs. Common day-1 misclassifications
 * called out at the end.
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
import { EarthingSystemDiagram } from '@/components/study-centre/diagrams';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Earthing in practice — three real installs (4.1, 4.2, 4.3, 4.4, 4.5) | Level 2 Module 3.4.6 | Elec-Mate';
const DESCRIPTION =
  'Synthesis Sub — domestic TN-C-S (PME), commercial TT and small industrial IT walked side by side. The same five-step pattern (system, ADS, exposed parts, extraneous parts, Zs) applied to all three.';

/* ── Inline check questions ───────────────────────────────────────── */

const checks = [
  {
    id: 'm3-s4-sub6-system-id',
    question:
      'You arrive at a rural office. The DNO supply head provides line and neutral only — no earth — and there is a 1.2 m copper-clad earth electrode driven into the ground next to the meter cabinet, with a green/yellow earthing conductor going to the MET. Which earthing system?',
    options: [
      'TN-S',
      'IT',
      'TT',
      'TN-C-S (PME)',
    ],
    correctIndex: 2,
    explanation:
      'No DNO earth + own earth electrode = TT. The DNO has chosen to provide L + N only (typical on overhead rural distribution where PME is not safe to extend), so the installation provides its own connection to earth via the local electrode. TT installations require RCD protection at origin because the high electrode resistance (Ze typically tens of ohms) means an MCB will never see enough fault current to trip in 0.4 s.',
  },
  {
    id: 'm3-s4-sub6-it-first-fault',
    question:
      'On a small industrial IT system feeding an operating theatre, an insulation monitoring device (IMD) starts beeping with a fault indication. There is no obvious smoke, no breaker tripped, no equipment fault. What does this mean and what is the response?',
    options: [
      'A second fault has occurred and the supply has automatically disconnected — restore power and reset the breaker.',
      'A nuisance trip in the IMD itself — silence the alarm and continue, as no real fault exists on an IT system.',
      'A first fault to earth has occurred. The system stays energised by design, but the fault must be found and fixed promptly.',
      'A loss of the source earth — the transformer star point has lost its connection and must be re-earthed immediately.',
    ],
    correctIndex: 2,
    explanation:
      'IT system philosophy (Reg 411.6): the system is not directly earthed (or is earthed via high impedance) so a single line-to-earth fault does not produce dangerous fault current and the system stays running — vital in operating theatres, life-support, continuous-process industry. The IMD warns you the first fault has happened. You have time to find and fix it, but you must act before a second fault on a different conductor turns it into a TN-style fault at full current. That is the IT trade-off: continuity at the cost of a more complex fault-management regime.',
  },
  {
    id: 'm3-s4-sub6-extraneous-test',
    question:
      'On a domestic TN-C-S kitchen extension you measure 950 ohm between the incoming gas pipe and the MET. The water comes in via plastic pipe and the internal stub is short copper. What needs main protective bonding?',
    options: [
      'Bond gas (950 ohm is below 1667 ohm, so extraneous); leave the internal copper water stub on the plastic incomer unbonded.',
      'Bond both the gas and the internal copper water stub, since any metal pipework in a kitchen must be bonded.',
      'Bond neither — 950 ohm is above the safe limit, so the gas pipe is not extraneous and needs nothing.',
      'Bond the water stub only — the plastic gas incomer means the gas pipe cannot possibly be extraneous.',
    ],
    correctIndex: 0,
    explanation:
      'Below 1667 ohm = treat as extraneous = bond. Gas at 950 ohm is well under threshold (because it has a real earth path through the metal service back to the gas main in the street), so it gets a main protective bonding conductor sized per Reg 544.1 — typically 10 mm² copper on a PME supply. The internal copper water stub on a plastic incomer is the textbook case in the NOTE to Reg 411.3.1.2 — without an external earth path it is unlikely to be extraneous, and bonding it can actually make things worse by importing a potential from the MET back onto a floating piece of metal.',
  },
];

/* ── Quiz questions ───────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      'You walk into a domestic property. The cut-out has a single combined earth/neutral conductor arriving from the DNO, and the earthing conductor to the MET clamps to the neutral block. What do you do FIRST about the earthing arrangement?',
    options: [
      'Drive a local earth electrode at the property, because every supply needs its own earth rod.',
      'Confirm it is TN-C-S (PME) and check the earthing conductor and main bonding are sized correctly for PME.',
      'Assume it is TN-S and design the bonding at 6 mm², since that is the most common older arrangement.',
      'Phone the DNO to convert the supply to TT before doing any further work on the installation.',
    ],
    correctAnswer: 1,
    explanation:
      'PEN (combined N+PE) arriving from the DNO and split at the service position is the signature of TN-C-S (PME). The DNO chose it; you confirm it and respect it. PME requires larger main protective bonding conductors than TN-S (10 mm² minimum, vs 6 mm² typical TN-S) because of the consequences of a broken supply neutral — diverted neutral current can flow through the bonding, so the bonding has to be sized for that.',
  },
  {
    id: 2,
    question:
      'On a TT installation feeding a rural office, the earth electrode resistance Ra measures 35 ohm. The origin RCD is 100 mA S-type with 30 mA RCDs / RCBOs on each final circuit. Does Ra x I-delta-n meet the 50 V touch-voltage limit (Reg 411.5.3)?',
    options: [
      'No — 35 x 0.1 = 3.5 V, which exceeds the 50 V limit and fails Reg 411.5.3.',
      'No — the electrode resistance must be below 1 ohm before a TT installation can comply.',
      'Yes — 35 x 0.1 = 3.5 V, well inside the 50 V limit and under the 500 ohm Table 41.5 max.',
      'It cannot be determined without first measuring the prospective fault current at the origin.',
    ],
    correctAnswer: 2,
    explanation:
      'Ra x I-delta-n = 35 x 0.1 = 3.5 V. Comfortably under 50 V. The Table 41.5 maximum Zs for a 100 mA RCD is 500 ohm, so an electrode at 35 ohm is more than fine. The electrode just gives the fault current somewhere to flow; the RCD does the disconnection within the 0.2 s required for TT final circuits at 230 V.',
  },
  {
    id: 3,
    question:
      'A first-year apprentice tells you the IT system in the operating theatre "does not have any earth, so we do not need to bond anything". What is wrong with this?',
    options: [
      'Nothing — on an IT system the source is unearthed, so bonding genuinely is not required.',
      'Only the patient-contact equipment needs bonding; the rest of the theatre can be left.',
      'The IMD provides all the earthing the installation needs, so no separate CPCs are required.',
      'IT exposed parts must still be earthed and extraneous parts still bonded — the "I" means the SOURCE is isolated.',
    ],
    correctAnswer: 3,
    explanation:
      'Common misconception. The "I" in IT refers to the source being isolated from earth (or earthed via high impedance) — it does NOT mean the installation has no earth. Reg 411.6.2 requires exposed-conductive-parts to be earthed (individually, in groups or collectively), and equipotential bonding of extraneous parts is just as important on IT as on TN. The point of IT is that a SINGLE line-to-earth fault does not produce dangerous fault current (so the supply stays on), not that earthing is absent.',
  },
  {
    id: 4,
    question:
      'On a TN-C-S (PME) kitchen extension, you have measured Ze = 0.30 ohm at the MET. The new kitchen ring final is a 32 A Type B RCBO. Table 41.3 gives max Zs = 1.37 ohm for B32 at 0.4 s. After applying the 0.8 hot-cable correction, what is the maximum allowable measured R1+R2 on the new circuit?',
    options: [
      '0.80 ohm',
      '0.50 ohm',
      '1.07 ohm',
      '1.37 ohm',
    ],
    correctAnswer: 0,
    explanation:
      'Apply the 0.8 rule to correct Table 41.3 values from operating temperature down to test ambient (~20 degC): max permitted measured Zs = 1.37 x 0.8 = 1.096 ohm. Subtract Ze: max R1+R2 = 1.096 - 0.30 = 0.796 ohm, round to 0.80 ohm. Above this and the circuit will not disconnect within 0.4 s on a worst-case hot-cable scenario.',
  },
  {
    id: 5,
    question:
      'Which of these is the most common over-bonding mistake on a modern UK new-build?',
    options: [
      'Leaving the incoming gas service unbonded because the meter has a plastic insulating coupling.',
      'Bonding internal copper water pipework where the incoming water service is plastic.',
      'Sizing the main bonding at 6 mm² on a PME supply instead of the required 10 mm².',
      'Bonding the structural steel of the building but forgetting the incoming metal gas service.',
    ],
    correctAnswer: 1,
    explanation:
      'Plastic incomer = no external earth path = the internal copper cannot introduce a potential from outside = it is unlikely to be extraneous, per the NOTE to Reg 411.3.1.2. Bonding it anyway is a reflex from the days when every house had a metal incomer. Worse, bonding floating internal metalwork can actually import a potential from the MET back onto the metalwork in fault conditions — a real safety concern under PME diverted-neutral scenarios.',
  },
  {
    id: 6,
    question:
      'A static caravan park provides supplies to individual pitches via TT (each pitch has its own electrode, the DNO supply does not provide earth). What is the typical origin protection arrangement on each pitch?',
    options: [
      'A Type B MCB on the pitch supply, since the local electrode gives a low enough Zs.',
      'No special protection — the pitch electrode does the same job as a TN-C-S supplier earth.',
      '30 mA RCD at the pitch — TT requires RCD protection because the high electrode resistance stops an MCB tripping in time.',
      'A 300 mA RCD only, because additional protection is not needed on outdoor caravan pitches.',
    ],
    correctAnswer: 2,
    explanation:
      '30 mA RCD at the pitch is standard. The TT electrode resistance is typically far too high for an MCB to ever see enough fault current to trip in 0.2 s (the TT final-circuit limit at 230 V). RCD does the work — Table 41.5 max Zs for 30 mA is 1667 ohm, comfortably above any sensible electrode resistance. The 50 V touch-voltage check (Ra x I-delta-n <= 50) confirms it.',
  },
  {
    id: 7,
    question:
      'You measure Zs at the furthest socket on the new kitchen ring (TN-C-S, B32 RCBO). Reading: 1.05 ohm. Maximum permitted (Table 41.3 with 0.8 correction): 1.10 ohm. What does this tell you?',
    options: [
      'The circuit has failed — 1.05 ohm exceeds the 1.10 ohm corrected limit, so do not energise.',
      'The reading is meaningless without first applying a further 0.8 correction to the measured value.',
      'The circuit passes comfortably — 1.05 ohm leaves ample margin below the table value.',
      'It is just compliant on the hot-cable basis — within the limit but with very little margin, so investigate before sign-off.',
    ],
    correctAnswer: 3,
    explanation:
      'Just compliant means just compliant. Within the limit, but a slack connection developing later, the cable warming up to its full operating temperature, or a small additional run added in future could push it over. A reading this close to the limit is a flag to investigate before sign-off, not a fail. Common causes: an unusually long run, a CPC sized one step below convention, a poor termination at the CU or the furthest socket.',
  },
  {
    id: 8,
    question:
      'A second fault occurs on a different live conductor of an IT system, and exposed-conductive-parts are interconnected by a protective conductor (Reg 411.6.5(a)). What happens?',
    options: [
      'Auto-disconnection occurs in the same TN disconnection times (Table 41.1) — the second fault closes a TN-style fault loop.',
      'Nothing changes — the IMD simply raises a second alarm and the system keeps running indefinitely.',
      'The supply voltage doubles across the two faulted conductors, damaging connected equipment.',
      'The source earth disconnects automatically, isolating the transformer star point from the installation.',
    ],
    correctAnswer: 0,
    explanation:
      'A second fault on a different conductor closes a fault loop through the interconnecting CPCs — and that loop now behaves like a TN line-to-earth fault. The fault current rises to TN-style levels and the protective device disconnects within the TN disconnection times of Table 41.1 (Reg 411.6.5(a) and NOTE 1). This is why first faults on IT must be located and cleared promptly — the protection on the second fault is fast and complete, but the conditions for the second fault to happen safely depend on the wiring discipline and the protective device characteristics.',
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: 'Why bother teaching all three earthing systems if domestic is mostly TN-C-S?',
    answer:
      'Because as soon as you step off domestic you meet the others daily. Rural commercial = TT. Caravan parks, marinas, agricultural buildings = TT. Solar PV with battery storage on a TT supply is its own rabbit hole. Operating theatres, MRI rooms, continuous-process industry = IT. AM2 and the C&G written exams test all three because the qualification is general — not just domestic. You do not have to install IT systems on day one, but recognising one when you walk into a job is non-negotiable.',
  },
  {
    question: 'How do I tell at a glance which earthing system I am looking at?',
    answer:
      'Open the cut-out cover. Single combined N+PE arriving from the DNO and split at the service position = TN-C-S. Separate N and PE coming from the DNO with PE often from the cable sheath = TN-S. No DNO earth at all + own electrode in the ground = TT. None of the above with insulation monitoring on the board = IT (rare, you will know if you are in one because the design will tell you). When in doubt, ask the supervisor and check the design documents — never assume.',
  },
  {
    question: 'Why does TT need RCDs but TN-C-S can use just MCBs (in principle)?',
    answer:
      'Earth fault loop impedance. TN-C-S Ze is typically 0.35 ohm — fault current is high, MCB sees plenty of current to trip in 0.4 s. TT Ze is typically 21 ohm or much higher (it includes the earth electrode resistance on both ends of the loop) — fault current at 230 V is only ~10 A, nowhere near enough to trip a B32 in 0.4 s. RCD detects the imbalance directly without needing high fault current, so it can disconnect a TT circuit in 0.2 s even with high Zs. (Modern practice uses RCBOs on every final circuit regardless of system, but the underlying reasoning is why TT requires RCD protection from the regulations.)',
  },
  {
    question: 'What is the difference between PME and PNB under TN-C-S?',
    answer:
      'Both are TN-C-S — the supply uses a combined N+PE conductor (PEN) which is split into N and PE at the service position. PME (Protective Multiple Earthing) earths the PEN at multiple points along the DNO network — every few hundred metres, typically. PNB (Protective Neutral Bonding — added explicitly to BS 7671 in A4:2026) earths the PEN at a single point, very close to the consumer, between the transformer and the supply terminals. PNB is appearing on some new networks where multiple-earthing is impractical. The installation-side requirements are the same as PME.',
  },
  {
    question: 'On an IT system, what stops the first fault from being dangerous?',
    answer:
      'The source is isolated from earth (or earthed via high impedance). So a single line-to-earth fault has no low-impedance return path back to the source — fault current is limited to the very small leakage / capacitance current of the rest of the system. Touch voltage stays well below 50 V (Reg 411.6.2 condition Ra x Id <= 50 V). The fault is real, but the consequences are non-dangerous — which is why the system is allowed to keep running until the fault is located and cleared.',
  },
  {
    question: 'What is the most common day-1 trap with earthing across all three systems?',
    answer:
      'Confusing the "I" of IT with "no earthing required" — covered in Quiz 3. Followed by over-bonding plastic-incomer water systems on PME — Quiz 5. Followed by reflexively trusting Ze = 0.35 ohm on every PME without measuring it — sometimes the supply head is corroded or the DNO earth path is in poor shape and the actual Ze is much higher. Always measure, always question, never assume.',
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
            <ArrowLeft className="h-4 w-4" /> Section 4
          </button>

          <PageHero
            eyebrow="Module 3 · Section 4 · Subsection 6"
            title="Earthing in practice — three real installs"
            description="Three real installs walked end-to-end — domestic TN-C-S (PME), commercial TT, small industrial IT. Same five-step pattern (system, ADS, exposed parts, extraneous parts, Zs), three flavours of practice."
            tone="emerald"
          />

          <TLDR
            points={[
              'Same theory, three flavours of practice — all five LO4 ACs (system, ADS, exposed parts, extraneous parts, Zs) apply to every install. What changes is the kit, the protective device strategy and the Zs you should expect.',
              'TN-C-S: shared DNO PEN + MET, ADS via MCB/RCBO, low Ze (~0.35 ohm), 10 mm² PME bonding to extraneous parts. TT: own electrode, ADS via RCD (mandatory), Ze tens to hundreds of ohms, Ra x I-delta-n <= 50 V. IT: source isolated (or high-impedance earthed), IMD raises alarm on first fault, second fault disconnects per TN times.',
              'Day-1 traps: confusing the I of IT with "no earthing", over-bonding plastic-incomer water, trusting Ze = 0.35 ohm without measuring it, missing that TT requires RCD protection from the regulations not just custom.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Identify TN-C-S (PME and PNB), TN-S, TT and IT earthing systems on first walk-up at the cut-out (AC 4.1) — with three contrasting real install scenarios.',
              'Walk the ADS chain (source, line conductor, fault, exposed-conductive-part, CPC, MET, earthing conductor, supply earth path) on each of the three systems, and identify the protective device strategy that closes ADS within disconnection time (AC 4.2).',
              'Identify exposed-conductive-parts (the metalwork of equipment, the metallic enclosures, the SWA armouring) in domestic, commercial and industrial settings (AC 4.3) — and apply the Class II exception correctly.',
              'Identify extraneous-conductive-parts using the 1667 ohm test in three settings (AC 4.4) — kitchen extension on PME, rural office on TT, theatre on IT — including the plastic-incomer over-bonding trap.',
              'Identify every component in the earth fault loop (Ze, R1+R2, Zs) for each of the three systems, calculate maximum permissible Zs from Tables 41.3 and 41.5 with the 0.8 hot-cable correction, and interpret a measured Zs reading against the limit (AC 4.5).',
              'Recognise the common day-1 misclassifications between TN-C-S, TT and IT, and apply the right safety behaviour (RCD reliance on TT, IMD response on IT, PME bonding sizing on TN-C-S).',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What you already know</ContentEyebrow>

          <ConceptBlock title="Five Subs in, you have the toolkit — this Sub puts it on three real installs">
            <p>
              Sub 4.1 introduced the five earthing systems (TN-S, TN-C-S PME, TN-C-S PNB, TT, IT)
              and how to identify each at the cut-out. Sub 4.2 broke down ADS into its component
              chain — source, line conductor, fault, exposed part, CPC, MET, earthing conductor,
              supply path — with the disconnection times in Table 41.1. Sub 4.3 defined
              exposed-conductive-parts (Part 2 verbatim — equipment metalwork that can become
              live under fault) and the Class II exception. Sub 4.4 defined
              extraneous-conductive-parts (Part 2 verbatim — metalwork outside the installation
              that can introduce a potential), the 1667 ohm test and the over-bonding trap. Sub
              4.5 walked the earth fault loop (Ze + R1+R2 = Zs), the Tables 41.3 and 41.5
              maximum values, and the 0.8 hot-cable correction.
            </p>
            <p>
              This Sub takes the same five-step pattern and applies it to three contrasting
              installs. Same theory, three flavours of practice — what changes is the supply
              arrangement, the protective device strategy and the Zs you should expect to
              measure.
            </p>
            <p className="text-[13px] text-white/75 italic">
              Tool-bag thread: an MFT (multi-function tester) reads Ze at the MET, R1+R2 along
              each circuit and Zs at the furthest point. Same instrument, three different
              expected ranges depending on which earthing system you are testing.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Walk 1 — Domestic TN-C-S (PME) kitchen extension</ContentEyebrow>

          <ConceptBlock
            title="The job — adding a 32 A kitchen ring final to a 1990s semi"
            plainEnglish="Standard UK new-build / mature-build domestic. PME supply, integrated CU, gas + water services, the works."
            onSite="The most common earthing arrangement you will meet — about 80% of UK domestic supplies are TN-C-S now. Get fluent on this one first; the others build from it."
          >
            <p>
              You arrive on day one. Open the cut-out cover. You see:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                A single combined N+PE conductor arriving from the DNO (the PEN).
              </li>
              <li>
                The PEN splits at the service position into the supply neutral going to the meter
                and an earth strap going up to the MET inside the consumer unit.
              </li>
              <li>
                The MET is a labelled terminal block in or beside the CU, with the earthing
                conductor (typically 16 mm² on a domestic PME), main protective bonding
                conductors out to gas and water (10 mm² on PME), and the CPCs from every final
                circuit all landing on it.
              </li>
            </ul>
            <p>
              Confirmed: <strong>TN-C-S (PME)</strong>.
            </p>
          </ConceptBlock>

          <EarthingSystemDiagram
            system="TN-C-S"
            caption="Walk 1: TN-C-S (PME). DNO supplies a combined PEN; installation splits N and PE at the service position; main protective bonding to gas / water at 10 mm² (PME minimum on a domestic supply)."
          />

          <ConceptBlock title="Step 1 — system identified. Step 2 — walk the ADS chain.">
            <p>
              The ADS chain on a TN-C-S install (Sub 4.2):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Source — distribution transformer secondary, neutral point earthed at the
                substation.
              </li>
              <li>
                Line conductor through the supply cable to the cut-out, through the meter and CU
                main switch, through the RCBO for Cct 5 (kitchen ring), through the 2.5 mm² T&E
                line, to the appliance.
              </li>
              <li>
                Fault — line conductor touches the metal case of, say, a kitchen
                fridge-freezer.
              </li>
              <li>
                Exposed-conductive-part — the appliance casing.
              </li>
              <li>
                CPC — the 1.5 mm² CPC of the kitchen ring, back through the ring to the CU CPC
                bar, to the MET.
              </li>
              <li>
                Earthing conductor — MET back down to the cut-out earth strap.
              </li>
              <li>
                Cut-out earth strap → DNO PEN → back to the substation neutral point.
              </li>
            </ul>
            <p>
              Loop closed. Fault current flows. The 32 A Type B RCBO sees ~5x trip current and
              disconnects in well under 0.4 s. The 30 mA RCD function provides additional
              protection per Reg 411.4 / 415.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Step 3 — exposed parts. Step 4 — extraneous parts (with the over-bonding trap).">
            <p>
              <strong>Exposed parts in this kitchen extension:</strong> the steel back-boxes
              behind every socket and switch, the metal faceplates if specified, the metal
              housing of the integrated oven and induction hob, the metal case of the boiler
              (Class I), the CU enclosure itself if metal-clad. Each is fed via a CPC back to
              the MET. The double-insulated kettle (Class II — the concentric squares symbol)
              has no exposed-conductive-part requiring CPC connection.
            </p>
            <p>
              <strong>Extraneous parts:</strong> the incoming gas service (still metal in this
              1990s build) and the incoming water service (also metal). Both got main protective
              bonding at the original install — 10 mm² Cu (PME minimum). Verify both bonds are
              still in place and tight before energising the new circuit. Apply the 1667 ohm
              test if there is any doubt about whether a particular metal item (e.g. an old
              oil-line stub coming through a wall) qualifies as extraneous.
            </p>
            <p>
              <strong>The over-bonding trap on a modern equivalent:</strong> if this had been a
              new-build instead, with plastic incoming water and plastic incoming gas, the
              internal copper stubs do NOT need bonding (NOTE to Reg 411.3.1.2 — they are
              unlikely to be extraneous because they have no external earth path). Bonding them
              anyway can actually introduce a potential onto floating metalwork during a PME
              diverted-neutral event — making things worse, not better.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Step 5 — measure Zs at the furthest socket on the new ring.">
            <p>
              Final circuit: 32 A Type B RCBO. From Sub 4.5 / Table 41.3:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Table 41.3 max Zs for B32 at 0.4 s, 230 V: <strong>1.37 ohm</strong>.</li>
              <li>Apply 0.8 hot-cable correction: max permitted measured Zs = 1.37 x 0.8 = <strong>1.10 ohm</strong>.</li>
              <li>Measured Ze at MET (loop test with installation isolated): <strong>0.30 ohm</strong>.</li>
              <li>Maximum allowable measured R1+R2: 1.10 - 0.30 = <strong>0.80 ohm</strong>.</li>
            </ul>
            <p>
              You measure R1+R2 by continuity test across line and CPC at the furthest socket
              with a wander lead, or by direct Zs measurement with the MFT loop function. Reading
              Zs = 0.55 ohm — pass with comfortable margin. Reading Zs = 1.05 ohm — just
              compliant, investigate (long run? slack termination? CPC undersized?). Reading
              Zs = 1.20 ohm — fail, do not energise.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Walk 2 — Commercial small TT install (rural office)</ContentEyebrow>

          <ConceptBlock
            title="The job — small commercial unit on overhead rural distribution"
            plainEnglish="A standalone office building outside town. The DNO supplies overhead lines, line + neutral only — no PME extension to the property because of the safety risks on overhead networks at distance from the substation."
            onSite="Same five-step pattern as Walk 1, but with TT-specific kit and Zs values. The big change is that the RCD is doing the work, not the MCB."
          >
            <p>
              You arrive on day one. Open the meter cabinet. You see:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Overhead supply terminating in a service head — line and neutral only, NO earth
                from the DNO.
              </li>
              <li>
                A 1.2 m copper-clad steel earth electrode driven into the ground next to the
                cabinet, with a green/yellow earthing conductor (10 mm² typical) running into
                the building to the MET.
              </li>
              <li>
                Origin protection: 100 A main switch + 100 mA S-type (selective / time-delayed)
                RCD at the origin, then 30 mA Type A RCBOs on each final circuit.
              </li>
            </ul>
            <p>
              Confirmed: <strong>TT</strong>.
            </p>
          </ConceptBlock>

          <EarthingSystemDiagram
            system="TT"
            caption="Walk 2: TT. No earth from the DNO; installation provides its own earth electrode in the ground. RCD protection at origin is mandatory per Reg 411.5.3."
          />

          <ConceptBlock title="Step 1 — system identified. Step 2 — walk the ADS chain.">
            <p>
              The ADS chain on a TT install (Sub 4.2):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Source — distribution transformer secondary, neutral point earthed at the
                substation (via the substation\'s OWN earth electrode, separate from yours).
              </li>
              <li>
                Line conductor through the overhead supply, through the meter and main switch,
                through the 100 mA RCD, through the final-circuit RCBO, to the appliance.
              </li>
              <li>
                Fault — line conductor touches the metal case of (say) an electric heater in
                the office.
              </li>
              <li>
                Exposed-conductive-part — heater casing.
              </li>
              <li>
                CPC — back through the final circuit to the CU CPC bar to the MET.
              </li>
              <li>
                Earthing conductor — MET to your local earth electrode.
              </li>
              <li>
                Earth electrode → soil → substation electrode → back to the source neutral.
              </li>
            </ul>
            <p>
              Loop closed — but the impedance is dominated by the two earth electrodes (yours +
              the substation\'s) and the soil between them. Total Ze typically 21 ohm or much
              higher. Fault current at 230 V is only ~10 A — nowhere near enough to trip a B32
              RCBO on its overcurrent function in 0.2 s. The 30 mA RCD function does the
              disconnection (well within 40 ms at 5x I-delta-n). The 100 mA S-type at origin
              gives discrimination — only the faulty circuit\'s RCD trips, not the whole
              installation.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Step 3 — exposed parts. Step 4 — extraneous parts (TT version).">
            <p>
              <strong>Exposed parts:</strong> identical philosophy to Walk 1. Steel back-boxes,
              metal-cased equipment, SWA armouring on any external runs. Each fed by a CPC back
              to the MET, which is connected to the local earth electrode.
            </p>
            <p>
              <strong>Extraneous parts:</strong> on a small rural office, the candidates are
              fewer than a kitchen — no incoming gas service, water may come in via a private
              metal supply pipe from a well or via mains-fed copper. Apply the 1667 ohm test —
              measure between the suspect metalwork and the MET. Below 1667 ohm = bond. Above =
              do not.
            </p>
            <p>
              <strong>The TT-specific bonding wrinkle:</strong> on TT, the entire installation
              is sat at "MET potential" which is referenced to your local electrode, not to the
              DNO earth (because there is no DNO earth). Diverted-neutral concerns from PME do
              not apply — but the fact that your MET potential and the DNO neutral potential can
              differ during a fault means main protective bonding becomes even more important
              for keeping touch voltages safe inside the building.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Step 5 — measure Zs and verify Ra x I-delta-n <= 50 V.">
            <p>
              On a 30 mA final-circuit RCBO, Table 41.5 gives max Zs = <strong>1667 ohm</strong>.
              Sounds enormous — but reflects that the RCD, not the overcurrent, is doing the
              disconnection. Any sensible earth electrode resistance is well under that.
            </p>
            <p>
              The condition to verify (Reg 411.5.3): <strong>Ra x I-delta-n &lt;= 50 V</strong>.
              Where Ra = electrode resistance + protective conductor + CPC; I-delta-n = RCD trip
              threshold.
            </p>
            <p>
              Measured Ra (electrode resistance test): 35 ohm. RCD I-delta-n = 0.030 A. Touch
              voltage = 35 x 0.030 = <strong>1.05 V</strong>. Comfortably under 50 V — pass.
            </p>
            <p>
              Repeat the same calculation for the 100 mA origin RCD: 35 x 0.100 = 3.5 V — also
              fine. And cross-check Ra is well under the Table 41.5 limit (1667 ohm for 30 mA,
              500 ohm for 100 mA) — yes, 35 ohm is comfortably within both.
            </p>
            <p>
              The third check: Ra should be as low as practically achievable. Typical UK rural
              soil gives 20-50 ohm on a single 1.2 m rod. Anything above 200 ohm is flagged in
              the regs as potentially unstable (changes with soil moisture, freezing, etc) — if
              your reading is up there, drive a longer rod or add a second rod in parallel.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.5.3 (TT — RCD protection condition, verbatim)"
            clause="Where an RCD is used for fault protection, the following conditions shall be fulfilled: (a) the disconnection time shall be that required by Regulation 411.3.2.2 or 411.3.2.4; and (b) Ra x I-delta-n <= 50 V where Ra is the sum of the resistances of the earth electrode and the protective conductor connecting it to the exposed-conductive-parts (in ohms) and I-delta-n is the rated residual operating current of the RCD. The requirements of this regulation are met if the earth fault loop impedance of the circuit protected by the RCD meets the requirements of Table 41.5."
            meaning={
              <>
                The legal anchor for TT installations. The RCD does the work, the electrode
                gives the fault current somewhere to flow, and Ra x I-delta-n must keep the
                touch voltage on exposed-conductive-parts below 50 V during the disconnection
                time. Table 41.5 gives the headline maximum Zs values: 1667 ohm at 30 mA, 500
                ohm at 100 mA, 167 ohm at 300 mA, 100 ohm at 500 mA. Apprentices regularly
                under-spec the protection on TT thinking "TT just works like TN-C-S" — Reg
                411.5.3 is what you point at to explain why it does not.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Regulation 411.5.3 (verbatim)"
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Walk 3 — Small industrial IT install (operating theatre)</ContentEyebrow>

          <ConceptBlock
            title="The job — IT-supplied operating theatre or specialised industrial process"
            plainEnglish="The rare-but-must-recognise system. Source not directly earthed (or earthed via high impedance). First fault does not disconnect — IMD raises an alarm — second fault disconnects per TN times."
            onSite="Most apprentices will not install an IT system in their first five years. But you will almost certainly walk into a hospital, a process plant or a specialised lab where one is in use. Recognising it on the first walk-up is the safety-critical skill."
          >
            <p>
              You arrive at the theatre plant room. You see:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                A medical isolating transformer (typically 7-10 kVA for a single theatre) — the
                source for the IT-supplied circuits.
              </li>
              <li>
                The transformer secondary is isolated from earth (or earthed via a high
                impedance, depending on the design).
              </li>
              <li>
                An insulation monitoring device (IMD) on the secondary side, continuously
                measuring insulation resistance to earth on every conductor.
              </li>
              <li>
                A visual + audible alarm at the theatre operating panel — illuminates and beeps
                when the IMD detects a first fault.
              </li>
              <li>
                Exposed-conductive-parts (the metal cases of the operating theatre equipment,
                trunking, accessory back-boxes) all interconnected by a protective conductor and
                earthed to a common point — Reg 411.6.2 condition.
              </li>
            </ul>
            <p>
              Confirmed: <strong>IT</strong>.
            </p>
          </ConceptBlock>

          <EarthingSystemDiagram
            system="IT"
            caption="Walk 3: IT. Source not directly earthed (or earthed via high impedance). First fault does not disconnect — IMD raises alarm. Used in operating theatres, life-support, continuous-process industry where supply continuity is critical."
          />

          <ConceptBlock title="Step 1 — system identified. Step 2 — walk the ADS chain.">
            <p>
              The ADS chain on an IT install (Sub 4.2 + Reg 411.6):
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Source — medical isolating transformer secondary, NOT directly earthed.
              </li>
              <li>
                Line conductor through theatre distribution to the equipment.
              </li>
              <li>
                <strong>First fault</strong> — one conductor touches an exposed-conductive-part.
                Because the source is not earthed, there is no low-impedance return path.
                Fault current is limited to the small leakage / capacitance of the rest of the
                system. Touch voltage stays well below 50 V (Reg 411.6.2: Ra x Id &lt;= 50 V is
                satisfied because Id is tiny on first fault). The IMD detects the change in
                insulation resistance and raises the alarm. The system stays running. Theatre
                staff finish the surgery.
              </li>
              <li>
                <strong>Engineer responds.</strong> Locate the first fault using insulation
                fault location systems (IFLS, optional but common on critical IT) or by
                systematic isolation. Repair before a second fault occurs.
              </li>
              <li>
                <strong>Second fault</strong> on a different live conductor (BEFORE the first is
                cleared) — now closes a fault loop through the interconnecting CPCs. Fault
                current rises to TN-style levels. Per Reg 411.6.5(a), the protective device
                disconnects in the same disconnection time as the equivalent TN system (Table
                41.1: 0.4 s for AC final circuits at 230 V).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock title="Step 3 — exposed parts. Step 4 — extraneous parts (IT version).">
            <p>
              <strong>Exposed parts:</strong> on an IT theatre — the metal casings of every
              piece of medical equipment, the operating table mount, theatre lights, anaesthesia
              machine cases, trunking, back-boxes. All interconnected by protective conductor
              and earthed (the "I" of IT means the SOURCE is not earthed — exposed parts of the
              installation absolutely are, per Reg 411.6.2).
            </p>
            <p>
              <strong>Extraneous parts:</strong> the metalwork of any incoming services to the
              theatre (medical gases pipework, water for sinks, structural steel of the
              suspended ceiling grid if it is part of the theatre envelope, the floor itself if
              conductive). All bonded to a Patient Equipotential Bonding Bar (PEBB or similar)
              to keep every touchable surface in the theatre at the same potential. The 1667 ohm
              test still applies for deciding whether a metal item is extraneous.
            </p>
            <p>
              <strong>The IT-specific bonding philosophy:</strong> on IT in critical environments
              (theatres, life-support, MRI), equipotential bonding is taken to a higher level
              than TN/TT. Every conceivable touchable conductive surface in the patient zone is
              bonded together. Touch voltages between any two bonded surfaces stay near zero
              even during a first fault.
            </p>
          </ConceptBlock>

          <ConceptBlock title="Step 5 — Zs and the second-fault disconnection.">
            <p>
              On IT, Zs takes a different meaning. There is no normal fault loop on first fault
              (the source is not earthed). The Zs that matters is the fault loop on the SECOND
              fault — Reg 411.6.5(a) gives the conditions where exposed parts are interconnected
              by a CPC.
            </p>
            <p>
              For a 32 A Type B circuit (AC, 230 V), the second-fault disconnection time per
              Table 41.1 (TN values) is <strong>0.4 s</strong>. The fault loop on a second fault
              comprises the line conductor of one circuit, the interconnecting CPC, and the
              protective conductor + neutral path back through the other faulty circuit. The
              maximum Zs is the same 1.37 ohm Table 41.3 value (corrected to 1.10 ohm on the
              hot-cable basis) — the same maths as Walk 1, just only relevant once two faults
              have happened.
            </p>
            <p>
              In practice, on a well-maintained IT system the first fault is repaired long
              before a second occurs. The IMD is continuously monitoring; the alarm is loud and
              visible; the maintenance regime is more disciplined than TN/TT. The whole point of
              IT is that the SECOND fault is the protective event, not the first.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.6.2 (IT — exposed-conductive-parts, verbatim)"
            clause="Exposed-conductive-parts shall be earthed individually, in groups, or collectively. In AC systems the following condition shall be fulfilled to limit the touch voltage to: Ra x Id <= 50 V where Ra is the sum of the resistances in ohms of the earth electrode and protective conductor for the exposed-conductive-parts. Id is the fault current in amperes (A) of the first fault of negligible impedance between a line conductor and an exposed-conductive-part. The value of Id takes account of leakage currents and the total earthing impedance of the electrical installation."
            meaning={
              <>
                Verbatim. The "I" of IT is about the source (isolated from earth or
                high-impedance earthed). Exposed-conductive-parts on the installation side are
                still earthed — individually, in groups or collectively. The 50 V touch-voltage
                condition still applies on first fault, but Id is small (because the source is
                not directly earthed) so the condition is easily satisfied. Common apprentice
                misconception: "IT means no earthing" — wrong, see Quiz 3.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Regulation 411.6.2 (verbatim)"
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.6.4 (IT — first fault detection, verbatim)"
            clause="Where an IT system is designed not to disconnect in the event of a first fault, the occurrence of the first fault shall be indicated by either: (a) an insulation monitoring device (IMD), which may be combined with an insulation fault location system (IFLS); or (b) a residual current monitor (RCM), provided the residual current is sufficiently high to be detected. The device shall initiate an audible and/or visual signal which shall continue as long as the fault persists."
            meaning={
              <>
                The reason there is an IMD beeping in the theatre. IT systems designed to keep
                running through a first fault MUST have insulation monitoring with an audible
                and/or visual alarm that persists until cleared. This is what gives staff the
                window to finish the surgery and call the engineer rather than losing supply
                mid-procedure. Engineers must respond to first-fault alarms — they are the
                trigger for a controlled repair before a second fault makes it dangerous.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Regulation 411.6.4 (verbatim)"
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The three side by side</ContentEyebrow>

          <ConceptBlock
            title="Same five steps, three flavours of practice"
            plainEnglish="Visual summary of how each system answers each step. Worth screenshotting before a written exam."
          >
            <p>
              <strong>System identified at the cut-out (Step 1):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>TN-C-S (PME): combined PEN from DNO, split at service position.</li>
              <li>TT: no DNO earth, own electrode driven into the ground.</li>
              <li>IT: medical isolating transformer / process supply, source isolated or high-impedance earthed.</li>
            </ul>
            <p>
              <strong>ADS strategy (Step 2):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>TN-C-S: low Ze means MCB/RCBO sees high fault current, disconnects on overcurrent in 0.4 s.</li>
              <li>TT: high Ze means RCD does the work, mandatory at origin per Reg 411.5.3, disconnects in 0.2 s.</li>
              <li>IT: first fault does not disconnect, IMD raises alarm; second fault disconnects per TN times (Reg 411.6.5).</li>
            </ul>
            <p>
              <strong>Exposed parts (Step 3):</strong> identical philosophy on all three —
              equipment metalwork, all CPC-connected back to the MET. Class II exception applies
              to all three.
            </p>
            <p>
              <strong>Extraneous parts (Step 4):</strong> 1667 ohm test applies on all three.
              Bonding sized per Reg 544.1: 6 mm² typical TN-S, 10 mm² minimum on PME (or 25 mm²
              on large supplies). On IT in patient areas, additional Patient Equipotential
              Bonding takes it further.
            </p>
            <p>
              <strong>Zs limits (Step 5):</strong>
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>TN-C-S B32: Table 41.3 = 1.37 ohm, hot-cable corrected = 1.10 ohm. Ze ~0.30 ohm typical.</li>
              <li>TT 30 mA RCD: Table 41.5 = 1667 ohm. Ra x I-delta-n &lt;= 50 V is the binding test, not Zs.</li>
              <li>IT: first-fault Zs irrelevant; second-fault Zs same as equivalent TN per Reg 411.6.5(a).</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong — common day-1 misclassifications</ContentEyebrow>

          <CommonMistake
            title="Confusing the 'I' of IT with 'no earthing required'"
            whatHappens={
              <>
                Apprentice tasked with running new circuits into a theatre extension hears "this
                is IT" and assumes earthing is not required. They terminate the new accessories
                without connecting CPCs to the theatre back-boxes. First fault on one of the new
                circuits causes the IMD to alarm; engineer investigates and finds an entire
                run with no equipotential bonding. Whole batch of new work has to be redone
                before the theatre can be commissioned.
              </>
            }
            doInstead={
              <>
                The "I" of IT refers to the SOURCE being isolated from earth. The installation
                side absolutely still needs CPCs, MET, equipotential bonding — Reg 411.6.2
                requires exposed parts to be earthed (individually, in groups or collectively).
                Equipotential bonding is even more important on IT in critical settings because
                the second-fault disconnection times depend on the fault loop impedance through
                the interconnecting CPCs. If anything, the wiring discipline on IT is tighter
                than on TN/TT, not looser.
              </>
            }
          />

          <CommonMistake
            title="Treating TT like TN-C-S — relying on overcurrent protection alone"
            whatHappens={
              <>
                Apprentice on a barn conversion (TT supply) wires a new 32 A radial for an
                immersion. Fits a B32 MCB, no RCD function, on the basis "MCB worked fine for
                the same circuit at home". Day after first-fix, an inspector spots no RCD on
                origin or final-circuit protection. The whole CU has to be swapped for one with
                RCBOs throughout. Embarrassment and cost both at the apprentice's firm's expense.
              </>
            }
            doInstead={
              <>
                TT requires RCD protection per Reg 411.5.3 — not as a custom but as a regulation
                requirement. Earth electrode resistance is too high for an MCB to ever clear an
                earth fault in the required disconnection time. Fit RCBOs (combined RCD +
                overcurrent) on every final circuit, with a 100 mA S-type at origin for
                discrimination if required. Same logic applies to caravans, marinas, agricultural
                buildings — anywhere TT is used.
              </>
            }
          />

          <Scenario
            title="Wrong-system fault on a refurb — the trap that catches year-one apprentices"
            situation={
              <>
                You arrive at a refurb of an old village pub being converted into an Airbnb. The
                supply head looks like a classic 1960s TN-S — heavy lead-sheathed cable, separate
                neutral, the lead sheath carries a green/yellow strap to the MET. Your supervisor
                is on the phone and waves you in. You start carcassing the new ground-floor ring
                final assuming TN-S Ze around 0.8 ohm and B32 RCBOs throughout. Half an hour
                later the supervisor comes off the phone and tells you the DNO upgraded the
                supply to TN-C-S (PME) six months ago — but the cabling and bonding in the
                cabinet were never updated.
              </>
            }
            whatToDo={
              <>
                Stop, do not energise anything, raise the issue with the supervisor immediately.
                The bonding is sized for TN-S (6 mm² typical) when the supply is now PME (10 mm²
                minimum on a domestic, more on a commercial). The earthing arrangement at the
                cut-out has to be brought up to PME spec before you carry on with the install.
                Verify the supply system in writing with the DNO if there is doubt — never
                assume from the look of the cabinet. The lead sheath connection might still be
                in place from the old TN-S days but with a PME supply now sat on top of it,
                everything downstream needs reviewing.
              </>
            }
            whyItMatters={
              <>
                Misclassifying the supply system carries cascading consequences for everything
                downstream — bonding sizing, RCD requirements, expected Ze, what to write on the
                certificate. The DNO is responsible for the supply side; the installer is
                responsible for getting the installation-side decisions right against whatever
                the DNO has provided. A five-minute conversation to confirm the supply system
                before you start saves a re-do of all the bonding later.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Same five-step pattern (system, ADS, exposed parts, extraneous parts, Zs) applies to TN-C-S, TT and IT — what changes is the kit, the protective device strategy and the expected Zs values.',
              'TN-C-S (PME): low Ze (~0.30 ohm), MCB/RCBO does ADS, 10 mm² PME bonding minimum on domestic. The 80%-of-domestic case.',
              'TT: high Ze (tens to hundreds of ohms), RCD MANDATORY per Reg 411.5.3, Ra x I-delta-n <= 50 V is the binding condition, Table 41.5 gives max Zs (1667 ohm at 30 mA).',
              'IT: source isolated (or high-impedance earthed), first fault does not disconnect (IMD raises alarm per Reg 411.6.4), second fault disconnects per TN times (Reg 411.6.5(a)). Exposed parts still earthed.',
              'Day-1 traps: confusing "I of IT" with no earthing; relying on overcurrent only on TT; over-bonding plastic-incomer water on PME; trusting Ze = 0.35 ohm without measuring it.',
              'Always confirm the supply system in writing before you start — DNO upgrades from TN-S to TN-C-S happen and the bonding/protection has to be reviewed.',
            ]}
          />

          <Quiz title="Earthing in practice — synthesis check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section4/4-5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                4.5 Earth fault loop impedance path
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section5/5-1')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Section 5 — How electricity is supplied
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
