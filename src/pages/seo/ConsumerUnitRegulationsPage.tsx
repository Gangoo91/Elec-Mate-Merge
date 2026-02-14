import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
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

const PAGE_TITLE = 'Consumer Unit Regulations 2024 | Amendment 3 Guide | Elec-Mate';
const PAGE_DESCRIPTION =
  'Complete guide to consumer unit regulations under BS 7671:2018+A3:2024. Metal CU requirements, RCD protection, RCBO vs split-load, Amendment 3 changes including Regulation 530.3.201, SPD requirements.';

const faqs = [
  {
    question: 'Do all consumer units need to be metal under BS 7671?',
    answer:
      'BS 7671 Regulation 421.1.201 requires that consumer units and similar switchgear assemblies in domestic premises shall comply with BS EN 61439-3 and shall have their enclosure manufactured from non-combustible material. In practice, this means metal (steel) consumer units. This regulation was introduced in Amendment 3 to the 17th Edition (which carried forward into the 18th Edition) following concerns about the fire risk associated with plastic consumer units. The requirement applies to new installations and to consumer unit replacements in existing installations. It does not require the retrospective replacement of existing plastic consumer units that were compliant when installed — but if the consumer unit is being replaced for any reason, the new unit must be metal. Some manufacturers produce consumer units with a metal enclosure and a non-combustible plastic interior, which also comply with the regulation.',
  },
  {
    question: 'What did Amendment 3 (A3:2024) change for consumer units?',
    answer:
      'Amendment 3 to BS 7671:2018, issued in July 2024, introduced several changes relevant to consumer units. The most significant addition is Regulation 530.3.201, which addresses bidirectional and unidirectional protective devices. This regulation requires that where a supply can operate in both directions — for example, in installations with battery storage or solar PV with battery backup that can export energy — the protective devices in the consumer unit must be suitable for bidirectional fault current flow. Standard MCBs and RCDs are typically unidirectional (designed to clear faults with current flowing in one direction only). With the growth of domestic battery storage and vehicle-to-grid (V2G) charging, this is an increasingly important consideration for consumer unit design. Amendment 3 also includes various corrections, clarifications, and editorial updates to the standard.',
  },
  {
    question: 'Should I use RCBOs or a split-load board with dual RCDs?',
    answer:
      'Both approaches are acceptable under BS 7671, but each has advantages and disadvantages. A split-load board uses two RCDs (typically 63A or 80A, 30mA) to protect groups of circuits, with non-RCD-protected circuits (such as fire alarm and emergency lighting supplies) on the main switch side. The advantage is lower cost — two RCDs plus MCBs are cheaper than individual RCBOs for every circuit. The disadvantage is that a fault on any circuit protected by a particular RCD will trip that RCD and disconnect all circuits sharing it, causing partial loss of supply. An RCBO board provides individual RCD and overcurrent protection for each circuit. A fault on one circuit trips only that circuit. This provides much better discrimination and avoids nuisance tripping affecting multiple circuits. The cost per circuit is higher, but the practical benefits are significant — particularly in larger installations where losing half the circuits to a single RCD trip would cause major inconvenience. For most new domestic installations, full RCBO boards are now the preferred approach.',
  },
  {
    question: 'When is a surge protection device (SPD) required in a consumer unit?',
    answer:
      'BS 7671 Regulation 443.4.1 requires a risk assessment to determine whether surge protection is needed. The regulation was strengthened in the 18th Edition and now requires SPDs to be installed where the consequence of an overvoltage event would be serious — for example, where the installation includes valuable electronic equipment, where the building has a lightning protection system, or where the installation supplies equipment essential for safety (such as fire detection systems or security equipment). In practice, most domestic installations now include SPDs because the cost is relatively low (Type 2 SPDs suitable for consumer unit installation cost between 30 and 60 pounds) and the protection they provide is significant — a single lightning-induced surge can destroy thousands of pounds worth of electronic equipment. The SPD is installed at the origin of the installation, typically within or adjacent to the consumer unit, and requires a dedicated protective device (MCB or fuse) on its supply.',
  },
  {
    question: 'Is replacing a consumer unit notifiable under Part P?',
    answer:
      'Yes. Replacing a consumer unit is always notifiable under Part P of the Building Regulations, regardless of whether it is a like-for-like replacement or an upgrade. This is because the consumer unit is the central point of the installation that houses all the main protective devices, and its correct design and installation are critical to the safety of the entire installation. The replacement must be either self-certified by an electrician registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or BRE), or notified to the local authority building control department before the work begins. A full Electrical Installation Certificate (EIC) is required for a consumer unit replacement — a Minor Works Certificate is not appropriate because the work involves the installation or replacement of a distribution board.',
  },
  {
    question: 'What RCD protection is required in a domestic consumer unit?',
    answer:
      'BS 7671 Regulation 411.3.4 requires additional protection by a 30mA RCD for several categories of circuit: all socket outlet circuits rated up to 32A, all circuits supplying mobile equipment intended for outdoor use up to 32A, all circuits where cables are concealed in walls at a depth of less than 50mm (unless the cable has an earthed metallic covering), and all circuits where cables are in walls or partitions containing metallic parts regardless of depth (unless the cable has an earthed metallic covering). In practice, this covers the vast majority of circuits in a domestic installation. The only circuits that may not require 30mA RCD protection are those supplying fixed equipment with permanently connected cables at a depth exceeding 50mm, and specific circuits where RCD protection might cause a greater hazard (such as fire alarm circuits, where the loss of supply due to an RCD trip could compromise fire safety). Even for these circuits, many designers choose to provide RCD protection as good practice.',
  },
];

