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
    id: 'fam3-s1-zonesize',
    question:
      'What is the maximum floor area a single fire detection zone may cover under BS 5839-1:2025?',
    options: [
      '1,000 m².',
      'Up to 2,000 m² floor area, with the additional constraint that the search distance within the zone (the distance a person tracing the alarm has to walk to find the operated device) does not exceed 60 m for a non-addressable installation. Both limits apply simultaneously — the smaller of the two governs.',
      '500 m².',
      'No limit if the building is a single compartment.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5839-1:2025 clause 13 retains the 2,000 m² zone size cap and the 60 m search distance rule. Designers must satisfy both. The 60 m rule exists to bound the time a fire warden / responder spends locating the device on a non-addressable system; addressable systems report exact device location and so the 60 m rule is relaxed.',
  },
  {
    id: 'fam3-s1-storey',
    question:
      'A two-storey building has a gallery on the upper floor whose area is 60% of the space into which it projects. How is the gallery treated for zoning?',
    options: [
      'Always a separate zone.',
      'Always part of the storey beneath.',
      'Per the BS 5839-1:2025 storey definition aligned with BS 4422:2024, a gallery whose area is MORE THAN HALF the space into which it projects is itself part of a storey (treated as a normal floor for zoning). At 60%, the gallery is part of the storey it projects into and counts as floor area within that zone — not a separate zone in its own right.',
      'A separate zone only if used for sleeping.',
    ],
    correctIndex: 2,
    explanation:
      "BS 5839-1:2025 has aligned terms with BS 4422:2024 fire vocabulary. A gallery >50% of the space into which it projects is part of the storey, so its area counts toward the storey's zoning area. <50% it is a feature of the storey beneath. The threshold matters for both zoning and detector siting.",
  },
  {
    id: 'fam3-s1-shortcircuit',
    question: 'What is the role of short-circuit isolators in zone design?',
    options: [
      'To improve audibility.',
      'To save cable.',
      "Short-circuit isolators (SCIs) bracket sections of a loop so that a short-circuit fault on the loop is contained between two adjacent isolators. BS 5839-1:2025 requires the section bounded by SCIs not to exceed one zone's worth of detection (≤2,000 m²) so a single fault cannot remove protection from MORE than one zone's devices. They are placed at zone boundaries.",
      'To detect fire faster.',
    ],
    correctIndex: 2,
    explanation:
      'SCIs implement the architectural rule that a single fault must not lose protection from more than one zone. They are the loop equivalent of a zone boundary on a conventional radial circuit and are mandatory at the zone interface. Without SCIs, a single short on the loop drops every device on that loop.',
  },
  {
    id: 'fam3-s1-zoneplan',
    question:
      'BS 5839-1:2025 lists the absence of a zone plan in multi-zone sleeping premises as which of the following?',
    options: [
      'An acceptable variation if recorded.',
      'A minor variation.',
      'An UNACCEPTABLE variation — newly listed in BS 5839-1:2025 as a departure so detrimental to life safety that it cannot be agreed as a variation. The zone plan must be present at the CIE in any premises with more than one zone on any storey, particularly sleeping premises. Its absence is a non-conformity, not a variation.',
      'A matter for the responsible person to decide.',
    ],
    correctIndex: 2,
    explanation:
      "Variations against the standard are allowed in principle, but BS 5839-1:2025 now lists specific departures that cannot be variations. Absence of the zone plan in multi-zone sleeping premises is one of them — the fire and rescue service and building occupants need that plan to locate the fire. A system commissioned without it is non-compliant, not 'compliant by variation'.",
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What two limits govern the size of a fire detection zone in BS 5839-1:2025?',
    options: [
      'Floor area only.',
      'Floor area ≤ 2,000 m² AND search distance within the zone ≤ 60 m for a non-addressable installation. Both limits apply simultaneously; the smaller controls. The 60 m rule is relaxed where each device reports its address and exact location at the CIE (addressable systems).',
      'Number of devices only.',
      'Distance from CIE only.',
    ],
    correctAnswer: 1,
    explanation:
      'The 2,000 m² area cap is the headline number. The 60 m search distance is the often-overlooked second limit that constrains how a large but linear zone can be (a 2,000 m² zone shaped like a long corridor can fail the 60 m rule even though it passes the area rule). Addressable identification at device level relaxes the 60 m rule.',
  },
  {
    id: 2,
    question: 'How are stairways treated for zoning under BS 5839-1:2025?',
    options: [
      'Part of the adjacent storey.',
      'Each stairway is a SEPARATE zone in its own right (clause 13.2.1.f). The reasoning is that fire and smoke in a stairway must be identified independently of the storeys, because the stairway is the escape route. Mixing it with a storey zone obscures the location and undermines the evacuation strategy.',
      'No zoning needed.',
      'One zone for all stairways.',
    ],
    correctAnswer: 1,
    explanation:
      'Stairways are protected escape routes; they are zoned separately so any indication at the CIE points specifically to the stairway. This is the principle "one zone per fire compartment, separate zone per escape route".',
  },
  {
    id: 3,
    question: 'Why must one zone correspond to one fire compartment, where practicable?',
    options: [
      'Convention.',
      'Because the compartment line is a fire-resisting barrier engineered to contain fire for a defined period. If a single zone straddled two compartments, an alarm would not tell occupants or fire-fighters which side of the barrier is on fire — defeating the purpose of compartmentation. Aligning zones with compartments lets the alarm direct response to the compartment of origin.',
      'Cost.',
      'Cable length.',
    ],
    correctAnswer: 1,
    explanation:
      'Compartmentation is a passive fire protection measure; zoning is the detection-side counterpart. They are designed together. A zone that crosses a compartment line cannot signal where the fire is in fire-engineering terms.',
  },
  {
    id: 4,
    question: 'What is the BS 5839-1:2025 rule on multi-storey buildings and zoning?',
    options: [
      'One zone for the whole building.',
      'Each storey is a separate zone (with the BS 4422:2024 storey definition treating a gallery >50% as part of the storey it projects into). A two-storey building has at least two zones, plus separate zones for each stairway. Single-storey buildings can have one zone subject to the 2,000 m² / 60 m rules.',
      'Two storeys per zone.',
      'No requirement.',
    ],
    correctAnswer: 1,
    explanation:
      'Vertical separation is fundamental: a fire on a different floor changes the evacuation strategy entirely. Each storey is its own zone. Stairways are zoned separately again. This produces a clear at-a-glance map of where the fire is.',
  },
  {
    id: 5,
    question: 'How does BS 5839-1:2025 define a "fire detection zone"?',
    options: [
      'A floor area.',
      'A subdivision of the protected premises such that the occurrence of a fire within it is indicated by the fire detection and fire alarm system separately from an indication of fire in any other subdivision (terms and definitions clause). The zone is functional, not just spatial — it is the unit of resolution at the CIE.',
      'A bay of detectors.',
      'A loop section.',
    ],
    correctAnswer: 1,
    explanation:
      'The 2025 definition aligns with BS 4422:2024. The zone is defined by what the CIE shows, not by the topology of the cabling. A device reporting in zone 3 means the CIE indicates "zone 3" as the source of fire — that is the unit of resolution from the user-facing perspective.',
  },
  {
    id: 6,
    question:
      'A 2,200 m² open-plan office on a single storey is presented as one fire detection zone. What is the correct response?',
    options: [
      'Accept it.',
      'Reject it on zone area grounds. Maximum zone area is 2,000 m². The space must be split into at least two zones — typically by a logical division (zone A: south half; zone B: north half) marked on the zone plan and reflected in detector / call-point addressing. The 60 m search distance must also be satisfied within each new zone.',
      'Reject it on call-point grounds.',
      'Accept it as a variation.',
    ],
    correctAnswer: 1,
    explanation:
      'The 2,000 m² limit is firm. It cannot be exceeded by variation because the variations clause in BS 5839-1:2025 does not permit zoning departures that defeat life safety location indication. The space splits into two or more zones; the boundary is logical (and shown on the zone plan).',
  },
  {
    id: 7,
    question:
      'A non-addressable system has a zone of 1,500 m² covering a long single-storey logistics warehouse 90 m × 17 m. Is the zone compliant?',
    options: [
      'Yes — under area limit.',
      'No — fails the 60 m search distance. The zone area (1,530 m²) is under 2,000 m², but the longest internal walking distance to find the operated device exceeds 60 m. The zone must be split (e.g. into two halves, each ≤ 60 m search distance) OR the system upgraded to addressable so the device address resolves the location and the 60 m rule is relaxed.',
      'Yes — addressable systems are exempt.',
      'Cannot tell.',
    ],
    correctAnswer: 1,
    explanation:
      'The 60 m rule catches the long-narrow case that the 2,000 m² rule alone misses. The 90 m extent of the warehouse means a fire at the far end is more than 60 m from the zone entry point on a non-addressable system. Solution: split the zone, or go addressable.',
  },
  {
    id: 8,
    question:
      'BS 5839-1:2025 lists which TWO departures as unacceptable variations (cannot be agreed as variations)?',
    options: [
      'Battery type and cable colour.',
      "Absence of a zone plan in premises with more than one zone on any storey (particularly sleeping premises), AND absence of a facility for transmission of fire alarm signals to an ARC where one is necessary (supported housing requiring Grade A BS 5839-6:2019, or residential care homes). Both are now non-conformities, not 'variations'.",
      'Detector colour and call-point colour.',
      'Cable type and conduit type.',
    ],
    correctAnswer: 1,
    explanation:
      "These two specific departures are listed in clause 6 of BS 5839-1:2025 as falling outside the scope of acceptable variation. Previously they could be agreed; in 2025 they cannot. The reasoning is consequence — both directly defeat the alarm system's life-safety function in identifiable populations.",
  },
  {
    id: 9,
    question: 'Where must zone plans be displayed?',
    options: [
      'In the office.',
      'At the Control and Indicating Equipment (CIE) per clause 22.2.5 of BS 5839-1:2025. The plan is the at-a-glance reference for fire-fighters and the responsible person to translate a zone indication into a physical location. Absence at the CIE (or hidden in a plant cupboard, or fire-damaged) defeats the purpose.',
      'At each call point.',
      'At the entrance only.',
    ],
    correctAnswer: 1,
    explanation:
      'The zone plan is part of the CIE installation. Clause 22.2.5 specifies its location; the variations clause makes its absence in multi-zone sleeping premises an unacceptable variation. The plan is the user interface to the zoning architecture.',
  },
  {
    id: 10,
    question: 'How does an addressable system change the zone-design conversation?',
    options: [
      'It eliminates zones.',
      'Zones still exist as the CIE-level unit of indication, but with each device individually addressed and reported at the CIE, the 60 m search distance rule is relaxed (the device location is unambiguous). Zone area and compartment alignment still apply. Addressable systems achieve finer-grain location resolution within the same zoning framework — they do not remove the framework.',
      'It removes the 2,000 m² limit.',
      'It removes the storey rule.',
    ],
    correctAnswer: 1,
    explanation:
      'Zoning is a CIE-presentation requirement; it survives in addressable systems. What changes is that within a zone the device address provides the precise location, so the 60 m walk-to-find rule is no longer the limiting factor on zone size for non-area reasons. The 2,000 m² area cap, the storey rule, and the compartment rule still apply.',
  },
];

