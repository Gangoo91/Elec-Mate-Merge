import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  Calculator,
  FileCheck2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  Wrench,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/home-office-electrical-guide' },
  { label: 'Electrical Load Calculation', href: '/electrical-load-calculation' },
];

const tocItems = [
  { id: 'what-is-load', label: 'What is Electrical Load?' },
  { id: 'diversity-factors', label: 'Diversity Factors (BS 7671 Appendix 1)' },
  { id: 'maximum-demand', label: 'Maximum Demand Calculation' },
  { id: 'cable-sizing', label: 'Cable Sizing from Load Calculations' },
  { id: 'three-phase', label: 'Three-Phase vs Single-Phase' },
  { id: 'commercial', label: 'Commercial and Industrial Load Calculations' },
  { id: 'worked-examples', label: 'Worked Examples' },
  { id: 'faq', label: 'FAQ' },
];

const keyTakeaways = [
  'Electrical load calculation determines the maximum demand on a circuit, distribution board, or supply in order to select correctly rated protective devices, cables, and supply capacity. Under-sizing any of these elements creates a fire and shock risk.',
  'BS 7671:2018+A3:2024 Appendix 1 provides diversity factors for domestic and commercial installations, allowing the calculated maximum demand to be reduced below the simple sum of all connected loads to reflect the realistic simultaneous usage pattern.',
  'The IET On-Site Guide (OSG) provides tabulated diversity factors and simplified methods for domestic load calculations. For commercial and industrial premises, full calculations using first principles are required.',
  'Cable current-carrying capacity (CCC) must be derated for grouping, ambient temperature, and installation method using the correction factors in BS 7671 Appendix 4. The corrected CCC must not be less than the design current of the circuit.',
  'For three-phase supplies, phase balance should be considered during load allocation. Unbalanced loading increases neutral current, which must be accounted for in neutral conductor sizing under BS 7671 Regulation 523.6.',
  'Maximum demand calculations must be reviewed when significant new loads are added to an existing installation — for example, EV chargers, heat pumps, or electric showers. The supply capacity and protective device ratings must be adequate for the revised maximum demand.',
];