const features = [
  {
    icon: Calculator,
    title: '70 Electrical Calculators',
    description:
      'Maximum demand calculation, cable sizing for mains tails, Zs verification for every circuit, and dozens more. All built to BS 7671:2018+A3:2024.',
  },
  {
    icon: Brain,
    title: '8 AI Agents + 12 AI Tools',
    description:
      'Ask the AI about consumer unit design, RCD selection, SPD requirements, or Amendment 3 changes. Get instant, regulation-referenced answers.',
  },
  {
    icon: FileText,
    title: '8 Certificate Types',
    description:
      'Generate Electrical Installation Certificates for consumer unit replacements with all mandatory fields, test result validation, and professional PDF output.',
  },
  {
    icon: ShieldCheck,
    title: 'BS 7671:2018+A3:2024',
    description:
      'Built to the current 18th Edition including Amendment 3. Regulation 530.3.201, SPD requirements, and all RCD protection rules fully up to date.',
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
  datePublished: '2025-02-01',
  dateModified: '2026-02-10',
  author: {
    '@type': 'Organization',
    name: 'Elec-Mate',
  },
  publisher: {
    '@type': 'Organization',
    name: 'Elec-Mate',
    logo: {
      '@type': 'ImageObject',
      url: 'https://elec-mate.com/logo.jpg',
    },
  },
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://elec-mate.com/guides/consumer-unit-regulations',
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
    { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://elec-mate.com/' },
    { '@type': 'ListItem', position: 2, name: 'Guides', item: 'https://elec-mate.com/guides' },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'Consumer Unit Regulations',
      item: 'https://elec-mate.com/guides/consumer-unit-regulations',
    },
  ],
};

