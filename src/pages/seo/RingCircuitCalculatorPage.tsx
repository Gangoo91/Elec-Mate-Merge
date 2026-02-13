import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Calculator,
  Zap,
  CheckCircle2,
  BookOpen,
  BarChart3,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  ArrowDown,
  CircleDot,
  AlertTriangle,
  Search,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    question: 'What is a ring final circuit and how does it work?',
    answer:
      'A ring final circuit is a circuit arrangement unique to the UK (and a few other countries that adopted BS 7671). It consists of a single cable that leaves the consumer unit, passes through a series of socket outlets, and returns to the same terminals in the consumer unit — forming a continuous ring. Both ends of the line conductor connect to the same MCB terminal, both ends of the neutral connect to the same neutral bar terminal, and both ends of the CPC connect to the same earth bar terminal. The advantage of a ring is that current can flow in both directions around the ring to reach any socket, effectively halving the current in the cable compared to a radial circuit. This allows 2.5 mm² cable to supply a 32 A circuit, whereas a radial circuit of the same rating would require 4 mm² cable. A ring final circuit may serve a floor area of up to 100 m² and is protected by a 30 or 32 A device.',
  },
  {
    question: 'What is the cross-connection method for testing a ring?',
    answer:
      'The cross-connection method (also called the figure-of-eight method) is the standard BS 7671 / GN3 procedure for verifying the continuity and integrity of a ring final circuit. First, you disconnect the ring at the consumer unit and identify the two ends of each conductor (L1 and L2, N1 and N2, E1 and E2). You measure the end-to-end resistance of each conductor pair — r1 (line), rn (neutral), and r2 (CPC). Then you cross-connect L1 to N2 and L2 to N1 (line to neutral cross-connection) and measure the resistance at each socket outlet between line and neutral. Each reading should be approximately r1+rn divided by 4. Next, you reconnect the line conductors and cross-connect L1 to E2 and L2 to E1 (line to earth cross-connection), then measure at each socket between line and earth. Each reading should be approximately r1+r2 divided by 4, and the highest reading is the R1+R2 value for that circuit. This method simultaneously verifies that the ring is continuous, identifies any spurs or breaks, and provides the R1+R2 values needed for fault loop impedance calculations.',
  },
  {
    question: 'What readings should I expect from a ring circuit test?',
    answer:
      'For a typical domestic ring final circuit wired in 2.5 mm² / 1.5 mm² twin and earth flat cable, the end-to-end resistance of the line conductor (r1, 2.5 mm²) should be approximately 0.2 to 0.8 ohms, depending on the length of the cable run. The neutral conductor (rn, 2.5 mm²) should give a very similar reading to r1, within 0.05 ohms. The CPC (r2, 1.5 mm²) will have a higher resistance — typically 1.67 times the r1 value — because it has a smaller cross-sectional area. After cross-connection, the reading at each socket should be approximately r1+rn/4 for the line-neutral cross-connection and r1+r2/4 for the line-earth cross-connection. A socket at the electrical midpoint of the ring will give the highest reading; sockets near the consumer unit will give lower readings. The highest line-earth reading is the R1+R2 value used in Zs calculations.',
  },
  {
    question: 'How do I identify a spur on a ring final circuit?',
    answer:
      'During the cross-connection test, a spur reveals itself through readings that deviate from the expected pattern. In a healthy ring, the readings at each socket should follow a smooth progression — low near the consumer unit, highest at the midpoint, then decreasing back towards the consumer unit (in the reverse direction). A socket on a spur will give a reading that is higher than expected for its position in the ring, because the current path to that socket includes the additional length of the spur cable. If you plot the readings on a graph, spurs appear as outliers above the smooth curve. Additionally, when you measure the end-to-end resistances, a significant discrepancy between r1 and rn (more than 0.05 ohms) can indicate that one conductor has a spur that the other does not — a wiring error. The Elec-Mate calculator flags anomalous readings and identifies likely spurs automatically.',
  },
  {
    question: 'What is the maximum length of a spur on a ring circuit?',
    answer:
      'BS 7671 does not specify a maximum cable length for a non-fused spur from a ring final circuit. However, it does limit each non-fused spur to feeding a maximum of one single or one twin socket outlet (or one permanently connected item of equipment). The spur must be connected at the terminals of a socket on the ring, at a junction box on the ring, or at the origin of the ring in the consumer unit. The cable size must be at least equal to that of the ring cable — typically 2.5 mm² / 1.5 mm². For fused spurs (connected through a fused connection unit), there is no limit on the number of outlets or the cable length, provided the fuse rating is appropriate for the cable size of the spur. In practice, the length of any spur is limited by the voltage drop and the earth fault loop impedance (Zs) requirements. The Elec-Mate calculator checks Zs at the end of any spur to confirm compliance.',
  },
  {
    question: 'What faults can the ring circuit test detect?',
    answer:
      'The ring circuit continuity test using the cross-connection method can detect several types of fault. A broken ring is identified when the end-to-end resistance of one or more conductors is significantly higher than expected — or open circuit — indicating that the cable is broken or disconnected somewhere along the ring. A bridged ring (where the ring has been short-circuited across two points) shows as end-to-end resistances that are lower than expected. A cross-polarity fault (line and neutral swapped at one or more points) produces erratic readings during the cross-connection test. A missing CPC connection shows as an open-circuit or high reading on the r2 measurement. Spurs that were not intended or documented appear as readings that deviate from the expected pattern. Finally, loose connections show as readings that are inconsistent between tests or that change when the cable is disturbed.',
  },
];

