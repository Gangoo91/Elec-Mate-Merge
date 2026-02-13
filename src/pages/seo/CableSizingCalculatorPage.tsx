import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Cable,
  Calculator,
  Thermometer,
  Ruler,
  ShieldCheck,
  Zap,
  BookOpen,
  Layers,
  ArrowDownUp,
  RefreshCw,
  Database,
  CheckCircle2,
} from 'lucide-react';

const PAGE_TITLE = 'Cable Sizing Calculator BS 7671 | Free Online Tool | Elec-Mate';
const PAGE_DESCRIPTION =
  'Calculate cable sizes to BS 7671:2018 + Amendment 3. Considers current carrying capacity, voltage drop, fault current, and thermal constraints. 50+ electrical calculators included.';

const faqs = [
  {
    question: 'What factors affect cable sizing to BS 7671?',
    answer:
      'There are five primary factors that determine the minimum cable size for any circuit to BS 7671. First, the design current (Ib) of the circuit — the maximum current the load will draw in normal service. Second, the rating of the protective device (In), which must be equal to or greater than the design current. Third, the current carrying capacity (Iz) of the cable, which must be equal to or greater than the protective device rating after applying correction factors. Fourth, the voltage drop in the cable, which must not exceed the limits set by BS 7671 Regulation 525 (typically 3% for lighting circuits and 5% for other circuits). Fifth, the cable must be able to withstand the let-through energy (I squared t) of the protective device under fault conditions without its insulation being damaged.',
  },
  {
    question: 'What are the BS 7671 correction factors for cable sizing?',
    answer:
      'BS 7671 requires several correction factors to be applied to the tabulated current carrying capacity of a cable. Ca is the ambient temperature correction factor — if the ambient temperature is above the reference temperature (30 degrees C for most cable types), the cable can carry less current, so you apply a factor less than 1. Cg is the grouping correction factor — when cables are installed together, they heat each other up, reducing the capacity of each cable. Ci is the thermal insulation correction factor — if a cable passes through or is surrounded by thermal insulation, it cannot dissipate heat effectively. Cf is the semi-enclosed fuse factor (0.725) — applied when the protective device is a BS 3036 semi-enclosed (rewirable) fuse. The effective current carrying capacity required is calculated as It = In / (Ca x Cg x Ci x Cf), and the selected cable must have a tabulated Iz equal to or greater than It.',
  },
  {
    question: 'What reference methods does BS 7671 define for cable installation?',
    answer:
      'BS 7671 defines a series of standard reference methods in Table 4A2 that describe how a cable is installed, as this affects its ability to dissipate heat. The main reference methods are: A — enclosed in conduit in a thermally insulated wall; B — enclosed in conduit on a wall or in trunking; C — clipped direct to a surface; D — in ducts in the ground; E — free air (on a cable tray, touching); F — free air (on a cable tray, spaced); G — free air (on a cable ladder, touching). The installation method determines which column of the current carrying capacity tables (Appendix 4) you use. For example, a 2.5mm squared twin and earth cable has a different current carrying capacity when clipped direct (Method C) compared to when it is enclosed in conduit in an insulated wall (Method A).',
  },
  {
    question: 'How do I check voltage drop for a cable to BS 7671?',
    answer:
      'BS 7671 Regulation 525.1 requires that the voltage drop between the origin of the installation and any load point does not impair the safe functioning of the equipment. Appendix 12 (formerly part of Appendix 4) provides the voltage drop per ampere per metre (mV/A/m) for each cable type and installation method. To calculate the voltage drop, multiply the mV/A/m value from the tables by the design current (Ib) in amps and the route length (L) in metres, then divide by 1000 to get the result in volts. For a 230V single-phase supply, the maximum voltage drop to the furthest point is typically 3% for lighting (6.9V) and 5% for other uses (11.5V). For three-phase circuits, a 5% limit gives 19.9V on a 400V supply. If the voltage drop exceeds the limit, you need to increase the cable size until the drop is within tolerance.',
  },
  {
    question: 'Does the Elec-Mate cable sizing calculator work offline?',
    answer:
      'Yes. The Elec-Mate cable sizing calculator is built into the mobile app and works fully offline. All the BS 7671 tabulated data, correction factors, reference methods, and voltage drop values are stored locally on your device. You can size cables on site with no internet connection. Results sync to the cloud when you reconnect, and the calculator can be used alongside the EICR, EIC, and Minor Works certificate forms to cross-check cable sizes against recorded test results.',
  },
];

