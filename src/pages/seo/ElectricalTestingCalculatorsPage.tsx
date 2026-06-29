import { Helmet } from 'react-helmet';
import useSEO from '@/hooks/useSEO';
import { PublicPageLayout } from '@/components/seo/PublicPageLayout';
import { SEOCTASection } from '@/components/seo/SEOCTASection';
import { SEOFeatureGrid } from '@/components/seo/SEOFeatureGrid';
import {
  Calculator,
  Zap,
  ShieldCheck,
  Cable,
  Gauge,
  Lightbulb,
  BarChart3,
  Activity,
  CircuitBoard,
  Ruler,
  ChevronDown,
  ChevronUp,
  FileCheck,
  ArrowRight,
} from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';

const PAGE_TITLE = 'Electrical Testing Calculators | Zs, Fault Current, RCD';
const PAGE_DESCRIPTION =
  '70 electrical calculators for UK electricians. Earth loop impedance, fault current, RCD testing, conduit fill, max demand, and more. All BS 7671 compliant.';

const calculatorList = [
  'Earth Loop Impedance (Zs) Calculator',
  'Prospective Fault Current (PSCC/PEFC) Calculator',
  'RCD Testing Thresholds Calculator',
  'Conduit Fill Calculator',
  'Trunking Fill Calculator',
  'Maximum Demand Calculator (Table 1A)',
  'Maximum Demand Calculator (Table 1B)',
  'Power Factor Calculator',
  'Cable Volt Drop Calculator',
  'Lighting Lux Level Calculator',
  'Cable Sizing Calculator',
  'Disconnection Time Calculator',
  'Ring Final Circuit Continuity Calculator',
  'Insulation Resistance Calculator',
  'Diversity Calculator',
];

const softwareApplicationSchema = {
  '@type': 'SoftwareApplication',
  name: 'Elec-Mate Electrical Testing Calculators',
  applicationCategory: 'UtilitiesApplication',
  operatingSystem: 'Web, iOS, Android',
  description: PAGE_DESCRIPTION,
  url: 'https://www.elec-mate.com/tools/electrical-testing-calculators',
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'GBP',
    description: '7-day free trial, then from £19.99/month',
  },
  aggregateRating: {
    '@type': 'AggregateRating',
    ratingValue: '4.8',
    ratingCount: '312',
    bestRating: '5',
  },
};

