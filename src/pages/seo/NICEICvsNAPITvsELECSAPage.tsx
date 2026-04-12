import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  PoundSterling,
  Scale,
  FileCheck2,
  BookOpen,
  Target,
  CreditCard,
  ClipboardCheck,
  Star,
  Users,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Training', href: '/guides/electrical-training-courses-uk' },
  {
    label: 'NICEIC vs NAPIT vs ELECSA vs STROMA',
    href: '/guides/niceic-vs-napit-vs-elecsa-comparison',
  },
];

const tocItems = [
  { id: 'overview', label: 'Why the Choice Matters' },
  { id: 'niceic', label: 'NICEIC' },
  { id: 'napit', label: 'NAPIT' },
  { id: 'elecsa', label: 'ELECSA' },
  { id: 'stroma', label: 'STROMA' },
  { id: 'comparison', label: 'Side-by-Side Comparison' },
  { id: 'costs', label: 'Costs Compared' },
  { id: 'assessment', label: 'Assessment Experience' },
  { id: 'which-to-choose', label: 'Which Should You Choose?' },
  { id: 'switching', label: 'Switching Schemes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'All four schemes (NICEIC, NAPIT, ELECSA, and STROMA) are government-authorised competent person schemes. They are all equally authorised under the same legislation — Building Regulations Part P in England, Building Standards in Scotland. In terms of legal authority, there is no difference between them.',
  'NICEIC has the strongest brand recognition with homeowners — it is the name most people know and search for when looking for an electrician. This brand premium comes at a higher annual cost.',
  'NAPIT is generally the cheapest of the four and offers a multi-trade approach (electrical, plumbing, heating). Good value for sole traders and small businesses.',
  'ELECSA and NICEIC are both operated by Certsure (a joint venture between NICEIC Group Ltd and ECA). This means their assessment standards are largely identical — choosing ELECSA over NICEIC is primarily a cost decision, not a standards one.',
  'STROMA is a fourth government-authorised scheme. It is an Ofqual-regulated body that started as an energy performance certificate scheme and expanded into electrical competent person work. It is typically the lowest-cost option.',
  'Choosing between schemes is primarily a matter of cost, service, and personal preference — all four carry equal legal weight.',
];

const faqs = [
  {
    question: 'Is there any legal difference between NICEIC, NAPIT, ELECSA, and STROMA?',
    answer:
      'No. All four are equally authorised by the government as competent person scheme providers under the same legislation — Part P of the Building Regulations in England, and Building Standards in Scotland. A Building Regulations Compliance Certificate issued by a STROMA or NAPIT member has exactly the same legal status as one issued by a NICEIC member. The difference is in brand recognition, cost, and the additional services each scheme offers. From a compliance perspective, they are identical.',
  },
  {
    question: 'Which scheme do homeowners trust most?',
    answer:
      'NICEIC consistently has the highest brand recognition among homeowners. When people search for a qualified electrician, they often search for "NICEIC registered electrician" specifically. This is the result of decades of marketing and a long-established reputation. NAPIT is growing in recognition but is still less well-known to the general public. ELECSA has lower consumer recognition, and STROMA has the least brand recognition of the four in the electrical sector. If winning domestic work through brand recognition is your priority, NICEIC has an advantage.',
  },
  {
    question: 'Can I be a member of more than one scheme?',
    answer:
      'There is no rule against being a member of more than one scheme, but there is rarely a reason to do so. Each of the four schemes gives you the same self-certification authority. Being a member of both NICEIC and NAPIT would mean paying two sets of fees and attending two sets of assessments — with no additional legal benefit. Some electricians who do both domestic and commercial work may hold NICEIC Approved Contractor status (for commercial credibility) and find that sufficient for domestic work too.',
  },
  {
    question: 'How do the assessment processes compare?',
    answer:
      'All four schemes require an annual assessment of your work by a qualified assessor. The assessment covers site inspection of your installations, review of your certificates and documentation, and verification of your qualifications and insurance. The assessment standards are broadly similar — all are based on compliance with BS 7671. Some electricians report that NAPIT assessments are slightly less prescriptive and more collaborative, while NICEIC assessments are more formal and structured. ELECSA and NICEIC share the same Certsure assessment framework. STROMA assessments are broadly comparable. The experience varies significantly by individual assessor and is subjective.',
  },
  {
    question: 'Which scheme is best for commercial work?',
    answer:
      "For commercial and industrial work, NICEIC's Approved Contractor scheme has the strongest reputation. Many main contractors and commercial clients specifically require their electrical subcontractors to be NICEIC Approved Contractors. NAPIT also offers a commercial-level registration, and it is accepted on most commercial sites, but NICEIC has a longer history and stronger reputation in the commercial sector. If commercial work is a significant part of your business, NICEIC Approved Contractor status is worth the higher cost.",
  },
  {
    question: 'Can I switch from one scheme to another?',
    answer:
      'Yes. You can leave one scheme and join another at any time. There is no penalty for leaving (other than losing your registration). When you join the new scheme, you will need to complete their initial assessment process, which typically involves a site inspection and documentation review. Some schemes offer streamlined onboarding for electricians transferring from another recognised scheme. You will need to update your marketing materials, van signage, and website to reflect the new scheme membership.',
  },
  {
    question: 'Is STROMA a legitimate competent person scheme?',
    answer:
      'Yes. STROMA is a fully government-authorised competent person scheme for electrical work, equally authorised under the same legislation as NICEIC, NAPIT, and ELECSA. It is an Ofqual-regulated body that originally operated as an energy performance certificate scheme and has expanded into electrical work. A compliance certificate issued by a STROMA-registered electrician has exactly the same legal standing as one from any other scheme. STROMA is generally the lowest-cost option of the four and is worth considering for electricians who want the self-certification authority without paying the brand premium of the larger schemes.',
  },
  {
    question: 'Do I need to be in a scheme to do commercial electrical work?',
    answer:
      'There is no legal requirement to be in a competent person scheme for commercial electrical work. Part P of the Building Regulations (which requires self-certification or Building Control notification) only applies to dwellings. Commercial electrical work must comply with BS 7671 but does not have the same Building Control notification requirements. However, many commercial clients and main contractors require their electrical subcontractors to hold competent person scheme membership (usually NICEIC Approved Contractor) as a condition of the contract. In practice, scheme membership is a commercial requirement even if it is not a legal one.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/competent-person-scheme-guide',
    title: 'Competent Person Scheme Guide',
    description: 'Full guide to what competent person schemes mean and how they work.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/city-guilds-2382-exam-guide',
    title: 'C&G 2382 Exam Guide',
    description: 'The 18th Edition exam — required for all scheme membership.',
    icon: BookOpen,
    category: 'Guide',
  },
  {
    href: '/guides/ecs-card-types-explained',
    title: 'ECS Card Types',
    description: 'How your ECS card relates to scheme eligibility.',
    icon: CreditCard,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description: 'Professional certificates that pass any scheme assessment.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/eicr-form',
    title: 'EICR Form App',
    description: 'Complete EICRs on your phone — assessment-ready documentation.',
    icon: ClipboardCheck,
    category: 'Certificate',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing',
    description: 'The C&G 2391 — required for most scheme memberships.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why the Choice Matters',
    content: (
      <>
        <p>
          Choosing a{' '}
          <SEOInternalLink href="/guides/competent-person-scheme-guide">
            competent person scheme
          </SEOInternalLink>{' '}
          is one of the most important business decisions you make as an electrician. It affects
          your credibility with customers, your annual costs, your assessment experience, and how
          you market your business.
        </p>
        <p>
          The good news: all four government-authorised schemes (NICEIC, NAPIT, ELECSA, and STROMA)
          give you the same legal authority to self-certify electrical work under Part P. All four
          are equally authorised under the same legislation — Building Regulations Part P in
          England, Building Standards in Scotland. There is no "better" scheme in terms of what you
          can legally do. The differences are commercial: brand recognition, cost, assessment
          approach, and additional services.
        </p>
        <p>
          This guide gives you an honest comparison to help you decide which scheme is right for
          your business.
        </p>
      </>
    ),
  },
  {
    id: 'niceic',
    heading: 'NICEIC',
    content: (
      <>
        <p>
          NICEIC (National Inspection Council for Electrical Installation Contracting) is the oldest
          and most recognised electrical scheme. It has been operating since 1956 and is part of
          Certsure — a joint venture between NICEIC Group Ltd and ECA (Electrical Contractors&apos;
          Association) — which also operates ELECSA. This shared ownership is important to
          understand: NICEIC and ELECSA use the same assessment framework and standards. Choosing
          ELECSA over NICEIC is primarily a cost and branding decision, not a difference in
          assessment rigour.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Strongest brand recognition</strong> — homeowners know the NICEIC name.
                Searches for "NICEIC electrician near me" are common. The NICEIC logo on your van
                and website carries weight.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Two levels:</strong> Domestic Installer (domestic work only, lower cost) and
                Approved Contractor (domestic and commercial, higher cost, stronger credibility for
                commercial work).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial credibility</strong> — NICEIC Approved Contractor is the gold
                standard for commercial electrical work. Many main contractors require it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Higher cost</strong> — typically the most expensive of the four schemes. The
                brand premium has a price.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'napit',
    heading: 'NAPIT',
    content: (
      <>
        <p>
          NAPIT (National Association of Professional Inspectors and Testers) is a multi-trade
          competent person scheme that covers electrical, plumbing, heating, and ventilation work.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Generally cheaper</strong> — NAPIT typically has lower annual fees than
                NICEIC, making it attractive for sole traders and small businesses watching their
                costs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Multi-trade</strong> — if you do plumbing, heating, or ventilation work as
                well as electrical, NAPIT can cover multiple trades under one membership. This
                simplifies administration and can save money.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Growing recognition</strong> — NAPIT is well-known among tradespeople and is
                increasingly recognised by homeowners. It is accepted on commercial sites too.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Good support</strong> — NAPIT has a reputation for being supportive of
                smaller businesses, with helpful technical advice and a collaborative assessment
                approach.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'elecsa',
    heading: 'ELECSA',
    content: (
      <>
        <p>
          ELECSA is operated by Certsure — the same joint venture (NICEIC Group Ltd and ECA) that
          operates NICEIC. This is a genuine differentiator worth understanding: because NICEIC and
          ELECSA share the same parent organisation, their assessment standards are largely
          identical. An ELECSA assessment is conducted to the same framework as an NICEIC
          assessment. The primary difference is the brand name on your van and the annual fee you
          pay.
        </p>
        <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lower cost than NICEIC</strong> — same parent organisation and similar
                assessment standards, but lower annual fees. A good middle-ground option.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Same assessment quality</strong> — ELECSA uses the same assessment framework
                as NICEIC (both are Certsure schemes). The assessment standards are identical.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Less brand recognition</strong> — ELECSA has lower consumer recognition than
                NICEIC and NAPIT. This may matter less if you rely on word of mouth and referrals
                rather than brand-driven marketing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-purple-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fully government-authorised</strong> — exactly the same self-certification
                authority as NICEIC and NAPIT. No legal difference whatsoever.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'stroma',
    heading: 'STROMA',
    content: (
      <>
        <p>
          STROMA is a fourth government-authorised competent person scheme for electrical work. It
          is an Ofqual-regulated body that originally operated in the energy performance certificate
          sector before expanding into electrical installation work. STROMA is equally authorised
          under the same legislation as NICEIC, NAPIT, and ELECSA — a compliance certificate from a
          STROMA-registered electrician carries exactly the same legal weight.
        </p>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lowest cost option</strong> — STROMA is typically the most affordable of the
                four schemes, making it worth considering for electricians who want
                self-certification authority at the lowest annual cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fully government-authorised</strong> — equally authorised under Part P
                (England) and Building Standards (Scotland) alongside NICEIC, NAPIT, and ELECSA. No
                legal difference in what you can certify.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ofqual-regulated</strong> — STROMA is regulated by Ofqual, the
                qualifications regulator, giving it formal regulatory oversight. Its expansion into
                electrical competent person work is backed by this regulatory framework.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lower brand recognition</strong> — STROMA has the least consumer-facing
                brand recognition of the four schemes in the electrical sector. Electricians who
                market primarily through referrals and repeat business rather than scheme branding
                will feel this less.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'comparison',
    heading: 'Side-by-Side Comparison',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 overflow-x-auto">
          <div className="space-y-4 min-w-[480px]">
            <div className="grid grid-cols-5 gap-2 text-sm font-bold text-white border-b border-white/10 pb-3">
              <div>Feature</div>
              <div>NICEIC</div>
              <div>NAPIT</div>
              <div>ELECSA</div>
              <div>STROMA</div>
            </div>
            <div className="grid grid-cols-5 gap-2 text-sm text-white">
              <div>Brand recognition</div>
              <div>Highest</div>
              <div>Growing</div>
              <div>Lower</div>
              <div>Lowest</div>
            </div>
            <div className="grid grid-cols-5 gap-2 text-sm text-white">
              <div>Annual cost</div>
              <div>Highest</div>
              <div>Lower</div>
              <div>Mid</div>
              <div>Lowest</div>
            </div>
            <div className="grid grid-cols-5 gap-2 text-sm text-white">
              <div>Commercial level</div>
              <div>Strong</div>
              <div>Available</div>
              <div>Limited</div>
              <div>Limited</div>
            </div>
            <div className="grid grid-cols-5 gap-2 text-sm text-white">
              <div>Multi-trade</div>
              <div>Electrical only</div>
              <div>Yes</div>
              <div>Electrical only</div>
              <div>Electrical only</div>
            </div>
            <div className="grid grid-cols-5 gap-2 text-sm text-white">
              <div>Part P authority</div>
              <div>Full</div>
              <div>Full</div>
              <div>Full</div>
              <div>Full</div>
            </div>
            <div className="grid grid-cols-5 gap-2 text-sm text-white">
              <div>Assessment frequency</div>
              <div>Annual</div>
              <div>Annual</div>
              <div>Annual</div>
              <div>Annual</div>
            </div>
            <div className="grid grid-cols-5 gap-2 text-sm text-white">
              <div>Parent organisation</div>
              <div>Certsure</div>
              <div>Independent</div>
              <div>Certsure</div>
              <div>STROMA Group</div>
            </div>
          </div>
        </div>
        <p>
          All four schemes are equally authorised under the same legislation. Choosing between them
          is primarily a matter of cost, service, and personal preference.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Costs Compared (2026 Approximate)',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10">
              <span className="text-white font-medium">NICEIC Domestic Installer</span>
              <span className="text-white">~£550&ndash;£700/year</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10">
              <span className="text-white font-medium">NICEIC Approved Contractor</span>
              <span className="text-white">~£700&ndash;£900/year</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-green-500/10">
              <span className="text-white font-medium">NAPIT Domestic Installer</span>
              <span className="text-white">~£400&ndash;£600/year</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-purple-500/10">
              <span className="text-white font-medium">ELECSA Domestic Installer</span>
              <span className="text-white">~£400&ndash;£550/year</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-orange-500/10">
              <span className="text-white font-medium">STROMA</span>
              <span className="text-white">~£400&ndash;£550/year</span>
            </div>
          </div>
        </div>
        <p>
          Annual fees vary and are reviewed by each scheme periodically. The figures above are
          typical ranges for 2026 — electricians should check the current provider websites for
          exact pricing before applying. First-year costs are typically higher due to the initial
          assessment fee. All costs are tax-deductible as a business expense.
        </p>
      </>
    ),
  },
  {
    id: 'assessment',
    heading: 'Assessment Experience',
    content: (
      <>
        <p>
          All four schemes require annual assessment visits. The assessment covers the same core
          areas: site inspection of recent work, documentation review (EICs, EICRs, minor works),
          qualification and insurance verification.
        </p>
        <p>
          Anecdotally, electricians report that NAPIT assessments tend to be more conversational and
          collaborative, while NICEIC assessments can be more formal and checklist-driven. ELECSA
          assessments follow the same framework as NICEIC (both are Certsure schemes with identical
          assessment standards). STROMA assessments are broadly comparable. However, the experience
          varies significantly by individual assessor — a good assessor from any scheme will be
          professional, fair, and helpful.
        </p>
        <p>
          The most important thing is that your work and documentation are up to standard. If your
          installations comply with BS 7671 and your certificates are completed correctly, you will
          pass any scheme's assessment.
        </p>
      </>
    ),
  },
  {
    id: 'which-to-choose',
    heading: 'Which Should You Choose?',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Choose NICEIC if:</strong> Brand recognition is important to your business,
                you do commercial work and need Approved Contractor status, you want the strongest
                possible credibility with homeowners, and you are comfortable paying the premium.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Choose NAPIT if:</strong> Cost is a priority, you are a sole trader or small
                business, you do multiple trades (plumbing, heating), or you prefer a collaborative
                assessment approach.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Choose ELECSA if:</strong> You want the same assessment standards as NICEIC
                (same Certsure framework) at a lower cost, you do not rely on scheme branding for
                marketing, and you want a recognised scheme without the NICEIC premium.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Choose STROMA if:</strong> Cost is your primary driver, you do not depend on
                consumer brand recognition for winning work, and you want full self-certification
                authority at the lowest available annual fee.
              </span>
            </li>
          </ul>
        </div>
        <p>
          There is no wrong answer. All four schemes are legitimate, equally government-authorised,
          and respected within the industry. All four carry the same legal weight under Part P. Pick
          the one that best fits your business model and budget.
        </p>
      </>
    ),
  },
  {
    id: 'switching',
    heading: 'Switching Between Schemes',
    content: (
      <>
        <p>
          If you are already a member of one scheme and want to switch, the process is
          straightforward:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Apply to the new scheme. Most offer streamlined onboarding for electricians
                transferring from another recognised scheme.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Complete the new scheme's initial assessment (this is usually required even for
                transfers).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Cancel your old scheme membership once your new registration is confirmed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Update your marketing: van signage, website, social media, and business cards.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Professional certificates for any scheme"
          description="Elec-Mate's EIC, EICR, and minor works certificate apps produce professional documentation that meets the assessment standards of NICEIC, NAPIT, ELECSA, and STROMA. AI board scanning and instant PDF export."
          icon={ShieldCheck}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NICEICvsNAPITvsELECSAPage() {
  return (
    <GuideTemplate
      title="NICEIC vs NAPIT vs ELECSA vs STROMA | Honest Comparison for Electricians 2026"
      description="Honest comparison of NICEIC, NAPIT, ELECSA, and STROMA competent person schemes for UK electricians. Costs, assessment frequency, brand reputation, commercial credibility, and which to choose for your business."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Career Guide"
      badgeIcon={Scale}
      heroTitle={
        <>
          NICEIC vs NAPIT vs ELECSA vs STROMA:{' '}
          <span className="text-yellow-400">Honest Comparison for Electricians</span>
        </>
      }
      heroSubtitle="All four schemes let you self-certify electrical work under Part P — they are equally authorised under the same legislation. The differences are cost, brand recognition, and commercial credibility. This guide helps you choose the right one for your business."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About NICEIC, NAPIT, ELECSA, and STROMA"
      relatedPages={relatedPages}
      ctaHeading="Professional Certificates for Any Scheme Assessment"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for EICs, EICRs, and minor works certificates — assessment-ready documentation accepted by NICEIC, NAPIT, ELECSA, and STROMA. 7-day free trial."
    />
  );
}
