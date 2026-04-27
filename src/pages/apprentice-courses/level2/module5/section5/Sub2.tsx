/**
 * Module 5 · Section 5 · Subsection 2 — Effective comms across disabilities,
 * learning differences and language differences.
 * Maps to City & Guilds 2365-02 / Unit 210 / LO3 / AC 3.2
 *   AC 3.2 — "Define methods of effective communication for people with
 *            physical disabilities, learning difficulties, and language differences"
 *
 * Frame: the Equality Act 2010 puts a positive duty on employers and service
 * providers to make reasonable adjustments. On a building site that means
 * adapting how you brief, how you toolbox-talk, how you hand over and how you
 * explain to a customer — for a hearing-impaired colleague, a dyslexic
 * apprentice, a Polish-speaking labourer or an autistic site engineer.
 * Reasonable adjustments are statutory, not optional.
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const TITLE =
  'Effective communication across disabilities and language (3.2) | Level 2 Module 5.5.2 | Elec-Mate';
const DESCRIPTION =
  'Reasonable adjustments under the Equality Act 2010 — physical disabilities, learning differences (dyslexia, ADHD, autism) and English-as-a-second-language workers. Plain English, visual aids, demonstration and back-briefing.';

/* ── Inline checks ────────────────────────────────────────────────── */

const checks = [
  {
    id: 'mod5-s5-sub2-polish',
    question:
      "A Polish-speaking labourer joins the site this morning. His English is limited — he can introduce himself and follow simple instructions but anything technical loses him. You need to brief him on the safe-isolation procedure for the work you're about to do together. What do you do?",
    options: [
      "Print the standard RAMS document and hand it to him to read.",
      "Use plain English, slow your pace, demonstrate the procedure step-by-step on the actual board, ask him to demonstrate it back to you ('show me what you'd do'), and provide a written checklist in plain English (or translated if the firm has one). Ask whether there's a bilingual co-worker who can help if anything is still unclear. Document the briefing — date, who was present, what was covered, that a back-brief was given.",
      "Carry on with the standard verbal briefing at normal pace.",
      "Refuse to work with him until his English improves.",
    ],
    correctIndex: 1,
    explanation:
      "MHSWR 1999 Reg 10 requires safety information to be 'comprehensible' — that's the statutory hook. Equality Act 2010 doesn't directly cover language difference (it covers disability and a list of protected characteristics that don't include first language) but the comprehensibility duty under MHSWR 10 plus good practice from HSE multilingual guidance does the same job. The back-brief — asking the worker to demonstrate or explain back what's been briefed — is the gold standard for confirming understanding. The HSE has multilingual safety leaflets in Polish, Romanian, Lithuanian, Portuguese and several other languages — use them.",
  },
  {
    id: 'mod5-s5-sub2-dyslexia',
    question:
      "An apprentice on your team mentions she's dyslexic. The next training session is a written assessment on the safe isolation procedure. What's the right reasonable adjustment under the Equality Act 2010?",
    options: [
      "Tell her dyslexia is a personal problem and she needs to deal with it on her own.",
      "Ask her what helps — she'll know better than you. Common adjustments include extra time on written assessments, the option of a verbal or practical demonstration assessment instead of (or alongside) written, the briefing material provided in advance with key terms highlighted, audio versions where available, a large clear font and a coloured background overlay for some readers. Confirm with the assessor that the adjustment is in place. Equality Act 2010 s.20 puts the duty on the employer (and the assessing centre) to make reasonable adjustments where a provision, criterion or practice puts a disabled person at a substantial disadvantage.",
      "Adjust the assessment so it's only verbal, with no written component.",
      "Allow her to copy answers from a colleague.",
    ],
    correctIndex: 1,
    explanation:
      "Equality Act 2010 s.20 is the reasonable adjustments duty. It's a positive duty — the employer (and the training provider, and the assessing centre) must take steps to remove the disadvantage. The core principle is 'ask the person what helps' — most people with a disability know what they need. Common dyslexia adjustments are extra time, alternative assessment format (verbal or practical demonstration), audio versions of written material, plain English at a B1/B2 reading level, larger fonts and coloured-overlay options. Removing the assessment entirely or letting someone copy answers isn't an adjustment — it's bypassing the assessment.",
  },
  {
    id: 'mod5-s5-sub2-deaf',
    question:
      "You're going to be working alongside a hearing-impaired co-worker for a week. He lip-reads well but doesn't sign. You need to brief him on a permit-to-work for live testing. What's the right communication approach?",
    options: [
      "Shout — louder is always clearer.",
      "Face him directly so he can see your mouth and expression, speak at normal pace and volume (not exaggerated), use written notes for technical details, provide the permit-to-work document in advance for him to read, confirm understanding by asking specific questions ('what's the agreed comms signal if I see something wrong?'). Don't cover your mouth, don't turn away mid-sentence, don't have him facing into bright light behind you. If the work involves shared comms (radio), agree visual hand signals as the primary channel for him.",
      "Carry on with the standard verbal briefing as if he could hear normally.",
      "Refuse to work with him on safety-critical work.",
    ],
    correctIndex: 1,
    explanation:
      "Hearing-impaired colleagues vary — some lip-read well, some sign, some use hearing aids that work in some environments and not others. The principle is to ask the person what helps. For a lip-reader the consistent factors are face-to-face position, normal pace and volume (not exaggerated mouth movements which actually make lip-reading harder), good lighting on your face, no covering your mouth, and written backup for technical detail. The Equality Act 2010 s.20 reasonable-adjustments duty applies — the employer is obliged to make the workplace accessible. Action on Hearing Loss (now RNID) provides guidance and BSL interpreter services where signing is needed.",
  },
];

