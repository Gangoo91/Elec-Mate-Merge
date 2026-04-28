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
  AmendmentBadge,
  RegBadge,
} from '@/components/study-centre/learning';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm8s3-publication-dates',
    question:
      'BS 7671:2018+A4:2026 was published on 15 April 2026. From which date may you NO LONGER issue a certificate against BS 7671:2018+A3:2024?',
    options: [
      '15 April 2026 — A4 supersedes A3 immediately on publication',
      '15 October 2026 — A4 and A3 may both be cited during the six-month transition; A3 is fully withdrawn from this date',
      '1 January 2027 — calendar-year transition',
      'There is no fixed withdrawal date — the designer chooses',
    ],
    correctIndex: 1,
    explanation:
      'A4:2026 was published 15 April 2026 and is in force from that date. A3:2024 remains valid alongside A4 for a six-month transition window, ending 15 October 2026. From 16 October 2026, every newly designed installation must be certified against A4 only — citing A3 is a documented departure under Reg 120.3 from that date.',
  },
  {
    id: 'm8s3-411-3-4-headline',
    question:
      "Which of the following is the SINGLE biggest practical change A4:2026 brings to a domestic rewire designer's day-to-day spec sheet?",
    options: [
      'A new 50 mA limit for general-purpose RCDs',
      'Reg 411.3.4 — every AC final circuit supplying luminaires within domestic (household) premises now requires 30 mA RCD additional protection',
      'Mandatory Type B RCDs on every domestic circuit',
      'A new requirement to test EFLI to 0.05 Ω',
    ],
    correctIndex: 1,
    explanation:
      'A4 introduces Reg 411.3.4 — the headline change. Within domestic premises, AC final circuits supplying luminaires must have 30 mA RCD additional protection. There is no risk-assessment exception (unlike Reg 411.3.3 (b) for non-domestic sockets). Practically, every dwelling rewire from 15 April 2026 is RCBO-per-circuit at the consumer unit unless an alternative protective measure is engineered.',
  },
  {
    id: 'm8s3-deleted-443',
    question:
      'A designer presents a CRL surge-protection risk assessment using "the method in Annex A443" to justify omitting an SPD on a small commercial unit. What is the correct response under A4:2026?',
    options: [
      'Accept it — the CRL method is the BS 7671 default',
      'Reject it — Reg 443.5, Annex A443, Appendix 17 and Annex B443 (the CRL risk-assessment route) have all been DELETED in A4:2026; SPD selection is now driven by Reg 443.4 directly',
      'Accept it only if the CRL value is below 1000',
      'Accept it for non-domestic only',
    ],
    correctIndex: 1,
    explanation:
      'A4 deletes the CRL risk-assessment method entirely. Reg 443.5 (the CRL clause), Annex A443 (worked examples), Appendix 17 and Annex B443 are all withdrawn. SPD requirements now run through Reg 443.4 — SPDs are required where the consequence of overvoltage affects safety of human life, public services, commercial / industrial activity, or many co-located individuals. The "low CRL = no SPD" shortcut no longer exists.',
  },
  {
    id: 'm8s3-419-ads-not-feasible',
    question:
      'On an old TT installation with multiple long sub-mains, the designer cannot achieve 0.4 s disconnection on every final circuit even with a 30 mA RCD. Which A4 regulation provides the framework for an alternative protective measure?',
    options: [
      'Reg 411.3.4 — fit a 30 mA RCD on each luminaire circuit',
      'Reg 419 group (new in A4) — defines the requirements that apply where ADS as a protective measure is not feasible, including the use of supplementary equipotential bonding, electrical separation or Class II equivalence',
      'Reg 461.2 — switch the PEN',
      'Reg 530.3.201 — install a bidirectional meter',
    ],
    correctIndex: 1,
    explanation:
      'A4 introduces a renumbered/expanded Reg 419 (419.1 in particular) covering the case where ADS cannot be made feasible. The route is to apply an alternative protective measure: supplementary equipotential bonding sized per Reg 415.2.1, electrical separation per Section 413, double / reinforced insulation per Section 412 or non-conducting location. This formalises what was previously ad-hoc designer-departure logic under Reg 120.3.',
  },
  {
    id: 'm8s3-722-ev-pen',
    question:
      'A4:2026 introduces Reg 722.312.2.1. What does this regulation prohibit on a TN-system EV-charging circuit?',
    options: [
      'Using any RCD other than Type B',
      'Including a PEN conductor in the circuit supplying EV charging equipment',
      'Connecting to the dwelling consumer unit',
      'Using a 32 A protective device',
    ],
    correctIndex: 1,
    explanation:
      'Reg 722.312.2.1 (A4): "A circuit supplying charging equipment for electric vehicles in a TN system shall not include a PEN conductor." This formalises the EV-PEN ban. Either configure the EV circuit as TN-S (split N and PE before the EV final circuit) or apply one of the Section 722 alternatives — open-PEN detection device, separate earth electrode for the EV. The reasoning: an open PEN with a Class I vehicle body in a wet environment becomes a significant touch-current hazard.',
  },
  {
    id: 'm8s3-411-3-3-amended',
    question:
      'A4 amends Reg 411.3.3 (sockets ≤ 32 A). Which exception did A4 PRESERVE, and which categories are now explicitly UN-exceptable?',
    options: [
      'No exceptions — A4 removed all socket exceptions',
      'Category (b) — sockets in non-dwelling locations — remains exceptable via documented risk assessment by a skilled person (electrically); category (a) sockets used by ordinary persons / children and category (c) mobile equipment outdoors are explicitly un-exceptable',
      'All three categories may be excepted with a risk assessment',
      'Only mobile equipment may be excepted',
    ],
    correctIndex: 1,
    explanation:
      'A4 keeps the structure of Reg 411.3.3: three categories (a/b/c), only (b) exceptable via a documented risk assessment that must be signed off by a skilled person (electrically) and attached to the EIC. A4 sharpened the language so (a) and (c) cannot be excepted under any circumstances. The risk-assessment route here should not be confused with the now-deleted CRL Annex A443 SPD method — different reg, different scope.',
  },
  {
    id: 'm8s3-cert-form-pnb',
    question:
      'On the A4:2026 EIC schedule of inspection, the system earthing arrangement options now distinguish between TN-C-S (PME) and TN-C-S (PNB). What is the difference?',
    options: [
      'PME and PNB are the same — A4 lists them twice for clarity',
      'PME has multiple connections of the PEN to true earth along the distribution route; PNB (Protective Neutral Bonding) has only one connection point to true earth — typically a single transformer feeding a single installation',
      'PME is for domestic, PNB is for industrial',
      'PNB is only used on TT systems',
    ],
    correctIndex: 1,
    explanation:
      'PNB (Protective Neutral Bonding) is a sub-type of TN-C-S where there is only ONE connection of the PEN to true earth — usually a dedicated transformer feeding a single property or industrial site. PME has multiple earthing electrodes spread along the distribution PEN. A4 added an explicit "TN-C-S (PNB)" tick-box on the cert because the open-PEN risk profile differs and SPD/RCD design choices may differ.',
  },
];