const faqData = [
  {
    question: 'What is a Zs calculator and why do electricians need one?',
    answer:
      'A Zs (earth loop impedance) calculator determines the total impedance of the earth fault loop path in an electrical installation. Electricians need it to verify that protective devices (MCBs, RCBOs, fuses) will disconnect within the required time stated in BS 7671. Table 41.2 gives maximum Zs for fuses (BS 88-2, BS 88-3, BS 3036, BS 1362) at 0.4 s disconnection. Table 41.3 gives maximum Zs for circuit-breakers and RCBOs at both 0.4 s and 5 s disconnection. Table 41.4 gives maximum Zs for fuse-protected distribution and final circuits at 5 s. For TT systems where an RCD provides fault protection, compliance is verified using Table 41.5 (Ra × IΔn ≤ 50 V). If Zs is too high, the fault current will be too low to trip the protective device quickly enough, creating a serious electric shock risk. Elec-Mate calculates Zs from Ze (external earth fault loop impedance) plus R1+R2 (circuit protective conductors), and compares the result against BS 7671 maximum values with temperature correction applied.',
  },
  {
    question: 'How do I calculate prospective fault current for an EICR?',
    answer:
      "Prospective fault current (PFC) is calculated using Ohm's law: PFC = supply voltage divided by earth loop impedance (Zs for earth faults, or Zs phase-neutral for short circuits). For a 230V single-phase supply with Zs of 0.46 ohms, the prospective earth fault current is 230 / 0.46 = 500A. You must record both the prospective short-circuit current (PSCC) and the prospective earth fault current (PEFC) on every EICR. The values must not exceed the rated breaking capacity of the protective devices. Elec-Mate automatically calculates both PSCC and PEFC from your measured values and flags any that exceed device ratings.",
  },
  {
    question: 'What RCD testing values should I expect on site?',
    answer:
      'For a standard 30mA Type AC RCD, BS 7671 requires tripping within 300ms at rated residual current (30mA) and within 40ms at five times rated current (5×IΔn = 150mA for a 30mA device). Note: per GN3 Reg 5.6, a manufacturer may declare 250mA as the test current for the 40ms trip test instead of the standard 5×IΔn value — if the manufacturer has declared 250mA, that figure takes precedence on site. In practice, a healthy RCD should trip at roughly 50–70% of its rated current, so between 15–21mA for a 30mA device. At 5×IΔn, trip times are typically under 25ms. For Type A RCDs used with EV chargers and heat pumps, the same thresholds apply but the device also detects pulsating DC residual currents. Elec-Mate provides pass/fail thresholds for all RCD types including Type A, Type AC, Type B, and Type F, with automatic comparison to BS 7671 requirements.',
  },
  {
    question: 'How does the conduit and trunking fill calculator work?',
    answer:
      'The conduit fill calculator uses the cable factor method from the IET On-Site Guide (OSG) tables. Each cable size has a factor representing its cross-sectional area including insulation. You select the conduit size (which has a maximum capacity factor), enter the number and type of cables, and the calculator checks the total cable factor does not exceed the conduit capacity. For example, a 20mm round conduit has a factor of 460, and 2.5mm twin and earth cables each have a factor of 43. The trunking fill calculator works similarly but uses the percentage fill method — IET guidance limits trunking fill to 45% of the internal cross-sectional area. Elec-Mate covers all standard conduit sizes from 16mm to 50mm and trunking from 50x50mm to 300x100mm.',
  },
  {
    question: 'Do domestic lighting circuits now need RCD protection under A4:2026?',
    answer:
      'Yes. Regulation 411.3.4, introduced in BS 7671:2018+A4:2026, requires that within domestic (household) premises, additional protection by a 30mA RCD shall be provided for all AC final circuits supplying luminaires. This is a mandatory obligation — the regulation uses "shall". Pre-A4 domestic installations without RCD-protected lighting circuits are therefore non-compliant with current Wiring Regulations and will typically receive a C2 (potentially dangerous) or C3 (improvement recommended) observation on an EICR depending on the age of the installation and the specific circumstances. When testing a domestic board, verify that every lighting circuit is protected by a 30mA RCD and record any unprotected lighting circuits as an observation on the schedule.',
  },
  {
    question: 'What is an AFDD and does A4:2026 make them mandatory?',
    answer:
      'An AFDD (arc fault detection device) detects arc fault currents on AC final circuits — the kind of electrical arcing caused by damaged insulation, loose connections, or chafed cables that conventional MCBs and RCDs do not detect. Regulation 421.1.7, introduced by Amendment A4:2026, recommends (but does not mandate) the installation of AFDDs in AC final circuits of fixed installations to mitigate the risk of fire from arc fault currents. Because the regulation uses recommendatory language rather than "shall", AFDDs are not a legal requirement under BS 7671 for all installations. However, omitting them where there is a clear fire risk may result in a C3 improvement observation on an EICR, and they are increasingly expected practice on new domestic installations.',
  },
  {
    question: 'Are the calculators compliant with the latest BS 7671 amendments?',
    answer:
      'Yes. All Elec-Mate calculators are compliant with BS 7671:2018+A4:2026 (the 18th Edition IET Wiring Regulations) and incorporate values from Amendment 4 where applicable. Key A4:2026 changes relevant to testing include: Reg 551.7.1, which has been redrafted to add new indents (c) and (d) requiring a suitable protective device where energy flow is bidirectional (for example export-capable solar PV or battery storage) and restricting connection of sources to the load side of RCDs; Reg 411.3.4, which now requires 30mA RCD additional protection for domestic lighting circuits; and Reg 421.1.7, which recommends AFDDs on AC final circuits. Our maximum Zs values, disconnection times, cable ratings, and all reference tables are sourced directly from BS 7671 and the IET On-Site Guide. When amendments are published, we update all affected calculators within 30 days.',
  },
];

const faqPageSchema = {
  '@type': 'FAQPage',
  mainEntity: faqData.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
};

const itemListSchema = {
  '@type': 'ItemList',
  name: 'Electrical Testing Calculators for UK Electricians',
  description:
    'Complete suite of BS 7671 compliant electrical testing calculators used by UK electricians for EICR, EIC, and minor works certification.',
  numberOfItems: calculatorList.length,
  itemListElement: calculatorList.map((name, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    name,
    url: 'https://www.elec-mate.com/electrical-testing-calculators',
  })),
};

