import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { InlineCheck } from '@/components/apprentice-courses/InlineCheck';
import { Quiz } from '@/components/apprentice-courses/Quiz';
import { PageFrame, PageHero } from '@/components/college/primitives';
import {
  TLDR,
  LearningOutcomes,
  ContentEyebrow,
  ConceptBlock,
  RegsCallout,
  CommonMistake,
  Scenario,
  KeyTakeaways,
  FAQ,
  SectionRule,
  AmendmentBadge,
  AppendixTable,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'datacabling-m4s5-rack-u-sizing',
    question:
      'A 24-port patch panel uses 1U; a 48-port patch panel uses 1U; a typical 1Gb edge switch uses 1U; a vertical cable manager between two equipment columns is full-height. You need 2 patch panels (1×24, 1×48) and 1 switch in a single rack column. What is the minimum vertical capacity, allowing for cable management?',
    options: [
      '1U total — everything fits in 1U.',
      'About 5-6U as a minimum with cable management: 2U for patch panels (1U + 1U), 1U for the switch, plus 1U of horizontal cable manager between each panel and the switch (typically 2-3 of these in a stack of three active devices) — bringing the column to ~5-6U. Vertical cable managers either side run full rack height. Standards: TIA-569-E (TR sizing) recommends 25-40 percent rack-vertical headroom for cable management.',
      'Just 3U — patch panels only.',
      '20U regardless of equipment count.',
    ],
    correctIndex: 1,
    explanation:
      'Rack U-sizing in practice: 1U each for the active devices and 1U horizontal cable manager between most active devices to dress patch leads. So 2 panels + 1 switch + 2 horizontal managers = 5U minimum. Plus full-height vertical cable managers either side of the rack column. TIA-569-E recommends generous headroom — 25-40 percent of rack vertical capacity for cable management — because under-managed racks become unmanageable within 6 months as services churn.',
  },
  {
    id: 'datacabling-m4s5-tr-environment',
    question:
      'A specifier asks "what is the temperature and humidity envelope for a UK telecoms room in 2026?" — what figures should you cite, and from which standard?',
    options: [
      '15-20 °C and 30-50 percent RH from BS 7671.',
      '18-27 °C continuous (Class A1, ASHRAE-aligned) and 8-60 percent RH non-condensing — sourced from ANSI/TIA-569-E + Addendum 1 (2022). The pre-2022 figures of 18-24 °C / 40-55 percent RH are out of date. The wider envelope reflects modern equipment tolerance and energy-efficiency-driven cooling strategies. BS 7671 does not set TR environmental figures.',
      '0-50 °C and 0-100 percent RH.',
      '10-15 °C only.',
    ],
    correctIndex: 1,
    explanation:
      '18-27 °C continuous and 8-60 percent RH non-condensing is the current TIA-569-E + Addendum 1 (2022) figure. The pre-2022 18-24 °C / 40-55 percent RH is out of date and should not be cited. The wider envelope reflects modern hardware tolerance and the energy-efficiency push to operate at higher inlet temperatures. BS 7671 governs the LV / ELV electrical-safety dimensions of TRs but not the environmental envelope itself.',
  },
  {
    id: 'datacabling-m4s5-airflow',
    question:
      'You are racking a 1U switch with front-to-back airflow alongside another switch with back-to-front airflow in the same rack. What is the practical problem?',
    options: [
      'No problem — airflow direction does not matter.',
      "The two switches will pull each other's exhaust air into intake — one switch's hot exhaust becomes the other switch's cold-aisle intake, raising inlet temperature, raising fan speed, raising failure risk and noise. Mitigation: align all active devices to the same airflow direction (typically front-to-back / cold-aisle to hot-aisle in modern data-centre / TR design); use rack-mounted side-to-back duct kits for any device with non-standard airflow; or place non-conforming devices in a separate rack column.",
      'Mix airflow directions for redundancy.',
      'Reverse the rack to compensate.',
    ],
    correctIndex: 1,
    explanation:
      "Airflow direction is a real constraint. Hot-aisle / cold-aisle data-centre design works only when every device intake is on the cold aisle and every exhaust is on the hot aisle. Mixing airflow directions in a single rack creates short-circuit paths where one device's hot exhaust feeds another's intake — escalating inlet temperatures, escalating fan speeds, escalating failure rates. Standardise on one airflow direction, use duct kits to convert any non-conforming device, or isolate non-conforming devices in a separate area.",
  },
  {
    id: 'datacabling-m4s5-tr-sizing',
    question:
      'A small commercial TR needs to support about 200 horizontal links, 2 backbone fibre risers, and a small server rack. What minimum room dimensions should the design start from, and what standard sets them?',
    options: [
      '1 m × 1 m — TRs are small.',
      'TIA-569-E recommends approximately 3 m × 3.4 m (10 × 11 ft) as a small-TR minimum, scaling with port count. 200 horizontal links and a server rack call for at least 3.5 × 3.5 m to accommodate two equipment racks, the door swing, working clearance in front of the racks, vertical cable managers, and incoming containment. The TR also needs UPS / power redundancy, the 18-27 °C / 8-60 percent RH environmental envelope (TIA-569-E + Addendum 1, 2022), fire-stopped cable entries, and structural floor loading sized to the equipment.',
      '0.5 m × 0.5 m.',
      '20 m × 20 m regardless.',
    ],
    correctIndex: 1,
    explanation:
      'TIA-569-E sets the TR sizing rules. A small-TR minimum is around 3 m × 3.4 m; sizes scale with port count and the equipment to be housed. 200 horizontal links + server rack + UPS + cable management = at least 3.5 × 3.5 m practically. The room also needs the 18-27 °C / 8-60 percent RH environmental envelope, redundant power feeds where availability requires, fire-stopped cable entries (Module 4 Section 3), structural floor loading sized to the loaded equipment, and clear working space in front of every rack for moves / adds / changes.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does the abbreviation "U" mean in rack sizing, and what is its dimension?',
    options: [
      'U = rack unit; 1U = 44.45 mm (1.75 in) of vertical rack height.',
      'U = "unit" and equals exactly 10 cm of vertical rack height.',
      'U is the designation for one 19-inch rack mounting hole pitch.',
      'U means "universal" and carries no fixed standardised dimension.',
    ],
    correctAnswer: 0,
    explanation:
      '1U = 44.45 mm (1.75 in). Standardised by EIA-310 (US) and IEC 60297 (international). 19-inch rack standard refers to the equipment mounting width (482.6 mm between mounting holes). Floor-standing comms racks are typically 42U or 48U tall — about 2 m and 2.2 m respectively. Equipment vendors rate every chassis in U height; rack-elevation drawings stack U numbers from bottom (U1) to top.',
  },
  {
    id: 2,
    question:
      'What is the practical reason for using both vertical and horizontal cable management in a comms rack?',
    options: [
      'They are decorative only and serve no functional purpose in the rack build.',
      'Only vertical cable management is actually required; horizontal managers are surplus.',
      'Vertical managers route bulk between rows; horizontal managers dress each transition.',
      'Cable management of either kind is optional, so long as cords reach the patch ports.',
    ],
    correctAnswer: 2,
    explanation:
      'Vertical and horizontal management serve different scales. Vertical managers (full-height) handle bulk routing between many panels in a stack. Horizontal managers (1U between devices) provide local dressing, bend-radius space, and tidy jumper transitions. Both are needed. TIA-569-E recommends about 25-40 percent of rack vertical capacity reserved for management. Skipping either creates a rack that cannot be cleanly maintained.',
  },
  {
    id: 3,
    question:
      'What is the recommended TR temperature and relative humidity envelope per TIA-569-E + Addendum 1 (2022)?',
    options: [
      '15-25 °C and 50-70 percent RH, mirroring older office comfort figures.',
      '18-27 °C continuous and 8-60 percent RH non-condensing (the 2022 envelope).',
      '0-50 °C and 0-100 percent RH, matching the equipment storage limits.',
      '5-10 °C with no humidity limit, treating the TR like a chilled store.',
    ],
    correctAnswer: 1,
    explanation:
      'TIA-569-E + Addendum 1 (2022) sets 18-27 °C / 8-60 percent RH as the current envelope. The pre-2022 18-24 °C / 40-55 percent RH is older and out of date. The wider envelope reflects modern hardware tolerance and the energy-efficiency push to higher inlet temperatures. BS 7671 governs the LV / ELV electrical-safety dimensions of the TR but does not set the environmental figures themselves.',
  },
  {
    id: 4,
    question: 'What does "hot aisle / cold aisle" mean in rack airflow design?',
    options: [
      'Racks alternate so cold intakes face one aisle and hot exhausts face the other.',
      'Decorative naming applied to alternating rack rows with no airflow meaning.',
      'A description of the natural air-circulation pattern that forms inside any TR.',
      'A type of split heating-and-cooling system installed within the comms room.',
    ],
    correctAnswer: 0,
    explanation:
      'Hot aisle / cold aisle is a layout convention for rack rows. Cold aisle = device fronts facing each other; hot aisle = device backs facing each other. Combined with front-to-back airflow on every device, it eliminates short-circuit paths. Modern designs add containment (curtains, doors, ceilings) over the hot or cold aisle to fully separate the two air masses. In small TRs with one or two racks the convention scales down — the principle is the same: align airflow direction across all devices.',
  },
  {
    id: 5,
    question:
      'A 1U PDU (power distribution unit) is rated 16 A and feeds 8 IEC C13 outlets. Where should it be mounted in the rack and why?',
    options: [
      'Anywhere in the rack — PDU position is arbitrary and has no effect on the build.',
      'Vertical in the rear zero-U space (or 1U at the base) to keep equipment Us free.',
      'Only at the very top of the rack, above all of the active equipment and panels.',
      'Only outside the rack entirely, with the outlet cords fed in through the side panel.',
    ],
    correctAnswer: 1,
    explanation:
      'PDU placement is a design decision. Vertical zero-U PDUs (mounted in the rear cable management space, full rack height) are the modern default for medium-to-large racks — they leave every U front-and-rear free for active equipment. Horizontal 1U PDUs at the bottom of small racks are the simpler alternative. Top-mount works but routing is harder. Front-mount horizontal wastes equipment U space and is generally avoided. Always check current rating against active equipment load + 25 percent margin.',
  },
  {
    id: 6,
    question: 'What is the TIA-569-E recommended floor loading capacity for a TR / equipment room?',
    options: [
      'A minimum of 5 kPa is recommended for a general telecoms room or equipment room.',
      'A minimum of 1 kPa is sufficient for any TR, regardless of the rack count installed.',
      'No minimum floor loading figure exists; it is left entirely to the structural engineer.',
      'A minimum of 12 kPa (250 lbs/ft²), sized up to the actual loaded-rack weights.',
    ],
    correctAnswer: 3,
    explanation:
      'TIA-569-E recommends a minimum floor loading of 12 kPa (250 lbs/ft²) for general TR / ER use, with sizing to actual equipment. Loaded 42U racks containing chassis switches, server gear and UPS can exceed 800 kg — concentrated on a small footprint. Older buildings (especially upper floors) may have lower structural capacity than this figure; surveys at design stage prevent floor failures at install. Note: TIA-569-E covers TR / ER. TIA-942-C covers data-centres specifically (different regime).',
  },
  {
    id: 7,
    question:
      'What is the recommended ratio of patch-cord lengths in a comms rack to support clean cable management?',
    options: [
      'All cords the same length, so the rack looks uniform across every patch run.',
      'A small range of stocked lengths, each run using the shortest cord that reaches.',
      'All cords a generous 5 m, so any port can reach any other without a length check.',
      'Cord length is irrelevant to management, provided the cords meet the link spec.',
    ],
    correctAnswer: 1,
    explanation:
      'Patch-cord length matters for rack management. Stock a small range of lengths (0.5, 1, 1.5, 2, 3 m typically) and use the shortest that reaches each run with proper bend radius. Cords too long create slack arcs that interfere with cable management. Cords too short violate bend radius. Match cord colour to the service-type colour-coding convention (Module 4 Section 4). The discipline pays off — rack remains accessible for moves / adds / changes for the cabling life.',
  },
  {
    id: 8,
    question: 'Why does TR door access matter, and how should the room be sized to support it?',
    options: [
      'Door access to a TR is irrelevant to the design once the racks are positioned.',
      'A TR does not need a door at all, provided the room is access-controlled at floor level.',
      'The door must admit the largest equipment — typically 900 mm, with 1 m clearance.',
      'Door size is purely an aesthetic consideration matched to the rest of the building.',
    ],
    correctAnswer: 2,
    explanation:
      'TR door specification is a TIA-569-E requirement and a practical necessity. The door has to admit the largest piece of equipment ever to enter the room — a fully-loaded 42U rack on a wheeled trolley, chassis switches, UPS units. 900 mm minimum, ideally double-leaf, outward-opening for escape, access-controlled. Working clearance in front of racks is at least 1 m, preferably 1.2 m. Skimping on either makes future moves / adds / changes operationally painful.',
  },
  {
    id: 9,
    question: 'Why is rack security relevant on a structured-cabling job?',
    options: [
      'Comms equipment is not security-sensitive, so racks need no special protection.',
      'Rack locks are decorative and do not affect the design or the room specification.',
      "Security is solely the IT department's problem, never the cabling contractor's.",
      'Racks carry all the building data, so physical security is a TIA-569-E parameter.',
    ],
    correctAnswer: 3,
    explanation:
      'Rack security is part of cabling design. Comms racks are key infrastructure — switches, controllers, UPS, sometimes routing equipment with regulated-data flows. TIA-569-E requires physical security as a TR design parameter. Locking front and rear cabinet doors, access logs (electronic locks or sign-in registers), environmental monitoring (temperature / humidity / smoke / water leak), intrusion alarms — all standard parts of a competent TR design. The cabling contractor is part of the security supply chain.',
  },
  {
    id: 10,
    question:
      'What is the difference between TIA-569-E and TIA-942-C — and why does it matter on a UK 2026 cabling job?',
    options: [
      'TIA-569-E covers commercial-building TR/ER; TIA-942-C covers data-centres.',
      'They are the same standard published under two different reference numbers.',
      'TIA-942-C is the only relevant standard for any job, large or small.',
      'Neither standard applies on a UK job, which uses BS EN documents only.',
    ],
    correctAnswer: 0,
    explanation:
      'TIA-569-E covers commercial-building TRs, ERs and EFs. TIA-942-C covers data-centres specifically — with rated redundancy classes 1-4. Most UK commercial cabling work cites TIA-569-E (parallel to BS EN 50174-2 inside buildings). Data-centre projects also cite TIA-942-C and BS EN 50600 series for European harmonisation. Using TIA-942-C floor-loading figures on a normal TR is over-spec; using TIA-569-E figures on a data-centre is under-spec. Pick the right document for the scope.',
  },
];

