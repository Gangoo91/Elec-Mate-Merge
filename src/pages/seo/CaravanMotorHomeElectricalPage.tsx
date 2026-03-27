import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  FileCheck2,
  ShieldCheck,
  AlertTriangle,
  Zap,
  ClipboardCheck,
  Settings,
  Plug,
  Sun,
  Battery,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Electrical Guides', href: '/guides' },
  { label: 'Caravan & Motorhome Electrical', href: '/caravan-motorhome-electrical' },
];

const tocItems = [
  { id: 'overview', label: 'Caravan & Motorhome Electrical Overview' },
  { id: 'leisure-batteries', label: 'Leisure Battery Systems' },
  { id: 'solar-charging', label: 'Solar Charging' },
  { id: 'shore-power', label: 'Mains Shore Power Hookup' },
  { id: 'inverters', label: 'Inverters' },
  { id: '12v-systems', label: '12V DC Systems' },
  { id: 'shore-power-safety', label: 'Shore Power Safety' },
  { id: 'maintenance', label: 'Maintenance' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Caravans and motorhomes typically have two separate electrical systems: a 12V DC system (powered by the leisure battery) for lighting, water pump, and controls; and a 230V AC mains system powered from shore power (electric hookup, EHU) or an inverter.',
  'The leisure battery is separate from the vehicle starter battery and is designed for repeated deep discharge. AGM and lithium (LiFePO4) leisure batteries offer advantages over standard lead-acid in terms of depth of discharge and service life.',
  'Solar panels charge the leisure battery via a solar charge controller (MPPT or PWM). MPPT controllers are more efficient — typically 10–30% more energy harvested — and are recommended for panels rated above 100W.',
  'Shore power connections use the blue 16A IEC 60309 (CEE) connector. The connection provides 230V AC at up to 3.68 kW for mains appliances on board. A galvanic isolator fitted to the earth conductor protects against galvanic corrosion of metalwork.',
  'Inverters convert the 12V DC battery supply to 230V AC, allowing mains appliances to be used off-grid. Pure sine wave inverters are required for sensitive electronics and motorised appliances. Modified sine wave inverters are only suitable for simple resistive loads.',
  'Annual electrical safety checks by a competent person — covering the leisure battery condition, 12V wiring, mains hookup socket and cable, RCD operation, and solar system performance — are strongly recommended.',
];

const faqs = [
  {
    question: 'What is the difference between a starter battery and a leisure battery?',
    answer:
      'A starter (cranking) battery is designed to deliver a very high current for a short time to start the vehicle engine. It is not designed to be deeply discharged. A leisure battery is designed for repeated, slow, deep discharge and recharge cycles — supplying current to lights, water pump, heating controls, and other 12V loads over many hours. Using a starter battery as a leisure battery will shorten its life dramatically. Leisure batteries are typically rated in amp-hours (Ah) for a 20-hour discharge rate.',
  },
  {
    question: 'What type of leisure battery is best for a caravan or motorhome?',
    answer:
      'Lead-acid leisure batteries are the traditional choice and are available in flooded, sealed (VRLA), and AGM (absorbent glass mat) formats. AGM batteries tolerate deeper discharge and vibration better than flooded lead-acid and are maintenance-free. Lithium iron phosphate (LiFePO4) batteries offer the best performance — deeper discharge (80% vs 50% for lead-acid), lighter weight, longer cycle life, and faster charging — but at a higher initial cost. For motorhomes and caravans used frequently or for extended off-grid periods, lithium batteries often represent better long-term value.',
  },
  {
    question: 'What is an MPPT solar charge controller and why does it matter?',
    answer:
      'An MPPT (Maximum Power Point Tracking) solar charge controller electronically adjusts the operating point of the solar panel to extract the maximum available power, then converts it to the correct voltage to charge the battery. A PWM (Pulse Width Modulation) controller simply connects the panel to the battery when the panel voltage is sufficient. MPPT controllers typically harvest 10–30% more energy than PWM controllers, especially in partly cloudy conditions or when the panel is not perfectly oriented. For panels rated above 80–100W, MPPT controllers are strongly recommended.',
  },
  {
    question: 'Is a caravan electric hookup connection safe to use?',
    answer:
      'Yes, provided the hookup cable is in good condition, the site supply is properly installed to BS 7671 Section 708, and the caravan\'s mains socket inlet is in good condition. Before connecting, visually inspect the EHU cable for cuts, damaged insulation, or a damaged plug. Ensure the cable is fully uncoiled to prevent overheating. The RCD at the caravan park pitch supply unit provides earth fault protection, but the caravan may also have an internal RCD. If the RCD trips on connection, disconnect immediately and investigate before reconnecting.',
  },
  {
    question: 'What is a galvanic isolator and do I need one?',
    answer:
      'A galvanic isolator is a device fitted in series with the shore power earth conductor that blocks low-level DC galvanic currents while passing AC fault currents safely. Without a galvanic isolator, DC galvanic currents from adjacent boats or caravans connected to the same site earth can flow through the water or ground, causing corrosion of aluminium chassis components, steel frames, and other metalwork over time. A galvanic isolator is strongly recommended for all caravans and motorhomes that regularly use shore power, particularly at marinas. It should comply with BS 8444.',
  },
  {
    question: 'Do I need a pure sine wave inverter?',
    answer:
      'It depends on what you want to power from it. Modified sine wave (MSW) inverters produce a stepped approximation of a sine wave and are adequate for simple resistive loads (incandescent lights, basic heating elements). However, MSW inverters can cause problems with motor-driven appliances (fridges, fans, air conditioning), sensitive electronics (laptops, medical equipment, CPAP machines), and appliances with complex power supplies. Pure sine wave (PSW) inverters produce a true sine wave output identical to the mains supply and are compatible with all appliances. For a motorhome or caravan, a PSW inverter is almost always the correct choice.',
  },
  {
    question: 'How often should a caravan or motorhome electrical system be checked?',
    answer:
      'An annual electrical safety check is strongly recommended for all caravans and motorhomes. The check should include: visual inspection of all 12V wiring for chafing, damage, or corrosion; battery condition test (voltage, capacity, and internal resistance); leisure battery charging system check (converter/charger, solar controller); test of the 230V shore power socket and EHU cable condition; RCD functional test on any internal RCD; inspection of the gas and electrical interface for CO detector and smoke alarm function. For leisure vehicles used frequently or for extended periods, more frequent checks may be appropriate.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/caravan-park-electrical',
    title: 'Caravan Park Electrical (BS 7671 Section 708)',
    description: 'Site-side requirements for caravan park hookup installations — CEE connectors, RCDs, earthing.',
    icon: Plug,
    category: 'Guide',
  },
  {
    href: '/guides/battery-storage-guide',
    title: 'Battery Storage Systems Guide',
    description: 'Leisure and domestic battery storage — technology, sizing, and installation guidance.',
    icon: Battery,
    category: 'Guide',
  },
  {
    href: '/guides/solar-panel-installation',
    title: 'Solar Panel Installation Guide',
    description: 'Solar PV installation — from panels and inverters to grid connection and certification.',
    icon: Sun,
    category: 'Guide',
  },
  {
    href: '/tools/eicr-certificate',
    title: 'EICR Certificate App',
    description: 'Complete electrical inspection reports on your phone with instant PDF export.',
    icon: FileCheck2,
    category: 'Certificate',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Caravan & Motorhome Electrical Systems: An Overview',
    content: (
      <>
        <p>
          Modern caravans and motorhomes contain sophisticated electrical systems that combine
          12V DC and 230V AC technology to provide comfort and convenience whether connected to
          mains shore power or operating off-grid. Understanding how these systems work together
          is essential for safe and effective use — and for the growing number of electricians
          who work on leisure vehicle electrical systems.
        </p>
        <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>12V DC system</strong> — the backbone of the leisure vehicle electrical
                system. Powered from the leisure battery, the 12V system supplies internal
                lighting (typically LED throughout modern vehicles), the water pump, the
                heating system controls, the fridge (12V compressor or absorption cooling),
                ventilation fans, and all 12V sockets and USB charging points.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>230V AC system</strong> — provided when connected to shore power (EHU)
                or when using an inverter. The 230V system supplies mains socket outlets for
                appliances such as kettles, microwaves, hairdryers, and laptop chargers. In
                motorhomes, the 230V system also typically supplies the mains charger
                (converter) that charges the leisure battery from the EHU.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Charging sources</strong> — the leisure battery can be charged from
                multiple sources: the vehicle's alternator via a battery-to-battery (B2B) charger
                while driving; a solar panel via a solar charge controller; from the EHU via the
                mains converter/charger; or from a portable generator via a mains charger.
                Modern energy management systems (EMS) coordinate these sources automatically.
              </span>
            </li>
          </ul>
        </div>
        <p>
          The internal electrical installation of leisure vehicles is not covered by BS 7671.
          It is governed by BS EN 1648-1 (touring caravans) and BS EN 1648-2 (motorhomes),
          which specify the requirements for 12V DC and 230V AC systems within the vehicle.
          The shore power installation at the caravan park is covered by{' '}
          <SEOInternalLink href="/caravan-park-electrical">
            BS 7671 Section 708
          </SEOInternalLink>
          .
        </p>
      </>
    ),
  },
  {
    id: 'leisure-batteries',
    heading: 'Leisure Battery Systems',
    content: (
      <>
        <p>
          The leisure battery is the heart of the 12V electrical system. Choosing the right
          battery type, sizing it correctly for your power requirements, and maintaining it
          properly will determine how many hours of off-grid power you have available.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lead-acid (flooded)</strong> — the traditional leisure battery. Relatively
                low cost, widely available, and recyclable. Should not be discharged below 50%
                of capacity (to around 12.0 V under load). Requires periodic topping-up with
                distilled water if the cell caps are accessible. Produces hydrogen gas during
                charging — must be used in a ventilated locker.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>AGM (Absorbent Glass Mat)</strong> — a sealed lead-acid variant where
                the electrolyte is held in glass fibre mats rather than free liquid. Tolerates
                deeper discharge (down to 50% recommended, 80% maximum), handles vibration
                better, requires no maintenance, and can be mounted in any orientation. Higher
                cost than flooded lead-acid but recommended for motorhomes due to vibration
                tolerance.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Lithium iron phosphate (LiFePO4)</strong> — the premium option.
                Can be discharged to 80% depth of discharge (compared to 50% for lead-acid)
                giving effectively 1.6× the usable capacity from the same nominal Ah rating.
                Significantly lighter, charges faster, and lasts 3–5× as many cycles as
                lead-acid. Requires a lithium-compatible charger and BMS (battery management
                system) and cannot be charged below 0°C without a self-heating version.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Battery className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery sizing</strong> — calculate daily 12V consumption (sum of each
                load in amps × hours of use). Double this figure for lead-acid (to stay above
                50% depth of discharge) or divide by 0.8 for lithium. The result is the minimum
                battery capacity in amp-hours required. Add margin for cloudy solar days or
                reduced alternator charging time.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'solar-charging',
    heading: 'Solar Charging for Caravans and Motorhomes',
    content: (
      <>
        <p>
          Solar panels are now almost universal on touring motorhomes and increasingly fitted
          to static caravans. A well-designed solar system provides free battery charging and
          extends the time between EHU hookups.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Panel types</strong> — monocrystalline panels offer the highest
                efficiency (typically 20–23%) and are best for roof installations where space
                is limited. Flexible (thin-film) panels conform to curved roofs but are less
                efficient (10–15%) and have shorter service lives. Semi-flexible panels
                (monocrystalline cells on a thin backing) offer a compromise.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MPPT vs. PWM controllers</strong> — an MPPT (Maximum Power Point
                Tracking) solar charge controller extracts maximum power from the panels by
                electronically optimising the operating point. A PWM controller applies simple
                pulse-width modulation charging. MPPT controllers are 10–30% more efficient
                and are recommended for any system with panels rated above 80–100W. MPPT
                controllers also allow panels with a higher open-circuit voltage than the
                battery voltage, giving more flexibility in panel selection.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Sun className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Wiring and cable sizing</strong> — solar panel wiring must be rated
                for the short-circuit current of the panel array (typically 1.25× the rated
                short-circuit current). Minimise cable length and use appropriately sized
                cable to limit voltage drop between the panel and the controller. All
                connections must be weatherproof and suitable for outdoor UV exposure.
                MC4 connectors are the industry standard for solar panel wiring.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'shore-power',
    heading: 'Mains Shore Power (Electric Hookup) Connections',
    content: (
      <>
        <p>
          Shore power (electric hookup, EHU) provides 230V AC mains electricity to the caravan
          or motorhome from the site supply. Understanding how the hookup system works and how
          to use it safely is essential for all leisure vehicle owners.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>IEC 60309 (CEE) connectors</strong> — shore power uses the blue 16A
                IEC 60309 connector (the same as at caravan parks and marinas). The blue colour
                indicates 230V single-phase. The earth pin engages first when connecting and
                last when disconnecting. EHU cables are typically 10–25 m long and rated at
                16A. The cable must not be used above its rated current.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Power limitation</strong> — most UK caravan park pitches provide a
                16A supply (maximum 3.68 kW). Be aware that running multiple high-load appliances
                simultaneously (kettle, microwave, fan heater, battery charger) can exceed
                this limit and trip the pitch RCD or MCB. A caravan energy management system
                (EMS) automatically disconnects lower-priority loads to prevent overload.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Plug className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Reverse polarity</strong> — some older or poorly maintained sites have
                reversed polarity on the pitch supply (live and neutral conductors swapped).
                This is a safety hazard as it means switches in the appliance interrupt the
                neutral rather than the live. A simple polarity tester plugged in after hookup
                will detect this immediately. Do not use the supply if reverse polarity is
                indicated — inform the site office.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'inverters',
    heading: 'Inverters: Converting 12V DC to 230V AC',
    content: (
      <>
        <p>
          An inverter converts 12V DC battery power to 230V AC, allowing mains appliances to
          be used when not connected to shore power. Choosing the right type and size of inverter
          is critical for reliable performance.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Pure sine wave vs. modified sine wave</strong> — pure sine wave (PSW)
                inverters produce a smooth 230V AC output identical to the mains supply.
                They are compatible with all appliances. Modified sine wave (MSW) inverters
                produce a stepped approximation that works with simple resistive loads but
                can damage or fail to operate sensitive electronics, variable-speed motors,
                and appliances with switched-mode power supplies.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inverter sizing</strong> — the inverter must be rated to handle the
                peak power demand of all appliances that may be run simultaneously. Inductive
                loads (motors, compressors) have a startup surge of 2–3× their running power.
                As a rule, size the inverter at 1.5–2× the expected running load. Allow for
                inverter efficiency (typically 85–90%) when calculating battery drain.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inverter-charger (combi units)</strong> — a combined inverter-charger
                automatically switches from inverter mode (off-grid) to charger mode (on EHU)
                when shore power is connected. This simplifies the system and provides
                uninterruptible supply transition. Most modern motorhome installations use
                an inverter-charger as the central power management device.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: '12v-systems',
    heading: '12V DC Systems: Wiring and Components',
    content: (
      <>
        <p>
          The 12V DC system is the most complex and varied part of a leisure vehicle's electrical
          installation. Poor 12V wiring — undersized cables, poor connections, inadequate fusing
          — is a common cause of fires in caravans and motorhomes.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable sizing</strong> — 12V DC systems operate at low voltage, which
                means current is high for a given power load. A 60W load at 12V draws 5A;
                the same load at 230V draws only 0.26A. All 12V cables must be sized for the
                maximum current they will carry, accounting for volt drop (typically limited
                to 0.5V or 4% of 12V in leisure vehicle standards) and for continuous rather
                than intermittent duty.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Fusing and circuit protection</strong> — every 12V circuit must be
                individually fused or protected by a circuit breaker as close to the battery
                as practicable. The fuse or circuit breaker rating must not exceed the current
                rating of the cable it protects. A fuse sized to protect the load rather than
                the cable is a common and dangerous mistake in DIY 12V installations.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Battery-to-battery (B2B) chargers</strong> — a B2B charger (also called
                a DC-DC charger) efficiently charges the leisure battery from the vehicle's
                alternator while driving. Unlike a simple split-charge relay, a B2B charger
                provides a controlled multi-stage charge profile suitable for AGM and lithium
                batteries without risk of damaging the alternator or starter battery. Essential
                for lithium battery systems.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'shore-power-safety',
    heading: 'Shore Power Safety: Key Precautions',
    content: (
      <>
        <p>
          Shore power provides a convenient mains supply but introduces electrical hazards that
          must be managed correctly. These are the most important safety practices for using
          shore power at caravan parks, campsites, and marinas.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Inspect the EHU cable before use</strong> — check the entire cable
                for cuts, abrasions, or damage to the outer sheath. Check the plug and socket
                faces for damage, discolouration from heat, or bent pins. A damaged EHU cable
                must be taken out of service. Do not repair EHU cable insulation with tape —
                replace the cable.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Check for reverse polarity</strong> — use a simple plug-in polarity
                tester after every hookup connection. Reverse polarity is a fault condition,
                not a minor inconvenience. It causes switches to interrupt the neutral rather
                than the live, leaving appliance parts live when they appear switched off.
                Do not use the supply if reverse polarity is detected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Do not exceed the pitch current rating</strong> — most pitches are
                rated at 16A (3.68 kW). Running a fan heater (2 kW), a kettle (2 kW), and a
                microwave (1 kW) simultaneously will trip the pitch supply. Be aware of the
                total connected load and manage it within the pitch rating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-blue-400 mt-0.5 shrink-0" />
              <span>
                <strong>Galvanic isolator</strong> — at marinas and motorhome stopovers where
                multiple vehicles share a common earth, fit a galvanic isolator to the shore
                power earth conductor. This protects against galvanic corrosion of chassis
                metalwork caused by DC currents flowing through the common earth.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'maintenance',
    heading: 'Electrical Maintenance for Caravans and Motorhomes',
    content: (
      <>
        <p>
          Regular electrical maintenance extends the life of the electrical system, prevents
          failures at inconvenient times, and most importantly maintains safety. These are the
          key maintenance tasks for caravan and motorhome owners.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Settings className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Annual Pre-Season Check</h4>
                <p className="text-white text-sm leading-relaxed">
                  Before the first outing of the season, carry out or commission an annual
                  electrical check covering: leisure battery capacity and condition; all 12V
                  connections for corrosion; solar panel output; EHU cable and inlet socket
                  condition; RCD functional test (press the test button — the RCD must trip);
                  smoke detector and CO alarm battery replacement.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <Battery className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Winter Storage Battery Care</h4>
                <p className="text-white text-sm leading-relaxed">
                  Lead-acid leisure batteries must not be left in a discharged state during
                  winter storage — sulphation will permanently reduce capacity. Either keep the
                  battery connected to a maintenance charger throughout winter, or remove the
                  battery and store it on a maintenance charger in a frost-free location. Lithium
                  batteries should be stored at approximately 50% charge in a cool, dry location.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Professional Annual Inspection</h4>
                <p className="text-white text-sm leading-relaxed">
                  An annual professional electrical inspection by a qualified electrician
                  experienced in leisure vehicle electrics provides peace of mind and may be
                  a requirement of some insurance policies. The inspection should cover both
                  the 12V DC and 230V AC systems and result in a written report. Use the{' '}
                  <SEOInternalLink href="/tools/eicr-certificate">
                    Elec-Mate certificate app
                  </SEOInternalLink>{' '}
                  to generate professional inspection reports on site.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Caravan & motorhome electrical checks made simple with Elec-Mate"
          description="Join 430+ UK electricians using Elec-Mate for on-site inspection reporting, test result recording, and instant PDF export. Ideal for leisure vehicle annual electrical checks. 7-day free trial."
          icon={FileCheck2}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function CaravanMotorHomeElectricalPage() {
  return (
    <GuideTemplate
      title="Caravan & Motorhome Electrical Guide UK | 12V & 230V Systems"
      description="Complete guide to caravan and motorhome electrical systems — leisure batteries, solar charging, mains hookup, inverters, 12V DC systems, shore power safety, and maintenance. UK standards and practical advice."
      datePublished="2026-03-27"
      dateModified="2026-03-27"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Electrical Guide"
      badgeIcon={Battery}
      heroTitle={
        <>
          Caravan & Motorhome Electrical Guide UK:{' '}
          <span className="text-yellow-400">12V & 230V Systems</span>
        </>
      }
      heroSubtitle="Everything you need to know about caravan and motorhome electrical systems — leisure batteries, solar charging with MPPT controllers, mains shore power hookup, pure sine wave inverters, 12V DC wiring, shore power safety, and annual maintenance."
      readingTime={13}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Caravan and Motorhome Electrical Systems"
      relatedPages={relatedPages}
      ctaHeading="Complete Leisure Vehicle Electrical Inspections on Your Phone"
      ctaSubheading="Join 430+ UK electricians using Elec-Mate for on-site inspection reporting, test result recording, and instant PDF export. Perfect for caravan and motorhome annual electrical checks. 7-day free trial."
    />
  );
}
