import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  ShieldCheck,
  Zap,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Smartphone,
  Calculator,
  ClipboardCheck,
  HelpCircle,
  ChevronRight,
  ArrowDown,
  Brain,
  Activity,
  Layers,
  FileText,
  Settings,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PAGE_TITLE = 'Consumer Unit Regulations 2024 | Amendment 4 Guide | Elec-Mate';
const PAGE_DESCRIPTION =
  'Consumer unit regulations under BS 7671:2018+A4:2026: metal CU rules, RCDs, RCBO vs split-load, A4 Section 530 bidirectional devices, SPDs.';

const faqs = [
  {
    question: 'Do all consumer units need to be metal under BS 7671?',
    answer:
      'BS 7671 Regulation 421.1.201 requires that consumer units and similar switchgear assemblies in domestic premises shall comply with BS EN 61439-3 and shall have their enclosure manufactured from non-combustible material. In practice, this means metal (steel) consumer units. This regulation was introduced in Amendment 4 to the 17th Edition (which carried forward into the 18th Edition) following concerns about the fire risk associated with plastic consumer units. The requirement applies to new installations and to consumer unit replacements in existing installations. It does not require the retrospective replacement of existing plastic consumer units that were compliant when installed — but if the consumer unit is being replaced for any reason, the new unit must be metal. Some manufacturers produce consumer units with a metal enclosure and a non-combustible plastic interior, which also comply with the regulation.',
  },
  {
    question: 'What did Amendment 4 (A4:2026) change for consumer units?',
    answer:
      'Amendment 4 to BS 7671:2018 introduced several changes relevant to consumer units. Regulation 530.3.201 requires that protective devices be selected and erected with the appropriate use of either a unidirectional or a bidirectional device, and notes that products such as RCBOs, RCCBs, circuit-breakers and AFDDs must be marked to show direction — important where battery storage, solar PV with battery backup or vehicle-to-grid charging can drive current in reverse. Regulation 421.1.7 was redrafted to make AFDDs a requirement for socket-outlet final circuits up to 32 A in higher-risk residential buildings, HMOs, purpose-built student accommodation and care homes (and a recommendation elsewhere). Regulation 443.4 on transient overvoltage protection was also redrafted, with the previous risk-assessment method (Regulation 443.5) deleted. Amendment 4 adds to the requirements rather than replacing the fundamentals of consumer unit design.',
  },
  {
    question: 'Should I use RCBOs or a split-load board with dual RCDs?',
    answer:
      'Both approaches are acceptable under BS 7671, but each has advantages and disadvantages. A split-load board uses two RCDs (typically 63A or 80A, 30mA) to protect groups of circuits, with non-RCD-protected circuits (such as fire alarm and emergency lighting supplies) on the main switch side. The advantage is lower cost — two RCDs plus MCBs are cheaper than individual RCBOs for every circuit. The disadvantage is that a fault on any circuit protected by a particular RCD will trip that RCD and disconnect all circuits sharing it, causing partial loss of supply. An RCBO board provides individual RCD and overcurrent protection for each circuit. A fault on one circuit trips only that circuit. This provides much better discrimination and avoids nuisance tripping affecting multiple circuits. The cost per circuit is higher, but the practical benefits are significant — particularly in larger installations where losing half the circuits to a single RCD trip would cause major inconvenience. For most new domestic installations, full RCBO boards are now the preferred approach.',
  },
  {
    question: 'When is a surge protection device (SPD) required in a consumer unit?',
    answer:
      "Under BS 7671:2018+A4:2026, Regulation 443.4.1 requires transient overvoltage protection where an overvoltage could result in (a) serious injury to, or loss of, human life, or (c) significant financial or data loss — limb (b) having been deleted by the A2:2022 Corrigendum (May 2023). For all other cases protection must still be provided unless the owner of the installation declares it is not required because any loss or damage is tolerable and they accept the risk of damage to equipment and any consequential loss. The old risk-assessment method (Regulation 443.5) has been deleted. Where protection is required, SPDs are installed at the origin — within or adjacent to the consumer unit — with a dedicated overcurrent protective device. Regulation 534.4.10 sets the minimum connecting conductor as 6 mm² copper for Type 2 SPDs and 16 mm² copper for Type 1 SPDs at the origin. A status indicator confirms the SPD is still operational.",
  },
  {
    question: 'Is replacing a consumer unit notifiable under Part P?',
    answer:
      'Yes. Replacing a consumer unit is always notifiable under Part P of the Building Regulations, regardless of whether it is a like-for-like replacement or an upgrade. This is because the consumer unit is the central point of the installation that houses all the main protective devices, and its correct design and installation are critical to the safety of the entire installation. The replacement must be either self-certified by an electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or BRE), or notified to the local authority building control department before the work begins. A full Electrical Installation Certificate (EIC) is required for a consumer unit replacement — a Minor Works Certificate is not appropriate because the work involves the installation or replacement of a distribution board.',
  },
  {
    question: 'What RCD protection is required in a domestic consumer unit?',
    answer:
      'BS 7671 requires additional protection by a 30 mA RCD for several categories of circuit. Regulation 411.3.3 covers socket-outlets rated up to 32 A and mobile equipment for use outdoors up to 32 A. Regulation 411.3.4 requires 30 mA RCD protection for AC final circuits supplying luminaires in domestic premises. Table 52.1 (Regulation 522.6.202) requires it for cables concealed in walls at less than 50 mm depth unless they have an earthed metallic covering or are in a prescribed zone with equivalent protection. In practice this covers the vast majority of circuits in a domestic installation. The circuits that may not need 30 mA RCD protection are typically those supplying fixed equipment with surface-clipped or metallic-contained cabling at greater depth — though many designers provide protection anyway as good practice. Note that an RCD is never recognised as a sole means of protection (Regulation 415.1.2).',
  },
];