const features = [
  {
    icon: Zap,
    title: 'Earth Loop Impedance (Zs)',
    description:
      'Calculate Zs from Ze and R1+R2. Automatic comparison against BS 7671 maximum values with temperature correction applied.',
  },
  {
    icon: Activity,
    title: 'Prospective Fault Current',
    description:
      'Derive PSCC and PEFC from measured impedance values. Verify protective device breaking capacity is sufficient for the installation.',
  },
  {
    icon: ShieldCheck,
    title: 'RCD Testing Thresholds',
    description:
      'Pass/fail thresholds for Type AC, A, B, and F RCDs at 1x and 5x rated current. Covers 30mA, 100mA, and 300mA devices.',
  },
  {
    icon: Cable,
    title: 'Conduit & Trunking Fill',
    description:
      'Cable factor method for round and oval conduit from 16mm to 50mm. Percentage fill for all standard trunking sizes per IET guidance.',
  },
  {
    icon: Gauge,
    title: 'Maximum Demand',
    description:
      'Table 1A (domestic) and Table 1B (commercial) max demand with diversity factors. Calculates total load for supply applications.',
  },
  {
    icon: Lightbulb,
    title: 'Lighting & Lux Levels',
    description:
      'Calculate required luminaires for any room size and target lux level. Covers domestic, commercial, and industrial applications.',
  },
  {
    icon: BarChart3,
    title: 'Power Factor Correction',
    description:
      'Calculate true power, apparent power, and reactive power. Determine capacitor size needed for power factor correction to 0.95.',
  },
  {
    icon: CircuitBoard,
    title: 'Cable Volt Drop',
    description:
      'Verify volt drop stays within BS 7671 limits of 3% for lighting and 5% for other circuits. Covers all standard cable sizes and types.',
  },
  {
    icon: Ruler,
    title: 'Cable Sizing',
    description:
      'Full adiabatic cable sizing per BS 7671 Appendix 4. Accounts for grouping, thermal insulation, ambient temperature, and installation method.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-white/10 rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left touch-manipulation h-auto min-h-[44px]"
      >
        <span className="font-semibold text-white pr-4">{question}</span>
        {open ? (
          <ChevronUp className="w-5 h-5 text-yellow-400 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-yellow-400 flex-shrink-0" />
        )}
      </button>
      {open && (
        <div className="px-5 pb-5">
          <p className="text-white leading-relaxed">{answer}</p>
        </div>
      )}
    </div>
  );
}

