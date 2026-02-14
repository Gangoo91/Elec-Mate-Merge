import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Sun,
  Smartphone,
  PenTool,
  ShieldCheck,
  Clock,
  Download,
  AlertTriangle,
  CheckCircle2,
  ListChecks,
  BookOpen,
  Zap,
  Users,
  CalendarCheck,
  Cable,
  Gauge,
  BatteryCharging,
} from 'lucide-react';

const PAGE_TITLE = 'Solar PV Installation Certificate App | G98/G99 Compliant | Elec-Mate';
const PAGE_DESCRIPTION =
  'Create solar PV installation certificates on your phone. DC and AC side testing, G98/G99 grid connection documentation, MCS compliance, DNO notification records, and BS 7671 Section 712 compliance. Start free.';

const faqs = [
  {
    question: 'What certificates are needed for a solar PV installation?',
    answer:
      'A solar PV installation requires several documents. An Electrical Installation Certificate (EIC) to BS 7671 is required for the AC wiring from the consumer unit to the inverter. A separate EIC or specific PV commissioning certificate covers the DC side (panels to inverter). A G98 or G99 notification/application to the DNO is required for grid connection — G98 for systems up to 16A per phase (approximately 3.68 kW single phase), G99 for larger systems. If the installer is MCS-certified, an MCS certificate and performance estimate are also required. Additionally, the building regulations notification (either through a Competent Person Scheme or via Building Control) must be completed. Elec-Mate handles the electrical certificates and helps you document the information needed for DNO and MCS submissions.',
  },
  {
    question: 'What is the difference between G98 and G99 for solar PV?',
    answer:
      'G98 (formerly G83) and G99 (formerly G59) are the engineering recommendations published by the Energy Networks Association that govern the connection of generation equipment to the distribution network. G98 applies to smaller installations — those with a rated output up to 16 A per phase (approximately 3.68 kW on a single-phase supply or 11.04 kW on a three-phase supply). G98 uses a simple notification process: you notify the DNO within 28 days of commissioning and connection is automatic provided the installation meets the technical requirements. G99 applies to larger installations and requires a formal application to the DNO before work begins. The DNO assesses the impact on the local network and may impose conditions or require network reinforcement. G99 installations also require more extensive commissioning tests and protection settings verification.',
  },
  {
    question: 'What tests are required for the DC side of a solar PV system?',
    answer:
      'The DC side of a solar PV system requires specific tests that are different from standard AC installation testing. These include: open-circuit voltage (Voc) measurement for each string to verify it matches the expected value based on the number of panels and their rated Voc; short-circuit current (Isc) measurement for each string; insulation resistance testing between positive and earth, negative and earth, and positive and negative (with the inverter disconnected); continuity testing of the protective earth conductor; polarity verification of each string; and an I-V curve trace if specified. The irradiance level should be recorded at the time of testing as it affects the measured values. All results must be compared to the expected values calculated from the panel datasheets and the string configuration.',
  },
  {
    question: 'What does BS 7671 Section 712 cover for solar PV installations?',
    answer:
      'Section 712 of BS 7671:2018+A3:2024 covers the particular requirements for solar photovoltaic (PV) power supply systems. It addresses the specific hazards associated with PV installations — principally the fact that PV arrays generate DC voltage whenever exposed to light and cannot be simply switched off. Key requirements include: protection against electric shock on both the DC and AC sides; overcurrent protection for PV string and array cables; requirements for PV DC isolators and their location; earthing arrangements for the PV array frame; cable selection and installation methods for DC cables exposed to sunlight (UV-resistant); labelling requirements to warn that the PV array remains live even when the inverter is disconnected; and requirements for the PV installation to be designed so that maintenance can be carried out safely.',
  },
  {
    question: 'Can I complete solar PV certificates on a mobile device?',
    answer:
      'Yes. Elec-Mate is designed for electricians and solar PV installers to complete installation certificates on site using a phone or tablet. The app provides certificate structures covering both DC and AC side documentation, including string configurations, inverter specifications, test results for Voc, Isc, insulation resistance, earth continuity, and Zs/RCD tests on the AC side. You can record panel make and model, inverter details, generation meter readings, and G98/G99 notification details. Digital signatures are captured on screen, and the completed certificate exports as a professional PDF ready to send to the client or upload to your MCS account.',
  },
  {
    question: 'Do I need to be MCS-certified to install solar PV?',
    answer:
      'You do not legally need MCS certification to install solar PV in the UK, but in practice it is strongly recommended and often required. MCS (Microgeneration Certification Scheme) certification is mandatory if the customer wants to receive payments under the Smart Export Guarantee (SEG) — the scheme that pays homeowners for electricity exported to the grid. Without MCS certification, the installation cannot be registered and the customer loses access to SEG income. MCS certification also provides consumer protection through the MCS Consumer Code and is increasingly required by mortgage lenders and insurers. To become MCS-certified, you must demonstrate competence in PV installation, typically by holding a relevant qualification (such as the C&G 2399 or equivalent), being registered with a Competent Person Scheme for Part P notification, and meeting the MCS quality management requirements.',
  },
];