const howToSteps = [
  {
    name: 'Determine the design current',
    text: 'Calculate the design current (Ib) of the circuit. For resistive loads, divide the power in watts by the supply voltage (Ib = P/V). For motor loads, use the full load current from the manufacturer. For discharge lighting, multiply the lamp wattage by 1.8 to account for control gear losses and harmonic currents.',
  },
  {
    name: 'Select the protective device',
    text: 'Choose a protective device with a nominal rating (In) equal to or greater than the design current. The device must also be appropriate for the type of circuit — for example, a Type B MCB for resistive loads, Type C for motor or transformer inrush, or Type D for very high inrush currents.',
  },
  {
    name: 'Identify the installation method',
    text: 'Determine the reference method from BS 7671 Table 4A2 that matches how the cable will be installed. Common methods include Method A (conduit in insulated wall), Method B (conduit on wall), Method C (clipped direct), and Reference Method 100 for thermally insulating material on one side. The method determines which column of the current carrying capacity tables to use.',
  },
  {
    name: 'Apply correction factors',
    text: 'Apply all relevant correction factors. Ca for ambient temperature (from Table 4B1/4B2), Cg for grouping (from Table 4C1 to 4C5), Ci for thermal insulation (from Regulation 523.9), and Cf for semi-enclosed fuses (0.725). Calculate the required tabulated current carrying capacity: It = In / (Ca x Cg x Ci x Cf).',
  },
  {
    name: 'Select the cable from the tables',
    text: 'Look up the appropriate Appendix 4 table for your cable type (e.g., Table 4D5 for 90 degree C thermosetting flat cable, or Table 4D2A for 70 degree C thermoplastic singles). Find the smallest cable size with a tabulated Iz value equal to or greater than your calculated It value.',
  },
  {
    name: 'Check voltage drop',
    text: 'Calculate the voltage drop using the mV/A/m values from Appendix 12 for your selected cable size and installation method. Multiply by design current and route length, then divide by 1000. Ensure the result does not exceed 3% for lighting or 5% for other circuits. If it exceeds the limit, increase the cable size and re-check.',
  },
  {
    name: 'Verify fault current withstand',
    text: 'Confirm the selected cable can withstand the let-through energy of the protective device under fault conditions. The adiabatic equation is: S = (I squared t) / k squared, where S is the minimum conductor cross-sectional area, I squared t is the energy let-through of the device, and k is a constant for the cable insulation type. The cable CSA must be at least equal to S.',
  },
];

