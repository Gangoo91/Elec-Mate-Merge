import { ArrowLeft, ChevronLeft, ChevronRight, ClipboardCheck } from 'lucide-react';
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
    id: 'fam1-s4-fra',
    question:
      'Which legislative duty is the master driver of fire-alarm category selection in non-domestic premises in England and Wales?',
    options: [
      'BS 5839-1:2025 itself.',
      'Approved Document B (Building Regulations).',
      'The Regulatory Reform (Fire Safety) Order 2005 — Article 9 places the duty on the responsible person to make a suitable and sufficient assessment of the risks to which relevant persons are exposed, for the purpose of identifying the general fire precautions needed. The fire-alarm category selection is part of "the general fire precautions" — the FRA findings drive the choice. BS 5839-1:2025 is the code of practice for implementing the choice once made; Approved Document B is the building-regs design support; insurer requirements often layer on top.',
      'Insurer requirements.',
    ],
    correctIndex: 2,
    explanation:
      'The RRO 2005 is the legislative anchor in England and Wales (separate but equivalent regimes apply in Scotland and Northern Ireland). The fire risk assessment under Article 9 is the master document; everything else (BS 5839-1:2025, Approved Document B, insurer requirements, sector-specific regulation) feeds into or implements its findings.',
  },
  {
    id: 'fam1-s4-causeeffect',
    question:
      'BS 5839-1:2025 introduces a documentation requirement for handover. What is the new item?',
    options: [
      'A photographic record of every detector.',
      'A cause-and-effect matrix (or text description of how the cause and effect operates) included with the documentation provided to the purchaser or user. This could be as simple as "this system operates as a simultaneous evacuation" or, for more complex strategies, a full matrix document. The standard does not dictate the format — only that the description must be produced. The 2025 revision adds this because handover documentation often omitted any record of how the system was supposed to behave on activation.',
      "A copy of every detector's test certificate.",
      'A signed copy of the FRA.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5839-1:2025 21 (documentation/handover) recommends the cause-and-effect matrix or text description be included in the handover pack. Even a simple system needs a record of behaviour: "fire alarm signal causes simultaneous evacuation by all sounders". Complex systems need a full matrix mapping each input device to each output behaviour (zoned evacuation, phased evacuation, ancillary outputs, ARC transmission).',
  },
  {
    id: 'fam1-s4-variation',
    question:
      'Under BS 5839-1:2025 6, all variations from the standard must now be recorded where?',
    options: [
      'In the design drawing only.',
      'In the system logbook — a change from the 2017 edition, which only required "major variations" to be recorded (with no clear definition of what counted as major). The 2025 revision requires ALL variations to be documented in the logbook, including the rationale and any agreement with the responsible person, the enforcing authority or the insurer. This makes the system\'s as-built configuration visible to anyone consulting the logbook.',
      'In the FRA.',
      'On the panel.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5839-1:2025 25 (logbook) updates Annex H (was Annex F in 2017) to reflect the variations-recording requirement. ALL variations now go in the logbook; the "major" qualifier is gone. The logbook is the authoritative record of the system\'s as-built and as-modified configuration.',
  },
  {
    id: 'fam1-s4-maint',
    question:
      'BS 5839-1:2025 43.2.1 specifies the period between successive servicing visits. What is the rule?',
    options: [
      'Every 12 months exactly.',
      'Successive inspection and servicing visits should be undertaken at intervals of approximately 6 months. Note 1 clarifies that any interval between 5 and 7 months after the previous service is acceptable — the 2017 wording (period should not exceed 6 months) is replaced with a more practical window. The date of acceptance is the datum for the period.',
      'Every 24 months.',
      'Whenever the responsible person decides.',
    ],
    correctIndex: 1,
    explanation:
      'BS 5839-1:2025 43.2.1 changes the maintenance-interval rule. The 2017 edition deemed a system non-compliant if a service was more than 6 months after the previous one; the 2025 wording allows servicing within a 5-to-7-month window relative to the previous service. The change reflects custom and practice (servicing engineers commonly book a month either side of the strict 6-month line); "approximately 6 months" with a 5-to-7-month tolerance is the new wording.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'In England and Wales, who has the legal duty to ensure a "suitable and sufficient" fire risk assessment is in place under the Regulatory Reform (Fire Safety) Order 2005?',
    options: [
      'The fire-alarm contractor.',
      "The responsible person — defined under the RRO 2005 as the employer (where the premises is a workplace), or any person with control of the premises in connection with their trade, business or other undertaking. The responsible person's duty is non-delegable; engaging a fire-alarm contractor or a third-party fire-risk assessor does not transfer the duty, only the technical input. The RRO 2005 places liability for failure on the responsible person, not on the contractor.",
      'The fire and rescue service.',
      'The insurer.',
    ],
    correctAnswer: 1,
    explanation:
      'The duty rests with the responsible person (employer or person in control). The fire-alarm contractor and the fire-risk assessor are advisers; the responsible person is duty-holder. Misunderstanding this is one of the most common compliance gaps — building owners assume engaging a contractor discharges the duty, but it does not.',
  },
  {
    id: 2,
    question:
      'Which of the following is the correct top-down decision flow for selecting a BS 5839-1:2025 system category in a non-domestic premises?',
    options: [
      'Pick the category from BS 5839-1:2025 first, then write the FRA to support it.',
      'FRA findings (RRO 2005 Article 9) → identify life-safety + property objectives → cross-check with Approved Document B (Building Regs) → cross-check with sector-specific guidance and insurer requirements → select BS 5839-1:2025 category that meets ALL the requirements (most demanding wins) → document selection rationale → produce design.',
      'Insurer specifies the category; designer implements.',
      'Use whatever is cheapest.',
    ],
    correctAnswer: 1,
    explanation:
      "The decision flow runs FRA → ADB → sector / insurer → BS 5839-1:2025 selection. The FRA is the master driver; the standard is the implementation tool. Designers who pick the category from the standard first and rationalise back into the FRA produce systems that meet the standard's minimum but not necessarily the responsible person's actual life-safety duty.",
  },
  {
    id: 3,
    question:
      'BS 5839-1:2025 21 (documentation/handover) introduces a new recommendation. What document is to be included with the handover pack?',
    options: [
      'A list of detectors.',
      'A cause-and-effect matrix (or text description of how the cause and effect operates). For a simple system this can be as short as "this system operates as a simultaneous evacuation"; for a complex system a full matrix is needed. The 2025 revision adds this because handover documentation often omitted any record of how the system was supposed to behave on activation, creating ambiguity for later modifications, maintenance and any post-incident investigation.',
      'A signed copy of the FRA.',
      'A photograph of the panel.',
    ],
    correctAnswer: 1,
    explanation:
      'The cause-and-effect description (or matrix) is the new 2025 handover deliverable. The standard does not dictate the format — text description is acceptable for simple systems; a formal matrix is needed for complex ones. The objective is that anyone consulting the documentation knows what the system is meant to do on each input.',
  },
  {
    id: 4,
    question:
      'BS 5839-1:2025 25 changed the rule on which variations must be recorded in the system logbook. What is the new rule?',
    options: [
      'Major variations only.',
      'All variations — the 2017 edition only required "major variations" to be recorded (with no definition of major); the 2025 revision requires ALL variations to be documented in the system logbook, with rationale and any agreement with the responsible person, enforcing authority or insurer. The change makes the as-built and as-modified configuration visible to anyone consulting the logbook.',
      'No variations need to be recorded.',
      'Variations are recorded only on the design drawing.',
    ],
    correctAnswer: 1,
    explanation:
      'The 2025 logbook recommendation closes a long-standing gap. With "major" undefined under the 2017 edition, variations were recorded inconsistently. Under 2025, every variation goes in the logbook, every time. The Annex H format (was Annex F) is updated to reflect the broader scope.',
  },
  {
    id: 5,
    question:
      'BS 5839-1:2025 43.2.1 specifies the period between successive servicing visits. What is the figure?',
    options: [
      'Approximately 12 months, with no tolerance.',
      'Approximately 6 months — Note 1 clarifies that any interval between 5 and 7 months after the previous service is acceptable. The 2017 edition\'s strict "should not exceed six months" is replaced with a 5-to-7-month window that better reflects custom and practice. Note 2 specifies that the date of acceptance is the datum for the period.',
      'Annually.',
      'Quarterly.',
    ],
    correctAnswer: 1,
    explanation:
      'The 2025 revision relaxes the 2017 strict 6-month rule into a 5-to-7-month window. Servicing organisations commonly book a month either side of the strict line; the 2025 wording acknowledges this practice. The annual (12-monthly) service visit retains the additional checks (functional testing of smoke detectors in ventilation ducts is now explicitly listed for the 12-monthly visit per 22).',
  },
  {
    id: 6,
    question:
      'BS 5839-1:2025 introduces a new clause on remote services and cyber security. What is the recommendation?',
    options: [
      'Remote access is prohibited.',
      'Remote services and cyber security recommendations include preventing unauthorised access to the system, access points and network pathways by physical means (e.g. locking the comms cabinet, fitting anti-tamper plugs to patch leads); a method of authentication of any request to accept a remote connection should be included in the CIE or gateway software before remote access is allowed; prior to performing remote service (read, control, write functions), a thorough risk assessment should evaluate potential impact on CIE operation; if remote service might compromise correct CIE functioning, the responsible individual must ensure the system is fully operational on completion.',
      'Remote access is unconditionally permitted.',
      'Remote access requires fire-and-rescue authorisation.',
    ],
    correctAnswer: 1,
    explanation:
      'The 2025 revision adds clause 43.4 on remote services and cyber security. With increasing IP-connected fire panels, the standard now expects access controls (physical and logical), authentication of remote-access requests, and risk-assessment of remote operations. The CIE and the network around it are now treated as security-relevant infrastructure.',
  },
  {
    id: 7,
    question:
      'BS 5839-1:2025 24 (extensions and modifications) clarifies that one specific maintenance action is now classed as a modification requiring a certificate. What is it?',
    options: [
      'Replacing a battery.',
      'Updating the firmware of the CIE — the 2025 revision now classes a firmware update as a modification, requiring an extension or modification certificate to be produced. This is a new explicit recognition that firmware changes can affect system behaviour and must be documented like a hardware modification. Replacing detectors with the same product code is not a modification; replacing a detector with a different product is.',
      'Cleaning a sounder.',
      'Resetting the panel.',
    ],
    correctAnswer: 1,
    explanation:
      'Firmware updates can change cause-and-effect behaviour, change alarm-transmission timing, change false-alarm filtering, change diagnostic output. The 2025 revision treats firmware changes as modifications because they modify how the system behaves, even if no hardware changes. The extension or modification certificate documents the change and is added to the logbook.',
  },
  {
    id: 8,
    question:
      'A 2026-design L2 hotel system has been installed. The hotel manager (the responsible person) wants to record an agreed variation: heat detectors were installed in two specific bedrooms because installing smoke detectors caused chronic false alarms (the bedrooms have steam-shower en-suites). The contractor proposes documenting the variation. Is this acceptable under BS 5839-1:2025?',
    options: [
      'Yes — heat detectors are always permitted in bedrooms.',
      'No, because heat detectors are now NOT permitted in sleeping rooms within new L2 designs (BS 5839-1:2025). The 2025 revision is firm — "no longer permitted", not "not preferred". Documenting this as a variation is not adequate; the prohibition cannot be agreed away. The correct response is engineering to solve the false-alarm problem (multi-sensor detection with steam-tolerant configuration, alternative siting away from the en-suite door, ventilation improvements). If multi-sensor cannot be made to work, the design must escalate to fire-engineering review — but heat detectors in sleeping rooms is no longer in the variations envelope.',
      'Yes — variations can cover anything.',
      "Only with the insurer's consent.",
    ],
    correctAnswer: 1,
    explanation:
      'The 2025 prohibition of heat detectors in sleeping rooms within new L2 / L3 designs is one of the cases where the variation envelope is closed. Installer-led work-arounds for false-alarm problems must use multi-sensor or alternative engineering, not revert to a prohibited detector type. Designers and contractors must understand which 2025 changes admit variations and which do not.',
  },
  {
    id: 9,
    question:
      'A property owner has signed a lease that obliges them to maintain the fire alarm "to BS 5839-1". A modification is proposed that involves removing two detectors from a void area judged to be of minimal risk. What is the correct treatment?',
    options: [
      'The contractor can remove the detectors and update the drawing.',
      'Treat as a modification. Document the proposal as a variation; obtain agreement from the responsible person (and the enforcing authority and the insurer where relevant); under the 2025 rules, record ALL variations in the system logbook (not just "major" variations as under 2017); produce an extension or modification certificate per 24; update the cause-and-effect description; verify the variation does not fall within the BS 5839-1:2025 6 list of NOT-acceptable variations (zone plan absence, ARC transmission absence in supported housing / care homes); confirm the responsible person\'s FRA still supports the modified design.',
      'Remove the detectors silently.',
      'Wait until the next major refurbishment.',
    ],
    correctAnswer: 1,
    explanation:
      "Modifications are formal events under BS 5839-1:2025 24. The modification must be documented as a variation, agreed with the responsible person, recorded in the logbook (all variations now), and accompanied by an extension or modification certificate. Where the modification removes protection, the FRA must be reviewed. The contractor is not authorised to make unilateral coverage reductions — that is the responsible person's decision, supported by the FRA.",
  },
  {
    id: 10,
    question:
      'Which of the following is NOT a valid input to fire-alarm category selection under BS 5839-1:2025?',
    options: [
      'Fire risk assessment under RRO 2005.',
      'Approved Document B (Building Regulations).',
      'Insurer requirements.',
      "The contractor's preference for a particular product range.",
    ],
    correctAnswer: 3,
    explanation:
      "Category selection is driven by risk and regulation — FRA, ADB, insurer, sector-specific regulation, BS 5839-1:2025 itself. The contractor's product preference is an implementation-stage matter, not a selection-stage input. A contractor whose preferred product range cannot deliver the required category should escalate or step aside, not down-spec the system to fit the product.",
  },
];

const FireAlarmModule1Section4 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Category selection and risk assessment | Fire Alarm Module 1.4 | Elec-Mate',
    description:
      'BS 5839-1:2025 category selection driven by Regulatory Reform (Fire Safety) Order 2005 fire risk assessment, Approved Document B, insurer requirements; documentation, variations, maintenance and modification rules.',
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
            eyebrow="Module 1 · Section 4"
            title="Category selection and risk assessment"
            description="How BS 5839-1:2025 category selection flows from the Regulatory Reform (Fire Safety) Order 2005 fire risk assessment, Approved Document B, insurer requirements and sector-specific regulation — and how the 2025 changes to documentation, variations, maintenance and modifications affect the design and life-cycle of a system."
            tone="yellow"
          />

          <TLDR
            points={[
              'Category selection is risk-driven, not product-driven. The decision flow is FRA → ADB → insurer / sector → BS 5839-1:2025 selection.',
              'The Regulatory Reform (Fire Safety) Order 2005 Article 9 places the fire risk assessment duty on the responsible person — non-delegable.',
              'Approved Document B (Building Regs) supports new-build and material-refurbishment design; sector-specific guidance (HMO licensing, healthcare, residential care, schools) layers on top.',
              'Insurer requirements often drive P-grade detection independently of legislation. The most demanding requirement wins.',
              'BS 5839-1:2025 21 — handover documentation must now include a cause-and-effect matrix (or text description of how the system behaves on activation).',
              'BS 5839-1:2025 6 — all variations (not just "major" ones) must now be recorded in the system logbook. Two specific variations are NOT acceptable: zone plan absence in multi-zone sleeping premises; ARC transmission absence in supported housing or residential care homes.',
              'BS 5839-1:2025 43.2.1 — servicing every approximately 6 months, with a 5-to-7-month window. 2017\'s strict "not exceed 6 months" replaced.',
              'BS 5839-1:2025 24 — firmware updates are now modifications, requiring an extension or modification certificate.',
              'BS 5839-1:2025 43.4 — new clause on remote services and cyber security: physical and logical access controls, authentication, risk assessment of remote operations.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Apply the BS 5839-1:2025 category-selection decision flow: FRA findings → ADB cross-check → sector / insurer requirements → category that meets all (most demanding wins) → documentation',
              'Identify the responsible person under the Regulatory Reform (Fire Safety) Order 2005 and explain why their duty is non-delegable',
              'Apply BS 5839-1:2025 21 documentation requirements: cause-and-effect matrix or text description, in addition to the established as-built drawings, device schedules and zone plans',
              'Apply BS 5839-1:2025 6 variations rule: all variations recorded in the logbook; the two NOT-acceptable variations (zone plan absence, ARC transmission absence in care contexts)',
              'Apply BS 5839-1:2025 43.2.1 maintenance interval: approximately 6-monthly with a 5-to-7-month tolerance window',
              'Apply BS 5839-1:2025 24 modification rule: firmware updates are modifications; extension or modification certificate is produced',
              'Apply BS 5839-1:2025 43.4 remote services and cyber-security recommendations: access controls, authentication, risk-assessment of remote operations',
              'Cross-reference BS 7671 Section 560 (safety services) and A4:2026 in the wider design conversation',
              'Diagnose category-selection errors (M in inappropriate premises, heat detectors in sleeping rooms, missing ARC transmission) and propose corrections',
            ]}
          />

          <SectionRule />

          <ContentEyebrow>
            The decision flow — how category selection actually happens
          </ContentEyebrow>

          <ConceptBlock
            title="From FRA to category in five steps"
            plainEnglish="Category selection under BS 5839-1:2025 is a structured decision, not a free choice. The flow runs from a legal duty (the fire risk assessment under the Regulatory Reform (Fire Safety) Order 2005) through layered design and regulatory inputs to a specific category and detector layout. Each step constrains the next; the most demanding requirement at each stage wins. A designer who picks a category from the standard first and reverse-engineers the FRA produces a system that meets the standard\'s minimum but not necessarily the responsible person\'s actual safety duty."
            onSite="When you read a fire strategy, work backwards through the flow. What FRA does it cite? What ADB clauses? What insurer requirements? What sector regulation? Does the chosen category satisfy each input? Where the strategy is silent on one of these inputs, that is a finding to flag — the missing input may be the place a future enforcement officer or loss adjuster identifies a gap."
          >
            <p>The five-step decision flow:</p>
            <ol className="list-decimal pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Fire risk assessment (RRO 2005 Article 9).</strong> The responsible person
                conducts (or commissions) a suitable and sufficient FRA. The FRA identifies the
                life-safety risks and the property-protection objectives. It produces a list of
                general fire precautions needed.
              </li>
              <li>
                <strong>Approved Document B cross-check.</strong> ADB sets the design expectations
                for new buildings and material refurbishments. Where ADB and the FRA point to
                different categories, the more demanding wins. ADB rarely prescribes BS 5839-1
                categories directly but the escape-route and detection expectations frequently
                demand L1 / L2 / L3 outcomes.
              </li>
              <li>
                <strong>Sector-specific guidance.</strong> HMO licensing, healthcare standards (HTM
                05-03), residential care home regulation, school-specific guidance, sleeping
                accommodation standards, supported housing standards. Sector guidance can demand a
                specific category or a specific detector type.
              </li>
              <li>
                <strong>Insurer requirements.</strong> Property insurers may require P-grade
                detection or specific configuration as a condition of cover. Insurer requirements
                are commercial but binding on the project.
              </li>
              <li>
                <strong>BS 5839-1:2025 selection.</strong> The most demanding category from the
                preceding inputs is selected. The detector layout, MCP siting, alarm-transmission
                arrangement, sounder design, etc., follow the BS 5839-1:2025 recommendations for
                that category. Variations from the standard are documented per clause 6.
              </li>
            </ol>
            <p>
              The output of the flow is a category specification (e.g. "L1/P1 with /M for the
              attended-hours building") and a design pack supporting it. The pack includes the FRA
              reference, the ADB reasoning, the sector reasoning, the insurer reasoning, the BS
              5839-1:2025 design (drawings, device schedules, zone plans, cause-and-effect),
              variations log, and the handover documentation.
            </p>
          </ConceptBlock>

          {/* Category selection decision flow diagram */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 sm:p-6 my-6">
            <p className="text-xs font-semibold text-elec-yellow/60 uppercase tracking-wider mb-3">
              Diagram
            </p>
            <h4 className="text-sm font-bold text-white mb-4">
              BS 5839-1:2025 category selection — risk-driven decision flow
            </h4>
            <svg
              viewBox="0 0 820 440"
              className="w-full h-auto"
              role="img"
              aria-label="Decision flow diagram. Five inputs (FRA, ADB, sector regulation, insurer, BS 5839-1:2025) feed into category selection. The most demanding input drives the choice. Outputs are the category, design pack and variations log."
            >
              <text
                x="410"
                y="24"
                textAnchor="middle"
                fill="rgba(255,255,255,0.85)"
                fontSize="12"
                fontWeight="bold"
              >
                FRA → ADB → sector → insurer → BS 5839-1:2025 → category + design pack
              </text>

              {/* Input boxes (left column) */}
              <g>
                <rect
                  x="40"
                  y="60"
                  width="200"
                  height="46"
                  rx="6"
                  fill="rgba(239,68,68,0.10)"
                  stroke="#EF4444"
                  strokeWidth="1.6"
                />
                <text
                  x="140"
                  y="80"
                  textAnchor="middle"
                  fill="#EF4444"
                  fontSize="11"
                  fontWeight="bold"
                >
                  1 · FRA (RRO 2005)
                </text>
                <text x="140" y="96" textAnchor="middle" fill="rgba(255,255,255,0.65)" fontSize="9">
                  Article 9 — responsible person
                </text>

                <rect
                  x="40"
                  y="120"
                  width="200"
                  height="46"
                  rx="6"
                  fill="rgba(251,191,36,0.10)"
                  stroke="#FBBF24"
                  strokeWidth="1.6"
                />
                <text
                  x="140"
                  y="140"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="11"
                  fontWeight="bold"
                >
                  2 · Approved Doc B
                </text>
                <text
                  x="140"
                  y="156"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9"
                >
                  Building Regulations
                </text>

                <rect
                  x="40"
                  y="180"
                  width="200"
                  height="46"
                  rx="6"
                  fill="rgba(168,85,247,0.10)"
                  stroke="#A855F7"
                  strokeWidth="1.6"
                />
                <text
                  x="140"
                  y="200"
                  textAnchor="middle"
                  fill="#A855F7"
                  fontSize="11"
                  fontWeight="bold"
                >
                  3 · Sector regulation
                </text>
                <text
                  x="140"
                  y="216"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9"
                >
                  HMO, HTM 05-03, care homes, schools
                </text>

                <rect
                  x="40"
                  y="240"
                  width="200"
                  height="46"
                  rx="6"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.6"
                />
                <text
                  x="140"
                  y="260"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="11"
                  fontWeight="bold"
                >
                  4 · Insurer requirements
                </text>
                <text
                  x="140"
                  y="276"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9"
                >
                  Property risk surveyor
                </text>

                <rect
                  x="40"
                  y="300"
                  width="200"
                  height="46"
                  rx="6"
                  fill="rgba(34,211,238,0.10)"
                  stroke="#22D3EE"
                  strokeWidth="1.6"
                />
                <text
                  x="140"
                  y="320"
                  textAnchor="middle"
                  fill="#22D3EE"
                  fontSize="11"
                  fontWeight="bold"
                >
                  5 · BS 5839-1:2025
                </text>
                <text
                  x="140"
                  y="336"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9"
                >
                  Categories L1-L5, P1, P2, M
                </text>
              </g>

              {/* Synthesis box (centre) */}
              <g>
                <rect
                  x="290"
                  y="160"
                  width="220"
                  height="120"
                  rx="10"
                  fill="rgba(251,191,36,0.06)"
                  stroke="#FBBF24"
                  strokeWidth="2"
                />
                <text
                  x="400"
                  y="184"
                  textAnchor="middle"
                  fill="#FBBF24"
                  fontSize="12"
                  fontWeight="bold"
                >
                  SYNTHESIS
                </text>
                <text
                  x="400"
                  y="206"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.8)"
                  fontSize="10"
                >
                  Most demanding input
                </text>
                <text
                  x="400"
                  y="220"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.8)"
                  fontSize="10"
                >
                  drives the category
                </text>
                <text x="400" y="244" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  Document the rationale
                </text>
                <text x="400" y="258" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="9">
                  for each input → output
                </text>
              </g>

              {/* Arrows from inputs to synthesis */}
              <line
                x1="240"
                y1="83"
                x2="290"
                y2="180"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.4"
              />
              <polygon points="290,180 282,178 286,170" fill="rgba(255,255,255,0.4)" />

              <line
                x1="240"
                y1="143"
                x2="290"
                y2="200"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.4"
              />
              <polygon points="290,200 282,198 286,191" fill="rgba(255,255,255,0.4)" />

              <line
                x1="240"
                y1="203"
                x2="290"
                y2="220"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.4"
              />
              <polygon points="290,220 282,217 285,211" fill="rgba(255,255,255,0.4)" />

              <line
                x1="240"
                y1="263"
                x2="290"
                y2="240"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.4"
              />
              <polygon points="290,240 285,250 282,242" fill="rgba(255,255,255,0.4)" />

              <line
                x1="240"
                y1="323"
                x2="290"
                y2="260"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.4"
              />
              <polygon points="290,260 286,272 281,264" fill="rgba(255,255,255,0.4)" />

              {/* Outputs (right column) */}
              <g>
                <rect
                  x="560"
                  y="100"
                  width="220"
                  height="50"
                  rx="6"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.6"
                />
                <text
                  x="670"
                  y="120"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="11"
                  fontWeight="bold"
                >
                  CATEGORY
                </text>
                <text
                  x="670"
                  y="138"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9"
                >
                  e.g. L2/P2 + /M for hotel
                </text>

                <rect
                  x="560"
                  y="170"
                  width="220"
                  height="50"
                  rx="6"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.6"
                />
                <text
                  x="670"
                  y="190"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="11"
                  fontWeight="bold"
                >
                  DESIGN PACK
                </text>
                <text
                  x="670"
                  y="208"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9"
                >
                  drawings + device schedule + cause-and-effect
                </text>

                <rect
                  x="560"
                  y="240"
                  width="220"
                  height="50"
                  rx="6"
                  fill="rgba(34,197,94,0.10)"
                  stroke="#22C55E"
                  strokeWidth="1.6"
                />
                <text
                  x="670"
                  y="260"
                  textAnchor="middle"
                  fill="#22C55E"
                  fontSize="11"
                  fontWeight="bold"
                >
                  VARIATIONS LOG
                </text>
                <text
                  x="670"
                  y="278"
                  textAnchor="middle"
                  fill="rgba(255,255,255,0.65)"
                  fontSize="9"
                >
                  all variations (2025) recorded in logbook
                </text>
              </g>

              {/* Arrows from synthesis to outputs */}
              <line
                x1="510"
                y1="200"
                x2="560"
                y2="125"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.4"
              />
              <polygon points="560,125 552,127 556,118" fill="rgba(255,255,255,0.4)" />

              <line
                x1="510"
                y1="220"
                x2="560"
                y2="195"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.4"
              />
              <polygon points="560,195 553,196 555,189" fill="rgba(255,255,255,0.4)" />

              <line
                x1="510"
                y1="245"
                x2="560"
                y2="265"
                stroke="rgba(255,255,255,0.4)"
                strokeWidth="1.4"
              />
              <polygon points="560,265 555,256 552,263" fill="rgba(255,255,255,0.4)" />

              {/* Bottom guide strip */}
              <rect
                x="40"
                y="368"
                width="740"
                height="60"
                rx="8"
                fill="rgba(251,191,36,0.06)"
                stroke="rgba(251,191,36,0.4)"
                strokeWidth="1.2"
              />
              <text
                x="410"
                y="388"
                textAnchor="middle"
                fill="#FBBF24"
                fontSize="11"
                fontWeight="bold"
              >
                Reading the diagram — top-down, left-to-right
              </text>
              <text
                x="410"
                y="404"
                textAnchor="middle"
                fill="rgba(255,255,255,0.65)"
                fontSize="9.5"
              >
                Inputs feed in order of legal weight: FRA is the master driver. ADB constrains
                design. Sector / insurer add specifics. BS 5839-1:2025 implements.
              </text>
              <text
                x="410"
                y="418"
                textAnchor="middle"
                fill="rgba(255,255,255,0.65)"
                fontSize="9.5"
              >
                Synthesis applies the "most demanding wins" rule. Outputs are the category, design
                pack and variations log.
              </text>
            </svg>
          </div>

          <RegsCallout
            source="Regulatory Reform (Fire Safety) Order 2005 · Article 9 (Risk Assessment)"
            clause={
              <>
                The responsible person must make a suitable and sufficient assessment of the risks
                to which relevant persons are exposed for the purpose of identifying the general
                fire precautions he needs to take to comply with the requirements and prohibitions
                imposed on him by or under this Order.
              </>
            }
            meaning="Three phrases earn close reading. 'Suitable and sufficient' — proportionate to the risk and informed by competent assessment; an FRA that omits the building's actual use, occupancy or geometry is not suitable and sufficient. 'Relevant persons' — anyone lawfully on the premises plus anyone in the immediate vicinity at risk. 'General fire precautions' — includes the fire-detection and warning system, so the BS 5839-1:2025 category selection is part of acting on the FRA's findings."
          />

          <InlineCheck
            id={inlineChecks[0].id}
            question={inlineChecks[0].question}
            options={inlineChecks[0].options}
            correctIndex={inlineChecks[0].correctIndex}
            explanation={inlineChecks[0].explanation}
          />

          <SectionRule />

          <ContentEyebrow>
            Documentation — what BS 5839-1:2025 21 now requires at handover
          </ContentEyebrow>

          <ConceptBlock
            title="The cause-and-effect matrix as a 2025 deliverable"
            plainEnglish="BS 5839-1:2025 21 (documentation/handover) introduces a recommendation that handover documentation include a cause-and-effect matrix or text description of how the cause and effect operates. The 2017 edition often had handover packs that detailed the as-built layout but said nothing about behaviour — what does the system actually do when an alarm is triggered? The 2025 revision closes that gap. For a simple system, the description can be as short as 'this system operates as a simultaneous evacuation: any alarm input causes all sounders to operate'. For complex systems (phased evacuation, zoned response, ancillary outputs, inter-system links), a formal cause-and-effect matrix is needed."
            onSite="When you receive a 2025-design handover pack, look for the cause-and-effect description. If it is missing, the pack is incomplete — request the missing element from the contractor before sign-off. When you produce a handover pack as a contractor, include the cause-and-effect description as a standard deliverable. The format depends on system complexity but the content is mandatory."
          >
            <p>What the cause-and-effect description should cover:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Inputs.</strong> Each detector type, MCP, ancillary input (sprinkler-flow,
                kitchen-hood activation, lockdown initiation, panel manual-evacuate). Listed by zone
                and by device.
              </li>
              <li>
                <strong>Outputs.</strong> Each sounder zone, voice-alarm zone, ancillary output
                (door release, lift homing, ventilation shutdown, ARC transmission, smoke-control
                fan activation).
              </li>
              <li>
                <strong>Mappings.</strong> Which input drives which output, with timings (immediate
                / delayed / phased), conditional logic (if X and Y then Z), and override rules
                (manual evacuation overrides phased; staff alarm latches to general alarm after X
                minutes).
              </li>
              <li>
                <strong>Default behaviour.</strong> What happens on a fire alarm signal (the
                headline behaviour, the simplest case).
              </li>
              <li>
                <strong>Special cases.</strong> Out-of-hours behaviour (system in unattended mode);
                day/night detector sensitivity changes; coincidence filtering; pre-alarm response.
              </li>
              <li>
                <strong>Reset.</strong> What is required to reset the system after an alarm (key
                operation, log entry, post-alarm checks).
              </li>
            </ul>
            <p>
              The cause-and-effect description supports later modifications, maintenance and
              post-incident investigation. A modification proposal must be evaluated against the
              existing behaviour; a maintenance test plan needs to know what each input is supposed
              to do; an investigation needs to compare actual behaviour during an incident with
              specified behaviour. Without the description, all three are guesswork.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · 21 (documentation/handover)"
            clause={
              <>
                A new item that appears within the documentation clause of BS 5839-1:2025 is the
                recommendation that a cause-and-effect matrix or text description of how the cause
                and effect operates is included with the documentation to be provided to the
                purchaser or user of the system. This could be as simple as "this system operates as
                a simultaneous evacuation" or a cause-and-effect matrix document might be required
                for more complex strategies. The standard does not dictate the manner of the
                cause-and-effect matrix only that it needs to be produced.
              </>
            }
            meaning="Two phrases earn close reading. 'A cause-and-effect matrix or text description' — format is flexible; content is mandatory. 'The standard does not dictate the manner ... only that it needs to be produced' — the deliverable is the description; the form depends on complexity. A one-line text description can be sufficient for a simple system; a formal matrix is needed for complex ones."
          />

          <ConceptBlock
            title="Other 2025 documentation updates"
            plainEnglish="Beyond the cause-and-effect description, BS 5839-1:2025 updates several other documentation expectations. The system logbook (clause 25, Annex H — was Annex F in 2017) records ALL variations from the standard, not just 'major' ones (the 2017 wording, with no definition of major). Modifications and extensions per clause 24 produce an extension or modification certificate. Firmware updates are now classed as modifications and require a certificate. Servicing visits are recorded in the logbook with the date, the engineer, and the list of checks performed."
          >
            <p>The 2025 documentation pack should include:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>As-built drawings.</strong> Showing detector locations, MCPs, sounders,
                panel position, cable routes (where relevant), zone boundaries.
              </li>
              <li>
                <strong>Device schedule.</strong> Each device by location, type, address (for
                addressable systems), zone.
              </li>
              <li>
                <strong>
                  Zone plan (or other suitable diagrammatic representation per 22.2.5).
                </strong>{' '}
                Required in any premises with more than one zone on any storey, especially in
                premises with sleeping accommodation. Absence is one of the variations that is NOT
                acceptable.
              </li>
              <li>
                <strong>Cause-and-effect description or matrix (NEW for 2025).</strong> Behaviour of
                the system on each input.
              </li>
              <li>
                <strong>System logbook.</strong> Records of acceptance, services, modifications,
                fault calls, false alarms (with categorisation), variations.
              </li>
              <li>
                <strong>Acceptance certificate.</strong> Issued at commissioning.
              </li>
              <li>
                <strong>Extension or modification certificates.</strong> Issued for any changes
                including firmware updates (NEW for 2025 — firmware now explicitly a modification).
              </li>
              <li>
                <strong>Operating and maintenance manual.</strong> Tells the user how to operate,
                test (user-led tests), reset, log faults, schedule servicing.
              </li>
              <li>
                <strong>FRA reference.</strong> The fire risk assessment supporting the category
                choice and the design.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Variations — BS 5839-1:2025 6, the new rules</ContentEyebrow>

          <ConceptBlock
            title="What is a variation, and what changed in 2025"
            plainEnglish="A variation is a departure from a recommendation in BS 5839-1:2025 — for example, omitting a detector from a room that the standard would normally cover, or using a detector type that the standard does not normally permit. The 2017 edition was permissive: any departure could be agreed as a variation between the designer, the responsible person and (where appropriate) the enforcing authority. The 2025 revision tightens the regime in two specific ways: certain departures are no longer acceptable (they cannot be agreed as variations); ALL variations (not just 'major' ones — the 2017 wording with no definition of major) must now be recorded in the system logbook."
          >
            <p>The 2025 NOT-acceptable variations:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Absence of a zone plan (or other suitable diagrammatic representation as recommended
                in 22.2.5) in premises with more than one zone on any storey, particularly premises
                in which people sleep.
              </li>
              <li>
                Absence of a facility for transmission of fire alarm signals to an ARC in either:
                supported housing where the facility is necessary to meet the recommendations of BS
                5839-1 (Grade A per BS 5839-6:2019); OR a residential care home.
              </li>
            </ul>
            <p>The 2025 variations recording requirement:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                Every variation (not just major ones) must be recorded in the system logbook with
                the rationale and any agreement with the responsible person, the enforcing authority
                or the insurer.
              </li>
              <li>
                Variations proposed at installation or commissioning stage need particular
                justification — they are no longer routinely acceptable as last-minute compromises.
              </li>
              <li>
                The Annex H format (was Annex F in 2017) is updated to reflect the broader scope.
              </li>
            </ul>
            <p>
              The 2025 changes are designed to close two practical loopholes seen in 2017-era
              installations: missing zone plans in sleeping premises (because nobody enforced
              "major" recording for diagrammatic representation), and missing ARC transmission in
              vulnerable-occupant settings (where cost-driven variations were common).
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · 6 (variations)"
            clause={
              <>
                Whilst BS 5839-1:2025 is a code of practice, and variations against the
                recommendations of the standard are allowed, it has now been recognised that the
                following departures from the recommendations of BS 5839-1:2025 are likely to be so
                detrimental to the safety of life that they should not be regarded as acceptable
                variations.
              </>
            }
            meaning="Three phrases earn close reading. 'Code of practice' — variations are part of the standard\'s design. 'So detrimental to the safety of life' — the prohibited departures are calibrated to safety, not to convenience. 'Should not be regarded as acceptable variations' — language is firm; this is closer to a prohibition than a recommendation. Designers and contractors who try to agree these variations under 2025 are not in compliance."
          />

          <CommonMistake
            title="Recording only 'major' variations as if 2017 wording still applied"
            whatHappens="A contractor commissioning a 2025-designed L2 hotel system records two variations in the logbook: (i) a heat detector replaced with a multi-sensor in one bedroom; (ii) an MCP relocated by 1.5 m to avoid a structural beam. The contractor regards these as 'minor' and does not record several other smaller departures (a sounder volume slightly below the standard's recommended figure in one bedroom; a detector sited slightly above the standard's distance limit from a wall in a corridor). At a routine audit, the auditor identifies the missing variations and notes the system logbook is incomplete under BS 5839-1:2025 25. The contractor must retrospectively investigate each variation, document the rationale, and update the logbook — adding administrative cost to a project that was supposed to be closed."
            doInstead="Under the 2025 rules, ALL variations from the standard\'s recommendations go in the logbook. A variation is any departure, however small. If you are debating whether something is a variation, write it up — administrative effort is cheap, and audit findings are not. The 2017 'major variation only' wording is gone."
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
            Maintenance — BS 5839-1:2025 43.2.1 and the 5-to-7-month window
          </ContentEyebrow>

          <ConceptBlock
            title="The new servicing-interval rule"
            plainEnglish="BS 5839-1:2025 43.2.1 changes the long-standing maintenance-interval rule. The 2017 edition specified that the period between successive servicing visits should not exceed six months, with non-compliance asserted if the limit was breached. The 2025 revision changes the wording to 'approximately 6 months', with Note 1 clarifying that any interval between 5 months and 7 months after the previous service is acceptable. Note 2 specifies that the date of acceptance (when the system was first put into service) is the datum for the period. The change reflects custom and practice — servicing organisations commonly book a month either side of the strict 6-month line for operational reasons, and this was already considered acceptable; the 2025 wording formalises it."
            onSite="When you arrange or audit the maintenance schedule, the binding rule is that successive services are within 5-to-7 months of each other, dated from the previous service. If a service slips beyond 7 months, the system is non-compliant; if a service is conducted earlier than 5 months before the previous one, it does not reset the clock — the next-due date is still measured from the previous full service. Annual (12-monthly) services include additional checks (per 22 — functional testing of smoke detectors in ventilation ducts is now explicitly listed) and remain a separate scheduling item from the 6-monthly cycle."
          >
            <p>2025 maintenance scheduling rules:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Approximately 6-monthly servicing.</strong> Successive services within 5 to
                7 months of each other.
              </li>
              <li>
                <strong>Datum.</strong> Date of acceptance (when the system was first put into
                service) for the very first interval; thereafter, each service\'s date is the datum
                for the next.
              </li>
              <li>
                <strong>12-monthly checks.</strong> The annual service includes additional checks:
                functional testing of smoke detectors in ventilation ducts (NEW for 2025); zone
                verification (zone identification on the CIE matches the zone plan); checking the
                time clock and day/night settings; verifying ARC alarm transmission of all signal
                types (fire, fault, etc.); reviewing the false-alarm rate and trigger investigation
                if the rates exceed the BS 5839-1:2025 30 thresholds.
              </li>
              <li>
                <strong>Remote indicator check.</strong> Annual — visible, unobstructed, operating
                (per 12 — see Module 1.3).
              </li>
              <li>
                <strong>Cyber security review.</strong> Per 43.4 — appropriate for IP-connected
                systems; risk assessment of remote-service operations.
              </li>
              <li>
                <strong>Battery condition.</strong> Service visits include battery condition checks;
                end-of-life batteries are replaced and the new installation date labelled (per 16).
              </li>
              <li>
                <strong>Logbook update.</strong> Every service visit recorded in the logbook with
                date, engineer, checks performed, defects raised, false alarms reviewed.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · 43.2.1 (interval between servicing visits)"
            clause={
              <>
                The recommendations in this subclause should be carried out by a competent person.
                Successive inspection and servicing visits should be undertaken at intervals of
                approximately 6 months. NOTE 1: It would be acceptable for one inspection, test and
                service of the system to be carried out any time between 5 months and 7 months after
                the previous inspection, test and service. NOTE 2: The date of acceptance is to be
                regarded as the datum for these periods.
              </>
            }
            meaning="Three phrases earn close reading. 'Competent person' — the servicing engineer must have the training, experience and continuing professional development to carry out the servicing correctly. 'Approximately 6 months ... 5 months and 7 months' — the 2017 strict rule is replaced with a 5-to-7-month window. 'Date of acceptance is to be regarded as the datum' — first interval measured from acceptance, then each subsequent service is the datum for the next."
          />

          <SectionRule />

          <ContentEyebrow>Modifications and firmware updates — BS 5839-1:2025 24</ContentEyebrow>

          <ConceptBlock
            title="What now counts as a modification"
            plainEnglish="BS 5839-1:2025 24 (extensions and modifications) updates the modification regime. The 2017 edition required a modification certificate after any modification but the wording on what constituted a modification was inconsistent. The 2025 revision now explicitly classes a firmware update of the CIE as a modification — the first edition to do so. The reasoning is that firmware updates can change cause-and-effect behaviour, alarm-transmission timing, false-alarm filtering and diagnostic output. A firmware update is a modification because it modifies how the system behaves, even if no hardware changes. The certificate produced after any extension or modification is now called an 'extension or modification certificate' (was 'modification certificate' under 2017)."
            onSite="When you carry out maintenance, ask whether the work changed firmware. If yes, produce an extension or modification certificate even if no hardware was touched. When you commission an extension, the work-spec\'s certificate covers both the new equipment and any firmware updates applied to existing equipment. The logbook should reference the certificate. Where a system has been modified and existing equipment is no longer in use, the redundant equipment should either be removed (where practicable) or clearly identified as no longer in use — to avoid confusion at later inspections."
          >
            <p>The 2025 modification handling rules:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Extension certificate.</strong> Issued when new works are added — extra
                detectors, additional zones, an extended building. The new works should comply with
                the current version of the standard (BS 5839-1:2025), even if the existing system
                was designed to an earlier edition. The standard acknowledges that the overall
                system may not conform fully to the current standard; the extension itself does.
              </li>
              <li>
                <strong>Modification certificate.</strong> Issued when existing equipment or
                configuration is changed — replacing a panel, changing detector types, updating
                cause-and-effect, changing zone boundaries. NEW: firmware updates are modifications.
              </li>
              <li>
                <strong>Redundant equipment.</strong> Equipment that is no longer in use should be
                removed where practicable. If left in place, it should be clearly identified as no
                longer in use to avoid confusion at later inspections.
              </li>
              <li>
                <strong>Logbook.</strong> Every modification recorded in the logbook with the
                certificate reference.
              </li>
              <li>
                <strong>Cause-and-effect update.</strong> Any modification that affects behaviour
                must be reflected in an updated cause-and-effect description.
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 5839-1:2025 · 24 (extensions and modifications)"
            clause={
              <>
                The certificate that should be issued after any extension or modification has been
                completed has been updated from a modification certificate to an extension or
                modification certificate. It has now been clarified that updating the firmware of a
                CIE is a modification and as such will require a certificate to be produced.
              </>
            }
            meaning="Two phrases earn close reading. 'Extension or modification certificate' — the broader name reflects that extensions (adding new equipment) and modifications (changing existing equipment or behaviour) both produce a certificate; the 2017 'modification certificate' wording was narrower. 'Updating the firmware ... is a modification' — explicit recognition that firmware changes count, removing the previous edition\'s ambiguity."
          />

          <CommonMistake
            title="Updating panel firmware on a routine maintenance visit and not producing a modification certificate"
            whatHappens="A servicing engineer downloads a panel firmware update during a routine 6-monthly visit, applies it to the CIE, verifies the system operates, and moves on. No modification certificate is produced; no logbook entry beyond the routine service log. Twelve months later, a small false-alarm investigation reveals that the firmware update changed the system\'s alarm-transmission timing — the fire signal now reaches the ARC in 95 seconds rather than the design 75 seconds. The change is within the BS 5839-1:2025 14.17 limit (90 s for L systems is the maximum) but is a behaviour change that nobody documented. The investigator notes the missing modification certificate as a compliance gap and the timing-creep as a system-performance issue."
            doInstead="From BS 5839-1:2025 onwards, treat every firmware update as a modification. Produce an extension or modification certificate. Record the firmware version in the certificate and the logbook. Review the cause-and-effect description for any behavioural changes. Re-test the alarm-transmission timing and document the result. The administrative cost is small; the compliance and behaviour-tracking benefits are substantial."
          />

          <SectionRule />

          <ContentEyebrow>Cyber security and remote services — BS 5839-1:2025 43.4</ContentEyebrow>

          <ConceptBlock
            title="Why fire-alarm systems are now cyber-security-relevant"
            plainEnglish="The 2025 revision adds a new clause (43.4) on remote services and cyber security. The driver is the increasing prevalence of IP-connected fire panels, gateways and management systems — features that allow remote monitoring, remote diagnostics and remote configuration, but also expose the system to unauthorised access. The 2025 recommendations cover physical access controls (locking the comms cabinet, fitting anti-tamper plugs to patch leads), logical access controls (authentication of remote-access requests in the CIE or gateway software), and risk assessment of remote-service operations (read, control, write functions all carry different risk profiles). Where remote service might compromise correct CIE functioning, the responsible individual must ensure the system is fully operational on completion."
          >
            <p>2025 cyber-security recommendations summarised:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Physical access controls.</strong> Locking the comms cabinet; anti-tamper
                plugs on patch leads; physical-key access to the CIE; tamper-evident seals on
                critical interfaces.
              </li>
              <li>
                <strong>Logical access controls.</strong> Authentication of remote-access requests
                in the CIE or gateway software. Strong passwords; multi-factor authentication where
                supported; logging of all remote-access events.
              </li>
              <li>
                <strong>Risk assessment of remote operations.</strong> Read operations (viewing
                status, downloading logs) carry low risk; control operations (silencing an alarm,
                resetting the system) carry medium risk; write operations (changing configuration,
                applying firmware) carry the highest risk. Each category needs proportionate
                authentication and approval.
              </li>
              <li>
                <strong>Operational verification.</strong> After any remote-service operation, the
                responsible individual must verify the system is fully operational. Remote
                operations that do not include this verification step risk leaving the system in an
                indeterminate state.
              </li>
              <li>
                <strong>Logging.</strong> Remote-service operations are logged in the system logbook
                with date, operator, operation, verification.
              </li>
            </ul>
          </ConceptBlock>

          <Scenario
            title="The 2026 multi-tenanted office building"
            situation="A new multi-tenanted office building is being designed in 2026. The building has 8 floors, mixed tenancy (small offices, single open-plan tenant on the top three floors, a back-of-house plant area, no sleeping use). The fire risk assessment identifies life safety as the primary objective; the property insurer requires P2-grade detection in the plant area and the data-room on each floor. The building owner is the responsible person; tenants are duty-holders within their demised areas. The fire strategy recommends an L1/P2 hybrid."
            whatToDo="Apply the decision flow. FRA — identifies life safety as primary; supports L1 (high cover, large building, complex evacuation). ADB — for a new multi-tenanted office, ADB drives towards comprehensive cover; consistent with L1. Sector — there is no sector-specific guidance demanding more than L1 here. Insurer — adds P2 in plant and data-room. Selection — L1/P2 hybrid: L1 cover throughout the protected building; P2 cover specifically documented for the plant area and data rooms (the same physical detectors typically serve both objectives where the L1 layout already covers those rooms; documentation states both objectives explicitly). Apply the 2025 changes: heat detectors NOT permitted in any sleeping rooms (none in this building, but the rule is in scope); stairway lobbies must have automatic detection; void-wall wording applies wherever an L3 zone-comparison is relevant (in this L1 design, all areas have detection so the void-wall question is more limited); top-of-flue detector for any flue-like structures (atrium, lift shafts open to corridors). Documentation: cause-and-effect description (per 21); ALL variations recorded in the logbook (per 6); zone plan present (multi-zone building so absence is a NOT-acceptable variation); ARC transmission with 14.17 / 14.18 timing tested at commissioning; firmware updates recorded as modifications (per 24); cyber-security review per 43.4. Servicing schedule: 6-monthly with 5-to-7-month window; annual service includes the BS 5839-1:2025 22 additional checks."
            whyItMatters="A 2026 hybrid design must apply every relevant 2025 change. The decision flow prevents the contractor from accidentally specifying an inappropriate category (e.g. M based on cost). The documentation rules prevent the system being handed over without behaviour records. The variations rules prevent the system being modified silently. The maintenance and modification rules keep the system performant over its life. Skipping any one of these breaks compliance even if the headline category looks correct."
          />

          <Scenario
            title="The legacy care home with a 2017 system facing a refurbishment"
            situation="A residential care home was fitted with an L1 system in 2018 (under BS 5839-1:2017). The system has been maintained correctly and is fully operational. The care home owner is planning a major refurbishment in 2026 that will add four new bedrooms, replace the panel, and update the firmware on all detectors. The contractor is preparing the design pack."
            whatToDo="The major refurbishment + panel replacement + firmware update is 'undergoing new works' for the purposes of BS 5839-1:2025 retrospectivity. The 2025 rules apply. Apply each change: (i) heat detectors removed from any sleeping rooms — confirm bedrooms have smoke or multi-sensor detection (not heat); (ii) stairway lobbies have automatic detection (2025 rule applied); (iii) any flue-like structures have top-of-flue detection (verify against the building geometry); (iv) ARC transmission is mandatory (residential care home — BS 5839-1:2025 6 lists absence as a NOT-acceptable variation); the new system must include ARC transmission with 14.17 timing (90 s); (v) zone plan is present (more than one zone in a sleeping building — absence is a NOT-acceptable variation); (vi) cable colour single common colour, red preferred; functional earth pink or 'FE' (was cream); (vii) cause-and-effect description produced (per 21 — new for 2025); (viii) ALL variations recorded in the logbook (per 6); (ix) firmware update produces a modification certificate (per 24 — new for 2025); (x) cyber-security review per 43.4. The four new bedrooms and the panel replacement comply with the current standard; the existing pre-2026 detectors that remain in service from the 2018 install need not be brought into the 2025 standard unless they are replaced — the standard allows for the overall system to not fully conform when an extension is added (per 24). Document carefully."
            whyItMatters="The retrospectivity rule (changes apply on next material works) is the trigger that brings older systems into the 2025 envelope. A care home with a 2018 L1 system that goes through a 2026 refurbishment must apply all the relevant 2025 changes — the rules cannot be silently bypassed. The documentation, variations and modifications rules ensure the resulting system\'s configuration is recorded clearly so future inspectors and engineers can see what was done."
          />

          <CommonMistake
            title="Treating the 2025 changes as 'not yet enforced' and continuing to design to 2017"
            whatHappens="A contractor with a strong 2017-era practice continues into 2026 specifying systems to BS 5839-1:2017 because the team is familiar with the rules and the changes are 'just a code of practice'. A small care home accepts a 2017-design L2 system with heat detectors in bedrooms in 2026 because the contractor recommends it. The system is installed and signed off. An enforcement review identifies the heat detectors as non-compliant with BS 5839-1:2025 (sleeping rooms now require non-heat detection in new L2 designs); the missing cause-and-effect description as a documentation gap; and the missing ARC transmission as a NOT-acceptable variation. The care home is required to retrofit at significant cost and the contractor faces reputational damage and possible joint liability."
            doInstead="From the publication of BS 5839-1:2025 onwards, design and install to 2025. The standard is the recognised code of practice; designing to a withdrawn edition is not defensible after the new edition\'s publication. Update office templates, design checklists, commissioning procedures and training — every team member should know the 2025 changes that affect their daily work. The 2025 / 2026 transition is the busy period; getting it right early is cheaper than retrofitting later."
          />

          <InlineCheck
            id={inlineChecks[2].id}
            question={inlineChecks[2].question}
            options={inlineChecks[2].options}
            correctIndex={inlineChecks[2].correctIndex}
            explanation={inlineChecks[2].explanation}
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
            BS 7671 cross-reference — supply, AFDDs and Section 560 in selection
          </ContentEyebrow>

          <ConceptBlock
            title="Coordinating fire-alarm category selection with electrical-installation design"
            plainEnglish="Fire-alarm systems are safety services under BS 7671 Section 560. Whatever BS 5839-1:2025 category is selected, the supporting electrical installation must respect Section 560: cable type, identification, segregation, supply integrity. The BS 7671 A4:2026 amendment (effective 2026) makes several changes that interact with fire-alarm design: TN-C-S (PNB) earthing arrangement clarifications affect supply-side wiring; AFDD provisions in higher-risk premises (sleeping accommodation, certain HMOs) reduce the chance of an electrical-fault fire that the fire alarm would need to detect; A4:2026 also updates schedule columns (model form changes) that affect EIC documentation. The fire-alarm designer should coordinate with the electrical contractor on a project — sharing the BS 5839-1:2025 category specification and receiving the BS 7671 A4:2026 design constraints as inputs."
          >
            <p>Specific coordination items:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[14px]">
              <li>
                <strong>Cable colour and identification.</strong> BS 5839-1:2025 16 — single common
                colour, red preferred; functional earth pink or 'FE'. BS 7671 A2:2022 / IEC 60445 —
                same identification convention.
              </li>
              <li>
                <strong>AFDD provision.</strong> BS 7671 A4:2026 expands AFDD requirements;
                higher-risk premises increasingly require AFDDs upstream of fire-alarm circuits.
                AFDDs reduce ignition risk — directly complementing fire detection.
              </li>
              <li>
                <strong>Section 560 supply continuity.</strong> Continuous availability of supply is
                load-bearing for fire alarms; standby battery and backup arrangements must be
                designed in coordination with the electrical contractor.
              </li>
              <li>
                <strong>TN-C-S (PNB) earthing.</strong> A4:2026 clarifies earthing arrangements; the
                fire-alarm panel\'s earthing must be consistent with the building\'s installation
                earthing.
              </li>
              <li>
                <strong>EIC schedule column updates.</strong> A4:2026 updates the schedule columns
                in the model EIC; if the fire alarm is part of the documented installation, the EIC
                documentation reflects the updated columns.
              </li>
              <li>
                <strong>Section 560 segregation.</strong> Fire alarm circuits are segregated from
                other circuits to prevent fault propagation. Coordinated by both standards.
              </li>
              <li>
                <strong>Annual fire alarm vs annual EIC inspections.</strong> Both are time-cycled;
                schedule them together to minimise disruption.
              </li>
            </ul>
          </ConceptBlock>

          <SectionRule />

          <KeyTakeaways
            title="What to remember on site"
            points={[
              'Category selection is risk-driven. Decision flow: FRA (RRO 2005) → ADB → sector regulation → insurer → BS 5839-1:2025 implementation. Most demanding wins.',
              'The Regulatory Reform (Fire Safety) Order 2005 Article 9 places the FRA duty on the responsible person — non-delegable.',
              'BS 5839-1:2025 21 — handover documentation must include a cause-and-effect matrix or text description.',
              'BS 5839-1:2025 6 — all variations (not just "major" ones) recorded in the system logbook. Two NOT-acceptable variations: zone plan absence in multi-zone sleeping premises; ARC transmission absence in supported housing or residential care homes.',
              'BS 5839-1:2025 43.2.1 — servicing approximately 6-monthly with a 5-to-7-month window. 2017 strict rule replaced.',
              'BS 5839-1:2025 24 — firmware updates are modifications, requiring an extension or modification certificate. Redundant equipment removed or clearly marked.',
              'BS 5839-1:2025 43.4 — cyber-security: physical and logical access controls, authentication, risk assessment of remote operations, operational verification.',
              'Documentation pack: as-built drawings, device schedule, zone plan, cause-and-effect, logbook, certificates, O&M manual, FRA reference.',
              'BS 7671 Section 560 (safety services) and A4:2026 cross-references: cable colour single common red, functional earth pink/FE, AFDD provision in higher-risk premises, supply continuity, segregation.',
              '2025 changes are not retrospective — existing systems remain compliant until material works trigger redesign. On any extension, modification, panel replacement or firmware update, apply 2025.',
              'Designers and contractors must understand which 2025 changes admit variations and which do not. The NOT-acceptable list (clause 6) cannot be agreed away.',
            ]}
          />

          <FAQ
            items={[
              {
                question:
                  'Who decides what BS 5839-1:2025 category a building needs — the contractor, the responsible person, or someone else?',
                answer:
                  'The responsible person decides, supported by the fire risk assessment under the Regulatory Reform (Fire Safety) Order 2005 and informed by Approved Document B, sector-specific regulation, and the property insurer\'s requirements. The fire-alarm contractor is an adviser implementing the decision; the contractor cannot unilaterally choose a category, and "the client asked for X" is not a defence against an inappropriate-category finding.',
              },
              {
                question:
                  'What goes in the cause-and-effect description that BS 5839-1:2025 21 now requires at handover?',
                answer:
                  'For a simple system: a one-line text description of behaviour ("this system operates as a simultaneous evacuation"). For complex systems: a formal matrix listing each input device, each output zone, and the mappings between them with timings and conditional logic. The standard does not dictate format — just that the description is produced and given to the user with the rest of the handover pack.',
              },
              {
                question: 'Are the BS 5839-1:2025 changes retrospective?',
                answer:
                  'No. Existing systems compliant with BS 5839-1:2017 remain compliant. The 2025 rules apply to new designs and to existing systems undergoing material works (extension, modification, panel replacement, firmware update, system upgrade). On any such trigger, the relevant 2025 changes must be applied to the affected scope.',
              },
              {
                question:
                  'My care home wants to omit ARC transmission to save monitoring fees. Can I agree this as a variation?',
                answer:
                  'No. BS 5839-1:2025 6 explicitly identifies the absence of ARC transmission in residential care homes (and in supported housing where Grade A is necessary) as a variation that is NOT acceptable. The 2017 edition allowed it; the 2025 edition removes the option. The system must include ARC transmission. Cost reduction must come from the choice of ARC and monitoring service-level, not from omission.',
              },
              {
                question:
                  'Does a firmware update of the fire panel really need a modification certificate?',
                answer:
                  'Yes — BS 5839-1:2025 24 explicitly says so. Firmware updates can change cause-and-effect behaviour, alarm-transmission timing, false-alarm filtering and diagnostic output. The modification certificate documents the change, the firmware version installed, and any behaviour changes; it goes in the system logbook. Skipping the certificate creates an audit gap and a compliance finding.',
              },
              {
                question:
                  'What is the practical difference between the 2017 "no more than 6 months" rule and the 2025 "5 to 7 months" rule?',
                answer:
                  'Operationally similar. The 2017 strict rule meant a 6-month-and-a-day service was technically non-compliant; service organisations routinely scheduled to a target a week or two before the strict line to avoid drift. The 2025 rule formalises a 5-to-7-month window. In practice, well-run contracts continue to target the 6-month line; the wider window provides flexibility for operational reasons (engineer leave, customer scheduling, weather) without creating a compliance gap.',
              },
              {
                question: 'How does BS 7671 A4:2026 affect my BS 5839-1:2025 fire-alarm design?',
                answer:
                  'Several touchpoints: cable colour (both standards align on red, single common colour); functional earth identification (pink or "FE" in both, replacing cream); Section 560 (safety services) continues to govern fire alarm circuits; A4:2026 expands AFDD provision in higher-risk premises (sleeping accommodation, certain HMOs) which reduces ignition risk; A4:2026 clarifies TN-C-S (PNB) earthing affecting supply-side design; A4:2026 updates schedule columns in the model EIC. Coordinate with the electrical contractor at design stage.',
              },
              {
                question:
                  'A modification reduces detector count in a low-risk area. Is the responsible person required to revise the FRA?',
                answer:
                  "Yes — any change in the protective measures may affect the risk picture. The responsible person's duty under RRO 2005 Article 9 is continuous; the FRA must be reviewed and (if necessary) revised when significant changes occur. A reduction in detector count is significant. The fire-alarm contractor should require an FRA review as part of the modification's acceptance, ensuring that the responsible person has explicitly accepted the residual risk.",
              },
            ]}
          />

          <SectionRule />

          <ContentEyebrow>Knowledge check</ContentEyebrow>
          <Quiz
            title="Category selection and risk assessment — Module 1.4"
            questions={quizQuestions}
          />

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
              onClick={() => navigate('/electrician/upskilling/fire-alarm-course/module-2')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">Module 2</div>
            </button>
          </div>

          <div className="hidden">
            <ClipboardCheck />
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default FireAlarmModule1Section4;
