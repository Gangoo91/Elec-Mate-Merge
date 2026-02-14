import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Sun,
  FileCheck2,
  ClipboardCheck,
  ShieldCheck,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  Building2,
  Zap,
  Cable,
  Globe,
  Shield,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Certificates', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Solar PV Certificate Requirements', href: '/guides/solar-pv-certificate-requirements' },
];

const tocItems = [
  { id: 'overview', label: 'Certificate Overview' },
  { id: 'eic-requirement', label: 'Electrical Installation Certificate' },
  { id: 'mcs-certificate', label: 'MCS Certificate' },
  { id: 'dno-notification', label: 'DNO Notification (G98/G99)' },
  { id: 'handover-documentation', label: 'Handover Documentation' },
  { id: 'building-regulations', label: 'Building Regulations Compliance' },
  { id: 'warranty-insurance', label: 'Warranty and Insurance-Backed Guarantee' },
  { id: 'common-mistakes', label: 'Common Certificate Mistakes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Every solar PV installation requires an Electrical Installation Certificate (EIC) to BS 7671, covering the AC and DC wiring, protective devices, and earthing arrangements.',
  'MCS certification is required for the customer to access the Smart Export Guarantee (SEG) feed-in payments for exported electricity.',
  'G98 notification (for systems up to 16A per phase, approximately 3.68kW single-phase) must be submitted to the DNO before commissioning. G99 applies to larger systems.',
  'Handover documentation must include system design details, commissioning test results, inverter settings, and manufacturer warranty information.',
  'Elec-Mate provides digital solar PV certificate templates covering the EIC, commissioning record, and handover pack with professional PDF export.',
];

const faqs = [
  {
    question: 'What certificates are needed for a domestic solar PV installation?',
    answer:
      'A domestic solar PV installation in the UK requires several certificates and notifications. An Electrical Installation Certificate (EIC) to BS 7671 is mandatory, covering the AC wiring from the consumer unit to the inverter and the DC wiring from the panels to the inverter. If the installer is MCS-certified, an MCS certificate is issued, which is required for the customer to register for Smart Export Guarantee payments. A DNO notification must be submitted — G98 for systems up to 16A per phase (approximately 3.68kW single-phase) or G99 for larger systems. The installer must also provide handover documentation including system design details, commissioning results, and warranty information.',
  },
  {
    question: 'Do I need to be MCS-certified to install solar PV?',
    answer:
      "You do not need to be MCS-certified to physically install a solar PV system. Any competent electrician can carry out the installation work, provided they have appropriate training in PV systems. However, without MCS certification, you cannot issue an MCS certificate, and the customer will not be able to register for Smart Export Guarantee (SEG) payments from their energy supplier. MCS certification also provides the customer with an insurance-backed guarantee. For these reasons, most domestic customers will insist on using an MCS-certified installer. Some electricians work as subcontractors to MCS-certified companies, carrying out the electrical installation work under the MCS company's certification.",
  },
  {
    question: 'What is a G98 notification and when is it required?',
    answer:
      'A G98 notification (formally Engineering Recommendation G98) is a notification to the Distribution Network Operator (DNO) that a small-scale generation installation is being connected to the electricity network. It applies to installations up to 16A per phase — approximately 3.68kW for a single-phase installation or 11.04kW for a three-phase installation. The G98 notification must be submitted to the DNO before the system is commissioned. It is a notification, not an application for permission — the DNO has 10 working days to respond, and if they do not object within that period, the installation can proceed. For systems larger than 16A per phase, the G99 application process applies, which requires DNO approval before connection.',
  },
  {
    question: 'What must the EIC cover for a solar PV installation?',
    answer:
      'The Electrical Installation Certificate for a solar PV system must cover all the electrical work associated with the installation. This includes the DC wiring from the solar panels to the inverter (string cables, DC isolator, MC4 connectors), the inverter itself, the AC wiring from the inverter to the consumer unit, the AC isolator, the dedicated MCB or RCBO in the consumer unit, the earthing arrangements (including any equipotential bonding of the mounting frame), and any generation meter. The EIC should be completed in accordance with BS 7671:2018+A3:2024 and should reference the relevant sections of the IET Code of Practice for Grid Connected Solar PV Systems.',
  },
  {
    question: 'What happens if solar PV certificates are not provided?',
    answer:
      'Missing solar PV certificates can cause significant problems for the property owner. Without an EIC, there is no evidence that the electrical installation complies with BS 7671, which can affect property sales, mortgage applications, and insurance. Without an MCS certificate, the customer cannot register for Smart Export Guarantee payments, losing hundreds of pounds per year in export income. Without DNO notification, the installation is technically in breach of the Electricity Safety, Quality and Continuity Regulations 2002, and the DNO can require the system to be disconnected. Missing certificates can also invalidate the manufacturer warranty on the panels and inverter.',
  },
  {
    question: 'Is building regulations notification required for solar PV?',
    answer:
      'In most cases, solar PV installations on existing domestic properties do not require a building regulations application because they fall under the competent person self-certification scheme. MCS-certified installers can self-certify the work under Part P of the Building Regulations (England and Wales). The installer must notify the local authority through the competent person scheme within 30 days of completion. If the installer is not registered with a competent person scheme, a building regulations application must be made to the local authority, and a building control inspector will need to inspect the work. In Scotland, a building warrant may be required depending on the installation specifics.',
  },
  {
    question: 'What commissioning tests are required for solar PV?',
    answer:
      'Commissioning tests for a solar PV installation include both DC-side and AC-side tests. DC-side tests include open-circuit voltage (Voc) and short-circuit current (Isc) measurements for each string, insulation resistance testing of DC cables (at 500V minimum, ideally 1000V), and polarity verification. AC-side tests include the standard BS 7671 tests — continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance, and RCD operation. The inverter commissioning checks include verifying the grid protection settings (voltage and frequency trip limits), confirming the anti-islanding function operates correctly, and recording the inverter serial number and firmware version. All results must be recorded on the EIC and commissioning record.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/solar-pv-certificate',
    title: 'Solar PV Certificate App',
    description:
      'Create digital solar PV certificates on your phone with EIC, MCS, and commissioning record templates.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/solar-panel-installation',
    title: 'Solar Panel Installation Guide',
    description:
      'Complete guide to solar panel installation including roof assessment, mounting, wiring, and commissioning.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/tools/solar-panel-sizing-calculator',
    title: 'Solar Panel Sizing Calculator',
    description:
      'Calculate the optimal solar PV system size based on roof area, orientation, shading, and energy consumption.',
    icon: Sun,
    category: 'Tool',
  },
  {
    href: '/guides/electrical-certificate-types-uk',
    title: 'Electrical Certificate Types UK',
    description:
      'Overview of all UK electrical certificates including EIC, EICR, Minor Works, and specialist system certificates.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'EV charger installation requirements including DNO notification, certification, and Part P compliance.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/when-is-eic-required',
    title: 'When Is an EIC Required?',
    description:
      'Detailed guide on when an Electrical Installation Certificate is required, including solar PV and EV charger work.',
    icon: BookOpen,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Solar PV Certificate Requirements: Overview',
    content: (
      <>
        <p>
          Installing a solar PV system in the UK requires a package of certificates and
          notifications that together demonstrate the installation is safe, compliant, and eligible
          for export payments. Unlike a straightforward domestic rewire where a single EIC may
          suffice, a solar PV installation touches multiple regulatory frameworks: BS 7671 for the
          electrical installation, MCS for the renewable energy certification, and the DNO
          connection regulations.
        </p>
        <p>The key certificates and documents required for a solar PV installation are:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electrical Installation Certificate (EIC)</strong> — confirms the electrical
                work complies with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>
                .
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS certificate</strong> — confirms the system was installed by an
                MCS-certified installer and meets MCS standards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DNO notification (G98 or G99)</strong> — notifies the Distribution Network
                Operator that generation equipment is connected to the grid.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Handover documentation</strong> — system design, commissioning results,
                warranties, and user instructions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building regulations notification</strong> — Part P self-certification
                through a competent person scheme or a building regulations application.
              </span>
            </li>
          </ul>
        </div>
        <p>
          This guide explains each requirement in detail, so you know exactly what documentation to
          produce for every solar PV installation.
        </p>
      </>
    ),
  },
  {
    id: 'eic-requirement',
    heading: 'Electrical Installation Certificate (EIC)',
    content: (
      <>
        <p>
          Every solar PV installation requires an Electrical Installation Certificate (EIC) to BS
          7671:2018+A3:2024. The EIC covers all the electrical work associated with the installation
          — both the DC side (panels, string cables, DC isolator) and the AC side (inverter output,
          AC isolator, consumer unit connection).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">What the EIC Must Cover</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                DC wiring — string cables from panels to inverter, DC isolator, cable type and size,
                MC4 connector types, and cable routing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                AC wiring — inverter output cable, AC isolator, dedicated circuit breaker (MCB or
                RCBO) in the consumer unit, and cable type and size.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Earthing arrangements — main earthing terminal connection, equipotential bonding of
                the panel mounting frame (if metallic), and protective conductor sizing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Test results — continuity, insulation resistance (AC and DC), polarity, earth fault
                loop impedance, RCD operation, and DC string voltage and current measurements.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EIC should be issued in accordance with the model forms in BS 7671 Appendix 6. The{' '}
          <SEOInternalLink href="/guides/when-is-eic-required">EIC requirements</SEOInternalLink>{' '}
          for solar PV are the same as for any other new circuit, with the addition of DC-side test
          results that are specific to PV installations.
        </p>
        <SEOAppBridge
          title="Solar PV EIC templates in Elec-Mate"
          description="Elec-Mate includes dedicated solar PV EIC templates with DC and AC test result fields, string voltage and current recording, and automatic validation against BS 7671 requirements. Complete the EIC on site and export as a professional PDF."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'mcs-certificate',
    heading: 'MCS Certificate',
    content: (
      <>
        <p>
          The Microgeneration Certification Scheme (MCS) is the UK quality assurance scheme for
          small-scale renewable energy installations. MCS certification covers both the products
          (panels and inverters must be MCS-approved) and the installer (the company must hold an
          MCS installation certification).
        </p>
        <p>The MCS certificate is critical because it enables the customer to:</p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Register for the Smart Export Guarantee (SEG)</strong> — energy suppliers
                with over 150,000 customers must offer a SEG tariff for exported electricity. MCS
                certification is a prerequisite for registration.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Receive an insurance-backed guarantee</strong> — MCS-certified installations
                come with an insurance-backed guarantee that protects the customer if the installer
                ceases to trade.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Add value to the property</strong> — an MCS-certified installation with all
                documentation provides confidence to future buyers and their mortgage lenders.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The MCS certificate is generated through the MCS installation database by the certified
          installer. It records the system details (panel type, inverter type, total capacity in
          kWp), the estimated annual generation, and the installer's MCS number. The certificate is
          uploaded to the MCS database and a copy is provided to the customer.
        </p>
      </>
    ),
  },
  {
    id: 'dno-notification',
    heading: 'DNO Notification: G98 and G99',
    content: (
      <>
        <p>
          Connecting a solar PV system to the electricity grid requires notification to the
          Distribution Network Operator (DNO). The type of notification depends on the size of the
          installation.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">G98 — Small Systems</h3>
            <div className="space-y-3 text-white text-sm leading-relaxed">
              <p>
                <strong>Applies to:</strong> systems up to 16A per phase (approximately 3.68kW
                single-phase or 11.04kW three-phase).
              </p>
              <p>
                G98 is a notification, not an application. The installer submits the notification
                form to the DNO and can proceed with commissioning unless the DNO objects within 10
                working days.
              </p>
              <p>
                Most domestic solar PV installations fall under G98, as the typical system size of
                3-4kW is within the 16A single-phase limit.
              </p>
            </div>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
            <h3 className="font-bold text-white text-lg mb-3">G99 — Larger Systems</h3>
            <div className="space-y-3 text-white text-sm leading-relaxed">
              <p>
                <strong>Applies to:</strong> systems exceeding 16A per phase (above 3.68kW
                single-phase or above 11.04kW three-phase).
              </p>
              <p>
                G99 is a formal application that requires DNO approval before the system can be
                connected. The DNO assesses the impact on the local network and may require network
                upgrades before granting approval.
              </p>
              <p>
                The G99 process can take several weeks, so it must be started early in the project.
                Costs for any network reinforcement are borne by the applicant.
              </p>
            </div>
          </div>
        </div>
        <p>
          The DNO notification or application must be submitted by the installer. A copy of the G98
          notification or G99 approval letter should be included in the handover documentation
          provided to the customer.
        </p>
      </>
    ),
  },
  {
    id: 'handover-documentation',
    heading: 'Handover Documentation',
    content: (
      <>
        <p>
          MCS standards require the installer to provide comprehensive handover documentation to the
          customer on completion of the installation. This documentation package enables the
          customer to understand, operate, and maintain their solar PV system.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Handover Pack Contents</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                System design summary — panel layout drawing, string configuration, inverter
                location, cable routes, and total system capacity in kWp.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Commissioning test results — DC string voltage and current measurements, AC test
                results, inverter commissioning checks, and grid protection settings verification.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Manufacturer documentation — panel datasheets, inverter manual, and warranty
                certificates for all major components.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                User guide — how to read the inverter display, what the indicator lights mean, how
                to shut down the system in an emergency, and who to contact for faults.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Copies of all certificates — EIC, MCS certificate, G98/G99 notification, and
                building regulations notification.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Proper handover documentation protects both the installer and the customer. It
          demonstrates professionalism, reduces the likelihood of call-backs for operational
          queries, and provides the evidence needed for warranty claims.
        </p>
      </>
    ),
  },
  {
    id: 'building-regulations',
    heading: 'Building Regulations Compliance',
    content: (
      <>
        <p>
          Solar PV installations are electrical work that falls under Part P of the Building
          Regulations (England and Wales). The work must be either self-certified through a
          competent person scheme or notified to building control.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competent person route</strong> — MCS-certified installers registered with a
                competent person scheme (such as NICEIC, NAPIT, or ELECSA) can self-certify the
                work. The scheme provider notifies building control on the installer's behalf within
                30 days.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building regulations application</strong> — if the installer is not
                registered with a competent person scheme, a building regulations application must
                be made to the local authority before work begins. A building control inspector will
                inspect the completed work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Planning permission</strong> — most domestic solar PV installations are
                permitted development and do not require planning permission. Exceptions include
                listed buildings, conservation areas, and ground-mounted arrays exceeding 9m² in
                area.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The building regulations compliance certificate is an important document for the property
          owner. It is checked during property sales and mortgage applications. Missing building
          regulations sign-off can delay or prevent property transactions.
        </p>
      </>
    ),
  },
  {
    id: 'warranty-insurance',
    heading: 'Warranty and Insurance-Backed Guarantee',
    content: (
      <>
        <p>
          Solar PV installations come with multiple warranties that the installer must document and
          hand over to the customer.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Panel warranty</strong> — most solar panels carry a 25-year performance
                warranty guaranteeing a minimum output (typically 80% of rated output at 25 years)
                and a 10-12 year product warranty covering manufacturing defects.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inverter warranty</strong> — most inverters carry a 5-12 year product
                warranty, with extended warranties available. The inverter is the component most
                likely to require replacement during the system lifetime.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Workmanship warranty</strong> — the installer provides a warranty covering
                the installation work, typically 2-10 years depending on the company.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insurance-backed guarantee (IBG)</strong> — MCS-certified installations
                include an IBG that protects the customer if the installer ceases to trade during
                the warranty period. This is a key benefit of MCS certification.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All warranty documents should be included in the handover pack and the customer should be
          advised to keep them safe. Elec-Mate stores{' '}
          <SEOInternalLink href="/guides/electrical-certificate-retention">
            all certificates and warranty records
          </SEOInternalLink>{' '}
          digitally, so they are always accessible and cannot be lost.
        </p>
        <SEOAppBridge
          title="Complete solar PV handover packs in Elec-Mate"
          description="Create professional solar PV handover documentation with Elec-Mate. EIC, commissioning record, system design summary, and warranty information all in one digital pack. Export as a branded PDF for your customer."
          icon={Sun}
        />
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common Solar PV Certificate Mistakes',
    content: (
      <>
        <p>
          Solar PV certification errors are a common finding during MCS audits and can result in
          non-conformance reports. Here are the most frequent mistakes and how to avoid them:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incomplete DC test results</strong> — the EIC must include DC string voltage
                (Voc) and short-circuit current (Isc) measurements for every string. These are often
                omitted or recorded incorrectly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing DC insulation resistance test</strong> — the DC cables must be
                tested for insulation resistance at a minimum test voltage of 500V (1000V
                preferred). This is a separate test from the AC insulation resistance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G98 not submitted before commissioning</strong> — the DNO notification must
                be submitted before the system is connected and commissioned. Retrospective
                notification is not acceptable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No grid protection settings verification</strong> — the inverter grid
                protection settings (voltage and frequency trip limits) must be verified and
                recorded. Factory default settings may not match UK requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building regulations not notified</strong> — the work must be notified
                through a competent person scheme or a building regulations application. Missing
                this step creates problems for the property owner during future sales.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate's solar PV certificate templates include prompts and validation checks that help
          you avoid these common errors. The app flags missing test results, reminds you about DNO
          notification, and ensures all required fields are completed before the certificate can be
          finalised.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SolarPVCertificateRequirementsPage() {
  return (
    <GuideTemplate
      title="Solar PV Certificate Requirements | MCS UK"
      description="Complete guide to solar PV certificate requirements in the UK. Covers EIC, MCS certification, G98/G99 DNO notification, handover documentation, and building regulations compliance for solar panel installations."
      datePublished="2026-02-01"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Certificates"
      badgeIcon={Sun}
      heroTitle={
        <>
          Solar PV Certificate Requirements: <span className="text-yellow-400">MCS UK Guide</span>
        </>
      }
      heroSubtitle="Every solar PV installation requires an EIC, MCS certificate, DNO notification, and handover documentation. This guide explains each certificate requirement in detail, covering what must be included, who issues it, and the consequences of missing documentation."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Solar PV Certificates"
      relatedPages={relatedPages}
      ctaHeading="Solar PV Certificates on Your Phone"
      ctaSubheading="Create professional solar PV certificates with Elec-Mate. EIC with DC test results, commissioning records, and complete handover packs with instant PDF export. 7-day free trial."
    />
  );
}
