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
  Cable,
  Home,
  TriangleAlert,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PAGE_TITLE = 'Earthing Arrangements Explained | TN-S TN-C-S TT Systems | Elec-Mate';
const PAGE_DESCRIPTION =
  'Complete guide to UK earthing systems: TN-S, TN-C-S (PME), TN-C, TT, and IT. How to identify each on site, typical Ze values, PME restrictions, electrode testing. For UK electricians.';

const faqs = [
  {
    question: 'What is the difference between TN-S and TN-C-S earthing?',
    answer:
      'In a TN-S system, the earth and neutral are separate conductors throughout the entire distribution network, from the transformer to the consumer. The earth path is provided by the metallic sheath or armour of the supply cable, which acts as a dedicated protective earth conductor. In a TN-C-S system (also known as PME — Protective Multiple Earthing), the earth and neutral functions are combined into a single conductor (called the PEN conductor or Combined Neutral and Earth) in the supply cable, and are separated at the point of entry to the consumer installation. The DNO provides an earth terminal at the cut-out by connecting it to the neutral. The key practical difference is that TN-C-S relies on the neutral for the earth path. If the neutral is broken between the transformer and the property, the earth at the property can rise to a dangerous potential. This is why PME supplies have specific restrictions on earthing for certain situations, particularly those involving connections to earth outside the main equipotential zone.',
  },
  {
    question: 'How do I identify the earthing arrangement on site?',
    answer:
      'The earthing arrangement can usually be identified by examining the supply intake at the meter position. For a TN-S supply, the earth conductor will be connected to the metallic sheath or armour of the supply cable — you will see an earth clamp on the cable sheath, typically a lead or aluminium cable with a visible earth tag. The earth conductor runs from this clamp to the main earthing terminal. For a TN-C-S (PME) supply, the earth terminal is provided at the cut-out itself — the earth conductor connects directly to the cut-out, which is bonded internally to the neutral. The DNO may have a green and yellow earth tail coming from the cut-out. For a TT supply, there is no earth provision from the DNO at all — the earth conductor runs from the main earthing terminal to an earth electrode (rod, plate, or tape) installed in the ground near the property. If you are unsure, you can contact the DNO to confirm the earthing arrangement, and you should always verify by testing the Ze (earth fault loop impedance at the origin).',
  },
  {
    question: 'What are the typical Ze values for each earthing system?',
    answer:
      'The maximum values of earth fault loop impedance at the origin (Ze) that the DNO will declare are: TN-S — 0.8 ohms maximum (typical measured values are often between 0.2 and 0.5 ohms); TN-C-S (PME) — 0.35 ohms maximum (typical measured values are often between 0.1 and 0.3 ohms); TT — no declared value from the DNO because the earth path is through the electrode and the general mass of earth, so Ze depends entirely on the electrode resistance. For TT systems, the earth electrode resistance (Ra) is the dominant factor and can range from under 10 ohms (good electrode in damp clay soil) to over 200 ohms (poor electrode in dry sandy or rocky ground). BS 7671 does not specify a maximum Ze for TT systems, but the product of Ra and the operating current of the RCD (Ra x IΔn) must not exceed 50 V (the conventional touch voltage limit). For a 30 mA RCD, this means Ra must not exceed 1667 ohms — but in practice, much lower values are needed for reliable RCD operation.',
  },
  {
    question: 'What are the PME restrictions and why do they exist?',
    answer:
      'PME (Protective Multiple Earthing) restrictions exist because a TN-C-S supply relies on the neutral conductor for the earth return path. If the neutral is broken or has a high impedance between the transformer and the property, the PME earth terminal at the property can rise to a dangerous voltage — potentially up to full phase voltage (230V) in the worst case. This voltage would appear on any metalwork connected to the PME earth. Inside the property, the main equipotential bonding keeps everything at approximately the same potential, so the risk is managed. However, any earthed metalwork that extends outside the main equipotential zone — or that provides a connection to true earth — creates a danger because a person could simultaneously touch the PME-earthed metalwork and genuine earth, experiencing the full voltage difference. The specific PME restrictions are set out in BS 7671 and the ESQCR (Electricity Safety, Quality and Continuity Regulations). They include restrictions on earthing for bathrooms with metallic baths or showers, restrictions on earthing for outdoor installations including EV charge points, restrictions on earthing for swimming pools and agricultural installations, and specific requirements for bonding and electrode installation where PME earthing is used in combination with a TT arrangement.',
  },
  {
    question: 'How do I test an earth electrode on a TT system?',
    answer:
      'Earth electrode testing on a TT system can be carried out using an earth electrode resistance tester (a dedicated instrument) or a loop impedance tester. The dedicated electrode resistance test uses the fall-of-potential method: you drive two temporary test spikes into the ground in a straight line from the electrode under test, with the current spike at a distance of at least 10 times the length of the electrode (typically 30 metres or more for a standard 1.2m rod) and the potential spike at 62% of the distance to the current spike. The instrument passes a current between the electrode and the current spike, and measures the voltage at the potential spike to calculate the resistance. This is the most accurate method but requires significant space and additional test spikes. For many domestic TT installations, the more practical approach is to measure the earth fault loop impedance (Ze) at the origin with the main switch off and all circuits isolated, using a standard loop impedance tester. The Ze reading on a TT system is dominated by the electrode resistance and gives a working value for design calculations. The electrode should be retested periodically as soil conditions change with the seasons — resistance is typically higher in dry summer conditions and lower in wet winter conditions.',
  },
];

