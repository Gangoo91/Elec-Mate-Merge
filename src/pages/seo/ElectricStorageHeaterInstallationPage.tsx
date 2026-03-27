import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  PoundSterling,
  Settings,
  FileCheck2,
  Home,
  ShieldCheck,
  AlertTriangle,
  TrendingUp,
  Clock,
  Thermometer,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Storage Heater Installation', href: '/electric-storage-heater-installation' },
];

const tocItems = [
  { id: 'modern-vs-old', label: 'Modern vs Old Storage Heaters' },
  { id: 'popular-models', label: 'Popular Models (Dimplex, Elnur)' },
  { id: 'circuit-requirements', label: 'Dedicated Circuit Requirements' },
  { id: 'economy-wiring', label: 'Economy 7/10 Wiring' },
  { id: 'thermostat-wiring', label: 'Thermostat and Charge Control Wiring' },
  { id: 'costs', label: 'Replacement Costs' },
  { id: 'when-storage-heaters', label: 'When Storage Heaters Make Sense' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Modern electric storage heaters (Dimplex Quantum, Elnur Ecombi) are significantly more efficient than older models, using a combination of high-density ceramic bricks, enhanced insulation, and electronic charge and output control to reduce electricity consumption by 20–30%.',
  'Each storage heater requires a dedicated radial circuit with an appropriate MCB — typically 16 A or 20 A — because the high charging current (2–3.4 kW per heater) would overload a shared ring circuit if multiple heaters charged simultaneously.',
  'Economy 7 and Economy 10 tariffs supply two rates on a dual-rate meter: a cheap overnight rate (approximately 10–17p/kWh) during 7 or 10 hours of off-peak periods, and a higher standard rate during peak hours. Storage heaters must be wired to the off-peak supply only.',
  'Modern storage heaters use a separate room thermostat and an electronic charge controller to adjust heat input each night based on room temperature history and user-set comfort levels, eliminating the manual input charge dial of older models.',
  'Replacement costs in 2025 are typically £300–£700 per heater for the unit, plus £200–£450 per heater for installation (dedicated circuit, connection, testing). Whole-house replacements of 4–6 heaters cost £2,500–£5,500 installed.',
  'Storage heaters work best in properties where occupants are at home during the day to benefit from stored heat, where electricity is purchased on Economy 7 or Economy 10, and where alternative heating systems (gas, heat pump) are not viable.',
];

const faqs = [
  {
    question: 'What is the difference between a modern storage heater and an old one?',
    answer:
      'Old storage heaters from the 1970s–1990s use simple clay or chamotte bricks, manual input charge dials (set by hand each evening), manual output controls (a damper that releases heat), and basic thermal insulation. They leak heat during the day regardless of demand and often run out of stored heat by early evening. Modern storage heaters such as the Dimplex Quantum and Elnur Ecombi use high-density ceramic bricks, enhanced polypropylene-encased mineral wool insulation, electronic automatic charge control (assesses previous day temperature history), and precise room thermostat control. They retain heat more effectively and deliver it more intelligently, reducing electricity consumption by 20–30% compared to old models.',
  },
  {
    question: 'Do storage heaters need to be on their own circuit?',
    answer:
      'Yes. Current wiring regulations and good practice require each storage heater to be supplied by its own dedicated radial circuit from the consumer unit. This is because storage heaters draw high charging current (a 1.7 kW heater on a 10 A circuit is fine, but a 3.4 kW heater requires a 16 A circuit). Running multiple heaters on a shared circuit creates overload risk during the charging period. Each circuit should have its own MCB of the appropriate rating and an RCD protecting it.',
  },
  {
    question: 'What is Economy 7 wiring and how does it work?',
    answer:
      'Economy 7 is a dual-rate electricity tariff where a cheaper rate applies for 7 hours overnight (typically 23:00–06:00 or 00:30–07:30 GMT, varying by region and supplier). Properties on Economy 7 have a dual-rate (two-rate) meter with a time switch that activates the off-peak supply during cheap hours. Storage heaters are wired to the off-peak terminals of the meter so they only charge during cheap-rate hours. Standard lighting and socket circuits remain on the standard rate. Economy 10 works similarly but provides 10 off-peak hours split across night, afternoon, and evening periods.',
  },
  {
    question: 'Can I replace old storage heaters myself?',
    answer:
      'Replacing a storage heater and connecting it to an existing dedicated circuit is notifiable work under Part P of the Building Regulations in England and Wales. It must be carried out by a competent person registered with a scheme such as NICEIC or NAPIT, or self-certified by a competent DIYer who notifies the local building control authority. In practice, the weight of storage heaters (up to 100 kg for large models) and the electrical connection requirements mean professional installation is strongly recommended. Attempting to connect storage heaters to non-dedicated circuits or ring mains creates a serious fire risk.',
  },
  {
    question: 'What size MCB do I need for a storage heater?',
    answer:
      'MCB sizing depends on the heater\'s rated input power: a 1.7 kW heater (7.4 A at 230V) needs a 10 A MCB; a 2.5 kW heater (10.9 A) needs a 13 A or 16 A MCB; a 3.4 kW heater (14.8 A) needs a 16 A MCB. All storage heater circuits must be RCD-protected. Use a Type B MCB — storage heaters have resistive loads without high inrush current, so Type B is appropriate and correct.',
  },
  {
    question: 'How much does it cost to run storage heaters?',
    answer:
      'Running costs depend on the Economy 7 off-peak rate and the heater\'s efficiency. A modern 2.5 kW Dimplex Quantum charged for 7 hours on Economy 7 at 13p/kWh uses 17.5 kWh overnight costing approximately £2.28. A typical 4-bedroom house with 5 heaters might spend £300–£550 per month in winter on heating — similar to gas central heating at current gas prices for an older uninsulated house, but potentially more expensive in a well-insulated home. Modern storage heaters on a competitive Economy 7 tariff in a well-insulated property can be competitive with gas.',
  },
  {
    question: 'Can I use storage heaters with a smart meter?',
    answer:
      'Yes. SMETS2 smart meters can manage dual-rate (Economy 7/10) metering electronically without a mechanical time switch. The smart meter applies the off-peak rate during programmed periods and communicates this to the energy supplier for billing. The storage heaters must still be wired to the off-peak supply terminal as before. Some suppliers are launching smart tariffs compatible with modern storage heaters that communicate directly with the heater\'s charge controller via Wi-Fi for optimised charging based on real-time grid conditions.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/infrared-heating-installation',
    title: 'Infrared Heating Installation',
    description: 'Infrared panel heaters — how they work, sizing, wiring, and costs.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote storage heater replacement jobs accurately.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/guides/consumer-unit-replacement',
    title: 'Consumer Unit Replacement',
    description: 'When and how consumer units are replaced for storage heater upgrades.',
    icon: Settings,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'modern-vs-old',
    heading: 'Modern vs Old Storage Heaters',
    content: (
      <>
        <p>
          Storage heaters store heat generated by cheap overnight electricity in ceramic
          or brick cores, releasing it through the day. The technology has existed since
          the 1960s, but modern models are dramatically more efficient and convenient
          than their predecessors.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Old models (pre-2000)</strong> — manual input charge dial (estimated
                by the user each evening), simple damper output control, poor insulation,
                consistent heat leakage through the day. Often too hot in the morning and
                cold by early evening. Heavy (up to 180 kg for large models). No room
                thermostat capability.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Modern models (2010+)</strong> — electronic automatic charge control
                using historical room temperature data to predict overnight charge requirement.
                High-density ceramic brick cores with superior mineral wool insulation. Room
                thermostat input for precise comfort control. App control and voice assistant
                integration on premium models. 20–30% reduction in electricity consumption
                versus equivalent old model.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The Government's ECO4 scheme and the Great British Insulation Scheme can fund
          storage heater replacement for eligible households in homes with an EPC rating
          of D, E, F, or G. An MCS-accredited installer is typically required for funded
          installations.
        </p>
      </>
    ),
  },
  {
    id: 'popular-models',
    heading: 'Popular Models: Dimplex Quantum and Elnur Ecombi',
    content: (
      <>
        <p>
          Two brands dominate the modern UK storage heater replacement market: Dimplex
          and Elnur. Both offer a range of outputs suitable for different room sizes
          and installation scenarios.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dimplex Quantum</strong> — the UK market leader for modern storage
                heaters. Available in 1.5 kW to 3.4 kW input ratings. Features automatic
                charge control, room thermostat input, open window detection, and app control
                via the Dimplex Link hub. Uses a unique double-door damper system for improved
                heat retention. Compatible with Economy 7, Economy 10, and newer smart tariffs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Elnur Ecombi</strong> — the primary competitor to Dimplex Quantum.
                Available in 1.0 kW to 2.5 kW output ratings. Features a built-in room
                thermostat, automatic charge control, and optional app control via a Wi-Fi
                interface. Well-regarded for build quality and competitive trade pricing.
                Particularly popular for social housing and ECO scheme installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heatstore (Glen Dimplex)</strong> — a lower-cost option for budget
                storage heater replacements where the premium features of Quantum are not
                required. Suitable for landlord and student accommodation where simplicity
                and durability are the priority.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'circuit-requirements',
    heading: 'Dedicated Circuit Requirements',
    content: (
      <>
        <p>
          Every storage heater must be supplied by its own dedicated radial circuit from
          the consumer unit. This is a regulatory requirement and a practical necessity
          given the high charging currents involved.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit cable</strong> — 2.5 mm² twin-and-earth (6242Y) is appropriate
                for storage heaters up to 3.4 kW on a radial circuit with appropriate
                installation method. Confirm volt drop is within limits specified in{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671 Appendix 4
                </SEOInternalLink>{' '}
                for the cable run length.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCB rating</strong> — 10 A for heaters up to 2.0 kW; 16 A for heaters
                2.0–3.4 kW. Type B MCB is correct for resistive storage heater loads. Each
                circuit must be protected by a 30 mA RCD in accordance with Regulation 411.3.3
                of BS 7671.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit capacity</strong> — a whole-house storage heater
                replacement involving 4–6 heaters may require a new or upgraded consumer
                unit with sufficient spare ways for both peak and off-peak circuits. An
                RCBO-equipped consumer unit simplifies individual circuit protection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local isolation</strong> — each storage heater should have a local
                means of isolation (double-pole isolator or appropriate switched fused
                connection unit) adjacent to the heater for safe maintenance access.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'economy-wiring',
    heading: 'Economy 7 and Economy 10 Wiring',
    content: (
      <>
        <p>
          Storage heaters only make economic sense when connected to a dual-rate
          (Economy 7 or Economy 10) tariff that provides cheap overnight electricity.
          The wiring arrangement differs from standard domestic circuits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dual-rate meter</strong> — the property must have a dual-rate
                electricity meter (or SMETS2 smart meter configured for Economy 7/10).
                The meter has two sets of terminals: one for the standard rate supply
                (peaks hours) and one for the off-peak supply. Storage heater circuits
                connect to the off-peak terminals only.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Time switch (old meters)</strong> — older Economy 7 meters use
                a mechanical or electronic time switch to switch the off-peak supply on
                during cheap hours. The time switch must be correctly set and periodically
                adjusted for GMT/BST changeover. Modern SMETS2 meters handle this automatically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Off-peak consumer unit</strong> — storage heater circuits may be
                in a separate consumer unit (often labelled "off-peak" or "storage heaters")
                fed from the off-peak meter terminals, or in a split consumer unit with
                separate off-peak and peak busbars. The configuration varies by property age.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hot water immersion</strong> — Economy 7/10 properties often also
                have an immersion heater on the off-peak supply. This is wired in the same
                way as storage heaters — dedicated circuit, off-peak meter terminal. Modern
                smart immersion controllers (Eddi, Mixergy) can also divert solar surplus
                to the immersion.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'thermostat-wiring',
    heading: 'Thermostat and Charge Control Wiring',
    content: (
      <>
        <p>
          Modern storage heaters require correct connection of both the power supply
          and the control wiring for the automatic charge control and room thermostat
          functions to operate correctly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dimplex Quantum wiring</strong> — the Quantum requires a three-wire
                connection: live (L) and neutral (N) from the off-peak supply for the heating
                element, plus a permanent live (PL) from the peak supply for the electronic
                controller. Without the permanent live, the controller cannot operate the room
                thermostat function or communicate with the Dimplex Link hub. Check Dimplex
                installation instructions for the specific wiring diagram for each model.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Elnur Ecombi wiring</strong> — similar three-wire arrangement. The
                Ecombi's built-in room thermostat sensor is in the heater casing and does not
                require external sensor wiring. Some installers add an external Elnur thermostat
                for greater room temperature accuracy in larger rooms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Legacy two-wire heaters</strong> — older storage heaters use only L
                and N, with no electronic controller. The input charge is set manually each
                evening using a dial from 0–6 or 0–10. If replacing these with modern heaters,
                the installer must add the permanent live connection back to the consumer unit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Replacement Costs (2025)',
    content: (
      <>
        <p>
          Storage heater replacement costs vary by heater size, brand, and whether new
          dedicated circuits are required. The following figures represent typical 2025
          installed prices in the UK.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heater unit only (supply)</strong> — Dimplex Quantum 2.55 kW: £350–£450;
                Elnur Ecombi 2.0 kW output: £300–£380. Prices vary by distributor and are
                subject to change.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation (per heater, existing circuit)</strong> — £150–£250 per
                heater to remove old unit, install new heater, connect to existing dedicated
                circuit, and test.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation (per heater, new circuit)</strong> — £250–£450 per heater
                when a new dedicated radial circuit must be run from the consumer unit. Longer
                cable runs, ceiling voids, or intermediate floors increase cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Whole-house replacement (4–6 heaters)</strong> — £2,500–£5,500 installed
                for a typical 3–4 bedroom all-electric property, including new consumer unit
                if required and all circuits.
              </span>
            </li>
          </ul>
        </div>
        <p>
          ECO4 scheme funding may cover all or a significant portion of storage heater
          replacement costs for eligible households. Installers must be TrustMark registered
          and Pas 2030 or Pas 2035 compliant to carry out funded work.
        </p>
      </>
    ),
  },
  {
    id: 'when-storage-heaters',
    heading: 'When Storage Heaters Make Sense',
    content: (
      <>
        <p>
          Storage heaters are not always the best heating choice, but they suit specific
          property and lifestyle profiles well.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Properties without gas supply</strong> — storage heaters are a
                practical alternative to oil, LPG, or electric panel heaters where gas
                is unavailable and a heat pump is not viable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>All-day occupancy homes</strong> — retired occupants or those working
                from home benefit from daytime heat release. Properties where occupants are
                absent all day gain little from storage heaters because most heat is released
                when no one is in.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Competitive Economy 7 tariff</strong> — the off-peak rate must be
                significantly lower than the peak rate to justify storage heaters. Check
                current Economy 7 and Economy 10 tariff availability from Octopus Energy,
                EDF, and British Gas before recommending storage heaters to a customer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rental properties and social housing</strong> — storage heaters
                require no annual service or gas safety certificate, making them low
                maintenance for landlords. Modern models have 2–3 year warranties and
                10+ year lifespans.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Storage Heater Replacement Work',
    content: (
      <>
        <p>
          Storage heater replacement is steady domestic work that electricians encounter
          throughout the year, with peaks in autumn before the heating season. ECO4
          funded work provides additional volume for TrustMark-registered businesses.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificate on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-certificates">
                    Elec-Mate certificates app
                  </SEOInternalLink>{' '}
                  to complete Minor Works Certificates or Electrical Installation Certificates
                  for storage heater replacements on your phone. Clients receive their
                  Building Regulations compliance documents before you leave.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Consumer Unit Upgrades Too</h4>
                <p className="text-white text-sm leading-relaxed">
                  Storage heater replacement often reveals inadequate consumer units with
                  insufficient spare ways or no RCD protection. Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to present a combined storage heater and consumer unit upgrade quote that
                  secures the full job.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage storage heater installations with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site Minor Works Certificates, EIC certificates, and professional quoting. 7-day free trial, cancel anytime."
          icon={Zap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricStorageHeaterInstallationPage() {
  return (
    <GuideTemplate
      title="Electric Storage Heater Installation UK | Modern Storage Heaters"
      description="Complete guide to electric storage heater installation in the UK. Modern vs old heaters (Dimplex Quantum, Elnur Ecombi), dedicated circuit requirements, Economy 7/10 wiring, thermostat and charge control wiring, replacement costs (£300–£700 per heater + installation), and when storage heaters make sense."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Heating Installation Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Electric Storage Heater Installation UK:{' '}
          <span className="text-yellow-400">Modern Storage Heaters</span>
        </>
      }
      heroSubtitle="A complete guide to electric storage heater installation in the UK — modern models versus old, Dimplex Quantum and Elnur Ecombi, dedicated circuit requirements, Economy 7 and Economy 10 dual-rate wiring, thermostat and charge control connections, and 2025 replacement costs."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Storage Heater Installation"
      relatedPages={relatedPages}
      ctaHeading="Certificate Storage Heater Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for Minor Works Certificates, EIC certificates, and professional quoting. 7-day free trial, cancel anytime."
    />
  );
}