const howToSteps = [
  {
    name: 'Isolate the circuit and disconnect at the consumer unit',
    text: 'Turn off the MCB protecting the ring final circuit and lock off the consumer unit. At the consumer unit, disconnect both ends of the ring — the line conductors from the MCB terminal, the neutral conductors from the neutral bar, and the CPC conductors from the earth bar. You should now have six individual conductor ends: L1, L2, N1, N2, E1, and E2. Label each conductor clearly using marker tape or labels.',
  },
  {
    name: 'Measure end-to-end resistances (r1, rn, r2)',
    text: 'Using a low-resistance ohmmeter (calibrated, with leads nulled), measure the resistance between the two ends of each conductor pair. Measure L1 to L2 and record as r1 (line conductor resistance). Measure N1 to N2 and record as rn (neutral conductor resistance). Measure E1 to E2 and record as r2 (CPC resistance). For 2.5/1.5 mm² T&E, r1 and rn should be similar, and r2 should be approximately 1.67 times r1.',
  },
  {
    name: 'Cross-connect line and neutral, then measure at each socket',
    text: 'Connect L1 to N2 and L2 to N1 (cross-connection). At each socket outlet on the circuit, measure the resistance between line and neutral. Record each reading. The expected value at each socket is approximately (r1 + rn) / 4, but readings will vary with position — lowest near the consumer unit, highest at the midpoint. All readings should be within the expected range. A reading significantly above the range suggests a spur; a reading of infinity suggests a break.',
  },
  {
    name: 'Cross-connect line and CPC, then measure at each socket',
    text: 'Disconnect the line-neutral cross-connection. Reconnect the line conductors normally (L1 and L2 together). Now cross-connect L1 to E2 and L2 to E1. At each socket, measure the resistance between line and earth. Record each reading. The expected value at each socket is approximately (r1 + r2) / 4, with the highest reading at the midpoint. The highest reading recorded is the R1+R2 value for this circuit, which is used in the Zs calculation: Zs = Ze + (R1+R2).',
  },
  {
    name: 'Verify results and record',
    text: 'Compare all readings against the expected values. Check that r1 and rn are within 0.05 ohms of each other. Check that r2 is approximately 1.67 times r1 (for 2.5/1.5 mm² cable). Check that all cross-connection readings follow the expected pattern with no outliers. Record the r1, rn, r2, and R1+R2 values on the Schedule of Test Results. Reconnect all conductors to the consumer unit and restore the circuit.',
  },
];

const features = [
  {
    icon: Calculator,
    title: 'Automatic r1/rn/r2 Validation',
    description:
      'Enter the end-to-end readings and the calculator validates the ratio between conductors. Flags mismatches that indicate wiring errors, wrong cable sizes, or mixed cable types.',
  },
  {
    icon: CircleDot,
    title: 'Cross-Connection Result Checker',
    description:
      'Enter the reading at each socket and the calculator plots the expected values against your measurements. Instantly identifies spurs, breaks, and anomalies in the ring.',
  },
  {
    icon: Search,
    title: 'Spur Detection',
    description:
      'Readings that deviate from the expected pattern are flagged automatically. The calculator identifies the likely socket where a spur branches off and estimates the spur cable length.',
  },
  {
    icon: BarChart3,
    title: 'R1+R2 and Zs Calculation',
    description:
      'The highest cross-connection reading is automatically extracted as the R1+R2 value. Enter the Ze and the calculator computes the prospective Zs, checked against the maximum values from BS 7671.',
  },
  {
    icon: AlertTriangle,
    title: 'Fault Diagnosis',
    description:
      'Common faults — broken ring, bridged ring, cross-polarity, missing CPC — are identified from the test results pattern. Saves time troubleshooting on site.',
  },
  {
    icon: BookOpen,
    title: 'GN3 and BS 7671:2018+A3:2024 Compliant',
    description:
      'Testing procedures and pass/fail criteria verified against GN3 (Guidance Note 3: Inspection and Testing, 9th Edition) and BS 7671:2018+A3:2024. Part of 70 calculators in Elec-Mate.',
  },
];

const softwareAppSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Ring Final Circuit Calculator',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web, iOS, Android',
  description:
    'Validate ring final circuit continuity test results. Check r1, rn, r2 readings, cross-connection results, identify spurs and faults. Built to GN3 and BS 7671:2018+A3:2024.',
  url: 'https://elec-mate.com/tools/ring-circuit-calculator',
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
  name: 'How to Test a Ring Final Circuit Using the Cross-Connection Method',
  description:
    'Step-by-step guide to testing ring final circuit continuity using the cross-connection method from GN3 and BS 7671, including identifying spurs and faults.',
  step: howToSteps.map((step, index) => ({
    '@type': 'HowToStep',
    position: index + 1,
    name: step.name,
    text: step.text,
  })),
};

export default function RingCircuitCalculatorPage() {
  useSEO({
    title: 'Ring Final Circuit Calculator | R1 R2 Rn Testing',
    description:
      'Validate ring final circuit test results using the cross-connection method. Check r1, rn, r2 readings, identify spurs and breaks. Built to GN3 and BS 7671.',
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
            Part of 70 Electrical Calculators
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight mb-5">
            Ring Final Circuit Calculator
            <span className="block text-yellow-400 mt-1">R1 R2 Rn Testing to GN3 and BS 7671</span>
          </h1>
          <p className="text-lg sm:text-xl text-white max-w-2xl mx-auto mb-8 leading-relaxed">
            Validate ring circuit continuity test results on site. Enter your r1, rn, and r2 readings, check cross-connection measurements, and instantly identify spurs, breaks, and wiring faults.
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

      {/* What Is a Ring Final Circuit */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <CircleDot className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">What Is a Ring Final Circuit?</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              A ring final circuit is a wiring arrangement where a single cable leaves the distribution board, loops through a number of socket outlets, and returns to the same terminals in the distribution board. The cable forms a continuous loop — a ring — with both ends connected in parallel at the consumer unit. This arrangement is specific to the UK wiring system and is one of the defining characteristics of BS 7671 installations.
            </p>
            <p>
              The principle behind the ring is parallel paths for current flow. When a load is plugged into a socket, current can reach it from both directions around the ring. For a socket at the midpoint of the ring, the current splits approximately equally between the two halves. This means the maximum current in any section of the cable is roughly half the total load current, allowing smaller cable to be used. A ring final circuit protected by a 32 A MCB can be wired in 2.5 mm² cable, whereas a radial circuit of the same rating would need 4 mm² cable.
            </p>
            <p>
              BS 7671 permits a ring final circuit to serve a floor area of up to 100 m². There is no limit on the number of socket outlets, but the total load should not exceed the rating of the protective device (32 A). Spurs — branch circuits that extend from the ring to additional sockets — are permitted but must follow specific rules: a non-fused spur may serve only one single or one double socket, and the total number of non-fused spurs must not exceed the number of sockets on the ring itself.
            </p>
            <p>
              The ring arrangement introduces a unique testing requirement: the continuity of the ring must be verified to confirm that the cable forms a complete loop and that no interconnections have been made incorrectly. This is where the cross-connection method comes in — the standard testing procedure described in GN3 (Guidance Note 3: Inspection and Testing) and BS 7671:2018+A3:2024.
            </p>
          </div>
        </div>
      </section>

      {/* The Cross-Connection Method */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <Calculator className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">The Cross-Connection Method Explained</h2>
          </div>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              The cross-connection method is the definitive test for ring final circuit integrity. It serves three purposes simultaneously: confirming that the ring is continuous (no breaks), verifying that there are no cross-connections or wiring errors, and providing the R1+R2 value needed for earth fault loop impedance calculations.
            </p>
            <p>
              The method works by deliberately creating a figure-of-eight path through the ring. When you cross-connect the line conductors of one end to the neutral conductor of the other end, and vice versa, you create a circuit where current must travel through both the line and neutral conductors in series. At the midpoint of the ring, the resistance measured between line and neutral is exactly (r1 + rn) / 4 — because you are measuring two parallel paths, each consisting of half the line conductor plus half the neutral conductor in series.
            </p>
            <div className="p-6 rounded-2xl bg-yellow-500/5 border border-yellow-500/20 text-center my-6">
              <p className="text-xl sm:text-2xl font-mono font-bold text-yellow-400">
                Midpoint reading = (r1 + rn) / 4
              </p>
              <p className="mt-3 text-sm text-white">For the line-neutral cross-connection. For line-earth: (r1 + r2) / 4</p>
            </div>
            <p>
              The second cross-connection — line to CPC — works on the same principle but provides the R1+R2 value. The highest reading at any socket during this test is the worst-case R1+R2 for the circuit, which occurs at the socket electrically furthest from the consumer unit (the midpoint). This R1+R2 value is essential for verifying that the earth fault loop impedance (Zs = Ze + R1+R2) does not exceed the maximum permitted by BS 7671 for the protective device rating.
            </p>
            <p>
              Any deviation from the expected pattern of readings indicates a fault. A reading significantly higher than expected at one socket suggests a spur. A reading of infinity indicates a break. Readings that are all lower than expected suggest a bridged ring. Erratic readings point to cross-polarity or loose connections.
            </p>
          </div>
        </div>
      </section>

      {/* Expected Readings */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BookOpen className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Expected Readings for Common Cable Types</h2>
          </div>

          <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-6">
            <div className="grid grid-cols-4 gap-px bg-white/10">
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">Cable Type</div>
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">r1 (per 100m)</div>
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">r2 (per 100m)</div>
              <div className="p-4 bg-yellow-500/10 font-bold text-yellow-400 text-sm">r2/r1 Ratio</div>
            </div>
            {[
              { type: '2.5/1.5 mm² T&E', r1: '7.41 ohms', r2: '12.10 ohms', ratio: '1.63' },
              { type: '4.0/1.5 mm² T&E', r1: '4.61 ohms', r2: '12.10 ohms', ratio: '2.63' },
              { type: '2.5/1.5 mm² (70C)', r1: '9.22 ohms', r2: '15.05 ohms', ratio: '1.63' },
            ].map((row) => (
              <div key={row.type} className="grid grid-cols-4 gap-px bg-white/5">
                <div className="p-4 bg-[#0a0a0a] text-white text-sm font-medium">{row.type}</div>
                <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.r1}</div>
                <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.r2}</div>
                <div className="p-4 bg-[#0a0a0a] text-white text-sm">{row.ratio}</div>
              </div>
            ))}
          </div>

          <div className="space-y-4 text-white leading-relaxed mt-6">
            <p>
              The values above are resistance per 100 metres of conductor at 20 degrees Celsius. In practice, the actual reading depends on the total length of the ring cable. For a ring using 40 metres of 2.5/1.5 mm² T&E cable, the expected end-to-end readings would be: r1 = 40/100 x 7.41 = 0.30 ohms, rn = 0.30 ohms, r2 = 40/100 x 12.10 = 0.48 ohms. The r2/r1 ratio should be approximately 1.63 for 2.5/1.5 mm² cable. If the ratio is significantly different, it may indicate that different cable sizes have been mixed in the ring — a wiring error.
            </p>
            <p>
              Temperature affects resistance. If the cable is warm (after carrying load, or in a hot loft space), the readings will be higher. BS 7671 specifies resistance values at 20 degrees Celsius. For accurate comparisons, either test the cable when cold or apply a temperature correction factor. The operating temperature resistance (at 70 degrees Celsius for thermoplastic cable) is approximately 1.24 times the 20 degree value.
            </p>
          </div>
        </div>
      </section>

      {/* Common Faults */}
      <section className="py-16 px-5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <AlertTriangle className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Common Faults and How to Identify Them</h2>
          </div>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">Broken Ring</h3>
              <p className="text-white leading-relaxed text-sm">
                A broken ring occurs when the cable is disconnected or damaged at some point, so the ring no longer forms a complete loop. The end-to-end measurement for the affected conductor shows a very high resistance or open circuit. During cross-connection testing, sockets beyond the break show readings of infinity or very high values. The most common causes are a cable that has been cut (perhaps during building work), a termination that has come loose, or a connector that was never made. The fix is to trace the ring to find the break and restore the connection.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">Bridged Ring</h3>
              <p className="text-white leading-relaxed text-sm">
                A bridged ring occurs when two points on the ring are connected together, creating a shortcut. This reduces the end-to-end resistance because the current has a shorter parallel path. During cross-connection testing, readings are lower than expected, and the pattern does not show the expected gradual increase towards the midpoint. A bridged ring can occur when an extra cable has been run between two sockets, sometimes during alterations, without disconnecting it from the ring. While a bridged ring still functions electrically, it conceals the true cable lengths and makes fault diagnosis unreliable.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">Cross-Polarity</h3>
              <p className="text-white leading-relaxed text-sm">
                Cross-polarity at one or more sockets means the line and neutral conductors have been swapped. During the cross-connection test, this produces readings that do not follow the expected pattern — some readings may be very low (near zero) while others are very high. The line-neutral cross-connection effectively creates a short circuit at the point of cross-polarity. This fault is dangerous because it means the neutral is switched by the MCB rather than the line, leaving live parts energised even when the MCB is off.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">Interconnected Rings</h3>
              <p className="text-white leading-relaxed text-sm">
                Interconnected rings occur when two separate ring circuits share a common cable section — typically because a previous electrician ran a cable from one ring to another, perhaps to add a socket. The end-to-end readings for the affected ring are lower than expected (because there is a parallel path through the other ring), and the cross-connection readings are unpredictable. This is a dangerous fault because a single cable section is now carrying current from two circuits, potentially exceeding its rating. The fix is to separate the rings completely.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Worked Examples */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-yellow-500/10 border border-yellow-500/20">
              <BarChart3 className="w-5 h-5 text-yellow-400" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white">Worked Examples</h2>
          </div>
          <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">Example 1: Healthy Ring — 35 Metres of 2.5/1.5 mm² T&E</h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>End-to-end readings:</p>
                <p className="font-mono text-white">
                  r1 (line, 2.5 mm²) = 35/100 x 7.41 = <strong className="text-yellow-400">0.26 ohms</strong>
                </p>
                <p className="font-mono text-white">
                  rn (neutral, 2.5 mm²) = <strong className="text-yellow-400">0.26 ohms</strong> (should match r1)
                </p>
                <p className="font-mono text-white">
                  r2 (CPC, 1.5 mm²) = 35/100 x 12.10 = <strong className="text-yellow-400">0.42 ohms</strong>
                </p>
                <p className="font-mono text-white">
                  r2/r1 ratio = 0.42 / 0.26 = <strong className="text-green-400">1.62 — correct for 2.5/1.5 mm²</strong>
                </p>
                <p>Cross-connection expected midpoint readings:</p>
                <p className="font-mono text-white">
                  Line-neutral midpoint = (0.26 + 0.26) / 4 = <strong className="text-yellow-400">0.13 ohms</strong>
                </p>
                <p className="font-mono text-white">
                  Line-earth midpoint (R1+R2) = (0.26 + 0.42) / 4 = <strong className="text-yellow-400">0.17 ohms</strong>
                </p>
              </div>
            </div>

            <div className="p-6 rounded-2xl bg-white/[0.04] border border-white/10">
              <h3 className="font-bold text-yellow-400 text-lg mb-3">Example 2: Detecting a Spur</h3>
              <div className="space-y-2 text-white leading-relaxed text-sm">
                <p>
                  During cross-connection testing, 8 sockets on a ring give readings between 0.10 and 0.17 ohms (line-neutral). One socket gives a reading of 0.24 ohms — significantly higher than the midpoint value of 0.13 ohms.
                </p>
                <p>
                  This socket is on a spur. The excess resistance (0.24 - 0.13 = 0.11 ohms) represents the additional cable length of the spur. For 2.5 mm² cable at 7.41 ohms per 100m, the spur length is approximately 0.11 / 7.41 x 100 = <strong className="text-yellow-400">1.5 metres</strong> (single length, not return).
                </p>
                <p>
                  Result: <strong className="text-green-400">Spur identified</strong>. Verify that the spur complies with BS 7671 — it should serve only one single or twin socket and be taken from a socket on the ring, a junction box, or the consumer unit.
                </p>
              </div>
            </div>
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
            <h2 className="text-2xl sm:text-3xl font-bold text-white">How to Test a Ring Final Circuit — Step by Step</h2>
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
            Why Use the Elec-Mate Ring Circuit Calculator?
          </h2>
          <p className="text-white text-center mb-10 max-w-2xl mx-auto">
            Purpose-built for UK electricians testing ring final circuits to GN3 and BS 7671. Validates readings, identifies faults, and provides R1+R2 values instantly.
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
        heading="Validate Ring Circuit Tests on Site"
        subheading="Join 430+ UK electricians using Elec-Mate for on-site testing calculations. 7-day free trial, cancel anytime."
      />

      {/* Bottom padding for mobile sticky CTA */}
      <div className="h-20 sm:h-0" />
    </PublicPageLayout>
  );
}
