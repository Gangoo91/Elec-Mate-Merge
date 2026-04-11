import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Lightbulb,
  AlertTriangle,
  ShieldCheck,
  FileCheck2,
  Search,
  Cable,
  Wrench,
  Zap,
  Droplets,
  Timer,
  Eye,
  Sun,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Guides', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Outdoor Light Not Working', href: '/guides/outdoor-light-not-working' },
];

const tocItems = [
  { id: 'overview', label: 'Why Is My Outdoor Light Not Working?' },
  { id: 'quick-checks', label: 'Quick Checks You Can Do Yourself' },
  { id: 'ip-rating-moisture', label: 'IP Rating Failure and Moisture Ingress' },
  { id: 'sensor-faults', label: 'Photocell and PIR Sensor Faults' },
  { id: 'swa-cable', label: 'SWA Cable Damage' },
  { id: 'rcd-tripping', label: 'RCD Tripping from Earth Fault' },
  { id: 'led-driver', label: 'LED Driver Failure' },
  { id: 'timer-dusk-dawn', label: 'Timer and Dusk-to-Dawn Module Faults' },
  { id: 'corrosion', label: 'Corrosion at Junction Boxes' },
  { id: 'when-to-call', label: 'When to Call an Electrician' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Moisture ingress is the single most common cause of outdoor light failure. Water enters through cracked lenses, degraded seals, or damaged cable glands, causing short circuits, earth faults, and corrosion of internal components.',
  'Photocell sensors (for dusk-to-dawn operation) and PIR motion sensors are exposed to weather and degrade over time. A faulty photocell may keep the light off permanently, while a faulty PIR may stop detecting motion.',
  'SWA (Steel Wire Armoured) cable, commonly used for outdoor circuits, can be damaged by garden digging, ground movement, or corrosion of the armour. A damaged SWA cable can cause complete power loss or RCD tripping.',
  'Outdoor circuits are particularly prone to RCD tripping because of earth faults caused by moisture. Under Regulation 411.3.3 of BS 7671, socket outlets rated up to 32A require RCD protection with a rated residual operating current not exceeding 30mA.',
  'LED driver failure is increasingly common as outdoor LED lights age. The LED driver (transformer) is the component most likely to fail, not the LEDs themselves. Driver replacement or full fitting replacement is usually needed.',
  'Corrosion at junction boxes, terminal blocks, and cable glands is a slow-acting but common cause of outdoor light failure. Corroded connections increase resistance, generate heat, and eventually fail open-circuit.',
];

const faqs = [
  {
    question: 'Why does my outdoor light keep tripping the electrics?',
    answer:
      'An outdoor light that trips the RCD or MCB almost always has moisture ingress. Water enters the fitting through a cracked lens, degraded seal, or damaged cable entry and creates a path for current to leak to earth — which trips the RCD. The fitting needs to be opened, dried out, and inspected for the water entry point. If the fitting is old or the seal is degraded, replacement with a new IP-rated fitting is usually the best option. Check all cable glands and entries are properly sealed.',
  },
  {
    question: 'My PIR security light stays on all the time — what is wrong?',
    answer:
      'A PIR light that stays on continuously is usually in one of two states: the PIR sensor has failed in the "on" position, or the light has been accidentally switched to manual override mode. Many PIR lights have a manual override activated by turning the switch off and on quickly — this bypasses the PIR and keeps the light on permanently. Try switching the light off for 30 seconds, then back on. If the light comes on and then turns off after the set time, it was in override mode. If it stays on, the PIR sensor has likely failed and needs replacing.',
  },
  {
    question: 'Can I replace an outdoor light fitting myself?',
    answer:
      'Replacing a like-for-like outdoor light fitting (same location, same wiring, no new circuit work) is generally non-notifiable. However, outdoor electrical work carries higher risk due to weather exposure and the need for correct IP ratings. Ensure the replacement fitting has an IP rating suitable for its location (minimum IP44 for exposed outdoor positions, IP65 for areas subject to direct rain or water jets). All connections must be properly sealed. If the circuit does not have RCD protection, an electrician should add it.',
  },
  {
    question: 'What IP rating does an outdoor light need?',
    answer:
      'The required IP rating depends on the exposure. IP44 is the minimum for outdoor lights in sheltered positions (under a porch or eaves). IP65 is recommended for lights exposed to direct rain, and is necessary for any light that could be hit by water jets (e.g., near a driveway that gets pressure-washed). IP67 is needed for lights installed at ground level that could be submerged temporarily (recessed ground lights). The first digit is solid particle protection (4 = protected against objects >1mm), and the second digit is water protection (4 = splash, 5 = jets, 7 = immersion).',
  },
  {
    question: 'Why does my outdoor light only work sometimes?',
    answer:
      'Intermittent outdoor light operation is typically caused by: a corroded connection that makes and breaks contact as temperature changes cause expansion and contraction; a photocell sensor that is partially failing (it may misread light levels); moisture that accumulates and evaporates with weather changes (causing intermittent earth faults); or an LED driver that is overheating and shutting down on thermal protection, then restarting when it cools. Each cause needs different investigation — an electrician can systematically test to identify which.',
  },
  {
    question: 'How do I know if my SWA cable is damaged?',
    answer:
      'Signs of SWA cable damage include: the outdoor circuit trips immediately or intermittently (especially after rain); you can see physical damage to the cable where it enters the ground or passes through a wall; the cable glands at either end show corrosion or damage; or there is a visible dig mark or disturbance in the ground above the cable route. An electrician can test the cable with insulation resistance testing (500V DC) to confirm whether the insulation is compromised. A low reading on the L-E or N-E test confirms cable damage.',
  },
  {
    question: 'Should outdoor lights be on their own circuit?',
    answer:
      'It is strongly recommended. Outdoor lighting on its own dedicated circuit with its own MCB and RCD (or RCBO) means that a fault on the outdoor circuit does not trip indoor circuits. This is particularly important because outdoor circuits are more prone to faults from weather exposure. If your outdoor lights share a circuit with indoor lights or sockets, a moisture-related earth fault in an outdoor fitting can trip the RCD and take out indoor circuits as well.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/electrical-fault-finding',
    title: 'Electrical Fault Finding Guide',
    description: 'Systematic fault finding approach for diagnosing non-working circuits.',
    icon: Search,
    category: 'Guide',
  },
  {
    href: '/guides/trip-switch-keeps-going-off',
    title: 'Trip Switch Keeps Going Off',
    description: 'Why your trip switch keeps tripping — including outdoor circuit faults.',
    icon: Zap,
    category: 'Guide',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description: 'RCD and RCBO requirements for outdoor circuit protection.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/guides/eicr-certificate',
    title: 'EICR Guide',
    description: 'How an EICR identifies defects in outdoor electrical installations.',
    icon: FileCheck2,
    category: 'Guide',
  },
  {
    href: '/guides/minor-works-certificate',
    title: 'Minor Works Certificate',
    description: 'Documentation required when replacing or repairing outdoor lighting.',
    icon: FileCheck2,
    category: 'Guide',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Why Is My Outdoor Light Not Working?',
    content: (
      <>
        <p>
          Your outdoor light has stopped working — the security light does not come on, the garden
          lights are dark, or the porch light is dead. Outdoor lights face challenges that indoor
          lights do not: rain, frost, UV exposure, temperature swings, and insects — all of which
          take a toll on electrical fittings over time.
        </p>
        <p>
          The cause could be as simple as a tripped breaker or a failed bulb, or as complex as a
          damaged underground cable or a corroded junction box buried in a garden wall. Outdoor
          electrical faults also carry a higher safety risk because of the combination of
          electricity and water.
        </p>
        <p>
          This guide covers every common cause of outdoor light failure, explains what you can check
          yourself safely, and tells you when to call an electrician. If you are an electrician, the
          later sections cover{' '}
          <SEOInternalLink href="/guides/electrical-fault-finding">
            outdoor circuit fault finding
          </SEOInternalLink>{' '}
          and the specific challenges of weatherproof installations.
        </p>
      </>
    ),
  },
  {
    id: 'quick-checks',
    heading: 'Quick Checks You Can Do Yourself',
    content: (
      <>
        <p>Before investigating further, rule out the simple causes:</p>
        <div className="space-y-3 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">1. Check the consumer unit</h4>
            <p className="text-white text-sm leading-relaxed">
              Check whether the MCB or RCD for the outdoor circuit has tripped. If the outdoor
              lights share a circuit with indoor lights, the shared MCB may have tripped. Reset and
              see if it holds.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">2. Check the switch and timer</h4>
            <p className="text-white text-sm leading-relaxed">
              Outdoor lights may be controlled by an indoor switch, a timer, a photocell, or a
              combination. Check that the switch is on, the timer is set correctly, and (for
              photocell lights) it is actually dark enough to trigger the sensor. Some photocells
              have a sensitivity adjustment.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">3. Check the bulb or LED</h4>
            <p className="text-white text-sm leading-relaxed">
              If the fitting uses a replaceable bulb, try a new one. For integrated LED fittings
              where the LED is not replaceable separately, the whole fitting or the LED driver
              module may need replacing.
            </p>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h4 className="font-bold text-white mb-2">4. Look for visible damage</h4>
            <p className="text-white text-sm leading-relaxed">
              Check the light fitting for cracked lenses, missing gaskets, water inside the fitting
              (visible condensation behind the lens), corroded screws, or damaged cable entries. Any
              of these can allow water in, causing the failure.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'ip-rating-moisture',
    heading: 'IP Rating Failure and Moisture Ingress',
    content: (
      <>
        <p>
          Moisture ingress is the number one cause of outdoor light failure. Every outdoor light
          fitting has an IP (Ingress Protection) rating that indicates its resistance to water and
          dust. When the seals, gaskets, or enclosure degrade, the IP protection fails and water
          gets in.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Degraded seals and gaskets</strong> — rubber and silicone seals harden and
                crack with UV exposure and temperature cycling. After 3 to 5 years outdoors, most
                seals have significantly reduced effectiveness. Water then enters through the
                seal-to-body joint.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cracked lenses</strong> — polycarbonate and glass lenses can crack from
                impact, thermal stress, or UV degradation. Even a hairline crack allows water to
                enter during rain and condense inside the fitting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable gland failure</strong> — the cable gland at the entry point of the
                fitting is critical. If it is loose, the wrong size for the cable, or has perished,
                water runs down the cable and into the fitting. This is a very common fault and easy
                to miss during visual inspection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Condensation build-up</strong> — even without a direct water leak,
                temperature changes cause condensation inside outdoor fittings. Sealed fittings trap
                moisture, which accumulates over time and eventually reaches electrical components.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When water reaches the internal terminals or driver, it causes short circuits (tripping
          the MCB), earth faults (tripping the RCD), or corrosion of components (gradual failure).
          The fix is usually to replace the fitting with a new one of adequate IP rating, ensuring
          all cable entries are properly sealed.
        </p>
      </>
    ),
  },
  {
    id: 'sensor-faults',
    heading: 'Photocell and PIR Sensor Faults',
    content: (
      <>
        <p>
          Many outdoor lights incorporate sensors for automatic operation. These sensors are the
          most exposed electronic components and are common failure points:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h4 className="font-bold text-white mb-2">Photocell (Light Sensor) Faults</h4>
            <p className="text-white text-sm leading-relaxed mb-3">
              Photocells detect ambient light levels and switch the light on at dusk and off at
              dawn. Common faults include:
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold shrink-0">•</span>
                <span>Sensor window covered in dirt, algae, or cobwebs — clean it first</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold shrink-0">•</span>
                <span>Sensor degraded by UV exposure — reads light level incorrectly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold shrink-0">•</span>
                <span>Sensor failed "off" — light never comes on regardless of darkness</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 font-bold shrink-0">•</span>
                <span>
                  Sensor affected by nearby light source (e.g., street light) — thinks it is always
                  daytime
                </span>
              </li>
            </ul>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h4 className="font-bold text-white mb-2">PIR (Passive Infrared) Sensor Faults</h4>
            <p className="text-white text-sm leading-relaxed mb-3">
              PIR sensors detect body heat (infrared radiation) from people and animals moving
              within their detection zone. Common faults include:
            </p>
            <ul className="space-y-2 text-white text-sm">
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold shrink-0">•</span>
                <span>Lens clouded or scratched — reduced sensitivity and range</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold shrink-0">•</span>
                <span>
                  Spider webs across the sensor — triggers false activations or blocks detection
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold shrink-0">•</span>
                <span>
                  Sensor aimed incorrectly — detection zone does not cover the desired area
                </span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-400 font-bold shrink-0">•</span>
                <span>
                  Internal electronics failed — no detection at all, or permanently triggered
                </span>
              </li>
            </ul>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'swa-cable',
    heading: 'SWA Cable Damage',
    content: (
      <>
        <p>
          SWA (Steel Wire Armoured) cable is the standard cable type for outdoor underground
          circuits in the UK. It has a tough steel wire armour layer that provides mechanical
          protection and acts as the circuit protective conductor (earth). Despite its toughness,
          SWA cable can be damaged:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Garden digging</strong> — the most common cause of SWA damage. A spade,
                rotavator, or fence post driver can cut through SWA cable buried at insufficient
                depth. Building Regulations require a minimum 500mm burial depth, but older
                installations may be shallower.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Ground movement</strong> — subsidence, tree root growth, or frost heave can
                stress the cable and damage the insulation, particularly at joints and entries.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Corroded glands</strong> — the SWA glands at each end of the cable connect
                the steel armour to the earthing system. Corrosion of the glands can break the earth
                path, creating a safety hazard even if the circuit continues to work.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Water ingress through glands</strong> — if the gland seal fails, water
                enters the cable at the termination point and can track along inside the cable
                sheath, causing insulation breakdown some distance from the entry point.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rcd-tripping',
    heading: 'RCD Tripping from Earth Fault',
    content: (
      <>
        <p>
          Outdoor lights are one of the most common causes of RCD tripping in UK homes. The
          combination of electrical equipment and weather exposure means earth faults are frequent.
        </p>
        <p>
          Under Regulation 411.3.3 of BS 7671, additional protection by an RCD with a rated residual
          operating current not exceeding 30mA is required for socket outlets rated up to 32A and
          for mobile equipment rated up to 32A used outdoors. Outdoor lighting circuits should also
          have RCD protection as good practice, and this will be required where the circuit supplies
          socket outlets or where specified by the designer.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">
            Common Earth Fault Sources in Outdoor Lighting
          </h3>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Water inside a light fitting — creates a conductive path between live parts and the
                earthed metal body
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Damaged SWA cable — insulation breakdown allows current to leak through the steel
                armour to earth
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Droplets className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Waterlogged junction box — buried or exposed junction boxes that have filled with
                water
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                Failed LED driver — internal insulation breakdown in the driver allows current to
                leak to the metal housing
              </span>
            </li>
          </ul>
        </div>
        <p>
          If your outdoor lights trip the RCD, the fault needs to be found and repaired — not simply
          reset repeatedly. Each RCD trip indicates current flowing through an unintended path,
          which could be dangerous.
        </p>
      </>
    ),
  },
  {
    id: 'led-driver',
    heading: 'LED Driver Failure',
    content: (
      <>
        <p>
          Most modern outdoor lights use LED technology, and the LED driver (also called the
          transformer or power supply) is the component most likely to fail. LEDs themselves are
          very long-lived, but the electronic driver that converts mains voltage to the low voltage
          the LEDs need is more vulnerable.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal stress</strong> — LED drivers contain electrolytic capacitors that
                degrade with heat. Outdoor lights experience wide temperature swings (freezing
                winter nights to hot summer afternoons in direct sun), accelerating capacitor
                degradation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Moisture damage</strong> — even small amounts of moisture reaching the
                driver PCB can cause component failure or corrosion of solder joints. This is the
                most common cause of premature LED driver failure in outdoor fittings.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage spikes</strong> — mains voltage transients (from switching,
                lightning, or supply fluctuations) can damage the input stage of the driver. Quality
                drivers have surge protection; cheap ones do not.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Lightbulb className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Thermal shutdown</strong> — some drivers have thermal protection that shuts
                the light off when the driver overheats, then resets when it cools. This causes
                intermittent operation — the light works for a while, goes off, then comes back on.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In some fittings, the driver is replaceable separately — look for a model number on the
          driver and source a replacement. In many integrated LED fittings, the driver is built in
          and the entire fitting must be replaced when the driver fails.
        </p>
      </>
    ),
  },
  {
    id: 'timer-dusk-dawn',
    heading: 'Timer and Dusk-to-Dawn Module Faults',
    content: (
      <>
        <p>
          Outdoor lights are often controlled by timers or dusk-to-dawn modules that automate their
          operation. When these controllers fail, the light may not operate at all, stay on
          permanently, or operate at the wrong times:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Timer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Digital timer lost settings</strong> — after a power cut, many digital
                timers lose their programmed on/off times and revert to factory defaults (which may
                be "off" at all times). Reprogram the timer after any power interruption.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Mechanical timer jammed</strong> — older mechanical timers (with pins or
                segments) can jam due to dirt, corrosion, or a worn motor. The timer stops advancing
                and the light stays in whatever state it was in when the timer stopped.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dusk-to-dawn module failure</strong> — these are essentially photocells in a
                separate module, usually mounted on the consumer unit rail or near the outdoor
                circuit. They fail the same way as built-in photocells — sensor degradation, dirt on
                the sensor window, or electronic failure.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Timer className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Astronomical timer drift</strong> — some modern timers calculate sunrise and
                sunset times based on location. If the location is set incorrectly, or the timer's
                internal clock has drifted, the on/off times will be wrong. Reset and reconfigure.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'corrosion',
    heading: 'Corrosion at Junction Boxes',
    content: (
      <>
        <p>
          Corrosion is the silent killer of outdoor electrical installations. It works slowly —
          sometimes over years — but eventually causes connection failure. Junction boxes, terminal
          blocks, and cable glands are the most vulnerable points.
        </p>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/20 p-6 my-4">
          <h3 className="font-bold text-white text-lg mb-3">Where Corrosion Strikes</h3>
          <ul className="space-y-3 text-white text-sm">
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Terminal screws and connector blocks</strong> — brass and steel screws
                corrode in damp conditions, increasing resistance at the connection. The connection
                may work intermittently as corrosion builds up and flakes off.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth connections</strong> — the earth terminal is often the first to
                corrode because it is typically the most exposed. A corroded earth connection means
                the safety circuit is compromised — the RCD may not trip fast enough in a fault
                condition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>SWA glands</strong> — the glands connecting the SWA cable armour to the
                enclosure earth corrode over time, particularly in coastal or industrial
                environments. Corroded glands can break the earth continuity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Wrench className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Dissimilar metal corrosion</strong> — aluminium fittings with steel screws,
                or copper conductors in steel terminal blocks, create galvanic corrosion that
                accelerates in wet conditions. Use appropriate materials and anti-corrosion
                compound.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'when-to-call',
    heading: 'When to Call an Electrician',
    content: (
      <>
        <p>
          Outdoor electrical work carries higher risk than indoor work because of weather exposure.
          Here is when to call a professional:
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Urgent</strong> — the outdoor light trips the RCD (affecting other
                circuits), you can see exposed wiring or damaged cable, there is a burning smell
                from any outdoor fitting or junction box, or the SWA cable has been damaged by
                digging.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
              <span>
                <strong>Soon</strong> — the outdoor light does not work and the simple checks have
                not identified the cause, the light works intermittently, or you can see water
                inside a light fitting.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Routine</strong> — you want to replace an outdoor light fitting, add new
                outdoor lighting, or have the outdoor circuit checked as part of a general
                inspection.
              </span>
            </li>
          </ul>
        </div>
        <p>
          An electrician will test insulation resistance on the outdoor circuit, check all
          connections and IP-rated enclosures, verify RCD protection is present and operational, and
          ensure cables are properly routed and protected. They should issue a{' '}
          <SEOInternalLink href="/tools/minor-works-certificate">
            Minor Works Certificate
          </SEOInternalLink>{' '}
          for any repair or replacement work.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Outdoor Lighting Fault Finding',
    content: (
      <>
        <p>
          Outdoor circuit faults require a methodical approach, particularly because access to
          buried cables and remote fittings can be challenging:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Zap className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">1. Isolate the Outdoor Circuit</h4>
                <p className="text-white text-sm leading-relaxed">
                  Test insulation resistance at the consumer unit end of the outdoor circuit (500V
                  DC, L-E, N-E, L-N). This immediately tells you whether the fault is in the
                  cable/fittings or at the supply end. Low IR readings on the outdoor circuit
                  confirm a cable or fitting fault. Disconnect fittings one at a time to isolate
                  which section has the fault.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Eye className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">2. Inspect All IP-Rated Enclosures</h4>
                <p className="text-white text-sm leading-relaxed">
                  Open every outdoor junction box, fitting, and enclosure. Check for water ingress,
                  corrosion, damaged seals, and loose connections. Pay particular attention to cable
                  glands — incorrect gland size or missing seals are extremely common on outdoor
                  installations. Check SWA gland tightness and armour earth continuity at each
                  termination.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Cable className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">3. SWA Cable Testing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Test SWA cable insulation resistance between each conductor and the armour, and
                  between conductors. Test the armour continuity separately — the armour is the CPC
                  and must have good continuity end-to-end. If IR readings are low, the cable is
                  compromised and likely needs replacement. Use a cable locator to trace the route
                  before any excavation.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">4. Repair and Certify</h4>
                <p className="text-white text-sm leading-relaxed">
                  Replace damaged fittings with appropriate IP-rated units. Ensure all glands are
                  correct size and properly sealed. Verify RCD protection is present — if not,
                  recommend installation. Test the completed circuit (IR, Zs, RCD operation time).
                  Issue a{' '}
                  <SEOInternalLink href="/tools/minor-works-certificate">
                    Minor Works Certificate
                  </SEOInternalLink>{' '}
                  documenting the fault, repair, and test results.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Document outdoor lighting work with professional certificates"
          description="Elec-Mate lets you complete Minor Works Certificates and EICRs on your phone with full test result recording, photo attachments, and instant PDF export. Perfect for outdoor circuit work."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function OutdoorLightNotWorkingPage() {
  return (
    <GuideTemplate
      title="Outdoor Light Not Working | Troubleshooting Guide"
      description="Outdoor light not working? Learn the common causes — moisture ingress, PIR/photocell faults, SWA cable damage, LED driver failure, RCD tripping, corroded junction boxes — and when to call an electrician. Guide for UK homeowners and electricians."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Troubleshooting"
      badgeIcon={Lightbulb}
      heroTitle={
        <>
          Outdoor Light Not Working: <span className="text-yellow-400">Troubleshooting Guide</span>
        </>
      }
      heroSubtitle="Your outdoor light has stopped working. This guide covers every common cause — from moisture ingress and sensor faults to cable damage and LED driver failure — tells you what to check yourself, and explains when to call an electrician."
      readingTime={14}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Outdoor Light Problems"
      relatedPages={relatedPages}
      ctaHeading="Certify Outdoor Electrical Work on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for Minor Works Certificates, EICR reports, and AI-powered fault diagnosis. 7-day free trial, cancel anytime."
    />
  );
}
