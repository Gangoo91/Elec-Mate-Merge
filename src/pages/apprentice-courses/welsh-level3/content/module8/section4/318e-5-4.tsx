/**
 * Unit 318E · Criterion 5.4 — How to ensure, if the fault(s) cannot be corrected
 * immediately, the safety of the relevant electrical cables, conductors, wiring
 * system, equipment, accessories and components.
 *
 * Approach: this lesson teaches the make-safe path for the job you cannot
 * finish today. Isolate within competence, label and secure against
 * re-energisation, record the condition, tell the responsible person, and
 * decide what may stay in service. It closes on the case the criterion does
 * not name but every electrician meets — the client who refuses the work.
 *
 * Sources used (existing verified teaching in the English course):
 *   level3/module4/section4/Sub3.tsx — the five-step unsatisfactory-result
 *     action chain, C1 immediate action sequence, EICR coding, Regulation
 *     641.3 and Regulation 651.4, instrument uncertainty on marginal readings.
 *   level3/module4/section4/Sub5.tsx — the make-safe-only documentation route,
 *     the customer refusal pattern, EAWR duties where a known danger is left in
 *     service, Regulation 644.1, Regulation 132.16, photographic evidence.
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
    question: 'The action chain when a test result falls outside acceptable limits runs:',
    options: [
      'Verify the reading, identify the failure mode, make safe, document and inform the customer in writing where it is a Code 1, then rectify within competence or escalate.',
      'Record the reading on the job sheet and re-energise, since a single out-of-limit result is usually instrument error and the circuit is probably fine.',
      'Replace whichever component the test points at immediately, because an out-of-limit reading is conclusive on its own and verification only wastes time.',
      'Increase the rating of the protective device so that the circuit passes, which clears the failure without further investigation of the loop.',
    ],
    correctAnswer: 0,
    explanation:
      'The five steps turn an unsatisfactory reading into a safe, documented and defensible outcome: verify by repeating the test and checking the leads and instrument; identify the failure mode; make safe by isolating and labelling; document, with a written notification to the customer where the finding is a Code 1; then rectify if it is within your competence or escalate if it is not.',
  },
  {
    id: 2,
    question: 'A Code 1 (Danger Present) finding that you cannot rectify today requires:',
    options: [
      'Making safe immediately by isolating within competence, labelling to prevent re-energisation, informing the customer in writing, escalating to your supervisor and documenting all of it.',
      'Finishing the job you were called out for, then mentioning the finding to the customer on your way out and leaving them to arrange a repair.',
      'Leaving it alone because it was outside the call-out scope, recording that you saw it and letting the next contractor deal with it.',
      'Photographing it for the report and re-energising, so the customer is not left without power while they decide whether to act.',
    ],
    correctAnswer: 0,
    explanation:
      'A Code 1 could cause harm at any moment, so the response is time-critical: isolate the affected circuit if that is within your competence, label prominently so nobody re-energises it, notify the customer in writing, escalate to your supervisor by phone rather than email, and document everything on the job sheet. The make-safe step does not wait for customer permission.',
  },
  {
    id: 3,
    question: 'The make-safe label on an isolated circuit should carry:',
    options: [
      'A clear out-of-service instruction not to re-energise, with the date and the name of the person who isolated it.',
      'The measured test value alone, so that whoever reads it can decide for themselves whether the circuit is safe to restore.',
      'Nothing beyond a strip of insulating tape over the device, which is enough to indicate that the circuit should be left alone.',
      'The customer name and the job reference only, since the electrical detail is for the certificate rather than the board.',
    ],
    correctAnswer: 0,
    explanation:
      'The label exists so that another person — the customer, another trade, a colleague on a later visit — does not restore the supply without knowing why it was taken away. A clear out-of-service instruction with the date and the name of the person who isolated it gives them something to act on and somebody to contact.',
  },
  {
    id: 4,
    question:
      'Regulation 651.4 covers what happens to a defect you found but were not able to correct. It requires that:',
    options: [
      'Details of any damage, deterioration, defects or dangerous conditions shall be recorded in a report.',
      'Details of any defect shall be corrected before the operative leaves site, whether or not they were within the original scope of work.',
      'Details of any defect shall be reported verbally to the duty-holder, with a written record required only for dangerous conditions.',
      'Details of any defect shall be withheld from the report where they fall outside the agreed scope of the inspection.',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 651.4 requires details of any damage, deterioration, defects or dangerous conditions to be recorded in a report. It is the regulation that turns a thing you noticed but were not called out for into a thing that sits on the customer record. It is not optional and not at the discretion of the firm.',
  },
  {
    id: 5,
    question:
      'A circuit reads a loop impedance far above the Table 41.3 maximum for its protective device. Before you leave site you should:',
    options: [
      'Verify the reading, check whether the cause is a high supply impedance or added circuit impedance, make safe by isolating, then investigate and code by the actual risk.',
      'Record it as a pass because the circuit is protected by a residual current device, which clears every earth fault regardless of loop impedance.',
      'Leave the circuit in service and note the reading for the next periodic inspection, since the device will still operate eventually.',
      'Fit a higher-rated protective device, which raises the permissible loop impedance and brings the measured value inside the limit.',
    ],
    correctAnswer: 0,
    explanation:
      'A loop impedance above the Table 41.3 maximum means the protective device cannot be relied on to disconnect within the required time. Verify the reading first, then look at whether the cause sits at the origin or on the circuit, make safe, and code it by the actual risk — Code 1 where it is imminently dangerous, Code 2 where safety is compromised but not immediately dangerous.',
  },
  {
    id: 6,
    question:
      'The customer refuses to authorise remedial work that you have recommended. Your record should capture:',
    options: [
      'The recommendation made, the customer response, the implications you briefed them on, and your professional position on leaving the installation in service.',
      'The recommendation made and nothing else, since the customer decision is their own business and does not belong on the contractor record.',
      'A note that the customer was difficult, so that the office knows not to quote for further work at that address.',
      'Nothing — a refusal means the work was never in scope, so there is no record to make beyond the original invoice.',
    ],
    correctAnswer: 0,
    explanation:
      'The documentation pattern is: the recommendation, in specific terms; the customer response and the date; the implications you briefed them on, including the risk in plain words; and your decision and its justification. That record is your protection and the customer information. Where the residual risk is a Code 1 the firm should not leave the installation in service even on customer request.',
  },
  {
    id: 7,
    question:
      'You have isolated a dangerous circuit and left site without rectifying it. The documentary output is:',
    options: [
      'A job sheet describing the make-safe, plus a certificate if you altered the circuit, and a written recommendation for the further work or investigation needed.',
      'A full Electrical Installation Certificate covering the whole installation, since the isolation has changed how the installation operates.',
      'Nothing at all, because no remedial work was carried out and there is therefore nothing to certify.',
      'A verbal handover to whoever is on site, with the written record produced only if the customer later asks for one.',
    ],
    correctAnswer: 0,
    explanation:
      'Make-safe with no remediation yet is recorded on the job sheet, describing what was found, what was isolated and why. If you altered the circuit in the course of making it safe — fitting a temporary blanking plate, for example — a certificate covers that alteration. The recommendation for the further work or investigation goes to the customer in writing.',
  },
  {
    id: 8,
    question: 'Photographs taken when a fault has to be left unrectified are useful because:',
    options: [
      'They evidence the condition as found, time-stamped, so the state of the installation when you left it is not a matter of recollection.',
      'They replace the written record, since a photograph of the fault shows everything a job sheet entry would say.',
      'They allow the manufacturer to be billed for the failure of the component shown in the image.',
      'They are required by BS 7671 on every visit where a defect is identified, regardless of whether it was rectified.',
    ],
    correctAnswer: 0,
    explanation:
      'A photograph of the condition as found, of the instrument reading that identified it, and of the label and isolation you left in place turns a verbal account into a documented one. It supports the written record rather than replacing it, and it matters most when somebody disturbs the installation after you leave.',
  },
];

const faqs = [
  {
    question: 'What does "within my competence" actually mean when I am deciding what to isolate?',
    answer:
      'It means the isolation itself is something you are trained, equipped and authorised to carry out safely on that installation. Locking off a final circuit at a domestic board is ordinarily within an experienced apprentice competence. Isolating a section of a live commercial distribution system with a permit regime and an unknown supply arrangement is not. Where the isolation you need is beyond you, the answer is not to leave the danger — it is to restrict access, escalate immediately and stay with it until somebody who can isolate it arrives.',
  },
  {
    question: 'Do I need the customer permission before I isolate something dangerous?',
    answer:
      'No. Making safe is not a variation to the work and it is not a commercial decision. Where a condition is immediately dangerous the isolation happens and the conversation follows. What you do owe the customer is a prompt, clear explanation of what you isolated, why, what they have lost as a result, and what needs to happen to get it back — in writing as well as verbally.',
  },
  {
    question: 'What if isolating the fault takes out something the customer really cannot lose?',
    answer:
      'Isolate as narrowly as the fault allows, so that the smallest part of the installation goes out of service. Then say so clearly and early. If the loss is genuinely critical — a care setting, a commercial freezer, a system somebody depends on — escalate at once so that a temporary arrangement can be organised by somebody with the authority to organise it. What you do not do is leave a dangerous circuit energised because switching it off is inconvenient.',
  },
  {
    question: 'The fault is on equipment rather than the fixed wiring. Does any of this change?',
    answer:
      'The principle does not. Isolate it from the supply, label it so nobody plugs it back in or switches it on, remove it from service where that is practical, record what you found, and tell the responsible person. What changes is who owns the repair — a defect in a piece of equipment may be a manufacturer or a maintenance matter rather than an installation one — so the escalation goes to whoever is responsible for that equipment as well as to the duty-holder.',
  },
];

export default function Lesson318e_5_4() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'A fault you cannot correct today does not stop being your responsibility. The duty shifts from rectifying it to making sure it cannot hurt anybody before somebody else can rectify it.',
          'The make-safe path is: isolate within your competence, label and secure against re-energisation, record the condition with readings and photographs, tell the responsible person in writing, and escalate.',
          'Isolate as narrowly as the fault allows, so that the smallest part of the installation goes out of service — but never leave a dangerous circuit energised because switching it off is inconvenient.',
          'Regulation 651.4 requires details of any damage, deterioration, defects or dangerous conditions to be recorded in a report. What you found but did not fix still goes on the record.',
          'A client can refuse remedial work, and the refusal is documented rather than argued. What a client cannot do is require the firm to leave a Code 1 condition in service.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Apply the make-safe path when a fault cannot be corrected on the visit — isolate, label, record, inform, escalate.',
          'Judge how narrowly to isolate so that the smallest part of the installation is taken out of service without leaving any dangerous part energised.',
          'Label and physically secure an isolated circuit so that nobody restores the supply without knowing why it was removed.',
          'Record the condition as found under Regulation 651.4, with the measured readings, the verification and the photographic evidence that supports it.',
          'Document a client refusal of recommended work, and recognise where the residual risk means the installation cannot be left in service regardless of that refusal.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>When you cannot fix it today</ContentEyebrow>

      <ConceptBlock
        title="The duty changes shape, it does not go away"
        plainEnglish="There are plenty of honest reasons a fault cannot be corrected on the visit — the part is not on the van, the cause is inside a wall, the work is beyond your competence, the customer has not authorised it, or the circuit belongs to somebody else. None of those reasons make the fault safe. They change what your job is for the rest of the visit."
        onSite="The moment you know you are not fixing it today is the moment the job changes. Stop trying to chase the repair and start working the make-safe path. Half a repair left open at four o clock is worse than a clean isolation at three."
      >
        <p>What the make-safe path consists of:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Verify.</strong> Repeat the test. Check the leads and the instrument. Confirm
            with a second instrument if one is available. You are about to take something out of
            service on the strength of this reading.
          </li>
          <li>
            <strong>Identify the failure mode.</strong> What does the reading actually indicate —
            insulation breakdown, a high-resistance joint, a polarity error, a device that will not
            operate? The failure mode drives how far the isolation has to reach.
          </li>
          <li>
            <strong>Make safe.</strong> Isolate the affected part within your competence, label it,
            and physically prevent re-energisation by anybody else.
          </li>
          <li>
            <strong>Document.</strong> Record the reading, the verification, the condition as found
            and the action taken. Photograph it. Where the finding is a Code 1, the customer is
            informed in writing.
          </li>
          <li>
            <strong>Rectify or escalate.</strong> Fix it if it is within your competence and you
            have the authority and the materials. Escalate to your supervisor if it is not.
          </li>
        </ul>
        <p>
          A Code 1 found in the middle of a job you were called out for something else triggers
          this whole chain regardless of the original scope. Being there for a different reason is
          not a reason to walk past it.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Verify before you isolate — you are about to act on this number"
        plainEnglish="Taking a circuit out of service on the strength of a reading is a real decision with real consequences for the people who use it. The verification step is short, but it is what separates a defensible isolation from an expensive mistake."
        onSite="Repeat the test with the leads in a different position. Null the leads again. If a second instrument is in the van, use it. Most of the time the reading holds and you have lost ninety seconds; occasionally it does not, and you have avoided isolating a healthy circuit."
      >
        <p>What verification consists of:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Repeat the test.</strong> A reading that reproduces is a reading you can act
            on. A reading that moves is telling you something about the test rather than the
            circuit.
          </li>
          <li>
            <strong>Check the leads and the instrument.</strong> A ruptured lead fuse, a damaged
            lead or an out-of-calibration instrument produces a convincing wrong answer.
          </li>
          <li>
            <strong>Use a second instrument where one is available.</strong> If the reading persists
            across two instruments it is real. If it changes, one of them is suspect and the
            suspect one is segregated.
          </li>
          <li>
            <strong>Compare against what you expected.</strong> Verification under Regulation 641.3
            is a comparison of the result against the relevant criteria. Know what the circuit
            should give before you decide the reading is wrong.
          </li>
          <li>
            <strong>Allow for the measurement itself.</strong> A value sitting right on a limit is
            inside the instrument uncertainty band and should be treated as a developing fault
            worth recording, rather than dismissed as a pass or overstated as a failure.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Reg 641.3"
        clause="The verification shall include comparison of the results with relevant criteria to confirm that the requirements of BS 7671 have been met."
        meaning="Deciding that a condition is dangerous is a comparison, not an instinct. The regulation puts that comparison at the heart of verification: the measured value against the relevant criterion for that circuit and that protective device. It matters when you are about to isolate, because the record has to show what you compared the reading with and why the comparison led you to take the circuit out of service."
        cite="Source: BS 7671:2018+A4:2026 — Reg 641.3, verbatim."
      />

      <SectionRule />

      <ContentEyebrow>Isolating within competence</ContentEyebrow>

      <ConceptBlock
        title="As narrow as the fault allows, as wide as the fault requires"
        plainEnglish="Two things pull against each other when you decide what to isolate. Isolating too widely takes out things the customer needs and creates pressure to put them back. Isolating too narrowly leaves part of the dangerous condition live. The fault decides, not the convenience."
        onSite="Work out what is actually fed from the point you are isolating before you lock it off. A single protective device at a domestic board is usually obvious. A submain in a commercial unit rarely is, and the thing you did not realise was on it is the thing somebody restores the supply for."
      >
        <p>Deciding the extent:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Start from the failure mode.</strong> A damaged accessory may only need that
            final circuit off. A compromised protective conductor on a shared route may reach
            further than one circuit. An issue at the origin affects everything downstream.
          </li>
          <li>
            <strong>Isolate at a point you can secure.</strong> There is no value in switching off
            at a point that has no means of being locked off, because it will be switched back on.
          </li>
          <li>
            <strong>Check for other sources.</strong> Standby supplies, generation on the customer
            side and charging equipment can all bring a circuit back to life. An isolation that
            does not account for them is not an isolation.
          </li>
          <li>
            <strong>Prove it.</strong> The same routine as any other isolation — prove the
            indicator on a known live source, test the point, prove the indicator again. You are
            going to tell somebody this is dead, so know that it is.
          </li>
          <li>
            <strong>Know the limit of your competence.</strong> If the isolation you actually need
            is beyond what you are trained and authorised to carry out on that system, do not
            improvise. Restrict access to the danger, escalate immediately, and stay with it.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Reg 651.4"
        clause="Details of any damage, deterioration, defects or dangerous conditions shall be recorded in a report."
        meaning="This is the regulation that converts a fault you could not correct into an entry on the customer record. It is not limited to what you were called out for and it is not at the discretion of the firm. Whatever you found — the dangerous condition you isolated, the borderline reading on an adjacent circuit, the deterioration you have no authority to address — is recorded so that the duty-holder and the next person to attend both know it exists."
        cite="Source: BS 7671:2018+A4:2026 — Reg 651.4."
      />

      <InlineCheck
        id="318e-5-4-check-1"
        question="You find a Code 1 condition while on site for an unrelated call-out and you cannot rectify it today. What is the first action?"
        options={[
          'Make safe immediately by isolating within your competence, then label, notify in writing, escalate and document.',
          'Finish the original call-out first, then raise the finding with the customer on your way out so the visit is not disrupted.',
          'Record the finding on the job sheet and leave it for the next contractor, since it falls outside the scope you were booked for.',
          'Photograph it and re-energise, so the customer is not left without power while they decide whether to authorise the repair.',
        ]}
        correctIndex={0}
        explanation="A Code 1 means danger is present and harm could occur at any moment, so the make-safe step comes first and does not wait for the original job to finish or for the customer to agree. Isolate within competence, label to prevent re-energisation, notify the customer in writing, escalate to your supervisor by phone, and document it all. Being on site for something else is not a defence."
      />

      <SectionRule />

      <ContentEyebrow>Securing against re-energisation</ContentEyebrow>

      <ConceptBlock
        title="The label is for the person who was not there"
        plainEnglish="You isolated it because you know why. The person who finds it tomorrow does not. A lock stops the supply being restored casually; a label tells whoever finds it what happened and who to ring. Neither one works without the other."
        onSite="Write the label as if the reader is a builder who wants their power back and has a screwdriver. Vague wording invites somebody to decide it is probably fine. A clear out-of-service instruction with a date and a name does not."
      >
        <p>What securing the isolation involves:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>A physical lock-off.</strong> The device stays off because it cannot be
            operated, not because somebody was asked not to operate it.
          </li>
          <li>
            <strong>A clear warning notice.</strong> An unambiguous out-of-service instruction not
            to re-energise, carrying the date and the name of the person who isolated it.
          </li>
          <li>
            <strong>A note of what it affects.</strong> On anything other than a single obvious
            circuit, say what is off. The customer cannot plan around a loss they cannot identify.
          </li>
          <li>
            <strong>Equipment removed from service where practical.</strong> A faulty portable item
            is better out of the building than labelled and left where somebody will plug it in.
          </li>
          <li>
            <strong>Access restricted where the danger is exposed.</strong> Where a condition
            cannot be isolated immediately, barriers and supervision keep people away from it until
            it can be.
          </li>
        </ul>
        <p>
          Update the circuit chart at the board too, if the isolation will be in place for any
          length of time. A board where one device is locked off and the schedule does not mention
          it is a board somebody will investigate.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="318e-5-4-check-2"
        question="Why does a make-safe isolation need a physical lock-off as well as a label?"
        options={[
          'Because the label satisfies the regulation and the lock satisfies the insurer, so both are required for the paperwork to be complete.',
          'Because the lock keeps the contacts apart mechanically, which a label cannot do, and prevents the device drifting closed under vibration.',
          'Because a label only informs. A lock removes the possibility of the supply being restored by somebody who reads the label and decides otherwise.',
          'Because the label is for the customer and the lock is for the next electrician, so each audience needs its own measure.',
        ]}
        correctIndex={2}
        explanation="A label tells somebody why the circuit is off and who to contact; it does not stop them switching it on. The lock removes the option. Together they mean that the supply cannot be restored casually and that whoever wants it restored has to speak to the person who took it away."
      />

      <SectionRule />

      <ContentEyebrow>Recording and reporting the condition</ContentEyebrow>

      <ConceptBlock
        title="What you write down is the only thing that survives the visit"
        plainEnglish="The isolation ends when somebody restores it. The record does not. What you wrote down is what the next person works from, what the duty-holder acts on, and what the firm relies on if the condition is ever questioned."
        onSite="Write it before you leave, not from memory at the end of the week. Readings written down an hour later are readings somebody can argue with, and the condition as found cannot be reconstructed once the board is closed up."
      >
        <p>What the record has to carry:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>The condition as found.</strong> What was actually there, described plainly and
            located precisely enough for somebody else to find it.
          </li>
          <li>
            <strong>The measured readings and the verification.</strong> The value, the instrument
            used, and the fact that you repeated the test or checked it against a second
            instrument. Verification under Regulation 641.3 is a comparison of the result against
            the relevant criteria, so record what you compared it with.
          </li>
          <li>
            <strong>The action taken.</strong> What was isolated, where, how it was secured, and
            what is now out of service as a result.
          </li>
          <li>
            <strong>The photographs.</strong> The condition as found, the instrument reading that
            identified it, the fault close up, and the label and isolation you left in place.
          </li>
          <li>
            <strong>The recommendation.</strong> What needs to happen, how urgently, and what
            further investigation is required if the cause is not yet established.
          </li>
        </ul>
        <p>
          Store the photographs on the firm job record rather than a personal phone. Evidence that
          lives on somebody personal device loses weight and creates a data-protection problem of
          its own.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Telling the responsible person, in writing and by the fastest route"
        plainEnglish="The duty-holder cannot act on something they have not been told about. Verbal notice at the door is not enough on a dangerous condition, because it leaves no record and it reaches only the person who happened to be in."
        onSite="Two channels, both the same day. The written notification so there is a record, and the phone call to your supervisor so somebody more senior knows before you have left the street. Email to a supervisor about a Code 1 is too slow."
      >
        <p>Who gets told, and how:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>The duty-holder.</strong> In writing, describing the hazard, the action taken,
            the remedial work recommended and the urgency. On rented property that is the landlord
            or their agent, not the tenant.
          </li>
          <li>
            <strong>Anybody using the affected part.</strong> A tenant, an occupier, a site team —
            told plainly what is off, why, and what not to touch.
          </li>
          <li>
            <strong>Your supervisor.</strong> By phone, immediately, where the finding is a Code 1.
            The escalation exists so that somebody with more authority can make the calls you
            cannot.
          </li>
          <li>
            <strong>Whoever is responsible for the equipment.</strong> Where the defect sits in a
            piece of equipment rather than the fixed installation, the person who maintains that
            equipment needs to know as well.
          </li>
          <li>
            <strong>The next person to attend.</strong> Through the record. The job sheet and the
            report are how the condition survives from your visit to theirs.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 132.16 (Additions and alterations to an installation)"
        clause="No addition or alteration, temporary or permanent, shall be made to an existing installation, unless it has been ascertained that the rating and the condition of any existing equipment, including that of the distributor, will be adequate for the altered circumstances. Furthermore, the earthing and bonding arrangements, if necessary for the protective measure applied for the safety of the addition or alteration, shall be adequate."
        meaning="Anything you do to the installation in the course of making it safe is an alteration in the scope of this regulation, including a temporary one. Fitting a blanking plate, disconnecting a circuit at the board, or leaving a section out of service all change the installation, and the condition of what remains has to be adequate for how the installation now stands. It is also why a make-safe that alters the circuit attracts a certificate for that alteration rather than a job sheet entry alone."
        cite="Source: BS 7671:2018+A4:2026 Regulation 132.16 — full text from published amendment."
      />

      <InlineCheck
        id="318e-5-4-check-3"
        question="You isolate a dangerous circuit and fit a temporary blanking plate at a damaged accessory position. What paperwork follows?"
        options={[
          'Nothing beyond a verbal handover, since no remedial work was carried out and the circuit is now dead.',
          'A full Electrical Installation Certificate for the whole installation, because the isolation changes how it operates.',
          'A condition report with the item coded, which serves as the only record of the make-safe.',
          'A job sheet describing the make-safe, a certificate covering the alteration you actually made, and a written recommendation for the further work.',
        ]}
        correctIndex={3}
        explanation="Make-safe with no remediation is recorded on the job sheet — what was found, what was isolated, why. Fitting the blanking plate is an alteration, so it attracts a certificate for that work. The recommendation for the further investigation or remedial work goes to the customer in writing so the duty-holder has something to act on."
      />

      <SectionRule />

      <ContentEyebrow>What may stay in service</ContentEyebrow>

      <ConceptBlock
        title="The code is the safety judgement, not the measurement"
        plainEnglish="The reading tells you what the circuit is doing. The code tells you how dangerous that is, and the code is what drives everything that follows — whether you isolate, how fast you escalate, and what the duty-holder has to do about it."
        onSite="Two installations can give the same reading and attract different codes, because the code takes account of the context — who uses the installation, where the affected part is, what is connected to it. The measurement is the data; the code is the judgement placed on the data."
      >
        <p>What each code means for the make-safe decision:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Code 1 — Danger Present.</strong> Immediate action required. Isolate, label,
            notify in writing, escalate. Nothing about this waits for the customer or for the end
            of the job.
          </li>
          <li>
            <strong>Code 2 — Potentially Dangerous.</strong> Urgent action required. Whether the
            affected part can remain in service in the meantime is a judgement about the actual
            risk and who is exposed to it, and that judgement is recorded with its reasoning.
          </li>
          <li>
            <strong>Code 3 — Improvement Recommended.</strong> Not dangerous, but worth doing. The
            part stays in service; the recommendation goes on the record.
          </li>
          <li>
            <strong>Further Investigation.</strong> Something is not right and you have not yet
            established what. Say so plainly rather than guessing at a code, and say what
            investigation is needed.
          </li>
        </ul>
        <p>
          Coding itself sits with the person carrying out and signing the inspection. What matters
          at this level is producing the data accurately, recognising the severity well enough to
          make safe without waiting, and escalating so that the coding decision is made by somebody
          competent to make it.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Deciding what comes back on and what does not"
        plainEnglish="Very few faults require the whole installation to stay off. Most of the decision is about drawing a line: this part cannot be energised until it is fixed, that part is unaffected and can carry on. Making that judgement explicitly is part of making safe."
        onSite="Write the line down. If you tell a customer verbally that everything except the garage circuit is fine, that is exactly what they will forget by Thursday. On the job sheet it is a record they can point at."
      >
        <p>How to draw the line:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Anything with a Code 1 condition stays off.</strong> Danger is present. It does
            not go back on because it is inconvenient, and the customer preference does not change
            that.
          </li>
          <li>
            <strong>A Code 2 condition is a judgement about the actual risk.</strong> Potentially
            dangerous means urgent remedial action is required. Whether the affected part can
            remain in service in the meantime depends on what the risk actually is and who is
            exposed to it.
          </li>
          <li>
            <strong>A borderline reading is recorded, not isolated.</strong> A value that passes
            the standard but sits well away from what a healthy circuit gives is a developing fault
            to flag and monitor, not a reason to take the circuit out of service.
          </li>
          <li>
            <strong>Unaffected circuits stay on.</strong> Once you are satisfied they do not share
            the failure, leaving them energised is the right answer — over-isolating loses the
            customer trust you need for the parts that genuinely have to stay off.
          </li>
          <li>
            <strong>Say so explicitly.</strong> What is off, what is on, and what has to happen
            before the rest comes back.
          </li>
        </ul>
        <p>
          The line also has to survive you leaving. Somebody will ask the tenant, the site manager
          or the next contractor whether the rest of the installation is safe to use, and the
          answer needs to be written down somewhere they can find it rather than held in your
          memory. A short paragraph on the job sheet — this circuit is isolated pending remedial
          work, the remainder of the installation was tested and remains in service — does that
          job.
        </p>
        <p>
          And be honest about the limits of what you checked. If you isolated one circuit and did
          not test the rest, say that rather than implying the whole installation has been given a
          clean bill of health. Overstating what you verified is how a make-safe visit turns into
          a claim that the firm certified something it never looked at.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Leaving a circuit energised because the customer needs it"
        whatHappens={
          <>
            A commercial kitchen circuit shows a loop impedance well above the maximum for its
            protective device. It is four o clock on a Friday, the kitchen is trading, and the
            customer says they cannot lose it until Monday. The circuit stays on with a verbal
            agreement to return, and the job sheet says the customer was advised. On Sunday a fault
            develops on a piece of equipment on that circuit and the protective device does not
            clear it in time.
          </>
        }
        doInstead={
          <>
            Make safe first and have the commercial conversation afterwards. Isolate as narrowly as
            the fault allows so that as little as possible goes out of service, then escalate
            immediately so somebody with the authority can organise a temporary arrangement. A
            customer commercial preference does not override the duty not to leave a known danger
            in service, and a job sheet note saying they were advised is not a substitute for
            switching it off.
          </>
        }
      />

      <CommonMistake
        title="Making safe properly and then recording almost none of it"
        whatHappens={
          <>
            The isolation is clean, the lock-off is on, the label is clear. But the job sheet says
            only fault found, circuit isolated, customer advised. Three weeks later somebody cuts
            the lock off and restores the supply. Nobody can establish what the original condition
            was, what reading it gave, what the recommendation actually said, or whether the
            customer was told in writing. The firm has done the difficult part of the job and kept
            none of the evidence for it.
          </>
        }
        doInstead={
          <>
            Record the condition as found, the readings with the instrument used, the verification,
            the extent of the isolation, the photographs, the written notification and the
            recommendation. Regulation 651.4 requires the damage, deterioration, defect or
            dangerous condition to be recorded in a report; the rest is what makes that record
            usable by the person who picks it up next.
          </>
        }
      />

      <Scenario
        title="Merthyr Tydfil — a rented terrace where the landlord will not authorise the work"
        situation={
          <>
            You are at a rented terrace in Merthyr Tydfil to look at a socket that has stopped
            working. You find the socket is dead because the circuit protective conductor is
            disconnected at a junction box in the ceiling void, and the same junction box shows
            heat damage at one terminal. The tenant is at home with a small child. The letting
            agent, reached by phone, says the landlord has already spent money on the property this
            year and will not authorise anything beyond replacing the socket front.
          </>
        }
        whatToDo={
          <>
            Deal with the danger before the conversation about money. Verify what you have found —
            repeat the continuity test, confirm the reading, and satisfy yourself the protective
            conductor really is open rather than the instrument or the lead. Then make safe:
            isolate that final circuit at the board, lock it off, and fit a warning notice with a
            clear out-of-service instruction, the date and your name. Explain to the tenant in
            plain words what is off, why, and that they must not attempt to switch it back on.
            <br />
            <br />
            Photograph the junction box as found, the heat damage at the terminal, the instrument
            reading, and the locked-off device with its notice. Record the condition on the job
            sheet with the location precise enough for the next person to find it, the readings,
            the verification and the extent of the isolation.
            <br />
            <br />
            Notify in writing rather than only by phone. The duty-holder here is the landlord, via
            the agent. Set out the hazard, the action you have taken, the remedial work you
            recommend and the urgency. Escalate to your supervisor by phone the same afternoon —
            this is a rented property, there is heat damage and a disconnected protective
            conductor, and it needs somebody senior aware before the day ends.
            <br />
            <br />
            Then document the refusal properly. Record the recommendation in specific terms, the
            agent response and the date, the implications you briefed them on, and your position:
            the affected circuit remains isolated and is not to be re-energised until the remedial
            work is carried out. Replacing the socket front does not address the fault and does not
            justify restoring the supply.
          </>
        }
        whyItMatters={
          <>
            The refusal does not transfer the risk. A client can decline to pay for work, and that
            decision is theirs to make and yours to record — but they cannot require the firm to
            leave a dangerous condition in service, and the firm has its own duty if it walks away
            from a known danger. Isolating and documenting is what lets you do both things at once:
            respect the client decision about their money, and refuse to let that decision put a
            tenant and a child at risk.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'A fault you cannot correct today changes your duty from rectifying it to making sure it cannot cause harm before somebody else does.',
          'The path is verify, identify the failure mode, make safe, document, then rectify within competence or escalate. A Code 1 triggers it regardless of the original call-out scope.',
          'Isolate as narrowly as the fault allows and as widely as it requires — at a point you can physically secure, having accounted for any other source of supply, and proved dead.',
          'Where the isolation you need is beyond your competence, restrict access, escalate immediately and stay with the danger until somebody who can isolate it arrives.',
          'Secure the isolation with a lock-off and a clear out-of-service notice carrying the date and the name of the person who isolated it. A label informs; only the lock prevents.',
          'Record the condition as found, the readings and verification, the extent of the isolation, the photographs and the recommendation. Regulation 651.4 makes the record a requirement, not a choice.',
          'Notify the duty-holder in writing and escalate to your supervisor by phone. Anybody using the affected part is told plainly what is off and what not to touch.',
          'Make-safe with no remediation is a job sheet entry plus a certificate for anything you actually altered, plus a written recommendation. A client refusal is documented — and never extends to leaving a Code 1 condition in service.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="Making safe when the fault cannot wait — knowledge check" />
    </div>
  );
}
