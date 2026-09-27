/**
 * Unit 317E · Criterion 2.3 — The requirements for the inspection of
 * electrical installations
 *
 * Approach: what inspection has to cover, when it happens relative to
 * testing, and the state the installation is in while it is being inspected.
 * The items come from the BS 7671 Part 6 inspection list, the sequence comes
 * from the ordering of Reg 642 ahead of Reg 643, and the record is the
 * Schedule of Inspections.
 *
 * Sources used (existing verified teaching):
 *   level3/module5/section2/Sub1.tsx — visual inspection scope, sequence and schedule
 *   level3/module5/section1/Sub2.tsx — BS 7671 Part 6 in detail
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
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';

const quizQuestions = [
  {
    id: 1,
    question: 'Where does inspection sit in the verification sequence, and why?',
    options: [
      'Before testing — Reg 642 sits ahead of Reg 643 — because many defects are visible to a structured eye and are caught with no instrument risk and before the installation is energised.',
      'After all the dead and live tests, as a final check that nothing was disturbed while the instruments were connected.',
      'Only on the parts of the installation that the test instruments cannot reach, since testing covers everything else.',
      'At whatever point the inspector chooses, because the order of inspection and testing is left entirely to professional judgement.',
    ],
    correctAnswer: 0,
    explanation:
      'The ordering is deliberate. A loose protective conductor, a missing label, the wrong conductor colour or an inaccessible isolator all show up to the eye long before an instrument would detect any consequence. Skipping the inspection stage risks energising an installation with a visible defect.',
  },
  {
    id: 2,
    question: 'The Reg 642.3 list of inspection items is best described as:',
    options: [
      'Non-exhaustive — the listed items are the minimum, and location-specific items from Part 7 and any other safety-relevant items the inspector identifies are added to them.',
      'Exhaustive — the list is complete and nothing outside it may be recorded on the schedule.',
      'Advisory — the items are recommendations and an inspector may choose which of them to apply.',
      'Applicable only to initial verification, with a completely separate list used for periodic inspection.',
    ],
    correctAnswer: 0,
    explanation:
      'The regulation says the inspection shall include, where relevant, the listed items. That language sets a floor, not a ceiling. A bathroom needs the bathroom zoning items adding; a pool needs the pool items; a construction site needs its own.',
  },
  {
    id: 3,
    question: 'What are the standard recording conventions on the Schedule of Inspections?',
    options: [
      'Tick for acceptable, cross for not acceptable, N/A for not applicable and LIM for a limitation, with a comment mandatory wherever a cross or a LIM is recorded.',
      'Pass and fail only, with a separate written report used for anything that cannot be assessed.',
      'A numeric score from 1 to 5 for each item, with the average determining the overall result.',
      'A tick for every item that was checked, with items left blank where they do not apply.',
    ],
    correctAnswer: 0,
    explanation:
      'A cross or a LIM without a comment is incomplete and unauditable. N/A means the item cannot apply. A blank entry means the item was not assessed at all, which on a verification document is itself a finding.',
  },
  {
    id: 4,
    question: 'What does Reg 642.1 require before the inspection starts?',
    options: [
      'That the information described in Reg 132.13, together with that required by Reg 514.9, is made available to the persons carrying out the inspection and testing.',
      'That the installation has been energised so that the inspector can confirm the supply characteristics.',
      'That the client has signed acceptance of the works and settled the account.',
      'That the network operator has confirmed the external earth fault loop impedance in writing.',
    ],
    correctAnswer: 0,
    explanation:
      'The inspector needs the design information and the diagrams, charts and circuit identification before starting. Without the information set there is no way to apply the correct acceptance criteria. Missing information is a limitation on a condition report, and a reason not to start an initial verification.',
  },
  {
    id: 5,
    question:
      'You arrive for a periodic inspection and there are no drawings and no previous certificate. What is the correct response?',
    options: [
      'Carry out a more extensive survey to establish the installation arrangement from observation, agree the scope with the duty holder, record the limitation on the report and note it against the affected items.',
      'Refuse to attend, because a periodic inspection cannot be carried out without the original documentation.',
      'Proceed exactly as normal and say nothing, because the absence of paperwork does not affect what can be seen.',
      'Energise every circuit in turn to identify them, then record the installation as fully verified.',
    ],
    correctAnswer: 0,
    explanation:
      'Missing documentation is a limitation, not a stop-work. You document the extent and limitations, agree the scope with the duty holder, and carry out a more thorough survey to reconstruct the arrangement — noting where documentation was needed for full verification.',
  },
  {
    id: 6,
    question: 'Which additions did A4:2026 bring to the Schedule of Inspections?',
    options: [
      'Arc fault detection device checks, reflecting the Reg 421.1.7 recommendation, and surge protective device checks per Section 443, alongside a clarified layout for the earthing arrangements including the PNB designation.',
      'Removal of the labelling section, because labelling is now covered entirely by the test results schedule.',
      'A requirement to photograph every item on the schedule before it can be ticked.',
      'Replacement of the tick, cross, N/A and LIM conventions with a numeric scoring system.',
    ],
    correctAnswer: 0,
    explanation:
      'The schedule now carries arc fault detection device presence and type, surge protective device presence and healthy status, and a clarified set of rows for the earthing arrangements including the protective neutral bonding designation the amendment formalised.',
  },
  {
    id: 7,
    question:
      'Reg 514.13.1 requires a durable warning notice at certain earthing and bonding connections. What must it say and where does it go?',
    options: [
      'Safety Electrical Connection — Do Not Remove, fixed in a visible position at every earthing conductor connection to an earth electrode, every bonding conductor connection to an extraneous-conductive-part, and at the main earthing terminal where it is separate from the main switchgear.',
      'Danger 230 Volts, fixed to the front of the consumer unit and at every accessory on the bonded circuit.',
      'Inspection Due, fixed at the main earthing terminal only, showing the date of the next inspection.',
      'Isolate Before Working, fixed at every isolator within the installation.',
    ],
    correctAnswer: 0,
    explanation:
      'Inspection checks that the label is present, durable, legible and correctly positioned at each required location. The label is not cosmetic — it stops a later trade removing what looks like a redundant green and yellow conductor.',
  },
  {
    id: 8,
    question:
      'How does inspection on a periodic report differ from inspection on an initial verification?',
    options: [
      'Initial verification asks whether the new work complies with the design and the standard. A periodic inspection asks whether the installation is still safe for continued use, looking for deterioration, damage and departures from current standards, with findings coded C1, C2, C3 or FI.',
      'There is no difference — the same question is asked and the same output produced in both cases.',
      'Periodic inspection covers only the consumer unit, whereas initial verification covers the whole installation.',
      'Initial verification is carried out by the installer and periodic inspection is always carried out by the local authority.',
    ],
    correctAnswer: 0,
    explanation:
      'Same underlying item list, different question. The periodic lens is broader because it covers everything that has happened to the installation since it was built — damage, ageing, modifications by other trades and changes in the surrounding environment.',
  },
];

export default function Lesson317e_2_3() {
  return (
    <div className="space-y-8">
      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Inspection is the structured first stage of verification, and it happens before a single
        instrument comes out of the case. This lesson covers what has to be inspected, when it
        happens relative to testing, what state the installation is in while you do it, and how
        the result is recorded so that it stands up afterwards.
      </p>

      <TLDR
        points={[
          'Inspection comes first. Reg 642 sits ahead of Reg 643 in the Part 6 sequence, so the installation is inspected before it is tested and before it is energised.',
          'Reg 641.1 sets the timing: every installation is inspected and tested during erection and on completion before being put into service, to verify so far as is reasonably practicable that the requirements have been met.',
          'Reg 642.1 requires the design information and the circuit identification to be available before inspection begins. Without it the correct acceptance criteria cannot be applied.',
          'The Reg 642.3 item list is non-exhaustive. Part 7 location-specific items and anything else safety-relevant are added to it.',
          'The Schedule of Inspections is the audit trail — tick, cross, N/A or LIM against every item, with a comment wherever a cross or a LIM is recorded.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain why inspection precedes testing in the Part 6 sequence and what that ordering protects against.',
          'State when inspection is carried out under Reg 641.1, the condition the installation is in while it happens, and the information that must be available to the inspector beforehand under Reg 642.1.',
          'Identify the categories of item covered by the Reg 642.3 inspection list and explain why the list is non-exhaustive.',
          'Record an inspection correctly on the Schedule of Inspections using tick, cross, N/A and LIM with supporting comments.',
          'Distinguish the requirements of inspection at initial verification from those of inspection during a periodic report.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Why inspection comes first</ContentEyebrow>

      <ConceptBlock
        title="The sequence is risk management, not paperwork order"
        plainEnglish="Reg 642 sits ahead of Reg 643 for a reason. A great many installation defects are visible — the loose protective conductor, the missing label, the wrong cable colour, the isolator you cannot reach. Inspection catches them with no instrument involved and no supply connected."
        onSite="When you arrive on site, walk the installation before you open the instrument case. Schedule in hand. The instruments come out only after the inspection pass."
      >
        <p>Each stage of Part 6 filters the installation through a different lens:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Inspection.</strong> Catches what the eye and a tactile check can find —
            connections, labels, mounting, zoning, identification. No instruments needed.
          </li>
          <li>
            <strong>Dead testing.</strong> Continuity, insulation resistance, polarity and
            electrode resistance, all with the supply isolated. Catches defects in the conductor
            paths and the insulation.
          </li>
          <li>
            <strong>Live testing.</strong> Loop impedance, fault current, residual current device
            operation and functional checks. Catches defects in the protective device chain.
          </li>
          <li>
            <strong>Documentation.</strong> The certificate and schedules issued, and the customer
            pack handed over.
          </li>
        </ul>
        <p>
          Skip the inspection stage and you may energise an installation carrying a defect that
          testing alone would never find. A missing bonding label is not an electrical fault — no
          instrument will report anything wrong — but it is a non-compliance, and only inspection
          catches it.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 641.1"
        clause="Every installation shall, during erection and on completion before being put into service, be inspected and tested to verify, so far as is reasonably practicable, that the requirements of BS 7671 have been met."
        meaning="This is the cardinal duty and it fixes both the timing and the standard. Inspection happens during erection, while things are still accessible, and again on completion before the installation is put into service. The so far as is reasonably practicable formulation deliberately mirrors the statutory wording, because Part 6 is the technical mechanism by which the duty holder discharges the statutory verification obligation."
        cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 641.1."
      />

      <SectionRule />

      <ContentEyebrow>The state the installation is in</ContentEyebrow>

      <ConceptBlock
        title="During erection, and again before it goes into service"
        plainEnglish="Inspection is not one event at the end. It runs during erection, while cables are still visible and terminations are still open, and then again on completion before the installation is energised and handed over."
        onSite="Inspect as you go. Once the plasterer has been in, the run you did not look at is gone. Once the board is populated and the covers are on, a termination you never saw is a termination you are certifying on trust."
      >
        <p>What the timing means in practice:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>During erection.</strong> Cable routes, depths, fixings, supports and
            terminations are inspected while they are still accessible. Anything that will be
            covered up is inspected before it is covered up.
          </li>
          <li>
            <strong>On completion.</strong> The whole installation is inspected against the item
            list before it is put into service, with the supply off.
          </li>
          <li>
            <strong>Before energising.</strong> Inspection and the dead test sequence both happen
            with the installation de-energised. First energisation comes after they pass, not
            before.
          </li>
          <li>
            <strong>By a skilled person.</strong> Verification is carried out by someone with the
            technical knowledge and experience to do it safely and correctly.
          </li>
        </ul>
        <p>
          There is a practical consequence for programming. If the inspection is left until the
          building is finished, half the items on the list are behind plasterboard and you are
          reduced to recording limitations against them. Inspecting during erection is what keeps
          the eventual schedule full of honest ticks.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The information you must have before you start"
        plainEnglish="Reg 642.1 requires the design information and the circuit identification to be made available to the person carrying out the inspection and testing. Without it you cannot apply the right acceptance criteria — you are looking at an installation with no idea what it was supposed to be."
        onSite="Turning up with no information set is starting blind. On a new installation you ask the designer or the contractor for the pack. On an existing one, whatever is missing becomes a documented limitation."
      >
        <p>What the information set normally contains:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Design drawings and the distribution schematic.</strong> How the installation
            is arranged and what feeds what.
          </li>
          <li>
            <strong>Circuit charts and switchgear identification.</strong> The Reg 514.9
            information, at the origin and at every board.
          </li>
          <li>
            <strong>The previous certificate where one exists.</strong> The baseline for what was
            installed and what was found last time.
          </li>
          <li>
            <strong>Manufacturer instructions for installed equipment.</strong> The basis for
            checking that selection and erection took account of them.
          </li>
          <li>
            <strong>The schedule itself.</strong> Printed or on a tablet, ready to fill in as you
            walk the installation rather than afterwards from memory.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 642.1 (information required)"
        clause="Information described in Regulation 132.13 together with that required by Regulation 514.9 shall be made available to the person or persons carrying out the inspection and testing of the installation."
        meaning="Before inspection starts the inspector must have the design information — the operating, maintenance, inspection and testing data — and the diagrams, charts and identification required by Reg 514.9. No information set means the correct acceptance criteria cannot be applied. On a periodic report that becomes a documented limitation; on an initial verification it is a reason not to start until it is supplied."
        cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 642.1."
      />

      <InlineCheck
        id="317e-2-3-check-1"
        question="You are asked to inspect and verify a new installation and the contractor cannot produce any design information. What should you do?"
        options={[
          'Proceed anyway and tick the items you can see, because the physical installation is the only thing being inspected.',
          'Proceed and record every item as a limitation, then issue the certificate with a note that no information was provided.',
          'Do not start the initial verification until the information required by Reg 642.1 is supplied, because without the design data there is no way to apply the correct acceptance criteria.',
          'Energise the installation and derive the design from live readings taken at each board.',
        ]}
        correctIndex={2}
        explanation="On an initial verification the information set is part of the duty, and its absence is a reason to stop rather than a limitation to record. A periodic report on an existing installation is different — there, missing documentation is documented as a limitation and a more extensive survey is carried out."
      />

      <SectionRule />

      <ContentEyebrow>What has to be inspected</ContentEyebrow>

      <ConceptBlock
        title="The inspection item list, category by category"
        plainEnglish="The regulation gives a long list of items to inspect, and the Schedule of Inspections is built around the same headings. Working down the schedule is the practical method, because it forces you to consider every category rather than the ones you happen to remember."
        onSite="Print the schedule before you go. Walk the installation with it in your hand. Fill it in as you go — memory fades between the loft and the van."
      >
        <p>The categories and what you are looking for under each:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Connection of conductors.</strong> Tightness, torque-checked where the
            manufacturer specifies it, correct termination type, no damage to conductor strands.
          </li>
          <li>
            <strong>Identification of conductors.</strong> Correct colours, and the mixed-colour
            warning notice where a pre-harmonised installation has been extended.
          </li>
          <li>
            <strong>Routing of cables in safe zones.</strong> Within the permitted zones, or
            protected by a residual current device, or given earthed mechanical protection.
          </li>
          <li>
            <strong>Selection of conductors for current-carrying capacity and voltage drop.</strong>{' '}
            Visual confirmation that the installed cross-sectional area matches the design.
          </li>
          <li>
            <strong>Single-pole devices connected in line conductors only.</strong> Switches and
            overcurrent devices in the line, never in the neutral.
          </li>
          <li>
            <strong>Methods of protection against electric shock.</strong> Basic protection, fault
            protection and additional protection — barriers and enclosures, the automatic
            disconnection arrangement, residual current device presence and type, supplementary
            bonding where required.
          </li>
          <li>
            <strong>Protection against thermal effects.</strong> Sealing of cable penetrations,
            suitable enclosure rating, cable management for heat dissipation.
          </li>
          <li>
            <strong>Methods of protection against overcurrent.</strong> Correct device type, rating
            and breaking capacity coordinated with the prospective fault current.
          </li>
          <li>
            <strong>Earthing and bonding arrangements.</strong> Main earthing conductor sizing, main
            bonding to extraneous-conductive-parts, supplementary bonding in special locations.
          </li>
          <li>
            <strong>Labelling and notices.</strong> The durable warning notice marked Safety
            Electrical Connection — Do Not Remove at every earthing conductor connection to an
            earth electrode, at every bonding conductor connection to an
            extraneous-conductive-part and at the main earthing terminal where it is separate from
            the main switchgear, plus circuit identification, the residual current device test
            notice, the inspection date notice and main switch identification.
          </li>
          <li>
            <strong>Selection of equipment for external influences.</strong> Ingress and impact
            ratings, and suitability for ambient temperature and for the presence of water, dust or
            corrosive substances.
          </li>
          <li>
            <strong>Access for operation, identification and maintenance.</strong> Switchgear and
            components reachable for safe operation and replacement.
          </li>
          <li>
            <strong>Presence of diagrams, instructions and similar information.</strong> The circuit
            chart and distribution schematic in place at the boards.
          </li>
          <li>
            <strong>Erection methods.</strong> Adequate fixing of equipment and support of cables
            within the manufacturer guidance.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 642.3 (extract)"
        clause="The inspection shall include checking, where relevant to the installation, of the following items… (a) installed equipment is of the correct type and conforms to applicable British or Harmonized Standards, or a foreign national standard based on an IEC Standard; (b) installed equipment is correctly selected and erected, taking into account manufacturers' instructions; (c) connection of cables and conductors are correctly made, including any terminations, joints, and the identification of conductors…"
        meaning="This is the formal item list. The phrase where relevant recognises that not every item applies to every installation — but where an item does apply, it must be checked and recorded. Ticking an item as acceptable without actually checking it creates a false record, which is a far worse position than recording that the item could not be assessed."
        cite="Source: BS 7671:2018+A4:2026 Part 6, Chapter 64, Regulation 642.3 — paraphrased extract."
      />

      <ConceptBlock
        title="The list is a floor, not a ceiling"
        plainEnglish="The regulation says the inspection shall include, where relevant, the listed items. That language sets a minimum. Location-specific requirements from Part 7 are added on top wherever the installation contains such a location, along with anything else safety-relevant the inspector identifies."
        onSite="Identify the special locations before you start and add their items to the schedule. Missing a Part 7 requirement is one of the most common verification failures there is."
      >
        <p>Typical additions by location:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Bathrooms.</strong> The zones traced on site, equipment identified by zone, and
            the ingress rating of each item confirmed against the zone requirement.
          </li>
          <li>
            <strong>Swimming pools.</strong> The pool zones, the supplementary bonding network and
            the low-voltage supply arrangements within the zones.
          </li>
          <li>
            <strong>Construction sites.</strong> The supply voltage arrangement, residual current
            protection and ingress rating matched to site conditions.
          </li>
          <li>
            <strong>Agricultural premises.</strong> The equipotential plane in livestock areas and
            the supplementary bonding network connected to it.
          </li>
          <li>
            <strong>Solar and vehicle charging installations.</strong> Direct current isolation and
            labelling, protective device type, dedicated circuits and local isolation.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="317e-2-3-check-2"
        question="You are inspecting a domestic installation that includes a wet room formed from a former bedroom. The schedule you printed covers the general item list only. What is the correct response?"
        options={[
          'Add the location-specific items for the special location to the schedule and inspect against them, because the general list is a minimum rather than a complete set.',
          'Inspect against the printed schedule only, because the schedule as issued defines the scope of the inspection.',
          'Record the wet room as a limitation, because it is not covered by the schedule you brought.',
          'Ignore the wet room, because a converted room is inspected under the arrangement that applied when the building was built.',
        ]}
        correctIndex={0}
        explanation="The item list is explicitly non-exhaustive. Where the installation contains a special location, the location-specific items are added. Recording a limitation because you brought the wrong schedule is not a limitation on the installation — it is a limitation on your preparation."
      />

      <SectionRule />

      <ContentEyebrow>Recording what you found</ContentEyebrow>

      <ConceptBlock
        title="Tick, cross, N/A, LIM — and always a comment"
        plainEnglish="The schedule is the audit trail. Every item gets one of four marks. Tick means assessed and acceptable. Cross means assessed and not acceptable. N/A means the item cannot apply. LIM means it could not be assessed within the agreed scope, and the comment says why."
        onSite="Fill it in on site, not in the office. Photograph anything you mark as a cross or a LIM at the moment you mark it — a photograph is worth a paragraph of explanation later."
      >
        <p>The four conventions in detail:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Tick.</strong> Assessed and compliant. No comment required, although a short
            positive note can help the next inspector.
          </li>
          <li>
            <strong>Cross.</strong> Assessed and non-compliant. A comment is mandatory, saying what
            is wrong and what action is needed. On an initial verification the work must be
            remedied before energising.
          </li>
          <li>
            <strong>N/A.</strong> The item cannot apply to this installation. A short comment helps
            the next reader confirm the N/A is correctly applied.
          </li>
          <li>
            <strong>LIM.</strong> Could not be assessed within the agreed scope. Typical reasons
            are cable routes concealed in the building fabric, access refused, or a board that
            cannot safely be de-energised. The limitation reduces the value of the verification, so
            it is documented clearly and the duty holder is told.
          </li>
        </ul>
        <p>
          A blank entry is not a neutral result. It means the item was never assessed, and on a
          document that certifies verification an unexplained blank is itself a finding.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="What A4:2026 added to the schedule"
        plainEnglish="The current amendment added rows for arc fault detection devices and confirmed the surge protective device checks, and it clarified the layout for the earthing arrangements. The schedule reflects the installation — where these devices are fitted you confirm type and status, and where they are absent you record the design decision."
        onSite="Make sure the schedule you are using matches the amendment you are certifying against. The scheme bodies have re-issued their branded versions, and an out-of-date form will be missing rows."
      >
        <p>The additions:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Arc fault detection device presence.</strong> The regulation recommends them
            rather than mandating them in general use, with mandatory scope for higher-risk
            residential buildings through the Building Safety Act 2022 framework. Inspection
            confirms they are fitted on the circuits the design specifies, that the type is correct
            and that the test button has been operated as part of commissioning.
          </li>
          <li>
            <strong>Surge protective device presence.</strong> Confirm the device at the origin, the
            status indicator showing healthy, and that the protection upstream of it is correctly
            rated.
          </li>
          <li>
            <strong>Clarified earthing arrangement rows.</strong> The sections were tidied for the
            different system types, including the protective neutral bonding designation the
            amendment formalised.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="317e-2-3-check-3"
        question="Halfway through an inspection the occupier refuses to move a fitted wardrobe covering a section of trunking. How is that recorded?"
        options={[
          'Tick the affected items, because the trunking was almost certainly installed correctly along with the rest of the run.',
          'Cross the affected items, because anything not seen must be assumed defective.',
          'Leave the affected items blank, because nothing was assessed and there is therefore nothing to record.',
          'Mark the affected items LIM with a comment stating that access was refused, tell the duty holder, and record the limitation on the report.',
        ]}
        correctIndex={3}
        explanation="A limitation is an honest statement that an item could not be assessed within the agreed scope. It is recorded with the reason, the duty holder is informed, and the reduced value of the verification is on the face of the document. A blank is not the same thing and a speculative tick is worse than either."
      />

      <SectionRule />

      <ContentEyebrow>Inspection on an existing installation</ContentEyebrow>

      <ConceptBlock
        title="Same items, different question"
        plainEnglish="At initial verification the question is whether the new work complies with the design and the standard. On a periodic report the question is whether the installation is still safe for continued use. The underlying item list is the same; the lens is wider."
        onSite="On a periodic your eye is tuned for deterioration. Loose connections from vibration. Corrosion at outdoor terminations. Burnt insulation around a socket. Damage from other trades. Anything that has been changed since the last time."
      >
        <p>What the periodic lens adds on top of the standard item list:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Damage from use and age.</strong> Cracked accessories, damaged insulation,
            broken switches, burnt sockets, damaged cable sheath.
          </li>
          <li>
            <strong>Deterioration over time.</strong> Corrosion at terminations, conductor
            discolouration from heat, hardware rusting.
          </li>
          <li>
            <strong>Modifications since installation.</strong> Additions not on the original
            certificate, alterations by other trades, interventions by the occupier.
          </li>
          <li>
            <strong>Departures from current standards.</strong> Arrangements that complied when
            installed but do not meet the current standard.
          </li>
          <li>
            <strong>Lost documentation.</strong> Circuit chart faded or removed, inspection notice
            missing or out of date.
          </li>
          <li>
            <strong>Environmental change.</strong> A loft insulated over cables designed for free
            air, damp developing, equipment relocated.
          </li>
        </ul>
        <p>
          Findings on a periodic report are coded rather than simply crossed. C1 means danger is
          present and immediate action is required. C2 means potentially dangerous. C3 means
          improvement recommended. FI means further investigation is needed before a code can be
          settled. A report is unsatisfactory where any C1 or C2 is present; C3 findings alone do
          not make it unsatisfactory.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating the schedule as a tick-everything formality"
        whatHappens={
          <>
            Every item gets a tick without genuine assessment and the certificate is issued. Months
            later a fault reveals a defect that was visible on day one. The schedule says it was
            checked. The inspector has not simply missed a defect — they have created a false
            record of having checked it, and that is a much worse position than never having looked
            at all.
          </>
        }
        doInstead={
          <>
            Treat every tick as a declaration. If you have not actually verified the item against
            the standard, do not tick it — either verify it or mark it LIM with the reason. A
            schedule carrying a few honest limitations is a far better record than a fully ticked
            one that does not reflect what you actually did.
          </>
        }
      />

      <CommonMistake
        title="Leaving the whole inspection until the building is finished"
        whatHappens={
          <>
            Nothing is inspected during erection. By the time the inspector walks the job, cable
            routes are behind plasterboard, terminations are behind fitted units and the
            penetrations through fire-rated walls are covered. Half the item list is now
            unverifiable, so the schedule fills with limitations and the certificate is worth
            correspondingly less to everybody who relies on it.
          </>
        }
        doInstead={
          <>
            Inspect during erection as the regulation intends. Anything that is going to be covered
            gets inspected and recorded before it is covered, with photographs where useful. The
            completion inspection then confirms the finished installation rather than trying to
            reconstruct it from the outside.
          </>
        }
      />

      <Scenario
        title="Extension handover in Caernarfon with the boards already live"
        situation={
          <>
            You have been asked to inspect and verify a single-storey extension to a house in
            Caernarfon. The contractor has already energised the new circuits so the plasterers
            could use the sockets, and the kitchen units are fitted over the run that feeds the
            new ring. The design pack consists of a hand-drawn sketch on the back of a quotation
            and there is no circuit chart at the board.
          </>
        }
        whatToDo={
          <>
            Stop and reset the sequence before you inspect anything. The information required
            before inspection has not been supplied, so ask the contractor for the design
            information and the circuit identification. Isolate the new work so that the inspection
            and the dead test sequence happen on a de-energised installation, as the ordering
            requires. Inspect the item list in full and add the items for any special location
            present. Where the run behind the fitted units genuinely cannot be seen, mark those
            items LIM with the reason and tell the person ordering the work, in writing, what could
            not be verified and why. Do not tick items you have not seen simply because the
            surrounding work looks tidy.
          </>
        }
        whyItMatters={
          <>
            Two of the requirements have already been broken before you arrived — the installation
            was put into service before it was verified, and the information set was never
            produced. You cannot undo the first, but you can refuse to compound it. An honest
            schedule with documented limitations tells the next person exactly what was and was not
            established. A complete set of ticks would tell them something that is not true.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'Is inspection just walking round and looking?',
            answer:
              'No. Inspection is a structured assessment against a defined item list, extended for special locations and anything else safety-relevant, with the Schedule of Inspections as the audit trail. Each item gets a tick, cross, N/A or LIM with comments where needed. A walk-round with no schedule and no method is not inspection.',
          },
          {
            question: 'How long should inspection take?',
            answer:
              'It depends on the scale of the installation. A domestic board change might be half an hour to an hour of inspection before any testing starts, and a small commercial unit could be half a day. The bigger and more complex the installation, the longer it takes — and the more it pays back by catching issues before instruments are connected. Time pressure is the most common reason inspection gets rushed.',
          },
          {
            question:
              'What if I find something during testing that should have been picked up by inspection?',
            answer:
              'Stop, document the finding and update the inspection record so that the schedule reflects everything you actually verified. If the miss points to a gap in your method, adjust it. Inspection is the cheapest stage at which to catch a defect, so missing one there has knock-on cost everywhere downstream.',
          },
          {
            question: 'Can inspection and testing be carried out by different people?',
            answer:
              'Yes, and on larger jobs that is often how teams work. The certificate has separate signature blocks, and the person signing the inspection and testing block takes responsibility for both the inspection and the test record. Tasks can be delegated, but the sign-off cannot — so delegated work has to be supervised and verified.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Inspection precedes testing. Reg 642 sits ahead of Reg 643 so that visible defects are caught with no instrument risk and before the installation is energised.',
          'Reg 641.1 requires inspection during erection and on completion before the installation is put into service, verifying so far as is reasonably practicable that the requirements have been met.',
          'Inspection and the dead tests are carried out on a de-energised installation. First energisation follows them; it does not precede them.',
          'Reg 642.1 requires the design information and the Reg 514.9 diagrams, charts and identification to be available before inspection starts.',
          'The Reg 642.3 item list is non-exhaustive, covering connections, identification, routing, conductor selection, shock protection, thermal effects, overcurrent protection, earthing and bonding, labelling, external influences, access, documentation and erection methods.',
          'Part 7 location-specific items are added wherever a special location is present, and so is anything else safety-relevant the inspector identifies.',
          'The Schedule of Inspections records tick, cross, N/A or LIM, with a comment mandatory for every cross and every limitation. A blank entry is itself a finding.',
          'On a periodic report the same items are inspected through a wider lens — deterioration, damage, modification and departure from current standards — with findings coded C1, C2, C3 or FI.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz
        questions={quizQuestions}
        title="Requirements for inspection — knowledge check"
      />
    </div>
  );
}
