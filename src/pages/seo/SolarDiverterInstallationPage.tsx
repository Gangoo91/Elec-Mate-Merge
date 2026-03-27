import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Zap,
  Sun,
  PoundSterling,
  ShieldCheck,
  ClipboardCheck,
  FileCheck2,
  AlertTriangle,
  Thermometer,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Solar Guides', href: '/solar-pv-system-design' },
  { label: 'Solar Diverter Installation', href: '/solar-diverter-installation' },
];

const tocItems = [
  { id: 'what-is-a-diverter', label: 'What is a Solar Diverter?' },
  { id: 'popular-brands', label: 'Popular Diverter Brands' },
  { id: 'installation-requirements', label: 'Installation Requirements' },
  { id: 'costs', label: 'Costs and Savings' },
  { id: 'wiring', label: 'Wiring Considerations' },
  { id: 'vs-battery', label: 'Diverter vs Battery Storage' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A solar diverter (also called an immersion diverter or solar PV diverter) monitors the property\'s export to the grid and automatically redirects surplus solar electricity to heat water via an immersion heater, rather than exporting at a low SEG rate.',
  'Popular UK diverter brands include the iBoost (Marlec Engineering), Eddi (myenergi), and Immersun. Each monitors CT clamps and varies the power sent to the immersion heater in real time.',
  'A solar diverter requires an existing electric immersion heater in a hot water cylinder. Properties with combi boilers (no cylinder) cannot use a diverter. Properties with heat pumps can integrate a diverter but need careful configuration.',
  'Unit costs range from £200–£400 for the diverter device, plus installation labour of £100–£200. Total installed cost is typically £300–£600 — significantly cheaper than battery storage.',
  'A diverter can save a typical UK household £100–£250/year on hot water heating bills by using otherwise-exported solar electricity instead of gas or grid electricity for water heating.',
  'Installation falls under Part P of the building regulations and must be notified via a competent person scheme. The work involves connecting the diverter CT clamp to the consumer unit tails and wiring the output to the immersion heater.',
];

const faqs = [
  {
    question: 'What is a solar diverter and how does it work?',
    answer:
      'A solar diverter is a device that monitors the electricity flowing between your solar panels and the grid using a CT (Current Transformer) clamp installed on the main supply cable. When the solar system is generating more electricity than the household is using — and the surplus would otherwise be exported — the diverter automatically activates the immersion heater in the hot water cylinder, sending the surplus power there instead. The diverter uses phase-angle control (proportional power control) to vary the power sent to the immersion heater in real time, matching the available surplus precisely and minimising grid import and export.',
  },
  {
    question: 'Will a solar diverter work with my existing solar panels?',
    answer:
      'Yes — solar diverters are compatible with virtually any grid-connected solar PV system regardless of inverter brand, age, or type. They do not interfere with the solar inverter or the DNO connection. The diverter reads the CT clamp signal rather than communicating directly with the inverter. The only hardware requirement is an electric immersion heater in a hot water cylinder. If your property has a combi boiler with no cylinder, a diverter cannot be used without first installing a hot water cylinder and immersion heater.',
  },
  {
    question: 'How much can I save with a solar diverter?',
    answer:
      'Savings depend on the size of your solar system, your household\'s hot water usage, and the cost of the energy you would otherwise use to heat water. A typical UK household spending £250–£400/year heating water with gas can save £100–£200 of that by heating water with diverted solar electricity instead. Households with electric immersion heaters as their primary water heating source (and therefore paying higher electricity rates for hot water) can save more — £150–£300/year. The diverter pays back its installation cost (typically £300–£600) in 2–4 years.',
  },
  {
    question: 'Does a solar diverter affect my Smart Export Guarantee payments?',
    answer:
      'Yes — but beneficially. The diverter reduces your export to the grid, which reduces your SEG income slightly. However, the value of the electricity used to heat water (replacing gas or grid electricity) is typically worth more than the SEG export rate (3–15p/kWh). The avoided cost of heating water by gas or electricity (at 24p+/kWh) is substantially higher than the SEG rate you would receive for exporting the same electricity. For this reason, using a diverter to heat water is almost always a better use of surplus solar electricity than exporting it at the current SEG rates.',
  },
  {
    question: 'What is the difference between the iBoost, Eddi, and Immersun?',
    answer:
      'All three devices perform the same fundamental function — diverting surplus solar electricity to an immersion heater. The key differences are: iBoost (Marlec) — established market leader, simple push-button interface, wireless sender unit reads export clamp and transmits to the main unit, optional iBoost Buddy display shows real-time status. Eddi (myenergi) — the most feature-rich option, integrates with myenergi\'s Zappi EV charger and Harvi CT clamp, supports two separate heating loads (e.g., immersion and underfloor heating), excellent monitoring app. Immersun — similar functionality to iBoost, good value, slightly simpler installation in some configurations. For installations where the customer already has a Zappi EV charger, the Eddi is the natural choice for ecosystem compatibility.',
  },
  {
    question: 'Does a solar diverter need to be installed by a qualified electrician?',
    answer:
      'Yes. Solar diverter installation falls under Part P of the Building Regulations (electrical safety in dwellings) and must either be notified to the local authority or carried out by a registered competent person who can self-certify under a scheme such as NICEIC, NAPIT, or ELECSA. The work involves connecting to the consumer unit (CT clamp on the main tails) and wiring the diverter output to the immersion heater. An Electrical Installation Certificate (EIC) or Minor Works Certificate should be issued on completion, and an Electrical Installation Condition Report (EICR) of the existing installation may be required.',
  },
  {
    question: 'Can I use a solar diverter with a heat pump?',
    answer:
      'It depends on the heat pump configuration. Air source heat pumps with an integrated hot water cylinder (such as the Samsung EHS or Vaillant arotherm) typically heat domestic hot water as part of their normal operation — a diverter cannot directly control a heat pump compressor. However, some heat pump systems include an electric immersion heater as a backup or boost element, and the diverter can be configured to control this immersion heater. Additionally, myenergi\'s Eddi can send control signals to some heat pumps via relay or Modbus to request additional hot water heating when surplus solar is available. Seek installer advice specific to your heat pump model.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/solar-pv-system-design',
    title: 'Solar PV System Design',
    description: 'System sizing, string design, inverter types, DC cable sizing, and G99/G98 notification.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/solar-battery-storage-installation',
    title: 'Solar Battery Storage Installation',
    description: 'AC-coupled vs DC-coupled storage, popular batteries, costs, and MCS requirements.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/solar-pv-grants',
    title: 'Solar Panel Grants UK 2025',
    description: 'Smart Export Guarantee, 0% VAT, ECO4, and Home Energy Scotland loan explained.',
    icon: PoundSterling,
    category: 'Guide',
  },
  {
    href: '/mcs-certification-guide',
    title: 'MCS Certification Guide',
    description: 'How to become MCS certified, costs, annual audit, and MCS 001 standard.',
    icon: ShieldCheck,
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
    id: 'what-is-a-diverter',
    heading: 'What is a Solar Diverter?',
    content: (
      <>
        <p>
          A solar diverter — also known as a solar PV diverter, immersion diverter, or solar
          water heater controller — is a device that maximises the value of a solar PV system
          by using surplus generation to heat domestic hot water, rather than allowing that
          electricity to be exported to the grid at a low Smart Export Guarantee rate.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How it monitors surplus generation:</strong> A CT (Current Transformer)
                clamp is installed on the main supply cable at the consumer unit. The diverter
                continuously reads the current direction and magnitude — when the reading indicates
                net export (solar generating more than the household is consuming), the diverter
                activates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Proportional power control:</strong> Unlike a simple on/off switch,
                a solar diverter uses phase-angle control to vary the power delivered to the
                immersion heater in real time — matching the available surplus precisely. This
                means that if 600 W is available, the diverter sends 600 W to the immersion
                heater, leaving the household's import/export at near-zero.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hot water cylinder requirement:</strong> A solar diverter requires a
                vented or unvented hot water cylinder with an electric immersion heater (typically
                a 3 kW element). Properties with combi boilers (which heat water on demand with
                no storage cylinder) cannot use a diverter without first installing a cylinder.
              </span>
            </li>
          </ul>
        </div>
        <p>
          During a typical UK summer day, a 4 kWp solar system with a two-person household will
          generate surplus electricity for 4–6 hours. A solar diverter can heat a full 200-litre
          hot water cylinder using this surplus — providing free hot water for the day with no
          gas or grid electricity required.
        </p>
      </>
    ),
  },
  {
    id: 'popular-brands',
    heading: 'Popular Solar Diverter Brands in the UK',
    content: (
      <>
        <p>
          Three brands dominate the UK solar diverter market, each with a strong track record
          and nationwide installer support:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>iBoost (Marlec Engineering) — £230–£290:</strong> The original UK market
                leader. Wireless design with a separate sender unit that clips onto the export
                cable, communicating with the main iBoost unit positioned near the immersion heater
                (up to 30 m range). Simple LED display shows status. The iBoost Buddy (£50 extra)
                provides a wall-mounted display showing live data including surplus diverted,
                solar generation, and energy saved. Sold through electrical wholesalers nationwide.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Eddi (myenergi) — £290–£350:</strong> The most feature-rich diverter,
                from the Lincolnshire-based manufacturer of the Zappi EV charger and Libbi battery.
                Full app monitoring (myenergi app), support for two separate heating outputs
                (e.g., immersion + underfloor heating), integration with Harvi CT clamp for
                wireless monitoring, and compatibility with the rest of the myenergi ecosystem.
                The natural choice for customers who already have or are considering a Zappi
                EV charger.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Immersun (A Heat Ltd) — £200–£260:</strong> A cost-effective alternative
                to the iBoost, popular with budget-conscious customers. Similar functionality
                including proportional power control, boost button, and real-time monitoring.
                Wired CT clamp configuration rather than wireless, which some installers prefer
                for reliability in properties with signal interference.
              </span>
            </li>
          </ul>
        </div>
        <p>
          All three brands are available through electrical wholesalers. The iBoost and Eddi are
          the most widely sold in the UK market. For commercial or industrial hot water diversion,
          higher-power variants are available from several manufacturers.
        </p>
      </>
    ),
  },
  {
    id: 'installation-requirements',
    heading: 'Installation Requirements',
    content: (
      <>
        <p>
          Solar diverter installation is an electrical installation task that must comply with
          BS 7671 and Part P of the Building Regulations. The installation process varies
          slightly between brands but follows a common pattern:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>CT clamp installation:</strong> The CT clamp must be installed on the
                live (line) conductor of the main supply cable, positioned between the meter and
                the consumer unit. This is typically done by the electrician at the consumer unit.
                For wireless diverters (iBoost, Eddi with Harvi), the CT clamp sender unit
                clips onto the cable without breaking the circuit. For wired diverters (Immersun),
                a cable run from the CT clamp to the diverter unit is required.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Diverter unit location:</strong> The main diverter unit is installed
                near the hot water cylinder (typically in the airing cupboard). The output
                terminals connect to the immersion heater element — usually via a flex outlet
                plate or direct to the existing immersion heater wiring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power supply:</strong> The diverter unit requires a mains power supply
                (typically a switched fused connection unit, 3A). The output to the immersion
                heater is rated for the full heater load (typically 3 kW / 13A). The existing
                immersion heater wiring and thermostat remain in place as a backup.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Part P notification:</strong> Installation must be notified under Part P
                via a registered competent person scheme. An Electrical Installation Certificate
                or Minor Works Certificate must be issued on completion. The customer should
                receive a copy along with the diverter's user manual.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Solar Diverter Costs and Savings',
    content: (
      <>
        <p>
          Solar diverters represent one of the best value add-ons available for existing solar
          PV owners, with a straightforward payback period and no ongoing maintenance costs.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unit cost:</strong> £200–£400 depending on brand and specification.
                iBoost: approximately £240. Eddi: approximately £310. Immersun: approximately
                £210. Prices vary by supplier and may fluctuate with energy market conditions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Installation labour:</strong> £100–£200 for a standard domestic
                installation (approximately 1.5–3 hours for an experienced electrician). More
                complex installations (long cable runs, airing cupboard access difficulties)
                may cost more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total installed cost:</strong> £300–£600 for a typical domestic
                installation, including unit, labour, and any minor materials (cable, FCU,
                fixings).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Annual savings:</strong> £100–£250/year for a typical UK household,
                depending on solar system size, hot water usage, and whether gas or electricity
                is the current water heating fuel. The saving represents the cost of the water
                heating energy displaced by diverted solar electricity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Payback period:</strong> Typically 2–4 years. The diverter has no
                moving parts, requires no maintenance, and should last 10+ years — making the
                long-term return on investment very attractive.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'wiring',
    heading: 'Wiring Considerations',
    content: (
      <>
        <p>
          The wiring arrangements for a solar diverter installation require careful planning
          to ensure compliance with BS 7671 and safe, reliable operation. Key wiring
          considerations:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Immersion heater circuit:</strong> The existing immersion heater circuit
                (typically 2.5 mm² T&E on a 16A or 20A MCB) should be assessed before
                installation. Old rubber or cloth-insulated wiring must be replaced — not
                connected to a modern diverter. The circuit should be on an RCD-protected way
                in the consumer unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Diverter output cable:</strong> Most diverters accept input from the
                existing immersion heater circuit and output directly to the heater element
                terminals. The diverter's output must be rated for the full heater load (3 kW
                / 13A). Follow the manufacturer's cable specification exactly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermostat retention:</strong> The immersion heater's thermal cutout
                and thermostat must remain in the circuit and be operational. The diverter
                does not bypass the thermostat — it controls power input to the element while
                the thermostat remains the safety mechanism. Do not remove or bypass the
                immersion heater's thermal cutout.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earthing and bonding:</strong> Ensure supplementary bonding of the
                hot water cylinder is maintained (or installed if absent). Check for any
                existing bonding that may be disturbed during access to the airing cupboard.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'vs-battery',
    heading: 'Solar Diverter vs Battery Storage: Which is Better?',
    content: (
      <>
        <p>
          Both solar diverters and battery storage maximise the value of surplus solar generation,
          but they serve different needs and have very different price points. Understanding the
          comparison helps customers make the right choice.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Solar diverter advantages:</strong> Much lower cost (£300–£600 vs
                £3,000–£10,000+ for battery storage); no degradation over time; no maintenance
                required; simple installation; fast payback (2–4 years). Best for customers
                with an existing hot water cylinder who primarily want to offset water heating
                costs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery storage advantages:</strong> Uses stored solar electricity for
                any appliance — not just water heating; stores energy for evening and nighttime
                use; enables time-of-use tariff optimisation; provides backup power capability
                (with certain systems); higher total energy value captured from the solar system.
                Best for customers who want to maximise self-consumption across all household
                loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Best combined approach:</strong> A solar diverter and battery storage
                are complementary rather than competing. The battery handles evening demand;
                the diverter handles any surplus that the battery cannot absorb. For systems
                with a large solar array, both components together can achieve very high
                self-consumption rates.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For most UK solar PV owners who already have a hot water cylinder, a solar diverter
          is the logical first step — install it within a year of the solar panels, enjoy the
          immediate savings on water heating, and consider adding battery storage later if
          electricity bills remain high.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Solar Diverter Installations',
    content: (
      <>
        <p>
          Solar diverter installations are a quick, profitable add-on for electricians already
          working on solar PV or general domestic electrical work. A typical installation takes
          2–3 hours, requires minimal materials, and generates a healthy margin at the current
          market rate. With over 1.3 million solar PV installations in the UK, many of which
          do not yet have a diverter fitted, the market opportunity is substantial.
        </p>
        <p>
          Key upselling opportunity: when carrying out an annual inspection or EICR on a
          property with solar panels and a hot water cylinder but no diverter, always mention
          the diverter option. The payback period and simple explanation (
          <em>
            "it heats your hot water for free using electricity you'd otherwise sell for
            3–5p per unit"
          </em>
          ) make it an easy sell to most solar PV owners.
        </p>
        <SEOAppBridge
          title="Manage solar diverter jobs with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for quoting, job management, and certification. Issue EICs and Minor Works Certificates on your phone. 7-day free trial."
          icon={Zap}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SolarDiverterInstallationPage() {
  return (
    <GuideTemplate
      title="Solar PV Diverter Installation UK | Immersion Diverter Guide"
      description="Complete guide to solar diverter installation in the UK. What a solar diverter does, popular brands (iBoost, Eddi, Immersun), installation requirements, costs £200–£400 plus installation, savings, and wiring considerations."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Solar Diverter Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Solar PV Diverter Installation UK:{' '}
          <span className="text-yellow-400">Immersion Diverter Guide</span>
        </>
      }
      heroSubtitle="Everything homeowners and electricians need to know about solar diverters in the UK — how they work, popular brands (iBoost, Eddi, Immersun), installation requirements, costs, savings of £100–£250/year, and wiring considerations."
      readingTime={11}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Solar Diverters"
      relatedPages={relatedPages}
      ctaHeading="Quote and Manage Solar Diverter Jobs with Elec-Mate"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for quoting, job management, and certification. Issue installation certificates on your phone. 7-day free trial, cancel anytime."
    />
  );
}
