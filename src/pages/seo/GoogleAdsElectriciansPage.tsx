import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  BarChart3,
  PoundSterling,
  Search,
  Target,
  Globe,
  Star,
  TrendingUp,
  CheckCircle2,
  AlertTriangle,
  Zap,
  Phone,
  FileCheck2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business Guides', href: '/guides/growing-electrical-business' },
  { label: 'Google Ads for Electricians', href: '/google-ads-electricians' },
];

const tocItems = [
  { id: 'local-services-ads', label: 'Google Local Services Ads' },
  { id: 'search-ads', label: 'Traditional Search Ads' },
  { id: 'cost-per-click', label: 'Cost Per Click & Budgets' },
  { id: 'ad-copy', label: 'Ad Copy That Converts' },
  { id: 'negative-keywords', label: 'Negative Keywords' },
  { id: 'conversion-tracking', label: 'Conversion Tracking' },
  { id: 'budget-recommendations', label: 'Budget Recommendations' },
  { id: 'for-electricians', label: 'Winning the Jobs You Advertise For' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Google Local Services Ads (the "Google Guaranteed" badge) appear above everything else in search results and charge per lead rather than per click. For electricians, they are typically the highest-return paid advertising channel.',
  'Traditional Google Search Ads cost £3–£10 per click for electrical keywords in most UK areas. Inner London and other competitive markets can reach £15–£25 per click for high-intent terms.',
  'Conversion tracking — knowing which ads generate phone calls and form submissions — is not optional. Without it, you are spending blind. Set up Google Ads conversion tracking and call tracking before spending a pound.',
  'Negative keywords are as important as positive keywords. Without them, your ads will show for irrelevant searches and burn through budget. Build your negative keyword list before launching any campaign.',
  'A realistic starting budget for a sole trader testing Google Ads is £300–£500/month. This generates 30–100+ clicks at typical CPC rates, enough to assess whether the channel works for your area.',
  'The fastest way to improve Google Ads performance is to improve your landing page — the page people arrive at after clicking your ad. A slow, generic homepage converts badly. A fast, specific landing page converts well.',
];

const faqs = [
  {
    question: 'What is the difference between Google Local Services Ads and regular Google Ads?',
    answer:
      'Google Local Services Ads (LSAs) appear at the very top of the search results page, above regular ads and organic results. They show your business name, rating, phone number, and the "Google Guaranteed" or "Google Screened" badge. You pay per lead (a phone call or message) rather than per click, and Google reimburses you for leads that do not meet your criteria. Regular Google Search Ads appear below LSAs and above organic results, and you pay per click regardless of whether the visitor becomes a customer. LSAs require identity and background verification; Search Ads do not.',
  },
  {
    question: 'How much do Google Ads cost for electricians in the UK?',
    answer:
      'Cost per click varies significantly by location and competition. Typical ranges in 2026: "electrician [town]" in a provincial UK city — £3–£6 per click. "Emergency electrician London" — £10–£25 per click. "EICR [town]" — £2–£5 per click. "EV charger installation [town]" — £3–£8 per click. These are averages — actual CPC depends on your Quality Score (how relevant your ad and landing page are to the keyword) and how many other electricians are bidding. A higher Quality Score means you pay less per click than competitors with lower scores.',
  },
  {
    question: 'What is Google Guaranteed for electricians?',
    answer:
      'Google Guaranteed is the badge shown on Local Services Ads. To qualify, your business must pass Google\'s verification process: identity verification, business registration check, insurance verification, and licence check (for electricians, this includes checking NICEIC, NAPIT, or equivalent registration). Once verified, your ads show the Google Guaranteed badge, which significantly increases trust and click-through rates. Google also offers a financial guarantee to customers who are unhappy with Google Guaranteed work — up to £1,500 in the UK. You pay per qualified lead, typically £15–£40 per lead for electrical work.',
  },
  {
    question: 'How do I set up conversion tracking for my Google Ads?',
    answer:
      'Conversion tracking tells Google Ads which clicks lead to actual enquiries. Set up two types: (1) Website form submissions — install the Google Ads conversion tag on your thank-you page (the page shown after a form is submitted). Your website builder or WordPress plugin can do this. (2) Phone calls — use Google\'s call tracking (free within Google Ads) or a dedicated call tracking service like CallRail. Without conversion tracking, Google\'s automated bidding has no data to optimise against and your campaigns will underperform. Set this up before spending any money.',
  },
  {
    question: 'What are negative keywords and why do they matter?',
    answer:
      'Negative keywords tell Google not to show your ads for certain searches. Without them, "electrician" could match "electrical engineering jobs", "electrician salary", "how to become an electrician", and dozens of other irrelevant searches. Every irrelevant click wastes your budget. Standard negative keywords for electricians include: jobs, salary, course, training, apprenticeship, DIY, how to, free, volunteer, career, hire, recruitment. Add these before launching. Review your Search Terms report weekly for the first month to identify additional irrelevant terms to add.',
  },
  {
    question: 'How much should a sole-trader electrician spend on Google Ads?',
    answer:
      'Start with £300–£500/month as a test budget. This gives you enough data to see whether the channel is working without risking significant money. At a £4 average CPC, £400/month buys 100 clicks. If your landing page converts at 5 per cent (typical for a basic site), that is 5 leads. If you win 2 of those jobs at an average value of £400 each, your revenue from ads is £800 — a 2x return on a £400 spend. Improve your landing page conversion rate and that return increases proportionally. Run for at least two to three months before judging whether the channel works.',
  },
  {
    question: 'Should I manage Google Ads myself or hire someone?',
    answer:
      'If you are starting with less than £500/month in ad spend, managing it yourself makes sense — the potential saving on management fees is worth the learning curve. Google\'s own guided setup (Smart campaigns) is a reasonable starting point, though it gives less control than Expert Mode. When your monthly budget exceeds £1,000 or you are spending significant time managing campaigns without improving performance, hiring a PPC specialist (£200–£500/month management fee for a small account) typically pays for itself. Look for specialists with experience in home services or trades — electrical PPC is different from e-commerce.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/seo-for-electricians',
    title: 'SEO for Electricians',
    description: 'How to rank organically on Google — free, long-term traffic that compounds over time.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/electrician-business-website',
    title: 'Electrician Website Guide',
    description: 'Build a website that converts ad clicks into booked jobs.',
    icon: Globe,
    category: 'Guide',
  },
  {
    href: '/customer-reviews-electrician',
    title: 'Getting Customer Reviews',
    description: 'Reviews improve your Google Ads Quality Score and Local Services Ads ranking.',
    icon: Star,
    category: 'Guide',
  },
  {
    href: '/growing-electrical-business',
    title: 'Growing Your Electrical Business',
    description: 'From sole trader to small team — systems, hiring, and scaling.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Elec-Mate Quoting App',
    description: 'Convert ad leads into booked jobs with professional quotes sent in under two minutes.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'local-services-ads',
    heading: 'Google Local Services Ads — The Google Guaranteed Badge',
    content: (
      <>
        <p>
          Google Local Services Ads (LSAs) are the most powerful paid advertising format available
          to local electricians. They appear at the very top of the page — above organic results,
          above regular Google Ads — and carry the "Google Guaranteed" badge, which significantly
          increases trust and click-through rates. Unlike regular ads, you pay per qualified lead
          (a phone call or message), not per click.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Verification requirements</strong> — to become Google Guaranteed you must
                pass: identity check (passport or driving licence), business registration
                verification, public liability insurance check, and professional licence verification
                (NICEIC, NAPIT, or ELECSA registration). The process takes one to four weeks. Start
                this now — do not wait until you want to advertise.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pay per lead</strong> — you set a weekly budget and pay approximately
                £15–£40 per qualified lead (a phone call of minimum duration). You can dispute leads
                that do not meet your criteria (wrong service area, wrong job type) and receive a
                credit. Average lead cost varies by location — London leads cost more than leads in
                smaller towns.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ranking factors</strong> — LSA ranking is based on: responsiveness (how
                quickly you answer calls), review score and number, proximity to the searcher, and
                business hours. A 4.9-star electrician who answers calls within one ring will rank
                above a competitor with fewer reviews who misses calls. Answer every call.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Start here first</strong> — if you are new to paid advertising, start with
                Local Services Ads before traditional Search Ads. The pay-per-lead model is simpler
                to manage, lower risk, and the Google Guaranteed badge produces higher conversion
                rates than regular ads.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'search-ads',
    heading: 'Traditional Google Search Ads for Electricians',
    content: (
      <>
        <p>
          Traditional Google Search Ads appear below Local Services Ads and above organic results.
          You bid on keywords and pay each time someone clicks your ad. They give you more control
          over targeting, ad copy, and landing pages than LSAs, but also require more management.
          They are most effective when you have a specific landing page matched to each ad group.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Campaign structure</strong> — create separate ad groups for each main
                service: EICR, consumer unit upgrade, EV charger installation, emergency electrician,
                rewire. Each ad group should have its own keywords, ad copy, and ideally its own
                landing page. Mixing all services into one campaign produces poor results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Match types</strong> — use Phrase Match for most keywords (e.g., "electrician
                coventry") to balance reach and relevance. Avoid Broad Match until you have
                significant conversion data — it will spend your budget on irrelevant searches.
                Exact Match (e.g., [electrician coventry]) is for your highest-converting, most
                specific terms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Quality Score</strong> — Google rates the relevance of your ads and landing
                pages with a score of 1–10. A higher Quality Score means you pay less per click than
                competitors with lower scores, even if they bid more. Improve Quality Score by
                matching your ad copy and landing page content closely to your keywords.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Target className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ad extensions</strong> — always add call extensions (your phone number),
                location extensions (links to your Google Business Profile), site link extensions
                (links to specific service pages), and callout extensions ("NICEIC Registered",
                "Same-Day Response", "Fully Insured"). Extensions increase your ad's footprint on
                the results page at no extra cost.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cost-per-click',
    heading: 'Cost Per Click and Budget Expectations',
    content: (
      <>
        <p>
          Understanding typical costs helps you plan a realistic budget and evaluate whether Google
          Ads is working. These are 2026 UK estimates — actual costs vary by location, competition,
          and Quality Score.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>"Electrician [town]" — £3–£8 per click</strong>: Most competitive term in
                most UK markets. Higher in major cities. A well-optimised campaign with a good Quality
                Score will pay towards the lower end.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>"Emergency electrician [town]" — £6–£15 per click</strong>: Higher intent,
                higher CPC. Customers searching for emergency electricians have an urgent need and
                convert at a higher rate — the higher CPC is typically justified by higher average
                job value.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>"EV charger installation [town]" — £3–£8 per click</strong>: Growing market,
                moderate competition. Higher average job value (£500–£1,500) makes this keyword
                highly profitable even at higher CPC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>"EICR [town]" — £2–£5 per click</strong>: Less competitive than general
                "electrician" terms. Lower average job value but predictable work volume. Good
                for building relationships with landlords who generate repeat business.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inner London — add 50–150% to the above</strong>: London is the most
                competitive electrical market in the UK. Emergency electrician London can reach
                £20–£30 per click. Targeting specific London boroughs rather than "London" broadly
                reduces CPC and improves relevance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'ad-copy',
    heading: 'Ad Copy That Converts for Electrical Services',
    content: (
      <>
        <p>
          Your ad copy must stand out in a results page where multiple electricians are all claiming
          to be the best. Differentiation and trust signals are what drive clicks. Here is what works
          for electrical trade advertising.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lead with your strongest differentiator</strong> — "NICEIC Registered
                Electrician | Same-Day Response | From £X". Put your most compelling point in the
                first headline where it gets maximum attention. Scheme registration, response time,
                and transparent pricing are the most effective differentiators.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Include a price signal</strong> — "EICRs from £X" or "Consumer Unit from
                £X" attracts customers who are price-researching and sets expectations. It also
                pre-qualifies leads — customers who click knowing your approximate price are more
                likely to proceed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Use your location</strong> — "Coventry Electrician" in the headline signals
                local relevance. Include the searcher's location where possible using dynamic keyword
                insertion or location-specific ad groups.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Strong call to action</strong> — "Call Now for a Free Quote", "Book Online
                Today", "Get a Same-Day Quote". Tell the customer exactly what to do next. Ads
                without a clear CTA underperform significantly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What not to write</strong> — avoid generic claims like "best electrician",
                "quality service", and "professional work". Every competitor uses these phrases and
                they mean nothing to a customer. Be specific: years of experience, number of jobs
                completed, specific services, specific areas, real prices.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'negative-keywords',
    heading: 'Negative Keywords — Protecting Your Budget',
    content: (
      <>
        <p>
          Negative keywords are the most underused feature in Google Ads. They prevent your ads from
          showing for irrelevant searches, saving budget that would otherwise be wasted on people who
          will never hire you. Build your negative keyword list before spending a pound.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Career and employment searches</strong> — add as negatives: jobs, vacancy,
                vacancies, apprenticeship, apprentice, career, employment, hire, recruit, CV,
                salary, wage, pay. These searches are from people looking for work, not customers
                looking to hire an electrician.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Training and education</strong> — course, training, qualification, how to
                become, college, City and Guilds, NVQ, Level 2, Level 3. These are students or
                people considering a career change, not paying customers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DIY and informational</strong> — DIY, free, how to, can I, is it legal,
                forum, Reddit, guide. These searchers want information, not a tradesperson.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Out-of-area locations</strong> — if you cover Birmingham only, add
                Manchester, London, Bristol, and all other major cities as negatives. Without
                this, your ads may show nationally for broad terms.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Check your Search Terms report (Reports → Predefined reports → Search terms) weekly for
          the first month. Every irrelevant term you see is one to add to your negative list. This
          process alone can reduce wasted spend by 20–40 per cent in the first month.
        </p>
      </>
    ),
  },
  {
    id: 'conversion-tracking',
    heading: 'Conversion Tracking — Essential Before Spending',
    content: (
      <>
        <p>
          Without conversion tracking, you are spending money with no idea what is working. Setting
          up conversion tracking correctly takes one to two hours and will save you money from day one.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Phone call tracking</strong> — add a call conversion in Google Ads (Google
                Ads → Tools → Conversions → Add Conversion → Phone calls). Use Google forwarding
                numbers on your website — when someone clicks your ad and calls the Google number,
                the call is tracked back to your campaign. For more detail, use a dedicated call
                tracking service like CallRail (from £30/month) which provides caller ID, call
                recordings, and keyword attribution.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Form submission tracking</strong> — install the Google Ads conversion
                tag on your enquiry form thank-you page. In Wix and Squarespace, this can be added
                via the site's analytics or custom code section. In WordPress, use the Google
                Site Kit plugin or add the tag via Google Tag Manager.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart Bidding</strong> — once you have 30+ conversions in a 30-day period,
                you can switch to Target CPA or Maximise Conversions bidding. Google's Smart Bidding
                uses your conversion data to automatically optimise bids in real time. It only works
                with sufficient conversion data — hence the importance of tracking from day one.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'budget-recommendations',
    heading: 'Budget Recommendations by Business Size',
    content: (
      <>
        <p>
          Google Ads budgets for electricians vary considerably by business size, service area, and
          growth ambitions. Here are realistic recommendations for 2026.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">Sole trader testing the channel — £200–£400/month</strong>
                <span>
                  Enough to generate 30–80 clicks at typical CPC rates. Run for three months before
                  evaluating. Focus on one or two high-value services (EICR, consumer unit) rather
                  than covering everything. Start with Local Services Ads if possible — lower risk.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">Sole trader or small team growing actively — £500–£1,000/month</strong>
                <span>
                  Sufficient to cover multiple service types and a reasonable geographic area.
                  At this spend level, hiring a part-time PPC specialist (£200–£300/month management
                  fee) begins to make sense.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <BarChart3 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">Established business or multi-van operation — £1,500–£5,000/month</strong>
                <span>
                  Competitive positioning across a wide service area. At this level, professional
                  agency management (£400–£800/month) typically pays for itself through better
                  campaign optimisation. Requires professional tracking and reporting infrastructure.
                </span>
              </div>
            </li>
          </ul>
        </div>
        <p>
          Never spend money on Google Ads without first ensuring your website and phone response
          are optimised to convert the traffic. A £1,000/month ad spend is wasted if your landing
          page is slow, your contact form does not work, or you miss half the calls.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Winning the Jobs You Pay to Advertise For',
    content: (
      <>
        <p>
          Google Ads generates enquiries — your systems determine whether those enquiries become
          booked jobs. The electricians who get the best return from paid advertising are the ones
          who respond fastest with the most professional follow-up.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Fast, Win More Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  Customers who enquire via a Google Ad have often already visited two or three
                  competitor websites and may have submitted multiple enquiry forms. The first
                  electrician with a professional, detailed quote typically wins the job. Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to send a branded quote from your phone within minutes of receiving the enquiry.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Convert Jobs Into Reviews</h4>
                <p className="text-white text-sm leading-relaxed">
                  Every Google Ad job is an opportunity to generate a review that improves your
                  ad ranking, your LSA ranking, and your organic ranking simultaneously. Build
                  review requests into your job completion process — ask in person, follow up
                  via WhatsApp or SMS within the hour.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Convert your Google Ad leads into booked jobs"
          description="Professional quoting, invoicing, and job management for UK electricians. Respond to leads faster and more professionally. 7-day free trial, no card required."
          icon={BarChart3}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function GoogleAdsElectriciansPage() {
  return (
    <GuideTemplate
      title="Google Ads for Electricians UK | PPC Guide for Electrical Contractors"
      description="Complete Google Ads guide for UK electricians. Local Services Ads (Google Guaranteed), traditional search ads, typical cost per click (£3–£10), conversion tracking, ad copy, negative keywords, and budget recommendations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={BarChart3}
      heroTitle={
        <>
          Google Ads for Electricians UK:{' '}
          <span className="text-yellow-400">PPC Guide for Electrical Contractors</span>
        </>
      }
      heroSubtitle="A practical guide to Google Ads for UK electricians — Local Services Ads and the Google Guaranteed badge, traditional search ads, typical costs of £3–£10 per click, conversion tracking, ad copy that converts, negative keywords, and budget recommendations for every business size."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Google Ads for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Win More Jobs From Your Google Ads Investment"
      ctaSubheading="Elec-Mate helps UK electricians respond to ad leads faster with professional quotes and convert every job into a five-star review. 7-day free trial."
    />
  );
}
