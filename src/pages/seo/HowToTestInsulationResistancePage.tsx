import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  ShieldCheck,
  Zap,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  Smartphone,
  Calculator,
  ClipboardCheck,
  HelpCircle,
  ChevronRight,
  ArrowDown,
  Thermometer,
  Activity,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'What is the minimum acceptable insulation resistance value under BS 7671?',
    answer:
      'BS 7671 Table 61 specifies a minimum insulation resistance of 1 megohm (1 MΩ) for circuits operating at voltages up to and including 500 V. This applies to the vast majority of domestic and commercial installations in the UK. For SELV and PELV circuits operating at up to 50 V, the minimum is 0.5 MΩ tested at 250 V DC. For circuits operating above 500 V, the minimum is also 1 MΩ but tested at 1000 V DC. In practice, a healthy new installation should return readings significantly higher than 1 MΩ — typically 200 MΩ or more. Readings close to the minimum threshold suggest deterioration and should prompt further investigation, even if the circuit technically passes.',
  },
  {
    question: 'Why must insulation resistance be tested with DC and not AC?',
    answer:
      "Insulation resistance must be tested using direct current (DC) because the purpose of the test is to measure the resistance of the insulating material itself — not to measure capacitive or inductive effects. If AC were used, the capacitance between conductors and between conductors and earth would allow current to flow through the capacitive reactance, giving a misleadingly low reading that does not represent the true condition of the insulation. DC eliminates this capacitive effect because once the initial charging current has subsided, only genuine leakage current through the insulation remains. This gives an accurate measurement of the insulation's ability to prevent current leakage under normal operating conditions.",
  },
  {
    question: 'What should I do if the insulation resistance reading is below 1 MΩ?',
    answer:
      'If you obtain a reading below 1 MΩ, do not immediately condemn the entire circuit. First, ensure all equipment and accessories are disconnected — appliances, luminaires, socket-outlet faceplates, and any electronic devices can reduce readings significantly. If the reading is still low after disconnection, split the circuit into sections by disconnecting at junction boxes or accessory positions. Test each section individually to isolate the fault. Common causes of low insulation resistance include moisture ingress (particularly in outdoor or bathroom circuits), heat-damaged insulation near downlighters or immersion heaters, rodent damage to cables, and aged PVC insulation that has become brittle. Once the faulty section is identified, inspect the cable for visible damage before deciding whether to repair or replace.',
  },
  {
    question: 'Do I need to disconnect all equipment before testing insulation resistance?',
    answer:
      'Yes. You must disconnect all current-using equipment from the circuit before performing an insulation resistance test. The test applies a DC voltage (typically 500 V) between conductors and between conductors and earth. This voltage can damage sensitive electronic equipment including LED drivers, dimmer switches, RCDs, SPDs (surge protective devices), PIR sensors, smart thermostats, and any equipment containing semiconductors. Furthermore, connected equipment will provide parallel paths that reduce the measured insulation resistance, giving a falsely low reading that does not reflect the true condition of the cable insulation. Lamps should be removed or switches turned off, and any two-way switching circuits should have the switch in the off position to avoid testing through lamp filaments.',
  },
  {
    question: 'How do temperature and humidity affect insulation resistance readings?',
    answer:
      'Temperature and humidity have a significant effect on insulation resistance measurements. As a general rule, insulation resistance halves for every 10 degrees Celsius increase in temperature. This means a cable tested at 30 degrees Celsius may read half the value it would at 20 degrees Celsius. Humidity also reduces insulation resistance because moisture on the surface of insulation or within cable terminations creates leakage paths. For this reason, it is good practice to note the ambient temperature and weather conditions on the schedule of test results. If you obtain borderline readings on a hot or humid day, consider retesting under more favourable conditions before condemning the installation. BS 7671 does not specify temperature correction factors for insulation resistance, but experienced electricians account for environmental conditions when interpreting results.',
  },
  {
    question:
      'What is the difference between insulation resistance testing and continuity testing?',
    answer:
      'These are fundamentally different tests that measure opposite properties. Continuity testing verifies that conductors are connected end-to-end with low resistance — it confirms that current CAN flow where it should. Insulation resistance testing verifies that insulation is intact and current CANNOT flow where it should not. Continuity uses a low test voltage (typically 4-24 V DC from the instrument) and measures resistance in milliohms (mΩ) or ohms (Ω). Insulation resistance uses a high test voltage (250 V, 500 V, or 1000 V DC) and measures resistance in megohms (MΩ). For continuity, you want LOW readings (good connections). For insulation resistance, you want HIGH readings (good insulation). Both tests are mandatory during initial verification and periodic inspection under BS 7671.',
  },
  {
    question: 'Can I test insulation resistance on a live circuit?',
    answer:
      'No. You must never attempt to test insulation resistance on a live (energised) circuit. The test instrument applies its own DC test voltage (250 V, 500 V, or 1000 V depending on the circuit rating) and measures the resulting leakage current. If the circuit is already energised with the mains supply, the instrument will be damaged and you risk electric shock. Before testing, you must isolate the circuit at the distribution board, lock off the MCB or remove the fuse, and verify the circuit is dead using a voltage indicator (proving unit, test lamp, or multimeter) before and after testing. The safe isolation procedure must be followed every time — there are no shortcuts.',
  },
];

