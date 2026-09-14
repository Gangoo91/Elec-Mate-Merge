/**
 * Functional Skills · Module 2 · Section 3 — Communication skills
 *
 * CONVERTED (13 Sep) from the 2024 dialect to the StudyPage reading kit.
 * DENSITY PASS (13 Sep): the converted page explained more than it taught —
 * sixteen ConceptBlocks, four worked examples, two try-its, six of eight
 * sections ending with nothing for the learner to do. This pass merges the
 * sixteen ConceptBlocks down to eight (one per section, each made denser, not
 * thinner) and adds six WorkedExample and four TryIt blocks so every section
 * runs ConceptBlock → WorkedExample, most followed by a TryIt, with zero
 * ordering exceptions. Nothing factual was cut — only commentary that could
 * sit in any trade course on any topic.
 *
 * This is the SPOKEN half of Module 2. Section 2 owns the forms; this one
 * owns the conversation: the client on the doorstep, the phone call, the
 * project manager across the table, the plumber who has just found your
 * cable route blocked. Where the two meet (a certificate, a test result)
 * this section only covers how you talk about it.
 *
 * The eight original sections, eight quiz questions and three InlineChecks
 * (m2s3-client-comms, m2s3-telephone, m2s3-complaints) are all preserved,
 * ids included, options and correctAnswer indices unchanged.
 *
 * WorkedExample on a speaking page is a script: a bad thing to say, the
 * steps that fix it, then the improved version. A TryIt is the same shape
 * with no answer supplied. Some sections use two worked examples where they
 * teach two distinct techniques — the ordering rule only requires a
 * ConceptBlock be followed by at least one before the section moves on.
 *
 * The LEAP framework (Listen / Empathise / Apologise / Problem-solve) is
 * kept as-is. InlineCheck m2s3-client-comms teaches explaining an RCD to a
 * client in plain English — a different skill from Module 2 Section 4,
 * which teaches "RCD" as the correct written term; the two are not in
 * tension. The IET is named once, in the networking section, as the
 * publisher of BS 7671 and a real body an electrician can join — fact, not
 * a pitch.
 *
 * No <RegsCallout>: this page paraphrases throughout, and that component
 * renders its `clause` prop as quoted regulation text.
 */

