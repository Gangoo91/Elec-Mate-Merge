import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  BookOpen,
  Wrench,
  ClipboardCheck,
  Zap,
  PoundSterling,
  FileCheck2,
  Award,
  HardHat,
  Briefcase,
  Target,
  CheckCircle2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/guides/electrical-apprenticeship-guide' },
  { label: 'Year 3', href: '/guides/year-3-electrical-apprentice' },
];

const tocItems = [
  { id: 'overview', label: 'Year 3 Overview' },
  { id: 'level-3-diploma', label: 'Level 3 Diploma' },
  { id: 'site-responsibility', label: 'Increased Site Responsibility' },
  { id: 'typical-work', label: 'Typical Work in Year 3' },
  { id: 'am2-preparation', label: 'Preparing for AM2' },
  { id: 'eighteenth-edition', label: '18th Edition Exam' },
  { id: 'pay-progression', label: 'Pay Progression' },
  { id: 'portfolio-evidence', label: 'Building Portfolio Evidence' },
  { id: 'for-apprentices', label: 'Tips for Year 3' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Year 3 is where the Level 3 Diploma in Electrical Installations ramps up — you will cover design, inspection and testing theory, and fault diagnosis alongside practical site work.',
  'Your employer will expect you to take on more responsibility: running jobs with less supervision, managing materials, and mentoring year 1 and 2 apprentices on site.',
  'AM2 preparation should start in year 3. Familiarise yourself with the assessment format, practise timed installations, and book a practice session at your local assessment centre if available.',
  'The 18th Edition (BS 7671) exam is a key milestone — many apprentices sit it during year 3 so they are qualified before their end-point assessment.',
  'JIB year 3 apprentice rates are significantly higher than year 1 and 2 — you should be earning a wage that reflects your growing competence and value to the business.',
];

const faqs = [
  {
    question: 'What do you study in year 3 of an electrical apprenticeship?',
    answer:
      'Year 3 focuses on the Level 3 Diploma in Electrical Installations (City & Guilds 5357 or equivalent). Key units include electrical design, inspection and testing principles, fault diagnosis and rectification, and special locations (bathrooms, swimming pools, construction sites). You will also study more advanced science — three-phase theory, power factor, and transformer principles. The practical element continues alongside the theory, with an expectation that you are completing more complex work on site. Many colleges deliver the 18th Edition (BS 7671) qualification during year 3 as well.',
  },
  {
    question: 'How much does a year 3 electrical apprentice earn in 2026?',
    answer:
      'Under the JIB (Joint Industry Board) grading structure, a year 3 apprentice in 2026 earns approximately £13.00 to £14.50 per hour depending on the employer and region. This is a significant step up from year 2 rates. Some employers pay above JIB rates for year 3 apprentices, particularly in London and the South East where labour demand is high. If your employer is not JIB-registered, negotiate based on the JIB rate as a benchmark — you are delivering productive work and should be compensated accordingly. Overtime rates, travel allowances, and tool allowances may also apply.',
  },
  {
    question: 'When should I start preparing for the AM2 assessment?',
    answer:
      'Start familiarising yourself with the AM2 format and requirements during year 3, even though you will not sit the assessment until year 4 or the end of your apprenticeship. The AM2 is a two-day practical assessment covering installation, inspection and testing, and fault diagnosis. Practise working to a timed brief — speed and accuracy matter. Ask your employer to let you practise on mock installations or decommissioned boards. Some training providers offer AM2 preparation courses that include a practice assessment at the actual test centre. The earlier you start practising timed work, the more confident you will be on the day.',
  },
  {
    question: 'What is the 18th Edition exam and when should I take it?',
    answer:
      'The 18th Edition exam is the City & Guilds 2382 qualification — Requirements for Electrical Installations (BS 7671:2018+A3:2024). It is a closed-book, multiple-choice exam lasting 2 hours with 60 questions. You need 60% to pass. The exam tests your knowledge of the Wiring Regulations: earthing arrangements, circuit design, inspection and testing requirements, special locations, and appendix tables. Most apprentices sit this during year 3 of their apprenticeship. You can study using your college notes, a dedicated 18th Edition course, or self-study with the IET On-Site Guide and BS 7671 book. Passing the 18th Edition is essential for your career — it is a prerequisite for most inspection and testing qualifications and employer registration schemes.',
  },
  {
    question: 'What kind of work should I be doing on site in year 3?',
    answer:
      'By year 3, you should be undertaking first fix and second fix work with reduced supervision: installing consumer units, running cables and containment, wiring accessories, and connecting final circuits. You may be trusted to manage smaller jobs independently — replacing a consumer unit, installing a new circuit for an electric shower, or wiring a garage. Your employer should also be exposing you to testing work: using a multifunction tester under supervision, recording results, and understanding what the readings mean. If you are not getting this level of responsibility, have a conversation with your employer — year 3 is about building the competence you need for the AM2 and your career.',
  },
  {
    question: 'How do I build portfolio evidence in year 3?',
    answer:
      'Your portfolio should document the range and quality of work you complete on site. Photograph every significant piece of work: first fix containment runs, cable installations, consumer unit connections, accessory terminations, and completed jobs. Include a brief description of the work, the date, and the location (with the customer name removed for data protection). Get witness testimonies from your supervisor confirming the work you did and your level of competence. Keep copies of any test results you helped produce, risk assessments you contributed to, and method statements you worked from. A well-organised portfolio with clear photographic evidence makes your NVQ assessment much smoother — assessors want to see proof that you have done the work, not just read about it.',
  },
  {
    question: 'Can I fail the apprenticeship in year 3?',
    answer:
      'It is possible to fall behind, but your employer and training provider should support you to catch up. If you are failing theory exams, ask your college for additional support — most providers offer extra revision sessions and one-to-one tutoring. If your on-site experience is too narrow (for example, you have only done domestic rewires and have no commercial experience), raise this with your employer and your apprenticeship coordinator. The end-point assessment requires evidence of a range of work across different installation types. If you are struggling, the worst thing you can do is stay quiet — speak to your assessor, your college tutor, or your employer early so the issue can be addressed before it becomes a serious problem.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/year-2-electrical-apprentice',
    title: 'Year 2 Apprentice Guide',
    description:
      'Recap what you should have covered in year 2 before moving into year 3 study and site work.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/year-4-electrical-apprentice',
    title: 'Year 4 Final Year Guide',
    description:
      'What to expect in your final year — AM2, EPA, and transitioning to qualified electrician.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/am2-exam-preparation',
    title: 'AM2 Exam Preparation',
    description:
      'Detailed guide to the AM2 practical assessment with tips from electricians who have passed.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/bs-7671-18th-edition-guide',
    title: '18th Edition Guide',
    description:
      'Comprehensive guide to BS 7671:2018+A3:2024 — the Wiring Regulations you need to know.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-science-revision',
    title: 'Electrical Science Revision',
    description:
      'Revise Ohm\'s law, power calculations, AC theory, and three-phase for your Level 3 exams.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/nvq-level-2-electrical-portfolio',
    title: 'NVQ Portfolio Guide',
    description:
      'How to structure your portfolio, photograph work, and collect the evidence your assessor needs.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Year 3 Electrical Apprentice: What Changes',
    content: (
      <>
        <p>
          Year 3 is when your apprenticeship shifts gear. The first two years were about building
          foundations — learning safe isolation, basic installation techniques, and getting
          comfortable on site. Year 3 is about developing the competence and confidence you need to
          work as a qualified electrician.
        </p>
        <p>
          At college, you move into the Level 3 Diploma content: design, inspection and testing
          theory, fault diagnosis, and special locations. On site, your employer should be giving you
          more responsibility — running smaller jobs, managing materials, and working with less
          direct supervision.
        </p>
        <p>
          This is also the year where key qualifications come into play. Most apprentices sit the{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            18th Edition (C&G 2382)
          </SEOInternalLink>{' '}
          exam during year 3, and AM2 preparation should be well underway. The portfolio evidence you
          are building on site feeds directly into your NVQ assessment and your end-point assessment.
        </p>
        <p>
          This guide covers everything you need to know about year 3 — what you will study, what
          work you should be doing, how to prepare for the AM2, pay rates, and how to build strong
          portfolio evidence.
        </p>
      </>
    ),
  },
  {
    id: 'level-3-diploma',
    heading: 'Level 3 Diploma in Electrical Installations',
    content: (
      <>
        <p>
          The Level 3 Diploma (typically City & Guilds 5357 or equivalent) builds on the Level 2
          content you covered in years 1 and 2. The core units are more demanding and the theory
          content requires a solid understanding of the science fundamentals.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical installation design</strong> — calculating maximum demand,
                diversity, cable sizing using Appendix 4 tables, correction factors, and designing
                circuits that comply with BS 7671. This is where the maths from your science units
                becomes practical.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspection and testing principles</strong> — understanding the testing
                sequence, what each test measures, acceptable values, and how to interpret results.
                You will learn about continuity, insulation resistance, polarity, earth fault loop
                impedance, RCD testing, and prospective fault current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault diagnosis and rectification</strong> — a critical skill for qualified
                electricians. You will study systematic fault-finding techniques: reading symptoms,
                identifying possible causes, testing to confirm, and rectifying safely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Special locations</strong> — Part 7 of BS 7671 covers locations with
                additional risks: bathrooms, swimming pools, saunas, construction sites, agricultural
                premises, and more. Each has specific requirements for IP ratings, supplementary
                bonding, RCD protection, and zone restrictions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Advanced electrical science</strong> — three-phase systems, power factor,
                transformer principles, motor theory, and AC circuit analysis. These topics underpin
                commercial and industrial work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The Level 3 Diploma is assessed through a combination of written exams, practical
          assessments, and portfolio evidence. Stay on top of the theory — it directly feeds into your
          18th Edition exam and your AM2 preparation.
        </p>
      </>
    ),
  },
  {
    id: 'site-responsibility',
    heading: 'Increased Site Responsibility',
    content: (
      <>
        <p>
          By year 3, your employer should be trusting you with more independence. You are no longer
          the person who just carries materials and watches — you are a productive member of the
          team who can be given a brief and deliver quality work.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">What You Should Be Doing</h3>
            <p className="text-white text-sm leading-relaxed">
              Running smaller jobs with periodic check-ins rather than constant supervision.
              Installing consumer units and making final connections (supervised sign-off). Running
              containment and cables for full circuits. Wiring accessories and terminating at
              distribution boards. Managing materials for your jobs — ordering, checking deliveries,
              minimising waste. Mentoring year 1 or year 2 apprentices when they join you on site.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">What Your Employer Should Provide</h3>
            <p className="text-white text-sm leading-relaxed">
              Exposure to different types of work — domestic, commercial, and industrial if possible.
              Opportunities to use test equipment under supervision. Feedback on the quality of your
              work, not just whether it is done. Time and support for college attendance and studying.
              A clear progression plan showing how you will reach the AM2 and EPA.
            </p>
          </div>
        </div>
        <p>
          If you feel stuck doing the same repetitive work with no progression, raise it with your
          employer and your apprenticeship assessor. Year 3 is critical for building the range of
          experience your portfolio and EPA require. A good employer will actively plan your
          development; a less engaged employer may need prompting.
        </p>
      </>
    ),
  },
  {
    id: 'typical-work',
    heading: 'Typical Work in Year 3',
    content: (
      <>
        <p>
          The practical work you do in year 3 should be stretching your abilities. Here is what a
          well-structured apprenticeship looks like at this stage:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>First fix</strong> — installing back boxes, running cable routes, fitting
                containment (trunking, conduit, cable tray), and pulling cables. By year 3, you
                should be able to first fix a room or small property with minimal supervision,
                following the electrical drawings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Second fix</strong> — terminating accessories (sockets, switches, light
                fittings), making off at the consumer unit or distribution board, and labelling
                circuits. Neatness and accuracy matter — poor terminations are a common cause of
                faults and a frequent AM2 failure point.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing (under supervision)</strong> — using a multifunction tester to carry
                out continuity, insulation resistance, and polarity tests. Recording results
                accurately. Understanding what the readings mean and what to do if a result is
                outside acceptable limits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit changes</strong> — one of the most common domestic jobs. You
                should be involved in the full process: safe isolation, disconnection, mechanical
                installation, circuit identification, termination, and testing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fault finding</strong> — working with a qualified electrician to diagnose
                faults. Observing the systematic approach: gathering information, making
                assumptions, testing to confirm, and rectifying. This is one of the hardest skills
                to learn and one of the most valuable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Document everything you do. Every job is portfolio evidence — photograph your work before,
          during, and after. Get witness testimonies from your supervisor. The more evidence you
          collect now, the easier your NVQ assessment and EPA will be.
        </p>
      </>
    ),
  },
  {
    id: 'am2-preparation',
    heading: 'Preparing for the AM2 Assessment',
    content: (
      <>
        <p>
          The{' '}
          <SEOInternalLink href="/am2-exam-preparation">
            AM2 (Achievement Measurement 2)
          </SEOInternalLink>{' '}
          is the practical assessment that proves you can work as a competent electrician. Although
          you will not sit it until year 4 or later, year 3 is when preparation should begin in
          earnest.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">AM2 at a Glance</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Day 1</strong> — Installation: wiring a small installation to a given
                specification within a time limit. Includes containment, cabling, termination at the
                consumer unit, and accessory connections.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Day 2</strong> — Inspection, testing, and fault diagnosis: carrying out a
                full inspection and test on a pre-wired installation, completing the relevant
                certificates, and diagnosing and rectifying pre-set faults.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The best way to prepare is to practise under timed conditions. On site, pay attention to
          how quickly you work and where you lose time. Common AM2 failure points include:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Running out of time — practise working efficiently, not rushing</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Poor terminations — loose connections, damaged insulation, untidy work</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Incorrect test procedures — not following the correct testing sequence</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Certificate errors — missing information, incorrect observations codes</span>
            </li>
          </ul>
        </div>
        <p>
          Ask your training provider about AM2 preparation courses. Some assessment centres offer
          practice sessions where you can work in the actual assessment environment. This is
          invaluable for managing nerves and understanding the format.
        </p>
      </>
    ),
  },
  {
    id: 'eighteenth-edition',
    heading: '18th Edition Exam (C&G 2382)',
    content: (
      <>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            18th Edition exam
          </SEOInternalLink>{' '}
          (City & Guilds 2382) is a qualification every electrician needs. It demonstrates that you
          understand BS 7671 — the Wiring Regulations that govern every electrical installation in
          the UK.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Format</strong> — closed-book, 60 multiple-choice questions, 2-hour time
                limit. Pass mark is 60% (36 out of 60).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Topics covered</strong> — scope and object of BS 7671, definitions,
                assessment of general characteristics, protection for safety (overload, fault, shock),
                earthing arrangements (TN-C-S, TN-S, TT), circuit design and cable sizing, inspection
                and testing, special locations (Part 7), and appendix tables.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BookOpen className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Study approach</strong> — work through BS 7671 section by section alongside
                the IET On-Site Guide. Use practice exams to identify weak areas. Focus on the
                regulation numbers you need to look up quickly — knowing where to find information is
                as important as memorising it.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Many apprentices find the 18th Edition exam challenging because it is the first time they
          face BS 7671 as a standalone assessment. Give yourself at least 6 to 8 weeks of dedicated
          study. Use the{' '}
          <SEOInternalLink href="/guides/mock-exams-electrical">
            Elec-Mate mock exams
          </SEOInternalLink>{' '}
          to test yourself under timed conditions before the real exam.
        </p>
      </>
    ),
  },
  {
    id: 'pay-progression',
    heading: 'Year 3 Pay Progression',
    content: (
      <>
        <p>
          Your pay should increase significantly in year 3, reflecting the fact that you are now a
          productive contributor on site rather than someone who needs constant guidance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>JIB year 3 rate (2026)</strong> — approximately £14.50 to £16.00 per hour.
                JIB rates are reviewed annually and represent the industry standard for directly
                employed apprentices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-JIB employers</strong> — rates vary but should be at least in line with
                the JIB benchmark. If your employer is paying significantly below JIB rates for a
                year 3 apprentice, this is worth raising. You are delivering skilled work and your
                pay should reflect that.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional earnings</strong> — overtime rates (typically time-and-a-half or
                double time for weekends), travel allowances for distant sites, and tool allowances
                are common. Check your contract and ask what is available.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Progression to qualified rates</strong> — once you complete your
                apprenticeship and pass the AM2, your pay jumps to qualified electrician rates
                (approximately £18 to £22 per hour employed, or significantly more self-employed).
                Year 3 is the last stretch before that step up.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Keep a record of your hours and pay. If you are underpaid, your apprenticeship provider or
          the JIB can advise on the correct rates and help resolve disputes. You have rights as an
          apprentice — do not accept being exploited.
        </p>
      </>
    ),
  },
  {
    id: 'portfolio-evidence',
    heading: 'Building Portfolio Evidence',
    content: (
      <>
        <p>
          Your portfolio is the documented proof that you have completed the work required for your
          NVQ and end-point assessment. Year 3 is when the quality and range of your evidence
          should really grow.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Photographic evidence</strong> — photograph your work at key stages: before
                (existing installation), during (containment, cabling, terminations), and after
                (completed job, labelled circuits, tested). Take clear, well-lit photos that show the
                quality of your work. Include a reference (a note or label) so you can link the
                photos to the specific job.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Witness testimonies</strong> — your supervisor or qualified electrician signs
                a statement confirming what work you did, when, and to what standard. Get these
                regularly — not all at the end. A testimony from a different supervisor or site
                carries extra weight.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test results and certificates</strong> — keep copies of any test results you
                helped produce, certificates you contributed to, and risk assessments or method
                statements you worked from. These demonstrate your exposure to the full scope of
                electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Range of evidence</strong> — your portfolio needs to cover domestic,
                commercial, and (ideally) industrial work. If your employer only does domestic work,
                discuss with your assessor how to demonstrate commercial competence — college
                practical sessions or a short placement with another company may be options.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Build your portfolio digitally"
          description="Elec-Mate helps apprentices organise portfolio evidence, photograph work with structured templates, and track NVQ progress. Digital evidence is easier to organise, share with assessors, and keep safe."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'for-apprentices',
    heading: 'Tips for Getting the Most Out of Year 3',
    content: (
      <>
        <p>
          Year 3 goes quickly. Here is how to make the most of it and set yourself up for a strong
          finish to your apprenticeship:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Target className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Set Clear Goals</h4>
                <p className="text-white text-sm leading-relaxed">
                  Know what you need to achieve by the end of year 3: pass the 18th Edition, complete
                  specific NVQ units, build a portfolio covering a range of work types. Write these
                  down and review them monthly. Share them with your employer so they can plan your
                  work accordingly.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <HardHat className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Ask for More Responsibility</h4>
                <p className="text-white text-sm leading-relaxed">
                  Do not wait to be offered harder work. Ask to lead a small job. Volunteer to do the
                  testing (under supervision). Offer to mentor the first-year apprentice. The more you
                  push yourself, the faster you develop. Your employer will respect initiative — and
                  your portfolio will benefit.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Briefcase className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Think About Your Future</h4>
                <p className="text-white text-sm leading-relaxed">
                  Year 4 is your final year. Start thinking about what happens after qualification.
                  Do you want to stay with your current employer? Go self-employed? Specialise in
                  testing, renewables, or commercial work? Having a direction helps you focus your
                  year 3 and 4 development on the skills you will actually need.
                </p>
              </div>
            </div>
          </div>
        </div>
        <p>
          Above all, keep going. Year 3 can feel overwhelming — the theory gets harder, the
          expectations increase, and the AM2 looms on the horizon. But you have already completed
          two years. You know more than you think. Stay consistent with your studying, keep building
          your portfolio, and ask for help when you need it.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function Year3ElectricalApprenticePage() {
  return (
    <GuideTemplate
      title="Year 3 Electrical Apprentice | What to Expect 2026"
      description="Complete guide to year 3 of an electrical apprenticeship in the UK. Level 3 diploma, increased site responsibility, AM2 preparation, 18th Edition exam, pay progression, and building portfolio evidence."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          Year 3 Electrical Apprentice:{' '}
          <span className="text-yellow-400">What to Expect in 2026</span>
        </>
      }
      heroSubtitle="Year 3 is where your apprenticeship gets serious. Level 3 diploma content, more site responsibility, AM2 preparation, and the 18th Edition exam. Here is everything you need to know to make the most of it."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Year 3 Electrical Apprenticeships"
      relatedPages={relatedPages}
      ctaHeading="Study Smarter with Elec-Mate"
      ctaSubheading="Mock exams, revision flashcards, portfolio tools, and AI tutoring for electrical apprentices. Track your progress and prepare for the 18th Edition and AM2 with confidence. 7-day free trial."
    />
  );
}