/* ── End-of-page Quiz ─────────────────────────────────────────────── */

const quizQuestions = [
  {
    id: 1,
    question:
      "What's the core duty under the Equality Act 2010 s.20 for an employer dealing with a disabled employee?",
    options: [
      "There is no duty — it's the employee's responsibility.",
      "The duty to make reasonable adjustments. Where a provision, criterion or practice (PCP), a physical feature, or the absence of an auxiliary aid puts a disabled person at a substantial disadvantage compared to non-disabled people, the employer must take such steps as it's reasonable to take to avoid the disadvantage. The duty is positive — the employer must act, not just refrain from discriminating.",
      "The duty to redesign the entire workplace.",
      "The duty to dismiss the employee with reasonable notice.",
    ],
    correctAnswer: 1,
    explanation:
      "Equality Act 2010 s.20 is the reasonable-adjustments duty and it's the practical heart of disability discrimination law. The three triggers (PCP, physical feature, auxiliary aid) cover most workplace situations. 'Reasonable' is judged on cost, effectiveness, employer size and resources — a small adjustment like providing audio briefing or extra time on an assessment is almost always reasonable. The duty is anticipatory for service providers and reactive for employers (employer needs to know about the disability first), but the pattern is the same: identify the disadvantage, identify the adjustment, implement it.",
  },
  {
    id: 2,
    question:
      "Approximately what percentage of the UK population has dyslexia, and what does that mean for the trade?",
    options: [
      "Less than 1% — it's rare.",
      "Around 10% of the UK population is estimated to have dyslexia (British Dyslexia Association figure), with research suggesting prevalence may be materially higher in trade roles where visual-spatial reasoning is favoured. That means in a typical apprentice cohort of 20, two to four people are likely to be dyslexic. Plain English briefings, visual aids, audio material, extra time on written assessments and the option of practical demonstration are the standard reasonable adjustments — and they help non-dyslexic learners too.",
      "Around 50% — it's the majority.",
      "It only affects children and goes away in adulthood.",
    ],
    correctAnswer: 1,
    explanation:
      "Dyslexia is a lifelong condition affecting around 10% of the UK population (British Dyslexia Association). Some research suggests prevalence is higher in trade and creative roles where the cognitive strengths associated with dyslexia (visual-spatial reasoning, big-picture thinking, problem-solving) are valued. The trade implications are practical: a significant proportion of apprentices and qualified electricians are dyslexic, and the reasonable adjustments under Equality Act 2010 s.20 apply to apprenticeship training, end-point assessments and ongoing employment.",
  },
  {
    id: 3,
    question:
      "Which UK government scheme can fund reasonable adjustments and equipment for a disabled worker?",
    options: [
      "There's no government scheme — the employer pays everything.",
      "Access to Work — a Department for Work and Pensions (DWP) scheme that can fund equipment, support workers, transport and other adjustments for disabled workers. Both the worker and the employer can apply. Funding is means-tested for self-employed workers and the scheme is non-contributory for the employee. Many employers don't know about it and pay for adjustments themselves when Access to Work would have funded them.",
      "Universal Credit.",
      "The Construction Industry Training Board levy.",
    ],
    correctAnswer: 1,
    explanation:
      "Access to Work is the DWP scheme that funds workplace adjustments where they exceed what's 'reasonable' for the employer to provide, and supports self-employed disabled workers directly. It can fund hearing aids, screen-reader software, support workers, BSL interpreters, taxi fares for disabled commuters and a range of other adjustments. Apprentices are eligible and the scheme is well-suited to the trade. The application is via gov.uk/access-to-work.",
  },
  {
    id: 4,
    question:
      "On a fit-out site where several Polish-speaking labourers are working, what's the appropriate way to deliver the daily safety briefing?",
    options: [
      "Standard English-only briefing — they should learn English.",
      "Plain English at slow pace, supplemented by visual demonstration where appropriate, written translated handouts (HSE provides multilingual safety leaflets), use of a bilingual co-worker as informal interpreter, back-briefing to confirm understanding ('show me what you'd do if you saw a fire'), and provision of safety signage and PPE labels in the relevant languages where the workforce is consistently multilingual. The duty under MHSWR Reg 10 is for information to be 'comprehensible' — that's a statutory standard, not a courtesy.",
      "No briefing — they can pick it up on the job.",
      "Briefing in Polish only and ignore the English speakers.",
    ],
    correctAnswer: 1,
    explanation:
      "MHSWR 1999 Reg 10 makes 'comprehensible' safety information statutory. The HSE provides safety leaflets in Polish, Lithuanian, Romanian, Portuguese, Bulgarian and several other languages commonly spoken by workers in UK construction. Plain English plus visual demonstration plus back-brief is the standard package and covers most situations. For a workforce with a consistent multilingual makeup the firm should also be looking at translated RAMS, signage and PPE labels — that's what 'comprehensible' means at the level of the whole site.",
  },
  {
    id: 5,
    question:
      "What's the right approach when working with an autistic apprentice who finds last-minute changes difficult?",
    options: [
      "Force them to deal with it — life is full of changes.",
      "Give as much advance notice as possible of the day's plan, the week's plan and any expected changes. Provide written or visual schedules where possible. When changes are unavoidable, explain the reason calmly and give the apprentice a moment to adjust. Provide clear, unambiguous instructions ('start at the kitchen, do the back-boxes first, the cable will be in the loft'). Avoid unwritten rules and 'common sense' assumptions. Many autistic workers thrive on predictability and clear structure — giving that structure costs nothing and improves performance.",
      "Refuse to work with autistic apprentices.",
      "Treat them differently from everyone else and exclude them from team activities.",
    ],
    correctAnswer: 1,
    explanation:
      "Autism is a spectrum and individuals vary enormously, but the common factor is that clear structure, advance notice and unambiguous instructions reduce stress and improve performance. Equality Act 2010 s.20 reasonable adjustments cover autism (it's a disability under the Act where it has a substantial and long-term effect). The adjustments — written schedules, advance notice, clear instructions — are low cost, often help everyone on the team, and are required by law where they remove a substantial disadvantage. Asking the apprentice what helps is always the starting point.",
  },
  {
    id: 6,
    question:
      "A customer has a guide dog and is registered blind. You're explaining your work in their home. What's the appropriate communication approach?",
    options: [
      "Avoid speaking to them and address everything to whoever else is in the room.",
      "Speak directly to the customer, identify yourself by name when you arrive and when you leave a room, describe what you're doing and where ('I'm just going to the consumer unit by the front door now'), don't move furniture or leave tools where they could be a trip hazard for the guide dog or the customer, ask before touching the guide dog (don't pet a working guide dog without asking), and offer to provide written documentation in large print, audio or accessible PDF as required. Equality Act 2010 makes this a service-provider duty.",
      "Treat the customer as if they can see normally.",
      "Refuse to do the work.",
    ],
    correctAnswer: 1,
    explanation:
      "Equality Act 2010 covers service providers (including tradespeople delivering services in the customer's home) under the goods, facilities and services provisions. The reasonable adjustments duty for service providers is anticipatory — you should be ready to make adjustments without waiting to be asked. The practical adjustments are simple: speak directly to the customer, narrate your movements, don't create new trip hazards, offer accessible-format documentation. The guide dog is a working dog — don't pet without asking, don't distract.",
  },
  {
    id: 7,
    question:
      "What does 'plain English' actually mean as a communication standard?",
    options: [
      "Speaking very slowly and loudly.",
      "Plain English is writing or speaking that the intended audience can understand on first reading or hearing. Common standards include short sentences (15-20 words on average), common words rather than technical jargon, active voice rather than passive, one idea per sentence, and a reading age around 9-11 (that's not patronising — most UK adults read most comfortably at that level for safety-critical information). The Plain English Campaign provides guidance and the Crystal Mark accreditation. For safety briefings, RAMS summaries, customer-facing letters and apprentice-training material, plain English isn't 'dumbing down' — it's 'comprehensible' under MHSWR 1999 Reg 10.",
      "Using only words from the dictionary.",
      "Speaking with a Received Pronunciation accent.",
    ],
    correctAnswer: 1,
    explanation:
      "Plain English is a defined communication standard, not vague advice. The Plain English Campaign has been promoting it in UK government and business writing since 1979 and the Crystal Mark is a recognised accreditation. The standard is the reader, not the writer — the test is whether the intended audience can understand on first reading. Most UK adults read most comfortably at a 9-11 year old reading level for safety-critical information; that's the target for toolbox talks, RAMS summaries and customer letters. Trade-specific terms (RCBO, MCB, R1+R2) are fine where the audience is trained — plain English doesn't mean removing technical vocabulary, it means using it precisely and only when needed.",
  },
  {
    id: 8,
    question:
      "Under what circumstances does a mental health condition count as a disability under the Equality Act 2010?",
    options: [
      "Mental health conditions are never covered by the Equality Act.",
      "Equality Act 2010 s.6 defines disability as a physical or mental impairment that has a substantial and long-term adverse effect on the person's ability to carry out normal day-to-day activities. 'Long-term' means it has lasted, or is likely to last, 12 months or more. This explicitly includes mental health conditions — depression, anxiety disorders, PTSD, bipolar disorder, schizophrenia and others — where they meet the substantial and long-term thresholds. Where a worker's mental health condition is a disability under the Act, the s.20 reasonable-adjustments duty applies in the same way as for physical disability.",
      "Only schizophrenia counts as a disability.",
      "Mental health is fully covered without any conditions.",
    ],
    correctAnswer: 1,
    explanation:
      "Equality Act 2010 s.6 includes mental impairment in the definition of disability where it meets the substantial and long-term thresholds. This is the legal hook for reasonable adjustments around mental health conditions — flexible hours during recovery, time off for therapy appointments, a phased return after a mental-health-related absence, adjustments to high-pressure deadlines. Sub 5.5 covers mental health in the trade in detail, including the construction-sector suicide rate and the support charities available.",
  },
];