const features = [
  {
    icon: Calculator,
    title: '70 Electrical Calculators',
    description:
      'Earth fault loop impedance verification, Zs calculation, electrode resistance checks, and dozens more. All built to BS 7671:2018+A3:2024.',
  },
  {
    icon: Brain,
    title: '8 AI Agents + 12 AI Tools',
    description:
      'Ask the AI about earthing arrangements, PME restrictions, or electrode testing procedures. Get instant, regulation-referenced answers on site.',
  },
  {
    icon: ClipboardCheck,
    title: 'Digital EICR Forms',
    description:
      'Record the earthing arrangement, Ze values, and electrode test results directly into your digital EICR. All data validated against BS 7671 limits.',
  },
  {
    icon: ShieldCheck,
    title: 'BS 7671:2018+A3:2024',
    description:
      'Built to the current 18th Edition including Amendment 3. All earthing references, Ze values, and compliance checks are fully up to date.',
  },
  {
    icon: Smartphone,
    title: 'Works Offline on Site',
    description:
      'Check earthing regulations, record test results, and complete certificates even without signal. Data syncs automatically when connectivity returns.',
  },
  {
    icon: Activity,
    title: 'Smart Test Validation',
    description:
      'Enter your Ze and Zs readings and the app validates them against the declared values and BS 7671 maximum permitted values for the selected protective device.',
  },
];

const articleSchema = {
  '@type': 'Article',
  headline: PAGE_TITLE,
  description: PAGE_DESCRIPTION,
  datePublished: '2025-04-01',
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
    '@id': 'https://elec-mate.com/guides/earthing-arrangements',
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
    { '@type': 'ListItem', position: 3, name: 'Earthing Arrangements', item: 'https://elec-mate.com/guides/earthing-arrangements' },
  ],
};

