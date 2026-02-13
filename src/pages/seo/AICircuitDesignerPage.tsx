import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  CircuitBoard,
  Brain,
  Cable,
  ShieldCheck,
  Zap,
  Calculator,
  FileText,
  CheckCircle2,
  ChevronRight,
  ArrowDown,
  HelpCircle,
  Gauge,
  Plug,
  Table2,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const PAGE_TITLE = 'AI Circuit Designer | BS 7671 Compliant Design Tool | Elec-Mate';
const PAGE_DESCRIPTION =
  'Design electrical circuits with AI tailored and trained specifically for UK electrical work. Automatic cable sizing, protection device selection, and voltage drop verification to BS 7671:2018+A3:2024.';

const faqs = [
  {
    question: 'How does the AI Circuit Designer select cable sizes?',
    answer:
      'The AI Circuit Designer follows the full adiabatic cable sizing method from BS 7671 Appendix 4. It starts with the design current (Ib) for the circuit, selects a protective device rating (In) that is greater than or equal to Ib, then determines the required current-carrying capacity (It) by applying all relevant correction factors. These include the ambient temperature factor (Ca) from Table 4B1, the grouping factor (Cg) from Tables 4C1 to 4C6, the thermal insulation factor (Ci) from Table 52.2, and where applicable the semi-enclosed fuse factor (Cc) of 0.725. The designer then selects the smallest cable size from the appropriate table in Appendix 4 (for example, Table 4D5 for thermoplastic flat cable) whose tabulated current-carrying capacity (Iz) exceeds the required value of It. It then verifies the cable meets the voltage drop limits, earth fault loop impedance requirements, and adiabatic equation for fault protection. If any check fails, the designer automatically upsizes the cable and recalculates.',
  },
  {
    question: 'Can the AI handle three-phase circuit design?',
    answer:
      'Yes. The AI Circuit Designer handles single-phase and three-phase circuit design. For three-phase installations, it calculates line currents, selects appropriate three-pole and four-pole protective devices (MCCBs, TP MCBs, TP+N RCBOs), sizes three-phase cables using the correct current-carrying capacity tables, and verifies voltage drop across all three phases. It understands the differences between balanced and unbalanced three-phase loads, calculates neutral current in unbalanced systems, and selects neutral conductor sizes accordingly. For commercial and industrial installations, it produces distribution board schedules showing phase allocation to achieve balanced loading across the three phases, and calculates diversity factors appropriate to the type of installation.',
  },
  {
    question: 'Does the Circuit Designer verify earth fault loop impedance?',
    answer:
      'Yes. For every circuit, the designer verifies that the earth fault loop impedance (Zs) at the furthest point of the circuit does not exceed the maximum value permitted for the selected protective device. It uses the formula Zs = Ze + (R1+R2), where Ze is the external earth fault loop impedance of the supply and (R1+R2) is the resistance of the line conductor plus the circuit protective conductor, corrected for conductor operating temperature. The designer references the maximum Zs values from BS 7671 Tables 41.2 to 41.6 for different protective device types and ratings. If the calculated Zs exceeds the maximum, the designer either increases the cable size to reduce (R1+R2), selects a larger protective device rating where the design current permits, or recommends the use of an RCBO for additional fault protection.',
  },
  {
    question: 'How does the AI handle EV charger circuit design?',
    answer:
      'EV charger circuits have specific requirements that the Circuit Designer addresses automatically. For a typical 7.4 kW single-phase charger drawing 32A, the designer applies a continuous load factor (the charger operates at rated current for extended periods, so the cable must be rated for sustained loading). It specifies Type A RCD protection as a minimum, or Type B where required by the charger manufacturer for DC fault current protection. The cable sizing accounts for the full route from the consumer unit to the charging point, including any derating for thermal insulation where the cable passes through insulated walls or loft spaces. For installations requiring a dedicated supply (such as a 22 kW three-phase charger), the designer includes the supply assessment and any upgrades needed to the main incoming supply.',
  },
  {
    question: 'What earthing systems does the Circuit Designer support?',
    answer:
      'The Circuit Designer supports all earthing systems defined in BS 7671: TN-S (separate neutral and earth, typically older PME supplies with a lead-sheathed cable earth), TN-C-S (combined neutral and earth at the supply transformer, separated at the intake position — the most common arrangement for modern UK domestic supplies), and TT (no earth provided by the distributor, requiring a local earth electrode). For each earthing system, the designer applies the correct maximum disconnection times from BS 7671 Table 41.1 (0.4 seconds for final circuits not exceeding 32A, 5 seconds for distribution circuits), selects appropriate protective devices, and verifies earth fault loop impedance values. For TT systems, it accounts for the typically higher Ze values and recommends RCD protection where the earth fault loop impedance would otherwise be too high for overcurrent devices alone to provide disconnection within the required time.',
  },
  {
    question: 'Can the designer produce a complete consumer unit schedule for an EIC?',
    answer:
      'Yes. When you describe an installation, the Circuit Designer generates a complete consumer unit schedule that maps directly onto the schedule of circuits section of the Electrical Installation Certificate (EIC). For each circuit, the schedule includes: circuit number, circuit description, protective device type and rating (MCB Type B/C/D or RCBO), cable type and reference (for example, 6242Y for twin and earth flat cable), cable size, design current (Ib), protective device rating (In), maximum permitted Zs, voltage drop in volts and as a percentage, and whether the circuit requires RCD protection. The schedule also specifies the recommended consumer unit make and model, the main switch rating, and SPD (Surge Protection Device) requirements under BS 7671 Section 443. The output is formatted so you can transfer the values directly onto the EIC without additional calculation.',
  },
  {
    question: 'How does voltage drop verification work?',
    answer:
      'The Circuit Designer automatically verifies voltage drop for every circuit against the limits specified in BS 7671 Appendix 12. The standard limits are 3% for lighting circuits and 5% for all other circuits, measured from the origin of the installation to the furthest point of the circuit. The designer calculates voltage drop using the millivolt-per-ampere-per-metre (mV/A/m) values from the cable data tables in Appendix 4, multiplied by the design current and the cable route length. For longer cable runs — such as an outbuilding supply or a submain to a separate distribution board — the designer accounts for the cumulative voltage drop across all sections of the circuit. If the calculated voltage drop exceeds the permitted limit, the designer automatically upsizes the cable to bring the voltage drop within limits and recalculates all other parameters to confirm compliance.',
  },
];

