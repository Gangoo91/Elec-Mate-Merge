import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  AlertTriangle,
  Zap,
  Search,
  Calculator,
  ClipboardCheck,
  GraduationCap,
  FileCheck2,
  ShieldCheck,
  Brain,
  Activity,
  Thermometer,
  Power,
  PlusCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Troubleshooting', href: '/guides' },
  { label: 'Overloaded Circuit', href: '/guides/overloaded-circuit-signs' },
];

const tocItems = [
  { id: 'what-is-overloaded-circuit', label: 'What Is an Overloaded Circuit?' },
  { id: 'signs-of-overload', label: 'Signs of an Overloaded Circuit' },
  { id: 'maximum-demand', label: 'Maximum Demand Calculation' },
  { id: 'mcb-tripping', label: 'MCB Tripping Due to Overload' },
  { id: 'dangers', label: 'Dangers of Overloading' },
  { id: 'diversity', label: 'Understanding Diversity' },
  { id: 'adding-new-circuits', label: 'Adding New Circuits' },
  { id: 'prevention', label: 'Preventing Circuit Overload' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'An overloaded circuit occurs when the current drawn by connected appliances exceeds the cable current-carrying capacity or the protective device rating — risking overheating, insulation damage, and fire.',
  'Common signs include frequent MCB tripping under normal use, warm or hot socket faceplates, burning smells from sockets or the consumer unit, and lights dimming when appliances are switched on.',
  'Maximum demand calculation is essential when assessing whether a circuit is overloaded — it accounts for the total connected load and applies diversity factors based on BS 7671 guidance.',
  'The correct solution for a genuinely overloaded circuit is to add new circuits, not to uprate the MCB — fitting a higher-rated MCB without upgrading the cable creates a fire risk.',
  "Elec-Mate's maximum demand calculator and AI fault diagnosis tool help electricians assess circuit loading, identify overloaded circuits, and plan additional circuits for the customer.",
];

const faqs = [
  {
    question: 'What are the signs of an overloaded electrical circuit?',
    answer:
      'The most common signs of an overloaded circuit are: the MCB (miniature circuit breaker) for that circuit trips repeatedly during normal use — not during a fault, but when you switch on certain appliances; socket faceplates feel warm or hot to the touch; you can smell a burning plastic smell from sockets or the consumer unit; lights on the same circuit dim noticeably when a high-power appliance is switched on (such as a kettle, toaster, or heater); and extension leads or multi-socket adaptors feel warm. If the circuit is severely overloaded and the MCB does not trip promptly (for example, if it is a slow-blow type or the wrong rating), the cable insulation can begin to degrade, leading to a potential fire. Any of these signs should prompt immediate investigation.',
  },
  {
    question: 'Can I just replace the MCB with a higher-rated one?',
    answer:
      'No — this is one of the most dangerous things you can do. The MCB is sized to protect the cable, not the appliances. A 32A MCB on a ring circuit protects 2.5mm² cable. A 20A MCB on a radial circuit protects 2.5mm² cable. A 6A or 10A MCB on a lighting circuit protects 1.0mm² or 1.5mm² cable. If you replace a 20A MCB with a 32A MCB without also upgrading the cable, the MCB will not trip until the current reaches 32A — but the 2.5mm² radial cable may be rated for only 20 to 27A depending on the installation method. The cable will overheat, the insulation will degrade, and a fire can result. The correct solution for an overloaded circuit is always to reduce the load (by moving appliances to other circuits) or to add new circuits with appropriately sized cable and MCBs.',
  },
  {
    question: 'How do I calculate maximum demand for a circuit?',
    answer:
      "Maximum demand is the total current that the connected loads can draw simultaneously, adjusted for diversity (the fact that not all loads operate at the same time). For a simple calculation: add up the wattage of all appliances that could be connected to the circuit. Divide by the voltage (230V) to get the total current in amps. For example, a ring circuit with a kettle (3kW, 13A), a toaster (1kW, 4.3A), a microwave (1.2kW, 5.2A), and a washing machine (2.2kW, 9.6A) has a total connected load of 7.4kW (32.1A). However, in practice, you would not run all of these simultaneously. BS 7671 Appendix 1 and IET Guidance Note 1 provide diversity factors that reduce the calculated demand to reflect realistic usage. For domestic socket circuits, typical diversity allows for the first 10A at 100% and the remainder at 50%. Always use Elec-Mate's maximum demand calculator to get an accurate figure.",
  },
  {
    question: 'How much load can a ring circuit handle?',
    answer:
      'A standard domestic ring circuit uses 2.5mm² cable protected by a 32A MCB. The MCB allows up to 32A of continuous current, which equates to approximately 7.36kW at 230V. However, this does not mean you can draw 32A from a single socket — each BS 1363 socket outlet is rated at 13A (3kW). The ring arrangement shares the load between the two legs of the ring, so no single section of cable should carry more than approximately 20A under normal balanced loading. If the ring has spurs, the spur cable (also 2.5mm²) is limited by the 13A rating of the fused plug or fused connection unit protecting it. In practice, a well-designed ring circuit serving a typical room rarely exceeds 15 to 20A total demand with diversity applied. If you consistently need more, it is time to add a second circuit.',
  },
  {
    question: 'What is the difference between overload and short circuit?',
    answer:
      'An overload and a short circuit are different types of overcurrent, and MCBs are designed to protect against both. An overload is a current that exceeds the rated value of the circuit but is still within the general range — for example, 40A on a 32A circuit. Overloads develop relatively slowly as appliances are switched on, and the MCB trips after a delay (the thermal element in the MCB heats up gradually). A short circuit is a much larger current caused by a direct connection between live and neutral (or live and earth) — for example, 3,000A on a 32A circuit. Short circuits occur instantly (a cable is cut, a fault develops) and the MCB trips immediately via the magnetic element. The tripping characteristics are defined by the MCB type (Type B, C, or D) — Type B MCBs trip magnetically at 3 to 5 times rated current, Type C at 5 to 10 times, and Type D at 10 to 20 times.',
  },
  {
    question: 'When should I add a new circuit instead of using the existing one?',
    answer:
      'You should add a new circuit when any of the following apply: the existing circuit MCB trips during normal use (indicating the load exceeds the circuit capacity); you are adding a new high-power fixed appliance (electric shower, cooker, EV charger, heat pump) that requires its own dedicated circuit; maximum demand calculation shows the existing circuit is at or near its rated capacity; you need to install sockets in a new room or extension; the existing circuit is a radial that serves too large an area or too many outlets; or Part P of the Building Regulations requires it (for example, new circuits in kitchens and bathrooms). Adding a new circuit requires a new MCB (or RCBO) in the consumer unit, new cable of the correct size, and an Electrical Installation Certificate or Minor Works Certificate for the work. If there is no spare way in the consumer unit, a new board or a way-extension may be needed.',
  },
  {
    question: 'Does an electric heater overload a socket circuit?',
    answer:
      'It depends on the heater rating and what else is connected. A typical portable electric heater draws between 1kW (4.3A) and 3kW (13A). A 3kW heater on its own uses the full 13A rating of the socket — there is no capacity left for anything else on that socket. If the heater is on a ring circuit and is the only high-power appliance running, the circuit can handle it. But if you add a kettle (13A) and a toaster (4-5A) on the same ring, the total demand exceeds 30A — close to the 32A MCB rating. Fan heaters are particularly problematic because they are often plugged in during cold weather, exactly when other high-power appliances (tumble dryers, electric blankets) are also in use. If a customer reports MCB tripping in winter, portable heaters are often the culprit.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/burning-smell-from-socket',
    title: 'Burning Smell from Socket',
    description:
      'Loose connections, arcing, and overheated terminals — causes, dangers, and emergency actions.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/guides/ring-circuit-fault-finding',
    title: 'Ring Circuit Fault Finding',
    description:
      'Step-by-step guide to finding open rings, bridged rings, and interconnected ring faults.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/intermittent-electrical-faults',
    title: 'Intermittent Electrical Faults',
    description:
      'Systematic approach to finding temperature-dependent, vibration, and loose connection faults.',
    icon: Activity,
    category: 'Guide',
  },
  {
    href: '/tools/calculators/max-demand',
    title: 'Maximum Demand Calculator',
    description:
      'Calculate the maximum demand for an installation with BS 7671 diversity factors applied.',
    icon: Calculator,
    category: 'Tool',
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
    id: 'what-is-overloaded-circuit',
    heading: 'What Is an Overloaded Circuit?',
    content: (
      <>
        <p>
          An overloaded circuit occurs when the total current drawn by the appliances connected to a
          circuit exceeds the current-carrying capacity of the cable or the rating of the protective
          device (MCB or fuse). The excess current generates heat in the cable — beyond what the
          insulation is designed to withstand.
        </p>
        <p>
          Every cable has a maximum current-carrying capacity (Iz) determined by the conductor size,
          insulation type, installation method, ambient temperature, and grouping with other cables.
          The protective device (MCB) must be rated at or below the cable's current-carrying
          capacity to ensure it trips before the cable overheats. When the current exceeds the MCB
          rating, the MCB should trip and disconnect the circuit.
        </p>
        <p>
          Problems arise when the overload is sustained but not quite high enough to trip the MCB
          quickly. An MCB is designed to carry its rated current continuously without tripping. At
          1.13 times the rated current (for example, 36A on a 32A MCB), it may take over an hour to
          trip. At 1.45 times the rated current (46A on a 32A MCB), it should trip within the
          specified time — but that could still be several minutes of overheating. During this
          period, the cable temperature rises, and repeated overloading degrades the insulation over
          time.
        </p>
        <p>
          Understanding maximum demand and{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">BS 7671</SEOInternalLink> cable
          sizing requirements is essential for diagnosing and preventing circuit overload.
          Elec-Mate's{' '}
          <SEOInternalLink href="/tools/calculators/max-demand">
            maximum demand calculator
          </SEOInternalLink>{' '}
          helps you assess whether a circuit is properly sized for its load.
        </p>
      </>
    ),
  },
  {
    id: 'signs-of-overload',
    heading: 'Signs of an Overloaded Circuit',
    content: (
      <>
        <p>
          Recognising the signs of an overloaded circuit early can prevent damage, fire, and costly
          repairs:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Frequent MCB tripping:</strong> The MCB for the circuit trips repeatedly
                during normal use — when you switch on certain appliances or when multiple
                appliances are running simultaneously. This is the MCB doing its job, but it
                indicates the circuit cannot handle the load.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warm socket faceplates:</strong> Socket outlets that feel warm to the touch
                indicate that current flowing through the connections is generating heat. A hot
                faceplate is a more serious sign — see{' '}
                <SEOInternalLink href="/guides/burning-smell-from-socket">
                  burning smell from socket
                </SEOInternalLink>{' '}
                for emergency actions.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Burning smell:</strong> A burning plastic smell from sockets, the consumer
                unit, or the wall indicates that insulation is being damaged by heat. This is a
                serious sign that requires immediate isolation and investigation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lights dimming under load:</strong> If lights on the same circuit (or even
                on different circuits sharing the same supply) dim when a high-power appliance is
                switched on, the total load may be exceeding the installation's capacity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Thermometer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Warm extension leads or adaptors:</strong> If the cable of an extension lead
                feels warm, the current through it is higher than ideal. Extension leads should be
                fully unwound when in use to allow heat to dissipate.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If a customer reports any of these symptoms, an electrician should measure the actual load
          on the circuit using a clamp meter, compare it with the MCB rating and cable
          current-carrying capacity, and advise on the appropriate remedy — which is usually either
          redistributing the load or adding new circuits.
        </p>
      </>
    ),
  },
  {
    id: 'maximum-demand',
    heading: 'Maximum Demand Calculation',
    content: (
      <>
        <p>
          Maximum demand is the maximum current that a circuit or installation is expected to draw
          under normal operating conditions. Calculating maximum demand correctly is essential for
          determining whether a circuit is adequately sized and whether it is genuinely overloaded.
        </p>
        <p>
          The basic calculation is straightforward: add up the power ratings (in watts) of all
          appliances that could be connected to the circuit, then divide by the voltage (230V) to
          get the current in amps. However, this gives the "total connected load" — the theoretical
          maximum if everything runs at full power simultaneously.
        </p>
        <p>
          In practice, not all appliances run at the same time. This is where diversity comes in — a
          set of factors that reduce the calculated demand to reflect realistic usage patterns. BS
          7671 (Table 3 of the On-Site Guide) and IET Guidance Note 1 provide standard diversity
          factors for different types of circuit and load.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-6 my-4">
          <h4 className="font-bold text-white text-base mb-3">
            Example maximum demand calculation
          </h4>
          <div className="space-y-3 text-white text-sm">
            <p>A ring circuit serves a kitchen with the following connected appliances:</p>
            <ul className="space-y-2 list-disc list-inside">
              <li>Kettle: 3,000W (13.0A)</li>
              <li>Microwave: 1,200W (5.2A)</li>
              <li>Toaster: 1,000W (4.3A)</li>
              <li>Dishwasher: 2,200W (9.6A)</li>
              <li>Fridge: 150W (0.7A)</li>
              <li>Various small appliances: 500W (2.2A)</li>
            </ul>
            <p>
              <strong>Total connected load:</strong> 8,050W (35.0A)
            </p>
            <p>
              <strong>With diversity (first 10A at 100%, remainder at 50%):</strong> 10A + (25A x
              0.5) = 22.5A
            </p>
            <p>
              This is within the 32A MCB rating, so the ring circuit is adequate for this kitchen —
              provided not all appliances are used simultaneously at full load.
            </p>
          </div>
        </div>
        <SEOAppBridge
          title="Calculate maximum demand instantly"
          description="Elec-Mate's maximum demand calculator applies BS 7671 diversity factors automatically. Enter the connected loads and get an instant assessment of whether the circuit is adequately sized. Perfect for site surveys and quotations."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'mcb-tripping',
    heading: 'MCB Tripping Due to Overload',
    content: (
      <>
        <p>
          When an MCB trips due to overload (as opposed to a short circuit or earth fault), it is
          the thermal element within the MCB that responds. The thermal element is a bimetallic
          strip that bends when heated by the current flowing through it. When the current exceeds
          the MCB's rated value, the strip bends far enough to release the trip mechanism.
        </p>
        <p>
          The key characteristic of thermal tripping is that it is time-dependent — the higher the
          overload, the faster the trip:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Power className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>At 1.0 x In (rated current):</strong> The MCB should not trip. It is
                designed to carry its rated current continuously.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Power className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>At 1.13 x In (conventional non-tripping current):</strong> The MCB should
                not trip within 1 hour. For a 32A MCB, this means 36A for up to an hour without
                tripping.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Power className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>At 1.45 x In (conventional tripping current):</strong> The MCB should trip
                within 1 hour. For a 32A MCB, 46A should cause a trip within an hour (often much
                sooner).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Power className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>At 2.55 x In or higher:</strong> The magnetic element trips the MCB
                instantaneously (within milliseconds). For a Type B 32A MCB, this means 96 to 160A
                trips instantly — this level of current indicates a short circuit, not an overload.
              </span>
            </li>
          </ul>
        </div>
        <p>
          If a customer reports that their MCB trips after a few minutes of running certain
          appliances, this is consistent with a thermal (overload) trip. If the MCB trips instantly
          when an appliance is switched on, it is more likely a short circuit or earth fault in the
          appliance or the wiring.
        </p>
        <p>
          Never replace an MCB with a higher rating to "fix" the tripping — this removes the cable
          protection and creates a fire risk. Instead, investigate the cause of the overload and add
          additional circuits if needed.
        </p>
      </>
    ),
  },
  {
    id: 'dangers',
    heading: 'Dangers of Overloading a Circuit',
    content: (
      <>
        <p>
          Circuit overloading is a leading cause of electrical fires in the UK. When current exceeds
          the cable's capacity, the consequences escalate progressively:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Insulation degradation:</strong> PVC cable insulation is rated for a maximum
                conductor temperature of 70 degrees C. Sustained overloading raises the temperature
                above this limit, causing the PVC to become brittle, crack, and eventually break
                down. This reduces the insulation resistance and can lead to earth faults or short
                circuits.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Terminal overheating:</strong> At connection points (terminals, connectors,
                junction boxes), the increased current generates more heat. Even properly tightened
                terminals will run hotter under overload. Loose terminals under overload conditions
                can reach temperatures that ignite surrounding materials.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fire in concealed spaces:</strong> Cables run through walls, under floors,
                and in loft spaces are surrounded by insulation, timber, and other combustible
                materials. An overheated cable in a concealed space can start a fire that is not
                detected until it has spread significantly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reduced cable life:</strong> Even if overloading does not cause an immediate
                fire, repeated thermal cycling (heating and cooling) accelerates insulation ageing.
                A cable designed to last 25 to 30 years may fail in 10 to 15 years if regularly
                overloaded.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The EICR should record any evidence of overloading as a C2 (Potentially Dangerous) defect
          if the cable current-carrying capacity is being exceeded, or C3 (Improvement Recommended)
          if the circuit is close to its limit and likely to be overloaded as more appliances are
          added. Elec-Mate's{' '}
          <SEOInternalLink href="/guides/eicr-observation-codes-explained">
            defect code AI
          </SEOInternalLink>{' '}
          helps classify the severity correctly.
        </p>
      </>
    ),
  },
  {
    id: 'diversity',
    heading: 'Understanding Diversity',
    content: (
      <>
        <p>
          Diversity is the principle that not all connected loads operate simultaneously at full
          capacity. Without diversity, every circuit and every supply would need to be sized for the
          absolute maximum — which would be vastly over-engineered and prohibitively expensive.
        </p>
        <p>
          BS 7671 and the IET On-Site Guide (Table 3) provide diversity factors for different types
          of circuit:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting circuits:</strong> 66% of the total connected load. A 1,200W
                lighting circuit has a diverse demand of 800W (3.5A).
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Socket outlet circuits (domestic):</strong> 100% of the first 10A, plus 50%
                of the remainder. This reflects the fact that you rarely use all sockets at full
                capacity simultaneously.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cooking appliances:</strong> 10A plus 30% of the remaining connected load
                plus 5A for a socket outlet in a cooker control unit.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Electric shower:</strong> 100% — no diversity is applied because the shower
                draws its full rated current whenever it is in use.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Calculator className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>EV charger:</strong> Typically 100% — the charger draws its full rated
                current for extended periods during charging.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Diversity is applied to calculate the maximum demand of the whole installation (to size
          the main supply) and can also inform individual circuit sizing. However, diversity should
          be applied with caution — if there is any doubt, err on the side of higher demand. The
          consequences of undersizing are far worse than the cost of slight oversizing.
        </p>
      </>
    ),
  },
  {
    id: 'adding-new-circuits',
    heading: 'Adding New Circuits: The Correct Solution',
    content: (
      <>
        <p>
          When a circuit is genuinely overloaded, the correct solution is almost always to add one
          or more new circuits to redistribute the load:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <PlusCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dedicated circuits for high-power appliances:</strong> Electric showers,
                cookers, EV chargers, and heat pumps should each have their own dedicated circuit
                with appropriately sized cable and MCB. They should never share a circuit with
                general socket outlets.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PlusCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Split overloaded ring circuits:</strong> If a single ring circuit serves too
                many outlets (for example, the entire ground floor of a large house), consider
                splitting it into two ring circuits — one for the kitchen and one for the living
                areas.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PlusCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Additional radial circuits:</strong> For areas with high demand (home
                offices, workshops, utility rooms), adding a 20A radial circuit provides dedicated
                capacity without modifying the existing ring.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <PlusCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Consumer unit upgrade:</strong> If there are no spare ways in the consumer
                unit, a larger board may be needed. This is an opportunity to bring the installation
                up to current standards — fitting RCBOs, ensuring correct{' '}
                <SEOInternalLink href="/guides/consumer-unit-regulations">
                  consumer unit regulations
                </SEOInternalLink>{' '}
                compliance, and labelling all circuits.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Adding a new circuit is notifiable work under{' '}
          <SEOInternalLink href="/guides/part-p-building-regulations">
            Part P of the Building Regulations
          </SEOInternalLink>{' '}
          and requires either notification through a competent person scheme or a Building Control
          application. An{' '}
          <SEOInternalLink href="/tools/eicr-certificate">
            Electrical Installation Certificate
          </SEOInternalLink>{' '}
          must be issued for the new circuit.
        </p>
        <SEOAppBridge
          title="Design additional circuits with AI"
          description="Use Elec-Mate's AI circuit designer to size cables, select protective devices, and verify that additional circuits comply with BS 7671. Generate professional specifications and certificates from your phone."
          icon={Brain}
        />
      </>
    ),
  },
  {
    id: 'prevention',
    heading: 'Preventing Circuit Overload',
    content: (
      <>
        <p>
          Prevention is always better than dealing with the consequences of overloading.
          Electricians can advise customers on the following practical steps:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Know your circuit layout.</strong> Understand which sockets are on which
                circuit. This helps distribute high-power appliances across different circuits
                rather than concentrating them on one.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Avoid multi-socket adaptors for high-power appliances.</strong> Kettles,
                heaters, toasters, and irons should be plugged directly into the wall socket — not
                through an adaptor that is also powering other devices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Unwind extension leads fully.</strong> A coiled extension lead cannot
                dissipate heat effectively. A 13A extension lead coiled up may only be able to
                safely carry 3 to 5A before overheating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Regular periodic inspection.</strong> A 5-yearly{' '}
                <SEOInternalLink href="/guides/eicr-for-landlords">EICR</SEOInternalLink> checks
                circuit loading, cable condition, and protective device operation — identifying
                overloading risks before they cause a fire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Plan for increased demand.</strong> Home offices, EV chargers, heat pumps,
                and electric cooking are all increasing domestic electricity demand. When carrying
                out any electrical work, consider whether the installation has capacity for future
                load growth.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Elec-Mate's{' '}
          <SEOInternalLink href="/training/18th-edition">training courses</SEOInternalLink> cover
          circuit design, cable sizing, and maximum demand calculation in detail — essential
          knowledge for every electrician advising customers on safe circuit loading.
        </p>
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function OverloadedCircuitPage() {
  return (
    <GuideTemplate
      title="Overloaded Circuit | Signs, Dangers & Solutions"
      description="Expert guide to overloaded electrical circuits. Covers signs of overload, maximum demand calculation, MCB tripping, the dangers of overloading, diversity factors, and when to add new circuits. UK-focused with BS 7671 references."
      datePublished="2025-10-10"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Safety Guide"
      badgeIcon={Zap}
      heroTitle={
        <>
          Overloaded Circuit:{' '}
          <span className="text-yellow-400">Signs, Dangers, and the Correct Solutions</span>
        </>
      }
      heroSubtitle="An overloaded circuit is a leading cause of electrical fires. This guide covers the warning signs, how to calculate maximum demand, why MCBs trip, the dangers of overloading cables, diversity factors, and when the correct solution is to add new circuits."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Overloaded Circuits"
      relatedPages={relatedPages}
      ctaHeading="Calculate, Diagnose, and Certificate from Your Phone"
      ctaSubheading="Maximum demand calculator, AI fault diagnosis, cable sizing tools, and professional EICR certificates — everything you need to assess circuit loading and advise customers. 7-day free trial."
    />
  );
}
