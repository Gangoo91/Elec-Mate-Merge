import { ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  LearningOutcomes,
  ContentEyebrow,
  SectionRule,
  Pullquote,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';
import { HeatPumpControls } from '@/components/study-centre/diagrams/renewableGapKit';

const inlineChecks = [
  {
    id: 'm8s7-oat-sensor',
    question:
      'What is the Outside Air Temperature (OAT) sensor + why is it electrically wired?',
    options: [
      'It feeds outdoor temperature to the controller for weather compensation and defrost — 2-core LV screened cable',
      'It is a frost-protection thermostat that only switches the outdoor unit trace heater on below 0 °C',
      'It is a backup sensor for the cylinder, reading outdoor air only when the cylinder probe fails',
      'It measures discharge-air temperature at the fan outlet, so it is mounted directly in the fan stream',
    ],
    correctIndex: 0,
    explanation:
      'Outside Air Temperature (OAT) sensor is the heat pump controller’s outdoor temperature input. Drives multiple control functions: (1) Weather compensation — primary flow temperature setpoint based on outdoor temperature (colder outside → higher primary flow to compensate for greater building heat loss; warmer → lower primary flow to maintain efficiency); (2) Defrost cycle scheduling — frost build-up correlates with outdoor temperature + humidity; controller schedules defrost based on outdoor conditions + coil temperature; (3) COP optimisation — controller adjusts compressor speed (VSD) to maintain target COP at the current outdoor temperature. Electrical install: typically 2-core LV screened cable from outdoor sensor to indoor controller. Mounting position critical: shaded north or east wall (avoid direct sun heating the sensor), away from heat sources (extract vents, outdoor unit fan exhaust), at least 2-3 m from outdoor unit (to read true ambient not unit-affected). Cert evidence bundle records the sensor location + cable run + functional verification at commissioning.',
  },
  {
    id: 'm8s7-opentherm-ebus',
    question:
      'OpenTherm vs EBus vs manufacturer-proprietary controls — what are they?',
    options: [
      'OpenTherm and EBus are the same open standard under two brand names, both fully vendor-neutral',
      'They are three competing 24 V doorbell-style wiring methods, differing only in conductor colour',
      'OpenTherm is an open third-party-compatible standard; EBus is Vaillant/Bosch; Daikin/MELCloud/myUplink lock the vendor',
      'They are 230 V mains zone-valve wiring standards, not low-voltage communication protocols',
    ],
    correctIndex: 2,
    explanation:
      'Heat pump ↔ thermostat communication protocols: (1) OpenTherm — open-standard 2-wire bidirectional protocol (developed by Honeywell, now industry standard). Widely supported by third-party smart thermostats (Tado, Hive, Nest, Honeywell evohome, Drayton Wiser, Worcester Bosch Wave). Customer-facing benefit: choice of thermostat brand independent of heat pump brand. (2) EBus — Vaillant + Bosch proprietary 2-wire protocol. Higher-bandwidth than OpenTherm; supports advanced control features. Restricted to vendor-compatible thermostats. (3) Manufacturer-proprietary buses: Daikin P1 P2 (2-wire); Mitsubishi MELCloud (Wi-Fi-based for app integration); NIBE myUplink (similar); Vaillant multiMATIC. Vendor ecosystem lock-in. UK 2025-26 install reality: customer may prefer third-party thermostat → choose heat pump with OpenTherm support; customer may want full integrated app → use proprietary bus + manufacturer app. Cable: 2-core LV screened typical (0.5-0.75 mm² conductor). Cert evidence bundle records the protocol + cable type + commissioning verification.',
  },
  {
    id: 'm8s7-zone-valves',
    question:
      'Zone valves + multi-zone heating — what does the electrical installer wire?',
    options: [
      'Only a low-voltage signal wire to each valve, since the spring-return motor takes power from the thermostat',
      'Nothing electrical — zone valves are entirely thermo-mechanical, operating from the primary water temperature',
      'A direct mains feed from the consumer unit to each valve, with no wiring centre or auxiliary switch at all',
      '230 V AC 2-port valves wired (L, N, E + aux switch) to the wiring centre, the aux switch confirming open before flow',
    ],
    correctIndex: 3,
    explanation:
      'Multi-zone heating system electrical scope: (1) 230 V AC zone valves typical (2-port spring-return motor, e.g. Honeywell V4043, Drayton ZV2, Esbe SRZ). Each valve opens/closes to direct primary flow to a specific zone. (2) Zone thermostats sense zone demand (typically wired-thermostat to receiver/wiring centre + zone valve, or wireless thermostat via app). (3) Wiring centre — junction box / control board where zone thermostats + zone valves + heat pump controller all interconnect. UK 2025-26 typical: Honeywell wiring centre / Drayton equivalent. (4) Heat pump controller integration — when any zone calls for heat, controller starts compressor + opens relevant zone valve; auxiliary switch on zone valve confirms position before compressor flows primary water. Wiring: 5-core flex from each zone valve to wiring centre (L, N, E, control wire, auxiliary switch wire); thermostat 2-3 core to wiring centre; primary heat pump controller integration via OpenTherm / EBus / proprietary protocol. Cert evidence bundle: zone valve circuit EICs + wiring centre commissioning + functional test of each zone.',
  },
  {
    id: 'm8s7-smart-meter-integration',
    question:
      'Smart meter integration with heat pump for time-of-use tariff optimisation?',
    options: [
      'The smart meter physically disconnects the heat pump outside cheap hours via its own main contactor',
      'The controller reads an ALCS relay or Wi-Fi tariff API and runs priority in cheap hours — not BS 7671 normative',
      'The DNO remotely switches the heat pump on and off to match the tariff windows over the supply itself',
      'The customer must manually switch the heat pump on and off at the cheap hours every single day',
    ],
    correctIndex: 1,
    explanation:
      'Smart meter + time-of-use tariff integration with heat pump: (1) ALCS (Auxiliary Load Control Switch) — relay signal from the smart meter / SMETS2 IHD (In-Home Display) indicating cheap-tariff hours. Heat pump controller reads ALCS → schedules compressor + immersion priority during cheap hours. (2) Wi-Fi + tariff API integration — heat pump controller connects to the customer’s Wi-Fi + reads the energy supplier’s API for live tariff prices (e.g. Octopus Cosy tariff: 3 cheap windows per day at specific hours; Octopus Heat Pump tariff: continuous cheap rate for heat pump-specific MPAN). Controller schedules accordingly. UK 2025-26 tariffs: Octopus Cosy (cheap windows for heat pump), Octopus Heat Pump (dedicated heat pump tariff at lower rate continuous), British Gas Future Energy Saver, similar. Not BS 7671 normative — operational layer above the electrical install. Cert evidence bundle: smart meter MPAN + tariff in use + controller integration verified + customer education.',
  },
];

const quizQuestions = [
  {
    question:
      'Standard UK 2025-26 heat pump controls install — what wiring scope?',
    options: [
      'Indoor controller, OAT sensor, cylinder and zone thermostats, 230 V zone valves and smart-meter interface — LV signal plus mains',
      'Just a single mains feed to the outdoor unit, with all sensing handled internally by the heat pump',
      'Only the OAT sensor and the indoor controller; thermostats and zone valves are the plumber’s scope',
      'A controller and zone valves only, since OAT sensing and smart-meter input are added by the supplier later',
    ],
    correctAnswer: 0,
    explanation:
      'Standard UK 2025-26 heat pump controls electrical scope: (1) Indoor controller (manufacturer model — Vaillant multiMATIC VR70 / VR91, Mitsubishi MELCloud WiFi adapter + RC remote, Daikin Onecta interface, NIBE myUplink etc.). (2) OAT sensor outdoor — 2-core LV screened cable, north / east shaded wall location. (3) Cylinder thermostats (1 or 2 sensors) — 2-core LV at cylinder. (4) Zone thermostats — wired or wireless to wiring centre / receiver; OpenTherm / EBus / proprietary protocol to heat pump controller. (5) Zone valves — 230 V AC via wiring centre; 5-core flex from each. (6) Smart meter interface — ALCS relay or Wi-Fi (heat pump controller on customer’s Wi-Fi network). (7) Customer-facing display / app. Wiring practice: LV signal wiring (controller + sensors + protocol) on dedicated controls way at CU (low-current 6 A RCBO typical); 230 V mains wiring for zone valves on separate way. Wiring centre / junction box near cylinder location typical. Cert evidence bundle: per-circuit EIC + commissioning test of each zone + functional verification.',
  },
  {
    question:
      'OAT sensor mounting — what location is correct vs incorrect?',
    options: [
      'On a south-facing wall in full sun, keeping it accessible and letting it average the daytime warmth',
      'A shaded north/east wall, 2-3 m from the unit, clear of sun, extract vents and ground-level snow',
      'Inside a warm porch, where it is sheltered from the weather and protected from impact damage',
      'Directly above the outdoor unit fan, so it tracks the air the heat pump is actually drawing in',
    ],
    correctAnswer: 1,
    explanation:
      'OAT sensor mounting location critically affects controller accuracy + heat pump efficiency. CORRECT: shaded north or east wall (no direct sun); 2-3 m from outdoor unit (avoid unit-affected air); away from extract vents / kitchen flues / dryer vents (avoid warm exhaust); at least 1 m above ground (avoid snow burial + soil-temperature effects); exposed to genuine outdoor ambient air. INCORRECT: south-facing wall in summer sun (reads 5-10 °C false high → controller thinks outdoor warmer than it is → reduces primary flow temperature → customer cold); near outdoor unit fan exhaust (fan circulating heat-pumped-or-condensed air → false reading varies with cycle phase); inside porch / sheltered area (reads warmer than open air); behind / under cladding (reads building-fabric temperature not air temperature). Cert evidence bundle records the location + photograph + commissioning verification (compare sensor reading to a known thermometer reading in the open air at commissioning).',
  },
  {
    question:
      'Customer wants Tado / Nest / Hive smart thermostat — which heat pump protocols are compatible?',
    options: [
      'Any smart thermostat works with any heat pump, because they all share a common 230 V switching interface',
      'Tado/Nest/Hive work only with proprietary buses; OpenTherm units must use the manufacturer app instead',
      'OpenTherm heat pumps work with Tado/Nest/Hive via a bridge; EBus-only or proprietary units use the vendor app',
      'Compatibility depends only on Wi-Fi band, so a 2.4 GHz thermostat pairs with any heat pump regardless of protocol',
    ],
    correctAnswer: 2,
    explanation:
      'OpenTherm is the key protocol for third-party smart thermostat compatibility. OpenTherm-compatible heat pumps work with: Tado, Nest (3rd gen + Learning + Heat Link), Hive, Honeywell evohome, Drayton Wiser, Worcester Bosch Wave, Salus — typically via OpenTherm gateway / bridge accessory. UK 2025-26 OpenTherm-supportable heat pumps (verify per model + accessory): Worcester Bosch (some models, native OpenTherm), Viessmann Vitocal (some models). Vaillant aroTHERM Plus uses EBus natively (multiMATIC + sensoCOMFORT controllers); OpenTherm interface available via bridge accessory if needed. EBus-only or proprietary-only: Daikin (P1/P2 + Daikin Onecta app); Mitsubishi Ecodan (MELCloud app + remote controller); NIBE F2120 (myUplink app). For these heat pumps, customer uses vendor’s app for thermostat function — Tado / Nest / Hive direct integration not supported. Customer education at quote stage: confirm thermostat preference + match heat pump model. Cert evidence bundle: heat pump model + protocol + chosen thermostat + commissioning verification of communication.',
  },
  {
    question:
      'Wiring centre + heat pump install — what is it + where?',
    options: [
      'Another name for the consumer unit at the origin, where all the heat pump circuits are protected',
      'The outdoor isolator enclosure, which doubles as the interconnection point for all the control wiring',
      'A weatherproof box mounted outdoors beside the heat pump, housing the zone-valve relays and thermostats',
      'A junction box near the cylinder where thermostats, zone valves and the controller interconnect via a terminal strip',
    ],
    correctAnswer: 3,
    explanation:
      'Wiring centre is the central electrical interconnection point for the heat pump system controls. Typical location: near the cylinder (utility / plant room / airing cupboard) for short cable runs to cylinder thermostats + zone valves + nearby zones. UK 2025-26 typical products: Honeywell ST9420C (single-channel) or ST9520C (two-channel); Drayton wiring centre equivalents. Contents: (1) terminal strip / DIN rail for all incoming + outgoing wiring; (2) neutral + earth bus bars; (3) dedicated relays for zone valve control (typically 230 V AC coils controlled by 24 V signal from thermostat); (4) auxiliary switch return terminals (zone valve confirms open before flow); (5) cable entry glands. Wiring: thermostat connections in (2-3 core LV); zone valve connections out (5-core flex 230 V); heat pump controller protocol connection (OpenTherm / EBus / proprietary); cylinder thermostats in. Cert evidence bundle: wiring centre product + commissioning + per-circuit functional test.',
  },
  {
    question:
      'Customer-facing controller / app — what does the electrical installer commission?',
    options: [
      'Only mount the controller; Wi-Fi and app pairing are left for the customer to complete after handover',
      'Mount the controller, connect home Wi-Fi, link the vendor app to the serial, verify a setpoint change reaches the unit',
      'Only pair the app; the controller is pre-mounted and pre-wired by the cylinder manufacturer on delivery',
      'Configure the app on the installer’s own phone and account, then transfer ownership to the customer remotely',
    ],
    correctAnswer: 1,
    explanation:
      'Customer-facing controller + app commissioning: (1) Indoor controller hardware mounting — touchscreen or button display at convenient location (typically hallway 1.4-1.5 m mounting height, away from heat sources, away from direct sun on the display). (2) Wi-Fi configuration — heat pump controller connected to customer’s home Wi-Fi network (5 GHz or 2.4 GHz per manufacturer spec). Cellular backup for some controllers (rare). (3) App installation — customer downloads vendor app on smartphone (Vaillant multiMATIC, Mitsubishi MELCloud, Daikin Onecta, NIBE myUplink, Mixergy app etc.); links account to the specific heat pump serial. (4) Functional verification — temperature setpoint change via app reflected at heat pump within seconds; status visible (compressor running / OAT reading / cylinder temp / running cost); error notifications working. (5) Customer handover education — app interface walk-through + tariff integration (if applicable) + override scenarios (heat pump priority, immersion-only emergency use). Cert evidence bundle: app integration verified + customer handover documentation.',
  },
  {
    question:
      'Heat pump controls failure mode — what happens if controls Wi-Fi / app goes offline?',
    options: [
      'The heat pump keeps running on its cached schedule and local controller; only remote app control and monitoring are lost',
      'The heat pump stops the moment Wi-Fi is lost, because the controller needs the cloud to authorise the compressor',
      'Heating stops until an engineer re-pairs the app, as the local controller holds no schedule of its own',
      'The unit drops to immersion-only operation, since the compressor cannot run without the tariff API',
    ],
    correctAnswer: 0,
    explanation:
      'Heat pump controls failure mode (Wi-Fi / app offline): heat pump continues operating per the cached schedule + local controller. The compressor + immersion + zone valves + thermostats all operate via the local wiring centre + heat pump controller — independent of cloud / app. Customer loses: remote setpoint change via app; remote monitoring; cloud-based tariff updates (some controllers); over-the-air firmware updates. Customer retains: local manual override via indoor controller; existing schedule continues; smart meter ALCS signal continues (hardware relay independent of Wi-Fi); compressor + zone valves + immersion all function. BS 7671 protective architecture unaffected by controls failure: RCD trip-time, ADS, fault current detection all hardware-level. Cert evidence bundle: fall-back behaviour documented for customer education + handover. This is the OPPOSITE pattern to some commercial OCPP-EV installs where loss of CPMS network can affect operation; heat pump fall-back is robust by design.',
  },
];

const faqs = [
  {
    question: 'Where do the heat pump controls connect in the CU?',
    answer:
      'Dedicated LV controls way at CU: 6 A Type A RCBO C-curve typical (low current — controller + sensors + thermostats draw very little). Some installers use the heat pump dedicated circuit for controls power too (integrated within manufacturer wiring). Zone valves at 230 V AC on separate 6-10 A way. Wiring centre powered from the controls way. Cert evidence bundle records the architecture.',
  },
  {
    question: 'Wireless thermostat vs wired — which is better?',
    answer:
      'Operational decision driven by customer preference + house layout. Wired (2-3 core LV) most reliable + no battery to change. Wireless (battery-powered transmitter to receiver / wiring centre) easier retrofit + flexible location. UK 2025-26 hybrid often: wired thermostats in main rooms, wireless extra zones if needed. Cert evidence bundle records the topology.',
  },
  {
    question: 'Octopus Cosy tariff — heat pump controller integration?',
    answer:
      'Tariff has 3 cheap windows per day at specific hours (changes seasonally). Some heat pump controllers integrate directly via Wi-Fi + tariff API (auto-schedule compressor + immersion priority during cheap windows). Others rely on customer-set schedule. UK 2025-26 emerging: native Octopus integration on certain controllers (Mixergy app + Vaillant + others). Cert evidence bundle: tariff + controller integration verified.',
  },
  {
    question: 'Heat pump on a smart EV-tariff like Octopus Go — sensible?',
    answer:
      'Single 4-hour cheap window per day (00:30-04:30 typical 2025-26). Heat pump compressor + immersion run priority during the window; cylinder over-heat slightly to coast through expensive hours; controller schedules accordingly. Works best with larger cylinder (~250 L+) for thermal buffer. EV + heat pump shared tariff makes economic sense for properties with both. Cert evidence bundle records the tariff + scheduling.',
  },
  {
    question: 'EICR finding: OAT sensor on south-facing wall in sun?',
    answer:
      'C3 (improvement recommended) — not a safety issue but reduces heat pump efficiency. Recommendation: relocate sensor to shaded north / east wall at least 1 m above ground. Cost: ~£100-200 labour for relocation. Customer’s heating bill reduction over years more than pays back. Cert evidence bundle records the finding + recommended remediation.',
  },
];

export default function RenewableEnergyModule8Section7() {
  const navigate = useNavigate();

  useSEO({
    title: 'Controls + electrical interface | Renewable Energy 8.7 | Elec-Mate',
    description:
      'Heat pump controls + electrical interface — OAT sensor mounting + wiring, OpenTherm / EBus / proprietary protocols, zone valves + wiring centre, smart-meter ALCS + tariff integration, customer-facing controller + app, wired vs wireless thermostat.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-8')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 8
          </button>

          <PageHero
            eyebrow="Module 8 · Section 7 · Controls + electrical interface · Operational layer above BS 7671"
            title="Controls + electrical interface"
            description="Heat pump control system electrical scope — Outside Air Temperature (OAT) sensor, weather compensation, OpenTherm / EBus / proprietary protocols, zone valves + wiring centre, smart-meter integration + time-of-use tariff coordination, customer-facing controller + app."
            tone="yellow"
          />

          <TLDR
            points={[
              'Heat pump controls are an operational layer above BS 7671 wiring regs. Reg 314 dedicated controls way + Reg 411.4 ADS + Reg 415.1.1 30 mA RCD apply to the controls circuit; the protocols + sensors + app are not BS 7671 normative.',
              'OAT sensor: outdoor temperature input driving weather compensation + defrost cycle scheduling + COP optimisation. Mounting north / east shaded wall, 2-3 m from outdoor unit.',
              'OpenTherm: open-standard protocol enabling third-party smart thermostat compatibility (Tado, Nest, Hive, Honeywell). Worcester Bosch + Viessmann support some models natively; Vaillant uses EBus natively + OpenTherm via bridge accessory.',
              'EBus: Vaillant + Bosch proprietary. Manufacturer-proprietary buses: Daikin P1/P2, Mitsubishi MELCloud, NIBE myUplink. Vendor ecosystem lock-in.',
              'Zone valves: 230 V AC spring-return motor; opens/closes primary flow to zones. Wiring centre interconnects thermostats + valves + heat pump controller.',
              'Wiring centre (Honeywell ST9520C or similar): terminal strip + relays + auxiliary switch returns. Located near cylinder typical.',
              'Smart meter ALCS + tariff integration: heat pump controller schedules compressor + immersion during cheap-tariff hours. Octopus Cosy / Heat Pump tariff common.',
              'Customer-facing app: vendor-specific (Vaillant multiMATIC, MELCloud, Daikin Onecta, NIBE myUplink, Mixergy). Wi-Fi commissioning + customer education.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Wire + mount the OAT sensor correctly (north / east shaded wall, 2-3 m from outdoor unit).',
              'Distinguish OpenTherm vs EBus vs manufacturer-proprietary protocols + thermostat compatibility.',
              'Install + wire zone valves + wiring centre integration.',
              'Apply Reg 314 dedicated controls way + protective devices.',
              'Configure smart meter ALCS + Wi-Fi tariff integration where applicable.',
              'Commission customer-facing controller + app + customer handover education.',
              'Identify controls failure modes + heat pump fall-back behaviour.',
              'Document controls install in cert evidence bundle.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            Controls are where the heat pump install meets the customer’s daily experience. The wiring is small-conductor low-current; the customer-facing impact is everything.
          </Pullquote>

          <ContentEyebrow>OAT sensor + weather compensation</ContentEyebrow>

          <ConceptBlock
            title="Outside Air Temperature (OAT) sensor"
            plainEnglish="OAT sensor measures outdoor air temperature. The heat pump controller uses OAT to: drive weather compensation (primary flow temperature setpoint based on outdoor temperature); schedule defrost cycles (frost build-up correlates with OAT + humidity); optimise compressor speed for current COP. Mounting location critical — sensor must read TRUE ambient air."
            onSite="2-core LV screened cable from outdoor sensor location to indoor controller. Sensor mounted north or east shaded wall, 2-3 m from outdoor unit, away from heat sources + direct sun. At least 1 m above ground (avoid snow / soil temperature). Cert evidence bundle records the location."
          >
            <p>OAT sensor install considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Sensor type</strong> — NTC
                thermistor typical (negative temperature coefficient — resistance drops
                as temperature rises). 10 kΩ at 25 °C reference is the manufacturer
                standard. Some manufacturers use proprietary sensors — match to model
              </li>
              <li>
                <strong className="text-white">Cable</strong> — 2-core LV
                screened cable (0.5-0.75 mm² conductor typical). Screen earthed at one
                end (controller end). Resistance over the cable run adds to sensor
                impedance — long runs may need calibration adjustment
              </li>
              <li>
                <strong className="text-white">Mounting
                  location</strong> — north or east wall (shaded from south-westerly sun
                in UK); 2-3 m from outdoor unit (avoid unit-affected air); away from
                kitchen / dryer / bathroom vents; at least 1 m above ground; exposed
                to genuine outdoor ambient
              </li>
              <li>
                <strong className="text-white">Mounting
                  hardware</strong> — typically a small enclosure with cable entry
                gland, screwed to the wall. IPX4 minimum (splash resistance). Bracket
                holds sensor 50-100 mm off the wall to avoid wall thermal mass effect
              </li>
              <li>
                <strong className="text-white">Avoid INCORRECT
                  locations</strong> — south-facing in direct sun (false high in summer
                — controller thinks outdoor warmer); near extract vents (false high
                from warm exhaust); behind cladding (reads building fabric); inside
                porch / sheltered area (reads false warm)
              </li>
              <li>
                <strong className="text-white">Functional
                  verification at commissioning</strong> — compare sensor reading to a
                known thermometer in open air at commissioning. ±1 °C typical
                acceptable. If reading deviates significantly: investigate location +
                cable + connections
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — sensor model + cable type + length + mounting
                location photograph + commissioning verification reading
              </li>
            </ul>
          </ConceptBlock>

          <HeatPumpControls caption="The power side and volt-free control interface the electrician owns — and where it meets the heat engineer." />

          <ConceptBlock
            title="Weather compensation logic"
            plainEnglish="Weather compensation = primary flow temperature setpoint dynamically adjusted based on outdoor temperature. Colder outside → higher primary flow (compensates for greater building heat loss). Warmer outside → lower primary flow (maintains efficiency). Curve programmed at commissioning to match building heat loss characteristic."
            onSite="The compensation curve is the single biggest determinant of customer comfort + heat pump efficiency. Sloped graph: outdoor temperature on X-axis, primary flow temperature on Y-axis. Steeper curve = more heat output as outdoor drops (suits poorly insulated buildings); shallower curve = less compensation (suits well-insulated buildings). UK 2025-26 commissioning best practice: configure curve initially from manufacturer default; fine-tune over the first heating season."
          >
            <p>Weather compensation curve elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Outdoor temperature
                  range</strong> — typically -10 °C to +20 °C across the curve
              </li>
              <li>
                <strong className="text-white">Primary flow
                  range</strong> — typically 30 °C (mild outdoor) to 55 °C (very cold
                outdoor). Lower flow temperature = higher COP
              </li>
              <li>
                <strong className="text-white">Curve slope</strong> —
                steeper for poor insulation (more compensation as outdoor drops);
                shallower for good insulation (less compensation needed)
              </li>
              <li>
                <strong className="text-white">Parallel
                  shift</strong> — vertical offset of the curve. Customer adjusts via
                "comfort" or "temperature" control to fine-tune indoor temperature
                during the heating season
              </li>
              <li>
                <strong className="text-white">Design
                  temperature</strong> — point on curve where building reaches its
                design indoor temperature at design outdoor temperature (typically
                -3 °C to -5 °C UK design outdoor). MCS sizing process determines
              </li>
              <li>
                <strong className="text-white">First-season
                  tuning</strong> — installer / customer adjusts curve over the first
                heating season based on comfort + bill experience. Many installers
                schedule a 6-month review visit
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — initial curve configuration + design temperature +
                customer comfort temperature setpoint + post-tuning curve if revisited
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 314 + Reg 411.4 + Reg 415.1.1 — applied to controls circuit"
            clause="Reg 314.1 division of installation; Reg 411.4 ADS in TN systems; Reg 415.1.1 30 mA additional protection. Apply to the heat pump controls circuit (typically a dedicated 6 A way at CU) and to the zone valve circuit (typically a separate 6-10 A way at 230 V AC)."
            meaning="Heat pump controls are an operational layer above BS 7671 — but the supply circuits feeding the controls are firmly within BS 7671 scope. Reg 314: dedicated LV controls way at CU (6 A Type A RCBO C-curve typical; low current — controller + sensors + thermostats draw very little); separate way for 230 V AC zone valves (6-10 A typical). Reg 411.4: ADS verified at each way. Reg 415.1.1: 30 mA additional protection. The protocols (OpenTherm, EBus, manufacturer buses), sensor types (OAT, cylinder thermostats), customer-facing app, smart meter integration — these are NOT BS 7671 normative. Cert evidence bundle records: dedicated controls way + dedicated zone valve way + per-circuit Part 6 verification + functional test of each control element."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Protocols + zone valves + wiring centre</ContentEyebrow>

          <Pullquote>
            OpenTherm is the open door. EBus is the Vaillant garden. Daikin / Mitsubishi / NIBE are their own walled cities. The customer’s thermostat choice depends on which gate is open.
          </Pullquote>

          <ConceptBlock
            title="Heat pump ↔ thermostat communication protocols"
            plainEnglish="Three protocol families dominate UK 2025-26 heat pump install. OpenTherm: open-standard 2-wire bidirectional; widely third-party thermostat compatible. EBus: Vaillant + Bosch proprietary 2-wire; restricted to vendor-compatible thermostats. Manufacturer-proprietary: Daikin P1/P2, Mitsubishi MELCloud (Wi-Fi), NIBE myUplink, etc. Vendor ecosystem lock-in."
            onSite="Customer thermostat preference + heat pump model choice are joint decisions at quote stage. If customer wants Tado / Nest / Hive: choose OpenTherm-compatible heat pump. If customer wants integrated vendor app: use proprietary bus + vendor app. Verify protocol declared in heat pump install manual."
          >
            <p>Protocol comparison:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">OpenTherm</strong> — open
                standard developed by Honeywell, now industry-supported. 2-wire
                bidirectional. Widely third-party thermostat compatible (Tado, Nest 3rd
                gen + Learning + Heat Link, Hive, Honeywell evohome, Drayton Wiser,
                Worcester Bosch Wave, Salus). UK 2025-26 OpenTherm-compatible heat
                pumps: Vaillant aroTHERM Plus (some), Worcester Bosch (some),
                Viessmann Vitocal (some). Verify per model
              </li>
              <li>
                <strong className="text-white">EBus</strong> — Vaillant + Bosch
                proprietary 2-wire. Higher-bandwidth than OpenTherm; supports advanced
                control features. Restricted to vendor-compatible thermostats
                (Vaillant multiMATIC, Bosch CT200)
              </li>
              <li>
                <strong className="text-white">Daikin
                  proprietary</strong> — P1/P2 2-wire bus. Daikin Onecta thermostats +
                interface. Daikin Onecta app integration
              </li>
              <li>
                <strong className="text-white">Mitsubishi
                  MELCloud</strong> — Wi-Fi-based for app integration; MELCloud app +
                MELCloud WiFi adapter (WF-RAC); remote controller hard-wired separately
                (PAR-32MAA / PAR-21MAA series). Older Mitsubishi protocols proprietary
              </li>
              <li>
                <strong className="text-white">NIBE myUplink</strong>
                — proprietary 2-wire bus + Wi-Fi for app. Restricted to NIBE
                accessories
              </li>
              <li>
                <strong className="text-white">Hybrid integrations</strong>
                — some heat pumps support both OpenTherm + manufacturer bus
                simultaneously; customer can use either. Less common
              </li>
              <li>
                <strong className="text-white">Cable + wiring</strong>
                — 2-core LV screened (typically 0.5-0.75 mm² conductor) for any
                protocol; screen earthed at one end. Run length limits per manufacturer
                spec
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — protocol declared + chosen thermostat + commissioning
                verification of communication
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Zone valves + wiring centre"
            plainEnglish="Zone valves: 230 V AC spring-return motor opening / closing primary flow to specific zones. Wiring centre: junction box / control board interconnecting zone thermostats + zone valves + heat pump controller + cylinder thermostats. UK 2025-26 typical product: Honeywell ST9420C / ST9520C wiring centre."
            onSite="Wiring centre typically near cylinder location (utility / plant room / airing cupboard). Each zone valve has 5-core flex (L, N, E, control wire, auxiliary switch wire); thermostat 2-3 core; heat pump controller protocol cable. All terminated at the wiring centre."
          >
            <p>Zone valves + wiring centre architecture:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Zone valve
                  type</strong> — 2-port spring-return motor typical (Honeywell V4043,
                Drayton ZV2, Esbe SRZ). 230 V AC coil; spring closes valve on
                de-energise. Auxiliary switch confirms valve open before primary flow
              </li>
              <li>
                <strong className="text-white">Zone valve flex</strong> —
                5-core 0.75 mm² flex from each zone valve back to wiring centre. L, N,
                E, control wire (energises coil), auxiliary switch return wire
              </li>
              <li>
                <strong className="text-white">Wiring centre</strong> —
                Honeywell ST9420C (single-channel) or ST9520C (two-channel) typical UK
                2025-26 product. Drayton wiring centre equivalent. Houses terminal
                strip + neutral / earth bus + relays for zone valve control
              </li>
              <li>
                <strong className="text-white">Thermostat
                  wiring</strong> — wired thermostat 2-3 core LV to wiring centre.
                Wireless thermostat via receiver / wiring centre (battery transmitter
                at thermostat + plug-in receiver near wiring centre)
              </li>
              <li>
                <strong className="text-white">Heat pump
                  controller integration</strong> — protocol cable (OpenTherm / EBus /
                proprietary) from wiring centre to heat pump controller. Wiring centre
                relays the zone demand to compressor + opens relevant zone valve
              </li>
              <li>
                <strong className="text-white">Functional test
                  sequence</strong> — at commissioning, exercise each zone individually:
                thermostat call → wiring centre relay → zone valve coil energises →
                spring opens valve → auxiliary switch confirms → primary flow
                directed; on demand-met: valve de-energises → spring closes →
                auxiliary switch returns → primary flow re-directed
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — wiring centre product + zone valve product per zone
                + thermostat per zone + functional test result per zone
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Smart meter ALCS + Wi-Fi tariff integration"
            plainEnglish="UK SMETS2 smart meters include an Auxiliary Load Control Switch (ALCS) — a relay output that signals cheap-tariff hours. Some heat pump controllers read ALCS to schedule compressor + immersion priority during cheap windows. Alternative: Wi-Fi + tariff API integration (heat pump controller reads live tariff prices)."
            onSite="UK 2025-26 tariffs supporting heat pump optimisation: Octopus Cosy (3 cheap windows per day); Octopus Heat Pump (dedicated heat pump MPAN at lower continuous rate); British Gas Future Energy Saver; Ovo Heat Pump Plus. Tariff + controller compatibility varies — verify per model."
          >
            <p>Smart meter + tariff integration:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">ALCS</strong> — Auxiliary
                Load Control Switch. Relay output from SMETS2 smart meter / IHD. Signals
                cheap-tariff hours via contact closure
              </li>
              <li>
                <strong className="text-white">ALCS wiring</strong> —
                from smart meter / IHD to heat pump controller dedicated input. 2-core
                LV signal cable. Heat pump controller schedules accordingly
              </li>
              <li>
                <strong className="text-white">Wi-Fi tariff
                  API</strong> — heat pump controller on customer’s Wi-Fi reads live
                tariff prices from the energy supplier’s API. UK 2025-26 emerging
                for some controllers (Mixergy app, Vaillant multiMATIC with smart
                tariff plugin)
              </li>
              <li>
                <strong className="text-white">Octopus Cosy</strong>
                — 3 cheap-tariff windows per day at specific hours (changes seasonally).
                Heat pump compressor + immersion priority during windows
              </li>
              <li>
                <strong className="text-white">Octopus Heat Pump
                  tariff</strong> — dedicated heat pump MPAN; entire heat pump load on a
                separate meter at lower continuous rate. Higher install complexity
                (separate metering) but largest savings
              </li>
              <li>
                <strong className="text-white">Cylinder over-heat
                  strategy</strong> — during cheap hours, controller heats cylinder to
                65-70 °C (above normal 60 °C). Stored heat coasts through expensive
                hours
              </li>
              <li>
                <strong className="text-white">Not BS 7671
                  normative</strong> — tariff integration is operational. The smart
                meter + ALCS wiring is electrical scope; the tariff itself is
                customer-supplier agreement
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — tariff in use + smart meter MPAN + ALCS wiring (if
                applicable) + Wi-Fi integration verified + customer education
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.4 + Reg 415.1.1 — applied to controls + zone valve circuits"
            clause="Reg 411.4 in a TN system, the characteristics of the protective devices and the circuit impedances shall fulfil the ADS requirement. Reg 415.1.1 RCDs having a rated residual operating current (IΔn) not exceeding 30 mA shall provide additional protection."
            meaning="Reg 411.4 + Reg 415.1.1 apply to the heat pump controls circuit (dedicated 6 A way) and the zone valve circuit (dedicated 6-10 A way at 230 V AC). Standard protective architecture: Type A RCBO C-curve + 30 mA additional protection. Zs verified at the wiring centre (the furthest point of the zone valve circuit) ≤ Table 41.3 limit. Per Reg 643 commissioning sequence: continuity + IR + ADS + RCD trip-time + functional test of each control element. Cert evidence bundle records per-circuit EIC + functional test results per zone."
          />

          <InlineCheck {...inlineChecks[2]} />

          <InlineCheck {...inlineChecks[3]} />

          <SectionRule />

          <Scenario
            title="Standard UK 2025-26 single-zone heat pump install with smart thermostat"
            situation="9 kW Vaillant aroTHERM Plus R290 + 200 L dual-coil cylinder + single-zone underfloor heating downstairs + radiators upstairs (essentially one zone with TRV control per radiator). Customer wants Tado smart thermostat (already owns; familiar interface)."
            whatToDo="Heat pump protocol choice: Vaillant aroTHERM Plus R290 uses EBus natively — Tado interface requires an OpenTherm bridge accessory (e.g. Tado Wireless Receiver + Vaillant-compatible bridge OR third-party EBus-to-OpenTherm gateway). Confirm bridge accessory availability + compatibility at quote stage. Electrical scope: (1) Dedicated 6 A controls way at CU — Type A RCBO C-curve + 30 mA + 1.5 mm² T+E to wiring centre near cylinder. (2) Dedicated 10 A zone valve way at CU (single zone but still dedicated). (3) OAT sensor: 2-core LV screened cable 8 m run from outdoor sensor (shaded east-facing wall 2.5 m from outdoor unit) to indoor wiring centre. (4) Cylinder thermostats: 2-core LV from cylinder thermostats to wiring centre. (5) OpenTherm cable from wiring centre to Tado gateway + from gateway to Vaillant heat pump controller. (6) Tado smart thermostat hub installed on customer’s Wi-Fi; app downloaded; account linked to thermostat + heat pump. (7) Weather compensation curve configured per Vaillant default (refined first season). (8) Functional verification: Tado app setpoint change reflects at heat pump within seconds; OAT reading sensible (12 °C vs known thermometer); cylinder thermostat functional; legionella cycle scheduled. Cert evidence bundle: controls way EIC + zone valve way EIC + OAT location photograph + Tado integration verified + weather compensation curve configuration + customer handover documentation."
            whyItMatters="Standard UK 2025-26 single-zone install with third-party smart thermostat. Customer keeps familiar Tado interface. OpenTherm compatibility makes it work. Total electrical-controls scope: ~£300-500 labour + ~£150 wiring centre + ~£100 Tado OpenTherm gateway. Cert evidence bundle records the integration cleanly."
          />

          <Scenario
            title="Multi-zone install + Octopus Cosy tariff + Mixergy smart cylinder"
            situation="4-bed detached. 12 kW Mitsubishi Ecodan three-phase + Mixergy 300 L smart cylinder + 4 zones (downstairs UFH + upstairs radiators + ensuite + utility / boiler room). Customer on Octopus Cosy tariff (cheap windows 04:30-07:30, 13:00-16:00, 22:00-00:00 typical). Mitsubishi MELCloud app for customer-facing interface."
            whatToDo="Mitsubishi protocol: MELCloud Wi-Fi adapter + remote controller (PAR-32MAA hard-wired). Daikin / Mitsubishi proprietary — not OpenTherm-compatible with third-party smart thermostats. Customer uses MELCloud app. Electrical scope: (1) Dedicated 6 A controls way + 10 A zone valve way at three-phase CU. (2) OAT sensor: north-facing wall 3 m from outdoor unit. (3) 4 × zone valves Honeywell V4043 each with 5-core flex to Honeywell ST9520C wiring centre. (4) 4 × zone thermostats Honeywell T6 (wired to wiring centre). (5) Mixergy smart cylinder: integrates with own Wi-Fi app + stratification control + PV diverter (future addition). Cylinder thermostat circuits + immersion circuit as §8.6. (6) MELCloud Wi-Fi adapter on customer Wi-Fi; remote controller wired in hallway. (7) Tariff integration: MELCloud schedule manually configured to match Octopus Cosy cheap windows (no native API integration in 2025-26 — manual schedule); cylinder over-heated to 65-70 °C during last cheap window of day; coast through evening expensive period. (8) Weather compensation curve configured per Mitsubishi default. (9) Functional verification of each zone + cylinder + tariff schedule + MELCloud app. Cert evidence bundle: per-zone valve EIC + wiring centre commissioning + Mixergy app integration + MELCloud + Octopus Cosy schedule + customer handover (especially the no-native-API limitation; customer expects to manually update schedule if tariff windows change)."
            whyItMatters="Multi-zone + smart cylinder + time-of-use tariff = the full UK 2025-26 prosumer pattern for heat pumps. Customer benefit: bills 30-50% lower vs single-rate tariff. Limitation: no native Octopus API integration on Mitsubishi MELCloud (yet) → customer manually updates schedule if tariff windows change. Cert evidence bundle is rich + integrates the cylinder + tariff + multi-zone + customer education. Mirrors §7.5 + §8.6 PEI integration pattern."
          />

          <CommonMistake
            title="OAT sensor mounted on south-facing wall in direct sun"
            whatHappens="Installer mounts OAT sensor on south-facing wall of property (because cable run is shorter from outdoor unit). In summer sun, sensor reads 30-40 °C false high while actual ambient is 22 °C. Controller thinks outdoor is warm → reduces primary flow temperature → underheats building → customer cold. Customer reports the system as faulty."
            doInstead="OAT sensor on north or east shaded wall, 2-3 m from outdoor unit. Longer cable run is the right trade-off. Commissioning verification: compare sensor reading to known thermometer in open air; expect ±1 °C. If significant deviation: investigate location. Cert evidence bundle records the location + commissioning reading."
          />

          <CommonMistake
            title="Customer wants Tado but heat pump is proprietary-only"
            whatHappens="Customer signs MCS contract for Mitsubishi Ecodan (cheapest quote). Customer assumes Tado will work because it does on their friend’s heat pump. Installer commissions; Tado cannot communicate with Mitsubishi MELCloud (no OpenTherm; proprietary protocol). Customer frustrated; wants refund; reputation damage to all parties."
            doInstead="Customer thermostat preference + heat pump model choice are JOINT decisions at quote stage. Tado / Nest / Hive / Honeywell smart thermostats need OpenTherm-compatible heat pump (Worcester Bosch + Viessmann Vitocal natively in some models; Vaillant aroTHERM Plus via EBus-to-OpenTherm bridge accessory — verify per model + accessory). Daikin / Mitsubishi / NIBE proprietary protocols use vendor app only. Customer education at quote: app vs third-party thermostat decision. Cert evidence bundle records the customer’s informed choice."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'Heat pump controls are an operational layer above BS 7671. Reg 314 dedicated controls way + Reg 411.4 ADS + Reg 415.1.1 30 mA RCD apply to the supply circuits; the protocols + sensors are not BS 7671 normative.',
              'OAT sensor: outdoor temperature for weather compensation + defrost scheduling + COP optimisation. Mount north / east shaded wall, 2-3 m from outdoor unit, 1 m above ground.',
              'OpenTherm: open-standard 2-wire bidirectional; widely third-party thermostat compatible (Tado, Nest, Hive, Honeywell, Drayton, Worcester Bosch Wave).',
              'EBus: Vaillant + Bosch proprietary. Manufacturer-proprietary: Daikin P1/P2, Mitsubishi MELCloud (Wi-Fi), NIBE myUplink. Vendor ecosystem lock-in.',
              'OpenTherm-supportable UK 2025-26 heat pumps (typically via gateway / bridge): Worcester Bosch + Viessmann Vitocal natively in some models; Vaillant aroTHERM Plus via EBus-to-OpenTherm bridge accessory. Verify per model + accessory.',
              'Zone valves: 230 V AC spring-return motor; 5-core flex to wiring centre; thermostat per zone; auxiliary switch confirms valve open before primary flow.',
              'Wiring centre: Honeywell ST9420C / ST9520C typical UK 2025-26. Interconnects thermostats + valves + heat pump controller + cylinder. Near cylinder location.',
              'Weather compensation curve: outdoor temp on X, primary flow temp on Y. Configured at commissioning; refined over first heating season.',
              'Smart meter ALCS + Wi-Fi tariff integration: cheap-tariff hour scheduling. Octopus Cosy / Heat Pump tariff common UK 2025-26.',
              'Customer-facing app: vendor-specific (Vaillant multiMATIC, MELCloud, Daikin Onecta, NIBE myUplink, Mixergy). Wi-Fi commissioning + customer education.',
              'Cert evidence bundle: dedicated controls way EIC + zone valve way EIC + OAT mounting + protocol verification + functional test per zone + tariff integration + customer handover.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 7 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-8-section-6')
              }
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Section 6
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Backup immersion + DHW cylinder integration
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-8-section-8')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                8.8 Commissioning, Part 6 inspection + handover
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
