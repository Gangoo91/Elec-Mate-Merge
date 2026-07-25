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
} from 'lucide-react';

export default function ElecMateVsJobberPage() {
  return (
    <ComparisonTemplate
      title="Elec-Mate vs Jobber (2026): Which for UK Electricians?"
      description="Jobber is polished North-American field-service software priced in US dollars. Elec-Mate is UK-electrician-only: BS 7671 certificates, AI site tools, 70+ calculators and training at £19.99/month flat. Honest 2026 comparison."
      datePublished="2026-07-24"
      dateModified="2026-07-24"
      breadcrumbs={[
        { label: 'Comparisons', href: '/compare' },
        { label: 'Elec-Mate vs Jobber', href: '/compare/elec-mate-vs-jobber' },
      ]}
      tocItems={[
        { id: 'what-is-jobber', label: 'What Is Jobber?' },
        { id: 'what-is-elec-mate', label: 'What Is Elec-Mate?' },
        { id: 'uk-fit', label: 'The UK Fit Question' },
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
          <span className="text-yellow-400">Jobber</span>
        </>
      }
      heroSubtitle="Jobber is one of the most polished field-service platforms in North America, and it works in the UK too. But it prices in US dollars, knows nothing about BS 7671, and leaves certificates, calculators, RAMS and training to other apps. Here is the honest comparison for UK electricians."
      readingTime={8}
      comparisonColumns={['Feature', 'Elec-Mate', 'Jobber']}
      comparisonRows={[
        { feature: 'Built for UK electricians', values: [true, 'All field services'] },
        { feature: 'BS 7671 certificates (EICR, EIC, Minor Works…)', values: [true, false] },
        { feature: 'UK pricing in pounds', values: [true, 'Priced in USD'] },
        { feature: 'AI Board Scanner + Voice Test Entry', values: [true, false] },
        { feature: '70+ BS 7671 calculators', values: [true, false] },
        { feature: 'AI RAMS generator', values: [true, false] },
        { feature: 'Training courses + mock exams', values: [true, false] },
        { feature: 'Quoting & invoicing', values: [true, true] },
        { feature: 'Job scheduling & dispatch', values: [true, true] },
        { feature: 'Card payment collection', values: [true, true] },
        { feature: 'Customer portal / client hub', values: [true, true] },
        { feature: 'Flat monthly price', values: [true, 'Tiered + per-user fees'] },
        { feature: 'Apprentice learning hub', values: [true, false] },
      ]}
      comparisonHeading="Feature-by-Feature Comparison"
      keyTakeaways={[
        'Jobber is excellent generic field-service software — scheduling, quoting, invoicing and client communication are genuinely polished. None of it knows what an EICR is.',
        'Jobber prices in US dollars even for UK businesses (Core from $39/month, Connect $119, Grow $199, with team plans and $29/month per extra user) — so UK users carry exchange-rate movement and card fees on top.',
        'Elec-Mate is £19.99/month flat in pounds, and the subscription covers what Jobber leaves out: BS 7671 certificates, AI site tools, 70+ calculators, RAMS and training.',
        'For a UK electrician the compliance layer is not optional — certificates and BS 7671 maths happen every working day. With Jobber they live in a second app; with Elec-Mate they are the app.',
        'If you run a large mixed field-service fleet (cleaning, landscaping, HVAC), Jobber’s dispatch depth is a fair reason to pick it. For electrical work in the UK, purpose-built wins.',
      ]}
      sections={[
        {
          id: 'what-is-jobber',
          heading: 'What Is Jobber?',
          content: (
            <>
              <p>
                Jobber is a Canadian field-service management platform used across North America
                and available in the UK. It covers the service-business backbone — requests,
                quotes, scheduling and dispatch, invoicing, payments and a well-liked client hub —
                with strong mobile apps and a 14-day free trial.
              </p>
              <p>
                Pricing is tiered and in US dollars: individual plans from roughly $39/month
                (Core) through $119 (Connect) and $199 (Grow), team plans above that, and
                additional users at about $29/month. UK customers pay in USD-linked pricing, which
                moves with the exchange rate and can attract card conversion fees.
              </p>
              <p>
                <strong>Jobber's strengths:</strong> polish, scheduling and dispatch maturity,
                client communication, and a large ecosystem. As trade-agnostic software it is among
                the best in its class.
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
                Elec-Mate is built only for UK electricians. The business backbone is there —
                quoting, invoicing, scheduling, Stripe payments, Xero sync — and so is the
                electrical layer Jobber does not attempt: 16 certificate types to BS
                7671:2018+A4:2026 with AI-assisted completion, 70+{' '}
                <SEOInternalLink href="/electrical-testing-calculators">
                  BS 7671 calculators
                </SEOInternalLink>
                , AI-generated RAMS, and 46+ training courses with{' '}
                <SEOInternalLink href="/mock-exams">free mock exams</SEOInternalLink> for the 18th
                Edition, 2391 and AM2.
              </p>
              <p>
                £19.99/month flat, in pounds, everything included, 7-day free trial.
              </p>
            </>
          ),
        },
        {
          id: 'uk-fit',
          heading: 'The UK Fit Question',
          content: (
            <>
              <p>
                Two things decide this comparison for most UK electricians. The first is
                compliance: every EICR, EIC and Minor Works certificate, every Zs check against
                BS 7671 maximums, every RAMS pack for a commercial job. Jobber has no answer to any
                of these — they happen in other software, on paper, or not at all.
              </p>
              <SEOAppBridge
                title="The Compliance Layer Is the Point"
                description="Certificates, BS 7671 calculators and RAMS are daily work for UK electricians — Elec-Mate builds the business tools around them, not instead of them."
                icon={FileCheck2}
              />
              <p>
                The second is money: Jobber’s USD pricing means a UK sole trader on Grow pays
                roughly £160/month equivalent (moving with the exchange rate) before adding the
                certificate app, calculator app and training subscriptions. Elec-Mate is £19.99
                flat and replaces the stack.
              </p>
            </>
          ),
        },
      ]}
      verdictHeading="The Verdict"
      verdictContent={
        <>
          <p>
            Jobber is genuinely good software with real polish — if your business is
            multi-service field work and BS 7671 never crosses your desk, it deserves its
            reputation.
          </p>
          <p>
            For a UK electrician, it solves the smaller half of the problem in the wrong currency.
            Elec-Mate covers the business side and the electrical side — certificates that fill
            from a photo and your voice, calculators, RAMS, training — for a flat £19.99/month.
          </p>
          <p>
            Both offer free trials. Price a job, do it, certify it and bill it in each — the
            certificate step is where the comparison ends for most sparks.
          </p>
        </>
      }
      uniqueFeatures={[
        {
          icon: FileCheck2,
          title: '16 BS 7671 Certificate Types',
          description:
            'EICR, EIC, Minor Works, EV, solar PV, fire alarm, emergency lighting, PAT — none exist in Jobber.',
        },
        {
          icon: Camera,
          title: 'AI Board Scanner',
          description:
            'Photograph the consumer unit; the circuit schedule fills itself.',
        },
        {
          icon: Calculator,
          title: '70+ BS 7671 Calculators',
          description:
            'Cable sizing, volt drop, Zs, disconnection times, max demand, adiabatic — on site.',
        },
        {
          icon: Brain,
          title: 'AI RAMS Generator',
          description:
            'Site-specific RAMS for commercial work in minutes.',
        },
        {
          icon: GraduationCap,
          title: 'Training + Mock Exams',
          description:
            '46+ courses and 20,000+ questions — 18th Edition, 2391, AM2, apprentice quals.',
        },
        {
          icon: PoundSterling,
          title: '£19.99/Month in Pounds',
          description:
            'Flat UK pricing — no USD conversion, no exchange-rate drift, no per-user multipliers on the core plan.',
        },
      ]}
      uniqueFeaturesHeading="What Only Elec-Mate Offers"
      faqs={[
        {
          question: 'Is Elec-Mate better than Jobber for UK electricians?',
          answer:
            'For UK electricians, yes. Jobber is polished field-service software, but it has no BS 7671 certificates, no electrical calculators, no RAMS and no training — and it prices in US dollars. Elec-Mate covers the same business workflow plus the entire electrical compliance layer at £19.99/month flat in pounds.',
        },
        {
          question: 'Does Jobber work in the UK?',
          answer:
            'Yes — Jobber operates in the UK and shows pricing locally, but its pricing is US-dollar based (Core from around $39/month up to Grow at $199/month, plus about $29/month per extra user). UK businesses carry the exchange-rate movement. It remains trade-agnostic: no UK electrical certification or BS 7671 tooling.',
        },
        {
          question: 'How much does Jobber cost compared to Elec-Mate?',
          answer:
            'Jobber (2026): individual plans roughly $39–$199/month, team plans from $169, extra users about $29/month — see getjobber.com for current rates. Elec-Mate: £19.99/month flat with certificates, AI tools, calculators, RAMS, training and business management all included, 7-day free trial.',
        },
        {
          question: 'Can Jobber produce an EICR or Minor Works certificate?',
          answer:
            'No. Jobber has no BS 7671 certification. UK electricians using Jobber run a separate certificate app alongside it. Elec-Mate includes 16 certificate types with AI-assisted completion in the standard subscription.',
        },
        {
          question: 'When is Jobber the better choice?',
          answer:
            'If you run a larger multi-service operation — cleaning, landscaping, HVAC alongside electrical — Jobber’s scheduling and dispatch depth across generic field service is a legitimate reason to choose it, with a certificate app bolted on for the electrical work. For dedicated UK electrical businesses, one purpose-built platform is simpler and cheaper.',
        },
      ]}
      relatedPages={[
        {
          href: '/compare/elec-mate-vs-tradify',
          title: 'Elec-Mate vs Tradify',
          description: 'Against the other big trade-agnostic job manager.',
          icon: Briefcase,
          category: 'Comparison',
        },
        {
          href: '/compare/elec-mate-vs-servicem8',
          title: 'Elec-Mate vs ServiceM8',
          description: 'Against the job-based-pricing field service app.',
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
          href: '/compare/best-quoting-app-electricians',
          title: 'Best Quoting App for Electricians',
          description: 'UK quoting tools compared.',
          icon: PoundSterling,
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
      ctaHeading="UK trade. UK regs. UK pounds."
      ctaSubheading="Everything a UK electrician needs in one app — free for 7 days."
      comparePath="/compare/elec-mate-vs-jobber"
    />
  );
}