const features = [
  {
    icon: Calculator,
    title: '70 Electrical Calculators',
    description:
      'Maximum demand calculation, cable sizing for mains tails, Zs verification for every circuit, and dozens more. All built to BS 7671:2018+A4:2026.',
  },
  {
    icon: Brain,
    title: '8 AI Agents + 12 AI Tools',
    description:
      'Ask the AI about consumer unit design, RCD selection, SPD requirements, or Amendment 4 changes. Get instant, regulation-referenced answers.',
  },
  {
    icon: FileText,
    title: '16 Certificate Types',
    description:
      'Generate Electrical Installation Certificates for consumer unit replacements with all mandatory fields, test result validation…',
  },
  {
    icon: ShieldCheck,
    title: 'BS 7671:2018+A4:2026',
    description:
      'Built to the current 18th Edition including Amendment 4. Bidirectional device requirements (Section 530), SPD requirements…',
  },
  {
    icon: Smartphone,
    title: 'Works Offline on Site',
    description:
      'Complete certificates and check regulations even without signal. Perfect for working in basements, plant rooms, and new-build sites with no Wi-Fi.',
  },
  {
    icon: Activity,
    title: 'Integrates with Xero and QuickBooks',
    description:
      'Generate invoices for consumer unit replacements and sync them directly to your accounting software. No double entry, no missed invoices.',
  },
];

