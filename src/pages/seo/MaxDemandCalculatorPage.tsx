import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Calculator,
  Zap,
  Building2,
  Home,
  CheckCircle2,
  BookOpen,
  BarChart3,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ArrowDown,
  BatteryCharging,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'What is maximum demand and how is it different from connected load?',
    answer:
      'Connected load (also called installed capacity) is the total power rating of every piece of electrical equipment connected to the installation, added together. Maximum demand is the maximum current or power that the installation is actually expected to draw at any one time, taking into account that not all equipment operates simultaneously and not all equipment runs at full load. For example, a house may have a connected load of 40 kW (cooker, shower, immersion heater, sockets, lighting, EV charger all added together), but the maximum demand — after applying diversity factors — may only be 15 to 20 kW. The maximum demand determines the size of the main switch, the meter tails, the cutout fuse, and the DNO supply capacity needed.',
  },
  {
    question: 'Where do I find diversity factors in BS 7671?',
    answer:
      'Diversity factors for estimating maximum demand are found in BS 7671 Appendix 12 (formerly Appendix 1 in earlier editions). Table 1B provides diversity factors for different types of final circuits in domestic and small commercial installations. The table is organised by circuit type (lighting, heating, cooking appliances, motors, etc.) and gives the diversity allowance as either a percentage or a formula. For example, for cooking appliances, Table 1B states "first 10 A of the total rated current plus 30% of the remainder plus 5 A if the cooker control unit has a socket outlet." It is important to note that these diversity factors are guidelines for typical installations — they are not mandatory requirements, and professional judgement should be applied.',
  },
  {
    question: 'How do I calculate maximum demand for a domestic cooker?',
    answer:
      'The diversity calculation for a domestic cooker to BS 7671 Table 1B is: take the first 10 A of the total rated current at full load, then add 30% of the remainder. If the cooker control unit incorporates a socket outlet, add a further 5 A. For example, a cooker rated at 12 kW on a 230 V supply draws a full load current of 12000 / 230 = 52.2 A. The first 10 A is counted in full. The remainder is 52.2 - 10 = 42.2 A, and 30% of that is 12.7 A. The diversified demand is therefore 10 + 12.7 = 22.7 A, plus 5 A if there is a socket outlet on the cooker control unit, giving 27.7 A. This is significantly less than the full 52.2 A because it is unlikely that every ring, every hob, and the oven will all be at maximum simultaneously.',
  },
  {
    question: 'Do I apply diversity to EV charger loads?',
    answer:
      'This depends on the number of chargers and the installation type. For a single domestic EV charger, BS 7671 does not provide a specific diversity factor in Table 1B, and general practice is to include the full rated current of the charger (typically 32 A for a 7.4 kW single-phase unit) in the maximum demand calculation without diversity, since the charger runs at full power for extended periods (often overnight). For multiple EV chargers in a commercial or multi-occupancy setting, diversity can be applied — BEAMA and the IET have published guidance suggesting diversity factors for groups of EV chargers. Smart charging systems that dynamically manage load also reduce the effective maximum demand.',
  },
  {
    question: 'When should I NOT apply diversity?',
    answer:
      'Diversity should not be applied in situations where all loads genuinely do operate simultaneously at full capacity. Common examples include data centres (where server loads are continuous and redundant supplies must handle full capacity), process control systems, hospital critical care areas, and any installation where load shedding could cause safety or operational failures. Diversity should also not be applied when sizing standby generators unless the generator has automatic load management. When in doubt, it is safer to design for the full connected load. Under-estimating maximum demand leads to overloaded supplies, nuisance tripping of the main protective device, and potential requests from the DNO for a supply upgrade — which can be costly and time-consuming.',
  },
];

