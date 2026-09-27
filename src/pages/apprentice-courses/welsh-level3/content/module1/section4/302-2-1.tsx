/**
 * Unit 302 — Working in The Building Services Engineering Sector in Wales
 * Learning outcome 2 — Understand how to work effectively with others
 * Criterion 2.1 — How to develop and maintain productive working relationships
 *
 * Approach: treats a site relationship as something built by being reliable about
 * dates, access and mess, not by being liked. Covers other trades, your own gang,
 * apprentices and merchants, with handovers and disagreements as the two places
 * relationships are actually won or lost. Client and stakeholder communication
 * belongs to 2.2 and is deliberately not repeated here.
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
    question: 'What builds a productive working relationship on a construction site?',
    options: [
      'Being reliable about dates, access and mess so other trades can plan around you',
      'Being the most popular person in the canteen',
      'Never raising a problem so nobody thinks you are difficult',
      'Working faster than every other trade on the programme',
    ],
    correctAnswer: 0,
    explanation:
      'Other trades do not need to like you. They need to know when you will be in an area, how long you will hold it and what state you will leave it in. Predictability is what lets a plasterer plan their week, and that is what earns cooperation back.',
  },
  {
    id: 2,
    question: 'What does reciprocity mean in practice between trades?',
    options: [
      'The trade you left a clear route for leaves you one',
      'Every favour must be returned on the same day it was given',
      'Each trade keeps a written tally of favours owed',
      'The main contractor pays a bonus for helping other trades',
    ],
    correctAnswer: 0,
    explanation:
      'Help on site runs on an unwritten account. Sweep up and leave a boarded route clear, and the dry liner does the same for you next week. Chip someone’s architrave and say nothing, and the ladder you need is suddenly always in use.',
  },
  {
    id: 3,
    question: 'When does your reputation on a new site mostly get decided?',
    options: [
      'In the first week, and it is very hard to change afterwards',
      'At the end of the job, when the snagging list is issued',
      'When the site agent reads your risk assessment',
      'Only after three months alongside the same trades',
    ],
    correctAnswer: 0,
    explanation:
      'People form a view of you fast and then look for evidence that confirms it. Turn up on the stated day, hit the first date you promise and leave the first area clean, and you spend the rest of the job getting the benefit of the doubt.',
  },
  {
    id: 4,
    question: 'What makes a good handover of an area to the next trade?',
    options: [
      'Leaving it ready, telling them what changed, and flagging what you found',
      'Leaving quietly so nobody can blame you for the state of it',
      'Sending a long email to the whole distribution list at month end',
      'Waiting for the next trade to ask you what you did',
    ],
    correctAnswer: 0,
    explanation:
      'A handover is three things: the area is fit to work in, the next trade knows what moved, and anything you found — a soaked ceiling, a blocked riser — is flagged before it becomes theirs.',
  },
  {
    id: 5,
    question: 'You chip a joiner’s new architrave dressing a cable. What is the right move?',
    options: [
      'Tell the joiner yourself, the same day, before anyone else finds it',
      'Touch it in with filler and hope the decorator covers it',
      'Say nothing — the snagging list will catch it',
      'Report it to the site agent without speaking to the joiner',
    ],
    correctAnswer: 0,
    explanation:
      'Telling them costs an awkward two minutes. Being found out costs you the relationship for the rest of the job, because after that everything you say gets checked by somebody.',
  },
  {
    id: 6,
    question: 'A dry liner keeps boarding over your back boxes. How should you handle it?',
    options: [
      'Describe the effect with a date, then escalate to whoever holds the programme',
      'Escalate straight to an argument on the landing so everyone hears it',
      'Cut every box out yourself and say nothing to avoid friction',
      'Wait until the handover meeting at the end of the job',
    ],
    correctAnswer: 0,
    explanation:
      'Separate the problem from the person. Say what happened, what it costs and by when you need it different. If nothing changes, take it to the site agent as information about the programme, not as a complaint about a person.',
  },
  {
    id: 7,
    question: 'What does an apprentice mainly learn from you?',
    options: [
      'How you behave — they copy your habits far more than your instructions',
      'Only the theory you explain to them at break times',
      'Whatever the college teaches, regardless of what happens on site',
      'Nothing useful until they reach their third year',
    ],
    correctAnswer: 0,
    explanation:
      'If you isolate and prove dead every time, so will they. Shortcut it once in front of them and that is the version they keep. Telling an apprentice to do it right while they watch you do it fast teaches them the rule is optional.',
  },
  {
    id: 8,
    question: 'Under CDM 2015, what is the position on trades cooperating with one another?',
    options: [
      'Dutyholders must cooperate and coordinate their work to ensure health and safety',
      'Cooperation is encouraged good practice but carries no legal duty',
      'Only the principal contractor has any duty to coordinate anything',
      'Cooperation is required only on sites with more than twenty operatives',
    ],
    correctAnswer: 0,
    explanation:
      'CDM 2015 requires dutyholders to cooperate with each other, coordinate their work, and communicate so everyone understands the risks and the control measures. Getting on with the other trades is not just manners — it is how the law expects a site to run.',
  },
];

export default function Lesson302_2_1() {
  return (
    <div className="space-y-8">
      <TLDR
        points={[
          'A productive relationship on site is transactional in the best sense — built on being reliable about dates, access and mess, not on being liked.',
          'Reciprocity is the mechanism. The trade you left a clear route for leaves you one; the trade whose work you damaged and never mentioned does not.',
          'Your reputation forms in the first week and is very hard to shift afterwards.',
          'Handovers are where relationships are made or lost: leave the area ready, say what changed, flag what you found.',
          'CDM 2015 makes cooperation and coordination between dutyholders a legal duty, not a courtesy.',
        ]}
      />

      <LearningOutcomes
        outcomes={[
          'Explain what makes a site relationship productive, and why reliability beats being liked',
          'Describe how reciprocity between trades works, and what destroys it',
          'Hand an area over so the next trade knows what changed and what you found',
          'Handle a disagreement by separating the problem from the person and escalating to the programme holder',
          'State the CDM 2015 duty to cooperate, coordinate and communicate with other dutyholders',
        ]}
        initialVisibleCount={3}
      />

      <SectionRule />

      <ContentEyebrow>What the relationship rests on</ContentEyebrow>

      <ConceptBlock
        title="A productive relationship is built on what you deliver, not on being liked"
        plainEnglish="People on site do not need to enjoy your company. They need to plan around you. Predictability is the whole product."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Dates.</strong> If you say first fix finishes Thursday, it finishes Thursday. If
            it will not, the plasterer hears that Tuesday — not Thursday afternoon with their labour
            already booked.
          </li>
          <li>
            <strong>Access.</strong> Say which rooms you need and when you will be out. A trade that
            holds an area two days longer than it said costs someone else a day&rsquo;s wages.
          </li>
          <li>
            <strong>Mess.</strong> Offcuts, drum ends, drilled dust. Clearing your own mess is the
            cheapest reputation you will ever buy and the fastest to lose.
          </li>
          <li>
            <strong>Bad news early.</strong> Early bad news is a programme problem somebody can fix.
            Late bad news is your problem, and it turns personal.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Reciprocity is the mechanism"
        onSite="Help on a site runs on an unwritten account. Nobody writes it down and everybody knows the balance."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Clear routes.</strong> Leave a boarded route and a swept stair for the dry
            liner, and the favour comes back the week you need a section of board left off.
          </li>
          <li>
            <strong>Borrowed kit.</strong> The scaffolder who lends you a tower on a Friday is
            opening an account, not being generous. Return it clean and on time and it stays open.
          </li>
          <li>
            <strong>The debt runs both ways.</strong> Damage you hid closes the account permanently,
            and so does taking the last of the shared 110&nbsp;V leads every morning. Turning
            helpful in the final fortnight because you need a favour fools nobody.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="302-2-1-check-1"
        question="You need the ceiling grid left open in two rooms next week. What most improves your chances?"
        options={[
          'Offering the ceiling fixer a coffee on the morning you ask',
          'Having left those rooms clean and on time for the ceiling fixer last month',
          'Asking the site agent to instruct them to leave it open',
          'Explaining how important your work is to the programme',
        ]}
        correctIndex={1}
        explanation="Reciprocity is banked in advance, not negotiated on the day. The favour you are asking for is repayment for the route, the clean floor and the date you hit last month."
      />

      <SectionRule />

      <ContentEyebrow>Reputation and handovers</ContentEyebrow>

      <ConceptBlock
        title="Your reputation is set in the first week"
        plainEnglish="People decide what you are like fast, then spend the rest of the job looking for evidence that they were right."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Day one and the first promise.</strong> On time, signed in, inducted, right PPE,
            own gear — then hit whatever date you give in week one. Give the date you are sure of,
            not the one that sounds impressive.
          </li>
          <li>
            <strong>The first mess.</strong> The first time someone walks past your area and it is
            clear, they stop checking. The first time it is a tip, they never stop.
          </li>
          <li>
            <strong>It travels.</strong> Agents, supervisors and gangs move between jobs. The view
            formed of you in Wrexham turns up in Deeside.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Handovers are where relationships are made or lost"
        onSite="The handover is the moment your work becomes someone else&rsquo;s problem or someone else&rsquo;s easy morning."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Leave it ready.</strong> Boxes set to the right depth, cables dressed and
            labelled, floor swept, no trip hazards, no open holes.
          </li>
          <li>
            <strong>Say what changed.</strong> If you moved a box 200&nbsp;mm because of a noggin,
            the next trade needs that before they set out their lining.
          </li>
          <li>
            <strong>Flag what you found.</strong> Water down a riser, a cracked lintel, a missing
            fire stop. Found and reported is a shared problem; found and ignored becomes yours the
            moment someone works out you were in there.
          </li>
          <li>
            <strong>Confirm it.</strong> One short message to the supervisor listing the rooms
            handed over and the date. It ends the argument before it starts.
          </li>
        </ul>
      </ConceptBlock>

      <RegsCallout
        source="CDM 2015"
        clause="Regulations 8 and 18 · guidance in HSE L153"
        meaning="Dutyholders must cooperate with each other and coordinate their work to ensure health and safety, and must communicate with each other so that everyone understands the risks and the measures being taken to control them. Regulation 18 adds that each part of a construction site must, so far as is reasonably practicable, be kept in good order, and those parts where construction work is being carried out kept in a reasonable state of cleanliness. Cooperation between trades is a legal duty rather than merely good manners — and the state you leave an area in is part of it."
        cite="HSE L153, Managing health and safety in construction"
      />

      <SectionRule />

      <ContentEyebrow>Owning damage and mistakes</ContentEyebrow>

      <ConceptBlock
        title="Damage and mistakes: tell the trade before they find it"
        plainEnglish="Everyone damages something eventually. The relationship survives the damage. It does not survive the concealment."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Tell the trade first, same day.</strong> Go to the joiner whose architrave you
            chipped before anyone else finds it. Two awkward minutes and it is over. A week later it
            looks like you were hoping to get away with it, because you were.
          </li>
          <li>
            <strong>Do not repair their finish.</strong> Filling a chip in someone else&rsquo;s work
            looks deliberate. Offer to pay for it instead — and photograph what is already broken
            before you start in an area, so an honest disagreement stays honest.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="302-2-1-check-2"
        question="You put a screwdriver through a newly skimmed wall fixing a pattress. The plasterer is still on site. What do you do?"
        options={[
          'Fill and sand it yourself so nobody notices the difference',
          'Leave it for the decorator as part of normal making good',
          'Add it to the snagging list later without naming yourself',
          'Find the plasterer the same day and agree how it gets put right',
        ]}
        correctIndex={3}
        explanation="Telling them yourself, the same day, is the cheapest option you have. A hidden repair that is spotted later costs you the plasterer’s cooperation for the rest of the job, and word reaches the other trades within a day."
      />

      <SectionRule />

      <ContentEyebrow>Disagreements and your own team</ContentEyebrow>

      <ConceptBlock
        title="Disagreements: argue about the work, never about the person"
        onSite="Most site rows are a programme clash dressed up as a personality clash. Undress it."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Separate the problem from the person.</strong> &ldquo;The boxes in flats four
            and five are boarded over&rdquo; is a problem. &ldquo;You never look where you are
            boarding&rdquo; is a fight.
          </li>
          <li>
            <strong>Describe the effect with a date, then ask for one thing.</strong> &ldquo;That is
            half a day cutting them out and it puts second fix past Friday. Can you leave the next
            block until I have walked it with you Monday?&rdquo; Not &ldquo;be more careful&rdquo;.
          </li>
          <li>
            <strong>Escalate to the programme, not the argument.</strong> If nothing changes, take
            it to whoever holds the programme, with dates. Never escalate volume: the landing
            remembers the shouting, not the reason.
          </li>
        </ul>
      </ConceptBlock>

      <ConceptBlock
        title="Your own team: consistency, credit and the first mistake"
        plainEnglish="Inside your own gang the rules are the same, but you are watched far more closely."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Consistency, and credit by name.</strong> If one person always gets the dry work
            and another always gets the loft, everyone notices and nobody tells you. When the
            supervisor says the riser looks tidy, name who did it — it buys effort money cannot.
          </li>
          <li>
            <strong>Handle the first mistake so the second gets reported.</strong> If the first
            error someone brings you is met with a bollocking, you have taught the gang to hide the
            next one — and the hidden one is always the expensive one.
          </li>
          <li>
            <strong>Correct in private; say what good looks like.</strong> Never pull someone up in
            front of another trade, and give a standard people can hit: &ldquo;glands lined up,
            labels the same way up, board swept before you leave&rdquo;, not &ldquo;tidy&rdquo;.
          </li>
        </ul>
      </ConceptBlock>

      <InlineCheck
        id="302-2-1-check-3"
        question="An apprentice owns up that they have wired two boards with the line and neutral crossed. How you react mainly determines what?"
        options={[
          'Whether the apprentice completes their qualification',
          'Whether the next mistake gets reported to you or hidden from you',
          'Whether the site agent hears about it before the client does',
          'Whether the time can be charged as a variation',
        ]}
        correctIndex={1}
        explanation="The fix itself is an hour. The precedent lasts the whole job. Deal with it calmly, show them how to check next time, and the gang learns that errors get surfaced early — which is when they are cheap."
      />

      <SectionRule />

      <ContentEyebrow>Who is watching</ContentEyebrow>

      <ConceptBlock
        title="The people watching: apprentices, merchants and the next job"
        onSite="Three groups are quietly forming a view of you while you get on with the work."
      >
        <ul className="space-y-2 text-white">
          <li>
            <strong>Apprentices copy behaviour, not instructions.</strong> Isolate, lock off and
            prove dead every single time and so will they. Shortcut it once in front of them and
            that is the version they keep for twenty years. Explain the why once: &ldquo;we bond
            here because of what happens if that pipe goes live&rdquo; sticks; &ldquo;because I said
            so&rdquo; is gone by Thursday.
          </li>
          <li>
            <strong>Merchants are a working relationship.</strong> Be straight about what you need
            and when, phone shortages through early, collect what you ordered — the wholesaler who
            knows you pick up on time drives a drum of SWA out at four o&rsquo;clock.
          </li>
          <li>
            <strong>The long game.</strong> The site agent here picks the contractors on the next
            job. Nobody tells you when you are being assessed, because you always are.
          </li>
        </ul>
      </ConceptBlock>

      <ContentEyebrow>Where it goes wrong</ContentEyebrow>

      <CommonMistake
        title="Treating quiet as agreement"

        whatHappens={<></>}

        doInstead={<></>}
      />

      <CommonMistake
        title="Holding the bad news until the date arrives"
        whatHappens={
          <>
            <p>
              You knew on Tuesday that first fix was not going to be finished by Thursday. You said
              nothing, because there was still a chance, and because nobody enjoys that
              conversation. On Thursday afternoon the plasterer arrives with two men booked and
              finds half the rooms still open.
            </p>
            <p>
              The day you lost is the small part. The plasterer has paid for labour they cannot
              use, and they heard it from the state of the rooms rather than from you. Early bad
              news was a programme problem somebody could have moved people around. Late bad news
              is your problem, and it turns personal within the hour.
            </p>
          </>
        }
        doInstead={
          <>
            <p>
              Give the date you are sure of rather than the one that sounds impressive, and the
              moment it stops being achievable, say so to the person whose work depends on it.
              Tuesday, not Thursday afternoon.
            </p>
            <p>
              Then make the new position usable. Say which rooms will be ready and when, so they
              can book labour against something real, and confirm it in one short message to the
              supervisor listing what is handed over and the date. That message ends the argument
              before it starts.
            </p>
          </>
        }
      />

      <SectionRule />

      <Scenario
        title="Llandudno: twenty-two flats, six boarded-over back boxes"

        situation={<></>}

        whatToDo={<></>}

        whyItMatters={<></>}
      />

      <SectionRule />

      <FAQ
        items={[
          {
            question: 'I get on with nobody on this site. Does that matter if my work is good?',
            answer:
              'Yes, but not for the reason people usually give. You do not need friends. You need other trades to give you access when you ask, tell you when something changed, and warn you before they board over your work. None of that comes from good workmanship — it is given to people who are predictable and who clear up behind themselves.',
          },
          {
            question: 'Is it snitching to tell the site agent about another trade?',
            answer:
              'It is if you go straight there to score a point. It is not if you have already raised it with the trade directly, nothing changed, and you are now reporting a programme issue with dates and an effect. Speak to the person first, keep it factual, and escalate only when it stays unresolved.',
          },
          {
            question: 'What do I do when another trade damages my work?',
            answer:
              'Exactly what you would want done to you. Photograph it, go to them the same day, describe what is damaged and what it costs to put right, and ask for the specific change that stops it recurring. If it keeps happening after a direct conversation, it becomes a programme matter for the supervisor or site agent.',
          },
          {
            question: 'Why does the way I treat the wholesaler count as a working relationship?',
            answer:
              'Because on the day the job is stopped waiting on a drum of cable, the counter staff decide whether to chase it or not. Being straight about what you need and when, collecting what you ordered and paying on time buys help that no account discount will. It is the same reciprocity that runs between trades on site.',
          },
        ]}
      />

      <KeyTakeaways
        points={[
          'A productive relationship on site is built on being reliable about dates, access and mess — not on being liked.',
          'Reciprocity is the mechanism: the trade you left a clear route for leaves you one, and the trade whose work you damaged and never mentioned does not.',
          'Your reputation forms in the first week and takes months of faultless work to change, if it changes at all.',
          'A proper handover has three parts: the area is ready, the next trade knows what changed, and anything you found is flagged.',
          'Tell the trade about damage yourself, the same day. The relationship survives the damage; it does not survive the concealment.',
          'In a disagreement, separate the problem from the person, describe the effect with a date, and escalate to whoever holds the programme — never escalate the argument.',
          'Inside your own gang: be consistent rather than generous to favourites, give credit by name, and handle the first mistake so the next one gets reported instead of hidden.',
          'CDM 2015 requires dutyholders to cooperate, coordinate and communicate, and Regulation 18 requires the site to be kept in good order — so tidiness and cooperation are duties, not favours.',
        ]}
      />

      <SectionRule />

      <ContentEyebrow>Check yourself</ContentEyebrow>

      <Quiz
        questions={quizQuestions}
        title="2.1 — Developing and maintaining productive working relationships"
      />
    </div>
  );
}
