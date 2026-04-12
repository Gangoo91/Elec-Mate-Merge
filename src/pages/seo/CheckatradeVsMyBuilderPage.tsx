import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Search,
  PoundSterling,
  Star,
  ShieldCheck,
  Users,
  FileCheck2,
  Briefcase,
  TrendingUp,
  Scale,
  ThumbsUp,
  ThumbsDown,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/how-to-get-first-electrical-customer' },
  { label: 'Platform Comparison', href: '/compare/checkatrade-vs-mybuilder-vs-bark' },
];

const tocItems = [
  { id: 'overview', label: 'Why Lead Platforms Matter' },
  { id: 'checkatrade', label: 'Checkatrade' },
  { id: 'mybuilder', label: 'MyBuilder' },
  { id: 'bark', label: 'Bark' },
  { id: 'cost-comparison', label: 'Cost Comparison' },
  { id: 'lead-quality', label: 'Lead Quality Compared' },
  { id: 'which-suits-you', label: 'Which Suits Your Business' },
  { id: 'exit-strategy', label: 'Your Exit Strategy' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Checkatrade charges a monthly membership fee (£60 to £120/month) plus optional lead credits, provides vetting that adds credibility, and has the strongest brand recognition among homeowners in the UK.',
  'MyBuilder uses a pay-per-lead model (£5 to £30 per expression of interest) with no monthly commitment, giving you more control over spending but requiring active monitoring to respond quickly.',
  'Bark uses a credit system (typically £5 to £20 per lead) and casts a wide net across trade categories, but lead quality tends to be lower and there is no vetting process for tradespeople.',
  'The true cost of a lead platform customer includes the lead fee, your time quoting, site visits for jobs you do not win, and the opportunity cost of not building your own Google presence.',
  'Every successful electrician we have spoken to treats lead platforms as a launchpad, not a permanent strategy. Build your Google Business Profile and referral network from day one so you can reduce platform spending within 12 months.',
];

const faqs = [
  {
    question: 'How much does Checkatrade cost for electricians in 2026?',
    answer:
      'Checkatrade membership for electricians typically costs between £60 and £120 per month depending on your location and the number of trade categories you list. Some categories also have a pay-per-lead element where you buy credits to respond to specific enquiries. The vetting process is free but requires you to provide proof of qualifications, insurance, and references. There is usually a minimum contract period of 12 months. Total annual cost ranges from £720 to £1,440 for the membership alone, plus any lead credits you purchase. Factor in the time you spend quoting jobs you do not win — this is a real cost that is easy to overlook.',
  },
  {
    question: 'Is MyBuilder or Checkatrade better for a new electrician?',
    answer:
      'For a brand-new business with no reviews and limited budget, MyBuilder is often the better starting point because you only pay when you choose to respond to a lead — there is no monthly fee commitment. You can control your spending tightly and cherry-pick jobs that suit your skills. However, Checkatrade has stronger brand recognition and the vetting badge adds credibility that is valuable when you have no track record. If your budget allows, sign up for both: use Checkatrade for credibility and steady enquiries, and MyBuilder for additional leads you can pick and choose. Drop whichever delivers less value after 6 months.',
  },
  {
    question: 'Why are Bark leads often lower quality?',
    answer:
      'Bark collects enquiries across a very wide range of services — from dog walking to electricians to wedding photographers. The enquiry forms are generic and often lack the detail that platforms like MyBuilder provide. Bark also makes it very easy for homeowners to submit enquiries (sometimes just one or two clicks), which means many leads are casual browsing rather than committed buyers. Additionally, Bark does not vet tradespeople in the way Checkatrade does, so the platform attracts both serious professionals and hobbyists, which can lower the overall perception of quality. That said, some electricians report good results from Bark in certain areas — it depends on local competition and how quickly you respond.',
  },
  {
    question: 'How many leads should I expect from each platform per month?',
    answer:
      'This varies enormously by location, time of year, and the type of work you offer. As a rough guide: Checkatrade typically delivers 10 to 30 enquiries per month for an electrician in a populated area. MyBuilder might deliver 5 to 15 suitable job postings per month that you choose to respond to. Bark typically delivers 10 to 25 leads per month but with a lower conversion rate. The conversion rate from enquiry to paid job is typically 20% to 35% for Checkatrade, 15% to 30% for MyBuilder, and 10% to 20% for Bark. These numbers improve significantly as you build reviews on each platform.',
  },
  {
    question: 'Can I use multiple lead platforms at the same time?',
    answer:
      'Yes, and many new electricians do. There is no exclusivity requirement on any platform. The practical challenge is managing your time — responding quickly to leads is essential on all platforms (the first responder often wins the job), and quoting multiple leads per day across multiple platforms can eat into your productive working time. A common approach is to start with two platforms, track your cost per acquired customer on each, and drop the weaker performer after 3 to 6 months. Always prioritise building your Google Business Profile alongside platform activity.',
  },
  {
    question: 'When should I stop using lead generation platforms?',
    answer:
      'The goal is to reach a point where your Google Business Profile, word-of-mouth referrals, and repeat customers generate enough work to fill your diary. For most electricians, this happens between 6 and 18 months after starting their business. Key indicators that you are ready to reduce platform spending: you have 20+ Google reviews with a 4.8+ average, you are turning down more work than you accept, your diary is consistently booked 1 to 2 weeks in advance, and more than half your new customers come from referrals or Google searches. At that point, the monthly platform fees represent a poor return compared to the free organic leads you are generating.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/how-to-get-first-electrical-customer',
    title: 'Getting Your First Customer',
    description:
      'Complete guide to launching your electrical business — from pre-trading checklist to building a sustainable pipeline.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Send professional PDF quotes from your phone. Win more jobs with itemised, clear pricing.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Issue Electrical Installation Certificates on site — professional documentation that builds your reputation.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/mileage-claims-electricians',
    title: 'Mileage Claims for Electricians',
    description:
      'Claim travel expenses and reduce your tax bill. HMRC rates, record keeping, and what qualifies.',
    icon: TrendingUp,
    category: 'Guide',
  },
  {
    href: '/guides/electrician-van-setup-guide',
    title: 'Electrician Van Setup Guide',
    description:
      'Organise your van for efficiency and security. Racking systems, tool protection, and branding.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/hiring-first-employee-electrician',
    title: 'Hiring Your First Employee',
    description:
      'Ready to grow? PAYE, pensions, apprentices, CIS, and the true cost of an employee.',
    icon: Users,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Lead Generation Platforms Matter for New Electricians',
    content: (
      <>
        <p>
          When you start a new electrical business, you have no Google reviews, no track record, and
          no referral network. Lead generation platforms solve the cold-start problem by connecting
          you with homeowners who are actively looking for an electrician right now.
        </p>
        <p>
          The three major platforms in the UK market are Checkatrade, MyBuilder, and Bark. Each has
          a different pricing model, vetting process, and customer base. Choosing the right one (or
          combination) depends on your budget, your area, and the type of work you want.
        </p>
        <p>
          This comparison is written specifically for electricians, based on real costs and real
          experiences. We have no affiliation with any platform — the goal is to help you make an
          informed decision about where to invest your marketing budget.
        </p>
      </>
    ),
  },
  {
    id: 'checkatrade',
    heading: 'Checkatrade: The Established Name',
    content: (
      <>
        <p>
          Checkatrade is the most recognised lead generation platform in the UK. Founded in 1998, it
          has strong brand awareness among homeowners — many customers specifically search
          "Checkatrade electrician" rather than just "electrician near me".
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-green-400" /> Advantages
              </h4>
              <ul className="space-y-2 text-white text-sm">
                <li>Strong brand recognition drives organic traffic to your profile</li>
                <li>Vetting process (qualifications, insurance, references) adds credibility</li>
                <li>Review system is well-established and trusted by homeowners</li>
                <li>Profile page ranks well in Google searches</li>
                <li>Customer guarantee scheme adds buyer confidence</li>
                <li>Dedicated account manager for member support</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <ThumbsDown className="w-4 h-4 text-red-400" /> Disadvantages
              </h4>
              <ul className="space-y-2 text-white text-sm">
                <li>Monthly fee (£60 to £120) regardless of lead quality or volume</li>
                <li>Minimum 12-month contract in most cases</li>
                <li>Customers often comparing 3+ quotes — price pressure</li>
                <li>Some areas are oversaturated with electricians</li>
                <li>Lead credits can add significant cost on top of membership</li>
                <li>You cannot fully control which enquiries you receive</li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          <strong>Best for:</strong> Electricians who want to build credibility quickly, are willing
          to commit to a monthly fee, and operate in areas where Checkatrade has strong homeowner
          awareness. Particularly effective for domestic work — consumer unit upgrades, rewires,
          additional circuits, and EICRs.
        </p>
      </>
    ),
  },
  {
    id: 'mybuilder',
    heading: 'MyBuilder: Pay Per Lead',
    content: (
      <>
        <p>
          MyBuilder takes a different approach — homeowners post detailed job descriptions, and
          tradespeople pay a fee to express interest. There is no monthly membership. You only spend
          money when you see a job you want.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-green-400" /> Advantages
              </h4>
              <ul className="space-y-2 text-white text-sm">
                <li>No monthly commitment — pay only when you express interest</li>
                <li>Detailed job descriptions help you filter good leads</li>
                <li>You choose which jobs to pursue — full control over spending</li>
                <li>Review system linked to verified completed jobs</li>
                <li>Good for specialised work (job descriptions give detail)</li>
                <li>Lower financial risk for new businesses</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <ThumbsDown className="w-4 h-4 text-red-400" /> Disadvantages
              </h4>
              <ul className="space-y-2 text-white text-sm">
                <li>Must monitor the platform actively — speed of response matters</li>
                <li>No vetting badge — less instant credibility than Checkatrade</li>
                <li>Lead cost can add up if you respond to many without winning</li>
                <li>Fewer leads in rural or less populated areas</li>
                <li>Homeowners may receive up to 3 responses — still competitive</li>
                <li>Platform takes time to learn and optimise</li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          <strong>Best for:</strong> Electricians who want to control their spending, prefer to
          choose which jobs to pursue, and are disciplined about responding quickly. Particularly
          effective for larger jobs (rewires, extensions, new builds) where the job description
          gives enough detail to assess profitability before committing.
        </p>
      </>
    ),
  },
  {
    id: 'bark',
    heading: 'Bark: The Wide Net',
    content: (
      <>
        <p>
          Bark operates across hundreds of service categories — from electricians to personal
          trainers to wedding photographers. It uses a credit system where you purchase credits
          upfront and spend them to contact leads.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-green-400" /> Advantages
              </h4>
              <ul className="space-y-2 text-white text-sm">
                <li>Quick and easy to set up — can start receiving leads same day</li>
                <li>Wide reach across different types of electrical work</li>
                <li>Credit system gives flexibility — buy more when busy, less when quiet</li>
                <li>Auto-response feature saves time on initial contact</li>
                <li>Good geographic coverage including rural areas</li>
                <li>Lower individual lead costs than some competitors</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold text-white mb-3 flex items-center gap-2">
                <ThumbsDown className="w-4 h-4 text-red-400" /> Disadvantages
              </h4>
              <ul className="space-y-2 text-white text-sm">
                <li>No vetting process — anyone can sign up, reducing platform credibility</li>
                <li>Lead quality is often lower — many casual enquiries</li>
                <li>Generic enquiry forms lack the detail of MyBuilder job posts</li>
                <li>Multiple tradespeople contact the same lead — high competition</li>
                <li>Credits expire — use them or lose them</li>
                <li>Aggressive upselling of premium features and credit bundles</li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          <strong>Best for:</strong> Electricians who want supplementary leads alongside another
          platform or their own marketing. Bark works best when you respond instantly (the first
          responder has a significant advantage) and when you are selective about which leads you
          pursue. Not recommended as a sole lead source.
        </p>
      </>
    ),
  },
  {
    id: 'cost-comparison',
    heading: 'Cost Comparison: What You Actually Pay',
    content: (
      <>
        <p>
          The headline costs do not tell the full story. Here is a realistic comparison of what an
          electrician in a medium-sized UK town might spend over 12 months.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4 overflow-x-auto">
          <div className="grid gap-4 sm:grid-cols-3 text-white text-sm">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
              <h4 className="font-bold text-white mb-3">Checkatrade</h4>
              <ul className="space-y-2">
                <li>
                  Monthly fee: £90/month = <strong>£1,080/year</strong>
                </li>
                <li>
                  Lead credits: ~£50/month = <strong>£600/year</strong>
                </li>
                <li>Estimated leads: 180/year</li>
                <li>Win rate: ~25%</li>
                <li>Jobs won: ~45/year</li>
                <li className="font-bold text-yellow-400">Cost per customer: ~£37</li>
              </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
              <h4 className="font-bold text-white mb-3">MyBuilder</h4>
              <ul className="space-y-2">
                <li>Monthly fee: £0</li>
                <li>
                  Lead fees: ~£15/lead x 100 = <strong>£1,500/year</strong>
                </li>
                <li>Estimated leads responded to: 100/year</li>
                <li>Win rate: ~22%</li>
                <li>Jobs won: ~22/year</li>
                <li className="font-bold text-yellow-400">Cost per customer: ~£68</li>
              </ul>
            </div>
            <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
              <h4 className="font-bold text-white mb-3">Bark</h4>
              <ul className="space-y-2">
                <li>Monthly fee: £0</li>
                <li>
                  Credits: ~£10/lead x 150 = <strong>£1,500/year</strong>
                </li>
                <li>Estimated leads: 150/year</li>
                <li>Win rate: ~15%</li>
                <li>Jobs won: ~23/year</li>
                <li className="font-bold text-yellow-400">Cost per customer: ~£65</li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          These are indicative figures — your actual results will depend on your location, response
          speed, quote quality, reviews, and the type of work you target. The key insight is that
          Checkatrade delivers more volume at a lower cost per customer, but requires a monthly
          commitment. MyBuilder and Bark give more spending flexibility but at a higher cost per
          acquired customer.
        </p>
        <p>
          <strong>Hidden costs:</strong> Do not forget to factor in the time you spend responding to
          leads, travelling to site visits for quotes you do not win, and preparing quotes. If you
          spend 30 minutes per lead (response, phone call, site visit, quote) and your time is worth
          £35/hour, each lead costs you an additional £17.50 in time — regardless of which platform
          it comes from.
        </p>
      </>
    ),
  },
  {
    id: 'lead-quality',
    heading: 'Lead Quality: Not All Enquiries Are Equal',
    content: (
      <>
        <p>
          The number of leads matters less than the quality. A high-quality lead is a homeowner who
          has a genuine need, a realistic budget, and is ready to proceed. A low-quality lead is
          someone casually browsing, collecting quotes with no intention of proceeding, or looking
          for the cheapest possible price regardless of quality.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Checkatrade lead quality</strong> — generally good. Homeowners who search
                Checkatrade are actively looking for a tradesperson and are familiar with the review
                and vetting system. They tend to value quality and reliability over the lowest
                price. However, Checkatrade encourages customers to get multiple quotes, so price
                competition exists.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MyBuilder lead quality</strong> — moderate to good. The detailed job
                description format attracts homeowners who have thought about what they need. The
                effort of writing a description filters out the most casual enquiries. However, some
                homeowners post on multiple platforms simultaneously.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Scale className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Bark lead quality</strong> — variable. The low-friction enquiry process
                means more casual leads enter the system. You will encounter more "just getting
                prices" enquiries and more leads who do not respond to your contact. The conversion
                rate reflects this.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'which-suits-you',
    heading: 'Which Platform Suits Your Business?',
    content: (
      <>
        <p>
          There is no single best platform — it depends on where you are in your business journey
          and what type of work you want.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Brand New Business</h3>
            <p className="text-white text-sm leading-relaxed">
              <strong>Recommendation: Checkatrade + MyBuilder.</strong> Use Checkatrade for the
              credibility badge and steady enquiries. Use MyBuilder to cherry-pick higher-value
              jobs. Focus aggressively on collecting Google reviews from every customer on both
              platforms. This combination gives you both volume and flexibility.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Tight Budget</h3>
            <p className="text-white text-sm leading-relaxed">
              <strong>Recommendation: MyBuilder only.</strong> No monthly commitment means you
              control costs precisely. Spend £100 to £200 per month on leads, targeting jobs with
              the best profit potential. Invest the money you save (vs Checkatrade membership) into
              Google Ads for your local area.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Established But Quiet</h3>
            <p className="text-white text-sm leading-relaxed">
              <strong>Recommendation: Checkatrade.</strong> If you already have reviews and
              credentials but hit a quiet patch, Checkatrade delivers the most consistent volume.
              Your existing reviews and qualifications will make your profile stand out immediately.
            </p>
          </div>
          <div className="rounded-2xl bg-purple-500/10 border border-purple-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Specialist Work</h3>
            <p className="text-white text-sm leading-relaxed">
              <strong>Recommendation: MyBuilder.</strong> For specialised work such as EV charger
              installation, battery storage, or commercial fit-outs, MyBuilder's detailed job
              descriptions let you identify the right opportunities. Checkatrade and Bark are better
              suited to general domestic enquiries.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'exit-strategy',
    heading: 'Your Exit Strategy: Moving Beyond Platforms',
    content: (
      <>
        <p>
          The smartest electricians use lead platforms as a launchpad, not a crutch. Every platform
          customer should be converted into a direct relationship — a Google review, a referral
          source, or a repeat customer who contacts you directly next time.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Month 1 to 6:</strong> Platform leads are your primary source. Collect
                Google reviews from every job. Set up and optimise your Google Business Profile.
                Start posting work photos on social media weekly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Month 6 to 12:</strong> Google and referrals should be generating 30% to 50%
                of your enquiries. Evaluate platform ROI — drop the weakest performer. Invest that
                budget in Google Ads or local sponsorship.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Month 12 to 18:</strong> If you have 20+ Google reviews and a strong
                referral network, you should be generating 70%+ of work organically. Consider
                cancelling all platform subscriptions or keeping one as a backup for quiet periods.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The goal is to build a business that generates its own leads. Platforms are a tool to get
          you there — not the destination.
        </p>
        <SEOAppBridge
          title="Win more jobs with professional quotes and certificates"
          description="Elec-Mate helps you convert leads into customers with professional PDF quotes, on-site certification, and AI-powered job management. Stand out from the competition on any platform. 7-day free trial."
          icon={TrendingUp}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CheckatradeVsMyBuilderPage() {
  return (
    <GuideTemplate
      title="Checkatrade vs MyBuilder vs Bark 2026 | Best for Electricians"
      description="Honest comparison of Checkatrade, MyBuilder, and Bark for UK electricians. Costs per lead, lead quality, vetting process, reviews, and which platform suits your electrical business."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Comparison"
      badgeIcon={Scale}
      heroTitle={
        <>
          Checkatrade vs MyBuilder vs Bark:{' '}
          <span className="text-yellow-400">Which Is Best for Electricians in 2026?</span>
        </>
      }
      heroSubtitle="An honest, no-affiliate comparison of the three biggest lead generation platforms for UK electricians. Real costs, real lead quality, and practical advice on which suits your business — whether you are just starting out or looking to fill quiet periods."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Lead Generation Platforms"
      relatedPages={relatedPages}
      ctaHeading="Convert More Leads with Professional Tools"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for quoting, certification, and job management. Professional quotes and same-day certificates help you win jobs from any platform. 7-day free trial, cancel anytime."
    />
  );
}
