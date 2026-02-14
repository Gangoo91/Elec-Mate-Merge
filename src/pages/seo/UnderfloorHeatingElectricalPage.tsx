import GuideTemplate from '@/pages/seo/templates/GuideTemplate';
import { SEOInternalLink } from '@/components/seo/SEOInternalLink';
import { SEOAppBridge } from '@/components/seo/SEOAppBridge';
import type { RelatedPage } from '@/components/seo/SEORelatedPages';
import {
  Thermometer,
  Cable,
  ShieldCheck,
  AlertTriangle,
  Calculator,
  FileCheck2,
  Zap,
  GraduationCap,
  ClipboardCheck,
  Gauge,
  Settings,
  CheckCircle,
} from 'lucide-react';

// -------------------------------------------------------------------
// Data
// -------------------------------------------------------------------

const breadcrumbs = [
  { label: 'Installation', href: '/guides/electrical-certificate-types-uk' },
  { label: 'Underfloor Heating', href: '/guides/underfloor-heating-electrical' },
];

const tocItems = [
  { id: 'what-is-ufh', label: 'What Is Electric Underfloor Heating?' },
  { id: 'cable-vs-mat', label: 'Cable vs Mat Systems' },
  { id: 'dedicated-circuit', label: 'Dedicated Circuit Requirements' },
  { id: 'thermostat-wiring', label: 'Thermostat Wiring' },
  { id: 'rcd-protection', label: 'RCD Protection' },
  { id: 'cable-sizing', label: 'Cable Sizing for UFH' },
  { id: 'insulation-testing', label: 'Insulation Resistance Testing' },
  { id: 'for-electricians', label: 'For Electricians Installing UFH' },
  { id: 'faq', label: 'FAQ' },
  { id: 'related', label: 'Related Pages' },
];

const keyTakeaways = [
  'Electric underfloor heating systems require a dedicated radial circuit from the consumer unit with appropriate MCB and RCD protection under BS 7671.',
  'Heating cables must not cross or overlap, and installation must follow the manufacturer spacing guidelines to prevent hot spots and cable damage.',
  'A floor-sensing thermostat with a dedicated back box is required, and the cable between the thermostat and the heating element must be correctly rated for the load.',
  'RCD protection at 30mA is mandatory for all underfloor heating circuits under Regulation 411.3.3 of BS 7671:2018+A3:2024.',
  'Elec-Mate cable sizing and circuit design calculators let you size the radial feed, check voltage drop, and produce the EIC certificate on site.',
];

