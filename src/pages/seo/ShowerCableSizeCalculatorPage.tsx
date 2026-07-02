import ToolTemplate from '@/pages/seo/templates/ToolTemplate';
import CableSizingCalculator from '@/components/apprentice/calculators/CableSizingCalculator';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import {
  Calculator,
  Zap,
  Shield,
  Cable,
  Gauge,
  Droplets,
  ShowerHead,
  Activity,
  CheckCircle2,
  Timer,
  Flame,
} from 'lucide-react';

export default function ShowerCableSizeCalculatorPage() {
  return (
    <ToolTemplate
      title="Shower Cable Size Calculator: 8.5kW-10.5kW (BS 7671)"
      description="Free shower cable size calculator for 8.5kW, 9.5kW and 10.5kW electric showers. Work out current, cable size and MCB rating to BS 7671 in seconds."
      datePublished="2026-07-02"
      dateModified="2026-07-02"
      breadcrumbs={[
        { label: 'Tools', href: '/tools' },
        { label: 'Shower Cable Size Calculator', href: '/tools/shower-cable-size-calculator' },
      ]}
      tocItems={[
        { id: 'shower-circuit-loads', label: 'Electric Shower Loads' },
        { id: 'worked-example', label: 'Worked Example: 9.5kW' },
        { id: 'cable-size-selection', label: 'Choosing the Cable Size' },
        { id: 'protective-device', label: 'MCB, RCBO and RCD' },
        { id: 'voltage-drop', label: 'Voltage Drop on Shower Circuits' },
        { id: 'bathroom-requirements', label: 'Bathroom Requirements' },
        { id: 'how-to', label: 'Step-by-Step Guide' },
        { id: 'features', label: 'Features' },
        { id: 'faq', label: 'FAQs' },
        { id: 'related', label: 'Related Pages' },
      ]}
      badge="Shower Circuit Design"
      badgeIcon={ShowerHead}
      heroTitle={
        <>
          <span className="text-yellow-400">Shower Cable Size Calculator</span> — Size the Circuit
          for 8.5kW to 10.5kW Electric Showers
        </>
      }
      calculator={<CableSizingCalculator />}
      heroSubtitle="Enter the shower rating, run length, and installation method. The calculator works out the design current, recommends a cable size, checks voltage drop, and suggests the protective device rating — all to BS 7671. An electric shower is one of the highest-current fixed loads in a house, so the cable size matters."
      heroFeaturePills={[
        { icon: ShowerHead, label: '8.5kW-10.5kW Showers' },
        { icon: Cable, label: 'Cable Sizing' },
        { icon: Shield, label: 'RCD Protection' },
        { icon: Gauge, label: 'Voltage Drop Check' },
      ]}
      readingTime={10}
      keyTakeaways={[
        'A 9.5kW electric shower draws 41.3A at 230V (9500 / 230 = 41.3A) — more than a whole ring final circuit — so it always needs its own dedicated circuit.',
        '10mm² twin and earth is the typical choice for a 40-50A shower circuit on most domestic run lengths — always confirm against the tabulated current-carrying capacity for your installation method.',
        'Typical protective device ratings are 40A for an 8.5kW shower, 45A or 50A for 9.5kW, and 50A for 10.5kW — the device must be rated at or above the design current.',
        'Shower circuits in a room containing a bath or shower require 30mA RCD additional protection — BS 7671 Section 701 requires it for low voltage circuits serving the location.',
        'Voltage drop should not exceed 5% for a shower circuit (the BS 7671 limit for circuits other than lighting), which the calculator checks automatically from the run length.',
      ]}
      sections={[
        {
          id: 'shower-circuit-loads',
          heading: 'Electric Shower Loads: 8.5kW, 9.5kW and 10.5kW',
          content: (
            <>
              <p>
                Instantaneous electric showers heat water as it flows, which means the full
                electrical load is drawn the whole time the shower runs. There is no diversity to
                apply — the circuit must carry the full rated current continuously. That makes the
                shower circuit one of the most heavily loaded circuits in a domestic installation,
                and correct cable sizing is essential.
              </p>
              <p>
                The design current is simply the shower power divided by the nominal voltage
                (I = P / V at 230V single-phase):
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <ul className="space-y-2 text-white text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">8.5kW shower:</strong> 8500 / 230 ={' '}
                      <strong>37.0A</strong> — typically a 40A MCB or RCBO
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">9.5kW shower:</strong> 9500 / 230 ={' '}
                      <strong>41.3A</strong> — typically a 45A or 50A MCB or RCBO
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-yellow-400 mt-0.5 shrink-0" />
                    <span>
                      <strong className="text-yellow-400">10.5kW shower:</strong> 10500 / 230 ={' '}
                      <strong>45.7A</strong> — typically a 50A MCB or RCBO
                    </span>
                  </li>
                </ul>
              </div>
              <p>
                Because the load is continuous, the cable must have a current-carrying capacity (
                after any derating for installation method, insulation, grouping, and ambient
                temperature) at least equal to the protective device rating. The{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable sizing calculator
                </SEOInternalLink>{' '}
                embedded above applies these correction factors for you.
              </p>
            </>
          ),
          appBridge: {
            title: 'Size a Shower Circuit in Seconds',
            description:
              'Enter the shower kW rating or design current, the run length, and the installation method. The calculator recommends the cable size and checks voltage drop automatically.',
            icon: ShowerHead,
          },
        },
        {
          id: 'worked-example',
          heading: 'Worked Example: 9.5kW Shower on an 18m Run',
          content: (
            <>
              <p>
                Here is the full sizing calculation for the most common scenario — a 9.5kW shower
                fed from a consumer unit 18 metres away in 10mm² twin and earth cable:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
                <ol className="space-y-3 text-white text-sm list-decimal pl-5">
                  <li>
                    <strong className="text-yellow-400">Design current:</strong> I = P / V = 9500 /
                    230 = <strong>41.3A</strong>
                  </li>
                  <li>
                    <strong className="text-yellow-400">Protective device:</strong> the device
                    rating must be at least the design current — select a <strong>45A</strong> MCB
                    or RCBO (a 50A device is also acceptable if the cable is sized for it)
                  </li>
                  <li>
                    <strong className="text-yellow-400">Cable selection:</strong> the cable's
                    current-carrying capacity after correction factors must be at least the device
                    rating. 10mm² twin and earth is the typical choice for a 45A shower circuit
                    clipped direct or in most common installation methods — always confirm against
                    the tabulated capacity for your specific method
                  </li>
                  <li>
                    <strong className="text-yellow-400">Voltage drop:</strong> using the published
                    volt drop figure of approximately 4.4 mV/A/m for 10mm² copper cable: 41.3A x 18m
                    x 4.4 mV/A/m = 3,271mV = <strong>3.27V</strong>. As a percentage: 3.27 / 230 ={' '}
                    <strong>1.4%</strong> — comfortably within the 5% limit
                  </li>
                </ol>
              </div>
              <p>
                If the same shower were installed where the cable runs through insulation, the
                capacity of 10mm² can drop below the device rating and a larger cable or a
                different route becomes necessary. That is exactly the kind of case where the
                calculator earns its keep — change the installation method and watch the
                recommendation update.
              </p>
            </>
          ),
        },
        {
          id: 'cable-size-selection',
          heading: 'Choosing the Cable Size: Why 10mm² Is the Usual Answer',
          content: (
            <>
              <p>
                For most domestic shower circuits, 10mm² twin and earth is the default choice. It
                comfortably carries 40-50A in the common installation methods, it covers voltage
                drop on typical domestic run lengths, and it means the circuit will not need
                rewiring if the customer later upgrades from an 8.5kW to a 10.5kW shower.
              </p>
              <p>Cases where 10mm² is not automatically the answer:</p>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>
                  <strong>Cable surrounded by thermal insulation</strong> — capacity falls
                  substantially and a larger cable may be required. Check the derated capacity in
                  the calculator.
                </li>
                <li>
                  <strong>Short runs with an 8.5kW shower</strong> — 6mm² can be adequate for a 40A
                  circuit in favourable installation methods, but it leaves no headroom for a future
                  shower upgrade and fails quickly when derated. Many electricians fit 10mm²
                  regardless for exactly that reason.
                </li>
                <li>
                  <strong>Long runs</strong> — beyond roughly 30-35 metres, voltage drop starts to
                  govern even for 10mm², and 16mm² may be needed. The{' '}
                  <SEOInternalLink href="/tools/voltage-drop-calculator">
                    voltage drop calculator
                  </SEOInternalLink>{' '}
                  shows the maximum run length for each size.
                </li>
                <li>
                  <strong>Grouped circuits</strong> — where the shower cable is bunched with other
                  loaded cables, grouping factors reduce its capacity.
                </li>
              </ul>
              <p>
                The embedded calculator applies the correction factors and voltage drop check in
                one pass, so the recommendation is based on your actual installation conditions
                rather than a rule of thumb.
              </p>
            </>
          ),
        },
        {
          id: 'protective-device',
          heading: 'MCB, RCBO and RCD Protection for Shower Circuits',
          content: (
            <>
              <p>
                The protective device for a shower circuit must be rated at or above the design
                current, and the cable must be sized to carry at least the device rating. Typical
                pairings are:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <ul className="space-y-2 text-white text-sm">
                  <li>
                    <strong className="text-yellow-400">8.5kW (37.0A):</strong> 40A device
                  </li>
                  <li>
                    <strong className="text-yellow-400">9.5kW (41.3A):</strong> 45A or 50A device
                  </li>
                  <li>
                    <strong className="text-yellow-400">10.5kW (45.7A):</strong> 50A device
                  </li>
                </ul>
              </div>
              <p>
                RCD protection is not optional. BS 7671 Section 701 (locations containing a bath or
                shower) requires additional protection by 30mA RCD for low voltage circuits serving
                the location — which includes the shower circuit itself. In a modern installation
                the cleanest solution is a dedicated 30mA RCBO for the shower, which combines
                overcurrent and RCD protection in one device and avoids the shower tripping a
                shared RCD that also feeds other circuits.
              </p>
              <p>
                Disconnection times also need verifying — the earth fault loop impedance at the
                shower must be low enough for the device to disconnect within the required time.
                The{' '}
                <SEOInternalLink href="/tools/disconnection-time-calculator">
                  disconnection time calculator
                </SEOInternalLink>{' '}
                covers that check.
              </p>
            </>
          ),
        },
        {
          id: 'voltage-drop',
          heading: 'Voltage Drop on Shower Circuits',
          content: (
            <>
              <p>
                BS 7671 limits voltage drop to 3% for lighting and 5% for other circuits (Appendix
                4), measured from the origin of the installation to the load. For a shower circuit
                at 230V, 5% is 11.5V.
              </p>
              <p>
                Voltage drop is calculated as the tabulated mV/A/m value for the cable, multiplied
                by the design current and the run length. Because shower currents are high, voltage
                drop builds quickly with distance:
              </p>
              <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-5 my-4">
                <ul className="space-y-2 text-white text-sm">
                  <li>
                    <strong className="text-yellow-400">10mm² at 41.3A, 18m:</strong> 41.3 x 18 x
                    4.4 mV/A/m = 3.27V = 1.4% — fine
                  </li>
                  <li>
                    <strong className="text-yellow-400">10mm² at 41.3A, 35m:</strong> 41.3 x 35 x
                    4.4 mV/A/m = 6.36V = 2.8% — still fine
                  </li>
                  <li>
                    <strong className="text-yellow-400">6mm² at 37.0A, 25m:</strong> 37.0 x 25 x 7.3
                    mV/A/m = 6.75V = 2.9% — passes on volt drop, but check the derated
                    current-carrying capacity carefully at this size
                  </li>
                </ul>
              </div>
              <p>
                The figures of 7.3 mV/A/m (6mm²) and 4.4 mV/A/m (10mm²) are the widely published
                values for copper twin and earth — the calculator uses the tabulated values for
                your selected cable type automatically. A shower running at reduced voltage heats
                water noticeably less well, so voltage drop is a performance issue as well as a
                compliance one.
              </p>
            </>
          ),
        },
        {
          id: 'bathroom-requirements',
          heading: 'Bathroom Requirements: Section 701',
          content: (
            <>
              <p>
                Rooms containing a bath or shower are covered by Section 701 of BS 7671, which adds
                requirements on top of the general rules. The ones that matter most for a shower
                installation:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-white">
                <li>
                  <strong>30mA RCD additional protection</strong> for low voltage circuits serving
                  the location — the shower circuit must have it.
                </li>
                <li>
                  <strong>Zoning</strong> — the space around the bath or shower is divided into
                  zones that restrict what equipment may be installed and what IP rating it needs.
                  The shower unit itself is designed for this, but pull-cord switches and isolators
                  must be positioned appropriately.
                </li>
                <li>
                  <strong>Local isolation</strong> — accepted practice is a double-pole isolating
                  switch (typically a ceiling-mounted pull cord) so the shower can be isolated for
                  maintenance without going to the consumer unit.
                </li>
              </ul>
              <p>
                Once the installation is complete, the circuit details, test results, and RCD
                operation are recorded on the certificate. Elec-Mate handles the whole flow — size
                the circuit here, then complete the certification in the app. If you are adding a
                shower circuit to an existing board, check the effect on maximum demand with the{' '}
                <SEOInternalLink href="/tools/max-demand-calculator">
                  maximum demand calculator
                </SEOInternalLink>
                .
              </p>
            </>
          ),
        },
      ]}
      howToSteps={[
        {
          name: 'Find the shower rating',
          text: 'Check the shower unit rating plate or specification — common ratings are 8.5kW, 9.5kW, and 10.5kW. If the customer may upgrade later, size for the larger shower now.',
        },
        {
          name: 'Calculate the design current',
          text: 'Divide the power by the voltage: a 9.5kW shower at 230V draws 9500 / 230 = 41.3A. The calculator does this automatically from the kW rating.',
        },
        {
          name: 'Select the protective device',
          text: 'Choose an MCB or RCBO rated at or above the design current: 40A for 8.5kW, 45A or 50A for 9.5kW, 50A for 10.5kW. Use a 30mA RCBO to provide the required RCD protection.',
        },
        {
          name: 'Size the cable',
          text: 'Enter the run length and installation method. The cable capacity after correction factors must be at least the device rating — 10mm² twin and earth is the typical result for domestic runs.',
        },
        {
          name: 'Check voltage drop and disconnection',
          text: 'Verify voltage drop is within 5% and the earth fault loop impedance allows the device to disconnect in time. The calculator flags both checks.',
        },
      ]}
      howToHeading="How to Size a Shower Cable"
      howToDescription="Five steps from shower rating to a fully verified circuit design."
      features={[
        {
          icon: ShowerHead,
          title: 'Shower Presets',
          description:
            'Work from the shower kW rating directly — the calculator converts to design current and sizes the circuit from there.',
        },
        {
          icon: Cable,
          title: 'Correction Factors Applied',
          description:
            'Installation method, thermal insulation, grouping, and ambient temperature deratings applied automatically to the cable capacity.',
        },
        {
          icon: Gauge,
          title: 'Voltage Drop Check',
          description:
            'Checks the run against the 5% BS 7671 limit using tabulated mV/A/m values and flags when a larger cable is needed.',
        },
        {
          icon: Shield,
          title: 'Protective Device Guidance',
          description:
            'Recommends the MCB or RCBO rating for the design current and reminds you of the 30mA RCD requirement in bathrooms.',
        },
        {
          icon: Calculator,
          title: '70+ Calculators in One App',
          description:
            'Cable sizing, voltage drop, adiabatic, maximum demand, and earth fault loop impedance — everything for circuit design.',
        },
        {
          icon: Timer,
          title: 'From Calculation to Certificate',
          description:
            'Carry the circuit design into an EIC or Minor Works certificate in Elec-Mate without re-entering the details.',
        },
      ]}
      featuresHeading="Shower Cable Calculator Features"
      featuresSubheading="Size the circuit, check the volt drop, pick the device — one tool."
      faqs={[
        {
          question: 'What size cable do I need for a 9.5kW shower?',
          answer:
            'A 9.5kW shower draws 41.3A at 230V (9500 / 230), so the circuit is typically protected by a 45A or 50A MCB or RCBO and wired in 10mm² twin and earth. 10mm² is the typical choice because it carries 40-50A in most common installation methods and covers voltage drop on normal domestic run lengths — but always confirm against the tabulated current-carrying capacity for your installation method, especially if the cable passes through insulation or is grouped with other circuits.',
        },
        {
          question: 'Can I use 6mm² cable for an electric shower?',
          answer:
            '6mm² can be adequate for a smaller 7.5kW-8.5kW shower (up to about 37A) on a short run in a favourable installation method — but it is marginal. Its capacity falls below 40A quickly once derating for insulation or grouping applies, and it leaves no headroom for the very common scenario of the customer later fitting a 9.5kW or 10.5kW shower. Most electricians install 10mm² for all new shower circuits for that reason. Use the calculator to check the derated capacity for your actual installation conditions.',
        },
        {
          question: 'What size MCB does a 10.5kW shower need?',
          answer:
            'A 10.5kW shower draws 45.7A at 230V (10500 / 230 = 45.7A), so it needs a 50A protective device. The cable must then have a current-carrying capacity of at least 50A after correction factors — 10mm² achieves this in most common domestic installation methods, but check the derated figure for your route. A 30mA RCBO is the usual choice as it provides the RCD protection required for circuits serving a room containing a bath or shower.',
        },
        {
          question: 'Does a shower circuit need RCD protection?',
          answer:
            'Yes. BS 7671 Section 701 requires additional protection by 30mA RCD for low voltage circuits serving a location containing a bath or shower — that includes the shower circuit. The cleanest way to provide it is a dedicated 30mA RCBO on the shower circuit, which avoids nuisance tripping of other circuits sharing an RCD and keeps the shower independently protected.',
        },
        {
          question: 'Does an electric shower need its own circuit?',
          answer:
            'Yes. An electric shower draws 37-46A continuously while running — more than an entire ring final circuit is designed to supply. It must be a dedicated radial circuit from the consumer unit with its own protective device, an appropriate isolator (typically a ceiling pull-cord switch), and cable sized for the full load with no diversity applied.',
        },
        {
          question: 'How far can a shower cable run before voltage drop is a problem?',
          answer:
            'For a 9.5kW shower (41.3A) in 10mm² cable at approximately 4.4 mV/A/m, the 5% voltage drop limit (11.5V at 230V) is reached at roughly 63 metres — so voltage drop rarely governs on typical domestic runs of 10-25 metres. For 6mm² cable at approximately 7.3 mV/A/m with an 8.5kW shower (37A), the limit arrives around 42 metres, but current-carrying capacity will usually rule out 6mm² well before that. The calculator checks both limits together.',
        },
      ]}
      relatedPages={[
        {
          href: '/tools/cable-sizing-calculator',
          title: 'Cable Sizing Calculator',
          description:
            'The full BS 7671 cable sizing tool with all installation methods and correction factors.',
          icon: Cable,
          category: 'Calculators',
        },
        {
          href: '/tools/voltage-drop-calculator',
          title: 'Voltage Drop Calculator',
          description: 'Check any circuit against the 3% and 5% BS 7671 voltage drop limits.',
          icon: Gauge,
          category: 'Calculators',
        },
        {
          href: '/tools/cooker-circuit-calculator',
          title: 'Cooker Circuit Calculator',
          description:
            'Size a cooker circuit with the standard diversity allowance for cooking appliances.',
          icon: Flame,
          category: 'Calculators',
        },
        {
          href: '/tools/disconnection-time-calculator',
          title: 'Disconnection Time Calculator',
          description:
            'Verify the earth fault loop impedance meets the required disconnection time.',
          icon: Timer,
          category: 'Calculators',
        },
        {
          href: '/tools/hot-tub-electrical-calculator',
          title: 'Hot Tub Electrical Calculator',
          description: 'Plan a 13A plug-in or 32A hardwired hot tub supply with RCD protection.',
          icon: Droplets,
          category: 'Calculators',
        },
        {
          href: '/tools/max-demand-calculator',
          title: 'Maximum Demand Calculator',
          description:
            'Check the whole-installation demand before adding a high-current shower circuit.',
          icon: Activity,
          category: 'Calculators',
        },
      ]}
      ctaHeading="Size shower circuits with confidence"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, voltage drop, and certification. 7-day free trial, cancel anytime."
      toolPath="/tools/shower-cable-size-calculator"
    />
  );
}