/* ── FAQs ─────────────────────────────────────────────────────────── */

const faqs = [
  {
    question: "Is language difference a protected characteristic under the Equality Act 2010?",
    answer:
      "First language isn't itself a protected characteristic (the protected characteristics are age, disability, gender reassignment, marriage and civil partnership, pregnancy and maternity, race, religion or belief, sex and sexual orientation). However, race covers nationality and ethnic origin, so discriminating against a worker because they're Polish or Romanian is race discrimination. And the duty under MHSWR 1999 Reg 10 to provide 'comprehensible' safety information applies regardless of the worker's first language — if the standard briefing isn't comprehensible to a non-English-first-language worker, the duty isn't discharged. The combination of race protection plus the comprehensibility duty does most of the work in practice.",
  },
  {
    question: "How do I know what reasonable adjustments to offer if the person hasn't asked?",
    answer:
      "Start by asking. Most people with a disability know what helps them and will tell you if you ask in a respectful, private setting. The Equality Act 2010 s.20 duty is reactive for employers (you need to know about the disability first), so the conversation matters. If the person hasn't disclosed but you suspect they might be struggling — observable difficulty with written material, missed briefings, signs of dyslexia or autism — raise it gently and privately, offer adjustments without requiring disclosure ('we're trying to make all our briefings more accessible — would having the material in advance help you?'). Don't diagnose, don't pry, but don't ignore either.",
  },
  {
    question: "What's the difference between a disability under the Equality Act and one under the SEND Code?",
    answer:
      "The Equality Act 2010 definition (s.6) is the legal threshold for protection from discrimination and the trigger for the reasonable-adjustments duty in employment, education and service provision. The SEND (Special Educational Needs and Disabilities) Code is an education-sector framework that triggers Education, Health and Care Plans and additional educational support. The two overlap heavily — most people covered by SEND in school are also disabled under the Equality Act — but the SEND framework only applies up to age 25 in education, while Equality Act protection is lifelong. Apprentices may have an EHCP from school that helps inform adjustments in the workplace and college.",
  },
  {
    question: "Do I need a formal diagnosis to claim a reasonable adjustment under the Equality Act?",
    answer:
      "No. The Equality Act 2010 definition of disability is a legal test, not a medical one. A formal diagnosis from a clinician is helpful evidence but isn't required. Long-term substantial impairment of normal day-to-day activities is the test, and an employee can demonstrate that without a clinical diagnosis. In practice, most employers and tribunals will give weight to a clinician's letter where one is available. If you don't have a diagnosis but believe you're disabled under the Act, document what you experience, what helps, and raise the conversation with your employer.",
  },
  {
    question: "Can the employer refuse a reasonable adjustment because of cost?",
    answer:
      "Cost is one of the factors used to decide whether an adjustment is 'reasonable', but it's only one factor. Other factors include the effectiveness of the adjustment, the employer's size and resources, and the availability of external funding (Access to Work). For most adjustments — extra time on assessments, plain-English briefings, advance notice of changes, audio versions of documents, BSL interpreters via Action on Hearing Loss / RNID — the cost is low or zero. Employers refusing low-cost adjustments are likely in breach of s.20 and the worker can escalate via the ACAS conciliation route or an employment tribunal.",
  },
  {
    question: "I'm an apprentice and I think I might be dyslexic but I've never been assessed. What should I do?",
    answer:
      "Talk to your tutor at your training provider — they'll have a process for screening and referral to a formal assessment if needed. Many training providers fund the assessment. Your employer should also be told once you have a clearer picture, because the reasonable-adjustments duty under Equality Act 2010 s.20 applies in both education (the training provider) and employment (your employer). Common adjustments for dyslexic apprentices include extra time on written assessments, audio versions of training material, plain-English briefings, the option of practical-demonstration assessment alongside written, and software like coloured-overlay readers. The British Dyslexia Association (bdadyslexia.org.uk) provides guidance and Access to Work can fund equipment.",
  },
];

