import { ArrowLeft, ChevronLeft, ChevronRight, Building2 } from 'lucide-react';
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
    id: 'fam1-s2-purpose',
    question: 'What is the primary objective of a Category P system under BS 5839-1:2025?',
    options: [
      'Life safety through early warning for evacuation.',
      'Manual activation only.',
      'Property protection — minimising loss to the building, its fabric, contents, processes or business operations through early automatic detection of fire. Life safety is, at most, an incidental benefit; the design is driven by what loss the responsible person is trying to prevent. The fire risk assessment may identify property protection as a primary objective independently of (or in addition to) any life-safety category.',
      'Smoke control.',
    ],
    correctIndex: 2,
    explanation:
      'P = property. The whole purpose of a P system is to protect property — buildings, contents, business continuity. P1 covers the entire protected building (analogous to L1 in scope but driven by property loss); P2 covers defined high-value or high-risk areas. Insurer requirements often drive the choice; a property insurer can mandate a P category as a condition of cover.',
  },
  {
    id: 'fam1-s2-p1coverage',
    question: 'What does a Category P1 system cover under BS 5839-1:2025?',
    options: [
      'Defined high-value areas only.',
      'Manual call points only.',
      'Escape routes only.',
      'Automatic detection throughout the protected building, with limited exceptions equivalent to those allowed in L1 (small bathrooms, sanitary accommodation, small voids meeting dimensional limits). The objective is comprehensive property protection — earliest possible detection of fire anywhere within the building so that intervention (sprinkler activation, fire-service summons, manual response) can begin before significant loss occurs.',
    ],
    correctIndex: 3,
    explanation:
      'P1 is to property what L1 is to life — comprehensive coverage. The exceptions in BS 5839-1:2025 Annex D apply to P1 in the same way they apply to L1. The driver is different (property loss minimisation rather than life safety) but the coverage approach is similar.',
  },
  {
    id: 'fam1-s2-p2',
    question:
      'A small manufacturing site has a single high-value plant room, a server room and a chemical store within a much larger general workshop. The fire strategy specifies P2 coverage. What does P2 require?',
    options: [
      'Detection throughout.',
      'Detection in the defined high-value / high-risk areas only — in this case the plant room, the server room and the chemical store. The remainder of the building (general workshop) is outside the P2 envelope and is not protected by automatic detection unless a separate L category overlay is specified. P2 is targeted property protection: the designer identifies the areas where loss would be material and protects those, leaving low-value areas without automatic detection.',
      'Manual call points throughout.',
      'Heat detection only.',
    ],
    correctIndex: 1,
    explanation:
      'P2 is targeted by design. The designer (with the responsible person and the insurer) identifies the areas where fire loss would be material and limits the automatic detection to those areas. P2 is therefore a "designed footprint" category — the system documentation must clearly state which areas are within P2 coverage and which are not. P2 alone gives no protection outside the designated areas.',
  },
  {
    id: 'fam1-s2-arc',
    question:
      'BS 5839-1:2025 14.18 specifies the alarm-transmission timing for Category P systems. What is the maximum time from a fire alarm signal until indication is received at the Alarm Receiving Centre (ARC)?',
    options: [
      '60 s.',
      '90 s (the figure for Category L systems per 14.17).',
      '120 s — the indication must be received at the ARC within a maximum of 120 seconds for a Category P system. A catastrophic transmission failure (no signals can be transmitted at all) should be indicated at the ARC and the CIE within 31 minutes. The 120 s figure is more relaxed than the L-category 90 s because the consequence of delay differs: in P, delay extends property loss; in L, delay extends time to evacuation.',
      '300 s.',
    ],
    correctIndex: 2,
    explanation:
      'BS 5839-1:2025 introduced explicit alarm-transmission timings recognising the move to all-IP networks. Category L systems must hit the ARC within 90 s (14.17); Category P within 120 s (14.18). Catastrophic-failure indication must be at the ARC and CIE within 3 min for L and 31 min for P. The split reflects the different urgency profiles of life vs property.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question: 'What does the "P" prefix denote in BS 5839-1:2025 system categorisation?',
    options: [
      'Permanent.',
      'Property — the system is designed primarily to protect property (the building, its contents, its processes and the business it supports) through early automatic detection of fire. The whole design is driven by what loss the responsible person and the property insurer are trying to prevent. Life safety is, at most, an incidental benefit.',
      'Power supply.',
      'Plant room.',
    ],
    correctAnswer: 1,
    explanation:
      '"P" = property. The category exists because some buildings need protection of property even where life-safety risk is low (warehouses, data centres, cultural collections, manufacturing plant). The P category is often selected by reference to insurer requirements rather than to life-safety legislation.',
  },
  {
    id: 2,
    question: 'How does P1 coverage compare to L1 coverage under BS 5839-1:2025?',
    options: [
      'P1 covers only escape routes; L1 covers all areas.',
      'P1 covers all areas of the protected building (subject to the same Annex D exceptions for areas of low fire risk that apply to L1). The coverage extent is similar; the design driver is different — life safety for L1, property protection for P1. A building can have both an L category and a P category overlaid on the same system to address both objectives at once.',
      'P1 is a subset of L1.',
      'They are identical.',
    ],
    correctAnswer: 1,
    explanation:
      'P1 and L1 share the "everywhere" coverage approach. The categories can be combined: for example, a hospital with both life-safety and property objectives may specify L1/P1 (the same physical detector layout serves both purposes; the documentation acknowledges both objectives).',
  },
  {
    id: 3,
    question: 'What is the defining characteristic of a Category P2 system?',
    options: [
      'Detection throughout the building.',
      'Detection in defined high-value or high-risk areas only — the designer (with the responsible person and the insurer) identifies the areas where fire loss would be material and limits automatic detection to those. The remainder of the building has no automatic detection unless a separate L category overlay is specified. P2 is therefore a "designed footprint" category and must be documented clearly.',
      'Manual call points only.',
      'Heat detection throughout.',
    ],
    correctAnswer: 1,
    explanation:
      'P2 is the targeted property-protection category. Typical applications: a server room within a low-risk office building; a plant room within a warehouse; a chemical store within a general factory. Outside the P2 zone, there is no automatic detection from the P2 system itself — separate cover (e.g. L4 escape-route detection) must be specified if needed.',
  },
  {
    id: 4,
    question:
      'BS 5839-1:2025 14.18 sets the maximum time from a fire-alarm signal until indication is received at the Alarm Receiving Centre (ARC) for Category P systems. What is the figure?',
    options: [
      '60 s.',
      '120 s — for Category P systems, the indication should be received at the ARC within 120 s. A catastrophic failure of the transmission system (whereby no alarm signals can be transmitted) should be indicated at the ARC and the CIE within 31 min. The 120 s P figure is more relaxed than the 90 s L figure because the consequence of delay differs (property loss vs evacuation time).',
      '300 s.',
      '600 s.',
    ],
    correctAnswer: 1,
    explanation:
      'The P-system 120 s figure recognises that the urgency of property-protection alarms differs from life-safety alarms. The 31 min catastrophic-failure indication time is also more relaxed than the L-system 3 min figure for the same reason.',
  },
  {
    id: 5,
    question:
      'A property insurer requires a "P1 system with /M" for a museum. What does the /M suffix mean?',
    options: [
      '/M denotes an addressable system.',
      '/M denotes the addition of manual call points to a P system. P1 and P2 do not include MCPs by default (they are property-protection categories with no expectation of human triggering); the /M suffix explicitly adds MCPs to the design. P1/M = full property cover plus MCPs; P2/M = targeted property cover plus MCPs. By contrast, L1, L2, L3 and L4 all include MCPs by default and the /M suffix is not used with those.',
      '/M denotes a manual-only system with no detection.',
      '/M denotes maintenance.',
    ],
    correctAnswer: 1,
    explanation:
      'The /M suffix is used only with categories that do not include MCPs by default — that is, P1, P2 and L5. For L1 / L2 / L3 / L4, MCPs are part of the category and the /M suffix is redundant. /M is also used with M (manual only) but in a reciprocal sense — that category is all-MCP by definition, and /M suffixes appear when extending P or L5 to include MCPs.',
  },
  {
    id: 6,
    question:
      'A Category L1/P2 hybrid is being specified for a hotel with a separate high-value back-of-house catering operation. What does this combination mean?',
    options: [
      'Two separate systems.',
      'A single system designed to deliver L1 life-safety coverage throughout the protected building AND P2 property-protection coverage in the defined catering area. The same physical detectors and panel typically serve both objectives; the documentation states both. Hybrid categories are a recognised way of layering objectives — life safety drives the building-wide cover; property protection drives the targeted catering-area design.',
      'P2 supersedes L1.',
      'L1 supersedes P2.',
    ],
    correctAnswer: 1,
    explanation:
      'Hybrid categorisations (L1/P1, L1/P2, L2/P2, L3/P2, etc.) are widely used because real buildings often have both life-safety and property-protection objectives. The system specification documentation should make both objectives explicit so that the maintenance regime, the alarm-transmission setup, and the variations envelope all reflect both requirements.',
  },
  {
    id: 7,
    question:
      'Where a P category system is installed in a building with sleeping accommodation, BS 5839-1:2025 6 (variations) identifies a specific transmission-related variation as NOT acceptable. Which?',
    options: [
      'Use of an addressable system.',
      'Absence of a facility for transmission of fire alarm signals to an ARC in either supported housing where Grade A is necessary, or a residential care home. The 2025 revision treats this as a variation that is NOT acceptable — the system must include ARC transmission. This is a hard departure from the 2017 edition where this could be agreed as an acceptable variation; under the 2025 rules, the absence of transmission in those settings cannot be agreed away.',
      'Use of multi-sensor detectors.',
      'Use of optical-smoke detectors.',
    ],
    correctAnswer: 1,
    explanation:
      'BS 5839-1:2025 introduces a list of variations that are now considered so detrimental to safety that they cannot be agreed as acceptable. The absence of ARC transmission in sleeping-care contexts (supported housing, residential care homes) is one of those. All variations must now be justified and documented in the system logbook; some variations are simply prohibited.',
  },
  {
    id: 8,
    question:
      'Why is a P category system often specified at the request of the property insurer rather than the building owner?',
    options: [
      'Insurer policy.',
      "Because the property insurer carries the financial risk of fire loss to the building and contents. A P category system reduces that risk by enabling early detection and intervention; insurers therefore have a direct commercial interest in P-grade detection and frequently require it as a condition of cover or as a basis for premium reduction. A building that legally requires only L cover may still receive P cover at the insurer's instigation.",
      'P systems are cheaper.',
      'P systems are simpler.',
    ],
    correctAnswer: 1,
    explanation:
      'The split between life-safety regulation (RRO 2005, Building Regs) and property-protection regulation (essentially commercial — driven by insurer requirements and contract) is the reason P category specifications often come from the insurer. Loss adjusters and risk surveyors employed by insurers routinely specify P-grade detection in commercial property risk assessments.',
  },
  {
    id: 9,
    question:
      'A 2025-design P1 system in a textile warehouse uses optical-smoke detection. The fire risk assessment notes regular dust generation from material handling. What is the design risk?',
    options: [
      'No risk.',
      'False alarms — optical-smoke detectors respond to airborne particles, including dust. A textile warehouse with ongoing dust generation is likely to produce repeated false alarms from optical-smoke heads, undermining confidence in the system and risking management complacency about real alarms. The 2025 revision (clause 33 measures to limit false alarms) recommends multi-sensor detectors as the response in environments where point smoke detection presents an elevated false-alarm risk.',
      'Cost.',
      'Cable selection.',
    ],
    correctAnswer: 1,
    explanation:
      'Dust, steam and aerosols are common false-alarm triggers for optical-smoke detectors. The 2025 revision puts greater emphasis on multi-sensor detectors in such environments. A multi-sensor detector requires multiple stimuli (smoke + heat, smoke + CO) before alarming, which suppresses false alarms in dust-prone areas while preserving real-fire sensitivity.',
  },
  {
    id: 10,
    question:
      'What does BS 5839-1:2025 14.18 specify must be indicated within 31 min for Category P systems?',
    options: [
      'Routine fault.',
      'Catastrophic failure of the transmission system — i.e. a failure mode where no alarm signals can be transmitted at all (loss of all paths). Indication must be received at the ARC and at the CIE within 31 min. For Category L systems the equivalent figure is 3 min (per 14.17). The much longer P figure reflects the proportionate response: property-protection systems have a less urgent need to detect and report a transmission outage than life-safety systems.',
      'Detector test.',
      'Battery low.',
    ],
    correctAnswer: 1,
    explanation:
      'Catastrophic transmission failure is the failure mode where no signal at all can reach the ARC. BS 5839-1:2025 14.17 (L) and 14.18 (P) both require indication at the ARC and at the CIE; the timing differs because the urgency differs. 3 min for L; 31 min for P.',
  },
];

