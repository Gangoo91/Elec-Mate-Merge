import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Users,
  ShieldCheck,
  Star,
  PoundSterling,
  Search,
  MessageSquare,
  Briefcase,
  FileCheck2,
  ClipboardCheck,
  Wrench,
  Camera,
  TrendingUp,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/electrical-certificate-types-uk' },
  { label: 'First Customer', href: '/guides/how-to-get-first-electrical-customer' },
];

const tocItems = [
  { id: 'before-you-start', label: 'Checklist Before Trading' },
  { id: 'portfolio', label: 'Building a Portfolio' },
  { id: 'social-proof', label: 'Leveraging Social Proof' },
  { id: 'pricing', label: 'Pricing Your First Jobs' },
  { id: 'lead-platforms', label: 'Checkatrade, MyBuilder and Bark' },
  { id: 'google-business', label: 'Google Business Profile' },
  { id: 'word-of-mouth', label: 'Word of Mouth Strategies' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Before taking on any paying work you need public liability insurance (minimum £2 million), Part P registration with a competent person scheme (NICEIC, NAPIT, ELECSA, or equivalent), and the correct tools and test instruments.',
  'You can build a portfolio without paying customers by photographing work you do for family and friends, documenting your own home improvements, and creating before-and-after galleries for your social media and Google Business Profile.',
  'Pricing too low to win work undermines your business from day one — charge a fair rate that covers your overheads, materials, travel, and a profit margin. Customers who only choose the cheapest quote are rarely good long-term clients.',
  'Lead generation platforms (Checkatrade, MyBuilder, Bark) can deliver immediate enquiries but have ongoing costs — treat them as a short-term launchpad while you build organic referrals and Google visibility.',
  'A well-optimised Google Business Profile with genuine reviews is the single most valuable marketing asset for a local electrician. Start collecting reviews from your very first job.',
];

const faqs = [
  {
    question: 'How much public liability insurance do I need as a self-employed electrician?',
    answer:
      'Most competent person schemes and commercial customers require a minimum of £2 million public liability cover. Many electricians opt for £5 million, and some commercial contracts require £10 million. Public liability insurance covers damage to third-party property and injury to third parties caused by your work. It does not cover your tools or van — you need separate tool insurance and commercial vehicle insurance for those. Professional indemnity insurance is also worth considering as it covers you if a customer claims financial loss due to your advice or design. Expect to pay £200 to £500 per year for a comprehensive self-employed electrician insurance package.',
  },
  {
    question: 'Do I need to register with a competent person scheme before I can do electrical work?',
    answer:
      'In England and Wales, domestic electrical work that falls under Part P of the Building Regulations must either be carried out by an electrician registered with a competent person scheme (CPS) or be notified to the local authority building control. If you are not registered with a CPS, you must notify building control before starting notifiable work and pay a fee (typically £250 to £400 per job), and building control will inspect the work. This is impractical for a business — registration with NICEIC, NAPIT, ELECSA, or a similar scheme allows you to self-certify your work and issue certificates directly. Annual registration costs range from £300 to £600 depending on the scheme.',
  },
  {
    question: 'How do I price my first electrical jobs when I have no experience quoting?',
    answer:
      'Start by calculating your minimum daily rate. Add up your annual fixed costs (insurance, registration fees, van costs, tool maintenance, accountancy, phone, clothing) and divide by the number of billable days you expect to work (typically 220 to 230 per year). This gives your daily overhead. Add the day rate you want to earn (research local rates — typically £180 to £280 per day for a qualified electrician) and you have your minimum daily charge-out rate. For individual jobs, estimate the time required, add materials with a markup (15% to 25% is standard), and add a contingency (10% for straightforward jobs, 20% for unknowns). Never quote without visiting the site first — photographs miss hidden problems.',
  },
  {
    question: 'Is Checkatrade worth it for a new electrician?',
    answer:
      'Checkatrade can deliver a steady stream of enquiries for a new business, but it comes at a cost. Membership fees start at around £60 to £120 per month depending on your area, and you may need to pay for additional lead credits on top. The vetting process (which checks your qualifications, insurance, and references) adds credibility. The main advantage is immediate visibility to homeowners searching for electricians in your area. The main disadvantage is price competition — many Checkatrade customers are comparing multiple quotes and price is a significant factor. It works best as a launchpad to get your first 10 to 20 reviews, after which your Google Business Profile and word-of-mouth referrals should become your primary lead sources.',
  },
  {
    question: 'How do I get Google reviews when I am just starting out?',
    answer:
      'Set up your Google Business Profile before your first paying job. After every job — even small ones — send the customer a direct link to leave a Google review. The easiest method is to find your review link in Google Business Profile Manager, shorten it, and save it as a template message on your phone. Send it by text message within an hour of completing the job while the experience is fresh. Be specific: "Hi [name], thanks for choosing me for your consumer unit upgrade today. If you were happy with the work, I would really appreciate a Google review — it helps other customers find me. Here is the link: [link]." Most customers are happy to leave a review if you ask directly and make it easy. Never offer incentives for reviews — it violates Google policy and undermines trust.',
  },
  {
    question: 'Should I specialise or offer general electrical services when starting out?',
    answer:
      'When you are starting out, take a broad range of domestic work to build experience, cash flow, and reviews. Consumer unit upgrades, additional sockets and lighting, fault finding, EICRs, and small rewires are the bread and butter of a self-employed domestic electrician. As your reputation grows, you can choose to specialise in higher-value work such as EV charger installation, battery storage, smart home systems, or commercial fit-outs. Specialisation commands higher rates and attracts customers who are less price-sensitive. The ideal progression is: general domestic work for your first 6 to 12 months, then gradually shift towards one or two specialisms that you enjoy and that are in demand in your area.',
  },
  {
    question: 'How long does it take to build a sustainable electrician business?',
    answer:
      'Most self-employed electricians find that it takes 6 to 18 months to reach a point where they have consistent work without relying on lead generation platforms. The first 3 months are the hardest — you are building your reputation from zero. By 6 months, if you have been collecting reviews and delivering good work, referrals start to come in. By 12 months, a well-run business typically has a waiting list of 1 to 2 weeks. The key factors that accelerate growth are: answering your phone promptly (or returning calls within 30 minutes), turning up when you say you will, doing clean work, issuing certificates on the same day, and asking every customer for a review. These basics are where most competitors fall short.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/compare/checkatrade-vs-mybuilder-vs-bark',
    title: 'Checkatrade vs MyBuilder vs Bark',
    description:
      'Detailed comparison of lead generation platforms for electricians — costs, lead quality, and which suits your business.',
    icon: Search,
    category: 'Comparison',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Price jobs accurately and send professional PDF quotes from your phone. Build customer confidence from your first quote.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue professional Electrical Installation Certificates on site. Same-day certification builds your reputation.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/mileage-claims-electricians',
    title: 'Mileage Claims for Electricians',
    description:
      'Claim back travel costs from HMRC and keep more of your earnings. Essential knowledge for self-employed sparks.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/guides/hiring-first-employee-electrician',
    title: 'Hiring Your First Employee',
    description:
      'When your workload outgrows you — PAYE, pensions, apprentices, and the true cost of employment.',
    icon: Users,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-van-setup-guide',
    title: 'Electrician Van Setup Guide',
    description:
      'Organise your van for maximum efficiency on site. Racking, tool storage, cable drums, and security.',
    icon: Wrench,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'before-you-start',
    heading: 'Checklist Before You Start Trading',
    content: (
      <>
        <p>
          Before you chase your first customer, make sure the foundations are in place. Missing any
          of these can cost you far more than a lost job — it can end your business before it starts.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Public liability insurance</strong> — minimum £2 million, preferably £5
                million. This is non-negotiable. Most competent person schemes require it as a
                condition of membership, and any commercial customer will ask for your certificate
                of insurance before you set foot on site. Providers such as Hiscox, Simply Business,
                and Rhino Trade Insurance offer policies from around £15 per month.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person scheme registration</strong> — NICEIC, NAPIT, ELECSA, or
                equivalent. This allows you to self-certify your own electrical work under Part P of
                the Building Regulations in England and Wales. Without it, you must notify building
                control for every notifiable job — impractical and expensive.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Calibrated test instruments</strong> — a multifunction tester (Megger MFT,
                Fluke 1664, or equivalent), a socket tester, a voltage indicator (GS38 compliant),
                and a proving unit. Your test instruments must be calibrated annually — keep the
                calibration certificates. You cannot issue valid test results without calibrated
                instruments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>HMRC registration</strong> — register as self-employed with HMRC within 3
                months of starting your business. You will need to file a Self Assessment tax return
                each year. If your turnover exceeds £90,000 (2026/27 threshold) you must also
                register for VAT. Consider appointing an accountant who specialises in
                tradespeople — the cost (typically £600 to £1,200 per year) is easily offset by the
                tax savings they find.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial vehicle insurance</strong> — your personal car insurance does not
                cover you when driving to jobs. You need a commercial vehicle policy (or hire and
                reward if you carry materials). Tool theft from vans is common — add tool insurance
                with a sensible limit (£3,000 to £10,000 depending on your kit).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Business bank account</strong> — keep your business and personal finances
                separate from day one. It makes bookkeeping simpler, looks more professional, and
                your accountant will thank you. Most business accounts are free for the first year.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Once these are in place, you are legally and professionally ready to trade. Everything
          else — branding, website, social media — is secondary to these essentials.
        </p>
      </>
    ),
  },
  {
    id: 'portfolio',
    heading: 'Building a Portfolio Without Customers',
    content: (
      <>
        <p>
          The catch-22 of a new business: customers want to see your previous work, but you do not
          have any customers yet. Here is how to solve it.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Friends and Family</h3>
            <p className="text-white text-sm leading-relaxed">
              Offer to do work for friends and family at cost (materials only) or at a reduced rate
              in exchange for permission to photograph the work and use it in your portfolio. A
              consumer unit upgrade, a new lighting circuit, or a garden room supply — these are
              real jobs that demonstrate real skills. Take before, during, and after photos. Get a
              written testimonial. This is your first portfolio.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Your Own Property</h3>
            <p className="text-white text-sm leading-relaxed">
              If you own or rent a property, photograph any electrical work you do on it. A board
              change, a rewire of a room, new downlights, an EV charger installation — all of this
              is portfolio material. Even if you rent, small improvements like replacing a consumer
              unit (with landlord permission) demonstrate your capabilities and give you content for
              social media.
            </p>
          </div>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Charity and Community Work</h3>
            <p className="text-white text-sm leading-relaxed">
              Local community centres, churches, and charities often need electrical work and have
              limited budgets. Offering your time at cost builds goodwill, gives you real-world
              experience on varied installations, and generates word-of-mouth referrals from people
              who see your work. It also looks excellent on your Google Business Profile.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Photography Quality Matters</h3>
            <p className="text-white text-sm leading-relaxed">
              Clean, well-lit photos of neat cabling, labelled boards, and tidy installations
              sell your work better than any advert. Use your phone camera — modern phones take
              excellent photos. Clean the work area before photographing. Take close-ups of
              trunking runs, cable management, and labelled consumer units. Before-and-after
              comparisons are particularly effective on social media.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'social-proof',
    heading: 'Leveraging Social Proof from Day One',
    content: (
      <>
        <p>
          Social proof — reviews, testimonials, and visible evidence of your work — is the most
          powerful marketing tool for a local electrician. Start collecting it from your very first
          job.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Google reviews</strong> — ask every customer for a Google review within an
                hour of completing the job. Send a direct link by text message. Make it as easy as
                one tap. Five genuine 5-star Google reviews will do more for your business than any
                paid advertising. Respond to every review — it shows you care.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Social media posts</strong> — post photos of completed work on Facebook and
                Instagram. Tag the location. Use relevant hashtags (#electrician #yourtownname
                #consumerunitupgrade). Homeowners searching for electricians in your area will find
                these posts. Consistency matters more than perfection — one post per week is enough.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Professional certificates</strong> — issue a proper Electrical Installation
                Certificate or Minor Works Certificate for every job that requires one. A
                professional-looking certificate with your business details, scheme logo, and clear
                test results builds trust and demonstrates competence. It is also a legal
                requirement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Star className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Branded workwear and van</strong> — you do not need a full vehicle wrap on
                day one, but magnetic signs with your business name, phone number, and "Part P
                Registered" are cheap (£50 to £100) and make you look established. Clean, branded
                workwear has the same effect. First impressions matter when you knock on a
                customer's door.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'pricing',
    heading: 'Pricing Your First Jobs',
    content: (
      <>
        <p>
          Pricing is where most new electricians go wrong. The temptation is to quote low to win
          work. Resist it. Cheap pricing attracts problem customers, kills your margins, and makes
          it impossible to grow.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">How to Calculate Your Rate</h3>
          <div className="space-y-3 text-white text-sm leading-relaxed">
            <p>
              <strong>Step 1: Annual fixed costs.</strong> Add up insurance (£400), scheme
              registration (£500), van costs including fuel, insurance, and maintenance (£5,000),
              tool maintenance and calibration (£500), accountancy (£800), phone and software (£600),
              clothing and PPE (£300). Total: approximately £8,100 per year.
            </p>
            <p>
              <strong>Step 2: Billable days.</strong> Assume 230 working days minus 25 days holiday,
              5 days training, and 10 days for admin, quoting, and non-billable work. That leaves
              approximately 190 billable days.
            </p>
            <p>
              <strong>Step 3: Daily overhead.</strong> £8,100 divided by 190 = £42.60 per day just
              to cover your costs before you earn a penny.
            </p>
            <p>
              <strong>Step 4: Add your day rate.</strong> A qualified electrician in the UK
              typically charges £200 to £300 per day depending on location and specialism. Add this
              to your daily overhead: £42.60 + £250 = £292.60 per day minimum.
            </p>
            <p>
              <strong>Step 5: Materials markup.</strong> Add a 15% to 25% markup on materials to
              cover your time sourcing, collecting, and carrying them. This is standard practice
              across all trades.
            </p>
          </div>
        </div>
        <p>
          For individual jobs, estimate the hours, multiply by your hourly rate, add materials with
          markup, and add 10% contingency. Always quote after a site visit — never quote from
          photographs alone. Use a{' '}
          <SEOInternalLink href="/tools/electrical-quoting-app">
            professional quoting app
          </SEOInternalLink>{' '}
          to produce itemised PDF quotes that show the customer exactly what they are paying for.
        </p>
      </>
    ),
  },
  {
    id: 'lead-platforms',
    heading: 'Checkatrade, MyBuilder, and Bark: Pros and Cons',
    content: (
      <>
        <p>
          Lead generation platforms can deliver immediate enquiries when you have zero online
          presence. But they are a means to an end, not a long-term strategy.
        </p>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Checkatrade</h3>
            <p className="text-white text-sm leading-relaxed">
              <strong>Cost:</strong> £60 to £120/month plus lead fees in some categories.{' '}
              <strong>Pros:</strong> Strong brand recognition, vetting process adds credibility,
              good review system.{' '}
              <strong>Cons:</strong> Monthly commitment regardless of lead quality, customers often
              comparing 3+ quotes on price alone. Best for building initial reviews and credibility.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">MyBuilder</h3>
            <p className="text-white text-sm leading-relaxed">
              <strong>Cost:</strong> Pay per lead (typically £5 to £30 per expression of interest).{' '}
              <strong>Pros:</strong> Only pay when you choose to respond, lower ongoing costs,
              customers post detailed job descriptions.{' '}
              <strong>Cons:</strong> Lead quality varies, you are competing with other tradespeople
              responding to the same job. Best for cherry-picking jobs that suit your skills.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Bark</h3>
            <p className="text-white text-sm leading-relaxed">
              <strong>Cost:</strong> Credit-based system, typically £5 to £20 per lead.{' '}
              <strong>Pros:</strong> Wide range of job types, quick setup, leads delivered
              automatically.{' '}
              <strong>Cons:</strong> Lead quality is often lower, many enquiries are price shoppers,
              no vetting process means less credibility. Best as a supplement, not a primary source.
            </p>
          </div>
        </div>
        <p>
          Use these platforms strategically: sign up for one or two, collect reviews, build your
          profile, and gradually reduce your dependence as your Google Business Profile and
          word-of-mouth referrals grow. Most successful electricians stop using lead platforms
          entirely within 12 to 18 months.
        </p>
        <p>
          For a detailed comparison, see our{' '}
          <SEOInternalLink href="/compare/checkatrade-vs-mybuilder-vs-bark">
            Checkatrade vs MyBuilder vs Bark comparison
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'google-business',
    heading: 'Google Business Profile: Your Most Valuable Asset',
    content: (
      <>
        <p>
          A well-optimised Google Business Profile (formerly Google My Business) is worth more than
          every lead generation platform combined. When a homeowner searches "electrician near me",
          Google shows the Map Pack — three local businesses with their reviews, photos, and contact
          details. Being in that Map Pack is the single most effective way to generate free,
          high-quality leads.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Set up immediately</strong> — create your Google Business Profile before your
                first job. Choose the correct category ("Electrician"), add your service area, phone
                number, and business hours. Google will send a verification postcard or call.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Add photos weekly</strong> — upload photos of completed work, your van, your
                tools, and yourself. Google favours profiles with regular photo uploads. Geo-tagged
                photos (taken on your phone with location services on) are particularly valuable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Collect reviews relentlessly</strong> — the number and recency of your
                Google reviews are the biggest factor in your Map Pack ranking. Ask every customer.
                Aim for at least one new review per week.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Post updates</strong> — Google Business Profile has a "Posts" feature where
                you can share updates, offers, and photos. Use it monthly. It signals to Google that
                your profile is active and maintained.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'word-of-mouth',
    heading: 'Word of Mouth: The Long Game',
    content: (
      <>
        <p>
          Word of mouth remains the highest-converting lead source for local electricians. A
          recommendation from a friend or neighbour carries more weight than any advert. The good
          news: you can actively encourage it.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Leave business cards</strong> — leave two or three business cards with every
                customer. One for them, and extras to pass on. Simple, but effective.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Build relationships with other trades</strong> — plumbers, builders,
                kitchen fitters, and estate agents all need electricians they can recommend. Offer
                the same courtesy back. A network of trusted tradespeople who refer work to each
                other is the most sustainable source of leads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Follow up after completion</strong> — send a text a week after the job:
                "Hi [name], just checking everything is working well after the [job]. Any questions,
                just call." This small gesture generates an outsized amount of goodwill and
                referrals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <MessageSquare className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Join local Facebook groups</strong> — most areas have community Facebook
                groups where people ask for trade recommendations. Being active in these groups
                (helpful, not pushy) builds your local reputation. When someone asks "can anyone
                recommend an electrician?", you want your name to come up from multiple people.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Tools to Launch Your Business',
    content: (
      <>
        <p>
          Getting your first customer is about looking professional, being responsive, and
          delivering quality work with proper documentation. Here is how Elec-Mate helps from day
          one.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Quoting</h4>
                <p className="text-white text-sm leading-relaxed">
                  Send itemised PDF quotes from your phone with the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>
                  . Professional quotes win more jobs and set clear expectations. No more handwritten
                  estimates on the back of a receipt.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Same-Day Certificates</h4>
                <p className="text-white text-sm leading-relaxed">
                  Issue{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificates
                  </SEOInternalLink>
                  {' '}and{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Works Certificates
                  </SEOInternalLink>
                  {' '}on site. Hand the customer a professional PDF certificate before you leave.
                  This alone sets you apart from most competitors.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Camera className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">AI Board Scanner</h4>
                <p className="text-white text-sm leading-relaxed">
                  Scan consumer units with your phone camera and auto-populate schedules of circuits.
                  Save time on every job and reduce errors. Your test results are stored securely
                  and searchable.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Start your electrical business with professional tools"
          description="Join 430+ UK electricians using Elec-Mate for quoting, certification, and job management. Look professional from day one. 7-day free trial."
          icon={Briefcase}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function FirstElectricalCustomerPage() {
  return (
    <GuideTemplate
      title="How to Get Your First Electrical Customer | New Business"
      description="Practical guide for new self-employed electricians on getting your first customer. Insurance, registration, pricing, Checkatrade vs MyBuilder, Google Business Profile, and word of mouth strategies."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={Briefcase}
      heroTitle={
        <>
          How to Get Your First Electrical Customer:{' '}
          <span className="text-yellow-400">A Practical Guide for New Businesses</span>
        </>
      }
      heroSubtitle="You have the qualifications, the tools, and the ambition. Now you need customers. This guide covers everything from pre-trading essentials to building a sustainable pipeline of work through lead platforms, Google, and word of mouth."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Starting an Electrical Business"
      relatedPages={relatedPages}
      ctaHeading="Launch Your Electrical Business with Professional Tools"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for quoting, certification, and business management. Look established from day one. 7-day free trial, cancel anytime."
    />
  );
}
