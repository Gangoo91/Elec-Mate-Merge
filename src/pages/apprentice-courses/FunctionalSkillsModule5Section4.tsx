/**
 * Functional Skills · Module 5 · Section 4 — Portfolio building and evidence
 *
 * CONVERTED (13 Sep) from the 2024 dialect to the StudyPage reading kit.
 *
 * 🔴 AWARDING BODY — NOT NAMED, AND NOT GUESSED. Portfolio structure, evidence
 * volume and gateway requirements differ between awarding bodies and between
 * apprenticeship standards, and this page does not know which one the learner
 * is on. Nowhere here does it state a required number of evidence pieces, a
 * mandated portfolio layout, or a specific gateway requirement as fact — where
 * the old page implied one ("front cover, contents page, personal statement,
 * in that order"), this version teaches the PRINCIPLE (a portfolio needs to be
 * navigable and complete) and tells the learner to confirm the exact structure
 * and evidence requirements with their own provider.
 *
 * 🔴 VACSR — CORRECTED AND PRESERVED. The pre-conversion file had a heading
 * promising five assessment principles and listed only four — Reliable was
 * missing entirely. All five are taught here: Valid, Authentic, Current,
 * Sufficient, Reliable. Reliable is defined as it was corrected: evidence
 * consistent enough that any assessor reading it reaches the same judgement —
 * a dated, signed witness testimony describing exactly what was done is
 * reliable; "did the job well" is not, because two assessors could read it
 * two different ways. Section 01 states the mnemonic and works all five
 * against real evidence, one principle at a time, rather than listing them
 * and moving on.
 *
 * CUT — the generic filler this page shared with Section 3's trap: "keep your
 * portfolio organised", "start early", "be proud of your work", a full ring-
 * binder-vs-digital-folder comparison, and a checklist of professionalism
 * tips for the assessor visit. None of it is specific to being an electrician
 * — it could sit in a portfolio guide for any trade or none. What replaced it
 * is worked, trade-contextualised practice: turning weak evidence valid,
 * applying VACSR to real evidence, fixing a witness testimony that says
 * nothing, spotting evidence that has gone stale or is not authentic, and
 * capturing evidence on the day rather than trying to reconstruct it later.
 *
 * Quiz bank (all 8 questions, options, correctAnswer indices) is carried over
 * verbatim — no question, option or index changed. All three InlineChecks are
 * carried over verbatim (question and correctAnswer text unchanged) with
 * m5s4- prefixed ids added, since the original had none.
 *
 * No <RegsCallout> — this page is assessment practice, not BS 7671 territory,
 * and nothing here has been dressed up as a regulation. No competent person
 * scheme is named.
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

const TITLE = 'Portfolio Building & Evidence - Functional Skills Module 5.4';
const DESCRIPTION =
  'Functional Skills for electricians: building a portfolio of evidence, applying VACSR, writing witness testimonies and reflective accounts, cross-referencing evidence, and spotting evidence that is not authentic or no longer current.';

const quizQuestions = [
  {
    id: 1,
    question: 'What is the primary purpose of a portfolio in an apprenticeship?',
    options: [
      'To keep a personal record of every job you have ever worked on',
      'To provide documented evidence that you meet the assessment criteria and are competent',
      'To replace the need for an end-point assessment at the end of the course',
      'To list all the tools and equipment you own as an apprentice',
    ],
    correctAnswer: 1,
    explanation:
      'A portfolio is a structured collection of evidence that demonstrates your skills, knowledge, and competence against specific assessment criteria. It provides documented proof that you can perform the required tasks to the required standard in real work situations.',
  },
  {
    id: 2,
    question: 'What is the STAR structure used for in reflective accounts?',
    options: [
      'A filing system for photographs',
      'Rating the quality of evidence from 1 to 5 stars',
      'Organising your account into Situation, Task, Action, Result',
      'An assessment grading scale used by external verifiers',
    ],
    correctAnswer: 2,
    explanation:
      'STAR stands for Situation, Task, Action, Result. It provides a clear structure for writing reflective accounts that demonstrate your competence by explaining the context, your role, what you did, and what the outcome was.',
  },
  {
    id: 3,
    question: "What does 'cross-referencing evidence' mean in portfolio building?",
    options: [
      'Putting all evidence in alphabetical order',
      'Marking evidence with a red cross if it is not good enough',
      'Asking a colleague to check your portfolio for spelling errors',
      'Mapping each piece of evidence to the specific assessment criteria it covers',
    ],
    correctAnswer: 3,
    explanation:
      'Cross-referencing means linking each piece of evidence to the specific assessment criteria or learning outcomes it demonstrates. This shows the assessor exactly which requirements each piece of evidence satisfies, and helps you identify any gaps.',
  },
  {
    id: 4,
    question: 'Which principle is most important when selecting evidence for your portfolio?',
    options: [
      'Choose quality evidence that clearly demonstrates competence, avoiding unnecessary duplication',
      'Include as much evidence as possible to make the portfolio look thorough',
      'Use only photographic evidence, as photos are the most convincing type',
      'Gather evidence only in the final weeks before your assessment is due',
    ],
    correctAnswer: 0,
    explanation:
      'Quality over quantity is the key principle. Assessors prefer a well-organised portfolio with strong, relevant evidence rather than a bulky folder full of duplicated or weak items. Each piece should clearly demonstrate a specific competency.',
  },
  {
    id: 5,
    question: 'What makes a witness statement valid for your portfolio?',
    options: [
      'An unsigned note from a fellow apprentice confirming you were on site that day',
      'A signed statement from a qualified supervisor describing specific tasks you performed, with their name, job title, and the date',
      'A general written reference praising your attitude and timekeeping at work',
      'A printed photograph of you carrying out the task, with no accompanying text',
    ],
    correctAnswer: 1,
    explanation:
      'A valid witness statement must be signed by a qualified person (such as your supervisor or a competent colleague), include their name and job title, the date, and describe specific tasks you performed that demonstrate competence. It must be someone qualified to judge your work.',
  },
  {
    id: 6,
    question:
      'When taking photographs as portfolio evidence, which of the following is most important?',
    options: [
      'Taking as many photos as possible, even if some are blurred or poorly lit',
      'Photographing only the finished work, never the stages in between',
      'Ensuring photos are clear, well-lit, captioned with your role, and taken with permission',
      'Using a black-and-white filter to make the photographs look more professional',
    ],
    correctAnswer: 2,
    explanation:
      'Quality and context are essential. Photos must be clear and well-lit, include captions explaining what the photo shows and your role, and you must always have permission to photograph on site. Before, during, and after photos can all be valuable evidence.',
  },
  {
    id: 7,
    question: 'What is the most common reason portfolios are returned for additional work?',
    options: [
      'The portfolio contains too many pieces of evidence to review easily',
      'The handwriting in the reflective accounts is difficult to read',
      'The evidence is too recent and does not cover earlier years of training',
      'There are gaps in coverage — some assessment criteria are not evidenced',
    ],
    correctAnswer: 3,
    explanation:
      'The most common reason for portfolios being returned is gaps in coverage — where one or more assessment criteria have no evidence linked to them. Using a cross-referencing matrix and reviewing it regularly helps you identify and fill gaps before final submission.',
  },
  {
    id: 8,
    question: 'During an assessor visit, what should you be prepared to do?',
    options: [
      'Explain any piece of evidence in your portfolio, locate it quickly, and discuss your learning',
      'Hand over your portfolio and leave the assessor to review it alone',
      'Present only your strongest evidence and set the weaker items aside',
      'Memorise the assessment criteria word for word and recite them on request',
    ],
    correctAnswer: 0,
    explanation:
      'Assessors may ask questions about any piece of evidence to confirm it is genuine and that you understand what you did. You should be able to quickly locate evidence using your index, explain it confidently, and discuss what you learned. They want to confirm your competence, not catch you out.',
  },
];

const FunctionalSkillsModule5Section4 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 5 · Section 4"
        title="Portfolio building and evidence"
        backTo="/study-centre/apprentice/functional-skills/module5"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        <StudyPage measure="74rem" wide="94rem">
          <p className="text-[13px] leading-relaxed text-white">
            A portfolio is not a filing exercise — it is the thing an assessor reads instead of
            following you round for two years. Everything in it has to survive being read by
            somebody who was not on site, was not in the room, and cannot ask you what you meant.
            This section is about making sure it does: applying a real test to every piece of
            evidence you keep, and knowing how to turn something weak, vague or half-finished into
            something an assessor can actually use.
          </p>

          <LearningOutcomes
            outcomes={[
              'Apply VACSR — Valid, Authentic, Current, Sufficient, Reliable — to a real piece of evidence, one principle at a time, and reach a verdict.',
              'Turn a piece of evidence with no context into one that stands on its own: what it shows, when, where, and what you personally did.',
              'Capture evidence on the day a job is done, before you leave site, rather than trying to reconstruct it weeks later.',
              'Cross-reference one piece of evidence against more than one assessment criterion, and recognise when that is legitimate and when it is stretching.',
              'Turn a witness testimony that says nothing ("did a good job") into one an assessor can actually act on.',
              'Write a reflective account that demonstrates understanding of a decision, not just a description of what happened.',
              'Identify evidence that is not authentic, and evidence that is no longer current, and decide what to do about each.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Section 3 of this module',
                gist: 'Study techniques and self-assessment come first — this section assumes you already have a habit of reviewing your own work honestly.',
              },
              {
                term: 'A rough idea of what your portfolio is being assessed against',
                gist: "You don't need to have memorised every assessment criterion, but you do need to know that your evidence is being checked against a specific set of them, not marked on general impression.",
              },
            ]}
          />

          <TLDR
            points={[
              'Every piece of evidence has to pass VACSR — Valid, Authentic, Current, Sufficient, Reliable — all five, not four out of five.',
              'A photo, certificate or note with no context is close to worthless. What turns it into evidence is what, where, when and what you personally did.',
              'Capture evidence on the day, before you leave site. Evidence reconstructed from memory weeks later is weaker and sometimes wrong.',
              'One piece of evidence can legitimately cover more than one criterion — but only if it actually demonstrates each one in detail. Claiming five criteria off one vague photo is stretching, not cross-referencing.',
              '"Did a good job, no issues" is not a witness testimony. A testimony needs a specific task, a name, a job title, a date, and a signature.',
              'A reflective account that narrates what happened is weaker than one that explains why you made the decisions you made.',
              'Evidence can look fine and still fail: not authentic (you cannot explain it, or the timeline does not fit), or not current (it shows a level of skill you had years ago, not now).',
              'The exact structure your provider wants, and how many pieces of evidence a criterion needs, varies — confirm both with your own provider rather than assuming.',
            ]}
          />

          <SectionRule />

          {/* ── 01 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>
            01 · VACSR — the five tests every piece of evidence has to pass
          </ContentEyebrow>

          <ConceptBlock
            title="Remember it as VACSR — and apply all five, not the ones that are easiest"
            plainEnglish="Five short tests. Evidence has to pass every one of them, not most of them."
          >
            <p>
              Whatever else you know about the piece of evidence in front of you, an assessor is
              running it against five tests, and it is worth running them yourself before it goes in
              the portfolio at all.
            </p>
            <ul className="mt-2 space-y-1.5">
              <li>
                <strong className="text-white">Valid.</strong> Is it actually relevant to the
                criterion being claimed? A photo of a completed installation is valid evidence of
                practical competence; a photo of your van, however tidy, is not.
              </li>
              <li>
                <strong className="text-white">Authentic.</strong> Is it genuinely your own work,
                and can you explain it if questioned? Evidence that turns out to be someone else's,
                or that you cannot account for, is a serious problem — not a weak mark, a
                disqualifying one.
              </li>
              <li>
                <strong className="text-white">Current.</strong> Does it reflect your present level
                of competence? Something from early in your training may show you could do a task
                then; it does not show you can do it now.
              </li>
              <li>
                <strong className="text-white">Sufficient.</strong> Is there enough evidence,
                between everything you have submitted, to cover the criterion completely? One item
                can contribute to more than one criterion, but there must be no criterion with
                nothing behind it at all.
              </li>
              <li>
                <strong className="text-white">Reliable.</strong> Is it consistent enough that any
                assessor reading it would reach the same judgement? A dated, signed witness
                testimony describing exactly what you did is reliable; a one-line note saying "did
                the job well" is not, because two different assessors could read that sentence two
                different ways.
              </li>
            </ul>
            <p className="mt-3">
              The mnemonic is <strong className="text-white">VACSR</strong> — Valid, Authentic,
              Current, Sufficient, Reliable. Every piece of evidence you keep has to pass all five.
              A witness testimony that is detailed, signed and dated (strong on Authentic and
              Reliable) but describes a job from two years ago (fails Current) is still not usable
              evidence of your present competence — it is simply a strong piece of evidence for the
              wrong point in time.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Apply VACSR, one principle at a time, to this piece of evidence: a photo of a completed consumer unit installation, captioned 'Consumer unit install, 14 Jan 2026, 42 Oak Lane — installed and terminated all circuits under supervision, criteria 3.2 and 3.4', taken during a job completed three weeks ago."
            steps={[
              {
                calc: 'Valid?',
                note: 'Yes — a photo of a completed consumer unit install is directly relevant to a criterion about installation competence, not a general workplace photo.',
              },
              {
                calc: 'Authentic?',
                note: 'Assume you can explain exactly what you did and did not do on the job — which circuits you terminated yourself, which your supervisor checked. If you cannot, stop here: it is not usable regardless of the other four.',
              },
              {
                calc: 'Current?',
                note: 'Three weeks old — reflects your present level of competence, not a snapshot from early training.',
              },
              {
                calc: 'Sufficient — on its own?',
                note: 'No. It demonstrates installation for this one job and these two criteria. It does not, by itself, cover every criterion in the unit — nothing does.',
              },
              {
                calc: 'Reliable?',
                note: 'The caption gives a date, an address, what was installed, and what you personally did. Any assessor reading it would reach the same conclusion about what it shows.',
              },
            ]}
            answer="Passes Valid, Authentic, Current and Reliable on its own; Sufficient is not a property of a single item — it is judged across the whole portfolio. Verdict: strong, usable evidence for criteria 3.2 and 3.4, needing other evidence alongside it for anything it does not cover."
            watchOut="Sufficient is the one principle that cannot be answered by looking at a single piece of evidence in isolation — it is a question about the whole portfolio, not about this one photo. Do not mark an item down as 'insufficient' on its own; ask instead whether the portfolio as a whole has a gap."
          />

          <TryIt
            question="Apply VACSR to this piece of evidence: a signed witness testimony from your supervisor, dated, describing in detail a fault-finding job you carried out — but the job took place during your first month of the apprenticeship, over two years ago, and the criterion being claimed relates to independent fault diagnosis at your current stage of training."
            steps={[
              {
                calc: 'Valid?',
                note: 'Check whether the task described actually matches the criterion being claimed.',
              },
              { calc: 'Authentic?', note: 'Signed and detailed — assume this one is genuine.' },
              {
                calc: 'Current?',
                note: 'Two years old, from your first month. Does it show your present level of independence, or an early one?',
              },
              {
                calc: 'Sufficient?',
                note: 'Even if it passed every other test, does the portfolio have anything more recent for this criterion?',
              },
              {
                calc: 'Reliable?',
                note: 'Detailed and signed — strong on this test in isolation.',
              },
            ]}
            answer="Fails Current: it shows competence at month one, not at the stage the criterion is testing. Strong on Authentic and Reliable does not rescue it — verdict is that it needs replacing or supplementing with a recent piece of evidence for independent fault diagnosis, not simply kept because it is well written."
          />

          <WorkedExample
            question="Apply VACSR to this piece of evidence: a detailed reflective account, well written and dated, describing how you diagnosed and repaired an intermittent fault on a ring final circuit — but when your assessor asks you to talk through the tests you carried out, you cannot explain what the readings actually meant or why you chose that circuit to test first."
            steps={[
              {
                calc: 'Valid?',
                note: 'Yes on the face of it — fault diagnosis is directly relevant to a fault-finding criterion.',
              },
              {
                calc: 'Authentic?',
                note: 'This is where it fails. If you cannot explain the reasoning behind your own account when asked, the account does not stand as evidence that you understood — or in the worst case, did — the diagnosis described.',
              },
              { calc: 'Current?', note: 'Dated recently — passes this test in isolation.' },
              {
                calc: 'Sufficient?',
                note: 'Not reachable — Authentic has already failed, so the item cannot count as evidence for the criterion regardless of how well it covers the rest.',
              },
              {
                calc: 'Reliable?',
                note: 'The writing is consistent and detailed — but a document you cannot defend under questioning is not reliable in any way that matters, whatever it looks like on the page.',
              },
            ]}
            answer="Fails Authentic. A well-written, dated, detailed account that you cannot explain when questioned does not pass — however strong it looks on Valid, Current and the surface reading of Reliable. Authenticity is tested by whether you can account for the evidence yourself, not by how convincing the document reads."
            watchOut="This is the case learners find hardest to accept, because the document itself looks like excellent evidence. The test is not the quality of the writing — it is whether you, personally, can stand behind it when asked. If you cannot, it fails, whoever wrote it and however good it reads."
          />

          <TryIt
            question="Apply VACSR to this piece of evidence: a photograph of a completed installation, correctly captioned with the date, location, and a description of what you did — but the property and job described do not match any entry in your own day sheets or job records for that period."
            steps={[
              {
                calc: 'Valid?',
                note: 'The caption describes something directly relevant to the criterion — passes on the surface.',
              },
              {
                calc: 'Authentic?',
                note: 'A caption that reads well is not the same as a caption that is true. If your own independent records show no job at that property on that date, the caption cannot be verified against anything — and may not describe real work you did at all.',
              },
              {
                calc: 'Current?',
                note: 'The stated date is recent — but this only matters if the evidence is genuine in the first place.',
              },
              {
                calc: 'Sufficient / Reliable?',
                note: 'Neither can be meaningfully assessed once Authentic has failed — a fabricated or mistaken entry cannot contribute to sufficiency, and it is not reliable if it is not true.',
              },
            ]}
            answer="Fails Authentic — a caption with no supporting record anywhere else cannot be relied on, however well written it is. This is exactly why capturing evidence on the day, against a job you can independently show you attended, matters as much as the caption itself."
          />

          <CommonMistake
            title="Assuming four strong principles make up for one weak one"
            whatHappens="A piece of evidence is detailed, clearly your own work, and consistently written — strong on Authentic, Reliable and Valid. But it describes a job from early in your training, so it fails Current for the criterion it is being used against. It gets kept anyway because it 'looks' like good evidence."
            doInstead="Treat all five as pass/fail, not as a score out of five. A single failed principle means the piece does not count as evidence for that criterion, however strong it is on the other four — find or create something that actually passes all five."
          />

          <SectionRule />

          {/* ── 02 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>02 · Making weak evidence valid</ContentEyebrow>

          <ConceptBlock
            title="Context is what separates evidence from a photo of some wires"
            onSite="A photo, a certificate, a printed test result — none of them mean anything to an assessor without four things attached: what it shows, where and when, which criterion it is being offered against, and what you personally did."
          >
            <p>
              Most weak evidence is not weak because the work behind it was poor — it is weak
              because nothing was written down alongside it. A photograph of a finished job proves
              somebody did something; it does not prove who, when, where, or what exactly they did,
              and an assessor cannot give you credit for what they cannot establish.
            </p>
            <p className="mt-3">
              The fix is the same whatever the evidence type. Add the date. Add the location and,
              where it applies, the circuit reference. Add a description of exactly what the
              evidence shows. And add what you personally did — not the team, not your supervisor,
              you — because that is the part a criterion is actually checking.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Take this photograph and make it usable evidence: a photo showing a finished consumer unit on a domestic rewire, with no caption, date, location or note of what was done."
            steps={[
              {
                calc: 'Add the date',
                note: '14 January 2026 — without it, nothing else about this photo can be placed in time.',
              },
              {
                calc: 'Add the location',
                note: 'Kitchen, 42 Oak Lane, Leeds — the property and, if relevant, the room.',
              },
              {
                calc: 'Describe what it shows',
                note: 'Completed consumer unit installation, 10-way board, RCBO protection on all circuits.',
              },
              {
                calc: 'State what you personally did',
                note: 'I installed and wired the consumer unit under supervision, terminated all circuit cables, labelled each circuit, and fitted the enclosure cover.',
              },
              {
                calc: 'Cross-reference it',
                note: 'Note which criteria it is offered against — say Unit 3, Criteria 3.2 and 3.4 — so the assessor does not have to guess.',
              },
            ]}
            answer="A caption reading: 'Date: 14 January 2026. Location: kitchen, 42 Oak Lane, Leeds. Description: completed consumer unit installation, 10-way board with RCBO protection on all circuits. My role: I installed and wired the consumer unit under supervision, terminated all circuit cables, labelled each circuit, and fitted the enclosure cover. Criteria covered: Unit 3, 3.2 and 3.4.' The photo has not changed — what changed is whether an assessor can use it."
            watchOut="Adding the caption after the fact, from memory, weeks later, is worse than it looks. You may get the date wrong, forget which circuits you actually terminated versus watched, and end up writing something you cannot fully stand behind if questioned. Caption it on the day."
          />

          <TryIt
            question="Take this evidence and make it usable: a spreadsheet material takeoff you produced for a kitchen ring extension, with quantities and costs, but no note of the job it was for, the date, or which criteria it demonstrates."
            steps={[
              {
                calc: 'Add the date and the job it relates to',
                note: 'Which property, which job, when it was produced.',
              },
              {
                calc: 'Describe what the document is',
                note: 'A material takeoff you produced independently, not one copied or provided by someone else.',
              },
              {
                calc: 'State what you personally did',
                note: 'That you measured the job, sourced the unit costs, and calculated the totals yourself.',
              },
              {
                calc: 'Cross-reference it',
                note: 'Note which criteria it demonstrates — likely a measurement or calculation criterion, not an installation one.',
              },
            ]}
            answer="An annotation reading something like: 'Material takeoff produced independently for a kitchen ring extension at [address], [date]. I measured the job, sourced unit costs from the supplier catalogue and calculated the extended totals. Criteria covered: [measurement/calculation criterion].' Without this note, an assessor cannot tell whether you produced the spreadsheet or were handed it."
          />

          <InlineCheck
            id="m5s4-evidence-types"
            question="Name four different types of evidence you can include in your portfolio."
            correctAnswer="You can include: (1) Certificates and qualifications, (2) Work products (job sheets, risk assessments, emails, calculations), (3) Photographic evidence of completed work, (4) Reflective accounts using the STAR structure, (5) Witness testimonies from supervisors. Using a variety of types creates a stronger, more convincing portfolio."
          />

          <SectionRule />

          {/* ── 03 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>03 · Turning a job into evidence — before you leave site</ContentEyebrow>

          <ConceptBlock
            title="Capture it on the day, not from memory afterwards"
            plainEnglish="Everything a piece of evidence needs — the photo, the names, the readings, the caption — is easiest to get in the last ten minutes on site and hardest to get three weeks later."
          >
            <p>
              A job that could become strong evidence is wasted if nothing is captured before you
              pack up and leave. The details that make evidence usable — exactly what you did, who
              witnessed it, what the test readings were — are all available on site and start
              degrading the moment you drive away.
            </p>
            <p className="mt-3">
              Before leaving any job worth using as evidence: take before, during and after photos
              (with permission), caption them there and then rather than "later"; note specifically
              what you did versus what a supervisor or colleague did; if a witness testimony would
              help, ask for it — or at least get the person's name and job title — while the work is
              still fresh in their mind, not weeks on; and note down or photograph any test readings
              you took before the paperwork gets filed away somewhere you cannot easily get to.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="You have just finished a consumer unit exchange, working under supervision. Before you leave site, what do you capture?"
            steps={[
              {
                calc: 'Before/during/after photos',
                note: 'Old board before removal, the new board mid-install, and the completed, labelled board — each captioned with date and location at the time.',
              },
              {
                calc: 'What you did versus what your supervisor did',
                note: 'Write it down now: which circuits you personally terminated, which your supervisor checked or completed. This distinction gets harder to recall accurately every day that passes.',
              },
              {
                calc: 'A witness note or testimony request',
                note: 'Ask your supervisor there and then, while the job is fresh, rather than emailing a vague request a fortnight later.',
              },
              {
                calc: 'Test readings',
                note: 'Photograph or copy the schedule of test results before it goes into a folder you may not see again for months.',
              },
              {
                calc: 'The criteria it is likely to cover',
                note: 'Note this while the job is fresh — it is far easier to place a job against the right criterion when you can still remember exactly what you did.',
              },
            ]}
            answer="Photos captioned on the day, a written note of your own role versus your supervisor's, a witness testimony requested while memory is fresh, a copy of the test readings, and a note of which criteria the job is likely to demonstrate. Nothing here takes more than a few minutes, and every part of it is far harder to reconstruct a month later."
            watchOut="The job itself does not stop being good evidence with time — what degrades is your ability to describe it precisely. 'I think I did most of the terminations' is a weaker sentence than the one you could have written on the day, and it reads as weaker to an assessor too."
          />

          <TryIt
            question="You have just finished first-fix wiring on a two-storey rewire, working alongside a qualified electrician, and you personally ran and clipped cable for four circuits and drilled all the joist holes. Before you leave site, what do you capture?"
            steps={[
              {
                calc: 'Photos',
                note: 'The routed cable runs before boarding covers them — this is evidence that disappears the moment plasterboard goes up.',
              },
              {
                calc: 'What you did versus the qualified electrician',
                note: 'Which circuits you ran and clipped, which joists you drilled, and what they did that you did not.',
              },
              {
                calc: 'A witness note',
                note: 'Ask the electrician you worked alongside for a short testimony or at least their name and job title, today.',
              },
              {
                calc: 'Note the criteria',
                note: 'Likely first-fix installation and safe cable routing — write it while the detail is clear in your head.',
              },
            ]}
            answer="Photos of the cable runs before the boarding goes up (this evidence is genuinely irrecoverable once covered), a written note of exactly which circuits and joists were yours, a witness request made the same day, and a note of which criteria the job supports. The boarding-up detail matters specifically here — some evidence has a closing window measured in hours, not weeks."
          />

          <CommonMistake
            title="Deciding to 'sort the portfolio out later' when the job was good evidence"
            whatHappens="A strong job goes by with nothing captured because there was no time, or it did not feel like the moment. Weeks later, the photos were never taken (the work is now covered or removed), the supervisor cannot recall the specifics well enough to sign a testimony, and the job — which would have been excellent evidence — contributes nothing to the portfolio at all."
            doInstead="Build a habit of the last-ten-minutes routine on any job that looks like good evidence: photos, a note of your own role, and a witness request, before you leave site. It costs minutes on the day and is often impossible to do at all a month later."
          />

          <SectionRule />

          {/* ── 04 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>04 · Cross-referencing — legitimate versus stretching</ContentEyebrow>

          <ConceptBlock
            title="One piece of evidence can cover more than one criterion — if it actually demonstrates each one"
            plainEnglish="Cross-referencing means mapping evidence to criteria. It is legitimate when the evidence genuinely shows each thing being claimed, in enough detail to check. It is stretching when it is being used to paper over a gap."
          >
            <p>
              Cross-referencing evidence against multiple assessment criteria is normal and
              efficient — a well-documented job genuinely demonstrates several things at once. A
              detailed witness testimony describing a rewire might legitimately cover measurement
              and calculation, safe isolation, and correct termination, because the testimony
              actually describes all three in enough detail to check.
            </p>
            <p className="mt-3">
              It stops being legitimate the moment the evidence is thin and is being claimed against
              criteria it does not actually show. A single unannotated photo of a finished job
              claimed against five separate criteria — installation, safe isolation, customer
              communication, time management and health and safety — is not cross-referencing; it is
              one weak item doing the job of five, and an assessor who looks closely will find that
              it demonstrates none of them convincingly.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Decide whether this cross-reference is legitimate: a witness testimony from a site supervisor describing a domestic rewire in detail — it states the apprentice measured and calculated cable lengths for six circuits, produced an accurate material list, terminated all cables at the consumer unit correctly and to standard, and communicated clearly with the customer about timescales — claimed against three criteria: measurement/calculation, installation, and professional communication."
            steps={[
              {
                calc: 'Does it describe the measurement/calculation task specifically?',
                note: 'Yes — six circuits, cable lengths, an accurate material list. Specific enough to check.',
              },
              {
                calc: 'Does it describe the installation task specifically?',
                note: 'Yes — terminated all cables at the consumer unit correctly and to standard.',
              },
              {
                calc: 'Does it describe the communication task specifically?',
                note: 'Yes — communicated clearly with the customer about timescales, a distinct, describable act.',
              },
              {
                calc: 'Verdict on legitimacy',
                note: 'Each of the three claimed criteria has its own specific, checkable detail in the testimony — this is not one vague sentence stretched across three boxes.',
              },
            ]}
            answer="Legitimate. All three criteria are backed by distinct, specific detail within the same testimony — a reader could check each claim separately against the text."
            watchOut="The test is not how many criteria a single item is claimed against — it is whether each claimed criterion has its own specific detail behind it. Three criteria backed by three specific sentences is legitimate; three criteria backed by one vague sentence is not, however few or many criteria are involved."
          />

          <WorkedExample
            question="Decide whether this cross-reference is legitimate: a single photograph of a finished domestic installation, captioned only 'Completed job, 12 Feb 2026', claimed against five criteria — installation quality, safe isolation, customer communication, time management, and health and safety on site."
            steps={[
              {
                calc: 'Does the caption describe safe isolation?',
                note: 'No mention of it at all.',
              },
              {
                calc: 'Does the caption describe customer communication?',
                note: 'No mention of it.',
              },
              { calc: 'Does the caption describe time management?', note: 'No mention of it.' },
              {
                calc: 'Does the caption describe health and safety on site?',
                note: 'No mention of it.',
              },
              {
                calc: 'What does the photo actually show?',
                note: 'A finished installation — reasonably usable for installation quality alone.',
              },
            ]}
            answer="Stretching, not legitimate cross-referencing. The photo can support installation quality; the other four criteria have nothing specific behind them at all and need their own evidence — written up, or a different item entirely."
            watchOut="A photo claimed against five criteria looks efficient on a cross-referencing matrix, because the box gets ticked five times from one entry. An assessor checking the actual content finds nothing behind four of those ticks, and the portfolio looks worse for having claimed them than if it had left those criteria showing an honest gap."
          />

          <TryIt
            question="Decide whether this cross-reference is legitimate: a day sheet entry describing a fault-finding visit — it records the fault reported, the tests carried out with their readings, the fault located and the reasoning for it, and the repair completed — claimed against two criteria: fault diagnosis, and accurate record keeping."
            steps={[
              {
                calc: 'Does it show fault diagnosis specifically?',
                note: 'Tests, readings, and the reasoning that located the fault — yes, specific and checkable.',
              },
              {
                calc: 'Does it show accurate record keeping specifically?',
                note: 'The entry itself, produced the same day with the detail required, is direct evidence of that skill in the act of being demonstrated.',
              },
            ]}
            answer="Legitimate. Both criteria are backed by the same document, but for a genuine reason — the diagnosis is checkable in the tests and readings, and the record itself is the evidence for record keeping. Contrast this with the photo above, where the criteria being claimed were not actually present in the item at all."
          />

          <TryIt
            question="Decide whether this cross-reference is legitimate: a single certificate copy — an EIC for a job you assisted on — claimed against four criteria: certification, design competence, testing competence, and client liaison, with no other annotation."
            steps={[
              {
                calc: 'Does the certificate itself show your role?',
                note: 'No — a certificate records what was declared and by whom it was signed off, not who did which part of the work.',
              },
              {
                calc: 'Does it show design competence specifically?',
                note: 'No individual contribution is described anywhere on the form.',
              },
              {
                calc: 'Does it show client liaison?',
                note: 'Nothing on the certificate addresses this at all.',
              },
              {
                calc: 'What would it need to support even one of these claims?',
                note: 'An annotation stating exactly what you did and did not do on the job.',
              },
            ]}
            answer="Stretching. A certificate with no annotation of your own role cannot support any of these four criteria on its own — at most, once annotated with what you specifically did, it might support one or two of them. Claimed against all four with nothing added, it is a single unexplained document doing far more work than it can bear."
          />

          <InlineCheck
            id="m5s4-annotate-evidence"
            question="Why should you annotate written evidence before adding it to your portfolio?"
            correctAnswer="Annotations explain what the document is, when you created it, which parts were your work (if it was a team effort), and which assessment criteria it covers. Without annotations, the assessor may not understand the context or relevance of the document, which reduces its value as evidence."
          />

          <SectionRule />

          {/* ── 05 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>05 · Witness testimonies that actually say something</ContentEyebrow>

          <ConceptBlock
            title="A testimony has to name a task, not deliver a verdict"
            onSite='"They did a great job" tells an assessor nothing they can check. "They independently measured and calculated cable lengths for six circuits, producing an accurate material list" tells them exactly what to give credit for.'
          >
            <p>
              A witness testimony is only as strong as the specific task it describes. It needs the
              witness's name and job title, the date, and — the part most often missing — an account
              of specific tasks you performed, not a general opinion of your character or attitude.
              "Reliable and hardworking" is a character reference. "Correctly terminated cables at
              the consumer unit, ensuring all connections were tight and labelled correctly" is
              evidence.
            </p>
            <p className="mt-3">
              Ask the witness to describe what you actually did, and ask promptly, while the work is
              still fresh in their mind — the specificity a testimony needs is far easier to give
              the same week than months later, when the details have blurred into "the usual sort of
              thing".
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Turn this witness testimony into something usable: 'I can confirm [apprentice] did a good job on the rewire and there were no issues. — J. Smith, Senior Electrician, 22 Jan 2026.'"
            steps={[
              {
                calc: 'What specific tasks were actually performed?',
                note: 'Go back to the witness and ask what, precisely, the apprentice did — not their overall impression.',
              },
              {
                calc: 'Name the property and the scope of the job',
                note: 'A three-bedroom semi-detached rewire, not just "the rewire".',
              },
              {
                calc: 'Describe the specific tasks in detail',
                note: 'Independently measured and calculated cable lengths for all circuits, produced an accurate material list, correctly terminated cables at the consumer unit ensuring tight, labelled connections, communicated clearly with the customer about timescales.',
              },
              {
                calc: 'Keep the name, job title, employer and date',
                note: 'These were already present and correct — keep them exactly as given.',
              },
              {
                calc: 'Add the criteria it covers',
                note: 'Note which units and criteria the testimony now supports, once it actually contains checkable detail.',
              },
            ]}
            answer='"I can confirm [apprentice] competently assisted with the full rewire of a three-bedroom semi-detached property. They independently measured and calculated cable lengths for all circuits, producing an accurate material list. They correctly terminated cables at the consumer unit, ensuring all connections were tight and labelled correctly. Throughout the job they communicated clearly with the customer about timescales. — J. Smith, Senior Electrician, ABC Electrical Ltd, 22 Jan 2026."'
            watchOut='"No issues" in the original sounds reassuring but tells an assessor nothing checkable — it is the witness equivalent of "tested, all fine". Always push for the specific task, however awkward it feels to ask a busy supervisor to write more than a sentence.'
          />

          <TryIt
            question="Turn this witness testimony into something usable: 'Worked well on site all week, good attitude. — R. Patel, Site Manager, 3 Mar 2026.'"
            steps={[
              {
                calc: 'What was the job, and what specifically was done?',
                note: 'Go back to the witness: which tasks, on which days, to what standard?',
              },
              {
                calc: 'Name the site and the scope of work',
                note: 'Be specific about what the week of work actually involved.',
              },
              {
                calc: 'Describe specific, checkable tasks',
                note: '"Good attitude" is not a task — replace it with what was physically done and to what standard.',
              },
              {
                calc: 'Keep name, job title and date',
                note: 'These are already present — do not lose them in the rewrite.',
              },
            ]}
            answer='Something like: "I can confirm [apprentice] carried out first-fix electrical installation across four rooms of a commercial fit-out this week, including running and clipping cable to circuit drawings and drilling containment routes to specification, checked and signed off daily. — R. Patel, Site Manager, [company], 3 Mar 2026." "Good attitude" has been replaced entirely with tasks an assessor can weigh against a criterion.'
          />

          <SectionRule />

          {/* ── 06 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>
            06 · Reflective accounts — demonstrating understanding, not narrating
          </ContentEyebrow>

          <ConceptBlock
            title="STAR gives the structure. Understanding is what fills it."
            plainEnglish="Situation, Task, Action, Result gives you the shape of the account. The difference between a weak one and a strong one is whether the Action section explains your reasoning or just lists what happened."
          >
            <p>
              A reflective account uses <strong className="text-white">Situation</strong> (the job
              and its context), <strong className="text-white">Task</strong> (what you were asked to
              do), <strong className="text-white">Action</strong> (what you did) and{' '}
              <strong className="text-white">Result</strong> (the outcome, and what you learned).
              The structure is easy to follow and most apprentices get it right. The mistake is in
              what goes inside Action: a narration of events ("I measured the rooms, then I
              calculated the cable, then I ordered the materials") shows you did something. It does
              not show you understood why you did it that way.
            </p>
            <p className="mt-3">
              An account that demonstrates understanding explains the decisions inside the actions —
              why this method, why this order, what you would have done if a reading had come back
              different, what the 10% wastage allowance was actually protecting against. That is the
              difference between an account an assessor reads as "did the task" and one they read as
              "understands the task".
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Improve this reflective account, which narrates but does not explain: 'I worked on a rewire in Leeds. I had to measure cable and order materials. I measured each room, worked out the cable lengths, added some extra for wastage, and ordered the materials. The order was correct and there was cable left over. I learned that measuring carefully is important.'"
            steps={[
              {
                calc: 'Situation — keep, but add real detail',
                note: 'A domestic rewire at a terraced house in Leeds, where the material order had to be right first time because of a tight delivery schedule.',
              },
              {
                calc: 'Task — state the actual requirement, not a vague version',
                note: 'Produce a material list with quantities and costs, applying the wastage allowance the company uses as policy.',
              },
              {
                calc: 'Action — replace narration with reasoning',
                note: 'Not just "measured each room" — explain the method: tape measure, recorded in a notebook, cable runs calculated including drops and rises, not just floor distance, because a straight-line measurement understates the actual cable needed.',
              },
              {
                calc: 'Action — explain the wastage decision specifically',
                note: 'A 10% allowance was applied as company policy, to cover offcuts and minor routing changes, rather than guessed at.',
              },
              {
                calc: 'Result — say what the outcome shows, not just that it worked',
                note: 'Only 3 metres of twin and earth left over shows the calculation and the allowance were both accurate, not just lucky.',
              },
              {
                calc: 'Learning — replace the generic line',
                note: '"Measuring carefully is important" is filler. Replace it with what you would specifically do differently or confirm next time, and why.',
              },
            ]}
            answer="A version where Action explains the reasoning behind the method and the wastage figure, and the learning line states something specific — for example, that measuring drops and rises rather than floor distance alone is what kept the order accurate, and that a 10% allowance proved close to right for this type of job. The events are the same; what changed is that the account now shows understanding, not just activity."
            watchOut="A reflective account that only narrates reads as though you followed a checklist without knowing why. An assessor cannot give credit for understanding they cannot see — put the reasoning on the page, or it does not count as demonstrated."
          />

          <TryIt
            question="Improve this reflective account: 'I did a consumer unit change. I isolated the supply, took the old one out, put the new one in, connected everything back up, and tested it. It all worked and the customer was happy.'"
            steps={[
              {
                calc: 'Situation — add real context',
                note: 'What kind of property, why the change was needed (age, capacity, missing RCD protection — whatever the actual reason was).',
              },
              {
                calc: 'Task — state what was specifically required',
                note: 'Not just "change the consumer unit" — what standard it had to meet, what had to be checked before starting.',
              },
              {
                calc: 'Action — replace the list of steps with the reasoning',
                note: 'Why isolate in that order, what was checked before starting work, why particular decisions were made (e.g. circuit identification method, or how a doubtful circuit was investigated before reconnecting it).',
              },
              {
                calc: 'Result — say what the test results and the outcome actually show',
                note: 'Not just "it worked" — what the readings confirmed, and why that matters.',
              },
              {
                calc: 'Learning — replace a generic line with something specific',
                note: 'What you would check earlier next time, or what this job taught you about a particular risk.',
              },
            ]}
            answer="A version where Action explains why circuits were identified and reconnected in a particular order, what was checked before re-energising, and what a doubtful reading (if any) led you to investigate further — with Result stating what the test figures actually confirmed rather than just 'it worked'. Replacing the narration with the reasoning is the whole exercise."
          />

          <InlineCheck
            id="m5s4-star-action"
            question="In the STAR structure for reflective accounts, what does the 'A' stand for and why is it the most important section?"
            correctAnswer="The 'A' stands for Action — describing what you actually did, including the specific skills, tools, techniques, calculations, and decisions you used. It is the most important section because it directly demonstrates your competence. It shows the assessor not just that you were present, but that you actively performed the work and understood what you were doing."
          />

          <SectionRule />

          {/* ── 07 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>07 · Spotting evidence that is not authentic</ContentEyebrow>

          <ConceptBlock
            title="Authenticity fails on the details that do not add up"
            onSite="You cannot always tell authenticity from the surface — the document can look perfectly professional. What gives it away is a detail that does not fit: a date you were not on site, wording identical to someone else's account, or a task described that is well beyond what you were actually doing at that stage."
          >
            <p>
              Evidence fails on authenticity when it is not genuinely your own work, or when you
              could not actually explain it if asked. The signs are usually inconsistencies rather
              than an obvious fabrication: a date that does not match the site diary, a task
              description well beyond your role or stage of training at the time, or wording that
              reads identically to another apprentice's submitted account. None of these prove
              fabrication on their own, but each is a reason to check before relying on the
              evidence.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="Four pieces of evidence are submitted for the same criterion. Identify which one is not authentic, and why: (a) a photo you took, timestamped and matching the date on the job sheet for that site visit; (b) a witness testimony signed by your supervisor, describing a task that matches the day sheet for that date; (c) a reflective account describing in first-person detail a job on a date the site diary shows you were not on site that week; (d) a schedule of test results matching the calibration log of the instrument you were issued that day."
            steps={[
              {
                calc: '(a) — check against the job sheet',
                note: 'Timestamp and job sheet date agree. Consistent.',
              },
              {
                calc: '(b) — check against the day sheet',
                note: 'Task and date agree with an independent record. Consistent.',
              },
              {
                calc: '(c) — check against the site diary',
                note: 'The account describes being on site on a date the site diary shows you were not there. This is a direct contradiction, not a minor discrepancy.',
              },
              {
                calc: '(d) — check against the calibration log',
                note: 'Instrument and date agree with an independent record. Consistent.',
              },
            ]}
            answer="(c) is not authentic. A first-person account of a day you were not present, contradicted by an independent record (the site diary), cannot be genuine first-hand evidence — whether it was written from a mistaken memory or copied from someone else, it fails the test either way and must be removed or replaced."
            watchOut="The other three pass because each one is checkable against an independent record — a job sheet, a day sheet, a calibration log. That is what authenticity actually rests on: not how convincing the writing sounds, but whether it is consistent with something outside the document itself."
          />

          <TryIt
            question="Four pieces of evidence are submitted for the same criterion. Identify which one is not authentic, and why: (a) a reflective account of a fault-finding job, with technical detail that matches the level you had reached by that point in training; (b) a witness testimony with wording identical, sentence for sentence, to one submitted by another apprentice in the same cohort; (c) a photo captioned with the correct date, location and your role, matching the job sheet; (d) a test schedule with readings that match the property's known supply characteristics."
            steps={[
              {
                calc: '(a) — check against your training stage',
                note: 'Detail matches what you would plausibly know at that point. Consistent.',
              },
              {
                calc: '(b) — check for independence',
                note: 'Two supposedly separate testimonies, from different sites or supervisors, reading identically word for word. That is not a coincidence — it points to a template being copied rather than a genuine independent account.',
              },
              { calc: '(c) — check against the job sheet', note: 'Consistent.' },
              { calc: '(d) — check against known supply characteristics', note: 'Consistent.' },
            ]}
            answer="(b) is not authentic. A witness testimony that reads identically to another apprentice's, word for word, is evidence of a shared template being copied rather than two independent accounts of two different pieces of work — however genuine the underlying work might be, the document itself cannot be relied on as an independent record."
          />

          <SectionRule />

          {/* ── 08 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>08 · Spotting evidence that is no longer current</ContentEyebrow>

          <ConceptBlock
            title="Evidence goes stale even when nothing about it was ever wrong"
            plainEnglish="Old evidence does not become false — it stops being proof of your CURRENT level of competence, which is usually what the criterion is actually asking about."
          >
            <p>
              Evidence that was perfectly good when it was created can still fail the Current test
              later, simply because time has passed and the criterion is asking about your present
              level of skill. This is not a fault in the original evidence — the job was real, the
              testimony was genuine — it is a mismatch between what the evidence shows and what is
              now being asked.
            </p>
            <p className="mt-3">
              When you find evidence that has gone stale, the options are: keep it as a historical
              record if it is still useful context, but pair it with something more recent that
              demonstrates the same skill at your present stage; or, if nothing recent exists yet,
              treat it as a gap to fill rather than evidence to rely on. What you should not do is
              leave it standing alone as though it still answers the question being asked. How much
              history a provider is willing to accept alongside recent evidence varies — check with
              yours rather than assuming.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="You are near the end of your training. The only evidence you have for a criterion on independent fault diagnosis is a witness testimony from your first few months, describing a fault you found while working closely alongside a qualified electrician who directed most of the diagnostic steps. What do you do?"
            steps={[
              {
                calc: 'Check what the criterion is actually asking',
                note: 'Independent fault diagnosis at your current stage — not diagnosis carried out mostly under direction, months into training.',
              },
              {
                calc: 'Does the existing evidence meet that?',
                note: 'No — it shows an early stage of development with significant direction from a qualified electrician, not independent diagnosis now.',
              },
              {
                calc: 'Is the old evidence worthless?',
                note: 'No — it can still show progression, if the portfolio is tracking how your skill developed. It just cannot stand as the sole evidence for present-day independent competence.',
              },
              {
                calc: 'What is needed',
                note: 'A recent job where you diagnosed a fault with minimal direction, captured properly — photos, a witness note or your own account, on the day.',
              },
              {
                calc: 'Decide the fix',
                note: 'Keep the old testimony if your provider is happy to see it as evidence of progression, but treat finding recent independent-diagnosis evidence as the priority, not a nice-to-have.',
              },
            ]}
            answer="The old testimony does not currently satisfy the criterion — it shows an early stage of development, not present independent competence. Keep it if it helps show progression, but the immediate task is to capture a recent job where you diagnosed a fault independently, properly recorded on the day, and use that as the primary evidence."
            watchOut="It is tempting to leave old evidence in place because it exists and the criterion has a tick next to it. An assessor checking the date will see straight through it — a criterion marked 'covered' by evidence that does not actually meet what is being asked is worse than an honest gap, because it looks like an oversight rather than a work in progress."
          />

          <TryIt
            question="A criterion on customer communication is currently evidenced only by a photo caption from over a year ago, noting 'discussed timescales with customer' with no further detail, from a period when you mostly observed rather than led client conversations. What do you do?"
            steps={[
              {
                calc: 'What is the criterion actually asking?',
                note: 'Your ability to communicate professionally with a customer, at your present stage — not a one-line note from a period of mostly observing.',
              },
              {
                calc: 'Does the existing evidence meet that?',
                note: 'No — thin detail, and from a stage where you were not yet leading these conversations yourself.',
              },
              {
                calc: 'What would satisfy it now?',
                note: 'A recent, properly captured example — an email you wrote, or a witness account of a conversation you led, from your current stage of training.',
              },
              {
                calc: 'Decide the fix',
                note: 'Treat the old caption as insufficient on its own and prioritise capturing a current example, rather than leaving the criterion looking covered when it is not.',
              },
            ]}
            answer="The existing note does not satisfy the criterion at your present stage. Replace or supplement it with a recent, specific example of you leading a customer conversation — an email you sent, or a witness note describing it — captured properly rather than relying on a thin, dated caption."
          />

          <SectionRule />

          <Scenario
            title="The assessor visit that goes well because nothing had to be explained away"
            situation="An assessor arrives to review your portfolio ahead of a progress check. They pick an item at random — a witness testimony from four months ago — and ask you to talk them through it: what the job was, what you did, and why you made the decisions you made."
            whatToDo="Locate it quickly using your cross-referencing matrix, and talk through the Situation, Task, Action and Result exactly as you would in a reflective account — including the reasoning behind the decisions, not just what happened. If the item is old, say so plainly and point to the more recent evidence that supersedes it."
            whyItMatters="An assessor is not trying to catch you out — they are confirming that what the portfolio claims actually happened and that you understand it. A portfolio built on the habits in this section — captured on the day, annotated properly, cross-referenced honestly, checked against VACSR before it went in — makes that conversation straightforward, because there is nothing in it you cannot account for."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'VACSR — Valid, Authentic, Current, Sufficient, Reliable — applies to every piece of evidence, all five, not four out of five.',
              'A photo, certificate or note with no context is close to worthless. Add the date, location, what it shows, and what you personally did.',
              'Capture evidence on the day, before you leave site — some of it (a cable run before boarding, a fresh memory for a witness) cannot be recovered later.',
              'Cross-referencing is legitimate when each claimed criterion has specific, checkable detail behind it. Claiming several criteria off one vague item is stretching, not cross-referencing.',
              'A witness testimony needs a specific task, not a verdict — "did a good job" is not evidence; a described task with a name, job title and date is.',
              'A reflective account that only narrates events shows less than one that explains the reasoning behind the decisions made.',
              'Evidence can fail on authenticity (you cannot explain it, or an independent record contradicts it) or on currency (it shows a level of skill from the past, not now) even when it was never dishonest.',
              'The exact evidence volume and portfolio structure a provider expects varies — confirm both with your own provider rather than assuming a fixed rule.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'How many pieces of evidence does each criterion actually need?',
                answer:
                  'This varies between awarding bodies and providers, and there is no single fixed number that applies to every apprenticeship. Ask your own provider what they expect, and use the Sufficient test in VACSR as your working principle: enough evidence, between everything submitted, that no criterion is left with nothing behind it.',
              },
              {
                question: 'Can I use the same piece of evidence for more than one criterion?',
                answer:
                  'Yes, where it genuinely demonstrates each one in checkable detail — that is legitimate cross-referencing. It stops being legitimate the moment you are stretching one vague item to cover criteria it does not actually show any detail for.',
              },
              {
                question: 'What if a witness will not write more than a sentence?',
                answer:
                  'Ask them directly what tasks you specifically carried out, and offer to draft it for their review rather than leaving it to them to write from scratch. Most people find it easier to correct a draft than compose one, and a specific draft they sign off is stronger evidence than a vague sentence they wrote unprompted.',
              },
              {
                question: 'Is old evidence ever worth keeping in the portfolio?',
                answer:
                  'Yes, if your provider is happy to see it as a record of progression over time. What it should not do is stand alone as the only evidence for a criterion that is asking about your present level of competence — pair it with something recent, or treat the gap as one to fill.',
              },
              {
                question:
                  'What should I do if I genuinely cannot remember the details of a piece of evidence?',
                answer:
                  'Say so, honestly, if an assessor asks. Do not improvise a plausible-sounding answer — an assessor is far more concerned by evidence you cannot account for at all than by an honest "I would need to check my notes on the exact reading".',
              },
            ]}
          />

          <SectionRule />

          <Quiz questions={quizQuestions} title="Section 4: Portfolio Building and Evidence Quiz" />

          {/* ── prev / next ─────────────────────────────────────────── */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module5/section3')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-sm font-medium text-white touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" />
              Section 3
            </button>
            <button
              type="button"
              onClick={() => navigate('/study-centre/apprentice/functional-skills/module5')}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-elec-yellow/35 bg-elec-yellow/[0.08] px-4 text-sm font-semibold text-white touch-manipulation"
            >
              Module 5
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </StudyPage>
      </HubBody>
    </HubPage>
  );
};

export default FunctionalSkillsModule5Section4;
