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
      "Just fix the kettle.",
      "Three-step engineering response. (1) RECTIFY the original reported fault — the kettle issue — within the visit's scope; the customer asked for it and it's the agreed work. (2) DOCUMENT the additional findings on a separate Schedule of Observations / Recommendations OR insist on issuing an EICR for the broader installation if the customer agrees. The unprotected lighting and missing bonding are SAFETY findings that the apprentice cannot ignore (EAWR Reg 4 + 14 — duty to make systems safe; HSWA s.3 — duty to non-employees). (3) BRIEF the customer verbally — 'while I was here, I noticed two safety items I need to flag; here's what they are, here's what current standards require, here's what it would cost to address them; the work I've done today fixes the immediate issue you reported, but I recommend you address these others soon and I'd be happy to quote'. Documenting + briefing IS the L3 apprentice's duty even if the customer declines the additional work.",
      "Force the customer.",
      "Refuse to leave.",
    ],
    correctIndex: 1,
    explanation:
      "Multi-fault visits are real-world. The L3 apprentice's duty under EAWR + HSWA is to flag safety findings even when the customer didn't ask. The right response is — fix what you were asked to fix, document and verbally brief the additional findings, give the customer the choice to address them. Forcing the customer is wrong; ignoring the findings is also wrong.",
  },
  {
    id: "mod4-s6-sub4-after-action",
    question:
      "You've finished a complex visit that involved diagnosing and rectifying a borrowed-neutral fault in an old domestic installation. Driving back to the depot, what's the structured way to review the visit so you actually learn from it?",
    options: [
      "Forget about it.",
      "Use the After Action Review (AAR) framework — four questions, 5 minutes thinking time, written down (in your phone notes or the firm's job system). (1) WHAT WAS SUPPOSED TO HAPPEN? — your plan at the start of the visit (e.g. diagnose RCD trips, replace a faulty accessory). (2) WHAT ACTUALLY HAPPENED? — the borrowed neutral was unexpected; the visit took 2 hours longer than planned. (3) WHY WAS THERE A DIFFERENCE? — the original installation predated current standards; the EICR you were given did not flag the borrowed neutral; you didn't ask the supervisor to attend earlier. (4) WHAT WILL YOU DO DIFFERENTLY NEXT TIME? — on pre-1990 installations, suspect borrowed neutrals before they appear; ask the supervisor to attend at the first sign of cross-circuit current. Done weekly, the AAR turns a year's visits into a year's learning. Skipping it means you make the same mistake on the next visit.",
      "Just go home.",
      "Blame someone.",
    ],
    correctIndex: 1,
    explanation:
      "After Action Review is the structured reflection technique used in high-stakes professional fields (military, surgery, aviation). The four questions take 5 minutes and convert each visit into a learning event. Skipping the reflection is the slow-learner pattern; doing it is the fast-learner pattern. The L3 to L4 progression depends on this discipline.",
  },
  {
    id: "mod4-s6-sub4-kolb",
    question:
      "What's the Kolb learning cycle and why does it apply to L3 fault diagnosis training?",
    options: [
      "Just theory.",
      "Kolb's experiential learning cycle has four stages: (1) CONCRETE EXPERIENCE — you do the work (the rectification visit). (2) REFLECTIVE OBSERVATION — you think about what happened (the AAR, supervisor debrief). (3) ABSTRACT CONCEPTUALISATION — you connect the experience to the underlying theory (this borrowed neutral is the textbook 'old installation, single-cable run, sparks borrowed from the ring' pattern). (4) ACTIVE EXPERIMENTATION — you apply the new understanding to the next visit (you now check for borrowed neutrals proactively on pre-1990 installations). The cycle is iterative — each visit feeds the next. Without conscious reflection, the loop never closes and the apprentice keeps making the same first-time mistakes. The L3 syllabus is designed around this cycle; Module 4 is the most experiential of the L3 modules.",
      "Old fashioned.",
      "Just for college.",
    ],
    correctIndex: 1,
    explanation:
      "Kolb's cycle is the foundation of modern apprenticeship pedagogy. The L3 apprentice's job site visits are not just work — they are the experiential layer of the cycle. The reflective + conceptual + experimentation stages turn the experience into learning. This is why your tutor asks for portfolio reflections after work placements; it's not box-ticking, it's the learning loop.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      "On a multi-fault visit, what's the prioritisation framework for which fault to address first?",
    options: [
      "Easiest first.",
      "Three-tier prioritisation. (1) IMMEDIATE DANGER — anything that's a Code 1 (Danger Present) on the EICR equivalent — exposed live conductors, no main bonding on a TN-S installation, faulty RCD on a TT installation. Address first regardless of customer agreement (EAWR Reg 4 duty). (2) AGREED WORK — the original reported fault that the customer asked for; address per the agreed scope. (3) ADDITIONAL FINDINGS — non-immediate-danger items found during the visit (Code 2 / Code 3 equivalents — supplementary bonding gaps, older non-current devices, IR readings borderline). Document, brief the customer, quote separately. The framework matches the EAWR / BS 7671 hierarchy — life safety, contracted work, recommended improvements.",
      "Random.",
      "Customer's mood.",
    ],
    correctAnswer: 1,
    explanation:
      "Prioritisation on multi-fault visits is a competence test. Life-safety items take precedence over the customer's preferred sequencing; the contracted work follows; additional findings are documented and offered. The framework is principled and defensible.",
  },
  {
    id: 2,
    question:
      "An L3 apprentice has just completed their first solo (under remote phone supervision) rectification visit. The work went well. What does 'good practice' look like in the de-brief with the supervisor?",
    options: [
      "Skip it.",
      "Structured de-brief — the supervisor's job is to draw out the learning, the apprentice's job is to be honest. Topics to cover: (1) DIAGNOSIS — was the fault what you expected from the brief? Were there surprises? (2) ISOLATION — did your isolation procedure work cleanly? Any near-misses? (3) RECTIFICATION — did the work go as planned? Any unexpected complications? (4) TESTING — did the verification confirm the rectification? Any borderline readings? (5) DOCUMENTATION — is the certificate complete and accurate? (6) CUSTOMER — was the hand-back smooth? Any feedback to capture? The de-brief is 15&ndash;20 minutes, ideally same-day while memory is fresh. The supervisor builds an accurate picture of the apprentice's developing competence; the apprentice hears their work reviewed and learns. A successful visit + a structured de-brief is more valuable than a successful visit + no review.",
      "Drink it off.",
      "Move on.",
    ],
    correctAnswer: 1,
    explanation:
      "The de-brief is the supervisor's coaching moment. For the apprentice, openness about what was uncertain or difficult is more valuable than a rosy 'all went fine' summary. The supervisor uses the de-brief to scope the next level of independence — more solo work as competence builds, more direct supervision when uncertainty appears.",
  },
  {
    id: 3,
    question:
      "What's the difference between a 'learning organisation' and a 'compliance-only' firm in the context of fault diagnosis work?",
    options: [
      "Same thing.",
      "Compliance-only — the firm does the work, issues the certificate, files the documentation, meets the regulations, repeats. Learning organisation — the firm does all of that PLUS captures lessons from each job (what worked, what didn't, what to change), feeds them back into training and procedure, and improves over time. The difference shows up in fault recurrence rates (learning firms have fewer comebacks), in apprentice progression speed (learning firms develop competence faster), in customer satisfaction (learning firms build patterns that customers come to trust). The L3 apprentice's job is to support the learning side — bring observations from visits back to the office, contribute to toolbox talks, suggest procedure improvements. Most firms aspire to be learning organisations; the apprentice's input is part of how they become one.",
      "Cost.",
      "Size.",
    ],
    correctAnswer: 1,
    explanation:
      "Learning organisations outperform compliance-only firms over time. The L3 apprentice's contribution is to bring observation back from the field — the borderline reading, the new product, the customer pattern, the surprise. The firm's structure (toolbox talks, monthly review meetings, near-miss reporting) is what converts the input into learning.",
  },
  {
    id: 4,
    question:
      "What's a 'near-miss' in fault diagnosis and why should it be reported even if no harm occurred?",
    options: [
      "Just luck.",
      "Near-miss = an unsafe condition or unsafe action that could have caused harm but didn't, by chance or by intervention. Examples in fault diagnosis — apprentice cuts a cable they thought was dead and it sparks (lucky there was no harm); a tool drops from a ladder onto an empty workspace; a meter is touched to a live conductor through poor probe technique. Near-miss reporting is the early-warning system — the same condition will eventually cause harm if not addressed. Most major incidents have a trail of near-misses preceding them (the 'Heinrich pyramid' or similar safety models). Reporting near-misses is normalised in safety-mature organisations; suppressing them (because of fear of blame) is the cultural pattern that precedes major incidents. The L3 apprentice's job is to report their near-misses honestly and to learn from others' reports.",
      "Forget it.",
      "Cover up.",
    ],
    correctAnswer: 1,
    explanation:
      "Near-miss reporting is one of the most powerful safety learning tools available. The HSE actively encourages it through the Reporting of Injuries, Diseases and Dangerous Occurrences Regulations 2013 (RIDDOR) framework — RIDDOR is for reportable incidents but the firm's internal near-miss reporting catches the lower-severity precursors. The L3 apprentice's culture of honest reporting is what keeps the firm safe over time.",
  },
  {
    id: 5,
    question:
      "The 'just culture' framework distinguishes between honest mistakes and reckless behaviour. How does this apply to fault diagnosis errors?",
    options: [
      "Same thing.",
      "Just culture — the firm separates HONEST MISTAKE (well-trained competent person made a reasonable error under the circumstances; the response is learning, training, procedure improvement) from AT-RISK BEHAVIOUR (person knew the safer option but chose the riskier; the response is coaching) from RECKLESS BEHAVIOUR (person knowingly took unjustifiable risk; the response is disciplinary). The framework prevents the unfair pattern where well-meaning people get punished for honest mistakes (which kills the reporting culture) AND the equally unfair pattern where reckless behaviour gets dismissed as 'just a mistake'. For L3 apprentice fault diagnosis, the framework supports the learning environment — you can report a genuine mistake without fearing your career; you can't get away with deliberately skipping isolation.",
      "Just luck.",
      "Punish all.",
    ],
    correctAnswer: 1,
    explanation:
      "Just culture is one of the foundational concepts in modern safety thinking. It came from aviation and healthcare originally and is now widely adopted in the construction and electrical industries. The L3 apprentice's experience of just culture is what determines whether they grow into a confident, honest, safety-conscious electrician or a defensive, hidden-mistake-making one.",
  },
  {
    id: 6,
    question:
      "How does the apprentice's portfolio (the C&G EAL portfolio of evidence) capture the reflective-practice element of fault diagnosis training?",
    options: [
      "Just photos.",
      "The portfolio captures: (1) WORK EVIDENCE — job sheets, certificates, photos of the work in progress and completed. (2) REFLECTION — written reflections on each significant piece of work, using a structured format (often Gibbs' or Kolb's reflective cycle) — what was the situation, what did you do, what was the result, what would you do differently. (3) WITNESS TESTIMONY — the supervisor / on-site mentor signs off that the work was witnessed and the standard was met. (4) UNIT MAPPING — each piece of evidence is mapped to the relevant 2365 unit and Assessment Criterion. The reflection is the 'learning' part — the portfolio doesn't just prove you DID the work, it proves you LEARNED from it. The L3 to L4 / Approved Electrician progression assesses the portfolio as much as the technical work.",
      "Just signatures.",
      "Just years.",
    ],
    correctAnswer: 1,
    explanation:
      "The C&G 2365-03 portfolio is built around the assumption that L3 competence is technical knowledge PLUS reflective ability. The reflection sections are not optional decoration; they're the evidence that the apprentice has internalised the learning, not just performed the task. Skimping on the reflection is shorting the portfolio's most-valued component.",
  },
  {
    id: 7,
    question:
      "What's the L3 apprentice's response when a rectification reveals a deeper underlying problem (e.g. fixing one connection reveals that the entire ring main has been wired with under-rated cable)?",
    options: [
      "Hide it.",
      "STOP, document, escalate. The L3 apprentice's authority does not extend to redesigning a circuit on the spot or to taking over a job that's grown massively in scope. Right response: (1) STOP the current rectification at the point where the deeper issue is now visible. (2) DOCUMENT what was found (mobile photos, sketch of the wiring layout, cable size noted). (3) MAKE-SAFE the installation in its current state — circuits isolated where dangerous, others restored. (4) ESCALATE to the supervisor by phone — describe what was found, send the photos. (5) BRIEF the customer — the original work is on hold pending a fuller assessment; here's what was found; the supervisor will be in touch. (6) WAIT for the supervisor's decision — they may attend immediately, schedule a separate visit, or call in additional resource. Pushing through alone is dangerous (you're now beyond your scope) and unfair to the customer (they may face a much larger bill that needs informed consent).",
      "Push through.",
      "Walk away.",
    ],
    correctAnswer: 1,
    explanation:
      "Scope-explosion mid-job is one of the trickier L3 situations. The right response is structured — stop, document, make-safe, escalate, brief the customer, wait. EAWR Reg 16 (competence) plus the fairness duty to the customer (informed consent on the bigger work) both require this approach.",
  },
  {
    id: 8,
    question:
      "Looking back across all of Module 4 (Unit 303), what's the single most important L3 mindset shift compared to L2 installation work?",
    options: [
      "Same mindset.",
      "The shift from 'the system is what I'm building' to 'the system is the patient I'm investigating'. At L2 you assumed the installation was as designed, the cables were as specified, the breakers were correctly identified, the protective measures were intact. At L3 fault diagnosis, EVERY one of those assumptions is explicitly suspended — you're investigating exactly because something has departed from the design, and you can't know in advance which assumption has broken. Every reading is hypothesis-testing. Every isolation is verification. Every rectification is a precise intervention on an existing system. The mindset is closer to a doctor diagnosing a patient than to a builder assembling a structure. That's the L3 step-up — and once you've internalised it, all the technical content of Module 4 (instruments, fault types, logical diagnosis, rectification, documentation) flows from it.",
      "Tools change.",
      "Pay rises.",
    ],
    correctAnswer: 1,
    explanation:
      "The mindset shift is the metacognitive heart of Module 4. The technical content matters; the mindset is what makes the technical content effective. Apprentices who internalise the 'system as patient' framing become better diagnosticians faster; those who treat fault diagnosis as another form of installation tend to make the assumption-based mistakes that lead to incidents. This is the unit's underlying message.",
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