const howToSteps = [
  {
    name: 'List all final circuits and their loads',
    text: 'Create a complete list of every final circuit in the installation, noting the type of circuit (lighting, socket outlet, cooker, shower, immersion heater, EV charger, etc.) and the total connected load in watts or the design current in amps. For existing installations, take readings from the distribution board schedule. For new designs, use the equipment ratings from the specification.',
  },
  {
    name: 'Look up diversity factors from Table 1B',
    text: 'For each circuit type, find the applicable diversity factor from BS 7671 Appendix 12, Table 1B. Note that the factors differ depending on the circuit type: lighting uses a percentage method, cooking appliances use the "first 10 A plus 30% of remainder" formula, and some loads like immersion heaters and showers are taken at full load with no diversity (unless there are multiple units).',
  },
  {
    name: 'Apply diversity to each circuit',
    text: 'Calculate the diversified demand for each circuit by applying the Table 1B factor to the connected load. For ring final circuits, Table 1B allows the current demand to be taken as the design current of the circuit. For lighting, the factor depends on the number of points and the type of premises. Work through each circuit systematically.',
  },
  {
    name: 'Sum the diversified demands',
    text: 'Add together all the diversified demand values from each circuit to obtain the total maximum demand for the installation. Express this in both amps and kilowatts. For three-phase installations, balance the loads as evenly as possible across the three phases and calculate the maximum demand per phase — the highest phase determines the supply requirement.',
  },
  {
    name: 'Size the supply and main protective device',
    text: 'Use the total maximum demand to select the appropriate main switch or isolator rating, meter tail cable size, and cutout fuse rating. Verify that the DNO supply capacity is sufficient. For a standard domestic single-phase supply, the cutout fuse is typically 60 A or 100 A. If the calculated maximum demand exceeds the available supply capacity, you may need to apply load management, request a supply upgrade from the DNO, or consider a three-phase supply.',
  },
];

const features = [
  {
    icon: Calculator,
    title: 'Automatic Diversity Factors',
    description:
      'All BS 7671 Table 1B diversity factors built in. Select the circuit type and load, and the correct factor is applied automatically. No manual table look-ups.',
  },
  {
    icon: Home,
    title: 'Domestic Load Assessment',
    description:
      'Pre-configured for typical domestic circuits: ring finals, lighting, cooker, shower, immersion heater, EV charger. The cooker formula is calculated automatically.',
  },
  {
    icon: Building2,
    title: 'Commercial Load Assessment',
    description:
      'Supports three-phase installations with automatic phase balancing. Add commercial loads including motors, air conditioning, lifts, and catering equipment.',
  },
  {
    icon: BatteryCharging,
    title: 'EV Charger Load Calculations',
    description:
      'Includes EV charger loads with guidance on when to apply diversity. Supports single charger domestic and multi-charger commercial scenarios.',
  },
  {
    icon: BarChart3,
    title: 'Supply Capacity Check',
    description:
      'Compares your calculated maximum demand against common UK supply ratings (60 A, 80 A, 100 A single-phase; three-phase options). Flags when a supply upgrade is needed.',
  },
  {
    icon: BookOpen,
    title: 'BS 7671 Appendix 12 Compliant',
    description:
      'All calculations follow the methodology in BS 7671:2018+A2:2022 Appendix 12 and Table 1B. Verified against the current edition of the IET Wiring Regulations.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Maximum Demand Calculator',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Calculate maximum demand to BS 7671 Appendix 12 with diversity factors from Table 1B. Covers domestic, commercial, cooker, shower, EV charger, and heating loads.',
  url: 'https://elec-mate.com/tools/max-demand-calculator',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
    description: '7-day free trial, then from £9.99/month',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '430',
    bestRating: '5',
  },
};

