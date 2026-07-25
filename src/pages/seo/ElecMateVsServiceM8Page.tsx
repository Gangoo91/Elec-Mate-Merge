import ComparisonTemplate from '@/pages/seo/templates/ComparisonTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Camera,
  Brain,
  FileCheck2,
  Calculator,
  GraduationCap,
  Briefcase,
  PoundSterling,
  Sparkles,
  Zap,
  Users,
} from 'lucide-react';

export default function ElecMateVsServiceM8Page() {
  return (
    <ComparisonTemplate
      title="Elec-Mate vs ServiceM8 (2026): UK Electricians Compared"
      description="ServiceM8 offers unlimited users with job-based pricing tiers. Elec-Mate is UK-electrician-only: BS 7671 certificates, AI site tools, 70+ calculators and training at £19.99/month. Honest 2026 comparison."
      datePublished="2026-07-24"
      dateModified="2026-07-24"
      breadcrumbs={[
        { label: 'Comparisons', href: '/compare' },
        { label: 'Elec-Mate vs ServiceM8', href: '/compare/elec-mate-vs-servicem8' },
      ]}
      tocItems={[
        { id: 'what-is-servicem8', label: 'What Is ServiceM8?' },
        { id: 'what-is-elec-mate', label: 'What Is Elec-Mate?' },
        { id: 'pricing-models', label: 'Job-Based vs Flat Pricing' },
        { id: 'comparison', label: 'Feature Comparison Table' },
        { id: 'verdict', label: 'The Verdict' },
        { id: 'unique-features', label: 'What Only Elec-Mate Offers' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="2026 Comparison"
      badgeIcon={Zap}
      heroTitle={
        <>
          <span className="text-yellow-400">Elec-Mate</span> vs{' '}
          <span className="text-yellow-400">ServiceM8</span>
        </>
      }
      heroSubtitle="ServiceM8 is a mature field-service app with an unusual model: unlimited users, priced by jobs per month. It is good at what it does — and what it does not do is UK electrical work. No BS 7671 certificates, no calculators, no RAMS, no training. The honest comparison for UK sparks."
      readingTime={8}
      comparisonColumns={['Feature', 'Elec-Mate', 'ServiceM8']}
      comparisonRows={[
        { feature: 'Built for UK electricians', values: [true, 'All field services'] },
        { feature: 'BS 7671 certificates (EICR, EIC, Minor Works…)', values: [true, false] },
        { feature: 'AI Board Scanner + Voice Test Entry', values: [true, false] },
        { feature: '70+ BS 7671 calculators', values: [true, false] },
        { feature: 'AI RAMS generator', values: [true, false] },
        { feature: 'Training courses + mock exams', values: [true, false] },
        { feature: 'Quoting & invoicing', values: [true, true] },
        { feature: 'Job scheduling & dispatch', values: [true, true] },
        { feature: 'Card payment collection', values: [true, true] },
        { feature: 'Unlimited team members', values: ['Employer plans', true] },
        { feature: 'Pricing model', values: ['£19.99/mo flat', 'By jobs per month'] },
        { feature: 'Job volume caps', values: [false, 'Per tier (e.g. 50/150/500)'] },
        { feature: 'Apprentice learning hub', values: [true, false] },
      ]}
      comparisonHeading="Feature-by-Feature Comparison"
      keyTakeaways={[
        'ServiceM8’s model is genuinely different: unlimited users on every plan, priced by job volume (Starter around 50 jobs/month, Growing around 150, Premium around 500). For a team doing simple, high-volume jobs it can be cost-effective.',
        'None of ServiceM8 is electrical: no BS 7671 certificates, no calculators, no RAMS, no training. The compliance half of a UK electrician’s day lives elsewhere.',
        'Elec-Mate is £19.99/month flat with no job caps — quote, certify and invoice as much as you like, with the AI, calculators and training included.',
        'Job-cap pricing punishes busy months: blow through your tier’s job allowance and you are upgrading mid-month. Flat pricing does not care how good your month is.',
        'ServiceM8 is iOS-first heritage (excellent iPhone/iPad apps); check current Android fit if your team is mixed. Elec-Mate ships native iOS and Android.',
      ]}
      sections={[
        {
          id: 'what-is-servicem8',
          heading: 'What Is ServiceM8?',
          content: (
            <>
              <p>
                ServiceM8 is a field-service management app from Australia with a strong following
                among small service businesses. It handles job cards, scheduling, quoting,
                invoicing, payments and client communication, with a distinctive pricing model:
                every plan includes unlimited staff, and tiers are set by the number of jobs you
                create per month (roughly 50 on Starter, 150 on Growing, 500 on Premium), billed in
                GBP + VAT for UK customers with no contracts.
              </p>
              <p>
                <strong>ServiceM8's strengths:</strong> unlimited users at every price point, a
                mature and stable product, strong iPhone/iPad apps, and bundled extras like SMS in
                the plan price. For high-headcount, high-volume simple work it is a smart model.
              </p>
            </>
          ),
        },
        {
          id: 'what-is-elec-mate',
          heading: 'What Is Elec-Mate?',
          content: (
            <>
              <p>
                Elec-Mate is the UK-electrician platform: 16 BS 7671:2018+A4:2026 certificate
                types with AI-assisted completion, 70+{' '}
                <SEOInternalLink href="/electrical-testing-calculators">
                  calculators
                </SEOInternalLink>
                , AI RAMS, 46+ training courses with{' '}
                <SEOInternalLink href="/mock-exams">free mock exams</SEOInternalLink>, and the
                business layer — quoting, invoicing, scheduling, Stripe payments, Xero sync —
                built around the electrical work.
              </p>
              <p>
                £19.99/month flat with no job caps, 7-day free trial; team features on the
                employer plans.
              </p>
            </>
          ),
        },
        {
          id: 'pricing-models',
          heading: 'Job-Based vs Flat Pricing',
          content: (
            <>
              <p>
                ServiceM8’s job-based tiers reward large teams doing few jobs — and penalise small
                teams doing many. A busy sole trader or two-man band can hit a 50-job monthly cap
                with routine call-out work, forcing a mid-month upgrade decision in the middle of
                your best month.
              </p>
              <SEOAppBridge
                title="No Caps on a Good Month"
                description="Elec-Mate is £19.99/month whatever you do: unlimited jobs, quotes, certificates and invoices."
                icon={PoundSterling}
              />
              <p>
                The deeper difference is still scope. However the admin is priced, a UK electrician
                on ServiceM8 needs a second app for every certificate, a calculator for every
                cable size, and separate RAMS and training. Elec-Mate includes them.
              </p>
            </>
          ),
        },
      ]}
      verdictHeading="The Verdict"
      verdictContent={
        <>
          <p>
            ServiceM8 earned its following: unlimited users per plan is a genuinely fair model for
            service teams, and the product is mature. If you run a mixed field-service business
            with lots of staff doing simple jobs, it is worth its look.
          </p>
          <p>
            For a UK electrician, the daily work is certificates, testing and BS 7671 maths —
            none of which ServiceM8 does. Elec-Mate covers the admin and the electrical work in
            one flat £19.99/month with no job caps.
          </p>
          <p>
            Run the trials side by side on a week of real work — the first EICR decides it for
            most sparks.
          </p>
        </>
      }
      uniqueFeatures={[
        {
          icon: FileCheck2,
          title: '16 BS 7671 Certificate Types',
          description:
            'EICR, EIC, Minor Works, EV, solar PV, fire alarm, emergency lighting, PAT — ServiceM8 has none.',
        },
        {
          icon: Camera,
          title: 'AI Board Scanner',
          description:
            'Photograph the board; the AI fills the circuit schedule into your certificate.',
        },
        {
          icon: Calculator,
          title: '70+ BS 7671 Calculators',
          description:
            'Cable sizing, Zs, volt drop, disconnection times, max demand — on site, in the same app.',
        },
        {
          icon: Brain,
          title: 'AI RAMS Generator',
          description:
            'Commercial-ready RAMS in minutes, not evenings.',
        },
        {
          icon: GraduationCap,
          title: 'Training + Mock Exams',
          description:
            '46+ courses, 20,000+ questions — 18th Edition, 2391, AM2 and apprentice quals.',
        },
        {
          icon: PoundSterling,
          title: 'No Job Caps',
          description:
            '£19.99/month flat — your best month costs the same as your quietest.',
        },
      ]}
      uniqueFeaturesHeading="What Only Elec-Mate Offers"
      faqs={[
        {
          question: 'Is Elec-Mate better than ServiceM8 for UK electricians?',
          answer:
            'For UK electricians, yes — ServiceM8 is solid field-service admin, but it produces no BS 7671 certificates, has no electrical calculators, no RAMS and no training. Elec-Mate includes the full electrical compliance layer plus quoting, invoicing and payments at £19.99/month flat with no job caps.',
        },
        {
          question: 'How does ServiceM8 pricing work?',
          answer:
            'ServiceM8 bundles unlimited users into every plan and prices by job volume instead — tiers around 50 jobs/month (Starter), 150 (Growing) and 500 (Premium), billed in GBP + VAT with no contracts; see servicem8.com/uk/pricing for current numbers. Elec-Mate is a flat £19.99/month with unlimited jobs, quotes, certificates and invoices.',
        },
        {
          question: 'Can ServiceM8 produce electrical certificates?',
          answer:
            'ServiceM8 supports generic forms and documents, but it does not provide BS 7671 electrical certification — no EICR, EIC or Minor Works Certificates built to UK requirements. UK electricians on ServiceM8 typically run a dedicated certificate app alongside it. Elec-Mate includes 16 UK certificate types with AI-assisted completion.',
        },
        {
          question: 'When is ServiceM8 the better choice?',
          answer:
            'When headcount is high and the work is simple: unlimited users per plan makes ServiceM8 very cost-effective for larger teams doing high volumes of straightforward jobs across mixed trades. For electrical businesses whose work revolves around testing, certification and BS 7671 compliance, a purpose-built platform covers far more of the day.',
        },
        {
          question: 'Does Elec-Mate work on Android as well as iOS?',
          answer:
            'Yes — native apps on both, plus the web app. ServiceM8 grew up iOS-first with excellent iPhone/iPad apps; if your team carries mixed devices, check its current Android capabilities against your workflow.',
        },
      ]}
      relatedPages={[
        {
          href: '/compare/elec-mate-vs-jobber',
          title: 'Elec-Mate vs Jobber',
          description: 'Against the North-American field-service platform.',
          icon: Briefcase,
          category: 'Comparison',
        },
        {
          href: '/compare/elec-mate-vs-tradify',
          title: 'Elec-Mate vs Tradify',
          description: 'Against the trade-agnostic job manager.',
          icon: Zap,
          category: 'Comparison',
        },
        {
          href: '/compare/elec-mate-vs-powered-now',
          title: 'Elec-Mate vs Powered Now',
          description: 'Against the UK trade app with certificates.',
          icon: FileCheck2,
          category: 'Comparison',
        },
        {
          href: '/compare/electrician-app-android',
          title: 'Best Electrician App for Android',
          description: 'The Android electrician app landscape for 2026.',
          icon: Users,
          category: 'Comparison',
        },
        {
          href: '/guides/best-eicr-software-uk',
          title: 'Best EICR Software UK',
          description: 'Complete 2026 review of EICR software.',
          icon: GraduationCap,
          category: 'Guide',
        },
        {
          href: '/electrical-quoting-app',
          title: 'Electrical Quoting App',
          description: 'AI-assisted quotes with real UK trade pricing.',
          icon: Sparkles,
          category: 'Tools',
        },
      ]}
      ctaHeading="The compliance half matters"
      ctaSubheading="Certificates, calculators, RAMS and training with your quoting and invoicing — free for 7 days."
      comparePath="/compare/elec-mate-vs-servicem8"
    />
  );
}