const faqs = [
  {
    question: 'Does electric underfloor heating need its own circuit?',
    answer:
      'Yes. Electric underfloor heating should be supplied by a dedicated radial circuit from the consumer unit. This is because the heating load is continuous (it runs for extended periods) and the current draw can be significant — a typical 10m2 bathroom mat draws around 1,500W (approximately 6.5A at 230V), while a large kitchen or living room system can draw 2,400W or more (over 10A). Sharing a circuit with sockets or lighting risks overloading the protective device and creates complications for fault finding. The circuit must be protected by an appropriately rated MCB (typically 16A or 20A depending on the load) and a 30mA RCD. Under BS 7671, the circuit design must account for the continuous nature of the load — cable sizing must be based on 100% of the heating load, not a diversity-reduced figure, because the heating element runs at full output for extended periods during the heating cycle.',
  },
  {
    question: 'What size cable do I need for underfloor heating?',
    answer:
      'The cable size depends on the total heating load, the circuit length, the installation method, and any grouping or thermal insulation correction factors. For a typical bathroom UFH system drawing up to 1,500W on a 16A MCB, 2.5mm2 twin and earth cable is usually sufficient for runs up to about 20 metres. For larger systems drawing 2,400W to 3,600W on a 20A MCB, you may need 4mm2 cable, particularly if the run from the consumer unit to the thermostat is long. Always calculate the voltage drop — BS 7671 requires no more than 5% voltage drop from the origin of the installation to the load (5% of 230V = 11.5V). A long run on undersized cable will result in excessive voltage drop, reduced heating output, and a failed verification test. Use the Elec-Mate cable sizing calculator to check the correct size for your specific installation.',
  },
  {
    question: 'Can I install underfloor heating under tiles in a bathroom?',
    answer:
      'Yes, electric underfloor heating is specifically designed for installation under tiles in bathrooms, kitchens, and other tiled areas. Heating mats are the most common choice for bathrooms because they are pre-spaced and simply roll out onto the prepared subfloor before tiling. The mat is embedded in the tile adhesive or a thin layer of self-levelling compound. However, there are important electrical considerations for bathroom installations. The heating element itself is typically located in Zone 3 (outside the zones) or below the floor surface and is not considered to be within the bathroom zones defined by BS 7671 Regulation 701. The thermostat and its wiring must be installed outside Zones 0, 1, and 2 — in practice, this means the thermostat is usually mounted on the wall outside the bathroom or just inside the door, well away from the bath and shower. The circuit must have 30mA RCD protection, and supplementary bonding may be required depending on the earthing arrangement.',
  },
  {
    question: 'What type of thermostat is needed for electric underfloor heating?',
    answer:
      'Electric underfloor heating requires a thermostat with a floor temperature sensor (a thermistor probe embedded in the floor screed or adhesive). Most UFH thermostats are dual-sensing — they measure both the floor temperature and the room air temperature, using the floor sensor as the primary control and the air sensor as a secondary limit. The thermostat must be rated for the heating load it controls. A typical UFH thermostat is rated at 16A (3,680W at 230V), which is sufficient for most single-zone domestic installations. For larger systems exceeding the thermostat rating, a contactor (relay) must be used — the thermostat switches the contactor coil, and the contactor switches the heating load. The thermostat requires a back box with a neutral connection (for electronic/programmable thermostats) and a connection for the floor sensor cable. Smart thermostats with WiFi connectivity are increasingly popular, offering app control and energy usage monitoring.',
  },
  {
    question: 'Do I need to do an insulation resistance test on underfloor heating cables?',
    answer:
      'Yes. Insulation resistance testing of the heating cable is essential at three stages: (1) before installation, to confirm the cable has not been damaged in transit; (2) after laying the cable but before covering with screed or adhesive, to confirm no damage occurred during installation; and (3) after the floor covering is in place, as part of the final circuit verification. The manufacturer will specify the expected resistance of the heating element (measured between the two cores) and the minimum insulation resistance (measured between each core and the earth screen). A typical heating cable should have an insulation resistance of at least 1M ohm when tested at 500V DC. If the insulation resistance is low, the cable has been damaged — and once it is covered by screed or tiles, replacement is extremely expensive. This is why testing before covering is critical. Record all test results on the Electrical Installation Certificate.',
  },
  {
    question: 'Can underfloor heating be installed on a wooden floor?',
    answer:
      'Electric underfloor heating can be installed under wooden flooring, but the system type and installation method differ from tile installations. For engineered wood or laminate flooring, foil heating mats or low-profile cable systems are typically used. These are installed on top of the insulation layer and beneath the flooring. The key consideration is the floor surface temperature limit — most wood flooring manufacturers specify a maximum floor temperature of 27 degrees Celsius to prevent warping, shrinking, or damage to the finish. The thermostat floor sensor must be set with this limit. Solid hardwood flooring is generally not recommended for use with underfloor heating because it is more prone to movement with temperature changes. From an electrical perspective, the circuit requirements are the same: dedicated radial circuit, RCD protection, and correct cable sizing. The heating output (W/m2) may need to be lower than for tiled floors to stay within the temperature limit.',
  },
  {
    question: 'Is Part P notification required for underfloor heating installation?',
    answer:
      'The installation of electric underfloor heating in a dwelling is notifiable work under Part P of the Building Regulations (England and Wales) if it involves the installation of a new circuit from the consumer unit. This is because adding a new circuit is classified as notifiable electrical work. If you are registered with a competent person scheme (NICEIC, NAPIT, ELECSA, or BRE), you can self-certify the work and notify Building Control through your scheme. If you are not registered, the householder must apply to Building Control for the work to be inspected — which adds cost and delay. For electricians, this is one more reason to be scheme-registered. An Electrical Installation Certificate (EIC) must be issued for the new circuit, and this should be completed using the correct BS 7671 model form. Elec-Mate generates the EIC on your phone, ready to send to the customer before you leave the property.',
  },
];

