import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Lightbulb,
  Zap,
  Calculator,
  ShieldCheck,
  AlertTriangle,
  CircuitBoard,
  Wrench,
  FileCheck2,
  Home,
  Flame,
  ThermometerSun,
  Cable,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-installation' },
  { label: 'LED Downlights', href: '/guides/led-downlight-installation' },
];

const tocItems = [
  { id: 'led-downlight-basics', label: 'LED Downlight Basics' },
  { id: 'fire-rated-vs-non', label: 'Fire Rated vs Non-Fire Rated' },
  { id: 'ic-rating', label: 'IC Rating and Insulation Contact' },
  { id: 'thermal-protection', label: 'Thermal Protection Requirements' },
  { id: 'driver-compatibility', label: 'Driver Compatibility' },
  { id: 'dimming', label: 'Dimming LED Downlights' },
  { id: 'wiring-method', label: 'Wiring Method and Cable Sizing' },
  { id: 'building-regs', label: 'Building Regulations Compliance' },
  { id: 'common-mistakes', label: 'Common Installation Mistakes' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Fire-rated downlights must be used wherever the ceiling is a fire barrier between floors, between rooms and loft spaces, or between habitable rooms and garages — they maintain the fire integrity rating of the ceiling.',
  'IC-rated (Insulation Contact) downlights can be safely covered with loft insulation without risk of overheating, while non-IC downlights require a clearance zone around and above the fitting.',
  'LED drivers must be compatible with the specific LED module — mismatched drivers cause flickering, buzzing, premature failure, and in worst cases, overheating.',
  'Dimming LEDs requires a compatible LED dimmer switch, compatible LED driver, and a dimmable LED module — all three must be matched for flicker-free dimming.',
  "Elec-Mate's AI circuit designer can generate a complete lighting circuit layout with cable sizing, switch positions, and dimming circuit arrangements for any domestic or commercial project.",
];

const faqs = [
  {
    question: 'Do I need fire-rated downlights?',
    answer:
      "Yes, in most domestic installations. Fire-rated downlights are required wherever the ceiling forms part of a fire-resistant barrier. In a typical two-storey house, the first-floor ceiling separates the ground floor from the upper floor and is part of the fire compartmentation — any hole cut in this ceiling (for a downlight) must maintain the fire resistance rating. Under the Building Regulations (Approved Document B: Fire Safety), ceilings between floors, between rooms and loft spaces, and between habitable rooms and integral garages must maintain at least 30 minutes fire resistance. A standard (non-fire-rated) downlight creates a hole that compromises this rating. A fire-rated downlight includes an intumescent seal that expands in a fire, sealing the hole and maintaining the ceiling's fire resistance. Non-fire-rated downlights can be used in single-storey ceilings where there is no fire compartmentation requirement — for example, a ground-floor ceiling in a bungalow where the space above is only a cold loft.",
  },
  {
    question: 'What does IC rating mean for downlights?',
    answer:
      'IC stands for Insulation Contact. An IC-rated downlight is designed and tested to operate safely when directly covered with thermal insulation (such as loft insulation). The fitting has built-in thermal protection that prevents it from exceeding safe temperatures even when insulation restricts airflow around it. A non-IC-rated downlight must have a clearance zone — typically at least 200mm around the sides and above the fitting — to allow heat to dissipate. If loft insulation covers a non-IC-rated downlight, the trapped heat can cause the fitting to overheat, potentially damaging the LED driver, degrading the ceiling material, or in extreme cases, causing a fire. In lofts and ceilings where insulation is present or will be added, always specify IC-rated downlights. The Building Regulations (Approved Document L: Conservation of fuel and power) require insulation to be maintained around services — IC-rated downlights allow this without compromise.',
  },
  {
    question: 'Can I replace halogen downlights with LED?',
    answer:
      'Yes, and this is one of the most common domestic lighting upgrades. There are two approaches. First, retrofit LED lamps: replace the halogen lamp (bulb) with an LED equivalent that fits the same fitting. GU10 LED lamps are direct replacements for GU10 halogen lamps. MR16 LED lamps replace MR16 halogen lamps but may need a new LED-compatible transformer if the existing transformer is not compatible (many old electronic transformers have a minimum load requirement that LEDs do not meet). Second, complete fitting replacement: remove the old halogen downlight fitting and install a new integrated LED downlight. This is the preferred approach because it allows you to install fire-rated, IC-rated fittings with matched drivers and better performance. When replacing halogen downlights with LEDs, check that the existing dimmer switch (if fitted) is LED-compatible. Old leading-edge dimmers designed for halogen loads often cause LED lamps to flicker or buzz.',
  },
  {
    question: 'How many LED downlights can I put on one circuit?',
    answer:
      'A standard domestic lighting circuit using 1.0mm\u00B2 or 1.5mm\u00B2 cable on a 6A MCB can support a large number of LED downlights because each LED draws very little current (typically 5W to 10W per downlight, or about 0.02A to 0.04A at 230V). In theory, a 6A circuit could support over 100 LED downlights. In practice, the limiting factors are voltage drop on long cable runs, the number of fittings you can reasonably wire on a single circuit, and the principle of not concentrating too many fittings on one circuit (so that a circuit failure does not leave a large area in darkness). The IET On-Site Guide recommends a maximum of 12 lighting points per circuit as a general design guideline, though this is not a hard regulation limit. For larger installations, divide the fittings across multiple circuits for resilience.',
  },
  {
    question: 'Why do my LED downlights flicker when dimmed?',
    answer:
      "LED flickering during dimming is almost always caused by a compatibility issue between the dimmer switch and the LED driver. The most common cause is using an old leading-edge (triac) dimmer designed for halogen loads. Halogen lamps are purely resistive and work smoothly with leading-edge dimmers. LED drivers are electronic circuits that may not respond correctly to leading-edge dimming signals, particularly at low light levels. The solution is to install a trailing-edge LED dimmer switch specifically designed for LED loads. Check the dimmer manufacturer's compatibility list to confirm it works with your specific LED downlights. Some LED downlights also specify a minimum number of fittings per dimmer circuit to ensure stable dimming. If you have only one or two downlights on a dimmer, the total load may be below the dimmer's minimum load threshold, causing instability.",
  },
  {
    question: 'Do LED downlights need a fire hood?',
    answer:
      'If you are using a non-fire-rated downlight in a ceiling that requires fire resistance, you can use a fire hood (also called an intumescent cover or loft cap) to maintain the fire rating. The fire hood fits over the top of the downlight in the ceiling void and contains intumescent material that expands in a fire to seal the opening. However, fire hoods add cost and labour to the installation, and they can restrict airflow around non-IC-rated fittings, potentially causing overheating. The better solution for new installations is to use integrated fire-rated, IC-rated LED downlights that include the intumescent seal within the fitting itself. These are now widely available, competitively priced, and eliminate the need for separate fire hoods. Fire hoods are most commonly used when retrofitting LED lamps into existing non-fire-rated halogen downlight fittings where replacing the entire fitting is not practical.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/ai-circuit-designer',
    title: 'AI Circuit Designer',
    description:
      'Generate complete lighting circuit layouts with cable sizing, switch positions, and dimming arrangements.',
    icon: CircuitBoard,
    category: 'Tool',
  },
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate cable sizes for lighting circuits including LED loads with voltage drop verification.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/guides/radial-circuit-explained',
    title: 'Radial Circuit Explained',
    description:
      'How radial circuits work — all lighting circuits are radial circuits from the distribution board.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/guides/distribution-board-wiring',
    title: 'Distribution Board Wiring',
    description:
      'Consumer unit layout, circuit arrangement, and how lighting circuits fit into the overall board design.',
    icon: CircuitBoard,
    category: 'Guide',
  },
  {
    href: '/guides/part-p-building-regulations',
    title: 'Part P Building Regulations',
    description:
      'When LED downlight installations require Building Control notification in kitchens, bathrooms, and outdoors.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/guides/minor-works-certificate',
    title: 'Minor Works Certificate',
    description:
      'Issue a Minor Works Certificate for LED downlight replacements and additions to existing circuits.',
    icon: FileCheck2,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'led-downlight-basics',
    heading: 'LED Downlight Installation: What Every Electrician Needs to Know',
    content: (
      <>
        <p>
          LED downlights are the most commonly installed lighting fixture in UK domestic and
          commercial properties. They have almost entirely replaced halogen downlights due to their
          dramatically lower energy consumption (typically 5W to 10W versus 35W to 50W per fitting),
          longer lifespan (25,000 to 50,000 hours versus 2,000 hours for halogen), and reduced heat
          output.
        </p>
        <p>
          However, LED downlight installation involves several technical considerations that go
          beyond simply wiring a light. Fire rating, IC (Insulation Contact) rating, thermal
          protection, driver compatibility, and dimming compatibility all affect the choice of
          fitting and the installation method. Getting any of these wrong can result in premature
          failure, fire risk, or a failed{' '}
          <SEOInternalLink href="/guides/how-to-fill-in-eicr">EICR inspection</SEOInternalLink>.
        </p>
        <p>
          This guide covers the key decisions for every LED downlight installation — from selecting
          the right fitting to wiring, testing, and certification.
        </p>
      </>
    ),
  },
  {
    id: 'fire-rated-vs-non',
    heading: 'Fire Rated vs Non-Fire Rated Downlights',
    content: (
      <>
        <p>
          The most important decision when specifying LED downlights is whether fire-rated fittings
          are required. This is determined by the Building Regulations, not by{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink>{' '}
          (which covers the electrical installation) — but as the electrician installing the
          fittings, you are expected to know the requirements and advise the customer correctly.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire-rated downlights are required</strong> wherever the ceiling is a fire
                barrier: between floors in a multi-storey house, between a habitable room and a loft
                space, between a habitable room and an integral garage, in flats and apartments
                (where ceilings and floors form part of the fire compartmentation between
                dwellings), and in commercial premises where fire compartmentation is specified.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-fire-rated downlights are acceptable</strong> in ceilings that are not
                fire barriers: ground-floor ceilings in bungalows (with only a cold loft above),
                suspended ceilings in commercial spaces where the fire barrier is at slab level
                above the suspended ceiling, and external soffits.
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
            <p className="text-white text-sm leading-relaxed">
              <strong>Important:</strong> A fire-rated downlight typically provides 30, 60, or 90
              minutes of fire resistance. The fire rating of the downlight must match or exceed the
              fire resistance required for the ceiling element. In most domestic situations, 30
              minutes is adequate (matching the standard 30-minute fire resistance of a plasterboard
              ceiling). Check the specific requirements for flats, HMOs, and commercial properties.
            </p>
          </div>
        </div>
        <p>
          Fire-rated downlights contain an intumescent seal (or pad) that swells when exposed to
          high temperatures, sealing the hole cut in the ceiling and preventing fire and smoke from
          passing through. Non-fire-rated downlights have no such seal — the open hole compromises
          the ceiling's fire integrity.
        </p>
      </>
    ),
  },
  {
    id: 'ic-rating',
    heading: 'IC Rating: Insulation Contact Explained',
    content: (
      <>
        <p>
          IC rating (Insulation Contact) indicates that a downlight is designed to operate safely
          when directly covered by thermal insulation. This is critical in loft spaces where
          insulation is laid between and over ceiling joists.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">IC-Rated Downlight</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Can be covered with loft insulation</li>
              <li>Built-in thermal cut-out protection</li>
              <li>No clearance zone required above or around</li>
              <li>Insulation can be pushed right up to the fitting</li>
              <li>Maintains energy efficiency of the building envelope</li>
              <li>Required by Approved Document L in most situations</li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Non-IC-Rated Downlight</h3>
            <ul className="space-y-2 text-white text-sm leading-relaxed">
              <li>Must NOT be covered with insulation</li>
              <li>Requires 200mm+ clearance all around</li>
              <li>Creates cold spots in the insulation layer</li>
              <li>Suitable only where insulation is not present</li>
              <li>Cheaper but less practical for loft installations</li>
              <li>May fail Building Regulations energy requirements</li>
            </ul>
          </div>
        </div>
        <p>
          For new installations and refurbishments, always specify IC-rated downlights when the
          ceiling void contains or will contain thermal insulation. The Building Regulations
          (Approved Document L: Conservation of fuel and power) require insulation to be maintained
          continuously — gaps around non-IC-rated downlights create thermal bridges that reduce the
          building's energy performance.
        </p>
        <SEOAppBridge
          title="Design lighting circuits with the AI circuit designer"
          description="Elec-Mate's AI circuit designer generates complete lighting circuit layouts for any project. Specify the room dimensions, fitting positions, and switch requirements — the AI handles cable sizing, circuit allocation, and generates the full schedule."
          icon={CircuitBoard}
        />
      </>
    ),
  },
  {
    id: 'thermal-protection',
    heading: 'Thermal Protection Requirements',
    content: (
      <>
        <p>
          Even though LED downlights produce far less heat than halogen equivalents, thermal
          management remains important. LED drivers and LED chips have maximum operating
          temperatures, and exceeding these temperatures shortens the lifespan of the fitting and
          can cause premature failure.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal cut-out</strong> — most quality IC-rated LED downlights include a
                thermal cut-out (resettable fuse) that disconnects the fitting if the temperature
                exceeds a safe threshold. The fitting turns off automatically and turns back on when
                it cools down. This is a safety feature, not normal operation — if it triggers
                regularly, the installation conditions need attention.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ventilation</strong> — even IC-rated downlights benefit from some airflow.
                In sealed ceiling voids with no ventilation and high ambient temperatures (such as
                south-facing rooms in summer), multiple downlights can raise the void temperature
                significantly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ThermometerSun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable temperature</strong> — the heat from the downlight can affect the
                cable connected to it. Use heat-resistant flex (butyl rubber or silicone insulation)
                for the final connection between the supply cable and the downlight if the
                manufacturer specifies it. Standard PVC-insulated cable should not be in direct
                contact with hot surfaces.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'driver-compatibility',
    heading: 'LED Driver Compatibility',
    content: (
      <>
        <p>
          The LED driver is the electronic component that converts mains voltage (230V AC) to the
          low voltage DC required by the LED chip. Driver compatibility is one of the most common
          causes of LED downlight problems.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Integrated vs separate driver</strong> — modern LED downlights are available
                with an integrated driver (built into the fitting) or a separate driver (mounted in
                the ceiling void). Integrated driver fittings are simpler to install — the mains
                cable connects directly to the fitting. Separate driver fittings give more
                flexibility (the driver can be positioned away from the fitting) but require a
                matching driver to be specified.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Constant current vs constant voltage</strong> — LED downlights are typically
                constant-current devices. The driver must output the correct current (e.g., 350mA,
                500mA, 700mA) at the correct voltage for the LED module. Using a driver with the
                wrong current rating will damage the LED.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dimmable vs non-dimmable driver</strong> — if the downlight will be dimmed,
                the driver must be specifically rated as dimmable and must be compatible with the
                dimmer switch used. Not all dimmable drivers work with all dimmer switches.
              </span>
            </li>
          </ul>
        </div>
        <p>
          For the simplest and most reliable installations, use integrated-driver LED downlights
          from a reputable manufacturer. These fittings are designed and tested as a complete system
          — the driver is matched to the LED module at the factory, eliminating compatibility
          issues.
        </p>
      </>
    ),
  },
  {
    id: 'dimming',
    heading: 'Dimming LED Downlights',
    content: (
      <>
        <p>
          Dimming LED downlights requires all three components of the dimming system to be
          compatible: the dimmer switch, the LED driver, and the LED module.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Trailing-edge dimmer</strong> — the standard choice for LED dimming.
                Trailing-edge (also called ELV or electronic) dimmers work by controlling the
                falling edge of the AC waveform, which is smoother and quieter than leading-edge
                dimming. Most LED downlight manufacturers recommend trailing-edge dimmers.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Leading-edge dimmer</strong> — the traditional dimmer type used for halogen
                and incandescent lamps. Some LED downlights are compatible with leading-edge
                dimmers, but many are not — check the manufacturer's compatibility list. Leading-
                edge dimmers can cause flickering, buzzing, and reduced dimming range with LEDs.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Minimum and maximum load</strong> — LED dimmers have a minimum and maximum
                load rating. The total wattage of all LED downlights on the dimmer circuit must fall
                within this range. If you have only two 5W downlights (10W total) on a dimmer with a
                25W minimum load, the dimmer may not function correctly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>DALI and 0-10V dimming</strong> — for commercial installations, DALI
                (Digital Addressable Lighting Interface) and 0-10V dimming systems provide more
                precise control. These require compatible drivers and a DALI controller. They are
                overkill for domestic use but standard in offices, retail, and hospitality.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When quoting LED downlight installations with dimming, always specify the dimmer switch
          and confirm compatibility with the chosen downlight before ordering materials. Elec-Mate's{' '}
          <SEOInternalLink href="/tools/electrical-quoting-app">quoting app</SEOInternalLink> lets
          you build a detailed quote with specific fittings, switches, and cable quantities — so the
          customer knows exactly what they are getting.
        </p>
      </>
    ),
  },
  {
    id: 'wiring-method',
    heading: 'Wiring Method and Cable Sizing for LED Downlights',
    content: (
      <>
        <p>
          LED downlights are wired on standard domestic lighting circuits. The circuit design
          follows the same principles as any{' '}
          <SEOInternalLink href="/guides/radial-circuit-explained">
            radial lighting circuit
          </SEOInternalLink>
          .
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit cable</strong> — 1.0mm{'\u00B2'} or 1.5mm{'\u00B2'} twin and earth
                (6242Y), protected by a 6A MCB. The total load of LED downlights on a typical
                domestic circuit is well within the cable capacity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loop-in method</strong> — the supply cable loops from one downlight to the
                next. Each fitting has loop-in terminals for the incoming and outgoing supply. The
                switch wire runs from the switch to the first fitting on the switched circuit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Junction box method</strong> — junction boxes in the ceiling void distribute
                the supply to each fitting via individual cables. This is common when the downlight
                fittings do not have loop-in terminals.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Connector blocks</strong> — Wago-style connectors or plug-in connector
                systems are increasingly used to connect LED downlights. These provide quick,
                reliable, maintenance-free connections and are fully compliant with BS 7671 when
                installed correctly.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Check{' '}
          <SEOInternalLink href="/guides/voltage-drop-guide-bs7671">voltage drop</SEOInternalLink>{' '}
          on long lighting circuits. Although LED loads are small, very long cable runs can still
          exceed the 5% voltage drop limit, particularly on 1.0mm{'\u00B2'} cable in larger
          properties. If voltage drop is marginal, upgrade to 1.5mm{'\u00B2'} cable.
        </p>
      </>
    ),
  },
  {
    id: 'building-regs',
    heading: 'Building Regulations Compliance',
    content: (
      <>
        <p>LED downlight installations interact with several parts of the Building Regulations:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved Document B (Fire Safety)</strong> — requires fire-rated fittings in
                ceilings that form fire barriers. The fire rating of the fitting must match the
                required fire resistance of the ceiling element.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Approved Document L (Energy Efficiency)</strong> — requires lighting in new
                dwellings to achieve a minimum efficacy of 45 lumens per circuit watt. LED
                downlights easily exceed this requirement (typically 80 to 100+ lumens per watt).
                Also requires insulation to be maintained around services — IC-rated downlights
                facilitate this.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>
                  <SEOInternalLink href="/guides/part-p-building-regulations">
                    Approved Document P (Electrical Safety)
                  </SEOInternalLink>
                </strong>{' '}
                — new lighting circuits in kitchens, bathrooms, and outdoors are notifiable. Adding
                downlights to an existing circuit is generally not notifiable unless the work is in
                a special location (bathroom, outdoor) or involves the consumer unit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'common-mistakes',
    heading: 'Common LED Downlight Installation Mistakes',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Non-fire-rated downlights in fire-rated ceilings.</strong> The most serious
                mistake. Compromises the fire compartmentation of the building. May be identified
                during an EICR or Building Control inspection and will require replacement.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Covering non-IC-rated downlights with insulation.</strong> Traps heat around
                the fitting, risking overheating, premature failure, and potential fire. Always
                check the IC rating before laying or replacing loft insulation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Incompatible dimmer switch.</strong> Using a leading-edge halogen dimmer
                with LED downlights. Causes flickering, buzzing, and reduced lifespan. Always use a
                trailing-edge LED-compatible dimmer and check the manufacturer's compatibility list.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mismatched driver and LED module.</strong> Using a driver with the wrong
                current or voltage rating. Causes flickering, overdriving (shortening lifespan), or
                the LED not lighting at all. Always use the driver specified by the fitting
                manufacturer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No certification for new circuit work.</strong> Installing LED downlights on
                a new circuit in a bathroom without issuing an EIC and notifying Building Control.
                This is a Part P offence. A{' '}
                <SEOInternalLink href="/guides/minor-works-certificate">
                  Minor Works Certificate
                </SEOInternalLink>{' '}
                is appropriate for additions to existing circuits outside special locations.
              </span>
            </li>
          </ul>
        </div>
        <SEOAppBridge
          title="Quote LED downlight installations accurately"
          description="Elec-Mate's quoting app lets you build a detailed quote for LED downlight installations — fittings, dimmers, cable, labour, and margin. Send a professional quote to the customer from site."
          icon={Calculator}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function LEDDownlightGuidePage() {
  return (
    <GuideTemplate
      title="LED Downlight Installation | Fire Rating & IC Guide"
      description="Complete guide to LED downlight installation in the UK. Fire-rated vs non-fire-rated, IC rating for insulation contact, thermal protection, driver compatibility, dimming, wiring methods, and Building Regulations compliance."
      datePublished="2025-07-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          LED Downlight Installation:{' '}
          <span className="text-yellow-400">Fire Rating and IC Guide</span>
        </>
      }
      heroSubtitle="LED downlights are the most common lighting fixture in UK installations, but getting the specification wrong can compromise fire safety, cause premature failure, or create dimming problems. This guide covers fire-rated vs non-fire-rated, IC rating for insulation contact, driver compatibility, dimming, and the installation mistakes that catch electricians out."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About LED Downlight Installation"
      relatedPages={relatedPages}
      ctaHeading="Design Lighting Circuits with Elec-Mate"
      ctaSubheading="AI circuit designer, cable sizing calculator, and digital certificates on your phone. Quote LED downlight installations accurately and certify the work on site. 7-day free trial."
    />
  );
}
