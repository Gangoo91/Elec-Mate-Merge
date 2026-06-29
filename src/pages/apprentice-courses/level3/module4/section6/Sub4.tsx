/**
 * Module 4 · Section 6 · Subsection 4 — Capstone case + reflective practice
 * Maps to C&G 2365-03 / Unit 303 / LO6 / AC 6.3 + AC 6.5 + AC 6.6
 *   AC 6.3 — "diagnose electrical faults using engineering decision and
 *             evaluation of symptoms and findings"
 *   AC 6.5 — "specify how electrical systems and equipment can be returned to
 *             a safe and serviceable condition"
 *   AC 6.6 — "review the outcome of fault correction work to inform future
 *             practice"
 *
 * Layered depth: 2357 Unit 608 ELTK07 / AC 6.5 + 6.6 — apply, review, learn.
 *
 * Frame: capstone subsection that pulls together the whole unit through a
 * realistic multi-fault case study, then introduces the reflective-practice
 * discipline that converts each rectification visit into a learning event.
 * This is the L3 step-up in metacognition — knowing not just how to do the
 * job but how to learn from it.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
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
  VideoCard,
} from '@/components/study-centre/learning';
import { videos } from '@/data/study-centre/video-library';
import useSEO from '@/hooks/useSEO';

const TITLE =
  "Capstone case + reflective practice (6.3/6.5/6.6) | Level 3 Module 4.6.4 | Elec-Mate";
const DESCRIPTION =
  "Multi-fault case study walking the full Unit 303 framework — H&S, instruments, fault types, logical diagnosis, rectification, documentation — followed by the reflective-practice discipline (Kolb cycle / After Action Review) that turns each visit into a learning event. The capstone for Module 4.";

const checks = [
  {
    id: "mod4-s6-sub4-multi-fault",
    question:
      "On a small-commercial visit you discover the original reported fault (intermittent RCD trip on a kitchen ring) is caused by a degraded element on a kettle, but you ALSO find the consumer unit is not RCD-protected on the lighting circuits and the main bonding to the gas service is missing. The customer wants only the kettle issue 'fixed'. How do you handle the additional findings?",
    options: [
      "Fix only the kettle fault, say nothing about the other findings, and move on — the rest is none of your business as the customer only paid for the kettle.",
      "Refuse to fix the kettle issue until the customer agrees to pay for the lighting RCD and gas bonding as well — bundle it all or walk away.",
      "Carry out the lighting RCD upgrade and gas bonding immediately without asking, then add them to the invoice as essential safety work.",
      "Fix the reported fault, then document and verbally brief the additional safety findings, leaving the customer free to decline.",
    ],
    correctIndex: 3,
    explanation:
      "Rectify the original reported fault within scope, document the additional findings on a Schedule of Observations (or EICR if agreed), and verbally brief the customer — explaining what was found, what current standards require and the cost to address them. The unprotected lighting and missing bonding are safety findings the apprentice cannot ignore (EAWR Regs 4 and 14, HSWA s.3), but you cannot hold the agreed work hostage to them, nor do unbidden chargeable work without informed consent.",
  },
  {
    id: "mod4-s6-sub4-after-action",
    question:
      "You've finished a complex visit that involved diagnosing and rectifying a borrowed-neutral fault in an old domestic installation. Driving back to the depot, what's the structured way to review the visit so you actually learn from it?",
    options: [
      "Don't bother reviewing it — the job's done and the fault's fixed, so dwelling on it just wastes time you could spend on the next call-out.",
      "Tell the next apprentice the war story over a brew so they hear what you found — that informal anecdote is all the learning that's needed.",
      "Use the After Action Review — four written questions covering plan, outcome, the gap and the change for next time.",
      "Only review a job formally if something went wrong — a visit that ended well has nothing to teach, so reflection is for failures.",
    ],
    correctIndex: 2,
    explanation:
      "The After Action Review is four questions, ~5 minutes, written down: what was supposed to happen (your plan), what actually happened (the unexpected borrowed neutral, the overrun), why there was a difference (pre-standards install, EICR didn't flag it, supervisor not called earlier), and what you'll do differently (suspect borrowed neutrals on pre-1990 work). An informal anecdote loses precision, and successful visits teach as much as failures, so the AAR applies to every significant visit.",
  },
  {
    id: "mod4-s6-sub4-kolb",
    question:
      "What's the Kolb learning cycle and why does it apply to L3 fault diagnosis training?",
    options: [
      "A fixed sequence of training courses to pass — Level 1, 2, 3, then AM2 — that applies because fault diagnosis sits at the Level 3 stage.",
      "An iterative four-stage cycle — concrete experience, reflective observation, abstract conceptualisation, active experimentation — turning each visit into learning.",
      "The four-step safe-isolation sequence — identify, isolate, lock-off, prove dead — that applies because every visit starts with isolation.",
      "A model of the four EICR observation codes (C1, C2, C3, FI) that applies because fault diagnosis produces coded observations.",
    ],
    correctIndex: 1,
    explanation:
      "Kolb's experiential learning cycle is four iterative stages: concrete experience (the rectification visit), reflective observation (the AAR, the debrief), abstract conceptualisation (connecting the borrowed neutral to the textbook pattern), and active experimentation (proactively checking for it next time). It is a learning process, not a ladder of qualifications, the safe-isolation sequence, or EICR coding. Without conscious reflection the loop never closes and the apprentice keeps repeating first-time mistakes.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "On a multi-fault visit, what's the prioritisation framework for which fault to address first?",
    options: [
      "Address whichever fault is cheapest and quickest first, to show the customer visible progress and keep them happy.",
      "Immediate danger first, then the agreed contracted work, then additional findings documented and quoted separately.",
      "Always do the contracted work first and only look at anything else if time permits, because that's what the customer is paying for.",
      "Let the customer choose the order they want everything done in, since it's their property and their money.",
    ],
    correctAnswer: 1,
    explanation:
      "Three tiers match the EAWR/BS 7671 hierarchy: immediate danger (Code C1 — exposed live, missing bonding, a faulty RCD on TT) is addressed first regardless of customer agreement (EAWR Reg 4); the agreed reported fault follows; non-immediate findings (C2/C3 — bonding gaps, dated devices, borderline IR) are documented, briefed and quoted separately. Cost/ease sequencing and the customer's preference do not outrank a life-safety item.",
  },
  {
    id: 2,
    question:
      "An L3 apprentice has just completed their first solo (under remote phone supervision) rectification visit. The work went well. What does 'good practice' look like in the de-brief with the supervisor?",
    options: [
      "Keep it short and upbeat — tell the supervisor 'all went fine, no problems' so they trust you with more solo work.",
      "Only raise the de-brief if you think you made a mistake; if the work went well there's nothing for the supervisor to add.",
      "A structured, honest de-brief walking diagnosis, isolation, rectification, testing, documentation and the customer hand-back.",
      "Email the supervisor the completed certificate and let the paperwork speak for itself — a verbal de-brief is unnecessary once filed.",
    ],
    correctAnswer: 2,
    explanation:
      "The de-brief is the supervisor's coaching moment: cover whether the fault matched the brief, whether isolation ran cleanly (any near-misses), how the rectification and testing went (any borderline readings), the certificate, and the hand-back, ideally same-day for 15-20 minutes. A rosy 'all fine' hides what needs coaching, the certificate records the result not the learning, and successful visits are reviewed too, not just errors.",
  },
  {
    id: 3,
    question:
      "What's the difference between a 'learning organisation' and a 'compliance-only' firm in the context of fault diagnosis work?",
    options: [
      "A learning organisation runs lots of training courses, while a compliance-only firm does the minimum CPD to keep its accreditation.",
      "A learning organisation holds a recognised quality accreditation such as ISO 9001, while a compliance-only firm has no quality system.",
      "A learning organisation employs apprentices and a compliance-only firm employs only qualified electricians — the apprentices make the difference.",
      "Both do the work and meet the regulations, but the learning organisation also captures lessons from each job and feeds them back to improve.",
    ],
    correctAnswer: 3,
    explanation:
      "A compliance-only firm does the work, certifies, files and repeats; a learning organisation does all that plus captures what worked and what to change and feeds it into training and procedure. It shows up in lower fault-recurrence rates, faster apprentice progression and customer trust — and it is a culture of continuous improvement, not merely booking courses, holding ISO 9001 or employing apprentices. The L3 apprentice supports it by bringing field observations back to toolbox talks.",
  },
  {
    id: 4,
    question:
      "What's a 'near-miss' in fault diagnosis and why should it be reported even if no harm occurred?",
    options: [
      "An unsafe condition or action that could have caused harm but didn't, by chance or intervention — reported as an early warning.",
      "Any minor injury that needed a plaster or first aid but no hospital treatment — a small cut, a graze or a bruise.",
      "A job where you finished slightly over the quoted time or budget — you 'nearly missed' the target you set.",
      "A fault that one protective device failed to clear but a backup device caught in time before any damage occurred.",
    ],
    correctAnswer: 0,
    explanation:
      "A near-miss is an unsafe condition or act that could have caused harm but happened not to — cutting a cable thought dead that sparks, a dropped tool, a probe slip onto a live conductor. It is not a minor injury, a budget overrun, or back-up protection operating. It is reported because the same condition will eventually cause harm; most major incidents have a trail of unreported near-misses (the Heinrich pyramid), and suppressing them through fear of blame is the pattern that precedes serious incidents.",
  },
  {
    id: 5,
    question:
      "The 'just culture' framework distinguishes between honest mistakes and reckless behaviour. How does this apply to fault diagnosis errors?",
    options: [
      "Everyone is treated identically after any incident — same investigation, same outcome — because treating people differently would be unfair.",
      "The response is matched to the behaviour — honest mistake gets learning, at-risk behaviour gets coaching, reckless behaviour gets discipline.",
      "No one is ever disciplined for anything that happens at work, because blame stops people reporting near-misses and errors.",
      "The most senior person present always carries the blame for any error, so junior staff feel safe to report what happened.",
    ],
    correctAnswer: 1,
    explanation:
      "Just culture distinguishes an honest mistake (a competent person making a reasonable error — response: learning and procedure improvement) from at-risk behaviour (knew the safer option but chose the riskier — response: coaching) from reckless behaviour (knowingly took an unjustifiable risk — response: disciplinary). It is neither a one-size-fits-all response, nor a no-blame culture, nor automatic blame on the most senior person: you can report a genuine mistake without fearing your career, but you cannot deliberately skip isolation.",
  },
  {
    id: 6,
    question:
      "How does the apprentice's portfolio (the C&G EAL portfolio of evidence) capture the reflective-practice element of fault diagnosis training?",
    options: [
      "Purely a collection of the certificates you've issued — completed EICs, EICRs and Minor Works certs — and nothing else.",
      "A record of your attendance at college — registers, course handouts and exam results — proving you sat the qualification.",
      "Work evidence plus structured written reflection, witness testimony and mapping of each item to the 2365 units.",
      "The manufacturer's data sheets and BS 7671 extracts you keep on your phone for reference on site.",
    ],
    correctAnswer: 2,
    explanation:
      "The portfolio captures work evidence (job sheets, certificates, photos), reflection on each significant piece using a structured format (Gibbs' or Kolb's cycle — situation, action, result, what you'd do differently), witness testimony from the supervisor, and unit/AC mapping. The reflection is the 'learning' part, evidencing that the apprentice internalised the lesson rather than just performed the task — it is not a certificate stack, a college attendance log, or reference materials.",
  },
  {
    id: 7,
    question:
      "What's the L3 apprentice's response when a rectification reveals a deeper underlying problem (e.g. fixing one connection reveals that the entire ring main has been wired with under-rated cable)?",
    options: [
      "Carry on and rewire the whole ring in correctly-rated cable there and then, so the customer gets it all fixed in one visit.",
      "Down-rate the protective device to suit the under-rated cable so the circuit is 'safe enough' and finish the original job.",
      "Say nothing about the under-rated cable — it was like that before you arrived, so just complete the connection you came to fix.",
      "Stop, document and make-safe, then escalate to the supervisor and brief the customer before any larger work proceeds.",
    ],
    correctAnswer: 3,
    explanation:
      "The apprentice's authority does not extend to redesigning a circuit on the spot. Stop at the point the deeper issue is visible, document it (photos, sketch, cable size), make-safe (isolate the dangerous circuits, restore the rest), escalate to the supervisor with the photos, brief the customer that the work is on hold, and wait for the decision. Rewiring or re-rating unbidden is beyond scope and gives the customer an unagreed bill; ignoring a dangerous defect breaches the duty to act (EAWR Reg 16).",
  },
  {
    id: 8,
    question:
      "Looking back across all of Module 4 (Unit 303), what's the single most important L3 mindset shift compared to L2 installation work?",
    options: [
      "From 'the system is what I'm building' to 'the system is the patient I'm investigating' — every assumption is suspended.",
      "From working in pencil to working in pen — at L3 your paperwork has to be neater and more permanent than at L2.",
      "From hand tools to power tools — L3 work is faster and uses more advanced equipment than L2 installation work.",
      "From working indoors to working outdoors — L3 fault diagnosis takes place mostly on external supplies and street furniture.",
    ],
    correctAnswer: 0,
    explanation:
      "At L2 you assume the installation is as designed; at L3 fault diagnosis every assumption is suspended because something has departed from the design and you cannot know in advance which. Every reading is hypothesis-testing, every isolation is verification, every rectification a precise intervention — closer to a doctor diagnosing a patient than a builder assembling a structure. The shift is diagnostic, not about paperwork neatness, tooling or location.",
  },
];

const faqs = [
  {
    question: "What's a structured de-brief and how often should it happen?",
    answer:
      "Structured de-brief = a planned conversation between apprentice and supervisor (or peer / mentor) after a significant piece of work, using a defined framework (After Action Review, GROW model, Kolb cycle, or the firm's own template). Frequency depends on the work — daily for high-novelty tasks, weekly for routine work, after every significant near-miss or unusual outcome. Most firms run a brief informal de-brief at the end of each day (toolbox talk style) and a longer monthly review for the full team. The L3 apprentice should be part of both — contributing observations, asking questions, learning from peers' experiences. Skipping de-briefs is the canonical 'apprentice doesn't learn fast' pattern.",
  },
  {
    question: "How do I keep my technical knowledge current after the apprenticeship?",
    answer:
      "Continuing Professional Development (CPD) — the JIB / SJIB / ECA all maintain CPD frameworks for qualified electricians. Routes include — IET membership (full access to GN3, BS 7671 updates, technical journals); manufacturer training (Schneider, Hager, Wallbox all run free or low-cost product courses for installers); industry events (Elex, Euxbridge, Skills Show); online platforms (NICEIC Online, Elec-Mate's CPD library, BPEC e-learning). The pattern is — couple of hours per month minimum, more around major BS 7671 amendments. The newly-qualified electrician who doesn't keep up falls behind on EV / PV / heat pumps within 2&ndash;3 years; the one who does becomes the supervisor in 5&ndash;7 years.",
  },
  {
    question: "What's the JIB (Joint Industry Board) and how does it relate to L3 progression?",
    answer:
      "The JIB is the trade body that operates the grading scheme (Apprentice, Electrician, Approved Electrician, Technician) and manages the JIB-ECS card scheme that lets you access most large commercial sites in the UK. Completing the C&G 2365-03 + AM2 (or apprenticeship endpoint assessment) makes you a JIB Electrician; further experience and the inspection-and-testing qualifications (C&G 2391/2394/2395) progress you to Approved Electrician; specialist work (HV, design) progresses to Technician. The JIB-ECS card is renewable every 3&ndash;5 years and requires CPD evidence — so the learning culture continues throughout your career. SJIB is the Scottish equivalent; ECS is the underlying card scheme.",
  },
  {
    question: "When does an L3 apprentice become safe to work without supervision?",
    answer:
      "Gradually, by competence rather than by date. The pattern is — direct on-site supervision for the first 18&ndash;24 months; remote phone supervision (supervisor available but not on site) on routine work in months 24&ndash;36; full solo work on routine domestic / small-commercial after the apprenticeship endpoint assessment + a probationary 'newly-qualified' period (3&ndash;6 months typically). EAWR Reg 16 (competence) is the underlying duty — the supervisor judges when each level of independence is safe, the apprentice grows into it, the firm's insurance and procedure framework supports the progression. Some firms accelerate; some are conservative. The L3 apprentice's job is to demonstrate competence visit-by-visit and to honestly raise concerns when uncertain.",
  },
  {
    question: "What's the worst mistake I can make as an L3 apprentice on fault diagnosis?",
    answer:
      "Pretending to know when you don't. The technical mistakes (mis-identification of a fault, wrong instrument selection, mis-reading a meter) are recoverable — the supervisor's call, the next visit, the certificate process all catch them. The cultural mistake of bluffing is the dangerous one because it leads to undocumented faults persisting, customers getting wrong information, and the apprentice missing the learning opportunity. Honesty about uncertainty (saying 'I'm not sure, let me check' or 'I want to phone the supervisor before I do this') is the L3 apprentice's most powerful protective behaviour. Every supervisor would rather take a phone call than visit a hospital.",
  },
  {
    question: "How does Module 4's content connect to the AM2 / AM2E / AM2S endpoint assessment?",
    answer:
      "Heavily. The AM2 (Achievement Measurement 2 — the City and Guilds 2357 / 2356 endpoint assessment) includes fault diagnosis tasks under controlled conditions — you're given a faulty installation, you have to diagnose it, document the diagnosis, propose the rectification, and (in some variants) carry out the rectification. The Module 4 content — H&S, instruments, fault types, logical diagnosis, rectification, documentation — IS the technical content that AM2 tests. The reflective-practice element shows up in the practical interview and the portfolio. Apprentices who take Module 4 seriously do AM2 well; apprentices who skim Module 4 struggle at AM2. The AM2E and AM2S are equivalent for the EAL and SECTT routes respectively.",
  },
];

export default function Sub4() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module4-section6')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 6
          </button>

          <PageHero
            eyebrow="Module 4 · Section 6 · Subsection 4"
            title="Capstone case + reflective practice"
            description="The capstone for Module 4 — a multi-fault case study walking the full Unit 303 framework, then the reflective-practice discipline (Kolb cycle, After Action Review, just culture) that converts each visit into a learning event. The L3 metacognitive step-up that supports the journey from apprentice to Approved Electrician."
            tone="emerald"
          />

          <TLDR
            points={[
              "Multi-fault visits need prioritisation — life-safety first, contracted work second, additional findings documented and briefed.",
              "After Action Review (4 questions, 5 minutes) converts each visit into a learning event; skipping it is the slow-learner pattern.",
              "Kolb's experiential learning cycle — concrete experience, reflective observation, abstract conceptualisation, active experimentation — drives apprentice progression.",
              "L3 mindset shift: 'system as patient I'm investigating', not 'system I'm building' — the metacognitive heart of fault diagnosis.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Apply the prioritisation framework on multi-fault visits — life-safety first, contracted work second, additional findings documented and briefed.",
              "Carry out a structured After Action Review (AAR) using the four-question framework after each significant rectification visit.",
              "Apply Kolb's experiential learning cycle to the apprentice progression — concrete experience, reflective observation, abstract conceptualisation, active experimentation.",
              "Recognise the just culture distinction between honest mistake, at-risk behaviour and reckless behaviour and the appropriate organisational response to each.",
              "Maintain a portfolio of evidence (C&G 2365 / AM2) that captures both technical work AND structured reflection.",
              "Understand the L3 to AM2 to JIB Electrician to Approved Electrician progression and the role of CPD across the career.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>The capstone case — multi-fault rectification</ContentEyebrow>

          <ConceptBlock
            title="Real visits are rarely single-fault — the capstone case walks a typical multi-finding visit"
            plainEnglish="A customer reports 'the kitchen RCD keeps tripping when I use the kettle'. You arrive with a plan to investigate the kettle circuit. By the end of the visit you've found the original fault PLUS three other safety issues, none of which the customer asked about. The capstone case shows how the L3 framework handles this realistically."
            onSite="The structure: GREET + BRIEF (5 mins). DIAGNOSTIC of original fault (30 mins). DISCOVERY of additional findings (within the diagnostic). PRIORITISATION (life-safety first, contracted next, documented findings third). EXECUTION of agreed work. CUSTOMER BRIEF + DOCUMENTATION of additional findings. HAND-BACK + DEBRIEF."
          >
            <p>The capstone case timeline:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>09:00 ARRIVAL</strong> — greet, brief the diagnostic plan, customer access to the kitchen and CU.</li>
              <li><strong>09:15 DIAGNOSTIC</strong> — isolate the kitchen ring; full Part 6 testing; identify the kettle's element as having degraded IR under heat (cold-vs-hot IR comparison).</li>
              <li><strong>09:45 DISCOVERY</strong> — while at the CU, notice the lighting circuits are not RCD-protected (Code C2 territory under current standards) AND there is no visible main bonding to the gas service entering the property (Code C2). Inspect the gas meter cupboard — confirmed: no bonding cable.</li>
              <li><strong>10:00 PRIORITISATION</strong> — original fault (kettle) is the contracted work. Additional findings are non-immediate-danger but warrant action. Brief the customer on what was found.</li>
              <li><strong>10:15 EXECUTION</strong> — fit a new kettle (or recommend replacement; not strictly your work, but advise); restore the kitchen ring; verify post-rectification testing.</li>
              <li><strong>11:00 DOCUMENTATION</strong> — issue Minor Works Certificate for the kitchen work; issue a separate Schedule of Observations / EICR-equivalent report listing the lighting RCD gap and the missing bonding; quote for both as separate works.</li>
              <li><strong>11:30 CUSTOMER BRIEF</strong> — show the work, demonstrate the kitchen, hand over the certificate, walk through the additional findings, give the customer the choice and the timeline.</li>
              <li><strong>12:00 DEBRIEF</strong> — phone the supervisor on the way back; AAR the visit; log the additional-findings quote in the firm's system for the office to follow up.</li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Health and Safety at Work etc. Act 1974 — Section 3"
            clause={
              <>
                "It shall be the duty of every employer to conduct his undertaking in such a way as to ensure, so far as is reasonably practicable, that persons not in his employment who may be affected thereby are not thereby exposed to risks to their health or safety."
              </>
            }
            meaning={
              <>
                HSWA s.3 puts the duty on the firm (and through it, on the L3 apprentice as the firm's representative on site) towards anyone who isn't an employee &mdash; the customer, the customer's family, the postman, the next tenant. When an L3 apprentice discovers a safety finding during a visit, the s.3 duty is engaged regardless of whether the customer asked about it. The right response is to document, brief, and offer rectification &mdash; not to ignore. Ignoring known safety issues breaches the duty and exposes the firm to civil and potentially criminal liability if harm later occurs.
              </>
            }
            cite="Source: Health and Safety at Work etc. Act 1974, Section 3."
          />

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <VideoCard
            url={videos.faultFinding.url}
            title={videos.faultFinding.title}
            channel={videos.faultFinding.channel}
            duration={videos.faultFinding.duration}
            topic={videos.faultFinding.topic}
          />

          <SectionRule />

          <ContentEyebrow>Reflective practice — the L3 metacognitive step-up</ContentEyebrow>

          <ConceptBlock
            title="After Action Review — 4 questions, 5 minutes, every significant visit"
            plainEnglish="The After Action Review framework was developed by the US military and is now widely used in safety-critical industries. Four questions, asked honestly, with the answers written down. The discipline turns experience into learning."
            onSite="The four AAR questions, applied to fault diagnosis: (1) WHAT WAS SUPPOSED TO HAPPEN? Your plan at the start of the visit. (2) WHAT ACTUALLY HAPPENED? The actual outcome and any surprises. (3) WHY WAS THERE A DIFFERENCE? The honest analysis of the gap. (4) WHAT WILL YOU DO DIFFERENTLY NEXT TIME? The actionable change. Done weekly, the AAR turns a year's visits into a year's learning. Most firms include AAR-style review in the weekly toolbox talk; the L3 apprentice contributes their visit experiences alongside the supervisor's."
          >
            <p>Why the AAR works:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>WRITTEN DOWN</strong> — externalising the reflection forces precision; thinking about it without writing tends to gloss.</li>
              <li><strong>PROMPT</strong> — same-day or next-day while memory is fresh; week-old AARs lose detail.</li>
              <li><strong>HONEST</strong> — the framework is for learning, not blame; honest answers make the learning real.</li>
              <li><strong>ACTIONABLE</strong> — the fourth question demands a concrete change; reflection without change is wishful thinking.</li>
              <li><strong>SHARED</strong> — supervisor / peer review of the AAR multiplies the learning across the team.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Just culture + the safety reporting environment</ContentEyebrow>

          <ConceptBlock
            title="The firm's culture determines whether near-misses get reported or hidden"
            onSite="A firm with a just culture — honest mistake gets learning, at-risk behaviour gets coaching, reckless behaviour gets discipline — is one where the L3 apprentice can report a near-miss safely. A firm with a blame culture is one where near-misses get hidden and the same condition causes a major incident later. The L3 apprentice's lived experience of either shapes their lifetime safety behaviours; honest reporting in a just culture is the foundation of long-career safety."
          >
            <p>The just culture distinctions:</p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Honest mistake</strong> — competent person made a reasonable error under the circumstances. Response: learning, training, procedure improvement.</li>
              <li><strong>At-risk behaviour</strong> — person knew the safer option but chose the riskier. Response: coaching, retraining.</li>
              <li><strong>Reckless behaviour</strong> — person knowingly took an unjustifiable risk. Response: disciplinary, potential dismissal.</li>
              <li><strong>System failure</strong> — the procedure or training itself was inadequate. Response: redesign the system, not the person.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[2].id}
            question={checks[2].question}
            options={checks[2].options}
            correctIndex={checks[2].correctIndex}
            explanation={checks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Building the personal evidence portfolio</ContentEyebrow>

          <ConceptBlock
            title="What goes in your portfolio after each fault-correction visit"
            plainEnglish="The L3 portfolio isn&apos;t just paperwork &mdash; it&apos;s how you evidence competence to your assessor, your future employer, and yourself. Capstone visits generate the richest evidence, but every fault job adds something."
            onSite="Use the firm&apos;s redacted job records (customer data anonymised) plus your own learning log. A photograph of a diagnostic test result, a sketch of a fault tree, an after-action note &mdash; all anonymous, all stored in a structured folder. Twelve months of this and you&apos;ve got a real-world portfolio that beats any textbook example."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Anonymised job sheet</strong> &mdash; what was found, what was done, what was learned.</li>
              <li><strong>Test result extract</strong> &mdash; the readings that confirmed the diagnosis.</li>
              <li><strong>Photograph (anonymised)</strong> &mdash; before / during / after.</li>
              <li><strong>Reflection note</strong> &mdash; what went well, what surprised you, what you&apos;d do differently next time.</li>
              <li><strong>Cross-reference to standard</strong> &mdash; the BS 7671 Regulation, GN3 section, or manufacturer instruction that informed the decision.</li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Authority limits and when to escalate</ContentEyebrow>

          <ConceptBlock
            title="Recognising the boundary of L3 apprentice scope"
            plainEnglish="The capstone work tests whether you know where your authority ends. Knowing when to phone the supervisor isn&apos;t weakness &mdash; it&apos;s competence under EAWR Reg 16. The L3 expectation is to lead under supervision, not to lead alone."
          >
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li><strong>Supply-side faults</strong> &mdash; cut-out, tails, service head, DNO equipment. Always escalate.</li>
              <li><strong>Three-phase commercial faults</strong> beyond the scope of your training &mdash; motor controls, VSDs, large heating banks.</li>
              <li><strong>Specialised-system faults</strong> &mdash; PV string side, battery storage internals, EV charger module replacement.</li>
              <li><strong>Anything that doesn&apos;t add up</strong> &mdash; readings that contradict each other, symptoms that change between visits, equipment behaving outside its data sheet.</li>
              <li><strong>Anything where you&apos;ve isolated, proved dead, started work, and a reading appears you can&apos;t immediately explain.</strong></li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Pattern recognition — the difference between L3 and L2"
            plainEnglish="L2 apprentices follow procedures. L3 apprentices recognise patterns. The pattern-recognition step is what lets you walk into a property, smell the burnt-plastic odour, see the consumer unit and immediately suspect a heat-affected RCBO before any test instrument is out of the bag. Pattern recognition is built by reflection — every visit you process consciously becomes a pattern in your professional memory."
            onSite="Train the pattern recognition deliberately. After every visit, ask: 'What did I see this time that I have seen before? What did I see this time that was new?' The first question reinforces existing patterns; the second adds new ones. Over a year of L3 practice, the patterns accumulate into the diagnostic intuition that lets you skip the slow systematic walk-through on familiar problems and concentrate on the unfamiliar ones."
          >
            <p>
              Pattern categories worth tracking deliberately:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Symptom patterns</strong> — burnt-plastic smell at the
                CU, browning around a socket terminal, audible humming at a
                fluorescent ballast, RCD that holds for 30 seconds then trips.
              </li>
              <li>
                <strong>Customer patterns</strong> — the customer who minimises
                the symptom (often a more serious fault than reported), the
                customer who escalates everything (often a less serious fault
                than reported), the customer with a tight budget (drives the
                quoting strategy).
              </li>
              <li>
                <strong>Property patterns</strong> — 1970s estate with the same
                consumer unit type and the same predictable failure mode,
                Victorian terrace with original lead-and-rubber wiring, modern
                new-build with PME and an EV charger.
              </li>
              <li>
                <strong>Equipment patterns</strong> — particular RCBO models
                that fail predictably, particular extractor fans that leak
                earth, particular EV chargers with comms quirks.
              </li>
              <li>
                <strong>Failure patterns</strong> — the conductor that always
                fails at the back-of-cabinet bend, the bonding clamp that
                always corrodes, the outdoor accessory that always lets in
                water at the cable gland.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Continuing professional development — what counts as CPD at L3"
            plainEnglish="The competent-person schemes (NICEIC, NAPIT, ELECSA, STROMA) require ongoing CPD to maintain certification. The L3 apprentice's CPD record starts now and runs for the rest of the career. CPD includes formal training (BS 7671 update courses, manufacturer training, specialist quals like 18th Edition update or EV / PV / heat pump installer), informal learning (toolbox talks, supplier seminars, manufacturer webinars), and self-directed reading (IET wiring matters, electrical magazines, manufacturer technical bulletins)."
            onSite="Keep a rolling CPD log — date, topic, source, time spent, key learning. Most schemes ask for 30-50 hours per year of evidenced CPD. The log accumulates naturally if you record as you go; it becomes a chore if you try to reconstruct from memory at audit time. Manufacturer technical bulletins (Hager, Schneider, Wago) often arrive by email and a five-minute read counts; record it. The L3 apprentice's CPD discipline today is what makes the L4 / NVQ / scheme assessor visit smooth in three years' time."
          >
            <p>
              CPD record items worth capturing:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Formal training</strong> — courses, certificates,
                signed attendance evidence; the heaviest evidence weight.
              </li>
              <li>
                <strong>Manufacturer training</strong> — vendor-specific
                certifications (heat pump install, EV charger installer, PV
                MCS pathway).
              </li>
              <li>
                <strong>Toolbox talks and team briefings</strong> — record
                date, topic, presenter; cumulative value for evidence of
                ongoing learning.
              </li>
              <li>
                <strong>Reading and self-study</strong> — IET wiring
                matters, manufacturer technical bulletins, electrical
                magazines; honest time-spent estimate.
              </li>
              <li>
                <strong>Visit reflection</strong> — significant visits where
                a new lesson was learned; counts as evidenced learning.
              </li>
              <li>
                <strong>Mentoring or peer support</strong> — helping a
                fellow apprentice through a problem; counts both ways.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The L3-to-L4 pathway — gold-card aspirations and the JIB grade"
            plainEnglish="The L3 apprenticeship is one stage of a longer career. After L3 the typical UK pathway is: complete the AM2 / AM2S end-point assessment, achieve the NVQ Level 3 Electrotechnical Services qualification, register with the Electrotechnical Certification Scheme (ECS) for the gold card, and progress through the Joint Industry Board (JIB) grades. Beyond that come specialist schemes (Approved Electrician, Senior Authorised Person, Inspector under BS 7671), HNC / HND / degree-level qualifications, and competent-person scheme membership in your own right."
            onSite="The L3 apprentice already on the pathway should know the next steps. Talk to your supervisor about AM2 booking timing — typically late in the apprenticeship, with NVQ portfolio evidence accumulated through the L3 experience. The portfolio evidence captures the actual jobs you have worked on, the certificates you have contributed to, the supervised tests you have run. Treat each visit as a portfolio item: what you did, what you learned, what evidence captures it. The disciplined L3 apprentice walks into AM2 with a portfolio that is already complete."
          >
            <p>
              The post-L3 progression milestones:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>AM2 / AM2S end-point assessment</strong> — practical
                and theory test; the gateway to the qualification.
              </li>
              <li>
                <strong>NVQ Level 3 Electrotechnical Services</strong> —
                portfolio evidence of competence across the apprenticeship
                experience.
              </li>
              <li>
                <strong>ECS gold card</strong> — proof of qualified-electrician
                status; site-access requirement on most CSCS sites.
              </li>
              <li>
                <strong>JIB grades</strong> — Electrician, Approved
                Electrician, Technician; pay scales and CPD requirements
                attached.
              </li>
              <li>
                <strong>Specialist schemes</strong> — EV (OZEV), PV (MCS),
                heat pump (MCS), inspector under BS 7671 EICR Best Practice
                Guide.
              </li>
              <li>
                <strong>Higher education</strong> — HNC, HND, degree-level for
                design / engineer / manager pathway.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 134.2.1"
            clause={
              <>
                "During erection and on completion of an installation or an addition or alteration to an installation, and before it is put into service, appropriate inspection and testing shall be carried out by one or more skilled persons competent to verify that the requirements of BS 7671 have been met. Appropriate certification shall be issued in accordance with Chapter 64."
              </>
            }
            meaning={
              <>
                The capstone visit ends with inspection, testing and certification by a skilled person competent to verify compliance. As an L3 apprentice you support the &ldquo;skilled person&rdquo; who signs &mdash; you don&apos;t self-certify on your own authority. Reg 134.2.1 is the regulation that makes that sponsoring sign-off mandatory, not a courtesy.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 134.2.1, verbatim."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 — Reg 651.5"
            clause={
              <>
                "The periodic inspection and testing shall be carried out by one or more skilled persons competent in such work."
              </>
            }
            meaning={
              <>
                Where the capstone job spans both fault rectification and a periodic inspection element, Reg 651.5 puts the same competence requirement on the inspecting person. The reflective-practice habit you build at L3 is what evidences that competence in five years&apos; time when you&apos;re the person being signed off as the skilled inspector.
              </>
            }
            cite="Source: BS 7671:2018+A4:2026 — Reg 651.5, verbatim."
          />

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Skipping the AAR because 'the visit went fine'"
            whatHappens={
              <>
                Apprentice completes a visit; customer satisfied; certificate issued; drives home.
                Doesn't run the AAR because there were no obvious problems. Three months later, on a
                superficially similar visit, the same subtle issue appears again &mdash; and the
                apprentice has no recorded reflection from the previous visit to draw on. Repeats
                the same minor mistake. The AAR would have captured the small lessons (the customer
                pattern, the borderline reading, the unfamiliar accessory) that compound over a
                career.
              </>
            }
            doInstead={
              <>
                Run the AAR after every significant visit, even (especially) when it went fine. The
                "what went well, what could go better" capture is small but cumulative. Five minutes
                per visit, twenty visits per month, twelve months &mdash; that's twenty hours of
                reflection per year compounding into mature competence.
              </>
            }
          />

          <CommonMistake
            title="Hiding a near-miss because of fear of blame"
            whatHappens={
              <>
                Apprentice has a close call &mdash; cuts a cable they thought was dead and it
                sparked, no harm done. Decides not to report because they're worried about getting
                in trouble. Six months later another team member meets the same condition (a
                drawing that mis-identifies a circuit) but is less lucky and is electrocuted. The
                investigation finds the original near-miss in the apprentice's memory but not in
                the firm's records; the firm couldn't act on what wasn't reported. The apprentice
                lives with the knowledge for a career.
              </>
            }
            doInstead={
              <>
                Report the near-miss honestly to the supervisor on the day. If the firm has a just
                culture, the response is learning &mdash; the drawing gets corrected, a procedure
                is updated, the apprentice's experience helps the team. If the firm punishes
                near-miss reports, the firm is failing in its safety culture and the L3 apprentice
                should reflect on whether to stay long-term &mdash; but in the moment, the report
                is still the right action.
              </>
            }
          />

          <Scenario
            title="Capstone — the kitchen RCD trip that revealed two more problems"
            situation={
              <>
                Customer in a 1985-built semi-detached reports their kitchen RCD trips when the
                kettle is used. They've had this for a fortnight. You're allocated a 2-hour visit
                with the supervisor on phone-call backup. The customer has a Wylex consumer unit
                fitted in 1998 (last refit). You arrive at 09:00.
              </>
            }
            whatToDo={
              <>
                09:00 GREET + BRIEF; 09:10 isolate the kitchen ring at the Wylex DB, lock-off,
                prove dead at the kitchen socket; 09:20 visual inspection of the kettle (Bosch
                TWK7203) &mdash; element looks clean, no obvious damage. Energise; full Part 6
                testing on the kitchen ring &mdash; R1+R2 0.42&nbsp;&Omega;, IR over 200&nbsp;M&Omega;
                cold, Zs 0.51&nbsp;&Omega; (within limits), RCD trip-time 24&nbsp;ms (good).
                Ring tests fine when isolated from the kettle. 09:40 plug the kettle into a known
                socket and IR-test the kettle's element &mdash; cold reads 8.2&nbsp;M&Omega;
                (acceptable). Boil a kettle of water (3 minutes); IR-test immediately
                &mdash; reads 0.18&nbsp;M&Omega; (FAILED, well below 1&nbsp;M&Omega; threshold).
                DIAGNOSTIC CONFIRMED &mdash; degraded element under heat. Recommend customer
                replace the kettle (not strictly your job &mdash; it's the customer's portable
                appliance). 09:55 while at the CU, notice the lighting MCBs are not RCD-protected
                (a 1998 Wylex layout is typical &mdash; only the ring final got the original
                RCD; lighting was not RCD-protected at the time and current standards require
                30&nbsp;mA RCD on lighting under BS 7671 411.3.4 since A3:2015). Code C2 on a
                modern EICR. 10:00 inspect the gas meter cupboard &mdash; no main bonding cable
                visible to the gas service. Code C2. 10:10 quick measurement L-N, L-E, N-E at
                the cut-out &mdash; all sound; no PEN issue. 10:15 BRIEF the customer &mdash;
                "the kettle is the cause of today's RCD trips; replace the kettle and the trip
                will stop. While I was here I also noticed two safety items that don't pose
                immediate danger but should be addressed &mdash; your lighting circuits aren't
                RCD-protected (current standards require this) and you don't have main bonding to
                your gas service. I can quote you for both as a separate visit; total ballpark
                &pound;200&ndash;300 for the bonding fix and &pound;400&ndash;500 for adding RCD
                protection on lighting via a CU partial-upgrade or RCBO replacement of the
                lighting MCBs. Are you happy for me to send a written quote?". Customer agrees to
                the quote. 10:30 issue the Minor Works Certificate for today's work (kitchen ring
                tested and verified, no work done on the ring itself), plus a Schedule of
                Observations listing the two findings. 10:40 hand-back + customer signature.
                10:50 leave site. 11:30 phone supervisor on the way back &mdash; brief the AAR
                (visit went fine, additional findings flagged, quote going out). 12:00 office
                logs the quote for follow-up.
              </>
            }
            whyItMatters={
              <>
                The capstone visit demonstrates the full Unit 303 framework in one realistic
                scenario &mdash; H&S framework (isolation, GS38 instruments), instruments (MFT,
                cold-vs-hot IR), fault types (insulation breakdown under heat), logical diagnosis
                (rule out the circuit, isolate the appliance, prove the failure mode),
                rectification (recommend appliance replacement &mdash; the right scope), and
                documentation (MWC for today, Schedule of Observations for the additional
                findings). PLUS the metacognitive layer &mdash; recognising the additional
                findings as duties not options, briefing the customer fairly, escalating the
                further work appropriately, running the AAR back at base. This is what L3
                competence looks like in the wild.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Multi-fault visits need prioritisation — life-safety first (HSWA s.3 duty), contracted work second, additional findings documented and briefed.",
              "After Action Review (4 questions, 5 minutes) converts each visit into learning — same-day, written down, honest, actionable, shared.",
              "Kolb's experiential learning cycle drives apprentice progression — experience, reflection, conceptualisation, experimentation.",
              "Just culture distinguishes honest mistake (learn), at-risk behaviour (coach), reckless behaviour (discipline), system failure (redesign).",
              "Near-miss reporting is the early-warning system — every major incident has a trail of unreported precursors.",
              "L3 mindset shift: 'system as patient I'm investigating', not 'system I'm building' — internalise this and the technical content flows from it.",
              "Portfolio captures BOTH technical work (job sheets, certs, photos) AND structured reflection (Kolb / Gibbs cycle entries) — both are assessed.",
              "L3 to AM2 to JIB Electrician to Approved Electrician to Technician — the progression depends on continuing CPD and reflective practice.",
            ]}
          />

          <Quiz title="Capstone case + reflective practice — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate("/study-centre/apprentice/level3-module4-section6-3")}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">6.3 Specialised systems — three-phase, EV, PV</div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module5')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Module complete <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">Back to Module 4 overview</div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
