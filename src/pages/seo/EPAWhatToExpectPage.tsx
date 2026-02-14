import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Award,
  GraduationCap,
  BookOpen,
  Brain,
  ClipboardCheck,
  MessageSquare,
  Target,
  Calendar,
  FolderOpen,
  ShieldCheck,
  Mic,
  FileCheck2,
} from 'lucide-react';

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'EPA What to Expect', href: '/guides/epa-what-to-expect' },
];

const tocItems = [
  { id: 'what-is-epa', label: 'What Is the EPA?' },
  { id: 'three-components', label: 'The Three Components' },
  { id: 'knowledge-test', label: 'Knowledge Test' },
  { id: 'practical-assessment', label: 'Practical Assessment' },
  { id: 'professional-discussion', label: 'Professional Discussion' },
  { id: 'grading', label: 'Grading: Pass, Distinction, Fail' },
  { id: 'timeline', label: 'Timeline — Gateway to EPA' },
  { id: 'common-fails', label: 'Common Fails and How to Avoid Them' },
  { id: 'prepare-with-elecmate', label: 'Prepare with Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The End Point Assessment (EPA) is the final independent assessment of your apprenticeship, carried out by an approved EPAO such as City and Guilds or EAL. It confirms you have the knowledge, skills, and behaviours to work as a competent electrician.',
  'The EPA has three components: a knowledge test (multiple-choice and short-answer), a practical assessment (hands-on installation and testing), and a professional discussion with portfolio review (45 to 60 minutes with an assessor).',
  'You are graded Pass, Distinction, or Fail. A Distinction requires exceeding the standard across all three components. A Fail in any single component means you have not achieved the apprenticeship at that attempt, though resits are available.',
  'You must pass through the gateway before attempting the EPA. Gateway requirements include Level 3 diploma, AM2, 18th Edition, Level 2 functional skills, a portfolio of evidence, 20% off-the-job training hours, and employer and training provider agreement.',
  'Elec-Mate EPA Simulator replicates the professional discussion with AI scoring against real grade descriptors. Voice input lets you practise natural discussion responses. Combined with 2,000+ knowledge test questions and flashcards, it covers every EPA component.',
];

const faqs = [
  {
    question: 'What is the difference between the EPA and the AM2?',
    answer:
      'The AM2 and the EPA are separate assessments that test different things, although there is overlap. The AM2 (Achievement Measurement 2) is a practical assessment administered by NET/JIB that tests your hands-on installation, testing, and fault-finding skills. It is one of the gateway requirements for the EPA. The EPA (End Point Assessment) is a broader, holistic assessment carried out by an independent EPAO that covers not just practical skills but also theoretical knowledge and professional behaviours. The EPA has three components (knowledge test, practical assessment, and professional discussion), while the AM2 is purely practical. You must pass the AM2 before you can attempt the EPA — it is a prerequisite, not a replacement. Think of the AM2 as proving you can do the practical work, and the EPA as proving you are a fully rounded professional.',
  },
  {
    question: 'Who carries out the End Point Assessment?',
    answer:
      'The EPA is carried out by an approved End Point Assessment Organisation (EPAO). For the Installation Electrician / Maintenance Electrician standard (ST0215), the approved EPAOs include City and Guilds, EAL (EMTA Awards Limited), and other organisations registered on the ESFA Register of End Point Assessment Organisations. The key requirement is that the EPAO is independent of your training provider and employer — they have no involvement in your training and assess you impartially against the national standard. Your training provider will typically arrange the EPA booking with the EPAO, but the assessment itself is conducted entirely by the EPAO assessor. The assessor is a qualified professional with industry experience and assessor qualifications who follows the published assessment plan for the ST0215 standard.',
  },
  {
    question: 'How long does the EPA take from gateway to completion?',
    answer:
      'Once you pass through the gateway (meaning your employer, training provider, and you all agree you are ready, and all gateway requirements are met), the EPA must be completed within a defined window — typically three months. The EPAO will book assessment dates with you and your employer. The three components may be completed on a single day, across two days, or over separate sessions depending on the EPAO and scheduling. The knowledge test typically takes approximately two hours, the practical assessment takes three to four hours, and the professional discussion takes 45 to 60 minutes. Results are usually available within a few weeks of completing all three components. The total elapsed time from gateway to result is typically four to eight weeks, though this depends on EPAO availability and scheduling.',
  },
  {
    question: 'What happens if I fail one component of the EPA?',
    answer:
      'If you fail one or more components of the EPA, you have not achieved the apprenticeship at this attempt. However, most EPAOs offer a resit opportunity for the failed component(s). You do not need to retake components you have already passed — only the failed component(s). The resit must be taken within a specified timeframe set by the EPAO, typically within three to six months. There is usually a resit fee payable. Importantly, if you pass on a resit, the maximum overall grade you can achieve is Pass — a Distinction is no longer available. This makes first-time preparation crucial, and it is exactly why practising with Elec-Mate EPA Simulator before the real assessment is so valuable. If you fail all three components, you may need to retake the entire EPA, and your employer and training provider will need to agree a period of additional training before rebooking.',
  },
  {
    question: 'What does the professional discussion involve and how should I prepare?',
    answer:
      'The professional discussion is a structured conversation between you and the EPAO assessor, lasting approximately 45 to 60 minutes. The assessor reviews your portfolio of evidence before the discussion and uses it as the basis for questions. Unlike a traditional exam, the professional discussion is not about memorised answers — it is about demonstrating genuine understanding, reflective thinking, and professional behaviours through conversation. The assessor will ask questions such as "Describe a challenging installation and explain how you ensured BS 7671 compliance," "What would you do differently if you encountered this situation again?" and "How do you keep your technical knowledge current?" To prepare, review your portfolio entries and be ready to talk about each one in detail. Practise articulating your experiences clearly and concisely. Elec-Mate EPA Simulator lets you practise this format with AI-powered voice input — you speak your answers naturally, and the AI scores them against real grade descriptors, coaching you to improve the depth and quality of your responses.',
  },
  {
    question: 'Can I use Elec-Mate to prepare for all three EPA components?',
    answer:
      'Yes. Elec-Mate covers all three EPA components. For the knowledge test, the platform provides 2,000+ practice questions spanning BS 7671, electrical science, installation design, health and safety, and inspection and testing — all the topics covered in the ST0215 knowledge requirements. Flashcards with spaced repetition help you memorise key facts and regulation references efficiently. For the practical assessment, the AM2 Simulator provides timed exercises covering safe isolation, consumer unit build, ring final circuits, lighting circuits, fault finding, and testing — all skills assessed in the EPA practical component. For the professional discussion, the EPA Simulator replicates the discussion format with AI-generated questions based on portfolio content, voice input for natural responses, and scoring against the real grade descriptors published in the EPA assessment plan. The platform also tracks your portfolio evidence against ST0215 criteria and monitors your 20% off-the-job training hours, ensuring you meet all gateway requirements.',
  },
  {
    question: 'What is the difference between a Pass and a Distinction at EPA?',
    answer:
      'The difference between a Pass and a Distinction comes down to depth, quality, and consistency across all three components. A Pass means you meet the required standard — you demonstrate competent practical skills, accurate knowledge, and appropriate professional behaviours. A Distinction means you exceed the standard in every component. In the knowledge test, this means demonstrating deeper understanding and applying knowledge to unfamiliar scenarios. In the practical assessment, it means exceptional workmanship, efficient time management, and documentation that goes beyond the minimum required. In the professional discussion, it means articulating your experiences with insight, demonstrating proactive CPD, showing leadership behaviours, and providing reflective, analytical answers rather than surface-level descriptions. The grade descriptors are published in the EPA assessment plan — Elec-Mate EPA Simulator uses these exact descriptors in its AI scoring, so you know exactly what distinction-level performance looks like before the real assessment.',
  },
];

const relatedPages = [
  {
    href: '/guides/apprentice-portfolio',
    title: 'Apprentice Portfolio Guide',
    description: 'Digital evidence tracking, AI criteria mapping, and EPAO-ready export.',
    icon: FolderOpen,
    category: 'Guide',
  },
  {
    href: '/guides/am2-exam-tips',
    title: 'AM2 Exam Tips',
    description: 'Timed mock exercises and preparation tips for the AM2 practical assessment.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/off-the-job-training-hours',
    title: 'Off-the-Job Training Hours',
    description: 'Understanding and tracking the 20% off-the-job training requirement.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/apprentice-electrician-salary',
    title: 'Apprentice Electrician Salary',
    description:
      'Pay rates, JIB grades, and what to expect financially during your apprenticeship.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/site-diary-for-apprentices',
    title: 'Site Diary for Apprentices',
    description: 'How to keep an effective daily log that supports your portfolio and EPA.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description: 'Complete guide to starting and completing an electrical apprenticeship.',
    icon: GraduationCap,
    category: 'Guide',
  },
];

const sections = [
  {
    id: 'what-is-epa',
    heading: 'What Is the End Point Assessment?',
    content: (
      <>
        <p>
          The End Point Assessment (EPA) is the final independent assessment at the end of your
          electrical apprenticeship. It is designed to confirm that you have achieved the full range
          of knowledge, skills, and behaviours defined in the apprenticeship standard (ST0215 for
          Installation Electrician / Maintenance Electrician).
        </p>
        <p>
          Unlike your Level 3 exams, AM2, or 18th Edition qualification — which test specific areas
          of competence individually — the EPA is a holistic assessment of your overall readiness to
          work as a competent professional electrician. It is carried out by an independent End
          Point Assessment Organisation (EPAO) such as City and Guilds or EAL, not by your training
          provider or employer. This independence ensures impartial assessment against a national
          standard.
        </p>
        <p>
          The EPA was introduced as part of the reformed apprenticeship standards in England. Under
          the older framework, apprenticeships were assessed through individual qualifications
          alone. The new standards added the EPA as a summative, independent assessment that goes
          beyond simply collecting certificates. It confirms that you can apply everything you have
          learned in a real-world professional context — that you are not just qualified on paper,
          but genuinely occupationally competent.
        </p>
        <p>
          You cannot attempt the EPA until you have passed through the gateway, which requires
          completion of all mandatory qualifications, a comprehensive{' '}
          <SEOInternalLink href="/guides/apprentice-portfolio">
            portfolio of evidence
          </SEOInternalLink>
          , meeting the{' '}
          <SEOInternalLink href="/guides/off-the-job-training-hours">
            20% off-the-job training hours
          </SEOInternalLink>{' '}
          requirement, and agreement from both your employer and training provider that you are
          ready.
        </p>
      </>
    ),
  },
  {
    id: 'three-components',
    heading: 'The Three EPA Components',
    content: (
      <>
        <p>
          The EPA for the electrical apprenticeship standard consists of three distinct components.
          Each assesses different aspects of your competence, and you must pass all three to achieve
          the apprenticeship.
        </p>
        <div className="space-y-4 my-6">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Knowledge Test</h3>
                <p className="text-white text-sm leading-relaxed">
                  A written examination covering BS 7671, electrical science, installation design,
                  health and safety legislation, inspection and testing, and fault diagnosis.
                  Approximately 2 hours.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">Practical Assessment</h3>
                <p className="text-white text-sm leading-relaxed">
                  Hands-on installation, testing, and fault finding under timed assessment
                  conditions. Similar to the AM2 format but assessed by the EPAO. Approximately 3 to
                  4 hours.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-2">
                  Professional Discussion with Portfolio
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  A structured conversation with the EPAO assessor using your portfolio of evidence
                  as the basis for questions. Tests reflective thinking, professional behaviours,
                  and depth of understanding. Approximately 45 to 60 minutes.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          The three components are typically completed over one to two days, depending on the EPAO
          and scheduling arrangements. Some EPAOs complete all three in a single day, while others
          spread them across separate sessions.
        </p>
      </>
    ),
  },
  {
    id: 'knowledge-test',
    heading: 'Knowledge Test — What It Covers',
    content: (
      <>
        <p>
          The knowledge test is a written examination covering the full range of theoretical
          knowledge defined in the ST0215 apprenticeship standard. It is broader than any individual
          qualification exam because it draws on knowledge from across your entire apprenticeship.
        </p>
        <p>
          <strong>Topics covered include:</strong> BS 7671:2018+A2:2022 (and A3:2024) wiring
          regulations — including Part 1 scope and fundamental principles, Part 4 protection for
          safety, Part 5 selection and erection, and Part 7 special installations. Electrical
          science — Ohm's law, power calculations, impedance, reactance, and power factor.
          Installation design — cable sizing, circuit protection, discrimination, voltage drop, and
          maximum demand calculations. Inspection and testing — the correct testing sequence per
          GN3, acceptable values, instrument use, and documentation. Health and safety legislation —
          Health and Safety at Work Act 1974, Electricity at Work Regulations 1989, CDM Regulations
          2015, and COSHH. Fault diagnosis — systematic fault-finding methodology and safe
          isolation.
        </p>
        <p>
          <strong>Test format:</strong> The knowledge test typically includes a mix of
          multiple-choice questions, short-answer questions, and scenario-based questions. Scenarios
          present a realistic workplace situation and ask you to apply your knowledge to determine
          the correct course of action, the relevant regulation, or the appropriate test procedure.
          This is different from straightforward factual recall — you need to understand principles
          well enough to apply them to situations you have not seen before.
        </p>
        <p>
          <strong>Preparing effectively:</strong> Do not rely on learning answers to past papers.
          Instead, build genuine understanding of the underlying principles. Use Elec-Mate's 2,000+
          practice questions with detailed explanations to reinforce your understanding of why each
          answer is correct, not just what it is. Flashcards with spaced repetition help you retain
          regulation references, test values, and key facts over time.
        </p>
        <SEOAppBridge
          title="2,000+ EPA Knowledge Test Questions"
          description="Practice questions covering every knowledge topic in the ST0215 standard. Detailed explanations with regulation references. Timed mock tests to build exam-day confidence."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'practical-assessment',
    heading: 'Practical Assessment — What It Involves',
    content: (
      <>
        <p>
          The practical assessment is similar in format to the{' '}
          <SEOInternalLink href="/guides/am2-exam-tips">AM2 assessment</SEOInternalLink> but is
          conducted by the EPAO assessor rather than NET/JIB. It tests your ability to carry out
          electrical installation work safely, competently, and in compliance with BS 7671 under
          timed conditions.
        </p>
        <p>
          <strong>Typical tasks include:</strong> Installing and wiring a consumer unit with correct
          protective device selection. Wiring power circuits (ring final circuits with spurs).
          Wiring lighting circuits (one-way and two-way switching). Carrying out safe isolation
          following the prove-test-prove procedure. Systematic fault finding on a pre-built faulty
          circuit. Inspection and testing of completed work with accurate documentation of results.
        </p>
        <p>
          <strong>Assessment criteria:</strong> The assessor evaluates your workmanship (neat
          terminations, correct cable management, professional finish), safety practices (safe
          isolation, correct use of PPE, awareness of hazards), compliance with BS 7671 (correct
          device selection, cable colours, earth sleeving), time management (completing all tasks
          within the allocated time), and documentation accuracy (test results recorded correctly on
          schedules and certificates).
        </p>
        <p>
          <strong>The difference from AM2:</strong> If you have already passed the AM2, you have
          demonstrated these practical skills once. The EPA practical assessment confirms that you
          can still demonstrate them consistently. The standard expected is the same — competent,
          safe, accurate work to BS 7671. If you prepared well for the AM2, the EPA practical should
          not present significant additional challenge. However, do not assume you can coast on your
          AM2 preparation — revise and practise the key tasks before the EPA.
        </p>
      </>
    ),
  },
  {
    id: 'professional-discussion',
    heading: 'Professional Discussion — How It Works',
    content: (
      <>
        <p>
          The professional discussion is the component that most apprentices find unfamiliar and
          therefore most challenging. It is not a viva, not an oral exam, and not a
          question-and-answer session. It is a structured professional conversation designed to
          explore the depth of your understanding and the quality of your professional behaviours.
        </p>
        <p>
          <strong>How it works:</strong> The EPAO assessor reviews your{' '}
          <SEOInternalLink href="/guides/apprentice-portfolio">
            portfolio of evidence
          </SEOInternalLink>{' '}
          before the discussion. During the discussion (approximately 45 to 60 minutes), the
          assessor asks open-ended questions based on your portfolio entries. These questions probe
          your understanding of the work you carried out, the decisions you made, the regulations
          you applied, and how you would handle similar situations in the future.
        </p>
        <p>
          <strong>Example questions include:</strong> "Describe a consumer unit installation from
          your portfolio and explain how you selected the protective devices." "You mention a fault
          you found on a ring circuit — walk me through your fault-finding process step by step."
          "How do you ensure your technical knowledge stays up to date?" "Tell me about a time you
          identified a health and safety concern on site — what did you do?" "What would you do
          differently if you encountered this situation again?"
        </p>
        <p>
          <strong>What assessors look for:</strong> Assessors are looking for evidence of genuine
          understanding (not rehearsed answers), reflective thinking (what you learned from
          experiences), professional behaviours (communication, teamwork, initiative,
          responsibility), and technical depth (can you explain why, not just what). Surface-level
          answers — "I installed a consumer unit and it worked" — will not score well. Detailed,
          reflective answers — "I selected Type B MCBs for the lighting circuits because the loads
          were resistive, and I chose a Type A RCBO for the electric vehicle charge point circuit
          because Regulation 722.531.3.101 requires protection against DC fault currents" —
          demonstrate the depth of understanding that earns a Distinction.
        </p>
        <SEOAppBridge
          title="EPA Professional Discussion Simulator"
          description="Practise the professional discussion with AI-powered voice input. The AI asks portfolio-based questions, scores your responses against real grade descriptors, and coaches you to articulate competence with the depth assessors are looking for."
          icon={Mic}
        />
      </>
    ),
  },
  {
    id: 'grading',
    heading: 'Grading: Pass, Distinction, and Fail',
    content: (
      <>
        <p>
          The EPA is graded overall as Distinction, Pass, or Fail. Your grade is determined by your
          performance across all three components, assessed against the criteria published in the
          EPA assessment plan for the ST0215 standard.
        </p>
        <p>
          <strong>Pass:</strong> You meet the required standard in all three components. Your
          practical work is safe and competent. Your knowledge test answers demonstrate accurate
          understanding. Your professional discussion shows genuine competence and appropriate
          professional behaviours. A Pass confirms you are occupationally competent and ready to
          work as a qualified electrician.
        </p>
        <p>
          <strong>Distinction:</strong> You exceed the required standard across all three
          components. In the practical assessment, this means exceptional workmanship and efficient
          time management. In the knowledge test, it means applying knowledge to unfamiliar
          scenarios with depth and accuracy. In the professional discussion, it means articulating
          experiences with genuine insight, demonstrating proactive CPD, showing leadership
          qualities, and providing analytical rather than descriptive responses. A Distinction
          signals that you are not just competent but performing above the expected level for a
          newly qualified electrician.
        </p>
        <p>
          <strong>Fail:</strong> If you fail one or more components, you have not achieved the
          apprenticeship at this attempt. You can resit the failed component(s) within the timeframe
          specified by the EPAO, but a resit limits your maximum overall grade to Pass. A second
          failure may require a longer period of additional training before retaking. The financial
          and time costs of failing — resit fees, delayed qualification, delayed access to qualified
          electrician pay rates — make thorough first-time preparation essential.
        </p>
        <p>
          The grade descriptors are published in the assessment plan and define exactly what
          performance looks like at each level. Elec-Mate's EPA Simulator uses these exact grade
          descriptors in its AI scoring, so every practice session trains you against the same
          criteria the real assessor will use.
        </p>
      </>
    ),
  },
  {
    id: 'timeline',
    heading: 'Timeline — From Gateway to EPA',
    content: (
      <>
        <p>
          Understanding the timeline from gateway to EPA completion helps you plan your preparation
          effectively. Here is the typical sequence.
        </p>
        <p>
          <strong>Gateway readiness (weeks to months before EPA):</strong> Your employer and
          training provider assess whether you meet all gateway requirements. This includes checking
          that your Level 3 diploma is complete, your{' '}
          <SEOInternalLink href="/guides/am2-exam-tips">AM2 is passed</SEOInternalLink>, your 18th
          Edition certificate is current, your functional skills are achieved, your portfolio is
          comprehensive, and your{' '}
          <SEOInternalLink href="/guides/off-the-job-training-hours">
            off-the-job training hours
          </SEOInternalLink>{' '}
          are documented. All parties must agree you are ready.
        </p>
        <p>
          <strong>Gateway meeting:</strong> A formal meeting between you, your employer, and your
          training provider where the gateway requirements are reviewed and confirmed. If everything
          is in order, the gateway is signed off and the EPA can be booked.
        </p>
        <p>
          <strong>EPA booking (1 to 4 weeks after gateway):</strong> Your training provider
          typically coordinates with the EPAO to book assessment dates. The EPAO sends your assessor
          details, confirms the assessment schedule, and requests your portfolio in advance.
        </p>
        <p>
          <strong>EPA assessment (within 3 months of gateway):</strong> The three components are
          completed over one or two days. The assessor reviews your portfolio, conducts the
          knowledge test, observes your practical work, and holds the professional discussion.
        </p>
        <p>
          <strong>Results (2 to 4 weeks after assessment):</strong> The EPAO processes your
          assessment results and issues your grade. If you pass, your training provider applies for
          the apprenticeship completion certificate. If you fail any component, the EPAO provides
          feedback and information about the resit process.
        </p>
        <p>
          The total elapsed time from gateway to result is typically six to ten weeks. Use the time
          between the gateway meeting and the assessment date for focused preparation — this is when
          Elec-Mate's EPA Simulator, knowledge test practice, and professional discussion coaching
          are most valuable.
        </p>
      </>
    ),
  },
  {
    id: 'common-fails',
    heading: 'Common Fails and How to Avoid Them',
    content: (
      <>
        <p>
          Understanding why apprentices fail the EPA helps you avoid the same traps. The most common
          failures fall into predictable patterns.
        </p>
        <p>
          <strong>Thin portfolio:</strong> A portfolio with insufficient evidence, poor
          organisation, or weak criteria mapping. The assessor cannot have a meaningful professional
          discussion if there is nothing substantive in the portfolio to discuss. Start building
          your portfolio from day one using Elec-Mate's{' '}
          <SEOInternalLink href="/guides/apprentice-portfolio">portfolio builder</SEOInternalLink>{' '}
          with automatic AC mapping.
        </p>
        <p>
          <strong>Surface-level professional discussion answers:</strong> Answering questions with
          basic descriptions ("I wired a consumer unit") rather than reflective, analytical
          responses ("I selected Type B MCBs for the resistive loads and ensured the main switch was
          rated for the maximum demand calculated at 48A"). Practise articulating the why behind
          every decision you made.
        </p>
        <p>
          <strong>Knowledge test gaps:</strong> Relying on Level 3 revision alone without revising
          the broader ST0215 knowledge requirements. The EPA knowledge test can cover any topic in
          the standard, including areas that may not have been emphasised in your Level 3 course.
          Use Elec-Mate's full question bank to identify and fill gaps.
        </p>
        <p>
          <strong>Practical assessment rust:</strong> If there is a gap between passing your AM2 and
          taking the EPA practical, your practical skills may have deteriorated. Refresh your safe
          isolation procedure, testing sequence, and two-way switching wiring before the assessment.
        </p>
        <p>
          <strong>Incomplete gateway requirements:</strong> Arriving at the gateway meeting without
          all requirements met causes delays. Use Elec-Mate's OJT tracker and portfolio dashboard to
          monitor your progress against all gateway requirements in real time — no surprises at the
          gateway.
        </p>
        <SEOAppBridge
          title="Avoid EPA Fails — Prepare Thoroughly"
          description="Elec-Mate's EPA Simulator covers all three components: knowledge test questions, practical assessment practice via the AM2 Simulator, and professional discussion coaching with AI voice scoring. 7-day free trial."
          icon={ShieldCheck}
        />
      </>
    ),
  },
  {
    id: 'prepare-with-elecmate',
    heading: 'Prepare for Every EPA Component with Elec-Mate',
    content: (
      <>
        <p>
          Elec-Mate was designed by electricians who understand the EPA inside and out. Every
          feature in the Apprentice Hub maps directly to EPA preparation.
        </p>
        <p>
          <strong>EPA Simulator — Professional Discussion:</strong> The EPA Simulator replicates the
          professional discussion format. The AI generates questions based on your portfolio
          entries, just as a real assessor would. You respond using voice input for natural,
          conversational practice. The AI scores your responses against the real grade descriptors
          from the ST0215 assessment plan and provides specific coaching on how to improve the
          depth, structure, and quality of your answers. Practise until you can consistently deliver
          distinction-level responses.
        </p>
        <p>
          <strong>Knowledge Test Preparation:</strong> 2,000+ practice questions covering every
          knowledge topic in the apprenticeship standard. Each question includes a detailed
          explanation of the correct answer with regulation references. Timed mock exams simulate
          the real test format and time pressure. Flashcards with spaced repetition help you retain
          key facts, regulation numbers, and test values efficiently.
        </p>
        <p>
          <strong>AM2 Simulator — Practical Assessment:</strong> The{' '}
          <SEOInternalLink href="/guides/am2-exam-tips">AM2 Simulator</SEOInternalLink> covers safe
          isolation, consumer unit build, ring final circuit, lighting circuit, fault finding, and
          testing — all the practical skills assessed in the EPA practical component. Timed
          exercises with AI feedback help you maintain (or build) the practical competence needed.
        </p>
        <p>
          <strong>Portfolio Builder:</strong> Automatic AC mapping, criteria coverage tracking, AI
          reflection coach, employer and tutor review, and EPAO-ready export. A strong portfolio
          makes your professional discussion significantly easier.
        </p>
        <p>
          <strong>OJT Tracker:</strong> Real-time tracking of your off-the-job training hours
          against the 400-hour target. Categories for different activity types, compliance
          percentage, and evidence collection. Ensures you meet this gateway requirement without
          last-minute scrambling.
        </p>
        <p>
          <strong>
            {' '}
            <SEOInternalLink href="/guides/site-diary-for-apprentices">Site Diary</SEOInternalLink>:
          </strong>{' '}
          Daily logging with mood tracking, skills tracking across 8 categories, AI coach insights,
          and auto-suggest AC mapping. Your diary entries feed directly into your portfolio,
          building evidence naturally as part of your daily routine.
        </p>
        <SEOAppBridge
          title="Complete EPA Preparation — All Three Components"
          description="Join 430+ UK apprentices preparing for the EPA with Elec-Mate. Professional discussion simulator, 2,000+ knowledge test questions, AM2 practical exercises, portfolio builder, and OJT tracker. 7-day free trial."
          icon={Award}
        />
      </>
    ),
  },
];

export default function EPAWhatToExpectPage() {
  return (
    <GuideTemplate
      title="EPA What to Expect | End Point Assessment Electrician"
      description="Complete guide to the electrical apprenticeship End Point Assessment (EPA). What the three components involve, grading criteria, timeline from gateway to completion, common fails, and how to prepare with Elec-Mate's EPA Simulator."
      datePublished="2025-10-05"
      dateModified="2026-02-14"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EPA Guide"
      badgeIcon={Award}
      heroTitle={
        <>
          EPA What to Expect —{' '}
          <span className="text-yellow-400">End Point Assessment Explained</span>
        </>
      }
      heroSubtitle="The End Point Assessment is the final hurdle of your electrical apprenticeship. This guide explains exactly what the three components involve, how you are graded, what the timeline looks like, the most common reasons apprentices fail, and how to prepare effectively using Elec-Mate's EPA Simulator."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the Electrical EPA"
      relatedPages={relatedPages}
      ctaHeading="Ace your End Point Assessment"
      ctaSubheading="Join 430+ UK apprentices preparing for the EPA with Elec-Mate. Professional discussion simulator with AI voice scoring, 2,000+ knowledge test questions, and complete gateway tracking. 7-day free trial, cancel anytime."
    />
  );
}
