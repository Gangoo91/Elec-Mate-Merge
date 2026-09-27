/**
 * Unit 313 — Understand the importance of customer service in relation to
 * installation and/or maintenance activity (26 GLH).
 * Learning outcome 3. Criterion 3.4 — The clients' and customers' rights
 * including any contractual agreements.
 *
 * Approach: this page teaches the working difference between what was agreed
 * and what was expected, because that gap is where almost every dispute on a
 * domestic or small-commercial job actually starts. It stays on the ground the
 * electrician controls — scope, variations, certification, records — and hands
 * the commercial and legal questions back to whoever owns the client
 * relationship, which is the position already established at 2.2.
 * This page deliberately names no statute, Act, regulation or consumer-rights
 * law, and states no cancellation period, guarantee length or time limit,
 * because none of that could be verified for this material. Where a legal
 * entitlement would normally be quoted, the page tells the learner to check
 * with the person who holds the commercial relationship instead of assuming.
 * The only citation on the page is BS 7671.
 * 🔴 Never describe this content as EAL-approved, EAL-mapped or endorsed.
 */

import { TLDR } from '@/components/study-centre/learning';
import { ConceptBlock } from '@/components/study-centre/learning';
import { RegsCallout } from '@/components/study-centre/learning';
import { CommonMistake } from '@/components/study-centre/learning';
import { Scenario } from '@/components/study-centre/learning';
import { KeyTakeaways } from '@/components/study-centre/learning';
import { FAQ } from '@/components/study-centre/learning';
import { LearningOutcomes } from '@/components/study-centre/learning';
import { ContentEyebrow } from '@/components/study-centre/learning';
import { SectionRule } from '@/components/study-centre/learning';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';

