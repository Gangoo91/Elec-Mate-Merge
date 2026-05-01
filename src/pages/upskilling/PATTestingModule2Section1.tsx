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
    id: 'patm2-s1-classdef',
    question:
      'BS EN 61140 defines four classes of equipment by protective measure against electric shock. Which set is correct?',
    options: [
      'Class 1, Class 2, Class 3, Class 4 — by voltage band.',
      'Class 0 (basic insulation only, no provision for protective conductor — not permitted in UK general use), Class I (basic insulation + protective bonding via CPC), Class II (double or reinforced insulation, no CPC), Class III (SELV — supply is the protection).',
      'Class A, B, C, D — by IP rating.',
      'Class 1, 2, 3 — by current rating.',
    ],
    correctIndex: 1,
    explanation:
      'BS EN 61140 ("Protection against electric shock — Common aspects for installation and equipment") sets the four-class framework. Class 0 is the historic legacy; Class I, II, and III are the operational classes you see in service. The class is the FUNDAMENTAL safety architecture of the equipment — every PAT test method follows from it.',
  },
  {
    id: 'patm2-s1-class0',
    question: 'A piece of imported equipment marked "Class 0" arrives. What is the PAT response?',
    options: [
      'Treat it as Class I.',
      'Class 0 equipment is NOT permitted in UK general use under BS 7671 / IET CoP — it provides only basic insulation and no provision for a protective conductor. Withdraw, refer to procurement, refuse to put into service. The response is rejection, not testing.',
      'Test as Class II.',
      'Apply earth bonding and use it.',
    ],
    correctIndex: 1,
    explanation:
      'Class 0 is the historic class with basic insulation only and no protective bonding. UK practice (and IET CoP) does not accept Class 0 equipment in service. The defendable response when one appears is to refuse to commission and to refer back to procurement.',
  },
  {
    id: 'patm2-s1-classsignals',
    question: 'How do you confirm a piece of equipment is Class II?',
    options: [
      'It has no earth pin.',
      'Look for the BS EN 61140 Class II mark (the "double-square" symbol — a square within a square) on the rating plate, AND verify the equipment has no provision for a protective conductor (no CPC connection at the supply, the live parts are accessible only through double or reinforced insulation). Both signals must be present and consistent.',
      'It is plastic.',
      'It is small.',
    ],
    correctIndex: 1,
    explanation:
      'The double-square symbol is the canonical Class II marking. But the marking alone is not sufficient — the equipment construction must match. A plastic-cased item with an earth wire is still Class I. A metal-cased item with the Class II mark requires verification (the casing might be a non-conductive coating over a conductive substrate). Construction and marking together.',
  },
  {
    id: 'patm2-s1-IT',
    question:
      'A laptop power supply (the "brick") shows the Class II symbol on the rating plate. The detachable IEC mains lead has a 3-pin BS 1363 plug. What is the correct interpretation?',
    options: [
      'The system is Class I overall.',
      'The PSU brick is Class II (no CPC needed at the LV output to the laptop). The IEC mains lead is a separate item. The third pin on the plug is for connection to the EARTH PIN of the socket-outlet, but the lead itself does not carry a CPC into the brick — the third pin is connected to a "decorative" / shutter-defeat function. The brick is genuinely Class II.',
      'Use the third pin as protective earth on the brick.',
      'Wire-test to confirm the third pin is earthed at the brick.',
    ],
    correctIndex: 1,
    explanation:
      'IT power supplies that are Class II often use a 3-pin plug (a UK requirement to operate the socket shutters) but route only L and N into the brick. The third pin is sometimes terminated and connected to internal earth for filtering, sometimes left unconnected. The class is determined by the construction of the unit, not the pin count of the plug. PE-continuity test is therefore not applied to a true Class II PSU.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'BS EN 61140 defines protective measures against electric shock by class. What is the underlying logic of the class system?',
    options: [
      'Classes are arbitrary.',
      'Each class is a complete protective architecture. Class I uses basic insulation PLUS a connection of exposed-conductive-parts to a protective conductor — fault current flows to earth and the protective device disconnects. Class II uses DOUBLE or REINFORCED insulation as the sole protective measure — there is no CPC because there is nothing for it to connect to. Class III uses SELV as the protective measure — the supply itself cannot deliver dangerous voltage.',
      'Higher class numbers are safer.',
      'Class is determined by the inspector.',
    ],
    correctAnswer: 1,
    explanation:
      'Each class is a complete, self-contained protective measure. The PAT test methods follow from the architecture: Class I = test the CPC; Class II = test the insulation; Class III = test the supply. Confusing the test methods between classes is a defect in the test, not in the equipment.',
  },
  {
    id: 2,
    question: 'Which IET CoP test is INAPPROPRIATE for genuinely Class II equipment?',
    options: [
      'Insulation resistance test.',
      'Protective-conductor (PE) continuity test. Class II equipment has no protective conductor by design — there is nothing to test. Applying a PE-continuity test gives a meaningless reading (or an "open" result that an untrained inspector might mistakenly fail).',
      'Substitute leakage test.',
      'Functional test.',
    ],
    correctAnswer: 1,
    explanation:
      'The PE-continuity test exists specifically to verify Class I protection. Class II has no CPC; the test does not apply. The IET CoP §15 sets out class-specific test sequences; mis-applying tests across classes is one of the most common errors in inexperienced PAT testing.',
  },
  {
    id: 3,
    question:
      'The BS EN 61140 class symbol is found on the equipment rating plate. What does the absence of a class symbol typically indicate?',
    options: [
      'The equipment is Class I by default.',
      'The equipment may be Class I (Class I marking is not always shown — many manufacturers only mark Class II and Class III explicitly), OR the equipment is unmarked and its class needs to be determined by construction. Unmarked equipment requires investigation, not assumption.',
      'The equipment is exempt.',
      'The equipment is Class 0.',
    ],
    correctAnswer: 1,
    explanation:
      'Class I is sometimes (but not always) marked. When markings are absent, the class is determined by the construction — does the equipment have a CPC connection at the supply? Are the exposed conductive parts bonded to it? An unmarked item with a CPC connection is Class I. An unmarked item without a CPC connection requires escalation — it could be Class II without proper marking, or it could be the unaccepted Class 0.',
  },
  {
    id: 4,
    question:
      'IET CoP §15 prescribes different test sequences for Class I, Class II, and Class III equipment. Why do the sequences differ?',
    options: [
      'Different test instruments.',
      'Each class has a different protective architecture, and the test verifies the architecture is intact. Class I: test the CPC continuity (the earth path) and the IR (the basic insulation). Class II: test the IR between live parts and any accessible conductive part — there is no CPC to test. Class III: verify the supply is genuinely SELV and the conductors are safely separated — no IR or PE test on the equipment itself.',
      'Different acceptance values for the same test.',
      'Tradition.',
    ],
    correctAnswer: 1,
    explanation:
      'The class IS the protection. The test verifies the class. Class I, II, and III need different test methods because their protective measures are fundamentally different. Applying Class I tests to Class II equipment (or vice versa) does not verify safety — it tests something the equipment was not designed to provide.',
  },
  {
    id: 5,
    question:
      'A piece of equipment carries the symbol of a square within a square. What does this indicate?',
    options: [
      'It is fragile.',
      'It is Class II (BS EN 61140) — protection against electric shock is provided by double or reinforced insulation, not by a protective conductor. The double-square symbol is the canonical Class II marking, mandated for visible application on the rating plate.',
      'It is IP-rated.',
      'It is Class 0.',
    ],
    correctAnswer: 1,
    explanation:
      "The double-square (square within a square) is one of the most visually distinctive symbols in electrical safety marking. It is mandatory for Class II equipment and is the inspector's primary cue to apply Class II test methods.",
  },
  {
    id: 6,
    question: 'A handheld torch operates from 4 x AA batteries (6 V dc). What is its class?',
    options: [
      'Class I.',
      'Class III (SELV / battery operation, voltage well below 50 V ac / 120 V dc thresholds). PAT scope is generally limited to formal visual under PUWER Reg 6 — there is no mains energy to test.',
      'Class II.',
      'Class 0.',
    ],
    correctAnswer: 1,
    explanation:
      'SELV / battery equipment falls under Class III. Mains-side PAT does not apply to battery-only equipment in battery use. Where a charger / dock is involved, the charger is Class I or Class II (mains side) and is tested under that class.',
  },
  {
    id: 7,
    question:
      'A factory-supplied equipment marking is illegible due to wear. The construction is consistent with Class I (metal casing, CPC connection at supply). What is the correct class assignment?',
    options: [
      'Reject the equipment.',
      'Treat as Class I based on construction, document the illegible marking as a defect to be remediated (manufacturer-supplied replacement plate or referenced documentation), and apply Class I test methods. Equipment whose class cannot be established at all (no construction signals, no markings) escalates to investigation; established class with degraded marking is a recordable defect.',
      'Treat as Class II until marking is restored.',
      'Apply both Class I and Class II tests and use whichever passes.',
    ],
    correctAnswer: 1,
    explanation:
      'Class is determined by construction; markings are confirmation. An illegible marking on equipment whose construction clearly indicates Class I is treated as Class I, with the marking defect logged and remediated. The principle is that class is intrinsic to the equipment, not to its label.',
  },
  {
    id: 8,
    question: 'What is the practical hazard of mis-classifying equipment at the test stage?',
    options: [
      'Only paperwork issues.',
      'Wrong tests are applied. Class I equipment treated as Class II does not have its CPC integrity verified — a degraded CPC is invisible to Class II test methods. Class II equipment treated as Class I produces a meaningless PE-continuity result that is either failed mistakenly or read as some artefact of the meter. Either way, the test does not verify the actual protective architecture, and a defect in the architecture is undetectable.',
      'Cosmetic only.',
      'Affects only frequency.',
    ],
    correctAnswer: 1,
    explanation:
      'The test verifies the class. Mis-classification means testing the wrong thing. The protective architecture intended by the manufacturer is not what is being verified, and the actual safety case of the equipment is not what is being checked. The mis-classification appears benign at the test stage and becomes load-bearing at the defect stage.',
  },
  {
    id: 9,
    question:
      'An item shows the Class II double-square symbol but ALSO has a CPC connection in its plug. What does this typically indicate?',
    options: [
      'The marking is wrong.',
      'It is likely "Class II equipment with functional earth" or has a 3-pin plug for UK socket-shutter operation only. The CPC may be (a) used for filtering / EMC purposes (not a protective conductor in the safety sense), (b) terminated to internal earth for noise reasons, or (c) left unconnected at the equipment. The class is Class II if the construction is double / reinforced insulated; the CPC conductor in the plug is functional, not protective.',
      'Apply Class I tests.',
      'Reject the equipment.',
    ],
    correctAnswer: 1,
    explanation:
      'The "Class II with functional earth" pattern is common in IT equipment, AV equipment, and any device with EMC requirements. The class symbol overrides the plug pin-count. The PAT response is Class II testing — the functional earth is not a safety conductor and a PE-continuity test on it is not meaningful in the BS EN 61140 sense.',
  },
  {
    id: 10,
    question:
      'Module 2 is about appliance classes. Why does class drive every test method in subsequent modules?',
    options: [
      'It does not — it is academic.',
      'Because each class is a distinct protective architecture and the test verifies the architecture is intact. The acceptance values, the test sequence, the instrument settings, the pass/fail interpretation — all derive from class. Without correct class identification, the rest of the test programme is mis-aimed. Class identification is therefore the very first step of every formal inspection.',
      'Because the IET CoP demands it.',
      'Because the manufacturer demands it.',
    ],
    correctAnswer: 1,
    explanation:
      'The class is the foundation. Module 3 (test methods), Module 4 (acceptance values, frequencies, special cases), Module 5 (records, certification) all rest on correct class identification. Get class wrong and everything that follows is wrong, even if the readings look right.',
  },
];

