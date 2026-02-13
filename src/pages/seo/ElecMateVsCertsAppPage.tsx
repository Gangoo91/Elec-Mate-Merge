import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Brain,
  Calculator,
  ChevronDown,
  FileCheck2,
  GraduationCap,
  Briefcase,
  Smartphone,
  WifiOff,
  Zap,
  Check,
  X,
  Minus,
  ArrowRight,
} from 'lucide-react';

const PAGE_TITLE = 'Elec-Mate vs CertsApp 2026 | Feature Comparison | Which Is Better?';
const PAGE_DESCRIPTION =
  'Detailed comparison of Elec-Mate and CertsApp for UK electricians. Compare certificates, calculators, AI tools, pricing, and features side by side.';

const faqs = [
  {
    question: 'Is Elec-Mate better than CertsApp?',
    answer:
      'It depends on what you need from your electrician app. CertsApp is a capable tool for certificates and calculations that has built a solid user base. If you primarily need certificates and some calculators, CertsApp is a reasonable choice. Elec-Mate is a more comprehensive platform that includes everything CertsApp offers plus 5 AI specialist tools, full training courses (18th Edition, Level 2/3, AM2, EPA), and business management features (quoting, invoicing, job scheduling, payment collection). For electricians who want a single app for everything, Elec-Mate provides more value.',
  },
  {
    question: 'Can I switch from CertsApp to Elec-Mate?',
    answer:
      'Yes. Elec-Mate offers a 7-day free trial with full access to every feature, so you can evaluate the platform alongside your existing tools without any commitment. Your historical certificates in CertsApp remain accessible there — switching to Elec-Mate for new work does not affect your previous data. Many electricians try both apps in parallel during the trial period to compare workflows, features, and ease of use before making a full switch.',
  },
  {
    question: 'Does CertsApp have AI tools?',
    answer:
      'No. As of 2026, CertsApp does not include AI tools. Elec-Mate is currently the only UK electrician app offering AI specialist agents — including a Circuit Designer for planning circuit layouts to BS 7671, a Cost Engineer using real trade pricing data for accurate job estimates, an Installation Guide for step-by-step procedure guidance, a Maintenance Agent for fault diagnosis and scheduling, and a Health & Safety specialist for generating site-specific RAMS.',
  },
  {
    question: 'How does CertsApp pricing compare to Elec-Mate?',
    answer:
      'CertsApp uses a credit-based pricing model where you purchase credits to generate certificates. The cost per certificate depends on your credit package. This can be economical if you produce very few certificates per month but becomes expensive for busier electricians. Elec-Mate uses a flat monthly subscription starting from £4.99 with unlimited certificates, unlimited calculator use, full AI tools access, complete training courses, and business management features included. There are no per-certificate charges or credit limits.',
  },
  {
    question: 'Which app has better calculators, Elec-Mate or CertsApp?',
    answer:
      'CertsApp includes some electrical calculators alongside its certification features. Elec-Mate includes over 50 specialist calculators covering cable sizing (BS 7671 Appendix 4 method), voltage drop, maximum demand, diversity, conduit and trunking fill, earth fault loop impedance (Zs), prospective fault current, disconnection times, cable derating for grouping and ambient temperature, adiabatic equation for protective conductor sizing, and many more. For electricians who perform BS 7671 calculations regularly, Elec-Mate offers a significantly more comprehensive calculator suite.',
  },
];