const faqs = [
  {
    question: 'How do I calculate the maximum demand for a domestic property?',
    answer:
      "For a typical domestic installation, the IET On-Site Guide (OSG) provides a simplified approach using diversity factors from BS 7671 Appendix 1. The method adds up the connected loads in each category (lighting, socket outlets, cooking appliances, water heating, space heating), applies the appropriate diversity factor to each category, and sums the results to give the assessed maximum demand. For example: lighting (100% of largest + 50% of remaining circuits), socket outlets (100% of largest + 40% of remaining), immersion heater (100%), cooker (10A + 30% of remainder + diversity for second appliance if present). The result is used to select the consumer unit main switch, incoming supply fuse, and supply cable. A typical 3-bed semi with all-electric services typically calculates at 40 to 60A maximum demand.",
  },
  {
    question: 'What are diversity factors and why are they used?',
    answer:
      "Diversity factors reflect the fact that not all electrical loads in an installation operate simultaneously at full power. If every circuit in a house ran at full load at the same moment, the total demand would far exceed the supply capacity — but in practice, loads are switched on and off at different times and rarely all reach full power simultaneously. BS 7671 Appendix 1 provides diversity factors that reduce the design current below the sum of all connected loads. Applying diversity factors allows the designer to select an appropriately sized main protective device and supply cable without the cost and impracticality of sizing for the theoretical worst case. However, diversity factors must not be applied where it is foreseeable that loads will actually run simultaneously — for example, EV chargers with fixed timed charging schedules.",
  },
  {
    question: 'How does cable current-carrying capacity relate to load calculations?',
    answer:
      "Once the maximum demand (design current, Ib) for a circuit has been established, the cable must be selected with a current-carrying capacity (CCC or Iz) at least equal to Ib. However, the tabulated CCC values in BS 7671 Appendix 4 assume installation at 30°C ambient temperature in free air or a single circuit in a standard enclosure. In practice, cables are often grouped with others (reducing CCC due to mutual heating), installed in warmer locations such as roof spaces (requiring derating for ambient temperature above 30°C), or clipped to a thermal insulation surface (requiring derating for partial or full enclosure in insulation). The correction factors Ca (ambient temperature), Cg (grouping), Ci (insulation), and Cc (buried cables) must all be applied. The corrected CCC = tabulated CCC × Ca × Cg × Ci must be not less than Ib.",
  },
  {
    question: 'When do I need to do a full load calculation rather than use the IET OSG simplified method?',
    answer:
      "The IET On-Site Guide simplified diversity method is intended for standard domestic installations. You should perform a full load calculation (using first principles from BS 7671 Appendix 1 and the IET Wiring Regulations) in the following circumstances: commercial or industrial premises of any size; domestic premises with unusually high connected loads (multiple EV chargers, heat pumps, electric showers, large cooking ranges); any premises where the supply authority's cutout fuse is 100A or larger; three-phase domestic installations; or any premises where the designer cannot confirm that the OSG diversity assumptions are realistic for the actual usage pattern. Full calculations should be documented and retained with the design information for the installation.",
  },
  {
    question: 'How do I size a supply for a new EV charger without overloading the existing installation?',
    answer:
      "EV charger load calculation requires knowing the charger rated output (typically 7kW for a single-phase 32A EVSE, or 22kW for three-phase 32A per phase), the existing installation maximum demand, and the available supply capacity. Unlike socket outlet circuits, EV charger circuits should be treated as full demand (no diversity) unless a load management system is installed that actively limits charger output when other loads are high. For a 7kW (32A) single-phase charger: the existing 60A supply may be adequate if the existing maximum demand is calculated at 28A or less. If inadequate, a supply upgrade to 80A or 100A should be requested from the supply company, or a dynamic load management (DLM) system should be installed to share available capacity between the charger and other loads. This must be documented in the installation design and reflected on the EIC.",
  },
  {
    question: 'What is the IET On-Site Guide and where does it cover load calculations?',
    answer:
      "The IET On-Site Guide (OSG) is a practical companion to BS 7671, produced by the Institution of Engineering and Technology. It provides simplified tables and methods for standard domestic and small commercial installations. Load calculation and diversity factor guidance is found in Section 1.2 (maximum demand) and Appendix B (diversity factors). The OSG is updated to reflect each amendment to BS 7671 — ensure you are using the edition corresponding to BS 7671:2018+A3:2024 (the 2024 edition of the OSG). The OSG is available from the IET Shop and is a standard reference for the AM2, City and Guilds 2382, and NVQ Level 3 exams.",
  },
  {
    question: 'How do I balance a three-phase supply across phases for a commercial installation?',
    answer:
      "Three-phase phase balancing is achieved by distributing single-phase loads as evenly as possible across the three phases (L1, L2, L3) during the circuit design stage. The goal is to minimise the neutral current, which is the vector sum of the three phase currents. For perfectly balanced loading, neutral current is zero. For significantly unbalanced loading, the neutral current can approach the phase current, requiring the neutral conductor to be sized accordingly under BS 7671 Regulation 523.6. In practice, exact balance is rarely achievable — aim for phase currents within 10% of each other. Heavily unbalanced single-phase loads (such as all EV chargers on one phase) create significant neutral current and increased losses. Document the phase allocation in the distribution board schedule and on the EIC.",
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/solar-pv-system-sizing',
    title: 'Solar PV System Sizing',
    description: 'How to size a solar PV system for UK homes — kWp, orientation, MCS, G98/G99.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/cable-management-systems',
    title: 'Cable Management Systems',
    description: 'Conduit, trunking, cable tray, and basket tray — fill ratios and BS standards.',
    icon: Wrench,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-observation-codes-explained',
    title: 'EICR Observation Codes Explained',
    description: 'C1, C2, C3 and FI codes — what they mean and what action is required.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord EICR obligations, 5-year inspection cycle, and compliance requirements.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/kitchen-electrical-requirements',
    title: 'Kitchen Electrical Requirements',
    description: 'Socket positions, cooker circuits, and RCD protection in kitchens.',
    icon: Zap,
    category: 'Guide',
  },
];

