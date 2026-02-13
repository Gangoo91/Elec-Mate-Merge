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

const PAGE_TITLE = 'Elec-Mate vs iCertifi 2026 | Feature Comparison | Which Is Better?';
const PAGE_DESCRIPTION =
  'Detailed comparison of Elec-Mate and iCertifi for UK electricians. Compare certificates, calculators, AI tools, pricing, and features side by side.';

const faqs = [
  {
    question: 'Is Elec-Mate better than iCertifi?',
    answer:
      'It depends on what you need. iCertifi is an established, reliable certificate-focused app that does its core job well. If you only need to produce electrical certificates and want a proven, focused tool, iCertifi is a solid choice. Elec-Mate is better if you want everything in one app — it includes all the certificate types iCertifi offers plus additional ones (EV Charger, Solar PV, Fire Alarm, Emergency Lighting, PAT), over 50 BS 7671 calculators, 5 AI specialist tools, full training courses, and business management features like quoting and invoicing. For most electricians, the all-in-one approach saves time and money.',
  },
  {
    question: 'Can I switch from iCertifi to Elec-Mate?',
    answer:
      'Yes. Elec-Mate offers a 7-day free trial with full access to every feature, so you can evaluate the platform without commitment. Your existing certificates in iCertifi remain accessible in that app — switching to Elec-Mate for new work does not affect your historical data in iCertifi. Many electricians try Elec-Mate alongside their existing app during the trial period to compare the workflow before making a full switch.',
  },
  {
    question: 'Does iCertifi have AI tools?',
    answer:
      'No. As of 2026, iCertifi does not include AI tools. Elec-Mate is currently the only UK electrician app that offers AI specialists — including a Circuit Designer, Cost Engineer, Installation Guide, Maintenance Agent, and Health & Safety specialist. These AI tools are trained on electrical industry data and can help with circuit planning, job costing, installation guidance, fault diagnosis, and RAMS generation.',
  },
  {
    question: 'Which app has more calculators, Elec-Mate or iCertifi?',
    answer:
      'Elec-Mate includes over 50 specialist electrical calculators covering cable sizing, voltage drop, maximum demand, diversity, conduit and trunking fill, earth fault loop impedance, prospective fault current, disconnection times, cable derating, and many more. iCertifi includes a more limited selection of basic calculators. If you regularly perform BS 7671 calculations on site, Elec-Mate provides a significantly broader toolkit.',
  },
  {
    question: 'Does Elec-Mate work on both iPhone and Android?',
    answer:
      'Yes. Elec-Mate works on iOS (iPhone and iPad), Android phones and tablets, and desktop computers via a Progressive Web App (PWA). The interface adapts to your screen size, so you get a mobile-optimised experience on phones and a fuller layout on tablets and desktops. iCertifi also supports both iOS and Android. Both apps work across the major mobile platforms.',
  },
];

