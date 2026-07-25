import ComparisonTemplate from '@/pages/seo/templates/ComparisonTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Camera,
  Mic,
  Brain,
  FileCheck2,
  Calculator,
  GraduationCap,
  Briefcase,
  PoundSterling,
  Sparkles,
  Zap,
} from 'lucide-react';

export default function ElecMateVsTradeCertPage() {
  return (
    <ComparisonTemplate
      title="Elec-Mate vs Tradecert (2026): AI Certification Compared"
      description="Tradecert offers AI-assisted certificates at £18/month with AI metered by tokens. Elec-Mate includes unmetered AI plus 70+ calculators, RAMS, quoting, invoicing and training at £19.99/month. Honest 2026 comparison."
      datePublished="2026-07-24"
      dateModified="2026-07-24"
      breadcrumbs={[
        { label: 'Comparisons', href: '/compare' },
        { label: 'Elec-Mate vs Tradecert', href: '/compare/elec-mate-vs-tradecert' },
      ]}
      tocItems={[
        { id: 'what-is-tradecert', label: 'What Is Tradecert?' },
        { id: 'what-is-elec-mate', label: 'What Is Elec-Mate?' },
        { id: 'ai-comparison', label: 'AI: Included vs Metered' },
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
          <span className="text-yellow-400">Tradecert</span>
        </>
      }
      heroSubtitle="Tradecert deserves credit: it brought AI circuit extraction to certification at £18/month with unlimited certificates. The differences are how the AI is charged — Tradecert meters it in tokens, Elec-Mate includes it — and everything beyond certificates: calculators, RAMS, quoting, invoicing, payments and training."
      readingTime={8}
      comparisonColumns={['Feature', 'Elec-Mate', 'Tradecert']}
      comparisonRows={[
        { feature: 'Unlimited BS 7671 certificates', values: [true, true] },
        { feature: 'AI circuit extraction from board photos', values: [true, true] },
        { feature: 'AI included without metering', values: [true, '250 tokens/mo, then 2p/token'] },
        { feature: 'Voice/notes input', values: ['Full spoken test-schedule dictation', 'Notes → fields (e.g. "Ze 0.25")'] },
        { feature: 'AI Remedial Cost Estimator (priced quote from defects)', values: [true, false] },
        { feature: '5 specialist AI agents (design, cost, H&S…)', values: [true, false] },
        { feature: '70+ BS 7671 calculators', values: [true, false] },
        { feature: 'Quoting & invoicing built in', values: [true, false] },
        { feature: 'Stripe payment collection', values: [true, false] },
        { feature: 'AI RAMS generator', values: [true, false] },
        { feature: 'Training courses + mock exams', values: [true, false] },
        { feature: 'Apprentice learning hub', values: [true, false] },
        { feature: 'Cloud sync across devices', values: [true, true] },
        { feature: 'Price', values: ['£19.99/mo flat', '£18/mo + £7/extra user + AI tokens'] },
      ]}
      comparisonHeading="Feature-by-Feature Comparison"
      keyTakeaways={[
        'Tradecert is the closest competitor to Elec-Mate on certification: unlimited certificates, every major certificate type, and real AI circuit extraction at £18/month with no contract.',
        'The AI pricing model is the first difference: Tradecert gives 250 free AI tokens a month then charges 2p per token; Elec-Mate includes AI board scanning, voice entry, defect coding and remedial pricing without metering — heavy AI users pay the same £19.99.',
        'The scope is the second: Tradecert is a certification app. Elec-Mate adds 70+ BS 7671 calculators, AI RAMS, quoting, invoicing, Stripe payments, Xero sync and 46+ training courses in the same subscription.',
        'On a busy testing week, an electrician scanning boards and coding defects all day wants AI that does not tick a meter.',
        'Both are modern, cloud-synced, mobile-first UK products — this is the fairest fight on this site, and it comes down to metering and scope.',
      ]}
      sections={[
        {
          id: 'what-is-tradecert',
          heading: 'What Is Tradecert?',
          content: (
            <>
              <p>
                Tradecert is UK electrical certification software with real AI assistance — EICRs,
                EICs, Minor Works, solar PV, EV charger, emergency lighting, fire and PAT
                certificates, with AI circuit extraction from board photos, automated
                BS 7671-referenced observations, and notes-to-fields input (type or dictate
                "Ze 0.25" and the field fills). It adds proper team features: real-time
                multi-user editing, version history, offline sync and free office users, with a
                Kewtech partnership.
              </p>
              <p>
                Pricing is per user and per token: £18/month for the first user, £7/month per
                additional user, with 250 AI tokens included monthly and more at 2p each
                pay-as-you-go (a free tier offers 200 tokens with watermarked PDFs).
              </p>
              <p>
                <strong>Tradecert's strengths:</strong> genuine AI in the certificate workflow,
                unlimited certificates, strong team collaboration, clean modern app. Of the
                certification-only products, it is the most technically ambitious.
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
                Elec-Mate covers certification the same way — 16 certificate types to BS
                7671:2018+A4:2026, AI Board Scanner, automated observations via Defect Code AI —
                and then keeps going: <strong>Voice Test Entry</strong> for hands-free readings,
                an <strong>AI Remedial Cost Estimator</strong> that prices the defect list, 70+{' '}
                <SEOInternalLink href="/electrical-testing-calculators">
                  BS 7671 calculators
                </SEOInternalLink>
                , AI RAMS, five specialist AI agents, and the business layer: quoting, invoicing,
                Stripe payments, Xero sync and job management. Training is included too — 46+
                courses and 20,000+ practice questions.
              </p>
              <p>
                £19.99/month flat, everything included, AI unmetered, 7-day free trial.
              </p>
            </>
          ),
        },
        {
          id: 'ai-comparison',
          heading: 'AI: Included vs Metered',
          content: (
            <>
              <p>
                Both apps use AI to kill manual data entry: both extract circuits from a board
                photo, both turn notes into fields, both write regulation-referenced
                observations. Credit where due — on the certificate itself, Tradecert's AI is
                real. The differences are the meter and the reach. Tradecert's 250 monthly
                tokens are a fair allowance for light use; past that, every AI action costs 2p a
                token, and a full-time inspector's usage adds up — per user.
              </p>
              <SEOAppBridge
                title="AI Without a Meter"
                description="Board scans, voice test entry, defect coding and remedial pricing — use them on every job, all month, for the same £19.99."
                icon={Brain}
              />
              <p>
                Elec-Mate's AI is part of the subscription: scan every board, speak every schedule
                of test results, code every defect and price every remedial list without watching
                a counter. The AI also goes further into the job — the Remedial Cost Estimator
                turns an unsatisfactory EICR into a priced quotation with real UK trade pricing,
                which flows straight into Elec-Mate's own quoting and invoicing.
              </p>
            </>
          ),
        },
      ]}
      verdictHeading="The Verdict"
      verdictContent={
        <>
          <p>
            Tradecert is a genuinely good certification app — the AI is real and the pricing is
            fair. If certificates are all you want and your AI usage is light, it is a credible
            choice at £18/month.
          </p>
          <p>
            For £1.99 more, Elec-Mate removes the AI meter and adds the rest of the trade:
            calculators, RAMS, quoting, invoicing, payments and training. The certificate stops
            being a standalone document and becomes the middle of a paid job.
          </p>
          <p>
            Both have free trials — run the same EICR through each, use the AI hard, and check
            the meter at the end of the week.
          </p>
        </>
      }
      uniqueFeatures={[
        {
          icon: Mic,
          title: 'Unmetered AI, Flat Price',
          description:
            'Scan every board and dictate every schedule all month — no tokens, no per-user fees.',
        },
        {
          icon: PoundSterling,
          title: 'AI Remedial Cost Estimator',
          description:
            'Defect list in, priced remedial quotation out — with real UK trade pricing.',
        },
        {
          icon: Calculator,
          title: '70+ BS 7671 Calculators',
          description:
            'Cable sizing, Zs, volt drop, max demand, adiabatic — beyond any certification-only app.',
        },
        {
          icon: Briefcase,
          title: 'Quoting, Invoicing & Payments',
          description:
            'The certificate flows into a quote, an invoice and a Stripe payment link.',
        },
        {
          icon: Sparkles,
          title: 'AI RAMS + 5 Specialist Agents',
          description:
            'RAMS, circuit design, costing, installation and H&S agents in the same subscription.',
        },
        {
          icon: GraduationCap,
          title: 'Training + Mock Exams',
          description:
            '46+ courses and 20,000+ questions — 18th Edition, 2391, AM2, apprentice quals.',
        },
      ]}
      uniqueFeaturesHeading="What Only Elec-Mate Offers"
      faqs={[
        {
          question: 'Is Elec-Mate better than Tradecert?',
          answer:
            'They are the two most AI-forward certification products in the UK. Tradecert (£18/month) is excellent if you only need certificates and use AI lightly — its AI is metered at 250 free tokens a month then 2p per token. Elec-Mate (£19.99/month) includes AI without metering and adds 70+ calculators, RAMS, quoting, invoicing, Stripe payments and 46+ training courses. Heavy AI users and anyone who wants one app for the whole trade get more from Elec-Mate.',
        },
        {
          question: 'How does Tradecert’s AI token pricing work?',
          answer:
            'Tradecert includes 250 AI tokens free each month; beyond that, AI features cost 2p per token pay-as-you-go (see tradecert.app/pricing for current details). Elec-Mate has no token system — AI board scanning, voice test entry, defect coding and remedial pricing are included in the flat £19.99/month.',
        },
        {
          question: 'Do both apps do AI circuit extraction and voice input?',
          answer:
            'Yes — both extract circuit data from a board photo, and both accept notes or dictation into certificate fields (Tradecert converts entries like "Ze 0.25" into the right field). Where Elec-Mate goes further is the AI Remedial Cost Estimator — a priced remedial quotation from the defect list using real UK trade pricing — plus five specialist AI agents, none of which Tradecert offers in 2026.',
        },
        {
          question: 'Does Tradecert include quoting, invoicing or calculators?',
          answer:
            'No — Tradecert is a certification app. Quoting, invoicing, payment collection, BS 7671 calculators, RAMS and training all sit outside it. Elec-Mate includes them in the same subscription as its certificates.',
        },
        {
          question: 'How do the prices compare exactly?',
          answer:
            'Tradecert: £18/month for the first user plus £7/month per additional user, unlimited certificates, AI metered after 250 free tokens (2p/token); a free tier offers 200 tokens with watermarked PDFs. Elec-Mate: £19.99/month flat, unlimited certificates, AI unmetered, plus calculators, RAMS, quoting, invoicing, payments and training. A two-person firm already pays more on Tradecert (£25/month) for certificates alone.',
        },
      ]}
      relatedPages={[
        {
          href: '/compare/elec-mate-vs-speedcert',
          title: 'Elec-Mate vs SpeedCert',
          description: 'Against the AI-automation EICR software.',
          icon: Zap,
          category: 'Comparison',
        },
        {
          href: '/elec-mate-vs-i-certifi',
          title: 'Elec-Mate vs iCertifi',
          description: 'Against the long-running certification app.',
          icon: Sparkles,
          category: 'Comparison',
        },
        {
          href: '/compare/elec-mate-vs-certsuite',
          title: 'Elec-Mate vs CertSuite',
          description: 'Against Megger’s £12/month certification software.',
          icon: FileCheck2,
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
          href: '/tools/digital-certificates-app',
          title: 'Digital Certificates App',
          description: 'All 16 certificate types with unmetered AI.',
          icon: FileCheck2,
          category: 'Tools',
        },
        {
          href: '/electrical-testing-calculators',
          title: 'Electrical Testing Calculators',
          description: '70+ BS 7671 calculators alongside your certificates.',
          icon: Calculator,
          category: 'Tools',
        },
      ]}
      ctaHeading="Use the AI hard. Same price."
      ctaSubheading="Unmetered AI certificates plus calculators, RAMS, quoting and training — free for 7 days."
      comparePath="/compare/elec-mate-vs-tradecert"
    />
  );
}
