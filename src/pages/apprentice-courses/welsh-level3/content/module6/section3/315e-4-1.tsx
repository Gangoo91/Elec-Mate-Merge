/**
 * Unit 315E · Criterion 4.1 — Industry standards and regulations
 *
 * This criterion shares its title with the earlier one on standards and
 * regulations, but it sits under a different outcome — the procedures and
 * documentation for COMPLETING work. The angle here is therefore the
 * standards and regulations that govern certification, notification and
 * handover: who has to be told, what document has to be issued, who is
 * allowed to sign it, and what happens when the paperwork is wrong.
 *
 * Installation method, cable selection and the statutory duties that shape
 * how a wiring system goes in are covered by the separate criterion on
 * standards for installing wiring systems and are deliberately not repeated.
 *
 * Sources used (existing verified teaching):
 *   level2/module3/section1/Sub2.tsx — non-statutory regulations and guidance
 *   level2/module3/section1/Sub1.tsx — statutory regulations
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
    question:
      'A homeowner hires an unregistered handyman to install a new shower circuit and a new consumer unit. The work is competent and electrically safe. Has any statutory requirement been breached?',
    options: [
      'Yes — Building Regulations Part P. New circuits and consumer unit replacements in dwellings are notifiable, so the work had to be either self-certified through a competent person scheme or notified to Building Control before starting. Safe work does not excuse the notification breach.',
      'No — the technical duties are satisfied because the work was carried out competently and safely, and Part P only bites where an installation is actually dangerous.',
      'No — notification is the responsibility of the householder rather than the person carrying out the work, so no breach attaches to the handyman.',
      'Yes — but only the competence requirement, because the notification regime applies to registered contractors and not to private individuals.',
    ],
    correctAnswer: 0,
    explanation:
      'Notification is a separate offence from the technical safety of the work. Even a perfect installation is unlawful if it falls into a notifiable category and was not notified. The local authority can require it to be made compliant by a registered person and re-certificated at the homeowner cost.',
  },
  {
    id: 2,
    question:
      'You are replacing a damaged socket-outlet in a domestic kitchen with a like-for-like accessory on the existing circuit. What does the notification regime require?',
    options: [
      'Nothing to notify — replacements, repairs and maintenance of existing accessories on existing circuits are not notifiable work, even in a kitchen. You should still issue a Minor Works certificate.',
      'Notification before starting, because any electrical work in a kitchen is notifiable as the kitchen is a special location.',
      'Notification after completion, because replacing an accessory alters a final circuit and Building Control must be informed.',
      'Nothing to notify and nothing to certify, because a like-for-like replacement is maintenance rather than electrical work.',
    ],
    correctAnswer: 0,
    explanation:
      'Notifiable work is a short list: new circuits, consumer unit replacement, and additions or alterations to existing circuits in a special location. A like-for-like socket swap on an existing circuit is not on that list. The certificate is a separate duty from notification, and you still issue one.',
  },
  {
    id: 3,
    question:
      'A registered contractor is found at annual assessment to have persistently failed to keep test instrument calibration certificates. What is the realistic outcome?',
    options: [
      'A non-conformance is issued with a deadline to evidence calibration, followed by re-assessment. Persistent failure escalates to warning, suspension and removal from the scheme, because scheme rules are contractual obligations signed at enrolment.',
      'Immediate prosecution by the HSE, because uncalibrated instruments make the results unreliable and that is a direct criminal breach.',
      'No consequence at all, because calibration is a best-practice recommendation rather than a scheme requirement.',
      'Automatic withdrawal of the operative grading, because calibration is a working-rule requirement of the national grading agreement.',
    ],
    correctAnswer: 0,
    explanation:
      'Scheme rules are contractual between the contractor and the scheme operator. Failure is not criminal, but it is grounds for action up to expulsion. Once you are out of the scheme you cannot self-certify notifiable work, your insurer often withdraws cover, and the customer-facing badge goes.',
  },
  {
    id: 4,
    question:
      'A registered firm fits a consumer unit, carries out no proper test sequence, issues no certificate, and the customer complains. The work happens to be electrically sound. What is the realistic non-criminal consequence?',
    options: [
      'Scheme action — a non-conformance notice, possible suspension and possible removal. Removal means no self-certification of notifiable work, weakened insurance position and withdrawal of the badge, which between them can end the firm ability to trade.',
      'A criminal prosecution, because failing to issue a certificate is itself a statutory offence carrying an unlimited fine.',
      'A Trading Standards penalty requiring a refund, because the missing certificate means the service was not as described.',
      'A Building Control enforcement notice requiring the consumer unit to be removed, because no certificate means the work is treated as unnotified.',
    ],
    correctAnswer: 0,
    explanation:
      'Scheme membership is voluntary and non-statutory, but losing it has commercial consequences worse than most fines. Without self-certification every notifiable job slows by weeks, and many insurers require scheme membership as a condition of cover.',
  },
  {
    id: 5,
    question: 'Does the Part P notification regime apply across the whole United Kingdom?',
    options: [
      'No — Building Regulations are devolved. Part P is an England instrument, Wales has its own version of the Building Regulations, Scotland has the Building (Scotland) Regulations and the Scottish Technical Handbooks, and Northern Ireland has its own Building Regulations.',
      'Yes — Part P applies identically across England, Wales, Scotland and Northern Ireland because it is a reserved matter.',
      'Yes in England and Scotland, but Wales and Northern Ireland rely entirely on the technical standard with no notification regime.',
      'No — Part P has been withdrawn everywhere and replaced by the competent person schemes.',
    ],
    correctAnswer: 0,
    explanation:
      'Building Regulations are devolved, so the notification regime differs by nation, with the Part P notification rules in Wales mirroring England at present. The technical standard everyone follows on either side of any border is still BS 7671.',
  },
  {
    id: 6,
    question:
      'A house burns down and the insurer refuses the claim, citing failure to demonstrate the installation was maintained in accordance with current standards. What evidence would normally satisfy that clause?',
    options: [
      'A condition report carried out and signed by a competent person in accordance with BS 7671 Part 6 and IET Guidance Note 3, at the recommended frequency for the premises, with a satisfactory or remediated outcome.',
      'A Building Regulations compliance certificate from the original installation, which proves the work was lawfully notified.',
      'The original installation certificate from when the property was built, which certifies compliance for the life of the building.',
      'A current portable appliance testing record for the property, which demonstrates the electrical equipment has been inspected.',
    ],
    correctAnswer: 0,
    explanation:
      'Insurance contracts routinely carry a maintained-to-a-reasonable-standard clause. BS 7671 plus Guidance Note 3 plus a condition report from a competent person is the evidence base for that clause. No report, no defence.',
  },
  {
    id: 7,
    question:
      'Which IET publication is the practical companion specifically to BS 7671 Part 6 on inspection and testing?',
    options: [
      'Guidance Note 3 — Inspection and Testing.',
      'Guidance Note 1 — Selection and Erection.',
      'The On-Site Guide.',
      'Guidance Note 8 — Earthing and Bonding.',
    ],
    correctAnswer: 0,
    explanation:
      'Guidance Note 3 is the dedicated inspection and testing companion. It walks through initial verification and periodic inspection, gives example test sequences, the condition code framework and worked examples of completed certificates and reports.',
  },
  {
    id: 8,
    question:
      'Notifiable work has been carried out in a dwelling and never notified. What can the enforcing body do?',
    options: [
      'Local Authority Building Control can require the non-compliant work to be made compliant by a registered person and re-certificated at the building owner expense, with fines available up to £5,000 plus a daily amount for continuing offences.',
      'Only the HSE can act, because all electrical enforcement sits with the HSE regardless of premises type.',
      'Nothing can be done once the work is complete, because the notification window has passed.',
      'The energy regulator can disconnect the supply, because unnotified work is a breach of the supply regulations.',
    ],
    correctAnswer: 0,
    explanation:
      'Building Regulations are enforced by Local Authority Building Control or an Approved Inspector. They can require the work to be ripped out and redone compliantly at the owner cost, and fines run to £5,000 plus £50 per day for continuing offences.',
  },
];

export default function Lesson315e_4_1() {
  return (
    <div className="space-y-8">
      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Installing the wiring system is half the job. The other half is the paperwork that closes
        it — who has to be told the work happened, what certificate the customer is entitled to,
        who is allowed to sign it, and what a regulator, a scheme assessor or an insurer will look
        for afterwards. That is a different set of rules from the ones that governed the install,
        and this lesson covers those.
      </p>

      <TLDR
        points={[
          'The rules that govern finishing a job are not the same as the rules that governed doing it. Installation method comes from BS 7671. Notification comes from the Building Regulations. Certification comes from BS 7671 Part 6 and the model forms. Sign-off competence comes from EAWR.',
          'Part P of the Building Regulations is a notification regime, not a technical one. Requirement P1 is one sentence, and it points at BS 7671 as the way to satisfy it.',
          'Notifiable work in England is a short list: a new circuit, a consumer unit replacement, and any addition or alteration to an existing circuit in a special location. Everything else is non-notifiable but still gets certified.',
          'There are two routes to compliance for notifiable work — self-certification through a competent person scheme, or notification to Local Authority Building Control before starting.',
          'Scheme rules, insurance conditions and the model certificate forms are all non-statutory, but their consequences are commercial and they arrive faster than any prosecution.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Distinguish the standards and regulations that govern certification, notification and handover from those that govern installation method.',
          'State what Building Regulations Requirement P1 actually requires and explain why it points at BS 7671 rather than specifying technical detail.',
          'Identify which categories of domestic electrical work are notifiable and which are not, and explain the devolved position across the UK nations.',
          'Compare the two routes to compliance for notifiable work — competent person scheme self-certification and Local Authority Building Control notification — and explain why the person signing a certificate must be competent within the meaning of EAWR Regulation 16.',
          'Describe the commercial and civil consequences of defective completion paperwork — scheme action, insurance refusal and enforcement by Building Control.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Two halves of one job</ContentEyebrow>

      <ConceptBlock
        title="Completing work is governed by a different stack of documents"
        plainEnglish="While you are installing, the questions are technical — what cable, what protective device, what containment. Once the work is finished the questions change completely — who has to be told, what document proves it, and who is qualified to sign. Different questions, different rules."
        onSite="Keep the two stacks separate in your head. Mixing them up is how apprentices end up quoting a wiring regulation at a Building Control officer who is asking about notification, and quoting a notification rule at an inspector who is asking about workmanship."
      >
        <p>The documents that govern the completion of a job:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Building Regulations, Part P.</strong> Statutory. Sets the notification regime
            for electrical work in dwellings. Enforced by Local Authority Building Control or an
            Approved Inspector.
          </li>
          <li>
            <strong>EAWR 1989, Regulation 16.</strong> Statutory. The competence requirement that
            sits behind anybody signing to say the work is safe.
          </li>
          <li>
            <strong>BS 7671 Part 6 and the model forms in the appendices.</strong> Non-statutory
            standard. Defines what is verified and what certificate or report is issued.
          </li>
          <li>
            <strong>IET Guidance Note 3.</strong> Non-statutory guidance. The practical companion
            to Part 6 — test sequences, condition codes and worked examples of completed forms.
          </li>
          <li>
            <strong>Competent person scheme rules.</strong> Contractual. Assessment, calibration,
            record keeping, self-certification through the scheme portal.
          </li>
          <li>
            <strong>Insurance policy conditions.</strong> Contractual. Usually require the
            installation to have been maintained to a reasonable standard, evidenced by
            certification.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Part P — a notification regime, not a technical one</ContentEyebrow>

      <ConceptBlock
        title="One sentence of requirement, a whole regime of process"
        plainEnglish="Part P of the Building Regulations is about telling somebody the work happened. It does not tell you how to wire anything. The technical answer comes from BS 7671, and Part P simply requires reasonable provision to be made."
        onSite="Part P is England as written; Wales mirrors it; Scotland and Northern Ireland have their own Building Regulations. The technical standard everyone follows on either side of any border is still BS 7671."
      >
        <p>What the regime actually consists of:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>The requirement itself.</strong> Requirement P1 asks for reasonable provision in
            design and installation to protect people from fire or injury. That is the whole
            technical content.
          </li>
          <li>
            <strong>The deemed-to-satisfy route.</strong> Approved Document P points at BS 7671.
            Comply with the standard and you are presumed to have met the requirement.
          </li>
          <li>
            <strong>The notification machinery.</strong> The obligation to notify, the
            self-certification route and the Building Control route sit elsewhere in the Building
            Regulations, not inside Part P itself.
          </li>
          <li>
            <strong>The compliance certificate.</strong> The homeowner ends up with a Building
            Regulations compliance certificate — a different document from the electrical
            certificate you issue.
          </li>
        </ul>
        <p>
          That separation matters. You can install a technically perfect circuit and still breach
          the Building Regulations by never telling anybody. You can also notify correctly and
          still breach BS 7671 by installing it badly. They are independent failures.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="The Building Regulations 2010 (England) — Part P, Requirement P1"
        clause="Reasonable provision shall be made in the design and installation of electrical installations in order to protect persons operating, maintaining or altering the installations from fire or injury."
        meaning="That single sentence is Part P in its entirety. It does not tell you how to protect people — it points at BS 7671 through Approved Document P as the deemed-to-satisfy route. The rest of the regime, meaning notification, scheme self-certification and Building Control sign-off, sits in the body of the Building Regulations rather than in Part P itself."
        cite="Source: The Building Regulations 2010 (SI 2010/2214), Schedule 1, Part P, Requirement P1, supported by Approved Document P (paraphrased)."
      />

      <ConceptBlock
        title="What is notifiable and what is not"
        plainEnglish="The notifiable list in England is short and worth memorising, because everything not on it is non-notifiable. Non-notifiable does not mean uncertified — the certificate duty is separate and still applies."
        onSite="Before you quote, decide which side of the line the job falls. It changes your programme, because the Building Control route has to be started before the work does."
      >
        <p>The notifiable categories:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Installation of a new circuit.</strong> Anything that adds a new circuit at the
            consumer unit — a new shower circuit, a dedicated charging point circuit, a new garage
            sub-main.
          </li>
          <li>
            <strong>Replacement of a consumer unit.</strong> A full board swap-out, including the
            common upgrade from a board with no residual current protection.
          </li>
          <li>
            <strong>Additions or alterations in a special location.</strong> Locations containing a
            bath or shower are the live one in domestic work. Extending an existing lighting circuit
            into a bathroom is notifiable; extending the same circuit into a bedroom is not.
          </li>
        </ul>
        <p>
          Everything else — replacement accessories, like-for-like socket swaps, repairs to existing
          circuits outside special locations — is non-notifiable. You still issue a Minor Works
          certificate for it. The paperwork duty under BS 7671 does not switch off just because the
          notification duty does.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="315e-4-1-check-1"
        question="You extend an existing lighting circuit to add a downlight above a bath. No new circuit, no board change. What is the position?"
        options={[
          'Non-notifiable, because no new circuit was installed and the existing protective device is unchanged.',
          'Non-notifiable, because notification only applies to work at the consumer unit.',
          'Notifiable — an addition or alteration to an existing circuit in a location containing a bath or shower is on the notifiable list, even though no new circuit was added.',
          'Notifiable only if the customer asks for a Building Regulations compliance certificate.',
        ]}
        correctIndex={2}
        explanation="The special-location category catches exactly this job. The same extension run into a bedroom would be non-notifiable. The location, not the size of the work, is what puts it on the list — and you still carry out and certify the work to BS 7671 either way."
      />

      <SectionRule />

      <ContentEyebrow>Two routes to compliance</ContentEyebrow>

      <ConceptBlock
        title="Self-certification through a competent person scheme"
        plainEnglish="A competent person scheme is a Government-approved body that assesses electrical contractors and allows them to self-certify their notifiable work instead of going through Building Control on every job. NICEIC and ELECSA are operated by Certsure; NAPIT is a separate organisation. From a regulator point of view they cover the same ground."
        onSite="No scheme means Building Control notification on every notifiable job, which is slow, costs money and is visible to the customer. That is why effectively every contractor doing domestic work is on a scheme."
      >
        <p>How the scheme route works end to end:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Enrolment.</strong> Apply, pay the fee, evidence qualifications, calibrated
            instruments, insurance, premises, and sign up to the scheme rules in writing.
          </li>
          <li>
            <strong>Assessment.</strong> An annual visit from the scheme assessor. They watch you
            work, check certificates, check instrument calibration, check health and safety
            paperwork and audit a sample of completed jobs.
          </li>
          <li>
            <strong>Self-certification.</strong> For every notifiable job you upload the certificate
            to the scheme portal, the scheme notifies Building Control on your behalf within 30
            days, and the homeowner receives a Building Regulations compliance certificate.
          </li>
          <li>
            <strong>Non-conformance.</strong> Where the assessor finds an issue you receive a
            non-conformance notice with a deadline to remediate. Persistent or serious issues
            escalate to suspension or removal.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="The Building Control route, and why it changes your programme"
        plainEnglish="If you are not on a scheme, you notify Local Authority Building Control before you start, pay a fee, and they or an Approved Inspector inspect and sign off the work. It is the same regime with a different gatekeeper."
        onSite="The order matters. Scheme self-certification happens after the work. Building Control notification happens before it. Start notifiable work first and then try to notify and you have already breached the regime."
      >
        <p>What the Building Control route involves in practice:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Notify first.</strong> The application goes in before work starts, not after
            completion.
          </li>
          <li>
            <strong>Pay the fee.</strong> Charged per job, and generally passed to the customer, so
            it has to be in the quote.
          </li>
          <li>
            <strong>Inspection and sign-off.</strong> The authority or an Approved Inspector checks
            the work and issues the compliance certificate.
          </li>
          <li>
            <strong>Programme impact.</strong> Slow and expensive compared with self-certification,
            which is why it is normally used only where the contractor is not scheme-registered.
          </li>
        </ul>
        <p>
          Neither route replaces the electrical certificate. Both routes assume that a competent
          person has inspected, tested and certified the installation to BS 7671 — notification is
          the record that the work happened, not the evidence that it is safe.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="Electricity at Work Regulations 1989 — Regulation 16"
        clause="No person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger or, where appropriate, injury, unless he possesses such knowledge or experience, or is under such degree of supervision as may be appropriate having regard to the nature of the work."
        meaning="This is the legal definition of competence for electrical work in Great Britain, and it is the statutory duty sitting behind every signature on a certificate. Your qualification, your scheme registration and your supervisor countersignature all exist to demonstrate compliance with it. Signing a certificate for work you were not competent to verify is a Reg 16 problem before it is ever a scheme problem."
        cite="Source: The Electricity at Work Regulations 1989, Regulation 16."
      />

      <InlineCheck
        id="315e-4-1-check-2"
        question="Which statement correctly separates the notification certificate from the electrical certificate?"
        options={[
          'The Building Regulations compliance certificate records that notifiable work was notified; the electrical certificate records that the installation was inspected, tested and found to comply with BS 7671. They are different documents issued for different purposes.',
          'They are the same document issued under two different names depending on whether the contractor is scheme-registered.',
          'The electrical certificate replaces the Building Regulations compliance certificate wherever the contractor self-certifies.',
          'The Building Regulations compliance certificate is issued first and the electrical certificate is only required if the customer asks for one.',
        ]}
        correctIndex={0}
        explanation="Two duties, two documents. Notification proves somebody was told. Certification proves the installation was verified against the standard. A job can satisfy one and fail the other, which is exactly why they are assessed separately."
      />

      <SectionRule />

      <ContentEyebrow>The certificate and the standard behind it</ContentEyebrow>

      <ConceptBlock
        title="BS 7671 Part 6, the model forms and Guidance Note 3"
        plainEnglish="The certificate you hand over is not a company invention. Its content comes from BS 7671 Part 6 and the model forms in the appendices, and Guidance Note 3 shows you a completed example of each with realistic figures on it."
        onSite="Guidance Note 3 lives in the testing bag next to the instrument. It is the document an assessor reaches for when questioning whether your sequence was right or your coding was justified. Make sure the edition you are working from matches the amendment your work is certified against."
      >
        <p>What Guidance Note 3 adds to the bare requirement:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Initial verification.</strong> The sequence followed on a new installation or an
            addition, and what goes on the certificate afterwards.
          </li>
          <li>
            <strong>Periodic inspection.</strong> The sequence for a condition report, guidance on
            frequency for different premises types, and the condition coding framework of C1, C2,
            C3 and FI.
          </li>
          <li>
            <strong>Worked examples.</strong> Fully completed certificates and reports with
            realistic values, so you can see what a properly finished document looks like.
          </li>
          <li>
            <strong>Instrument expectations.</strong> Accuracy classes, calibration expectations and
            how the instrument functions map onto the required tests.
          </li>
        </ul>
        <p>
          Guidance Note 3 is published by the same body as the standard, which makes it
          authoritative, but it does not override BS 7671. Where the two appear to conflict on a
          fine point, the standard is the authority and the guidance is the recommended practical
          interpretation.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Scheme rules and their teeth</ContentEyebrow>

      <ConceptBlock
        title="Scheme rules are a contract you signed"
        plainEnglish="Scheme membership is voluntary. Nothing in statute says you must join one. But the moment you enrol you have signed up to rules covering assessment, calibration, record keeping and how certificates are issued — and those rules are enforceable against you commercially."
        onSite="The badge on the van is a marketing asset, and customers actively look for it. Losing it is not a fine you pay and move on from; it changes what work you can take on."
      >
        <p>What the loss of scheme registration actually costs:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>No self-certification.</strong> Every notifiable job reverts to the Building
            Control route, adding fee and delay to each one.
          </li>
          <li>
            <strong>Insurance exposure.</strong> Many insurers require scheme membership as a
            condition of public liability cover, so the cover can go with the registration.
          </li>
          <li>
            <strong>Marketing withdrawal.</strong> Logo, badge and directory listing are withdrawn.
          </li>
          <li>
            <strong>Customer confidence.</strong> A domestic customer who has been told to look for
            a registered installer will simply call somebody else.
          </li>
        </ul>
        <p>
          The enforcement of the non-statutory framework is commercial rather than criminal. It
          ends a trading firm just as effectively as a fine would, and it moves a great deal faster
          than a prosecution.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="What the customer keeps, and what you keep"
        plainEnglish="The handover pack is the last regulated act of the job. It is also the only thing that will speak for you years later, when the people who did the work have moved on and somebody is asking whether the installation was ever verified."
        onSite="Hand the pack over properly and note that you did. A certificate left in a drawer in the van is worth nothing to the customer and nothing to you."
      >
        <p>What leaves site with the customer:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>The electrical certificate with its schedules.</strong> The certificate
            summarises and the schedules carry the evidence. Both go.
          </li>
          <li>
            <strong>The Building Regulations compliance certificate.</strong> Issued through the
            scheme or by Building Control where the work was notifiable.
          </li>
          <li>
            <strong>The recommendation for the next inspection.</strong> The model forms carry a
            panel for this. Filling it in moves the obligation to the customer once they have been
            told in writing.
          </li>
        </ul>
        <p>
          Keep your own copy as well. Insurance disputes and scheme audits both start with somebody
          asking to see the paperwork, and the firm that can produce a complete file with a
          recommendation panel filled in is in a very different position from the firm that cannot.
          Where a customer later claims nobody ever advised them to have the installation
          inspected, that panel is the answer.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="315e-4-1-check-3"
        question="A contractor allows scheme registration to lapse but continues carrying out consumer unit replacements in dwellings, issuing proper electrical certificates each time. What is wrong?"
        options={[
          'Nothing — proper electrical certification satisfies every duty attaching to the work.',
          'The certificates are invalid, because only scheme-registered contractors may issue an electrical certificate.',
          'Only the marketing is wrong, because continuing to display a withdrawn badge is the sole breach.',
          'A consumer unit replacement is notifiable. Without scheme registration there is no self-certification route, so each job had to be notified to Building Control before it started — the electrical certificate does not discharge the notification duty.',
        ]}
        correctIndex={3}
        explanation="Certification and notification are separate obligations with separate consequences. The electrical certificate proves verification; it does not tell Building Control that notifiable work took place. Each unnotified board change is a Building Regulations breach on its own."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Assuming a safe installation cannot be an unlawful one"
        whatHappens={
          <>
            The work is neat, tested and genuinely safe. The installer concludes that nothing else
            is needed and moves on. Months later the property is sold, the buyer solicitor asks for
            the Building Regulations compliance certificate for the new circuit, and there is none.
            The local authority can require the work to be made compliant by a registered person
            and re-certificated at the owner expense, and fines run to £5,000 plus a daily amount
            for continuing offences. The quality of the work is no defence to the notification
            breach.
          </>
        }
        doInstead={
          <>
            Decide at quoting stage whether the job is notifiable. If it is, choose your route
            before you start — self-certify through your scheme afterwards, or notify Building
            Control before you begin. Put the fee in the quote where the Building Control route
            applies, and hand the customer both documents at the end: the electrical certificate
            and the compliance certificate.
          </>
        }
      />

      <CommonMistake
        title="Handing over a certificate with the schedules blank"
        whatHappens={
          <>
            The certificate is signed and given to the customer, but the inspection schedule was
            never filled in and the results schedule carries two readings. Years later there is an
            incident and somebody asks for the verification evidence. There is a signature but
            nothing behind it. A scheme assessor treats that as a serious non-conformance, and an
            insurer treats it as an absence of evidence that the installation was ever properly
            verified.
          </>
        }
        doInstead={
          <>
            Treat the schedules as the evidence and the certificate as the summary that points at
            them. Fill them in on site as you go rather than reconstructing them in the office. A
            certificate with complete schedules is worth defending; a signature with nothing behind
            it is not.
          </>
        }
      />

      <Scenario
        title="Rental flat above a shop in Aberystwyth, sold mid-tenancy"
        situation={
          <>
            Eighteen months ago you replaced the consumer unit in a first-floor flat above a shop
            in Aberystwyth and added a dedicated circuit for a new electric shower. You were
            between scheme assessments at the time and your registration had lapsed by a fortnight,
            so nothing was notified. The electrical certificate was issued properly and the
            installation tests clean. The landlord is now selling and the buyer solicitor has asked
            for the Building Regulations compliance certificates.
          </>
        }
        whatToDo={
          <>
            Be straight about what exists and what does not. You hold a valid electrical
            certificate demonstrating the work was inspected, tested and verified against BS 7671 —
            that part of the duty was met. What is missing is the notification. Both the consumer
            unit replacement and the new shower circuit are notifiable categories, so the work
            should have been either self-certified through a scheme or notified to Building Control
            before it started. Contact the local authority, explain the position, and follow their
            regularisation process. Expect a fee, an inspection and possibly some opening up.
            Retain the certificate and the schedules, because they are the evidence that makes the
            inspection straightforward rather than a full re-verification.
          </>
        }
        whyItMatters={
          <>
            This is the exact scenario in which a notification breach surfaces — a sale, a
            remortgage or an insurance claim, long after the work. Doing the work safely and
            certifying it properly protects the occupants. Notifying it protects the transaction.
            The two duties are separate and the second one has a long memory.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question:
              'If the work is not notifiable, do I still have to issue an electrical certificate?',
            answer:
              'Yes. Notification and certification are separate duties. Non-notifiable work — a like-for-like accessory swap, a repair on an existing circuit outside a special location — still gets a Minor Works certificate. The notification regime switching off does not switch off the BS 7671 requirement to verify and certify what you did.',
          },
          {
            question: 'What is the difference between NICEIC, NAPIT and ELECSA?',
            answer:
              'All three are competent person schemes. They assess and register electrical contractors so that the contractor can self-certify notifiable work in dwellings. NICEIC and ELECSA are operated by Certsure; NAPIT is a separate organisation. Functionally they cover the same ground, and from a regulator point of view they are equivalent. The differences are in fees, assessment style and the badge.',
          },
          {
            question: 'Can I still work legally if I am not on a scheme?',
            answer:
              'Yes, with caveats. You can carry out non-notifiable work freely. For notifiable work in dwellings you must either be registered and self-certify, or notify Local Authority Building Control before starting and pay them to inspect and sign off. Most working electricians are registered because the second route is slow and expensive.',
          },
          {
            question:
              'Guidance Note 3 and BS 7671 describe the same thing slightly differently. Which one do I follow?',
            answer:
              'BS 7671 is the standard and Guidance Note 3 is the practical companion published by the same body. Guidance Note 3 is authoritative and an assessor will accept it, but where the two genuinely conflict on a fine point, the wording in BS 7671 is the one you cite.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Completing a job is governed by its own stack of documents: the Building Regulations for notification, EAWR Reg 16 for competence to sign, BS 7671 Part 6 and the model forms for certification, and scheme rules for how it is processed.',
          'Requirement P1 asks only for reasonable provision to protect people from fire or injury, and Approved Document P points at BS 7671 as the deemed-to-satisfy route.',
          'Notifiable work in England is a new circuit, a consumer unit replacement, or an addition or alteration to an existing circuit in a special location. Everything else is non-notifiable.',
          'Building Regulations are devolved. Wales mirrors the England notification rules at present, Scotland has the Building (Scotland) Regulations and Technical Handbooks, and Northern Ireland has its own Building Regulations.',
          'Self-certification happens after the work through the scheme portal, with the scheme notifying Building Control within 30 days. Building Control notification happens before the work starts.',
          'EAWR Regulation 16 is the statutory competence duty behind every signature on a certificate — qualification, registration and supervision all exist to demonstrate it.',
          'Guidance Note 3 supplies the test sequences, condition codes and worked examples of completed forms, but BS 7671 remains the authority where the two differ.',
          'Enforcement of the completion rules comes from three directions: Building Control can require non-compliant work to be redone with fines up to £5,000 plus a daily amount, schemes can suspend or remove registration, and insurers can refuse a claim where certification evidence is missing.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz
        questions={quizQuestions}
        title="Standards and regulations for completing work — knowledge check"
      />
    </div>
  );
}
