/**
 * Unit 313 · Learning outcome 2 · Criterion 2.1 — The stakeholders that require
 * technical and functional information
 *
 * Who needs to know what. Taught as: different audiences need different halves
 * of the same job, and the commonest failure is giving everyone the technical
 * half.
 *
 * BS 7671 grounding: Regulation 644.4 names one recipient in law — the person
 * ordering the work — which is the fixed point in an otherwise judgement-based
 * criterion.
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
    question: 'Which stakeholder does BS 7671 name as a recipient?',
    options: [
      'The person ordering the work',
      'The building owner',
      'The end user',
      'The local authority',
    ],
    correctAnswer: 0,
    explanation:
      'Regulation 644.4 is specific. Everyone else on the list is a judgement about who needs to know; this one is not.',
  },
  {
    id: 2,
    question:
      'The person ordering the work and the person using the installation are different. What follows?',
    options: [
      'Certification goes to the first; the second still needs the functional information',
      'Only the first needs anything',
      'The certificate goes to whoever will use it',
      'Both need identical information',
    ],
    correctAnswer: 0,
    explanation:
      'Issuing correctly and communicating usefully are two obligations. Meeting the first does not discharge the second.',
  },
  {
    id: 3,
    question: 'What does a maintenance team need that a client generally does not?',
    options: [
      'Technical detail — schedules, ratings, what is behind the wall',
      'A demonstration',
      'The price',
      'Reassurance',
    ],
    correctAnswer: 0,
    explanation:
      'They are the audience for the technical half in its full form, and they are the one most often forgotten because they arrive after you have gone.',
  },
  {
    id: 4,
    question: 'A designer asks what you actually installed. Why does that matter to them?',
    options: [
      'Their record of the building is only as good as what comes back from site',
      'They are checking your work',
      'They need it for their fee',
      'It does not — the design is finished',
    ],
    correctAnswer: 0,
    explanation:
      'As-installed information closes the loop. Without it the next design on that building starts from a drawing that stopped being true during your job.',
  },
  {
    id: 5,
    question: 'Which of these is a stakeholder people routinely overlook?',
    options: [
      'The person who will work on the installation in ten years',
      'The client',
      'The site manager',
      'The supplier',
    ],
    correctAnswer: 0,
    explanation:
      'They cannot ask you for anything, which is exactly why they get forgotten. Labelling and an accurate schedule are the information they will actually meet.',
  },
  {
    id: 6,
    question: 'How do you decide what a given stakeholder needs?',
    options: [
      'Ask what decision or task they need it for',
      'Give them everything and let them filter',
      'Give them a summary',
      'Match what the last job provided',
    ],
    correctAnswer: 0,
    explanation:
      'Purpose sets content. A facilities manager deciding a maintenance regime needs something different from a tenant who wants to know why a socket is dead.',
  },
  {
    id: 7,
    question: 'What is wrong with sending everyone the full technical pack?',
    options: [
      'Volume hides the part each person actually needs',
      'It is too expensive',
      'It breaches confidentiality',
      'Nothing — more information is always better',
    ],
    correctAnswer: 0,
    explanation:
      'A client who receives forty pages reads none of it, and then rings you about the thing that was on page twelve.',
  },
  {
    id: 8,
    question: 'On a subcontract, who is "the person ordering the work"?',
    options: [
      'Usually whoever engaged you — often the main contractor, not the building owner',
      'Always the building owner',
      'Always the end user',
      'Whoever signs on the day',
    ],
    correctAnswer: 0,
    explanation:
      'It is worth establishing at the start rather than assuming, because it determines where certification goes.',
  },
];

export default function Lesson313_2_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'One recipient is fixed in law: certification goes to the person ordering the work.',
          'Everyone else is a judgement about who needs to know, and the judgement is what this criterion assesses.',
          'Purpose sets content — ask what decision or task the information is for.',
          'The two most overlooked stakeholders are the end user and whoever works on it in ten years.',
          'Sending everyone the full pack is not thoroughness; volume hides the part each person needs.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'List the stakeholders on a typical job and what each of them needs.',
          'Identify the one recipient BS 7671 names, and why the rest are judgement.',
          'Decide what somebody needs by asking what decision or task it is for.',
          'Recognise the stakeholders who cannot ask — the end user and the next electrician.',
          'Explain why sending everyone everything is a failure rather than thoroughness.',
        ]}
        initialVisibleCount={3}
      />

      <ContentEyebrow>Deciding who receives what</ContentEyebrow>

      <ConceptBlock
        title="One recipient is settled; the rest are your judgement"
        plainEnglish="The Regs name one person. The other six are up to you to work out."
      >
        <p>
          Most of this criterion is judgement, and it is worth starting from the part that is not.
          BS 7671 names a recipient: on completion of verification, the Electrical Installation
          Certificate is issued to the person ordering the work. That is fixed, and on a subcontract
          it is usually whoever engaged you rather than the building owner — worth establishing at
          the start rather than assuming at the end.
        </p>
        <p>
          Everything else is a decision. Who else needs to know, what they need, and in what form,
          are questions the Regulations do not answer and the job depends on. Getting them right is
          most of what this unit is about.
        </p>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 644.4"
        meaning="The Electrical Installation Certificate shall be issued to the person ordering the work — the client or person who commissioned the installation or alteration — by the person or persons responsible for the design, construction and verification, taking account of their respective responsibilities."
        cite="BS 7671 Part 6 — Inspection and Testing"
      />

      <InlineCheck
        id="313-2-1-check-1"
        question="You are subcontracted to a main contractor for a tenant fit-out. Who receives the certificate?"
        options={[
          'The tenant, as the end user',
          'The main contractor, as the person who ordered the work',
          'The building owner',
          'Whoever is on site at completion',
        ]}
        correctIndex={1}
        explanation="They engaged you, so they ordered the work. That does not mean the tenant needs nothing — it means the certificate has a defined destination and the tenant's needs are a separate question."
      />

      <SectionRule />

      <ContentEyebrow>The stakeholder list</ContentEyebrow>

      <ConceptBlock
        title="Who is on the list"
        onSite="Seven audiences, and each wants a different slice of the same job."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>The person ordering the work.</strong> Certification, and anything affecting
            cost, programme or scope.
          </li>
          <li>
            <strong>The end user.</strong> Functional information — how it works, what to do when
            something trips, what must not be switched off. Frequently not the same person as above.
          </li>
          <li>
            <strong>The maintenance team.</strong> The technical half in full: schedules, ratings,
            what is behind the wall, what was left for future use.
          </li>
          <li>
            <strong>Other trades.</strong> Only what affects their work — routes, dates, isolations,
            what they must not cut into.
          </li>
          <li>
            <strong>The designer or contract administrator.</strong> What was actually installed
            where it differs from the design, and any query that arose.
          </li>
          <li>
            <strong>Your own team.</strong> The task, the risks, the sequence, and the route for
            when something is not as described.
          </li>
          <li>
            <strong>Whoever works on it next.</strong> They cannot ask for anything, which is
            precisely why they are forgotten. What they get is your labelling and your schedule.
          </li>
        </ul>
        <p>
          The test for each is the same: what decision or task do they need this for? A facilities
          manager setting a maintenance regime needs something different from a tenant who wants to
          know why a socket is dead, and both are different again from the designer updating a
          record drawing.
        </p>
      </ConceptBlock>

      <ConceptBlock title="The two who cannot ask">
        <p>Five of those seven will chase you if they do not get what they need. Two will not.</p>
        <p>
          <strong>The end user</strong> often does not know what they are entitled to, and will
          simply live with an installation they do not understand — calling you about things that
          are not faults, or never calling and never using half of what was installed.
        </p>
        <p>
          <strong>The future electrician</strong> is not in the building yet. They meet your work as
          a board they have to make sense of, and everything they will know about it is what you
          left on and in the installation.
        </p>
        <p>
          Both are silent stakeholders, and both are served by the cheapest things on the list:
          fifteen minutes of demonstration, accurate labelling, and a schedule that matches what is
          actually there.
        </p>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Sending everybody everything"
        whatHappens={
          <>
            A complete pack goes to all parties — certificate, schedules, manufacturer literature,
            marked-up drawings, the lot — on the reasoning that nobody can then say they were not
            told. The client opens a forty-page bundle, closes it, files it, and rings three weeks
            later about something that was on page twelve.
          </>
        }
        doInstead={
          <>
            Send each audience what their decision needs, and say where the rest is. A client gets
            the certificate, the schedules, and a page on how to operate what they now own; the
            maintenance team gets the technical set. Everyone gets less and reads more.
          </>
        }
      />

      <CommonMistake
        title="Serving only the stakeholders who are standing in front of you"
        whatHappens={
          <>
            <p>
              Everybody who chased you got what they needed. The certificate went to the right
              person, the designer got their query answered and the other trades were told about
              the isolations. The two who never chased you got whatever was left: a schedule
              partly copied from the old board, and labelling written in the shorthand of the
              person holding the pen.
            </p>
            <p>
              Years later somebody opens that board to add a circuit. They cannot ring you, they
              have no drawings, and everything they will ever know about your work is what you
              left on and in the installation &mdash; which does not match what is actually
              connected.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Put the two silent stakeholders on the list deliberately, because neither of them can
              ask. For whoever works on it next that means a schedule that describes what is
              actually there, labelling that identifies what it claims to identify, and a note of
              anything left for future use.
            </p>
            <p>
              For the end user it means the functional half delivered to the person who will
              operate the installation, not left to filter down. Both are served by the cheapest
              things on the whole list: fifteen minutes of demonstration, accurate labelling, and a
              schedule that matches the board.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Split audiences on one job</ContentEyebrow>

      <ConceptBlock
        title="Split audiences on the same job"
        plainEnglish="Landlord and tenant. Contractor and occupier. Trust and ward staff."
      >
        <p>
          The situation that catches people out is one job with two legitimate audiences who need
          different things and who will not necessarily talk to each other.
        </p>
        <p>
          A landlord orders a rewire and a tenant lives in it. A main contractor engages you and an
          incoming business occupies the unit. An NHS trust commissions the work and the ward staff
          use it. In every case the certificate has one correct destination and the functional
          information has a different one — and assuming the first will pass anything on to the
          second is optimistic.
        </p>
        <p>
          The practical answer is to identify both at the start and say explicitly who you will give
          what to. That is also a courtesy to the person ordering the work, who may not have thought
          about it either.
        </p>
      </ConceptBlock>

      <InlineCheck
        id="313-2-1-check-2"
        question="A landlord commissions a rewire of a tenanted flat. Who needs the demonstration?"
        options={[
          'The tenant, because they are the ones who will operate it',
          'The landlord, because they ordered the work',
          'Both equally',
          'Neither — the certificate covers it',
        ]}
        correctIndex={0}
        explanation="Certification goes to the landlord as the person ordering the work. The person who needs to know how the RCD test button works is the one living there."
      />

      <SectionRule />

      <ContentEyebrow>Limits of your list</ContentEyebrow>

      <ConceptBlock title="Stakeholders you are not expected to serve">
        <p>
          It is worth naming the boundary, because over-supplying is its own failure. You are not
          the source of information for a neighbour, a prospective purchaser, an insurer or another
          contractor bidding for future work, and passing information to them without the
          client&rsquo;s agreement is a problem rather than helpfulness.
        </p>
        <p>
          Where somebody outside the job asks you for information, the answer is usually the same:
          tell them to ask the client, and tell the client they asked. That keeps you out of a
          position you have no standing in, and it is also the answer that protects the
          relationship.
        </p>
      </ConceptBlock>

      <ConceptBlock title="Establish the list before you need it">
        <p>
          At the start of a job, three questions settle almost all of this and take about a minute:
          who ordered the work, who will use the installation, and who maintains it. Ask them at the
          survey and the answers will be volunteered easily; ask them in the final week and they
          become awkward.
        </p>
        <p>
          The third one is the one most often skipped and the most revealing. On a commercial
          building the answer is frequently &ldquo;we have not decided yet&rdquo;, which is itself
          worth knowing, because it tells you the technical information is going to sit unread
          somewhere until somebody is appointed.
        </p>
      </ConceptBlock>

      <Scenario
        title="Certified correctly, nobody told"
        situation={
          <>
            A small business unit on an estate outside Llanelli, refitted for an incoming tenant.
            The managing agent commissioned the work, so the certificate and schedules go to them —
            correctly. The tenant moves in a fortnight later. Over the following month they ring
            three times: once about the lighting control, once because the heating is on a time
            clock they cannot find, and once to ask for the certificate, which the agent has filed
            and not passed on.
          </>
        }
        whatToDo={
          <>
            Nothing here was done wrong by the letter. The certificate went to the person ordering
            the work, exactly as it should. What was missed is that the job had two audiences, and
            only one of them was served — the functional half never reached the people who would
            actually operate the installation.
          </>
        }
        whyItMatters={
          <>
            Meeting the obligation and doing the job are different things. Three calls, all
            avoidable, all costing your time — and the tenant&rsquo;s impression of the work was
            formed entirely by not being able to work it.
          </>
        }
      />

      <InlineCheck
        id="313-2-1-check-3"
        question="A prospective buyer of the property asks you for a copy of the certificate. What do you do?"
        options={[
          'Send it — it is their property soon',
          'Refuse and say nothing further',
          'Tell them to ask the client, and tell the client they asked',
          'Send a summary rather than the full document',
        ]}
        correctIndex={2}
        explanation="You have no standing to release the client's documentation to a third party, and telling the client someone asked is both the correct step and the one that protects the relationship."
      />

      <SectionRule />

      <ContentEyebrow>Changes and confidentiality</ContentEyebrow>

      <ConceptBlock title="Stakeholders change during a job">
        <p>
          The list you draw up at the survey is rarely the list at handover. A tenant is found, a
          facilities contractor is appointed, the site manager changes, a maintenance provider takes
          over the building the week you finish.
        </p>
        <p>
          It is worth re-asking the three questions near the end rather than assuming the answers
          from week one still hold. The commonest version is the maintenance question: on a
          commercial job the answer at the start is often &ldquo;we have not decided&rdquo;, and by
          completion somebody has been appointed and nobody has thought to tell you.
        </p>
      </ConceptBlock>

      <SectionRule />

      <ConceptBlock title="Confidentiality between stakeholders">
        <p>
          Having several audiences means holding information that belongs to one of them and not to
          another. Pricing, contractual positions, and anything about a dispute belong to the party
          they concern.
        </p>
        <p>
          On a job where a landlord and a tenant both talk to you, this comes up quickly and usually
          innocently — an occupier asks what the landlord is paying, or what you thought of the last
          contractor. The safe position is consistent and easy to hold: technical and functional
          information about the installation is shareable with whoever needs it to use or maintain
          the building; commercial information goes back to the party it belongs to.
        </p>
      </ConceptBlock>

      <FAQ
        items={[
          {
            question: 'What if the client tells me not to deal with the tenant directly?',
            answer:
              'Respect it — they are the client and there may be reasons you are not party to. What you can do is tell them plainly that the occupier will need to know how to operate the installation, and offer to provide something written they can pass on. That discharges the practical need without going around anybody.',
          },
          {
            question: 'Should the maintenance team get the certificate?',
            answer:
              'Not as of right; it belongs to the person who ordered the work. In practice a copy is usually welcomed and sensible, and the thing to do is suggest it to the client rather than send it unasked. What the maintenance team genuinely needs is the technical set — schedules, as-installed information and labelling — which is a different question from certification.',
          },
          {
            question: 'How do I identify stakeholders on a large project?',
            answer:
              'Ask whoever holds the overall programme — on a managed job somebody already has the list and will share it. Where you are one of several trades, your list is shorter than it looks: the party who engaged you, the people whose work touches yours, and the end user of what you install. Trying to map the whole project is not your job.',
          },
          {
            question: 'Does this get assessed?',
            answer:
              'The knowledge sits with the externally-set questions. It also surfaces in the professional discussion, where "who did you give the information to, and why them?" is a natural question — and one that separates somebody who thought about audiences from somebody who emailed a pack to whoever was in the last thread.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'BS 7671 fixes one recipient: certification to the person ordering the work.',
          'On a subcontract that is usually whoever engaged you — establish it at the start.',
          'Seven audiences, each wanting a different slice: orderer, end user, maintainer, other trades, designer, your team, the next electrician.',
          'Decide what each needs by asking what decision or task it is for.',
          'Two stakeholders cannot ask — the end user and whoever works on it next.',
          'Sending everyone the full pack hides the part each person needs.',
          'Split audiences are normal; identify both at the start and say who gets what.',
          'Requests from outside the job go back through the client.',
        ]}
      />

      <ContentEyebrow>Check yourself</ContentEyebrow>
      <Quiz questions={quizQuestions} title="The stakeholders that require information" />
    </div>
  );
}
