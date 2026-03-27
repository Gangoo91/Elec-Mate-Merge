import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ClipboardCheck,
  BookOpen,
  GraduationCap,
  ShieldCheck,
  Users,
  Zap,
  AlertTriangle,
  Lightbulb,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Study Centre', href: '/study-centre' },
  { label: 'End-Point Assessment Guide', href: '/apprentice-endpoint-assessment' },
];

const tocItems = [
  { id: 'what-is-epa', label: 'What is the EPA?' },
  { id: 'epa-components', label: 'The Three EPA Components' },
  { id: 'knowledge-test', label: 'Knowledge Test' },
  { id: 'practical-observation', label: 'Practical Observation' },
  { id: 'professional-discussion', label: 'Professional Discussion' },
  { id: 'awarding-bodies', label: 'City & Guilds vs EAL' },
  { id: 'timing', label: 'Timing and Gateway' },
  { id: 'grading', label: 'Grading: Pass and Distinction' },
  { id: 'resit', label: 'Re-sit Process' },
  { id: 'preparation', label: 'How to Prepare' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The End-Point Assessment (EPA) is the final assessment of an electrical apprenticeship, taken after passing the gateway stage, typically in Year 3 or Year 4.',
  'The EPA has three components: a knowledge test (multiple-choice written exam), a practical observation (on-site assessment of your installation skills), and a professional discussion (structured interview with an independent assessor).',
  'Two awarding bodies offer EPA for electrical apprenticeships: City & Guilds (C&G) and EAL (Excellence, Achievement & Learning). Both are recognised and widely accepted by employers.',
  'Grading is either pass or distinction — there is no fail grade at EPA, as you must meet gateway requirements first (which include achieving your Level 3 qualification).',
  'If you do not achieve the grade you hoped for, re-sits are available for individual components. You do not need to retake the whole EPA if you pass some components first time.',
];

const faqs = [
  {
    question: 'What is the End-Point Assessment for an electrical apprenticeship?',
    answer:
      'The End-Point Assessment (EPA) is the final stage of an apprenticeship, carried out by an independent End-Point Assessment Organisation (EPAO). It tests whether you have achieved the knowledge, skills, and behaviours required to be a competent electrician. For the Level 3 Electrical Installation apprenticeship (standard reference: ST0145), the EPA is taken after you have passed the gateway — which includes completing your Level 3 qualification, achieving the AM2 or AM2S practical competency assessment, and your employer confirming you are ready. The EPA is assessed and graded by an independent assessor, not your employer or college.',
  },
  {
    question: 'When do apprentices take the EPA?',
    answer:
      "The EPA is taken after successfully passing the gateway. The gateway typically happens towards the end of Year 3 or in Year 4, depending on your training provider and employer. Gateway requirements include: completion of the Level 3 Electrical Installation qualification (C&G 2365 or EAL equivalent), achieving the AM2 or AM2S practical assessment, 36 months minimum on-programme (unless granted an exemption), and your employer confirming you have demonstrated the required knowledge, skills, and behaviours in the workplace. Once through gateway, the EPA itself typically takes 6 to 12 weeks to complete.",
  },
  {
    question: 'What is the difference between City & Guilds and EAL for EPA?',
    answer:
      'Both City & Guilds (C&G) and EAL are approved End-Point Assessment Organisations for the Level 3 Electrical Installation apprenticeship. City & Guilds is the larger and more widely known awarding body, historically dominant in electrical qualifications. EAL (Excellence, Achievement & Learning) is a specialist technical awarding organisation that has grown its electrical portfolio significantly. Both offer EPA in the same format (knowledge test, practical observation, professional discussion) and both are equally valid with employers. The choice is usually made by your training provider and employer, not by you as the apprentice.',
  },
  {
    question: 'What happens if I fail the knowledge test?',
    answer:
      "At EPA, the outcome is graded as pass or distinction — there is no 'fail' grade at the EPA stage because gateway requirements mean you have already demonstrated a baseline level of competency. However, individual EPA components can result in 'not yet competent' if you do not meet the assessment criteria. If this happens to the knowledge test, you can re-sit that component after a waiting period set by your EPAO (typically six to eight weeks). You do not need to re-sit components you have already passed. Your EPAO and employer will advise you on the re-sit process.",
  },
  {
    question: 'What does the practical observation involve?',
    answer:
      "The practical observation is an on-site assessment where an independent assessor observes you carrying out real electrical work. The assessor will observe and ask questions about your installation methods, use of tools and test equipment, safe isolation procedures, correct cable routing and fixing, compliance with BS 7671, and your ability to complete installation work to a professional standard. The practical observation lasts typically 4 to 6 hours. Your employer must arrange a suitable workplace activity for the assessment. You are assessed against the EPA assessment plan criteria — not a pass/fail of a specific task, but holistic observation of your competence.",
  },
  {
    question: 'What is the professional discussion and how should I prepare?',
    answer:
      "The professional discussion is a structured conversation between you and an independent assessor, typically lasting 45 to 60 minutes. It is not an interview for a job — it is an opportunity to demonstrate your knowledge, reflect on your experiences, and show you understand the work you do and why. The assessor uses a set of structured questions aligned to the apprenticeship standard. Prepare by reviewing the key knowledge areas: BS 7671, health and safety legislation, safe isolation, circuit design principles, inspection and testing, fault diagnosis, and the limits of your own competence (knowing when to seek advice). The Elec-Mate AI tutor can help you practise answering professional discussion questions.",
  },
  {
    question: 'What is the difference between pass and distinction at EPA?',
    answer:
      "All EPA components are assessed against specific criteria set out in the assessment plan. A pass means you have demonstrated that you meet the required standard across all components. A distinction means you have exceeded the required standard and demonstrated exceptional knowledge, skill, and behaviour. Distinctions are awarded to a relatively small proportion of apprentices. Achieving a distinction typically requires: thorough and detailed knowledge test answers that go beyond the minimum required, demonstrating excellent installation quality and safety awareness in the practical observation, and showing particularly deep and reflective understanding in the professional discussion. A distinction does not affect your qualification certificate — both pass and distinction result in the same apprenticeship completion.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/apprentice-progression-guide',
    title: 'Career Progression After Your Apprenticeship',
    description: 'JIB Gold Card, AM2, self-employment, HNC/HND, and salary progression after completing.',
    icon: GraduationCap,
    category: 'Guide',
  },
  {
    href: '/city-guilds-level-3-guide',
    title: 'City & Guilds Level 3 Guide',
    description: 'The 2365 qualification — units, assessment methods, and how to achieve distinction.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/eal-level-3-guide',
    title: 'EAL Level 3 Guide',
    description: 'EAL as an alternative to City & Guilds — qualification structure and comparison.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/apprentice-maths-electrician',
    title: 'Maths for Electrical Apprentices',
    description: 'Essential electrical calculations with worked examples — preparation for knowledge test.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/study-centre',
    title: 'Elec-Mate Study Centre',
    description: 'AI tutor, flashcards, and mock exams — prepare for your EPA knowledge test and professional discussion.',
    icon: Lightbulb,
    category: 'Study Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-epa',
    heading: 'What is the End-Point Assessment?',
    content: (
      <>
        <p>
          The End-Point Assessment (EPA) is the culmination of your electrical apprenticeship. It
          is the final, independent assessment that confirms you have achieved the knowledge,
          skills, and behaviours set out in the Level 3 Electrical Installation apprenticeship
          standard (ST0145). Unlike the exams and assignments you complete during your training,
          the EPA is carried out by an independent End-Point Assessment Organisation (EPAO) — not
          your employer or college.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Independent assessment</strong> — the EPA assessor is from the EPAO (City
                & Guilds or EAL), not your employer or college. This ensures the outcome is
                objective and nationally consistent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gateway first</strong> — you must pass the gateway before you can take
                the EPA. The gateway is a formal review confirming you have met all on-programme
                requirements: your Level 3 qualification, AM2/AM2S, and your employer's
                confirmation you are occupationally competent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three components</strong> — the EPA consists of a knowledge test, a
                practical observation, and a professional discussion. All three must be completed
                within the EPA window set by your EPAO.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Graded outcome</strong> — the final EPA result is either pass or
                distinction. Successfully completing the EPA means you are a qualified electrician
                with a nationally recognised Level 3 apprenticeship certificate.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EPA has been a requirement for all apprenticeships in England since the introduction
          of apprenticeship standards (replacing the old frameworks). For electrical apprenticeships,
          the standard was developed by the Electrotechnical Skills Partnership (TESP) in
          collaboration with industry employers.
        </p>
      </>
    ),
  },
  {
    id: 'epa-components',
    heading: 'The Three EPA Components',
    content: (
      <>
        <p>
          The Level 3 Electrical Installation EPA has three components, each assessing different
          aspects of your competence. All three are required — you cannot skip any component. The
          exact format may vary slightly between City & Guilds and EAL, but the three-component
          structure is the same for both.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1. Knowledge test</strong> — a multiple-choice written exam that tests
                your theoretical knowledge across the full range of the apprenticeship standard.
                Typically 40 to 60 questions, 90 to 120 minutes. Covers BS 7671, health and safety,
                circuit theory, installation methods, and inspection and testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2. Practical observation</strong> — an independent assessor observes you
                carrying out electrical installation work on-site or in a realistic working
                environment. Typically 4 to 6 hours. Assesses your installation skills, tool use,
                safe working practices, and compliance with BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3. Professional discussion</strong> — a structured conversation with the
                independent assessor, typically 45 to 60 minutes. Assesses your understanding of
                the work you do, your ability to reflect on your practice, and your professional
                knowledge. Often linked to a portfolio of evidence compiled during the apprenticeship.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'knowledge-test',
    heading: 'The Knowledge Test',
    content: (
      <>
        <p>
          The knowledge test is a written exam that takes place under controlled conditions —
          either at a test centre or, with some EPAOs, online under remote invigilation. It covers
          the full knowledge component of the apprenticeship standard.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Key topics:</strong> BS 7671 (Wiring Regulations), health and safety
                legislation (HSWA 1974, Electricity at Work Regulations 1989), circuit theory,
                cable selection and installation, inspection and testing procedures, fault diagnosis,
                electrical symbols and drawings, and relevant British Standards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Format:</strong> Multiple-choice questions with four options (one correct
                answer). Some questions include scenario-based context. You are usually allowed to
                use a calculator. The exam is not open-book — you must know the material.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Preparation:</strong> Revise using the{' '}
                <SEOInternalLink href="/study-centre">
                  Elec-Mate Study Centre
                </SEOInternalLink>{' '}
                flashcards and mock exam tools. Focus on areas you have not covered recently —
                the knowledge test covers the entire apprenticeship, not just the final year.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'practical-observation',
    heading: 'Practical Observation',
    content: (
      <>
        <p>
          The practical observation is the on-site element of the EPA. An independent assessor
          spends a working day (typically 4 to 6 hours) observing you carrying out installation
          work in a real or realistic working environment arranged by your employer.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What is observed:</strong> Safe isolation procedures, correct tool
                selection and use, installation quality (cable routing, fixing, terminations),
                compliance with BS 7671, correct labelling, testing procedures, and how you
                manage your work safely and professionally.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Assessor questioning:</strong> The assessor may ask you questions during
                the observation — for example, why you have chosen a particular installation
                method or what you would do if you encountered a specific fault. Answer honestly
                and refer to BS 7671 or relevant regulations where appropriate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>On the day:</strong> Treat it as a normal working day. Be professional,
                follow safe working practices without being prompted, and demonstrate that safe
                isolation and correct PPE are habits, not performances. The assessor is looking
                for natural competence, not a rehearsed display.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'professional-discussion',
    heading: 'Professional Discussion',
    content: (
      <>
        <p>
          The professional discussion allows you to demonstrate your knowledge, reflect on your
          experience, and show that you understand the broader context of your work. It is often
          supported by a portfolio of evidence that you compile during your apprenticeship.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Structure:</strong> The assessor asks structured questions covering
                knowledge, skills, and behaviours from the apprenticeship standard. Questions
                will often start with scenarios: "Tell me about a time when..." or "How would you
                approach...". Duration is typically 45 to 60 minutes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Portfolio evidence:</strong> You may be asked to refer to specific examples
                from your portfolio — installation photos, test results, risk assessments, or
                method statements you have completed. Review your portfolio before the discussion
                so you can speak confidently about each piece of evidence.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Key areas:</strong> Safe working practices, BS 7671 requirements,
                inspection and testing, fault diagnosis methodology, working with other trades
                and customers, professional ethics, and continuous professional development. Use
                the{' '}
                <SEOInternalLink href="/study-centre">
                  Elec-Mate AI tutor
                </SEOInternalLink>{' '}
                to practise answering professional discussion questions out loud.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'awarding-bodies',
    heading: 'City & Guilds vs EAL: Choosing Your EPAO',
    content: (
      <>
        <p>
          Both City & Guilds and EAL are approved EPAOs for the Level 3 Electrical Installation
          apprenticeship. In most cases, the choice of EPAO is made by your training provider or
          employer, not by you as the apprentice. However, understanding the difference is useful.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>City & Guilds</strong> — the UK's largest vocational awarding organisation.
                C&G has delivered electrical qualifications for over a century and is the dominant
                provider in electrical apprenticeships. The C&G 2365 Level 3 is the standard
                on-programme qualification. C&G's EPA is widely recognised and accepted by
                employers across the UK.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EAL (Excellence, Achievement & Learning)</strong> — a specialist
                technical awarding organisation originally focused on engineering and manufacturing.
                EAL has a growing electrical portfolio and is an approved EPAO for the Level 3
                Electrical Installation apprenticeship. EAL is accepted by JIB for ECS card
                applications in the same way as C&G.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Does it matter?</strong> For most purposes, no. Both lead to the same
                apprenticeship certificate and both are accepted for JIB ECS Gold Card
                applications. If you have a preference, discuss it with your employer or training
                provider before they register you with an EPAO.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'timing',
    heading: 'Timing and the Gateway',
    content: (
      <>
        <p>
          The gateway is the formal review that must happen before you can enter the EPA. It is a
          checkpoint confirming that all on-programme requirements have been met and that you are
          ready for the final assessment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gateway requirements:</strong> Completion of Level 3 Electrical
                Installation qualification (C&G 2365 or EAL equivalent), achievement of AM2 or
                AM2S practical assessment, minimum 36 months on-programme (unless given exemption),
                employer sign-off confirming occupational competence, and English and maths at
                Level 2 (GCSE grade 4 or equivalent) if not already held on entry.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical timing:</strong> Most electrical apprentices reach gateway in Year
                3 or Year 4, depending on how quickly they progress through on-programme learning.
                The EPA itself typically completes within 6 to 12 weeks of passing the gateway.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AM2 and AM2S:</strong> The AM2 (Achievement Measurement 2) is a practical
                competency assessment set by JTL and SJIB/SELECT. The AM2S is an equivalent
                assessment. Both assess your practical installation skills in a simulated working
                environment. Passing the AM2 or AM2S is a gateway requirement — it is separate
                from the EPA practical observation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'grading',
    heading: 'Grading: Pass and Distinction',
    content: (
      <>
        <p>
          The EPA is graded as pass or distinction. There is no fail grade at the EPA stage —
          the gateway process is designed to ensure you only enter the EPA when you are ready.
          However, individual components can result in 'not yet competent' which requires a re-sit.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pass</strong> — demonstrates you have met the required standard across all
                three EPA components. This is the standard outcome and confirms your competence as
                a qualified electrician. Employers treat pass and distinction holders the same for
                most practical purposes.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distinction</strong> — demonstrates you have exceeded the required standard
                and shown exceptional knowledge, skill, and professional behaviour. Distinctions
                are awarded to a minority of apprentices. The specific distinction criteria are
                published in the EPA assessment plan — review these when preparing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Component grades:</strong> Some EPAOs grade individual components and
                combine them into the final grade. Others make a holistic judgement across all
                three components. Check your EPAO's assessment plan for the exact grading
                methodology.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'resit',
    heading: 'Re-sit Process',
    content: (
      <>
        <p>
          If you do not achieve the expected outcome in one or more EPA components, you can re-sit.
          The process varies slightly between EPAOs but the general principles are the same.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Component-specific re-sits:</strong> You only re-sit the component(s)
                that were not achieved — you do not repeat the entire EPA. For example, if you
                passed the knowledge test and practical observation but the professional discussion
                requires re-sit, you only re-sit the professional discussion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Waiting period:</strong> EPAOs typically require a minimum waiting period
                of six to eight weeks before a re-sit. This gives you time to address any gaps
                identified in the assessor's feedback.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use assessor feedback:</strong> After any component result, ask for
                detailed feedback from the assessor and your EPAO. Understand exactly what the
                shortfall was before re-sitting. Targeted preparation based on specific feedback
                is far more effective than general revision.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'preparation',
    heading: 'How to Prepare for the EPA',
    content: (
      <>
        <p>
          Preparation for the EPA should begin well before you reach gateway — ideally from Year 2
          onwards. The EPA tests the full range of your apprenticeship, not just recent learning.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <BookOpen className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Study the Assessment Plan</h4>
                <p className="text-white text-sm leading-relaxed">
                  Download the EPA assessment plan from your EPAO's website. It tells you exactly
                  what knowledge, skills, and behaviours are assessed and what distinction looks
                  like. Treat it as a checklist and use the{' '}
                  <SEOInternalLink href="/study-centre">
                    Elec-Mate Study Centre
                  </SEOInternalLink>{' '}
                  to address any gaps.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <GraduationCap className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Practise Professional Discussion</h4>
                <p className="text-white text-sm leading-relaxed">
                  Ask your mentor, college tutor, or the{' '}
                  <SEOInternalLink href="/study-centre">
                    Elec-Mate AI tutor
                  </SEOInternalLink>{' '}
                  to run mock professional discussion sessions with you. Speaking your answers out
                  loud is very different from writing them — practise until you can explain your
                  work confidently and fluently.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Prepare for your EPA with Elec-Mate"
          description="Mock knowledge tests, professional discussion practice with the AI tutor, flashcards covering the full apprenticeship standard. Study on your phone, pass your EPA. 7-day free trial."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ApprenticeEndpointAssessmentPage() {
  return (
    <GuideTemplate
      title="Electrical Apprentice End-Point Assessment (EPA) Guide UK"
      description="Complete guide to the Electrical Installation apprenticeship End-Point Assessment (EPA). Knowledge test, practical observation, professional discussion, City & Guilds vs EAL, timing, grading (pass/distinction), and re-sit process explained."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="EPA Guide"
      badgeIcon={ClipboardCheck}
      heroTitle={
        <>
          Electrical Apprentice End-Point Assessment:{' '}
          <span className="text-yellow-400">Complete EPA Guide</span>
        </>
      }
      heroSubtitle="Everything you need to know about the electrical apprenticeship End-Point Assessment — what it involves, how to prepare, City & Guilds vs EAL, grading criteria, and what to do if you need to re-sit."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the Electrical Apprenticeship EPA"
      relatedPages={relatedPages}
      ctaHeading="Prepare for Your EPA with Elec-Mate"
      ctaSubheading="Mock knowledge tests, professional discussion practice with the AI tutor, and flashcard revision covering the full apprenticeship standard. 7-day free trial, cancel anytime."
    />
  );
}
