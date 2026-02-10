import {
  ArrowLeft,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  Droplets,
  ShieldCheck,
  Gauge,
  Construction,
  Pipette,
  Bath,
  ShieldAlert,
  BarChart3,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import useSEO from '@/hooks/useSEO';

const quickCheckQuestions = [
  {
    id: 'abstraction-licence',
    question:
      'Under the Water Resources Act 1991, what is required before abstracting water from a river or borehole for construction use?',
    options: [
      'A COSHH assessment',
      'An abstraction licence from the Environment Agency',
      'A Building Regulations Part G certificate',
      'A trade effluent consent from the local water company',
    ],
    correctIndex: 1,
    explanation:
      'The Water Resources Act 1991 requires anyone abstracting more than 20 cubic metres per day from inland waters, underground strata, or tidal waters to hold an abstraction licence issued by the Environment Agency. This protects water resources from over-extraction and ensures that ecological flow rates are maintained. Unlicensed abstraction is a criminal offence that can result in prosecution, fines, and remediation costs.',
  },
  {
    id: 'dust-suppression-method',
    question:
      'Which dust suppression method uses significantly less water than traditional hosing?',
    options: [
      'Open-ended hosepipes at maximum pressure',
      'Flooding the entire site with water tankers',
      'Misting systems with fine water droplets and surfactant additives',
      'Continuous sprinkler irrigation across all work areas',
    ],
    correctIndex: 2,
    explanation:
      'Misting systems produce fine water droplets that capture airborne dust particles far more efficiently than conventional hosing. When combined with surfactant additives that reduce surface tension, the droplets bind more effectively to dust. Misting systems can reduce water consumption for dust suppression by 50-90% compared with traditional hosing, whilst achieving equal or better dust control. Frequency optimisation — running suppression only when monitoring shows elevated dust levels — further reduces water use.',
  },
  {
    id: 'silt-management',
    question:
      'What is the primary purpose of silt fences and settlement tanks on a construction site?',
    options: [
      'To reduce noise pollution from earthworks',
      'To prevent silt-laden runoff from entering watercourses and drains',
      'To store clean water for concrete mixing',
      'To provide a barrier against unauthorised site access',
    ],
    correctIndex: 1,
    explanation:
      'Silt fences and settlement tanks are key water quality protection measures. They intercept silt-laden surface water runoff before it can reach watercourses, drains, or groundwater. Silt (suspended solids) can smother aquatic habitats, block fish gills, reduce light penetration, and carry adsorbed pollutants. Under the Environmental Permitting Regulations 2016, causing silt pollution of a watercourse is an offence. Settlement tanks allow solids to settle out of suspension so that cleaner water can be discharged or recycled.',
  },
];

const faqs = [
  {
    question: 'How much water does a typical construction site use, and what are the main uses?',
    answer:
      'A typical construction site can use between 10 and 50 cubic metres of water per day, depending on the project size and phase. The main uses are concrete mixing and curing (often the largest single use), dust suppression on haul roads and earthworks, wheel washing for vehicles leaving site, welfare facilities (toilets, washing, drinking water), pressure testing of pipework and water systems, and landscaping or ground preparation. Understanding the breakdown of water use is the first step in identifying reduction opportunities. Sites should meter and track consumption by use category wherever possible.',
  },
  {
    question: 'What is the difference between rainwater harvesting and greywater recycling on site?',
    answer:
      'Rainwater harvesting collects rainfall — typically from roofs, temporary structures, or purpose-built catchment areas — and stores it for non-potable uses such as dust suppression, wheel washing, or toilet flushing. The water is relatively clean and requires minimal treatment (usually filtration and, for some uses, UV disinfection). Greywater recycling collects used water from welfare facilities (hand basins, showers) and treats it for reuse in non-potable applications. Greywater requires more treatment than rainwater because it contains soaps, detergents, and organic matter. Both systems reduce mains water demand and can significantly cut water costs on long-duration projects.',
  },
  {
    question: 'What are BREEAM water credits and how does a construction project achieve them?',
    answer:
      'BREEAM (Building Research Establishment Environmental Assessment Method) awards credits under the Water (Wat) category for measures that reduce water consumption in the completed building and during construction. Credits can be earned for installing water-efficient fittings (low-flow taps, dual-flush toilets, waterless urinals), rainwater harvesting or greywater recycling systems, leak detection systems, water metering and sub-metering, and demonstrating a water reduction strategy. During construction, credits under the Management category can be earned for monitoring water use, setting reduction targets, and implementing conservation measures. The number of credits achieved contributes to the overall BREEAM rating (Pass, Good, Very Good, Excellent, Outstanding).',
  },
  {
    question: 'What should be included in a site spill response plan for protecting water quality?',
    answer:
      'A site spill response plan should include an inventory of all substances stored on site that could cause water pollution (fuels, oils, chemicals, cement, paints), the location of all drains, watercourses, and sensitive receptors near the site, the location and contents of spill kits (absorbent granules, booms, pads, and drain covers), clear procedures for containing and cleaning up spills of different types, roles and responsibilities — who responds, who reports, who contacts the Environment Agency, emergency contact numbers (Environment Agency incident hotline: 0800 80 70 60), procedures for isolating drains and watercourses to prevent contamination, training requirements and drill schedules, and post-incident reporting and investigation procedures. The plan must be site-specific, kept up to date, and communicated to all site personnel during induction.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'Under the Water Resources Act 1991, what is the threshold above which an abstraction licence is required for taking water from a river?',
    options: [
      '5 cubic metres per day',
      '10 cubic metres per day',
      '20 cubic metres per day',
      '50 cubic metres per day',
    ],
    correctAnswer: 2,
    explanation:
      'An abstraction licence is required from the Environment Agency for taking more than 20 cubic metres per day from inland waters, underground strata, or tidal waters. Below this threshold, abstraction may be exempt, but other restrictions and conditions may still apply. The licence system protects water resources from over-abstraction and ensures sustainable management of rivers, lakes, and groundwater.',
  },
  {
    id: 2,
    question:
      'Which of the following is a closed-loop water conservation system commonly used on construction sites?',
    options: [
      'Open hosepipe dust suppression',
      'Mains-fed welfare facilities',
      'Recirculating wheel wash with settlement tank',
      'Direct river abstraction for concrete mixing',
    ],
    correctAnswer: 2,
    explanation:
      'A recirculating (closed-loop) wheel wash system collects the dirty water from vehicle wheel washing, passes it through a settlement tank to remove suspended solids, and recirculates the cleaned water back to the wash. This can reduce wheel wash water consumption by 80-90% compared with single-use systems. The settled silt is periodically removed and disposed of appropriately. Closed-loop systems are a key water conservation measure on sites with high vehicle movements.',
  },
  {
    id: 3,
    question:
      'What is the purpose of a surfactant additive in water used for dust suppression?',
    options: [
      'To increase water pressure in hoses',
      'To reduce surface tension so water droplets bind more effectively to dust particles',
      'To kill bacteria in recycled water',
      'To change the colour of the water for visibility',
    ],
    correctAnswer: 1,
    explanation:
      'Surfactant additives reduce the surface tension of water, allowing smaller droplets to form and bind more effectively to fine dust particles. This means less water is needed to achieve the same or better dust suppression effect. Surfactants are particularly effective when used with misting systems, as the combination of fine droplets and reduced surface tension captures airborne particulates far more efficiently than plain water from a hosepipe.',
  },
  {
    id: 4,
    question:
      'Which admixture type reduces the water demand in concrete without reducing workability?',
    options: [
      'Air-entraining agents',
      'Retarders',
      'Water-reducing admixtures (plasticisers and superplasticisers)',
      'Accelerators',
    ],
    correctAnswer: 2,
    explanation:
      'Water-reducing admixtures — including plasticisers (which typically reduce water demand by 5-15%) and superplasticisers (which can reduce water demand by 15-30%) — allow the water-to-cement ratio to be reduced whilst maintaining or improving workability. This produces stronger, more durable concrete with less water. Reducing water demand in concrete mixes is one of the most effective water conservation measures on construction sites, given that concrete production is often the single largest water use.',
  },
  {
    id: 5,
    question:
      'What is the recommended approach for managing concrete washout water on site?',
    options: [
      'Discharge it directly into the nearest surface water drain',
      'Allow it to soak into the ground wherever convenient',
      'Collect it in a designated washout area, settle the solids, and recycle the water or dispose of it appropriately',
      'Mix it with welfare wastewater and send it to the foul sewer',
    ],
    correctAnswer: 2,
    explanation:
      'Concrete washout water is highly alkaline (pH 11-13) and contains suspended solids, chromium, and other contaminants. It must never be discharged to surface water drains or allowed to soak into unprotected ground. Best practice is to collect all washout water in a designated, lined containment area or washout tank, allow solids to settle, treat or neutralise the water if necessary, and either recycle it for further washout or dispose of it through an appropriately consented route. Settlement solids are typically removed by a licensed waste carrier.',
  },
  {
    id: 6,
    question:
      'Which welfare facility measure can save the most water on a construction site?',
    options: [
      'Providing bottled water instead of mains-fed drinking fountains',
      'Installing low-flow taps, dual-flush toilets, and waterless urinals',
      'Removing all welfare washing facilities',
      'Restricting welfare facility access to management only',
    ],
    correctAnswer: 1,
    explanation:
      'Installing water-efficient fittings in welfare facilities is the most practical and effective approach. Low-flow taps (fitted with aerators or flow restrictors) can reduce tap water use by 50%. Dual-flush toilets use 4-6 litres per flush compared with 9-13 litres for older single-flush cisterns. Waterless urinals eliminate flush water entirely. Combined with meter monitoring and leak detection in temporary plumbing, these measures can reduce welfare water consumption by 30-50% compared with conventional fittings.',
  },
  {
    id: 7,
    question:
      'What is the purpose of bunded fuel storage areas in relation to water quality protection?',
    options: [
      'To keep fuel containers warm during winter',
      'To provide secondary containment preventing fuel leaks from reaching drains, watercourses, and groundwater',
      'To reduce fuel evaporation and save money',
      'To make fuel containers easier to stack',
    ],
    correctAnswer: 1,
    explanation:
      'Bunded storage areas provide secondary containment around fuel tanks, drums, and containers. The bund must have a capacity of at least 110% of the largest container or 25% of the total stored volume, whichever is greater. If fuel leaks from the primary container, the bund catches and contains it, preventing it from reaching surface water drains, watercourses, or groundwater. Bunds must be impermeable, regularly inspected, and kept free of rainwater accumulation. This is a legal requirement under the Oil Storage Regulations 2001 and the Environmental Permitting Regulations 2016.',
  },
  {
    id: 8,
    question:
      'What is a typical water consumption benchmark used for monitoring construction site performance?',
    options: [
      'Litres per worker per hour',
      'Gallons per lorry movement',
      'Litres per square metre of completed floor area (litres/m\u00B2)',
      'Cubic metres per tonne of excavated soil',
    ],
    correctAnswer: 2,
    explanation:
      'The most widely used benchmark for construction water consumption is litres per square metre of completed gross internal floor area (litres/m\u00B2). This metric allows meaningful comparison across projects of different sizes and types. Typical benchmarks range from 4 to 20 litres/m\u00B2 depending on the project type, with targets becoming progressively tighter as the industry improves. BREEAM and many client sustainability requirements use this metric. Regular monitoring against benchmarks allows early identification of excessive consumption and drives continuous improvement.',
  },
];

export default function EnvironmentalSustainabilityModule3Section3() {
  useSEO({
    title: 'Water Conservation | Environmental & Sustainability Module 3.3',
    description:
      'Water use in construction, water regulations, conservation strategies, dust suppression, concrete and wet trades, site welfare, protecting water quality, and water monitoring and targets.',
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
            <Droplets className="h-7 w-7 text-emerald-400" />
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 mb-3 mx-auto">
            <span className="text-emerald-400 text-xs font-semibold">MODULE 3 &middot; SECTION 3</span>
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-3">
            Water Conservation
          </h1>
          <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto">
            Water use in construction, regulatory requirements, conservation strategies, dust suppression,
            concrete and wet trades, site welfare, protecting water quality, and monitoring and targets
          </p>
        </header>

        {/* Quick Summary Boxes */}
        <div className="grid sm:grid-cols-2 gap-4 mb-12">
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400 text-base font-medium mb-2">In 30 Seconds</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Typical use:</strong> 10&ndash;50 m&sup3;/day &mdash; concrete, dust, washing, welfare
              </li>
              <li>
                <strong>Key law:</strong> Water Resources Act 1991 &mdash; abstraction licences
              </li>
              <li>
                <strong>Benchmark:</strong> 4&ndash;20 litres/m&sup2; completed floor area
              </li>
            </ul>
          </div>
          <div className="p-4 rounded-lg bg-emerald-500/5 border-l-2 border-emerald-500/50">
            <p className="text-emerald-400/90 text-base font-medium mb-2">Key Regulations</p>
            <ul className="text-base text-white space-y-1.5">
              <li>
                <strong>Water Resources Act 1991:</strong> Abstraction licences
              </li>
              <li>
                <strong>Water Industry Act 1991:</strong> Trade effluent consents
              </li>
              <li>
                <strong>Building Regulations Part G:</strong> Water efficiency
              </li>
            </ul>
          </div>
        </div>

        {/* Learning Outcomes */}
        <section className="mb-12">
          <h2 className="text-lg font-semibold text-white mb-4">Learning Outcomes</h2>
          <div className="grid sm:grid-cols-2 gap-2">
            {[
              'Identify the main uses of water on a construction site and quantify typical volumes',
              'Explain the regulatory framework governing water abstraction, discharge, and efficiency',
              'Describe practical water conservation strategies including rainwater harvesting and greywater recycling',
              'Compare water-efficient dust suppression methods with traditional approaches',
              'Explain how concrete water demand can be reduced through mix design and admixtures',
              'Identify water-saving measures for site welfare facilities',
              'Describe measures for protecting water quality including silt management and spill prevention',
              'Explain how water use is monitored, benchmarked, and reported against reduction targets',
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-2 text-sm text-white">
                <CheckCircle className="h-4 w-4 text-emerald-400/70 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        <hr className="border-white/5 mb-12" />

        {/* Section 01: Water Use in Construction */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">01</span>
            Water Use in Construction
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Water is consumed in substantial volumes across every phase of a construction project. Understanding
                where and how water is used is the essential first step in developing effective conservation strategies.
                A typical medium-sized construction site can consume <strong>10 to 50 cubic metres of water per
                day</strong>, with large infrastructure projects using considerably more. The volumes vary significantly
                depending on the project type, phase of construction, weather conditions, and the conservation measures
                in place.
              </p>

              <p>
                Water consumption on site is often poorly understood and rarely measured with any precision.
                Many sites rely on estimated figures or simply pay the water bill without analysing consumption
                patterns. This lack of visibility means that waste goes undetected and conservation opportunities
                are missed. Effective water management begins with understanding the sources and uses of water
                on site.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Primary Water Uses on Site</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Dust suppression:</strong> Wetting haul roads, stockpiles,
                      demolition areas, and earthworks to control airborne particulate matter. Often the largest
                      single water use in the early phases of a project, particularly during dry weather.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Concrete mixing and curing:</strong> Water is a fundamental
                      component of concrete (typically 150&ndash;200 litres per cubic metre of concrete). Curing
                      requires additional water to maintain moisture levels whilst the concrete gains strength.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Wheel washing:</strong> Cleaning vehicle wheels and
                      undercarriages before they leave site to prevent mud and debris being deposited on
                      public highways. Required by planning conditions and the Highways Act 1980.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Welfare facilities:</strong> Toilets, hand washing, showers,
                      canteen facilities, and drinking water for site operatives. Consumption scales directly with
                      workforce size &mdash; typically 50&ndash;100 litres per person per day.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Testing and commissioning:</strong> Pressure testing of
                      pipework, flushing of water systems, testing of sprinkler systems, and commissioning of
                      mechanical services. These activities can use large volumes in the later project phases.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">Water Sources</p>
                <div className="grid sm:grid-cols-3 gap-3">
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">Mains Supply</p>
                    <p className="text-xs text-white/80">
                      Treated potable water from the local water company. The most common source but the most
                      expensive and resource-intensive. Suitable for all uses including drinking water and
                      welfare. Metered and billed by volume.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">Abstracted Water</p>
                    <p className="text-xs text-white/80">
                      Water taken directly from rivers, streams, lakes, or boreholes. Requires an abstraction
                      licence from the Environment Agency (for more than 20 m&sup3;/day). Lower cost but may
                      require treatment. Seasonal availability varies.
                    </p>
                  </div>
                  <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                    <p className="text-sm font-medium text-white mb-1">Recycled / Harvested</p>
                    <p className="text-xs text-white/80">
                      Collected rainwater, recycled wheel wash water, treated greywater from welfare facilities,
                      or reclaimed process water. The most sustainable option. Requires storage infrastructure
                      and may need treatment depending on the intended use.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 02: Water Regulations */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">02</span>
            Water Regulations
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Water use, abstraction, and discharge on construction sites are governed by a comprehensive
                regulatory framework. Non-compliance can result in criminal prosecution, significant fines,
                project delays, and reputational damage. Every site manager and environmental professional must
                understand these legal requirements and ensure that appropriate licences, consents, and permits
                are in place before water-related activities commence.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldCheck className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Key Legislation</p>
                </div>
                <ul className="text-sm text-white/80 space-y-3">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Water Resources Act 1991:</strong> The primary legislation
                      governing the abstraction and impounding of water in England and Wales. Anyone abstracting
                      more than 20 cubic metres per day from inland waters, underground strata, or tidal waters
                      must hold an <strong className="text-white">abstraction licence</strong> issued by the
                      Environment Agency. The Act also creates offences relating to pollution of controlled
                      waters &mdash; it is an offence to cause or knowingly permit any poisonous, noxious, or
                      polluting matter to enter controlled waters.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Water Industry Act 1991:</strong> Governs the supply of
                      water and the provision of sewerage services. Construction sites discharging trade effluent
                      (any liquid waste other than domestic sewage or uncontaminated surface water) into the
                      public sewer must obtain a <strong className="text-white">trade effluent consent</strong> from
                      the local sewerage undertaker. Concrete washout water, contaminated wheel wash water, and
                      dewatering discharge are all examples of trade effluent requiring consent.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Building Regulations Part G (Sanitation, hot water safety
                      and water efficiency):</strong> Sets maximum water consumption standards for new dwellings
                      at 125 litres per person per day (or 110 litres where required by planning conditions).
                      Part G drives the installation of water-efficient fittings including low-flow taps,
                      dual-flush WCs, and flow-regulated showers in completed buildings.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Environmental Permitting Regulations 2016:</strong> Require
                      an environmental permit for discharges to surface water or groundwater. Construction
                      dewatering, treated effluent discharges, and any discharge that could affect water quality
                      may require a water discharge activity permit from the Environment Agency.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Water Supply (Water Fittings) Regulations 1999:</strong> Prevent
                      contamination, waste, and misuse of the public water supply. All plumbing fittings on site
                      (including temporary connections) must comply. Backflow prevention devices must be installed
                      to protect the mains supply from contamination.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Penalties for Non-Compliance
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  Unlicensed abstraction can result in prosecution and fines of up to <strong className="text-white">&pound;20,000</strong> in
                  the Magistrates&rsquo; Court or an unlimited fine in the Crown Court. Causing pollution of
                  controlled waters is a criminal offence under the Environmental Permitting Regulations 2016
                  and the Water Resources Act 1991, with penalties including unlimited fines and up to five
                  years&rsquo; imprisonment. The Environment Agency can also require the offender to pay the
                  costs of clean-up and environmental remediation, which can run to hundreds of thousands of
                  pounds. Directors and senior managers can be held personally liable.
                </p>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[0]} />

        {/* Section 03: Water Conservation Strategies */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">03</span>
            Water Conservation Strategies
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Water conservation on construction sites follows a hierarchy similar to the waste hierarchy:
                <strong> avoid</strong> water use where possible, <strong>reduce</strong> the volume required for
                necessary activities, <strong>reuse</strong> water wherever practical, and <strong>recycle</strong> water
                through treatment systems. Only as a last resort should fresh mains water be consumed for
                activities where alternatives exist.
              </p>

              {/* Water Conservation Hierarchy Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Water Conservation Hierarchy
                </p>
                <div className="flex flex-col items-center gap-2 max-w-md mx-auto">
                  <div className="w-full bg-emerald-500/20 border border-emerald-400/40 rounded-lg p-3 text-center">
                    <p className="text-sm font-bold text-emerald-400">AVOID</p>
                    <p className="text-xs text-white/70">
                      Eliminate water use entirely &mdash; dry methods, alternatives to water
                    </p>
                  </div>
                  <div className="w-0.5 h-3 bg-emerald-400/40" />
                  <div className="w-[90%] bg-emerald-500/15 border border-emerald-400/30 rounded-lg p-3 text-center">
                    <p className="text-sm font-bold text-emerald-400">REDUCE</p>
                    <p className="text-xs text-white/70">
                      Minimise volumes &mdash; efficient equipment, trigger nozzles, optimised schedules
                    </p>
                  </div>
                  <div className="w-0.5 h-3 bg-emerald-400/40" />
                  <div className="w-[80%] bg-emerald-500/10 border border-emerald-400/25 rounded-lg p-3 text-center">
                    <p className="text-sm font-bold text-emerald-400">REUSE</p>
                    <p className="text-xs text-white/70">
                      Use water more than once &mdash; closed-loop systems, cascading use
                    </p>
                  </div>
                  <div className="w-0.5 h-3 bg-emerald-400/40" />
                  <div className="w-[70%] bg-emerald-500/5 border border-emerald-400/20 rounded-lg p-3 text-center">
                    <p className="text-sm font-bold text-emerald-400">RECYCLE</p>
                    <p className="text-xs text-white/70">
                      Treat and recirculate &mdash; rainwater harvesting, greywater recycling
                    </p>
                  </div>
                  <div className="w-0.5 h-3 bg-emerald-400/40" />
                  <div className="w-[60%] bg-white/5 border border-white/20 rounded-lg p-3 text-center">
                    <p className="text-sm font-bold text-white/60">DISPOSE</p>
                    <p className="text-xs text-white/50">
                      Last resort &mdash; consented discharge after treatment
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Rainwater Harvesting</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Collect rainfall from roofs, temporary structures, or catchment areas</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Store in tanks or lagoons for non-potable use</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Ideal for dust suppression, wheel washing, and toilet flushing</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Minimal treatment needed &mdash; typically filtration only</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                  <p className="text-sm font-medium text-white mb-2">Greywater Recycling</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Collect used water from hand basins and showers</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Treat through filtration, biological treatment, or UV disinfection</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Reuse for toilet flushing, dust suppression, or irrigation</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Requires more treatment than rainwater due to soap and organic matter</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">Practical On-Site Measures</p>
                <div className="space-y-2">
                  {[
                    'Closed-loop wheel wash systems recirculate water through settlement, reducing consumption by 80-90%',
                    'Trigger nozzles on hoses prevent water flowing when not actively in use — simple but highly effective',
                    'Water bowsers with spray bars provide targeted dust suppression instead of flooding large areas',
                    'Leak detection and repair programme — even small leaks on temporary supplies waste thousands of litres',
                    'Timed irrigation for landscaping and curing — avoiding over-watering and evaporation losses',
                    'Staff awareness training — ensuring all operatives understand why and how to conserve water',
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold flex-shrink-0">
                        {i + 1}
                      </span>
                      <p className="text-sm text-white/80">{step}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 04: Dust Suppression */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">04</span>
            Dust Suppression
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Dust suppression is often the single largest consumer of water during the earthworks and
                demolition phases of a construction project. Traditional approaches — running open hosepipes
                across haul roads or spraying large areas with fire hoses — are extremely wasteful. Modern
                water-efficient dust suppression methods can achieve equal or better results using a fraction
                of the water volume.
              </p>

              <p>
                Effective dust management is a legal requirement under the Environmental Protection Act 1990
                (statutory nuisance provisions) and a condition of most planning permissions. However, the
                obligation to control dust does not require unlimited water use. The objective is to achieve
                the required dust control standard using the <strong>minimum practical volume of water</strong>.
              </p>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-red-500/10 border border-red-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-red-400 mb-2">Inefficient Methods</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>Open-ended hosepipes running continuously</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>Fire hoses used for general dust dampening</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>Flooding roads and work areas indiscriminately</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-red-400" />
                      <span>Fixed schedule spraying regardless of dust conditions</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-emerald-400 mb-2">Efficient Methods</p>
                  <ul className="text-sm text-white/80 space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Misting systems producing fine droplets at low volume</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Surfactant additives improving dust-binding efficiency</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Targeted bowser spraying on active haul routes only</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Monitoring-triggered suppression only when dust levels rise</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Gauge className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Misting Systems</p>
                </div>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    Misting systems produce very fine water droplets (typically 10&ndash;100 microns) that are
                    optimally sized to capture airborne dust particles. The physics of dust capture works best
                    when the water droplet is a similar size to the dust particle &mdash; fine mist therefore
                    captures fine dust far more effectively than large water drops from a hose.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Water savings:</strong> 50&ndash;90% less water than
                        conventional hosing for equivalent dust control
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Types:</strong> Cannon-style fog cannons (range up to
                        150 m), perimeter misting lines, mobile misting units mounted on plant
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Surfactants:</strong> Adding surfactant reduces surface
                        tension, allowing water droplets to spread and bind to dust more effectively
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-2">Alternatives to Water</p>
                <p className="text-sm text-white/80 mb-2">
                  In some situations, non-water methods can eliminate water use for dust control entirely:
                </p>
                <ul className="text-sm text-white/80 space-y-1.5">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Chemical dust suppressants:</strong> Polymer-based or
                      organic binders applied to road surfaces that form a crust, suppressing dust for days or weeks
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Speed restrictions:</strong> Reducing vehicle speeds on
                      haul roads significantly reduces dust generation at source
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Road surfacing:</strong> Temporary hard surfacing of
                      haul roads (crushed aggregate, planings, or Tarmac) prevents dust generation entirely
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Enclosure and sheeting:</strong> Covering stockpiles
                      and wrapping buildings during demolition to prevent dust escaping
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[1]} />

        {/* Section 05: Concrete & Wet Trades */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">05</span>
            Concrete &amp; Wet Trades
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Concrete production is typically the single largest consumer of water on a construction site.
                A standard concrete mix requires approximately <strong>150&ndash;200 litres of water per cubic
                metre</strong>, and a medium-scale project may pour thousands of cubic metres of concrete over
                its duration. Beyond the water in the mix itself, additional water is consumed for curing,
                cleaning equipment, and washing out delivery vehicles and pump lines. Other wet trades &mdash;
                plastering, screeding, bricklaying &mdash; also contribute to water demand.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Construction className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Water-to-Cement Ratio Optimisation</p>
                </div>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    The <strong className="text-white">water-to-cement (w/c) ratio</strong> is the most
                    important factor in concrete mix design. A lower w/c ratio produces stronger, more durable
                    concrete &mdash; but also reduces workability, making the concrete harder to place and compact.
                    The key to water conservation in concrete is to reduce the w/c ratio without sacrificing
                    workability, which is achieved through the use of chemical admixtures.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Plasticisers:</strong> Water-reducing admixtures that
                        typically reduce water demand by 5&ndash;15% whilst maintaining the same workability
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Superplasticisers:</strong> High-range water-reducing
                        admixtures that can reduce water demand by 15&ndash;30%, enabling very low w/c ratios
                        with high workability
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>
                        <strong className="text-white">Supplementary cementitious materials:</strong> Fly ash
                        (PFA), ground granulated blast-furnace slag (GGBS), and silica fume can partially
                        replace cement and improve workability, further reducing water demand
                      </span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">Washout Management</p>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    Concrete washout &mdash; cleaning the inside of mixer trucks, pump lines, and placing
                    equipment &mdash; generates large volumes of highly alkaline wastewater (pH 11&ndash;13)
                    that contains suspended solids, chromium, and other contaminants. This water must
                    <strong className="text-white"> never</strong> be discharged to surface water drains or
                    allowed to soak into unprotected ground.
                  </p>
                  <ul className="space-y-1.5">
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Designate a lined, contained washout area remote from drains and watercourses</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Allow solids to settle and separate the clarified water for recycling</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Recycled wash water can be reused for subsequent washout or in new concrete mixes (within limits)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                      <span>Remove settled solids by licensed waste carrier for appropriate disposal</span>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-2">Recycling Wash Water in Concrete</p>
                <p className="text-sm text-white/80">
                  <strong className="text-white">BS 1008</strong> (Mixing water for concrete) permits the use
                  of recycled water from concrete production in new concrete mixes, subject to testing requirements.
                  The water must meet specified limits for chlorides, sulphates, alkalis, and other contaminants.
                  Using recycled wash water in new mixes closes the loop, reducing both water consumption and
                  wastewater disposal costs. Many ready-mix plants now operate wash water recycling systems as
                  standard practice, and site batching plants can adopt the same approach.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 06: Site Welfare Water Use */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">06</span>
            Site Welfare Water Use
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Site welfare facilities &mdash; toilets, hand washing stations, showers, canteens, and drinking
                water points &mdash; serve the essential needs of the workforce but can consume significant
                volumes of water, particularly on large sites with hundreds of operatives. Typical consumption
                is <strong>50&ndash;100 litres per person per day</strong>, meaning a site with 200 workers
                could use 10,000&ndash;20,000 litres per day for welfare alone. This consumption can be
                substantially reduced through water-efficient fittings and good management.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <Bath className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Water-Efficient Fittings</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Low-flow taps:</strong> Aerator or flow-restrictor fittings
                      reduce flow rate to 4&ndash;6 litres per minute (compared with 12&ndash;18 litres per
                      minute for unrestricted taps). Infrared sensor taps eliminate water running whilst hands
                      are not under the flow. Savings of <strong className="text-white">50% or more</strong> per
                      hand wash.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Dual-flush toilets:</strong> Provide a reduced flush
                      (typically 4 litres) for liquid waste and a full flush (6 litres) for solid waste, compared
                      with 9&ndash;13 litres per flush for older single-flush cisterns. Average savings of
                      <strong className="text-white"> 30&ndash;40%</strong> per flush cycle.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Waterless urinals:</strong> Use no water whatsoever,
                      eliminating flush water entirely. Modern designs use sealed cartridges or biological
                      treatments to manage hygiene and odour. Can save <strong className="text-white">up to
                      100,000 litres per urinal per year</strong> compared with automatic flush urinals.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Push-button or timed showers:</strong> Deliver water for
                      a set duration (typically 30&ndash;60 seconds) then stop automatically, preventing showers
                      from running unattended.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-emerald-400 mb-2">Meter Monitoring</p>
                  <p className="text-sm text-white/80">
                    Installing sub-meters on welfare blocks allows water consumption to be tracked, compared
                    with benchmarks, and investigated when consumption rises unexpectedly. Meter readings
                    should be taken at least weekly and compared with workforce numbers. A sudden increase
                    in consumption without a corresponding increase in workforce usually indicates a leak or
                    equipment malfunction. Smart meters with telemetry provide real-time monitoring and can
                    trigger automatic alerts for abnormal flow patterns.
                  </p>
                </div>

                <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                  <p className="text-sm font-medium text-emerald-400 mb-2">Leak Detection in Temporary Plumbing</p>
                  <p className="text-sm text-white/80">
                    Temporary water supplies and plumbing systems on construction sites are particularly
                    prone to leaks. Push-fit connections, flexible hoses, and portable units are subject to
                    movement, vibration, and accidental damage. A regular inspection regime &mdash; checking
                    all connections, joints, valves, and cisterns at least weekly &mdash; is essential. Even a
                    slow dripping leak can waste <strong className="text-white">5,000&ndash;10,000 litres per
                    year</strong>. A running toilet cistern can waste <strong className="text-white">up to 400
                    litres per day</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <InlineCheck {...quickCheckQuestions[2]} />

        {/* Section 07: Protecting Water Quality */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">07</span>
            Protecting Water Quality
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Water conservation is not only about reducing consumption &mdash; it also encompasses protecting
                the quality of water resources. Construction activities pose significant risks to water quality
                through <strong>silt runoff</strong>, <strong>chemical spills</strong>,{' '}
                <strong>fuel leaks</strong>, and <strong>alkaline discharges</strong> from concrete and cement.
                Pollution of watercourses or groundwater is a criminal offence under the Environmental Permitting
                Regulations 2016 and the Water Resources Act 1991, and can cause severe ecological damage.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <ShieldAlert className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Silt Management</p>
                </div>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    Silt (fine suspended solids) is the most common pollutant from construction sites. Earthworks,
                    excavation, and exposed ground generate silt-laden surface water runoff, particularly during
                    rainfall. Silt smothers aquatic habitats, blocks fish gills, reduces light penetration in water,
                    and can carry adsorbed pollutants (heavy metals, hydrocarbons) into watercourses.
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-sm font-medium text-white mb-1">Silt Fences</p>
                      <p className="text-xs text-white/80">
                        Permeable geotextile barriers installed along contours or at site boundaries to intercept
                        and filter silt-laden overland flow. Water passes through the fabric whilst silt is
                        retained. Effective for sheet flow but not for concentrated channel flow. Must be
                        regularly inspected and maintained.
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-sm font-medium text-white mb-1">Settlement Tanks &amp; Lagoons</p>
                      <p className="text-xs text-white/80">
                        Tanks or excavated lagoons that provide sufficient residence time for suspended solids to
                        settle out of the water before it is discharged or recycled. Detention time, surface area,
                        and flow rate are designed to achieve the required settlement. Settled silt must be
                        periodically removed and disposed of.
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-sm font-medium text-white mb-1">Silt Busters</p>
                      <p className="text-xs text-white/80">
                        Proprietary treatment units that use chemical dosing (coagulants and flocculants) to
                        accelerate the settlement of very fine suspended solids. Used where settlement alone
                        cannot achieve the required discharge quality, or where space for settlement lagoons
                        is limited.
                      </p>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-sm font-medium text-white mb-1">Drain Protection</p>
                      <p className="text-xs text-white/80">
                        Drain covers, gully guards, and straw bale barriers prevent silt from entering surface
                        water drainage systems. All drains within and adjacent to the site must be identified,
                        mapped, and protected before earthworks begin. Regular inspection ensures measures remain
                        effective.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">Oil &amp; Fuel Pollution Prevention</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Oil interceptors:</strong> Class 1 (full retention)
                      interceptors on surface water drainage systems serving areas where oil contamination is
                      possible &mdash; plant parking areas, refuelling zones, workshops. Separate oils from
                      surface water before discharge.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Bunded fuel storage:</strong> All fuel tanks, drums, and
                      containers must be stored within impermeable bunds with a capacity of at least 110% of the
                      largest container or 25% of total stored volume, whichever is greater. Required under the
                      Oil Storage Regulations 2001.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Spill kits:</strong> Strategically located at all fuel
                      storage areas, refuelling points, and high-risk work zones. Contents: absorbent granules,
                      absorbent pads and booms, drain covers or mats, PPE (gloves, goggles), disposal bags, and
                      instructions. All operatives must know the location and how to use spill kits.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Refuelling procedures:</strong> Refuelling must take place
                      on hardstanding, away from drains and watercourses, with spill equipment available. Drip
                      trays must be used under all fuel connections. Operatives must be trained and supervised.
                    </span>
                  </li>
                </ul>
              </div>

              {/* Site Water Flow Diagram */}
              <div className="bg-white/5 border border-white/10 p-4 sm:p-6 rounded-lg">
                <p className="text-sm font-medium text-white mb-4 text-center">
                  Site Water Flow &mdash; Sources, Uses, Discharge &amp; Recycling
                </p>
                <div className="flex flex-col items-center gap-3">
                  {/* Sources */}
                  <div className="grid grid-cols-3 gap-2 w-full max-w-lg">
                    {[
                      { label: 'Mains Supply', sub: 'Metered, potable' },
                      { label: 'Abstracted', sub: 'Licensed, rivers/boreholes' },
                      { label: 'Rainwater', sub: 'Harvested on site' },
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="bg-emerald-500/15 border border-emerald-400/30 rounded-lg p-2 text-center"
                      >
                        <p className="text-[10px] sm:text-xs text-emerald-400 font-medium">{item.label}</p>
                        <p className="text-[9px] sm:text-[10px] text-white/50">{item.sub}</p>
                      </div>
                    ))}
                  </div>

                  {/* Arrow */}
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-3 bg-emerald-400/40" />
                    <div className="text-emerald-400/60 text-xs">Sources</div>
                    <div className="w-0.5 h-3 bg-emerald-400/40" />
                  </div>

                  {/* Uses */}
                  <div className="bg-emerald-500/20 border-2 border-emerald-400/40 rounded-xl p-4 w-full max-w-lg text-center">
                    <p className="text-sm font-bold text-emerald-400 mb-2">Site Water Uses</p>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-1.5">
                      {[
                        'Dust Suppression',
                        'Concrete Mixing',
                        'Wheel Washing',
                        'Welfare Facilities',
                        'Testing / Commissioning',
                        'Landscaping',
                      ].map((use, i) => (
                        <div key={i} className="bg-white/5 border border-white/10 rounded p-1.5">
                          <p className="text-[10px] sm:text-xs text-white/70">{use}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Arrow */}
                  <div className="flex flex-col items-center">
                    <div className="w-0.5 h-3 bg-emerald-400/40" />
                    <div className="text-emerald-400/60 text-xs">Used water</div>
                    <div className="w-0.5 h-3 bg-emerald-400/40" />
                  </div>

                  {/* Discharge / Recycling */}
                  <div className="grid grid-cols-2 gap-2 w-full max-w-lg">
                    <div className="bg-emerald-500/10 border border-emerald-400/30 rounded-lg p-3 text-center">
                      <p className="text-xs text-emerald-400 font-medium mb-1">Recycling Loop</p>
                      <div className="space-y-1">
                        {['Settlement tanks', 'Closed-loop wheel wash', 'Greywater treatment', 'Wash water reuse'].map(
                          (item, i) => (
                            <p key={i} className="text-[10px] sm:text-xs text-white/60">{item}</p>
                          )
                        )}
                      </div>
                    </div>
                    <div className="bg-white/5 border border-white/20 rounded-lg p-3 text-center">
                      <p className="text-xs text-white/60 font-medium mb-1">Consented Discharge</p>
                      <div className="space-y-1">
                        {['Surface water (permitted)', 'Foul sewer (consented)', 'Tankered off site', 'Soakaway (approved)'].map(
                          (item, i) => (
                            <p key={i} className="text-[10px] sm:text-xs text-white/50">{item}</p>
                          )
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-5 w-5 text-amber-400" />
                  <p className="text-sm font-medium text-amber-400">
                    Environment Agency Incident Hotline
                  </p>
                </div>
                <p className="text-sm text-white/80">
                  If a pollution incident occurs that threatens water quality, it must be reported immediately
                  to the <strong className="text-white">Environment Agency incident hotline: 0800 80 70 60</strong> (24 hours,
                  365 days). Prompt reporting is a legal obligation and can also reduce the severity of the
                  pollution by enabling a rapid response. Failure to report is itself an offence. The site
                  spill response plan should include this number prominently and all site personnel should
                  know where to find it.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 08: Water Monitoring & Targets */}
        <section className="mb-10">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-3">
            <span className="text-emerald-400/80 text-sm font-normal">08</span>
            Water Monitoring &amp; Targets
          </h2>
          <div className="border-l-2 border-emerald-500/30 pl-4 sm:pl-6">
            <div className="text-white space-y-4 leading-relaxed">
              <p>
                Effective water conservation requires <strong>measurement, monitoring, and reporting</strong>.
                The adage &ldquo;you cannot manage what you do not measure&rdquo; is particularly true for
                water on construction sites, where consumption is often unmonitored and unreported. A structured
                approach to water monitoring provides visibility of consumption patterns, enables early
                detection of waste and leaks, supports compliance reporting, and drives continuous improvement
                against reduction targets.
              </p>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-3">
                  <BarChart3 className="h-5 w-5 text-emerald-400" />
                  <p className="text-sm font-medium text-emerald-400">Metering &amp; Benchmarking</p>
                </div>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Main meter:</strong> A master meter on the site mains
                      connection provides total consumption data. Readings should be taken weekly at minimum,
                      with daily readings during high-consumption phases.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Sub-metering:</strong> Sub-meters on major water uses
                      (welfare blocks, wheel wash, concrete batching, dust suppression) allow consumption to be
                      attributed to specific activities. This is essential for identifying the highest-use
                      areas and targeting conservation efforts.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Benchmarking (litres/m&sup2;):</strong> The primary
                      benchmark for construction water consumption is <strong className="text-white">litres
                      per square metre of completed gross internal floor area</strong>. Typical ranges are
                      4&ndash;20 litres/m&sup2; depending on project type. This metric enables meaningful
                      comparison across projects of different sizes and types.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Smart metering:</strong> Telemetry-enabled meters
                      transmit real-time consumption data to a monitoring platform. Automatic alerts can be
                      set for abnormal flow rates (indicating leaks), night-time flow (when no water should
                      be used), and consumption exceeding daily or weekly thresholds.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm font-medium text-emerald-400 mb-3">BREEAM Water Credits</p>
                <div className="text-sm text-white/80 space-y-3">
                  <p>
                    BREEAM awards credits under the <strong className="text-white">Water (Wat)</strong> category
                    for measures that reduce water consumption in both the completed building and during the
                    construction process. Water credits contribute to the overall BREEAM rating (Pass, Good,
                    Very Good, Excellent, Outstanding).
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-sm font-medium text-white mb-1">Building Water Credits</p>
                      <ul className="text-xs text-white/80 space-y-1">
                        <li>&bull; Water-efficient fittings (taps, WCs, showers)</li>
                        <li>&bull; Rainwater harvesting systems</li>
                        <li>&bull; Greywater recycling systems</li>
                        <li>&bull; Leak detection and shut-off systems</li>
                        <li>&bull; Water metering and sub-metering</li>
                      </ul>
                    </div>
                    <div className="bg-white/5 border border-white/10 p-3 rounded-lg">
                      <p className="text-sm font-medium text-white mb-1">Construction Water Credits</p>
                      <ul className="text-xs text-white/80 space-y-1">
                        <li>&bull; Water consumption monitoring and reporting</li>
                        <li>&bull; Setting and tracking reduction targets</li>
                        <li>&bull; Implementing conservation strategies</li>
                        <li>&bull; Demonstrating mains water reduction</li>
                        <li>&bull; Using recycled or harvested water</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white/5 border border-white/10 p-4 rounded-lg">
                <p className="text-sm font-medium text-white mb-3">Reporting &amp; Reduction Targets</p>
                <ul className="text-sm text-white/80 space-y-2">
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Monthly reporting:</strong> Water consumption should be
                      reported monthly to the project team and client. Reports should show total consumption,
                      breakdown by use, comparison with benchmarks, progress against targets, and explanations
                      for any significant variances.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Reduction targets:</strong> Most major contractors set
                      corporate water reduction targets &mdash; commonly 10&ndash;20% reduction in mains water
                      consumption per &pound;100,000 of project value or per square metre of completed floor
                      area, measured against a baseline year. Targets should be ambitious but achievable and
                      aligned with the company&rsquo;s sustainability strategy.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Considerate Constructors Scheme:</strong> Sites registered
                      with the CCS are expected to monitor environmental impacts including water use. Water
                      monitoring and conservation contribute to the &ldquo;Respecting the Environment&rdquo;
                      assessment criterion.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="flex-shrink-0 mt-1.5 w-1 h-1 rounded-full bg-emerald-400" />
                    <span>
                      <strong className="text-white">Lessons learned:</strong> At project completion, water
                      consumption data should be analysed, lessons learned documented, and best practices
                      shared across the organisation to inform future projects.
                    </span>
                  </li>
                </ul>
              </div>

              <div className="bg-emerald-500/10 border border-emerald-500/30 p-4 rounded-lg">
                <p className="text-sm text-white">
                  <strong className="text-emerald-400">Industry Trends:</strong> The UK construction industry
                  is moving towards <strong>net zero water</strong> ambitions, where sites aim to balance their
                  water consumption with water savings and recycling. The Environment Agency&rsquo;s long-term
                  water resources strategy identifies construction as a sector that must significantly reduce
                  its freshwater demand. Climate change is expected to increase water stress in south-east
                  England, making water conservation on construction sites not just an environmental imperative
                  but a practical necessity &mdash; sites may face restrictions on mains supply during drought
                  periods. Projects that embed water conservation from the outset are more resilient, more
                  cost-effective, and better positioned to meet increasingly stringent client and regulatory
                  requirements.
                </p>
              </div>
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
        <Quiz title="Section 3 Knowledge Check" questions={quizQuestions} />

        {/* Bottom Navigation */}
        <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 border-t border-white/10">
          <Button
            variant="ghost"
            size="lg"
            className="w-full sm:w-auto min-h-[48px] text-white/70 hover:text-white hover:bg-white/5 touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-3-section-2">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Section 2
            </Link>
          </Button>
          <Button
            size="lg"
            className="w-full sm:w-auto min-h-[48px] bg-emerald-500 text-white hover:bg-emerald-500/90 font-semibold touch-manipulation active:scale-[0.98]"
            asChild
          >
            <Link to="../environmental-sustainability-module-3-section-4">
              Section 4
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </Button>
        </nav>
      </article>
    </div>
  );
}
