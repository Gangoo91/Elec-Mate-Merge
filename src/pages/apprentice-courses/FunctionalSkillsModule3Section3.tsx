/**
 * Functional Skills · Module 3 · Section 3 — Digital documentation and apps
 *
 * CONVERTED (13 Sep) from the 2024 dialect to the StudyPage reading kit.
 *
 * This was the worst named-product page in the course: roughly 46 named
 * third-party products, a good number written up as outright recommendations
 * ("the industry standard", "the market leader", "a significant advantage").
 * That is a serious problem in a course that lives inside a commercial app
 * which itself does certification and circuit design — an apprentice reading
 * this page is, among other things, a customer being told which competitors
 * to go and use. Two named certification apps had already been removed from
 * this file before this pass. This pass finishes the job:
 *
 *  - Every named electrical design package (the old page named four, plus
 *    two CAD tools and two diagramming tools) has been removed and the whole
 *    "Electrical Design Software" section rebuilt around what design
 *    software produces and what an installer needs to check against it —
 *    the useful skill, and one that does not require naming a competitor.
 *  - General-purpose tools that do not compete with certification or design
 *    software (PDF readers, photo/watermark apps, signature services,
 *    project management apps, BIM viewers) are kept as categories, described
 *    by what they do and what to look for when choosing one. No brand names
 *    remain anywhere on the page.
 *  - Named YouTube channels and named trade publications are gone, replaced
 *    with what actually makes a source worth trusting.
 *  - The IET is kept, factually: it publishes BS 7671. Competent person
 *    schemes are referred to generically, never named.
 *
 * Other defects fixed in this pass:
 *  - BIM Levels 0–3 were taught as the live framework. The UK BIM Framework
 *    has moved to the ISO 19650 series; the levels language is retired
 *    (though still heard on site, so kept as background, not deleted). ISO
 *    19650 is now clearly given as the current answer.
 *  - "Qualified Electronic Signatures are equivalent to handwritten
 *    signatures in all legal contexts" overclaimed — a deed is the standing
 *    example of a document with extra execution formality a QES alone does
 *    not satisfy. Softened to what can be defended.
 *  - eIDAS was stated three times at three different levels of precision.
 *    Now one consistent form throughout: "the UK's retained version of the
 *    EU eIDAS regulation."
 *  - Unverifiable company-history claims ("now part of…", "formerly…") went
 *    with the product names they were attached to.
 *  - Quiz question 8 asked learners to name two competing design packages as
 *    "the" industry answer — directly conflicts with the rule above, so it
 *    is the one question rewritten rather than kept verbatim (see report).
 *    Question 6's stem named two PM products in passing; wording only was
 *    changed to "a project management app" — options and answer untouched.
 *
 * TEACHING DENSITY pass (second edit): the first draft ran 16 ConceptBlocks
 * against 3 WorkedExample and 2 TryIt — mostly telling, not teaching. Cut to
 * 8 ConceptBlocks (one per section) and rebuilt around 10 WorkedExample / 8
 * TryIt, each a repeatable process with real steps: choosing a certification
 * app against a four-question test, retaking a photograph that fails as
 * evidence, working out which service moves in a BIM clash, checking a
 * design schedule's assumptions against the real site, verifying a claim
 * against a primary source before it changes practice.
 *
 * Deliberately NOT using <RegsCallout> — it renders its `clause` prop as
 * quoted regulation text, and this page does not quote BS 7671 at all.
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
  ContentEyebrow,
  SectionRule,
  WorkedExample,
  TryIt,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Digital Documentation & Apps - Functional Skills Module 3.3';
const DESCRIPTION =
  'Functional Skills digital literacy for electricians: certification software, PDF annotation, site photography as evidence, electronic signatures, project management apps, BIM and ISO 19650, and reading the output of electrical design software.';

const quizQuestions = [
  {
    id: 1,
    question:
      'What distinguishes a purpose-built electrical certification app from writing a certificate in a word processor?',
    options: [
      'It prints in colour rather than black and white',
      'It enforces the BS 7671 model forms, carries the schedules of results, and stores the issued certificate against the installation',
      'It is always free to use',
      'It removes the need for the installation to be inspected and tested',
    ],
    correctAnswer: 1,
    explanation:
      'A certification app is built around the BS 7671 model forms. It holds the schedule of circuit details and the schedule of test results alongside the certificate, applies the right form for the work carried out, and keeps the issued document against the installation so it can be reissued or referred back to. A word processor gives you a blank page and leaves every omission to you. Nothing in either case removes the duty to inspect and test — the software formats the record, it does not do the job.',
  },
  {
    id: 2,
    question:
      'When annotating a PDF of a wiring diagram on site, which tool would you most commonly use?',
    options: [
      'The crop tool to remove the parts of the diagram you do not need',
      'The signature field to formally approve the drawing',
      'A highlighter and text comment tool to mark areas needing attention',
      'The page-rotate tool to view the diagram in landscape',
    ],
    correctAnswer: 2,
    explanation:
      'Highlighter and text comment tools are the most practical for annotating wiring diagrams and electrical drawings. You can highlight areas of concern, add text notes about observations or required changes, and draw attention to specific circuits — without altering the drawing itself. These annotations can be shared with colleagues and clients as part of your documentation.',
  },
  {
    id: 3,
    question:
      'What metadata should you ensure is enabled on site photographs taken for compliance documentation?',
    options: [
      'Image resolution lowered to keep the file size small',
      'The camera make and lens model only',
      'A colour filter applied to enhance the image',
      'Date, time, and GPS location stamps',
    ],
    correctAnswer: 3,
    explanation:
      'Date, time, and GPS location metadata embedded in photographs provides verifiable evidence of when and where the photo was taken. This is crucial for compliance documentation — it proves you were on site at the recorded time and that the photograph accurately represents the installation at that specific point in the project.',
  },
  {
    id: 4,
    question:
      'What is the primary purpose of Building Information Modelling (BIM) in electrical work?',
    options: [
      "A 3D digital model of a building's physical and functional characteristics, including its electrical systems",
      'A scheduling method that sets the order in which the trades carry out their work on a project',
      'A cloud storage system used purely for emailing finished certificates and drawings to clients',
      'A cost-estimating package that produces priced quotations directly from a material takeoff list',
    ],
    correctAnswer: 0,
    explanation:
      'BIM creates a detailed 3D digital model of a building that includes all systems — structural, mechanical, electrical, and plumbing. For electricians, BIM allows you to see exactly where cables, containment, distribution boards, and outlets are positioned relative to other building elements, reducing clashes and rework on site.',
  },
  {
    id: 5,
    question: 'Which feature makes digital signatures legally recognised in the UK?',
    options: [
      'They are printed and then physically posted to the recipient',
      'They comply with the Electronic Communications Act 2000 and the UK’s retained eIDAS regulation',
      'They are witnessed and stamped by a qualified solicitor',
      'They are saved as a locked PDF that cannot be edited',
    ],
    correctAnswer: 1,
    explanation:
      'Electronic signatures are recognised in the UK under the Electronic Communications Act 2000 and the UK’s retained version of the EU eIDAS regulation. The highest tier, the Qualified Electronic Signature, is given the same legal weight as a handwritten one for most purposes — though a small category of documents, deeds among them, carry extra formality requirements a QES alone does not satisfy. A signing platform with a proper audit trail records who signed, when, and from where, which a handwritten signature on paper does not.',
  },
  {
    id: 6,
    question:
      'What is the main advantage of using a project management app for electrical projects?',
    options: [
      'It automatically sizes the cables and protective devices for each circuit',
      'It generates BS 7671 certificates from the completed test results',
      'It provides visibility of task progress, deadlines, and team responsibilities in one place',
      'It calculates the VAT and profit margin to add to a job quotation',
    ],
    correctAnswer: 2,
    explanation:
      'Project management apps centralise all project information — tasks, deadlines, assigned team members, progress status, and file attachments — in a single accessible location. This visibility prevents tasks from being forgotten, enables better coordination between team members, and provides clients with progress updates. It does none of the calculation or certification work — that stays with purpose-built tools.',
  },
  {
    id: 7,
    question:
      'When taking site photographs for documentation, what framing technique ensures the photo is useful?',
    options: [
      'Photograph only the finished work, never the existing condition beforehand',
      'Use a heavy zoom and shoot from across the room to capture everything at once',
      'Take a single overall photo of the whole room and rely on memory for the detail',
      'Take a wide establishing shot first, then close-up detail shots with identifiable reference points',
    ],
    correctAnswer: 3,
    explanation:
      'Professional documentation photography follows a systematic approach: start with a wide establishing shot that shows the location context (which room, where on the wall), then take progressively closer shots showing specific details. Include reference points (cable labels, circuit numbers, adjacent fittings) so the photograph can be understood without additional context.',
  },
  {
    id: 8,
    question:
      'You are handed a cable schedule produced by electrical design software you have never used yourself. What should you check before you start pulling cable to it?',
    options: [
      'Nothing — a schedule produced by design software is correct by definition',
      'That the schedule matches the real site conditions, and that the cable and containment specified are what has actually been delivered',
      'The subscription price of the software that produced it',
      'Whether the software has a mobile app version',
    ],
    correctAnswer: 1,
    explanation:
      'Design software is only as good as what was fed into it. Actual routes, containment fill, ambient temperature and grouping on site do not always match what was assumed at the design stage, and the schedule has no way of knowing that until someone checks. Treat a design output as a starting point to verify against the real installation, never as a certainty to install blind.',
  },
];

const FunctionalSkillsModule3Section3 = () => {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <HubPage ground="reading">
      <HubMasthead
        section="Module 3 · Section 3"
        title="Digital documentation and apps"
        backTo="/study-centre/apprentice/functional-skills/module3"
      />
      <ReadingProgress />
      <HubBody pushContext="Get notified about your course progress, quiz streaks and new study content">
        {/* Wider than the 64rem default, to match the rest of the course — this
            page carries worked steps and short lists that read badly wrapped. */}
        <StudyPage measure="74rem" wide="94rem">
          <p className="text-[13px] leading-relaxed text-white">
            A phone or a tablet is now as much a piece of site kit as a set of screwdrivers. The
            paperwork side of the job — the certificate, the annotated drawing, the photo proving
            what was under the floor before it got covered, the signed authorisation to proceed —
            increasingly happens on a screen. That does not change what the job requires. It changes
            how you record that you did it, and doing that properly is a skill you build the same
            way as any other: by working through it, not by reading about it.
          </p>

          <LearningOutcomes
            outcomes={[
              'Test whether a certification app is fit for purpose, using a four-question checklist.',
              'Annotate a PDF drawing or evidence photo, and know what the annotation does and does not change.',
              'Take a sequence of site photographs that stands up as evidence, and fix one that does not.',
              'Choose the right tier of electronic signature for a document, and answer a client who questions its validity.',
              'Match a project management tool to the actual size of a coordination problem.',
              'Work through a BIM clash report and decide which service should move.',
              'Check a cable schedule or discrimination study against real site conditions before installing to it.',
              'Verify a claim from a trade video or website against a primary source before it changes your practice.',
            ]}
          />

          <Prerequisites
            items={[
              {
                term: 'Section 1',
                gist: 'File naming conventions are assumed here and reused without re-explaining them.',
              },
              {
                term: 'Section 2',
                gist: 'Spreadsheets. Not required to follow this section, but the two sit either side of the same theme — using a digital tool properly, not just having it installed.',
              },
            ]}
          />

          <TLDR
            points={[
              'A certification app is judged on four things: right form, real validation, controlled multi-user issuing, fast retrieval. Everything else is secondary.',
              'PDF annotation adds a layer on top of a document without changing it — treat an annotation as a comment, never as a revision.',
              'A photograph is evidence, not a memory aid. Wide, then medium, then close-up, with metadata on, before and during as well as after.',
              'UK electronic signatures have three tiers. Even the top tier does not remove extra formality from the small category of documents that need it — a deed, for instance.',
              'A project management app coordinates people. It does not size a cable, issue a certificate or calculate VAT.',
              'BIM carries data as well as geometry. "Levels 0–3" is retired language — the current framework is the ISO 19650 series.',
              'Design software automates calculation from stated assumptions. Check the assumptions — length, grouping, the actual devices delivered — against the real site.',
              'Judge any source the same way every time: does it cite the actual clause, and does it match BS 7671 or your scheme’s own guidance when you check?',
            ]}
          />

          <SectionRule />

          {/* ── 01 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>01 · Certification software</ContentEyebrow>

          <ConceptBlock
            title="What a certification app is for, and where it comes from"
            onSite="The test is not whether the software looks smart. It is whether you can pull up a certificate you issued two years ago in under a minute when a client rings up asking for a copy."
          >
            <p>
              A certification app is built around the BS 7671 model forms. It holds the schedule of
              circuit details and the schedule of test results alongside the certificate, applies
              the correct form for the work you actually did, carries details forward between
              documents, and keeps the issued certificate filed against the installation. A word
              processor gives you a blank page and leaves every omission — a missing schedule entry,
              the wrong form, a certificate nobody can find two years later — entirely down to you.
            </p>
            <p>
              Most government-authorised competent person schemes give registered members a
              browser-based certification portal as part of the membership. A number of independent
              certification apps also exist, running on phone, tablet and desktop without being tied
              to one scheme. What actually separates a good one from a weak one is the same,
              whichever route you use, which is the test below.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="You are choosing between three certification apps for your firm, all claiming BS 7671 compliance. What four questions actually separate them?"
            steps={[
              {
                calc: '1. Does it produce the RIGHT form?',
                note: 'EIC, EICR, Minor Works — the correct one applied automatically for the work type, not left for you to pick and hope.',
              },
              {
                calc: '2. Does it VALIDATE, or just accept?',
                note: 'A missing Zs reading or an out-of-range insulation resistance result should be flagged before you can issue, not discovered by whoever reads it next.',
              },
              {
                calc: '3. Can more than one person issue, under control?',
                note: 'If the firm grows past one electrician, someone needs to see what has been issued, and by whom.',
              },
              {
                calc: '4. Can you retrieve an old certificate fast?',
                note: 'A client rings two years later asking for a copy. How many taps does that take?',
              },
            ]}
            answer="Right form, real validation, controlled multi-user issuing, fast retrieval. Colour schemes and onboarding tutorials are secondary to those four."
            watchOut="Do not judge an app on a five-minute demo. Judge it on question four: ask to see it retrieve a certificate issued a year ago, live, before you commit your firm to it."
          />

          <WorkedExample
            question="A client rings asking for the EICR you issued on their rental property two years ago, before your next viewing this afternoon. Walk through retrieving it."
            steps={[
              {
                calc: '1. Search by address or client name',
                note: 'In a fit-for-purpose app this is the whole task.',
              },
              {
                calc: '2. Confirm the schedule of results is still attached',
                note: 'Not just the certificate PDF — the schedule is what a landlord or agent actually needs to see, and what a re-let often requires.',
              },
              {
                calc: '3. Re-export or re-share it',
                note: 'Straight to the client from within the app, not printed and posted.',
              },
            ]}
            answer="Found, confirmed complete, and sent — inside a few minutes, without leaving the desk."
            watchOut="If step 1 alone takes more than a minute, that is not a one-off inconvenience — it is the app failing question four of the test above, on a real job, with a client waiting."
          />

          <TryIt
            question="A colleague's certification app produces a document that is just a PDF with tick boxes marked 'satisfactory' against each distribution board — no schedule of test results attached anywhere. Run it through the four-question test. Which question does it fail, and what should the colleague do about certificates already issued this way?"
            steps={[
              { calc: 'Q1 — right form?', note: 'Possibly, if the layout matches the model form.' },
              {
                calc: 'Q2 — validates?',
                note: "A tick-box for 'satisfactory' with no recorded reading is not validation — it is an assertion with nothing behind it.",
              },
              {
                calc: 'Q3 / Q4 — multi-user, retrieval?',
                note: 'Cannot be judged from this alone, but a tool this thin on Q2 rarely does better on the others.',
              },
            ]}
            answer="It fails question 2 outright: a certificate with no schedule of results is a certificate with no evidence behind it. The colleague should stop using it immediately and, for certificates already issued, retrieve the actual test data from their own notes or instrument records and produce a proper schedule to sit behind each one — before a client or an inspector asks for it first."
          />

          <SectionRule />

          {/* ── 02 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>02 · PDF annotation tools</ContentEyebrow>

          <ConceptBlock
            title="A layer on top of the document, not a change to it"
            plainEnglish="Annotation adds comments, highlights and marks on a layer above the PDF. The recipient sees your notes and can respond to them, but the underlying drawing or datasheet is untouched underneath."
          >
            <p>
              PDF documents are everywhere in electrical work — regulation extracts, datasheets,
              floor plans, as-built drawings. Marking them up digitally replaces printing, writing
              on and re-scanning a paper copy, and does something paper cannot: the original stays
              intact underneath your notes, so the same drawing can be annotated, cleared and
              annotated again by someone else without ever losing the base document.
            </p>
            <p>
              A free tool covers most day-to-day marking up — highlighting, comments, sticky notes,
              basic drawing. Paying for more buys construction-specific features (scaled
              measurement, symbol stamps, cloud collaboration across a design team) that earn their
              keep on larger commercial projects. On a tablet on site, a smooth touch interface
              matters more than any feature list — a tool that is awkward one-handed on a ladder
              will not get used.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="You find a damaged socket outlet during an EICR and need to annotate a photograph of it before it goes into the report. Walk through the process."
            steps={[
              {
                calc: '1. Open the photo in a PDF or image annotation tool',
                note: 'The photograph itself stays unaltered underneath your marks.',
              },
              {
                calc: '2. Circle or highlight the exact defect',
                note: 'Not the whole socket, the specific damage — cracked faceplate, scorching, loose terminal.',
              },
              {
                calc: '3. Add a text comment with the observation and condition code',
                note: 'e.g. "Cracked faceplate exposing live terminals — C1".',
              },
              {
                calc: '4. Export as a flattened copy for the report, keep the original',
                note: 'The client sees a clear, marked-up image; you still hold the unmarked original if it is ever questioned.',
              },
            ]}
            answer="A clearly marked photograph with the defect circled and coded, attached to the EICR — and an untouched original held back in case the annotation is ever disputed."
          />

          <TryIt
            question="You receive a floor plan as a PDF and need to mark the proposed positions of socket outlets and light fittings for a client to approve. What is the most efficient approach, and why does it beat printing the plan and marking it by hand?"
            steps={[
              {
                calc: '1. Open the PDF in an annotation tool',
                note: 'The base drawing stays untouched underneath whatever you add.',
              },
              {
                calc: '2. Place symbols and text comments at each position',
                note: 'Precise, resizable and repositionable — unlike a pen mark.',
              },
              {
                calc: '3. Share the annotated file electronically',
                note: 'No print, scan or post; the client sees exactly what you saw.',
              },
            ]}
            answer="Annotate the digital drawing directly. It is faster, holds its quality (a photograph of a printed, hand-marked plan degrades and can be hard to read), and creates a proper record of what was proposed and when."
          />

          <SectionRule />

          <InlineCheck
            id="m3s3-pdf-annotation"
            question="You receive a floor plan as a PDF and need to mark the proposed positions of socket outlets and light fittings. What is the most efficient approach?"
            options={[
              'Print the PDF, draw on it with a pen, then scan it back into your computer',
              'Use a PDF annotation tool to add symbols and text comments directly on the digital document',
              'Describe all positions in a separate document',
              'Take a photograph of the printed plan with your markings',
            ]}
            correctIndex={1}
            explanation="Using a PDF annotation tool lets you mark positions directly on the digital drawing with precision. Symbols can be resized, repositioned and labelled clearly. The annotated file can be shared electronically, maintains quality, and creates a professional document suitable for client approval and site reference."
          />

          <SectionRule />

          {/* ── 03 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>03 · Photo evidence and documentation</ContentEyebrow>

          <ConceptBlock
            title="A photograph is evidence, not a memory aid"
            onSite="The photo you did not take costs you the argument you could have won with it. Storage is essentially free — a photo you did not need costs nothing."
          >
            <p>
              A well-taken photograph provides unambiguous evidence of the condition of an
              installation, your workmanship, and compliance. Photograph before starting work (the
              existing condition, protecting you against a claim you caused pre-existing damage),
              during first fix (cable routes before they are concealed — once covered, only the
              photograph proves they were correctly installed), on completion (the consumer unit
              cover on and off, key accessories), and every defect on an EICR.
            </p>
            <p>
              A smartphone embeds date, time and GPS coordinates automatically, provided location
              services are on — that embedded data is what turns a photo into evidence rather than
              an illustration. A category of dedicated apps also overlays date, time and location as
              a visible watermark on the image itself, worth using where a client or third party
              might otherwise question when a photograph was actually taken.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="You are documenting a distribution board replacement from start to finish. What is the minimum useful set of photographs, and in what order?"
            steps={[
              {
                calc: '1. Wide shot, before work',
                note: 'The room, the wall, the existing board in context — establishes where everything else happened.',
              },
              {
                calc: '2. Medium shot, before work',
                note: 'The board itself, cover on and off, showing its condition and any pre-existing damage.',
              },
              {
                calc: '3. Close-up, during first fix',
                note: 'Cable entries, gland arrangements, earthing — anything hidden once the enclosure closes up.',
              },
              {
                calc: '4. Medium and close-up, on completion',
                note: 'Finished board, cover on and off, labels legible, circuits identifiable.',
              },
            ]}
            answer="Five to six photographs minimum, wide to close, before and after — enough that someone who was never on site could follow what happened without you there to narrate it."
            watchOut="A single overall photo of the finished job proves the least of anything you could take. The before-and-during shots carry the actual evidential weight, and they are the ones people forget because the pressure is on to finish the job, not document it."
          />

          <WorkedExample
            question="A dispute arises over a scorched socket back box. The only photo on file is a single close-up of the damage, framed tight, with no wider shot. There is no way to tell which room, which property, or which circuit it belonged to. What does the photo fail to prove, and how should it have been taken?"
            steps={[
              {
                calc: '1. Missing: a wide shot',
                note: 'No way to confirm the room or wall — the photo could be from any job.',
              },
              {
                calc: '2. Missing: a visible reference point',
                note: 'No circuit label, no adjacent fitting — nothing ties the damage to a specific circuit.',
              },
              {
                calc: '3. Unconfirmed: metadata',
                note: 'Even if GPS and timestamp were captured by the phone, nobody checked they were switched on before relying on this photo alone.',
              },
            ]}
            answer="The photograph proves that scorching exists somewhere, and nothing else. It should have been a sequence — wide (room and wall), medium (the board or accessory in context), close-up (the damage) — with at least one frame showing a circuit label or other identifiable reference, and location services confirmed on beforehand."
          />

          <TryIt
            question="You are asked to provide photographic evidence for a C2 observation on a ring final circuit socket during an EICR. Working from the sequence above, what shots do you take and in what order?"
            steps={[
              { calc: '1. Wide', note: 'Which room, which wall.' },
              {
                calc: '2. Medium',
                note: 'The socket in its surroundings — skirting, adjacent fittings.',
              },
              { calc: '3. Close-up', note: 'The specific defect, sharply focused, well lit.' },
              {
                calc: '4. Reference point',
                note: 'A visible circuit label or the DB chart, if one is accessible, tying this socket to a specific circuit.',
              },
            ]}
            answer="Wide, medium, close-up, plus one frame including a circuit reference — the same four-shot habit as the distribution board example, applied to a single accessory instead of a whole board."
          />

          <SectionRule />

          {/* ── 04 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>04 · Digital signature tools</ContentEyebrow>

          <ConceptBlock
            title="Three tiers, and what each one is actually good for"
            plainEnglish="A typed name in an email, a signature tied to your verified identity, and a signature backed by a certified digital identity are three different strengths of promise. Match the tier to what is being signed."
          >
            <p>
              Digital signatures are legally recognised in the UK under the Electronic
              Communications Act 2000 and the UK&rsquo;s retained version of the EU eIDAS
              regulation, which sets out three tiers: a{' '}
              <strong className="text-white">Simple Electronic Signature</strong> (typing your name
              in an email, or ticking a box) carries very little on its own; an{' '}
              <strong className="text-white">Advanced Electronic Signature</strong> is uniquely
              linked to the signatory with identity verification behind it; a{' '}
              <strong className="text-white">Qualified Electronic Signature</strong>, the highest
              tier, is issued against a certified digital identity and given the same legal weight
              as a handwritten signature for most purposes.
            </p>
            <p>
              &ldquo;Most purposes&rdquo; is doing real work in that sentence. A handful of document
              types — a deed is the standing example — carry extra formality requirements (such as
              being witnessed) that a Qualified Electronic Signature alone does not satisfy. For the
              documents an electrician signs day to day — quotations, certificates, method
              statements — that caveat rarely bites, but it is worth knowing it exists. Most
              certification apps capture a signature built in, on-screen, at the point of
              completion; general e-signing services cover everything else, and what to look for
              there is an audit trail — who signed, when, from which device — which a handwritten
              signature on paper never carries.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A client questions whether the electronic signature on their consumer unit certificate is legally valid, having heard that 'digital signatures aren't real signatures'. Walk through answering them."
            steps={[
              {
                calc: '1. State the legal basis',
                note: 'The Electronic Communications Act 2000 and the UK’s retained eIDAS regulation give electronic signatures recognition for most business purposes.',
              },
              {
                calc: '2. Confirm the tier used',
                note: 'Signature captured in the certification app, with an audit trail of who signed and when.',
              },
              {
                calc: '3. Compare to a handwritten signature',
                note: 'A signature on paper proves nothing about who actually signed it or when — the audit trail is, if anything, stronger evidence.',
              },
            ]}
            answer="Explain plainly that the signature is legally recognised, name the Act and the retained eIDAS regulation, and point out that the audit trail is a stronger record than ink on paper. A vague 'yeah it's fine, everyone does it now' answers nothing and invites the next question."
          />

          <TryIt
            question="A subcontractor agreement needs signing before work starts tomorrow morning, and everyone involved is on a different site today. Work through the fastest approach that is still properly evidenced."
            steps={[
              {
                calc: '1. Rule out physical signing',
                note: 'No time to print, post and return before tomorrow.',
              },
              {
                calc: '2. Pick a tier',
                note: 'An Advanced Electronic Signature — identity-verified, not just a typed name — suits a subcontractor agreement.',
              },
              {
                calc: '3. Send, sign, confirm',
                note: 'Send from wherever you are; each party signs from their own device; the audit trail shows all three did so before work starts.',
              },
            ]}
            answer="An e-signing service used from each person's own device, same day — with the audit trail as the proof the agreement was in place before anyone picked up a tool, which a phone call or a verbal agreement would not give you."
          />

          <CommonMistake
            title="Assuming every electronic mark on a document is equally strong"
            whatHappens="A typed name at the bottom of an email gets treated with the same confidence as a properly captured Qualified Electronic Signature with an audit trail, because both 'count as a digital signature' in casual conversation. For a low-stakes acknowledgement that is probably fine; for a certificate or a contractual document, it is a weaker record than it appears."
            doInstead="Match the tier to the document. A typed email confirmation is adequate for acknowledging a delivery date. A certificate or a formal agreement deserves a signature captured with identity verification and an audit trail behind it."
          />

          <SectionRule />

          <InlineCheck
            id="m3s3-signatures"
            question="A client queries whether a digital signature on their electrical certificate is legally valid. What is the correct response?"
            options={[
              'Digital signatures are not legally valid — you need to provide a handwritten signature',
              "Digital signatures are legally recognised in the UK under the Electronic Communications Act 2000 and the UK's retained eIDAS regulation",
              'Digital signatures are only valid for emails, not for certificates',
              'Digital signatures require a solicitor to verify them',
            ]}
            correctIndex={1}
            explanation="Digital signatures are legally recognised in the UK. The Electronic Communications Act 2000 and the retained eIDAS regulation give electronic signatures standing for most business purposes, and a properly captured signature carries an audit trail — who signed, when, from which device — that a handwritten signature on paper does not."
          />

          <SectionRule />

          {/* ── 05 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>05 · Project management apps</ContentEyebrow>

          <ConceptBlock
            title="A coordination tool, not a technical one"
            onSite="A project management app will cheerfully let you set a deadline for a job that is technically impossible. It coordinates people; it does not check the work."
          >
            <p>
              As a career moves into larger or multiple simultaneous jobs, some system for tracking
              tasks, deadlines and who is doing what stops being optional — it is what stops a job
              quietly falling through the cracks. The categories run from a simple visual board
              (cards moving through columns such as &ldquo;To do&rdquo;, &ldquo;In progress&rdquo;,
              &ldquo;Complete&rdquo;), through more fully featured platforms adding timelines and
              workload views across several people, to trade-specific all-in-one apps combining
              scheduling, quoting, invoicing and client management. Where an office productivity
              suite is already in use for email and files, its built-in task tool is often adequate
              without adding another subscription.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A two-person firm keeps missing small tasks — a materials order forgotten, a certificate not chased for a week. What size of tool actually fits this problem?"
            steps={[
              {
                calc: '1. Count the moving parts',
                note: 'Two people, a handful of jobs at a time — not dozens running in parallel.',
              },
              {
                calc: '2. Match features to the problem',
                note: 'Task assignment and a due date are enough; workload views across a large team solve a problem this firm does not have.',
              },
              {
                calc: '3. Choose the simplest tool that covers it',
                note: 'A visual board with one card per job stage.',
              },
            ]}
            answer="A simple visual board. The problem is two people forgetting things, not a coordination failure across a large team — the tool should match the actual size of the problem, not the size of the firm's ambitions."
          />

          <TryIt
            question="The same firm has just taken on its fourth electrician, and jobs are now being double-booked. Work through what to check before choosing a bigger tool."
            steps={[
              {
                calc: '1. What changed?',
                note: 'More people working on more jobs at once — a genuine scaling problem, unlike the two-person case above.',
              },
              {
                calc: '2. What does the current tool actually fail at?',
                note: 'Visibility of who is booked where, not task tracking itself.',
              },
              {
                calc: '3. What feature actually fixes that?',
                note: 'A shared calendar or workload view across the team — not automation or invoicing features that do not touch the booking problem.',
              },
            ]}
            answer="Move up only as far as the specific failure requires — a platform with team scheduling and workload visibility. Buying the most feature-rich option available solves a different problem than the one this firm actually has."
          />

          <SectionRule />

          {/* ── 06 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>06 · Building Information Modelling (BIM)</ContentEyebrow>

          <ConceptBlock
            title="A model that carries data, not just geometry"
            plainEnglish="A BIM model is not a fancier 2D drawing. It is a 3D representation where every element also carries information — what it is, its specification, who made it, when it needs servicing."
          >
            <p>
              A BIM model is a 3D digital twin containing detailed information about every element,
              electrical systems included — not just the geometry (where things are) but the data
              behind them (specifications, manufacturer details, maintenance schedules). A number of
              free BIM viewer applications let you open, rotate and explore a model without buying
              the authoring software that built it, and one of BIM&rsquo;s clearest benefits is
              automated clash detection: the software flags where different building systems
              physically conflict, on screen, before anyone reaches for a drill.
            </p>
            <p>
              For years BIM maturity was described as &ldquo;Levels&rdquo; 0 to 3 — that language
              has since been formally retired, worth knowing because it catches people out in
              interviews. The UK BIM Framework now works to the{' '}
              <strong className="text-white">ISO 19650</strong> series, which describes information
              management rather than a ladder of maturity levels. You will still hear &ldquo;Level
              2&rdquo; on site and in older project documents, but if asked what standard a current
              project works to, the answer is ISO 19650, not a level number.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A clash report flags a cable tray running through a structural steel beam on a hospital project, caught only once the federated model was checked. Working through the clash, which service moves, and how do you decide?"
            steps={[
              {
                calc: '1. Identify what is fixed',
                note: 'A load-bearing structural beam is not something you reroute to suit a cable tray.',
              },
              {
                calc: '2. Identify what has design flexibility',
                note: 'Containment routes are normally designed to go around structure, not through it — the tray was always the more flexible element.',
              },
              {
                calc: '3. Check for constraints on the flexible element',
                note: 'Before rerouting, confirm what the tray actually carries — a tray with fire alarm or escape lighting cabling in it may have its own route requirements limiting how far it can move.',
              },
            ]}
            answer="The cable tray moves, not the beam — but only after checking what it carries and agreeing the revised route with the design team, not by rerouting on site on your own initiative."
          />

          <TryIt
            question="A project document you are handed refers to 'Level 2 BIM'. A colleague says this is out of date and you should ask which ISO 19650 documents apply instead. Are they right, and what should you actually do?"
            steps={[
              {
                calc: '1. Check the document date',
                note: 'Older projects genuinely were specified against Level 2 — not automatically wrong for a project that started under it.',
              },
              {
                calc: '2. Ask what governs a NEW project',
                note: 'For anything specified today, the current framework is the ISO 19650 series, not a level number.',
              },
              {
                calc: '3. Ask for the specific documents',
                note: 'Under ISO 19650 that typically means an information requirements document and a BIM execution plan — ask for both by name.',
              },
            ]}
            answer="Broadly right for anything current: ask what the project's information requirements and execution plan actually say, rather than relying on 'Level 2' as a label. But do not assume every mention of Level 2 is wrong — some live projects were genuinely specified under it and are still working to that document."
          />

          <SectionRule />

          <InlineCheck
            id="m3s3-bim"
            question="Your project manager asks you to review the electrical layout in a BIM model for potential clashes with the mechanical services. What tool could you use?"
            options={[
              'A word processor',
              'A free BIM viewer application, installed on a laptop or tablet',
              'An email client',
              'A calculator',
            ]}
            correctIndex={1}
            explanation="Several free BIM viewer applications exist that let you open, navigate and explore a model without owning the authoring software that built it. Look for one that lets you rotate the 3D model, hide or isolate individual systems, and pick out clashes visually. You do not need to own design software to read what it produced."
          />

          <SectionRule />

          {/* ── 07 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>07 · Electrical design software</ContentEyebrow>

          <ConceptBlock
            title="What design software actually does"
            onSite="Nobody expects an apprentice to run a discrimination study. Everybody expects an apprentice to notice when the schedule they were handed does not match what is actually on the wall."
          >
            <p>
              Dedicated design software automates the calculation-heavy end of a design — cable
              sizing against the load, voltage drop across the run, fault level at a board,
              discrimination between an upstream and downstream device — against a shared model of
              the installation, and produces the schedules a design team issues to site. You do not
              need to operate it, but you do need to know what its outputs mean: a{' '}
              <strong className="text-white">cable schedule</strong> is a set of assumptions turned
              into a specification, for a stated length and installation method; a{' '}
              <strong className="text-white">discrimination study</strong> assumes the devices
              installed match the ones it was run against; a{' '}
              <strong className="text-white">lighting design</strong> assumes the specified
              luminaire, not a substitute. Change any assumption on site and the figures no longer
              necessarily hold.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A design pack for a small commercial fit-out specifies a cable size for the sub-main, based on a 25 m run in free air. On site, the actual route runs 34 m and passes through a services riser alongside four other loaded cables. What should happen before that cable goes in?"
            steps={[
              {
                calc: 'Length: 25 m assumed vs 34 m actual',
                note: 'A longer run increases voltage drop for the same cable size.',
              },
              {
                calc: 'Method: free air assumed vs grouped in a riser actual',
                note: 'Grouping with other loaded cables reduces the current-carrying capacity that was assumed.',
              },
              {
                calc: 'Two assumptions have changed, not one',
                note: 'Either alone might still be within tolerance. Together, this is exactly the drift that invalidates a schedule figure.',
              },
            ]}
            answer="Flag it back to whoever issued the design before the cable is pulled — the schedule was calculated for a different length and installation method than what is actually there, and re-checking is a design question, not an installer's guess."
            watchOut="The instinct on a busy site is to install to the schedule because it has a design engineer's name on it. A schedule is only as good as the assumptions behind it."
          />

          <TryIt
            question="A discrimination study assumes a specific manufacturer's MCB downstream. On delivery, the wholesaler has substituted a different manufacturer's device of the same current rating due to a stock shortage. Work through whether this matters."
            steps={[
              {
                calc: '1. Check the rated current',
                note: 'Same rating — probably fine on this count alone.',
              },
              {
                calc: '2. Check the time/current characteristic',
                note: 'Discrimination studies are often run against a specific device’s actual tripping curve, not just its nominal type letter.',
              },
              {
                calc: '3. Confirm with the designer',
                note: 'A different manufacturer can mean a different curve even at the same rating and type.',
              },
            ]}
            answer="It can matter. Flag the substitution back to whoever ran the discrimination study before relying on it — same rating does not guarantee the same curve, and the study's conclusion depends on the curve, not the label."
          />

          <SectionRule />

          {/* ── 08 ─────────────────────────────────────────────────── */}
          <ContentEyebrow>08 · Staying current with technology</ContentEyebrow>

          <ConceptBlock
            title="Judging a source, not just consuming it"
            plainEnglish="Anyone can publish anything. The question worth asking about any source of trade information is the same one every time: what is this based on, and how would I know if it were wrong?"
          >
            <p>
              Technology in the trade moves quickly — smart home and building automation, EV
              charging, battery storage and solar PV, and AI-assisted design and testing tools are
              all creating work for electricians willing to learn the digital side alongside the
              physical one. The{' '}
              <strong className="text-white">
                IET (Institution of Engineering and Technology)
              </strong>{' '}
              publishes BS 7671 and runs courses and technical guidance — a genuinely authoritative
              source, because it is the body that writes the standard being discussed. A competent
              person scheme&rsquo;s technical bulletins are worth reading for the same reason: they
              are usually written in response to real faults the scheme has actually seen. Beyond
              those two, a great deal of trade content exists online, alongside a great deal that is
              confidently wrong — the difference is rarely obvious from production quality or
              follower count.
            </p>
          </ConceptBlock>

          <WorkedExample
            question="A widely shared video claims a wiring practice is 'now required' by BS 7671, stated with total confidence, but it does not match what you were taught and your scheme's bulletins have not mentioned it. Walk through verifying it before you change anything."
            steps={[
              {
                calc: '1. Note the specific regulation cited',
                note: 'Or note that none is given at all — a vague "the regs say" is itself a warning sign.',
              },
              {
                calc: '2. Look up that regulation directly',
                note: 'In BS 7671 itself, or ask your scheme’s technical helpline.',
              },
              {
                calc: '3. Compare what it actually says to the claim',
                note: 'Does the primary source support the claim, contradict it, or say something more limited than the video implied?',
              },
            ]}
            answer="Only change practice if the primary source confirms the claim. A claim with no specific citation, or one that does not match BS 7671 or your scheme's guidance when checked, gets discarded regardless of how popular the channel is."
          />

          <TryIt
            question="A manufacturer's technical bulletin and a widely shared forum post disagree about a lighting circuit's maximum spur length. Work through which you would trust and why."
            steps={[
              {
                calc: '1. Identify what each actually is',
                note: 'A manufacturer bulletin is issued against tested product data. A forum post is one person’s account, unverifiable at a glance.',
              },
              {
                calc: '2. Check whether either cites BS 7671 directly',
                note: 'The one that points to a specific regulation or clause is doing the more defensible thing.',
              },
              {
                calc: '3. Default to the source you can verify',
                note: 'The manufacturer bulletin, or BS 7671 itself if the bulletin does not settle it.',
              },
            ]}
            answer="Trust the manufacturer bulletin over the forum post, and check BS 7671 directly if the two still do not agree. A forum post is a lead worth following up, not a source to act on by itself."
          />

          <CommonMistake
            title="Installing to a design output without checking it against the site"
            whatHappens="A cable schedule, discrimination study or lighting design is treated as unquestionable because it came out of design software with someone else's name attached. Only later does it emerge that the assumptions behind the figures — length, grouping, the actual devices delivered — no longer matched what was built."
            doInstead="Read a design output as a set of stated assumptions, not a guarantee. If what you can see on site does not match what was assumed, raise it before the work goes in, not after."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A certification app is judged on four things: right form, real validation, controlled multi-user issuing, fast retrieval.',
              'PDF annotation adds a layer on top of a document without altering it. Treat an annotation as a comment, never as a revision in itself.',
              'A site photograph is evidence. Wide shot for context, then closer shots with a reference point — before, during and after, not just the finished result.',
              'UK electronic signatures have three tiers. Even the top tier, Qualified, does not remove extra formality from the small category of documents such as deeds.',
              'A project management app coordinates people and tasks — match the tool to the size of the actual problem, not the size of the ambition.',
              'BIM carries data as well as geometry. The current framework is the ISO 19650 series; "BIM Levels 0–3" is retired language you will still meet on older paperwork.',
              'Design software automates calculation from stated assumptions. Check those assumptions against the real site before installing to the figures.',
              'Judge any source of trade information the same way: does it cite the specific clause, and does it match BS 7671 or your scheme’s own guidance?',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Do I need to buy premium versions of every digital tool mentioned here?',
                answer:
                  'No. Free tiers of PDF annotation tools, signature services and project management apps cover most day-to-day electrical work. Paid features tend to earn their cost on larger commercial projects with bigger teams — assess the actual need before paying for capability you will not use.',
              },
              {
                question: 'Is a scanned handwritten signature the same as a digital signature?',
                answer:
                  'No. A scan of a handwritten signature is just an image — it carries none of the identity verification or audit trail that makes an electronic signature under eIDAS meaningful. A properly captured electronic signature, even a simple one, is a different and generally stronger thing.',
              },
              {
                question: 'Will BIM replace 2D drawings entirely?',
                answer:
                  'Not for every project — plenty of domestic and smaller commercial work is still drawn conventionally, and will be for some time. On larger commercial and public sector projects, BIM is increasingly the default, which is why it is worth understanding even if your current work does not use it.',
              },
              {
                question:
                  'If I am not a designer, why does it matter what design software assumed?',
                answer:
                  'Because you are the person best placed to notice when the real installation has drifted from what was assumed — a longer run, cables grouped differently, a substituted device. The design engineer is not on site to see that; you are.',
              },
              {
                question: 'How do I know if a trade video or website is trustworthy?',
                answer:
                  'Check whether it cites the specific clause or regulation it claims to explain, whether it distinguishes a requirement from a recommendation, and whether the claim matches BS 7671 or your scheme’s own guidance when you actually look it up. A large following proves popularity, not accuracy.',
              },
            ]}
          />

          <SectionRule />

          <Quiz questions={quizQuestions} title="Section 3: Digital Documentation & Apps Quiz" />

          {/* ── prev / next ─────────────────────────────────────────── */}
          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module3/section2')
              }
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-white/[0.12] bg-white/[0.04] px-4 text-sm font-medium text-white touch-manipulation"
            >
              <ChevronLeft className="h-4 w-4" />
              Section 2
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/study-centre/apprentice/functional-skills/module3/section4')
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

export default FunctionalSkillsModule3Section3;