export default function ElectricalTestingCalculatorsPage() {
  useSEO({
    title: 'Electrical Testing Calculators | Zs, Fault Current, RCD',
    description: PAGE_DESCRIPTION,
    schema: softwareApplicationSchema,
  });

  return (
    <PublicPageLayout>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...softwareApplicationSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...faqPageSchema })}
        </script>
        <script type="application/ld+json">
          {JSON.stringify({ '@context': 'https://schema.org', ...itemListSchema })}
        </script>
      </Helmet>

      {/* Hero */}
      <section className="py-16 sm:py-24 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/20 mb-6">
            <Calculator className="w-4 h-4 text-yellow-400" />
            <span className="text-sm font-medium text-yellow-400">
              70 BS 7671 Compliant Calculators
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-bold text-white mb-5 leading-tight">
            Electrical Testing Calculators for{' '}
            <span className="text-yellow-400">UK Electricians</span>
          </h1>
          <p className="text-lg text-white max-w-2xl mx-auto mb-4 leading-relaxed">
            Elec-Mate provides 70 electrical calculators covering Zs, prospective fault current, RCD
            trip thresholds, volt drop, cable sizing, and more — all referenced against BS
            7671:2018+A4:2026. Enter your measured values and get instant pass/fail results with the
            correct BS 7671 table values applied.
          </p>
          <p className="text-base text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            Every calculation you need on site, from earth loop impedance and fault current to
            conduit fill and maximum demand. All values cross-referenced against BS
            7671:2018+A4:2026.
          </p>
          <Link to="/auth/signup">
            <Button className="h-14 px-10 text-base font-semibold bg-yellow-500 hover:bg-yellow-400 active:scale-[0.97] text-black touch-manipulation transition-transform">
              Try All Calculators Free
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="px-5 pb-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-10">
            Key Calculators at Your Fingertips
          </h2>
          <SEOFeatureGrid features={features} columns={3} />
        </div>
      </section>

      {/* Deep Content: Zs Calculator */}
      <section className="py-16 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Earth Loop Impedance (Zs) Calculator — The Most Important Test
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Earth loop impedance, known as Zs, is arguably the single most critical measurement
              you take during electrical testing. It determines whether the protective device on a
              circuit — be it an MCB, RCBO, or fuse — will disconnect the supply fast enough to
              prevent electric shock if a fault occurs. The entire safety chain of an installation
              depends on this value being within the limits set by BS 7671.
            </p>
            <p>
              The earth fault loop path starts at the point of fault, passes through the circuit
              protective conductor (CPC) back to the consumer unit, through the main earthing
              terminal, down the earthing conductor to the means of earthing, through the earth
              return path of the supply network, through the secondary winding of the supply
              transformer, and back through the line conductor to the point of fault. Every
              connection, every joint, and every metre of conductor in that path adds impedance.
            </p>
            <p>
              Zs is the sum of two components: Ze (the external earth fault loop impedance, measured
              at the origin of the installation with the main earthing conductor disconnected) and
              (R1+R2) — where R1 is the resistance of the line conductor from the origin to the
              furthest point of the circuit, and R2 is the resistance of the CPC over the same
              route. These values are measured at ambient temperature during testing, but conductors
              get hot under fault conditions. That is why BS 7671 requires you to apply a correction
              factor to account for conductor resistance at the maximum permitted operating
              temperature. The rule of thumb is to multiply the tabulated maximum Zs from BS 7671 by
              0.8 to obtain the maximum permissible value for your on-site measurement at ambient
              temperature, although the precise factor depends on conductor type and installation
              conditions.
            </p>
            <p>
              If your measured Zs exceeds the maximum value stated in BS 7671 — Table 41.2 for
              fuse-protected circuits at 0.4 s, Table 41.3 for circuit-breakers and RCBOs at 0.4 s
              or 5 s, or Table 41.4 for fuse-protected distribution and final circuits at 5 s — the
              circuit fails. For TT systems where an RCD provides fault protection, compliance is
              checked using the condition Ra × IΔn ≤ 50 V per Table 41.5 rather than a Zs table
              limit. A failed Zs test typically means the CPC has a poor connection somewhere, the
              circuit is too long for the cable size, or the external earth fault loop impedance is
              unusually high. Our Zs calculator lets you enter Ze and R1+R2, automatically applies
              the temperature correction, and instantly tells you whether the circuit passes or
              fails for every common protective device type and rating.
            </p>
          </div>
        </div>
      </section>

      {/* Deep Content: Fault Current */}
      <section className="py-16 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Prospective Fault Current (PSCC &amp; PEFC) Calculator
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Every EICR and EIC requires you to record the prospective fault current at the origin
              of the installation. There are two values: the prospective short-circuit current
              (PSCC) — the maximum current that would flow in a dead short between line and neutral
              — and the prospective earth fault current (PEFC) — the maximum current that would flow
              in a fault between line and earth. These values matter because every protective device
              has a rated breaking capacity (often 6kA for domestic MCBs), and if the prospective
              fault current exceeds that rating, the device could fail catastrophically during a
              fault.
            </p>
            <p>
              The calculation is straightforward. For PSCC, divide the nominal supply voltage (230V
              single phase, 400V three phase) by the impedance of the line-neutral loop at the
              origin. For PEFC, divide the supply voltage by Ze. In practice, you measure these
              directly with a loop impedance tester at the origin, or you calculate them from the
              measured Ze and Zn (neutral loop impedance) values. Our calculator accepts either
              direct measurements or calculated values and presents both PSCC and PEFC alongside the
              breaking capacity of common protective device families (BS 60898 MCBs, BS 61009 RCBOs,
              BS 88 fuses).
            </p>
            <p>
              A common scenario on domestic EICRs is finding a prospective fault current of around
              1-3kA at the origin of a standard 100A single-phase supply. This is well within the
              6kA breaking capacity of most MCBs. But in commercial and industrial settings, or on
              supplies very close to the transformer, PSCC can reach 10kA, 16kA, or even higher. In
              those situations you need MCBs or MCCBs rated to at least that level, or the
              installation is non-compliant. Our calculator flags these issues automatically, saving
              you from having to cross-reference device data sheets manually.
            </p>
          </div>
        </div>
      </section>

      {/* Deep Content: RCD Testing */}
      <section className="py-16 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            RCD Testing Thresholds — Every Type Covered
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Residual current devices (RCDs) are the last line of defence against electric shock.
              BS 7671 requires additional protection by a 30mA RCD for virtually all socket outlets,
              all circuits in bathrooms, all circuits in locations with increased shock risk, and
              all cables installed at a depth of less than 50mm in a wall without mechanical
              protection. Testing that these devices actually operate correctly is a non-negotiable
              part of every EICR and initial verification.
            </p>
            <p>
              RCD testing involves applying a known residual current and measuring the disconnection
              time. At rated current (typically 30mA), the RCD must trip within 300ms. At five times
              rated current (5×IΔn — 150mA for a 30mA device), it must trip within 40ms. One
              important on-site nuance: GN3 Reg 5.6 states that for Type AC RCDs, a manufacturer may
              declare 250mA as the test current for the 40ms test instead of the standard 5×IΔn
              value. Where the manufacturer has declared 250mA, that figure takes precedence and
              your tester must be set accordingly. You also perform a half-rated (15mA) test — the
              RCD should not trip at this level, confirming it is not oversensitive. For each test,
              our calculator displays the expected trip time range, the pass/fail threshold, and
              explains what a failure at each level typically indicates.
            </p>
            <p>
              BS 7671:2018+A4:2026 Reg 411.3.4 introduced a new requirement for domestic premises:
              all AC final circuits supplying luminaires (lighting circuits) shall now have
              additional protection by a 30mA RCD. This is a mandatory obligation and a common EICR
              failure point on pre-A4 installations where lighting circuits were historically left
              unprotected. When running our RCD testing calculator, ensure you have verified and
              recorded RCD protection for every lighting circuit in domestic properties — any
              unprotected lighting circuit requires an EICR observation.
            </p>
            <p>
              The landscape of RCD types has expanded significantly. Type AC RCDs detect sinusoidal
              AC residual currents — these are the traditional devices. Type A RCDs also detect
              pulsating DC residual currents, which are generated by electronic equipment such as EV
              chargers, heat pumps, and variable speed drives. BS 7671 now requires Type A
              protection for these specific loads. Type B RCDs detect smooth DC residual currents as
              well and are required for certain three-phase EV chargers. Type F RCDs are designed
              for frequency-controlled equipment. Our testing calculator covers all four types with
              appropriate thresholds and explains which circuits require which type.
            </p>
          </div>
        </div>
      </section>

      {/* Deep Content: Conduit, Trunking, Max Demand */}
      <section className="py-16 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Conduit Fill, Trunking Fill &amp; Maximum Demand Calculators
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Getting conduit and trunking fill calculations wrong leads to cables overheating,
              insulation damage, and potentially fires. The IET On-Site Guide provides cable factors
              for every standard cable type and size, and conduit capacity factors for every
              standard conduit size. The rule is simple: the sum of all cable factors must not
              exceed the conduit factor. For trunking, IET guidance limits the cable fill to 45% of
              the internal cross-sectional area.
            </p>
            <p>
              Our conduit fill calculator supports all standard round conduit sizes from 16mm
              through to 50mm, and both rigid PVC and steel conduit. You select the conduit type and
              size, add the cables you plan to install, and the calculator instantly shows your
              percentage fill against the maximum. It also shows the derating factor that applies
              based on the number of circuits — because grouping cables together reduces their
              current carrying capacity, per BS 7671 Table 4C1.
            </p>
            <p>
              The maximum demand calculator is essential when you are designing a new installation
              or assessing whether an existing supply is adequate. For domestic premises, Table 1A
              in the IET On-Site Guide provides diversity allowances for different types of load.
              For example, cooking appliances have a diversity of 10A plus 30% of the remainder,
              while socket outlets use 100% of the largest circuit plus 40% of the remaining
              circuits. For commercial and industrial premises, Table 1B provides different
              diversity factors. Our calculator walks you through both tables, letting you add each
              load type and automatically calculating the diversified maximum demand. This is the
              figure you put on an application for a new or upgraded supply from the Distribution
              Network Operator (DNO).
            </p>
          </div>
        </div>
      </section>

      {/* Deep Content: Power Factor & Volt Drop */}
      <section className="py-16 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6">
            Power Factor, Volt Drop &amp; Cable Sizing
          </h2>
          <div className="space-y-4 text-white leading-relaxed">
            <p>
              Power factor is the ratio of true power (watts) to apparent power (VA). A power factor
              of 1.0 means all the current drawn is doing useful work. In practice, inductive loads
              like motors, transformers, and fluorescent lighting cause the current to lag behind
              the voltage, reducing the power factor to 0.7-0.85 in many commercial installations. A
              low power factor means higher current draw for the same amount of useful work, leading
              to larger cable sizes, more losses, and potentially DNO surcharges. Our power factor
              calculator computes true power, apparent power, and reactive power from any two of
              these values plus the power factor, and calculates the capacitor size needed to
              correct the power factor to a target value, typically 0.95.
            </p>
            <p>
              Voltage drop must be checked for every circuit to ensure the voltage at the load is
              sufficient for equipment to operate correctly. BS 7671 limits voltage drop to 3% for
              lighting circuits (6.9V on a 230V supply) and 5% for all other circuits (11.5V). The
              volt drop depends on the cable length, the cable size, the design current, and the
              cable type. Our volt drop calculator uses the millivolt-per-ampere-per-metre values
              from BS 7671 Appendix 4 Table 4Ab and similar tables, covering both single-core and
              multicore cables in thermoplastic and thermosetting insulation. Enter the circuit
              details and the calculator shows the actual volt drop in volts and as a percentage,
              with a clear pass or fail indication.
            </p>
            <p>
              Cable sizing brings together several of these calculations. You start with the design
              current, apply the correction factors for ambient temperature (Ca from Table 4B1),
              grouping (Cg from Table 4C1), thermal insulation (Ci from Table 52.2), and the type of
              protective device (Cf). The required current carrying capacity is the design current
              divided by the product of all these factors. You then select a cable from the
              appropriate table in Appendix 4 whose tabulated current rating meets or exceeds this
              value. Finally, you verify that the cable also satisfies the{' '}
              <SEOInternalLink href="/tools/adiabatic-equation-calculator">
                adiabatic equation
              </SEOInternalLink>{' '}
              for fault protection, and that the{' '}
              <SEOInternalLink href="/tools/voltage-drop-calculator">volt drop</SEOInternalLink> is
              within limits. Our{' '}
              <SEOInternalLink href="/tools/cable-sizing-calculator">
                cable sizing calculator
              </SEOInternalLink>{' '}
              performs all of these steps in one go, showing the full working and the selected cable
              size.
            </p>
          </div>
        </div>
      </section>

      {/* Complete Calculator List */}
      <section className="py-16 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            Featured Calculators
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {calculatorList.map((name) => (
              <div
                key={name}
                className="flex items-center gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10"
              >
                <FileCheck className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                <span className="text-white text-sm font-medium">{name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* App Bridge */}
      <section className="py-4 px-5">
        <div className="max-w-4xl mx-auto">
          <SEOAppBridge
            title="70 Electrical Calculators in One App"
            description="Elec-Mate's calculator suite covers earth loop impedance, cable sizing, voltage drop, RCD testing, conduit fill…"
            ctaText="Try Elec-Mate free"
            ctaHref="/auth/signup"
            icon={Calculator}
          />
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 px-5 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-white text-center mb-8">
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqData.map((faq) => (
              <FAQItem key={faq.question} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}

      {/* Related pages — auto-injected for internal-link health (audit criterion #7).
          Topic-matched via token-Jaccard against the broader SEO corpus. */}
      <section className="px-5 py-12 border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-bold text-white mb-4">Related electrical pages</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
            <SEOInternalLink href="/guides/electrical-testing-cost-uk">
              Electrical Testing Cost UK 2026
            </SEOInternalLink>
            <SEOInternalLink href="/tools/electrical-app-with-ai">
              Electrical App with AI
            </SEOInternalLink>
            <SEOInternalLink href="/guides/ai-for-electrical-apprentices">
              AI for Electrical Apprentices
            </SEOInternalLink>
            <SEOInternalLink href="/cleanroom-electrical">
              Cleanroom Electrical Installation UK
            </SEOInternalLink>
            <SEOInternalLink href="/continuity-testing-guide">
              Continuity Testing Guide UK
            </SEOInternalLink>
            <SEOInternalLink href="/guides/continuity-testing-r1-r2">
              Continuity Testing R1+R2
            </SEOInternalLink>
            <SEOInternalLink href="/guides/electrical-apprenticeship-guide">
              Electrical Apprenticeship UK 2026
            </SEOInternalLink>
            <SEOInternalLink href="/guides/electrical-bim-guide">
              Electrical BIM Guide
            </SEOInternalLink>
          </div>
        </div>
      </section>

      <SEOCTASection
        heading="Stop flipping through tables on site"
        subheading="Join 1,000+ UK electricians using Elec-Mate calculators to speed up testing and certification. 7-day free trial, cancel anytime."
      />
    </PublicPageLayout>
  );
}
