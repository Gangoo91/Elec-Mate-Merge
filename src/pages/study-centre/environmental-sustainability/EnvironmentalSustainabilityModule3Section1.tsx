import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Leaf,
  Zap,
  Gauge,
  Building,
  Wrench,
  Battery,
  Lightbulb,
  Sun,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'es-site-energy-source',
    question:
      'Which energy source typically accounts for the largest share of energy consumption on a UK construction site?',
    options: [
      'Grid electricity for lighting',
      'Diesel fuel for generators, plant, and vehicles',
      'Natural gas for site office heating',
      'Renewable solar energy from temporary panels',
    ],
    correctIndex: 1,
    explanation:
      'Diesel fuel for generators, plant, and vehicles typically accounts for 60-70% of total energy consumption on UK construction sites. This includes mobile plant such as excavators and telehandlers, fixed diesel generators providing temporary power, and site delivery vehicles. Reducing diesel dependency is therefore the single most impactful energy-saving measure available on most sites.',
  },
  {
    id: 'es-efficient-accommodation',
    question:
      'What is the most effective way to reduce energy consumption in temporary site accommodation?',
    options: [
      'Running the heating continuously to maintain a steady temperature',
      'Using fully insulated cabins with LED lighting, motion sensors, and timer controls',
      'Keeping all windows open to improve natural ventilation',
      'Using portable fan heaters in every office and welfare unit',
    ],
    correctIndex: 1,
    explanation:
      'Fully insulated cabins with LED lighting, motion sensors, and timer controls dramatically reduce energy consumption in site accommodation. Modern eco-cabins can reduce energy use by up to 70% compared to standard uninsulated units. The combination of good insulation, efficient lighting, and automatic controls eliminates the largest sources of energy waste in temporary buildings.',
  },
  {
    id: 'es-generator-sizing',
    question:
      'Why is correct generator sizing (right-sizing) important for energy efficiency on construction sites?',
    options: [
      'Smaller generators are cheaper to hire so they save money regardless of efficiency',
      'Oversized generators run at low load factors, wasting fuel and increasing emissions significantly',
      'Generator size has no effect on fuel consumption or emissions',
      'Larger generators always produce cleaner exhaust emissions',
    ],
    correctIndex: 1,
    explanation:
      'Oversized generators running at low load factors (below 30% of rated capacity) consume significantly more fuel per unit of useful electricity generated. A generator running at 25% load can waste up to 40% more fuel per kWh than one running at 75% load. Right-sizing — matching generator capacity to actual site demand — is one of the simplest and most cost-effective energy efficiency measures for construction sites.',
  },
];