const relatedPages: RelatedPage[] = [
  {
    href: '/tools/cable-sizing-calculator',
    title: 'Cable Sizing Calculator',
    description:
      'Calculate the correct cable size for any circuit including underfloor heating radial feeds with voltage drop verification.',
    icon: Calculator,
    category: 'Calculator',
  },
  {
    href: '/guides/consumer-unit-regulations',
    title: 'Consumer Unit Regulations',
    description:
      'MCB and RCD requirements for new circuits including dedicated radial feeds for heating systems.',
    icon: ShieldCheck,
    category: 'Guide',
  },
  {
    href: '/tools/eic-certificate',
    title: 'EIC Certificate App',
    description:
      'Complete the Electrical Installation Certificate for new UFH circuits on your phone with AI assistance.',
    icon: FileCheck2,
    category: 'Certificate',
  },
  {
    href: '/guides/bathroom-electrical-regulations',
    title: 'Bathroom Electrical Regulations',
    description:
      'Zone classifications, IP ratings, and RCD requirements for electrical work in bathrooms.',
    icon: AlertTriangle,
    category: 'Guide',
  },
  {
    href: '/tools/voltage-drop-calculator',
    title: 'Voltage Drop Calculator',
    description:
      'Verify voltage drop on long radial feeds to underfloor heating thermostats and mats.',
    icon: Gauge,
    category: 'Calculator',
  },
  {
    href: '/training/18th-edition-course',
    title: '18th Edition Course',
    description:
      'Study BS 7671:2018+A3:2024 with structured training modules on the Elec-Mate platform.',
    icon: GraduationCap,
    category: 'Training',
  },
];

// -------------------------------------------------------------------
// Sections
// -------------------------------------------------------------------