const features = [
  {
    icon: Calculator,
    title: 'BS 7671 Tables Built In',
    description:
      'All current carrying capacity tables from Appendix 4 and voltage drop data from Appendix 12 are embedded in the calculator. No need to carry the book.',
  },
  {
    icon: Thermometer,
    title: 'Automatic Correction Factors',
    description:
      'Enter the ambient temperature, grouping arrangement, and insulation conditions. The calculator applies Ca, Cg, Ci, and Cf automatically.',
  },
  {
    icon: ArrowDownUp,
    title: 'Voltage Drop Calculation',
    description:
      'Calculates voltage drop for your route length and design current. Flags results that exceed the 3% lighting or 5% general limit.',
  },
  {
    icon: ShieldCheck,
    title: 'Fault Current Check',
    description:
      'Verifies the selected cable can withstand the prospective fault current using the adiabatic equation from BS 7671 Regulation 434.',
  },
  {
    icon: Layers,
    title: 'All Reference Methods',
    description:
      'Supports all standard reference methods from Table 4A2 including clipped direct, conduit, trunking, cable tray, and underground ducts.',
  },
  {
    icon: Cable,
    title: 'Multiple Cable Types',
    description:
      'Covers thermoplastic (PVC) and thermosetting (XLPE/LSF) cables, singles, flat twin and earth, SWA, and flexible cables.',
  },
  {
    icon: Zap,
    title: '50+ Calculators Included',
    description:
      'Cable sizing is just one of 50+ electrical calculators. Also includes voltage drop, max demand, diversity, conduit fill, earth rod, and more.',
  },
  {
    icon: RefreshCw,
    title: 'Works Offline',
    description:
      'All calculations run locally on your device. Size cables on site with no internet connection. Results sync when you reconnect.',
  },
  {
    icon: Database,
    title: 'Save and Compare',
    description:
      'Save cable sizing calculations and compare different options side by side. Attach results to job records and certificates.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Cable Sizing Calculator',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'iOS, Android, Web',
  description: PAGE_DESCRIPTION,
  url: 'https://elec-mate.com/tools/cable-sizing-calculator',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
    description: '7-day free trial',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.7',
    ratingCount: '89',
    bestRating: '5',
    worstRating: '1',
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
  name: 'How to Size a Cable to BS 7671',
  description:
    'A step-by-step guide to selecting the correct cable size for an electrical circuit using the methodology set out in BS 7671:2018 (IET Wiring Regulations, 18th Edition).',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

export default function CableSizingCalculatorPage() {
  useSEO({
    title: 'Cable Sizing Calculator BS 7671 | Free Online Tool',
    description: PAGE_DESCRIPTION,
    schema: softwareAppSchema,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...softwareAppSchema })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}</script>
        <script type="application/ld+json">{JSON.stringify({ '@context': 'https://schema.org', ...howToSchema })}</script>
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <Cable className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">BS 7671:2018 + A2:2022 Compliant</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            <span className="text-yellow-400">Cable Sizing Calculator</span> to BS 7671
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mb-8">
            Size cables correctly to the 18th Edition IET Wiring Regulations. Automatic correction factors, voltage
            drop calculation, fault current verification, and all Appendix 4 tables built in.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="/auth/signup"
              className="inline-flex items-center h-14 px-8 bg-yellow-500 hover:bg-yellow-400 text-black font-semibold rounded-xl touch-manipulation transition-colors"
            >
              Start 7-Day Free Trial
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center h-14 px-8 border border-white/20 hover:border-yellow-500/40 text-white font-semibold rounded-xl touch-manipulation transition-colors"
            >
              See How It Works
            </a>
          </div>
        </div>
      </section>

      {/* What is cable sizing */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is Cable Sizing and Why Does It Matter?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Cable sizing is the process of selecting the correct cross-sectional area (CSA) of conductor for an
              electrical circuit. It is one of the most fundamental design decisions in any electrical installation. Get
              it wrong, and the consequences range from nuisance tripping and poor equipment performance to cable
              overheating, insulation failure, and fire.
            </p>
            <p>
              BS 7671:2018 (the IET Wiring Regulations, 18th Edition) sets out the methodology for cable sizing in
              Section 523, with the current carrying capacity tables in Appendix 4 and the voltage drop data in
              Appendix 12. The process involves calculating the design current, selecting a protective device, determining
              the installation method, applying correction factors for environmental conditions, selecting a cable with
              sufficient current carrying capacity, and then verifying voltage drop and fault current withstand.
            </p>
            <p>
              The cable must be large enough to carry the full load current without its temperature exceeding the rated
              value for its insulation (70 degrees C for thermoplastic/PVC, 90 degrees C for thermosetting/XLPE). It
              must also limit voltage drop to within the permitted values, and it must be able to survive the thermal
              effects of a short circuit for the time it takes the protective device to disconnect.
            </p>
            <p>
              For working electricians, cable sizing calculations are a daily requirement. Whether you are wiring a
              domestic kitchen circuit, running a submain to an outbuilding, or designing a three-phase distribution
              board for a commercial fit-out, you need to verify the cable size against BS 7671 before you install it.
              The Elec-Mate cable sizing calculator does this in seconds, right on your phone.
            </p>
          </div>
        </div>
      </section>

      {/* The Five Factors */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            The Five Factors in Cable Sizing
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-8">
            <p>
              BS 7671 requires you to consider five key factors when selecting a cable size. Each factor can independently
              determine the minimum cable CSA, so all five must be checked. The governing factor (the one that requires
              the largest cable) determines the final cable size.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                1
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">Design Current (Ib)</h3>
                <p className="text-white text-sm leading-relaxed">
                  The maximum sustained current the circuit will carry in normal service. This is your starting point.
                  For simple resistive loads, Ib = P / V. For motor loads, use the full load current. For discharge
                  lighting, multiply lamp watts by 1.8. The protective device rating (In) must be equal to or greater
                  than Ib.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                2
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">Current Carrying Capacity (Iz)</h3>
                <p className="text-white text-sm leading-relaxed">
                  The cable must have a tabulated current carrying capacity (Iz) that, after correction factors are
                  applied, is at least equal to the protective device rating (In). The required tabulated value is
                  calculated as It = In / (Ca x Cg x Ci x Cf). You then select the smallest cable from the Appendix 4
                  tables with Iz greater than or equal to It.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                3
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">Voltage Drop</h3>
                <p className="text-white text-sm leading-relaxed">
                  Regulation 525.1 requires that the voltage drop from the origin of the installation to any load point
                  does not impair the functioning of the equipment. The standard limits are 3% for lighting circuits
                  (6.9V on a 230V supply) and 5% for other circuits (11.5V on a 230V supply). Voltage drop is
                  calculated using the mV/A/m values from Appendix 12, multiplied by the design current and cable length.
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                4
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">Fault Current Withstand</h3>
                <p className="text-white text-sm leading-relaxed">
                  Under short circuit conditions, the cable must be able to withstand the heat generated by the fault
                  current for the duration it takes the protective device to disconnect. This is checked using the
                  adiabatic equation from Regulation 434: minimum CSA = square root of (I squared t) / k, where I
                  squared t is the energy let-through of the device and k is a constant for the conductor and insulation
                  type (115 for copper/PVC, 143 for copper/XLPE).
                </p>
              </div>
            </div>

            <div className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                5
              </div>
              <div>
                <h3 className="font-bold text-white text-lg mb-1">Earth Fault Loop Impedance</h3>
                <p className="text-white text-sm leading-relaxed">
                  The total earth fault loop impedance (Zs) must be low enough for the protective device to operate
                  within the required disconnection time (0.4 seconds for final circuits, 5 seconds for distribution
                  circuits). A longer cable run increases the circuit impedance, so in some cases you may need to
                  increase the cable size (or the CPC size) to achieve an acceptable Zs value.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Correction Factors */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Understanding Correction Factors
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The tabulated current carrying capacities in Appendix 4 of BS 7671 assume a set of reference conditions:
              an ambient temperature of 30 degrees C (for cables in air), a single circuit with no grouping, and no
              thermal insulation in contact with the cable. When real-world conditions differ from these reference
              conditions, correction factors must be applied.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 mt-6">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-center gap-3 mb-3">
                <Thermometer className="w-5 h-5 text-yellow-400" />
                <h3 className="font-bold text-white text-lg">Ca — Ambient Temperature</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                If the ambient temperature is above 30 degrees C, the cable can carry less current. Tables 4B1 and 4B2
                provide the correction factors. For example, at 40 degrees C with 70 degree C thermoplastic insulation,
                Ca = 0.87. At 35 degrees C, Ca = 0.94. For installations below 30 degrees C (e.g., underground at 20
                degrees C), Ca is greater than 1, slightly increasing the permitted capacity.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-center gap-3 mb-3">
                <Layers className="w-5 h-5 text-yellow-400" />
                <h3 className="font-bold text-white text-lg">Cg — Grouping</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                When multiple circuits are grouped together (e.g., in trunking, conduit, or on a cable tray), they share
                heat and each cable can carry less current. Tables 4C1 through 4C5 provide grouping factors based on
                the number of circuits and the arrangement. For example, 3 circuits in a single layer on a tray gives
                Cg = 0.79, while 6 circuits in conduit gives Cg = 0.57.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-5 h-5 text-yellow-400" />
                <h3 className="font-bold text-white text-lg">Ci — Thermal Insulation</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Cables surrounded by thermal insulation cannot dissipate heat effectively. If a cable is totally
                surrounded by thermally insulating material for more than 0.5 metres, a derating factor of 0.5 applies
                (Regulation 523.9). For cables touching insulation on one side, reference method 100 (formerly 101/102)
                applies, which is built into the table values. The calculator selects the correct approach based on your
                input.
              </p>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <div className="flex items-center gap-3 mb-3">
                <ShieldCheck className="w-5 h-5 text-yellow-400" />
                <h3 className="font-bold text-white text-lg">Cf — Semi-Enclosed Fuse Factor</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                When the protective device is a BS 3036 semi-enclosed (rewirable) fuse, an additional factor of 0.725
                must be applied. This is because rewirable fuses have a fusing factor of approximately 2 (they may not
                blow until the current reaches twice their rated value), so the cable must be rated higher to allow for
                this. This factor is not applied for MCBs, RCBOs, or cartridge fuses, which have tighter operating
                characteristics.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Reference Methods */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Reference Methods Explained
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The way a cable is installed has a significant effect on its ability to dissipate heat, and therefore on
              its current carrying capacity. BS 7671 Table 4A2 defines a series of reference methods that cover the most
              common installation arrangements. When you use the cable sizing tables in Appendix 4, you must select the
              column that corresponds to your reference method.
            </p>
            <p>
              The most common reference methods encountered in UK domestic and commercial installations are:
            </p>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
              <ul className="space-y-3 text-white">
                <li className="flex items-start gap-3">
                  <Ruler className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Method A:</strong> Enclosed in conduit in a thermally insulated wall. The most restrictive common method, giving the lowest current carrying capacities.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Ruler className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Method B:</strong> Enclosed in conduit on a wall, or in trunking on a wall. Slightly better than Method A as heat can escape more easily.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Ruler className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Method C:</strong> Clipped direct to a surface (e.g., flat twin and earth cable clipped to joists). A common domestic method with good heat dissipation.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Ruler className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Method D:</strong> Cables in ducts in the ground. Used for underground supply cables, with different ambient temperature assumptions (20 degrees C reference).</span>
                </li>
                <li className="flex items-start gap-3">
                  <Ruler className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Methods E/F/G:</strong> Free air methods — cable tray (touching), cable tray (spaced), and cable ladder. These give the highest current carrying capacities as the cable can radiate heat freely.</span>
                </li>
                <li className="flex items-start gap-3">
                  <Ruler className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
                  <span><strong>Reference Method 100:</strong> Enclosed in a building void where thermal insulation is in contact with one side. Increasingly common with modern energy-efficient building standards.</span>
                </li>
              </ul>
            </div>
            <p>
              Choosing the wrong reference method is one of the most common cable sizing errors. The Elec-Mate calculator
              presents the reference methods with clear descriptions and illustrations, so you select the right one
              every time.
            </p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            What the Elec-Mate Cable Sizing Calculator Includes
          </h2>
          <p className="text-white mb-8 leading-relaxed">
            Everything you need to size cables to BS 7671 on your phone or tablet, with no internet connection required.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* How To Section */}
      <section id="how-it-works" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            How to Size a Cable to BS 7671
          </h2>
          <p className="text-white mb-8 leading-relaxed">
            Follow these seven steps to select the correct cable size for any circuit, using the methodology set out in
            BS 7671:2018. The Elec-Mate calculator handles steps 2 through 7 automatically once you enter the circuit
            parameters.
          </p>
          <div className="space-y-4">
            {howToSteps.map((step, index) => (
              <div
                key={step.name}
                className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center font-bold text-yellow-400 shrink-0">
                  {index + 1}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{step.name}</h3>
                  <p className="text-white text-sm leading-relaxed">{step.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Practical Examples */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Practical Cable Sizing Examples
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              To illustrate the cable sizing process, consider a common domestic scenario: a ring final circuit supplying
              socket outlets in a kitchen, protected by a 32A Type B MCB, installed as flat twin and earth cable clipped
              to joists (Reference Method C), with an ambient temperature of 30 degrees C and no grouping.
            </p>
            <p>
              Since the ambient temperature is at the reference value (30 degrees C), Ca = 1.0. There is no grouping,
              so Cg = 1.0. No thermal insulation contact, so Ci = 1.0. The protective device is an MCB, so Cf does not
              apply. The required tabulated current carrying capacity is It = 32 / (1.0 x 1.0 x 1.0) = 32A. From Table
              4D5, column 6 (Reference Method C), a 2.5mm squared cable has Iz = 27A, which is less than 32A. However,
              for a ring final circuit, the cable is effectively in parallel, so 2.5mm squared is the standard and
              accepted cable size for a domestic ring final circuit — the ring configuration means each conductor only
              carries approximately half the total current.
            </p>
            <p>
              Now consider a more challenging scenario: a 3-phase submain to a workshop 45 metres from the main
              distribution board, carrying a design current of 80A, installed as SWA cable clipped direct (Method C),
              at 35 degrees C ambient, with 2 other circuits grouped on the same tray. The correction factors would
              be Ca = 0.94, Cg = 0.79, giving It = 80 / (0.94 x 0.79) = 107.7A. You would then select from the
              appropriate SWA table and verify voltage drop over the 45-metre run does not exceed 5%.
            </p>
            <p>
              The Elec-Mate calculator performs these calculations instantly. Enter the circuit parameters, and the app
              shows the recommended cable size, the voltage drop as both a value in volts and a percentage, and whether
              the fault current withstand is acceptable.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Frequently Asked Questions About Cable Sizing
          </h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.question}
                className="group rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden"
              >
                <summary className="flex items-center justify-between cursor-pointer p-5 text-white font-semibold text-left touch-manipulation min-h-[44px]">
                  <span>{faq.question}</span>
                  <span className="ml-4 shrink-0 text-yellow-400 text-xl group-open:rotate-45 transition-transform">+</span>
                </summary>
                <div className="px-5 pb-5 text-white text-sm leading-relaxed">
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Stop flipping through cable sizing tables"
        subheading="Join 430+ UK electricians using Elec-Mate to size cables in seconds. 7-day free trial, cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </PublicPageLayout>
  );
}