const FireAlarmModule3Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Zone design principles | Fire Alarm Module 3.1 | Elec-Mate',
    description:
      'BS 5839-1:2025 zone design: 2,000 m² area cap, 60 m search distance, one zone per compartment, separate zone per storey and stairway, short-circuit isolation, the new unacceptable-variation list, and zone-plan placement at the CIE.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('..')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 3
          </button>

          <PageHero
            eyebrow="Module 3 · Section 1"
            title="Zone design principles"
            description="BS 5839-1:2025 clause 13: the 2,000 m² area limit, the 60 m search-distance limit, one zone per fire compartment, separate zone per storey and per stairway, short-circuit isolation at zone boundaries, the new unacceptable-variation list, and the zone plan at the CIE."
            tone="yellow"
          />

          <TLDR
            points={[
              'Zone = the unit of indication at the CIE. One zone, one indicator. The zone tells occupants and fire-fighters which subdivision of the building is on fire.',
              'Maximum zone area = 2,000 m² floor area. Firm. Cannot be exceeded by variation under BS 5839-1:2025.',
              'Maximum search distance within a zone = 60 m for non-addressable systems (the walk to find the operated device). Addressable systems relax this because the device address is the location.',
              'One zone per fire compartment, where practicable. The zone aligns with the passive fire-protection architecture.',
              'Multi-storey: each storey is a separate zone. Gallery >50% of the space it projects into = part of the storey (BS 4422:2024 / BS 5839-1:2025 alignment).',
              'Each stairway is a separate zone. The escape route is identified independently from the storeys.',
              'Short-circuit isolators (SCIs) at zone boundaries ensure a single short cannot lose protection from more than one zone (≤2,000 m² of devices).',
              'Zone plans MUST be displayed at the CIE (clause 22.2.5). Their absence in multi-zone sleeping premises is a NEW unacceptable variation — not a variation that can be agreed.',
              'Other new unacceptable variation: absence of ARC transmission in supported housing (Grade A BS 5839-6:2019) or residential care homes.',
              'ALL agreed variations now recorded in the system logbook — the 2017 "major only" rule is gone.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply the BS 5839-1:2025 dual zone-size limits — 2,000 m² floor area and 60 m search distance — and recognise when each limit governs',
              'Align zone boundaries with fire compartments, storeys (using the BS 4422:2024 gallery >50% rule), and stairways',
              'Place short-circuit isolators at zone boundaries so a single fault on the loop cannot remove protection from more than one zone',
              'Distinguish addressable from non-addressable zone-design constraints and explain why the 60 m rule relaxes for addressable systems',
              'Produce a compliant zone plan and place it at the CIE per clause 22.2.5',
              'Identify the BS 5839-1:2025 unacceptable variations (zone plan absence in multi-zone sleeping premises; ARC-transmission absence in supported housing / care homes) and record all agreed variations in the system logbook',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What a zone is, and why it exists</ContentEyebrow>

          <ConceptBlock
            title="A zone is what the CIE shows"
            plainEnglish="A fire detection zone is a subdivision of the protected premises. Its defining feature is not its cabling, not its loop section, not its detector group — it is the indication at the Control and Indicating Equipment. When a device operates, the CIE shows 'Zone 3 fire' (or equivalent) and lights an LED on the zone plan. The zone is the unit of resolution. Everything else about zone design — area, distance, compartmentation, storey — exists to make that indication useful for life safety."
            onSite="When you sketch a zone plan, you are designing the user interface to the alarm system. Treat it as such. The zone is what the fire-fighter reads at 02:00 in a smoke-filled lobby; design accordingly."
          >
            <p>The 2025 definition aligned with BS 4422:2024:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Subdivision of the protected premises</strong> — the zone is a portion of
                the building, identified physically.
              </li>
              <li>
                <strong>Indicated separately at the CIE</strong> — fire in this zone produces an
                indication distinct from any other subdivision. No mixing.
              </li>
              <li>
                <strong>To assist in location of the fire, evacuation, and fire-fighting</strong> —
                the purpose is operational. The zone exists to direct response.
              </li>
            </ul>
            <p>
              Three things flow from that definition. First, zone size is bounded so the indication
              is precise enough to direct response (the 2,000 m² and 60 m rules). Second, zone
              boundaries align with the building&apos;s fire-engineering architecture (compartments,
              storeys, stairways). Third, the zone plan at the CIE is part of the zoning
              installation — the CIE without the plan delivers half the function.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 13.2 (Subdivision of the premises into zones)"
            clause={
              <>
                A fire detection zone is a subdivision of the protected premises such that the
                occurrence of a fire within it is indicated by the fire detection and fire alarm
                system separately from an indication of fire in any other subdivision. The total
                floor area of any one zone should not exceed 2,000 m², and the distance any person
                may have to travel within a zone to determine the location of a fire (i.e. to
                identify a fire detector or manual call point operated as a result of a fire) should
                not exceed 60 m, unless the system provides an indication at the CIE of the
                particular detector or manual call point operated.
              </>
            }
            meaning="Three numbers, three rules. 2,000 m² area cap, 60 m search distance cap, and the addressable relaxation of the 60 m rule. The relaxation is conditional on the CIE indicating the specific device — addressable identification, not just zone identification. Both the area and search-distance limits apply simultaneously to non-addressable systems; the more restrictive one governs."
          />

          <ConceptBlock
            title="The dual limit — area AND search distance"
            plainEnglish="It is tempting to read 'maximum 2,000 m²' as the only zone size rule. It is not. The 60 m search-distance rule catches the long-narrow case the area rule misses. A 1,500 m² zone shaped 90 m × 17 m passes the area test but fails the distance test on a non-addressable system because a fire at the far end is more than 60 m from the fire-warden's first point of inspection. Two rules, both applied, smaller of the two governs."
            onSite="Walk the zone in your head before signing it off. From the most likely entry point to the farthest device — is that walk under 60 m? If not, either split the zone or specify addressable identification at device level."
          >
            <p>Why the dual limit:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Area limit (2,000 m²)</strong> — bounds the spatial extent of indication
                ambiguity. A fire indicated as &quot;zone 3&quot; could be anywhere within 2,000 m²;
                that area is small enough that locating the device is feasible.
              </li>
              <li>
                <strong>Search distance limit (60 m)</strong> — bounds the time to locate. 60 m at a
                brisk walk is roughly 45 seconds; that is the upper bound of acceptable delay
                between an indication at the CIE and a person reaching the operated device.
              </li>
              <li>
                <strong>Addressable relaxation</strong> — when the CIE shows &quot;Smoke detector
                3.07 in office 2.14, kitchen&quot;, there is no walk-to-find. The 60 m rule does not
                bite. The 2,000 m² area rule still applies because indication clarity at the
                &quot;subdivision&quot; level remains a design objective.
              </li>
            </ul>
            <p>
              The practical effect: addressable systems get bigger zones in linear / corridor
              applications. Non-addressable systems get smaller zones in the same applications. Both
              are compliant within their respective rule sets.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Diagram — example zone layout */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Example multi-storey zone layout — area, search distance, storey, stairway
            </h4>
            <svg
              viewBox="0 0 880 520"
              className="w-full h-auto"
              role="img"
              aria-label="A multi-storey building shown with zone boundaries: ground floor split into two zones (Z1, Z2) each under 2,000 m² and 60 m search distance, first floor as one zone (Z3) with a gallery, and a stairway as its own zone (Z4). Zone plan is shown at the CIE."
            >
              <text
                x="440"
                y="24"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="14"
                fontWeight="bold"
              >
                Two-storey premises — four zones
              </text>

              <rect
                x="40"
                y="60"
                width="500"
                height="180"
                rx="10"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.6"
              />
              <text
                x="290"
                y="80"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="11"
                fontWeight="bold"
              >
                GROUND FLOOR
              </text>

              <rect
                x="60"
                y="100"
                width="220"
                height="120"
                rx="6"
                fill="rgba(34,211,238,0.08)"
                stroke="#22D3EE"
                strokeWidth="1.6"
              />
              <text
                x="170"
                y="120"
                textAnchor="middle"
                fill="#22D3EE"
                fontSize="11"
                fontWeight="bold"
              >
                Z1
              </text>
              <text
                x="170"
                y="138"
                textAnchor="middle"
                fill="rgba(255,255,255,0.75)"
                fontSize="9.5"
              >
                Office area
              </text>
              <text x="170" y="152" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                1,800 m²
              </text>
              <text x="170" y="166" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                search ≤ 50 m
              </text>
              <text x="170" y="180" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                compartment A
              </text>

              <rect
                x="300"
                y="100"
                width="220"
                height="120"
                rx="6"
                fill="rgba(168,85,247,0.08)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="410"
                y="120"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                Z2
              </text>
              <text
                x="410"
                y="138"
                textAnchor="middle"
                fill="rgba(255,255,255,0.75)"
                fontSize="9.5"
              >
                Workshop / store
              </text>
              <text x="410" y="152" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                1,400 m²
              </text>
              <text x="410" y="166" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                search ≤ 45 m
              </text>
              <text x="410" y="180" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                compartment B
              </text>

              <line
                x1="290"
                y1="100"
                x2="290"
                y2="220"
                stroke="#EF4444"
                strokeWidth="2"
                strokeDasharray="4,3"
              />
              <text
                x="290"
                y="234"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9"
                fontWeight="bold"
              >
                compartment line
              </text>

              <rect
                x="40"
                y="260"
                width="500"
                height="180"
                rx="10"
                fill="rgba(255,255,255,0.03)"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.6"
              />
              <text
                x="290"
                y="280"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="11"
                fontWeight="bold"
              >
                FIRST FLOOR
              </text>

              <rect
                x="60"
                y="300"
                width="460"
                height="120"
                rx="6"
                fill="rgba(251,191,36,0.08)"
                stroke="#FBBF24"
                strokeWidth="1.6"
              />
              <text
                x="290"
                y="320"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Z3
              </text>
              <text
                x="290"
                y="338"
                textAnchor="middle"
                fill="rgba(255,255,255,0.75)"
                fontSize="9.5"
              >
                Open-plan office + gallery (gallery 60% of projected space — part of storey)
              </text>
              <text x="290" y="354" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                1,950 m² total (incl. gallery area)
              </text>
              <text x="290" y="368" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                search ≤ 58 m
              </text>

              <rect
                x="380"
                y="380"
                width="120"
                height="30"
                rx="4"
                fill="rgba(251,191,36,0.15)"
                stroke="#FBBF24"
                strokeWidth="1.2"
                strokeDasharray="3,2"
              />
              <text x="440" y="398" textAnchor="middle" fill="#FBBF24" fontSize="9">
                gallery (≥50% of space)
              </text>

              <rect
                x="560"
                y="100"
                width="100"
                height="340"
                rx="8"
                fill="rgba(34,197,94,0.08)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <text
                x="610"
                y="124"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                Z4
              </text>
              <text
                x="610"
                y="142"
                textAnchor="middle"
                fill="rgba(255,255,255,0.75)"
                fontSize="9.5"
              >
                Stairway
              </text>
              <text x="610" y="156" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                separate zone
              </text>
              <text x="610" y="170" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                escape route
              </text>
              <line
                x1="585"
                y1="190"
                x2="635"
                y2="190"
                stroke="rgba(34,197,94,0.5)"
                strokeWidth="1.2"
                strokeDasharray="3,2"
              />
              <text x="610" y="270" textAnchor="middle" fill="rgba(34,197,94,0.7)" fontSize="22">
                ↕
              </text>
              <text x="610" y="430" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                serves both floors
              </text>

              <rect
                x="700"
                y="100"
                width="160"
                height="280"
                rx="10"
                fill="rgba(255,255,255,0.06)"
                stroke="rgba(255,255,255,0.5)"
                strokeWidth="1.6"
              />
              <text
                x="780"
                y="124"
                textAnchor="middle"
                fill="rgba(255,255,255,0.9)"
                fontSize="11"
                fontWeight="bold"
              >
                CIE
              </text>
              <text x="780" y="140" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                clause 22.2.5
              </text>

              <rect
                x="716"
                y="160"
                width="128"
                height="200"
                rx="6"
                fill="rgba(0,0,0,0.4)"
                stroke="rgba(255,255,255,0.3)"
                strokeWidth="1"
              />
              <text
                x="780"
                y="178"
                textAnchor="middle"
                fill="rgba(255,255,255,0.7)"
                fontSize="9"
                fontWeight="bold"
              >
                ZONE PLAN
              </text>
              <circle cx="740" cy="200" r="6" fill="#22D3EE" />
              <text x="754" y="204" fill="rgba(255,255,255,0.75)" fontSize="9">
                Z1 ground W
              </text>
              <circle cx="740" cy="222" r="6" fill="#A855F7" />
              <text x="754" y="226" fill="rgba(255,255,255,0.75)" fontSize="9">
                Z2 ground E
              </text>
              <circle cx="740" cy="244" r="6" fill="#FBBF24" />
              <text x="754" y="248" fill="rgba(255,255,255,0.75)" fontSize="9">
                Z3 first floor
              </text>
              <circle cx="740" cy="266" r="6" fill="#22C55E" />
              <text x="754" y="270" fill="rgba(255,255,255,0.75)" fontSize="9">
                Z4 stairway
              </text>
              <text x="780" y="302" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Mounted at the CIE
              </text>
              <text x="780" y="318" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Absence in multi-zone
              </text>
              <text x="780" y="332" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                sleeping premises
              </text>
              <text
                x="780"
                y="350"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="9"
                fontWeight="bold"
              >
                = unacceptable variation
              </text>

              <rect
                x="40"
                y="464"
                width="820"
                height="44"
                rx="8"
                fill="rgba(251,191,36,0.05)"
                stroke="rgba(251,191,36,0.3)"
                strokeWidth="1.2"
              />
              <text
                x="450"
                y="482"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="10"
                fontWeight="bold"
              >
                Per zone: ≤ 2,000 m² floor area · ≤ 60 m search distance (non-addressable) · one
                compartment · one storey · one stairway
              </text>
              <text x="450" y="498" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                Short-circuit isolators at zone boundaries on a loop bound a single fault to ≤ 2,000
                m²
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Compartments, storeys, stairways</ContentEyebrow>

          <ConceptBlock
            title="One zone per fire compartment"
            plainEnglish="A fire compartment is a part of a building bounded by fire-resisting construction designed to contain fire for a defined period. The compartment line is the building's passive defence. The zone — the alarm system's location-resolution unit — should follow the compartment line wherever practicable. If a single zone straddles two compartments, an alarm cannot tell occupants or fire-fighters which side of the wall is on fire. The compartmentation is undermined by the detection."
            onSite="Get the compartmentation drawing before you sketch the zoning. Mark the compartment lines first; lay zones inside them. A zone that crosses a compartment line is wrong unless the building has only one compartment."
          >
            <p>The interaction:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Passive fire protection</strong> (compartmentation) buys time. The fire is
                contained on one side of the wall while the other side evacuates.
              </li>
              <li>
                <strong>Active fire detection</strong> (the alarm) tells occupants AND fire-fighters
                which side. They evacuate the affected compartment first; they fight the fire from
                the unaffected side.
              </li>
              <li>
                <strong>Zone-compartment alignment</strong> means the indication is meaningful in
                the building&apos;s own fire-engineering language. &quot;Zone 3 fire&quot; maps to
                &quot;compartment B fire&quot; and from there to the building&apos;s fire safety
                strategy.
              </li>
            </ul>
            <p>
              Where the building has a single compartment (small open-plan), the rule reduces to the
              area / distance / storey / stairway rules. Where the building has many compartments,
              the zoning follows them.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Multi-storey — one zone per storey"
            plainEnglish="Vertical separation matters. A fire on a different floor changes the evacuation strategy entirely (occupants below the fire evacuate normally; occupants above the fire need a managed strategy). The CIE indication must distinguish floors. BS 5839-1:2025 requires each storey to be a separate zone. The 2025 storey definition (aligned with BS 4422:2024) treats a gallery whose area is more than half the space it projects into as part of the storey. Below 50% the gallery is a feature of the storey beneath, not a separate floor."
          >
            <p>Practical implications:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Two-storey premises</strong> — at least two zones (plus stairway, see
                below). Even if the total floor area is well under 2,000 m², each storey gets its
                own zone.
              </li>
              <li>
                <strong>Mezzanine / gallery &gt;50%</strong> — counted as part of the storey it
                projects into. Its floor area counts toward the 2,000 m² zone area limit on that
                storey.
              </li>
              <li>
                <strong>Mezzanine / gallery ≤50%</strong> — a feature of the storey beneath. May or
                may not need separate detection depending on use, but does not constitute a separate
                storey for zoning.
              </li>
              <li>
                <strong>Roof</strong> — counts as a storey for zoning purposes UNLESS accessible
                only for maintenance or repair (then excluded by the 2025 definition).
              </li>
            </ul>
            <p>
              The 50% gallery rule is a 2025 alignment and is now precise — earlier editions left
              the threshold to engineering judgement.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 13.2.1 (Zones in multi-storey premises)"
            clause={
              <>
                In a multi-storey building, each storey should comprise at least one zone. A storey
                is part of a building comprising all the accessible areas that are on the same
                level, including any gallery having an area of more than half that of the space into
                which it projects, and a roof, unless it is accessible only for maintenance or
                repair.
              </>
            }
            meaning="Two specific 2025 alignments. First, the storey definition is now lifted from BS 4422:2024 verbatim — no more building-by-building debate over whether a mezzanine is a storey. Second, the gallery >50% rule is explicit. A gallery at exactly 50% is a borderline case the designer documents in the design rationale; >50% is a separate storey, <50% is not."
          />

          <ConceptBlock
            title="Stairways — separate zone per stairway"
            plainEnglish="A stairway is the protected escape route. It is bounded by fire-resisting construction and must remain free of smoke for evacuation. The CIE must show fire IN the stairway distinct from fire on the adjacent storeys, because the fire-fighting and evacuation responses differ. BS 5839-1:2025 requires each stairway to be a separate zone in its own right (clause 13.2.1.f)."
          >
            <p>Why:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Smoke in the stairway</strong> compromises the escape route for every floor
                that uses it. Identifying it specifically is critical.
              </li>
              <li>
                <strong>Fire on a storey</strong> is a different event — the stairway may still be
                usable for floors above and below.
              </li>
              <li>
                <strong>Fire-fighting</strong> uses the stairway as the bridgehead. They need to
                know if it is compromised.
              </li>
            </ul>
            <p>
              Multi-stair buildings have one zone per stair. A protected lobby on each landing may
              be in the storey zone or a separate sub-zone depending on the design and the
              evacuation strategy.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Short-circuit isolation and the zone boundary</ContentEyebrow>

          <ConceptBlock
            title="A single fault must not lose protection from more than one zone"
            plainEnglish="On a loop, a short-circuit anywhere on the cable can drop every device on the loop unless something contains the fault. Short-circuit isolators (SCIs) are devices placed on the loop that detect a short-circuit on the section between them and the next isolator and isolate that section. Devices on either side keep working. BS 5839-1:2025 requires SCIs to be placed so that the section bounded by adjacent SCIs does not contain devices serving more than one zone — i.e. a single fault loses protection from at most 2,000 m² of floor area."
            onSite="When you draw the loop, draw the SCIs at the zone boundaries first. Then place devices. The zone boundary on the topology drawing IS an SCI on the loop drawing."
          >
            <p>The mechanics:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Loop architecture</strong> — devices in a ring, fed from the CIE both ends
                so a single break does not lose them. Each device has an address; each can also be
                an SCI in its own right (built-in isolation).
              </li>
              <li>
                <strong>Short-circuit fault</strong> — typically a damaged cable or a wired-wrong
                device. Without isolation, the fault drops the loop voltage and every device on it.
                With isolation, only the section between two adjacent SCIs is lost.
              </li>
              <li>
                <strong>Zone-bounded isolation</strong> — the BS 5839-1 rule. Each section between
                adjacent SCIs serves at most one zone. The fault loses one zone&apos;s worth of
                detection — not two, not the whole building.
              </li>
            </ul>
            <p>
              On a conventional radial system, the zone is the circuit; one circuit, one zone, no
              SCI needed (the radial topology already isolates faults to a single zone). On an
              addressable loop, the SCIs do the same job in software / hardware.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 13.2.7 (Short-circuit isolation)"
            clause={
              <>
                On a loop, short-circuit isolators should be incorporated such that a short-circuit
                fault on any single section of cable will not result in the loss of protection from
                more than one zone, and in any case will not result in the loss of protection over
                an area greater than 2,000 m².
              </>
            }
            meaning="Two conditions, both apply. First, no single fault loses protection from more than one zone. Second, regardless of zone size, no single fault loses protection from more than 2,000 m². If a zone is split internally for any reason and SCIs are placed within it, the 2,000 m² rule still constrains the section size. SCIs are placed at zone boundaries — that is the design heuristic."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <Scenario
            title="Splitting a 2,500 m² open-plan office"
            situation="A new-build single-storey premises is presented for fire alarm design. The architect's plan shows one open-plan office of 2,500 m² with no internal partitions and no compartment walls. The client's brief asks for the simplest possible system. The designer is tempted to specify one zone covering the whole space."
            whatToDo="Reject the single-zone proposal. The 2,000 m² limit is firm; no variation is permitted that exceeds it for indication-clarity reasons. Split the space into at least two zones: e.g. zone A (north 1,250 m²) and zone B (south 1,250 m²). The split is a logical / drawing-line division — there is no physical wall. Mark it on the zone plan with a dashed boundary; address detectors and call-points to the appropriate zone. Where the system is addressable, individual detector identification at the CIE provides the precise location within each zone. Place an SCI at the logical boundary so a fault on the loop in zone A does not drop zone B. Document the boundary line and the rationale in the design package."
            whyItMatters="A single 2,500 m² zone gives the fire-fighter no useful information at the CIE. 'Zone 1 fire' could mean anywhere in the entire ground floor — a 30 m walk west, a 50 m walk east, or somewhere in between. Splitting into two zones halves the search area and brings the search distance well within the 60 m limit. The split is an inexpensive design decision that materially improves life safety. Treating the area limit as flexible because there are no physical walls is a common error and a non-conformity."
          />

          <SectionRule />

          <ContentEyebrow>The new unacceptable-variation list</ContentEyebrow>

          <ConceptBlock
            title="Some departures cannot be variations any more"
            plainEnglish="BS 5839-1 has always been a code of practice. Code-of-practice clauses use 'should' rather than 'shall', and departures (variations) from a 'should' clause have always been permitted in principle, provided they were agreed and documented. BS 5839-1:2025 introduces a new concept — specific departures that are SO detrimental to life safety that they cannot be agreed as variations. They are simply non-conformities. The 2025 list is short, and zone design contributes one of the entries."
            onSite="If you receive a design package with one of these departures recorded as a 'variation', the design is non-compliant — not 'compliant by variation'. Send it back."
          >
            <p>The two departures listed in BS 5839-1:2025 clause 6 as unacceptable:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Absence of a zone plan</strong> in premises with more than one zone on any
                storey, particularly premises in which people sleep. The zone plan at the CIE is the
                at-a-glance reference. Without it, a fire-fighter arriving at 02:00 reads &quot;Zone
                3 fire&quot; and cannot translate the indication into a physical location. Sleeping
                premises (hotels, residential care, supported housing) are particularly affected
                because occupants depend on rapid response to a managed evacuation.
              </li>
              <li>
                <strong>
                  Absence of a facility for transmission of fire alarm signals to an ARC
                </strong>{' '}
                in either: supported housing where Grade A BS 5839-6:2019 is necessary; or a
                residential care home. ARC transmission is the bridge between the alarm and the fire
                and rescue service for occupant populations who depend on professional response.
              </li>
            </ul>
            <p>
              Both entries fail life safety in a specific, foreseeable way. Both apply to
              populations that cannot self-evacuate to safety without external support. Both close
              loopholes the 2017 standard left open.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Clause 6 (Variations)"
            clause={
              <>
                Whilst BS 5839-1:2025 is a code of practice, and variations against the
                recommendations of the standard are allowed, it has now been recognised that the
                following departures from the recommendations are likely to be so detrimental to the
                safety of life that they should not be regarded as acceptable variations: the
                absence of a zone plan (or other suitable diagrammatic representation as recommended
                in 22.2.5) in premises in which there is more than one zone on any storey,
                particularly premises in which people sleep; and the absence of a facility for
                transmission of fire alarm signals to an ARC in either supported housing in which
                the facility is considered necessary to meet the recommendations of BS 5839-1 (where
                a Grade A system according to BS 5839-6:2019 is necessary), or a residential care
                home.
              </>
            }
            meaning="Two specific departures, two specific failure modes. The first protects all multi-zone occupants (and especially sleeping occupants); the second protects supported-housing and care-home residents. The 2025 standard makes them non-negotiable. The 2017 standard had no such list."
          />

          <ConceptBlock
            title="All variations now go in the logbook"
            plainEnglish="The 2017 standard required 'major' variations to be recorded in the logbook, but never defined 'major'. Designers and commissioning organisations applied the rule inconsistently. BS 5839-1:2025 closes the gap: ALL agreed variations are recorded in the system logbook (Annex H — renumbered from Annex F in 2017). No more 'minor variation, no need to record'. The logbook is now the comprehensive record of every departure from the standard's recommendations."
          >
            <p>Why this matters:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Subsequent designers, service organisations, and inspectors need to know what
                variations are in place to assess compliance over time.
              </li>
              <li>
                The fire risk assessor needs to see the full picture when reviewing the system
                against the building&apos;s risk profile.
              </li>
              <li>
                In post-incident investigation, the logbook is evidence. An undocumented variation
                that contributed to harm is now plainly traceable to the variation-agreement stage.
              </li>
            </ul>
            <p>
              Logbook entries should record what the variation is, why it was agreed (technical
              justification), who agreed it (the parties), and the date. The logbook (Annex H) is
              completed and maintained by the responsible person with input from the designer,
              installer, commissioning organisation, and service organisation as appropriate.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>The zone plan — a deliverable, not an afterthought</ContentEyebrow>

          <ConceptBlock
            title="What the zone plan must show"
            plainEnglish="The zone plan is a diagrammatic representation of the protected premises with each zone clearly labelled and bounded. It is mounted at the CIE so that anyone reading a zone indication can immediately translate it to a physical location. Clause 22.2.5 specifies the placement; the variations clause makes its absence in multi-zone sleeping premises non-conforming."
          >
            <p>Minimum content per BS 5839-1:2025 clause 22.2.5:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Plan view of each storey</strong> at sufficient resolution to identify rooms
                / areas — typically a building floor plan with rooms labelled.
              </li>
              <li>
                <strong>Zone boundaries clearly drawn</strong> with each zone numbered or named
                consistently with the CIE indication.
              </li>
              <li>
                <strong>Stairways shown as separate zones</strong>, vertically connected on the
                plan.
              </li>
              <li>
                <strong>Compartment lines shown</strong> to distinguish zones aligned with
                fire-resisting construction.
              </li>
              <li>
                <strong>The CIE position itself</strong> marked on the plan.
              </li>
              <li>
                <strong>Date and revision</strong> of the plan; dated to match the system as
                installed (updated on extensions and modifications).
              </li>
            </ul>
            <p>
              The plan is durable, legible, and protected against fire damage. It is mounted at or
              immediately adjacent to the CIE. It is not in a binder in a different room; it is not
              on a flip-chart that can be moved; it is not on a screen that can fail.
            </p>
          </ConceptBlock>

          <CommonMistake
            title="Treating the 2,000 m² limit as a soft target on open-plan spaces"
            whatHappens="A retrofit fire alarm design covers a 2,400 m² open-plan warehouse as one zone. The justification is 'no compartment walls, single space, single zone is logical.' The design is signed off, installed, and commissioned. Two years later, a small fire breaks out in racking at the far end. The CIE indicates 'Zone 1 fire'. The night-shift first-aider walks the warehouse to find the operated detector — a 75 m walk in smoke. By the time they identify the location and call the fire brigade, the fire has spread."
            doInstead="Apply the 2,000 m² limit firmly. The space splits into at least two zones; the boundary is a logical line on the zone plan. Each zone is no more than 2,000 m² and no more than 60 m search distance for non-addressable. If the architecture is open-plan and the design intent is single-zone presentation, specify addressable so the device address resolves the location. The 2025 unacceptable-variation list does not (yet) include zone area exceedance — but the broader BS 5839-1:2025 rule that variations cannot defeat life-safety location indication makes this kind of departure indefensible."
          />

          <CommonMistake
            title="Mixing storey zones with stairway zones"
            whatHappens="A two-storey care home is zoned as: zone 1 ground floor (incl. ground floor of stairway); zone 2 first floor (incl. first floor of stairway); zone 3 stairway head and roof. A fire in the stairway between floors triggers either zone 1 or zone 2 depending on where the smoke first reaches a detector — but the zone plan and CIE indication suggest a fire on a particular floor. Fire-fighters are sent to the wrong location."
            doInstead="The stairway is its own zone, end to end. It is not divided between storeys at the landing line. The whole stair (ground entry to roof level) is one zone reporting to one indication on the CIE. The storeys are separate zones for the storey areas only. This produces unambiguous indication: 'Zone 4 stairway fire' is unmistakeable, regardless of which detector in the stair operated first."
          />

          <CommonMistake
            title="Forgetting the gallery / mezzanine 50% rule"
            whatHappens="A retail store has a 280 m² mezzanine floor projecting into a 500 m² ground floor space (mezzanine area = 56% of the projected space). The designer treats the mezzanine as a feature of the ground floor zone, not a separate storey. The total ground floor zone area becomes 780 m² — under 2,000 m², passes the area test. But under BS 5839-1:2025 / BS 4422:2024, the mezzanine at 56% IS a separate storey and must be a separate zone. The design fails the storey-zoning rule."
            doInstead="Apply the 50% rule precisely. Galleries / mezzanines >50% of the projected space = separate storey, separate zone. ≤50% = part of the storey beneath. At borderline percentages (45–55%), document the measurement and the determination in the design rationale. The 50% threshold replaces engineering judgement with a measured decision."
          />

          <SectionRule />

          <ContentEyebrow>Working examples</ContentEyebrow>

          <ConceptBlock
            title="Worked example 1 — small office, simple zoning"
            plainEnglish="A two-storey small office: ground floor 350 m², first floor 350 m², stairway between. Total 700 m². Zoning: zone 1 = ground floor (350 m², search ≤ 25 m, well under both limits); zone 2 = first floor (350 m², search ≤ 25 m); zone 3 = stairway. Three zones total. The 2,000 m² area rule is comfortably satisfied; the 60 m search rule is satisfied; the storey rule produces the storey separation; the stairway rule produces the third zone. Zone plan at the CIE shows all three boundaries, with the CIE position marked."
          />

          <ConceptBlock
            title="Worked example 2 — large logistics warehouse"
            plainEnglish="A single-storey logistics warehouse 100 m × 30 m = 3,000 m². Zoning options. (1) Non-addressable: split into two zones, each 1,500 m² and ≤ 50 m search distance, with an SCI at the boundary. The split runs at the 50 m mark across the short dimension. Plus stairway zone for the office mezzanine stair. (2) Addressable: split into two zones for indication clarity (still ≤ 2,000 m² each), but with each device addressed individually the 60 m search rule is relaxed at zone level — the CIE shows 'detector 47, racking aisle 12' regardless of where in the zone the device sits. The 2,000 m² rule still constrains zone area."
          />

          <ConceptBlock
            title="Worked example 3 — sleeping premises with multi-storey gallery"
            plainEnglish="A boutique hotel: ground floor 800 m², first floor 800 m² with gallery overlooking the lobby (gallery area 60% of projected lobby — counts as storey 1 per the 50% rule), second floor 800 m². Two stairways. Zoning: Z1 ground; Z2 first floor (incl. gallery); Z3 second floor; Z4 stair A; Z5 stair B. Zone plan at the CIE is mandatory (multi-zone sleeping premises — its absence is now an unacceptable variation, not a permissible variation). Each zone is well under 2,000 m². Search distances confirmed under 60 m."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Zone = the unit of indication at the CIE. The zone tells the fire-fighter where the fire is in the building.',
              'Maximum zone area = 2,000 m² floor area. Firm. No variation permitted to exceed it.',
              'Maximum search distance within a zone = 60 m for non-addressable systems. Addressable systems relax this because the device address resolves location.',
              'One zone per fire compartment, where practicable. Align with passive fire protection.',
              'One zone per storey. BS 4422:2024 storey definition applies — gallery >50% of projected space = part of storey. ≤50% = feature of storey beneath.',
              'One zone per stairway. The escape route is identified independently end-to-end, not split at landings.',
              'Short-circuit isolators at zone boundaries on a loop ensure a single fault loses no more than one zone (≤ 2,000 m²) of devices.',
              'Zone plan at the CIE per clause 22.2.5. Absence in multi-zone sleeping premises = unacceptable variation (new in 2025).',
              'Other unacceptable variation: absence of ARC transmission in supported housing (Grade A BS 5839-6:2019) and residential care homes.',
              'ALL agreed variations now recorded in the logbook (Annex H, renumbered from Annex F in 2017). The 2017 "major only" rule is gone.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'If I install an addressable system, do the zone area and storey rules still apply?',
                answer:
                  'Yes. Addressable identification relaxes the 60 m search distance rule (the device address provides the location), but the 2,000 m² zone area cap, the storey rule, the stairway rule, and the compartment alignment all still apply. Zoning is a CIE-level indication framework that addressable systems sit within, not replace.',
              },
              {
                question:
                  'My building has no compartment walls — can I treat the whole floor as one zone?',
                answer:
                  'Only if the floor is ≤ 2,000 m² AND search distance is ≤ 60 m (non-addressable) or the system is addressable. A 2,400 m² open-plan floor must be split into at least two zones; the split is a logical line on the zone plan. Absence of physical walls does not justify exceeding the 2,000 m² area limit — the limit is about indication precision at the CIE, not physical compartmentation.',
              },
              {
                question: 'How do I count a gallery toward zone area?',
                answer:
                  'Per BS 5839-1:2025 (aligned with BS 4422:2024): gallery area > 50% of the projected space = part of the storey it projects into; the gallery is a separate storey for zoning, with its own zone, and its area counts toward that storey-zone area. Gallery area ≤ 50% = feature of the storey beneath; its area counts toward the storey-beneath zone area but it does not become a separate zone.',
              },
              {
                question: 'Can a stairway be zoned with the storey it serves?',
                answer:
                  'No. BS 5839-1:2025 clause 13.2.1.f requires each stairway to be a separate zone in its own right, end to end. The reasoning is escape-route identification: a fire in the stairway must be distinguishable from a fire on a storey because the response differs (compromised escape route vs compartment fire on a single storey).',
              },
              {
                question:
                  "What happens if the zone plan goes missing from the CIE during the system's life?",
                answer:
                  'In multi-zone sleeping premises, that is now a non-conformity (an unacceptable variation per BS 5839-1:2025). The responsible person and the service organisation are jointly responsible for keeping the plan in place and current. The 12-month service includes verifying that the displayed plan still matches the as-installed zoning. Replace lost / damaged plans on detection.',
              },
              {
                question: 'Where do short-circuit isolators go on a loop?',
                answer:
                  "At zone boundaries, with the rule that the section between adjacent SCIs serves at most one zone (and at most 2,000 m² regardless). Practically: the zone boundary on the topology drawing IS an SCI on the loop drawing. Many addressable detectors have built-in SCIs, which simplifies placement; check the manufacturer specification. SCIs at zone boundaries ensure a single short-circuit fault on the loop loses one zone's worth of detection at most, not the whole loop.",
              },
              {
                question:
                  'Is a 2,000 m² zone limit strict, or can I exceed it for a small percentage with a variation?',
                answer:
                  'Strict. BS 5839-1:2025 clause 13.2 expresses the limit as "should not exceed 2,000 m²". As a should-clause, variations are conceptually possible — but the variations clause (clause 6) does not list zone area exceedance as one of the unacceptable variations explicitly. However, the spirit of BS 5839-1:2025 — and the broader life-safety rationale — make any exceedance a serious departure. Best practice is to treat the 2,000 m² limit as firm and not pursue area-based variations.',
              },
              {
                question:
                  'I am extending an existing system into a new area of the same building — does the new area need its own zone?',
                answer:
                  'Yes if the new area + existing zone exceeds 2,000 m², 60 m search distance, crosses a compartment line, or is a different storey / stairway. In any of those cases, new zone(s) are added. The extension certificate (clause 47, formerly modification certificate) records the change; the zone plan is updated; the logbook entry records the modification. The 2025 standard now classes firmware updates of the CIE as modifications too — all extensions and modifications produce a certificate.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="Zone design principles — Module 3.1" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-3')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 3
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/fire-alarm-course/module-3/section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                3.2 Addressable vs conventional
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

export default FireAlarmModule3Section1;
