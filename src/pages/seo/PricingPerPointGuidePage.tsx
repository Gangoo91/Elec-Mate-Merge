import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Calculator,
  PoundSterling,
  ClipboardCheck,
  FileCheck2,
  MapPin,
  Briefcase,
  Target,
  BarChart3,
  Wrench,
  Home,
  Building2,
  Lightbulb,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/how-to-get-first-electrical-customer' },
  { label: 'Pricing Per Point', href: '/guides/pricing-electrical-work-per-point' },
];

const tocItems = [
  { id: 'overview', label: 'What Is Per-Point Pricing?' },
  { id: 'what-is-a-point', label: 'What Counts as a Point' },
  { id: 'rates-by-region', label: 'Per-Point Rates by Region' },
  { id: 'materials-or-labour', label: 'Including Materials vs Labour Only' },
  { id: 'when-to-use', label: 'When Per-Point Pricing Works' },
  { id: 'when-not-to-use', label: 'When NOT to Use Per-Point Pricing' },
  { id: 'adjustments', label: 'Adjusting Your Per-Point Rate' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A "point" is a single electrical accessory position: one socket outlet, one light fitting, one switch, one FCU, or one data point. A double socket is still one point. A two-gang light switch controlling two circuits is one point.',
  'Typical per-point rates in 2026 range from £80 to £150 depending on region, property type (new build vs existing), and whether materials are included or labour only.',
  'Per-point rates that include materials cover standard accessories (back box, cable, front plate) but NOT the consumer unit, specialist fittings, long cable runs, or making good beyond basic filling.',
  'Labour-only per-point rates (common on new builds where the main contractor supplies materials) are typically 40% to 50% lower than supply-and-fix rates.',
  'Per-point pricing is fast and effective for domestic work but breaks down on commercial jobs, complex routing, or specialist installations where the labour per point varies significantly.',
];

const faqs = [
  {
    question: 'What counts as one electrical point?',
    answer:
      'One point is one accessory position. A single socket is one point. A double socket is also one point — it is one accessory in one back box. A one-gang light switch is one point. A two-gang light switch is one point. A ceiling rose or light fitting is one point. An FCU (fused connection unit) is one point. A cooker outlet is one point. A data point (Cat6 socket) is one point. An isolator switch is one point. The key principle: one back box position = one point, regardless of the number of gangs.',
  },
  {
    question: 'Does a per-point rate include the consumer unit?',
    answer:
      'No. The consumer unit (or distribution board) is always priced separately because the cost varies enormously depending on the specification. A basic 6-way split-load board costs £80 to £150 in materials, while a fully populated RCBO board costs £300 to £600+. The consumer unit is a separate line item on your quote, typically £450 to £850 supply-and-fit for domestic, depending on specification and region.',
  },
  {
    question: 'How do I price a point in a loft conversion or extension?',
    answer:
      'Loft conversions and extensions during first fix (before plaster) are typically priced at standard new-build rates because access is good and there are no existing finishes to protect. If you are working after plaster — for example, adding points to a completed loft conversion — price 10% to 20% above your standard existing-property rate to account for the extra care needed and the difficulty of cable routing in finished spaces.',
  },
  {
    question: 'Should I charge more for outdoor points?',
    answer:
      'Yes. Outdoor points (external sockets, security lights, garden lighting) require IP-rated accessories, SWA or armoured cable in most cases, and often involve groundwork or surface-mounted conduit. Price outdoor points at 1.5x to 2x your standard indoor rate, or price them individually based on the specific run and specification.',
  },
  {
    question: 'What is the difference between supply-and-fix and labour-only rates?',
    answer:
      'Supply-and-fix means you provide all materials and labour — the customer pays one price and you source everything. Labour-only means the customer (or main contractor) provides the materials and you provide the labour only. Labour-only rates are typically 40% to 50% lower than supply-and-fix rates. Labour-only is common on new builds where the main contractor buys materials in bulk. For domestic customers, supply-and-fix is standard — you control the materials quality and carry responsibility for the complete installation.',
  },
  {
    question: 'How do I handle extra points added after the quote?',
    answer:
      'Agree a per-point rate for additional points in your original quote. For example: "Additional points added during the works will be charged at £120 per point." This is fair to both parties — the customer knows the cost upfront, and you are not doing extra work for free. Always confirm additional points in writing (a text message or email is sufficient) before installing them.',
  },
  {
    question: 'Are per-point rates going up in 2026?',
    answer:
      'Yes. Per-point rates have increased by approximately 8% to 12% since 2024, driven by rising material costs (particularly copper cable), higher van and fuel costs, and increased insurance premiums. The biggest factor is labour — the shortage of qualified electricians continues to push rates upward. Review your per-point rates at least twice a year and adjust for material price changes and your own cost increases.',
  },
  {
    question: 'Can I use per-point pricing for commercial work?',
    answer:
      'Per-point pricing can work for simple commercial jobs (small office fit-outs, shop refurbishments) where the points are standard. For anything involving containment systems, three-phase supplies, specialist lighting, fire alarm systems, or complex coordination with other trades, use a detailed labour-and-material estimate. The labour per point on commercial work varies too much to make a flat per-point rate reliable.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-estimating-guide',
    title: 'Electrical Estimating Guide',
    description:
      'Complete estimating guide — labour rates, material markup, contingency, and common mistakes.',
    icon: Calculator,
    category: 'Guide',
  },
  {
    href: '/guides/cash-flow-management-electricians',
    title: 'Cash Flow Management',
    description:
      'Invoicing terms, deposit strategy, and staged payments for electricians.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Create professional PDF quotes with per-point pricing built in.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/guides/finding-commercial-electrical-work',
    title: 'Finding Commercial Work',
    description:
      'Tender websites, networking, and frameworks for commercial electrical contracts.',
    icon: Building2,
    category: 'Guide',
  },
  {
    href: '/guides/how-to-get-first-electrical-customer',
    title: 'Getting Your First Customer',
    description:
      'Starting your electrical business — pricing, marketing, and finding work.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete electrical certificates on site with professional PDF output.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'What Is Per-Point Pricing?',
    content: (
      <>
        <p>
          Per-point pricing is the most widely used method for estimating domestic electrical
          work in the UK. Instead of calculating every metre of cable, every clip, and every
          hour of labour separately, you assign a fixed price to each electrical "point" —
          and multiply by the number of points on the job.
        </p>
        <p>
          It is fast, simple, and accurate enough for standard domestic work. Walk the property,
          count the points, multiply by your rate, add the consumer unit and any extras, and
          you have a quote. Most experienced electricians can price a full rewire in 20 to 30
          minutes using per-point pricing.
        </p>
        <p>
          The rate per point varies by region, property type, and whether you are supplying
          materials or providing labour only. This guide breaks down all of those variables so
          you can set a rate that is competitive in your area and profitable for your business.
        </p>
      </>
    ),
  },
  {
    id: 'what-is-a-point',
    heading: 'What Counts as a Point — And What Does Not',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
            <Target className="w-4 h-4 text-yellow-400" /> Standard Points (One Point Each)
          </h4>
          <div className="grid gap-2 sm:grid-cols-2 text-white text-sm">
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                Single or double socket outlet
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                One-gang or two-gang light switch
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                Ceiling rose or light fitting
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                Fused connection unit (FCU)
              </li>
            </ul>
            <ul className="space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                Cooker outlet plate
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                Isolator switch
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                Data point (Cat6 socket)
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                Shaver socket / towel rail outlet
              </li>
            </ul>
          </div>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h4 className="font-bold text-white mb-4">NOT Included in Per-Point Pricing (Price Separately)</h4>
          <ul className="space-y-2 text-white text-sm">
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Consumer unit / distribution board
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Smoke and heat detectors (to BS 5839-6)
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              EV charger installation
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Underfloor heating
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              External lighting and SWA cable runs
            </li>
            <li className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-yellow-400 shrink-0" />
              Making good (plastering, decorating) beyond basic chase filling
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rates-by-region',
    heading: 'Per-Point Rates by Region (2026)',
    content: (
      <>
        <p>
          Per-point rates vary significantly across the UK. The figures below are for
          supply-and-fix (you provide all materials and labour) on standard domestic work.
          These are market averages — your rate should reflect your experience, overheads,
          and local competition.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-3 text-white text-sm">
            <div className="grid grid-cols-3 gap-4 font-bold border-b border-white/10 pb-3">
              <span>Region</span>
              <span>New Build</span>
              <span>Existing Property</span>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
              <span>London</span>
              <strong className="text-yellow-400">£110 to £140</strong>
              <strong className="text-yellow-400">£130 to £160</strong>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
              <span>South East</span>
              <strong className="text-yellow-400">£100 to £130</strong>
              <strong className="text-yellow-400">£120 to £150</strong>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
              <span>South West</span>
              <strong className="text-yellow-400">£90 to £115</strong>
              <strong className="text-yellow-400">£105 to £135</strong>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
              <span>Midlands</span>
              <strong className="text-yellow-400">£85 to £110</strong>
              <strong className="text-yellow-400">£100 to £130</strong>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
              <span>North West</span>
              <strong className="text-yellow-400">£85 to £105</strong>
              <strong className="text-yellow-400">£95 to £125</strong>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
              <span>North East</span>
              <strong className="text-yellow-400">£80 to £100</strong>
              <strong className="text-yellow-400">£90 to £120</strong>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
              <span>Scotland</span>
              <strong className="text-yellow-400">£80 to £105</strong>
              <strong className="text-yellow-400">£95 to £125</strong>
            </div>
            <div className="grid grid-cols-3 gap-4 border-b border-white/10 pb-2">
              <span>Wales</span>
              <strong className="text-yellow-400">£80 to £100</strong>
              <strong className="text-yellow-400">£90 to £120</strong>
            </div>
            <div className="grid grid-cols-3 gap-4 pb-2">
              <span>Northern Ireland</span>
              <strong className="text-yellow-400">£75 to £95</strong>
              <strong className="text-yellow-400">£85 to £115</strong>
            </div>
          </div>
        </div>
        <p>
          <strong>Existing property rates are higher</strong> because the work involves
          lifting floorboards, chasing walls, working around existing finishes, and dealing
          with unknown conditions. New build first fix is faster — open walls, easy access,
          no existing services to work around.
        </p>
      </>
    ),
  },
  {
    id: 'materials-or-labour',
    heading: 'Supply-and-Fix vs Labour-Only Rates',
    content: (
      <>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-green-400" /> Supply and Fix
            </h3>
            <p className="text-white text-sm leading-relaxed">
              You provide all materials and labour. The per-point rate includes standard cable
              (typically 2.5mm twin and earth for power, 1.0mm or 1.5mm for lighting), back
              boxes, front plates, clips, and fixings. You control the material quality and
              carry full responsibility for the installation. This is the standard for domestic
              work.
            </p>
            <p className="text-white text-sm leading-relaxed mt-2">
              <strong>Typical rate: £80 to £150 per point</strong> (varies by region)
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <Wrench className="w-5 h-5 text-blue-400" /> Labour Only
            </h3>
            <p className="text-white text-sm leading-relaxed">
              The main contractor or customer provides all materials. You provide labour,
              tools, and testing equipment only. Common on new-build sites where the developer
              buys materials in bulk. You have less control over material quality — inspect
              everything before installing and refuse to install non-compliant materials.
            </p>
            <p className="text-white text-sm leading-relaxed mt-2">
              <strong>Typical rate: £40 to £75 per point</strong> (40% to 50% of supply-and-fix)
            </p>
          </div>
        </div>
        <p>
          <strong>Important:</strong> If working labour-only, ensure your quote states clearly
          that you are not responsible for the suitability of customer-supplied materials. You
          still carry responsibility for the quality of the installation itself, but not for a
          substandard consumer unit or cable that the customer sourced.
        </p>
      </>
    ),
  },
  {
    id: 'when-to-use',
    heading: 'When Per-Point Pricing Works Best',
    content: (
      <>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full domestic rewires</strong> — count the points, multiply by your rate,
                add the consumer unit and extras. Fast, accurate, easy for the customer to
                understand.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Extensions and loft conversions</strong> — typically 8 to 20 points.
                Per-point pricing gives a quick, competitive quote.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>New-build domestic plots</strong> — the specification is defined by the
                architect. Count the points on the drawing, apply your rate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional sockets and lights</strong> — quick add-on work. "One new
                double socket is £120" is clear and instant.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'when-not-to-use',
    heading: 'When NOT to Use Per-Point Pricing',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commercial fit-outs with containment</strong> — the labour for running
                cable tray, trunking, and conduit varies enormously and is not captured in a
                per-point rate.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Industrial installations</strong> — three-phase, motor control, large
                distribution. Price from a detailed schedule of quantities.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Very long cable runs</strong> — if a single point requires a 30m cable
                run (for example, an outbuilding supply), a standard per-point rate will
                massively undercover the cost. Price these individually.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire alarm and emergency lighting</strong> — specialist systems with
                specific design requirements. Price separately using manufacturer data and
                site-specific design.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'adjustments',
    heading: 'Adjusting Your Per-Point Rate',
    content: (
      <>
        <p>
          Your base per-point rate is a starting point — adjust it for specific job conditions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <div className="space-y-3 text-white text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Solid-wall property (chasing required)</span>
              <strong className="text-yellow-400">+15% to +25%</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Listed building (conservation constraints)</span>
              <strong className="text-yellow-400">+25% to +40%</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Property occupied (working around furniture, residents)</span>
              <strong className="text-yellow-400">+10% to +15%</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Multi-storey (3+ floors, restricted access)</span>
              <strong className="text-yellow-400">+10% to +20%</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Premium fittings (customer-specified designer switches)</span>
              <strong className="text-yellow-400">Price materials separately</strong>
            </div>
            <div className="flex justify-between pb-2">
              <span>Bulk work (50+ points, repeat specification)</span>
              <strong className="text-yellow-400">-5% to -10%</strong>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Build Your Per-Point Rate',
    content: (
      <>
        <p>
          Your per-point rate should be reviewed at least twice a year. Material costs
          change, your overheads change, and the market moves. Track your actual costs on
          completed jobs and adjust your rate accordingly.
        </p>
        <SEOAppBridge
          title="Quote with built-in per-point pricing"
          description="Elec-Mate builds per-point pricing into professional PDF quotes. Count the points, set your rate, and send a quote in minutes. 7-day free trial."
          icon={Target}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function PricingPerPointGuidePage() {
  return (
    <GuideTemplate
      title="Pricing Electrical Work Per Point UK 2026 | Rate Guide"
      description="Complete guide to per-point pricing for electricians. What counts as a point, typical rates by region (£80 to £150), supply-and-fix vs labour only, and when to use per-point pricing."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Pricing Guide"
      badgeIcon={Target}
      heroTitle={
        <>
          Pricing Electrical Work Per Point:{' '}
          <span className="text-yellow-400">UK Rates for 2026</span>
        </>
      }
      heroSubtitle="What is a point, what does it include, and how much should you charge? Per-point rates by region, supply-and-fix vs labour only, and when this pricing method works best."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Per-Point Pricing"
      relatedPages={relatedPages}
      ctaHeading="Quote Faster with Per-Point Pricing Built In"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for quoting, certification, and job management. Professional PDF quotes in minutes. 7-day free trial, cancel anytime."
    />
  );
}
