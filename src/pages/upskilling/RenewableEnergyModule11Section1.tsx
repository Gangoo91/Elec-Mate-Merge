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
  Pullquote,
} from '@/components/study-centre/learning';
import { Part8Framework } from '@/components/study-centre/diagrams/renewableM11';
import useSEO from '@/hooks/useSEO';

const inlineChecks = [
  {
    id: 'm11s1-chapter-81-scope',
    question:
      'What is Chapter 81 of BS 7671:2018+A4:2026, and why was it introduced?',
    options: [
      'A new SPD chapter',
      'Chapter 81 (Part 8-1: Functional aspects — Energy efficiency) is the new energy-efficiency chapter added by A4:2026. It replaced the deleted Appendix 17 and is essentially a signpost: it refers the reader to the Building Regulations and to BS HD 60364-8-1:2019 for energy-efficiency requirements. It sits inside Part 8 (Functional Requirements) alongside Chapter 82 (Prosumer\'s Low Voltage Electrical Installations, PEI). Its purpose: bring energy-efficient design into the scope of the wiring regulations — cable sizing, voltage drop, load-management, integration of LCT generation + storage — so that the install itself supports lower consumption, not just safety',
      'A new lightning chapter',
      'Same as old Chapter 81',
    ],
    correctIndex: 1,
    explanation:
      'A4:2026 added Chapter 81 (Part 8-1: Functional aspects — Energy efficiency) to formalise energy efficiency in BS 7671. It replaced the deleted Appendix 17 and acts as a signpost chapter — it points the reader to the Building Regulations (England & Wales / Scotland / NI) and to BS HD 60364-8-1:2019 for the detailed energy-efficiency requirements rather than restating them. The detailed design methodology (efficiency meshes, device selection, payback) lives in BS HD 60364-8-1:2019. Historically the regs were safety-only — energy efficiency widens the brief: cable cross-section choices that reduce I²R losses, voltage-drop margins that minimise dissipation, integration paths for LCT generation + storage, tariff-aware load shifting, and the records the designer keeps to show the efficiency rationale. Chapter 81 sits inside Part 8 (Functional Requirements) alongside Chapter 82 (Prosumer\'s Low Voltage Electrical Installations — PEI). For renewables, this matters because every M2-M10 technology now has an efficiency-design expectation alongside its safety expectation.',
  },
  {
    id: 'm11s1-efficiency-vs-safety',
    question:
      'How does Chapter 81 relate to the rest of BS 7671 — efficiency vs the traditional safety regs?',
    options: [
      'Replaces them',
      'Layered on top, not replacing. Chapters 1-7 (Part 1-7 scope, definitions, protection, selection, inspection, special installations) remain the safety + correctness baseline. Chapter 81 adds the energy-efficiency layer — designer + installer demonstrate the install is efficient, not just safe. Cable size meeting Reg 433 + Reg 434 + Reg 525 voltage drop is the safety + correctness baseline; Chapter 81 may drive a larger conductor than that baseline when efficiency justifies it',
      'Replaces voltage drop',
      'Only applies to PV',
    ],
    correctIndex: 1,
    explanation:
      'Chapter 81 is layered, not substitutional. Reg 433 overload protection + Reg 434 short-circuit + Reg 525 voltage drop + the rest of Parts 1-7 remain the safety + correctness baseline. Chapter 81 adds: was the design also efficient? Cable example — Reg 525 caps voltage drop at 3% (lighting) / 5% (other) of nominal; safety + correctness says any conductor within that limit is compliant. Chapter 81 may justify upsizing the conductor beyond the Reg 525 limit if the I²R loss reduction over the install lifetime makes economic + carbon sense (cost vs energy saving payback). The designer records that rationale. Verifier looks at safety compliance + Chapter 81 evidence. For LCT installs (PV / BESS / heat pump / EV) where the design current is sustained, this matters more than for general lighting.',
  },
  {
    id: 'm11s1-part-8-relationship',
    question:
      'Where does Chapter 81 sit within Part 8 of BS 7671 — and how does it relate to Chapter 82 PEI?',
    options: [
      'Outside Part 8',
      'Part 8 (Functional Requirements) is the prosumer / energy-efficient installation home. A4:2026 expanded Part 8 — Chapter 81 = energy efficiency (the signpost chapter that replaced Appendix 17, pointing to the Building Regulations + BS HD 60364-8-1:2019); Chapter 82 = Prosumer\'s Low Voltage Electrical Installations (PEI — multi-source architecture with public network + on-site generation + storage, including EEMS per Reg 825.1). The two chapters are designed to work together — efficient design (81) of a prosumer site (82)',
      'Replaces Part 8',
      'Different standard',
    ],
    correctIndex: 1,
    explanation:
      'Part 8 of BS 7671 (Functional Requirements) is the prosumer / energy-efficient installation home. A4:2026 expanded it. Chapter 81 (Energy Efficiency) is the signpost chapter that replaced the deleted Appendix 17 — it refers the reader to the Building Regulations + BS HD 60364-8-1:2019 for the detailed energy-efficiency requirements. Chapter 82 = Prosumer\'s Low Voltage Electrical Installations (PEI) — multi-source architecture with public network + on-site PV / BESS / wind / CHP, island mode capability (Reg 826.1.1.1 + 824.2), with the Electrical Energy Management System (EEMS) defined at Reg 825.1. The two sit together in Part 8: efficient design (Chapter 81) of a prosumer site (Chapter 82). For M11 we focus Chapter 81 + the safety-related anchors (lightning, SPDs, fault current, anti-islanding). M10 covered Chapter 82 in depth.',
  },
  {
    id: 'm11s1-inspector-records',
    question:
      'What does the inspector now record for a Chapter 81 compliant LCT install?',
    options: [
      'Nothing new',
      'Energy-efficiency rationale: cable cross-section vs the Reg 525 minimum + the loss-reduction justification; load-shifting / tariff-aware design notes; EEMS integration (the Electrical Energy Management System defined at Reg 825.1, where applicable); LCT generation / storage / load split with annual energy estimate; voltage-drop margins beyond the Reg 525 cap (if applicable); monitoring points for post-install verification. This sits alongside the existing safety EIC + schedule of tests',
      'Same as 2008 edition',
      'Only safety',
    ],
    correctIndex: 1,
    explanation:
      'A Chapter 81 install adds new records to the inspector / verifier scope (the detailed methodology sits in BS HD 60364-8-1:2019, which Chapter 81 signposts). Typical evidence: (1) Cable cross-section justification — designer chose larger than Reg 525 minimum where efficiency / payback supported it. (2) Voltage-drop margins — design voltage drop below the Reg 525 cap for efficiency. (3) Load-shifting design notes — tariff-aware (TOU / smart-tariff) circuits sized to off-peak EV / heat pump operation. (4) EEMS integration where the prosumer install uses one — the Electrical Energy Management System (Reg 825.1) covers PV / BESS / EV / heat pump in coordinated operation. (5) Annual energy estimate per LCT component — PV yield, heat pump SCOP, EV charge demand. (6) Monitoring points for post-install verification — sub-meter positions, CT clamps, smart-meter export. (7) Customer evidence bundle — efficiency rationale signed off. This is in addition to the traditional EIC + schedule of inspection + schedule of test results.',
  },
];

