import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Award,
  Brain,
  Calculator,
  ChevronDown,
  FileCheck2,
  GraduationCap,
  Briefcase,
  Smartphone,
  ShieldCheck,
  WifiOff,
  Zap,
  Users,
  Check,
  X,
  Minus,
} from 'lucide-react';

const PAGE_TITLE = 'Best Electrician App UK 2026 | Certificates, Calculators & AI Tools | Elec-Mate';
const PAGE_DESCRIPTION =
  'Looking for the best electrician app in the UK? Compare features, pricing, and capabilities. Certificates, calculators, AI tools, and training in one app. 7-day free trial.';

const faqs = [
  {
    question: 'What is the best app for electricians in the UK?',
    answer:
      'The best electrician app depends on your needs. If you only need certificates, iCertifi and CertsApp are solid options with a focused feature set. If you want everything in one place — certificates, BS 7671 calculators, AI tools, apprentice training, and business management — Elec-Mate is the most comprehensive platform available in the UK market as of 2026. It combines 8 certificate types, 50+ calculators, 5 AI specialist tools, full 18th Edition training courses, and business features like quoting, invoicing, and job scheduling into a single app starting from £4.99 per month with a 7-day free trial.',
  },
  {
    question: 'Is there an app for EICR certificates?',
    answer:
      'Yes, several apps support EICR (Electrical Installation Condition Report) certificates. iCertifi, CertsApp, and Elec-Mate all allow you to create EICR certificates on your phone or tablet. Elec-Mate includes the full EICR form structure with auto-save, digital signatures, observation code guidance (C1, C2, C3, FI), test value validation against BS 7671 maximum permitted values, and professional PDF export. The app also covers EIC, Minor Works, EV Charger, Solar PV, Fire Alarm, Emergency Lighting, and PAT Testing certificates.',
  },
  {
    question: 'Do electrician apps work offline on site?',
    answer:
      'Offline support varies between apps. Elec-Mate is designed for site use and works offline — your data saves locally every 10 seconds and syncs to the cloud every 30 seconds when connectivity returns. This means you can complete certificates, run calculations, and access reference material in basements, plant rooms, or any location without mobile signal. Not all competitor apps offer the same level of offline support, so check before committing if you regularly work in areas with poor connectivity.',
  },
  {
    question: 'How much do electrician apps cost in the UK?',
    answer:
      'Pricing models vary significantly. Some apps charge per certificate (typically £2 to £5 per cert), which can add up quickly if you produce many certificates each month. Others use a monthly subscription model. iCertifi offers various subscription tiers. CertsApp uses a credit-based system. Elec-Mate uses a flat monthly subscription starting from £4.99 per month with unlimited certificates, calculators, and AI tools included. All plans include a 7-day free trial so you can test the full feature set before committing.',
  },
  {
    question: 'Can I use an electrician app for BS 7671 calculations?',
    answer:
      'Some apps include calculators, but the range varies enormously. Generic calculator apps may cover a few basics like cable sizing or voltage drop. Elec-Mate includes over 50 specialist electrical calculators covering cable sizing (to BS 7671 Appendix 4), voltage drop, maximum demand, diversity, conduit and trunking fill, earth fault loop impedance, prospective fault current, disconnection times, cable ratings for grouping and ambient temperature, and many more. All calculations reference the current 18th Edition tables and formulae.',
  },
];

const features = [
  {
    icon: FileCheck2,
    title: '8 Certificate Types',
    description:
      'EICR, EIC, Minor Works, EV Charger, Solar PV, Fire Alarm, Emergency Lighting, and PAT Testing. Every form you need, digitally signed and exported as PDF.',
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
      'Circuit Designer, Cost Engineer, Installation Guide, Maintenance Agent, and Health & Safety specialist. AI trained on electrical industry data to help you work faster.',
  },
  {
    icon: GraduationCap,
    title: 'Full Training Courses',
    description:
      '18th Edition (BS 7671), Level 2 and Level 3 Electrical Installation, AM2 preparation, and EPA simulator. Study on the go between jobs or during quiet periods.',
  },
  {
    icon: Briefcase,
    title: 'Business Management',
    description:
      'Job scheduling, quoting, invoicing, client management, Stripe payment collection, and Xero accounting integration. Run your electrical business from one app.',
  },
  {
    icon: WifiOff,
    title: 'Works Offline',
    description:
      'Auto-saves locally every 10 seconds and syncs to the cloud when connectivity returns. Complete certificates in basements, plant rooms, or anywhere without signal.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'iOS, Android, Web',
  description: PAGE_DESCRIPTION,
  url: 'https://elec-mate.com/tools/best-electrician-app-uk',
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

const itemListSchema = {
  '@type': 'ItemList',
  name: 'Best Electrician Apps UK 2026',
  itemListOrder: 'https://schema.org/ItemListOrderDescending',
  numberOfItems: 4,
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Elec-Mate',
      description: 'All-in-one platform: 8 certificates, 50+ calculators, 5 AI tools, training courses, business management.',
      url: 'https://elec-mate.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'iCertifi',
      description: 'Established certificate-focused app for UK electricians. EICR, EIC, Minor Works, and basic calculators.',
    },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'CertsApp',
      description: 'Certificate and calculation app for electricians with a credit-based pricing model.',
    },
    {
      '@type': 'ListItem',
      position: 4,
      name: 'Generic Electrical Apps',
      description: 'Various standalone calculator and reference apps available on app stores.',
    },
  ],
};