const quizQuestions = [
  {
    id: 1,
    question:
      'A4:2026 was published 15 April 2026 with a transition until 15 October 2026. A designer signs an EIC dated 1 September 2026 citing BS 7671:2018+A3:2024. Is the cert valid?',
    options: [
      'No — A4 is mandatory from 15 April 2026 and A3 cannot be cited',
      'Yes — A3 and A4 may both be cited during the transition window (15 April – 15 October 2026); after 15 October the A3 citation becomes a Reg 120.3 documented departure',
      'Only if the design pre-dates 15 April 2026',
      'Only with insurer approval',
    ],
    correctAnswer: 1,
    explanation:
      'BSI / IET publish each amendment with a transition window during which BOTH the outgoing and incoming amendments may be cited. For A4:2026: published 15 April 2026, A3 fully withdrawn 15 October 2026. A cert dated within the window may legitimately cite either edition, provided the design and verification evidence demonstrably meets the cited edition. Outside the window, citing the older edition becomes a documented departure under Reg 120.3 and the burden of justification falls on the designer.',
  },
  {
    id: 2,
    question:
      'Which of the following best describes the headline NEW regulations introduced by A4:2026?',
    options: [
      'Reg 411.3.4 (luminaire RCD), Reg 419 group (ADS not feasible), Reg 530.3.201 (bidirectional consideration), Reg 722.312.2.1 (EV PEN ban)',
      'Reg 411.3.3 only',
      'Reg 132 — fundamental principles',
      'Reg 700 — special locations',
    ],
    correctAnswer: 0,
    explanation:
      'A4 brings four genuinely NEW regulations the assessor will probe: Reg 411.3.4 (domestic luminaire 30 mA RCD), the Reg 419 group (alternative protective measures where ADS is not feasible, with 419.1 the umbrella), Reg 530.3.201 (consideration of bidirectional power flow — solar PV, batteries, V2G feed-in), and Reg 722.312.2.1 (no PEN in EV circuits on TN). Other regs are amended or clarified, but these four are the ones examined in writing.',
  },
  {
    id: 3,
    question:
      'A4 deletes the CRL surge-protection risk-assessment route. Which clauses / annexes are withdrawn?',
    options: [
      'Reg 411.3.3, Annex A411, Appendix 6',
      'Reg 443.5 (the CRL clause), Annex A443 (worked examples), Appendix 17, Annex B443',
      'Reg 421.1.7, Section 7, Annex A4',
      'Reg 510, Annex F, Appendix 12',
    ],
    correctAnswer: 1,
    explanation:
      'A4 strips out the CRL method end-to-end. Reg 443.5 was the BS 7671 clause permitting the CRL calculation; Annex A443 contained worked examples; Appendix 17 contained the lookup tables; Annex B443 supported the methodology. All four are deleted. SPD selection in A4 follows Reg 443.4 directly — SPDs are required where overvoltage affects safety of human life, public services, commercial / industrial activity or many co-located individuals.',
  },
  {
    id: 4,
    question: 'Reg 421.1.7 is amended in A4 — the AFDD requirement. How has the mandate widened?',
    options: [
      'AFDDs are now optional everywhere',
      'A4 widens the mandatory AFDD scope (previously only HMOs, sleeping accommodation in care homes / student accommodation / dormitories under Reg 421.1.7 of A2/A3) to a broader set of higher-risk premises while retaining "shall" wording — verify against the in-force text for your specific premises type',
      'A4 deleted Reg 421.1.7 entirely',
      'AFDDs are now banned in domestic',
    ],
    correctAnswer: 1,
    explanation:
      'A4 expands the mandatory ("shall") AFDD scope under Reg 421.1.7. The previous requirement applied to AC final circuits supplying socket-outlets in HMOs, care homes, student accommodation, dormitories and other sleeping accommodation. A4 broadens the trigger conditions (and the cert form gains an AFDD column to reflect it). Always verify the exact text against the in-force edition for the specific premises type — assessors will probe whether candidates are reading the current wording rather than reciting A2.',
  },
  {
    id: 5,
    question:
      'Reg 551.7.1 (parallel sources) is amended in A4 with new sub-clauses (c) and (d). What do they cover?',
    options: [
      'New colour codes for solar cables',
      'New requirements for parallel-connected sources (typical scenario: PV array + battery + grid feeding the same busbar): (c) and (d) extend the protection / coordination / labelling requirements to reflect bidirectional flow and synchronisation needs',
      'Mandatory G99 for all systems',
      'Removal of all parallel-source requirements',
    ],
    correctAnswer: 1,
    explanation:
      'A4 amends Reg 551.7.1 (parallel-connected generation) with new (c) and (d) sub-clauses addressing the prosumer scenario: PV inverter + battery storage + grid feeding the same point of common coupling. The new clauses cover protection coordination, labelling of multiple sources, and the practical realities of bidirectional flow — they are paired with the new Reg 530.3.201 ("bidirectional consideration") which mandates that switchgear, isolation and protection design account for power flowing both ways, not just from grid to load.',
  },
  {
    id: 6,
    question:
      'On an EICR carried out 12 months after the A4 transition closes, an inspector finds a 1980s domestic lighting circuit on a Type B 6 A MCB with no RCD. What observation code applies?',
    options: [
      'C1 — danger present',
      'C3 — improvement recommended (for a historic install otherwise sound) OR C2 (potentially dangerous) where the absence of RCD increases real-world risk (damaged accessories, extensive metal-bodied luminaires, bath/shower zone lighting, etc). Inspector judgement; departure from the in-force edition is documented either way',
      'No code — pre-A4 installs are grandfathered',
      'FI — further investigation',
    ],
    correctAnswer: 1,
    explanation:
      'GN3 (Section K) requires every observation to be coded. A pre-A4 install does NOT need to be physically retrofitted to the new edition (existing compliant installations remain compliant) — but on an EICR it is reported as a deviation from the current edition. The right code is C3 for a historic install otherwise sound, escalating to C2 where the absence of RCD demonstrably increases real-world risk. C1 is reserved for "danger present, action required immediately" — usually exposed live, missing CPC where one is required, etc.',
  },
  {
    id: 7,
    question:
      'A4 amends Reg 461.2. What does Reg 461.2 prohibit and why does A4 sharpen the language?',
    options: [
      'Switching of any single-pole device — now banned',
      'Isolation or switching of the PEN conductor in TN-C and TN-C-S systems — A4 sharpens the language to remove ambiguity around PNB and to align with the new Reg 722.312.2.1 EV-circuit PEN ban',
      'Use of MCBs above 32 A — banned',
      'Use of any RCD on EV circuits',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 461.2 has long forbidden switching or isolating the PEN in TN-C / TN-C-S. A4 sharpens the wording to make explicit that PNB (single-point earthed TN-C-S) is included, and to dovetail with Reg 722.312.2.1 (EV-circuit PEN ban). The underlying reason is the open-PEN failure mode: with load on the system and the PEN broken, every Class I exposed metal part bonded to the MET sits at near-line voltage and a touch creates a fault path — invisible to a basic insulation-resistance test.',
  },
  {
    id: 8,
    question:
      'On the A4:2026 EIC schedule of test results, which NEW or AMENDED columns should you expect to find compared with the A2:2022 form?',
    options: [
      'No changes — the form is identical',
      'TN-C-S split into TN-C-S (PME) and TN-C-S (PNB); explicit AFDD column; clarified Maximum Permitted Zs column; reference method per circuit; SPD type per consumer unit / DB',
      'Only the title block changed',
      'A new column for cable colour',
    ],
    correctAnswer: 1,
    explanation:
      'A4 updates the model forms in Appendix 6. Headline schedule changes: (1) system earthing now offers TN-C-S (PME) and TN-C-S (PNB) as distinct options, (2) the schedule of test results gains an AFDD column to record presence and type, (3) Maximum Permitted Zs is clarified per device type, (4) Reference Method (per Appendix 4) is recorded per circuit, and (5) SPD type recorded per consumer unit / distribution board. Designers using older form templates after the transition window should regenerate from the in-force Appendix 6.',
  },
];

const faqItems = [
  {
    question: 'When does A4:2026 come into force, and when does A3:2024 stop being valid?',
    answer:
      'BS 7671:2018+A4:2026 was published on 15 April 2026 and is in force from that date. A3:2024 remains valid alongside A4 during a six-month transition until 15 October 2026. From 16 October 2026, every newly designed installation must be certified against A4 only — citing A3 from that date is a documented departure under Reg 120.3, and the burden of justification sits with the designer. Existing compliant installations remain compliant against the edition they were certified to — A4 does not retrospectively invalidate them.',
  },
  {
    question:
      'How do I handle a job that started under A3:2024 but will be commissioned and certified after 15 October 2026?',
    answer:
      'The pragmatic rule is: design and certify against the edition in force at the date of certification. If the EIC is signed before 15 October 2026, A3 may be cited. If the EIC is signed on or after 16 October 2026, A4 must be cited and the design must demonstrably meet A4. The riskiest jobs are long projects spanning the date — typical example: a new-build dwelling started March 2026, first-fixed under A3, second-fixed and certified November 2026. The designer must walk every circuit forward to A4 (411.3.4 luminaire RCD on lighting circuits is the headline retrofit) before signing the cert. Document the design check explicitly in the project file.',
  },
  {
    question:
      'Is Reg 411.3.4 (luminaire RCD) retrospective on existing dwellings during EICR work?',
    answer:
      'No. Reg 411.3.4 applies to new design and new circuits installed under BS 7671:2018+A4:2026. On an EICR of an older installation it is reported as a deviation from the current edition; per GN3 every observation gets a single classification (C1, C2, C3 or FI). Typically C3 for a historic install otherwise sound; C2 where the absence of RCD demonstrably increases real-world risk (damaged accessories, extensive metal-bodied luminaires, bath/shower zone lighting). Distinguish "non-compliance with the current edition" (always reportable) from "danger" (C1/C2 only).',
  },
  {
    question:
      'The CRL risk-assessment method is gone — how do I now justify omitting an SPD on a small commercial unit?',
    answer:
      "You don't use CRL — that method (Reg 443.5, Annex A443, Appendix 17, Annex B443) was deleted in A4. SPD requirements now run through Reg 443.4 directly: SPDs are required where the consequence of overvoltage could affect (i) safety of human life, (ii) public services, (iii) commercial / industrial activity, or (iv) many co-located individuals. For a small commercial unit, work the four triggers explicitly. If none apply, document the reasoning in the design file and on the EIC. The justification is now narrative, not a CRL number.",
  },
  {
    question:
      'A4 amends Reg 421.1.7 (AFDDs). Has the mandatory scope actually widened, or is this just clarification?',
    answer:
      'A4 widens the mandatory ("shall") AFDD scope under Reg 421.1.7. The previous requirement applied principally to AC final circuits supplying socket-outlets in HMOs, care homes, student accommodation, dormitories and other sleeping accommodation. A4 broadens the trigger conditions and the EIC schedule of inspection now has an explicit AFDD column. For practical commercial-scale work this means an explicit AFDD design check is now part of every domestic / care-sector job specification — verify against the in-force text for the specific premises type rather than relying on prior-amendment habits.',
  },
  {
    question:
      'My consumer unit specification still says "metal-clad per A3" — is that still right under A4?',
    answer:
      'Yes — the metal-clad / non-combustible enclosure requirement for domestic consumer units (originally introduced in earlier amendments and reinforced in A3) is preserved by A4. What A4 adds is the AFDD column on the cert and the new luminaire-RCD rule (411.3.4), so the consumer unit you specify on a domestic job today is typically: metal-clad enclosure, RCBO-per-circuit (Type A minimum, Type F or B where load profile demands), AFDD on circuits within Reg 421.1.7 scope, and SPD per Reg 443.4. The unit itself is not changed by A4; the protection inside it is.',
  },
  {
    question: 'Why has Reg 419 been added in A4 — and when would I actually use it?',
    answer:
      'Reg 419 (with 419.1 the umbrella) formalises the case where automatic disconnection of supply (ADS) cannot be made feasible on a particular circuit. The classic scenarios: a TT installation with very high earth-electrode resistance, an extremely long sub-main where measured Zs exceeds the device limit even with RCD support, or an industrial installation with intentional functional earth limits. Reg 419 lists the alternative protective measures available — supplementary equipotential bonding, electrical separation, double / reinforced insulation, non-conducting location — and sets the design conditions for each. Before A4, this territory was handled ad-hoc as a Reg 120.3 documented departure; A4 brings it inside the regs.',
  },
  {
    question:
      'Does Reg 530.3.201 ("bidirectional consideration") mean every domestic install now needs solar-PV-grade switchgear?',
    answer:
      'No. Reg 530.3.201 requires that switchgear, isolation and protection design "consider" bidirectional power flow. For a conventional grid-only domestic install with no generation or storage, the answer is "no bidirectional flow is possible — no special provisions required" and that consideration is documented in the design file. Where the install includes (or will include) PV, battery storage, V2G or any other parallel source, the regulation requires switchgear rated for back-feed, correct labelling of multiple sources (Reg 514.13), and isolation that breaks all live paths. The regulation is a design-process requirement, not a uniform hardware mandate.',
  },
  {
    question: 'What is likely to come in the next amendment (A5 or the 19th edition)?',
    answer:
      'BSI / IET publish on a roughly 18-24 month amendment cycle, with major editions roughly every 10-15 years. Industry direction signals strongly toward (i) further AFDD expansion (mandatory on all new domestic socket-outlet circuits is the most-discussed candidate), (ii) tightening of EV-charging requirements as V2G volumes grow, (iii) heat-pump and DC-bus distribution provisions for fully electrified dwellings, (iv) more granular SPD requirements following the deletion of the CRL method, and (v) enhanced cyber-security / functional-safety language for grid-interactive prosumer systems. None of this is in A4 — but designers should track JPEL/64 (the BS 7671 committee) consultations and IET Wiring Matters announcements to see the direction.',
  },
];

const BS7671Module8Section3 = () => {
  const navigate = useNavigate();

  useSEO({
    title: 'Amendment 4 highlights and transition | BS 7671:2018+A4:2026 | Module 8.3',
    description:
      'Consolidated reference to BS 7671:2018+A4:2026 — what is new, what is deleted, what is amended, the cert-form changes, and the 15 April / 15 October 2026 transition strategy for designers and inspectors.',
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
            <ArrowLeft className="h-4 w-4" /> Module 8
          </button>

          <PageHero
            eyebrow="Module 8 · Section 3 · Updated for A4:2026"
            title="Amendment 4 highlights and transition"
            description="The consolidated A4:2026 reference. What is new, what is deleted, what is amended, the cert-form changes, and how to handle work spanning the 15 April 2026 publication / 15 October 2026 A3 withdrawal dates. Companion to Module 2 §4 — same A4 topic viewed through the inspector's reference lens rather than the designer's definitions lens."
            actions={
              <>
                <RegBadge>411.3.4</RegBadge>
                <RegBadge>421.1.7</RegBadge>
                <RegBadge>419.1</RegBadge>
                <AmendmentBadge regs={['411.3.4', '421.1.7', '419.1', '722.312.2.1']} />
              </>
            }
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 7671:2018+A4:2026 was published 15 April 2026 and is in force from that date. A3:2024 may be cited alongside A4 during a six-month transition; A3 is fully withdrawn 15 October 2026.',
              'Headline NEW regs: Reg 411.3.4 (domestic luminaire 30 mA RCD), Reg 419 group (alternatives where ADS not feasible), Reg 530.3.201 (bidirectional consideration), Reg 722.312.2.1 (no PEN in TN EV circuits).',
              'Headline DELETED: the CRL surge-protection method — Reg 443.5, Annex A443, Appendix 17, Annex B443 are all withdrawn. SPD selection now via Reg 443.4 directly.',
              'Cert form changes: TN-C-S split into PME and PNB; explicit AFDD column; clarified Maximum Permitted Zs; reference method per circuit; SPD type per board.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'State the A4:2026 publication date (15 April 2026) and A3 withdrawal date (15 October 2026), and apply the right edition citation to a cert dated within the window.',
              'List the four headline NEW regulations introduced by A4 — Reg 411.3.4, Reg 419 group, Reg 530.3.201, Reg 722.312.2.1 — and explain the practical change each one drives.',
              'Identify the deletions: Reg 443.5 (CRL), Annex A443, Appendix 17, Annex B443; and apply Reg 443.4 directly to justify SPD inclusion or omission.',
              'List the headline AMENDED regulations: 411.3.3 (sockets), 421.1.7 (AFDDs), 461.2 (PEN), 531.3.3 (RCD type), 551.7.1 (parallel sources).',
              'Read the A4 EIC / EICR forms — TN-C-S (PME) vs TN-C-S (PNB), AFDD column, Maximum Permitted Zs, reference method, SPD type per board.',
              'Plan transition strategy: how to design and certify a job whose design started under A3 but commissions after 15 October 2026, and how to code pre-A4 installs on EICR after the transition.',
              'Anticipate industry direction — what is most likely to arrive in the next amendment (A5 or the 19th edition).',
            ]}
            initialVisibleCount={4}
          />

          <ContentEyebrow>Publication, transition and citation</ContentEyebrow>

          <ConceptBlock
            title="A4:2026 — the dates that matter"
            plainEnglish="A4 was published 15 April 2026 and is in force from that date. A3:2024 may be cited alongside A4 during a six-month transition. A3 is fully withdrawn 15 October 2026."
            onSite="Inside the transition window, either edition can be cited on a cert provided the design demonstrably meets the cited edition. Outside the window, citing A3 is a documented departure under Reg 120.3 and the designer carries the burden of justification."
          >
            <p>
              BSI publishes each BS 7671 amendment with a defined transition window during which
              both the outgoing and incoming amendments may be cited on certificates. A4:2026 was
              published 15 April 2026; the six-month transition closes 15 October 2026. From 16
              October 2026, every newly designed installation must be certified against A4 only.
              Existing compliant installations remain compliant against the edition they were
              originally certified to — A4 is not retrospective. On an EICR of an older install,
              departures from A4 are reported as deviations from the current edition and coded per
              GN3 (typically C3 for historic, C2 where the absence creates real-world risk).
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[0]} />

          <SectionRule />

          <ContentEyebrow>NEW in A4 — the four headline regulations</ContentEyebrow>

          <ConceptBlock
            title="Reg 411.3.4 — luminaire RCD in domestic premises"
            plainEnglish="Every AC final circuit supplying luminaires within a private dwelling now requires 30 mA RCD additional protection. No risk-assessment exception."
            onSite="Practical implication: every dwelling rewire from 15 April 2026 is RCBO-per-circuit at the consumer unit by default. Lighting circuits, previously the most common 'no-RCD bus' candidate, are now squarely inside the additional-protection requirement."
          >
            <p>
              Reg 411.3.4 is the single biggest practical change A4 brings to the domestic designer.
              It is unconditional within scope (private dwelling) and has no equivalent of the Reg
              411.3.3 (b) risk-assessment exception. Whether the lighting points are in a special
              location or not is irrelevant — the requirement is the AC final circuit supplying
              luminaires, full stop. On a partial board change, the new lighting way must be
              RCD-protected; a non-RCD bus left in place for lighting is non-compliant from
              publication date.
            </p>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 411.3.4 — Additional requirements for circuits with luminaires (NEW IN A4)"
            clause="Within domestic (household) premises, additional protection by an RCD with a rated residual operating current not exceeding 30 mA shall be provided for AC final circuits supplying luminaires."
            meaning="Mandatory ('shall'), unconditional within scope, no risk-assessment exception. Applies to every AC final circuit feeding luminaires inside a private dwelling — not just bathroom or kitchen, the whole property. From 15 April 2026 every new dwelling-lighting circuit is on a 30 mA RCD or RCBO."
            cite="BS 7671:2018+A4:2026, Reg 411.3.4 (in force from 15 April 2026)"
          />

          <InlineCheck {...inlineChecks[1]} />

          <ConceptBlock
            title="Reg 419 group — alternatives where ADS is not feasible"
            plainEnglish="A4 formalises what to do when ADS as a protective measure cannot be made to work on a particular circuit. The umbrella regulation is Reg 419.1."
            onSite="Typical triggers: TT installations with very high Ra, long sub-mains where measured Zs exceeds the OPD limit even with RCD support, industrial installations with intentional functional earth limits. Before A4, this was ad-hoc Reg 120.3 designer-departure territory; A4 puts a structured framework around it."
          >
            <p>
              The Reg 419 group lists the alternative protective measures available where ADS cannot
              be demonstrated: supplementary equipotential bonding to size per Reg 415.2.1
              (bonding-conductor minima 4 mm² unprotected, 2.5 mm² protected — see Reg 544.2),
              electrical separation per Section 413, double / reinforced insulation per Section 412
              (with the Reg 412.1.2 socket-outlet caveat), or non-conducting location. The designer
              chooses the measure that fits the load, the environment and the user competence (BA1 /
              BA2 / BA4 / BA5). Reg 419.1 also requires the chosen measure to be recorded explicitly
              on the cert — assessor will look for it.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Reg 530.3.201 — bidirectional consideration"
            plainEnglish="A4 requires switchgear, isolation and protection design to 'consider' bidirectional power flow. Plain English: if the install has solar PV, battery storage, V2G or any parallel source, the regs now require you to design for power flowing both ways, not just grid-to-load."
            onSite="For a conventional grid-only domestic install: document 'no bidirectional flow possible — no special provisions required' in the design file, tick the box and move on. For prosumer installs: switchgear rated for back-feed, multi-source labelling per Reg 514.13, isolation that breaks all live paths. Pair with the new (c) and (d) sub-clauses in Reg 551.7.1 (parallel sources)."
          />

          <ConceptBlock
            title="Reg 722.312.2.1 — no PEN in TN EV circuits"
            plainEnglish="A circuit supplying EV charging equipment in a TN system shall not include a PEN conductor."
            onSite="Either configure the EV circuit as TN-S (split N and PE before the EV final circuit) or apply one of the Section 722 alternatives — open-PEN protection device, separate earth electrode for the EV. The rationale is the open-PEN failure mode amplified by a Class I vehicle body in a wet environment: every metal part of the vehicle sits at near-line voltage, the touch-current path is the user."
          >
            <p>
              Reg 722.312.2.1 closes the loop with Reg 461.2 (no switching of the PEN in TN-C /
              TN-C-S). Together they say: in TN-C-S installations, the PEN may not be switched
              anywhere in the installation (461.2), AND it may not even reach the EV final circuit
              (722.312.2.1). On a TN-C-S property with a new EV charger, the practical answer is one
              of: (a) split N and PE at the cut-out / consumer unit, run TN-S to the EV circuit; (b)
              provide a dedicated TT earth electrode for the EV circuit; or (c) install a
              manufacturer-approved open-PEN detection device at the charger.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[3]} />
          <InlineCheck {...inlineChecks[4]} />

          <SectionRule />

          <ContentEyebrow>DELETED in A4 — the CRL method is gone</ContentEyebrow>

          <ConceptBlock
            title="Reg 443.5, Annex A443, Appendix 17 and Annex B443 — withdrawn"
            plainEnglish="A4 deletes the CRL (calculated risk level) surge-protection risk-assessment method end-to-end. Designers can no longer use the 'low CRL = no SPD' shortcut."
            onSite="Replace it with Reg 443.4 directly: SPDs are required where the consequence of overvoltage could affect (i) safety of human life, (ii) public services, (iii) commercial / industrial activity, or (iv) many co-located individuals. The justification is now narrative — work the four triggers explicitly and document the conclusion in the design file."
          >
            <p>
              The CRL deletion is one of A4&apos;s biggest paperwork changes. Reg 443.5 (the BS 7671
              clause permitting CRL), Annex A443 (worked examples), Appendix 17 (lookup tables) and
              Annex B443 (supporting material) are all withdrawn. Designers using CRL-calculation
              worksheets in their templates need to update them. The four-trigger test in Reg 443.4
              is more open-ended but also more honest — a small commercial unit with no
              critical-life-safety load and no public-service consequence may legitimately omit
              SPDs, but the reasoning is a design narrative, not a calculated number below a
              threshold. SPD specification still follows the Type 1 / 2 / 3 cascade and Reg 443.6
              for selection at origin, sub-distribution and end-of-circuit.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>AMENDED in A4 — what to re-read</ContentEyebrow>

          <ConceptBlock
            title="Reg 411.3.3 — sockets and the risk-assessment exception"
            plainEnglish="A4 keeps the structure: three categories (a) sockets used by ordinary persons / children, (b) sockets in non-dwelling locations, (c) mobile equipment outdoors. Only (b) is exceptable via documented risk assessment by a skilled person (electrically). A4 sharpens the language to make (a) and (c) explicitly un-exceptable."
            onSite="The risk-assessment route survives in narrow form for non-domestic sockets only — typical use case: a locked plant room with a single skilled-user socket for fixed test equipment. The risk assessment must be signed off by a skilled person (electrically), state who that skilled person is and what their competence is, and accompany the EIC. Anywhere a member of the public, child or untrained adult might encounter the socket: 30 mA RCD, full stop."
          />

          <ConceptBlock
            title="Reg 421.1.7 — AFDD scope widened"
            plainEnglish="A4 broadens the mandatory ('shall') AFDD scope. The previous requirement applied principally to AC final circuits supplying socket-outlets in HMOs, care homes, student accommodation, dormitories and other sleeping accommodation."
            onSite="A4 widens the trigger conditions and the EIC schedule of inspection now has an explicit AFDD column to record presence and type. Read the in-force Reg 421.1.7 text against your specific premises type — the assessor will probe whether candidates are reciting A2/A3 wording or actually reading A4. AFDDs are the area most likely to expand again in the next amendment, so habit-forming under A4 pays off."
          />

          <ConceptBlock
            title="Reg 461.2 — PEN switching prohibition (sharpened)"
            plainEnglish="A4 sharpens the language that already prohibited isolating or switching the PEN in TN-C and TN-C-S systems. The PNB sub-type is now explicitly included, and the regulation aligns with the new EV-circuit PEN ban (Reg 722.312.2.1)."
            onSite="Never put a switch, isolator, fuse or breaker in the PEN line in TN-C / TN-C-S. The PEN runs continuous from the DNO transformer star point through to the consumer's MET. Inside the installation, N and PE are split AT the MET; switching may disconnect line(s) and (where required) the post-MET neutral, but never the combined PEN. An open PEN with load on the system drives the local earth potential up to near-line voltage."
          />

          <ConceptBlock
            title="Reg 531.3.3 — RCD type selection"
            plainEnglish="A4 amends Reg 531.3.3 (selection of RCD by type) to reflect the modern domestic and prosumer load profile. The practical effect is to push designers away from Type AC and toward Type A as the minimum on most circuits, with Type F or Type B where the load profile demands."
            onSite="Domestic minimum for general-purpose circuits: Type A. Single-phase variable-speed drives (e.g. some heat pumps, washer/dryer combos with inverter motors): Type F. EV chargers without internal 6 mA DC detection, three-phase VSDs, larger PV/battery hybrids: Type B. Always verify against equipment manufacturer guidance — wrong type = blind device = EICR observation waiting to happen."
          />

          <ConceptBlock
            title="Reg 551.7.1 — parallel sources, new (c) and (d)"
            plainEnglish="A4 adds new (c) and (d) sub-clauses to Reg 551.7.1 covering parallel-connected generation. Pair with the new Reg 530.3.201 (bidirectional consideration) — the two read together."
            onSite="Typical scenario: PV inverter + battery storage + grid feeding the same point of common coupling. Reg 551.7.1 (c) and (d) cover protection coordination, multi-source labelling per Reg 514.13, and the practical realities of bidirectional flow. Inverters must comply with G98 (≤ 16 A per phase) or G99 (> 16 A per phase) and the manufacturer's commissioning instructions. Cert form: tick TN-C-S (PME) or TN-C-S (PNB), record SPD type, record AFDD presence, record bidirectional consideration in the design narrative."
          />

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 419.1 — Where ADS is not feasible (NEW IN A4)"
            clause="Where automatic disconnection of supply in accordance with Regulation 411 is not feasible, one of the alternative protective measures listed in Regulations 412 to 418 shall be applied. The protective measure selected shall be recorded on the certificate and the design conditions verified during initial verification."
            meaning="Reg 419.1 is the umbrella for the new Reg 419 group. It says: if ADS does not work on this circuit, pick an alternative protective measure (Class II, electrical separation, SELV / PELV, non-conducting location, supplementary equipotential bonding) AND record the choice explicitly. Before A4 this was Reg 120.3 documented-departure territory; A4 brings it inside the regulations with structured requirements."
            cite="BS 7671:2018+A4:2026, Reg 419.1 (in force from 15 April 2026)"
          />

          <InlineCheck {...inlineChecks[5]} />

          <SectionRule />

          <ContentEyebrow>Cert form changes — Appendix 6 updates</ContentEyebrow>

          <ConceptBlock
            title="EIC schedule of inspection — TN-C-S split, AFDD column, SPD type"
            plainEnglish="The A4 EIC form now distinguishes TN-C-S (PME) from TN-C-S (PNB), records AFDD presence per circuit, records SPD type per board, and clarifies the Maximum Permitted Zs column."
            onSite="If your office still uses A2/A3 cert templates after 15 October 2026, regenerate from in-force Appendix 6. Software vendors (Easycert, Stroma, NICEIC EasyCert etc) have all rolled A4 forms — confirm the version stamp on every cert you issue."
          >
            <p>
              The headline schedule changes: (1) <strong>System earthing arrangement</strong>: TN-S
              / TN-C-S (PME) / TN-C-S (PNB) / TT / IT — PNB is the new explicit option for
              single-point-earthed TN-C-S supplies (typically a dedicated transformer feeding one
              property or industrial site). (2) <strong>AFDD column</strong>: presence and type
              recorded per circuit on the schedule of test results. (3){' '}
              <strong>Maximum Permitted Zs</strong>: clarified per device type and rating. (4){' '}
              <strong>Reference Method</strong>: per Appendix 4 (A, B, C, D, E, F) recorded per
              circuit to support cable-sizing audit. (5) <strong>SPD type</strong>: Type 1 / 2 / 3 /
              not fitted, recorded per consumer unit / distribution board.
            </p>
          </ConceptBlock>

          <InlineCheck {...inlineChecks[6]} />

          <ConceptBlock
            title="Schedule of test results — clarified columns"
            plainEnglish="The schedule of test results is structurally similar to A3 but the column headings are clearer. Maximum Permitted Zs is now an explicit column to compare with measured Zs."
            onSite="Test order remains: insulation resistance, polarity, EFLI (Ze, Zs), prospective fault current (Ipf), RCD operating time (at IΔn and 5 IΔn), functional testing. Record measured Zs and Maximum Permitted Zs side by side — one is the test result, the other is the design target. If the column shows measured > maximum, ADS is not demonstrable for that device and the circuit fails initial verification."
          />

          <SectionRule />

          <ContentEyebrow>Transition strategy — handling A3 / A4 spanning work</ContentEyebrow>

          <ConceptBlock
            title="The pragmatic rule"
            plainEnglish="Design and certify against the edition in force on the date the EIC is signed. Inside the window (15 April – 15 October 2026), either A3 or A4 may be cited. From 16 October 2026, A4 only."
            onSite="The riskiest jobs are long projects that span the date — a new-build dwelling first-fixed under A3 in March 2026 but second-fixed and certified November 2026. The designer must walk every circuit forward to A4 before signing. The headline retrofit on most domestic jobs is Reg 411.3.4 (luminaire RCD on lighting circuits)."
          >
            <p>
              Document the transition position in the project file before you sign. A practical
              approach: at the start of any project that may span the date, mark up the design
              document with the cert-issuance target date. If that date is on or after 15 April
              2026, design to A4 from day one regardless of whether the cert can be issued under A3.
              If the cert is issued before 15 October 2026 you can choose either citation; if after,
              A4 only. Over-engineering early to A4 standards costs little and removes transition
              risk completely.
            </p>
          </ConceptBlock>

          <ConceptBlock
            title="Coding pre-A4 installs on EICR after the transition"
            plainEnglish="An EICR carried out after 15 October 2026 on a pre-A4 installation reports A4 deviations as observations against the current edition. The code is a judgement call — typically C3 for historic-and-otherwise-sound, C2 where the absence creates real-world risk."
            onSite="Examples: 1980s domestic lighting circuit on a Type B 6 A MCB with no RCD (411.3.4 deviation) — typically C3 unless damaged accessories or zone-1 lighting elevate it to C2. EV charger added to TN-C-S consumer unit pre-A4 with no PEN-fault protection (722.312.2.1 deviation) — C2 default, C1 if the install presents a clear immediate-action danger. Always code, never leave silent."
          >
            <p>
              GN3 (Section K) is unambiguous: every observation gets a single code (C1, C2, C3 or
              FI). &quot;Satisfactory&quot; overall is incompatible with any C1 or C2 outstanding.
              The inspector's judgement on C2-vs-C3 sits on whether the deviation creates real-world
              risk in the specific premises (occupancy, condition of accessories, presence of
              children / vulnerable adults, environmental factors). Document the reasoning on the
              EICR — &quot;C2 because [evidence]&quot; or &quot;C3 because [evidence]&quot; — not
              just the code.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>Where it goes wrong</ContentEyebrow>

          <CommonMistake
            title="Citing A3 on a cert dated after 15 October 2026"
            whatHappens="Designer forgets to update the cert template after the transition closes. EIC dated November 2026 cites BS 7671:2018+A3:2024. Assessor flags it as a Reg 120.3 documented departure with no documented justification — the cert is reissued and the firm's QA process is escalated."
            doInstead="Update cert templates AND software version on 15 October 2026. Build a calendar reminder. If the cert genuinely needs to cite A3 (e.g. the design pre-dates the transition), record the specific reason in the project file and on the EIC notes column — that is what Reg 120.3 requires."
          />

          <CommonMistake
            title="Treating Reg 411.3.4 as an extension of Reg 411.3.3"
            whatHappens="Designer reads 411.3.3 (sockets) and assumes the (b) risk-assessment exception applies to luminaire circuits too. Domestic lighting circuit on a non-RCD bus, EIC issued, EICR a year later codes C2 and the firm pays for the rectification."
            doInstead="Reg 411.3.4 is a separate, unconditional rule for AC final circuits supplying luminaires within domestic premises. There is NO risk-assessment exception. From 15 April 2026, every AC final lighting circuit in a dwelling is on a 30 mA RCD or RCBO — full stop. Default to RCBO-per-circuit at the consumer unit; no design memory needed because there is no decision to make."
          />

          <CommonMistake
            title="Using the deleted CRL method on a post-A4 design"
            whatHappens="Designer pulls a CRL spreadsheet from the office templates folder, calculates a CRL of 800, and omits SPDs on a small commercial unit on the basis of the calculation. EIC issued April 2026. Assessor flags it: the CRL method (Reg 443.5, Annex A443, Appendix 17, Annex B443) is deleted in A4 — the calculation cannot be cited."
            doInstead="Apply Reg 443.4 directly. Work the four triggers: does overvoltage at this premises affect (i) safety of human life, (ii) public services, (iii) commercial / industrial activity, or (iv) many co-located individuals? If none apply, document the reasoning narratively in the design file and on the cert. If any apply, fit SPDs per the Type 1 / 2 / 3 cascade. Delete the CRL spreadsheet from the templates folder."
          />

          <SectionRule />

          <ContentEyebrow>Scenarios — applying it on the day</ContentEyebrow>

          <Scenario
            title="Domestic CU change spanning the A4 transition"
            situation="Design issued March 2026 (A3:2024 in force at that date). Customer delays the install. The CU change is finally fitted and certified on 5 November 2026 — three weeks after A3 is fully withdrawn. The original design omitted RCD protection on the new lighting way (compliant with A3:2024 Reg 411.3.3, which only mandated RCD on socket-outlet circuits)."
            whatToDo="The cert is signed on 5 November 2026 — A4 must be cited. The design must therefore meet A4 — including Reg 411.3.4. The lighting way needs a 30 mA RCBO; if the CU specification doesn't accommodate it, the unit specification must be updated before commissioning. Re-issue the design document with an A4 review note, fit RCBO-per-circuit, certify against A4, attach the design-review note to the project file."
            whyItMatters="Issuing the cert against A3 on 5 November 2026 would be a documented departure under Reg 120.3 with no defensible justification — the customer's delay does not entitle the designer to cite a withdrawn edition. The cost of the additional RCBO is small; the cost of issuing a non-compliant cert and being asked to re-attend in 12 months is large."
          />

          <Scenario
            title="EICR coding a pre-A4 install — non-compliance vs danger"
            situation="EICR carried out 1 March 2027 (4½ months after A4 transition closed) on a 2018 domestic install. Inspector finds: (a) lighting circuits on a 17th-edition split-load board with main-switch lighting bus only — no RCD; (b) EV charger fitted in 2022 on a TN-C-S supply with no PEN-fault protection device, charger spec sheet states 'Type B integrated, requires Type A upstream'; (c) consumer unit is plastic. All three are A4 deviations."
            whatToDo="Walk each finding. (a) Lighting no-RCD: deviation from Reg 411.3.4. The install is otherwise sound, accessories are in good condition, no metal-bodied luminaires in zone 1 — code C3 (improvement recommended). Document: 'C3: existing lighting circuit not provided with 30 mA RCD additional protection; deviates from BS 7671:2018+A4:2026 Reg 411.3.4 which applies to new design.' (b) EV charger no PEN-fault protection: deviation from Reg 722.312.2.1. The Class I vehicle body and outdoor location create real-world touch-current risk on an open-PEN failure — code C2 (potentially dangerous). Document: 'C2: EV-charging circuit on TN-C-S supply does not include open-PEN protection; deviates from BS 7671:2018+A4:2026 Reg 722.312.2.1.' (c) Plastic CU: existing pre-Amendment 3, otherwise sound — typically C3. Provide the customer with a written cost estimate to remediate all three; remediation gives an EIC against A4."
            whyItMatters="The EICR is the bridge between the in-force regulations and the existing built stock. Inspectors who code every A4 deviation as C2 will produce unsatisfactory reports on most pre-A4 installs and the system loses credibility; inspectors who code everything C3 expose customers to real risk. The judgement is whether the deviation creates immediate or near-term danger in the specific premises. Document the reasoning on the report, every time."
          />

          <SectionRule />

          <ContentEyebrow>
            Industry direction — what the next amendment is likely to bring
          </ContentEyebrow>

          <ConceptBlock
            title="What to watch in JPEL/64 and IET Wiring Matters"
            plainEnglish="BS 7671 amendments arrive on a roughly 18-24 month cycle. A4 closed several long-running design ambiguities (CRL deletion, EV-circuit PEN ban, luminaire RCD); A5 / the 19th edition will likely tackle AFDD expansion, V2G, heat-pump-density domestic boards, and prosumer cyber-security."
            onSite="Track JPEL/64 (the BS 7671 committee that drafts amendments) consultation papers and the IET Wiring Matters magazine for the direction signals. Designers who anticipate the next amendment by ~6 months reduce transition cost dramatically — the install you spec today should not need to be re-engineered in 18 months because a foreseeable change becomes mandatory."
          >
            <p>
              The strongest signals from the post-A4 consultation cycle:{' '}
              <strong>(i) AFDD expansion</strong> — the next move is widely expected to make AFDDs
              mandatory on all new domestic AC final socket-outlet circuits (currently still
              discretionary outside the Reg 421.1.7 specific-premises list).{' '}
              <strong>(ii) EV / V2G</strong> — as V2G volumes grow, the regs will need to address
              the prosumer EV scenario where the vehicle exports power, not just imports it; expect
              Section 722 to gain V2G- specific clauses.{' '}
              <strong>(iii) Heat pumps and DC-bus distribution</strong> — fully electrified
              dwellings (heat pump + EV + induction hob + battery + PV) push domestic boards toward
              100 A+ ratings and DC-bus distribution variants familiar from larger commercial; the
              regs will likely follow.{' '}
              <strong>(iv) Cyber-security and functional-safety language</strong> for
              grid-interactive prosumer systems — currently outside BS 7671 scope but on the JPEL/64
              horizon. <strong>(v) Further SPD tightening</strong> following the CRL deletion:
              expect Reg 443.4 to gain more prescriptive triggers as data accumulates.
            </p>
          </ConceptBlock>

          <SectionRule />

          <ContentEyebrow>A4 changes — quick lookup by Section</ContentEyebrow>

          <ConceptBlock
            title="Where to look first when an assessment question cites a Section"
            plainEnglish="A4 touches almost every Section. This is the quick lookup — when an exam question references a Section number, this tells you where to read first."
            onSite="Section 411 — Reg 411.3.3 amended (sockets), Reg 411.3.4 NEW (luminaires). Section 419 — NEW group, alternatives where ADS not feasible. Section 421 — Reg 421.1.7 amended (AFDD scope). Section 443 — Reg 443.5 DELETED (CRL), Reg 443.4 now drives SPD selection directly. Section 461 — Reg 461.2 sharpened (PEN). Section 530 — Reg 530.3.201 NEW (bidirectional consideration). Section 531 — Reg 531.3.3 amended (RCD type). Section 551 — Reg 551.7.1 (c) and (d) NEW (parallel sources). Section 722 — Reg 722.312.2.1 NEW (EV PEN ban). Appendix 6 — model forms updated (PME / PNB split, AFDD column, SPD type, reference method, Max Permitted Zs)."
          >
            <p>
              The answer in the exam is almost always &quot;read the in-force text&quot; — but
              knowing which Section to reach for first saves time. The four NEW headline regulations
              (411.3.4, 419 group, 530.3.201, 722.312.2.1) and the one major DELETION (443.5 / Annex
              A443 / App 17 / Annex B443 — the CRL method) are the items most likely to feature on a
              written paper or an oral / interview-style assessment. Beyond those, expect questions
              on the cert-form changes and the transition-period mechanics.
            </p>
          </ConceptBlock>

          <FAQ items={faqItems} />

          <KeyTakeaways
            points={[
              'A4:2026 published 15 April 2026, in force from that date. A3:2024 may be cited alongside A4 during a six-month transition; A3 fully withdrawn 15 October 2026. From 16 October citing A3 is a Reg 120.3 documented departure.',
              'Four headline NEW regs: Reg 411.3.4 (domestic luminaire 30 mA RCD), Reg 419 group (alternatives where ADS not feasible, 419.1 umbrella), Reg 530.3.201 (bidirectional consideration), Reg 722.312.2.1 (no PEN in TN EV circuits).',
              'Headline DELETED: Reg 443.5 (CRL clause), Annex A443, Appendix 17, Annex B443. SPD selection now via Reg 443.4 directly — narrative justification, not CRL number.',
              'Headline AMENDED: Reg 411.3.3 (sockets — risk-assessment exception sharpened), Reg 421.1.7 (AFDD scope widened), Reg 461.2 (PEN sharpened), Reg 531.3.3 (RCD type push to A/F/B), Reg 551.7.1 (parallel sources, new (c) and (d)).',
              'Cert form changes — Appendix 6: TN-C-S split into TN-C-S (PME) and TN-C-S (PNB); explicit AFDD column on schedule of test results; clarified Maximum Permitted Zs; reference method per circuit; SPD type per consumer unit / DB.',
              'Transition strategy: design and certify against the edition in force on the date the EIC is signed. Long projects spanning 15 October 2026 must be design-walked forward to A4 — Reg 411.3.4 is the headline retrofit on most domestic jobs.',
              'EICR coding post-transition: deviations from A4 on pre-A4 installs are reportable but typically C3 (historic, otherwise sound) or C2 (where the absence creates real-world risk). Document the reasoning, not just the code.',
            ]}
          />

          <Quiz questions={quizQuestions} />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-8')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 8
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/bs7671-module-9')}
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next module <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                Module 9 — Mock Exam
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
};

export default BS7671Module8Section3;
