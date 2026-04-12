import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Globe,
  Star,
  Smartphone,
  PoundSterling,
  Search,
  Phone,
  ShieldCheck,
  BarChart3,
  Zap,
  Users,
  CheckCircle2,
  TrendingUp,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business Guides', href: '/guides/growing-electrical-business' },
  { label: 'Electrician Website Guide', href: '/electrician-business-website' },
];

const tocItems = [
  { id: 'why-you-need-a-website', label: 'Why You Need a Website' },
  { id: 'trust-signals', label: 'Trust Signals That Win Jobs' },
  { id: 'website-builders-vs-custom', label: 'Website Builders vs Custom' },
  { id: 'seo-basics', label: 'SEO Basics for Electricians' },
  { id: 'mobile-optimisation', label: 'Mobile Optimisation' },
  { id: 'booking-and-call-tracking', label: 'Booking Forms & Call Tracking' },
  { id: 'costs', label: 'Realistic Costs' },
  { id: 'for-electricians', label: 'Managing Jobs from Your Website' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A professional website is the single most important marketing asset for an electrician. Most homeowners search Google before hiring — if you have no website, you lose jobs to competitors before a single conversation.',
  'Trust signals — NICEIC or NAPIT logo, verified Google reviews, Part P registration, and professional certificate examples — dramatically increase enquiry-to-booking conversion rates.',
  'For most sole traders and small electrical businesses, a Wix or Squarespace site (£15–£25/month) is sufficient. WordPress gives more control but requires ongoing maintenance. Fully custom sites cost £1,500–£5,000 and are only justified once you are generating consistent revenue.',
  'Your Google Business Profile is more important than your website for local searches. Optimise it first, then build your site. The two work together.',
  'Call tracking (e.g., CallRail or ResponseTap, from £30/month) tells you which marketing channels generate phone calls — essential data when spending money on Google Ads.',
  "Every page on your website must load in under three seconds on a mobile device. Electricians' customers are almost always searching on their phones in a moment of need.",
];

const faqs = [
  {
    question:
      'Do I really need a website as an electrician, or will my Google Business Profile do?',
    answer:
      'You need both, but for different reasons. Your Google Business Profile handles local map pack searches ("electrician near me") and is often the first thing a customer sees. Your website handles longer-form research, builds trust, and is where customers land from Google Ads. The two work together: a strong website improves your Google Business Profile ranking, and a well-optimised profile drives traffic to your site. Relying on a profile alone means you have no control over your first impression and no way to present your qualifications, reviews, and service areas in detail.',
  },
  {
    question: 'What trust signals matter most on an electrician website?',
    answer:
      'In order of importance: (1) NICEIC, NAPIT, or ELECSA registered logo with your registration number — homeowners increasingly check these are real. (2) Google reviews badge showing your rating and number of reviews — embed a live widget so the count updates automatically. (3) Part P self-certification status explained in plain English — many homeowners do not know what this means; explain why it saves them council notification fees. (4) Public liability insurance confirmation — state your cover level (£2m minimum, £5m preferred). (5) Years trading and approximate number of jobs completed. These five signals, clearly visible on your homepage, will noticeably improve conversion.',
  },
  {
    question:
      'What is the difference between Wix, Squarespace, and WordPress for an electrician website?',
    answer:
      'Wix and Squarespace are drag-and-drop builders requiring no technical knowledge. Wix (£17–£35/month) is more flexible; Squarespace (£15–£25/month) looks more polished out of the box. Both include hosting, security certificates, and basic SEO tools. WordPress.org (self-hosted, £5–£15/month hosting plus domain) gives complete control and the best SEO capabilities but requires more technical knowledge and ongoing maintenance — plugin updates, security patches, and backups. For most electricians starting out, Wix or Squarespace is the right choice. Switch to WordPress when your business is generating enough revenue to justify either paying a developer or investing time in learning it.',
  },
  {
    question: 'How much should an electrician website cost?',
    answer:
      'DIY on Wix or Squarespace: £15–£25/month (plus £10–£15/year for a domain). Freelance web designer building on Wix or Squarespace: £300–£800 one-off plus monthly subscription. WordPress site built by a freelancer: £800–£2,000. Custom-designed and custom-built website: £2,000–£5,000+. For most sole traders and small teams, the £300–£800 option (pay someone to build a Wix site properly) represents the best value. It looks professional, is maintained by the platform, and lets you focus on the electrical work.',
  },
  {
    question: 'What pages does an electrician website need?',
    answer:
      'At minimum: Homepage (who you are, area covered, main services, trust signals, contact), Services page (one section per service: fuse box upgrades, EV charger installation, EICR, rewires, etc.), About page (your qualifications, experience, scheme memberships), Reviews/testimonials page, Contact page with a form, phone number, and service area map. As you grow, add individual pages for each service and each town or area you cover — these location-specific pages are the engine of local SEO.',
  },
  {
    question: 'What keywords should my electrician website target?',
    answer:
      'Start with your core services plus your location: "electrician [town]", "EICR [town]", "fuse box replacement [town]", "EV charger installation [town]". Also target longer phrases your customers actually type: "how much does a new fuse box cost", "do I need an EICR to sell my house", "can an electrician fit an EV charger". These informational queries build trust and bring in organic traffic. Avoid generic terms like "electrician UK" — you cannot compete nationally. Own your local area first.',
  },
  {
    question: 'Do I need call tracking on my electrician website?',
    answer:
      'If you are spending money on Google Ads or any other paid advertising, call tracking is essential — without it you are guessing which campaigns generate enquiries. Call tracking services (CallRail, ResponseTap, or Infinity) assign a unique phone number to each marketing channel. When someone calls, the system logs which page or campaign they came from. This data lets you cut spend on channels that do not work and invest more in those that do. Costs start at around £30/month. If you are not spending on paid ads yet and rely purely on organic and referrals, call tracking is useful but not urgent.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/seo-for-electricians',
    title: 'SEO for Electricians',
    description:
      'How to rank on Google as an electrician — Google Business Profile, local citations, and on-page SEO.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/google-ads-electricians',
    title: 'Google Ads for Electricians',
    description:
      'PPC guide for electrical contractors — Local Services Ads, search ads, and budgets.',
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
    href: '/growing-electrical-business',
    title: 'Growing Your Electrical Business',
    description: 'From sole trader to small team — systems, hiring, and scaling.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Elec-Mate Quoting App',
    description: 'Send professional quotes from your phone in under two minutes.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-you-need-a-website',
    heading: 'Why Every Electrician Needs a Professional Website',
    content: (
      <>
        <p>
          The majority of homeowners and small businesses now search Google before hiring a
          tradesperson. If you have no website — or a poor one — you lose jobs before a single
          conversation happens. A professional website works for you around the clock: it takes
          enquiries while you are on a job, builds trust before you arrive, and gives prospective
          customers a reason to choose you over the unregistered competitor who came up first on
          Checkatrade.
        </p>
        <p>
          Word of mouth remains the most valuable source of work for most electricians, but even
          referred customers Google you before calling. A website that clearly shows your NICEIC
          registration, Google reviews, and the types of work you do converts those referred
          prospects into confirmed bookings. Without one, you are asking people to trust a name they
          found on a piece of paper.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>24/7 enquiry machine</strong> — a contact form or booking widget generates
                enquiries at midnight when you are asleep and on Sundays when you are not answering
                the phone. Many customers prefer to enquire online rather than call.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Google map pack visibility</strong> — having a website linked to your Google
                Business Profile significantly improves your chances of appearing in the local map
                pack (the three businesses shown above organic results). The map pack drives the
                majority of local electrical enquiries.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Price anchor</strong> — a professional website lets you display approximate
                pricing or explain why your service costs more than the cheapest quote. Customers
                who see your NICEIC logo and 50 five-star reviews are far less likely to haggle than
                those who found you with no online presence.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'trust-signals',
    heading: 'Trust Signals That Convert Visitors Into Customers',
    content: (
      <>
        <p>
          Trust signals are the elements on your website that reassure a stranger they are safe
          hiring you. For electricians, where the stakes include fire risk and legal compliance,
          trust signals are particularly important. Get these right and your conversion rate — the
          percentage of visitors who make an enquiry — will be noticeably higher.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scheme membership logos</strong> — display your NICEIC, NAPIT, or ELECSA
                logo prominently with your registration number. Include a note that customers can
                verify your registration on the scheme's website. This is the single most effective
                trust signal for electrical work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Live Google reviews widget</strong> — embed a live widget (available from
                Elfsight or similar providers, from £5/month) that shows your current Google rating
                and number of reviews. A static screenshot looks outdated; a live widget updates
                automatically and looks credible.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P explanation</strong> — explain in plain English that as a registered
                electrician you can self-certify notifiable work, saving the customer the council
                notification fee (typically £200–£400 for a rewire). Most competitors do not explain
                this; those who do win more jobs from informed customers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — state your cover level clearly. £5m
                public liability is the gold standard. Some larger customers (commercial property
                managers, housing associations) will not engage without it.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Real photos of your work</strong> — avoid stock photos. Real photos of your
                van, your completed work (consumer unit upgrades, EV chargers, clean cable runs),
                and ideally yourself build a human connection stock images cannot replicate.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Place your NICEIC logo and review count above the fold on your homepage — visible without
          scrolling. Customers who see these within the first two seconds of landing on your site
          are significantly more likely to stay and enquire.
        </p>
      </>
    ),
  },
  {
    id: 'website-builders-vs-custom',
    heading: 'Website Builders vs Custom — What to Choose',
    content: (
      <>
        <p>
          The choice between a website builder and a custom-built site comes down to budget,
          technical confidence, and where you are in your business journey. Here is an honest
          breakdown of each option.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">Wix (£17–£35/month)</strong>
                <span>
                  Best all-round option for most electricians. Drag-and-drop editor, hundreds of
                  templates, built-in booking widget, and reasonable SEO tools. No technical
                  knowledge required. Customer support available. The main limitation is that you
                  cannot move your Wix site to another host if you outgrow it.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">Squarespace (£15–£25/month)</strong>
                <span>
                  Produces more polished results than Wix with less effort, but is less flexible.
                  Excellent for portfolio-style sites. Good built-in analytics. Less suitable if you
                  need multiple location pages or complex SEO configurations.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">WordPress (£5–£15/month hosting + domain)</strong>
                <span>
                  The best long-term SEO platform and most used website system in the world. Free to
                  use but requires hosting, domain, and ongoing maintenance. Plugins like Yoast SEO,
                  Rank Math, and WPForms give you sophisticated tools. Recommended once you have
                  budget to pay a developer or are willing to invest time learning it.
                </span>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <Globe className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <strong className="block mb-1">Fully Custom (£2,000–£5,000+)</strong>
                <span>
                  A bespoke site designed and built by an agency or specialist developer.
                  Justifiable once you are generating consistent revenue and want to differentiate
                  significantly from competitors. Not the right starting point for most
                  electricians.
                </span>
              </div>
            </li>
          </ul>
        </div>
        <p>
          The most cost-effective approach for most electricians: hire a freelancer on People Per
          Hour or Bark to build a Wix or Squarespace site for £300–£800. You get a professionally
          built site without the ongoing technical burden of WordPress, and without paying agency
          prices.
        </p>
      </>
    ),
  },
  {
    id: 'seo-basics',
    heading: 'SEO Basics for Electrician Websites',
    content: (
      <>
        <p>
          Search engine optimisation (SEO) is the process of making your website appear higher in
          Google search results. For electricians, local SEO — ranking for searches in your specific
          area — is far more important than national rankings. Here are the basics every electrician
          website should implement from day one.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Google Business Profile first</strong> — before spending time on website
                SEO, make sure your Google Business Profile is fully optimised. It drives more local
                enquiries than organic rankings for most electricians. See our{' '}
                <SEOInternalLink href="/seo-for-electricians">full SEO guide</SEOInternalLink> for
                detailed Profile optimisation steps.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Page titles and meta descriptions</strong> — every page on your site should
                have a unique title including your target keyword and location. Example:
                "Electrician in Coventry | NICEIC Registered | [Your Business Name]". The meta
                description (the text shown under your link in Google results) should include your
                phone number and a clear call to action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Location pages</strong> — if you cover multiple towns or areas, create a
                separate page for each one. "Electrician in [Town]" pages, each with 300–500 words
                of genuine content about the area and your services there, dramatically improve
                local rankings. Generic pages with just the town name swapped out do not work —
                Google recognises duplicated thin content.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Service pages</strong> — create individual pages for each main service
                (EICR, consumer unit upgrade, EV charger installation, rewire, solar PV). Each page
                should explain the service, why it matters, what the process involves, and
                approximate costs. These pages rank for specific service searches and pre-qualify
                customers before they contact you.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NAP consistency</strong> — your business Name, Address, and Phone number
                should be identical across your website, Google Business Profile, Checkatrade,
                Yell.com, and every other directory. Inconsistencies confuse Google and reduce your
                local ranking.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'mobile-optimisation',
    heading: 'Mobile Optimisation — Non-Negotiable',
    content: (
      <>
        <p>
          More than 70 per cent of local service searches happen on mobile devices. Homeowners
          searching for an electrician are typically doing so in a moment of need — a tripped
          breaker, a failed socket, a moving-day panic. If your website is slow or difficult to use
          on a phone, they will bounce immediately to the next result.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Page speed under three seconds</strong> — test your site using Google
                PageSpeed Insights (free). Compress all images (use WebP format where possible),
                remove unnecessary plugins, and use a fast hosting provider. A one-second delay in
                page load time reduces conversions by approximately 7 per cent.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Click-to-call phone number</strong> — your phone number must be in the
                header on every page and must be a clickable <code>tel:</code> link so mobile users
                can call with one tap. This single change often produces a measurable increase in
                phone enquiries within days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large touch targets</strong> — buttons and links should be at least 44px
                tall. Nothing frustrates a mobile user more than trying to tap a tiny link and
                hitting the wrong element. Use large, clearly labelled buttons for your primary
                calls to action.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Smartphone className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Core Web Vitals</strong> — Google uses Core Web Vitals (Largest Contentful
                Paint, Cumulative Layout Shift, Interaction to Next Paint) as ranking factors. Wix
                and Squarespace handle most of these automatically. WordPress sites need careful
                optimisation to score well. Check your scores monthly in Google Search Console.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'booking-and-call-tracking',
    heading: 'Booking Forms and Call Tracking',
    content: (
      <>
        <p>
          Every electrician website should make it as easy as possible for a prospective customer to
          take the next step. A well-designed contact form and a clickable phone number are the
          minimum. As your business grows, adding call tracking gives you the data to make smarter
          marketing decisions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Contact form essentials</strong> — keep your form short: name, phone number,
                brief description of the job, and preferred contact time. Every additional field
                reduces completion rates. Avoid CAPTCHA if possible — use honeypot spam protection
                instead, which is invisible to users.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Response time commitment</strong> — state how quickly you respond: "We aim
                to respond within 2 hours on weekdays." Displaying this alongside your form reduces
                drop-off from customers who are worried they will not hear back quickly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Call tracking setup</strong> — services like CallRail (from £30/month) or
                ResponseTap assign a unique phone number to each marketing channel (your website,
                Google Ads, Checkatrade, etc.). When someone calls, you know exactly which channel
                drove the enquiry. Essential if you are spending on paid advertising.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>WhatsApp button</strong> — adding a WhatsApp click-to-chat button (free via
                WhatsApp Business) generates additional enquiries from customers who prefer
                messaging to calling. Particularly effective for younger homeowners and rental
                property enquiries.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Realistic Website Costs for Electricians (2026)',
    content: (
      <>
        <p>
          Here is an honest breakdown of what you should expect to pay at each level. These are UK
          market rates for 2026.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DIY Wix or Squarespace — £180–£350/year</strong>: Platform subscription
                (£15–£25/month) plus domain (£10–£15/year). Zero build cost. Takes 1–2 days of your
                time to build a basic site using a template. Perfectly adequate for a sole trader
                starting out.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Freelancer on Wix/Squarespace — £300–£800 + £180–£350/year</strong>: A
                competent freelancer builds the site for you on a platform you then manage. Good
                value — you get a professional result without the technical burden. Find freelancers
                on People Per Hour, Bark.com, or through local business networks.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>WordPress site — £800–£2,000 + £80–£200/year</strong>: A freelancer or small
                agency builds a WordPress site. More powerful SEO capabilities and more flexibility,
                but you pay for ongoing hosting, maintenance, and updates separately. Right choice
                when you are ready to invest seriously in SEO.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Custom agency site — £2,000–£5,000+</strong>: Bespoke design and build by a
                specialist agency. Justified only when you have consistent revenue, clear
                differentiation, and a strategy that requires more than a standard builder can
                offer.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Do not spend more than your business can afford to lose on a website. Start lean, get your
          Google Business Profile and reviews working first, then reinvest in your website as
          revenue grows.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'Managing Enquiries From Your Website With Elec-Mate',
    content: (
      <>
        <p>
          A website generates enquiries — but you also need a system to manage them professionally.
          Responding to a web enquiry with a professional quote within the hour dramatically
          improves your conversion rate compared to chasing it up two days later.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Quote While You Are Still Talking to Them
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to send a professional, itemised quote from your phone within minutes of an
                  enquiry. Customers who receive a quote quickly are far more likely to proceed —
                  and far less likely to go to a competitor.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Users className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">
                  Customer Records That Follow Every Job
                </h4>
                <p className="text-white text-sm leading-relaxed">
                  Store customer details, job notes, and certificate history in one place. When a
                  customer rings back two years later about their consumer unit, you have the full
                  history at your fingertips — not in a stack of paperwork in the van.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Run your electrical business from your phone"
          description="Elec-Mate gives electricians professional quoting, invoicing, job management, and certification in one app. Join 1,000+ UK electricians. 7-day free trial."
          icon={Globe}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalBusinessWebsitePage() {
  return (
    <GuideTemplate
      title="Electrician Website Guide UK | How to Build & Market Your Website"
      description="Complete guide to building and marketing an electrician website in the UK. Trust signals, website builders vs custom, SEO basics, call tracking, booking forms, and realistic costs from £300 to £2,000."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={Globe}
      heroTitle={
        <>
          Electrician Website Guide UK:{' '}
          <span className="text-yellow-400">Build & Market Your Website</span>
        </>
      }
      heroSubtitle="Everything a UK electrician needs to know about building a website that wins jobs — trust signals, website builders vs custom, SEO basics, mobile optimisation, booking forms, call tracking, and realistic costs for 2026."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrician Websites"
      relatedPages={relatedPages}
      ctaHeading="Win More Jobs With Elec-Mate"
      ctaSubheading="Professional quoting, invoicing, and job management for UK electricians. Join 1,000+ electrical businesses. 7-day free trial, no card required."
    />
  );
}
