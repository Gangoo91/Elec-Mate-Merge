import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  PoundSterling,
  Brain,
  BarChart3,
  ClipboardList,
  MapPin,
  Clock,
  FileText,
  CheckCircle2,
  ChevronRight,
  ArrowDown,
  HelpCircle,
  Receipt,
  TrendingUp,
  Wrench,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PAGE_TITLE = 'AI Cost Engineer | Electrical Job Estimator | Elec-Mate';
const PAGE_DESCRIPTION =
  'Get accurate electrical job cost estimates with AI trained specifically for UK electrical work. Itemised materials, labour rates, regional pricing adjustments, and BS 7671 compliant specifications.';

const faqs = [
  {
    question: 'How accurate are the AI cost estimates for electrical work?',
    answer:
      'The AI Cost Engineer produces estimates that are typically within 5-10% of final actual costs for standard domestic and commercial electrical work. This level of accuracy is achieved because the system uses current UK trade pricing data from major electrical wholesalers (not list prices, but actual trade account prices), combined with labour timing benchmarks derived from thousands of completed electrical jobs across the UK. The system also applies regional pricing adjustments — labour rates and material costs vary significantly between London, the Southeast, the Midlands, the North, Scotland, and Wales. Over time, as you complete jobs and mark them as finished, the Cost Engineer learns from the difference between estimated and actual costs and adjusts its models to match your specific working speed, your supplier pricing, and your local market conditions.',
  },
  {
    question: 'Does the Cost Engineer handle VAT and CIS deductions?',
    answer:
      'Yes. The Cost Engineer produces estimates with full VAT handling appropriate to the type of work and customer. For standard domestic work, it applies the standard 20% VAT rate. For qualifying energy-saving materials installed in residential properties, it applies the reduced 0% rate where applicable under the current VAT rules. For commercial work where CIS (Construction Industry Scheme) applies, the system calculates the gross payment, CIS deduction (at the appropriate rate — 20% for registered subcontractors, 30% for unregistered, or 0% for those with gross payment status), and the net payment you will receive. All of these calculations are shown clearly in the quote so you and your customer understand the breakdown. The system stays current with UK tax rules and VAT rates.',
  },
  {
    question: 'Can I set my own labour rates and profit margins?',
    answer:
      'Yes, the Cost Engineer is fully customisable. You set your hourly labour rate (or day rate if you prefer), your material markup percentage, your overhead recovery rate, and your target profit margin. The system applies these to every estimate it generates. If you work with a mate or have employees, you can configure different labour rates for different personnel. The default values are based on UK industry averages for your region, but you can adjust them to match your actual business costs. Many electricians find it useful to start with the default values and then fine-tune them over their first few jobs as they compare estimates to actual outcomes. The system remembers your preferences and applies them automatically to all future estimates.',
  },
  {
    question: 'What information do I need to provide to get an estimate?',
    answer:
      'You describe the job in plain English, the same way you would describe it to another electrician. For example: "Consumer unit upgrade in a 1980s three-bed semi. Existing Wylex rewireable fuse board with 6 ways, upgrading to a 12-way AMD3 metal consumer unit with RCBOs. TN-C-S supply, meter in the hallway cupboard. Adding two new circuits — one for a 7 kW EV charger in the integral garage and one for a new ring final in the kitchen extension." The AI analyses this description, identifies all the materials needed (consumer unit, RCBOs, cables, accessories, earthing components, labels, fixings), calculates the labour time for each task (removal of old board, installation and wiring of new board, new circuit installation, testing and commissioning, certification), and produces a complete cost breakdown. If the AI needs more detail — such as the cable run length to the garage — it asks before generating the estimate.',
  },
  {
    question: 'How does regional pricing work?',
    answer:
      'Electrical work pricing varies significantly across the UK. A consumer unit change that might be quoted at £650-£800 in the North of England could be £900-£1200 in London or the Home Counties. The Cost Engineer applies regional pricing adjustments to both labour rates and material costs based on the job location. Labour rate adjustments reflect the actual market rates that electricians charge in each region — these are derived from industry surveys and real-world job data, not arbitrary multipliers. Material cost adjustments account for the fact that some wholesalers charge more for delivery to remote locations, and that trade counter pricing can vary between branches. When you set up your profile, you specify your primary working area, and the system calibrates its pricing accordingly. If you take on work outside your usual area, you can specify the job location and the system will adjust.',
  },
  {
    question: 'Can the Cost Engineer produce a professional quote document for clients?',
    answer:
      'Yes. The Cost Engineer generates a complete, professional quote document that you can send directly to clients. The document includes your company name, address, and contact details, the client name and site address, a description of the proposed works, an itemised breakdown of materials and labour (you can choose whether to show the client a fully itemised breakdown or a summary by work section), the total price including VAT, payment terms, a validity period (typically 30 days), and your standard terms and conditions. The quote can be exported as a PDF with your company branding, or shared via a link that the client can view on any device. The system also tracks which quotes have been sent, viewed, accepted, or declined, helping you manage your pipeline of potential work.',
  },
  {
    question: 'Does it include material quantities and product codes?',
    answer:
      'Yes. For each job, the Cost Engineer generates a full bill of quantities with specific product names and, where available, manufacturer part numbers. For example, rather than listing "1x consumer unit", it will specify "1x Hager VML955RK 10-way dual RCD consumer unit" or "1x Schneider SEA9ACS16 Acti 9 isobar 18-way TP+N distribution board" depending on the type of installation. Cable quantities include a waste allowance (typically 10-15% depending on the complexity of the cable routing), and consumables such as clips, fixings, labels, and fire-rated sealant are itemised rather than buried in a general "sundries" figure. This level of detail means you can use the bill of quantities to place your wholesale order directly, and the client can see exactly what they are paying for.',
  },
];

