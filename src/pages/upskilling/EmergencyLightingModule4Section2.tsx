import { ArrowLeft, ChevronLeft, ChevronRight, Activity } from 'lucide-react';
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
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'elm4-s2-selfcontained',
    question:
      'In a self-contained emergency lighting installation, where is the battery located and what does it power?',
    options: [
      'Inside each luminaire — the local battery powers that luminaire\'s lamp on mains failure.',
      'In a single central cabinet that feeds the emergency lamps of many luminaires together.',
      'In a remote panel that powers only the emergency lamp element of each luminaire.',
      'There is no battery — a self-contained luminaire runs its emergency lamp directly from the mains.',
    ],
    correctIndex: 0,
    explanation:
      'Self-contained = battery inside the luminaire. Every unit holds its own battery, charging circuit, lamp/LED and test electronics. The mains charges the battery in normal operation; on failure the local battery powers the local lamp for the rated autonomy. Each luminaire is electrically independent, so a fault in one (battery, lamp or driver) affects only that unit. The trade-off is many distributed batteries to maintain versus one central battery system.',
  },
  {
    id: 'elm4-s2-central',
    question:
      'A central battery system supplies emergency lighting for an entire building. What standard governs the central battery cabinet itself, and what is the consequence of cabinet failure?',
    options: [
      'No specific standard applies; any UPS will do, and cabinet failure has no real consequence.',
      'BS EN 50172 alone governs the cabinet, with no dedicated central-power-supply standard.',
      'Only the cabinet manufacturer\'s own instructions apply; there is no British/European standard for it.',
      'BS EN 50171:2021 — central power supply systems for safety services; cabinet failure darkens every luminaire.',
    ],
    correctIndex: 3,
    explanation:
      'BS EN 50171:2021 is the dedicated central-power-supply standard, specifying cabinet construction, battery management, automatic changeover, monitoring and 24-hour recharge. Cabinet failure is catastrophic — every luminaire shares the one central battery, so all go dark together. That single point of failure drives the PH120 + water-spray feeds and the fire-protected enclosure; self-contained systems distribute the risk across many luminaires instead.',
  },
  {
    id: 'elm4-s2-hybrid',
    question:
      'A large mixed-use building has high-criticality plant rooms, medium-criticality offices, and low-criticality storage. Which architecture typically optimises capital cost vs lifecycle cost?',
    options: [
      'All self-contained luminaires throughout the whole building.',
      'All central battery, with one cabinet covering every area.',
      'Hybrid — central battery for high-criticality areas, self-contained for the rest.',
      'A system that switches between modes depending on the day of the week.',
    ],
    correctIndex: 2,
    explanation:
      'Hybrid is common in real installations. Central battery suits high-criticality areas (plant rooms, escape stair cores, concourses) where cable spec, redundancy and centralised maintenance justify the cabinet; self-contained suits medium/low-criticality areas where retrofit ease, distributed fault tolerance and lower per-luminaire cost dominate. The decision driver is risk × area type, and mixed-use buildings rarely fit a single architecture cleanly.',
  },
  {
    id: 'elm4-s2-recharge',
    question:
      'BS EN 50171:2021 specifies the maximum recharge time for the central battery after a full discharge. What is the requirement?',
    options: [
      'Within 24 hours to at least 80% of rated capacity after a full discharge.',
      'Within 4 hours of a full discharge, back to the full rated capacity.',
      'No maximum recharge time is specified anywhere in the standard.',
      'Within 7 days of a full discharge, back to the full rated capacity.',
    ],
    correctIndex: 0,
    explanation:
      'Recharge to 80% within 24 hours is the BS EN 50171 + 50172 requirement. The 24-hour figure means the system is back to working capacity within a day of a discharge — important while the building stays occupied and another failure could occur. 80% is the practical operational capacity; 100% recharge is monitored separately. Emergency systems must be ready for the next event, not retired for a week of recovery.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the defining feature of a self-contained emergency luminaire?',
    options: [
      'It has no battery and relies entirely on a central supply for emergency operation.',
      'It is physically larger than an equivalent non-emergency luminaire.',
      'It runs from the mains only, with no independent emergency capability.',
      'It contains its own battery, charger, lamp and test electronics — fully independent for emergency duty.',
    ],
    correctAnswer: 3,
    explanation:
      'Self-contained = full emergency function inside the luminaire body. The mains charges the battery; on failure the battery powers the local lamp for the rated autonomy. Each luminaire is electrically independent, so faults are isolated — a failed unit affects only itself.',
  },
  {
    id: 2,
    question: 'What standard specifies the requirements for a central battery cabinet supplying emergency lighting?',
    options: [
      'BS EN 50171:2021 — central power supply systems for safety services.',
      'BS 5266-1 only, covering the whole emergency lighting installation including the cabinet.',
      'BS 7671 only, as the wiring regulations governing the supply to the cabinet.',
      'No standard applies specifically to a central battery cabinet for emergency lighting.',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 50171:2021 is the central-power-supply standard, covering cabinet construction, battery management, automatic changeover, monitoring, alarms and 24-hour recharge to 80%. It works alongside BS EN 50172:2024 (system design) and BS 5266-1:2025 (UK application); all three apply to a central battery installation.',
  },
  {
    id: 3,
    question: 'Why is a self-contained luminaire said to be "fault-tolerant by isolation"?',
    options: [
      'It simply tolerates faults silently, continuing to run without flagging them.',
      'It is built to a standard so high that it never develops faults in service.',
      'A fault in one luminaire affects only that unit and does not propagate to neighbours or the system.',
      'Any fault that develops is corrected automatically by the luminaire electronics.',
    ],
    correctAnswer: 2,
    explanation:
      'Each luminaire is its own emergency system, so a failed battery, driver, lamp or test board affects only that unit — the rest keep working in emergency mode on mains failure. This distributed fault tolerance is the advantage over central systems, where one cabinet fault can darken every luminaire.',
  },
  {
    id: 4,
    question: 'A central battery system has a single cabinet feeding 200 luminaires. What is the dominant architectural risk?',
    options: [
      'The cost of the cabling running back to the central cabinet.',
      'The colour temperature of the lamps fed from the cabinet.',
      'There is no significant architectural risk in a central system.',
      'Single point of failure — a cabinet fault takes every downstream luminaire offline at once.',
    ],
    correctAnswer: 3,
    explanation:
      'Central = single point of failure: a fault in the cabinet (battery, charger, control board or fire) darkens every downstream luminaire together. Mitigations exist — fire-protected enclosure with independent supply, BS EN 50171-rated equipment with monitoring, duty/standby cabinets, and PH120 + water-spray feeds — but the architectural risk is real and must be designed against.',
  },
  {
    id: 5,
    question: 'What is the typical design life of a sealed-lead-acid (SLA) battery in a self-contained emergency luminaire?',
    options: [
      'Around 4 years under typical UK office/retail conditions, after which replacement is planned.',
      'Around 10 years under typical indoor conditions before replacement is planned.',
      'About 20 years, comparable to the design life of the luminaire body itself.',
      'About 30 years, matching the service life of the building wiring.',
    ],
    correctAnswer: 0,
    explanation:
      '4 years is the typical SLA design life for emergency lighting duty. Actual life depends on temperature (heat halves it), cycling, charge regime and quality. End-of-life is triggered by the annual 3-hour duration test or a self-test alarm, not just calendar age, but the 4-year figure drives the maintenance budget. Lithium-ion lasts longer (5–8 years) at higher cost.',
  },
  {
    id: 6,
    question: 'A small retail unit with 8 emergency luminaires is being upgraded. Why is self-contained almost always the architecture chosen?',
    options: [
      'It is a strict regulatory requirement for small installations.',
      'It is chosen purely for aesthetic reasons in retail spaces.',
      'Practical and economic — only standard PH30 mains wiring is needed, with no cabinet or plant room.',
      'It is mandated by the building code for premises of this size.',
    ],
    correctAnswer: 2,
    explanation:
      'Self-contained dominates small installations because the central alternative needs disproportionate plant, cabling and capital with no scale benefit until many tens of luminaires. Each unit fits in place of a normal luminaire with little disruption; capital cost is low. Above ~50–100 luminaires the central economics start to compete.',
  },
  {
    id: 7,
    question: 'What is the BS EN 50171:2021 requirement for automatic mains-failure changeover in a central battery system?',
    options: [
      'Manual changeover only, operated by the maintenance contractor on attendance.',
      'Within 1 minute of the mains supply failing on the input side.',
      'Within 1 hour of the mains supply failing on the input side.',
      'Within 0.5 seconds — the cabinet switches the feed to the battery output on mains failure.',
    ],
    correctAnswer: 3,
    explanation:
      'BS EN 50171:2021 specifies 0.5 second changeover, ensuring continuity of illumination, with status indication and audible/visual alarms signalling the changeover. This rapid response is what distinguishes a BS EN 50171 emergency system from a generic UPS with longer transfer times.',
  },
  {
    id: 8,
    question: 'In a hybrid emergency lighting system, what typically drives the choice between self-contained and central-battery for a given area?',
    options: [
      'The criticality of the area, the duration required, the consequence of failure and the maintenance regime.',
      'The age of the building being fitted out and refurbished.',
      'The colour of the fire-resistant cable available for the installation.',
      'Random allocation across the areas to balance the installation workload.',
    ],
    correctAnswer: 0,
    explanation:
      'Criticality × consequence × maintenance economics drives the per-area decision. High-criticality areas (stair cores, hospital corridors, plant rooms, large concourses) get central feeds with PH120 + W cable; lower-criticality areas (offices, storage, retail floors) get self-contained luminaires for fault tolerance and easier retrofit. The hybrid is the natural answer for a mixed-use building because the optimum architecture varies across the site.',
  },
  {
    id: 9,
    question: 'A central battery cabinet is sited in an unmarked plant room with no labelling. The maintenance contractor accidentally switches off its supply during a scheduled outage. What is the consequence and what is the missing requirement?',
    options: [
      'There is no consequence — the cabinet keeps the lights on regardless.',
      'The luminaires stay on indefinitely from the cabinet output.',
      'Every luminaire goes dark once the autonomy expires; the missing item is a labelled, lockable isolator.',
      'The cabinet detects the loss and self-restarts when the supply is removed.',
    ],
    correctAnswer: 2,
    explanation:
      'Consequence = the system runs out its autonomy (1, 2 or 3 hours) and then goes dark until the supply is restored. The missing requirement is the BS 7671 Section 560 labelled, lockable means of isolation marked "EMERGENCY LIGHTING — DO NOT SWITCH OFF" — the engineering control against exactly this human-error isolation.',
  },
  {
    id: 10,
    question: 'Compare the lifecycle cost profile of self-contained vs central battery for a 300-luminaire installation.',
    options: [
      'Self-contained has lower capital cost but higher lifecycle cost; central is the reverse.',
      'Self-contained is always the cheaper option whatever the scale.',
      'Central battery is always the cheaper option whatever the scale.',
      'The two architectures cost the same over the life of the installation.',
    ],
    correctAnswer: 0,
    explanation:
      'Self-contained has lower capital cost (no cabinet, no high-current LV cabling, no plant room) but higher lifecycle maintenance cost (300 batteries to replace on rotation, distributed test access). Central has higher capital but lower lifecycle cost (one or two cabinets, centralised test and monitoring). The cross-over is application-dependent — central typically wins on lifecycle for ≥200–300 luminaires over a 20+ year life.',
  },
];

