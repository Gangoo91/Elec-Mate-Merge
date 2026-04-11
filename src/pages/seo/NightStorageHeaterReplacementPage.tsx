import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  Thermometer,
  PoundSterling,
  AlertTriangle,
  CheckCircle2,
  FileCheck2,
  ClipboardCheck,
  ShieldCheck,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'Night Storage Heater Replacement', href: '/night-storage-heater-replacement' },
];

const tocItems = [
  { id: 'why-replace', label: 'Why Replace Night Storage Heaters?' },
  { id: 'modern-alternatives', label: 'Modern Alternatives' },
  { id: 'economy-7-implications', label: 'Economy 7 Tariff Implications' },
  { id: 'lot-20-regulations', label: 'Lot 20 Regulations' },
  { id: 'wiring-requirements', label: 'Wiring Requirements (BS 7671)' },
  { id: 'costs', label: 'Typical Replacement Costs' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Old night storage heaters manufactured before 2018 are likely non-compliant with the Lot 20 ErP Directive, which sets minimum energy performance standards for local space heaters. Replacement with a compliant model is required if the unit is being sold or supplied new.',
  'Each storage heater circuit typically runs on a dedicated radial circuit — commonly 2.5mm\u00b2 cable on a 16A MCB for heaters up to 3kW, or 4mm\u00b2 on a 20A MCB for larger units. Always confirm the heater rating plate before sizing cable and protection.',
  'Switching from night storage heaters to panel heaters or infrared heating eliminates the need for a dual-rate Economy 7 tariff and the associated off-peak controller. A full electrical assessment of the existing circuits is essential before like-for-like replacement.',
  'Air source heat pumps (ASHPs) require a dedicated supply from the consumer unit, typically on a 32A or 40A circuit with appropriate cable sizing. Part P notification is required for new circuits in England.',
  'Infrared panel heaters operate at lower wattages (typically 350W to 1,000W) and can often be connected to existing socket circuits or fused spurs, simplifying installation and reducing rewiring costs.',
];

const faqs = [
  {
    question: 'Do I need an electrician to replace night storage heaters?',
    answer:
      'Yes. Replacing a night storage heater with a different type of heater — particularly where it involves modifying or extending existing circuits, or adding new circuits — is notifiable work under Part P of the Building Regulations in England. Even a direct like-for-like swap requires the circuit to be inspected to confirm it is suitable for the new heater. A registered electrician (NICEIC, NAPIT, or ELECSA) can self-certify the work and notify building control automatically. If you hire someone who is not registered, you or they must notify building control before starting work.',
  },
  {
    question: 'Can I keep my Economy 7 tariff if I replace storage heaters?',
    answer:
      'You can keep an Economy 7 tariff, but it may no longer be cost-effective once you remove night storage heaters. Economy 7 provides off-peak electricity at a cheaper rate (typically overnight between 00:00 and 07:00), with a higher day rate. Night storage heaters charge overnight and release heat during the day, making this tariff advantageous. Modern panel heaters, infrared heaters, or heat pumps do not charge overnight, so you would pay the higher day rate. A whole-house energy review is advisable before changing tariff.',
  },
  {
    question: 'What is Lot 20 and how does it affect storage heater replacement?',
    answer:
      'Lot 20 is the EU Energy-related Products (ErP) Directive regulation (now retained in UK law as the Ecodesign for Energy-Related Products Regulations 2021) that applies to local space heaters, including electric storage heaters. Since 1 January 2018, new storage heaters placed on the UK market must meet minimum energy efficiency requirements including electronic thermostats, open window detection, and adaptive charge control. Old heaters without these features cannot be sold as new. If you are replacing a pre-2018 heater, you must install a Lot 20-compliant replacement or choose a different heating type.',
  },
  {
    question: 'What is the cheapest replacement for night storage heaters?',
    answer:
      'Electric panel heaters are typically the cheapest option to install (from \u00a3150 to \u00a3500 per heater including fitting) and can often connect to existing circuits or fused spurs. However, running costs depend on your electricity tariff. Infrared panel heaters are also relatively low-cost to install and can be more energy-efficient in well-insulated rooms, as they heat objects rather than air. Air source heat pumps have significantly higher installation costs (\u00a38,000 to \u00a315,000 for a full system) but achieve a coefficient of performance (CoP) of 2.5 to 4, meaning they produce 2.5 to 4 units of heat for every unit of electricity consumed.',
  },
  {
    question: 'What size cable do I need for a replacement storage heater?',
    answer:
      'Cable sizing depends on the rated power of the new heater and the length of the circuit. For a 2kW heater, 2.5mm\u00b2 twin and earth cable on a 16A MCB is standard. For a 3kW heater, 2.5mm\u00b2 on a 16A MCB is also appropriate (2,990W at 230V = approximately 13A). Heaters over 3kW should use 4mm\u00b2 cable on a 20A MCB. Always calculate the design current using the heater rating plate and apply BS 7671 Chapter 43 for overcurrent protection and Chapter 52 for cable selection and erection. Do not assume existing storage heater cables are suitable for a different load.',
  },
  {
    question: 'Do infrared panels need their own circuit?',
    answer:
      'Not necessarily. Smaller infrared panels (up to 600W) can be connected to a standard 13A fused spur from the ring main. Larger panels or multiple panels in a single room may benefit from a dedicated radial circuit to avoid overloading the ring. Infrared panels must be positioned in accordance with the manufacturer instructions and BS 7671 Chapter 42 regarding protection against thermal effects. They must not be installed above baths, showers, or within bathroom zones without specific IP-rated certification.',
  },
  {
    question: 'Does replacing night storage heaters increase my electricity bill?',
    answer:
      'It depends on what you replace them with and your tariff. Night storage heaters are 100% efficient (all electricity is converted to heat), but they store heat at the wrong time and release it at the wrong time. A modern Lot 20-compliant storage heater with better controls can reduce consumption by 15 to 30%. Switching to a heat pump can dramatically reduce heating bills if properly sized for the property. Panel heaters and infrared panels are also 100% efficient but have no storage benefit, so you pay the higher day rate for all heat used.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/electric-boiler-installation',
    title: 'Electric Boiler Installation Guide',
    description: 'Sizing, wiring requirements, and costs for electric central heating boilers.',
    icon: Thermometer,
    category: 'Guide',
  },
  {
    href: '/fused-spur-installation-guide',
    title: 'Fused Spur Installation Guide',
    description: 'When and how to install fused connection units for fixed appliances.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord obligations for electrical inspections in rented properties.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: ClipboardCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning and instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'why-replace',
    heading: 'Why Replace Night Storage Heaters?',
    content: (
      <>
        <p>
          Night storage heaters were the dominant form of electric heating in UK homes built between
          the 1960s and 1990s. They work by storing heat in ceramic bricks during off-peak hours
          (typically overnight on an Economy 7 tariff) and releasing that heat gradually during the
          day. While this approach made sense when off-peak electricity was substantially cheaper,
          several factors have changed the economics significantly.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Poor controllability</strong> — older storage heaters have limited ability
                to respond to changing weather or occupancy. Heat stored overnight is released
                throughout the day regardless of whether the property is occupied, wasting energy
                and money.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lot 20 non-compliance</strong> — heaters manufactured before January 2018 do
                not meet the Ecodesign minimum performance standards. Lot 20 requires electronic
                thermostats, open window detection, and adaptive charge control as minimum standards
                for new heaters placed on the market.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Narrowing Economy 7 price differential</strong> — the gap between Economy 7
                day and night rates has narrowed over recent years. The benefit of off-peak charging
                is less pronounced than it was in the 1980s, making the storage heater proposition
                less attractive financially.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat pump compatibility</strong> — properties heated by storage heaters are
                increasingly prime candidates for air source heat pump (ASHP) retrofits,
                particularly following the introduction of the Boiler Upgrade Scheme (BUS) grant of
                up to \u00a37,500 for ASHPs in England and Wales.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For electricians, storage heater replacements are a growing area of domestic work.
          Understanding the wiring implications, tariff considerations, and Lot 20 requirements is
          essential for providing accurate advice and completing compliant installations. Use the{' '}
          <SEOAppBridge href="/tools/eic-certificate" label="EIC Certificate tool" /> to generate an
          Electrical Installation Certificate for any new heating circuit.
        </p>
      </>
    ),
  },
  {
    id: 'modern-alternatives',
    heading: 'Modern Alternatives to Night Storage Heaters',
    content: (
      <>
        <p>
          There are three main categories of modern electric heating that can replace night storage
          heaters, each with different installation requirements, running costs, and suitability
          depending on the property type and insulation standard.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-4">
            1. Lot 20-Compliant Storage Heaters
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Direct replacement for existing heaters — same circuit, same connection point.
                Modern units include electronic thermostats, open window detection, and 24/7
                programming. Brands include Dimplex Quantum, Elnur, and Creda.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Best suited to properties with existing Economy 7 wiring and meter. Minimal
                electrical work required. Cost: \u00a3400 to \u00a3900 per heater supplied and
                fitted.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-4">2. Electric Panel Heaters</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Convection or fan-assisted heaters rated typically 750W to 2,500W. No off-peak
                charging — heat on demand only. Can connect to existing spur circuits or fused
                connection units. Wi-Fi or smart thermostat models offer good control.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Economy 7 tariff no longer required. Single-rate tariff may be more cost-effective.
                Supply cost: \u00a3150 to \u00a3500 per unit. Installation: \u00a350 to \u00a3150
                per heater if connecting to existing circuits.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-4">3. Infrared Panel Heaters</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Radiant heat panels rated typically 350W to 1,000W. Heat objects and people directly
                rather than the air, making them more efficient in poorly insulated rooms. Can be
                ceiling or wall mounted. Suitable for most domestic circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Installation is straightforward — most panels connect via a standard 13A plug or
                fused spur. Supply cost: \u00a3200 to \u00a3600 per panel. No Off-Peak tariff
                needed.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-4">4. Air Source Heat Pumps</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Whole-house heating solution. Requires wet underfloor heating or suitable radiators
                (low-flow temperature compatible). Typical system cost: \u00a38,000 to \u00a315,000.
                Boiler Upgrade Scheme grant of \u00a37,500 available in England and Wales.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Requires a dedicated electrical supply — typically a 32A or 40A radial circuit with
                appropriate cable sizing per BS 7671. Part P notification required. MCS
                certification needed to access grant funding.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'economy-7-implications',
    heading: 'Economy 7 Tariff Implications',
    content: (
      <>
        <p>
          Economy 7 is a dual-rate electricity tariff offering cheaper overnight electricity
          (typically between midnight and 07:00, though the exact hours vary by supplier and region)
          with a higher day rate. The tariff requires a dual-rate meter — either an older
          electromechanical type or a modern smart meter configured for two rates.
        </p>
        <p>
          Night storage heaters are designed specifically to exploit this tariff by charging during
          the cheap-rate period. When storage heaters are removed or replaced with on-demand
          heaters, the Economy 7 arrangement may no longer be beneficial because:
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Higher day rate applies to all on-demand heating</strong> — panel heaters
                and infrared heaters operate during the day at the higher Economy 7 day rate, which
                is typically 20 to 30% more expensive than a standard single-rate tariff for the
                same consumption.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Switching tariff requires a meter change</strong> — if moving from Economy 7
                to a single-rate tariff, the supplier may need to reconfigure the smart meter or
                replace an older dual-rate meter. This is arranged through the energy supplier and
                is usually free.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Economy 7 remains beneficial for electric vehicle charging</strong> — if the
                property has or plans to install an electric vehicle charge point, Economy 7
                overnight cheap rates may still provide value for overnight EV charging even without
                storage heaters.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dual-rate wiring may be present</strong> — properties with storage heaters
                often have a separate Economy 7 consumer unit or a dual-tariff wiring arrangement
                with a separate off-peak circuit. When replacing heaters, check whether this
                dedicated wiring can be repurposed or must be decommissioned.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'lot-20-regulations',
    heading: 'Lot 20 Regulations Explained',
    content: (
      <>
        <p>
          The Lot 20 Ecodesign requirements derive from EU Commission Regulation (EU) 2015/1188 and
          have been retained in UK law through the Ecodesign for Energy-Related Products and Energy
          Information Regulations 2021. They set minimum energy performance standards for local
          space heaters, a category that includes electric storage heaters, panel heaters, and
          infrared heaters placed on the UK market on or after 1 January 2018.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">
            Minimum Requirements for Electric Heaters (Lot 20)
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electronic thermostat</strong> with minimum 1\u00b0C precision
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Open window detection</strong> — heater reduces output when a rapid
                temperature drop is detected (window opened)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Adaptive start</strong> — heater learns the thermal characteristics of the
                room and adjusts heat-up timing
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Weekly programming</strong> — 24/7 time programming as a minimum
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Presence detection capability</strong> (for heaters above certain wattage
                thresholds)
              </span>
            </li>
          </ul>
        </div>
        <p>
          Pre-2018 storage heaters — particularly older manual dial-controlled units — do not meet
          these requirements. They can still legally be used in a property, but cannot be supplied
          as new. When a landlord or homeowner asks about replacement, installing a Lot 20-compliant
          model is the appropriate recommendation.
        </p>
        <p>
          Electricians are not required to verify Lot 20 compliance as part of an electrical
          installation, but advising customers on this regulation demonstrates professional
          competence and protects against future complaints.
        </p>
      </>
    ),
  },
  {
    id: 'wiring-requirements',
    heading: 'Wiring Requirements Under BS 7671',
    content: (
      <>
        <p>
          Fixed electric heating installations must comply with BS 7671:2018+A3:2024 (the Wiring
          Regulations). The key requirements for storage heater and replacement heating circuits are
          covered in Part 5 (Selection and Erection of Equipment) and Chapter 43 (Protection Against
          Overcurrent).
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">
            Circuit Sizing for Fixed Heating
          </h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to 2kW (8.7A):</strong> 2.5mm\u00b2 twin and earth cable, 16A MCB (Type
                B)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to 3kW (13A):</strong> 2.5mm\u00b2 twin and earth cable, 16A MCB (Type B)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Up to 3.68kW (16A):</strong> 2.5mm\u00b2 twin and earth cable, 20A MCB (Type
                B)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3.68kW to 4.6kW (20A):</strong> 4mm\u00b2 twin and earth cable, 20A MCB
                (Type B)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Over 4.6kW:</strong> 6mm\u00b2 or larger — calculate per BS 7671 Chapter 43
                based on design current, installation method, and grouping derating factors
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD protection</strong> — fixed electric heaters installed in domestic
                premises must have 30mA RCD protection under Regulation 411.3.3. This applies to
                heaters in all rooms including bedrooms and living rooms.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Local isolation</strong> — each fixed heater requires a means of isolation
                accessible without the use of a tool (Regulation 537.2). A double-pole fused spur
                with neon indicator is the standard solution.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P notification</strong> — new circuits for fixed heating in dwellings
                in England are notifiable under Part P of the Building Regulations. Use a registered
                competent person scheme (NICEIC, NAPIT, ELECSA) for self-certification.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Before replacing storage heaters, always test the existing circuit: verify the earth loop
          impedance, insulation resistance, and RCD operation time. Record findings on an{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained" label="EICR" /> or minor
          works certificate as appropriate.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Typical Replacement Costs',
    content: (
      <>
        <p>
          Replacement costs vary significantly depending on the heating type chosen, the number of
          heaters, whether existing circuits are suitable, and whether any consumer unit upgrades
          are required.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Like-for-like Lot 20 storage heater replacement:</strong> \u00a3450 to
                \u00a3950 per unit (supply and fit). No new circuits required if existing wiring is
                satisfactory.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric panel heaters:</strong> \u00a3200 to \u00a3650 per heater (supply
                and fit). May require new circuits or fused spurs. Additional cost if Economy 7
                wiring needs decommissioning.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Infrared panel heaters:</strong> \u00a3250 to \u00a3700 per panel (supply
                and fit). Wiring is typically simpler. Ceiling-mounted panels may require more
                labour for cable routing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Air source heat pump (full system):</strong> \u00a38,000 to \u00a315,000
                installed. Boiler Upgrade Scheme grant of \u00a37,500 reduces net cost. MCS
                certification required to claim grant.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit upgrade (if required):</strong> \u00a3500 to \u00a31,200 for a
                dual RCD or RCBO consumer unit. Often required where the existing board lacks
                sufficient ways or adequate RCD protection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians — Using Elec-Mate for Storage Heater Jobs',
    content: (
      <>
        <p>
          Storage heater replacement jobs typically involve an initial inspection, a minor works or
          full installation certificate, and sometimes a consumer unit upgrade. Elec-Mate provides
          the tools you need to manage the paperwork efficiently on-site.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge
                  href="/tools/eic-certificate"
                  label="Electrical Installation Certificate"
                />{' '}
                — generate compliant EICs for new heating circuits with instant PDF export.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/eicr-certificate" label="EICR Certificate" /> — document
                the condition of existing storage heater circuits before replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <SEOAppBridge href="/tools/minor-works" label="Minor Works Certificate" /> — issue
                minor works certificates for small additions like fused spurs for panel heaters.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function NightStorageHeaterReplacementPage() {
  return (
    <GuideTemplate
      title="Night Storage Heater Replacement — Complete UK Electrician Guide 2024"
      description="Full guide to replacing night storage heaters: Lot 20 regulations, wiring requirements under BS 7671, Economy 7 implications, and costs for panel heaters, infrared panels, and heat pumps."
      datePublished="2024-06-01"
      dateModified="2026-04-11"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Heating Guide"
      badgeIcon={Thermometer}
      heroTitle={
        <>
          Night Storage Heater Replacement{' '}
          <span className="text-yellow-400">— Complete UK Guide</span>
        </>
      }
      heroSubtitle="Everything electricians and homeowners need to know about replacing old night storage heaters: Lot 20 compliance, wiring under BS 7671, Economy 7 tariff implications, and realistic costs for modern alternatives."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Night Storage Heater Replacement — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Certificate storage heater installations instantly"
      ctaSubheading="Generate compliant EICs and minor works certificates on-site with Elec-Mate."
    />
  );
}
