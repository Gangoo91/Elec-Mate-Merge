import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Calculator,
  Smartphone,
  ShieldCheck,
  Clock,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Zap,
  Users,
  CircuitBoard,
  Gauge,
  Cable,
  Thermometer,
  FileCheck2,
  Ruler,
} from 'lucide-react';

const PAGE_TITLE = 'Adiabatic Equation Calculator | CPC Sizing BS 7671 | Elec-Mate';
const PAGE_DESCRIPTION =
  'Calculate minimum CPC size using the adiabatic equation (S = square root of I squared t divided by k). BS 7671 Regulation 543.1.3 compliant. k values for copper, aluminium, and steel conductors. Start free.';

const faqs = [
  {
    question: 'What is the adiabatic equation and when is it used?',
    answer:
      'The adiabatic equation is the formula used to calculate the minimum cross-sectional area (CSA) of a protective conductor (circuit protective conductor, earthing conductor, or supplementary bonding conductor) required to withstand the thermal effects of a fault current flowing for the duration of the disconnection time. The equation is S = square root of (I squared multiplied by t) divided by k, where S is the minimum conductor CSA in mm squared, I is the fault current in amperes, t is the disconnection time of the protective device in seconds, and k is a factor that depends on the conductor material, insulation type, and initial and final temperatures. It is used whenever you need to verify that a protective conductor is large enough to carry the earth fault current until the protective device disconnects — a requirement of BS 7671 Regulation 543.1.3.',
  },
  {
    question: 'What are the k values for different conductor materials?',
    answer:
      'The k value depends on the conductor material and insulation type. For copper conductors with 70 degrees C PVC insulation (the most common scenario for domestic wiring), k = 115. For copper conductors with 90 degrees C thermoplastic insulation, k = 100. For copper conductors with 90 degrees C thermosetting insulation (such as XLPE or EPR), k = 143. For aluminium conductors with PVC insulation, k = 76. For steel conductors (such as steel wire armour used as a CPC), k = 51 with PVC insulation. These values are tabulated in BS 7671 Table 54.2 (for protective conductors that are part of a cable), Table 54.3 (for protective conductors not part of a cable), and Table 54.4 (for bare protective conductors). The k value accounts for the heat capacity of the conductor material and the maximum temperature the insulation can withstand during a fault.',
  },
  {
    question: 'How do I find the disconnection time for the adiabatic equation?',
    answer:
      'The disconnection time (t) is the time taken by the protective device (MCB, fuse, or RCBO) to disconnect the supply when the earth fault current flows through it. This is read from the time/current characteristics of the device. For a Type B MCB, the magnetic trip operates instantaneously (approximately 0.01 seconds or 10 milliseconds) when the fault current exceeds 5 times the rated current (In). For a Type C MCB, the magnetic trip operates between 5 and 10 times In. For a BS 88 fuse, the disconnection time depends on the current and is read from the published time/current curves. For the adiabatic equation, you use the actual disconnection time at the calculated fault current. If the fault current is high enough to cause instantaneous magnetic tripping of an MCB, t is typically taken as 0.01 seconds. For fuses where the disconnection is not instantaneous, the time is read from the characteristic curve. The protective device manufacturer data provides these values.',
  },
  {
    question: 'Can the CPC be smaller than the line conductor?',
    answer:
      'Yes, in many cases the CPC can be smaller than the line conductor. BS 7671 provides two methods for sizing protective conductors: the simplified method in Table 54.7 (which relates CPC size to the line conductor size) and the adiabatic equation method in Regulation 543.1.3 (which calculates the actual minimum size needed). The simplified method in Table 54.7 states that for line conductors up to 16 mm squared, the CPC should be the same size as the line conductor; for 16 to 35 mm squared, the CPC should be 16 mm squared; and for line conductors above 35 mm squared, the CPC should be half the line conductor CSA. However, the adiabatic equation often shows that a smaller CPC is adequate because the fault current and disconnection time combination does not generate enough energy to overheat the conductor. Using the adiabatic equation can allow a smaller CPC, potentially saving material cost, but the calculated minimum must never be less than the values in Table 54.7 footnotes or any other applicable requirement.',
  },
  {
    question: 'What happens if the CPC is too small for the fault current?',
    answer:
      'If the CPC is smaller than the minimum size calculated by the adiabatic equation, the conductor could overheat during a fault. The energy dissipated in the conductor during the fault (I squared multiplied by t, known as the energy let-through) heats the conductor. If the conductor is too small, this heat can raise the temperature above the maximum permitted value for the insulation, causing the insulation to melt, degrade, or catch fire. In the worst case, the conductor itself could melt, losing the earth fault path entirely and leaving exposed metalwork live. This is why the adiabatic check is a critical safety verification — it ensures the protective conductor can survive the thermal stress of a fault for the entire duration it takes the protective device to disconnect.',
  },
  {
    question: 'Does the adiabatic equation apply to earthing conductors and bonding conductors?',
    answer:
      'Yes. The adiabatic equation applies to all types of protective conductors — circuit protective conductors (CPCs), main earthing conductors, supplementary bonding conductors, and equipotential bonding conductors. Regulation 543.1.3 covers CPCs, Regulation 544.1.1 covers main earthing conductors, and Regulation 544.2 covers bonding conductors. For each type, the calculation uses the relevant fault current (the earth fault current for CPCs, the let-through energy of the upstream protective device for earthing conductors), the disconnection time of the relevant protective device, and the appropriate k value for the conductor material and insulation. In practice, the main earthing conductor and main bonding conductors must also withstand the fault current for the disconnection time of the main protective device (the supply fuse or main switch).',
  },
];