export default function BestElectricianAppPage() {
  useSEO({
    title: 'Best Electrician App UK 2026 | Certificates, Calculators & AI Tools',
    description: PAGE_DESCRIPTION,
    schema: softwareAppSchema,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...softwareAppSchema })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...itemListSchema })}</script>
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <Award className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">2026 Comparison Guide</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Best <span className="text-yellow-400">Electrician App</span> UK 2026
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mb-8">
            A thorough, honest comparison of the top apps available to UK electricians. Certificates, calculators, AI tools, training, pricing, and offline support — everything you need to choose the right tool for your work.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
            >
              Start 7-Day Free Trial
            </a>
            <a
              href="#comparison-table"
              className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl touch-manipulation transition-colors"
            >
              See the Comparison
            </a>
          </div>
        </div>
      </section>

      {/* What to look for */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What to Look for in an Electrician App
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Choosing the right app can save you hours every week and reduce costly errors. But with several options on the market, how do you decide which one is worth your time and money? Here are the key criteria every UK electrician should evaluate before committing to a platform.
            </p>
            <p>
              <strong>Certificates:</strong> At a minimum, you need EICR, EIC, and Minor Works certificates. But modern electrical work increasingly involves EV charger installations, solar PV systems, fire alarm commissioning, emergency lighting verification, and portable appliance testing. The best apps cover all of these, not just the basics. Look for digital signatures, automatic observation coding, test value validation against BS 7671 maximum permitted values, and professional PDF export that meets scheme provider requirements.
            </p>
            <p>
              <strong>Calculators:</strong> A good electrician app should include calculators that reference the current 18th Edition tables directly. Cable sizing to BS 7671 Appendix 4, voltage drop verification, maximum demand calculations, diversity factors, conduit and trunking fill rates, earth fault loop impedance checks, prospective fault current, disconnection time verification, cable derating for grouping and ambient temperature — these are the calculations you do every day. Some apps include a handful; others include dozens.
            </p>
            <p>
              <strong>BS 7671 Compliance:</strong> The app should be built around the current edition of the Wiring Regulations — BS 7671:2018+A2:2022 — with an understanding that Amendment 3 (A3:2024) added Regulation 530.3.201 covering bidirectional and unidirectional devices. Any certificate forms should follow the model forms in Appendix 6, and calculations should reference the correct tables. An app that is not kept up to date with regulation changes is a liability.
            </p>
            <p>
              <strong>Ease of Use:</strong> Electricians work on site, often in poor lighting, wearing gloves, and under time pressure. The app must be mobile-first with large touch targets, clear navigation, and a workflow that matches how you actually complete an inspection or test. If it takes longer to use the app than to write on paper, it is not fit for purpose.
            </p>
            <p>
              <strong>Offline Support:</strong> Many electrical installations are in locations with poor or no mobile signal — basements, plant rooms, industrial units, rural properties. If the app requires a constant internet connection to function, it will let you down on site. Look for apps that save data locally and sync when connectivity returns.
            </p>
            <p>
              <strong>Pricing:</strong> Pricing models vary widely. Some apps charge per certificate, which can be economical if you only produce a few certificates per month but expensive for busy contractors. Others use monthly subscriptions with varying feature tiers. Consider the total cost based on your typical workload. A flat monthly fee with unlimited usage is usually the best value for working electricians who produce certificates regularly.
            </p>
          </div>
        </div>
      </section>

      {/* UK Market Overview */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            The UK Electrician App Market in 2026
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The market for electrician software in the UK has matured significantly over the past few years. What was once a niche dominated by desktop certificate packages has shifted to mobile-first apps designed for on-site use. Here is an honest overview of the main players.
            </p>
            <p>
              <strong>Elec-Mate</strong> is the newest and most comprehensive platform, designed as an all-in-one tool for UK electricians. It combines 8 certificate types, over 50 BS 7671 calculators, 5 AI specialist tools (Circuit Designer, Cost Engineer, Installation Guide, Maintenance Agent, Health & Safety), full training courses (18th Edition, Level 2, Level 3, AM2, EPA), and business management features (quoting, invoicing, job scheduling, Stripe payments, Xero integration) into a single mobile-first app. Pricing starts from £4.99 per month with unlimited usage and a 7-day free trial. It works on iOS, Android, and desktop via PWA.
            </p>
            <p>
              <strong>iCertifi</strong> is an established certificate-focused app that has been serving UK electricians for several years. It offers EICR, EIC, Minor Works, and some additional certificate types. It includes basic calculators and is well-regarded for its reliability and straightforward interface. iCertifi is a solid choice for electricians whose primary need is producing certificates quickly and professionally.
            </p>
            <p>
              <strong>CertsApp</strong> is another option in the certificate and calculation space. It provides various certificate types and some electrical calculators. It uses a credit-based pricing model where you purchase credits to generate certificates. CertsApp has built a following among electricians who appreciate its calculation features alongside its certification capabilities.
            </p>
            <p>
              <strong>Generic Electrical Apps</strong> include various standalone calculator apps, BS 7671 reference apps, and cable sizing tools available on the App Store and Google Play. These can be useful for specific tasks but do not offer the integrated workflow of a dedicated platform. You may end up using three or four separate apps to cover what a single comprehensive tool provides.
            </p>
            <p>
              <strong>Desktop Certificate Software</strong> such as Certsure and similar packages remain in use, particularly by larger contractors. These are typically more expensive, require a PC, and do not offer mobile on-site use. They serve their purpose for office-based administration but are less suited to the modern workflow of completing certificates on site and sending them to clients before leaving the property.
            </p>
          </div>
        </div>
      </section>

      {/* Comparison Table */}
      <section id="comparison-table" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Feature-by-Feature Comparison
          </h2>
          <p className="text-white leading-relaxed mb-8">
            This table compares the core features across the main electrician apps available in the UK. We have done our best to be accurate and fair — features and pricing may change, so always check the latest information from each provider before making your decision.
          </p>

          {/* Mobile-friendly comparison cards */}
          <div className="space-y-4">
            {[
              {
                feature: 'Certificate Types',
                elecmate: '8 (EICR, EIC, Minor Works, EV Charger, Solar PV, Fire Alarm, Emergency Lighting, PAT)',
                icertifi: 'EICR, EIC, Minor Works + others',
                certsapp: 'Various certificate types',
                generic: 'None or very limited',
                elecmateStatus: 'check',
                icertifiStatus: 'check',
                certsappStatus: 'check',
                genericStatus: 'x',
              },
              {
                feature: 'BS 7671 Calculators',
                elecmate: '50+ (cable sizing, voltage drop, Zs, max demand, diversity, conduit/trunking fill, and more)',
                icertifi: 'Basic / limited selection',
                certsapp: 'Some calculators included',
                generic: 'Varies — standalone apps may cover 5-10',
                elecmateStatus: 'check',
                icertifiStatus: 'partial',
                certsappStatus: 'partial',
                genericStatus: 'partial',
              },
              {
                feature: 'AI Tools',
                elecmate: '5 specialists (Circuit Designer, Cost Engineer, Installation Guide, Maintenance Agent, Health & Safety)',
                icertifi: 'None',
                certsapp: 'None',
                generic: 'None',
                elecmateStatus: 'check',
                icertifiStatus: 'x',
                certsappStatus: 'x',
                genericStatus: 'x',
              },
              {
                feature: 'Training Courses',
                elecmate: '18th Edition, Level 2/3, AM2, EPA simulator',
                icertifi: 'None',
                certsapp: 'None',
                generic: 'None',
                elecmateStatus: 'check',
                icertifiStatus: 'x',
                certsappStatus: 'x',
                genericStatus: 'x',
              },
              {
                feature: 'Business Management',
                elecmate: 'Job scheduling, quoting, invoicing, Stripe/Xero',
                icertifi: 'Limited',
                certsapp: 'Limited',
                generic: 'None',
                elecmateStatus: 'check',
                icertifiStatus: 'partial',
                certsappStatus: 'partial',
                genericStatus: 'x',
              },
              {
                feature: 'Offline Support',
                elecmate: 'Full offline with auto-sync',
                icertifi: 'Varies by feature',
                certsapp: 'Varies by feature',
                generic: 'Varies',
                elecmateStatus: 'check',
                icertifiStatus: 'partial',
                certsappStatus: 'partial',
                genericStatus: 'partial',
              },
              {
                feature: 'Pricing Model',
                elecmate: 'Flat monthly from £4.99, unlimited',
                icertifi: 'Subscription tiers / per-certificate options',
                certsapp: 'Credit-based / subscription',
                generic: 'Free or one-time purchase (limited features)',
                elecmateStatus: 'check',
                icertifiStatus: 'check',
                certsappStatus: 'check',
                genericStatus: 'partial',
              },
            ].map((row) => (
              <div key={row.feature} className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden">
                <div className="p-4 border-b border-white/10 bg-white/[0.02]">
                  <h3 className="font-bold text-white text-lg">{row.feature}</h3>
                </div>
                <div className="grid sm:grid-cols-2 gap-px bg-white/5">
                  {[
                    { name: 'Elec-Mate', value: row.elecmate, status: row.elecmateStatus },
                    { name: 'iCertifi', value: row.icertifi, status: row.icertifiStatus },
                    { name: 'CertsApp', value: row.certsapp, status: row.certsappStatus },
                    { name: 'Generic Apps', value: row.generic, status: row.genericStatus },
                  ].map((app) => (
                    <div key={app.name} className="p-4 bg-[#0a0a0a]">
                      <div className="flex items-center gap-2 mb-2">
                        {app.status === 'check' && <Check className="w-4 h-4 text-green-400 shrink-0" />}
                        {app.status === 'x' && <X className="w-4 h-4 text-red-400 shrink-0" />}
                        {app.status === 'partial' && <Minus className="w-4 h-4 text-yellow-400 shrink-0" />}
                        <span className="font-semibold text-white text-sm">{app.name}</span>
                      </div>
                      <p className="text-white text-sm leading-relaxed">{app.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What makes Elec-Mate different */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Makes Elec-Mate Different
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The fundamental difference is scope. Most electrician apps solve one or two problems well — typically certificates and perhaps a few calculators. Elec-Mate was designed from the ground up to be the single platform that covers everything a UK electrician needs in their daily work. Instead of switching between a certificate app, a calculator app, a training platform, and separate business software, everything lives in one place.
            </p>
            <p>
              The AI tools are a significant differentiator. Elec-Mate includes five AI specialist agents, each trained on electrical industry data. The Circuit Designer helps plan circuit layouts and checks against BS 7671 requirements. The Cost Engineer uses real trade pricing data and labour timing to produce accurate job estimates. The Installation Guide provides step-by-step guidance for specific installation scenarios. The Maintenance Agent helps diagnose faults and plan maintenance schedules. The Health & Safety specialist generates RAMS (Risk Assessments and Method Statements) tailored to electrical work.
            </p>
            <p>
              No other electrician app on the UK market currently offers AI tools of this kind. As the industry continues to evolve, AI assistance will become as standard as digital certificates have become — and Elec-Mate is the first platform to bring these capabilities to working electricians.
            </p>
            <p>
              The training platform is another area where Elec-Mate stands alone. Full courses covering the 18th Edition (BS 7671:2018+A2:2022), City & Guilds Level 2 and Level 3 Electrical Installation, AM2 assessment preparation, and an End Point Assessment simulator are built into the app. Whether you are an apprentice studying for your qualifications or a qualified electrician revising for a regulation update, the learning material is always in your pocket.
            </p>
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Who Should Use an Electrician App?
          </h2>
          <div className="space-y-6">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-yellow-400" />
                </div>
                <h3 className="font-bold text-white text-lg">Sole Trader Electricians</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                If you run your own electrical business, you need to handle everything yourself: inspecting, testing, certifying, quoting, invoicing, and chasing payments. An all-in-one app eliminates the admin overhead. Complete the EICR on site, email the PDF to the landlord before you leave, generate the invoice from the same app, and collect payment via Stripe — all without returning to an office or opening a laptop. The time savings alone justify the subscription cost within the first week.
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/25 flex items-center justify-center">
                  <Users className="w-5 h-5 text-blue-400" />
                </div>
                <h3 className="font-bold text-white text-lg">Electrical Contractors with Teams</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                For businesses with multiple electricians, consistency and quality control matter. An app ensures every team member follows the same certificate format, uses validated calculations, and produces professional documentation. The Cost Engineer AI can standardise your quoting process so prices are consistent regardless of who prepares the estimate. Job scheduling keeps everyone coordinated without needing a separate project management tool.
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/25 flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-green-400" />
                </div>
                <h3 className="font-bold text-white text-lg">Apprentices</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Electrical apprentices benefit from having training materials, calculators, and reference tools in one app. The built-in courses cover Level 2 and Level 3 Electrical Installation, the 18th Edition, AM2 preparation, and EPA simulation. You can study between jobs, revise on the commute, and use the calculators to check your understanding of BS 7671 calculations. When you qualify, the same app transitions seamlessly into your professional toolkit.
              </p>
            </div>

            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/15 border border-purple-500/25 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-purple-400" />
                </div>
                <h3 className="font-bold text-white text-lg">College Tutors</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Tutors delivering electrical installation courses can use Elec-Mate as a teaching aid. The calculators demonstrate BS 7671 calculations in real time, the certificate forms show students the correct format and workflow, and the training platform aligns with the curriculum. Having a single platform that mirrors the tools students will use in the field bridges the gap between classroom theory and site practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Comparison */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Pricing Comparison: Flat Monthly vs Per-Certificate
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Pricing is often the deciding factor when choosing an electrician app, so it is worth understanding the different models and how they affect your costs over time.
            </p>
            <p>
              <strong>Per-certificate pricing</strong> charges you each time you generate a certificate — typically between £2 and £5 per cert depending on the type. If you produce 5 certificates per month, that is £10 to £25. If you produce 20, it is £40 to £100. This model works for electricians who rarely produce certificates, but costs escalate quickly for busy contractors. It also creates a psychological barrier to producing certificates — you may be tempted to skip a certificate for a small job to avoid the charge.
            </p>
            <p>
              <strong>Tiered subscriptions</strong> offer different feature sets at different price points. The lowest tier may include only basic certificates, while calculators, additional certificate types, or business features require a higher tier. This can be cost-effective if the lowest tier covers your needs, but you often end up paying more than expected once you discover which features you actually need.
            </p>
            <p>
              <strong>Flat monthly pricing with unlimited usage</strong> is the model Elec-Mate uses. Starting from £4.99 per month, every feature is included: all 8 certificate types, all 50+ calculators, all 5 AI tools, all training courses, and all business management features. There is no per-certificate charge, no feature gating, and no surprise costs. The 7-day free trial gives you full access to everything so you can evaluate the platform properly before committing.
            </p>
            <p>
              For a sole trader producing 10 to 15 certificates per month and using calculators daily, the flat monthly model typically saves £20 to £50 per month compared to per-certificate alternatives — and you get all the additional features (AI tools, training, business management) that other apps simply do not offer at any price.
            </p>
          </div>
        </div>
      </section>

      {/* Why AI Tools Matter */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Why AI Tools Matter for Modern Electricians
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Artificial intelligence is transforming every industry, and the electrical trade is no exception. AI does not replace the skill and experience of a qualified electrician — it augments it. Think of AI tools as a knowledgeable colleague who can instantly check regulations, estimate costs, draft risk assessments, and suggest circuit layouts while you focus on the hands-on work.
            </p>
            <p>
              The <strong>Circuit Designer</strong> analyses your project requirements and suggests circuit arrangements that comply with BS 7671. It considers factors like diversity, cable grouping, ambient temperature, and protective device coordination — the same calculations you would do manually, but completed in seconds with full traceability.
            </p>
            <p>
              The <strong>Cost Engineer</strong> uses real trade pricing data and labour timing intelligence to produce detailed job estimates. Instead of guessing material costs or underestimating labour hours, you get accurate quotes based on current market prices. This directly improves your profitability by ensuring you charge enough for every job.
            </p>
            <p>
              The <strong>Health & Safety specialist</strong> generates RAMS (Risk Assessments and Method Statements) tailored to your specific job. Instead of copying a generic template and changing the address, you get a site-specific document that demonstrates genuine thought about the hazards and controls relevant to that installation. This matters for commercial work where main contractors require detailed RAMS before you can start.
            </p>
            <p>
              As the electrical industry becomes more complex — with EV chargers, battery storage, solar PV, and smart systems becoming standard work — AI tools help electricians stay on top of the expanding knowledge required. They are not a replacement for training and experience; they are a force multiplier that helps you work faster, quote more accurately, and produce better documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Why Electricians Choose Elec-Mate
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
        heading="Try the most complete electrician app in the UK"
        subheading="8 certificates, 50+ calculators, 5 AI tools, full training courses, and business management. 7-day free trial, cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </PublicPageLayout>
  );
}
