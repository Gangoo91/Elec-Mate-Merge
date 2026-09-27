/**
 * Unit 304E · Criterion 1.2 — Earthing systems and earthing and protective
 * conductors.
 *
 * Approach: the arrangements first — TN-S, TN-C-S as PME and as PNB, TT and IT —
 * each described by the route its fault current actually takes back to the
 * source. Then the conductors that make that route exist: the earthing
 * conductor, the main earthing terminal, the circuit protective conductor and
 * the main protective bonding conductors, with the sizing rules for each.
 *
 * Every technical fact, figure, regulation number and table reference on this
 * page comes from the existing published teaching in this course on earthing
 * systems and on the component parts of automatic disconnection of supply
 * (level2/module3/section4/Sub1.tsx and level2/module3/section4/Sub2.tsx).
 *
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

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
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';

const quizQuestions = [
  {
    id: 1,
    question: 'In the system designation TN-C-S, what does each letter tell you?',
    options: [
      'T = source directly earthed; N = installation exposed parts connected to that source earth by a protective conductor; C = neutral and PE combined in part of the system; S = separated in another part',
      'T = installation earthed via its own local electrode; N = neutral conductor; C = the consumer; S = the supply',
      'T = three-phase supply; N = neutral present; C = commercial premises; S = single-phase derived',
      'T = transmission voltage; N = nominal 230 V; C = combined-core cable; S = sheathed metallic cable',
    ],
    correctAnswer: 0,
    explanation:
      'First letter is source earthing, second is how the installation exposed-conductive-parts reach earth, and the third and fourth describe how neutral and protective conductors are arranged in the supply and the installation.',
  },
  {
    id: 2,
    question:
      'A lead-sheathed supply cable with a green and yellow strap clamped to the sheath itself and a separate neutral back to source is:',
    options: ['TN-S', 'TN-C-S (PME)', 'TT', 'IT'],
    correctAnswer: 0,
    explanation:
      'The sheath used as the protective conductor with a separate neutral all the way to the source is classic TN-S. It is increasingly rare on new supplies because DNOs convert to TN-C-S when they upgrade.',
  },
  {
    id: 3,
    question: 'Typical Ze on a healthy TN-C-S (PME) supply is around:',
    options: ['0.35 Ω', '0.8 Ω', '20 Ω', '200 Ω'],
    correctAnswer: 0,
    explanation:
      'Around 0.35 Ω for PME and around 0.8 Ω for TN-S. That low impedance is why overcurrent devices clear earth faults so reliably on TN systems. TT sits at 20–200 Ω and cannot rely on an MCB.',
  },
  {
    id: 4,
    question:
      'A TT installation has an electrode resistance of 80 Ω and a 30 mA RCD. Does it satisfy Regulation 411.5.3?',
    options: [
      'Yes — 80 × 0.030 = 2.4 V, well within the 50 V limit',
      'No — 80 × 30 = 2400 V, which fails badly',
      'No — the touch voltage is 230 V on any TT system',
      'It is exactly on the 50 V limit, so it is marginal',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 411.5.3 requires Ra × IΔn ≤ 50 V. With Ra = 80 Ω and IΔn = 0.030 A that is 2.4 V. The Table 41.5 maximum Zs for a 30 mA RCD is 1667 Ω, so an 80 Ω electrode is comfortable.',
  },
  {
    id: 5,
    question: 'What is the function of the main earthing terminal?',
    options: [
      'The single common point where the earthing conductor, the main bonding conductors and every CPC meet at one potential',
      'A current-limiting device that caps fault current before it reaches the protective device',
      'The point where the DNO splits the supply neutral into separate neutral and earth',
      'A dedicated earth electrode giving the installation its own connection to the mass of earth',
    ],
    correctAnswer: 0,
    explanation:
      'Earthing conductor in, main bonding out, CPCs out. One node at one potential — that is what makes equipotential bonding work during a fault, and it is also the single inspection point recorded on the certificate.',
  },
  {
    id: 6,
    question:
      'Why is the main earthing conductor on a domestic PME supply sized against the supplier neutral rather than the installation line conductor?',
    options: [
      'Because in a broken-PEN fault it may have to carry the installation full neutral return current to ground',
      'Because it carries the same load current as the line conductor in normal use',
      'Because BS 7671 sets a flat 16 mm² minimum for every earthing conductor',
      'Because the line and earthing conductors share a terminal so they must match',
    ],
    correctAnswer: 0,
    explanation:
      'On PME a broken PEN means the entire neutral current of the installation can return through the earthing and bonding conductors to the local earth. Table 54.8 sizes it for that, typically 16 mm² Cu on a domestic supply with a neutral up to 35 mm².',
  },
  {
    id: 7,
    question:
      'Regulation 411.3.1.1 requires a CPC at every point in wiring and every accessory, with one exception. What is it?',
    options: [
      'A lampholder having no exposed-conductive-parts and suspended from such a point',
      'A metal-clad socket-outlet fed from an all-plastic consumer unit',
      'Any accessory mounted in a plastic back-box',
      'A SELV light fitting supplied at 12 V from a remote transformer',
    ],
    correctAnswer: 0,
    explanation:
      'That single exception — a Class II pendant from an all-plastic ceiling rose — is why some older loop-in roses do not carry an earth out to the lampholder.',
  },
  {
    id: 8,
    question: 'Main protective bonding conductors are sized per Regulation 544.1 at:',
    options: [
      'Typically half the cross-sectional area of the earthing conductor, minimum 6 mm², and minimum 10 mm² on PME unless protected against mechanical damage',
      'Always the same size as the largest final circuit line conductor',
      'A flat 4 mm² on every domestic installation',
      'Twice the cross-sectional area of the earthing conductor',
    ],
    correctAnswer: 0,
    explanation:
      'Half the earthing conductor is the usual starting point, with a 6 mm² floor and a 10 mm² floor on PME. Table 54.8 pushes it higher where the supplier neutral is large.',
  },
];

const faqs = [
  {
    question: 'Why do I have to identify the earthing system before anything else?',
    answer:
      'Because every other safety calculation depends on it. A 32 A circuit on TN-C-S has a maximum Zs of about 1.37 Ω on a Type B device. The same circuit on TT relies entirely on a 30 mA RCD because Ze is in the tens or hundreds of ohms. Apply the same protection to both and you have either over-engineered the job or left a fatal gap.',
  },
  {
    question: 'How do I tell PME from PNB at the cut-out — they are both TN-C-S?',
    answer:
      'Usually you cannot, visually, at a single house. PME means the DNO has earthed the PEN at multiple points along their network. PNB means the PEN is earthed at one point only, very close to the consumer supply terminals. The distinction matters more to the DNO than to the electrician, but A4:2026 has formalised PNB, so it gets called out on private networks and some new-build sub-mains — and there are certificate columns for it.',
  },
  {
    question: 'What is the difference between earthing and bonding?',
    answer:
      'Earthing connects the MET back to the source so fault current can return. Bonding connects extraneous-conductive-parts — gas, water, structure — to the MET so they sit at the same potential during a fault. Two different jobs, both required, and each sized by its own rules in Chapter 54.',
  },
  {
    question: 'Can I just bond every metal thing in sight to be safe?',
    answer:
      'No. Over-bonding can be as dangerous as under-bonding. You can drag fault current onto pipework that was not previously extraneous, raise touch voltages on metalwork that was assumed safe, and create circulating currents on a PME supply. Regulation 411.3.1.2 is the rule: bond extraneous-conductive-parts that are liable to introduce a dangerous potential.',
  },
];

export default function Lesson304e_1_2() {
  return (
    <div className="space-y-8">
      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        The earthing arrangements you will meet at a UK cut-out, the route fault current takes home
        in each one, and the conductors that make that route exist.
      </p>

      <TLDR
        points={[
          'Five arrangements: TN-S, TN-C-S as PME, TN-C-S as PNB, TT and IT. The distributor chose for you; your job is to recognise which one and design to suit.',
          'The letters are systematic — source earthing, then how the installation reaches earth, then whether neutral and protective conductors are combined or separated.',
          'Each arrangement gives fault current a different route home, and that route sets Ze: around 0.35 Ω on PME, around 0.8 Ω on TN-S, 20–200 Ω on TT.',
          'Four conductor families do the work: the earthing conductor, the main earthing terminal, the circuit protective conductors and the main protective bonding conductors.',
          'Earthing carries fault current back to source. Bonding equalises potential. They are not interchangeable and they are sized by different rules.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Decode the letter designation of an earthing system and state what each letter describes.',
          'Identify TN-S, TN-C-S (PME), TN-C-S (PNB), TT and IT arrangements from a physical inspection at the cut-out.',
          'Trace the earth fault loop for each arrangement and explain how fault current returns to the source.',
          'State the function and the sizing rule for the earthing conductor, the main earthing terminal, the CPC and the main protective bonding conductors.',
          'Explain why protective bonding is not a substitute for a circuit protective conductor.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Reading the letters</ContentEyebrow>

      <ConceptBlock
        title="The designation is systematic, not arbitrary"
        plainEnglish="Each letter answers one question about the system. Learn the questions and you can read any designation you meet, including the ones you have not seen before."
        onSite="Identify the system before you touch anything else on a job. It takes ten seconds at the cut-out and it changes every calculation that follows."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>First letter — how the source is earthed.</strong> T means directly earthed at
            the source. I means isolated from earth, or connected to it through a high impedance.
          </li>
          <li>
            <strong>Second letter — how the installation reaches earth.</strong> N means the
            exposed-conductive-parts get there through a protective conductor back to the source
            earth. T means they get there through a local earth electrode independent of the
            source.
          </li>
          <li>
            <strong>Third and fourth letters — TN systems only.</strong> S means neutral and
            protective conductors are separated. C means they are combined as a PEN conductor.
            TN-C-S therefore means combined in the supply and separated in the installation.
          </li>
        </ul>
        <p>
          <strong>Identifying the arrangement at the cut-out.</strong> A thirty-second visual should
          settle it. TN-S shows a separate earth conductor or a sheath-bonding clamp to the MET,
          independent of the neutral block, usually on older lead-sheathed cable. TN-C-S (PME)
          shows a single combined conductor arriving from the distributor, with the earth strap to
          the MET clamped onto the neutral terminal block, and usually a multiple earthing notice.
          TN-C-S (PNB) is harder to spot at a single property and is normally called out on private
          distribution networks or new sub-mains. TT shows only line and neutral arriving, with a
          separate earthing conductor leaving the MET for a local electrode, often marked by a test
          pit. IT is industrial or medical only, identifiable by an insulation monitoring device
          and the absence of a direct source earth.
        </p>
        <p>
          Do not take the distributor label at face value. Mis-labelled supplies exist, usually
          after an upgrade where the paperwork did not catch up. Trace the earth back and confirm by
          inspection — a single PEN against separate neutral and earth in the tails, a sheath used
          as the protective conductor, the presence of a local rod. Nor does the material at the
          meter tell you anything: plastic tails or a plastic service head do not define the
          arrangement. What defines it is the conductor the consumer MET is actually connected to.
        </p>
        <p>
          The distributor decides what arrives at the cut-out and you do not get a vote. What you do
          get is the responsibility to recognise what has been installed and design the
          installation to match it. A 30 mA RCBO on a TN-C-S domestic ring is bread and butter; the
          same device with no upstream protection on a TT supply is a fail.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="304e-1-2-check-1"
        question="What does the second letter of an earthing system designation describe?"
        options={[
          'How the exposed-conductive-parts of the installation are connected to earth',
          'How the source is earthed at the transformer',
          'Whether the supply is single-phase or three-phase',
          'Whether neutral and protective conductors are combined or separated',
        ]}
        correctIndex={0}
        explanation="The second letter covers the installation side: N means via a protective conductor back to the source earth, T means via a local electrode independent of the source. Source earthing is the first letter; combined or separated conductors are the third and fourth."
      />

      <SectionRule />

      <ContentEyebrow>TN systems — the source earth comes to you</ContentEyebrow>

      <ConceptBlock
        title="TN-S — the sheath is the protective conductor"
        plainEnglish="Neutral and protective conductors stay physically separate from the transformer star point right through to your main earthing terminal. The protective conductor is normally the metallic sheath of the supply cable."
        onSite="A green and yellow strap clamped onto the lead or armoured sheath of the incoming cable — not onto the neutral block — is TN-S. Common in older terraces and unrefurbished urban housing."
      >
        <p>
          The distributor maintains the integrity of the sheath as a continuous earth path. To
          identify it at the cut-out you will see line, neutral and a separate earth conductor or a
          sheath-bonding clamp going to the MET. Critically, the earth strap does not connect to the
          neutral block.
        </p>
        <p>
          Ze on a healthy TN-S supply is typically around 0.8 Ω. Fault current rises high enough
          that overcurrent devices clear earth faults reliably without needing RCD assistance —
          although additional protection at 30 mA is still required by BS 7671 for socket outlets,
          mobile equipment and luminaires in dwellings.
        </p>
        <p>
          TN-S is becoming rare on new supplies. When distributors replace old lead-sheathed mains
          they almost always upgrade to TN-C-S, so treat TN-S as a maintenance encounter rather
          than an expectation, and never assume a new supply head is TN-S without checking.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="TN-C-S — the combined PEN, split at your service position"
        plainEnglish="One conductor brings both neutral and earth from the distributor. At the service position that PEN is split: one terminal becomes the installation neutral, another becomes the installation protective earth and goes to your MET."
        onSite="Lift the meter cover. A single combined conductor arriving from the distributor, with a strap from their neutral block to the consumer MET, is PME. It is the standard arrangement on new domestic supplies."
      >
        <p>
          The C refers to the combined supply portion and the S to the separated installation
          portion. From the service position inwards, the installation is wired with separate
          neutral and protective conductors throughout.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>PME — Protective Multiple Earthing.</strong> The common UK form. The distributor
            earths the PEN at multiple points along their network. Ze is typically around 0.35 Ω on
            a healthy supply, and that low impedance is why overcurrent protection alone clears
            earth faults so reliably.
          </li>
          <li>
            <strong>PNB — Protective Neutral Bonding.</strong> The second TN-C-S variant, brought
            into the regulations explicitly by A4:2026. The PEN is earthed at one point only — the
            neutral-earth link — positioned as close as practicable to the consumer supply
            terminals, between the transformer and the supply origin. Because there is a single
            earth connection on the PEN rather than many, PNB avoids some of the broken-PEN voltage
            rise risk that comes with PME on long networks.
          </li>
          <li>
            <strong>Why the distinction matters to you.</strong> Where PNB is installed within the
            consumer installation rather than as a distributor arrangement, PME conditions do not
            apply — which changes bonding conductor sizing and removes the PME-prohibited-location
            restrictions. A4:2026 also added schedule columns to the certification to capture PNB,
            so it has to be recorded correctly.
          </li>
          <li>
            <strong>The broken PEN.</strong> This is the headline PME risk. If the PEN goes
            open-circuit, the customer earth lifts toward line voltage and dumps neutral return
            current through the bonding conductors and the water and gas pipes. That is why main
            bonding on PME has a 10 mm² minimum, rising where Table 54.8 demands it for larger
            supply neutrals.
          </li>
        </ul>
      </ConceptBlock>

      <EarthingSystemDiagram system="TN-C-S" />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 312.2.1.1 (PNB figure and requirements, A4:2026 update)"
        clause="Regulation 312.2.1.1 now includes a Protective Neutral Bonding (PNB) figure and requirements (Figure 3.9B). PNB can apply to single-phase and three-phase supplies. The PEN conductor is connected to an earth electrode at a point remote from the transformer, between the transformer and the supply terminals of the consumer. This connection should be made as close as practicable to the consumer's supply terminals, in order to minimise the risk of voltage rise in the event of an open-circuit fault in the PEN conductor."
        meaning="PNB is the explicit second TN-C-S variant in the regulations. Where the source earth and the neutral-earth link sit within the consumer installation, which is typical on private networks, PME conditions do not apply — and that changes the bonding conductor sizing rules and lifts the PME-prohibited-location restrictions. Establish whether you are on PME or PNB before you specify the bonding."
        cite="Source: BS 7671:2018+A4:2026, Regulation 312.2.1.1 and Figure 3.9B."
      />

      <SectionRule />

      <ContentEyebrow>TT and IT — the installation provides its own answer</ContentEyebrow>

      <ConceptBlock
        title="TT — your own electrode, and the RCD does the work"
        plainEnglish="The distributor supplies line and neutral only. The installation earth is a local rod, plate or buried mat. Fault current returns through the electrode, through the soil, back to the substation electrode."
        onSite="Common on rural and overhead supplies where the distributor cannot guarantee an earth. Look for a green and yellow conductor leaving the MET and disappearing into the ground, often ending at an earth-electrode test pit."
      >
        <p>
          The source is earthed and the installation exposed-conductive-parts are earthed via a
          local electrode independent of it. The fault loop runs line, through the fault, along the
          CPC, to the MET, down the earthing conductor, into the local rod, through the soil, to the
          substation electrode and back to the source neutral.
        </p>
        <p>
          That soil-and-electrode return path is high impedance. Ze on a TT installation is
          typically 20–200 Ω, and considerably more on sandy or rocky ground. At those values fault
          current is far too low for an MCB to trip in the required time, so TT installations rely
          on RCDs for fault protection. The standard domestic arrangement is a 100 mA time-delayed
          S-type RCD at the origin, for selectivity, with 30 mA RCDs or RCBOs on the final circuits.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 411.5.3 (RCDs in TT systems)"
        clause="Where an RCD is used for fault protection, the following conditions shall be fulfilled: (a) the disconnection time shall be that required by Regulation 411.3.2.2 or 411.3.2.4; and (b) Ra × IΔn ≤ 50 V, where Ra is the sum of the resistances of the earth electrode and the protective conductor connecting it to the exposed-conductive-parts (in ohms) and IΔn is the rated residual operating current of the RCD. Table 41.5 gives the maximum earth fault loop impedance Zs for non-delayed and time-delayed S Type RCDs at U₀ = 230 V — for example 1667 Ω for 30 mA, 500 Ω for 100 mA, 167 Ω for 300 mA, and 100 Ω for 500 mA."
        meaning="On a 30 mA RCD the maximum allowable Zs from Table 41.5 is 1667 Ω, so even a 200 Ω electrode is comfortably inside the limit. The headline test on a TT installation is not whether the MCBs trip — it is whether Ra × IΔn stays under 50 V and whether the RCD operates within the disconnection time. Without an RCD a TT installation cannot comply."
        cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.5.3 and Table 41.5."
      />

      <ConceptBlock
        title="IT — the first fault is alarmed, not disconnected"
        plainEnglish="The source is not directly earthed, or is earthed through a high impedance. A first earth fault produces only a small current, so the supply is not automatically disconnected. It is alarmed instead, and found at a planned time."
        onSite="You will not meet IT in domestic work. It is industrial process plant where shutting the supply down is more dangerous than the fault, and medical Group 2 locations where losing supply could kill a patient on the table."
      >
        <p>
          The exposed-conductive-parts of an IT installation are still earthed, individually or
          collectively, under Regulation 411.6.2. The characteristic feature is that the first earth
          fault generates only a small current — limited by the source impedance — and is not
          required to cause automatic disconnection. An insulation monitoring device raises an alarm
          so the fault can be found and cleared.
        </p>
        <p>
          On a second fault, occurring on a different conductor, full short-circuit current flows
          and the protective device must operate. That is why IT is a specialist arrangement: the
          protective scheme has to handle two distinct fault scenarios, the monitoring device has to
          be maintained, and isolation procedures matter as much as the wiring. Recognise one and
          escalate it.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="304e-1-2-check-2"
        question="On a TT installation, why will a Type B MCB alone not provide fault protection?"
        options={[
          'Because the MCB magnetic trip is disabled on TT systems',
          'Because the supply neutral is not connected to earth at the source',
          'Because Ze is typically 20–200 Ω, so fault current is far too low to reach the magnetic trip threshold in time',
          'Because TT systems operate at a lower nominal voltage',
        ]}
        correctIndex={2}
        explanation="The electrode-and-soil return path is high impedance. At 20–200 Ω the fault current never gets near the level an MCB needs to trip in the required time, which is why an RCD does the fault protection on TT."
      />

      <SectionRule />

      <ContentEyebrow>How the fault current gets home</ContentEyebrow>

      <ConceptBlock
        title="Walk the loop — every conductor it passes through is a link you have to get right"
        plainEnglish="Trace the current. Start at the source, follow the line into the fault, then follow the earth path back. Every component you cross is part of the loop, and the one with the highest impedance dominates."
        onSite="Take a TN-C-S domestic with a 32 A Type B RCBO on a kitchen ring and a live conductor shorted to a metal back box. This is the order the current actually travels."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>1. Source phase winding.</strong> The secondary of the substation transformer.
            Source impedance is the irreducible floor on Ze.
          </li>
          <li>
            <strong>2. Distributor line conductor.</strong> Service cable from the substation to the
            cut-out. Adds resistance to Ze.
          </li>
          <li>
            <strong>3. Installation line conductor.</strong> Meter tails, then the cable from the
            board to the socket. This is the R1 part of the installation impedance.
          </li>
          <li>
            <strong>4. The fault itself.</strong> Assumed negligible impedance for design purposes —
            a clean copper-to-copper short.
          </li>
          <li>
            <strong>5. Exposed-conductive-part.</strong> The metal back box the line conductor has
            touched, currently sitting near line potential.
          </li>
          <li>
            <strong>6. Circuit protective conductor.</strong> The green and yellow core running back
            from the socket to the board. This is the R2 part.
          </li>
          <li>
            <strong>7. Main earthing terminal.</strong> The common bar where every CPC, the main
            bonding and the earthing conductor meet.
          </li>
          <li>
            <strong>8. Earthing conductor.</strong> Typically 16 mm² copper on a PME domestic,
            running from the MET to the distributor neutral block at the service position.
          </li>
          <li>
            <strong>9. Distributor PEN conductor.</strong> Combined neutral and earth back through
            the supply cable to the substation.
          </li>
          <li>
            <strong>10. Source neutral terminal.</strong> Back at the transformer star point. The
            loop closes.
          </li>
        </ul>
        <p>
          The fault current around this loop is U₀ ÷ Zs. On a healthy TN-C-S installation with Zs
          around 1.0 Ω that is 230 A — comfortably above the magnetic trip threshold of any Type B
          device. Ze is set by the supply side, R1+R2 by the installation side, and Zs is the sum of
          the two. That is the whole arithmetic of fault protection in one line.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The conductors that make it work</ContentEyebrow>

      <ConceptBlock
        title="The earthing conductor and the main earthing terminal"
        plainEnglish="The earthing conductor links the MET back to the source earth or to the local electrode. The MET is the one place inside the installation where everything that must sit at earth potential comes together."
        onSite="On a domestic PME the earthing conductor is the 16 mm² green and yellow strap from the MET to the distributor neutral block. On a TT it is the buried run out to the rod — 25 mm² copper unprotected against corrosion, or 16 mm² copper where it is corrosion-protected, under Table 54.1."
      >
        <p>
          <strong>Sizing the earthing conductor.</strong> Either Table 54.7, which relates
          cross-sectional area to the line conductors and the fault current calculation, or Table
          54.8 for installations with a PEN or PME-supplied origin, which sizes it against the
          supplier neutral. On a TT system any buried portion also has to meet the Table 54.1
          minimum sizes for buried conductors, which has separate columns for conductors protected
          and not protected against corrosion. A 16 mm² unprotected copper conductor buried in soil
          corrodes over years and the earth path silently degrades.
        </p>
        <p>
          <strong>The MET.</strong> Physically it is usually a brass or copper terminal block inside
          or next to the consumer unit, labelled MET or marked with the earth symbol. It has two
          jobs. First, provide a single low-impedance node so that every earthed and bonded part of
          the installation sits at the same potential during a fault. Second, provide a single
          inspection point where every connection can be tested and recorded on the certificate
          schedule.
        </p>
        <p>
          One loose terminal at the MET disables every protective device downstream of it. Treat
          that joint with the same care as a final-circuit termination, and never take a passing
          continuity reading as proof that the connection is mechanically sound.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="CPC and main protective bonding — two conductors, two completely different jobs"
        plainEnglish="The circuit protective conductor carries fault current back to the MET so the protective device can see it. Main protective bonding holds extraneous metalwork at the same potential as the MET while that is happening. One is a return path, the other is not."
        onSite="In twin and earth the CPC is the bare copper, sleeved green and yellow at every termination. On SWA the armour is normally the CPC, sometimes with a separate green and yellow core added for redundancy."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>CPC — where it goes.</strong> From the MET out to every accessory and
            exposed-conductive-part on every circuit. Regulation 411.3.1.1 makes it mandatory at
            every wiring point and every accessory, with one exception: a lampholder having no
            exposed-conductive-parts and suspended from such a point.
          </li>
          <li>
            <strong>CPC — how it is sized.</strong> Regulation 543.1, either by calculation against
            the fault current the protective device will see, or against Table 54.7 with the
            simplified rules tied to the line conductor size.
          </li>
          <li>
            <strong>Main bonding — where it goes.</strong> From the MET out to
            extraneous-conductive-parts that are liable to introduce a dangerous potential —
            incoming gas, water, oil, structural steel, lightning protection earth. The gas
            connection is made within 600 mm of the meter outlet, on the consumer side.
          </li>
          <li>
            <strong>Main bonding — how it is sized.</strong> Regulation 544.1. Typically half the
            cross-sectional area of the earthing conductor, with a 6 mm² minimum, and a 10 mm²
            minimum on PME unless the conductor is protected against mechanical damage. Typically
            10 mm² copper on a domestic installation.
          </li>
        </ul>
        <p>
          Bonding is not a return path for fault current. Its conductors are not routed for
          fault-loop use, the path through the structure is unpredictable, and the impedance is far
          too high to operate the protective device. You need both, every time, and each is sized
          by its own rule.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulations 411.3.1.1 and 411.3.1.2 (Protective earthing and protective equipotential bonding)"
        clause="Regulation 411.3.1.1 (Protective earthing): Exposed-conductive-parts shall be connected to a protective conductor under the specific conditions for each type of system earthing as specified in Regulations 411.4 to 411.6. Simultaneously accessible exposed-conductive-parts shall be connected to the same earthing system individually, in groups or collectively. A circuit protective conductor shall be run to and terminated at each point in wiring and at each accessory except a lampholder having no exposed-conductive-parts and suspended from such a point. Regulation 411.3.1.2 (Protective equipotential bonding): In each consumer's installation within a building, extraneous-conductive-parts liable to introduce a dangerous potential difference shall be connected to the main earthing terminal by protective bonding conductors complying with Chapter 54."
        meaning="411.3.1.1 makes the CPC mandatory at every accessory, with the single Class II pendant exception. 411.3.1.2 makes main bonding mandatory at every extraneous-conductive-part liable to introduce a potential. Together they define the two halves of the protective scheme — the earthing path that makes fault current flow, and the bonding that keeps touch voltages survivable while the device clears the fault."
        cite="Source: BS 7671:2018+A4:2026 Part 4, Chapter 41, Regulation 411.3.1."
      />

      <InlineCheck
        id="304e-1-2-check-3"
        question="An apprentice asks why an installation needs an earthing conductor when everything is already bonded to the MET. What is the correct answer?"
        options={[
          'They do the same job — the earthing conductor is a spare in case a bonding conductor fails',
          'Bonding carries fault current to source; the earthing conductor only equalises potential at the MET',
          'The earthing conductor is only needed on TT supplies',
          'Bonding equalises potential between extraneous parts and the MET; the earthing conductor links the MET back to the source earth so fault current can return',
        ]}
        correctIndex={3}
        explanation="Two distinct jobs. Bonding keeps the gas pipe and the metal sink at the same voltage as the MET during a fault. Earthing carries fault current back to source. Both are required and they are sized by different tables."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating gas and water bonding as a substitute for a CPC"
        whatHappens={
          <>
            You are replacing a metal-bodied light fitting on a stairwell. The CPC into the back of
            the rose looks corroded, so you cut it back and never reconnect it, reasoning that the
            building is well bonded anyway and the fitting will find an earth through the
            structure. Months later a fault puts the metal fitting at line voltage, and the next
            person to clean it is the one who finds out.
          </>
        }
        doInstead={
          <>
            Every accessory gets its own continuous CPC back to the MET under Regulation 411.3.1.1,
            with no exception outside the Class II pendant case. Bonding equalises potential; it
            does not carry fault current. Its conductors are not routed for fault-loop use and the
            impedance through the structure will not operate the protective device.
          </>
        }
      />

      <CommonMistake
        title="Carrying a PME earth into a prohibited location"
        whatHappens={
          <>
            You wire a new dispenser controller on a filling-station forecourt and bond its metal
            enclosure to the customer PME earth the way you would in a domestic property. A broken
            PEN then drags the exposed-conductive-parts of the forecourt toward line voltage, and
            the resulting spark in an explosive atmosphere ignites vapour at the dispenser.
          </>
        }
        doInstead={
          <>
            Know the PME-prohibited locations — petrol filling stations, marinas and caravan parks,
            including boats moored at marinas. On these you derive a TT installation for the
            hazardous-area equipment, with its own earth electrode and dedicated 30 mA RCD
            protection, entirely separate from the building PME earthing. Check the relevant Part 7
            section for the location-specific requirements before you design anything.
          </>
        }
      />

      <Scenario
        title="Two supplies in one building in Llandudno"
        situation={
          <>
            You are first-fixing two new flats built above an existing shop on the promenade. The
            shop has been on TN-S — old lead-sheathed mains — for fifty years. The distributor has
            installed a new TN-C-S (PME) supply for the flats with its own meter position. The shop
            owner asks whether you can just connect the new flats to the existing board to save on
            meter charges.
          </>
        }
        whatToDo={
          <>
            Refuse, and explain why. Bridging a PME supply into a TN-S installation creates a
            parallel earth path between two unrelated distributor earthing systems. Beyond the
            metering issue, you would be relying on the lead sheath of an old TN-S cable to carry
            fault current from a PME-class installation upstairs, and the bonding conductor sizing
            rules for the two arrangements are not the same. Each supply keeps its own earthing
            arrangement, its own MET, its own main bonding and its own meter.
          </>
        }
        whyItMatters={
          <>
            Mixing earthing systems inside one building is one of the higher-risk faults found on
            periodic inspections. It usually happens during piecemeal extensions where a new supply
            is added but the wiring quietly bridges back to the old supply earth. Spot it, code it,
            and recommend separation before any further work proceeds.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Five arrangements: TN-S, TN-C-S (PME), TN-C-S (PNB, formalised in A4:2026 at Regulation 312.2.1.1), TT and IT.',
          'The letters read systematically: source earthing, then how the installation reaches earth, then whether N and PE are combined or separated.',
          'TN-S returns fault current through the supply cable sheath — Ze around 0.8 Ω. TN-C-S returns it through the combined PEN — Ze around 0.35 Ω on PME.',
          'TT returns fault current through a local electrode and the soil — Ze typically 20–200 Ω, so an RCD does the fault protection and Regulation 411.5.3 requires Ra × IΔn ≤ 50 V.',
          'IT tolerates a first fault, which is alarmed by an insulation monitoring device rather than disconnected. A second fault on another conductor must be cleared.',
          'The earthing conductor links the MET to the source earth or electrode — sized by Table 54.7, or Table 54.8 against the supplier neutral on PME, and Table 54.1 where buried.',
          'The MET is the single common node: earthing conductor in, main bonding out, every CPC out. One loose terminal there disables every device downstream.',
          'The CPC carries fault current back (Regulation 411.3.1.1, one Class II pendant exception, sized per 543.1). Main bonding equalises potential (Regulation 544.1, half the earthing conductor, 6 mm² minimum, 10 mm² on PME). They are not interchangeable.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="Earthing systems and protective conductors — knowledge check" />
    </div>
  );
}