export default function ConsumerUnitRegulationsPage() {
  useSEO({
    title: 'Consumer Unit Regulations 2024 | Amendment 3 Guide',
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
            BS 7671:2018 + A3:2024
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Consumer Unit Regulations
            <span className="block text-yellow-400 mt-1">Amendment 3 Guide (2024)</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            The definitive guide to consumer unit regulations under BS 7671:2018+A3:2024. Metal
            enclosures, RCD protection, RCBO design, SPD requirements, and the new Regulation
            530.3.201.
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
              7671:2018+A3:2024 — the 18th Edition of the IET Wiring Regulations with Amendment 3,
              issued in July 2024. This standard, together with the product standard BS EN 61439-3
              (which specifies construction and performance requirements for distribution boards),
              defines what a consumer unit must be made of, what protection it must contain, and how
              it must be installed.
            </p>
            <p>
              For electricians, the consumer unit replacement is one of the most common jobs in
              domestic work. It is also one of the most regulation-intensive: it is notifiable under
              Part P, requires a full Electrical Installation Certificate (EIC), involves decisions
              about RCD architecture, SPD provision, circuit labelling, and (since Amendment 3) the
              suitability of protective devices for bidirectional current flow. Getting it right
              requires a thorough understanding of the current regulations.
            </p>
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
              introduced as part of Amendment 3 to the 17th Edition (BS 7671:2008+A3:2015) and
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
              RCD Protection Requirements (Regulation 411.3.4)
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              BS 7671 Regulation 411.3.4 sets out the circumstances where additional protection by a
              30 mA RCD is required. The requirements have expanded with each edition of the
              standard, and in the current 18th Edition, almost every circuit in a domestic consumer
              unit requires RCD protection.
            </p>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
              <h3 className="font-bold text-white text-lg mb-4">
                Circuits Requiring 30 mA RCD Protection
              </h3>
              <ul className="space-y-3 text-white">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-yellow-400">All socket outlets rated up to 32 A</strong>{' '}
                    — This covers every standard 13 A socket, 16 A industrial socket, and 32 A
                    socket in the installation. There are no exceptions based on location or use —
                    all socket outlets up to 32 A must be RCD-protected.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-yellow-400">
                      Mobile equipment outdoors up to 32 A
                    </strong>{' '}
                    — Any circuit supplying equipment intended for outdoor use, including garden
                    lighting supplies, external sockets, and circuits to outbuildings.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-yellow-400">
                      Cables in walls at less than 50 mm depth
                    </strong>{' '}
                    — Unless the cable has an earthed metallic covering (SWA, MICC) or is in earthed
                    metallic conduit or trunking, cables at shallow depth in walls must be
                    RCD-protected.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-yellow-400">Cables in walls with metallic parts</strong>{' '}
                    — Cables in metal-stud partitions, steelwork, or other walls containing metallic
                    elements must be RCD-protected regardless of depth.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span>
                    <strong className="text-yellow-400">
                      Lighting circuits in domestic premises
                    </strong>{' '}
                    — Most lighting circuits in homes are wired in cable concealed in walls at less
                    than 50 mm depth, bringing them within the RCD requirement.
                  </span>
                </li>
              </ul>
            </div>
            <p>
              The practical effect is that almost every circuit in a domestic consumer unit now
              requires 30 mA RCD protection. The main exceptions are circuits supplying fixed
              equipment with cables that are either clipped to the surface (not concealed in walls),
              run in metallic containment, or routed at a depth exceeding 50 mm. Even for these
              circuits, many designers provide RCD protection as a matter of good practice.
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
                    cost less than individual RCBOs for every circuit. A typical 10-way split-load
                    board with two RCDs costs approximately 60-100 pounds less than the equivalent
                    RCBO board.
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
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              For most new domestic installations and consumer unit replacements, full RCBO boards
              are now the preferred choice among professional electricians. The additional cost
              (typically 60-150 pounds depending on the number of circuits) is easily justified by
              the improved discrimination, reduced nuisance tripping, and better fault diagnosis.
              The time saved in call-backs for nuisance tripping alone often pays for the cost
              difference.
            </p>
          </div>
        </div>
      </section>

      {/* Amendment 3 Changes */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Amendment 3 (A3:2024) — Key Changes
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              BS 7671:2018+A3:2024 was issued on 31 July 2024 as a free PDF supplement to the main
              standard. It is not a new book — it is an amendment document that modifies and adds to
              the existing 18th Edition. The most significant change for consumer unit design is the
              introduction of Regulation 530.3.201.
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
                  Regulation 530.3.201 requires that where bidirectional current flow is possible,
                  the protective devices must be suitable for operation in both directions, or
                  additional measures must be taken to ensure correct fault clearance regardless of
                  the direction of current flow. For consumer unit design, this means checking with
                  the device manufacturer whether their MCBs and RCBOs are rated for bidirectional
                  fault current, and if not, implementing appropriate measures such as dedicated
                  protection for the battery or generator circuit that prevents reverse fault
                  current from reaching the main distribution.
                </p>
              </div>
            </div>
            <p>
              Beyond Regulation 530.3.201, Amendment 3 includes various corrections, clarifications,
              and editorial amendments to the standard. It is important to note that Amendment 3
              does not change the fundamental requirements for consumer unit design — metal
              enclosures, RCD protection, circuit protection, and labelling requirements all remain
              as per the main 18th Edition text. The amendment adds to the requirements rather than
              replacing them.
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
              network. Regulation 443.4.1 requires a risk assessment to determine whether SPDs are
              necessary. Where the risk assessment identifies that the consequences of an
              overvoltage event would include risk to human life, risk to a public service or
              cultural heritage site, disruption to a commercial or industrial activity, or damage
              to a large number of co-located individuals, SPD protection must be provided.
            </p>
            <p>
              In practice, the risk assessment almost always concludes that SPDs should be installed
              in modern domestic installations. The average UK home now contains thousands of pounds
              worth of electronic equipment — smart TVs, computers, broadband routers, smart home
              devices, LED lighting drivers, heating controls, and appliances with electronic
              controllers. A single transient overvoltage event can damage multiple items
              simultaneously. The cost of a Type 2 SPD (suitable for most domestic installations) is
              typically 30-60 pounds — a fraction of the potential damage cost.
            </p>
            <p>
              SPDs are installed at the origin of the installation, either within the consumer unit
              (many modern consumer units have dedicated SPD modules) or in a separate enclosure
              adjacent to the consumer unit. The SPD requires a dedicated MCB or fuse for its
              supply, sized according to the manufacturer's instructions (typically 32A or 40A). A
              green indicator on the SPD confirms it is operational — when the indicator turns red
              or disappears, the SPD has operated and expended its protection capacity and must be
              replaced.
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
              BS 7671 requires comprehensive labelling of the consumer unit and its contents.
              Regulation 514.9.1 requires that every circuit be identified by a durable label at the
              distribution board. The label must identify the circuit (for example, "Upstairs
              Sockets," "Kitchen Ring," "Immersion Heater") and must be accurate, legible, and
              durable. The regulation specifically notes that labels depending on the position of
              the device within the board are not sufficient on their own — each device must be
              individually labelled.
            </p>
            <p>
              Additional labelling requirements include: a warning notice at the origin of the
              installation stating the type and rating of the main protective device (Regulation
              514.12.1), a warning notice identifying that the installation has more than one source
              of supply where applicable (Regulation 514.15.1), the earthing arrangement (TN-S,
              TN-C-S, or TT), and a notice advising that the RCDs fitted should be tested at
              quarterly intervals by pressing the test button.
            </p>
            <p>
              A consumer unit replacement requires a full Electrical Installation Certificate (EIC)
              — not a Minor Works Certificate. The EIC must include the design, construction, and
              inspection and testing sections completed in full, together with a schedule of test
              results for every circuit. The schedule must include continuity of protective
              conductors (R1+R2), insulation resistance, polarity, earth fault loop impedance (Zs),
              prospective fault current (Ipf), and RCD test results. Elec-Mate generates all of
              these forms digitally, validates test results against BS 7671 limits, and produces
              professional PDF output ready to hand to the client.
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
            Purpose-built for UK electricians. 70 calculators, 8 AI agents, 8 certificate types, and
            36+ training courses — all built to BS 7671:2018+A3:2024.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
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
      <SEOCTASection
        heading="Certify Consumer Unit Work Digitally"
        subheading="Join 430+ UK electricians producing professional EICs with Elec-Mate. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