const quizQuestions = [
  {
    question:
      'A customer asks for "the most efficient possible" PV install. How does Chapter 81 frame the designer\'s answer in BS 7671 terms?',
    options: [
      'Just use the biggest cable possible',
      'Energy-efficiency design (Chapter 81, detailed in BS HD 60364-8-1:2019) is a layered framework, not a single rule. Designer assesses: (1) PV array sizing vs load profile; (2) DC + AC cable losses (CSA upsizing where payback supports); (3) inverter selection + efficiency curve; (4) BESS integration if present; (5) EEMS coordination per Reg 825.1 where the prosumer install uses one; (6) voltage drop margins below the Reg 525 / Appendix 4 maximum; (7) lifetime energy + payback model. Records the efficiency rationale. Customer evidence bundle = traditional safety EIC + efficiency rationale',
      'Just bigger inverter',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'The "most efficient possible" answer (Chapter 81 signposts the methodology in BS HD 60364-8-1:2019) is a layered design process, not a single component choice. (1) PV sizing — match array kWp to customer load profile + roof + budget. (2) DC + AC cable losses — typical PV string DC cable carries continuous current at near MPP for daylight hours; upsizing from minimum CSA reduces I²R; payback calculation drives the choice. (3) Inverter selection — efficiency curve at part-load matters (string inverters typically 96-98% peak efficiency; lower at very low light); manufacturer DoC. (4) BESS integration if present — round-trip efficiency 85-92% LFP typical; sizing matched to load profile. (5) EEMS coordination per Reg 825.1 where the prosumer install uses one — coordinated operation of PV + BESS + heat pump + EV. (6) Voltage drop margins — design below Reg 525 cap where efficiency / payback supports it. (7) Lifetime energy + payback model — installer records the assumptions + annual energy estimate. Cert evidence bundle for the customer = traditional safety EIC + efficiency rationale + monitoring plan.',
  },
  {
    question:
      'Cable cross-section: when does Chapter 81 justify upsizing beyond the Reg 525 voltage-drop cap?',
    options: [
      'Never',
      'When the I²R loss reduction over the install lifetime + customer energy cost gives an economic + carbon payback. Typical worked case: PV DC + AC + heat pump + EV circuits run high continuous current for many hours per year. Reg 525 caps voltage drop (3% lighting / 5% other) — Chapter 81 says: go bigger if payback supports. Designer records the rationale + payback calculation. Cert evidence ties cable choice to efficiency design',
      'Always upsize',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 525 / Appendix 4 sets the maximum voltage drop (3% lighting / 5% other) — design must not exceed it. Chapter 81 is the upside — designer may upsize the conductor to drive the voltage drop well below that maximum when payback supports. Typical LCT cases where upsizing pays back: (1) PV DC + AC — long sustained-current operation through daylight hours; cable losses scale with I²R + time. Going from 4 mm² to 6 mm² on a sustained-current PV run can save tens of pounds per year in lost generation. (2) Heat pump dedicated supply — sustained high current in heating season. (3) EV charging dedicated supply — sustained 32 A or 7 kW for several hours per session. (4) BESS DC + AC — bidirectional sustained current. Payback calculation: extra cable cost £X; annual energy savings £Y at unit price; payback in N years. Chapter 81 records this rationale. Where the load is intermittent or low (general lighting, occasional socket use), upsizing rarely pays back — the Reg 525 minimum-compliant conductor is sufficient. Cert evidence bundle ties cable choice to Chapter 81 efficiency design.',
  },
  {
    question:
      'How does Chapter 81 interact with the Building Regulations + customer-facing performance certification (EPC)?',
    options: [
      'No interaction',
      'Chapter 81 is the BS 7671 design layer; the Building Regulations (Part L energy efficiency in England + equivalents) + EPC (Energy Performance Certificate) are the wider building-energy framework. Chapter 81 design records can feed into customer EPC re-assessment + Building Regs Part L compliance. They are separate documents but cross-reference: the electrical install efficiency design (Chapter 81) supports the building energy rating outcome (EPC)',
      'Chapter 81 replaces EPC',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Chapter 81 sits at the BS 7671 layer — design + verification of the electrical install for efficiency. The wider building-energy framework is separate: Building Regulations Part L (England + equivalents in Wales / Scotland / NI) = building-fabric + services efficiency. EPC (Energy Performance Certificate) = customer-facing building-energy rating. SAP / RdSAP = assessment methodology. Chapter 81 design records support the wider framework — installer\'s LCT scope (PV / BESS / heat pump / EV / EEMS) feeds into the EPC re-assessment + supports Part L compliance for any building work that triggered the EPC. Cert evidence bundle integrates: BS 7671 safety EIC + Chapter 81 efficiency design + handover documentation supporting EPC re-assessment + Building Regs Part L sign-off (where applicable). The electrician\'s scope is the BS 7671 side; the wider customer journey involves SAP assessor + Building Control + (for some retrofits) MCS handover.',
  },
  {
    question:
      'What is the relationship between Chapter 81 efficiency design + the Reg 643 Part 6 verification process?',
    options: [
      'No relationship',
      'Reg 643 Part 6 verifies the safety compliance (continuity, IR, polarity, RCD, EFLI, etc.) of the install. Chapter 81 verification is additional — designer / verifier confirms the efficiency design records exist + match the install. Typical Chapter 81 verification additions: cable CSA matches design rationale; voltage-drop calculation matches install; EEMS configuration matches design; monitoring points operational. M11 §8 covers the commissioning chain integrating Reg 643 safety + Chapter 81 efficiency',
      'Same test',
      'Replaces 643',
    ],
    correctAnswer: 1,
    explanation:
      'Reg 643 Part 6 is the safety + correctness verification — continuity of protective conductors, insulation resistance, polarity, RCD operation, earth fault loop impedance (EFLI), functional tests of switchgear, etc. Reg 643.3 was redrafted in A4:2026 for clarity. The efficiency verification layer adds: (1) cable CSA matches the design rationale (designer may have upsized beyond Reg 525 — verifier checks the install matches). (2) Voltage-drop calculation matches the install configuration. (3) EEMS configuration matches design (the Reg 825.1 Electrical Energy Management System, where the prosumer install uses one). (4) Monitoring points operational — sub-meters / CT clamps / smart-meter export wired + commissioned. (5) Annual energy estimate + payback model attached. Cert evidence bundle: Reg 643 safety tests + Chapter 81 efficiency verification + EIC. M11 §8 covers the full commissioning chain integrating these.',
  },
  {
    question:
      'What is the M11 module structure — why is "Chapter 81 + lightning + fault levels + anti-islanding" grouped together?',
    options: [
      'Random',
      'They share the post-A4:2026 safety + efficiency framework for LCT installs. Chapter 81 = efficiency. BS EN 62305 = lightning protection (PV / wind are exposed). Section 443 / 534 = SPDs (post-A4:2026 expanded triggers). Multi-source fault contribution = PSCC at the customer side now includes PV / BESS / wind / CHP. Reg 551.7.5 anti-islanding = the safety anchor when any source can export. Together they form the M11 design + verification stack',
      'No reason',
      'Different topics',
    ],
    correctAnswer: 1,
    explanation:
      'M11 groups Chapter 81 + lightning + SPDs + fault levels + anti-islanding because they share the post-A4:2026 design + verification framework for LCT installs: (1) Chapter 81 — energy efficiency (the design layer). (2) BS EN 62305-1/-2/-3/-4 — lightning protection framework; cited by BS 7671 Reg 712.534.101 for PV; applies to wind masts; risk-assessment methodology drives R1-R4 + LPZ zones. (3) Section 443 — SPD requirement triggers, Reg 443.4.1 risk-assessment criteria for when SPDs are needed. (4) Section 534 — SPD installation, Reg 534.4.1.1 Type 1 / 2 / 3, Reg 534.4.4 coordination, Reg 534.4.6 fault protection during SPD failure. (5) Multi-source fault contribution — PSCC at customer side now includes inverter Isc, BESS short-circuit contribution, wind / CHP generator fault current. Reg 826.1.2.1 PEI overcurrent assessment for all configurations. (6) Reg 551.7.5 anti-islanding — categorical safety anchor when any source exports. Together M11 covers the design + verification chain. M11 §8 closes with the commissioning integration.',
  },
  {
    question:
      'A customer with 6 kWp PV + 13 kWh BESS + 7 kW heat pump + 32 A EV charger asks: "is my install Chapter 81 compliant?" What is the honest answer?',
    options: [
      'Yes always',
      'Depends on the install date. Chapter 81 came in with BS 7671:2018+A4:2026. Installs designed + certified before A4:2026 applies are pre-Chapter 81 — safety-compliant under their installation amendment, but not Chapter 81-evidenced. Installs after the A4:2026 effective date should have Chapter 81 evidence in the cert bundle (efficiency rationale, monitoring plan, design records). EICR on a pre-Chapter 81 install does NOT need to retroactively impose Chapter 81 — but a designer adding a new circuit / LCT component now would design that scope to Chapter 81',
      'No always',
      'Random',
    ],
    correctAnswer: 1,
    explanation:
      'Honest customer answer: depends on the install date. Chapter 81 came in with BS 7671:2018+A4:2026 (Amendment 4, 2026). Installs designed + certified before A4:2026 effective date are pre-Chapter 81 — they\'re compliant under the amendment in force at install date, but the Chapter 81 efficiency evidence layer didn\'t exist then. Pre-A4:2026 install + post-A4:2026 EICR: the EICR verifies safety against the install\'s original amendment; it does NOT retroactively impose Chapter 81 (you can\'t fail an install for not having efficiency records that weren\'t required at install date). Post-A4:2026 install: should have Chapter 81 evidence — efficiency rationale, design records, monitoring plan. Mixed-age install: pre-existing PV (2020) + new BESS (2026): the new BESS scope is designed to Chapter 81; the existing PV scope remains compliant under its original amendment but the integrated PEI design should consider Chapter 81 for the combined operation. Honest framing: efficiency-evidenced is a feature of newer installs, not a retroactive failing of older ones. Cert evidence bundle records the install dates + amendment in force at design.',
  },
];

const faqs = [
  {
    question: 'Is Chapter 81 a new chapter, or did it replace something?',
    answer:
      'New chapter, but it replaced the deleted Appendix 17 (Energy efficiency). A4:2026 introduced Chapter 81 (Part 8-1: Functional aspects — Energy efficiency) as a signpost chapter within Part 8 that refers the reader to the Building Regulations + BS HD 60364-8-1:2019. Part 8 (Functional Requirements) pairs it with Chapter 82 (Prosumer\'s Low Voltage Electrical Installations — PEI). The detailed energy-efficiency design methodology lives in BS HD 60364-8-1:2019, not in Chapter 81 itself.',
  },
  {
    question: 'Does Chapter 81 apply to every install, or only LCT installs?',
    answer:
      'Every install in scope after A4:2026 effective date — but the practical impact is heaviest on installs with sustained high-current loads or LCT generation / storage. General lighting / occasional socket use rarely justifies upsizing beyond Reg 525 minimums; LCT installs (PV, BESS, heat pump, EV) often do. Chapter 81 is a layered framework — apply where it makes design / payback sense.',
  },
  {
    question: 'How does Chapter 81 interact with Reg 525 voltage drop?',
    answer:
      'Reg 525 (via Appendix 4) sets the maximum — design voltage drop should not exceed 3% (lighting) or 5% (other) of nominal. Chapter 81 may justify designing well below that maximum when payback supports — upsizing a conductor to reduce I²R loss + extend equipment life. Reg 525 + Chapter 81 work together: Reg 525 caps voltage drop for safety + correctness; Chapter 81 sets the efficiency upside.',
  },
  {
    question: 'What new evidence does the customer get from a Chapter 81 install?',
    answer:
      'Customer evidence bundle now includes: cable / equipment efficiency rationale; voltage-drop calculation + margin; annual energy estimate per LCT component; EEMS configuration (the Reg 825.1 Electrical Energy Management System, where the prosumer install uses one); monitoring points / sub-meter positions; payback model. This sits alongside the existing safety EIC + schedule of tests + schedule of inspection.',
  },
  {
    question: 'Does Chapter 81 apply to commercial installs as well as domestic?',
    answer:
      'Yes — Chapter 81 scope is general. Commercial installs with significant continuous loads + multi-source LCT generation typically have stronger Chapter 81 design payback than light-duty domestic installs. The framework is the same; the application + payback magnitude differs.',
  },
];

export default function RenewableEnergyModule11Section1() {
  const navigate = useNavigate();

  useSEO({
    title: 'A4:2026 Chapter 81 landscape — energy efficiency framework | Renewable Energy 11.1 | Elec-Mate',
    description:
      'What A4:2026 Chapter 81 introduced + why. Energy-efficiency framework within Part 8 (Functional Requirements) — Chapter 81 efficiency (signpost to BS HD 60364-8-1:2019) + Chapter 82 PEI. Layered with the Reg 525 / Appendix 4 voltage-drop maximum. New evidence records for LCT installs.',
  });

  return (
    <div className="min-h-screen bg-[hsl(0_0%_8%)] text-white">
      <div className="px-4 sm:px-6 lg:px-8 pt-2 pb-24">
        <PageFrame>
          <button
            type="button"
            onClick={() => navigate('../renewable-energy-module-11')}
            className="inline-flex items-center gap-2 h-11 px-3 rounded-full bg-white/[0.06] border border-white/[0.1] text-white text-[13px] font-medium touch-manipulation hover:bg-white/[0.1] mb-1 self-start"
          >
            <ArrowLeft className="h-4 w-4" /> Module 11
          </button>

          <PageHero
            eyebrow="Module 11 · Section 1 · BS 7671:2018+A4:2026 · Chapter 81 + Part 8"
            title="A4:2026 Chapter 81 landscape — energy efficiency framework"
            description="What A4:2026 Chapter 81 introduced + why. Energy-efficiency chapter inside Part 8 (Functional Requirements) — a signpost to the Building Regs + BS HD 60364-8-1:2019, sitting alongside Chapter 82 (PEI). Layered with Reg 525 voltage drop. New evidence records for LCT installs."
            tone="yellow"
          />

          <TLDR
            points={[
              'BS 7671:2018+A4:2026 introduced Chapter 81 (Part 8-1: Functional aspects — Energy efficiency) within Part 8; it replaced the deleted Appendix 17.',
              'Chapter 81 is a signpost chapter — it refers the reader to the Building Regulations + BS HD 60364-8-1:2019 for the detailed energy-efficiency requirements. It sits alongside Chapter 82 (Prosumer\'s Low Voltage Electrical Installations — PEI) in Part 8 (Functional Requirements).',
              'Chapter 81 is layered onto traditional safety regs — not a replacement. The Reg 525 / Appendix 4 voltage-drop maximum (3% lighting / 5% other) remains; energy-efficiency design may justify upsizing to design well below it when payback supports.',
              'Practical scope (detailed in BS HD 60364-8-1:2019): cable CSA choices for I²R reduction; voltage-drop margins beyond Reg 525; load-shifting / tariff-aware design; EEMS integration (Reg 825.1); LCT generation + storage sizing.',
              'New customer evidence: efficiency rationale, payback model, monitoring plan, annual energy estimate. Sits alongside the existing EIC + schedule of tests + schedule of inspection.',
              'M11 module groups Chapter 81 + lightning protection (BS EN 62305) + SPDs (Section 443 / 534) + fault contribution + anti-islanding — the post-A4:2026 design + verification stack for LCT installs.',
              'Honest customer framing: pre-A4:2026 installs are not retroactively non-compliant; post-A4:2026 installs should carry Chapter 81 evidence. EICR scope verifies safety against install-date amendment.',
              'Chapter 81 supports but does not replace the wider Building Regs + EPC framework. Designer records can feed into EPC re-assessment + Part L compliance.',
            ]}
          />

          <LearningOutcomes
            outcomes={[
              'Explain what A4:2026 added with Chapter 81 + why energy efficiency became part of BS 7671.',
              'Position Chapter 81 within Part 8 (Functional Requirements) alongside Chapter 82 PEI, and recognise it as a signpost to BS HD 60364-8-1:2019.',
              'Distinguish energy-efficiency design from the Reg 525 voltage-drop maximum — how they layer.',
              'Identify the new evidence records the inspector / customer receives under Chapter 81.',
              'Apply Chapter 81 framing to a typical LCT install (PV + BESS + heat pump + EV).',
              'Frame Chapter 81 honestly for customers — applicability based on install date, layered approach not retroactive.',
              'Position Chapter 81 alongside the wider building-energy framework (Building Regs Part L, EPC, SAP).',
              'Preview the M11 module structure — efficiency + lightning + SPDs + fault levels + anti-islanding as one design stack.',
            ]}
            initialVisibleCount={3}
          />

          <Pullquote>
            A4:2026 widened the brief. BS 7671 used to be safety-only — Chapter 81 says: design for efficiency too. The wiring matters, not just the protection.
          </Pullquote>

          <ContentEyebrow>What A4:2026 added + why Chapter 81 exists</ContentEyebrow>

          <ConceptBlock
            title="Chapter 81 — energy efficiency (the signpost chapter)"
            plainEnglish="Chapter 81 (Part 8-1: Functional aspects — Energy efficiency) is the new energy-efficiency chapter BS 7671:2018+A4:2026 added inside Part 8; it replaced the deleted Appendix 17. It is essentially a signpost — it refers the reader to the Building Regulations + BS HD 60364-8-1:2019 for the detailed requirements rather than restating them. The methodology (efficiency meshes, device selection, payback) lives in BS HD 60364-8-1:2019. In practice the designer + installer demonstrate the install is efficient — cable CSA choices that reduce losses, voltage-drop margins below the Reg 525 / Appendix 4 maximum where payback supports, integration of LCT generation + storage, EEMS coordination (Reg 825.1)."
            onSite="UK 2025-26 reality: post-A4:2026 LCT install must carry Chapter 81 evidence in the cert bundle. Cable / equipment selection rationale + voltage-drop calculation + EEMS configuration + monitoring plan + annual energy estimate. Customer sees this alongside the traditional EIC."
          >
            <p>Chapter 81 scope at a glance:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Cable cross-section</strong> —
                designer chooses CSA based on safety + correctness (Reg 433 / 434 /
                523) AND efficiency (Chapter 81 upsizing where I²R loss reduction
                payback supports). Records the rationale
              </li>
              <li>
                <strong className="text-white">Voltage drop</strong> —
                Reg 525 / Appendix 4 caps at 3% (lighting) / 5% (other) of nominal — this is the
                safety + correctness maximum. Chapter 81 may drive design well below that
                cap (smaller voltage drop) when payback supports
              </li>
              <li>
                <strong className="text-white">Load-shifting design</strong>
                — tariff-aware circuits sized for off-peak operation (EV +
                heat pump + immersion diverter). Smart-meter export coordination,
                typically managed by the EEMS (Reg 825.1)
              </li>
              <li>
                <strong className="text-white">LCT integration</strong> —
                PV / BESS / wind / CHP + heat pump + EV sized + coordinated for
                efficient operation. Annual energy estimate per component
              </li>
              <li>
                <strong className="text-white">EEMS</strong> — the
                Electrical Energy Management System (defined at Reg 825.1)
                coordinates operation of the multi-source PEI. The efficiency
                design records integrate the EEMS configuration
              </li>
              <li>
                <strong className="text-white">Monitoring points</strong>
                — sub-meters / CT clamps / smart-meter export wired during install.
                Customer sees post-install verification of efficiency design
              </li>
              <li>
                <strong className="text-white">Payback model</strong> —
                designer\'s economic + carbon model that justifies the efficiency
                choices. Records the cost / energy / carbon assumptions
              </li>
              <li>
                <strong className="text-white">Customer evidence
                  bundle</strong> — traditional safety EIC + Chapter 81 efficiency
                rationale + design records + monitoring plan
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Why A4:2026 added Chapter 81 — context"
            plainEnglish="The drivers came together: UK net-zero policy direction, widespread LCT install volumes (PV / BESS / EV / heat pump becoming mainstream), the realisation that 'safe' is necessary but not sufficient — the wiring choices themselves can save or waste customer energy + emissions over the install lifetime. IEC + CENELEC standards had already started moving in this direction; BS 7671 caught up via A4:2026."
            onSite="The shift from safety-only to safety + efficiency mirrors the wider transition. UK 2025-26: a typical new-build or LCT retrofit install has multiple high-current sustained loads (heat pump, EV charger, BESS, induction hob) where cable losses matter materially over the lifetime. Pre-A4:2026 regs only required compliance with Reg 525 voltage drop; A4:2026 Chapter 81 requires the efficiency design to be evidenced."
          >
            <p>Drivers behind Chapter 81:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">UK net-zero policy</strong>
                — 2050 carbon target; electrification of heat + transport; widespread
                LCT install programme; energy-efficiency expectations in supporting
                regs (Building Regs Part L, EPC, EERS)
              </li>
              <li>
                <strong className="text-white">LCT install volumes</strong>
                — UK 2025-26 typical new-build + many retrofits include PV +
                BESS + heat pump + EV. Sustained high-current loads are the norm,
                not the exception
              </li>
              <li>
                <strong className="text-white">I²R loss matters at
                  scale</strong> — heat pump running 4-6 hours per day for 5 months;
                EV charging 6-8 hours per session 3-5 nights per week; PV exporting
                4-7 hours per day in summer. Cable losses scale with current squared
                + time
              </li>
              <li>
                <strong className="text-white">IEC + CENELEC
                  alignment</strong> — international standards moving toward
                energy-efficient design in wiring. BS 7671 follows
              </li>
              <li>
                <strong className="text-white">Customer
                  expectation</strong> — UK 2025-26 customer paying significant amounts
                for an LCT package expects the install to perform efficiently. The
                evidence layer matters for trust + future EICR / handover
              </li>
              <li>
                <strong className="text-white">Coherence with Part
                  8</strong> — Chapter 82 (Prosumer\'s Low Voltage Electrical
                Installations, PEI) was already in Part 8. Chapter 81 makes Part 8
                (Functional Requirements) a coherent prosumer + efficiency suite
              </li>
              <li>
                <strong className="text-white">EICR + handover
                  evidence</strong> — future verifier needs to see efficiency rationale
                + monitoring plan + design records, not infer them
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — Chapter 81 introduces a new section in the customer
                handover documentation pack
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Chapter 81 — Part 8-1: Functional aspects — Energy efficiency (new in A4:2026)"
            clause="A4:2026 introduces Chapter 81 within Part 8 (Functional Requirements). It replaced the deleted Appendix 17 and is a signpost chapter — it refers the reader to the Building Regulations (England & Wales / Scotland / NI) and to BS HD 60364-8-1:2019 for the detailed energy-efficiency requirements. It sits alongside Chapter 82 (Prosumer\'s Low Voltage Electrical Installations — PEI). The energy-efficient design of the electrical installation — cable sizing, voltage-drop margins, load management, integration of LCT generation + storage, EEMS coordination — and the records the designer keeps follow BS HD 60364-8-1:2019."
            meaning="Chapter 81 is the energy-efficiency chapter A4:2026 added to BS 7671, replacing the deleted Appendix 17. It is a signpost: it points to the Building Regulations + BS HD 60364-8-1:2019 rather than restating the detailed design methodology. Pre-A4:2026 regs were safety-only; this widens the brief to safety + efficiency. The chapter does NOT replace any existing reg — Reg 525 voltage-drop cap remains; Reg 433 / 434 overload + short-circuit remain; Reg 643 Part 6 verification remains. The efficiency layer sits on top, requiring the designer to evidence efficiency design (per BS HD 60364-8-1:2019) alongside safety design. For LCT installs (PV / BESS / heat pump / EV / multi-source PEI) the practical impact is significant: cable CSA upsizing where I²R loss reduction payback supports, voltage-drop margins below Reg 525, EEMS integration (Reg 825.1), monitoring points, payback model. Cert evidence bundle now integrates traditional safety EIC + efficiency rationale + design records."
          />

          <InlineCheck {...inlineChecks[0]} />

          <InlineCheck {...inlineChecks[2]} />

          <SectionRule />

          <ContentEyebrow>How Chapter 81 layers on top of existing regs</ContentEyebrow>

          <Pullquote>
            Reg 525 says the conductor must not drop more than 5% — that\'s the ceiling. Chapter 81 says go further below it when efficiency pays back. Together they bracket the design.
          </Pullquote>

          <ConceptBlock
            title="Reg 525 voltage drop + Chapter 81 — the layered design"
            plainEnglish="Reg 525 (via Appendix 4) caps voltage drop at 3% (lighting) / 5% (other) of nominal. That is the safety + correctness maximum — no design may exceed it. Chapter 81 lets the designer go well below the cap (smaller voltage drop) when payback supports, typically by upsizing conductor CSA. The two regs work together — Reg 525 sets the ceiling, Chapter 81 sets the efficiency upside."
            onSite="LCT example: a heat pump dedicated 32 A circuit, 25 m run. Reg 525 minimum CSA (5% cap, 230 V) is typically 6 mm² T+E. Heat pump runs 4-6 h/day for 5 months at near-rated current. Annual I²R loss difference between 6 mm² and 10 mm² can be 30-80 kWh — at 25-30 p/kWh that\'s £8-25/year. Cable upsize cost ~£40-80. Payback 3-6 years on cable cost alone — Chapter 81 design records this rationale."
          >
            <p>Reg 525 + Chapter 81 worked example (heat pump):</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Reg 525 maximum</strong>
                — calculate minimum CSA so design voltage drop is below 5% (heat
                pump is not lighting). The 5% cap is the safety + correctness limit
              </li>
              <li>
                <strong className="text-white">Chapter 81
                  efficiency</strong> — calculate I²R loss at design current ×
                expected operating hours per year. Convert to kWh × unit price = annual
                cost of cable losses
              </li>
              <li>
                <strong className="text-white">Upsize CSA</strong> —
                model the loss reduction from going to next CSA up; subtract incremental
                cable cost; compute payback in years
              </li>
              <li>
                <strong className="text-white">Decide</strong> — if
                payback is reasonable (typical UK 2025-26 threshold 5-10 years) and
                the customer accepts the upfront delta, upsize. Record the rationale
                under Chapter 81
              </li>
              <li>
                <strong className="text-white">Voltage drop margin
                  benefit</strong> — upsized cable also gives more headroom at the
                appliance terminals (better starting performance, lower terminal
                heating, longer equipment life)
              </li>
              <li>
                <strong className="text-white">Other sustained-load
                  candidates</strong> — EV charger dedicated circuit; BESS DC + AC;
                PV DC + AC; immersion diverter; induction hob (high peak); cooker
                circuit at sustained load
              </li>
              <li>
                <strong className="text-white">Where it doesn\'t
                  pay back</strong> — general lighting circuits at low duty; occasional
                socket-use circuits. The Reg 525 minimum-compliant conductor is sufficient
              </li>
              <li>
                <strong className="text-white">Cert evidence</strong>
                — Chapter 81 design record per circuit where upsizing applied;
                rationale + payback model attached to EIC
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Chapter 81 vs Reg 433 / 434 — overload + short-circuit unchanged"
            plainEnglish="Reg 433 overload protection + Reg 434 short-circuit protection are unchanged by A4:2026 Chapter 81. They remain the safety baseline for conductor + protective-device selection. Chapter 81 does NOT relax overload or short-circuit requirements — it adds an efficiency layer on top of them."
            onSite="In practice this means: select OCPD per Reg 433 (rated > In, < Iz of cable, < I2 cable damage limit) + Reg 434 (breaking capacity > PSCC at point of installation) — that\'s safety. Then Chapter 81 may justify a larger cable (Iz higher than needed for the OCPD rating) where efficiency payback supports. The OCPD doesn\'t change; the cable becomes larger than the safety minimum."
          >
            <p>Reg 433 / 434 + Chapter 81 interaction:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Reg 433 overload</strong>
                — OCPD rated In: design current ≤ In ≤ Iz of conductor; protective
                device operating current I2 ≤ 1.45 × Iz. Unchanged by Chapter 81
              </li>
              <li>
                <strong className="text-white">Reg 434
                  short-circuit</strong> — OCPD breaking capacity ≥ PSCC at point of
                installation; conductor adiabatic check k²S² ≥ I²t. Unchanged
              </li>
              <li>
                <strong className="text-white">Reg 525 voltage
                  drop</strong> — design voltage drop ≤ 3% (lighting) / 5% (other).
                Unchanged as the maximum; Chapter 81 may drive design well below it
              </li>
              <li>
                <strong className="text-white">Chapter 81 upsize
                  scenario</strong> — design current 25 A (heat pump). Reg 433 OCPD
                32 A. Reg 525 minimum CSA 6 mm² T+E (Iz ~ 47 A, voltage drop within
                5%). Chapter 81 may justify 10 mm² (Iz ~ 64 A, voltage drop much
                lower, I²R loss reduced) — OCPD remains 32 A; cable is larger than
                Reg 525 minimum
              </li>
              <li>
                <strong className="text-white">Cable economics</strong>
                — incremental cable cost per CSA step; expected operating hours per
                year + design current squared = annual energy loss saved; payback
                model
              </li>
              <li>
                <strong className="text-white">Equipment life</strong>
                — secondary benefit of lower cable losses: lower terminal
                temperatures, longer connection life, less drift in measurement
                instrumentation
              </li>
              <li>
                <strong className="text-white">Cert evidence
                  bundle</strong> — per-circuit design record: Reg 433 / 434 / 525
                compliance + Chapter 81 efficiency rationale where applied
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Reg 525 — Voltage drop in consumers\' installations"
            clause="The voltage at the terminals of any current-using equipment shall be greater than the lower limit corresponding to the relevant product standard. NOTE: The voltage drop from the origin of the installation to any point in the installation should not be greater than the values stated in Appendix 4: 3% for lighting, 5% for other uses (for a public low voltage supply)."
            meaning="Reg 525 is the voltage-drop safety + correctness ceiling — it caps voltage drop so equipment receives a voltage within its product-standard tolerance + the design current doesn\'t cause terminal heating / mis-operation. The 3% (lighting) / 5% (other) values are the recommended maximum stated in Appendix 4, Section 6.4 (Reg 525.202: deemed to satisfy when voltage drop does not exceed those values). Chapter 81 layers efficiency on top: when payback supports, designer may upsize conductor to drive the voltage drop well below the cap, reducing I²R losses + extending equipment life. The two regs work together as the safety + correctness maximum (Reg 525) and the efficiency upside (Chapter 81). Cert evidence bundle per circuit: voltage-drop calculation showing Reg 525 compliance + Chapter 81 rationale where conductor upsized beyond the minimum."
          />

          <InlineCheck {...inlineChecks[1]} />

          <SectionRule />

          <ContentEyebrow>Chapter 81 evidence + the inspector\'s new view</ContentEyebrow>

          <ConceptBlock
            title="What the inspector now records for Chapter 81"
            plainEnglish="Post-A4:2026 LCT install evidence: cable CSA rationale per circuit; voltage-drop calculation with the design margin below Reg 525 cap; load-shifting / tariff-aware design notes; EEMS configuration if applicable (Reg 825.1); LCT component sizing + annual energy estimate; monitoring points (sub-meters, CT clamps, smart-meter export); payback model. Sits alongside the traditional safety EIC + schedule of tests + schedule of inspection."
            onSite="UK 2025-26 typical Chapter 81 bundle on a domestic LCT install: 1-2 pages of efficiency rationale + cable / equipment selection notes + EEMS commissioning sheet + annual energy estimate table + monitoring plan. Customer-facing document at handover."
          >
            <p>Chapter 81 evidence the inspector records:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Per-circuit cable
                  rationale</strong> — where conductor upsized beyond Reg 525 minimum,
                why (sustained current + payback model)
              </li>
              <li>
                <strong className="text-white">Voltage-drop
                  calculation</strong> — design voltage drop per circuit + margin
                below Reg 525 cap (if Chapter 81 upsizing applied)
              </li>
              <li>
                <strong className="text-white">Load-shifting design
                  notes</strong> — tariff-aware circuits sized for off-peak EV / heat
                pump / immersion diverter operation
              </li>
              <li>
                <strong className="text-white">EEMS configuration</strong>
                — the Reg 825.1 Electrical Energy Management System coordinating
                PV / BESS / heat pump / EV operation
              </li>
              <li>
                <strong className="text-white">LCT component
                  sizing</strong> — PV kWp, BESS kWh + power, heat pump kW + SCOP,
                EV charger A + max kWh/session, annual energy estimate per
                component
              </li>
              <li>
                <strong className="text-white">Monitoring points</strong>
                — sub-meters, CT clamps, smart-meter export wiring + commissioning
              </li>
              <li>
                <strong className="text-white">Payback model</strong>
                — economic + carbon assumptions + payback in years for the efficiency
                choices
              </li>
              <li>
                <strong className="text-white">Customer handover</strong>
                — Chapter 81 evidence bundle delivered alongside the safety EIC +
                schedule of inspection + schedule of test results
              </li>
            </ul>
          </ConceptBlock>

          <ConceptBlock
            title="Chapter 81 + Building Regs Part L + EPC + SAP"
            plainEnglish="Chapter 81 is the BS 7671 layer — electrical install efficiency design. The wider building-energy framework is separate: Building Regs Part L (England + equivalents) covers building fabric + services efficiency for new build + significant retrofits. EPC is the customer-facing energy rating. SAP is the assessment methodology. Chapter 81 design records support but do not replace these frameworks."
            onSite="UK 2025-26 customer journey: SAP assessor visits + creates the EPC; Building Control sees Part L compliance evidence at completion (where applicable); electrician\'s LCT install (PV / BESS / heat pump / EV) feeds into the EPC rating; Chapter 81 design records evidence the BS 7671 efficiency layer + can be attached to the EPC re-assessment file. Separate documents but cross-reference."
          >
            <p>Chapter 81 vs wider framework:</p>
            <ul className="list-disc pl-5 space-y-1.5 text-[13.5px] text-white/85 leading-relaxed">
              <li>
                <strong className="text-white">Chapter 81 (BS 7671)</strong>
                — electrical install efficiency design + records + verification.
                Electrician\'s scope
              </li>
              <li>
                <strong className="text-white">Building Regs Part L
                  (England)</strong> — building fabric + services efficiency for new
                build + significant retrofits. Building Control sign-off. Separate
                framework
              </li>
              <li>
                <strong className="text-white">Part L equivalents</strong>
                — Wales (Part L), Scotland (Section 6), Northern Ireland (Part F).
                Devolved equivalents apply
              </li>
              <li>
                <strong className="text-white">EPC</strong> — Energy
                Performance Certificate, customer-facing building-energy rating
                (A-G). Required at sale / let / new build. LCT install affects EPC
                rating
              </li>
              <li>
                <strong className="text-white">SAP / RdSAP</strong>
                — Standard Assessment Procedure / Reduced-data SAP — methodology for
                EPC assessment. SAP assessor records the LCT install + Chapter 81
                evidence feeds in
              </li>
              <li>
                <strong className="text-white">MCS handover</strong>
                — for grant-funded LCT (heat pump primarily under BUS), MCS handover
                pack integrates with the EPC re-assessment + Chapter 81 BS 7671
                records
              </li>
              <li>
                <strong className="text-white">Cross-references</strong>
                — Chapter 81 design records can be attached to the EPC re-assessment
                file + Part L compliance documentation. They are separate but
                interlocking
              </li>
              <li>
                <strong className="text-white">Customer evidence
                  bundle</strong> — Chapter 81 + EIC (BS 7671) + EPC (SAP) + MCS
                handover (where applicable) + Building Control sign-off (where
                applicable). The electrician\'s scope is the BS 7671 layer
              </li>
            </ul>
          </ConceptBlock>

          <RegsCallout
            source="BS 7671:2018+A4:2026 · Part 8 — Functional Requirements (Chapters 81, 82)"
            clause="Part 8 (Functional Requirements) brings together the energy-efficiency + prosumer requirements. A4:2026 expanded Part 8 — Chapter 81 (Energy Efficiency) is the signpost chapter that replaced Appendix 17 and points to the Building Regulations + BS HD 60364-8-1:2019, complementing Chapter 82 (Prosumer\'s Low Voltage Electrical Installations — PEI). Designer + installer demonstrate efficiency design alongside safety design."
            meaning="Part 8 (Functional Requirements) is the home for prosumer + efficiency requirements within BS 7671. Chapter 82 (PEI) covers multi-source architecture, public-network interaction + island-mode capability (Reg 826.1.1.1, 824.2 operating modes), with the Electrical Energy Management System (EEMS) defined at Reg 825.1 — covering coordinated control, load shedding and source selection across the prosumer install. Chapter 81 (introduced in A4:2026) is the energy-efficiency signpost — it refers the reader to the Building Regulations + BS HD 60364-8-1:2019 for the detailed methodology (efficient cable + equipment selection, voltage-drop margins, load-shifting design, LCT integration). The two chapters work together: efficient design (81) of a prosumer site (82). For M11 the focus is Chapter 81 + the safety anchors (lightning, SPDs, fault contribution, anti-islanding). M10 covered Chapter 82 in depth. Cert evidence bundle: Part 8 evidence consolidates the efficiency rationale + Chapter 82 PEI architecture + EEMS records."
          />

          <InlineCheck {...inlineChecks[3]} />

          <Part8Framework caption="Part 8 (Functional Requirements) — Chapter 81 energy efficiency and Chapter 82 prosumer — layered on top of the traditional safety regs (433/434, 525, 643), not replacing them." />

          <SectionRule />

          <Scenario
            title="New-build domestic — full LCT package post-A4:2026"
            situation="New-build 4-bed detached house, post-A4:2026 install. Package: 6 kWp PV + 13 kWh LFP BESS + 7 kW ASHP + 7 kW EV charger + induction hob + tariff with peak / off-peak / export rates. Customer expects Chapter 81 evidence in the handover pack. UK 2025-26."
            whatToDo="Chapter 81 design pass per circuit: (1) Heat pump dedicated 32 A circuit — Reg 525 min 6 mm² T+E; Chapter 81 upsizes to 10 mm² (sustained 4-6 h/day for 5 months at near-rated current, I²R payback ~4-5 years). (2) EV charger dedicated 32 A circuit — Reg 525 min 6 mm² T+E; Chapter 81 upsizes to 10 mm² (sustained 6-8 h/session 3-5 nights/week, I²R payback ~3-5 years). (3) PV DC string from roof to inverter — Chapter 81 upsizes to reduce voltage drop + boost yield. (4) BESS DC + AC — Chapter 81 considers conductor losses at bidirectional sustained current. (5) Induction hob 32 A — Chapter 81 upsize considered, payback marginal (intermittent peak). (6) General lighting + sockets — Reg 525 minimum-compliant conductor sufficient. EEMS configured per Reg 825.1 — coordinated PV / BESS / heat pump / EV operation; tariff-aware. Monitoring: sub-meters per LCT component + CT clamps for export + smart-meter coordination. Annual energy estimate: PV ~5,500 kWh/year, BESS round-trip ~92% LFP, heat pump SCOP ~3.5 = ~6,000 kWh heat from ~1,700 kWh elec, EV 3,000 kWh/year. Chapter 81 bundle: 2-3 pages efficiency rationale + design records + payback model + monitoring plan. Sits alongside BS 7671 EIC + Part L compliance + EPC re-assessment + MCS heat pump handover."
            whyItMatters="Post-A4:2026 new-build LCT install = textbook Chapter 81 scope. Designer + installer demonstrate efficiency design across the LCT stack. Customer evidence bundle = traditional safety EIC + Chapter 81 efficiency layer + EPC + Building Regs Part L + MCS handover. Multi-document handover; electrician owns the BS 7671 layer. Five years on, EICR scope verifies safety + reviews the Chapter 81 records for consistency with the install."
          />

          <Scenario
            title="Pre-A4:2026 install + post-A4:2026 EICR — honest framing"
            situation="2020 install: 4 kWp PV + 9 kWh BESS, designed + certified to BS 7671:2018+A2:2022. Now 2026, customer is selling the house + needs an EICR. Inspector arrives. Customer asks: is my install Chapter 81 compliant?"
            whatToDo="Honest answer: install was designed + certified pre-Chapter 81 — it complies with the amendment in force at install date (A2:2022). The EICR verifies safety against the install\'s amendment (continuity, IR, RCD operation, EFLI, polarity, etc.). The EICR does NOT retroactively impose Chapter 81 — efficiency evidence wasn\'t a requirement at install date. EICR codes (C1, C2, C3, FI) apply against the install\'s amendment, not against A4:2026. EICR report records the amendment in force at original install + the amendment in force at EICR date. Customer evidence: original EIC (2020) + EICR (2026); no Chapter 81 evidence for the pre-existing scope (correctly absent). If the customer adds a new circuit / component post-A4:2026 (e.g. EV charger 2026), that new scope IS designed + certified to A4:2026 + carries Chapter 81 evidence for the new scope only."
            whyItMatters="Honest customer framing matters. EICR is not a retroactive Chapter 81 assessment. Pre-A4:2026 installs are NOT non-compliant because they don\'t carry Chapter 81 evidence — they comply with their original amendment. Sales process: EICR + original EIC tell the story. New buyer can commission new work to A4:2026 if they wish. Misframing Chapter 81 as retroactive would unfairly fail older installs + erode trust."
          />

          <CommonMistake
            title="Treating Chapter 81 as a safety reg that fails the EICR"
            whatHappens="Inspector coding a pre-A4:2026 install down because the cable is at the Reg 525 minimum + no Chapter 81 efficiency rationale exists. Customer alarmed — install was compliant at design date but is being failed against a reg that didn\'t exist then. Trust + reputation damage."
            doInstead="Chapter 81 is an efficiency design framework + evidence layer, not a safety reg. EICR codes (C1 immediate danger, C2 potentially dangerous, C3 improvement recommended, FI further investigation) apply against the safety regs in force at install date. Chapter 81 was added by A4:2026 — pre-A4:2026 installs are not assessed against it. Post-A4:2026 installs SHOULD carry Chapter 81 evidence, and an absence may be a C3 (improvement) or FI on the EICR depending on circumstances — never a C1 / C2 unless an actual safety reg breach is also identified. Cert evidence bundle: install-date amendment recorded; EICR scope against that amendment + commentary on Chapter 81 where applicable."
          />

          <CommonMistake
            title="Upsizing cable everywhere — Chapter 81 misapplied"
            whatHappens="Installer reads Chapter 81 + upsizes every conductor by one CSA step regardless of payback. Cable cost + install time balloon. Customer pays significantly more for no measurable benefit on intermittent / low-duty circuits. The economics don\'t work."
            doInstead="Chapter 81 is payback-driven. Designer models the annual operating hours × design current squared × electricity unit price = annual I²R loss cost. Compare to the incremental cable + install cost; compute payback in years. Reasonable threshold UK 2025-26: 5-10 years. Sustained-load LCT circuits (heat pump, EV charger, BESS, PV at MPP) typically pay back; general lighting + intermittent sockets typically don\'t. Cert evidence: per-circuit Chapter 81 design record where upsizing applied + the rationale. Where the Reg 525 minimum-compliant conductor is sufficient, record that too (Chapter 81 evidenced absence of upsizing)."
          />

          <SectionRule />

          <KeyTakeaways
            points={[
              'A4:2026 added Chapter 81 to BS 7671 as a new energy-efficiency design framework inside Part 8.',
              'Part 8 (Functional Requirements) pairs Chapter 81 (Energy Efficiency — a signpost to BS HD 60364-8-1:2019) with Chapter 82 (Prosumer\'s Low Voltage Electrical Installations — PEI). Designed to work together.',
              'Chapter 81 is layered on existing safety regs — it does NOT replace Reg 433 / 434 / 525 / 643. Designer evidences efficiency design ALONGSIDE safety design.',
              'Reg 525 / Appendix 4 voltage-drop cap (3% lighting / 5% other) is the maximum. Chapter 81 may justify designing well below the cap (smaller voltage drop, larger conductor) when payback supports.',
              'Practical scope: cable CSA upsizing on sustained-load LCT circuits (heat pump, EV charger, BESS, PV) where I²R loss reduction + payback support the rationale.',
              'New customer evidence: efficiency rationale per circuit + voltage-drop margins + EEMS configuration + LCT energy estimate + monitoring plan + payback model.',
              'Chapter 81 evidence integrates with the wider building-energy framework: Building Regs Part L, EPC, SAP / RdSAP, MCS handover. Separate but cross-referenced documents.',
              'EICR scope: verifies safety against install-date amendment. Pre-A4:2026 installs are NOT retroactively failed for absent Chapter 81 evidence.',
              'M11 module structure: Chapter 81 + BS EN 62305 lightning + Section 443 / 534 SPDs + multi-source fault contribution + Reg 551.7.5 anti-islanding deep + commissioning chain.',
              'Honest customer framing: Chapter 81 is post-A4:2026; older installs are compliant under their amendment; new work is designed + evidenced to A4:2026.',
              'Cert evidence bundle: traditional safety EIC + Chapter 81 efficiency layer (per BS HD 60364-8-1:2019) + Chapter 82 PEI records + EEMS records (Reg 825.1) + cross-reference to EPC / Part L / MCS.',
            ]}
          />

          <FAQ items={faqs} />

          <Quiz questions={quizQuestions} title="Section 1 · Knowledge check" />

          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/electrician/upskilling/renewable-energy-module-11')}
              className="rounded-2xl bg-[hsl(0_0%_12%)] hover:bg-[hsl(0_0%_15%)] transition-colors border border-white/[0.06] p-4 text-left touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-[0.18em] text-white">
                <ChevronLeft className="h-3 w-3" /> Module 11
              </div>
              <div className="mt-1 text-[14px] font-semibold text-white truncate">
                Module overview
              </div>
            </button>
            <button
              type="button"
              onClick={() =>
                navigate('/electrician/upskilling/renewable-energy-module-11-section-2')
              }
              className="rounded-2xl bg-elec-yellow hover:bg-elec-yellow/90 transition-colors border border-elec-yellow p-4 text-right touch-manipulation active:scale-[0.99]"
            >
              <div className="flex items-center gap-2 justify-end text-[10.5px] uppercase tracking-[0.18em] text-black/70">
                Next section <ChevronRight className="h-3 w-3" />
              </div>
              <div className="mt-1 text-[14px] font-semibold text-black truncate">
                11.2 Chapter 81 applied — efficiency design + verification
              </div>
            </button>
          </div>
        </PageFrame>
      </div>
    </div>
  );
}