const features = [
  {
    icon: Cable,
    title: 'Adiabatic Cable Sizing',
    description:
      'Full BS 7671 Appendix 4 cable sizing with all correction factors: ambient temperature (Ca), grouping (Cg), thermal insulation (Ci), and semi-enclosed fuse factor (Cc).',
  },
  {
    icon: ShieldCheck,
    title: 'Protection Device Selection',
    description:
      'Automatic selection of MCBs, RCBOs, and RCDs with correct type ratings. Type B for resistive loads, Type C for small motors, Type D for large inductive loads.',
  },
  {
    icon: Gauge,
    title: 'Voltage Drop Verification',
    description:
      'Automatic voltage drop calculation against BS 7671 limits: 3% for lighting circuits, 5% for power circuits. Calculates cumulative drop for submains.',
  },
  {
    icon: Zap,
    title: 'Earth Fault Loop Impedance',
    description:
      'Verifies Zs at the furthest point of every circuit against BS 7671 Tables 41.2-41.6. Accounts for conductor temperature and cable length.',
  },
  {
    icon: Table2,
    title: 'Consumer Unit Schedules',
    description:
      'Generates complete consumer unit schedules ready for EIC documentation. Circuit numbers, device ratings, cable sizes, and Zs values all included.',
  },
  {
    icon: Plug,
    title: 'TN-S, TN-C-S & TT Systems',
    description:
      'Full support for all UK earthing arrangements. Correct disconnection times, earth fault loop values, and RCD requirements for each system type.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate AI Circuit Designer',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web, iOS, Android',
  description: PAGE_DESCRIPTION,
  url: 'https://elec-mate.com/tools/ai-circuit-designer',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
    description: '7-day free trial, then from £9.99/month',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.9',
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

export default function AICircuitDesignerPage() {
  useSEO({
    title: 'AI Circuit Designer | BS 7671 Compliant Design Tool',
    description: PAGE_DESCRIPTION,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...softwareAppSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...faqSchema })}
        </script>
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-28 px-5">
        <div className="absolute inset-0 bg-gradient-to-b from-yellow-500/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-sm font-medium mb-6">
            <Brain className="w-4 h-4" />1 of 8 Elec-AI Specialist Agents
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            AI Circuit Designer
            <span className="block text-yellow-400 mt-1">BS 7671 Compliant Design</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Design complete electrical circuits with AI tailored and trained specifically for UK
            electrical work. Automatic cable sizing, protection device selection, voltage drop
            verification, and earth fault loop impedance checks — all to BS 7671:2018+A3:2024.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/signup"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation transition-colors"
            >
              Try Circuit Designer Free
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <a
              href="#what-is-circuit-designer"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              How It Works
              <ArrowDown className="w-4 h-4 ml-1" />
            </a>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-8 text-sm text-white">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              BS 7671:2018+A3:2024
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              430+ electricians
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0" />
              Part of 8 Elec-AI agents
            </span>
          </div>
        </div>
      </section>

      {/* What Is the Circuit Designer */}
      <section id="what-is-circuit-designer" className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <CircuitBoard className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What Is the AI Circuit Designer?
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The AI Circuit Designer is one of eight specialist Elec-AI agents built into the
              Elec-Mate platform. It is tailored and trained specifically for UK electrical work,
              with deep knowledge of BS 7671:2018+A3:2024, the IET On-Site Guide, IET Guidance Notes
              1 through 8, and thousands of real-world installation scenarios. Unlike generic AI
              tools, this agent understands the specific requirements of UK electrical installations
              and produces designs that comply with the current edition of the Wiring Regulations.
            </p>
            <p>
              You describe an installation in plain English — for example, "four-bedroom detached
              house with an EV charger in the garage, 10.8 kW electric shower, induction hob, gas
              boiler, LED downlights throughout, and a garden office with its own distribution
              board" — and the Circuit Designer generates a complete electrical design. This
              includes a full consumer unit schedule with circuit-by-circuit details, cable sizing
              calculations with all correction factors applied, protection device selections with
              type ratings and breaking capacities, voltage drop verification for every circuit, and
              earth fault loop impedance checks against the maximum permitted values for the chosen
              protective devices.
            </p>
            <p>
              The designer handles the full range of UK domestic, commercial, and light industrial
              installations. For domestic work, it designs consumer unit layouts with the correct
              split-load or dual-RCD configurations, specifies RCBO protection where required, and
              includes surge protection device (SPD) requirements under BS 7671 Section 443. For
              commercial work, it produces distribution board schedules with three-phase load
              balancing, submain calculations, and diversity assessments. For all installation
              types, it accounts for the earthing system (TN-S, TN-C-S, or TT) and applies the
              correct disconnection times from BS 7671 Table 41.1.
            </p>
            <p>
              What distinguishes this tool from a simple cable sizing calculator is that it designs
              the complete circuit, not just one parameter in isolation. It considers how cable
              size, protection device rating, circuit length, installation method, and earthing
              arrangement all interact. If a change to one parameter affects another — for example,
              if upsizing a cable for voltage drop compliance changes the (R1+R2) value and
              therefore the maximum Zs — the designer recalculates everything automatically and
              presents a fully verified design.
            </p>
          </div>
        </div>
      </section>

      {/* How the Circuit Designer Works */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Calculator className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How the Circuit Designer Works
            </h2>
          </div>
          <div className="space-y-4 my-6">
            {[
              {
                step: '1',
                title: 'Describe Your Installation',
                text: 'Enter the property type, circuits needed, earthing system, and any specific requirements in plain English. The AI asks clarifying questions if it needs more detail — for example, the cable route lengths for critical circuits, the ambient temperature conditions, or whether cables will pass through thermal insulation.',
              },
              {
                step: '2',
                title: 'AI Designs the Complete Circuit',
                text: 'The designer calculates design currents, selects protective devices (MCBs, RCBOs, or MCCBs with correct type ratings), sizes cables using the full adiabatic method from BS 7671 Appendix 4, and verifies voltage drop, earth fault loop impedance, and prospective fault current for every circuit.',
              },
              {
                step: '3',
                title: 'Review with Regulation References',
                text: 'Every design decision is explained with references to specific BS 7671 regulations. If the designer chose a 6mm cable instead of 4mm, it shows the calculation step by step, citing the specific tables and correction factors used. You can verify every decision independently.',
              },
              {
                step: '4',
                title: 'Export the Consumer Unit Schedule',
                text: 'Download the complete consumer unit schedule in a format that maps directly onto the Electrical Installation Certificate (EIC). Circuit numbers, descriptions, device ratings, cable sizes, and test parameters are all ready to transfer to your certification documentation.',
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20 flex-shrink-0">
                  <span className="font-bold text-yellow-400">{item.step}</span>
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg mb-1">{item.title}</h3>
                  <p className="text-white leading-relaxed text-sm">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cable Sizing Deep Dive */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Cable className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Cable Sizing to BS 7671 Appendix 4
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Cable sizing is the foundation of safe circuit design, and the AI Circuit Designer
              follows the complete BS 7671 method rather than taking shortcuts. The process begins
              with determining the design current (Ib) based on the connected load. For a 10.8 kW
              electric shower on a 230V single-phase supply, this is 10,800 / 230 = 47A. The
              designer then selects the next standard protective device rating (In) above the design
              current — in this case, a 50A device.
            </p>
            <p>
              The required current-carrying capacity of the cable (It) is then calculated by
              dividing the protective device rating by the product of all applicable correction
              factors: It = In / (Ca x Cg x Ci x Cc). For a cable installed in a loft space with
              thermal insulation on one side only (Ci = 0.75), in an ambient temperature of 30
              degrees Celsius (Ca = 0.94 from Table 4B1), grouped with two other circuits (Cg = 0.79
              from Table 4C1), the required It would be 50 / (0.94 x 0.79 x 0.75) = 89.7A. The
              designer then selects the smallest cable from the appropriate table whose tabulated
              current-carrying capacity (Iz) exceeds this value.
            </p>
            <p>
              After selecting the cable, the designer verifies three additional requirements. First,
              the voltage drop from the origin of the installation to the load must not exceed 3%
              for lighting circuits or 5% for other circuits. Second, the earth fault loop impedance
              at the furthest point of the circuit must be low enough for the protective device to
              disconnect within the required time (0.4 seconds for final circuits not exceeding 32A,
              5 seconds for distribution circuits). Third, the cable must satisfy the adiabatic
              equation (k squared S squared greater than or equal to I squared t) to ensure it can
              withstand the thermal effects of a fault current for the duration of the protective
              device operating time. If any of these checks fails, the designer automatically
              upsizes the cable and recalculates.
            </p>
          </div>
        </div>
      </section>

      {/* Protection Device Selection */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <ShieldCheck className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Protection Device Selection
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The Circuit Designer selects the correct type and rating of protective device for
              every circuit based on the load characteristics and BS 7671 requirements. It
              understands the different operating characteristics of Type B, Type C, and Type D MCBs
              and selects the appropriate type for each application. Type B devices (tripping at 3
              to 5 times rated current) are used for resistive and lightly inductive loads such as
              socket outlets, lighting, and electric showers. Type C devices (tripping at 5 to 10
              times rated current) are selected for circuits with moderate inrush currents such as
              small motors, fluorescent lighting banks, and IT equipment. Type D devices (tripping
              at 10 to 20 times rated current) are specified for circuits with high inrush currents
              such as large motors, transformers, and X-ray equipment.
            </p>
            <p>
              The designer also applies the RCD protection requirements of BS 7671. Under Regulation
              411.3.3, additional protection by an RCD with a rated residual operating current not
              exceeding 30 mA must be provided for socket outlets with a rated current not exceeding
              32A, mobile equipment with a rated current not exceeding 32A for use outdoors, and
              cables concealed in walls at a depth less than 50mm where the wall does not have
              earthed metallic covering. The designer specifies RCBO protection (combined MCB and
              RCD in a single device) where individual circuit RCD protection is needed, or
              recommends a split-load consumer unit configuration with appropriate RCD coverage.
            </p>
            <p>
              For installations with battery storage systems, solar PV, or EV chargers with DC fault
              current capability, the designer specifies the appropriate RCD type. Standard Type AC
              RCDs detect only AC residual currents, Type A RCDs detect AC and pulsating DC residual
              currents, and Type B RCDs detect AC, pulsating DC, and smooth DC residual currents.
              The designer selects the correct type based on the equipment connected, in accordance
              with BS 7671 Regulation 531.3 and the new Regulation 530.3.201 added by Amendment
              3:2024 covering bidirectional and unidirectional protective devices.
            </p>
          </div>
        </div>
      </section>

      {/* Why Electricians Choose Section */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Why Electricians Choose Elec-Mate for Circuit Design
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Tailored and trained specifically for UK electrical work. The AI Circuit Designer
            handles the calculations so you can focus on the installation. Part of 70 calculators, 8
            AI agents, and 36+ training courses.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* Training Data */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <FileText className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Trained on BS 7671:2018+A3:2024
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The AI Circuit Designer is tailored and trained specifically for UK electrical work.
              Its knowledge base covers the complete scope of BS 7671:2018+A3:2024 (the 18th Edition
              of the IET Wiring Regulations including Amendment 3, issued July 2024), the IET
              On-Site Guide, all eight IET Guidance Notes, and a curated library of real-world
              installation case studies and worked examples.
            </p>
            <p>
              Amendment 3:2024 (A3:2024) is particularly relevant for the Circuit Designer because
              it adds Regulation 530.3.201, which introduces requirements for bidirectional and
              unidirectional protective devices. This is critical for modern installations
              incorporating battery energy storage systems, solar PV arrays, and other sources of
              reverse power flow where standard unidirectional devices may not provide adequate
              protection. The Circuit Designer automatically applies these requirements when you
              describe an installation that includes such equipment.
            </p>
          </div>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {[
              'BS 7671:2018+A3:2024 (18th Edition)',
              'Amendment 3:2024 — Regulation 530.3.201',
              'IET On-Site Guide',
              'IET Guidance Notes 1-8',
              'GN3: Inspection & Testing (9th Edition)',
              'Appendix 4 Cable Sizing Tables',
              'Real-world installation case studies',
              'TN-S, TN-C-S, and TT system design',
            ].map((item) => (
              <div
                key={item}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10"
              >
                <CheckCircle2 className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-white text-sm font-medium">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <HelpCircle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group p-5 rounded-2xl bg-white/[0.04] border border-white/10 hover:border-yellow-500/30 transition-colors"
              >
                <summary className="flex items-start gap-3 cursor-pointer touch-manipulation list-none [&::-webkit-details-marker]:hidden">
                  <ChevronRight className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0 transition-transform group-open:rotate-90" />
                  <h3 className="font-bold text-white text-lg">{faq.question}</h3>
                </summary>
                <div className="mt-3 pl-8">
                  <p className="text-white leading-relaxed text-sm">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <SEOCTASection
        heading="Design your first circuit in 60 seconds"
        subheading="Join 430+ UK electricians using AI for BS 7671 compliant circuit design. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
