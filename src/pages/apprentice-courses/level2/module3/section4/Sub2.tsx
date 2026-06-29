/**
 * Module 3 · Section 4 · Sub 2 — Component parts of ADS
 * Maps to City & Guilds 2365-02 / Unit 203 / LO4 / AC 4.2
 *   AC 4.2 — "Identify component parts of Automatic Disconnection of Supply (ADS)"
 *
 * Frame: ADS isn’t one thing. It’s a chain. Break any link and protection fails.
 * Walk every component: source, earth electrode/PEN, MET, earthing conductor,
 * CPC, bonding conductors, protective device, fault loop closure.
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
import { EquipotentialBonding } from '@/components/study-centre/diagrams';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Component parts of ADS | Level 2 Module 3.4.2 | Elec-Mate';
const DESCRIPTION =
  'Automatic Disconnection of Supply broken down into its component links — source, earth, MET, earthing conductor, CPC, bonding, protective device — and the disconnection times that govern each.';

const checks = [
  {
    id: 'm3-s4-sub2-met-role',
    question:
      'What is the function of the Main Earthing Terminal (MET) in the ADS chain?',
    options: [
      'The single common point where the earthing conductor, main bonding conductors and every CPC meet at one potential.',
      'A current-limiting device that caps fault current before it reaches the protective device.',
      'The point where the supply neutral is split into separate neutral and earth conductors by the DNO.',
      'A dedicated earth electrode that gives the installation its own connection to the general mass of earth.',
    ],
    correctIndex: 0,
    explanation:
      'The MET is the single common point inside the installation. Earthing conductor in (back to source/electrode), main protective bonding out (to extraneous parts), CPCs out (to every accessory and exposed-conductive-part). One node, one potential — that’s what makes equipotential bonding work in a fault.',
  },
  {
    id: 'm3-s4-sub2-disconnection-time',
    question:
      'On a TN system, U₀ ≤ 230 V AC, what is the maximum disconnection time for a final circuit covered by Reg 411.3.2.2 (e.g. a final circuit with a socket-outlet up to 32 A)?',
    options: [
      '0.1 s',
      '5 s',
      '1 s',
      '0.4 s',
    ],
    correctIndex: 3,
    explanation:
      'BS 7671 Table 41.1 sets the headline TN figure at 0.4 s for AC at 230 V. Distribution circuits (and final circuits not covered by 411.3.2.2) get up to 5 s. TT systems get tighter limits — 0.2 s on a final circuit at 230 V — because the higher Ze means RCDs do the work and they trip faster.',
  },
  {
    id: 'm3-s4-sub2-broken-cpc',
    question:
      'Halfway through wiring a kitchen, you notice the previous electrician has terminated the CPC into a junction box but never connected the second leg out to the next socket. What does this break do to ADS?',
    options: [
      'Nothing serious — the gas and water main bonding gives the metalwork an alternative earth return.',
      'It breaks the CPC link, so a fault beyond the junction box has no return path and the MCB cannot trip.',
      'It only affects the neutral return, so the circuit still disconnects normally on an earth fault.',
      'It raises Zs slightly but the RCD will still clear any fault within the required time.',
    ],
    correctIndex: 1,
    explanation:
      'Bonding to extraneous parts (gas, water) is supplementary — it doesn’t replace the CPC. A broken CPC means there’s no fault-current return path from the appliance back to the MET. Fault current can’t flow → MCB never trips → exposed metal sits at line voltage. Test continuity of every CPC at every point on initial verification (R1+R2 or R2 test).',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'BS 7671 411.3.1.1 requires a CPC to be run to and terminated at every point in wiring and at every accessory, with one specific exception. What is it?',
    options: [
      'A metal-clad socket-outlet fed from an all-plastic consumer unit.',
      'A lampholder having no exposed-conductive-parts and suspended from such a point.',
      'Any accessory mounted in a plastic back-box, since the box itself needs no earth.',
      'A SELV light fitting supplied at 12 V from a remote transformer.',
    ],
    correctAnswer: 1,
    explanation:
      'Verbatim from 411.3.1.1 — "A circuit protective conductor shall be run to and terminated at each point in wiring and at each accessory except a lampholder having no exposed-conductive-parts and suspended from such a point." That single exception (a Class II pendant from an all-plastic ceiling rose) is why some old loop-in roses don’t carry an earth out to the lampholder.',
  },
  {
    id: 2,
    question:
      'Walk the ADS fault loop on a TN-C-S supply in the order it actually flows — from the moment a phase touches an exposed metal case:',
    options: [
      'Exposed-conductive-part → DNO PEN → source neutral → line conductor → fault → CPC → MET → source winding.',
      'Line conductor → CPC → fault → exposed-conductive-part → MET → source winding → DNO PEN → earthing conductor.',
      'Source phase winding → line conductor → fault → exposed-conductive-part → CPC → MET → earthing conductor → DNO PEN → source neutral.',
      'Source neutral → DNO PEN → MET → line conductor → exposed-conductive-part → CPC → fault → source winding.',
    ],
    correctAnswer: 2,
    explanation:
      'Source → line conductor → fault → exposed-conductive-part → CPC → MET → earthing conductor → service position → PEN → source. Each link is part of the loop. Whichever link has the highest impedance dominates — Ze is set by the supply side, R1+R2 by the installation side, Zs is the sum.',
  },
  {
    id: 3,
    question:
      'A 30 mA RCD is fitted to a TT installation’s origin. The earth electrode resistance is 50 Ω. Does the installation comply with the Ra × IΔn ≤ 50 V condition (Reg 411.5.3)?',
    options: [
      'No — 50 + 30 = 80 V exceeds the limit.',
      'No — 50 × 0.030 = 1.5 V is too low.',
      'It depends on the cable size, not the electrode.',
      'Yes — 50 × 0.030 = 1.5 V, well inside the 50 V limit.',
    ],
    correctAnswer: 3,
    explanation:
      'Ra × IΔn = 50 × 0.030 = 1.5 V. Comfortably under 50 V. The Table 41.5 max Zs for a 30 mA RCD is 1667 Ω, so an electrode at 50 Ω is more than fine. The RCD does the disconnection; the electrode just gives the fault current somewhere to flow.',
  },
  {
    id: 4,
    question:
      'Why is the size of the main earthing conductor (typically 16 mm² Cu on a domestic PME supply) determined by the size of the supplier’s neutral, not by the installation’s line conductor size?',
    options: [
      'Because in a broken-PEN fault it may have to carry the installation’s full neutral return current to ground, so it is sized to the supply neutral.',
      'Because the earthing conductor carries the same load current as the line conductor does during normal everyday use.',
      'Because BS 7671 simply sets a flat 16 mm² minimum for every earthing conductor regardless of the supply type.',
      'Because the line conductor and the earthing conductor share one terminal, so the two must always be the same size.',
    ],
    correctAnswer: 0,
    explanation:
      'On PME, a broken PEN means the entire neutral current of the installation can suddenly return through the earthing conductor and bonding conductors to the local earth. Table 54.8 sizes the earthing conductor to handle this — for a domestic supply with neutral up to 35 mm² that’s typically 16 mm² Cu. Same logic for main bonding conductors.',
  },
  {
    id: 5,
    question:
      'Which of these is part of the ADS chain on every UK installation, regardless of earthing system?',
    options: [
      'A surge protective device (SPD) fitted at the origin of the installation by the consumer unit.',
      'The Main Earthing Terminal (MET) — the single common point where earthing conductor, bonding and CPCs meet.',
      'An RCD on every single final circuit, fitted regardless of the earthing system actually in use.',
      'An external lightning protection system bonded back to the building’s structural steelwork.',
    ],
    correctAnswer: 1,
    explanation:
      'Every installation needs a MET — TN-S, TN-C-S (PME or PNB), TT and IT all require a single point where the earth, bonding and CPCs meet. SPDs, lightning protection and smoke alarms are required by other regs but they’re not part of the ADS chain itself.',
  },
  {
    id: 6,
    question:
      'Reg 411.3.2.3 permits up to 5 s disconnection on a TN system distribution circuit. Why is the longer time acceptable here when final circuits get only 0.4 s?',
    options: [
      'Because distribution circuits carry far less fault current, so they always take longer to trip the protective device.',
      'Because the longer time gives the upstream device a chance to operate first, purely for discrimination reasons.',
      'Because contact with a sub-main feeding a downstream board is far rarer than touching a kettle on a final circuit — lower touch-current risk.',
      'Because distribution circuits are always RCD-protected anyway, so the overcurrent disconnection time becomes irrelevant.',
    ],
    correctAnswer: 2,
    explanation:
      'Touch-voltage risk is the driver. Final circuits feed accessories that ordinary persons handle daily — 0.4 s. Distribution circuits feed downstream boards in service positions where contact is rare and brief — 5 s. Same Reg 411.3.2 family, different real-world exposure.',
  },
  {
    id: 7,
    question:
      'On a TN-C-S domestic, the protective device’s job in the ADS chain is to:',
    options: [
      'Limit the touch voltage on the metalwork by equalising potential across it during the fault.',
      'Carry the fault current back to the source so the earth fault loop is complete.',
      'Provide the earth reference point for the whole installation at the consumer unit.',
      'Disconnect the supply within the Reg 411.3.2.2 time once the fault current through the loop is high enough.',
    ],
    correctAnswer: 3,
    explanation:
      'The MCB, RCBO or RCD has one job in ADS: open the line conductor fast enough that the touch voltage on the exposed-conductive-part doesn’t persist long enough to kill. Everything else (electrode resistance, CPC sizing, MET bonding) is in service of getting the fault current high enough that the protective device sees it.',
  },
  {
    id: 8,
    question:
      'A first-year apprentice asks "if all the bonding is connected to the MET, why do we need a separate earthing conductor as well?". What’s the right answer?',
    options: [
      'Bonding equalises potential between extraneous parts and the MET; the earthing conductor links the MET back to the source earth so fault current can return.',
      'They do the very same job — the earthing conductor is really just a spare in case a bonding conductor happens to fail.',
      'Bonding carries the fault current back to source, while the earthing conductor only equalises the potential locally at the MET.',
      'The earthing conductor is only ever needed on TT supplies; on TN systems the main bonding alone is entirely sufficient.',
    ],
    correctAnswer: 0,
    explanation:
      'Two distinct jobs. Bonding equalises potential — keeps the gas pipe and the metal sink at the same voltage as the MET during a fault. Earthing carries fault current back to source. You need both, neither is optional, and they’re sized differently (Table 54.7/54.8 for earthing conductors, Table 54.8 for main bonding).',
  },
];

const faqs = [
  {
    question: 'What does ADS actually stand for in plain terms?',
    answer:
      'Automatic Disconnection of Supply. It’s the BS 7671 strategy for protecting against electric shock under fault conditions: a low-impedance fault between line and an exposed-conductive-part causes enough current to flow that the protective device (MCB, RCBO or RCD) opens the circuit within a defined time before anyone touching the metalwork can be killed by the resulting touch voltage. Every UK installation is built around it.',
  },
  {
    question: 'Why does the chain matter so much — surely one path back to earth is enough?',
    answer:
      'Because every weak link kills the protection. A perfect electrode plus a broken CPC = no fault current flows = MCB never trips. A perfect MET plus an undersized earthing conductor = the conductor melts before the MCB clears the fault. ADS is a series chain — you need every link intact and correctly sized.',
  },
  {
    question: 'What’s the difference between earthing and bonding?',
    answer:
      'Earthing connects the MET back to the source so fault current can return. Bonding connects extraneous-conductive-parts (gas, water, structure) to the MET to keep them at the same potential as everything else during a fault. Two different jobs. Both required. Both sized by their own rules (Tables 54.7, 54.8). Sub 4.4 covers extraneous bonding in detail.',
  },
  {
    question: 'Where does the protective device fit in the ADS chain?',
    answer:
      'It’s the actuator at the end of the chain. Everything upstream (electrode, MET, earthing conductor, CPC, bonding) exists to make sure that when a fault happens, fault current flows large enough that the protective device disconnects the line in the time required by Reg 411.3.2.2 — 0.4 s for most final circuits, 5 s for distribution circuits on TN.',
  },
  {
    question: 'Why is Reg 411.3.1.2 about bonding listed under "ADS" — isn’t bonding separate?',
    answer:
      'Because bonding is part of the ADS strategy. The two-fold approach is (a) automatic disconnection by the protective device and (b) equipotential bonding to limit the touch voltage during the disconnection time. You need both. Disconnection alone wouldn’t prevent a few hundred milliseconds of dangerous touch voltage on bonded metalwork.',
  },
  {
    question: 'How do I test that the ADS chain works on a real install?',
    answer:
      'Three measurements give you most of it. Continuity of CPCs (R1+R2 or R2 test) confirms the installation-side path is unbroken. Earth fault loop impedance at the furthest point of each circuit (Zs) confirms total loop impedance is low enough for the protective device to trip in time. Functional RCD test confirms the device itself operates. Module 7 covers the full Initial Verification routine.',
  },
];

export default function Sub2() {
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
            eyebrow="Module 3 · Section 4 · Subsection 2"
            title="Component parts of ADS"
            description="Automatic Disconnection of Supply isn’t one thing. It’s a chain. Source, earth, MET, earthing conductor, CPC, bonding, protective device — break any link and protection fails."
            tone="emerald"
          />

          <TLDR
            points={[
              'ADS = Automatic Disconnection of Supply. The BS 7671 strategy for protecting against electric shock by clearing a line-to-earth fault fast enough (0.4 s on most TN final circuits) that touch voltage can’t kill.',
              'It’s a chain of nine links: source → earth electrode/PEN → earthing conductor → MET → main bonding → CPCs → exposed-conductive-part → fault path → protective device.',
              'Reg 411.3 family is the framing. Reg 411.3.1.1 (CPC at every point), 411.3.1.2 (bonding), 411.3.2.2 (Table 41.1 disconnection times) — the three you cite most.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Define ADS and explain its purpose under BS 7671.',
              'Identify each component part of the ADS chain on a typical UK installation.',
              'State the function of the MET, the earthing conductor, the CPC, the main bonding conductors and the protective device.',
              'Cite Reg 411.3.1.1 (protective earthing) and Reg 411.3.1.2 (protective equipotential bonding).',
              'State maximum disconnection times from Table 41.1 for TN and TT systems at U₀ ≤ 230 V (0.4 s and 0.2 s respectively for final circuits, longer for distribution).',
              'Recognise that a single broken link anywhere in the chain disables the entire protection scheme.',
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>What ADS is and why it exists</ContentEyebrow>

          <ConceptBlock
            title="ADS — automatic disconnection so a fault can’t kill anyone"
            plainEnglish="A line conductor touches exposed metalwork. Without ADS the metal sits at line voltage waiting for someone to touch it. With ADS, the protective device opens the circuit before touch voltage persists long enough to harm."
            onSite="Every UK installation you’ve ever worked on uses ADS as the primary protective measure. SELV, double insulation, electrical separation are alternatives — rare in domestic. ADS is the default and you need to understand its chain."
          >
            <p>
              The principle of ADS: design the installation so that a low-impedance fault between
              line and an exposed-conductive-part causes enough fault current to flow that the
              protective device (MCB, RCBO or RCD) automatically disconnects the line within a
              defined time. Combined with equipotential bonding to limit touch voltage during that
              disconnection time, the result is that no one in contact with the metalwork during
              the fault is exposed to a lethal shock.
            </p>
            <p>
              Two parts work together. <strong>Disconnection</strong> by the protective device,
              triggered by high fault current. <strong>Bonding</strong> to keep all the metalwork
              at roughly the same potential during the few hundred milliseconds before the device
              opens. Reg 411.3.1 covers both, and they are not interchangeable — bonding without
              disconnection still leaves the metalwork live; disconnection without bonding still
              allows dangerous touch voltage between adjacent earthed and unearthed parts.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulations 411.3.1.1 and 411.3.1.2 (Protective earthing and protective equipotential bonding)"
            clause="Regulation 411.3.1.1 (Protective earthing): Exposed-conductive-parts shall be connected to a protective conductor under the specific conditions for each type of system earthing as specified in Regulations 411.4 to 411.6. Simultaneously accessible exposed-conductive-parts shall be connected to the same earthing system individually, in groups or collectively. A circuit protective conductor shall be run to and terminated at each point in wiring and at each accessory except a lampholder having no exposed-conductive-parts and suspended from such a point. Regulation 411.3.1.2 (Protective equipotential bonding): In each consumer’s installation within a building, extraneous-conductive-parts liable to introduce a dangerous potential difference shall be connected to the main earthing terminal by protective bonding conductors complying with Chapter 54."
            meaning={
              <>
                411.3.1.1 makes the CPC mandatory at every accessory (one tiny exception for a
                Class II pendant). 411.3.1.2 makes main bonding mandatory at every extraneous-
                conductive-part liable to introduce a potential. Both regs together define the two
                halves of ADS — the earthing path that makes fault current flow, and the bonding
                that keeps touch voltages survivable while the protective device clears the fault.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.1."
          />

          <SectionRule />

          <ContentEyebrow>The chain — every link, in order</ContentEyebrow>

          <ConceptBlock
            title="Walk the loop — source winding to fault and back to source"
            plainEnglish="Trace the current. Start at the source, follow the line into the fault, follow the earth back. Every component you cross is a link in the ADS chain."
          >
            <p>
              Take a TN-C-S domestic with a Type B 32 A RCBO on a kitchen ring. A live phase shorts
              to the metal back-box of a socket. Walk the loop in order:
            </p>
            <ol className="space-y-2 list-decimal pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Source phase winding</strong> — the secondary of the substation transformer.
                Source impedance is the irreducible bottom limit on Ze.
              </li>
              <li>
                <strong>DNO supply line conductor</strong> — service cable from substation to your
                consumer cut-out. Adds resistance to Ze.
              </li>
              <li>
                <strong>Installation line conductor</strong> — your meter tails, henley block, then
                the 2.5 mm² cable from the consumer unit to the socket. This is the "line" part of
                R1.
              </li>
              <li>
                <strong>The fault itself</strong> — assumed negligible impedance for design
                purposes (a clean copper-to-copper short).
              </li>
              <li>
                <strong>Exposed-conductive-part</strong> — the metal back-box that the line conductor
                has touched. Currently sitting near line potential.
              </li>
              <li>
                <strong>CPC (Circuit Protective Conductor)</strong> — the green/yellow earth core in
                the 2.5 mm² T&E running back from the socket to the consumer unit. This is the "R2"
                part of R1+R2.
              </li>
              <li>
                <strong>Main Earthing Terminal (MET)</strong> — the common bar inside the consumer
                unit (or adjacent to it) where every CPC, the main bonding and the earthing
                conductor meet.
              </li>
              <li>
                <strong>Earthing conductor</strong> — typically 16 mm² Cu on a PME domestic, running
                from the MET to the DNO neutral block at the service position.
              </li>
              <li>
                <strong>DNO PEN conductor</strong> — combined neutral/earth back through the supply
                cable to the substation. Earthed at multiple points along the network on PME.
              </li>
              <li>
                <strong>Source neutral terminal</strong> — back at the transformer star point. The
                loop closes.
              </li>
            </ol>
            <p>
              The fault current that flows around this complete loop is determined by U₀ ÷ Zs (line
              voltage divided by total loop impedance). On a healthy TN-C-S with Zs around 1.0 Ω,
              that’s 230 A — comfortably above the magnetic trip threshold of any Type B MCB. The
              MCB opens within milliseconds. ADS works.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Each link, what it does</ContentEyebrow>

          <ConceptBlock
            title="The source — substation transformer (or generator on private networks)"
          >
            <p>
              The DNO transformer secondary winding is one terminal of the fault loop. The
              transformer’s star point is earthed at the substation — that earth, plus the source
              winding impedance plus the supply cable impedance, is what makes up Ze.
            </p>
            <p>
              On private networks (housing developments with their own substation, large industrial
              sites with on-site transformers, generator-fed installations) the source is local. On
              IT systems the source isn’t directly earthed at all — fault current limited by the
              source impedance.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The earth electrode (TT) or PEN (TN-C-S) or sheath (TN-S)"
            plainEnglish="The conductor that gets the source’s earth into your installation."
          >
            <p>
              How the source’s earth gets into your building depends on the system:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>TN-S:</strong> the metallic sheath of the supply cable, used as a separate
                protective conductor.
              </li>
              <li>
                <strong>TN-C-S (PME or PNB):</strong> the combined PEN conductor in the supply,
                split into N and PE at the service position.
              </li>
              <li>
                <strong>TT:</strong> a local earth electrode (rod, plate or buried mat) driven into
                the ground at the property. Independent of the source earth — connection is via the
                soil between the two electrodes.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The earthing conductor — MET to source/electrode"
            onSite="On a domestic PME, this is the 16 mm² green/yellow strap from the MET to the DNO neutral block. On a TT, it’s the 25 mm² Cu (unprotected) or 16 mm² Cu (corrosion-protected) buried run to the local rod (Table 54.1)."
          >
            <p>
              The earthing conductor connects the MET to the source earth or to the local electrode.
              Sizing is by Table 54.7 (cross-sectional area in line with the line conductors and
              fault current calc) or Table 54.8 for installations with a PEN or PME-supplied origin
              (sized against the supplier’s neutral). On a TT system buried portions must also meet
              Table 54.1 minimum sizes for buried conductors with allowance for corrosion.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The Main Earthing Terminal (MET) — the single common point"
            plainEnglish="One terminal block. Earthing conductor in. Main bonding out. CPCs out. Everything that needs to be at earth potential meets here."
          >
            <p>
              The MET is where the earthing conductor (back to source/electrode), the main
              protective bonding conductors (out to extraneous parts) and every CPC in the
              installation come together. Physically it’s usually a brass or copper terminal block
              inside or next to the consumer unit, often labelled "MET" or with the earth symbol.
            </p>
            <p>
              The MET’s job is twofold: provide a single low-impedance node so that every earthed
              and bonded part of the installation sits at the same potential during a fault, and
              provide a single inspection point where every connection can be tested and recorded
              on the EIC schedule.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Main protective bonding conductors — extraneous parts to MET"
            onSite="Typically 10 mm² Cu on a domestic. From the MET out to the gas service incomer (within 600 mm of the meter outlet on the consumer side), to the water service, and to any other extraneous parts liable to introduce a potential."
          >
            <p>
              Main protective bonding conductors connect extraneous-conductive-parts (incoming gas,
              water, oil, structural steel, lightning protection earth — see Sub 4.4) to the MET.
              Sized per Reg 544.1 — typically half the cross-sectional area of the earthing
              conductor with a 6 mm² minimum (and 10 mm² minimum on PME unless protected against
              mechanical damage). Visualised in the diagram below.
            </p>
            <div className="flex justify-center pt-2">
              <EquipotentialBonding />
            </div>
          </ConceptBlock>

          <ConceptBlock
            title="Circuit Protective Conductor (CPC) — every accessory back to MET"
            onSite="The green/yellow core in T&E. Sometimes a separate stranded conductor on SWA installations. Always present, always continuous, always terminated at every point."
          >
            <p>
              The CPC runs from the MET out to every accessory and exposed-conductive-part on every
              circuit. In T&E it’s the bare copper (sleeved green/yellow at terminations) running
              alongside the line and neutral. On SWA the armour itself is normally used as the CPC,
              with a separate green/yellow earth core sometimes added for redundancy.
            </p>
            <p>
              Reg 411.3.1.1 makes this mandatory at every wiring point and accessory, with one
              exception: a lampholder with no exposed-conductive-parts suspended from a Class II
              ceiling rose. CPC sizing follows Reg 543.1 — either by calculation against the fault
              current the device will see, or against Table 54.7 with simplified rules tied to the
              line conductor size.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="The protective device — the actuator that opens the line"
            plainEnglish="MCB, RCBO or RCD. The thing that physically disconnects the supply when fault current is detected."
          >
            <p>
              At the end of the ADS chain sits the protective device that interrupts the supply.
              The device’s sole job in this context: trip within the time required by Reg 411.3.2.2
              once the loop impedance and the resulting fault current allow it to.
            </p>
            <p>
              Three families of device do this work:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>MCB</strong> (overcurrent only) — relies on high fault current to trigger
                the magnetic trip. Works on TN systems where Ze is low enough; will not trip in time
                on TT systems.
              </li>
              <li>
                <strong>RCBO</strong> (combined MCB + RCD) — single module that handles overcurrent
                and residual current. The standard new-build domestic fit on most circuits.
              </li>
              <li>
                <strong>RCD</strong> (residual current only) — detects line/neutral imbalance.
                Mandatory at origin of TT installations (typically 100 mA S-type) and required as
                additional protection on most final circuits regardless of system.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Disconnection times — the clock the chain is racing</ContentEyebrow>

          <ConceptBlock
            title="Table 41.1 — the disconnection time the protective device has to meet"
            onSite="Memorise the headline: 0.4 s on TN final circuits, 0.2 s on TT final circuits, 5 s on TN distribution circuits, 1 s on TT distribution circuits — all at U₀ ≤ 230 V AC."
          >
            <p>
              Reg 411.3.2.2 sets the maximum disconnection times for final circuits with a rated
              current up to 63 A with one or more socket-outlets, and final circuits up to 32 A
              supplying only fixed-connected current-using equipment. Distribution circuits and
              circuits not covered by 411.3.2.2 get the longer times in 411.3.2.3 (TN: 5 s) and
              411.3.2.4 (TT: 1 s).
            </p>
            <p>
              Why the times differ between TN and TT: TT relies on RCDs which trip in around
              25–40 ms regardless of fault current — getting under 0.2 s is straightforward. TN
              MCBs trip on magnetic instantaneous if fault current is high enough (around 5× In for
              Type B), which is also fast. The longer times for distribution circuits acknowledge
              that touch contact with sub-mains is rare compared with final-circuit accessories.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Regulation 411.3.2.2 and Table 41.1 (Maximum disconnection times)"
            clause="Maximum disconnection times stated in Table 41.1 shall be applied to final circuits with a rated current not exceeding: (a) 63 A with one or more socket-outlets; and (b) 32 A supplying only fixed connected current-using equipment. Table 41.1 — for 120 V < U₀ ≤ 230 V AC: TN system 0.4 s; TT system 0.2 s. Where in TT systems the disconnection is achieved by an overcurrent protective device and the protective equipotential bonding is connected with all extraneous-conductive-parts within the installation in accordance with Regulation 411.3.1.2, the maximum disconnection times applicable to TN systems may be used."
            meaning={
              <>
                On most domestic and commercial TN final circuits at 230 V, your protective device
                must clear a line-to-earth fault in 0.4 s or less. On TT it’s 0.2 s for the same
                circuits. Distribution circuits and circuits outside 411.3.2.2 get up to 5 s on TN
                and 1 s on TT (Regs 411.3.2.3 and 411.3.2.4). Pick a protective device whose
                tripping characteristic and the measured Zs together meet that time.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.2.2 and Table 41.1."
          />

          <VideoCard
            url={videos.circuitBreakersDontProtectPeople.url}
            title={videos.circuitBreakersDontProtectPeople.title}
            channel={videos.circuitBreakersDontProtectPeople.channel}
            duration={videos.circuitBreakersDontProtectPeople.duration}
            topic="Why MCBs alone can't protect people · Unit 203 AC 4.2"
            caption="The Engineering Mindset takes the disconnection chain apart and shows exactly why an MCB without an RCD won't trip in time on a typical earth fault — the same reason BS 7671 mandates additional protection on every socket circuit and every cable in a wall."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Where the chain breaks</ContentEyebrow>

          <CommonMistake
            title="Treating the gas/water bonding as a substitute for a CPC"
            whatHappens={
              <>
                You’re replacing a metal-bodied light fitting on a stairwell. The CPC into the back
                of the rose looks corroded so you cut it back and never reconnect it, reasoning that
                "the building’s well bonded anyway — the gas and water are bonded back to the MET,
                so the fitting will get an earth through the structure". A fault months later means
                the metal fitting sits at line voltage; the next person to clean it touches it and
                drops dead.
              </>
            }
            doInstead={
              <>
                CPC and bonding are two different jobs. The CPC carries fault current back to the
                MET; bonding equalises potential between extraneous parts and the MET. Bonding is
                NOT a return path for fault current — its conductors aren’t routed for fault-loop
                use, the path through the structure is unpredictable, and the impedance is too high
                to trip the protective device. Every accessory needs its own continuous CPC back to
                the MET (Reg 411.3.1.1). No exceptions outside the Class II pendant case.
              </>
            }
          />

          <Scenario
            title="An EICR find — broken earthing conductor at the MET"
            situation={
              <>
                You’re doing an EICR on a 1980s ground-floor flat. At the MET the earthing
                conductor is loose in its terminal — a previous installer over-tightened the screw,
                stripped the thread, and the strap is now sitting in the terminal under spring
                tension only. Insulation resistance and continuity tests still pass because there’s
                physical contact, but you can lift the conductor out by hand.
              </>
            }
            whatToDo={
              <>
                Code C2 (potentially dangerous) at minimum — possibly C1 (immediate danger) if the
                conductor is genuinely free in the terminal. The earthing conductor is the link
                between the entire installation and the source earth. Without a secure mechanical
                connection, vibration, thermal cycling or routine work on the consumer unit could
                lift it clear at any moment, breaking the entire ADS chain. Make safe immediately —
                fit a new earth bar terminal or replace the strap, retest Ze and Zs at the MET.
              </>
            }
            whyItMatters={
              <>
                One loose terminal at the MET disables every protective device downstream. ADS is a
                chain — and the MET joint is the single point where the entire installation’s
                fault-current return path meets the supply earth. Treat that joint with the same
                care as a final-circuit termination, and never assume a "passes continuity test"
                reading means the connection is mechanically sound.
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

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              'ADS = Automatic Disconnection of Supply. The BS 7671 default protective measure for shock under fault conditions.',
              'It’s a chain: source → earth electrode/PEN/sheath → earthing conductor → MET → CPC (with main bonding to extraneous parts) → exposed-conductive-part → fault → line conductor → back to source. Plus the protective device that opens the line.',
              'Reg 411.3.1.1 makes a CPC mandatory at every accessory (one Class II pendant exception). Reg 411.3.1.2 makes main bonding mandatory at every extraneous-conductive-part liable to introduce a potential.',
              'Maximum disconnection times: Table 41.1 — TN 0.4 s, TT 0.2 s on most final circuits at 230 V AC; TN 5 s, TT 1 s on distribution circuits and circuits outside Reg 411.3.2.2.',
              'The MET is the single common node where earthing conductor, main bonding and all CPCs meet. Loose or corroded MET joints disable the entire ADS chain.',
              'Bonding is NOT a substitute for a CPC. They do different jobs — equalise potential vs carry fault current. You need both, every time.',
            ]}
          />

          <Quiz title="ADS components — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section4/4-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous subsection
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Earthing systems
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module3/section4/4-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Exposed conductive parts
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