export default function EarthingArrangementsPage() {
  useSEO({
    title: 'Earthing Arrangements Explained | TN-S TN-C-S TT Systems',
    description: PAGE_DESCRIPTION,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...articleSchema })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...breadcrumbSchema })}</script>
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
            Earthing Arrangements
            <span className="block text-yellow-400 mt-1">TN-S, TN-C-S, TN-C, TT &amp; IT</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            The complete guide to UK earthing systems. How each works, how to identify them on site, typical Ze values, PME restrictions, and electrode testing. For UK electricians.
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
              href="#earthing-explained"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              Read the Guide
              <ArrowDown className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* Why Earthing Matters */}
      <section id="earthing-explained" className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Why Earthing Matters</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Earthing is the single most important safety measure in any electrical installation. Its purpose is to ensure that in the event of a fault — such as a live conductor touching an exposed-conductive-part (the metal case of an appliance, for example) — the resulting fault current has a low-impedance path back to the source, allowing the protective device (fuse, MCB, or RCD) to disconnect the circuit within the required time.
            </p>
            <p>
              Without a proper earth path, a fault on an appliance or circuit would leave the metalwork at a dangerous potential. Anyone touching the metalwork while simultaneously in contact with true earth (a concrete floor, a metal water pipe, or the ground) would receive an electric shock. The magnitude and duration of the shock depend on the voltage, the body impedance, and how long the fault persists. A proper earthing system ensures that faults are cleared quickly — typically within 0.4 seconds for final circuits and 5 seconds for distribution circuits — limiting both the magnitude and duration of any shock to a level that is not dangerous.
            </p>
            <p>
              BS 7671 Chapter 31 requires the designer of an electrical installation to determine the type of earthing system, the nature of the supply, and the earth fault loop impedance at the origin of the installation. This information is fundamental to the design because it determines the maximum permitted earth fault loop impedance (Zs) for every circuit, which in turn affects cable sizing, protective device selection, and the need for additional protection by RCDs.
            </p>
          </div>
        </div>
      </section>

      {/* The Five Earthing Systems */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Cable className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">The Five Earthing Systems Explained</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed mb-6">
            <p>
              BS 7671 recognises five standard earthing arrangements, each designated by a two or three-letter code. The first letter indicates the relationship of the supply source (transformer) to earth. The second letter indicates the relationship of the exposed-conductive-parts of the installation to earth. Where there is a third letter, it describes the arrangement of the neutral and earth conductors in the supply network.
            </p>
            <p>
              <strong className="text-yellow-400">T</strong> = direct connection to earth (French: terre). <strong className="text-yellow-400">N</strong> = direct connection to the neutral of the supply system, which is itself earthed. <strong className="text-yellow-400">S</strong> = separate neutral and protective conductors. <strong className="text-yellow-400">C</strong> = combined neutral and protective conductor (PEN conductor). <strong className="text-yellow-400">I</strong> = isolated from earth or connected through a high impedance.
            </p>
          </div>

          {/* TN-S */}
          <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 mb-4">
            <h3 className="font-bold text-white text-xl mb-3">TN-S — Separate Neutral and Earth</h3>
            <div className="space-y-3 text-white text-sm leading-relaxed">
              <p>
                In a TN-S system, the supply source (transformer) has its neutral point connected directly to earth. The protective earth conductor is separate from the neutral throughout the entire distribution network. The earth path is typically provided by the metallic sheath of the supply cable — in older installations, this is often a lead-sheathed cable where the lead sheath serves as the protective earth conductor (the cable is referred to as PILC — Paper Insulated Lead Covered).
              </p>
              <p>
                TN-S was the standard earthing arrangement for most of the 20th century in the UK. It is considered the most robust earthing system because the earth and neutral are always separate — there is no risk of a broken neutral causing the earth to rise to a dangerous potential. The maximum declared Ze for a TN-S supply is 0.8 ohms, and typical measured values are between 0.2 and 0.5 ohms.
              </p>
              <p>
                TN-S supplies are becoming less common as the DNOs replace older lead-sheathed cables with modern plastic-sheathed cables (which have no metallic sheath to serve as an earth conductor). Many properties that were originally TN-S have been converted to TN-C-S by the DNO when the supply cable is replaced.
              </p>
            </div>
          </div>

          {/* TN-C-S */}
          <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 mb-4">
            <h3 className="font-bold text-white text-xl mb-3">TN-C-S — Combined Neutral and Earth (PME)</h3>
            <div className="space-y-3 text-white text-sm leading-relaxed">
              <p>
                In a TN-C-S system, the supply source neutral is connected directly to earth. In the supply network, the neutral and earth functions are combined into a single conductor called the PEN (Protective Earth and Neutral) conductor — this is the TN-C part. At the point of entry to the consumer installation, the neutral and earth are separated — this is the TN-S part. The result is a combined system: TN-C in the supply network, TN-S within the consumer installation.
              </p>
              <p>
                TN-C-S is also known as Protective Multiple Earthing (PME) because the PEN conductor is earthed at multiple points along the distribution network, not just at the transformer. This multiple earthing keeps the neutral voltage low under normal conditions and provides multiple earth paths for fault currents.
              </p>
              <p>
                TN-C-S is now the most common earthing arrangement for new domestic supplies in the UK. The maximum declared Ze is 0.35 ohms, and typical measured values are between 0.1 and 0.3 ohms. The low Ze values make TN-C-S supplies excellent for achieving short disconnection times and meeting the maximum Zs requirements of BS 7671.
              </p>
              <p>
                However, TN-C-S has a significant vulnerability: if the PEN conductor is broken or becomes high impedance between the transformer and the property, the entire return path for neutral current is disrupted. In this scenario, neutral current seeks alternative paths to earth — including through the consumer's earth system and any metalwork connected to it. This can raise the potential of the consumer's earthing system to a dangerous voltage relative to true earth. This is the reason for the PME restrictions discussed later in this guide.
              </p>
            </div>
          </div>

          {/* TN-C */}
          <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10 mb-4">
            <h3 className="font-bold text-white text-xl mb-3">TN-C — Combined Throughout</h3>
            <div className="space-y-3 text-white text-sm leading-relaxed">
              <p>
                In a TN-C system, the neutral and protective earth functions are combined into a single PEN conductor throughout the entire system, including within the consumer installation. This means there is no separate protective earth conductor at all — the neutral serves both functions.
              </p>
              <p>
                TN-C is not permitted for new consumer installations in the UK. BS 7671 Regulation 312.2.1 prohibits the use of PEN conductors downstream of the origin of the installation. However, it exists in the supply network (as part of TN-C-S systems) and may occasionally be encountered in very old installations or in certain industrial contexts. If you encounter a TN-C arrangement within a consumer installation, it is a serious defect that should be classified as C1 or C2 on an EICR and must be corrected.
              </p>
            </div>
          </div>

          {/* TT */}
          <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 mb-4">
            <h3 className="font-bold text-white text-xl mb-3">TT — Earth Electrode System</h3>
            <div className="space-y-3 text-white text-sm leading-relaxed">
              <p>
                In a TT system, the supply source neutral is connected directly to earth at the transformer, but the DNO does not provide an earth terminal at the consumer premises. Instead, the consumer must provide their own earth connection by installing an earth electrode — typically a driven copper-clad steel rod, but sometimes a plate electrode, tape electrode, or foundation earth electrode.
              </p>
              <p>
                TT systems are common in rural areas where the overhead supply lines are unsheathed conductors on wooden poles — there is no metallic cable sheath to provide a TN-S earth, and the DNO does not provide PME earthing on overhead lines. They are also used in situations where PME earthing restrictions prevent the use of a TN-C-S earth, such as for certain EV charger installations, outdoor installations, and caravans.
              </p>
              <p>
                The major characteristic of a TT system is that the earth fault current path includes the general mass of earth — from the consumer's electrode, through the ground, to the supply transformer's earth electrode. This path has a much higher impedance than the metallic paths in TN systems, meaning earth fault loop impedance (Ze) values are significantly higher. Typical Ze values for TT systems range from 20 ohms (excellent electrode in wet clay soil) to over 200 ohms (poor electrode in dry sandy ground).
              </p>
              <p>
                Because of the high Ze, TT systems cannot rely solely on overcurrent devices (MCBs and fuses) to provide earth fault protection within the required disconnection times. Instead, BS 7671 requires RCD protection for all circuits on a TT system. The RCD provides disconnection even with very small fault currents, overcoming the high impedance of the earth electrode path.
              </p>
            </div>
          </div>

          {/* IT */}
          <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
            <h3 className="font-bold text-white text-xl mb-3">IT — Isolated or Impedance Earthed</h3>
            <div className="space-y-3 text-white text-sm leading-relaxed">
              <p>
                In an IT system, the supply source is either isolated from earth entirely or connected to earth through a high impedance. The exposed-conductive-parts of the installation are earthed independently, either via individual electrodes or a collective electrode. Under a first fault condition, the fault current is extremely small (limited by the source impedance to earth), so the circuit can continue to operate — an insulation monitoring device (IMD) raises an alarm to alert maintenance staff that a fault exists, but the supply is not interrupted.
              </p>
              <p>
                IT systems are rare in the UK for general installations. They are used in specific critical applications where continuity of supply is paramount — hospitals (operating theatres), certain industrial processes, and military installations. BS 7671 Section 411.6 covers the requirements for IT systems, including the need for insulation monitoring devices and the special arrangements required for automatic disconnection under a second fault condition. Most UK electricians will not encounter IT systems in normal domestic or commercial practice.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PME Restrictions */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <TriangleAlert className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">PME Earthing Restrictions</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The vulnerability of PME supplies to open-circuit neutral faults means that specific restrictions apply to the use of PME earthing in certain situations. These restrictions are set out in BS 7671 and the Electricity Safety, Quality and Continuity Regulations 2002 (ESQCR). Understanding and applying these restrictions correctly is essential for any electrician working with TN-C-S supplies.
            </p>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
              <h3 className="font-bold text-white text-lg mb-4">Key PME Restrictions</h3>
              <ul className="space-y-3 text-white">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-yellow-400">Bathrooms with metallic baths or showers</strong> — Where a bathroom contains a metallic bath, shower tray, or other metallic sanitary fitting that is connected to the PME earth, there is a risk that a broken neutral could raise the bath or shower to a dangerous voltage while the person is in a wet environment with reduced body resistance. Supplementary equipotential bonding to all extraneous-conductive-parts is essential, and in some cases a separate TT earth for the bathroom circuits may be required.</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-yellow-400">EV charge point installations</strong> — Electric vehicle charging involves a long cable connection between the charge point (connected to PME earth) and the vehicle (connected to true earth through its tyres). Under a broken neutral condition, dangerous voltage could appear on the vehicle chassis. BS 7671 and the IET Code of Practice for EV Charging require specific measures, which may include a separate TT earth electrode for the charging circuit, or specific PME earthing arrangements with additional earth electrodes.</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-yellow-400">External installations and outbuildings</strong> — Supplies to garages, sheds, outbuildings, garden lighting, and other external installations extend the PME earth outside the main equipotential zone of the dwelling. A person outside the dwelling could simultaneously touch PME-earthed metalwork and true earth (the ground). BS 7671 Regulation 708.411.4 requires specific measures for these installations, which may include a separate TT earth electrode.</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-yellow-400">Swimming pools and agricultural installations</strong> — These locations carry the highest risk under PME conditions due to extensive contact with earth and water. PME earthing is generally not permitted for swimming pool installations (BS 7671 Section 702) and may be restricted for agricultural installations (Section 705). A TT earthing arrangement with a dedicated electrode is typically required.</span>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                  <span><strong className="text-yellow-400">Caravans and caravan parks</strong> — BS 7671 Section 708 requires that the supply to caravan pitches uses a TT earthing arrangement. PME earthing must not be used for the caravan supply because the caravan is an isolated metallic structure with no permanent earth connection — a broken neutral would make the entire caravan structure live.</span>
                </li>
              </ul>
            </div>
            <p>
              The DNO is responsible for advising whether a PME earth is available and for providing it where appropriate. In situations where PME restrictions apply, the electrician must either use a separate TT earth (installing an earth electrode) or implement the specific additional measures described in BS 7671 and the relevant IET Guidance Notes and Codes of Practice.
            </p>
          </div>
        </div>
      </section>

      {/* Electrode Testing */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Activity className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Earth Electrode Testing for TT Systems</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              On a TT system, the performance of the earth electrode is critical to the safety of the installation. The electrode resistance determines the earth fault loop impedance and therefore the ability of protective devices to disconnect within the required time. Testing the electrode is a mandatory part of both initial verification and periodic inspection.
            </p>
            <p>
              The most accurate method of measuring earth electrode resistance is the <strong className="text-yellow-400">fall-of-potential method</strong> using a dedicated earth electrode resistance tester. This involves placing two temporary test spikes in a straight line away from the electrode under test. The current spike is placed at a distance of at least 10 times the length of the electrode — for a standard 1.2-metre rod, this means at least 12 metres, though 30 metres or more is recommended for accuracy. The potential spike is placed at 62% of the distance between the electrode and the current spike. The instrument injects a current between the electrode and the current spike, and measures the potential at the intermediate spike to calculate the resistance.
            </p>
            <p>
              Where space is limited and the fall-of-potential method is not practical, a standard earth fault loop impedance test can provide a working value for the electrode resistance. With the main switch off and all circuits disconnected, measure Ze using a loop impedance tester. On a TT system, the Ze value is dominated by the electrode resistance (the supply transformer earth electrode resistance is typically very low), so the Ze reading gives a practical indication of the electrode performance. This is the method most commonly used during periodic inspection on domestic TT installations.
            </p>
            <p>
              Earth electrode resistance varies with soil conditions, which change seasonally. Resistance is typically lowest in winter (when the soil is wet) and highest in summer (when the soil is dry). For design purposes, the worst-case (highest) resistance should be used. Where possible, test the electrode during dry conditions to obtain the worst-case value. BS 7671 requires that the product of the earth electrode resistance and the rated residual operating current of the RCD (Ra x IΔn) does not exceed 50 V. For a standard 30 mA RCD, this gives a maximum electrode resistance of 1,667 ohms — but in practice, significantly lower values are needed for reliable and consistent RCD operation.
            </p>
          </div>
        </div>
      </section>

      {/* DNO Responsibilities */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Home className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">DNO Responsibilities and the Demarcation Point</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The Distribution Network Operator (DNO) is responsible for the supply up to the cut-out (service fuse). This includes the supply cable from the transformer to the property, the cut-out itself, and (on TN-C-S and TN-S supplies) the earth connection at the cut-out. Everything downstream of the cut-out — the meter tails, the consumer unit, and the entire consumer installation — is the responsibility of the consumer and the electrician.
            </p>
            <p>
              When designing an installation, you need to know the earthing arrangement and the declared supply characteristics from the DNO. These include the nominal voltage (typically 230V single-phase or 400V three-phase), the prospective fault current at the origin (Ipf), and the earth fault loop impedance at the origin (Ze). The DNO provides maximum declared values — the actual values you measure on site should be equal to or less than the declared values. If your measured Ze exceeds the DNO declared maximum, this indicates a potential problem with the supply earth that should be referred to the DNO.
            </p>
            <p>
              It is important to note that the DNO can change the earthing arrangement. A property that has been TN-S for decades may be converted to TN-C-S when the DNO replaces the old lead-sheathed cable with a modern plastic-sheathed cable. When this happens, the electrician undertaking any subsequent work on the installation needs to verify the current earthing arrangement, update the installation records, and ensure that any PME restrictions are now applied where relevant.
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
            Purpose-built for UK electricians. 70 calculators, 8 AI agents, digital certificates, and 36+ training courses — all built to BS 7671:2018+A3:2024.
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
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
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
        heading="Record Earthing Data Digitally"
        subheading="Join 430+ UK electricians using Elec-Mate for on-site testing and certification. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
