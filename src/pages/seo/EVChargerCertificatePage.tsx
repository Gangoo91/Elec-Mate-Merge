import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Zap,
  ShieldCheck,
  FileCheck2,
  Smartphone,
  PenTool,
  Download,
  ChevronDown,
  Car,
  Cable,
  Activity,
  AlertTriangle,
  CheckCircle2,
  Gauge,
} from 'lucide-react';

const PAGE_TITLE =
  'EV Charger Installation Certificate App | BS 7671 Section 722 | Elec-Mate';
const PAGE_DESCRIPTION =
  'Create EV charger installation certificates on your phone. BS 7671 Section 722 compliant. PME assessment, load management, and digital signatures. Start free.';

const faqs = [
  {
    question:
      'Do I need a separate certificate for every EV charger installation?',
    answer:
      'Yes. Every EV charger installation requires its own Electrical Installation Certificate (EIC) as specified in BS 7671. The certificate must document the supply characteristics, earthing arrangement, circuit details, and all test results for the dedicated EV charging circuit. If you are installing a charger at a property that also requires other electrical work, the EV circuit can be included on the same EIC, but the Section 722 requirements must be specifically addressed. Elec-Mate pre-populates the Section 722 checklist items so nothing is missed.',
  },
  {
    question:
      'What earthing arrangement is required for an EV charger on a PME supply?',
    answer:
      'Under Regulation 722.411.4.1 of BS 7671, where the installation is supplied by a PME (TN-C-S) earthing system, the protective conductor for the EV charging circuit must not be connected to the PME earth terminal. Instead, a separate earth electrode (TT earthing rod) must be installed, and the circuit must be protected by a 30mA RCD. This is because an open PEN conductor fault on the supply could put a dangerous voltage on the vehicle chassis through the charging cable. The earth electrode resistance must be low enough to ensure the RCD will operate within the required disconnection time. Elec-Mate includes a PME assessment checklist that walks you through this requirement step by step.',
  },
  {
    question: 'What is the minimum cable size for a 32A EV charger circuit?',
    answer:
      'The minimum cable size depends on the installation method, cable type, ambient temperature, and circuit length. For a typical domestic installation using thermoplastic (PVC) twin-and-earth cable (6242Y) clipped direct in a thermally insulated wall, 6mm² is generally the minimum for a 32A circuit. However, you must always perform a voltage drop calculation to ensure the drop does not exceed the 5% limit for a final circuit (11.5V on a 230V supply). For longer cable runs, 10mm² may be required. If using SWA (steel wire armoured) cable for an external run to a garage or outbuilding, 4mm² may be sufficient depending on the installation method and derating factors. Always calculate using the specific conditions of the installation.',
  },
  {
    question: 'Do I need to notify the DNO before installing an EV charger?',
    answer:
      'Yes, in most cases. Under the Electricity Safety, Quality and Continuity Regulations (ESQCR) 2002, you must notify your Distribution Network Operator (DNO) before connecting any load that could significantly affect the supply. A 7kW single-phase EV charger draws 32A, which is a substantial addition to a domestic property. Most DNOs require notification via their online portal. Additionally, if the total maximum demand of the property (including the new EV charger) exceeds the rated capacity of the supply fuse (typically 60A or 80A for a domestic property), load management or a supply upgrade may be required. Elec-Mate includes a maximum demand calculator to help you assess this before installation.',
  },
  {
    question:
      'What type of RCD and circuit breaker is required for an EV charger?',
    answer:
      'BS 7671 Section 722 requires that the EV charging circuit be protected by a Type A RCD (or Type B if the charger manufacturer specifies it) with a rated residual operating current not exceeding 30mA. The circuit breaker should be rated at 32A for a standard 7kW domestic charger. A Type A RCBO (combined RCD and MCB in one device) is the most common and practical solution, as it provides both overcurrent and earth fault protection in a single module. Some three-phase chargers or chargers with DC charging capability may require a Type B RCD, which detects DC fault currents that a Type A cannot. Always check the charger manufacturer installation manual for specific protection requirements.',
  },
];

