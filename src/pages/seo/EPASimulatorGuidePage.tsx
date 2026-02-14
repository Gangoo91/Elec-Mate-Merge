import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  BookOpen,
  MessageSquare,
  Star,
  ClipboardCheck,
  Target,
  Brain,
  Users,
  FileCheck2,
  Briefcase,
  Wrench,
  ShieldCheck,
  CheckCircle,
  AlertTriangle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/study-centre/apprentice' },
  { label: 'EPA Simulator', href: '/guides/epa-simulator-guide' },
];

const tocItems = [
  { id: 'what-is-epa', label: 'What Is EPA?' },
  { id: 'epa-components', label: 'EPA Components' },
  { id: 'synoptic-project', label: 'Synoptic Project Practice' },
  { id: 'professional-discussion', label: 'Professional Discussion Preparation' },
  { id: 'grading-criteria', label: 'Grading Criteria' },
  { id: 'gateway-requirements', label: 'Gateway Requirements' },
  { id: 'preparation-timeline', label: 'Preparation Timeline' },
  { id: 'common-reasons-for-failure', label: 'Common Reasons for Failure' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'End-point assessment (EPA) is the final assessment that determines whether an apprentice has met the apprenticeship standard — it is independent of the training provider and carried out by an approved End-Point Assessment Organisation (EPAO).',
  'The EPA for the Level 3 Installation Electrician apprenticeship typically consists of three components: a knowledge test, a practical skills assessment (synoptic project), and a professional discussion underpinned by your OJT evidence portfolio.',
  'The synoptic project tests your ability to carry out installation, testing, and fault-finding tasks within a set time — practising under timed conditions is essential preparation.',
  'The professional discussion is a structured conversation where you use your OJT evidence to demonstrate competence across all Knowledge, Skills, and Behaviours (KSBs) — preparation and evidence selection are critical.',
  'Elec-Mate includes EPA preparation tools with practice questions, synoptic project walkthroughs, and professional discussion preparation guides for Level 3 Installation Electrician apprentices.',
];

const faqs = [
  {
    question: 'What is end-point assessment (EPA)?',
    answer:
      'End-point assessment (EPA) is the final assessment at the end of an apprenticeship that determines whether the apprentice has met the apprenticeship standard and is competent to work independently. The EPA is carried out by an approved End-Point Assessment Organisation (EPAO) — this is independent of the training provider (college or independent training company) to ensure impartiality. The apprentice must pass through the EPA gateway before the EPA can take place. The gateway is a confirmation by the employer and training provider that the apprentice is ready — they have completed the required off-the-job training hours, their OJT evidence portfolio is complete, they have achieved any mandatory qualifications (such as the Level 3 Diploma in Electrotechnical Services), and the employer believes they are working at the level required by the apprenticeship standard. The EPA is the final hurdle — once passed, the apprentice has completed their apprenticeship.',
  },
  {
    question: 'What does the synoptic project involve?',
    answer:
      'The synoptic project is a practical assessment where the apprentice carries out electrical installation, testing, and fault-finding tasks under controlled conditions. The tasks are designed to test multiple skills and knowledge areas simultaneously (hence "synoptic" — bringing together different elements). A typical synoptic project for the Level 3 Installation Electrician might involve: installing a small electrical system to a given specification (including cable routes, containment, accessories, and a consumer unit), carrying out the required testing sequence (continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance, prospective fault current, and RCD operation), identifying and diagnosing a pre-set fault in the installation, completing the relevant certification documentation (typically a Minor Works Certificate or EIC), and working safely throughout with appropriate PPE and safe isolation procedures. The project is timed — typically 6 to 8 hours — and is observed by an EPAO assessor. Quality of workmanship, accuracy of testing, correct documentation, and adherence to health and safety requirements are all assessed.',
  },
  {
    question: 'How does the professional discussion work?',
    answer:
      'The professional discussion is a structured one-to-one conversation between the apprentice and the EPAO assessor, typically lasting 60 to 90 minutes. It is underpinned by the apprentice OJT evidence portfolio — the assessor uses the evidence as a starting point for questions that explore the apprentice knowledge, skills, and behaviours in depth. The assessor will ask you to talk through specific pieces of evidence, explain the decisions you made and why, demonstrate your understanding of relevant regulations and standards (particularly BS 7671), discuss health and safety practices, and reflect on your professional development. The discussion is not a viva or an interrogation — it is a professional conversation where you demonstrate your competence by talking through real work you have done. The key to success is knowing your evidence thoroughly, being able to explain your reasoning, and linking your answers to the specific KSBs in the apprenticeship standard. You can bring your portfolio to the discussion and refer to it.',
  },
  {
    question: 'What grades can I achieve in EPA?',
    answer:
      'The grading structure depends on the specific apprenticeship standard, but for the Level 3 Installation Electrician (ST0152), the possible grades are: Fail — the apprentice has not met the apprenticeship standard. The EPAO may allow a re-sit or re-take, depending on the nature and extent of the failure. Pass — the apprentice has met all the requirements of the apprenticeship standard and demonstrated competence at the required level. Distinction — the apprentice has exceeded the requirements of the apprenticeship standard, demonstrating a higher level of competence, deeper technical knowledge, or stronger professional behaviours than required for a pass. The criteria for a distinction typically include consistently high-quality work in the synoptic project, depth and breadth of knowledge demonstrated in the professional discussion, evidence of initiative and independent learning, and strong communication and reflective skills. Not all apprenticeship standards offer a distinction grade — check the assessment plan for your specific standard.',
  },
  {
    question: 'Can I re-sit or re-take EPA if I fail?',
    answer:
      'Yes. If you fail one or more components of the EPA, the EPAO will provide feedback explaining where you fell short. Depending on the specific component and the nature of the failure, you may be offered a re-sit (the same assessment again, usually within a few weeks) or a re-take (a new assessment after additional learning and practice, usually within a few months). There may be a limit on the number of re-sits/re-takes allowed — check the assessment plan for your specific apprenticeship standard. Your employer and training provider should support you through the re-sit or re-take process, providing additional training where needed. There will usually be an additional charge from the EPAO for a re-sit or re-take. The most common reasons for failure are: insufficient depth of knowledge in the professional discussion, incomplete or poorly documented OJT evidence, errors in testing procedures during the synoptic project, and inadequate health and safety practices.',
  },
  {
    question: 'How long does EPA preparation take?',
    answer:
      'Effective EPA preparation should start at least 3 to 6 months before your planned EPA date. However, the reality is that preparation begins from day one of your apprenticeship — every piece of OJT evidence, every skills sign-off, and every college assessment contributes to your readiness. In the final 3-6 months, focused preparation should include: reviewing and organising your OJT evidence portfolio (ensuring all KSBs are covered), practising the synoptic project tasks under timed conditions, revising key theory topics (BS 7671 regulations, testing procedures, health and safety), practising for the professional discussion by talking through your evidence with your supervisor or a colleague, and completing practice knowledge tests. Elec-Mate includes EPA preparation tools with practice questions and professional discussion preparation guides that you can work through on your phone.',
  },
  {
    question: 'What is the EPA gateway and what do I need to pass it?',
    answer:
      'The EPA gateway is the checkpoint before EPA where your employer and training provider confirm you are ready to undertake the end-point assessment. To pass the gateway, you typically need: completed off-the-job training hours (minimum 20% of your employed hours over the duration of the apprenticeship), a complete OJT evidence portfolio covering all KSBs in the apprenticeship standard, achievement of any mandatory qualifications (for the Level 3 Installation Electrician, this is typically the Level 3 Diploma in Electrotechnical Services — Installation), achievement of Level 2 functional skills in maths and English (if not already held), employer confirmation that you are consistently working at the level required by the apprenticeship standard, and training provider confirmation that all learning has been completed. The gateway meeting is usually a three-way meeting between you, your employer, and your training provider. If any gaps are identified, you will be given a plan to address them before the gateway can be opened.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/ojt-evidence-guide',
    title: 'OJT Evidence Guide',
    description:
      'Complete guide to on-the-job training evidence. Types of evidence, photographic documentation, and building your portfolio.',
    icon: BookOpen,
    category: 'Apprentice',
  },
  {
    href: '/guides/apprentice-portfolio-guide',
    title: 'Apprentice Portfolio Guide',
    description:
      'How to organise and present your apprentice evidence portfolio for the EPA gateway and professional discussion.',
    icon: ClipboardCheck,
    category: 'Apprentice',
  },
  {
    href: '/study-centre/apprentice',
    title: 'Apprentice Study Centre',
    description:
      'Structured training courses for Level 2 and Level 3 electrical apprentices. Theory, practical, and exam preparation.',
    icon: Brain,
    category: 'Training',
  },
  {
    href: '/guides/electrical-apprenticeship-guide',
    title: 'Electrical Apprenticeship Guide',
    description:
      'Complete guide to becoming an electrician through the apprenticeship route. Qualifications, timelines, and career progression.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Comprehensive guide to BS 7671:2018+A3:2024. Key regulations, amendments, and practical application.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-contractor-guide',
    title: 'Electrical Contractor Guide',
    description:
      'For employers: supporting apprentices through their EPA, providing varied work experience, and writing witness testimonies.',
    icon: Briefcase,
    category: 'Business',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-epa',
    heading: 'What Is End-Point Assessment?',
    content: (
      <>
        <p>
          End-point assessment (EPA) is the final assessment at the end of an apprenticeship. It is
          the moment where everything comes together — three or four years of on-the-job training,
          college learning, and portfolio building are assessed in a formal, independent process
          that determines whether you have met the apprenticeship standard.
        </p>
        <p>
          The EPA is carried out by an approved End-Point Assessment Organisation (EPAO), which is
          independent of your training provider. This independence is important — it ensures that
          the assessment is fair, consistent, and based solely on your demonstrated competence
          against the apprenticeship standard, not on your relationship with your college tutor or
          your employer's preference.
        </p>
        <p>
          For the Level 3 Installation Electrician apprenticeship (ST0152), the EPA is the final
          hurdle. Once passed, you have completed your apprenticeship and are recognised as a
          qualified electrician. The quality of your preparation directly determines your outcome —
          and that preparation starts long before the assessment date.
        </p>
      </>
    ),
  },
  {
    id: 'epa-components',
    heading: 'EPA Components: What You Will Be Assessed On',
    content: (
      <>
        <p>
          The EPA for the Level 3 Installation Electrician typically consists of three assessment
          components. Each component tests different aspects of your competence.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Brain className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Knowledge Test</h4>
                <p className="text-white text-sm leading-relaxed">
                  A written or computer-based test covering the knowledge requirements of the
                  apprenticeship standard. Topics include BS 7671 regulations, electrical science
                  principles, health and safety legislation, installation design, inspection and
                  testing procedures, and fault-finding methodologies. The test is typically
                  multiple-choice and short-answer, lasting 90 to 120 minutes.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Synoptic Project (Practical Assessment)
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  A practical assessment where you carry out installation, testing, and
                  fault-finding tasks under controlled, timed conditions. You will install a small
                  electrical system, carry out the full testing sequence, diagnose a pre-set fault,
                  and complete the relevant certification. Typically 6 to 8 hours, observed by an
                  EPAO assessor.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <MessageSquare className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Discussion</h4>
                <p className="text-white text-sm leading-relaxed">
                  A structured one-to-one conversation with the EPAO assessor, lasting 60 to 90
                  minutes. Underpinned by your{' '}
                  <SEOInternalLink href="/guides/ojt-evidence-guide">
                    OJT evidence portfolio
                  </SEOInternalLink>
                  . You talk through your work experience, explain your decisions, demonstrate your
                  knowledge, and reflect on your professional development. The assessor uses your
                  evidence as starting points for deeper questions.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          All three components contribute to your overall grade. You must pass each component to
          achieve an overall pass. Weakness in one area cannot be compensated by strength in another
          — you need to prepare for all three.
        </p>
      </>
    ),
  },
  {
    id: 'synoptic-project',
    heading: 'Synoptic Project Practice',
    content: (
      <>
        <p>
          The synoptic project is the component that most apprentices find most challenging — not
          because the tasks are beyond their ability, but because they are unfamiliar with working
          under timed, observed conditions. The pressure of the clock and the presence of an
          assessor can affect performance if you have not practised.
        </p>
        <p>Key areas to practise:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation to specification</strong> — practise installing circuits from a
                written specification or drawing. Make sure you can interpret drawings, select the
                correct materials, route cables neatly, and make sound terminations. Speed comes
                with practice — time yourself and work on reducing your installation time without
                sacrificing quality.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing sequence</strong> — the full testing sequence to BS 7671 must be
                second nature. Practise the sequence: continuity of protective conductors (R1+R2),
                continuity of ring circuit conductors, insulation resistance, polarity verification,
                earth fault loop impedance, prospective fault current, and RCD operation. Know the
                correct instrument settings, the acceptable values, and how to record results on the
                schedule of test results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault finding</strong> — practise systematic fault finding. Understand how
                to use test instruments to locate opens, shorts, earth faults, and high-resistance
                joints. Work through fault scenarios — an open neutral on a lighting circuit, a
                reversed polarity on a socket outlet, a line-to-earth fault causing RCD tripping.
                Use a logical, methodical approach and be prepared to explain your reasoning to the
                assessor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification</strong> — practise completing the relevant certificate (EIC
                or Minor Works) accurately and completely. Every field must be filled in. Test
                results must be recorded correctly with the correct units. The overall assessment
                must be consistent with the test results. Use Elec-Mate to practise filling in
                digital certificates — the same form structure you will use in the real world.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Ask your employer to set up mock synoptic projects for you. Install a small board with 3-4
          circuits, test it, introduce a fault, and fix it — all within a set time. Do this monthly
          in the 6 months before your EPA date.
        </p>
      </>
    ),
  },
  {
    id: 'professional-discussion',
    heading: 'Professional Discussion Preparation',
    content: (
      <>
        <p>
          The professional discussion is where many apprentices feel least prepared, because it is
          the component that is hardest to practise alone. It is not a test of memory — it is a
          conversation about your work, your decisions, and your understanding. The key to success
          is knowing your evidence thoroughly and being able to explain the "why" behind everything
          you have done.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Know your evidence</strong> — review every piece of evidence in your
                portfolio. For each one, be able to explain: what the job was, what you did, what
                tools and materials you used, why you chose that approach, what regulations applied,
                and what you would do differently with hindsight.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Link answers to KSBs</strong> — the assessor is mapping your answers to the
                Knowledge, Skills, and Behaviours in the apprenticeship standard. When you answer a
                question, explicitly state which KSB you are demonstrating: "This shows my knowledge
                of BS 7671 Regulation 411.3.3 regarding RCD protection" or "This demonstrates my
                skill in carrying out insulation resistance testing."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practise with your supervisor</strong> — ask your supervisor or a qualified
                colleague to conduct mock professional discussions with you. Give them your evidence
                portfolio and ask them to question you on it. Practise explaining your work clearly
                and confidently.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prepare for follow-up questions</strong> — the assessor will dig deeper on
                your answers. If you say "I carried out an insulation resistance test," expect
                follow-up questions like "What instrument setting did you use? What is the minimum
                acceptable value for a 230V circuit? What would you do if the reading was below the
                minimum?" Be ready for this level of detail.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Prepare for your professional discussion"
          description="Elec-Mate includes EPA preparation tools with practice professional discussion questions mapped to the Level 3 Installation Electrician KSBs. Practise answering questions on your phone, anywhere, anytime."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'grading-criteria',
    heading: 'Grading Criteria: Pass vs Distinction',
    content: (
      <>
        <p>
          Understanding the grading criteria helps you aim for the right level of performance. The
          difference between a pass and a distinction is not about doing different things — it is
          about doing the same things to a higher standard.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Pass Criteria</h3>
            <p className="text-white text-sm leading-relaxed">
              Demonstrates competence at the level required by the apprenticeship standard.
              Installation work meets BS 7671 requirements and is safe. Testing is carried out
              correctly with accurate results. Fault finding uses a logical approach and reaches the
              correct diagnosis. Professional discussion shows adequate knowledge and the ability to
              explain decisions. Health and safety practices are followed consistently. OJT evidence
              covers all KSBs.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Distinction Criteria</h3>
            <p className="text-white text-sm leading-relaxed">
              Exceeds the standard requirements. Installation work is of consistently high quality —
              neat, well-planned, efficient. Testing is thorough and completed efficiently with
              excellent accuracy. Fault finding demonstrates deep technical understanding, not just
              procedural knowledge. Professional discussion shows depth of understanding —
              explaining not just what you did but why, with reference to specific BS 7671
              regulations and the underlying electrical science. Demonstrates initiative,
              independent learning, and strong reflective skills.
            </p>
          </div>
        </div>
        <p>
          A distinction is achievable by any apprentice who prepares thoroughly. The assessor is
          looking for depth of understanding, quality of workmanship, and the ability to explain
          your reasoning — not perfection. Consistent competence with genuine understanding earns a
          distinction.
        </p>
      </>
    ),
  },
  {
    id: 'gateway-requirements',
    heading: 'Gateway Requirements',
    content: (
      <>
        <p>
          Before you can take the EPA, you must pass through the EPA gateway. This is a formal
          confirmation that you are ready. The gateway requirements include:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Off-the-job training hours</strong> — minimum 20% of your employed hours
                over the duration of the apprenticeship must have been spent on off-the-job training
                (college, training provider, structured learning activities).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complete OJT evidence portfolio</strong> — all KSBs must be covered with
                sufficient evidence. Your training provider will review your portfolio against a
                coverage matrix before the gateway.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mandatory qualifications</strong> — for the Level 3 Installation
                Electrician, this typically includes the Level 3 Diploma in Electrotechnical
                Services (Installation).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Functional skills</strong> — Level 2 in English and maths (or equivalent
                GCSEs at grade 4/C or above). If not already held, these must be achieved before the
                gateway.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Employer and training provider sign-off</strong> — both must confirm that
                you are consistently working at the level required by the apprenticeship standard
                and are ready for the EPA.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The gateway meeting is typically a three-way discussion between you, your employer (or
          supervisor), and your training provider. If any gaps are identified, you will be given a
          plan and timeline to address them before the gateway is opened. Do not leave this to the
          last minute — start reviewing your readiness 6 months before your planned EPA date.
        </p>
      </>
    ),
  },
  {
    id: 'preparation-timeline',
    heading: 'Preparation Timeline',
    content: (
      <>
        <p>
          Here is a practical timeline for EPA preparation, starting 6 months before your planned
          assessment date:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6 months before</strong> — review your OJT evidence portfolio against the
                KSB framework. Identify any gaps. Discuss with your supervisor and training
                provider. Plan to fill any gaps through targeted work experience over the coming
                months.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4-5 months before</strong> — begin focused revision of key theory topics.
                Use Elec-Mate's training courses to revise BS 7671 regulations, testing procedures,
                and electrical science. Complete practice knowledge tests weekly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3-4 months before</strong> — start practising the synoptic project tasks
                under timed conditions. Monthly mock projects: install, test, fault-find, certify —
                all within the time limit. Get feedback from your supervisor on workmanship,
                accuracy, and efficiency.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>2-3 months before</strong> — begin professional discussion preparation.
                Review every piece of evidence and practise explaining it. Conduct mock professional
                discussions with your supervisor or a colleague. Focus on linking your answers to
                specific KSBs and citing BS 7671 regulation numbers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>1 month before</strong> — final portfolio review. Check all evidence is
                complete, correctly formatted, and clearly mapped to KSBs. Conduct a final mock
                professional discussion. Complete a final timed synoptic project practice. Ensure
                all gateway requirements are met. Confirm the EPA date and logistics with the EPAO.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Study for your EPA on your phone"
          description="Elec-Mate includes structured training courses, practice knowledge tests, BS 7671 revision resources, and professional discussion preparation — all on your phone. Study on the commute, on lunch breaks, and at home."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'common-reasons-for-failure',
    heading: 'Common Reasons for EPA Failure',
    content: (
      <>
        <p>
          Understanding why apprentices fail the EPA helps you avoid the same mistakes. The most
          common reasons for failure are:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insufficient depth in the professional discussion</strong> — answering
                questions at a surface level without demonstrating understanding. "I tested the
                insulation resistance" is not enough. "I tested the insulation resistance using a
                500V setting on my Megger MFT1741, testing between live conductors and earth with
                everything disconnected. The minimum acceptable value for a 230V circuit is 1 megohm
                per BS 7671 Table 6.3. I recorded 250 megohms, which is a pass" — that demonstrates
                understanding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incomplete OJT evidence portfolio</strong> — missing KSBs, evidence without
                descriptions, unsigned witness testimonies. The portfolio must be complete and
                well-organised before the gateway.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing errors in the synoptic project</strong> — incorrect instrument
                settings, wrong testing sequence, failure to verify the instrument before use, or
                inaccurate recording of results. The testing sequence must be second nature.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Health and safety failures</strong> — not carrying out safe isolation
                correctly, not wearing appropriate PPE, or not identifying and managing risks. These
                are fundamental requirements that cannot be overlooked.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Poor time management in the synoptic project</strong> — running out of time
                because of slow installation work, repeated testing, or spending too long on fault
                finding. Practise under timed conditions so you know how to pace yourself.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Every one of these failure points is avoidable with proper preparation. Start early, build
          your evidence consistently, practise under timed conditions, and prepare for the
          professional discussion by knowing your work inside out.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EPASimulatorGuidePage() {
  return (
    <GuideTemplate
      title="EPA Simulator | End-Point Assessment Practice Tool"
      description="Complete guide to end-point assessment (EPA) for electrical apprentices. EPA components, synoptic project practice, professional discussion preparation, grading criteria, gateway requirements, and common reasons for failure."
      datePublished="2025-07-25"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          EPA Simulator:{' '}
          <span className="text-yellow-400">Prepare for Your End-Point Assessment</span>
        </>
      }
      heroSubtitle="End-point assessment is the final hurdle of your apprenticeship. This guide covers every component — knowledge test, synoptic project, and professional discussion — with practical preparation strategies, grading criteria, and the common mistakes that cause apprentices to fail."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About End-Point Assessment"
      relatedPages={relatedPages}
      ctaHeading="Prepare for Your EPA with Elec-Mate"
      ctaSubheading="Practice knowledge tests, synoptic project walkthroughs, professional discussion preparation, and structured BS 7671 revision — all on your phone. 7-day free trial."
    />
  );
}
