/**
 * Module 7 · Section 5 · Subsection 1 — Writing CVs and preparing for interviews
 * Maps to C&G 2365-03 / Unit 308 / LO3 / AC 3.x
 *   AC — "Identify the methods for seeking employment in the electrical industry".
 *
 * CV structure for electricians (the qualifications-first ordering used in
 * trade hiring), describing experience with specifics rather than generics,
 * ECS card grades on CVs, the STAR technique for competency questions,
 * interview-day preparation, practical trade tests, and post-interview
 * follow-up.
 */

import { useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';

import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE = 'Writing CVs and preparing for interviews | Level 3 Module 7.5.1 | Elec-Mate';
const DESCRIPTION =
  'Building an electrician-specific CV, describing trade experience effectively, ECS card grades on CVs, STAR technique for interviews, practical trade tests and the follow-up.';

const checks = [
  {
    id: 'mod7-s5-sub1-cv-focus',
    question: "What should be the primary focus of an electrician's CV?",
    options: [
      "Relevant qualifications, ECS card grade, types of work done, equipment competencies and specific projects — the evidence employers need to decide whether you can do the role. Trade hiring is qualifications-first; the rest is context.",
      "A detailed personal statement at the top describing your character, values and life story, so the employer gets to know you as a person before they look at the technical detail.",
      "A polished visual design — colour, graphics, an unusual layout and a photograph — that makes the CV stand out visually from the pile, since first impressions are mostly about presentation.",
      "A comprehensive list of every job you have ever held since school, in full detail and equal weight, so the employer can see the complete picture of your working life.",
    ],
    correctIndex: 0,
    explanation:
      "Electrical CVs are read in 30-60 seconds by busy QSs. Lead with qualifications (Level 3, AM2 / AM2S, ECS card grade, 2382 edition, any specialist tickets like 2391 or 2919). Follow with employment history showing types of work. Skills section comes next. Hobbies, personal statements and design flourishes get in the way of the qualifications scan.",
  },
  {
    id: 'mod7-s5-sub1-describe-experience',
    question: 'When describing a previous role on your CV, you should:',
    options: [
      "Keep it short and general — 'general electrical work' covers everything and avoids tying yourself to one type of job, leaving the employer free to imagine you in any role.",
      "Focus on soft skills and personality — describe yourself as hard-working, reliable and a good team player, since these matter more to employers than the technical detail of past jobs.",
      "Include specific types of work, project examples, scale (sites, team size, project values where appropriate), equipment used, certifications issued and any supervisory responsibility. Generic phrasing like 'general electrical work' doesn't help the reader.",
      "List your duties as a long bullet list of day-to-day tasks (turned up on time, tidied the van, made tea) so the employer sees you are diligent about the basics.",
    ],
    correctIndex: 2,
    explanation:
      "Specifics beat generics every time. 'Commercial fit-out projects (offices, retail), 1st-fix and 2nd-fix, containment up to 200x100 cable tray, fire alarm install (Cat A only), EIC and EICR issuing as named tester' is far more useful than 'general installation work'. Reader gets a clear picture of what you can do; you stand out from CVs that all say the same generic thing.",
  },
  {
    id: 'mod7-s5-sub1-star',
    question: "When answering a competency question in an interview, the STAR technique stands for:",
    options: [
      "Stop, Think, Answer, Recap. Structure: pause before answering, think through the question, give your answer, then recap the key point. A four-step memory aid for staying calm under interview pressure.",
      "Situation, Task, Action, Result. Structure: describe the Situation (context, where, when); the Task (what needed doing); the Action you specifically took; the Result. Keeps answers focused and complete without rambling.",
      "Skills, Training, Achievements, References. The four headings a competency answer should cover — list your relevant skills, your training, what you have achieved and who can vouch for you.",
      "Specific, Timed, Accurate, Relevant. The four qualities a good interview answer should have — be specific, keep to time, be accurate and stay relevant to the question.",
    ],
    correctIndex: 1,
    explanation:
      "STAR is the standard framework for competency-based questions ('tell me about a time when...'). Without structure, candidates either say too little (one-sentence answers) or ramble for 5 minutes. STAR keeps the answer to 60-90 seconds with all the relevant detail. Rehearse 5-6 STAR stories from your experience — they cover most competency questions an interviewer will ask.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: "The ideal length for an electrician's CV is typically:",
    options: [
      'One side of A4 only, no matter how much experience you have, so the reader never has to turn the page.',
      'Two pages maximum, with the qualifications and key experience on page one.',
      'As many pages as it takes to list every job, course and project in full — a longer CV shows a fuller career.',
      'Exactly five pages, the standard length expected for a skilled-trade application.',
    ],
    correctAnswer: 1,
    explanation:
      "Two pages is the practical limit. Most trade hiring decisions are made from the first half of page one. Put qualifications and ECS card grade up top; put the most recent / most relevant employment immediately after; older roles can be summarised briefly toward the end of page two. Anything that doesn't fit gets cut.",
  },
  {
    id: 2,
    question: "Your ECS card grade should appear on your CV because:",
    options: [
      'It is a legal requirement to print your ECS card number on every CV; an application without it is automatically rejected by the JIB.',
      'It guarantees you the job — holding a Gold card means an employer must hire you ahead of any candidate without one.',
      'It is industry-standard independent verification of your qualifications and competence level — a recruiter or QS recognises Gold / Blue / White / Green at a glance and immediately knows what you can do.',
      'It replaces the need to list any qualifications — the card grade alone tells the employer everything, so the rest of the qualifications section can be left off.',
    ],
    correctAnswer: 2,
    explanation:
      "ECS card grade is the trade shorthand for your level. 'Gold ECS — Approved Electrician' tells a QS more in 4 words than a paragraph of self-description. Include card grade, JIB grade if higher, and the expiry date / valid-to date. If your card is expiring soon, note 'renewal in progress' to avoid concern.",
  },
  {
    id: 3,
    question: "A 'skills-based' or functional CV format is useful when:",
    options: [
      'Always — a functional CV is the correct format for every electrician because grouping by skill is clearer than listing jobs in date order.',
      'When you have a long, unbroken record at a single employer and want to show loyalty by listing the years in strict order.',
      'When applying for your first apprenticeship, because you have no work history and a skills layout hides that fact from the employer.',
      'You want to highlight transferable skills, have gaps in employment, are changing speciality, or have varied experience that doesn\'t fit a straightforward chronology.',
    ],
    correctAnswer: 3,
    explanation:
      "Functional / skills-based CVs group experience by skill area rather than chronology — useful for career changers, return-to-work after a gap, or candidates with very varied experience. For most working electricians chronological is clearer. The functional format can read as 'hiding something' to suspicious readers — use only when there's a positive reason.",
  },
  {
    id: 4,
    question: "When asked 'tell me about yourself' in an interview, you should:",
    options: [
      'Give a 1-2 minute summary covering relevant experience, key skills, and what you\'re looking for next. Cover the parts of your CV most relevant to this role and stop.',
      'Start from your childhood and walk through your whole life story in order, so the interviewer understands how you got to where you are.',
      'Read your CV out loud word for word from top to bottom, to make sure the interviewer has not missed anything on the page.',
      'Keep it to a single sentence — say your name and that you are a qualified electrician, then wait for the next question.',
    ],
    correctAnswer: 0,
    explanation:
      "'Tell me about yourself' is the most common opening question and many candidates blow it. The right answer is a prepared 60-120 second summary of your relevant experience and ambitions, tailored to the role. Rehearse it. Don't read your CV (the interviewer has read it). Don't start with childhood. Get to the relevant bits fast.",
  },
  {
    id: 5,
    question: "Questions to ask at the end of an interview should:",
    options: [
      "Lead with pay and holiday — ask about salary, overtime rates, holiday entitlement and pension before anything else, since these are what really matter.",
      "Show genuine interest in the role, the work, the team, the firm's direction and development opportunities. Prepare 4-5 questions; ask 2-3 in the interview based on what's already been covered.",
      "Say you have no questions — it shows the interviewer covered everything clearly and that you are easy-going and ready to start.",
      "Ask challenging questions that test the interviewer, such as quizzing them on a tricky regs point, to demonstrate that you know your stuff.",
    ],
    correctAnswer: 1,
    explanation:
      "Prepared questions show interest and let you assess fit. Good questions to keep in reserve: 'What does the team look like?', 'What are the firm's priorities over the next 12 months?', 'What's the development pathway here for someone with my qualifications?', 'How does the firm handle apprentice-to-qualified transition?'. Ask 2-3 of these once the interviewer asks 'do you have any questions for us?'.",
  },
  {
    id: 6,
    question: "Gaps in employment history on a CV should be:",
    options: [
      'Hidden by adjusting the dates of your jobs so the years run on continuously with no visible gap — a small white lie that nobody checks.',
      'Filled with an invented job at a firm that has since closed down, so there is nothing for the employer to verify and the gap disappears.',
      'Acknowledged briefly and explained positively where relevant — illness, family responsibilities, retraining, travel, redundancy. Dishonesty about dates is discovered easily and ends the application.',
      'Left completely unexplained and never mentioned — if the interviewer does not ask about a gap, you should not draw attention to it.',
    ],
    correctAnswer: 2,
    explanation:
      "Honesty about gaps is far better than fabrication. Most interviewers are pragmatic about gaps — illness, family, redundancy, retraining all happen. A short factual note ('2023-2024: full-time carer for family member') is fine. Lying about dates is discovered easily (HMRC records, employment references, NI contributions trail) and instantly disqualifies. Don't.",
  },
  {
    id: 7,
    question: "What should you NOT do in an interview?",
    options: [
      'Ask questions about the role, the team and development opportunities when invited to at the end.',
      'Give specific, structured examples from your own experience when answering competency questions.',
      'Arrive ten to fifteen minutes early, bring your certificates and ECS card, and dress smart-casual.',
      'Criticise previous employers, colleagues or competitors — even when the criticism is fair. It raises concerns about your discretion and attitude. Stick to neutral, positive framings of why you\'re moving on.',
    ],
    correctAnswer: 3,
    explanation:
      "Never criticise previous employers in an interview. Even when the criticism is justified, it reads as poor discretion and risks the interviewer thinking 'will they criticise us like that next time round?'. Stick to neutral framings: 'I'm looking for more variety / more commercial work / more responsibility' rather than 'my old boss was terrible'. Professionalism wins.",
  },
  {
    id: 8,
    question: "Practical or trade tests as part of the interview process are:",
    options: [
      "Common for electrical positions — verifying competence through wiring exercises, fault-finding scenarios, regs questions, or supervised on-site work for a half-day. Treat them seriously; they're often the decisive part of the hiring decision.",
      "Banned in the UK — employers are not allowed to set a practical test as part of recruitment because it counts as unpaid work, so any firm doing so is breaking the law.",
      "Only ever used for apprenticeships — once you are qualified, employers rely purely on your certificates and never ask you to demonstrate practical skill again.",
      "A formality that carries no weight — the conversation decides the hire, and the practical test is just a tradition that has no real bearing on the outcome.",
    ],
    correctAnswer: 0,
    explanation:
      "Practical tests are normal in electrical hiring. Common formats: bench wiring exercise (2-3 hours, supervised); fault-finding scenario; open-book regs questions; half-day shadowing on a live site. Treat them like a real job: arrive early, bring tools, be safe, communicate as you work. Many firms make the hire decision largely on the practical, not the conversational interview.",
  },
];

const faqs = [
  {
    question: 'How do I handle being asked about salary expectations?',
    answer:
      "Research market rates for similar roles in your area (JIB rates published; Indeed / Glassdoor for spread). If asked early, deflect politely — 'I'd like to understand the role and the team properly before talking numbers' — and steer the conversation back to fit. When you do answer, give a range based on research and stage of qualification (Installation Electrician vs Approved Electrician). Don't undersell yourself but don't price out of contention either.",
  },
  {
    question: "What if I don't have much trade experience to put on my CV?",
    answer:
      'Lead with qualifications, apprenticeship progression and college projects. Include any workplace experience even if limited (sub-contracting weekends, helping a family electrician, college work placements). Mention transferable skills (customer-facing roles, working at height, tool familiarity from other trades). Show enthusiasm to learn. Apprentices and newly-qualified electricians: it\'s expected the CV is shorter at this stage.',
  },
  {
    question: 'Should I include a photo on my CV?',
    answer:
      "In the UK, photos are not expected and some employers prefer them excluded to reduce unconscious bias risk. Use the page space for more content instead. Exceptions: occasionally required for site-passport applications or some specific employer templates; if asked specifically, supply a professional headshot (not a selfie).",
  },
  {
    question: 'How should I handle the "what are your weaknesses?" question?',
    answer:
      "Avoid the cliché answers ('I work too hard', 'I'm a perfectionist') — they're transparent and unconvincing. Choose a real area you're working on that isn't core to the role you're applying for: 'I'd like to develop my fault-finding speed on older installations — I'm methodical but slower than I'd like, and I'm specifically working on that by shadowing our most experienced fault-finder.' Real + improvement-action = strong answer.",
  },
  {
    question: "What if I'm nervous in interviews?",
    answer:
      "Preparation kills 80% of interview nerves. Practice answers aloud (not just in your head). Research the firm — their work, their customer base, recent projects. Plan the route to the site; arrive 10-15 minutes early. Bring your CV, certificates, ECS card and a pen. Some nerves are normal and even helpful — they show you care. If you need a moment to think, pause and breathe before answering; it's fine.",
  },
  {
    question: 'Can I negotiate salary and conditions?',
    answer:
      "Yes, professionally and after an offer is made. Before the offer, focus on whether the role and team are right. Once you have an offer: thank them, ask for time to consider (24-48 hours is normal), respond with a clear ask if you want to negotiate. Have justification (market rates, your qualifications, the role's responsibilities). Be prepared to compromise. Be gracious whatever the outcome — even rejected negotiations leave a relationship intact.",
  },
  {
    question: 'How do I write a personal statement for an electrical CV?',
    answer:
      "If you include one (some recruiters skip them), keep it to 3-4 sentences max. Cover: your current grade (Installation Electrician with 2391, etc.); the type of work you specialise in; what you're looking for next; one or two distinguishing strengths. Don't fill it with generic phrases like 'hard-working team player' — they're noise. Many trade CVs skip the personal statement entirely; it's not required.",
  },
  {
    question: "Should I list every BS 7671 amendment I've trained for?",
    answer:
      "Mention current regs currency once — '2382-22 (18th Edition + A2:2022)' — under qualifications. If you've recently sat 2382-26 for A4:2026 also mention that. Don't list every amendment historically; it adds clutter. Specialist tickets (2919, 2399, 2391) get their own line each. Health-and-safety quals (ECS HSEA, CSCS) get a single line.",
  },
];

export default function Sub1() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('/study-centre/apprentice/level3-module7-section5')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 7 · Section 5 · Subsection 1"
            title="Writing CVs and preparing for interviews"
            description="Electrician-specific CV structure, describing trade experience effectively, ECS card grades, STAR technique, practical trade tests and the follow-up."
            tone="blue"
          />

          <TLDR
            points={[
              "Electrical CVs are qualifications-first — lead with Level 3, AM2 / AM2S, ECS card grade, 2382 edition, specialist tickets. The trade reader scans this in 30 seconds.",
              "Two pages maximum. Most-relevant content on page one. Cut anything that doesn't help the hiring decision.",
              "Describe experience with specifics — types of work, project scale, equipment, certifications issued. Generic phrasing wastes the reader's attention.",
              "STAR technique (Situation, Task, Action, Result) structures competency-question answers in 60-90 seconds without rambling.",
              "Practical / trade tests are normal in electrical hiring — bench wiring, fault-finding scenarios, regs questions. Often the decisive part of the process.",
              "Never criticise previous employers in interviews; use neutral positive framings of why you're moving on.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Maps to C&G 2365-03 / Unit 308 / LO3 — identify methods for seeking employment in the electrical industry.",
              "Structure a CV appropriate for electrical roles, with qualifications-first ordering.",
              "Describe trade experience with specifics — work types, project scale, equipment, certifications.",
              "Prepare for interviews by researching the employer, the role and likely questions.",
              "Use the STAR technique to answer competency-based questions concisely and completely.",
              "Handle practical / trade tests confidently — bench wiring, fault-finding, regs questions.",
              "Follow up appropriately after interviews; handle outcomes professionally whether successful or not.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>CV structure and content</ContentEyebrow>

          <ConceptBlock
            title="Qualifications-first ordering — how trade hiring actually reads CVs"
            plainEnglish="Trade hiring is qualifications-first. A QS scanning a stack of CVs spends 20-60 seconds on each, looking for: ECS card grade, Level 3 / AM2 status, 2382 currency, specialist tickets (2391, 2919, 2399), and recent employment showing relevant work. Only if those check out does the rest of the CV get read. The structural implication: lead with the qualifications block at the top of page one, then employment history showing types of work, then a short skills section. Personal statements and hobbies are optional and most experienced QSs skip them."
            onSite="The qualifications-first format is different from generic 'careers advice' CV templates that put a personal statement up top. Trade CVs are different — follow the trade convention. Apprentices: this gets stronger the more qualified you are. A newly-qualified electrician with the right ECS card and 2382 currency at the top of page one will out-perform a much more elaborately-presented generic CV every time."
          >
            <p>
              Recommended structure for an electrician&apos;s CV:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Header</strong> &mdash; Name, location (town/city only, not full address), phone, email.
              </li>
              <li>
                <strong>Qualifications</strong> &mdash; Level 3 Diploma, AM2 / AM2S date, ECS card grade + expiry, C&amp;G 2382 edition, C&amp;G 2391, specialist tickets, health-and-safety certs.
              </li>
              <li>
                <strong>Employment history</strong> &mdash; most recent first; for each role include dates, employer, your title, types of work, project scale, equipment used.
              </li>
              <li>
                <strong>Skills</strong> &mdash; technical (test equipment familiarity, cable types worked with, software used), trade-specific (containment systems, fault-finding speciality, sectors).
              </li>
              <li>
                <strong>CPD</strong> &mdash; recent training, manufacturer courses, regs updates within the last 2 years.
              </li>
              <li>
                <strong>References</strong> &mdash; available on request; have two ready (current / recent employer + character reference).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Two pages maximum — what to keep and what to cut"
            plainEnglish="Two pages is the standard maximum. Beyond that, the reader skips or skims and your strongest evidence gets buried. The job is to put the highest-value information on page one and let page two carry the supporting detail. For most working electricians, two pages is comfortable. For apprentices and recently-qualified, one strong page is better than two stretched pages. For very senior electricians (15+ years, multiple specialisms, supervisory experience), two pages can still work if disciplined."
            onSite="What to cut when running long: older employment (summarise pre-10-years roles to one line each); generic skills statements that don't differentiate; the personal statement; education before Level 3 (just list the highest relevant qualifications); long hobby sections. What to keep: every relevant qualification with dates; current employment in detail; specialist tickets; recent CPD. The page-one test: would a busy QS understand my level and my recent work just from page one?"
          >
            <p>
              Trim-priority order when running long:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Personal statement (often optional).</li>
              <li>Hobbies and interests.</li>
              <li>Older employment (10+ years ago, summarise to one line each).</li>
              <li>Pre-Level-3 education (GCSEs only need a single summary line).</li>
              <li>Generic skills statements (&quot;team player&quot;, &quot;hard worker&quot;).</li>
              <li>Photo / design embellishments.</li>
            </ul>
          </ConceptBlock>

          <InlineCheck
            id={checks[0].id}
            question={checks[0].question}
            options={checks[0].options}
            correctIndex={checks[0].correctIndex}
            explanation={checks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Describing your experience effectively</ContentEyebrow>

          <ConceptBlock
            title="Specifics beat generics — what good experience descriptions look like"
            plainEnglish="Generic phrases like 'general electrical work' or 'various installation tasks' tell the reader nothing. Trade-specific specifics differentiate you and signal what work you can step into. For each role include: types of work (domestic / commercial / industrial mix; rewiring; consumer unit upgrades; new builds; fit-out; maintenance); project examples (size, scale, sectors — schools, retail, offices, factories); equipment competencies (specific test equipment brands, containment types, fire alarm panels, EV chargers); certifications you've issued (EIC, EICR, Minor Works); any supervisory responsibility (team size, apprentice mentoring, named-tester status)."
            onSite="Quantify where possible. 'Led a team of 3 on a 2-month retail fit-out (£180k project value)' is far more useful than 'team leader on retail projects'. 'Issued 40+ EICRs / quarter as named tester on the commercial scheme work' beats 'experienced in inspection and testing'. Numbers, sectors, equipment names, project values where appropriate — these tell the reader what you can actually do."
          >
            <p>
              For each previous role, cover:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Types of work</strong> &mdash; domestic, commercial, industrial; 1st-fix, 2nd-fix, maintenance, T&amp;C work.
              </li>
              <li>
                <strong>Project examples</strong> &mdash; sectors (retail, office, education, healthcare, industrial), scale, occasional named projects.
              </li>
              <li>
                <strong>Equipment</strong> &mdash; test gear brands, containment types, panel brands, EV / PV brands.
              </li>
              <li>
                <strong>Certifications issued</strong> &mdash; EIC, Minor Works, EICR; named-tester / QS status.
              </li>
              <li>
                <strong>Supervisory responsibility</strong> &mdash; team size, apprentice mentoring, lead-electrician roles.
              </li>
              <li>
                <strong>Quantification</strong> &mdash; project values, team sizes, certificate volumes where you can.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Tailoring per application — emphasis not rewrites"
            plainEnglish="Tailoring a CV doesn't mean rewriting it for every role. It means adjusting emphasis — promoting the most relevant experience to the top of each section, expanding on the relevant specialties, and trimming less-relevant areas. If the role emphasises commercial fit-out, expand your commercial experience and shorten your domestic. If it emphasises EICR / inspection, lead with your 2391 and named-tester work. The qualifications block typically stays the same; the experience descriptions adjust."
            onSite="Keep a 'master CV' with all your experience in full detail. For each application, copy it, then trim and re-order for that specific role. Should take 10-15 minutes per application, not 2 hours. Many candidates send the same generic CV to every role — tailored CVs stand out by an outsized amount because of this."
          >
            <p>
              What to tailor per application:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>Order of experience descriptions within each role.</li>
              <li>Emphasis on specialist tickets relevant to the role.</li>
              <li>Length of each role&apos;s description (expand relevant, trim less-relevant).</li>
              <li>Skills section ordering.</li>
              <li>Personal statement if you use one.</li>
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

          <ContentEyebrow>Interview preparation</ContentEyebrow>

          <ConceptBlock
            title="Pre-interview research — the firm, the role, the people"
            plainEnglish="Most interviewers can tell within the first few minutes whether the candidate has done any preparation. Research the firm: their website, the type of work they advertise, recent projects (LinkedIn, news, CompaniesHouse for accounts), their CPS scheme registrations. Understand the role: what the job advert actually says, the qualifications it requires, the working pattern. If you know the interviewers in advance, look at their LinkedIn — what's their background, how long have they been at the firm, what specialisms do they have. Preparation lets you ask better questions and give more relevant answers."
            onSite="Don't recite back what you found — that's awkward. Use the research to inform your answers and questions naturally. 'I saw on your website you do a lot of school refurbishments — that's the kind of work I particularly enjoy' is far better than 'I see from your annual accounts that you turned over £X last year'. Apply the research subtly."
          >
            <p>
              Research before the interview:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>The firm</strong> &mdash; website, types of work, sectors, recent projects, size, CPS scheme registrations, geographic reach.
              </li>
              <li>
                <strong>The role</strong> &mdash; advert requirements, qualifications needed, working pattern, location range.
              </li>
              <li>
                <strong>The interviewers</strong> &mdash; LinkedIn backgrounds where available; how they fit in the firm.
              </li>
              <li>
                <strong>The market context</strong> &mdash; current pay rates, industry trends, anything in trade press relevant to the firm.
              </li>
              <li>
                <strong>The journey</strong> &mdash; route, timing, parking, contingency for delays.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The STAR technique — Situation, Task, Action, Result"
            plainEnglish="Competency-based interview questions — 'Tell me about a time when...' — are best answered with the STAR framework. Situation: brief context (where, when, what the project was). Task: what specifically needed doing or what problem arose. Action: what you specifically did (your contribution, not the team's collective effort — use 'I' not 'we'). Result: what happened, ideally with a specific outcome (the fault was found, the project completed on time, the customer was satisfied, lessons learned). Total length 60-90 seconds. Keeps answers focused and complete."
            onSite="Prepare 5-6 STAR stories from your experience covering: a challenging fault-finding event; a customer-handling situation; a time you spotted a safety issue; a time you had to learn something new fast; a team / supervisory situation; a mistake and what you learned. These 6 stories cover most competency questions interviewers ask. Rehearse them aloud — they should feel natural, not recited."
          >
            <p>
              STAR answer structure:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Situation</strong> &mdash; the context (15-20 seconds).
              </li>
              <li>
                <strong>Task</strong> &mdash; what needed doing or what problem arose (10-15 seconds).
              </li>
              <li>
                <strong>Action</strong> &mdash; what you specifically did (25-35 seconds; the meat of the answer).
              </li>
              <li>
                <strong>Result</strong> &mdash; outcome, what was learned, what changed (10-15 seconds).
              </li>
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

          <ContentEyebrow>Interview day and follow-up</ContentEyebrow>

          <ConceptBlock
            title="What to bring, when to arrive, how to behave"
            plainEnglish="Arrive 10-15 minutes early — not 30 (creates awkwardness), not on time (creates risk). Bring: 2-3 printed copies of your CV; original qualification certificates (Level 3, AM2, 2382, 2391, specialist tickets); ECS card; driving licence if the role needs driving; a portfolio of work photos if relevant (only with customer permission for any identifiable property); a notepad and pen. Dress: smart-casual is the trade norm — clean trousers and shirt, clean shoes; no need for a suit unless specifically requested. Behaviour: listen carefully before answering; specific examples beat generic statements; ask clarifying questions if a question is unclear; be honest about what you've done vs what you haven't."
            onSite="If there's a practical / trade test as part of the interview, treat it seriously. Bring your tools (some firms supply, some don't — ask in advance). Work safely throughout (safe isolation properly demonstrated, even on a bench rig). Communicate your reasoning as you work — interviewers want to see how you think, not just what you produce. Mistakes happen on tests; how you respond to them matters more than whether they occur."
          >
            <p>
              Interview day checklist:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>2-3 printed CV copies.</li>
              <li>Original qualification certificates.</li>
              <li>ECS card (in date).</li>
              <li>Driving licence (if relevant).</li>
              <li>Portfolio of work (only with customer permission for any photos).</li>
              <li>Tools (if practical test mentioned).</li>
              <li>Notepad and pen.</li>
              <li>Arrive 10-15 minutes early.</li>
              <li>Smart-casual dress; clean shoes.</li>
              <li>Phone on silent.</li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The follow-up — thank-you email within 24 hours"
            plainEnglish="Send a brief thank-you email within 24 hours of the interview. Three sentences is enough: thank them for their time, confirm you'd like to be considered, mention one specific point from the conversation that landed well. Keeps you in mind during the decision; demonstrates professionalism; takes 2 minutes to write. Don't follow up again unless they invited you to. If you haven't heard back by the date they indicated, one polite chase email is appropriate; further chasing isn't."
            onSite="If you don't get the role, ask for feedback briefly and professionally — most firms will give 1-2 sentences of constructive feedback if asked nicely. Take it on board for the next interview. The trade is smaller than it looks; today's rejection is often tomorrow's invitation when the firm's needs change. Don't burn bridges over a rejection."
          >
            <p>
              The professional follow-up sequence:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Day 1</strong> &mdash; brief thank-you email (3 sentences).
              </li>
              <li>
                <strong>Date they indicated</strong> &mdash; wait for their response.
              </li>
              <li>
                <strong>Date + 3 days</strong> if no response &mdash; one polite chase email.
              </li>
              <li>
                <strong>If unsuccessful</strong> &mdash; ask for feedback briefly; thank them; move on without rancour.
              </li>
              <li>
                <strong>If successful</strong> &mdash; respond promptly to the offer; ask for 24-48 hours to consider if needed; respond formally.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Generic CVs that don't lead with qualifications"
            whatHappens={
              <>
                Newly-qualified electrician writes a CV based on a generic graduate-CV template
                they found online. Personal statement at the top. Education section in the
                middle. ECS card and AM2 buried on page 2. QS scanning the CV stack spends 20
                seconds, doesn&apos;t find the qualifications quickly, moves on. Candidate gets no
                interview despite being well-qualified.
              </>
            }
            doInstead={
              <>
                Use a trade-specific CV layout: header with contact details, qualifications block
                at the top (ECS grade, AM2 date, Level 3, 2382 edition, 2391 if held, specialist
                tickets), employment history with specifics, skills section, brief CPD section.
                Personal statement optional and short. Two pages max. Apprentices and newly-qualified:
                the qualifications block at the top is everything &mdash; that&apos;s what gets
                the interview.
              </>
            }
          />

          <CommonMistake
            title="Walking into an interview without research and rambling on 'tell me about yourself'"
            whatHappens={
              <>
                Candidate arrives at the interview, hasn&apos;t looked at the firm&apos;s website
                beyond the careers page, has no STAR stories prepared. Asked &quot;tell me about
                yourself&quot;, they ramble for 4 minutes covering childhood, schools, every job
                they&apos;ve ever had, ending vaguely. Asked &quot;tell me about a challenging
                fault you fixed&quot;, they pause for 30 seconds then give a generic 2-sentence
                answer. Asked &quot;do you have any questions for us?&quot;, they say &quot;no,
                I think you&apos;ve covered everything.&quot; The interview feels flat; no offer
                materialises.
              </>
            }
            doInstead={
              <>
                Spend 60-90 minutes on prep the day before. Read the firm&apos;s website, recent
                LinkedIn posts, any news. Prepare a 90-second &quot;tell me about yourself&quot;
                answer. Rehearse 5-6 STAR stories from your experience. Write down 4-5 questions
                to ask. Print the role spec and your CV. Arrive 10-15 minutes early. That prep
                separates you from the 70% of candidates who don&apos;t do it.
              </>
            }
          />

          <Scenario
            title="You're newly qualified — your first post-AM2 interview is tomorrow"
            situation={
              <>
                You passed AM2S last month. You hold a Blue ECS card and have submitted the Gold
                upgrade application (in progress). You&apos;ve been working as an apprentice for
                the same firm throughout the apprenticeship; you&apos;re now interviewing for an
                Installation Electrician role with a different commercial firm. Interview is at
                09:00 tomorrow at the firm&apos;s office; 30-minute conversation plus a 2-hour
                bench test in their workshop. How do you prepare?
              </>
            }
            whatToDo={
              <>
                <strong>Tonight &mdash; CV refresh</strong>. Update the CV with the AM2S pass
                date, the Gold ECS card application status, the qualifications block reflecting
                current status. Print 3 copies on plain white paper.
                <br /><br />
                <strong>Tonight &mdash; firm research</strong>. Read the firm&apos;s website
                thoroughly. Note their typical projects, sectors, scheme registrations (NICEIC?
                ECA?), team size if visible. Check their LinkedIn for recent posts; look up the
                interviewers if named.
                <br /><br />
                <strong>Tonight &mdash; STAR stories</strong>. Pick 5-6 stories from the apprenticeship:
                a fault you fixed; a customer interaction that went well; a safety issue you
                spotted; a difficult site situation. Sketch out the STAR structure for each in
                your notebook. Rehearse 2-3 aloud.
                <br /><br />
                <strong>Tonight &mdash; questions to ask</strong>. Write 5 questions: types of
                work, the team, development path, regs amendment training, anything specific to
                their advertised work.
                <br /><br />
                <strong>Tonight &mdash; kit prep</strong>. Pack: CV copies; original Level 3
                certificate; AM2S pass letter; current Blue ECS card and the Gold application
                confirmation; ECS HSEA certificate; tools (in case the practical test wants you
                to use your own); notebook and pen. Lay out smart-casual clothes; clean shoes.
                <br /><br />
                <strong>Morning &mdash; arrival</strong>. Plan to arrive 10-15 minutes early.
                Phone on silent. Sit calmly; review notes briefly.
                <br /><br />
                <strong>Interview &mdash; key moves</strong>. 90-second &quot;tell me about
                yourself&quot; covering: apprenticeship at [firm], type of work, AM2S last month,
                Gold ECS in progress, what you&apos;re looking for next. Use STAR for competency
                questions. Honest about gaps (e.g. limited inspection-and-testing if true) and
                what you&apos;re working on. Ask the prepared questions when invited.
                <br /><br />
                <strong>Bench test &mdash; show your reasoning</strong>. Safe isolation properly
                demonstrated. Talk through your steps as you work. Mistakes? Acknowledge, correct,
                continue. Pace steady, not panicked.
                <br /><br />
                <strong>Same day &mdash; follow-up email</strong>. 3 sentences within 24 hours
                thanking them for the conversation and the practical, confirming interest, mentioning
                one specific thing from the day.
              </>
            }
            whyItMatters={
              <>
                First post-AM2 interviews are pattern-setters &mdash; the habits you build now
                (preparation, STAR rehearsal, thank-you follow-up) compound over a career of
                applications. Most candidates wing it; the ones who prepare visibly stand out. The
                trade is also smaller than it looks &mdash; today&apos;s interviewer is tomorrow&apos;s
                customer or supplier; how you handle the day matters even if this particular role
                isn&apos;t the offer.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Qualifications-first CV ordering — ECS grade, AM2 date, Level 3, 2382 edition, 2391, specialist tickets on page one.",
              "Two pages maximum. Cut hobbies, generic skills, older employment, design embellishments before cutting content.",
              "Describe experience with specifics — types of work, project scale, equipment, certifications issued. Generic phrasing wastes attention.",
              "Tailor per application: emphasis adjustments and re-ordering, not rewrites. 10-15 minutes per application.",
              "Pre-interview research is the highest-leverage prep — firm, role, interviewers, market context.",
              "STAR technique (Situation, Task, Action, Result) keeps competency-question answers at 60-90 seconds, focused and complete.",
              "Interview-day kit: CV copies, original certificates, ECS card, tools if practical test, notepad. Arrive 10-15 mins early.",
              "Follow-up: brief thank-you email within 24 hours. Ask for feedback if unsuccessful; don't burn bridges.",
            ]}
          />

          <Quiz title="CVs and interviews — knowledge check" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section5')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Section 5 hub
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level3-module7-section5-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.2 Running your own business
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