const howToSteps = [
  {
    name: 'Open the adiabatic equation calculator',
    text: 'Launch Elec-Mate and navigate to the calculators section. Tap "Adiabatic Equation" from the list of 70 available calculators. The calculator opens with fields for the three input values: fault current, disconnection time, and k value.',
  },
  {
    name: 'Enter the fault current (I)',
    text: 'Enter the earth fault current in amperes at the point in the circuit where the CPC size is being verified. This is typically the prospective earth fault current (PEFC) measured or calculated at the furthest point of the circuit, which gives the lowest fault current and therefore the most onerous condition for disconnection time.',
  },
  {
    name: 'Enter the disconnection time (t)',
    text: 'Enter the disconnection time of the protective device in seconds at the given fault current. For MCBs operating in the magnetic trip region, this is typically 0.01 seconds. For fuses, read the time from the published time/current characteristic at the calculated fault current. The calculator includes a reference library of common device characteristics.',
  },
  {
    name: 'Select the conductor material and insulation (k value)',
    text: 'Select the conductor material (copper, aluminium, or steel) and insulation type (PVC, XLPE, or bare) from the dropdown. The calculator automatically applies the correct k value from BS 7671 Tables 54.2 to 54.6. You can also enter a custom k value if needed.',
  },
  {
    name: 'View the minimum CPC size',
    text: 'The calculator instantly displays the minimum CPC cross-sectional area in mm squared. It also shows the nearest standard cable size above the calculated minimum and compares the result to the Table 54.7 simplified method to confirm which requirement governs.',
  },
  {
    name: 'Save or export the result',
    text: 'Save the calculation to your project records or include it in your design documentation. The result can be cross-referenced with your cable schedule and circuit design to verify that all CPCs are adequately sized.',
  },
];

