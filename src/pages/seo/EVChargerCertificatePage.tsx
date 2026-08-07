import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
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

const PAGE_TITLE = 'EV Charger Installation Certificate App | BS 7671 Section 722';
const PAGE_DESCRIPTION =
  'Create EV charger installation certificates on your phone. BS 7671 Section 722 compliant. PME assessment, load management, and digital signatures. Start free.';

const faqs = [
  {
    question: 'Do I need a separate certificate for every EV charger installation?',
    answer:
      'A dedicated EV charging point is a new circuit, and Regulation 644.4.201 only allows a Minor Electrical Installation Works Certificate where the work does not include the provision of a new circuit. So an Electrical Installation Certificate is required, issued to the person ordering the work under Regulation 644.1. It does not have to be a standalone document — if you are carrying out other work at the same property, the EV circuit can sit on the same EIC, provided the Section 722 requirements are specifically addressed and the circuit details and test results are recorded. Regulation 644.4.202 confirms certificates may be produced in written or electronic form, so long as their authenticity and integrity can be verified. Elec-Mate pre-populates the Section 722 checklist items so nothing is missed.',
  },
  {
    question: 'What earthing arrangement is required for an EV charger on a PME supply?',
    answer:
      'Under Regulation 722.411.4.1, a PME earthing facility shall not be used as the means of earthing for the protective conductor contact of a charging point located outdoors, or one that might reasonably be expected to be used to charge a vehicle located outdoors, unless one of methods (b) to (e) is used. Method (b) connects the installation main earthing terminal to an installation earth electrode through a protective conductor complying with Regulation 544.1.1, sized so that the voltage between the main earthing terminal and Earth cannot exceed 70V RMS during an open-circuit PEN fault. Methods (c), (d) and (e) instead use a device that disconnects the vehicle from the live conductors and from protective earth within 5 seconds — on CPC-to-Earth voltage above 70V RMS for (c), or on the line-to-neutral utilisation voltage leaving the 207V to 253V band for (d). Note 3 to the regulation warns that simply creating a TT earthing system for the charging equipment, or the whole installation, may not be an appropriate alternative because sufficient separation from buried metalwork connected to the supply PEN conductor cannot always be achieved. Elec-Mate includes a PME assessment checklist that walks you through this requirement step by step.',
  },
  {
    question: 'What is the minimum cable size for a 32A EV charger circuit?',
    answer:
      'The minimum cable size depends on the installation method, cable type, ambient temperature, grouping and circuit length. For a typical domestic installation using thermoplastic (PVC) twin-and-earth cable clipped direct, 6mm² is a common starting point for a 32A circuit — but it is a starting point, not an answer. You must select the conductor for the actual reference method and correction factors, then check voltage drop. Table 4Ab of BS 7671 sets the voltage drop between the origin of the installation and any load point at 5% for circuits other than lighting on a low voltage installation supplied directly from a public low voltage distribution system, which is 11.5V on a 230V nominal supply. For longer runs, 10mm² may be required. For an external run to a garage or outbuilding, SWA is typically used and the size again depends on installation method and derating. Always calculate using the specific conditions of the installation.',
  },
  {
    question: 'Do I need to notify the DNO before installing an EV charger?',
    answer:
      'Yes, in most cases. Under the Electricity Safety, Quality and Continuity Regulations (ESQCR) 2002, you must notify your Distribution Network Operator (DNO) before connecting any load that could significantly affect the supply. A 7kW single-phase EV charger draws 32A, which is a substantial addition to a domestic property. Most DNOs require notification via their online portal. Additionally, if the total maximum demand of the property (including the new EV charger) exceeds the rated capacity of the supply fuse (typically 60A or 80A for a domestic property), load management or a supply upgrade may be required. Elec-Mate includes a maximum demand calculator to help you assess this before installation.',
  },
  {
    question: 'What type of RCD and circuit breaker is required for an EV charger?',
    answer:
      'Additional protection is provided by an RCD with a rated residual operating current not exceeding 30mA (Regulation 415.1.1), and Regulation 722.531.3.101 governs the type of RCD and the handling of DC fault currents. Where the charging equipment does not itself provide protection against DC fault current, a Type B RCD must be used, or a Type A RCD combined with a residual direct current detecting device (RDC-DD to BS IEC 62955, defined in Part 2 as detecting and evaluating 6mA DC residual current and switching the monitored circuit). For a standard 7kW domestic charger the protective device is typically rated at 32A; a 32A Type A RCBO with an integral or upstream RDC-DD is a common solution. Always check the charger manufacturer installation manual for specific protection requirements.',
  },
  {
    question: 'Is a grant available to help with the cost of EV charger installation?',
    answer:
      "Government support for domestic and workplace charge points has run through several schemes administered by the Office for Zero Emission Vehicles (OZEV), including the Electric Vehicle Homecharge Scheme and the Workplace Charging Scheme. Eligibility, grant values and the schemes themselves change, so check the current position on GOV.UK before quoting a figure to a customer — this page deliberately does not print a grant amount that may since have moved. What does not change is the documentation: grant claims are made by an authorised installer, generally before the work, and are supported by the Electrical Installation Certificate, photographs of the installed equipment, and evidence of the DNO notification. Elec-Mate's EV charger certificate produces that documentation in one export.",
  },
];

