import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  ShieldCheck,
  AlertTriangle,
  Flame,
  FileCheck2,
  ClipboardCheck,
  Zap,
  Home,
  CheckCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Health & Safety', href: '/guides/electrical-safety-guide' },
  { label: 'Electrical Fire Safety', href: '/electrical-fire-safety' },
];

const tocItems = [
  { id: 'leading-causes', label: 'Leading Causes of Electrical Fires' },
  { id: 'arcing-faults', label: 'Arcing Faults and AFDDs' },
  { id: 'overloaded-circuits', label: 'Overloaded Circuits and Sockets' },
  { id: 'old-wiring', label: 'Old Wiring Risks' },
  { id: 'smoke-detection', label: 'Smoke Detection' },
  { id: 'extension-leads', label: 'Extension Lead Safety' },
  { id: 'rental-properties', label: 'Electrical Fire in Rental Properties' },
  { id: 'what-to-do', label: 'What to Do If an Electrical Fire Starts' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Electrical faults are the leading cause of accidental house fires in the UK, accounting for around 14,000 fires per year according to government fire statistics. The most common causes are faulty appliances, wiring faults, and overloaded sockets and extension leads.',
  'Arc Fault Detection Devices (AFDDs) detect the electrical signature of dangerous arcing faults that can start fires before a standard circuit breaker responds. AFDDs are now recommended in BS 7671:2018 (Regulation 421.1.7) for new and rewired circuits in dwelling units, particularly in high-risk locations such as bedrooms.',
  'An overloaded socket circuit generates heat at the weakest point — loose connections, degraded cable insulation, or damaged plug pins. Heat at these points can ignite adjacent combustible materials with no visible warning. Ring main circuits rated at 32A should not supply more than 3kW of continuous load on a single trailing lead.',
  'Wiring in UK homes built before 1966 is likely to be rubber-insulated, which degrades with age and heat. Rubber insulation becomes brittle, cracks, and can expose live conductors. An EICR can identify degraded wiring before it causes a fire. Old round-pin sockets, wooden-cased consumer units (fuseboard), and rubber-sheathed cables are all indicators of very old wiring.',
  'If an electrical fire starts, do NOT use water to extinguish it. Water conducts electricity and can cause electrocution. Switch off the power at the consumer unit if safe to do so, leave the building, and call 999. Use a CO2 or dry powder fire extinguisher only if the fire is small, contained, and you have a clear escape route.',
];

const faqs = [
  {
    question: 'What is the most common cause of electrical fires in UK homes?',
    answer:
      'According to UK government fire statistics, faulty or incorrectly used electrical appliances are the most common cause of electrical fires in the home, followed by wiring and electrical supply faults. Extension lead and adaptor overloading, appliances left switched on unattended, and damaged or frayed cables are significant contributors. Older properties with outdated wiring — particularly rubber-insulated wiring from before the 1960s — are at substantially higher risk from wiring faults.',
  },
  {
    question: 'What is an AFDD and does my home need one?',
    answer:
      'An Arc Fault Detection Device (AFDD) is a protective device that detects dangerous arcing faults in an electrical circuit. Arcing occurs when electrical current jumps across a gap or damaged insulation — it produces intense localised heat that can ignite surrounding materials before a standard circuit breaker trips (because the fault current may be below the breaker threshold). BS 7671:2018 (Regulation 421.1.7) recommends AFDDs for AC final circuits in dwelling units, particularly in bedrooms and areas with sleeping accommodation. They are not yet universally mandatory for existing installations, but they are strongly recommended for rewires and consumer unit upgrades in residential properties.',
  },
  {
    question: 'How many appliances can I plug into one socket?',
    answer:
      'Each 13A socket or adaptor has a maximum rating of 13A (approximately 3kW). Adding appliances whose combined power exceeds this rating causes overloading. The socket, plug, and cable will overheat. On a ring main circuit, the circuit is rated at 32A — but this does not mean 32A from a single socket is safe. Cables, plugs, and adaptors have lower current ratings. As a practical guide: one socket should supply one high-power appliance (washing machine, tumble dryer, electric oven, fan heater). Do not use adaptors to multiply sockets if any high-power appliances are connected.',
  },
  {
    question: 'Are old extension leads dangerous?',
    answer:
      'Yes. Damaged extension leads — frayed cables, cracked plug cases, bent or loose pins, and damaged sockets — are a significant fire risk. The connection between a plug pin and socket becomes a source of localised resistance heat when the pin makes poor contact. Extension leads should be fully unrolled when in use, as a coiled cable acts as an inductor and can overheat. Extension leads should not be connected to other extension leads (daisy-chaining), and should not supply high-power appliances unless rated for the load. Replace any extension lead showing signs of damage immediately.',
  },
  {
    question: 'Do landlords have to fit smoke alarms?',
    answer:
      'Yes. The Smoke and Carbon Monoxide Alarm (Amendment) Regulations 2022 require all landlords in England to fit at least one smoke alarm on every storey of the rental property where there is a room used as living accommodation, and at least one carbon monoxide alarm in every room where there is a fixed combustion appliance (excluding gas cookers). Scotland, Wales, and Northern Ireland have their own regulations which impose equivalent or stricter requirements. Smoke alarms must be in working order at the start of each new tenancy. Tenants should test alarms monthly and report faults promptly.',
  },
  {
    question: 'Can I use a CO2 fire extinguisher on an electrical fire?',
    answer:
      'Yes, CO2 extinguishers are safe to use on electrical fires. Carbon dioxide gas does not conduct electricity and leaves no residue that could damage equipment. Dry powder extinguishers are also effective on electrical fires but cause significant mess and damage. Never use water or foam extinguishers on electrical fires — water conducts electricity and can cause electrocution, and foam contains water. If you are not trained in fire extinguisher use, or if the fire is larger than a waste bin, do not attempt to fight it — evacuate and call 999.',
  },
  {
    question: 'How do I know if my wiring is old and potentially unsafe?',
    answer:
      'Signs of old wiring that may present a fire risk include: round-pin sockets (from pre-1947 wiring), brown or black rubber-sheathed cables (pre-1966), metal consumer units or wooden fuse boxes with rewirable fuses, lack of RCD protection (required by BS 7671 since 2008 for socket circuits in dwellings), and single-core cables clipped to the surface in old colours (red and black instead of brown and blue). An Electrical Installation Condition Report (EICR) carried out by a qualified electrician will identify these issues. Properties with pre-1966 wiring should be considered for rewiring.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/guides/eicr-for-landlords',
    title: 'EICR for Landlords',
    description: 'Landlord electrical safety inspections — identifying fire risks before they occur.',
    icon: Home,
    category: 'Guide',
  },
  {
    href: '/electrical-accident-reporting',
    title: 'Accident Reporting Guide',
    description: 'RIDDOR 2013 reporting for electrical fires and dangerous occurrences.',
    icon: ClipboardCheck,
    category: 'Safety',
  },
  {
    href: '/lockout-tagout-guide',
    title: 'Lockout Tagout Guide',
    description: 'Safe electrical isolation — essential before investigating a fire-damaged installation.',
    icon: ShieldCheck,
    category: 'Safety',
  },
  {
    href: '/guides/electrical-safety-guide',
    title: 'Electrical Safety Guide',
    description: 'Complete UK electrical safety reference for electricians.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete EICRs on your phone with AI board scanning — identify fire risks on site.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'leading-causes',
    heading: 'Leading Causes of Electrical Fires in the UK',
    content: (
      <>
        <p>
          Electrical fires are a major cause of accidental fires in UK homes and workplaces.
          Understanding the common causes is the first step in prevention.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Faulty or misused appliances</strong> — the leading cause. White goods
                (tumble dryers, dishwashers, washing machines) are disproportionately represented
                in fire statistics due to their high power consumption, heat generation, and the
                fact that they are often left running unattended overnight. Manufacturers issue
                product safety recalls for appliances with known fire risks — register your
                appliances to receive recall notices.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring and electrical supply faults</strong> — includes arcing from damaged
                or degraded wiring, loose connections generating resistance heat, and overloaded
                circuits. Older properties with rubber-insulated wiring are at substantially
                greater risk.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Overloaded sockets and extension leads</strong> — plugging too many
                appliances into a single outlet via adaptors or multi-gang extension leads causes
                overloading and localised heating at connections. This is particularly common in
                areas with limited sockets, such as older homes or student accommodation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lighting</strong> — halogen downlighters installed in thermal insulation
                (a common source of fire in loft conversions and extensions), damaged light fittings,
                and using bulbs of the wrong wattage can all cause fires. LED replacements eliminate
                the heat buildup associated with halogen lamps.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'arcing-faults',
    heading: 'Arcing Faults and Arc Fault Detection Devices (AFDDs)',
    content: (
      <>
        <p>
          Arcing faults are one of the most dangerous electrical fire hazards because they can
          occur at fault current levels too low to trip a standard circuit breaker or fuse, yet
          generate enough heat at the arc point to ignite adjacent materials.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>What causes arcing</strong> — damaged cable insulation (from nail/screw
                penetration, crushing, or animal damage), loose or poorly terminated connections,
                damaged plugs, and degraded wiring. The arc between conductors generates a
                plasma at temperatures exceeding 3,000°C — hot enough to ignite wood, insulation,
                and dust immediately.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>How AFDDs work</strong> — an AFDD monitors the current waveform on a
                circuit for the distinctive signature of arc faults — rapid current oscillations
                that differ from normal load characteristics. When it detects an arc fault
                signature, it trips the circuit within milliseconds, before ignition can occur.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>BS 7671 Regulation 421.1.7</strong> — the 18th Edition (and Amendment 1)
                recommends AFDDs for AC final circuits in domestic installations, particularly in
                bedrooms and sleeping areas. Amendment 2 (2022) extends this recommendation to all
                final circuits in dwelling units for new installations and rewires. While currently
                a recommendation (not mandatory for all circuits), many electricians now fit AFDDs
                as standard on consumer unit upgrades.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fitting AFDDs</strong> — AFDDs are fitted at the consumer unit in place
                of (or in combination with) the standard MCB. They are available as combined
                AFDD/RCBOs from manufacturers including Hager, ABB, Eaton, Schneider, and Siemens.
                An EICR can identify circuits most in need of AFDD protection.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'overloaded-circuits',
    heading: 'Overloaded Circuits and Socket Safety',
    content: (
      <>
        <p>
          Overloading occurs when more current is drawn through a cable, socket, or connection
          than it is designed to carry. The excess current generates heat at the point of
          highest resistance — typically a poor connection — which can ignite surrounding materials.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>13A socket maximum</strong> — a 13A socket or plug-in adaptor has a
                maximum rating of 13A (approximately 3kW). Adaptors multiplying sockets do not
                increase the current capacity of the original socket outlet — they simply allow
                more appliances to share the same 13A rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>High-power appliances</strong> — electric kettles (up to 3kW), fan heaters
                (1–3kW), tumble dryers (2–3kW), and electric showers (7–10kW) should each have
                their own dedicated circuit or socket. Never share a socket between two high-power
                appliances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Loose connections generate heat</strong> — a loose connection at a
                terminal, socket outlet, or plug top creates a point of increased resistance.
                Current flows through this resistance and generates heat proportional to the
                current squared multiplied by the resistance (P=I²R). This heat can carbonise
                surrounding plastic and eventually cause ignition.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fit additional socket outlets</strong> — the proper solution to a lack
                of socket outlets is to install additional sockets, not to use adaptors and
                extension leads indefinitely. A qualified electrician can add socket outlets to
                an existing ring main or install additional circuits from the consumer unit.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'old-wiring',
    heading: 'Old Wiring — Risks in UK Properties',
    content: (
      <>
        <p>
          The UK has a large stock of older housing, and many properties still contain wiring
          that is decades past its recommended service life. Old wiring presents a significant
          fire risk.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Rubber-insulated wiring (pre-1966)</strong> — rubber insulation
                degrades with age, heat, and exposure to light. It becomes brittle, cracks, and
                crumbles, exposing live conductors. This is particularly common in loft spaces
                and roof voids where temperature extremes accelerate degradation.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lead-sheathed wiring (pre-1955)</strong> — lead sheathing was used in
                the earliest domestic wiring. Where it survives, it is likely to have degraded
                insulation. The sheath may appear intact externally while the internal insulation
                has failed completely.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wooden fuse boards and rewirable fuses</strong> — rewirable fuses in
                wooden consumer units provide poor overload protection. The correct fuse wire
                rating is rarely maintained — oversized fuse wire allows excessive current before
                blowing, increasing the risk of cable overheating and fire.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-0.5 shrink-0" />
              <span>
                <strong>EICR identifies wiring age and condition</strong> — an{' '}
                <SEOInternalLink href="/tools/eicr-certificate">
                  Electrical Installation Condition Report (EICR)
                </SEOInternalLink>{' '}
                will identify aged wiring, assess its condition, and classify any unsafe findings.
                Properties with rubber-insulated wiring should be considered for full rewiring.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'smoke-detection',
    heading: 'Smoke Detection — Why Early Warning Saves Lives',
    content: (
      <>
        <p>
          A working smoke alarm gives occupants the time to escape a building before a fire
          becomes unsurvivable. Electrical fires can start slowly — smouldering for hours before
          breaking into flame — or almost instantaneously from a major arc flash. Either way,
          early detection is critical.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Optical vs ionisation alarms</strong> — optical (photoelectric) smoke
                alarms are better at detecting slow, smouldering fires — the type most commonly
                produced by electrical faults in wiring and appliances. Ionisation alarms are
                better at detecting fast, flaming fires. A combination alarm or fitting both types
                provides the best coverage.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Placement</strong> — fit a smoke alarm in the hallway at each level of
                the property (the escape route), in the living room, and on the landing outside
                each bedroom. Do not fit smoke alarms in kitchens or bathrooms — cooking fumes
                and steam cause false alarms. Heat alarms (not smoke alarms) are appropriate for
                kitchens.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Interlinked alarms</strong> — BS 5839-6 recommends interlinked smoke
                alarms in new and significantly refurbished dwellings, so that when one alarm
                activates, all alarms sound simultaneously. This is particularly important in
                larger properties where an alarm at the other end of the building might not
                be heard.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test monthly, replace at 10 years</strong> — test smoke alarms monthly
                using the test button. Replace the battery annually (unless the alarm has a
                sealed 10-year battery). Replace the entire unit after 10 years from the date
                of manufacture (printed on the alarm).
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'extension-leads',
    heading: 'Extension Lead Safety',
    content: (
      <>
        <p>
          Extension leads are found in almost every home and workplace, but they are also a
          frequent source of fire when misused or damaged.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Always fully unroll before use</strong> — a coiled extension lead
                in use dissipates heat poorly. The inductance of the coil can also cause
                overheating at high currents. Unroll the lead completely before connecting
                high-power appliances.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check the current rating of the lead</strong> — most domestic extension
                leads are rated at 13A for their socket outlets but the cable itself may have a
                lower current rating — particularly thin flat "figure-8" leads which may be rated
                at 6A or less. Never connect a high-power appliance to an undersized lead.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not run under carpets or rugs</strong> — cables under floor coverings
                cannot dissipate heat, and any damage to the cable (from foot traffic) will not
                be visible. Running electrical cables under carpets is a fire risk and contravenes
                BS 7671 wiring requirements.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspect before use</strong> — check for damaged cable sheath (cuts,
                crushing, or melting), cracked plug bodies, loose pins, and overheated socket
                outlets (discolouration, smell of burning). Discard and replace damaged leads
                immediately.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'rental-properties',
    heading: 'Electrical Fire Risks in Rental Properties',
    content: (
      <>
        <p>
          Rental properties carry specific electrical fire risks. Tenants may have limited
          awareness of electrical safety, may have multiple appliances and extension leads,
          and the property may have older wiring that has not been recently inspected.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Landlord EICR obligation</strong> — the Electrical Safety Standards in
                the Private Rented Sector (England) Regulations 2020 require landlords to obtain
                an EICR every five years or at change of tenancy, and to complete any C1 or C2
                remedial work within 28 days. An EICR identifies aged wiring, lack of RCD
                protection, and other fire risks.{' '}
                <SEOInternalLink href="/guides/eicr-for-landlords">
                  Full landlord EICR guidance here.
                </SEOInternalLink>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Smoke alarm requirement</strong> — the Smoke and Carbon Monoxide Alarm
                (Amendment) Regulations 2022 require smoke alarms on every storey of a rented
                property where there is living accommodation. Landlords must test alarms at the
                start of each tenancy and ensure they are in working order.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Home className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Tenant responsibilities</strong> — tenants should not overload sockets,
                should report damaged wiring or sockets to the landlord immediately, should not
                remove or disable smoke alarms, and should test alarms monthly. Damaged electrical
                fittings should never be ignored — report them to the landlord in writing.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'what-to-do',
    heading: 'What to Do If an Electrical Fire Starts',
    content: (
      <>
        <div className="rounded-2xl bg-red-500/20 border border-red-500/40 p-6 my-4">
          <div className="flex items-start gap-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-400 mt-0.5 shrink-0" />
            <p className="text-white font-bold text-lg">
              Never use water on an electrical fire. Water conducts electricity and can cause
              electrocution.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 font-bold text-sm">1</span>
              <span>
                <strong>Switch off the power</strong> — if it is safe to do so and the consumer
                unit is accessible, switch off the main switch. This removes the electrical energy
                feeding the fire and makes extinguishing it safer.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 font-bold text-sm">2</span>
              <span>
                <strong>Call 999</strong> — call the fire brigade immediately. Do not wait to see
                if you can extinguish it yourself — electrical fires can spread very rapidly.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 font-bold text-sm">3</span>
              <span>
                <strong>Evacuate</strong> — if the fire is more than a waste bin in size, do not
                attempt to fight it. Close doors to slow the spread of fire, sound the fire alarm,
                and evacuate. Stay low if there is smoke.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="flex-shrink-0 w-7 h-7 rounded-full bg-yellow-500/20 border border-yellow-500/40 flex items-center justify-center text-yellow-400 font-bold text-sm">4</span>
              <span>
                <strong>CO2 extinguisher only</strong> — if the fire is small, contained, you
                have a clear escape route, and the power is off, a CO2 or dry powder extinguisher
                may be used. Aim at the base of the flames. Never use water or foam.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Identifying and Reporting Fire Risks',
    content: (
      <>
        <p>
          As a qualified electrician, you are often the first to identify electrical fire risks
          in properties. Documenting your findings clearly and providing clients with actionable
          remedial advice is part of your professional responsibility.
        </p>
        <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5 my-4">
          <div className="flex items-start gap-4">
            <FileCheck2 className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-bold text-white mb-1">Complete EICRs Identifying Fire Risks On Site</h4>
              <p className="text-white text-sm leading-relaxed">
                Use the{' '}
                <SEOInternalLink href="/tools/eicr-certificate">
                  Elec-Mate EICR app
                </SEOInternalLink>{' '}
                to complete condition reports on your phone, with AI board scanning and instant
                PDF export. Record C1 and C2 observations related to fire risks — arcing damage,
                degraded wiring, lack of RCD protection, and overloaded circuits — and send the
                report to your client before you leave the property.
              </p>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete EICRs on your phone with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site EICR completion, AI board scanning, and instant PDF export. Identify electrical fire risks and send reports to clients immediately. 7-day free trial."
          icon={Flame}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function ElectricalFireSafetyPage() {
  return (
    <GuideTemplate
      title="Electrical Fire Safety UK | Preventing Electrical Fires Guide"
      description="UK electrical fire safety guide — leading causes of electrical fires, arcing faults and AFDDs, overloaded sockets, old wiring risks, smoke detection, extension lead safety, rental property requirements, and what to do if an electrical fire starts."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Fire Safety"
      badgeIcon={Flame}
      heroTitle={
        <>
          Electrical Fire Safety UK:{' '}
          <span className="text-yellow-400">Prevention and Response Guide</span>
        </>
      }
      heroSubtitle="Everything UK electricians, landlords, and homeowners need to know about electrical fire safety — the leading causes of electrical fires, arcing faults and AFDDs, overloaded circuits, old wiring risks, smoke detection, and what to do if an electrical fire starts."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Electrical Fire Safety"
      relatedPages={relatedPages}
      ctaHeading="Complete EICRs and Identify Electrical Fire Risks On Site"
      ctaSubheading="Elec-Mate's EICR app lets you complete condition reports on your phone with AI board scanning, identifying fire risks including arcing damage, old wiring, and lack of RCD protection. 7-day free trial."
    />
  );
}
