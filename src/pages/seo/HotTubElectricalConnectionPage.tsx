import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Droplets,
  ShieldCheck,
  AlertTriangle,
  FileCheck2,
  Calculator,
  Zap,
  Wrench,
  Cable,
  GraduationCap,
  ClipboardCheck,
  Thermometer,
  CircuitBoard,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Hot Tub Electrical Connection', href: '/guides/hot-tub-electrical-connection' },
];

const tocItems = [
  { id: 'overview', label: 'Hot Tub Electrical Overview' },
  { id: 'supply-requirements', label: 'Supply Requirements' },
  { id: 'rcd-protection', label: 'RCD Protection' },
  { id: 'cable-selection', label: 'Cable Selection and Routing' },
  { id: 'outdoor-ip-ratings', label: 'Outdoor IP Ratings' },
  { id: 'installation-steps', label: 'Step-by-Step Installation' },
  { id: 'testing-certification', label: 'Testing and Certification' },
  { id: 'costs', label: 'Realistic Pricing' },
  { id: 'for-electricians', label: 'For Electricians' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Hot tubs require a dedicated radial circuit — typically 32A for smaller tubs (up to 7kW) or 40A for larger models (up to 9kW). Never connect a hot tub to an existing socket circuit.',
  'RCD protection is mandatory — a 30mA RCD or RCBO must protect the hot tub circuit. BS 7671 Section 702 calls for additional protection in this special location using an RCD with the characteristics of Reg 415.1.1 (30mA), and Reg 411.3.3 separately requires 30mA RCD protection for socket-outlets and outdoor mobile equipment up to 32A.',
  'Supplementary equipotential bonding is required under BS 7671 Reg 702.415.2 — all extraneous-conductive-parts in zones 0, 1 and 2 (tub metalwork, pipework, pump housing, handrails) must be connected by supplementary protective bonding conductors to the protective conductors of exposed-conductive-parts of equipment in those zones.',
  'All outdoor electrical equipment must have an appropriate IP rating — IP56 minimum for the isolator switch, and the cable route must be protected against mechanical damage using SWA cable or conduit.',
  'Switchgear and socket-outlets must not be installed in zones 0 or 1 (BS 7671 Reg 702.53). Because zone 1 extends to a vertical plane 2 metres from the rim of the tub, the lockable IP-rated isolator must sit beyond that 2 metre zone — and, as good isolation practice, within sight of the tub.',
  'An Electrical Installation Certificate (EIC) must be issued for the new circuit, and the work must be notified under Part P of the Building Regulations as it involves a special location (zone around a hot tub).',
];

const faqs = [
  {
    question: 'What size circuit do I need for a hot tub?',
    answer:
      'Most domestic hot tubs in the UK draw between 5kW and 9kW. A smaller hot tub (up to 7kW, approximately 30A at 230V) requires a 32A dedicated circuit with 6.0mm² cable. Larger hot tubs (up to 9kW, approximately 39A at 230V) require a 40A circuit with 10.0mm² cable. Always check the manufacturer data plate for the exact current rating — do not guess from the kW rating alone, as the power factor and starting current of the pump motors can affect the required circuit rating. The circuit must be a dedicated radial circuit from the consumer unit — it must not be shared with any other load.',
  },
  {
    question: 'Do I need an RCD for a hot tub?',
    answer:
      'Yes. For a fixed hardwired hot tub, RCD protection is required under BS 7671 Section 702 (swimming pools and similar locations, applied to outdoor hot tubs), which is satisfied by an RCD with the characteristics of Reg 415.1.1 — a 30mA rated residual operating current. Reg 411.3.3 separately requires 30mA RCD protection for socket-outlets up to 32A and outdoor mobile equipment up to 32A (Reg 411.3.3(c)). A 30mA RCD or RCBO must protect the circuit. Type A is preferred over Type AC as hot tub pump motors and electronic control boards can produce pulsating DC fault currents that a Type AC RCD may not detect. For installations with variable-speed drives or inverter-controlled pumps (common in swim spas), a Type B RCD should be considered — Type B detects pulsating rectified DC from two or more phases as well as smooth DC residual currents. If the consumer unit already has RCD protection on the relevant way, verify it is 30mA and test it before relying on it.',
  },
  {
    question: 'How far can the hot tub be from the consumer unit?',
    answer:
      'There is no fixed maximum distance, but the cable run length affects voltage drop and earth fault loop impedance. BS 7671 limits voltage drop to 5% for the total installation (3% for the final circuit is the practical target). For a 40A circuit using 10.0mm² cable, the maximum run before exceeding 3% voltage drop is approximately 40 metres. For longer runs, increase the cable size to 16.0mm². Use the Elec-Mate cable sizing calculator to verify the voltage drop and Zs for your specific cable run length and installation method.',
  },
  {
    question: 'What IP rating does the outdoor isolator need?',
    answer:
      'A common specification for an outdoor hot tub isolator is IP56 (protected against powerful water jets and dust ingress), and many electricians fit IP66 for extra protection against heavy rain and pressure washing — both comfortably exceed the IPX4/IPX5 water-ingress minimum that BS 7671 Reg 702.512.2 sets for the zones around the tub. Use a lockable rotary type so the supply can be locked off during maintenance. Under Reg 702.53, switchgear must not be installed in zones 0 or 1, so the isolator must be positioned beyond the 2 metre zone 1 boundary around the rim — ideally still within sight of the tub for safe isolation.',
  },
  {
    question: 'Can I use a plug-in hot tub on a 13A socket?',
    answer:
      'Some small inflatable hot tubs (typically under 2kW) are sold with a 13A plug and are designed to be connected to a standard socket outlet. While these are legally sold, they are at the limit of a 13A circuit and must only be connected to a dedicated socket — not a shared ring final circuit with other high-load appliances. An RCD socket or plug-in RCD should be used. For any hardwired hot tub (which is the majority of acrylic/fibreglass models), a dedicated circuit with a fixed connection is required. Never connect a hardwired hot tub via a plug and socket.',
  },
  {
    question: 'Does hot tub wiring need to be notified under Part P?',
    answer:
      'Yes. Hot tub electrical work is notifiable under Part P of the Building Regulations: it is a new circuit, and the area around the tub is a special location under BS 7671 Section 702 (which the standard applies to outdoor hot tubs). The work must be either carried out by a registered competent person scheme member (NICEIC, NAPIT, etc.) who can self-certify, or notified to Building Control before the work starts. Failure to notify breaches the Building Regulations and can cause problems when selling the property.',
  },
  {
    question: 'What cable type should I use for an outdoor hot tub?',
    answer:
      'For the outdoor section of the cable run, SWA (Steel Wire Armoured) cable is the standard choice. SWA provides mechanical protection against accidental damage, rodent attack, and can be direct-buried (with warning tape above) or run on cable tray. The SWA armour also provides a CPC (Circuit Protective Conductor), though a separate earth core within the cable is still required. For the indoor section (consumer unit to the point of exit from the building), standard twin-and-earth or singles in conduit can be used. At the transition from indoor to outdoor, use an appropriate gland and adaptable box.',
  },
  {
    question: 'How much does it cost to get a hot tub wired in?',
    answer:
      'A typical hot tub electrical installation in the UK costs between £450 and £950 depending on the cable run length, cable size, and complexity. A straightforward installation with a 10-metre cable run, 32A circuit, SWA cable, isolator, and RCBO typically costs £450 to £600. Longer runs (20 to 30 metres), larger cable sizes (40A circuit), or installations requiring trenching, ducting, or consumer unit upgrades will be at the higher end. The cost includes materials (cable, isolator, RCBO, glands, clips), labour (typically half a day to a full day), testing, and the EIC certificate.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description: 'Size cables for hot tub circuits with automatic voltage drop and Zs checks.',
    icon: Calculator,
    category: 'Tool',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description: 'Verify voltage drop on long cable runs to outdoor hot tub locations.',
    icon: Zap,
    category: 'Tool',
  },
  {
    href: '/guides/outdoor-kitchen-electrical',
    title: 'Outdoor Kitchen Electrical Guide',
    description:
      'Related outdoor electrical work including IP-rated equipment and SWA cable routing.',
    icon: Droplets,
    category: 'Guide',
  },
  {
    href: '/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete Electrical Installation Certificates for hot tub installations on your phone.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/ev-charger-installation',
    title: 'EV Charger Installation Guide',
    description:
      'Similar dedicated outdoor circuit installation with SWA cable and RCD protection.',
    icon: Cable,
    category: 'Guide',
  },
  {
    href: '/training/inspection-and-testing',
    title: 'Inspection and Testing Course',
    description: 'Study for C&G 2391 covering testing of special location installations.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'overview',
    heading: 'Hot Tub Electrical Connection: What Every Electrician Needs to Know',
    content: (
      <>
        <p>
          Hot tub installations are one of the most common domestic outdoor electrical jobs in the
          UK. The work is straightforward for a qualified electrician, but the combination of water,
          outdoor exposure, and high current draw means the installation must be done correctly.
          Cutting corners on hot tub wiring is genuinely dangerous.
        </p>
        <p>
          Most hardwired hot tubs draw between 5kW and 9kW — that is 22A to 39A at 230V. They need a
          dedicated radial circuit from the consumer unit with appropriate cable sizing, RCD
          protection compliant with{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A4:2026
          </SEOInternalLink>
          , and a lockable isolator within sight of the tub. The installation must be notified under
          Part P of the Building Regulations as it involves a special location.
        </p>
        <p>
          This guide covers supply requirements, RCD protection, cable selection, IP ratings for
          outdoor equipment, step-by-step installation, testing, certification, and realistic
          pricing for 2026.
        </p>
      </>
    ),
  },
  {
    id: 'supply-requirements',
    heading: 'Supply Requirements: 32A or 40A Dedicated Circuit',
    content: (
      <>
        <p>
          The first step is to check the hot tub manufacturer data plate for the rated current. This
          determines the circuit rating and cable size:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">32A Circuit (up to 7kW)</h3>
            <p className="text-white text-sm leading-relaxed">
              Suitable for smaller hot tubs drawing up to 30A. Use 6.0mm² SWA cable for runs up to
              approximately 30 metres. Protected by a 32A Type C MCB or RCBO at the consumer unit.
              This covers most 4 to 6 person hot tubs with a single pump and heater.
            </p>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">40A Circuit (up to 9kW)</h3>
            <p className="text-white text-sm leading-relaxed">
              Required for larger hot tubs with multiple pumps, blowers, and higher-rated heaters
              drawing up to 39A. Use 10.0mm² SWA cable. Protected by a 40A Type C MCB or RCBO. This
              covers premium 6 to 8 person hot tubs and swim spas. Always verify against the
              manufacturer data — some large swim spas require a 50A or even a three-phase supply.
            </p>
          </div>
        </div>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="grid grid-cols-4 gap-px bg-white/10 text-xs sm:text-sm font-bold text-white">
            <div className="bg-white/[0.06] p-3">Rated load</div>
            <div className="bg-white/[0.06] p-3">Approx. current (230V)</div>
            <div className="bg-white/[0.06] p-3">Protective device</div>
            <div className="bg-white/[0.06] p-3">Typical SWA size</div>
          </div>
          <div className="grid grid-cols-4 gap-px bg-white/10 text-xs sm:text-sm text-white">
            <div className="bg-blue-900/30 p-3">Up to 5kW</div>
            <div className="bg-blue-900/30 p-3">~22A</div>
            <div className="bg-blue-900/30 p-3">32A MCB / RCBO</div>
            <div className="bg-blue-900/30 p-3">6.0mm²</div>
            <div className="bg-blue-900/20 p-3">Up to 7kW</div>
            <div className="bg-blue-900/20 p-3">~30A</div>
            <div className="bg-blue-900/20 p-3">32A MCB / RCBO</div>
            <div className="bg-blue-900/20 p-3">6.0mm²</div>
            <div className="bg-green-900/30 p-3">Up to 9kW</div>
            <div className="bg-green-900/30 p-3">~39A</div>
            <div className="bg-green-900/30 p-3">40A MCB / RCBO</div>
            <div className="bg-green-900/30 p-3">10.0mm²</div>
            <div className="bg-green-900/20 p-3">Over 9kW / swim spa</div>
            <div className="bg-green-900/20 p-3">40A+ (or 3-phase)</div>
            <div className="bg-green-900/20 p-3">50A device or split supply</div>
            <div className="bg-green-900/20 p-3">16.0mm²+ / per design</div>
          </div>
          <p className="text-white/60 text-xs p-3 border-t border-white/10">
            Indicative only — always size the device and cable from the manufacturer data plate
            current and the installation method, not from the kW figure alone.
          </p>
        </div>
        <p>
          Before starting, verify the existing supply has sufficient spare capacity. Check the main
          fuse or service head rating (typically 60A or 100A for domestic properties) and calculate
          the maximum demand with the hot tub included. If the addition of a 32A or 40A circuit
          would exceed the available capacity, the DNO may need to upgrade the service head.
        </p>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection: BS 7671 Section 702 and Reg 415.1.1',
    content: (
      <>
        <p>
          RCD protection is mandatory for hot tub circuits. For a fixed hardwired hot tub, the
          governing requirement is BS 7671 Section 702 (swimming pools and similar locations, applied
          to outdoor hot tubs), whose additional-protection provisions are met using an RCD with the
          characteristics specified in Reg 415.1.1 — that is, a rated residual operating current not
          exceeding 30mA. Separately, Reg 411.3.3 requires 30mA RCD additional protection for
          socket-outlets up to 32A and for outdoor mobile equipment up to 32A (Reg 411.3.3(c)). In
          every case, a 30mA RCD or RCBO must protect the circuit.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>30mA RCD or RCBO</strong> — the circuit must be protected by a 30mA device
                at the consumer unit. An RCBO (combined MCB and RCD) on the dedicated way is the
                cleanest solution — it provides both overcurrent and earth fault protection without
                affecting other circuits if it trips.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type A RCD</strong> — preferred over Type AC for hot tub circuits. Hot tub
                pump motors and electronic control boards can produce pulsating DC fault currents
                that a Type AC RCD may not detect. Type A RCDs detect both AC and pulsating DC
                residual currents.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Type B RCD for inverter-driven installations</strong> — swim spas and
                premium hot tubs with variable-speed drives or multi-pump inverter controllers can
                produce pulsating rectified DC from two or more phases. A Type A RCD will not detect
                smooth DC fault currents. Where such equipment is installed, a Type B RCD should be
                specified — it covers all Type A fault current waveforms plus smooth DC and
                pulsating rectified DC from multi-phase rectification. Check the
                manufacturer&apos;s installation manual for the required RCD type.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Nuisance tripping</strong> — hot tub motors and heaters can cause nuisance
                tripping on sensitive RCDs, particularly at start-up. Ensure the RCD is rated for
                the inductive load and consider a slight time delay (Type S RCD) only on a secondary
                upstream device — the 30mA device protecting the circuit must always be
                instantaneous.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'cable-selection',
    heading: 'Cable Selection and Routing',
    content: (
      <>
        <p>
          The cable route from the consumer unit to the hot tub typically involves an indoor section
          (within the building) and an outdoor section (to the hot tub location). The outdoor
          section must use a cable type that withstands weather, UV exposure, and mechanical damage.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>SWA cable (Steel Wire Armoured)</strong> — the standard choice for the
                outdoor section. 3-core SWA (line, neutral, earth) in 6.0mm² (32A circuit) or
                10.0mm² (40A circuit). BS 7671 Reg 522.8.10 requires a cable buried in the ground to
                have earthed armour or metal sheath and to be at a sufficient depth — in practice
                electricians bury garden runs around 450–600mm with marker tape above, or
                surface-mount on cable cleats. The steel wire armour provides mechanical protection
                and acts as an additional CPC.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Indoor section</strong> — from the consumer unit to the point of exit from
                the building, 6242Y (twin-and-earth) or singles in conduit/trunking are acceptable.
                Transition from indoor to outdoor requires an IP-rated junction box or adaptable box
                with SWA glands.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage drop</strong> — check the voltage drop for the total cable run. BS
                7671 allows 5% total; aim for 3% on the final circuit. For a 40A load on 10.0mm²
                cable, the maximum run for 3% voltage drop is approximately 40 metres. Use the{' '}
                <SEOInternalLink href="/tools/cable-sizing-calculator">
                  cable sizing calculator
                </SEOInternalLink>{' '}
                to verify.
              </span>
            </li>
          </ul>
        </div>
      </>
    ),
  },
  {
    id: 'outdoor-ip-ratings',
    heading: 'Outdoor IP Ratings',
    content: (
      <>
        <p>
          All electrical equipment installed outdoors for a hot tub must have an appropriate Ingress
          Protection (IP) rating. The IP rating indicates protection against solid objects (first
          digit) and water (second digit). BS 7671 Reg 702.512.2 sets the minimum protection by
          zone; the practical specifications below meet or exceed those minimums for typical
          weather-exposed outdoor equipment.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="grid grid-cols-3 gap-px bg-white/10 text-xs sm:text-sm font-bold text-white">
            <div className="bg-white/[0.06] p-3">Zone</div>
            <div className="bg-white/[0.06] p-3">BS 7671 minimum (Reg 702.512.2)</div>
            <div className="bg-white/[0.06] p-3">Extent</div>
          </div>
          <div className="grid grid-cols-3 gap-px bg-white/10 text-xs sm:text-sm text-white">
            <div className="bg-red-900/30 p-3 font-semibold">Zone 0</div>
            <div className="bg-red-900/30 p-3">IPX8</div>
            <div className="bg-red-900/30 p-3">Interior of the basin / tub</div>
            <div className="bg-orange-900/30 p-3 font-semibold">Zone 1</div>
            <div className="bg-orange-900/30 p-3">IPX4 (IPX5 where water jets used for cleaning)</div>
            <div className="bg-orange-900/30 p-3">Within 2m of the rim, up to 2.5m high</div>
            <div className="bg-blue-900/30 p-3 font-semibold">Zone 2 (outdoor)</div>
            <div className="bg-blue-900/30 p-3">IPX4 (IPX5 where water jets used for cleaning)</div>
            <div className="bg-blue-900/30 p-3">A further 1.5m beyond zone 1</div>
          </div>
          <p className="text-white/60 text-xs p-3 border-t border-white/10">
            The second digit (water) is what 702.512.2 fixes by zone; specify the first digit (dust /
            solid ingress) to suit the location — full IP ratings such as IP56 or IP66 comfortably
            satisfy these minimums.
          </p>
        </div>
        <div className="grid gap-4 sm:grid-cols-3 my-4">
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">Isolator Switch</h3>
            <p className="text-white text-sm leading-relaxed">
              IP56 is a common spec, IP66 for heavy exposure. Lockable rotary type. Reg 702.53 bars
              switchgear from zones 0 and 1, so site it beyond the 2m zone — ideally within sight of
              the tub.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">Junction Boxes</h3>
            <p className="text-white text-sm leading-relaxed">
              IP65 minimum for any outdoor junction or adaptable box. Use boxes with cable glands
              rather than knockouts for a reliable seal.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-base mb-2">Cable Glands</h3>
            <p className="text-white text-sm leading-relaxed">
              SWA glands at both ends of the armoured cable must be correctly installed with inner
              and outer gland nuts, earth tags, and shrouds to maintain the IP rating of the
              enclosure.
            </p>
          </div>
        </div>
      </>
    ),
  },
  {
    id: 'installation-steps',
    heading: 'Step-by-Step Installation',
    content: (
      <>
        <p>A typical hot tub electrical installation follows these steps:</p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ol className="space-y-4 text-white list-decimal list-inside">
            <li>
              <strong>Survey and assessment</strong> — check the manufacturer data plate, determine
              circuit rating (32A or 40A), survey the cable route, verify spare capacity at the
              consumer unit, and check the earthing arrangement (TN-S, TN-C-S, or TT).
            </li>
            <li>
              <strong>Install the RCBO or MCB</strong> — fit an appropriately rated RCBO (or MCB
              behind an RCD) in the consumer unit on a dedicated way. Label clearly as "Hot Tub".
            </li>
            <li>
              <strong>Run the cable</strong> — route twin-and-earth or singles in conduit from the
              consumer unit to the building exit point. Transition to SWA cable using an IP-rated
              adaptable box with SWA glands. Route the SWA to the isolator position — either buried
              in a trench at a sufficient depth (commonly 450–600mm) with marker tape above (Reg
              522.8.10) or surface-mounted on cleats.
            </li>
            <li>
              <strong>Install the isolator</strong> — mount a lockable IP56/IP66 rotary isolator
              beyond the 2 metre zone 1 boundary around the rim (Reg 702.53 bars switchgear from
              zones 0 and 1). Gland the SWA into the isolator. Run a short length of SWA or flexible
              armoured cable from the isolator to the hot tub connection point.
            </li>
            <li>
              <strong>Make the final connection</strong> — connect to the hot tub terminal block as
              per the manufacturer instructions. Verify the connection is within an IP-rated
              enclosure.
            </li>
            <li>
              <strong>Test</strong> — complete all initial verification tests (continuity,
              insulation resistance, polarity, earth fault loop impedance, RCD operation). Fill and
              power the hot tub. Check for correct operation of pumps, heater, lights, and controls.
            </li>
            <li>
              <strong>Certify</strong> — issue an Electrical Installation Certificate (EIC) and
              notify under Part P.
            </li>
          </ol>
        </div>
      </>
    ),
  },
  {
    id: 'testing-certification',
    heading: 'Testing and Certification',
    content: (
      <>
        <p>
          The completed hot tub circuit must be tested in accordance with BS 7671 Chapter 64. The
          following tests are required:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Continuity of protective conductors — CPC from consumer unit to isolator and from
                isolator to hot tub earth terminal
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Test in the order set out in BS 7671 Reg 643.1 — the dead tests (continuity,
                insulation resistance, polarity) before energising, then the live tests (Zs, RCD
                operation). A hot tub is a dedicated radial, so ring-continuity testing does not
                apply.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Insulation resistance — 500V DC between live conductors and earth, minimum 1 megohm
                (disconnect the hot tub before testing)
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Polarity — verify correct line, neutral, and earth connections at all points
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                Earth fault loop impedance (Zs) — must be within the maximum permitted Zs for the
                protective device. When comparing the measured Zs against the tabulated maximum,
                apply the IET Guidance Note 3 rule-of-thumb correction factor of 0.8: a measured Zs
                is acceptable if it does not exceed 0.8 × the tabulated maximum Zs, allowing for the
                rise in conductor resistance at operating temperature. Record both the measured and
                corrected values on the EIC schedule.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <ClipboardCheck className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                RCD operation — 30mA device must trip within 300ms at rated current, and within 40ms
                at 5x rated current
              </span>
            </li>
          </ul>
        </div>
        <div className="rounded-2xl bg-orange-500/10 border border-orange-500/30 p-5 my-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-orange-400 mt-0.5 shrink-0" />
            <div>
              <p className="font-bold text-white mb-1">
                Supplementary Equipotential Bonding — Reg 702.415.2
              </p>
              <p className="text-white text-sm leading-relaxed">
                All extraneous-conductive-parts within zones 0, 1 and 2 must be connected by
                supplementary protective bonding conductors. This includes the metalwork of the tub
                shell, water inlet and outlet pipework, pump housing, handrails, and any other
                metalwork within or bounding the zones. The bonding conductors connect these parts
                to the protective conductors of exposed-conductive-parts of equipment in the zones.
                Omitting this bonding is a mandatory non-compliance under BS 7671 Reg 702.415.2 and
                is among the most common dangerous mistakes on hot tub and pool installations.
                Verify continuity of each bonding conductor and record on the EIC.
              </p>
            </div>
          </div>
        </div>
        <p>
          An{' '}
          <SEOInternalLink href="/eic-certificate">
            Electrical Installation Certificate (EIC)
          </SEOInternalLink>{' '}
          must be issued. A Minor Works Certificate is not appropriate because the work involves a
          new circuit in a special location. The EIC should reference BS 7671 Section 702 in the
          remarks.
        </p>
      </>
    ),
  },
  {
    id: 'costs',
    heading: 'Realistic Pricing for Hot Tub Electrical Installation (2026)',
    content: (
      <>
        <p>
          Pricing varies by cable run length, cable size, and local labour rates. The following are
          realistic prices for 2026 in the UK:
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 overflow-hidden my-4">
          <div className="grid grid-cols-3 gap-px bg-white/10 text-xs sm:text-sm font-bold text-white">
            <div className="bg-white/[0.06] p-3">Scenario</div>
            <div className="bg-white/[0.06] p-3">Indicative price</div>
            <div className="bg-white/[0.06] p-3">What it covers</div>
          </div>
          <div className="grid grid-cols-3 gap-px bg-white/10 text-xs sm:text-sm text-white">
            <div className="bg-green-900/30 p-3 font-semibold">Short run (under 10m), 32A</div>
            <div className="bg-green-900/30 p-3">£450–£600</div>
            <div className="bg-green-900/30 p-3">RCBO, 6.0mm² SWA, IP66 isolator, glands, testing, EIC</div>
            <div className="bg-blue-900/30 p-3 font-semibold">Medium run (10–20m), 32A</div>
            <div className="bg-blue-900/30 p-3">£550–£750</div>
            <div className="bg-blue-900/30 p-3">Longer cable run, possible trenching</div>
            <div className="bg-blue-900/30 p-3 font-semibold">Long run (20–30m), 40A</div>
            <div className="bg-blue-900/30 p-3">£700–£950</div>
            <div className="bg-blue-900/30 p-3">10.0mm² SWA, more labour for trenching and backfill</div>
            <div className="bg-orange-900/30 p-3 font-semibold">Consumer unit upgrade</div>
            <div className="bg-orange-900/30 p-3">+£350–£600</div>
            <div className="bg-orange-900/30 p-3">If no spare ways or the board needs replacing</div>
            <div className="bg-white/[0.03] p-3 font-semibold">Customer digs trench</div>
            <div className="bg-white/[0.03] p-3">−£100–£200</div>
            <div className="bg-white/[0.03] p-3">Deduct from the figures above</div>
          </div>
          <p className="text-white/60 text-xs p-3 border-t border-white/10">
            Indicative UK market guidance for 2026, not a quote — actual pricing depends on the
            cable route, local labour rates and site access.
          </p>
        </div>
        <p>
          These prices include materials, labour, testing, and the EIC certificate. They do not
          include the hot tub itself, the base/pad, or any plumbing work. Labour is typically half a
          day for a straightforward installation, or a full day for longer runs with trenching.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Hot Tub Installation Tips',
    content: (
      <>
        <p>
          Hot tub installations are profitable, repeatable work. A typical job takes half a day to a
          full day and is worth £450 to £950. Here are practical tips from experienced installers:
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Wrench className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Always Get the Data Plate First</h4>
                <p className="text-white text-sm leading-relaxed">
                  Before quoting, ask the customer for the hot tub make, model, and data plate
                  photo. The rated current determines the circuit size. Quoting a 32A circuit for a
                  hot tub that needs 40A means returning to upgrade — at your cost.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quote Accurately with Elec-Mate</h4>
                <p className="text-white text-sm leading-relaxed">
                  Use the{' '}
                  <SEOInternalLink href="/electrical-quoting-app">quoting app</SEOInternalLink> to
                  itemise materials (SWA cable per metre, RCBO, isolator, glands, clips, warning
                  tape) and labour. Send a professional PDF quote from the survey.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Certify on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  Complete the EIC on your phone before you leave using the{' '}
                  <SEOInternalLink href="/eic-certificate">EIC certificate app</SEOInternalLink>.
                  Note the BS 7671 Section 702 reference in the remarks. Send the PDF to the
                  customer immediately — it is professional and avoids the paperwork backlog.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Quote, install, and certify hot tub connections"
          description="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certification."
          icon={Droplets}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function HotTubElectricalConnectionPage() {
  return (
    <GuideTemplate
      title="Hot Tub Electrical Connection | Dedicated Circuit Guide UK"
      description="Complete guide to hot tub electrical connections in the UK. Dedicated 32A/40A circuit, RCD protection, SWA cable, outdoor IP ratings…"
      datePublished="2026-03-27"
      dateModified="2026-05-18"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Droplets}
      answerBox={{
        question: 'How do you connect a hot tub to the electrics in the UK?',
        answer:
          'A hot tub needs its own dedicated radial circuit from the consumer unit — normally 32A (6mm² cable) for tubs up to about 7kW or 40A (10mm²) up to about 9kW — protected by a 30mA RCD or RCBO. SWA cable feeds a lockable, IP-rated outdoor isolator sited outside the 2m zone around the tub. Supplementary bonding, full testing and an EIC are required, and the work is notifiable under Part P.',
        detail:
          'BS 7671 Section 702 applies its requirements to hot tubs installed outdoors, including supplementary equipotential bonding of metalwork in zones 0, 1 and 2 (Reg 702.415.2) and the prohibition on switchgear inside zones 0 and 1 (Reg 702.53).',
      }}
      heroTitle={
        <>
          Hot Tub Electrical Connection:{' '}
          <span className="text-yellow-400">Dedicated Circuit Guide for UK Electricians</span>
        </>
      }
      heroSubtitle="Hot tubs need a dedicated 32A or 40A circuit with RCD protection, SWA cable, and a lockable outdoor isolator. This guide covers everything from supply assessment to testing and certification."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Hot Tub Electrical Connections"
      relatedPages={relatedPages}
      ctaHeading="Size Cables and Certify Hot Tub Installations on Your Phone"
      ctaSubheading="Join 1,000+ UK electricians using Elec-Mate for cable sizing, professional quoting, and on-site EIC certificates. 7-day free trial, cancel anytime."
    />
  );
}
