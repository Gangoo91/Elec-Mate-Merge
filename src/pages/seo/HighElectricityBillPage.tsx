import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Zap,
  Thermometer,
  Search,
  Calculator,
  ClipboardCheck,
  GraduationCap,
  FileCheck2,
  PoundSterling,
  Activity,
  ShieldCheck,
  Brain,
  Gauge,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Troubleshooting', href: '/guides' },
  { label: 'High Electricity Bill', href: '/guides/high-electricity-bill-causes' },
];

const tocItems = [
  { id: 'electrical-causes-overview', label: 'Electrical Causes of High Bills' },
  { id: 'earth-leakage', label: 'Earth Leakage' },
  { id: 'faulty-appliances', label: 'Faulty Appliances' },
  { id: 'immersion-heater', label: 'Immersion Heater Stuck On' },
  { id: 'storage-heaters', label: 'Storage Heater Problems' },
  { id: 'meter-issues', label: 'Meter Issues' },
  { id: 'how-electrician-investigates', label: 'How an Electrician Investigates' },
  { id: 'reducing-consumption', label: 'Reducing Electrical Consumption' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Unexplained high electricity bills are often caused by electrical faults — not just leaving lights on. Earth leakage, faulty thermostats, and stuck contactors can waste hundreds of pounds per year.',
  'Earth leakage as low as 30mA per circuit may not trip the RCD but can waste significant energy across multiple circuits — and indicates deteriorated insulation that needs investigation.',
  'A faulty immersion heater thermostat that keeps the element on continuously can add £50 to £80 per month to a bill, even when the hot water cylinder feels excessively hot.',
  'Storage heaters with faulty charge controls or input/output dampers stuck open waste energy by overcharging on expensive day-rate electricity or releasing heat when it is not needed.',
  "Elec-Mate's testing calculators and AI fault diagnosis tool help electricians measure earth leakage, identify faulty circuits, and produce a clear report for the customer.",
];

const faqs = [
  {
    question: 'Can an electrical fault cause a high electricity bill?',
    answer:
      'Yes. Several types of electrical fault can cause unexpectedly high electricity bills. Earth leakage is one of the most common — when current leaks to earth through deteriorated insulation, that energy is wasted but still metered. A faulty immersion heater thermostat that fails to switch off can keep the heating element running 24 hours a day. Storage heaters with broken charge controls can overcharge on expensive day-rate electricity. Even a faulty fridge compressor that runs continuously instead of cycling on and off can add significant cost. The key indicator is a bill that is noticeably higher than the same period in previous years, with no change in usage habits.',
  },
  {
    question: 'How much electricity does earth leakage waste?',
    answer:
      'The amount depends on the magnitude of the leakage current and how many circuits are affected. A single circuit with 20mA of earth leakage at 230V wastes about 4.6W continuously — that is roughly 40 kWh per year, costing around £12 at current rates. However, if multiple circuits each have small leakage currents, the total can be substantial. An installation with 100mA of total earth leakage wastes about 23W continuously — roughly 200 kWh per year, costing around £60. More importantly, earth leakage indicates deteriorated insulation, which is a safety concern. The energy waste is a symptom; the underlying fault is the real problem.',
  },
  {
    question: 'How can I tell if my immersion heater thermostat is faulty?',
    answer:
      'The clearest sign is that the hot water in your cylinder is excessively hot — scalding hot, rather than the normal 60 degrees Celsius. If the water is too hot to put your hand under, the thermostat may have failed in the closed position, keeping the element on continuously. Another sign is that the immersion heater switch on the wall feels warm or hot to the touch even when you have not intentionally turned it on. If you have an Economy 7 or off-peak tariff, the immersion should only heat water during the cheap-rate period (typically midnight to 7am). If the cylinder is hot during the day and you have not switched it on, the timer or contactor may be faulty. A qualified electrician can test the thermostat and element to confirm.',
  },
  {
    question: 'Can a faulty meter cause a high bill?',
    answer:
      'It is possible but relatively rare. Electricity meters are generally very reliable, and modern smart meters are regularly checked remotely. However, older mechanical meters (with a spinning disc) can occasionally develop faults that cause them to over-read. If you suspect a meter fault, you can ask your energy supplier to test the meter. Under the Electricity Act 1989, you have the right to request a meter accuracy test. If the meter is found to be inaccurate by more than the permitted tolerance (typically plus or minus 2.5%), the supplier must replace it and adjust your bills. Before requesting a meter test, it is worth ruling out other causes first — a genuinely faulty meter is far less common than a faulty appliance or earth leakage.',
  },
  {
    question: 'Should I get an electrician to investigate a high electricity bill?',
    answer:
      'If you have ruled out obvious causes (leaving appliances on, increased usage, tariff changes) and your bill is significantly higher than expected, calling a qualified electrician is a good idea. An electrician can carry out insulation resistance testing on each circuit to check for earth leakage, use a clamp meter to measure the current drawn by individual circuits, inspect the immersion heater thermostat and element, check storage heater controls, and identify any circuit that is drawing more current than expected. The investigation typically takes 1 to 2 hours and can identify faults that are costing you far more than the electrician callout fee.',
  },
  {
    question: 'Do LED bulbs reduce electricity bills significantly?',
    answer:
      'Yes, but the savings depend on how many lights you have and how long they are on. A typical 60W incandescent bulb draws 60W. An equivalent LED bulb produces the same light output for about 7W — an 88% reduction. If you have 20 light fittings in your home, each on for 5 hours a day, switching from incandescent to LED saves approximately 1,935 kWh per year — around £580 at current rates. However, if your bill has suddenly increased and you have not changed your lighting, LED savings will not explain the increase. A sudden jump in your bill is more likely caused by a fault (earth leakage, stuck thermostat) or a change in your tariff or usage. LED upgrades are worthwhile for reducing your baseline consumption, but they are not a fix for an underlying electrical fault.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/overloaded-circuit-signs',
    title: 'Overloaded Circuit Signs',
    description:
      'How to recognise circuit overload, maximum demand calculation, and adding new circuits.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/loose-neutral-symptoms',
    title: 'Loose Neutral Symptoms',
    description:
      'Voltage fluctuations, flickering lights, and the dangers of an open neutral connection.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/guides/rcd-keeps-tripping',
    title: 'RCD Keeps Tripping',
    description:
      'Earth leakage causes, nuisance tripping, and systematic fault-finding for RCD circuits.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description:
      'Complete digital EICR certificates on your phone with AI board scanner and voice test entry.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/tools/calculators',
    title: 'Electrical Testing Calculators',
    description:
      'Cable sizing, maximum demand, voltage drop, and earth loop impedance calculators.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection & Testing Course',
    description:
      'Study for C&G 2391 with 50+ structured training modules on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'electrical-causes-overview',
    heading: 'Electrical Causes of Unexpectedly High Bills',
    content: (
      <>
        <p>
          When an electricity bill is significantly higher than expected, most people assume they
          have been leaving lights or appliances on. While usage habits do matter, genuinely
          unexplained increases are often caused by electrical faults within the installation itself
          — faults that waste energy continuously, 24 hours a day, without the occupant being aware.
        </p>
        <p>The most common electrical causes of high bills are:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth leakage</strong> — current leaking to earth through deteriorated
                insulation, wasting energy and indicating a potential safety hazard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Faulty appliances</strong> — compressors, motors, or heating elements that
                run continuously instead of cycling normally.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Immersion heater stuck on</strong> — a faulty thermostat keeping the heating
                element running 24/7.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Storage heater problems</strong> — faulty charge controls, stuck dampers, or
                broken sensors causing overcharging.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Meter issues</strong> — faulty meters, incorrect tariff settings, or crossed
                meters in flats.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An electrician with the right tools — a clamp meter, insulation resistance tester, and
          systematic approach — can identify the cause in a single visit. Elec-Mate's{' '}
          <SEOInternalLink href="/tools/ai-fault-diagnosis">
            AI fault diagnosis tool
          </SEOInternalLink>{' '}
          helps narrow down the likely cause from the symptoms before testing even begins.
        </p>
      </>
    ),
  },
  {
    id: 'earth-leakage',
    heading: 'Earth Leakage: The Hidden Energy Thief',
    content: (
      <>
        <p>
          Earth leakage occurs when current escapes from the intended circuit path and flows to
          earth through deteriorated cable insulation, damaged accessories, or moisture-affected
          wiring. This current is metered — your electricity meter records it as consumption even
          though it is not powering anything useful.
        </p>
        <p>
          The insidious thing about earth leakage is that small amounts may not trip the RCD. A 30mA
          RCD is designed to trip at its rated residual current, but a leakage of 15mA or 20mA per
          circuit will not trip it. Across an installation with 10 or 12 circuits, these small
          leakage currents add up.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h4 className="font-bold text-white text-base mb-3">How to detect earth leakage</h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation resistance testing</strong> — test each circuit between L-E and
                N-E with a 500V insulation resistance tester. A reading below 2 M-ohm (the minimum
                acceptable under{' '}
                <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>
                ) indicates deteriorated insulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Clamp meter around both L and N conductors</strong> — with the circuit
                energised, clamp around both live and neutral conductors simultaneously. Any reading
                above zero is earth leakage current (the imbalance between outgoing and returning
                current).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Search className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>RCD ramp test</strong> — a rising-current RCD test can measure the actual
                trip current, revealing how much leakage the circuit is already carrying before the
                test current is applied.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Common sources of earth leakage include outdoor wiring exposed to moisture, underfloor
          heating cables with damaged insulation, old rubber-insulated wiring (pre-1970s), and
          bathroom circuits with poor IP-rated accessories. Identifying and rectifying the leakage
          source not only reduces the electricity bill but also improves the safety of the
          installation.
        </p>
      </>
    ),
  },
  {
    id: 'faulty-appliances',
    heading: 'Faulty Appliances That Waste Electricity',
    content: (
      <>
        <p>
          Appliances with motors or compressors are designed to cycle on and off under thermostat
          control. When the control mechanism fails, the motor or compressor runs continuously,
          drawing full-load current around the clock.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fridge/freezer with a failing compressor:</strong> A healthy fridge
                compressor runs for about 15 to 20 minutes per hour. A failing compressor that runs
                continuously can double or triple energy consumption — from around 150 kWh per year
                to 400 kWh or more.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Central heating pump stuck on:</strong> A circulating pump that runs 24/7
                instead of only when the boiler is firing wastes approximately 60 to 80W
                continuously — around 525 to 700 kWh per year, costing £160 to £210.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Towel rail with no timer:</strong> An electric towel rail drawing 150W
                running 24/7 costs over £400 per year. Many are installed without a timer or
                thermostat and simply left on.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dehumidifier in a damp property:</strong> Running a dehumidifier
                continuously in a property with an unresolved damp problem can cost £200 to £300 per
                year. The electrical cost treats the symptom while the building fault persists.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A simple clamp meter test on individual circuits can identify which circuit is drawing
          unexpectedly high current. Compare the measured load with the expected load based on the
          appliances connected, and the offending item will stand out. Elec-Mate's{' '}
          <SEOInternalLink href="/tools/calculators/max-demand">
            maximum demand calculator
          </SEOInternalLink>{' '}
          helps you establish what the expected consumption should be for a given installation.
        </p>
      </>
    ),
  },
  {
    id: 'immersion-heater',
    heading: 'Immersion Heater Stuck On: A Common Culprit',
    content: (
      <>
        <p>
          The immersion heater is one of the biggest energy consumers in a domestic property. A
          typical 3kW immersion element running for just 2 hours per day to heat the hot water
          cylinder uses about 2,190 kWh per year — roughly £660 at current rates. If the thermostat
          fails in the closed position and the element runs 24 hours a day, that figure jumps to
          26,280 kWh — over £7,800 per year at day-rate electricity.
        </p>
        <p>
          In practice, the high-limit thermostat (the safety cutout) usually prevents the element
          from running indefinitely by cutting out when the water reaches approximately 85 to 90
          degrees Celsius. But even with the high-limit cycling, the water is being heated far
          beyond the normal 60 degrees, wasting energy.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h4 className="font-bold text-white text-base mb-3">
            Signs of a stuck immersion thermostat
          </h4>
          <ul className="space-y-3 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>Hot water is scalding hot — too hot to put your hand under at the tap.</span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                The immersion heater switch on the wall feels warm or hot to the touch even when you
                have not switched it on.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                The hot water cylinder feels very hot to the touch — you can hear it "singing" as
                the water is close to boiling.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                On an Economy 7 tariff, the water is still hot at the end of the day when it should
                have cooled — suggesting it has been reheated during the day on expensive peak-rate
                electricity.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The fix is straightforward: replace the faulty thermostat (or the entire immersion heater
          element if the thermostat is integral). An electrician can test the thermostat with a
          multimeter to confirm whether it is switching correctly. This is a common diagnostic that
          pays for itself within a single billing period.
        </p>
        <SEOAppBridge
          title="Diagnose immersion heater faults with AI"
          description="Describe the symptoms — scalding water, hot switch, high bill — and Elec-Mate's AI fault diagnosis identifies the likely cause, suggests test procedures, and helps you explain the findings to the customer."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'storage-heaters',
    heading: 'Storage Heater Problems That Inflate Bills',
    content: (
      <>
        <p>
          Electric storage heaters charge overnight using cheap off-peak electricity (Economy 7 or
          Economy 10 tariff) and release the stored heat during the day. When the charge control or
          output mechanism fails, energy is wasted in several ways:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Faulty charge control sensor:</strong> The sensor that tells the heater how
                much charge it needs (based on room temperature and expected demand) fails, causing
                the heater to fully charge every night regardless of outside temperature. A 3.4kW
                storage heater fully charging for 7 hours every night uses about 8,700 kWh per year
                — even in summer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Stuck output damper:</strong> The damper (or flap) that controls how much
                heat is released is stuck open, causing all the stored heat to be released in the
                first few hours of the day. The room overheats in the morning and is cold by
                evening.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Charging on day-rate electricity:</strong> If the time switch or contactor
                that switches the storage heater to off-peak supply is faulty, the heater may charge
                on expensive day-rate electricity. This can double or triple the heating cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Gauge className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Boost element running on day rate:</strong> Some storage heaters have a
                convector boost element for daytime top-up. If this is left on or the switch is
                faulty, it runs on the full day rate, adding significant cost.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An electrician investigating high bills in a property with storage heaters should check
          the off-peak contactor timing, measure current draw during both off-peak and peak periods,
          and inspect the charge control and output mechanisms. Replacing a faulty charge sensor or
          contactor is far cheaper than the energy it wastes.
        </p>
      </>
    ),
  },
  {
    id: 'meter-issues',
    heading: 'Meter Issues: Faulty, Crossed, or Misconfigured',
    content: (
      <>
        <p>
          While less common than installation faults, meter issues can cause genuinely incorrect
          billing:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Crossed meters in flats:</strong> In blocks of flats, it is not uncommon for
                meters to be cross-connected during installation. You may be paying for your
                neighbour's electricity. This can be checked by turning off your main switch and
                seeing if your meter continues to register consumption.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Economy 7 meter misconfigured:</strong> If the off-peak and peak registers
                are swapped, your cheap overnight usage is being charged at day rate, and vice
                versa. This can double your effective heating cost.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Estimated readings:</strong> If your supplier has been using estimated
                readings (rather than actual meter readings), the estimates may be too high. A smart
                meter installation eliminates this problem.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PoundSterling className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>CT meter with wrong ratio:</strong> In commercial or larger domestic
                installations, current transformer (CT) meters can be programmed with the wrong CT
                ratio, causing readings to be multiplied incorrectly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If you suspect a meter fault, contact your energy supplier. Under the Electricity Act
          1989, you can request a meter accuracy test. An electrician can help by measuring the
          actual current draw at the meter tails with a clamp meter and comparing it to the meter
          reading rate to verify whether the meter is recording accurately.
        </p>
      </>
    ),
  },
  {
    id: 'how-electrician-investigates',
    heading: 'How an Electrician Investigates a High Electricity Bill',
    content: (
      <>
        <p>A systematic investigation by a qualified electrician typically follows this process:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Baseline measurement.</strong> With all loads switched off, check the meter
              reading rate. If the meter is still registering consumption with everything off, there
              is either a fault on the installation or a crossed meter.
            </li>
            <li>
              <strong>Circuit-by-circuit current measurement.</strong> Using a clamp meter at the
              consumer unit, measure the current drawn by each circuit. Compare with the expected
              load based on the connected appliances.
            </li>
            <li>
              <strong>Insulation resistance testing.</strong> Test each circuit between L-E and N-E
              at 500V to check for earth leakage. Record the readings on the{' '}
              <SEOInternalLink href="/tools/eicr-certificate">
                schedule of test results
              </SEOInternalLink>
              .
            </li>
            <li>
              <strong>Immersion heater and storage heater checks.</strong> Test thermostats, time
              switches, contactors, and charge controls for correct operation.
            </li>
            <li>
              <strong>Identify the culprit.</strong> Once the high-consumption circuit or appliance
              is identified, advise the customer on the repair or replacement needed and provide a
              quote.
            </li>
          </ol>
        </div>
        <p>
          This investigation is an excellent add-on service for electricians. Many customers will
          happily pay for a diagnostic visit that identifies a fault costing them £50 or more per
          month. Elec-Mate's{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            defect code AI
          </SEOInternalLink>{' '}
          helps you classify any faults found and produce a clear, professional report.
        </p>
        <SEOAppBridge
          title="Professional reports and remedial quotes"
          description="Found the cause of the high bill? Use Elec-Mate to generate a professional EICR or condition report, classify defects with AI-assisted observation codes, and price the remedial work — all before you leave the property."
          icon={FileCheck2}
        />
      </>
    ),
  },
  {
    id: 'reducing-consumption',
    heading: 'Practical Steps to Reduce Electrical Consumption',
    content: (
      <>
        <p>
          Beyond fixing faults, an electrician can advise customers on reducing their ongoing
          electricity consumption. This builds trust and creates opportunities for further work:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>LED lighting upgrade:</strong> Replacing incandescent or halogen lamps with
                LED equivalents can cut lighting energy use by 80 to 90 per cent. Offer to install
                LED downlights, LED panels, or retrofit LED lamps.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Timer controls:</strong> Install timers on immersion heaters, towel rails,
                and electric radiators. A programmable timer ensures these high-power loads only run
                when needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smart heating controls:</strong> Modern smart thermostats and zone controls
                can significantly reduce heating costs by only heating rooms that are occupied.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tariff review:</strong> Ensure the customer is on the right tariff for their
                consumption pattern. Economy 7 is only cost-effective if most heating is done
                overnight.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/training/18th-edition">training courses</SEOInternalLink> cover
          energy efficiency guidance and the relevant{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671 requirements
          </SEOInternalLink>{' '}
          for new installations, helping you advise customers with confidence.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HighElectricityBillPage() {
  return (
    <GuideTemplate
      title="High Electricity Bill | Electrical Causes & Fixes"
      description="Unexpectedly high electricity bill? Expert guide to electrical causes including earth leakage, faulty immersion heater thermostats, storage heater problems, and meter issues. How an electrician investigates and fixes the fault."
      datePublished="2025-09-05"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting Guide"
      badgeIcon={PoundSterling}
      heroTitle={
        <>
          High Electricity Bill:{' '}
          <span className="text-yellow-400">Electrical Causes and How to Fix Them</span>
        </>
      }
      heroSubtitle="An unexpectedly high electricity bill is not always about leaving the lights on. Earth leakage, faulty thermostats, stuck immersion heaters, and storage heater problems can waste hundreds of pounds per year. This guide covers the electrical causes, how an electrician investigates, and the fixes."
      readingTime={10}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About High Electricity Bills"
      relatedPages={relatedPages}
      ctaHeading="Find Electrical Faults Faster with Elec-Mate"
      ctaSubheading="AI fault diagnosis, testing calculators, EICR certificates, and remedial quoting — all from your phone. Help customers find the cause of high bills and price the fix in a single visit. 7-day free trial."
    />
  );
}
