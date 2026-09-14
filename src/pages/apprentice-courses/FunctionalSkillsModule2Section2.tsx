/**
 * Functional Skills · Module 2 · Section 2 — Technical writing
 *
 * CONVERTED (13 Sep) from the 2024 dialect to the StudyPage reading kit.
 *
 * DEDUPLICATION: the Module 2 audit found Sections 2 and 4 teaching the same
 * material twice — correct terminology ("not fuse box", "not trip switch"),
 * UK-vs-US spelling, and EICR observation rewriting all appeared in both, with
 * Section 4 being the fuller treatment each time. The split applied here:
 *
 *   Section 2 (this page) owns THE FORMS — what each document is, what goes in
 *   each part of it, and how to write an entry that does its job.
 *   Section 4 owns THE LANGUAGE — spelling, grammar, punctuation, terminology,
 *   proofreading.
 *
 * So the terminology list and the UK/US spelling table that used to sit here
 * are gone; the space went into the forms themselves, which is what this
 * section is for. Observation writing stays here (it is a form entry) but the
 * grammar-level rewrite drill stays in Section 4.
 *
 * ACCURACY — EICR section lettering. The old page listed the EICR as sections
 * A–F, with "Supply characteristics" as a standalone lettered section and no
 * "Purpose of the report" at all. That does not match the model form. Checked
 * against the app's OWN EICR builder (VisualConditionFormTabs.tsx), which runs
 * Client → Installation → Purpose of the report → Extent covered → Limitations
 * → Supply → Consumer unit or board → Outcome → Inspected by. This page now
 * teaches the sections BY NAME in that order and deliberately asserts no
 * letters: the lettering differs between form publishers and between editions,
 * and a learner who knows what the sections are will find them on any form.
 *
 * Unit notation is MΩ throughout — the old page used "MOhm" here and "MΩ" in
 * Section 4, on a page that teaches consistent units.
 *
 * No <RegsCallout>: this page paraphrases and that component renders its
 * `clause` as quoted regulation text.
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

const TITLE = 'Technical Writing - Functional Skills Module 2.2';
const DESCRIPTION =
  'Functional Skills English for electricians: completing EICR, EIC and Minor Works forms, writing observations that hold up, classification codes, method statements, technical reports and day sheets.';

const quizQuestions = [
  {
    id: 1,
    question: 'When completing an EICR, what does a C1 classification code indicate?',
    options: [
      'Improvement is recommended but not urgent',
      'Danger present — risk of injury; immediate remedial action required',
      'The installation is satisfactory and compliant',
      'Further investigation is required before classifying',
    ],
    correctAnswer: 1,
    explanation:
      'C1 means danger is present and there is a risk of injury — something a person could be hurt by right now. It requires immediate remedial action, and anything coded C1 must be made safe before you leave site. You cannot write a C1 and drive away.',
  },
  {
    id: 2,
    question: 'Which of the following is the correct way to describe a defect on an EICR?',
    options: [
      'Some of the wiring looks a bit dodgy',
      'The sockets in the property are not all the same brand',
      'Missing earth connection to socket outlet in kitchen — circuit 5',
      'There is an electrical problem that should be fixed',
    ],
    correctAnswer: 2,
    explanation:
      'An observation has to say what is wrong and where it is, precisely enough that somebody else could walk to it. "Missing earth connection to socket outlet in kitchen — circuit 5" does that. "Dodgy" is not a finding, and "not all the same brand" is not a defect at all — it is a preference.',
  },
  {
    id: 3,
    question:
      'On an Electrical Installation Certificate (EIC), which part records the results of the initial verification tests?',
    options: [
      'The client details section',
      'The supply characteristics section',
      'The summary of the work carried out',
      'The Schedule of Test Results',
    ],
    correctAnswer: 3,
    explanation:
      'The Schedule of Test Results accompanies the EIC and carries every value you measured — continuity, insulation resistance, polarity, earth fault loop impedance and RCD operating times. The certificate itself declares that the work complies; the schedules are the evidence behind that declaration.',
  },
  {
    id: 4,
    question: 'What is the most important consideration when writing a method statement?',
    options: [
      'Ensuring it is clear, accurate, and can be understood by all personnel',
      'Making it as detailed and complex as possible',
      'Keeping it as short as possible, even if detail is lost',
      'Using the most advanced technical language available',
    ],
    correctAnswer: 0,
    explanation:
      'A method statement exists to tell people how to do the work safely. If the people doing the work cannot follow it, it has failed, however thorough it looks in the file. That includes anyone on site whose first language is not English. Clarity beats both brevity and sophistication.',
  },
  {
    id: 5,
    question:
      'When sending a professional email to a client about a completed installation, which opening is most appropriate?',
    options: [
      'Hi mate, just letting you know the job is sorted',
      'Dear Mr Thompson, I am writing to confirm that the electrical installation work at your property has been completed',
      'Hey, all done at yours, give us a shout if owt is wrong',
      'To whom it may concern, the work is finished',
    ],
    correctAnswer: 1,
    explanation:
      'Address the client by name and say what the email is about in the first line. "To whom it may concern" is for when you genuinely do not know who you are writing to — using it for a client you have just spent three days working for reads as carelessness.',
  },
  {
    id: 6,
    question:
      'Which of the following is a common writing mistake that electricians should avoid on certification forms?',
    options: [
      'Recording the actual measured test values',
      'Signing and dating the certificate',
      'Using abbreviations that are not universally understood',
      'Writing clearly so others can read the form',
    ],
    correctAnswer: 2,
    explanation:
      'MCB, RCD and CPC are understood by anyone in the trade. Abbreviations you or your firm invented are not, and the person reading the form in eight years will not be able to ask you what they meant. If in doubt, write it out.',
  },
  {
    id: 7,
    question:
      'When writing a technical report about a fault you have investigated, what should you include?',
    options: [
      'Just the final cost of the repair and the parts that were fitted',
      'Just the date the fault was reported and the time you attended site',
      'Just the name of the client who reported the fault and their address',
      'The fault, the investigation process, the findings and recommended actions',
    ],
    correctAnswer: 3,
    explanation:
      'A report has to let the reader follow you: what was reported, what you did to investigate it, what you found, and what you think should happen next. A report that gives only the conclusion asks to be taken on trust; one that shows the route can be checked, and is far more persuasive for it.',
  },
  {
    id: 8,
    question: 'What information should always be recorded on a day sheet or site diary?',
    options: [
      'Date, personnel, work done, materials, issues encountered and hours worked',
      'Only the start and finish times recorded for the working day on site',
      'Only the weather conditions experienced on site during the day',
      'Only the names of any visitors who attended the site that day',
    ],
    correctAnswer: 0,
    explanation:
      'A day sheet is the record you will reach for months later when somebody disputes a delay, a variation or an invoice. The date, who was there, what got done, what was used, what went wrong and how long it took is the minimum that makes it useful as evidence rather than as a memory aid.',
  },
];

const FunctionalSkillsModule2Section2 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 2 · Section 2"
        title="Technical writing"
        backTo="/study-centre/apprentice/functional-skills/module2"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage measure="74rem" wide="94rem">
          <p className="text-[13px] leading-relaxed text-white">
            Everything you write on a certificate outlives the job. The installation gets painted
            over, the client moves, you forget the address — and the document stays, with your name
            on it, waiting to be read by somebody who cannot ask you what you meant. This section is
            about writing so that person is not left guessing.
          </p>

          <LearningOutcomes
            outcomes={[
              'Identify what belongs in each part of an EICR, an EIC and a Minor Works certificate.',
              'Apply the classification codes C1, C2, C3 and FI, and justify the code you chose.',
              'Write an observation that states the defect, its location and the circuit, precisely enough to be acted on.',
              'Write a sequence of operations where the order itself carries the safety control.',
              'Structure a professional email that a client can act on without ringing you.',
              'Structure a technical report so the findings support the recommendations.',
              'Keep a day sheet that works as evidence months later.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Section 1 of this module',
                gist: 'Reading documents comes before writing them. If you have not met the model forms yet, start there.',
              },
              {
                term: 'A rough idea of what gets tested',
                gist: 'You do not need to be able to do the tests. You do need to know that continuity, insulation resistance, polarity, Zs and RCD times are the things a schedule records.',
              },
            ]}
          />

          <TLDR
            points={[
              'A certificate is a declaration you sign. Write it as though it will be read out to you in two years, because it might be.',
              'An observation needs three things: what is wrong, where it is, and which circuit. Miss any one and somebody has to come back and find it.',
              'C1 means danger now — and it must be made safe before you leave site. C2 means safe until something foreseeable happens. C3 is an improvement. FI means you could not tell.',
              'Satisfactory means no C1 and no C2. It does not mean "nothing much wrong".',
              'Record the value the instrument showed, not the value you expected.',
              'In a method statement the ORDER is the control. Same steps, wrong sequence, different job.',
              'In a report, findings come before recommendations — the evidence should arrive before the conclusion it supports.',
              'A blank field looks like an omission. Write N/A and nobody has to wonder.',
              'Never invent an abbreviation. The person reading it in eight years cannot ask you.',
            ]}
          />

          <SectionRule />

          {/* ── 01 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>01 · What you write becomes the record</ContentEyebrow>

          <ConceptBlock title="What a technical document has to do that ordinary writing does not">
            <p>
              A certificate has one job that most writing does not: it has to work for a reader who
              was never on site and cannot ask you anything. That fact sets the standard for
              everything that follows &mdash; precision matters more than fluency, and completeness
              matters more than concision. A beautifully written sentence that omits the circuit
              number has failed at its job; a clumsy one that states what, where and which circuit
              has not.
            </p>
            <p className="mt-3">
              Four qualities separate a document that does its job from one that does not, and each
              maps onto a specific habit you will practise later in this section:
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">Clear.</strong> One reading should be enough. If a
                sentence can be read two ways, it will eventually be read the wrong way &mdash;
                which is why an observation names the defect, the location and the circuit rather
                than describing a general impression.
              </li>
              <li>
                <strong className="text-white">Accurate.</strong> Values as measured, locations as
                found, dates as they happened &mdash; not approximately, not tidied. An insulation
                resistance tester reading &gt;199 M&Omega; never showed you 200 M&Omega;, and
                writing 200 is a small dishonesty that reads as carelessness at best.
              </li>
              <li>
                <strong className="text-white">Complete.</strong> Every field addressed. A blank
                space is indistinguishable from a field somebody forgot, which is exactly why N/A
                exists &mdash; it turns &ldquo;nothing here&rdquo; into a decision you made, rather
                than one you missed.
              </li>
              <li>
                <strong className="text-white">Professional.</strong> No slang, no shorthand only
                you understand, no opinions about the last electrician&rsquo;s work. An abbreviation
                you invented on the day means nothing to the person reading the form in eight years.
              </li>
            </ul>
          </ConceptBlock>

          <CommonMistake
            title="Writing for yourself instead of for the reader"
            whatHappens='You write "as discussed" or "usual issue in this type of board" because you know exactly what you mean. Two years later somebody else reads it and has no idea what was discussed or what is usual, and the observation is useless.'
            doInstead="Write every entry as though the reader has never been to the property and cannot contact you. That is not pessimism — for most certificates it is literally the situation."
          />

          <SectionRule />

          {/* ── 02 ─────────────────────────────────────────────────── */}
          <WorkedExample
            question={`An entry on a certificate reads: "Tested as discussed with client, usual arrangement for this type of board." Work out what a reader in five years can and cannot establish from it.`}
            steps={[
              {
                calc: 'What was tested?',
                note: '"Tested" — not which tests, not which circuits. Unanswerable from the document.',
              },
              {
                calc: 'What was discussed, and with whom?',
                note: '"As discussed with client" records that a conversation happened, not what was agreed. The client may not be the same person by then.',
              },
              {
                calc: 'What is the "usual arrangement"?',
                note: 'Usual to the writer. A reader has no way to know what that was, and no way to ask.',
              },
              { calc: 'What can be established?', note: 'That somebody attended. Nothing else.' },
            ]}
            answer="Nothing usable. Every clause depends on knowledge the writer had and the reader does not, so the entry records only that a visit occurred."
            watchOut="The entry did not feel vague when it was written — it felt efficient, because the writer knew exactly what all three phrases meant. That is the trap: the test is never whether it makes sense to you now, it is whether it makes sense to a stranger later."
          />

          <SectionRule />

          <TryIt
            question={`Rewrite this so it stands on its own: "Replaced the faulty one and tested, all fine now."`}
            steps={[
              { calc: 'Replaced what, exactly?', note: 'Name the item and its rating or type.' },
              { calc: 'Where was it?', note: 'Location and circuit reference.' },
              { calc: '"Tested" how?', note: 'Name the test, and give the value you measured.' },
              {
                calc: '"All fine" against what?',
                note: 'A result is only meaningful against the limit it was compared to.',
              },
            ]}
            answer={`Something like: "Replaced faulty 32A Type B MCB, circuit 4 (kitchen ring final), consumer unit under stairs. Insulation resistance tested at 500V: >199 MΩ. Zs measured 0.68 Ω against a maximum of 1.37 Ω for the device."`}
          />

          <SectionRule />

          <ContentEyebrow>02 · The EICR, part by part</ContentEyebrow>

          <ConceptBlock
            title="Learn the sections by what they do, not by their letters"
            plainEnglish="Form publishers letter their sections differently and the lettering has changed between editions. The names have not."
          >
            <p>
              An Electrical Installation Condition Report records the condition of an existing
              installation at a point in time. Running in the order you meet them:
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">Client.</strong> Who asked for the report.
              </li>
              <li>
                <strong className="text-white">Installation.</strong> The address and description of
                what was inspected, where that differs from the client&rsquo;s own address.
              </li>
              <li>
                <strong className="text-white">Purpose of the report.</strong> Why it was done
                &mdash; a change of tenancy, a periodic inspection, a sale, a landlord&rsquo;s
                statutory duty. Frequently skipped, and it frames everything after it: a report done
                for a five-year landlord inspection and one done ahead of a sale can reasonably have
                different extents and different depth, and the purpose is what justifies that
                difference if anyone later asks why.
              </li>
              <li>
                <strong className="text-white">Extent covered.</strong> What you inspected.
              </li>
              <li>
                <strong className="text-white">Limitations.</strong> What you did not, and why. This
                is the section that protects the inspector, and it is the one most often left thin.
                The mechanism is simple: a reader of a finished report cannot tell the difference
                between &ldquo;inspected and found satisfactory&rdquo; and &ldquo;never looked
                at.&rdquo; Leaving Limitations blank lets the second one masquerade as the first. If
                the loft was inaccessible, if a room was locked, if the client declined to have
                fittings removed &mdash; write it in words, and the report now says exactly what it
                does and does not vouch for.
              </li>
              <li>
                <strong className="text-white">Supply and earthing.</strong> The earthing
                arrangement (TN-S, TN-C-S, TT), supply characteristics, and the measured figures
                that go with them.
              </li>
              <li>
                <strong className="text-white">Consumer unit or board.</strong> What is installed
                and its condition.
              </li>
              <li>
                <strong className="text-white">Outcome.</strong> Satisfactory or unsatisfactory, the
                observations with their codes, and the recommended date for the next inspection.
              </li>
              <li>
                <strong className="text-white">Inspected by.</strong> Your name, signature, date and
                qualifications. Unsigned, the document has no standing at all.
              </li>
            </ul>
            <p className="mt-3">
              Behind the report sit the Schedule of Inspections and the Schedule of Test Results.
              The report states the conclusion; the schedules are the working.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating Limitations as a formality"
            whatHappens="You write 'none' or leave it near-empty because the inspection felt thorough. Later a defect is found in a part of the installation you could not actually reach, and there is nothing on the report saying so. On paper, you inspected it and missed it."
            doInstead="Write down every part you could not inspect and why. 'Loft not accessed — no safe access at time of inspection' takes ten seconds and is the difference between a limitation and a miss."
          />

          <SectionRule />

          {/* ── 03 ─────────────────────────────────────────────────── */}
          <WorkedExample
            question="A landlord sends you an EICR from another contractor and asks why a fault in the loft was not picked up. Which parts of the report do you read, in what order, to answer them?"
            steps={[
              {
                calc: '1. Extent covered',
                note: 'Establish what the inspection actually set out to include. If the loft was outside the extent, the question is already answered.',
              },
              {
                calc: '2. Limitations',
                note: 'If the loft was in scope but could not be reached, this is where the inspector should have recorded it and why.',
              },
              {
                calc: '3. Purpose of the report',
                note: 'A report for a change of tenancy may have a narrower remit than one for a sale. The purpose frames what was reasonable.',
              },
              {
                calc: '4. Observations',
                note: 'Only now does it make sense to look at what WAS found — because you now know the boundaries it was found within.',
              },
              {
                calc: '5. Inspected by',
                note: 'The date, so you know how long ago, and the signature.',
              },
            ]}
            answer="Extent → Limitations → Purpose → Observations → Inspected by. The answer to 'why was this missed' almost always lives in the first two, not in the observations."
            watchOut="People go straight to the observations because that is where the interesting content is. But an observation list read without the extent and limitations tells you what was found, not what was looked for — and those are different questions."
          />

          <SectionRule />

          <TryIt
            question="A report records the Extent as 'the electrical installation at the above address' and the Limitations as 'none'. The property is a three-storey house with a loft conversion and an integral garage. What do you make of that?"
            steps={[
              {
                calc: 'Is the extent specific?',
                note: 'It restates the address. It does not say which parts, how many circuits, or what sampling was applied.',
              },
              {
                calc: 'Is "none" plausible?',
                note: 'On a fully furnished occupied house, some accessories are almost always inaccessible.',
              },
              {
                calc: 'Who does a thin Limitations section fail?',
                note: 'The inspector. It removes their own record of what they could not reach.',
              },
            ]}
            answer="Treat it as a weak report rather than an exhaustive one. 'None' on a property of that size is a claim to have inspected everything, which is rarely true and leaves the inspector carrying anything later found in a part they did not actually reach."
          />

          <SectionRule />

          <ContentEyebrow>03 · Codes, and writing the observation</ContentEyebrow>

          <ConceptBlock title="The four codes, and what separates them">
            <ul className="space-y-1.5">
              <li>
                <strong className="text-white">C1 &mdash; danger present.</strong> A person could be
                hurt by this now. Immediate action, and it must be made safe before you leave site.
              </li>
              <li>
                <strong className="text-white">C2 &mdash; potentially dangerous.</strong> Safe in
                normal use, but a foreseeable event makes it dangerous. Urgent remedial action.
              </li>
              <li>
                <strong className="text-white">C3 &mdash; improvement recommended.</strong> Not
                dangerous, and not urgent. Does not meet the current standard, or could simply be
                better than it is. A property can have a hundred C3s and still be satisfactory.
              </li>
              <li>
                <strong className="text-white">FI &mdash; further investigation.</strong> You found
                something you could not resolve within the extent of this inspection &mdash; not
                something you could not be bothered to resolve. If you never went near it, that
                belongs in Limitations, not as an FI observation.
              </li>
            </ul>
            <p className="mt-3">
              Two consequences follow. First, the overall assessment is{' '}
              <strong className="text-white">satisfactory only if there is no C1 and no C2</strong>.
              A single C2 makes the report unsatisfactory, however tidy the rest of it is &mdash;
              the codes do not average out. Second, the difference between C1 and C2 is not severity
              in the abstract &mdash; it is <em>now</em> versus <em>if</em>. A live conductor
              somebody could touch this afternoon is C1. A circuit with no RCD protection that is
              only dangerous the day a fault develops on something plugged into it is C2 &mdash; the
              circuit itself is doing nothing wrong right now. Work that distinction and the codes
              stop being a matter of opinion; they become a test you apply the same way every time.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="An observation has three jobs"
            onSite="The test: could somebody who has never been to this property walk in, find the thing you are describing, and know what is wrong with it?"
          >
            <p>
              Every observation should say <strong className="text-white">what</strong> is wrong,{' '}
              <strong className="text-white">where</strong> it is, and{' '}
              <strong className="text-white">which circuit</strong> it belongs to, then carry the
              code. That is the whole structure, and most poor observations are poor because one of
              those three is missing rather than because the writing itself is bad.
            </p>
            <p className="mt-3">
              Each piece has a different reader. <strong className="text-white">What</strong> tells
              the property owner what they are paying to have fixed.{' '}
              <strong className="text-white">Where</strong> is for whoever attends next &mdash; a
              location vague enough to need a second visit to find the fault has cost somebody an
              hour before they have even opened a toolbox.{' '}
              <strong className="text-white">Which circuit</strong> is for the electrician doing the
              remedial work: it tells them what to isolate before they touch anything, and on a
              board with twelve circuits, guessing is not a safe substitute for being told.
            </p>
          </ConceptBlock>

          <WorkedExample
            question='Turn this into a usable observation: "Earth missing on a socket in the kitchen."'
            steps={[
              {
                calc: 'WHAT — "no circuit protective conductor connected"',
                note: 'Name the defect in the trade\'s own terms. "Earth missing" could mean several different things.',
              },
              {
                calc: 'WHERE — "socket outlet to left of sink, kitchen"',
                note: '"In the kitchen" is not a location if there are six sockets in it.',
              },
              {
                calc: 'WHICH CIRCUIT — "circuit 5"',
                note: 'Ties it to the schedule, so the remedial electrician knows what to isolate.',
              },
              {
                calc: 'CODE — C2',
                note: 'Safe until a fault occurs on a connected appliance; dangerous when one does.',
              },
            ]}
            answer='"No circuit protective conductor connected at socket outlet to left of sink, kitchen — circuit 5. (C2)"'
            watchOut="Resist the urge to add what you think caused it or what should be done about it unless you know. An observation records what you found. Speculation in that box tends to be quoted back at you as though it were a finding."
          />

          <WorkedExample
            question='This observation has a code attached, so it looks finished. Find what it is actually hiding: "Extractor fan installation not fully compliant with current guidance — bathroom. C2"'
            steps={[
              {
                calc: 'WHAT — "not fully compliant" is a verdict, not a defect',
                note: 'Go back to what you actually found: no local means of isolation for the extractor fan.',
              },
              {
                calc: 'WHERE — "bathroom, extractor fan above the shower enclosure"',
                note: 'Precise enough to find without asking which bathroom in a house with two.',
              },
              {
                calc: 'WHICH CIRCUIT — "circuit 2, bathroom lighting and fan"',
                note: 'Ties it to the board the remedial electrician will isolate at.',
              },
              {
                calc: 'CODE — reconsider against now-versus-if',
                note: 'No local isolator means the fan cannot be isolated for maintenance without working on a live circuit elsewhere on the board — that is a foreseeable danger, C2, not a compliance remark.',
              },
            ]}
            answer='"No local means of isolation for extractor fan — bathroom, circuit 2. (C2)"'
            watchOut="A code attached to a vague sentence still looks like a finished observation, because it has a code sitting next to it. It is not finished — the reader still cannot picture the fault, price the remedial work, or find it on site."
          />

          <WorkedExample
            question='Fix this observation, which claims something the inspector could not actually have known: "Cable insulation damaged by rodents in the loft — circuit 3. C2"'
            steps={[
              {
                calc: 'What did you actually observe?',
                note: 'Damaged cable insulation, exposed conductors and gnaw marks. You did not witness an animal causing it.',
              },
              {
                calc: 'Separate the observation from the inference',
                note: 'The cause is a hypothesis formed from the evidence. An EICR records the condition found, not a piece of detective work.',
              },
              {
                calc: 'Keep the evidence, drop the unverified verdict',
                note: '"Consistent with rodent activity" describes what you saw. "Damaged by rodents" states a cause as fact you cannot prove.',
              },
              {
                calc: 'Where and which circuit stay exactly as they were',
                note: 'Loft above bedroom 2 — circuit 3.',
              },
            ]}
            answer='"Damaged cable insulation with exposed conductors, consistent with rodent activity — loft above bedroom 2, circuit 3. (C2)"'
            watchOut="An inspector who states a cause they did not verify is exposed if it turns out wrong — and a client billed for rodent-proofing on the strength of your report is entitled to ask how you knew."
          />

          <SectionRule />

          <WorkedExample
            question="Classify each of these using the now-versus-if test, and be ready to justify the code in a sentence: (a) a cracked twin socket faceplate with a live terminal exposed and touchable; (b) no RCD protection on socket circuits likely to supply equipment outdoors; (c) a consumer unit correctly installed and operating properly, but with no circuit chart or labelling at all; (d) a circuit you could not test because furniture blocked access to the isolator."
            steps={[
              {
                calc: '(a) — C1',
                note: 'A live conductor somebody could touch is danger present, now. Made safe before you leave site, whatever else is on the report.',
              },
              {
                calc: '(b) — C2',
                note: 'Safe in normal use; dangerous the moment a fault develops on equipment outdoors. Now-versus-if: this is an "if".',
              },
              {
                calc: '(c) — C3',
                note: 'Nothing dangerous or urgent. Missing labelling is an improvement recommendation, not a safety finding.',
              },
              {
                calc: '(d) — FI, or a Limitations entry',
                note: 'Unresolved within the extent of this inspection is FI at most — with no prior evidence of a fault, it belongs in Limitations instead.',
              },
            ]}
            answer="(a) C1, (b) C2, (c) C3, (d) FI (or Limitations if there was no prior evidence of a fault)."
            watchOut="Notice (d): FI is not a fallback for a defect you cannot be bothered to find. It exists for a genuinely unresolved finding. Coding an unreached part of the installation as FI when you never actually saw anything wrong there overstates what the inspection found."
          />

          <TryIt
            question="Classify each of these, and be ready to say why: (a) an immersion heater with no local means of isolation next to it; (b) a lighting circuit protected by a device rated too high for the cable, presenting no immediate hazard but a foreseeable one if the load increases; (c) cables clipped roughly 20mm off the recommended spacing, with no other issue found; (d) a loft that could not be inspected because there was no fixed ladder or safe access on the day."
            steps={[
              {
                calc: '(a) — is a missing isolator dangerous now, or if?',
                note: 'The heater works fine today. Danger arrives only when somebody needs to isolate it and cannot — an "if", so C2.',
              },
              {
                calc: '(b) — an over-rated protective device',
                note: 'Classic "if" case: fine today, dangerous only if the load increases beyond what the cable can safely carry. C2.',
              },
              {
                calc: '(c) — a spacing tolerance with nothing else wrong',
                note: 'Not dangerous, not urgent. Ask whether it has any real bearing on safety before coding it at all.',
              },
              {
                calc: '(d) — no access, nothing seen',
                note: 'Not a defect found — a part you could not reach. Belongs in Limitations, not as a coded observation.',
              },
            ]}
            answer="(a) C2 · (b) C2 · (c) C3 at most · (d) a Limitations entry, not an FI observation — a part never reached is not the same as a part investigated and left unresolved."
          />

          <SectionRule />

          <TryIt
            question='Improve this observation: "Consumer unit is old and should be changed. C3"'
            steps={[
              {
                calc: 'What is actually wrong?',
                note: '"Old" is not a defect. Identify the specific shortcoming — no RCD protection to socket circuits, say.',
              },
              {
                calc: 'Where is it?',
                note: 'Consumer unit location — under stairs, in the garage.',
              },
              { calc: 'Which circuits are affected?', note: 'If it is the whole board, say so.' },
              {
                calc: 'Is C3 right?',
                note: 'If socket circuits likely to supply equipment outdoors have no RCD protection, that is not an improvement — reconsider the code.',
              },
            ]}
            answer='Something like: "No RCD protection to socket outlet circuits 1, 2 and 4 at consumer unit under stairs. (C2)" — which is a different code as well as a better sentence. "Old" told the reader nothing and led to the wrong classification.'
          />

          <InlineCheck
            id="m2s2-eicr-codes"
            question="You discover that a consumer unit has no main switch and the installation is relying on the DNO's service fuse as the only means of isolation. What classification code would you assign?"
            options={[
              'C3 — Improvement recommended',
              'FI — Further investigation',
              'C2 — Potentially dangerous',
              'C1 — Danger present',
            ]}
            correctIndex={2}
            explanation="Work the code definitions, not your gut. C1 means danger is present — something a person could be hurt by right now. C2 means potentially dangerous: the installation is safe in normal use, but a foreseeable event turns it dangerous. An installation with no main switch runs perfectly safely until somebody needs to isolate it, and then their only option is a sealed DNO cut-out they are not permitted to pull. The danger is real but conditional, which is C2. Note that BS 7671 itself does not publish the classification codes — they come from industry guidance, and this is the kind of call you should be able to justify in words rather than recite."
          />

          <SectionRule />

          {/* ── 04 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>04 · EIC and Minor Works</ContentEyebrow>

          <ConceptBlock
            title="Which form, what each one declares, and what signing it commits you to"
            plainEnglish="New circuit, or alteration to an existing one? That single question decides the form — and the form decides what you are actually declaring."
          >
            <p>
              An <strong className="text-white">Electrical Installation Certificate</strong> covers
              new installation work &mdash; a new circuit, a new installation, or a substantial
              addition. A{' '}
              <strong className="text-white">
                Minor Electrical Installation Works Certificate
              </strong>{' '}
              covers additions and alterations to an existing circuit that do not include a new
              circuit. Moving a socket, adding a spur, replacing a light fitting on an existing
              circuit: Minor Works. Running a new circuit for that socket, or changing the consumer
              unit those circuits terminate at: EIC.
            </p>
            <p className="mt-3">
              The two forms declare different things, and the difference matters more than it looks.
              An EIC declares that the <em>new</em> work &mdash; its design, its construction, and
              the inspection and testing of it &mdash; complies. A Minor Works certificate declares
              something narrower: that the alteration itself complies, and that it does not impair
              the safety of the existing installation it was added to. Signing Minor Works is not a
              re-verification of the whole property; it is a statement about this one alteration and
              its immediate effect. That is exactly why a consumer unit change needs an EIC rather
              than Minor Works &mdash; changing the point every circuit terminates at is not a
              narrow alteration with a contained effect, it touches the whole installation.
            </p>
            <p className="mt-3">
              The EIC carries up to three declarations &mdash; design, construction, and inspection
              and testing. On a domestic job one person often signs all three; on a larger job they
              may be three different people, and each is declaring responsibility for their own
              part. Signing a section means you are personally answering for that part of the work,
              specifically, if it is later found wanting. Do not sign for design you did not do.
            </p>
            <p className="mt-3">
              Five habits keep a certificate free of holes once you have picked the right form:
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">Record what the instrument showed.</strong> If the
                insulation resistance tester reads &gt;199 M&Omega; because the result is off the
                top of its range, write &gt;199 M&Omega;. Do not round it to a tidy 200 &mdash; the
                instrument never gave you that figure, and you are signing a declaration of what you
                measured.
              </li>
              <li>
                <strong className="text-white">Complete every field.</strong> Where something does
                not apply, write N/A. A blank field and a forgotten field look identical.
              </li>
              <li>
                <strong className="text-white">Keep units consistent.</strong> Ohms or milliohms,
                not both on the same schedule. Pick the convention the form uses and stay on it.
              </li>
              <li>
                <strong className="text-white">Name circuits the way the board is labelled.</strong>{' '}
                If the board says &ldquo;Circuit 4 &mdash; Kitchen sockets&rdquo;, the schedule says
                the same. Inventing your own names guarantees confusion later.
              </li>
              <li>
                <strong className="text-white">Sign and date it.</strong> An unsigned certificate is
                not a certificate, whichever declarations sit above the signature.
              </li>
            </ul>
          </ConceptBlock>

          <WorkedExample
            question="Decide EIC or Minor Works for each of these: (1) a new circuit run to a garden office; (2) an additional socket outlet spurred from an existing ring final circuit; (3) a full rewire of a three-bedroom house; (4) replacing a consumer unit, with every existing circuit reconnected and none of them altered."
            steps={[
              {
                calc: '(1) New circuit — EIC',
                note: 'Any new circuit means new design decisions: cable size, protective device, route. EIC territory, however small.',
              },
              {
                calc: '(2) Addition, no new circuit — Minor Works',
                note: 'You extended what was already there. Nothing about the existing circuit design changed.',
              },
              {
                calc: '(3) Full rewire — EIC',
                note: 'Every circuit in the property is new work, whatever existed before it.',
              },
              {
                calc: '(4) Consumer unit exchange — EIC, not Minor Works',
                note: 'The one that catches people out: no circuit was added, but the point every circuit terminates at has changed, and the installation behind it needs proper inspection and testing.',
              },
            ]}
            answer="(1) EIC, (2) Minor Works, (3) EIC, (4) EIC."
            watchOut='Job (4) is the one apprentices get wrong most often, because nothing was technically "added." The test is not whether you added a circuit — it is whether the certificate needs to speak for the whole installation behind the point you worked on. A consumer unit change does.'
          />

          <Scenario
            title="The form that was right but the wrong one"
            situation="You add a socket to an existing ring final circuit in a bedroom. It takes an hour. You issue an Electrical Installation Certificate because it looks more thorough and the client seems like the sort who will appreciate the detail."
            whatToDo="Issue a Minor Works certificate. No new circuit was installed, so that is the correct form for the work, and it has the fields that match what you actually did."
            whyItMatters="Using a heavier form does not make the work better documented — it makes the record wrong. An EIC declares design, construction and verification of an installation or new circuit. You did not design a circuit; you extended one. The Minor Works form exists precisely for this, and reaching for the wrong one suggests you are not clear on the difference."
          />

          <WorkedExample
            question='A completed EIC schedule has been handed to you to check. Insulation resistance is recorded as "200 MΩ". The recommended date for the next inspection field is left blank. A note reads "CU replaced, old CPC dodgy so used a d.b.c." Find and fix all three errors.'
            steps={[
              {
                calc: 'ERROR 1 — "200 MΩ" is a rounded figure',
                note: 'The tester reads >199 MΩ off the top of its range — it never displayed exactly 200. Record what it showed.',
              },
              {
                calc: 'ERROR 2 — a blank field',
                note: 'Blank is indistinguishable from forgotten. Write N/A if it genuinely does not apply; supply a date if it should.',
              },
              {
                calc: 'ERROR 3 — "d.b.c." is an invented abbreviation',
                note: '"Dodgy" is not a technical description either. Write out what was actually found and done in full.',
              },
            ]}
            answer='>199 MΩ · a completed date, or N/A if the form genuinely does not require one · "Existing circuit protective conductor found undersized on replacement — renewed to correct size." No invented shorthand, no blank field, no tidied reading.'
            watchOut="Each of these three passes a casual glance — that is exactly why they are worth checking for deliberately rather than trusting that a form 'looks right.'"
          />

          <SectionRule />

          {/* ── 05 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>05 · Writing a method statement</ContentEyebrow>

          <ConceptBlock
            title="Every step starts with a verb"
            onSite="If a step does not begin with something you can physically do, it is not a step — it is a comment."
          >
            <p>
              The sequence of operations is the heart of a method statement, and it has a house
              style for a reason. Number every step. Start each one with an action verb &mdash;
              Isolate, Prove, Verify, Install, Terminate, Test, Energise. Make each step one action.
              Put the safety measure inside the step it belongs to, rather than in a general note at
              the top that nobody re-reads at the point it matters.
            </p>
            <p>
              Write it in the imperative, addressed to the person doing the work. Not &ldquo;the
              circuit should then be isolated&rdquo; but &ldquo;Isolate the circuit at the
              distribution board&rdquo;. The passive voice is fine on a certificate, where you are
              recording what was done; it is the wrong choice in an instruction, where somebody has
              to act, and &ldquo;should then be isolated&rdquo; leaves open the question of whether
              it has been, is being, or is merely a good idea.
            </p>
            <p className="mt-3">
              And the sequence itself is not just a checklist &mdash; on a method statement worth
              anything, the <strong className="text-white">order</strong> is a control measure in
              its own right, as real as a lock-off or a warning sign. Isolate, then prove dead, is
              not a preference for tidiness; it is what stops somebody working on a live circuit
              under the belief that it is dead. Swap two steps that look interchangeable and you can
              remove the one thing that made the sequence safe, without changing a single word of
              any individual step.
            </p>
          </ConceptBlock>

          <WorkedExample
            question='Rewrite as a proper sequence: "Turn the power off, take the old fitting down, put the new one up, turn it back on and check it works."'
            steps={[
              { calc: '1. Isolate circuit 3 (lighting, first floor) at the distribution board.' },
              {
                calc: '2. Lock off the device and apply a warning label.',
                note: 'The lock-off is a step in its own right, not an afterthought.',
              },
              { calc: '3. Prove the test instrument on a known source.' },
              { calc: '4. Verify the circuit is dead at the luminaire terminals.' },
              {
                calc: '5. Prove the test instrument again on the known source.',
                note: 'Prove–test–prove. Omit this and a faulty tester reads dead on a live circuit.',
              },
              { calc: '6. Remove the existing luminaire and note the existing connections.' },
              { calc: '7. Install the replacement luminaire and terminate the conductors.' },
              { calc: '8. Confirm the work area is clear and replace covers.' },
              { calc: '9. Remove the lock-off and restore the supply.' },
              { calc: '10. Test for correct operation and record the result.' },
            ]}
            answer="Ten numbered steps, each beginning with a verb, each one action."
            watchOut="Notice that steps 3 and 5 are the same action, and that omitting either breaks the safety of the whole sequence. This is what is meant by the order being the control — it is not that the steps are in a tidy order, it is that steps 1 to 5 in that order are what make step 6 safe."
          />

          <TryIt
            question="These six steps are for replacing a socket outlet on an existing ring final circuit, but they are in the wrong order. Put them in a safe sequence: (a) Terminate conductors at the new socket outlet; (b) Isolate the circuit at the distribution board and lock off; (c) Prove the test instrument, verify dead at the socket, prove again; (d) Remove the old socket outlet from the wall; (e) Restore the supply and remove the lock-off; (f) Test for correct polarity and operation."
            steps={[
              {
                calc: 'Which step must always come first?',
                note: 'Isolation (b). Nothing else on this list is safe to do on a live circuit.',
              },
              {
                calc: 'What happens between isolating and touching anything?',
                note: 'Proving dead (c) — after isolation, not before, because you are proving THIS circuit dead, not just that your tester works.',
              },
              {
                calc: 'Which two steps are physical work, and in what order?',
                note: 'Remove the old socket (d) before terminating the new one (a) — you cannot terminate into a space the old fitting still occupies.',
              },
              {
                calc: 'What comes last, and why?',
                note: 'Restore the supply (e) only once the socket is safe, then test (f) — it is what tells you everything before it was done correctly.',
              },
            ]}
            answer="b → c → d → a → e → f. The single safety-critical reordering is (c) before (d): proving the circuit dead has to happen before you touch a conductor, not after. Putting (d) before (c) means removing a socket outlet without knowing whether it is live — the steps look almost right, and that is the danger in it."
          />

          <InlineCheck
            id="m2s2-method-statement"
            question="When writing the sequence of operations in a method statement, what should each step begin with?"
            options={[
              'A description of the hazard',
              'An action verb (e.g. Isolate, Verify, Install)',
              'The name of the person responsible',
              'A reference to the relevant regulation',
            ]}
            correctIndex={1}
            explanation="Each step should begin with a clear action verb telling the reader exactly what to do. Starting with 'Isolate', 'Verify', 'Install', 'Test' or 'Connect' makes the instruction direct and leaves no room for interpretation. Hazards and responsibilities belong in the document too, but in their own sections — buried inside a step they get skimmed past at exactly the moment they matter."
          />

          <SectionRule />

          {/* ── 06 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>06 · Professional emails</ContentEyebrow>

          <ConceptBlock title="A subject line is a summary, not a label">
            <p>
              &ldquo;Update&rdquo; tells the reader nothing and will not be findable in six months.
              &ldquo;EICR report &mdash; 14 Oak Street &mdash; completed 12 September&rdquo; tells
              them what it is, which property, and when, before they open it.
            </p>
            <p>
              Then: greet them by name, say why you are writing in the first sentence, give the
              detail in the middle, and finish with what happens next &mdash; whether that is
              something you will do, something they need to do, or nothing at all. An email that
              leaves the reader unsure whether they are supposed to act is an email that generates a
              phone call.
            </p>
            <p>
              Your signature block should carry your name, company, phone number, email, and your
              competent person scheme registration number where you have one. It saves the client
              hunting for it and it answers the credentials question before it is asked. None of
              this is decoration &mdash; a client reading an email on a phone in a queue decides in
              the first two lines whether they need to act, and everything after that is detail they
              will come back to only if the first two lines told them to.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Burying what happens next in the last line"
            whatHappens="The email explains the fault, the parts needed and the labour involved across three accurate paragraphs, and only in the final sentence does it say the client needs to confirm before you can book the work in. Most readers skim an email and stop well before the end."
            doInstead="State the action required in the first sentence as well as the last: 'To book this in I need your go-ahead on the price below.' Then give the detail. If it is the one thing that has to happen, it earns saying twice."
          />

          <WorkedExample
            question='Rewrite this email to a client: Subject: "job" — Body: "hiya just to let you no ive done the job today all good if any probs give us a shout cheers"'
            steps={[
              {
                calc: 'Fix the subject line',
                note: 'Name the property and what was done: "Rewire complete — 8 Ashfield Road".',
              },
              {
                calc: 'Open with a greeting and the reason for writing',
                note: '"Dear Mrs Okafor, I am writing to confirm the rewire at 8 Ashfield Road was completed today, 12 September."',
              },
              {
                calc: 'Say what happens next, even if it is nothing',
                note: 'Clients often cannot tell whether silence means "finished" or "outstanding." State it plainly.',
              },
              {
                calc: 'Sign it properly',
                note: 'Full name, company, phone number, and your competent person scheme registration number.',
              },
            ]}
            answer='Subject: "Rewire complete — 8 Ashfield Road". Body: "Dear Mrs Okafor, I am writing to confirm the rewire at 8 Ashfield Road was completed today, 12 September. No further work is required. Please get in touch if you notice anything you would like checked. Kind regards, [name], [company], [phone], [scheme registration number]."'
            watchOut="The original is not rude — it is casual to the point of being unreadable as a professional record. If this client ever needs to show somebody when they were told the job was finished, this version answers that and the original does not."
          />

          <TryIt
            question="A client emailed three days ago asking when you can come back to fix a light that has stopped working since your visit. You have not replied and you can get there Thursday. Draft the subject line and the first sentence."
            steps={[
              {
                calc: 'Subject: name the property and the issue',
                note: '"Landing light — 22 Mill Lane — visit Thursday 18th". Findable, and answers the question before they open it.',
              },
              {
                calc: 'First sentence: answer, then apologise',
                note: 'They want a date, not an apology. Date first, apology second, or the apology buries what they asked for.',
              },
              {
                calc: 'Do not explain the three-day gap at length',
                note: 'One clause. A paragraph about how busy you have been reads as an excuse.',
              },
            ]}
            answer='Subject: "Landing light — 22 Mill Lane — visit Thursday 18th". Opening: "I can come on Thursday 18th, any time after 9am — apologies for the slow reply." The date is in the subject line AND the first sentence, because clients read subject lines and skim bodies.'
          />

          <SectionRule />

          {/* ── 07 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>07 · Technical reports</ContentEyebrow>

          <ConceptBlock
            title="Evidence first, conclusion second"
            plainEnglish="Findings, then conclusions, then recommendations — in that order, because each rests on the one before."
          >
            <p>
              A fault investigation report runs: what you were asked to look at, what you did, what
              you found, what you conclude from it, and what you recommend. People are often tempted
              to lead with the recommendation because that is what the client wants to know. Resist
              it. A recommendation with the evidence behind it is persuasive; a recommendation on
              its own is an opinion, and an expensive one is an opinion the client may well decline.
            </p>
            <p>
              Keep the three apart in your own head as you write. A{' '}
              <strong className="text-white">finding</strong> is something you observed or measured
              &mdash; a number, a visible defect, a test result. A{' '}
              <strong className="text-white">conclusion</strong> is what you infer from it &mdash;
              the reasoning step that turns several findings into an explanation. A{' '}
              <strong className="text-white">recommendation</strong> is what you think should happen
              as a result. Reports go wrong when inference gets written into the findings section,
              because then there is nothing left to check the inference against &mdash; a reader who
              disagrees with your conclusion has no way to see which piece of evidence they would
              need to dispute.
            </p>
            <p className="mt-3">
              The order also protects you specifically. If a recommendation turns out to be
              expensive or unwelcome and the client questions it, a report built findings-first
              shows exactly what the recommendation was built on. A report that opens with the
              recommendation and mentions the evidence afterwards, if at all, looks like a decision
              you had already made before you started investigating &mdash; whether or not that is
              true.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="An RCD trips intermittently. Sort these into findings, conclusions and recommendations: (a) replace the immersion heater element; (b) insulation resistance on circuit 6 measured 0.3 MΩ; (c) the immersion heater element has failed to earth; (d) all other circuits measured >199 MΩ."
            steps={[
              {
                calc: 'FINDINGS — (b) and (d)',
                note: 'Both are measurements. You took them; they are not in dispute.',
              },
              {
                calc: 'CONCLUSION — (c)',
                note: 'An inference from the findings. 0.3 MΩ on one circuit against >199 MΩ on every other points to that circuit.',
              },
              { calc: 'RECOMMENDATION — (a)', note: 'What you propose doing about it.' },
            ]}
            answer="Findings (b, d) → Conclusion (c) → Recommendation (a)."
            watchOut='Notice that (d) looks like filler and is doing real work. "Everything else was fine" is what makes the conclusion about circuit 6 defensible. Reports that record only the bad reading leave the reader unable to tell whether it was the exception or the norm.'
          />

          <TryIt
            question="A ring final circuit keeps tripping its MCB. Sort these into findings, conclusions and recommendations: (a) replace the socket outlet and the damaged section of cable; (b) a continuity test shows a low resistance path between line and earth at one socket outlet; (c) the socket outlet has a cracked back box with a damaged line conductor touching the earth terminal; (d) all other sockets on the circuit tested normal on insulation resistance."
            steps={[
              {
                calc: 'Which are measurements or direct observations?',
                note: '(b) and (d) — you tested and saw them; not open to interpretation.',
              },
              {
                calc: 'Which one explains WHY, based on (b) and (d)?',
                note: '(c) — an inference: the fault is localised to this one socket outlet, not the wider circuit.',
              },
              { calc: 'Which one is the proposed fix?', note: '(a) — the recommendation.' },
            ]}
            answer="Findings: (b), (d). Conclusion: (c). Recommendation: (a). As before, the clean readings on the rest of the circuit (d) are doing real work — they are what lets you say the fault is local rather than guess at it."
          />

          <InlineCheck
            id="m2s2-technical-reports"
            question="In a technical report about a fault investigation, which should come first — your findings or your recommendations?"
            options={[
              'Recommendations — the client wants to know what to do',
              'Findings — the evidence should support the recommendations',
              'Cost estimate — the client needs to know the price first',
              'Conclusions — start with the summary',
            ]}
            correctIndex={1}
            explanation="Findings first, then conclusions, then recommendations. The reader sees the evidence before the suggested action, which lets them follow your reasoning rather than take it on trust. It also protects you: if the recommendation is later questioned, the report itself shows what it was based on."
          />

          <SectionRule />

          {/* ── 08 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>08 · Site notes and day sheets</ContentEyebrow>

          <p className="text-[13px] leading-relaxed text-white">
            A day sheet needs the date, who was on site, hours worked, what was actually done,
            materials used, anything that held the work up, and any instruction given on site and
            who gave it. Written the same day, it is evidence: it is what tells you, months later,
            who was there and for how long when an invoice is disputed, what was installed and when
            if a defect turns up, and whether a verbal instruction was actually given if it is later
            denied. Reconstructed from memory three weeks on, it is a guess, and it reads like one.
          </p>

          <Scenario
            title="The instruction nobody remembers giving"
            situation="On a commercial fit-out, the site manager tells you verbally to move a run of containment two metres to clear a duct that was not on your drawing. You do it — it costs you most of a day. Six weeks later the main contractor queries the extra time on your account, and the site manager does not recall the conversation."
            whatToDo="Produce the day sheet entry written on the day: the date, the instruction, who gave it, and the hours it cost. Then, going forward, follow up verbal instructions with a short email the same day — 'Confirming your instruction this morning to relocate the containment in Grid C…' — which costs two minutes and converts a memory into a record."
            whyItMatters="People are not usually lying when they fail to remember a site instruction; they genuinely have forgotten, because they gave nine of them that morning. That is exactly why the contemporaneous note matters. Without it you are relying on two memories agreeing six weeks later, and the one with the money at stake tends not to."
          />

          <CommonMistake
            title="Recording the work but not the obstruction"
            whatHappens="The day sheet says what you got done, so it reads like a productive week. It does not say that you lost Tuesday morning waiting for the joiner to finish, so when the programme slips the delay looks like yours."
            doInstead="Write down what stopped you as carefully as what you achieved. The idle half-day is the entry you will actually need, and it is the one people leave out because it feels like admitting to a slow day."
          />

          <WorkedExample
            question='This day sheet entry only records what was achieved: "Tuesday 9 Sept — First fix wiring to kitchen and utility, both circuits complete." What is missing, and what would actually survive a dispute?'
            steps={[
              {
                calc: 'What does this entry NOT say?',
                note: 'Who was on site, how many hours it took, whether anything held the work up, and any instruction given that day.',
              },
              {
                calc: 'Why does that matter?',
                note: 'If the programme slips next week and somebody asks why first fix took a day and a half, this entry has no answer.',
              },
              {
                calc: 'Add what happened, including the unremarkable parts',
                note: 'Two operatives, 07:30–16:00. Lost ~90 minutes waiting for the plasterer to finish the utility room wall.',
              },
              {
                calc: 'Add anything instructed, and by whom',
                note: 'Name the person and note it, even if it feels minor — that is exactly what gets disputed months later.',
              },
            ]}
            answer='"Tuesday 9 Sept — J. Hall and self on site 07:30–16:00. First fix wiring to kitchen and utility, both circuits complete. Utility room first fix delayed approx. 90 min waiting for plasterer. Client (Mrs Aziz) requested an additional socket outlet near the utility room door — agreed on site, added to circuit 6." That entry answers questions nobody has asked yet.'
            watchOut="The achieved-only version reads better in the moment because it looks productive. The complete version is the one still useful in six weeks."
          />

          <TryIt
            question="Write a day sheet entry for this day, including what would make it hold up months later: you and an apprentice fitted second fix electrics to four rooms of a house, starting at 8am and finishing at 4:30pm. At 11am the site manager verbally told you to leave two rooms without light switches fitted because the plasterer needed to redo a wall. You used your own stock of switches and sockets — no additional materials ordered."
            steps={[
              {
                calc: 'Date, personnel, hours',
                note: 'Do not skip this because it feels obvious — it is the first thing anyone checks against an invoice.',
              },
              {
                calc: 'What was done, and where it was NOT completed',
                note: 'Second fix to four rooms; two rooms left without light switches.',
              },
              {
                calc: 'The instruction: what, who, when',
                note: 'Matters most here — a verbal instruction with no name and no time attached is not evidence of anything.',
              },
              {
                calc: 'Materials',
                note: 'Own stock used, nothing additional ordered — worth recording even when nothing went wrong.',
              },
            ]}
            answer='Something like: "[Date] — self and apprentice, 08:00–16:30. Second fix electrics to four rooms. At 11:00, site manager [name] instructed verbally to leave light switches out of two rooms pending replastering. Own stock of switches/sockets used, no additional materials required." Every element a dispute could turn on is answered before anyone asks.'
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'The certificate outlives the job and is read by people who cannot ask you what you meant.',
              'Learn the EICR sections by name — Purpose, Extent and Limitations are the ones people skip, and Limitations is the one that protects you.',
              'C1 is danger now and must be made safe before you leave. C2 is danger if. C3 is an improvement. FI is "I could not tell".',
              'Satisfactory means no C1 and no C2. One C2 makes the whole report unsatisfactory.',
              'An observation states what, where and which circuit. Missing any one sends somebody back to find it.',
              'New circuit means EIC. Alteration to an existing circuit means Minor Works. Pick by the work, not by which looks more impressive.',
              'Write the value the instrument displayed, including >199 MΩ. Never tidy a reading.',
              'N/A in every field that does not apply — a blank looks like a mistake.',
              'Method statement steps are numbered, start with a verb, and carry one action each.',
              'Findings, then conclusions, then recommendations. Never lead with the fix.',
              'Fill the day sheet in on the day, and record what stopped you as well as what you did.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Can I use abbreviations on a certificate?',
                answer:
                  'Standard trade abbreviations, yes — MCB, RCD, RCBO, CPC and similar are understood by anyone who will read the form. Anything you or your firm invented, no. The reader in eight years cannot ring you to ask, and a form that needs a key is a form that has failed.',
              },
              {
                question: 'What if I genuinely cannot decide between C2 and C3?',
                answer:
                  'Ask whether a foreseeable event turns it dangerous. If yes, it is C2. If it is simply short of the current standard with no realistic route to harm, it is C3. Write the reasoning into the observation — a coded observation you can justify in a sentence is far stronger than one you cannot, whichever code you landed on.',
              },
              {
                question: 'Should the client see my day sheets?',
                answer:
                  'They are your record, not a deliverable, so not routinely. But write them as though they might be read by someone else one day, because in a dispute that is exactly what happens. That means factual, dated, and free of remarks about anybody.',
              },
              {
                question: 'Is it acceptable to fill a certificate in later, back at the office?',
                answer:
                  'Test values should be recorded as you take them, not reconstructed — that is the part that must be contemporaneous. Tidying the rest of the paperwork afterwards is normal and fine. What you must never do is write a value you did not measure.',
              },
              {
                question: 'How much detail belongs in Limitations?',
                answer:
                  'Enough that a reader knows exactly what was not covered and why. "Limited access" is weak. "Loft not inspected — no permanent access and no ladder available on the day" is specific, honest, and does the job it exists to do.',
              },
            ]}
          />

          <SectionRule />

          <Quiz questions={quizQuestions} title="Section 2: Technical Writing Quiz" />

          {/* ── prev / next ─────────────────────────────────────────── */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module2/section1')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-sm font-medium text-white touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" />
              Section 1
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module2/section3')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-elec-yellow/35 bg-elec-yellow/[0.08] px-4 text-sm font-semibold text-white touch-manipulation"
            >
              Section 3
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default FunctionalSkillsModule2Section2;