const howToSteps = [
  {
    name: 'Create a new solar PV certificate',
    text: 'Open Elec-Mate and tap "New Certificate" then select "Solar PV" from the certificate types. Enter the site details including the property address, customer name, DNO region, supply details (single or three phase, Ze, PSCC), and the existing consumer unit information.',
  },
  {
    name: 'Enter the PV system specification',
    text: 'Record the panel details (make, model, rated power, Voc, Isc, number of panels), string configuration (number of strings, panels per string), inverter details (make, model, rated AC output, MPPT inputs), and generation meter details. The app calculates expected string Voc and Isc from the panel data.',
  },
  {
    name: 'Record DC side test results',
    text: 'Enter the DC side test results: open-circuit voltage (Voc) for each string, short-circuit current (Isc) for each string, insulation resistance between positive-earth, negative-earth, and positive-negative, earth continuity of the array frame, and polarity verification. The app compares measured values to the calculated expected values.',
  },
  {
    name: 'Record AC side test results',
    text: 'Enter the AC side test results: earth fault loop impedance (Zs), prospective fault current (PSCC), RCD operating times, insulation resistance, and continuity of protective conductors for the AC circuit from the consumer unit to the inverter. These follow the standard BS 7671 test procedures.',
  },
  {
    name: 'Complete G98/G99 notification details',
    text: 'Record the grid connection details: whether G98 or G99 applies, the DNO notification or application reference, the rated export capacity, and the protection settings. The app helps you document the information needed for the DNO submission.',
  },
  {
    name: 'Capture signatures and export',
    text: 'Add your digital signature as the installing electrician and the client signature. Export the completed certificate as a professional PDF. The document includes the full system specification, all test results, and the grid connection details — ready to send to the client, upload to MCS, or submit to the DNO.',
  },
];

