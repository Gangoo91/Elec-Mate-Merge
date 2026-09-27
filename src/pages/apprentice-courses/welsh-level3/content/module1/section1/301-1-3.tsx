/**
 * Unit 301 — Understanding the building services engineering sector
 * Learning outcome 1 — Know the relevant trade bodies and organisations within the sector
 * Criterion 1.3 — The competence card schemes within the building services engineering
 * sector and the types of cards available
 *
 * Approach: this page teaches the principle of carding AND the concrete landscape the
 * criterion asks for. A card is a portable, third-party-checked claim about competence
 * tied to a named discipline and grade; it gets you through a gate without the gate
 * re-assessing you. The durable learning is what a card proves, what it does not prove,
 * who owns it, and how it sits alongside the legal duty to judge skills, knowledge,
 * training and experience.
 *
 * Grounded and therefore stated: the Electrotechnical Certification Scheme (ECS) by name;
 * the SJIB history of the Grading system for Electrical Installation Operatives and the
 * incorporation of the ECS (Grade) Cards into ECS; the published purpose of the ECS (Grade)
 * Card; and the graded titles listed in the JIB Handbook 2026, grouped as the handbook
 * groups them. JIB National Working Rules 17.2.2.4 and 17.3.3.1.1 and the CDM point on
 * sole reliance are quoted as before.
 *
 * Still deliberately NOT asserted, because none of it could be verified against a primary
 * source: card colours, validity periods or expiry durations, fees, application routes,
 * the qualification codes required for any grade, and assessment or renewal intervals. The
 * grade list is not presented as exhaustive; learners are told to read the scheme's own
 * published criteria for anything in that list.
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
    question: 'ECS is the abbreviation for which scheme?',
    options: [
      'The Electrotechnical Certification Scheme',
      'The Electrical Competence Standard',
      'The Engineering Construction Scheme',
      'The Electrical Contractors Society',
    ],
    correctAnswer: 0,
    explanation:
      'ECS stands for the Electrotechnical Certification Scheme. It is the scheme named in the JIB National Working Rules, and the SJIB ECS (Grade) Card continues to show the Grade held.',
  },
  {
    id: 2,
    question: 'A card is best described as which of the following?',
    options: [
      'Evidence of competence',
      'Competence itself',
      'A guarantee that the holder cannot make a mistake',
      'Proof that the holder is employed by a member firm',
    ],
    correctAnswer: 0,
    explanation:
      'Evidence and competence are not the same thing. The card records a judgement made on a date against a defined standard. Competence is what the person can actually do today.',
  },
  {
    id: 3,
    question: 'Which of the following is a graded title listed in the JIB Handbook?',
    options: [
      'Approved Electrician',
      'Registered Site Operative',
      'Certified Cable Technologist',
      'Qualified Installation Manager',
    ],
    correctAnswer: 0,
    explanation:
      'Approved Electrician is one of the graded titles the handbook lists, alongside Advanced Craftsperson, Cable Foreman and Approved Jointer. The grade on the card is the type of card, so learn the titles as they are actually written.',
  },
  {
    id: 4,
    question: 'What does the JIB National Working Rules require of operatives supplied by a participating employment business to a member firm?',
    options: [
      'They must hold a current and valid ECS Card denoting the appropriate electrical discipline or disciplines and the standard of skills',
      'They must be directly employed by the member firm within four weeks',
      'They must hold a card issued by the site principal contractor',
      'They must be re-tested on arrival by the member firm',
    ],
    correctAnswer: 0,
    explanation:
      'Rule 17.2.2.4 states it plainly. The agency operative has to arrive already carded for the discipline and standard of skills the work needs.',
  },
  {
    id: 5,
    question: 'Cards expire and have to be renewed. What is the purpose of that?',
    options: [
      'It keeps the claim current, because a check made years ago stops being a reliable statement about somebody today',
      'It spreads the scheme administration evenly across the year',
      'It forces holders to retake their original qualification from scratch',
      'It allows the scheme to change the card design regularly',
    ],
    correctAnswer: 0,
    explanation:
      'A card with no end date would be a claim about a person as they were, not as they are. Renewal is how the scheme refreshes the claim.',
  },
  {
    id: 6,
    question: 'You move from one firm to another. What happens to your card?',
    options: [
      'It belongs to you and travels with you, because it records your competence and not your employer',
      'It is cancelled and a new one is issued in the new firm name',
      'It stays with the old employer until your final pay is settled',
      'It becomes invalid until the new employer countersigns it',
    ],
    correctAnswer: 0,
    explanation:
      'The card is held by the individual. That portability is why it is worth having, and why a site can trust it independently of who is paying you this month.',
  },
  {
    id: 7,
    question: 'Under CDM 2015, what does HSE guidance say about relying on cards?',
    options: [
      'Sole reliance should not be placed on cards or certificates when judging whether somebody has the skills, knowledge, training and experience for the work',
      'A valid card removes the need to make any judgement about the worker',
      'Cards are the only acceptable evidence a contractor may consider',
      'Cards must be verified by the Health and Safety Executive before work starts',
    ],
    correctAnswer: 0,
    explanation:
      'The card is one input. The duty holder still has to be satisfied the person has the skills, knowledge, training and experience for the actual task in front of them.',
  },
  {
    id: 8,
    question: 'What is the correct way to find out which card types a scheme offers and what each one requires?',
    options: [
      'Read the published criteria of the scheme operator itself, because the types and requirements are set by the scheme and change over time',
      'Ask the gateman on the first site that turns you away',
      'Assume the card types match the qualification titles on your certificates',
      'Copy whatever card the most experienced person on your team holds',
    ],
    correctAnswer: 0,
    explanation:
      'Card types, entry routes and renewal arrangements are published by the scheme itself. That published source is the only safe one, and it is the one an assessor will expect you to have used.',
  },
];

export default function Lesson301_1_3() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'A competence card is a portable claim about you that an independent scheme has already checked, so a site can verify you quickly instead of re-assessing you.',
          'The card names a discipline and a level. It says what you are carded for, and nothing beyond that.',
          'Cards are granted against qualifications plus, generally, assessed experience and a health-and-safety element, and they expire so the claim stays current.',
          'The JIB National Working Rules require agency-supplied operatives and temporary self-employed operatives working for a member firm to hold a current and valid ECS Card for the appropriate discipline.',
          'A card is evidence, not competence. CDM guidance is explicit that sole reliance should not be placed on cards or certificates.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain what a competence card is, name the Electrotechnical Certification Scheme (ECS) as the scheme behind the card, and say why a site accepts one instead of assessing you at the gate.',
          'Describe the difference between evidence of competence and competence itself, and say why that difference matters on site.',
          'Identify the graded titles an ECS Grade Card can carry, from the Apprentice and Trainee stages up to the Technician and Supervisor grades, and place yourself on that ladder.',
          'Explain why a card is tied to a stated discipline and grade, and what that means for work outside it.',
          'State what the JIB National Working Rules require of agency-supplied and temporary self-employed operatives working for a member firm.',
          'Explain how card checking sits alongside the CDM duty to judge skills, knowledge, training and experience.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>What a card proves</ContentEyebrow>

      <ConceptBlock
        title="What a card actually is"
        plainEnglish="Somebody independent has checked you, and the card is how you carry that check around."
      >
        <p>
          Think about what happens at a gate on a Monday morning. Forty people turn up.
          The site cannot test any of them. It has no time, no test rig and no authority to
          assess an electrician&rsquo;s skill in a Portakabin. What it can do is read a card.
        </p>
        <p>
          That is the whole mechanism. A competence card is a portable claim about you that
          somebody else has already checked against a published standard. The scheme did the
          checking. The site reads the result. You get through the gate in two minutes instead
          of spending a week proving yourself again to every new client.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Evidence of competence, not competence"
        plainEnglish="The card records a judgement made on a date. It does not do the work."
      >
        <p>
          This distinction is the one assessors push hardest on, and it is the one that gets
          people hurt when it is ignored. A card is evidence. Competence is what you can
          actually do, safely, today, on the job in front of you.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Evidence.</strong> A record that a defined check was passed against a defined
            standard on a defined date.
          </li>
          <li>
            <strong>Competence.</strong> The live combination of skill, knowledge, training and
            experience that lets you do this particular task without harming anybody.
          </li>
          <li>
            <strong>The gap between them.</strong> Time. Skills decline if they are not used
            regularly, and a card issued three years ago says nothing about whether you have
            terminated a single SWA since.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The scheme behind the card</ContentEyebrow>

      <ConceptBlock
        title="ECS — the Electrotechnical Certification Scheme"
        plainEnglish="ECS is the scheme. The card it issues is a grade card, and the grade is the claim."
      >
        <p>
          The scheme you meet first in this industry is the Electrotechnical Certification
          Scheme, abbreviated to ECS. It is the scheme named in the JIB National Working Rules,
          and an ECS Card is what an agency or a member firm asks you for.
        </p>
        <p>
          Grading is older than the card. Since 1969 the SJIB has administered the Grading system
          for Electrical Installation Operatives, and more recently the ECS (Grade) Cards were
          incorporated into the Electrotechnical Certification Scheme. The SJIB ECS (Grade) Card
          continues to show the cardholder&rsquo;s Grade. That history is why people on site still
          talk about being &ldquo;graded&rdquo; rather than being &ldquo;carded&rdquo;. They mean
          the same thing.
        </p>
        <p>
          The scheme states its own purpose plainly. The ECS (Grade) Card exists &ldquo;to ensure
          that Operatives in the construction industry are assessed as technically competent to
          defined industry standards and have the appropriate training and qualifications for the
          job they do, thereby helping to improve standards and safety&rdquo;.
        </p>
        <p>
          Read that sentence twice, because it tells you what the card is doing. It is not a
          permit and it is not a membership badge. It records that somebody was assessed against
          a defined industry standard, and that they hold the training and qualifications for the
          job they do. Competent-person schemes are a different arrangement again &mdash; those
          are about registering a business so that notifiable work can be self-certified, not
          about grading an individual operative. One does not stand in for the other.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Discipline, level and grading</ContentEyebrow>

      <ConceptBlock
        title="Discipline and level: what you are carded FOR"
        plainEnglish="A card is a claim about a specific trade at a specific standard, not a general badge."
      >
        <p>
          A card that just said &ldquo;competent&rdquo; would be useless. Competent at what? At
          which standard? The value of a card is that it narrows the claim down to something a
          site can act on.
        </p>
        <p>
          So a card carries an occupation or discipline and a level or standard of skills. The JIB
          National Working Rules make this explicit for agency operatives: the card has to denote
          &ldquo;the appropriate electrical discipline(s) and the standard of skills&rdquo;. Those
          two things are the substance. Everything else printed on a card is packaging.
        </p>
        <p>
          The practical consequence: a card for one discipline does not carry across to another.
          Being carded as an electrician does not make you a carded fire alarm commissioning
          engineer, a carded HV operative or a carded confined-space entrant. Different discipline,
          different claim, different card.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The types available: the grade ladder</ContentEyebrow>

      <ConceptBlock
        title="The graded titles a card can show"
        plainEnglish="The grade is the type of card. Find yourself on this list."
      >
        <p>
          When the criterion asks about the types of cards available, this is what it means: the
          grade the card carries. The JIB Handbook lists the graded titles in bands. They are set
          out below in the handbook&rsquo;s own grouping, from the technician and supervisory
          grades at the top down to the apprentice stages at the bottom.
        </p>
        <ul className="space-y-2 text-white">
          <li>Site/Installation Technician · Mechanical Technician · Cable Installation Supervisor</li>
          <li>Approved Electrician · Advanced Craftsperson · Cable Foreman · Approved Jointer</li>
          <li>Electrician (including Domestic Electrician) · Craftsperson · Leading Cable Hand · Jointer</li>
          <li>
            ECS Experienced Worker Cardholder · Trainee Electrician (Stage 3) · Mechanical Trainee
            (Stage 3)
          </li>
          <li>Trainee Electrician (Stage 2) · Mechanical Trainee (Stage 2)</li>
          <li>
            Trainee Electrician (Stage 1) · Mechanical Trainee (Stage 1) · Electrical Labourer ·
            Cable Hand
          </li>
          <li>Apprentice (Stage 1) · Apprentice (Stage 2) · Apprentice (Stage 3) · Apprentice (Stage 4)</li>
        </ul>
        <p>
          The handbook also notes &ldquo;(or equivalent specialist grade)&rdquo; against several of
          these, so a specialist discipline can sit alongside the mainstream title rather than
          having to be forced into it.
        </p>
        <p>
          Three things to take from that list. Learn the titles as they are actually written,
          because &ldquo;Approved Electrician&rdquo; and &ldquo;Electrician&rdquo; are different
          grades and an assessor will notice if you use them loosely. Find your own position on it:
          as a Level 3 apprentice you sit on the Apprentice stages, and the stage moves as you
          progress. And treat the list as the shape of the ladder rather than the whole of it, as
          grades are set by the scheme and change.
        </p>
        <p>
          What the list deliberately does not give you is the entry criteria. The qualifications and
          assessment behind each grade, and the arrangements for renewal, are published by the
          scheme and are revised from time to time. Read the scheme&rsquo;s own published criteria
          before you apply, and never quote a colour, a fee or a validity period from memory.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="301-1-3-check-1"
        question="A site gateman checks your card and lets you on. What has the site established?"
        options={[
          'That you are competent to carry out every task on that site',
          'That your employer has accepted liability for your work',
          'That you have been assessed by that site for this project',
          'That an independent scheme checked you against a published standard for a stated discipline and level',
        ]}
        correctIndex={3}
        explanation="The gate check confirms the existence and scope of a third-party check. It is not an assessment by the site, and it says nothing about tasks outside the discipline on the card."
      />

      <SectionRule />

      <ContentEyebrow>Granting, renewal and expiry</ContentEyebrow>

      <ConceptBlock
        title="How a card is granted, and why it expires"
        plainEnglish="Qualifications, generally assessed experience, a health-and-safety element, and an end date."
      >
        <p>
          Schemes differ, and the exact entry routes are published by each scheme rather than being
          something you can safely assume. But the shape is consistent enough to learn, and it tells
          you what a card is really claiming.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Qualification.</strong> Proof that the underpinning knowledge and skill has been
            formally assessed. This is what your Level 3 and your competence assessment are for.
          </li>
          <li>
            <strong>Assessed occupational experience.</strong> Generally required, because a
            qualification alone shows you passed, not that you have worked. Some routes exist for
            people with long experience and no modern qualification.
          </li>
          <li>
            <strong>A health-and-safety element.</strong> Usually a test or assessment, because a
            site is admitting you to a hazardous environment and wants evidence you will not be a
            danger in it.
          </li>
          <li>
            <strong>An expiry.</strong> The card runs for a fixed period set by the scheme and then
            has to be renewed.
          </li>
        </ul>
        <p>
          Do not guess the specifics. The card types, the entry criteria for each, and the renewal
          arrangements are published by the scheme operator and they change. Check the published
          source before you apply, and check it again before you advise anybody else.
        </p>
        <p>
          The expiry matters more than people think. A card is a claim about a living person, and
          people change employers, change disciplines and lose currency in skills they no longer
          use. HSE guidance on CDM 2015 makes the point directly: skills decline if they are not
          used regularly. A card with no end date would slowly become a lie the scheme had put its
          name to, so renewal is the mechanism that keeps the claim honest. It is also, bluntly,
          the thing that catches people out: an expired card is treated as no card, and no card is
          treated as no access.
        </p>
      </ConceptBlock>

      <SectionRule />

      <RegsCallout
        source="JIB National Working Rules"
        clause="17.2.2.4 and 17.3.3.1.1"
        meaning="Rule 17.2.2.4 states that any operatives supplied by a participating Employment Business to a JIB Member Firm must hold a current and valid ECS Card denoting the appropriate electrical discipline(s) and the standard of skills. Rule 17.3.3.1.1 states that any temporary self-employed operative must have been JIB graded or approved for inclusion under the appropriate qualification of the Electrotechnical Certification Scheme and be the holder of a current ECS Card. In plain terms: if you come through an agency or you turn up self-employed to work for a member firm, the card is a condition of the placement, it has to be current, and it has to cover the right discipline."
        cite="JIB National Working Rules"
      />

      <SectionRule />

      <ContentEyebrow>Who needs one, and who owns it</ContentEyebrow>

      <ConceptBlock
        title="Access, agencies and the self-employed"
        plainEnglish="No card can mean no work, and that is written into the rules for agency and temporary self-employed operatives."
      >
        <p>
          On a lot of commercial and industrial work, site access depends on holding the right card.
          That is a commercial arrangement between the client, the principal contractor and the
          firms on site, and it is enforced at the gate rather than by an inspector.
        </p>
        <p>
          For agency and temporary self-employed operatives the requirement is harder than a site
          rule. The JIB National Working Rules set it out directly, and the two rules quoted above
          are the ones to know. An employment business supplying operatives to a member firm has to
          supply carded people, carded for the right discipline and standard of skills. A temporary
          self-employed operative has to hold a current card as well.
        </p>
        <p>
          The practical read-across for you: if you ever work through an agency, or you go
          self-employed and pick up work with a member firm, your card is not a nice-to-have. It is
          part of whether the placement is allowed to happen at all. Let it lapse and you have not
          just lost a card, you have lost the ability to be supplied.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The card is yours"
        plainEnglish="It records your competence, so it travels with you between employers."
      >
        <p>
          Your employer may pay for the card. Your employer may organise the application and remind
          you when it is due. None of that makes it theirs.
        </p>
        <p>
          The card is a statement about an individual. That is what makes it portable, and
          portability is most of its value to you. You can leave a firm on a Friday, start somewhere
          else on a Monday, and walk onto the new site with the same evidence. Nobody has to rebuild
          your credibility from scratch.
        </p>
        <p>
          Two habits follow from that. First, know your own renewal date rather than assuming an
          office will chase you. Second, keep your own copies of the qualifications and evidence
          that supported the application, because the day you need them again is usually the day you
          no longer have access to a former employer&rsquo;s filing cabinet.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="301-1-3-check-2"
        question="An employment business supplies you to a JIB member firm. Under the National Working Rules, what must be true of your card?"
        options={[
          'It must have been issued within the last twelve months',
          'It must be current and valid, and denote the appropriate electrical discipline or disciplines and the standard of skills',
          'It must be countersigned by the member firm before you start',
          'It must be held on file by the employment business rather than by you',
        ]}
        correctIndex={1}
        explanation="Rule 17.2.2.4 requires a current and valid card denoting the appropriate discipline or disciplines and the standard of skills. The rule is about currency and scope, not about who keeps the plastic."
      />

      <SectionRule />

      <ContentEyebrow>At the gate, and across the UK</ContentEyebrow>

      <ConceptBlock
        title="The gate check is a paperwork check"
        plainEnglish="Somebody reading your card is confirming a document exists. They are not assessing you."
      >
        <p>
          It is worth being honest about what happens at the gate. A person looks at a card,
          possibly scans or verifies it, ticks a box and hands it back. That is a document check. It
          is a good and useful one, but it is not a competence assessment and it was never meant to
          be.
        </p>
        <p>
          The legal duty sits elsewhere. Under CDM 2015, a contractor must not appoint anybody to
          carry out work unless satisfied that they have the skills, knowledge, training and
          experience to do it, or are in the process of obtaining them. HSE guidance is explicit
          that sole reliance should not be placed on cards or certificates, and that skills decline
          if they are not used regularly.
        </p>
        <p>
          So the card is one input into that judgement, alongside what the person has actually done
          recently, what supervision is in place, and what the task in front of them requires.
          Treating the card as the whole answer is exactly the error the guidance warns about.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Arrangements differ across the UK"
        plainEnglish="Do not assume what applies in Wales applies everywhere, and check before you quote anything."
      >
        <p>
          The electrical industry in Scotland has its own joint industry board arrangements, separate
          from the arrangements that apply in England and Wales. Grading, agreements and the
          machinery around them are not identical across the UK.
        </p>
        <p>
          For a Welsh apprentice this matters in two situations. If you take work in Scotland, do not
          assume the arrangements you learned here transfer unchanged. And if you are asked in an
          assessment to describe the industry, be precise about which arrangements you are describing
          rather than speaking as though one set covers the whole country.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating one card as a licence for everything"
        whatHappens={
          <>
            An improver is carded for electrical installation work and gets waved onto a site
            without anybody looking closely at the discipline on the card. A week later the site
            needs someone to work on the fire alarm system and, because he is &ldquo;the carded
            spark&rdquo;, he gets asked. He has never commissioned a panel. He does it anyway
            because the card got him through the gate and nobody questioned it since. The card
            said what he was carded for. Nobody read that part.
          </>
        }
        doInstead={
          <>
            Read the discipline and level on the card as the actual content of the claim, not the
            small print. Before taking on work, ask whether it sits inside what you are carded and
            assessed for. If it does not, say so and ask for the training, supervision or the right
            person. That is not weakness, it is the CDM test applied honestly: skills, knowledge,
            training and experience for <em>this</em> work, with sole reliance not placed on the
            card.
          </>
        }
      />

      <CommonMistake
        title="Passing on card facts from memory"
        whatHappens={
          <>
            <p>
              An apprentice asks you in the van which card she should be applying for, what it
              costs and how long it runs. You answer off the top of your head, because you went
              through it yourself a couple of years ago and you remember it well enough. She takes
              you at your word, applies for the wrong thing, and finds out weeks later when it
              comes back.
            </p>
            <p>
              The detail is exactly the part that moves. Card types, the entry criteria behind each
              of them and the renewal arrangements are published by the scheme and revised from
              time to time, so what you are repeating is what was true on the day you applied, not
              what is true for her.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Give her the shape and send her to the source. The shape is safe to teach: a card
              type is defined by a discipline and a level, and the route into it normally combines
              a qualification, assessed occupational experience and a health-and-safety element,
              with an expiry on the end. Everything past that comes from the scheme&rsquo;s own
              published criteria, in their current version.
            </p>
            <p>
              Hold yourself to the same rule. Read the published criteria before you apply, and
              read them again before you advise anybody else &mdash; never quote a colour, a fee or
              a validity period from memory.
            </p>
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="Turned away at a Port Talbot gate on a Monday morning"
        situation={
          <>
            You are eighteen months out of your apprenticeship and picking up agency work. The
            agency places you on a large industrial job in Port Talbot, six weeks, good rate, start
            Monday at seven. You get there at half six. The gateman scans your card and tells you it
            expired eleven days ago. You had no idea; your last employer used to handle renewals and
            you left in March. The agency contact does not answer until eight, and when he does he
            tells you the member firm cannot take you, because a supplied operative has to hold a
            current and valid card. You have driven forty minutes, lost the placement, and the
            renewal will take longer than the job would have started.
          </>
        }
        whatToDo={
          <>
            On the day: do not argue at the gate, because the gateman has no discretion and no
            authority to assess you. Ring the agency, tell them plainly that the card has lapsed and
            ask them to hold the placement if they can. Then start the renewal immediately through
            the scheme&rsquo;s own published process, and get the evidence together the same day
            rather than over the following week. Going forward: diary your own expiry date twelve
            weeks out, keep your own copies of the qualifications that supported the application,
            and never assume an office is tracking it for you once you have left that office.
          </>
        }
        whyItMatters={
          <>
            Six weeks of work at a decent industrial rate is real money, and it went because of a
            date nobody was watching. The rules here are not a site preference either: the JIB
            National Working Rules require an operative supplied by an employment business to a
            member firm to hold a current and valid card for the appropriate discipline. Lapse it
            and you are not a carded operative with an admin problem, you are an operative the firm
            is not permitted to take. The card is yours, which means the renewal is yours too.
          </>
        }
      />

      <SectionRule />

      <InlineCheck
        id="301-1-3-check-3"
        question="A supervisor says the card check at the gate proves the worker is competent for the job. What is wrong with that?"
        options={[
          'Nothing is wrong, because a valid card is conclusive proof of competence',
          'The gate check is only valid if the Health and Safety Executive witnesses it',
          'The gate check confirms a document, while CDM guidance says sole reliance should not be placed on cards or certificates when judging skills, knowledge, training and experience',
          'Cards cannot be used as evidence of anything at all',
        ]}
        correctIndex={2}
        explanation="A card is one input. The contractor still has to be satisfied the person has the skills, knowledge, training and experience for the work in front of them, and HSE guidance warns against relying on cards alone."
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'Which card should I apply for, and what does each type require?',
            answer:
              'That is published by the scheme operator and it changes, so read the scheme criteria directly rather than taking it from a classmate or a forum. What you can rely on is the shape: a card type is defined by a discipline and a level, and the entry route will normally combine qualification, assessed occupational experience and a health-and-safety element. Match the discipline and level to the work you actually do.',
          },
          {
            question: 'My employer paid for my card. Do they keep it if I leave?',
            answer:
              'No. The card is a statement about you, so it travels with you. Who paid for it does not change whose competence it records. The practical warning is that the reminders often stop when you leave, so put the expiry in your own diary and keep your own copies of the supporting evidence.',
          },
          {
            question: 'If I hold a valid card, can a contractor still refuse to let me do a task?',
            answer:
              'Yes, and sometimes they should. Under CDM 2015 a contractor must be satisfied you have the skills, knowledge, training and experience for the work, or are in the process of obtaining them. HSE guidance says sole reliance should not be placed on cards or certificates. If the task sits outside your discipline, or you have not done that work in years, the card does not settle the question.',
          },
          {
            question: 'Do the same arrangements apply everywhere in the UK?',
            answer:
              'Not exactly. Scotland has its own joint industry board arrangements for the electrical industry, separate from those in England and Wales. Card and grading arrangements are not automatically identical across the UK, so check the arrangements that apply where the work is rather than assuming what you learned in Wales transfers unchanged.',
          },
        ]}
      />

      <SectionRule />

      <KeyTakeaways
        points={[
          'A competence card is a portable claim about you that an independent scheme has already checked, so a site can verify you without re-assessing you at the gate; in this industry that scheme is the Electrotechnical Certification Scheme, ECS.',
          'A card is evidence of competence, not competence itself; competence is what you can safely do on the job in front of you today.',
          'Every card is tied to a stated discipline and grade, and that scope is the substance of the claim rather than small print.',
          'The graded titles the JIB Handbook lists run from Apprentice Stages 1 to 4 and the Trainee stages, through Electrician, Craftsperson and Jointer, up to Approved Electrician, Advanced Craftsperson, Cable Foreman, Approved Jointer and the Technician and Supervisor grades.',
          'Cards are granted against qualifications plus, generally, assessed occupational experience and a health-and-safety element, and they expire and must be renewed so the claim stays current as skills and roles change.',
          'The JIB National Working Rules require operatives supplied by an employment business to a member firm, and temporary self-employed operatives, to hold a current and valid ECS Card for the appropriate discipline.',
          'The card belongs to the individual and travels between employers, so the renewal date is your responsibility once you leave a firm.',
          'A gate check is a paperwork check; CDM 2015 still requires a judgement on skills, knowledge, training and experience, and HSE guidance says sole reliance should not be placed on cards or certificates.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Competence card schemes — check yourself" />
    </div>
  );
}