const sections = [
  {
    id: 'what-is-ufh',
    heading: 'What Is Electric Underfloor Heating?',
    content: (
      <>
        <p>
          Electric underfloor heating (UFH) uses resistive heating cables or mats installed beneath
          the floor surface to provide radiant warmth. Unlike wet (hydronic) underfloor heating,
          which circulates warm water through pipes, electric UFH is a purely electrical
          installation — and as such, it falls squarely within the scope of{' '}
          <SEOInternalLink href="/guides/bs-7671-18th-edition-guide">
            BS 7671:2018+A3:2024
          </SEOInternalLink>{' '}
          and the Part P Building Regulations.
        </p>
        <p>
          Electric UFH is most commonly installed in bathrooms, kitchens, conservatories, and
          extensions where it provides comfortable floor warmth without the need for radiators.
          Systems typically output between 100W/m2 and 200W/m2, with bathrooms and kitchens at the
          higher end to compensate for heat loss through tiled floors.
        </p>
        <p>
          For electricians, UFH installation is a growing area of work. New-build properties
          increasingly specify electric UFH in bathrooms as standard, and retrofit installations in
          existing homes are popular renovation projects. Getting the electrical design right —
          dedicated circuit, correct cable sizing, proper RCD protection, and thermostat wiring — is
          essential for a safe and compliant installation.
        </p>
      </>
    ),
  },
  {
    id: 'cable-vs-mat',
    heading: 'Cable vs Mat Systems: Which to Install',
    content: (
      <>
        <p>
          There are two main types of electric underfloor heating element, and the choice between
          them affects the installation approach:
        </p>
        <div className="grid gap-4 sm:grid-cols-2 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Heating Cables (Loose Wire)</h3>
            <p className="text-white text-sm leading-relaxed">
              Individual heating cables that are laid in a serpentine pattern across the floor, held
              in place by fixing clips or tape. The cable spacing determines the heat output per
              square metre. Loose cable systems offer more flexibility in irregular-shaped rooms and
              around obstacles like toilet pans and vanity units. They are typically embedded in a
              layer of self-levelling compound (5-10mm) before the floor finish is applied. Cable
              systems require more skill to install because the spacing must be consistent — cables
              that are too close together create hot spots, while cables that are too far apart
              leave cold patches.
            </p>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <h3 className="font-bold text-white text-lg mb-3">Heating Mats (Pre-spaced)</h3>
            <p className="text-white text-sm leading-relaxed">
              Heating cables pre-attached to a fibreglass mesh mat at the correct spacing. Mats are
              available in standard widths (typically 500mm) and various lengths to suit different
              room sizes. They simply roll out onto the prepared subfloor and can be cut and turned
              (the mesh only, never the cable) to fit the room layout. Mats are faster to install,
              less prone to spacing errors, and can often be tiled directly onto with flexible tile
              adhesive — eliminating the need for a self-levelling compound layer. They are the
              preferred choice for straightforward rectangular rooms and bathrooms.
            </p>
          </div>
        </div>
        <p>
          Regardless of the system type, the heating element must never cross or overlap itself —
          this creates localised overheating that can damage the cable, the floor finish, and
          potentially cause a fire. The cold tail (the unheated section of cable that connects the
          heating element to the thermostat) must be routed back to the thermostat location without
          being embedded in the heated floor area.
        </p>
      </>
    ),
  },
  {
    id: 'dedicated-circuit',
    heading: 'Dedicated Circuit Requirements',
    content: (
      <>
        <p>
          Every electric underfloor heating installation should be supplied by a dedicated radial
          circuit from the{' '}
          <SEOInternalLink href="/guides/consumer-unit-regulations">consumer unit</SEOInternalLink>.
          This is standard good practice for continuous heating loads and is essential for correct
          circuit protection and fault isolation.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>MCB rating:</strong> Typically 16A for loads up to 3,680W or 20A for loads
                up to 4,600W. The MCB rating must be selected based on the total heating load plus
                any thermostat standby power. A Type B MCB is standard for resistive heating loads.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Circuit type:</strong> Radial circuit — not a ring circuit. The cable runs
                from the consumer unit to the thermostat location, where the heating element is
                connected.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Cable route:</strong> The supply cable runs from the MCB/RCBO in the
                consumer unit to the thermostat back box. The heating cable cold tails are connected
                at the thermostat. A separate floor sensor cable also connects to the thermostat.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Zap className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Continuous load rating:</strong> Because UFH operates continuously for
                extended periods, the cable must be sized for 100% of the design load with no
                diversity reduction. Apply all relevant correction factors from{' '}
                <SEOInternalLink href="/guides/cable-sizing-guide-bs-7671">
                  Appendix 4 of BS 7671
                </SEOInternalLink>
                .
              </span>
            </li>
          </ul>
        </div>
        <p>
          For multi-zone systems (for example, a ground floor with separate UFH zones in the
          kitchen, hallway, and conservatory), each zone may have its own thermostat but can share a
          single supply circuit if the total load is within the MCB rating and cable capacity.
          Alternatively, each zone can have its own dedicated circuit — this is cleaner from a
          fault-finding perspective and avoids any issues with overloading.
        </p>
        <SEOAppBridge
          title="Size the UFH circuit in seconds"
          description="Enter the heating load, cable length, and installation method into Elec-Mate's cable sizing calculator. It applies all correction factors from BS 7671 Appendix 4 and confirms the MCB rating, cable size, and voltage drop — instantly."
          icon={Calculator}
        />
      </>
    ),
  },
  {
    id: 'thermostat-wiring',
    heading: 'Thermostat Wiring and Connection',
    content: (
      <>
        <p>
          The thermostat is the control centre of the UFH system. It receives the supply from the
          consumer unit, switches the heating element, and monitors the floor temperature via a
          sensor probe. Getting the wiring right is critical.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Back box:</strong> The thermostat requires a standard single-gang back box
                (minimum 35mm deep for most models). The back box must accommodate the supply cable,
                the heating cable cold tails, and the floor sensor cable — a 47mm deep box is
                recommended to avoid overcrowding.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Supply connection:</strong> Live, neutral, and earth from the dedicated
                radial circuit connect to the supply terminals on the thermostat. The neutral is
                required for all electronic and programmable thermostats.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Load connection:</strong> The heating cable cold tails (live and neutral)
                connect to the load terminals. The earth screen of the heating cable connects to the
                earth terminal in the back box.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Settings className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Floor sensor:</strong> The floor sensor probe (thermistor) is embedded in
                the floor between two runs of heating cable, inside a conduit for future
                replacement. The sensor cable connects to the dedicated sensor terminals on the
                thermostat. It is a low-voltage signal cable and must not be run alongside the mains
                supply cable.
              </span>
            </li>
          </ul>
        </div>
        <p>
          In bathrooms, the thermostat must be installed outside Zones 0, 1, and 2 as defined in BS
          7671 Section 701. In practice, this usually means mounting the thermostat on the wall just
          outside the bathroom door or on the landing wall adjacent to the bathroom. If the bathroom
          is large enough, the thermostat can be mounted inside the room provided it is more than
          600mm from the edge of the bath or shower tray.
        </p>
        <p>
          For systems where the heating load exceeds the thermostat contact rating (typically 16A),
          a contactor must be used. The thermostat switches the contactor coil (low current), and
          the contactor switches the full heating load. This is common in larger rooms or multi-mat
          configurations exceeding 3,680W.
        </p>
      </>
    ),
  },
  {
    id: 'rcd-protection',
    heading: 'RCD Protection for Underfloor Heating',
    content: (
      <>
        <p>
          All electric underfloor heating circuits must be protected by a 30mA RCD. This is a
          requirement of BS 7671:2018+A3:2024 under Regulation 411.3.3, which requires RCD
          protection for all circuits in domestic premises. Heating cables embedded in floors are
          particularly susceptible to mechanical damage during installation and subsequent building
          work, making RCD protection essential.
        </p>
        <div className="rounded-2xl bg-red-500/10 border border-red-500/20 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>30mA RCD:</strong> Mandatory for all UFH circuits. This can be provided by
                an RCBO (combined RCD/MCB) at the consumer unit, which is the preferred solution as
                it provides dedicated protection without affecting other circuits when it trips.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>Earth screen:</strong> The heating cable has a metallic earth screen
                surrounding the heating cores. This screen must be connected to the circuit
                protective conductor (earth) at the thermostat. If the heating cable insulation
                fails, the earth screen provides a fault path that will trip the RCD.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
              <span>
                <strong>No omission:</strong> Under no circumstances should the RCD be omitted or a
                time-delayed RCD used in place of an instantaneous 30mA device. The risk of electric
                shock from a damaged floor heating cable in direct contact with a person standing on
                the floor (potentially with wet feet in a bathroom) is too great.
              </span>
            </li>
          </ul>
        </div>
        <p>
          When installing UFH on an existing consumer unit that uses split-load RCD protection,
          ensure the UFH circuit is connected to an RCD-protected side. If the consumer unit does
          not have spare RCD-protected ways, an RCBO is the simplest solution — it fits into any
          spare MCB way and provides both overcurrent and RCD protection in a single device.
        </p>
      </>
    ),
  },
  {
    id: 'cable-sizing',
    heading: 'Cable Sizing for Underfloor Heating Circuits',
    content: (
      <>
        <p>
          The supply cable from the consumer unit to the thermostat must be correctly sized for the
          heating load. This is a standard{' '}
          <SEOInternalLink href="/tools/cable-sizing-calculator">
            cable sizing calculation
          </SEOInternalLink>{' '}
          using the methods in Appendix 4 of BS 7671, but with some important considerations
          specific to UFH circuits.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Design current (Ib):</strong> Calculate from the total heating load. For
                example, a 2,400W system: Ib = 2,400 / 230 = 10.4A. Use the full load — no diversity
                reduction for continuous heating.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Correction factors:</strong> Apply Ca (ambient temperature), Cg (grouping),
                and Ci (thermal insulation) as applicable. If the cable runs through insulated walls
                or ceiling voids, the thermal insulation factor can significantly reduce the current
                carrying capacity.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Voltage drop:</strong> Maximum 5% from the origin to the load (11.5V at
                230V). Calculate using the mV/A/m values from the cable tables. For a 20m run at
                10.4A on 2.5mm2 cable: voltage drop = 18 x 10.4 x 20 / 1000 = 3.74V (within limits).
                For longer runs, 4mm2 may be needed.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <Cable className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Typical sizes:</strong> 2.5mm2 T&E for loads up to about 2,400W on short
                runs (under 20m). 4mm2 T&E for loads up to 3,600W or longer runs. 6mm2 for very
                large systems or long cable routes.
              </span>
            </li>
          </ul>
        </div>
        <p>
          Remember that the cable from the thermostat to the consumer unit is the supply cable —
          this is the one you are sizing. The heating cable itself (the element in the floor) is a
          manufactured product with a fixed resistance and is not sized by the electrician. The cold
          tail connecting the heating element to the thermostat is also factory-supplied and rated
          for the heating element it serves.
        </p>
      </>
    ),
  },
  {
    id: 'insulation-testing',
    heading: 'Insulation Resistance Testing for UFH Cables',
    content: (
      <>
        <p>
          Insulation resistance testing is the most critical verification step for underfloor
          heating installations. A damaged heating cable buried under tiles or screed is extremely
          expensive to replace — early detection saves a costly floor removal.
        </p>
        <div className="rounded-2xl bg-white/[0.04] border border-white/10 p-6 my-4">
          <ul className="space-y-4 text-white">
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test 1 — Before installation:</strong> Test the heating cable out of the
                box, before unrolling. Measure insulation resistance between each core and the earth
                screen at 500V DC. Also measure the resistance between the two heating cores to
                confirm it matches the manufacturer's specification. Record the results.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test 2 — After laying, before covering:</strong> With the cable laid on the
                floor and fixed in position, repeat both tests. This confirms no damage occurred
                during installation — kneeling on the cable, nicking it with a trowel, or pinching
                it at a turn.
              </span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-yellow-400 mt-0.5 shrink-0" />
              <span>
                <strong>Test 3 — After covering:</strong> Once the screed or adhesive has been
                applied, test again as part of the final circuit{' '}
                <SEOInternalLink href="/guides/how-to-test-insulation-resistance">
                  insulation resistance test
                </SEOInternalLink>
                . This is the last chance to identify a problem before the floor finish goes down.
              </span>
            </li>
          </ul>
        </div>
        <p>
          A minimum insulation resistance of 1M ohm at 500V DC is the standard pass threshold. Most
          new heating cables will read well above this — typically 50M ohm or higher. A reading
          below 1M ohm indicates cable damage and the cable should not be energised until the fault
          is found and repaired or the cable is replaced.
        </p>
      </>
    ),
  },
  {
    id: 'for-electricians',
    heading: 'For Electricians: Making UFH Installations Efficient',
    content: (
      <>
        <p>
          Underfloor heating installation is a profitable job category for domestic electricians.
          The work combines new circuit installation (consumer unit to thermostat), specialist
          element laying, testing, and certification. The key to efficiency is having the right
          tools and completing all the paperwork on site.
        </p>
        <div className="space-y-4 my-4">
          <div className="rounded-2xl bg-yellow-500/10 border border-yellow-500/20 p-5">
            <div className="flex items-start gap-4">
              <Calculator className="w-6 h-6 text-yellow-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Cable Sizing Calculator</h4>
                <p className="text-white text-sm leading-relaxed">
                  Enter the heating load, circuit length, and installation method. Elec-Mate
                  calculates the correct cable size, applies all correction factors, checks voltage
                  drop, and confirms the MCB rating — in seconds.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-blue-500/10 border border-blue-500/20 p-5">
            <div className="flex items-start gap-4">
              <FileCheck2 className="w-6 h-6 text-blue-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">EIC Certificate on Site</h4>
                <p className="text-white text-sm leading-relaxed">
                  New circuit means an Electrical Installation Certificate is required. Elec-Mate
                  generates the EIC on your phone — fill in the schedule of test results, add the
                  circuit details, and send the completed certificate to the customer before you
                  leave.
                </p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl bg-green-500/10 border border-green-500/20 p-5">
            <div className="flex items-start gap-4">
              <ClipboardCheck className="w-6 h-6 text-green-400 mt-0.5 shrink-0" />
              <div>
                <h4 className="font-bold text-white mb-1">Quoting and Invoicing</h4>
                <p className="text-white text-sm leading-relaxed">
                  Price the UFH installation with Elec-Mate's quoting tool — materials, labour, and
                  margin. Send the quote, do the job, complete the certificate, and send the
                  invoice. The entire workflow from quote to paid — on your phone.
                </p>
              </div>
            </div>
          </div>
        </div>
        <SEOAppBridge
          title="Complete UFH installations faster with Elec-Mate"
          description="Cable sizing, circuit design, EIC certification, quoting, and invoicing — all on your phone. Join 430+ UK electricians already using the app. 7-day free trial."
          icon={Thermometer}
        />
      </>
    ),
  },
];