const howToSteps = [
  {
    name: 'Isolate the circuit and verify dead',
    text: 'Follow the safe isolation procedure: identify the circuit at the distribution board, switch off and lock off the MCB (or remove the fuse), and verify the circuit is dead at the point of work using a voltage indicator that has been proved before and after use. This is a non-negotiable safety step — GS 38 requires proving instruments before and after every isolation.',
  },
  {
    name: 'Disconnect all equipment and accessories',
    text: 'Remove all lamps, disconnect appliances, and remove any electronic devices from the circuit. Turn off all switches to prevent testing through filament lamps. Disconnect SPDs (surge protective devices), RCDs, dimmer switches, and any equipment containing semiconductors, as the 500 V DC test voltage can damage these components. For socket circuits, there should be nothing plugged in. For lighting circuits, switches should be in the off position.',
  },
  {
    name: 'Select the correct test voltage',
    text: 'Set your insulation resistance tester to the correct test voltage for the circuit rating. For SELV and PELV circuits (up to 50 V nominal), use 250 V DC. For circuits rated up to and including 500 V (which covers all standard domestic circuits at 230 V), use 500 V DC. For circuits rated above 500 V (such as HV distribution), use 1000 V DC. Using the wrong test voltage will produce invalid results.',
  },
  {
    name: 'Test between live conductors and earth (L+N to E)',
    text: 'Link all line and neutral conductors together at the distribution board. Connect one test lead to the linked line and neutral conductors, and the other test lead to the main earthing terminal or CPC. Apply the test and hold until the reading stabilises (usually 2-3 seconds). The reading must be at least 1 MΩ. Record the result. This test checks for insulation breakdown between the current-carrying conductors and the protective conductor/earth.',
  },
  {
    name: 'Test between line and neutral (L to N)',
    text: 'Remove the link between line and neutral conductors. Connect one test lead to the line conductor and the other to the neutral conductor. Apply the test and hold until stable. The reading must again be at least 1 MΩ. This test checks for insulation breakdown between the line and neutral conductors — which would cause a short circuit under normal operation. On two-way lighting circuits, ensure switches are positioned so that L and N are not connected through any lamp.',
  },
  {
    name: 'Record results on the Schedule of Test Results',
    text: 'Enter the measured insulation resistance values in megohms on the Schedule of Test Results or Schedule of Inspections. Record the test voltage used and note the ambient conditions. Elec-Mate automatically validates readings against the BS 7671 minimum of 1 MΩ and highlights any failures. If a reading is below the minimum, record an observation with the appropriate classification code (C1, C2, or C3) on the EICR.',
  },
];