const features = [
  {
    icon: PoundSterling,
    title: 'UK Trade Pricing',
    description:
      'Current trade prices from major UK electrical wholesalers. Real trade account prices, not list prices. Updated regularly to reflect market changes.',
  },
  {
    icon: Clock,
    title: 'Labour Time Benchmarks',
    description:
      'Labour estimates based on thousands of completed UK electrical jobs. Accounts for job complexity, access difficulty, and the specific tasks involved.',
  },
  {
    icon: MapPin,
    title: 'Regional Price Adjustments',
    description:
      'Automatic pricing calibration for London, Southeast, Midlands, North, Scotland, Wales, and other UK regions. Reflects actual local market rates.',
  },
  {
    icon: Receipt,
    title: 'VAT and CIS Handling',
    description:
      'Correct VAT treatment for domestic and commercial work including reduced rates for qualifying energy-saving installations. CIS deduction calculations included.',
  },
  {
    icon: ClipboardList,
    title: 'Full Bill of Quantities',
    description:
      'Itemised materials with product names, part numbers, and quantities including waste allowances. Use the BOM to place your wholesale order directly.',
  },
  {
    icon: FileText,
    title: 'Professional Quote Documents',
    description:
      'Branded, client-ready PDF quotes with description of works, itemised or summary pricing, terms and conditions, and validity period.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate AI Cost Engineer',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'Web, iOS, Android',
  description: PAGE_DESCRIPTION,
  url: 'https://elec-mate.com/tools/ai-cost-engineer',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
    description: '7-day free trial, then from £9.99/month',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '430',
    bestRating: '5',
  },
};

const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

