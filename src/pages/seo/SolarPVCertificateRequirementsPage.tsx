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
  { label: 'Solar PV Certificate Requirements', href: '/solar-pv-certificate-requirements' },
];

const tocItems = [
  { id: 'overview', label: 'Certificate Overview' },
  { id: 'eic-requirement', label: 'Electrical Installation Certificate' },
  { id: 'mcs-certificate', label: 'MCS Certificate' },
  { id: 'dno-notification', label: 'DNO Notification (G98/G99)' },
  { id: 'commissioning-tests', label: 'Commissioning Tests (DC and AC)' },
  { id: 'handover-documentation', label: 'Handover Documentation' },
  { id: 'building-regulations', label: 'Building Regulations Compliance' },
  { id: 'warranty-insurance', label: 'Warranty and Insurance-Backed Guarantee' },
  { id: 'common-mistakes', label: 'Common Certificate Mistakes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const answerBox = {
  question: 'What certificates do you need for a solar PV installation in the UK?',
  answer:
    'A UK solar PV install needs four things: an Electrical Installation Certificate (EIC) to BS 7671:2018+A4:2026 covering the AC and DC work; an MCS certificate (required for the customer to claim Smart Export Guarantee payments); a DNO notification (G98 up to 16A per phase, G99 above); and a handover pack with commissioning results and warranties. Building Regulations are met via Part P self-certification.',
};

const keyTakeaways = [
  'Every solar PV installation requires an Electrical Installation Certificate (EIC) to BS 7671, covering the AC and DC wiring, protective devices, and earthing arrangements.',
  'MCS certification is required for the customer to access the Smart Export Guarantee (SEG) feed-in payments for exported electricity.',
  'G98 notification (for systems up to 16A per phase, approximately 3.68kW single-phase) must be submitted to the DNO before commissioning. G99 applies to larger systems.',
  'Handover documentation must include system design details, commissioning test results, inverter settings, and manufacturer warranty information.',
  'DC-side cables and equipment remain energised whenever panels are exposed to light — even when the AC supply and inverter are fully disconnected (BS 7671 Reg 712.410.101). The EIC isolation notes and safe-working method must reflect this.',
  'A permanent warning notice is mandatory at every DC access point (combiner boxes, DC distribution boards) and fixed to every inverter per BS 7671 Regs 712.514.102 and 712.514.103. Absence of these labels is a frequent MCS audit non-conformance.',
  'DC connectors must be selected to BS EN 62852:2015+A1:2020 per Reg 712.526.101. Where accessible to non-skilled persons, they must require a key or tool to disconnect.',
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
      'The Electrical Installation Certificate for a solar PV system must cover all the electrical work associated with the installation. This includes the DC wiring from the solar panels to the inverter (string cables, DC isolator, and DC connectors selected to BS EN 62852:2015+A1:2020 per Reg 712.526.101), the inverter itself, the AC wiring from the inverter to the consumer unit, the AC isolator, the dedicated MCB or RCBO in the consumer unit, the earthing arrangements (including any equipotential bonding of the mounting frame), and any generation meter. The EIC must also record: the DC-side protective measure (double/reinforced insulation or SELV/PELV per Reg 712.410.102); confirmation that mandatory warning labels are in place at every DC access point (Reg 712.514.102) and fixed to every inverter (Reg 712.514.103); and an isolation note reflecting that DC circuits remain energised even when the AC supply is isolated (Reg 712.410.101). The EIC should be completed in accordance with BS 7671:2018+A4:2026, using the updated Appendix 6 model forms which now include fields for SPDs and AFDDs.',
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
      'Commissioning tests for a solar PV installation include both DC-side and AC-side tests. DC-side tests include open-circuit voltage (Voc) and short-circuit current (Isc) measurements for each string, insulation resistance testing of DC cables (at 500V minimum, ideally 1000V), and polarity verification. Before carrying out any DC-side test work, note that Reg 712.410.101 requires DC cables and equipment to be treated as live at all times — even when the AC supply and inverter are disconnected — because the PV array continues to generate voltage in daylight. AC-side tests include the standard BS 7671 tests — continuity of protective conductors, insulation resistance, polarity, earth fault loop impedance, and RCD operation. The EIC must also record the DC-side protective measure applied: either double/reinforced insulation (Section 412) or SELV/PELV (Section 414) as required by Reg 712.410.102. The inverter commissioning checks include verifying the grid protection settings (voltage and frequency trip limits), confirming the anti-islanding function operates correctly, and recording the inverter serial number and firmware version. All results must be recorded on the EIC and commissioning record.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/rams-for-solar-pv-installation',
    title: 'RAMS for Solar PV Installation',
    description: 'Work at height, DC isolation, MCS, G98/G99.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/guides/section-712-prosumer-a4-2026',
    title: 'Section 712 Prosumer (A4:2026)',
    description: 'Battery storage + solar + microgen under A4:2026.',
    icon: Sun,
    category: 'Guide',
  },
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
          7671:2018+A4:2026. The EIC covers all the electrical work associated with the installation
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
                and cable routing. DC connectors must be selected to BS EN 62852:2015+A1:2020 per
                Reg 712.526.101. Where accessible to non-skilled persons, connectors must require a
                key or tool to disconnect (Reg 712.526.101).
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
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                DC-side protective measure — the EIC must record whether double/reinforced
                insulation (Section 412) or SELV/PELV (Section 414) is applied on the DC side, as
                required by Reg 712.410.102. This is a mandatory selection, not a default
                assumption.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Mandatory warning labels — a permanent warning notice at every DC live-access point
                (combiner boxes, DC distribution boards) per Reg 712.514.102, and a warning notice
                fixed to every inverter per Reg 712.514.103. Both labels must be recorded as
                installed in the EIC inspection notes.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/30 p-5 my-4">
          <p className="font-bold text-orange-300 mb-2">
            DC Safety: Always Treat as Live (Reg 712.410.101)
          </p>
          <p className="text-white text-sm leading-relaxed">
            DC cables and equipment on the solar PV side remain energised whenever the panels are
            exposed to light — even when the AC supply has been isolated and the inverter has been
            disconnected. BS 7671 Reg 712.410.101 is explicit: electrical equipment on the DC side
            shall be considered to be energised even when the AC side is disconnected from the grid
            and even when the inverter is disconnected from the DC side. The EIC isolation notes and
            any safe-working method statement must reflect this: DC circuits cannot be treated as
            dead by AC isolation alone.
          </p>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="px-4 py-3 bg-white/[0.06]">
            <h3 className="font-bold text-white text-base">
              BS 7671 Section 712 — DC-side requirements to evidence on the EIC
            </h3>
          </div>
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.03] text-left">
                <th className="px-4 py-3 font-semibold">Regulation</th>
                <th className="px-4 py-3 font-semibold">Requirement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-4 py-3 font-mono text-yellow-300 align-top">712.410.101</td>
                <td className="px-4 py-3">
                  DC-side equipment shall be considered energised even when the AC side is
                  disconnected from the grid and the inverter is disconnected from the DC side.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-yellow-300 align-top">712.410.102</td>
                <td className="px-4 py-3">
                  Apply one DC-side protective measure: double or reinforced insulation (Section 412)
                  or extra-low voltage SELV/PELV (Section 414). Record which is used.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-yellow-300 align-top">712.514.102</td>
                <td className="px-4 py-3">
                  Permanent warning notice at each point of access to DC live parts (distribution
                  boards, combiner boxes), e.g. &lsquo;SOLAR DC — Live parts can remain energised
                  after isolation&rsquo;.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-yellow-300 align-top">712.514.103</td>
                <td className="px-4 py-3">
                  Warning notice fixed to all inverters: &lsquo;WARNING — Isolate both AC and DC
                  sides before servicing&rsquo;.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-yellow-300 align-top">712.521.1041</td>
                <td className="px-4 py-3">
                  DC cables selected and erected to minimise earth-fault and short-circuit risk —
                  e.g. single-core non-metallic-sheathed H1Z2Z2-K to BS EN 50618; cables not laid
                  directly on the roof surface.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-yellow-300 align-top">712.523.101</td>
                <td className="px-4 py-3">
                  For cables subject to direct heating under the module, design ambient temperature
                  shall be taken as at least 70&deg;C.
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-mono text-yellow-300 align-top">712.526.101</td>
                <td className="px-4 py-3">
                  DC connectors selected to BS EN 62852:2015+A1:2020. Where accessible to ordinary
                  persons, they must require a key or tool to disconnect (or sit in a key/tool-only
                  enclosure).
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          The EIC should be issued in accordance with the model forms in BS 7671 Appendix 6. The
          A4:2026 update to Appendix 6 adds fields for recording surge protective devices (SPDs) and
          arc fault detection devices (AFDDs) — where an SPD is fitted on the AC side of the
          inverter, its details must be recorded on the updated EIC form. The{' '}
          <SEOInternalLink href="/guides/when-is-eic-required">EIC requirements</SEOInternalLink>{' '}
          for solar PV are the same as for any other new circuit, with the addition of DC-side test
          results that are specific to PV installations.
        </p>
        <SEOAppBridge
          title="Solar PV EIC templates in Elec-Mate"
          description="Elec-Mate includes dedicated solar PV EIC templates with DC and AC test result fields, string voltage and current recording…"
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
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-semibold"> </th>
                <th className="px-4 py-3 font-semibold text-green-300">G98</th>
                <th className="px-4 py-3 font-semibold text-blue-300">G99</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-4 py-3 font-medium text-white/70">Type</td>
                <td className="px-4 py-3">Notification (connect-and-notify)</td>
                <td className="px-4 py-3">Application (approval before connection)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-white/70">Threshold</td>
                <td className="px-4 py-3">Up to 16A per phase</td>
                <td className="px-4 py-3">Above 16A per phase</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-white/70">Single-phase</td>
                <td className="px-4 py-3">Up to approx. 3.68kW</td>
                <td className="px-4 py-3">Above approx. 3.68kW</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-white/70">Three-phase</td>
                <td className="px-4 py-3">Up to approx. 11.04kW</td>
                <td className="px-4 py-3">Above approx. 11.04kW</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-white/70">DNO timescale</td>
                <td className="px-4 py-3">10 working days to object</td>
                <td className="px-4 py-3">Several weeks for assessment</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium text-white/70">Typical use</td>
                <td className="px-4 py-3">Most domestic (3–4kW) systems</td>
                <td className="px-4 py-3">Large domestic, commercial, multi-string</td>
              </tr>
            </tbody>
          </table>
        </div>
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
    id: 'commissioning-tests',
    heading: 'Commissioning Tests: DC and AC Sides',
    content: (
      <>
        <p>
          Commissioning a solar PV system involves two distinct sets of tests: the standard BS 7671
          inspection and testing for the AC installation, plus DC-side checks specific to the PV
          array. Under BS 7671 Reg 712.6.101, once the relevant Part 6 requirements are met, the
          additional system documentation, commissioning tests and inspection follow the{' '}
          <strong>BS EN 62446 series</strong>. Both sets of results belong on the certificate and in
          the handover pack.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-semibold">Side</th>
                <th className="px-4 py-3 font-semibold">Test / check</th>
                <th className="px-4 py-3 font-semibold">Notes</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr className="bg-orange-500/[0.06]">
                <td className="px-4 py-3 font-medium text-orange-300 align-top" rowSpan={4}>
                  DC side
                </td>
                <td className="px-4 py-3">Open-circuit voltage (V<sub>oc</sub>) per string</td>
                <td className="px-4 py-3">Compare against expected value for the string and temperature</td>
              </tr>
              <tr className="bg-orange-500/[0.06]">
                <td className="px-4 py-3">Short-circuit current (I<sub>sc</sub>) per string</td>
                <td className="px-4 py-3">Or operational current; confirms string is producing correctly</td>
              </tr>
              <tr className="bg-orange-500/[0.06]">
                <td className="px-4 py-3">DC insulation resistance</td>
                <td className="px-4 py-3">Treat DC as live at all times (Reg 712.410.101) — test per BS EN 62446 method</td>
              </tr>
              <tr className="bg-orange-500/[0.06]">
                <td className="px-4 py-3">Polarity</td>
                <td className="px-4 py-3">Verify before connecting strings to the inverter</td>
              </tr>
              <tr className="bg-blue-900/20">
                <td className="px-4 py-3 font-medium text-blue-300 align-top" rowSpan={3}>
                  AC side
                </td>
                <td className="px-4 py-3">Continuity, insulation resistance, polarity</td>
                <td className="px-4 py-3">Standard BS 7671 dead tests for the new AC circuit</td>
              </tr>
              <tr className="bg-blue-900/20">
                <td className="px-4 py-3">Earth fault loop impedance &amp; RCD operation</td>
                <td className="px-4 py-3">Live tests on the inverter-to-consumer-unit circuit</td>
              </tr>
              <tr className="bg-blue-900/20">
                <td className="px-4 py-3">Earthing &amp; bonding verification</td>
                <td className="px-4 py-3">Main earthing terminal; bonding of metallic mounting frame where required</td>
              </tr>
              <tr className="bg-yellow-500/[0.06]">
                <td className="px-4 py-3 font-medium text-yellow-300 align-top" rowSpan={2}>
                  Inverter
                </td>
                <td className="px-4 py-3">Grid protection settings</td>
                <td className="px-4 py-3">Verify voltage/frequency trip limits and anti-islanding; factory defaults may not match UK requirements</td>
              </tr>
              <tr className="bg-yellow-500/[0.06]">
                <td className="px-4 py-3">Record serial number &amp; firmware</td>
                <td className="px-4 py-3">For warranty, traceability and future settings audits</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p>
          A common audit finding is incomplete or missing DC results — every string needs its own
          V<sub>oc</sub> and current reading recorded. See the{' '}
          <SEOInternalLink href="/guides/rams-for-solar-pv-installation">
            solar PV RAMS guide
          </SEOInternalLink>{' '}
          for the safe-working method behind these DC checks.
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
          hand over to the customer. Typical durations vary by component and manufacturer, so always
          confirm against the actual product documentation:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <table className="w-full text-sm text-white">
            <thead>
              <tr className="bg-white/[0.06] text-left">
                <th className="px-4 py-3 font-semibold">Warranty</th>
                <th className="px-4 py-3 font-semibold">Typical duration</th>
                <th className="px-4 py-3 font-semibold">What it covers</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              <tr>
                <td className="px-4 py-3 font-medium">Panel performance</td>
                <td className="px-4 py-3">25 years (often 30)</td>
                <td className="px-4 py-3">Guaranteed minimum output (commonly ~80–87% at year 25)</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Panel product</td>
                <td className="px-4 py-3">10–25 years</td>
                <td className="px-4 py-3">Manufacturing defects in the module itself</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Inverter</td>
                <td className="px-4 py-3">5–12 years</td>
                <td className="px-4 py-3">Most likely component to need replacement; extensions common</td>
              </tr>
              <tr>
                <td className="px-4 py-3 font-medium">Workmanship</td>
                <td className="px-4 py-3">2–10 years</td>
                <td className="px-4 py-3">The installation work, set by the installer</td>
              </tr>
              <tr className="bg-yellow-500/[0.06]">
                <td className="px-4 py-3 font-medium">Insurance-backed guarantee (IBG)</td>
                <td className="px-4 py-3">Matches workmanship term</td>
                <td className="px-4 py-3">Honours the workmanship warranty if the installer ceases to trade — an MCS benefit</td>
              </tr>
            </tbody>
          </table>
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
          description="Create professional solar PV handover documentation with Elec-Mate. EIC, commissioning record, system design summary…"
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
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing DC access-point warning labels (Reg 712.514.102)</strong> — a
                permanent warning notice is mandatory at every point of access to DC live parts
                (combiner boxes, DC distribution boards). Example wording: &lsquo;SOLAR DC — Live
                parts can remain energised after isolation&rsquo;. Absence of these labels is a
                frequent MCS audit non-conformance finding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Missing inverter warning notice (Reg 712.514.103)</strong> — a warning
                notice must be physically fixed to every inverter with wording similar to:
                &lsquo;WARNING — Isolate both AC and DC sides before servicing&rsquo;. This is a
                mandatory labelling requirement under BS 7671, not a recommendation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wrong DC connector type (Reg 712.526.101)</strong> — DC connectors must be
                selected to BS EN 62852:2015+A1:2020. Generic or non-compliant connectors fail this
                requirement. Where connectors are accessible to non-skilled persons, they must
                require a key or tool to disconnect.
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
      description="Complete guide to solar PV certificate requirements in the UK. Covers EIC, MCS certification, G98/G99 DNO notification, handover documentation…"
      datePublished="2026-02-01"
      dateModified="2026-05-29"
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
      answerBox={answerBox}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Solar PV Certificates"
      relatedPages={relatedPages}
      ctaHeading="Solar PV Certificates on Your Phone"
      ctaSubheading="Create professional solar PV certificates with Elec-Mate. EIC with DC test results, commissioning records, and complete handover packs with instant PDF export. 7-day free trial."
    />
  );
}
