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
    id: 'mod3-s3-pme-sizing',
    question:
      'You are working on a TN-C-S supply with a 50 mm² PEN conductor at the cut-out. The earthing conductor is 16 mm². What is the minimum copper-equivalent csa for the main protective bonding conductor?',
    options: [
      '8 mm² — half the earthing conductor csa.',
      '10 mm² — Table 54.8 minimum for PEN ≤ 35 mm².',
      '16 mm² — Table 54.8 row "PEN over 35–50 mm²" requires 16 mm² copper-equivalent on a PME supply. The non-PME "half the earthing conductor" rule does not apply because PME conditions apply.',
      '25 mm² — same as the line conductor.',
    ],
    correctIndex: 2,
    explanation:
      'Reg 544.11 sends PME (TN-C-S) supplies to Table 54.8. PEN of 50 mm² falls in the "over 35–50 mm²" row → 16 mm² minimum. The "half the earthing conductor" rule is the non-PME default and does not apply here. DNO may still require larger by local agreement.',
  },
  {
    id: 'mod3-s3-clamp-on-paint',
    question:
      'You probe to the bonding clamp head on a gas pipe and read 0.05 Ω. The clamp looks well-fitted but the pipe has a layer of yellow factory paint underneath the jaws. What is wrong with relying on this reading?',
    options: [
      'Nothing — 0.05 Ω is comfortably "low resistance".',
      'The reading captures the conductor and the clamp screw, but does NOT capture the clamp-to-metalwork interface. The paint between clamp jaws and pipe could be 12–18 Ω. Probe to the bare metalwork beyond the clamp to capture the real bond.',
      'The clamp should be on the supply side of the meter.',
      'The reading is too low — gas bonds should read 0.5 Ω minimum.',
    ],
    correctIndex: 1,
    explanation:
      'The bond is to the metalwork, not to the clamp. Probing the clamp head bypasses the interface that paint and oxide live in. Always probe to clean metal beyond the clamp — sand back any paint or oxide first if necessary. A 0.05 Ω probe-the-clamp reading on a painted pipe is the canonical hidden-fail.',
  },
  {
    id: 'mod3-s3-cross-bond',
    question:
      'MET → gas inlet pipe = 0.05 Ω. MET → water inlet pipe = 0.04 Ω. Gas-to-water reading direct = 0.05 Ω. Gas and water are not directly bonded to each other. What does this tell you?',
    options: [
      'Both bonds fail — readings inconsistent.',
      'Each bond passes, but there is a parallel metallic path between gas and water (combi-boiler casing, copper cylinder, or shared metalwork). Expected gas-to-water = 0.04 + 0.05 = 0.09 Ω; measured 0.05 Ω is lower → cross-bond. Note on schedule, do not remediate.',
      'The MET is not connected to earth.',
      'Test-lead resistance was not nulled.',
    ],
    correctIndex: 1,
    explanation:
      'A cross-bond is a parallel metallic path between two already-bonded services. Not a fault, but it lowers Ze / Zs readings and can shift them upward when the parallel path is later removed (cylinder change, boiler swap). Document on the schedule so future inspectors expect the shift if metalwork changes.',
  },
  {
    id: 'mod3-s3-22k-extraneous',
    question:
      'A property has a plastic incoming water main and all-internal copper pipework. You probe from the internal copper pipework to a separate true-earth electrode and read 38 kΩ. Per Reg 411.3.1.2 NOTE and the IET threshold, is the internal pipework an extraneous-conductive-part?',
    options: [
      'Yes — all metallic pipework must be bonded regardless of incoming pipe type.',
      'No — 38 kΩ ≥ 22 kΩ threshold, so the metalwork is unlikely to introduce a dangerous potential and is not an extraneous-conductive-part. Reg 411.3.1.2 NOTE applies — bonding not required. Document the test on the certificate.',
      'Bonding is required only on TT supplies.',
      'Test invalid — must use a megger at 500 V.',
    ],
    correctIndex: 1,
    explanation:
      'The 22 kΩ IET threshold is the value below which touch voltage during a fault could become unsafe. ≥ 22 kΩ to true earth = not extraneous, no bonding duty. Always document the resistance value and the test method on the certificate so the basis of the no-bonding decision is auditable.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 411.3.1.2 lists examples of extraneous-conductive-parts that require main protective bonding. Which of the following is NOT named in the regulation?',
    options: [
      'Metallic water installation pipes',
      'Metallic gas installation pipes',
      'Plastic waste pipework with no metallic content',
      'Exposed metallic structural parts of the building',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 411.3.1.2 lists metallic water installation pipes, metallic gas installation pipes, other metallic installation pipework and ducting, central heating and air conditioning systems, and exposed metallic structural parts of the building. Plastic pipework is explicitly noted as NOT normally requiring bonding — non-metallic pipes do not introduce a dangerous potential difference, so they fall outside the duty.',
  },
  {
    id: 2,
    question:
      'Reg 544.1.2 sets a location requirement for the main bonding connection to a metallic gas or water service. What is it?',
    options: [
      'Within 1 metre of the consumer unit',
      'Within 600 mm of the meter outlet union, on the consumer’s hard metal pipework, before any branch pipework, where practicable',
      'At any point on the bonded pipe',
      'Within the boiler cupboard',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 544.1.2 says the connection shall be made on the consumer’s hard metal pipework and before any branch pipework, and where practicable within 600 mm of the meter outlet union, or at the point of entry to the building if the meter is external. The "consumer’s hard pipework, before any branch" wording is what matters — bonding to a flexi or downstream of a tee piece does not satisfy the regulation.',
  },
  {
    id: 3,
    question:
      'Reg 544.11 sets the minimum csa of a main protective bonding conductor on a non-PME supply. What is it?',
    options: [
      'Always 10 mm² copper',
      'Not less than half the csa of the earthing conductor of the installation',
      'Same as the line conductor',
      'Not less than 25 mm² copper',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 544.11 first sentence: except where PME conditions apply, a main protective bonding conductor shall have a csa not less than half the csa required for the earthing conductor. Where PME applies, sizing follows Table 54.8 against the PEN conductor — typically 10 mm² for PEN ≤ 35 mm². The "half the earthing conductor" rule is the non-PME default.',
  },
  {
    id: 4,
    question:
      'On a TN-C-S (PME) supply where the PEN conductor is 25 mm², what is the minimum csa of the main protective bonding conductor per Table 54.8?',
    options: ['6 mm²', '10 mm²', '16 mm²', '25 mm²'],
    correctAnswer: 1,
    explanation:
      'Table 54.8 row "PEN conductor ≤ 35 mm²" requires minimum 10 mm² copper-equivalent for the main protective bonding conductor. Some DNOs require larger (e.g. 16 mm²) by local agreement — confirm with the local distributor before installation. The 10 mm² is a minimum, not a maximum.',
  },
  {
    id: 5,
    question:
      'GN3 Chapter 2 names the test for main bonding continuity. What instrument and what acceptance criterion?',
    options: [
      'A multimeter on the lowest ohms range, with no specific acceptance value',
      'A low-resistance ohmmeter; acceptance is "low resistance" — no fixed numeric maximum, judged against the conductor size and length',
      'An insulation resistance tester at 500 V',
      'A clamp-on earth resistance tester',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 Chapter 2 names the low-resistance ohmmeter (BS EN 61557-4) as the instrument. The acceptance criterion is "low resistance" — there is no fixed numeric maximum in BS 7671 for main bonding continuity. The test confirms the conductor is electrically continuous and that the connections to the MET and to the extraneous-conductive-part are sound. Anything in the order of an ohm or more on a real bond is investigated.',
  },
  {
    id: 6,
    question:
      'Where in the test sequence does main bonding continuity sit, and how is the test carried out?',
    options: [
      'Before isolation, with the supply on, between any two metallic services',
      'After safe isolation, with the bonding conductor in place: meter from the MET to the extraneous-conductive-part (e.g. the gas meter inlet pipe), reading the resistance of the bonding conductor in series with both terminations',
      'Only during a periodic inspection, never on initial verification',
      'By disconnecting the bond at both ends and measuring the conductor on the bench',
    ],
    correctAnswer: 1,
    explanation:
      'After safe isolation, with the bonding conductor connected as installed, the low-resistance ohmmeter reads from the MET to the extraneous-conductive-part itself (not to the bonding clamp screw — to the metalwork beyond it). The reading captures the conductor + the two terminations + any contact resistance from clamp to pipe. The test verifies the installed system, not the conductor in isolation.',
  },
  {
    id: 7,
    question:
      'You measure from the MET to the gas meter inlet pipe and read 0.04 Ω. From the MET to the water meter inlet pipe you read 0.05 Ω. From the gas meter pipe to the water meter pipe you read 0.06 Ω. The gas and water are not directly bonded to each other, so the 0.06 Ω should be the sum of 0.04 + 0.05. Why is it not?',
    options: [
      'The meter is faulty',
      'The two services are connected to each other via metallic pipework (e.g. a combi-boiler casing or a copper hot-water cylinder linked to both gas and water), creating a parallel path that is shorter than going via the MET — this is the cross-bond signature',
      'Test-lead resistance was not nulled',
      'The MET is not connected to earth',
    ],
    correctAnswer: 1,
    explanation:
      'Two bonded services with no direct bond between them should read the sum of their individual resistances back to the MET when measured between them. A reading lower than that sum means there is a parallel metallic path between the two services — typically a combi-boiler that ties gas and water together via the heat exchanger and casing, or a copper cylinder. This is not necessarily a fault but it is a parallel earth path that affects loop impedance readings and Ze, and should be noted.',
  },
  {
    id: 8,
    question:
      'On a domestic install with both gas and water entering the property, plus structural steelwork in a basement, how many main bonding conductors are required?',
    options: [
      'One — a daisy-chain from MET → gas → water → steelwork',
      'Three — a separate main bonding conductor from the MET to each extraneous-conductive-part, with no daisy-chaining of the bonding conductor itself between extraneous-conductive-parts',
      'One conductor to whichever is closest to the MET',
      'Optional — bonding is recommended but not required',
    ],
    correctAnswer: 1,
    explanation:
      'Each extraneous-conductive-part requires its own main protective bonding conductor back to the MET. The conductor itself should not be daisy-chained between two extraneous parts because a break or disconnection at the first part removes bonding from the second. Reg 544.1.2 implicitly requires the bond to be at the point of entry of each part, before branch pipework.',
  },
  {
    id: 9,
    question:
      'A copper water service enters a property and is replaced by a plastic insert in the consumer’s pipework before any branch. The downstream pipework is all metallic. Does Reg 411.3.1.2 require main bonding of the downstream metallic pipework?',
    options: [
      'Yes — all metallic pipework must be bonded regardless',
      'Reg 411.3.1.2 NOTE: where non-metallic (plastic) pipes enter the building and are then connected to metallic pipes within the building, the metallic pipes within the building do not normally require protective bonding as they are unlikely to be extraneous-conductive-parts. Verify with a resistance test to confirm',
      'No — plastic anywhere in the run removes the duty',
      'Only if the property is on TT',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 411.3.1.2 NOTE explicitly addresses the plastic-insert case: where the incoming pipe is non-metallic and is then connected to metallic internal pipework, the internal metalwork is unlikely to be an extraneous-conductive-part and does not normally require bonding. The "normally" caveat means you verify by resistance measurement to true earth — anything < 22 kΩ (the GN8 / IET threshold for an extraneous-conductive-part) and the duty re-applies.',
  },
  {
    id: 10,
    question:
      'You measure main bonding continuity from the MET to a metallic structural beam in a basement and read 14.7 Ω. The bonding clamp at the beam is well-fitted. Is this acceptable?',
    options: [
      'Yes — it’s under 50 Ω, which is the BS 7671 acceptance limit',
      'Yes — there is no numeric limit so any low value passes',
      'No — 14.7 Ω is far too high for main bonding. Investigate: the clamp may be on paint or oxide, the conductor may have a broken strand under a screw, the MET termination may be loose, or the bond run includes a joint that has not been made properly',
      'No — bonding to structural steel is not required',
    ],
    correctAnswer: 2,
    explanation:
      'There is no fixed numeric maximum in BS 7671, but "low resistance" is the criterion in GN3 — and 14.7 Ω is not low. Real main bonding continuity readings are typically a small fraction of an ohm (the conductor resistance plus a few mΩ for the clamp). 14.7 Ω indicates a poor termination or a series joint and must be remediated — the touch voltage during a fault would be unsafe even though the bond is "present".',
  },
];

const InspectionTestingModule3Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Main bonding conductor testing | I&T Module 3.3 | Elec-Mate',
    description:
      'Reg 643.2.1 + Reg 411.3.1.2 + Reg 544.1.1 / 544.11: continuity testing of the main protective bonding conductors from MET to gas, water, structural steel, oil and district heating — with conductor sizing per Table 54.7 / 54.8 and the "within 600 mm of meter inlet" rule.',
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
            eyebrow="Module 3 · Section 3"
            title="Main bonding conductor testing"
            description="Reg 411.3.1.2 says you must bond every extraneous-conductive-part to the MET. Reg 643.2.1 says you must test every one of those bonds by resistance measurement. This is how the test is done, what the conductor must be sized at, and what the readings tell you."
            tone="yellow"
          />

          <TLDR
            points={[
              'Main protective bonding is not optional dressing. It is the protective measure that ties the metalwork of incoming services (gas, water, structural steel, oil, district heating) to the MET so that, during an earth fault, every metallic part inside the building rises and falls together — touch voltage between two simultaneously accessible parts stays inside the safe envelope.',
              'Reg 411.3.1.2 is the duty-bearing regulation: extraneous-conductive-parts liable to introduce a dangerous potential difference shall be connected to the main earthing terminal by protective bonding conductors. The regulation lists examples (water, gas, other metallic pipework, central heating / air conditioning, structural steelwork) and explicitly excludes incoming plastic pipework.',
              'Reg 544.1.1 / 544.11 size the conductor. On non-PME supplies: not less than half the csa of the earthing conductor. On PME (TN-C-S): per Table 54.8 against the PEN conductor — typically 10 mm² for PEN ≤ 35 mm². Reg 544.1.2 sets the location: consumer’s hard metal pipework, before any branch, within 600 mm of the meter outlet where practicable.',
              'Reg 643.2.1 requires every main bonding conductor to be tested by resistance measurement. GN3 Chapter 2 names the instrument (low-resistance ohmmeter, BS EN 61557-4) and the technique: meter from MET to the extraneous-conductive-part itself (the metal beyond the clamp) — the reading captures the conductor plus both terminations.',
              'Acceptance: "low resistance". No fixed numeric maximum in BS 7671. Expect a small fraction of an ohm for the conductor plus the clamp. Anything in the order of an ohm or more is a flag, not an acceptance value. The "cross-bond" between gas and water meters via a combi-boiler / copper cylinder is a parallel path that lowers readings and should be noted, not relied on.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the duty in Reg 411.3.1.2 and identify the extraneous-conductive-parts in any given installation that require main protective bonding',
              'Size a main protective bonding conductor correctly under both non-PME (Reg 544.11 first sentence) and PME (Table 54.8) regimes',
              'Apply Reg 544.1.2 — connect on the consumer’s hard metal pipework, before any branch, within 600 mm of the meter outlet — and explain why each part of the rule matters',
              'Carry out the main bonding continuity test in the correct sequence using a low-resistance ohmmeter, capturing the reading from MET to the metalwork beyond the clamp',
              'Recognise the cross-bond signature where two bonded services share an unintended parallel path (combi-boiler, copper cylinder, structural steel), and record it correctly',
              'Distinguish a "low resistance" pass from a marginal fail — and remediate poor terminations rather than accepting an "in tolerance" reading',
            ]}
          />

          <ContentEyebrow>The duty — Reg 411.3.1.2</ContentEyebrow>

          <ConceptBlock
            title="Why we bond metalwork — touch voltage, not tradition"
            plainEnglish="During an earth fault, the MET sits at some voltage above true earth (because Ze is non-zero and fault current is flowing through it). If the metalwork of the gas pipe is bonded to the MET, the gas pipe rises with the MET and stays at the same potential. If it is not bonded, the gas pipe stays at true earth — and a person standing barefoot on a tiled floor with one hand on a tap and one hand on the gas pipe finds themselves bridging the full Ze × If voltage. Bonding is what stops that voltage existing across simultaneously accessible parts."
            onSite="A homeowner who asks 'why do you have to bond the gas?' is asking the right question. The answer is the touch-voltage answer above — not 'because it’s the regs'. The regs are derivative of the safety case, and the safety case is that during a fault the metalwork rises together."
          >
            <p>
              Reg 411.3.1.2 is the duty: every extraneous-conductive-part liable to introduce a
              dangerous potential difference must be connected to the MET by a protective bonding
              conductor. The regulation gives a non-exhaustive list:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>(a) metallic water installation pipes</li>
              <li>(b) metallic gas installation pipes</li>
              <li>(c) other metallic installation pipework and ducting</li>
              <li>(d) central heating and air conditioning systems</li>
              <li>(e) exposed metallic structural parts of the building</li>
            </ul>
            <p>
              The regulation also includes the NOTE on plastic incoming pipes: where non-metallic
              pipes enter a building and are then connected to metallic pipes within the building,
              the metallic pipes within the building do not normally require protective bonding as
              they are unlikely to be extraneous-conductive-parts. Read &lsquo;normally&rsquo; as
              &lsquo;verify with a resistance test before deciding&rsquo;. If the metalwork has a
              path to true earth that produces a resistance below the IET threshold of 22 kΩ from
              any other location, it is an extraneous-conductive-part and the duty applies.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.3.1.2"
            clause={
              <>
                In each consumer&rsquo;s installation within a building, extraneous-conductive-parts
                liable to introduce a dangerous potential difference shall be connected to the main
                earthing terminal by protective bonding conductors complying with Chapter 54.
                Examples of extraneous-conductive-parts can include:
                <br />
                (a) metallic water installation pipes; (b) metallic gas installation pipes; (c)
                other metallic installation pipework and ducting; (d) central heating and air
                conditioning systems; (e) exposed metallic structural parts of the building.
                <br />
                NOTE: Where non-metallic pipes (e.g. plastic) enter a building and are then
                connected to metallic pipes within the building, the metallic pipes within the
                building do not normally require protective bonding as they are unlikely to be
                extraneous-conductive-parts.
              </>
            }
            meaning="Two duties in one regulation: identify what needs bonding, and bond it. The list is illustrative — you have to think for yourself about whether a given metallic part is liable to introduce a dangerous potential. Structural steel that connects to true earth via foundations is a yes; a stainless-steel splashback screwed to a plasterboard wall is almost certainly a no. Verify with a resistance measurement when in doubt."
          />

          <SectionRule />

          <ContentEyebrow>The conductor — sizing per Reg 544.11</ContentEyebrow>

          <ConceptBlock
            title="Two regimes: non-PME (half the earthing conductor) vs PME (Table 54.8)"
            plainEnglish="On a non-PME supply (TN-S, TT), the main bonding conductor must be at least half the csa of the earthing conductor of the installation. On a PME (TN-C-S) supply, the main bonding conductor is sized against Table 54.8 — typically 10 mm² where the PEN conductor of the supply is 35 mm² or smaller."
            onSite="Always confirm the supply earthing arrangement first: it determines which sizing rule applies. A 10 mm² bond on a non-PME supply with a 16 mm² earthing conductor is undersized (should be ≥ 8 mm² — so 10 mm² is fine in that case). A 10 mm² bond on a PME supply with a 35 mm² PEN is at the minimum and acceptable, unless the local distributor requires larger."
          >
            <p>Reg 544.11 sets out the two regimes explicitly. For non-PME (default rule):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Main bonding csa ≥ half the csa of the earthing conductor of the installation.
              </li>
              <li>
                Where the earthing conductor is 16 mm², the main bond is at least 8 mm² — rounded up
                to the nearest standard size, that is 10 mm².
              </li>
              <li>
                Where the installation serves more than one building, csa not less than 6 mm² and
                need not exceed 25 mm² for copper.
              </li>
            </ul>
            <p>For PME (TN-C-S) supplies (except highway power supplies and street furniture):</p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 544.11 · Table 54.8"
            clause={
              <>
                Except where PME conditions apply, a main protective bonding conductor shall have a
                cross-sectional area not less than half the cross-sectional area required for the
                earthing conductor of the installation.
                <br />
                Except for highway power supplies and street furniture, where PME conditions apply
                the main protective bonding conductor shall be selected in accordance with the PEN
                conductor of the supply and Table 54.8.
                <br />
                <br />
                Table 54.8 — Minimum copper-equivalent csa of the main protective bonding conductor
                in relation to the PEN conductor of the supply:
                <br />
                PEN ≤ 35 mm² → 10 mm² · PEN over 35–50 mm² → 16 mm² · PEN over 50–95 mm² → 25 mm² ·
                PEN over 95–150 mm² → 35 mm² · PEN over 150 mm² → 50 mm².
                <br />
                NOTE: Local distributor’s network conditions may require a larger conductor.
              </>
            }
            meaning="The table is a minimum, not a target. UK Power Networks, SSEN and others sometimes require larger bonds locally — typically 16 mm² where 10 mm² would otherwise satisfy the table. Confirm with the DNO at the design stage; replacing a bond after the fact, especially on a buried run, is expensive."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 544.1.2"
            clause={
              <>
                The main protective bonding connection to any extraneous-conductive-part such as
                gas, water or other metallic pipework or service shall be made as near as
                practicable to the point of entry of that part into the premises. Where there is a
                meter, isolation point or union, the connection shall be made to the
                consumer&rsquo;s hard metal pipework and before any branch pipework. Where
                practicable the connection shall be made within 600 mm of the meter outlet union or
                at the point of entry to the building if the meter is external.
              </>
            }
            meaning="Three rules in one sentence. (1) On the consumer’s hard metal pipework — not on the supplier’s side of the meter, and not on a flexible hose. (2) Before any branch — bonding downstream of a tee leaves anything upstream of that tee unbonded. (3) Within 600 mm of the meter outlet where practicable. Note that the 600 mm rule is a 'where practicable' constraint; if the route makes 600 mm impossible, document why on the certificate and bond at the practical alternative point."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The test — Reg 643.2.1, performed by the GN3 method</ContentEyebrow>

          <ConceptBlock
            title="The procedure, in order"
            plainEnglish="After safe isolation of the installation, with the bonding conductor in place: connect a low-resistance ohmmeter from the MET to the extraneous-conductive-part itself (not to the bonding clamp screw). The reading is the conductor + the two terminations + any contact resistance from clamp to pipe. Acceptance is 'low resistance' — typically a small fraction of an ohm. Record."
            onSite="Probe to the metalwork beyond the clamp, not to the clamp head. A clamp screwed onto painted pipework can read 0.1 Ω to itself and 8 Ω to the metal underneath the paint. The bond is not to the clamp; it is to the metalwork. Test what matters."
          >
            <p>The full procedure as described in GN3 Chapter 2:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>Safe-isolate the installation. Prove dead. Lock off.</li>
              <li>
                Confirm the bonding conductor is connected at both ends as it will be in service: at
                the MET (or main earth bar) and at the bonding clamp / lug on the
                extraneous-conductive-part.
              </li>
              <li>
                Null the test leads of the low-resistance ohmmeter against a known short, or measure
                their resistance and subtract.
              </li>
              <li>
                Place one probe on the MET (or as close to the MET as the test point allows — a
                fixing screw on the main earth bar is the canonical choice).
              </li>
              <li>
                Take the other probe to the extraneous-conductive-part itself — the bare metal
                beyond the bonding clamp. For a gas pipe, this is the consumer-side hard pipework
                downstream of the clamp; for a water pipe, the same; for structural steel, the clean
                metal beyond the lug.
              </li>
              <li>
                Read and record. Repeat for every extraneous-conductive-part bonded back to the MET.
              </li>
            </ol>
            <p>
              The reading should be in the order of milliohms to a small fraction of an ohm — the
              conductor resistance (length × mΩ/m from GN3 Table BI for the conductor csa) plus a
              few mΩ of clamp contact resistance, plus a few mΩ of MET termination resistance. A 4 m
              run of 10 mm² copper bond is around 4 × 1.83 mΩ/m = 7.3 mΩ of conductor — call it 0.01
              Ω. Add the terminations and you should be reading 0.02–0.05 Ω in total. Anything in
              the tenths of an ohm is investigated; anything in the ones of an ohm is a definite
              fail.
            </p>
          </ConceptBlock>

          {/* Diagram — main bonding schematic from MET */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Main protective bonding schematic — MET radiating to each extraneous-conductive-part,
              with sizes per Table 54.8 and the &lsquo;within 600 mm&rsquo; rule of Reg 544.1.2
            </h4>
            <svg
              viewBox="0 0 800 440"
              className="w-full h-auto"
              role="img"
              aria-label="Main protective bonding schematic. The Main Earthing Terminal sits in the centre. Bonding conductors radiate to the gas meter, water meter and structural steelwork, each annotated with conductor size and the 600 millimetre rule from Regulation 544.1.2."
            >
              {/* MET in centre */}
              <circle
                cx="400"
                cy="220"
                r="50"
                fill="rgba(251,191,36,0.10)"
                stroke="#FBBF24"
                strokeWidth="2"
              />
              <text
                x="400"
                y="218"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="13"
                fontWeight="bold"
              >
                MET
              </text>
              <text x="400" y="234" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                Main Earthing Terminal
              </text>
              <text x="400" y="248" textAnchor="middle" fill="rgba(255,255,255,0.45)" fontSize="8">
                Reg 542.4.1
              </text>

              {/* Earthing conductor down */}
              <line x1="400" y1="270" x2="400" y2="370" stroke="#22C55E" strokeWidth="3" />
              <rect
                x="370"
                y="370"
                width="60"
                height="40"
                rx="4"
                fill="rgba(34,197,94,0.10)"
                stroke="#22C55E"
                strokeWidth="1.5"
              />
              <text
                x="400"
                y="388"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                Supply
              </text>
              <text
                x="400"
                y="402"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="9"
                fontWeight="bold"
              >
                earth
              </text>
              <text x="445" y="320" textAnchor="start" fill="rgba(255,255,255,0.65)" fontSize="9">
                Earthing conductor
              </text>
              <text x="445" y="334" textAnchor="start" fill="rgba(255,255,255,0.65)" fontSize="9">
                (to PEN / earth electrode)
              </text>

              {/* Gas branch — top left */}
              <line x1="370" y1="200" x2="170" y2="100" stroke="#FBBF24" strokeWidth="2.5" />
              <rect
                x="80"
                y="60"
                width="120"
                height="60"
                rx="6"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="140"
                y="82"
                textAnchor="middle"
                fill="rgba(255,255,255,0.8)"
                fontSize="11"
                fontWeight="bold"
              >
                GAS METER
              </text>
              <text x="140" y="98" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                incoming
              </text>
              <text x="140" y="111" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                metallic pipe
              </text>
              {/* Bond clamp on gas */}
              <circle cx="200" cy="110" r="5" fill="#FBBF24" />
              <text
                x="270"
                y="155"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                10 mm²
              </text>
              <text x="270" y="168" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                (Table 54.8)
              </text>
              <text x="200" y="135" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                ≤ 600 mm
              </text>
              <text x="200" y="148" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8">
                Reg 544.1.2
              </text>

              {/* Water branch — top right */}
              <line x1="430" y1="200" x2="630" y2="100" stroke="#FBBF24" strokeWidth="2.5" />
              <rect
                x="600"
                y="60"
                width="120"
                height="60"
                rx="6"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="660"
                y="82"
                textAnchor="middle"
                fill="rgba(255,255,255,0.8)"
                fontSize="11"
                fontWeight="bold"
              >
                WATER METER
              </text>
              <text x="660" y="98" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                incoming
              </text>
              <text x="660" y="111" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                metallic pipe
              </text>
              <circle cx="600" cy="110" r="5" fill="#FBBF24" />
              <text
                x="530"
                y="155"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                10 mm²
              </text>
              <text x="530" y="168" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                (Table 54.8)
              </text>
              <text x="600" y="135" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                ≤ 600 mm
              </text>
              <text x="600" y="148" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8">
                Reg 544.1.2
              </text>

              {/* Structural steel — bottom left */}
              <line x1="370" y1="240" x2="170" y2="340" stroke="#FBBF24" strokeWidth="2.5" />
              <rect
                x="80"
                y="320"
                width="120"
                height="60"
                rx="6"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="140"
                y="342"
                textAnchor="middle"
                fill="rgba(255,255,255,0.8)"
                fontSize="11"
                fontWeight="bold"
              >
                STRUCTURAL
              </text>
              <text
                x="140"
                y="358"
                textAnchor="middle"
                fill="rgba(255,255,255,0.8)"
                fontSize="11"
                fontWeight="bold"
              >
                STEEL
              </text>
              <text x="140" y="372" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                basement column
              </text>
              <circle cx="200" cy="340" r="5" fill="#FBBF24" />
              <text
                x="270"
                y="295"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                10 mm²
              </text>

              {/* Oil supply — bottom right */}
              <line x1="430" y1="240" x2="630" y2="340" stroke="#FBBF24" strokeWidth="2.5" />
              <rect
                x="600"
                y="320"
                width="120"
                height="60"
                rx="6"
                fill="rgba(255,255,255,0.05)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1.5"
              />
              <text
                x="660"
                y="342"
                textAnchor="middle"
                fill="rgba(255,255,255,0.8)"
                fontSize="11"
                fontWeight="bold"
              >
                OIL SUPPLY
              </text>
              <text x="660" y="358" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                metallic feed
              </text>
              <text x="660" y="372" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                to boiler
              </text>
              <circle cx="600" cy="340" r="5" fill="#FBBF24" />
              <text
                x="530"
                y="295"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                10 mm²
              </text>

              {/* Caption */}
              <rect
                x="30"
                y="410"
                width="740"
                height="22"
                rx="4"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text x="400" y="425" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="10">
                One bonding conductor per extraneous-conductive-part — radial from the MET, never
                daisy-chained between services. Reg 411.3.1.2 + Reg 544.1.2.
              </text>
            </svg>
          </div>

          <Scenario
            title="A 1980s semi with gas, water and a copper hot-water cylinder — the cross-bond pattern"
            situation="An EICR on a 1985 semi-detached property with a TN-C-S supply. PEN conductor at the cut-out is 35 mm² (so Table 54.8 minimum bond = 10 mm²). The installation has a 16 mm² earthing conductor and 10 mm² main bonds to gas and water. You measure: MET → gas inlet pipe = 0.04 Ω. MET → water inlet pipe = 0.05 Ω. Then, as a sanity check, you put the meter from gas pipe to water pipe — and read 0.06 Ω."
            whatToDo={
              <>
                <span className="block">
                  Each individual bond reading (0.04 and 0.05 Ω) is comfortably &lsquo;low
                  resistance&rsquo; — both pass on a per-bond basis.
                </span>
                <span className="block">
                  The cross-check tells a different story. If gas and water are bonded only via the
                  MET, the gas-to-water reading should be the sum of both bonds back to the MET =
                  0.04 + 0.05 = 0.09 Ω. The reading is 0.06 Ω, lower than that sum.
                </span>
                <span className="block">
                  The lower reading means there is a parallel path between the gas and water
                  services that does not go via the MET. In a 1985 semi this is almost certainly the
                  copper hot-water cylinder: the cold water feed and the gas to the boiler both
                  terminate at metalwork that is electrically continuous via the cylinder/heat
                  exchanger.
                </span>
                <span className="block">
                  Action: not a fault, but a parallel earth path that affects Ze and loop impedance
                  readings on the rest of the installation. Note in the EICR comments column. When
                  measuring Ze with the bonding intact, expect the value to read lower than the true
                  source impedance because the parallel path is in the measurement.
                </span>
              </>
            }
            whyItMatters="The cross-bond is harmless until someone removes the cylinder during a refurbishment. The day the cylinder is replaced with a plastic-bodied combi or a sealed system, the parallel path between gas and water disappears — and any Zs reading taken with the parallel path in place is suddenly too optimistic. Recording the cross-bond on the EICR puts the next inspector on notice and avoids a future EICR coding the install C2 against a Zs that 'has gone up' for no apparent reason."
          />

          <ConceptBlock
            title="The cross-bond — what it is, and why it matters"
            plainEnglish="A 'cross-bond' is an unintended parallel earth path between two extraneous-conductive-parts that share metalwork inside the building — typically the boiler heat exchanger, copper cylinder, or radiator pipework that ties gas and water together. It does not create a fault; it changes the network of paths that fault current can take, and that affects every loop reading on the installation."
            onSite="Test for it. Measure individual bonds first, then put the meter between two bonded services with no direct bond between them. The reading should equal the sum of their individual MET resistances. If it’s lower, you have a cross-bond. Note the location (which service connects to which) on the schedule."
          >
            <p>
              GN3 explicitly addresses parallel conductive paths during continuity tests: the tester
              shall consider that parallel paths may provide alternative low-resistance paths and
              therefore influence the measured value. For the main bonding test specifically:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Each main bond from MET to its extraneous-conductive-part is tested individually.
                The cross-bond does not invalidate that reading — the reading still represents the
                bond + termination resistance.
              </li>
              <li>
                The cross-bond becomes visible when you measure between two bonded services. If the
                gas-to-water reading is significantly less than the sum of the individual bonds,
                document the parallel path.
              </li>
              <li>
                The cross-bond changes Zs and Ze readings on the rest of the installation. A Ze test
                with the bonding intact reads the parallel combination of the supply earth and the
                parallel path through metalwork; the &lsquo;true&rsquo; Ze (with the parallel path
                disconnected) is what should drive the design.
              </li>
              <li>
                On a refurbishment, removing the cross-bond can raise loop impedance readings across
                the installation by a substantial fraction. Note the cross-bond on the certificate
                so future inspectors expect this if the metalwork changes.
              </li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            Plastic incoming pipework — and the resistance test that resolves it
          </ContentEyebrow>

          <ConceptBlock
            title="When &lsquo;normally not extraneous&rsquo; needs verification"
            plainEnglish="Reg 411.3.1.2 NOTE excludes plastic incoming pipework from the bonding duty — but only normally. If the internal metalwork happens to introduce a path to true earth (via a buried metallic drain, a structural connection to foundations, or a long parallel run alongside another bonded service), the normal exclusion does not apply. The test for whether something is extraneous-conductive is a resistance measurement to true earth."
          >
            <p>The IET threshold for distinguishing extraneous from non-extraneous:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Resistance from the metalwork in question to true earth ≥ 22 kΩ → not an
                extraneous-conductive-part. Bonding not required.
              </li>
              <li>
                Resistance &lt; 22 kΩ → extraneous-conductive-part. Reg 411.3.1.2 duty applies. Bond
                it.
              </li>
              <li>
                The 22 kΩ threshold is the value below which a person bridging the metalwork and
                another earthed part could see a touch voltage above the safe envelope during a
                fault.
              </li>
              <li>
                Use a low-current insulation tester or a dedicated continuity tester. Probe to a
                separate true-earth reference (an earth electrode driven into clean ground at least
                a metre from any buried bonded service).
              </li>
            </ul>
            <p>
              Document the test result on the certificate. &lsquo;Internal metalwork tested,
              resistance to true earth measured at 38 kΩ — bonding not required per Reg 411.3.1.2
              NOTE&rsquo; is the wording that withstands an audit five years later when somebody
              asks why the kitchen radiator is not bonded.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Probing to the bonding clamp instead of the metalwork beyond it"
            whatHappens="The clamp is screwed onto a painted gas pipe. The meter probe goes onto the clamp head and reads 0.05 Ω — the conductor + the clamp screw resistance. The bond is recorded as compliant. But the clamp is sitting on three coats of high-build primer and a layer of factory-applied yellow paint; the actual electrical contact between the clamp jaws and the metal underneath is on the order of 12–18 Ω because the paint is intact. During an earth fault, the gas pipe stays close to true earth while the MET rises to several tens of volts above. Touch voltage between the gas tap and a bonded radiator is the difference — and the homeowner finds out the hard way."
            doInstead="Probe to the metalwork itself, beyond the clamp. For gas and water, that means clean metal on the consumer-side hard pipework downstream of the clamp. For structural steel, that means clean metal on the column or beam beyond the lug — sand back through any paint or oxide if necessary. The reading you record must include the clamp-to-metalwork interface, not bypass it. If the clamp is on paint, you will see it in the reading and you will know to remediate."
          />

          <CommonMistake
            title="Daisy-chaining the bonding conductor between two services"
            whatHappens="The installer runs a single 10 mm² conductor from the MET to the gas meter, then continues the same conductor on to the water meter. It looks neat and uses less cable. Six months later, somebody works on the gas meter and removes the bond at the gas meter for the duration of the work. The water bond — which depended on the in-line connection at the gas meter — is also disconnected. Two services are unbonded, and nobody knows."
            doInstead="One bonding conductor per extraneous-conductive-part, each radiating from the MET independently. Reg 544.1.2 implicitly requires this because the connection must be at the point of entry of each service, before any branch — a daisy-chain breaks both rules. If a single tail enters the MET shared between two services, the integrity of every bond depends on every other bond. Separate conductors keep failures contained."
          />

          <CommonMistake
            title="Skipping the test on a periodic because the bond &lsquo;was tested at install&rsquo;"
            whatHappens="An EICR five years after install. The inspector visually checks each bond, confirms the clamps are present and the conductor is in place, and signs off the schedule without a continuity test. Two of the clamps have corroded over five years — the conductor is still there, the clamp is still on, but the resistance has risen from 0.04 Ω to 6 Ω because of oxide buildup at the clamp-to-pipe interface. The schedule shows compliant bonding; the touch voltage during a fault would be unsafe."
            doInstead="Reg 643.2.1 requires the resistance measurement on every continuity test, every time. EICR included. The visual check confirms presence; the resistance measurement confirms function. Both are required. A 30-second probe-and-read on each bond, recorded on the schedule, is the difference between a compliant inspection and a paper exercise."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The reading — &lsquo;low resistance&rsquo; in numbers</ContentEyebrow>

          <ConceptBlock
            title="What &lsquo;low resistance&rsquo; actually means in practice"
            plainEnglish="BS 7671 does not give a numeric maximum for main bonding continuity. GN3 says 'low resistance' and explicitly notes that the 0.1 Ω rule of thumb often quoted is not a regulation — it is a useful sanity check, but it is not the R2 from MET to clamp and it is not an acceptance limit. The right framing is: calculate what the bond should read from cable size, length and clamp resistance, then compare."
          >
            <p>For a typical 10 mm² copper main bond:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>Conductor resistance from GN3 Table BI: 1.83 mΩ/m for 10 mm² copper at 20°C.</li>
              <li>Conductor contribution for a 4 m run: 4 × 1.83 = 7.3 mΩ ≈ 0.01 Ω.</li>
              <li>Clamp contact resistance, well-fitted on clean metal: 5–15 mΩ ≈ 0.01 Ω.</li>
              <li>MET termination contribution: 5–15 mΩ ≈ 0.01 Ω.</li>
              <li>
                Total expected reading: 0.02–0.05 Ω. Anything within that range is comfortably
                compliant.
              </li>
            </ul>
            <p>
              A reading of 0.10 Ω on the same bond is twice the expected value — investigate the
              clamp and the MET termination. A reading of 0.50 Ω is ten times — definitely a fault,
              almost certainly a clamp on paint or oxide. A reading of 5 Ω or more is effectively no
              bond, regardless of whether the conductor is physically present.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="GN3 Chapter 2 · Reg 643.2.1 (extension to bonding)"
            clause={
              <>
                Regulation 643.2.1 requires continuity testing of all main protective bonding
                conductors. Main bonding between the incoming supply earthing system and
                exposed-conductive-parts shall be verified for continuity. Continuity shall be
                verified by a measurement of resistance using a low-resistance ohmmeter; the
                measured resistance shall demonstrate a low-resistance continuous path between
                bonded services / extraneous-conductive-parts and the main earthing terminal.
              </>
            }
            meaning="Two non-negotiables: every bond gets a resistance reading (not a buzzer, not a visual), and the acceptance is a 'low resistance continuous path'. The judgement is yours — calculate the expected reading from conductor csa and length, compare against measured. The deeper safety question is touch voltage during a fault, and any reading that would compromise it is not 'low'."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Recording on the A4:2026 Schedule of Test Results</ContentEyebrow>

          <ConceptBlock
            title="Where the readings go and what gets noted"
            plainEnglish="The A4:2026 model forms expanded the schedule structure for main protective bonding. Each extraneous-conductive-part bonded gets its own row: identity (gas / water / steel / oil / district heating), conductor csa, location of connection (within 600 mm of meter? Y/N), and continuity reading in ohms to two decimal places."
          >
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Identity:</strong> name the service. &lsquo;Water&rsquo;, &lsquo;Gas&rsquo;,
                &lsquo;Structural steel&rsquo;, &lsquo;Oil&rsquo;, &lsquo;District heating&rsquo;.
                Generic &lsquo;metalwork&rsquo; is not enough — the next inspector cannot audit a
                generic entry.
              </li>
              <li>
                <strong>Conductor csa:</strong> the actual installed csa, not the design intent.
                Confirm by inspection if necessary; do not assume.
              </li>
              <li>
                <strong>Location:</strong> &lsquo;Within 600 mm of meter outlet, on consumer’s hard
                pipework, before any branch&rsquo; or a specific note explaining any deviation (e.g.
                &lsquo;1.4 m from meter outlet — meter located behind sealed cabinet, no practicable
                connection point closer&rsquo;).
              </li>
              <li>
                <strong>Continuity reading:</strong> measured resistance from MET to the metalwork
                beyond the clamp, in ohms, two decimal places.
              </li>
              <li>
                <strong>Comments column:</strong> any cross-bond identified during testing, any
                series resistance higher than expected (with calculated value for comparison), any
                clamp re-fitted during the test (clean back to bare metal, etc.).
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="A new shop fit-out with gas, water and a separate boiler oil supply"
            situation="A new commercial fit-out: TN-C-S supply, 35 mm² PEN, 16 mm² earthing conductor. Three extraneous-conductive-parts: a 22 mm copper water main, a 32 mm steel gas main, and a steel oil supply pipe to the boiler from an external tank. Each is to be bonded back to the MET in the main switchgear room."
            whatToDo={
              <>
                <span className="block">
                  Sizing per Reg 544.11 / Table 54.8: PEN ≤ 35 mm² → main bond minimum 10 mm²
                  copper. Specify 10 mm² G/Y singles for all three bonds.
                </span>
                <span className="block">
                  Routing per Reg 544.1.2: all three connections on consumer’s hard pipework, before
                  any branch, within 600 mm of meter outlet (or building entry for the oil pipe,
                  since the meter is external in the case of gas and the entry is the practical
                  reference).
                </span>
                <span className="block">
                  Test per Reg 643.2.1, GN3 method: low-resistance ohmmeter, MET to bare metalwork
                  beyond each clamp. Expected readings around 0.02–0.05 Ω each.
                </span>
                <span className="block">
                  Cross-check between services: gas-to-water, gas-to-oil, water-to-oil. If any
                  cross-reading is significantly less than the sum of the two MET readings, document
                  the parallel path on the schedule (likely the gas-fired boiler ties gas and water
                  and oil together via the casing).
                </span>
              </>
            }
            whyItMatters="A commercial certificate gets read by insurers, district inspectors and lawyers. Every line on the bonding schedule should be defensible from first principles: which regulation requires it, what the conductor csa is, where it is connected, what the resistance read at test. Generic entries do not survive scrutiny."
          />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 411.3.1.2 lists the duty: bond every extraneous-conductive-part liable to introduce a dangerous potential difference. Plastic incoming pipework that feeds metalwork inside is normally NOT extraneous — verify with a resistance test (≥ 22 kΩ to true earth = not extraneous).',
              'Reg 544.11: non-PME main bond ≥ half the earthing conductor csa. PME main bond per Table 54.8 — typically 10 mm² for PEN ≤ 35 mm². DNO may require larger.',
              'Reg 544.1.2: connection on consumer’s hard pipework, before any branch, within 600 mm of the meter outlet where practicable.',
              'Reg 643.2.1 + GN3 Ch 2: test every bond by low-resistance ohmmeter from MET to the metalwork beyond the clamp. Acceptance is "low resistance" — typically a small fraction of an ohm.',
              'No fixed numeric maximum in BS 7671. Calculate the expected reading from cable size, length and clamp/MET termination contribution, then compare. 0.02–0.05 Ω for a typical 10 mm² × 4 m bond.',
              'Probe to the metalwork beyond the clamp, never to the clamp head. A clamp on paint reads 0.05 Ω to itself and 12 Ω through the paint to the actual metal.',
              'Cross-bond signature: measure between two bonded services — if the reading is less than the sum of their individual MET resistances, there is a parallel metallic path inside the building. Note it.',
              'One bonding conductor per service. Never daisy-chain. The integrity of one bond must not depend on another.',
              'Record on the schedule: identity, csa, location (within 600 mm Y/N), measured resistance to two decimals, plus any cross-bond noted in comments.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Reg 411.3.1.2 says metallic pipes within the building "do not normally require" bonding when the incoming pipe is plastic. What does "normally" mean — and how do I decide?',
                answer:
                  'Use the resistance-to-true-earth test. Probe from the metalwork in question to a clean true-earth reference (a temporary earth electrode driven at least a metre from any buried bonded service). If the resistance is ≥ 22 kΩ the metalwork is not an extraneous-conductive-part and bonding is not required — the IET / GN8 threshold below which touch voltage during a fault could become unsafe. If < 22 kΩ, the duty applies. Document the test on the certificate.',
              },
              {
                question:
                  'Is there a numeric maximum for main bonding continuity, or is it really just "low resistance"?',
                answer:
                  'No fixed maximum in BS 7671. GN3 Chapter 2 says "low resistance". The often-quoted 0.1 Ω is not a regulation — GN3 explicitly notes the 0.1 Ω guideline is not the R2 resistance from MET to bonding clamp, and it is not an acceptance limit. Calculate the expected reading from conductor csa × length × mΩ/m (GN3 Table BI), add a few mΩ each for clamp and MET termination, and compare. A typical 10 mm² × 4 m bond should read 0.02–0.05 Ω. Anything substantially higher is a flag, not an acceptable variation.',
              },
              {
                question:
                  'What is the "main earthing terminal" for the test? My MET is a plate with multiple lugs — which point is "the MET"?',
                answer:
                  'The MET is the plate / bar / block at which the earthing conductor and all main bonding conductors meet — Reg 542.4.1 names it as the principal earthing connection point. For the test, probe to a fixing screw or the cleanest metal you can reach on the MET itself, not to the conductor lug at the bond. The reading then includes the lug-to-MET termination resistance, which is part of what you are verifying.',
              },
              {
                question: 'On a TT supply, do the same bonding rules apply?',
                answer:
                  'Yes for the duty (Reg 411.3.1.2 applies to every consumer’s installation regardless of earthing arrangement) and the test (Reg 643.2.1 applies likewise). For sizing, TT falls under the non-PME default in Reg 544.11 — the bond must be at least half the csa of the earthing conductor of the installation. The earthing conductor itself is sized to the buried-conductor table 54.1, so on a TT installation with a 16 mm² protected earthing conductor, the main bond must be ≥ 8 mm² — round to 10 mm² for the next standard size.',
              },
              {
                question:
                  'I am bonding to a steel-framed structure. Where do I land the clamp — and how do I prove the steel is electrically continuous around the building?',
                answer:
                  'Clamp to a clean column or beam location accessible without permanent damage. The connection itself is verified by the bond continuity test (MET to that point). Continuity around the structural steel network is the design responsibility — typically the structural steelwork is continuous by virtue of bolted, welded or riveted connections. If you have any doubt, take additional readings to multiple points on the steelwork and confirm each reads consistently to the MET. Differences greater than the expected conductor + termination resistance suggest a discontinuity in the steelwork itself.',
              },
              {
                question: 'Cross-bond: is it a fault that needs fixing, or just a thing to note?',
                answer:
                  'In itself, a cross-bond is not a fault — the parallel path is just additional metalwork tying two already-bonded services together. The risk is downstream: it lowers measured Ze and Zs values, and on any future works that remove the parallel path (cylinder change, boiler swap, kitchen refit), those readings revert to the higher "true" values. Note the cross-bond in the schedule comments so the next inspector knows the readings on file may shift if metalwork changes. Do not "remove" a cross-bond — that would mean breaking continuity in the affected metalwork, which could compromise other safety functions.',
              },
              {
                question:
                  'Reg 544.1.2 says "within 600 mm of meter outlet where practicable". When is it not practicable, and how do I document the deviation?',
                answer:
                  'Not practicable scenarios: meter sealed in a kiosk (gas), meter inside a tenant unit you do not have access to, meter behind a structural wall you cannot route through, or routing within 600 mm exposes the conductor to mechanical damage. Document the alternative connection on the certificate: distance from meter, reason for the deviation, location of the connection (still on the consumer’s hard pipework, still before any branch). The "where practicable" wording in Reg 544.1.2 explicitly allows a longer route when justified — the regulation requires a justification, not perfection.',
              },
              {
                question:
                  'During a periodic, is a visual check enough or do I have to retest each bond?',
                answer:
                  'Retest. Reg 643.2.1 requires verification by measurement of resistance — not "verification by inspection where conductor present" — every time the test is performed, including at periodic verification. Bonding clamps corrode, MET terminations work loose, conductors get damaged by subsequent works. The visual check confirms presence; the resistance measurement confirms function. Both are required for compliance and both are recorded.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Main bonding conductor testing — Module 3.3" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-3')}
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
                navigate('/electrician/upskilling/inspection-testing/module-3/section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.4 Supplementary bonding verification
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

export default InspectionTestingModule3Section3;
