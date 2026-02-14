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
  Smartphone,
  Zap,
  Cable,
  Ruler,
  WifiOff,
  BookOpen,
} from 'lucide-react';

export default function BestCableSizingAppPage() {
  return (
    <ComparisonTemplate
      title="Best Cable Sizing App 2026 | Top 5 Compared"
      description="Compare the best cable sizing apps for UK electricians in 2026. Elec-Mate vs Cable Calc vs Voltimum vs Hager Specs — BS 7671 compliance, correction factors, voltage drop, and more compared side by side."
      datePublished="2026-01-28"
      dateModified="2026-02-13"
      breadcrumbs={[
        { label: 'Comparisons', href: '/compare' },
        { label: 'Best Cable Sizing App', href: '/compare/best-cable-sizing-app' },
      ]}
      tocItems={[
        { id: 'why-cable-sizing', label: 'Why Cable Sizing Apps Matter' },
        { id: 'the-contenders', label: 'The Contenders' },
        { id: 'bs7671-compliance', label: 'BS 7671 Compliance' },
        { id: 'beyond-cable-sizing', label: 'Beyond Cable Sizing' },
        { id: 'comparison', label: 'Feature Comparison Table' },
        { id: 'verdict', label: 'The Verdict' },
        { id: 'unique-features', label: 'What Only Elec-Mate Offers' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="2026 Comparison"
      badgeIcon={Cable}
      heroTitle={
        <>
          Best <span className="text-yellow-400">Cable Sizing App</span> 2026 — Top Picks Compared
        </>
      }
      heroSubtitle="Cable sizing is one of the most critical calculations in electrical installation work. Get it wrong and you risk overheating, voltage drop failures, or a failed inspection. Here is how the leading cable sizing apps compare for BS 7671 compliance, ease of use, and overall value."
      readingTime={11}
      comparisonColumns={['Feature', 'Elec-Mate', 'Cable Calc', 'Voltimum', 'Hager Specs']}
      comparisonRows={[
        { feature: 'BS 7671:2018+A3:2024 Tables', values: [true, true, 'Partial', true] },
        {
          feature: 'All Correction Factors (Ca, Cg, Ci, Cf)',
          values: [true, true, true, 'Partial'],
        },
        { feature: 'Voltage Drop Verification', values: [true, true, true, true] },
        { feature: 'Reference Method Selection', values: [true, true, 'Limited', true] },
        { feature: 'Conduit & Trunking Fill Calculator', values: [true, false, false, true] },
        { feature: 'Maximum Demand Calculator', values: [true, false, false, false] },
        { feature: 'Earth Fault Loop Impedance (Zs)', values: [true, false, false, false] },
        { feature: 'Disconnection Time Verification', values: [true, false, false, false] },
        { feature: 'Offline Mode', values: [true, true, false, true] },
        { feature: 'AI Board Scanner', values: [true, false, false, false] },
        { feature: 'Certificate Integration', values: [true, false, false, false] },
        { feature: '46+ Training Courses', values: [true, false, false, false] },
        { feature: 'Free to Use', values: ['From £4.99/mo', true, true, true] },
      ]}
      comparisonHeading="Cable Sizing App Feature Comparison"
      keyTakeaways={[
        'Elec-Mate is the only cable sizing app that integrates calculations directly into your certificates, so cable sizing results flow straight into your EIC or Minor Works form.',
        'All four apps perform BS 7671 cable sizing, but only Elec-Mate includes the full suite of 50+ electrical calculators — maximum demand, Zs verification, disconnection times, conduit fill, and more.',
        'Cable Calc, Voltimum, and Hager Specs are free single-purpose tools. Elec-Mate is a paid all-in-one platform, but at £4.99 per month you get calculators plus certificates, AI tools, training, and business management.',
        'Elec-Mate references BS 7671:2018+A3:2024 tables including the latest Amendment 3 changes. Verify that free tools have been updated to reflect A3:2024 before relying on them.',
        'The AI Board Scanner in Elec-Mate can photograph a consumer unit and identify existing cables and circuit configurations, giving you a starting point for cable sizing calculations on existing installations.',
      ]}
      sections={[
        {
          id: 'why-cable-sizing',
          heading: 'Why Cable Sizing Apps Matter',
          content: (
            <>
              <p>
                Cable sizing to BS 7671 involves multiple variables: design current, correction
                factors for ambient temperature (Ca), grouping (Cg), thermal insulation (Ci), and
                semi-enclosed fuses (Cf), reference installation methods, tabulated current-carrying
                capacities, and voltage drop limits. Getting any variable wrong can result in an
                undersised cable that overheats under load or an oversised cable that wastes money.
              </p>
              <p>
                A good cable sizing app automates these calculations, references the correct BS 7671
                Appendix 4 tables, applies all correction factors, and verifies voltage drop is
                within the permitted limits (typically 3% for lighting and 5% for other circuits on
                a consumer installation). It should also account for the{' '}
                <SEOInternalLink href="/guides/reference-methods-guide">
                  reference installation method
                </SEOInternalLink>{' '}
                and allow you to check{' '}
                <SEOInternalLink href="/guides/correction-factors-guide">
                  correction factors
                </SEOInternalLink>{' '}
                for your specific installation conditions.
              </p>
            </>
          ),
        },
        {
          id: 'the-contenders',
          heading: 'The Contenders',
          content: (
            <>
              <p>
                <strong>Elec-Mate</strong> — All-in-one platform with 50+ calculators including
                cable sizing, plus certificates, AI tools, training, and business management.
                References BS 7671:2018+A3:2024. From £4.99/month.
              </p>
              <p>
                <strong>Cable Calc</strong> — Free standalone cable sizing calculator. Performs BS
                7671-compliant cable sizing with correction factors and voltage drop. Works offline.
                No other features beyond cable sizing.
              </p>
              <p>
                <strong>Voltimum Cable Sizing Tool</strong> — Free web-based cable sizing tool from
                the electrical industry platform. Performs basic cable sizing with correction
                factors. Requires an internet connection. Limited reference method options.
              </p>
              <p>
                <strong>Hager Specs</strong> — Free app from Hager that includes cable sizing along
                with product specification tools. BS 7671-compliant cable sizing with voltage drop.
                Works offline. Naturally orientated towards Hager products.
              </p>
              <SEOAppBridge
                title="50+ Calculators — Not Just Cable Sizing"
                description="Elec-Mate includes cable sizing plus maximum demand, voltage drop, Zs verification, disconnection times, conduit fill, trunking fill, diversity, and dozens more. All referencing BS 7671:2018+A3:2024."
                icon={Calculator}
              />
            </>
          ),
        },
        {
          id: 'bs7671-compliance',
          heading: 'BS 7671 Compliance: The Critical Difference',
          content: (
            <>
              <p>
                All four apps claim BS 7671 compliance for cable sizing, but the depth varies
                significantly. Elec-Mate references BS 7671:2018+A3:2024 — the latest version
                including Amendment 3 issued in July 2024. This matters because A3:2024 introduced
                changes relevant to certain installation types.
              </p>
              <p>
                Free tools may not update as promptly when amendments are published. Before relying
                on any calculator for a live installation, verify it references the current edition
                and amendment of BS 7671. Elec-Mate displays the regulation edition and table
                references within each calculator so you can confirm compliance.
              </p>
              <p>
                Beyond cable sizing, Elec-Mate includes calculators for{' '}
                <SEOInternalLink href="/guides/voltage-drop-guide-bs7671">
                  voltage drop verification
                </SEOInternalLink>
                ,{' '}
                <SEOInternalLink href="/guides/cable-sizing-guide-bs7671">
                  cable sizing to Appendix 4
                </SEOInternalLink>
                , maximum demand, diversity factors, earth fault loop impedance, prospective fault
                current, and disconnection time verification. None of the other three apps offer
                this breadth of calculation.
              </p>
            </>
          ),
        },
        {
          id: 'beyond-cable-sizing',
          heading: 'Beyond Cable Sizing: Why Elec-Mate Wins Overall',
          content: (
            <>
              <p>
                Cable Calc, Voltimum, and Hager Specs are useful free tools that do one thing: cable
                sizing. If cable sizing is the only calculation you need and you want it at no cost,
                any of these tools will serve.
              </p>
              <p>
                But cable sizing is rarely the only calculation an electrician needs on site. You
                also need maximum demand to size the supply, Zs values to verify disconnection
                times, conduit fill rates when planning containment, and voltage drop checks for
                long runs. Elec-Mate provides all of these in a single app.
              </p>
              <SEOAppBridge
                title="Cable Sizing That Flows Into Your Certificates"
                description="Size a cable in the calculator, then tap to insert the result directly into your EIC or Minor Works certificate. No re-typing, no copying between apps. Only Elec-Mate integrates calculations with certification."
                icon={Cable}
              />
              <p>
                More importantly, Elec-Mate integrates calculations with certificates. Size a cable,
                then insert the result directly into your EIC or Minor Works form. No re-typing, no
                copying between apps. This integration is unique to Elec-Mate and eliminates a
                common source of transcription errors.
              </p>
            </>
          ),
        },
      ]}
      verdictHeading="The Verdict"
      verdictContent={
        <>
          <p>
            If you need a free, single-purpose cable sizing calculator and nothing else, Cable Calc
            is a solid choice. It works offline, handles correction factors correctly, and gets the
            job done.
          </p>
          <p>
            If you need cable sizing as part of a broader electrical toolkit — and most working
            electricians do — Elec-Mate is the clear winner. It includes cable sizing alongside 50+
            other BS 7671 calculators, 8 certificate types, AI-powered tools, 46+ training courses,
            and business management features. The certificate integration alone (cable sizing
            results flowing directly into your forms) justifies the £4.99 per month subscription.
          </p>
          <p>
            Hager Specs is useful if you regularly specify Hager products. Voltimum's web tool is
            convenient for a quick check at a desk but requires internet access and offers limited
            reference methods.
          </p>
          <p>
            Try Elec-Mate free for 7 days and compare the cable sizing experience — plus everything
            else — against whatever you currently use.
          </p>
        </>
      }
      uniqueFeatures={[
        {
          icon: Calculator,
          title: '50+ BS 7671 Calculators',
          description:
            'Cable sizing is just the start. Maximum demand, voltage drop, Zs verification, disconnection times, conduit fill, trunking fill, diversity, and dozens more.',
        },
        {
          icon: FileCheck2,
          title: 'Certificate Integration',
          description:
            'Cable sizing results flow directly into your EIC, Minor Works, or EICR certificates. No re-typing between apps. Unique to Elec-Mate.',
        },
        {
          icon: Camera,
          title: 'AI Board Scanner',
          description:
            'Photograph existing consumer units to identify circuit configurations before cable sizing. The AI extracts circuit data automatically.',
        },
        {
          icon: BookOpen,
          title: 'BS 7671:2018+A3:2024',
          description:
            'All calculators reference the latest edition including Amendment 3. Table references displayed so you can verify compliance.',
        },
        {
          icon: GraduationCap,
          title: '46+ Training Courses',
          description:
            'Learn the theory behind cable sizing with 18th Edition courses, Appendix 4 tutorials, and correction factor guides. 2,000+ practice questions.',
        },
        {
          icon: WifiOff,
          title: 'Full Offline Mode',
          description:
            'All 50+ calculators work without an internet connection. Essential for basements, plant rooms, and sites without mobile signal.',
        },
      ]}
      uniqueFeaturesHeading="What Only Elec-Mate Offers"
      faqs={[
        {
          question: 'What is the best cable sizing app for UK electricians?',
          answer:
            'Elec-Mate is the best overall cable sizing app for UK electricians in 2026 because it combines BS 7671:2018+A3:2024-compliant cable sizing with 50+ other electrical calculators, 8 certificate types, AI tools, 46+ training courses, and business management — all in a single app from £4.99 per month. If you only need a free standalone cable sizing calculator, Cable Calc is a good alternative.',
        },
        {
          question: 'Are free cable sizing apps accurate?',
          answer:
            'Free cable sizing apps like Cable Calc, Voltimum, and Hager Specs can be accurate for basic cable sizing calculations. However, accuracy depends on whether the app has been updated to reflect the latest BS 7671 amendments. Always verify which edition the app references. Elec-Mate clearly displays BS 7671:2018+A3:2024 table references within each calculator so you can confirm compliance.',
        },
        {
          question: 'Do I need a cable sizing app or can I use the BS 7671 tables directly?',
          answer:
            'You can absolutely use the BS 7671 Appendix 4 tables directly — many experienced electricians do. A cable sizing app automates the process, reduces the chance of looking up the wrong table or applying correction factors incorrectly, and saves time on site. For complex installations with multiple correction factors, an app is particularly useful for avoiding errors.',
        },
        {
          question: 'Does Elec-Mate include voltage drop calculations?',
          answer:
            'Yes. Elec-Mate includes a dedicated voltage drop calculator that verifies drop is within BS 7671 limits (typically 3% for lighting circuits and 5% for other circuits on a consumer installation). It accounts for cable type, conductor size, circuit length, design current, and power factor. Results can be inserted directly into your certificate.',
        },
        {
          question: 'Can I use cable sizing apps offline?',
          answer:
            'Elec-Mate, Cable Calc, and Hager Specs all work offline. Voltimum is web-based and requires an internet connection. Offline capability is essential for electricians working in basements, plant rooms, and other locations without mobile signal. Elec-Mate saves all calculation data locally and syncs when connectivity returns.',
        },
        {
          question: 'What correction factors does the cable sizing calculation include?',
          answer:
            'A proper BS 7671 cable sizing calculation includes correction factors for ambient temperature (Ca), grouping of cables (Cg), thermal insulation contact (Ci), and semi-enclosed fuses (Cf). Elec-Mate includes all four correction factors with values pulled directly from BS 7671 tables. Some free tools may not include all factors — always check before relying on a result for a live installation.',
        },
        {
          question: 'Does Elec-Mate cable sizing integrate with certificates?',
          answer:
            'Yes. This is one of the key advantages of Elec-Mate over standalone cable sizing tools. When you complete a cable sizing calculation in Elec-Mate, you can insert the result directly into your EIC, Minor Works, or EICR certificate. This eliminates manual re-typing between a calculator and a certificate app, reducing transcription errors and saving time on site.',
        },
      ]}
      relatedPages={[
        {
          href: '/guides/cable-sizing-guide-bs7671',
          title: 'Cable Sizing Guide BS 7671',
          description:
            'Complete guide to cable sizing using BS 7671 Appendix 4 tables with worked examples.',
          icon: Cable,
          category: 'Guide',
        },
        {
          href: '/guides/voltage-drop-guide-bs7671',
          title: 'Voltage Drop Guide',
          description:
            'How to calculate and verify voltage drop to BS 7671 limits for any circuit.',
          icon: Zap,
          category: 'Guide',
        },
        {
          href: '/guides/correction-factors-guide',
          title: 'Correction Factors Guide',
          description:
            'All BS 7671 correction factors explained — Ca, Cg, Ci, Cf — with worked examples.',
          icon: Ruler,
          category: 'Guide',
        },
        {
          href: '/guides/reference-methods-guide',
          title: 'Reference Methods Guide',
          description:
            'All BS 7671 reference installation methods explained with diagrams and tables.',
          icon: BookOpen,
          category: 'Guide',
        },
        {
          href: '/tools/electrical-testing-calculators',
          title: 'Electrical Calculators',
          description:
            '50+ BS 7671 calculators including cable sizing, voltage drop, Zs, maximum demand, and more.',
          icon: Calculator,
          category: 'Tools',
        },
        {
          href: '/compare/elec-mate-vs-simply-eicr',
          title: 'Elec-Mate vs SimplyEICR',
          description:
            'Feature comparison between Elec-Mate and SimplyEICR for certificate generation.',
          icon: Sparkles,
          category: 'Comparison',
        },
      ]}
      ctaHeading="More than just cable sizing"
      ctaSubheading="Try Elec-Mate free for 7 days. 50+ BS 7671 calculators, 8 certificate types, AI tools, 46+ training courses, and business management. All from £4.99/month."
      comparePath="/compare/best-cable-sizing-app"
    />
  );
}