const faqSchema = {
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const howToSchema = {
  '@type': 'HowTo',
  name: 'How to Calculate Maximum Demand to BS 7671',
  description:
    'Step-by-step guide to calculating maximum demand for electrical installations in the UK using BS 7671 Appendix 12 diversity factors from Table 1B.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

export default function MaxDemandCalculatorPage() {
  useSEO({
    title: 'Maximum Demand Calculator BS 7671 | Diversity Factors',
    description:
      'Calculate maximum demand to BS 7671 Appendix 12 with diversity factors from Table 1B. Covers domestic, commercial, cooker, shower, EV charger, and heating loads.',
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...softwareAppSchema })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...howToSchema })}</script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 px-5">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-6">
            <Zap className="w-4 h-4" />
            Part of 50+ Electrical Calculators
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Maximum Demand Calculator
            <span className="block text-yellow-400 mt-1">BS 7671 Diversity Factors</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Calculate maximum demand using BS 7671 Appendix 12 diversity factors from Table 1B. Supports domestic and commercial load assessments including cookers, showers, EV chargers, and heating loads.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/signup"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation transition-colors"
            >
              Try the Calculator Free
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <a
              href="#how-it-works"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              See How It Works
              <ArrowDown className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* What Is Maximum Demand */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What Is Maximum Demand and Why Does It Matter?</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Maximum demand is the highest rate of electrical energy consumption that an installation is expected to draw from the supply at any given moment, taking into account the likelihood that not all connected equipment will be operating simultaneously at full load. It is expressed in amperes (A) or kilowatts (kW) and is the single most important figure for determining the size of the electricity supply, the main protective device, and the meter tails.
            </p>
            <p>
              Understanding maximum demand is essential for every electrician, whether working on a new domestic installation, an alteration to an existing property, or a full commercial fit-out. If the maximum demand is underestimated, the supply will be inadequate — the main fuse or breaker will trip under peak load conditions, equipment will not function correctly, and the installation may need an expensive supply upgrade from the distribution network operator (DNO). If the maximum demand is overestimated, the client pays for a larger supply than necessary, with higher connection charges and standing costs.
            </p>
            <p>
              The key concept that makes maximum demand calculations practical is diversity. In any real installation, it is statistically unlikely that every appliance will be switched on and running at full power at exactly the same time. A domestic kitchen may have a cooker rated at 12 kW, a kettle at 3 kW, a washing machine at 2.4 kW, a dishwasher at 2.2 kW, and several other appliances — but they are rarely all drawing maximum current simultaneously. Diversity factors quantify this statistical reduction and are published in BS 7671 Appendix 12, Table 1B.
            </p>
            <p>
              Getting maximum demand right is particularly important in the current era, as installations increasingly include EV chargers (7.4 kW for a typical single-phase home charger), heat pumps (3 to 12 kW), and battery storage systems. These new loads can significantly increase the maximum demand beyond what the existing supply was designed to handle, and electricians must assess the impact before adding them.
            </p>
          </div>
        </div>
      </section>

      {/* BS 7671 Appendix 12 and Table 1B */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">BS 7671 Appendix 12 and Table 1B</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              BS 7671:2018+A2:2022 addresses maximum demand estimation in Appendix 12 (previously Appendix 1 in the 16th and 17th Editions). This appendix provides guidance on assessing the maximum demand of an installation and includes Table 1A (standard circuit arrangements for domestic premises) and Table 1B (allowances for diversity).
            </p>
            <p>
              <strong className="text-yellow-400">Table 1A</strong> lists the standard circuit arrangements for a typical domestic dwelling, including the number and type of circuits for lighting, socket outlets, cooker, immersion heater, shower, and other fixed appliances. It serves as a reference for what circuits are expected in a standard domestic installation.
            </p>
            <p>
              <strong className="text-yellow-400">Table 1B</strong> is the critical table for maximum demand calculations. It lists the diversity allowances that may be applied to different types of final circuits. The allowances are expressed differently depending on the circuit type:
            </p>
            <ul className="space-y-3 my-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Lighting:</strong> 66% of the total current demand for domestic premises. For example, if the total lighting load draws 10 A, the diversified demand is 6.6 A.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Heating (space heating):</strong> For domestic premises, the first kilowatt at full load plus 50% of the remainder. Commercial premises may use different factors depending on the control system.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Cooking appliances:</strong> The first 10 A of the total rated current at full load, plus 30% of the remainder, plus 5 A if the cooker control unit has a socket outlet.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Socket outlets (ring or radial):</strong> For domestic premises, 100% of the largest circuit plus 40% of every subsequent circuit. This reflects the fact that socket outlet circuits in a home are unlikely to all be at full load simultaneously.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span className="text-white">
                  <strong className="text-yellow-400">Immersion heater, shower, EV charger:</strong> These are generally taken at full rated current with no diversity, as they tend to operate at full load for extended periods. However, where multiple units exist, some diversity may be applied.
                </span>
              </li>
            </ul>
            <p>
              It is important to understand that the Table 1B factors are guidance, not absolute rules. They represent typical usage patterns for domestic and small commercial installations. For unusual installations, high-demand premises, or applications where reliability is critical, a more conservative approach may be appropriate.
            </p>
          </div>
        </div>
      </section>

      {/* Domestic Load Assessment */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Home className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Domestic Maximum Demand — Worked Example</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Consider a typical three-bedroom semi-detached house with the following circuits and loads. We will calculate the maximum demand step by step using the Table 1B diversity factors.
            </p>
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-6">
            <div className="grid grid-cols-4 gap-px bg-white/10">
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Circuit</div>
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Connected Load</div>
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Diversity Rule</div>
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">After Diversity</div>
            </div>
            {[
              { circuit: 'Lighting (3 circuits)', load: '8.7 A', rule: '66%', after: '5.7 A' },
              { circuit: 'Ring final 1 (kitchen)', load: '32 A', rule: '100% (largest)', after: '32.0 A' },
              { circuit: 'Ring final 2 (ground)', load: '32 A', rule: '40%', after: '12.8 A' },
              { circuit: 'Ring final 3 (first floor)', load: '32 A', rule: '40%', after: '12.8 A' },
              { circuit: 'Cooker (12 kW)', load: '52.2 A', rule: '10 A + 30% rem + 5 A', after: '27.7 A' },
              { circuit: 'Shower (9.5 kW)', load: '41.3 A', rule: '100%', after: '41.3 A' },
              { circuit: 'Immersion heater (3 kW)', load: '13.0 A', rule: '100%', after: '13.0 A' },
              { circuit: 'EV charger (7.4 kW)', load: '32.0 A', rule: '100%', after: '32.0 A' },
            ].map((row) => (
              <div key={row.circuit} className="grid grid-cols-4 gap-px bg-white/5">
                <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">{row.circuit}</div>
                <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.load}</div>
                <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.rule}</div>
                <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.after}</div>
              </div>
            ))}
          </div>

          <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 my-6">
            <p className="text-white leading-relaxed">
              <strong className="text-yellow-400">Total maximum demand:</strong> 5.7 + 32.0 + 12.8 + 12.8 + 27.7 + 41.3 + 13.0 + 32.0 = <strong className="text-yellow-400">177.3 A</strong>
            </p>
            <p className="text-white leading-relaxed mt-2">
              Wait — this exceeds the standard 100 A supply. But this is before applying the overall assessment. In practice, the shower and cooker are unlikely to run at full load simultaneously with the EV charger and all ring finals loaded. A realistic assessment, using engineering judgement alongside Table 1B, would place this installation at approximately <strong className="text-yellow-400">80 to 90 A</strong> — within the capacity of a 100 A supply, though marginal. If the maximum demand is genuinely expected to exceed 100 A (for example, if the EV charger and shower are frequently used at the same time), a supply upgrade or load management system would be required.
            </p>
          </div>

          <div className="space-y-4 text-white leading-relaxed">
            <p>
              This example illustrates why maximum demand assessment requires professional judgement as well as table look-ups. The Table 1B factors are a starting point, but the electrician must consider the actual usage patterns of the occupants. A household with two electric vehicles, an electric shower, and an induction hob will have very different peak demands from a retired couple with a gas cooker and no EV.
            </p>
          </div>
        </div>
      </section>

      {/* Commercial Load Assessment */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Building2 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Commercial Load Assessment and Three-Phase Balancing</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Commercial maximum demand assessments follow the same fundamental principles as domestic ones, but with additional complexity. Three-phase supplies are standard for commercial premises, and loads must be balanced as evenly as possible across the three phases. The maximum demand of the installation is determined by the most heavily loaded phase.
            </p>
            <p>
              For commercial premises, the diversity factors from Table 1B still apply where the circuit types match, but many commercial loads — such as three-phase motors, air conditioning units, commercial kitchen equipment, and server rooms — require specific assessment. Motor loads should include the starting current requirements, as some motor types draw five to eight times their full load current during start-up, which can affect the sizing of the main protective device and the supply capacity.
            </p>
            <p>
              When assessing a commercial installation, it is essential to obtain a detailed load schedule from the client or the building services engineer. This schedule should list every item of fixed equipment, its power rating, the number of phases it uses, and an estimate of its duty cycle (how often and how long it operates). From this, you can build up the maximum demand per phase and verify that the three-phase supply is adequately sized.
            </p>
            <p>
              Common commercial loads and their typical diversity treatment include: office socket outlets (100% of largest circuit plus 40% of subsequent), commercial lighting (90% of total — higher than domestic because commercial lighting runs for longer periods), air conditioning (100% of largest unit plus 80% of subsequent units due to simultaneous operation), and commercial kitchen equipment (which may need the full cooker diversity formula applied to each appliance, or a combined assessment based on the kitchen consultant's load schedule).
            </p>
            <p>
              The Elec-Mate calculator supports both single-phase and three-phase installations. For three-phase, you assign each circuit to a phase (L1, L2, or L3), and the calculator shows the load on each phase, the degree of imbalance, and the total maximum demand.
            </p>
          </div>
        </div>
      </section>

      {/* When NOT to Apply Diversity */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BarChart3 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">When NOT to Apply Diversity and DNO Supply Capacity</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              While diversity factors are valuable for typical domestic and commercial installations, there are scenarios where applying diversity would be unsafe or inappropriate. Recognising these situations is an important part of professional competence.
            </p>
            <p>
              <strong className="text-yellow-400">Data centres and server rooms</strong> typically run at high utilisation continuously, and the supply must be sized for the full connected load plus cooling. Applying domestic diversity factors to a data centre would result in an inadequate supply and potential downtime.
            </p>
            <p>
              <strong className="text-yellow-400">Industrial process installations</strong> where all equipment operates simultaneously as part of a production line must be assessed at full load. Shutting down part of the line due to supply overload could have serious safety and financial consequences.
            </p>
            <p>
              <strong className="text-yellow-400">Emergency and life safety systems</strong> — fire alarm systems, emergency lighting, sprinkler pumps, smoke ventilation — must be available at full capacity at all times and should never have diversity applied to their supply calculations.
            </p>
            <p>
              <strong className="text-yellow-400">Standby generator sizing</strong> requires careful consideration. If a generator must supply the entire installation during a mains failure, it must be sized for the maximum demand that will occur when all loads reconnect simultaneously (this is often higher than normal running demand due to motor starting currents and battery charging surges). Load shedding and staged reconnection can mitigate this.
            </p>
            <p>
              The maximum demand figure ultimately determines the DNO supply requirements. A standard domestic single-phase supply in the UK is typically provided with a 60 A or 100 A cutout fuse. If the calculated maximum demand exceeds this, the options are: apply load management (such as a smart EV charger that reduces power when other loads are high), request a supply upgrade from the DNO (which may involve a new service cable, cutout, and meter), or consider a three-phase supply. The Elec-Mate calculator flags when the maximum demand approaches or exceeds standard supply ratings.
            </p>
          </div>
        </div>
      </section>

      {/* How-To Section */}
      <section id="how-it-works" className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <CheckCircle2 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How to Calculate Maximum Demand — Step by Step</h2>
          </div>
          <div className="space-y-4">
            {howToSteps.map((step, index) => (
              <div key={index} className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 flex-shrink-0">
                  <span className="font-bold text-yellow-400">{index + 1}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{step.name}</h3>
                  <p className="text-white leading-relaxed text-sm">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Why Use the Elec-Mate Maximum Demand Calculator?
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians working to BS 7671. Faster and more reliable than manual calculations with Table 1B.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <HelpCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group border border-white/10 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between p-4 min-h-[44px] touch-manipulation cursor-pointer text-white font-medium">
                  <span>{faq.question}</span>
                  <ChevronDown className="w-5 h-5 text-yellow-400 group-open:rotate-180 transition-transform" />
                </summary>
                <div className="px-4 pb-4 text-white text-sm leading-relaxed">{faq.answer}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Calculate Maximum Demand in Minutes"
        subheading="Join 430+ UK electricians using Elec-Mate for on-site calculations. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