export default function Sub2() {
  const navigate = useNavigate();
  useSEO(TITLE, DESCRIPTION);

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Section 5
          </button>

          <PageHero
            eyebrow="Module 5 · Section 5 · Subsection 2"
            title="Effective communication across disabilities and language"
            description="Reasonable adjustments under the Equality Act 2010 — physical disabilities, learning differences (dyslexia, ADHD, autism) and English-as-a-second-language workers. Plain English, visual aids, demonstration, back-briefing."
            tone="emerald"
          />

          <TLDR
            points={[
              "Equality Act 2010 s.20 puts a positive duty on employers (and training providers, and service providers) to make reasonable adjustments for disabled people — that includes physical, sensory, learning and mental-health disabilities.",
              "MHSWR 1999 Reg 10 requires safety information to be 'comprehensible' — that's the statutory hook for plain English, visual aids, translated material and back-briefing.",
              "Ask the person what helps — most people with a disability or a language difference know what they need. Adjustments are usually low-cost and often help everyone.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              "Define methods of effective communication for people with physical disabilities, learning difficulties, and language differences.",
              "Identify the reasonable-adjustments duty under Equality Act 2010 s.20 and the protected characteristics under s.4.",
              "Recognise the comprehensibility duty under MHSWR 1999 Reg 10 and how it interacts with language difference.",
              "Apply plain English, visual demonstration, back-briefing and translated material as the standard adaptive toolkit on site.",
              "Identify common adjustments for dyslexia, ADHD, autism and physical / sensory disabilities in a trade context.",
              "Recognise Access to Work as a UK government scheme that can fund workplace adjustments and equipment.",
            ]}
            initialVisibleCount={3}
          />

          <ContentEyebrow>Why effective communication is a statutory duty, not a courtesy</ContentEyebrow>

          <ConceptBlock
            title="Two pieces of legislation, one practical outcome"
            plainEnglish="The duty to communicate effectively with workers who have disabilities, learning differences or language differences sits across two pieces of legislation. The Equality Act 2010 covers disability and a range of protected characteristics — that drives reasonable adjustments. The Management of Health and Safety at Work Regulations 1999 Reg 10 requires safety information to be 'comprehensible' — that drives plain English, visual demonstration and translation."
            onSite="The two duties combine to mean that a standard one-size-fits-all briefing isn't enough on most sites. A briefing that's perfectly comprehensible to an experienced English-first-language electrician may be incomprehensible to a Polish labourer in his first week, a dyslexic apprentice on day one of college release, or a hearing-impaired site engineer trying to lip-read in poor light. Adapting the briefing isn't extra; it's the duty."
          >
            <p>
              The framework in three lines:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Equality Act 2010 s.20</strong> — duty to make reasonable
                adjustments where a provision, criterion or practice puts a disabled
                person at a substantial disadvantage.
              </li>
              <li>
                <strong>Equality Act 2010 s.4</strong> — protected characteristics:
                age, disability, gender reassignment, marriage and civil partnership,
                pregnancy and maternity, race, religion or belief, sex and sexual
                orientation.
              </li>
              <li>
                <strong>MHSWR 1999 Reg 10</strong> — duty to provide comprehensible
                and relevant safety information.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Physical disabilities</ContentEyebrow>

          <ConceptBlock
            title="Hearing impairment — face the person, BSL where needed, written backup"
            plainEnglish="Hearing-impaired colleagues vary widely. Some lip-read, some sign in BSL (British Sign Language), some use hearing aids that work in some environments and not others. The starting point is to ask what helps."
            onSite="For lip-readers the consistent factors are: face the person directly, normal pace and volume (exaggerated mouth movements actually make lip-reading harder), good lighting on your face (not behind you), don't cover your mouth, don't turn away mid-sentence, and back up technical detail in writing. For BSL signers a qualified interpreter may be needed for safety briefings, induction and training — Action on Hearing Loss (now RNID, rnid.org.uk) provides guidance and interpreter services."
          >
            <p>
              Practical adjustments for hearing-impaired colleagues:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Face-to-face position for lip-reading; good lighting on your face.
              </li>
              <li>
                Normal pace and volume — not slow, not loud, not exaggerated.
              </li>
              <li>
                Written backup for technical detail (permit-to-work documents, RAMS
                key points, manufacturer instructions).
              </li>
              <li>
                BSL interpreter for formal briefings and safety-critical material —
                Access to Work can fund this.
              </li>
              <li>
                Visual hand signals as primary channel for shared work where radio
                isn&apos;t available to the lip-reader.
              </li>
              <li>
                Visual fire alarms in the welfare cabin and on site (not just
                audible).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Visual impairment — audio, large print, screen-reader-friendly digital"
            plainEnglish="Visual impairment ranges from low vision (where larger print and high contrast help) to total blindness (where audio and tactile material are needed). Most visually impaired workers in the trades will have adapted their tools and methods over time — your job is to make sure the documentation and communication don't become a barrier."
            onSite="Practical adjustments include large-print versions of briefing material, screen-reader-friendly digital documents (PDFs that have been properly tagged, not scanned images), audio versions of toolbox talks, large clear PPE labels, tactile markings on critical equipment where appropriate, and a sighted guide for unfamiliar locations. Don't pet a guide dog without asking — it's a working animal."
          >
            <p>
              Practical adjustments for visually impaired colleagues:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Large print versions of written material — 14pt or 18pt minimum,
                sans-serif, high contrast.
              </li>
              <li>
                Audio versions of briefings — recorded toolbox talks, audio descriptions
                of drawings.
              </li>
              <li>
                Screen-reader-friendly digital documents — properly tagged PDFs, not
                scanned images of paper documents.
              </li>
              <li>
                Tactile markings on critical equipment where appropriate.
              </li>
              <li>
                Verbal description of any visual content — &quot;this is the consumer
                unit, the main switch is on the right-hand side at the top&quot;.
              </li>
              <li>
                Sighted guide for unfamiliar locations on first visit.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Mobility impairment — accessible route, sit-down briefing, no-stairs option"
            plainEnglish="Mobility impairment ranges from a temporary injury to permanent wheelchair use. The trade isn't always accessible — older buildings, scaffolding, lofts and confined spaces are inherently difficult — but many roles in electrical contracting (design, estimation, survey, planning, supervisor roles) don't require physical access to every part of every site."
            onSite="For mobility-impaired colleagues attending site, plan the route in advance — accessible parking, step-free access to the welfare cabin and the briefing area, sit-down option for the briefing itself, accessible toilet provision. For colleagues working at a desk, ergonomic adjustments to the workstation are usually low cost and Access to Work can fund anything beyond standard."
          >
            <p>
              Practical adjustments for mobility-impaired colleagues:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Accessible route from parking to welfare cabin and briefing area —
                step-free where possible.
              </li>
              <li>
                Sit-down option for toolbox talks and briefings.
              </li>
              <li>
                Accessible toilet and welfare provision — Workplace (Health, Safety
                and Welfare) Regulations 1992 covers welfare standards.
              </li>
              <li>
                Ergonomic adjustments to workstations for office-based roles.
              </li>
              <li>
                Flexible working arrangements where the role allows.
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

          <ContentEyebrow>Learning differences</ContentEyebrow>

          <ConceptBlock
            title="Dyslexia — plain English, visual aids, audio, extra time"
            plainEnglish="Dyslexia is a lifelong neurodevelopmental difference affecting around 10% of the UK population (British Dyslexia Association). It primarily affects reading, spelling and processing of written material. It does NOT affect intelligence — many highly successful tradespeople, designers and engineers are dyslexic, and the visual-spatial reasoning associated with dyslexia is often a strength in trade roles."
            onSite="The standard reasonable adjustments under Equality Act 2010 s.20 are extra time on written assessments, alternative assessment formats (verbal or practical demonstration alongside or instead of written), briefing material provided in advance with key terms highlighted, audio versions where available, plain English at a B1/B2 reading level, and the option of larger fonts or coloured-overlay readers. Most of these adjustments help non-dyslexic learners too."
          >
            <p>
              Common adjustments for dyslexic apprentices and electricians:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Extra time on written assessments</strong> — typically 25%
                additional time, more for severe dyslexia.
              </li>
              <li>
                <strong>Alternative assessment format</strong> — verbal or practical-
                demonstration assessment alongside or instead of written, where the
                qualification framework allows.
              </li>
              <li>
                <strong>Material in advance</strong> — briefing notes and training
                content provided ahead of the session so the apprentice can read at
                their own pace.
              </li>
              <li>
                <strong>Audio versions</strong> — recorded toolbox talks, audio
                versions of training material.
              </li>
              <li>
                <strong>Plain English</strong> — at a B1/B2 reading level for safety-
                critical material; technical terms used precisely and only where
                needed.
              </li>
              <li>
                <strong>Coloured-overlay readers</strong> — some dyslexic readers find
                a tinted background reduces visual stress.
              </li>
              <li>
                <strong>Voice-to-text software</strong> — for written report writing,
                site diaries and portfolio evidence; Access to Work can fund.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="ADHD — short briefings, structured tasks, written summaries"
            plainEnglish="ADHD (Attention Deficit Hyperactivity Disorder) affects attention, impulse control and executive function. In a workplace it commonly shows up as difficulty with long meetings, struggle to start tasks, distractibility, and a tendency to hyperfocus on interesting tasks while neglecting routine ones. As with dyslexia, the trade environment often suits ADHD strengths — fast-paced problem solving, hands-on work, variety of tasks."
            onSite="Practical adjustments include shorter briefings (or breaks within longer ones), structured task lists with clear priorities, written summaries of meetings and verbal briefings, advance notice of changes where possible, and a quiet space for focused work where needed. Many adjustments are about removing barriers rather than adding accommodations — short toolbox talks help everyone."
          >
            <p>
              Common adjustments for colleagues with ADHD:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Short briefings (10-15 minutes) or scheduled breaks in longer ones.
              </li>
              <li>
                Written summaries of verbal briefings and meetings.
              </li>
              <li>
                Structured task lists with clear priorities and deadlines.
              </li>
              <li>
                Advance notice of changes to the schedule where possible.
              </li>
              <li>
                Quiet space for focused work — particularly for written portfolio
                evidence or report writing.
              </li>
              <li>
                Flexibility on the order in which tasks are completed where the work
                allows it.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Autism — clear sequence, no last-minute changes, written expectations"
            plainEnglish="Autism is a spectrum and individuals vary enormously. Common factors include preference for clear structure, difficulty with last-minute changes, sensitivity to sensory input (noise, bright light, certain textures), preference for unambiguous instructions, and difficulty with the unwritten rules of social interaction."
            onSite="The trade environment can be challenging for autistic workers — noise, sensory overload, unwritten social rules — but it can also be a great fit when the work is structured, the instructions are clear, and the team is understanding. Practical adjustments include written schedules, advance notice of changes, clear and unambiguous instructions, designated quiet areas where needed, and avoiding 'common sense' assumptions in briefings."
          >
            <p>
              Common adjustments for colleagues with autism:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                Written schedules for the day, week and project.
              </li>
              <li>
                Advance notice of any changes to plans.
              </li>
              <li>
                Clear, unambiguous instructions — &quot;start at 8am at the kitchen,
                first job is the back-boxes, second is the cable drops, finish by
                lunch&quot;, not &quot;sort the kitchen out&quot;.
              </li>
              <li>
                Avoid &quot;common sense&quot; or &quot;you should know&quot; — make
                expectations explicit.
              </li>
              <li>
                Quiet space for breaks — sensory overload is a real factor on noisy
                sites.
              </li>
              <li>
                One-to-one briefings rather than large group sessions where possible
                for the apprentice&apos;s preference.
              </li>
              <li>
                Predictable routine where the role allows it.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="Equality Act 2010 — s.20(3), (4) and (5) (paraphrased)"
            clause={
              <>
                <p className="mb-2">
                  The first requirement (s.20(3)) is, where a provision, criterion or
                  practice (PCP) of A puts a disabled person at a substantial disadvantage
                  in relation to a relevant matter compared with persons who are not
                  disabled, to take such steps as it is reasonable to have to take to
                  avoid the disadvantage.
                </p>
                <p className="mb-2">
                  The second requirement (s.20(4)) is, where a physical feature puts a
                  disabled person at a substantial disadvantage in comparison to non-
                  disabled persons, to take such steps as it is reasonable to have to
                  take to avoid the disadvantage.
                </p>
                <p>
                  The third requirement (s.20(5)) is, where a disabled person would, but
                  for the provision of an auxiliary aid, be put at a substantial
                  disadvantage in relation to a relevant matter, to take such steps as
                  it is reasonable to have to take to provide the auxiliary aid.
                </p>
              </>
            }
            meaning={
              <>
                Three triggers, one duty. The PCP trigger covers things like a written-
                only assessment regime that disadvantages a dyslexic apprentice. The
                physical-feature trigger covers things like a step into a welfare cabin
                that disadvantages a wheelchair user. The auxiliary-aid trigger covers
                things like a BSL interpreter for a Deaf signer or a screen reader for a
                blind worker. &quot;Reasonable&quot; is judged on cost, effectiveness,
                employer size and resources — most adjustments in the trade are low-cost
                and clearly reasonable. Access to Work funds the rest.
              </>
            }
            cite="Source: Equality Act 2010 (2010 c.15), Part 2, s.20 — paraphrased from legislation.gov.uk."
          />

          <RegsCallout
            source="Management of Health and Safety at Work Regulations 1999 — Reg 10(1)"
            clause={
              <>
                &quot;Every employer shall provide his employees with comprehensible
                and relevant information on — (a) the risks to their health and safety
                identified by the assessment; (b) the preventive and protective
                measures; (c) the procedures referred to in regulation 8(1)(a); (d) the
                identity of those persons nominated by him in accordance with
                regulation 8(1)(b); and (e) the risks notified to him in accordance
                with regulation 11(1)(c).&quot;
              </>
            }
            meaning={
              <>
                The word doing the work in Reg 10 is &quot;comprehensible&quot;. A
                briefing in dense legal English to a labourer with English-as-a-second-
                language doesn&apos;t satisfy the duty. A written-only assessment to a
                dyslexic apprentice doesn&apos;t satisfy the duty. An audible-only fire
                alarm in a workshop with a Deaf colleague doesn&apos;t satisfy the
                duty. Reg 10 is the statutory hook for plain English, visual
                demonstration, translated material and accessible communication. It
                converts what could be dismissed as &quot;courtesy&quot; into a
                statutory duty owed to every worker on site.
              </>
            }
            cite="Source: Management of Health and Safety at Work Regulations 1999 (SI 1999/3242), Reg 10 — verbatim from legislation.gov.uk."
          />

          <RegsCallout
            source="Equality Act 2010 — s.4 (paraphrased)"
            clause={
              <>
                The protected characteristics are: age; disability; gender reassignment;
                marriage and civil partnership; pregnancy and maternity; race; religion
                or belief; sex; sexual orientation. (Section 4.)
              </>
            }
            meaning={
              <>
                The protected characteristics are the categories the Act protects against
                discrimination, harassment and victimisation. &quot;Race&quot; is broadly
                defined and covers nationality and ethnic origin, so discriminating
                against a Polish or Romanian worker because of their nationality is
                race discrimination. First language isn&apos;t itself a protected
                characteristic, but the practical effect is similar — and the duty
                under MHSWR Reg 10 to provide &quot;comprehensible&quot; safety
                information does most of the same work.
              </>
            }
            cite="Source: Equality Act 2010 (2010 c.15), Part 2, s.4 — paraphrased from legislation.gov.uk."
          />

          <InlineCheck
            id={checks[1].id}
            question={checks[1].question}
            options={checks[1].options}
            correctIndex={checks[1].correctIndex}
            explanation={checks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Language differences</ContentEyebrow>

          <ConceptBlock
            title="Plain English, visual demonstration, back-briefing, translated material"
            plainEnglish="UK construction has a significant non-English-first-language workforce — Polish, Romanian, Lithuanian, Portuguese, Bulgarian and many other first languages are common. The duty under MHSWR 1999 Reg 10 to provide 'comprehensible' safety information applies to every worker on site, regardless of first language."
            onSite="The standard adaptive package is plain English at slow pace, visual demonstration of the procedure on actual equipment, back-briefing (asking the worker to demonstrate or explain back what's been briefed), translated material where available (HSE provides multilingual safety leaflets), and a bilingual co-worker as informal interpreter where possible. Don't assume that a nod means understanding — the back-brief is the only reliable confirmation."
          >
            <p>
              Practical communication for non-English-first-language workers:
            </p>
            <ul className="space-y-1.5 list-disc pl-5 marker:text-elec-yellow/70">
              <li>
                <strong>Plain English at slow pace</strong> — short sentences, common
                words, one idea at a time.
              </li>
              <li>
                <strong>Visual demonstration</strong> — show the procedure on the
                actual equipment, not just describe it.
              </li>
              <li>
                <strong>Back-briefing</strong> — ask the worker to demonstrate or
                explain back what&apos;s been covered (&quot;show me what you&apos;d do
                if&hellip;&quot;).
              </li>
              <li>
                <strong>Translated material</strong> — HSE provides safety leaflets in
                Polish, Romanian, Lithuanian, Portuguese, Bulgarian and several other
                languages at hse.gov.uk.
              </li>
              <li>
                <strong>Translated signage and PPE labels</strong> — for sites with a
                consistent multilingual workforce.
              </li>
              <li>
                <strong>Bilingual co-worker as informal interpreter</strong> — useful
                for clarification but not a substitute for properly briefed material
                on safety-critical content.
              </li>
              <li>
                <strong>Professional interpreter for formal briefings</strong> — site
                induction, formal training, formal grievance proceedings.
              </li>
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

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Assuming a nod means understanding"
            whatHappens={
              <>
                Apprentice briefs a Polish-speaking labourer on the safe-isolation
                procedure. The labourer nods politely throughout the briefing, smiles,
                says &quot;yes, OK&quot;. Apprentice walks away. Ten minutes later the
                labourer connects a tail to a busbar that hasn&apos;t been isolated.
                Receives a shock. Investigation finds the labourer hadn&apos;t
                understood the briefing — the nodding was politeness, not
                comprehension. The apprentice is interviewed under HASAWA s.7 and
                the firm under s.2.
              </>
            }
            doInstead={
              <>
                Never accept a nod as confirmation of understanding for a safety-
                critical briefing. Use the back-brief — &quot;show me what you&apos;d
                do if you saw this switch in this position&quot;. The labourer
                demonstrating the procedure on the actual equipment is the only
                reliable evidence of understanding. If they can&apos;t demonstrate
                it, re-brief — slower, with more visual content, with a bilingual
                co-worker if available, and with translated written material as
                backup. Document the back-brief in your notes.
              </>
            }
          />

          <CommonMistake
            title="Refusing or forgetting to make a reasonable adjustment because the apprentice 'should be able to cope'"
            whatHappens={
              <>
                Apprentice with disclosed dyslexia asks for the standard written
                assessment to be supplemented with the option of a verbal or
                practical-demonstration assessment. Trainer refuses on the basis that
                &quot;everyone else does the written assessment, no exceptions&quot;.
                Apprentice fails the written assessment despite clearly having the
                practical knowledge. Apprentice raises a grievance under the Equality
                Act 2010 s.20 reasonable-adjustments duty. Training provider faces an
                employment tribunal claim that they&apos;re likely to lose. Apprentice
                also loses motivation, falls behind, and the relationship with the
                training provider breaks down.
              </>
            }
            doInstead={
              <>
                Equality Act 2010 s.20 reasonable-adjustments duty is statutory, not
                optional. The standard adjustments for dyslexia (extra time, alternative
                assessment format, audio material, advance briefing) are well-established,
                low-cost and required. Asking the apprentice what helps and implementing
                the agreed adjustment is much faster, cheaper and fairer than refusing
                and ending up at tribunal. The same applies to ADHD, autism, hearing
                impairment, visual impairment and any other disability under the Act.
              </>
            }
          />

          <Scenario
            title="Toolbox talk for a multilingual site team"
            situation={
              <>
                You&apos;re running a toolbox talk on safe isolation for a team of six
                — three native English speakers, two Polish-speaking labourers with
                limited English, and one Lithuanian labourer with intermediate English.
                The talk needs to cover the safe-isolation procedure for a
                three-phase distribution board you&apos;ll all be working around for
                the next two weeks. You&apos;ve been told by your supervisor that you
                have 15 minutes to brief everyone before work starts.
              </>
            }
            whatToDo={
              <>
                Don&apos;t try to deliver one briefing for everyone. Plan for two
                rounds. Round 1: deliver the briefing in plain English at slow pace
                to the whole group, with visual demonstration on the actual board
                — show the lock-off, the dead-test, the proving-test sequence in
                front of everyone. Use clear language, short sentences, one step at a
                time. Round 2: pull the two Polish labourers aside individually and
                back-brief — ask each of them to demonstrate the lock-off, the
                dead-test and the proving-test on the actual board. Confirm in
                writing (a checklist, ideally translated) that you&apos;ve briefed
                them and they&apos;ve demonstrated back. Document the briefing in
                the site diary — date, who was present, the back-brief was given,
                checklist signed. If anything is still unclear, escalate to your
                supervisor before any work proceeds.
              </>
            }
            whyItMatters={
              <>
                Safe isolation is the highest-stakes procedure on most sites — getting
                it wrong is how electricians die. The duty under MHSWR Reg 10 to
                provide comprehensible information is statutory, not a courtesy. The
                duty under HASAWA s.2 to provide a safe system of work extends to
                briefing the workers on that system in a form they can understand. A
                briefing that the Polish labourers can&apos;t follow isn&apos;t a
                briefing — it&apos;s a paperwork exercise that leaves them exposed
                and you exposed under HASAWA s.7 (personal duty to look after
                yourself and others). The back-brief plus written checklist plus
                signed sheet is the package that discharges the duty.
              </>
            }
          />

          <SectionRule />

          <FAQ items={faqs} />

          <SectionRule />

          <KeyTakeaways
            points={[
              "Equality Act 2010 s.20 is the reasonable-adjustments duty. It's positive — the employer must act, not just refrain from discriminating.",
              "MHSWR 1999 Reg 10 requires safety information to be 'comprehensible' — that's the statutory hook for plain English, visual demonstration, back-briefing and translated material.",
              "Ask the person what helps. Most people with a disability or a language difference know what they need. Adjustments are usually low-cost and often help everyone.",
              "Around 10% of the UK population is dyslexic (British Dyslexia Association). Common adjustments are extra time, alternative assessment format, audio material and plain English.",
              "For non-English-first-language workers, never accept a nod as confirmation of understanding on a safety briefing. Use the back-brief — ask them to demonstrate or explain back.",
              "HSE provides multilingual safety leaflets in Polish, Romanian, Lithuanian, Portuguese, Bulgarian and several other languages — use them.",
              "Access to Work is the DWP scheme that funds workplace adjustments and equipment. Both worker and employer can apply. Apprentices are eligible.",
              "Mental health conditions are covered by Equality Act 2010 s.6 where they have a substantial and long-term effect — Sub 5.5 covers the trade-specific picture in detail.",
            ]}
          />

          <Quiz title="Effective communication across disabilities and language — knowledge check" questions={quizQuestions} />

          {/* ── Prev / next nav ─────────────────────────────────── */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section5/5-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Previous
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                5.1 Suitable communication methods
              </div>
            </button>
            <button
              onClick={() => navigate('/study-centre/apprentice/level2/module5/section5/5-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next subsection <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                5.3 Conflict resolution
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
