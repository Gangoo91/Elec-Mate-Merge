/**
 * Unit 315E · Criterion 2.1 — Industry standards and regulations
 *
 * This criterion sits under the outcome about the standards and regulations
 * relevant to INSTALLING wiring systems. The angle here is therefore the
 * documents that govern installation work itself — what each one is for, who
 * it binds, and which of them carry legal force against which are guidance
 * that acquires its force by reference.
 *
 * Certification, notification and handover paperwork is deliberately NOT
 * covered here — that is the separate criterion on the documents for
 * completing work.
 *
 * Sources used (existing verified teaching):
 *   level2/module3/section1/Sub1.tsx — statutory regulations
 *   level2/module3/section1/Sub2.tsx — non-statutory regulations and guidance
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
      'Which of these is the parent Act that the Electricity at Work Regulations 1989 were made under?',
    options: [
      'The Health and Safety at Work etc Act 1974 — the umbrella Act covering all work activity in Great Britain, under which the more specific electrical regulations were made.',
      'The Electricity Safety, Quality and Continuity Regulations 2002 — the supply-side statute that sets the rules the network operator works to.',
      'The Building Regulations 2010 — the instrument that carries Part P and the notification regime for dwellings.',
      'BS 7671 — the Wiring Regulations, which gained statutory force when the 18th Edition was published.',
    ],
    correctAnswer: 0,
    explanation:
      'HASAWA 1974 is the parent Act. EAWR 1989 is a set of regulations made under it that drill specifically into electrical work. ESQCR runs in parallel for the supply side. Part P is a standalone notification regime inside the Building Regulations. BS 7671 is not statute at all.',
  },
  {
    id: 2,
    question:
      'Which regulation states that no person shall be engaged in any work activity where technical knowledge or experience is necessary to prevent danger unless they possess that knowledge or experience, or are under appropriate supervision?',
    options: [
      'EAWR 1989 Regulation 16 — the competence regulation.',
      'HASAWA 1974 Section 2 — the general duty on employers to provide training and supervision.',
      'EAWR 1989 Regulation 4 — the duty to construct, maintain and use electrical systems so as to prevent danger.',
      'ESQCR 2002 Regulation 28 — the duty of the consumer not to interfere with the supply.',
    ],
    correctAnswer: 0,
    explanation:
      'EAWR Reg 16 is the legal definition of competence for electrical work in Great Britain. Your card, your scheme membership and your supervisor sign-off all exist to demonstrate compliance with it. The HSE uses Reg 16 to prosecute unqualified or under-supervised work.',
  },
  {
    id: 3,
    question:
      'EAWR Regulation 14 permits work on or near a live conductor only where three conditions are met. What are they?',
    options: [
      'It is unreasonable for the conductor to be dead, it is reasonable for the work to be done live, AND suitable precautions are taken to prevent injury.',
      'The operative holds a current scheme registration, the customer has signed a disclaimer, AND a second person is present as a safety observer.',
      'The circuit is protected by a 30 mA RCD, the voltage is below 400 V, AND insulated tools are used throughout the task.',
      'The employer has carried out a risk assessment, the work is completed within one shift, AND the installation is retested before handover.',
    ],
    correctAnswer: 0,
    explanation:
      'All three conditions of Reg 14 must be satisfied together. This is where the dead-unless-impractical default comes from. Convenience, programme pressure and a customer who does not want the power off are not any of the three conditions.',
  },
  {
    id: 4,
    question:
      'Under ESQCR Schedule 1, what is the legal nominal supply voltage and tolerance at the cut-out for a single-phase domestic supply?',
    options: [
      '230 V with a tolerance of minus 6 per cent to plus 10 per cent, giving 216 V to 253 V.',
      '240 V with a tolerance of minus 6 per cent to plus 10 per cent, giving 226 V to 264 V.',
      '230 V plus or minus 10 per cent, giving 207 V to 253 V.',
      '230 V plus or minus 6 per cent, giving 216 V to 244 V.',
    ],
    correctAnswer: 0,
    explanation:
      'Schedule 1 sets the supply at 230 V with an asymmetric tolerance of minus 6 per cent to plus 10 per cent. That is 216 V to 253 V. Three-phase is 400 V with the same percentage tolerance and frequency is 50 Hz plus or minus 1 per cent. Anything outside the band at the cut-out is a network operator compliance problem.',
  },
  {
    id: 5,
    question:
      'BS 7671 is referenced inside the HSE Memorandum of Guidance to EAWR (HSR25). What does that reference actually do legally?',
    options: [
      'It establishes BS 7671 as a means of demonstrating compliance with EAWR, so a court treats following it as strong evidence the duty was met and ignoring it as strong evidence it was not. BS 7671 itself stays non-statutory.',
      'It makes BS 7671 legally binding, so a breach of any BS 7671 regulation becomes a criminal offence prosecutable in its own right.',
      'It replaces the relevant EAWR regulations with the BS 7671 text, so the British Standard becomes the document the courts apply.',
      'It has no legal effect at all, because HSR25 is guidance and a reference inside guidance carries no weight in any prosecution.',
    ],
    correctAnswer: 0,
    explanation:
      'This is the bridge between the statutory and the non-statutory. HSR25 recognises compliance with BS 7671 as one means of demonstrating that the EAWR requirements have been satisfied for fixed installations in its scope. Follow it and you are presumed compliant. Depart from it and you have to prove your method was at least as safe.',
  },
  {
    id: 6,
    question: 'Break down the citation BS 7671:2018+A4:2026. What does each part mean?',
    options: [
      'BS is British Standard, 7671 is the standard number, 2018 is the base edition publication year, A4 is the fourth amendment to that base edition, and 2026 is the year that amendment was published.',
      'BS is British Standard, 7671 is the year first published, 2018 is the edition number in date form, A4 is the section it applies to, and 2026 is the expiry year.',
      'BS is British Standard, 7671 is the committee number, 2018 is the first amendment year, A4 is the paper size, and 2026 is the base edition year.',
      'BS is British Standard, 7671 is the EAWR regulation it implements, 2018 is the year it became statutory, A4 is the appendix number, and 2026 is the year it was withdrawn.',
    ],
    correctAnswer: 0,
    explanation:
      'Read it as British Standard 7671, 2018 base edition, fourth amendment dated 2026. The amendment matters because the requirements change substantially between amendments — the version you installed to is the version your work is judged against.',
  },
  {
    id: 7,
    question:
      "A circuit breaker carries the marking 'BS EN 60898-1, 6 kA, B32'. What kind of document is BS EN 60898-1?",
    options: [
      'A product standard — the harmonised standard for circuit breakers in domestic and similar installations, referenced by BS 7671 so that a device marked to it is deemed to comply.',
      'An installation regulation — the part of BS 7671 that sets out how circuit breakers must be arranged and labelled inside a consumer unit.',
      'A test method — the standard defining how an inspector verifies the trip characteristics of a circuit breaker during verification.',
      'A scheme requirement — the registration body rule specifying which makes of breaker a registered contractor may install.',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN standards are product specifications. They tell the manufacturer what the device must meet. BS 7671 references them so that selecting a device to the right BS EN is shorthand for a full re-proof of its performance. The same pattern applies to BS EN 60947 for industrial switchgear and BS EN 61008 and 61009 for RCDs and RCBOs.',
  },
  {
    id: 8,
    question:
      'A self-employed subcontractor is injured on a commercial fit-out because the main contractor did not supply the agreed RCD-protected supply. Under HASAWA, who carries duties?',
    options: [
      'Both — Section 3 puts a duty on the main contractor towards persons not in his employment who are affected by his undertaking, and Section 7 puts a duty on every worker to take reasonable care for himself and others.',
      'Only the main contractor, because Section 2 makes the employer solely responsible for the working environment provided on site.',
      'Only the subcontractor, because a self-employed person is responsible for his own safety and nobody else carries a duty towards him.',
      'Neither under HASAWA, because a failure to provide an RCD is purely an EAWR matter and HASAWA places no duty on either party.',
    ],
    correctAnswer: 0,
    explanation:
      'HASAWA is layered. Section 2 binds employers to their employees, Section 3 binds them to non-employees affected by their undertaking, and Section 7 is the personal duty on every worker. Both parties can be prosecuted independently, and after an incident they very often are.',
  },
];

export default function Lesson315e_2_1() {
  return (
    <div className="space-y-8">
      <p className="max-w-3xl text-[13px] leading-relaxed text-white">
        Before you clip a single cable, four statutory instruments and a stack of standards already
        govern how the wiring system goes in. This lesson sorts them into what is law, what is
        standard, and what is guidance — and shows how the three tie together into one chain that
        ends at the work you do on site.
      </p>

      <TLDR
        points={[
          'Four statutory instruments govern UK electrical installation work: the Health and Safety at Work etc Act 1974, the Electricity at Work Regulations 1989, the Electricity Safety Quality and Continuity Regulations 2002, and the Building Regulations. All four carry criminal sanctions.',
          'EAWR is the trade-specific one. Reg 4 covers safe systems, Reg 13 and 14 cover dead and live working, and Reg 16 covers competence. These are the regulations the HSE prosecutes electricians under most often.',
          'BS 7671 is not law. It is a British Standard, co-published by BSI and the IET, and it is the document that says HOW a compliant wiring system is installed.',
          'The bridge between the two is HSR25, the HSE guidance to EAWR, which recognises compliance with BS 7671 as a means of demonstrating that the statutory duty has been met.',
          'Around BS 7671 sit the On-Site Guide, the IET Guidance Notes, the BS EN product standards and the manufacturer literature. None are statute; all of them shape what a competent installation looks like.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Identify the four statutory instruments that bind UK electrical installation work and state which body enforces each of them.',
          'Explain the duties created by HASAWA Sections 2, 3 and 7, and apply the so far as is reasonably practicable test to an installation decision.',
          'Describe the practical effect of EAWR Regulations 4, 13, 14 and 16 on the way a wiring system is planned and installed.',
          'State where the network operator responsibility under ESQCR ends and the installer responsibility under BS 7671 begins.',
          'Explain why BS 7671 carries no statutory force yet governs installation method in practice, read a BS 7671 citation correctly, and identify the non-statutory documents that support it — the On-Site Guide, the IET Guidance Notes, the BS EN product standards and manufacturer instructions.',
        ]}
        initialVisibleCount={3}
      />

      <ConceptBlock
        title="Three different kinds of document, three different consequences"
        plainEnglish="Statute is law made by Parliament. Breach it and you answer in a criminal court. A British Standard is published by BSI and the IET; it carries no criminal sanction of its own. Guidance explains how to apply the standard. All three land on the same job, but only one of them can put you in the dock."
        onSite="Learn to say which bucket a document sits in before you quote it. An inspector who hears you call BS 7671 the law knows immediately how much of the framework you actually understand."
      >
        <p>The three tiers, in the order a court would look at them:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Statutory.</strong> Health and Safety at Work etc Act 1974, the Electricity at
            Work Regulations 1989, the Electricity Safety, Quality and Continuity Regulations 2002,
            and the Building Regulations. Criminal sanctions attach directly.
          </li>
          <li>
            <strong>Standards.</strong> BS 7671, the Wiring Regulations, plus the BS EN product
            standards it references. Not statute, but the technical benchmark everyone works to.
          </li>
          <li>
            <strong>Guidance.</strong> The IET On-Site Guide, the IET Guidance Notes, HSE
            memoranda, manufacturer installation literature. Explains how to apply the standard.
          </li>
        </ul>
        <p>
          Get the order of priority straight. HASAWA is the umbrella. EAWR sits under it for
          electrical work. ESQCR runs in parallel for the supply. The standards and guidance sit
          alongside as the description of what compliance looks like. All of them can apply to the
          same wiring system.
        </p>
        <p>
          One more distinction is worth making early. A statutory duty is owed to the state and
          enforced by a regulator. A standard is owed to nobody in particular but becomes the
          measure of competence. Scheme rules and contract specifications are owed to a private
          party and enforced commercially. All three can be breached by the same piece of bad
          work, and the three consequences arrive from three different directions.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>HASAWA 1974 — the umbrella</ContentEyebrow>

      <ConceptBlock
        title="The Act that sits underneath every other rule on site"
        plainEnglish="HASAWA covers all work activity in Great Britain. Every more specific set of regulations, EAWR included, is made under powers granted by it. It binds employers, employees, the self-employed and anyone whose work affects other people."
      >
        <p>The three sections that matter when you are installing:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Section 2.</strong> Duty of every employer to ensure, so far as is reasonably
            practicable, the health, safety and welfare of employees. Covers training, supervision,
            plant and the working environment you are sent into.
          </li>
          <li>
            <strong>Section 3.</strong> Duty of every employer and self-employed person towards
            persons NOT in their employment who may be affected. The customer, the public and the
            other trades on the same site are all covered by this one.
          </li>
          <li>
            <strong>Section 7.</strong> Duty of every worker to take reasonable care for themselves
            and others, and to co-operate with the safety arrangements in place. This is the
            personal liability hook.
          </li>
        </ul>
        <p>
          Section 7 is the one apprentices skip and should not. Your supervisor can be prosecuted
          under Section 2 and you can be prosecuted under Section 7 for the same incident,
          independently, in your own name.
        </p>
        <p>
          On an installation job the practical effect is that the duty follows the work rather than
          the job title. An apprentice pulling cable into a live plant room carries a Section 7
          duty in exactly the same way the contracts manager carries a Section 2 duty. Nobody on
          the site is outside the Act.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="So far as is reasonably practicable — the phrase doing the work"
        plainEnglish="Nearly every HASAWA duty is qualified by so far as is reasonably practicable. It is a balancing test: the more serious the risk, the more you must do to control it, until the cost of further precautions becomes grossly disproportionate to the risk left over."
        onSite="When an inspector asks why you did something a particular way, this is the test they are applying. The bar is what a competent person would have done, not what was convenient on the day."
      >
        <p>
          The test came out of the courts and it runs through the whole framework. A 30 mA RCD on a
          socket circuit feeding outdoor equipment is reasonably practicable — it is cheap, it is
          well understood and it prevents shock. Leaving it out because the customer did not ask
          for it is not a defence, because the cost is trivial against the risk avoided.
        </p>
        <p>
          The same phrase turns up in BS 7671 verification, where the duty is to verify so far as is
          reasonably practicable that the requirements have been met. That is not an accident — the
          standard is written to slot into the statutory framework above it.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>EAWR 1989 — the installer&rsquo;s statute</ContentEyebrow>

      <ConceptBlock
        title="What HASAWA looks like pointed at electrical work"
        plainEnglish="EAWR is made under HASAWA and carries the same legal weight, but the duties are written in electrical terms — construction of systems, isolation, dead working, competence, working space. If an electrician is prosecuted after an incident, the primary charge is almost always an EAWR regulation."
        onSite="Reg 4 is the everyday workhorse. Reg 13 and 14 cover isolation and live work. Reg 16 covers competence. Between them they account for the bulk of HSE electrical enforcement."
      >
        <p>The regulations that shape how a wiring system is installed:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Reg 4 — systems, work activities and protective equipment.</strong> Every
            electrical system shall be constructed, maintained and used so as to prevent danger, and
            every work activity shall be carried out so as not to give rise to danger. This is the
            legal hook for safe systems of work.
          </li>
          <li>
            <strong>Reg 13 — precautions for work on equipment made dead.</strong> Adequate
            precautions to prevent equipment becoming live again while work is in progress. Your
            lock-off, your warning notice, your isolation procedure.
          </li>
          <li>
            <strong>Reg 14 — work on or near live conductors.</strong> Permitted only where it is
            unreasonable for the conductor to be dead, it is reasonable for the work to be done
            live, AND suitable precautions are taken.
          </li>
          <li>
            <strong>Reg 16 — competence.</strong> Nobody is to be engaged in work where technical
            knowledge or experience is needed to prevent danger unless they have it, or are under
            appropriate supervision.
          </li>
        </ul>
        <p>
          EAWR also covers strength and capability of equipment (Reg 5), adverse environments (Reg
          6), insulation (Reg 7), earthing (Reg 8), integrity of conductors (Reg 9), connections
          (Reg 10), means of protection (Reg 11), means of cutting off and isolation (Reg 12) and
          adequate working space, access and lighting (Reg 15). Read that list next to the contents
          page of BS 7671 and the overlap is obvious — it is deliberate.
        </p>
        <p>
          Notice what EAWR does not do. It never tells you a cable size, a disconnection time or a
          conductor colour. It sets a duty in general terms and leaves the technical answer to the
          standard. That gap is exactly the gap BS 7671 fills, and it is why the two documents are
          always read together rather than one instead of the other.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="Memorandum of Guidance on the Electricity at Work Regulations 1989 (HSR25)"
        clause="The Memorandum of Guidance on the Electricity at Work Regulations 1989 (HSR25, published by the HSE) recognises that compliance with the requirements of BS 7671 is one means of demonstrating that the requirements of the Electricity at Work Regulations have been satisfied for fixed electrical installations in scope of BS 7671."
        meaning="This is the legal bridge. BS 7671 has no statutory force on its own, but the HSE guidance to EAWR says that following it demonstrates compliance with the statutory duty. Depart from it and you carry the burden of proving your alternative method was at least as safe. That is why every installer follows BS 7671 even though no statute names it."
        cite="Reference: HSE publication HSR25, Memorandum of Guidance on the Electricity at Work Regulations 1989 — see the discussion of fixed installations and the role of BS 7671 (paraphrased)."
      />

      <InlineCheck
        id="315e-2-1-check-1"
        question="EAWR Reg 4(3) requires that every work activity, including operation, use and maintenance of an electrical system, is carried out so as not to give rise to danger. What does that regulation directly mandate in practice?"
        options={[
          'Periodic inspection and testing of every fixed installation at a set interval, producing a condition report each time.',
          'Provision of personal protective equipment to every operative before any electrical work begins, as the primary control.',
          'Notification of all maintenance work to Building Control in advance so the installation can be inspected before it is returned to service.',
          'A safe system of work — risk assessment, isolation procedure, proving dead, lock-off and a written method statement where appropriate. Reg 4(3) is the legal hook for everything recognisable as site safety procedure.',
        ]}
        correctIndex={3}
        explanation="Reg 4(3) is the everyday-work duty. It covers the whole lifecycle — operation, use and maintenance — not just the original install. Your safe isolation procedure, your method statements and your daily briefings are all legally framed by this single regulation."
      />

      <SectionRule />

      <ContentEyebrow>ESQCR 2002 — where your responsibility starts</ContentEyebrow>

      <ConceptBlock
        title="The statute that binds the network operator, not you"
        plainEnglish="ESQCR sits on the supply side of the cut-out — the part owned by the Distribution Network Operator. It tells them what voltage to deliver, how to earth and how to maintain the network. Your interest is in knowing exactly where ESQCR stops and BS 7671 takes over."
        onSite="In a normal domestic the boundary is the consumer terminals at the meter. Supply side of that is network operator territory. Load side is yours, and BS 7671 governs everything you install."
      >
        <p>The parts of ESQCR that touch day-to-day installation work:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Schedule 1 — voltage and frequency.</strong> Single-phase nominal 230 V with a
            tolerance of minus 6 per cent to plus 10 per cent, so 216 V to 253 V. Three-phase 400 V
            with the same percentage tolerance. Frequency 50 Hz plus or minus 1 per cent.
          </li>
          <li>
            <strong>Earthing arrangements.</strong> ESQCR sets the rules for the network operator
            providing earthing facilities to the consumer. The TN-C-S and protective multiple
            earthing terminology comes from here.
          </li>
          <li>
            <strong>Reg 28 — duty of the consumer.</strong> No equipment may be connected that
            interferes with the supply, the meter or the earthing. Back-feeding a generator or
            misconnecting an inverter puts you in breach.
          </li>
          <li>
            <strong>Reg 29 — beyond the cut-out.</strong> Confirms the network operator
            responsibility ends at the consumer terminals. Past that point you are the responsible
            party under EAWR.
          </li>
        </ul>
        <p>
          The practical takeaway when installing: if the incoming voltage at the head is outside
          216 V to 253 V, that is an ESQCR Schedule 1 problem for the network operator. You do not
          engineer around it on the load side. You report it and document it.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="315e-2-1-check-2"
        question="A customer rings up before you start a rewire. The incoming voltage at the head is reading 198 V. What framework governs this and whose problem is it?"
        options={[
          'BS 7671 — the installer must correct any voltage below the permitted limit, so the fix is to upsize the meter tails until the reading comes back up.',
          'ESQCR 2002 — the supply is meant to sit at 230 V minus 6 per cent to plus 10 per cent, so 216 V to 253 V. 198 V is below the legal floor and that is a network operator obligation, not an installer fix.',
          'EAWR Reg 4 — the installer is responsible for the safety of the whole electrical system, so a low supply voltage must be remedied at the consumer unit.',
          'The Building Regulations — a supply outside tolerance counts as an unsafe installation, so Building Control must be notified before work starts.',
        ]}
        correctIndex={1}
        explanation="ESQCR is the supply-side statute and it binds the network operator. Anything below 216 V at the cut-out is their compliance problem. You raise it with the customer, advise them to call the network operator, and you do not start engineering around it inside the installation."
      />

      <SectionRule />

      <ContentEyebrow>BS 7671 — how the wiring system actually goes in</ContentEyebrow>

      <ConceptBlock
        title="The standard the whole industry installs to"
        plainEnglish="BS 7671 is the British Standard that defines the requirements for electrical installations in the UK, co-published by BSI and the IET. Non-statutory by status, quasi-mandatory in practice. It is the document that turns the abstract statutory duty to prevent danger into a wiring system you can actually build."
        onSite="Read the citation properly. BS 7671:2018+A4:2026 means British Standard 7671, 2018 base edition, fourth amendment published 2026. Know which amendment your work was done under, because the requirements move between amendments."
      >
        <p>The structure is worth carrying in your head as a map of an installation job:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Part 1.</strong> Scope, object and fundamental principles.
          </li>
          <li>
            <strong>Part 2.</strong> Definitions — the vocabulary the rest of the standard uses
            precisely.
          </li>
          <li>
            <strong>Part 3.</strong> Assessment of general characteristics of the installation.
          </li>
          <li>
            <strong>Part 4.</strong> Protection for safety — shock, thermal effects, overcurrent,
            voltage disturbances.
          </li>
          <li>
            <strong>Part 5.</strong> Selection and erection of equipment. Chapters 51 to 55 cover
            common rules, wiring systems, isolation and switching, earthing and other equipment.
            This is the installer part.
          </li>
          <li>
            <strong>Part 6.</strong> Inspection and testing.
          </li>
          <li>
            <strong>Part 7.</strong> Special installations or locations — bathrooms, pools,
            agricultural premises, marinas, EV charging.
          </li>
          <li>
            <strong>Part 8.</strong> Functional requirements including energy efficiency.
          </li>
          <li>
            <strong>Appendices.</strong> Model forms, voltage drop tables, cable selection tables
            and current-carrying capacities.
          </li>
        </ul>
        <p>
          For installation work the centre of gravity is Parts 4, 5 and 7. Part 4 decides what
          protection the circuit needs, Part 5 decides how the equipment and the wiring system are
          selected and erected to deliver it, and Part 7 adds the extra requirements wherever the
          location is a special one. Part 6 then verifies that what Parts 4, 5 and 7 asked for is
          what actually got built.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 134.1.1"
        clause="Good workmanship by one or more skilled or instructed persons and proper materials shall be used in the erection of the electrical installation. The installation of electrical equipment shall take account of manufacturers' instructions."
        meaning="Two phrases carry the weight. Skilled or instructed persons is the BS 7671 equivalent of EAWR Reg 16 — competence is required and supervision counts. Take account of manufacturers instructions is the hook that turns ignoring a lead-length spec or a torque setting into a regulations breach. This is the regulation an inspector reaches for when calling out poor workmanship that is not a specific test failure."
        cite="Source: BS 7671:2018+A4:2026 Part 1, Chapter 13, Regulation 134.1.1."
      />

      <RegsCallout
        source="BS 7671:2018+A4:2026 — Regulation 510.3"
        clause="Every item of equipment shall be selected and erected so as to allow compliance with the regulations stated in this chapter and the relevant regulations in other parts of BS 7671 and shall take account of manufacturers' instructions."
        meaning="Reg 510.3 is the second pillar of the manufacturer-instruction obligation. Selection AND erection both have to take account of the literature. Fitting a consumer unit to one manufacturer schematic and filling it with another manufacturer modules without checking compatibility puts you in breach even where every individual component is fine on its own."
        cite="Source: BS 7671:2018+A4:2026 Part 5, Chapter 51, Regulation 510.3."
      />

      <SectionRule />

      <ContentEyebrow>The guidance that sits around the standard</ContentEyebrow>

      <ConceptBlock
        title="On-Site Guide and the IET Guidance Notes"
        plainEnglish="BS 7671 is too dense to flip through on a job. The On-Site Guide pulls out the tables and standard methods a typical installer uses every day. The Guidance Notes each take one part of the standard and explain it in depth."
        onSite="The On-Site Guide covers a domestic consumer unit change, a kitchen rewire, a small commercial fit-out. Step outside that envelope — industrial three-phase, sub-mains, awkward special locations — and you go back to BS 7671 itself."
      >
        <p>What sits on the shelf alongside the standard:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>On-Site Guide.</strong> The install-side quick reference. Cable sizing tables
            for the common cases, diversity factors, ratings of accessories, standard install
            methods for single-phase work. Faster on site; BS 7671 remains the authority.
          </li>
          <li>
            <strong>Guidance Note 1.</strong> Selection and Erection — the companion to Part 5, so
            the one most directly about installing a wiring system.
          </li>
          <li>
            <strong>Guidance Note 2.</strong> Isolation and Switching.
          </li>
          <li>
            <strong>Guidance Notes 4, 5, 6.</strong> Protection against fire, against electric
            shock, and against overcurrent.
          </li>
          <li>
            <strong>Guidance Note 7.</strong> Special Locations — the companion to Part 7.
          </li>
          <li>
            <strong>Guidance Notes 8 and 9.</strong> Earthing and Bonding, and Cabling.
          </li>
        </ul>
        <p>
          None of these is statute and none of them outranks BS 7671. Where a Guidance Note and the
          standard appear to conflict on a fine point, BS 7671 is the authority and the Guidance
          Note is the recommended practical interpretation.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="BS EN product standards — the markings on every device you fit"
        plainEnglish="When a breaker is marked BS EN 60898-1, B32, 6 kA, that reference is a non-statutory product standard. It defines what the device must meet. BS 7671 references it so that selecting the right device is shorthand instead of a full re-proof of its performance."
        onSite="Recognise the headline ones — BS EN 60898 for domestic circuit breakers, BS EN 60947 for industrial switchgear and contactors, BS EN 61008 for standalone RCDs, BS EN 61009 for RCBOs, BS EN 62606 for AFDDs, and the 60439 and 61439 series for assemblies."
      >
        <p>The chain of authority runs in four steps:</p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Step one.</strong> BS 7671 says use a device to BS EN 60898 with the right
            characteristic and breaking capacity for the circuit.
          </li>
          <li>
            <strong>Step two.</strong> BS EN 60898 says a breaker sold under this standard must
            withstand a stated short-circuit current and trip within a stated time at a stated
            multiple of rated current.
          </li>
          <li>
            <strong>Step three.</strong> The manufacturer designs to the standard and marks the
            device accordingly.
          </li>
          <li>
            <strong>Step four.</strong> You select the device from its markings against the BS 7671
            requirements for that circuit.
          </li>
        </ul>
        <p>
          No statute appears anywhere in that chain, and no criminal sanction attaches to any single
          link. But every link is mandatory in practice if you want the deemed-to-comply route back
          to EAWR Reg 4.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="315e-2-1-check-3"
        question="You are specifying the wiring system for a plant room. Which document tells you the install method, and which one makes that method matter legally?"
        options={[
          'The Building Regulations tell you the install method, and BS 7671 makes it matter legally by giving the notification route.',
          'ESQCR tells you the install method, and HASAWA makes it matter legally because the supply arrangement drives the design.',
          'BS 7671 tells you the install method, and EAWR makes it matter legally — the HSE guidance to EAWR recognises compliance with BS 7671 as a means of demonstrating the statutory duty has been met.',
          'The manufacturer literature tells you the install method, and the competent person scheme rules make it matter legally by contract.',
        ]}
        correctIndex={2}
        explanation="BS 7671 is the technical how. EAWR is the statutory why. Manufacturer literature and the Guidance Notes sit underneath BS 7671 rather than replacing it — and scheme rules are contractual, not criminal. Keep the two halves separate in your head and the framework stops being confusing."
      />

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating BS 7671 as the law and the statutory regulations as background reading"
        whatHappens={
          <>
            The apprentice can quote a BS 7671 regulation number in his sleep but could not say
            which Act makes BS 7671 relevant in the first place. After an incident the charge is
            not breach of BS 7671 — there is no such offence. The charge is breach of EAWR Reg 4,
            and BS 7671 is the document used to prove what safe looked like. Knowing the technical
            regulation without the statutory hook leaves you exposed in a witness box and clueless
            about why an inspector is asking what they are asking.
          </>
        }
        doInstead={
          <>
            Fix the hierarchy in your head. HASAWA is the law. EAWR is the law. ESQCR is the law.
            The Building Regulations are the law. BS 7671 is the standard the courts use to judge
            whether you met the law. Whenever you cite a BS 7671 regulation, mentally tag it to the
            statutory duty it satisfies. That is how the inspector thinks and how the court thinks.
          </>
        }
      />

      <CommonMistake
        title="Working to whichever edition of the Wiring Regulations is on the van"
        whatHappens={
          <>
            The firm bought one copy years ago and nobody renewed it. The installer sizes and
            arranges the wiring system from a withdrawn amendment, and the requirements have moved
            on — protective device arrangements, additional protection and the schedules have all
            changed. The work is judged against the amendment in force at the time it was done, not
            the one that happened to be on the shelf, and the installation has to be revisited at
            the firm cost.
          </>
        }
        doInstead={
          <>
            Work to the current amendment, every time. Check the date on the cover before you
            design or install anything. Where the customer or a specifier asks you to work to an
            older version, say no — a withdrawn version does not give you the deemed-to-comply route
            back to EAWR, and a scheme assessor will pick it up at the next visit.
          </>
        }
      />

      <Scenario
        title="Plant room rewire in Wrexham with a supply the customer blames you for"
        situation={
          <>
            You are second-fixing a light industrial unit on an estate outside Wrexham. Singles in
            steel conduit throughout, a new three-phase distribution board and a sub-main out to a
            workshop. On the day you energise, the tenant complains the machines are running down
            and points at your new installation. You measure at the intake and the supply is sitting
            at 205 V single-phase to neutral under load.
          </>
        }
        whatToDo={
          <>
            Split the problem along the ownership boundary before you touch anything. ESQCR
            Schedule 1 sets the supply at 230 V minus 6 per cent to plus 10 per cent, so the legal
            floor is 216 V. A reading of 205 V at the cut-out is below that floor and it is a
            network operator obligation under ESQCR, not something you fix on the load side. Record
            the reading, the time and the load conditions. Report it to the network operator and
            confirm it in writing to the tenant. Separately, satisfy yourself that your own work
            complies with BS 7671 — conductor sizing, voltage drop within the design, terminations
            to the manufacturer torque figures under Reg 134.1.1 and Reg 510.3 — so that the
            installation you are responsible for is demonstrably sound.
          </>
        }
        whyItMatters={
          <>
            Two different statutes are running at once, and they have different duty holders. Fit a
            transformer or start altering the intake and you have moved into ESQCR Reg 28 territory,
            where interfering with the supply or the earthing becomes your breach. Document the
            boundary clearly and the conversation with the tenant stops being about blame and starts
            being about who has to act.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'If BS 7671 is not law, why does everyone treat it as though it is?',
            answer:
              'Because the statutory regulations demand that electrical systems be safe but do not tell you how to make them safe. BS 7671 is the document the HSE, the courts and every registration body use as the reference for how. The HSE guidance to EAWR recognises compliance with BS 7671 as a means of demonstrating that the statutory requirements have been satisfied. Ignore it and the prosecution case under EAWR writes itself.',
          },
          {
            question: 'What is the actual difference between HASAWA and EAWR?',
            answer:
              'HASAWA 1974 is the parent Act and covers all work activity, electrical or not. EAWR 1989 is a set of regulations made under HASAWA that deal specifically with electrical work. EAWR is more detailed and is the one most often used in prosecutions of electricians, but the personal duty under HASAWA Section 7 is frequently charged alongside it.',
          },
          {
            question: 'Do I need to know the BS EN product standards by number?',
            answer:
              'Not all of them. Know the headline ones — BS EN 60898 for domestic circuit breakers, BS EN 60947 for industrial switchgear and contactors, BS EN 61008 and 61009 for RCDs and RCBOs, BS EN 62606 for AFDDs, and the assembly standards. When you read a requirement that says a device to BS EN something, you should at least recognise what kind of device it covers. The detail lives in the catalogue.',
          },
          {
            question: 'Can I be prosecuted personally, or only my employer?',
            answer:
              'Both. HASAWA Section 7 is a personal duty on every worker to take reasonable care for themselves and anyone affected by what they do. EAWR Reg 16 is also personal, because competence sits with the individual doing the work. Your employer can be prosecuted under HASAWA Sections 2 and 3 and under EAWR. You can be prosecuted under Section 7 and under EAWR. The two are not alternatives and after an incident they routinely run together.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'Four statutory instruments govern UK electrical installation work: HASAWA 1974, EAWR 1989, ESQCR 2002 and the Building Regulations. All four carry criminal sanctions.',
          'HASAWA Section 2 binds employers to employees, Section 3 to non-employees affected by the undertaking, and Section 7 is the personal duty on every worker including you.',
          'So far as is reasonably practicable is a balancing test: the greater the risk, the more you must do, until the cost of further precaution is disproportionate to the risk left.',
          'EAWR Reg 4 covers safe systems, Reg 13 dead working, Reg 14 the three conditions for live work, and Reg 16 competence. These are the regulations electricians are prosecuted under.',
          'ESQCR Schedule 1 sets the supply at 230 V minus 6 per cent to plus 10 per cent, so 216 V to 253 V, and it binds the network operator. Reg 29 confirms their responsibility ends at the consumer terminals.',
          'BS 7671 is a British Standard, not statute. Read the citation as base edition plus amendment, and always work to the amendment in force.',
          'The HSE guidance to EAWR recognises compliance with BS 7671 as a means of demonstrating the statutory duty has been met — that reference is the whole reason the standard governs installation practice.',
          'The On-Site Guide, the IET Guidance Notes, the BS EN product standards and manufacturer literature all sit beneath BS 7671. Regulations 134.1.1 and 510.3 make manufacturer instructions part of the obligation.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz
        questions={quizQuestions}
        title="Standards and regulations for installing wiring systems — knowledge check"
      />
    </div>
  );
}