// -------------------------------------------------------------------
// Page
// -------------------------------------------------------------------

export default function UnderfloorHeatingElectricalPage() {
  return (
    <GuideTemplate
      title="Underfloor Heating Electrical | Wiring & Circuit Guide"
      description="Complete guide to electric underfloor heating wiring. Cable vs mat systems, dedicated circuit requirements, thermostat wiring, RCD protection, cable sizing, and insulation testing for UFH installations under BS 7671."
      datePublished="2025-06-15"
      dateModified="2026-02-13"
      breadcrumbs={breadcrumbs}
      tocItems={tocItems}
      badge="Installation Guide"
      badgeIcon={Thermometer}
      heroTitle={
        <>
          Underfloor Heating Electrical:{' '}
          <span className="text-yellow-400">Wiring, Circuits, and Compliance</span>
        </>
      }
      heroSubtitle="Electric underfloor heating requires a dedicated radial circuit, correct cable sizing, RCD protection, and proper thermostat wiring. This guide covers everything electricians need to know — from cable vs mat systems to insulation resistance testing and EIC certification."
      readingTime={12}
      keyTakeaways={keyTakeaways}
      sections={sections}
      faqs={faqs}
      faqHeading="Frequently Asked Questions About Underfloor Heating Electrical"
      relatedPages={relatedPages}
      ctaHeading="Size UFH Circuits and Certify on Your Phone"
      ctaSubheading="Cable sizing calculators, EIC certificates, quoting, and invoicing — all in one app. Join 430+ UK electricians using Elec-Mate. 7-day free trial, cancel anytime."
    />
  );
}
