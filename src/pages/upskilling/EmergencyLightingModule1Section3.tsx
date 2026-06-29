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
    id: 'elm1-s3-maintained-vs-non',
    question:
      'A luminaire over a fire-exit door operates from the mains under normal conditions to display the running-man pictogram clearly, and continues to operate from its internal battery for 3 hours when the mains fails. What category of luminaire is it, and why is this category required for an exit sign?',
    options: [
      'Maintained luminaire — lit under both normal supply and emergency, so the exit sign is always visible to occupants.',
      'Non-maintained luminaire — the lamp stays dark under normal supply and illuminates only on mains failure.',
      'Sustained luminaire — a fitting with a separate normal lamp and a separate emergency lamp in one housing.',
      'Standby luminaire — a fitting provided to let normal activities continue rather than to mark an exit.',
    ],
    correctIndex: 0,
    explanation:
      'Maintained luminaires illuminate continuously — under both normal mains supply and emergency battery supply. They are typical for exit-sign duty in places of assembly and sleeping accommodation where the sign needs to be visible all the time. Non-maintained luminaires only illuminate on mains failure; appropriate for areas without continuous occupancy where the sign would be a distraction or wasteful when there is normal lighting (e.g. a back-of-house corridor whose normal lighting is itself only on when occupied).',
  },
  {
    id: 'elm1-s3-self-vs-central',
    question:
      'A 5-storey office block has 200 emergency lighting points distributed across all floors and stair towers. The fire risk assessment is straightforward and there are no critical-life-safety services needing prolonged duration. The owner asks whether to install a self-contained system or a central battery system. From a maintenance and total-cost-of-ownership perspective, what is the typical answer?',
    options: [
      'Always a central battery system, since centralising the batteries is always cheaper over the system life.',
      'Always a self-contained system, because central battery systems are not permitted in office premises.',
      'A self-contained system — fault-tolerant and low install cost for this size, with central battery reserved for large or specialist sites.',
      'The choice is fixed by building use — self-contained for offices and central battery for shops.',
    ],
    correctIndex: 2,
    explanation:
      'Self-contained dominates the UK market for routine commercial and small-to-medium installations because of low install cost, fault-tolerance (one battery failure = one luminaire out, not the whole system), and ease of extension. Central battery is selected for specialist applications: large institutional sites, premises with hundreds of luminaires concentrated in one area, life-critical services (BS EN 50171 IPS), and where centralised automated testing reduces lifecycle cost.',
  },
  {
    id: 'elm1-s3-switch-on-time',
    question:
      'BS EN 1838:2024 specifies different switch-on times for emergency lighting categories. Which category has the strictest switch-on time, and what is it?',
    options: [
      'Escape route lighting, which must reach full output within 5 s of the mains failing.',
      'Anti-panic lighting, which must reach full output within 5 s across the open area.',
      'All categories share a common 1 s switch-on requirement under the 2024 standard.',
      'High-risk task lighting — full output within 0.5 s, so the operator never loses sight of moving hazardous equipment.',
    ],
    correctIndex: 3,
    explanation:
      'Switch-on times by category: escape route — 50% within 5 s, full output within 60 s; anti-panic — 50% within 5 s, full output within 60 s; high-risk task — full output within 0.5 s. The high-risk task category is the only one demanding effectively instantaneous response, because the consequence of a delay is the operator losing sight of moving hazardous equipment.',
  },
  {
    id: 'elm1-s3-duration',
    question:
      'BS 5266-1:2025 specifies durations for emergency lighting. What is the standard minimum duration for the majority of premises, and when is a longer duration required?',
    options: [
      'A fixed 30-minute duration applies to all premises regardless of use or evacuation strategy.',
      '3 hours for most premises; 1 hour only for small simple immediate-evacuation premises; longer for hospitals, care homes and phased evacuation.',
      'A minimum of 12 hours full operation is required for every emergency lighting installation.',
      'There is no fixed minimum duration; it is left entirely to the designer’s discretion in every case.',
    ],
    correctIndex: 1,
    explanation:
      'The 3-hour duration is the practical UK norm. Annual full discharge testing is conducted at the rated duration. Pre-2008 standards permitted 1 hour for some premises types, but most modern designs adopt 3 hours regardless because it covers most evacuation and emergency-response scenarios. Hospitals and care homes with assisted evacuation may need longer durations.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What is the difference between MAINTAINED and NON-MAINTAINED emergency luminaires?',
    options: [
      'Maintained is always lit (normal mains and emergency); non-maintained is lit only on mains failure.',
      'Maintained luminaires are physically larger than non-maintained ones to house a bigger battery.',
      'Maintained luminaires use LED lamps while non-maintained luminaires use halogen lamps.',
      'The two are interchangeable; the terms describe the fitting colour, not how it operates.',
    ],
    correctAnswer: 0,
    explanation:
      'Maintained luminaires draw power continuously to illuminate. Non-maintained draw power only on mains failure (the battery is held in float-charge state until the mains fails). Sustained / combined luminaires have separate normal and emergency lamps in the same housing — a third architecture used where a maintained sign coexists with non-maintained area illumination.',
  },
  {
    id: 2,
    question: 'A SUSTAINED (or COMBINED) emergency luminaire is best described as:',
    options: [
      'A luminaire fitted with two internal batteries in parallel for an extended emergency duration.',
      'A luminaire whose single battery sustains the lamp for an extended period of around 12 hours.',
      'A luminaire with two separate light sources in one housing — a mains normal lamp and a battery emergency lamp.',
      'A luminaire with no battery of its own that is fed entirely from a central battery system.',
    ],
    correctAnswer: 2,
    explanation:
      "Sustained / combined luminaires are common in modern multi-functional fittings. The architecture allows the building lighting controls (DALI, dimming, scenes) to operate the normal lamp without affecting the emergency lamp's readiness. On mains failure the normal lamp goes off; the emergency lamp comes on automatically.",
  },
  {
    id: 3,
    question:
      'The principal difference between SELF-CONTAINED and CENTRAL BATTERY emergency lighting systems is:',
    options: [
      'Self-contained luminaires use LED lamps, whereas central battery systems use fluorescent lamps.',
      'Central battery systems are no longer permitted in new UK installations of any size.',
      'The two are functionally identical and the terms describe only how the system is marketed.',
      'Self-contained gives each luminaire its own battery and changeover; central battery feeds all luminaires from one battery in a plant room.',
    ],
    correctAnswer: 3,
    explanation:
      'Self-contained: distributed batteries (one per luminaire), modest individual capacity (typical 3 hr LED), simple parallel install with the normal final circuit, low cost per point, individual tested and replaced. Central battery: centralised battery (often VRLA or NiCd in a plant room), large total capacity, dedicated emergency-supply cabling (often fire-rated MICC or similar), centralised testing and easier battery replacement at one location, higher install cost, specialist maintenance.',
  },
  {
    id: 4,
    question:
      'BS EN 50171 covers central power supply systems for emergency lighting. What is its scope and significance?',
    options: [
      'It specifies central power supply systems feeding emergency safety services, including emergency lighting central battery systems.',
      'It covers consumer-grade uninterruptible power supplies (UPS) for office IT equipment only.',
      'It is the product standard for solar PV inverters feeding building electrical systems.',
      'It has been withdrawn and replaced entirely by BS EN 50172 for new installations.',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 50171 is the central-battery-equipment product standard. The lighting system designer specifies that any central battery used must comply with BS EN 50171; the manufacturer ensures the kit meets the standard. The two together — BS EN 50171 (central battery equipment) plus BS EN 50172 (system) plus BS EN 1838 (illuminance) — form the modern central-battery design package.',
  },
  {
    id: 5,
    question:
      'A datacentre operator wants emergency lighting that supports CONTINUED operation during the controlled fail-over to back-up power generation (a process taking up to 90 seconds before the generator stabilises). What category of emergency lighting is this, and is it within the scope of BS 5266-1:2025?',
    options: [
      'Escape route lighting, since the staff will ultimately leave the building along that route.',
      'Anti-panic lighting only, treating the data hall as a large open public space.',
      'It is not within the scope of BS 5266-1 at all and is governed solely by the operator’s own policy.',
      'Standby lighting — letting normal activity continue during supply failure; a category added to the scope of BS 5266-1:2025.',
    ],
    correctAnswer: 3,
    explanation:
      'Standby lighting is the 2025 BS 5266-1 scope expansion. Datacentres, broadcast studios, operating theatres, control rooms — all use cases where the activity must continue rather than evacuate. Levels are set against the task requirement (often the same as normal task levels, or a reduced-but-functional level). Duration matched to the operational fail-over time plus margin.',
  },
  {
    id: 6,
    question: 'Switch-on time for ESCAPE ROUTE lighting per BS EN 1838:2024 is:',
    options: [
      '50% of full output within 5 s and full output within 60 s, calibrated to human dark-adaptation.',
      'Effectively instantaneous — full output within 100 ms of the mains failing.',
      'Full output within 30 minutes, allowing time for the battery changeover to settle.',
      'No specific switch-on time is set for escape route lighting; only the duration is specified.',
    ],
    correctAnswer: 0,
    explanation:
      'BS EN 1838:2024 §4.3: 50% of required illuminance within 5 s, 100% within 60 s for escape route lighting. Anti-panic: same 5 s / 60 s. High-risk task: 100% within 0.5 s. The full-output-within-60-s rule allows LED drivers and battery-changeover circuitry to ramp up cleanly without the cost of capacitor-buffered instantaneous output for general escape duty.',
  },
  {
    id: 7,
    question: 'In a HYBRID emergency lighting system, the architecture is:',
    options: [
      'A mix of LED and fluorescent luminaires sharing the same emergency supply.',
      'A combination of solar generation and a battery store feeding the emergency luminaires.',
      'Some luminaires self-contained and others fed from a central battery — the most cost-effective architecture chosen per location.',
      'A system that mixes AC-supplied and DC-supplied luminaires on the same final circuit.',
    ],
    correctAnswer: 2,
    explanation:
      'Hybrid is increasingly common in larger buildings. The central battery covers the high-density / critical zones; self-contained covers everywhere else. The maintenance regime must accommodate both; the testing facilities must reach both; the documentation must clearly identify which luminaires belong to which architecture.',
  },
  {
    id: 8,
    question:
      'A LOCAL-AREA luminaire (recognised by BS EN 1838:2024) is most likely to be specified in which of the following situations?',
    options: [
      'A long internal corridor forming part of the building’s main escape route.',
      'A large open hangar where occupants must cross an open floor to reach an exit.',
      'An outdoor staff car park lit by overhead column luminaires at night.',
      'A care home bedroom where residents are permitted to remain in place during a mains-failure event.',
    ],
    correctAnswer: 3,
    explanation:
      'Local-area lighting is the BS EN 1838:2024 recognition for "non-evacuating occupant" scenarios. Care home bedrooms, hospital wards at night, hotel guest rooms in some configurations. The category sits alongside escape, anti-panic, high-risk, and standby; it is a fifth functional class designed for spaces where occupants stay rather than escape.',
  },
  {
    id: 9,
    question: 'BS EN 60598-2-22 is the product standard that applies specifically to:',
    options: [
      'Wiring accessories such as socket-outlets and switches used on emergency circuits.',
      'The fire-resistant cable and insulation used to wire central battery emergency systems.',
      'Luminaires for emergency lighting — the product standard for the emergency fitting itself, declared alongside BS EN 60598-1.',
      'Domestic smoke and heat alarms installed alongside the emergency lighting.',
    ],
    correctAnswer: 2,
    explanation:
      'BS EN 60598-2-22 covers the luminaire as a product; BS EN 50172 covers the system; BS EN 1838 covers the lighting application (illuminance levels and design); BS 5266-1 codifies the UK Code of Practice. The four together form the technical stack for any emergency lighting installation. Verify product compliance at procurement; design with the system standards in mind.',
  },
  {
    id: 10,
    question:
      'A small office (single floor, ground level, 4 employees, internal corridor 18 m, one fire exit at the end) has emergency lighting installed using self-contained LED maintained luminaires above the exit sign and self-contained LED non-maintained luminaires along the corridor. Why is this architecture appropriate?',
    options: [
      'Self-contained suits small distributed sites (fault isolates to one luminaire); maintained gives the exit sign continuous visibility; non-maintained keeps corridors dark until mains failure.',
      'It is simply the cheapest possible arrangement, which is the overriding reason to choose it.',
      'It is the only legally permitted architecture for a single-floor office of this size.',
      'It is mandated by BS 5266-1 for all premises with fewer than five employees.',
    ],
    correctAnswer: 0,
    explanation:
      'The example illustrates appropriate architecture-to-context matching. Self-contained suits small / medium / distributed; maintained for continuous-visibility duty (exit signs); non-maintained for failure-only duty (corridors with their own normal lighting). The same building does not need to be uniformly self-contained or uniformly maintained — the design selects per location.',
  },
];