const features = [
  {
    icon: FileCheck2,
    title: '8 Certificate Types',
    description:
      'EICR, EIC, Minor Works, EV Charger, Solar PV, Fire Alarm, Emergency Lighting, and PAT Testing. Elec-Mate covers specialist certificates that iCertifi does not include.',
  },
  {
    icon: Calculator,
    title: '50+ BS 7671 Calculators',
    description:
      'Cable sizing, voltage drop, maximum demand, diversity, conduit fill, trunking fill, Zs verification, disconnection times, and dozens more. Far beyond iCertifi\'s basic calculator set.',
  },
  {
    icon: Brain,
    title: '5 AI Specialist Tools',
    description:
      'Circuit Designer, Cost Engineer, Installation Guide, Maintenance Agent, and Health & Safety specialist. AI capabilities that no certificate-only app can match.',
  },
  {
    icon: GraduationCap,
    title: 'Full Training Platform',
    description:
      '18th Edition, Level 2/3 Electrical Installation, AM2 preparation, and EPA simulator. iCertifi does not include any training — Elec-Mate has complete courses built in.',
  },
  {
    icon: Briefcase,
    title: 'Business Management',
    description:
      'Job scheduling, quoting, invoicing, Stripe payment collection, and Xero accounting integration. Manage your entire electrical business without switching between apps.',
  },
  {
    icon: WifiOff,
    title: 'Full Offline Support',
    description:
      'Auto-saves locally every 10 seconds and syncs to the cloud every 30 seconds when connectivity returns. Complete certificates in basements and plant rooms without signal.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'iOS, Android, Web',
  description: 'All-in-one platform for UK electricians: 8 certificates, 50+ calculators, 5 AI tools, training courses, and business management.',
  url: 'https://elec-mate.com/compare/elec-mate-vs-icertifi',
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

export default function ElecMateVsICertifiPage() {
  useSEO({
    title: 'Elec-Mate vs iCertifi 2026 | Feature Comparison | Which Is Better?',
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
            <span className="text-yellow-400">Elec-Mate</span> vs <span className="text-yellow-400">iCertifi</span>
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mb-8">
            An honest, detailed comparison of two popular apps for UK electricians. We will cover certificates, calculators, AI tools, training, business features, pricing, and platform support — so you can make an informed choice.
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

      {/* What is iCertifi */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is iCertifi?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              iCertifi is a well-established mobile app designed for UK electricians to create electrical certificates on their phones and tablets. It has been available on both iOS and Android for several years and has built a loyal user base in the UK electrical industry.
            </p>
            <p>
              The app focuses primarily on certification — allowing electricians to complete EICR (Electrical Installation Condition Report), EIC (Electrical Installation Certificate), Minor Works certificates, and some additional certificate types directly on their mobile devices. It includes digital signature capture, PDF export, and a straightforward interface designed for on-site use.
            </p>
            <p>
              iCertifi includes some basic calculators and has added features over time, but its core strength remains certification. For electricians who need a reliable, focused tool to produce certificates on site, iCertifi has earned its reputation as a dependable option. It is a well-known name in the trade and many electricians have used it for years.
            </p>
            <p>
              <strong>iCertifi's strengths:</strong> Established track record, focused certificate workflow, reliable performance, familiar to many UK electricians, available on both major mobile platforms. It does what it sets out to do — certificates — and it does it well.
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
              Elec-Mate is a comprehensive, all-in-one platform built for UK electricians. Rather than focusing on a single aspect of the job, it combines electrical certification, BS 7671 calculators, AI-powered tools, professional training courses, and business management into a single mobile-first app.
            </p>
            <p>
              The platform includes 8 certificate types (EICR, EIC, Minor Works, EV Charger, Solar PV, Fire Alarm, Emergency Lighting, and PAT Testing), over 50 specialist electrical calculators, 5 AI tools (Circuit Designer, Cost Engineer, Installation Guide, Maintenance Agent, and Health & Safety specialist), full training courses (18th Edition, Level 2/3 Electrical Installation, AM2, EPA simulator), and business management features (job scheduling, quoting, invoicing, Stripe payments, Xero integration).
            </p>
            <p>
              Elec-Mate is a newer platform than iCertifi but was designed with the advantage of building on the lessons learned from existing tools in the market. It works on iOS, Android, and desktop via a Progressive Web App, with full offline support and automatic syncing. Pricing starts from £4.99 per month with unlimited usage across all features and a 7-day free trial.
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
                Both Elec-Mate and iCertifi support the core certificate types that UK electricians use regularly: EICR, EIC, and Minor Works. Both apps provide digital signature capture, observation coding, and PDF export. For these standard certificates, both platforms deliver a professional result.
              </p>
              <p>
                Where they differ is in scope. Elec-Mate includes 8 certificate types in total, adding EV Charger Installation, Solar PV, Fire Alarm Commissioning, Emergency Lighting, and PAT Testing certificates. As the electrical industry expands into EV charging, renewable energy, and fire safety, having these specialist certificate types available in your app saves time and eliminates the need for separate tools or paper forms.
              </p>
              <p>
                iCertifi offers EICR, EIC, Minor Works, and some additional certificate types. The exact offering may vary as the app continues to develop. For the standard domestic and commercial certificates, iCertifi provides a proven, reliable workflow.
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
                <h4 className="font-bold text-white mb-3">iCertifi</h4>
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
                  {['EV Charger Installation', 'Solar PV', 'Fire Alarm Commissioning', 'Emergency Lighting'].map((cert) => (
                    <li key={cert} className="flex items-center gap-2">
                      <X className="w-4 h-4 text-red-400 shrink-0" />
                      <span>{cert}</span>
                    </li>
                  ))}
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
                This is an area of significant difference between the two platforms. Elec-Mate includes over 50 specialist electrical calculators that reference BS 7671:2018+A2:2022 tables directly. These cover cable sizing (Appendix 4 method), voltage drop verification, maximum demand calculations, diversity factors, conduit and trunking fill rates, earth fault loop impedance (Zs) checks, prospective fault current, disconnection time verification, cable derating for grouping and ambient temperature, adiabatic equation for protective conductor sizing, and many more.
              </p>
              <p>
                iCertifi includes a more limited selection of calculators. The available calculations may be sufficient for basic domestic work, but electricians who regularly perform complex calculations — commercial installations, industrial work, or any project requiring detailed cable sizing and verification — will find Elec-Mate's calculator suite significantly more comprehensive.
              </p>
              <p>
                For context, having the right calculator to hand on site can save 15 to 20 minutes per calculation compared to looking up tables in the book and working through the maths manually. Across a week of work, comprehensive calculators easily save hours of time and reduce the risk of calculation errors that could lead to non-compliant installations.
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
                This is the clearest differentiator. iCertifi does not include any AI tools. Elec-Mate includes five AI specialist agents, each designed for a specific aspect of electrical work:
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Circuit Designer:</strong> Helps plan circuit layouts, checks against BS 7671 requirements, considers diversity, cable grouping, and protective device coordination.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Cost Engineer:</strong> Uses real trade pricing data and labour timing intelligence to produce accurate job estimates. Helps you quote competitively without undercharging.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Installation Guide:</strong> Provides step-by-step guidance for specific installation scenarios, referencing relevant regulations and best practices.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Maintenance Agent:</strong> Helps diagnose faults and plan maintenance schedules based on installation characteristics and manufacturer recommendations.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Health & Safety:</strong> Generates site-specific RAMS tailored to your electrical work, rather than generic templates.</span>
                </li>
              </ul>
              <p>
                If you are an electrician who occasionally needs to estimate job costs, plan circuits, or produce RAMS for commercial work, these AI tools can save significant time. If you never need these capabilities, this difference may not matter to you — and that is perfectly fine. Not every electrician needs AI tools.
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
                iCertifi does not include a training platform. It is a tool for working electricians, not a learning resource. This is a reasonable design decision — not every app needs to be everything to everyone.
              </p>
              <p>
                Elec-Mate, by contrast, includes a full training platform with courses covering the 18th Edition (BS 7671:2018+A2:2022), City & Guilds Level 2 and Level 3 Electrical Installation, AM2 assessment preparation, and an End Point Assessment (EPA) simulator. These courses are built into the app and accessible on any device.
              </p>
              <p>
                This matters most for apprentices and electricians who are studying for qualifications or revising for regulation updates. Having training material in the same app you use for work means you can study between jobs or during quiet periods without needing a separate platform. It also means employers can provide their apprentices with a single app that covers both training and practical tools.
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
                iCertifi includes some basic business features, but its primary focus is certification. For full business management — quoting, invoicing, job scheduling, client management, payment collection, and accounting integration — you would typically need separate software.
              </p>
              <p>
                Elec-Mate includes business management features as part of the platform. You can create professional quotes, convert them to jobs, schedule work, generate invoices, collect payments via Stripe, and sync with Xero for accounting — all from the same app. For sole traders and small contractors, this eliminates the need for separate invoicing software, project management tools, and payment platforms.
              </p>
              <p>
                The ability to complete a certificate on site, generate an invoice from the job details, and send both to the client via email before leaving the property is a workflow that saves time every single day. It also improves cash flow, because you are invoicing immediately rather than waiting until you are back at a desk.
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
                iCertifi uses a subscription model with various tiers. Pricing may include per-certificate charges or tiered feature access depending on the plan you choose. Check their current pricing on their website for the latest figures, as pricing structures can change.
              </p>
              <p>
                Elec-Mate uses a flat monthly subscription starting from £4.99 per month. All features are included at every tier — all 8 certificate types, all 50+ calculators, all 5 AI tools, all training courses, and all business management features. There are no per-certificate charges and no feature gating. Every plan includes a 7-day free trial with full access.
              </p>
              <p>
                The value calculation is straightforward: if you use certificates, calculators, and any of the additional features (AI tools, training, or business management), Elec-Mate provides significantly more value per pound spent. If you only need basic certificates and nothing else, iCertifi may be sufficient — and you should choose the tool that matches your actual needs.
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
                Both iCertifi and Elec-Mate work on iOS and Android, the two major mobile platforms. Elec-Mate additionally works on desktop computers via a Progressive Web App (PWA), which is useful for office-based tasks like reviewing certificates, managing quotes, or studying training material on a larger screen.
              </p>
              <p>
                Offline support is critical for electricians who work in locations without mobile signal. Elec-Mate provides full offline support with automatic local saves every 10 seconds and cloud syncing every 30 seconds when connectivity returns. This means you can complete certificates, run calculations, and work normally even in basements, plant rooms, or remote locations. iCertifi's offline capabilities may vary by feature — check their latest documentation for specifics.
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
              <h3 className="font-bold text-white text-lg mb-4">Choose iCertifi if:</h3>
              <ul className="space-y-3 text-white text-sm">
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-white mt-0.5 shrink-0" />
                  <span>You only need to produce standard electrical certificates (EICR, EIC, Minor Works)</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-white mt-0.5 shrink-0" />
                  <span>You prefer a focused, established tool with a proven track record</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-white mt-0.5 shrink-0" />
                  <span>You do not need extensive calculators, AI tools, training, or business management</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-white mt-0.5 shrink-0" />
                  <span>You already use and are comfortable with iCertifi and have no unmet needs</span>
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
                  <span>You need specialist certificates (EV Charger, Solar PV, Fire Alarm, Emergency Lighting, PAT)</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                  <span>You regularly perform BS 7671 calculations and want 50+ calculators at your fingertips</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                  <span>You want to quote, invoice, and collect payments from the same app you use for certificates</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                  <span>You are an apprentice who needs both training material and professional tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <ArrowRight className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                  <span>You want AI tools to help with circuit design, job costing, and RAMS</span>
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
              iCertifi is a solid, established app that does certificates well. It has earned its place in the market and continues to serve UK electricians reliably. If certificates are your only need, it is a perfectly reasonable choice.
            </p>
            <p>
              Elec-Mate offers significantly more. By combining certificates with 50+ calculators, 5 AI specialist tools, full training courses, and business management features, it eliminates the need for multiple separate apps and subscriptions. For the majority of UK electricians — whether sole traders, small contractors, or apprentices — the all-in-one approach saves both time and money.
            </p>
            <p>
              The best way to decide is to try both. Elec-Mate offers a 7-day free trial with full access to every feature, so you can compare the experience directly with whatever you are currently using. There is no commitment and no payment details required upfront for the trial period.
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