const features = [
  {
    icon: Calculator,
    title: 'Insulation Resistance Validation',
    description:
      'Enter your IR readings and the app instantly checks them against BS 7671 Table 61 minimum values for 250 V, 500 V, and 1000 V DC test voltages.',
  },
  {
    icon: ClipboardCheck,
    title: 'Digital Schedule of Test Results',
    description:
      'Record insulation resistance values directly into the schedule of test results on your digital EICR or EIC. No double-handling from paper to computer.',
  },
  {
    icon: ShieldCheck,
    title: 'BS 7671:2018+A3:2024 Compliant',
    description:
      'Built to the current 18th Edition standard including Amendment 3. All test limits, observation codes, and certificate structures follow BS 7671:2018+A3:2024.',
  },
  {
    icon: Calculator,
    title: '70 Electrical Calculators',
    description:
      'Beyond insulation resistance, access cable sizing, voltage drop, Zs verification, maximum demand, prospective fault current, and dozens more calculations.',
  },
  {
    icon: Smartphone,
    title: 'Works Offline on Site',
    description:
      'Start certificates and record test results even without mobile signal. Data saves locally and syncs to the cloud automatically when connectivity returns.',
  },
  {
    icon: Activity,
    title: 'Smart Observation Coding',
    description:
      'When a test result falls below BS 7671 limits, the app suggests the appropriate observation code (C1, C2, C3, or FI) with the relevant regulation reference.',
  },
];

