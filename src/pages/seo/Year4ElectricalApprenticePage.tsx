import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  BookOpen,
  Award,
  ClipboardCheck,
  Zap,
  PoundSterling,
  FileCheck2,
  Target,
  Briefcase,
  ShieldCheck,
  Rocket,
  CheckCircle2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Apprentice', href: '/guides/electrical-apprenticeship-guide' },
  { label: 'Year 4', href: '/guides/year-4-electrical-apprentice' },
];

const tocItems = [
  { id: 'overview', label: 'Final Year Overview' },
  { id: 'am2-assessment', label: 'AM2 Assessment' },
  { id: 'epa', label: 'End-Point Assessment (EPA)' },
  { id: 'final-portfolio', label: 'Final Portfolio Submission' },
  { id: 'transitioning', label: 'Becoming a Qualified Electrician' },
  { id: 'registration', label: 'NICEIC, NAPIT & Registration' },
  { id: 'employed-vs-self-employed', label: 'Employed vs Self-Employed' },
  { id: 'job-market', label: 'Job Market Preparation' },
  { id: 'for-apprentices', label: 'Final Year Tips' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The AM2 is a two-day practical assessment that proves you can install, inspect, test, and diagnose faults to a competent standard. It is the gateway to becoming a qualified electrician.',
  'The End-Point Assessment (EPA) is the final assessment of your apprenticeship standard — it includes a practical observation, a professional discussion, and evidence review.',
  'Your portfolio must be complete and cover the full range of work specified in your apprenticeship standard before you can enter the EPA gateway.',
  'After qualifying, you can register individually with NICEIC, NAPIT, or ELECSA to self-certify notifiable work under Part P — essential if you plan to go self-employed.',
  'The choice between staying employed and going self-employed depends on your financial situation, risk tolerance, and the local market. Both paths have strong earning potential.',
];

const faqs = [
  {
    question: 'What happens in the AM2 assessment?',
    answer:
      'The AM2 is a two-day practical assessment at a JIB-approved centre. Day 1 is installation: you wire a small installation to a given specification within a time limit, including containment, cabling, consumer unit termination, and accessory connections. Day 2 is inspection, testing, and fault diagnosis: you carry out a full initial verification on a pre-wired installation, complete the relevant certificates (EIC and schedule of test results), and diagnose and rectify pre-set faults. You are assessed on safety, quality of work, accuracy of testing, certificate completion, and time management. The pass rate varies but is typically around 70% — proper preparation significantly improves your chances.',
  },
  {
    question: 'What is the End-Point Assessment (EPA)?',
    answer:
      'The EPA is the final assessment of your apprenticeship, separate from the AM2. It is conducted by an independent End-Point Assessment Organisation (EPAO) and assesses whether you have met the occupational standard for an Installation Electrician or Maintenance Electrician. The EPA typically consists of three components: a practical observation (you are watched completing a real or simulated electrical task), a professional discussion underpinned by your portfolio (the assessor asks questions about your work experience, knowledge, and decision-making), and a knowledge test. You must pass the AM2 before you can enter the EPA gateway. The EPA result is graded as Fail, Pass, or Distinction.',
  },
  {
    question: 'How do I register with NICEIC or NAPIT after qualifying?',
    answer:
      'Once you have your AM2 pass, 18th Edition certificate (C&G 2382), and your apprenticeship completion certificate, you can apply for individual registration with a competent person scheme. NICEIC Domestic Installer registration requires the AM2 (or equivalent), 18th Edition, and evidence of competence. NAPIT offers a similar Domestic Installer scheme. The application process involves submitting your qualifications, paying a registration fee (typically £300 to £500 per year), and in some cases completing a practical assessment or inspection of completed work. Registration allows you to self-certify notifiable electrical work under Part P of the Building Regulations — without it, you need to use local authority Building Control for notification, which adds cost and delay.',
  },
  {
    question: 'Should I go self-employed or stay employed after qualifying?',
    answer:
      'Both are viable. Staying employed gives you a steady income, pension contributions, holiday pay, sick pay, and continued mentoring from experienced electricians. It also means someone else handles finding work, buying materials, and managing the business. Going self-employed offers higher earning potential (day rates of £200 to £350+ for domestic work), flexibility over your schedule, and the ability to build your own business. However, it comes with risk: no guaranteed income, you pay for your own tools, van, insurance, and qualifications, and you handle your own tax (self-assessment or limited company). Many newly qualified electricians stay employed for 1 to 2 years to build experience and savings before going self-employed. There is no rush — build your confidence and your financial buffer first.',
  },
  {
    question: 'What qualifications do I need to complete before the EPA?',
    answer:
      'Before entering the EPA gateway, you typically need: Level 3 Diploma in Electrical Installations (or equivalent), 18th Edition (C&G 2382), AM2 pass, Level 2 functional skills in English and maths (if not already achieved), and a complete portfolio of evidence covering the apprenticeship standard. Your training provider and employer will confirm the exact gateway requirements for your specific apprenticeship standard. Make sure you have all certificates and qualifications in hand — do not assume they will arrive in time. Chase exam results and certificate dispatch if needed.',
  },
  {
    question: 'How long does it take to find work as a newly qualified electrician?',
    answer:
      'Demand for qualified electricians in the UK remains strong in 2026. If you stay with your current employer, the transition is seamless — you simply move to a qualified rate. If you are looking for a new employer, most qualified electricians with an AM2 and 18th Edition find work within 2 to 4 weeks through recruitment agencies, job boards, or word of mouth. If you go self-employed, building a customer base takes longer — 3 to 6 months to get a steady flow of work, typically through local advertising, word of mouth, and trade directories (Checkatrade, MyBuilder, Bark). Start networking before you qualify: let friends, family, and existing contacts know you are about to become a qualified electrician.',
  },
  {
    question: 'What should I do if I fail the AM2?',
    answer:
      'Failing the AM2 is not the end of the world — approximately 30% of candidates fail on their first attempt. You can rebook and resit after a minimum waiting period (typically 14 to 28 days depending on the assessment centre). Before resitting, analyse what went wrong: was it time management, quality of terminations, testing procedure, certificate completion, or fault diagnosis? Book an AM2 preparation course if you did not do one before the first attempt. Practise the specific areas where you failed. Many candidates who fail first time pass comfortably on the resit because they know the format and have addressed their weak areas. Your employer and training provider should support you through this process.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/year-3-electrical-apprentice',
    title: 'Year 3 Apprentice Guide',
    description:
      'Recap what you should have covered in year 3 — Level 3 diploma, 18th Edition, and AM2 prep.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/am2-exam-preparation',
    title: 'AM2 Exam Preparation',
    description:
      'Detailed guide to the AM2 practical assessment — format, tips, and common failure points.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/going-self-employed-electrician',
    title: 'Going Self-Employed',
    description:
      'Everything you need to know about setting up as a self-employed electrician in the UK.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/guides/niceic-registration',
    title: 'NICEIC Registration Guide',
    description:
      'How to register with NICEIC as a Domestic Installer or Approved Contractor.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/epa-what-to-expect',
    title: 'EPA: What to Expect',
    description:
      'Detailed breakdown of the End-Point Assessment process for electrical apprenticeships.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-salary-uk',
    title: 'Electrician Salary UK',
    description:
      'What qualified electricians earn in the UK — employed, self-employed, and specialised roles.',
    icon: PoundSterling,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Year 4: The Final Stretch',
    content: (
      <>
        <p>
          Year 4 is the culmination of everything you have worked towards. The theory, the site
          experience, the exams, the portfolio — it all comes together in your final year. By the
          end of year 4, you will have completed the AM2, passed your End-Point Assessment, and
          earned the right to call yourself a qualified electrician.
        </p>
        <p>
          This year is demanding. You are balancing the final units of your Level 3 Diploma, AM2
          preparation, EPA preparation, portfolio completion, and continuing site work. The workload
          is heavy, but the reward is significant — a skilled trade qualification that will support
          your career for decades.
        </p>
        <p>
          This guide covers the key milestones of year 4: the AM2 assessment, EPA, final portfolio
          submission, registering with competent person schemes, and making the decision between
          staying employed and going self-employed.
        </p>
      </>
    ),
  },
  {
    id: 'am2-assessment',
    heading: 'AM2: The Practical Assessment',
    content: (
      <>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/am2-exam-preparation">
            AM2 (Achievement Measurement 2)
          </SEOInternalLink>{' '}
          is the industry-standard practical assessment for electricians completing their
          apprenticeship. It is administered by the JIB at approved assessment centres across the UK.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Day 1 — Installation</h3>
            <p className="text-white text-sm leading-relaxed">
              You receive a specification and drawings for a small installation. Within the time
              limit, you must install containment (conduit, trunking, or tray), pull and fix cables,
              terminate at the consumer unit, and connect accessories. The assessment covers safe
              working practices, quality of mechanical installation, cable management, and accuracy of
              terminations. Every connection is inspected. Neatness matters — this is not about speed
              alone, it is about producing work to a professional standard within a reasonable
              timeframe.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Day 2 — Testing & Faults</h3>
            <p className="text-white text-sm leading-relaxed">
              You carry out a full initial verification on a pre-wired installation: continuity of
              protective conductors, continuity of ring final circuit conductors, insulation
              resistance, polarity, earth fault loop impedance, RCD operation, and prospective fault
              current. You complete an Electrical Installation Certificate and Schedule of Test
              Results. Then you diagnose and rectify pre-set faults in a separate installation using
              safe isolation and systematic fault-finding techniques.
            </p>
          </div>
        </div>
        <p>
          Book your AM2 as early as possible — assessment centre slots fill up quickly, especially
          in spring and summer when many apprentices are reaching the end of their programme. Allow
          time for a resit if needed.
        </p>
      </>
    ),
  },
  {
    id: 'epa',
    heading: 'End-Point Assessment (EPA)',
    content: (
      <>
        <p>
          The{' '}
          <SEOInternalLink href="/guides/epa-what-to-expect">
            End-Point Assessment
          </SEOInternalLink>{' '}
          is the final hurdle of your apprenticeship. It is conducted by an independent EPAO
          (End-Point Assessment Organisation) and assesses you against the occupational standard for
          your apprenticeship.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EPA gateway</strong> — before you can take the EPA, you must meet gateway
                requirements: AM2 pass, Level 3 Diploma, 18th Edition, functional skills, and a
                complete portfolio. Your employer and training provider confirm you are ready.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practical observation</strong> — an assessor watches you complete a real or
                simulated electrical task. They assess your technical competence, safety awareness,
                communication, and professionalism. This is typically 3 to 4 hours.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional discussion</strong> — a structured conversation (typically 60
                to 90 minutes) where the assessor asks about your portfolio evidence, work
                experience, decision-making, and understanding of the trade. Prepare by reviewing
                your portfolio and being ready to explain why you made specific decisions on site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Knowledge test</strong> — a written or online test covering the knowledge
                requirements of the apprenticeship standard. If you have been keeping up with your
                theory and passed your Level 3 exams and 18th Edition, this should be manageable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EPA is graded Fail, Pass, or Distinction. A Distinction demonstrates outstanding
          competence and can help you stand out when applying for jobs or registration with
          competent person schemes.
        </p>
      </>
    ),
  },
  {
    id: 'final-portfolio',
    heading: 'Final Portfolio Submission',
    content: (
      <>
        <p>
          Your portfolio must be complete before you enter the EPA gateway. This is not something
          you can rush at the last minute — if your evidence is thin, your assessor will not sign
          you off as gateway-ready.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Portfolio Checklist</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Evidence of domestic electrical work (rewires, consumer unit changes, new circuits)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Evidence of commercial or industrial work (containment, distribution boards, three-phase if possible)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Photographic evidence: before, during, and after shots with clear descriptions</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Witness testimonies from supervisors covering different work types</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Copies of test results, certificates, and commissioning records you contributed to</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Risk assessments, method statements, and safe isolation records</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Reflective accounts explaining what you learned and how you developed</span>
            </li>
          </ul>
        </div>
        <p>
          Organise your portfolio logically — group evidence by unit or by work type. Make it easy
          for the assessor to find what they need. A well-structured digital portfolio with clear
          labels and descriptions is far more impressive than a box of loose photos and scribbled
          notes.
        </p>
        <SEOAppBridge
          title="Organise your portfolio with Elec-Mate"
          description="Digital portfolio management for apprentices. Photograph work with structured templates, collect witness testimonies, and track which NVQ units you have covered. Share your portfolio with your assessor digitally."
          icon={ClipboardCheck}
        />
      </>
    ),
  },
  {
    id: 'transitioning',
    heading: 'Transitioning to Qualified Electrician',
    content: (
      <>
        <p>
          Passing the AM2 and EPA marks the transition from apprentice to qualified electrician. It
          is a significant milestone — you have earned a trade qualification through years of hard
          work, study, and on-site experience. Take a moment to appreciate what you have achieved.
        </p>
        <p>
          The practical transition involves several steps:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Rocket className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Collect all certificates</strong> — ensure you have your AM2 pass
                certificate, Level 3 Diploma certificate, 18th Edition certificate, EPA result, and
                apprenticeship completion certificate. Store them safely (digital copies as well as
                originals). You will need these for employer registration, competent person scheme
                applications, and future qualifications.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Rocket className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Apply for your ECS card</strong> — the Electrotechnical Certification Scheme
                card is the industry-recognised ID card for electricians. With an AM2 pass and 18th
                Edition, you qualify for the Installation Electrician (gold card) grade. This card is
                required for most commercial and industrial sites.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Rocket className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Negotiate your new rate</strong> — if staying with your employer, your pay
                should move to qualified electrician rates immediately. JIB-graded employers have
                published rates for qualified electricians. Non-JIB employers should match or exceed
                these. Do not accept staying on apprentice rates after qualifying.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Rocket className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plan your next qualification</strong> — many newly qualified electricians
                go straight into the{' '}
                <SEOInternalLink href="/guides/city-guilds-2391">
                  C&G 2391 Inspection and Testing
                </SEOInternalLink>{' '}
                qualification to broaden their scope. Others pursue specialist qualifications in EV
                charging, solar PV, or fire alarm systems.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'registration',
    heading: 'NICEIC, NAPIT & Individual Registration',
    content: (
      <>
        <p>
          If you plan to work independently (self-employed or running your own business), you will
          need to register with a competent person scheme to self-certify notifiable electrical work
          under Part P of the Building Regulations.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC</strong> — the most widely recognised scheme. Domestic Installer
                registration requires the AM2 (or equivalent), 18th Edition, and evidence of
                competence. Annual fee approximately £400 to £500. Includes regular assessments of
                your work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT</strong> — a well-respected alternative to NICEIC with similar
                requirements and fees. Some electricians prefer NAPIT for its customer service and
                support for sole traders.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ELECSA</strong> — another competent person scheme option. Compare fees,
                assessment requirements, and support before choosing. All schemes allow you to
                self-certify Part P work.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you are staying employed, your employer will typically be registered with a scheme and
          your work is certified under their registration. Individual registration becomes important
          when you go self-employed or start your own business.
        </p>
      </>
    ),
  },
  {
    id: 'employed-vs-self-employed',
    heading: 'Staying Employed vs Going Self-Employed',
    content: (
      <>
        <p>
          This is one of the biggest decisions you will make after qualifying. Both paths have clear
          advantages and drawbacks. Here is an honest comparison:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Staying Employed</h3>
            <p className="text-white text-sm leading-relaxed">
              Steady income with regular pay. Holiday pay, sick pay, pension contributions. Employer
              provides van, tools, and materials. Continued mentoring from experienced electricians.
              Less admin — no invoicing, tax returns, or chasing customers. Good for building
              experience in the first 1 to 2 years after qualifying. Typical employed rates: £18 to
              £24 per hour depending on region and employer.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Going Self-Employed</h3>
            <p className="text-white text-sm leading-relaxed">
              Higher earning potential: day rates of £200 to £350+ for domestic work. Full control
              over your schedule, customers, and the jobs you take. Tax efficiency through
              self-employment or a limited company. Build your own brand and reputation. But: no
              guaranteed income, you buy your own tools and van, you pay for insurance, registration,
              and qualifications, and you handle all business admin. Start-up costs: van (£5,000 to
              £15,000), tools (£2,000 to £5,000), insurance (£500 to £1,000/year), registration
              (£400 to £500/year).
            </p>
          </div>
        </div>
        <p>
          Many successful self-employed electricians started by staying employed for 1 to 2 years
          after qualifying. This builds experience, confidence, and savings. When you do go
          self-employed, you have a financial cushion and the competence to work independently.
          There is no shame in taking the secure route first — it is the smart approach.
        </p>
        <SEOAppBridge
          title="Manage your business from day one"
          description="When you are ready to go self-employed, Elec-Mate handles quoting, invoicing, certification, scheduling, and customer management. Everything a sole-trader electrician needs in one app. 7-day free trial."
          icon={Briefcase}
        />
      </>
    ),
  },
  {
    id: 'job-market',
    heading: 'Job Market Preparation',
    content: (
      <>
        <p>
          Whether you are looking for a new employer or planning to go self-employed, preparing for
          the job market should start before you qualify.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Briefcase className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Update Your CV</h4>
                <p className="text-white text-sm leading-relaxed">
                  List your qualifications (AM2, 18th Edition, Level 3 Diploma), the types of work
                  you have experience in (domestic rewires, commercial installations, consumer unit
                  changes, testing), and any additional skills (EV charging, fire alarm, data
                  cabling). Keep it to two pages maximum. Employers want to see what you can do, not
                  a life story.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Target className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Network Early</h4>
                <p className="text-white text-sm leading-relaxed">
                  Tell people you are about to qualify. Family, friends, neighbours, tradespeople you
                  have met on site — word of mouth is the most powerful marketing tool for
                  electricians. Join local trade groups on social media. If going self-employed, start
                  building a presence on Checkatrade, MyBuilder, or Google Business Profile before
                  you qualify so you have enquiries from day one.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Know Your Worth</h4>
                <p className="text-white text-sm leading-relaxed">
                  Research local rates for qualified electricians — both employed and self-employed.
                  Use the{' '}
                  <SEOInternalLink href="/guides/electrician-day-rates">
                    Elec-Mate day rates guide
                  </SEOInternalLink>{' '}
                  and talk to qualified electricians in your area. Do not undersell yourself, but be
                  realistic about your experience level. You are qualified, but you are also just
                  starting your career as a qualified electrician.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-apprentices',
    heading: 'Tips for Your Final Year',
    content: (
      <>
        <p>
          Year 4 is intense, but it is also the most rewarding year of your apprenticeship. Here is
          how to finish strong:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Book your AM2 early</strong> — assessment centre slots book up quickly. Do
                not leave it until the last minute and end up with a date months away.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complete your portfolio well before the EPA</strong> — last-minute portfolio
                panic is avoidable. Set a deadline of 8 weeks before your expected EPA date to have
                everything submitted and reviewed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Practise under timed conditions</strong> — for the AM2, time is your enemy.
                Set up practice installations and time yourself. Identify where you lose time and
                work on efficiency.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Prepare for the professional discussion</strong> — review your portfolio and
                be ready to talk about specific jobs in detail. Why did you make certain decisions?
                What would you do differently? What did you learn? Assessors want to see reflection
                and understanding, not just a description of what happened.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Look after yourself</strong> — year 4 is stressful. Exams, assessments,
                portfolio deadlines, and the pressure of transitioning to a qualified role can take
                a toll on your mental health. Talk to someone if you are struggling. Take breaks.
                Exercise. You have come this far — you will get through this.
              </span>
            </li>
          </ul>
        </div>
        <p>
          You are about to join a skilled trade with strong demand, good earning potential, and a
          career that can take you anywhere — from domestic work to commercial projects, from the UK
          to overseas. The hard work of the last four years pays off now.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function Year4ElectricalApprenticePage() {
  return (
    <GuideTemplate
      title="Year 4 Electrical Apprentice | Final Year Guide 2026"
      description="Complete guide to year 4 of an electrical apprenticeship. AM2 assessment, End-Point Assessment (EPA), final portfolio submission, NICEIC/NAPIT registration, and transitioning to qualified electrician."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Apprentice Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          Year 4 Electrical Apprentice:{' '}
          <span className="text-yellow-400">Final Year Guide 2026</span>
        </>
      }
      heroSubtitle="Your final year. AM2 assessment, End-Point Assessment, portfolio completion, and the transition from apprentice to qualified electrician. Everything you need to finish strong and start your career."
      readingTime={16}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Year 4 and Qualifying"
      relatedPages={relatedPages}
      ctaHeading="From Apprentice to Qualified Electrician"
      ctaSubheading="Elec-Mate supports your journey from apprentice to qualified electrician. Mock exams, AM2 preparation, portfolio management, and the tools you will use every day once you qualify. 7-day free trial."
    />
  );
}