const PATTestingModule2Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Overview of appliance classes | PAT Module 2.1 | Elec-Mate',
    description:
      'BS EN 61140 protection against electric shock — the four classes (Class 0 historic, Class I CPC-bonded, Class II double-insulated, Class III SELV). The protective architecture of each class and why class drives every PAT test method.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/pat-testing-module-2')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 2
          </button>

          <PageHero
            eyebrow="Module 2 · Section 1"
            title="Overview of appliance classes"
            description="BS EN 61140 defines four classes of equipment by their protective architecture against electric shock. The class IS the protection. Every PAT test method derives from class — get class wrong and the test is mis-aimed."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS EN 61140 ("Protection against electric shock — Common aspects for installation and equipment") sets the four-class framework: Class 0 (historic, not for UK general use), Class I, Class II, Class III.',
              'Class I: basic insulation + protective bonding via CPC. Fault current is diverted to earth; the protective device disconnects. Test the CPC continuity and the IR.',
              'Class II: double or reinforced insulation as the sole protective measure. No CPC by design. Test the IR between live and any accessible conductive part. Do NOT apply PE-continuity test.',
              'Class III: SELV — Separated Extra-Low Voltage, supplied from a safety isolating transformer or batteries, separated from earth and from higher-voltage circuits. The supply itself is the protection. Mains-side PAT does not apply.',
              'Class 0 (basic insulation only, no protective conductor) is NOT permitted in UK general use. The PAT response to Class 0 equipment is rejection, not testing.',
              'Class is determined by construction; markings are confirmation. The double-square symbol is the canonical Class II marking. Class I is sometimes marked; sometimes inferred from construction.',
              'Mis-classification means the wrong tests are applied. The actual protective architecture is not verified, and defects in it become undetectable.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Cite BS EN 61140 as the source standard for appliance class definitions and explain why class drives every PAT test method',
              'Describe the protective architecture of Class I (basic insulation + CPC), Class II (double / reinforced insulation), and Class III (SELV)',
              'Identify the BS EN 61140 markings on equipment — the double-square Class II symbol, the Class III SELV symbol, and the absence of explicit Class I marking',
              'Recognise Class 0 equipment and apply the correct response (rejection, not testing) under UK PAT practice',
              'Match each class to its appropriate IET CoP §15 test sequence — what to test for each class, and what NOT to test',
              'Resolve the "Class II with 3-pin plug" / "Class II with functional earth" pattern by reference to construction, not pin count',
              'Detect and respond to mis-classification — illegible markings, contradictory markings, suspect construction',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The four classes — BS EN 61140</ContentEyebrow>

          <ConceptBlock
            title="Why classes exist — the protective-measure framework"
            plainEnglish="Every piece of mains-powered electrical equipment must have a protective measure against electric shock. BS EN 61140 defines four standard ways of providing it. Each class is a complete protective architecture in itself. Knowing which architecture a piece of equipment uses is the foundation of every test method that follows."
            onSite="Read class first. Before any test, before any inspection, identify the class. The class drives the test sequence, the acceptance values, the pass/fail interpretation. Class identification is the first step of formal inspection."
          >
            <p>The four BS EN 61140 classes are:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Class</th>
                    <th className="text-left text-white/80 py-2">Protective measure</th>
                    <th className="text-left text-white/80 py-2">CPC needed?</th>
                    <th className="text-left text-white/80 py-2">Status in UK</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>Class 0</strong>
                    </td>
                    <td>Basic insulation only</td>
                    <td className="text-red-300">No (no provision)</td>
                    <td className="text-red-300">Not permitted in general use</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>Class I</strong>
                    </td>
                    <td>Basic insulation + CPC bonding of exposed-conductive-parts</td>
                    <td className="text-emerald-300">Yes — essential</td>
                    <td>Permitted; common</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>Class II</strong>
                    </td>
                    <td>Double or reinforced insulation</td>
                    <td className="text-red-300">No (none provided)</td>
                    <td>Permitted; common</td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <strong>Class III</strong>
                    </td>
                    <td>SELV — Separated Extra-Low Voltage from safety transformer / batteries</td>
                    <td className="text-red-300">No (SELV is the protection)</td>
                    <td>Permitted; common at LV</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              Each row is a complete, internally-consistent protective architecture. Class I uses
              the protective conductor; Class II uses the insulation itself; Class III uses the
              voltage level. The PAT test methods follow directly from these architectures: test the
              CPC integrity for Class I, test the insulation for Class II, verify the supply for
              Class III.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 61140:2016 · Clause 6 (Protective measures)"
            clause={
              <>
                Equipment shall be classified according to the means provided for protection against
                electric shock. The classifications are: Class 0, Class I, Class II, and Class III,
                based on the relationship between the basic insulation, the supplementary protection
                (where provided), and the connection of accessible conductive parts to a protective
                conductor (where provided).
              </>
            }
            meaning="The standard defines class by the relationship between insulation, supplementary protection, and protective conductor connection. The class is intrinsic to the equipment, set at design stage. The PAT inspector reads the class from markings and construction; they do not re-classify."
          />

          <ConceptBlock
            title="Class 0 — historic, not for UK use"
            plainEnglish="Class 0 equipment has only basic insulation between live parts and the user, with no provision for a protective conductor. Failure of the basic insulation results in the casing becoming live with no protective path to disconnect. Class 0 is permitted in some jurisdictions (typically with controlled environments — non-conductive locations, isolated supplies). It is NOT accepted in UK general use."
          >
            <p>Why Class 0 is rejected:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Single point of failure. If the basic insulation fails, the user is the only path to
                ground. There is no second line of defence.
              </li>
              <li>
                The protective measures of BS 7671 / IET CoP rely on either CPC bonding (Class I) or
                double / reinforced insulation (Class II). Class 0 satisfies neither.
              </li>
              <li>
                The plug arrangement of Class 0 — typically a 2-pin plug with no earth provision —
                is incompatible with UK socket-outlets that have shutters operated by the earth pin
                (BS 1363).
              </li>
            </ul>
            <p>The PAT response to Class 0 equipment:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>Identify by markings and construction.</li>
              <li>Withdraw immediately. Do not commission.</li>
              <li>Tag, log, refer to procurement.</li>
              <li>Document the rejection with reasoning (BS EN 61140 / IET CoP / UK practice).</li>
              <li>
                The defendable position is that Class 0 equipment was not commissioned. Allowing it
                into service is itself a Reg 4(2) defect — the protective measure does not meet UK
                general-use standards.
              </li>
            </ol>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Class I — basic insulation + protective bonding</ContentEyebrow>

          <ConceptBlock
            title="Class I architecture"
            plainEnglish="A Class I appliance has basic insulation between live parts and the casing, AND every accessible conductive part is bonded to a protective conductor (CPC). If the basic insulation fails and a live conductor touches the casing, the casing momentarily rises in voltage but the resulting fault current flows through the CPC to earth, and the protective device (MCB / RCD) disconnects. The user is protected by the disconnection time, not by isolation from the fault."
          >
            <p>The defining features of Class I:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>CPC connection at the supply</strong> — typically the earth pin of the BS
                1363 plug, connected via the green-and-yellow conductor of the flex to the
                equipment\'s internal earth point.
              </li>
              <li>
                <strong>Earth bonding of all exposed-conductive-parts</strong> — metal casings,
                metal handles, metal trim, any conductive part the user can touch.
              </li>
              <li>
                <strong>Basic insulation</strong> between live conductors and accessible parts — the
                same insulation level used in any general-purpose construction.
              </li>
            </ul>
            <p>The Class I PAT test sequence (IET CoP §15):</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>PE-continuity test</strong> — measure resistance from earth pin of the plug
                to any accessible conductive part. Acceptance per IET CoP §15.4 / Table 15.1,
                typically &le; 0.1 Ω + 1 mΩ/m of flex. The test verifies the CPC is intact and
                low-resistance — the prerequisite for Class I protection to work.
              </li>
              <li>
                <strong>Insulation resistance</strong> — 500 V dc between live conductors (line +
                neutral together) and earth (i.e. the CPC). Acceptance per IET CoP §15.5, typically
                &ge; 1 MΩ. The test verifies basic insulation is intact.
              </li>
              <li>
                <strong>Functional / load test</strong> — verify operation as intended.
              </li>
            </ol>
            <p>
              Class I is the most common construction for fixed mains-powered equipment with metal
              casings — kettles, microwaves, washing machines, fan heaters, large IT infrastructure.
              The fail mode that matters is CPC discontinuity: if the CPC opens or develops high
              resistance, Class I protection silently fails and the equipment becomes equivalent to
              Class 0 in fault response.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice (5th Ed, 2020) · §15.4 (PE continuity for Class I)"
            clause={
              <>
                For Class I equipment, the resistance between the earth pin of the plug and any
                accessible conductive part of the equipment shall be measured. The maximum
                permissible value is 0.1 Ω plus the resistance of the flexible cable from the plug
                to the equipment.
              </>
            }
            meaning="The CPC reading is the heart of Class I verification. 0.1 Ω is the contact / connection allowance; the cable contribution scales with length and conductor csa. A reading above the acceptance value is the equipment\'s protection failing — independent of any other test result."
          />

          <SectionRule />

          <ContentEyebrow>Class II — double / reinforced insulation</ContentEyebrow>

          <ConceptBlock
            title="Class II architecture"
            plainEnglish="A Class II appliance has TWO levels of insulation between live parts and any accessible conductive part: basic insulation (the working insulation) and a separate, supplementary insulation. Together these constitute 'double insulation'. Alternatively, 'reinforced insulation' — a single layer engineered to provide both functions — is also Class II. There is NO protective conductor because there is nothing for it to connect to: the insulation itself prevents a fault from reaching accessible parts."
          >
            <p>The defining features of Class II:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>No CPC connection at the supply</strong> in the protective sense. Equipment
                may have a "functional earth" for filtering / noise (typical in IT and AV) but this
                is not a protective conductor.
              </li>
              <li>
                <strong>Double or reinforced insulation</strong> — two independent layers OR a
                single engineered layer giving the equivalent protection.
              </li>
              <li>
                <strong>Class II marking — the double-square symbol</strong> (a square within a
                square) on the rating plate.
              </li>
            </ul>
            <p>The Class II PAT test sequence (IET CoP §15):</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>NO PE-continuity test.</strong> There is no protective conductor to test.
                Applying one is meaningless. (Some PAT instruments offer a "Class II touch current"
                or similar — that is a different test, not a CPC test.)
              </li>
              <li>
                <strong>Insulation resistance</strong> — 500 V dc between live conductors and ANY
                ACCESSIBLE CONDUCTIVE PART (the test probe is held against the casing, the handle,
                or the conductive parts of the equipment itself, not against an earth pin).
                Acceptance &ge; 2 MΩ for Class II per IET CoP §15.5.
              </li>
              <li>
                <strong>Touch current / substitute leakage</strong> — alternative or supplementary
                tests for Class II equipment, especially where the construction makes IR difficult
                to apply (e.g. unusual casing materials).
              </li>
              <li>
                <strong>Functional / load test</strong> — verify operation.
              </li>
            </ol>
            <p>
              Class II is common for hand-held tools (drills, sanders, hair driers), small
              appliances (toasters, coffee makers), and IT power supplies (laptop bricks, USB
              chargers). The fail mode is insulation breakdown — typically through moisture ingress,
              mechanical damage, or thermal stress. The IR test is the primary instrument-side
              defence.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="IET Code of Practice (5th Ed, 2020) · §15.5 (Insulation resistance, Class II)"
            clause={
              <>
                For Class II equipment, the insulation resistance shall be measured between live
                parts and any accessible conductive part of the equipment, with the test probe
                applied to the conductive part. The minimum acceptable value is 2 MΩ.
              </>
            }
            meaning="Class II IR test is conducted with the probe on the accessible part itself, not on an earth pin (there is no earth pin in the protective sense). Acceptance is tighter than Class I (2 MΩ vs 1 MΩ) because the insulation IS the protection — there is no CPC backup."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Class III — SELV (Separated Extra-Low Voltage)</ContentEyebrow>

          <ConceptBlock
            title="Class III architecture"
            plainEnglish="A Class III appliance is supplied at SELV — Separated Extra-Low Voltage — which is voltage not exceeding 50 V ac (or 120 V dc), supplied from a safety isolating transformer to BS EN 61558 or from batteries / SELV supplies, and separated from earth and from higher-voltage circuits. The protective measure is the LIMITED VOLTAGE itself: even a direct touch on the live conductors at 12 V ac cannot deliver enough current through the body to cause electric shock injury."
          >
            <p>The defining features of Class III:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Supply at SELV</strong> — &le; 50 V ac or &le; 120 V dc, from a safety
                isolating transformer (BS EN 61558) or batteries.
              </li>
              <li>
                <strong>Separation from earth and from higher voltages</strong> — the SELV circuit
                is electrically isolated from the mains side and from earth, so a single fault
                cannot bring mains voltage onto SELV conductors.
              </li>
              <li>
                <strong>Class III marking</strong> — the SELV symbol (a Roman numeral III in a
                diamond, or specific national variants).
              </li>
              <li>
                <strong>No CPC and no double insulation</strong> on the SELV side — the voltage
                level is the protection.
              </li>
            </ul>
            <p>The Class III PAT test sequence is fundamentally different — and shorter:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Verify the supply is genuinely SELV</strong> — the safety isolating
                transformer is in service, the SELV circuit is separated from mains, and the voltage
                is within SELV limits.
              </li>
              <li>
                <strong>Inspect the supply unit</strong> — the safety isolating transformer is
                typically Class I or Class II on the mains side and is tested as such.
              </li>
              <li>
                <strong>Functional check</strong> — the SELV equipment operates correctly.
              </li>
              <li>
                <strong>NO IR test, NO PE-continuity test</strong> on the SELV equipment itself in
                the conventional sense. The supply is the protection.
              </li>
            </ol>
            <p>
              Class III appliances include door entry equipment, low-voltage lighting (12 V halogen,
              garden lighting), telecoms equipment, and battery-operated equipment. The "PAT"
              question for Class III is largely a question about the supply unit and the separation
              between SELV and mains — not a question about the SELV equipment itself.
            </p>
          </ConceptBlock>

          <Scenario
            title="The Class II laptop with a 3-pin plug puzzle"
            situation="An IT inspector encounters a laptop power supply with a Class II double-square symbol on the rating plate, but the IEC C5 mains lead has a UK 3-pin BS 1363 plug. The inspector is unsure whether to apply Class I or Class II tests."
            whatToDo="Class II testing applies to the power supply brick. The 3-pin plug is a UK convention to operate the socket-outlet shutters (BS 1363 sockets have shutters operated by insertion of the earth pin). The brick itself takes only L and N from the lead — the third pin is sometimes terminated to internal earth for EMC filtering, sometimes left unconnected. The class symbol on the brick takes precedence: Class II = no PE-continuity test; IR test between live and any accessible conductive part of the brick. The IEC C5 lead is a separate item and gets its own continuity / IR / polarity test (Class I lead, regardless of how the brick is classified)."
            whyItMatters="The 3-pin plug pattern misleads inspectors into applying Class I tests on Class II equipment. The PE-continuity reading is meaningless (the plug pin may or may not be connected to anything inside the brick), the IR test is misdirected (probe on earth pin instead of probe on accessible part), and the actual Class II protective measure (insulation integrity) is not verified. Read the marking, follow the marking."
          />

          <CommonMistake
            title="Applying Class I test methods to Class II equipment"
            whatHappens="An inspector encounters a Class II hair drier (visible double-square symbol on the rating plate, plastic casing, no exposed metal parts). Out of habit, they perform the PE-continuity test from the earth pin of the plug. The reading is 'open' because there is no internal CPC. The inspector either records a fail (wrong) or notes 'no CPC' and moves on without performing the Class II IR test (also wrong). Either way, the actual Class II protective measure — insulation integrity — has not been verified."
            doInstead="Read the class symbol first. Class II = double-square = no PE-continuity test. The Class II IR test is between live conductors and any accessible conductive part — probe on the casing, the handle, or the conductive parts of the equipment. Acceptance &ge; 2 MΩ. The class drives the test sequence; mis-applying tests across classes does not just produce wrong readings, it leaves the actual protective architecture untested."
          />

          <CommonMistake
            title="Treating no-class-symbol as Class-I-by-default"
            whatHappens="An item arrives with no visible class symbol and an unmarked rating plate. The inspector assumes Class I and tests accordingly. The PE-continuity reading is inconclusive (the equipment\'s plug has 3 pins but the construction is unclear). The IR test passes. The label says PASS. In reality, the construction could be Class II without explicit marking (some manufacturers omit the symbol on small appliances), or could be Class 0 (unaccepted in UK). Neither scenario was investigated."
            doInstead="Unmarked equipment requires investigation, not assumption. Inspect the construction: is there a CPC connection inside the plug? Is the casing metal or plastic? Are exposed conductive parts bonded? Reference manufacturer documentation if available. If the class still cannot be determined, withdraw the equipment and refer to the duty-holder. Class is the foundation of the test programme; assuming a class to make the test cycle proceed is a defect in the inspection methodology."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>How class drives every test method</ContentEyebrow>

          <ConceptBlock
            title="Class as the test-method axis"
            plainEnglish="Subsequent modules cover the IET CoP test methods in detail — but every test method begins with class identification. The acceptance values, the test probe placement, the instrument settings, and the pass/fail interpretation all derive from class. A test sequence that does not begin with explicit class identification is missing its foundation."
          >
            <p>The class-driven test matrix:</p>
            <div className="overflow-x-auto">
              <table className="w-full text-[13.5px] my-2">
                <thead>
                  <tr className="border-b border-white/15">
                    <th className="text-left text-white/80 py-2">Test</th>
                    <th className="text-center text-white/80 py-2">Class I</th>
                    <th className="text-center text-white/80 py-2">Class II</th>
                    <th className="text-center text-white/80 py-2">Class III</th>
                  </tr>
                </thead>
                <tbody className="text-white/95">
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>PE continuity</strong>
                    </td>
                    <td className="text-center text-emerald-300">Yes — primary</td>
                    <td className="text-center text-red-300">No</td>
                    <td className="text-center text-red-300">No</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>IR (live to earth pin)</strong>
                    </td>
                    <td className="text-center text-emerald-300">Yes — &ge; 1 MΩ</td>
                    <td className="text-center text-red-300">N/A</td>
                    <td className="text-center text-red-300">N/A</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>IR (live to accessible part)</strong>
                    </td>
                    <td className="text-center text-amber-300">Optional</td>
                    <td className="text-center text-emerald-300">Yes — &ge; 2 MΩ (primary)</td>
                    <td className="text-center text-red-300">No</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>Touch current / leakage</strong>
                    </td>
                    <td className="text-center text-amber-300">Where IR n/a</td>
                    <td className="text-center text-emerald-300">Yes (alternative to IR)</td>
                    <td className="text-center text-red-300">No</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>Polarity (IEC leads)</strong>
                    </td>
                    <td className="text-center text-emerald-300">Yes (lead test)</td>
                    <td className="text-center text-emerald-300">Yes (lead test)</td>
                    <td className="text-center text-red-300">N/A</td>
                  </tr>
                  <tr className="border-b border-white/[0.06]">
                    <td className="py-2">
                      <strong>Functional / load</strong>
                    </td>
                    <td className="text-center text-emerald-300">Yes</td>
                    <td className="text-center text-emerald-300">Yes</td>
                    <td className="text-center text-emerald-300">Yes</td>
                  </tr>
                  <tr>
                    <td className="py-2">
                      <strong>SELV supply verification</strong>
                    </td>
                    <td className="text-center text-red-300">N/A</td>
                    <td className="text-center text-red-300">N/A</td>
                    <td className="text-center text-emerald-300">Yes — primary</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p>
              The matrix is the operational reason class identification is the foundation. Each
              column is a complete protective architecture; each row is a verification step. Picking
              the right verification step for the architecture is the inspector\'s job.
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

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'BS EN 61140 sets four classes by protective architecture: Class 0 (basic insulation only — not for UK use), Class I (CPC-bonded), Class II (double insulation), Class III (SELV).',
              'Class I = test the CPC continuity (≤ 0.1 Ω + flex) and the IR (≥ 1 MΩ at 500 V). The CPC is the primary protective measure.',
              'Class II = test the IR between live and accessible conductive part (≥ 2 MΩ at 500 V). NO PE-continuity test — there is no CPC by design.',
              'Class III = verify the SELV supply (BS EN 61558 safety isolating transformer or batteries) and the separation from mains. NO IR or PE test on the SELV equipment itself.',
              'Class 0 = REJECT. Not permitted in UK general use. Refer to procurement; do not commission.',
              'Class is determined by construction; markings are confirmation. Double-square = Class II. Class I is sometimes marked, often inferred from CPC connection at the supply.',
              '"Class II with 3-pin plug" / "Class II with functional earth" — common pattern in IT / AV equipment. The class symbol takes precedence over the plug pin count.',
              'Mis-classification means wrong tests applied — the actual protective architecture is not verified, and defects in it become invisible to the test.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'What does the double-square symbol on a piece of equipment mean?',
                answer:
                  'It is the BS EN 61140 Class II marking — protection against electric shock is provided by double or reinforced insulation, not by a protective conductor. PAT test methods for Class II are different from Class I: no PE-continuity test, IR measured between live and accessible conductive part with acceptance ≥ 2 MΩ.',
              },
              {
                question: 'Is Class I always more dangerous / less safe than Class II?',
                answer:
                  "Neither. They are different protective architectures, both fully compliant with BS EN 61140 when correctly applied. Class I depends on a working CPC and protective device disconnection — vulnerable to CPC failure. Class II depends on insulation integrity — vulnerable to insulation breakdown. The PAT test for each is calibrated to verify the architecture's integrity.",
              },
              {
                question: 'What about equipment marked Class 0 — can I PAT test it and use it?',
                answer:
                  'No. Class 0 (basic insulation only, no provision for protective conductor) is not accepted for UK general use. The PAT response is to identify, withdraw, log, and refer to procurement. Commissioning Class 0 equipment is itself an EAWR Reg 4(2) defect — the protective measure does not meet UK standards.',
              },
              {
                question: 'My laptop charger has a Class II symbol but a 3-pin plug. What gives?',
                answer:
                  'The 3-pin plug is required to operate UK socket-outlet shutters (BS 1363 design). The third pin may be terminated to internal earth for EMC filtering or left unconnected at the brick. The class symbol on the rating plate takes precedence: Class II testing applies to the brick. The IEC C5 lead, if detachable, is a separate item and is tested as a Class I lead in its own right.',
              },
              {
                question:
                  'How do I tell if equipment without a class symbol is Class I or Class II?',
                answer:
                  'By construction. Look inside the plug: is there a green-and-yellow CPC conductor going into the equipment, terminated to a metal internal earth point? If yes, Class I. If the CPC pin in the plug is unterminated or only loosely connected to a chassis stud for EMC, the equipment may be Class II despite the 3-pin plug. Reference manufacturer documentation. Where class cannot be established, withdraw and escalate.',
              },
              {
                question: 'What is SELV, and how do I test Class III equipment?',
                answer:
                  'SELV = Separated Extra-Low Voltage, ≤ 50 V ac or ≤ 120 V dc, supplied from a safety isolating transformer (BS EN 61558) or batteries, separated from earth and from higher-voltage circuits. The supply itself is the protection. Class III testing focuses on verifying the SELV integrity (the supply unit, the separation, the voltage limit) and a functional check of the equipment. There is no IR or PE test on the SELV side in the conventional sense.',
              },
              {
                question: 'Can I switch a Class II appliance to Class I by adding an earth wire?',
                answer:
                  "No, and you should not try. Class is intrinsic to the equipment's design — set by the manufacturer. Adding an external earth wire to a Class II item does not convert it; it potentially compromises the double-insulation safety case and creates ambiguous test methodology. If equipment is supplied as Class II, it is tested and used as Class II. Modifications change the safety case and require manufacturer / specialist re-certification, not field improvisation.",
              },
              {
                question: 'How does class affect the PAT testing instrument settings?',
                answer:
                  'Most modern multifunction PAT testers have explicit "Class I" and "Class II" modes. Selecting the wrong mode applies the wrong test sequence: Class I mode runs PE-continuity and IR-to-earth; Class II mode skips PE-continuity and runs IR-to-accessible-part (with the probe on the casing). Selecting Class II on actually-Class-I equipment leaves the CPC integrity untested. Selecting Class I on actually-Class-II equipment produces a meaningless "no CPC" reading. The class identification must be correct before any instrument test runs.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Overview of appliance classes — Module 2.1" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-2')}
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
              onClick={() => navigate('/electrician/upskilling/pat-testing-module-2-section-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                2.2 Class I — protective earthing
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

export default PATTestingModule2Section1;
