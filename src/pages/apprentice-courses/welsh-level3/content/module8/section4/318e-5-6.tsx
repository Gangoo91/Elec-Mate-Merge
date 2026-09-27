/**
 * Unit 318E · Criterion 5.6 — How to provide clear and accurate information to
 * relevant people about the electrical system and equipment: hand over to the
 * customer/client, any variations to the original system and/or its equipment,
 * and customer/client acceptance of the work.
 *
 * Approach: three parts, each given its own weight. The handover is taught as
 * an event with an audience wider than the person paying. Variations are taught
 * as a thing with a definition — a departure from the original scope or
 * equipment — that has to be recorded and agreed before the work is done, not
 * mentioned in passing afterwards. Acceptance is taught as what the customer
 * signature does and does not mean.
 *
 * Sources used (existing verified teaching in the English course):
 *   level3/module4/section5/Sub5.tsx — relevant persons, verbal handover
 *     content, certificate selection, customer signature as receipt of
 *     hand-back, the three evidential layers, the wider record pack, retention.
 *   level3/module4/section4/Sub5.tsx — variation orders and their content set,
 *     authorisation trails, the three-part plain-English brief, Regulation
 *     132.13 documentation, circuit chart updates under Regulation 514.9,
 *     documenting a declined recommendation.
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
    question: 'The relevant people who need information at the end of a job are:',
    options: [
      'The duty-holder, the original designer where the design changed, Building Control for notifiable work, the firm own records, and the next periodic inspector.',
      'Only the person who paid the invoice, since the duty is about closing out the transaction and nobody else has a claim on the record.',
      'Only the manufacturer of any equipment fitted, so that the installation is registered against the product warranty.',
      'Only the firm accountant, because the documentary trail exists to support the invoice and goes nowhere else.',
    ],
    correctAnswer: 0,
    explanation:
      'Relevant people is broader than the customer. The duty-holder receives the certificate and the hand-back. The original designer is told where the design changed. Building Control is notified through the scheme for notifiable work. The firm files its own copy. The next inspector is served by the record left behind.',
  },
  {
    id: 2,
    question: 'A variation order needs to be raised:',
    options: [
      'Whenever the work scope departs from the original quote or instruction, at the point you realise it has.',
      'Only at the very end of the job, once the final figure is known and can be presented with the invoice.',
      'Only on commercial contracts, since a domestic customer is covered by the original quote whatever happens on site.',
      'Never on a repair, because restoring an existing circuit is not an alteration to a design and so no scope change exists.',
    ],
    correctAnswer: 0,
    explanation:
      'A variation is needed the moment the scope departs from what was quoted or instructed — a different fault from the one expected, additional work the original price did not cover, different equipment from what was specified. It is raised at the point you find out, not at the end, because the whole purpose is to get agreement before the work is carried out.',
  },
  {
    id: 3,
    question: 'The standard content of a variation record is:',
    options: [
      'The original scope and price, what changed and why, the new scope and price, the customer authorisation with date and medium, and any impact on the schedule.',
      'The new price alone, since the customer already knows what was originally quoted and does not need it repeating.',
      'A note on the invoice describing the additional work, which the customer can query if they disagree with it.',
      'A photograph of the additional work carried out, which evidences that it was needed and therefore justifies the charge.',
    ],
    correctAnswer: 0,
    explanation:
      'A variation record states where you started, what changed and why, where you have ended up, and the customer agreement to that — captured with the date, time and medium of the authorisation. Schedule impact goes on where the additional work pushes the job beyond its original slot.',
  },
  {
    id: 4,
    question:
      'A customer authorises extra work verbally on site but will not sign anything. The correct response is:',
    options: [
      'Turn the verbal agreement into a written trail — send a summary stating the work, the additional cost and the new total, and ask them to reply confirming it.',
      'Refuse the work outright, since without a physically signed variation form there is no valid authorisation of any kind.',
      'Carry out the work on the strength of the verbal agreement alone and invoice afterwards, as a spoken agreement needs no written trail.',
      'Add the work to the invoice without raising it again, and let the customer query it if they notice the difference.',
    ],
    correctAnswer: 0,
    explanation:
      'A verbal yes is a real agreement but leaves nothing behind. Send a summary naming the work, the additional cost and the revised total, and ask for an explicit reply. In-person authorisation plus a written summary plus the customer reply is enough to invoice and to defend the charge. Keep it on the firm phone or business email rather than a personal account.',
  },
  {
    id: 5,
    question: 'The customer signature on the certificate at hand-back is:',
    options: [
      'A receipt acknowledging they have received the certificate and had the work demonstrated — not approval of the technical work itself.',
      'Approval of the technical work, transferring responsibility for its correctness from the contractor to the customer.',
      'A legal requirement without which the certificate is invalid and the work is unrecorded.',
      'Confirmation that they have read and understood every test result on the schedule.',
    ],
    correctAnswer: 0,
    explanation:
      'The customer signature is a record of receipt at hand-back. The evidential weight of the certificate comes from the contractor signed declarations. If a customer declines to sign, the certificate remains valid — note that they declined and email a copy to the recorded address.',
  },
  {
    id: 6,
    question: 'A three-part plain-English customer brief covers:',
    options: [
      'What was happening, what we did, and what to watch for — backed by the same three points in writing.',
      'The full technical detail, including the measured values and the regulation numbers, so the customer can see the job was thorough.',
      'As little as possible, since the customer will not understand the wiring and explaining it only invites more questions.',
      'A pointer to the certificate, which already records the fault and the results and therefore needs no verbal explanation.',
    ],
    correctAnswer: 0,
    explanation:
      'Three parts, in the customer own language: what was happening, what we did about it, and what to watch for. Then the same three points in writing on the job summary or the certificate so they still have it a fortnight later. Plain English means naming the breaker that protects the kitchen, not quoting a device type and a measured value.',
  },
  {
    id: 7,
    question: 'If the circuit identification, residual current device coverage or device rating has changed, you should:',
    options: [
      'Update the circuit chart at or near the consumer unit, so the labelling describes the installation as it now stands.',
      'Leave the existing chart in place, since the certificate records the change and the chart is only an informal aid.',
      'Remove the chart entirely, because an out-of-date chart is more misleading than no chart at all.',
      'Send the revised chart to the distributor for their supply records rather than displaying it at the board.',
    ],
    correctAnswer: 0,
    explanation:
      'The chart at or near the consumer unit is the immediate reference for anybody who opens the board. If the work changed circuit identification, residual current device coverage or a device rating, the chart is updated to match. Leaving a stale chart in place means the next person to attend is working from information that is no longer true.',
  },
  {
    id: 8,
    question:
      'A customer later claims the work was wrong. Which three layers of the record defend the position?',
    options: [
      'The measured test results, the signed competence declarations, and the customer signed receipt of hand-back.',
      'The invoice, the payment record and the customer bank confirmation that the job was paid for.',
      'The manufacturer data sheet, the product warranty and the supplier delivery note for the equipment fitted.',
      'The original quotation, the appointment diary entry and the operative timesheet for the day.',
    ],
    correctAnswer: 0,
    explanation:
      'The test results evidence that the circuit was sound at hand-back, so a later recurrence points to a cause arising after you left. The signed declarations evidence competence. The customer receipt evidences acceptance. Together they protect both parties rather than only the firm.',
  },
];

const faqs = [
  {
    question: 'What is the difference between a verbal brief and a written one — do I need both?',
    answer:
      'Both. The verbal brief happens with the customer in front of you at the end of the visit, in plain English, and it is what makes them feel informed. The written brief captures the same content on the job summary or the certificate for their records and for the firm audit trail. Verbal alone is forgotten within hours. Written alone feels like being handed a form. The combination is the professional standard.',
  },
  {
    question: 'Can a text reply really count as authorisation for a variation?',
    answer:
      'In most domestic and small commercial contexts, yes. The test is whether the customer made an informed agreement. A clear message naming the work, the additional cost and the revised total, followed by an explicit reply confirming it, is contractually sound. Larger commercial contracts may require a signed form under their own terms. Either way, keep the exchange on the firm phone or business email — a personal messaging account loses evidential weight.',
  },
  {
    question: 'How do I price additional work mid-job without sounding like I am gouging?',
    answer:
      'Be honest, be specific, and do it before the work rather than after. Explain what you found, why the original price does not cover it, what your best estimate is, and that anything beyond that will be quoted separately before it is done. Then let them say yes or no. Quoting before removes the perception; quoting after creates the dispute.',
  },
  {
    question: 'The customer declines work I have recommended. What goes on the record?',
    answer:
      'Four things. The recommendation, in specific terms rather than a vague suggestion. Their response and the date. The implications you briefed them on, including the risk in plain words. And your decision and its justification — what was carried out, what the installation state is at hand-back, and that the customer has chosen not to proceed with the rest. Where the residual risk is immediately dangerous, the firm does not leave the installation in service on the customer preference alone.',
  },
];

export default function Lesson318e_5_6() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'The criterion names three things — the handover, any variations, and the customer acceptance — and each of them is a separate piece of information going to a separate purpose.',
          'The relevant people are wider than the person paying: the duty-holder, the designer where the design changed, Building Control for notifiable work, the firm own records, and the next inspector.',
          'A variation is any departure from the original scope or the originally specified equipment. It is recorded and agreed before the work is carried out, not mentioned in passing on the invoice.',
          'The handover is verbal and written together — three plain-English parts spoken at the door, the same three points in writing, plus the documentation pack the customer keeps.',
          'The customer signature is a receipt of hand-back, not approval of the technical work. The evidential weight sits in the contractor signed declarations and the measured results behind them.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Identify the relevant people who need information at the end of a job, and what each of them needs from the record.',
          'Deliver a three-part plain-English handover brief and back it with a written summary and the documentation pack.',
          'Define a variation and recognise the point at which the work has departed from the original scope or specified equipment.',
          'Record a variation with its original scope, the change and its reason, the revised scope, and a defensible authorisation trail.',
          'Explain what customer acceptance at hand-back means, what it does not mean, and what to do when a customer declines to sign or declines recommended work.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Three parts to one conversation</ContentEyebrow>

      <ConceptBlock
        title="Handover, variations and acceptance are three separate obligations"
        plainEnglish="They usually happen within ten minutes of each other at the end of a visit, which makes it easy to treat them as one thing. They are not. Each answers a different question and each fails in a different way when it is skipped."
        onSite="The tell is what the customer says a fortnight later. A handover failure sounds like where is the switch for the garage. A variation failure sounds like I never agreed to that price. An acceptance failure sounds like nobody ever told me the job was finished."
      >
        <p>What each part is for:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Handover.</strong> Giving the relevant people accurate information about the
            system and the equipment — what is there, how it works, how to use it safely, and what
            documentation they now hold.
          </li>
          <li>
            <strong>Variations.</strong> Recording and agreeing anything that departed from the
            original system or its equipment, so that what was installed and what was agreed are
            the same thing on paper as well as on site.
          </li>
          <li>
            <strong>Acceptance.</strong> Establishing, on the record, that the work has been
            handed over and received — with a clear understanding of what the customer is
            acknowledging and what they are not.
          </li>
        </ul>
        <p>
          All three are about accuracy rather than volume. A short, accurate handover beats a long
          vague one, a single-line variation that both parties agreed beats a paragraph nobody
          signed, and a recorded acceptance beats an assumed one.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Handing over — and to whom</ContentEyebrow>

      <ConceptBlock
        title="The audience is wider than the person writing the cheque"
        plainEnglish="It is easy to think of handover as one conversation with one person. In practice the information goes to several people, at different times, for different reasons — and the person paying is only one of them."
        onSite="On rented property the duty-holder is the landlord or their agent, not the tenant. The tenant still needs the safety-relevant part of the brief, because they are the one who will be in the building when something trips."
      >
        <p>Who needs what:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>The duty-holder.</strong> The certificate, the schedules and the hand-back
            brief. They carry the ongoing responsibility for the installation, so they get the
            complete pack.
          </li>
          <li>
            <strong>The person who actually uses the installation.</strong> Where the board is,
            what the labels mean, which button tests what, what to do if something trips, and when
            to call.
          </li>
          <li>
            <strong>The original designer.</strong> Told where the design changed, as a courtesy
            and so their record matches what exists.
          </li>
          <li>
            <strong>Building Control.</strong> Notified through the competent person scheme for
            notifiable work, with the scheme issuing the compliance certificate to the customer.
          </li>
          <li>
            <strong>The firm own records.</strong> The file copy, the photographs, the
            correspondence, the notification reference.
          </li>
          <li>
            <strong>The next periodic inspector.</strong> Served entirely by the record you left.
            No documentary closure means they start from nothing.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="The three-part brief, and the pack that backs it"
        plainEnglish="The spoken handover has three parts and takes a couple of minutes. What was happening, what we did, what to watch for — in the customer own language, with no device types and no measured values."
        onSite="Walk them to the board. Point at the thing you changed. Demonstrate the test button and say how often to use it. Then hand over the documentation and say what is in it. Customers who feel informed do not ring you at seven on a Sunday."
      >
        <p>The brief:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>What was happening.</strong> The symptom in their words, and the cause in plain
            terms — the breaker that protects your kitchen was tripping because of a damaged
            connection in the ceiling.
          </li>
          <li>
            <strong>What we did.</strong> The work, plainly. We replaced the connection, tested the
            whole circuit and confirmed the problem is gone.
          </li>
          <li>
            <strong>What to watch for.</strong> One or two specific things, with a timescale. If it
            trips again in the next month, even once, ring us.
          </li>
        </ul>
        <p>And the pack that goes with it:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>The certificate.</strong> With the test results, the instrument identification,
            the signatory and the date.
          </li>
          <li>
            <strong>An updated circuit chart where anything changed.</strong> If the work altered
            circuit identification, residual current device coverage or a device rating, the chart
            at or near the board is updated to match.
          </li>
          <li>
            <strong>The written brief.</strong> The same three points, one line each, on the job
            summary they keep.
          </li>
          <li>
            <strong>The next inspection date and any safety observations.</strong> Including
            anything you noticed but did not fix.
          </li>
          <li>
            <strong>Manufacturer literature for anything fitted.</strong> The user information for
            new devices, so the customer has the operating detail and the warranty terms.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 132.16 (Additions and alterations to an installation)"
        clause="No addition or alteration, temporary or permanent, shall be made to an existing installation, unless it has been ascertained that the rating and the condition of any existing equipment, including that of the distributor, will be adequate for the altered circumstances. Furthermore, the earthing and bonding arrangements, if necessary for the protective measure applied for the safety of the addition or alteration, shall be adequate."
        meaning="The documentation handed to the user — the certificate, the updated circuit chart where something changed, the written brief, the literature for any new device — is the evidence that the rating and condition of the existing equipment was ascertained to be adequate for the altered circumstances. Without that pack the user cannot discharge their ongoing maintenance duty, and the next contractor cannot discharge this same duty the next time the installation is altered."
        cite="Source: BS 7671:2018+A4:2026 Regulation 132.16 — full text from published amendment."
      />

      <InlineCheck
        id="318e-5-6-check-1"
        question="You have replaced a device and the residual current device coverage of one circuit has changed as a result. What follows at handover?"
        options={[
          'Update the circuit chart at or near the consumer unit so the labelling matches the installation as it now stands, and include a copy in the pack.',
          'Leave the existing chart alone — the certificate records the change, so the chart does not need to agree with it.',
          'Remove the chart from the board, since a chart that no longer matches is more misleading than having none.',
          'Send the revised chart to the distributor for the supply records rather than displaying it at the board.',
        ]}
        correctIndex={0}
        explanation="The chart at the board is the immediate reference for anybody who opens it — the customer in an emergency, the next electrician fault-finding. If circuit identification, residual current device coverage or a device rating changed, the chart is updated to match and a copy goes in the handover pack as a backup."
      />

      <SectionRule />

      <ContentEyebrow>Variations — what they are and why they get recorded</ContentEyebrow>

      <ConceptBlock
        title="A variation is a departure from what was agreed, not a detail"
        plainEnglish="A variation is any point at which the work, the system or its equipment departs from what was originally quoted, instructed or specified. It might be more work, different work, or different equipment. What makes it a variation is the departure, not the size of it."
        onSite="The moment you realise the job is not the job you priced, you have a variation on your hands. That is the moment to stop and have the conversation — not at the end when the customer is being asked to pay for something they never heard about."
      >
        <p>What counts:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Scope that grew.</strong> The quote covered one tripping device; the actual
            cause is a high-resistance joint upstream that also has to be re-made.
          </li>
          <li>
            <strong>Scope that changed.</strong> The fault is not the fault that was described, so
            the work being carried out is different work at a different price.
          </li>
          <li>
            <strong>Equipment that changed.</strong> Something other than what was specified is
            fitted — a different make, a different type, a different rating. The customer is
            getting a different system from the one described to them.
          </li>
          <li>
            <strong>Work that crossed a boundary.</strong> A repair that turns into a new circuit
            is not just more expensive; it changes what certificate is issued and whether the work
            is notifiable.
          </li>
          <li>
            <strong>Time that moved.</strong> Where the change pushes the job past the agreed slot,
            that is part of the variation too, because the customer may have arranged their day
            around it.
          </li>
        </ul>
        <p>
          Skipping the record has compounding costs. The customer can dispute the extra charge
          because there is no authority for it. They can claim work was carried out that they never
          asked for, even where it was necessary. The scope becomes ambiguous in any insurance
          discussion. A scheme audit finds a quote and an invoice that do not match. And the
          relationship, which was the point of doing the job well, breaks over money rather than
          workmanship.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Recording and agreeing it — five things and a reply"
        plainEnglish="The record itself is short. What makes it work is that it is written before the work is done and that the customer says yes to it in a form that still exists tomorrow."
        onSite="A clear message and an explicit reply is enough on most domestic work. Vague does not survive: extra work needed, is that OK is not a variation record. Name the work, name the cost, name the new total, ask for a yes."
      >
        <p>The content set:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Original scope and price.</strong> What was quoted, in the words it was quoted
            in.
          </li>
          <li>
            <strong>What changed and why.</strong> What you found, and why it means the original
            scope does not do the job.
          </li>
          <li>
            <strong>New scope and price.</strong> The additional work and the revised total, so
            the customer is agreeing to a figure rather than to an open end.
          </li>
          <li>
            <strong>The authorisation.</strong> A signature, a text reply or an email confirming
            it, with the date, the time and the medium recorded.
          </li>
          <li>
            <strong>Schedule impact.</strong> Where the change pushes the job beyond its slot,
            re-confirm the timing with the customer as part of the same conversation.
          </li>
        </ul>
        <p>
          Where a variation changes the equipment rather than the amount of work, say so explicitly
          in the record and at handover. The customer ends up with a system that differs from the
          one they were originally described, and the person who inspects it next will be comparing
          what is there against what the documentation says should be there.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="318e-5-6-check-2"
        question="Mid-job you find the real cause of the fault is upstream of the work you quoted for, and fixing it will cost more. When do you raise it?"
        options={[
          'At the end, with the invoice, so the customer sees the final figure rather than an estimate that might change.',
          'At the moment you realise, before carrying out the additional work, with the revised scope and price and an explicit request for authorisation.',
          'Not at all on a domestic job, since the original quote covers whatever the fault turns out to need.',
          'After carrying out the work but before leaving site, so the customer can see the result before being asked to agree to the cost.',
        ]}
        correctIndex={1}
        explanation="The purpose of the variation is to get agreement before the work is done. Raised at the end, it is a bill the customer never agreed to. Raised at the point you find out — with what changed, why, the additional cost and the revised total — it is a decision the customer gets to make, and a record that protects both sides."
      />

      <SectionRule />

      <ContentEyebrow>Acceptance — what the signature actually means</ContentEyebrow>

      <ConceptBlock
        title="A receipt of hand-back, not a sign-off on the engineering"
        plainEnglish="Customers sometimes hesitate at the signature because they think they are being asked to approve work they are not qualified to judge. They are not. The signature records that they received the certificate and had the work handed over."
        onSite="Thirty seconds of explanation resolves nearly every refusal. You are not signing to say the work is right — that is what my declarations on the certificate are for. You are signing to say you have received this and I have shown you what was done."
      >
        <p>What acceptance does and does not do:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>It records receipt.</strong> The customer has the certificate and the pack, and
            the work has been demonstrated to them.
          </li>
          <li>
            <strong>It does not transfer responsibility.</strong> The technical correctness of the
            work rests on the contractor signed declarations, not on the customer signature.
          </li>
          <li>
            <strong>It is not a condition of validity.</strong> If the customer declines to sign,
            the certificate is still valid. Note that they declined at hand-back and email a copy
            to their recorded address.
          </li>
          <li>
            <strong>It works alongside the other evidence.</strong> The measured results, the
            signed declarations and the receipt are three layers, and they defend the customer
            position as much as the firm.
          </li>
        </ul>
        <p>
          Keep the signed quotation, any signed advisory where a recommendation was declined, and
          the hand-back sign-off together with the certificate on the job record. That
          correspondence is the part of the file that answers questions about what was agreed
          rather than what was measured.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Reg 651.4"
        clause="Details of any damage, deterioration, defects or dangerous conditions shall be recorded in a report."
        meaning="Accurate information to relevant people includes the things you found and did not fix. Anything you noticed alongside the work you were there for — a borderline reading on another circuit, a missing label at the main earthing terminal, deterioration outside your scope — belongs on the record that the customer keeps. It is the regulation that turns noticed it but it was not my job into recorded it on the customer file."
        cite="Source: BS 7671:2018+A4:2026 — Reg 651.4."
      />

      <ConceptBlock
        title="When the customer declines — recording a no as carefully as a yes"
        plainEnglish="Acceptance is not always acceptance of everything. A customer may take the work you did and decline the work you recommended. That decision is theirs, and your job is to record it accurately rather than argue with it."
        onSite="Write the refusal in the customer own terms as well as yours. Customer declined on cost grounds and requested the like-for-like repair only is a record. Customer did not want it done is not."
      >
        <p>The pattern:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>The recommendation.</strong> Described specifically enough that somebody else
            could act on it.
          </li>
          <li>
            <strong>The response.</strong> What the customer said and the date they said it.
          </li>
          <li>
            <strong>The implications briefed.</strong> What you told them the risk was, in plain
            words, so the record shows the decision was informed.
          </li>
          <li>
            <strong>The decision and its justification.</strong> What was carried out, what state
            the installation is in at hand-back, and that the customer has chosen not to proceed
            with the rest.
          </li>
          <li>
            <strong>Escalation where the residual risk demands it.</strong> Where leaving it in
            service would mean leaving danger present, the firm does not do so on customer
            preference alone — make safe, document and escalate.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The record that outlives the visit</ContentEyebrow>

      <ConceptBlock
        title="Accurate information means the right document, kept long enough to be found"
        plainEnglish="Information given at the door lasts a fortnight. Information on the record lasts as long as the installation does. Which document the work attracts, and how long the firm keeps its copy, is part of providing accurate information rather than an administrative afterthought."
        onSite="Choosing the wrong form does not stop the work being recorded, but it muddles the trail. Somebody reading a new-installation certificate against a like-for-like device swap will go looking for a new circuit that was never installed, and that costs them time and the customer money."
      >
        <p>Getting the document right:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>New installations, new circuits and significant additions.</strong> The
            Electrical Installation Certificate, with its three signature declarations and the
            schedules behind it.
          </li>
          <li>
            <strong>Alterations and additions that do not form a new circuit.</strong> The Minor
            Works Certificate — accessory or device replacement, a single added point, a
            termination repair. Most repair work sits here.
          </li>
          <li>
            <strong>Periodic inspection of an existing installation.</strong> The condition report,
            with coded observations. It is a snapshot of condition, not a certificate of work done.
          </li>
          <li>
            <strong>The wider record pack alongside it.</strong> The job sheet narrative,
            photographs before and after, sketches of cable routes where relevant, the customer
            correspondence including the signed quotation and any signed advisory, and the
            manufacturer documentation for anything fitted.
          </li>
          <li>
            <strong>Retention.</strong> The contractor copy is kept well beyond the end of the job
            — six years is the common baseline and professional indemnity cover usually requires
            longer. Practically, cloud storage has made keeping it for the life of the installation
            the sensible default.
          </li>
        </ul>
        <p>
          A variation belongs in this pack too. The message that changed the scope, the reply that
          authorised it and the revised figure sit with the certificate, because together they are
          what explains why the installation is the way it is rather than the way it was quoted.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="318e-5-6-check-3"
        question="A variation changed the equipment fitted from what the quote specified. Where does that show up afterwards?"
        options={[
          'Only in the price, since the customer agreed the revised figure and the equipment detail is a technical matter for the contractor.',
          'Only on the manufacturer warranty registration, which records what was actually installed.',
          'Nowhere in particular — once the customer has paid the revised figure the original specification has been superseded and needs no record.',
          'On the certificate, which records what was actually fitted, in the handover brief, and in the variation record that shows it was agreed.',
        ]}
        correctIndex={3}
        explanation="Three places have to tell the same story: the certificate records what is actually there, the handover brief tells the customer what they have got and how it differs from what was described, and the variation record shows the change was agreed rather than assumed. Anyone inspecting the installation later compares what is present against what the documentation says should be present."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Mentioning the variation instead of recording it"
        whatHappens={
          <>
            Part way through a quoted repair you find the real cause sits upstream. You tell the
            customer at the time — they are stood next to you, they nod, you crack on. The invoice
            goes out at nearly double the quote. The customer remembers a conversation about the
            fault being awkward, not an agreement to a new figure. There is nothing in writing, so
            there is nothing to point at, and the firm either writes off the difference or spends
            three weeks arguing over it.
          </>
        }
        doInstead={
          <>
            Stop at the point you realise, and put it in writing before the work is done. Name the
            additional work, the additional cost and the revised total, and ask for an explicit
            reply. Three minutes of conversation and one minute of typing converts a nod into a
            record. Then carry on.
          </>
        }
      />

      <CommonMistake
        title="Handing over the certificate and calling that the handover"
        whatHappens={
          <>
            The paperwork is perfect. The certificate is complete, the schedules are filled in, the
            pack is emailed the same afternoon. But the customer was handed it at the door with
            all done and nothing else. Two weeks later they ring because a circuit has tripped and
            they cannot work out which device to reset. They never noticed the chart inside the
            board door, they do not know which button tests what, and they are waiting for a
            compliance certificate they were never told would arrive separately.
          </>
        }
        doInstead={
          <>
            Add two minutes of spoken handover to the paperwork. Board and isolator location, the
            test button and how often to use it, what the labels mean, anything new, when the next
            inspection is due, and what to ring about. Then the same points in writing on the job
            summary. The paperwork is the record; the brief is what the customer actually uses.
          </>
        }
      />

      <Scenario
        title="Wrexham — a board change that turned into a different board"
        situation={
          <>
            You quoted a domestic board change at a terraced house in Wrexham on the basis of what
            was described over the phone. On site you find the existing arrangement needs two more
            ways than the unit you priced, and one circuit will need a different type of protective
            device from the one specified in the quote. The customer is at work; their partner is
            in and says to carry on with whatever is needed. The job will now run an hour past the
            slot you booked, and the customer had arranged to be home for the handover.
          </>
        }
        whatToDo={
          <>
            Treat this as a variation before it is anything else. Two things have departed from
            what was agreed: the unit itself and the type of device on one circuit. Neither is a
            detail — the customer is getting different equipment from the equipment they were
            quoted for. Write it down: the original scope and price, what you found and why the
            original unit will not do, the revised scope and total, and the change of device type
            on that circuit stated explicitly rather than buried in a price.
            <br />
            <br />
            Get authorisation from the right person. A partner saying carry on is not the customer
            who signed the quote. Send the summary to the customer by message or email, naming the
            work, the additional cost, the revised total and the change of device type, and ask
            for an explicit reply. Note the date, the time and the medium when it comes back.
            <br />
            <br />
            Raise the schedule impact in the same message. They arranged to be home for the
            handover and the job now runs an hour longer — agree the new time rather than
            discovering at five o clock that they have gone out.
            <br />
            <br />
            Then hand over properly to the person accepting the work. Three-part brief: what the
            old board could not do, what has been fitted and why it differs from what was quoted,
            and what to watch for. Walk them to the board, demonstrate the test button, and show
            them the updated circuit chart — it has to reflect the new circuit identification and
            device arrangement rather than the old one. Hand over the certificate, both schedules,
            the manuals for what was fitted, the written brief and the next inspection date. Take
            the receipt signature, explaining that it records hand-back rather than approval of
            the work. File the variation, the authorisation reply, the photographs and the
            certificate together on the job record.
          </>
        }
        whyItMatters={
          <>
            The equipment change is the part that gets missed. Extra ways read as a price
            adjustment, and a different device type reads as a technical detail, so both end up
            mentioned in passing rather than recorded. But the customer now has a system that
            differs from the one they were described, the certificate has to say what was actually
            fitted, and the person inspecting it in ten years will compare what is there against
            what the documentation says. Recording the variation and handing over accurately is
            what keeps those three things telling the same story.
          </>
        }
      />

      <SectionRule />

      <FAQ items={faqs} />

      <SectionRule />

      <KeyTakeaways
        points={[
          'The criterion has three parts — handover, variations, acceptance — and each of them fails differently when it is skipped.',
          'Relevant people are wider than the customer: the duty-holder, the person who uses the installation, the designer where the design changed, Building Control for notifiable work, the firm records and the next inspector.',
          'The handover is verbal and written together — what was happening, what we did, what to watch for — plus the pack, the updated circuit chart where anything changed, and the next inspection date.',
          'A variation is any departure from the original scope or the originally specified equipment. Different equipment is a variation even where the price does not move much.',
          'Record the variation before the work is done: original scope and price, what changed and why, revised scope and price, the authorisation with date and medium, and any schedule impact.',
          'Vague authorisation is not authorisation. Name the work, name the cost, name the revised total, and get an explicit reply on the firm phone or business email.',
          'The customer signature at hand-back is a receipt, not approval of the engineering. If they decline to sign, note it and email the certificate — the contractor declarations carry the evidential weight.',
          'Record a declined recommendation as carefully as an accepted one: the recommendation, the response and date, the implications briefed, and the position at hand-back.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="Handover, variations and acceptance — knowledge check" />
    </div>
  );
}
