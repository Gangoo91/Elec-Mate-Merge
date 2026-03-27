import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Wind,
  Zap,
  PoundSterling,
  ShieldCheck,
  Settings,
  FileCheck2,
  Battery,
  AlertTriangle,
  TrendingUp,
  Sun,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Wind Turbine Electrical', href: '/wind-turbine-electrical' },
];

const tocItems = [
  { id: 'micro-wind', label: 'Micro Wind Turbines' },
  { id: 'planning', label: 'Planning Permission' },
  { id: 'site-assessment', label: 'Site Wind Speed Assessment' },
  { id: 'grid-connection', label: 'Grid Connection (G99)' },
  { id: 'mcs', label: 'MCS Certification for Wind' },
  { id: 'electrical-connection', label: 'Electrical Connection Requirements' },
  { id: 'inverter-types', label: 'Inverter Types' },
  { id: 'battery-integration', label: 'Battery Integration' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Micro wind turbines under 50 kW are the most common category for domestic and small commercial applications in the UK, generating 1–15 kW depending on turbine diameter and hub height.',
  'A minimum average wind speed of 5 m/s at hub height is generally required for a wind turbine to be economically viable. UK average wind speeds vary significantly — exposed rural and coastal sites in Scotland, Wales, and northern England are most suitable.',
  'Planning permission requirements depend on turbine height and location. A single freestanding turbine in a conservation area, near a listed building, or within 2.5 times its height from a property boundary generally requires full planning permission.',
  'G99 notification is required for all wind turbines connected to the low-voltage distribution network (under 50 kW), because even small turbines typically exceed the 16 A per phase G98 threshold. Prior DNO approval before installation is essential.',
  'MCS Wind Turbine Standard (MCS 006) certification is required for the turbine product and the installing company to access the Smart Export Guarantee and any government grants or incentive schemes.',
  'Wind turbine electrical connections differ from solar PV — the turbine output is typically three-phase AC from the generator, rectified to DC, then inverted back to grid-quality AC. The rectifier and grid-tie inverter are usually integrated in the turbine or in a separate controller unit.',
];

const faqs = [
  {
    question: 'How much electricity can a small wind turbine generate in the UK?',
    answer:
      'A 6 kW domestic wind turbine (typical hub height 15–18 m) at a site with an average wind speed of 6 m/s can generate approximately 10,000–14,000 kWh per year. This is 2–4 times the annual electricity consumption of a typical UK home. Annual generation is highly dependent on site wind speed — a 1 m/s increase in average wind speed approximately doubles energy output (power output scales with the cube of wind speed). Sites with average speeds below 5 m/s are rarely economically viable.',
  },
  {
    question: 'What are the permitted development rights for small wind turbines?',
    answer:
      'Under Class E of the Town and Country Planning (General Permitted Development) Order 2015, a single freestanding micro wind turbine may be permitted development if: it is not within a conservation area, AONB, National Park, or World Heritage Site; the hub height does not exceed 11.1 m; the blade tip height does not exceed 15 m; it is not within a distance of its height plus 1 m from the property boundary; and it is more than 100 m from the nearest property. These conditions are restrictive — many practical sites require full planning permission.',
  },
  {
    question: 'Why do wind turbines require G99 rather than G98?',
    answer:
      'G98 (the simpler notification process) is limited to generating systems up to 16 A per phase (3.68 kW single-phase). Even modest wind turbines typically have rated outputs of 2–15 kW and are three-phase, meaning they quickly exceed the G98 threshold. G99 requires prior approval from the DNO, submission of protection settings, and may involve a power quality study for turbines over 50 kVA. Allow 6–12 weeks for DNO G99 approval before installation.',
  },
  {
    question: 'Do I need noise and shadow flicker assessments for a wind turbine?',
    answer:
      'Planning authorities typically require a noise assessment for turbines of 15 kW and above, or where the nearest property is within 10 turbine rotor diameters. Shadow flicker assessment (assessing the flickering shadow cast by rotating blades) is required where properties are within 10 rotor diameters to the north of the turbine (since shadow flicker only occurs when the sun is to the south, behind the turbine). DECC guidance ("Planning Practice Guidance for Renewable Energy") remains the relevant reference for these assessments.',
  },
  {
    question: 'How long does a small wind turbine last and what maintenance is required?',
    answer:
      'A well-maintained small wind turbine has a design life of 20–25 years. Annual maintenance includes blade inspection, bolt torque checks, gearbox oil change (if applicable), yaw bearing lubrication, brake inspection, and cable/connection checks. Blades may need replacement after 15–20 years. The gearbox (on geared turbines) is the most maintenance-intensive component. Direct-drive turbines (no gearbox) have fewer moving parts and lower maintenance costs.',
  },
  {
    question: 'Can a wind turbine work with a battery system?',
    answer:
      'Yes. Wind turbines are well-suited to battery integration because wind energy is available at night and during winter months when solar generation is low — the two complement each other. In a wind + solar + battery hybrid system, both the wind turbine and solar panels charge the battery bank, which is discharged on demand. The wind turbine controller and solar inverter must both be compatible with the battery management system. Off-grid systems with both wind and solar provide more consistent year-round generation than either alone.',
  },
  {
    question: 'What is the payback period for a small wind turbine in the UK?',
    answer:
      'Payback periods for small UK wind turbines vary enormously by site wind speed and electricity price. At a good site (6+ m/s average) with electricity priced at 28p/kWh, a 6 kW turbine costing £25,000–£35,000 installed may pay back in 8–12 years. At a marginal site (5 m/s), payback could extend to 15–20+ years. Unlike solar PV, where the UK market is mature and costs are well-established, wind turbines require detailed site-specific economic modelling before commitment.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/battery-storage-installation',
    title: 'Battery Storage Installation',
    description: 'Home battery storage — types, popular systems, G99, and MCS certification.',
    icon: Battery,
    category: 'Guide',
  },
  {
    href: '/hybrid-solar-battery-system',
    title: 'Hybrid Solar Battery System',
    description: 'Grid-tied solar plus battery — self-consumption optimisation and tariff benefits.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-certificates',
    title: 'Electrical Certificates App',
    description: 'Complete wind turbine and MCS installation certificates on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote wind turbine electrical installations accurately.',
    icon: PoundSterling,
    category: 'Tool',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'micro-wind',
    heading: 'Micro Wind Turbines: Under 50 kW',
    content: (
      <>
        <p>
          Wind turbines under 50 kW are classified as micro-generating technology in the UK
          and sit within the scope of the Microgeneration Certification Scheme (MCS). This
          size range covers domestic turbines from 1 kW to small commercial installations
          producing 50 kW — sufficient to power a farm, estate, or small industrial unit.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Wind className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Domestic turbines (1–6 kW)</strong> — most commonly used on rural
                properties with planning permission. Typical hub height 10–18 m. Annual
                generation 1,000–14,000 kWh depending on site wind speed. Popular manufacturers
                include Endurance Wind Power, Proven Energy (now Kingspan), and SWIFT (building-mounted).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wind className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Small commercial turbines (6–50 kW)</strong> — suitable for farms,
                estates, and light commercial premises. Hub heights of 20–35 m. These turbines
                require a more detailed planning application, G99 DNO approval, and in many
                cases an environmental statement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wind className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Building-mounted turbines</strong> — small horizontal or vertical axis
                turbines mounted on rooftops or walls. Generally produce very little electricity
                (100–500 W) due to turbulent wind at roof level. Not recommended for urban
                or suburban properties. SWIFT turbine by Renewalytics is the most widely
                tested building-mounted UK product.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'planning',
    heading: 'Planning Permission for Small Wind Turbines',
    content: (
      <>
        <p>
          Planning permission for wind turbines is one of the most common barriers to
          installation in England. The rules are more restrictive than for solar panels,
          reflecting visual impact and noise concerns.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Permitted development (England)</strong> — one freestanding turbine
                may be permitted development if the hub height is under 11.1 m, blade tip
                under 15 m, not in a sensitive area (conservation area, AONB, SSSI, National
                Park), not within specified distances from property boundaries and neighbouring
                properties. In practice, these conditions exclude most domestic sites.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Full planning application</strong> — required when permitted development
                conditions cannot be met. The application should include site layout, turbine
                specification, hub height and blade tip calculations, noise assessment (for
                larger turbines), shadow flicker assessment, and ecology survey if in or near
                a designated habitat.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Scotland and Wales</strong> — permitted development rules differ in
                Scotland (Planning Circular 3/2011) and Wales (TAN 8). Scotland generally
                has more permissive rules for rural wind in appropriate locations. Always
                check the applicable national planning guidance.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'site-assessment',
    heading: 'Site Wind Speed Assessment',
    content: (
      <>
        <p>
          Wind speed assessment is the most critical element of wind turbine feasibility.
          A site with average wind speeds below 5 m/s at hub height will rarely produce
          enough electricity to justify the capital cost.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>NOABL database</strong> — the UK's Numerical Objective Analysis
                Boundary Layer (NOABL) database provides estimated mean wind speeds at 10 m,
                25 m, and 45 m above ground level for any 1 km grid square. Use this as an
                initial screening tool — actual site wind speeds may differ due to local
                topography and obstacles.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>On-site anemometry</strong> — for turbines above 6 kW, a 12-month
                anemometry campaign at hub height using a calibrated anemometer and data
                logger is strongly recommended. This provides site-specific wind speed
                distribution data for accurate energy yield assessment.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wind speed thresholds</strong> — 5 m/s average at hub height is the
                practical minimum for economic viability; 6 m/s delivers good returns; 7 m/s+
                provides excellent economics. UK highland, coastal, and hill-exposed sites
                regularly achieve 6–9 m/s.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'grid-connection',
    heading: 'Grid Connection: G99 for Wind Turbines',
    content: (
      <>
        <p>
          All wind turbines connected to the low-voltage distribution network must comply with
          Engineering Recommendation G99 (formerly G59). Unlike solar PV, where many domestic
          systems qualify for the simpler G98 process, even modest wind turbines typically
          require full G99 prior approval.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>G99 prior approval</strong> — submit application to the relevant DNO
                with system design documentation, protection relay settings, power quality
                assessment, and single-line diagram. DNO response typically 6–12 weeks.
                Do not install before approval is received.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Protection relay requirements</strong> — G99 requires a protection
                relay with loss of mains (LoM) detection using ROCOF (Rate of Change of
                Frequency) or Vector Shift. The relay must be set to G99 Annex B settings
                and tested at commissioning. Settings must match those approved by the DNO.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Islanding prevention</strong> — the turbine must disconnect from
                the grid automatically on loss of grid voltage or frequency excursion.
                This prevents dangerous islanding (energising the local network during a
                grid outage while engineers may be working on cables).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Commissioning test</strong> — a G99 commissioning test must be
                witnessed (or at least documented) and the results submitted to the DNO.
                This includes verification of protection relay settings and operation.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'mcs',
    heading: 'MCS Certification for Wind',
    content: (
      <>
        <p>
          MCS Wind Turbine Standard MCS 006 governs certification of wind turbine products
          and installation companies for micro-wind in the UK. MCS certification is a
          prerequisite for Smart Export Guarantee eligibility and government grant access.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS 006 product standard</strong> — turbine products must meet
                IEC 61400-2 (small wind turbines) and be certified to MCS 006. Check the
                MCS product database for current certified turbines before specifying.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS installer certification</strong> — the installing company must
                hold MCS accreditation for wind turbine installation. This is separate from
                solar PV accreditation. Fewer companies hold wind MCS certification than solar,
                so check availability in your region before quoting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart Export Guarantee</strong> — MCS certification enables the
                property owner to register for SEG payments on exported electricity. Requires
                a SMETS2 smart meter with half-hourly export metering. SEG rates for wind
                exports are paid at the same rates as solar.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'electrical-connection',
    heading: 'Electrical Connection Requirements',
    content: (
      <>
        <p>
          The electrical connection of a wind turbine to the property distribution board
          (and ultimately the grid) requires careful attention to protective devices,
          cable sizing, and metering requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AC output connection</strong> — the turbine inverter output (typically
                230V single-phase or 400V three-phase) connects via a dedicated circuit to
                a spare way in the main distribution board or a dedicated generation board.
                Cable sized for maximum inverter output current with appropriate voltage drop.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Isolation requirements</strong> — a lockable means of isolation
                (the G99 All Pole Isolator) must be installed close to the point of connection
                to the grid, accessible to the DNO for maintenance and fault clearance without
                requiring access to the building. DNO specification varies — check requirements
                with your specific DNO.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Metering</strong> — a generation meter records total electricity
                generated. An import/export meter (or SMETS2 smart meter) records import
                and export for SEG purposes. The DNO may specify meter requirements as
                part of the G99 approval.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Surge protection</strong> — wind turbines in exposed rural locations
                are susceptible to lightning damage. Surge protection devices (SPD) in
                accordance with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671 Section 534
                </SEOInternalLink>{' '}
                should be installed at the main distribution board and at the turbine
                controller if the cable run exceeds 10 m.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'inverter-types',
    heading: 'Inverter Types for Wind Turbines',
    content: (
      <>
        <p>
          Wind turbine inverters differ from solar inverters because the turbine generator
          produces variable-frequency, variable-voltage AC (or DC after rectification)
          that must be conditioned to grid-quality 50 Hz AC.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Integrated turbine controller/inverter</strong> — most modern small
                wind turbines include the power electronics in the nacelle or in a separate
                controller unit supplied with the turbine. The installer connects the
                grid-quality AC output. The internal AC–DC–AC conversion is handled by
                the turbine manufacturer's electronics.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DC bus systems (off-grid)</strong> — in off-grid wind + battery systems,
                the turbine output is typically rectified to DC and fed into the battery bank
                alongside solar MPPT controllers. A grid-forming inverter then converts DC
                to AC for the property loads. This approach is common on narrowboats, off-grid
                farms, and hybrid wind/solar systems.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'battery-integration',
    heading: 'Battery Integration with Wind Turbines',
    content: (
      <>
        <p>
          Wind and solar generation profiles are complementary in the UK — wind is strongest
          in winter when solar is weakest. Combining both with battery storage maximises
          self-consumption and energy security.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Grid-tied wind + battery</strong> — an AC-coupled battery (Tesla
                Powerwall, GivEnergy) stores surplus wind generation for later use, exactly
                as it would with solar. The battery inverter measures net import/export
                via CT clamp and charges from wind surplus automatically.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Off-grid wind + solar + battery</strong> — the highest-performing
                off-grid configuration. Wind provides generation through winter nights and
                overcast days when solar is absent. LFP battery bank (30–100 kWh) bridges
                calm, cloudy periods. A backup generator provides emergency charging during
                extended low-generation events.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dump load controller</strong> — in off-grid or battery-integrated
                wind systems, a dump load (resistive heating element, immersion heater, or
                space heater) absorbs excess wind generation when the battery is full and
                loads are light. This prevents overvoltage damage to the battery and turbine
                electronics. The dump load controller should be rated for the full turbine
                output.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Wind Turbine Electrical Work',
    content: (
      <>
        <p>
          Wind turbine electrical installation requires G99 expertise, MCS accreditation,
          and comfort with both AC and DC systems. Relatively few UK electricians specialise
          in this area, which means those who do can command premium rates on a less
          competitive market.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certificate Wind Installations On Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-certificates">
                    Elec-Mate certificates app
                  </SEOInternalLink>{' '}
                  to complete EIC certificates, G99 commissioning test records, and MCS
                  installation documentation on your phone. Eliminates evening paperwork
                  on complex multi-day wind turbine installations.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <PoundSterling className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote the Full Package</h4>
                <p className="text-white text-sm leading-relaxed">
                  Wind turbine projects often include battery storage, G99 application, and
                  surge protection upgrades. Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    quoting app
                  </SEOInternalLink>{' '}
                  to build comprehensive itemised quotes that clearly show the value of the
                  full electrical package.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Manage wind turbine installations with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EIC certificates, G99 commissioning records, and professional quoting. 7-day free trial, cancel anytime."
          icon={Wind}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function WindTurbineElectricalPage() {
  return (
    <GuideTemplate
      title="Small Wind Turbine Electrical Installation UK | Micro Wind Guide"
      description="Complete guide to small wind turbine electrical installation in the UK. Micro wind under 50 kW, planning permission, site wind speed assessment (minimum 5 m/s), G99 grid connection, MCS 006 certification, electrical connection requirements, inverter types, and battery integration."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Micro Wind Guide"
      badgeIcon={Wind}
      heroTitle={
        <>
          Small Wind Turbine Electrical Installation UK:{' '}
          <span className="text-yellow-400">Micro Wind Guide</span>
        </>
      }
      heroSubtitle="A complete guide to micro wind turbine electrical installation in the UK — turbine types under 50 kW, planning permission, site wind speed assessment, G99 grid connection prior approval, MCS 006 certification, electrical connection requirements, inverter selection, and battery integration."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Small Wind Turbine Installation"
      relatedPages={relatedPages}
      ctaHeading="Certificate Wind Turbine Installations on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site EIC certificates, G99 commissioning records, and MCS documentation. 7-day free trial, cancel anytime."
    />
  );
}