const howToSchema = {
  '@type': 'HowTo',
  name: 'How to Test Insulation Resistance — Step-by-Step Procedure',
  description:
    'Step-by-step guide to testing insulation resistance on electrical circuits using a 500 V DC insulation resistance tester, in compliance with BS 7671:2018+A3:2024.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
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

export default function HowToTestInsulationResistancePage() {
  useSEO({
    title: 'How to Test Insulation Resistance | BS 7671 Guide',
    description:
      'Step-by-step guide to insulation resistance testing. Test voltages, minimum values, conductor combinations, and common faults. BS 7671:2018+A3:2024 compliant procedure.',
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...howToSchema })}
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
            <ShieldCheck className="w-4 h-4" />
            BS 7671:2018+A3:2024 Compliant
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5">
            How to Test Insulation Resistance
            <span className="block text-yellow-400 mt-1">BS 7671 Step-by-Step Guide</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            The complete guide to insulation resistance testing for UK electricians. Understand test
            voltages, minimum values, conductor combinations, and how to troubleshoot low readings.
            Record results digitally with Elec-Mate.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/auth/signup"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-semibold touch-manipulation transition-colors"
            >
              Start Your Free Trial
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
            <a
              href="#how-it-works"
              className="h-11 px-8 inline-flex items-center justify-center rounded-xl border border-white/20 text-white font-medium hover:border-yellow-500/40 touch-manipulation transition-colors"
            >
              See Test Procedure
              <ArrowDown className="w-4 h-4 ml-1" />
            </a>
          </div>
        </div>
      </section>

      {/* What Is Insulation Resistance */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              What Is Insulation Resistance and Why Does It Matter?
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Insulation resistance (IR) testing is one of the most fundamental tests carried out
              during both initial verification and periodic inspection of electrical installations.
              It measures the integrity of the insulating material surrounding electrical conductors
              — the plastic sheathing on cables, the insulation within accessories, and the
              separation between live parts and earth.
            </p>
            <p>
              Without adequate insulation, current can leak from conductors to earth or between
              conductors. This leakage current is dangerous for three critical reasons. First, it
              creates a risk of electric shock — if current leaks to the metallic enclosure of an
              appliance or accessory, anyone touching that metalwork could receive a shock. Second,
              leakage current generates heat at the point of insulation breakdown, which can ignite
              surrounding materials and cause fire. Third, persistent leakage increases energy
              consumption and can cause nuisance tripping of RCDs, disrupting the supply to the
              installation.
            </p>
            <p>
              Insulation deteriorates over time due to heat, moisture, UV exposure, mechanical
              damage, chemical contamination, and simple ageing of the PVC or XLPE material. Regular
              testing during periodic inspections (EICRs) catches deterioration before it reaches a
              dangerous level. For new installations, the insulation resistance test on the
              Electrical Installation Certificate (EIC) confirms that cables have not been damaged
              during installation — which is particularly important given that cables may have been
              pulled through tight spaces, bent around corners, or clipped to surfaces where nails
              or screws could have penetrated the sheathing.
            </p>
          </div>
        </div>
      </section>

      {/* Test Voltages */}
      <section className="py-12 sm:py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Test Voltages and Minimum Values — BS 7671 Table 61
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The test voltage and minimum acceptable insulation resistance value depend on the
              nominal circuit voltage. BS 7671 Table 61 specifies the requirements clearly. Using
              the wrong test voltage produces invalid results and does not comply with the standard.
            </p>
          </div>
          <div className="grid sm:grid-cols-3 gap-4 my-6">
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-2xl mb-1">250 V DC</h3>
              <h4 className="font-bold text-white mb-3">SELV / PELV Circuits</h4>
              <p className="text-white text-sm leading-relaxed">
                For circuits operating at extra-low voltage — SELV (Separated Extra-Low Voltage) and
                PELV (Protective Extra-Low Voltage) systems up to 50 V. The minimum acceptable
                insulation resistance is 0.5 MΩ. These circuits are typically found in bathroom
                shaver supplies, garden lighting transformers, and specialist equipment.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
              <h3 className="font-bold text-yellow-400 text-2xl mb-1">500 V DC</h3>
              <h4 className="font-bold text-white mb-3">Up to 500 V Circuits</h4>
              <p className="text-white text-sm leading-relaxed">
                For circuits with a nominal voltage up to and including 500 V — which covers all
                standard domestic and commercial installations at 230 V single-phase and 400 V
                three-phase. The minimum acceptable insulation resistance is 1 MΩ. This is the test
                voltage you will use for the overwhelming majority of circuits.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-2xl mb-1">1000 V DC</h3>
              <h4 className="font-bold text-white mb-3">Above 500 V Circuits</h4>
              <p className="text-white text-sm leading-relaxed">
                For circuits with a nominal voltage above 500 V, such as high-voltage distribution
                systems and certain industrial installations. The minimum acceptable insulation
                resistance is 1 MΩ. These circuits are less common in everyday domestic work but are
                encountered in commercial and industrial settings.
              </p>
            </div>
          </div>
          <div className="p-5 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Important Note</h4>
                <p className="text-white text-sm leading-relaxed">
                  While 1 MΩ is the minimum acceptable value, a healthy new installation should
                  typically return readings of 200 MΩ or higher. Readings between 2 MΩ and 10 MΩ,
                  while technically above the minimum, suggest significant insulation deterioration
                  and should be investigated further. A reading that has dropped substantially since
                  the last test — even if still above 1 MΩ — may indicate progressive degradation
                  that will eventually lead to failure.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conductor Combinations */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Activity className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Conductor Combinations — What to Test Between
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Insulation resistance testing involves two separate tests on each circuit, checking
              different conductor combinations. Both tests must be carried out and both must pass
              for the circuit to be considered satisfactory.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4 my-6">
            <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/10">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm">
                  1
                </span>
                <h3 className="font-bold text-white text-lg">L+N Combined to Earth</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Link all line and neutral conductors together at the distribution board. Connect one
                test lead to the linked L+N and the other to the circuit protective conductor (CPC)
                or main earthing terminal. This test checks for insulation breakdown between the
                current-carrying conductors and earth. It detects faults such as cables pinched by
                fixings, moisture ingress at junction boxes, or heat damage near downlighters and
                immersion heaters.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-yellow-500/5 border border-yellow-500/20">
              <div className="flex items-center gap-2 mb-3">
                <span className="w-10 h-10 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center font-bold text-yellow-400 text-sm">
                  2
                </span>
                <h3 className="font-bold text-white text-lg">Line to Neutral</h3>
              </div>
              <p className="text-white text-sm leading-relaxed">
                Remove the link between line and neutral. Connect one test lead to the line
                conductor and the other to the neutral conductor. This test checks for insulation
                breakdown between the two current-carrying conductors — which would cause a short
                circuit under normal operation. On two-way lighting circuits, position all switches
                so that L and N are not connected through any lamp filament or LED driver. This test
                is often overlooked but is equally important as the earth test.
              </p>
            </div>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The reason for linking line and neutral together for the first test (rather than
              testing L to E and N to E separately) is efficiency — it tests both conductor-to-earth
              combinations in a single measurement. If this combined test gives a low reading, you
              can then separate L and N and test each to earth individually to identify which
              conductor has the fault. For three-phase circuits, all three line conductors and the
              neutral should be linked together for the first test, then individual
              conductor-to-conductor tests should be carried out.
            </p>
          </div>
        </div>
      </section>

      {/* Common Issues */}
      <section className="py-12 sm:py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Common Causes of Low Insulation Resistance Readings
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              A low insulation resistance reading does not always mean the cable itself is damaged.
              There are several common causes that should be investigated before condemning the
              installation wiring.
            </p>
            <ul className="space-y-3 my-4">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-yellow-400">Moisture ingress</strong> — Water in junction
                  boxes, back boxes, or conduit systems is one of the most common causes of low IR
                  readings. This is particularly prevalent in outdoor circuits, bathroom
                  installations, and any circuit that runs through unheated spaces such as lofts or
                  garages. Drying out the affected area and resealing the enclosures often restores
                  acceptable readings.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-yellow-400">Heat-damaged insulation</strong> — Cables
                  routed too close to heat sources — recessed downlighters, immersion heaters,
                  heating pipes, and flue pipes — can suffer insulation degradation. The PVC
                  sheathing becomes brittle and may crack, exposing the conductor. This is a common
                  finding on older lighting circuits with halogen downlighters.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-yellow-400">Long cable runs</strong> — Every metre of
                  cable adds a small amount of capacitance between conductors and earth. On very
                  long cable runs (particularly in large commercial installations), this cumulative
                  capacitance can reduce the apparent insulation resistance reading. This is a
                  measurement artefact, not a fault, but it must be accounted for when interpreting
                  results.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-yellow-400">Connected equipment not disconnected</strong>{' '}
                  — Electronic devices, LED drivers, dimmer modules, and even neon indicator lamps
                  in switches provide parallel paths that reduce the measured insulation resistance.
                  Always ensure all equipment is disconnected before testing.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-yellow-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong className="text-yellow-400">Mechanical damage to cables</strong> — Nails,
                  screws, or staples driven through cables during construction or DIY work are a
                  frequent cause of insulation failure. The conductor may still function but the
                  insulation is compromised, creating a leakage path to earth through the metallic
                  fixing.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Temperature and Humidity Effects */}
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Thermometer className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              Temperature and Humidity Effects on Readings
            </h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Environmental conditions significantly influence insulation resistance measurements.
              Experienced electricians always consider the ambient temperature and humidity when
              interpreting their results — particularly when readings are borderline.
            </p>
            <p>
              As a widely accepted rule of thumb, insulation resistance approximately halves for
              every 10 degrees Celsius increase in temperature. A cable that reads 200 MΩ at 20
              degrees Celsius might read only 100 MΩ at 30 degrees Celsius and 50 MΩ at 40 degrees
              Celsius. This is because higher temperatures increase the mobility of charge carriers
              within the insulating material, allowing more leakage current to flow.
            </p>
            <p>
              High humidity has a similar effect. Moisture on the surface of cable insulation
              creates conductive paths that reduce the measured resistance. Condensation inside
              distribution boards, junction boxes, and accessory enclosures is particularly
              problematic. If you are testing on a rainy day or in a damp environment, borderline
              readings should be treated with caution — they may improve significantly once
              conditions dry out.
            </p>
            <p>
              While BS 7671 does not provide formal temperature correction factors for insulation
              resistance (unlike for conductor resistance in cable sizing calculations), it is good
              practice to record the ambient temperature and weather conditions on the test
              schedule. This provides context for future inspections and helps explain any apparent
              changes in readings between successive periodic inspections.
            </p>
          </div>
        </div>
      </section>

      {/* How-To Section */}
      <section id="how-it-works" className="py-12 sm:py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <CheckCircle2 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">
              How to Test Insulation Resistance — Step by Step
            </h2>
          </div>
          <div className="space-y-4">
            {howToSteps.map((step, index) => (
              <div
                key={index}
                className="flex gap-4 p-5 rounded-2xl bg-white/[0.04] border border-white/10"
              >
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
      <section className="py-12 sm:py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-3">
            Why Electricians Choose Elec-Mate for Testing
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians. Record insulation resistance results, validate
            against BS 7671 limits, and export professional certificates — all from your phone.
          </p>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-12 sm:py-16 px-5 bg-white/[0.02]">
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
        heading="Record Insulation Resistance Results Digitally"
        subheading="Join 430+ UK electricians using Elec-Mate for on-site testing and certification. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