export default function AICostEngineerPage() {
  useSEO({
    title: 'AI Cost Engineer | Electrical Job Estimator',
    description: PAGE_DESCRIPTION,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...softwareAppSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 px-5">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-6">
            <Brain className="w-4 h-4" />1 of 8 Elec-AI Specialist Agents
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            AI Cost Engineer
            <span className="block text-yellow-400 mt-1">Quote Jobs in Minutes, Not Hours</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Get accurate electrical job cost estimates with AI trained specifically for UK
            electrical work. Itemised materials from UK wholesalers, labour rate benchmarks,
            regional pricing adjustments, and professional quote documents — all generated from a
            plain-English job description.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/signup"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation transition-colors"
            >
              Try Cost Engineer Free
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <a
              href="#what-is-cost-engineer"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              How Pricing Works
              <ArrowDown className="w-4 h-4 ml-1" />
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm text-white">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              5-10% accuracy range
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              430+ electricians
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              UK regional pricing
            </span>
          </div>
        </div>
      </section>

      {/* What Is the Cost Engineer */}
      <section id="what-is-cost-engineer" className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <PoundSterling className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What Is the AI Cost Engineer?
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The AI Cost Engineer is one of eight specialist Elec-AI agents, trained specifically
              for UK electrical work. It converts a plain-English job description into a complete,
              itemised cost estimate covering materials, labour, overheads, and profit. Unlike
              generic estimating tools that require you to manually price every item, the Cost
              Engineer understands electrical installation work and knows what materials and labour
              are needed for any given task.
            </p>
            <p>
              Quoting is the part of the job that most electricians find least rewarding. It takes
              time, it requires looking up current prices, and getting it wrong costs money in both
              directions — underquote and you lose profit, overquote and you lose the job to a
              competitor. The Cost Engineer eliminates the guesswork by combining three sources of
              pricing intelligence: current trade pricing from major UK electrical wholesalers,
              labour timing benchmarks from thousands of completed electrical jobs, and regional
              pricing adjustments that reflect the actual market rates in your area.
            </p>
            <p>
              The system is designed for the way electricians actually work. You describe the job in
              the same language you would use when talking to another electrician — "consumer unit
              upgrade, 1980s semi, existing rewireable fuses, adding EV charger circuit" — and the
              AI does the rest. It identifies every material needed (down to cable clips, earth
              blocks, and warning labels), calculates the labour time for each task, applies your
              markup and profit margin, and produces a professional quote document you can send to
              the customer. The whole process takes minutes instead of the hour or more that manual
              quoting typically requires.
            </p>
            <p>
              The Cost Engineer is part of the Elec-Mate platform alongside 70 calculators, 8
              certificate types, 36+ training courses, and the other seven Elec-AI specialist
              agents. It integrates with the Circuit Designer (which can feed circuit specifications
              directly into a cost estimate) and the certification system (so completed jobs flow
              through from quote to installation to testing to certification without re-entering
              data).
            </p>
          </div>
        </div>
      </section>

      {/* How Estimates Are Built */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BarChart3 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How Estimates Are Built</h2>
          </div>
          <div className="space-y-4 my-6">
            {[
              {
                step: '1',
                title: 'Describe the Job in Plain English',
                text: 'Enter the job description the same way you would tell another electrician about it. Include the property type, existing installation, scope of work, and any specific requirements. The AI asks clarifying questions if it needs more detail — for example, cable run lengths for long circuits, access restrictions, or whether asbestos is present.',
              },
              {
                step: '2',
                title: 'AI Generates Itemised Material List',
                text: 'The Cost Engineer identifies every material needed for the job — consumer units, protective devices, cables (with 10-15% waste allowance), accessories, containment, fixings, labels, fire stopping materials, and consumables. Each item includes the product name, manufacturer reference where available, quantity required, and current trade price from UK wholesalers.',
              },
              {
                step: '3',
                title: 'Labour Time Calculation',
                text: 'Labour is calculated task by task: isolation and preparatory work, removal of existing equipment, installation of new equipment, cable installation and routing, termination and connection, testing and commissioning, and paperwork and certification. Times are based on real-world benchmarks from thousands of completed UK electrical jobs, adjusted for the specific complexity of your job.',
              },
              {
                step: '4',
                title: 'Markup, VAT & Final Price',
                text: 'Your configured material markup, overhead recovery rate, and profit margin are applied to produce the final price. VAT is calculated at the appropriate rate for the type of work and customer. The output includes a full breakdown you can present to the client, or a summary view that shows the total by work section without revealing your cost structure.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 flex-shrink-0">
                  <span className="font-bold text-yellow-400">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                  <p className="text-white leading-relaxed text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional Pricing */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <MapPin className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Regional Pricing for the UK Market
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The UK electrical market is not one market — it is many. Labour rates in Central
              London can be double those in parts of the North East or Wales. Material costs vary
              between regions due to wholesaler pricing differences, delivery charges, and local
              competition. A quote that is competitive in Manchester may be uncompetitive in
              Guildford, and vice versa. The Cost Engineer accounts for these regional variations
              automatically.
            </p>
            <p>
              When you set up your profile, you specify your primary working area. The Cost Engineer
              calibrates its labour rate suggestions and material pricing adjustments based on real
              market data for your region. This is not a simple percentage uplift — it is a detailed
              model that reflects the actual rates electricians charge in each area, derived from
              industry salary surveys, job pricing data from contractors, and wholesale pricing
              information from major UK electrical distributors including Edmundson, Rexel, City
              Electrical Factors (CEF), and Screwfix trade accounts.
            </p>
            <p>
              If you take on work outside your usual area — for example, a domestic electrician in
              the Midlands who picks up a job in London — you can specify the job location and the
              system adjusts the pricing accordingly. This ensures your quote is competitive for
              that market rather than being based on your home area rates. The system also accounts
              for travel time and any additional costs associated with working away from your base,
              such as accommodation or congestion charges.
            </p>
          </div>
        </div>
      </section>

      {/* Learning From Completed Jobs */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <TrendingUp className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Learns from Your Completed Jobs
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Every electrician works at a different pace, uses different suppliers, and operates in
              a different local market. A one-size-fits-all pricing model will always be slightly
              wrong for any individual contractor. That is why the Cost Engineer includes a learning
              system that improves its accuracy over time by comparing its estimates to your actual
              job outcomes.
            </p>
            <p>
              When you complete a job, you can mark it as finished and enter the actual time spent
              and actual material costs incurred. The system compares these to the original estimate
              and identifies where the differences lie. Over time, it builds a profile of your
              specific working patterns — for example, if you consistently complete consumer unit
              changes 15% faster than the benchmark, or if your material costs are 5% lower because
              you have a particularly good trade account — and adjusts future estimates accordingly.
              This means the system becomes more accurate the more you use it, converging towards
              estimates that closely reflect your actual costs and working speed.
            </p>
          </div>
        </div>
      </section>

      {/* Why Electricians Choose */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Why Electricians Choose Elec-Mate for Quoting
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Trained specifically for UK electrical work. Quote domestic and commercial jobs in
            minutes instead of hours. Part of 70 calculators, 8 AI agents, and 36+ training courses.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <HelpCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-yellow-500/30 transition-colors"
              >
                <summary className="flex items-start gap-3 cursor-pointer touch-manipulation list-none [&::-webkit-details-marker]:hidden">
                  <ChevronRight className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0 transition-transform group-open:rotate-90" />
                  <h3 className="font-bold text-white text-lg">{faq.question}</h3>
                </summary>
                <div className="mt-3 pl-8">
                  <p className="text-white leading-relaxed text-sm">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Quote your next job in minutes"
        subheading="Join 430+ UK electricians using AI for accurate, professional cost estimates. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