const features = [
  {
    icon: FileCheck2,
    title: '8 Certificate Types',
    description:
      'EICR, EIC, Minor Works, EV Charger, Solar PV, Fire Alarm, Emergency Lighting, and PAT Testing. All with digital signatures, auto-save, and professional PDF export.',
  },
  {
    icon: Calculator,
    title: '50+ BS 7671 Calculators',
    description:
      'Cable sizing, voltage drop, maximum demand, diversity, conduit fill, trunking fill, Zs verification, disconnection times, and dozens more — all referencing 18th Edition tables.',
  },
  {
    icon: Brain,
    title: '5 AI Specialist Tools',
    description:
      'Circuit Designer, Cost Engineer, Installation Guide, Maintenance Agent, and Health & Safety specialist. AI tools trained on electrical industry data that CertsApp does not offer.',
  },
  {
    icon: GraduationCap,
    title: 'Full Training Platform',
    description:
      '18th Edition, Level 2/3 Electrical Installation, AM2 preparation, and EPA simulator. Complete courses built into the app — something CertsApp does not include.',
  },
  {
    icon: Briefcase,
    title: 'Business Management',
    description:
      'Job scheduling, quoting, invoicing, Stripe payment collection, and Xero accounting integration. Run your electrical business from a single app without separate software.',
  },
  {
    icon: WifiOff,
    title: 'Full Offline Support',
    description:
      'Auto-saves locally every 10 seconds and syncs to the cloud every 30 seconds when connectivity returns. Complete certificates and calculations without mobile signal.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'iOS, Android, Web',
  description: 'All-in-one platform for UK electricians: 8 certificates, 50+ calculators, 5 AI tools, training courses, and business management.',
  url: 'https://elec-mate.com/compare/elec-mate-vs-certsapp',
  offers: {
    '@type': 'Offer',
    price: '4.99',
    priceCurrency: 'GBP',
    description: 'Monthly subscription from £4.99. 7-day free trial.',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '127',
    bestRating: '5',
    worstRating: '1',
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

export default function ElecMateVsCertsAppPage() {
  useSEO({
    title: 'Elec-Mate vs CertsApp 2026 | Feature Comparison | Which Is Better?',
    description: PAGE_DESCRIPTION,
    schema: softwareAppSchema,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...softwareAppSchema })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}</script>
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <Zap className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">2026 Head-to-Head Comparison</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            <span className="text-yellow-400">Elec-Mate</span> vs <span className="text-yellow-400">CertsApp</span>
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mb-8">
            An honest, side-by-side comparison of two UK electrician apps. We cover certificates, calculators, AI tools, training, business features, pricing, and platform support to help you decide which is right for you.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
            >
              Try Elec-Mate Free for 7 Days
            </a>
            <a
              href="#side-by-side"
              className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl touch-manipulation transition-colors"
            >
              See Side-by-Side Comparison
            </a>
          </div>
        </div>
      </section>

      {/* What is CertsApp */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is CertsApp?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              CertsApp is a mobile app designed for UK electricians that combines electrical certification with calculation tools. It allows electricians to create various types of electrical certificates on their phones and tablets, and includes a selection of electrical calculators for on-site use.
            </p>
            <p>
              The app uses a credit-based pricing model, where electricians purchase credits that are used to generate certificates. This pay-as-you-go approach can be appealing for electricians who produce certificates infrequently, as you only pay for what you use. CertsApp has developed a following among UK electricians who value having certificates and some calculators in a single mobile app.
            </p>
            <p>
              CertsApp supports the main certificate types used in the UK electrical industry and provides a workflow designed for completing certificates on site. The interface is designed for mobile use, and the app includes features like digital signatures and PDF export that modern electricians expect from a certificate app.
            </p>
            <p>
              <strong>CertsApp's strengths:</strong> Combined certificate and calculator functionality, credit-based pricing that works for low-volume users, mobile-first design, established presence in the UK electrician app market. It provides a solid core offering for electricians who need certificates and basic calculations.
            </p>
          </div>
        </div>
      </section>

      {/* What is Elec-Mate */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is Elec-Mate?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Elec-Mate is a comprehensive all-in-one platform built specifically for UK electricians. It goes well beyond certificates and calculators to include AI-powered specialist tools, full professional training courses, and business management capabilities — all in a single mobile-first app.
            </p>
            <p>
              The platform includes 8 certificate types (EICR, EIC, Minor Works, EV Charger Installation, Solar PV, Fire Alarm Commissioning, Emergency Lighting, and PAT Testing), over 50 specialist electrical calculators referencing BS 7671:2018+A2:2022, 5 AI tools (Circuit Designer, Cost Engineer, Installation Guide, Maintenance Agent, and Health & Safety specialist), full training courses (18th Edition, Level 2/3 Electrical Installation, AM2 preparation, EPA simulator), and business management features (job scheduling, quoting, invoicing, Stripe payment collection, Xero accounting integration).
            </p>
            <p>
              Elec-Mate works on iOS, Android, and desktop via a Progressive Web App (PWA). It provides full offline support with automatic local saves every 10 seconds and cloud syncing every 30 seconds when connectivity returns. Pricing starts from £4.99 per month with unlimited usage across all features, and every plan includes a 7-day free trial with full access.
            </p>
          </div>
        </div>
      </section>

      {/* Side-by-Side Comparison */}
      <section id="side-by-side" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Side-by-Side Feature Comparison
          </h2>

          {/* Certificate Comparison */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <FileCheck2 className="w-5 h-5 text-yellow-400" />
              Certificates
            </h3>
            <div className="space-y-4 text-white leading-relaxed mb-6">
              <p>
                Both Elec-Mate and CertsApp support the core electrical certificate types used by UK electricians. EICR, EIC, and Minor Works are available on both platforms, along with digital signatures and PDF export functionality.
              </p>
              <p>
                Elec-Mate includes 8 certificate types in total. In addition to the standard EICR, EIC, and Minor Works, it covers EV Charger Installation, Solar PV, Fire Alarm Commissioning, Emergency Lighting, and PAT Testing. These specialist certificate types are becoming increasingly important as the electrical industry evolves — EV charger installations alone have grown substantially, and having a dedicated certificate form for this work saves time compared to adapting a generic form.
              </p>
              <p>
                CertsApp offers various certificate types for the UK market. The exact range may vary as the app continues to develop, so it is worth checking their current offering on their website. For the standard domestic certificates that make up the bulk of many electricians' work, both platforms provide what you need.
              </p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-5">
                <h4 className="font-bold text-white mb-3">Elec-Mate</h4>
                <ul className="space-y-2 text-white text-sm">
                  {['EICR', 'EIC', 'Minor Works', 'EV Charger Installation', 'Solar PV', 'Fire Alarm Commissioning', 'Emergency Lighting', 'PAT Testing'].map((cert) => (
                    <li key={cert} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400 shrink-0" />
                      <span>{cert}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
                <h4 className="font-bold text-white mb-3">CertsApp</h4>
                <ul className="space-y-2 text-white text-sm">
                  {['EICR', 'EIC', 'Minor Works'].map((cert) => (
                    <li key={cert} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-400 shrink-0" />
                      <span>{cert}</span>
                    </li>
                  ))}
                  <li className="flex items-center gap-2">
                    <Minus className="w-4 h-4 text-yellow-400 shrink-0" />
                    <span>Additional types (varies)</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Calculator Comparison */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Calculator className="w-5 h-5 text-yellow-400" />
              Calculators
            </h3>
            <div className="space-y-4 text-white leading-relaxed">
              <p>
                CertsApp includes a selection of electrical calculators, which is one of its differentiators compared to certificate-only apps. Having calculators alongside certificates in a single app is genuinely useful for on-site work. The exact range of calculators available varies and may continue to expand.
              </p>
              <p>
                Elec-Mate includes over 50 specialist electrical calculators. These cover the full range of BS 7671 calculations: cable sizing to Appendix 4, voltage drop verification (including the tabular method and the mV/A/m method), maximum demand calculations, diversity factors (BS 7671 Table 7.1 and beyond), conduit fill rates, trunking fill rates, earth fault loop impedance checks against maximum Zs values for every protective device type, prospective fault current, disconnection time verification, cable derating for grouping (Table 4C1/4C2/4C3), cable derating for ambient temperature (Table 4B1/4B2), the adiabatic equation for protective conductor sizing, and many more.
              </p>
              <p>
                The depth of calculator coverage matters for electricians who work on anything beyond basic domestic installations. Commercial projects, industrial installations, and complex domestic work all require calculations that go beyond simple cable sizing. Having the right calculator available on site — rather than having to look up tables in the book and work through the maths manually — saves time and reduces errors.
              </p>
              <p>
                Both apps recognise that calculators are essential for modern electricians. The difference is primarily in the breadth and depth of coverage. If you only need basic cable sizing and voltage drop, CertsApp's calculators may be sufficient. If you need the full range of BS 7671 calculations, Elec-Mate provides a more comprehensive toolkit.
              </p>
            </div>
          </div>

          {/* AI Comparison */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Brain className="w-5 h-5 text-yellow-400" />
              AI Tools
            </h3>
            <div className="space-y-4 text-white leading-relaxed">
              <p>
                CertsApp does not currently include AI tools. This is not a criticism — AI features are a relatively new development in the electrician app space, and most apps do not yet offer them.
              </p>
              <p>
                Elec-Mate includes five AI specialist agents, each designed for a specific aspect of electrical work. These are not generic chatbots — they are specialist tools trained on electrical industry data:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Circuit Designer:</strong> Analyses your project requirements and suggests BS 7671-compliant circuit arrangements. It considers diversity, cable grouping, ambient temperature, and protective device coordination — automating what would otherwise be a lengthy manual process.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Cost Engineer:</strong> Uses real trade pricing data and labour timing intelligence to produce detailed, accurate job estimates. This is particularly valuable for quoting work you have not done before, as it draws on market data rather than guesswork.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Installation Guide:</strong> Provides step-by-step guidance for specific installation scenarios, referencing relevant BS 7671 regulations, manufacturer guidelines, and industry best practices.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Maintenance Agent:</strong> Helps diagnose electrical faults and plan maintenance schedules based on installation characteristics, age, and usage patterns.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Health & Safety:</strong> Generates site-specific RAMS (Risk Assessments and Method Statements) tailored to your particular job, going beyond generic templates to address the actual hazards and controls relevant to that installation.</span>
                </li>
              </ul>
              <p>
                AI tools are most valuable for electricians who quote for new work regularly, take on varied or complex projects, or need to produce professional documentation like RAMS for commercial clients. If your work is primarily routine domestic installations where you know the costs and procedures inside out, AI tools may be less immediately useful — though the Cost Engineer can still help ensure you are charging enough for your work.
              </p>
            </div>
          </div>

          {/* Training Comparison */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-yellow-400" />
              Training
            </h3>
            <div className="space-y-4 text-white leading-relaxed">
              <p>
                CertsApp does not include a training platform. It is designed as a working tool for qualified electricians, not as a learning resource. This is a common approach — most electrician apps focus on the tools of the trade rather than education.
              </p>
              <p>
                Elec-Mate includes a comprehensive training platform with courses covering:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>18th Edition (BS 7671:2018+A2:2022):</strong> Complete course content covering the current Wiring Regulations, structured for both initial learning and revision.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Level 2 Electrical Installation:</strong> Aligned with the City & Guilds Level 2 curriculum for electrical installation work.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Level 3 Electrical Installation:</strong> Advanced course content for the City & Guilds Level 3 qualification.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>AM2 Preparation:</strong> Focused preparation for the AM2 practical assessment that electricians must pass to register with a competent person scheme.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>EPA Simulator:</strong> End Point Assessment simulation to help apprentices prepare for their final assessment.</span>
                </li>
              </ul>
              <p>
                For apprentices, having training material in the same app as professional tools means a seamless transition from learning to working. For qualified electricians, the 18th Edition course is valuable for revision when regulation amendments are published or when preparing for competent person scheme assessments. Employers benefit too — providing one app that covers both training and tools for their workforce simplifies administration and reduces costs.
              </p>
            </div>
          </div>

          {/* Business Management */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-yellow-400" />
              Business Management
            </h3>
            <div className="space-y-4 text-white leading-relaxed">
              <p>
                CertsApp is primarily focused on certificates and calculations. For business management tasks like quoting, invoicing, job scheduling, and payment collection, you would typically use separate software alongside CertsApp.
              </p>
              <p>
                Elec-Mate includes business management features as an integrated part of the platform. You can create professional quotes from within the app, convert accepted quotes into scheduled jobs, track job progress, generate invoices, collect payments via Stripe, and sync your financial data with Xero for accounting purposes.
              </p>
              <p>
                The practical benefit is a streamlined workflow. When you complete a certificate on site, you can immediately generate an invoice from the same app, email both the certificate and invoice to the client, and collect payment — all before leaving the property. This workflow is particularly valuable for sole traders and small contractors who handle every aspect of their business themselves.
              </p>
              <p>
                For electricians who already have business software they are happy with (such as a standalone invoicing app or accounting package), this feature may be less important. But for those who are currently using spreadsheets, paper invoices, or no system at all, having business management built into their primary work tool can be transformative.
              </p>
            </div>
          </div>

          {/* Pricing */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Zap className="w-5 h-5 text-yellow-400" />
              Pricing
            </h3>
            <div className="space-y-4 text-white leading-relaxed">
              <p>
                CertsApp uses a credit-based pricing model. You purchase credits, and each certificate you generate costs a certain number of credits. This pay-as-you-go approach means you only pay for the certificates you actually produce, which can be cost-effective for electricians who generate only a few certificates per month.
              </p>
              <p>
                However, for busier electricians producing 10, 15, or 20+ certificates per month, credit-based pricing adds up quickly. It also creates a subtle disincentive to produce certificates — you might hesitate to certify a small job because of the per-certificate cost, which is not ideal from a compliance perspective.
              </p>
              <p>
                Elec-Mate uses a flat monthly subscription starting from £4.99 per month. All features are included: all 8 certificate types (unlimited), all 50+ calculators, all 5 AI tools, all training courses, and all business management features. There are no per-certificate charges, no credit limits, and no feature restrictions. Every plan comes with a 7-day free trial that includes full access to everything.
              </p>
              <p>
                The break-even point is typically around 3 to 5 certificates per month, depending on CertsApp's credit pricing. Beyond that, Elec-Mate's flat subscription is cheaper per certificate — and you also get access to AI tools, training, and business management that CertsApp does not offer at any price. For electricians producing certificates regularly, the unlimited model provides predictable costs and better value.
              </p>
            </div>
          </div>

          {/* Platform */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-yellow-400" />
              Platform and Offline Support
            </h3>
            <div className="space-y-4 text-white leading-relaxed">
              <p>
                Both CertsApp and Elec-Mate are designed for mobile use on iOS and Android devices. Elec-Mate additionally works on desktop computers via a Progressive Web App (PWA), which provides a larger-screen experience for tasks like reviewing certificates, managing quotes, or working through training material.
              </p>
              <p>
                Offline support is essential for electricians working in locations without mobile signal — basements, plant rooms, underground car parks, industrial units, and rural properties are all common scenarios. Elec-Mate provides full offline support: data saves locally every 10 seconds and syncs to the cloud every 30 seconds when connectivity returns. You can complete certificates, run calculations, and access reference material without any internet connection.
              </p>
              <p>
                CertsApp's offline capabilities may vary by feature. If you regularly work in areas with poor connectivity, check the latest information from CertsApp about their offline support before relying on it in the field.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who should choose each */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Who Should Choose Which App?
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
              <h3 className="font-bold text-white text-lg mb-4">Choose CertsApp if:</h3>
              <ul className="space-y-3 text-white text-sm">
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-white mt-0.5 shrink-0" />
                  <span>You produce a small number of certificates per month and prefer pay-as-you-go pricing</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-white mt-0.5 shrink-0" />
                  <span>You need certificates and basic calculators but nothing beyond that</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-white mt-0.5 shrink-0" />
                  <span>You already use CertsApp and are satisfied with its features for your workflow</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-white mt-0.5 shrink-0" />
                  <span>You do not need AI tools, training courses, or integrated business management</span>
                </li>
              </ul>
            </div>
            <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6">
              <h3 className="font-bold text-white text-lg mb-4">Choose Elec-Mate if:</h3>
              <ul className="space-y-3 text-white text-sm">
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                  <span>You want certificates, calculators, AI tools, training, and business management in one app</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                  <span>You produce certificates regularly and want unlimited usage without per-certificate charges</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                  <span>You need specialist certificates for EV Charger, Solar PV, Fire Alarm, or Emergency Lighting work</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                  <span>You want 50+ BS 7671 calculators covering every calculation you might need on site</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                  <span>You are an apprentice who needs training material alongside professional tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                  <span>You want AI tools for circuit design, job costing, installation guidance, and RAMS generation</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* The Bottom Line */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            The Bottom Line
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              CertsApp is a capable app that combines certificates and calculators in a mobile-friendly package. Its credit-based pricing model works well for electricians who produce a small number of certificates and want a straightforward, no-subscription approach. It does what it does competently and has earned a solid reputation in the market.
            </p>
            <p>
              Elec-Mate offers substantially more breadth and depth. With 8 certificate types, 50+ calculators, 5 AI specialist tools, complete training courses, and integrated business management, it is designed to be the only app a UK electrician needs. The flat monthly pricing with unlimited usage makes it more economical for anyone producing certificates regularly, and the additional features (AI, training, business) provide value that no certificate-focused app can match.
            </p>
            <p>
              The best way to decide is to try Elec-Mate alongside your current workflow. The 7-day free trial gives you full access to every feature with no commitment. Compare the experience directly, and choose the tool that genuinely makes your working day easier and more productive.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            What You Get with Elec-Mate
          </h2>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border border-white/10 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 min-h-[44px] touch-manipulation cursor-pointer text-white font-medium">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-yellow-400 group-open:rotate-180 transition-transform shrink-0 ml-4" />
                </summary>
                <div className="px-4 pb-4 text-white text-sm leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Ready to compare for yourself?"
        subheading="Try Elec-Mate free for 7 days. All features included — certificates, calculators, AI tools, training, and business management. Cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </PublicPageLayout>
  );
}
