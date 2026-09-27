/**
 * Unit 301 — Understanding Building Services Engineering Practice in Wales (40 GLH)
 * Learning outcome 1 — Know the relevant trade bodies and organisations within the
 * building services engineering sector.
 * Criterion 1.2 — The role of the relevant trade bodies and organisations.
 *
 * Approach: 1.1 established who exists. This page is about what those bodies actually
 * do, and it is written from the point of view of the individual electrician — the
 * role is only worth learning where it changes your pay, your access to a site, your
 * training or your recognition. Each role is tied to something that happens to you.
 * No claim is made anywhere on this page about any competent-person scheme operator,
 * about what registration with one does, or about what it requires.
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
      'Under JIB National Working Rule 17.2.2.4, what must an operative supplied by a participating Employment Business to a JIB Member Firm hold?',
    options: [
      'A current and valid ECS Card denoting the appropriate electrical discipline(s) and the standard of skills',
      'A letter of introduction from the Employment Business',
      'Proof that the Employment Business is a trade association member',
      'A copy of the site health and safety policy',
    ],
    correctAnswer: 0,
    explanation:
      'Rule 17.2.2.4 is specific: any operatives supplied by a participating Employment Business to a JIB Member Firm must hold a current and valid ECS Card denoting the appropriate electrical discipline(s) and the standard of skills.',
  },
  {
    id: 2,
    question: 'What is the stated aim of the Electrical Contractors’ Association?',
    options: [
      'To ensure that all electrical installation work is carried out to the highest standards by properly qualified staff',
      'To set the national rate of pay for electricians',
      'To publish the wiring regulations',
      'To enforce health and safety law on construction sites',
    ],
    correctAnswer: 0,
    explanation:
      'That is the ECA’s stated aim, and it is the reason its entry requirements are set where they are.',
  },
  {
    id: 3,
    question: 'What must a firm demonstrate in order to become a member of the ECA?',
    options: [
      'That it has procedures, staff and systems of the highest calibre',
      'That it employs at least twenty electricians',
      'That it has traded for a minimum of ten years',
      'That every director holds a professional registration',
    ],
    correctAnswer: 0,
    explanation:
      'Firms who wish to become members must demonstrate that they have procedures, staff and systems of the highest calibre. Nothing is said about size — member companies range from small traders with only a few employees to large multi-nationals.',
  },
  {
    id: 4,
    question:
      'Completion of the apprenticeship is designed to be recognised by relevant Professional Engineering Institutions at which level of professional registration?',
    options: ['EngTech', 'CEng', 'IEng', 'No registration level is attached to it'],
    correctAnswer: 0,
    explanation:
      'The apprenticeship is designed so that completion is recognised at the appropriate level of professional registration, EngTech. That recognition attaches to you, not to your employer.',
  },
  {
    id: 5,
    question: 'Which of these is the job of an employer and employee negotiating body?',
    options: [
      'Settling national grades, rates and working rules between the two sides of the industry',
      'Issuing the qualification certificate at the end of an apprenticeship',
      'Writing and publishing the wiring regulations',
      'Prosecuting health and safety breaches on construction sites',
    ],
    correctAnswer: 0,
    explanation:
      'Negotiating bodies exist to settle national terms between employers and the workforce, and to run the grading and card scheme tied to those grades.',
  },
  {
    id: 6,
    question:
      'What does a trade association membership give the individual electrician working for the member firm?',
    options: [
      'Nothing directly — the membership and the entry assessment belong to the business',
      'An individual grading',
      'A personal right to use the association’s logo on a van',
      'An automatic professional registration',
    ],
    correctAnswer: 0,
    explanation:
      'The assessment is of the business — its procedures, staff and systems. The benefit to you is indirect: you work for a firm that had to meet an entry standard.',
  },
  {
    id: 7,
    question: 'Why does a card and grading scheme matter to you personally on the day?',
    options: [
      'Without a current, valid card showing the right discipline you can be refused access to site',
      'It replaces the need for a site induction',
      'It sets the price a client pays for the job',
      'It is only ever checked at the end of a contract',
    ],
    correctAnswer: 0,
    explanation:
      'The card is the gate. On a member firm’s site, a card that has expired or shows the wrong discipline can cost you the shift before you have picked up a screwdriver.',
  },
  {
    id: 8,
    question: 'Which role belongs to a professional institution rather than to a trade association?',
    options: [
      'Registering individuals by competence at defined levels and publishing guidance for the discipline',
      'Representing contracting businesses to government',
      'Assessing a firm’s procedures, staff and systems before admitting it',
      'Negotiating national rates of pay',
    ],
    correctAnswer: 0,
    explanation:
      'Professional institutions deal with individuals. Trade associations deal with firms, and negotiating bodies deal with terms.',
  },
];

export default function Lesson301_1_2() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'These bodies do seven things: represent the trade, negotiate terms, police entry standards, publish guidance, run card and grading schemes, support training, and recognise individuals.',
          'Only some of those roles touch you directly. The card scheme and the grading decide whether you get on site and what you are paid; the rest work on you at one remove.',
          'An entry standard for member firms is not paperwork for its own sake — the ECA’s aim is that all electrical installation work is carried out to the highest standards by properly qualified staff.',
          'A card that has expired or shows the wrong discipline is the single most common way a competent electrician loses a day’s work.',
          'Professional registration at EngTech is the one piece of recognition in this list that belongs to you and travels with you.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain how trade bodies represent the trade to government, to clients and to the public.',
          'Describe how a negotiating body sets national grades, rates and working rules, and how that reaches your payslip.',
          'Explain why an association sets an entry standard for member firms and what that standard is about.',
          'State what a card and grading scheme does, and what happens on site when your card is wrong or out of date.',
          'Identify which body to approach for training, for technical guidance and for individual recognition at EngTech.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Representation and pay bargaining</ContentEyebrow>

      <ConceptBlock
        title="Speaking for the trade"
        plainEnglish="Somebody has to be in the room when government, clients and the press talk about electrical work. That is the representation role."
      >
        <p>
          Consultations on building work, on skills funding, on payment practices and on the shape
          of apprenticeships all happen whether or not the trade turns up. A trade association turns
          up. It represents the interests of its member businesses in those rooms, and it does it
          with a mandate, because it can say how many firms and how many employees sit behind it.
        </p>
        <p>
          The second half of the role faces outward. When a story breaks about dangerous
          installations, the public hears from somebody who speaks for the industry. That shapes how
          a householder in Wrexham thinks about the trade before you have knocked on the door.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Negotiating and publishing the terms"
        plainEnglish="A negotiating body settles what the grades are, what they are worth and how the job runs — nationally, in writing, for both sides."
      >
        <p>
          Left to itself, pay in contracting is settled site by site, in a car park, by whoever
          argues hardest. A negotiating body replaces that with one national agreement reached
          between the employer side and the employee side and published as working rules.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Grades.</strong> Defined titles with requirements attached, so &ldquo;approved
            electrician&rdquo; means the same thing in Swansea as it does in Hull.
          </li>
          <li>
            <strong>Rates.</strong> A rate attached to each grade rather than to each argument.
          </li>
          <li>
            <strong>Working rules.</strong> The conditions around the work — how the job is run and
            what the two sides have agreed.
          </li>
          <li>
            <strong>A published document.</strong> The rules are written down, numbered and
            citable. You can point at a clause.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Registration and assessment</ContentEyebrow>

      <ConceptBlock
        title="Policing the front door"
        plainEnglish="An association that lets anyone in is worth nothing to a client. The entry standard is the product."
      >
        <p>
          The aim of the ECA is to ensure that all electrical installation work is carried out to the
          highest standards by properly qualified staff. Consequently &mdash; and that word is doing
          the work &mdash; firms who wish to become members must demonstrate that they have
          procedures, staff and systems of the highest calibre.
        </p>
        <p>
          Unpick what is being examined there. Procedures: how the firm runs a job, from enquiry to
          handover. Staff: who it employs and what they hold. Systems: the machinery behind the
          work, including how it manages quality and safety. Size is not the test at all &mdash;
          member companies range from small traders with only a few employees to large
          multi-national organisations operating on a worldwide basis.
        </p>
        <p>
          You feel this from the inside as an employee. A firm that has been assessed on its
          procedures has procedures. That is why the paperwork is tighter, why the job sheets are
          real, and why nobody asks you to sign something you did not do.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="301-1-2-check-1"
        question="An association requires applicant firms to demonstrate procedures, staff and systems of the highest calibre. What is that requirement for?"
        options={[
          'It is a tax requirement placed on contracting firms',
          'It replaces the need for the firm’s electricians to hold qualifications',
          'It is an annual assessment of each individual employee',
          'It is an entry standard applied to the business, so that membership means something to a client',
        ]}
        correctIndex={3}
        explanation="The aim is that all electrical installation work is carried out to the highest standards by properly qualified staff, so entry is gated on the business proving its procedures, staff and systems. It assesses the firm, not each employee, and it does not replace anybody’s qualifications."
      />

      <SectionRule />

      <ConceptBlock
        title="Running the card and grading scheme"
        plainEnglish="The card states your discipline and your standard of skills. On a lot of sites it is the difference between working and going home."
      >
        <p>
          A grading scheme is only as good as its proof. The card is the proof: a physical statement
          of which electrical discipline you work in and what standard of skills you have been
          assessed at, tied to the grades the negotiating body has agreed.
        </p>
        <p>
          The rules give it teeth. Operatives supplied by a participating Employment Business to a
          member firm must hold a current and valid card denoting the appropriate electrical
          discipline and the standard of skills. Three separate conditions sit in that one sentence:
          current, the right discipline, the right standard.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Current.</strong> In date on the day, not in date when the agency last looked.
          </li>
          <li>
            <strong>Appropriate discipline.</strong> The card has to match the work you are being
            sent to do.
          </li>
          <li>
            <strong>Standard of skills.</strong> The grade shown is the grade you can be used at.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-1-2-check-2"
        question="You are sent by an agency to a member firm’s site. Your card is in date but shows a different electrical discipline from the work you have been booked for. What is the position?"
        options={[
          'The card must denote the appropriate electrical discipline as well as being current, so it does not satisfy the rule',
          'It is fine — any in-date card is acceptable',
          'It is fine as long as the agency confirms your experience in writing',
          'It is fine because the requirement applies only to directly employed operatives',
        ]}
        correctIndex={0}
        explanation="The requirement is a current and valid card denoting the appropriate electrical discipline(s) and the standard of skills. In date is only one of the three conditions, and the rule is aimed squarely at operatives supplied by an Employment Business."
      />

      <SectionRule />

      <ContentEyebrow>Guidance and technical publications</ContentEyebrow>

      <ConceptBlock
        title="Publishing the guidance you actually use"
        plainEnglish="Standards bodies and professional institutions turn argument into a document you can point at."
      >
        <p>
          A large part of what these organisations do ends up in your hand as paper. Standards
          bodies publish the standards the trade works to. Professional institutions publish
          standards and guidance for the discipline. Between them they produce the documents you
          reach for when a job is not obvious.
        </p>
        <p>
          The role matters most in a disagreement. &ldquo;Because I have always done it that
          way&rdquo; loses. A clause number wins, and it wins quickly, because the other side can go
          and read the same sentence you did.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Training and recognition</ContentEyebrow>

      <ConceptBlock
        title="Supporting training and apprenticeships"
        plainEnglish="Somebody has to keep the pipeline full, and it is not left to individual firms to work out alone."
      >
        <p>
          Awarding organisations and training providers carry this role directly: one issues the
          qualification, the other delivers the learning and runs the apprenticeship. But the
          associations and negotiating bodies sit behind it too, because grades, entry standards and
          the supply of qualified staff are all the same problem seen from different sides.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>The qualification.</strong> Written, assessed and issued by the awarding
            organisation.
          </li>
          <li>
            <strong>The delivery.</strong> College or provider teaching, workshop time and the
            portfolio.
          </li>
          <li>
            <strong>The placement.</strong> An employer providing the real work the portfolio
            evidences.
          </li>
          <li>
            <strong>The destination.</strong> A grade, a card and a recognised route onward.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock
        title="Giving you a route to recognition"
        plainEnglish="One role in this unit attaches to you as a person and follows you for the rest of your working life."
      >
        <p>
          Almost everything else here belongs to a firm, a site or a contract. Professional
          registration does not. Professional institutions register individuals by competence at
          defined levels, and completion of the apprenticeship is designed to be recognised by
          relevant Professional Engineering Institutions at the appropriate level of professional
          registration, EngTech.
        </p>
        <p>
          Think about what that is worth over thirty years. It does not lapse when you change
          employer. It is understood outside contracting, which matters if you move into design,
          inspection, commissioning or training. It gives a client or an employer a way to check
          your standing that does not depend on your last job.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Matching the body to the problem</ContentEyebrow>

      <ConceptBlock
        title="Which body for which problem"
        plainEnglish="Pick the body by the kind of problem you have. Most wasted phone calls are category errors."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>My grade or my rate is wrong.</strong> That is the negotiating body&rsquo;s
            territory, through the published working rules and your employer.
          </li>
          <li>
            <strong>My card is out of date or shows the wrong discipline.</strong> The card scheme,
            and do it before the booking, not on the morning.
          </li>
          <li>
            <strong>I need to settle a technical point.</strong> The published standard or the
            institution&rsquo;s guidance. Quote the clause.
          </li>
          <li>
            <strong>I want recognition that is mine.</strong> A professional institution, at the
            appropriate level of registration.
          </li>
          <li>
            <strong>A qualification or an apprenticeship problem.</strong> The provider first, the
            awarding organisation if it is about the certificate itself.
          </li>
          <li>
            <strong>A serious safety concern nobody is acting on.</strong> The enforcing authority
            for health and safety on construction work.
          </li>
        </ul>
        <p>
          And one with no door: none of them signs your certificates or does your paperwork.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="301-1-2-check-3"
        question="Which role in this unit produces recognition that stays with the individual rather than with the business?"
        options={[
          'Trade association membership held by the employer',
          'The employer’s entry assessment on procedures, staff and systems',
          'The negotiating body’s published national working rules',
          'Professional registration with an institution at a level such as EngTech',
        ]}
        correctIndex={3}
        explanation="Professional institutions register individuals by competence at defined levels. Association membership, the entry assessment behind it and the national working rules all attach to firms or to the industry, not to you."
      />

      <SectionRule />

      <RegsCallout
        source="JIB National Working Rules"
        clause="17.2.2.4"
        meaning="Any operatives supplied by a participating Employment Business to a JIB Member Firm must hold a current and valid ECS Card denoting the appropriate electrical discipline(s) and the standard of skills. In plain terms: when you go through an agency, the card is the gate. It has to be in date, it has to show the right discipline for the work, and it has to show the standard of skills you are being used at. Miss any one of the three and the member firm has a rule it cannot ignore, whatever it thinks of your ability."
        cite="JIB National Working Rules"
      />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating the card as a formality you can sort out later"
        whatHappens={
          <>
            The card sits in the back of the wallet for two years and nobody looks at it. Then a
            booking comes in through an agency, the gatehouse scans it, and it is a month out of
            date &mdash; or it is still showing the discipline you worked in three jobs ago. You are
            turned around at the gate. The shift is gone, the agency has to fill it with somebody
            else at short notice, and the renewal you now have to do urgently is the same renewal
            you could have done quietly in the spring.
          </>
        }
        doInstead={
          <>
            Put the expiry date in your phone with a reminder two months before it, the same way you
            do with the van MOT. Check the discipline printed on it against the work you are being
            booked for, and ask the agency which discipline the client requires before you accept.
            If your grade has changed, get the card changed &mdash; a card showing the old standard
            is not evidence of the new one.
          </>
        }
      />

      <CommonMistake
        title="Taking the problem to whichever body you can think of"
        whatHappens={
          <>
            <p>
              Your grade on site does not match the work you are doing, so you email the awarding
              organisation whose name is on your certificate. Three weeks later a polite reply says
              it is not their area. The job has moved on and you have been paid at the old grade
              for another month, over a question the published working rules and your employer
              could have settled in a morning.
            </p>
            <p>
              It happens the other way round too. A technical argument about how something should
              have been done gets taken to the association your employer belongs to, when what
              would have ended it in two minutes was a clause number in the published standard
              sitting on the van shelf.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Match the problem to the job the body actually does. Grade or rate: the negotiating
              body&rsquo;s published working rules, through your employer. Card out of date or
              showing the wrong discipline: the card scheme, and before the booking. A technical
              point: the published standard or the institution&rsquo;s guidance, quoted by clause.
              Recognition that is yours: a professional institution. A qualification or
              apprenticeship problem: the provider first, the awarding organisation if it is about
              the certificate itself. A serious safety concern nobody is acting on: the enforcing
              authority.
            </p>
            <p>
              And keep in mind the one with no door. None of them signs your certificates or does
              your paperwork, so a phone call is never a substitute for the job in front of you.
            </p>
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="Bridgend &mdash; turned round at the gate at half six"
        situation={
          <>
            An agency rings on the Thursday with a three-week fit-out on a distribution unit outside
            Bridgend for a member firm. Good rate, 7am starts. You leave Merthyr Tydfil at half five
            on the Monday. At the gatehouse the security officer scans your card, turns the screen
            round, and it expired eleven days ago. The supervisor is apologetic and completely
            immovable: operatives supplied by an Employment Business to a member firm have to hold a
            current and valid card denoting the appropriate discipline and the standard of skills,
            and yours is not current.
          </>
        }
        whatToDo={
          <>
            On the day, there is nothing to do but drive home &mdash; arguing at a gatehouse has
            never once worked. The fix is upstream. When the agency rings, check the expiry date and
            the discipline on the card before you say yes, and tell them what it says. Start the
            renewal the moment you are inside two months of expiry, not the week it runs out. If a
            booking straddles the expiry date, sort the renewal before the start, because being
            three days into a job when it lapses is worse than not starting.
          </>
        }
        whyItMatters={
          <>
            Count the real cost. A day&rsquo;s pay gone, an hour and a half each way in fuel, and
            the first three weeks of a decent run handed to somebody else. Then the part that lasts:
            the agency had to make an awkward call to a client on a Monday morning, and the next
            time a good three-week booking lands, they ring the sparks they are not worried about.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'My employer is an association member. Does that get me onto site?',
            answer:
              'No. The membership belongs to the business and says nothing about you. What gets you through the gate is your own card — current, showing the appropriate electrical discipline and the standard of skills — plus whatever the site itself requires by way of induction.',
          },
          {
            question: 'Are national working rules the law?',
            answer:
              'They are not legislation. They are terms agreed between the employer side and the employee side and published as rules, and they bind member firms and the operatives working for them. Health and safety law is separate, and enforcement of it on construction work sits with the Health and Safety Executive.',
          },
          {
            question: 'Is professional registration worth it for someone who only does installation?',
            answer:
              'It is the one thing in this unit that attaches to you rather than to a firm or a contract. Completion of the apprenticeship is designed to be recognised by relevant Professional Engineering Institutions at the appropriate level, EngTech. It does not lapse when you change employer, and it is understood if you later move into design, inspection or training.',
          },
          {
            question: 'Which body do I contact if my grade on site does not match what I am doing?',
            answer:
              'Start with your employer and the published working rules, because the grade and the rate attached to it come from the national agreement, not from a local decision. If the card itself shows the wrong standard of skills or the wrong discipline, that is a card scheme matter and it needs correcting before your next booking.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'The bodies around the trade do seven jobs: represent, negotiate, police entry, publish, card and grade, train, and recognise individuals.',
          'Representation is influence, not enforcement — a trade association speaks for member businesses to government, clients and the public, but it compels nobody.',
          'A negotiating body replaces site-by-site bargaining with national grades, rates and working rules agreed between both sides and published.',
          'The ECA’s aim is that all electrical installation work is carried out to the highest standards by properly qualified staff, which is why entry is gated on procedures, staff and systems of the highest calibre.',
          'Firm size is not the entry test: member companies range from small traders with a few employees to large multi-nationals.',
          'Under JIB National Working Rule 17.2.2.4 an operative supplied by an Employment Business to a member firm must hold a current and valid ECS Card denoting the appropriate discipline(s) and the standard of skills.',
          'Published standards and guidance let you settle a technical argument with a clause number instead of an opinion.',
          'Professional registration at EngTech is the only recognition here that is yours, survives a change of employer and is understood outside contracting.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Trade bodies and organisations — what they do" />
    </div>
  );
}
