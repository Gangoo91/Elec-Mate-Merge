import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Sun,
  PoundSterling,
  Zap,
  ShieldCheck,
  ClipboardCheck,
  TrendingUp,
  Home,
  FileCheck2,
  Leaf,
  Building2,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Solar Guides', href: '/guides/solar-panel-installation' },
  { label: 'Solar Panel Installation Sheffield', href: '/solar-panel-installation-sheffield' },
];

const tocItems = [
  { id: 'overview', label: 'Solar in Sheffield & South Yorkshire' },
  { id: 'costs', label: 'Installation Costs 2025' },
  { id: 'savings', label: 'Savings & Payback Period' },
  { id: 'grants', label: 'Grants & Incentives' },
  { id: 'smart-export', label: 'Smart Export Guarantee' },
  { id: 'system-design', label: 'System Design for Sheffield' },
  { id: 'regulations', label: 'Regulations & MCS Certification' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'A typical 4kWp solar PV system in Sheffield costs £6,000 to £9,000 installed. Sheffield receives approximately 3.1 to 3.4 peak sun hours per day — sufficient for a 7 to 11 year payback period at current electricity prices.',
  'Sheffield City Council has committed to carbon neutrality by 2030 and actively supports residential solar PV through its retrofit programme and planning policy. Conservation areas in the Nether Edge, Broomhill, and Ecclesall Road areas require prior planning approval.',
  'South Yorkshire is covered by National Grid Electricity Distribution (NGED). G98 notification is required for all solar installations and G99 approval for systems over 3.68kW — typically taking two to eight weeks.',
  'Sheffield\'s topography — with many properties on hillsides — can provide excellent south-facing roof orientations. However, shading from trees and neighbouring properties in densely developed areas such as Crookes and Walkley requires careful shading analysis.',
  'Battery storage is particularly valuable in Sheffield given the city\'s higher proportion of EV owners and heat pump installations. A 10kWh battery can increase self-consumption from 35% to over 75%, saving an additional £350 to £500 per year.',
];

const faqs = [
  {
    question: 'How much does solar panel installation cost in Sheffield?',
    answer:
      'In Sheffield, a typical 4kWp solar PV system costs between £6,000 and £9,000 fully installed, including panels, inverter, mounting system, and electrical connection. Smaller 3kWp systems start at around £4,500 to £6,000. Larger 6kWp systems with battery storage can reach £12,000 to £17,000. All prices include 0% VAT (applicable since April 2022). Properties with complex roof access or non-standard roofing materials may incur additional scaffolding costs of £300 to £700.',
  },
  {
    question: 'Does solar work well in Sheffield?',
    answer:
      'Yes. Sheffield receives approximately 3.1 to 3.4 peak sun hours per day — broadly comparable to Leeds and Manchester and well above the minimum threshold for cost-effective solar investment. A 4kWp system in Sheffield typically generates 3,100 to 3,700 kWh per year. Sheffield\'s hillside topography means many properties have steeply south-facing roofs that can actually outperform flat-area predictions.',
  },
  {
    question: 'Are there Sheffield-specific grants for solar panels?',
    answer:
      'Sheffield City Council\'s Carbon Neutral 2030 programme has supported various retrofit initiatives, and the Sheffield City Region (South Yorkshire Mayoral Combined Authority) periodically offers green retrofit grants. At UK level, the ECO4 scheme covers Sheffield households on qualifying benefits. The 0% VAT rate (since April 2022) provides a universal 20% saving. Check Sheffield Council\'s retrofit pages and the South Yorkshire Mayoral Combined Authority website for current opportunities.',
  },
  {
    question: 'Do I need planning permission for solar panels in Sheffield?',
    answer:
      'Most Sheffield homeowners can install solar panels without full planning permission under permitted development rights. However, properties in Sheffield\'s conservation areas (including Nether Edge, Broomhill, Ranmoor, Walkley, and Ecclesall) may require prior approval from Sheffield City Council. Listed buildings require listed building consent. The panels must not protrude more than 200mm from the roof surface. Check Sheffield\'s planning portal or contact Sheffield City Council\'s planning department to confirm your property\'s status.',
  },
  {
    question: 'What is the DNO process for solar installation in Sheffield?',
    answer:
      'Sheffield is covered by National Grid Electricity Distribution (NGED). For systems up to 3.68kW per phase, G98 notification must be submitted to NGED within 28 days of installation — your MCS-certified installer handles this. For larger systems (over 3.68kW), G99 formal approval is required before installation can proceed, typically taking two to eight weeks. For very large systems or properties with unusual grid connections, an application fee and technical assessment may be required.',
  },
  {
    question: 'How does Sheffield\'s topography affect solar panel performance?',
    answer:
      'Sheffield\'s hilly terrain is a mixed blessing for solar PV. Many properties in areas like Nether Edge, Ecclesall, Fulwood, and Crookes have south-facing roofs at angles close to the optimal 30 to 35 degrees — potentially generating more than Sheffield\'s average. However, urban valleys and densely developed streets can create significant shading, particularly in winter. A professional shading analysis using PVGis or Solargis is essential for accurate generation estimates in Sheffield.',
  },
  {
    question: 'Is battery storage worth it in Sheffield?',
    answer:
      'For many Sheffield homeowners, yes. Battery storage increases self-consumption from around 30 to 40% to 70 to 85%, saving an additional £350 to £550 per year at current electricity prices. Sheffield has above-average EV ownership and heat pump adoption, both of which benefit significantly from solar-plus-battery combinations. A 10kWh battery typically costs £3,000 to £5,000 and has a standalone payback of 6 to 10 years — reasonable given 10-year warranties.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/solar-panel-installation-leeds',
    title: 'Solar Panel Installation Leeds',
    description: 'Solar PV costs, savings, and MCS requirements for Leeds and Yorkshire.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/solar-panel-installation-cardiff',
    title: 'Solar Panel Installation Cardiff',
    description: 'Solar PV guide for Cardiff with Welsh Government grants and planning rules.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/guides/ev-charging-installation',
    title: 'EV Charger Installation',
    description: 'Home EV charger installation costs, grants, and regulations.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/tools/electrical-quoting-app',
    title: 'Electrical Quoting App',
    description: 'Quote solar PV and EV charger jobs on your phone with instant PDF.',
    icon: PoundSterling,
    category: 'Tool',
  },
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord EICR requirements, compliance deadlines, and penalties.',
    icon: Home,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Solar Panel Installation in Sheffield and South Yorkshire',
    content: (
      <>
        <p>
          Sheffield is one of the greenest cities in England by tree cover and green space, and
          it is increasingly green in energy terms too. The city's ambitious Carbon Neutral 2030
          target and strong community energy culture have driven rapid growth in residential solar
          PV installations across South Yorkshire.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sheffield's solar resource</strong> — Sheffield receives approximately
                1,050 to 1,150 peak sun hours per year, generating 870 to 1,000 kWh per kWp
                annually. A 4kWp system in Sheffield typically produces 3,200 to 4,000 kWh per
                year — enough to meet 70 to 95% of an average household's electricity needs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sheffield's housing stock</strong> — the city has a rich mix of Victorian
                stone terraces, Edwardian semis, 1960s council estates now privately owned, and
                modern new builds. The Peak District fringe areas of Dore, Totley, and Bradfield
                have larger detached properties well suited to larger solar arrays.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Leaf className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Carbon Neutral 2030 target</strong> — Sheffield City Council's commitment
                to carbon neutrality by 2030 has driven supportive planning policy for renewable
                energy. The Sheffield Local Plan encourages solar PV on new and existing buildings.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Solar Panel Installation Costs in Sheffield (2025)',
    content: (
      <>
        <p>
          Sheffield installation costs are broadly in line with the national average, with some
          premium for properties requiring specialist roof access or non-standard mounting.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>3kWp system</strong> — £4,500 to £6,500. Suitable for smaller Sheffield
                terraces. Typically 8 to 10 monocrystalline panels.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>4kWp system</strong> — £6,000 to £9,000. The most common size for a
                three-bedroom Sheffield semi or terrace. Typically 10 to 13 panels.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>6kWp system</strong> — £9,000 to £13,500. Suitable for larger properties
                or homes with EVs, heat pumps, or high energy usage. Typically 15 to 18 panels.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery storage</strong> — £2,500 to £5,000 for a 5 to 10kWh unit.
                Givenergy, Tesla Powerwall, Fox ESS, and Solax are popular in the South Yorkshire
                market.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Sheffield stone roofs (particularly gritstone) require specialist mounting systems and
          care to avoid damage. Homes in Crookes, Walkley, and Hillsborough on steep hillside
          sites may require additional scaffolding and fall-arrest equipment, adding £400 to £800.
        </p>
      </>
    ),
  },
  {
    id: 'savings',
    heading: 'Savings and Payback Period in Sheffield',
    content: (
      <>
        <p>
          At current electricity prices, solar PV offers a compelling financial case for most
          Sheffield homeowners. The combination of self-consumption savings and SEG payments
          typically yields a 7 to 11 year payback on a well-sized system.
        </p>
        <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Self-consumption savings</strong> — consuming 50% of a 4kWp system's
                output (approximately 1,600 kWh) saves £480 to £640 per year at 30 to 40p per kWh.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>SEG export income</strong> — exporting 50% at an average 10p per kWh
                earns £160 to £200 per year. Top SEG tariffs can increase this to £380 to £480.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Total annual benefit</strong> — £640 to £840 per year without battery.
                With battery increasing self-consumption to 80%: £900 to £1,200 per year.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <TrendingUp className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>25-year lifetime value</strong> — over the system's life, a 4kWp Sheffield
                installation may deliver £15,000 to £25,000 in total financial benefit, assuming
                modest electricity price inflation of 2 to 3% per year.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'grants',
    heading: 'Grants and Incentives for Sheffield Homeowners',
    content: (
      <>
        <p>
          Sheffield homeowners have access to both national and local funding routes. While a
          universal residential solar grant does not exist in England, several targeted schemes
          can significantly reduce costs for eligible households.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>0% VAT on solar</strong> — available to all homeowners since April 2022.
                Saves 20% on installation costs — £1,600 on a typical £8,000 installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>ECO4 scheme</strong> — free solar PV for qualifying low-income households
                in Sheffield. Eligibility based on receiving means-tested benefits and low EPC
                rating. Contact Sheffield City Council's energy advice team or an ECO4 installer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>South Yorkshire Mayoral Combined Authority</strong> — Sheffield City Region
                has supported green retrofit programmes. Check the SYMCA website for current
                residential energy grants and low-interest green loan products.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Sheffield City Council retrofit programme</strong> — as part of the Carbon
                Neutral 2030 target, Sheffield Council has run targeted retrofit programmes in
                specific areas. Check Sheffield City Council's website for current area-based
                energy improvement schemes.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'smart-export',
    heading: 'Smart Export Guarantee in South Yorkshire',
    content: (
      <>
        <p>
          The SEG operates across South Yorkshire through NGED's smart meter network. Sheffield
          solar owners can choose any obligated SEG supplier, regardless of their electricity
          supplier.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Top Sheffield SEG options (2025)</strong> — Octopus Outgoing Agile
                (variable, up to 24p peak), E.ON Next Drive Export (up to 15p), Ovo Greener
                Energy Export (around 12p). Rates change — always compare current rates.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart meter check</strong> — you need a functioning smart meter with
                half-hourly export reading capability. NGED can upgrade your meter free of charge
                through your electricity supplier.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Time-of-use arbitrage</strong> — pairing an Octopus Agile import tariff
                with Octopus Outgoing Agile export gives Sheffield solar owners the ability to
                charge batteries during cheap overnight periods (sometimes negative prices) and
                sell back during expensive evening peaks.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'system-design',
    heading: 'System Design Considerations for Sheffield',
    content: (
      <>
        <p>
          Sheffield's terrain and housing stock present unique design challenges that require
          experienced local installers with knowledge of South Yorkshire conditions.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Hillside roof angles</strong> — many Sheffield properties have roof pitches
                steeper than the national average due to hillside construction. Pitches above 45°
                reduce generation compared to the optimum 30 to 35°, but south-facing steep roofs
                still outperform north-facing optimally-angled roofs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Gritstone and stone tile roofs</strong> — common in Sheffield's older
                housing stock, these require specialist mounting systems. Not all solar racking
                systems are suitable. Ensure your installer has specific experience with
                Sheffield stone roofing.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Urban shading</strong> — densely developed areas of Crookes, Walkley,
                Hillsborough, and the Burngreave valley can experience significant inter-property
                shading, especially in winter. Micro-inverters (such as Enphase) or DC optimisers
                (SolarEdge) can significantly reduce shading losses compared to string inverters.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Heat pump integration</strong> — Sheffield has a higher rate of air source
                heat pump installation than the national average, driven by active local authority
                programmes. Solar-plus-heat-pump combinations (with or without battery) are
                particularly valuable in Sheffield and should be sized to work together.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'regulations',
    heading: 'Regulations and MCS Certification',
    content: (
      <>
        <p>
          Solar PV in Sheffield must comply with the same national regulatory framework as
          elsewhere in England, including MCS certification, BS 7671, Building Regulations, and
          NGED connection requirements.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCS certification</strong> — required for SEG eligibility and most grant
                schemes. Verify installer certification at mcs.org.uk. The MCS certificate must
                be issued within three months of installation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 and Part P</strong> — all electrical work must comply with{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
                  BS 7671:2018+A3:2024
                </SEOInternalLink>
                . The inverter connection to the consumer unit is notifiable under Building
                Regulations Part P. Your MCS-certified installer should be registered with NICEIC,
                NAPIT, or ELECSA to self-certify this work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>NGED connection (G98/G99)</strong> — National Grid Electricity Distribution
                covers Sheffield. G98 notification for systems up to 3.68kW per phase is handled by
                your installer. G99 formal approval for larger systems takes two to eight weeks and
                should be initiated before installation is booked.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Solar PV Work in Sheffield',
    content: (
      <>
        <p>
          Sheffield's combination of a large owner-occupied housing stock, strong sustainability
          culture, and growing heat pump market creates excellent demand for MCS-certified solar PV
          installers. The city's carbon neutrality ambitions are generating significant publicly
          funded retrofit work alongside private residential demand.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Win Solar Jobs with Better Quotes</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/tools/electrical-quoting-app">
                    Elec-Mate quoting app
                  </SEOInternalLink>{' '}
                  to produce detailed solar PV quotes on site, complete with generation estimates
                  tailored to Sheffield's solar resource, SEG earnings projections, and payback
                  period calculations — all in a professional PDF sent before leaving.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Bundle Solar, Battery & EV Charging</h4>
                <p className="text-white text-sm leading-relaxed">
                  Sheffield's progressive homeowners frequently want solar, battery storage, and
                  EV charging as a package. Electricians who can quote and install all three
                  command higher average job values and build stronger long-term customer
                  relationships in the South Yorkshire market.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Grow your solar installation business in Sheffield with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate to quote solar PV jobs, manage MCS certificates, and run their business from their phone. 7-day free trial."
          icon={Sun}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function SolarPanelInstallationSheffieldPage() {
  return (
    <GuideTemplate
      title="Solar Panel Installation Sheffield 2025 | Solar PV South Yorkshire"
      description="Complete guide to solar panel installation in Sheffield and South Yorkshire. Costs, savings, payback periods, grants, Smart Export Guarantee, Sheffield-specific design considerations, and MCS certification."
      datePublished="2025-01-01"
      dateModified="2025-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Solar Guide"
      badgeIcon={Sun}
      heroTitle={
        <>
          Solar Panel Installation Sheffield 2025:{' '}
          <span className="text-yellow-400">Costs, Savings & South Yorkshire Guide</span>
        </>
      }
      heroSubtitle="Everything Sheffield homeowners need to know about solar panel installation — costs from £4,500, savings and SEG payments, grants, planning rules, hillside system design, and how to find an MCS-certified Sheffield installer."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Solar Panels in Sheffield"
      relatedPages={relatedPages}
      ctaHeading="Quote Solar PV Jobs in Sheffield on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate to quote solar PV installations, manage MCS certificates, and grow their business in South Yorkshire. 7-day free trial, cancel anytime."
    />
  );
}