const features = [
  {
    icon: Calculator,
    title: 'Instant Adiabatic Calculation',
    description:
      'Enter fault current, disconnection time, and conductor type — get the minimum CPC size in mm squared instantly.',
  },
  {
    icon: Thermometer,
    title: 'All k Values Built In',
    description:
      'k values for copper, aluminium, and steel with PVC, XLPE, thermoplastic, and bare conductors — all from BS 7671 Tables 54.2 to 54.6.',
  },
  {
    icon: Cable,
    title: 'Standard Cable Size Selection',
    description:
      'The calculator shows the nearest standard cable CSA above the calculated minimum, so you can select the correct cable immediately.',
  },
  {
    icon: Gauge,
    title: 'Table 54.7 Comparison',
    description:
      'Compares the adiabatic result against the simplified Table 54.7 method to confirm which requirement governs the CPC size.',
  },
  {
    icon: ShieldCheck,
    title: 'BS 7671 Reg 543.1.3',
    description:
      'Designed around BS 7671:2018+A3:2024 Regulation 543.1.3 — the requirement to verify protective conductor sizing against fault energy.',
  },
  {
    icon: Smartphone,
    title: '70 Calculators in One App',
    description:
      'The adiabatic equation is one of 70 electrical calculators in Elec-Mate — 56 technical and 14 business calculators, all on your phone.',
  },
  {
    icon: CircuitBoard,
    title: 'Works With PFC Calculator',
    description:
      'Use the prospective fault current calculator to find I, then feed it directly into the adiabatic equation. Seamless workflow.',
  },
  {
    icon: BookOpen,
    title: 'Worked Examples Included',
    description:
      'Access worked examples for domestic and commercial circuits showing how the adiabatic equation is applied in real installations.',
  },
  {
    icon: Clock,
    title: 'Offline Capable',
    description:
      'All calculators work offline. Size CPCs on site in basements, plant rooms, and areas with no mobile signal.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Adiabatic Equation Calculator',
  applicationCategory: 'BusinessApplication',
  operatingSystem: 'iOS, Android, Web',
  description: PAGE_DESCRIPTION,
  url: 'https://elec-mate.com/tools/adiabatic-equation-calculator',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
    description: '7-day free trial',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '127',
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
  name: 'How to Calculate Minimum CPC Size Using the Adiabatic Equation in Elec-Mate',
  description:
    'A step-by-step guide to calculating the minimum circuit protective conductor cross-sectional area using the adiabatic equation (S = square root of I squared t divided by k) in the Elec-Mate app.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

export default function AdiabaticEquationCalculatorPage() {
  useSEO({
    title: 'Adiabatic Equation Calculator | CPC Sizing BS 7671',
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
            <Ruler className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">BS 7671:2018+A3:2024 Regulation 543.1.3</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            <span className="text-yellow-400">Adiabatic Equation</span> Calculator for CPC Sizing
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto leading-relaxed mb-8">
            Calculate the minimum CPC cross-sectional area instantly using the adiabatic equation. Built-in k values
            for all conductor types, disconnection time references, and 70 electrical calculators — all on your phone.
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

      {/* What is the Adiabatic Equation */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            What Is the Adiabatic Equation?
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The adiabatic equation is the fundamental formula used to determine whether a protective conductor
              is large enough to withstand the heating effect of a fault current. When an earth fault occurs in an
              electrical circuit, the fault current flows through the circuit protective conductor (CPC) until the
              protective device (MCB, fuse, or RCBO) disconnects the supply. During this time, the fault current
              heats the conductor. The adiabatic equation calculates the minimum conductor size that can absorb
              this heat energy without the insulation reaching a damaging temperature.
            </p>
            <p>
              The term "adiabatic" means "without heat transfer to the surroundings." The equation assumes that
              all the heat generated by the fault current is absorbed by the conductor itself, with no heat being
              dissipated to the surrounding insulation, cable sheath, or environment during the fault. This is a
              valid assumption because fault durations are very short (typically fractions of a second), and in
              such a short time, virtually no heat escapes the conductor. The calculation therefore gives a
              conservative (worst-case) result.
            </p>
            <p>
              The equation is given in BS 7671 Regulation 543.1.3 and is the method used to verify that protective
              conductors are adequately sized. It applies to circuit protective conductors (CPCs), main earthing
              conductors, supplementary bonding conductors, and all other protective conductors within an installation.
              It is one of the most important calculations in electrical installation design and verification.
            </p>
          </div>
        </div>
      </section>

      {/* The Formula */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            The Adiabatic Equation Formula
          </h2>
          <div className="rounded-2xl bg-white/[0.04] border border-yellow-500/20 p-6 my-6 text-center">
            <p className="text-2xl sm:text-3xl font-mono font-bold text-yellow-400 mb-4">
              S = √(I²t) / k
            </p>
            <div className="space-y-2 text-white text-sm text-left max-w-lg mx-auto">
              <p><strong>S</strong> = Minimum cross-sectional area of the protective conductor (mm²)</p>
              <p><strong>I</strong> = Fault current in amperes (A) — the earth fault current flowing through the CPC</p>
              <p><strong>t</strong> = Disconnection time in seconds (s) — the time taken by the protective device to clear the fault</p>
              <p><strong>k</strong> = A factor dependent on the conductor material, insulation type, and initial/final temperatures</p>
            </div>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The expression I²t (I squared t) represents the energy let-through — the total energy dissipated in
              the conductor during the fault. It is measured in A²s (ampere-squared seconds). A high fault current
              for a short time, or a lower fault current for a longer time, can both produce the same I²t value.
              The protective conductor must be sized to withstand whatever I²t value the protective device allows
              through before it disconnects.
            </p>
            <p>
              The k value encapsulates the thermal properties of the conductor — essentially how much energy per
              unit volume the conductor material can absorb before reaching the maximum permitted temperature. A
              higher k value means the conductor can absorb more energy, so a smaller conductor is acceptable.
              Copper has a higher k value than aluminium (115 vs 76 for PVC-insulated conductors), which is one
              reason copper conductors can be smaller than aluminium ones for the same duty.
            </p>
          </div>
        </div>
      </section>

      {/* k Values */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            k Values for Different Conductor Materials
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-6">
            <p>
              The k value is the most important factor in the adiabatic equation because it reflects the conductor
              material's ability to absorb fault energy. BS 7671 provides k values in Tables 54.2 to 54.6 for
              different combinations of conductor material and insulation type. Here are the most commonly used values.
            </p>
          </div>
          <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-6">
            <h3 className="font-bold text-white text-lg mb-4">Common k Values (BS 7671 Table 54.2 to 54.6)</h3>
            <div className="space-y-3 text-white">
              <div className="grid grid-cols-2 gap-2 text-sm font-bold border-b border-white/10 pb-2">
                <span>Conductor / Insulation</span>
                <span>k Value</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span>Copper / 70°C PVC</span>
                <span className="font-bold text-yellow-400">115</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span>Copper / 90°C Thermoplastic</span>
                <span className="font-bold text-yellow-400">100</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span>Copper / 90°C Thermosetting (XLPE/EPR)</span>
                <span className="font-bold text-yellow-400">143</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span>Copper / Bare (no insulation contact)</span>
                <span className="font-bold text-yellow-400">159</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span>Aluminium / 70°C PVC</span>
                <span className="font-bold text-yellow-400">76</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span>Aluminium / 90°C Thermosetting</span>
                <span className="font-bold text-yellow-400">94</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span>Steel / 70°C PVC</span>
                <span className="font-bold text-yellow-400">51</span>
              </div>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span>Steel / 90°C Thermosetting</span>
                <span className="font-bold text-yellow-400">58</span>
              </div>
            </div>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The k value for steel (51 for PVC) is significantly lower than for copper (115 for PVC), meaning
              a steel CPC (such as the steel wire armour of an SWA cable used as the protective conductor) needs
              to have a much larger cross-sectional area than an equivalent copper CPC to carry the same fault
              energy. This is an important consideration when relying on cable armour as the sole CPC — the
              adiabatic check must always be performed to verify the armour is adequate.
            </p>
          </div>
        </div>
      </section>

      {/* Worked Examples */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Worked Examples
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <h3 className="font-bold text-white text-lg mb-3">Example 1: Domestic Ring Final Circuit</h3>
              <div className="space-y-2 text-white text-sm leading-relaxed">
                <p>A ring final circuit protected by a 32 A Type B MCB.</p>
                <p>Earth fault current at the furthest point: I = 800 A</p>
                <p>Disconnection time of the MCB at 800 A: t = 0.01 s (magnetic trip)</p>
                <p>CPC is copper with PVC insulation: k = 115</p>
                <p className="font-mono text-yellow-400 mt-2">S = √(800² × 0.01) / 115</p>
                <p className="font-mono text-yellow-400">S = √(6,400) / 115</p>
                <p className="font-mono text-yellow-400">S = 80 / 115</p>
                <p className="font-mono text-yellow-400 font-bold">S = 0.70 mm²</p>
                <p className="mt-2">The minimum CPC is 0.70 mm². The installed 1.5 mm² CPC in a standard 2.5/1.5 mm² twin and earth cable is more than adequate.</p>
              </div>
            </div>
            <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5">
              <h3 className="font-bold text-white text-lg mb-3">Example 2: Commercial Sub-Main with SWA</h3>
              <div className="space-y-2 text-white text-sm leading-relaxed">
                <p>A 100 A sub-main protected by a BS 88 fuse. The SWA armour is used as the CPC.</p>
                <p>Earth fault current: I = 2,500 A</p>
                <p>Disconnection time of the BS 88 fuse at 2,500 A: t = 0.1 s</p>
                <p>Steel wire armour with PVC insulation: k = 51</p>
                <p className="font-mono text-yellow-400 mt-2">S = √(2,500² × 0.1) / 51</p>
                <p className="font-mono text-yellow-400">S = √(625,000) / 51</p>
                <p className="font-mono text-yellow-400">S = 790.6 / 51</p>
                <p className="font-mono text-yellow-400 font-bold">S = 15.50 mm²</p>
                <p className="mt-2">The minimum armour CSA is 15.50 mm². The actual armour CSA of the cable must be checked against the manufacturer data to verify it meets this requirement.</p>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-4 text-white leading-relaxed">
            <p>
              These examples illustrate why the adiabatic check is important. In Example 1, the CPC is well within
              limits — the installed 1.5 mm² CPC is more than double the minimum required. In Example 2, the check
              is critical — if the SWA cable chosen has armour with less than 15.50 mm² effective CSA, the armour
              is inadequate as a CPC and either a larger cable must be used or a separate CPC must be installed
              alongside the SWA cable.
            </p>
          </div>
        </div>
      </section>

      {/* How Elec-Mate Makes It Easy */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            How Elec-Mate Makes Adiabatic Calculations Easy
          </h2>
          <div className="space-y-4 text-white leading-relaxed mb-8">
            <p>
              The adiabatic equation involves looking up k values, finding disconnection times from device
              characteristics, and running the calculation — all of which are straightforward individually but
              time-consuming when done repeatedly for every circuit in a large installation. Elec-Mate automates
              the entire process.
            </p>
            <p>
              Select the conductor material and insulation from a dropdown, and the k value is applied automatically.
              Enter the fault current and disconnection time, and the minimum CPC size appears instantly. The
              calculator shows the nearest standard cable size above the calculated minimum and compares the result
              to the simplified Table 54.7 method, so you can see at a glance which requirement governs.
            </p>
            <p>
              The adiabatic equation calculator works seamlessly with the prospective fault current calculator —
              calculate the fault current in one, feed it into the adiabatic equation in the other, and verify your
              CPC sizing in seconds. Both calculators work offline on your phone.
            </p>
            <p>
              These are two of 70 electrical calculators available in Elec-Mate — 56 technical calculators plus
              14 business calculators. Combined with 8 certificate types, 8 Elec-AI agents, 12 AI tools, 36+
              training courses, and integration with Xero and QuickBooks, it is the complete platform for UK
              electricians.
            </p>
          </div>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* How To Section */}
      <section id="how-it-works" className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            How to Calculate Minimum CPC Size Using Elec-Mate
          </h2>
          <p className="text-white mb-8 leading-relaxed">
            Follow these steps to verify that a protective conductor is adequately sized using the adiabatic
            equation in the Elec-Mate app.
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

      {/* Regulation 543.1.3 */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            BS 7671:2018+A3:2024 Regulation 543.1.3
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Regulation 543.1.3 of BS 7671 states that the cross-sectional area of every protective conductor,
              other than a protective bonding conductor, shall be calculated by the adiabatic equation or selected
              in accordance with Table 54.7. The regulation makes it clear that the adiabatic equation is the
              definitive method — Table 54.7 is a simplified alternative that gives conservative (larger) sizes.
            </p>
            <p>
              The regulation further specifies that the calculated cross-sectional area shall be not less than the
              value determined by the equation S = √(I²t) / k, where the symbols have the meanings described above.
              It also notes that the k values are given in Tables 54.2 to 54.6, and that the value of I²t shall
              not exceed the value given by the manufacturer for the protective device.
            </p>
            <p>
              In practice, this means that for every circuit in an installation, the designer or verifier must either
              confirm that the CPC size meets Table 54.7 (the simpler check) or perform the adiabatic calculation to
              verify that the installed CPC is at least as large as the minimum calculated. The adiabatic method is
              particularly important for non-standard situations — for example, when the CPC is not the same material
              as the line conductor, when steel wire armour is used as the CPC, or when the designer wants to use a
              smaller CPC than Table 54.7 would require to reduce costs.
            </p>
            <p>
              Amendment 3 to BS 7671 (A3:2024), issued in July 2024, did not change the fundamental adiabatic
              equation requirements but added Regulation 530.3.201 covering bidirectional and unidirectional devices.
              The core CPC sizing requirements in Regulation 543.1.3 remain as established in the 18th Edition.
            </p>
          </div>
        </div>
      </section>

      {/* Built for Working Electricians */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <Users className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Built for Working Electricians
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Elec-Mate is designed by electricians for electricians. The adiabatic equation calculator is one of
              70 calculators that work the way you actually need them to on site — fast, accurate, and available
              on your phone even without a signal. Enter your values, get the answer, verify the conductor, move on.
            </p>
            <p>
              The platform also includes 8 certificate types (EICR, EIC, Minor Works, emergency lighting, fire
              alarm, EV charger, PAT testing, and solar PV), 8 Elec-AI agents, 12 AI tools, and 36+ training
              courses. Xero and QuickBooks integration means you can manage your jobs, certificates, and invoicing
              all from one mobile-first app.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-8">
            Frequently Asked Questions About the Adiabatic Equation
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
        heading="Size protective conductors in seconds"
        subheading="Join 430+ UK electricians using 70 professional calculators on their phone. 7-day free trial, cancel anytime."
      />

      {/* Bottom spacer for mobile sticky CTA */}
      <div className="h-16 sm:hidden" />
    </PublicPageLayout>
  );
}