const articleSchema = {
  '@type': 'Article',
  headline: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  datePublished: '2024-08-01',
  dateModified: '2026-06-10',
  author: {
    '@type': 'Person',
    name: 'Elec-Mate Editorial Team',
    description:
      'Written and reviewed by qualified electricians and BS 7671 trainers at Elec-Mate.',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Elec-Mate',
    logo: {
      '@type': 'ImageObject',
      url: 'https://www.elec-mate.com/logo.jpg',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://www.elec-mate.com/guides/consumer-unit-regulations',
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

const breadcrumbSchema = {
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://www.elec-mate.com/' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://www.elec-mate.com/guides' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Consumer Unit Regulations',
      item: 'https://www.elec-mate.com/guides/consumer-unit-regulations',
    },
  ],
};

export default function ConsumerUnitRegulationsPage() {
  useSEO({
    title: 'Consumer Unit Regulations 2024 | Amendment 4 Guide',
    description: PAGE_DESCRIPTION,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...articleSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...breadcrumbSchema })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 px-5">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-6">
            <BookOpen className="w-4 h-4" />
            BS 7671:2018+A4:2026
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Consumer Unit Regulations
            <span className="block text-yellow-400 mt-1">Amendment 4 Guide (A4:2026)</span>
          </h1>
          {/* Answer-first block — targets featured snippet for 'consumer unit regulations UK' */}
          <div className="rounded-2xl bg-white/[0.06] border border-yellow-500/20 px-6 py-5 max-w-2xl mx-auto mb-6 text-left">
            <p className="text-base text-white leading-relaxed">
              <strong className="text-yellow-400">Consumer unit regulations</strong> in the UK are
              set by BS&nbsp;7671:2018+A4:2026 (the IET Wiring Regulations, 18th Edition). They
              require metal (non-combustible) enclosures under Regulation&nbsp;421.1.201, 30&nbsp;mA
              RCD protection for almost all domestic circuits (Regulations&nbsp;411.3.3 and 411.3.4),
              and transient overvoltage (surge) protection under Regulation&nbsp;443.4. Amendment&nbsp;4
              (A4:2026) makes arc fault detection devices (AFDDs) a requirement for socket-outlet
              final circuits up to 32&nbsp;A in higher-risk residential buildings, HMOs, student
              accommodation and care homes under Regulation&nbsp;421.1.7, and requires devices to be
              selected for the correct current direction under Regulation&nbsp;530.3.201.
            </p>
          </div>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            The definitive guide to consumer unit regulations under BS 7671:2018+A4:2026. Metal
            enclosures, RCD protection, RCBO design, SPD requirements, AFDDs, and the Amendment 4
            bidirectional device rule (Regulation 530.3.201).
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/signup"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation transition-colors"
            >
              Start Your Free Trial
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <a
              href="#cu-regulations"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              Read the Guide
              <ArrowDown className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Current CU Regulations */}
      <section id="cu-regulations" className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Layers className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Current Consumer Unit Regulations
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The consumer unit (or distribution board in commercial terminology) is the central
              point of every electrical installation. It houses the main switch, the protective
              devices for each circuit (MCBs, RCBOs, or RCDs with MCBs), and increasingly, surge
              protection devices (SPDs). The regulations governing consumer units have evolved
              significantly over the past decade, driven primarily by fire safety concerns and the
              increasing complexity of domestic electrical installations.
            </p>
            <p>
              The current standard for consumer units in domestic premises is set by BS
              7671:2018+A4:2026 — the 18th Edition of the IET Wiring Regulations with Amendment 4,
              issued in July 2024. This standard, together with the product standard BS EN 61439-3
              (which specifies construction and performance requirements for distribution boards),
              defines what a consumer unit must be made of, what protection it must contain, and how
              it must be installed.
            </p>
            <p>
              For electricians, the consumer unit replacement is one of the most common jobs in
              domestic work. It is also one of the most regulation-intensive: it is notifiable under
              Part P, requires a full{' '}
              <SEOInternalLink href="/eic-certificate">
                Electrical Installation Certificate (EIC)
              </SEOInternalLink>
              , and involves decisions about RCD architecture, SPD provision, circuit labelling and
              (since Amendment 4) the suitability of protective devices for bidirectional current
              flow. Getting it right requires a thorough understanding of the current regulations.
            </p>
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden mt-8">
            <div className="px-5 py-4 border-b border-white/10 bg-white/[0.03]">
              <h3 className="font-bold text-white text-lg">Protective Devices at a Glance</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-white">
                <thead>
                  <tr className="border-b border-white/10 text-left text-yellow-400">
                    <th className="px-5 py-3 font-semibold">Device</th>
                    <th className="px-5 py-3 font-semibold">Protects against</th>
                    <th className="px-5 py-3 font-semibold">Typical use in a consumer unit</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="px-5 py-3 align-top font-medium text-yellow-300">MCB</td>
                    <td className="px-5 py-3 align-top">Overload and short-circuit (overcurrent)</td>
                    <td className="px-5 py-3 align-top">
                      Per-circuit overcurrent protection, grouped behind a shared RCD on a
                      split-load board.
                    </td>
                  </tr>
                  <tr className="bg-white/[0.02]">
                    <td className="px-5 py-3 align-top font-medium text-yellow-300">RCD (30 mA)</td>
                    <td className="px-5 py-3 align-top">Earth leakage / electric shock (additional protection)</td>
                    <td className="px-5 py-3 align-top">
                      One or two main RCDs covering groups of circuits on a split-load board.
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 align-top font-medium text-yellow-300">RCBO</td>
                    <td className="px-5 py-3 align-top">Overcurrent + earth leakage in one device</td>
                    <td className="px-5 py-3 align-top">
                      Individual per-circuit protection — the basis of a full RCBO board.
                    </td>
                  </tr>
                  <tr className="bg-white/[0.02]">
                    <td className="px-5 py-3 align-top font-medium text-yellow-300">AFDD</td>
                    <td className="px-5 py-3 align-top">Series and parallel arc faults (fire risk)</td>
                    <td className="px-5 py-3 align-top">
                      Socket-outlet final circuits up to 32 A; required in higher-risk premises
                      (Reg 421.1.7).
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 align-top font-medium text-yellow-300">SPD</td>
                    <td className="px-5 py-3 align-top">Transient overvoltage (surge / lightning, switching)</td>
                    <td className="px-5 py-3 align-top">
                      Single module at the origin, protecting the whole installation (Section 443).
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Metal Enclosure Requirement */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ShieldCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Metal Consumer Unit Requirement (Regulation 421.1.201)
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Regulation 421.1.201 states that in domestic (household) premises, consumer units and
              similar switchgear assemblies shall comply with BS EN 61439-3 and shall have their
              enclosure manufactured from non-combustible material. This regulation was first
              introduced as part of Amendment 4 to the 17th Edition (BS 7671:2008+A3:2015) and
              carried forward into the 18th Edition.
            </p>
            <p>
              The background to this requirement was a series of investigations by the Electrical
              Safety First charity (formerly the Electrical Safety Council) and the London Fire
              Brigade, which identified that a significant number of domestic fires originated at or
              near the consumer unit. In many cases, plastic consumer unit enclosures contributed to
              the spread of fire by melting and dripping burning plastic onto materials below. A
              metal enclosure, while it cannot prevent the initial fault, contains the fire within
              the enclosure and prevents the spread of burning material.
            </p>
            <p>
              The practical implications are clear. Every new consumer unit installed in a domestic
              premises must have a metal enclosure. Every consumer unit replacement — whether
              upgrading from an old rewirable fuse board or replacing a relatively modern plastic
              board — must use a metal enclosure. The only exception is where the consumer unit is
              installed within a purpose-built, non-combustible enclosure that provides equivalent
              fire containment — but in practice, this is rare, and metal consumer units are the
              universal solution.
            </p>
            <p>
              It is important to note that this regulation does not require the retrospective
              replacement of existing plastic consumer units. If a plastic consumer unit was
              installed when it was compliant (before the regulation change), it does not need to be
              replaced solely because of this regulation. However, if any work is done that requires
              the consumer unit to be replaced or significantly modified, the new installation must
              comply with the current regulations, including the metal enclosure requirement.
            </p>
          </div>
        </div>
      </section>

      {/* RCD Protection */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              RCD Protection Requirements (BS 7671 Section 411)
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              BS 7671 Section 411 sets out where additional protection by a 30 mA RCD is required.
              An RCD providing additional protection must have a rated residual operating current
              (I&#8710;n) not exceeding 30 mA and meet the characteristics in Regulation 415.1.1.
              The requirements have expanded with each edition, and in the current 18th Edition
              almost every circuit in a domestic consumer unit needs RCD protection.
            </p>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-6">
              <div className="px-5 py-4 border-b border-white/10 bg-white/[0.03]">
                <h3 className="font-bold text-white text-lg">
                  When 30 mA RCD Protection Is Required
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-white">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-yellow-400">
                      <th className="px-5 py-3 font-semibold">Circuit / situation</th>
                      <th className="px-5 py-3 font-semibold">Regulation</th>
                      <th className="px-5 py-3 font-semibold">Requirement</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="px-5 py-3 align-top">
                        Socket-outlets up to 32 A (general locations)
                      </td>
                      <td className="px-5 py-3 align-top font-mono text-yellow-400/90">411.3.3</td>
                      <td className="px-5 py-3 align-top">
                        30 mA RCD required. A documented risk assessment may omit protection in
                        certain non-domestic cases, but never for sockets liable to be used by
                        ordinary persons or children.
                      </td>
                    </tr>
                    <tr className="bg-white/[0.02]">
                      <td className="px-5 py-3 align-top">Mobile equipment for use outdoors up to 32 A</td>
                      <td className="px-5 py-3 align-top font-mono text-yellow-400/90">411.3.3</td>
                      <td className="px-5 py-3 align-top">
                        30 mA RCD required — external sockets, garden supplies, and outbuilding feeds.
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 align-top">
                        AC final circuits supplying luminaires (domestic)
                      </td>
                      <td className="px-5 py-3 align-top font-mono text-yellow-400/90">411.3.4</td>
                      <td className="px-5 py-3 align-top">
                        30 mA RCD required — added by Amendment&nbsp;4 era updates; applies to all
                        household lighting final circuits.
                      </td>
                    </tr>
                    <tr className="bg-white/[0.02]">
                      <td className="px-5 py-3 align-top">
                        Cables concealed in a wall or partition at &lt; 50 mm depth
                      </td>
                      <td className="px-5 py-3 align-top font-mono text-yellow-400/90">
                        522.6.202 (Table 52.1)
                      </td>
                      <td className="px-5 py-3 align-top">
                        30 mA RCD required unless the cable is in a prescribed zone with an earthed
                        metallic covering or earthed containment (per 522.6.204).
                      </td>
                    </tr>
                    <tr>
                      <td className="px-5 py-3 align-top">
                        Cables in walls containing metallic parts (e.g. metal-stud)
                      </td>
                      <td className="px-5 py-3 align-top font-mono text-yellow-400/90">
                        522.6.202 (Table 52.1)
                      </td>
                      <td className="px-5 py-3 align-top">
                        30 mA RCD required regardless of depth, unless equivalent protection is
                        provided.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p>
              The practical effect is that almost every circuit in a domestic consumer unit now
              requires 30 mA RCD protection. The main exceptions are circuits supplying fixed
              equipment with cables that are clipped to the surface (not concealed in walls), run in
              earthed metallic containment, or routed at a depth exceeding 50 mm. Note that an RCD
              is never recognised as a sole means of protection (Regulation 415.1.2) — it
              supplements basic and fault protection rather than replacing them.
            </p>
          </div>
        </div>
      </section>

      {/* RCBO vs Split-Load */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Settings className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              RCBO Board vs Dual RCD Split-Load Design
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              When designing a domestic consumer unit, the electrician must choose between two main
              RCD architectures: a dual RCD split-load board (two RCDs each protecting a group of
              circuits via MCBs) or a full RCBO board (individual RCBOs providing combined RCD and
              overcurrent protection for each circuit).
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 my-6">
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-white text-xl mb-3">Dual RCD Split-Load</h3>
              <ul className="space-y-3 text-white text-sm leading-relaxed">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-yellow-400">Lower cost</strong> — Two RCDs plus MCBs
                    cost less than individual RCBOs for every circuit, making the split-load
                    arrangement the lower-cost option at the point of installation.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Poor discrimination</strong> — A fault on any
                    single circuit trips the RCD for that entire group, disconnecting all circuits
                    on that side. This can mean losing the cooker, lighting, and sockets on one side
                    of the house due to a single fault.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-white mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-white">Cumulative leakage</strong> — The standing earth
                    leakage from all circuits on one RCD side adds up. If the cumulative leakage
                    exceeds 30% of the RCD rating (approximately 10 mA), nuisance tripping becomes
                    likely.
                  </span>
                </li>
              </ul>
            </div>
            <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
              <h3 className="font-bold text-yellow-400 text-xl mb-3">Full RCBO Board</h3>
              <ul className="space-y-3 text-white text-sm leading-relaxed">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-yellow-400">Excellent discrimination</strong> — A fault
                    on any circuit trips only that circuit. Every other circuit remains live,
                    minimising disruption to the household.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-yellow-400">No cumulative leakage</strong> — Each RCBO
                    monitors only its own circuit, so standing earth leakage from other circuits
                    does not affect it. This virtually eliminates nuisance tripping.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-yellow-400">Easier fault diagnosis</strong> — When a
                    single RCBO trips, you know immediately which circuit has the fault. No need to
                    isolate circuits one by one to identify the problematic one.
                  </span>
                </li>
              </ul>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-6">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-white">
                <thead>
                  <tr className="border-b border-white/10 text-left text-yellow-400 bg-white/[0.03]">
                    <th className="px-5 py-3 font-semibold">Consideration</th>
                    <th className="px-5 py-3 font-semibold">Dual RCD split-load</th>
                    <th className="px-5 py-3 font-semibold">Full RCBO board</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <tr>
                    <td className="px-5 py-3 align-top">Upfront cost</td>
                    <td className="px-5 py-3 align-top text-yellow-300">Lower</td>
                    <td className="px-5 py-3 align-top">Higher per circuit</td>
                  </tr>
                  <tr className="bg-white/[0.02]">
                    <td className="px-5 py-3 align-top">Fault on one circuit</td>
                    <td className="px-5 py-3 align-top">Disconnects the whole RCD group</td>
                    <td className="px-5 py-3 align-top text-yellow-300">Trips only that circuit</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-3 align-top">Cumulative earth leakage</td>
                    <td className="px-5 py-3 align-top">Shared across the group — nuisance-trip risk</td>
                    <td className="px-5 py-3 align-top text-yellow-300">Isolated per circuit</td>
                  </tr>
                  <tr className="bg-white/[0.02]">
                    <td className="px-5 py-3 align-top">Fault diagnosis</td>
                    <td className="px-5 py-3 align-top">Isolate circuits to find the fault</td>
                    <td className="px-5 py-3 align-top text-yellow-300">Tripped device pinpoints it</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              For most new domestic installations and consumer unit replacements, full RCBO boards
              are now the preferred choice among professional electricians. The additional material
              cost is easily justified by the improved discrimination, reduced nuisance tripping,
              and better fault diagnosis. The time saved in call-backs for nuisance tripping alone
              often pays for the cost difference. For pricing context, see our{' '}
              <SEOInternalLink href="/guides/consumer-unit-replacement-cost">
                consumer unit replacement cost guide
              </SEOInternalLink>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Amendment 4 Changes */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Amendment 4 (A4:2026) — Key Changes
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              BS 7671:2018+A4:2026 is an amendment document that modifies and adds to the existing
              18th Edition rather than being a new book. The most significant changes for consumer
              unit design are the bidirectional device rule in Regulation 530.3.201, the redrafted
              AFDD requirement in Regulation 421.1.7, and the redrafted surge protection criteria in
              Regulation 443.4.
            </p>
            <div className="rounded-2xl bg-yellow-500/5 border border-yellow-500/20 p-6 my-6">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">
                Regulation 530.3.201 — Bidirectional and Unidirectional Devices
              </h3>
              <div className="space-y-3 text-white text-sm leading-relaxed">
                <p>
                  This new regulation addresses a growing concern in modern electrical
                  installations: the presence of power sources that can feed energy in both
                  directions through the consumer unit. Traditional installations have a single
                  source of supply (the DNO mains), and all fault current flows in one direction —
                  from the supply, through the fault, and back to the source. Standard MCBs, RCDs,
                  and RCBOs are designed for this unidirectional fault current.
                </p>
                <p>
                  However, with the rapid growth of domestic battery storage systems, solar PV with
                  battery backup, and vehicle-to-grid (V2G) EV chargers, many installations now have
                  local generation or storage that can supply fault current in the reverse direction
                  — from the battery or generator, through the consumer unit, into the fault. If the
                  protective devices are only rated for unidirectional fault current, they may not
                  operate correctly under a reverse fault condition, potentially failing to clear
                  the fault and allowing it to persist.
                </p>
                <p>
                  Regulation 530.3.201 (Amendment 4) requires that the selection and erection of
                  equipment for protection takes account of the appropriate use of either a
                  unidirectional or a bidirectional protective device. The accompanying note records
                  that product standards for devices such as RCCBs, RCBOs, circuit-breakers and
                  AFDDs require them to be marked to show direction — for example
                  &ldquo;in&rdquo;/&ldquo;out&rdquo;, &ldquo;line&rdquo;/&ldquo;load&rdquo;, or
                  arrows. For consumer unit design, this means checking the device markings and the
                  manufacturer&apos;s data so that a device installed where reverse current can flow
                  is actually rated for it, or implementing measures so reverse fault current is
                  cleared correctly.
                </p>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
              <h3 className="font-bold text-white text-lg mb-3">
                Regulation 421.1.7 — Arc Fault Detection Devices (AFDDs)
              </h3>
              <div className="space-y-3 text-white text-sm leading-relaxed">
                <p>
                  Regulation 421.1.7 sits in Part&nbsp;4 — Protection for Safety, Chapter&nbsp;42.
                  Amendment&nbsp;4 redrafted it so that arc fault detection devices (AFDDs) are now a
                  firm requirement for some premises and a recommendation for others. AFDDs mitigate
                  the risk of fire caused by arc fault currents in AC final circuits.
                </p>
                <div className="rounded-xl border border-white/10 overflow-hidden my-2">
                  <table className="w-full text-sm text-white">
                    <thead>
                      <tr className="border-b border-white/10 text-left text-yellow-400 bg-white/[0.03]">
                        <th className="px-4 py-2.5 font-semibold">Premises type</th>
                        <th className="px-4 py-2.5 font-semibold">AFDD status under 421.1.7</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      <tr>
                        <td className="px-4 py-2.5 align-top">
                          Higher-risk residential buildings, HMOs, purpose-built student
                          accommodation, care homes
                        </td>
                        <td className="px-4 py-2.5 align-top text-yellow-300 font-medium">
                          Required (shall) for socket-outlet final circuits up to 32 A
                        </td>
                      </tr>
                      <tr className="bg-white/[0.02]">
                        <td className="px-4 py-2.5 align-top">
                          All other premises (incl. typical dwellings)
                        </td>
                        <td className="px-4 py-2.5 align-top">
                          Recommended for single-phase AC final circuits supplying socket-outlets up
                          to 32 A
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p>
                  Using AFDDs does not remove the need to apply the other protective measures in the
                  standard. Designers should consider AFDD provision at the consumer unit design
                  stage — particularly for circuits in older wiring systems where degraded
                  insulation may be present.
                </p>
                <p>
                  AFDDs detect the characteristic high-frequency signatures of arc faults in
                  electrical wiring and disconnect the circuit before a sustained arc can ignite
                  surrounding materials. They are installed in the consumer unit in place of, or in
                  addition to, standard MCBs or RCBOs. The combination AFDD+RCBO provides
                  overcurrent, earth fault, and arc fault protection in a single device.
                </p>
              </div>
            </div>
            <p>
              Beyond the Section 530 bidirectional device requirements and the new AFDD
              recommendation (Reg&nbsp;421.1.7), Amendment 4 includes various corrections,
              clarifications, and editorial amendments to the standard. It is important to note that
              Amendment 4 does not change the fundamental requirements for consumer unit design —
              metal enclosures, RCD protection, circuit protection, and labelling requirements all
              remain as per the main 18th Edition text. The amendment adds to the requirements
              rather than replacing them.
            </p>
          </div>
        </div>
      </section>

      {/* SPD Requirements */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Activity className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Surge Protection Device (SPD) Requirements
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              BS 7671 Section 443 covers protection against transient overvoltages — voltage spikes
              caused by lightning strikes (direct or nearby) and switching events on the supply
              network. Amendment 4 redrafted Regulation 443.4. Protection against transient
              overvoltages must now be provided wherever an overvoltage could result in either of the
              two consequences below; for all other cases protection is still required unless the
              owner of the installation declares it is not required because any loss or damage is
              tolerable and they accept the risk. The old risk-assessment method of the previous
              amendment (Regulation 443.5) has been deleted.
            </p>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
              <h3 className="font-bold text-white text-lg mb-4">
                When SPD Protection Must Be Provided (Regulation 443.4.1)
              </h3>
              <ul className="space-y-3 text-white text-sm">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>(a)</strong> serious injury to, or loss of, human life.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong>(c)</strong> significant financial or data loss.
                  </span>
                </li>
              </ul>
              <p className="text-white/60 text-xs leading-relaxed mt-3">
                Limb (b) was deleted by the BS&nbsp;7671:2018+A2:2022 Corrigendum (May 2023), leaving
                the two consequence conditions above.
              </p>
              <p className="text-white text-sm leading-relaxed mt-4">
                For all other cases, protection against transient overvoltages shall be provided
                unless the owner of the installation declares it is not required due to any loss or
                damage being tolerable and they accept the risk of damage to equipment and any
                consequential loss. Designers should therefore evaluate the specific installation
                rather than assume SPDs are always mandatory or never needed.
              </p>
            </div>
            <p>
              Where protection is required — or where the owner does not declare it unnecessary —
              SPDs should be installed. The average UK home now contains thousands of
              pounds worth of electronic equipment — smart TVs, computers, broadband routers, smart
              home devices, LED lighting drivers, heating controls, and appliances with electronic
              controllers. A single transient overvoltage event can damage multiple items
              simultaneously, making SPD provision a sound protective measure.
            </p>
            <p>
              SPDs are installed at the origin of the installation, either within the consumer unit
              (many modern consumer units have dedicated SPD modules) or in a separate enclosure
              adjacent to the consumer unit. The SPD requires a dedicated overcurrent protective
              device (MCB or fuse) for its supply, sized in accordance with the manufacturer&apos;s
              instructions. Regulation 534.4.10 sets the minimum cross-sectional area of SPD
              connecting conductors:
            </p>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-6">
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-white">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-yellow-400 bg-white/[0.03]">
                      <th className="px-5 py-3 font-semibold">Connecting conductor (Reg 534.4.10)</th>
                      <th className="px-5 py-3 font-semibold">Type 2 SPD at origin</th>
                      <th className="px-5 py-3 font-semibold">Type 1 SPD at origin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5">
                    <tr>
                      <td className="px-5 py-3 align-top">
                        To main earthing terminal / protective conductor
                      </td>
                      <td className="px-5 py-3 align-top font-mono text-yellow-400/90">
                        ≥ 6 mm² copper
                      </td>
                      <td className="px-5 py-3 align-top font-mono text-yellow-400/90">
                        ≥ 16 mm² copper
                      </td>
                    </tr>
                    <tr className="bg-white/[0.02]">
                      <td className="px-5 py-3 align-top">
                        Connecting SPDs and OCPDs to live conductors
                      </td>
                      <td className="px-5 py-3 align-top font-mono text-yellow-400/90">
                        ≥ 2.5 mm² copper
                      </td>
                      <td className="px-5 py-3 align-top text-white/70">
                        Per manufacturer / short-circuit rating
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <p>
              SPD connecting leads should also be kept as short as practicable to preserve the level
              of protection. A status indicator on the SPD confirms it is operational — when the
              indicator changes state to show it has operated, the SPD has expended its protection
              capacity and must be replaced.
            </p>
            <p>
              For installations on overhead supply lines, the risk of lightning-induced transient
              overvoltages is significantly higher than for underground supplies, and SPDs are
              almost always required. The DNO supply arrangement should be considered during the
              design stage and documented on the Electrical Installation Certificate.
            </p>
          </div>
        </div>
      </section>

      {/* Labelling and Documentation */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ClipboardCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Labelling, Certification, and Documentation
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              BS 7671 requires comprehensive labelling and documentation of the consumer unit and
              its circuits. Regulation 514.9.1 requires a diagram, chart, table or equivalent that
              indicates the type and composition of each circuit, the method used for compliance
              with automatic disconnection (Regulation 410.3.2), and the information needed to
              identify each protective, isolation and switching device and its location. For simple
              installations this may be a schedule, a durable copy of which must be kept within or
              adjacent to the distribution board. Amendment 4 added an exception so this need not be
              applied for domestic (household) premises where an initial verification certificate or
              an Electrical Installation Condition Report — complete with the guidance for
              recipients in Appendix 6 — has been issued to the person ordering the work.
            </p>
            <p>
              Other notices required at or near the consumer unit include: an instruction notice on
              periodic inspection and testing recording the date of last and recommended next
              inspection (Regulation 514.12.1, with its own domestic-premises exception under
              Amendment 4 where appropriate certification is issued); an isolation warning notice
              where live parts cannot be isolated by a single device (Regulation 514.11.1); the
              earthing arrangement and any RCD test advice; and, where the installation has more
              than one source of supply, an appropriate warning notice. Devices must be arranged and
              identified so that the circuit they protect can be easily recognised (Regulation
              514.8.1).
            </p>
            <p>
              A consumer unit replacement requires a full{' '}
              <SEOInternalLink href="/eic-certificate">
                Electrical Installation Certificate (EIC)
              </SEOInternalLink>{' '}
              — not a Minor Works Certificate. The EIC must include the design, construction, and
              inspection and testing sections completed in full, together with a schedule of test
              results for every circuit. The schedule must include continuity of protective
              conductors (R1+R2), insulation resistance, polarity, earth fault loop impedance (Zs),
              prospective fault current (Ipf), and RCD test results. Elec-Mate generates all of
              these forms digitally, validates test results against BS 7671 limits, and produces
              professional PDF output ready to hand to the client. For a full understanding of
              Amendment 4 requirements, see the{' '}
              <SEOInternalLink href="/training/18th-edition-course">
                18th Edition training course
              </SEOInternalLink>
              .
            </p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Why Electricians Choose Elec-Mate
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians. 70+ calculators, 8 AI agents, 16 certificate types,
            and 46+ training courses — all built to BS 7671:2018+A4:2026.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* App Bridge */}
      <section className="py-8 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <SEOAppBridge
            title="Certify Consumer Unit Work Digitally with Elec-Mate"
            description="Generate compliant Electrical Installation Certificates for consumer unit replacements — with test result validation, digital signatures…"
            ctaText="Try Elec-Mate free"
            ctaHref="/auth/signup"
          />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-5">
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

      {/* Related pages — auto-injected for internal-link health (audit criterion #7).
          Topic-matched via token-Jaccard against the broader SEO corpus. */}
      <section className="px-5 py-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">Related electrical pages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <SEOInternalLink href="/guides/consumer-unit-change">
              Consumer Unit Change UK 2026
            </SEOInternalLink>
            <SEOInternalLink href="/guides/consumer-unit-upgrade">
              Consumer Unit Upgrade
            </SEOInternalLink>
            <SEOInternalLink href="/guides/consumer-unit-types">
              Consumer Unit Types
            </SEOInternalLink>
            <SEOInternalLink href="/guides/consumer-unit-replacement-birmingham">
              Consumer Unit Replacement Birmingham
            </SEOInternalLink>
            <SEOInternalLink href="/consumer-unit-replacement-brighton">
              Consumer Unit Replacement Brighton
            </SEOInternalLink>
            <SEOInternalLink href="/guides/consumer-unit-replacement-bristol">
              Consumer Unit Replacement Bristol
            </SEOInternalLink>
            <SEOInternalLink href="/consumer-unit-replacement-cardiff">
              Consumer Unit Replacement Cardiff
            </SEOInternalLink>
            <SEOInternalLink href="/guides/consumer-unit-replacement-cost">
              Consumer Unit Replacement Cost 2026
            </SEOInternalLink>
          </div>
        </div>
      </section>

      <SEOCTASection
        heading="Certify Consumer Unit Work Digitally"
        subheading="Join 1,000+ UK electricians producing professional EICs with Elec-Mate. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