const faqs = [
  {
    question: 'What is a 19-inch rack and why is it the universal standard for comms equipment?',
    answer: (
      <>
        The 19-inch rack standard fixes the equipment mounting width at 482.6 mm between mounting
        hole centres, with vertical sizing in U (1U = 44.45 mm). It originated in the 1920s
        telephone industry, was standardised by EIA-310 in the US and IEC 60297 internationally, and
        has dominated networking and telecoms equipment design ever since. Every switch, patch
        panel, cable manager, PDU and UPS designed for comms-room use is built to fit 19-inch racks.
        Using non-standard cabinets is expensive — every piece of equipment then needs custom
        adapters or shelving.
      </>
    ),
  },
  {
    question: 'How much spare U-capacity should I leave in a rack at first fit?',
    answer: (
      <>
        TIA-569-E recommends about 25-40 percent vertical headroom for cable management plus future
        equipment. On a typical 42U rack first-fit with 24 ports of patch panel, 1 access switch, 1
        PDU, 1 small UPS, you might use 8-10U at first fit — leaving the rest for growth, additional
        patch panels, more switches, future fibre / copper backbone gear. Skimping on rack capacity
        at first fit forces a second rack within 2-3 years; over-sizing costs little and absorbs the
        foreseeable refresh cycle. The rack is part of the building infrastructure, not the
        equipment refresh cycle.
      </>
    ),
  },
  {
    question: 'Are open-frame racks acceptable, or do I need a fully enclosed cabinet?',
    answer: (
      <>
        Both have their place. Open-frame racks (just the four corner posts, no doors / sides) give
        the easiest access and the best airflow, but offer no physical security and no dust /
        contamination protection. Enclosed cabinets (locking front and rear doors, side panels) give
        security, contamination control, and structured airflow management — at the cost of access.
        For a typical UK commercial TR with locked-room access control, open-frame is often
        acceptable; for shared-tenancy buildings or higher security needs, enclosed cabinets are
        standard. TIA-569-E discusses both.
      </>
    ),
  },
  {
    question: 'How do I size cooling / HVAC for a small TR?',
    answer: (
      <>
        Sum the active equipment heat dissipation in watts (vendor datasheets give "max heat
        rejection" in BTU/hr or W). Add the UPS losses (~5-10 percent of UPS load). Add a margin for
        future growth (25-50 percent). Divide by 1 kW per ton-of-cooling if specifying in tons. The
        HVAC engineer takes the heat-load figure and designs the cooling system. Maintain 18-27 °C
        inlet temperature per TIA-569-E + Addendum 1 (2022); 8-60 percent RH non-condensing. Smaller
        TRs (under about 3 kW of heat) often use split-AC; larger TRs use dedicated CRAC / CRAH
        units.
      </>
    ),
  },
  {
    question: 'What environmental monitoring should a TR have?',
    answer: (
      <>
        At minimum: temperature sensors near each rack inlet (so you see the actual inlet
        temperature, not the room ambient); relative humidity sensor in the room; smoke detection
        (passive smoke head linked to building alarm system); water-leak detection on the floor near
        any pipework / under any raised floor; intrusion alarm on the cabinet doors and the room
        door. Larger TRs add airflow sensors, particulate sensors, voltage / current monitoring on
        PDUs, and remote-readable environmental consoles (typically over the building network or
        out-of-band). The data feeds the building management system and the IT operations team.
      </>
    ),
  },
  {
    question: 'Where does BS 7671 fit into rack and TR design?',
    answer: (
      <>
        BS 7671 governs the electrical-safety dimensions of the TR. The LV / ELV power feeds to the
        rack PDUs are BS 7671 work — including AFDD requirements where the building qualifies under
        §421.1.7, RCD protection, circuit protection, accessible isolation. The ICT functional
        earthing under §545 applies — including the new MFET concept for buildings with multiple
        functional bonding conductors. The metallic rack itself sits in the equipotential bonding
        network per §444.5.3.1 (bonded to the MET / MFET via the building bonding architecture). The
        cabling within the rack falls under §716 for PoE / ELV DC distribution. BS 7671 does NOT set
        the rack layout, the U-sizing, the airflow, the floor loading, or the temperature envelope —
        those are TIA-569-E + BS EN 50174-2 territory. Both apply on every UK 2026 TR job.
      </>
    ),
  },
];

const DataCablingModule4Section5 = () => {
  const navigate = useNavigate();

  useSEO(
    'Rack and Patch Panel Organisation | Data Cabling Module 4.5 | Elec-Mate',
    'Rack and patch-panel organisation for structured cabling — rack U-sizing, horizontal vs vertical cable management, patch-cord lengths, hot-aisle / cold-aisle airflow, PDU placement, door access, security, weight loading, TR sizing per ANSI/TIA-569-E + Addendum 1 (2022); the 18-27 °C / 8-60 percent RH environmental envelope.'
  );

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/data-cabling-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 5"
            title="Rack and Patch Panel Organisation"
            description="The 19-inch rack as the universal comms infrastructure — U-sizing, horizontal and vertical cable management, patch-cord length discipline, hot-aisle / cold-aisle airflow, PDU placement, door access, security, weight loading. TR sizing and environmental envelope per ANSI/TIA-569-E + Addendum 1 (2022): 18-27 °C continuous / 8-60 percent RH non-condensing, alongside BS 7671 §444.5.3.1 (rack metalwork in the EBN) and §545 (ICT functional earthing)."
            tone="yellow"
          />

          <TLDR
            points={[
              'The 19-inch rack (482.6 mm equipment mounting width, 1U = 44.45 mm vertical) is the universal comms equipment standard. Floor-standing racks are typically 42U or 48U. Equipment heights are rated in U; rack capacity is sized for active gear plus 25-40 percent cable-management headroom (TIA-569-E).',
              'Cable management is two-layer: vertical managers full-height either side of the rack column for bulk routing between panel rows, and horizontal managers (1U) between active devices for local dressing and bend-radius. Both are needed; skipping either creates an unmaintainable rack within months.',
              'Airflow is hot-aisle / cold-aisle: every device intake on the cold aisle, every exhaust on the hot aisle. TIA-569-E + Addendum 1 (2022) sets the environmental envelope — 18-27 °C continuous, 8-60 percent RH non-condensing. PDUs (zero-U vertical or 1U horizontal at the rack base) deliver power; UPS backs critical loads; environmental monitoring closes the loop.',
              'TR sizing and design are TIA-569-E for typical UK commercial work; TIA-942-C for data-centres. Minimum small-TR around 3 m × 3.4 m, scaled to port count. 12 kPa floor loading minimum, 900 mm door minimum, 1 m+ working clearance in front of racks. BS 7671 §444.5.3.1 places the metallic rack into the EBN; §545 covers ICT functional earthing.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply 19-inch rack U-sizing to a real TR design — patch panels, switches, cable managers, PDUs, UPS — with appropriate cable-management headroom (25-40 percent per TIA-569-E)',
              'Specify vertical and horizontal cable management consistently — vertical for bulk routing, horizontal for local dressing — and stock patch-cord lengths matched to rack distances',
              'Apply hot-aisle / cold-aisle airflow design with all devices aligned front-to-back; mitigate non-conforming devices with duct kits or rack isolation',
              'Cite the TIA-569-E + Addendum 1 (2022) environmental envelope: 18-27 °C continuous, 8-60 percent RH non-condensing — and reject the older 18-24 °C / 40-55 percent figures as out of date',
              'Size a TR to TIA-569-E recommendations: minimum room dimensions, floor loading (12 kPa minimum), door access (900 mm minimum, outward-opening, access-controlled), working clearance in front of racks',
              'Specify PDU placement (vertical zero-U or horizontal 1U at base), UPS sizing with margin, environmental monitoring (temperature, humidity, smoke, water leak, intrusion)',
              'Place rack metalwork in the equipotential bonding network per BS 7671 §444.5.3.1; apply §545 ICT functional earthing where applicable; identify §716 PoE implications for in-rack patching',
              'Distinguish TIA-569-E (commercial TR / ER) from TIA-942-C (data-centre) and pick the right document for the project scope',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The 19-inch rack and U-sizing</ContentEyebrow>

          <ConceptBlock
            title="The universal comms standard — every component fits"
            plainEnglish="The 19-inch rack is the universal mounting infrastructure for telecoms / networking / data-centre equipment. The 19-inch refers to the equipment mounting width — 482.6 mm between the mounting hole centres on the front rails. Vertical sizing is in U: 1U = 44.45 mm (1.75 inches). Equipment is built to one of these standards. Standardised by EIA-310 (US) and IEC 60297 (international), the rack absorbs every brand and generation of comms equipment for decades."
            onSite="When you walk into a comms room, you are standing in front of 19-inch racks. Floor-standing 42U or 48U is the common size. Wall-mounted 6U / 12U / 18U cabinets are the small-room alternatives. Equipment heights are rated in U on every datasheet. A typical patch panel is 1U; a typical access switch is 1U; a chassis switch is 4-8U; a UPS is 2-3U; a horizontal cable manager is 1U; a vertical cable manager is full-height. Add the U numbers, plus management headroom, plus growth margin = total rack capacity."
          >
            <p>The U-sizing arithmetic, applied to a typical small TR rack:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>2 × 24-port patch panels.</strong> 2 × 1U = 2U. Patches face front;
                horizontal cabling enters from rear.
              </li>
              <li>
                <strong>2 × 1U horizontal cable managers (one above, one below the switch).</strong>{' '}
                2U. Provide local dressing for jumper cables between panels and switch.
              </li>
              <li>
                <strong>1 × 24-port edge switch.</strong> 1U. Or 2U for a stacked / chassis switch.
              </li>
              <li>
                <strong>1 × 1U fibre patch panel for the backbone uplink.</strong> 1U. With a
                horizontal manager above (1U). 2U total.
              </li>
              <li>
                <strong>1 × 2U UPS / battery backup.</strong> 2U. Sized to the active equipment + 25
                percent margin. Typically near the bottom of the rack to lower the centre of mass.
              </li>
              <li>
                <strong>Vertical cable managers either side.</strong> Full rack height (42U).
                Don\u2019t consume U-space for active equipment but constrain the usable rack width.
              </li>
              <li>
                <strong>PDU.</strong> Zero-U vertical (in the rear cable management space) or 1U at
                the base. Use 0U where possible.
              </li>
            </ul>
            <p>
              Add it up: 9-10U of active gear, 4U of management, 2U of UPS = 15-16U of a 42U rack
              used at first fit. The remainder absorbs growth, additional patch panels, additional
              switches, optional management gear, and the cable management headroom that TIA-569-E
              recommends. A 42U rack is typical for office TR work; 48U for higher-density /
              equipment-room use.
            </p>
          </ConceptBlock>

          {/* Rack elevation diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Hot-aisle / cold-aisle layout — top-down view of a row of racks
            </h4>
            <svg
              viewBox="0 0 900 540"
              className="w-full h-auto"
              role="img"
              aria-label="Top-down (plan) view of a row of four 19-inch comms racks. The cold aisle runs along the front of the racks (top of the diagram); the hot aisle runs along the rear (bottom). Each rack is numbered 1, 2, 3, 4 above the rack body. Blue arrows point from the cold aisle into the front of every rack; red arrows point from the rear of every rack into the hot aisle. The aisle labels sit in dedicated rows above and below the racks. A legend at the bottom maps colours to roles and notes the TIA-569-E + Addendum 1 (2022) environmental envelope."
            >
              {/* Header */}
              <text
                x="450"
                y="28"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="12"
                fontWeight="700"
                fontFamily="system-ui"
              >
                HOT-AISLE / COLD-AISLE — PLAN VIEW
              </text>

              {/* ===== Top label row: cold aisle ===== */}
              <text
                x="450"
                y="60"
                textAnchor="middle"
                fill="#A5F3FC"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                COLD AISLE — front of racks
              </text>
              <text
                x="450"
                y="78"
                textAnchor="middle"
                fill="#CFFAFE"
                fontSize="10"
                fontFamily="system-ui"
              >
                cooled supply air · 18 °C target inlet
              </text>

              {/* Cold aisle band — fill */}
              <rect
                x="60"
                y="92"
                width="780"
                height="40"
                rx="4"
                fill="rgba(34,211,238,0.10)"
                stroke="#22D3EE"
                strokeWidth="1.4"
                strokeDasharray="6 4"
              />

              {/* ===== Rack numbers row (above racks) ===== */}
              <text
                x="180"
                y="156"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                RACK 1
              </text>
              <text
                x="360"
                y="156"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                RACK 2
              </text>
              <text
                x="540"
                y="156"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                RACK 3
              </text>
              <text
                x="720"
                y="156"
                textAnchor="middle"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
              >
                RACK 4
              </text>

              {/* ===== Cold-aisle inflow arrows (above each rack, pointing down into rack front) ===== */}
              {[180, 360, 540, 720].map((cx) => (
                <g key={'cin-' + cx}>
                  <line x1={cx} y1="166" x2={cx} y2="186" stroke="#22D3EE" strokeWidth="1.8" />
                  <polygon points={`${cx},192 ${cx - 6},182 ${cx + 6},182`} fill="#22D3EE" />
                </g>
              ))}

              {/* ===== Rack row: y = 196 to 296 ===== */}
              {/* Rack 1 */}
              <rect
                x="120"
                y="196"
                width="120"
                height="100"
                rx="4"
                fill="rgba(252,211,77,0.16)"
                stroke="#FACC15"
                strokeWidth="1.8"
              />
              {/* front (top) edge highlighted blue */}
              <line x1="120" y1="196" x2="240" y2="196" stroke="#22D3EE" strokeWidth="3" />
              {/* rear (bottom) edge highlighted red */}
              <line x1="120" y1="296" x2="240" y2="296" stroke="#EF4444" strokeWidth="3" />
              {/* internal U-stack lines (visual texture only, no labels) */}
              {[212, 228, 244, 260, 276].map((y) => (
                <line
                  key={'r1u-' + y}
                  x1="128"
                  y1={y}
                  x2="232"
                  y2={y}
                  stroke="#FACC15"
                  strokeWidth="0.8"
                  strokeOpacity="0.5"
                />
              ))}

              {/* Rack 2 */}
              <rect
                x="300"
                y="196"
                width="120"
                height="100"
                rx="4"
                fill="rgba(252,211,77,0.16)"
                stroke="#FACC15"
                strokeWidth="1.8"
              />
              <line x1="300" y1="196" x2="420" y2="196" stroke="#22D3EE" strokeWidth="3" />
              <line x1="300" y1="296" x2="420" y2="296" stroke="#EF4444" strokeWidth="3" />
              {[212, 228, 244, 260, 276].map((y) => (
                <line
                  key={'r2u-' + y}
                  x1="308"
                  y1={y}
                  x2="412"
                  y2={y}
                  stroke="#FACC15"
                  strokeWidth="0.8"
                  strokeOpacity="0.5"
                />
              ))}

              {/* Rack 3 */}
              <rect
                x="480"
                y="196"
                width="120"
                height="100"
                rx="4"
                fill="rgba(252,211,77,0.16)"
                stroke="#FACC15"
                strokeWidth="1.8"
              />
              <line x1="480" y1="196" x2="600" y2="196" stroke="#22D3EE" strokeWidth="3" />
              <line x1="480" y1="296" x2="600" y2="296" stroke="#EF4444" strokeWidth="3" />
              {[212, 228, 244, 260, 276].map((y) => (
                <line
                  key={'r3u-' + y}
                  x1="488"
                  y1={y}
                  x2="592"
                  y2={y}
                  stroke="#FACC15"
                  strokeWidth="0.8"
                  strokeOpacity="0.5"
                />
              ))}

              {/* Rack 4 */}
              <rect
                x="660"
                y="196"
                width="120"
                height="100"
                rx="4"
                fill="rgba(252,211,77,0.16)"
                stroke="#FACC15"
                strokeWidth="1.8"
              />
              <line x1="660" y1="196" x2="780" y2="196" stroke="#22D3EE" strokeWidth="3" />
              <line x1="660" y1="296" x2="780" y2="296" stroke="#EF4444" strokeWidth="3" />
              {[212, 228, 244, 260, 276].map((y) => (
                <line
                  key={'r4u-' + y}
                  x1="668"
                  y1={y}
                  x2="772"
                  y2={y}
                  stroke="#FACC15"
                  strokeWidth="0.8"
                  strokeOpacity="0.5"
                />
              ))}

              {/* ===== Hot-aisle outflow arrows (below each rack, pointing down into hot aisle) ===== */}
              {[180, 360, 540, 720].map((cx) => (
                <g key={'hout-' + cx}>
                  <line x1={cx} y1="306" x2={cx} y2="326" stroke="#EF4444" strokeWidth="1.8" />
                  <polygon points={`${cx},332 ${cx - 6},322 ${cx + 6},322`} fill="#EF4444" />
                </g>
              ))}

              {/* Hot aisle band */}
              <rect
                x="60"
                y="340"
                width="780"
                height="40"
                rx="4"
                fill="rgba(239,68,68,0.10)"
                stroke="#EF4444"
                strokeWidth="1.4"
                strokeDasharray="6 4"
              />

              {/* Bottom label row: hot aisle */}
              <text
                x="450"
                y="402"
                textAnchor="middle"
                fill="#FECACA"
                fontSize="11.5"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.08em"
              >
                HOT AISLE — rear of racks
              </text>
              <text
                x="450"
                y="420"
                textAnchor="middle"
                fill="#FEE2E2"
                fontSize="10"
                fontFamily="system-ui"
              >
                exhaust air to return / cooling unit
              </text>

              {/* ===== Bottom legend panel ===== */}
              <rect
                x="40"
                y="442"
                width="820"
                height="86"
                rx="10"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
                strokeWidth="1"
              />
              <text
                x="60"
                y="466"
                fill="#FDE68A"
                fontSize="11"
                fontWeight="700"
                fontFamily="system-ui"
                letterSpacing="0.06em"
              >
                LEGEND
              </text>

              {/* Cold aisle swatch */}
              <rect
                x="60"
                y="478"
                width="14"
                height="14"
                rx="3"
                fill="rgba(34,211,238,0.18)"
                stroke="#22D3EE"
                strokeWidth="1.4"
              />
              <text x="84" y="490" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Cold aisle / device intake (front)
              </text>

              {/* Hot aisle swatch */}
              <rect
                x="320"
                y="478"
                width="14"
                height="14"
                rx="3"
                fill="rgba(239,68,68,0.20)"
                stroke="#EF4444"
                strokeWidth="1.4"
              />
              <text x="344" y="490" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                Hot aisle / device exhaust (rear)
              </text>

              {/* Rack swatch */}
              <rect
                x="600"
                y="478"
                width="14"
                height="14"
                rx="3"
                fill="rgba(252,211,77,0.22)"
                stroke="#FACC15"
                strokeWidth="1.4"
              />
              <text x="624" y="490" fill="#E5E7EB" fontSize="10.5" fontFamily="system-ui">
                19-inch rack (top-down)
              </text>

              {/* Standards line */}
              <text x="60" y="516" fill="#9CA3AF" fontSize="10" fontFamily="system-ui">
                TIA-569-E + Addendum 1 (2022): 18-27 °C continuous · 8-60 % RH non-condensing · all
                devices front-to-back
              </text>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Cable management — vertical and horizontal</ContentEyebrow>

          <ConceptBlock
            title="Two-layer management — bulk routing and local dressing"
            plainEnglish="Cable management in a comms rack is two-layer. Vertical cable managers (full rack height, either side of the equipment column) handle bulk patch-lead routing between rows of patch panels. Horizontal cable managers (1U devices placed between active equipment) provide local dressing and bend-radius space at each panel-to-switch transition. Both are required. Vertical alone leaves panel-to-switch jumpers undressed. Horizontal alone forces every patch lead to cross multiple panels. Together they create a clean, accessible, maintainable rack."
            onSite="Walk into a well-managed rack and you can see every patch lead, trace it from outlet identifier to switch port, and add or remove a single lead without disturbing others. Walk into a poorly-managed rack and patch leads form an opaque mat across the front of every panel. The difference is the management layout — and patch-cord length discipline. Stock 0.5 m, 1 m, 1.5 m, 2 m, 3 m cords colour-matched to your service-type colour-coding scheme; use the SHORTEST cord that reaches each run with proper bend radius."
          >
            <p>The cable management discipline, in three rules:</p>
            <ul className="list-disc pl-5 space-y-2 text-[14px]">
              <li>
                <strong>Vertical managers either side, full height.</strong> Provide the bulk
                routing column for patch leads moving between many panels and switches. Width
                typically 100-200 mm. Inside, finger trays or D-rings hold the cords and allow
                lateral access.
              </li>
              <li>
                <strong>Horizontal managers between active devices.</strong> 1U devices placed
                between every patch panel and every switch / panel transition. Provide local
                dressing space, bend-radius compliance for the 8× cable OD termination rule (Module
                4 Section 2), and a clean visual transition.
              </li>
              <li>
                <strong>Patch-cord length discipline.</strong> Stock a small range of lengths
                matched to actual rack distances (0.5, 1, 1.5, 2, 3 m). Use the SHORTEST cord that
                reaches each run with proper bend radius. Cords too long create slack arcs that
                block the management; cords too short violate bend radius. Match cord colour to the
                service-type colour-coding from Module 4 Section 4.
              </li>
            </ul>
            <p>
              Done well, the rack remains accessible and usable for the cabling life. Done poorly,
              the rack reaches "the next contractor opens it once" within a year. The cost of doing
              it well is a small percentage of the total rack cost; the lifecycle value is enormous.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · §444.5.3.1 (Rack metalwork in the equipotential bonding network — verbatim)"
            clause={
              <>
                The following parts shall be connected to the equipotential bonding network:
                <br />
                (a) metallic containment, conductive screens, conductive sheaths or armouring of
                data transmission cables or of information and communications technology equipment;
                <br />
                (b) functional earthing conductors of antenna systems;
                <br />
                (c) conductors of the earthed pole of a DC supply for information and communications
                technology equipment;
                <br />
                (d) functional earthing conductors;
                <br />
                (e) protective conductors.
              </>
            }
            meaning="The metal rack itself is part of the equipotential bonding network — exposed metalwork connected to the building EBN, joined electrically to the cable basket / tray entering the room, and bonded back to the MET (or MFET under §545 if functional earthing applies). The rack is not free-floating metalwork. Joints electrically continuous; bonding architecture per BS EN 50310. The 2 m × 2 m mesh cap from §444.1.3 applies in the TR — typically met by short bonding straps from rack to building bonding ring conductor."
            cite="Verified verbatim from bs7671_regulations.full_text · A4:2026 edition · BS 7671:2018+A4:2026, published 15 April 2026"
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Airflow — hot aisle, cold aisle, and PDU placement</ContentEyebrow>

          <ConceptBlock
            title="Aligned airflow direction · environmental envelope · power delivery"
            plainEnglish="Modern comms equipment is designed for front-to-back airflow — cold air enters the front, hot air exhausts to the back. Hot-aisle / cold-aisle layout aligns rows of racks so device fronts face each other across a cold aisle and device backs face each other across a hot aisle. Combined with appropriate cooling and the TIA-569-E + Addendum 1 (2022) environmental envelope of 18-27 °C / 8-60 percent RH non-condensing, the result is reliable equipment operation across the building life."
            onSite="On a small TR with one or two racks, the hot-aisle / cold-aisle principle scales down: align all devices to the same airflow direction (front-to-back); avoid mixing front-to-back and side-to-back devices in the same rack; provide cooling that delivers air to the cold side and removes hot air from the hot side. PDUs go vertical zero-U (in the rear cable management space, full rack height) or horizontal 1U at the base — never blocking equipment U-space at the front."
          >
            <p>The airflow / power discipline:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Aligned airflow direction.</strong> Every device front-to-back. Mixed
                airflow creates short-circuit paths where one device\u2019s exhaust feeds
                another\u2019s intake — escalating temperatures, fan speeds, and failure rates.
                Convert any non-conforming device with a side-to-back duct kit, or isolate it in a
                separate rack column.
              </li>
              <li>
                <strong>Environmental envelope (TIA-569-E + Addendum 1, 2022).</strong> 18-27 °C
                continuous (Class A1, ASHRAE-aligned), 8-60 percent RH non-condensing. The pre-2022
                figures of 18-24 °C / 40-55 percent RH are out of date. Cooling sized to total
                heat-rejection in watts plus 25-50 percent margin.
              </li>
              <li>
                <strong>PDU placement.</strong> Vertical zero-U (mounted in the rear cable
                management space, full rack height) leaves every front U free for active equipment.
                Horizontal 1U at the base is acceptable for smaller racks. Avoid front-mount
                horizontal PDUs — they waste U-space.
              </li>
              <li>
                <strong>UPS sizing.</strong> Sized to active equipment load + 25 percent margin,
                with runtime appropriate to the building\u2019s power-restoration profile (5-15
                minutes typical for a TR with diesel-backed grid; longer for sites without backup
                generation).
              </li>
              <li>
                <strong>Environmental monitoring.</strong> Temperature near each rack inlet (not
                just room ambient), humidity sensor in the room, smoke detection (linked to building
                alarm), water-leak detection (under raised floor / near pipework), intrusion alarm
                on rack and room doors. Larger TRs add airflow / particulate / voltage / current
                monitoring with remote consoles.
              </li>
            </ul>
          </ConceptBlock>

          <AppendixTable
            caption="TR / ER environmental envelope and design parameters"
            source="TIA-569-E + Addendum 1 (2022) — current alignment"
            headers={['Parameter', 'Recommended value', 'Notes']}
            rows={[
              [
                'Temperature (continuous)',
                '18-27 °C (Class A1, ASHRAE-aligned)',
                'Pre-2022 18-24 °C is out of date',
              ],
              ['Relative humidity', '8-60 % non-condensing', 'Pre-2022 40-55 % is out of date'],
              [
                'Floor loading (minimum)',
                '12 kPa (250 lbs/ft²)',
                'Sized to actual loaded-rack weight; 800+ kg loaded rack typical',
              ],
              [
                'Door (minimum)',
                '900 mm wide, outward-opening, access-controlled',
                'Doubles for chassis equipment; access logs',
              ],
              [
                'Working clearance (front of rack)',
                '1 m minimum, 1.2 m preferred',
                'For moves / adds / changes',
              ],
              [
                'Working clearance (rear of rack)',
                '1 m minimum where rear access used',
                'Less critical if cable management is front-only',
              ],
              ['Small TR (typical small)', '~3 m × 3.4 m (10 × 11 ft)', 'Scales with port count'],
              [
                'Power redundancy',
                'UPS sized to load + 25 % margin',
                'Redundant feeds where availability requires',
              ],
            ]}
            notes="TIA-569-E + Addendum 1 (2022) is the current commercial-building TR / ER standard. Data-centres use TIA-942-C (2024) with rated redundancy classes 1-4. BS EN 50600 series provides European / UK-aligned data-centre infrastructure framework. BS 7671 governs the LV / ELV electrical-safety dimensions of the TR but does not set the environmental figures themselves."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>TR sizing, security and weight loading</ContentEyebrow>

          <ConceptBlock
            title="Room-level constraints — door, floor, security, working clearance"
            plainEnglish="A TR is more than a rack. It is a room with structural / operational / security parameters that frame the rack design. TIA-569-E sets the room-level rules: minimum dimensions, floor loading, door size and access, working clearance in front of every rack, environmental controls, fire-stopped cable entries, security. Get the room wrong and the rack design has to compensate — usually badly."
            onSite="On every TR design, walk the proposed room with these questions: can a fully-loaded 42U rack on a wheeled trolley enter the room through the door? Is there 1 m clearance in front of every rack? Will the structural floor carry 800+ kg per loaded rack? Is the door access-controlled? Are cable entries fire-stopped (Module 4 Section 3)? Is the door outward-opening so a fault inside cannot block escape? If any answer is no, the room needs work before equipment goes in."
          >
            <p>The room-level design parameters, with the standard reference for each:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Minimum room dimensions.</strong> ~3 m × 3.4 m (10 × 11 ft) for a small TR,
                scaling with port count and equipment count. TIA-569-E.
              </li>
              <li>
                <strong>Floor loading.</strong> 12 kPa (250 lbs/ft²) minimum, sized to actual
                loaded-rack weight. Loaded 42U racks routinely exceed 800 kg. Surveys at design
                stage prevent floor failures at install. TIA-569-E.
              </li>
              <li>
                <strong>Door size and orientation.</strong> 900 mm minimum width, outward- opening
                (so a fault inside cannot block escape), access-controlled (electronic or PIN).
                Doubles or wider where chassis equipment will be moved through. TIA-569-E.
              </li>
              <li>
                <strong>Working clearance.</strong> 1 m minimum in front of every rack (preferably
                1.2 m), and 1 m at the rear if rear access is used for cable management. Working
                clearance is for moves / adds / changes, fault investigation, equipment replacement.
              </li>
              <li>
                <strong>Cable entries.</strong> Fire-stopped at every floor / wall penetration
                (Module 4 Section 3). Sized for current cable count plus growth. Routed via ladder
                rack / basket / conduit with the metallic containment placed in the EBN per BS 7671
                §444.5.3.1 (Module 4 Section 1).
              </li>
              <li>
                <strong>Security.</strong> Locking front and rear cabinet doors, access logs,
                intrusion alarms on cabinet and room doors. Building security policy / IT security
                policy may add CCTV coverage, biometric access, or dedicated security-rated
                cabinets.
              </li>
              <li>
                <strong>Power.</strong> Redundant feeds where availability requires. UPS sized to
                load + 25 percent. RCD protection, AFDD where the building qualifies under §421.1.7
                (typically not commercial offices, but some uses), accessible isolation. BS 7671
                §716 for any in-rack PoE distribution.
              </li>
            </ul>
            <p>
              The TR is a piece of building infrastructure with a 30-year life. The cabling inside
              it has a 15-20 year life. Equipment refreshes every 5-7 years. Get the room right at
              first fit and the cabling and equipment cycles all fit inside it without
              re-room-design. Get it wrong and every refresh fights the room.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <CommonMistake
            title="Mounting horizontal PDUs at the front of the rack, wasting equipment U-space"
            whatHappens={
              <>
                Small TR build. Installer fits a 1U horizontal PDU at the top of the rack,
                accessible from the front. Looks tidy on day one. Six months later the team needs to
                add an additional patch panel, but the active U-capacity above the switch is fully
                consumed by patch panels and managers. The PDU at the top now blocks the install.
                The remediation is to move the PDU to the rear or base — a half-day job involving
                disconnecting every active device from power. The first-fit choice cost half a day
                at year one.
              </>
            }
            doInstead={
              <>
                Specify zero-U vertical PDUs for medium-to-large racks, mounted in the rear cable
                management space, running full rack height. Every U-position at the front is then
                free for active equipment for the full rack life. For smaller racks, mount a
                horizontal PDU at the BASE of the rack (1U above the floor) — where it does not
                block growth and where its low position keeps the rack centre of mass low.
                Front-mount horizontal PDUs are the worst option — they waste U-space and create an
                awkward access pattern for power maintenance.
              </>
            }
          />

          <Scenario
            title="A new building specifies a single 42U rack TR with 200 horizontal links and growth potential — what TR design hits the brief?"
            situation={
              <>
                A new commercial fit-out, single floor, 200 outlets to the floor. The specifier has
                indicated a single 42U rack in a small TR, with growth expected over a 5-7 year
                horizon. The architect has allocated a 3 × 3 m cupboard for the TR. Building has
                dedicated grid power with no diesel backup, so UPS is the only power-resilience
                option.
              </>
            }
            whatToDo={
              <>
                Sense-check the room first: 3 × 3 m is the smaller end of TIA-569-E small-TR
                guidance — workable for a single rack, but tight if a second rack is needed later.
                Push back to 3.5 × 3.5 m if the brief allows. Specify floor loading to 12 kPa
                minimum (likely fine on ground floor, check upper floors). Door 900 mm minimum,
                outward-opening, access-controlled. Inside the rack: 9 × 24-port patch panels (216
                ports — 200 outlets + spare), 1 × 24-port edge switch (1U), 3-4 × horizontal cable
                managers, 1 × fibre patch panel for backbone, vertical cable managers either side,
                2-3U UPS at the base, zero-U PDUs in the rear. That is about 14U of active gear in a
                42U rack, leaving 28U for growth — a comfortable 7-year horizon. Environmental:
                18-27 °C / 8-60 percent RH per TIA-569-E + Addendum 1 (2022); split-AC sized to
                total heat-rejection + 30 percent. Monitoring: temperature, humidity, smoke,
                intrusion. Cable entries fire-stopped per Module 4 Section 3. Bonding: rack to MET
                via building bonding ring conductor, per BS 7671 §444.5.3.1; ICT functional earthing
                under §545 if applicable.
              </>
            }
            whyItMatters={
              <>
                The TR is the heart of the cabling system and a piece of building infrastructure
                with a 30-year life. Get the room wrong and the equipment refresh cycle fights the
                room every time. The first-fit cost of a properly specified TR is a small fraction
                of the lifecycle cost of working around an inadequate TR. Specify generously,
                document everything, and the building absorbs 15-20 years of service refresh inside
                the same room.
              </>
            }
          />

          <SectionRule />

          <KeyTakeaways
            title="Worth remembering"
            points={[
              '19-inch rack standard: 482.6 mm equipment mounting width; 1U = 44.45 mm vertical. Equipment heights rated in U; rack capacity sized for active gear plus 25-40 percent cable management headroom (TIA-569-E).',
              'Cable management is two-layer: vertical managers full-height either side (bulk routing) plus horizontal managers between active devices (local dressing). Both required. Patch-cord length discipline: 0.5, 1, 1.5, 2, 3 m stock; use the shortest with bend radius respected.',
              'Hot-aisle / cold-aisle airflow — every device front-to-back. TIA-569-E + Addendum 1 (2022) environmental envelope: 18-27 °C continuous, 8-60 percent RH non-condensing. Pre-2022 18-24 °C / 40-55 percent figures are out of date.',
              'TR sizing per TIA-569-E: small TR ~3 m × 3.4 m, scaled to port count. 12 kPa floor loading minimum. 900 mm door minimum, outward-opening, access-controlled. 1 m+ working clearance in front of racks. Fire-stopped cable entries (Module 4 Section 3).',
              'BS 7671 §444.5.3.1 places the metallic rack in the equipotential bonding network. §545 covers ICT functional earthing for buildings with functional bonding. §716 covers PoE / ELV DC distribution within the rack. TIA-569-E + BS 7671 + BS EN 50174-2 all apply on every UK 2026 TR job.',
            ]}
          />

          <FAQ items={faqs} />

          <SectionRule />

          <Quiz title="Knowledge check" questions={quizQuestions} />

          {/* Bottom navigation */}
          <nav className="flex flex-col-reverse sm:flex-row sm:justify-between gap-3 pt-8 mt-6 border-t border-white/10">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-4-section-4')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13.5px] font-medium touch-manipulation hover:bg-white/[0.1] active:scale-[0.98]"
            >
              <ArrowLeft className="h-4 w-4" /> Previous: ID Labelling Standards
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/data-cabling-module-5')}
              className="inline-flex items-center justify-center gap-2 w-full sm:w-auto h-12 px-5 rounded-full bg-elec-yellow text-black text-[13.5px] font-semibold touch-manipulation hover:bg-elec-yellow/90 active:scale-[0.98]"
            >
              Next module: Module 5
              <ChevronRight className="h-4 w-4" />
            </button>
          </nav>
        </PageFrame>
      </div>
    </div>
  );
};

export default DataCablingModule4Section5;