const howToSteps = [
  {
    name: 'Assess the supply and earthing',
    text: 'Before starting, assess the existing supply characteristics. Record the earthing arrangement (TN-C-S, TN-S, or TT), the supply fuse rating, and the current maximum demand. If the supply is PME (TN-C-S) and the charging point is outdoors, or might reasonably be expected to charge a vehicle outdoors, decide which of methods (b) to (e) of Regulation 722.411.4.1 you will use and record it.',
  },
  {
    name: 'Open a new EV charger certificate',
    text: 'Launch Elec-Mate and select "New EV Charger Certificate" from the certificates section. The app creates an Electrical Installation Certificate pre-configured with the Section 722 requirements, PME assessment checklist, and load management fields already included.',
  },
  {
    name: 'Complete the PME assessment',
    text: 'Work through the PME assessment checklist in the app. This covers the earthing arrangement evaluation, the Regulation 722.411.4.1 method selected, earth electrode details and measured resistance where method (b) is used, protective conductor sizing, and RCD selection. The app validates your entries against the Section 722 requirements.',
  },
  {
    name: 'Enter circuit details and test results',
    text: 'Record the circuit details including cable type, size, length, and installation method. Enter all test results: continuity of protective conductors (R1+R2), insulation resistance, polarity, earth fault loop impedance (Zs), prospective fault current, and RCD operation. The app checks values against BS 7671 limits and prompts you for the recommended interval to the first periodic inspection, which Regulation 644.4 requires to be recorded on the certificate.',
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
      'Every EV charger certificate carries the BS 7671 Section 722 checklist: PME assessment, earthing method, RCD type and equipment standards.',
  },
  {
    icon: Activity,
    title: 'PME Assessment Built In',
    description:
      'The PME section walks you through methods (b) to (e) of Regulation 722.411.4.1, records which one you used, and captures the electrode resistance where it applies.',
  },
  {
    icon: Gauge,
    title: 'Maximum Demand Calculator',
    description:
      'Total the existing loads plus the new charge point. The app flags when demand exceeds the supply fuse rating and prompts you to record the load curtailment arrangement.',
  },
  {
    icon: Smartphone,
    title: 'Complete on Your Phone',
    description:
      'Fill out the whole certificate on site from a phone or tablet. Works offline, saves as you go, and syncs when you have signal again.',
  },
  {
    icon: PenTool,
    title: 'Digital Signatures',
    description:
      'Capture installer and client signatures directly on-screen. No printing or scanning required.',
  },
  {
    icon: Download,
    title: 'PDF Export for Grant Claims',
    description:
      'Export a professional PDF for scheme providers and grant submissions, with the Section 722 documentation, test results and signatures in one file. Regulation 644.4.202 permits certificates in electronic form.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate EV Charger Certificate App',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'iOS, Android, Web',
  description: PAGE_DESCRIPTION,
  url: 'https://www.elec-mate.com/ev-charger-certificate',
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
    title: PAGE_TITLE,
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
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] mb-6">
            <Car className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">
              BS 7671 Section 722 Compliant
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Create <span className="text-yellow-400">EV Charger Certificates</span> on Your Phone
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mb-8">
            The complete EV charger installation certificate app for UK electricians. BS 7671
            Section 722 compliance, PME assessment, load management documentation, and digital
            signatures — all from your mobile device.
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

      {/* E-E-A-T attribution */}
      <section className="py-4 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 text-sm text-white">
            <FileCheck2 className="w-4 h-4 text-yellow-400 shrink-0" />
            <span>
              Technical content reviewed by NICEIC-registered electricians. Regulations cited from
              BS&nbsp;7671:2018+A4:2026 (IET Wiring Regulations).
            </span>
          </div>
        </div>
      </section>

      {/* Answer-first summary */}
      <section className="py-10 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            The short answer: what Section 722 asks of you
          </h2>
          <p className="text-white mb-6 leading-relaxed">
            The regulation numbers you need on a domestic EV charging point, in one place.
          </p>
          <div className="-mx-5 sm:mx-0 overflow-x-auto sm:rounded-2xl sm:border sm:border-white/10 border-y border-white/10">
            <table className="w-full min-w-[34rem] text-sm text-left">
              <thead className="bg-white/[0.06] text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold">Question</th>
                  <th className="px-4 py-3 font-semibold">Answer</th>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Regulation</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-white">
                <tr>
                  <td className="px-4 py-3 align-top">Which certificate?</td>
                  <td className="px-4 py-3 align-top">
                    An Electrical Installation Certificate. A dedicated charging point is a new
                    circuit, so a Minor Works certificate is not an option.
                  </td>
                  <td className="px-4 py-3 align-top whitespace-nowrap">644.1, 644.4.201</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top">PME supply, outdoor charging point?</td>
                  <td className="px-4 py-3 align-top">
                    The PME earthing facility must not be the means of earthing for the protective
                    conductor contact unless one of methods (b) to (e) is used.
                  </td>
                  <td className="px-4 py-3 align-top whitespace-nowrap">722.411.4.1</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top">Additional protection?</td>
                  <td className="px-4 py-3 align-top">
                    RCD with a rated residual operating current not exceeding{' '}
                    <span className="font-semibold text-yellow-400">30mA</span>.
                  </td>
                  <td className="px-4 py-3 align-top whitespace-nowrap">415.1.1</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top">DC fault current?</td>
                  <td className="px-4 py-3 align-top">
                    Type B RCD, or Type A plus an RDC-DD to BS&nbsp;IEC&nbsp;62955, where the
                    equipment does not provide it itself.
                  </td>
                  <td className="px-4 py-3 align-top whitespace-nowrap">722.531.3.101</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top">PEN conductor in the circuit?</td>
                  <td className="px-4 py-3 align-top">
                    Not permitted. A circuit supplying EV charging equipment shall not include a PEN
                    conductor.
                  </td>
                  <td className="px-4 py-3 align-top whitespace-nowrap">722.312.2.1</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top">AFDD needed?</td>
                  <td className="px-4 py-3 align-top">
                    Not required for circuits supplying EV charging equipment to the BS&nbsp;EN&nbsp;61851
                    series incorporating socket-outlets or vehicle connectors to
                    BS&nbsp;EN&nbsp;IEC&nbsp;62196-2.
                  </td>
                  <td className="px-4 py-3 align-top whitespace-nowrap">722.421.1.7.201</td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top">Voltage drop limit?</td>
                  <td className="px-4 py-3 align-top">
                    <span className="font-semibold text-yellow-400">5%</span> origin to load point
                    for circuits other than lighting, on a supply taken directly from the public LV
                    network — 11.5V at 230V.
                  </td>
                  <td className="px-4 py-3 align-top whitespace-nowrap">Table 4Ab</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-white text-sm mt-4 leading-relaxed">
            Section 722 does not apply to charging points that employ inductive charging, or that
            charge mobility scooters and similar vehicles of 10A and less (Regulation 722.1).
          </p>
        </div>
      </section>

      {/* What is an EV charger installation certificate */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is an EV Charger Installation Certificate?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p className="text-lg font-medium">
              An EV charger installation certificate is the Electrical Installation Certificate
              required by BS 7671 Section 722 after every dedicated EV charging point installation.
            </p>
            <p>
              Specifically, it is the EIC produced after installing a dedicated electric vehicle
              charging point, certifying that the installation has been designed, constructed,
              inspected, and tested in accordance with BS 7671:2018+A4:2026 (the IET Wiring
              Regulations), with particular attention to the requirements of Section 722, which
              deals specifically with circuits intended to supply electric vehicles for charging
              purposes.
            </p>
            <p>
              Regulation 644.1 requires the certificate to be issued to the person ordering the work
              on completion of verification, and Regulation 644.5 requires it to be compiled and
              authenticated by a skilled person competent to verify that the requirements of BS 7671
              have been met. It confirms to the property owner, the Distribution Network Operator
              (DNO), and any competent person scheme provider that the EV charging installation
              meets the required safety standards. Without it the installation cannot be signed off
              through a competent person scheme, and the property owner may struggle to support a
              grant claim or an insurance question later.
            </p>
            <p>
              Unlike a standard domestic circuit installation, an EV charger certificate must
              address several additional considerations specific to Section 722. These include the{' '}
              <SEOInternalLink href="/earthing-arrangements">
                earthing arrangement assessment (particularly for PME supplies)
              </SEOInternalLink>
              , load management provisions, the type of charging mode, cable sizing for continuous
              duty at maximum load, and the selection of appropriate protective devices. The
              certificate must demonstrate that all of these requirements have been properly
              assessed and met. The underlying{' '}
              <SEOInternalLink href="/eic-certificate">
                Electrical Installation Certificate
              </SEOInternalLink>{' '}
              form is the basis for EV charger certification.
            </p>
            <p>
              Elec-Mate provides a purpose-built EV charger certificate form that includes all
              Section 722 requirements as structured checklist items. Rather than trying to remember
              every regulation, the app guides you through each requirement, validates your test
              results, and produces a professional PDF certificate ready to issue on site.
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
              Section 722 of BS 7671:2018+A4:2026 sets out the particular requirements for circuits
              intended to supply electric vehicles for charging purposes — residential, workplace
              and public. Regulation 722.1 excludes only two things: charging points that employ
              inductive charging, and those that charge mobility scooters and similar vehicles of
              10A and less.
            </p>

            <h3 className="text-lg font-bold text-white pt-2">What changed at A4:2026</h3>
            <p>
              The A4 amendment makes significant changes to Regulation 722.411.4.1 concerning the
              use of a PME supply, and the published change note is blunt about the most important
              one: <strong>the exception concerning reasonably practicable has been deleted</strong>
              . The old escape route of arguing that an alternative method was not reasonably
              practicable is gone. Changes were also made to the requirements for external
              influences, RCDs, socket-outlets and connectors. Separately, Regulation 722.311.201
              permits load curtailment to be taken into account when determining maximum demand.
            </p>

            <h3 className="text-lg font-bold text-white pt-2">Earthing on a PME supply</h3>
            <p>
              Regulation 722.411.4.1 addresses the earthing arrangement where the supply is TN-C-S
              (PME). Because an open PEN conductor fault could place a dangerous potential on the
              vehicle body via the charging cable, a PME earthing facility shall not be used as the
              means of earthing for the protective conductor contact of a charging point located
              outdoors, or one that might reasonably be expected to be used to charge a vehicle
              located outdoors, unless one of methods (b) to (e) is used. This is the most commonly
              misunderstood requirement in EV charger installation, and it is set out in full in the
              next section.
            </p>

            <h3 className="text-lg font-bold text-white pt-2">Protective measures not permitted</h3>
            <p>
              Two groups of protective measures are ruled out. Regulation 722.410.3.5 prohibits
              obstacles and placing out of reach (Section 417). Regulation 722.410.3.6 prohibits
              non-conducting location (Regulation 418.1) and earth-free local equipotential bonding
              (Regulation 418.2). Where electrical separation is used instead, Regulation 722.413.1.2
              limits it to the supply of one electric vehicle from one unearthed source, through a
              fixed isolating transformer complying with BS EN 61558-2-4.
            </p>

            <h3 className="text-lg font-bold text-white pt-2">Circuit design and RCD selection</h3>
            <p>
              The circuit must be designed for continuous duty — the cable and protective device
              must be rated for the full load current drawn continuously. For a standard 7kW
              domestic charger, this means a 32A circuit with no diversity applied. Under Regulation
              722.312.2.1, a circuit supplying charging equipment for electric vehicles shall not
              include a PEN conductor. Additional protection is provided by an RCD with a rated
              residual operating current not exceeding 30mA (Regulation 415.1.1), and Regulation
              722.531.3.101 governs the selection of the RCD and the detection of DC fault current.
              Where the charging equipment does not itself provide protection against DC fault
              current, that means a Type B RCD, or a Type A RCD combined with a residual direct
              current detecting device (RDC-DD to BS IEC 62955 — defined in Part 2 as detecting and
              evaluating 6mA DC residual current and switching the monitored circuit). Always check
              the charger manufacturer installation instructions.
            </p>

            <h3 className="text-lg font-bold text-white pt-2">Equipment standards and AFDDs</h3>
            <p>
              Regulation 722.511.101 requires EV charging equipment to comply with the appropriate
              parts of the BS EN 61851 series. AFDDs are not required for circuits supplying EV
              charging equipment conforming to the BS EN 61851 series that incorporate
              socket-outlets or vehicle connectors conforming to BS EN IEC 62196-2 (Regulation
              722.421.1.7.201).
            </p>
          </div>
        </div>
      </section>

      {/* PME earthing — Regulation 722.411.4.1 */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            PME Supplies: The Four Permitted Methods Under Regulation 722.411.4.1
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Most domestic properties in the UK are supplied with a TN-C-S (PME) earthing system.
              Regulation 722.411.4.1 states that a PME earthing facility shall not be used as the
              means of earthing for the protective conductor contact of a charging point located
              outdoors, or that might reasonably be expected to be used to charge a vehicle located
              outdoors, unless one of the listed methods is used. Indent (a) was deleted by
              BS 7671:2018+A2:2022, leaving four: (b), (c), (d) and (e).
            </p>
            <p>
              The reason is an open PEN fault. On a PME supply the neutral and earth are combined in
              the supply cable, and if that PEN conductor is lost the voltage on the installation
              earth terminal can rise dangerously. The charging cable puts a metallic connection
              between the installation earth and the vehicle body, so a person touching the vehicle
              is exposed to that rise. Every one of the four methods is a way of making sure the
              voltage a person can touch is limited, or removed quickly.
            </p>
          </div>

          <div className="mt-6 -mx-5 sm:mx-0 overflow-x-auto sm:rounded-2xl sm:border sm:border-white/10 border-y border-white/10">
            <table className="w-full min-w-[36rem] text-sm text-left">
              <thead className="bg-white/[0.06] text-white">
                <tr>
                  <th className="px-4 py-3 font-semibold whitespace-nowrap">Method</th>
                  <th className="px-4 py-3 font-semibold">What it requires</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/10 text-white">
                <tr>
                  <td className="px-4 py-3 align-top font-semibold text-yellow-400">(a)</td>
                  <td className="px-4 py-3 align-top">
                    Deleted by BS 7671:2018+A2:2022.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top font-semibold text-yellow-400">(b)</td>
                  <td className="px-4 py-3 align-top">
                    The main earthing terminal of the installation is connected to an installation
                    earth electrode by a protective conductor complying with Regulation 544.1.1. The
                    electrode resistance to Earth must be such that the voltage between the main
                    earthing terminal and Earth cannot exceed{' '}
                    <span className="font-semibold">70V RMS</span> in the event of an open-circuit
                    PEN fault on the low voltage network.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top font-semibold text-yellow-400">(c)</td>
                  <td className="px-4 py-3 align-top">
                    A device that disconnects the vehicle from the live conductors and from
                    protective earth, in accordance with Regulation 543.3.3.101(b), within 5s where
                    the voltage between the circuit protective conductor and Earth exceeds 70V RMS
                    due to an open-circuit PEN fault. It need not operate if the voltage exceeds 70V
                    RMS for less than 4s. It must provide isolation, be selected in accordance with
                    Table 537.4, and be resettable only when the voltage is back below 70V RMS.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top font-semibold text-yellow-400">(d)</td>
                  <td className="px-4 py-3 align-top">
                    The same 5s disconnection, triggered instead by the utilisation voltage at the
                    charging point between line and neutral going above{' '}
                    <span className="font-semibold">253V RMS</span> or below{' '}
                    <span className="font-semibold">207V RMS</span>. It must provide isolation, be
                    selected in accordance with Table 537.4, and be resettable only within the 207V
                    to 253V band.
                  </td>
                </tr>
                <tr>
                  <td className="px-4 py-3 align-top font-semibold text-yellow-400">(e)</td>
                  <td className="px-4 py-3 align-top">
                    An alternative device to (c) or (d) that does not result in a lesser degree of
                    safety, operating by the same disconnection from live conductors and protective
                    earth, providing isolation and selected in accordance with Table 537.4.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-white text-sm mt-4 leading-relaxed">
            Equivalent means of functionality for (c), (d) and (e) may be built into the charging
            equipment itself, which is how most modern open-PEN-protected wallboxes satisfy the
            regulation.
          </p>

          <h3 className="text-xl font-bold text-white mt-10 mb-4">
            Sizing the electrode for method (b)
          </h3>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Method (b) is <strong>not</strong> a TT conversion. The installation stays on the PME
              earthing facility; the electrode is added to hold the main earthing terminal below 70V
              RMS relative to Earth during an open PEN event. The electrode resistance must be
              measured and recorded.
            </p>
            <p>
              Annex A722, Item A722.3 gives the formula for the maximum permitted resistance — the
              sum of the earth electrode resistance and the protective conductor connecting it to
              the main earthing terminal — and gives separate single-phase and three-phase
              expressions. Its Note 1 warns that earth electrodes with a resistance above 200Ω may
              be unstable, and caps the design value at 200Ω where the three-phase formula would
              give more. Where the protective conductor to the electrode is buried in the ground,
              its cross-sectional area must be not less than that stated in Table 54.1.
            </p>
            <p>
              Where a device to method (c), (d) or (e) is used, protective conductors and
              exposed-conductive-parts downstream of that device must have no connection to the
              protective conductors or exposed-conductive-parts of any circuit not protected by the
              same device, and no connection to any extraneous-conductive-part.
            </p>
          </div>

          <div className="mt-8 rounded-2xl bg-orange-500/10 border border-orange-500/20 p-5">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-bold text-white text-lg mb-2">
                  &ldquo;Just rod it and call it TT&rdquo; is not the compliant answer
                </h3>
                <p className="text-white text-sm leading-relaxed">
                  Note 3 to Regulation 722.411.4.1 says it plainly: creating a TT earthing system
                  for the charging equipment, or for the whole installation, as an alternative to
                  using the PME earthing facility with one of methods (b) to (e) may not be an
                  appropriate solution, because of the inability to provide sufficient separation
                  from buried metalwork connected to the supply PEN conductor. Pick one of the four
                  methods and record which one you used on the certificate.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-2">Gone at A4:2026</h3>
            <p className="text-white text-sm leading-relaxed">
              The A4:2026 change note for Section 722 records that the exception concerning
              reasonably practicable has been deleted from Regulation 722.411.4.1. If your habit was
              to justify leaving a PME earth in place because an alternative was not reasonably
              practicable, that justification no longer exists in the regulation.
            </p>
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
              Before installing an EV charger, the installer must consider the impact on the
              property's maximum demand and whether notification to the Distribution Network
              Operator (DNO) is required. A standard 7kW single-phase EV charger draws 32A
              continuously, which is a significant addition to a typical domestic supply.
            </p>
            <p>
              Most domestic properties have a supply fuse rated at 60A, 80A, or 100A. If the
              existing maximum demand of the property (including electric showers, cookers,
              immersion heaters, and other large loads) plus the 32A EV charger exceeds the supply
              fuse rating, action is needed. This might involve installing a load management device
              that limits the charger output when other loads are active, or it might require
              requesting a supply upgrade from the DNO.
            </p>
            <p>
              The threshold commonly quoted for prior approval rather than notification is a load of
              13.8kVA (about 60A single phase) or above, or where the total demand will exceed the
              existing supply capacity — but thresholds and process vary by DNO, so check the
              relevant operator's own guidance rather than relying on a rule of thumb. In practice
              most DNOs ask to be notified of every EV charge point installation through their online
              portal, which helps them plan for rising demand across the local network.
            </p>
            <p>
              Elec-Mate includes a maximum demand calculator within the EV charger certificate. You
              enter the existing loads on the supply, and the app calculates the total demand
              including the new charger. If the total exceeds the supply fuse rating, the app
              prompts you to document the load management solution and record the DNO notification
              reference number.
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
              Regulation 722.311.201 states that load curtailment, including load reduction or
              disconnection, either automatically or manually, may be taken into account when
              determining the maximum demand of the installation or part thereof. That single
              sentence is what makes documented load management a design solution rather than a
              workaround: a properly recorded system can legitimately reduce the assessed maximum
              demand, which is often what avoids a supply upgrade.
            </p>
            <p>
              In practice, a CT (current transformer) clamp is installed on the supply tails to
              monitor the total current drawn by the property in real time. The charge point uses
              that data to adjust its charging rate dynamically, backing off when other loads are
              active and increasing again when demand falls, so the supply fuse is not asked to
              carry more than it is rated for when a shower and a charge point run together.
            </p>
            <p>
              Smart charging goes further than simple load management. Under the Electric Vehicles
              (Smart Charge Points) Regulations 2021, new domestic and workplace charge points sold
              in Great Britain must have smart functionality: the ability to be remotely controlled,
              default off-peak charging times, and a response to signals from the electricity
              network to help balance supply and demand.
            </p>
            <p>
              From a certification point of view, all of this needs to be recorded. The certificate
              should state whether a CT clamp has been installed, the maximum current limit set by
              the load management device, and the smart charging settings configured during
              commissioning. Elec-Mate provides dedicated fields for all of it.
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
              Electric vehicle charging is categorised into modes defined by the BS EN 61851 series,
              which Regulation 722.511.101 requires EV charging equipment to comply with. For
              domestic and workplace installations in the UK, the three most relevant are Mode 1,
              Mode 2, and Mode 3. Section 722 applies to circuits intended to supply electric
              vehicles for charging purposes regardless of mode — it is not mode-specific, and the
              only exclusions in Regulation 722.1 are inductive charging and mobility scooters and
              similar vehicles of 10A and less.
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
                Charging from a standard 13A domestic socket-outlet. No communication between the
                charger and the vehicle, and no in-cable protection. Limited to roughly 3kW. Not
                recommended for regular use in the UK because of the risk of overheating a general
                purpose socket-outlet under a prolonged continuous load.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-10 h-10 rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] flex items-center justify-center font-bold text-yellow-400">
                  M2
                </span>
                <h3 className="font-bold text-white text-lg">Mode 2</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Charging using a portable cable with an in-cable control and protection device
                (IC-CPD). Typically supplied with the vehicle as an emergency/occasional charger.
                Plugs into a standard or industrial socket. The IC-CPD provides basic communication
                and protection. Limited to approximately 3kW from a 13A socket.
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
                Charging using a permanently installed dedicated charging station (wallbox) with a
                Type 1 or Type 2 connector. Full communication between the charger and vehicle via
                the control pilot signal. Typically 7kW single-phase (32A) or 22kW three-phase. This
                is the standard for domestic and workplace installations and is what Section 722
                primarily addresses.
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
              Every Mode 3 EV charger must be supplied by its own dedicated circuit from the
              distribution board. The circuit must be designed for continuous duty at the full rated
              current of the charger. For a standard 7kW domestic charger, this means a 32A circuit
              with no diversity applied — the cable, protective device, and all connections must be
              rated for 32A drawn continuously for extended periods.
            </p>
            <p>
              The protective device should be a 32A Type A RCBO for most domestic installations. The
              Type A characteristic provides protection against both AC and pulsating DC fault
              currents, which is appropriate for Mode 3 chargers with built-in DC residual current
              detection. If the charger does not include DC detection, a Type B RCBO may be required
              — always check the manufacturer instructions.
            </p>
            <p>
              Cable sizing for a 32A continuous load requires careful consideration of all
              correction factors. A common starting point for a typical domestic installation is
              6mm² thermoplastic twin-and-earth clipped direct. That is a starting point only: it
              assumes favourable conditions — an ambient temperature no higher than the 30°C the
              tabulated ratings are based on, no grouping with other cables, no thermal insulation,
              and a length short enough to stay inside the voltage drop limit. Select from the
              tabulated rating for the actual reference method and apply the Appendix 4 correction
              factors; never apply an installation-method multiplier on top of a rating that already
              accounts for the method.
            </p>
            <p>
              For longer cable runs — common when the charger is mounted on an external wall or in a
              detached garage — a larger conductor may be required to meet the voltage drop
              requirement. For external underground runs, SWA (steel wire armoured) cable is
              typically used and must be buried at the correct depth as specified by the installation
              design. The SWA armour can be used as the circuit protective conductor (CPC) but must
              be properly terminated with gland plates and earth tags. The table below gives
              indicative starting points; always calculate each circuit for its actual conditions.
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
                  <strong>Protective device:</strong> 32A Type A RCBO, 30mA rated residual operating
                  current
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Cable:</strong> 6mm² minimum (PVC/PVC twin-and-earth clipped direct),
                  10mm² for longer runs, or 4mm² SWA depending on installation method and length
                </span>
              </li>
              <li className="flex items-start gap-3">
                <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Voltage drop:</strong> 5% from the origin of the installation to the
                  charging point &mdash; 11.5V on a 230V nominal supply (Table 4Ab)
                </span>
              </li>
              <li className="flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Earthing on PME:</strong> one of methods (b) to (e) of Regulation
                  722.411.4.1, recorded on the certificate
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                <span>
                  <strong>Conductor arrangement:</strong> no PEN conductor in the circuit supplying
                  the charging equipment (Regulation 722.312.2.1)
                </span>
              </li>
            </ul>
          </div>

          {/* RCD type selection table */}
          <div className="mt-6">
            <h3 className="font-bold text-white text-lg mb-4">
              Choosing the RCD: DC Fault Current Protection (Regulation 722.531.3.101)
            </h3>
            <div className="-mx-5 sm:mx-0 overflow-x-auto sm:rounded-2xl sm:border sm:border-white/10 border-y border-white/10">
              <table className="w-full min-w-[32rem] text-sm text-left">
                <thead className="bg-white/[0.06] text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Scenario</th>
                    <th className="px-4 py-3 font-semibold">Acceptable protection</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white">
                  <tr>
                    <td className="px-4 py-3 align-top">
                      Charger does <strong>not</strong> provide its own DC fault current protection
                    </td>
                    <td className="px-4 py-3 align-top">
                      Type B RCD, <em>or</em> Type A RCD plus a residual direct current detecting
                      device (RDC-DD to BS IEC 62955) that disconnects at 6mA DC and above
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">
                      Charger has built-in RDC-DD (6mA DC detection)
                    </td>
                    <td className="px-4 py-3 align-top">
                      Type A RCD upstream, with the charger's integral RDC-DD handling smooth DC
                      residual current
                    </td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">
                      Additional protection (all scenarios)
                    </td>
                    <td className="px-4 py-3 align-top">
                      RCD with a rated residual operating current not exceeding 30mA (Regulation
                      415.1.1)
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-white text-sm mt-3 leading-relaxed">
              A plain Type AC RCD is not suitable for an EV charging circuit, and BS 7671 notes that
              a Type AC RCD should not be fitted upstream of a Type A, Type F or Type B device.
              Always confirm the protection arrangement against the charger manufacturer's
              installation instructions and BS 7671 Section 722.
            </p>
          </div>

          {/* Cable sizing guidance table */}
          <div className="mt-6">
            <h3 className="font-bold text-white text-lg mb-2">
              Cable Sizing Guidance for a 32A (7kW) Charging Circuit
            </h3>
            <p className="text-white text-sm mb-4 leading-relaxed">
              Indicative starting points only — the conductor must always be sized for the actual
              reference method, ambient temperature, grouping and run length, then verified against
              the voltage-drop limit. Calculate every circuit individually.
            </p>
            <div className="-mx-5 sm:mx-0 overflow-x-auto sm:rounded-2xl sm:border sm:border-white/10 border-y border-white/10">
              <table className="w-full min-w-[36rem] text-sm text-left">
                <thead className="bg-white/[0.06] text-white">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Scenario</th>
                    <th className="px-4 py-3 font-semibold">Typical cable</th>
                    <th className="px-4 py-3 font-semibold">Note</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-white">
                  <tr>
                    <td className="px-4 py-3 align-top">Short run, clipped direct (PVC twin &amp; earth)</td>
                    <td className="px-4 py-3 align-top font-medium text-yellow-400">6mm&sup2;</td>
                    <td className="px-4 py-3 align-top">Assumes favourable conditions and a short length</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">Longer run or warmer/grouped conditions</td>
                    <td className="px-4 py-3 align-top font-medium text-yellow-400">10mm&sup2;</td>
                    <td className="px-4 py-3 align-top">Often needed to stay within the voltage-drop limit</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-3 align-top">External / underground run to garage or outbuilding</td>
                    <td className="px-4 py-3 align-top font-medium text-yellow-400">SWA (e.g. 4&ndash;10mm&sup2;)</td>
                    <td className="px-4 py-3 align-top">Buried at correct depth; armour may serve as the CPC if correctly terminated</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <p className="text-xs uppercase tracking-wide text-white mb-1">Design current</p>
                <p className="text-white text-sm">
                  32A drawn continuously &mdash; <strong>no diversity</strong> applied to a single
                  dedicated EV charging circuit.
                </p>
              </div>
              <div className="rounded-xl bg-white/[0.04] border border-white/10 p-4">
                <p className="text-xs uppercase tracking-wide text-white mb-1">Voltage drop</p>
                <p className="text-white text-sm">
                  <strong>5%</strong> between the origin of the installation and any load point, for
                  circuits other than lighting on a low voltage installation supplied directly from
                  a public LV distribution system &mdash; <strong>11.5V</strong> at 230V nominal
                  (Appendix 4, Table 4Ab).
                </p>
              </div>
            </div>
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
              The UK government has offered various grant schemes to support the uptake of electric
              vehicles, including grants towards the cost of installing domestic and workplace EV
              charge points. The Office for Zero Emission Vehicles (OZEV) has administered these,
              including the Electric Vehicle Homecharge Scheme and the Workplace Charging Scheme.
              Scheme names, values and eligibility change, so confirm the current position on
              GOV.UK before you quote — but the documentation requirements have stayed broadly the
              same.
            </p>
            <p>
              To claim a grant, installers typically need to submit the completed Electrical
              Installation Certificate, photographs of the installed charger, evidence of the DNO
              notification, and confirmation that the installation meets all Building Regulations
              and BS 7671 requirements. The certificate must demonstrate compliance with Section
              722, including the earthing assessment and load management provisions. Incomplete or
              incorrect documentation is one of the most common reasons for grant claims being
              rejected.
            </p>
            <p>
              Elec-Mate streamlines this process by producing a certificate that includes all the
              documentation typically required for grant submissions. The Section 722 checklist, PME
              assessment, load management details, and test results are all structured in the format
              that scheme providers and grant bodies expect, reducing the risk of rejection due to
              missing information.
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
            Elec-Mate provides everything you need to produce professional, compliant EV charger
            installation certificates on your phone.
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
            Follow these steps to complete a BS 7671 Section 722 compliant EV charger installation
            certificate using the Elec-Mate app.
          </p>
          <div className="space-y-4">
            {howToSteps.map((step, index) => (
              <div
                key={step.name}
                className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-b from-white/[0.08] to-white/[0.04] border border-white/[0.14] flex items-center justify-center font-bold text-yellow-400 shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{step.name}</h3>
                  <p className="text-white text-sm leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Bridge */}
      <section className="py-8 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <SEOAppBridge
            title="Create EV Charger Certificates on Your Phone"
            description="BS 7671 Section 722 compliant EV charger installation certificates, with the PME assessment, load management record and test results in one export."
            ctaText="Start 7-day free trial"
            ctaHref="/auth/signup"
          />
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
                <div className="px-4 pb-4 text-white text-sm leading-relaxed">{faq.answer}</div>
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
            {[
              ['/guides/ev-charger-certificate-requirements', 'EV Charger Certificate Requirements UK'],
              ['/tools/eicr-certificate', 'EICR Certificate Guide 2026'],
              ['/ev-charger-grants', 'EV Charger Grants UK 2026'],
              ['/guides/ev-charger-installation', 'EV Charger Installation UK 2026'],
              ['/guides/napit-certificate-guide', 'NAPIT Certificate Guide'],
              ['/ev-charger-brand-comparison', 'Best EV Charger UK'],
              ['/guides/ev-charger-error-codes', 'EV Charger Error Codes'],
              ['/guides/ev-charger-installation-birmingham', 'EV Charger Installation Birmingham 2026'],
            ].map(([href, label]) => (
              <div
                key={href}
                className="flex min-h-[44px] items-center rounded-xl border border-white/10 bg-white/[0.04] px-4 py-2 touch-manipulation"
              >
                <SEOInternalLink href={href}>{label}</SEOInternalLink>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SEOCTASection
        heading="Stop struggling with EV charger paperwork"
        subheading="Join 1,000+ UK electricians creating professional Section 722 compliant certificates. 7-day free trial, cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </PublicPageLayout>
  );
}
