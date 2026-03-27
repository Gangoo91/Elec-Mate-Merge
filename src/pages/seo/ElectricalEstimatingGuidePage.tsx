import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Calculator,
  PoundSterling,
  ClipboardCheck,
  FileCheck2,
  Users,
  TrendingUp,
  Briefcase,
  AlertTriangle,
  Wrench,
  BarChart3,
  Percent,
  Target,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Business', href: '/guides/how-to-get-first-electrical-customer' },
  { label: 'Estimating Guide', href: '/guides/electrical-estimating-guide' },
];

const tocItems = [
  { id: 'overview', label: 'Estimating Overview' },
  { id: 'per-point-pricing', label: 'Per-Point Pricing' },
  { id: 'material-markup', label: 'Material Markup Strategy' },
  { id: 'labour-rates', label: 'Calculating Labour Rates' },
  { id: 'contingency', label: 'Contingency and Overheads' },
  { id: 'common-mistakes', label: 'Common Estimating Mistakes' },
  { id: 'pricing-examples', label: 'Worked Pricing Examples' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Per-point pricing (£80 to £150 per point in 2026) is the fastest way to estimate domestic work — but only accurate if you understand what is included in each point and adjust for regional differences.',
  'Material markup of 15% to 25% on top of trade prices is standard practice. This covers your time sourcing, collecting, and storing materials, plus the risk of returns and waste.',
  'Your labour rate must cover more than just wages — it must include employer National Insurance, pension, van costs, insurance, tools, training, and profit. Most sole traders need to charge £45 to £65 per hour (2026 rates) to make a sustainable living.',
  'Always include a contingency of 5% to 15% depending on the job type. Rewires in older properties need higher contingency than new builds because of unknown conditions behind walls.',
  'The most common estimating mistake is underpricing to win work. Winning every job means your prices are too low. A healthy win rate is 30% to 50% of quoted jobs.',
];

const faqs = [
  {
    question: 'What is per-point pricing and how does it work?',
    answer:
      'Per-point pricing means charging a fixed rate for each electrical "point" — a socket, light, switch, or FCU counts as one point. The rate includes labour, standard materials (back box, cable, front plate), first fix and second fix, and testing. It does NOT typically include the consumer unit, specialist fittings, or long cable runs. In 2026, domestic rates range from £80 to £150 per point depending on your region, the property type, and whether it is new build or existing. Per-point pricing is fast for quoting but works best on straightforward domestic jobs. Complex commercial or industrial work should be priced using detailed labour-and-material estimates instead.',
  },
  {
    question: 'What markup should I put on materials?',
    answer:
      'The standard markup on materials for electrical work is 15% to 25% on top of your trade price. This is not "extra profit" — it covers the real cost of sourcing materials: your time researching and ordering, driving to the wholesaler, carrying stock in your van, waste and off-cuts, returns, and the risk of price increases between quoting and purchasing. If you supply specialist or high-value items (lighting, consumer units, EV chargers), consider a lower percentage markup (10% to 15%) as the absolute amount is larger. Always quote materials separately so the customer can see the breakdown. Never let customers supply their own materials on electrical work — you carry liability for the installation and need to know the materials meet BS 7671 requirements.',
  },
  {
    question: 'How do I calculate my hourly labour rate?',
    answer:
      'Start with what you need to earn (your target salary), then add all your business costs: van (lease, fuel, insurance, maintenance — typically £6,000 to £10,000/year), tools and equipment (£1,000 to £3,000/year), public liability and professional indemnity insurance (£500 to £1,200/year), competent person scheme (£300 to £500/year), accountant (£500 to £1,500/year), phone, software, and admin (£1,000 to £2,000/year), training and CPD (£500 to £1,000/year). Add your target profit margin (10% to 20%). Divide the total by your billable hours (typically 1,200 to 1,500 hours/year for a sole trader — NOT 2,080, because you will spend time quoting, travelling, buying materials, and doing admin that you cannot bill for). This typically produces a rate of £45 to £65/hour for a sole trader in 2026.',
  },
  {
    question: 'Should I charge for quoting and estimating?',
    answer:
      'For standard domestic work (socket additions, rewires, consumer unit changes), most electricians provide free quotes. For larger commercial projects or detailed specifications that require a site survey and significant time, it is reasonable to charge a survey fee of £50 to £150 — often deducted from the final bill if the customer proceeds. If you find yourself spending more than 10% of your working time on unpaid quotes, either your conversion rate is too low (review your pricing and presentation) or you need to qualify leads better before visiting site. A good approach is to give a rough price range by phone or message first, then only visit site for customers who are comfortable with the range.',
  },
  {
    question: 'How much contingency should I include in my estimates?',
    answer:
      'Contingency covers unexpected problems that increase the cost of a job. For new build or straightforward additions, 5% is usually sufficient. For rewires in pre-1970s properties, 10% to 15% is prudent because you will encounter asbestos-era materials, unexpected routes blocked by steel, lath and plaster that crumbles, and other issues. For commercial refurbishments, 10% is standard. Never skip contingency to win a job — if something goes wrong and you have no margin, you either lose money or have a difficult conversation with the customer. It is better to include contingency and return any unused portion as a credit (which delights the customer) than to go back asking for more money (which destroys trust).',
  },
  {
    question: 'How do I price a full house rewire?',
    answer:
      'A full rewire should be priced from a detailed schedule, not a flat rate. List every circuit, count every point, note the consumer unit specification, and assess access (will you need to lift floors, chase walls, work in a tight loft?). As a benchmark in 2026: a 3-bed semi-detached rewire typically costs £4,500 to £7,000 depending on region and specification. This assumes 40 to 60 points, a 10-way consumer unit with RCBO protection, smoke detection to BS 5839-6, and making good of chases. Add separately for any specialist work: underfloor heating, structured cabling, smart home, EV charger, or external lighting. Always specify what is and is not included to avoid disputes.',
  },
  {
    question: 'What is the difference between an estimate and a quote?',
    answer:
      'An estimate is an approximate price that can change as the job progresses. A quote (or quotation) is a fixed price that you are contractually bound to honour, provided the scope of work does not change. For most electrical work, you should provide a fixed quote with a clearly defined scope. If there are unknowns (for example, you cannot see behind walls until you start), state assumptions in writing: "This quote assumes cables can be routed through the existing void above the ceiling. If the void is blocked and surface trunking is required, an additional charge of approximately £X will apply." This protects you legally and sets the customer expectation correctly.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/pricing-electrical-work-per-point',
    title: 'Pricing Per Point Guide',
    description:
      'Detailed breakdown of per-point rates by region, what counts as a point, and when to use per-point pricing.',
    icon: Target,
    category: 'Guide',
  },
  {
    href: '/guides/cash-flow-management-electricians',
    title: 'Cash Flow Management',
    description:
      'Invoicing terms, deposit strategy, and chasing debt — keep your business solvent.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/electrical-business-plan-template',
    title: 'Electrical Business Plan',
    description:
      'Financial projections, marketing plan, and growth strategy for electrical businesses.',
    icon: BarChart3,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Create professional PDF quotes with itemised pricing. Built for electricians.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/guides/how-to-get-first-electrical-customer',
    title: 'Getting Your First Customer',
    description:
      'Starting your electrical business — insurance, registration, and finding customers.',
    icon: Briefcase,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete electrical certificates on site. Professional PDFs for your customers.',
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
    heading: 'Estimating Electrical Work: Price It Right or Pay the Price',
    content: (
      <>
        <p>
          Every electrical job you take on either makes you money or costs you money — and the
          difference is almost always decided at the estimating stage, not on site. Get your
          estimate wrong and you are locked into a price that either loses you money or prices
          you out of the job.
        </p>
        <p>
          This guide covers the core estimating methods used by UK electricians in 2026:
          per-point pricing for fast domestic quotes, detailed labour-and-material estimates
          for larger jobs, material markup strategy, how to calculate a sustainable labour rate,
          and the contingency you need to protect your margin.
        </p>
        <p>
          Whether you are a newly qualified sparky pricing your first rewire or an experienced
          contractor reviewing your rates, getting your estimating right is the single biggest
          factor in running a profitable business.
        </p>
      </>
    ),
  },
  {
    id: 'per-point-pricing',
    heading: 'Per-Point Pricing: Fast Estimates for Domestic Work',
    content: (
      <>
        <p>
          Per-point pricing is the most common method for domestic electrical work. One
          "point" is a single socket outlet, light fitting, light switch, fused connection
          unit (FCU), or data point. Each point includes the cable run, back box, front plate,
          accessories, first fix, second fix, and testing.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
            <PoundSterling className="w-4 h-4 text-yellow-400" /> Typical Per-Point Rates (2026)
          </h4>
          <div className="grid gap-4 sm:grid-cols-3 text-white text-sm">
            <div className="rounded-xl bg-blue-500/10 border border-blue-500/20 p-4">
              <h5 className="font-bold text-white mb-2">London & South East</h5>
              <ul className="space-y-1">
                <li>New build: <strong className="text-yellow-400">£100 to £130</strong></li>
                <li>Existing property: <strong className="text-yellow-400">£120 to £150</strong></li>
              </ul>
            </div>
            <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-4">
              <h5 className="font-bold text-white mb-2">Midlands & South West</h5>
              <ul className="space-y-1">
                <li>New build: <strong className="text-yellow-400">£85 to £110</strong></li>
                <li>Existing property: <strong className="text-yellow-400">£100 to £130</strong></li>
              </ul>
            </div>
            <div className="rounded-xl bg-purple-500/10 border border-purple-500/20 p-4">
              <h5 className="font-bold text-white mb-2">North & Scotland</h5>
              <ul className="space-y-1">
                <li>New build: <strong className="text-yellow-400">£80 to £100</strong></li>
                <li>Existing property: <strong className="text-yellow-400">£90 to £120</strong></li>
              </ul>
            </div>
          </div>
        </div>
        <p>
          <strong>What is NOT included in a point:</strong> The consumer unit, distribution
          board, main switch, bonding, earthing, smoke detection (unless specified), external
          supplies, specialist fittings, very long cable runs (over 15m), or making good of
          chases beyond basic filling. These should be priced as additional line items.
        </p>
        <p>
          Per-point pricing works well for standard domestic work — extensions, rewires,
          new builds. For commercial, industrial, or complex domestic work, use a detailed
          labour-and-material estimate instead.
        </p>
      </>
    ),
  },
  {
    id: 'material-markup',
    heading: 'Material Markup: What to Charge and Why',
    content: (
      <>
        <p>
          Marking up materials is not a dodgy practice — it is a standard part of running a
          trade business. You incur real costs sourcing, collecting, transporting, and storing
          materials. The markup compensates for those costs and the risk you carry.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <Percent className="w-5 h-5 text-green-400" /> Standard Materials
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Cable, back boxes, trunking, conduit, clips, fixings, socket fronts, switch
              plates — mark up by <strong>20% to 25%</strong> on your trade price. These are
              low-value, high-handling items. The markup covers your collection trips, waste,
              off-cuts, and van storage.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3 flex items-center gap-2">
              <Percent className="w-5 h-5 text-blue-400" /> High-Value Items
            </h3>
            <p className="text-white text-sm leading-relaxed">
              Consumer units, EV chargers, lighting packages, distribution boards — mark up
              by <strong>10% to 15%</strong>. The absolute margin is higher on these items even
              at a lower percentage. Customers can easily price-check high-value items online,
              so keep the markup reasonable.
            </p>
          </div>
        </div>
        <p>
          <strong>Always itemise materials</strong> on your quotes. Customers appreciate
          transparency, and it protects you if the specification changes. Use your trade
          account prices as your cost base, not retail.
        </p>
      </>
    ),
  },
  {
    id: 'labour-rates',
    heading: 'Calculating Your True Labour Rate',
    content: (
      <>
        <p>
          Most electricians massively underestimate what they need to charge per hour. They
          think "I want to earn £35/hour" and charge £35 — ignoring the fact that £35/hour
          gross does not cover their business costs, unbillable time, holidays, or pension.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2">
            <Calculator className="w-4 h-4 text-yellow-400" /> Labour Rate Calculator (Sole Trader, 2026)
          </h4>
          <div className="space-y-3 text-white text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Target take-home salary</span>
              <strong className="text-yellow-400">£40,000</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Income tax + NI (estimated)</span>
              <strong className="text-yellow-400">£10,500</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Van costs (lease, fuel, insurance, maintenance)</span>
              <strong className="text-yellow-400">£8,000</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Insurance (PL, PI, tools)</span>
              <strong className="text-yellow-400">£1,000</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Competent person scheme + professional body</span>
              <strong className="text-yellow-400">£500</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Tools, equipment, PPE</span>
              <strong className="text-yellow-400">£2,000</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Accountant, software, phone, admin</span>
              <strong className="text-yellow-400">£2,500</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Training and CPD</span>
              <strong className="text-yellow-400">£750</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Pension contribution (5%)</span>
              <strong className="text-yellow-400">£2,000</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2 font-bold">
              <span>Total annual cost</span>
              <strong className="text-yellow-400">£67,250</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Billable hours/year (1,300 realistic)</span>
              <strong className="text-yellow-400">1,300 hours</strong>
            </div>
            <div className="flex justify-between pt-2 text-lg font-bold">
              <span>Required hourly charge-out rate</span>
              <strong className="text-yellow-400">£51.73/hour</strong>
            </div>
          </div>
        </div>
        <p>
          Round up to £52 or £55/hour. That is the minimum you need to charge to hit a £40,000
          take-home. If you want a profit margin on top (to grow the business, replace equipment,
          or build a buffer), add 10% to 20% — taking you to £57 to £66/hour.
        </p>
      </>
    ),
  },
  {
    id: 'contingency',
    heading: 'Contingency and Overheads: The Hidden Costs',
    content: (
      <>
        <p>
          Contingency is a percentage added to your estimate to cover unknowns. Overheads are
          the fixed costs of running your business that must be recovered through every job you
          price.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h4 className="font-bold text-white mb-4">Contingency Guidelines by Job Type</h4>
          <div className="space-y-3 text-white text-sm">
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>New build (known specification)</span>
              <strong className="text-yellow-400">5%</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Modern property extension or addition</span>
              <strong className="text-yellow-400">5% to 8%</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Rewire (post-1970 property)</span>
              <strong className="text-yellow-400">8% to 10%</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Rewire (pre-1970 property)</span>
              <strong className="text-yellow-400">10% to 15%</strong>
            </div>
            <div className="flex justify-between border-b border-white/10 pb-2">
              <span>Commercial refurbishment</span>
              <strong className="text-yellow-400">10%</strong>
            </div>
            <div className="flex justify-between pb-2">
              <span>Listed building or heritage property</span>
              <strong className="text-yellow-400">15% to 20%</strong>
            </div>
          </div>
        </div>
        <p>
          <strong>Overheads</strong> (van, insurance, tools, admin) should already be built
          into your hourly rate. Do not add them as a separate line item on the quote — this
          confuses customers and makes your price look inflated. The customer should see:
          labour, materials, and a total. Your overheads are invisible to them but built into
          your rate.
        </p>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Estimating Mistakes That Cost You Money',
    content: (
      <>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Pricing to Win Instead of Pricing to Profit</h4>
                <p className="text-white text-sm leading-relaxed">
                  If you are winning 80%+ of your quotes, your prices are too low. A healthy
                  conversion rate is 30% to 50%. Being the cheapest means you are subsidising
                  your customers from your own pocket. Price for sustainability, not desperation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Forgetting Unbillable Time</h4>
                <p className="text-white text-sm leading-relaxed">
                  A job that takes 8 hours on site actually costs you 10 to 12 hours when you
                  include travel, material collection, quoting, invoicing, and follow-up. If
                  you only price for on-site time, you are working those extra hours for free.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Not Specifying Exclusions</h4>
                <p className="text-white text-sm leading-relaxed">
                  "Full rewire — £5,000" with no specification leads to disputes. Always list
                  what is included AND what is excluded. Specify the number of points, consumer
                  unit type, whether you are making good chases, and whether decoration is
                  included (it almost never should be).
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quoting from Memory Instead of a Schedule</h4>
                <p className="text-white text-sm leading-relaxed">
                  Always walk the job with a checklist and count every point, circuit, and
                  special requirement. "I can do that for about five grand" is not estimating —
                  it is guessing. Guesses are wrong more often than they are right.
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'pricing-examples',
    heading: 'Worked Pricing Examples',
    content: (
      <>
        <div className="space-y-6 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
            <h4 className="font-bold text-white mb-4">Example 1: Kitchen Rewire (Midlands, 2026)</h4>
            <div className="space-y-2 text-white text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>12 points (6 sockets, 4 lights, 1 extractor, 1 cooker) x £110</span>
                <strong>£1,320</strong>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Consumer unit upgrade (10-way RCBO)</span>
                <strong>£650</strong>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Smoke detector (1x heat in kitchen)</span>
                <strong>£85</strong>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Testing and certification</span>
                <strong>Included</strong>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Subtotal</span>
                <strong>£2,055</strong>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Contingency (8%)</span>
                <strong>£164</strong>
              </div>
              <div className="flex justify-between pt-2 text-lg font-bold">
                <span>Quote price</span>
                <strong className="text-yellow-400">£2,219</strong>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
            <h4 className="font-bold text-white mb-4">Example 2: 3-Bed Semi Rewire (North West, 2026)</h4>
            <div className="space-y-2 text-white text-sm">
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>48 points x £95</span>
                <strong>£4,560</strong>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Consumer unit (12-way dual RCD split board)</span>
                <strong>£550</strong>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Smoke and heat detection (3x smoke, 1x heat)</span>
                <strong>£320</strong>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>External light point (1x)</span>
                <strong>£120</strong>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Subtotal</span>
                <strong>£5,550</strong>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span>Contingency (10% — 1960s build)</span>
                <strong>£555</strong>
              </div>
              <div className="flex justify-between pt-2 text-lg font-bold">
                <span>Quote price</span>
                <strong className="text-yellow-400">£6,105</strong>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Estimate Faster, Quote Smarter',
    content: (
      <>
        <p>
          Good estimating is a skill that improves with every job. Track your actual costs
          against your estimates on every project — this feedback loop is how you get better.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Use a Quoting App</h4>
                <p className="text-white text-sm leading-relaxed">
                  The{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>
                  {' '}builds your per-point rates, material markup, and contingency into
                  professional PDF quotes in minutes.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <BarChart3 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Track Your Win Rate</h4>
                <p className="text-white text-sm leading-relaxed">
                  Log every quote you send and whether you win or lose it. If your win rate is
                  above 50%, raise your prices. If it is below 25%, review your presentation
                  and follow-up process — it may not be price at all.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote faster with built-in pricing tools"
          description="Elec-Mate helps you build professional, itemised quotes in minutes — with per-point pricing, material markup, and instant PDF delivery. 7-day free trial."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalEstimatingGuidePage() {
  return (
    <GuideTemplate
      title="Electrical Estimating Guide UK 2026 | Pricing for Electricians"
      description="Complete guide to estimating electrical work. Per-point pricing rates, material markup, labour rate calculation, contingency, and common mistakes. Practical examples for UK electricians in 2026."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Business Guide"
      badgeIcon={Calculator}
      heroTitle={
        <>
          Electrical Estimating Guide UK 2026:{' '}
          <span className="text-yellow-400">Price Every Job for Profit</span>
        </>
      }
      heroSubtitle="Per-point pricing, material markup, labour rates, contingency, and the common mistakes that cost electricians thousands. Practical, financially accurate guidance for pricing electrical work in 2026."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Estimating"
      relatedPages={relatedPages}
      ctaHeading="Quote Faster, Win More Profitable Work"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for quoting, certification, and job management. Professional PDF quotes with built-in per-point pricing. 7-day free trial, cancel anytime."
    />
  );
}
