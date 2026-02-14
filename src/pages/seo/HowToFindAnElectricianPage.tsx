import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Users,
  ShieldCheck,
  Search,
  AlertTriangle,
  FileCheck2,
  ClipboardCheck,
  GraduationCap,
  Star,
  MessageSquare,
  PoundSterling,
  BadgeCheck,
  Zap,
  Home,
  Award,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides' },
  { label: 'Finding an Electrician', href: '/guides/how-to-find-electrician-uk' },
];

const tocItems = [
  { id: 'why-it-matters', label: 'Why Choosing the Right Electrician Matters' },
  { id: 'competent-person-schemes', label: 'Competent Person Schemes' },
  { id: 'qualifications', label: 'Qualifications to Check' },
  { id: 'getting-quotes', label: 'Getting and Comparing Quotes' },
  { id: 'questions-to-ask', label: 'Questions to Ask' },
  { id: 'red-flags', label: 'Red Flags to Watch For' },
  { id: 'checking-credentials', label: 'Checking Credentials Online' },
  { id: 'what-to-expect', label: 'What to Expect During the Work' },
  { id: 'for-electricians', label: 'For Electricians: Building Trust' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Always check that the electrician is registered with a competent person scheme — NICEIC, NAPIT, ELECSA, or BRE Certification. This confirms they are regularly assessed and can self-certify work.',
  "Ask for the electrician's qualifications: C&G 2382 (18th Edition), C&G 2391 (Inspection and Testing), and the relevant installation qualification (C&G 2365 or NVQ Level 3).",
  'Get at least three written quotes that itemise materials, labour, and certification costs separately. A verbal estimate is not a quote.',
  'Beware of red flags: no scheme registration, unwillingness to provide certification, cash-only requests, and prices dramatically below other quotes.',
  'Elec-Mate-registered electricians deliver professional certificates, quotes, and invoices directly from their phone — giving homeowners a better experience and full documentation on the spot.',
];

const faqs = [
  {
    question: 'What is a competent person scheme for electricians?',
    answer:
      'A competent person scheme is a government-authorised scheme that allows registered electricians to self-certify their electrical work as compliant with Part P of the Building Regulations. Without scheme registration, an electrician must notify the local Building Control body before starting notifiable work, and Building Control must inspect the work afterwards — a process that costs extra and takes longer. The main competent person schemes for electrical work in England and Wales are NICEIC (National Inspection Council for Electrical Installation Contracting), NAPIT (National Association of Professional Inspectors and Testers), ELECSA, and BRE Certification. In Scotland, the equivalent is SELECT (the Scottish electricians trade body) and NICEIC Scotland. To join a scheme, an electrician must demonstrate competence through qualifications, experience, and a technical assessment of their work. They are then subject to regular re-assessment — typically an annual inspection of their completed work by the scheme assessor. Registration with a competent person scheme is the single most reliable indicator that an electrician is competent and accountable.',
  },
  {
    question: 'Do all electricians need to be registered with a competent person scheme?',
    answer:
      'No, not all electricians need to be scheme-registered — but you should strongly prefer one who is. An unregistered electrician can legally carry out minor electrical work (like replacing a socket faceplate or adding a light fitting to an existing circuit) without notification. However, for notifiable work — which includes new circuits, work in kitchens and bathrooms, consumer unit changes, outdoor electrical work, and any work in a special location — an unregistered electrician must apply to Building Control before starting the work, and Building Control must inspect and approve the work afterwards. This adds cost (Building Control fees are typically £200 to £400) and delay. A scheme-registered electrician can do the same work, self-certify it as compliant, and issue the Building Control notification automatically through their scheme. The homeowner receives a certificate and a Building Control notification — with no extra cost or delay. For any significant electrical work, always use a scheme-registered electrician.',
  },
  {
    question: "How do I verify an electrician's credentials?",
    answer:
      'You can verify an electrician\'s competent person scheme registration online. NICEIC has a "Find a Contractor" search at niceic.com. NAPIT has a "Find an Installer" search at napit.org.uk. ELECSA has a search at elecsa.co.uk. Enter the electrician\'s name, company name, or postcode, and the search will confirm whether they are currently registered. You can also ask the electrician directly for their scheme registration number and their qualification certificates. A genuine professional will have no problem showing you these. Check that the registration is current — not expired. If the electrician claims to be registered but does not appear on the scheme website, that is a red flag. You can also check whether the electrician has public liability insurance by asking to see the certificate. Most scheme providers require a minimum of £2 million public liability cover as a condition of membership.',
  },
  {
    question: 'What is the difference between NICEIC and NAPIT?',
    answer:
      'NICEIC and NAPIT are both government-authorised competent person schemes for electricians. They perform essentially the same function: assessing electricians, registering them, and allowing them to self-certify their work under Part P of the Building Regulations. The main differences are historical and organisational. NICEIC (National Inspection Council for Electrical Installation Contracting) has been operating since 1956 and is the largest scheme, with the highest brand recognition among homeowners. NAPIT (National Association of Professional Inspectors and Testers) was established in 1992 and has grown significantly, particularly among smaller firms and sole traders, partly because their fees tend to be lower. Both schemes require the same qualifications and carry out the same type of technical assessments. An electrician registered with either scheme is equally competent and equally able to self-certify work. There is no qualitative difference — choose based on the electrician, not the scheme.',
  },
  {
    question: 'How much should I expect to pay an electrician per hour?',
    answer:
      'Electrician hourly rates in the UK in 2026 typically range from £40 to £70 per hour depending on location, experience, and the type of work. London and the South East are at the higher end (£55 to £80 per hour), while the North of England, Wales, and Scotland tend to be at the lower end (£35 to £55 per hour). However, most electricians prefer to quote fixed prices for defined jobs rather than hourly rates. A fixed price gives both parties certainty — the customer knows the total cost upfront, and the electrician is rewarded for efficiency rather than penalised for working quickly. Fault-finding callouts are often charged at an hourly rate (typically £80 to £150 for the first hour) because the time needed is unpredictable. When comparing quotes, focus on the total price for the defined scope of work, not the hourly rate. An experienced electrician who charges £60 per hour and completes the work in 3 hours is cheaper than an inexperienced one who charges £40 per hour and takes 6 hours.',
  },
  {
    question: 'What happens if an electrician does bad work?',
    answer:
      'If an electrician carries out substandard work, you have several options depending on the circumstances. First, contact the electrician directly and explain the problem — many issues are resolved at this stage. If the electrician is registered with a competent person scheme (NICEIC, NAPIT, ELECSA), you can lodge a formal complaint with the scheme. They will investigate and, if the work is found to be substandard, can require the electrician to put it right at no cost. Persistent poor work can lead to the electrician being removed from the scheme. If the electrician is not scheme-registered, you have less protection — your recourse is through the Consumer Rights Act 2015 (which requires services to be performed with reasonable care and skill) and ultimately through the courts (small claims court for amounts under £10,000). You can also report dangerous electrical work to your local Building Control authority. In all cases, having a written quote, a contract, and photographic evidence of the work is essential. This is another reason to use a scheme-registered electrician — the scheme provides an independent complaints and resolution process.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-work-pricing-guide',
    title: 'Electrical Work Pricing Guide',
    description:
      'What every common electrical job costs in the UK in 2026 — sockets, rewires, EV chargers, consumer units, and more.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description:
      'Legal requirements for landlord EICRs, penalties for non-compliance, and how to choose an electrician for the inspection.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-safety-tips',
    title: 'Electrical Safety Tips',
    description:
      '15 essential safety tips for homeowners including RCD testing, socket safety, and warning signs of faults.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types',
    description:
      'Understanding EIC, Minor Works, and EICR certificates — what each one covers and when you need one.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-change-cost-uk',
    title: 'Consumer Unit Change Cost',
    description:
      'Detailed breakdown of consumer unit upgrade costs and what should be included in the price.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-become-electrician-uk',
    title: 'How to Become an Electrician',
    description:
      'Complete guide to the qualifications, training, and career pathway for becoming a qualified electrician in the UK.',
    icon: GraduationCap,
    category: 'Career',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-it-matters',
    heading: 'Why Choosing the Right Electrician Matters',
    content: (
      <>
        <p>
          Choosing the wrong electrician can be expensive, dangerous, and stressful. Substandard
          electrical work is one of the leading causes of house fires in the UK. It can also void
          your home insurance, create legal problems when you sell the property, and put your family
          at risk of electric shock.
        </p>
        <p>
          The electrical industry in the UK is not fully regulated — anyone can call themselves an
          electrician, and there is no legal requirement to hold a specific qualification to carry
          out electrical work (although there are legal requirements for certain types of work to be
          notified to Building Control). This means it is the homeowner's responsibility to check
          that the person they hire is genuinely qualified, registered, and insured.
        </p>
        <p>
          This guide explains exactly what to check, what questions to ask, and what red flags to
          watch for when hiring an electrician in the UK. Follow these steps and you will find a
          competent professional who does the job right, certificates the work properly, and gives
          you the documentation you need.
        </p>
      </>
    ),
  },
  {
    id: 'competent-person-schemes',
    heading: 'Competent Person Schemes: NICEIC, NAPIT, ELECSA',
    content: (
      <>
        <p>
          The single most important check you can make is whether the electrician is registered with
          a government-authorised competent person scheme. The three main schemes for electrical
          work in England and Wales are:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC</strong> — the largest and best-known scheme. Operating since 1956.
                Covers domestic and commercial electrical work. Registered contractors are assessed
                annually by a NICEIC assessor who inspects completed work on site.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT</strong> — the second largest scheme. Popular with sole traders and
                smaller firms. Same government authorisation and assessment requirements as NICEIC.
                Often slightly lower membership fees.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ELECSA</strong> — a well-respected scheme with a strong reputation in the
                domestic sector. Same authorisation and assessment standards as NICEIC and NAPIT.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All three schemes are authorised by the UK Government under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations-explained">
            Part P of the Building Regulations
          </SEOInternalLink>
          . Registration with any of them confirms that the electrician has been independently
          assessed and can self-certify their work — issuing Building Control notification
          automatically through the scheme.
        </p>
        <p>
          You can search for registered electricians on each scheme's website using your postcode.
          If an electrician claims to be registered but does not appear on the scheme's online
          search, they are either not registered or their registration has lapsed. Do not proceed.
        </p>
      </>
    ),
  },
  {
    id: 'qualifications',
    heading: 'Qualifications to Check',
    content: (
      <>
        <p>
          Beyond scheme registration, a qualified electrician should hold the following
          qualifications:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C&G 2382 — 18th Edition IET Wiring Regulations.</strong> This confirms the
                electrician has up-to-date knowledge of{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>
                . It is the foundational qualification that all other electrical qualifications
                build on.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>C&G 2391 — Inspection and Testing.</strong> Essential for any electrician
                carrying out{' '}
                <SEOInternalLink href="/guides/eicr-certificate-explained">
                  EICR inspections
                </SEOInternalLink>
                . This qualification covers the theory and practice of initial verification and
                periodic inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation qualification.</strong> Either C&G 2365 (Electrical
                Installation) or the NVQ Level 3 Diploma in Electrotechnical Services. This is the
                core practical qualification covering electrical installation work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Award className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AM2 (for scheme registration).</strong> The AM2 assessment is the practical
                end-point assessment required by most competent person schemes as a condition of
                registration. It demonstrates hands-on competence in real-world installation and
                testing scenarios.
              </span>
            </li>
          </ul>
        </div>
        <p>
          You do not need to memorise these qualification numbers. The key takeaway is: ask the
          electrician "Are you 18th Edition qualified and do you hold 2391?" If the answer is yes to
          both, and they are scheme-registered, you are dealing with a properly qualified
          professional.
        </p>
      </>
    ),
  },
  {
    id: 'getting-quotes',
    heading: 'Getting and Comparing Quotes',
    content: (
      <>
        <p>
          Always get at least three quotes for any significant electrical work. This is not about
          finding the cheapest — it is about understanding what is included, comparing the scope of
          work, and ensuring you are getting fair value.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Written quotes, not verbal estimates.</strong> A proper quote is a fixed
                price for a defined scope of work. A verbal estimate is not binding. Always get it
                in writing — email is fine.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Itemised breakdown.</strong> A good quote separates materials, labour, and
                certification costs. This allows you to compare like-for-like between quotes and
                spot where differences lie.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Clear scope of work.</strong> The quote should specify exactly what is
                included: number of sockets, cable routing, making good (or not), testing,
                certification type (EIC, Minor Works, EICR), and Building Control notification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>VAT clarification.</strong> Check whether the quoted price includes VAT.
                Electricians with annual turnover below the VAT threshold (currently £90,000) do not
                charge VAT. Larger firms do. A quote of "£800 plus VAT" is actually £960.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When comparing quotes, look at the total price for the same scope of work. If one quote is
          significantly cheaper than the others, ask why — the electrician may be using cheaper
          materials, not including certification, or planning to cut corners on testing. If one
          quote is significantly more expensive, ask what additional value is being provided.
        </p>
      </>
    ),
  },
  {
    id: 'questions-to-ask',
    heading: '10 Questions to Ask Before Hiring an Electrician',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Are you registered with a competent person scheme?</strong> NICEIC, NAPIT, or
              ELECSA. Ask for the registration number so you can verify it online.
            </li>
            <li>
              <strong>What qualifications do you hold?</strong> Look for C&G 2382 (18th Edition) and
              C&G 2391 (Inspection and Testing) as a minimum.
            </li>
            <li>
              <strong>Do you have public liability insurance?</strong> Ask to see the certificate. A
              minimum of £2 million cover is standard for domestic work.
            </li>
            <li>
              <strong>Will you provide a written quote?</strong> Not a verbal estimate. A written
              quote with an itemised breakdown of materials, labour, and certification.
            </li>
            <li>
              <strong>What certification will I receive?</strong> For new installations, you should
              receive an{' '}
              <SEOInternalLink href="/guides/eic-certificate-explained">EIC</SEOInternalLink> or{' '}
              <SEOInternalLink href="/guides/minor-works-certificate-explained">
                Minor Works Certificate
              </SEOInternalLink>
              . For inspections, an{' '}
              <SEOInternalLink href="/guides/eicr-certificate-explained">EICR</SEOInternalLink>.
            </li>
            <li>
              <strong>Will the work be notified to Building Control?</strong> For notifiable work,
              scheme-registered electricians do this automatically through their scheme.
            </li>
            <li>
              <strong>How long will the work take?</strong> Get a realistic timeline. Factor in
              disruption and plan accordingly.
            </li>
            <li>
              <strong>Is making good included?</strong> For work that involves chasing cables into
              walls, ask whether plastering and filling are included in the price.
            </li>
            <li>
              <strong>Can you provide references from recent similar work?</strong> A professional
              electrician will have satisfied customers willing to provide a reference.
            </li>
            <li>
              <strong>What is your payment terms?</strong> Some electricians require a deposit for
              materials on larger jobs. Final payment should be on completion, after inspection of
              the work and receipt of certificates.
            </li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: 'red-flags',
    heading: 'Red Flags to Watch For',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Not registered with any scheme.</strong> An electrician who is not
                registered with NICEIC, NAPIT, or ELECSA cannot self-certify work. You will need to
                pay for Building Control inspection separately, and there is no scheme-backed
                complaints process if things go wrong.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Refuses to provide certification.</strong> Every significant electrical job
                should result in a certificate (EIC, Minor Works, or EICR). An electrician who says
                "you do not need a certificate" is either cutting corners or not qualified to issue
                one.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cash only, no invoice.</strong> Legitimate businesses provide invoices and
                accept multiple payment methods. Cash-only work with no paperwork is a warning sign
                — it may indicate tax evasion, lack of insurance, or unwillingness to be traced.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Price dramatically below other quotes.</strong> If one quote is 40 to 50
                percent cheaper than the others, the electrician is either underqualified, planning
                to cut corners, or not including certification and testing in the price.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pressures you to decide immediately.</strong> A professional electrician
                provides a quote and gives you time to consider it. High-pressure tactics ("this
                price is only valid today") are a sales technique, not professional practice.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cannot explain what they are doing.</strong> A competent electrician can
                explain the work in plain English. If they cannot describe what is wrong, what they
                plan to do, and why, that is a concern.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'checking-credentials',
    heading: 'Checking Credentials Online',
    content: (
      <>
        <p>
          You can verify an electrician's scheme registration in minutes using these free online
          tools:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NICEIC:</strong> Visit niceic.com and use the "Find a Contractor" search.
                Enter the electrician's name, company name, or your postcode to find registered
                contractors near you.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAPIT:</strong> Visit napit.org.uk and use the "Find an Installer" search.
                Same approach — name, company, or postcode.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>ELECSA:</strong> Visit elecsa.co.uk and use their contractor search tool.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Safety First:</strong> The charity electricalsafetyfirst.org.uk
                has a "Find an Electrician" tool that searches across all major schemes
                simultaneously.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Also check for online reviews on Google, Checkatrade, Trustpilot, or local Facebook
          groups. Look for consistent positive feedback, not just one or two reviews. Pay attention
          to how the electrician responds to negative reviews — a professional response to criticism
          is a good sign.
        </p>
      </>
    ),
  },
  {
    id: 'what-to-expect',
    heading: 'What to Expect During the Work',
    content: (
      <>
        <p>
          Once you have chosen an electrician, here is what a professional job should look like:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Site survey.</strong> For any significant job (rewire, consumer unit change,
                EV charger), the electrician should visit the property first to assess the work,
                check access, and confirm the quote.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Safe isolation.</strong> Before starting any work, the electrician must
                follow the{' '}
                <SEOInternalLink href="/guides/safe-isolation-procedure">
                  safe isolation procedure
                </SEOInternalLink>{' '}
                to confirm the circuit is dead. This is non-negotiable — working on live circuits is
                dangerous and unprofessional.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Testing.</strong> All completed work must be tested to{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
                requirements — continuity, insulation resistance, polarity, earth fault loop
                impedance, prospective fault current, and RCD operation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Certification.</strong> On completion, you should receive the appropriate
                certificate (EIC, Minor Works, or EICR) with all test results recorded. This
                document is yours — keep it safe.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Clean and tidy.</strong> A professional electrician cleans up after
                themselves. The work area should be left as they found it, with all debris removed.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Building Trust with Professional Documentation',
    content: (
      <>
        <p>
          As an electrician, your reputation is built on three things: the quality of your work, the
          professionalism of your documentation, and the experience you give the customer. Elec-Mate
          helps you deliver on all three:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Certificates On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate EIC, Minor Works, and EICR certificates on your phone. Voice-dictated
                  test results, AI board scanning, automated defect classification. Send the
                  finished PDF to the customer by email or WhatsApp before you leave.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Star className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Quotes and Invoices</h4>
                <p className="text-white text-sm leading-relaxed">
                  Generate itemised, branded quotes with the AI cost engineer. Send invoices
                  directly from the app. The customer gets a professional experience that builds
                  trust and generates referrals.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Give customers a professional experience"
          description="Certificates, quotes, and invoices — all from your phone, all on site. Elec-Mate helps you look professional and work efficiently. 7-day free trial."
          icon={Users}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HowToFindAnElectricianPage() {
  return (
    <GuideTemplate
      title="How to Find a Good Electrician UK | What to Check"
      description="Complete guide to finding a qualified electrician in the UK. NICEIC, NAPIT, and ELECSA explained. Qualifications to check, questions to ask, red flags to watch for, and how to compare quotes."
      datePublished="2026-01-22"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Homeowner Guide"
      badgeIcon={Users}
      heroTitle={
        <>
          How to Find a Good Electrician:{' '}
          <span className="text-yellow-400">What to Check Before You Hire</span>
        </>
      }
      heroSubtitle="Not every electrician is qualified, registered, or insured. This guide tells you exactly what to check, what questions to ask, and what red flags to watch for — so you hire a professional who does the job right."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Hiring an Electrician"
      relatedPages={relatedPages}
      ctaHeading="Electricians: Build Trust with Professional Documentation"
      ctaSubheading="Certificates, quotes, and invoices from your phone. Give every customer a professional experience with Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
