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
    id: 'elm1-s1-responsible-person',
    question:
      'Under the Regulatory Reform (Fire Safety) Order 2005, who carries the legal duty for ensuring emergency lighting is installed, maintained and tested?',
    options: [
      'The electrician or contractor who carried out the most recent work on the system.',
      'The local fire and rescue service that inspects and enforces at the premises.',
      'The "responsible person" — the employer, owner, occupier or anyone in control of the premises.',
      'The luminaire manufacturer, under product-liability and supply-of-goods law.',
    ],
    correctIndex: 2,
    explanation:
      'RRO 2005 Article 3 defines the responsible person. Articles 8–22 set out the duties — risk assessment (Art 9), fire safety arrangements (Art 11), maintenance (Art 17), emergency routes and exits (Art 14, which includes emergency lighting where natural light is insufficient). The responsible person is accountable; contractors are engaged to deliver compliance but the legal duty stays with the responsible person.',
  },
  {
    id: 'elm1-s1-purpose-scope',
    question:
      'BS 5266-1:2025 expanded the scope of "emergency lighting" relative to the 2016 edition. Which of the following is now within the scope of the standard?',
    options: [
      'Only escape-route lighting on defined fire-escape routes through the premises.',
      'Escape lighting, local-area lighting for occupants permitted to remain, and standby lighting where normal activity must continue.',
      'Only the luminaires marked with the green running-man escape pictogram.',
      'Only systems using a central battery — self-contained units sit outside the standard.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5266-1:2025 broadened the scope to cover the full spectrum of lighting that may be required during a mains failure: escape, local-area, and standby. Borrowed light — relying on light spilling in from an adjacent space — is excluded from the design provision because it cannot be relied on (the adjacent space may itself be in darkness, the door may be closed, the borrowed source may have failed). Designers must illuminate the space directly.',
  },
  {
    id: 'elm1-s1-workplace-regs',
    question:
      'Under the Workplace (Health, Safety and Welfare) Regulations 1992 Reg 8, when must a workplace be provided with emergency lighting?',
    options: [
      'Only where the workplace has more than 20 employees on site at any one time.',
      'Only during weekend and out-of-hours operation, when daylight is unavailable.',
      'Where workers are specially exposed to danger if the artificial lighting fails — a risk test, not a size test.',
      'Only in premises that contain a potentially explosive or flammable atmosphere.',
    ],
    correctIndex: 2,
    explanation:
      'Reg 8(3) of the 1992 Workplace Regulations: "Suitable and sufficient emergency lighting shall be provided in any room in circumstances in which persons at work are specially exposed to danger in the event of failure of artificial lighting." It is a risk test, not a size test. A small basement plant room with no natural light is in scope; a glass-walled office at street level with daytime-only operation may not be.',
  },
  {
    id: 'elm1-s1-penalties',
    question:
      'A retail premises is found to have no working emergency lighting on its primary fire-exit route. Which of the following describes the realistic enforcement and penalty exposure?',
    options: [
      'A small fixed-penalty spot fine, payable to the fire authority on the day.',
      'Removal of the premises from the local council business-rates register.',
      'Enforcement or prohibition notice, prosecution under Article 32 (unlimited fine, up to 2 years custody), voided insurance and civil liability.',
      'No legal exposure, as emergency lighting is treated as "good practice" only.',
    ],
    correctIndex: 2,
    explanation:
      'RRO 2005 Article 32 makes failure to comply with the order a criminal offence. Tier 1 (general failures) is summary; Tier 2 (failures placing persons at risk of death or serious injury) is unlimited fine and/or custodial up to 2 years. Insurer cover requires demonstrable compliance with statute and the relevant standards. Civil liability follows separately under personal injury / negligence law. The exposure is substantial and personal.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'What are the FOUR primary purposes that BS 5266-1:2025 identifies for emergency lighting?',
    options: [
      'Escape-route lighting, open-area / anti-panic lighting, high-risk task lighting, and standby lighting where activity must continue.',
      'Escape route lighting, exit-sign illumination, firefighter-access lighting, and external perimeter security lighting around the building.',
      'Escape route lighting, anti-panic lighting, high-risk task lighting, and decorative façade lighting to mark the building at night.',
      'Escape route lighting, anti-panic lighting, standby lighting, and corridor security lighting to deter intruders during an outage.',
    ],
    correctAnswer: 0,
    explanation:
      'BS 5266-1:2025 identifies four functional categories. The 2025 expansion adds standby and explicitly recognises local-area lighting (BS EN 1838:2024). Escape, anti-panic, and high-risk task are the long-standing three; standby and local-area complete the picture for premises where occupants may need to continue an activity or remain in place during the outage.',
  },
  {
    id: 2,
    question:
      'Which UK statute imposes the primary general duty for fire safety on the "responsible person", including duties relating to emergency lighting?',
    options: [
      'The Regulatory Reform (Fire Safety) Order 2005, applying to almost all non-domestic premises in England and Wales.',
      'The Building Act 1984, which through the Building Regulations places the primary fire-safety duty on the building owner once a completion certificate is issued.',
      'BS 5266-1, the British Standard whose recommendations carry statutory force and create the legal duty to provide emergency lighting.',
      'The Health and Safety at Work etc Act 1974, which is the sole statute imposing fire-safety duties in non-domestic premises.',
    ],
    correctAnswer: 0,
    explanation:
      'The RRO 2005 is the principal statute. The responsible person must conduct a fire risk assessment (Art 9), provide and maintain emergency routes and exits (Art 14), maintain fire safety equipment (Art 17), and is criminally liable under Art 32. It is supplemented by the Health and Safety at Work etc Act 1974 and the Workplace (Health, Safety and Welfare) Regulations 1992 (Reg 8). BS 5266-1 is the technical standard used to deliver compliance — it does not, on its own, create the legal duty.',
  },
  {
    id: 3,
    question:
      'A fire risk assessment under RRO 2005 Article 9 must consider lighting failure as a hazard. What is the assessment required to determine?',
    options: [
      'The colour rendering index (CRI) of the normal lighting, so the emergency lighting can be specified to match the same colour temperature.',
      'The total connected lighting load only, since the emergency lighting battery capacity is then sized in proportion to the normal lighting wattage.',
      'Whether, on lighting failure, occupants can still follow the escape route, recognise hazards, find firefighting equipment and call points, and shut down high-risk plant.',
      'Only the duration of the standby battery, which the luminaire manufacturer fixes at 3 hours regardless of the premises.',
    ],
    correctAnswer: 2,
    explanation:
      'Article 9 of the RRO requires a "suitable and sufficient" assessment of fire risk. Lighting failure is one of the hazards that must be assessed; the output is a written record (where 5+ employees) and an action plan. Emergency lighting is the engineered control. The assessment drives the design — the design does not drive the assessment.',
  },
  {
    id: 4,
    question:
      'The 2025 edition of BS 5266-1 introduced an explicit exclusion that previous editions did not state as forcefully. What is it?',
    options: [
      'Maintained luminaires are excluded from escape routes, so only non-maintained fittings may be used to illuminate a means of escape.',
      'Self-contained luminaires are excluded; only central-battery systems may now be used to satisfy the standard for new installations.',
      'Daylight is excluded as a contribution, so emergency lighting must be designed for full output even in spaces with extensive glazing.',
      '"Borrowed light" — light spilling in from an adjacent space — is no longer counted as a valid contribution; each space must be illuminated directly.',
    ],
    correctAnswer: 3,
    explanation:
      'The 2025 borrowed-light exclusion is one of the most consequential changes from 2016. Previously, designers could plead borrowed light from an adjacent illuminated area; now they cannot. Every space that needs emergency lighting must have luminaires positioned to illuminate it directly. This affects designs for stair-half-landings, lobbies, plant rooms behind glazed walls, and similar spaces that previously relied on neighbouring spill.',
  },
  {
    id: 5,
    question:
      'Which of the following premises types is MOST LIKELY to require emergency lighting, in the absence of any other factor?',
    options: [
      'A single private dwelling occupied solely by its owners, with no shared communal areas.',
      'An open-air car park lit only by overhead daylight during its hours of operation.',
      'A multi-storey office block with internal corridors longer than 30 m and no natural daylight in those corridors.',
      'A detached single-storey workshop with full-height glazing on three walls, used only in daylight hours.',
    ],
    correctAnswer: 2,
    explanation:
      'Triggers in Approved Document B and BS 5266-1 include: internal corridors > 30 m, escape routes through windowless areas, basements, storeys without natural daylight, places of assembly, sleeping accommodation. Domestic dwellings are generally outside the RRO unless they have shared communal areas (HMOs, blocks of flats). Open-air car parks and outbuildings rarely trigger the requirement.',
  },
  {
    id: 6,
    question:
      'A premises has emergency lighting that was correctly installed 20 years ago, has been tested annually, and currently passes its 3-hour discharge test. The 2025 BS 5266-1 introduces a NEW periodic verification requirement that this premises has never undertaken. What is it?',
    options: [
      'A 5-yearly photometric survey, using a calibrated luxmeter, confirming the measured illuminance still meets the BS EN 1838:2024 levels.',
      'A mandatory 5-yearly replacement of every battery, regardless of measured condition, to guarantee the 3-hour duration is retained.',
      'A 5-yearly recalibration of the central-battery charger output, to confirm the float voltage still matches the cell manufacturer specification.',
      'A 5-yearly insulation-resistance test of every emergency-lighting final circuit, recorded against the original commissioning values.',
    ],
    correctAnswer: 0,
    explanation:
      'The 5-year photometric verification is one of the most significant 2025 changes. The survey confirms the measured illuminance still meets BS EN 1838:2024 (1 lx escape-route centre-line across the full width with edge exclusions, 0.5 lx anti-panic, 15 lx high-risk task), accounting for lumen depreciation, dirt and layout changes. Annual functional discharge tests prove the system runs for 3 hours; they do not prove the floor is still illuminated to the required level. A 20-year-old system passing duration tests can have illuminance well below the BS EN 1838 levels.',
  },
  {
    id: 7,
    question:
      'A small office (4 employees) has no emergency lighting at all. The owner argues that the Workplace Regulations 1992 do not apply because she has fewer than 5 employees. Is the argument correct?',
    options: [
      'Yes — the Workplace Regulations 1992 only bite at 5 or more employees, so a 4-person office is outside their scope entirely.',
      'Yes — the 5-employee threshold means neither the Workplace Regulations 1992 nor the RRO 2005 apply, so no emergency lighting is required.',
      'No — the threshold is irrelevant because the Workplace Regulations 1992 were repealed and replaced by the RRO 2005 in this respect.',
      'No. The 5-employee threshold relates to a WRITTEN risk-assessment record under MHSWR 1999, not the substantive duty — Workplace Reg 8 and the RRO 2005 apply at any headcount.',
    ],
    correctAnswer: 3,
    explanation:
      'Common confusion. The 5-employee threshold under MHSWR 1999 Reg 3 relates to the need to RECORD the risk assessment in writing — small employers may keep it informally. The substantive duties (assess risks, provide controls, including emergency lighting where needed) apply at any size. The Workplace Regulations 1992 Reg 8 applies regardless of headcount.',
  },
  {
    id: 8,
    question:
      'Why does the 2025 edition of BS 5266-1 explicitly list HIGH-RISK AREAS with a tighter electrical-supply requirement (≥ 2 separate circuits, ≤ 20 luminaires per fault)?',
    options: [
      'So a single circuit fault cannot disable a whole bank of luminaires in a hazardous area — redundancy by segmentation across separate circuits.',
      'Because high-risk areas draw more current, so the luminaires must be spread across multiple circuits to avoid overloading any single final circuit.',
      'Because high-risk task lighting needs the higher 15 lx level, which a single circuit cannot supply without exceeding its volt-drop limit over the run.',
      'Because high-risk areas are required to use sustained (maintained) luminaires, and maintained fittings must always be split across two or more circuits.',
    ],
    correctAnswer: 0,
    explanation:
      'New in 2025. The historic risk: a single circuit fault could disable an entire bank of emergency luminaires in a hazardous area at exactly the moment they are needed. The 2025 rule requires segmentation across at least 2 separate circuits so a single fault cannot disable the protection. 20-luminaire-per-fault cap limits the local damage zone of any one fault. The whole package is electrical-distribution redundancy translated into a code requirement.',
  },
  {
    id: 9,
    question:
      'In law, who can be prosecuted under the RRO 2005 if an inadequate or missing emergency lighting installation contributes to injury during an evacuation?',
    options: [
      'Only the contractor who installed the system, since the criminal duty transfers to whoever carried out the most recent work on it.',
      'Only the maintenance company holding the current service contract, because they are the competent person responsible for the system.',
      'The "responsible person" (employer / owner / occupier / person in control); company officers may also be prosecuted personally under Article 32 for consent, connivance or neglect.',
      'Only the local fire and rescue authority that issued the enforcement notice, as the body that approved the premises for occupation.',
    ],
    correctAnswer: 2,
    explanation:
      "RRO 2005 Article 32(8) imposes personal liability on directors / managers / officers where corporate failures are due to their consent, connivance or neglect. The responsible person bears the primary duty. Engaging a competent contractor is good practice and supports the responsible person's defence, but does not displace the legal duty. Liability is not transferred by signing a service contract.",
  },
  {
    id: 10,
    question:
      'Which of the following best describes the relationship between BS 5266-1, the RRO 2005, and Approved Document B?',
    options: [
      'They are three alternatives — complying with any one of them discharges the duty, so a designer may follow BS 5266-1 instead of the RRO 2005.',
      'BS 5266-1 sits at the top as the legal duty, with the RRO 2005 and Approved Document B being subordinate guidance on how to meet the standard.',
      'They are layered: the RRO 2005 imposes the legal duty, Approved Document B is statutory guidance for new build, and BS 5266-1:2025 is the technical standard delivering compliance.',
      'They cover entirely separate subjects — the RRO 2005 deals only with means of escape, while emergency lighting falls solely under Approved Document B.',
    ],
    correctAnswer: 2,
    explanation:
      'A common exam trap is to treat them as alternatives. They are layers. The RRO is the legal duty. Approved Document B is the statutory guidance route to compliance for new build / material alteration. BS 5266-1 is the technical British Standard — the engineering detail that delivers compliance with both. Following BS 5266-1 supports a defensible compliance position; ignoring it is hard to defend even if the law does not literally require it.',
  },
];