const howToSteps = [
  {
    name: 'Assess the supply and earthing',
    text: 'Before starting, assess the existing supply characteristics. Record the earthing arrangement (TN-C-S, TN-S, or TT), the supply fuse rating, and the current maximum demand. If the supply is PME (TN-C-S), you will need to install a separate TT earth electrode for the EV circuit as required by Regulation 722.411.4.1.',
  },
  {
    name: 'Open a new EV charger certificate',
    text: 'Launch Elec-Mate and select "New EV Charger Certificate" from the certificates section. The app creates an Electrical Installation Certificate pre-configured with the Section 722 requirements, PME assessment checklist, and load management fields already included.',
  },
  {
    name: 'Complete the PME assessment',
    text: 'Work through the PME assessment checklist in the app. This covers the earthing arrangement evaluation, earth electrode installation details (if required), protective conductor sizing, and RCD selection. The app validates your entries against the Section 722 requirements.',
  },
  {
    name: 'Enter circuit details and test results',
    text: 'Record the circuit details including cable type, size, length, and installation method. Enter all test results: continuity of protective conductors (R1+R2), insulation resistance, earth fault loop impedance (Zs), prospective fault current (PSCC), polarity, and RCD operating time. The app checks values against BS 7671 limits.',
  },
  {
    name: 'Document load management',
    text: 'If a load management device (CT clamp, dynamic load balancing) is installed, record the details in the dedicated section. Note the maximum demand assessment, any supply limitations agreed with the DNO, and the smart charging configuration. This documentation is essential for grant claims.',
  },
  {
    name: 'Sign, export, and submit',
    text: 'Capture your digital signature and the client signature on-screen. Export the completed certificate as a professional PDF. The certificate includes all Section 722 documentation, test results, and the load management assessment in one document ready for the client, scheme provider, or grant claim submission.',
  },
];