const EmergencyLightingModule1Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Types of emergency lighting systems | Emergency Lighting M1.3 | Elec-Mate',
    description:
      'Escape route / anti-panic / high-risk / standby / local-area categories; maintained vs non-maintained vs sustained luminaires; self-contained vs central battery vs hybrid architectures. BS 5266-1:2025 + BS EN 1838:2024 framework.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-1')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 3"
            title="Types of emergency lighting systems"
            description="Categories by function (escape / anti-panic / high-risk / standby / local-area), luminaire types by operating mode (maintained / non-maintained / sustained), and system architectures (self-contained / central battery / hybrid)."
            tone="yellow"
          />

          <TLDR
            points={[
              'FIVE functional categories: escape route (1 lx full width at floor level with edge exclusions per BS EN 1838:2024), open area / anti-panic (0.5 lx, ≤ 40:1 ratio), high-risk task (15 lx OR 10 % task, ≤ 0.5 s switch-on, 10:1 ratio), standby (continued operation — NEW in 2025 scope), local-area (non-evacuating occupants — recognised in 2024 EN).',
              'THREE luminaire operating modes: maintained (always lit, under both normal and emergency supply — typical for exit signs), non-maintained (lit only on mains failure — typical for general escape illumination), sustained / combined (separate normal and emergency lamps in the same housing).',
              'THREE system architectures: self-contained (each luminaire has its own battery — fault-tolerant, low install cost, dominates UK market), central battery (one large battery feeds all luminaires via dedicated supply — for large / specialist installations under BS EN 50171), hybrid (mix and match per zone).',
              'Switch-on times: escape and anti-panic 50% within 5 s, full within 60 s; high-risk ≤ 0.5 s instantaneous; standby per operational requirement.',
              'Standard duration is 3 hours minimum for most UK premises. Some sectors (healthcare, care homes with assisted evacuation, premises with phased evacuation) may need longer.',
              'Product standards: BS EN 60598-2-22 for the luminaire product; BS EN 50171 for central battery equipment; BS EN 50172:2024 for system requirements and testing; BS EN 1838:2024 for illuminance and switch-on; BS 5266-1:2025 for UK Code of Practice.',
              'The architecture choice is risk-and-context driven. Self-contained suits routine commercial small/medium installs; central battery suits large institutional, datacentre, hospital, theatre. Hybrid is increasingly common in mixed-scale buildings.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish the five emergency lighting categories by function (escape, anti-panic, high-risk, standby, local-area) and apply the BS EN 1838:2024 illuminance level for each',
              'Distinguish maintained, non-maintained, and sustained luminaires by operating mode and select the correct mode for an exit sign vs a general corridor luminaire',
              'Distinguish self-contained, central battery, and hybrid system architectures and recommend the appropriate architecture for a given premises',
              'Apply the BS EN 1838:2024 switch-on times to each category — 5 s / 60 s for escape and anti-panic, ≤ 0.5 s for high-risk task',
              'Apply the standard 3-hour duration and recognise circumstances justifying longer durations',
              'Cross-reference the four-part standards stack: BS EN 60598-2-22 (luminaire), BS EN 50171 (central battery equipment), BS EN 50172:2024 (system), BS EN 1838:2024 (illuminance), BS 5266-1:2025 (UK Code of Practice)',
              'Apply the new high-risk segmentation rule (≥ 2 separate circuits, ≤ 20 luminaires per fault) introduced in BS 5266-1:2025',
              'Recognise sustained / combined luminaires as the architecture allowing dimming / DALI / scene control of normal lamp without disabling emergency readiness',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>The five functional categories</ContentEyebrow>

          <ConceptBlock
            title="Each category answers a different question"
            plainEnglish="Each emergency lighting category exists because real evacuation events have different sub-problems. Escape lighting answers 'how do I get out?'. Anti-panic answers 'where am I in this room?'. High-risk task answers 'how do I make this hazardous equipment safe before I leave?'. Standby answers 'how do I keep doing what I was doing during the outage?'. Local-area answers 'I am staying — how do I see well enough to be safe in place?'. The standards give each category its own performance requirement; the design provides the right category for each location."
            onSite="Walk a building with the five questions in mind. Most spaces need just one category (the corridor needs escape lighting; the assembly hall needs anti-panic + escape on egress). Some need two or three (the printing-press floor needs high-risk task at the press, escape on the route out, anti-panic in any open area passed through). Specialist spaces need standby (datacentres, theatres) or local-area (care home bedrooms)."
          >
            <p>The five categories side by side:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Escape route lighting.</strong> 1 lx minimum across the full width of the
                escape route at floor level, with edge exclusions per BS EN 1838:2024 (outer 0.5 m
                on routes &gt; 2 m, outer ¼ width on routes ≤ 2 m). The 2024 update replaces the
                2013 centre-line + central-band wording. Switch-on 50 % within 5 s, full within 60
                s. Standard 3-hour duration. For corridors, staircases and any defined escape path.
              </li>
              <li>
                <strong>Open-area / anti-panic lighting.</strong> 0.5 lx minimum across the floor
                (excluding 0.5 m perimeter strip). Maximum 40:1 ratio of brightest to darkest point.
                Switch-on 50% within 5 s, full within 60 s. Standard 3-hour duration. For rooms &gt;
                60 m² OR &gt; 10 occupants regardless of size.
              </li>
              <li>
                <strong>High-risk task area lighting.</strong> 15 lx OR 10% of normal task
                illuminance, whichever is greater. Maximum 10:1 ratio (tighter than anti-panic).
                Switch-on within 0.5 s — effectively instantaneous. Duration to meet safe-shutdown
                procedure plus margin (often a few minutes; can be longer). NEW in 2025: ≥ 2
                separate circuits, ≤ 20 luminaires per fault. For workstations with hazardous
                machinery or processes that must be safely shut down.
              </li>
              <li>
                <strong>Standby lighting.</strong> NEW in 2025 BS 5266-1 scope. Illumination
                allowing normal activity to continue during mains failure. Levels and duration set
                by the operational requirement, not the safety case. For datacentres, broadcast
                studios, operating theatres, broadcast control rooms, areas where the activity must
                continue.
              </li>
              <li>
                <strong>Local-area lighting.</strong> NEW formal recognition in BS EN 1838:2024. For
                occupants permitted (or required) to remain during a mains-failure event. Levels per
                the 2024 EN application; sits between escape and anti-panic in concept. For care
                home bedrooms, hospital wards at night, hotel guest rooms in some configurations.
              </li>
            </ul>
            <p>
              The category is the design output for each space. A schedule mapping every space to
              its category(ies) is the design brief; the luminaire layout, supply, and controls are
              then engineered to deliver the categories selected.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 1838:2024 · Clauses 4.2, 4.3, 4.4, 4.5 (Categories of emergency lighting)"
            clause={
              <>
                Emergency lighting is provided to enable the safe egress of persons in the event of
                failure of the normal supply. It comprises emergency escape lighting — including
                escape route lighting, open area (anti-panic) lighting and high-risk task area
                lighting — and (where required) local-area lighting for occupants permitted to
                remain during the period of failure. Escape route lighting shall achieve not less
                than 1 lx across the full width of the route at floor level, with permitted edge
                exclusions of 0.5 m on routes wider than 2 m and ¼ width on routes 2 m or narrower.
                Open area lighting shall achieve not less than 0.5 lx throughout the empty core
                area. High-risk task area lighting shall achieve not less than 10 % of the required
                maintained illuminance for the task, but in no case less than 15 lx, with a
                switch-on time of 0.5 s.
              </>
            }
            meaning="The 2024 EN locks in the four-category core (escape, open-area, high-risk, plus the new local-area recognition) and the illuminance levels (1 lx, 0.5 lx, 15 lx). The 2025 BS 5266-1 layer adds standby as a fifth category for premises where normal activity must continue. Together they cover the full functional spectrum a designer needs to address."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* Type-comparison panel diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              Emergency lighting categories — comparison panel
            </h4>
            <svg
              viewBox="0 0 820 420"
              className="w-full h-auto"
              role="img"
              aria-label="Comparison panel showing the five emergency lighting categories — escape route, anti-panic, high-risk task, standby, and local-area — with their illuminance level, switch-on time, ratio, and primary application. Each category is shown as a coloured panel labelled with the BS EN 1838:2024 / BS 5266-1:2025 reference."
            >
              {/* Header */}
              <rect
                x="20"
                y="20"
                width="780"
                height="44"
                rx="8"
                fill="rgba(168,85,247,0.06)"
                stroke="rgba(168,85,247,0.4)"
                strokeWidth="1.4"
              />
              <text
                x="410"
                y="42"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                FIVE FUNCTIONAL CATEGORIES OF EMERGENCY LIGHTING
              </text>
              <text x="410" y="56" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                BS EN 1838:2024 + BS 5266-1:2025 — illuminance · switch-on · application
              </text>

              {/* 5 columns */}
              <g>
                <rect
                  x="20"
                  y="78"
                  width="152"
                  height="280"
                  rx="8"
                  fill="rgba(251,191,36,0.06)"
                  stroke="#FBBF24"
                  strokeWidth="1.4"
                />
                <text
                  x="96"
                  y="100"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                >
                  1 · Escape route
                </text>
                <text x="96" y="118" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Level: 1 lx full width
                </text>
                <text x="96" y="132" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  + edge exclusions
                </text>
                <text x="96" y="146" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  (2024 EN update)
                </text>
                <text x="96" y="166" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                  Switch-on:
                </text>
                <text x="96" y="178" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                  50% in 5 s
                </text>
                <text x="96" y="190" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                  100% in 60 s
                </text>
                <text x="96" y="210" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                  Ratio: 40:1
                </text>
                <text x="96" y="230" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                  Duration: 3 hr
                </text>
                <text
                  x="96"
                  y="260"
                  textAnchor="middle"
                  fill="rgba(251,191,36,0.85)"
                  fontSize="9.5"
                  fontWeight="bold"
                >
                  Application:
                </text>
                <text x="96" y="276" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Corridors,
                </text>
                <text x="96" y="288" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  stairs, exits,
                </text>
                <text x="96" y="300" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  defined escape
                </text>
                <text x="96" y="312" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  paths
                </text>
                <text x="96" y="332" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                  BS EN 1838 §4.3
                </text>
                <text x="96" y="346" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                  BS 5266-1 §5
                </text>
              </g>

              <g>
                <rect
                  x="180"
                  y="78"
                  width="152"
                  height="280"
                  rx="8"
                  fill="rgba(34,211,238,0.06)"
                  stroke="#22D3EE"
                  strokeWidth="1.4"
                />
                <text
                  x="256"
                  y="100"
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="11"
                  fontWeight="bold"
                >
                  2 · Anti-panic
                </text>
                <text x="256" y="118" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Level: 0.5 lx
                </text>
                <text x="256" y="132" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  across floor area
                </text>
                <text x="256" y="146" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  (0.5 m perimeter)
                </text>
                <text
                  x="256"
                  y="166"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Switch-on:
                </text>
                <text
                  x="256"
                  y="178"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  50% in 5 s
                </text>
                <text
                  x="256"
                  y="190"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  100% in 60 s
                </text>
                <text
                  x="256"
                  y="210"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Ratio: 40:1
                </text>
                <text
                  x="256"
                  y="230"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Duration: 3 hr
                </text>
                <text
                  x="256"
                  y="260"
                  textAnchor="middle"
                  fill="rgba(34,211,238,0.85)"
                  fontSize="9.5"
                  fontWeight="bold"
                >
                  Application:
                </text>
                <text x="256" y="276" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Open areas
                </text>
                <text x="256" y="288" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  &gt; 60 m² OR
                </text>
                <text x="256" y="300" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  &gt; 10 occupants
                </text>
                <text x="256" y="312" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  assembly halls
                </text>
                <text x="256" y="332" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                  BS EN 1838 §4.2
                </text>
                <text x="256" y="346" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                  BS 5266-1 §4.2
                </text>
              </g>

              <g>
                <rect
                  x="340"
                  y="78"
                  width="152"
                  height="280"
                  rx="8"
                  fill="rgba(239,68,68,0.06)"
                  stroke="#EF4444"
                  strokeWidth="1.4"
                />
                <text
                  x="416"
                  y="100"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="11"
                  fontWeight="bold"
                >
                  3 · High-risk
                </text>
                <text x="416" y="118" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Level: 15 lx OR
                </text>
                <text x="416" y="132" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  10% of task,
                </text>
                <text x="416" y="146" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  whichever higher
                </text>
                <text
                  x="416"
                  y="166"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Switch-on:
                </text>
                <text
                  x="416"
                  y="178"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  ≤ 0.5 s
                </text>
                <text
                  x="416"
                  y="190"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  (instantaneous)
                </text>
                <text
                  x="416"
                  y="210"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Ratio: 10:1
                </text>
                <text
                  x="416"
                  y="230"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Duration: task + margin
                </text>
                <text
                  x="416"
                  y="260"
                  textAnchor="middle"
                  fill="rgba(239,68,68,0.85)"
                  fontSize="9.5"
                  fontWeight="bold"
                >
                  Application:
                </text>
                <text x="416" y="276" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Hazardous
                </text>
                <text x="416" y="288" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  machinery,
                </text>
                <text x="416" y="300" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  presses, reactors,
                </text>
                <text x="416" y="312" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  surgical theatre
                </text>
                <text x="416" y="332" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                  BS EN 1838 §4.4
                </text>
                <text x="416" y="346" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                  2025 NEW segmentation
                </text>
              </g>

              <g>
                <rect
                  x="500"
                  y="78"
                  width="152"
                  height="280"
                  rx="8"
                  fill="rgba(168,85,247,0.06)"
                  stroke="#A855F7"
                  strokeWidth="1.4"
                />
                <text
                  x="576"
                  y="100"
                  textAnchor="middle"
                  fill="#A855F7"
                  fontSize="11"
                  fontWeight="bold"
                >
                  4 · Standby
                </text>
                <text x="576" y="118" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Level: per task
                </text>
                <text x="576" y="132" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  requirement
                </text>
                <text
                  x="576"
                  y="146"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  (application-specific)
                </text>
                <text
                  x="576"
                  y="166"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Switch-on:
                </text>
                <text
                  x="576"
                  y="178"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  per operation
                </text>
                <text
                  x="576"
                  y="190"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  (often instant)
                </text>
                <text
                  x="576"
                  y="210"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Ratio: per task
                </text>
                <text
                  x="576"
                  y="230"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Duration: per fail-over
                </text>
                <text
                  x="576"
                  y="260"
                  textAnchor="middle"
                  fill="rgba(168,85,247,0.85)"
                  fontSize="9.5"
                  fontWeight="bold"
                >
                  Application:
                </text>
                <text x="576" y="276" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Datacentres,
                </text>
                <text x="576" y="288" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  broadcast studios,
                </text>
                <text x="576" y="300" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  operating theatres
                </text>
                <text x="576" y="312" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  — continued ops
                </text>
                <text x="576" y="332" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                  2025 NEW in scope
                </text>
                <text x="576" y="346" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                  BS 5266-1 §1
                </text>
              </g>

              <g>
                <rect
                  x="660"
                  y="78"
                  width="138"
                  height="280"
                  rx="8"
                  fill="rgba(34,197,94,0.06)"
                  stroke="#22C55E"
                  strokeWidth="1.4"
                />
                <text
                  x="729"
                  y="100"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="11"
                  fontWeight="bold"
                >
                  5 · Local-area
                </text>
                <text x="729" y="118" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Level: per
                </text>
                <text x="729" y="132" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  2024 EN
                </text>
                <text
                  x="729"
                  y="146"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  application
                </text>
                <text
                  x="729"
                  y="166"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Switch-on:
                </text>
                <text
                  x="729"
                  y="178"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  5 s typical
                </text>
                <text
                  x="729"
                  y="198"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Duration: 3 hr
                </text>
                <text
                  x="729"
                  y="218"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  + as required
                </text>
                <text
                  x="729"
                  y="246"
                  textAnchor="middle"
                  fill="rgba(34,197,94,0.85)"
                  fontSize="9.5"
                  fontWeight="bold"
                >
                  Application:
                </text>
                <text x="729" y="262" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Care home
                </text>
                <text x="729" y="274" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  bedrooms,
                </text>
                <text x="729" y="286" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  hospital wards,
                </text>
                <text x="729" y="298" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  remain-in-place
                </text>
                <text x="729" y="310" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  scenarios
                </text>
                <text x="729" y="332" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                  2024 NEW
                </text>
                <text x="729" y="346" textAnchor="middle" fill="rgba(255,255,255,0.5)" fontSize="9">
                  BS EN 1838 §4.5
                </text>
              </g>

              {/* Footer note */}
              <rect
                x="20"
                y="378"
                width="780"
                height="32"
                rx="6"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
              <text
                x="410"
                y="398"
                textAnchor="middle"
                fill="rgba(255,255,255,0.65)"
                fontSize="9.5"
              >
                Each space may need ONE category, or a COMBINATION layered together — e.g. press
                floor needs high-risk + escape + anti-panic
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>Operating modes — maintained, non-maintained, sustained</ContentEyebrow>

          <ConceptBlock
            title="Three luminaire operating modes"
            plainEnglish="The category (escape / anti-panic / high-risk / standby / local-area) tells the designer WHAT illuminance to deliver. The operating mode tells the designer WHEN the luminaire actually puts light out. Three modes: maintained (always lit), non-maintained (only on mains failure), and sustained / combined (separate lamps for normal and emergency duty in the same housing). Picking the right mode for each location is part of the design."
            onSite="Picking modes is straightforward in most cases. Exit signs in places of assembly = maintained. Corridor luminaires for general escape = non-maintained. Multi-functional fittings that double as normal lighting and emergency lighting = sustained. Document the mode for each luminaire in the schedule; the data sheet for the product confirms it; the on-site label confirms it."
          >
            <p>The three modes side by side:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Maintained.</strong> The lamp is illuminated under normal mains supply AND
                on emergency battery supply. The lamp never goes off (except when manually isolated
                for service). Used where the luminaire must be visible at all times — exit signs,
                way-finding signs, refuge identification signs, point-of-emphasis indicators in
                places of assembly, healthcare, education. The slight extra running cost is
                justified by continuous visibility.
              </li>
              <li>
                <strong>Non-maintained.</strong> The lamp is OFF under normal mains supply (the
                battery is being held in float-charge state; the electronics monitor mains
                presence). On loss of mains, the lamp automatically illuminates from the battery.
                Used for general escape and anti-panic illumination of areas that have their own
                normal lighting and where the emergency luminaire would be redundant during normal
                occupancy. The dominant mode for general escape illumination — cheaper to run,
                simpler to commission.
              </li>
              <li>
                <strong>Sustained / combined.</strong> The luminaire houses TWO independent light
                sources — a normal lamp (operated from mains for general illumination) AND a
                separate emergency lamp (operated from battery on mains failure). The two are
                independent: the normal lamp can be controlled by DALI / dimming / scene switching
                without affecting the emergency lamp's readiness. On mains failure the normal lamp
                goes off; the emergency lamp comes on. Used in modern multi-functional fittings,
                particularly where the same physical fitting must serve both general lighting and
                emergency lighting roles in a controlled lighting design.
              </li>
            </ul>
            <p>
              The data sheet for any compliant luminaire states the mode (typically symbol codes).
              On site, the rating-plate label states it. In the design schedule, every luminaire is
              listed with its category (function) AND its mode (operation). Confusion between the
              two is a common source of audit findings.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Choosing the mode for the location"
            plainEnglish="A small set of rules-of-thumb covers the majority of mode-selection decisions on a typical building."
          >
            <p>Mode-selection rules of thumb:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>
                  Exit signs in places of assembly, sleeping accommodation, healthcare, education,
                  retail, hospitality.
                </strong>{' '}
                MAINTAINED. The pictogram must be visible at all times so occupants know where the
                exit is, including under normal-supply darkness (e.g. cinema during a feature).
                Without continuous illumination of the sign, the directional cue is lost.
              </li>
              <li>
                <strong>
                  Exit signs in industrial premises with stable lighting and a known regular
                  workforce.
                </strong>{' '}
                Sometimes NON-MAINTAINED. The workforce knows the exits from training and signage;
                the sign only needs to illuminate on actual emergency. This is a niche application;
                default is maintained for any non-trivial occupancy.
              </li>
              <li>
                <strong>General escape route lighting in corridors and stairs.</strong>
                NON-MAINTAINED. The corridor has its own normal lighting; the emergency luminaire
                only needs to fire when the mains fails. Saves running cost, reduces visual
                distraction.
              </li>
              <li>
                <strong>Anti-panic in open assembly areas.</strong> Usually NON-MAINTAINED. The
                normal lighting of the assembly area provides general illumination; the emergency
                luminaires are dark unless the mains fails.
              </li>
              <li>
                <strong>High-risk task workstation lighting.</strong> Either NON-MAINTAINED or
                SUSTAINED depending on whether the workstation has its own normal task light. If the
                workstation already has dedicated task lighting (e.g. a printing-press control desk
                light), the emergency luminaire is non-maintained. If the same fitting must serve
                normal task duty AND emergency duty, sustained is appropriate.
              </li>
              <li>
                <strong>
                  Multifunctional architectural fittings (modern offices, hotel lobbies).
                </strong>{' '}
                SUSTAINED. The fitting provides normal general lighting under DALI / scene / dimming
                control, plus a dedicated emergency lamp held in standby. The design preserves
                architectural intent without compromising emergency readiness.
              </li>
              <li>
                <strong>Standby lighting in datacentre / theatre / surgical theatre.</strong>{' '}
                Usually SUSTAINED or specialist multi-source. The requirement is continued
                operation; the same fitting must provide normal operating lighting AND emergency
                continuation. Bespoke design.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS EN 60598-2-22 · Clauses 2 and 3 (Classification of luminaires)"
            clause={
              <>
                Luminaires for emergency lighting shall be marked to indicate their type of
                operation, as follows: type "X0" — non-maintained luminaire, the lamp operates only
                in the emergency operation mode; type "X1" — maintained luminaire, the lamp is in
                operation in both the normal mode and the emergency operation mode; type "C" —
                combined luminaire, with one or more lamps for normal supply and one or more
                separate lamps for emergency supply; with rating-plate symbology indicating the mode
                and emergency duration.
              </>
            }
            meaning="The product standard codifies the modes. Every emergency luminaire data sheet uses these classifications. The rating plate shows the symbols. On audit, cross-check the schedule against the rating plates: the mode declared in the design must match the mode of the installed product."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            System architectures — self-contained, central battery, hybrid
          </ContentEyebrow>

          <ConceptBlock
            title="Self-contained — distributed batteries"
            plainEnglish="In a self-contained system each emergency luminaire is fitted with its own integral battery, charger electronics, and changeover circuitry. Each luminaire is electrically self-sufficient: it monitors mains presence, holds its battery in float charge, and changes over to battery output on mains loss. The luminaires are wired in parallel with the normal final lighting circuit; no separate emergency-supply distribution is needed. Self-contained dominates the UK market for routine commercial small-to-medium installations because of low install cost and high fault tolerance."
          >
            <p>The advantages and limitations of self-contained:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Advantages.</strong> Low install cost (no central plant, no dedicated
                emergency distribution); high fault tolerance (failure of one battery affects only
                one luminaire); easy to extend (add a new luminaire to any existing lighting
                circuit); standardised products from many manufacturers; simple test — most products
                have an integral self-test feature; suits small to medium installations.
              </li>
              <li>
                <strong>Limitations.</strong> Many small batteries (each requiring periodic
                replacement); battery cost adds up over a building lifetime; battery technology is
                typically Li-ion or NiMH with finite life (4-7 years typical); maintenance requires
                access to every luminaire (test buttons or self-test); not ideal where centralised
                testing or specialist battery technology is required (very large installations,
                life-safety critical hospitals).
              </li>
              <li>
                <strong>Battery technology.</strong> Modern self-contained luminaires use lithium
                iron phosphate (LiFePO₄) or lithium-ion. Older NiCd / NiMH still in service. Battery
                life typically 4-7 years for modern Li chemistry; replacement cost plus labour is
                the dominant lifecycle cost.
              </li>
              <li>
                <strong>Self-test capability.</strong> Modern self-contained luminaires
                automatically perform monthly functional tests and annual full-duration tests (where
                the product supports it). The luminaire reports status via integral LED indicator or
                via wireless / DALI / KNX integration. Reduces manual testing burden but does not
                eliminate the need for site verification per BS EN 50172:2024.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Central battery — centralised plant"
            plainEnglish="In a central battery system, one large battery (or a small number of batteries in a central battery room or plant area) supplies all emergency luminaires through a dedicated emergency-supply distribution. Cabling from the central battery to the luminaires is fire-rated (often MICC or fire-resistant cable per BS 7846). The luminaires themselves are simpler — typically just lamps with no internal battery — and are fed from the central battery on mains failure. Suits large institutional installations, life-critical premises, and where centralised maintenance is preferred."
          >
            <p>The advantages and limitations of central battery:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Advantages.</strong> Centralised battery maintenance (one plant location for
                all replacement work); larger battery capacity supports longer durations (4 hours, 8
                hours, 24 hours where needed); specialist battery chemistry possible (sealed
                lead-acid, NiCd, modern Li); centralised testing and reporting; simpler luminaires
                (no internal electronics); known long life of well-maintained battery (10+ years for
                VRLA).
              </li>
              <li>
                <strong>Limitations.</strong> Higher install cost (dedicated emergency distribution,
                fire-rated cable, plant room, BMS integration); single point of failure (battery,
                charger, or supply distribution failure can affect many luminaires unless
                segmentation is designed in); requires plant-room space; requires specialist
                commissioning and maintenance.
              </li>
              <li>
                <strong>BS EN 50171.</strong> The product standard for central battery equipment.
                Specifies performance, monitoring, testing, charging, environmental conditions,
                labelling. Required for any central battery system; the manufacturer's declaration
                of compliance is part of the project handover.
              </li>
              <li>
                <strong>Typical applications.</strong> Hospitals (where IPS / UPS and central
                battery overlap for life-safety services), large datacentres, theatres and cinemas
                (where central feeding the auditorium luminaires is convenient), large shopping
                centres / airports (where centralisation supports building-management integration).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Hybrid — mix and match"
            plainEnglish="A hybrid system uses BOTH self-contained and central battery in the same building. The central battery serves the high-density / critical zones (large auditorium, datacentre racks, theatre, life-critical wards); self-contained covers the rest of the building (general escape, distributed corridors, small open areas). The two architectures coexist; the maintenance regime supports both; the design clearly identifies which luminaires belong to which architecture."
          >
            <p>When hybrid makes sense:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Mixed-scale building.</strong> A hospital with a large auditorium plus
                hundreds of distributed wards and corridors. Central battery for the auditorium;
                self-contained for the wards.
              </li>
              <li>
                <strong>Specialist zone within general building.</strong> A corporate headquarters
                with a datacentre on one floor. Central battery for the datacentre (longer duration,
                BMS integration); self-contained for the rest of the building.
              </li>
              <li>
                <strong>Phased upgrade.</strong> A building originally fitted with central battery
                is being extended; the extension is fitted with self-contained for cost reasons; the
                existing central battery serves the original areas. The two architectures coexist
                within the same maintenance regime.
              </li>
              <li>
                <strong>Standby + escape combination.</strong> A datacentre needs standby lighting
                in the rack rooms (central battery preferred, longer duration, BMS integration); the
                rest of the building has escape and anti-panic provisions served by self-contained.
              </li>
            </ul>
            <p>
              The maintenance regime is the most common stumbling-block on hybrid sites. Make sure
              the contractor has the competence and equipment to test and maintain both
              architectures; make sure the documentation clearly identifies which luminaires belong
              to which architecture; make sure the photometric verification cycle covers both.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Clause 6 (Wiring and electrical supplies)"
            clause={
              <>
                Emergency lighting installations may be of self-contained type (where each luminaire
                incorporates its own battery), central battery type (where one or more central
                battery installations supply all emergency luminaires through a dedicated
                emergency-supply distribution complying with BS EN 50171), or a combination of
                these. The selection of architecture shall be based on the risk assessment, the size
                and complexity of the premises, the maintenance regime, and the duration required.
                For high-risk task areas, the emergency supply shall be divided across at least two
                separate circuits, with each circuit fault-isolated to no more than 20 luminaires.
              </>
            }
            meaning="The 2025 edition codifies the architecture options and adds the segmentation rule for high-risk areas. Designers have full flexibility within the architecture choice — driven by the risk assessment and the practical considerations — but must document the choice and justify it. The high-risk segmentation rule is non-negotiable for new designs and retrofit / re-fit work after 31 October 2025."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            Switch-on times, durations, ratios — performance requirements
          </ContentEyebrow>

          <ConceptBlock
            title="Switch-on times by category"
            plainEnglish="The lamp must come on within a defined time of mains failure. The time differs by category because the consequences of delay differ. Escape and anti-panic can tolerate a few seconds (human dark adaptation provides residual visibility). High-risk task cannot — the operator is mid-action with hazardous equipment. Standby is matched to the operational fail-over."
          >
            <p>BS EN 1838:2024 switch-on requirements:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Escape route.</strong> 50% of required illuminance within 5 s; 100% within
                60 s. The escape begins on partial illumination and the 1 lx target is reached
                within a minute of mains failure.
              </li>
              <li>
                <strong>Anti-panic.</strong> Same as escape — 50% within 5 s; 100% within 60 s. The
                room is illuminated to half-strength quickly enough to prevent the panic response,
                then to full anti-panic level within a minute.
              </li>
              <li>
                <strong>High-risk task.</strong> 100% within 0.5 s — effectively instantaneous. The
                operator does not lose sight of the controls. The fastest of the categories;
                designed against the operator's response window for hazardous machinery.
              </li>
              <li>
                <strong>Standby.</strong> Per operational requirement — often instantaneous
                (datacentre fail-over, theatre transitions), sometimes longer where the standby
                system itself takes time to start (generator).
              </li>
              <li>
                <strong>Local-area.</strong> Typically 5 s response is adequate — the occupant is
                not evacuating, and 5 s is short enough that the resident or patient is not left in
                extended darkness.
              </li>
            </ul>
            <p>
              Switch-on time is part of the luminaire product specification and is verified at
              commissioning. A self-contained luminaire with degraded electronics may have a longer
              switch-on than rated; the test verifies it meets the BS EN 1838 target.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Duration — 3 hours is the UK norm"
            plainEnglish="Duration is the period over which the emergency lighting must remain at the required illuminance after mains failure. UK practice has settled on 3 hours as the default minimum for almost all premises. Pre-2008 standards permitted shorter durations (1 hour) for some premises types, but the modern norm is 3 hours regardless because it covers most scenarios — initial evacuation, re-occupation if safe, partial re-evacuation, fire-and-rescue intervention. Some sectors need longer."
          >
            <p>Duration considerations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Standard 3 hours.</strong> Default for most UK premises — places of
                assembly, sleeping accommodation, healthcare, education, retail, hospitality, most
                workplaces. Annual full-discharge tests verify the system runs for 3 hours at the
                required illuminance.
              </li>
              <li>
                <strong>1 hour permitted.</strong> Limited circumstances — small premises with
                simple evacuation routes, immediate evacuation possible, no overnight occupancy.
                Even where 1 hour is permitted, modern designs commonly adopt 3 hours because the
                cost difference is small and the safety margin is real.
              </li>
              <li>
                <strong>Longer durations.</strong> Hospitals (where assisted evacuation may take
                longer), care homes (similar), premises with phased evacuation strategy, some
                high-rise residential, premises where the local authority or insurer requires more.
                Up to 24 hours is occasionally seen for life-critical healthcare.
              </li>
              <li>
                <strong>Standby-specific.</strong> Standby lighting duration matched to the
                operational fail-over time plus margin. Datacentre fail-over of 90 s plus margin =
                typical 3-5 minutes standby duration if generator-backed; longer if battery-only.
              </li>
            </ul>
            <p>
              Duration is set in the design and verified annually. Battery degradation reduces
              actual achievable duration over time; the annual full-discharge test catches the
              degradation; battery replacement restores the duration. The 5-year photometric
              verification (NEW in 2025) is at the START of the discharge period — verifies
              illuminance at the rated level on initiation; the duration test verifies it is
              sustained.
            </p>
          </ConceptBlock>

          <Scenario
            title="Specifying the architecture for a mixed-use building"
            situation="A new 4-storey mixed-use development has a basement car park (60 spaces), ground-floor retail (3 units, mostly anti-panic), 1st-floor restaurant (anti-panic + escape + high-risk task at the kitchen), 2nd-floor offices (escape + anti-panic for open-plan), 3rd-floor offices (escape + anti-panic for open-plan), and two stair towers connecting all floors. The client asks the designer for an architecture recommendation."
            whatToDo="Recommend a self-contained system for the majority of the building — escape lighting on stairs and circulation, anti-panic in retail and office open-plan areas. Self-contained suits the distributed nature of the loads, the moderate duration requirement (3 hours), and the cost profile of the project. Specify central battery for ONLY the kitchen high-risk task area at the first-floor restaurant — high-risk task lighting needs ≤ 0.5 s switch-on and the 2025 segmentation rule (≥ 2 circuits, ≤ 20 luminaires per fault) is most cleanly delivered through a small central battery serving just the kitchen. Specify maintained mode for all exit signs (places-of-assembly visibility); non-maintained for general corridor and open-area illumination; sustained for any architectural fittings in retail / office that double as normal lighting and emergency lighting under DALI control. Document each luminaire in a schedule mapping space → category → mode → architecture."
            whyItMatters="The architecture choice is not a single global decision — it is a per-zone decision driven by the function each zone needs. The hybrid recommendation here matches each zone to its appropriate architecture: self-contained where simplicity and fault-tolerance dominate, central battery where centralised testing and high-risk segmentation are required. The schedule that documents this becomes the design record and survives audit. A single global decision (e.g. 'all central battery' or 'all self-contained') is rarely optimal in modern mixed-use buildings."
          />

          <CommonMistake
            title="Specifying maintained operation everywhere 'just in case'"
            whatHappens="A designer, uncertain about mode selection, specifies maintained operation for every emergency luminaire on the project. The cost of products and the running cost are higher than necessary; in some areas the constant illumination of emergency luminaires creates a visual distraction or interferes with theatrical / hospitality scenes. The owner is unhappy with running costs and aesthetic impact."
            doInstead="Pick mode according to function. Maintained for exit signs and other always-visible duty. Non-maintained for general escape and anti-panic in areas with normal lighting. Sustained where normal and emergency duty share a fitting. The mode-selection rules of thumb above cover the vast majority of cases. If unsure, default to non-maintained for general escape (the safer cost-and-aesthetic choice) and maintained for exit signs (the safer safety choice)."
          />

          <CommonMistake
            title="Forgetting the high-risk segmentation rule on a 2026 design"
            whatHappens="A designer in 2026 specifies emergency lighting for a printing-press floor. The high-risk task luminaires are wired on a single emergency final circuit, all 24 of them. The 2025 edition rule — ≥ 2 separate circuits, ≤ 20 luminaires per fault — is forgotten. The design is issued and built; an audit at handover identifies the non-compliance; the system must be re-wired to split the 24 luminaires across at least 2 circuits with no more than 20 on any one fault. Cost and delay to the project."
            doInstead="On any high-risk task design after 31 October 2025, design for ≥ 2 separate emergency circuits from the outset. Plan the luminaire layout so any single circuit fault disables no more than 20 luminaires. Document the segmentation in the design certificate. The rule applies to new designs and to retrofit / re-fit work; existing systems are reviewed at the next photometric verification."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Battery technology and product trends</ContentEyebrow>

          <ConceptBlock
            title="Self-contained battery types in current use"
            plainEnglish="Self-contained luminaires use one of several battery chemistries. The chemistry affects life, cost, charging behaviour, replacement intervals, and recycling. Modern installations are dominated by lithium chemistries; older installations may have NiCd or NiMH approaching end-of-life and due for replacement."
          >
            <p>The dominant chemistries:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Lithium iron phosphate (LiFePO₄).</strong> Modern default for new
                self-contained products. Long cycle life (1500-3000 cycles), thermal stability,
                shallow discharge tolerance, low maintenance. Typical service life 5-7 years.
                Specific energy moderate but adequate for the small capacities needed (1-2 hr at a
                few watts). Most major manufacturers have transitioned to LiFePO₄ as the default
                chemistry for new product launches.
              </li>
              <li>
                <strong>Lithium-ion.</strong> Some products still use Li-ion (typically NMC/LCO
                chemistry). Higher specific energy than LiFePO₄ but shorter cycle life and stricter
                charging / temperature management. Service life 4-6 years.
              </li>
              <li>
                <strong>Nickel-metal hydride (NiMH).</strong> Common in 2010s products. Service life
                3-5 years. Increasingly replaced by lithium chemistries on new product launches.
                Existing installations come up for battery replacement at 3-5 year intervals.
              </li>
              <li>
                <strong>Nickel-cadmium (NiCd).</strong> Legacy technology. Long service life (8-10
                years) but environmental and charging-behaviour disadvantages. Cadmium recycling
                regulated. Phased out for most new products; existing installations still in service
                in older buildings.
              </li>
              <li>
                <strong>Sealed lead-acid (VRLA).</strong> Used in central battery systems rather
                than self-contained. Long life when well-maintained (8-10+ years), high capacity,
                well-understood chemistry. Specialist maintenance required.
              </li>
            </ul>
            <p>
              When specifying a new self-contained system, the chemistry choice typically follows
              the product line — most current major-brand luminaires use LiFePO₄. The data sheet
              states it. The replacement cycle and procurement plan can then be built around the
              stated service life. Battery replacement labour is a substantial proportion of
              lifecycle cost; design for accessible mounting positions reduces future cost.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Wireless test, DALI, and BMS integration"
            plainEnglish="Modern emergency lighting products increasingly integrate with building lighting controls and management systems. DALI EM (Digital Addressable Lighting Interface — Emergency) is the dominant protocol; KNX and Casambi alternatives exist. Wireless self-test products report status to a central console; BMS integration allows the building manager to see emergency-lighting health in real time. The integration affects cost, commissioning, and the maintenance regime."
          >
            <p>Integration trends:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>DALI EM (IEC 62386-202).</strong> The dominant addressable protocol for
                emergency lighting. Each luminaire on the DALI bus has its own address; the central
                controller initiates monthly functional and annual full-discharge tests, collects
                results, raises alerts on failure. Reduces manual testing burden; documentation is
                the system log rather than a paper book.
              </li>
              <li>
                <strong>Wireless self-test.</strong> Each luminaire performs its own scheduled tests
                using internal electronics; results are reported wirelessly (often via a low-power
                2.4 GHz mesh) to a central gateway. No bus-cabling cost; suits retrofit. The gateway
                pushes results to a web portal or BMS.
              </li>
              <li>
                <strong>BMS integration.</strong> Modbus, BACnet, KNX. The emergency-lighting test
                results feed into the building management system; the FM contractor sees a single
                pane of glass. Useful for large estates managed centrally.
              </li>
              <li>
                <strong>Cybersecurity.</strong> Wireless / connected products bring a small
                cybersecurity surface. Ensure products have current firmware update support and
                appropriate authentication on the management portal. Standards evolving in this
                space.
              </li>
              <li>
                <strong>Commissioning effort.</strong> Addressable / connected systems require more
                commissioning effort than standard self-contained — bus address mapping, test
                schedule configuration, gateway setup. Cost premium during commissioning; lifetime
                saving in test labour can recover this.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Five categories: escape (1 lx + full width), anti-panic (0.5 lx, 40:1), high-risk (15 lx, 0.5 s, 10:1), standby (per task — NEW in 2025 scope), local-area (per 2024 EN application).',
              'Three modes: maintained (always lit, exit signs), non-maintained (only on mains failure, general escape), sustained / combined (separate normal + emergency lamps in same housing, multifunctional fittings).',
              'Three architectures: self-contained (battery per luminaire — distributed, fault-tolerant, dominates UK market), central battery (one large battery, BS EN 50171, large/specialist installs), hybrid (mix and match per zone).',
              'Switch-on: 50% in 5 s + 100% in 60 s for escape and anti-panic; ≤ 0.5 s for high-risk task; per requirement for standby.',
              'Duration: 3 hours is UK default. Longer for assisted-evacuation premises (some hospitals / care homes), phased evacuation, life-critical services.',
              'Product / system standards stack: BS EN 60598-2-22 (luminaire product), BS EN 50171 (central battery equipment), BS EN 50172:2024 (system + testing), BS EN 1838:2024 (illuminance + switch-on), BS 5266-1:2025 (UK Code of Practice).',
              'NEW 2025: high-risk task areas need ≥ 2 separate circuits with ≤ 20 luminaires per fault. Segment from the start of any new high-risk design.',
              'The schedule maps every space to its category(ies), its mode, its architecture. The schedule is the design brief, the commissioning reference, and the photometric-verification reference.',
            ]}
          />

          <FAQ
            items={[
              {
                question: 'Is self-contained always cheaper than central battery?',
                answer:
                  'Lower install cost almost always (no central plant, no dedicated emergency distribution). Lifetime cost depends on the maintenance regime: distributed batteries replaced individually adds labour; centralised replacement on a planned schedule can be more efficient. For routine commercial small-to-medium installations (offices, retail, hospitality up to a few hundred luminaires), self-contained typically wins on both install and lifecycle. For large institutional sites (hospitals, datacentres, theatres, transport hubs), central battery often wins on lifecycle through centralised maintenance.',
              },
              {
                question:
                  'Can I mix maintained and non-maintained luminaires on the same final circuit?',
                answer:
                  'Yes — the operating mode is a property of the individual luminaire (its internal electronics decide whether to illuminate the lamp under normal mains supply). The wiring of the final circuit is the same. A circuit can carry maintained exit signs and non-maintained corridor luminaires together. The schedule and rating-plate symbology document which luminaire is which mode.',
              },
              {
                question:
                  'My client has a small office and wants the cheapest compliant emergency lighting. What do I specify?',
                answer:
                  'Self-contained LED luminaires throughout. Maintained mode at exit signs (so the running-man pictogram is always visible). Non-maintained mode along the escape route corridors. Standard 3-hour duration. Modern LED self-contained units cost £40-100 each in product cost; install cost adds typically £40-80 per point. For a small office (10-15 points), total project cost is often £1500-£3000 including documentation. The lifetime cost is dominated by battery replacement at 5-7 year intervals plus annual maintenance — typically £200-400 per year for a small-office scale system.',
              },
              {
                question: 'Is sustained / combined operation widely used in modern fittings?',
                answer:
                  "Yes — particularly in modern multi-functional architectural fittings where the same physical luminaire provides general lighting (DALI / scene controlled) and emergency lighting. The two light sources inside the housing are independent; the normal lamp can be at any output (or off) under building lighting controls without affecting the emergency lamp's readiness. Common in hotels, restaurants, modern offices with sophisticated lighting design.",
              },
              {
                question:
                  'How does the 2025 segmentation rule apply if I have only 6 luminaires in a high-risk area?',
                answer:
                  'Even 6 luminaires must be split across at least 2 separate emergency circuits — say 3 + 3, or 4 + 2. The minimum 2 circuits is per the rule regardless of luminaire count. The 20-per-fault cap applies only at higher counts. For very small high-risk areas, this can mean 2 small circuits each with 2-3 luminaires, accepting the slight extra cabling cost as the price of compliance.',
              },
              {
                question:
                  'Do I have to do annual full-discharge tests on a central battery system at the same time as for self-contained?',
                answer:
                  'Yes, the BS EN 50172:2024 test regime applies regardless of architecture. Daily visual checks (central battery indicator panel) plus monthly functional tests plus annual full-duration discharge tests plus 5-year photometric verification. The central-battery system makes the discharge test centralised — one event for the whole system rather than per-luminaire — but the test itself is the same as for self-contained. The commissioning report and battery data sheet may permit separate sub-bank testing where the building cannot tolerate a full single-event discharge.',
              },
              {
                question:
                  'What about emergency lighting in hazardous areas (Zone 1, Zone 2 explosive atmospheres)?',
                answer:
                  'Use Ex-rated emergency luminaires certified for the applicable zone (typically Ex d, Ex e, or Ex i variants). The product must comply with both BS EN 60598-2-22 (emergency lighting product standard) AND the IECEx / ATEX certification for the hazardous area. Ex-rated emergency lights are available from specialist manufacturers; cost premium is significant. The rest of the BS 5266-1 / BS EN 1838 design framework applies as normal — escape, anti-panic, high-risk, etc. — but the products are zone-rated.',
              },
              {
                question: 'My client wants wireless self-test — is this BS 5266 compliant?',
                answer:
                  'Yes — BS 5266-1:2025 and BS EN 50172:2024 do not mandate any particular test mechanism. The standards specify the test schedule (daily / monthly / annual / 5-year). How the tests are executed is a system-design choice. Wireless self-test where the luminaire performs its own scheduled tests and reports wirelessly is fully compliant provided the test logs are retained and accessible per BS EN 50172:2024 §6. Many large estates now use addressable / wireless systems to reduce manual test burden.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz
            title="Types of emergency lighting systems — Emergency Lighting Module 1.3"
            questions={quizQuestions}
          />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/emergency-lighting-module-1')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 1
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/emergency-lighting-module-1-section-4')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.4 BS 5266 and related standards
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

export default EmergencyLightingModule1Section3;