const EmergencyLightingModule1Section1 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Purpose and legal framework | Emergency Lighting M1.1 | Elec-Mate',
    description:
      'BS 5266-1:2025, RRO 2005, Workplace Regulations 1992 and Approved Document B — the legal architecture behind emergency lighting in UK premises. Responsible person duties, 2025 scope expansion, borrowed-light exclusion, and 5-year photometric verification.',
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
            eyebrow="Module 1 · Section 1"
            title="Purpose and legal framework"
            description="What emergency lighting is for, who has the legal duty to provide it, and how the layered UK regime — RRO 2005, Workplace Regulations 1992, Approved Document B, BS 5266-1:2025 — fits together."
            tone="yellow"
          />

          <TLDR
            points={[
              'Emergency lighting is automatic illumination on mains failure that lets occupants (a) follow the escape route, (b) avoid panic in open areas, (c) safely shut down hazardous processes, and (d) — under 2025 scope — continue normal activity where the use case requires it.',
              'The principal UK statute is the Regulatory Reform (Fire Safety) Order 2005. The "responsible person" — employer, owner, occupier, or person in control — has the legal duty.',
              'Workplace (Health, Safety and Welfare) Regulations 1992 Reg 8 requires emergency lighting wherever lighting failure would put workers at risk. HSAW Act 1974 imposes the underlying general duty of care.',
              'BS 5266-1:2025 is the British Standard. It is a Code of Practice — recommendatory, not statute — but following it is the standard route to demonstrating compliance with the RRO.',
              'The 2025 edition broadened the scope to escape + local-area + standby lighting, EXCLUDED borrowed light from design provision, introduced a 5-year photometric verification requirement, and imposed segmentation rules for high-risk areas (≥2 circuits, ≤20 luminaires per fault).',
              "Penalties for failure are real. RRO Art 32: unlimited fine and/or 2 years' custodial. Officers of bodies corporate are personally liable under Art 32(8). Insurer cover voids on non-compliance. Civil liability follows.",
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the four primary purposes of emergency lighting per BS 5266-1:2025: escape, anti-panic, high-risk task, standby — and identify which apply in a given premises',
              'Identify the "responsible person" under the RRO 2005 and explain that the duty cannot be discharged by appointing a contractor',
              'Describe the duties imposed by the Regulatory Reform (Fire Safety) Order 2005 — Articles 9, 11, 14, 17 and 32 in particular',
              'Apply the Workplace (Health, Safety and Welfare) Regulations 1992 Reg 8 emergency-lighting test to a workplace',
              'Place BS 5266-1:2025, BS EN 1838:2024 and BS EN 50172:2024 within the legal hierarchy and explain how the standards deliver statutory compliance',
              'Recognise the four most consequential 2025 changes: scope expansion, borrowed-light exclusion, 5-year photometric verification, and high-risk area segmentation',
              'Describe the realistic enforcement and penalty exposure (RRO Art 30 / 31 / 32, insurer voiding, civil liability)',
              'Use Approved Document B Volume 2 cl. 5 as a starting checklist for premises types where emergency lighting is required',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What emergency lighting is for</ContentEyebrow>

          <ConceptBlock
            title="The four functional purposes"
            plainEnglish="Emergency lighting is the automatic illumination that comes on when the normal mains lighting fails. Its job is to give occupants enough light, for long enough, to do whatever they need to do safely while the mains is out. BS 5266-1:2025 identifies four distinct functions, each with its own performance requirement."
            onSite="Walk a premises in your head before designing. What will the occupants actually need to DO if the lights go out? Find the exit? Calm down and re-orient? Shut down a press before leaving? Carry on operating an X-ray machine? Each function maps to a different category and a different illuminance level."
          >
            <p>The four functions BS 5266-1:2025 recognises:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Escape route lighting.</strong> The illumination of the defined escape route
                — corridors, staircases, fire-exit doors. Per BS EN 1838:2024 the minimum is 1 lx
                measured at floor level across the FULL WIDTH of the escape route, with edge
                exclusions (outer 0.5 m on routes &gt; 2 m, outer ¼ width on routes ≤ 2 m). The 2024
                edition replaces the 2013 centre-line + central-band wording. Provides the
                navigational cue for occupants moving from where they are to outside the building.
              </li>
              <li>
                <strong>Open-area (anti-panic) lighting.</strong> The illumination of larger open
                spaces such as shop floors, dining halls, dance floors, lecture theatres. Minimum
                0.5 lx across the area excluding a 0.5 m perimeter strip. Maximum 40:1 ratio of
                brightest to darkest point — preventing dazzle and dark spots that would impede
                escape. Reduces panic by giving the room enough light to make the geometry
                comprehensible.
              </li>
              <li>
                <strong>High-risk task area lighting.</strong> The illumination at workstations
                where occupants must safely shut down a hazardous process before evacuating —
                printing presses, chemical reactors, large machinery, X-ray equipment, surgical
                rooms. Minimum 15 lx OR 10% of the normal task illuminance, whichever is greater.
                Switch-on time ≤ 0.5 s (effectively instantaneous). Allows controlled shutdown
                rather than abrupt abandonment of a process that would itself become hazardous if
                left running.
              </li>
              <li>
                <strong>Standby lighting.</strong> NEW in BS 5266-1:2025 scope. Illumination
                allowing normal activity to continue during mains failure where the activity must
                continue — operating theatres, datacentre racks during controlled fail-over,
                broadcast studios. Levels and duration are use-specific; designed against the
                continuity-of-operation requirement, not the escape requirement.
              </li>
            </ul>
            <p>
              A fifth category, <strong>local-area lighting</strong>, is recognised by BS EN
              1838:2024. It addresses areas where occupants are permitted (or required) to remain
              during a mains-failure event — not escaping, not operating a hazardous process, simply
              remaining safely in place. Care home bedrooms, hospital wards at night. Levels per the
              2024 EN.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Clause 4.2 (General principles — function)"
            clause={
              <>
                The function of emergency escape lighting is to provide automatically lighting of
                sufficient duration and intensity to enable persons to leave the premises safely in
                the event of failure of the normal supply, including where required (a) the
                illumination of escape routes, (b) the illumination of open areas to prevent panic,
                (c) the illumination of high-risk task areas to enable controlled shutdown, and (d)
                where required for the use of the premises, the provision of standby lighting to
                allow normal activities to continue.
              </>
            }
            meaning="The four-function model is now codified in the standard's general principles. A design that addresses only escape routes, ignoring anti-panic and high-risk task and standby where they apply, does not deliver the standard's intent. The risk assessment is what tells you which functions apply."
          />

          <ConceptBlock
            title="The 'why' behind the four functions"
            plainEnglish="The four functions exist because real evacuation events have different sub-problems. Getting from a workstation to the corridor is one problem. Finding the exit door from the middle of an open dance floor is a different problem. Safely shutting down a press is a different problem again. A single illuminance level cannot solve all three. The standard segments the functions and specifies the level appropriate to each."
          >
            <p>The historical reasoning, as captured in the standard committee documents:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Escape route lighting solves <em>navigation</em> — does the occupant know which way
                to go? 1 lx is the level at which the human eye can read directional signs and see
                floor obstacles in a familiar route.
              </li>
              <li>
                Anti-panic lighting solves <em>spatial comprehension</em> — does the occupant
                understand the shape of the room they are in? In a dark open area, the brain cannot
                resolve where walls and exits are. Even if specific paths are illuminated, the
                surrounding darkness produces panic. 0.5 lx across the area, with a bounded contrast
                ratio (40:1), keeps the geometry legible.
              </li>
              <li>
                High-risk task lighting solves <em>continued operation safely</em> — can the
                operator continue to operate the equipment for the few seconds needed to make it
                safe? 15 lx or 10% of task illuminance is the level at which control surfaces
                (buttons, gauges, valves, isolators) can still be read.
              </li>
              <li>
                Standby lighting solves <em>continuity of activity</em> — can the activity itself
                continue? Different from any of the above. Surgical operations cannot be paused for
                3 hours of mains failure; they must continue. Standby illuminance is set against
                task performance, not safe egress.
              </li>
            </ul>
            <p>
              The competent designer maps each space in the premises against the four functions and
              provides the appropriate combination. Most spaces need at most one or two; some spaces
              — a hospital theatre with adjoining recovery and corridor — need three or four
              overlaid.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          {/* RRO duty-chain diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              The RRO 2005 duty chain leading to emergency lighting
            </h4>
            <svg
              viewBox="0 0 820 420"
              className="w-full h-auto"
              role="img"
              aria-label="The Regulatory Reform (Fire Safety) Order 2005 duty chain. The responsible person carries Article 9 (risk assessment), Article 11 (arrangements), Article 14 (escape routes including emergency lighting), and Article 17 (maintenance). These flow downward to the technical standards BS 5266-1:2025, BS EN 1838:2024 and BS EN 50172:2024 which deliver the engineering compliance, with sanction under Article 32 for failure."
            >
              {/* Legal layer */}
              <rect
                x="20"
                y="20"
                width="780"
                height="80"
                rx="10"
                fill="rgba(168,85,247,0.06)"
                stroke="#A855F7"
                strokeWidth="1.6"
              />
              <text
                x="410"
                y="42"
                textAnchor="middle"
                fill="#A855F7"
                fontSize="11"
                fontWeight="bold"
              >
                LEGAL DUTY · Regulatory Reform (Fire Safety) Order 2005
              </text>
              <text x="410" y="58" textAnchor="middle" fill="rgba(255,255,255,0.75)" fontSize="9.5">
                Responsible person — employer / owner / occupier / person with control of the
                premises
              </text>
              <text x="410" y="74" textAnchor="middle" fill="rgba(255,255,255,0.55)" fontSize="9">
                Duty cannot be discharged by appointing a contractor; engagement supports
                compliance, does not transfer it
              </text>
              <text
                x="410"
                y="90"
                textAnchor="middle"
                fill="rgba(168,85,247,0.85)"
                fontSize="9.5"
                fontWeight="bold"
              >
                Articles 9 · 11 · 14 · 17 · 32
              </text>

              {/* Article boxes (4 across) */}
              <g>
                <rect
                  x="32"
                  y="120"
                  width="180"
                  height="62"
                  rx="8"
                  fill="rgba(34,211,238,0.06)"
                  stroke="#22D3EE"
                  strokeWidth="1.4"
                />
                <text
                  x="122"
                  y="138"
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Art 9 — Risk assessment
                </text>
                <text x="122" y="153" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Suitable + sufficient
                </text>
                <text
                  x="122"
                  y="166"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Recorded if 5+ employees
                </text>
                <text
                  x="122"
                  y="178"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Drives the design brief
                </text>
              </g>
              <g>
                <rect
                  x="222"
                  y="120"
                  width="180"
                  height="62"
                  rx="8"
                  fill="rgba(34,211,238,0.06)"
                  stroke="#22D3EE"
                  strokeWidth="1.4"
                />
                <text
                  x="312"
                  y="138"
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Art 11 — Arrangements
                </text>
                <text x="312" y="153" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Planning · organisation
                </text>
                <text
                  x="312"
                  y="166"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Control · monitoring
                </text>
                <text
                  x="312"
                  y="178"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Review of measures
                </text>
              </g>
              <g>
                <rect
                  x="412"
                  y="120"
                  width="180"
                  height="62"
                  rx="8"
                  fill="rgba(251,191,36,0.06)"
                  stroke="#FBBF24"
                  strokeWidth="1.4"
                />
                <text
                  x="502"
                  y="138"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Art 14 — Routes &amp; exits
                </text>
                <text x="502" y="153" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Emergency lighting where
                </text>
                <text x="502" y="166" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  natural light insufficient
                </text>
                <text
                  x="502"
                  y="178"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Direct lighting requirement
                </text>
              </g>
              <g>
                <rect
                  x="602"
                  y="120"
                  width="180"
                  height="62"
                  rx="8"
                  fill="rgba(34,211,238,0.06)"
                  stroke="#22D3EE"
                  strokeWidth="1.4"
                />
                <text
                  x="692"
                  y="138"
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="10"
                  fontWeight="bold"
                >
                  Art 17 — Maintenance
                </text>
                <text x="692" y="153" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  Equipment kept in
                </text>
                <text x="692" y="166" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9">
                  good repair · efficient working
                </text>
                <text
                  x="692"
                  y="178"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  order — competent person
                </text>
              </g>

              {/* Connector arrows downward */}
              <line
                x1="122"
                y1="184"
                x2="122"
                y2="220"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.4"
              />
              <polygon points="122,220 118,212 126,212" fill="rgba(255,255,255,0.55)" />
              <line
                x1="312"
                y1="184"
                x2="312"
                y2="220"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.4"
              />
              <polygon points="312,220 308,212 316,212" fill="rgba(255,255,255,0.55)" />
              <line
                x1="502"
                y1="184"
                x2="502"
                y2="220"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.4"
              />
              <polygon points="502,220 498,212 506,212" fill="rgba(255,255,255,0.55)" />
              <line
                x1="692"
                y1="184"
                x2="692"
                y2="220"
                stroke="rgba(255,255,255,0.35)"
                strokeWidth="1.4"
              />
              <polygon points="692,220 688,212 696,212" fill="rgba(255,255,255,0.55)" />

              {/* Standards layer */}
              <rect
                x="20"
                y="226"
                width="780"
                height="116"
                rx="10"
                fill="rgba(34,197,94,0.05)"
                stroke="#22C55E"
                strokeWidth="1.6"
              />
              <text
                x="410"
                y="246"
                textAnchor="middle"
                fill="#22C55E"
                fontSize="11"
                fontWeight="bold"
              >
                TECHNICAL STANDARDS · the engineering route to compliance
              </text>

              <g>
                <rect
                  x="40"
                  y="256"
                  width="240"
                  height="76"
                  rx="8"
                  fill="rgba(34,197,94,0.05)"
                  stroke="rgba(34,197,94,0.5)"
                  strokeWidth="1.2"
                />
                <text
                  x="160"
                  y="272"
                  textAnchor="middle"
                  fill="#86EFAC"
                  fontSize="10"
                  fontWeight="bold"
                >
                  BS 5266-1:2025
                </text>
                <text
                  x="160"
                  y="286"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.72)"
                  fontSize="9"
                >
                  UK Code of Practice — design,
                </text>
                <text
                  x="160"
                  y="299"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.72)"
                  fontSize="9"
                >
                  install, commission, maintain,
                </text>
                <text
                  x="160"
                  y="312"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.72)"
                  fontSize="9"
                >
                  verify (incl. 5-yr photometric)
                </text>
                <text
                  x="160"
                  y="325"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Effective 31 Oct 2025
                </text>
              </g>
              <g>
                <rect
                  x="290"
                  y="256"
                  width="240"
                  height="76"
                  rx="8"
                  fill="rgba(34,197,94,0.05)"
                  stroke="rgba(34,197,94,0.5)"
                  strokeWidth="1.2"
                />
                <text
                  x="410"
                  y="272"
                  textAnchor="middle"
                  fill="#86EFAC"
                  fontSize="10"
                  fontWeight="bold"
                >
                  BS EN 1838:2024
                </text>
                <text
                  x="410"
                  y="286"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.72)"
                  fontSize="9"
                >
                  Lighting applications —
                </text>
                <text
                  x="410"
                  y="299"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.72)"
                  fontSize="9"
                >
                  illuminance levels (1 lx, 0.5 lx,
                </text>
                <text
                  x="410"
                  y="312"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.72)"
                  fontSize="9"
                >
                  15 lx) + 2024 full-width rule
                </text>
                <text
                  x="410"
                  y="325"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  Local-area lighting (NEW)
                </text>
              </g>
              <g>
                <rect
                  x="540"
                  y="256"
                  width="240"
                  height="76"
                  rx="8"
                  fill="rgba(34,197,94,0.05)"
                  stroke="rgba(34,197,94,0.5)"
                  strokeWidth="1.2"
                />
                <text
                  x="660"
                  y="272"
                  textAnchor="middle"
                  fill="#86EFAC"
                  fontSize="10"
                  fontWeight="bold"
                >
                  BS EN 50172:2024
                </text>
                <text
                  x="660"
                  y="286"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.72)"
                  fontSize="9"
                >
                  Emergency escape lighting
                </text>
                <text
                  x="660"
                  y="299"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.72)"
                  fontSize="9"
                >
                  systems — testing regime
                </text>
                <text
                  x="660"
                  y="312"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.72)"
                  fontSize="9"
                >
                  (daily / monthly / annual)
                </text>
                <text
                  x="660"
                  y="325"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.55)"
                  fontSize="9"
                >
                  + 5-year photometric (2024)
                </text>
              </g>

              {/* Sanction strip — separated from standards layer */}
              <rect
                x="20"
                y="356"
                width="780"
                height="48"
                rx="8"
                fill="rgba(239,68,68,0.06)"
                stroke="rgba(239,68,68,0.4)"
                strokeWidth="1.4"
              />
              <text
                x="410"
                y="376"
                textAnchor="middle"
                fill="#EF4444"
                fontSize="11"
                fontWeight="bold"
              >
                ⚠ SANCTION · RRO Article 32
              </text>
              <text
                x="410"
                y="392"
                textAnchor="middle"
                fill="rgba(255,255,255,0.65)"
                fontSize="9.5"
              >
                Tier 1 summary fine · Tier 2 unlimited fine + custodial up to 2 years · Officer
                personal liability under Art 32(8)
              </text>
            </svg>
          </div>

          <SectionRule />

          <ContentEyebrow>The Regulatory Reform (Fire Safety) Order 2005 — duties</ContentEyebrow>

          <ConceptBlock
            title="Who is the responsible person?"
            plainEnglish="The RRO 2005 puts the legal duty on a defined role: the 'responsible person'. In a workplace this is typically the employer (in respect of premises under their control). Where premises are not a workplace, it is the person with control of the premises in connection with their trade, business or other undertaking; failing that, the owner. In multi-occupied buildings, several responsible persons may exist for different parts and must cooperate."
            onSite="On site, identify who fits the legal definition before quoting work. The contract for installation goes to a competent contractor — but the legal duty stays with the responsible person. Drafting the documentation, the certificate, and the maintenance regime so the responsible person can demonstrate compliance is part of the deliverable."
          >
            <p>RRO Article 3 sets out the definition. Article 3(1) makes the responsible person:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                In relation to a workplace — <strong>the employer</strong>, if the workplace is to
                any extent under the employer's control.
              </li>
              <li>
                In relation to any premises not falling within paragraph (a) above —{' '}
                <strong>the person who has control of the premises</strong> (as occupier or
                otherwise) in connection with the carrying on by them of a trade, business or other
                undertaking (for profit or not); or, if there is no such person,{' '}
                <strong>the owner</strong>.
              </li>
            </ul>
            <p>
              Two practical consequences. First, the duty is real and personal — directors, partners
              and senior managers can find themselves named in proceedings under Art 32(8) where the
              corporate failure was due to their consent, connivance or neglect. Second, multiple
              responsible persons can co-exist within one building (an HMO with communal landlord
              plus individual tenants; a shopping centre with the centre landlord plus each unit
              operator) and must cooperate (Art 22).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 · Article 14 (Emergency routes and exits)"
            clause={
              <>
                Where necessary in order to safeguard the safety of relevant persons, the
                responsible person must ensure that — (a) emergency routes and exits are kept clear
                at all times; (b) the routes and exits lead as directly as possible to a place of
                safety; (h){' '}
                <strong>
                  emergency routes and exits requiring illumination are provided with emergency
                  lighting of adequate intensity
                </strong>{' '}
                in case the lighting fails.
              </>
            }
            meaning="Article 14(2)(h) is the explicit emergency-lighting hook. 'Where necessary' is determined by the Article 9 risk assessment. 'Adequate intensity' is delivered through the technical standards (BS 5266-1:2025 + BS EN 1838:2024). The duty is on the responsible person; the technical standards are the delivery vehicle."
          />

          <ConceptBlock
            title="Article 17 — maintenance"
            plainEnglish="Once installed, the system has to keep working. Article 17 requires the responsible person to ensure that the premises and any facilities, equipment and devices provided in respect of those premises (including emergency lighting) are subject to a suitable system of maintenance and are kept in efficient working order and good repair. This is the legal hook for the BS EN 50172:2024 testing regime — daily visual checks of central battery indicators, monthly functional tests, annual 3-hour discharge tests, and the new 5-year photometric verification."
          >
            <p>The maintenance chain Article 17 implies:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Competent person.</strong> The maintenance must be carried out by a person
                competent to do it. For emergency lighting, that means a person with the electrical
                and EL-specific training to operate the test facilities, interpret discharge
                readings, identify and rectify faults, and (for the photometric survey) operate a
                calibrated luxmeter against the BS EN 1838 levels.
              </li>
              <li>
                <strong>Documented regime.</strong> Tests carried out, dates, results, defects
                found, defects rectified, signature, identity of tester. The log book per BS EN
                50172:2024 §6 is the legal record. A clean log is part of the responsible person's
                defence.
              </li>
              <li>
                <strong>Action on defects.</strong> Article 17 requires "efficient working order and
                good repair". A defect identified by a test that is not rectified breaks the duty.
                The defect, the date identified, the date rectified, and the corrective action all
                go into the log.
              </li>
              <li>
                <strong>Periodic re-verification.</strong> The system that worked at commissioning
                may not work after 10 years of lumen depreciation, dirt, decoration changes, and
                room layout shifts. The 5-year photometric survey (NEW in 2025) is the periodic
                re-verification that closes the gap between annual functional checks and actual site
                illuminance.
              </li>
            </ul>
            <p>
              Together, Articles 9, 11, 14, 17 and 32 form the legal architecture. Article 9 tells
              the responsible person to assess; Article 11 tells them to plan, organise and monitor;
              Article 14 tells them to provide emergency lighting; Article 17 tells them to maintain
              it; Article 32 tells them what happens if they don't. The technical standards fill in
              the engineering detail.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 · Article 32 (Offences)"
            clause={
              <>
                It is an offence for any responsible person or any other person mentioned in article
                5(3) to — (a) fail to comply with any requirement or prohibition imposed by articles
                8 to 22 and 38 (other than article 9(7)) where that failure places one or more
                relevant persons at risk of death or serious injury in case of fire. A person guilty
                of an offence under paragraph (1) is liable — (a) on summary conviction, to a fine;
                (b) on conviction on indictment, to a fine, or to imprisonment for a term not
                exceeding two years, or to both.
              </>
            }
            meaning="Article 32 is the criminal sanction. Tier-1 (general failures) is summary; Tier-2 (failures placing relevant persons at risk of death or serious injury) carries unlimited fine on indictment plus up to 2 years' custodial. Article 32(8) extends personal liability to officers of bodies corporate where the failure was due to their consent, connivance or neglect. This is not a regulatory comfort blanket — it is criminal law."
          />

          <Scenario
            title="The contractor who 'discharged the duty' — and the prosecution that followed"
            situation="A retail premises engages a competent contractor to install and maintain emergency lighting under a 5-year service contract. After year 3, the contractor is acquired, the contract is novated to a new entity, and the maintenance visits drift from quarterly to annual. The premises owner (a small business, with the owner as sole director) signs the new service papers without inspecting the maintenance log. After two further years a faulty fitting causes a small fire and the retail unit must evacuate. Two staff and one customer are injured during the evacuation because the emergency lighting failed to operate on the rear escape route. The fire and rescue authority opens an RRO investigation."
            whatToDo="Recognise that under RRO Art 32 the responsible person — the owner-director — is the one prosecuted. The defence that 'we engaged a contractor' is at best a mitigation, not a complete answer. The owner must show: (a) competent appointment, (b) clear scope of work covering the BS EN 50172:2024 testing regime, (c) evidence of monitoring (Art 11) — review of test logs, response to defects, periodic re-verification, (d) action on the photometric survey (now required at 5-year intervals under BS 5266-1:2025), (e) documentation that survives evidential review. Without those, the contractor engagement does not insulate the responsible person."
            whyItMatters="This is the most-misunderstood feature of the RRO regime. Engaging a contractor does not transfer the legal duty. It supports compliance — but only if the responsible person actively monitors and documents. As an EL contractor, you make your client's compliance defensible by giving them the records, the survey reports, and the fault-rectification chain that demonstrate Article 11 monitoring. That is part of the deliverable, not optional paperwork."
          />

          <CommonMistake
            title="Treating the RRO as guidance rather than statute"
            whatHappens="The contractor and the responsible person both treat the RRO 2005 as 'best practice that the local fire officer might enforce if they happen to inspect'. Maintenance lapses, the photometric survey is skipped because 'the kit looks fine'. A subsequent incident triggers an RRO investigation. The responsible person discovers, too late, that the RRO is criminal-statute and that 'the fire officer hasn't been round' is not a defence."
            doInstead="Treat the RRO as the criminal-law floor for fire safety in your client\'s premises. Treat BS 5266-1:2025 as the engineering route to demonstrating you met that floor. Document everything; the documentation is what survives a prosecution. Make sure your client knows that engaging you does not transfer their duty; they must monitor and act on what you report."
          />

          <CommonMistake
            title="Confusing the 5-employee record threshold with the duty itself"
            whatHappens="A small business with 4 employees concludes that 'we don\'t need to do a fire risk assessment because we have under 5 employees'. They have no documented assessment and no emergency lighting. After an incident, the prosecution shows that the substantive Article 9 duty applies regardless of headcount; only the requirement to RECORD it in writing is relaxed below 5 employees. The defendant has neither done the assessment nor documented the assessment they didn\'t do."
            doInstead="Read Article 9 carefully. Every premises in scope must have a suitable and sufficient assessment. Below 5 employees the documentation requirement is reduced (not eliminated — many enforcing authorities still expect a written record). The substantive duty — assess the risk, provide emergency lighting where needed — is the same at 4 employees as at 400."
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
            Workplace Regulations 1992, HSAW 1974, and Approved Document B
          </ContentEyebrow>

          <ConceptBlock
            title="Workplace (Health, Safety and Welfare) Regulations 1992 Reg 8"
            plainEnglish="Reg 8 of the 1992 Workplace Regulations is the parallel duty in the workplace context. The text is short: where workers are particularly exposed to danger in the event of failure of artificial lighting, the workplace must be provided with emergency lighting. The trigger is risk-based — the workplace's character — not size. A small basement plant room with no daylight is in scope; a glass-walled office at street level with daytime-only operation may not be."
          >
            <p>The Reg 8 logic chain:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Workplace.</strong> "Premises" plus all workplaces that an employer makes
                available to a worker. Includes corridors, stairs, plant rooms, service areas as
                well as the working zones themselves.
              </li>
              <li>
                <strong>Particularly exposed to danger.</strong> The risk test. Operating machinery,
                working at height, working with hazardous substances, working alone without
                fixed-link communications — all candidates. The test is whether sudden lighting
                failure creates a real safety risk as distinct from inconvenience.
              </li>
              <li>
                <strong>In the event of failure of artificial lighting.</strong> The contemplated
                event is mains failure of the artificial lighting that the workplace depends on.
                Daylight-only premises with no artificial lighting in the working hours are outside
                the trigger; premises with daylight that are also used outside daylight hours are
                inside.
              </li>
              <li>
                <strong>Suitable and sufficient.</strong> The level and duration must be appropriate
                to the risk. A small office: minimal escape lighting may be sufficient. A printing
                press: high-risk task lighting is needed so the press can be safely shut down. The
                Reg 8 duty links to BS 5266-1:2025 as the technical delivery route.
              </li>
            </ul>
            <p>
              Reg 8 does NOT have a 5-employee threshold. It applies to every workplace within scope
              of the Regulations. The MHSWR 1999 5-employee record threshold relates only to the
              requirement that the risk assessment is written down, not to the substantive duties.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Health and Safety at Work etc Act 1974 — the general duty"
            plainEnglish="The HSAW Act 1974 is the underlying statute. Section 2 imposes a general duty on employers to ensure, so far as is reasonably practicable, the health, safety and welfare at work of all employees. Section 3 extends that duty to non-employees affected by the work. A workplace where lighting failure could injure an employee or visitor is one where the HSAW general duty requires action; emergency lighting is the engineered control."
          >
            <p>HSAW relevance to emergency lighting:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Section 2.</strong> General duty to employees — health, safety and welfare
                so far as is reasonably practicable. Where lighting failure creates a workplace
                risk, providing emergency lighting is reasonably practicable in almost all premises.
              </li>
              <li>
                <strong>Section 3.</strong> Duty to non-employees — visitors, contractors, members
                of the public. Important in retail, hospitality, healthcare, education — where the
                people at risk are not on the employer's payroll.
              </li>
              <li>
                <strong>Section 7.</strong> Duty on employees — a separate stream. Employees must
                cooperate with the employer to enable compliance. Includes responding to emergency
                lighting test arrangements, not blocking luminaires with stock, reporting defects.
              </li>
              <li>
                <strong>Sections 33 / 36 / 37.</strong> Offences and penalties. Body-corporate
                liability, individual director liability for failures attributable to consent,
                connivance or neglect. Mirrors RRO Art 32(8) at the HSAW general-duty level.
              </li>
            </ul>
            <p>
              In practice an emergency-lighting compliance failure typically attracts charges under
              the RRO (which is the specific fire-safety statute) rather than HSAW (the general
              duty). But HSAW operates in parallel. A failure at scale may attract charges under
              both regimes.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="Approved Document B Volume 2 (2019, with 2020 / 2022 amendments) · Clause 5 (Emergency escape lighting)"
            clause={
              <>
                Escape routes should have lighting which provides illumination of suitable
                intensity, considered against the risks identified. Areas listed in Table 5.1 should
                have emergency escape lighting, including (a) escape routes through internal
                corridors and staircases, (b) underground or windowless accommodation, (c) places of
                assembly, (d) parts of premises used for sleeping accommodation, (e) escape routes
                serving high-risk areas. Emergency lighting should comply with BS 5266-1.
              </>
            }
            meaning="Approved Document B is statutory guidance under the Building Regulations — it is the practical means of compliance for new build and material alteration. Cl. 5 provides the starter checklist of premises that need emergency lighting. Adopting BS 5266-1 satisfies the technical performance criteria. The list is not exhaustive — the risk assessment may identify other areas that need it."
          />

          <ConceptBlock
            title="Approved Document B as the design checklist"
            plainEnglish="When you walk a new premises and ask 'where do I need emergency lighting?', start with Approved Document B Volume 2 cl. 5. The document gives you the standard list of premises types and locations that need EL by default. Then layer the risk assessment on top — areas not on the list but identified in the risk assessment. Then layer BS 5266-1:2025 design rules — illuminance levels, location at hazards, signage."
          >
            <p>Approved Document B Vol 2 cl. 5 list (paraphrased — read original for detail):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Escape routes through internal corridors &gt; 30 m, including the connections
                between corridors and stair enclosures.
              </li>
              <li>
                Escape staircases — particularly where they have no natural daylight or are below
                ground level.
              </li>
              <li>
                Underground or windowless accommodation, including basements used for working,
                storage, plant or assembly.
              </li>
              <li>
                Places of assembly — auditoria, theatres, cinemas, dance halls, function rooms,
                large public areas. Open-area / anti-panic lighting typically required.
              </li>
              <li>
                Sleeping accommodation — hotels, hostels, halls of residence, care homes, hospitals.
                Often longer duration / different colour temperature considerations.
              </li>
              <li>
                Escape routes serving high-risk areas — the route from the high-risk task area to
                the place of safety. High-risk task lighting at the workstation; escape route
                lighting on the egress path; anti-panic in any open area passed through.
              </li>
              <li>
                Lift cars (cross-reference BS EN 81-20 / 81-50) — for occupant trapped in a lift
                during mains failure to be reassured, see the controls, and be located by the rescue
                team.
              </li>
              <li>
                Toilets / sanitary rooms above a certain size (typically &gt; 8 m²) or where the
                escape route involves multiple turns.
              </li>
              <li>
                Plant rooms and switchgear rooms — for safe egress and for emergency intervention by
                an attending engineer.
              </li>
            </ul>
            <p>
              The list is the starter checklist, not the entire job. The risk assessment may
              identify other rooms — a workshop with overhead crane, a chemical store, a datacentre
              rack room — where the local circumstances put EL on the list even though Approved
              Document B does not explicitly mention them.
            </p>
          </ConceptBlock>

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>BS 5266-1:2025 — what it is, what changed</ContentEyebrow>

          <ConceptBlock
            title="The standard's status and structure"
            plainEnglish="BS 5266-1:2025 is the British Standard 'Code of Practice for emergency escape lighting'. It is the principal UK technical document for designing, installing, commissioning, operating and maintaining emergency lighting. As a Code of Practice, it is recommendatory rather than statutory; following it is the standard route to demonstrating that statutory duties (RRO, Workplace Regulations, HSAW) have been met. Departing from it requires an alternative method that delivers an equivalent or better outcome — and you will be asked to defend the departure."
            onSite="On site, treat the standard as the engineering brief. The legal duty defines the goal; BS 5266-1 defines a known-safe path to the goal. Departure from the path is allowed but the burden of justification is on you. The 2025 edition supersedes 2016 with effect from 31 October 2025."
          >
            <p>The standard's structure (current 2025 edition):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Section 1 — Scope.</strong> Covers escape lighting (escape route +
                anti-panic + high-risk task), local-area lighting, AND standby lighting. Borrowed
                light is excluded as a source of design provision.
              </li>
              <li>
                <strong>Section 2 — Normative references.</strong> Calls up BS EN 1838:2024 for
                illuminance levels, BS EN 50172:2024 for system requirements and testing, BS EN
                50171 for central power supplies, BS EN 60598-2-22 for luminaire product standard,
                BS 7671 for the electrical installation.
              </li>
              <li>
                <strong>Section 3 — Terms and definitions.</strong> Critical terms — escape route,
                open area, high-risk task area, local area, standby lighting, points of emphasis,
                contour limits, maintained / non-maintained / sustained luminaires.
              </li>
              <li>
                <strong>Section 4 — General principles.</strong> Function (the four purposes above),
                system architecture (self-contained / central battery / hybrid), design approach
                (risk-driven), durations.
              </li>
              <li>
                <strong>Section 5 — Design.</strong> Calculation methods, points of emphasis (at
                each exit, change of direction, intersection of corridors, every staircase, outside
                each final exit, near each fire alarm call point and firefighting equipment, near
                first-aid post, change of floor level), illuminance distribution rules.
              </li>
              <li>
                <strong>Section 6 — Wiring and electrical supplies.</strong> NEW in 2025: high-risk
                area segmentation requirement (≥2 separate circuits, ≤20 luminaires per fault).
                Cross-reference to BS 7671 §560.
              </li>
              <li>
                <strong>Section 7 — Installation, commissioning, certification.</strong>{' '}
                Documentation pack — design certificate, installation certificate, commissioning
                certificate, photometric survey at handover.
              </li>
              <li>
                <strong>Section 8 — Inspection, servicing, testing.</strong> Aligns with BS EN
                50172:2024 — daily visual checks (central battery), monthly functional tests, annual
                full-duration tests, NEW 5-year photometric verification.
              </li>
              <li>
                <strong>Annexes.</strong> Sample log book, design worked examples, test record
                templates, special premises (cinemas, hospitals, education).
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The four big 2025 changes"
            plainEnglish="If you only remember four things about BS 5266-1:2025 vs the 2016 edition, remember these. They are the changes that drive design briefs, contract scopes, and the most common audit findings."
          >
            <p>The 2025 changes that matter most in practice:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Scope expansion.</strong> The standard now explicitly covers escape +
                local-area + standby lighting. Designs that addressed only escape lighting under the
                2016 edition may be deficient in 2025 if the premises has spaces that need
                local-area or standby coverage (care home bedrooms; hospital wards; operating
                theatres; broadcast studios; data-centre racks during fail-over).
              </li>
              <li>
                <strong>Borrowed-light exclusion.</strong> Light spilling in from an adjacent space
                no longer counts as design provision. Every space needing emergency lighting must be
                illuminated directly. Designs that previously relied on lobbies being lit by spill
                from the corridor, or stair-half-landings being lit by spill from the upper landing,
                must now provide their own dedicated luminaires.
              </li>
              <li>
                <strong>5-year photometric verification.</strong> NEW periodic check. Every five
                years a calibrated luxmeter survey verifies that actual measured illuminance on the
                escape route, in open areas, and at high-risk points still meets the BS EN 1838:2024
                levels. Catches lumen depreciation, dirt, decoration changes, and layout changes
                that an annual functional test cannot detect.
              </li>
              <li>
                <strong>High-risk area segmentation.</strong> NEW rule. Emergency luminaires in
                high-risk areas must be split across at least 2 separate circuits, each
                fault-isolated to ≤ 20 luminaires. A single circuit fault cannot disable the
                emergency provision in a hazardous area at the moment it is needed.
              </li>
            </ol>
            <p>
              Other 2025 changes — clarified handover documentation, refined illuminance calculation
              methodology, updated cross-references to BS EN 1838:2024 and BS EN 50172:2024,
              expanded annex on special premises — are also worth reading, but the four above are
              the ones that change design briefs and contract scopes.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5266-1:2025 · Clause 8.3 (Periodic verification) — NEW"
            clause={
              <>
                In addition to the periodic inspection and testing routine specified in clause 8.2,
                the photometric performance of the installation should be verified at intervals not
                exceeding five years. The verification should establish that the measured
                illuminance at the points of emphasis, across the full width of the escape route
                (within the BS EN 1838:2024 non-excluded boundary), across the open areas, and at
                the high-risk task points, is not less than the values specified in BS EN 1838:2024.
                Records should be retained for a minimum of five years.
              </>
            }
            meaning="Annual functional discharge tests prove the system runs for 3 hours; they do not prove the floor is illuminated to the required level. The 2025 5-year photometric survey closes that gap. It is the engineering check that matches the legal expectation under RRO Art 17 ('efficient working order'). Schedule it; budget for it; document it."
          />

          <Scenario
            title="The 2016 design that fails its first 2025 photometric survey"
            situation="An office block was fitted out in 2018 to a BS 5266-1:2016 design. The corridor escape route is illuminated by self-contained 8 W LED luminaires spaced at 9 m centres on the centre line. Annual discharge tests have always passed; 3-hour duration met. In 2026 the responsible person commissions the new 5-year photometric survey under BS 5266-1:2025. The luxmeter readings on the escape-route centre line average 0.7 lx, with localised dips to 0.4 lx near the lift lobby. The threshold is 1 lx."
            whatToDo="The system fails the photometric survey. Likely causes: (a) lumen depreciation — 7-year-old LEDs at end of useful life; (b) dirt accumulation on luminaire diffusers; (c) the lift lobby was redecorated in 2024 with darker walls reducing reflectance. Remediation in priority order: clean the diffusers (cheap, immediate), test again. If still failing, replace the LED modules with current-efficacy product, retest. If still failing in the lobby, add a luminaire at the dip. Document the survey fail, the remediation, and the post-remediation re-survey. The premises is non-compliant from the date of the survey to the date of remediation; rectify promptly and record the gap."
            whyItMatters="The 5-year photometric survey is the new audit point. A premises that passes annual discharge but fails the photometric survey is exposed: legally non-compliant (Art 17 efficient working order), insurance position weakened, and any incident during the gap window will be expensive. The new survey is also the new opportunity for the contractor — every existing system needs re-verification at year 5; existing systems pre-2025 have never had it. There is a substantial body of work in this transition."
          />

          <CommonMistake
            title="Using 'borrowed light' to economise on luminaire count"
            whatHappens="A 2024 design for a small office block places escape-route luminaires only in the corridors and final-exit lobbies. The stair-half-landings are 'lit by spill from the corridor' through the open stair entry. The 2025 edition is then adopted before commissioning. The design now fails — borrowed light is excluded as design provision. The half-landings need their own luminaires. Re-design and additional installation costs to be absorbed because the design was issued under transitional conditions."
            doInstead="From 31 October 2025 onwards, design every space that needs emergency lighting with its own dedicated luminaires. No reliance on spill from adjacent spaces. The 'no borrowed light' rule is not optional; it is built into the standard's scope. Designs previously issued under the 2016 edition need re-checking against the 2025 rule before installation."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Penalties, insurance, and civil liability</ContentEyebrow>

          <ConceptBlock
            title="The realistic enforcement picture"
            plainEnglish="The RRO regime is enforced by the local fire and rescue authority. Their toolkit runs from informal advice up to criminal prosecution. The realistic exposure for a non-compliant emergency-lighting installation depends on what the failure is, who was put at risk, and whether anyone was actually injured."
          >
            <p>The enforcement ladder:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Informal advice.</strong> First contact often a routine inspection
                identifying defects. The responsible person is given a list and a reasonable
                timeframe. Most premises rectify and the matter ends.
              </li>
              <li>
                <strong>Enforcement notice (RRO Art 30).</strong> Formal written notice requiring
                specific work within a stated period. Failure to comply is itself an offence.
                Notices are public record and routinely show up in due-diligence searches; insurer
                impact begins here.
              </li>
              <li>
                <strong>Prohibition notice (RRO Art 31).</strong> Serious — restricts or prohibits
                use of premises, in part or whole, until rectification. Issued where the use poses a
                risk so serious it must stop. Commercially devastating; few small businesses survive
                a long prohibition.
              </li>
              <li>
                <strong>Prosecution (RRO Art 32).</strong> Criminal proceedings. Tier-1 (general
                non-compliance) is summary jurisdiction in the magistrates' court — fine. Tier-2
                (failures placing relevant persons at risk of death or serious injury) indictable in
                the Crown Court — unlimited fine, custodial up to 2 years, or both. Officer personal
                liability under Art 32(8) where attributable to consent, connivance or neglect.
              </li>
              <li>
                <strong>Insurer voiding.</strong> Most commercial property insurance requires
                compliance with statute and relevant standards. A documented RRO breach is grounds
                for the insurer to void the policy retroactively or refuse to indemnify on the
                particular claim. The civil consequence of an EL failure can dwarf the criminal
                fine.
              </li>
              <li>
                <strong>Civil liability.</strong> A person injured during evacuation can sue the
                responsible person personally and the body corporate under occupiers' liability /
                negligence. Industry insurers may be involved or excluded depending on the policy
                wording. Settlement values reflect the injury — broken bones, head injuries, smoke
                inhalation, deaths.
              </li>
            </ul>
            <p>
              The cost of compliance is small. The cost of non-compliance, especially after an
              incident, is large and often personal — directors named in proceedings, custodial
              sentences for the worst failures, businesses closed, premises uninsurable for years.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="What insurers expect to see"
            plainEnglish="Underwriters and brokers ask for evidence that the EL system is designed and maintained to current standards. The pack they expect, especially after the 2025 edition takes effect, is well-defined."
          >
            <p>The standard insurance documentation pack for emergency lighting:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Design certificate.</strong> Issued at original design stage by a competent
                designer. States the standard followed (BS 5266-1:2025), the design premise (which
                areas need which category of EL), the luminaire schedule, the durations, and the
                assumptions.
              </li>
              <li>
                <strong>Installation certificate.</strong> Confirms the design was installed as
                specified. Cross-reference to the BS 7671 Electrical Installation Certificate / EICR
                for the supply and final circuits.
              </li>
              <li>
                <strong>Commissioning certificate.</strong> Confirms first full functional and
                duration tests passed. Includes the original photometric survey results — actual
                measured illuminance against BS EN 1838:2024 levels at handover.
              </li>
              <li>
                <strong>Maintenance log book (BS EN 50172:2024 §6).</strong> Daily / monthly /
                annual test records. Defects identified and rectified. Tester identity and
                competence record.
              </li>
              <li>
                <strong>5-year photometric survey records.</strong> NEW. Periodic re-verification
                proving the system still delivers BS EN 1838 levels.
              </li>
              <li>
                <strong>Risk assessment (RRO Art 9).</strong> Live document showing the responsible
                person's assessment that drove the EL provision in the first place and continues to
                be reviewed.
              </li>
              <li>
                <strong>Competence evidence.</strong> Records that the designer, installer,
                commissioner, and maintenance contractor are competent for emergency lighting work —
                typically certification through an industry body (ICEL, LIA, BAFE) or manufacturer
                training.
              </li>
            </ul>
            <p>
              A compliance pack like this protects the responsible person commercially as well as
              legally. Insurers price risk against documented compliance; absence of documentation
              moves premiums upward and may make cover unavailable in some segments (high-occupancy
              assembly, healthcare).
            </p>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'The legal duty is on the responsible person — employer / owner / occupier / person in control. Engaging a contractor does not transfer the duty.',
              'RRO 2005 is the principal statute. Workplace Regs 1992 Reg 8 is the parallel workplace duty. HSAW 1974 is the underlying general duty. Approved Document B Vol 2 cl. 5 is the Building Regulations route.',
              'BS 5266-1:2025 is the technical standard — Code of Practice. Following it is the standard route to demonstrating compliance with the legal duties.',
              'Four primary purposes: escape lighting, anti-panic / open-area, high-risk task area, standby (NEW in 2025 scope). Local-area lighting recognised by BS EN 1838:2024.',
              '2025 changes: scope expansion (now includes standby + local-area), borrowed light EXCLUDED, 5-year photometric verification REQUIRED, high-risk areas need ≥2 circuits and ≤20 luminaires per fault.',
              "Penalties under RRO Art 32: unlimited fine, up to 2 years' custodial. Officer personal liability under Art 32(8). Insurer voiding plus civil liability layered on top.",
              'The 5-year photometric survey is the new audit point. Annual discharge tests prove the system runs; the photometric survey proves the floor is still illuminated to BS EN 1838 levels.',
              'Documentation is part of compliance. Design / installation / commissioning certificates, log book, risk assessment, photometric records, competence evidence.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'My client says emergency lighting is just "good practice" — is that right?',
                answer:
                  'No. The legal floor is criminal statute — the Regulatory Reform (Fire Safety) Order 2005, supplemented by the Workplace (Health, Safety and Welfare) Regulations 1992 and the HSAW Act 1974. The "good practice" framing is dangerous because it implies the duty is voluntary. It is not. RRO Article 32 is criminal law with unlimited fines and up to 2 years\' custodial.',
              },
              {
                question: 'Are domestic dwellings within the scope of the RRO 2005?',
                answer:
                  'The RRO does not apply to private dwellings used as a single-family home. It DOES apply to communal and shared parts of HMOs (Houses in Multiple Occupation) and blocks of flats — the corridors, stairs and entrance halls outside individual flats. Many modern apartment buildings are within scope through their common parts. Care homes, hostels and similar are workplaces and fully in scope.',
              },
              {
                question:
                  'My client engaged me to install the emergency lighting and pays for monthly maintenance. Have they discharged their duty?',
                answer:
                  'No, although they have done the most important commercial step. The duty stays with the responsible person — RRO Art 5. Engagement of a competent contractor supports compliance but does not transfer it. The responsible person must also monitor the work (Art 11), retain records, act on defects, and ensure the periodic photometric verification (now required at 5-year intervals) happens. Your role as a contractor is to make their compliance defensible by giving them the records they need.',
              },
              {
                question:
                  'BS 5266-1 is a Code of Practice — can I follow a different design method?',
                answer:
                  'Yes — the standard is recommendatory, not statutory — but the burden of justification is on you. If you depart from the standard, you must show that your alternative method delivers an equivalent or better outcome. Insurers, fire risk assessors and prosecutors all start from "did you follow BS 5266-1" and expect a documented engineering case for any departure. In practice it is rarely worth deviating from the published standard.',
              },
              {
                question:
                  'The 2025 edition came in on 31 October 2025. What about systems designed before that under the 2016 edition?',
                answer:
                  "Systems designed and installed under BS 5266-1:2016 remain valid for their compliance demonstration at the time of installation. Periodic verification under the 2025 edition will pick up any gap — for example, a 2016 design relying on borrowed light will fail the 2025 photometric survey because the borrowed source doesn't deliver design illuminance directly. Best practice for retrofits / extensions / re-fits after 31 October 2025 is to design to the 2025 edition. Existing systems are remediated as part of the 5-year photometric verification cycle.",
              },
              {
                question:
                  'Who is liable if a contractor I engaged installs sub-standard EL and someone is injured?',
                answer:
                  "Both, separately. The responsible person is liable under the RRO for the failure of the premises' fire safety provisions (Art 32). The contractor may be liable under HSAW 1974 for failures attributable to their work, in contract for the substandard work, in tort for negligence, and in product liability if the equipment itself was defective. The two streams of liability run in parallel; a settlement on one does not extinguish the other.",
              },
              {
                question:
                  'My client refuses to pay for the 5-year photometric survey because "the lights still work". How do I respond?',
                answer:
                  'Explain the new requirement and the legal hook. BS 5266-1:2025 cl. 8.3 introduces the 5-year photometric verification; RRO Art 17 requires the system to be in efficient working order and the only way to verify that against the BS EN 1838:2024 illuminance levels is the photometric survey. Annual discharge tests prove duration; they do not prove illuminance. Document the conversation. If they still refuse, document that too — the documentation matters if there is later an incident or audit. As contractor you have done your part; the duty is theirs.',
              },
              {
                question:
                  'Do I need a separate qualification to design / commission / maintain emergency lighting?',
                answer:
                  'There is no statutory licence in the way there is for, say, gas safe registration. Competence is required (RRO Art 18; HSAW), and competence is typically demonstrated through industry certification — ICEL Approved Contractor for installation, LIA membership for design, BAFE SP203 for fire safety contractors generally, manufacturer-specific training for proprietary central battery and emergency lighting systems. Insurers and large clients increasingly require ICEL or BAFE registration as a prerequisite for engagement.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz
            title="Purpose and legal framework — Emergency Lighting Module 1.1"
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
                navigate('/electrician/upskilling/emergency-lighting-module-1-section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.2 Locations where required
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

export default EmergencyLightingModule1Section1;