const faqs = [
  {
    question:
      'What is a typical energy benchmark (kWh/m\u00B2) for construction projects, and how is it used?',
    answer:
      'Energy benchmarks for construction sites typically range from 80-120 kWh/m\u00B2 of gross floor area for new-build projects, though this varies significantly by project type, complexity, and duration. The benchmark is calculated by dividing total site energy consumption (from all sources including diesel, electricity, and gas) by the gross internal floor area of the completed building. Benchmarking allows project teams to compare energy performance against industry averages, identify projects that are consuming more energy than expected, set reduction targets for future projects, and track improvements over time. Organisations such as WRAP and the Construction Leadership Council publish benchmark data that can be used for comparison.',
  },
  {
    question:
      'What are Scope 1, 2, and 3 emissions in the context of construction, and why do they matter?',
    answer:
      'Scope 1 emissions are direct emissions from sources owned or controlled by the organisation — on a construction site this includes diesel burned in generators, plant, and vehicles, gas used for heating, and any other on-site combustion. Scope 2 emissions are indirect emissions from purchased electricity — the carbon generated at the power station to produce the electricity consumed on site. Scope 3 emissions cover everything else in the value chain — the embodied carbon in materials, transport of materials to site, waste disposal, employee commuting, and subcontractor activities. For construction companies, Scope 3 emissions typically account for over 90% of total carbon footprint, but Scopes 1 and 2 are the most directly controllable on site. Reporting against all three scopes is increasingly required by clients, regulators, and investors under frameworks such as the Greenhouse Gas Protocol and the Task Force on Climate-related Financial Disclosures (TCFD).',
  },
  {
    question:
      'How do battery energy storage systems (BESS) work on construction sites, and what are their benefits?',
    answer:
      'Battery energy storage systems on construction sites typically use lithium-ion battery packs housed in weatherproof containers that can be charged from the grid, solar panels, or generators during periods of low demand. The stored energy is then discharged to power site loads during peak demand periods, overnight, or when the generator would otherwise run at low load. Key benefits include: eliminating the need to run generators overnight for security lighting and monitoring; allowing generators to be switched off during low-demand periods; enabling solar energy to be stored during the day for use in the evening; reducing generator runtime by 50-70% on some sites; significantly cutting diesel consumption, noise pollution, and carbon emissions; and providing silent power for residential and noise-sensitive sites. Some modern BESS units can fully replace generators on smaller sites or during certain construction phases.',
  },
  {
    question:
      'What are hydrogen fuel cells, and are they a practical option for construction sites currently?',
    answer:
      'Hydrogen fuel cells generate electricity through an electrochemical reaction between hydrogen and oxygen, producing only water vapour as a by-product — zero carbon emissions at point of use. For construction sites, hydrogen fuel cells offer silent, emission-free power that is particularly attractive for urban sites with strict noise and air quality requirements. However, current practical limitations include: the cost of hydrogen fuel cells remains significantly higher than diesel generators; green hydrogen (produced from renewable electricity via electrolysis) is still limited in supply and distribution infrastructure; most hydrogen currently available is "grey hydrogen" produced from natural gas, which has a significant carbon footprint; on-site hydrogen storage requires specialist safety management; and refuelling logistics can be challenging for remote sites. Despite these challenges, several major UK contractors are trialling hydrogen fuel cells on flagship projects, and the technology is expected to become increasingly viable as green hydrogen production scales up during the late 2020s and 2030s.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What percentage of total energy consumption on a typical UK construction site comes from diesel fuel?',
    options: [
      '20-30%',
      '40-50%',
      '60-70%',
      '80-90%',
    ],
    correctAnswer: 2,
    explanation:
      'Diesel fuel typically accounts for 60-70% of total energy consumption on UK construction sites. This includes diesel for generators providing temporary electrical power, mobile plant such as excavators and cranes, and site delivery vehicles. The dominance of diesel makes it the primary target for energy reduction strategies on most construction projects.',
  },
  {
    id: 2,
    question:
      'Which greenhouse gas emission scope covers purchased electricity consumed on a construction site?',
    options: [
      'Scope 1 — direct combustion emissions',
      'Scope 2 — indirect emissions from purchased electricity',
      'Scope 3 — supply chain and value chain emissions',
      'Scope 4 — avoided emissions from renewable energy',
    ],
    correctAnswer: 1,
    explanation:
      'Scope 2 covers indirect emissions from purchased electricity. The carbon emissions are generated at the power station, not on site, but the construction site is responsible for them because it purchases and consumes the electricity. Scope 2 emissions can be reduced by using green tariffs, on-site renewables, or reducing overall electricity consumption.',
  },
  {
    id: 3,
    question:
      'What unit is commonly used to benchmark energy consumption on construction projects?',
    options: [
      'Litres of diesel per worker',
      'kWh per square metre (kWh/m\u00B2) of gross floor area',
      'Tonnes of CO\u2082 per calendar month',
      'Megawatts per crane operating hour',
    ],
    correctAnswer: 1,
    explanation:
      'kWh per square metre (kWh/m\u00B2) of gross floor area is the standard benchmarking unit for construction site energy consumption. It normalises energy use against building size, allowing meaningful comparison between projects of different scales. Typical benchmarks for new-build projects range from 80-120 kWh/m\u00B2, though this varies by project type and complexity.',
  },
  {
    id: 4,
    question:
      'Modern eco-cabins with insulation, LED lighting, and motion sensors can reduce energy use in site accommodation by up to:',
    options: [
      '20% compared to standard cabins',
      '40% compared to standard cabins',
      '70% compared to standard cabins',
      '95% compared to standard cabins',
    ],
    correctAnswer: 2,
    explanation:
      'Modern eco-cabins can reduce energy consumption by up to 70% compared to standard uninsulated site accommodation. The savings come from superior insulation reducing heating demand, LED lighting using 80% less energy than fluorescent tubes, motion sensors preventing lights being left on in unoccupied spaces, timer controls on heating systems, and solar panels supplementing grid or generator power.',
  },
  {
    id: 5,
    question:
      'What engine emission standard must modern off-road construction plant comply with in the UK?',
    options: [
      'Euro 6 — the same standard as road vehicles',
      'Tier 4 Final / EU Stage V — specific to non-road mobile machinery',
      'BREEAM Outstanding — the highest sustainability rating',
      'BS 7671 18th Edition — the IET Wiring Regulations',
    ],
    correctAnswer: 1,
    explanation:
      'Modern off-road construction plant must comply with Tier 4 Final (US standard) or EU Stage V emission standards for non-road mobile machinery (NRMM). These standards dramatically reduce particulate matter (PM) and nitrogen oxide (NOx) emissions compared to older engines. Many London boroughs and major clients now require all plant on site to meet Stage V as a minimum through NRMM Low Emission Zone requirements.',
  },
  {
    id: 6,
    question:
      'A diesel generator running at 25% load compared to one running at 75% load will typically:',
    options: [
      'Use the same amount of fuel per kWh of electricity produced',
      'Use significantly less fuel because it is working less hard',
      'Waste up to 40% more fuel per kWh of electricity produced',
      'Produce cleaner exhaust emissions due to lower combustion temperatures',
    ],
    correctAnswer: 2,
    explanation:
      'A diesel generator running at only 25% of its rated capacity wastes up to 40% more fuel per kWh of useful electricity generated compared to one running at 75% load. This is because the engine still consumes a base amount of fuel regardless of electrical output. Generator right-sizing — matching capacity to actual demand — is therefore critical for fuel efficiency and emissions reduction.',
  },
  {
    id: 7,
    question:
      'Which of the following is the most effective "good housekeeping" energy-saving measure on a construction site?',
    options: [
      'Painting all temporary buildings white to reflect sunlight',
      'Switching off plant, equipment, and lighting when not in use',
      'Using the largest available generator to ensure power supply is never interrupted',
      'Running all equipment at maximum speed to complete tasks faster',
    ],
    correctAnswer: 1,
    explanation:
      'Switching off plant, equipment, and lighting when not in use is the single most effective good housekeeping measure for energy saving on construction sites. Studies show that plant and equipment idle time can account for 30-40% of operating hours on poorly managed sites. A disciplined switch-off culture, supported by awareness campaigns and energy champions, can reduce site energy consumption by 10-15% with zero capital cost.',
  },
  {
    id: 8,
    question:
      'Which renewable energy technology is most commonly deployed on construction sites today?',
    options: [
      'Wind micro-generation turbines mounted on tower cranes',
      'Hydrogen fuel cells powered by green hydrogen',
      'Solar PV panels integrated with battery storage and hybrid generators',
      'Geothermal heat pumps installed beneath the site compound',
    ],
    correctAnswer: 2,
    explanation:
      'Solar PV panels integrated with battery energy storage systems (BESS) and hybrid generators are the most commonly deployed renewable energy technology on UK construction sites today. Solar-hybrid systems combine solar panels, battery storage, and a small diesel generator — the solar panels charge the batteries during daylight hours, the batteries provide power during low-demand periods, and the generator only runs when demand exceeds stored capacity. This combination can reduce diesel consumption by 50-80% on suitable sites.',
  },
];

