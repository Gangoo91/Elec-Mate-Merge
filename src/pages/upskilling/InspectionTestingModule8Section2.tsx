import { ArrowLeft, ChevronLeft, ChevronRight, Tag } from 'lucide-react';
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
    id: 'mod8-s2-no-confusion',
    question:
      'A 12-way domestic consumer unit has every MCB labelled “Circuit 1”, “Circuit 2”, “Circuit 3” through to “Circuit 12”, with no description of what each circuit serves. Does this satisfy Reg 514.1.1?',
    options: [
      'Yes — every device has a unique label',
      'No — Reg 514.1.1 requires a label to indicate the purpose of each item, not just a unique identifier. Generic numbering without a description of what the device controls is non-compliant',
      'Only if the householder has the original schedule',
      'Yes, provided the labels are durable',
    ],
    correctIndex: 1,
    explanation:
      'Reg 514.1.1 requires the label to “indicate the purpose of each item”. “Circuit 1” does not indicate purpose — “Kitchen sockets” does. The schedule of inspections line for labelling will fail unless each device label tells the next person what the device controls, not just where it sits in the row.',
  },
  {
    id: 'mod8-s2-domestic-exception',
    question:
      'You issue an EIC for a new domestic installation. You record SPDs on the certificate but do not issue the Appendix 6 Guidance for Recipients pack. Has the Reg 514.16.1 domestic exception been engaged?',
    options: [
      'Yes — recording the SPD on the certificate is enough',
      'No — the exception applies only where the certificate is “complete with the guidance for recipients as detailed in Appendix 6, and issued to the person ordering the work”. Without the complete Guidance for Recipients, the physical SPD presence notice on the board is still required',
      'Only if the customer asks for it',
      'The exception is automatic for all domestic premises',
    ],
    correctIndex: 1,
    explanation:
      'The A4:2026 domestic exception in 514.9.1, 514.12.1, 514.12.2 and 514.16.1 is conditional. Issuing the certificate without the complete Appendix 6 Guidance for Recipients does not engage the exception — the labels on the board are still required. Path of least risk: fix the labels AND issue the guidance.',
  },
  {
    id: 'mod8-s2-bonding-clamp',
    question:
      'You have just installed a BS 951 bonding clamp on the gas service pipe at the meter. The clamp ships with the prescribed warning label embossed on it. Is a separate Reg 514.13.1 notice required?',
    options: [
      'Yes — you must always fix a separate label alongside',
      'No — Reg 514.13.1 explicitly permits the warning notice to be provided on the BS 951 clamp itself, provided it is clearly and durably marked with “Safety Electrical Connection — Do Not Remove”',
      'Only on TT installations',
      'Tape-and-pen is also acceptable as a fallback',
    ],
    correctIndex: 1,
    explanation:
      'Reg 514.13.1 closes with: “The warning notice may be provided on the clamp according to BS 951 or on the warning label provided with it.” The BS 951 embossed label satisfies the duty at that location. Tape-and-pen does not — it is not durable.',
  },
  {
    id: 'mod8-s2-green-yellow',
    question:
      'You want to use green-and-yellow heat-shrink as a “do not touch” marker on a non-protective cable. Does Reg 514.4.2 permit this?',
    options: [
      'Yes — colour usage is at the installer’s discretion',
      'No — the bi-colour combination green-and-yellow shall be used exclusively for identification of a protective conductor and shall not be used for any other purpose. A future inspector will assume the conductor is a CPC',
      'Only if the marker is less than 30 mm long',
      'Yes, provided the cable is also labelled',
    ],
    correctIndex: 1,
    explanation:
      'Reg 514.4.2 states the exclusivity is total. Green-and-yellow on anything other than a protective conductor is itself a defect — a future inspector will treat it as a CPC. For a hazard / “do not touch” marker, use yellow with a different stripe (yellow/black is the typical hazard combination), never green-and-yellow.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Reg 514.1.1 requires what to be provided at every item of switchgear and controlgear, except where there is no possibility of confusion?',
    options: [
      'A coloured paint band',
      'A label or other suitable means of identification to indicate the purpose of each item',
      'A barcode for asset tracking',
      'A QR code linked to the manufacturer datasheet',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 514.1.1 reads: "Except where there is no possibility of confusion, a label or other suitable means of identification shall be provided to indicate the purpose of each item of switchgear and controlgear." Where confusion is genuinely impossible (e.g. a single isolator on a single circuit at the equipment), labelling can be omitted; in any board with multiple devices, every device gets a label.',
  },
  {
    id: 2,
    question:
      'Where shall the diagram, chart or table required by Reg 514.9.1 (circuit information) be provided?',
    options: [
      'Only in the design pack lodged with building control',
      'Within or adjacent to each distribution board',
      'On the manufacturer’s website',
      'Inside the meter cupboard at the property boundary',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 514.9.1 requires that "a durable copy of the schedule relating to a distribution board shall be provided within or adjacent to each distribution board". The schedule lists circuit composition, points of utilisation served, conductor sizes/types, isolation/switching/protection devices, and any circuit vulnerable to electrical tests.',
  },
  {
    id: 3,
    question: 'A4:2026 introduced an exception to Reg 514.9.1 for which type of premises?',
    options: [
      'Commercial premises only',
      'Domestic (household) premises where certification for initial verification or an EICR complete with the guidance for recipients in Appendix 6 has been issued',
      'Listed buildings only',
      'Premises with no permanent occupants',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 514.9.1 (A4:2026) need not be applied for domestic (household) premises or similar installations where certification for initial verification, or an Electrical Installation Condition Report, complete with the guidance for recipients as detailed in Appendix 6, has been issued to the person ordering the work. The same exception pattern appears in 514.12.1, 514.12.2 and 514.16.1.',
  },
  {
    id: 4,
    question:
      'Reg 514.12.1 requires a periodic inspection notice fixed at or near the relevant distribution board(s). The notice must contain three key fields. Which set is correct?',
    options: [
      'Date of last inspection, recommended date of next inspection, name of inspector',
      'Date of last inspection and recommended date of next inspection (and the prescribed wording reading "Important — This installation should be periodically inspected and tested…")',
      'RCD test date, RCD trip time, RCD make and model',
      'Property address, postcode, customer signature',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 514.12.1 prescribes the wording: "Important — This installation should be periodically inspected and tested and a report on its condition obtained, as prescribed in BS 7671 Requirements for Electrical Installations." The two date fields are "Date of last inspection" and "Recommended date of next inspection". The inspector’s name is recorded on the certificate, not the notice.',
  },
  {
    id: 5,
    question: 'Reg 514.12.2 prescribes a notice for which type of device?',
    options: ['AFDD', 'RCD', 'SPD', 'Isolator'],
    correctAnswer: 1,
    explanation:
      'Reg 514.12.2: "Where an installation incorporates an RCD an instruction notice shall be fixed in a prominent position at or near each RCD in the installation." The wording "Test six-monthly by pressing the relevant test button(s)…" is prescribed. A4:2026 added an exception for domestic premises where the information is recorded on the certificate / EICR with Appendix 6 guidance for recipients.',
  },
  {
    id: 6,
    question:
      'A4:2026 changed the wording on the means-of-isolation label. The replacement phrase is:',
    options: [
      '"Consumer’s isolator"',
      '"Consumer’s means of isolation"',
      '"Main switch — do not operate"',
      '"Service-head isolation point"',
    ],
    correctAnswer: 1,
    explanation:
      'The A4:2026 model forms updated the means-of-isolation labelling wording from "consumer’s isolator" to "consumer’s means of isolation". The change reflects that the device may be a switch-disconnector, RCD-incomer or other compliant means; the label is about the function of the device, not a specific name.',
  },
  {
    id: 7,
    question:
      'Reg 514.13.1 prescribes the wording on the bonding / earthing warning notice. What is the wording?',
    options: [
      '"Earth bond — do not disconnect"',
      '"Safety Electrical Connection — Do Not Remove"',
      '"Equipotential bonding — high voltage"',
      '"Main earthing terminal — authorised access only"',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 514.13.1: a warning notice clearly and durably marked with the words "Safety Electrical Connection — Do Not Remove" shall be securely fixed in a visible position at or near (a) the point of connection of every earthing conductor to an earth electrode, (b) the point of connection of every bonding conductor to an extraneous-conductive-part, and (c) the main earthing terminal where separate from main switchgear. The notice may be provided on the BS 951 clamp itself.',
  },
  {
    id: 8,
    question:
      'Reg 514.16.1 (A4:2026 — new regulation) requires a notice for which device, with an exception for domestic premises?',
    options: [
      'Each MCB',
      'Each RCD',
      'Surge Protective Devices (SPDs) — at or near the relevant distribution board(s)',
      'Each AFDD',
    ],
    correctAnswer: 2,
    explanation:
      'Reg 514.16.1: "The presence of SPDs in an installation shall be indicated by an information notice at or near the relevant distribution board(s)." The exception: domestic premises where the information is recorded on the certificate for initial verification or an EICR with Appendix 6 guidance for recipients. A4:2026 also expects the SPD type (Type 1 / Type 2 / Type 3 / combined) to be identifiable per board.',
  },
  {
    id: 9,
    question:
      'Reg 514.4.2 requires the green-and-yellow combination to be used exclusively for what, and forbids reuse for any other purpose?',
    options: [
      'Functional earthing only',
      'Identification of a protective conductor',
      'Identification of switched-line conductors',
      'PEN conductors only',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 514.4.2: "The bi-colour combination green-and-yellow shall be used exclusively for identification of a protective conductor and this combination shall not be used for any other purpose." Each colour shall cover at least 30 % and at most 70 % of the surface. PEN conductors have a separate identification rule (514.4.3): green-and-yellow with blue terminations, or blue with green-and-yellow terminations.',
  },
  {
    id: 10,
    question:
      'You issue an EIC for a new domestic installation in 2026. The consumer unit has SPDs fitted. You record the SPDs on the certificate per Reg 514.16.1 exception. What does the customer also need from you for the exception to apply?',
    options: [
      'Nothing further — the certificate alone satisfies the regulation',
      'The Guidance for Recipients as detailed in Appendix 6, complete and issued to the person ordering the work',
      'A sticker on the consumer unit door listing the SPDs',
      'A signed agreement that they will not modify the installation',
    ],
    correctAnswer: 1,
    explanation:
      'The exception in Reg 514.16.1 (and 514.9.1 / 514.12.1 / 514.12.2 in the same pattern) applies only where the certificate or EICR is "complete with the guidance for recipients as detailed in Appendix 6, and issued to the person ordering the work". Incomplete Guidance for Recipients documentation does not satisfy the condition — the physical notice on the board is then still required.',
  },
];

const InspectionTestingModule8Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Identification and labelling | I&T Module 8.2 | Elec-Mate',
    description:
      'Reg 514 identification and labelling: device labels, circuit identification, the periodic inspection and RCD notices, the bonding "Safety Electrical Connection" notice, the A4:2026 SPD notice (514.16.1), and the new "consumer’s means of isolation" wording.',
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
            <ArrowLeft className="h-4 w-4" /> Module 8
          </button>

          <PageHero
            eyebrow="Module 8 · Section 2"
            title="Identification and labelling"
            description="Reg 514 in full: circuit identification, the four prescribed notices (periodic, RCD, bonding, SPD), conductor identification, and the A4:2026 model-form changes — including the new ‘consumer’s means of isolation’ wording and Reg 514.16.1 SPD notice."
            tone="yellow"
          />

          <TLDR
            points={[
              'Reg 514.1.1 — every item of switchgear and controlgear shall be provided with a label or other suitable means of identification to indicate its purpose, except where there is no possibility of confusion.',
              'Reg 514.9.1 — a diagram, chart or table giving circuit composition, protection/isolation/switching devices and any test-vulnerable circuits shall be provided within or adjacent to each distribution board. A4:2026 added a domestic premises exception where the certificate / EICR with Appendix 6 guidance for recipients is issued.',
              'Reg 514.12 — two prescribed notices: 514.12.1 periodic inspection notice (with date of last inspection and recommended date of next), 514.12.2 RCD instruction notice (six-monthly test). A4:2026 added domestic exceptions to both.',
              'Reg 514.13.1 — the "Safety Electrical Connection — Do Not Remove" notice, securely fixed at or near earthing-conductor-to-electrode connections, bonding-to-extraneous-part connections, and a separate MET. May be on the BS 951 clamp itself.',
              'A4:2026 model-form changes: "consumer’s means of isolation" wording replaces "consumer’s isolator"; new Reg 514.16.1 SPD presence notice (with domestic exception); SPD type per board is now expected on the label.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply Reg 514.1.1 to a real consumer unit and identify which devices need a label and which fall under the "no possibility of confusion" exception',
              'List the four prescribed warning / instruction notices (Reg 514.12.1, 514.12.2, 514.13.1, 514.16.1) with their wording and location requirements',
              'Carry the A4:2026 domestic-premises exception correctly into both new-build EICs and EICR comments — knowing the Appendix 6 Guidance for Recipients is the gating condition',
              'Use the new "consumer’s means of isolation" wording on the means-of-isolation label and explain why the wording was changed',
              'Identify the Reg 514.16.1 SPD notice and the A4:2026 expectation of SPD type (Type 1 / 2 / 3 / combined) per board',
              'Apply Reg 514.4 conductor identification — including the protective-conductor exclusivity in 514.4.2 and the PEN identification options in 514.4.3',
            ]}
          />

          <ContentEyebrow>Why labelling exists in BS 7671</ContentEyebrow>

          <ConceptBlock
            title="Reg 514.1 — every device, every accessory, identified for its purpose"
            plainEnglish="Reg 514 sits in Chapter 51 (Common Rules) because it applies everywhere, not just to special installations. Every device that switches, isolates or protects a circuit shall be identifiable for its purpose — and the wiring shall be arranged or marked so it can be identified for inspection, testing, repair or alteration."
            onSite="The schedule of inspections in Appendix 6 has line items for ‘labelling of protective devices, switches and terminals’ (item l of Reg 642.3) and for the various warning notices. None of those line items can be ticked unless Reg 514 is met. Bad labelling is one of the most common EICR observations and one of the easiest to remediate."
          >
            <p>Two regulations set the headline duties:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Reg 514.1.1</strong> — &ldquo;Except where there is no possibility of
                confusion, a label or other suitable means of identification shall be provided to
                indicate the purpose of each item of switchgear and controlgear. Where the operator
                cannot observe the operation of switchgear and controlgear and where this might lead
                to danger, a suitable indicator complying, where applicable, with BS EN 60073 and BS
                EN 60447, shall be fixed in a position visible to the operator.&rdquo;
              </li>
              <li>
                <strong>Reg 514.1.2</strong> — &ldquo;So far as is reasonably practicable, wiring
                shall be so arranged or marked that it can be identified for inspection, testing,
                repair or alteration of the installation.&rdquo;
              </li>
            </ul>
            <p>
              The &ldquo;no possibility of confusion&rdquo; gate is real but narrow. A single
              isolator immediately adjacent to a single piece of equipment, where there is no other
              isolator within sight, can sit unlabelled. A consumer unit with twelve protective
              devices cannot — every MCB, every RCBO, every isolator gets a description of what it
              controls.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 514.1.1"
            clause={
              <>
                Except where there is no possibility of confusion, a label or other suitable means
                of identification shall be provided to indicate the purpose of each item of
                switchgear and controlgear. Where the operator cannot observe the operation of
                switchgear and controlgear and where this might lead to danger, a suitable indicator
                complying, where applicable, with BS EN 60073 and BS EN 60447, shall be fixed in a
                position visible to the operator.
              </>
            }
            meaning="Two duties: (1) every device labelled, except where confusion is impossible; (2) where the operator cannot observe the device’s state, an indicator shall be fixed where they can see it. The second duty bites on remote-operated switchgear and contactor panels — not on a wall-mounted MCB you can see."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The four prescribed notices</ContentEyebrow>

          <ConceptBlock
            title="Reg 514.12.1 — periodic inspection and testing notice"
            plainEnglish="An instruction notice fixed in a prominent position at or near the relevant distribution board, with prescribed wording and two date fields: ‘Date of last inspection’ and ‘Recommended date of next inspection’. The notice shall be of durable material and remain legible throughout the life of the installation."
          >
            <p>
              The prescribed wording is in the regulation itself. The notice tells the next person
              who opens the cupboard when the installation was last verified and when it is due
              again. On a new EIC, the &ldquo;date of last inspection&rdquo; is today; on an EICR,
              it is the EICR date. The next-inspection date is the designer / inspector’s
              recommendation in Section D of the certificate.
            </p>
            <p>
              <strong>A4:2026 domestic exception</strong> — the requirement for the physical notice
              need not be applied for domestic (household) premises where certification for initial
              verification, or an Electrical Installation Condition Report, complete with the
              Guidance for Recipients as detailed in Appendix 6, has been issued to the person
              ordering the work. The exception is conditional on issuing both the certificate AND
              the complete Guidance for Recipients — not one or the other.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 514.12.1 (prescribed wording)"
            clause={
              <>
                Important — This installation should be periodically inspected and tested and a
                report on its condition obtained, as prescribed in BS 7671 Requirements for
                Electrical Installations. Date of last inspection ............. Recommended date of
                next inspection .............
              </>
            }
            meaning="Prescribed wording — paraphrasing or substituting your own text does not satisfy the regulation. The two date fields are mandatory. Examples of acceptable notices are provided in Figure 11A of Appendix 11."
          />

          <ConceptBlock
            title="Reg 514.12.2 — RCD instruction notice"
            plainEnglish="Where an installation incorporates an RCD, an instruction notice shall be fixed in a prominent position at or near each RCD. The wording is prescribed and tells the user to test the device six-monthly by pressing the test button. A4:2026 added a domestic exception in the same shape as 514.12.1."
          >
            <p>The full prescribed wording is:</p>
            <RegsCallout
              source="BS 7671:2018+A4:2026 · Reg 514.12.2 (prescribed wording)"
              clause={
                <>
                  This installation, or part of it, is protected by a device which automatically
                  switches off the supply if a fault develops. Test six-monthly by pressing the
                  relevant test button(s) which should operate the device. Afterwards, manually
                  switch on the device. If the device does not operate, or indicates a fault, seek
                  expert advice.
                </>
              }
              meaning="The notice is fixed at or near each RCD. The instruction is for ordinary persons — the test button is the user-facing functional check. Reg 514.12.2 NOTE 3 extends this thinking: 'The instruction notice can be applied equally for other devices incorporating a user-test facility for operation by ordinary persons.'"
            />
            <p>
              A4:2026 introduced the domestic exception: the requirement need not be applied for
              domestic (household) premises where certification for initial verification, or an
              EICR, complete with the Guidance for Recipients as detailed in Appendix 6, has been
              issued to the person ordering the work. As before, the exception is conditional on the
              complete documentation being issued — and the test instruction itself is included in
              that Guidance for Recipients.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 514.13.1 — bonding / earthing warning notice"
            plainEnglish="A warning notice clearly and durably marked with the words ‘Safety Electrical Connection — Do Not Remove’ shall be securely fixed in a visible position at or near three points: every earthing-conductor-to-electrode connection, every bonding-conductor-to-extraneous-part connection, and the main earthing terminal where it is separate from main switchgear. The notice may be provided on the BS 951 clamp itself."
          >
            <p>
              The notice is the &ldquo;do not remove&rdquo; instruction to plumbers, gas engineers,
              and refurbishment trades who might otherwise undo a bonding clamp because it
              &ldquo;looks decorative&rdquo;. The three locations are explicit:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>(a)</strong> the point of connection of every earthing conductor to an earth
                electrode;
              </li>
              <li>
                <strong>(b)</strong> the point of connection of every bonding conductor to an
                extraneous-conductive-part (the gas service pipe at the bonding clamp, the water
                service pipe at its bonding clamp);
              </li>
              <li>
                <strong>(c)</strong> the main earthing terminal, where separate from main
                switchgear.
              </li>
            </ul>
            <p>
              The &ldquo;may be provided on the clamp&rdquo; provision is the practical concession:
              BS 951 clamps are typically supplied with the warning label embossed on or attached to
              the clamp. That counts as compliance with 514.13.1 for that location, provided the
              label is clearly and durably marked.
            </p>
            <p>
              Reg 514.13.2 is a separate notice for electrical-separation locations (Reg 418.2.5 or
              418.3): the wording &ldquo;The protective bonding conductors associated with the
              electrical installation in this location MUST NOT BE CONNECTED TO EARTH. Equipment
              having exposed-conductive-parts connected to earth must not be brought into this
              location.&rdquo; This is a different notice with a different purpose — do not confuse
              the two.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 514.13.1"
            clause={
              <>
                A warning notice clearly and durably marked with the words &lsquo;Safety Electrical
                Connection — Do Not Remove&rsquo; shall be securely fixed in a visible position at
                or near: (a) the point of connection of every earthing conductor to an earth
                electrode; and (b) the point of connection of every bonding conductor to an
                extraneous-conductive-part; and (c) the main earthing terminal, where separate from
                main switchgear. The warning notice may be provided on the clamp according to BS 951
                or on the warning label provided with it.
              </>
            }
            meaning="Three mandatory locations, one prescribed wording, one practical concession. The notice may be on the BS 951 clamp itself — but it shall be present, legible, and durable. Tape-and-pen is not durable; the BS 951 clamp label is."
          />

          <ConceptBlock
            title="Reg 514.16.1 — SPD presence notice (NEW in A4:2026)"
            plainEnglish="A4:2026 introduced Reg 514.16.1 requiring a notice indicating the presence of SPDs at or near the relevant distribution board(s). The intent: anyone working on the board knows there is an SPD to disconnect before insulation testing, and knows the SPD is part of the protective scheme. The exception for domestic premises (where the information is recorded on the certificate / EICR with Appendix 6 guidance) follows the same pattern as 514.9.1 / 514.12.1 / 514.12.2."
            onSite="On commercial and industrial boards, a printed label inside the board door listing ‘SPDs fitted: Type 2, surge-protected on incomer’ (or similar) is the simplest compliant form. Brand-supplied SPD labels often pre-print the type and rating — those are acceptable evidence per the GN3 acceptance criterion."
          >
            <p>The full text:</p>
            <RegsCallout
              source="BS 7671:2018+A4:2026 · Reg 514.16.1"
              clause={
                <>
                  The presence of SPDs in an installation shall be indicated by an information
                  notice at or near the relevant distribution board(s). The requirements of this
                  regulation need not be applied for domestic (household) premises or similar
                  installations where the information is recorded on the appropriate certification
                  for initial verification, or an Electrical Installation Condition Report, complete
                  with the guidance for recipients as detailed in Appendix 6, and issued to the
                  person ordering the work.
                </>
              }
              meaning="New regulation in A4:2026. Two compliance paths: (1) physical notice at or near the board; (2) for domestic premises, record the information on the certificate/EICR + complete Guidance for Recipients. The exception removes the duty to fix a label on the board, NOT the duty to record the SPDs on the certificate."
            />
            <p>
              A4:2026 also expects the <strong>SPD type per board</strong> to be identifiable — Type
              1 (high-energy lightning current at the origin), Type 2 (overvoltage at distribution
              boards), Type 3 (point-of-use), or combined. The label or certificate entry shall make
              the type clear so a future inspector knows what protection is in place and whether
              re-coordination is needed when adding distribution.
            </p>
          </ConceptBlock>

          {/* Diagram — example label set on a CU door */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Example label set on a domestic consumer-unit door (A4:2026 wording)
            </h4>
            <svg
              viewBox="0 0 820 520"
              className="w-full h-auto"
              role="img"
              aria-label="Diagram of the inside of a consumer unit door showing the four label families: circuit list per Reg 514.9.1, RCD test notice per Reg 514.12.2, periodic inspection due-date label per Reg 514.12.1, the means-of-isolation label using the new A4:2026 wording 'Consumer's means of isolation', and the SPD presence notice per Reg 514.16.1."
            >
              <rect
                x="40"
                y="30"
                width="740"
                height="460"
                rx="14"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.25)"
                strokeWidth="2"
              />
              <text
                x="410"
                y="56"
                textAnchor="middle"
                fill="rgba(255,255,255,0.6)"
                fontSize="12"
                fontWeight="bold"
              >
                CONSUMER UNIT — INSIDE OF DOOR
              </text>
              <text x="410" y="74" textAnchor="middle" fill="rgba(255,255,255,0.4)" fontSize="10">
                The four label families a compliant board carries
              </text>

              {/* 1. Circuit chart — top left */}
              <rect
                x="60"
                y="100"
                width="340"
                height="180"
                rx="6"
                fill="rgba(34,197,94,0.06)"
                stroke="#22C55E"
                strokeWidth="1.4"
              />
              <text
                x="230"
                y="120"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="10"
                fontWeight="bold"
              >
                1 · CIRCUIT CHART (Reg 514.9.1)
              </text>
              <line
                x1="80"
                y1="135"
                x2="380"
                y2="135"
                stroke="rgba(255,255,255,0.2)"
                strokeWidth="1"
              />
              <text x="80" y="150" fill="rgba(255,255,255,0.85)" fontSize="9">
                Way 1 — Lights GF — RCBO 6A B 30 mA
              </text>
              <text x="80" y="165" fill="rgba(255,255,255,0.85)" fontSize="9">
                Way 2 — Lights FF — RCBO 6A B 30 mA
              </text>
              <text x="80" y="180" fill="rgba(255,255,255,0.85)" fontSize="9">
                Way 3 — Sockets GF — RCBO 32A B 30 mA
              </text>
              <text x="80" y="195" fill="rgba(255,255,255,0.85)" fontSize="9">
                Way 4 — Sockets FF — RCBO 32A B 30 mA
              </text>
              <text x="80" y="210" fill="rgba(255,255,255,0.85)" fontSize="9">
                Way 5 — Cooker — RCBO 32A B 30 mA
              </text>
              <text x="80" y="225" fill="rgba(255,255,255,0.85)" fontSize="9">
                Way 6 — Shower — RCBO 40A B 30 mA
              </text>
              <text x="80" y="240" fill="rgba(255,255,255,0.85)" fontSize="9">
                Way 7 — EV charger — RCBO 32A B 30 mA
              </text>
              <text x="80" y="255" fill="rgba(255,255,255,0.85)" fontSize="9">
                SPD Type 2 — at incomer
              </text>
              <text x="80" y="270" fill="rgba(255,255,255,0.5)" fontSize="9">
                (Domestic — also recorded on EIC per A4:2026 exception)
              </text>

              {/* 2. Periodic inspection notice — top right */}
              <rect
                x="420"
                y="100"
                width="340"
                height="100"
                rx="6"
                fill="rgba(251,191,36,0.06)"
                stroke="#FBBF24"
                strokeWidth="1.4"
              />
              <text
                x="590"
                y="120"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                2 · PERIODIC INSPECTION NOTICE (Reg 514.12.1)
              </text>
              <text
                x="590"
                y="138"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="9"
                fontWeight="bold"
              >
                IMPORTANT
              </text>
              <text x="590" y="152" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                This installation should be periodically inspected and
              </text>
              <text x="590" y="164" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                tested and a report on its condition obtained.
              </text>
              <text x="450" y="184" fill="rgba(255,255,255,0.85)" fontSize="9">
                Date of last inspection: 2026-04-28
              </text>
              <text x="450" y="196" fill="rgba(255,255,255,0.85)" fontSize="9">
                Recommended date of next: 2036-04-28
              </text>

              {/* 3. RCD instruction notice — middle right */}
              <rect
                x="420"
                y="215"
                width="340"
                height="90"
                rx="6"
                fill="rgba(239,68,68,0.06)"
                stroke="#EF4444"
                strokeWidth="1.4"
              />
              <text
                x="590"
                y="234"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="10"
                fontWeight="bold"
              >
                3 · RCD TEST NOTICE (Reg 514.12.2)
              </text>
              <text x="590" y="250" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                Protected by a device which automatically switches
              </text>
              <text x="590" y="262" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9">
                off the supply if a fault develops.
              </text>
              <text
                x="590"
                y="278"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="9"
                fontWeight="bold"
              >
                Test six-monthly by pressing the test button.
              </text>
              <text x="590" y="294" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                If the device does not operate, seek expert advice.
              </text>

              {/* 4. Means of isolation label — bottom left */}
              <rect
                x="60"
                y="300"
                width="340"
                height="100"
                rx="6"
                fill="rgba(168,85,247,0.06)"
                stroke="#A855F7"
                strokeWidth="1.4"
              />
              <text
                x="230"
                y="320"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="10"
                fontWeight="bold"
              >
                4 · MEANS-OF-ISOLATION LABEL (A4:2026 wording)
              </text>
              <text
                x="230"
                y="346"
                textAnchor="middle"
                fill="rgba(255,255,255,0.95)"
                fontSize="13"
                fontWeight="bold"
              >
                CONSUMER&rsquo;S MEANS
              </text>
              <text
                x="230"
                y="364"
                textAnchor="middle"
                fill="rgba(255,255,255,0.95)"
                fontSize="13"
                fontWeight="bold"
              >
                OF ISOLATION
              </text>
              <text x="230" y="384" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                A4:2026 wording — replaces older &ldquo;consumer&rsquo;s isolator&rdquo;
              </text>

              {/* 5. SPD presence notice — bottom right */}
              <rect
                x="420"
                y="320"
                width="340"
                height="80"
                rx="6"
                fill="rgba(59,130,246,0.06)"
                stroke="#3B82F6"
                strokeWidth="1.4"
              />
              <text
                x="590"
                y="338"
                textAnchor="middle"
                fill="#3B82F6"
                fontSize="10"
                fontWeight="bold"
              >
                5 · SPD PRESENCE NOTICE (Reg 514.16.1 — A4:2026 NEW)
              </text>
              <text
                x="590"
                y="358"
                textAnchor="middle"
                fill="rgba(255,255,255,0.95)"
                fontSize="11"
                fontWeight="bold"
              >
                SURGE PROTECTIVE DEVICE FITTED
              </text>
              <text x="590" y="374" textAnchor="middle" fill="rgba(255,255,255,0.85)" fontSize="9">
                Type 2 SPD at incomer — Disconnect before IR test
              </text>
              <text x="590" y="390" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                (Domestic exception applies if recorded on EIC + Appx 6 guidance issued)
              </text>

              {/* Note row */}
              <rect
                x="60"
                y="420"
                width="700"
                height="50"
                rx="6"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.2)"
                strokeWidth="1"
              />
              <text x="410" y="440" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                Plus the bonding-clamp warning &ldquo;Safety Electrical Connection — Do Not
                Remove&rdquo; (Reg 514.13.1)
              </text>
              <text x="410" y="455" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                at every earthing-electrode connection, every bonding-to-extraneous connection, and
                at the MET if separate from switchgear.
              </text>
            </svg>
          </div>

          <Scenario
            title="An EV charger added to a 2018 domestic board — what labels need updating?"
            situation="Existing 6-way RCD-protected consumer unit installed 2018. You add a 32 A Type 2 charge-point on a new way. The board now has a 7th circuit, an SPD has been added at the incomer (per upstream design), and the existing means-of-isolation label still reads ‘consumer’s isolator’."
            whatToDo={
              <>
                <span className="block">
                  1. Update the circuit chart inside the door (Reg 514.9.1) to add way 7 — EV
                  charger — protective device rating, type, RCD type. Domestic exception: also
                  record on the Minor Works Certificate with Appendix 6 Guidance for Recipients.
                </span>
                <span className="block">
                  2. Replace the means-of-isolation label with the new A4:2026 wording:
                  &ldquo;Consumer&rsquo;s means of isolation&rdquo;. The old label was correct under
                  the previous edition; the new wording reflects that the device may be a
                  switch-disconnector or RCD-incomer.
                </span>
                <span className="block">
                  3. Add a Reg 514.16.1 SPD presence notice (or rely on the domestic exception by
                  recording the SPD on the certificate). State the SPD type — &ldquo;Type 2 SPD at
                  incomer&rdquo;.
                </span>
                <span className="block">
                  4. Confirm the 514.12.2 RCD notice and the 514.12.1 periodic inspection notice are
                  still legible. If faded or removed, replace.
                </span>
                <span className="block">
                  5. Confirm the 514.13.1 bonding clamp notice is still in place at gas and water
                  bonding points (and at the MET, if separate). If the bond was disturbed for the EV
                  install (e.g. moved to upgrade conductor csa), the label moves with it.
                </span>
              </>
            }
            whyItMatters="A Minor Works Certificate that ticks ‘inspection complete’ but leaves the labels stuck in the previous edition is not compliant. The next inspector reads the labels first; out-of-date labels create doubt that travels through the rest of the EICR. Five-minute job at install time, hours of dispute on a future inspection."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Circuit identification — Reg 514.9</ContentEyebrow>

          <ConceptBlock
            title="What goes on the circuit chart"
            plainEnglish="Reg 514.9.1 prescribes the content. Per circuit: type and composition (points of utilisation served, number and size of conductors, type of wiring), the method used for compliance with Reg 410.3.2 (the protective measure — typically ADS), the protection / isolation / switching device and its location, and any circuit or equipment vulnerable to the electrical tests of Part 6."
            onSite="The ‘vulnerable to electrical tests’ field is the SPD, the dimmer, the surge-protected smart-home gateway, the electronic transformer for low-voltage downlights — anything that should be disconnected before insulation testing or applying the high test voltage. Listing these on the chart saves the next inspector damaging hardware."
          >
            <p>The four required fields per circuit:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>(a) Type and composition of each circuit</strong> — points of utilisation
                served, number and size of conductors, type of wiring (e.g. T&amp;E in joists, SWA
                buried, conduit, etc.).
              </li>
              <li>
                <strong>(b) Method used for compliance with Reg 410.3.2</strong> — the protective
                measure. Typically &ldquo;ADS&rdquo; (automatic disconnection of supply); could be
                SELV, double insulation, electrical separation, etc. on a specialist circuit.
              </li>
              <li>
                <strong>
                  (c) Information necessary for the identification of each device performing the
                  functions of protection, isolation and switching, and its location
                </strong>
                .
              </li>
              <li>
                <strong>
                  (d) Any circuit or equipment vulnerable to the electrical tests as required by
                  Part 6
                </strong>{' '}
                — the disconnect-before-IR list.
              </li>
            </ul>
            <p>
              The schedule shall be in or adjacent to each distribution board, in durable form. For
              simple installations the information may be given in a schedule (which is what the
              circuit chart inside the consumer-unit door is). The A4:2026 domestic exception
              relieves the duty to fix the chart on the board only where the certificate / EICR with
              full Guidance for Recipients has been issued.
            </p>
            <p>
              Reg 514.9.2 (introduced in A4:2026) adds: &ldquo;All diagrams, charts, and information
              or instruction notices shall comply with BS EN 61082-1, BS EN IEC/IEEE 82079-1, and,
              where appropriate, BS EN 81346-1.&rdquo; In practice that means using IEC 60617
              symbols on diagrams and following standard naming for circuit references.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Leaving the old &lsquo;consumer&rsquo;s isolator&rsquo; label after an A4:2026 update"
            whatHappens="Refurbishment job, the consumer unit is re-fronted but the original means-of-isolation label is left in place reading &lsquo;consumer&rsquo;s isolator&rsquo;. The board now mixes new RCBOs and an A4:2026-era circuit chart with old wording. A subsequent inspector flags the wording as out of date and the certificate is queried."
            doInstead="Whenever the board is opened for any non-trivial work in 2026 onwards, replace the means-of-isolation label with the A4:2026 wording &lsquo;Consumer&rsquo;s means of isolation&rsquo;. The change is small but specific — and the cost of ten labels is trivial against the cost of a contested EICR."
          />

          <CommonMistake
            title="Treating the domestic exception as &lsquo;no labels needed&rsquo;"
            whatHappens="Installer reads that 514.9.1 / 514.12.1 / 514.12.2 / 514.16.1 all have a domestic exception and concludes that no labels at all are required on a domestic board. They issue an EIC with no Guidance for Recipients pack. Three years later, an EICR inspector finds an unlabelled board and the original cert without the Appendix 6 guidance. The exception was never validly engaged — the labels should have been there."
            doInstead="The exception is conditional: the certificate / EICR shall be &lsquo;complete with the guidance for recipients as detailed in Appendix 6, and issued to the person ordering the work&rsquo;. If you have not issued a complete Guidance for Recipients pack, the physical labels are still required on the board. The path of least risk on every domestic install is to fix the labels AND issue the guidance — belt and braces."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Conductor identification — Reg 514.4</ContentEyebrow>

          <ConceptBlock
            title="The colour rules and the green-and-yellow exclusivity"
            plainEnglish="Reg 514.4 sets the colour identification of conductors. Neutral or midpoint conductor — blue (514.4.1). Protective conductor — green-and-yellow, exclusively (514.4.2). Other conductors per Table 51. The single colour green shall not be used for live conductors, protective conductors, or functional earthing/bonding (514.4.5)."
            onSite="The exclusivity rule means you cannot use green-and-yellow sleeve as a marker for &lsquo;decorative&rsquo; or &lsquo;identification&rsquo; purposes. If it is green-and-yellow, it is a protective conductor — full stop. The only permitted &lsquo;overmarking&rsquo; on green-and-yellow at terminations is for circuit identification (Reg 514.5.2)."
          >
            <p>The headlines:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>514.4.1 — Neutral or midpoint conductor — blue</strong>.
              </li>
              <li>
                <strong>514.4.2 — Protective conductor — green-and-yellow, exclusively</strong>.
                Each colour shall cover at least 30 % and at most 70 % of the surface. Single-core
                cables with green-and-yellow throughout shall only be used as protective conductors
                and shall not be overmarked at terminations except as permitted by 514.4.3.
              </li>
              <li>
                <strong>514.4.3 — PEN conductor</strong> — when insulated, marked either (a)
                green-and-yellow throughout with blue markings at terminations, or (b) blue
                throughout with green-and-yellow markings at terminations. The choice depends on
                whether the conductor is primarily protective (option a) or primarily neutral
                (option b).
              </li>
              <li>
                <strong>514.4.4 — Other conductors per Table 51</strong> — line of single-phase
                circuit (brown), L1/L2/L3 of three-phase (brown / black / grey), DC circuits,
                control circuits etc. all per the table.
              </li>
              <li>
                <strong>514.4.5 — single colour green forbidden</strong> for live conductors in
                power circuits, protective conductors, and functional earthing/bonding conductors.
              </li>
            </ul>
            <p>
              At interfaces where new and old colour systems meet (Reg 514.1.3), unambiguous marking
              shall be provided. The classic case is a 1980s rewirable installation extended in 2026
              — the change-over point inside the joint box gets sleeving on every conductor,
              identifying which old core is which new function.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 514.4.2"
            clause={
              <>
                The bi-colour combination green-and-yellow shall be used exclusively for
                identification of a protective conductor and this combination shall not be used for
                any other purpose. In this combination one of the colours shall cover at least 30 %
                and at most 70 % of the surface being coloured, while the other colour shall cover
                the remainder of the surface.
              </>
            }
            meaning="Exclusivity is the headline. Green-and-yellow = protective conductor, always, no exceptions for marker tape or decorative purposes. The 30/70 split is a manufacturing rule that protects against the conductor being mistaken for plain green (which is forbidden in 514.4.5)."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Where the labelling sits in the certificate workflow</ContentEyebrow>

          <ConceptBlock
            title="From the schedule of inspections back to Reg 642.3(l) and (o)"
            plainEnglish="The Reg 642.3 inspection list calls out (l) labelling of protective devices, switches and terminals, and (o) presence of danger notices and other warning signs. Both line items map back into Reg 514. The schedule of inspections is the audit trail for those line items."
          >
            <p>
              On the Schedule of Inspections (Appendix 6), the labelling-related lines typically
              include:
            </p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Switchgear / controlgear correctly labelled (Reg 514.1.1)</strong> — every
                MCB/RCBO has a description; the main switch is labelled.
              </li>
              <li>
                <strong>Circuit chart present and current (Reg 514.9.1)</strong> — the
                inside-of-door schedule matches the as-installed circuits.
              </li>
              <li>
                <strong>Periodic inspection notice present (Reg 514.12.1)</strong> — fixed at or
                near the board, with date fields completed.
              </li>
              <li>
                <strong>RCD test notice present (Reg 514.12.2)</strong> — at or near each RCD.
              </li>
              <li>
                <strong>Bonding warning notices present (Reg 514.13.1)</strong> — at every earthing
                conductor / electrode connection, every bonding-to-extraneous connection, and the
                separate MET.
              </li>
              <li>
                <strong>SPD presence notice (Reg 514.16.1)</strong> — at or near the board, with SPD
                type identified, OR recorded on the certificate per the domestic exception.
              </li>
              <li>
                <strong>Means-of-isolation label using current wording</strong> —
                &ldquo;Consumer&rsquo;s means of isolation&rdquo; on the main switch.
              </li>
            </ul>
            <p>
              Where a label is missing or wrong on an EICR, the typical observation code is C3 (does
              not comply with current standards on an existing installation) — unless the omission
              creates a real safety risk (e.g. unidentified circuits in a board that has also lost
              RCD protection), which can elevate to C2.
            </p>
          </ConceptBlock>

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Reg 514.1.1 — every device labelled, except where confusion is impossible. In a multi-way board, every way gets a description.',
              'Reg 514.9.1 — circuit chart in or adjacent to each distribution board, listing circuit composition, protective measure, devices, and test-vulnerable equipment.',
              'Reg 514.12.1 — periodic inspection notice with prescribed wording and two date fields. A4:2026 domestic exception applies when full certificate + Appendix 6 guidance is issued.',
              'Reg 514.12.2 — RCD instruction notice at or near each RCD, with prescribed six-monthly test wording. Same A4:2026 domestic exception.',
              'Reg 514.13.1 — "Safety Electrical Connection — Do Not Remove" notice at earthing-conductor/electrode connections, bonding-to-extraneous connections, and a separate MET. May be on the BS 951 clamp.',
              'Reg 514.16.1 (NEW in A4:2026) — SPD presence notice at or near the board, OR recorded on the certificate with Appendix 6 guidance for recipients in domestic premises. SPD type per board expected.',
              'A4:2026 wording — "Consumer’s means of isolation" replaces "Consumer’s isolator" on the main-switch label.',
              'Reg 514.4.2 — green-and-yellow exclusively for protective conductors. Single colour green forbidden for live, protective, or functional earthing/bonding conductors (514.4.5).',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Does the periodic inspection notice on a domestic board always have to be physically fixed?',
                answer:
                  'Not since A4:2026. The requirements of Reg 514.12.1 (and 514.12.2 and 514.16.1) need not be applied for domestic (household) premises where certification for initial verification, or an EICR, complete with the Guidance for Recipients as detailed in Appendix 6, has been issued to the person ordering the work. The exception is conditional on the complete documentation being issued — incomplete Guidance for Recipients does NOT engage the exception.',
              },
              {
                question: 'Can I reuse the BS 951 clamp label as the 514.13.1 warning notice?',
                answer:
                  'Yes. Reg 514.13.1 explicitly permits: "The warning notice may be provided on the clamp according to BS 951 or on the warning label provided with it." Provided the label is clearly and durably marked with "Safety Electrical Connection — Do Not Remove", and is in a visible position, it satisfies the regulation. Tape-and-pen does not — it is not durable.',
              },
              {
                question:
                  'A4:2026 changed "consumer’s isolator" to "consumer’s means of isolation". Do I need to relabel every existing board on every visit?',
                answer:
                  'No — the change applies to new work and to boards that are altered or refurbished. There is no retrospective duty to relabel existing compliant boards. Best practice is to update the wording whenever the board is opened for substantive work, but absence of the new wording on an old board is not a defect on its own. EICR observation at most.',
              },
              {
                question:
                  'On a commercial board with mixed AFDD/RCBO/SPD/MCB devices, where do all the notices go?',
                answer:
                  'Inside the board door is the standard place. The circuit chart and the periodic-inspection notice typically sit on the inside of the door; the RCD / SPD instruction notices go on or adjacent to the relevant device. The bonding clamp notices go at the bonding clamps themselves (gas/water service entry), not on the consumer unit. The means-of-isolation label goes on the front of the unit at the main switch.',
              },
              {
                question:
                  'I have an SPD fitted but a domestic customer. Do I really need to label it on the board?',
                answer:
                  'Not if the A4:2026 domestic exception applies — i.e. you record the SPD presence on the certificate / EICR and issue a complete Guidance for Recipients with it. If you do not issue the full Guidance for Recipients, the label is required. Path of least risk: fix a small label inside the door AND record on the certificate. The A4:2026 expectation also covers SPD type — Type 1 / 2 / 3 / combined — so make sure that information is captured wherever you put it.',
              },
              {
                question:
                  'Reg 514.4.2 says green-and-yellow is exclusive to protective conductors. Can I use green-and-yellow heat-shrink as a "do not touch" marker on something else?',
                answer:
                  'No. The exclusivity is total — green-and-yellow shall not be used for any other purpose. If you need a "do not touch" or "warning" marker, use yellow alone, or yellow with a different stripe (yellow/black is the typical hazard combination). A green-and-yellow marker on a non-protective conductor is itself a defect: a future inspector will assume the conductor is a CPC and act accordingly.',
              },
              {
                question:
                  'The schedule of inspections has a line for "labelling of protective devices, switches and terminals" — what level of detail is expected?',
                answer:
                  'Per device. A tick that the labelling is present and informative — i.e. it actually identifies what the device controls, not just "circuit 1, circuit 2, circuit 3". Generic numbering without context is a defect against Reg 514.1.1: the purpose of each item shall be indicated. Annotate the schedule comments with any specific labels missing or inadequate.',
              },
              {
                question:
                  'The 514.12.1 prescribed notice has two dates. What if I do not know when the last inspection was?',
                answer:
                  'On a new EIC the "date of last inspection" is the date of issue of that EIC. On an EICR, the "date of last inspection" is the EICR date itself; if a previous EICR is available, you can record both ("last EICR: ...; this EICR: ..."), but the regulation only requires the most recent. The "recommended date of next inspection" is the designer / inspector’s judgement based on installation type, age, environment and use — recorded in Section D of the certificate.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Identification and labelling — Module 8.2" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/inspection-testing/module-8')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 8
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/inspection-testing/module-8/section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                8.3 Schedule of test results
              </div>
            </button>
          </div>

          <div className="hidden">
            <Tag />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default InspectionTestingModule8Section2;