const FireAlarmModule1Section2 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'P category systems — property protection | Fire Alarm Module 1.2 | Elec-Mate',
    description:
      'BS 5839-1:2025 P1 and P2 property-protection fire alarm categories: comprehensive vs targeted cover, /M suffix, hybrid L/P specifications, alarm-transmission timing (14.18), insurer-driven design.',
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
            <ArrowLeft className="h-4 w-4" /> Module 1
          </button>

          <PageHero
            eyebrow="Module 1 · Section 2"
            title="P category systems — property protection"
            description="BS 5839-1:2025 Categories P1 and P2: comprehensive vs targeted property protection, the /M manual-call-point suffix, hybrid L/P specifications, the new alarm-transmission timings (14.17 and 14.18), and how insurer requirements drive the design."
            tone="yellow"
          />

          <TLDR
            points={[
              'P = property. The system protects buildings, contents, processes and business continuity through early automatic detection. Life safety is, at most, an incidental benefit.',
              'P1 — automatic detection THROUGHOUT the protected building (subject to the same Annex D exceptions as L1). Comprehensive property cover.',
              'P2 — automatic detection in defined high-value or high-risk areas only. Targeted property cover. The footprint must be documented.',
              'P1 and P2 do NOT include manual call points by default. Add the /M suffix (P1/M, P2/M) to specify MCPs alongside the property cover.',
              'Hybrid categorisations (L1/P1, L1/P2, L2/P2, L3/P2 etc.) are widely used to layer life-safety and property-protection objectives in a single system.',
              'BS 5839-1:2025 14.18 — alarm transmission to the ARC: indication within 120 s; catastrophic transmission failure indication within 31 min. (Cf 14.17 for L: 90 s and 3 min.)',
              'P category specifications are frequently driven by the property insurer rather than fire-safety legislation. The insurer carries the financial loss risk and therefore has a commercial interest in detection.',
              'BS 5839-1:2025 6 (variations) lists the absence of an ARC-transmission facility in supported housing and residential care homes as a variation that is NOT acceptable — the system must include ARC transmission in those settings.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Distinguish the P category objective (property protection) from the L category objective (life safety) and identify when each is appropriate',
              'Define P1 and P2 coverage under BS 5839-1:2025 and apply the Annex D low-fire-risk exceptions to P1 designs',
              'Apply the /M manual-call-point suffix correctly to P1, P2 and L5 designs (and recognise it is not used with L1, L2, L3 or L4)',
              'Specify hybrid L/P categorisations (L1/P1, L2/P2, L3/P2 etc.) where life-safety and property-protection objectives need to be layered',
              'Apply BS 5839-1:2025 14.18 alarm-transmission timing rules: 120 s indication at ARC, 31 min catastrophic failure indication at ARC and CIE',
              'Recognise the BS 5839-1:2025 6 (variations) prohibitions on absence of ARC transmission in supported housing and residential care homes',
              'Cross-reference BS 7671 Section 560 (safety services) and A4:2026 AFDD provisions in P-grade installations',
              'Use insurer requirements, fire risk assessment and Building Regulations Approved Document B together to drive category selection',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>What "P" means and why a separate category exists</ContentEyebrow>

          <ConceptBlock
            title="The property-protection remit"
            plainEnglish="The P prefix in BS 5839-1:2025 denotes property protection. The whole point of a P category system is to detect fire early so that intervention (sprinkler activation, summons of the fire and rescue service, manual response by trained on-site staff) can begin before significant property loss occurs. The category exists because some buildings need protection of property even where life-safety risk is low or already addressed by separate measures. Examples: a fully-sprinklered warehouse with no overnight occupancy; a data centre with rigorous evacuation procedures but high-value equipment; a museum with valuable irreplaceable contents."
            onSite="When a fire strategy specifies P1 or P2, ask: what is the loss the system is preventing? P1 protects the whole building; P2 protects designated areas. The documentation should state the protected scope explicitly. On commissioning, walk the protected scope and verify detector siting matches the design — and verify that areas outside the P scope are either covered by a separate L category, or explicitly identified as 'unprotected' in the strategy."
          >
            <p>The two P categories:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>P1</strong> — automatic detection throughout the protected building, with
                the same Annex D exceptions for areas of low fire risk that apply to L1.
                Comprehensive cover for the whole building.
              </li>
              <li>
                <strong>P2</strong> — automatic detection in defined high-value or high-risk areas
                only. The footprint is determined by the designer with the responsible person and
                the insurer; the rest of the building has no P-system cover.
              </li>
            </ul>
            <p>
              P1 and P2 do not include manual call points by default. The reasoning: the category is
              designed for unattended detection (out-of-hours warehouses, data centres, lights-out
              manufacturing). Where the responsible person wants MCPs added — typically for
              attended-hours use — the /M suffix is added: P1/M or P2/M. Hybrid categorisations
              (L1/P1, L1/P2, L2/P2 etc.) are also widely used and are covered later in this section.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Categories of system (clause 5)"
            clause={
              <>
                Category P systems are systems intended for the protection of property. They are
                sub-divided as P1 and P2 according to the extent of automatic detection provided.
              </>
            }
            meaning="Two phrases earn close reading. 'Protection of property' — property loss minimisation is the load-bearing objective; life safety is incidental. 'According to the extent of automatic detection' — P1 and P2 differ in coverage extent, much as the L1-L5 family differs along that same axis. The selection of P1 vs P2 IS the coverage decision."
          />

          <SectionRule />

          <ContentEyebrow>P1 — comprehensive property protection</ContentEyebrow>

          <ConceptBlock
            title="P1 — automatic detection throughout"
            plainEnglish="P1 covers the entire protected building with automatic detection. The starting position is 'detector in every area'; specific areas are excluded only where Annex D of BS 5839-1:2025 lists them as eligible exceptions or where the designer can justify that the area is genuinely of low fire risk. The Annex D exceptions for P1 are the same as for L1 — small bathrooms, sanitary accommodation, certain small voids. The fact that the design driver is property loss rather than life safety does not change which rooms can be excluded; the smoke physics and the fire-risk reasoning are identical."
            onSite="A P1 system is a 'detector in every room' design unless an Annex D exception applies. On commissioning, every excluded room should be matched to a written justification in the design pack. If the responsible person wants MCPs alongside, the spec is P1/M and the MCP siting follows the BS 5839-1:2025 manual-call-point distance rules (30 m straight line / 45 m actual travel)."
          >
            <p>P1 selection is appropriate where:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                The building or its contents are high-value (museums, archives, data centres,
                cultural collections, irreplaceable scientific equipment).
              </li>
              <li>
                Business continuity is critical and a fire of any size in any area would interrupt
                operations materially (manufacturing plant, broadcast studios, command centres).
              </li>
              <li>
                The property insurer mandates P1 as a condition of cover or as a basis for premium
                reduction — common in commercial warehouse, manufacturing and retail-distribution
                contexts.
              </li>
              <li>
                The fire strategy concludes that intervention (sprinkler activation, fire service
                summons) needs to begin promptly regardless of where in the building the fire
                starts.
              </li>
            </ul>
            <p>
              P1 is sometimes combined with L cover in a hybrid spec — typically L1/P1 (life and
              property both covered everywhere) or L2/P1 (life-safety on escape routes plus
              high-risk rooms; property cover everywhere). The hybrid means a single physical system
              serves both objectives; the documentation states both.
            </p>
          </ConceptBlock>

          {/* P1 vs P2 coverage diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              P1 vs P2 — comprehensive vs targeted property protection
            </h4>
            <svg
              viewBox="0 0 820 400"
              className="w-full h-auto"
              role="img"
              aria-label="Comparison of P1 and P2 coverage. P1 protects the entire building with automatic detection. P2 protects only defined high-value or high-risk areas with the rest of the building having no P-system cover."
            >
              <text
                x="410"
                y="24"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="12"
                fontWeight="bold"
              >
                P1 covers the whole building · P2 covers designated areas only
              </text>

              <g>
                <rect
                  x="40"
                  y="60"
                  width="340"
                  height="220"
                  rx="10"
                  fill="rgba(34,197,94,0.06)"
                  stroke="#22C55E"
                  strokeWidth="1.8"
                />
                <text
                  x="210"
                  y="84"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="13"
                  fontWeight="bold"
                >
                  P1 — full coverage
                </text>
                <text
                  x="210"
                  y="100"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9.5"
                >
                  Automatic detection throughout (Annex D exceptions only)
                </text>

                <line
                  x1="148"
                  y1="115"
                  x2="148"
                  y2="270"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.8"
                />
                <line
                  x1="270"
                  y1="115"
                  x2="270"
                  y2="270"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.8"
                />
                <line
                  x1="50"
                  y1="170"
                  x2="370"
                  y2="170"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.8"
                />
                <line
                  x1="50"
                  y1="220"
                  x2="370"
                  y2="220"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.8"
                />

                <circle cx="100" cy="140" r="5" fill="#22C55E" />
                <circle cx="210" cy="140" r="5" fill="#22C55E" />
                <circle cx="320" cy="140" r="5" fill="#22C55E" />
                <circle cx="100" cy="195" r="5" fill="#22C55E" />
                <circle cx="210" cy="195" r="5" fill="#22C55E" />
                <circle cx="320" cy="195" r="5" fill="#22C55E" />
                <circle cx="100" cy="245" r="5" fill="#22C55E" />
                <circle cx="210" cy="245" r="5" fill="#22C55E" />
                <circle cx="320" cy="245" r="5" fill="#22C55E" />

                <text
                  x="210"
                  y="290"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="9.5"
                >
                  Driver — property loss in any area would be material
                </text>
              </g>

              <g>
                <rect
                  x="440"
                  y="60"
                  width="340"
                  height="220"
                  rx="10"
                  fill="rgba(168,85,247,0.06)"
                  stroke="#A855F7"
                  strokeWidth="1.8"
                />
                <text
                  x="610"
                  y="84"
                  textAnchor="middle"
                  fill="#A855F7"
                  fontSize="13"
                  fontWeight="bold"
                >
                  P2 — designated areas only
                </text>
                <text
                  x="610"
                  y="100"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9.5"
                >
                  Automatic detection only in defined high-value zones
                </text>

                <line
                  x1="548"
                  y1="115"
                  x2="548"
                  y2="270"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.8"
                />
                <line
                  x1="670"
                  y1="115"
                  x2="670"
                  y2="270"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.8"
                />
                <line
                  x1="450"
                  y1="170"
                  x2="770"
                  y2="170"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.8"
                />
                <line
                  x1="450"
                  y1="220"
                  x2="770"
                  y2="220"
                  stroke="rgba(255,255,255,0.15)"
                  strokeWidth="0.8"
                />

                <rect
                  x="455"
                  y="120"
                  width="88"
                  height="46"
                  rx="4"
                  fill="rgba(168,85,247,0.18)"
                  stroke="rgba(168,85,247,0.7)"
                  strokeWidth="1.4"
                  strokeDasharray="4,3"
                />
                <text
                  x="499"
                  y="144"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="9"
                  fontWeight="bold"
                >
                  SERVER
                </text>
                <circle cx="499" cy="156" r="5" fill="#A855F7" />

                <rect
                  x="675"
                  y="120"
                  width="88"
                  height="46"
                  rx="4"
                  fill="rgba(168,85,247,0.18)"
                  stroke="rgba(168,85,247,0.7)"
                  strokeWidth="1.4"
                  strokeDasharray="4,3"
                />
                <text
                  x="719"
                  y="144"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="9"
                  fontWeight="bold"
                >
                  PLANT
                </text>
                <circle cx="719" cy="156" r="5" fill="#A855F7" />

                <rect
                  x="565"
                  y="225"
                  width="88"
                  height="42"
                  rx="4"
                  fill="rgba(168,85,247,0.18)"
                  stroke="rgba(168,85,247,0.7)"
                  strokeWidth="1.4"
                  strokeDasharray="4,3"
                />
                <text
                  x="609"
                  y="248"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.85)"
                  fontSize="9"
                  fontWeight="bold"
                >
                  STORE
                </text>
                <circle cx="609" cy="258" r="5" fill="#A855F7" />

                <text
                  x="610"
                  y="160"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.35)"
                  fontSize="11"
                >
                  no det.
                </text>
                <text
                  x="499"
                  y="200"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.35)"
                  fontSize="11"
                >
                  no det.
                </text>
                <text
                  x="719"
                  y="200"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.35)"
                  fontSize="11"
                >
                  no det.
                </text>
                <text
                  x="499"
                  y="250"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.35)"
                  fontSize="11"
                >
                  no det.
                </text>
                <text
                  x="719"
                  y="250"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.35)"
                  fontSize="11"
                >
                  no det.
                </text>

                <text
                  x="610"
                  y="290"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.6)"
                  fontSize="9.5"
                >
                  Driver — only specific zones carry material loss exposure
                </text>
              </g>

              <rect
                x="40"
                y="320"
                width="740"
                height="60"
                rx="8"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="1"
              />
              <text
                x="410"
                y="342"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="11"
                fontWeight="bold"
              >
                Reading the diagram
              </text>
              <text x="410" y="358" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                Coloured dot = automatic fire detector. Dashed box in P2 = designated protected zone
                with documented loss-exposure rationale.
              </text>
              <text x="410" y="372" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9.5">
                P1 = "everywhere" cover · P2 = "only the high-loss zones". The /M suffix adds manual
                call points to either.
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

          <ContentEyebrow>P2 — targeted property protection</ContentEyebrow>

          <ConceptBlock
            title="P2 — designated-area cover"
            plainEnglish="P2 covers designated high-value or high-risk areas only. The designer (with the responsible person and the insurer) identifies the areas where fire loss would be material to the business and limits the automatic detection to those areas. The remainder of the building has no P-system cover. P2 is therefore a 'designed footprint' category and the documentation must clearly state which areas are within the P2 envelope and which are not."
            onSite="When you commission a P2 system, the first thing you read is the protected-area schedule. It should list each area within P2 cover and state the loss-exposure rationale for inclusion. If a high-value area is missing from the schedule, that is a finding to flag — either the schedule is incomplete (design fault) or the responsible person has accepted the risk (which should be documented). Outside the schedule, P2 gives no cover."
          >
            <p>Typical P2 use cases:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                A server room within a low-risk office building — fire in the server room would
                interrupt the business; fire elsewhere is a low-loss event.
              </li>
              <li>
                A plant room within a warehouse — fire in the plant would disable the warehouse;
                fire in the warehouse storage areas is the insurer's main concern but may be
                addressed by sprinklers rather than detection.
              </li>
              <li>
                A chemical store within a general factory — fire in the store has loss / hazard
                consequences disproportionate to its area.
              </li>
              <li>A small archive room within a university building — irreplaceable contents.</li>
              <li>
                A dedicated machine room (CNC, robotic assembly) within a low-value general
                production area.
              </li>
            </ul>
            <p>
              P2 is rarely the whole answer for a building. It is typically combined with an L
              category to provide life-safety cover on escape routes (e.g. L4/P2 — escape-route
              detection plus targeted property cover; L3/P2 — escape-route plus opens-onto plus
              targeted property). The combined spec means a single system delivers both objectives
              with documented scopes for each.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Categories of system — P2 commentary"
            clause={
              <>
                Category P2 systems provide automatic fire detection in those parts of the protected
                premises that are designated as being of high fire hazard or where the consequence
                of fire would be of particular significance, having regard to the property at risk.
              </>
            }
            meaning="Two phrases earn close reading. 'Designated as being of high fire hazard' — the protected scope is a deliberate design choice, not a default. 'Consequence of fire would be of particular significance' — loss exposure, not just hazard, drives inclusion. The designer documents both the hazard reasoning and the loss reasoning for each designated area."
          />

          <CommonMistake
            title="Specifying P2 without a documented protected-area schedule"
            whatHappens="A small commercial premises receives a fire alarm specification for 'P2 system covering the high-risk areas'. The contractor installs detectors in three rooms judged to be 'high-risk' on a walkaround visit; no formal schedule of which areas are within P2 is produced. Two years later, a fire breaks out in a fourth area — a small storage room with paint and solvents that the contractor did not detect during the walkaround. The insurer's loss adjuster identifies the missing P2 cover; the policyholder argues that the room should have been covered; the documentation does not resolve the dispute because no schedule exists. Settlement is delayed; coverage is partially declined."
            doInstead="P2 designs always begin with a documented protected-area schedule listing every area within P2 cover and the rationale for inclusion. Areas excluded from P2 are listed too, with the rationale for exclusion (low loss exposure, alternative protection, accepted risk). The schedule is signed by the responsible person and the designer. The insurer should review and accept the schedule before installation begins. A P2 system without a schedule is incompletely specified."
          />

          <SectionRule />

          <ContentEyebrow>The /M suffix and hybrid categorisations</ContentEyebrow>

          <ConceptBlock
            title="The /M suffix — adding manual call points to a P or L5 design"
            plainEnglish="P1, P2 and L5 systems do not include manual call points by default. The reasoning: P category is designed for unattended detection; L5 is bespoke and may not need MCPs depending on the documented objective. Where MCPs are wanted alongside, the /M suffix is added: P1/M, P2/M, L5/M. The /M suffix is NOT used with L1, L2, L3 or L4 — those categories already include MCPs by default and the suffix would be redundant. M (manual only) is its own category covered in Section 3 — that category is all-MCP by definition."
            onSite="Read the spec carefully. 'P1' = property cover, no MCPs. 'P1/M' = property cover plus MCPs. 'L1' = life cover plus MCPs (MCPs by default). 'L1/M' = wrong — never appears in well-written specifications, and if seen indicates the specifier may not understand the suffix convention. The suffix interpretation directly affects the device count and the cabling design."
          >
            <p>Suffix usage summary:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>L1, L2, L3, L4</strong> — manual call points included by default; /M suffix
                not used.
              </li>
              <li>
                <strong>L5</strong> — bespoke; MCPs are at the designer's discretion. L5 (no MCPs)
                or L5/M (with MCPs) are both valid; the spec must state which.
              </li>
              <li>
                <strong>P1, P2</strong> — no MCPs by default. /M suffix adds MCPs explicitly.
              </li>
              <li>
                <strong>M</strong> — manual call points only, no automatic detection. (Section 3.)
              </li>
            </ul>
            <p>
              MCP siting in any /M-suffixed system follows the BS 5839-1:2025 distance rules:
              maximum 30 m straight-line distance and 45 m actual travel distance from any point in
              the protected area to the nearest MCP. Mounting height is 1.4 m above floor level,
              with a tolerance of +200 mm / -300 mm (i.e. anywhere between 1.1 m and 1.6 m). MCPs on
              stairway landings are now to be incorporated within the zone serving the adjacent
              accommodation (per 12.1 a)) — a 2025 wording clarification.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Hybrid L/P specifications — layering objectives in one system"
            plainEnglish="Real buildings often have both life-safety and property-protection objectives. A hospital must protect patient evacuation (L objective) AND irreplaceable medical equipment (P objective). A hotel must protect guest evacuation (L objective) AND a high-value commercial kitchen (P objective). The BS 5839-1:2025 categorisation system supports hybrid specifications: a single physical system can be designed and documented to deliver multiple categories simultaneously. The hybrid is written as 'L1/P1', 'L1/P2', 'L2/P2', 'L3/P2' etc., listing both objectives."
            onSite="In a hybrid spec, the system documentation should make both objectives explicit. The detector layout typically satisfies both — the more demanding category drives the geometry, and the documentation acknowledges the secondary objective. Maintenance, alarm transmission, variations and any later modifications must respect both objectives. A modification that satisfies the L category but compromises the P scope is a non-compliance with the system's full specification."
          >
            <p>Common hybrid specifications:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>L1/P1</strong> — life cover throughout AND property cover throughout. The
                same detector layout serves both. Used in hospitals, large care facilities, complex
                mixed-use buildings.
              </li>
              <li>
                <strong>L1/P2</strong> — life cover throughout PLUS targeted property cover in
                designated high-value zones. The L1 detectors in the designated zones do the P2 job;
                the documentation acknowledges both.
              </li>
              <li>
                <strong>L2/P2</strong> — life cover on escape routes plus high-risk rooms PLUS
                targeted property cover in designated zones. Often used in hotels, where bedrooms
                (L2) and back-of-house (P2) are both protected but the rest of the building is not
                comprehensively covered.
              </li>
              <li>
                <strong>L3/P2</strong> — life cover on escape routes plus opens-onto, plus targeted
                property cover. Common in offices with a designated server room.
              </li>
              <li>
                <strong>L4/P2</strong> — escape-route only life cover plus targeted property cover.
                Smallest hybrid. Common in compact commercial premises.
              </li>
            </ul>
            <p>
              Documenting a hybrid means: protected-area schedule for the P scope; detector schedule
              for the L scope; a single combined record showing how the two scopes overlap or
              diverge. Maintenance routines apply to both scopes. Modifications must be reviewed
              against both scopes.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Categories of system — combined L/P commentary"
            clause={
              <>
                A protected building may incorporate a combination of categories of system, for
                example, a Category L2 system, designed to protect occupants of the protected
                building, and a Category P2 system, designed to protect the contents of high-value
                rooms. In these circumstances, both objectives should be stated in the design and
                commissioning documentation, and the system should comply with the recommendations
                applicable to each category.
              </>
            }
            meaning="Two phrases earn close reading. 'Both objectives should be stated' — the documentation makes the hybrid explicit; an unstated objective is unenforceable. 'The system should comply with the recommendations applicable to each category' — the more demanding category in any given area drives the design; partial compliance with neither category is not acceptable."
          />

          <InlineCheck
            id={inlineChecks[1].id}
            question={inlineChecks[1].question}
            options={inlineChecks[1].options}
            correctIndex={inlineChecks[1].correctIndex}
            explanation={inlineChecks[1].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Alarm transmission — BS 5839-1:2025 14.17 and 14.18</ContentEyebrow>

          <ConceptBlock
            title="The 2025 alarm-transmission timings"
            plainEnglish="BS 5839-1:2025 introduces explicit timing requirements for alarm transmission to an Alarm Receiving Centre (ARC). The driver is the ongoing migration from the public switched telephone network (PSTN) to all-IP networks — PSTN is being switched off in 2027. The 2017 edition recognised the use of intruder-and-hold-up alarm system transmission equipment but did not specify the Grade of signalling required. The 2025 revision sets clear maximum times for the alarm signal to reach the ARC, and clear maximum times for the ARC and the CIE (control and indicating equipment, i.e. the panel) to indicate a catastrophic failure of the transmission path."
          >
            <p>The 2025 transmission rules — for both L and P categories:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Category L (14.17)</strong> — alarm signal received at ARC within 90 s;
                catastrophic transmission failure indicated at ARC and CIE within 3 min.
              </li>
              <li>
                <strong>Category P (14.18)</strong> — alarm signal received at ARC within 120 s;
                catastrophic transmission failure indicated at ARC and CIE within 31 min.
              </li>
              <li>
                Where a separate power supply unit is used to power the alarm transmission
                equipment, it should conform to either BS EN 54-4 or BS EN 50131-6 Grade 4.
              </li>
              <li>
                A new label (false-alarm notice) is recommended for the CIE indicating that the
                system has an active connection to the fire and rescue service and giving the ARC's
                contact telephone number — to reduce false-alarm attendances during testing.
              </li>
              <li>
                Where practicable, the alarm signal transmitted to the ARC should indicate the
                nature of the triggering device and whether coincidence filtering is in place. This
                lets the ARC pass useful information to the FRS.
              </li>
            </ul>
            <p>
              The split between 14.17 and 14.18 reflects the urgency profile. A delay in receiving
              an L-system alarm extends time-to-evacuation; a delay in receiving a P-system alarm
              extends property loss. Both matter; L is more urgent. The same logic applies to the
              catastrophic-failure indication: 3 min for L (urgent — lives may be at risk if
              transmission is silently down); 31 min for P (less urgent — property loss is the main
              consequence of a silent transmission outage).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · 14.18 (alarm transmission for Category P systems)"
            clause={
              <>
                For Category P systems, in the event of a fire alarm signal, an indication should be
                received at the ARC within a maximum of 120 s; a catastrophic failure of the
                transmission system (whereby no alarm signals can be transmitted) should be
                indicated at the ARC and the CIE within 31 min.
              </>
            }
            meaning="The 14.18 figure is the headline alarm-transmission timing for P-systems. The 120 s is a hard maximum; faster is acceptable. The 31 min catastrophic-failure indication is also a maximum; faster indication on path-loss detection is preferred where the equipment supports it. The figures are the standard's response to all-IP migration — they fix what the alarm-transmission equipment must achieve."
          />

          <RegsCallout
            source="BS 5839-1:2025 · 14.17 (alarm transmission for Category L systems)"
            clause={
              <>
                For Category L systems, in the event of a fire alarm signal, an indication should be
                received at the ARC within a maximum of 90 s; a catastrophic failure of the
                transmission system (whereby no alarm signals can be transmitted) should be
                indicated at the ARC and the CIE within 3 min.
              </>
            }
            meaning="The 14.17 figures are tighter than 14.18 because life-safety urgency exceeds property urgency. The 90 s alarm timing is similar to or slightly tighter than typical IP-transmission performance with confirmed receipt; the 3 min catastrophic-failure timing forces the equipment to detect path loss promptly so that fall-back arrangements (manual telephone summons, FRS direct communication) can begin while the fire is still in its early phase."
          />

          <CommonMistake
            title="Treating the 14.17 / 14.18 timings as advisory rather than mandatory in the 2025 revision"
            whatHappens="A contractor commissions a P1 system in a 2026 warehouse using transmission equipment that has historically met the 2017 edition's general requirements. The contractor does not measure the actual alarm-receipt timing at the ARC. Six months later, a fire breaks out and the alarm signal takes 4 minutes to reach the ARC due to a configuration issue in the IP path. By the time the FRS arrives, fire damage is significantly worse than it would have been with prompt notification. Investigation traces the timing failure to undocumented transmission performance; the 14.18 120 s requirement was never tested at commissioning."
            doInstead="At commissioning of any 2025-design system with ARC transmission, measure the alarm-receipt timing end to end. The 14.17 / 14.18 figures are testable performance requirements, not aspirational targets. Document the measured timing in the commissioning record. If the timing exceeds the standard's figure, the transmission equipment or its configuration is non-compliant and must be remedied before the system is handed over. At every annual service visit, retest the alarm-receipt timing — IP path performance changes over time."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
          />

          <SectionRule />

          <ContentEyebrow>Insurer-driven design and the variations rule</ContentEyebrow>

          <ConceptBlock
            title="Why insurers care about P-grade detection"
            plainEnglish="P category specifications are very often driven by the property insurer rather than by fire-safety legislation. The insurer carries the financial loss when fire damages the building or contents; reducing the loss reduces the claim; reducing the claim reduces the premium and the insurer's exposure. P-grade detection enables earlier intervention, which directly reduces loss. Insurers therefore have a commercial interest in mandating P cover and frequently do so as a condition of cover or as a basis for premium reduction. The fire-alarm designer should understand which of the requirements on the project come from the FRA (life safety) and which come from the insurer (property) — the design must satisfy both."
            onSite="When you read a fire strategy that calls for P1 or P2 cover, ask: which insurer is the requirement coming from? Insurer specifications often differ slightly from BS 5839-1:2025 (insurer-specific detector types, additional coverage in particular areas, integration with sprinkler activation). The designer must reconcile insurer requirements with BS 5839-1:2025; where they conflict, the insurer's requirements typically prevail commercially (no insurance, no project), but the standard's recommendations remain the technical baseline."
          >
            <p>Common insurer-driven design choices:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>P1 in warehouses with sprinkler systems.</strong> Sprinklers control fire;
                detectors signal the FRS. Both reduce loss; insurers typically require both for high
                sums insured.
              </li>
              <li>
                <strong>P2 in server rooms.</strong> The server room is the highest-loss area in
                most office buildings; targeted P2 cover protects it without burdening the rest of
                the building with detection that would not materially reduce loss elsewhere.
              </li>
              <li>
                <strong>
                  Aspirating smoke detection in cleanrooms / heritage / archive contexts.
                </strong>{' '}
                Where standard point detection cannot reach the highest sensitivity insurers expect,
                aspirating systems sample air and detect smoke at very low concentrations.
              </li>
              <li>
                <strong>Coincidence filtering and verified alarms.</strong> Insurer specifications
                often require additional confirmation before alarm transmission to reduce
                false-alarm load on the FRS — typical of high-sums-insured properties.
              </li>
              <li>
                <strong>Direct integration with sprinkler activation.</strong> Detector activation
                triggers sprinkler control valves; sprinkler-flow signals trigger detector-system
                alarms. Insurers value the redundancy.
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="The 2025 variations rule — some departures are no longer acceptable"
            plainEnglish="BS 5839-1:2025 introduces a significant change to the variations regime. The 2017 edition allowed any departure from the standard to be agreed as a variation between the designer, the responsible person and (where appropriate) the enforcing authority. The 2025 revision identifies certain departures as so detrimental to safety that they should NOT be regarded as acceptable variations. These specific departures are in effect prohibited; for other departures, variations remain possible but require justification and must now be documented in the system logbook (the 2017 edition only required 'major' variations to be recorded, with no clear definition of what counted as major)."
          >
            <p>The departures that are NOT acceptable under BS 5839-1:2025 6:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Absence of a zone plan (or other suitable diagrammatic representation as recommended
                in 22.2.5) in premises in which there is more than one zone on any storey,
                particularly premises in which people sleep.
              </li>
              <li>
                Absence of a facility for transmission of fire alarm signals to an ARC in either:
                supported housing in which the facility is considered necessary to meet the
                recommendations of BS 5839-1 (where a Grade A system according to BS 5839-6:2019 is
                necessary); OR a residential care home.
              </li>
            </ul>
            <p>
              These two departures cannot be agreed away. A new design that omits a zone plan in a
              multi-zone sleeping building, or that omits ARC transmission in supported housing or a
              residential care home, is non-compliant. All other variations remain possible but must
              be justified (especially if proposed at installation or commissioning stage rather
              than design stage) and must be recorded in the system logbook.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · Variations (clause 6)"
            clause={
              <>
                Whilst BS 5839-1:2025 is a code of practice, and variations against the
                recommendations of the standard are allowed, it has now been recognised that the
                following departures from the recommendations of BS 5839-1:2025 are likely to be so
                detrimental to the safety of life that they should not be regarded as acceptable
                variations.
              </>
            }
            meaning="Three phrases earn close reading. 'Code of practice' — variations are part of the standard's design. 'So detrimental to the safety of life' — the prohibited departures are calibrated to safety, not to convenience. 'Should not be regarded as acceptable variations' — language is firm; this is closer to a prohibition than a recommendation."
          />

          <CommonMistake
            title="Agreeing a 'no ARC transmission' variation in a residential care home"
            whatHappens="A small residential care home commissions a fire-alarm refurbishment. The design includes ARC transmission, but the responsible person (motivated by ongoing-monitoring cost) asks the designer to agree a variation removing the ARC transmission, with the agreed protocol being that staff phone 999 directly on alarm activation. The designer, working from 2017-edition assumptions, agrees the variation in writing. The system is installed without ARC transmission. An audit two years later identifies the missing transmission as a non-compliance with BS 5839-1:2025 6 — it is one of the explicitly listed departures that cannot be agreed as an acceptable variation in residential care homes. The residential care home is required to retrofit transmission urgently."
            doInstead="When the project is in a residential care home or in supported housing where Grade A is necessary, the absence of ARC transmission is no longer agreeable as a variation. Specify ARC transmission from the outset. If the responsible person resists on cost grounds, explain that the 2025 revision removes this from the variations envelope. Document the conversation. The 2025 rule is in effect a prohibition; treat it as such."
          />

          <CommonMistake
            title="Forgetting that the L category in a hybrid spec already supplies MCPs"
            whatHappens="A contractor designs an L3/P2 office system. The drawings show the L3 detector schedule and the P2 detector schedule but include only six MCPs, all clustered around the front lobby. The fire-strategy reviewer flags the low MCP count as a non-compliance. The contractor adds /M to both the L3 and P2 specs, doubling the MCP count and the cabling cost; the project budget overruns and the schedule slips. In fact, the L3 category already includes MCPs by default (with a 30 m straight-line / 45 m actual-travel maximum); the P2 part rides on top and does not need separate /M unless additional coverage is wanted. The original problem was simply that the L3 MCP schedule had been under-specified."
            doInstead="In a hybrid L/P spec, identify which categories include MCPs by default. L1, L2, L3 and L4 always do. P1, P2 and L5 do not. Specify MCPs once at the building level — typically through the L category — and let the P scope ride on top. Add /M to the P side only if you genuinely need additional MCPs in the P-protected zones beyond what the L category already supplies. The MCP siting must satisfy the BS 5839-1:2025 distance limits regardless of which category is paying for the device."
          />

          <InlineCheck
            id={inlineChecks[3].id}
            question={inlineChecks[3].question}
            options={inlineChecks[3].options}
            correctIndex={inlineChecks[3].correctIndex}
            explanation={inlineChecks[3].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            BS 7671 cross-reference — supply integrity for P category systems
          </ContentEyebrow>

          <ConceptBlock
            title="Supply integrity, AFDDs and Section 560 in property-protection contexts"
            plainEnglish="Property-protection systems depend on supply continuity in the same way life-safety systems do — a P1 system that loses power has stopped protecting property. BS 7671 Section 560 (electrical installations for safety services) applies. The 2025 revision aligned with BS 7671 A2:2022 by adopting the IEC 60445 identification convention (functional earth conductor identified by pink or marked 'FE' instead of cream). Looking forward, BS 7671 A4:2026 expands AFDD provision in higher-risk premises — including the kinds of premises where P category detection is also relevant (HMOs, sleeping accommodation, certain commercial buildings). The two regimes complement each other: AFDDs reduce the chance of an electrical fire; the BS 5839-1:2025 system detects fires that occur."
          >
            <p>Practical implications:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cable colour.</strong> BS 5839-1:2025 16 specifies that fire alarm cables
                AND the low-voltage mains supply to the system should be of a single common colour,
                with red preferred. This is a clarification from the 2017 edition.
              </li>
              <li>
                <strong>Functional earth identification.</strong> Pink or marked 'FE' (was cream
                under earlier BS 7671 / IEC 60445 versions). Aligns with BS 7671 A2:2022.
              </li>
              <li>
                <strong>Battery labelling.</strong> Batteries should have a label fixed to them
                showing the date of installation. The 2025 revision acknowledges custom and practice
                of labelling batteries with a permanent marker.
              </li>
              <li>
                <strong>Standby supply.</strong> Continuous availability is the load-bearing
                concept. A P-system's standby battery must support the system for the design
                duration with margin; a marginal battery that fails to support a real fire alarm is
                the difference between successful early detection and silent loss.
              </li>
              <li>
                <strong>AFDD provision (BS 7671 A4:2026).</strong> Higher-risk premises increasingly
                require AFDDs upstream of fire-alarm circuits; this reduces the chance of a wiring
                fault in the building igniting a fire that the BS 5839-1:2025 system would then need
                to detect.
              </li>
              <li>
                <strong>TN-C-S (PNB) clarifications under A4:2026.</strong> Earthing arrangements
                for safety-service circuits within a TN-C-S installation must respect Section 560
                supply-integrity requirements. The 2026 amendment clarifies the boundaries.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="The 2026 distribution warehouse"
            situation="A 12,000 m² distribution warehouse is being designed in 2026 with the following objectives: protect life (small overnight security team, escape via a single fire-protected route), protect property (inventory value of approximately £8M, sums insured very high), comply with the property insurer's requirements (full sprinkler system plus P1 detection plus ARC transmission), and integrate with the building's BS 7671 A4:2026-compliant electrical installation. The fire strategy specifies an L4/P1/M hybrid."
            whatToDo="Read the hybrid carefully. L4 = escape-route detection only (life-safety remit, modest because the route is short and the staff are awake and alert). P1 = property cover throughout (property remit, demanded by the insurer because of the very high sums insured). /M = manual call points (because the system is attended during operating hours, MCPs are wanted alongside the P-grade detection). Apply the 2025 changes: top-of-flue detector for any flue-like structures (atrium, large service shaft) — the L4 escape-route remit triggers this; stairway lobbies must have automatic detection (2025 rule); ARC transmission must meet the 14.18 P-system timing of 120 s (and the 14.17 L4 timing of 90 s, since the system is also L category); functional-earth conductor identification is pink / 'FE'; cable colour is red throughout. Specify multi-sensor detection in the warehouse general areas to manage dust-induced false alarms. Document a P1 protected-area schedule (every area within scope) and an L4 escape-route schedule. Coordinate with the electrical contractor to ensure AFDD provision aligns with A4:2026 and Section 560 supply-integrity requirements are met for the fire alarm circuits."
            whyItMatters="A 2026 hybrid like L4/P1/M needs every BS 5839-1:2025 change to be applied alongside the BS 7671 A4:2026 cross-references. Missing any one of the changes (heat detectors specified, lobby detection skipped, transmission timing untested, functional earth still cream) produces a non-compliant system. The 2025 / 2026 transition is the busy period for getting these details right."
          />

          <Scenario
            title="The small office with a high-value server room"
            situation="A 1,800 m² small office building is being refurbished in 2026. The fire strategy specifies an L3/P2 hybrid: escape-route + opens-onto detection (L3) plus targeted property cover for a designated server room and a small archive room (P2). The responsible person has asked whether MCPs need to be added separately for the P2 part."
            whatToDo="L3 already includes MCPs by default — the spec is L3 (with MCPs) plus P2 (no MCPs by default). The L3 MCPs are sited per the BS 5839-1:2025 distance rules (30 m straight line / 45 m actual travel) and cover the whole protected area at MCP-grade. The P2 part adds detection in the server room and the archive; the existing L3 MCPs serve the building including those rooms, so no additional MCPs are needed for the P2 scope. The protected-area schedule should explicitly list the server room and archive within P2 scope; the L3 detector schedule covers the corridors and rooms opening onto them. Both the L3 scope and the P2 scope are reviewed against the 2025 changes (lobby detection, void-wall wording, alarm-transmission timing). The detector-type choice in the server room should account for IT-equipment false-alarm risk; multi-sensor detection is a sensible choice."
            whyItMatters="A common error is to treat the /M suffix as needed wherever P appears. In an L/P hybrid, the L category typically supplies the MCPs by default; the P scope rides on top. The /M suffix is only needed where the P category stands alone or where additional MCPs are wanted in the P scope beyond what the L scope provides."
          />

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'P = property protection. The system minimises loss to the building, contents, processes and business through early automatic detection. Life safety is incidental.',
              'P1 — automatic detection throughout the protected building. Same Annex D exceptions as L1.',
              'P2 — automatic detection in defined high-value or high-risk areas only. The protected-area schedule must be documented.',
              'P1 and P2 do NOT include MCPs by default. /M suffix (P1/M, P2/M) adds MCPs explicitly.',
              'Hybrid L/P specifications (L1/P1, L1/P2, L2/P2, L3/P2, L4/P2 etc.) layer life and property objectives in a single physical system.',
              'BS 5839-1:2025 14.17 — Category L alarm transmission: 90 s ARC indication, 3 min catastrophic-failure indication.',
              'BS 5839-1:2025 14.18 — Category P alarm transmission: 120 s ARC indication, 31 min catastrophic-failure indication.',
              'BS 5839-1:2025 6 — variations: absence of zone plan in multi-zone sleeping premises and absence of ARC transmission in supported housing or residential care homes are variations that are NOT acceptable.',
              'All variations must now be justified and documented in the system logbook (2017 only required "major" variations; 2025 covers all).',
              'Cable colour — single common colour, red preferred. Functional earth — pink or marked "FE" (per BS 7671 A2:2022 / IEC 60445).',
              'Insurer requirements often drive P category specifications — the insurer carries the loss and has a commercial interest in detection. Reconcile insurer requirements with BS 5839-1:2025 in the design.',
              'BS 7671 Section 560 (safety services) and A4:2026 AFDD provisions interact with P-grade fire alarm design — consider both in installation and commissioning.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Can a building have both an L category and a P category at the same time?',
                answer:
                  'Yes — hybrid L/P specifications (L1/P1, L1/P2, L2/P2, L3/P2, L4/P2 etc.) are widely used. A single physical system can deliver both objectives; the documentation states both. Maintenance, modifications, alarm transmission and variations all then need to respect both scopes.',
              },
              {
                question: 'What does the /M suffix mean and when is it used?',
                answer:
                  'The /M suffix denotes the addition of manual call points to a P category or L5 system. P1, P2 and L5 do not include MCPs by default; /M adds them. The suffix is NOT used with L1, L2, L3 or L4 because those categories already include MCPs. The /M suffix is also not used with M (which is all-MCP by definition).',
              },
              {
                question:
                  'My P2 system covers a server room. Do I need separate MCPs in the rest of the building?',
                answer:
                  'Depends on the wider category specification. P2 alone has no MCPs and gives no cover outside the designated zones. If the building also has an L category overlaid (e.g. L3/P2), the L category supplies MCPs by default and you do not need additional MCPs for the P2 scope. If P2 is the only category specified, add the /M suffix (P2/M) to include MCPs at BS 5839-1:2025 distance limits (30 m straight line / 45 m travel).',
              },
              {
                question:
                  "What is the relationship between BS 5839-1:2025 14.18 (P alarm transmission) and the property insurer's requirements?",
                answer:
                  "14.18 sets the BS 5839-1:2025 baseline for P-category alarm transmission timing — 120 s ARC indication, 31 min catastrophic-failure indication. Property insurers may set tighter requirements (e.g. 60 s indication, sub-minute path-loss alerting), in which case the insurer's requirements prevail commercially. Where the standard and the insurer disagree, the design must satisfy the more demanding requirement; document both in the design pack.",
              },
              {
                question:
                  'Are the BS 5839-1:2025 14.17 / 14.18 alarm-transmission timings testable at commissioning?',
                answer:
                  'Yes — and they should be tested. Commission-stage testing measures the end-to-end time from alarm trigger to ARC indication and confirms it falls within the 90 s (L) or 120 s (P) limit. Catastrophic-failure detection is also tested by simulating path loss and timing the indication. Document the measured times in the commissioning record. At every annual service, re-test — IP path performance changes over time as the underlying network changes.',
              },
              {
                question:
                  'My residential care home wants to omit ARC transmission to save monitoring costs. Can I agree this as a variation?',
                answer:
                  'No. BS 5839-1:2025 6 explicitly identifies the absence of ARC transmission in residential care homes as a variation that is NOT acceptable. The 2017 edition allowed it as an agreed variation; the 2025 edition removes that option. The system must include ARC transmission. If cost is a concern, look at the choice of ARC and the monitoring-service-level rather than at omission.',
              },
              {
                question:
                  'How does BS 7671 A4:2026 AFDD provision interact with a P1 fire alarm design?',
                answer:
                  'AFDDs reduce the chance of an arc-fault electrical fire occurring; the P1 detection system detects fires that do occur. The two are complementary risk-reduction layers. A4:2026 expands AFDD requirements in certain higher-risk premises (sleeping accommodation, some HMOs); a building with a 2026-compliant electrical installation that mandates AFDDs alongside a 2025-compliant P1 fire alarm gets both layers. Design the alarm circuits to respect Section 560 (safety services) and ensure AFDD provision upstream where required.',
              },
              {
                question:
                  'When should multi-sensor detectors be specified instead of point smoke detectors in a P1 design?',
                answer:
                  'Where the protected area presents an elevated false-alarm risk for point smoke detectors — typically dust generation (textile, woodworking, food-processing), steam (kitchens, laundry, certain process areas) or aerosols (cleaning, painting). The 2025 revision explicitly recommends multi-sensor detectors as the response in such environments. Multi-sensor heads require multiple stimuli (smoke + heat, smoke + CO, etc.) before alarming, which suppresses false alarms while preserving real-fire sensitivity.',
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz title="P category systems — Module 1.2" questions={quizQuestions} />

          {/* Bottom navigation grid */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-1')}
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
                navigate('/electrician/upskilling/fire-alarm-course/module-1/section-3')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                1.3 M category systems
              </div>
            </button>
          </div>

          <div className="hidden">
            <Building2 />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule1Section2;