export default function EnvironmentalSustainabilityModule3Section1() {
  useSEO({
    title: 'Energy Use on Construction Sites | Environmental & Sustainability Module 3.1',
    description:
      'Site energy sources, carbon emissions, monitoring, efficient accommodation, plant efficiency, temporary power, good housekeeping, and renewable energy for UK construction professionals.',
  });

  return (
    <div className="overflow-x-hidden bg-[#1a1a1a]">
      {/* Sticky Header */}
      <div className="border-b border-white/10 sticky top-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-sm">
        <div className="px-4 sm:px-6 py-2">
          <Button
            variant="ghost"
            size="lg"
            className="min-h-[44px] px-3 -ml-3 text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
        </div>
      </div>

      <article className="px-4 sm:px-6 lg:px-8 py-8 sm:py-12 max-w-6xl mx-auto">
        {/* Page Title */}
        <header className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-emerald-400/20 border border-emerald-500/30 mb-4">
            <Leaf className="h-7 w-7 text-emerald-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-400 text-xs font-semibold">MODULE 3 &middot; SECTION 1</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Energy Use on Construction Sites
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Understanding energy sources, carbon emissions, monitoring techniques, and practical
            strategies for reducing energy consumption across construction operations
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Diesel dominates:</strong> 60-70% of site energy from generators &amp; plant
              </li>
              <li>
                <strong>Three scopes:</strong> Direct, purchased electricity, supply chain
              </li>
              <li>
                <strong>Benchmark:</strong> 80-120 kWh/m&sup2; for typical new-build projects
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400/90 text-base font-medium mb-2">On Site</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Right-size generators:</strong> Low load = 40% more fuel waste per kWh
              </li>
              <li>
                <strong>Eco-cabins:</strong> Up to 70% less energy than standard units
              </li>
              <li>
                <strong>Switch-off culture:</strong> 10-15% savings with zero capital cost
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Identify the main energy sources used on construction sites and their relative proportions',
              'Explain Scope 1, 2, and 3 carbon emissions and the Greenhouse Gas Protocol',
              'Describe site energy monitoring techniques including metering and benchmarking',
              'Identify measures for reducing energy in temporary site accommodation',
              'Explain plant and equipment efficiency standards including Stage V engines',
              'Compare temporary power solutions including generators, BESS, and solar hybrids',
              'Apply good housekeeping principles to reduce energy waste on site',
              'Evaluate renewable energy options for construction sites',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01 — Energy Consumption in Construction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">01</span>
            Energy Consumption in Construction
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Construction sites are <strong>energy-intensive operations</strong> that consume
                significant quantities of diesel, electricity, and gas throughout every phase of a
                project. Understanding where energy is consumed is the essential first step towards
                reducing it. The UK construction industry accounts for approximately 10% of national
                carbon emissions, and energy use on site is a major contributor.
              </p>

              {/* Energy Sources */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Zap className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Primary Energy Sources on Site</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Construction sites typically rely on four main energy sources, each serving
                  different operational needs. The balance between these sources varies depending
                  on project type, location, duration, and phase of construction.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Diesel generators:</strong> The dominant energy
                      source on most sites, providing temporary electrical power before permanent grid
                      connections are established. Generators power site lighting, welfare facilities,
                      tower cranes, hoists, and power tools. They are inherently inefficient — typically
                      converting only 30-40% of fuel energy into useful electricity.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Grid electricity:</strong> Where available, a
                      temporary grid connection provides more efficient and lower-carbon power than
                      diesel generators. Grid connections are typically established as early as possible
                      in the project programme. The carbon intensity of grid electricity depends on the
                      national energy mix and time of day.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Gas heating:</strong> Propane or natural gas is
                      used for heating site accommodation (offices, welfare units, drying rooms) and
                      for some construction processes such as concrete curing. LPG (liquefied petroleum
                      gas) cylinders are the most common gas source on sites without a mains gas supply.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Plant and vehicles:</strong> Mobile plant
                      (excavators, telehandlers, dumpers, cranes) and delivery vehicles consume large
                      quantities of diesel fuel. Plant fuel consumption is heavily influenced by operator
                      behaviour, machine age and condition, and the efficiency of site logistics.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Site Energy Breakdown Diagram */}
              <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
                <p className="text-sm font-medium text-emerald-400 mb-3 text-center">
                  Typical Site Energy Sources Breakdown
                </p>
                <p className="text-xs text-white/50 mb-4 text-center">
                  Approximate energy consumption by source on a typical UK construction site
                </p>
                <div className="max-w-md mx-auto space-y-3">
                  {[
                    { label: 'Diesel — Generators', pct: 35, colour: 'bg-red-500' },
                    { label: 'Diesel — Plant & Vehicles', pct: 30, colour: 'bg-orange-500' },
                    { label: 'Grid Electricity', pct: 20, colour: 'bg-blue-500' },
                    { label: 'Gas Heating (LPG/Mains)', pct: 10, colour: 'bg-amber-500' },
                    { label: 'Other (renewables, etc.)', pct: 5, colour: 'bg-emerald-500' },
                  ].map((item, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-xs text-white/80 mb-1">
                        <span>{item.label}</span>
                        <span className="font-semibold">{item.pct}%</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-3">
                        <div
                          className={`${item.colour} h-3 rounded-full`}
                          style={{ width: `${item.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-white/40 mt-4 text-center">
                  Diesel (generators + plant/vehicles) accounts for approximately 60-70% of total
                  site energy consumption
                </p>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Key Point</p>
                </div>
                <p className="text-sm text-white/80">
                  Because diesel dominates construction site energy use, the{' '}
                  <strong className="text-white">
                    greatest opportunity for energy reduction lies in reducing diesel consumption
                  </strong>{' '}
                  — through more efficient plant, better generator management, early grid
                  connections, and the adoption of electric and hybrid alternatives. Even small
                  percentage reductions in diesel use translate into significant carbon and cost
                  savings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02 — Carbon Emissions from Energy */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">02</span>
            Carbon Emissions from Energy
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Every unit of energy consumed on a construction site generates{' '}
                <strong>greenhouse gas (GHG) emissions</strong> that contribute to climate change.
                The <strong>Greenhouse Gas Protocol</strong> — the internationally recognised
                standard for carbon accounting — categorises emissions into three scopes to provide
                a comprehensive picture of an organisation&rsquo;s carbon footprint.
              </p>

              {/* Three Scopes */}
              <div className="space-y-3">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-bold text-red-400 mb-2">Scope 1 — Direct Emissions</p>
                  <p className="text-sm text-white/80 mb-2">
                    Emissions from sources directly owned or controlled by the organisation. On
                    a construction site, Scope 1 includes:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>Diesel burned in generators owned or hired by the contractor</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>Diesel and petrol used by company-owned plant and vehicles</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>Gas (LPG, propane, natural gas) burned for site heating</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>Refrigerant leakage from air conditioning and cooling systems</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-blue-500/10 border border-blue-500/30 p-4 rounded-lg">
                  <p className="text-sm font-bold text-blue-400 mb-2">Scope 2 — Purchased Electricity</p>
                  <p className="text-sm text-white/80 mb-2">
                    Indirect emissions from the generation of purchased electricity consumed on
                    site. The emissions occur at the power station, not on the construction site,
                    but the site is responsible because it consumes the electricity.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                      <span>Grid electricity for site power, lighting, and welfare</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                      <span>
                        Carbon intensity varies — UK grid average is approximately 0.21 kg CO&#8322;e/kWh
                        (2024 figure) but falling as renewables increase
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-blue-400" />
                      <span>Green tariffs and Renewable Energy Guarantees of Origin (REGOs) can reduce reported Scope 2</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                  <p className="text-sm font-bold text-amber-400 mb-2">Scope 3 — Supply Chain &amp; Value Chain</p>
                  <p className="text-sm text-white/80 mb-2">
                    All other indirect emissions in the organisation&rsquo;s value chain. For
                    construction, Scope 3 typically accounts for{' '}
                    <strong className="text-white">over 90%</strong> of total emissions:
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                      <span>Embodied carbon in materials (concrete, steel, aluminium, plastics)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                      <span>Transport of materials and waste to and from site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                      <span>Subcontractor activities and their energy consumption</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                      <span>Employee and worker commuting to site</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-amber-400" />
                      <span>Waste disposal and treatment</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">The Greenhouse Gas Protocol</p>
                <p className="text-sm text-white/80">
                  The Greenhouse Gas Protocol is the world&rsquo;s most widely used greenhouse gas
                  accounting framework. It provides standardised methods for measuring and reporting
                  emissions across all three scopes. In the UK construction industry, carbon
                  reporting is increasingly required by clients (particularly public sector clients),
                  building rating systems (BREEAM, LEED), and financial regulators. The UK
                  Government&rsquo;s Streamlined Energy and Carbon Reporting (SECR) framework
                  requires qualifying organisations to report Scope 1 and 2 emissions annually.
                  Major contractors are also voluntarily reporting Scope 3 emissions as part of
                  their commitment to net-zero carbon targets.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03 — Site Energy Monitoring */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">03</span>
            Site Energy Monitoring
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                <strong>&ldquo;You cannot manage what you cannot measure.&rdquo;</strong> Effective
                energy management on construction sites begins with accurate monitoring. Without
                data on where and how energy is being consumed, it is impossible to identify waste,
                set reduction targets, or verify that efficiency measures are working.
              </p>

              {/* Metering */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Gauge className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Metering &amp; Sub-Metering</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Main meters:</strong> All energy supplies to
                      site — grid electricity, diesel deliveries, gas supplies — must be metered and
                      recorded. Diesel is typically tracked through delivery records and tank dip
                      readings; electricity and gas through utility meters.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Sub-metering:</strong> Installing sub-meters on
                      major energy-consuming systems — tower cranes, hoists, site accommodation,
                      concrete batching — identifies the largest energy consumers and reveals
                      opportunities for targeted reduction. Sub-metering typically reveals that 20%
                      of site systems consume 80% of total energy.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Fuel management systems:</strong> Automated
                      diesel dispensing systems record fuel drawn by each machine, preventing
                      unauthorised use and providing accurate consumption data per item of plant.
                      These systems often use RFID tags linked to individual machines and operators.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Smart Monitoring */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Smart Monitoring &amp; Dashboards</p>
                <p className="text-sm text-white/80 mb-3">
                  Modern construction sites increasingly use IoT (Internet of Things) sensors and
                  cloud-based dashboards to monitor energy consumption in real time:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Real-time dashboards:</strong> Web-based
                      platforms displaying live energy data from across the site, accessible on
                      phones and tablets. These dashboards highlight abnormal consumption
                      patterns, equipment left running overnight, and week-on-week trends.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Automated alerts:</strong> Smart systems can
                      send automatic notifications when energy consumption exceeds predefined
                      thresholds — for example, alerting the site manager if a generator is running
                      overnight when no work is scheduled.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Generator telemetry:</strong> Modern generators
                      are equipped with telematics that report fuel level, load factor, running
                      hours, and service requirements remotely. This data enables proactive
                      management and prevents generators running unnecessarily.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Benchmarking */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Benchmarking (kWh/m&sup2;)
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Energy benchmarking normalises consumption against building size to enable
                  meaningful comparison between projects:
                </p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-lg text-center">
                    <p className="text-lg font-bold text-emerald-400 mb-1">80-120</p>
                    <p className="text-xs text-white/70">kWh/m&sup2; &mdash; typical new-build</p>
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-lg text-center">
                    <p className="text-lg font-bold text-emerald-400 mb-1">120-200</p>
                    <p className="text-xs text-white/70">kWh/m&sup2; &mdash; complex refurbishment</p>
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-lg text-center">
                    <p className="text-lg font-bold text-emerald-400 mb-1">&lt;60</p>
                    <p className="text-xs text-white/70">kWh/m&sup2; &mdash; best practice target</p>
                  </div>
                </div>
                <p className="text-xs text-white/50 mt-3">
                  Benchmarks calculated as total site energy (all sources, converted to kWh) &divide;
                  gross internal floor area of the completed building
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04 — Efficient Site Accommodation */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">04</span>
            Efficient Site Accommodation
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Temporary site accommodation — offices, meeting rooms, welfare facilities, drying
                rooms — can account for <strong>15-25% of total site electricity consumption</strong>.
                Much of this energy is wasted through poor insulation, inefficient lighting, and
                heating systems running in unoccupied spaces. Modern eco-cabins and simple
                behavioural changes can dramatically reduce this waste.
              </p>

              {/* Eco-cabin Features */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Building className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Modern Eco-Cabin Features</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Insulated panels:</strong> Modern site cabins
                      use high-performance insulated wall, floor, and roof panels (typically 60-100mm
                      PIR or mineral wool insulation) that dramatically reduce heat loss compared to
                      standard steel containers. Double-glazed windows with low-emissivity coatings
                      further improve thermal performance.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">LED lighting:</strong> LED luminaires use up to
                      80% less energy than traditional fluorescent tubes and last significantly longer.
                      The improved light quality also reduces eye strain and improves working
                      conditions in site offices. LED lighting should be standard in all new and
                      replacement site accommodation.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Motion sensors (PIR):</strong> Passive infrared
                      sensors automatically switch off lighting when spaces are unoccupied. In
                      welfare facilities, toilets, and corridors that are intermittently used,
                      motion sensors can reduce lighting energy by 40-60% by eliminating the common
                      problem of lights being left on in empty rooms.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Timer controls:</strong> Programmable timers on
                      heating and hot water systems ensure they only operate during occupied hours.
                      A heating system running from 06:00 to 18:00 rather than 24 hours saves 50%
                      of heating energy. Seven-day timers allow different schedules for weekdays
                      and weekends.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Efficient heating systems:</strong> Modern
                      eco-cabins use energy-efficient electric panel heaters or air-source heat
                      pumps with individual thermostatic controls in each room, replacing
                      inefficient fan heaters and convectors. Heat pumps can deliver 3-4 kWh of
                      heat for every 1 kWh of electricity consumed.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Solar panels on site offices:</strong> Roof-mounted
                      solar PV panels on site accommodation can generate a significant proportion of
                      the cabin&rsquo;s daytime electricity needs, particularly during spring and
                      summer months. Combined with battery storage, solar-equipped cabins can operate
                      largely independently of the site generator during daylight hours.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Practical Impact</p>
                </div>
                <p className="text-sm text-white/80">
                  A fully specified eco-cabin with insulation, LED lighting, motion sensors, timer
                  controls, and efficient heating can reduce energy consumption by{' '}
                  <strong className="text-white">up to 70%</strong> compared to a standard
                  uninsulated site cabin. Over a typical two-year project duration, this equates to
                  thousands of pounds in fuel savings and a significant reduction in carbon
                  emissions. The marginal additional hire cost of an eco-cabin is typically
                  recovered within the first few months through energy savings.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05 — Plant & Equipment Efficiency */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">05</span>
            Plant &amp; Equipment Efficiency
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Mobile plant and equipment — excavators, telehandlers, dumpers, cranes, and powered
                hand tools — account for a substantial proportion of site diesel consumption.{' '}
                <strong>Specifying modern, efficient plant</strong> and managing its use effectively
                are key strategies for reducing site energy consumption and emissions.
              </p>

              {/* Engine Standards */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Wrench className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">
                    Modern Engine Standards: Tier 4 / Stage V
                  </p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  The latest emission standards for non-road mobile machinery (NRMM) are{' '}
                  <strong className="text-white">Tier 4 Final</strong> (US standard) and{' '}
                  <strong className="text-white">EU Stage V</strong>. These standards require
                  dramatic reductions in harmful emissions compared to older engines:
                </p>
                <div className="grid sm:grid-cols-2 gap-3 mb-3">
                  <div className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-lg">
                    <p className="text-sm font-bold text-emerald-400 mb-1">Particulate Matter (PM)</p>
                    <p className="text-xs text-white/70">
                      Reduced by up to 97% compared to pre-regulation engines. Stage V engines use
                      diesel particulate filters (DPF) to capture soot particles.
                    </p>
                  </div>
                  <div className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-lg">
                    <p className="text-sm font-bold text-emerald-400 mb-1">Nitrogen Oxides (NOx)</p>
                    <p className="text-xs text-white/70">
                      Reduced by up to 90%. Stage V engines use selective catalytic reduction (SCR)
                      with AdBlue/DEF to convert NOx into harmless nitrogen and water.
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white/80">
                  Many London boroughs and major clients now mandate Stage V compliance for all
                  plant on site through <strong className="text-white">Non-Road Mobile Machinery
                  (NRMM) Low Emission Zone</strong> requirements. Specifying Stage V plant is
                  increasingly standard practice across the UK construction industry.
                </p>
              </div>

              {/* Hybrid & Electric */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Hybrid Plant &amp; Electric Tools
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Hybrid excavators:</strong> Combine diesel
                      engines with electric motors and energy recovery systems. The electric motor
                      captures energy during slew braking and boom lowering, storing it in batteries
                      or supercapacitors for reuse. Fuel savings of 25-40% are typical compared to
                      conventional diesel-only machines.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Electric hand tools:</strong> Battery-powered
                      cordless tools (drills, saws, grinders, impact drivers) running on lithium-ion
                      batteries are significantly more energy-efficient than petrol-powered
                      equivalents and produce zero direct emissions. Modern battery platforms provide
                      performance comparable to mains-powered tools for most applications.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Electric mini-excavators:</strong> Fully electric
                      compact excavators are now commercially available from major manufacturers.
                      These machines produce zero direct emissions and operate at significantly lower
                      noise levels — making them ideal for urban sites, indoor demolition, and
                      noise-sensitive environments.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Telematics & Stop-Start */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Telematics for Utilisation Monitoring</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>GPS tracking shows actual vs. planned machine utilisation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Identifies machines with low utilisation that could be off-hired</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Reports excessive idle time — engines running with no productive work</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Data enables informed decisions on fleet right-sizing</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Stop-Start Technology</p>
                  <ul className="text-sm text-white/80 space-y-2">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Automatically shuts down engines after a set idle period (typically 3-5 minutes)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Engine restarts automatically when the operator moves the controls</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Can reduce idle fuel consumption by 20-30%</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Available as factory-fit or aftermarket retrofit on many machines</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06 — Temporary Power Solutions */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">06</span>
            Temporary Power Solutions
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The choice of temporary power supply is one of the{' '}
                <strong>most significant energy decisions</strong> on any construction project.
                Moving from oversized diesel generators to right-sized, hybrid, and renewable
                power solutions can reduce energy costs by 30-80% and eliminate thousands of
                tonnes of CO&#8322; emissions over a project&rsquo;s lifetime.
              </p>

              {/* Generator Right-Sizing */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Battery className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Generator Sizing (Right-Sizing)</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Generator right-sizing means matching the generator&rsquo;s rated capacity to the
                  actual electrical demand on site. This sounds obvious, but many construction sites
                  operate with grossly oversized generators — often specified based on peak demand
                  that occurs for only a small fraction of the project duration.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Low load penalty:</strong> A generator running at
                      25% load wastes up to 40% more fuel per kWh than one running at 75% load. The
                      engine still consumes a base level of fuel regardless of electrical output,
                      so the less electricity produced, the worse the fuel efficiency.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Wet stacking:</strong> Generators running
                      continuously at very low loads (below 30%) suffer from &ldquo;wet
                      stacking&rdquo; — unburned fuel accumulates in the exhaust system, causing
                      maintenance problems, reduced lifespan, and increased emissions.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Stage-by-stage approach:</strong> Rather than
                      specifying one large generator for the entire project, use different generator
                      sizes for different construction phases — smaller units for early works and
                      fit-out, larger units only for the high-demand structural phase.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Grid vs Generator */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Grid Connections vs. Generators
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="bg-emerald-500/5 border border-emerald-500/20 p-3 rounded-lg">
                    <p className="text-sm font-bold text-emerald-400 mb-2">Early Grid Connection</p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>&bull; 2-3x more efficient than diesel generators</li>
                      <li>&bull; Significantly lower carbon intensity per kWh</li>
                      <li>&bull; Quieter operation — reduces noise complaints</li>
                      <li>&bull; No fuel deliveries, storage, or spill risks</li>
                      <li>&bull; Can be supplied on green tariffs for near-zero Scope 2</li>
                      <li>&bull; Requires DNO application lead time (8-16 weeks typical)</li>
                    </ul>
                  </div>
                  <div className="bg-red-500/5 border border-red-500/20 p-3 rounded-lg">
                    <p className="text-sm font-bold text-red-400 mb-2">Diesel Generator</p>
                    <ul className="text-xs text-white/70 space-y-1">
                      <li>&bull; 30-40% fuel-to-electricity conversion efficiency</li>
                      <li>&bull; High carbon emissions (approx. 0.7 kg CO&#8322;/kWh)</li>
                      <li>&bull; Noise and air pollution — neighbour complaints</li>
                      <li>&bull; Fuel storage requires bunding and spill containment</li>
                      <li>&bull; Regular fuel deliveries add vehicle movements to site</li>
                      <li>&bull; Immediately available — no lead time required</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* BESS & Solar Hybrid */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Battery Energy Storage Systems (BESS) &amp; Solar Hybrid Generators
                </p>
                <p className="text-sm text-white/80 mb-3">
                  Battery energy storage and solar-hybrid systems represent the fastest-growing
                  segment of temporary power solutions for construction sites:
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">BESS units:</strong> Lithium-ion battery packs
                      in weatherproof containers that store energy from the grid, solar panels, or
                      generators. They discharge to power site loads during peak periods, overnight,
                      or when generators would otherwise run at low load. Can reduce generator
                      runtime by 50-70%.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Solar hybrid generators:</strong> Combine solar
                      PV panels, battery storage, and a small diesel generator in an integrated
                      system. Solar charges the batteries during daylight; batteries handle
                      low-demand periods; the diesel generator only runs when demand exceeds
                      stored capacity. Diesel savings of 50-80% are achievable on suitable sites.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Silent overnight power:</strong> BESS eliminates
                      the need to run noisy diesel generators overnight for security lighting, CCTV,
                      and monitoring systems. This is particularly valuable on residential and
                      urban sites with strict noise restrictions.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <p className="text-sm text-amber-300">
                  <strong>Cost Consideration:</strong> While BESS and solar-hybrid systems have a
                  higher initial hire cost than standard diesel generators, the fuel savings
                  typically deliver a payback period of 3-6 months on most projects. For longer
                  duration projects, the total cost of ownership is often significantly lower than
                  conventional diesel-only power.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07 — Good Housekeeping */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">07</span>
            Good Housekeeping
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Good housekeeping measures are the <strong>lowest-cost, quickest-to-implement</strong>{' '}
                energy-saving strategies available on any construction site. They require no capital
                investment — only awareness, discipline, and consistent management attention. Studies
                show that good housekeeping alone can reduce site energy consumption by{' '}
                <strong>10-15%</strong> with zero capital expenditure.
              </p>

              {/* Switch-Off Culture */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">
                  Switching Off When Not in Use
                </p>
                <p className="text-sm text-white/80 mb-3">
                  The single most impactful housekeeping measure is ensuring that plant, equipment,
                  lighting, and heating are switched off when not actively in use. Research indicates
                  that idle time can account for 30-40% of operating hours on poorly managed sites.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Plant and equipment:</strong> Engines must be
                      switched off during breaks, when waiting for loads, and at the end of each
                      shift. An idling excavator consumes 4-8 litres of diesel per hour — producing
                      emissions and noise for zero productive output.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Lighting:</strong> Site lighting, task lighting,
                      and accommodation lighting must be switched off when areas are unoccupied.
                      External flood lighting should be on timers or photocell controls rather than
                      manual switches that are often left on 24 hours.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Heating and hot water:</strong> Cabin heating
                      must not be left running overnight or at weekends. Hot water boilers and urns
                      should be on timers rather than running continuously. Windows and doors must
                      be closed when heating is on.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Doors/Windows, Maintenance, Campaigns */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">
                  Maintenance &amp; Behavioural Measures
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Closing doors and windows:</strong> Heated
                      accommodation with doors propped open wastes enormous energy. Self-closing
                      mechanisms and clear signage (&ldquo;Close the door — save energy&rdquo;)
                      help maintain the thermal envelope of site buildings.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Maintaining equipment:</strong> Poorly maintained
                      plant and equipment consumes more fuel — dirty air filters, incorrect tyre
                      pressures, worn engine components, and poor lubrication all increase energy
                      consumption. Following manufacturer service schedules is both a safety and
                      energy efficiency measure.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Awareness campaigns:</strong> Regular
                      energy-saving communications — posters, toolbox talks, site inductions,
                      weekly energy reports — keep energy awareness at the forefront of site
                      culture. Visual displays showing weekly energy consumption and savings
                      create a sense of shared responsibility.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Energy Champions */}
              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Energy Champions</p>
                </div>
                <p className="text-sm text-white/80">
                  Appointing <strong className="text-white">energy champions</strong> on site gives
                  named individuals responsibility for monitoring energy use, identifying waste,
                  promoting good practice, and driving continuous improvement. Energy champions
                  typically conduct weekly energy walks — checking for lights left on, generators
                  running unnecessarily, doors propped open, and plant idling — and report findings
                  to the site manager. The most effective energy champion programmes include
                  recognition and incentives for measurable energy savings.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08 — Renewable Energy on Site */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">08</span>
            Renewable Energy on Site
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                The adoption of <strong>renewable energy technologies</strong> on construction sites
                is accelerating as costs fall, technology matures, and clients demand lower-carbon
                operations. While no single renewable technology can fully replace diesel on most
                sites today, combinations of renewables with battery storage are closing the gap
                rapidly.
              </p>

              {/* Solar PV */}
              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Sun className="h-5 w-5 text-yellow-400" />
                  <p className="text-sm font-medium text-yellow-400">Solar PV Panels</p>
                </div>
                <p className="text-sm text-white/80 mb-3">
                  Solar photovoltaic panels are the most established and widely deployed renewable
                  energy technology on UK construction sites. They convert sunlight directly into
                  electricity with no moving parts, no fuel, and no direct emissions.
                </p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Deployment options:</strong> Roof-mounted on
                      site cabins and welfare units; ground-mounted arrays on unused areas of the
                      site compound; portable fold-out panels for remote or temporary locations;
                      integrated into hoarding and site boundaries.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">With battery storage:</strong> Solar panels
                      combined with BESS allow energy generated during daylight hours to be stored
                      and used in the evening, overnight, and during peak demand periods. This
                      combination maximises solar utilisation and minimises generator running time.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">UK generation:</strong> Despite the perception
                      that the UK lacks sufficient sunlight, modern solar panels generate useful
                      electricity even on overcast days. Annual solar irradiation in southern England
                      is approximately 1,000-1,100 kWh/m&sup2;, sufficient to make solar a viable
                      contributor to site power throughout the year.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Other Renewables */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Wind Micro-Generation</p>
                  <p className="text-sm text-white/80 mb-3">
                    Small-scale wind turbines can supplement site power in exposed locations with
                    consistent wind. However, urban construction sites typically have poor wind
                    conditions due to surrounding buildings. Wind is most viable on rural,
                    coastal, or elevated sites where average wind speeds exceed 5 m/s.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Vertical-axis turbines suit turbulent urban wind conditions</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Planning permission may be required for temporary installations</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Hydrogen Fuel Cells</p>
                  <p className="text-sm text-white/80 mb-3">
                    Hydrogen fuel cells generate electricity through an electrochemical reaction
                    between hydrogen and oxygen, producing only water vapour. They offer silent,
                    zero-emission power ideal for urban and noise-sensitive sites.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Currently expensive — green hydrogen supply is still limited</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Several major UK contractors are running pilot projects</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Biofuels for Plant</p>
                  <p className="text-sm text-white/80 mb-3">
                    Hydrotreated Vegetable Oil (HVO) is a drop-in replacement for conventional
                    diesel that can be used in most modern construction plant without engine
                    modification. HVO reduces lifecycle carbon emissions by up to 90% compared to
                    fossil diesel.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Compatible with Tier 4 / Stage V engines and DPF systems</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Price premium of 5-15% over conventional diesel (falling)</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Green Tariffs for Grid Electricity</p>
                  <p className="text-sm text-white/80 mb-3">
                    Purchasing grid electricity on a certified green tariff backed by Renewable
                    Energy Guarantees of Origin (REGOs) reduces reported Scope 2 emissions to
                    near zero. This is the simplest way to decarbonise grid electricity consumption.
                  </p>
                  <ul className="text-sm text-white/80 space-y-1">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Backed by certificates proving renewable generation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Small or no cost premium over standard tariffs</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Energy Reduction Hierarchy Diagram */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4">Energy Reduction Hierarchy</h2>
          <div className="bg-white/5 border border-white/10 rounded-lg p-4 sm:p-6">
            <p className="text-sm text-white/60 mb-4 text-center">
              The hierarchy of energy reduction on construction sites — most effective at the top
            </p>
            <div className="max-w-lg mx-auto space-y-2">
              {/* Eliminate */}
              <div className="bg-green-500/15 border border-green-500/30 rounded-lg p-3 sm:p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-green-400 text-xs font-bold uppercase tracking-wider">1. Eliminate</span>
                </div>
                <p className="text-xs sm:text-sm text-white/80">
                  Remove the need for energy entirely &mdash; off-hire unused plant, remove
                  unnecessary temporary lighting, avoid heating unoccupied spaces
                </p>
              </div>

              {/* Reduce */}
              <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-lg p-3 sm:p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-emerald-400 text-xs font-bold uppercase tracking-wider">2. Reduce</span>
                </div>
                <p className="text-xs sm:text-sm text-white/80">
                  Use less energy for the same output &mdash; insulate cabins, right-size
                  generators, maintain equipment, LED lighting, timer controls
                </p>
              </div>

              {/* Replace */}
              <div className="bg-blue-500/15 border border-blue-500/30 rounded-lg p-3 sm:p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-blue-400 text-xs font-bold uppercase tracking-wider">3. Replace</span>
                </div>
                <p className="text-xs sm:text-sm text-white/80">
                  Switch to lower-carbon energy sources &mdash; grid connections, HVO biofuel,
                  electric plant, hybrid machinery, green electricity tariffs
                </p>
              </div>

              {/* Renewable */}
              <div className="bg-teal-500/15 border border-teal-500/30 rounded-lg p-3 sm:p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-teal-400 text-xs font-bold uppercase tracking-wider">4. Renewable</span>
                </div>
                <p className="text-xs sm:text-sm text-white/80">
                  Generate clean energy on site &mdash; solar PV panels, battery storage systems,
                  wind micro-generation, hydrogen fuel cells
                </p>
              </div>

              {/* Offset */}
              <div className="bg-amber-500/15 border border-amber-500/30 rounded-lg p-3 sm:p-4 text-center">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">5. Offset (Last Resort)</span>
                </div>
                <p className="text-xs sm:text-sm text-white/80">
                  Compensate for remaining emissions &mdash; verified carbon offset schemes,
                  tree planting, carbon capture &mdash; only after all other measures exhausted
                </p>
              </div>
            </div>

            <div className="mt-4 text-center">
              <p className="text-xs text-white/50">
                &uarr; Most effective &mdash; always start at the top of the hierarchy and work
                downwards &darr;
              </p>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="pb-4 border-b border-white/5 last:border-0">
                <h3 className="text-sm font-medium text-white mb-1">{faq.question}</h3>
                <p className="text-sm text-white/80 leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Quiz */}
        <Quiz title="Section 1 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-3">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Module 3
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-3-section-2">
              Carbon Footprint &amp; Reduction
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