const features = [
  {
    icon: Smartphone,
    title: 'Complete On Site, On Your Phone',
    description:
      'Record system specs and test results directly on your phone as you commission the system. No paper forms, no office re-keying.',
  },
  {
    icon: Sun,
    title: 'DC & AC Side Testing',
    description:
      'Separate sections for DC side tests (Voc, Isc, insulation resistance) and AC side tests (Zs, PSCC, RCD). All in one certificate.',
  },
  {
    icon: Cable,
    title: 'String Configuration',
    description:
      'Record string layouts, panel counts, and expected values. The app calculates expected Voc and Isc from panel specifications.',
  },
  {
    icon: Gauge,
    title: 'Inverter Specifications',
    description:
      'Document inverter make, model, rated output, MPPT inputs, firmware version, and protection settings all in structured fields.',
  },
  {
    icon: ShieldCheck,
    title: 'BS 7671 Section 712 Compliant',
    description:
      'Certificate structure follows BS 7671:2018+A3:2024 Section 712 requirements for PV installations, covering both DC and AC side documentation.',
  },
  {
    icon: Zap,
    title: 'G98/G99 Documentation',
    description:
      'Record DNO notification details, export capacity, protection settings, and grid connection information alongside the electrical certificate.',
  },
  {
    icon: Download,
    title: 'Professional PDF Export',
    description:
      'Generate a branded certificate PDF with full system spec, test results, and grid connection details. Email it from site or upload to MCS.',
  },
  {
    icon: PenTool,
    title: 'Digital Signatures',
    description:
      'Capture installer and client signatures on screen. The signed certificate is ready to file without printing or scanning.',
  },
  {
    icon: Clock,
    title: 'Auto-Save Protection',
    description:
      'Your work saves locally every 10 seconds and syncs to the cloud every 30 seconds. Never lose a certificate mid-commissioning.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Solar PV Installation Certificate App',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'iOS, Android, Web',
  description: PAGE_DESCRIPTION,
  url: 'https://elec-mate.com/tools/solar-pv-certificate',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
    description: '7-day free trial',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '127',
    bestRating: '5',
    worstRating: '1',
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
  name: 'How to Create a Solar PV Installation Certificate Using Elec-Mate',
  description:
    'A step-by-step guide to completing a solar PV installation certificate using the Elec-Mate app on your phone or tablet, covering DC and AC side testing and G98/G99 documentation.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

export default function SolarPVCertificatePage() {
  useSEO({
    title: 'Solar PV Installation Certificate App | G98/G99 Compliant',
    description: PAGE_DESCRIPTION,
    schema: softwareAppSchema,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...softwareAppSchema })}
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
            <Sun className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">
              BS 7671 Section 712 + G98/G99 Compliant
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            Digital <span className="text-yellow-400">Solar PV Certificates</span> on Your Phone
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mb-8">
            The complete solar PV certification app for UK electricians and MCS installers. DC and
            AC side testing, inverter specs, string configurations, G98/G99 documentation, and
            professional PDF certificates.
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

      {/* What is a Solar PV Installation Certificate */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is a Solar PV Installation Certificate?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              A solar PV installation certificate is the formal documentation produced when a
              photovoltaic system is installed and commissioned. It records the system
              specification, the test results obtained during commissioning, and provides evidence
              that the installation complies with BS 7671 (the IET Wiring Regulations), the relevant
              grid connection engineering recommendation (G98 or G99), and where applicable, MCS
              requirements.
            </p>
            <p>
              Solar PV installations are unique in electrical work because they involve both DC and
              AC circuits, each with different hazards and testing requirements. The DC side — from
              the PV panels through to the inverter input — operates at voltages that can exceed 600
              V DC in domestic systems and cannot be switched off during daylight hours. The AC side
              — from the inverter output through to the connection point in the consumer unit or
              distribution board — follows standard AC installation practices but with additional
              considerations for the generation source.
            </p>
            <p>
              The certificate must therefore document both sides of the installation
              comprehensively. On the DC side, this means recording string configurations, measured
              open-circuit voltages, short-circuit currents, insulation resistance values, and earth
              continuity. On the AC side, standard electrical installation tests apply — earth fault
              loop impedance, prospective fault current, RCD operation, insulation resistance, and
              polarity.
            </p>
            <p>
              Beyond the electrical testing, the certificate also records the system specification:
              panel type and quantity, inverter make and model, string configurations, rated system
              capacity, generation meter details, and the grid connection arrangements. This
              information is needed for the DNO notification, MCS registration, and building
              regulations compliance.
            </p>
          </div>
        </div>
      </section>

      {/* DC Side Testing */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            DC Side Testing for Solar PV Systems
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-6">
            <p>
              The DC side of a PV installation presents unique testing challenges. Unlike
              conventional electrical circuits, PV arrays generate voltage whenever they are exposed
              to light — they cannot be de-energised by switching off a supply. This means all DC
              testing must be carried out with careful attention to safe working practices and
              awareness of the voltages present.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 my-6">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <h3 className="font-bold text-white text-lg mb-3">Open-Circuit Voltage (Voc)</h3>
              <p className="text-white text-sm leading-relaxed">
                The open-circuit voltage of each string is measured with the inverter disconnected
                (DC isolator open) and compared to the calculated expected value. The expected Voc
                is the panel rated Voc multiplied by the number of panels in the string, adjusted
                for temperature using the panel temperature coefficient. A measured value
                significantly below the expected value indicates a faulty panel, a poor connection,
                or a wiring error. The irradiance level should be noted at the time of measurement.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <h3 className="font-bold text-white text-lg mb-3">Short-Circuit Current (Isc)</h3>
              <p className="text-white text-sm leading-relaxed">
                The short-circuit current of each string is measured using a DC clamp meter or by
                briefly short-circuiting the string through a suitable ammeter (PV modules are
                designed to withstand short-circuit conditions). The measured Isc is compared to the
                panel rated Isc adjusted for the actual irradiance level. All strings with the same
                configuration should produce similar Isc values at the same irradiance — a
                significant difference between strings indicates a problem.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <h3 className="font-bold text-white text-lg mb-3">Insulation Resistance (DC)</h3>
              <p className="text-white text-sm leading-relaxed">
                Insulation resistance is measured between positive and earth, negative and earth,
                and positive and negative, with the inverter disconnected and the string cables
                isolated. The test voltage depends on the system voltage — typically 500 V DC or
                1000 V DC. The minimum acceptable insulation resistance depends on the system
                configuration but must demonstrate adequate isolation between live conductors and
                earth. Low insulation resistance indicates potential earth faults in the cabling or
                panels.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <h3 className="font-bold text-white text-lg mb-3">Earth Continuity & Polarity</h3>
              <p className="text-white text-sm leading-relaxed">
                The continuity of the protective earth conductor from the PV array frame back to the
                main earthing terminal is verified. All exposed conductive parts of the array
                mounting system and any metallic cable containment must be effectively earthed.
                Polarity of each string must be confirmed — reversing positive and negative
                connections on a PV string will damage the inverter. The DC isolator polarity is
                also verified.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* G98 and G99 Grid Connection */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            G98 and G99 Grid Connection Requirements
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Any electricity-generating installation connected to the public distribution network
              must comply with the relevant Engineering Recommendation published by the Energy
              Networks Association (ENA). For solar PV, this means either G98 or G99, depending on
              the size of the installation.
            </p>
            <p>
              <strong>G98</strong> (which replaced G83) applies to installations with a rated output
              up to 16 A per phase. For a single-phase installation at 230 V, this equates to
              approximately 3.68 kW. For a three-phase installation, the limit is approximately
              11.04 kW (3.68 kW per phase). G98 uses a simplified notification process — you notify
              the Distribution Network Operator (DNO) within 28 days of commissioning using the
              standard G98 form, and connection is permitted automatically provided the installation
              meets the technical requirements. No prior approval is needed.
            </p>
            <p>
              <strong>G99</strong> (which replaced G59) applies to installations with a rated output
              exceeding the G98 threshold. G99 installations require a formal application to the DNO
              before installation begins. The DNO carries out a network impact assessment to
              determine whether the local network can accommodate the generation without voltage
              regulation problems, fault level issues, or other network constraints. The DNO may
              approve the connection as applied for, may approve it with conditions (such as export
              limitation), or may require network reinforcement before connection can proceed. G99
              installations also require more detailed commissioning tests and protection settings
              verification.
            </p>
            <p>
              Elec-Mate helps you document the grid connection details alongside the electrical
              certificate. You record whether G98 or G99 applies, the DNO notification or
              application reference number, the rated export capacity, and the inverter protection
              settings. This information is included in the exported PDF certificate, providing a
              complete record of both the electrical installation and the grid connection
              compliance.
            </p>
          </div>
        </div>
      </section>

      {/* MCS Compliance */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            MCS Compliance and the Smart Export Guarantee
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The Microgeneration Certification Scheme (MCS) is the quality assurance scheme for
              small-scale renewable energy installations in the UK. MCS certification covers both
              the products (panels and inverters must be MCS-listed) and the installers (who must be
              MCS-certified). An MCS-certified installation is eligible for payments under the Smart
              Export Guarantee (SEG), the government-backed scheme that pays generators for
              electricity exported to the grid.
            </p>
            <p>
              Without MCS certification, a solar PV installation cannot be registered for SEG
              payments. This is a significant financial consideration for homeowners — over the
              lifetime of a typical domestic PV system, SEG payments can amount to several thousand
              pounds. MCS certification also provides consumer protection through the MCS Consumer
              Code, which includes requirements for quotations, installations standards, and a
              complaints resolution process.
            </p>
            <p>
              To register a PV installation with MCS, the installer must upload commissioning
              documentation including the electrical installation certificate, the system
              specification, a performance estimate (predicting annual energy generation), and
              photographs of the installation. Elec-Mate generates certificate PDFs that include the
              detailed system specification and test results needed for MCS registration, reducing
              the administrative burden of the registration process.
            </p>
          </div>
        </div>
      </section>

      {/* How Elec-Mate Handles It */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How Elec-Mate Handles Solar PV Certification
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-8">
            <p>
              Solar PV certification involves more documentation than most electrical installations
              — system specs, DC test results, AC test results, inverter details, string
              configurations, and grid connection paperwork. Managing all this on paper or across
              multiple separate documents is inefficient and error-prone. Elec-Mate brings
              everything together in one structured digital certificate.
            </p>
            <p>
              You enter the system specification once — panel type, inverter details, string
              configuration — and the app calculates expected test values automatically. On site,
              you record test results directly into the app and it compares them to the expected
              values in real time, flagging any discrepancies. Both DC and AC side results are
              captured in the same certificate, eliminating the need for separate documents.
            </p>
            <p>
              The completed certificate exports as a professional PDF that includes everything —
              system spec, string diagrams, DC test results, AC test results, G98/G99 details, and
              digital signatures. It is ready to send to the client, upload to MCS, or submit to the
              DNO, all from your phone.
            </p>
            <p>
              Elec-Mate is part of a complete platform for UK electricians that includes 70
              electrical calculators, 8 Elec-AI agents and 12 AI tools, 36+ training courses, 8
              certificate types, and integration with Xero and QuickBooks for invoicing. Everything
              in one mobile-first tool.
            </p>
          </div>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* How To Section */}
      <section id="how-it-works" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            How to Create a Solar PV Certificate Using Elec-Mate
          </h2>
          <p className="text-white mb-8 leading-relaxed">
            Follow these steps to complete a solar PV installation certificate using the Elec-Mate
            app, from entering the system specification to exporting the finished PDF.
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
                  <h3 className="font-bold text-white text-lg mb-1">{step.name}</h3>
                  <p className="text-white text-sm leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BS 7671 Section 712 */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            BS 7671:2018+A3:2024 Section 712 — Solar PV Requirements
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Section 712 of BS 7671 sets out the particular requirements for solar photovoltaic
              power supply systems. It supplements the general requirements of the standard with
              specific provisions that address the unique characteristics and hazards of PV
              installations. Understanding these requirements is essential for anyone designing,
              installing, or certifying PV systems.
            </p>
            <p>
              <strong>Protection against electric shock (712.411):</strong> The standard requires
              that PV arrays on the DC side use either double insulation, protective separation, or
              automatic disconnection of supply. Since PV arrays cannot be de-energised during
              daylight, the emphasis is on preventing contact with live DC conductors through proper
              insulation, cable protection, and clear labelling.
            </p>
            <p>
              <strong>DC isolator requirements (712.537.2):</strong> A DC isolator
              (switch-disconnector) must be provided between the PV array and the inverter to allow
              safe maintenance. It must be rated for DC use at the system voltage and current, be
              located adjacent to the inverter, and be clearly labelled. The isolator must be
              capable of interrupting the full DC short-circuit current.
            </p>
            <p>
              <strong>Cable selection (712.522):</strong> DC cables on the PV array side are exposed
              to UV radiation, temperature extremes, and mechanical stress. Section 712 requires
              that cables used on the DC side are suitable for the environmental conditions —
              UV-resistant, rated for the temperature range, and protected against mechanical
              damage. PV-specific cables (typically H1Z2Z2-K) are designed for these conditions.
            </p>
            <p>
              <strong>Labelling (712.514):</strong> Clear warning labels are required at the main
              switch, the consumer unit, the inverter, and at any point where PV cabling passes
              through the building structure. These labels must warn that the PV system is a dual
              supply, that the PV array remains live during daylight hours even when the inverter is
              disconnected, and identify the DC isolation point.
            </p>
          </div>
        </div>
      </section>

      {/* Built for Working Installers */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Built for Working PV Installers
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Elec-Mate is designed by electricians for electricians and solar PV installers.
              Whether you are a domestic PV specialist, an electrician adding solar to your
              services, or part of a larger renewable energy company, the app fits your workflow.
              The certificate forms cover both domestic and commercial PV installations and follow
              BS 7671 Section 712 requirements.
            </p>
            <p>
              The platform includes 70 electrical calculators covering cable sizing, voltage drop,
              maximum demand, prospective fault current, and more — plus specific PV calculators for
              string sizing and expected generation. Combined with 8 certificate types, 8 Elec-AI
              agents, 12 AI tools, and 36+ training courses, it replaces multiple separate tools.
              Xero and QuickBooks integration means you can raise invoices directly from completed
              installations.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Frequently Asked Questions About Solar PV Certificates
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 text-white font-semibold text-left touch-manipulation min-h-[44px]">
                  <span>{faq.question}</span>
                  <span className="ml-4 shrink-0 text-yellow-400 text-xl group-open:rotate-45 transition-transform">
                    +
                  </span>
                </summary>
                <div className="px-5 pb-5 text-white text-sm leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Stop wrestling with solar PV paperwork"
        subheading="Join 430+ UK electricians creating professional digital certificates. 7-day free trial, cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </PublicPageLayout>
  );
}