const quizQuestions = [
  {
    id: 1,
    question:
      'A client says the price you gave on the doorstep was “a quote”. You wrote it on the back of a job sheet and said it was roughly that. What is the honest description of what happened?',
    options: [
      'A figure was given verbally and nothing was agreed in writing, so both of you now remember it differently and the firm has to sort out which version stands',
      'It was a quote, because you said a number and the client heard it',
      'It was an estimate, because estimates are always verbal and quotes are always written',
      'Nothing was agreed at all, so the client has no basis to raise it',
    ],
    correctAnswer: 0,
    explanation:
      'A number said out loud is the weakest thing there is. It is not that it counts for nothing — it is that there is no record of what it covered, so the argument becomes memory against memory. That is exactly the situation your paperwork is supposed to prevent.',
  },
  {
    id: 2,
    question: 'What is the practical difference between a quotation and an estimate on a job?',
    options: [
      'A quotation is a fixed price for a defined scope; an estimate is a considered prediction that can move as the work is opened up',
      'A quotation is written and an estimate is spoken',
      'A quotation includes VAT and an estimate never does',
      'They are the same thing and the words are interchangeable',
    ],
    correctAnswer: 0,
    explanation:
      'The distinction is fixed price versus predicted price, not written versus spoken. Clients very often do not know this, so if the firm has issued an estimate it is worth saying plainly that the figure can move and why.',
  },
  {
    id: 3,
    question:
      'Halfway through a consumer unit change you find the main earthing conductor is undersized and needs replacing back to the intake. What do you do about the price?',
    options: [
      'Stop, tell the client what you have found, get the change to the work and the price agreed before you carry it out',
      'Do the work now because it is a safety matter and add it to the final invoice',
      'Leave it out entirely because it was not in the quote',
      'Do the work and mention it verbally on the day, then invoice for it',
    ],
    correctAnswer: 0,
    explanation:
      'A variation is agreed before it is done, not discovered on the invoice. Safety does not remove the need to agree it — it just makes the conversation more urgent, and it may mean the job pauses rather than continues.',
  },
  {
    id: 4,
    question:
      'Which of these is inside the client’s minimum expectation on any job, regardless of what was negotiated on price?',
    options: [
      'Work that is safe and compliant, the certification for what you did, and being told when something changes',
      'A discount if the job overruns by a day',
      'A named electrician on site every day of the job',
      'A written report on every circuit in the property',
    ],
    correctAnswer: 0,
    explanation:
      'Price, timescales and extras are negotiable. Safety, compliance, certification and being kept informed are the floor — they are not the part of the deal you trade away.',
  },
  {
    id: 5,
    question:
      'A commercial client’s buyer sends you a purchase order with their own terms attached. What is the right move on site?',
    options: [
      'Pass it to whoever in your firm owns the commercial relationship before anyone signs or starts work against it',
      'Sign it, because a purchase order is just confirmation of the order',
      'Ignore it, because your quote was issued first and therefore wins',
      'Sign it but write “subject to our terms” next to your signature',
    ],
    correctAnswer: 0,
    explanation:
      'Whose terms end up governing the job is a commercial question with real consequences, and it is not decided by whoever happens to be holding the clipboard. Hand it up.',
  },
  {
    id: 6,
    question:
      'Something the client says is a defect emerges a few weeks after you finished a rewire. What is the first thing you do?',
    options: [
      'Acknowledge it quickly, arrange to go and look, and establish the facts before anyone agrees or denies that it is your work',
      'Tell them it is outside your responsibility because the job was signed off',
      'Accept liability on the phone to keep them calm and sort the details later',
      'Wait to see whether they chase it again before responding',
    ],
    correctAnswer: 0,
    explanation:
      'Fast acknowledgement and slow conclusions. Conceding on the phone before you have seen it can commit your firm to putting right something that was never yours; denying it before you have seen it turns a small job into a complaint.',
  },
  {
    id: 7,
    question:
      'A domestic client and a commercial contractor both dispute the same thing with you. Why do you treat the two situations as different?',
    options: [
      'A domestic customer sits in a different position from a business negotiating a contract, so the firm handles them differently — check with whoever owns the relationship rather than assuming they are the same',
      'Domestic clients are always right and commercial ones are not',
      'Commercial disputes are always settled in writing and domestic ones never are',
      'There is no difference; a dispute is a dispute',
    ],
    correctAnswer: 0,
    explanation:
      'They are genuinely different positions. What the difference means in any particular argument is not something to work out on site — it is a question for the person in your firm who holds the commercial relationship.',
  },
  {
    id: 8,
    question: 'After a disputed job, what most reliably protects both you and the client?',
    options: [
      'The written scope, the variations that were confirmed in writing, and the certificate that was issued',
      'Your recollection of the conversations, because you were the one on site',
      'The invoice, because it is the final document in the sequence',
      'Photographs of the finished work on their own',
    ],
    correctAnswer: 0,
    explanation:
      'Records cut both ways and that is the point. They stop a client being charged for something they never agreed, and they stop you being accused of something you never did.',
  },
];

