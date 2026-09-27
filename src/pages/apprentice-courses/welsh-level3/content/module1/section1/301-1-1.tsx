/**
 * Unit 301 — Understanding Building Services Engineering Practice in Wales (40 GLH)
 * Learning outcome 1 — Know the relevant trade bodies and organisations within the
 * building services engineering sector.
 * Criterion 1.1 — The trade bodies and organisations relevant to the trade.
 *
 * Approach: teach the categories of body first, then place the named examples the
 * grounding supports inside those categories. A learner who can sort a body by what
 * kind of thing it is will always beat a learner who has memorised a list of initials.
 * Nation-specific arrangements are taught, because England, Wales, Northern Ireland
 * and Scotland are not organised the same way.
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
      'Electrical contracting sits alongside plumbing, heating and ventilating, and fire, emergency and security systems. What is the name of that grouping?',
    options: [
      'Building services engineering, itself a sub-set of construction',
      'Manufacturing and light industry',
      'Utilities and energy generation',
      'Facilities management, which sits outside construction',
    ],
    correctAnswer: 0,
    explanation:
      'The electrical contracting, plumbing, engineering maintenance, heating and ventilating, and fire, emergency and security systems industries are part of a larger sector known as construction, and in particular a sub-set of construction known as the building services engineering sector.',
  },
  {
    id: 2,
    question: 'The Electrical Contractors’ Association represents electrical installation companies in which nations?',
    options: [
      'England, Wales and Northern Ireland',
      'England and Scotland only',
      'The whole of the UK and the Republic of Ireland',
      'Wales only',
    ],
    correctAnswer: 0,
    explanation:
      'The ECA represents the interests of electrical installation companies in England, Wales and Northern Ireland. Scotland has its own trade association.',
  },
  {
    id: 3,
    question: 'In which year was the Electrical Contractors’ Association founded?',
    options: ['1901', '1900', '1948', '1971'],
    correctAnswer: 0,
    explanation:
      'The ECA was founded in 1901. The near miss is deliberate: SELECT was founded in 1900, a year earlier, as the Electrical Contractors’ Association of Scotland.',
  },
  {
    id: 4,
    question: 'SELECT is the trade association for the electrical contracting industry in which nation?',
    options: ['Scotland', 'Wales', 'Northern Ireland', 'The Isle of Man'],
    correctAnswer: 0,
    explanation:
      'SELECT is the trade association for the electrical contracting industry in Scotland. Founded in 1900 as the Electrical Contractors’ Association of Scotland, it was the first trade association in the world to serve the electrical industry, and today it is Scotland’s largest construction trade association.',
  },
  {
    id: 5,
    question: 'Who holds a trade association membership?',
    options: [
      'The contracting business',
      'Each individual electrician employed by the business',
      'The client who commissions the work',
      'The college that trained the workforce',
    ],
    correctAnswer: 0,
    explanation:
      'Trade association membership is a firm-level thing. The business applies, the business is assessed, and the business holds the membership. It does not attach to you as an individual.',
  },
  {
    id: 6,
    question:
      'Which kind of body settles national grades, rates of pay and working rules for the electrical contracting industry?',
    options: [
      'An employer and employee negotiating body',
      'A standards body',
      'An awarding organisation',
      'A professional institution',
    ],
    correctAnswer: 0,
    explanation:
      'Negotiating bodies bring employers and the workforce together to settle national terms — grades, rates and working rules — and they operate a grading and card scheme tied to those grades.',
  },
  {
    id: 7,
    question:
      'Completion of the apprenticeship is designed to be recognised by relevant Professional Engineering Institutions at which level of professional registration?',
    options: ['EngTech', 'IEng', 'CEng', 'There is no registration level attached'],
    correctAnswer: 0,
    explanation:
      'Completion of the apprenticeship is designed to be recognised by relevant Professional Engineering Institutions at the appropriate level of professional registration, which is EngTech.',
  },
  {
    id: 8,
    question: 'Which organisation is the enforcing authority for health and safety on construction work?',
    options: [
      'The Health and Safety Executive',
      'The trade association the main contractor belongs to',
      'The awarding organisation that issued your qualification',
      'The negotiating body that sets the working rules',
    ],
    correctAnswer: 0,
    explanation:
      'The Health and Safety Executive is the enforcing authority for health and safety on construction work. It is not a membership body — you do not join it, and no association membership replaces it.',
  },
];

export default function Lesson301_1_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Your trade is one part of building services engineering, which is a sub-set of construction — so many of the bodies around you cover far more than electrical work.',
          'There are six kinds of body worth knowing: trade associations, negotiating bodies, professional institutions, standards bodies, the health and safety enforcing authority, and awarding organisations and training providers.',
          'Trade associations are joined by firms, not by people. The Electrical Contractors’ Association represents electrical installation companies in England, Wales and Northern Ireland.',
          'The UK is not organised the same way everywhere. Scotland has its own trade association, SELECT, and its own joint industry board arrangements.',
          'Learn the categories rather than the initials. New names appear and old ones merge, but the six jobs stay the same.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Place electrical contracting inside the building services engineering sector and explain what sits alongside it.',
          'Name the six kinds of body that operate around the trade and say what makes each kind different.',
          'Describe what the Electrical Contractors’ Association is, who it represents and what a firm must show to join it.',
          'Explain why arrangements differ across the UK, and identify SELECT as the trade association for Scotland.',
          'Sort any unfamiliar organisation you meet on site into the right category from what it does.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>The sector and its bodies</ContentEyebrow>

      <ConceptBlock
        title="The sector you actually work in"
        plainEnglish="Electrical contracting is one trade inside building services engineering, and building services engineering is part of construction."
      >
        <p>
          Start here, because it explains why so many of the organisations you meet are not
          electrical organisations. As the trade puts it: &ldquo;The electrical contracting,
          plumbing, engineering maintenance, heating &amp; ventilating, and fire, emergency and
          security systems industries are some of the many industries that make up a larger sector
          known as construction and in particular, a sub-set of construction known as the building
          services engineering sector.&rdquo;
        </p>
        <p>
          That has a practical consequence on every site you walk onto. The induction, the permit
          system, the site rules and the health and safety enforcement apply to construction as a
          whole. They were not written for sparks. You inherit them.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Six kinds of body, not one long list of initials"
        plainEnglish="Sort every organisation by the job it does. Once you can do that, the names stop mattering so much."
      >
        <p>
          Every organisation that touches the trade does one of six jobs. Learn the six and you can
          place a body you have never heard of from one sentence on its website.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Trade associations.</strong> Represent contracting businesses. Firms join, and
            entry usually means demonstrating capability.
          </li>
          <li>
            <strong>Employer and employee negotiating bodies.</strong> Settle national terms —
            grades, rates and working rules — and operate a grading and card scheme tied to them.
          </li>
          <li>
            <strong>Professional institutions.</strong> Register individuals by competence at
            defined levels, and publish standards and guidance for the discipline.
          </li>
          <li>
            <strong>Standards bodies.</strong> Publish the standards the trade works to.
          </li>
          <li>
            <strong>The enforcing authority.</strong> Enforces health and safety law on construction
            work. Not a membership body.
          </li>
          <li>
            <strong>Awarding organisations and training providers.</strong> Issue the qualifications
            and run the apprenticeships.
          </li>
        </ul>
        <p>
          Two of those six deal with firms, two deal with individuals, one deals with documents and
          one deals with enforcement. If you can say which of those four things a body does, you
          have placed it correctly.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Who firms join</ContentEyebrow>

      <ConceptBlock
        title="Trade associations — firms join, people do not"
        plainEnglish="A trade association is a club for contracting businesses. Your employer is the member; you are not."
      >
        <p>
          The Electrical Contractors&rsquo; Association represents the interests of electrical
          installation companies in England, Wales and Northern Ireland, and is the major
          association working within the electrical installation industry. It was founded in 1901.
          Its member companies range in size from small traders with only a few employees to large
          multi-national organisations operating on a worldwide basis.
        </p>
        <p>
          The aim of the ECA is to ensure that all electrical installation work is carried out to
          the highest standards by properly qualified staff. That aim has teeth at the front door:
          firms who wish to become members must demonstrate that they have procedures, staff and
          systems of the highest calibre.
        </p>
        <p>
          Read that last sentence as an employee. The assessment is of the business — its
          procedures, its staff as a body, its systems. You might be one of the properly qualified
          staff the firm points at, but the membership certificate on the office wall is the
          firm&rsquo;s. If you leave on Friday, it does not come with you.
        </p>
        <p>
          The UK is not organised the same way everywhere. SELECT is the trade association for the
          electrical contracting industry in Scotland. It was founded in 1900 as the Electrical
          Contractors&rsquo; Association of Scotland, which made it the first trade association in
          the world to serve the electrical industry, and today it is Scotland&rsquo;s largest
          construction trade association. If you take work north of the border, or your employer
          bids there, that is the body in the room.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="301-1-1-check-1"
        question="Your employer is a member of an electrical trade association. What does that tell a client about you personally?"
        options={[
          'That you hold a recognised individual qualification',
          'That you have been assessed and graded as an individual',
          'That you can sign off work anywhere in the UK',
          'Nothing directly — the membership belongs to the business, not to you',
        ]}
        correctIndex={3}
        explanation="Trade association membership is assessed at firm level: procedures, staff and systems. It says something about the business you work for. Your own standing comes from your qualifications, your grade and any individual registration you hold."
      />

      <SectionRule />

      <ContentEyebrow>Negotiating bodies and institutions</ContentEyebrow>

      <ConceptBlock
        title="Employer and employee negotiating bodies"
        plainEnglish="A joint body where employers and the workforce settle national terms, and run the grading and card scheme that goes with them."
      >
        <p>
          This is the body that decides, nationally, what an electrician is called and what that
          title is worth. It brings the employer side and the employee side together and settles
          the terms both work to — the grades, the rates attached to those grades, and the working
          rules that cover how the job is run.
        </p>
        <p>
          The output is a published set of national working rules. They are not law. They bind
          member firms and the operatives working for them, which in practice covers a large slice
          of contracting work, especially on bigger sites.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Grades.</strong> A ladder of defined titles from apprentice upwards, each with
            requirements attached.
          </li>
          <li>
            <strong>Rates and working rules.</strong> The national terms that sit behind the grade.
          </li>
          <li>
            <strong>A card scheme.</strong> A card that states your electrical discipline and the
            standard of your skills, tied to the grading.
          </li>
        </ul>
        <p>
          Scotland again runs its own arrangements, with its own joint industry board. Same idea,
          separate machinery, separate handbook.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="Professional institutions"
        plainEnglish="Bodies that register individuals by competence at defined levels, and publish standards and guidance for the discipline."
      >
        <p>
          Unlike a trade association, a professional institution deals with you, not with your
          employer. It holds a register of individuals assessed against defined levels of
          competence, and it publishes technical standards and guidance for the discipline.
        </p>
        <p>
          The apprenticeship route points at that register on purpose. Completion of the
          apprenticeship is designed to be recognised by relevant Professional Engineering
          Institutions at the appropriate level of professional registration, EngTech.
        </p>
        <p>
          That matters because it is portable in a way that nothing firm-level is. It travels with
          you between employers, between nations of the UK, and out of contracting altogether if you
          ever move into design, inspection or teaching.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="301-1-1-check-2"
        question="Which kind of body assesses and registers an individual electrician by competence at defined levels?"
        options={[
          'A professional institution',
          'A trade association',
          'A standards body',
          'The health and safety enforcing authority',
        ]}
        correctIndex={0}
        explanation="Professional institutions register individuals by competence at defined levels and publish standards and guidance for the discipline. Trade associations assess firms; standards bodies publish documents; the enforcing authority enforces the law."
      />

      <SectionRule />

      <ContentEyebrow>Standards and enforcement</ContentEyebrow>

      <ConceptBlock
        title="Standards bodies"
        plainEnglish="They publish the documents the whole trade works to. You do not join them; you buy and read what they produce."
      >
        <p>
          A standards body writes and publishes standards. Its work reaches you as the numbered
          documents on the van shelf and in the app — the wiring regulations, the product standards
          behind the accessories you fit, and the standards behind fire detection, emergency
          lighting and the rest.
        </p>
        <p>
          The give-away is the number. A document with a BS number in front of it came out of the
          national standards process. The cover of the wiring regulations carries both a British
          Standard number and the name of a professional institution, which tells you two of these
          six categories can co-publish.
        </p>
      </ConceptBlock>

      <ConceptBlock
        title="The enforcing authority for health and safety"
        plainEnglish="The Health and Safety Executive is the enforcing authority for health and safety on construction work. It has no members."
      >
        <p>
          This is the odd one out in the list, and learners mix it up with the membership bodies
          every year. It is not a club, it does not represent anybody, and nobody negotiates their
          rate with it. It is the enforcing authority for health and safety on construction work.
        </p>
        <p>
          Nothing in the other five categories substitutes for it. A firm can be a member of an
          association, its operatives can be graded and carded, and the installation can meet the
          published standard, and the site is still subject to health and safety enforcement.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Qualifications and training</ContentEyebrow>

      <ConceptBlock
        title="Awarding organisations and training providers"
        plainEnglish="One writes and issues the qualification; the other delivers the training and runs the apprenticeship. They are not the same organisation."
      >
        <p>
          Your certificate carries the name of an awarding organisation. Your college or provider
          delivered the teaching and put you forward, but the qualification is issued by the
          awarding organisation and is recognised because of that, not because of where you sat the
          exams.
        </p>
        <ul className="space-y-2 text-white">
          <li>
            <strong>Awarding organisation.</strong> Writes the specification, sets the assessment
            rules, issues the certificate.
          </li>
          <li>
            <strong>Training provider or college.</strong> Delivers the learning, runs the workshop
            and the portfolio, manages the apprenticeship.
          </li>
          <li>
            <strong>Employer.</strong> Provides the site experience the portfolio evidences.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="301-1-1-check-3"
        question="A body publishes national working rules that set out grades, rates and working conditions, and operates a card scheme tied to those grades. Which category is it?"
        options={[
          'A trade association',
          'An employer and employee negotiating body',
          'An awarding organisation',
          'A standards body',
        ]}
        correctIndex={1}
        explanation="Settling national terms between the employer side and the employee side, then running a grading and card scheme tied to those grades, is the defining job of a negotiating body."
      />

      <SectionRule />

      <RegsCallout
        source="JTL apprentice handbook"
        clause="The Electrical Contractors&rsquo; Association"
        meaning="The ECA represents the interests of electrical installation companies in England, Wales and Northern Ireland and is the major association working within the electrical installation industry. It was founded in 1901 and its member companies range in size from small traders with only a few employees to large multi-national organisations operating on a worldwide basis. The aim of the ECA is to ensure that all electrical installation work is carried out to the highest standards by properly qualified staff. Consequently, firms who wish to become members of the ECA must demonstrate that they have procedures, staff and systems of the highest calibre. Read as an employee: the assessment is of the business, so the membership is a statement about your employer, not about you."
        cite="JTL apprentice handbook"
      />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating your employer&rsquo;s association membership as your own credential"
        whatHappens={
          <>
            You put the association&rsquo;s name and logo on your CV, or you tell a customer on the
            doorstep that you are &ldquo;with&rdquo; it. Two things go wrong. The membership belongs
            to the business that was assessed, so it says nothing about your qualifications or your
            grade &mdash; and the day you change employer it stops being true. Say it to the wrong
            customer and you have made a claim about yourself that you cannot stand behind.
          </>
        }
        doInstead={
          <>
            Keep the two levels apart in everything you write. Firm level: &ldquo;my employer is a
            member of&hellip;&rdquo;. Person level: your qualifications, your grade, the card you
            hold and any individual professional registration. On a CV, list your own credentials
            first and mention the employer&rsquo;s membership as the employer&rsquo;s. It reads
            stronger anyway, because it is specific.
          </>
        }
      />

      <CommonMistake
        title="Crediting the college for a certificate the awarding organisation issued"
        whatHappens={
          <>
            <p>
              Three years after finishing you need a replacement certificate for a new
              employer&rsquo;s file, so you ring the college. The department has been reorganised,
              the tutor who taught you has gone, and nobody there can reissue anything &mdash;
              because the college never issued it in the first place. Your certificate carries the
              name of the awarding organisation, and that is the body that writes the
              specification, sets the assessment rules and issues the paperwork.
            </p>
            <p>
              The same mix-up turns up on forms. A learner writes the provider&rsquo;s name in the
              box asking for the awarding organisation, and an application comes back to be done
              again &mdash; over a question they could have answered correctly on the first pass.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Keep the three jobs apart, because three different bodies do them. The awarding
              organisation writes the specification, sets the assessment rules and issues the
              certificate. The training provider or college delivers the learning, runs the
              workshop and the portfolio and manages the apprenticeship. The employer provides the
              site experience the portfolio evidences.
            </p>
            <p>
              Then pick the door by the problem. Teaching, portfolio or apprenticeship trouble goes
              to the provider. Anything about the certificate itself goes to the awarding
              organisation, because the qualification is recognised on its name, not on where you
              sat the exams.
            </p>
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="Llanelli &mdash; the tender that wanted a member firm"
        situation={
          <>
            You went out on your own eight weeks ago in Llanelli. A local authority tender lands for
            rewiring two blocks at a primary school, worth more than your last four months put
            together. Halfway down the pre-qualification questions is a line requiring the bidder to
            be a member of a recognised electrical trade association. You assume you can join
            personally, pay, and have it in place before the Friday deadline.
          </>
        }
        whatToDo={
          <>
            Stop and read what that membership actually is. It is held by a contracting business,
            and firms who want it must demonstrate that they have procedures, staff and systems of
            the highest calibre &mdash; documented procedures, an assessed workforce, real systems.
            That is an application by your business, with evidence, not a same-week purchase. So for
            this tender, either bid as a subcontractor to a member firm that is already bidding, or
            let it go. Then start the application properly for the ones that come after it, and in
            the meantime target the work that does not carry the requirement.
          </>
        }
        whyItMatters={
          <>
            The cost of getting this wrong is not theoretical. Two evenings and a Saturday writing a
            bid you were never eligible to submit, the printing, and a wasted slot in a tender
            window that only opens a couple of times a year. Worse, a returned bid that fails
            pre-qualification tells a buyer you did not read the requirements &mdash; and that buyer
            runs every school in the county.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'Can I join a trade association as an individual electrician?',
            answer:
              'Trade association membership is a firm-level thing: the contracting business applies and the business is assessed. If you want recognition attached to you personally rather than to your employer, that comes from your qualifications, your grade and card, and individual registration with a professional institution.',
          },
          {
            question: 'Why does a Welsh course make me learn about a Scottish body?',
            answer:
              'Because the UK is not organised as one block and you will cross the border. The ECA represents electrical installation companies in England, Wales and Northern Ireland. SELECT is the trade association for the electrical contracting industry in Scotland, founded in 1900 as the Electrical Contractors’ Association of Scotland, and Scotland runs its own joint industry board arrangements too.',
          },
          {
            question: 'How many organisations am I expected to be able to name?',
            answer:
              'Fewer than you think. The criterion asks you to know the bodies and organisations relevant to the trade, and an examiner is looking for the categories plus a correct example or two. Six categories, a named trade association for England, Wales and Northern Ireland, a named one for Scotland, and the enforcing authority will carry you a long way.',
          },
          {
            question: 'If my employer is a member of an association, is the work automatically compliant?',
            answer:
              'No. Membership is a statement about the business that was assessed — its procedures, staff and systems. The installation still has to meet the published standard, the site is still subject to health and safety enforcement, and the certificate you sign is still yours.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Electrical contracting sits inside building services engineering, which is a sub-set of construction — so most site rules reach you from construction, not from your own trade.',
          'Six categories cover the field: trade associations, negotiating bodies, professional institutions, standards bodies, the enforcing authority, and awarding organisations and training providers.',
          'Trade associations represent contracting businesses. The firm applies, the firm is assessed, the firm holds the membership.',
          'The ECA represents electrical installation companies in England, Wales and Northern Ireland, was founded in 1901, and its members range from small traders to multi-nationals.',
          'Firms wanting ECA membership must demonstrate procedures, staff and systems of the highest calibre — which is why it is not something an individual buys.',
          'SELECT is the trade association for the electrical contracting industry in Scotland, founded in 1900 and today Scotland’s largest construction trade association.',
          'The Health and Safety Executive is the enforcing authority for health and safety on construction work, and is the one body in the list you do not join.',
          'Your certificate is issued by an awarding organisation, delivered by a provider and evidenced at an employer — three separate bodies with three separate jobs.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="Trade bodies and organisations — who exists" />
    </div>
  );
}
