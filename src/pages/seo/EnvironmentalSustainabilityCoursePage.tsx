import CourseTemplate from '@/pages/seo/templates/CourseTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import {
  Leaf,
  GraduationCap,
  BookOpen,
  BrainCircuit,
  ClipboardCheck,
  Clock,
  Layers,
  FileCheck2,
  Radio,
  Sun,
  Zap,
  Recycle,
  Lightbulb,
  Wind,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const PAGE_TITLE = 'Environmental Sustainability Course | Electricians & Green Skills';
const PAGE_DESCRIPTION =
  'Environmental sustainability training for UK electricians. Energy efficiency, renewable energy, waste management, green building standards, carbon reduction, and sustainable installation practices. 8 modules with video content, interactive quizzes, and AI tutor.';

const breadcrumbs = [
  { label: 'Training', href: '/training' },
  { label: 'Environmental Sustainability', href: '/training/environmental-sustainability' },
];

const tocItems = [
  { id: 'why-sustainability', label: 'Why Sustainability Matters for Electricians' },
  { id: 'energy-efficiency', label: 'Energy Efficiency in Electrical Installations' },
  { id: 'renewable-energy', label: 'Renewable Energy Technologies' },
  { id: 'waste-management', label: 'Waste Management on Site' },
  { id: 'green-building', label: 'Green Building Standards' },
  { id: 'carbon-reduction', label: 'Carbon Reduction in Practice' },
  { id: 'modules', label: 'Course Modules' },
  { id: 'features', label: 'What You Get With Elec-Mate' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'The UK government target of net zero carbon emissions by 2050 is driving massive investment in energy efficiency, renewable energy, and electrification of heat and transport — creating enormous demand for electricians with green skills.',
  'Energy-efficient electrical design can reduce a building energy consumption by 30% or more through LED lighting, intelligent controls, power factor correction, efficient motor drives, and optimised cable sizing to minimise resistive losses.',
  'Solar PV, battery storage, heat pumps, and EV charging are the four key renewable and low-carbon technologies that every electrician should understand — they will be standard installations within the next decade.',
  'The Waste Electrical and Electronic Equipment (WEEE) Regulations require proper disposal of old electrical equipment — electricians have a duty to ensure waste materials are segregated, recycled, and disposed of correctly.',
  'Elec-Mate includes carbon footprint calculators, material waste tracking, and energy efficiency design tools that help electricians deliver sustainable installations and demonstrate their green credentials to clients.',
];

const faqs = [
  {
    question: 'Why do electricians need environmental sustainability training?',
    answer:
      'Electricians are at the centre of the UK net zero transition. The electrification of heating (heat pumps replacing gas boilers), transport (EV chargers), and power generation (solar PV and battery storage) depends on competent electricians who understand both the technical installation requirements and the broader environmental context. Clients — from homeowners to commercial developers — increasingly want contractors who can advise on energy efficiency, recommend low-carbon technologies, and minimise waste. The government Green Jobs Taskforce has identified electrical installation as a critical green skill area. Having formal sustainability training on your CV differentiates you from competitors and opens doors to higher-value work in the growing green energy sector.',
  },
  {
    question: 'What are the main environmental regulations that affect electricians?',
    answer:
      'Several regulations directly affect the work of electricians: The Energy Performance of Buildings Regulations require an Energy Performance Certificate (EPC) for buildings when sold or let — the electrical installation contributes to the EPC rating. The Building Regulations Part L (Conservation of Fuel and Power) sets minimum standards for energy efficiency in new buildings and renovations — lighting efficiency, controls, and metering are directly relevant. The WEEE Regulations (Waste Electrical and Electronic Equipment) require proper disposal of old electrical equipment. The Hazardous Waste Regulations cover the disposal of items such as fluorescent tubes (which contain mercury) and old transformers (which may contain PCBs). The Climate Change Act 2008 sets the overarching net zero 2050 target that drives policy in all these areas.',
  },
  {
    question: 'How does LED lighting contribute to energy efficiency?',
    answer:
      'LED lighting uses 75% to 80% less energy than traditional incandescent lamps and 40% to 50% less than fluorescent lighting for the same light output. A typical 10W LED produces the same light as a 60W incandescent bulb or a 15W compact fluorescent. In commercial buildings where lighting can account for 30% to 40% of total electricity consumption, converting to LED lighting with intelligent controls (presence detection, daylight dimming, scheduling) can reduce lighting energy use by 60% to 80%. The payback period for LED upgrades is typically 2 to 4 years, after which the energy savings are pure cost reduction. Additionally, LED lamps last 25,000 to 50,000 hours compared to 1,000 hours for incandescent and 10,000 hours for fluorescent, reducing maintenance costs and lamp waste. For electricians, LED upgrade projects are profitable, straightforward work with strong environmental benefits.',
  },
  {
    question: 'What is a heat pump and why should electricians understand them?',
    answer:
      'A heat pump extracts heat from the outside air (air-source), ground (ground-source), or water (water-source) and upgrades it to a higher temperature for space heating and hot water. It operates on the same principle as a refrigerator but in reverse. For every 1kW of electricity consumed, a modern air-source heat pump delivers 3 to 4kW of heat (a coefficient of performance of 3 to 4). This makes heat pumps approximately three to four times more efficient than direct electric heating. Under the Future Homes Standard (expected to apply to all new-build homes from 2025), gas boilers will no longer be installed in new properties — heat pumps will be the primary heating technology. Electricians need to understand heat pump electrical requirements: dedicated circuits, appropriate cable sizing, electrical supply capacity, protective device selection, and integration with solar PV and battery storage. This is a rapidly growing market that will sustain electrical work for decades.',
  },
  {
    question: 'How should electricians dispose of waste materials on site?',
    answer:
      'Electricians generate several types of waste that require proper management: Cable offcuts (copper and aluminium) should be segregated for recycling — copper cable offcuts have significant scrap value. Old consumer units and distribution boards containing metals should be recycled. Fluorescent tubes and discharge lamps contain mercury and must be disposed of as hazardous waste through a licensed waste carrier. Packaging materials (cardboard, plastic wrapping) should be segregated for recycling. Old electrical equipment removed during upgrades falls under the WEEE Regulations — it must be taken to a registered WEEE collection facility or returned to the distributor. General construction waste should be segregated into skips for recycling. Under the Duty of Care regulations, anyone producing waste must ensure it is stored, transported, and disposed of properly. Keep waste transfer notes for at least two years (six years for hazardous waste).',
  },
  {
    question: 'What are green building certifications and how do they affect electrical work?',
    answer:
      'Green building certification schemes assess the environmental performance of buildings against set criteria. The main schemes in the UK are BREEAM (Building Research Establishment Environmental Assessment Method), which is the most widely used in the UK and rates buildings from Pass to Outstanding; LEED (Leadership in Energy and Environmental Design), which is more common on international projects; and Passivhaus, which focuses on extreme energy efficiency through fabric-first design. For electricians, these schemes affect specification requirements — they may require higher-efficiency lighting, sub-metering of energy consumption, use of renewable energy, daylight-linked lighting controls, and documentation of material sourcing and waste management. Working on green-certified buildings requires an understanding of these requirements and the ability to deliver installations that meet the enhanced standards.',
  },
];

const modules = [
  {
    title: 'Introduction to Environmental Sustainability',
    description:
      'The climate challenge, UK net zero targets, the role of the electrical industry in decarbonisation, and why sustainability is a career opportunity for electricians. Overview of key legislation and policy drivers.',
  },
  {
    title: 'Energy Efficiency in Electrical Installations',
    description:
      'LED lighting design, intelligent controls (presence detection, daylight dimming), power factor correction, efficient motor drives, cable sizing for minimum losses, sub-metering, and Building Regulations Part L compliance.',
  },
  {
    title: 'Solar PV Systems',
    description:
      'PV panel technology, system sizing, inverter selection, mounting systems, DC and AC wiring, earthing and protection, grid connection, export metering, and the MCS (Microgeneration Certification Scheme) requirements.',
  },
  {
    title: 'Battery Storage and Energy Management',
    description:
      'Battery technologies (lithium-ion, LFP), sizing storage systems, hybrid inverters, AC-coupled vs DC-coupled systems, time-of-use tariffs, self-consumption optimisation, and grid services.',
  },
  {
    title: 'Heat Pumps and Electrification of Heating',
    description:
      'Air-source and ground-source heat pumps, electrical supply requirements, dedicated circuits, integration with solar PV, smart controls, and the Future Homes Standard implications for electricians.',
  },
  {
    title: 'EV Charging Infrastructure',
    description:
      'EV charger types (Mode 2, 3, 4), domestic and commercial installations, load management, smart charging, vehicle-to-grid (V2G) technology, and the IET Code of Practice for EV charging.',
  },
  {
    title: 'Waste Management and Circular Economy',
    description:
      'WEEE Regulations, hazardous waste disposal, cable recycling, fluorescent tube disposal, site waste management plans, material efficiency, and reducing waste in electrical installation work.',
  },
  {
    title: 'Green Building Standards and Certification',
    description:
      'BREEAM, LEED, and Passivhaus requirements for electrical installations. Sub-metering, renewable energy integration, lighting efficiency targets, and documentation for green building assessments.',
  },
];

const features = [
  {
    icon: BrainCircuit,
    title: 'AI Study Assistant',
    description:
      'Ask any sustainability question in plain English. Get detailed answers on energy efficiency, renewable technologies, waste regulations, and green building standards.',
  },
  {
    icon: Radio,
    title: 'Video Content',
    description:
      'Step-by-step video explanations of solar PV installation, heat pump wiring, LED lighting design, and waste management procedures — watch on any device.',
  },
  {
    icon: ClipboardCheck,
    title: 'Interactive Quizzes',
    description:
      'Test your knowledge after every module. Calculate energy savings, select appropriate renewable technologies, apply waste regulations, and design efficient lighting schemes.',
  },
  {
    icon: Clock,
    title: 'Study Planner',
    description:
      'Set your target completion date and Elec-Mate creates a personalised study schedule. Track daily progress and stay on course with reminder notifications.',
  },
  {
    icon: Layers,
    title: 'Flashcard Decks',
    description:
      'Spaced repetition flashcards covering renewable energy technologies, energy efficiency calculations, waste regulations, and green building requirements.',
  },
  {
    icon: FileCheck2,
    title: 'Energy Efficiency Tools',
    description:
      'Elec-Mate includes LED savings calculators, cable loss calculators, and energy consumption estimators to help you design efficient installations and demonstrate savings to clients.',
  },
];

const sections = [
  {
    id: 'why-sustainability',
    heading: 'Why Environmental Sustainability Matters for Electricians',
    content: (
      <>
        <p>
          The UK has committed to achieving net zero carbon emissions by 2050 under the Climate
          Change Act 2008. Reaching this target requires fundamental changes to how buildings are
          heated, how transport is powered, and how electricity is generated. Electricians are at
          the centre of every one of these changes.
        </p>
        <p>
          The electrification of heating (heat pumps replacing gas boilers), transport (electric
          vehicles replacing petrol and diesel), and power generation (solar PV and wind replacing
          fossil fuels) creates unprecedented demand for electrical installation work. The
          government estimates that 50,000 additional heat pump installers, 10,000 additional EV
          charger installers, and thousands of solar PV installers will be needed by 2030.
        </p>
        <p>
          For electricians, this represents the biggest opportunity in a generation. Those who
          develop green skills now — understanding{' '}
          <SEOInternalLink href="/training/energy-efficiency-course">
            energy efficiency
          </SEOInternalLink>
          , renewable energy technologies, and sustainable installation practices — will be in the
          strongest position to capture this growing market.
        </p>
        <p>
          Beyond the commercial opportunity, sustainability is increasingly a client expectation.
          Homeowners want lower energy bills and reduced carbon footprints. Commercial clients want
          to meet corporate sustainability targets. Developers need to comply with Building
          Regulations Part L and planning conditions. The electrician who can advise on these issues
          wins the work over the one who cannot.
        </p>
      </>
    ),
  },
  {
    id: 'energy-efficiency',
    heading: 'Energy Efficiency in Electrical Installations',
    content: (
      <>
        <p>
          Energy efficiency is the most cost-effective way to reduce carbon emissions and energy
          bills. Every kilowatt-hour of electricity that is not wasted is a kilowatt-hour that does
          not need to be generated. Electricians can make a significant impact through efficient
          design and installation practices.
        </p>
        <p>
          <strong>Lighting</strong> is the single largest opportunity. In commercial buildings,
          lighting accounts for 30% to 40% of electricity consumption. Converting from fluorescent
          to LED, adding presence detection so lights switch off in unoccupied areas, and installing
          daylight-linked dimming so artificial lighting reduces when natural light is sufficient
          can cut lighting energy use by 60% to 80%.
        </p>
        <p>
          <strong>Motor drives</strong> offer another major saving. In industrial and commercial
          buildings, electric motors (for HVAC fans, pumps, and compressors) can account for 50% or
          more of electricity consumption. Installing variable speed drives (VSDs) allows motors to
          run at the speed required by the process rather than at full speed continuously, reducing
          energy consumption by 20% to 50%.
        </p>
        <p>
          <strong>Power factor correction</strong> reduces reactive power demand, lowering
          electricity costs for commercial and industrial consumers and reducing losses in the
          distribution network. Electricians who can assess power factor and recommend correction
          equipment add value for their commercial clients.
        </p>
        <p>
          Even <strong>cable sizing</strong> affects energy efficiency. Over-long cable runs with
          undersized conductors increase resistive losses (I squared R losses), wasting energy as
          heat. Using the{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            cable sizing calculator
          </SEOInternalLink>{' '}
          in Elec-Mate ensures cables are sized for both safety and efficiency.
        </p>
        <SEOAppBridge
          title="Calculate energy savings for your clients"
          description="Use Elec-Mate's energy efficiency tools to demonstrate the savings from LED upgrades, motor drive installations, and power factor correction. Show clients the payback period and annual cost reduction in clear, professional reports."
          icon={Lightbulb}
        />
      </>
    ),
  },
  {
    id: 'renewable-energy',
    heading: 'Renewable Energy Technologies for Electricians',
    content: (
      <>
        <p>
          Renewable energy installation is the fastest-growing segment of the electrical industry.
          The four key technologies that every electrician should understand are solar PV, battery
          storage, heat pumps, and EV charging.
        </p>
        <div className="space-y-3 my-4">
          <div className="flex gap-4 p-5 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
            <Sun className="w-8 h-8 text-yellow-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Solar PV</h3>
              <p className="text-white text-sm leading-relaxed">
                Solar photovoltaic systems convert sunlight into electricity. A typical domestic
                system (3.5 to 4kWp) generates 3,000 to 4,000kWh per year, offsetting 30% to 50% of
                household electricity consumption. The{' '}
                <SEOInternalLink href="/training/solar-pv-installation">
                  solar PV installation course
                </SEOInternalLink>{' '}
                covers design, DC wiring, inverter selection, and MCS certification.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-blue-500/10 border border-blue-500/20">
            <Zap className="w-8 h-8 text-blue-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Battery Storage</h3>
              <p className="text-white text-sm leading-relaxed">
                Battery energy storage systems (BESS) store surplus solar generation for use in the
                evening, reducing grid imports and maximising self-consumption. Domestic systems
                typically range from 5kWh to 13.5kWh capacity. Integration with solar PV and
                time-of-use tariffs maximises financial returns.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-green-500/10 border border-green-500/20">
            <Wind className="w-8 h-8 text-green-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">Heat Pumps</h3>
              <p className="text-white text-sm leading-relaxed">
                Air-source heat pumps deliver 3 to 4kW of heat for every 1kW of electricity
                consumed. They are the primary replacement for gas boilers under the Future Homes
                Standard. Electricians need to understand supply capacity, dedicated circuits, and
                integration with other renewable technologies.
              </p>
            </div>
          </div>
          <div className="flex gap-4 p-5 rounded-2xl bg-purple-500/10 border border-purple-500/20">
            <Zap className="w-8 h-8 text-purple-400 shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-white text-lg mb-1">EV Charging</h3>
              <p className="text-white text-sm leading-relaxed">
                Electric vehicle adoption is accelerating, and every EV needs a charger. Domestic,
                commercial, and public charging installations are a growing market. The{' '}
                <SEOInternalLink href="/training/ev-charger-installation">
                  EV charger installation course
                </SEOInternalLink>{' '}
                covers the IET Code of Practice, load management, and smart charging.
              </p>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'waste-management',
    heading: 'Waste Management and the Circular Economy',
    content: (
      <>
        <p>
          Electrical installation work generates waste — cable offcuts, packaging, old equipment,
          fluorescent tubes, and general construction debris. How you manage this waste has both
          environmental and legal implications.
        </p>
        <p>
          The <strong>WEEE Regulations</strong> (Waste Electrical and Electronic Equipment) require
          that old electrical equipment removed during installation or upgrade work is disposed of
          through proper channels. This includes old consumer units, light fittings, switches,
          sockets, and any electrical appliance. WEEE must be taken to a registered collection
          facility or returned to the distributor — it must not be put in general waste skips.
        </p>
        <p>
          <strong>Fluorescent tubes and discharge lamps</strong> contain mercury and are classified
          as hazardous waste. They must be stored securely, transported by a licensed waste carrier,
          and disposed of at a facility licensed to handle hazardous waste. Breaking fluorescent
          tubes releases mercury vapour — always handle them carefully and store them in
          purpose-made containers.
        </p>
        <p>
          <strong>Cable offcuts</strong> have significant scrap value — copper cable is worth £4 to
          £6 per kilogram at current prices. Segregating cable offcuts and selling them to a
          licensed scrap metal dealer is both environmentally responsible and commercially sensible.
          Keep records of all scrap sales as required by the Scrap Metal Dealers Act 2013.
        </p>
        <p>
          The circular economy approach goes beyond waste disposal — it asks how waste can be
          prevented in the first place. Accurate material ordering, careful cable cutting to
          minimise offcuts, reusing packaging, and specifying products with recycled content all
          contribute to reducing the environmental impact of electrical installation work.
        </p>
      </>
    ),
  },
  {
    id: 'green-building',
    heading: 'Green Building Standards and Certifications',
    content: (
      <>
        <p>
          Green building certification schemes are increasingly common, particularly for commercial
          developments, public sector buildings, and larger residential projects. As an electrician,
          you need to understand how these schemes affect electrical specification and installation
          requirements.
        </p>
        <p>
          <strong>BREEAM</strong> (Building Research Establishment Environmental Assessment Method)
          is the most widely used scheme in the UK. Credits are awarded across categories including
          energy, materials, waste, health and wellbeing, and pollution. Electrical installation
          contributes to several of these categories: lighting efficiency, sub- metering, renewable
          energy, and material selection.
        </p>
        <p>
          <strong>Building Regulations Part L</strong> (Conservation of Fuel and Power) sets minimum
          energy efficiency standards for new buildings and major renovations. The 2021 update
          introduced significantly higher standards for fabric, heating, and ventilation efficiency.
          For electrical work, Part L affects lighting design (minimum efficacy requirements),
          lighting controls (presence detection and daylight dimming), metering (sub-metering for
          different end uses), and renewable energy (minimum renewable contribution).
        </p>
        <p>
          <strong>Passivhaus</strong> takes energy efficiency to an extreme level, designing
          buildings to need almost no active heating or cooling. Electrical work in Passivhaus
          projects requires careful attention to airtightness (cable penetrations must be sealed),
          heat recovery ventilation controls, and minimal energy consumption from all electrical
          services.
        </p>
        <SEOAppBridge
          title="Study green building requirements with AI guidance"
          description="Not sure how BREEAM credits affect your electrical design? Ask the Elec-Mate AI tutor about green building standards, Part L compliance, and sustainable installation practices."
          icon={BrainCircuit}
        />
      </>
    ),
  },
  {
    id: 'carbon-reduction',
    heading: 'Carbon Reduction: Practical Steps for Every Electrician',
    content: (
      <>
        <p>
          You do not need to be working on a BREEAM-rated project to reduce carbon emissions. Every
          electrical installation presents opportunities to minimise environmental impact. These
          practical steps apply to all electricians, on every job:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Recycle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Specify LED lighting as standard.</strong> There is no longer a valid reason
                to install fluorescent or halogen lighting in any new installation. LED is cheaper
                to run, lasts longer, contains no mercury, and produces better quality light.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Recycle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Recommend intelligent lighting controls.</strong> Presence detection in
                corridors, toilets, and meeting rooms. Daylight dimming in perimeter zones. Time
                scheduling for general areas. These controls prevent energy being wasted lighting
                unoccupied or already well-lit spaces.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Recycle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Size cables for efficiency, not just safety.</strong> A cable that meets the
                minimum safety requirement under BS 7671 may still have significant resistive
                losses. Going up one cable size reduces I squared R losses and the energy wasted as
                heat — over the life of the installation, this saves more carbon than the additional
                copper used.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Recycle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimise waste on site.</strong> Order materials accurately to avoid
                surplus. Segregate waste for recycling. Dispose of hazardous waste properly. Sell
                copper offcuts rather than putting them in the skip.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Recycle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Talk to clients about renewable energy.</strong> Every domestic rewire,
                consumer unit change, or new installation is an opportunity to discuss solar PV,
                battery storage, EV charging, and heat pump readiness. Even if the client does not
                want to install renewables now, you can future-proof the installation with spare
                ways, adequate supply capacity, and suitable cable routes.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Carbon reduction is not just an environmental imperative — it is a commercial opportunity.
          Clients who want energy-efficient, low-carbon installations are typically willing to pay
          more for quality work and expert advice. Position yourself as the electrician who
          understands sustainability and you will win higher-value work.
        </p>
      </>
    ),
  },
];

const relatedPages = [
  {
    href: '/training/energy-efficiency-course',
    title: 'Energy Efficiency Course',
    description:
      'Detailed training on LED design, lighting controls, motor efficiency, and Building Regulations Part L compliance.',
    icon: Lightbulb,
    category: 'Training' as const,
  },
  {
    href: '/training/solar-pv-installation',
    title: 'Solar PV Installation Course',
    description:
      'Solar PV system design, DC wiring, inverter selection, and MCS certification training.',
    icon: Sun,
    category: 'Training' as const,
  },
  {
    href: '/training/ev-charger-installation',
    title: 'EV Charger Installation Course',
    description:
      'Electric vehicle charger installation — IET Code of Practice, load management, and smart charging.',
    icon: Zap,
    category: 'Training' as const,
  },
  {
    href: '/training/renewable-energy',
    title: 'Renewable Energy Course',
    description:
      'Comprehensive renewable energy training covering solar, wind, battery storage, and heat pumps.',
    icon: Wind,
    category: 'Training' as const,
  },
  {
    href: '/guides/electrical-specialisations',
    title: 'Electrical Specialisations Guide',
    description:
      'Explore green energy specialisms and other career paths for qualified electricians.',
    icon: BookOpen,
    category: 'Guide' as const,
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Size cables for both safety and efficiency — minimise resistive losses while meeting BS 7671 requirements.',
    icon: FileCheck2,
    category: 'Tool' as const,
  },
];

const extraSchemas = [
  {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: 'Environmental Sustainability Course for Electricians',
    description: PAGE_DESCRIPTION,
    provider: {
      '@type': 'Organization',
      name: 'Elec-Mate',
      url: 'https://elec-mate.com',
    },
    educationalLevel: 'Intermediate',
    inLanguage: 'en-GB',
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: 'online',
      courseWorkload: 'PT12H',
    },
    offers: {
      '@type': 'Offer',
      price: '4.99',
      priceCurrency: 'GBP',
      availability: 'https://schema.org/InStock',
      description: '7-day free trial, then from £4.99/month',
    },
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function EnvironmentalSustainabilityCoursePage() {
  return (
    <CourseTemplate
      title={PAGE_TITLE}
      description={PAGE_DESCRIPTION}
      datePublished="2025-07-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Green Skills Training"
      badgeIcon={Leaf}
      heroTitle={
        <>
          Environmental Sustainability:{' '}
          <span className="text-yellow-400">Green Skills for Electricians</span>
        </>
      }
      heroSubtitle="Master energy efficiency, renewable energy, waste management, and green building standards. 8 modules with video content, interactive quizzes, and AI-powered study tools for the electricians driving the UK net zero transition."
      readingTime={15}
      courseDuration="12 hours"
      courseLevel="Intermediate"
      coursePrerequisites="Level 3 electrical qualification or equivalent experience recommended — suitable for all electricians wanting to develop green skills"
      courseModules={8}
      courseCertification="CPD certificate on completion — evidence of green skills development for clients and employers"
      courseWhoIsItFor="Electricians wanting to specialise in renewable energy and energy efficiency, domestic installers expanding into solar PV and EV charging, and contractors positioning their business for the net zero transition"
      keyTakeaways={keyTakeaways}
      sections={sections}
      modules={modules}
      features={features}
      faqs={faqs}
      relatedPages={relatedPages}
      ctaHeading="Develop your green skills today"
      ctaSubheading="Join 430+ UK electricians building future-proof careers with Elec-Mate. Sustainability modules, energy efficiency tools, and an AI tutor for any green skills question. 7-day free trial, cancel anytime."
      extraSchemas={extraSchemas}
      coursePath="/training/environmental-sustainability"
    />
  );
}