export default function Lesson313_3_4() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'Most disputes are not about bad work. They are about the gap between what was agreed and what the client expected.',
          'A quotation, an estimate and a price said out loud are three different things, and clients usually do not know that.',
          'The scope is the boundary of the agreement. Anything outside it is a variation, and a variation is agreed before it is done.',
          'Whatever the commercial argument, the client is entitled to work that is safe and compliant, the certification for it, and to be told when something changes.',
          'Anything about money, liability or legal entitlement goes to whoever owns the commercial relationship in your firm. Check, do not assume.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Separate what was agreed from what the client expected, and recognise that most disputes live in the gap.',
          'Distinguish a quotation, an estimate and a number said out loud.',
          'Use the scope as the boundary of the agreement, and agree a variation before it is done.',
          'State the floor a client is entitled to — safe and compliant work, its certification, and being told when something changes.',
          'Route anything about money, liability or a client’s legal position to whoever owns the commercial relationship.',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>Agreed versus expected</ContentEyebrow>

      <ConceptBlock
        title="Agreed and expected are two different things"
        plainEnglish="The contract is what was agreed. The client also carries a picture in their head of what they are getting. The dispute lives in the space between the two."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>What was agreed.</strong> The written quotation or order, the scope attached to
            it, the drawings or schedule if there are any, and anything confirmed in writing
            afterwards.
          </li>
          <li>
            <strong>What was expected.</strong> Everything the client assumed came with it. Making
            good the plaster. Taking the old consumer unit away. Moving the socket six inches
            because the sofa is there now.
          </li>
          <li>
            <strong>Why the gap opens.</strong> The agreement is written in trade terms and read by
            somebody who does not work in the trade. &ldquo;Rewire ground floor&rdquo; means one
            thing to you and something much bigger to them.
          </li>
          <li>
            <strong>How you close it.</strong> Before you start, walk the job and say out loud what
            is in and what is not. Ten minutes on day one is cheaper than a week of emails at the
            end.
          </li>
          <li>
            <strong>What this is not.</strong> It is not your job to renegotiate the deal on the
            doorstep. It is your job to spot the gap early and get it in front of the right person.
          </li>
          <li>
            <strong>The tell.</strong> When a client says &ldquo;I assumed&rdquo; or
            &ldquo;obviously that includes&rdquo;, stop and check the scope there and then. Those
            two phrases are the front edge of nearly every dispute you will see.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Quotation, estimate, and a number said out loud"
        plainEnglish="These are three different commitments. Clients treat them as one."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Quotation.</strong> A fixed price for a defined scope of work. If the scope does
            not change, the price does not change. That is the whole point of it.
          </li>
          <li>
            <strong>Estimate.</strong> A considered prediction based on what could be seen at the
            time. It can move once floors come up and boards come off — but it is a professional
            judgement, not a guess, and a big movement needs explaining.
          </li>
          <li>
            <strong>A number said out loud.</strong> The weakest position for everybody. Nobody
            recorded what it covered. When it is challenged it becomes your memory against theirs,
            and that helps neither of you.
          </li>
          <li>
            <strong>On site.</strong> If a client says &ldquo;you quoted me&rdquo; and your firm
            issued an estimate, do not argue the point in their hallway. Say you will check what was
            issued, then check it.
          </li>
          <li>
            <strong>The habit.</strong> Never give a figure on the spot for work you have not
            priced. &ldquo;I&rsquo;ll get that priced and sent to you&rdquo; costs you nothing and
            protects the job.
          </li>
          <li>
            <strong>Day rates and call-outs.</strong> A day rate is a rate, not a price for a job.
            Clients often hear &ldquo;£320 a day&rdquo; and mentally round the whole job to one day.
            Say how many days you expect, and say what would change it.
          </li>
          <li>
            <strong>Provisional sums.</strong> Where a price genuinely cannot be fixed until
            something is opened up, that has to be visible on the document rather than buried. A
            client who was never told a line was provisional will treat the final figure as an
            overcharge.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <InlineCheck
        id="313-3-4-check-1"
        question="A client asks on site what it would cost to add two more sockets while you are there. What is the safest response?"
        options={[
          'Give them a rough figure so they can decide quickly',
          'Do it now and let the office sort the price out afterwards',
          'Tell them it cannot be done because it is not in the quote',
          'Tell them you will get it priced properly and confirmed in writing before you do it',
        ]}
        correctIndex={3}
        explanation="You are not refusing the work — you are refusing to price it off the top of your head. The extra sockets are extra scope, and extra scope gets priced and confirmed before it is installed."
      />

      <ContentEyebrow>Scope and variations</ContentEyebrow>

      <ConceptBlock
        title="The scope is the boundary of the agreement"
        plainEnglish="Whatever the scope says is the edge of what you owe them and the edge of what they owe you."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Read it before you start.</strong> Not the price line — the scope. What
            circuits, what rooms, what accessories, what is excluded, what the client is doing
            themselves.
          </li>
          <li>
            <strong>Exclusions matter as much as inclusions.</strong> &ldquo;Excludes making
            good&rdquo; and &ldquo;excludes builder&rsquo;s work&rdquo; are the two that cause the
            most arguments in domestic work.
          </li>
          <li>
            <strong>The scope is also your protection.</strong> If the client says the upstairs
            lighting should have been included, the scope is what answers that — in either
            direction.
          </li>
          <li>
            <strong>If the scope is vague, flag it up.</strong> A one-line scope on a five-day job
            is a dispute waiting to happen. Say so before you are stood in it.
          </li>
          <li>
            <strong>On maintenance work.</strong> The boundary is often &ldquo;attend and
            diagnose&rdquo; rather than &ldquo;attend and fix&rdquo;. Clients regularly assume the
            fix is included in the call-out. Be clear which one you are there to do.
          </li>
          <li>
            <strong>Who is doing what.</strong> On a job with a builder, a kitchen fitter and you,
            the scope also says where your work stops and theirs starts. Chasing, lifting floors and
            boxing in are the classic no-man&rsquo;s-land, and nobody has priced them.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="A variation is agreed before it is done"
        plainEnglish="Anything outside the scope is a change to the agreement, and a change to the agreement is agreed in advance — never revealed on the invoice."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>What counts as a variation.</strong> Extra work, different work, work in a
            different place, or work the client has asked to be left out. Removing scope is a
            variation too.
          </li>
          <li>
            <strong>The sequence.</strong> Find it, stop, tell the client what you have found and
            what it means, get the change and the price confirmed, then carry it out. Not the other
            way round.
          </li>
          <li>
            <strong>Confirmed means recorded.</strong> A message, an email, a signed line on the job
            sheet. A nod in a kitchen is not a variation, however genuine the nod was.
          </li>
          <li>
            <strong>Safety-critical finds.</strong> Discovering something dangerous does not let you
            skip the agreement. It means the conversation happens now, and it may mean the job stops
            and the installation is made safe while it is sorted.
          </li>
          <li>
            <strong>The invoice surprise.</strong> An unagreed extra appearing at the end is the
            single fastest way to turn a satisfied client into a complaint, even when the work was
            needed and the price was fair.
          </li>
          <li>
            <strong>Time as well as money.</strong> A variation usually moves the programme too.
            Agreeing the price but saying nothing about the extra two days is only half the
            conversation, and the half you skipped is the one the client will notice.
          </li>
          <li>
            <strong>On commercial jobs.</strong> There is normally a written variation procedure
            with named people and a form. Follow it exactly. Work done outside that procedure can
            end up unpaid no matter how obviously it was needed.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>The baseline entitlement</ContentEyebrow>

      <ConceptBlock
        title="The floor: what any client is entitled to expect"
        plainEnglish="Price and timescale are negotiable. These four are not."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Work that is safe.</strong> Nothing you leave behind should put anybody at risk,
            whatever the argument about money is doing in the background.
          </li>
          <li>
            <strong>Work that is compliant.</strong> The installation meets the requirements it is
            supposed to meet. A client who does not know the standards is entitled to rely on you
            knowing them.
          </li>
          <li>
            <strong>The certification for the work you did.</strong> The certificate belongs with
            the job. It is not a bargaining chip and it is not something withheld to settle a
            dispute.
          </li>
          <li>
            <strong>To be told when something changes.</strong> Price, programme, what was found,
            what has to happen next. Silence is what turns a manageable problem into a complaint.
          </li>
          <li>
            <strong>To be left the information they need.</strong> Where the board is, what was
            isolated, what is still to be done, and anything they have to act on. A client who does
            not know what state their installation is in cannot look after it.
          </li>
          <li>
            <strong>Everything beyond that.</strong> Deposits, retentions, payment terms, what
            happens if the job is cancelled, what any guarantee actually covers — all of that is set
            by the contract and by consumer law, and it is a question for whoever holds the
            commercial relationship in your firm. Check rather than assume.
          </li>
          <li>
            <strong>Why the floor matters on site.</strong> When a job goes sour, the temptation is
            to trim. The things listed above are the ones you never trim, because they are the ones
            that carry safety and evidence rather than goodwill.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 644.4"
        meaning="The Electrical Installation Certificate shall be issued to the person ordering the work, by the person or persons responsible for the design, construction and verification of the installation, taking account of their respective responsibilities. Whatever the commercial argument, the certificate is something the person who ordered the work is to receive — issuing it is not contingent on the commercial relationship being comfortable, and it is not leverage in a payment dispute."
        cite="BS 7671 Part 6 — Inspection and Testing"
      />

      <SectionRule />

      <InlineCheck
        id="313-3-4-check-2"
        question="A client is disputing the final account on a completed consumer unit change. The installation was inspected, tested and is satisfactory. What happens to the certificate?"
        options={[
          'It is held back until the account is settled, as leverage',
          'It is issued only once the client withdraws the dispute in writing',
          'It is issued but with the results left blank until payment clears',
          'It is issued to the person who ordered the work, and the payment dispute is handled separately by whoever owns the commercial relationship',
        ]}
        correctIndex={3}
        explanation="The certificate records what was done and what was found. It follows the work, not the argument. Using it as leverage mixes up a safety document with a money conversation that belongs to somebody else in the firm."
      />

      <ContentEyebrow>Domestic and commercial clients</ContentEyebrow>

      <ConceptBlock
        title="Domestic and commercial clients sit in different positions"
        plainEnglish="A householder and a business negotiating a contract are not in the same position, and your firm will not treat them the same way."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>The general picture.</strong> A domestic customer buying work for their own home
            has protections that a business negotiating a commercial contract does not. That is a
            real and deliberate difference.
          </li>
          <li>
            <strong>What those protections actually are.</strong> Set by the contract and by
            consumer law, and a question for whoever holds the commercial relationship in your firm.
            Check rather than assume — and never explain a client&rsquo;s legal position to them
            yourself.
          </li>
          <li>
            <strong>Commercial work runs on its own paperwork.</strong> Purchase orders, main
            contractor terms, agreed variation procedures, valuation dates, retention. Somebody
            signed up to all of it before you arrived.
          </li>
          <li>
            <strong>Whose terms apply.</strong> On commercial jobs the client&rsquo;s terms and your
            firm&rsquo;s terms are often both floating about. Which set governs the job is decided
            well above site level. Hand any terms you are given to the right person.
          </li>
          <li>
            <strong>Who the client actually is.</strong> On a commercial site the person giving you
            instructions may not be the person who ordered the work or the person who pays. Know
            which is which before you act on anything that changes the job.
          </li>
          <li>
            <strong>Landlords and letting agents.</strong> A common middle case in domestic work.
            The person ordering the work, the person paying and the person living there can be three
            different people, and they do not always want the same thing. Be clear who your client
            is.
          </li>
          <li>
            <strong>What does not change.</strong> Safe, compliant work and the certification for
            it. That floor is the same in a terrace in Barry as it is on a fit-out for a national
            retailer.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Defects and putting things right"
        plainEnglish="After completion there is normally a period in which things that emerge come back to you. How that period is defined depends entirely on what was agreed."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>On a contract.</strong> It is usually written down — a defined period after
            completion, a defined process for reporting defects, and often money held back until it
            ends. Read what was agreed for that job.
          </li>
          <li>
            <strong>On domestic work.</strong> It is much less formal. There is often nothing
            written at all beyond whatever the firm says about its work, and that is exactly why it
            becomes contentious.
          </li>
          <li>
            <strong>How long.</strong> Not something to state from memory or from what the last
            client told you. It is set by the contract and by consumer law, and it is a question for
            whoever holds the commercial relationship in your firm. Check rather than assume.
          </li>
          <li>
            <strong>Defect or damage or something else.</strong> A loose connection you made is one
            thing. A socket broken by a removal firm is another. A circuit tripping because the
            client has added a hot tub is a third. Establish which before anybody agrees to
            anything.
          </li>
          <li>
            <strong>Go and look.</strong> Most alleged defects are resolved in twenty minutes on
            site. Arguing about them remotely costs more than the visit and damages the relationship
            while you do it.
          </li>
          <li>
            <strong>Record the return visit properly.</strong> What was reported, what you found,
            what you did, whether anything was retested. A defect visit with no record behind it is
            the one that gets reported again next year as though it were new.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="&ldquo;I did them a favour&rdquo; — the unagreed extra on the invoice"
        whatHappens={
          <>
            The pattern is always the same, and it is almost always well intentioned. You are on a
            job, you spot something that genuinely needs doing, the client is out, and you crack on
            because you are there and it saves everybody a second visit. Nobody agrees a price.
            Nobody records the change. Then the extra turns up on the invoice three weeks later and
            the client reads it as being charged for work they never asked for.
          </>
        }
        doInstead={
          <>
            Two things go wrong at once. First, the client loses trust, because the first they heard
            of it was a bill. Second, your firm is now in a weak position, because there is nothing
            recorded showing the work was authorised — and the person who has to argue it is not
            you, it is whoever owns the relationship. You have handed them a dispute they cannot win
            cleanly. There is a second version of the same mistake that catches people out more
            often than the first: doing the extra and not charging for it at all, because it felt
            awkward to raise. That is not generosity, it is an undocumented change to somebody
            else&rsquo;s contract. The firm loses the money, the client now believes that work was
            always in scope, and the next electrician who prices it properly looks expensive. The
            fix costs nothing. Stop when you find it. Ring or message the client, describe what you
            have found and what it means, and get a reply you can keep. If you cannot reach them,
            leave it, write it up, and report it. Work that was genuinely needed and fairly priced
            still becomes a complaint when the first time anybody saw it was on the invoice.
          </>
        }
      />

      <CommonMistake
        title="Settling a complaint on the doorstep before you know what happened"
        whatHappens={
          <>
            <p>
              A client rings upset about something that has gone wrong since you left, and you are
              standing in front of them within the hour. One of two sentences comes out. Either
              &ldquo;leave it with me, we will put it right for nothing&rdquo;, which commits your
              firm to work it may not owe and to a cost nobody has authorised. Or &ldquo;that is
              nothing to do with us&rdquo;, said before anybody has looked, which turns a query
              into a fight.
            </p>
            <p>
              Both come from the same instinct: wanting the uncomfortable conversation to be over.
              And both are decided before the basic question has been answered &mdash; is this a
              defect in your work, damage somebody else caused, or the result of something the
              client has changed since?
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Acknowledge straight away and commit to nothing else. &ldquo;I have got your message,
              I am looking into it, I will come back to you today&rdquo; defuses most of it,
              because most complaints escalate over silence rather than over the original problem.
              Then go and look, because most alleged defects are settled in twenty minutes on site.
            </p>
            <p>
              Establish the facts before anybody decides whose responsibility it is: what was
              agreed, what was done, what was recorded, what has changed since. Anything about
              money, liability or guarantees goes to whoever owns the commercial relationship, and
              you write the record the same day &mdash; what was reported, what you found, what you
              did and what was retested.
            </p>
          </>
        }
      />

      <ContentEyebrow>Complaints and records</ContentEyebrow>

      <ConceptBlock
        title="Complaints, and the records that settle them"
        plainEnglish="Answer straight away, do not agree or deny anything until you know what actually happened, and rely on what was written down rather than on what anyone remembers."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Acknowledge within the hour if you can.</strong> Most complaints escalate
            because nobody replied, not because of the original problem. &ldquo;I&rsquo;ve got your
            message, I&rsquo;m looking into it, I&rsquo;ll come back to you today&rdquo; defuses a
            lot.
          </li>
          <li>
            <strong>Establish facts first.</strong> What was agreed, what was done, what was
            recorded, what has changed since. Go and look at it if you can.
          </li>
          <li>
            <strong>Do not concede and do not deny on the doorstep.</strong> Accepting liability
            commits your firm to something it may not owe. Flat denial before you have looked turns
            a query into a fight.
          </li>
          <li>
            <strong>Escalate to whoever owns the relationship.</strong> Anything about money,
            liability, guarantees or a client&rsquo;s legal position goes up. That is not passing
            the buck — it is the person whose job it is.
          </li>
          <li>
            <strong>Separate the feeling from the facts.</strong> A client can be angry and wrong,
            or calm and completely right. How somebody says it tells you nothing about whether it
            happened.
          </li>
          <li>
            <strong>Keep the record.</strong> Date, who said what, what you saw, what you agreed to
            do next. Write it the same day, while it is accurate, not a fortnight later when it is a
            reconstruction.
          </li>
          <li>
            <strong>Close the loop.</strong> Tell the client what the outcome was, even when the
            answer is not the one they wanted. A complaint left hanging without a reply becomes a
            review, and then it becomes somebody else&rsquo;s problem in your firm.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Your records protect both sides"
        plainEnglish="Good records are not about winning arguments. They are about there being fewer arguments."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>The written scope.</strong> Settles what was in the job. Protects the client
            from paying for something that was always included, and protects you from being asked
            for something that never was.
          </li>
          <li>
            <strong>The confirmed variation.</strong> A short message with what, why and how much,
            and a reply agreeing it. That single exchange prevents more disputes than anything else
            you will do.
          </li>
          <li>
            <strong>The issued certificate.</strong> The formal record of what was installed, what
            was inspected and tested, and what was found. It is the client&rsquo;s evidence as well
            as yours.
          </li>
          <li>
            <strong>Photographs with context.</strong> A picture of an undersized conductor before
            you replaced it is worth more than any description written afterwards. Note the date and
            where it was.
          </li>
          <li>
            <strong>Write it as though somebody else will read it.</strong> Because somebody else
            will — your supervisor, the client, possibly an inspector. &ldquo;Sorted CU&rdquo; helps
            nobody twelve months on.
          </li>
          <li>
            <strong>Keep it where the firm can find it.</strong> A note in your own phone that
            nobody else can see is not a company record. It has to reach the job file, or it may as
            well not exist.
          </li>
          <li>
            <strong>The unglamorous truth.</strong> The electrician who writes things down looks
            slower on a Tuesday and is untouchable six months later. Records cut both ways, and that
            is precisely why they work.
          </li>
        </ul>
      </ConceptBlock>

      <SectionRule />

      <InlineCheck
        id="313-3-4-check-3"
        question="A domestic client rings you six weeks after a rewire and says a bedroom circuit keeps tripping. What is the right first move?"
        options={[
          'Tell them it will be their appliances, as it usually is',
          'Tell them the job was signed off so it is no longer your concern',
          'Acknowledge the call straight away, arrange to attend and establish what is actually causing it before anyone decides whose responsibility it is',
          'Agree on the phone that you will put it right free of charge to keep them happy',
        ]}
        correctIndex={2}
        explanation="Both of the wrong extremes cost you. Dismissing it creates a complaint out of something that might take twenty minutes; accepting it on the phone commits your firm to work it may not owe. Acknowledge fast, find the facts, then let the commercial call be made by the person who makes commercial calls."
      />

      <Scenario
        title="Pontypridd — the loft that was never in the scope"
        situation={
          <>
            A three-bedroom terrace above the town centre in Pontypridd. Your firm quoted a full
            rewire, fixed price, £6,400 plus VAT, scope written as &ldquo;full rewire to ground and
            first floor, twelve-way board, excludes making good and excludes builder&rsquo;s
            work&rdquo;. You are four days in, boards up, first fix nearly done.
          </>
        }
        whatToDo={
          <>
            On Thursday the client comes home early and says: &ldquo;You&rsquo;ll be doing the loft
            on Monday then.&rdquo; The loft is boarded out with a bed in it, two twin sockets and a
            light fed off the upstairs lighting circuit through a junction box you would not want to
            photograph. It is not in the quote. It is not in the scope. The client is certain it is
            included, because when the surveyor from your firm walked the house the client remembers
            pointing at the loft hatch and saying &ldquo;and up there&rdquo;. It is roughly a day
            and a half of work plus materials — call it £700. The client is pleasant, credible, and
            completely sure. You are equally sure the scope says what it says. Whatever happens
            next, one of you is going to be disappointed, and you are the only one of you standing
            in the hallway. <strong>What you do.</strong> You do not argue and you do not agree. You
            say you can see why they thought it was in, you are not going to sort out the price
            standing here, and you will get the scope checked against what was walked and come back
            to them tomorrow. Then you ring the office the same afternoon, while it is fresh, and
            tell them exactly what was said and by whom. You also write down what you found in the
            loft — the junction box, the existing feed — because that is a technical fact that will
            matter regardless of who pays. <strong>What you do not do.</strong> You do not say
            &ldquo;that was never in it&rdquo; in a tone that makes them feel accused of trying it
            on. You do not say &ldquo;leave it with me, we&rsquo;ll sort you out&rdquo;, because you
            have just given away £700 of somebody else&rsquo;s money. And you absolutely do not
            quietly do the loft on Monday and let it appear on the final invoice — that converts a
            scope misunderstanding into a billing dispute, and it is the one version of this where
            your firm has no defence at all. <strong>Why the record matters here.</strong> Notice
            that nobody can now prove what was said at the survey. The client remembers pointing at
            the hatch. The surveyor remembers pricing two floors. Neither is lying. If the survey
            notes had listed the loft as seen and excluded, this conversation would have taken forty
            seconds. That is the whole argument for writing things down, and it is being made to you
            for free by somebody else&rsquo;s omission.
          </>
        }
        whyItMatters={
          <>
            <strong>How it resolves.</strong> Probably as a variation: a short written confirmation
            of the loft work and the price, sent by the office, agreed by the client before Monday.
            Possibly as a goodwill decision to absorb part of it, which is your firm&rsquo;s call
            and not yours. Either way the loft does not get wired until somebody who owns the
            commercial relationship has said, in writing, what the arrangement is. And the junction
            box you found still gets recorded, whoever ends up paying.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question:
              'The client is asking me directly what their rights are if the job goes wrong. What do I say?',
            answer:
              'Say that you want them to get an accurate answer rather than your best guess, and that you will get the right person in the firm to come back to them on it — then actually make that happen. Rights and remedies are set by the contract and by consumer law, and they are a question for whoever holds the commercial relationship. Answering off the cuff can commit your firm to something it never agreed, or leave the client relying on something that is not true. Neither helps them.',
          },
          {
            question: 'How much detail should a scope actually have?',
            answer:
              'Enough that somebody who was not at the survey could walk the job and tell what is in and what is out. Rooms or areas, circuits, accessory counts, what is being reused, and the exclusions written plainly. On domestic work the exclusions carry most of the weight — making good, decoration, builder’s work, appliance connection and taking old equipment away are the usual flashpoints. If the scope you are handed is one line on a multi-day job, say so before you start rather than after.',
          },
          {
            question:
              'I found something dangerous that is outside the scope. Do I fix it or do I wait for agreement?',
            answer:
              'Make it safe, tell somebody immediately, and get the remedial work agreed before you carry it out. Those are not in conflict. Making an installation safe — isolating, warning, preventing use — is different from carrying out chargeable remedial work. Record what you found, record what you did to make it safe, and record who you told and when. Then the variation gets agreed properly, and if the client declines it you have a written record that you identified it and reported it.',
          },
          {
            question: 'Can I hold the certificate back until we have been paid?',
            answer:
              'No, and you should not want to. BS 7671 Regulation 644.4 has the Electrical Installation Certificate issued to the person ordering the work by those responsible for the design, construction and verification. It is a safety record of what was installed and what was found, not a lever. A payment dispute is real and it matters, but it is handled by whoever owns the commercial relationship in your firm, through the routes available to them — not by withholding documentation from work that has already been carried out.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'Most disputes are not about workmanship. They are about the gap between what was agreed and what the client expected, and that gap opens on day one.',
          'A quotation is a fixed price for a defined scope. An estimate is a considered prediction that can move. A number said out loud is the weakest position for everybody.',
          'The scope is the boundary of the agreement. Read it before you start, and read the exclusions as carefully as the inclusions.',
          'Anything outside the scope is a variation, and a variation is agreed and recorded before it is carried out — never revealed on the invoice.',
          'Whatever the commercial argument, the client is entitled to safe and compliant work, the certification for it, and to be told when something changes.',
          'BS 7671 Regulation 644.4 puts the Electrical Installation Certificate in the hands of the person who ordered the work. That is not conditional on the money being settled.',
          'Domestic customers and commercial clients sit in different positions. What that means in practice is set by the contract and by consumer law, and it is a question for whoever holds the commercial relationship in your firm.',
          'On a complaint: acknowledge fast, establish the facts before conceding or denying, escalate anything commercial, and write the record the same day.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz questions={quizQuestions} title="3.4 — Clients' rights and contractual agreements" />
    </div>
  );
}