const EmergencyLightingModule4Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Self-contained vs central battery systems | Emergency Lighting Module 4.2 | Elec-Mate',
    description:
      'BS EN 50171:2021 central battery cabinets, self-contained luminaire architecture, hybrid systems, fault tolerance, lifecycle cost, BS EN 50172:2024 system design.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-4')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 4
          </button>

          <PageHero
            eyebrow="Module 4 · Section 2"
            title="Self-contained vs central battery systems"
            description="Two architectures, very different trade-offs. Self-contained puts a battery in every luminaire — distributed fault tolerance, cheap retrofit, many batteries to maintain. Central battery feeds many luminaires from one cabinet — single point of failure if not designed carefully, BS EN 50171:2021 governs the cabinet, lower lifecycle cost at scale. Most real buildings end up hybrid."
            tone="yellow"
          />

          <TLDR
            points={[
              'Self-contained: each luminaire has its own battery, driver, lamp, and test electronics. Mains charges the battery; on mains failure the battery powers the lamp. Fault-tolerant by isolation — a failed luminaire affects only itself.',
              'Central battery: one (or more) BS EN 50171:2021 cabinets feed multiple luminaires via fire-resistant cabling. Centralised maintenance and monitoring, but a single point of failure if not designed with redundancy.',
              'Hybrid: central battery for high-criticality areas (escape cores, plant rooms, large concourses), self-contained for lower-criticality areas (offices, storage). Most large mixed-use buildings end up here.',
              'BS EN 50171:2021 requires automatic mains-failure changeover within 0.5 seconds, monitoring + alarms, and 24-hour recharge to 80% rated capacity.',
              'Self-contained typical battery life ≈ 4 years (sealed lead acid) or 5-8 years (lithium-ion). End-of-life triggered by capacity test failure or self-test alarm.',
              'Capital cost: self-contained lower at small scale; central wins at large scale (≥200-300 luminaires).',
              'Lifecycle cost: central wins on long service life with stable building use; self-contained ties up labour in distributed battery replacement.',
              'Cable spec follows architecture: self-contained → PH30 typical (cable is charging path); central → PH120 + W typical (cable IS the life-critical signal).',
              'BS EN 50172:2024 is the system design standard — applies to both architectures and to hybrids.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Describe the self-contained luminaire architecture: internal battery, charger, lamp/LED, test electronics, mains feed as charging path',
              'Describe the central battery architecture: BS EN 50171:2021 cabinet, battery bank, distribution via fire-resistant cable, automatic 0.5-second mains-failure changeover',
              'Explain why self-contained is fault-tolerant by isolation and why central battery is a single point of failure unless mitigated',
              'Apply the hybrid architecture to mixed-use buildings — central for high-criticality areas, self-contained for lower-criticality',
              'Identify BS EN 50171:2021 cabinet requirements: monitoring, alarms, 24-hour recharge to 80%, fire-protected location, dedicated supply',
              'Compare capital cost vs lifecycle cost between architectures and identify the cross-over point as a function of scale and service life',
              'Match cable specification to architecture: PH30 for self-contained charging supplies, PH120 + W for central-battery luminaire feeds',
              'Plan maintenance regimes appropriate to each architecture — distributed battery replacement vs centralised cabinet management',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The self-contained architecture</ContentEyebrow>

          <ConceptBlock
            title="A complete emergency system inside each luminaire"
            plainEnglish="A self-contained emergency luminaire is a complete emergency lighting system in a single fitting. The fitting contains the lamp (typically LED), the driver, a battery, a battery charger, and test electronics. The mains supply enters the fitting, powers the lamp in normal mode, and trickle-charges the battery. When mains is interrupted — a power cut, a fire damaging the supply, a maintenance isolation, anything — the internal electronics detect the loss within milliseconds and switch the lamp to the battery feed. The lamp continues to illuminate at the rated emergency lumen output for the rated autonomy duration (typically 1, 2, or 3 hours). When mains is restored the lamp reverts to normal mode and the battery starts to recharge."
            onSite="Each luminaire is its own emergency system. Plan maintenance per-luminaire (battery replacement, lamp replacement, test cycles) and remember the fault-tolerance: a failed luminaire is just one luminaire down, not the whole system."
          >
            <p>The internal architecture of a self-contained luminaire:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Lamp / LED.</strong> The light source. Modern luminaires almost universally use
                LEDs — high efficacy, long lamp life (≥ 50,000 hours), cold-startable, drivable from
                low-voltage battery supply.
              </li>
              <li>
                <strong>Driver.</strong> The electronic ballast that powers the LED at the correct
                current. In emergency mode it switches to draw from the internal battery; in normal
                mode it draws from the rectified mains.
              </li>
              <li>
                <strong>Battery.</strong> The energy store for emergency operation. Typically sealed
                lead acid (SLA), nickel-metal-hydride (NiMH), nickel-cadmium (NiCd, less common in new
                builds), or lithium-ion. Sized for the rated autonomy and the lamp emergency power.
              </li>
              <li>
                <strong>Charger.</strong> The constant-current / constant-voltage charging circuit
                that maintains the battery at full charge during normal operation. Must complete
                recharge to ≥ 80% within 24 hours of full discharge.
              </li>
              <li>
                <strong>Test electronics.</strong> A processor or simpler logic that runs scheduled
                self-tests (monthly functional, annual duration), monitors battery health, and signals
                results via LEDs on the luminaire body or via DALI/wireless to a central monitor.
              </li>
              <li>
                <strong>Mains feed.</strong> A standard mains supply — line, neutral, CPC. Wired
                typically in PH30 fire-resistant cable per BS 8519. The feed is a charging path; it
                is not the life-critical signal path.
              </li>
            </ul>
            <p>
              The defining property is INDEPENDENCE. Every luminaire works on its own. There is no
              cable, cabinet, or shared component whose failure can take more than one luminaire
              offline. The architecture is fault-tolerant by isolation.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50172:2024 · Self-contained luminaire requirements"
            clause={
              <>
                Self-contained emergency luminaires shall comply with BS EN 60598-2-22 (luminaires for
                emergency lighting), shall provide rated illumination for the declared autonomy
                duration upon mains failure, shall recharge to at least 80% of rated capacity within
                24 hours, and shall provide test facilities (manual or automatic) verifying the
                emergency function. The mains supply to each luminaire shall be from the local final
                circuit serving the area, so that loss of the local lighting circuit triggers the
                emergency function.
              </>
            }
            meaning="Two important phrases. (1) 'BS EN 60598-2-22' — the luminaire-side product standard that the equipment must meet. (2) 'Mains supply from the local final circuit serving the area' — the emergency luminaire is typically wired to the SAME final circuit as the area's normal lighting. Loss of that circuit (anything from a tripped MCB to a fire damaging the supply) triggers the emergency function for that area. Wiring the emergency luminaire to a separate dedicated circuit defeats this — the emergency would not activate when the local lighting fails."
          />

          <ConceptBlock
            title="Why self-contained dominates retrofit and small installations"
            plainEnglish="Self-contained luminaires win on practical grounds in retrofit and small new-build because they slot into existing wiring with minimal disruption. There is no central cabinet to find space for, no dedicated plant room, no high-current low-voltage cabling running back to a battery room, and no specialist commissioning of a cabinet system. The work is per-luminaire: replace or add a fitting, terminate a standard mains supply (in fire-rated cable), and you are done. The capital cost is dominated by the luminaire itself."
          >
            <p>The practical advantages:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>No central plant.</strong> No cabinet, no battery room, no plant-room space.
                The building does not need to be modified to accommodate the system.
              </li>
              <li>
                <strong>Standard wiring.</strong> Each luminaire is wired with a standard mains supply
                — line, neutral, CPC — in fire-rated cable. No high-current low-voltage cabling, no
                specialist gland kits, no separate distribution gear.
              </li>
              <li>
                <strong>Per-luminaire decisions.</strong> Each fitting is a discrete unit. Adding,
                moving, or removing a luminaire is a small job; commissioning is verifying the
                self-test and the duration test for that one fitting.
              </li>
              <li>
                <strong>Distributed fault tolerance.</strong> A failed luminaire is one luminaire down.
                The rest of the system continues to function. The "failure" mode is graceful and
                isolated.
              </li>
              <li>
                <strong>Easy phased rollout.</strong> A retrofit can be done floor-by-floor, area-by-area,
                without requiring the whole building to be done at once. Each area is independent.
              </li>
            </ul>
            <p>
              The trade-off is that you have many batteries to maintain — one per luminaire. Battery
              replacement is a labour-intensive distributed task. For a 30-luminaire small office the
              labour is modest; for a 1000-luminaire campus it is substantial.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The central battery architecture</ContentEyebrow>

          <ConceptBlock
            title="One cabinet, many luminaires"
            plainEnglish="A central battery system is the architectural opposite. One — or sometimes more — central cabinets house a battery bank, a charger, a control board, monitoring, and an automatic mains-failure changeover. The cabinets are connected to the building's mains supply on the input side, and to the emergency luminaires on the output side via fire-resistant cabling. In normal operation the cabinet feeds the luminaires (often at low-voltage DC, sometimes at AC) while the battery is on float charge. On mains failure the cabinet switches the luminaire feed to the battery output within 0.5 seconds. The luminaires themselves contain only the lamp, the driver, and minimal control electronics — no battery, no charger."
          >
            <p>The central architecture elements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cabinet (BS EN 50171:2021 compliant).</strong> Houses the battery bank,
                charger, control board, monitoring, and mains-failure changeover. Standard sizes from
                small wall-mount units to large floor-standing cabinets serving hundreds of luminaires.
              </li>
              <li>
                <strong>Battery bank.</strong> Sized for the design autonomy at the design load.
                Typically sealed lead acid (large ampere-hour, lower cost per Wh, well-proven), or
                lithium-ion (longer life, smaller footprint, higher cost). Some systems use
                nickel-cadmium for very long life or extreme temperature applications.
              </li>
              <li>
                <strong>Charger.</strong> Constant-voltage / current-limited charger sized to recharge
                the bank to ≥ 80% within 24 hours per BS EN 50171. Includes temperature compensation
                and float-charge management.
              </li>
              <li>
                <strong>Mains-failure changeover.</strong> Automatic switching from mains-fed to
                battery-fed luminaire output, within 0.5 seconds of mains loss. Reverts to mains-fed
                + battery-charging on mains restoration.
              </li>
              <li>
                <strong>Monitoring.</strong> Local indicators (LEDs, display) and remote signals
                (volt-free contacts, communication bus) reporting cabinet status, battery state,
                changeover events, faults, and end-of-life conditions.
              </li>
              <li>
                <strong>Distribution.</strong> The luminaire feeds leave the cabinet on
                fire-resistant cabling — typically PH120 + BS 8434-2 water-spray (BS 8519 Category 3)
                because the cable IS the life-critical signal path. Loss of cable means loss of
                light; the cable must survive the fire and the fire-fighting.
              </li>
              <li>
                <strong>Luminaires.</strong> Simpler than self-contained — no battery, no charger.
                Lamp, driver, control electronics. Fed from the cabinet at the operating voltage.
              </li>
            </ul>
            <p>
              The architecture concentrates the emergency function in the cabinet. The luminaires are
              "dumb" by comparison. This concentration brings benefits (centralised maintenance,
              monitoring, single battery system to manage) and risks (single point of failure if the
              cabinet goes down).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50171:2021 · Central power supply systems for safety services"
            clause={
              <>
                The central power supply system shall provide automatic switching to the battery
                supply on detection of mains failure within 0.5 seconds. The battery shall be
                recharged to at least 80% of rated capacity within 24 hours of full discharge. The
                system shall provide monitoring of operational status, battery condition, charger
                operation, and shall raise audible and visual alarms on detection of any condition
                preventing correct operation. The system shall be installed in a location that
                provides protection against fire, mechanical damage, and unauthorised access.
              </>
            }
            meaning="The four headline requirements: 0.5-second changeover; 24-hour recharge to 80%; monitoring + alarms on faults; protected location. These are non-negotiable for a BS EN 50171-rated system. Generic UPS gear typically does not meet these requirements simultaneously and is therefore not acceptable for emergency lighting central battery duty."
          />

          <ConceptBlock
            title="Why central battery has a single-point-of-failure problem and how to mitigate it"
            plainEnglish="The architectural strength of central battery — concentrating the emergency function in one cabinet — is also its architectural weakness. A fault in the cabinet can take every luminaire offline simultaneously. The mitigations are well-understood and built into BS EN 50171, BS EN 50172, and BS 8519, but they have to be designed in deliberately."
          >
            <p>The single-point-of-failure mitigations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Fire-protected location.</strong> The cabinet is sited in a fire-rated
                enclosure or plant room — ideally one not adjacent to the highest-fire-load areas of
                the building. The location itself should not be the failure mode.
              </li>
              <li>
                <strong>Independent supply.</strong> The mains supply to the cabinet is from a
                dedicated final circuit, ideally direct from the supply main or a designated supply
                source per BS 7671 §560.10. No common-cause failure with the area lighting.
              </li>
              <li>
                <strong>BS EN 50171 monitoring.</strong> The cabinet self-monitors and raises alarms
                on charger failure, battery failure, control fault, or output fault. The duty-holder
                gets warning before the cabinet is needed in a real event.
              </li>
              <li>
                <strong>PH120 + W cabling.</strong> The luminaire feeds leave the cabinet in
                fire-resistant cable that survives both fire and fire-fighting water. The cable is
                not the failure point.
              </li>
              <li>
                <strong>Duty / standby cabinets.</strong> For high-criticality applications, two
                cabinets — one duty, one standby — with automatic changeover. A cabinet fault
                fails over to the standby; the system continues with no single point of failure.
              </li>
              <li>
                <strong>Multiple cabinets per zone.</strong> Splitting the building into zones with
                independent cabinets per zone limits the consequence of any single cabinet failure.
                The whole-building blackout becomes a single-zone blackout.
              </li>
              <li>
                <strong>Hybrid with self-contained backup.</strong> In some high-criticality
                applications, central-battery luminaires are supplemented by self-contained
                luminaires in the same area — the self-contained units provide a second independent
                emergency path that does not depend on the cabinet at all.
              </li>
            </ul>
            <p>
              Central battery is the right architecture for many large buildings, but only when the
              single-point-of-failure risk is consciously mitigated. A "central battery" specified
              casually, sited badly, fed casually, and operated without monitoring is a hazard in
              waiting.
            </p>
          </ConceptBlock>

          {/* Architecture comparison diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Self-contained vs central battery — architecture comparison
            </h4>
            <svg
              viewBox="0 0 880 540"
              className="w-full h-auto"
              role="img"
              aria-label="Side-by-side comparison of self-contained architecture (each luminaire has its own battery, fed from local lighting circuit) and central battery architecture (one cabinet feeds many luminaires via fire-resistant cable)."
            >
              <g>
                <rect x="20" y="30" width="410" height="490" rx="14" fill="rgba(34,197,94,0.05)" stroke="#22C55E" strokeWidth="2" />
                <text x="225" y="58" textAnchor="middle" fill="#22C55E" fontSize="14" fontWeight="bold">Self-contained</text>
                <text x="225" y="76" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="10">Battery in each luminaire</text>

                <rect x="60" y="100" width="130" height="40" rx="6" fill="rgba(251,191,36,0.10)" stroke="#FBBF24" strokeWidth="1.4" />
                <text x="125" y="124" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="bold">Local lighting circuit</text>

                <line x1="125" y1="140" x2="125" y2="170" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />
                <line x1="125" y1="170" x2="350" y2="170" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />
                <text x="240" y="164" fill="rgba(255,255,255,0.55)" fontSize="9">PH30 cable</text>

                <rect x="60" y="200" width="100" height="80" rx="8" fill="rgba(34,197,94,0.10)" stroke="#22C55E" strokeWidth="1.4" />
                <text x="110" y="222" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="bold">Luminaire</text>
                <circle cx="80" cy="252" r="8" fill="rgba(251,191,36,0.5)" stroke="#FBBF24" strokeWidth="1.2" />
                <text x="80" y="256" textAnchor="middle" fill="white" fontSize="8">B</text>
                <circle cx="110" cy="252" r="8" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
                <text x="110" y="256" textAnchor="middle" fill="white" fontSize="8">L</text>
                <circle cx="140" cy="252" r="8" fill="rgba(168,85,247,0.4)" stroke="#A855F7" strokeWidth="1.2" />
                <text x="140" y="256" textAnchor="middle" fill="white" fontSize="8">D</text>
                <line x1="125" y1="170" x2="110" y2="200" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />

                <rect x="180" y="200" width="100" height="80" rx="8" fill="rgba(34,197,94,0.10)" stroke="#22C55E" strokeWidth="1.4" />
                <text x="230" y="222" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="bold">Luminaire</text>
                <circle cx="200" cy="252" r="8" fill="rgba(251,191,36,0.5)" stroke="#FBBF24" strokeWidth="1.2" />
                <text x="200" y="256" textAnchor="middle" fill="white" fontSize="8">B</text>
                <circle cx="230" cy="252" r="8" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
                <text x="230" y="256" textAnchor="middle" fill="white" fontSize="8">L</text>
                <circle cx="260" cy="252" r="8" fill="rgba(168,85,247,0.4)" stroke="#A855F7" strokeWidth="1.2" />
                <text x="260" y="256" textAnchor="middle" fill="white" fontSize="8">D</text>
                <line x1="230" y1="170" x2="230" y2="200" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />

                <rect x="300" y="200" width="100" height="80" rx="8" fill="rgba(34,197,94,0.10)" stroke="#22C55E" strokeWidth="1.4" />
                <text x="350" y="222" textAnchor="middle" fill="#22C55E" fontSize="10" fontWeight="bold">Luminaire</text>
                <circle cx="320" cy="252" r="8" fill="rgba(251,191,36,0.5)" stroke="#FBBF24" strokeWidth="1.2" />
                <text x="320" y="256" textAnchor="middle" fill="white" fontSize="8">B</text>
                <circle cx="350" cy="252" r="8" fill="rgba(255,255,255,0.15)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.2" />
                <text x="350" y="256" textAnchor="middle" fill="white" fontSize="8">L</text>
                <circle cx="380" cy="252" r="8" fill="rgba(168,85,247,0.4)" stroke="#A855F7" strokeWidth="1.2" />
                <text x="380" y="256" textAnchor="middle" fill="white" fontSize="8">D</text>
                <line x1="350" y1="170" x2="350" y2="200" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />

                <text x="60" y="320" fill="rgba(255,255,255,0.7)" fontSize="9.5">B = Battery (in luminaire)</text>
                <text x="60" y="338" fill="rgba(255,255,255,0.7)" fontSize="9.5">L = LED / Lamp</text>
                <text x="60" y="356" fill="rgba(255,255,255,0.7)" fontSize="9.5">D = Driver + test electronics</text>

                <text x="60" y="394" fill="white" fontSize="11" fontWeight="bold">Properties</text>
                <text x="60" y="412" fill="rgba(255,255,255,0.7)" fontSize="9.5">→ Each luminaire independent</text>
                <text x="60" y="428" fill="rgba(255,255,255,0.7)" fontSize="9.5">→ Cable failure = mains failure (handled by battery)</text>
                <text x="60" y="444" fill="rgba(255,255,255,0.7)" fontSize="9.5">→ PH30 cable typical (charging path)</text>
                <text x="60" y="460" fill="rgba(255,255,255,0.7)" fontSize="9.5">→ Many distributed batteries to maintain</text>
                <text x="60" y="476" fill="rgba(255,255,255,0.7)" fontSize="9.5">→ Lower capital, higher distributed labour</text>
                <text x="60" y="492" fill="rgba(255,255,255,0.7)" fontSize="9.5">→ Wins on retrofit and small installations</text>
              </g>

              <g>
                <rect x="450" y="30" width="410" height="490" rx="14" fill="rgba(239,68,68,0.05)" stroke="#EF4444" strokeWidth="2" />
                <text x="655" y="58" textAnchor="middle" fill="#EF4444" fontSize="14" fontWeight="bold">Central battery</text>
                <text x="655" y="76" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="10">Single cabinet feeds many luminaires</text>

                <rect x="490" y="100" width="130" height="40" rx="6" fill="rgba(251,191,36,0.10)" stroke="#FBBF24" strokeWidth="1.4" />
                <text x="555" y="124" textAnchor="middle" fill="#FBBF24" fontSize="10" fontWeight="bold">Dedicated supply</text>

                <rect x="500" y="160" width="310" height="80" rx="10" fill="rgba(239,68,68,0.10)" stroke="#EF4444" strokeWidth="1.8" />
                <text x="655" y="183" textAnchor="middle" fill="#EF4444" fontSize="11" fontWeight="bold">BS EN 50171:2021 cabinet</text>
                <text x="655" y="201" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">Battery bank · charger · changeover · monitoring</text>
                <text x="655" y="218" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">0.5 s changeover · 24 h recharge to 80%</text>

                <line x1="555" y1="140" x2="555" y2="160" stroke="rgba(255,255,255,0.4)" strokeWidth="1.4" />

                <line x1="655" y1="240" x2="655" y2="270" stroke="#EF4444" strokeWidth="2" />
                <line x1="510" y1="270" x2="800" y2="270" stroke="#EF4444" strokeWidth="2" />
                <text x="655" y="262" textAnchor="middle" fill="#EF4444" fontSize="9" fontWeight="bold">PH120 + W cable (life-critical)</text>

                <rect x="490" y="290" width="90" height="60" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" />
                <text x="535" y="312" textAnchor="middle" fill="white" fontSize="9.5" fontWeight="bold">Luminaire</text>
                <text x="535" y="328" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8.5">(no battery)</text>
                <line x1="535" y1="270" x2="535" y2="290" stroke="#EF4444" strokeWidth="1.6" />

                <rect x="610" y="290" width="90" height="60" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" />
                <text x="655" y="312" textAnchor="middle" fill="white" fontSize="9.5" fontWeight="bold">Luminaire</text>
                <text x="655" y="328" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8.5">(no battery)</text>
                <line x1="655" y1="270" x2="655" y2="290" stroke="#EF4444" strokeWidth="1.6" />

                <rect x="730" y="290" width="90" height="60" rx="8" fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" />
                <text x="775" y="312" textAnchor="middle" fill="white" fontSize="9.5" fontWeight="bold">Luminaire</text>
                <text x="775" y="328" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="8.5">(no battery)</text>
                <line x1="775" y1="270" x2="775" y2="290" stroke="#EF4444" strokeWidth="1.6" />

                <text x="490" y="394" fill="white" fontSize="11" fontWeight="bold">Properties</text>
                <text x="490" y="412" fill="rgba(255,255,255,0.7)" fontSize="9.5">→ Cabinet feeds all luminaires</text>
                <text x="490" y="428" fill="rgba(255,255,255,0.7)" fontSize="9.5">→ Cable failure = light failure (life-critical)</text>
                <text x="490" y="444" fill="rgba(255,255,255,0.7)" fontSize="9.5">→ PH120 + W cable typical</text>
                <text x="490" y="460" fill="rgba(255,255,255,0.7)" fontSize="9.5">→ One cabinet to maintain (centralised)</text>
                <text x="490" y="476" fill="rgba(255,255,255,0.7)" fontSize="9.5">→ Higher capital, lower distributed labour</text>
                <text x="490" y="492" fill="rgba(255,255,255,0.7)" fontSize="9.5">→ Single point of failure unless mitigated</text>
              </g>
            </svg>
          </div>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Hybrid systems — best-of-both for mixed-use buildings</ContentEyebrow>

          <ConceptBlock
            title="Why most large buildings end up hybrid"
            plainEnglish="Real buildings rarely fit one architecture cleanly. A large mixed-use building has zones with very different criticality: an escape stair core where the consequence of any luminaire being dark is severe; an office floor where the consequence of one luminaire being dark is mild; a plant room with high fire load; a basement with no natural light at all. The optimum architecture for each zone is different. The hybrid approach assigns each zone its best-fit architecture and accepts the integration overhead as a fair trade for area-by-area optimisation."
          >
            <p>The typical hybrid allocation:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Escape stair cores → central battery.</strong> Highest criticality. Any failure
                here is on the only escape route. Justifies BS EN 50171 cabinet, PH120 + W cabling,
                centralised monitoring. Often duty/standby cabinets for redundancy.
              </li>
              <li>
                <strong>Plant rooms → central battery.</strong> High fire load, deep in the building,
                cable runs pass through high-risk environments. Central is appropriate; PH120 + W
                cable is essential.
              </li>
              <li>
                <strong>Large concourses, atria, large halls → central battery.</strong> High occupancy,
                high consequence of single-luminaire failure (large area to illuminate from many
                fittings), lifecycle economics favour central.
              </li>
              <li>
                <strong>Office floors, retail floors → self-contained.</strong> Moderate criticality,
                distributed layout, retrofit-friendly. Self-contained per fitting; PH30 cabling on
                local lighting circuits.
              </li>
              <li>
                <strong>Storage, ancillary spaces → self-contained.</strong> Lowest criticality.
                Self-contained for simplicity and cost. PH30 cabling.
              </li>
              <li>
                <strong>Critical task areas (operating theatres, control rooms, high-risk processes)
                → BOTH.</strong> Sometimes central battery is supplemented with self-contained units
                in the same space, providing two independent emergency paths. The cabinet failure
                does not extinguish the area; the self-contained luminaires continue.
              </li>
            </ul>
            <p>
              The hybrid is not a compromise — it is an optimum. The integration challenge is in
              testing, monitoring, and maintenance regimes (you have two systems to manage), but the
              capital cost reflects criticality and the lifecycle cost is well-managed.
            </p>
          </ConceptBlock>

          <Scenario
            title="A new-build hospital — architecture decision"
            situation="A new district general hospital is being designed. The brief includes operating theatres, ICUs, wards, public concourses, plant rooms, and back-of-house storage and circulation. The client asks the design team to propose the emergency lighting architecture."
            whatToDo="Adopt a hybrid. (1) Operating theatres and ICUs: BOTH central battery (BS EN 50171, duty/standby cabinets, PH120 + W cabling) AND self-contained per-luminaire backup. Two independent paths because the consequence of any darkness during a clinical event is catastrophic. (2) Wards, escape corridors, stair cores: central battery, single cabinet per zone with BS EN 50171 monitoring, PH120 + W cabling. High criticality; centralised maintenance suits the hospital facilities team. (3) Public concourses and atria: central battery (large area, high occupancy, lifecycle favours central). (4) Office space, ancillary, retail: self-contained. Easy retrofit; per-fitting maintenance fits the in-house team. (5) Plant rooms and back-of-house: central battery on the same cabinets serving the wards, with PH120 + W cabling because of the high fire load. Document the architecture per zone on the as-built and operating manual; commission per BS EN 50172:2024."
            whyItMatters="Trying to specify a single architecture for the whole hospital ends up either over-engineering the simple areas (cost) or under-engineering the critical ones (risk). Architecture follows criticality, area by area. The hospital example is the case study every designer should know — it illustrates the full decision space."
          />

          <CommonMistake
            title="Specifying a generic UPS instead of a BS EN 50171:2021 cabinet"
            whatHappens="A central battery system is needed. The contractor sources a generic IT-grade UPS from a stock supplier — half the price of a BS EN 50171 cabinet, looks similar, has battery and changeover. It is installed and commissioned. Six months later, during a routine fire drill, the mains is cycled and the UPS takes 4 seconds to changeover (rather than the BS EN 50171-required 0.5 seconds). The luminaires flicker dark for 4 seconds during the fire drill. In a real fire that 4-second blackout is enough to disorient evacuating occupants on the stair. The system fails its commissioning test and must be replaced — at full BS EN 50171 cabinet cost on top of the wasted UPS cost."
            doInstead="Specify BS EN 50171:2021 explicitly on the drawings, the schedule of work, and the procurement order. The standard exists precisely to distinguish emergency-rated equipment from generic IT/commercial UPS gear. The differences are real (0.5 s changeover, 24 h recharge to 80%, monitoring + alarms, fire-protected location, certified battery management). A generic UPS will not pass commissioning and is not compliant. The cost saving is illusory."
          />

          <CommonMistake
            title="Treating a hybrid system as two independent installations for testing"
            whatHappens="A hybrid building has central battery for the escape cores and self-contained for the offices. The maintenance contractor does the central-battery 3-hour duration test on Monday and the self-contained tests on Tuesday — separately, with different test schedules, different log books, different reports. The duty-holder has two parallel sets of paperwork that must be cross-referenced manually. A defect in one system is logged in one log book and not seen in the other. After a year, drift between the two records leaves the actual compliance state unclear."
            doInstead="Treat the hybrid as ONE emergency lighting system with two architectures. Single test schedule integrated across both. Single log book or unified electronic record covering all luminaires regardless of architecture. Single hand-over pack at the start and single annual report. Modern self-test electronics and central monitoring tools can usually consolidate the records — DALI bus integration, cloud monitoring, BMS integration. The unified record is the auditable artifact; the architecture is an implementation detail underneath it."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Comparing capital cost vs lifecycle cost</ContentEyebrow>

          <ConceptBlock
            title="The cross-over point"
            plainEnglish="At small scale (10-50 luminaires), self-contained almost always wins on capital cost — no cabinet, no plant room, no specialist cabling. At large scale (300+ luminaires), the lifecycle picture inverts: maintaining 300 distributed batteries is more labour than maintaining one central cabinet. Somewhere between 50 and 300 there is a cross-over point where the choice depends on the specifics of the application — service life, labour rates, building type, criticality."
          >
            <p>The cost components to weigh:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Capital — self-contained.</strong> Per-luminaire cost (battery, charger, test
                electronics built in) × number of luminaires. PH30 cable + standard accessories.
                Commissioning per fitting.
              </li>
              <li>
                <strong>Capital — central battery.</strong> Cabinet (BS EN 50171, scaled to load and
                duration) + plant room + PH120 + W cabling + dedicated supply + commissioning. Per-luminaire
                cost is lower (no battery / charger in the fitting) but the fixed costs (cabinet etc.)
                are substantial.
              </li>
              <li>
                <strong>Lifecycle — self-contained.</strong> Battery replacement every ≈ 4 years per
                fitting × number of fittings. Distributed access (some at high level, some in
                difficult positions). Per-luminaire test and maintenance. Drives recurring labour cost.
              </li>
              <li>
                <strong>Lifecycle — central battery.</strong> Cabinet maintenance (capital-intensive
                but centralised), battery bank replacement on rotation (typically 5-10 years per
                bank), monitoring system upkeep. Single access point for most maintenance. Lower
                recurring labour at scale.
              </li>
              <li>
                <strong>Cable — self-contained.</strong> PH30 fire-resistant on local lighting
                circuits. Lower cable cost than PH120 + W.
              </li>
              <li>
                <strong>Cable — central battery.</strong> PH120 + W from cabinet to every luminaire.
                Higher cable cost; longer runs; more fire-stopping at compartment penetrations.
              </li>
              <li>
                <strong>Service-life economics.</strong> A 25-year operational life amortises the
                central-battery capital over more years; a short tenancy makes self-contained more
                attractive because the capital is per-fitting and walks with the next refurbishment.
              </li>
            </ul>
            <p>
              The decision is not abstract. A whole-life cost model — capital + operating cost over
              service life — is the right framework. Most quotes only give you capital; ask the
              designer to show you the operating cost too.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 50172:2024 · System design and verification"
            clause={
              <>
                The design of the emergency lighting system shall consider the building risk profile,
                the duration required, the fault-tolerance architecture (self-contained, central
                battery, hybrid, or other), the maintenance regime over service life, and the
                integration with fire-resistant cabling per the relevant cable standards. The design
                shall be documented including the architecture rationale, the load and duration
                calculation, the cable schedule, and the test and maintenance schedule.
              </>
            }
            meaning="The 2024 edition makes the architecture choice an explicit design output, not an implicit consequence of habit. The designer must consider all options, document the rationale, and show the calculations. 'Architecture rationale' means: why this architecture, in this building, for this client, given this service life. That documentation is what auditors and successor designers rely on."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Maintenance regimes — different architectures, different work</ContentEyebrow>

          <ConceptBlock
            title="What maintenance looks like for each"
            plainEnglish="The architectures generate different maintenance work patterns. Self-contained = many small jobs, distributed throughout the building, on a rolling cycle. Central battery = fewer larger jobs, concentrated at the cabinet, on a less-frequent cycle. Both must comply with BS EN 50172:2024 (monthly functional, annual 3-hour duration, plus the new 5-year photometric check from BS 5266-1:2025). The work content is what differs."
          >
            <p>Self-contained maintenance work:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Monthly functional test.</strong> Each luminaire activated briefly to verify
                emergency mode. With self-test electronics this is automated; without, it is a manual
                check of every fitting.
              </li>
              <li>
                <strong>Annual 3-hour duration test.</strong> Every luminaire run on battery for 3
                hours (or rated autonomy) to verify the battery delivers full duration at rated
                output. Automated by the test electronics or done manually depending on system.
              </li>
              <li>
                <strong>Battery replacement every ≈ 4 years.</strong> Distributed across all
                luminaires. A 200-fitting installation replaces ≈ 50 batteries per year on rolling
                schedule.
              </li>
              <li>
                <strong>Per-luminaire fault response.</strong> When a fitting fails self-test, attend
                that fitting, diagnose, replace battery / driver / lamp / fitting as required.
              </li>
            </ul>
            <p>Central battery maintenance work:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cabinet routine inspection (typically monthly).</strong> Visual check, status
                indicator review, alarm log review, battery condition check (where instrumented).
              </li>
              <li>
                <strong>Annual 3-hour duration test.</strong> Full system discharge and 3-hour run.
                Done at the cabinet with monitoring of battery voltage, current, temperature, and
                downstream luminaire operation.
              </li>
              <li>
                <strong>Battery bank replacement (typically 5-10 years).</strong> Major maintenance
                event. Cabinet down for the duration; portable backup may be needed for the building.
              </li>
              <li>
                <strong>Cabinet major service.</strong> Charger inspection, control board firmware
                updates, monitoring system review.
              </li>
              <li>
                <strong>Per-luminaire faults.</strong> Less frequent than self-contained because the
                luminaires themselves are simpler (no battery / charger), but PH120 + W cable issues
                and connector / driver issues at the luminaire still occur.
              </li>
            </ul>
            <p>
              The maintenance schedule should be in the hand-over operating manual, indexed to the
              architecture and to the specific products installed. The duty-holder uses it as the
              annual planning template.
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Self-contained = battery in each luminaire. Each fitting is its own emergency system. Fault-tolerant by isolation; a failed fitting affects only itself.',
              'Central battery = one BS EN 50171:2021 cabinet feeds many luminaires via PH120 + W cable. Single point of failure unless mitigated by location, redundancy, monitoring.',
              'Hybrid = central for high-criticality areas (escape cores, plant rooms, large concourses), self-contained for lower-criticality (offices, storage). Most large mixed-use buildings.',
              'BS EN 50171:2021 cabinet requirements: 0.5-second mains-failure changeover, 24-hour recharge to 80% rated capacity, monitoring + alarms, protected location.',
              'Self-contained battery typical life ≈ 4 years SLA, 5-8 years lithium-ion. End-of-life triggered by capacity test failure or self-test alarm.',
              'Cable spec follows architecture: self-contained → PH30 (charging path); central → PH120 + W (life-critical signal path).',
              'Capital cost: self-contained wins at small scale. Lifecycle cost: central wins at larger scale (≥ 200-300 luminaires) and longer service life.',
              'Generic IT-grade UPS gear is NOT a substitute for a BS EN 50171:2021 cabinet — different changeover times, different monitoring, different battery management, different commissioning.',
              'BS EN 50172:2024 governs the design and verification of the system regardless of architecture. The design documentation must include the architecture rationale.',
              'Treat a hybrid as ONE emergency lighting system. Unified test schedule, log book, and report — not two parallel records that drift apart over time.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'When does central battery become more cost-effective than self-contained?',
                answer:
                  'Typically around 200-300 luminaires in a stable building with a 20+ year service life and centralised facilities maintenance. Below ≈ 100 luminaires, self-contained almost always wins on capital cost; above ≈ 300, central wins on lifecycle. Between 100 and 300 the answer depends on building specifics — service life, criticality, labour rates, plant-room availability. A whole-life cost model is the right framework, not a rule of thumb.',
              },
              {
                question: 'What is the difference between BS EN 50171 and BS EN 50172?',
                answer:
                  'BS EN 50171:2021 specifies the central power supply system itself — the cabinet, the battery management, the changeover, the monitoring. BS EN 50172:2024 specifies the emergency lighting SYSTEM as a whole, including design, layout, maintenance, and verification. They are complementary: 50171 is the equipment standard for the cabinet, 50172 is the system standard for the installation. BS 5266-1:2025 is the UK code of practice that interprets and applies both.',
              },
              {
                question: 'Can a self-contained luminaire and a central-battery luminaire share a circuit?',
                answer:
                  'No, they should not. The two architectures use the cable differently — self-contained uses the cable as a charging path, central battery uses it as a life-critical low-voltage feed. Mixing them on one circuit means neither architecture is realised cleanly. In hybrid installations, the two architectures use separate circuits (and usually separate cable types — PH30 vs PH120 + W).',
              },
              {
                question: 'What happens if a self-contained luminaire battery fails?',
                answer:
                  'The luminaire continues to operate in normal mode (mains-powered) but no longer provides emergency function. Modern self-test electronics detect the failure and signal it via local LED and/or central monitoring. The luminaire fails its next monthly functional test or annual duration test. Maintenance attends, replaces the battery (or the whole fitting if the battery is non-replaceable), and re-commissions. Importantly, only that one luminaire is affected — neighbours continue to function.',
              },
              {
                question: 'What happens if a central battery cabinet fails?',
                answer:
                  'Every luminaire fed by that cabinet loses emergency function. The cabinet alarms and signals to the duty-holder (BS EN 50171 monitoring requirement). Maintenance attends within the response time defined in the operating contract. While the cabinet is down, the area is exposed — emergency lighting is not available if mains fails simultaneously. Mitigations: duty/standby cabinets (automatic failover), fire-protected location, BS EN 50171-rated equipment with reliable monitoring, hybrid backup with self-contained luminaires in the same area.',
              },
              {
                question: 'Why does a generic UPS not work as an emergency lighting central battery?',
                answer:
                  'Generic UPS gear is designed for IT continuity — typical changeover times of 1-10 seconds, recharge profiles optimised for 24/7 IT loads, monitoring designed for server-room dashboards. It does not meet the BS EN 50171:2021 emergency-rated requirements: 0.5 s changeover, 24 h recharge to 80% specifically for emergency duty, monitoring + alarms specifically for life-safety status, fire-protected location requirements, certified battery management for emergency duty cycles. A UPS is not the same product class as an emergency-rated CPSS, even if it looks similar.',
              },
              {
                question: 'In a hybrid system, who decides which areas get which architecture?',
                answer:
                  'The system designer, working with the client, fire engineer, and (where applicable) the building control body. The decision is documented per zone in the design. Typical drivers: criticality of the area, required autonomy, building risk profile, retrofit vs new-build, maintenance regime, capital vs lifecycle preference, integration with fire alarm and BMS. BS EN 50172:2024 expects the architecture rationale to be part of the design documentation — the decision is auditable.',
              },
              {
                question: 'Can a central battery cabinet be added to an existing self-contained system?',
                answer:
                  'Yes — it is a common retrofit pattern when an existing self-contained installation needs upgraded performance in a critical area. The new cabinet feeds new (or rewired) luminaires in the upgraded zone via PH120 + W cable; the existing self-contained luminaires elsewhere continue. The result is a hybrid system. The integration must be documented and the test/maintenance schedule updated to reflect the dual architecture. BS EN 50172:2024 provides the framework for verifying the hybrid as a single system.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Self-contained vs central battery — Module 4.2" questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-4')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 4
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-4-section-3')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                4.3 Battery sizing and autonomy
              </div>
            </button>
          </div>

          <div className="hidden">
            <Activity />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default EmergencyLightingModule4Section2;
