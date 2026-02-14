import ComparisonTemplate from '@/pages/seo/templates/ComparisonTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Brain,
  FileCheck2,
  Calculator,
  GraduationCap,
  Briefcase,
  PoundSterling,
  Sparkles,
  Zap,
  ClipboardList,
  WifiOff,
  Receipt,
  Smartphone,
  Users,
  Shield,
} from 'lucide-react';

export default function ElecMateVsElectricalOMPage() {
  return (
    <ComparisonTemplate
      title="Elec-Mate vs Electrical OM | Feature Comparison"
      description="Detailed comparison of Elec-Mate and Electrical OM for UK electricians. Compare certificates, calculators, AI tools, pricing, training, and business management features side by side."
      datePublished="2026-02-10"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Comparisons', href: '/compare' },
        {
          label: 'Elec-Mate vs Electrical OM',
          href: '/compare/elec-mate-vs-electrical-om',
        },
      ]}
      tocItems={[
        { id: 'what-is-electrical-om', label: 'What Is Electrical OM?' },
        { id: 'what-is-elec-mate', label: 'What Is Elec-Mate?' },
        { id: 'certificate-comparison', label: 'Certificate Comparison' },
        { id: 'comparison', label: 'Feature Comparison Table' },
        { id: 'verdict', label: 'The Verdict' },
        { id: 'unique-features', label: 'What Only Elec-Mate Offers' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Head-to-Head Comparison"
      badgeIcon={Zap}
      heroTitle={
        <>
          <span className="text-yellow-400">Elec-Mate</span> vs{' '}
          <span className="text-yellow-400">Electrical OM</span>
        </>
      }
      heroSubtitle="An honest, detailed comparison of two apps for UK electricians. We cover certificates, calculators, AI tools, training, business features, pricing, and platform support — so you can make an informed choice."
      readingTime={9}
      comparisonColumns={['Feature', 'Elec-Mate', 'Electrical OM']}
      comparisonRows={[
        { feature: 'EICR Certificates', values: [true, true] },
        { feature: 'EIC Certificates', values: [true, true] },
        { feature: 'Minor Works Certificates', values: [true, true] },
        { feature: 'EV Charger Certificate', values: [true, false] },
        { feature: 'Solar PV Certificate', values: [true, false] },
        { feature: 'Fire Alarm Certificate', values: [true, false] },
        { feature: 'Emergency Lighting Certificate', values: [true, false] },
        { feature: 'PAT Testing Certificate', values: [true, false] },
        { feature: '70+ BS 7671 Calculators', values: [true, 'Limited'] },
        { feature: '8 Elec-AI Specialist Tools', values: [true, false] },
        { feature: 'AI Board Scanner', values: [true, false] },
        { feature: 'Full Training Platform (18th Ed, AM2 etc.)', values: [true, false] },
        { feature: 'Quoting, Invoicing & Payments', values: [true, 'Basic'] },
        { feature: 'Offline Mode', values: [true, 'Limited'] },
        { feature: 'Pricing From', values: ['£4.99/mo', 'Varies'] },
      ]}
      comparisonHeading="Feature Comparison"
      keyTakeaways={[
        'Electrical OM is a certificate-focused app that handles EICR, EIC, and Minor Works well. Elec-Mate covers those same certificates plus five specialist types: EV Charger, Solar PV, Fire Alarm, Emergency Lighting, and PAT.',
        'Elec-Mate includes 8 Elec-AI specialist agents (Circuit Designer, Cost Engineer, Installation Guide, Health & Safety, Fault Finder, and more). Electrical OM does not include AI tools.',
        'Elec-Mate provides over 70 BS 7671 calculators for cable sizing, voltage drop, maximum demand, Zs verification, and more. Electrical OM includes a more limited calculator selection.',
        'Elec-Mate includes a full training platform with 18th Edition, Level 2/3, AM2, and EPA courses. Electrical OM does not include training content.',
        'For electricians who want certificates, calculators, AI tools, training, and business management in one app, Elec-Mate offers significantly more value per pound spent.',
      ]}
      sections={[
        {
          id: 'what-is-electrical-om',
          heading: 'What Is Electrical OM?',
          content: (
            <>
              <p>
                Electrical OM is a mobile app designed for UK electricians to create electrical
                certificates and manage jobs on their phones and tablets. It provides digital
                certificate completion for the standard certificate types used in domestic and
                commercial electrical work.
              </p>
              <p>
                The app focuses on streamlining the certification process, allowing electricians to
                complete EICRs, EICs, and Minor Works certificates on site with digital signatures
                and PDF export. It includes some calculators and basic job management features.
              </p>
              <p>
                <strong>Electrical OM's strengths:</strong> Certificate-focused workflow,
                mobile-friendly interface, established in the UK market. For electricians who need a
                reliable tool to produce standard certificates, Electrical OM provides a functional
                solution.
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
                Elec-Mate is a comprehensive, all-in-one platform built for UK electricians. It
                combines electrical certification, BS 7671 calculators, AI-powered tools,
                professional training courses, and business management into a single mobile-first
                app.
              </p>
              <p>
                The platform includes 8 certificate types (EICR, EIC, Minor Works, EV Charger, Solar
                PV, Fire Alarm, Emergency Lighting, and PAT Testing), over 70 specialist electrical
                calculators, 8 Elec-AI tools (Circuit Designer, Cost Engineer, Installation Guide,
                Commissioning Specialist, Maintenance Agent, Health & Safety, Fault Finder, and
                Regulation Lookup), full training courses (18th Edition, Level 2/3, AM2, EPA
                simulator), and business management features (quoting, invoicing, Stripe payments,
                Xero integration).
              </p>
              <SEOAppBridge
                title="Everything in One App"
                description="Certificates, calculators, AI tools, training, and business management. No more switching between multiple apps on site."
                icon={Smartphone}
              />
            </>
          ),
        },
        {
          id: 'certificate-comparison',
          heading: 'Certificate Comparison',
          content: (
            <>
              <p>
                Both Elec-Mate and Electrical OM support the core certificate types that UK
                electricians use daily: EICR, EIC, and Minor Works. Both apps provide digital
                signature capture, observation coding, and PDF export. For standard domestic
                certificates, both platforms deliver professional results.
              </p>
              <p>
                The difference is in scope. Elec-Mate includes 8 certificate types in total, adding
                EV Charger Installation, Solar PV, Fire Alarm Commissioning, Emergency Lighting, and
                PAT Testing certificates. As the industry expands into EV charging, renewable
                energy, and fire safety, these specialist certificates are increasingly important.
                Having them in the same app saves time and eliminates paper forms. See our{' '}
                <SEOInternalLink href="/guides/electrical-certificate-types">
                  guide to electrical certificate types
                </SEOInternalLink>{' '}
                for more detail.
              </p>
              <p>
                Electrical OM focuses primarily on the standard domestic and commercial certificate
                types. If your work is exclusively standard installations and inspections,
                Electrical OM's certificate coverage may be sufficient. If you also do EV charger
                installations, solar PV, fire alarms, or PAT testing, Elec-Mate covers all of these
                without needing additional apps.
              </p>
            </>
          ),
        },
      ]}
      verdictHeading="The Verdict"
      verdictContent={
        <>
          <p>
            Electrical OM is a functional certificate app that handles standard electrical
            certificates. For electricians whose needs begin and end with EICR, EIC, and Minor Works
            certificates, it provides a workable solution.
          </p>
          <p>
            Elec-Mate offers significantly more. The combination of 8 certificate types, 70+ BS 7671
            calculators, 8 Elec-AI specialist tools, full training courses, and business management
            (quoting, invoicing, Stripe payments, Xero integration) makes it a genuinely all-in-one
            platform. There is no need for separate calculator apps, separate training platforms,
            separate invoicing software, or separate AI subscriptions.
          </p>
          <p>
            The value calculation is straightforward: Elec-Mate from £4.99 per month includes
            everything, whereas using Electrical OM for certificates plus separate apps for
            calculators, quoting, and training adds up to significantly more. Try Elec-Mate free for
            7 days to compare the experience directly.
          </p>
        </>
      }
      uniqueFeatures={[
        {
          icon: Brain,
          title: '8 Elec-AI Specialist Tools',
          description:
            'Circuit Designer, Cost Engineer, Installation Guide, Commissioning Specialist, Maintenance Agent, Health & Safety, Fault Finder, and Regulation Lookup. AI built for electricians, not generic chatbots.',
        },
        {
          icon: Calculator,
          title: '70+ BS 7671 Calculators',
          description:
            'Cable sizing, voltage drop, maximum demand, diversity, conduit fill, trunking fill, Zs verification, disconnection times, adiabatic equation, and dozens more.',
        },
        {
          icon: GraduationCap,
          title: 'Full Training Platform',
          description:
            '18th Edition, Level 2/3 Electrical Installation, AM2 preparation, and EPA simulator. Complete courses built into the app you use for work.',
        },
        {
          icon: Receipt,
          title: 'Quoting, Invoicing & Payments',
          description:
            'Professional quotes, invoicing, Stripe payment collection, and Xero integration. Invoice from site and get paid before you leave.',
        },
        {
          icon: Sparkles,
          title: 'AI Board Scanner',
          description:
            'Photograph a consumer unit to automatically extract circuit data. Populate certificate schedules in seconds instead of manually typing each circuit.',
        },
        {
          icon: WifiOff,
          title: 'Full Offline Support',
          description:
            'Auto-saves locally every 10 seconds and syncs to the cloud every 30 seconds when connectivity returns. Complete certificates in basements and plant rooms.',
        },
      ]}
      uniqueFeaturesHeading="What Only Elec-Mate Offers"
      faqs={[
        {
          question: 'Is Elec-Mate better than Electrical OM?',
          answer:
            'For most electricians, yes. Elec-Mate includes everything Electrical OM offers (EICR, EIC, Minor Works certificates) plus five additional certificate types, 70+ BS 7671 calculators, 8 AI specialist tools, full training courses, and business management features. If you only need basic certificates and nothing else, Electrical OM may be sufficient. If you want an all-in-one platform, Elec-Mate offers significantly more value.',
        },
        {
          question: 'Can I switch from Electrical OM to Elec-Mate?',
          answer:
            'Yes. Elec-Mate offers a 7-day free trial with full access to every feature. Your existing certificates in Electrical OM remain accessible in that app — switching to Elec-Mate for new work does not affect your historical data. Many electricians try Elec-Mate alongside their existing app during the trial period.',
        },
        {
          question: 'Does Electrical OM have AI tools?',
          answer:
            'No. As of 2026, Electrical OM does not include AI tools. Elec-Mate is currently the only UK electrician app that offers 8 specialist AI agents — including Circuit Designer, Cost Engineer, Installation Guide, and Health & Safety — each trained on electrical industry data.',
        },
        {
          question: 'Which app has more calculators?',
          answer:
            'Elec-Mate includes over 70 specialist electrical calculators covering cable sizing, voltage drop, maximum demand, diversity, conduit fill, trunking fill, Zs verification, disconnection times, and many more. Electrical OM includes a more limited selection. If you regularly perform BS 7671 calculations on site, Elec-Mate provides a significantly broader toolkit.',
        },
        {
          question: 'Does Elec-Mate include training courses?',
          answer:
            'Yes. Elec-Mate includes a full training platform with 18th Edition (BS 7671:2018+A3:2024), Level 2 and Level 3 Electrical Installation, AM2 preparation, and EPA simulator courses. Electrical OM does not include training content. For apprentices or electricians studying for qualifications, Elec-Mate provides training in the same app as your professional tools.',
        },
        {
          question: 'How much does Elec-Mate cost compared to Electrical OM?',
          answer:
            'Elec-Mate starts from £4.99 per month and includes all features: 8 certificate types, 70+ calculators, 8 AI tools, training courses, and business management. Electrical OM pricing varies. When you factor in the cost of separate calculator apps, training platforms, and invoicing software that Elec-Mate replaces, the all-in-one approach typically saves money.',
        },
        {
          question: 'Does Elec-Mate work on iPhone and Android?',
          answer:
            'Yes. Elec-Mate works on iOS (iPhone and iPad), Android phones and tablets, and desktop computers via a Progressive Web App (PWA). The interface adapts to your screen size. Both Elec-Mate and Electrical OM support the major mobile platforms.',
        },
      ]}
      relatedPages={[
        {
          href: '/compare/elec-mate-vs-icertifi',
          title: 'Elec-Mate vs iCertifi',
          description: 'Feature comparison between Elec-Mate and iCertifi for UK electricians.',
          icon: Zap,
          category: 'Comparison',
        },
        {
          href: '/compare/elec-mate-vs-simply-eicr',
          title: 'Elec-Mate vs SimplyEICR',
          description:
            'Feature comparison between Elec-Mate and SimplyEICR for certificate generation.',
          icon: Sparkles,
          category: 'Comparison',
        },
        {
          href: '/compare/best-ai-tool-electricians',
          title: 'Best AI Tool for Electricians 2026',
          description:
            'Compare AI tools for electricians — Elec-Mate AI, ChatGPT, and Google Gemini.',
          icon: Brain,
          category: 'Comparison',
        },
        {
          href: '/tools/digital-certificates-app',
          title: 'Digital Certificates App',
          description:
            'All 8 certificate types with AI board scanner, voice test entry, and digital signatures.',
          icon: FileCheck2,
          category: 'Tools',
        },
        {
          href: '/tools/ai-electrician',
          title: 'AI Electrician Hub',
          description: '8 specialist AI agents and 12 AI tools built for UK electricians.',
          icon: Brain,
          category: 'AI Tools',
        },
        {
          href: '/compare/best-invoice-app-electricians',
          title: 'Best Invoice App 2026',
          description:
            'Compare invoicing apps for electricians — Elec-Mate, QuickBooks, Xero, and FreeAgent.',
          icon: Receipt,
          category: 'Comparison',
        },
      ]}
      ctaHeading="More than just certificates"
      ctaSubheading="Try Elec-Mate free for 7 days. Certificates, calculators, AI tools, training, and business management — all from £4.99/month."
      comparePath="/compare/elec-mate-vs-electrical-om"
    />
  );
}
