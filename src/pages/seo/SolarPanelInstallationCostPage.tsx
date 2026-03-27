import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Calculator,
  Zap,
  Wrench,
  FileCheck2,
  PoundSterling,
  Sun,
  Home,
  Building2,
  ClipboardCheck,
  GraduationCap,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Solar Panel Electrical Cost', href: '/guides/solar-panel-installation-electrical-cost' },
];

const tocItems = [
  { id: 'overview', label: 'Electrician\'s Scope on Solar PV' },
  { id: 'dc-isolator', label: 'DC Isolator and AC Isolator' },
  { id: 'meter-tails', label: 'Meter Tails Upgrade' },
  { id: 'consumer-unit', label: 'Consumer Unit Connection' },
  { id: 'earthing', label: 'Earthing and Bonding' },
  { id: 'generation-meter', label: 'Generation Meter' },
  { id: 'total-costs', label: 'Total Electrical Costs' },
  { id: 'mcs-certification', label: 'MCS Certification' },
  { id: 'dno-g98-g99', label: 'DNO G98/G99 Notification' },
  { id: 'seg-export', label: 'SEG Export Payments' },
  { id: 'for-electricians', label: 'For Electricians: Quoting Solar Electrical Work' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The electrician\'s scope on a solar PV installation covers the DC isolator, AC isolator, meter tails upgrade (if needed), generation meter, consumer unit connection, earthing, and certification. This typically costs £500 to £1,500 on top of the panel and inverter cost.',
  'This guide covers the electrical work only — not panel mounting, roof work, or inverter installation. The electrical connection is the final stage of a solar PV installation and must be carried out by a competent electrician.',
  'MCS (Microgeneration Certification Scheme) certification is required for the customer to receive Smart Export Guarantee (SEG) payments. The installation must be carried out by an MCS-certified installer.',
  'DNO notification under G98 (for installations up to 3.68 kW per phase) or G99 (for larger installations) is mandatory. G98 is a simple notification; G99 requires application and approval before energisation.',
  'Under BS 7671 Regulation 411.3.3, RCD protection not exceeding 30 mA is required for the solar PV AC circuit connection. The AC isolator must be accessible to the DNO and firefighters.',
];

const faqs = [
  {
    question: 'How much does the electrical work cost for solar panel installation?',
    answer:
      'The electrical work for a typical domestic solar PV installation costs £500 to £1,500 in 2026. This covers the DC isolator (£30 to £60), AC isolator (£25 to £50), meter tails upgrade if needed (£100 to £250), consumer unit connection including a new way with RCBO (£100 to £250), earthing and bonding (£50 to £150), generation meter if required (£80 to £150), and labour for the electrical work (£250 to £600). These costs are on top of the panels, inverter, and mounting system.',
  },
  {
    question: 'Do I need to upgrade my meter tails for solar panels?',
    answer:
      'It depends on the existing meter tails size and the solar PV system capacity. If the existing meter tails are 16mm² (common in older installations), they may not be adequate for the additional generation load and should be upgraded to 25mm². Modern installations typically have 25mm² tails, which are adequate for most domestic solar PV systems up to 4 kW. Your electrician should assess the tails during the survey and include any upgrade in the quotation.',
  },
  {
    question: 'What is the difference between G98 and G99?',
    answer:
      'G98 and G99 are Engineering Recommendations that govern the connection of generation equipment to the distribution network. G98 applies to installations up to 3.68 kW per phase (3.68 kW on single-phase, 11.04 kW on 3-phase) and requires a simple notification to the DNO after installation — no prior approval needed. G99 applies to installations above these thresholds and requires a formal application to the DNO with approval before the system can be energised. G99 applications take 4 to 8 weeks for approval.',
  },
  {
    question: 'Do I need MCS certification for solar panels?',
    answer:
      'MCS (Microgeneration Certification Scheme) certification is not a legal requirement for installing solar panels, but it is required if the customer wants to receive Smart Export Guarantee (SEG) payments for electricity exported to the grid. SEG payments are worth £100 to £300 per year for a typical domestic system, so MCS certification effectively pays for itself. The installation must be carried out by an MCS-certified installer using MCS-certified products.',
  },
  {
    question: 'Can any electrician do the electrical work for solar panels?',
    answer:
      'Any competent electrician can carry out the AC electrical work — consumer unit connection, meter tails, earthing, and AC isolator. However, the DC work (from the panels to the inverter) and the overall system design, commissioning, and MCS certification require specific solar PV training and MCS accreditation. In practice, most solar PV installations are carried out by MCS-certified solar companies who have their own electricians or subcontract the electrical work to qualified sparks.',
  },
  {
    question: 'Where should the AC and DC isolators be located?',
    answer:
      'The DC isolator should be located adjacent to the inverter, within arm\'s reach, and clearly labelled. It allows the inverter to be safely isolated from the DC supply from the panels. The AC isolator should be located between the inverter and the consumer unit, and must be accessible to the DNO and emergency services. It is typically mounted next to the consumer unit or the meter. Both isolators must be clearly labelled with appropriate warning signs indicating the presence of dual supplies.',
  },
  {
    question: 'What earthing is required for solar PV?',
    answer:
      'The solar PV system requires protective earthing of all exposed conductive parts — the panel frames, mounting system, inverter casing, and any metallic containment. An earth conductor (typically 4mm² or 6mm² green/yellow) connects all metallic parts back to the main earthing terminal. Additionally, equipotential bonding may be required for the mounting system if it is in contact with the building\'s structural metalwork. Lightning protection should be considered — an SPD (surge protection device) on both the DC and AC sides is strongly recommended.',
  },
  {
    question: 'How long does the electrical work take for a solar PV installation?',
    answer:
      'The electrical work for a typical domestic solar PV installation takes half a day to a full day. This includes installing the DC and AC isolators, connecting the inverter to the consumer unit, upgrading meter tails if needed, completing the earthing and bonding, installing the generation meter, testing all circuits, and completing the EIC. If the consumer unit needs replacing or upgrading to accommodate the new solar circuit, add another half day.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/consumer-unit-replacement-cost',
    title: 'Consumer Unit Replacement Cost',
    description:
      'Solar PV requires a spare way in the consumer unit — replacement may be needed.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/guides/three-phase-installation-cost',
    title: '3-Phase Installation Cost',
    description:
      'Larger solar PV systems may require or benefit from a 3-phase supply upgrade.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for solar PV electrical connections.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description:
      'Quote solar PV electrical work with itemised components, labour, and professional PDF.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/ev-charger-installation-guide',
    title: 'EV Charger Installation Guide',
    description:
      'EV chargers and solar PV are commonly installed together for maximum savings.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/spd-surge-protection',
    title: 'SPD Surge Protection Guide',
    description:
      'Surge protection is strongly recommended on both DC and AC sides of solar PV.',
    icon: ShieldCheck,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Electrician\'s Scope on a Solar PV Installation',
    content: (
      <>
        <p>
          A solar PV installation involves two distinct skill sets: the roof work (panel mounting,
          rail systems, weatherproofing) and the electrical work (DC and AC wiring, isolators,
          consumer unit connection, earthing, metering, and certification). This guide focuses
          exclusively on the electrical work — the part that falls within the electrician's scope.
        </p>
        <p>
          Understanding the electrical costs separately is important for two reasons. First,
          electricians who subcontract to solar installers need to price their electrical work
          accurately. Second, customers comparing solar quotes should understand what proportion of
          the cost covers the electrical installation versus the panels and mounting.
        </p>
        <p>
          The electrical work is the final stage of a solar PV installation. Panels are mounted,
          DC cabling is run to the inverter location, and then the electrician takes over — installing
          isolators, connecting the inverter to the consumer unit, completing the earthing, installing
          metering, testing, and certifying the installation.
        </p>
      </>
    ),
  },
  {
    id: 'dc-isolator',
    heading: 'DC Isolator and AC Isolator',
    content: (
      <>
        <p>
          Two isolators are required on every solar PV installation: a DC isolator between the panels
          and the inverter, and an AC isolator between the inverter and the consumer unit.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DC isolator</strong> — £30 to £60 trade. A dedicated DC-rated isolator switch
                mounted adjacent to the inverter. Must be rated for the maximum DC voltage and current
                of the string. Typically 600V to 1000V DC, 25A to 32A. Must be load-break rated (can
                safely interrupt DC current under load). Clearly labelled with "DC ISOLATOR — SOLAR PV"
                and appropriate hazard warnings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AC isolator</strong> — £25 to £50 trade. A double-pole isolator switch between
                the inverter AC output and the consumer unit. Must be accessible to the DNO and
                emergency services — typically mounted adjacent to the consumer unit or electricity
                meter. Labelled "AC ISOLATOR — SOLAR PV" with dual supply warning labels.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warning labels</strong> — dual supply warning labels are mandatory at the
                consumer unit, meter position, and all isolator locations. These alert firefighters and
                DNO engineers that the installation has a second source of supply. Budget £10 to £20
                for a complete set of labels compliant with BS 7671 and the fire service requirements.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'meter-tails',
    heading: 'Meter Tails Upgrade',
    content: (
      <>
        <p>
          The meter tails connect the electricity meter to the consumer unit. In older installations,
          these may be 16mm² — adequate for the original installation but potentially undersized when
          solar PV generation is added.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter tails assessment</strong> — check the existing tails size and condition.
                25mm² tails are adequate for most domestic solar PV systems. If the tails are 16mm²
                or show signs of deterioration, upgrade to 25mm².
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Upgrade cost</strong> — £100 to £250 for meter tails replacement. This
                includes the cable (25mm² meter tails, approximately £8 to £12 per metre), the labour
                to replace them, and coordination with the DNO if the meter needs to be moved or
                re-sealed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Henley block</strong> — if the solar PV connection is made via a Henley block
                (service connector block) on the meter tails rather than through the consumer unit, a
                separate tails assessment and potentially a larger Henley block may be required.
                Budget £30 to £50 for the Henley block.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'consumer-unit',
    heading: 'Consumer Unit Connection',
    content: (
      <>
        <p>
          The solar PV inverter AC output connects to the consumer unit via a dedicated way. This
          requires a spare way in the consumer unit and an appropriately rated protective device.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated RCBO</strong> — the solar PV circuit requires its own RCBO at the
                consumer unit. Under BS 7671 Regulation 411.3.3, RCD protection with a rated residual
                operating current not exceeding 30 mA is required. A 16A or 20A Type B RCBO is
                typical for domestic solar PV. Cost: £35 to £55.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>No spare ways</strong> — if the consumer unit has no spare ways, options
                include replacing the consumer unit with a larger board (see our{' '}
                <SEOInternalLink href="/guides/consumer-unit-replacement-cost">
                  consumer unit replacement cost guide
                </SEOInternalLink>
                ) or using a Henley block connection on the meter tails to feed a separate small
                consumer unit for the solar circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable from inverter to consumer unit</strong> — typically 4mm² or 6mm² twin
                and earth, depending on cable run length and circuit rating. Cost: £2 to £4 per metre
                plus containment. A typical domestic run is 5 to 15 metres.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total consumer unit connection cost</strong> — £100 to £250 including the
                RCBO, cable, containment, and connection labour.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'earthing',
    heading: 'Earthing and Bonding',
    content: (
      <>
        <p>
          Proper earthing and bonding of the solar PV system is critical for safety. All exposed
          conductive parts must be connected to the main earthing terminal.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Panel frame earthing</strong> — each panel frame must be earthed. This is
                typically achieved through the mounting rail system, which provides a continuous earth
                path through all panels. Earth bonding clips or lugs connect the rail to the
                protective earth conductor.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mounting system bonding</strong> — the entire mounting rail system must be
                bonded to the main earthing terminal. A 4mm² or 6mm² earth conductor (green/yellow)
                runs from the mounting system to the main earth bar.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SPD (surge protection)</strong> — surge protection on both the DC side
                (between panels and inverter) and AC side (at the consumer unit) is strongly
                recommended. Many modern inverters include built-in DC SPDs. An AC SPD at the
                consumer unit costs £80 to £150 and protects the entire installation from transient
                overvoltages.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing cost</strong> — £50 to £150 for the earth conductor, bonding clips,
                connections, and labour.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'generation-meter',
    heading: 'Generation Meter',
    content: (
      <>
        <p>
          A generation meter measures the total electricity generated by the solar PV system. While
          smart meters can now record export data (making a separate generation meter less essential
          for SEG payments), many installations still include one for monitoring purposes.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Generation meter</strong> — £80 to £150 installed. A DIN-rail mounted kWh
                meter installed between the inverter AC output and the consumer unit. Provides an
                accurate record of total generation. Some inverters have built-in metering that can
                replace a separate meter.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Export meter</strong> — if the customer does not have a smart meter, an
                export meter may be needed to record electricity exported to the grid for SEG
                payments. However, most energy suppliers now require or provide a smart meter for SEG,
                which records export automatically.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'total-costs',
    heading: 'Total Electrical Costs for Solar PV',
    content: (
      <>
        <p>
          Here are realistic total costs for the electrical work on a solar PV installation in 2026.
          These costs are for the electrical connection only — panels, inverter, mounting system,
          and roof work are separate.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-5 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small system (up to 4 kW, existing tails adequate)</strong> — £500 to £900
                total. DC isolator: £30 to £60. AC isolator: £25 to £50. Consumer unit connection
                (RCBO + cable): £100 to £200. Earthing and bonding: £50 to £100. Generation meter:
                £80 to £150. Labels: £10 to £20. Labour: £200 to £400.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Medium system (4 to 8 kW, tails upgrade needed)</strong> — £800 to £1,300
                total. As above plus meter tails upgrade (£100 to £250) and longer cable runs. AC
                SPD recommended (£80 to £150). Additional labour for tails work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Large system (8+ kW, consumer unit upgrade needed)</strong> — £1,200 to
                £2,500+ total. May require consumer unit replacement (£750 to £1,200 additional),
                meter tails upgrade, AC and DC SPDs, and G99 DNO application. Complex installations
                with battery storage add further cost.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Quote solar PV electrical work accurately"
          description="Elec-Mate's quoting app lets you itemise every component of the electrical connection — isolators, RCBO, tails, earthing, metering — with real trade pricing and professional PDF output."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'mcs-certification',
    heading: 'MCS Certification',
    content: (
      <>
        <p>
          The Microgeneration Certification Scheme (MCS) is the quality assurance scheme for
          renewable energy installations in the UK. MCS certification is required for the customer
          to receive Smart Export Guarantee (SEG) payments.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS installer certification</strong> — the installation must be carried out
                by an MCS-certified installer. MCS certification requires specific training, insurance,
                and adherence to the MCS installation standards. The MCS certificate is issued by the
                installer upon completion.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS product certification</strong> — all major components (panels, inverter)
                must be MCS-certified products. This ensures they meet the required performance and
                safety standards.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <GraduationCap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>For electricians</strong> — if you want to carry out complete solar PV
                installations (not just the electrical connection), you need MCS certification. This
                involves completing an MCS-approved training course, having appropriate insurance,
                and registering with an MCS certification body. The investment pays for itself quickly
                given the strong demand for solar PV installations.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'dno-g98-g99',
    heading: 'DNO G98/G99 Notification',
    content: (
      <>
        <p>
          All grid-connected solar PV installations require notification to the Distribution Network
          Operator (DNO). The notification process depends on the size of the installation.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">G98 (Up to 3.68 kW/phase)</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Simple notification — no prior approval needed</li>
              <li>Submit form to DNO within 28 days of commissioning</li>
              <li>Covers most domestic installations (up to 3.68 kW single-phase)</li>
              <li>3-phase: up to 11.04 kW total (3.68 kW per phase)</li>
              <li>Free — no application fee</li>
              <li>No waiting period before energisation</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">G99 (Above 3.68 kW/phase)</h3>
            <ul className="space-y-2 text-white text-sm">
              <li>Formal application required before installation</li>
              <li>DNO must approve before system can be energised</li>
              <li>Processing time: 4 to 8 weeks typical</li>
              <li>May require network study or reinforcement</li>
              <li>Application fee varies by DNO (typically £0 to £300)</li>
              <li>Required for larger domestic and commercial systems</li>
            </ul>
          </div>
        </div>
        <p>
          For electricians and solar installers, submitting the G98/G99 notification is a standard
          part of the commissioning process. Keep records of all DNO notifications and approvals as
          they form part of the installation documentation.
        </p>
      </>
    ),
  },
  {
    id: 'seg-export',
    heading: 'Smart Export Guarantee (SEG) Payments',
    content: (
      <>
        <p>
          The Smart Export Guarantee (SEG) requires licensed electricity suppliers with 150,000+
          customers to offer a tariff for exported electricity from small-scale renewable
          generation. This provides ongoing income for the solar PV system owner.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SEG rates (2026)</strong> — export tariffs range from 3p to 15p per kWh
                depending on the supplier and tariff type. Fixed-rate tariffs provide certainty;
                variable or "agile" tariffs pay more during peak demand periods but less at other
                times.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical annual income</strong> — a 4 kW domestic system generating 3,400 kWh
                per year and exporting approximately 50% earns £50 to £250 per year from SEG
                payments, depending on the tariff rate. The main financial benefit of solar PV comes
                from self-consumption (avoiding buying electricity at 28p+ per kWh) rather than
                export payments.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Requirements</strong> — to receive SEG payments, the installation must be
                MCS-certified and a smart meter must be installed to record export data. The customer
                registers with their chosen SEG supplier after the installation is complete.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Quoting Solar PV Electrical Work',
    content: (
      <>
        <p>
          Solar PV electrical work is a growing market for UK electricians. Whether you are
          subcontracting to solar companies or working towards MCS certification to offer complete
          installations, the electrical connection work is well within a qualified electrician's
          competence.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Survey the Existing Installation</h4>
                <p className="text-white text-sm leading-relaxed">
                  Before quoting, assess the existing meter tails (size and condition), consumer unit
                  (spare ways available), earthing arrangement (TN-C-S, TN-S, or TT), and the cable
                  route from the proposed inverter location to the consumer unit. These factors
                  determine whether additional work (tails upgrade, board replacement, earthing
                  upgrade) is needed.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC and Documentation</h4>
                <p className="text-white text-sm leading-relaxed">
                  An{' '}
                  <SEOInternalLink href="/tools/eic-certificate">
                    Electrical Installation Certificate (EIC)
                  </SEOInternalLink>{' '}
                  must be issued for the new solar PV circuit. Complete it on site using Elec-Mate's
                  EIC app — include all test results, circuit details, and the schedule of items
                  tested. The EIC forms part of the MCS commissioning documentation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Sun className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Consider MCS Certification</h4>
                <p className="text-white text-sm leading-relaxed">
                  If you are regularly carrying out solar PV electrical work, consider getting
                  MCS-certified to offer complete installations. The training investment (typically
                  £1,000 to £2,000) and annual certification fee are quickly recovered through higher
                  job values. MCS-certified electricians can offer the complete package from survey to
                  commissioning.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote and certify solar PV electrical work"
          description="Join 430+ UK electricians using Elec-Mate for quoting, cable sizing, and on-site EIC certification. Everything you need for solar PV electrical connections. 7-day free trial."
          icon={Wrench}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SolarPanelInstallationCostPage() {
  return (
    <GuideTemplate
      title="Solar Panel Electrical Installation Cost UK 2026 | Wiring"
      description="How much does the electrical work cost for solar panel installation in 2026? Complete UK guide covering DC and AC isolators, meter tails, consumer unit connection, earthing, generation meters, MCS certification, G98/G99 DNO notification, and SEG export payments. Focus on the electrician's scope."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Cost Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          Solar Panel Electrical Cost:{' '}
          <span className="text-yellow-400">UK Wiring Guide 2026</span>
        </>
      }
      heroSubtitle="How much does the electrical work cost on a solar PV installation? This guide focuses on the electrician's scope — DC and AC isolators, meter tails, consumer unit connection, earthing, generation meters, and certification. Real costs for the electrical work that sits on top of the panel and inverter price."
      readingTime={15}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Solar Panel Electrical Costs"
      relatedPages={relatedPages}
      ctaHeading="Quote Solar PV Electrical Work with Real Trade Pricing"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for quoting with live trade prices, on-site EIC certificates, and AI-powered cost engineering. 7-day free trial, cancel anytime."
    />
  );
}
