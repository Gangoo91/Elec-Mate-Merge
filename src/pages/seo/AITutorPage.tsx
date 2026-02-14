import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  Brain,
  BookOpen,
  MessageSquare,
  FileText,
  CheckCircle2,
  Lightbulb,
  ClipboardCheck,
  Search,
  Wrench,
  Bot,
  Target,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'AI Tools', href: '/tools/ai-electrician-tools' },
  { label: 'AI Tutor', href: '/tools/ai-tutor' },
];

const tocItems = [
  { id: 'what-is-ai-tutor', label: 'What Is the AI Tutor?' },
  { id: 'regulation-explanations', label: 'Regulation Explanations' },
  { id: 'exam-preparation', label: 'Exam Preparation' },
  { id: 'concept-breakdowns', label: 'Concept Breakdowns' },
  { id: 'study-on-site', label: 'Study on Site' },
  { id: 'how-to', label: 'How to Use It' },
  { id: 'features', label: 'Features' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Ask any question about electrical regulations and get a clear, plain-English explanation with the specific BS 7671 regulation reference.',
  'Generate unlimited practice questions for C&G 2391, 2382 (18th Edition), 2365, and AM2 exam preparation with detailed worked answers.',
  'The AI breaks down complex concepts like adiabatic equations, discrimination, and earth fault loop impedance into step-by-step explanations.',
  'Study anywhere — the AI Tutor works offline on site, so you can learn during quiet moments between jobs.',
  'Tailored specifically for UK electrical qualifications and standards, not generic international electrical content.',
];

const faqs = [
  {
    question: 'Which electrical qualifications does the AI Tutor cover?',
    answer:
      'The AI Tutor covers all major UK electrical qualifications including C&G 2382 (18th Edition IET Wiring Regulations), C&G 2391 (Inspection and Testing), C&G 2365 (Electrical Installation), C&G 2357 (Electrotechnical Technology), the AM2 practical assessment, and the EPA (End-Point Assessment) for electrical apprenticeships. It also covers CPD topics for qualified electricians such as EV charger installation, solar PV, battery storage, and fire alarm systems. The content is based on BS 7671:2018+A3:2024, the IET On-Site Guide, IET Guidance Notes 1-8, and the relevant City & Guilds qualification specifications.',
  },
  {
    question: 'Can the AI Tutor generate practice exam questions?',
    answer:
      'Yes. The AI Tutor generates unlimited practice questions in the exact format used by City & Guilds examinations. For the 2382 exam (18th Edition), it produces multiple-choice questions based on the actual regulation text, requiring you to identify the correct regulation number, maximum value, or specific requirement. For the 2391 exam (Inspection and Testing), it generates questions about test procedures, instrument selection, pass/fail criteria, and fault-finding scenarios. Each question comes with a detailed worked answer explaining not just what the correct answer is, but why it is correct and which specific BS 7671 regulation or table supports it. You can focus on specific topics (for example, just Chapter 41 on protection against electric shock) or get a mixed set covering the full syllabus.',
  },
  {
    question: 'How does the AI explain complex regulations in plain English?',
    answer:
      'The AI Tutor translates the formal language of BS 7671 into clear, practical explanations. For example, if you ask about Regulation 411.3.3 (additional protection by RCD), the AI will first quote the regulation text, then explain in plain English what it means: "Any socket outlet rated at 32A or less must be protected by a 30 mA RCD, unless it is in a specific documented excluded location." It then provides practical examples of when this applies and when it does not, common mistakes electricians make when applying it, and how it relates to other regulations. The AI always includes the regulation reference so you can look it up yourself, and it distinguishes between mandatory requirements ("shall"), recommendations ("should"), and permitted alternatives ("may").',
  },
  {
    question: 'Can I use the AI Tutor for on-site learning between jobs?',
    answer:
      'Yes, and this is one of its most valuable uses. The AI Tutor works offline, so you can use it during quiet moments on site, during lunch breaks, or while waiting for an inspection. Many electricians use it to look up regulations they encounter during their work — for example, if you come across an unusual installation arrangement and want to check whether it complies with the current edition. You can also use short study sessions to work through practice questions for an upcoming exam. The app saves your progress and bookmarks, so you can pick up where you left off. This "study while you earn" approach is particularly popular with apprentices and electricians working towards their 2391 qualification.',
  },
  {
    question: 'Does the AI Tutor cover the practical elements of the AM2 assessment?',
    answer:
      'Yes. The AM2 practical assessment requires candidates to complete a series of timed installation and testing tasks, and the AI Tutor covers both the knowledge underpinning these tasks and the practical approach. It explains the specific requirements of each AM2 task, the marking criteria, common reasons for failure, and the time management strategies needed to complete the assessment within the allowed time. For the testing elements of the AM2, it walks through the correct test sequence, instrument selection, expected results, and recording requirements. While the AI cannot physically supervise your practical work, it provides detailed guidance that helps you prepare effectively — many users practice the tasks at home or in a training workshop while using the AI Tutor for reference.',
  },
  {
    question: 'Is the content kept up to date with regulation changes?',
    answer:
      'Yes. The AI Tutor is updated to reflect the current edition of BS 7671, including Amendment 3:2024 (A3:2024, issued July 2024). When regulations change, the tutor content is updated to reflect the new requirements. It also notes where the current edition differs from previous editions, which is useful for electricians who qualified under an earlier edition and need to understand what has changed. For example, it explains the new Regulation 530.3.201 added by A3:2024 covering bidirectional and unidirectional protective devices, and how this affects installations with battery storage or solar PV. The tutor clearly distinguishes between requirements that have always been in BS 7671 and those added by recent amendments.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/ai-regulations-lookup',
    title: 'AI Regulations Lookup',
    description:
      'Search BS 7671 in plain English. Get the specific regulation number, full text, and practical interpretation.',
    icon: Search,
    category: 'Tool',
  },
  {
    href: '/tools/ai-fault-diagnosis',
    title: 'AI Fault Diagnosis',
    description:
      'Describe fault symptoms and get a ranked diagnosis with test sequences. Learn fault-finding through real-world practice.',
    icon: Brain,
    category: 'Tool',
  },
  {
    href: '/tools/ai-installation-specialist',
    title: 'AI Installation Specialist',
    description:
      'Step-by-step installation guidance for cable routing, containment, first fix, second fix, and testing.',
    icon: Wrench,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Structured C&G 2391 course content with modules, assessments, and practical exercises.',
    icon: ClipboardCheck,
    category: 'Training',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: 'BS 7671 18th Edition Guide',
    description:
      'Complete guide to the 18th Edition of the IET Wiring Regulations including Amendment 3:2024.',
    icon: FileText,
    category: 'Guide',
  },
  {
    href: '/training/am2-exam-preparation',
    title: 'AM2 Exam Preparation',
    description:
      'Structured preparation for the AM2 practical assessment covering installation tasks, testing, and time management.',
    icon: Target,
    category: 'Training',
  },
];

const features = [
  {
    icon: BookOpen,
    title: 'Plain-English Regulation Explanations',
    description:
      'Ask about any BS 7671 regulation and get a clear explanation in everyday language, with the formal regulation text and practical examples of how it applies on site.',
  },
  {
    icon: ClipboardCheck,
    title: 'Unlimited Practice Questions',
    description:
      'Generate exam-style questions for C&G 2382, 2391, 2365, and AM2. Multiple-choice, short-answer, and scenario-based questions with detailed worked answers.',
  },
  {
    icon: Lightbulb,
    title: 'Concept Breakdowns',
    description:
      'Complex topics like adiabatic equations, discrimination curves, prospective fault current, and earth fault loop impedance broken down into step-by-step explanations.',
  },
  {
    icon: MessageSquare,
    title: 'Conversational Learning',
    description:
      'Ask follow-up questions, request more detail, or ask for different examples. The AI adapts its explanations to your level of understanding.',
  },
  {
    icon: Target,
    title: 'Exam-Focused Study Plans',
    description:
      'Tell the AI which exam you are preparing for and when the exam date is. It creates a personalised study plan covering all syllabus topics with daily targets.',
  },
  {
    icon: Bot,
    title: 'Works Offline on Site',
    description:
      'Study during quiet moments between jobs. The AI Tutor works without signal, so you can learn in basements, plant rooms, and new-build sites with no Wi-Fi.',
  },
];

const howToSteps = [
  {
    name: 'Ask a question or request a topic',
    text: 'Type a question in plain English — for example, "Explain Regulation 411.3.3" or "What is the maximum Zs for a 32A Type B MCB?" — or request a topic to study such as "Teach me about discrimination between protective devices."',
  },
  {
    name: 'Read the explanation',
    text: 'The AI provides a clear, structured explanation with the regulation text, plain-English interpretation, practical examples, and common mistakes to avoid.',
  },
  {
    name: 'Ask follow-up questions',
    text: 'If something is not clear, ask for more detail, a different example, or a simpler explanation. The AI adapts to your level and builds on what you already understand.',
  },
  {
    name: 'Test your understanding',
    text: 'Request practice questions on the topic you have just studied. The AI generates exam-style questions and marks your answers with detailed feedback.',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-ai-tutor',
    heading: 'What Is the AI Tutor for Electricians?',
    content: (
      <>
        <p>
          The AI Tutor is one of eight specialist Elec-AI agents in the Elec-Mate platform. It is
          designed to be a personal study assistant for electricians at every stage of their career
          — from apprentices preparing for their first City & Guilds exam to experienced
          electricians brushing up on the latest regulation changes.
        </p>
        <p>
          The tutor covers the full scope of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          (the 18th Edition of the IET Wiring Regulations including Amendment 3), the IET On-Site
          Guide, all eight IET Guidance Notes, and the syllabuses for C&G 2382, C&G 2391, C&G 2365,
          C&G 2357, the AM2 practical assessment, and the Level 3 electrical apprenticeship EPA.
        </p>
        <p>
          You can ask any question in plain English and get a clear, accurate answer. "What is the
          minimum insulation resistance for a 230V circuit?" "When do I need Type B RCD protection
          instead of Type A?" "Explain the difference between basic protection and fault
          protection." The AI answers each question with the relevant regulation reference, a
          plain-English explanation, and practical examples that make the concept concrete.
        </p>
        <p>
          The AI Tutor is not a pre-written course with fixed content — it is a conversational
          learning tool that responds to your specific questions and adapts its explanations to your
          level of understanding. If you are an apprentice who needs concepts explained from first
          principles, the tutor starts there. If you are an experienced electrician who just needs a
          quick regulation lookup, it provides concise, direct answers. You control the
          conversation.
        </p>
      </>
    ),
  },
  {
    id: 'regulation-explanations',
    heading: 'Every Regulation Explained in Plain English',
    content: (
      <>
        <p>
          BS 7671 is written in formal, precise language that can be difficult to interpret,
          especially when multiple regulations interact. The AI Tutor translates this formal
          language into clear, practical guidance without losing accuracy.
        </p>
        <p>
          For example, if you ask about{' '}
          <SEOInternalLink href="/tools/ai-regulations-lookup">Regulation 411.3.3</SEOInternalLink>{' '}
          (additional protection), the AI will:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Quote the regulation text</strong> exactly as written in BS 7671, so you
                have the authoritative source.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Explain what it means in practice:</strong> "Every socket outlet rated 32A
                or less needs 30 mA RCD protection. Every cable concealed in a wall or partition at
                a depth less than 50mm needs 30 mA RCD protection unless the cable has earthed
                metallic covering or is enclosed in earthed metallic containment."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Give practical examples:</strong> "A kitchen ring final circuit with sockets
                rated 13A — yes, needs RCD. A 40A cooker circuit — no, not required by 411.3.3
                because the circuit rating exceeds 32A."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Highlight common mistakes:</strong> "Many electricians forget that 411.3.3
                applies to mobile equipment up to 32A used outdoors, not just socket outlets."
              </span>
            </li>
          </ul>
        </div>
        <p>
          This approach works for any regulation in BS 7671 — from the fundamental principles in
          Part 1 through to the specific requirements of Part 7 for special installations and
          locations. The AI also covers the Appendices, including the cable sizing tables in
          Appendix 4 and the voltage drop calculations in Appendix 12.
        </p>
      </>
    ),
  },
  {
    id: 'exam-preparation',
    heading: 'Exam Preparation for C&G 2382, 2391, and AM2',
    content: (
      <>
        <p>
          The AI Tutor generates unlimited practice questions matched to the format and difficulty
          level of real City & Guilds examinations. This is one of its most popular features —
          electricians preparing for exams use it to test their knowledge on specific topics and
          identify gaps in their understanding.
        </p>
        <p>
          For the <strong>C&G 2382 (18th Edition)</strong> exam, the AI produces multiple-choice
          questions that require precise knowledge of regulation numbers, maximum values, and
          specific requirements. These mirror the style of the actual exam, where you need to know
          exact figures (such as maximum earth fault loop impedance values from Tables 41.2-41.6)
          and apply regulations to specific scenarios.
        </p>
        <p>
          For the <strong>C&G 2391 (Inspection and Testing)</strong> exam, the AI generates
          scenario-based questions about{' '}
          <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR completion</SEOInternalLink>,
          test procedures, instrument selection, result interpretation, and fault-finding. It also
          covers the written report element of the 2391, where candidates must describe their
          findings and recommendations clearly.
        </p>
        <p>
          For the <strong>AM2 practical assessment</strong>, the AI provides detailed guidance on
          each task, the marking criteria, time management strategies, and common reasons for
          failure. While it cannot replace hands-on practice, it ensures you understand the
          requirements thoroughly before the assessment day.
        </p>
        <SEOAppBridge
          title="Start revising for your next exam"
          description="Open the AI Tutor, tell it which exam you are preparing for, and start generating practice questions. Track your progress and focus on weak areas."
          icon={GraduationCap}
        />
      </>
    ),
  },
  {
    id: 'concept-breakdowns',
    heading: 'Complex Concepts Made Simple',
    content: (
      <>
        <p>
          Some electrical concepts are inherently complex — they involve multiple interacting
          variables and require understanding of the underlying physics as well as the regulatory
          requirements. The AI Tutor breaks these down into manageable steps.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">
              Adiabatic Equation (k2S2 greater than or equal to I2t)
            </h4>
            <p className="text-white text-sm leading-relaxed">
              The AI explains the adiabatic equation step by step: what each variable represents (k
              = conductor material factor, S = conductor cross-sectional area, I = fault current, t
              = disconnection time), why the equation matters (it verifies the cable can withstand
              fault current without the insulation being damaged), and how to apply it in practice
              with a worked example using real values from the{' '}
              <SEOInternalLink href="/calculators/adiabatic-equation">
                adiabatic equation calculator
              </SEOInternalLink>
              .
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Discrimination Between Protective Devices</h4>
            <p className="text-white text-sm leading-relaxed">
              The AI explains what discrimination means (the ability of the device closest to the
              fault to operate before upstream devices), why it matters (to avoid unnecessary
              disconnection of healthy circuits), and how to verify it using time-current curves and
              manufacturer data. It covers both current discrimination and time discrimination, and
              explains the practical implications for consumer unit and distribution board design.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Earth Fault Loop Impedance</h4>
            <p className="text-white text-sm leading-relaxed">
              The AI explains the complete earth fault loop path (from the point of fault, through
              the CPC, main earthing terminal, earthing conductor, means of earthing, and back
              through the supply transformer), the formula Zs = Ze + (R1+R2), how to apply
              temperature correction to measured values, and how to verify compliance against the
              maximum Zs values in BS 7671 Tables 41.2-41.6.
            </p>
          </div>
        </div>
        <p>
          The AI adapts its explanations to your level. If you ask for a simpler explanation, it
          strips back the technical detail and focuses on the practical application. If you ask for
          more depth, it goes into the underlying physics and mathematics. This makes it equally
          useful for a Level 2 apprentice and an experienced electrician studying for a specialist
          qualification.
        </p>
      </>
    ),
  },
  {
    id: 'study-on-site',
    heading: 'Study on Site Between Jobs',
    content: (
      <>
        <p>
          One of the most practical uses of the AI Tutor is on-site learning. Electricians spend a
          significant amount of their working day waiting — waiting for inspections, waiting for
          other trades to finish, waiting for materials, or simply taking a break between tasks.
          These short windows are ideal for quick study sessions.
        </p>
        <p>
          The AI Tutor works offline, so you can use it on sites with no signal — basements, plant
          rooms, new-build sites with no Wi-Fi, and rural locations. When connectivity returns, your
          progress syncs automatically.
        </p>
        <p>
          Common on-site study patterns include: looking up a regulation you have just encountered
          during your work (turning a real-world observation into a learning moment), working
          through 5-10 practice questions during a lunch break, and reviewing a specific topic
          before a supervision meeting or college session. The app saves your study history,
          bookmarks, and progress, so you can pick up exactly where you left off.
        </p>
        <p>
          For apprentices, this "study while you earn" approach is particularly effective. It
          connects classroom learning to real-world application — when you encounter a regulation on
          site, you understand it more deeply than if you had only read it in a textbook. Many{' '}
          <SEOInternalLink href="/training/apprentice">electrical apprentices</SEOInternalLink>{' '}
          using Elec-Mate report that the AI Tutor helped them understand regulations they had
          struggled with in college, because the AI explains them in the context of actual
          installation work.
        </p>
        <SEOAppBridge
          title="Turn every quiet moment into a study session"
          description="The AI Tutor works offline on site. Ask a regulation question, generate practice questions, or study a specific topic — all from your phone during downtime."
          icon={BookOpen}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function AITutorPage() {
  return (
    <ToolTemplate
      title="AI Tutor for Electricians | Study Assistant"
      description="AI study assistant for UK electricians. Explains any BS 7671 regulation in plain English, generates unlimited practice questions for C&G 2382, 2391, and AM2, and breaks down complex concepts step by step."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="AI Study Agent"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          AI Tutor for Electricians:{' '}
          <span className="text-yellow-400">Your Personal Study Assistant</span>
        </>
      }
      heroSubtitle="Ask any question about electrical regulations and get a clear, plain-English explanation. Generate unlimited practice questions for C&G 2382, 2391, and AM2 exams. Break down complex concepts step by step. Study on site, offline, between jobs."
      heroFeaturePills={[
        { icon: BookOpen, label: 'Plain-English Explanations' },
        { icon: ClipboardCheck, label: 'Practice Questions' },
        { icon: Lightbulb, label: 'Concept Breakdowns' },
        { icon: Bot, label: 'Works Offline' },
      ]}
      readingTime={9}
      keyTakeaways={keyTakeaways}
      sections={sections}
      features={features}
      featuresHeading="AI Tutor Features"
      featuresSubheading="Everything you need to study for UK electrical qualifications. Tailored for BS 7671:2018+A3:2024 and all major City & Guilds exams."
      howToSteps={howToSteps}
      howToHeading="How to Use the AI Tutor"
      howToDescription="Four steps from question to understanding. Ask, learn, follow up, and test yourself."
      faqs={faqs}
      faqHeading="Frequently Asked Questions About the AI Tutor"
      relatedPages={relatedPages}
      ctaHeading="Start Learning with Your AI Tutor"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate's AI Tutor for exam preparation and on-site learning. 7-day free trial, cancel anytime."
      toolPath="/tools/ai-tutor"
    />
  );
}
