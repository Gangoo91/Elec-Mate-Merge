import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Search,
  Star,
  MapPin,
  Globe,
  Link2,
  Clock,
  BarChart3,
  PoundSterling,
  TrendingUp,
  CheckCircle2,
  MessageSquare,
  FileCheck2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business Guides', href: '/guides/growing-electrical-business' },
  { label: 'SEO for Electricians', href: '/seo-for-electricians' },
];

const tocItems = [
  { id: 'google-business-profile', label: 'Google Business Profile' },
  { id: 'keywords-to-target', label: 'Keywords to Target' },
  { id: 'on-page-seo', label: 'On-Page SEO for Service Pages' },
  { id: 'local-citations', label: 'Local Citations' },
  { id: 'review-strategy', label: 'Review Generation Strategy' },
  { id: 'link-building', label: 'Link Building Basics' },
  { id: 'how-long-seo-takes', label: 'How Long SEO Takes' },
  { id: 'for-electricians', label: 'Elec-Mate Business Tools' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Your Google Business Profile is the single most important SEO asset for a local electrician. Optimising it costs nothing and typically produces results faster than any other SEO activity.',
  'Local citations — consistent listings on Checkatrade, MyBuilder, Rated People, Yell, and Thomson Local — tell Google your business is legitimate and improve your map pack ranking.',
  'On-page SEO for electricians means creating a separate service page for each main service (EICR, consumer unit upgrade, EV charger, rewire) and a separate location page for each town you cover.',
  'Reviews are the most powerful local ranking signal after proximity. Aim for at least 20 Google reviews before investing in any other SEO activity.',
  'For a well-optimised electrician with good reviews, it typically takes three to six months to achieve first-page map pack rankings in competitive areas. Less competitive areas can rank in four to eight weeks.',
  'Paid local citations on Checkatrade and MyBuilder serve double duty — they generate direct enquiries AND act as high-authority backlinks that improve your organic Google rankings.',
];

const faqs = [
  {
    question: 'What is the most important thing I can do for SEO as an electrician?',
    answer:
      'Optimise your Google Business Profile completely and generate at least 20 genuine Google reviews. These two activities have more impact on local search visibility than anything else you can do. A complete profile (every field filled, services listed, photos uploaded, posts published regularly) combined with a strong review score will get you into the local map pack for your main area within weeks in less competitive locations and within months in competitive cities.',
  },
  {
    question: 'What keywords should an electrician target?',
    answer:
      'Focus on geo-modified service terms: "electrician [town]", "emergency electrician [town]", "EICR [town]", "fuse box replacement [town]", "EV charger installation [town]", "rewire [town]". Also target informational queries: "how much does an EICR cost", "do I need an electrician to install an EV charger", "signs of faulty wiring". The service plus location terms generate immediate purchase-intent traffic; the informational terms build authority and bring in research-phase customers. Do not target generic national terms — compete locally first.',
  },
  {
    question: 'What are local citations and why do they matter?',
    answer:
      'Local citations are online mentions of your business name, address, and phone number (NAP). They appear on directories like Yell.com, Thomson Local, Yelp, and trade platforms like Checkatrade and MyBuilder. Google uses citation consistency as a trust signal — the more consistently your NAP appears across reputable websites, the more confident Google is that your business is legitimate and at the stated location. Inconsistent citations (different phone numbers, old addresses) actively hurt your ranking. Audit your existing citations using BrightLocal (free trial available) and correct any inconsistencies.',
  },
  {
    question: 'How do I get my electrical business into the Google map pack?',
    answer:
      'The map pack (the three businesses shown on the map above organic results) is driven by three factors: relevance (does your profile match the search?), distance (how close is your business to the searcher?), and prominence (how reputable is your business online?). You cannot control distance — proximity matters. You control relevance by fully optimising your profile and using the exact service keywords customers search for. You control prominence through reviews, citations, and website backlinks. For most electricians, the highest return activities are: complete your profile, get 20+ reviews, list on Checkatrade and MyBuilder, and link your profile to your website.',
  },
  {
    question: 'Is Checkatrade worth it for SEO as well as direct leads?',
    answer:
      'Yes — Checkatrade (and MyBuilder, Rated People, and TrustATrader) serve dual purposes. They generate direct enquiries from homeowners using those platforms AND they provide high-authority backlinks to your website that improve your Google ranking. A link from Checkatrade carries significant domain authority. The annual cost (£600–£1,500 depending on your package) needs to be evaluated against both the direct lead value and the SEO value. For most electricians, at least one paid listing on a major trade platform is justified on SEO grounds alone.',
  },
  {
    question: 'How do I get more Google reviews as an electrician?',
    answer:
      'Ask every satisfied customer immediately after completing the job — this is the highest-converting moment. The easiest method is a Google review short link (generate one free via your Google Business Profile dashboard) sent as a WhatsApp message or SMS with a brief, friendly request. A simple "I really appreciate your business — if you have a moment, a Google review would mean the world to me [link]" text sent within an hour of finishing the job converts well. Print QR code cards (Vistaprint, from £20 for 50 cards) linking to your review page and leave one with every customer.',
  },
  {
    question: 'How long does SEO take to work for an electrician?',
    answer:
      'Realistic expectations: Google Business Profile optimisation and review generation can produce measurable results within four to eight weeks in less competitive areas. Organic website ranking improvements typically take three to six months. Competitive areas (inner London, major city centres) with established competitors who have been doing SEO for years may take six to twelve months to rank significantly. SEO is a compounding investment — results build over time and, unlike paid ads, do not stop when you stop paying. Begin now even if you will not see results immediately.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electrician-business-website',
    title: 'Electrician Website Guide',
    description:
      'How to build and market your electrician website — builders, trust signals, and costs.',
    icon: Globe,
    category: 'Guide',
  },
  {
    href: '/google-ads-electricians',
    title: 'Google Ads for Electricians',
    description: 'PPC guide — Local Services Ads, search ads, cost per click, and budgets.',
    icon: BarChart3,
    category: 'Guide',
  },
  {
    href: '/customer-reviews-electrician',
    title: 'Getting Customer Reviews',
    description: 'Why reviews matter and exactly how to ask for them at the right moment.',
    icon: Star,
    category: 'Guide',
  },
  {
    href: '/electrician-referral-programme',
    title: 'Electrician Referral Programme',
    description: 'Building a referral network with builders, plumbers, and estate agents.',
    icon: Link2,
    category: 'Guide',
  },
  {
    href: '/growing-electrical-business',
    title: 'Growing Your Electrical Business',
    description: 'From sole trader to small team — systems, hiring, and scaling.',
    icon: TrendingUp,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'google-business-profile',
    heading: 'Google Business Profile — The #1 SEO Priority for Electricians',
    content: (
      <>
        <p>
          Your Google Business Profile (formerly Google My Business) is the most powerful free SEO
          tool available to a local electrician. When someone searches "electrician near me" or
          "electrician [your town]", the map pack results — the three businesses shown at the top of
          the page — come from Google Business Profiles, not from websites. Appearing here is worth
          more than ranking organically, because map pack results receive more clicks than the
          organic results below them.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Complete every field</strong> — business name (exactly as it appears on your
                invoices and van), address (or service area if you do not have a commercial
                premises), phone number, website, hours including emergency availability, and a
                detailed description using your target keywords naturally.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Select the right primary category</strong> — "Electrician" is the most
                important field. Add secondary categories for services you genuinely offer: "HVAC
                contractor" only if relevant, "EV charging station" if you install chargers, "Fire
                alarm supplier" if you install fire alarms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Add every service</strong> — use the Services section to list all services
                with prices where appropriate. "Consumer unit upgrade from £X", "EICR from £X". This
                content is indexed by Google and matches your profile to service-specific searches.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Upload photos weekly</strong> — profiles with recent photos rank higher.
                Upload photos of your van, completed work (with customer permission), your NICEIC
                certificate, and your team. Aim for at least 20 photos and add new ones regularly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Post weekly updates</strong> — Google Business Profile posts (similar to
                social media posts) keep your profile active and signal to Google that you are a
                live, operating business. Share job completion photos, seasonal offers, or useful
                safety tips. Takes five minutes per week.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Respond to every review</strong> — responding to reviews (both positive and
                negative) is a ranking signal. It also demonstrates professionalism to prospective
                customers reading your reviews. Never ignore a negative review — respond calmly,
                professionally, and offer to resolve the issue.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A fully optimised Google Business Profile with 30+ reviews will rank in the map pack for
          your local area in most markets without any other SEO activity. Start here before spending
          money on anything else.
        </p>
      </>
    ),
  },
  {
    id: 'keywords-to-target',
    heading: 'What Keywords to Target as a UK Electrician',
    content: (
      <>
        <p>
          Keyword research sounds complex, but for a local electrician it is straightforward. You
          need to think about what your customers type into Google when they need you — and match
          your website and profile content to those exact phrases.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">
                  Purchase-intent local keywords (highest priority)
                </strong>
                <span>
                  "Electrician [town]", "emergency electrician [town]", "EICR [town]", "EV charger
                  installation [town]", "consumer unit replacement [town]", "rewire [town]",
                  "electrical fault finding [town]". These bring customers who are ready to hire
                  now. Create a dedicated page for each service and location combination.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">Informational keywords (secondary priority)</strong>
                <span>
                  "How much does a consumer unit upgrade cost UK", "do I need an EICR to sell my
                  house", "what is a C2 on an EICR", "how long does a rewire take", "can an
                  electrician install an EV charger". These attract research-phase visitors and
                  build authority. Answer these questions with blog posts or FAQ sections.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">Avoid</strong>
                <span>
                  Generic national terms like "electrician UK" or "electrical contractor England".
                  You cannot compete nationally against established directories and large companies.
                  Own your local market first — dominate your town, then expand to neighbouring
                  areas.
                </span>
              </div>
            </li>
          </ul>
        </div>
        <p>
          Use Google's free Keyword Planner or the free version of Ubersuggest to see monthly search
          volumes for your target keywords. In smaller towns, "electrician [town]" may only get 50
          searches per month — but those 50 searches are from people in your exact service area who
          need an electrician today.
        </p>
      </>
    ),
  },
  {
    id: 'on-page-seo',
    heading: 'On-Page SEO for Electrician Service Pages',
    content: (
      <>
        <p>
          On-page SEO means optimising the content and structure of each page on your website so
          Google understands what it is about and ranks it for the right searches. For electricians,
          this primarily means creating proper service pages and location pages.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Page title (H1)</strong> — include your primary keyword and location.
                Example: "EICR Certificate in Birmingham | NICEIC Registered Electrician". This is
                the most important on-page SEO element.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meta title and description</strong> — the meta title appears in Google
                results as your blue link text. Include your keyword, location, and a differentiator
                (NICEIC registered, same-day response, from £X). The meta description should include
                your phone number and a clear benefit statement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Content length and quality</strong> — each service page should have at least
                300–500 words explaining the service, what it involves, why it matters, what the
                process looks like, and approximate costs. Google rewards pages that genuinely
                answer customer questions over thin pages with little content.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Internal linking</strong> — link between your service pages and location
                pages. This helps Google understand the structure of your site and distributes
                authority across pages. Link your EICR page to your consumer unit page, your EV
                charger page to your smart home page, and so on.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Schema markup</strong> — add LocalBusiness schema to your homepage. This
                structured data tells Google your business name, address, phone, opening hours, and
                service area in a format it can read directly. WordPress plugins (Yoast, Rank Math)
                handle this automatically. On Wix or Squarespace, add it via the SEO settings.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'local-citations',
    heading: 'Local Citations — Building Your Online Footprint',
    content: (
      <>
        <p>
          Local citations are mentions of your business across the web. Consistent citations on
          reputable directories and trade platforms tell Google your business is legitimate and
          improve your local ranking. The key word is <em>consistent</em> — your NAP (name, address,
          phone) must be identical everywhere.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Link2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">Trade platforms (paid — dual purpose)</strong>
                <span>
                  Checkatrade (£600–£1,500/year), MyBuilder (pay-per-lead), Rated People
                  (pay-per-lead), TrustATrader (£300–£900/year). These generate direct enquiries AND
                  provide high-authority backlinks. At least one paid listing is typically
                  worthwhile for the SEO value alone.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Link2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">Free directories (essential)</strong>
                <span>
                  Yell.com, Thomson Local, Yelp, FreeIndex, Bark.com (free basic listing), Hot Frog,
                  Scoot. Create free listings on all of these with identical NAP information. Takes
                  two to three hours to set up and has a lasting positive effect on your local
                  ranking.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Link2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">Scheme directories (free)</strong>
                <span>
                  Your NICEIC, NAPIT, or ELECSA registration comes with a free listing in the
                  scheme's online directory — these are high-authority citations that many
                  electricians forget to optimise. Make sure your profile is complete with your
                  service area, website, and contact details.
                </span>
              </div>
            </li>
          </ul>
        </div>
        <p>
          Use BrightLocal's free Citation Tracker to see where your business is already listed and
          identify gaps. Prioritise fixing inconsistencies on existing listings before creating new
          ones — inconsistent data actively hurts your ranking.
        </p>
      </>
    ),
  },
  {
    id: 'review-strategy',
    heading: 'Review Generation Strategy for Electricians',
    content: (
      <>
        <p>
          Reviews are the single most powerful signal for local SEO after proximity. Google rewards
          businesses with more reviews, higher ratings, and more recent reviews. Here is a
          systematic approach to generating reviews consistently.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ask at the right moment</strong> — the best time to ask is immediately after
                completing the job, when the customer is satisfied and grateful. Do not wait until
                you are back in the van or until the next day. Ask in person: "If you are happy with
                the work, a Google review would really help my business."
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Send the link immediately</strong> — follow up your verbal ask with a
                WhatsApp or SMS containing your Google review short link within one hour. The
                conversion rate drops significantly after 24 hours. Generate your short link free
                from your Google Business Profile dashboard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>QR code cards</strong> — print 50 cards (Vistaprint, from £20) with a QR
                code linking to your Google review page and a simple message: "Loved our work? A
                quick review means everything to a small business." Leave one with every customer.
                Some customers prefer to leave reviews in their own time.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Platform diversification</strong> — Google is the priority, but reviews on
                Checkatrade, Trustpilot, and Bark also matter. Some customers prefer to review on
                platforms they already use. Aim for Google first, then the platform your paid
                listing is on.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'link-building',
    heading: 'Link Building Basics for Electricians',
    content: (
      <>
        <p>
          Backlinks — other websites linking to yours — are one of Google's strongest ranking
          signals. For a local electrician, you do not need hundreds of links. A small number of
          relevant, high-authority links will significantly improve your ranking.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Link2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Trade platform listings</strong> — Checkatrade, MyBuilder, Rated People, and
                TrustATrader all link to your website. These are high-authority links and are the
                easiest to obtain. This alone is reason enough to maintain at least one paid trade
                platform listing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Link2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scheme directories</strong> — your NICEIC, NAPIT, or ELECSA profile links to
                your website. These are trusted industry sites with significant authority. Make sure
                your profile includes a website link.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Link2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local business partnerships</strong> — builders, plumbers, kitchen fitters,
                and estate agents you work with may be willing to link to your website from their
                "trusted partners" or "preferred suppliers" page. These local, relevant links carry
                significant weight for local SEO.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Link2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local press and business groups</strong> — sponsoring a local sports club or
                charity event often earns a link from their website. Joining your local chamber of
                commerce typically includes a directory listing with a link. Federation of Master
                Builders (FMB) membership also provides a high-authority link.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Avoid buying links from link farms or paying for bulk directory submissions. Google
          penalises unnatural link patterns. Five genuine, relevant links from reputable local
          sources are worth more than 500 spammy links.
        </p>
      </>
    ),
  },
  {
    id: 'how-long-seo-takes',
    heading: 'How Long Does SEO Take for an Electrician?',
    content: (
      <>
        <p>
          This is the question every electrician asks, and the honest answer is: it depends. Here
          are realistic timelines based on typical UK electrical businesses.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weeks 1–4</strong> — complete your Google Business Profile, correct citation
                inconsistencies, and request your first 10 reviews. You may see your profile begin
                to appear for searches in your immediate area within a fortnight.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Months 2–3</strong> — with 20+ reviews and a fully optimised profile, you
                should appear in the map pack for your core local area in most non-metropolitan
                markets. Website service pages begin to index and appear for long-tail searches.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Months 3–6</strong> — organic website rankings improve as your content
                matures and backlinks build. You should begin ranking on page one for your key
                service plus location terms in less competitive areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6–12 months (competitive areas)</strong> — inner London, Birmingham,
                Manchester, and other major cities have established competitors with years of SEO
                investment. Expect 6–12 months of consistent effort to achieve significant map pack
                presence for core terms.
              </span>
            </li>
          </ul>
        </div>
        <p>
          SEO compounds over time. An electrician who starts today and is consistent for 12 months
          will be in a significantly stronger position than a competitor who starts six months
          later. Start now, even if results are not immediate.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'The Business Tools That Support Your SEO',
    content: (
      <>
        <p>
          SEO brings customers to your door — but the way you handle them once they arrive
          determines whether they leave you a five-star review or a complaint. Professional,
          efficient job management directly feeds your review score, which feeds your SEO ranking.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <MessageSquare className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Quotes That Win Jobs</h4>
                <p className="text-white text-sm leading-relaxed">
                  A professional, itemised quote sent within the hour of an enquiry dramatically
                  improves your conversion rate. Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to send branded quotes from your phone in under two minutes.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificates That Build Trust</h4>
                <p className="text-white text-sm leading-relaxed">
                  Completing and issuing{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">EICRs</SEOInternalLink> and other
                  certificates professionally on site — not days later — signals to customers that
                  you are organised and trustworthy. Happy customers leave reviews. Reviews improve
                  your Google ranking.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your electrical business professionally from day one"
          description="Join 1,000+ UK electricians using Elec-Mate for quoting, invoicing, job management, and certification. Professional operations that generate five-star reviews. 7-day free trial."
          icon={Search}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SEOForElectriciansPage() {
  return (
    <GuideTemplate
      title="SEO for Electricians UK | How to Rank on Google as an Electrician"
      description="Complete SEO guide for UK electricians. Google Business Profile optimisation, local citations, on-page SEO, review generation, link building, keyword targeting, and realistic timelines."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={Search}
      heroTitle={
        <>
          SEO for Electricians UK: <span className="text-yellow-400">How to Rank on Google</span>
        </>
      }
      heroSubtitle="A practical guide to SEO for UK electricians — from Google Business Profile optimisation (the single most important thing) to local citations, on-page SEO, review generation, link building, and realistic timelines."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About SEO for Electricians"
      relatedPages={relatedPages}
      ctaHeading="Professional Tools That Generate Five-Star Reviews"
      ctaSubheading="Elec-Mate helps UK electricians quote, invoice, and certify professionally — generating the five-star reviews that fuel your Google ranking. 7-day free trial."
    />
  );
}
