import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Award,
  TrendingUp,
  PoundSterling,
  Briefcase,
  Target,
  PenTool,
  Building2,
  CreditCard,
  Calculator,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/guides/electrical-training-courses-uk' },
  { label: 'Level 4 Qualification', href: '/guides/level-4-electrical-qualification' },
];

const tocItems = [
  { id: 'overview', label: 'What Is the Level 4?' },
  { id: 'content', label: 'Course Content' },
  { id: 'entry-requirements', label: 'Entry Requirements' },
  { id: 'career-progression', label: 'Career Progression' },
  { id: 'hnc-comparison', label: 'Level 4 vs HNC' },
  { id: 'study-options', label: 'Study Options' },
  { id: 'costs', label: 'Costs and Funding' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The Level 4 qualification in Electrical Installation is the HNC equivalent for electricians. It focuses on design, management, and advanced technical skills — taking you beyond the standard Level 3 installation qualification.',
  'It covers advanced circuit design, three-phase systems, power factor correction, building services engineering, project management, and health and safety management. It builds directly on what you learn in the C&G 2396.',
  'Entry requirements typically include Level 3 NVQ, C&G 2382, and ideally C&G 2396. Some providers also require the 2391. Significant practical experience (3+ years) is strongly recommended.',
  'The Level 4 opens career paths beyond hands-on installation: electrical design, project management, contracts management, building services consulting, and electrical engineering technician roles.',
  'Study options include part-time day release (typically 1 to 2 years), evening classes, block release, and some distance learning programmes. Most students study while working full-time.',
];

const faqs = [
  {
    question: 'What is the Level 4 electrical qualification?',
    answer:
      'The Level 4 qualification in Electrical Installation (such as the C&G 2396-20 Level 4 Award, or the EAL Level 4 Diploma, or the Pearson BTEC Level 4 HNC) is a higher-level qualification for electricians who want to specialise in design, management, or advanced technical work. It is equivalent to the first year of a university degree or an HNC (Higher National Certificate). It goes beyond the Level 3 qualifications that most electricians hold, covering more complex design calculations, three-phase systems, project management, and building services engineering.',
  },
  {
    question: 'Is Level 4 the same as an HNC?',
    answer:
      'Level 4 qualifications sit at the same level as an HNC on the Regulated Qualifications Framework (RQF). However, they are not identical. The Pearson BTEC Level 4 HNC in Construction (Electrical Installation pathway) is an HNC. The C&G Level 4 Award in Design and Verification is a Level 4 qualification but is smaller in scope than a full HNC. Both are Level 4, but the HNC is a broader qualification. For practical purposes, employers in the electrical industry accept either. If you plan to progress to a degree (Level 5/6), the HNC provides a more direct pathway.',
  },
  {
    question: 'Do I need the Level 4 to get the Gold Card?',
    answer:
      'Not necessarily. The ECS Gold Card requires a design qualification — the C&G 2396 (which is technically a Level 4 Award) is sufficient. You do not need a full Level 4 Diploma or HNC for the Gold Card. However, the Level 4 Diploma or HNC provides a broader education that is valuable for career progression beyond the Gold Card. If your primary goal is the Gold Card, the C&G 2396 is the most efficient route. If your goals include project management, consulting, or further education, the full Level 4 is worth considering.',
  },
  {
    question: 'How long does the Level 4 take?',
    answer:
      'It depends on the study mode. Part-time day release (one day per week) typically takes 1 to 2 years. Evening classes may take 2 years. Block release (intensive weeks, usually 4 to 6 blocks per year) typically takes 1 to 2 years. Some distance learning programmes allow flexible study over 1 to 3 years. Most students study while working full-time as electricians, which makes part-time or day release the most popular option.',
  },
  {
    question: 'What are the entry requirements?',
    answer:
      'Entry requirements vary by provider, but typically include: NVQ Level 3 in Electrotechnical Services (or equivalent), C&G 2382 (18th Edition), and relevant work experience (at least 2 to 3 years recommended). Some providers also require or recommend the C&G 2391 (Inspection and Testing) and C&G 2396 (Design). Maths competence to at least GCSE grade C / Level 2 is essential — the Level 4 involves significant design calculations. Contact your chosen provider for their specific requirements.',
  },
  {
    question: 'How much does the Level 4 cost?',
    answer:
      'Costs vary significantly by provider and qualification type. A C&G Level 4 Award (design and verification) typically costs 500 to 1,000 pounds. A full BTEC Level 4 HNC typically costs 2,000 to 5,000 pounds (or more for college-based programmes). If you are studying through a college, you may be eligible for an Advanced Learner Loan, which covers the tuition fees and is repaid through your tax code once you earn above the repayment threshold (similar to a student loan). Some employers will fund the qualification as part of your professional development.',
  },
  {
    question: 'Can I progress from Level 4 to a degree?',
    answer:
      'Yes. The Level 4 HNC provides a pathway to a Level 5 HND (Higher National Diploma) and then to a full Level 6 degree (BEng or BSc in Electrical Engineering or Building Services Engineering). Many universities accept the HNC for direct entry into the second year of a related degree programme. If you hold a C&G Level 4 Award rather than an HNC, you may need to complete additional modules before progressing. This is a viable path to chartered engineer status for electricians who want to move into engineering roles.',
  },
  {
    question: 'Is the Level 4 worth it for a self-employed electrician?',
    answer:
      'It depends on your ambitions. If you are happy doing domestic installation work, the Level 4 is probably unnecessary — the C&G 2396 is sufficient for the Gold Card and design competence. But if you want to take on larger commercial projects, offer design and consultancy services, or position yourself as a specialist, the Level 4 gives you the knowledge and credibility to do so. It is also valuable if you plan to employ other electricians and need to manage complex projects.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/city-guilds-2396-design-course',
    title: 'C&G 2396 Design Course',
    description: 'The design qualification that often precedes or overlaps with the Level 4.',
    icon: PenTool,
    category: 'Guide',
  },
  {
    href: '/guides/gold-card-requirements-electrician',
    title: 'Gold Card Requirements',
    description: 'How Level 4 relates to Gold Card eligibility.',
    icon: Award,
    category: 'Guide',
  },
  {
    href: '/guides/jib-grading-explained',
    title: 'JIB Grading Explained',
    description: 'How higher qualifications affect your JIB grade and pay rate.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/guides/city-guilds-2382-exam-guide',
    title: 'C&G 2382 Exam Guide',
    description: 'The 18th Edition qualification — a prerequisite for Level 4.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Practise advanced cable sizing calculations covered in the Level 4.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/competent-person-scheme-guide',
    title: 'Competent Person Schemes',
    description: 'The business side of being a qualified electrician.',
    icon: Building2,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What Is the Level 4 Electrical Qualification?',
    content: (
      <>
        <p>
          The Level 4 electrical qualification is the next step up from the standard Level 3
          qualifications that most electricians hold. It sits at the same level as an HNC (Higher
          National Certificate) and focuses on design, management, and advanced technical knowledge.
        </p>
        <p>
          While Level 3 qualifies you to install electrical systems, Level 4 qualifies you to design
          them, manage projects, and understand the engineering principles behind electrical
          installations. It is the qualification that takes you from being a competent installer to
          being a competent designer and manager.
        </p>
        <p>
          There is no single "Level 4 in electrical installation" — it is a family of qualifications
          at the same level on the Regulated Qualifications Framework (RQF). The three most common
          routes for electricians are:
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-1">C&G Level 4 Award</h4>
            <p className="text-xs text-yellow-400 font-medium mb-2">Design & Verification</p>
            <p className="text-white text-sm leading-relaxed">
              The smallest route — essentially the{' '}
              <SEOInternalLink href="/guides/city-guilds-2396-design-course">2396</SEOInternalLink>.
              Focused purely on design and verification competence. Quickest to complete and
              sufficient for the Gold Card.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-1">EAL Level 4 Diploma</h4>
            <p className="text-xs text-yellow-400 font-medium mb-2">Electrical Installation</p>
            <p className="text-white text-sm leading-relaxed">
              A broader diploma from EAL covering design and advanced installation knowledge. A
              standalone EAL qualification — not interchangeable with the C&G route even where topics
              overlap.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h4 className="font-bold text-white mb-1">Pearson BTEC Level 4 HNC</h4>
            <p className="text-xs text-yellow-400 font-medium mb-2">Construction (Electrical)</p>
            <p className="text-white text-sm leading-relaxed">
              The widest route. A full Higher National Certificate covering engineering principles,
              project management and building services — and the clearest pathway on to an HND and
              degree.
            </p>
          </div>
        </div>
        <p className="text-sm text-white/70">
          Note: EAL and City &amp; Guilds qualifications are separate awarding-body routes. Holding
          one does not automatically count towards the other, even when the learning outcomes look
          similar — always confirm what your employer or scheme requires.
        </p>
      </>
    ),
  },
  {
    id: 'content',
    heading: 'Course Content',
    content: (
      <>
        <p>
          The Level 4 builds on your Level 3 knowledge and the{' '}
          <SEOInternalLink href="/guides/city-guilds-2396-design-course">
            C&G 2396 design course
          </SEOInternalLink>
          . Core topics include:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <PenTool className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Advanced Electrical Design</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complex circuit design including three-phase distribution, power factor
                  correction, harmonic mitigation, and motor circuits. Design of commercial and
                  industrial installations including sub-main distribution and rising mains.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Building2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Building Services Engineering</h4>
                <p className="text-white text-sm leading-relaxed">
                  Understanding electrical installations in the context of building services — HVAC,
                  fire alarm systems, emergency lighting, access control, and building management
                  systems (BMS). How electrical services integrate with other building systems.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Briefcase className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Project Management</h4>
                <p className="text-white text-sm leading-relaxed">
                  Planning, scheduling, and managing electrical installation projects. Tendering and
                  estimating, resource management, contract administration, and quality management.
                  Understanding JCT and NEC contract forms.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Advanced Calculations</h4>
                <p className="text-white text-sm leading-relaxed">
                  Three-phase voltage drop, fault level calculations, discrimination studies,
                  transformer sizing, and generator sizing. These go well beyond the Appendix 4
                  calculations in the 2382 and 2396.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'entry-requirements',
    heading: 'Entry Requirements',
    content: (
      <>
        <p>Entry requirements vary by provider, but the typical minimum is:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NVQ Level 3</strong> in Electrotechnical Services (or equivalent).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/city-guilds-2382-exam-guide">
                    C&G 2382
                  </SEOInternalLink>
                </strong>{' '}
                (18th Edition) — mandatory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C&G 2396 or 2391</strong> — recommended or required by most providers. The
                2396 is particularly relevant as the Level 4 builds on design skills.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maths competence</strong> — at least GCSE grade C / Level 2 Functional
                Skills. The Level 4 involves significant calculations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Work experience</strong> — at least 2 to 3 years of practical experience is
                strongly recommended. The course content assumes real-world knowledge.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'career-progression',
    heading: 'Career Progression',
    content: (
      <>
        <p>
          The Level 4 opens career paths that are not available with Level 3 qualifications alone:
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical design engineer</strong> — designing electrical installations for
                commercial and industrial buildings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contracts manager</strong> — managing multiple electrical projects,
                overseeing teams of electricians, and handling client relationships.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building services consultant</strong> — advising architects and developers
                on electrical services for new buildings and refurbishments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical engineering technician</strong> — working in an engineering
                consultancy on design and specification projects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Further education</strong> — progression to HND (Level 5) and then to a BEng
                or BSc degree (Level 6), potentially leading to chartered engineer status.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'hnc-comparison',
    heading: 'Level 4 Award vs HNC',
    content: (
      <>
        <p>There is an important distinction between the C&G Level 4 Award and a full HNC:</p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">C&G Level 4 Award</h3>
            <p className="text-white text-sm leading-relaxed">
              Focused on electrical design and verification. Shorter (equivalent to one or two
              modules). Quicker to complete. Sufficient for the{' '}
              <SEOInternalLink href="/guides/gold-card-requirements-electrician">
                Gold Card
              </SEOInternalLink>
              . The C&G 2396 falls into this category. Best for electricians who want the design
              competence without committing to a full HNC.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Full HNC</h3>
            <p className="text-white text-sm leading-relaxed">
              Broader qualification covering design, project management, building services, and
              engineering principles. Takes 1 to 2 years part-time. Provides a clearer pathway to
              HND and degree. Best for electricians who want to move into design engineering,
              consulting, or management, or who plan to pursue further education.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'study-options',
    heading: 'Study Options',
    content: (
      <>
        <p>
          Most Level 4 students study while working full-time as electricians, so the mode you choose
          usually comes down to how your employer can release you:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="grid grid-cols-[1.4fr_0.8fr_1.8fr] gap-px bg-white/10 text-sm">
            <div className="bg-white/[0.06] p-3 font-semibold text-white">Mode</div>
            <div className="bg-white/[0.06] p-3 font-semibold text-white">Typical duration</div>
            <div className="bg-white/[0.06] p-3 font-semibold text-white">Best for</div>

            <div className="bg-blue-900/30 p-3 text-white font-medium">Part-time day release</div>
            <div className="bg-blue-900/30 p-3 text-white">1–2 years</div>
            <div className="bg-blue-900/30 p-3 text-white/90">
              The most popular option — one day a week at college, working the other four.
            </div>

            <div className="bg-white/[0.02] p-3 text-white font-medium">Evening classes</div>
            <div className="bg-white/[0.02] p-3 text-white">~2 years</div>
            <div className="bg-white/[0.02] p-3 text-white/90">
              Typically two evenings a week — if your employer cannot release you during the day.
            </div>

            <div className="bg-white/[0.02] p-3 text-white font-medium">Block release</div>
            <div className="bg-white/[0.02] p-3 text-white">1–2 years</div>
            <div className="bg-white/[0.02] p-3 text-white/90">
              Intensive 1–2 week blocks, several times a year — if you work away from the college.
            </div>

            <div className="bg-white/[0.02] p-3 text-white font-medium">Distance / blended</div>
            <div className="bg-white/[0.02] p-3 text-white">1–3 years</div>
            <div className="bg-white/[0.02] p-3 text-white/90">
              Flexible online study — needs self-discipline; practical elements may need attendance.
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Costs and Funding',
    content: (
      <>
        <p>
          Costs depend heavily on the qualification and provider. The figures below are indicative
          market guidance, not a quote — always confirm the current fee with your chosen provider.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="grid grid-cols-[1.6fr_1fr_1.4fr] gap-px bg-white/10 text-sm">
            <div className="bg-white/[0.06] p-3 font-semibold text-white">Qualification</div>
            <div className="bg-white/[0.06] p-3 font-semibold text-white">Indicative fee</div>
            <div className="bg-white/[0.06] p-3 font-semibold text-white">Funding notes</div>

            <div className="bg-white/[0.02] p-3 text-white font-medium">C&amp;G Level 4 Award (2396)</div>
            <div className="bg-white/[0.02] p-3 text-white">£500–£1,000</div>
            <div className="bg-white/[0.02] p-3 text-white/90">
              Often employer-funded or CPD self-investment.
            </div>

            <div className="bg-white/[0.02] p-3 text-white font-medium">EAL Level 4 Diploma</div>
            <div className="bg-white/[0.02] p-3 text-white">£1,500–£3,000</div>
            <div className="bg-white/[0.02] p-3 text-white/90">
              May be eligible for college funding depending on provider.
            </div>

            <div className="bg-blue-900/30 p-3 text-white font-medium">BTEC Level 4 HNC</div>
            <div className="bg-blue-900/30 p-3 text-white">£2,000–£5,000+</div>
            <div className="bg-blue-900/30 p-3 text-white/90">
              Often eligible for an Advanced Learner Loan.
            </div>
          </div>
        </div>
        <p>
          Funding options include Advanced Learner Loans (for the HNC — repaid through your tax code
          like a student loan), employer funding, CITB grants (for CITB-registered employers), and
          personal investment. The qualification is tax-deductible as a business expense for
          self-employed electricians.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Design With Advanced Tools',
    content: (
      <>
        <p>
          Whether you are studying for a Level 4 or already qualified, Elec-Mate provides the design
          tools you need for complex installations.
        </p>
        <SEOAppBridge
          title="Advanced design tools for qualified electricians"
          description="Elec-Mate's cable sizing calculator, voltage drop calculator, and AI circuit designer support the advanced calculations covered in Level 4 courses."
          icon={GraduationCap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function Level4ElectricalQualificationPage() {
  return (
    <GuideTemplate
      title="Level 4 Electrical Qualification | HNC Equivalent for Electricians"
      description="Complete guide to Level 4 electrical qualifications for UK electricians. Course content, entry requirements, career progression, HNC comparison, costs and funding."
      answerBox={{
        question: 'What is the Level 4 electrical qualification?',
        answer:
          'The Level 4 electrical qualification is the HNC-equivalent step above Level 3. It moves you from installing systems to designing and managing them, covering advanced design, three-phase distribution, building services and project management. Common routes are the C&G Level 4 Award in Design and Verification, the EAL Level 4 Diploma, and the Pearson BTEC Level 4 HNC.',
      }}
      datePublished="2026-03-27"
      dateModified="2026-06-10"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Training Guide"
      badgeIcon={GraduationCap}
      heroTitle={
        <>
          Level 4 Electrical Qualification:{' '}
          <span className="text-yellow-400">Design, Manage, and Progress</span>
        </>
      }
      heroSubtitle="The Level 4 is the HNC equivalent for electricians — covering advanced design, project management, and building services engineering. Your pathway from installer to designer and manager."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Level 4 Electrical Qualifications"
      relatedPages={relatedPages}
      ctaHeading="Advanced Design Tools for Qualified Electricians"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, circuit design, and professional certification. 7-day free trial, cancel anytime."
    />
  );
}
