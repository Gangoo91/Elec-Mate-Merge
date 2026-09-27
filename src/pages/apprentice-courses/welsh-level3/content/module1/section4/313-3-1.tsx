/**
 * Unit 313 — Establish and Maintain Relationships in the Building Services Engineering Sector
 * Learning outcome 3 — Understand the importance of customer service in relation to
 * installation and/or maintenance activity
 * Criterion 3.1 — The methods and organisational procedures for establishing positive
 * relations with clients and customers
 *
 * Approach: the client cannot judge a termination, so they judge everything else — arrival
 * times, warning before the power goes off, the state of the floor at five o&rsquo;clock. This page
 * teaches the small number of repeatable procedures that decide whether a client trusts you,
 * and treats handover as part of the relationship rather than as paperwork.
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
      'A client has no way of judging the quality of your terminations. What do they judge the job on instead?',
    options: [
      'The things they can see and feel — arrival times, warning before the power goes off, how the place is left each evening, and whether they were told the truth',
      'The brand of consumer unit you fitted',
      'How many electricians were on site at once',
      'Whether the van was signwritten',
    ],
    correctAnswer: 0,
    explanation:
      'The electrical work is invisible to them within a week. The conduct around it is what they remember and what they repeat to the next person who asks for a recommendation.',
  },
  {
    id: 2,
    question:
      'At the survey a client asks how long the rewire will take. You are not certain. What is the strongest answer?',
    options: [
      'Give a range with the reason for it, say what could make it the longer end, and confirm the agreed dates in writing afterwards',
      'Give the shortest realistic figure so you win the job, then explain later',
      'Say you never give timescales',
      'Give a date three weeks beyond anything likely so you can never be late',
    ],
    correctAnswer: 0,
    explanation:
      'The survey sets the standard the whole job is measured against. A range with a stated reason is honest and still useful. A short figure to win the work means every day afterwards reads as a failure.',
  },
  {
    id: 3,
    question:
      'What does &ldquo;organisational procedure&rdquo; mean in the context of client relations?',
    options: [
      'The firm&rsquo;s repeatable way of doing it — who makes first contact, what is confirmed in writing, what the daily routine on site is, and what happens at handover',
      'A legal document the client has to sign before work starts',
      'The risk assessment and method statement',
      'The manufacturer&rsquo;s installation instructions',
    ],
    correctAnswer: 0,
    explanation:
      'It is simply the firm&rsquo;s agreed routine, written down so every job runs the same way. Having one matters more than which one you have.',
  },
  {
    id: 4,
    question:
      'You discover on day two that the job will overrun by three days. When do you tell the client?',
    options: [
      'That day, with what you know, what you do not know yet, and what you propose to do about it',
      'At the end of the week, once you have a firm new date',
      'On the last scheduled day, so you do not worry them early',
      'In the invoice covering letter',
    ],
    correctAnswer: 0,
    explanation:
      'Bad news early is the strongest trust-builder available. Bad news late destroys more than the original problem, because it tells the client you were prepared to let them plan around something you knew was wrong.',
  },
  {
    id: 5,
    question:
      'A shop manager needs the tills live for the lunchtime trade. How should the outage be handled?',
    options: [
      'Agree the outage window in advance, confirm it the day before, give a spoken warning immediately before switching off, and tell them the moment power is back',
      'Switch off when you are ready and apologise afterwards',
      'Put a notice on the board and assume it has been read',
      'Ask the client to keep checking whether the power is off',
    ],
    correctAnswer: 0,
    explanation:
      'An unannounced outage is the single most complained-about thing on an occupied site. The warning costs nothing; the surprise costs the client money and costs you the relationship.',
  },
  {
    id: 6,
    question: 'Why does sending a different operative every day damage a client relationship?',
    options: [
      'The client has to re-explain the site, the agreements and the access arrangements each morning, and never builds confidence in anyone',
      'It breaches BS 7671',
      'It always makes the job take longer',
      'The client is legally entitled to the same operative throughout',
    ],
    correctAnswer: 0,
    explanation:
      'Continuity is what lets a client stop supervising you. A named contact who is actually on site most days is worth more to them than a faster crew they do not recognise.',
  },
  {
    id: 7,
    question:
      'Something has gone wrong — a ceiling has been damaged getting cables through. What is the right recovery sequence?',
    options: [
      'Acknowledge it quickly and in person, say exactly what you will do and by when, do it, then follow up to check they are satisfied',
      'Say nothing and make good quietly before they notice',
      'Put it in the final account as an unavoidable consequence of the work',
      'Wait to see whether they raise it',
    ],
    correctAnswer: 0,
    explanation:
      'Clients forgive damage. They do not forgive discovering damage that was hidden from them. Fast acknowledgement, a specific commitment, delivery and a follow-up is the whole recovery.',
  },
  {
    id: 8,
    question:
      'At handover, why is it not enough simply to leave the certification on the kitchen worktop?',
    options: [
      'The client needs to understand what the document is, who it is for and what to do with it, otherwise they have been handed paper rather than something they can use',
      'Certification has to be posted, not handed over',
      'The client must sign the certificate before you leave',
      'Handover is the client&rsquo;s responsibility, not yours',
    ],
    correctAnswer: 0,
    explanation:
      'BS 7671 requires certification to be issued complete with the guidance for recipients set out in Appendix 6 — the notes telling the recipient what the document is and what to do with it. Walking them through it takes five minutes and is the last impression they keep.',
  },
];

export default function Lesson313_3_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'A client cannot judge your terminations. They judge whether you turned up when you said, whether they were warned before the power went off, and what the place looked like at five o&rsquo;clock.',
          'First contact sets the standard. Over-promising at the survey is the commonest self-inflicted wound in this trade.',
          'A procedure is just the firm&rsquo;s repeatable way of doing it — who makes contact, what goes in writing, what the daily routine is, what happens at the end. Having one matters more than which one.',
          'Bad news early is the strongest trust-builder available to you. Bad news late does more damage than the problem it was hiding.',
          'Handover is part of the relationship. A client handed a document they cannot use has not really been given anything.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain why a client judges an installation mainly on conduct rather than on the electrical work itself',
          'Describe how first contact and the survey set the expectations the whole job is then measured against',
          'Set out the organisational procedures a firm uses to establish positive client relations, from first contact to handover',
          'Apply the daily routines that keep an occupied site tolerable for the people living or working in it',
          'Recover a client relationship after something has gone wrong on site',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>What the client is judging</ContentEyebrow>

      <ConceptBlock
        title="The client is not marking the work you think they are marking"
        plainEnglish="Nobody outside the trade can tell a good installation from a poor one. So they grade you on everything else, and they do it from day one."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>What they cannot see.</strong> Cable selection, the tightness of a termination,
            whether the ring is genuinely continuous, whether your test results are real. Within a
            week it is all behind plasterboard and they will never look at it again.
          </li>
          <li>
            <strong>What they can see.</strong> Whether the van arrived at half seven as promised.
            Whether the hallway was swept before you left. Whether the tenant&rsquo;s freezer was
            off for four hours without warning. Whether the question they asked on Monday ever got
            an answer.
          </li>
          <li>
            <strong>What they repeat.</strong> When a caretaker is asked about you six months later,
            they do not describe the distribution board. They say &ldquo;they were clean, they told
            you what was happening, and they finished when they said.&rdquo; That sentence is the
            whole of your reputation.
          </li>
          <li>
            <strong>Why this is not cynical.</strong> Good work is the entry ticket, not the
            differentiator. Two firms both wire it correctly; one gets asked back.
          </li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>First contact and the survey</ContentEyebrow>

      <ConceptBlock
        title="First contact sets the standard for everything afterwards"
        onSite="The tone of the first phone call and the first visit becomes the benchmark. Everything later is judged as better or worse than that."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Answering.</strong> A call returned the same day, even to say &ldquo;I
            can&rsquo;t look at it until Thursday,&rdquo; beats a detailed quote that arrives a
            fortnight later. Most clients ring three firms and go with whoever behaves like they
            want the work.
          </li>
          <li>
            <strong>Turning up to the survey on time.</strong> This is the first promise you make
            and the cheapest one to keep. Break it here and the client spends the whole job checking
            on you.
          </li>
          <li>
            <strong>Listening before measuring.</strong> A ward sister will tell you which bays
            cannot lose power and when the drug round is. A shop manager will tell you Saturday is
            untouchable. That changes your programme and is free if you ask.
          </li>
          <li>
            <strong>Writing down what you were told.</strong> If it never appears again, they assume
            you were not listening. Repeating it back in the quotation proves you were.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Over-promising at the survey is the wound you give yourself"
        plainEnglish="The fastest way to lose a client is to win the job with a timescale or a price you privately doubt."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>How it happens.</strong> You are stood in the hall, another firm has quoted, and
            &ldquo;about three days&rdquo; comes out of your mouth when you know it is four to five.
            Nobody lies deliberately. It is optimism under pressure.
          </li>
          <li>
            <strong>What it costs.</strong> A five-day job quoted at five days finishes on time. The
            same job quoted at three days finishes two days late, and the client remembers it as the
            job that overran, not as the job that took five days.
          </li>
          <li>
            <strong>The honest alternative.</strong> Give a range and the reason for it: &ldquo;Four
            days if the floors lift cleanly, five if the joists are notched the way I suspect.
            I&rsquo;ll know by lunchtime on day one and I&rsquo;ll tell you then.&rdquo; That is
            specific, it is checkable, and it buys you the extra day in advance.
          </li>
          <li>
            <strong>Price works the same way.</strong> Say what is excluded — making good,
            decoration, the DNO&rsquo;s charges, anything behind a wall you have not opened. A
            client who is surprised by an extra feels overcharged even when the figure is fair.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="313-3-1-check-1"
        question="At the survey you are fairly sure a rewire will take five days, but the client is clearly comparing you with a firm that said three. What do you say?"
        options={[
          'Say three days to stay competitive and explain the overrun once you are on site',
          'Quote five days, explain what drives the difference, and say what you will confirm by the end of day one',
          'Refuse to give any timescale until the floors are up',
          'Say five days but do not explain why, so the client cannot argue',
        ]}
        correctIndex={1}
        explanation="An explained five beats an unexplained three every time. The client is not really comparing days, they are comparing who sounds like they have actually thought about their house."
      />

      <SectionRule />

      <ContentEyebrow>Procedures and the daily rhythm</ContentEyebrow>

      <ConceptBlock
        title="What a &ldquo;procedure&rdquo; actually means here"
        onSite="Not a policy document. The firm&rsquo;s agreed routine, written down once so every job runs the same way whoever is running it."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Who makes first contact.</strong> One person answers enquiries and books
            surveys, so nothing falls between two people who each thought the other had it. One
            named person the client rings afterwards, with a number that is answered — not
            &ldquo;the office&rdquo; and not whoever is nearest the van.
          </li>
          <li>
            <strong>What gets confirmed in writing, before anyone lifts a floorboard.</strong> Scope
            in the client&rsquo;s language, not a schedule of rates. Dates, hours, access, agreed
            outage windows.
          </li>
          <li>
            <strong>Exclusions and variations.</strong> Making good, decoration, asbestos, anything
            the distributor has to attend for — written down, because an exclusion on paper is a
            conversation and the same exclusion mentioned later is a row. Every change confirmed the
            same day, in writing, with the cost.
          </li>
          <li>
            <strong>The daily routine, and the end.</strong> Arrival time, the morning word with
            whoever runs the building, sheets down, sweep at five. Then a walk round, the
            certification explained, and a call a week later.
          </li>
          <li>
            <strong>Why having one beats the detail of it.</strong> Two firms with different
            routines both look reliable. A firm with no routine looks different every week, and the
            client notices long before they can say why.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="The daily rhythm on an occupied building"
        onSite="People are living or working around you. The routine you keep every day is what makes that bearable — and it is what they talk about afterwards."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Two minutes every morning.</strong> Find the tenant, the caretaker or the
            manager and tell them what you are doing today and which rooms you need. It is the
            cheapest piece of customer service there is.
          </li>
          <li>
            <strong>Park where you were told.</strong> Not across the neighbour&rsquo;s drop kerb,
            not in the disabled bay, not blocking a delivery bay at eleven in the morning.
          </li>
          <li>
            <strong>Dust, boots, noise and language.</strong> Sheets down before the chase, not
            after. A radio in an empty new-build is fine; the same radio in a care home lounge is
            not. Assume you are always within earshot, and leave the toilet as you found it.
          </li>
          <li>
            <strong>Clear down every day.</strong> Not just the last one. A client who can use their
            kitchen each evening stays calm for a week. One who cannot stops trusting you on day
            two.
          </li>
          <li>
            <strong>Same faces.</strong> A client who meets someone new every morning has to
            re-explain the house every morning and never builds confidence in anyone. Where the
            programme allows it, keep the crew stable and tell the client in advance when it has to
            change.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="313-3-1-check-2"
        question="You are on day three of a five-day job in an occupied flat and your mate is off sick, so the firm sends someone the tenant has never met. What is the right handling?"
        options={[
          'Let the new operative introduce himself when the tenant opens the door',
          'Say nothing — the tenant will work it out',
          'Delay the day&rsquo;s work until your usual mate is back',
          'Ring or tell the tenant before the new operative arrives, say who is coming and why, and brief the operative on what has already been agreed',
        ]}
        correctIndex={3}
        explanation="Continuity broken with a warning is an inconvenience. Continuity broken without one is a stranger on the doorstep, and the tenant then supervises the rest of the job."
      />

      <SectionRule />

      <ContentEyebrow>Warnings and bad news</ContentEyebrow>

      <ConceptBlock
        title="Warn them before the power goes off"
        plainEnglish="The unannounced outage is the most complained-about thing in occupied electrical work, and it is completely avoidable."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Three warnings, not one.</strong> Agreed at the survey, confirmed the day
            before, spoken immediately before you switch. The last one is the one that saves a
            client&rsquo;s spreadsheet or a shop&rsquo;s card terminal.
          </li>
          <li>
            <strong>Find out what is actually on the circuit.</strong> A freezer full of stock. A
            fish tank heater. A stairlift. An oxygen concentrator. A server that takes twenty
            minutes to come back. Ask; do not guess from the board labelling.
          </li>
          <li>
            <strong>Say how long, then beat it.</strong> &ldquo;Off at ten, back by twelve&rdquo;
            and live again at half eleven is a client telling other people you were good. The same
            outage with no stated end time feels like it lasted all day.
          </li>
          <li>
            <strong>Tell them when it is back.</strong> Do not leave the shop manager guessing
            whether it is safe to restart the chiller. And lock off properly while it is off — a
            client who watches you prove dead takes you more seriously for the rest of the job.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Bad news early is the strongest thing you can give a client"
        onSite="Every client eventually gets the bad news. The only variable you control is whether they get it while they can still do something about it."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Why early works.</strong> It hands the client back some control. They can move a
            delivery, warn their staff, rebook a decorator, change their own plans. Late news takes
            all of that away from them.
          </li>
          <li>
            <strong>You do not need the full answer.</strong> &ldquo;I&rsquo;ve found something I
            wasn&rsquo;t expecting. I don&rsquo;t know the full cost yet. I&rsquo;ll know by four
            and I&rsquo;ll ring you&rdquo; is a complete and professional message. Waiting for
            certainty is how a Tuesday problem becomes a Friday crisis.
          </li>
          <li>
            <strong>Say it in person or by phone, then write it up.</strong> Bad news by text reads
            as avoidance. Bring a proposal with it — what you found, the two ways round it, what
            each costs — so you stay the person solving it rather than the person reporting it.
          </li>
          <li>
            <strong>The asymmetry.</strong> A problem told early is usually forgiven. The same
            problem discovered late is remembered as dishonesty, even when it was only awkwardness.
          </li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Going quiet when something goes wrong"
        whatHappens={
          <>
            A lath-and-plaster ceiling comes down in the back bedroom while cables are being
            dropped. Nobody wants the conversation, so the sheet goes back over it and the plan
            becomes &ldquo;sort it before they notice.&rdquo; The client finds it that evening. Now
            there are two problems: a damaged ceiling, and the discovery that the firm was willing
            to hide it. The ceiling was half a day and a few hundred pounds. The concealment costs
            the job, the final payment and every recommendation that client would have made.
          </>
        }
        doInstead={
          <>
            Tell them the same day, before they find it. Acknowledge it plainly — no excuses about
            how difficult old plaster is. Say exactly what you will do and when: &ldquo;I&rsquo;ll
            have a plasterer in Thursday, skimmed and ready for decoration, and it comes off our
            bill.&rdquo; Do it Thursday. Follow up the week after. Fast acknowledgement, a specific
            commitment, delivery, follow-up — that sequence is the whole of relationship recovery,
            and a client who has watched you handle a problem properly trusts you more than one who
            never had a problem at all.
          </>
        }
      />

      <CommonMistake
        title="Switching the supply off without telling anybody first"
        whatHappens={
          <>
            <p>
              You need the board dead for twenty minutes, the client said at the survey that
              mornings were fine, and the shop is quiet. So the main switch goes off. Upstairs a
              card terminal drops mid-sale, a chiller stops and a laptop that was not saved goes
              down with it.
            </p>
            <p>
              Twenty minutes turns into an hour and a half because of what you find, and nobody was
              told an end time, so the manager spends the whole morning unable to decide whether to
              restart the chiller or send staff home. The electrical work was faultless and it is
              the only part of the day nobody will mention.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Warn three times, not once: agree the window at the survey, confirm it the day
              before, and say it out loud immediately before you switch. That last one is the
              warning that saves somebody&rsquo;s stock or somebody&rsquo;s unsaved work.
            </p>
            <p>
              Before you switch, find out what is actually on the circuit by asking rather than
              reading the board labelling &mdash; a freezer full of stock, a stairlift, a server
              that takes twenty minutes to come back. Give a stated end time, beat it if you can,
              and go and tell them when it is live again rather than leaving them guessing.
            </p>
          </>
        }
      />

      <SectionRule />

      <ContentEyebrow>Handover as relationship</ContentEyebrow>

      <ConceptBlock
        title="Handover is part of the relationship, not the end of it"
        plainEnglish="The last hour on site is the impression the client keeps. Rushing it undoes a fortnight of good conduct."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Walk the job with them.</strong> Every room, every new accessory, every switch
            they need to find in the dark. Let them operate things while you are stood there.
          </li>
          <li>
            <strong>Show them the board.</strong> Where the main switch is, what an RCD looks like
            when it has tripped, how to reset it, and when to stop and ring you instead of resetting
            it again.
          </li>
          <li>
            <strong>Hand the certification over and explain it.</strong> What the document is, who
            it is for, why it matters when they sell or let the property, and where to keep it.
            Certification is required to be issued complete with the guidance for recipients set out
            in Appendix 6 of BS 7671 — those notes exist precisely so the recipient knows what to do
            with the paperwork.
          </li>
          <li>
            <strong>Say what happens next, and leave it clean.</strong> The next inspection date,
            anything outstanding, anything left for another trade. Old accessories, offcuts and
            packaging go with you — a client who spends Saturday clearing up after you remembers
            that, not the neat board.
          </li>
          <li>
            <strong>Ring a week later.</strong> Sixty seconds. Nothing sells the next job like a
            firm that rang when it had nothing to gain.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="BS 7671:2018+A4:2026"
        clause="Regulation 644.4"
        meaning="The certificate is not yours and it is not the file copy — it goes to the person who ordered the work. BS 7671 requires that the Electrical Installation Certificate &ldquo;shall be issued to the person ordering the work ... by the person or persons responsible for the design, construction and verification of the installation, taking account of their respective responsibilities.&rdquo; In relationship terms: the person who paid you is entitled to the document, from you, at handover. Leaving it to follow &ldquo;in the post&rdquo; and then forgetting is one of the commonest ways a job that went well ends badly."
        cite="BS 7671:2018+A4:2026, Regulation 644.4"
      />

      <InlineCheck
        id="313-3-1-check-3"
        question="You are handing over a consumer unit change to an elderly tenant who has never heard of an RCD. What does a good handover include?"
        options={[
          'Leave the certificate on the worktop and point at the board on the way out',
          'Show her the main switch and the RCDs, demonstrate a reset, explain when to ring you instead of resetting, hand over the certification and explain what it is for',
          'Email the certificate and assume the letting agent will explain it',
          'Explain the test results in full so she has the complete technical picture',
        ]}
        correctIndex={1}
        explanation="A client handed a document they cannot use has not really been given anything. Handover is about what she can do on a dark Tuesday night, not about your Zs readings."
      />

      <SectionRule />

      <Scenario
        title="Day two in a family bakery in Pontypridd"
        situation={
          <>
            Two days into a three-day job in a small family bakery on a side street in Pontypridd:
            new consumer unit, new submain to the oven board, a handful of remedials. The owner has
            told you twice that a wholesale order goes out Saturday and the ovens must be running by
            Friday night. On Tuesday lunchtime you pull the meter cupboard apart properly and find
            the existing supply arrangement will not carry the new oven board — the distributor has
            to attend first, and they do not turn up at a couple of days&rsquo; notice. Your own
            work is fine. You could finish by Friday exactly as promised, hand over, and let her
            discover on Saturday morning that the ovens cannot be loaded. The alternative is walking
            into a hot bakery on a Tuesday afternoon to tell her the Saturday order is in trouble.
          </>
        }
        whatToDo={
          <>
            Tell her that afternoon, before she buys the flour. Say what you have found in plain
            terms, say what you do not yet know — the distributor&rsquo;s lead time and charge — and
            say when you will know it. Ring the distributor while you are still on site so you can
            give her something concrete the same day. Bring options, not a dead end: what can be
            energised safely on the existing arrangement, whether the ovens can run on the old board
            for one more weekend, and the realistic date for the full changeover. Confirm it by
            email that evening so she has something to plan around, keep working on everything that
            is not blocked, and give her a one-line update each afternoon whether or not anything
            has moved.
          </>
        }
        whyItMatters={
          <>
            Both routes end at the same technical fact: the distributor has to attend and the
            changeover slips. Told on Tuesday, she moves the order, runs the weekend on the old
            board and loses nothing — and she has watched you bring her a problem that cost you an
            uncomfortable conversation and gained you nothing. Told on Saturday morning, she loses
            the order, the customer and a week&rsquo;s margin, and what she remembers is not that
            the supply was undersized. It is that you knew on Tuesday. The job overruns either way.
            Only one version leaves you with the bakery and everyone she talks to.
          </>
        }
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'Is this not just common sense rather than something you can be assessed on?',
            answer:
              'It is common sense that is very unevenly applied, which is why firms write it down. The assessable part is being able to describe the specific methods and the firm&rsquo;s procedures — who makes first contact, what is confirmed in writing, what the daily site routine is, how variations are handled, what happens at handover — rather than saying you are polite.',
          },
          {
            question: 'What if the client is being unreasonable?',
            answer:
              'Separate the behaviour from the request. Deal with the request on its merits, in writing, against the agreed scope. Stay factual and unhurried, keep a record of what was asked and what was answered, and escalate to whoever in the firm owns the client relationship rather than arguing on site. Most unreasonable clients are frightened clients who have been left without information.',
          },
          {
            question: 'How much should I tell a client about a technical problem?',
            answer:
              'Enough for them to make the decision in front of them, in language they can use. They need to know what is wrong, what their options are, what each costs, how long each takes and what you recommend. They do not need your Zs readings. If they want the detail they will ask, and then you give it.',
          },
          {
            question: 'Who actually owns the client relationship — me or the firm?',
            answer:
              'The firm owns it and you carry it. That is exactly why procedures exist: so a client gets the same experience whichever operative is on site, and so anything you agree on the doorstep is recorded somewhere other than your head. Anything you promise a client becomes the firm&rsquo;s promise the moment you say it.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'The client cannot judge the electrical work, so they judge the conduct around it — timekeeping, warning, cleanliness, straight answers.',
          'First contact sets the standard the whole job is measured against; a call returned the same day beats a perfect quote a fortnight late.',
          'Over-promising at the survey is the commonest self-inflicted wound. Give a range with the reason for it and state your exclusions.',
          'A procedure is the firm&rsquo;s repeatable routine — who makes contact, what goes in writing, the daily rhythm, the handover. Having one matters more than which one.',
          'Confirm scope, exclusions, hours, access and outage windows in writing before work starts, and treat every variation the same way.',
          'Never switch the supply off without warning; agree the window, confirm the day before, warn immediately before, and tell them when it is back.',
          'Bad news early hands the client back control. Bad news late is remembered as dishonesty even when it was only awkwardness.',
          'Handover is part of the relationship: walk the job, demonstrate the board, hand the certification over in person and explain what it is for.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz
        questions={quizQuestions}
        title="Establishing positive relations with clients and customers"
      />
    </div>
  );
}