const sections = [
  {
    id: 'what-is-load',
    heading: 'What is Electrical Load?',
    content: (
      <>
        <p>
          Electrical load is the total power demand placed on a circuit, distribution
          board, or supply by the connected electrical equipment. It is expressed in
          amperes (A) for current, watts (W) or kilowatts (kW) for power, or volt-amperes
          (VA) for apparent power. The design current (Ib) is the current that a circuit
          is expected to carry under normal operating conditions.
        </p>
        <p>
          Load calculations are required when designing a new installation, when modifying
          an existing installation to add significant new loads, and when assessing whether
          an existing installation can safely accommodate additional loads. Incorrectly
          sized circuits, distribution boards, or supply connections are a significant
          cause of electrical fires and equipment damage.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design current (Ib):</strong> The current the circuit is designed
                to carry. Must not exceed the current-carrying capacity (Iz) of the cable
                after applying correction factors.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Maximum demand:</strong> The highest assessed demand that the
                installation will draw simultaneously. Used to size the main switch, supply
                cable, and supply fuse.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Connected load:</strong> The sum of the rated power of all connected
                equipment. The maximum demand is always less than the connected load for
                most installations because not all loads run simultaneously.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'diversity-factors',
    heading: 'Diversity Factors — BS 7671 Appendix 1',
    content: (
      <>
        <p>
          BS 7671:2018+A3:2024 Appendix 1 provides guidance on diversity factors for
          assessing the maximum demand of domestic and commercial installations. Diversity
          factors reduce the calculated maximum demand to reflect realistic simultaneous
          usage, rather than the theoretical worst-case where all loads run simultaneously.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Domestic Diversity Factors (from BS 7671 Appendix 1)</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting:</strong> 66% of total connected lighting load (or
                100% of the largest circuit + 50% of remaining, per IET OSG method)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heating and water heating (thermostatically controlled):</strong>{' '}
                100% of the largest + 50% of remaining
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cooking appliances:</strong> 10A + 30% of connected load above
                10A + 5A if second outlet on cooker control unit
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlet circuits:</strong> 100% of largest + 40%
                of remaining (residential); 100% of total in commercial
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV chargers and heat pumps:</strong> These loads should generally
                be assessed at 100% (no diversity) unless a load management system
                is installed that actively limits output. Always discuss with the client
                and document the assessment basis in the design.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'maximum-demand',
    heading: 'Maximum Demand Calculation',
    content: (
      <>
        <p>
          Maximum demand calculation brings together connected loads and diversity factors
          to establish the design basis for a supply, distribution board, or circuit.
          The result is used to select the main protective device rating and the supply
          cable CCC.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Domestic Example — 3-Bed Semi</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Lighting (8 × 100W equivalent): 66% of 800W = 528W / 230V = 2.3A</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Ring final circuits (2 × 32A rings): 32A + (32A × 40%) = 44.8A (but limited by supply)</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Cooker (7kW): 10A + (30% × 20.4A) = 16.1A</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Immersion heater (3kW): 100% = 13A</span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Assessed maximum demand: approximately 52A — 60A supply adequate</strong></span>
            </li>
          </ul>
        </div>
        <p>
          The actual calculation must be performed using the connected loads specific to
          the property. Document the calculation and retain it with the EIC for the
          installation. Use{' '}
          <SEOAppBridge href="/tools/eicr-certificate" label="Elec-Mate" /> to record
          design details on the EIC.
        </p>
      </>
    ),
  },
  {
    id: 'cable-sizing',
    heading: 'Cable Sizing from Load Calculations',
    content: (
      <>
        <p>
          Once the design current (Ib) for a circuit is established, the cable must be
          selected with sufficient current-carrying capacity (Iz) after applying all
          relevant correction factors. The fundamental relationship is:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <p className="font-mono text-sm text-yellow-300 mb-4">
            Iz (corrected) = tabulated Iz × Ca × Cg × Ci ≥ Ib
          </p>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ca — Ambient temperature correction:</strong> Applied when the
                ambient temperature at the cable location exceeds 30°C. Cables in roof
                spaces in summer can reach 60°C+ ambient — Ca can reduce CCC by 40%
                or more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cg — Grouping correction:</strong> Applied when cables are grouped
                together or run in a common enclosure. For 4 touching cables, Cg = 0.65
                (35% reduction in CCC).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ci — Insulation enclosure correction:</strong> Applied to cables
                fully enclosed in thermal insulation. For full enclosure, Ci = 0.5 for
                some installation methods — a 50% reduction in CCC.
              </span>
            </li>
          </ul>
        </div>
        <p>
          BS 7671 Appendix 4 contains the full tables of CCC and correction factors. The
          IET On-Site Guide provides simplified tables for common installation methods.
          Always check voltage drop (Regulation 525) as well as CCC — the voltage drop
          from supply to load must not exceed 3% for lighting circuits and 5% for other
          circuits under normal operating conditions.
        </p>
      </>
    ),
  },
  {
    id: 'three-phase',
    heading: 'Three-Phase vs Single-Phase Load Calculations',
    content: (
      <>
        <p>
          Three-phase supplies are standard for commercial and industrial premises, and
          are increasingly used in domestic premises with large electrical loads (EV
          charging, large heat pumps). The load calculation approach differs from
          single-phase.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Three-phase balanced load:</strong> For balanced three-phase loads
                (three-phase motors, three-phase heaters), P = √3 × V_L × I × pf, where
                V_L is the line voltage (400V in the UK). A 22kW three-phase EV charger
                draws 22,000 / (√3 × 400 × 1.0) = 31.8A per phase.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Single-phase loads on a three-phase supply:</strong> Each
                single-phase load draws current on one phase only. Phase balance must be
                considered during circuit design — allocate single-phase circuits to
                phases to minimise the difference in loading between L1, L2, and L3.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Neutral conductor sizing:</strong> For balanced three-phase loading
                with no significant harmonic distortion, the neutral current is zero or
                negligible. Where significant single-phase loads cause phase imbalance,
                or where non-linear loads (LEDs, VFDs, switched-mode power supplies) create
                third-harmonic currents, the neutral current may exceed the phase current —
                requiring the neutral to be the same cross-section as the phase conductors
                (BS 7671 Regulation 523.6.3).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'commercial',
    heading: 'Commercial and Industrial Load Calculations',
    content: (
      <>
        <p>
          Commercial and industrial load calculations follow the same principles as domestic
          calculations, but the scale and complexity is greater and the consequences of errors
          more significant. Full first-principles calculations are required — not simplified
          OSG methods.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Distribution board schedules:</strong> Each distribution board
                requires a schedule documenting circuit designation, protective device
                rating, cable size, design current, and diversity. This schedule forms
                part of the EIC documentation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Demand diversity in commercial premises:</strong> BS 7671 Appendix 1
                provides diversity factors for offices and commercial premises. For
                socket outlet circuits, 100% of total connected load is often assumed
                in commercial locations — unlike the 40% diversity applied in domestic.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power factor correction:</strong> Industrial premises with large
                motor loads have a lagging power factor — the apparent power (kVA) exceeds
                the true power (kW). Power factor correction (PFC) capacitors reduce the
                reactive demand and can avoid penalty charges from the supply authority.
                Cable sizing uses apparent current (kVA / V), not true power current.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'worked-examples',
    heading: 'Worked Examples',
    content: (
      <>
        <p>
          The following worked examples illustrate the application of diversity factors
          and load calculation methods for common UK electrical installation scenarios.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Example 1 — EV Charger Added to Existing Installation</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Existing assessed maximum demand: 52A (from previous calculation)</span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>New 7kW EV charger (32A): added at 100% demand (no diversity) = 32A</span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Revised maximum demand: 52A + 32A = 84A — exceeds 60A/80A supply</span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Action:</strong> Apply for 100A supply upgrade from DNO, or install DLM system limiting charger to 28A or less</span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <h3 className="text-lg font-semibold text-white mb-3">Example 2 — Small Office Distribution Board</h3>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Lighting (6 × 2A circuits): 100% = 12A</span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Socket outlet circuits (4 × 32A): 100% of total = 128A (commercial — no diversity)</span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>Air conditioning (3-phase, 12kW): 12,000 / (√3 × 400) = 17.3A per phase</span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span><strong>Assessed maximum demand: 157A — select 160A MCCB, 95mm² supply cable</strong></span>
            </li>
          </ul>
        </div>
        <p>
          See{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained" label="EICR observation codes" />{' '}
          for how undersized cables and protective devices are typically recorded as
          C2 observations on electrical inspection reports.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalLoadCalculationPage() {
  return (
    <GuideTemplate
      title="Electrical Load Calculation — UK Guide 2024 | Diversity Factors, Maximum Demand, Cable Sizing"
      description="How to calculate electrical load for domestic and commercial premises. Diversity factors from BS 7671 Appendix 1, maximum demand calculation, cable sizing, three-phase vs single-phase, and IET On-Site Guide methods with worked examples."
      datePublished="2024-06-01"
      dateModified="2024-11-01"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Technical Guide"
      badgeIcon={Calculator}
      heroTitle={
        <>
          Electrical Load Calculation{' '}
          <span className="text-yellow-400">— UK Electrician Guide</span>
        </>
      }
      heroSubtitle="A complete guide to calculating electrical load for domestic and commercial premises: diversity factors from BS 7671 Appendix 1, maximum demand, cable sizing correction factors, three-phase calculations, and IET On-Site Guide methods with worked examples."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Electrical Load Calculation — Frequently Asked Questions"
      relatedPages={relatedPages}
      ctaHeading="Issue Electrical Installation Certificates with load calculation records"
      ctaSubheading="Generate compliant EIC documents on your phone with Elec-Mate. Start your free 7-day trial."
    />
  );
}