import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import { HubPage, HubBody, HubMasthead } from '@/components/hub/HubPrimitives';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import {
  StudyPage,
  ReadingProgress,
  TLDR,
  ConceptBlock,
  CommonMistake,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  Prerequisites,
  Scenario,
  ContentEyebrow,
  SectionRule,
  WorkedExample,
  TryIt,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Communication Skills - Functional Skills Module 2.3';
const DESCRIPTION =
  'Functional Skills English for electricians: explaining technical work to clients, professional telephone conversations, contributing at site meetings, handling complaints with the LEAP framework, and coordinating with other trades on site.';

const quizQuestions = [
  {
    id: 1,
    question:
      'A homeowner is worried about the cost of a full rewire. What is the best approach to this conversation?',
    options: [
      'Pressure them to commit today by warning their safety cannot be guaranteed otherwise',
      'Explain the safety reasons and offer to phase the work if possible',
      'Suggest they shop around for the cheapest quote they can find elsewhere',
      'Avoid the cost discussion and simply invoice them once the work is finished',
    ],
    correctAnswer: 1,
    explanation:
      'Explain why the rewire is necessary, what the work involves, and — where it genuinely is possible — offer to phase it so the cost can be spread. That builds trust and shows you have understood the concern without dropping your professional recommendation. Pressure and evasion both cost you the relationship faster than an honest conversation about money ever will.',
  },
  {
    id: 2,
    question:
      'During a site meeting, a project manager asks you to confirm that your first-fix work will be complete by Friday. You are not sure you can meet this deadline. What should you do?',
    options: [
      'Confirm Friday to avoid conflict, then explain later if you miss it',
      'Say nothing and hope the deadline is forgotten',
      'Be honest about the situation, explain what is achievable, and discuss any obstacles',
      'Tell the project manager it is not your responsibility to track deadlines',
    ],
    correctAnswer: 2,
    explanation:
      'An unrealistic commitment does more damage to trust than an honest one ever does. Say what you can actually achieve, name the obstacle, and let the project manager work the programme around a true figure rather than a hopeful one.',
  },
  {
    id: 3,
    question:
      'A client telephones to report that their RCD keeps tripping. You cannot visit until tomorrow. What information should you gather during the call?',
    options: [
      'Only their full name and address, so that you can find the property',
      'Advise them to tape over the RCD so it stays on until you arrive',
      'Only the make and model of their consumer unit and its age',
      'When it started, which RCD trips, any patterns, and any new appliances',
    ],
    correctAnswer: 3,
    explanation:
      'Timing, which device, any pattern, and anything new plugged in gives you a starting point before you have even left the yard. Never advise a client to defeat a protective device — an RCD that trips repeatedly is telling you something, and taping it shut silences the message rather than the fault.',
  },
  {
    id: 4,
    question:
      'You need to explain to a homeowner why their consumer unit needs replacing. Which explanation is most appropriate?',
    options: [
      'The unit lacks the protection current regulations require; a new one with RCDs guards against shock and fire',
      'Your old consumer unit is rubbish and could burn the house down at any moment now',
      'Tell them firmly that the work is required and they really have no choice in the matter',
      'Explain it using as much technical jargon as possible so that you sound expert',
    ],
    correctAnswer: 0,
    explanation:
      'State the fact — it does not meet the current standard — and the benefit — RCD protection against shock and fire. That is honest and specific without exaggerating for effect, browbeating the client, or hiding behind jargon they cannot check.',
  },
  {
    id: 5,
    question:
      'A plumber on site has accidentally drilled through one of your cables. How should you handle this?',
    options: [
      'Ignore it, as the plumber is responsible for their own mistakes on site',
      'Report it to the site manager, assess calmly, and arrange a repair',
      'Confront the plumber angrily and refuse to ever work alongside them again',
      'Quietly repair the cable yourself and say nothing to anyone about it',
    ],
    correctAnswer: 1,
    explanation:
      'Report it through the proper channel, assess the damage without heat, and get it repaired. Losing your temper fixes nothing and you still have to work alongside this person tomorrow; staying quiet about it leaves an unrecorded fault in the installation and a repeat of the same clash next week.',
  },
  {
    id: 6,
    question:
      'When presenting at a toolbox talk about safe isolation, what is the most important thing to remember?',
    options: [
      'Get through the talk as quickly as possible so that work can start',
      'Read the procedure word-for-word from the sheet without ever looking up',
      'Speak clearly, demonstrate practically, and check everyone has understood',
      'Use as much technical detail as possible to show off your expertise',
    ],
    correctAnswer: 2,
    explanation:
      'A toolbox talk has done its job only if the room can apply it. Speaking clearly, showing the prove-test-prove sequence on real test equipment rather than describing it, and checking understanding before people disperse is what makes the safety message stick rather than just get delivered.',
  },
  {
    id: 7,
    question:
      'A client complains that the light fittings you installed are not the ones they chose. You check and discover you installed the correct fittings as specified on the order. How should you respond?',
    options: [
      'Insist you are right and refuse to discuss the matter any further',
      'Listen, show them the specification they approved, and resolve it together',
      'Offer to replace the fittings free of charge just to keep the peace',
      'Blame the supplier for sending you the wrong fittings in the first place',
    ],
    correctAnswer: 1,
    explanation:
      'Listen first, then show the signed specification calmly rather than leading with it. Being right is not the same as handling it well — a client who feels dismissed will remember that over the paperwork that proved you correct.',
  },
  {
    id: 8,
    question:
      'What is the most effective way to communicate with trades who speak English as a second language on a multi-trade site?',
    options: [
      'Use plain language, support it with diagrams or notes, and confirm understanding',
      'Speak loudly and slowly, repeating the same words until they finally understand',
      'Use as much trade slang as possible, since it is quicker for you to say',
      'Avoid speaking to them directly and only communicate through their supervisor',
    ],
    correctAnswer: 0,
    explanation:
      'Plain words, a diagram or a written note where one will help, and a check that the message has actually landed — asking the person to repeat back the key point rather than assuming a nod means understanding. Volume does not translate anything; slang travels even less well across a language gap than it does within one.',
  },
];

const FunctionalSkillsModule2Section3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 3"
        title="Communication skills"
        backTo="/study-centre/apprentice/functional-skills/module2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage measure="74rem" wide="94rem">
          <p className="text-[13px] leading-relaxed text-white">
            A certificate can be checked against a schedule. A conversation cannot — the client only
            has your words, your tone, and how you handled the moment they were worried or annoyed.
            This section is about the spoken half of the job: the doorstep introduction, the phone
            call that decides whether you get the work, the site meeting where you say you are
            behind before somebody else notices, and the complaint that either ends a relationship
            or strengthens it.
          </p>

          <LearningOutcomes
            outcomes={[
              'Adapt your tone and vocabulary to a client, a colleague, a project manager and another trade without sounding like four different people.',
              'Explain a cost, a fault or a set of test results to a non-technical client in language they can act on.',
              'Gather the right information on an unplanned phone call, including one reporting a possible emergency, and steer a call that arrives in the wrong order.',
              'Contribute at a site meeting: prepare, report facts rather than hopes, and give an honest answer under pressure rather than a confident guess.',
              'Apply the LEAP framework to a complaint whether the client turns out to be right or wrong, and produce a response that resolves it rather than escalates it.',
              'Coordinate a shared work area or a route clash with another trade without it becoming a dispute.',
              'Build the kind of professional reputation that generates repeat work and referrals, and confirm a verbal instruction in writing before it becomes a dispute.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'A working vocabulary of the job',
                gist: 'You cannot explain an RCD, an MCB or a consumer unit to somebody else in plain terms until you are solid on what they actually are.',
              },
              {
                term: 'Section 2 of this module (optional)',
                gist: 'Writing and speaking are different skills, but they share one habit — thinking about who is receiving the message before you send it.',
              },
            ]}
          />

          <TLDR
            points={[
              'Same five habits underneath every conversation: be clear, be honest, be respectful, be concise, listen.',
              'One fact, several vocabularies. The failed test, the missed deadline or the drilled cable never changes — only which of your own words you reach for changes, depending on who is listening.',
              'A worried client responds to an honest explanation with an offer of options, never to pressure or to being talked down to — and a request you consider unsafe gets declined with a reason and an alternative, not a flat no.',
              'On the phone your voice is the only tool you have — no expression, no gesture — so confirm the important details out loud, ask about safety before diagnosis, and take control of a call that arrives in the wrong order.',
              'At a site meeting, report what happened, not what you hope will happen. An honest "I am behind and here is why, and here is a date I can stand behind" beats a confident deadline you cannot hit.',
              'LEAP a complaint: Listen, Empathise, Apologise where it is warranted, Problem-solve. The sequence is the same whether the client turns out to be right or wrong — only the apology changes weight.',
              'Coordinate with other trades early — most clashes are cheap to fix before work starts and expensive after — and confirm a verbal instruction in writing the same day, before memory of it starts to drift.',
              "Reputation is built one kept promise at a time and lost in a single bad-tempered phone call, or a comment about someone else's work you were not asked to give.",
            ]}
          />

          <SectionRule />

          {/* ── 01 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>01 · Professional communication</ContentEyebrow>

          <ConceptBlock
            title="Five habits underneath every conversation, adapted to four audiences"
            onSite="Your technical knowledge is only as useful as your ability to hand it to somebody else. A perfect diagnosis nobody can follow does nobody any good."
          >
            <p>
              You communicate in more registers in one week than most trades do: a homeowner on the
              doorstep, a project manager across a table, a supplier on hold, a plumber sharing your
              floor void, an apprentice you are training. Five things hold underneath all of them:{' '}
              <strong className="text-white">clear</strong> — say what you mean and save the jargon
              for people who already have it; <strong className="text-white">honest</strong> — if
              you do not know, say so, and raise a problem before it grows;
              <strong className="text-white"> respectful</strong> — the labourer, the client and the
              site director get the same courtesy; <strong className="text-white">concise</strong> —
              busy people notice when you have wasted their time; and{' '}
              <strong className="text-white">listening</strong> — half of communication is
              receiving, so ask a clarifying question before you answer one.
            </p>
            <p className="mt-3">
              None of that changes from one conversation to the next. What changes is which of your
              own vocabulary you draw on — this is not being a different person for each audience,
              it is choosing the right words for the room you are in: plain English and patience
              with basic questions for a <strong className="text-white">client</strong>; technical
              shorthand for a <strong className="text-white">colleague</strong>, because it is
              faster and you already share it; progress, timelines and anything threatening either,
              stated plainly, for a <strong className="text-white">project manager</strong>; and
              respect for their expertise plus clear coordination on anything shared, for{' '}
              <strong className="text-white">other trades</strong>.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="An RCD on a rewired circuit failed its trip-time test today. You need to tell three different people the same underlying fact before you leave site: the homeowner, the project manager, and the electrician taking over the job tomorrow. Script each one."
            steps={[
              {
                calc: 'Fix the underlying fact first, before choosing any words',
                note: 'The RCD protecting this circuit did not disconnect fast enough during testing, so the circuit has been left isolated. That fact is identical in all three conversations — only the words change.',
              },
              {
                calc: 'CLIENT — plain, reassuring, no figures',
                note: `"The safety switch protecting that circuit isn't tripping fast enough, so I'm leaving that circuit switched off tonight rather than risk it. I've got a replacement device with me and it'll be fitted and tested again first thing tomorrow."`,
              },
              {
                calc: 'PROJECT MANAGER — impact on the programme, stated plainly',
                note: `"RCD on circuit 4 failed trip-time testing, so I've isolated that circuit rather than sign it off. Replacement's going in first thing tomorrow — it won't affect handover, but I wanted you aware before I leave site tonight."`,
              },
              {
                calc: 'COLLEAGUE — full technical detail and shorthand, no softening needed',
                note: `"RCD on circuit 4 failed the trip test — over 300ms at rated current, needs to be under 300 for a Type AC. It's isolated. Spare's in the van, same DIN rail position, should be a ten-minute swap and retest."`,
              },
            ]}
            answer={`"The RCD didn't trip fast enough" never changes across the three versions above — what changes is the level of detail, what gets emphasised, and how much reassurance is doing the work. The client gets safety and a plan; the project manager gets programme impact; the colleague gets the number and the fix.`}
            watchOut="Do not hand the client the trip-time figure in milliseconds — it means nothing to them and reads as showing off rather than explaining. Do not hand the project manager a technical detail dump when what they actually need from you is one sentence about whether it affects the programme."
          />

          <TryIt
            question="You've arrived to find the customer's consumer unit is already full — there are no spare ways for the new socket circuit they've asked you to add. Script the same underlying fact for the client, then for a colleague who is coming to help you finish the job, in one or two sentences each."
            steps={[
              {
                calc: 'Fix the fact',
                note: 'There is no free way in the existing board for a new circuit — something has to change before the new socket circuit can go in.',
              },
              {
                calc: 'Client version',
                note: 'Plain English, focused on the option and the cost, not the technical reason. Mentions what needs to happen next and roughly what it involves.',
              },
              {
                calc: 'Colleague version',
                note: 'Shorthand is fine — state the board type, ways used, and what you are proposing (a small extension unit, a higher-density board, or reviewing what is on the existing ways) without explaining what a "way" is.',
              },
            ]}
            answer={`Client: "There's no free space left in your existing consumer unit for the new socket circuit, so we'll need to add a small extra unit alongside it to fit it in — I can price that up for you." Colleague: "Board's full, no spare ways — I'm going to add a garage unit next to it for the new circuit rather than try to squeeze it in." Same fact, same conclusion, different vocabulary for who's listening.`}
          />

          <CommonMistake
            title="One voice for every audience"
            whatHappens="You explain an insulation resistance reading to a worried homeowner in exactly the terms you would use with another electrician, or you speak to a project manager the way you would speak to a mate on the tools. Either way the message lands wrong for the room it is in."
            doInstead="Ask yourself who is actually listening before you decide how to say something. The same fact — a failed RCD test, a delayed first fix — needs different words for a client, a colleague and a project manager, even though the underlying fact never changes."
          />

          <SectionRule />

          {/* ── 02 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>02 · Client communication</ContentEyebrow>

          <ConceptBlock title="First impressions, and the principles that hold through every conversation after them">
            <p>
              A client's confidence in you is mostly decided before you have explained a single
              technical thing. <strong className="text-white">Arrive on time</strong>, and if you
              will be late, call ahead rather than let them find out by watching the clock.{' '}
              <strong className="text-white">Introduce yourself</strong> in one sentence — name,
              company, purpose: &ldquo;Good morning, I&rsquo;m [name] from [company]. I&rsquo;m here
              to [reason].&rdquo; <strong className="text-white">Look the part</strong> — clean,
              branded workwear does more for a client&rsquo;s confidence than anything you say in
              the first five minutes. And{' '}
              <strong className="text-white">ask before you assume</strong>: &ldquo;Would you like
              me to remove my boots?&rdquo; costs nothing and reads as consideration.
            </p>
            <p className="mt-3">
              What happens in the conversation itself is governed by four principles that hold for
              every client, on every job, whatever the news you are delivering. Use{' '}
              <strong className="text-white">plain English over precision for its own sake</strong>{' '}
              — &ldquo;the insulation around the cables has broken down&rdquo; does more work than
              &ldquo;your R2 values are non-compliant&rdquo;, because the client can actually use
              the first one.{' '}
              <strong className="text-white">Lead with the benefit, not the fear</strong> — a client
              acts on understanding how the work protects their family, not on how alarmed you can
              make them feel.{' '}
              <strong className="text-white">Offer options where they genuinely exist</strong> —
              phasing the work, prioritising the most urgent items — without inventing one that is
              not really there or withholding one that is. And{' '}
              <strong className="text-white">put it in writing afterwards</strong>: a short
              follow-up email or message turns a conversation into a record both of you can point
              back to.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Turn a nervous opening into a script that actually helps a client through worrying news: an EICR has found the wiring in a 1960s house needs a full rewire, and the homeowner is on a limited income."
            steps={[
              {
                calc: 'BAD OPENING — "I\'ve finished, and I have to tell you your whole house needs rewiring, it\'s pretty dangerous as it stands."',
                note: 'True, but it leads with alarm and gives the client nothing to do with the information except worry.',
              },
              {
                calc: 'STEP 1 — Say what you found, in plain terms',
                note: '"The wiring in your home is original from when the house was built in the 1960s. Over sixty years the insulation around the cables has broken down."',
              },
              {
                calc: 'STEP 2 — Say what that means, without dramatising it',
                note: '"That means there\'s an increased risk of shock and fire, and the installation doesn\'t have the modern safety devices — RCDs — that would protect you if a fault developed."',
              },
              {
                calc: 'STEP 3 — Give the recommendation',
                note: '"I\'d recommend a full rewire, which brings the property up to the current safety standard."',
              },
              {
                calc: 'STEP 4 — Acknowledge the cost, and offer what you can',
                note: '"I understand this is a significant expense. I\'m happy to talk through options, including whether the work could be phased to spread the cost."',
              },
            ]}
            answer={`"Mrs Davis, I've completed the inspection and I need to go through some of the findings with you. The wiring in your home is original from when the house was built in the 1960s, and over sixty years the insulation around the cables has broken down — that means an increased risk of shock and fire, and there's no RCD protection to guard against a fault. I'd recommend a full rewire. I know that's a significant cost, and I'm happy to talk through options, including doing the work in stages."`}
            watchOut="Notice the recommendation sits in the middle, not the opening line and not buried at the end. Leading with it sounds like a sales pitch; burying it reads as if you are working up to bad news. Stating it plainly, once, in the middle of the explanation, is what makes it land as a professional judgement rather than either extreme."
          />

          <WorkedExample
            question="A client asks you to permanently disconnect the mains-wired smoke alarm in the kitchen because it keeps going off whenever they cook. You are not willing to leave a property without a working alarm covering that space. Script the conversation so it stays a discussion, not a stand-off."
            steps={[
              {
                calc: 'BAD RESPONSE — "No, I can\'t do that, it\'s against the regs."',
                note: 'Probably true, but it is a flat wall with nothing behind it — no acknowledgement of a genuine daily annoyance, and no way forward offered.',
              },
              {
                calc: 'STEP 1 — Acknowledge the real problem, then say what you will not do and why',
                note: 'A daily nuisance dismissed as unimportant turns this into an argument — but a kitchen without a working alarm in the means of escape is a genuine risk to their household, not just a box you have to tick.',
              },
              {
                calc: 'STEP 2 — Offer the fix that actually solves their problem, and close on it',
                note: "A heat detector instead of a smoke detector (heat rises with cooking; smoke particles trigger the more sensitive device), or relocating the alarm further from the cooker — end on what you will do, not what you won't.",
              },
            ]}
            answer={`"I get why that's driving you mad — nobody wants an alarm going off every time they fry something. What I'm not willing to do is leave the kitchen without any working alarm, because that's exactly the room a fire is most likely to start in. What I'd suggest instead is swapping it for a heat detector in here, which won't react to cooking smoke the way this one does. Want me to sort that while I'm here?"`}
            watchOut="Leading with the refusal, even a polite one, puts the client on the back foot before they have heard the fix. Acknowledging the annoyance first and closing on the solution keeps the whole exchange collaborative rather than confrontational — you never actually have to say the word 'no'."
          />

          <InlineCheck
            id="m2s3-client-comms"
            question="A client asks you to explain what an RCD does. Which explanation is most appropriate for a non-technical person?"
            options={[
              'It monitors the line and neutral conductors and trips on an imbalance exceeding 30mA',
              'It is a safety device that cuts the power quickly on a fault — like a safety net',
              'It is the residual current device required by Regulation 411.3.3 of BS 7671',
              'It is the thing in the box that trips whenever something goes wrong somewhere',
            ]}
            correctIndex={1}
            explanation="For a non-technical listener, a plain description plus a familiar image does the job a precise spec sheet cannot. 'Safety device that cuts the power quickly' plus the safety-net image gives them an accurate mental model without needing to understand imbalance thresholds or a regulation number. That is speech to a client, not the written record — Section 4 of this module covers why 'RCD' is the term to put on a form."
          />

          <SectionRule />

          {/* ── 03 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>03 · Site meetings</ContentEyebrow>

          <ConceptBlock
            title="What each meeting is for, and what a good contribution actually looks like"
            plainEnglish="Nobody expects a polished speech at a site meeting. They expect an answer that is actually true."
          >
            <p>
              Site meetings come in a handful of shapes, and knowing which one you are in tells you
              what is actually being asked of you: a{' '}
              <strong className="text-white">progress meeting</strong>, usually weekly, wants what
              is done, what is planned next, and anything threatening the programme; a{' '}
              <strong className="text-white">coordination meeting</strong> wants how trades will
              share space, especially where several need the same area at once; a{' '}
              <strong className="text-white">health and safety meeting</strong> wants performance,
              incidents and near misses, and the plan for anything high-risk coming up; a{' '}
              <strong className="text-white">design meeting</strong> wants changes and clashes
              between services, and the agreed way through them; and a{' '}
              <strong className="text-white">toolbox talk</strong> is a short, focused safety
              briefing, usually before a shift or a specific task.
            </p>
            <p className="mt-3">
              Contributing well to any of them is mostly preparation, not delivery.{' '}
              <strong className="text-white">Prepare</strong> — know what your team has done, what
              is next, and what needs raising, before the meeting starts.{' '}
              <strong className="text-white">Report facts, not hopes</strong> — if you are behind
              programme, say so and say why, because a confident answer that turns out untrue costs
              more than an honest one that sounded weaker on the day.{' '}
              <strong className="text-white">Raise problems early</strong> — a problem raised this
              week is a discussion; raised next week, it is a crisis.{' '}
              <strong className="text-white">Take notes</strong>, because decisions and actions that
              affect your work do not survive on memory alone. And{' '}
              <strong className="text-white">follow up</strong> — an action you were given and did
              not complete is worse than never having been given it.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A project manager asks you to confirm first-fix will be complete by Friday. You are two days behind because a delivery of containment arrived late. Script your honest answer."
            steps={[
              {
                calc: 'Do not confirm a date you cannot see a route to',
                note: 'Confirming Friday to avoid an awkward moment turns into a worse conversation on Friday, when the work still is not done.',
              },
              {
                calc: 'State where you actually are',
                note: '"We\'re about two days behind on first fix" — a fact, stated once, not hedged.',
              },
              {
                calc: 'Give the reason, briefly',
                note: '"The containment delivery was delayed — it arrived Tuesday instead of Friday last week."',
              },
              {
                calc: 'Give the realistic date, and offer what you are doing about it',
                note: '"On current progress we\'ll finish first fix by Tuesday — we\'ve booked an extra day on site this week to close the gap." A number you can stand behind, plus proof the delay is being managed, not just reported.',
              },
            ]}
            answer={`"We're about two days behind on first fix — the containment delivery was late arriving. On current progress we'll finish by Tuesday. We've booked an extra day on site this week to close the gap." Four short sentences: where you are, why, when, and what you are doing about it.`}
            watchOut="Silence is not the safer option either. Reporting nothing and hoping the deadline is forgotten just means the project manager finds out from the programme slipping instead of from you — and now it looks like you either didn't know or didn't say."
          />

          <TryIt
            question="At the same meeting, the project manager also asks whether testing will be complete by Wednesday's handover. You're waiting on the last two rooms being decorated before you can complete the final checks in them. Script your honest answer, using the same shape."
            steps={[
              {
                calc: 'State where you are and why, then give a realistic date tied to a real dependency',
                note: "\"Testing's done everywhere except the two rooms still being decorated — I need them clear to test sockets and fittings in position. I can complete those the day after the decorators finish, and I'll be on standby to do it the moment they're out.\"",
              },
            ]}
            answer={`"Testing's complete everywhere except the two rooms the decorators are still in — I need them clear to test properly. Once decorating's done I can complete those checks the same day, and I'll be watching their progress so I'm ready the moment they're out."`}
          />

          <SectionRule />

          {/* ── 04 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>04 · Telephone skills</ContentEyebrow>

          <ConceptBlock
            title="No body language, so the words carry everything"
            onSite="On a call, a pause reads as hesitation and a flat tone reads as disinterest, because there is nothing else to go on."
          >
            <p>
              You use the phone to book visits, discuss work, coordinate with suppliers, report to
              the office and take emergency callouts. With no facial expression and no gesture to
              soften or clarify anything, your words and your tone are doing the entire job that a
              face-to-face conversation splits between several channels. A handful of habits cover
              almost every call you will take or make:
            </p>
            <p className="mt-3">
              <strong className="text-white">Identify yourself</strong> — &ldquo;Good morning,
              [company], [name] speaking. How can I help?&rdquo;{' '}
              <strong className="text-white">Answer promptly</strong>, within three or four rings if
              you can, and call back quickly if you miss one.{' '}
              <strong className="text-white">Listen before you solve</strong> — let the caller
              finish explaining before you start asking questions.{' '}
              <strong className="text-white">Plan before you dial</strong>, knowing what you need to
              say and what you need to find out. And{' '}
              <strong className="text-white">confirm the detail out loud</strong>: &ldquo;So
              that&rsquo;s 27 Elm Street, next Tuesday at 9am &mdash; is that right?&rdquo; A missed
              detail on a call costs a wasted journey or a missed appointment, and there is no
              second channel to catch it.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A client rings, panicking, saying they can smell burning near their consumer unit. Script the call."
            steps={[
              {
                calc: 'BAD RESPONSE — "Okay, what\'s the make and model of your consumer unit? And how old is the property?"',
                note: 'Accurate questions asked in the wrong order. Diagnostic detail can wait; a possible fire cannot.',
              },
              {
                calc: 'STEP 1 — Stay calm, deliberately, and ask about injury first',
                note: 'Your tone sets theirs — a flat, steady voice calms a panicking caller more than any reassuring word. "Is anyone hurt?" is always the first question in any call that might be an emergency.',
              },
              {
                calc: 'STEP 2 — Give one clear safety instruction, and set the boundary',
                note: '"If it\'s safe to do so, turn off the main switch on your consumer unit — but don\'t touch anything else near it." Never advise a client to touch damaged equipment or investigate further themselves.',
              },
              {
                calc: 'STEP 3 — Confirm what happens next',
                note: 'When you will attend, and that they have a number to reach you on in the meantime.',
              },
            ]}
            answer={`"Is anyone hurt? — Good. If it's safe to do so, please turn off the main switch on your consumer unit now. Don't touch anything else near it. I can be there in [time] — call this number if anything changes before then." If there is any doubt about safety, add: "and if you're at all worried, call 999 first."`}
            watchOut="Notice the make and model of the consumer unit never gets asked. It is genuinely useful information, and it can wait until you are on the road or on site — asking for it before checking on the person's safety gets the priority backwards."
          />

          <WorkedExample
            question="A client calls to report a fault. In the first thirty seconds they tell you, in this order: the bathroom extractor fan has stopped, then the hallway lights are flickering, then that all of it started after they had a new shower fitted last week, and finally that the consumer unit is 'making a clicking noise'. Steer this call into a useful picture, without cutting them off rudely."
            steps={[
              {
                calc: 'STEP 1 — Let them finish once, uninterrupted',
                note: 'A caller who has clearly been building up to this call needs to get it all out before you start reordering it for them.',
              },
              {
                calc: 'STEP 2 — Ask the safety question first, regardless of what order it was reported in',
                note: '"Any smell of burning, anything hot to the touch, or anything that looks like sparking?" — this always comes first, even though it was mentioned last, or not at all.',
              },
              {
                calc: 'STEP 3 — Re-establish the timeline, because it is the strongest clue',
                note: '"So the fan and the flickering both started after the new shower went in — was that the same day?" A new installation followed almost immediately by two faults is very likely connected — and ask about the clicking too: a steady click or intermittent, and whether anything feels warm near it.',
              },
              {
                calc: 'STEP 4 — Summarise back what you have understood before ending the call',
                note: 'Confirms you have built the right picture and gives the client one more chance to correct anything.',
              },
            ]}
            answer={`"So just to check I've got this right — since the new shower went in, the bathroom fan has stopped and the hallway lights have started flickering, and you're hearing a clicking from the consumer unit. Nothing smells hot or looks like sparking, is that right? That sounds like it could be related to the new shower circuit rather than three separate faults — I'll come and check the consumer unit and that circuit first." The call has moved from a jumbled list to a clear working theory, without diagnosing anything you have not actually seen.`}
            watchOut="Do not diagnose the fault on the phone. An RCD chattering could be several different things, and stating a firm cause before you have tested anything can leave a client either falsely reassured or needlessly alarmed. The goal of the call is a clean picture and a judgement on urgency — not a fix."
          />

          <InlineCheck
            id="m2s3-telephone"
            question="A client calls to report a burning smell from their consumer unit. What is the first thing you should ask?"
            options={[
              'What is your postcode?',
              'Is anyone injured and can you safely turn off the main switch?',
              'When was your last EICR?',
              'What brand is your consumer unit?',
            ]}
            correctIndex={1}
            explanation="Safety comes before diagnosis in any call that might be an emergency. Check for injury and give one clear, safe instruction before you gather anything useful for the visit itself — the postcode, the EICR history and the make of consumer unit can all wait a minute."
          />

          <SectionRule />

          {/* ── 05 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>05 · Explaining technical work</ContentEyebrow>

          <ConceptBlock title="Techniques that actually bridge the gap">
            <p>
              Explaining technical work well is a repeatable skill, not a talent some electricians
              happen to have. <strong className="text-white">Use an analogy</strong> — &ldquo;an RCD
              is like a safety net, if a fault develops it catches it before it can cause
              harm&rdquo;. <strong className="text-white">Relate it to something familiar</strong> —
              &ldquo;you know how a fuse in a plug blows when something goes wrong? An MCB does the
              same job, but you switch it back on instead of replacing it.&rdquo;{' '}
              <strong className="text-white">Start with why</strong>, so the reason the work matters
              lands before the description of what it involves.{' '}
              <strong className="text-white">Show, don&rsquo;t just tell</strong> — point at the
              consumer unit, hold the old cable next to the new one. And{' '}
              <strong className="text-white">check it landed</strong>: &ldquo;does that make
              sense?&rdquo; costs one sentence and saves a confused client later.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A client asks what their test results mean. Turn a jargon-heavy answer into a plain-English one."
            steps={[
              {
                calc: 'BAD ANSWER — "Zs on all circuits is within the max disconnection time, insulation resistance is above 1 MΩ on every circuit, and RCD trip times comply."',
                note: 'Every word of it is correct and none of it means anything to somebody who does not already do this job.',
              },
              {
                calc: 'STEP 1 — Say what you actually checked, in plain terms',
                note: '"I\'ve tested the whole installation — the safety devices, the condition of the wiring, and the earthing."',
              },
              {
                calc: 'STEP 2 — Say the result in one sentence',
                note: '"Everything came back within the safe limits the regulations set."',
              },
              {
                calc: 'STEP 3 — Point to the record',
                note: '"I\'ll leave you a certificate showing all the figures, in case you or anyone else ever needs to check them."',
              },
            ]}
            answer={`"I've tested your installation and everything is within the safe limits set by the regulations. The main things I check are that the safety devices are working correctly, the wiring is in good condition, and the earthing is providing proper protection. I'll leave you a certificate with all the results on it."`}
            watchOut="Resist the temptation to prove you did a thorough job by listing every figure you measured. A client cannot judge whether 0.8 ohms is a good number, and reciting it does not build confidence — it just relocates the gap in understanding rather than closing it."
          />

          <TryIt
            question="A client asks what a slightly worrying-sounding result means: 'The ring final circuit has an earth loop reading of 1.2 ohms against a maximum of 1.44 ohms, and there's some corrosion visible at the earth terminal in socket 3.' Turn it into a plain-English answer, using the same three steps."
            steps={[
              {
                calc: 'Say what you checked, in plain terms',
                note: '"I checked the earthing path on that circuit — it\'s a safety check that makes sure a fault would be cleared quickly."',
              },
              {
                calc: 'Say the result in one sentence',
                note: '"It passed, but it was closer to the limit than I\'d like, because one of the earth connections had some corrosion on it."',
              },
              {
                calc: "Say what you're doing about it",
                note: '"I\'m going to clean and retighten that connection now and recheck it, so it\'s sitting comfortably within the limit rather than close to it."',
              },
            ]}
            answer={`"I checked the earthing path on your ring circuit, which is a safety check that a fault would clear quickly. It passed, but it was closer to the limit than I'd like, because of some corrosion on one connection. I'm going to clean that up and retest now, so you've got a proper safety margin rather than a result that just scraped through."`}
          />

          <CommonMistake
            title="Showing off with jargon"
            whatHappens="You reach for the precise technical term because it is accurate and because, honestly, it demonstrates what you know. The client nods along, understands none of it, and leaves the conversation no more informed than they started — sometimes less confident, because now they feel they cannot follow their own electrician."
            doInstead="Save the precise term for the certificate and the plain description for the conversation. Being understood is the actual measure of a good explanation, not how technical it sounded."
          />

          <SectionRule />

          {/* ── 06 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>06 · Dealing with complaints</ContentEyebrow>

          <ConceptBlock
            title="LEAP, and where it applies whether the client is right or wrong"
            onSite="A complaint handled well can leave a client more loyal than one who never had a problem at all — they have seen how you behave when something goes wrong, and that is worth more than a clean job history they never tested."
          >
            <p>
              The framework is the same four steps every time, and the same order matters more than
              most people assume. <strong className="text-white">Listen</strong> — let them finish,
              uninterrupted, eye contact, a nod, the phone put away.{' '}
              <strong className="text-white">Empathise</strong> — &ldquo;I understand that must be
              frustrating&rdquo; or &ldquo;I can see why you&rsquo;re concerned.&rdquo;{' '}
              <strong className="text-white">Apologise, where it is warranted</strong> —
              &ldquo;I&rsquo;m sorry that happened, let me put it right&rdquo;; if the fault is not
              yours, you can still acknowledge the inconvenience without admitting one.{' '}
              <strong className="text-white">Problem-solve</strong> — &ldquo;here&rsquo;s what
              I&rsquo;m going to do&rdquo;, then actually do it.
            </p>
            <p className="mt-3">
              What changes between complaints is not the sequence — it is the weight of the apology
              and what the problem-solving step actually involves. Work{' '}
              <strong className="text-white">not finished on time</strong> gets an apology for the
              delay, an honest reason, and a firm new date.{' '}
              <strong className="text-white">Mess left behind</strong> gets an apology, a proper
              clean-up, and cleaning as you go from then on. Something that{' '}
              <strong className="text-white">stops working after your visit</strong> gets a prompt
              return, an investigation, and a free fix if it was your work. And{' '}
              <strong className="text-white">cost higher than quoted</strong> should not happen if
              the quote was done properly — extra cost gets agreed before extra work gets done,
              never explained afterwards.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A client calls, upset, insisting you fitted the wrong light fittings in the kitchen. You check your paperwork: the fittings installed match exactly what was specified and signed off on the order. Script your response, applying LEAP where the client turns out to be factually wrong."
            steps={[
              {
                calc: 'LISTEN — let them describe what they expected and what they got, in full',
                note: 'Do not jump in with "well, according to the spec" while they are still explaining why they are upset.',
              },
              {
                calc: 'EMPATHISE — acknowledge the frustration genuinely',
                note: '"I can see why that\'s frustrating, especially after everything else that\'s gone into this room" — this costs nothing and is true regardless of who is right.',
              },
              {
                calc: 'APOLOGISE for the situation, not for an error you have not made',
                note: '"I\'m sorry there\'s been a mix-up somewhere" acknowledges the mismatch between what they expected and what they got, without admitting a fault that the paperwork does not support.',
              },
              {
                calc: 'PROBLEM-SOLVE — bring the paperwork gently, as a shared check rather than a gotcha',
                note: '"Let\'s have a look at the specification together" invites them into the check rather than presenting the proof as a win.',
              },
            ]}
            answer={`"I can see why that's frustrating, especially given everything else that's gone into this room. Let's have a look at the specification together and see what was actually signed off — I want to make sure we're both looking at the same thing." Only once the spec confirms the fittings match: "It looks like these are the ones on the approved order — is it possible the samples looked different in the showroom lighting? If you'd like to look at alternatives, I'm happy to price up a change, even though it wouldn't be a fault on our side."`}
            watchOut="Being right is not the same as handling it well. Leading with 'well, the paperwork says X' wins the argument and loses the relationship in the same sentence — bring the evidence in as a shared check, not a verdict."
          />

          <TryIt
            question="A client calls to say the two new sockets you fitted in their extension aren't working at all. You go back out and find a connection left loose in the back box — this one genuinely is your error. Script your LEAP response, using the same four steps."
            steps={[
              {
                calc: 'LISTEN',
                note: 'Let them describe what happened without cutting in to explain or defend yourself.',
              },
              {
                calc: 'EMPATHISE',
                note: 'Acknowledge the inconvenience of sockets not working in a newly finished room.',
              },
              {
                calc: 'APOLOGISE, fully this time',
                note: 'The fault is confirmed as yours, so the apology is not hedged the way it was in the wrong-fittings example — it is a straightforward admission.',
              },
              {
                calc: 'PROBLEM-SOLVE',
                note: 'Fix it the same day if at all possible, and at no charge, since the cause was your workmanship.',
              },
            ]}
            answer={`"I'm really sorry — I've been back and found a connection I left loose in the back box, that's on me. I've fixed it and tested both sockets now, they're working properly. I'll come back and double-check the rest of that circuit too, just to be thorough, and there's obviously no charge for any of this." Same four steps as before, but the apology carries full weight this time because the fault is genuinely yours.`}
          />

          <CommonMistake
            title="Getting defensive"
            whatHappens="Any one of four things tends to happen when a complaint lands badly: you argue back instead of listening, you blame the client or another trade or a supplier, you hope the complaint goes quiet on its own, or you air it to other clients or on social media. Each one turns a single dissatisfied client into a bigger problem than the original complaint."
            doInstead="Listen first, own what is genuinely yours to own, and keep the whole exchange between you and the client. Most people do not expect perfection — they expect you to care when something has gone wrong and to take responsibility for putting it right."
          />

          <InlineCheck
            id="m2s3-complaints"
            question="A client calls to say that a socket you installed last week has stopped working. What is the best first response?"
            options={[
              "It was working when I left, so it must be something you've done",
              "I'm sorry to hear that. I'll come and take a look — when would be convenient for me to visit?",
              "That's impossible — I tested it myself",
              "You'll need to pay for a callout if it's not my fault",
            ]}
            correctIndex={1}
            explanation="Empathy plus a concrete next step, with no blame assigned on either side before you have actually looked at it. The cause gets determined on site, not argued out on the phone."
          />

          <SectionRule />

          {/* ── 07 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>07 · Working with other trades</ContentEyebrow>

          <ConceptBlock title="Where trades clash, and what keeps the working relationship intact afterwards">
            <p>
              Most tension between trades comes from a small set of recurring situations.{' '}
              <strong className="text-white">Cable routes vs pipework</strong> — plumbers and
              electricians frequently want the same run through a wall, floor or ceiling, so
              coordinate before either of you commits to a route.{' '}
              <strong className="text-white">Timing of first and second fix</strong> — electrical
              first fix has to finish before plasterboard goes up, and second fix comes after
              plastering and decoration. <strong className="text-white">Shared spaces</strong> — a
              consumer unit, a boiler and a plumbing manifold often want the same utility cupboard,
              so agree the layout before anyone starts fixing. And{' '}
              <strong className="text-white">damage to finished work</strong> is actually prevented
              by clear marking and early communication, not by a strongly worded complaint after the
              fact.
            </p>
            <p className="mt-3">
              What keeps the relationship working once you are actually sharing a site — not just in
              theory but on the days something has gone wrong — comes down to a few habits:{' '}
              <strong className="text-white">coordinate early</strong>, since every clash is cheaper
              to solve before either of you has committed materials to a route;{' '}
              <strong className="text-white">respect their work</strong>, treating another
              trade&rsquo;s installation with the care you want yours treated with;{' '}
              <strong className="text-white">stay flexible</strong>, because a site is a shared,
              changing space and there will be good reasons to move your plan; and{' '}
              <strong className="text-white">keep shared areas tidy</strong> — your waste, your
              cable, your mess — leaving a shared space in the condition you would want to find it.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="You're doing second fix and find a plumber has drilled straight through one of your cables while fitting a bracket, clearly without realising it was there. Script how you raise it, there and then, without it turning into a row."
            steps={[
              {
                calc: 'BAD RESPONSE — confronting them straight away with "what the hell have you done"',
                note: 'The anger achieves nothing the calm version does not, and you are both still on this site together tomorrow.',
              },
              {
                calc: 'STEP 1 — State the fact calmly, with no accusation in the tone',
                note: '"Dave, looks like a cable\'s been caught by one of your fixings under the stairs" — a description, not a charge sheet.',
              },
              {
                calc: 'STEP 2 — Assess it together, then agree the fix and who does what',
                note: 'Inviting them to look with you keeps this collaborative rather than presenting the damage as already settled. Report it through the site manager for the record, and agree there and then who arranges the repair.',
              },
              {
                calc: 'STEP 3 — Use it to prevent a repeat',
                note: 'Agree how the run will be marked more clearly before the next fixing goes in nearby.',
              },
            ]}
            answer={`"Dave, looks like a cable's been caught by one of your fixings under the stairs — d'you want to have a look with me? ... I'll get this repaired and I'll flag it with [site manager] so it's on record. Might be worth marking where my cables run through here before you fix anything else in this run, save us both the same problem twice."`}
            watchOut="Reporting it through the proper channel and getting it repaired always comes before an argument about whose fault it was. You are both working on this site again tomorrow, and how this five minutes goes decides how easy that is."
          />

          <TryIt
            question="You find the plumber's pipework running through a floor void exactly where you planned to route cable to the kitchen sockets. Script how you raise it."
            steps={[
              {
                calc: 'Name the problem factually, not as a grievance',
                note: '"I\'ve noticed the hot water pipes under the kitchen are running across where I need to route my cables" — a description of the situation, not an accusation.',
              },
              {
                calc: 'Propose looking at it together',
                note: 'A shared problem invites a shared solution. Asking the plumber to help find a route that works for both of you keeps this collaborative rather than a demand.',
              },
              {
                calc: 'Name the fallback if you cannot agree',
                note: 'Escalating to the site manager is not a threat here — it is simply what happens next if two trades cannot resolve a clash between them.',
              },
            ]}
            answer={`"Hi Dave, I've noticed the hot water pipes in the void under the kitchen are running across where I need to route my cables. Can we have a look together and see if there's a route that works for both of us? If not, I'll raise it with the site manager so it doesn't cost us any time." Factual, collaborative, and with a clear next step either way.`}
          />

          <SectionRule />

          {/* ── 08 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>08 · Building professional relationships</ContentEyebrow>

          <ConceptBlock title="Trust, professional visibility, and a reputation that is slow to build and quick to lose">
            <p>
              Trust with a client is built in small, repeatable actions rather than one impressive
              moment. Do what you said you would do — if you said 9am, be there at 9am; if you said
              Friday for the quote, send it Friday. Keep clients informed even when there is nothing
              much to say: &ldquo;running 15 minutes late&rdquo; or &ldquo;work completed today,
              certificate to follow by email&rdquo; costs one text and reads as care rather than an
              afterthought. Follow up a week later — &ldquo;everything working well?&rdquo; — to
              show you care about the outcome, not just the invoice, and ask for a review politely
              once the work is done: most satisfied clients never volunteer one unprompted, but are
              happy to leave one if asked.
            </p>
            <p className="mt-3">
              Reputation in the trade travels through people, not adverts, and it is built the same
              way outside the client's living room. Industry trade shows and manufacturer training
              days keep you current and put you in a room with people who might recommend you. The
              IET is the professional body that publishes BS 7671, and membership is one route to
              CPD and local branch meetings, alongside trade forums and industry social media groups
              where sharing what you know builds a reputation slowly and honestly. As you gain
              experience, mentoring an apprentice tends to sharpen your own knowledge as much as it
              gives anything back.
            </p>
            <p className="mt-3">
              All of it compounds in one direction only. Every phone call, every visit, every
              finished job adds to a reputation that took years to build and can be undone by a
              handful of bad ones — including what you post publicly, and what you say about other
              electricians. Speaking badly of a competitor reads as a mark against the person saying
              it far more often than the one being spoken about.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="On site, the project manager tells you verbally: 'go ahead and move the socket circuit as discussed, we'll sort the paperwork later.' You want a record of this instruction without it feeling like you're checking up on them. Script the follow-up message you send that afternoon."
            steps={[
              {
                calc: 'Restate what was agreed, factually',
                note: '"Just to confirm..." reads as helpful diligence; a hedge like "I think you said..." reads as doubt.',
              },
              {
                calc: 'Name who said it and when, briefly',
                note: 'Enough detail to be a genuine record, without making it sound like you suspect they will deny it.',
              },
              {
                calc: 'State what you are now doing as a result',
                note: 'Shows the message is functional — a confirmation you are acting on, not a formality filed away.',
              },
              {
                calc: 'Invite correction',
                note: 'Gives them a cheap, immediate way to fix a misunderstanding before any work happens on the strength of it.',
              },
            ]}
            answer={`"Hi Steve, just to confirm what we agreed on site this morning — moving the socket circuit in the utility room two metres left, as discussed. I'll get that done today on that basis. Let me know if I've got anything wrong." Four sentences: what was agreed, when, what you're doing, and an open door to correct it.`}
            watchOut="Send it the same day, while the memory is still fresh for both of you. A confirmation sent a week later is far less credible if there is ever a disagreement about what was actually agreed, and far less use to you if the instruction turns out to be wrong."
          />

          <TryIt
            question="A site manager tells you verbally to leave a run of containment exposed rather than chasing it into the wall, because the plasterer is behind and it 'can be sorted later.' Write the follow-up message that confirms this instruction, using the same shape."
            steps={[
              {
                calc: 'Restate what was agreed, and name who and when',
                note: 'Name the specific run and instruction — leaving it surface-mounted for now, not a general note about being flexible — and that it was agreed this afternoon, on site, verbally.',
              },
              {
                calc: 'State what you are doing, and invite correction',
                note: 'Proceeding to second fix on that basis, chasing deferred rather than cancelled — with a cheap way for them to correct it if that is not quite what they meant.',
              },
            ]}
            answer={`"Hi Mark, just to confirm what we agreed on site this afternoon — leaving the containment run in the hallway surface-mounted for now rather than chasing it in, since the plasterer's behind, and picking that up later. I'll carry on with second fix on that basis. Let me know if that's not quite what you meant."`}
          />

          <Scenario
            title="The client who wants your opinion on the last electrician"
            situation="A client mentions, in passing, that the previous electrician who worked on the property did a poor job, and asks what you think of their work."
            whatToDo="Comment on the work you can actually see, factually, without commenting on the person or the company. 'This needs bringing up to date' is a fair professional observation; 'they clearly didn't know what they were doing' is not, and you were not there for whatever decisions or constraints shaped that earlier job."
            whyItMatters="Speaking badly of another electrician, even when invited to, tends to reflect on the person saying it more than the person being spoken about — and word travels in a trade small enough that it usually gets back around."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Five habits underneath every conversation: clear, honest, respectful, concise, listening.',
              'One fact, several vocabularies — a failed test, a missed deadline, a drilled cable, never changes; only the words you choose for who is listening do.',
              'A worried client responds to an honest explanation and real options, never to pressure or to being talked down to — and an unsafe request gets declined with a reason and an alternative, never a flat refusal.',
              'In any emergency call, check for injury and give one safe instruction before asking a single diagnostic question, and steer a jumbled report into a clear picture without diagnosing over the phone.',
              'Report facts at a site meeting, not hopes. An honest "behind, and here is why, and here is a date I can stand behind" beats a confident date you cannot hit.',
              'LEAP a complaint the same way whether the client is right or wrong — Listen, Empathise, Apologise where warranted, Problem-solve — only the weight of the apology changes.',
              'Coordinate route and space clashes with other trades early — cheap before work starts, expensive after — and get any repair agreed calmly, not argued over.',
              'Confirm a verbal instruction in writing the same day: what was agreed, by whom, what you are doing about it, and an open door to correct it.',
              "Reputation compounds slowly from kept promises and can be undone in a single phone call handled badly, or one comment about someone else's work.",
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Is it ever right to use technical jargon with a client?',
                answer:
                  'Rarely, and usually not the way you would use it with a colleague. If a client asks a precise follow-up question and clearly wants the detail, you can go further — but lead with the plain version and let them ask for more, rather than assuming they want it.',
              },
              {
                question: 'What if I genuinely do not know the answer in a site meeting?',
                answer:
                  '"I\'ll find out and get back to you" is a complete, professional answer. Guessing and being wrong costs you far more credibility than admitting you need to check.',
              },
              {
                question: 'Should I apologise for a fault before I know whether it was mine?',
                answer:
                  "Apologise for the inconvenience, not for a fault you have not confirmed. \"I'm sorry that's happened, I'll come and take a look\" acknowledges the client without admitting a cause you have not yet established.",
              },
              {
                question: 'How do I raise a problem with another trade without it becoming a row?',
                answer:
                  'Describe the situation factually rather than as an accusation, propose looking at it together, and name what happens next if you cannot agree. Most clashes are logistics, not conflicts, and treating them that way keeps them that way.',
              },
              {
                question: 'Does a well-handled complaint actually help, or just limit the damage?',
                answer:
                  'It can genuinely help. A client who sees you listen, own what is yours to own, and put it right has seen something a clean job history never shows them — how you behave when something goes wrong. That is often worth more to the relationship than the original problem cost it.',
              },
            ]}
          />

          <SectionRule />

          <Quiz questions={quizQuestions} title="Section 3: Communication Skills Quiz" />

          {/* ── prev / next ─────────────────────────────────────────── */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module2/section2')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-sm font-medium text-white touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" />
              Section 2
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module2/section4')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-elec-yellow/35 bg-elec-yellow/[0.08] px-4 text-sm font-semibold text-white touch-manipulation"
            >
              Section 4
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default FunctionalSkillsModule2Section3;