const features = [
  {
    icon: ShieldCheck,
    title: 'Section 722 Compliant',
    description:
      'Every EV charger certificate includes the full BS 7671 Section 722 checklist. PME assessment, earthing requirements, and load management documentation are built into the form structure.',
  },
  {
    icon: Activity,
    title: 'PME Assessment Built In',
    description:
      'The dedicated PME assessment section walks you through Regulation 722.411.4.1. Earth electrode requirements, protective conductor sizing, and RCD selection are all guided and validated.',
  },
  {
    icon: Gauge,
    title: 'Maximum Demand Calculator',
    description:
      'Calculate the total maximum demand including the new EV charger. The app flags when the load exceeds the supply fuse rating and prompts you to document load management measures.',
  },
  {
    icon: Smartphone,
    title: 'Complete on Your Phone',
    description:
      'Fill out the entire EV charger certificate on site using your phone or tablet. Works offline with automatic saving, so you never lose data even in a garage with no signal.',
  },
  {
    icon: PenTool,
    title: 'Digital Signatures',
    description:
      'Capture installer and client signatures directly on-screen. No printing or scanning required. The signed certificate is ready to send before you leave the property.',
  },
  {
    icon: Download,
    title: 'PDF Export for Grant Claims',
    description:
      'Export a professional PDF that meets scheme provider and grant submission requirements. All Section 722 documentation, test results, and photographs in one clean document.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate EV Charger Certificate App',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'iOS, Android, Web',
  description: PAGE_DESCRIPTION,
  url: 'https://elec-mate.com/tools/ev-charger-certificate',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
    description: '7-day free trial',
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

const howToSchema = {
  '@type': 'HowTo',
  name: 'How to Create an EV Charger Installation Certificate Using Elec-Mate',
  description:
    'A step-by-step guide to completing a BS 7671 Section 722 compliant EV charger installation certificate using the Elec-Mate app.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

export default function EVChargerCertificatePage() {
  useSEO({
    title: 'EV Charger Installation Certificate App | BS 7671 Section 722',
    description: PAGE_DESCRIPTION,
    schema: softwareAppSchema,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({
            '@context': 'https://schema.org',
            ...softwareAppSchema,
          })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...howToSchema })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <Car className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">
              BS 7671 Section 722 Compliant
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Create <span className="text-yellow-400">EV Charger Certificates</span>{' '}
            on Your Phone
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mb-8">
            The complete EV charger installation certificate app for UK
            electricians. BS 7671 Section 722 compliance, PME assessment, load
            management documentation, and digital signatures — all from your
            mobile device.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
            >
              Start 7-Day Free Trial
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl touch-manipulation transition-colors"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* What is an EV charger installation certificate */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is an EV Charger Installation Certificate?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              An EV charger installation certificate is the Electrical
              Installation Certificate (EIC) produced after installing a
              dedicated electric vehicle charging point. It certifies that the
              installation has been designed, constructed, inspected, and tested
              in accordance with BS 7671:2018 (the IET Wiring Regulations, 18th
              Edition), with particular attention to the requirements of Section
              722, which deals specifically with the supply of electric vehicles.
            </p>
            <p>
              The certificate is a legal document. It confirms to the property
              owner, the Distribution Network Operator (DNO), and any competent
              person scheme provider that the EV charging installation meets the
              required safety standards. Without a valid EIC, the installation
              cannot be signed off through a competent person scheme, and the
              property owner may not be able to claim any available government
              grants or meet their insurance obligations.
            </p>
            <p>
              Unlike a standard domestic circuit installation, an EV charger
              certificate must address several additional considerations specific
              to Section 722. These include the earthing arrangement assessment
              (particularly for PME supplies), load management provisions, the
              type of charging mode, cable sizing for continuous duty at maximum
              load, and the selection of appropriate protective devices. The
              certificate must demonstrate that all of these requirements have
              been properly assessed and met.
            </p>
            <p>
              Elec-Mate provides a purpose-built EV charger certificate form
              that includes all Section 722 requirements as structured checklist
              items. Rather than trying to remember every regulation, the app
              guides you through each requirement, validates your test results,
              and produces a professional PDF certificate ready to issue on site.
            </p>
          </div>
        </div>
      </section>

      {/* BS 7671 Section 722 Requirements */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            BS 7671 Section 722: Requirements for EV Charging Installations
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Section 722 of BS 7671:2018+A2:2022 sets out the particular
              requirements for the supply of electric vehicles. It applies to
              circuits intended to supply electric vehicles, including those for
              charging at residential properties, workplaces, and public charging
              locations. Understanding these requirements is essential for every
              electrician installing EV chargers.
            </p>
            <p>
              The section covers several critical areas. Regulation 722.411.4.1
              addresses the earthing arrangements where the supply is TN-C-S
              (PME). Because an open PEN conductor fault could place a dangerous
              potential on the vehicle chassis via the charging cable, the
              regulation requires that the EV charging circuit uses a separate TT
              earth electrode rather than the PME earth. This is one of the most
              important and most commonly misunderstood requirements in EV
              charger installation.
            </p>
            <p>
              Regulation 722.531.3.101 requires that each charging point be
              supplied by a dedicated circuit, individually protected by an
              overcurrent protective device. The circuit must be designed for
              continuous duty — that is, the cable and protective device must be
              rated for the full load current drawn continuously. For a standard
              7kW domestic charger, this means a 32A circuit with no diversity
              applied.
            </p>
            <p>
              Regulation 722.411.3.2 requires that the circuit be protected by
              an RCD with a rated residual operating current not exceeding 30mA.
              The type of RCD depends on the charger. Most domestic Mode 3
              chargers with built-in DC leakage detection require a minimum of
              Type A RCD protection. However, some chargers — particularly
              three-phase units or those without built-in DC detection — may
              require Type B RCD protection. Always check the charger
              manufacturer installation instructions.
            </p>
          </div>
        </div>
      </section>

      {/* PME Earthing and TT Requirement */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            PME Earthing and the TT Earth Electrode Requirement
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The majority of domestic properties in the UK are supplied with a
              TN-C-S (PME) earthing system. Under Regulation 722.411.4.1, when
              an EV charger is installed on a PME supply, the protective
              conductor of the EV charging circuit must not be connected to the
              PME earthing terminal. Instead, a separate earth electrode must be
              installed to provide the earth for the EV circuit, effectively
              creating a TT earthing arrangement for that circuit alone.
            </p>
            <p>
              The reason for this requirement is safety. On a PME supply, the
              neutral and earth are combined in the supply cable (the PEN
              conductor). If the PEN conductor becomes disconnected (an open PEN
              fault), the voltage on the PME earth terminal can rise to a
              dangerous level. Because an EV charging cable provides a direct
              metallic connection between the installation earth and the vehicle
              chassis, a person touching the vehicle during an open PEN fault
              could receive a lethal electric shock. By using a separate TT earth
              electrode for the EV circuit, this risk is eliminated because the
              vehicle earth is independent of the PME system.
            </p>
            <p>
              Installing the earth electrode requires driving a copper-clad
              earth rod into the ground, typically to a depth of 1.2 to 2.4
              metres. The earth electrode resistance (Ra) must be measured and
              recorded. Combined with the 30mA RCD, the product of Ra and the
              RCD operating current must not exceed 50V (i.e., Ra must be less
              than approximately 1667 ohms for a 30mA RCD, though in practice a
              much lower value is desirable for reliable operation).
            </p>
            <p>
              There are some exceptions. If the property already has a TN-S
              earthing system (where the earth is provided by the cable sheath),
              or if it has an existing TT system, the separate earth electrode
              for the EV circuit may not be required — though the 30mA RCD
              protection is still mandatory. Some newer chargers with built-in
              earth monitoring may offer alternative protective measures, but the
              installer must always follow the specific requirements in BS 7671
              and the charger manufacturer instructions.
            </p>
          </div>
          <div className="mt-6 rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white text-lg mb-2">
                  Common PME Installation Mistake
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  A frequent error is connecting the EV charging circuit earth to
                  the existing PME earth bar in the consumer unit. This defeats
                  the purpose of the TT earthing requirement. The earth electrode
                  conductor for the EV circuit must be run separately back to the
                  earth rod, and the EV circuit RCD must be positioned so that it
                  only protects the TT-earthed EV circuit, not any PME-earthed
                  circuits.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DNO Notification and Maximum Demand */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            DNO Notification and Maximum Demand
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Before installing an EV charger, the installer must consider the
              impact on the property's maximum demand and whether notification to
              the Distribution Network Operator (DNO) is required. A standard
              7kW single-phase EV charger draws 32A continuously, which is a
              significant addition to a typical domestic supply.
            </p>
            <p>
              Most domestic properties have a supply fuse rated at 60A, 80A, or
              100A. If the existing maximum demand of the property (including
              electric showers, cookers, immersion heaters, and other large
              loads) plus the 32A EV charger exceeds the supply fuse rating,
              action is needed. This might involve installing a load management
              device that limits the charger output when other loads are active,
              or it might require requesting a supply upgrade from the DNO.
            </p>
            <p>
              DNO notification is generally required when connecting a load of
              13.8kVA (approximately 60A single phase) or above, or when the
              total demand of the property will exceed the existing supply
              capacity. In practice, most DNOs ask to be notified of all EV
              charger installations through their online portals. This
              notification helps the DNO manage the local network and plan for
              the increasing demand from electric vehicles across the grid.
            </p>
            <p>
              Elec-Mate includes a maximum demand calculator within the EV
              charger certificate. You enter the existing loads on the supply,
              and the app calculates the total demand including the new charger.
              If the total exceeds the supply fuse rating, the app prompts you to
              document the load management solution and record the DNO
              notification reference number.
            </p>
          </div>
        </div>
      </section>

      {/* Load Management and Smart Charging */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Load Management and Smart Charging
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Load management is increasingly important as more EV chargers are
              installed on the UK electrical network. A CT (current transformer)
              clamp is typically installed on the supply tails to monitor the
              total current drawn by the property in real time. The charger uses
              this data to dynamically adjust its charging rate, reducing the
              output when other loads are active and increasing it when demand is
              low.
            </p>
            <p>
              This dynamic load balancing ensures the supply fuse is never
              overloaded, even when an electric shower and an EV charger are both
              running simultaneously. It eliminates the need for a supply upgrade
              in many installations and is a cost-effective solution for
              properties with limited supply capacity.
            </p>
            <p>
              Smart charging goes further than simple load management. Under the
              Electric Vehicles (Smart Charge Points) Regulations 2021, all new
              domestic and workplace EV chargers must be "smart" by default. This
              means they must be capable of being remotely controlled, must
              default to off-peak charging times, and must respond to signals
              from the electricity network to help balance supply and demand.
            </p>
            <p>
              From an installation certificate perspective, the load management
              and smart charging configuration must be documented. The
              certificate should record whether a CT clamp has been installed,
              the maximum current limit set by the load management device, and
              the smart charging settings configured during commissioning.
              Elec-Mate provides dedicated fields for all of this documentation.
            </p>
          </div>
        </div>
      </section>

      {/* Charging Modes Explained */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            EV Charging Modes Explained: Mode 1, Mode 2, and Mode 3
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-6">
            <p>
              Electric vehicle charging is categorised into four modes defined by
              BS EN 61851-1. For domestic and workplace installations in the UK,
              the three most relevant are Mode 1, Mode 2, and Mode 3.
              Understanding these modes is important for selecting the correct
              protective measures and completing the installation certificate
              accurately.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/25 flex items-center justify-center font-bold text-red-400">
                  M1
                </span>
                <h3 className="font-bold text-white text-lg">Mode 1</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Charging from a standard 13A domestic socket outlet. No
                communication between the charger and the vehicle. Limited to
                approximately 3kW. Not recommended for regular use in the UK due
                to the risk of overheating sockets under prolonged continuous
                load. BS 7671 Section 722 does not apply to Mode 1 charging.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400">
                  M2
                </span>
                <h3 className="font-bold text-white text-lg">Mode 2</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Charging using a portable cable with an in-cable control and
                protection device (IC-CPD). Typically supplied with the vehicle
                as an emergency/occasional charger. Plugs into a standard or
                industrial socket. The IC-CPD provides basic communication and
                protection. Limited to approximately 3kW from a 13A socket.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-xl bg-green-500/15 border border-green-500/25 flex items-center justify-center font-bold text-green-400">
                  M3
                </span>
                <h3 className="font-bold text-white text-lg">Mode 3</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Charging using a permanently installed dedicated charging station
                (wallbox) with a Type 1 or Type 2 connector. Full communication
                between the charger and vehicle via the control pilot signal.
                Typically 7kW single-phase (32A) or 22kW three-phase. This is
                the standard for domestic and workplace installations and is what
                Section 722 primarily addresses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Dedicated Circuit Requirements */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Dedicated Circuit Requirements: Protection and Cable Sizing
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Every Mode 3 EV charger must be supplied by its own dedicated
              circuit from the distribution board. The circuit must be designed
              for continuous duty at the full rated current of the charger. For a
              standard 7kW domestic charger, this means a 32A circuit with no
              diversity applied — the cable, protective device, and all
              connections must be rated for 32A drawn continuously for extended
              periods.
            </p>
            <p>
              The protective device should be a 32A Type A RCBO for most
              domestic installations. The Type A characteristic provides
              protection against both AC and pulsating DC fault currents, which
              is appropriate for Mode 3 chargers with built-in DC residual
              current detection. If the charger does not include DC detection, a
              Type B RCBO may be required — always check the manufacturer
              instructions.
            </p>
            <p>
              Cable sizing for a 32A continuous load requires careful
              consideration of all derating factors. The minimum cable size for a
              typical domestic installation is 6mm² twin-and-earth (for
              thermoplastic insulated cable clipped direct). However, this
              assumes favourable conditions: ambient temperature not exceeding
              30 degrees Celsius, no grouping with other cables, and a circuit
              length short enough to keep the voltage drop within the 5% limit
              (11.5V on a 230V supply).
            </p>
            <p>
              For longer cable runs — common when the charger is mounted on an
              external wall or in a detached garage — 10mm² cable may be
              required to meet the voltage drop requirement. For external
              underground runs, SWA (steel wire armoured) cable is typically used
              and must be buried at the correct depth (minimum 500mm, or as
              specified by the installation design). The SWA armour can be used
              as the circuit protective conductor (CPC) but must be properly
              terminated with gland plates and earth tags.
            </p>
          </div>
          <div className="mt-6 rounded-2xl bg-white/[0.04] border border-white/10 p-6">
            <h3 className="font-bold text-white text-lg mb-4">
              Typical 7kW EV Charger Circuit Specification
            </h3>
            <ul className="space-y-3 text-white">
              <li className="flex items-start gap-3">
                <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Protective device:</strong> 32A Type A RCBO, 30mA rated
                  residual operating current
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Cable:</strong> 6mm² minimum (PVC/PVC twin-and-earth
                  clipped direct), 10mm² for longer runs, or 4mm² SWA depending
                  on installation method and length
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Voltage drop:</strong> Must not exceed 5% (11.5V on
                  230V supply) for the complete circuit
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Earthing:</strong> Separate TT earth electrode on PME
                  supplies (Regulation 722.411.4.1)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Isolation:</strong> Local isolator adjacent to the
                  charger for maintenance and emergency disconnection
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* OZEV Grant Scheme */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Government Grant Schemes and Documentation Requirements
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The UK government has offered various grant schemes to support
              the uptake of electric vehicles, including grants towards the cost
              of installing domestic and workplace EV chargers. The Office for
              Zero Emission Vehicles (OZEV) historically administered the
              Electric Vehicle Homecharge Scheme (EVHS) and the Workplace
              Charging Scheme (WCS). While the specific schemes available may
              change over time, the documentation requirements remain broadly
              similar.
            </p>
            <p>
              To claim a grant, installers typically need to submit the completed
              Electrical Installation Certificate, photographs of the installed
              charger, evidence of the DNO notification, and confirmation that
              the installation meets all Building Regulations and BS 7671
              requirements. The certificate must demonstrate compliance with
              Section 722, including the earthing assessment and load management
              provisions. Incomplete or incorrect documentation is one of the
              most common reasons for grant claims being rejected.
            </p>
            <p>
              Elec-Mate streamlines this process by producing a certificate that
              includes all the documentation typically required for grant
              submissions. The Section 722 checklist, PME assessment, load
              management details, and test results are all structured in the
              format that scheme providers and grant bodies expect, reducing the
              risk of rejection due to missing information.
            </p>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            EV Charger Certificate Features
          </h2>
          <p className="text-white mb-8 leading-relaxed">
            Elec-Mate provides everything you need to produce professional,
            compliant EV charger installation certificates on your phone.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* How To Section */}
      <section id="how-it-works" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            How to Create an EV Charger Certificate Using Elec-Mate
          </h2>
          <p className="text-white mb-8 leading-relaxed">
            Follow these steps to complete a BS 7671 Section 722 compliant EV
            charger installation certificate using the Elec-Mate app.
          </p>
          <div className="space-y-4">
            {howToSteps.map((step, index) => (
              <div
                key={step.name}
                className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">
                    {step.name}
                  </h3>
                  <p className="text-white text-sm leading-relaxed">
                    {step.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Frequently Asked Questions About EV Charger Certificates
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group border border-white/10 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 min-h-[44px] touch-manipulation cursor-pointer text-white font-medium">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-yellow-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-white text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Stop struggling with EV charger paperwork"
        subheading="Join 430+ UK electricians creating professional Section 722 compliant certificates. 7-day free trial, cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </PublicPageLayout>
  );
}
